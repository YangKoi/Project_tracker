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
        kpiSafeHours: "Tổng thiết bị cung cấp",
        kpiActive: "Đang hoạt động",

        // Charts
        chartProgressTitle: "Phân bổ trạng thái dự án",
        chartBudgetTitle: "Ngân sách dự chi vs Thực tế",
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
        phase1: "Khởi động & Làm rõ kỹ thuật (Clarification)",
        phase2: "Thiết kế & Phê duyệt tài liệu (Engineering)",
        phase3: "Chế tạo thiết bị tại nhà máy (Manufacturing)",
        phase4: "Kiểm thử chấp nhận tại xưởng (FAT)",
        phase5: "Vận chuyển & Bàn giao (Delivery)",
        phase6: "Giám sát lắp đặt & Chạy thử (SAT/Commissioning)"
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
        kpiSafeHours: "Total Equipment",
        kpiActive: "Active",

        // Charts
        chartProgressTitle: "Project Status Distribution",
        chartBudgetTitle: "Planned Budget vs Actual",
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
        phase1: "Kick-off & Technical Clarification",
        phase2: "Engineering & Document Approval",
        phase3: "Equipment Manufacturing & Fabrication",
        phase4: "Factory Acceptance Test (FAT)",
        phase5: "Delivery & Site Handover",
        phase6: "Installation & Commissioning Support (SAT)"
    }
};

// Định nghĩa trọng số và thời gian thực hiện mặc định của 6 giai đoạn cấp thiết bị đo khí
export const standardPhases = [
    { key: 'phase1', weight: 0.10, durationMonths: 1 },
    { key: 'phase2', weight: 0.15, durationMonths: 2 },
    { key: 'phase3', weight: 0.35, durationMonths: 4 },
    { key: 'phase4', weight: 0.15, durationMonths: 1 },
    { key: 'phase5', weight: 0.15, durationMonths: 2 },
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
        const start = currentStart;
        const duration = phase.durationMonths;
        const end = addMonths(start, duration);
        currentStart = end; // Chạy tuần tự

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
        nameVi: 'Cung cấp hệ thống đo khí Lô B - Ô Môn',
        nameEn: 'Gas Detection System Supply - Block B - O Mon',
        client: 'Vietnam Oil & Gas Group (PVN)',
        location: 'Vịnh Thái Lan / Cần Thơ, Việt Nam',
        manager: 'Nguyễn Minh Quân',
        startDate: '2025-01-15',
        endDate: '2027-06-30',
        description: 'Cung cấp thiết bị đo khí cố định (Fixed Gas Detectors) và tủ điều khiển trung tâm bảo vệ trạm tiếp bờ và hệ thống đường ống.',
        status: 'on_track',
        priority: 'high',
        equipmentCount: 150,
        tasks: [
            { id: 'task_1', phaseKey: 'phase1', weight: 0.10, progress: 100, startDate: '2025-01-15', endDate: '2025-02-15' },
            { id: 'task_2', phaseKey: 'phase2', weight: 0.15, progress: 100, startDate: '2025-02-15', endDate: '2025-04-15' },
            { id: 'task_3', phaseKey: 'phase3', weight: 0.35, progress: 95, startDate: '2025-04-15', endDate: '2025-08-15' },
            { id: 'task_4', phaseKey: 'phase4', weight: 0.15, progress: 80, startDate: '2025-08-15', endDate: '2025-09-15' },
            { id: 'task_5', phaseKey: 'phase5', weight: 0.15, progress: 45, startDate: '2025-09-15', endDate: '2025-11-15' },
            { id: 'task_6', phaseKey: 'phase6', weight: 0.10, progress: 0, startDate: '2025-11-15', endDate: '2026-01-15' }
        ],
        risks: [
            {
                id: 'risk_1',
                description: 'Trễ tiến độ bàn giao thiết bị cảm biến hồng ngoại từ nhà sản xuất châu Âu.',
                severity: 'medium',
                status: 'mitigated',
                mitigation: 'Đã đàm phán với nhà cung cấp dự phòng tại Hàn Quốc và cử kỹ sư kiểm định chất lượng túc trực tại xưởng sản xuất.'
            },
            {
                id: 'risk_2',
                description: 'Khách hàng thay đổi yêu cầu kỹ thuật về chứng chỉ phòng nổ (ATEX/IECEx).',
                severity: 'high',
                status: 'open',
                mitigation: 'Tổ chức cuộc họp khẩn cấp để làm rõ tiêu chuẩn và chuẩn bị hồ sơ đệ trình bổ sung.'
            }
        ],
        logbook: [
            { id: 'log_1', date: '2026-06-01', content: 'Hoàn thành lắp ráp thử nghiệm tủ điều khiển đo khí đầu tiên tại xưởng.', author: 'Trần Văn Dũng' },
            { id: 'log_2', date: '2026-06-08', content: 'Gửi tài liệu thiết kế chi tiết (Wiring Diagram) đợt 2 cho khách hàng phê duyệt.', author: 'Lê Hoàng Nam' }
        ]
    },
    {
        id: 'proj_su_tu_trang',
        code: 'P-STT-2B',
        nameVi: 'Cung cấp thiết bị đo khí Sư Tử Trắng - Gđ 2B',
        nameEn: 'Gas Detection Package - Su Tu Trang - Phase 2B',
        client: 'Cuu Long Joint Operating Company (CLJOC)',
        location: 'Lô 15-1, Bể Cửu Long, Việt Nam',
        manager: 'David Harrison',
        startDate: '2025-09-01',
        endDate: '2027-12-31',
        description: 'Cung cấp thiết bị đo khí độc H2S và đo khí cháy nổ hydrocarbon lắp đặt trên giàn đầu giếng mới WHP.',
        status: 'on_track',
        priority: 'high',
        equipmentCount: 85,
        tasks: [
            { id: 'task_1', phaseKey: 'phase1', weight: 0.10, progress: 100, startDate: '2025-09-01', endDate: '2025-10-01' },
            { id: 'task_2', phaseKey: 'phase2', weight: 0.15, progress: 85, startDate: '2025-10-01', endDate: '2025-12-01' },
            { id: 'task_3', phaseKey: 'phase3', weight: 0.35, progress: 30, startDate: '2025-12-01', endDate: '2026-04-01' },
            { id: 'task_4', phaseKey: 'phase4', weight: 0.15, progress: 0, startDate: '2026-04-01', endDate: '2026-05-01' },
            { id: 'task_5', phaseKey: 'phase5', weight: 0.15, progress: 0, startDate: '2026-05-01', endDate: '2026-07-01' },
            { id: 'task_6', phaseKey: 'phase6', weight: 0.10, progress: 0, startDate: '2026-07-01', endDate: '2026-09-01' }
        ],
        risks: [
            {
                id: 'risk_1',
                description: 'Độ trễ phản hồi của cảm biến khí độc H2S ở điều kiện độ ẩm cao ngoài khơi.',
                severity: 'medium',
                status: 'open',
                mitigation: 'Lựa chọn cảm biến có tích hợp màng lọc hydrophobic nâng cao và bộ sấy chống ngưng tụ.'
            }
        ],
        logbook: [
            { id: 'log_1', date: '2026-05-15', content: 'Nhận bản vẽ bố trí cảm biến đo khí từ đơn vị thiết kế để tính toán vùng phủ (Detector Mapping).', author: 'Nguyễn Thị Hải' }
        ]
    },
    {
        id: 'proj_lac_da_vang',
        code: 'P-LDV-03',
        nameVi: 'Cung cấp đầu đo khí cháy mỏ Lạc Đà Vàng',
        nameEn: 'Combustible Gas Detectors - Lac Da Vang',
        client: 'Murphy Oil Corporation',
        location: 'Lô 15-1/05, Bể Cửu Long, Việt Nam',
        manager: 'Phạm Hồng Thái',
        startDate: '2026-03-01',
        endDate: '2028-10-31',
        description: 'Cung cấp hệ thống đầu đo phát hiện rò rỉ khí gas dạng điểm (Point Gas Detectors) lắp đặt quanh khu vực đầu giếng WHP.',
        status: 'delayed',
        priority: 'medium',
        equipmentCount: 40,
        tasks: [
            { id: 'task_1', phaseKey: 'phase1', weight: 0.10, progress: 100, startDate: '2026-03-01', endDate: '2026-04-01' },
            { id: 'task_2', phaseKey: 'phase2', weight: 0.15, progress: 40, startDate: '2026-04-01', endDate: '2026-06-01' },
            { id: 'task_3', phaseKey: 'phase3', weight: 0.35, progress: 0, startDate: '2026-06-01', endDate: '2026-10-01' },
            { id: 'task_4', phaseKey: 'phase4', weight: 0.15, progress: 0, startDate: '2026-10-01', endDate: '2026-11-01' },
            { id: 'task_5', phaseKey: 'phase5', weight: 0.15, progress: 0, startDate: '2026-11-01', endDate: '2027-01-01' },
            { id: 'task_6', phaseKey: 'phase6', weight: 0.10, progress: 0, startDate: '2027-01-01', endDate: '2027-03-01' }
        ],
        risks: [
            {
                id: 'risk_1',
                description: 'Tài liệu hướng dẫn kỹ thuật lắp đặt chưa được chủ đầu tư Murphy phê duyệt.',
                severity: 'high',
                status: 'open',
                mitigation: 'Cử nhóm kỹ sư kỹ thuật trực tiếp họp giải trình trực tiếp tại văn phòng Murphy Oil.'
            }
        ],
        logbook: [
            { id: 'log_1', date: '2026-04-10', content: 'Chốt danh sách vật tư linh kiện (Bill of Materials) để chuẩn bị đặt hàng linh kiện cảm biến.', author: 'Trần Văn Chiến' }
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
