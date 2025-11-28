import React from "react";
import { Module } from "../../models/module";

export interface ModuleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  module: Module;
}
