import type { BlogCategory } from "@/types/blog";

export type AdminUser = {
    id: string;
    email: string;
    name: string | null;
};

export type AdminContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
};

export type AdminBlogPost = {
    id: string;
    title: string;
    content: string;
    category: BlogCategory;
    published: boolean;
    createdAt: string;
};
