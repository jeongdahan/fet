import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "src/core/providers/AuthProvider";
import { RoomProvider } from "src/core/providers/RoomProvider";
import GnbFeature from "src/components/features/GnbFeature";
import { Layout } from "src/components/UI/organisms";
import { theme } from "styles/theme";
import GlobalStyle from "styles/global";

const queryClient = new QueryClient(); // 인스턴스 생성

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <RoomProvider>
            <Layout>
              <Layout.Gnb>
                <GnbFeature />
              </Layout.Gnb>
              <Layout.Contents>
                <Component {...pageProps} />
              </Layout.Contents>
            </Layout>
          </RoomProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
