import dynamic from "next/dynamic";

export const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-gray-200 rounded-[12px]" />
  ),
});
