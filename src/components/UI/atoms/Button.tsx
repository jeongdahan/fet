import React from "react";
import styled from "styled-components";

interface IButtonProps extends IButtonStyleProps {
  children?: React.ReactNode;
  className?: string;
  type: "button" | "reset" | "submit" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface IButtonStyleProps {
  icon?: React.ReactNode;
  bg?: string;
  color?: string;
  reverse?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  className,
  type,
  onClick,
  icon,
  reverse,
  bordered,
  disabled,
  loading,
}: IButtonProps) => {
  return (
    <ButtonStyle
      className={className}
      icon={icon}
      reverse={reverse}
      bordered={bordered}
      disabled={disabled}
      loading={loading}
    >
      <button
        type={type}
        onClick={(e) => disabled || loading || (onClick && onClick(e))}
      >
        {!loading && icon && (
          <IconStyle reverse={reverse} disabled={disabled}>
            {icon}
          </IconStyle>
        )}
        <span>{loading ? "...Loading" : children}</span>
      </button>
    </ButtonStyle>
  );
};

const ButtonStyle = styled.div<IButtonStyleProps>`
  background-color: ${(props) =>
    props.disabled
      ? props.theme.color.gray_400
      : props.reverse
      ? "transparent"
      : "lightgray"};

  opacity: ${(props) => (props.loading ? "0.5" : "1")};

  button {
    display: flex;
    align-items: center;

    width: 100%;
    margin: 0;
    padding: 0.25rem 0.625rem;

    ${(props) => props.theme.typography.display_2};
    color: ${(props) =>
      props.disabled
        ? props.theme.color.black_600
        : props.reverse
        ? "lightgray"
        : "#000"};

    background-color: transparent;
    border: 1px solid
      ${(props) => (props.disabled ? props.theme.color.gray_400 : "lightgray")};

    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

    span {
      display: inline-block;

      ${(props) => props.icon && "margin-left: 0.4375rem"};

      font-size: inherit;
    }
  }
`;

const IconStyle = styled.div<IButtonStyleProps>`
  svg {
    fill: ${(props) => (props.disabled ? props.theme.color.black_600 : "#000")};

`;

export default React.memo(Button);
