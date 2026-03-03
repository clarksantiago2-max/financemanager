// localStorage & export management

const STORAGE_KEY = 'budgetEntries';

function saveEntry(monthString, data) {
    let entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    entries[monthString] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function loadEntry(monthString) {
    let entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return entries[monthString] || null;
}

function getAllEntries() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function deleteEntry(monthString) {
    let entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    delete entries[monthString];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function exportToCSV() {
    const entries = getAllEntries();
    if (Object.keys(entries).length === 0) {
        alert('No entries to export');
        return;
    }

    let csv = 'Month,Income,Bills,Food,Entertainment,Retail,Total Spending,Monthly Savings,Daily Savings,Weekly Savings,Yearly Savings,Savings Rate\n';

    for (const [month, data] of Object.entries(entries)) {
        csv += `${month},${data.income},${data.bills},${data.food},${data.entertainment},${data.retail},${data.totalSpending},${data.monthlySavings},${data.dailySavings},${data.weeklySavings},${data.yearlySavings},${data.savingsRate}\n`;
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'budget_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function exportToPDF() {
    const entries = getAllEntries();
    if (Object.keys(entries).length === 0) {
        alert('No entries to export');
        return;
    }

    let pdfContent = 'FINANCE TRACKER REPORT\n\n';

    for (const [month, data] of Object.entries(entries)) {
        pdfContent += `Month: ${month}\n`;
        pdfContent += `Income: PHP ${data.income}\n`;
        pdfContent += `Bills: PHP ${data.bills}\n`;
        pdfContent += `Food: PHP ${data.food}\n`;
        pdfContent += `Entertainment: PHP ${data.entertainment}\n`;
        pdfContent += `Retail: PHP ${data.retail}\n`;
        pdfContent += `Total Spending: PHP ${data.totalSpending}\n`;
        pdfContent += `Monthly Savings: PHP ${data.monthlySavings}\n`;
        pdfContent += `Savings Rate: ${data.savingsRate}%\n\n`;
    }

    // Simple text download as PDF alternative
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'budget_report.txt';
    a.click();
    window.URL.revokeObjectURL(url);
}

function clearAllData() {
    if (confirm('Are you sure you want to delete all saved data? This cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        alert('All data cleared');
        location.reload();
    }
}
