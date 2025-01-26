import { User } from "../users/user.model";

export interface Portfolio {
  _id?: string;
  title?: string | null;             
  portfolioSummary?: string | null;  
  dateRange?: {
    start?: Date | null;
    end?: Date | null;
  };
  user?: User;
}
