import { DeleteModule } from "./ui/delete";
import { EditModule } from "./ui/edit";

export const ModuleAction = Object.assign(
  {},
  {
    Edit: EditModule,
    Delete: DeleteModule,
  },
);
