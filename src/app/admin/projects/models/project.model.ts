export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  demo_url: string;
  github_links: string;
  secondary_github_links: string;
  created_at: Date;
  updated_at: Date;
}
