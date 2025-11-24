import "./todolist.css";

interface Todo {
    id: number;
    date: string;
    title: string;
    status: "completed" | "pending";
}

interface TodoListProps {
    todos: Todo[];
}

function TodoList({ todos }: TodoListProps) {
    return (
        <div className="todo-list-component">
            <div className="todo-list-header">
                <h2 className="todo-list-title">To-Dos</h2>
                <button className="add-todo-list-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    Add To-Dos
                </button>
            </div>

            <div className="todo-list-items">
                {todos.map((todo) => (
                    <div key={todo.id} className={`todo-list-item ${todo.status}`}>
                        <div className="todo-checkbox-wrapper">
                            <input
                                type="checkbox"
                                id={`todo-${todo.id}`}
                                checked={todo.status === "completed"}
                                className="todo-checkbox"
                                readOnly
                            />
                            <label htmlFor={`todo-${todo.id}`} className="todo-checkbox-label">
                                {todo.status === "completed" && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </label>
                        </div>

                        <div className="todo-content">
                            <div className="todo-date">{todo.date}</div>
                            <div className="todo-title">{todo.title}</div>
                        </div>

                        <button className="todo-menu-btn" aria-label="More options">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoList;