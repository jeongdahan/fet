import React from "react";
import styled from "styled-components";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <LayoutStyle>{children}</LayoutStyle>;
};

const Gnb = ({ children }: LayoutProps) => {
  return <GnbStyle>{children}</GnbStyle>;
};

const Contents = ({ children }: LayoutProps) => {
  return <ContentsStyle>{children}</ContentsStyle>;
};

Layout.Gnb = Gnb;
Layout.Contents = Contents;

const LayoutStyle = styled.div`
  position: relative;
`;

const GnbStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 25rem;
  min-height: 100vh;

  background: ${(props) => props.theme.color.blue_500};
`;

const ContentsStyle = styled.div`
  position: fixed;
  top: 0;
  left: 25rem;

  width: calc(100% - 25rem);
  height: 100vh;

  background: ${(props) => props.theme.color.blue_100};
`;

export default Layout;
