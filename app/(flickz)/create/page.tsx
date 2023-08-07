import ContentWrapper from "@/components/shared/ContentWrapper";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function VideoCreatePage() {
  return (
    <ContentWrapper>
      <h1 className="text-3xl font-semibold">
        Create Awesome Product Videos in just a minute
      </h1>
      <p className="text-md">
        Add the text which goes on the video, we will split the text into frames
        to match with the music!
      </p>

      <Textarea placeholder="Video text content goes here" className="w-96" />

      <Link href={`/editor`}>
        <Button className="w-64">Generate Video</Button>
      </Link>
    </ContentWrapper>
  );
}
