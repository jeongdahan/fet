import React from "react";
import styled from "styled-components";

interface IAvatarProps extends IAvatarStyleProps {
  src: string;
}

interface IAvatarStyleProps {
  shape?: string;
}

const Avatar = ({ shape = "circle", src }: IAvatarProps) => {
  return (
    <AvatarStyle shape={shape}>
      <img src={src} />
    </AvatarStyle>
  );
};

const AvatarStyle = styled.div<IAvatarStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-basis: 4.6875rem;
  flex-shrink: 0;
  width: 4.6875rem;
  height: 4.6875rem;

  background-color: ${(props) => props.theme.color.white_600};
  ${(props) => (props.shape === "circle" ? "border-radius: 100%" : "")};

  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default React.memo(Avatar);
