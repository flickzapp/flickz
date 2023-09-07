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
      id: "clljgz8kn0001kp8ym732tejk",
      index: 0,
      text: "x",
      duration: 3,
      entryAnimate: "slideFromRight",
      exitAnimate: "none",
      fontFamily: "inter",
      fontSize: "9rem",
      fontWeight: "500",
      align: "text-center",
      projectId: "clljgz8kn0000kp8yfr30g88m",
      fontColor:
        "linear-gradient(to bottom right,#8a2be2,#0000cd,#228b22,#ccff00)",
      backgroundColor: "linear-gradient(to top left,#FF512F,#F09819)",
      backgroundImgLink: null,
      backgroundVideoLink: null,
    },
    {
      id: "clljgz8kn0002kp8y1hdiunq0",
      index: 1,
      text: "its gonna look",
      duration: 3,
      entryAnimate: "moveUp",
      exitAnimate: "none",
      fontFamily: "inter",
      fontSize: "8rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clljgz8kn0000kp8yfr30g88m",
      fontColor: "#FFF",
      backgroundColor: "#000",
      backgroundImgLink: null,
      backgroundVideoLink: null,
    },
    {
      id: "clljm7d97001zkpo6wpn9ihvx",
      index: 2,
      text: "Another Frame",
      duration: 2,
      entryAnimate: "grow",
      exitAnimate: "none",
      fontFamily: "inter",
      fontSize: "9rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clljgz8kn0000kp8yfr30g88m",
      fontColor: "#E2E2E2",
      backgroundColor: "#000",
      backgroundImgLink: null,
      backgroundVideoLink: null,
    },
    {
      id: "clljm7d970020kpo6upgk1tdk",
      index: 3,
      text: "ssss",
      duration: 2,
      entryAnimate: "none",
      exitAnimate: "fadeOut",
      fontFamily: "inter",
      fontSize: "7rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clljgz8kn0000kp8yfr30g88m",
      fontColor: "#ffffff",
      backgroundColor: "#000",
      backgroundImgLink: null,
      backgroundVideoLink: null,
    },
    {
      id: "clljmkbod002ikpo652s62uft",
      index: 4,
      text: "New Frame",
      duration: 2,
      entryAnimate: "none",
      exitAnimate: "shrink",
      fontFamily: "inter",
      fontSize: "9rem",
      fontWeight: "font-bold",
      align: "text-center",
      projectId: "clljgz8kn0000kp8yfr30g88m",
      fontColor: "#FFFFFF",
      backgroundColor: "#000000",
      backgroundImgLink: null,
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
