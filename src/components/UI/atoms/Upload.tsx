import React, { useRef } from "react";
import styled from "styled-components";
import { Avatar, Button, Icon } from "src/components/UI/atoms";

interface IUploadProps {
  children?: React.ReactNode;
  name?: string;
  defaultThumbnail?: string | null;
  thumbnail?: string | null;
  onThumbnail?: (thumbnail: string) => void;
  onChange?: (e: any) => void;
}

const Upload = ({
  children,
  name,
  defaultThumbnail,
  thumbnail,
  onThumbnail,
  onChange,
}: IUploadProps) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  // 타입스크립트
  return (
    <UploadStyle>
      <input
        type="file"
        name={name}
        accept="image/jpeg, image/png"
        ref={inputRef}
        hidden
        onChange={onChange}
        onClick={(e: any) => (e.target.value = "")}
      />
      {defaultThumbnail || thumbnail ? (
        <ThumbnailStyle onClick={() => inputRef.current.click()}>
          {thumbnail && (
            <ThumbnailCancelButtonStyle
              onClick={(e) => {
                e.stopPropagation();
                onThumbnail(null);
              }}
            >
              X
            </ThumbnailCancelButtonStyle>
          )}

          <Avatar src={thumbnail || defaultThumbnail} />
        </ThumbnailStyle>
      ) : (
        <Button
          type="button"
          icon={<Icon name="upload" />}
          onClick={() => inputRef.current.click()}
        >
          {children}
        </Button>
      )}
    </UploadStyle>
  );
};

const UploadStyle = styled.div`
  display: inline-block;
`;
const ThumbnailStyle = styled.div`
  position: relative;
`;

const ThumbnailCancelButtonStyle = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 0.625rem;
  height: 0.625rem;

  cursor: pointer;
`;

export default React.memo(Upload);
