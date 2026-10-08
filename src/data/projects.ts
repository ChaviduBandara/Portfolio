export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  liveUrl?: string;
  description: string;
  technologies: readonly string[];
  image?: {
    src: string;
    alt: string;
  };
  visual: "inventory" | "inspection" | "threads" | "gesture" | "records";
};

export const projects: readonly Project[] = [
  {
    id: "stockpilot",
    title: "StockPilot",
    subtitle: "Inventory and Order Management System",
    description: "A full-stack application for managing products, categories, customers, orders, and stock quantities.",
    technologies: ["Java", "Spring Boot", "React", "MySQL", "REST APIs"],
    visual: "inventory",
    image: {
      src: "/images/stockpilot.png",
      alt: "StockPilot dashboard displayed on a laptop, showing inventory totals, recent orders and sales overview.",
    },
  },
  {
    id: "dairyfusion-ai",
    title: "DairyFusion AI",
    subtitle: "Yoghurt Cup Defect Detection",
    description: "A quality inspection system combining computer vision and IoT sensor data to detect defects in yoghurt cups.",
    technologies: ["Python", "YOLOv11m", "FastAPI", "React", "ESP32-S3"],
    visual: "inspection",
    image: {
      src: "/images/dairyfusion.jpg",
      alt: "DairyFusion AI inspection interface showing yoghurt cup defect detection, annotated results and IoT sensor readings.",
    },
  },
  {
    id: "patient-management",
    title: "Thread-Safe Patient Management System",
    description: "An A&E simulation with continuous patient arrivals, shift rotation, consultant matching, and thread-safe processing.",
    technologies: ["Java", "Concurrent Programming"],
    visual: "threads",
    image: {
      src: "/images/patient-management.png",
      alt: "Thread-Safe Patient Management System illustration showing connected hospital departments and synchronized patient care.",
    },
  },
  {
    id: "gesturesway",
    title: "GestureSway",
    subtitle: "Hand Gesture Snake Game",
    description: "A web-based snake game controlled through hand gestures, designed with accessible interaction in mind.",
    technologies: ["Python", "React", "Node.js", "MongoDB"],
    visual: "gesture",
    image: {
      src: "/images/gesturesway.png",
      alt: "GestureSway snake game menu with Play Game, High Score and Exit Game options beside a cartoon snake.",
    },
  },
  {
    id: "student-database",
    title: "Student Database Management System",
    description: "A CRUD application for creating, viewing, updating, and deleting student records.",
    technologies: ["Java", "Spring Boot", "React", "MySQL"],
    visual: "records",
    image: {
      src: "/images/student-management.png",
      alt: "Student Management System project cover",
    },
  },
  {
    id: "wayamba-ply-industries",
    title: "Wayamba Ply Industries - Manufacturing Website",
    subtitle: "Freelance project",
    liveUrl: "https://wayambaply.lk/",
    description: "Responsive single-page website for a plywood manufacturer in Sri Lanka. Includes product showcases, certification reports, interactive FAQs, and Google Maps integration with mobile-friendly layouts and on-page SEO optimisation.",
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    visual: "inventory",
    image: {
      src: "/images/wayamba-ply.png",
      alt: "Wayamba Ply Industries website homepage",
    },
  },
];
