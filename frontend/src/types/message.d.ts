export type Message = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};
