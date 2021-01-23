import { UserType } from "../../../types/types";

export function UsersFilter (users:Array<UserType>, filterWords: string): Array<UserType> {
    return users.filter(user => user.name.includes(filterWords)) 
}