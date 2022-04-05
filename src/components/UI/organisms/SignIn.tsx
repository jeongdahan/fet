import React from "react";
import styled from "styled-components";
import { Button, Icon } from "src/components/UI/atoms";

interface ISignInProps {
  onSignInWithGoogle: () => void;
  onSignInWithGithub: () => void;
}

const SignIn = ({ onSignInWithGoogle, onSignInWithGithub }: ISignInProps) => {
  return (
    <SignInStyle>
      <Button
        type="button"
        icon={<Icon name="google" />}
        onClick={onSignInWithGoogle}
      >
        Sign In With Google
      </Button>

      <Button
        type="button"
        icon={<Icon name="github" />}
        onClick={onSignInWithGithub}
      >
        Sign In With Github
      </Button>
    </SignInStyle>
  );
};

const SignInStyle = styled.div`
  display: flex;
  flex-direction: column;

  > div:not(:first-child) {
    margin-top: 0.3125rem;
  }

  button {
    ${(props) => props.theme.typography.h6};

    background-color: ${(props) => props.theme.color.white_400};
  }
`;

export default React.memo(SignIn);
