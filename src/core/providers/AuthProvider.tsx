import React, { useState, useEffect, useMemo, createContext } from "react";
import { useRouter } from "next/router";
import { auth, database } from "src/core/config/firebase";
import { IUser } from "src/core/models/user";
import {
  onAuthStateChanged,
  signIn,
  signOut,
  signInWithGoogle,
  signInWithGithub,
  updateUserProfile,
  findUserProfileByUid,
} from "src/core/helpers/authHelper";

interface IAuthProps {
  children: React.ReactNode;
}

export interface IAuthContext {
  profile: IUser;
  // signIn: (uid: string) => Promise<IUser>;
  signOut: () => void;
  signInWithGoogle: () => void;
  signInWithGithub: () => void;
  updateUserProfile: (
    uid: string,
    name: string,
    image?: string
  ) => Promise<void>;
  // findUserProfileByUid: (uid: string) => Promise<any>
}

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: IAuthProps) => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(
    () => ({
      profile: profile,
      // signIn: signIn,
      signOut: async () => {
        try {
          await signOut();
          setProfile(null);
        } catch (error) {
          // Toast Error
          console.error("Error Provider: ", error);
        }
      },
      signInWithGoogle: async () => {
        try {
          await signInWithGoogle();
        } catch (error) {
          // Toast Error
          // 로그아웃하고 인증 취소
          console.error("Error Provider: ", error);
        }
      },
      signInWithGithub: async () => {
        try {
          await signInWithGithub();
        } catch (error) {
          // Toast Error
          console.error("Error Provider: ", error);
        }
      },
      updateUserProfile: async (name: string, image?: string) => {
        try {
          await updateUserProfile(profile.uid, name, image);
          const userProfile = await findUserProfileByUid(profile.uid);
          setProfile(userProfile);
        } catch (error) {
          // Toast Error
          console.error("Error Provider: ", error);
        }
      },
    }),
    [profile]
  );

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      try {
        const uid = await onAuthStateChanged();
        const user: IUser = await signIn(uid);
        // 조회

        if (uid === user?.uid!) {
          setProfile(user);
        } else {
          throw new Error("인증이 유효하지 않습니다");
        }
      } catch (error) {
        console.log("인증된 유저가 없는 에러");
        setProfile(null);
      }

      setIsLoading(false);
    };

    fetch();
  }, []);

  useEffect(() => {
    if (profile) {
      router.push("/");
    } else {
      router.push("/auth/signIn");
    }
  }, [profile]);

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? "...Loading" : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
