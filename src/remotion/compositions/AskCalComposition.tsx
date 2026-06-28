import { useCurrentFrame, useVideoConfig } from "remotion";
import type { ChatMessage } from "../../types/askCal";
import { AskCalFab } from "../../features/ask-cal/components/AskCalFab";
import { AskCalPanel } from "../../features/ask-cal/components/AskCalPanel";
import { generateReply } from "../../features/ask-cal/utils/generateReply";
import { VideoShell } from "../shell/VideoShell";

// ─── Script params (overridable via Remotion inputProps / Claude agent JSON) ───
export type AskCalScriptParams = {
  /** The query that gets typed and sent. */
  query?: string;
  /** Frame at which the chat panel opens. Default: 60 (2 s at 30 fps). */
  panelOpenFrame?: number;
  /** Frame at which typing starts inside the composer. Default: 90. */
  typingStartFrame?: number;
  /** Duration in frames for the full typing animation. Default: 60. */
  typingDurationFrames?: number;
  /** Frame at which the user message is sent. Default: 165. */
  sendFrame?: number;
  /** Frame at which the assistant reply appears. Default: 210. */
  replyFrame?: number;
};

const DEFAULTS: Required<AskCalScriptParams> = {
  query: "What bookings do I have this week?",
  panelOpenFrame: 60,
  typingStartFrame: 90,
  typingDurationFrames: 60,
  sendFrame: 165,
  replyFrame: 210,
};

// Pre-generate the reply text so it's stable across frames.
const REPLY_CACHE: Record<string, string> = {};
function getCachedReply(query: string): string {
  if (!REPLY_CACHE[query]) REPLY_CACHE[query] = generateReply(query);
  return REPLY_CACHE[query];
}

export function AskCalComposition(inputProps: AskCalScriptParams) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const {
    query,
    panelOpenFrame,
    typingStartFrame,
    typingDurationFrames,
    sendFrame,
    replyFrame,
  } = { ...DEFAULTS, ...inputProps };

  // ── Panel visibility ──────────────────────────────────────────────────────
  const panelOpen = frame >= panelOpenFrame;
  const isSent = frame >= sendFrame;
  const isThinking = isSent && frame < replyFrame;
  const hasReply = frame >= replyFrame;

  // ── Typing simulation ─────────────────────────────────────────────────────
  const typedChars = panelOpen && !isSent
    ? Math.min(
        query.length,
        Math.floor(
          Math.max(0, frame - typingStartFrame) *
            query.length /
            typingDurationFrames,
        ),
      )
    : 0;

  // Composer shows typed text until send, then clears.
  const composerValue = isSent ? "" : query.slice(0, typedChars);

  // ── Messages array ────────────────────────────────────────────────────────
  const messages: ChatMessage[] = isSent
    ? [
        { id: "user-1", role: "user", content: query },
        ...(hasReply
          ? [
              {
                id: "assistant-1",
                role: "assistant" as const,
                content: getCachedReply(query),
              },
            ]
          : []),
      ]
    : [];

  // ── FAB pulse highlight on frame 0-panelOpenFrame ────────────────────────
  const fabHighlight =
    !panelOpen &&
    Math.floor(frame / Math.round(fps * 0.5)) % 2 === 0;

  const noop = () => {};

  return (
    <VideoShell>
      {/* FAB — visible until panel opens */}
      {!panelOpen && (
        <div
          style={{
            transition: "none",
            filter: fabHighlight ? "drop-shadow(0 0 8px rgba(255,255,255,0.25))" : "none",
          }}
        >
          <AskCalFab onClick={noop} />
        </div>
      )}

      {/* Panel — driven entirely by frame-computed props */}
      <AskCalPanel
        open={panelOpen}
        messages={messages}
        isThinking={isThinking}
        feedback={{}}
        expanded={false}
        onMinimize={noop}
        onClose={noop}
        onToggleExpand={noop}
        onSend={noop}
        onFeedback={noop}
        composerValue={composerValue}
        onComposerChange={noop}
      />
    </VideoShell>
  );
}
