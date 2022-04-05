import React, { useState, useEffect, createContext } from "react";
import { IRoom } from "src/core/models/room";
import {
  createRoom,
  loadRoomList,
  loadRoomInfo,
  loadMessageList,
  sendMessage,
  updateRoomList,
  findMessageByKey,
} from "src/core/helpers/roomHelper";

interface IRoomProviderProps {
  children?: React.ReactNode;
}

interface IRoomContext {
  roomList: IRoom[];
  createRoom: (
    room: Pick<IRoom, "name" | "path" | "imageURL">
  ) => Promise<void | unknown>;
  loadRoomInfo: (path: string) => Promise<any>;
  loadMessageList: (path: string) => Promise<any | unknown>;
  sendMessage: (data: any) => Promise<any>;
}

const RoomContext = createContext<IRoomContext | null>(null);

const RoomProvider = ({ children }: IRoomProviderProps) => {
  const [roomList, setRoomList] = useState([]);

  const value = {
    roomList: roomList,
    createRoom: async (room: Pick<IRoom, "name" | "path" | "imageURL">) => {
      try {
        await createRoom(room);
      } catch (error) {
        // Toast Error
        console.error("Error Provider: ", error);
      }
    },
    loadRoomInfo: async (path: string) => {
      try {
        const room = await loadRoomInfo(path);
        return room;
      } catch (error) {
        // Toast Error
        console.error("Error Provider: ", error);
      }
    },
    loadMessageList: async (path: string) => {
      try {
        const messageList = await loadMessageList(path);
        return messageList;
      } catch (error) {
        // Toast Error
        console.error("Error Provider: ", error);
      }
    },
    sendMessage: async (data: any) => {
      try {
        const response: any = await sendMessage(data);
        const result = await findMessageByKey(response.path, response.key);
        const { path, message, timestamp }: any = result;
        await updateRoomList(path, message, timestamp);
      } catch (error) {
        // Toast Error
        console.error("Error Provider: ", error);
      }
    },
  };

  useEffect(() => {
    const fetch = async () => {
      const roomList = await loadRoomList();
      setRoomList(roomList);
    };
    fetch();

    return () => setRoomList([]);
  }, []);

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export { RoomProvider, RoomContext };
