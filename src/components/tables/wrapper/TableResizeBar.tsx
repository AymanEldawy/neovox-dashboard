
export const TableResizeBar = ({ header }) => {
  return (
    <div
      className={`absolute top-0 rtl:left-0 ltr:-right-[1px] h-full w-[3px] rounded-lg group-hover:bg-gray-400 cursor-col-resize`}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
    />
  );
};
