import "./dayschedule.css";

interface DayScheduleProps {
    day: string;
    time: string;
    status: "complete" | "off" | "pending";
    progress: number;
}

function DaySchedule({ day, time, status, progress }: DayScheduleProps) {
    const getStatusColor = () => {
        switch (status) {
            case "complete":
                return "#7ED957";
            case "off":
                return "rgba(255, 255, 255, 0.2)";
            case "pending":
                return "#FFA500";
            default:
                return "rgba(255, 255, 255, 0.2)";
        }
    };

    const getStatusText = () => {
        switch (status) {
            case "complete":
                return "Complete";
            case "off":
                return "Off";
            case "pending":
                return "Pending";
            default:
                return "";
        }
    };

    return (
        <div className="day-schedule">
            <div className="day-schedule-header">
                <div className="day-schedule-info">
                    <span className="day-schedule-day">{day}</span>
                    {time && <span className="day-schedule-time">{time}</span>}
                    {!time && <span className="day-schedule-status-text">{getStatusText()}</span>}
                </div>
                {status !== "off" && (
                    <span className="day-schedule-status">{getStatusText()}</span>
                )}
            </div>
            {progress > 0 && (
                <div className="day-schedule-progress-bar">
                    <div
                        className="day-schedule-progress-fill"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: getStatusColor(),
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
}

export default DaySchedule;