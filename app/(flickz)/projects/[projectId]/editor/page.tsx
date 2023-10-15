import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Editor from "./Editor";
import NavWrapper from "./NavWrapper";
import { getCurrentUser } from "@/lib/session";
import StateWrapper from "./StateWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
      objects: true,
    },
    orderBy: {
      index: "asc",
    },
  });
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/login");
  }

  return (
    <StateWrapper
      user={session.user}
      project={project}
      defaultFrames={frames}
    />
  );
}
