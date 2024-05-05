export enum WorkMode {
  REMOTE = "remote",
  HYBRID = "hybrid",
  INOFFICE = "inoffice",
}

export enum AvailableFilters {
  ROLE = "role",
  MINEXPERIENCE = "minExperience",
  COMPANYNAME = "companyName",
  LOCATION = "Location",
  //   WORKMODE = "workMode",
  //   TECKSTACK = "techStack",
  MINBASEPAY = "minBasePay",
  SEARCH = "search",
}

export interface Filters {
  role?: string[];
  minExperience?: number[];
  companyName?: string;
  Location?: string;
  workMode?: WorkMode;
  minBasePay?: number;
}
