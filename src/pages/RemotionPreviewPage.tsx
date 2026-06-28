import { Player } from "@remotion/player";
import type { AskCalScriptParams } from "../remotion/compositions/AskCalComposition";
import { AskCalComposition } from "../remotion/compositions/AskCalComposition";
import { VideoShell } from "../remotion/shell/VideoShell";

const DEFAULT_PROPS: AskCalScriptParams = {
  query: "What bookings do I have this week?",
  panelOpenFrame: 60,
  typingStartFrame: 90,
  typingDurationFrames: 60,
  sendFrame: 165,
  replyFrame: 210,
};

/**
 * Live preview of the Remotion composition — runs inside the Vite dev server
 * so all Tailwind v4 styles work without any pre-compilation step.
 *
 * Open at: http://localhost:5173/remotion-preview
 *
 * The Claude agent can POST JSON to update props and trigger re-renders.
 */
export function RemotionPreviewPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#080808] p-8">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-white">Ask Cal — Remotion Preview</span>
        <span className="rounded-full bg-[#1a1a1a] px-2.5 py-0.5 text-xs text-[#737373]">
          10 s · 30 fps · 1280 × 720
        </span>
      </div>

      <Player
        component={AskCalComposition}
        durationInFrames={300}
        fps={30}
        compositionWidth={1280}
        compositionHeight={720}
        inputProps={DEFAULT_PROPS}
        style={{ width: "100%", maxWidth: 960, borderRadius: 12, overflow: "hidden" }}
        controls
        loop
      />

      <p className="max-w-xl text-center text-xs text-[#737373]">
        Pass <code className="rounded bg-[#1a1a1a] px-1 text-[#a3a3a3]">?query=…</code> in the URL or
        use <code className="rounded bg-[#1a1a1a] px-1 text-[#a3a3a3]">npm run remotion:render</code> to
        generate an MP4. The Claude agent can override{" "}
        <code className="rounded bg-[#1a1a1a] px-1 text-[#a3a3a3]">AskCalScriptParams</code> via{" "}
        <code className="rounded bg-[#1a1a1a] px-1 text-[#a3a3a3]">--props</code>.
      </p>
    </div>
  );
}

// Re-export VideoShell so the page can also be used standalone without the router.
export { VideoShell };
