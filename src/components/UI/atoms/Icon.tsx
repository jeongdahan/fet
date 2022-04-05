import React from "react";
import styeld from "styled-components";
import * as svg from "public/images/svg";

interface IIconProps {
  name: keyof typeof svg;
  className?: string;
  //   width?: string;
  //   height?: string;
  //   viewBox?: string;
  style?: React.CSSProperties;
}

const Icon = ({
  name,
  className,
  //   width,
  //   height,
  //   viewBox,
  style,
}: IIconProps) => {
  return (
    <IconStyle>
      {React.createElement(svg[name], {
        className: className,
        // width: width,
        // height: height,
        // viewBox: viewBox,
        style: style,
      })}
    </IconStyle>
  );
};

const IconStyle = styeld.div`
  svg {
    display: block;
  }
`;

export default React.memo(Icon);
