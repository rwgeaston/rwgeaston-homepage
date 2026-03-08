import { load } from 'js-yaml';
import cvYaml from '../data/cv.yaml?raw';

export type CvLink = {
  label: string;
  url: string;
};

export type CvSkillGroup = {
  category: string;
  items: string[];
};

export type CvExperienceItem = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end?: string;
  achievements: string[];
};

export type CvEducationItem = {
  qualification: string;
  institution: string;
  start?: string;
  end?: string;
  notes?: string;
};

export type CvProjectItem = {
  name: string;
  description: string;
  link?: string;
};

export type CvCertificationItem = {
  name: string;
  issuer: string;
  year?: string;
};

export type CvData = {
  person: {
    full_name: string;
    headline?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    links?: CvLink[];
  };
  summary: string;
  skills: CvSkillGroup[];
  experience: CvExperienceItem[];
  education: CvEducationItem[];
  projects?: CvProjectItem[];
  certifications?: CvCertificationItem[];
};

export function loadCvData(): CvData {
  const parsed = load(cvYaml) as CvData;

  if (!parsed?.person?.full_name) {
    throw new Error('CV YAML must include person.full_name');
  }

  return parsed;
}

export function formatDateRange(start?: string, end?: string): string {
  if (!start && !end) {
    return '';
  }

  if (!start) {
    return end ?? '';
  }

  return `${start} - ${end ?? 'Present'}`;
}
