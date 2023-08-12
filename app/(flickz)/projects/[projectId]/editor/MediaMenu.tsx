"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { UploadDropzone } from "@/lib/uploadThing";
import { toast } from "@/components/ui/use-toast";
import "@uploadthing/react/styles.css";
import { useState } from "react";
interface MediaMenuInterface {
  currentFrame: number;
  frames: frameInputType[];
  setFrames: any;
}
export default function MediaMenu({
  currentFrame,
  frames,
  setFrames,
}: MediaMenuInterface) {
  const [loading, setLoading] = useState(false);
  const handleApplyToAllFrames = () => {
    setLoading(true);
    const imgLink = frames[currentFrame].backgroundImgLink;
    let tempFrames = [...frames];
    tempFrames.forEach((frame: any, index: number) => {
      tempFrames[index].backgroundImgLink = imgLink;
    });
    setFrames(tempFrames);
    setLoading(false);
    toast({
      title: "Applied to all frames!",
    });
  };
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold my-4">Image Background</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icons.horizontalEllipsis className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {frames[currentFrame].backgroundImgLink && (
              <DropdownMenuItem
                onClick={() => {
                  let tempFrames = [...frames];
                  tempFrames[currentFrame].backgroundImgLink = undefined;
                  setFrames(tempFrames);
                }}
              >
                Remove Background
              </DropdownMenuItem>
            )}

            <DropdownMenuItem onClick={handleApplyToAllFrames}>
              {loading && <Icons.spinner className="h-5 w-5 animate-spin" />}
              Apply To All frames
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {frames[currentFrame].backgroundImgLink && (
        <>
          <h2>Preview Image</h2>

          <img
            src={frames[currentFrame].backgroundImgLink}
            className=" h-[200px] m-4"
          />
        </>
      )}
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log(res);
          if (res?.length && res?.length > 0) {
            const tempFrames = [...frames];
            tempFrames[currentFrame].backgroundImgLink = res[0].url;
            setFrames(tempFrames);
            toast({
              title: "Image uploaded!",
            });
          }
        }}
        onUploadError={() => {
          toast({
            title: "Image upload failed!",
            variant: "destructive",
          });
        }}
      />
    </div>
  );
}
