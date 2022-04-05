import React, { Fragment } from "react";
import { IRoom } from "src/core/models/room";
import { RoomItem } from "src/components/UI/molecules";

interface IRoomListProps {
  list: [] | IRoom[];
  onEntranceAtRoom: (path: string) => void;
}

const RoomList = ({ list, onEntranceAtRoom }: IRoomListProps) => {
  return (
    <Fragment>
      {list.map((room) => (
        <RoomItem
          key={room.uid}
          data={room}
          onEntranceAtRoom={onEntranceAtRoom}
        />
      ))}
    </Fragment>
  );
};

export default React.memo(RoomList);
