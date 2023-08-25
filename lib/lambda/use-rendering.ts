import { z } from "zod";
import { useCallback, useMemo, useState } from "react";
import { getProgress, renderVideo } from "@/lib/lambda/api";
import { CompositionProps } from "@/types/lambda";

export type State =
  | {
      status: "init";
    }
  | {
      status: "invoking";
    }
  | {
      renderId: string;
      bucketName: string;
      progress: number;
      status: "rendering";
    }
  | {
      renderId: string | null;
      status: "error";
      error: Error;
    }
  | {
      url: string;
      size: number;
      status: "done";
    };

const wait = async (milliSeconds: number) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliSeconds);
  });
};

export const useRendering = (
  id: string,
  inputProps: z.infer<typeof CompositionProps>
) => {
  const [state, setState] = useState<State>({
    status: "init",
  });

  const renderMedia = useCallback(async () => {
    setState({
      status: "invoking",
    });
    try {
      const { renderId, bucketName } = await renderVideo({ id, inputProps });
      console.log("Bucket:", bucketName);
      setState({
        status: "rendering",
        progress: 0,
        renderId: renderId,
        bucketName: bucketName,
      });

      let pending = true;

      while (pending) {
        const result = await getProgress({
          id: renderId,
          bucketName: bucketName,
        });
        switch (result.type) {
          case "error": {
            setState({
              status: "error",
              renderId: renderId,
              error: new Error(result.message),
            });
            console.log(result.message);
            pending = false;
            break;
          }
          case "done": {
            setState({
              size: result.size,
              url: result.url,
              status: "done",
            });
            pending = false;
            break;
          }
          case "progress": {
            setState({
              status: "rendering",
              bucketName: bucketName,
              progress: result.progress,
              renderId: renderId,
            });
            await wait(1000);
          }
        }
      }
    } catch (err) {
      console.log(err);
      setState({
        status: "error",
        error: err as Error,
        renderId: null,
      });
    }
  }, [id, inputProps]);

  const undo = useCallback(() => {
    setState({ status: "init" });
  }, []);

  return useMemo(() => {
    return {
      renderMedia,
      state,
      undo,
    };
  }, [renderMedia, state, undo]);
};
