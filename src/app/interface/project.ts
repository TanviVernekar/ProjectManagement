export class ProjectList {
  id?: number;
  name?: string;
  startDate?: string;
  status?: string;
  technologies?: string;
  employees: {
    id?: number;
    name?: string;
    startDate?: string;
    status?: string;
    technologies?: string;
  };
}
