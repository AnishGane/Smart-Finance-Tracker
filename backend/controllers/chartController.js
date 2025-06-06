import Transaction from '../models/transactionModel.js';

// Get chart data for a specific user
export const getChartData = async (req, res) => {
    try {
        const userId = req.body.userId;

        // Get all transactions for the user
        const transactions = await Transaction.find({ userId: userId })
            .sort({ date: 1 }); // Sort by date ascending

        // If no transactions, return empty data structure with message
        if (!transactions || transactions.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    noDataMessage: "No transaction data available",
                    lineData: {
                        labels: [],
                        datasets: [
                            {
                                label: 'Income',
                                data: [],
                                borderColor: 'rgb(34, 197, 94)',
                                backgroundColor: 'rgba(34, 197, 94, 0.5)',
                                tension: 0.4,
                            },
                            {
                                label: 'Expenses',
                                data: [],
                                borderColor: 'rgb(239, 68, 68)',
                                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                                tension: 0.4,
                            },
                        ],
                    },
                    barData: {
                        labels: [],
                        datasets: [
                            {
                                label: 'Income',
                                data: [],
                                backgroundColor: 'rgba(34, 197, 94, 0.8)',
                            },
                            {
                                label: 'Expenses',
                                data: [],
                                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                            },
                        ],
                    },
                    doughnutData: {
                        labels: ['Income', 'Expenses'],
                        datasets: [
                            {
                                data: [0, 0],
                                backgroundColor: [
                                    'rgba(34, 197, 94, 0.8)',
                                    'rgba(239, 68, 68, 0.8)',
                                ],
                                borderColor: [
                                    'rgb(34, 197, 94)',
                                    'rgb(239, 68, 68)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    summary: {
                        totalIncome: 0,
                        totalExpense: 0,
                        netBalance: 0
                    }
                }
            });
        }

        // Process data for different chart types
        const chartData = {
            lineData: processLineData(transactions),
            barData: processBarData(transactions),
            doughnutData: processDoughnutData(transactions),
            summary: calculateSummary(transactions)
        };

        res.status(200).json({
            success: true,
            data: chartData
        });
    } catch (error) {
        console.error('Error in getChartData:', error);
        res.status(500).json({
            success: false,
            error: 'Error fetching chart data'
        });
    }
};

// Process data for line chart
const processLineData = (transactions) => {
    const groupedByDate = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = { income: 0, expense: 0 };
        }
        if (transaction.type === 'income') {
            acc[date].income += transaction.amount;
        } else {
            acc[date].expense += transaction.amount;
        }
        return acc;
    }, {});

    const dates = Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b));
    const incomeData = dates.map(date => groupedByDate[date].income);
    const expenseData = dates.map(date => groupedByDate[date].expense);

    return {
        labels: dates,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Expenses',
                data: expenseData,
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                tension: 0.4,
            },
        ],
    };
};

// Process data for bar chart
const processBarData = (transactions) => {
    const groupedByDate = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = { income: 0, expense: 0 };
        }
        if (transaction.type === 'income') {
            acc[date].income += transaction.amount;
        } else {
            acc[date].expense += transaction.amount;
        }
        return acc;
    }, {});

    const dates = Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b));
    const incomeData = dates.map(date => groupedByDate[date].income);
    const expenseData = dates.map(date => groupedByDate[date].expense);

    return {
        labels: dates,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(34, 197, 94, 0.8)',
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
            },
        ],
    };
};

// Process data for doughnut chart
const processDoughnutData = (transactions) => {
    const totals = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            acc.income += transaction.amount;
        } else {
            acc.expense += transaction.amount;
        }
        return acc;
    }, { income: 0, expense: 0 });

    return {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                data: [totals.income, totals.expense],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                ],
                borderColor: [
                    'rgb(34, 197, 94)',
                    'rgb(239, 68, 68)',
                ],
                borderWidth: 1,
            },
        ],
    };
};

// Calculate summary statistics
const calculateSummary = (transactions) => {
    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            acc.totalIncome += transaction.amount;
        } else {
            acc.totalExpense += transaction.amount;
        }
        return acc;
    }, { totalIncome: 0, totalExpense: 0 });

    summary.netBalance = summary.totalIncome - summary.totalExpense;
    return summary;
}; 