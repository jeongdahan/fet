import React from "react";
import styled from "styled-components";
import { IUser } from "src/core/models/user";
import { Button, Icon } from "src/components/UI/atoms";

interface INavProps {
  data: IUser;
  onHome: () => void;
  onSetting: () => void;
  onTutorial: () => void;
  onSignOut: () => void;
  onCreateRoom: () => void;
}

const Nav = ({
  data,
  onHome,
  onSetting,
  onTutorial,
  onSignOut,
  onCreateRoom,
}: INavProps) => {
  return (
    <NavStyle>
      <Button
        type="button"
        className="button"
        icon={<Icon name="home" />}
        onClick={onHome}
      />

      {data && (
        <Button
          type="button"
          className="button"
          icon={<Icon name="setting" />}
          onClick={onSetting}
        />
      )}

      {/* 도움말로 수정 될 여지가 있음 */}
      {/* 탭 형태로 하나는 코드 삽입, 하나는 계급 표현 */}

      <Button
        type="button"
        className="button"
        icon={<Icon name="feedback" />}
        onClick={onTutorial}
      />
      {data && (
        <Button
          type="button"
          className="button"
          icon={<Icon name="sign_out" />}
          onClick={onSignOut}
        />
      )}

      {data?.level === 0 && (
        <Button
          type="button"
          className="button"
          icon={<Icon name="add_room" />}
          onClick={onCreateRoom}
        />
      )}
    </NavStyle>
  );
};

const NavStyle = styled.div`
  display: flex;
  justify-content: space-around;

  padding: 0.9325rem;

  .button {
    background-color: transparent;

    button {
      border-color: transparent;

      svg {
        fill: ${(props) => props.theme.color.white_400};
      }
    }
  }
`;

export default React.memo(Nav);
