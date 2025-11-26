import { useState, useEffect } from 'react';
import './profitpage.css';
import ProfitDashboard from '../profitdashboard';
import { ProfitTarget, ProfitTips, UnitEconomics } from './profitcomponent';
import { ApprovedList, PurchaseApprovals } from './appaprovalcomponent';


interface ProfitPageData {
    pageTitle: string;
    pageSubtitle: string;
    profitDashboard: any;
    unitEconomics: any;
    profitTips: any;
    profitTarget: any;
    purchaseApprovals: any;
    approvedList: any;
}

interface ProfitPageProps {
    userName?: string;
}

function ProfitPage({ userName = "Glenn" }: ProfitPageProps) {
    const [selectedTeam, setSelectedTeam] = useState("Leadership");
    const [profitData, setProfitData] = useState<ProfitPageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfitData = async () => {
            try {
                const response = await fetch('/profitPageData.json');
                const data = await response.json();
                setProfitData(data);
            } catch (error) {
                console.error('Error fetching profit data:', error);
                // Inline fallback data
                setProfitData({
                    pageTitle: "Profit",
                    pageSubtitle: "Fiscal Metrics: Revenue and Expenditures",
                    profitDashboard: {
                        title: "Profit Dashboard",
                        month: "Oct 2025",
                        segments: [
                            { label: "20% Profit", value: 20, color: "#4ADE80" },
                            { label: "60% Operating Expenses", value: 60, color: "#FFA500" },
                            { label: "20% Taxes", value: 20, color: "#E85D9A" }
                        ],
                        legend: [
                            { label: "Profit", color: "#4ADE80" },
                            { label: "Expenses", color: "#FFA500" },
                            { label: "Taxes", color: "#E85D9A" }
                        ]
                    },
                    unitEconomics: {
                        title: "Unit Economics",
                        subtitle: "Per-room, Per service, or Per-activity profitability trackers",
                        units: [
                            { id: 1, icon: "room", title: "Per Room", amount: 50, color: "#4ADE80" },
                            { id: 2, icon: "service", title: "Per Service", amount: 8, color: "#FF6B9D" },
                            { id: 3, icon: "activity", title: "Per Activity", amount: 5, color: "#FFD700" }
                        ]
                    },
                    profitTips: {
                        title: "Profit Tips",
                        tip: "Setting seasonal pricing tiers can increase profit margin by up to 15% during peak periods.",
                        hasGradientBorder: true
                    },
                    profitTarget: {
                        title: "Profit Target",
                        targetPercentage: 30,
                        currentPercentage: 27,
                        status: "On Track",
                        progressSegments: [
                            { color: "#FFA500", width: 30 },
                            { color: "#FFD700", width: 30 },
                            { color: "#4ADE80", width: 40 }
                        ]
                    },
                    purchaseApprovals: {
                        title: "Purchase Approvals",
                        approvals: Array.from({ length: 4 }, (_, i) => ({
                            id: i + 1,
                            availableFunds: 3600.00,
                            officeFunds: 180.00,
                            remainingFunds: 3420.00,
                            dueDate: "24-Nov"
                        }))
                    },
                    approvedList: {
                        title: "Approved List",
                        items: Array.from({ length: 4 }, (_, i) => ({
                            id: i + 1,
                            availableFunds: 3600.00,
                            officeFunds: 180.00,
                            remainingFunds: 3420.00
                        }))
                    }
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfitData();
    }, [userName]);

    if (loading || !profitData) {
        return (
            <div className="profit-page">
                <div className="profit-loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="profit-page">
            {/* Header Section */}
            <div className="profit-header-section">
                <div>
                    <h1 className="profit-title">{profitData.pageTitle}</h1>
                    <p className="profit-subtitle">{profitData.pageSubtitle}</p>
                </div>
                <div className="team-selector">
                    <label>Team :</label>
                    <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                        <option>Leadership</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                        <option>Operations</option>
                    </select>
                </div>
            </div>

            {/* Top Row - Dashboard, Economics, Tips */}
            <div className="profit-top-grid">
                <ProfitDashboard {...profitData.profitDashboard} />
                <UnitEconomics {...profitData.unitEconomics} />
                <div className="profit-right-column">
                    <ProfitTips {...profitData.profitTips} />
                    <ProfitTarget {...profitData.profitTarget} />
                </div>
            </div>

            {/* Bottom Row - Approvals and Approved */}
            <div className="profit-bottom-grid">
                <PurchaseApprovals
                    {...profitData.purchaseApprovals}
                    onReject={(id) => console.log('Reject:', id)}
                    onApprove={(id) => console.log('Approve:', id)}
                />
                <ApprovedList {...profitData.approvedList} />
            </div>
        </div>
    );
}

export default ProfitPage;