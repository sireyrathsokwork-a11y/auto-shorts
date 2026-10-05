import { AbsoluteFill, interpolate, useVideoConfig } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Audio } from "@remotion/media";

import { z } from "zod";

export const SceneSchema = z.object({
  quote: z.string(),
  duration: z.number(),
  animation: z.string(),
  backgroundColor: z.string(),
});

export const PropsSchema = z.object({
  scenes: z.array(SceneSchema),
  musicUrl: z.string().optional(),
});

export type Props = z.infer<typeof PropsSchema>;

const MUSIC_VOLUME = 0.3;
const FADE_FRAMES = 30;

export const MyComposition = ({ scenes, musicUrl }: Props) => {
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill>
      {musicUrl && (
        <Audio
          src={musicUrl}
          loop
          volume={(f) =>
            interpolate(
              f,
              [0, FADE_FRAMES, durationInFrames - FADE_FRAMES, durationInFrames],
              [0, MUSIC_VOLUME, MUSIC_VOLUME, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          }
        />
      )}
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
