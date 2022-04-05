import React, { Fragment } from "react";
import { IUser } from "src/core/models/user";
import { IRoom } from "src/core/models/room";
import { Nav, Profile, RoomList, TopBox } from "src/components/UI/molecules";

export interface IGnbFunctionProps {
  onHome?: () => void;
  onSignIn?: () => void;
  onSetting?: () => void;
  onTutorial?: () => void;
  onSignOut?: () => void;
  onCreateRoom?: () => void;
  onEntranceAtRoom?: (path: string) => void;
}

interface IGnbProps extends IGnbFunctionProps {
  profile: IUser;
  roomList: [] | IRoom[];
}

const Gnb = ({
  profile,
  roomList,
  onHome,
  onSignIn,
  onSetting,
  onTutorial,
  onSignOut,
  onCreateRoom,
  onEntranceAtRoom,
}: IGnbProps) => {
  return (
    <Fragment>
      {profile ? (
        <Profile data={profile} />
      ) : (
        <TopBox onHome={onHome} onSignIn={onSignIn} />
      )}

      <Nav
        data={profile}
        onHome={onHome}
        onSetting={onSetting}
        onTutorial={onTutorial}
        onSignOut={onSignOut}
        onCreateRoom={onCreateRoom}
      />
      <RoomList list={roomList} onEntranceAtRoom={onEntranceAtRoom} />
    </Fragment>
  );
};

export default React.memo(Gnb);
