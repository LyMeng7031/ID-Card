import { CardItem } from "./card-type";

export interface UserData {
  id: string;
  full_name?: string | undefined;
  user_name: string;
  email: string;
  password: string;
  avatar?: string;
  is_deleted: boolean;
  is_active: boolean;
  roles: string[];
  created_at: string;
  updated_at: string;
  idCard: CardItem[];
}
export interface IUser {
  message: string;
  data: UserData;
  profile_url: string;
  id: string;
  full_name?: string | undefined;
  user_name: string;
  email: string;
  password: string;
  avatar?: string;
  is_deleted: boolean;
  is_active: boolean;
  roles: string[];

  created_at: string;
  updated_at: string;
  idCard: CardItem[];
  socialLinks: {
    id: string;
    platform: string;
    url: string;
    icon: string;
    is_deleted: boolean;
    updated_at: string;
    created_at: string;
  }[];
}
