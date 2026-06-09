/**
 * Petro-Track UI Components Module
 * Tạo mã HTML động cho các thành phần giao diện
 */

import { translations } from './data.js';

// Helper: Định dạng kích thước tệp tin
export function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Helper: Định dạng số phân tách hàng nghìn
export function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

/**
 * Tính toán tiến độ tổng hợp dựa trên trọng số của 6 giai đoạn
 * @param {Array} tasks Danh sách WBS tasks
 * @returns {number} Tiến độ trung bình tích lũy (%)
 */
export function calculateOverallProgress(tasks) {
    if (!tasks || tasks.length === 0) return 0;
    const totalProgress = tasks.reduce((sum, task) => {
        return sum + (task.progress * (task.weight || 0.166));
    }, 0);
    return Math.round(totalProgress);
}

/**
 * Vẽ thẻ Dự án (Project Card)
 * @param {Object} p Dự án
 * @param {string} lang Ngôn ngữ ('vi' hoặc 'en')
 * @returns {string} Chuỗi HTML của thẻ dự án
 */
export function renderProjectCard(p, lang) {
    const t = translations[lang];
    const name = lang === 'vi' ? p.nameVi : p.nameEn;
    const progress = calculateOverallProgress(p.tasks);

    return `
        <div class="project-card" data-id="${p.id}">
            <div class="project-card-header">
                <span class="project-code">${p.code}</span>
                <div class="project-badges">
                    <span class="badge badge-${p.status}">${t[p.status] || p.status}</span>
                    <span class="badge badge-${p.priority}">${t[p.priority] || p.priority}</span>
                </div>
            </div>
            
            <h3 class="project-title">${name}</h3>
            <p class="project-desc">${p.description || ''}</p>
            
            <div class="project-meta">
                <div class="project-meta-item">
                    <i class="ph ph-user"></i>
                    <span>PM: ${p.manager}</span>
                </div>
                <div class="project-meta-item">
                    <i class="ph ph-map-pin"></i>
                    <span>${p.location}</span>
                </div>
                <div class="project-meta-item">
                    <i class="ph ph-calendar-blank"></i>
                    <span>${p.startDate}</span>
                </div>
                <div class="project-meta-item">
                    <i class="ph ph-flag-checkered"></i>
                    <span>${p.endDate}</span>
                </div>
            </div>
            
            <div class="project-progress-container">
                <div class="progress-header">
                    <span data-i18n="progress">${t.progress}</span>
                    <span>${progress}%</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${progress}%"></div>
                </div>
            </div>
            
            <div class="project-card-footer">
                <div class="safe-hours-indicator">
                    <i class="ph-bold ph-gauge"></i>
                    <span>${formatNumber(p.equipmentCount || 0)} ${t.kpiSafeHours.toLowerCase()}</span>
                </div>
                <button class="btn btn-secondary btn-icon btn-open-project" data-id="${p.id}" title="${lang === 'vi' ? 'Xem chi tiết' : 'Open details'}">
                    <i class="ph-bold ph-arrow-square-out"></i>
                </button>
            </div>
        </div>
    `;
}

/**
 * Vẽ danh sách các hàng cho Sơ đồ Gantt & WBS
 * @param {Array} tasks Danh sách các giai đoạn
 * @param {string} lang Ngôn ngữ
 * @returns {string} Chuỗi HTML tbody
 */
export function renderGanttRows(tasks, lang) {
    const t = translations[lang];
    
    return tasks.map(task => {
        const phaseName = t[task.phaseKey] || task.phaseKey;
        const weightPct = Math.round(task.weight * 100) + '%';
        
        return `
            <tr data-task-id="${task.id}">
                <td>
                    <div style="font-weight: 600; color: var(--text-primary);">${phaseName}</div>
                </td>
                <td>
                    <span class="badge" style="background: var(--bg-hover); color: var(--teal); border: 1px solid rgba(0, 242, 254, 0.2);">${weightPct}</span>
                </td>
                <td>
                    <div class="gantt-date-badge">
                        <i class="ph ph-calendar" style="margin-right: 0.25rem;"></i>
                        ${task.startDate} <i class="ph ph-arrow-right" style="font-size: 0.7rem;"></i> ${task.endDate}
                    </div>
                </td>
                <td style="text-align: center; font-weight: 700; font-family: var(--font-heading); color: var(--teal);">
                    <span class="task-progress-value">${task.progress}%</span>
                </td>
                <td class="gantt-bar-cell">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <input type="range" class="gantt-progress-slider" 
                               value="${task.progress}" min="0" max="100" 
                               data-task-id="${task.id}">
                    </div>
                    <div class="gantt-timeline-bar-wrapper">
                        <div class="gantt-timeline-bar-fill" style="width: ${task.progress}%;"></div>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Vẽ cấu trúc cây thư mục và file của DMS
 * @param {Array} folders Danh sách thư mục thuộc thư mục cha hiện tại
 * @param {Array} files Danh sách file thuộc thư mục cha hiện tại
 * @param {string} lang Ngôn ngữ
 * @returns {string} Chuỗi HTML grid
 */
export function renderDmsGrid(folders, files, lang) {
    const t = translations[lang];
    let html = '';

    if (folders.length === 0 && files.length === 0) {
        return `
            <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-muted);">
                <i class="ph ph-folder-open" style="font-size: 4rem; display: block; margin: 0 auto 1rem auto; opacity: 0.5;"></i>
                <p>${t.folderEmpty}</p>
            </div>
        `;
    }

    // Render Thư mục
    folders.forEach(f => {
        html += `
            <div class="dms-item dms-folder-item" data-folder-id="${f.id}">
                <div class="dms-icon dms-icon-folder">
                    <i class="ph-fill ph-folder"></i>
                </div>
                <div class="dms-name" title="${f.name}">${f.name}</div>
                <div class="dms-size">-</div>
                <div class="dms-actions">
                    <button class="dms-action-btn btn-delete btn-delete-folder" data-folder-id="${f.id}" title="${t.delete}">
                        <i class="ph ph-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    // Render File
    files.forEach(file => {
        const fileExt = file.name.split('.').pop().toLowerCase();
        let iconHtml = '<i class="ph-fill ph-file"></i>';
        
        // Chọn icon tương ứng với loại định dạng file
        if (['pdf'].includes(fileExt)) {
            iconHtml = '<i class="ph-fill ph-file-pdf" style="color: #ef4444;"></i>';
        } else if (['doc', 'docx'].includes(fileExt)) {
            iconHtml = '<i class="ph-fill ph-file-doc" style="color: #3b82f6;"></i>';
        } else if (['xls', 'xlsx', 'csv'].includes(fileExt)) {
            iconHtml = '<i class="ph-fill ph-file-xls" style="color: #10b981;"></i>';
        } else if (['ppt', 'pptx'].includes(fileExt)) {
            iconHtml = '<i class="ph-fill ph-file-ppt" style="color: #f59e0b;"></i>';
        } else if (['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(fileExt)) {
            iconHtml = '<i class="ph-fill ph-file-image" style="color: #a855f7;"></i>';
        } else if (['zip', 'rar', '7z'].includes(fileExt)) {
            iconHtml = '<i class="ph-fill ph-file-zip" style="color: #94a3b8;"></i>';
        }

        html += `
            <div class="dms-item dms-file-item" data-file-id="${file.id}">
                <div class="dms-icon dms-icon-file">
                    ${iconHtml}
                </div>
                <div class="dms-name" title="${file.name}">${file.name}</div>
                <div class="dms-size">${formatBytes(file.size)}</div>
                <div class="dms-actions">
                    <button class="dms-action-btn btn-download-file" data-file-id="${file.id}" title="${t.download}">
                        <i class="ph ph-download-simple"></i>
                    </button>
                    <button class="dms-action-btn btn-delete btn-delete-file" data-file-id="${file.id}" title="${t.delete}">
                        <i class="ph ph-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    return html;
}

/**
 * Vẽ Breadcrumbs định vị thư mục hiện hành
 * @param {Array} pathFolders Danh sách các thư mục từ gốc đến thư mục hiện tại
 * @param {string} lang Ngôn ngữ
 * @returns {string} Chuỗi HTML Breadcrumbs
 */
export function renderDmsBreadcrumbs(pathFolders, lang) {
    const t = translations[lang];
    let html = `<span class="dms-path-node" data-folder-id="root">${t.tabDms}</span>`;

    pathFolders.forEach(folder => {
        html += `
            <span class="dms-path-separator">/</span>
            <span class="dms-path-node" data-folder-id="${folder.id}">${folder.name}</span>
        `;
    });

    return html;
}

/**
 * Vẽ Bảng Rủi ro (Risk Register Table)
 * @param {Array} risks Danh sách rủi ro của dự án
 * @param {string} lang Ngôn ngữ
 * @returns {string} Chuỗi HTML tr
 */
export function renderRiskRows(risks, lang) {
    const t = translations[lang];
    if (!risks || risks.length === 0) {
        return `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">
                    <i class="ph ph-shield-warning" style="font-size: 2rem; display: block; margin-bottom: 0.5rem; opacity: 0.5;"></i>
                    Chưa có ghi nhận rủi ro nào cho dự án này.
                </td>
            </tr>
        `;
    }

    return risks.map(r => {
        const severityBadgeClass = `badge-${r.severity}`;
        const statusBadgeClass = `badge-${r.status === 'open' ? 'critical' : r.status === 'mitigated' ? 'delayed' : 'completed'}`;
        
        return `
            <tr data-risk-id="${r.id}">
                <td>
                    <div style="font-weight: 500; color: var(--text-primary);">${r.description}</div>
                </td>
                <td>
                    <span class="badge ${severityBadgeClass}">${t[r.severity] || r.severity}</span>
                </td>
                <td>
                    <span class="badge ${statusBadgeClass}">${t['risk' + r.status.charAt(0).toUpperCase() + r.status.slice(1)] || r.status}</span>
                </td>
                <td>
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">${r.mitigation || ''}</div>
                </td>
                <td>
                    <button class="dms-action-btn btn-delete btn-delete-risk" data-risk-id="${r.id}" title="${t.delete}">
                        <i class="ph ph-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Vẽ Nhật ký tuần (Logbook Timeline)
 * @param {Array} logs Nhật ký tuần
 * @param {string} lang Ngôn ngữ
 * @returns {string} Chuỗi HTML timeline
 */
export function renderLogbook(logs, lang) {
    const t = translations[lang];
    if (!logs || logs.length === 0) {
        return `
            <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
                <i class="ph ph-note-pencil" style="font-size: 2rem; display: block; margin-bottom: 0.5rem; opacity: 0.5;"></i>
                Chưa có nhật ký nào được ghi nhận cho dự án này.
            </div>
        `;
    }

    // Sắp xếp nhật ký mới nhất lên trên đầu
    const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedLogs.map(l => {
        return `
            <div class="log-item" data-log-id="${l.id}">
                <div class="log-meta">
                    <span class="log-date-tag">${l.date}</span>
                    <span class="log-author-tag">
                        <i class="ph ph-user-circle"></i> ${l.author}
                    </span>
                </div>
                <div class="log-content">${l.content}</div>
            </div>
        `;
    }).join('');
}
