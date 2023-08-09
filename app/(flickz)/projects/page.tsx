import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth");
  }

  const projects = await db.project.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      Frame: true,
    },
  });

  if (projects.length === 0) {
    return (
      <>
        <h1 className="text-3xl font-extrabold">
          Create Your First Project Here!
        </h1>
        <Link href="/create">
          <Button>+ Project</Button>
        </Link>
      </>
    );
  }
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <Link href="/create">
          <Button>+ Project</Button>
        </Link>
      </div>

      <div className="my-8 w-full flex flex-col gap-4">
        {projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <div className="flex items-center justify-between p-4 bg-slate-100 rounded-md cursor-pointer">
              <div className="flex items-center gap-4">
                <Icons.logo />
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <p className="text-gray-500 line-clamp-1 max-w-xl md:max-w-4xl">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="text-gray-500">
                  {`Last Edited ${project.updatedAt.toLocaleDateString()}`}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost">
                      <Icons.horizontalEllipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Button variant="ghost">Delete</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
