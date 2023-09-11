// @ts-nocheck
import { useRef, useState } from "react";
import { Icons } from "../icons";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { updateProjectAction } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

export default function MusicSamplePlayer({
  name,
  path,
  type,
  project,
}: {
  name: string;
  path: string;
  type?: string;
  project: EditorProjectType;
}) {
  const [isPaused, setIsPaused] = useState(true);
  const audioPlayerRef = useRef(null);
  const selectedAudio = project.audioLink;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Card
      className={`p-4 cursor-pointer ${
        selectedAudio &&
        path === selectedAudio &&
        "border-2 border-black dark:border-gray-200"
      }`}
    >
      <div className="flex gap-4 items-center">
        {/* play button on click, plays audio from path */}
        <Button
          variant="ghost"
          onClick={
            // check if audio is playing
            () => {
              const audioPlayer = audioPlayerRef.current;
              if (audioPlayer.paused) {
                audioPlayer.play();
              } else {
                audioPlayer.pause();
              }
              setIsPaused((prev) => !prev);
            }
          }
          onBlur={() => {
            const audioPlayer = audioPlayerRef.current;
            audioPlayer.pause();
            setIsPaused(true);
          }}
        >
          {isPaused ? <Icons.playIcon /> : <Icons.pauseIcon />}
        </Button>

        <audio src={path} hidden ref={audioPlayerRef} autoPlay={false} />
        <div className="flex justify-between w-full items-center">
          <CardTitle className="text-lg">{name}</CardTitle>
          {selectedAudio && path === selectedAudio ? (
            <Button variant={"outline"}>
              <p>Using this</p>
            </Button>
          ) : (
            <Button
              onClick={async () => {
                setLoading(true);
                await updateProjectAction(project.id, {
                  ...project,
                  audioLink: path,
                });
                setLoading(false);
                toast({
                  title: "Audio updated!",
                });
                router.refresh();
              }}
              disabled={loading}
            >
              {loading && <Icons.spinner className="h-5 w-5 animate-spin" />}
              <p>Use this</p>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
