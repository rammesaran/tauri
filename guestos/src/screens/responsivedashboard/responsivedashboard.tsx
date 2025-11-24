import { useState, useEffect } from "react";
import DashboardScreen from "../dashboard/dashboardscreen";
import DesktopDashboard from "../desktopdashboard/desktopdashboard";


interface ResponsiveDashboardProps {
    userName?: string;
    onLogout: () => void;
    onNavigate?: (screen: "dashboard" | "vision" | "todo" | "addtodo" | "profit" | "scorecard" | "meeting" | "geyser") => void;
}

function ResponsiveDashboard({ userName, onLogout, onNavigate }: ResponsiveDashboardProps) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isMobile ? (
                <DashboardScreen
                    userName={userName}
                    onLogout={onLogout}
                    onNavigate={onNavigate}
                />
            ) : (
                <DesktopDashboard
                    userName={userName}
                    onLogout={onLogout}

                />
            )}
        </>
    );
}

export default ResponsiveDashboard;