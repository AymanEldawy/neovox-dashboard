
export const ErrorText = ({ containerClassName, children }) => {
  return (
    <p
      className={`my-1 p-2 rounded-md text-sm bg-red-200 text-red-600 font-normal ${containerClassName}`}
    >
      {children}
    </p>
  );
};
