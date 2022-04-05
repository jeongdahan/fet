import React from "react";
import { IUser } from "src/core/models/user";
import styled from "styled-components";

interface ITextarea {
  autoFocus?: boolean;
  name?: string;
  data: IUser;
  placeholder?: any;
  onKeyUp?: (e: React.KeyboardEvent) => void;
  onClick: () => void;
}
const Textarea = ({
  autoFocus,
  name,
  data,
  placeholder,
  onKeyUp,
  onClick,
}: ITextarea) => {
  return (
    <TextareaStyle>
      <textarea
        readOnly={!data}
        autoFocus={autoFocus}
        name={name}
        placeholder={placeholder}
        onKeyUp={onKeyUp}
        onClick={() => !data && onClick()}
      ></textarea>
    </TextareaStyle>
  );
};

const TextareaStyle = styled.div`
  textarea {
    width: 100%;

    ${(props) => props.theme.typography.display_1};

    background-color: transparent;
    border: 0;

    resize: none;

    &:focus {
      outline: none;
    }
  }
`;

export default React.memo(Textarea);
