
import { NavLinkItem, TeachingCase, PracticeRecord, ScienceResource, ResourceCategory, ScienceResourceType, User } from './types';
import { AcademicCapIcon, CollectionIcon, LightBulbIcon, UserCircleIcon, LockClosedIcon, ArrowRightOnRectangleIcon, CloudArrowUpIcon, Cog6ToothIcon, PuzzlePieceIcon } from './components/icons';

export const SITE_TITLE = "数字科普平台";

// Mock Users
export const MOCK_USERS: User[] = [
  { id: "user1", username: "admin", role: "admin" }, // Mock password for admin: "adminpass"
  { id: "user2", username: "testuser", role: "user" }, // Mock password for testuser: "userpass"
];

export const NAV_LINKS: NavLinkItem[] = [
  { name: "首页", path: "/", icon: AcademicCapIcon, showAlways: true },
  { name: "教学案例库", path: "/teaching-cases", icon: CollectionIcon, showAlways: true },
  { name: "实践纪实馆", path: "/practice-records", icon: LightBulbIcon, showAlways: true },
  { name: "科普资源站", path: "/science-resources", icon: PuzzlePieceIcon, showAlways: true },
  { name: "管理后台", path: "/admin", icon: Cog6ToothIcon, adminOnly: true },
  { name: "登录", path: "/login", icon: UserCircleIcon, showWhenLoggedOut: true },
  { name: "注册", path: "/register", icon: LockClosedIcon, showWhenLoggedOut: true },
];

// Initial Mock Data - will be managed by DataContext
export const INITIAL_TEACHING_CASES: TeachingCase[] = [
  {
    id: "tc001",
    title: "计算机的诞生与演变",
    description: "追溯从算盘到现代计算机的辉煌历程，了解关键技术突破。",
    category: ResourceCategory.HISTORY,
    thumbnailUrl: "https://picsum.photos/seed/history/400/250",
    教案Link: "#",
    课件Link: "#",
  },
  {
    id: "tc002",
    title: "AI基础：机器学习入门",
    description: "揭开人工智能的神秘面纱，探索机器学习的基本原理和应用。",
    category: ResourceCategory.AI,
    thumbnailUrl: "https://picsum.photos/seed/ai/400/250",
    教案Link: "#",
  },
  {
    id: "tc003",
    title: "Python编程第一课",
    description: "轻松学习Python编程语言，开启你的编程之旅。",
    category: ResourceCategory.PROGRAMMING,
    thumbnailUrl: "https://picsum.photos/seed/python/400/250",
    课件Link: "#",
  },
   {
    id: "tc004",
    title: "计算机硬件组成探秘",
    description: "深入了解CPU、内存、硬盘等核心硬件的功能与协同工作原理。",
    category: ResourceCategory.HARDWARE,
    thumbnailUrl: "https://picsum.photos/seed/hardware/400/250",
    教案Link: "#",
    课件Link: "#",
  },
];

export const INITIAL_PRACTICE_RECORDS: PracticeRecord[] = [
  {
    id: "pr001",
    date: "2024-05-10",
    title: "“AI创造营”第一期成果展",
    description: "同学们在为期一周的AI创造营中，学习了图像识别基础，并创作了许多有趣的小项目。",
    media: [
      { type: "image", url: "https://picsum.photos/seed/event1/600/400", caption: "开营仪式合影" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "学生项目演示片段" },
      { type: "image", url: "https://picsum.photos/seed/event2/600/400", caption: "小组讨论中" },
    ],
    studentWorks: [
      { title: "智能垃圾分类助手", url: "#", author: "张三小组" },
      { title: "动物识别App", url: "#", author: "李四小组" },
    ],
  },
  {
    id: "pr002",
    date: "2024-03-15",
    title: "“走进计算机博物馆”研学活动",
    description: "组织学生参观本地计算机博物馆，亲身体验计算机技术的发展变迁。",
    media: [
      { type: "image", url: "https://picsum.photos/seed/museum1/600/400", caption: "认真聆听讲解" },
      { type: "image", url: "https://picsum.photos/seed/museum2/600/400", caption: "操作老式计算机" },
    ],
  },
];

export const INITIAL_SCIENCE_RESOURCES: ScienceResource[] = [
  {
    id: "sr001",
    title: "《计算机部件解谜》互动微课",
    description: "通过有趣的互动游戏，认识计算机的各个重要部件及其功能。",
    type: ScienceResourceType.INTERACTIVE_LESSON,
    thumbnailUrl: "https://picsum.photos/seed/puzzle/400/250",
    interactiveId: "computer_parts_puzzle",
  },
  {
    id: "sr002",
    title: "科普视频：互联网是如何工作的？",
    description: "一个简短的动画视频，生动解释了互联网信息传输的奥秘。",
    type: ScienceResourceType.VIDEO,
    thumbnailUrl: "https://picsum.photos/seed/internet/400/250",
    contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder video
  },
  {
    id: "sr003",
    title: "文章：量子计算离我们有多远？",
    description: "探讨量子计算的前沿进展及其可能带来的革命性影响。",
    type: ScienceResourceType.ARTICLE,
    thumbnailUrl: "https://picsum.photos/seed/quantum/400/250",
    contentUrl: "#", // Link to an article
  },
];
