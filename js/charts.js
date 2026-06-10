/**
 * Petro-Track Charts Module
 * Quản lý vẽ và cập nhật biểu đồ bằng Chart.js
 */

import { translations } from './data.js';

let statusChartInstance = null;
let riskChartInstance = null;

// Tùy chỉnh cấu hình mặc định cho Chart.js phù hợp với Dark Mode
if (typeof Chart !== 'undefined') {
    Chart.defaults.color = '#94a3b8'; // text-secondary
    Chart.defaults.borderColor = '#242f47'; // border-color
    Chart.defaults.font.family = "'Outfit', sans-serif";
}

/**
 * Khởi tạo hoặc cập nhật lại toàn bộ biểu đồ
 * @param {Array} projects Danh sách dự án hiện tại
 * @param {string} lang Ngôn ngữ đang hoạt động ('vi' hoặc 'en')
 */
export function updateCharts(projects, lang) {
    if (typeof Chart === 'undefined') return;

    const t = translations[lang];

    // --- 1. BIỂU ĐỒ TRẠNG THÁI DỰ ÁN (Project Status Distribution - Doughnut Chart) ---
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        let onTrackCount = 0;
        let delayedCount = 0;
        let criticalCount = 0;
        let completedCount = 0;

        projects.forEach(p => {
            if (p.status === 'on_track') onTrackCount++;
            else if (p.status === 'delayed') delayedCount++;
            else if (p.status === 'critical') criticalCount++;
            else if (p.status === 'completed') completedCount++;
        });

        const statusLabels = [
            lang === 'vi' ? 'Đúng tiến độ' : 'On Track',
            lang === 'vi' ? 'Trễ tiến độ' : 'Delayed',
            lang === 'vi' ? 'Nghiêm trọng' : 'Critical',
            lang === 'vi' ? 'Đã hoàn thành' : 'Completed'
        ];
        const statusData = [onTrackCount, delayedCount, criticalCount, completedCount];

        if (statusChartInstance) {
            statusChartInstance.data.labels = statusLabels;
            statusChartInstance.data.datasets[0].data = statusData;
            statusChartInstance.update();
        } else {
            statusChartInstance = new Chart(statusCtx, {
                type: 'doughnut',
                data: {
                    labels: statusLabels,
                    datasets: [{
                        data: statusData,
                        backgroundColor: [
                            'rgba(16, 185, 129, 0.8)', // Green (on_track)
                            'rgba(245, 158, 11, 0.8)',  // Amber (delayed)
                            'rgba(239, 68, 68, 0.8)',   // Red (critical)
                            'rgba(59, 130, 246, 0.8)'   // Blue (completed)
                        ],
                        borderColor: '#121824',
                        borderWidth: 2,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 12,
                                padding: 15
                            }
                        },
                        tooltip: {
                            backgroundColor: '#121824',
                            titleColor: '#f8fafc',
                            bodyColor: '#94a3b8',
                            borderColor: '#242f47',
                            borderWidth: 1
                        }
                    },
                    cutout: '65%'
                }
            });
        }
    }

    // --- 2. BIỂU ĐỒ RỦI RO (Risk Distribution - Doughnut Chart) ---
    const riskCtx = document.getElementById('riskChart');
    if (riskCtx) {
        // Đếm tổng số rủi ro theo mức độ trên tất cả dự án
        let highCount = 0;
        let mediumCount = 0;
        let lowCount = 0;

        projects.forEach(p => {
            if (p.risks && Array.isArray(p.risks)) {
                p.risks.forEach(r => {
                    if (r.severity === 'high') highCount++;
                    else if (r.severity === 'medium') mediumCount++;
                    else if (r.severity === 'low') lowCount++;
                });
            }
        });

        const riskLabels = [
            lang === 'vi' ? 'Rủi ro Cao' : 'High Risk',
            lang === 'vi' ? 'Rủi ro Trung bình' : 'Medium Risk',
            lang === 'vi' ? 'Rủi ro Thấp' : 'Low Risk'
        ];
        const riskData = [highCount, mediumCount, lowCount];

        if (riskChartInstance) {
            riskChartInstance.data.labels = riskLabels;
            riskChartInstance.data.datasets[0].data = riskData;
            riskChartInstance.update();
        } else {
            riskChartInstance = new Chart(riskCtx, {
                type: 'doughnut',
                data: {
                    labels: riskLabels,
                    datasets: [{
                        data: riskData,
                        backgroundColor: [
                            'rgba(239, 68, 68, 0.8)', // Red
                            'rgba(245, 158, 11, 0.8)', // Amber
                            'rgba(59, 130, 246, 0.8)'  // Blue
                        ],
                        borderColor: '#121824',
                        borderWidth: 2,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 12,
                                padding: 15
                            }
                        },
                        tooltip: {
                            backgroundColor: '#121824',
                            titleColor: '#f8fafc',
                            bodyColor: '#94a3b8',
                            borderColor: '#242f47',
                            borderWidth: 1
                        }
                    },
                    cutout: '65%'
                }
            });
        }
    }
}
