"use client";

import { UserAccountNav } from "@/components/user-account-nav";
import AppNav from "@/components/app-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import ProjectMenu from "./ProjectMenu";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import RenderVideoButton from "./RenderVideoButton";

interface DashboardLayoutProps {
  project: Partial<EditorProjectType>;
  children?: React.ReactNode;
  savedChanges: SavingStatusType;
  user: Pick<User, "name" | "image" | "email">;
  defaultFrames: any;
}

export default function NavWrapper({
  children,
  project,
  savedChanges,
  user,
  defaultFrames,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="px-4 flex h-16 items-center justify-between py-4">
          <AppNav />
          <ProjectMenu project={project} />
          <div className="flex items-center gap-4">
            <RenderVideoButton
              // @ts-ignore
              project={project}
              frames={defaultFrames}
              savedChanges={savedChanges}
            />
            {savedChanges !== "init" && (
              <Button variant={"secondary"}>
                {savedChanges === "saving" ? "Saving..." : "Saved"}
              </Button>
            )}

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
