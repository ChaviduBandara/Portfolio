import type { LucideIcon } from "lucide-react";
import { BrainCircuit, Cpu, KeyRound, Network, ScanEye } from "lucide-react";
import type { IconType } from "react-icons";
import { FaCss3Alt, FaJava } from "react-icons/fa6";
import {
  SiApachekafka, SiApachemaven, SiDocker, SiGit, SiGithub, SiHtml5, SiJavascript, SiJunit5, SiLinux,
  SiMongodb, SiMysql, SiNodedotjs, SiOpencv,
  SiPostgresql, SiPython, SiReact, SiSpringboot,
  SiSpring, SiSupabase, SiTailwindcss,
} from "react-icons/si";

export type Skill = {
  name: string;
  icon: IconType | LucideIcon;
  secondaryIcon?: IconType | LucideIcon;
};

export type SkillCategory = {
  id: string;
  name: string;
  skills: readonly Skill[];
  secondarySkills?: readonly Skill[];
};

export const skillCategories: readonly SkillCategory[] = [
  {
    id: "programming-languages",
    name: "Programming Languages",
    skills: [
      { name: "Java", icon: FaJava },
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    id: "backend-development",
    name: "Backend Development",
    skills: [
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Spring MVC", icon: SiSpring },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "RESTful APIs", icon: Network },
    ],
    secondarySkills: [
      { name: "JWT Authentication", icon: KeyRound },
      { name: "Apache Kafka", icon: SiApachekafka },
    ],
  },
  {
    id: "frontend-development",
    name: "Frontend Development",
    skills: [
      { name: "React", icon: SiReact },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    id: "databases-and-data-management",
    name: "Databases and Data Management",
    skills: [
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Supabase", icon: SiSupabase },
    ],
  },
  {
    id: "devops-tools-and-testing",
    name: "DevOps and Testing",
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "Git & GitHub", icon: SiGit, secondaryIcon: SiGithub },
      { name: "Maven", icon: SiApachemaven },
      { name: "JUnit", icon: SiJunit5 },
    ],
    secondarySkills: [
      { name: "Linux", icon: SiLinux },
    ],
  },
  {
    id: "ai-computer-vision-and-iot",
    name: "AI, Computer Vision and IoT",
    skills: [
      { name: "YOLOv11", icon: ScanEye },
      { name: "OpenCV", icon: SiOpencv },
      { name: "CNN", icon: BrainCircuit },
      { name: "ESP32-S3", icon: Cpu },
    ],
  },
];
