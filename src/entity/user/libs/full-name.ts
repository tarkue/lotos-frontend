import { User } from "../models/user.model";

export const getFullName = (user: User) =>
  [user.last_name, user.first_name, user.patronymic]
    .filter((el) => el !== undefined)
    .join(" ");
