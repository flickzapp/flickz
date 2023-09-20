"use client";

import { Icons } from "@/components/icons";
import PricingComponent from "@/components/shared/Pricing";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { COMP_NAME } from "@/lib/constants";
import { useRendering } from "@/lib/lambda/use-rendering";
import { useState } from "react";

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
  const { renderMedia, state, undo } = useRendering(COMP_NAME, {
    frames: tempFrames,
    aspectRatio: project.aspectRatio || "16:9",
    audioLink: project.audioLink,
  });
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const handleSavedChanges = () => {
    if (!user.isActive) {
      setShowMembershipModal(true);
    }
    if (savedChanges === "saving") {
      toast({
        title: "Please wait for the changes to save",
      });
    } else {
      renderMedia();
    }
  };

  if (showMembershipModal) {
    return (
      <Dialog>
        <PricingComponent />
      </Dialog>
    );
  }
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
    </div>
  );
}
