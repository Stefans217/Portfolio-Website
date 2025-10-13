import type { Project } from "@/types/project";

export const featuredProjects: Project[] = [
  {
    id: "p1",
    title: "Interactive Globe",
    description: "3D WebGL globe with real-time markers and smooth interactions.",
    tags: ["Next.js", "Three.js", "TypeScript"],
    href: "#",
    repo: "#",
    imageSrc: "/globe.svg",
  },
  {
    id: "p2",
    title: "Window Manager UI",
    description: "Desktop-like windowing interface for the web with drag & snap.",
    tags: ["React", "Zustand", "Tailwind"],
    href: "#",
    repo: "#",
    imageSrc: "/window.svg",
  },
  {
    id: "p3",
    title: "Performance Dashboard",
    description: "Analytics dashboard with charts, filters, and lazy data loading.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    href: "#",
    repo: "#",
    imageSrc: "/vercel.svg",
  },
];
