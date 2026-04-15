import { ClipLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-full h-max">
      <ClipLoader />
    </div>
  );
};
