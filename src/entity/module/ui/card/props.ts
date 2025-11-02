import { Module } from "../../models/module";

export interface ModuleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  module: Module;
}
