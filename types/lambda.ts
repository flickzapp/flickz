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
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  frames: [
    {
      text: "Hello World",
      duration: 2,
      id: "1",
      index: 0,
      entryAnimate: "none",
    },
  ],
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
