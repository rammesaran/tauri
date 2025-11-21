import "./statcard.css";

interface StatCardProps {
    icon: "clock" | "target" | "trending";
    label: string;
    value: string;
    subtext: string;
}

function StatCard({ icon, label, value, subtext }: StatCardProps) {
    const getIcon = () => {
        switch (icon) {
            case "clock":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                );
            case "target":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                    </svg>
                );
            case "trending":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                    </svg>
                );
        }
    };

    return (
        <div className="stat-card">
            <div className="stat-card-icon">{getIcon()}</div>
            <div className="stat-card-content">
                <span className="stat-card-label">{label}</span>
                <span className="stat-card-value">{value}</span>
                <span className="stat-card-subtext">{subtext}</span>
            </div>
        </div>
    );
}

export default StatCard;