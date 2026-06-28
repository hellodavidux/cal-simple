import type { ChatMessage, MessageFeedback } from "../../../types/askCal";
import { MessageActions } from "./MessageActions";
import { RichText } from "./RichText";

type MessageBubbleProps = {
  message: ChatMessage;
  feedback: MessageFeedback | null;
  onFeedback: (value: MessageFeedback) => void;
};

export function MessageBubble({
  message,
  feedback,
  onFeedback,
}: MessageBubbleProps) {
  if (message.role === "user") {
    return (
      <div className="mb-4 flex justify-end">
        <div className="max-w-[85%] rounded-xl bg-[#2a2a2a] px-3.5 py-2.5 text-sm leading-relaxed text-white">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="group relative mb-8 max-w-[95%]">
      <div className="text-sm leading-relaxed text-cal-muted">
        <RichText content={message.content} />
      </div>
      <MessageActions
        content={message.content}
        feedback={feedback}
        onFeedback={onFeedback}
      />
    </div>
  );
}

export function ThinkingIndicator() {
  return (
    <div className="mb-4 text-sm text-cal-subtle">
      <span className="animate-pulse">Thinking…</span>
    </div>
  );
}
