import React from "react";
import styled from "styled-components";
import { IUser } from "src/core/models/user";
import { Form, Input, Upload } from "src/components/UI/atoms";

interface IProfileEditProps {
  formRef: React.MutableRefObject<HTMLFormElement>;
  data: IUser;
  thumbnail: null | string;
  onThumbnail: (thumbnail: string) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ProfileEdit = ({
  formRef,
  data,
  thumbnail,
  onThumbnail,
  onChange,
  onSubmit,
}: IProfileEditProps) => {
  return (
    <Form formRef={formRef} onSubmit={onSubmit}>
      <ProfileEditStyle>
        <Form.Item name="image">
          <Upload
            defaultThumbnail={data.imageURL}
            thumbnail={thumbnail}
            onThumbnail={onThumbnail}
            onChange={onChange}
          />
        </Form.Item>

        <InfoStyle>
          <NameStyle>
            <Form.Item name="name">
              <Input
                type="text"
                defaultValue={data.name}
                placeholder="Please enter the name you want to change"
              />
            </Form.Item>
          </NameStyle>
          <LevelStyle>Level: {data.level}</LevelStyle>
        </InfoStyle>
      </ProfileEditStyle>
    </Form>
  );
};

const ProfileEditStyle = styled.div`
  display: flex;
  align-items: center;
`;

const InfoStyle = styled.div`
  flex-grow: 1;

  margin-left: 0.9325rem;
`;

const NameStyle = styled.div`
  ${(props) => props.theme.typography.h6};
  color: ${(props) => props.theme.color.black_600};

  ${(props) => props.theme.ellipsis(1)};
`;

const LevelStyle = styled.div`
  ${(props) => props.theme.typography.display_2};
  color: ${(props) => props.theme.color.gray_600};

  ${(props) => props.theme.ellipsis(1)};
`;

export default React.memo(ProfileEdit);
