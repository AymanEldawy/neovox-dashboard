import { UsersForm } from '@/components/forms/container/users/UserForm.tsx';
import PaperLayout from '@/components/paper/PaperLayout.tsx';
import QUERY_KEYS from '@/data/queryKays.ts';
import { userColumns } from '@/helpers/columns/columns_UsersColumns.ts';
import {deleteUser, getAllUsers} from '@/services/userService.ts';
import React from 'react';

const Users: React.FC = () => {
  return (
    <PaperLayout
      name="User"
      queryKey={QUERY_KEYS.USERS}
      queryFn={getAllUsers}
      columns={userColumns}
      handleDeleteSelected={async (ids: string[]) => {
          await Promise.all(ids.map(id => deleteUser(id)));
      }}
      FormWrapper={() =>
        <UsersForm />
      }
      paperHeaderProps={{
        name: "Users",
      }}
        enableRowActions={true}
      showAddButton={false}

    />
  );
};

export default Users;