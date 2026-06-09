/**
 * Petro-Track Charts Module
 * Quản lý vẽ và cập nhật biểu đồ bằng Chart.js
 */

import { translations } from './data.js';

let budgetChartInstance = null;
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

    // --- 1. BIỂU ĐỒ NGÂN SÁCH (Planned vs Actual CAPEX) ---
    const budgetCtx = document.getElementById('budgetChart');
    if (budgetCtx) {
        // Chuẩn bị dữ liệu vẽ biểu đồ
        // Lấy danh sách tên dự án và CAPEX tương ứng
        const labels = projects.map(p => {
            const name = lang === 'vi' ? p.nameVi : p.nameEn;
            return name.length > 20 ? name.substring(0, 17) + '...' : name;
        });
        
        const plannedCapexData = projects.map(p => p.budget?.plannedCapex || 0);
        const actualCapexData = projects.map(p => p.budget?.actualCapex || 0);

        if (budgetChartInstance) {
            budgetChartInstance.data.labels = labels;
            budgetChartInstance.data.datasets[0].label = lang === 'vi' ? 'CAPEX Kế hoạch' : 'Planned CAPEX';
            budgetChartInstance.data.datasets[0].data = plannedCapexData;
            budgetChartInstance.data.datasets[1].label = lang === 'vi' ? 'CAPEX Thực chi' : 'Actual CAPEX';
            budgetChartInstance.data.datasets[1].data = actualCapexData;
            budgetChartInstance.update();
        } else {
            budgetChartInstance = new Chart(budgetCtx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: lang === 'vi' ? 'CAPEX Kế hoạch' : 'Planned CAPEX',
                            data: plannedCapexData,
                            backgroundColor: 'rgba(59, 130, 246, 0.7)', // Blue
                            borderColor: '#3b82f6',
                            borderWidth: 1,
                            borderRadius: 4
                        },
                        {
                            label: lang === 'vi' ? 'CAPEX Thực chi' : 'Actual CAPEX',
                            data: actualCapexData,
                            backgroundColor: 'rgba(0, 242, 254, 0.7)', // Teal
                            borderColor: '#00f2fe',
                            borderWidth: 1,
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
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
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: lang === 'vi' ? 'Triệu USD ($M)' : 'Million USD ($M)',
                                color: '#94a3b8'
                            }
                        }
                    }
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
