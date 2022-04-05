import React from "react";
import styeld from "styled-components";

interface IBadgeProps extends IBadgeStyleProps {
  children?: React.ReactNode;
}

interface IBadgeStyleProps {
  dot?: boolean;
}

const Badge = ({ children, dot }: IBadgeProps) => {
  return <BadgeStyle dot={dot}>{children}</BadgeStyle>;
};

const BadgeStyle = styeld.div<IBadgeStyleProps>`
  position: relative;
  
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    display: block;

    width: 5px;
    height: 5px;

    background-color: ${(props) => props.theme.color.red_400};
    border-radius: 100%;

    transform: translate(50%, -50%)
  }
`;

export default React.memo(Badge);
