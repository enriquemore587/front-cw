import { UserToDown } from "../models/UserToDown";

export interface ConfirmationData {
    msg: string;
    action: string;
    userToDown: UserToDown,
    data: number
}