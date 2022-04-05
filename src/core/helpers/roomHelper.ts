import { firebase, database } from "src/core/config/firebase";
import { IRoom } from "src/core/models/room";
import { convertMessage } from "src/utiles";
import { timeForToday } from "src/utiles/dateUtil";

const createRoom = async (room: Pick<IRoom, "name" | "path" | "imageURL">) => {
  return new Promise<void>(async (resolve, reject) => {
    const { name, imageURL, path } = room;

    const roomRef = database.ref(`RoomList/${path}`);
    const roomKey = roomRef.push().key;

    const snapshot = await roomRef.once("value");
    try {
      if (!snapshot.hasChildren()) {
        await roomRef.set({
          uid: roomKey,
          imageURL: imageURL,
          name: name,
          path: path,
          //   lastMessage: lastMessage,
          timestamp: null,
          //   roomUsers: roomUsers,
        });

        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loadRoomList = async (): Promise<IRoom[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const snapshot = await database.ref("RoomList").once("value");
      const objectToArray = snapshot.val()
        ? Object.keys(snapshot.val()).map((v) => ({
            ...snapshot.val()[v],
            timestamp: timeForToday(snapshot.val()[v].timestamp),
          }))
        : [];
      resolve(objectToArray);
    } catch (error) {
      reject(error);
    }
  });
};

const loadRoomInfo = async (path: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const room = database.ref(`RoomList/${path}`);
      room.off();
      const snapshot = await room.once("value");
      resolve(snapshot.val());
    } catch (error) {
      reject(error);
    }
  });
};

const loadMessageList = (path: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      database.ref(`Messages/${path}`).on("value", (snapshot) => {
        const _snapshot = snapshot.val();

        if (!_snapshot) return resolve([]);

        const chats = Object.keys(_snapshot)
          .sort((prev, next) => {
            return _snapshot[next]?.timestamp - _snapshot[prev].timestamp;
          })
          .map((v) => {
            return {
              ..._snapshot[v],
              timestamp: timeForToday(_snapshot[v].timestamp),
            };
          });

        resolve(chats);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const sendMessage = (data: any) => {
  const { path, message, uid, name, imageURL } = data;

  return new Promise(async (resolve, reject) => {
    try {
      const _database = database.ref();
      let update: any = {};
      const key = _database.push().key;
      const timestamp = firebase.database.ServerValue.TIMESTAMP;

      //메세지  저장
      update[`Messages/${path}/${key}`] = {
        key: key,
        message: convertMessage(message),
        photoURL: imageURL,
        uid: uid,
        name: name,
        timestamp: timestamp,
      };

      _database.update(update);

      resolve({ path: path, key: key });
    } catch (error) {
      reject(error);
    }
  });
};

const updateRoomList = async (
  path: string,
  message: string,
  timestamp: object
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const roomListRef = await database.ref(`RoomList/${path}`);

      roomListRef.update({
        lastMessage: message,
        timestamp: timestamp,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const findMessageByKey = (path: string, key: string) => {
  return new Promise(async (resolve, reject) => {
    const messageRef = await database.ref(`Messages/${path}/${key}`);
    messageRef.off();
    const snapshot = await messageRef.once("value");
    const { message, timestamp } = snapshot.val();
    resolve({ path: path, message: message, timestamp });
  });
};

export {
  createRoom,
  loadRoomList,
  loadRoomInfo,
  loadMessageList,
  sendMessage,
  updateRoomList,
  findMessageByKey,
};
