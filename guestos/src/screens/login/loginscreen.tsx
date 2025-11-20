import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./LoginScreen.css";

function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Call your Tauri backend command for authentication
            const response = await invoke("authenticate", {
                username,
                password
            });

            console.log("Login successful:", response);
            // Handle successful login (e.g., navigate to dashboard)

        } catch (err) {
            setError("Invalid username or password");
            console.error("Login failed:", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-content">
                {/* Logo */}
                <div className="logo-container">
                    <div className="logo">
                        <span className="logo-text">Guest</span>
                        <span className="logo-os">OS</span>
                    </div>
                </div>

                {/* Title and Subtitle */}
                <div className="title-container">
                    <h1 className="title">Personalised workspace</h1>
                    <p className="subtitle">view tasks, data, goals and more.</p>
                </div>

                {/* Login Form */}
                <form className="login-form" onSubmit={handleLogin}>
                    {/* Username Input */}
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                            required
                        />
                        <svg
                            className="input-icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>

                    {/* Password Input */}
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                        <button
                            type="button"
                            className="input-icon password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            ) : (
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && <div className="error-message">{error}</div>}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                        <svg
                            className="login-icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;