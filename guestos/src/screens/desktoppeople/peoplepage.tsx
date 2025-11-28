import { useState, useEffect } from 'react';
import './PeoplePage.css';
import PersonCard from './component/personcard';
import { ProgressCard, TrainingCard } from './component/progresstrading';
import OrganizationChart from './component/organisationchart';
import ACEAssessment from './component/assesement';


interface PeopleData {
    pageTitle: string;
    pageSubtitle: string;
    selectedPerson: any;
    aceAssessment: any;
    overallProgress: any;
    mandatoryTraining: any;
    organizationChart: any;
}

interface PeoplePageProps {
    userName?: string;
}

function PeoplePage({ userName = "Glenn" }: PeoplePageProps) {
    const [selectedTeam, setSelectedTeam] = useState("Leadership");
    const [peopleData, setPeopleData] = useState<PeopleData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPeopleData = async () => {
            try {
                const response = await fetch('/peopleData.json');
                const data = await response.json();
                setPeopleData(data);
            } catch (error) {
                console.error('Error fetching people data:', error);
                // Fallback to inline data if fetch fails
                setPeopleData({
                    pageTitle: "Role Assessment",
                    pageSubtitle: "Ensure you and your teammates are armed with the right training, tools, and support.",
                    selectedPerson: {
                        id: 1,
                        name: "Jessica Nov",
                        role: "Front Desk Clerk",
                        status: "Active",
                        avatar: "public/images/jessica.png",
                        rating: 4,
                        team: "Front Desk Team",
                        location: "Downtown, LA",
                        experience: "3 Years Exp.",
                        description: "ACE Assessments are here to ensure you and your teammates are equipped with the right training, tools, and support throughout your workday. They help identify strengths, challenges, and opportunities for growth, providing valuable insights that guide improvement and development. These assessments are reviewed by your manager to better understand your needs and make informed decisions on how to best support you. Together, we aim to build a more efficient, empowered, and collaborative workplace where everyone can perform at their best."
                    },
                    aceAssessment: {
                        title: "ACE Assessment",
                        subtitle: "Self & Peer Assessment",
                        overallScore: 50,
                        metrics: [
                            {
                                id: 1,
                                score: 6.5,
                                maxScore: 10,
                                label: "Get It",
                                change: "+0.5 from last month",
                                status: "Good",
                                color: "#FFA500"
                            },
                            {
                                id: 2,
                                score: 6.6,
                                maxScore: 10,
                                label: "Wants It",
                                change: "+1.2 from last month",
                                status: "Excellent",
                                color: "#FFA500"
                            },
                            {
                                id: 3,
                                score: 6.5,
                                maxScore: 10,
                                label: "Capacity",
                                change: "+0.8 from last month",
                                status: "Needs Work",
                                color: "#FFD700"
                            }
                        ],
                        reminder: {
                            title: "Friendly Reminder:",
                            message: "Please complete your ACE Assessment by the due date: October 20, 2025, to ensure you have the training, tools, and support you need."
                        }
                    },
                    overallProgress: {
                        title: "A",
                        grade: "A",
                        percentage: 75,
                        label: "Overall Progress"
                    },
                    mandatoryTraining: {
                        title: "Mandatory Training",
                        subtitle: "Skills-Based Training",
                        priority: "High Priority Training",
                        course: {
                            title: "Help During Check-in Surge",
                            duration: "30 minutes",
                            dueDate: "Oct 10, 2025",
                            description: "Learn how to masterfully navigate the busiest check-in periods. Equip yourself with the skills to provide every guest with a warm, efficient, and ensuring a consistently exceptional experience from arrival to departure."
                        }
                    },
                    organizationChart: {
                        title: "Organization Chart",
                        structure: [
                            {
                                id: 1,
                                name: "Sara Johnson",
                                role: "General Manager",
                                level: "Executive Level",
                                avatar: "images/andy.jpg",
                                children: [2, 3, 4]
                            },
                            {
                                id: 2,
                                name: "Mike Chen",
                                role: "Front Desk Manager",
                                level: "Your Manager",
                                avatar: "images/sam.jpg",
                                parentId: 1,
                                children: [5, 6, 7, 8, 9]
                            },
                            {
                                id: 3,
                                name: "Lisa Rodriguez",
                                role: "House Keeping Manager",
                                level: "Department Head",
                                avatar: "images/rose.jpg",

                                parentId: 1,
                                children: []
                            },
                            {
                                id: 4,
                                name: "David Lawrence",
                                role: "Operation Manager",
                                level: "Department Head",
                                avatar: "images/cat.jpg",
                                parentId: 1,
                                children: []
                            },
                            {
                                id: 5,
                                name: "Jessica Nov",
                                role: "Front Desk Clerk",
                                level: "You",
                                avatar: "images/helan.jpg",
                                parentId: 2,
                                isCurrentUser: true
                            },
                            {
                                id: 6,
                                name: "Jessie Watson",
                                role: "Front Desk Clerk",
                                level: null,
                                avatar: "images/jack.jpg",
                                parentId: 2
                            },
                            {
                                id: 7,
                                name: "Alex George",
                                role: "Front Desk Supervisor",
                                level: null,
                                avatar: "images/jessica.png",
                                parentId: 2
                            },
                            {
                                id: 8,
                                name: "Emma Wilson",
                                role: "Front Desk Trainee",
                                level: null,
                                avatar: "images/rose.jpg",
                                parentId: 2
                            },
                            {
                                id: 9,
                                name: "Ryan Davis",
                                role: "Front Desk Trainee",
                                level: null,
                                avatar: "images/sam.jpg",
                                parentId: 2
                            }
                        ]
                    }
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPeopleData();
    }, [userName]);

    if (loading || !peopleData) {
        return (
            <div className="people-page">
                <div className="people-loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="people-page">
            {/* Header Section */}
            <div className="people-header-section">
                <div>
                    <h1 className="people-title">{peopleData.pageTitle}</h1>
                    <p className="people-subtitle">{peopleData.pageSubtitle}</p>
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

            {/* Top Grid - Person, Assessment, Progress */}
            <div className="people-top-grid">
                <PersonCard
                    name={peopleData.selectedPerson.name}
                    role={peopleData.selectedPerson.role}
                    status={peopleData.selectedPerson.status}
                    avatar={peopleData.selectedPerson.avatar}
                    rating={peopleData.selectedPerson.rating}
                    team={peopleData.selectedPerson.team}
                    location={peopleData.selectedPerson.location}
                    experience={peopleData.selectedPerson.experience}
                    description={peopleData.selectedPerson.description}
                    onEditDetails={() => console.log('Edit details clicked')}
                    onViewDetails={() => console.log('View details clicked')}
                />

                <ACEAssessment
                    title={peopleData.aceAssessment.title}
                    subtitle={peopleData.aceAssessment.subtitle}
                    overallScore={peopleData.aceAssessment.overallScore}
                    metrics={peopleData.aceAssessment.metrics}
                    reminder={peopleData.aceAssessment.reminder}
                    onEvaluate={() => console.log('Evaluate clicked')}
                />

                <div className="people-right-column">
                    <ProgressCard
                        title={peopleData.overallProgress.title}
                        grade={peopleData.overallProgress.grade}
                        percentage={peopleData.overallProgress.percentage}
                        label={peopleData.overallProgress.label}
                    />

                    <TrainingCard
                        title={peopleData.mandatoryTraining.title}
                        subtitle={peopleData.mandatoryTraining.subtitle}
                        priority={peopleData.mandatoryTraining.priority}
                        course={peopleData.mandatoryTraining.course}
                        onStartTraining={() => console.log('Start training clicked')}
                    />
                </div>
            </div>

            {/* Organization Chart */}
            <div className="people-org-section">
                <OrganizationChart
                    title={peopleData.organizationChart.title}
                    structure={peopleData.organizationChart.structure}
                    onViewFullChart={() => console.log('View full chart clicked')}
                />
            </div>
        </div>
    );
}

export default PeoplePage;