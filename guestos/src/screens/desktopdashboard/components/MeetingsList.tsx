import "./meetingslist.css";

interface Meeting {
    id: number;
    title: string;
    type: string;
    date: string;
    time: string;
    duration: string;
    status: string;
    avatar: string;
    role?: string;
}

interface MeetingsListProps {
    meetings: Meeting[];
}

function MeetingsList({ meetings }: MeetingsListProps) {
    // Get the first meeting as the featured one
    const featuredMeeting = meetings[0];
    const upcomingMeetings = meetings.slice(1);

    return (
        <div className="meetings-list-component">
            {/* Header */}
            <div className="meetings-list-header">
                <h2 className="meetings-list-title">Meetings</h2>
                <button className="create-meeting-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    Create Meeting
                </button>
            </div>

            {/* Featured Meeting Card */}
            {featuredMeeting && (
                <div className="featured-meeting-card">
                    {/* Filter Icons Row */}
                    <div className="filter-icons-row">
                        <div className="filter-icon-btn pink">
                            <span className="icon-inner">🎧</span>
                        </div>
                        <div className="filter-icon-btn purple">
                            <span className="icon-inner">🎤</span>
                        </div>
                        <div className="filter-icon-btn teal">
                            <span className="icon-inner">🔔</span>
                        </div>
                        <div className="filter-icon-btn yellow">
                            <span className="icon-inner">📞</span>
                        </div>
                        <div className="filter-icon-btn gray">
                            <span className="icon-inner">⚙️</span>
                        </div>
                    </div>

                    {/* Featured Meeting Content */}
                    <div className="featured-meeting-content">
                        <img
                            src={featuredMeeting.avatar}
                            alt={featuredMeeting.title}
                            className="featured-avatar"
                        />
                        <div className="featured-meeting-info">
                            <h3 className="featured-meeting-title">{featuredMeeting.title}</h3>
                            <p className="featured-meeting-type">{featuredMeeting.type}</p>
                        </div>
                        <button className="join-btn">
                            <span className="join-icon">📹</span>
                            Join
                        </button>
                    </div>
                </div>
            )}

            {/* Upcoming Meetings List */}
            <div className="meetings-list-items">
                {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="meeting-item-glass">
                        {/* Left Side - Date/Time */}
                        <div className="meeting-datetime-section">
                            <div className="meeting-clock-icon">
                                <span>🕐</span>
                            </div>
                            <div className="meeting-date">{meeting.date}</div>
                            <div className="meeting-time">{meeting.time}</div>
                        </div>

                        {/* Right Side - Meeting Card */}
                        <div className="meeting-card-content">
                            <div className="meeting-card-top">
                                <img
                                    src={meeting.avatar}
                                    alt={meeting.title}
                                    className="meeting-avatar"
                                />
                                <div className="meeting-details">
                                    <h3 className="meeting-title">{meeting.title}</h3>
                                    <p className="meeting-type">{meeting.type}</p>
                                </div>
                                <div className="meeting-action-btns">
                                    <button className="action-btn-circle">
                                        <span>📞</span>
                                    </button>
                                    <button className="action-btn-circle filled">
                                        <span>📹</span>
                                    </button>
                                </div>
                            </div>
                            <div className="meeting-card-bottom">
                                <span className="meeting-role-tag">Lead</span>
                                <span className="meeting-duration-tag">{meeting.duration}</span>
                                <span className="meeting-status-tag">Created</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MeetingsList;