import React from "react";
import styled from "styled-components";
import { IRoom } from "src/core/models/room";
import { Avatar } from "src/components/UI/atoms";

interface IRoomItemProps {
  data: IRoom;
  onEntranceAtRoom?: (path: string) => void;
}
const RoomItem = ({ data, onEntranceAtRoom }: IRoomItemProps) => {
  const { name, path, imageURL, lastMessage, timestamp } = data;
  return (
    <RoomItemStyle onClick={() => onEntranceAtRoom(path)}>
      <Avatar src={imageURL} />
      <InfoStyle>
        <NameStyle>{name}</NameStyle>
        <LastMessageStyle>{lastMessage}</LastMessageStyle>
      </InfoStyle>
      <UpdateAtStyle>{timestamp} </UpdateAtStyle>
    </RoomItemStyle>
  );
};

const RoomItemStyle = styled.div`
  display: flex;
  align-items: center;

  padding: 0.9325rem;
`;

const InfoStyle = styled.div`
  flex-grow: 1;

  margin-left: 0.9325rem;

  overflow: hidden;
`;

const NameStyle = styled.div`
  ${(props) => props.theme.typography.h6};
  color: ${(props) => props.theme.color.white_400};

  ${(props) => props.theme.ellipsis(1)};
`;

const LastMessageStyle = styled.div`
  ${(props) => props.theme.typography.display_2};
  color: ${(props) => props.theme.color.white_100};

  ${(props) => props.theme.ellipsis(1)};
`;

const UpdateAtStyle = styled.div`
  flex-basis: auto;
  flex-shrink: 0;

  ${(props) => props.theme.typography.display_2};
  color: ${(props) => props.theme.color.white_100};
`;

export default React.memo(RoomItem);
