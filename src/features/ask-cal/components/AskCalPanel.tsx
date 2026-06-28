import { useMemo } from "react";
import type { ChatMessage, MessageFeedback } from "../../../types/askCal";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { deriveChatTitle, detectIntent } from "../utils/detectIntent";
import { AskCalComposer } from "./AskCalComposer";
import { AskCalHeader } from "./AskCalHeader";
import { MessageBubble, ThinkingIndicator } from "./MessageBubble";
import { SuggestedPrompts } from "./SuggestedPrompts";

type AskCalPanelProps = {
  open: boolean;
  messages: ChatMessage[];
  isThinking: boolean;
  feedback: Record<string, MessageFeedback>;
  expanded: boolean;
  onMinimize: () => void;
  onClose: () => void;
  onToggleExpand: () => void;
  onSend: (message: string) => void;
  onFeedback: (messageId: string, value: MessageFeedback) => void;
  /** Controlled composer value — passed straight to AskCalComposer for Remotion / agent mode. */
  composerValue?: string;
  onComposerChange?: (v: string) => void;
};

export function AskCalPanel({
  open,
  messages,
  isThinking,
  feedback,
  expanded,
  onMinimize,
  onClose,
  onToggleExpand,
  onSend,
  onFeedback,
  composerValue,
  onComposerChange,
}: AskCalPanelProps) {
  const hasMessages = messages.length > 0;
  const firstUserMessage = messages.find((message) => message.role === "user")
    ?.content;

  const title = useMemo(() => {
    if (!firstUserMessage) return "New chat";
    return deriveChatTitle(detectIntent(firstUserMessage), firstUserMessage);
  }, [firstUserMessage]);

  const scrollEndRef = useAutoScroll([open, messages, isThinking]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Ask Cal"
      aria-modal="false"
      className={`fixed z-50 flex flex-col overflow-hidden rounded-xl border border-[#333] bg-[#141414] shadow-2xl transition-all ${
        expanded
          ? "bottom-4 right-4 h-[calc(100vh-2rem)] w-[min(520px,calc(100vw-2rem))]"
          : "bottom-20 right-5 h-[min(520px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2.5rem))]"
      }`}
    >
      <AskCalHeader
        title={title}
        expanded={expanded}
        onMinimize={onMinimize}
        onToggleExpand={onToggleExpand}
        onClose={onClose}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
        {!hasMessages && !isThinking && (
          <SuggestedPrompts onSelect={onSend} disabled={isThinking} />
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            feedback={feedback[message.id] ?? null}
            onFeedback={(value) => onFeedback(message.id, value)}
          />
        ))}

        {isThinking && <ThinkingIndicator />}
        <div ref={scrollEndRef} />
      </div>

      <AskCalComposer
        hasMessages={hasMessages}
        isThinking={isThinking}
        onSend={onSend}
        autoFocus={open && !hasMessages}
        value={composerValue}
        onValueChange={onComposerChange}
      />
    </div>
  );
}
