import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Editor from "./Editor";
import NavWrapper from "./NavWrapper";

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
  return (
    <NavWrapper project={project}>
      {/* @ts-ignore */}
      <Editor defaultFrames={frames} project={project} />
    </NavWrapper>
  );
}
