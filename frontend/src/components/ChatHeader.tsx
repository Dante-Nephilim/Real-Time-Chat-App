import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser, onlineUsers } = useChatStore();

  if (!selectedUser) return null;
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "vite.svg"} alt={selectedUser.fullName} />
            </div>
          </div>
          {/* UserInfo */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">{onlineUsers.includes(selectedUser) ? "Online" : "Offline"}</p>
          </div>
        </div>
        {/* Close Button */}
        <button onClick={() => setSelectedUser(null)} type="button">
          <X />
        </button>
      </div>
    </div>
  );
}
