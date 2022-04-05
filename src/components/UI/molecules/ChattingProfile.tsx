import React from "react";
import styled from "styled-components";
import { IUser } from "src/core/models/user";
import { Avatar } from "src/components/UI/atoms";

interface IChattingProfileProps extends IChattingProfileStyle {
  data: any;
}

interface IChattingProfileStyle {
  reverse?: boolean;
}

const ChattingProfile = ({ data, reverse }: IChattingProfileProps) => {
  return (
    <ChattingProfileStyle reverse={reverse}>
      <Avatar src={data.photoURL} />
      <InfoStyle reverse={reverse}>
        <WrapStyle reverse={reverse}>
          <NameStyle>{data.name}</NameStyle>
          <UpdateAtStyle>{data.timestamp}</UpdateAtStyle>
        </WrapStyle>
        <MessageStyle reverse={reverse}>{data.message}</MessageStyle>
      </InfoStyle>
    </ChattingProfileStyle>
  );
};

const ChattingProfileStyle = styled.div<IChattingProfileStyle>`
  display: flex;
  ${(props) => props.reverse && "flex-direction: row-reverse"};

  padding: 0.9325rem;
`;

const InfoStyle = styled.div<IChattingProfileStyle>`
  ${(props) =>
    props.reverse ? "margin-right: 0.9325rem" : "margin-left: 0.9325rem"};

  overflow: hidden;
`;

const WrapStyle = styled.div<IChattingProfileStyle>`
  display: flex;
  align-items: center;

  ${(props) => props.reverse && "justify-content: end"};
`;

const NameStyle = styled.div`
  // max-width: 50%;

  ${(props) => props.theme.typography.h6};
  color: ${(props) => props.theme.color.black_600};

  // ${(props) => props.theme.ellipsis(1)};
`;

const UpdateAtStyle = styled.div`
  margin-left: 0.3125rem;

  ${(props) => props.theme.typography.display_2};
  color: ${(props) => props.theme.color.white_100};
`;

const MessageStyle = styled.pre<IChattingProfileStyle>`
  display: inline-block;

  max-width: 100%;
  margin-top: 0.3125rem;
  padding: 0.9325rem;

  ${(props) => props.theme.typography.display_2};
  color: ${(props) =>
    props.reverse ? props.theme.color.black_600 : props.theme.color.white_400};
  background-color: ${(props) =>
    props.reverse ? props.theme.color.white_400 : props.theme.color.blue_300};
  border-radius: 0.625rem;
  ${(props) =>
    props.reverse ? "border-top-right-radius: 0" : "border-top-left-radius: 0"};

  overflow: auto;
  white-space: pre-wrap;
`;

export default React.memo(ChattingProfile);
