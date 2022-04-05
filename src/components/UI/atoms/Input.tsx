import React from "react";
import styled from "styled-components";

interface IInputProps extends IInputStyle {
  type: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
}

interface IInputStyle {
  bordered?: boolean;
}

const Input = ({
  type = "text",
  name,
  defaultValue,
  placeholder = "Insert Text",
  bordered = false,
}: IInputProps) => {
  return (
    <InputStyle bordered={bordered}>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </InputStyle>
  );
};

const InputStyle = styled.div<IInputStyle>`
  ${(props) =>
    props.bordered && `border-bottom: 1px solid ${props.theme.color.gray_400}`};

  input {
    width: 100%;
    padding-bottom: 0.3125rem;

    ${(props) => props.theme.typography.display_1};

    border: 0;
  }
`;

export default React.memo(Input);
