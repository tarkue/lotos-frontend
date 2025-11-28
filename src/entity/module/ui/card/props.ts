import { Module } from "../../models/module";

export interface ModuleCardProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  module: Module;
}
