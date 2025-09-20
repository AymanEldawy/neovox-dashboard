
type PaperHeaderProps = {
  paperHeaderProps: {
    name: string;
  };
}
const PaperHeader = ({ paperHeaderProps: { name } }: PaperHeaderProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-background-dark dark:text-background-light mb-4">{name}</h2>
    </div>
  )
}

export default PaperHeader