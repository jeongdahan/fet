// message

export interface IMessage {
  key?: string;
  path: string;
  message: string;
  name: string;
  uid: string;
  imageURL: string;
  timestamp?: object;
  reverse?: boolean;
}
