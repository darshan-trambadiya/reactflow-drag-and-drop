// external
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// components
import DraggableTable from "../components/DraggableTable";
import DroppableGrid from "../components/DroppableGrid";

// data
import { TABLES_DATA } from "../data/tables";

function DragAndDropPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-100">
        <div className="w-1/4 p-4 bg-white shadow-lg overflow-auto">
          <h2 className="text-lg font-bold mb-4">Tables</h2>
          {TABLES_DATA.map((table) => (
            <DraggableTable key={table.id} table={table} />
          ))}
        </div>
        <div className="flex-1 p-4">
          <DroppableGrid />
        </div>
      </div>
    </DndProvider>
  );
}

export default DragAndDropPage;
