import { Icons } from "@/components/icons";

export default function Loader() {
  return (
    <div className="flex items-center w-full h-screen z-5">
      <Icons.spinner className="m-auto animate-spin" size="5rem" />
    </div>
  );
}
