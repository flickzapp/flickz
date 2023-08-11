"use client";

import { deleteProjectAction } from "@/actions";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectDeleteButton({
  projectId,
}: {
  projectId: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDeleteProject = async () => {
    setLoading(true);
    await deleteProjectAction(projectId);
    setLoading(false);
    toast({
      title: "Project deleted",
    });
    router.refresh();
  };
  return (
    <Button variant={"ghost"} onClick={handleDeleteProject} disabled={loading}>
      {loading && <Icons.spinner className="h-5 w-5 animate-spin mr-2" />}
      Delete
    </Button>
  );
}
