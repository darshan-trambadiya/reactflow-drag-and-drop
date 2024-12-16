// external
import { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";

// components
import CustomResizerNode from "./CustomResizerNode";

// types
import { ItemTypes } from "../types/item";

const nodeTypes = {
  CustomResizerNode,
};

function DroppableGrid() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const isOverlapping = (newNode, existingNodes) => {
    const newNodeRect = {
      x: newNode.position.x,
      y: newNode.position.y,
      width: 300,
      height: 225,
    };

    return existingNodes.some((node) => {
      const existingNodeRect = {
        x: node.position.x,
        y: node.position.y,
        width: 300,
        height: 225,
      };

      return !(
        (
          newNodeRect.x + newNodeRect.width < existingNodeRect.x || // Left
          newNodeRect.x > existingNodeRect.x + existingNodeRect.width || // Right
          newNodeRect.y + newNodeRect.height < existingNodeRect.y || // Above
          newNodeRect.y > existingNodeRect.y + existingNodeRect.height
        ) // Below
      );
    });
  };

  const onInit = useCallback((instance) => {
    instance.setViewport({ x: 0, y: 0, zoom: 1 });
    setReactFlowInstance(instance);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const [, drop] = useDrop({
    accept: ItemTypes.TABLE,
    drop: (item, monitor) => {
      if (!reactFlowInstance) return;

      const dropPosition = monitor.getSourceClientOffset();

      const exists = nodes.some((node) => node.data.label === item.name);
      if (exists) {
        alert("Table already exists!");
        return;
      }

      const newNode = {
        id: uuidv4(),
        type: "CustomResizerNode",
        position: reactFlowInstance.screenToFlowPosition({
          x: dropPosition.x,
          y: dropPosition.y,
        }),
        data: {
          label: item.name,
          columns: item.columns,
          onDelete: (id) => handleDelete(id),
        },
        style: {
          width: 300,
          height: 225,
          minWidth: 168,
          minHeight: 146,
          background: "white",
          overflow: "hidden",
        },
      };

      if (isOverlapping(newNode, nodes)) {
        alert("Cannot drop here! Position overlaps with existing node.");
        return;
      }

      setNodes((nds) => [...nds, newNode]);

      // Reset zoom to 1
      setTimeout(() => {
        reactFlowInstance.setViewport({ x: 0, y: 0, zoom: 1 });
      }, 0);
    },
  });

  const handleDelete = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  return (
    <div ref={drop} id="reactflow-wrapper" style={{ height: "100vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={onInit}
          fitViewOptions={{ padding: 0.1, zoom: 1 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default DroppableGrid;
