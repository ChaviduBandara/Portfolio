type EducationEntry = {
  id: string;
  institution: string;
  qualification: string;
  level?: string;
  detail?: string;
  achievement?: string;
  kind: "university" | "school";
  start: { label: string; dateTime: string };
  end?: { label: string; dateTime: string };
};

export const education: readonly EducationEntry[] = [
  {
    id: "westminster",
    institution: "University of Westminster",
    detail: "Studied at Informatics Institute of Technology (IIT)",
    qualification: "BEng (Hons) Software Engineering",
    achievement: "First Class Honours",
    kind: "university",
    start: { label: "Sep 2022", dateTime: "2022-09" },
    end: { label: "Nov 2026", dateTime: "2026-11" },
  },
  {
    id: "kegalu",
    institution: "Kegalu Vidyalaya",
    level: "Higher Secondary School",
    qualification: "GCE Advanced Level – Mathematics Stream",
    kind: "school",
    start: { label: "2019", dateTime: "2019" },
    end: { label: "2022", dateTime: "2022" },
  },
];
