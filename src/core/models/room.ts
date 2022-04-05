// room info

export interface IRoom {
  uid: string;
  imageURL: string;
  name: string;
  path: string;
  lastMessage?: string;
  timestamp?: string;
  roomUsers?: string[];
}
