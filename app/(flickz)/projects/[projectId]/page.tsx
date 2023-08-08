import { redirect } from "next/navigation";

export default function ProjectPage({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  return redirect(`/projects/${projectId}/editor`);
}
