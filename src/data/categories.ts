export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  articleCount: number;
}

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Laptop Issues",
    slug: "laptop-issues",
    description: "Fix common laptop problems from power failures to hardware glitches.",
    icon: "💻",
    articleCount: 12,
  },
  {
    id: "cat-2",
    name: "Phone Issues",
    slug: "phone-issues",
    description: "Troubleshoot smartphone problems, battery drains, and screen issues.",
    icon: "📱",
    articleCount: 8,
  },
  {
    id: "cat-3",
    name: "Internet Issues",
    slug: "internet-issues",
    description: "Resolve Wi-Fi drops, router misconfigurations, and slow connections.",
    icon: "🌐",
    articleCount: 6,
  },
  {
    id: "cat-4",
    name: "Windows Issues",
    slug: "windows-issues",
    description: "Solutions for blue screens, update loops, and system errors in Windows.",
    icon: "🪟",
    articleCount: 10,
  },
  {
    id: "cat-5",
    name: "Android Issues",
    slug: "android-issues",
    description: "Fix Android app crashes, freezing UI, and fast charging problems.",
    icon: "🤖",
    articleCount: 8,
  },
  {
    id: "cat-6",
    name: "iPhone Issues",
    slug: "iphone-issues",
    description: "Solve iOS glitches, Face ID failures, and storage full warnings.",
    icon: "🍎",
    articleCount: 9,
  },
];
