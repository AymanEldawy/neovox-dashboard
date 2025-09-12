const Checkbox = ({ text, containerClassName, inputClassName, ...field }) => {
  return (
    <label
      className={`overflow-hidden flex-1 text-ellipsis flex gap-1 capitalize items-center p-1 px-2 has-checked ${containerClassName}`}
    >
      <input
        type="checkbox"
        {...field}
        className={
          "w-4 h-4 text-teal-600 disabled:opacity-50 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 " +
          // field?.className
          inputClassName
        }
      />
      {text ? <span className={`${field?.disabled ? 'text-gray-500 opacity-50' : ''}`}>{text}</span> : null}
    </label>
  );
};

export default Checkbox;
