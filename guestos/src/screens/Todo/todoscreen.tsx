import { useState } from "react";
import "./todoscreen.css";
import mockData from "./todoMockData.json";

interface TodoScreenProps {
    onNavigate?: (screen: "dashboard" | "vision" | "todo" | "addtodo") => void;
    todoData?: typeof mockData;
}

function TodoScreen({ onNavigate, todoData = mockData }: TodoScreenProps) {
    const [activeNav, setActiveNav] = useState("todo");

    const handleNavClick = (nav: string) => {
        setActiveNav(nav);
        if (nav === "home" && onNavigate) {
            onNavigate("dashboard");
        }
    };

    const handleAddTodo = () => {
        if (onNavigate) {
            onNavigate("addtodo");
        }
    };

    const handleTodoClick = () => {
        if (onNavigate) {
            onNavigate("addtodo");
        }
    };

    const handleBack = () => {
        if (onNavigate) {
            onNavigate("dashboard");
        }
    };

    // Calculate pie chart segments
    const calculatePieSegment = (percentage: number, startPercentage: number) => {
        const circumference = 502.65;
        const dashArray = (percentage / 100) * circumference;
        const dashOffset = -(startPercentage / 100) * circumference;
        return { dashArray, dashOffset };
    };

    const completedSegment = calculatePieSegment(todoData.todoStats.completed.percentage, 0);
    const inProgressSegment = calculatePieSegment(
        todoData.todoStats.inProgress.percentage,
        todoData.todoStats.completed.percentage
    );
    const yetToStartSegment = calculatePieSegment(
        todoData.todoStats.yetToStart.percentage,
        todoData.todoStats.completed.percentage + todoData.todoStats.inProgress.percentage
    );

    return (
        <div className="todo-screen-container">
            {/* Header */}
            <header className="todo-screen-header">
                <button className="back-btn" onClick={handleBack} aria-label="Go back">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="header-title">Guest OS</h1>
                <div className="header-spacer"></div>
            </header>

            {/* Main Content */}
            <main className="todo-screen-main">
                {/* Page Title */}
                <section className="page-title-section">
                    <h1 className="page-title">To-Do's</h1>
                    <p className="page-subtitle">Create, assign, and track deadlines for critical tasks.</p>
                </section>

                {/* To-Do Chart Card */}
                <section className="todo-chart-card">
                    <div className="card-header">
                        <h2 className="card-title">To-Do</h2>
                        <div className="card-actions">
                            <button className="icon-btn" aria-label="Refresh">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                                </svg>
                            </button>
                            <button className="icon-btn" aria-label="Print">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                                    <rect x="6" y="14" width="12" height="8" />
                                </svg>
                            </button>
                            <button className="icon-btn" aria-label="Download">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                </svg>
                            </button>
                            <button className="icon-btn" aria-label="Delete">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="chart-container">
                        <div className="pie-chart-wrapper">
                            <svg viewBox="0 0 200 200" className="pie-chart-svg">
                                {/* Completed */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke={todoData.todoStats.completed.color}
                                    strokeWidth="40"
                                    strokeDasharray={`${completedSegment.dashArray} 502.65`}
                                    transform="rotate(-90 100 100)"
                                />
                                {/* In Progress */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke={todoData.todoStats.inProgress.color}
                                    strokeWidth="40"
                                    strokeDasharray={`${inProgressSegment.dashArray} 502.65`}
                                    strokeDashoffset={inProgressSegment.dashOffset}
                                    transform="rotate(-90 100 100)"
                                />
                                {/* Yet to Start */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke={todoData.todoStats.yetToStart.color}
                                    strokeWidth="40"
                                    strokeDasharray={`${yetToStartSegment.dashArray} 502.65`}
                                    strokeDashoffset={yetToStartSegment.dashOffset}
                                    transform="rotate(-90 100 100)"
                                />
                            </svg>
                        </div>

                        <div className="chart-legend-wrapper">
                            <div className="legend-item-wrapper">
                                <span
                                    className="legend-dot-wrapper"
                                    style={{ backgroundColor: todoData.todoStats.completed.color }}
                                ></span>
                                <span className="legend-text-wrapper">{todoData.todoStats.completed.label}</span>
                            </div>
                            <div className="legend-item-wrapper">
                                <span
                                    className="legend-dot-wrapper"
                                    style={{ backgroundColor: todoData.todoStats.inProgress.color }}
                                ></span>
                                <span className="legend-text-wrapper">{todoData.todoStats.inProgress.label}</span>
                            </div>
                            <div className="legend-item-wrapper">
                                <span
                                    className="legend-dot-wrapper"
                                    style={{ backgroundColor: todoData.todoStats.yetToStart.color }}
                                ></span>
                                <span className="legend-text-wrapper">{todoData.todoStats.yetToStart.label}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* To-Do List Section */}
                <section className="todo-list-section">
                    <div className="list-header">
                        <h2 className="list-title">To-Do's</h2>
                        <button className="refresh-btn" aria-label="Refresh list">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                            </svg>
                        </button>
                    </div>

                    <div className="todo-items-list">
                        {todoData.allTodos.map((todo, index) => (
                            <div key={todo.id} className="todo-list-item" onClick={handleTodoClick}>
                                <div className="todo-item-info">
                                    <span className="todo-label">Title</span>
                                    <span className="todo-title-text">{todo.title}</span>
                                </div>
                                <div className="todo-item-meta">
                                    <span className="todo-label">Due by</span>
                                    <span className="todo-date-text">{todo.dueDate}</span>
                                </div>
                                <button className="todo-menu-btn" aria-label="More options" onClick={(e) => e.stopPropagation()}>
                                    <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor">
                                        <circle cx="2" cy="2" r="2" />
                                        <circle cx="2" cy="8" r="2" />
                                        <circle cx="2" cy="14" r="2" />
                                    </svg>
                                </button>
                                {index === 1 && (
                                    <button className="add-btn-floating" aria-label="Add new todo" onClick={(e) => { e.stopPropagation(); handleAddTodo(); }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="todo-bottom-nav">
                <button
                    className={`todo-nav-btn ${activeNav === 'home' ? 'active' : ''}`}
                    onClick={() => handleNavClick('home')}
                >
                    <span className="todo-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`todo-nav-btn ${activeNav === 'view' ? 'active' : ''}`}
                    onClick={() => setActiveNav('view')}
                >
                    <span className="todo-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`todo-nav-btn ${activeNav === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveNav('info')}
                >
                    <span className="todo-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`todo-nav-btn ${activeNav === 'todo' ? 'active' : ''}`}
                    onClick={() => setActiveNav('todo')}
                >
                    <span className="todo-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="8" y1="6" x2="21" y2="6" />
                            <line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" />
                            <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                    </span>
                    {activeNav === 'todo' && <span className="todo-nav-label">To-Do's</span>}
                </button>
                <button
                    className={`todo-nav-btn ${activeNav === 'more' ? 'active' : ''}`}
                    onClick={() => setActiveNav('more')}
                >
                    <span className="todo-nav-icon">
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

export default TodoScreen;