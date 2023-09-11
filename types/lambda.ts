import { z } from "zod";

export const ZFrame = z.object({
  text: z.string(),
  id: z.string().nullable().optional(),
  index: z.number(),
  duration: z.number(),
  entryAnimate: z.string().nullable().optional(),
  fontFamily: z.string().nullable().optional(),
  fontWeight: z.string().nullable().optional(),
  fontSize: z.string().nullable().optional(),
  align: z.string().nullable().optional(),
  exitAnimate: z.string().nullable().optional(),
  backgroundColor: z.string().nullable().optional(),
  projectId: z.string().nullable().optional(),
  fontColor: z.string().nullable().optional(),
  backgroundImgLink: z.string().nullable().optional(),
  backgroundVideoLink: z.string().nullable().optional(),
});

export const CompositionProps = z.object({
  frames: z.array(ZFrame),
  aspectRatio: z.string().default("16:9"),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  frames: [
    {
      id: "clm987yzj000dkpmx2xsazhpz",
      index: 0,
      text: "Unlock the power of customer data today!",
      duration: 5,
      entryAnimate: "none",
      exitAnimate: "fadeOut",
      fontFamily: "inter",
      fontSize: "7rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clm987yzi000ckpmxact2rqox",
      fontColor: "#FFF",
      backgroundColor: "#000",
      backgroundImgLink:
        "https://uploadthing.com/f/34a7c8c8-4ac5-4117-b0b3-62421f2635e1_RhEcxCqqyZYyI44d4LJYtzX4ISs.png",
      backgroundVideoLink: null,
    },
    {
      id: "clm987yzj000ekpmx0glq65jm",
      index: 1,
      text: "Harness the web for actionable insights.",
      duration: 3,
      entryAnimate: "slideFromRight",
      exitAnimate: "fadeOut",
      fontFamily: "inter",
      fontSize: "7rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clm987yzi000ckpmxact2rqox",
      fontColor: "#FFF",
      backgroundColor: "#000",
      backgroundImgLink:
        "https://uploadthing.com/f/34a7c8c8-4ac5-4117-b0b3-62421f2635e1_RhEcxCqqyZYyI44d4LJYtzX4ISs.png",
      backgroundVideoLink: null,
    },
    {
      id: "clm987yzj000fkpmxve6p0gif",
      index: 2,
      text: "Trust us to deliver innovative solutions.",
      duration: 2,
      entryAnimate: "moveUp",
      exitAnimate: "none",
      fontFamily: "inter",
      fontSize: "7rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clm987yzi000ckpmxact2rqox",
      fontColor: "#FFF",
      backgroundColor: "#000",
      backgroundImgLink:
        "https://uploadthing.com/f/444062b1-37f3-44f0-93b9-a61d34e7673d_QIMXHJ1IUMwTqVbY4SoDNITNKU%20(1).png",
      backgroundVideoLink: null,
    },
    {
      id: "clm987yzj000gkpmxoi374avw",
      index: 3,
      text: "AI algorithms for deep, data-driven insights.",
      duration: 4,
      entryAnimate: "slideFromRight",
      exitAnimate: "none",
      fontFamily: "inter",
      fontSize: "7rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clm987yzi000ckpmxact2rqox",
      fontColor: "#FFF",
      backgroundColor: "#000",
      backgroundImgLink:
        "https://uploadthing.com/f/34a7c8c8-4ac5-4117-b0b3-62421f2635e1_RhEcxCqqyZYyI44d4LJYtzX4ISs.png",
      backgroundVideoLink: null,
    },
  ],
  aspectRatio: "4:5",
};

export const RenderRequest = z.object({
  id: z.string(),
  inputProps: CompositionProps,
});
export const ProgressRequest = z.object({
  bucketName: z.string(),
  id: z.string(),
});

export type ProgressResponse =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "progress";
      progress: number;
    }
  | {
      type: "done";
      url: string;
      size: number;
    };
