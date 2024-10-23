export type User = {
    id? : string | null;
    name? : string | null;
    email? : string | null;
    password? : string | null;
    confirm_password? : string | null;
    options? : object | {} ;
}

export type UserInfoProps = {
    user: User;
}