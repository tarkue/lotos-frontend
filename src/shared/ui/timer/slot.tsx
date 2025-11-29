import { Typography } from "../typography";

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export const Slot = () => {
  return (
    <div className="flex flex-col slot">
      {NUMBERS.map((el, i) => (
        <Typography.Subtitle component="span" key={i}>
          {el}
        </Typography.Subtitle>
      ))}
    </div>
  );
};
