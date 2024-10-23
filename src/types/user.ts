export type User = {
    id? : string | null;
    name? : string | null;
    email? : string | null;
    password? : string | null;
    confirm_password? : string | null;
}

export type UserInfoProps = {
    user?: User;
}

export interface voiceProps {
    voiceURI: string;
    name: string;
    lang: string;
    default: boolean;
  }