"use client";

import { Icons } from "@/components/icons";
import PricingComponent from "@/components/shared/Pricing";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { COMP_NAME } from "@/lib/constants";
import { useRendering } from "@/lib/lambda/use-rendering";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import DialogNextUI from "@/components/ui/dialog-nextui";

export default function RenderVideoButton({
  frames,
  project,
  savedChanges,
  user,
}: {
  frames: frameInputType[];
  project: EditorProjectType;
  savedChanges: "init" | "saving" | "saved";
  user: any;
}) {
  const tempFrames = [...frames];
  const router = useRouter();
  const { renderMedia, state, undo } = useRendering(COMP_NAME, {
    frames: tempFrames,
    aspectRatio: project.aspectRatio || "16:9",
    audioLink: project.audioLink,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSavedChanges = () => {
    if (!user.isActive) {
      onOpen();
      return;
    }
    if (savedChanges === "saving") {
      toast({
        title: "Please wait for the changes to save",
      });
    } else {
      renderMedia();
    }
  };

  return (
    <div>
      {(state.status == "init" ||
        state.status === "invoking" ||
        state.status === "error") && (
          <>
            <Button
              disabled={state.status === "invoking"}
              onClick={handleSavedChanges}
            >
              {state.status === "invoking" && (
                <Icons.spinner className="h-5 w-5 animate-spin" />
              )}
              Export Video
            </Button>
            {state.status === "error" && (
              <div>
                <strong>Error:</strong>
                <p>{state.error.message}</p>
              </div>
            )}
          </>
        )}
      {state.status === "rendering" && (
        <Button disabled variant={"default"}>
          <Icons.spinner className="h-5 w-5 animate-spin" />
          Exporting...
        </Button>
      )}
      {state.status === "done" && (
        <Button variant="default">
          <a href={state.url} target="_blank">
            Download
          </a>
        </Button>
      )}
      <DialogNextUI isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
