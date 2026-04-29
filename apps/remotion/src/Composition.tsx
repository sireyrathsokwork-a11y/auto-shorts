import { AbsoluteFill } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { z } from "zod";

export const SceneSchema = z.object({
  quote: z.string(),
  duration: z.number(),
  animation: z.string(),
  backgroundColor: z.string(),
});

export const PropsSchema = z.object({
  scenes: z.array(SceneSchema),
});

export type Props = z.infer<typeof PropsSchema>;

export const MyComposition = ({ scenes }: Props) => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {scenes.map((scene, i) => (
          <>
            <TransitionSeries.Sequence durationInFrames={scene.duration * 30}>
              <AbsoluteFill
                style={{
                  backgroundColor: scene.backgroundColor,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{ color: "white", fontSize: 48, textAlign: "center" }}
                >
                  {scene.quote}
                </h1>
              </AbsoluteFill>
            </TransitionSeries.Sequence>

            {i < scenes.length - 1 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 20 })}
              />
            )}
          </>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
