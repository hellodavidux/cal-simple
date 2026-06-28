import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import type { ChatMessage, MessageFeedback } from "../../../types/askCal";
import { THINKING_DELAY_MS } from "../constants";
import { generateReply } from "../utils/generateReply";

type ChatAction =
  | { type: "append"; message: ChatMessage }
  | { type: "reset" };

function chatReducer(state: ChatMessage[], action: ChatAction): ChatMessage[] {
  switch (action.type) {
    case "append":
      return [...state, action.message];
    case "reset":
      return [];
    default:
      return state;
  }
}

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return { id: crypto.randomUUID(), role, content };
}

export function useAskCalChat() {
  const [messages, dispatch] = useReducer(chatReducer, []);
  const [isThinking, setIsThinking] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, MessageFeedback>>({});
  const [expanded, setExpanded] = useState(false);
  const replyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current !== null) {
        window.clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  const sendMessage = useCallback((content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isThinking) return;

    dispatch({ type: "append", message: createMessage("user", trimmed) });
    setIsThinking(true);

    replyTimeoutRef.current = window.setTimeout(() => {
      dispatch({
        type: "append",
        message: createMessage("assistant", generateReply(trimmed)),
      });
      setIsThinking(false);
      replyTimeoutRef.current = null;
    }, THINKING_DELAY_MS);
  }, [isThinking]);

  const setMessageFeedback = useCallback(
    (messageId: string, value: MessageFeedback) => {
      setFeedback((prev) => ({ ...prev, [messageId]: value }));
    },
    [],
  );

  const resetChat = useCallback(() => {
    if (replyTimeoutRef.current !== null) {
      window.clearTimeout(replyTimeoutRef.current);
      replyTimeoutRef.current = null;
    }
    dispatch({ type: "reset" });
    setIsThinking(false);
    setFeedback({});
    setExpanded(false);
  }, []);

  return {
    messages,
    isThinking,
    feedback,
    expanded,
    setExpanded,
    sendMessage,
    setMessageFeedback,
    resetChat,
  };
}
