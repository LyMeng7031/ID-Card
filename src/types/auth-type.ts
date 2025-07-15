export type AuthRegisterType = {
    username: string;
    full_name: string;
    email: string;
    password: string;
    os?: string;
    device_name?: string;
    device_type?: string;
    browser?: string;
    ip_address?: string;
    fingerprint?: string;
};