import { useCallback, useState } from "react";
import { AskCalFab } from "./components/AskCalFab";
import { AskCalPanel } from "./components/AskCalPanel";
import { useAskCalChat } from "./hooks/useAskCalChat";

export function AskCalWidget() {
  const [open, setOpen] = useState(false);
  const {
    messages,
    isThinking,
    feedback,
    expanded,
    setExpanded,
    sendMessage,
    setMessageFeedback,
    resetChat,
  } = useAskCalChat();

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleMinimize = useCallback(() => setOpen(false), []);

  const handleClose = useCallback(() => {
    setOpen(false);
    resetChat();
  }, [resetChat]);

  return (
    <>
      {!open && <AskCalFab onClick={handleOpen} />}
      <AskCalPanel
        open={open}
        messages={messages}
        isThinking={isThinking}
        feedback={feedback}
        expanded={expanded}
        onMinimize={handleMinimize}
        onClose={handleClose}
        onToggleExpand={() => setExpanded((value) => !value)}
        onSend={sendMessage}
        onFeedback={setMessageFeedback}
      />
    </>
  );
}
