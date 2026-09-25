export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: readonly string[];
  visual: "inventory" | "inspection" | "threads" | "gesture" | "records" | "cafe";
};

export const projects: readonly Project[] = [
  {
    id: "stockpilot",
    title: "StockPilot",
    subtitle: "Inventory and Order Management System",
    description: "A full-stack application for managing products, categories, customers, orders, and stock quantities.",
    technologies: ["Java", "Spring Boot", "React", "MySQL", "REST APIs"],
    visual: "inventory",
  },
  {
    id: "dairyfusion-ai",
    title: "DairyFusion AI",
    subtitle: "Yoghurt Cup Defect Detection",
    description: "A quality inspection system combining computer vision and IoT sensor data to detect defects in yoghurt cups.",
    technologies: ["Python", "YOLOv11m", "FastAPI", "React", "ESP32-S3"],
    visual: "inspection",
  },
  {
    id: "patient-management",
    title: "Thread-Safe Patient Management System",
    description: "An A&E simulation with continuous patient arrivals, shift rotation, consultant matching, and thread-safe processing.",
    technologies: ["Java", "Concurrent Programming"],
    visual: "threads",
  },
  {
    id: "gesturesway",
    title: "GestureSway",
    subtitle: "Hand Gesture Snake Game",
    description: "A web-based snake game controlled through hand gestures, designed with accessible interaction in mind.",
    technologies: ["Python", "React", "Node.js", "MongoDB"],
    visual: "gesture",
  },
  {
    id: "student-database",
    title: "Student Database Management System",
    description: "A CRUD application for creating, viewing, updating, and deleting student records.",
    technologies: ["Java", "Spring Boot", "React", "MySQL"],
    visual: "records",
  },
  {
    id: "wild-cafe-ella",
    title: "Wild Cafe Ella",
    subtitle: "Restaurant Website",
    description: "A responsive restaurant website with menu, gallery, contact pages, and on-page SEO.",
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    visual: "cafe",
  },
];
