import "./meetingmenuitem.css";

interface MeetingMenuItemProps {
    icon: "calendar" | "agenda" | "video" | "history";
    label: string;
    onClick?: () => void;
}

function MeetingMenuItem({ icon, label, onClick }: MeetingMenuItemProps) {
    const getIcon = () => {
        switch (icon) {
            case "calendar":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                );
            case "agenda":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="9" y1="15" x2="15" y2="15" />
                        <line x1="9" y1="11" x2="15" y2="11" />
                    </svg>
                );
            case "video":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                );
            case "history":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                );
        }
    };

    return (
        <button className="meeting-menu-item" onClick={onClick}>
            <div className="meeting-menu-icon">{getIcon()}</div>
            <span className="meeting-menu-label">{label}</span>
            <svg className="meeting-menu-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
            </svg>
        </button>
    );
}

export default MeetingMenuItem;