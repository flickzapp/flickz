"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { db } from "./lib/db";

export async function serverAct(title: string, description: string) {
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
