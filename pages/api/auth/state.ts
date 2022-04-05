import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "src/core/config/firebase";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("api 요청");
  // res.status(200).json({ name: "John Doe" });

  await auth().onAuthStateChanged(async (user) => {
    if (user) {
      // 채팅 화면으로 이동

      const { uid, email, displayName, photoURL } = user;
      res.status(200).json({ name: "John Doe" });
    } else {
      // 로그인 화면으로 이동
      console.log("비로그인 이동");
      res.status(403);
    }
  });
}
