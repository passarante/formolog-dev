import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import ModelNode from "./ModelNode";
import { defaultDbTables } from "@/constants";
import { DbTableType } from "@/types";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useDbTableStore from "@/stores/dbTablesStore";

const modelTypes = {
  model: ModelNode,
};

export const SchemaVisualizer = () => {
  const [tables, setTables] = useState<DbTableType[]>(defaultDbTables);
  const [selectedTables, setSelectedTables] = useState<DbTableType[]>([
    defaultDbTables[0],
  ]);
  const [selectedTable, setSelectedTable] = useState<DbTableType | null>();

  const models = selectedTables.map((t: DbTableType) => {
    return {
      name: t.name,
      fields: t.fields,
      isChild: false,
    };
  });

  const connections = [
    { target: "User", source: "Activity", name: "author" },
    { target: "Comment", source: "Activity", name: "comments" },
  ];
  let row = 0;
  let column = 0;
  const numModels = models.length;
  let numGrid = 1;

  while (1) {
    if (numGrid ** 2 >= numModels) {
      break;
    }
    numGrid++;
  }

  const defaultNodes: Node[] = models.map(
    (model: DbTableType, index: number) => {
      const x = row * 500;
      const y = column * 300;

      if (numGrid % index === 0) {
        column = 0;
        row += 1;
      } else {
        column += 1;
      }

      return {
        id: model.name,
        position: { x, y },
        data: model,
        type: "model",
      };
    }
  );

  const defaultEdges: Edge[] = connections.map((connection) => {
    const sourceId = `${connection.source}-${connection.name}`;
    return {
      id: sourceId,
      source: connection.source,
      target: connection.target,
      sourceHandle: sourceId,
      targetHandle: connection.target,
      animated: true,
    };
  });

  const initialNodes = [
    {
      id: "1",
      data: { label: "Hello" },
      position: { x: 0, y: 0 },
      type: "input",
    },
    {
      id: "2",
      data: { label: "World" },
      position: { x: 100, y: 100 },
    },
  ];

  const initialEdges = [
    { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    console.log("CHNG", changes);
    setNodes((nds: Node[]) => applyNodeChanges(changes, nds));
  }, []);

  const handleTableSelect = (name: string) => {
    const table = tables.filter((t) => t.name === name);
    if (table[0]) {
      setSelectedTable(table[0]);
    }
  };

  const addTableToDiagram = () => {
    const index = Math.floor(Math.random() * tables.length);
    const tbl = tables[index];
    const newNode = {
      id: Math.floor(Math.random() * 100).toString(),
      data: { label: "World" },
      position: { x: 100, y: 100 },
    };
    setNodes((nodes) => [...nodes, newNode]);
  };

  return (
    <div>
      <div>
        <Button onClick={addTableToDiagram}>Ekle</Button>
        {/* <Dialog>
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
              <Button type="button" onClick={addTableToDiagram}>
                Ekle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </div>
      <div className="h-[800px] w-full">
        <ReactFlow
          defaultNodes={nodes}
          defaultEdges={edges}
          nodeTypes={modelTypes}
          onNodesChange={onNodesChange}
          fitView
          fitViewOptions={{ padding: 0.4 }}
        >
          <Background color="#222" variant={BackgroundVariant.Lines} />
          <Controls position={"top-right"} />
        </ReactFlow>
      </div>
    </div>
  );
};
