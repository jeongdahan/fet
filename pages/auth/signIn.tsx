import React, { useContext } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import styeld from "styled-components";
import { AuthContext } from "src/core/providers/AuthProvider";
import { SignIn } from "src/components/UI/organisms";

const signIn: NextPage = () => {
  const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);

  return (
    <SignInStyle>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="This is the login page" />
      </Head>

      <SignIn
        onSignInWithGoogle={signInWithGoogle}
        onSignInWithGithub={signInWithGithub}
      />
    </SignInStyle>
  );
};

const SignInStyle = styeld.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
`;

export default signIn;
