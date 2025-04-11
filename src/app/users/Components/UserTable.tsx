"use client";

import ListError from '@/app/SharedComponents/ListError';
import ListLoader from '@/app/SharedComponents/ListLoader';
import { Users } from '@/domain/api/Types';
import { useLoadWithPaginationRedux } from '@/domain/hooks/loadWithPaginationRedux';
import type { UsersStateType } from '@/domain/store/users';
import {
  clearUserList,
  getUsers,
  useUserStore,
  useUsersStore
} from '@/domain/store/users';
import { useScrollHistory } from '@/infrastructure/hooks/scrollHistory';
import { useIsMobile } from '@/infrastructure/tools/Environment';
import classNames from 'classnames';
import { memo, useCallback, useRef, useState } from 'react';
import UserCard from './UserCard';
import UserCardModal from './UserCardModal';
import UserRole from './UserRole';
import './UserTable.scss';


const UserTable = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const selectedCellRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [usersData, error, loading, hasMore, tryAgain] =
    useLoadWithPaginationRedux<UsersStateType, Users>(useUsersStore, getUsers, clearUserList, loaderRef);

  const isMobile = useIsMobile();
  const showDesktop = !isMobile;

  useScrollHistory();

  const selectDeselectUser = useCallback((userId: number | null) => {
    setSelectedUserId(userId);
  }, []);

  const showNoUsers = !hasMore && usersData.ids.length === 0;
  const showLoader = hasMore && !showNoUsers && !error;

  return (
    <>
      <table className={'UsersTableMainContainer'} ref={tableRef}>
        {showDesktop && <>
          <thead>
            <tr className={'text-nowrap'}>
              <th>Person</th>
              <th>Company Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Access</th>
              <th>Email</th>
              <th>Country</th>
            </tr>
          </thead>
        </>}

        <tbody>
          {usersData.ids.map(userId => <UserItem
            key={userId}
            userId={userId}
            isDesktop={showDesktop}
            selected={userId === selectedUserId}
            selectUser={selectDeselectUser}
            cellRef={userId === selectedUserId ? selectedCellRef : undefined}
          />)}
          {showLoader && <tr>
            {showDesktop && <td />}
            <td colSpan={showDesktop ? 6 : 1} className='LoaderCell'>
              <ListLoader ref={loaderRef} showLoader={loading} />
            </td>
          </tr>}
          {showNoUsers && <tr>
            <td colSpan={showDesktop ? 7 : 1} className='LoaderCell'>
              <h2 ref={loaderRef} className='text-3xl text-center'>There are no users matching your search.</h2>
            </td>
          </tr>}
          {(error as Error) && <tr>
            {showDesktop && <td />}
            <td colSpan={showDesktop ? 6 : 1} className='LoaderCell'>
              <ListError error={error as Error} tryAgain={tryAgain} />
            </td>
          </tr>}
        </tbody>
      </table>

      {showDesktop && <UserCardModal userId={selectedUserId} parentRef={selectedCellRef} scrollableContainer={tableRef?.current?.parentElement} />}
    </>
  );
};

export default UserTable;


type UserItemProps = {
  userId: number;
  isDesktop: boolean;
  selected: boolean;
  selectUser: (userId: number | null) => void;
  cellRef: React.RefObject<HTMLDivElement | null> | undefined;
};

const UserItem = memo(({ userId, isDesktop, selected, selectUser, cellRef }: UserItemProps) => {
  const { image, firstName, lastName, phone, company, email, address, role } = useUserStore(userId);

  const onClick = useCallback(() => {
    selectUser(selected ? null : userId);
  }, [selected, selectUser]);

  return (
    <tr className={'text-nowrap'}>
      {isDesktop && <>
        <td onClick={onClick}>
          <div className={classNames('Cell', selected && 'SelectedCell')} ref={cellRef}>
            <img className='UsersListIcon' src={image} alt={''} />
            <div className='flex flex-col overflow-hidden'>
              <div className='text-md font-bold text-ellipsis overflow-hidden'>{firstName} {lastName}</div>
              <div className='text-sm font-bold text-neutral-500 text-ellipsis overflow-hidden'>{phone}</div>
            </div>
          </div>
        </td>
        <td>{company.name}</td>
        <td>{company.department}</td>
        <td>{company.title}</td>
        <td><div className='flex'><UserRole role={role} /></div></td>
        <td>{email}</td>
        <td>{address.country}</td>
      </>}

      {!isDesktop && <td><UserCard userId={userId} /></td>}
    </tr>
  );
});
