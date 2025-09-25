import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "@/store/themeStore";

const ToggleThemeBar = () => {
  const { changeTheme, theme } = useTheme();

  return (
    <button
      onClick={changeTheme}
      className="p-2 rounded-full hover:bg-[#0002]"
    >
      {theme !== "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ToggleThemeBar;
