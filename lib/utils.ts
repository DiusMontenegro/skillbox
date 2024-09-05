import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Function to capitalize the first letter of a string
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Function to calculate how much time has passed since a given date
function timeAgo(dateString: Date): string {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return diffInSeconds === 1
            ? "1 second ago"
            : `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return diffInMinutes === 1
            ? "1 minute ago"
            : `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 0) {
        return "Today";
    } else if (diffInDays === 1) {
        return "1 day ago";
    } else {
        return `${diffInDays} days ago`;
    }
}

// Function to format a number into human-readable format (e.g., 1k, 1.2M)
function formatNumber(value: number): string {
    if (value < 1000) return value.toString();

    const suffixes = ["k", "M", "B"];
    const tiers = Math.floor(Math.log10(value) / 3);

    if (tiers === 0) return value.toString();

    const suffix = suffixes[tiers - 1];
    const formattedValue = (value / Math.pow(10, tiers * 3)).toFixed(1);

    // Remove the trailing `.0` if the value is a whole number
    return formattedValue.endsWith(".0")
        ? formattedValue.slice(0, -2) + suffix
        : formattedValue + suffix;
}

export { capitalize, timeAgo, formatNumber };
