import axios from "@/lib/api/request";
import { IUser } from "@/types/user-type";

export const userRequest = () => {
  const PROFILE = async (): Promise<IUser> => {
    return await axios({
      url: "/user/me",
      method: "GET",
    });
  };
  const UPDATE_PROFILE = async (payload: IUser): Promise<IUser> => {
    return await axios({
      url: "/user/update-profile",
      method: "PUT",
      data: payload,
    });
  };
  return {
    PROFILE,
    UPDATE_PROFILE,
  };
};
