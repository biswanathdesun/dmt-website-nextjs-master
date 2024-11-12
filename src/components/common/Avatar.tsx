// components/Avatar.tsx
import React, { useEffect } from "react";
import { Avatar as MuiAvatar } from "@mui/material";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getUsersDetailsAsync } from "@/redux/services/profile";

interface UserData {
  fullName: string;
  imageUrl: string;
}

const Avatar: React.FC = () => {
  const storedUserData = localStorage.getItem("userData");
  const dispatch: AppDispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users)

  const avatarContent = users?.profilePicture ? (
    <MuiAvatar src={users?.profilePicture} />
  ) : (
    <MuiAvatar>{users?.name?.first?.charAt(0)}</MuiAvatar>
  );

  useEffect(() => {
  dispatch(getUsersDetailsAsync());
  }, []);

  return <>{avatarContent}</>;
};

export default Avatar;
