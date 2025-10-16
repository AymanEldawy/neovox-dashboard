import UserBar from './UserBar';


export const IconsBar = ({ containerClassName }: { containerClassName?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${containerClassName}`}>
      {/*<LanguageBar />*/}
      {/*<ToggleThemeBar />*/}
      {/*<NotificationBar />*/}
      <UserBar />
    </div>
  );
};
