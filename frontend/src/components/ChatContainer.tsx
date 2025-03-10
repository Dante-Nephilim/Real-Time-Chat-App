import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

export default function ChatContainer() {
  const { messages, selectedUser, isMessagesLoading, getMessages } = useChatStore();

  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser?._id);
  }, [getMessages, selectedUser]);

  if (true) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>Messages...</p>
      <MessageInput />
    </div>
  );
}
