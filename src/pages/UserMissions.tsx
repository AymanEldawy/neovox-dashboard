import { UserMissionsForm } from '@/components/forms/container/userMissions/UserMissionsForm';
import PaperLayout from '@/components/paper/PaperLayout';
import QUERY_KEYS from '@/data/queryKays';
import { userMissionColumns } from '@/helpers/columns/columns_UserMissionsColumns';
import { getAllUserMissions } from '@/services/userMissionsService';
import React from 'react';

const UserMissions: React.FC = () => {
  return (
    <PaperLayout
      name="User"
      queryKey={QUERY_KEYS.USER_MISSION}
      queryFn={getAllUserMissions}
      columns={userMissionColumns}
      handleDeleteSelected={() => Promise.resolve()}
      FormWrapper={() =>
        <UserMissionsForm  />
      }
      paperHeaderProps={{
        name: "Users",
      }}
    />
  );
};

export default UserMissions;