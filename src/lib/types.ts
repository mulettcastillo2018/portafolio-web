export interface Project {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  role: string;
  year: number;
  featured: boolean;
  order: number;
  links: {
    demo?: string;
    repo?: string;
  };
  image?: string;
  contentHtml: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  minutesRead: number;
  contentHtml: string;
}
