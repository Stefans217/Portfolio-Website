export const BLOG_CATEGORIES = {
    NETWORKING: "Networking",
    TUTORIALS: "Tutorials",
    RANDOM: "Random",
    TECH_NEWS: "Tech News",
    PERSONAL: "Personal",
} as const;

export type BlogCategory = keyof typeof BLOG_CATEGORIES;

export type BlogPost = {
    id: string;
    title: string;
    content: string;
    category: BlogCategory;
    published: boolean;
    createdAt: string;
    updatedAt: string;
};
