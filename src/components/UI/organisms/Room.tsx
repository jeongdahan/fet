import React from "react";
import styled from "styled-components";
import { IRoom } from "src/core/models/room";
import { IUser } from "src/core/models/user";
import { IMessage } from "src/core/models/chatting";
import { RoomInputBox, ChattingProfile } from "src/components/UI/molecules";
import { Avatar } from "../atoms";

interface IRoomProps {
  formRef: React.MutableRefObject<HTMLFormElement>;
  data: IRoom;
  list: IMessage[];
  profile: IUser;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onKeyUp: (e: React.KeyboardEvent) => void;
  onTextareaClick: () => void;
}
const Room = ({
  formRef,
  data,
  list,
  profile,
  onSubmit,
  onKeyUp,
  onTextareaClick,
}: IRoomProps) => {
  return (
    <RoomStyle>
      <ContentsStyle>
        {data && (
          <HeaderStyle>
            <Avatar src={data.imageURL} />
            <InfoStyle>
              <TitleStyle>{data.name}</TitleStyle>
            </InfoStyle>
            <ParticipantsStyle>100 Participants</ParticipantsStyle>
          </HeaderStyle>
        )}

        {list.map((message) => (
          <ChattingProfile
            key={message.key}
            data={message}
            reverse={message.reverse}
          />
        ))}
      </ContentsStyle>
      <InputBoxStyle>
        <RoomInputBox
          formRef={formRef}
          data={profile}
          onSubmit={onSubmit}
          onKeyUp={onKeyUp}
          onTextareaClick={onTextareaClick}
        />
      </InputBoxStyle>
    </RoomStyle>
  );
};

const RoomStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentsStyle = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column-reverse;

  padding: 0.9325rem;

  overflow-y: scroll;
`;

const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  padding: 0.9325rem;

  background-color: ${(props) => props.theme.color.white_400};
`;

const InfoStyle = styled.div`
  flex-grow: 1;

  margin-left: 0.9325rem;

  overflow: hidden;
`;

const TitleStyle = styled.div`
  ${(props) => props.theme.typography.h6};
  color: ${(props) => props.theme.color.black_600};

  ${(props) => props.theme.ellipsis(1)};
`;

const ParticipantsStyle = styled.div`
  flex-basis: auto;
  flex-shrink: 0;

  ${(props) => props.theme.typography.display_2};
  color: ${(props) => props.theme.color.gray_600};
`;

const InputBoxStyle = styled.div`
  padding: 0.9325rem;

  background-color: ${(props) => props.theme.color.white_400};
`;

export default React.memo(Room);
