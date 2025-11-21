// types.ts - TypeScript interfaces for dashboard data

export interface User {
    name: string;
    profileImage: string;
}

export interface UpcomingMeeting {
    title: string;
    subtitle: string;
    timeUntil: string;
    hostImage: string;
}

export interface OverviewItem {
    label: string;
    percentage: number;
}

export interface Overview {
    rocks: OverviewItem;
    fires: OverviewItem;
    todo: OverviewItem;
}

export interface TodoStatItem {
    label: string;
    percentage: number;
    color: string;
}

export interface TodoStats {
    completed: TodoStatItem;
    inProgress: TodoStatItem;
    yetToStart: TodoStatItem;
}

export interface PendingTodo {
    id: number;
    title: string;
    dueDate: string;
}

export interface MetricItem {
    title: string;
    description: string;
    percentage: number;
}

export interface Metrics {
    fire: MetricItem;
    rocks: MetricItem;
}

export interface DashboardData {
    user: User;
    upcomingMeeting: UpcomingMeeting;
    overview: Overview;
    todoStats: TodoStats;
    pendingTodos: PendingTodo[];
    metrics: Metrics;
}