// Chart.js visualization wrapper

let spendingChart = null;
let savingsChart = null;

function initCharts() {
    const ctx1 = document.getElementById('spendingChart');
    const ctx2 = document.getElementById('savingsChart');

    if (ctx1) {
        spendingChart = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['Bills', 'Food', 'Entertainment', 'Retail'],
                datasets: [{
                    data: [0, 0, 0, 0],
                    backgroundColor: [
                        '#7d9f3f',
                        '#17a2b8',
                        '#ffc107',
                        '#dc3545'
                    ],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    if (ctx2) {
        savingsChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
                datasets: [{
                    label: 'Savings',
                    data: [0, 0, 0, 0],
                    backgroundColor: '#28a745',
                    borderColor: '#1c7a2a',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'x',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

function updateCharts(bills, food, entertainment, retail, dailySavings, weeklySavings, monthlySavings, yearlySavings) {
    if (spendingChart) {
        spendingChart.data.datasets[0].data = [bills, food, entertainment, retail];
        spendingChart.update();
    }

    if (savingsChart) {
        savingsChart.data.datasets[0].data = [dailySavings, weeklySavings, monthlySavings, yearlySavings];
        savingsChart.update();
    }
}

window.addEventListener('DOMContentLoaded', initCharts);
