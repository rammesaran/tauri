import React from 'react';
import './bottomsection.css';

// Recent Transactions
interface Transaction {
    id: number;
    type: string;
    amount: number;
}

interface TransactionsProps {
    title: string;
    transactions: Transaction[];
    onViewAll?: () => void;
}

export const RecentTransactions: React.FC<TransactionsProps> = ({
    title,
    transactions,
    onViewAll
}) => {
    return (
        <div className="transactions-card">
            <div className="transactions-header">
                <h3 className="transactions-title">{title}</h3>
                <button className="btn-view-all" onClick={onViewAll}>View All</button>
            </div>

            <div className="transactions-grid">
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="transaction-item">
                        <div className="transaction-type">{transaction.type}</div>
                        <div className="transaction-amount">${transaction.amount.toFixed(2)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Sales Report
interface SalesData {
    label: string;
    value: number;
    color: string;
}

interface SalesReportProps {
    title: string;
    data: SalesData[];
    onViewAll?: () => void;
}

export const SalesReport: React.FC<SalesReportProps> = ({
    title,
    data,
    onViewAll
}) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="sales-card">
            <div className="sales-header">
                <h3 className="sales-title">{title}</h3>
                <button className="btn-view-all" onClick={onViewAll}>View All</button>
            </div>

            <div className="sales-chart">
                {data.map((item, index) => (
                    <div key={index} className="sales-bar-wrapper">
                        <div
                            className="sales-bar"
                            style={{
                                width: `${(item.value / maxValue) * 100}%`,
                                backgroundColor: item.color
                            }}
                        >
                            <span className="sales-label">{item.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sales-axis">
                {[0, 20, 40, 60, 80, 100].map((val) => (
                    <span key={val} className="axis-label">{val}</span>
                ))}
            </div>

            <div className="sales-legend">
                <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#FF1493' }} />
                    <span>Sales</span>
                </div>
            </div>
        </div>
    );
};

// Predictive Insights
interface PredictiveInsightsProps {
    title: string;
    content: string;
}

export const PredictiveInsights: React.FC<PredictiveInsightsProps> = ({
    title,
    content
}) => {
    return (
        <div className="insights-card">
            <div className="insights-header">
                <h3 className="insights-title">{title}</h3>
                <button className="btn-refresh">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 4 23 10 17 10" />
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                </button>
            </div>

            <div className="insights-content">
                <p>{content}</p>
            </div>
        </div>
    );
};