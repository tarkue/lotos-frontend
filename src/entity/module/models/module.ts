import { Theme } from "../../theme/models/theme";

export interface Module {
  id: number;
  title: string;
  position?: number;

  isAble?: boolean;
  allTasks?: number;
  themes?: Theme[];
}
