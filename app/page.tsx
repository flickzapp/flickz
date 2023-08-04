import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-between gap-8">
        <h1 className="text-2xl font-bold">
          Create Awesome Product Videos in just a minute
        </h1>
        <Link href={`/create`}>
          <Button>+ Create Video</Button>
        </Link>
      </div>
    </main>
  );
}
