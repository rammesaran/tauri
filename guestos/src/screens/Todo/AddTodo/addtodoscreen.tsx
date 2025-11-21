import { useState } from "react";
import "./addtodoscreen.css";

interface AddTodoScreenProps {
    onNavigate?: (screen: "dashboard" | "vision" | "todo" | "addtodo") => void;
    onSave?: (todoData: TodoFormData) => void;
    editMode?: boolean;
    existingData?: TodoFormData;
}

export interface TodoFormData {
    title: string;
    description: string;
    dueDate: string;
    repeat: string;
    team: string;
    attachment?: File | null;
}

function AddTodoScreen({ onNavigate, onSave, editMode = false, existingData }: AddTodoScreenProps) {
    const [activeNav, setActiveNav] = useState("todo");
    const [formData, setFormData] = useState<TodoFormData>(
        existingData || {
            title: "",
            description: "",
            dueDate: "",
            repeat: "Value",
            team: "Value",
            attachment: null,
        }
    );
    const [fileName, setFileName] = useState<string>("");

    const handleBack = () => {
        if (onNavigate) {
            onNavigate("todo");
        }
    };

    const handleNavClick = (nav: string) => {
        setActiveNav(nav);
        if (nav === "home" && onNavigate) {
            onNavigate("dashboard");
        } else if (nav === "todo" && onNavigate) {
            onNavigate("todo");
        }
    };

    const handleInputChange = (field: keyof TodoFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setFormData((prev) => ({
                ...prev,
                attachment: file,
            }));
        }
    };

    const handleSubmit = () => {
        if (onSave) {
            onSave(formData);
        }
        if (onNavigate) {
            onNavigate("todo");
        }
    };

    return (
        <div className="addtodo-screen-container">
            {/* Header */}
            <header className="addtodo-screen-header">
                <button className="addtodo-back-btn" onClick={handleBack} aria-label="Go back">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="addtodo-header-title">Guest OS</h1>
                <div className="addtodo-header-spacer"></div>
            </header>

            {/* Main Content */}
            <main className="addtodo-screen-main">
                {/* Page Title */}
                <section className="addtodo-title-section">
                    <h1 className="addtodo-page-title">{editMode ? "Edit To-Do" : "Add To-Do"}</h1>
                    <p className="addtodo-page-subtitle">
                        Create, assign, and track deadlines for critical tasks.
                    </p>
                </section>

                {/* Form Card */}
                <section className="addtodo-form-card">
                    {/* Title Field */}
                    <div className="addtodo-form-group">
                        <label className="addtodo-form-label">Title</label>
                        <input
                            type="text"
                            className="addtodo-form-input"
                            placeholder="Username"
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                        />
                    </div>

                    {/* Description Field */}
                    <div className="addtodo-form-group">
                        <label className="addtodo-form-label">
                            Description <span className="addtodo-optional">(Optional)</span>
                        </label>
                        <textarea
                            className="addtodo-form-textarea"
                            placeholder="Description content"
                            rows={5}
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                        ></textarea>
                    </div>

                    {/* Due Date Field */}
                    <div className="addtodo-form-group">
                        <label className="addtodo-form-label">Due Date</label>
                        <div className="addtodo-input-with-icon">
                            <input
                                type="text"
                                className="addtodo-form-input"
                                placeholder="MM:DD:YYYY"
                                value={formData.dueDate}
                                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                            />
                            <button className="addtodo-input-icon" aria-label="Select date">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Repeat Field */}
                    <div className="addtodo-form-group">
                        <label className="addtodo-form-label">Repeat</label>
                        <div className="addtodo-select-wrapper">
                            <select
                                className="addtodo-form-select"
                                value={formData.repeat}
                                onChange={(e) => handleInputChange("repeat", e.target.value)}
                            >
                                <option value="Value">Value</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Never">Never</option>
                            </select>
                            <svg className="addtodo-select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>
                    </div>

                    {/* Team Field */}
                    <div className="addtodo-form-group">
                        <label className="addtodo-form-label">Team</label>
                        <div className="addtodo-select-wrapper">
                            <select
                                className="addtodo-form-select"
                                value={formData.team}
                                onChange={(e) => handleInputChange("team", e.target.value)}
                            >
                                <option value="Value">Value</option>
                                <option value="Development">Development</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                            </select>
                            <svg className="addtodo-select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="addtodo-form-group">
                        <label htmlFor="file-upload" className="addtodo-file-upload">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                            </svg>
                            <span className="addtodo-file-upload-text">
                                {fileName || "Upload a file from your device"}
                            </span>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="addtodo-file-input"
                            onChange={handleFileUpload}
                        />
                    </div>
                </section>

                {/* Submit Button */}
                <button className="addtodo-submit-btn" onClick={handleSubmit}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    {editMode ? "Update To-Do" : "Add To-Do"}
                </button>
            </main>

            {/* Bottom Navigation */}
            <nav className="addtodo-bottom-nav">
                <button
                    className={`addtodo-nav-btn ${activeNav === "home" ? "active" : ""}`}
                    onClick={() => handleNavClick("home")}
                >
                    <span className="addtodo-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`addtodo-nav-btn ${activeNav === "view" ? "active" : ""}`}
                    onClick={() => setActiveNav("view")}
                >
                    <span className="addtodo-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`addtodo-nav-btn ${activeNav === "info" ? "active" : ""}`}
                    onClick={() => setActiveNav("info")}
                >
                    <span className="addtodo-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`addtodo-nav-btn ${activeNav === "todo" ? "active" : ""}`}
                    onClick={() => handleNavClick("todo")}
                >
                    <span className="addtodo-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="8" y1="6" x2="21" y2="6" />
                            <line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" />
                            <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                    </span>
                    {activeNav === "todo" && <span className="addtodo-nav-label">To-Do's</span>}
                </button>
                <button
                    className={`addtodo-nav-btn ${activeNav === "more" ? "active" : ""}`}
                    onClick={() => setActiveNav("more")}
                >
                    <span className="addtodo-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                        </svg>
                    </span>
                </button>
            </nav>
        </div>
    );
}

export default AddTodoScreen;