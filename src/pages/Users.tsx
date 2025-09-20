import { UsersForm } from '@/components/forms/container/users/UserForm';
import PaperLayout from '@/components/paper/PaperLayout';
import QUERY_KEYS from '@/data/queryKays';
import { userColumns } from '@/helpers/columns/columns_UsersColumns';
import { getAllUsers } from '@/services/userService';
import React from 'react';

const Users: React.FC = () => {
  return (
    <PaperLayout
      name="User"
      queryKey={QUERY_KEYS.USERS}
      queryFn={getAllUsers}
      columns={userColumns}
      handleDeleteSelected={() => Promise.resolve()}
      FormWrapper={() =>
        <UsersForm />
      }
      paperHeaderProps={{
        name: "Users",
      }}
    />
  );
};

export default Users;