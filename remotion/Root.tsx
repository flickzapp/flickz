import { Composition } from "remotion";
import RenderableVideo from "./RenderHelper";
import { COMP_NAME } from "../lib/constants";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={COMP_NAME}
      component={RenderableVideo}
      durationInFrames={300}
      fps={60}
      width={1920}
      height={1080}
      defaultProps={{
        frames: [
          {
            text: "Hello World",
            duration: 2,
            id: "1",
            index: 0,
            entryAnimate: "none",
          },
        ],
      }}
      calculateMetadata={async (props) => {
        console.log(props);
        return {
          fps: 60,
          width: 1920,
          height: 1080,
          durationInFrames: 300,
        };
      }}
    />
  );
};
