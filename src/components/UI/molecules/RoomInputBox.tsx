import React from "react";
import styled from "styled-components";
import { IUser } from "src/core/models/user";
import { Button, Textarea, Icon, Form } from "src/components/UI/atoms";

interface IRoomInputBoxProps {
  formRef: React.MutableRefObject<HTMLFormElement>;
  data: IUser;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onKeyUp: (e: React.KeyboardEvent) => void;
  onTextareaClick: () => void;
}
const RoomInputBox = ({
  formRef,
  data,
  onSubmit,
  onKeyUp,
  onTextareaClick,
}: IRoomInputBoxProps) => {
  return (
    <Form formRef={formRef} onSubmit={onSubmit}>
      <RoomInputBoxStyle>
        <TextareaStyle>
          <Form.Item name="message">
            <Textarea
              autoFocus
              data={data}
              placeholder="Please enter a text"
              onKeyUp={onKeyUp}
              onClick={onTextareaClick}
            />
          </Form.Item>
        </TextareaStyle>

        <ButtonWrapStyle>
          <Button
            type="button"
            icon={<Icon name="upload" />}
            className="button upload"
            onClick={onTextareaClick}
          />
          <Button
            type="submit"
            icon={<Icon name="send" />}
            className="button send"
            onClick={onTextareaClick}
          />
        </ButtonWrapStyle>
      </RoomInputBoxStyle>
    </Form>
  );
};

const RoomInputBoxStyle = styled.div`
  display: flex;
  align-items: center;
`;

const TextareaStyle = styled.div`
  flex-grow: 1;
`;

const ButtonWrapStyle = styled.div`
  .button {
    display: inline-block;
  }

  .upload {
    background-color: transparent;

    button {
      border-color: transparent;
      svg {
        fill: ${(props) => props.theme.color.gray_600};
      }
    }
  }

  .send {
    background-color: transparent;

    button {
      border-color: transparent;
      svg {
        fill: ${(props) => props.theme.color.blue_200};
      }
    }
  }
`;

export default React.memo(RoomInputBox);
