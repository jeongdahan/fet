import React from "react";
import styled from "styled-components";
import { IUser } from "src/core/models/user";
import { Avatar, Badge, Icon } from "src/components/UI/atoms";

interface IProfileProps {
  data: IUser;
}

const LEVEL: any = {
  0: "관리자",
  1: "인턴",
  2: "주니어",
  3: "시니어",
};

const Profile = ({ data }: IProfileProps) => {
  return (
    <ProfileStyle>
      <Avatar src={data.imageURL || "https:joeschmoe.io/api/v1/random"} />

      <InfoStyle>
        <NameStyle>{data.name}</NameStyle>
        <LevelStyle>Level: {LEVEL[data.level]}</LevelStyle>
      </InfoStyle>

      <NoticeStyle>
        <Badge dot>
          {/* <Button
             type="button"
             bg="transparent"
             color="rgba(255,255,255,0.8)"
             icon={<Icon name="bell" />}
           /> */}
          <Icon name="bell" />
        </Badge>
      </NoticeStyle>
    </ProfileStyle>
  );
};

const ProfileStyle = styled.div`
  display: flex;
  align-items: center;

  padding: 0.9325rem;
`;

const InfoStyle = styled.div`
  flex-grow: 1;

  margin-left: 0.9325rem;
`;

const NameStyle = styled.div`
  ${(props) => props.theme.typography.h6};
  color: ${(props) => props.theme.color.white_400};

  ${(props) => props.theme.ellipsis(1)};
`;

const LevelStyle = styled.div`
  ${(props) => props.theme.typography.display_2};
  color: ${(props) => props.theme.color.white_100};

  ${(props) => props.theme.ellipsis(1)};
`;

const NoticeStyle = styled.div`
  flex-basis: auto;
  flex-shrink: 0;
`;

export default React.memo(Profile);
