import { useState, useEffect } from 'react';
import './datapage.css';
import OccupancyCard from './componenet/occupancycard';
import { GuestSatisfactionCard, StaffEngagementCard } from './componenet/engagementcard';
import { OverviewAreaChart, RevPARChart } from './componenet/datachart';
import { PredictiveInsights, RecentTransactions, SalesReport } from './componenet/bottomsection';


interface DataPageData {
    pageTitle: string;
    pageSubtitle: string;
    occupancy: any;
    staffEngagement: any;
    guestSatisfaction: any;
    overview: any;
    revPar: any;
    recentTransactions: any;
    salesReport: any;
    predictiveInsights: any;
}

interface DataPageProps {
    userName?: string;
}

function DataPage({ userName = "Glenn" }: DataPageProps) {
    const [selectedTeam, setSelectedTeam] = useState("Leadership");
    const [dataPageData, setDataPageData] = useState<DataPageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataPageData = async () => {
            try {
                const response = await fetch('/dataPageData.json');
                const data = await response.json();
                setDataPageData(data);
            } catch (error) {
                console.error('Error fetching data page data:', error);
                // Inline fallback data (abbreviated for space)
                setDataPageData({
                    pageTitle: "Your Scorecard",
                    pageSubtitle: "Your scorecard based on performance as on today",
                    occupancy: {
                        title: "Occupancy",
                        metrics: [
                            { id: 1, percentage: 5, label: "5%", trend: "up", primary: 42, secondary: 17, primaryLabel: "Booked", secondaryLabel: "Check-in", color: "#4CAF50" },
                            { id: 2, percentage: 6, label: "6%", trend: "up", primary: 34, secondary: 8, primaryLabel: "Success", secondaryLabel: "Extended", color: "#FF6B9D" },
                            { id: 3, percentage: 3, label: "3%", trend: "down", primary: 6, secondary: 2, primaryLabel: "Refund", secondaryLabel: "Canceled", color: "#FFD700" }
                        ]
                    },
                    staffEngagement: {
                        title: "Staff Engagement",
                        averageScore: 84,
                        change: "+4.1% vs. Last quarter",
                        departments: [
                            { name: "Staff - 1", score: 88, color: "#FFA500" },
                            { name: "Staff - 2", score: 85, color: "#FFA500" },
                            { name: "Staff - 3", score: 90, color: "#FFA500" }
                        ]
                    },
                    guestSatisfaction: {
                        title: "Guest Satisfaction",
                        score: 84.96,
                        change: "Up by 1.5%",
                        emoji: "😊",
                        breakdown: [
                            { label: "Standard Room", color: "#90EE90" },
                            { label: "Deluxe Room", color: "#87CEEB" },
                            { label: "Family Room", color: "#FFA500" }
                        ]
                    },
                    overview: {
                        title: "Overview",
                        categories: [
                            { name: "Tours & Travels", color: "#FF6B9D", value: 35 },
                            { name: "Hotel", color: "#FFA500", value: 28 },
                            { name: "Restaurants", color: "#FFD700", value: 22 },
                            { name: "SPA", color: "#90EE90", value: 10 },
                            { name: "Others", color: "#87CEEB", value: 5 }
                        ]
                    },
                    revPar: {
                        title: "Rev/PAR",
                        dateRange: "Sep 29th - Oct 3rd",
                        amount: 490,
                        change: "Revenue up by 1.5%",
                        data: [
                            { category: "Tours & Travels", income: 44, expense: 32 },
                            { category: "Hotel", income: 67, expense: 45 },
                            { category: "Restaurants", income: 95, expense: 78 },
                            { category: "SPA", income: 88, expense: 72 },
                            { category: "Others", income: 56, expense: 38 }
                        ]
                    },
                    recentTransactions: {
                        title: "Recent Transactions",
                        transactions: Array.from({ length: 18 }, (_, i) => ({
                            id: i + 1,
                            type: ["Available Funds", "Office Funds", "Remaining Funds"][i % 3],
                            amount: [3600, 180, 3420][i % 3]
                        }))
                    },
                    salesReport: {
                        title: "Sales Report",
                        data: [
                            { label: "Product A", value: 65, color: "#FF1493" },
                            { label: "Product B", value: 45, color: "#87CEEB" },
                            { label: "Product C", value: 30, color: "#FF1493" }
                        ]
                    },
                    predictiveInsights: {
                        title: "Predictive Insights",
                        content: "\"The hospitality industry is shifting toward blended, continuous learning ecosystems that combine digital, ethical, and experiential training. Digital tools enhance agility, ethical programs build trust and compliance, while experiential learning strengthens empathy and service excellence.\n\nThis integrated model fosters skilled, engaged, and value-driven teams. By 2027, organizations investing across these three fronts are expected to outperform peers by 15-20% in guest satisfaction, compliance, and employee engagement, redefining learning as a catalyst for sustained hospitality success.\""
                    }
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDataPageData();
    }, [userName]);

    if (loading || !dataPageData) {
        return (
            <div className="data-page">
                <div className="data-loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="data-page">
            {/* Header Section */}
            <div className="data-header-section">
                <div>
                    <h1 className="data-title">{dataPageData.pageTitle}</h1>
                    <p className="data-subtitle">{dataPageData.pageSubtitle}</p>
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

            {/* Top Row - Occupancy, Staff, Guest */}
            <div className="data-top-grid">
                <OccupancyCard {...dataPageData.occupancy} />
                <StaffEngagementCard {...dataPageData.staffEngagement} />
                <GuestSatisfactionCard {...dataPageData.guestSatisfaction} />
            </div>

            {/* Middle Row - Overview and RevPAR */}
            <div className="data-middle-grid">
                <OverviewAreaChart {...dataPageData.overview} />
                <RevPARChart {...dataPageData.revPar} />
            </div>

            {/* Bottom Row - Transactions, Sales, Insights */}
            <div className="data-bottom-grid">
                <RecentTransactions {...dataPageData.recentTransactions} />
                <SalesReport {...dataPageData.salesReport} />
                <PredictiveInsights {...dataPageData.predictiveInsights} />
            </div>
        </div>
    );
}

export default DataPage;