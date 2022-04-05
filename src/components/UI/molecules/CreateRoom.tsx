import React from "react";
import styled from "styled-components";
import { Form, Input, Upload } from "src/components/UI/atoms";

interface ICreateRoomProps {
  formRef: React.MutableRefObject<HTMLFormElement>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  thumbnail: null | string;
  onThumbnail: (thumbnail: string) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const CreateRoom = ({
  formRef,
  onSubmit,
  thumbnail,
  onThumbnail,
  onChange,
}: ICreateRoomProps) => {
  return (
    <Form formRef={formRef} onSubmit={onSubmit}>
      <CreateRoomEditStyle>
        <Form.Item name="name">
          <Input
            type="text"
            placeholder="Please enter the room name"
            bordered
          />
        </Form.Item>
        <Form.Item name="path">
          <Input type="text" placeholder="Please enter the path" bordered />
        </Form.Item>
        <Form.Item name="image">
          <Upload
            thumbnail={thumbnail}
            onThumbnail={onThumbnail}
            onChange={onChange}
          >
            Upload
          </Upload>
        </Form.Item>
      </CreateRoomEditStyle>
    </Form>
  );
};

const CreateRoomEditStyle = styled.div``;

export default React.memo(CreateRoom);
