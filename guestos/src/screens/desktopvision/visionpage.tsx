import { useState, useEffect } from 'react';
import './visionpage.css';
import InfoCard from './component/infocard';
import GoalsCard from './component/goalcard';


interface VisionData {
    welcomeMessage: {
        greeting: string;
        subtitle: string;
    };
    vision: {
        title: string;
        icon: 'vision';
        description: string;
        gifUrl?: string;
    };
    mission: {
        title: string;
        icon: 'mission';
        description: string;
        gifUrl?: string;
    };
    coreValues: {
        title: string;
        icon: 'core-values';
        description: string;
        gifUrl?: string;
    };
    goals: {
        title: string;
        quarters: Array<{
            label: string;
            value: string;
            active?: boolean;
        }>;
        description: string;
        progressData: Array<{
            year: number;
            percentage: number;
        }>;
    };
}

interface VisionPageProps {
    userName?: string;
}

function VisionPage({ userName = "Glenn" }: VisionPageProps) {
    const [selectedTeam, setSelectedTeam] = useState("Leadership");
    const [visionData, setVisionData] = useState<VisionData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch vision data from mock JSON
        const fetchVisionData = async () => {
            try {
                // In a real app, this would be an API call
                // For now, we'll import the JSON data
                const response = await fetch('/visionData.json');
                const data = await response.json();
                setVisionData(data);
            } catch (error) {
                console.error('Error fetching vision data:', error);
                // Fallback to inline data if fetch fails
                setVisionData({
                    welcomeMessage: {
                        greeting: `Hey ${userName}, Welcome Back`,
                        subtitle: "From mission to daily action, this is how we stay aligned and move forward."
                    },
                    vision: {
                        title: "VISION",
                        icon: "vision",
                        gifUrl: "/gifs/vision.gif",
                        description: "Our vision is to deliver hospitality that goes beyond service—creating moments of comfort, connection, and care. We strive to make every guest experience memorable while embracing sustainability and uplifting the communities we serve."
                    },
                    mission: {
                        title: "MISSION",
                        icon: "mission",
                        gifUrl: "/gifs/mission.gif",

                        description: "Our mission is to redefine hospitality by empowering our staff, exceeding guest expectations, and fostering sustainable practices that benefit our planet and local communities."
                    },
                    coreValues: {
                        title: "CORE VALUES",
                        icon: "core-values",
                        gifUrl: "/gifs/core.gif",

                        description: "Our Resorts, our values drive us to exceed expectations. We commit to integrity, innovation, teamwork, and exceptional service, ensuring every guest enjoys an unforgettable experience."
                    },
                    goals: {
                        title: "GOALS",
                        quarters: [
                            { label: "Q 1", value: "Q1" },
                            { label: "Q 2", value: "Q2" },
                            { label: "Q 3", value: "Q3" },
                            { label: "Q 4", value: "Q4", active: true }
                        ],
                        description: "Increase guest satisfaction scores by 20% and enhance our community engagement through local partnerships and events. Together, let's create a welcoming atmosphere that keeps our guests coming back!",
                        progressData: [
                            { year: 2020, percentage: 80 },
                            { year: 2021, percentage: 78 },
                            { year: 2022, percentage: 88 },
                            { year: 2023, percentage: 78 },
                            { year: 2024, percentage: 88 }
                        ]
                    }
                });
            } finally {
                setLoading(false);
            }
        };

        fetchVisionData();
    }, [userName]);

    if (loading || !visionData) {
        return (
            <div className="vision-page">
                <div className="vision-loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="vision-page">
            {/* Header Section */}
            <div className="vision-header-section">
                <div>
                    <h1 className="vision-greeting">{visionData.welcomeMessage.greeting}</h1>
                    <p className="vision-subtitle">{visionData.welcomeMessage.subtitle}</p>
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

            {/* Cards Grid */}
            <div className="vision-cards-grid">
                <InfoCard
                    title={visionData.vision.title}
                    description={visionData.vision.description}
                    icon={visionData.vision.icon}
                    gifUrl={visionData.vision.gifUrl}
                />
                <InfoCard
                    title={visionData.mission.title}
                    description={visionData.mission.description}
                    icon={visionData.mission.icon}
                    gifUrl={visionData.mission.gifUrl}

                />
                <InfoCard
                    title={visionData.coreValues.title}
                    description={visionData.coreValues.description}
                    icon={visionData.coreValues.icon}
                    gifUrl={visionData.coreValues.gifUrl}

                />
                <GoalsCard
                    title={visionData.goals.title}
                    quarters={visionData.goals.quarters}
                    description={visionData.goals.description}
                    progressData={visionData.goals.progressData}
                    onQuarterChange={(quarter) => console.log('Selected quarter:', quarter)}
                />
            </div>
        </div>
    );
}

export default VisionPage;