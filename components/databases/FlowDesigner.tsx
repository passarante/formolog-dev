import { useState, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  NodeChange,
  EdgeChange,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import ModelNode from "./ModelNode";
import { defaultDbTables } from "@/constants";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DbTableType } from "@/types";

const modelTypes = {
  model: ModelNode,
};

// const initialNodes = [
//   {
//     id: "1",
//     data: { label: "Hello" },
//     position: { x: 0, y: 0 },
//     type: "model",
//   },
//   {
//     id: "2",
//     data: { label: "World" },
//     position: { x: 100, y: 100 },
//   },
// ];

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [
  // { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [tables, setTables] = useState<DbTableType[]>(defaultDbTables);
  const [selectedTable, setSelectedTable] = useState<DbTableType | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const addNode = () => {
    if (selectedTable) {
      const newNode = {
        id: selectedTable.name,
        data: selectedTable,
        position: { x: 100, y: 100 },
        type: "model",
      };
      setNodes((nodes) => [...nodes, newNode]);
      setTables((tables) =>
        tables.filter((t) => t.name !== selectedTable.name)
      );

      if (selectedTable.name == "Company") {
        const newEdges = [
          {
            id: "Activity-CompanyId",
            source: "Activity",
            target: "Company",
            sourceHandle: "Activity-CompanyId",
            targetHandle: "Company",
            animated: true,
          },
        ];
        setEdges(newEdges);
      }

      setSelectedTable(null);
    }
  };

  const handleTableSelect = (name: string) => {
    const table = defaultDbTables.filter((t) => t.name === name);
    if (table[0]) {
      setSelectedTable(table[0]);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Tablo Ekle</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Diagrama tablo ekleyin</DialogTitle>
            <DialogDescription>
              Veritabanı diagramına veritabanınızdan tablo ekleyerek
              diagramınızı oluşturabilirsiniz.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select onValueChange={(value) => handleTableSelect(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tablo Seçin" />
              </SelectTrigger>
              <SelectContent>
                {tables.map((table, index) => (
                  <SelectItem key={index} value={table.name}>
                    {table.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type="button" onClick={addNode}>
                Ekle
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        nodeTypes={modelTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
