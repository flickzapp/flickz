"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { db } from "./lib/db";

export async function createProjectAction(title: string, description: string) {
  "use server";

  function constructFrames(wordsPerFrame: number) {
    const words = description.trim().split(/\s+/); // Split the text into an array of words
    const frames = [];
    const minDuration = 2; // Minimum duration in seconds
    const maxDuration = 3; // Maximum duration in seconds

    let currentFrame = "";
    let currentDuration = 0;

    for (const word of words) {
      const wordDuration = Math.ceil(word.length / 5); // Assume 5 characters per second
      const frameDuration = currentDuration + wordDuration;

      if (
        (currentFrame + word + " ").length <= wordsPerFrame &&
        frameDuration <= maxDuration
      ) {
        // Add the word to the current frame
        currentFrame += word + " ";
        currentDuration = frameDuration;
      } else {
        // Save the current frame and start a new one
        frames.push({
          text: currentFrame.trim(),
          duration: Math.max(minDuration, currentDuration),
        });
        currentFrame = word + " ";
        currentDuration = wordDuration;
      }
    }

    // Add the last frame to the result
    if (currentFrame.trim() !== "") {
      frames.push({
        text: currentFrame.trim(),
        duration: Math.max(minDuration, currentDuration),
      });
    }

    return frames;
  }
  const session = await getServerSession(authOptions);
  const frames = constructFrames(30).map((item, index) => ({
    index,
    ...item,
  }));
  const project = await db.project.create({
    data: {
      name: title,
      description,
      user: {
        connect: {
          id: session?.user.id,
        },
      },
      Frame: {
        createMany: {
          data: frames,
        },
      },
    },
  });
  // console.log(session?.user.id);
  // console.log(`User ${session?.user?.name} created a project ${title}`);
  return project;
}

export async function updateFramesAction(projectId: string, frames: any) {
  const session = await getServerSession(authOptions);
  const project = await db.project.findFirst({
    where: {
      id: projectId,
      user: {
        id: session?.user.id,
      },
    },
  });
  if (!project) {
    throw new Error("Project not found");
  }
  /*
    2 choices to deal with the situation:
    
    1) Get all existing frames. For each existing frame update all the related properties, 
     if the frame doesn't exist, then we create a new frame.
     If the frame is present in existing frames but not in frames, then we delete those frames
    2) Delete all existing frames and create new frames
  */
  const existingFrames = await db.frame.findMany({
    where: {
      projectId: projectId,
    },
  });
  type ExistingFrameIdsType = {
    [key: string]: boolean;
  };
  const existingFrameIds: ExistingFrameIdsType = {};
  for (const frame of existingFrames) {
    existingFrameIds[frame.id] = false;
  }
  const promises = [];
  const deletePromises = [];
  for (const frame of frames) {
    const {
      index,
      duration,
      text,
      entryAnimate,
      exitAnimate,
      fontFamily,
      fontSize,
      fontWeight,
      fontColor,
      backgroundColor,
      align,
      backgroundImgLink,
      backgroundVideoLink,
    } = frame;
    if (frame.id) {
      promises.push(
        db.frame.update({
          where: {
            id: frame.id,
          },
          data: {
            index,
            duration,
            text,
            entryAnimate,
            exitAnimate,
            fontFamily,
            fontSize,
            fontWeight,
            fontColor,
            backgroundColor,
            backgroundImgLink,
            backgroundVideoLink,
            align,
          },
        })
      );
      existingFrameIds[frame.id] = true;
    } else {
      promises.push(
        db.frame.create({
          data: {
            index,
            duration,
            text,
            entryAnimate,
            exitAnimate,
            fontFamily,
            fontSize,
            fontWeight,
            fontColor,
            backgroundColor,
            backgroundImgLink,
            backgroundVideoLink,
            align,
            project: {
              connect: {
                id: projectId,
              },
            },
          },
        })
      );
    }
  }
  for (const frame of existingFrames) {
    if (!existingFrameIds[frame.id]) {
      deletePromises.push(
        db.frame.delete({
          where: {
            id: frame.id,
          },
        })
      );
    }
  }
  await Promise.all(deletePromises);
  const new_frames = await Promise.all(promises);
  const newDescription = frames.map((item: any) => item.text).join(" ");
  await db.project.update({
    where: {
      id: projectId,
    },
    data: {
      description: newDescription,
    },
  });
  return new_frames;
}

export async function deleteProjectAction(projectId: string) {
  const session = await getServerSession(authOptions);
  const project = await db.project.findFirst({
    where: {
      id: projectId,
      user: {
        id: session?.user.id,
      },
    },
  });
  if (!project) {
    throw new Error("Project not found");
  }
  await db.project.delete({
    where: {
      id: projectId,
    },
  });
  return project;
}

export async function updateProjectAction(
  projectId: string,
  projectData: EditorProjectType
) {
  const session = await getServerSession(authOptions);
  const project = await db.project.findFirst({
    where: {
      id: projectId,
      user: {
        id: session?.user.id,
      },
    },
  });
  if (!project) {
    throw new Error("Project not found");
  }
  const updatedProject = await db.project.update({
    where: {
      id: projectId,
    },
    data: {
      name: projectData.name,
      aspectRatio: projectData.aspectRatio,
      audioLink: projectData.audioLink,
    },
  });
  return updatedProject;
}
