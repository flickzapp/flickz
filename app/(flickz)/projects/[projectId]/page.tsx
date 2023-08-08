import { redirect } from "next/navigation";

export default function ProjectPage({ params }: any) {
  return redirect(`/projects/${params.projectId}/editor`);
}
