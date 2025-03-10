export function formatMessageTime(time: string) {
  return new Date(time).toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
