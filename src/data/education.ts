type EducationEntry = {
  id: string;
  institution: string;
  qualification: string;
  affiliation?: string;
  achievement?: string;
  kind: "university" | "school";
  start: { label: string; dateTime: string };
  end?: { label: string; dateTime: string };
};

export const education: readonly EducationEntry[] = [
  {
    id: "iit",
    institution: "Informatics Institute of Technology (IIT)",
    affiliation: "Affiliated with the University of Westminster",
    qualification: "BEng (Hons) Software Engineering",
    achievement: "First Class Honours",
    kind: "university",
    start: { label: "Sep 2022", dateTime: "2022-09" },
    end: { label: "Nov 2026", dateTime: "2026-11" },
  },
  {
    id: "kegalu",
    institution: "Kegalu Vidyalaya",
    qualification: "GCE Advanced Level – Mathematics Stream",
    kind: "school",
    start: { label: "2019", dateTime: "2019" },
    end: { label: "2022", dateTime: "2022" },
  },
  {
    id: "royal",
    institution: "Royal International School",
    qualification: "GCE Ordinary Level",
    kind: "school",
    start: { label: "2018", dateTime: "2018" },
  },
];
