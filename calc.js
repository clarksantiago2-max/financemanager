// calculations based on user input

function calculateBudget() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const bills = parseFloat(document.getElementById('bills').value) || 0;
    const food = parseFloat(document.getElementById('food').value) || 0;
    const entertainment = parseFloat(document.getElementById('entertainment').value) || 0;
    const retail = parseFloat(document.getElementById('retail').value) || 0;
    const savingsGoal = parseFloat(document.getElementById('savingsGoal').value) || 0;

    const totalSpending = bills + food + entertainment + retail;
    const monthlySavings = income - totalSpending;
    const dailySavings = monthlySavings / 30;
    const weeklySavings = monthlySavings / 4.33;
    const yearlySavings = monthlySavings * 12;
    const savingsRate = income > 0 ? (monthlySavings / income) * 100 : 0;

    // find highest spending category
    const categories = { 'Bills': bills, 'Food': food, 'Entertainment': entertainment, 'Retail': retail };
    const highestCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b);

    // update display
    document.getElementById('totalSpending').textContent = 'PHP ' + totalSpending.toFixed(2);
    document.getElementById('monthlySavings').textContent = 'PHP ' + monthlySavings.toFixed(2);
    document.getElementById('dailySavings').textContent = 'PHP ' + dailySavings.toFixed(2);
    document.getElementById('weeklySavings').textContent = 'PHP ' + weeklySavings.toFixed(2);
    document.getElementById('yearlySavings').textContent = 'PHP ' + yearlySavings.toFixed(2);
    document.getElementById('savingsRate').textContent = savingsRate.toFixed(1);

    // update gauge
    updateGauge(savingsRate);

    // generate recommendation
    let recommendation = '';
    let recommendationClass = '';
    if (savingsRate < 10) {
        recommendation = `Critical: Your savings rate is below 10%. Reduce spending on ${highestCategory.toLowerCase()} (PHP ${categories[highestCategory].toFixed(2)}).`;
        recommendationClass = 'critical';
    } else if (savingsRate < 20) {
        recommendation = `Good start: Your savings rate is ${savingsRate.toFixed(1)}%. Consider trimming entertainment or retail spending.`;
        recommendationClass = 'good';
    } else {
        recommendation = `Healthy: Your savings rate is ${savingsRate.toFixed(1)}%. Consider investing your surplus or increasing your savings goal.`;
        recommendationClass = 'healthy';
    }

    // goal alert
    if (savingsGoal > 0) {
        const goalStatus = monthlySavings >= savingsGoal ? 'on track' : 'short of goal';
        const goalDiff = Math.abs(monthlySavings - savingsGoal);
        recommendation += ` | Savings Goal: ${goalStatus} by PHP ${goalDiff.toFixed(2)}.`;
    }

    const recElement = document.getElementById('recommendation');
    recElement.textContent = recommendation;
    recElement.className = recommendationClass;

    // update charts
    updateCharts(bills, food, entertainment, retail, dailySavings, weeklySavings, monthlySavings, yearlySavings);

    // save to storage
    const monthString = document.getElementById('monthPicker').value;
    const data = {
        income, bills, food, entertainment, retail, totalSpending,
        monthlySavings, dailySavings, weeklySavings, yearlySavings, savingsRate
    };
    saveEntry(monthString, data);

    document.getElementById('results').style.display = 'block';
}

function updateGauge(savingsRate) {
    const gaugeElement = document.getElementById('gaugeValue');
    if (gaugeElement) {
        gaugeElement.textContent = savingsRate.toFixed(1) + '%';
    }
}

function loadMonth() {
    const monthString = document.getElementById('monthPicker').value;
    const data = loadEntry(monthString);

    if (data) {
        document.getElementById('income').value = data.income;
        document.getElementById('bills').value = data.bills;
        document.getElementById('food').value = data.food;
        document.getElementById('entertainment').value = data.entertainment;
        document.getElementById('retail').value = data.retail;
        calculateBudget();
    } else {
        clearFields();
        document.getElementById('results').style.display = 'none';
    }
}

function clearFields() {
    document.getElementById('income').value = '';
    document.getElementById('bills').value = '';
    document.getElementById('food').value = '';
    document.getElementById('entertainment').value = '';
    document.getElementById('retail').value = '';
    document.getElementById('savingsGoal').value = '';
}

// attach event listeners when DOM is ready
window.addEventListener('DOMContentLoaded', function () {
    // set today's month as default
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    document.getElementById('monthPicker').value = `${year}-${month}`;

    document.getElementById('calculate').addEventListener('click', calculateBudget);
    document.getElementById('monthPicker').addEventListener('change', loadMonth);
    document.getElementById('clearBtn').addEventListener('click', clearFields);
    document.getElementById('exportCSV').addEventListener('click', exportToCSV);
    document.getElementById('exportPDF').addEventListener('click', exportToPDF);
    document.getElementById('clearAllBtn').addEventListener('click', clearAllData);

    // welcome splash handler
    const welcomeSplash = document.getElementById('welcomeSplash');
    if (welcomeSplash) {
        // dismiss on click
        welcomeSplash.addEventListener('click', function () {
            welcomeSplash.classList.add('hide');
            setTimeout(() => {
                welcomeSplash.style.display = 'none';
            }, 600);
        });

        // auto-dismiss after 3 seconds
        setTimeout(() => {
            if (!welcomeSplash.classList.contains('hide')) {
                welcomeSplash.classList.add('hide');
                setTimeout(() => {
                    welcomeSplash.style.display = 'none';
                }, 600);
            }
        }, 3000);
    }
});
