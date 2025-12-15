/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/src/shared/libs/utils";

const selectStyles = {
  input: (base: any) => ({
    ...base,
    "input:focus": {
      boxShadow: "none",
    },
  }),
};

const selectClassNames = {
  control: ({ isFocused }: any) =>
    cn(
      "transition-colors duration-300 flex w-full rounded-[8px] border placeholder-gray border-base-200 bg-base-100 px-4 py-2",
      isFocused ? "outline-none" : ""
    ),
  option: () =>
    "flex px-[16px] py-1 text-[16px] rounded-[8px] hover:bg-base-200",
  menu: () =>
    "flex flex-col w-full rounded-[10px] bg-base-100 p-1 mt-1 elevation border-base-200 border",
  singleValue: () => "text-gray",
  input: () => "text-black",
  placeholder: () => "text-gray",
  dropdownIndicator: () => "text-gray",
};

export const defaultProps = {
  styles: selectStyles,
  classNames: selectClassNames,
};
