import "./index.css";
import { Composition } from "remotion";
import { z } from "zod";
import { MyComposition, PropsSchema } from "./Composition";

export const RemotionRoot: React.FC = () => {
  const defaultProps = {
    scenes: [
      {
        quote: "Loneliness isn't always being alone.",
        duration: 3,
        animation: "fade",
        backgroundColor: "#0d0d1a",
      },
    ],
  };
  return (
    <>
      <Composition<typeof PropsSchema, z.infer<typeof PropsSchema>>
        id="MyComp"
        component={MyComposition}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
        durationInFrames={
          defaultProps.scenes.reduce((acc, scene) => acc + scene.duration, 0) *
          30
        }
        calculateMetadata={({ props }) => {
          return {
            durationInFrames:
              props.scenes.reduce((acc, scene) => acc + scene.duration, 0) * 30,
          };
        }}
      />
    </>
  );
};
