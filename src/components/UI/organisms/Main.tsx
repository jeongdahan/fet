import React from "react";
import styled from "styled-components";
import { Button } from "src/components/UI/atoms";

const Main = () => {
  return (
    <MainStyle>
      <Top />
      <TemplateStyle>
        ChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChartChart
      </TemplateStyle>
      <Footer />
    </MainStyle>
  );
};

const Top = () => {
  return (
    <TopStyle>
      <div>
        <PeopleConnectedStyle>
          접속인원
          <div>100</div>
        </PeopleConnectedStyle>
        <BillBoardStyle>BlaBla~</BillBoardStyle>
      </div>
    </TopStyle>
  );
};

const Footer = () => {
  return (
    <FooterStyle>
      <ul>
        <li>
          <Button type="button">CONTACT US</Button>
        </li>
        <li>
          <Button type="button">POLICY</Button>
        </li>
        <li>
          <Button type="button">GITHUB</Button>
        </li>
      </ul>
      <CopylightStyle>
        Copyright © 2021. Fet all rights reserved.
      </CopylightStyle>
    </FooterStyle>
  );
};

const MainStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100vh;
`;

const TopStyle = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 3.125rem;
`;

const PeopleConnectedStyle = styled.div`
  ${(props) => props.theme.typography.h4};
  color: ${(props) => props.theme.color.black_600};
  text-align: center;

  div {
    ${(props) => props.theme.typography.display_3};
  }
`;

const BillBoardStyle = styled.div`
  padding: 0.625rem;

  background-color: ${(props) => props.theme.color.white_400};
`;

const TemplateStyle = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  flex-grow: 1;

  padding: 0.9375rem;
`;

const FooterStyle = styled.div`
  padding: 0.9375rem;

  text-align: center;

  ul {
    li {
      display: inline-block;
      color: ${(props) => props.theme.color.white_400};

      &:not(:first-child) {
        margin-left: 0.625rem;
      }

      button {
        ${(props) => props.theme.typography.h6};

        color: ${(props) => props.theme.color.white_400};
        background-color: transparent;
      }
    }
  }
`;

const CopylightStyle = styled.div`
  margin-top: 0.625rem;

  ${(props) => props.theme.typography.display_1};
  color: ${(props) => props.theme.color.white_400};
`;

export default React.memo(Main);
