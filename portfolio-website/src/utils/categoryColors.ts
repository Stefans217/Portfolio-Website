import type { BlogCategory } from "@/types/blog";

/**
 * Category badge colours for the dark-themed public site (e.g. BlogList).
 */
export function getCategoryColorDark(category: BlogCategory): string {
    const colors: Record<BlogCategory, string> = {
        NETWORKING: "bg-purple-900/50 text-purple-300 border border-purple-700",
        TUTORIALS: "bg-green-900/50 text-green-300 border border-green-700",
        RANDOM: "bg-yellow-900/50 text-yellow-300 border border-yellow-700",
        TECH_NEWS: "bg-blue-900/50 text-blue-300 border border-blue-700",
        PERSONAL: "bg-pink-900/50 text-pink-300 border border-pink-700",
    };
    return colors[category] || "bg-gray-800 text-gray-300 border border-gray-700";
}

/**
 * Category badge colours for the light-themed admin dashboard.
 */
export function getCategoryColorLight(category: BlogCategory): string {
    const colors: Record<BlogCategory, string> = {
        NETWORKING: "bg-purple-100 text-purple-800",
        TUTORIALS: "bg-green-100 text-green-800",
        RANDOM: "bg-yellow-100 text-yellow-800",
        TECH_NEWS: "bg-blue-100 text-blue-800",
        PERSONAL: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
}
