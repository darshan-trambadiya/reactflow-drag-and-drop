// external
import { useDrag } from "react-dnd";

// types
import { ItemTypes } from "../types/item";

function DraggableTable({ table }) {
  const [, ref] = useDrag({
    type: ItemTypes.TABLE,
    item: { ...table },
  });

  return (
    <div ref={ref} className="p-2 border mb-2 cursor-move bg-gray-100">
      {table.name}
    </div>
  );
}

export default DraggableTable;
