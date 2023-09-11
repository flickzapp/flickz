import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Editor from "./Editor";
import NavWrapper from "./NavWrapper";
import { getCurrentUser } from "@/lib/session";
import StateWrapper from "./StateWrapper";

export default async function EditorPageWrap({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      id: true,
      name: true,
      aspectRatio: true,
      audioLink: true,
    },
  });

  if (!project) {
    // actually throw error
    return redirect("/projects");
  }

  const frames = await db.frame.findMany({
    where: {
      projectId: projectId,
    },
    select: {
      id: true,
      index: true,
      text: true,
      duration: true,
      entryAnimate: true,
      exitAnimate: true,
      fontFamily: true,
      fontSize: true,
      fontWeight: true,
      align: true,
      projectId: true,
      fontColor: true,
      backgroundColor: true,
      backgroundImgLink: true,
      backgroundVideoLink: true,
    },
    orderBy: {
      index: "asc",
    },
  });
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }

  return <StateWrapper user={user} project={project} defaultFrames={frames} />;
}
