import { useState, useCallback, useRef } from "react";
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
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import ModelNode from "./ModelNode";
import { defaultDbTables, defaultTableFields } from "@/constants";
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
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const modelTypes = {
  model: ModelNode,
};

// const initialNodes: Node[] = [
//   {
//     id: defaultDbTables[1].name,
//     data: defaultDbTables[1],
//     position: { x: 100, y: 100 },
//     type: "model",
//   },
//   {
//     id: defaultDbTables[2].name,
//     data: defaultDbTables[2],
//     position: { x: 600, y: 100 },
//     type: "model",
//   },
// ];

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [
  // {
  //   id: "Activity-CompanyId",
  //   source: "Activity",
  //   target: "Company",
  //   sourceHandle: "Activity-CompanyId",
  //   targetHandle: "Company",
  //   animated: true,
  // },
];

function FlowDesigner() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [tables, setTables] = useState<DbTableType[]>(defaultDbTables);
  const [selectedTable, setSelectedTable] = useState<DbTableType | null>(null);

  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const addDatabaseFormSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    description: z.optional(z.string()),
  });

  const form = useForm<z.infer<typeof addDatabaseFormSchema>>({
    resolver: zodResolver(addDatabaseFormSchema),
  });

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

      if (selectedTable.fields.some((x) => x.hasConnections)) {
        const connections = selectedTable.fields.filter(
          (x) => x.hasConnections
        );

        const newEdges: any = [];
        connections.forEach((c) => {
          console.log(c);
          const newEdge = {
            id: `${selectedTable.name}-${c.name}`,
            source: selectedTable.name,
            target: c.foreignKey?.split("-")[0] || "",
            sourceHandle: `${selectedTable.name}-${c.name}`,
            targetHandle: `${c.foreignKey?.split("-")[0] || ""}`,
            animated: true,
          };
          newEdges.push(newEdge);
        });
        setEdges((prev) => [...prev, ...newEdges]);
      }

      setSelectedTable(null);
    }
  };
  const addNewDbToNode = (table: DbTableType) => {
    const newNode = {
      id: table.name,
      data: table,
      position: { x: 100, y: 100 },
      type: "model",
    };
    setNodes((nodes) => [...nodes, newNode]);
    console.log(newNode);
    setTables((tables) => tables.filter((t) => t.name !== table.name));

    setSelectedTable(null);
  };

  const handleTableSelect = (name: string) => {
    const table = defaultDbTables.filter((t) => t.name === name);
    if (table[0]) {
      setSelectedTable(table[0]);
    }
  };

  const onSubmit = (values: z.infer<typeof addDatabaseFormSchema>) => {
    const newTable: DbTableType = {
      name: values.name,
      description: values.description,
      fields: defaultDbTables[0].fields,
    };
    setTables((tables) => [...tables, newTable]);
    setSelectedTable(newTable);
    addNewDbToNode(newTable);
    dialogCloseRef.current?.click();
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="w-full flex items-center justify-between">
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Diagrama Tablo Ekle</Button>
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
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"}>Yeni tablo Oluştur</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Yeni Tablo Oluşturun</DialogTitle>
                <DialogDescription>
                  Olşuturmak istediğiniz tabloyu diagrama ekleyebilirsiniz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tablo Adı</FormLabel>
                          <Input {...field} placeholder="Alan Adı" />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Açıklama</FormLabel>
                          <Textarea {...field} placeholder="Açıklama" />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
                <DialogFooter>
                  <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                    Ekle
                  </Button>
                  <DialogClose ref={dialogCloseRef} />
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        nodeTypes={modelTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls position="top-right" />
      </ReactFlow>
    </div>
  );
}

export default FlowDesigner;
