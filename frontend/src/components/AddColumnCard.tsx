interface AddColumnCardProps {
  onAddColumn: () => void;
}

export const AddColumnCard = ({
  onAddColumn,
}: AddColumnCardProps) => {
  return (
    <button
      onClick={onAddColumn}
      className="
        w-80
        h-40
        flex-shrink-0
        rounded-2xl
        border-2
        border-dashed
        border-gray-300
        dark:border-gray-700
        flex
        items-center
        justify-center
        text-gray-500
        hover:bg-gray-50
        dark:hover:bg-gray-800
        transition
      "
    >
      + Add Column
    </button>
  );
};