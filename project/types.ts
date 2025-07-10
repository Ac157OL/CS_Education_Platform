
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  // password should not be stored here in a real app, this is for mock purposes
}

export interface NavLinkItem {
  name: string;
  path: string;
  icon?: React.FC<{ className?: string }>;
  showAlways?: boolean; // Always show, regardless of auth state
  showWhenLoggedOut?: boolean; // Only show when logged out
  showWhenLoggedIn?: boolean; // Only show when logged in (any role)
  adminOnly?: boolean; // Only show for admin users
}

export enum ResourceCategory {
  HISTORY = "计算机发展史",
  AI = "AI探秘",
  PROGRAMMING = "编程入门",
  HARDWARE = "硬件知识",
}

export interface TeachingCase {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  thumbnailUrl: string;
  教案Link?: string; // Teaching plan link
  课件Link?: string; // Courseware link
}

export interface PracticeMedia {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface StudentWork {
  title: string;
  url: string; // Could be a link to a project or an image of the work
  author?: string;
}

export interface PracticeRecord {
  id: string;
  date: string;
  title: string;
  description: string;
  media: PracticeMedia[];
  studentWorks?: StudentWork[];
}

export enum ScienceResourceType {
  INTERACTIVE_LESSON = "互动微课",
  VIDEO = "科普视频",
  ARTICLE = "科普文章",
}

export interface ScienceResource {
  id: string;
  title: string;
  description: string;
  type: ScienceResourceType;
  thumbnailUrl: string;
  contentUrl?: string; // URL for video, article, or embeddable content
  interactiveId?: string; // Identifier for specific interactive lessons
}
