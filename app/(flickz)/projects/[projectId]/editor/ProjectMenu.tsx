"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";
import { getDimensionsForAspectRatio } from "@/lib/aspect-ratio";
import { useState } from "react";
import EditableInput from "@/components/shared/EditableInput";
import { useRouter } from "next/navigation";
import { updateProjectAction } from "@/actions";

interface AspectRatioMenuProps {
  project: any;
}

const MapAspectRatioToIcons: {
  [key: string]: JSX.Element;
} = {
  "16:9": <Icons.monitor className="h-5 w-5" />,
  "4:3": <Icons.square className="h-5 w-5" />,
  "1:1": <Icons.smartphone className="h-5 w-5" />,
  "4:5": <Icons.smartphone className="h-5 w-5" />,
  "9:16": <Icons.smartphone className="h-5 w-5" />,
};

export default function ProjectMenu({ project }: AspectRatioMenuProps) {
  const router = useRouter();
  const saveProjectMetaChanges = async ({
    name,
    aspectRatio,
    audioLink,
  }: {
    name?: string;
    aspectRatio?: string;
    audioLink?: string;
  }) => {
    let newProjectData = {
      ...project,
      aspectRatio: aspectRatio,
      audioLink: audioLink,
    };
    await updateProjectAction(project.id as string, newProjectData);
    router.refresh();
  };

  const handleAspectRatioChange = (newAspectRatio: string) => {
    const newDimensions = getDimensionsForAspectRatio(newAspectRatio);
    saveProjectMetaChanges({ aspectRatio: newAspectRatio });
  };
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <EditableInput
          textValue={project.name}
          textCn="text-xl font-light"
          saveTextValue={(newVal) => saveProjectMetaChanges({ name: newVal })}
        />
      </div>
      <span className="text-3xl font-thin text-gray-200 mx-2">/</span>
      <div className="flex-2">
        <Select onValueChange={(val) => handleAspectRatioChange(val)}>
          <SelectTrigger className="w-full">
            <SelectValue>
              <div className="flex gap-4 items-center">
                {(project.aspectRatio &&
                  MapAspectRatioToIcons[project.aspectRatio]) || (
                  <Icons.monitor className="h-5 w-5" />
                )}
                <span>{project.aspectRatio}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.keys(MapAspectRatioToIcons).map((key) => (
              <SelectItem value={key} key={key}>
                <div className="flex gap-4">
                  {MapAspectRatioToIcons[key]}
                  <span>{key}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
