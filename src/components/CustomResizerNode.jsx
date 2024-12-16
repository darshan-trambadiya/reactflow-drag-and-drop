// external
import { useRef, useCallback, useEffect } from "react";
import {
  Handle,
  Position,
  NodeResizeControl,
  useUpdateNodeInternals,
} from "reactflow";

// svg
import CloseIcon from "../svg/CloseIcon";
import ResizeIcon from "../svg/ResizeIcon";

function CustomResizerNode({ id, data }) {
  const updateNodeInternals = useUpdateNodeInternals();
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  // Update node internals on scroll or resize
  const updateHandlesPosition = useCallback(() => {
    updateNodeInternals(id); // Trigger updates for React Flow
  }, [id, updateNodeInternals]);

  // Attach scroll event listener
  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const handleScroll = () => {
      updateHandlesPosition();
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [updateHandlesPosition]);

  return (
    <>
      <div ref={containerRef} className="flex flex-col h-full w-full">
        {/* Node Header */}
        <div className="flex justify-between items-center bg-gray-200 p-2">
          <h3 className="text-sm font-bold">{data.label}</h3>
          <button onClick={() => data.onDelete(id)} className="font-bold">
            <CloseIcon />
          </button>
        </div>

        {/* Table Content */}
        <div ref={scrollRef} className="flex-1 overflow-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="h-9">
                <th className="border-b pb-1">Column</th>
                <th className="border-b pb-1">DataType</th>
              </tr>
            </thead>
            <tbody>
              {data.columns.map((col) => (
                <tr
                  key={col.column_id}
                  className="relative h-9 border border-b-1"
                >
                  {/* Left Connection Handle */}
                  <td className="pl-2">
                    <Handle
                      type="target"
                      position={Position.Left}
                      id={`left-${col.column_id}`}
                      style={{
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: 10,
                        background: "#007bff",
                      }}
                    />
                    {col.name}
                  </td>

                  {/* Right Connection Handle */}
                  <td className="pr-2">
                    {col.column_data_type}
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={`right-${col.column_id}`}
                      style={{
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: 10,
                        background: "#007bff",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-sm p-2 bg-gray-200">
          Scroll to see more columns
        </div>

        {/* Resizing Control */}
        <NodeResizeControl
          style={{ background: "transparent", border: "none" }}
          minWidth={168}
          minHeight={146}
          onResize={updateHandlesPosition} // Trigger onResize
        >
          <ResizeIcon />
        </NodeResizeControl>
      </div>
    </>
  );
}

export default CustomResizerNode;
