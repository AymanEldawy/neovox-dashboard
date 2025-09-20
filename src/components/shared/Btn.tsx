
const Btn = (
  { children, kind, containerClassName, isLoading, isActive, onClick, ...props }: {
    children: React.ReactNode;
    kind?: "default" | "primary" | "success" | "error" | "info" | "warn";
    containerClassName?: string;
    isLoading?: boolean;
    isActive?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  let classes = `text-blue-500 bg-blue-100 border border-transparent active:border-blue-700 hover:text-blue-700 ${isActive && 'border-blue-700'}`;

  switch (kind) {
    case "success":
      classes =
        `text-green-500 bg-green-100 border border-transparent active:border-green-700 hover:text-green-700 ${isActive && 'border-green-700'}`;
      break;
    case "primary":
      classes =
        `text-[#06a96c] bg-green-100 border border-transparent active:border-[#06a96c] hover:text-[#06a96c] ${isActive && 'border-[#06a96c]'}`;
      break;
    case "error":
      classes = `text-red-500 bg-red-100 border border-transparent active:border-red-700 hover:text-red-700 ${isActive && 'border-red-700'}`;
      break;
    case "info":
      classes =
        `text-indigo-500 bg-indigo-100 border border-transparent active:border-indigo-700 hover:text-indigo-700 ${isActive && 'border-indigo-700'}`;
      break;
    case "warn":
      classes =
        `text-yellow-500 bg-yellow-100 border border-transparent active:border-yellow-700 hover:text-yellow-700 ${isActive && 'border-yellow-700'}`;
      break;
    case 'default':
      classes =
        `bg-gray-200 border border-transparent active:border-gray-400 hover:text-gray-700 hover:text-white ${isActive && 'border-gray-700'} text-black`;
      break;
    default:
      return;
  }

  return (
    <button
      onClick={(e) => {
        if (!onClick) {
          console.log('No onClick function provided');
          return;
        }
        onClick(e);
      }}
      className={`text-sm flex items-center gap-2 disabled:bg-gray-200 disabled:text-gray-400 px-2 h-7 tracking-wide rounded-md py-1 font-medium capitalize duration-300 ${classes} ${containerClassName}`}
      {...props}
    >
      {isLoading ? (
        <span className="animate-pulse flex items-center gap-2">
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Btn;
