import React from 'react';
import './bottomsection.css';

// Recent Transactions
interface Transaction {
    id: number;
    type: string;
    amount: number;
}

interface TransactionsProps {
    title?: string;
    transactions?: Transaction[];
    onViewAll?: () => void;
}

export const RecentTransactions: React.FC<TransactionsProps> = ({
    title = "Recent Transactions",
    transactions = [
        { id: 1, type: "Available Funds", amount: 3600.00 },
        { id: 2, type: "Office Funds", amount: 180.00 },
        { id: 3, type: "Remaining Funds", amount: 3420.00 },
        { id: 4, type: "Available Funds", amount: 3600.00 },
        { id: 5, type: "Office Funds", amount: 180.00 },
        { id: 6, type: "Remaining Funds", amount: 3420.00 },
        { id: 7, type: "Available Funds", amount: 3600.00 },
        { id: 8, type: "Office Funds", amount: 180.00 },
        { id: 9, type: "Remaining Funds", amount: 3420.00 },
        { id: 10, type: "Available Funds", amount: 3600.00 },
        { id: 11, type: "Office Funds", amount: 180.00 },
        { id: 12, type: "Remaining Funds", amount: 3420.00 },
        { id: 13, type: "Available Funds", amount: 3600.00 },
        { id: 14, type: "Office Funds", amount: 180.00 },
        { id: 15, type: "Remaining Funds", amount: 3420.00 },
        { id: 16, type: "Available Funds", amount: 3600.00 },
        { id: 17, type: "Office Funds", amount: 180.00 },
        { id: 18, type: "Remaining Funds", amount: 3420.00 },
    ],
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
    title?: string;
    data?: SalesData[];
    onViewAll?: () => void;
}

export const SalesReport: React.FC<SalesReportProps> = ({
    title = "Sales Report",
    data = [
        { label: "A", value: 54, color: "#FF1493" },
        { label: "B", value: 71, color: "#FF1493" },
        { label: "C", value: 71, color: "#FF1493" },
    ],
    onViewAll
}) => {
    const maxValue = 100;

    return (
        <div className="sales-card">
            <div className="sales-header">
                <h3 className="sales-title">{title}</h3>
                <button className="btn-view-all" onClick={onViewAll}>View All</button>
            </div>

            <div className="sales-chart">
                {data.map((item, index) => (
                    <div key={index} className="sales-row">
                        <span className="sales-row-label">{item.label}</span>
                        <div className="sales-bar-track">
                            <div
                                className="sales-bar-fill"
                                style={{
                                    width: `${(item.value / maxValue) * 100}%`,
                                    backgroundColor: item.color
                                }}
                            />
                        </div>
                        <span className="sales-row-value">{item.value}</span>
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
    title?: string;
    content?: string;
    onRefresh?: () => void;
}

export const PredictiveInsights: React.FC<PredictiveInsightsProps> = ({
    title = "Predictive Insights",
    content = `"The hospitality industry is shifting toward blended, continuous learning ecosystems that combine digital, ethical, and experiential training. Digital tools enhance agility, ethical programs build trust and compliance, while experiential learning strengthens empathy and service excellence.

This integrated model fosters skilled, engaged, and value-driven teams. By 2027, organizations investing across these three fronts are expected to outperform peers by 15-20% in guest satisfaction, compliance, and employee engagement, redefining learning as a catalyst for sustained hospitality success."`,
    onRefresh
}) => {
    return (
        <div className="insights-card">
            <div className="insights-header">
                <h3 className="insights-title">{title}</h3>
                <button className="btn-refresh" onClick={onRefresh}>
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

// Combined Row Component - All 3 in single row
export const BottomSectionRow: React.FC = () => {
    return (
        <div className="bottom-section-row">
            <div className="bottom-card-wrapper transactions-wrapper">
                <RecentTransactions />
            </div>
            <div className="bottom-card-wrapper sales-wrapper">
                <SalesReport />
            </div>
            <div className="bottom-card-wrapper insights-wrapper">
                <PredictiveInsights />
            </div>
        </div>
    );
};