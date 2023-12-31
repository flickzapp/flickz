"use client";

import { useState } from "react";
import Editor from "./Editor";
import NavWrapper from "./NavWrapper";

export default function StateWrapper({
  project,
  defaultFrames,
  user,
}: {
  project: EditorProjectType;
  defaultFrames: any;
  user: any;
}) {
  const [savedChanges, setSavedChanges] = useState<SavingStatusType>("init");

  return (
    <NavWrapper
      project={project}
      savedChanges={savedChanges}
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
