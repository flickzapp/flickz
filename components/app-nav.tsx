import Link from "next/link";
import { Icons } from "@/components/icons";

const AppNav = () => {
  return (
    <div className="flex gap-14 items-center">
      <Link href="/" className="flex items-center gap-3">
        <Icons.logo />
        <span className="font-semibold text-2xl">flickz</span>
      </Link>
      {/* <nav className="flex gap-8">
        <Link href="/pricing">pricing</Link>
        <Link href="/help">help</Link>
      </nav> */}
    </div>
  );
};

export default AppNav;
