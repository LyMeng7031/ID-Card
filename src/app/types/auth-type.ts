export interface IAuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    existUser: {
      roles: string[];
    };
  };
}

export type AuthLoginForm = {
  email?: string;
  username?: string;
  password: string;
};

export type AuthRegisterForm = {
  email: string;
  user_name: string;
  full_name: string;
  password: string;
  device_name?: string;
  device_type?: string;
  os?: string;
  ip_address?: string;
  browser?: string;
};
