import Module from "module";
import React from "react";

export interface ModuleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  module: Module;
}
