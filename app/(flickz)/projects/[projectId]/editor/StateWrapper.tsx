"use client";

import { useState } from "react";
import Editor from "./Editor";
import NavWrapper from "./NavWrapper";
import { User } from "next-auth";

export default function StateWrapper({
  project,
  defaultFrames,
  user,
}: {
  project: EditorProjectType;
  defaultFrames: any;
  user: Pick<User, "name" | "image" | "email">;
}) {
  const [savedChanges, setSavedChanges] = useState<"init" | "saving" | "saved">(
    "init"
  );

  return (
    <NavWrapper
      project={project}
      savedChanges={savedChanges}
      setSavedChanges={setSavedChanges}
      user={user}
      defaultFrames={defaultFrames}
    >
      {/* @ts-ignore */}
      <Editor
        defaultFrames={defaultFrames}
        project={project}
        savedChanges={savedChanges}
        setSavedChanges={setSavedChanges}
      />
    </NavWrapper>
  );
}
