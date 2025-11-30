import { MaterialActionProps } from "./models/material-action";
import { MaterialComplete } from "./ui/complete";
import { StartTest } from "./ui/start-test";

export const MaterialAction = (props: MaterialActionProps) => {
  const Action = props.material.has_tests ? StartTest : MaterialComplete;
  return <Action {...props} />;
};
