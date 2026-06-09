/**
 * Petro-Track Data & Translation Module
 * Chứa cấu trúc dữ liệu mẫu, bộ dịch song ngữ và các hàm bổ trợ
 */

// Bộ dịch thuật song ngữ Việt - Anh
export const translations = {
    vi: {
        appTitle: "Hệ thống Quản lý Dự án Petro-Track",
        dashboard: "Bảng điều khiển",
        projectsList: "Danh sách dự án",
        addProject: "Thêm dự án mới",
        editProject: "Chỉnh sửa dự án",
        exportData: "Xuất dữ liệu backup",
        importData: "Nhập dữ liệu backup",
        resetDemo: "Nạp dữ liệu mẫu",
        language: "Ngôn ngữ",
        searchPlaceholder: "Tìm kiếm dự án (tên, mã)...",
        statusAll: "Tất cả trạng thái",
        priorityAll: "Tất cả độ ưu tiên",
        
        // Trạng thái dự án
        on_track: "Đúng tiến độ",
        delayed: "Trễ tiến độ",
        critical: "Rất nghiêm trọng",
        completed: "Đã hoàn thành",

        // Độ ưu tiên
        low: "Thấp",
        medium: "Trung bình",
        high: "Cao",

        // KPIs
        kpiTotal: "Tổng số dự án",
        kpiProgress: "Tiến độ trung bình",
        kpiBudget: "Ngân sách CAPEX",
        kpiBudgetPlanned: "Kế hoạch",
        kpiBudgetSpent: "Thực chi",
        kpiSafeHours: "Giờ làm việc an toàn",
        kpiActive: "Đang hoạt động",

        // Charts
        chartProgressTitle: "Tiến độ dự án theo giai đoạn",
        chartBudgetTitle: "Ngân sách dự chi vs Thực tế (Triệu USD)",
        chartRiskTitle: "Phân bổ mức độ rủi ro",

        // Table / Headers
        projCode: "Mã dự án",
        projName: "Tên dự án",
        client: "Khách hàng",
        location: "Địa điểm",
        manager: "Quản lý dự án (PM)",
        startDate: "Ngày bắt đầu",
        endDate: "Ngày kết thúc",
        progress: "Tiến độ",
        status: "Trạng thái",
        priority: "Độ ưu tiên",
        actions: "Thao tác",
        description: "Mô tả dự án",

        // Tabs
        tabGeneral: "Thông tin chung",
        tabSchedule: "Tiến độ & Gantt",
        tabDms: "Tài liệu & Thư mục",
        tabRisks: "Quản trị rủi ro",
        tabFinancials: "Tài chính",
        tabLogbook: "Nhật ký tuần",

        // DMS (Tài liệu)
        dmsTitle: "Hệ thống tài liệu dự án",
        newFolder: "Tạo thư mục mới",
        uploadFile: "Tải tệp tin lên",
        folderName: "Tên thư mục",
        fileName: "Tên tệp tin",
        fileSize: "Kích thước",
        uploadedDate: "Ngày tải lên",
        noFiles: "Chưa có thư mục hoặc tệp tin nào. Hãy tạo thư mục đầu tiên!",
        folderEmpty: "Thư mục này trống",
        backToParent: "Quay lại thư mục cha",
        download: "Tải xuống",
        delete: "Xóa",
        dmsSearch: "Tìm tài liệu...",

        // Gantt / Schedule
        ganttTitle: "Kế hoạch tiến độ chi tiết (WBS)",
        ganttPhase: "Giai đoạn",
        ganttWeight: "Trọng số",
        ganttDates: "Thời gian thực hiện",
        editSchedule: "Cập nhật tiến độ giai đoạn",
        autoGenNote: "Bảng tiến độ này được sinh tự động dựa trên ngày bắt đầu dự án.",

        // Risk Register
        riskDesc: "Mô tả rủi ro / Sự cố",
        riskSeverity: "Mức độ",
        riskStatus: "Trạng thái",
        riskMitigation: "Biện pháp giảm thiểu",
        addRisk: "Thêm rủi ro mới",
        riskOpen: "Đang mở",
        riskMitigated: "Đã giảm bớt",
        riskClosed: "Đã đóng",

        // Financials
        finPlannedCapex: "Kế hoạch CAPEX (Triệu USD)",
        finActualCapex: "Thực tế CAPEX (Triệu USD)",
        finPlannedOpex: "Kế hoạch OPEX (Triệu USD)",
        finActualOpex: "Thực tế OPEX (Triệu USD)",
        finUnit: "triệu USD",

        // Logbook
        logDate: "Ngày ghi",
        logContent: "Nội dung cập nhật",
        logAuthor: "Người ghi",
        addLog: "Ghi nhật ký mới",

        // Buttons & Modals
        save: "Lưu lại",
        cancel: "Hủy bỏ",
        confirmDelete: "Bạn có chắc chắn muốn xóa dự án này cùng tất cả tài liệu đính kèm?",
        formTitleAdd: "Thêm dự án mới",
        formTitleEdit: "Chỉnh sửa thông tin dự án",
        
        // Giai đoạn dầu khí (Phases)
        phase1: "Nghiên cứu khả thi (Feasibility)",
        phase2: "Thiết kế kỹ thuật tổng thể (FEED)",
        phase3: "Thiết kế chi tiết (Detailed Design)",
        phase4: "Mua sắm thiết bị (Procurement)",
        phase5: "Chế tạo & Thi công (Construction)",
        phase6: "Chạy thử & Bàn giao (Commissioning)"
    },
    en: {
        appTitle: "Petro-Track Project Management System",
        dashboard: "Dashboard",
        projectsList: "Projects List",
        addProject: "Add New Project",
        editProject: "Edit Project",
        exportData: "Export Backup",
        importData: "Import Backup",
        resetDemo: "Load Demo Data",
        language: "Language",
        searchPlaceholder: "Search projects (name, code)...",
        statusAll: "All Statuses",
        priorityAll: "All Priorities",

        // Project Status
        on_track: "On Track",
        delayed: "Delayed",
        critical: "Critical",
        completed: "Completed",

        // Priority
        low: "Low",
        medium: "Medium",
        high: "High",

        // KPIs
        kpiTotal: "Total Projects",
        kpiProgress: "Average Progress",
        kpiBudget: "CAPEX Budget",
        kpiBudgetPlanned: "Planned",
        kpiBudgetSpent: "Spent",
        kpiSafeHours: "Safe Man-Hours",
        kpiActive: "Active",

        // Charts
        chartProgressTitle: "Project Progress by Phase",
        chartBudgetTitle: "Planned Budget vs Actual (Million USD)",
        chartRiskTitle: "Risk Distribution Matrix",

        // Table / Headers
        projCode: "Proj Code",
        projName: "Project Name",
        client: "Client",
        location: "Location",
        manager: "Project Manager (PM)",
        startDate: "Start Date",
        endDate: "End Date",
        progress: "Progress",
        status: "Status",
        priority: "Priority",
        actions: "Actions",
        description: "Description",

        // Tabs
        tabGeneral: "General Info",
        tabSchedule: "Schedule & Gantt",
        tabDms: "Docs & Folders",
        tabRisks: "Risk Register",
        tabFinancials: "Financials",
        tabLogbook: "Weekly Log",

        // DMS
        dmsTitle: "Project Document Management",
        newFolder: "Create Folder",
        uploadFile: "Upload Document",
        folderName: "Folder Name",
        fileName: "File Name",
        fileSize: "Size",
        uploadedDate: "Uploaded At",
        noFiles: "No folders or files here. Create your first folder!",
        folderEmpty: "This folder is empty",
        backToParent: "Back to Parent Directory",
        download: "Download",
        delete: "Delete",
        dmsSearch: "Search files...",

        // Gantt / Schedule
        ganttTitle: "Work Breakdown Structure (WBS)",
        ganttPhase: "Phase",
        ganttWeight: "Weight",
        ganttDates: "Duration",
        editSchedule: "Update Phase Progress",
        autoGenNote: "This schedule was automatically generated based on the project start date.",

        // Risk Register
        riskDesc: "Risk Description / Issue",
        riskSeverity: "Severity",
        riskStatus: "Status",
        riskMitigation: "Mitigation Plan",
        addRisk: "Add New Risk",
        riskOpen: "Open",
        riskMitigated: "Mitigated",
        riskClosed: "Closed",

        // Financials
        finPlannedCapex: "Planned CAPEX ($M)",
        finActualCapex: "Actual CAPEX ($M)",
        finPlannedOpex: "Planned OPEX ($M)",
        finActualOpex: "Actual OPEX ($M)",
        finUnit: "million USD",

        // Logbook
        logDate: "Log Date",
        logContent: "Weekly Highlights",
        logAuthor: "Logged By",
        addLog: "Add New Log",

        // Buttons & Modals
        save: "Save",
        cancel: "Cancel",
        confirmDelete: "Are you sure you want to delete this project and all its documents?",
        formTitleAdd: "Create New Project",
        formTitleEdit: "Edit Project Information",

        // Phases
        phase1: "Feasibility Study",
        phase2: "Front-End Engineering Design (FEED)",
        phase3: "Detailed Design",
        phase4: "Procurement",
        phase5: "Fabrication & Construction",
        phase6: "Commissioning & Handover"
    }
};

// Định nghĩa trọng số và tên mặc định của 6 giai đoạn tiêu chuẩn dầu khí
export const standardPhases = [
    { key: 'phase1', weight: 0.10, durationMonths: 2 },
    { key: 'phase2', weight: 0.15, durationMonths: 4 },
    { key: 'phase3', weight: 0.20, durationMonths: 6 },
    { key: 'phase4', weight: 0.15, durationMonths: 6 },
    { key: 'phase5', weight: 0.30, durationMonths: 10 },
    { key: 'phase6', weight: 0.10, durationMonths: 2 }
];

// Hàm cộng thêm tháng vào chuỗi ngày dạng YYYY-MM-DD
function addMonths(dateStr, months) {
    const date = new Date(dateStr);
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split('T')[0];
}

// Hàm khởi tạo danh sách 6 giai đoạn dự án tự động từ ngày bắt đầu dự án
export function generateDefaultTasks(startDateStr) {
    let currentStart = startDateStr;
    return standardPhases.map((phase, index) => {
        // Một số giai đoạn có thể chạy song song (ví dụ: Procurement chạy song song Detailed Design)
        // Ta ước lượng thời gian một cách logic
        let start = currentStart;
        if (phase.key === 'phase4') {
            // Mua sắm bắt đầu sau khi thiết kế chi tiết chạy được một nửa
            const detailedDesignStart = new Date(currentStart);
            detailedDesignStart.setMonth(detailedDesignStart.getMonth() - 2); // giả sử lùi lại chút
            start = detailedDesignStart.toISOString().split('T')[0];
            if (start < startDateStr) start = startDateStr;
        }
        
        const duration = phase.durationMonths;
        const end = addMonths(start, duration);
        
        // Lưu tiến độ mốc tiếp theo làm điểm bắt đầu cho giai đoạn sau (trừ mua sắm)
        if (phase.key !== 'phase4') {
            currentStart = end;
        }

        return {
            id: `task_${index + 1}`,
            phaseKey: phase.key,
            weight: phase.weight,
            progress: 0,
            startDate: start,
            endDate: end
        };
    });
}

// Dữ liệu dự án mẫu ban đầu (Demo data)
export const demoProjects = [
    {
        id: 'proj_block_b_omon',
        code: 'P-BBO-01',
        nameVi: 'Dự án Đường ống dẫn khí Lô B - Ô Môn',
        nameEn: 'Block B - O Mon Gas Pipeline Project',
        client: 'Vietnam Oil & Gas Group (PVN)',
        location: 'Vịnh Thái Lan / Cần Thơ, Việt Nam',
        manager: 'Nguyễn Minh Quân',
        startDate: '2025-01-15',
        endDate: '2027-06-30',
        description: 'Dự án xây dựng tuyến đường ống dẫn khí ngoài khơi từ Lô B về bờ biển Tây Nam Bộ cung cấp khí cho tổ hợp các nhà máy điện Ô Môn.',
        status: 'on_track',
        priority: 'high',
        safeHours: 2450000,
        budget: {
            plannedCapex: 1200.0,
            actualCapex: 720.0,
            plannedOpex: 45.0,
            actualOpex: 12.0
        },
        tasks: [
            { id: 'task_1', phaseKey: 'phase1', weight: 0.10, progress: 100, startDate: '2025-01-15', endDate: '2025-03-15' },
            { id: 'task_2', phaseKey: 'phase2', weight: 0.15, progress: 100, startDate: '2025-03-15', endDate: '2025-07-15' },
            { id: 'task_3', phaseKey: 'phase3', weight: 0.20, progress: 95, startDate: '2025-07-15', endDate: '2026-01-15' },
            { id: 'task_4', phaseKey: 'phase4', weight: 0.15, progress: 80, startDate: '2025-10-15', endDate: '2026-04-15' },
            { id: 'task_5', phaseKey: 'phase5', weight: 0.30, progress: 45, startDate: '2026-01-15', endDate: '2026-11-15' },
            { id: 'task_6', phaseKey: 'phase6', weight: 0.10, progress: 0, startDate: '2026-11-15', endDate: '2027-01-15' }
        ],
        risks: [
            {
                id: 'risk_1',
                description: 'Trễ tiến độ bàn giao thiết bị van ngắt khẩn cấp (ESD Valves) từ nhà sản xuất châu Âu.',
                severity: 'medium',
                status: 'mitigated',
                mitigation: 'Đã đàm phán với nhà cung cấp dự phòng tại Hàn Quốc và cử kỹ sư kiểm định chất lượng túc trực tại xưởng sản xuất.'
            },
            {
                id: 'risk_2',
                description: 'Điều kiện thời tiết xấu (bão nhiệt đới) cản trở công tác rải ống ngoài khơi vào mùa mưa.',
                severity: 'high',
                status: 'open',
                mitigation: 'Thiết lập phương án dự phòng thời tiết, tăng cường ca kíp thi công tối đa trong các cửa sổ thời tiết thuận lợi.'
            }
        ],
        logbook: [
            { id: 'log_1', date: '2026-06-01', content: 'Hoàn thành lắp đặt 45km đường ống nhánh biển thứ nhất. Đã kiểm tra siêu âm mối hàn đạt 99.8% chất lượng.', author: 'Trần Văn Dũng' },
            { id: 'log_2', date: '2026-06-08', content: 'Vận chuyển trạm tiếp bờ (LFS) đến vị trí lắp đặt an toàn. Bắt đầu căn chỉnh móng cọc.', author: 'Lê Hoàng Nam' }
        ]
    },
    {
        id: 'proj_su_tu_trang',
        code: 'P-STT-2B',
        nameVi: 'Phát triển mỏ Sư Tử Trắng - Giai đoạn 2B',
        nameEn: 'Su Tu Trang Full Field Development - Phase 2B',
        client: 'Cuu Long Joint Operating Company (CLJOC)',
        location: 'Lô 15-1, Bể Cửu Long, Việt Nam',
        manager: 'David Harrison',
        startDate: '2025-09-01',
        endDate: '2027-12-31',
        description: 'Dự án khoan thêm các giếng khai thác ngưng tụ (condensate) và khí ẩm, lắp đặt giàn đầu giếng mới kết nối về giàn trung tâm hiện hữu.',
        status: 'on_track',
        priority: 'high',
        safeHours: 850000,
        budget: {
            plannedCapex: 480.0,
            actualCapex: 120.0,
            plannedOpex: 18.0,
            actualOpex: 2.5
        },
        tasks: [
            { id: 'task_1', phaseKey: 'phase1', weight: 0.10, progress: 100, startDate: '2025-09-01', endDate: '2025-11-01' },
            { id: 'task_2', phaseKey: 'phase2', weight: 0.15, progress: 85, startDate: '2025-11-01', endDate: '2026-03-01' },
            { id: 'task_3', phaseKey: 'phase3', weight: 0.20, progress: 30, startDate: '2026-03-01', endDate: '2026-09-01' },
            { id: 'task_4', phaseKey: 'phase4', weight: 0.15, progress: 15, startDate: '2026-05-01', endDate: '2026-11-01' },
            { id: 'task_5', phaseKey: 'phase5', weight: 0.30, progress: 0, startDate: '2026-09-01', endDate: '2027-07-01' },
            { id: 'task_6', phaseKey: 'phase6', weight: 0.10, progress: 0, startDate: '2027-07-01', endDate: '2027-09-01' }
        ],
        risks: [
            {
                id: 'risk_1',
                description: 'Độ lún của giàn đầu giếng vượt mức tính toán ban đầu do địa chất địa tầng phức tạp.',
                severity: 'medium',
                status: 'open',
                mitigation: 'Thuê nhà thầu tư vấn quốc tế chạy mô phỏng địa kỹ thuật nâng cao và tối ưu hóa hệ thống gia cố cọc móng.'
            }
        ],
        logbook: [
            { id: 'log_1', date: '2026-05-15', content: 'Chốt thông số bản thiết kế 3D Model giàn đầu giếng (WHP). Chuẩn bị họp phê duyệt Hazop.', author: 'Nguyễn Thị Hải' }
        ]
    },
    {
        id: 'proj_lac_da_vang',
        code: 'P-LDV-03',
        nameVi: 'Dự án Phát triển mỏ Lạc Đà Vàng',
        nameEn: 'Lac Da Vang Field Development Project',
        client: 'Murphy Oil Corporation',
        location: 'Lô 15-1/05, Bể Cửu Long, Việt Nam',
        manager: 'Phạm Hồng Thái',
        startDate: '2026-03-01',
        endDate: '2028-10-31',
        description: 'Dự án phát triển mỏ dầu cận biên Lạc Đà Vàng thông qua hệ thống giàn khai thác WHP kết nối với tàu chứa và xử lý dầu thô (FPSO).',
        status: 'delayed',
        priority: 'medium',
        safeHours: 120000,
        budget: {
            plannedCapex: 690.0,
            actualCapex: 45.0,
            plannedOpex: 22.0,
            actualOpex: 0.8
        },
        tasks: [
            { id: 'task_1', phaseKey: 'phase1', weight: 0.10, progress: 100, startDate: '2026-03-01', endDate: '2026-05-01' },
            { id: 'task_2', phaseKey: 'phase2', weight: 0.15, progress: 40, startDate: '2026-05-01', endDate: '2026-09-01' },
            { id: 'task_3', phaseKey: 'phase3', weight: 0.20, progress: 0, startDate: '2026-09-01', endDate: '2027-03-01' },
            { id: 'task_4', phaseKey: 'phase4', weight: 0.15, progress: 0, startDate: '2026-11-01', endDate: '2027-05-01' },
            { id: 'task_5', phaseKey: 'phase5', weight: 0.30, progress: 0, startDate: '2027-03-01', endDate: '2028-01-01' },
            { id: 'task_6', phaseKey: 'phase6', weight: 0.10, progress: 0, startDate: '2028-01-01', endDate: '2028-03-01' }
        ],
        risks: [
            {
                id: 'risk_1',
                description: 'Trễ hạn phê duyệt Kế hoạch phát triển mỏ (FDP) từ cơ quan quản lý nhà nước.',
                severity: 'high',
                status: 'open',
                mitigation: 'Tăng cường phối hợp và giải trình chi tiết kỹ thuật trực tiếp cho Bộ Công Thương và Tập đoàn PVN để đẩy nhanh phê duyệt.'
            }
        ],
        logbook: [
            { id: 'log_1', date: '2026-04-10', content: 'Hoàn thành khảo sát địa hình đáy biển khu vực neo đậu FPSO.', author: 'Trần Văn Chiến' }
        ]
    }
];

// Seed thư mục mẫu cho dự án Block B
export const demoFolders = [
    { id: 'fold_bbo_drawings', projectId: 'proj_block_b_omon', parentId: null, name: 'Bản vẽ Kỹ thuật' },
    { id: 'fold_bbo_reports', projectId: 'proj_block_b_omon', parentId: null, name: 'Báo cáo Tuần / Tháng' },
    { id: 'fold_bbo_contracts', projectId: 'proj_block_b_omon', parentId: null, name: 'Hợp đồng & Pháp lý' },
    { id: 'fold_bbo_detailed_dwg', projectId: 'proj_block_b_omon', parentId: 'fold_bbo_drawings', name: 'Bản vẽ thiết kế chi tiết' }
];

// Vì chúng ta lưu trong IndexedDB là Blobs, dữ liệu file mẫu ta sẽ tạo dưới dạng file Text đơn giản
export const demoFiles = [
    {
        id: 'file_bbo_dwg1',
        projectId: 'proj_block_b_omon',
        folderId: 'fold_bbo_detailed_dwg',
        name: 'Block_B_Overall_Pipeline_Layout.pdf',
        size: 1542000,
        type: 'application/pdf',
        uploadedAt: '2026-05-10T14:30:00Z',
        data: new Blob(['Bản vẽ tổng thể tuyến ống dẫn khí Lô B Ô Môn - Demo'], { type: 'application/pdf' })
    },
    {
        id: 'file_bbo_contract1',
        projectId: 'proj_block_b_omon',
        folderId: 'fold_bbo_contracts',
        name: 'EPC_Contract_PVN_Murphy.docx',
        size: 245000,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        uploadedAt: '2026-02-15T09:15:00Z',
        data: new Blob(['Hợp đồng thiết kế EPC - Bản tóm tắt điều khoản'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
    }
];
