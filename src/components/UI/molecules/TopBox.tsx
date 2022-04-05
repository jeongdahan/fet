import React from "react";
import styled from "styled-components";
import { Button } from "src/components/UI/atoms";

interface ITopBoxProps {
  onHome: () => void;
  onSignIn: () => void;
}

const TopBox = ({ onHome, onSignIn }: ITopBoxProps) => {
  return (
    <TopBoxStyle>
      <LogoStyle>
        <Button type="button" className="button" onClick={onHome}>
          Fet
        </Button>
      </LogoStyle>
      <SignInStyle>
        <Button type="button" className="button" onClick={onSignIn}>
          Sign In
        </Button>
      </SignInStyle>
    </TopBoxStyle>
  );
};

const TopBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.9325rem;
`;

const LogoStyle = styled.div`
  padding: 0.90625rem 0;

  .button {
    background-color: transparent;

    button {
      ${(props) => props.theme.typography.h1};
      color: ${(props) => props.theme.color.white_600};

      border-color: transparent;
    }
  }
`;

const SignInStyle = styled.div`
  ${(props) => props.theme.typography.display_2};

  .button {
    background-color: transparent;

    button {
      color: ${(props) => props.theme.color.white_100};

      border-color: transparent;
    }
  }
`;

export default React.memo(TopBox);
