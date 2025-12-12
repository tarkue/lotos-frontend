import { UserListProps, UserProps } from "../models/user.model";
import { UserCard } from "./card";

export const UserList = ({
  users,
  action,
}: UserListProps & { action?: React.FC<UserProps> }) => {
  return (
    <ul>
      {users.map((user, key) => (
        <li key={key}>
          <UserCard user={user} action={action} />
        </li>
      ))}
    </ul>
  );
};
