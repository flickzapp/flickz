import { notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { UserAccountNav } from "@/components/user-account-nav";
import AppNav from "@/components/app-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import ProjectMenu from "./ProjectMenu";
interface DashboardLayoutProps {
  project: Partial<EditorProjectType>;
  children?: React.ReactNode;
}

export default async function NavWrapper({
  children,
  project,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="px-4 flex h-16 items-center justify-between py-4">
          <AppNav />
          <ProjectMenu project={project} />
          <div className="flex items-center gap-2">
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="overflow-hidden px-4">{children}</main>
    </div>
  );
}
