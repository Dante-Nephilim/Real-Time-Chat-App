import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SideBarSkeleton from "./skeletons/SideBarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Sidebar() {
  const { users, selectedUser, setSelectedUser, getUsers, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineUsersOnly, setShowOnlineUsersOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const filteredUsers = showOnlineUsersOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  if (isUsersLoading) {
    return <SideBarSkeleton />;
  }
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex item-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contact</span>
        </div>
        {/* TODO Online Users filter Toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineUsersOnly}
              onChange={(e) => setShowOnlineUsersOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show Online Users Only</span>
          </label>
          <span className="text-sm text-zinc-500">({onlineUsers.length} Online)</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            type="button"
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
                    w-full p-3 flex items-center gap-3
                    hover:bg-base-300 transition-colors
                    ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                    `}
          >
            <div className="relative mx-auto lg-mx-0">
              <img
                src={user.profilePic || "vite.svg"}
                alt={user.fullName}
                className="size-12 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-300
                                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>
            {/* User Info -- only visible on larger screens */}
            <div className="hidden lg:block text-left min-2-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">{onlineUsers.includes(user._id) ? "Online" : "Offline"}</div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && <div className="text-center text-zinc-500 py-4">No users found</div>}
      </div>
    </aside>
  );
}
