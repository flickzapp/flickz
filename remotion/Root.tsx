import { Composition } from "remotion";
import RenderableVideo from "./RenderHelper";
import { COMP_NAME } from "../lib/constants";
import { defaultMyCompProps } from "../types/lambda";
import { getDimensionsForAspectRatio } from "../lib/aspect-ratio";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={COMP_NAME}
      component={RenderableVideo}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={defaultMyCompProps}
      calculateMetadata={async ({ props }) => {
        const durationInFrames =
          props.frames.reduce((acc, cur) => acc + cur.duration, 0) * 30;
        const { width, height } = getDimensionsForAspectRatio(
          props.aspectRatio
        );
        return {
          fps: 30,
          width: width,
          height: height,
          durationInFrames,
        };
      }}
    />
  );
};
