import classNames from 'classnames';
import { UserRoleType } from '@/domain/api/Types';
import './UserRole.scss';

enum UserRoles {
  admin = 'Admin',
  moderator = 'Moderator',
  user = 'User',
}
const UserRole = ({ role }: { role: UserRoleType; }) => {
  return (
    <div className={classNames('rounded-lg px-2 py-1 text-sm', `UserRoleMainContainer${UserRoles[role]}`)}>
      {UserRoles[role]}
    </div>
  );
};

export default UserRole;
