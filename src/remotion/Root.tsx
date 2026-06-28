import { Composition } from "remotion";
import type { AskCalScriptParams } from "./compositions/AskCalComposition";
import { AskCalComposition } from "./compositions/AskCalComposition";

const DEFAULT_PROPS: AskCalScriptParams = {
  query: "What bookings do I have this week?",
  panelOpenFrame: 60,
  typingStartFrame: 90,
  typingDurationFrames: 60,
  sendFrame: 165,
  replyFrame: 210,
};

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="AskCalDemo"
        component={AskCalComposition}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
        defaultProps={DEFAULT_PROPS}
      />
    </>
  );
}
