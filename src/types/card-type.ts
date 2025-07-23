import { IUser } from "./user-type";

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
}

export interface ICard {
  message: string;
  card: CardItem;
  user: IUser;
  id: string;
}
export interface CardResponse {
  message: string;
  card: CardItem[];
}

export interface ICard {
  // other properties
  card_type: "Minimal" | "Modern" | "Corporate";
  user: IUser;
  company: string;
  job: string;
  bio: string;
  phone: string;
  web_site: string;
  address: string;
  socialLinks: SocialLink[];
  profile_url: string;
  // other properties
  updated_at: string;
  created_at: string;
  is_active: boolean;
  is_deleted: boolean;

  // possibly other fields
}
export interface ICard {
  company: string;
  job: string;
  bio: string;
  phone: string;
  web_site: string;
  address: string;
}

export type CardType = "Minimal" | "Modern" | "Corporate";
export type GenderType = "male" | "female";
export interface CardItem {
  user: IUser;
  id: string;
  gender: GenderType;
  dob: string;
  address: string;
  phone: string;
  nationality: string;
  qr_url?: string;
  qr_code?: string;
  card_type?: CardType;
  is_active: boolean;
  is_deleted: boolean;
  theme_color?: string;
  updated_at: string;
  created_at: string;
  socialLinks: SocialLink[];
  job: string;
  bio: string;
  web_site: string;
  company: string;
  profile_url: string;
  user_id: string;
}
