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
  audioLink: z.string().nullable().optional(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  frames: [
    {
      id: "clnd2nc3t0001kp8hz5pl8gz9",
      index: 0,
      text: "Lemon Squeezy: All-in-one platform for your SaaS business.",
      duration: 4,
      entryAnimate: "slideFromRight",
      exitAnimate: "fadeOut",
      fontFamily: "Poppins",
      fontSize: "7rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clnd2nc3t0000kp8h6la5phzy",
      fontColor: "#FFF",
      backgroundColor: "#000",
      backgroundImgLink: null,
      backgroundVideoLink: null,
    },
    {
      id: "clnd2nc3t0002kp8hvqntaovg",
      index: 1,
      text: "Payments, subscriptions, tax compliance & fraud prevention.",
      duration: 6,
      entryAnimate: "none",
      exitAnimate: "fadeOut",
      fontFamily: "Roboto Slab",
      fontSize: "7rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clnd2nc3t0000kp8h6la5phzy",
      fontColor: "#FFF",
      backgroundColor: "#000",
      backgroundImgLink: null,
      backgroundVideoLink: null,
    },
    {
      id: "clnd2nc3t0003kp8hlxf0ui9v",
      index: 2,
      text: "Multi-currency support with failed payment recovery.",
      duration: 4,
      entryAnimate: "slideFromRight",
      exitAnimate: "none",
      fontFamily: "Kanit",
      fontSize: "7rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clnd2nc3t0000kp8h6la5phzy",
      fontColor: "#FFF",
      backgroundColor: "#000",
      backgroundImgLink: null,
      backgroundVideoLink: null,
    },
    {
      id: "clnd2nc3t0004kp8hz22v0me6",
      index: 3,
      text: "Easy peasy software business with Lemon Squeezy.",
      duration: 2,
      entryAnimate: "slideFromRight",
      exitAnimate: "none",
      fontFamily: "Kanit",
      fontSize: "7rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clnd2nc3t0000kp8h6la5phzy",
      fontColor: "#FFF",
      backgroundColor: "#000",
      backgroundImgLink: null,
      backgroundVideoLink: null,
    },
  ],
  aspectRatio: "4:5",
  audioLink:
    "https://uploadthing.com/f/d5a43521-cd87-4d1a-a966-67d47c725b3d_Wolf_Team-%5BAudioTrimmer.com%5D.mp3",
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
