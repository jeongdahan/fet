import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { firebase, database } from "src/core/config/firebase";
import { IRoom } from "src/core/models/room";
import { AuthContext } from "src/core/providers/AuthProvider";
import { RoomContext } from "src/core/providers/RoomProvider";
import { Room } from "src/components/UI/organisms";
import { loadMessageList } from "src/core/helpers/roomHelper";

const Path = () => {
  const router = useRouter();
  const { path } = router.query;
  const [messageList, setMessageList] = useState([]);
  const [roomInfo, setRoomInfo] = useState<IRoom | null>(null);
  const { profile } = useContext(AuthContext);
  const { loadRoomInfo, sendMessage } = useContext(RoomContext);
  const roomFormRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  const handleKeyUp = (e: React.KeyboardEvent) => {
    e.preventDefault();

    if (e.keyCode === 13 && !e.shiftKey) {
      roomFormRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profile) return;

    const message = e.currentTarget.message;
    const { uid, name, imageURL } = profile;

    if (message.value.replace(/\n|\r|\s*/g, "")) {
      await sendMessage({
        path: path,
        message: message.value,
        uid: uid,
        name: name,
        imageURL: imageURL,
      });

      message.value = "";
      message.focus();
    }
  };

  const handleTextareaClick = () => {
    return alert("로그인 후 사용해 주세요.");
  };

  useEffect(() => {
    if (path && typeof path === "string") {
      const fetch = async () => {
        const room = await loadRoomInfo(path);
        setRoomInfo(room);

        const messageRef = database.ref(`Messages/${path}`);
        messageRef.off();
        messageRef.limitToLast(1).on("child_added", async () => {
          const messageList = await loadMessageList(path);
          setMessageList(messageList);
        });
      };

      fetch();
    }
  }, [path]);

  return (
    <Room
      formRef={roomFormRef}
      data={roomInfo}
      list={messageList}
      profile={profile}
      onSubmit={handleSubmit}
      onKeyUp={handleKeyUp}
      onTextareaClick={handleTextareaClick}
    />
  );
};

export default Path;
