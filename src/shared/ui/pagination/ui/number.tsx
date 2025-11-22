import { cn } from "@/src/shared/libs/utils";

interface NumberProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number | "...";
  active?: boolean;
}

const Number = ({ value, active, className, ...props }: NumberProps) => {
  return (
    <div
      className={cn(
        "font-nunito flex items-center justify-center h-[32px] w-[32px] text-body rounded-[32px] cursor-pointer select-none",
        active ? "bg-primary-200 text-white" : "text-contrast",
        className
      )}
      {...props}
    >
      {value}
    </div>
  );
};

export default Number;
