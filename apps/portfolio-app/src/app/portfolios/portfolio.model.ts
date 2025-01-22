import { User } from "../users/user.model";

export interface Project {
  projectName: string;
  projectType: string;
  description?: string;
  dateCreated?: string;
  images?: string[];
}

export interface DateRange {
  start: string;
  end: string;
}

export interface Portfolio {
  _id?: string;
  title: string;
  portfolioSummary?: string;
  dateRange?: DateRange;
  projects?: Project[];
  user: User;
}
