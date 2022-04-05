import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { storage } from "src/core/config/firebase";
import { AuthContext } from "src/core/providers/AuthProvider";
import { RoomContext } from "src/core/providers/RoomProvider";
import { Gnb, Modal } from "src/components/UI/organisms";
import { CreateRoom, ProfileEdit } from "src/components/UI/molecules";
import { Button } from "src/components/UI/atoms";

interface ICreateRoom {
  image: {
    file: any[];
  };
  title: { value: string };
  path: { value: string };
}

interface ISetting {
  image: {
    file: any[];
  };
  name: { value: string };
}

const GnbFeature = () => {
  const router = useRouter();
  const {
    signOut,
    // setUserProfile,
    // getUserProfileByUid,
    updateUserProfile,
    profile,
    // setProfile,
  } = useContext(AuthContext);
  const { createRoom, roomList } = useContext(RoomContext);
  const [isCreateRoomModal, setIsCreateRoomModal] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const createRoomFormRef =
    React.useRef() as React.MutableRefObject<HTMLFormElement>;
  const settingFormRef =
    React.useRef() as React.MutableRefObject<HTMLFormElement>;

  const handleCreateRoom = async (
    name: string,
    path: string,
    downloadURL: string
  ) => {
    await createRoom({
      name: name,
      path: path,
      imageURL: downloadURL,
    });
    setIsCreateRoomModal(false);
    setThumbnail(null);
  };

  const handleProfileEdit = async (name: string, downloadURL?: string) => {
    await updateUserProfile(name, downloadURL);
    setIsSettingModal(false);
    setThumbnail(null);
  };

  const handleSubmit = useCallback(
    <T,>(e: any) => {
      e.preventDefault();

      const target = e.target as typeof e.target & T;
      const file = target?.image.files[0];
      const metaData = { contentType: file?.type };

      const { name, path } = target;

      // CreateRoom시 이미지를 필수!
      if (!file && isCreateRoomModal) {
        return alert("이미지를 삽입해 주세요.");
      } else if (!file && isSettingModal) {
        return handleProfileEdit(name.value);
      }

      try {
        const uploadTask = storage
          .ref("Images")
          .child(`${isCreateRoomModal ? "Room" : "Profile"}_image/${file.name}`)
          .put(file, metaData);

        uploadTask.on(
          "state_changed",
          () => {
            // 진행 상황
          },
          (error) => console.error(error),
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

            if (isCreateRoomModal) {
              handleCreateRoom(name.value, path.value, downloadURL);
            } else if (isSettingModal) {
              handleProfileEdit(name.value, downloadURL);
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    [isCreateRoomModal, isSettingModal]
  );

  const handleChangeUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const image = (e.target as HTMLInputElement).files[0];

    var reader = new FileReader();

    reader.onload = (e) => setThumbnail(e.target.result);

    reader.readAsDataURL(image);
  };

  return (
    <Fragment>
      <Gnb
        profile={profile}
        roomList={roomList}
        onHome={() => router.push("/")}
        onSignIn={() => router.push("/auth/signIn")}
        onSetting={() => setIsSettingModal(true)}
        onTutorial={() => console.log("handleTutorial")}
        onSignOut={() => signOut()}
        onCreateRoom={() => setIsCreateRoomModal(true)}
        onEntranceAtRoom={(path: string) => {
          router.push(`/room/${path}`);
        }}
      />

      {/* Create room */}
      <Modal
        visible={isCreateRoomModal}
        title="Make a room"
        confirmText="Create"
        cancelText="Cancel"
        onConfirm={() =>
          createRoomFormRef.current?.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          )
        }
        onCancel={() => {
          setIsCreateRoomModal(false);
          setThumbnail(null);
        }}
      >
        <CreateRoom
          formRef={createRoomFormRef}
          thumbnail={thumbnail}
          onThumbnail={setThumbnail}
          onChange={handleChangeUpload}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSubmit<ICreateRoom>(e)
          }
        />
      </Modal>

      {/* Setting */}

      <Modal
        visible={isSettingModal}
        title="Setting"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={() =>
          settingFormRef.current?.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          )
        }
        onCancel={() => {
          setIsSettingModal(false);
          setThumbnail(null);
        }}
      >
        <ProfileEdit
          formRef={settingFormRef}
          data={profile}
          thumbnail={thumbnail}
          onThumbnail={setThumbnail}
          onChange={handleChangeUpload}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSubmit<ISetting>(e)
          }
        />

        <WithdrawalButton>
          <Button
            type="button"
            className="withdrawalButton"
            onClick={() => console.log("회원탈퇴")}
          >
            Withdrawal
          </Button>
        </WithdrawalButton>
      </Modal>
    </Fragment>
  );
};

const WithdrawalButton = styled.div`
  display: inline-block;

  margin-top: 0.9325rem;

  button {
    color: ${(props) => props.theme.color.white_400};

    background-color: ${(props) => props.theme.color.red_400};
    border-color: ${(props) => props.theme.color.red_400};
  }
`;

export default GnbFeature;
