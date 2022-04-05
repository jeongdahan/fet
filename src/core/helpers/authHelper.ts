import { auth, database } from "src/core/config/firebase";
import { IUser } from "src/core/models/user";

const signIn = async (uid: string): Promise<IUser | unknown> => {
  return new Promise(async (resolve, reject) => {
    database.goOnline(); // 데이터베이스를 명시적으로 온라인

    const result: any = await getRedirectResult();
    if (result.user) {
      const {
        user: { uid, displayName, photoURL },
        additionalUserInfo: { isNewUser },
      } = result;

      const user = {
        uid: uid,
        name: displayName,
        imageURL: photoURL,
      };

      if (isNewUser) {
        await saveUserAtDB(user);
      }

      const profile = await findUserProfileByUid(user.uid);
      resolve(profile);
    } else {
      const profile = await findUserProfileByUid(uid);

      if (!profile) {
        // 인증 취소
        reject(new Error("인증 취소"));
      }
      resolve(profile);
    }
  });
};

const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    throw error;
  }
};

// 구글 로그인
const signInWithGoogle = async () => {
  const provider = new auth.GoogleAuthProvider();

  try {
    // 브라우저 종료시 로그아웃으로 설정
    await auth().setPersistence(auth.Auth.Persistence.SESSION);
    await auth().signInWithRedirect(provider);
  } catch (error) {
    throw error;
  }
};

// 깃헙 로그인
const signInWithGithub = async () => {
  const provider = new auth.GithubAuthProvider();

  try {
    // 브라우저 종료시 로그아웃으로 설정
    await auth().setPersistence(auth.Auth.Persistence.SESSION);
    await auth().signInWithRedirect(provider);
  } catch (error) {
    throw error;
  }
};

const onAuthStateChanged =
  (): Promise<// Pick<IUser, "uid" | "name" | "imageURL">
  string> => {
    return new Promise((resolve, reject) => {
      auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          reject(new Error("non-login"));
        }
      });
    });
  };

const getRedirectResult = () => {
  return new Promise(async (resolve) => {
    const response = await auth().getRedirectResult();
    resolve(response);
  });
};

const findUserProfileByUid = (uid: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userProfile = await database.ref(`Users/${uid}`).once("value");
      resolve(userProfile.val());
    } catch (error) {
      reject(error);
    }
  });
};

const saveUserAtDB = (user: Omit<IUser, "level">) => {
  return new Promise(async (resolve, reject) => {
    const { uid, name, imageURL = "" } = user;
    const userRef = database.ref(`Users/${uid}`);
    const dataSnapshot = await userRef.once("value");

    if (dataSnapshot && !dataSnapshot.hasChildren()) {
      try {
        userRef
          .set({
            uid: uid,
            name: name,
            imageURL: imageURL,
            level: 1,
          })
          .then(() => {
            resolve(true);
          });
      } catch (error) {
        reject(new Error("Failed to register user data in DB"));
      }
    }
  });
};

const updateUserProfile = (uid: string, name: string, image?: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const userProfileRef = await database.ref(`Users/${uid}`);
      const update = image
        ? {
            name: name,
            photoURL: image,
          }
        : {
            name: name,
          };

      userProfileRef.update(update);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export {
  onAuthStateChanged,
  signIn,
  signOut,
  signInWithGoogle,
  signInWithGithub,
  updateUserProfile,
  findUserProfileByUid,
};
