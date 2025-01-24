import { IApplication } from "../../services/applications";
import { STATUS_MAP } from "../../utils/constants";

const getDaysDifference = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date format');
    }

    const difference = endDate.getTime() - startDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
};

export const findFastestApplication = (applications: IApplication[]): { app: IApplication; days: number } | null => {
    let fastestApp: IApplication | null = null;
    let minDays = Infinity;

    for (const app of applications) {
        if (app.status === STATUS_MAP.APPROVED && app.decision_date) {
            const days = getDaysDifference(app.application_date, app.decision_date);
            if (days < minDays) {
                minDays = days;
                fastestApp = app;
            }
        }
    }

    return fastestApp ? { app: fastestApp, days: minDays } : null;
};


export const findLongestApplication = (applications: IApplication[]): { app: IApplication; days: number } | null => {
    let longestApp: IApplication | null = null;
    let maxDays = -Infinity;

    for (const app of applications) {
        if (app.status === STATUS_MAP.APPROVED && app.decision_date) {
            const days = getDaysDifference(app.application_date, app.decision_date);
            if (days > maxDays) {
                maxDays = days;
                longestApp = app;
            }
        }
    }

    return longestApp ? { app: longestApp, days: maxDays } : null;
};


export const findLongestPendingApplication = (applications: IApplication[]): { app: IApplication; days: number } | null => {
    let longestPendingApp: IApplication | null = null;
    let maxDays = -Infinity;
    const today = new Date().toISOString().split('T')[0];

    for (const app of applications) {
        if (app.status === STATUS_MAP.PENDING) {
            const days = getDaysDifference(app.application_date, today);
            if (days > maxDays) {
                maxDays = days;
                longestPendingApp = app;
            }
        }
    }

    return longestPendingApp ? { app: longestPendingApp, days: maxDays } : null;
};


export const calculateAverageDays = (applications: IApplication[], status: string): { averageDays: number; total: number } => {
    const filteredApps = applications.filter((app) => app.status === status && app.decision_date);

    const totalDays = filteredApps.reduce((total, app) => {
        return total + getDaysDifference(app.application_date, app.decision_date!);
    }, 0);

    const averageDays = filteredApps.length ? Math.floor(totalDays / filteredApps.length) : 0;
    return { averageDays, total: filteredApps.length };
};

export const calculateAveragePendingDays = (applications: IApplication[]): { averageDays: number; total: number } => {
    const filteredApps = applications.filter((app) => app.status === STATUS_MAP.PENDING);
    const today = new Date().toISOString().split('T')[0];

    const totalDays = filteredApps.reduce((total, app) => {
        return total + getDaysDifference(app.application_date, today);
    }, 0);

    const averageDays = filteredApps.length ? Math.floor(totalDays / filteredApps.length) : 0;
    return { averageDays, total: filteredApps.length };
};
