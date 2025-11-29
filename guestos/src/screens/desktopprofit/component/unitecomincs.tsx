import "./uniteconomics.css";

interface UnitItem {
    id: number;
    icon: "room" | "service" | "activity";
    title: string;
    amount: number;
    color: string;
}

interface UnitEconomicsProps {
    title?: string;
    subtitle?: string;
    units?: UnitItem[];
    onViewAll?: () => void;
}

// Icon components
const RoomIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 36V20C8 18.9 8.9 18 10 18H38C39.1 18 40 18.9 40 20V36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 36H44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 18V14C12 12.9 12.9 12 14 12H22C23.1 12 24 12.9 24 14V18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="24" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M30 27L34 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ServiceIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8H32C33.1 8 34 8.9 34 10V12C34 13.1 33.1 14 32 14H16C14.9 14 14 13.1 14 12V10C14 8.9 14.9 8 16 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 14V40C20 41.1 20.9 42 22 42H26C27.1 42 28 41.1 28 40V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="22" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M22 25H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ActivityIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="32" rx="16" ry="6" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="32" r="2" fill="currentColor" />
        <path d="M24 10V24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 10L30 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 14L24 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
        <path d="M6 8V16C6 17.1 6.9 18 8 18H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 8V16C18 17.1 17.1 18 16 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 6H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const getIcon = (iconType: string) => {
    switch (iconType) {
        case "room":
            return <RoomIcon />;
        case "service":
            return <ServiceIcon />;
        case "activity":
            return <ActivityIcon />;
        default:
            return <RoomIcon />;
    }
};

const getCardColorClass = (color: string) => {
    if (color.includes("4ADE80") || color.includes("green")) return "green";
    if (color.includes("FF6B9D") || color.includes("pink")) return "pink";
    if (color.includes("FFD700") || color.includes("yellow")) return "yellow";
    return "green";
};

function UnitEconomics({
    title = "Unit Economics",
    subtitle = "Per-room, Per service, or Per-activity profitability trackers",
    units = [
        { id: 1, icon: "room" as const, title: "Per Room", amount: 50, color: "#4ADE80" },
        { id: 2, icon: "service" as const, title: "Per Service", amount: 8, color: "#FF6B9D" },
        { id: 3, icon: "activity" as const, title: "Per Activity", amount: 5, color: "#FFD700" }
    ],
    onViewAll
}: UnitEconomicsProps) {
    return (
        <div className="unit-economics-card">
            {/* Header */}
            <div className="unit-economics-header">
                <div className="unit-economics-title-section">
                    <span className="unit-economics-icon">
                        <ChartIcon />
                    </span>
                    <h3 className="unit-economics-title">{title}</h3>
                </div>
                <button className="unit-economics-view-all" onClick={onViewAll}>
                    View All
                </button>
            </div>

            {/* Subtitle */}
            <p className="unit-economics-subtitle">{subtitle}</p>

            {/* Cards Grid */}
            <div className="unit-economics-grid">
                {units.map((unit) => (
                    <div
                        key={unit.id}
                        className={`unit-card unit-card-${getCardColorClass(unit.color)}`}
                    >
                        <div className="unit-card-icon">
                            {getIcon(unit.icon)}
                        </div>
                        <h4 className="unit-card-title">{unit.title}</h4>
                        <div className="unit-card-amount">
                            <span className="unit-card-amount-value">
                                ${unit.amount.toString().padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UnitEconomics;