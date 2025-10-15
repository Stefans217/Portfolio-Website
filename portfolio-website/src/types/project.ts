export type Project = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  href?: string; // live/demo link
  repo?: string; // repository link
  imageSrc?: string; // optional image path from public/
};
