/**
 * Petro-Track Main Orchestrator
 * Điều khiển luồng hoạt động chính, quản lý trạng thái và tương tác sự kiện
 */

import { openDB, getAllProjects, saveProject, deleteProject, getFoldersByProject, saveFolder, deleteFolder, getFilesByProject, getFilesByFolder, saveFile, getFile, deleteFile, exportDatabase, importDatabase } from './db.js';
import { translations, demoProjects, demoFolders, demoFiles, generateDefaultTasks } from './data.js';
import { updateCharts } from './charts.js';
import { renderProjectCard, renderGanttRows, renderDmsGrid, renderDmsBreadcrumbs, renderRiskRows, renderLogbook, calculateOverallProgress, formatNumber, formatBytes } from './components.js';

// Trạng thái toàn cục (Global State)
let currentLanguage = localStorage.getItem('petro_track_lang') || 'vi';
let allProjectsList = [];
let activeProjectId = null;
let currentProject = null;
let currentFolderId = null;
let dmsPathFolders = []; // Quản lý đường dẫn cây thư mục

// Khởi chạy ứng dụng
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Kết nối cơ sở dữ liệu
    await openDB();

    // 2. Kiểm tra nếu DB rỗng thì tự động nạp dữ liệu mẫu (Seed Data)
    const existingProjects = await getAllProjects();
    if (existingProjects.length === 0) {
        console.log('Không có dữ liệu trong IndexedDB. Đang nạp dữ liệu mẫu...');
        await seedDemoData();
    }

    // 3. Khởi tạo ngôn ngữ & Dịch trang
    setLanguage(currentLanguage);

    // 4. Tải dữ liệu lên giao diện
    await refreshDashboard();

    // 5. Cấu hình các sự kiện lắng nghe (EventListeners)
    initEventListeners();
});

/**
 * Nạp dữ liệu mẫu ban đầu vào IndexedDB
 */
async function seedDemoData() {
    for (const proj of demoProjects) {
        await saveProject(proj);
    }
    for (const folder of demoFolders) {
        await saveFolder(folder);
    }
    for (const file of demoFiles) {
        await saveFile(file);
    }
}

/**
 * Chuyển đổi ngôn ngữ của hệ thống
 * @param {string} lang 
 */
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('petro_track_lang', lang);

    // Cập nhật trạng thái các nút ngôn ngữ
    if (lang === 'vi') {
        document.getElementById('langViBtn').classList.add('active');
        document.getElementById('langEnBtn').classList.remove('active');
    } else {
        document.getElementById('langEnBtn').classList.add('active');
        document.getElementById('langViBtn').classList.remove('active');
    }

    // Dịch các nhãn văn bản có sẵn trong HTML
    translatePage();

    // Re-render lại danh sách dự án
    renderProjectsList();

    // Cập nhật lại biểu đồ
    if (allProjectsList.length > 0) {
        updateCharts(allProjectsList, currentLanguage);
    }
}

/**
 * Hàm dịch thuật giao diện tự động
 */
function translatePage() {
    const t = translations[currentLanguage];
    document.title = t.appTitle;

    // Quét toàn bộ thẻ có thuộc tính data-i18n để thay đổi text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });

    // Dịch thuộc tính placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.setAttribute('placeholder', t[key]);
        }
    });
}

/**
 * Đọc dữ liệu mới nhất từ IndexedDB và render lại Dashboard
 */
async function refreshDashboard() {
    allProjectsList = await getAllProjects();
    
    // Cập nhật KPIs tổng quan
    updateKPIs();

    // Vẽ biểu đồ
    updateCharts(allProjectsList, currentLanguage);

    // Vẽ danh sách thẻ dự án
    renderProjectsList();
}

/**
 * Tính toán và cập nhật các chỉ số KPI
 */
function updateKPIs() {
    const total = allProjectsList.length;
    document.getElementById('kpiTotalProjects').innerText = total;

    if (total === 0) {
        document.getElementById('kpiAvgProgress').innerText = '0%';
        document.getElementById('kpiBudgetText').innerText = '0 / 0 M$';
        document.getElementById('kpiSafeHoursVal').innerText = '0';
        return;
    }

    // Tiến độ trung bình
    let sumProgress = 0;
    let totalPlannedCapex = 0;
    let totalActualCapex = 0;
    let totalSafeHours = 0;

    allProjectsList.forEach(p => {
        sumProgress += calculateOverallProgress(p.tasks);
        totalPlannedCapex += p.budget?.plannedCapex || 0;
        totalActualCapex += p.budget?.actualCapex || 0;
        totalSafeHours += p.safeHours || 0;
    });

    const avgProgress = Math.round(sumProgress / total);
    document.getElementById('kpiAvgProgress').innerText = `${avgProgress}%`;
    document.getElementById('kpiBudgetText').innerText = `${totalActualCapex.toFixed(1)} / ${totalPlannedCapex.toFixed(1)} M$`;
    document.getElementById('kpiSafeHoursVal').innerText = formatNumber(totalSafeHours);
}

/**
 * Hiển thị danh sách dự án có áp dụng bộ lọc và ô tìm kiếm
 */
function renderProjectsList() {
    const grid = document.getElementById('projectsGrid');
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const statusVal = document.getElementById('statusFilter').value;
    const priorityVal = document.getElementById('priorityFilter').value;

    const filtered = allProjectsList.filter(p => {
        const name = currentLanguage === 'vi' ? p.nameVi : p.nameEn;
        const matchesSearch = name.toLowerCase().includes(searchVal) || p.code.toLowerCase().includes(searchVal);
        const matchesStatus = statusVal === 'all' || p.status === statusVal;
        const matchesPriority = priorityVal === 'all' || p.priority === priorityVal;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 4rem; text-align: center; color: var(--text-muted);">
                <i class="ph ph-folder-open" style="font-size: 4rem; display: block; margin: 0 auto 1.5rem auto; opacity: 0.5;"></i>
                <p>${currentLanguage === 'vi' ? 'Không tìm thấy dự án nào phù hợp.' : 'No projects found matching filter.'}</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(p => renderProjectCard(p, currentLanguage)).join('');

    // Đăng ký sự kiện mở chi tiết dự án
    document.querySelectorAll('.btn-open-project').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            openProjectDetail(id);
        });
    });
}

/**
 * Mở modal chi tiết dự án
 * @param {string} projectId 
 */
async function openProjectDetail(projectId) {
    activeProjectId = projectId;
    currentProject = allProjectsList.find(p => p.id === projectId);
    
    if (!currentProject) return;

    // Reset lại tab mặc định (Thông tin chung)
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="tabGeneral"]').classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('tabGeneral').classList.add('active');

    // Nạp dữ liệu vào modal
    updateProjectDetailUI();

    // Mở Modal
    document.getElementById('detailModal').classList.add('active');
}

/**
 * Cập nhật giao diện của Modal Chi tiết Dự án
 */
function updateProjectDetailUI() {
    if (!currentProject) return;

    const t = translations[currentLanguage];
    const name = currentLanguage === 'vi' ? currentProject.nameVi : currentProject.nameEn;
    const progress = calculateOverallProgress(currentProject.tasks);

    // Điền text chung
    document.getElementById('modalProjectName').innerText = name;
    document.getElementById('modalProjectCode').innerText = currentProject.code;
    document.getElementById('modalProjectClient').innerText = currentProject.client;
    document.getElementById('modalProjectLoc').innerText = currentProject.location;
    document.getElementById('modalProjectPM').innerText = currentProject.manager;
    document.getElementById('modalProjectStart').innerText = currentProject.startDate;
    document.getElementById('modalProjectEnd').innerText = currentProject.endDate;
    document.getElementById('modalProjectDesc').innerText = currentProject.description || '';
    document.getElementById('modalProjectProgressPercent').innerText = `${progress}%`;

    // Badges trạng thái & ưu tiên
    const statusBadge = document.getElementById('modalProjectStatusBadge');
    statusBadge.className = `badge badge-${currentProject.status}`;
    statusBadge.innerText = t[currentProject.status] || currentProject.status;

    const priorityBadge = document.getElementById('modalProjectPriorityBadge');
    priorityBadge.className = `badge badge-${currentProject.priority}`;
    priorityBadge.innerText = t[currentProject.priority] || currentProject.priority;

    // 1. Tab Gantt WBS
    renderScheduleTab();

    // 2. Tab DMS (Tài liệu) - Bắt đầu từ Root
    currentFolderId = null;
    dmsPathFolders = [];
    renderDmsTab();

    // 3. Tab Risks
    renderRisksTab();

    // 4. Tab Financials
    renderFinancialsTab();

    // 5. Tab Logbook
    renderLogbookTab();
}

// --- RENDER TAB CHI TIẾT ---

function renderScheduleTab() {
    const body = document.getElementById('ganttTasksTableBody');
    body.innerHTML = renderGanttRows(currentProject.tasks, currentLanguage);

    // Lắng nghe thay đổi thanh trượt tiến độ
    document.querySelectorAll('.gantt-progress-slider').forEach(slider => {
        slider.addEventListener('input', async (e) => {
            const taskId = e.target.getAttribute('data-task-id');
            const newProgress = parseInt(e.target.value);
            
            // Cập nhật giá trị hiển thị dạng số tức thời
            const tr = e.target.closest('tr');
            tr.querySelector('.task-progress-value').innerText = `${newProgress}%`;
            tr.querySelector('.gantt-timeline-bar-fill').style.width = `${newProgress}%`;

            // Lưu vào object hiện tại
            const task = currentProject.tasks.find(t => t.id === taskId);
            if (task) {
                task.progress = newProgress;
            }

            // Tính toán lại tiến độ dự án
            const overallProgress = calculateOverallProgress(currentProject.tasks);
            document.getElementById('modalProjectProgressPercent').innerText = `${overallProgress}%`;

            // Lưu vào IndexedDB
            await saveProject(currentProject);
            
            // Tự động chuyển đổi trạng thái khi đạt 100%
            if (overallProgress === 100 && currentProject.status !== 'completed') {
                currentProject.status = 'completed';
                await saveProject(currentProject);
                updateProjectDetailUI();
            }

            // Cập nhật ngầm danh sách trang chủ
            refreshDashboard();
        });
    });
}

async function renderDmsTab() {
    // Lấy thư mục và file thuộc dự án hiện tại và folder cha hiện hành
    const allFolders = await getFoldersByProject(activeProjectId);
    const allFiles = await getFilesByProject(activeProjectId);

    // Lọc theo folder cha hiện hành (currentFolderId = null tức là Root)
    const filteredFolders = allFolders.filter(f => f.parentId === currentFolderId);
    const filteredFiles = allFiles.filter(file => file.folderId === currentFolderId);

    // Vẽ Breadcrumbs
    const breadcrumbs = document.getElementById('dmsPathBreadcrumbs');
    breadcrumbs.innerHTML = renderDmsBreadcrumbs(dmsPathFolders, currentLanguage);

    // Lắng nghe sự kiện click breadcrumb nodes
    document.querySelectorAll('#dmsPathBreadcrumbs .dms-path-node').forEach(node => {
        node.addEventListener('click', async () => {
            const folderId = node.getAttribute('data-folder-id');
            if (folderId === 'root') {
                currentFolderId = null;
                dmsPathFolders = [];
            } else {
                currentFolderId = folderId;
                const idx = dmsPathFolders.findIndex(f => f.id === folderId);
                if (idx !== -1) {
                    dmsPathFolders = dmsPathFolders.slice(0, idx + 1);
                }
            }
            await renderDmsTab();
        });
    });

    // Vẽ Grid danh sách thư mục & file
    const grid = document.getElementById('dmsFileGrid');
    grid.innerHTML = renderDmsGrid(filteredFolders, filteredFiles, currentLanguage);

    // Gắn sự kiện tương tác
    // 1. Nhấp đúp thư mục để mở
    document.querySelectorAll('.dms-folder-item').forEach(item => {
        item.addEventListener('dblclick', async () => {
            const folderId = item.getAttribute('data-folder-id');
            const folderObj = allFolders.find(f => f.id === folderId);
            if (folderObj) {
                currentFolderId = folderId;
                dmsPathFolders.push(folderObj);
                await renderDmsTab();
            }
        });
    });

    // 2. Download File
    document.querySelectorAll('.btn-download-file').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const fileId = btn.getAttribute('data-file-id');
            const file = await getFile(fileId);
            if (file && file.data instanceof Blob) {
                const url = URL.createObjectURL(file.data);
                const a = document.createElement('a');
                a.href = url;
                a.download = file.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        });
    });

    // 3. Xóa Thư mục
    document.querySelectorAll('.btn-delete-folder').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const folderId = btn.getAttribute('data-folder-id');
            const confirmMsg = currentLanguage === 'vi' ? 'Xóa thư mục này sẽ xóa toàn bộ tệp bên trong. Bạn có đồng ý?' : 'Deleting this folder will delete all files inside. Proceed?';
            if (confirm(confirmMsg)) {
                await deleteFolder(folderId);
                await renderDmsTab();
            }
        });
    });

    // 4. Xóa File
    document.querySelectorAll('.btn-delete-file').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const fileId = btn.getAttribute('data-file-id');
            const confirmMsg = currentLanguage === 'vi' ? 'Bạn chắc chắn muốn xóa file này?' : 'Are you sure you want to delete this file?';
            if (confirm(confirmMsg)) {
                await deleteFile(fileId);
                await renderDmsTab();
            }
        });
    });

    // Hiện ẩn nút back thư mục
    document.getElementById('btnDmsBack').style.display = currentFolderId ? 'inline-flex' : 'none';
}

function renderRisksTab() {
    const tbody = document.getElementById('riskTableBody');
    tbody.innerHTML = renderRiskRows(currentProject.risks, currentLanguage);

    // Sự kiện xóa rủi ro
    tbody.querySelectorAll('.btn-delete-risk').forEach(btn => {
        btn.addEventListener('click', async () => {
            const riskId = btn.getAttribute('data-risk-id');
            currentProject.risks = currentProject.risks.filter(r => r.id !== riskId);
            await saveProject(currentProject);
            renderRisksTab();
            refreshDashboard();
        });
    });
}

function renderFinancialsTab() {
    document.getElementById('finPlannedCapexVal').innerText = `${currentProject.budget?.plannedCapex || 0} M$`;
    document.getElementById('finActualCapexVal').innerText = `${currentProject.budget?.actualCapex || 0} M$`;
    document.getElementById('finPlannedOpexVal').innerText = `${currentProject.budget?.plannedOpex || 0} M$`;
    document.getElementById('finActualOpexVal').innerText = `${currentProject.budget?.actualOpex || 0} M$`;

    // Điền giá trị vào form
    document.getElementById('inputPlannedCapex').value = currentProject.budget?.plannedCapex || 0;
    document.getElementById('inputActualCapex').value = currentProject.budget?.actualCapex || 0;
    document.getElementById('inputPlannedOpex').value = currentProject.budget?.plannedOpex || 0;
    document.getElementById('inputActualOpex').value = currentProject.budget?.actualOpex || 0;
}

function renderLogbookTab() {
    const container = document.getElementById('logTimelineContainer');
    container.innerHTML = renderLogbook(currentProject.logbook, currentLanguage);
}

// --- SETUP EVENT LISTENERS ---

function initEventListeners() {
    // 1. Chuyển đổi ngôn ngữ
    document.getElementById('langViBtn').addEventListener('click', () => setLanguage('vi'));
    document.getElementById('langEnBtn').addEventListener('click', () => setLanguage('en'));

    // 2. Ô tìm kiếm & Bộ lọc
    document.getElementById('searchInput').addEventListener('input', renderProjectsList);
    document.getElementById('statusFilter').addEventListener('change', renderProjectsList);
    document.getElementById('priorityFilter').addEventListener('change', renderProjectsList);

    // 3. Close Detail Modal
    document.getElementById('modalCloseBtn').addEventListener('click', () => {
        document.getElementById('detailModal').classList.remove('active');
        activeProjectId = null;
        currentProject = null;
    });

    // 4. Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Active Tab nút bấm
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Active Tab Content
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 5. Thêm dự án mới (Open form modal)
    document.getElementById('btnAddNew').addEventListener('click', () => {
        openProjectFormModal(null);
    });

    document.getElementById('btnEditProject').addEventListener('click', () => {
        // Đóng modal chi tiết tạm thời
        document.getElementById('detailModal').classList.remove('active');
        openProjectFormModal(currentProject);
    });

    // Close Form Modal
    document.getElementById('formModalCloseBtn').addEventListener('click', () => {
        document.getElementById('formModal').classList.remove('active');
    });
    document.getElementById('btnFormCancel').addEventListener('click', () => {
        document.getElementById('formModal').classList.remove('active');
    });

    // Submit Form Dự án
    document.getElementById('projectMainForm').addEventListener('submit', handleProjectFormSubmit);

    // 6. Nút xóa dự án
    document.getElementById('btnDeleteProject').addEventListener('click', async () => {
        if (!currentProject) return;
        const msg = translations[currentLanguage].confirmDelete;
        if (confirm(msg)) {
            await deleteProject(currentProject.id);
            document.getElementById('detailModal').classList.remove('active');
            activeProjectId = null;
            currentProject = null;
            await refreshDashboard();
        }
    });

    // 7. Tương tác bên trong các TAB chi tiết

    // DMS: Back button
    document.getElementById('btnDmsBack').addEventListener('click', async () => {
        if (dmsPathFolders.length > 0) {
            dmsPathFolders.pop();
            currentFolderId = dmsPathFolders.length > 0 ? dmsPathFolders[dmsPathFolders.length - 1].id : null;
            await renderDmsTab();
        }
    });

    // DMS: Tạo thư mục mới
    document.getElementById('btnDmsNewFolder').addEventListener('click', async () => {
        const promptMsg = currentLanguage === 'vi' ? 'Nhập tên thư mục mới:' : 'Enter new folder name:';
        const folderName = prompt(promptMsg);
        if (folderName && folderName.trim()) {
            const newFolderObj = {
                id: `fold_${Date.now()}`,
                projectId: activeProjectId,
                parentId: currentFolderId,
                name: folderName.trim()
            };
            await saveFolder(newFolderObj);
            await renderDmsTab();
        }
    });

    // DMS: Upload File
    const dmsFileInput = document.getElementById('dmsFileUploadInput');
    document.getElementById('btnDmsUpload').addEventListener('click', () => {
        dmsFileInput.click();
    });

    dmsFileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Tiến hành lưu file blob vào IndexedDB
        const newFileObj = {
            id: `file_${Date.now()}`,
            projectId: activeProjectId,
            folderId: currentFolderId,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
            data: file // IndexedDB hỗ trợ lưu trữ trực tiếp File/Blob
        };

        await saveFile(newFileObj);
        
        // Reset input để chọn lại được file cũ
        dmsFileInput.value = '';
        await renderDmsTab();
    });

    // Tab Risks: Thêm rủi ro mới
    document.getElementById('btnRiskAdd').addEventListener('click', async () => {
        const descInput = document.getElementById('newRiskDesc');
        const severitySelect = document.getElementById('newRiskSeverity');
        const statusSelect = document.getElementById('newRiskStatus');
        const mitigationInput = document.getElementById('newRiskMitigation');

        if (!descInput.value.trim()) return;

        const newRisk = {
            id: `risk_${Date.now()}`,
            description: descInput.value.trim(),
            severity: severitySelect.value,
            status: statusSelect.value,
            mitigation: mitigationInput.value.trim()
        };

        if (!currentProject.risks) currentProject.risks = [];
        currentProject.risks.push(newRisk);

        await saveProject(currentProject);
        
        // Reset form
        descInput.value = '';
        mitigationInput.value = '';
        
        renderRisksTab();
        refreshDashboard();
    });

    // Tab Financials: Cập nhật tài chính
    document.getElementById('btnSaveFinancials').addEventListener('click', async () => {
        const plannedCapex = parseFloat(document.getElementById('inputPlannedCapex').value) || 0;
        const actualCapex = parseFloat(document.getElementById('inputActualCapex').value) || 0;
        const plannedOpex = parseFloat(document.getElementById('inputPlannedOpex').value) || 0;
        const actualOpex = parseFloat(document.getElementById('inputActualOpex').value) || 0;

        currentProject.budget = {
            plannedCapex,
            actualCapex,
            plannedOpex,
            actualOpex
        };

        await saveProject(currentProject);
        renderFinancialsTab();
        refreshDashboard();
        alert(currentLanguage === 'vi' ? 'Cập nhật tài chính thành công!' : 'Financial details updated successfully!');
    });

    // Tab Logbook: Thêm nhật ký
    document.getElementById('btnLogAdd').addEventListener('click', async () => {
        const contentInput = document.getElementById('newLogContent');
        const authorInput = document.getElementById('newLogAuthor');

        if (!contentInput.value.trim() || !authorInput.value.trim()) return;

        const newLog = {
            id: `log_${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            content: contentInput.value.trim(),
            author: authorInput.value.trim()
        };

        if (!currentProject.logbook) currentProject.logbook = [];
        currentProject.logbook.push(newLog);

        await saveProject(currentProject);
        
        contentInput.value = '';
        authorInput.value = '';

        renderLogbookTab();
    });

    // 8. Backup / Restore / Reset Database
    document.getElementById('btnResetDemo').addEventListener('click', async () => {
        const confirmMsg = currentLanguage === 'vi' ? 'Bạn có chắc chắn muốn cài đặt lại toàn bộ dữ liệu mẫu ban đầu? Toàn bộ file tự tạo sẽ bị xóa!' : 'Reset all database to demo settings? All custom files will be lost!';
        if (confirm(confirmMsg)) {
            // Xóa cache DB
            localStorage.clear();
            const db = await openDB();
            db.close();
            indexedDB.deleteDatabase('PetroTrackDB');
            
            // Reload trang để khởi tạo lại
            window.location.reload();
        }
    });

    // Xuất tệp tin sao lưu
    document.getElementById('btnExport').addEventListener('click', async () => {
        try {
            const data = await exportDatabase();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `PetroTrack_Backup_${new Date().toISOString().slice(0,10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert('Lỗi xuất dữ liệu!');
        }
    });

    // Nhập tệp tin khôi phục
    const importFileInput = document.getElementById('importFileInput');
    document.getElementById('btnImport').addEventListener('click', () => {
        importFileInput.click();
    });

    importFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const parsedData = JSON.parse(event.target.result);
                await importDatabase(parsedData);
                alert(currentLanguage === 'vi' ? 'Khôi phục cơ sở dữ liệu thành công!' : 'Database restored successfully!');
                window.location.reload();
            } catch (err) {
                console.error(err);
                alert(currentLanguage === 'vi' ? 'Lỗi: Tệp khôi phục không đúng định dạng!' : 'Error: Invalid backup file format!');
            }
        };
        reader.readAsText(file);
    });
}

/**
 * Mở hộp thoại form dự án (thêm hoặc sửa)
 * @param {Object|null} editProj Đối tượng dự án cần sửa, null nếu thêm mới
 */
function openProjectFormModal(editProj) {
    const t = translations[currentLanguage];
    const form = document.getElementById('projectMainForm');
    form.reset();

    // Lưu trữ tạm thời trạng thái edit hay add trong form dataset
    if (editProj) {
        document.getElementById('formModalTitle').innerText = t.formTitleEdit;
        form.dataset.mode = 'edit';
        form.dataset.projectId = editProj.id;

        // Điền giá trị
        document.getElementById('formCode').value = editProj.code;
        document.getElementById('formPriority').value = editProj.priority;
        document.getElementById('formNameVi').value = editProj.nameVi;
        document.getElementById('formNameEn').value = editProj.nameEn;
        document.getElementById('formClient').value = editProj.client;
        document.getElementById('formManager').value = editProj.manager;
        document.getElementById('formLocation').value = editProj.location;
        document.getElementById('formSafeHours').value = editProj.safeHours || 0;
        document.getElementById('formStartDate').value = editProj.startDate;
        document.getElementById('formEndDate').value = editProj.endDate;
        document.getElementById('formDescription').value = editProj.description || '';
    } else {
        document.getElementById('formModalTitle').innerText = t.formTitleAdd;
        form.dataset.mode = 'add';
        delete form.dataset.projectId;
        document.getElementById('formSafeHours').value = 0;
    }

    document.getElementById('formModal').classList.add('active');
}

/**
 * Xử lý khi nhấn nút lưu form thông tin dự án chính
 */
async function handleProjectFormSubmit(e) {
    const form = document.getElementById('projectMainForm');
    const mode = form.dataset.mode;

    const code = document.getElementById('formCode').value.trim();
    const priority = document.getElementById('formPriority').value;
    const nameVi = document.getElementById('formNameVi').value.trim();
    const nameEn = document.getElementById('formNameEn').value.trim();
    const client = document.getElementById('formClient').value.trim();
    const manager = document.getElementById('formManager').value.trim();
    const location = document.getElementById('formLocation').value.trim();
    const safeHours = parseInt(document.getElementById('formSafeHours').value) || 0;
    const startDate = document.getElementById('formStartDate').value;
    const endDate = document.getElementById('formEndDate').value;
    const description = document.getElementById('formDescription').value.trim();

    if (mode === 'add') {
        // Tự động sinh mốc Gantt WBS chuẩn cho 6 giai đoạn dầu khí dựa trên ngày bắt đầu
        const tasks = generateDefaultTasks(startDate);

        const newProject = {
            id: `proj_${Date.now()}`,
            code,
            nameVi,
            nameEn,
            client,
            manager,
            startDate,
            endDate,
            description,
            status: 'on_track', // mặc định khi tạo mới
            priority,
            safeHours,
            budget: {
                plannedCapex: 100.0, // các thông số tài chính mặc định ban đầu
                actualCapex: 0,
                plannedOpex: 5.0,
                actualOpex: 0
            },
            tasks,
            risks: [],
            logbook: []
        };

        await saveProject(newProject);
    } else if (mode === 'edit') {
        const projectId = form.dataset.projectId;
        const projectToUpdate = allProjectsList.find(p => p.id === projectId);
        
        if (projectToUpdate) {
            projectToUpdate.code = code;
            projectToUpdate.priority = priority;
            projectToUpdate.nameVi = nameVi;
            projectToUpdate.nameEn = nameEn;
            projectToUpdate.client = client;
            projectToUpdate.manager = manager;
            projectToUpdate.location = location;
            projectToUpdate.safeHours = safeHours;
            projectToUpdate.startDate = startDate;
            projectToUpdate.endDate = endDate;
            projectToUpdate.description = description;

            // Kiểm tra nếu người dùng thay đổi ngày bắt đầu quá lệch, các task cũ vẫn giữ nguyên ngày cũ 
            // nhưng ta cập nhật lại tổng thể. Người dùng có thể chỉnh ngày thủ công trong tab Gantt.
            
            await saveProject(projectToUpdate);
        }
    }

    // Đóng form modal
    document.getElementById('formModal').classList.remove('active');
    
    // Refresh toàn bộ Dashboard
    await refreshDashboard();

    // Nếu đang sửa khi đang mở chi tiết dự án, tải lại chi tiết
    if (mode === 'edit' && activeProjectId) {
        openProjectDetail(activeProjectId);
    }
}
