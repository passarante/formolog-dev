"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { WorkFlow } from "@prisma/client";
import { getUserWorkflows } from "@/actions/workflow-actions";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const WorkflowsPage = () => {
  const [workflows, setWorkflows] = useState<WorkFlow[]>([]);

  useEffect(() => {
    getUserWorkflows("1")
      .then((res) => {
        if (res && res.data) {
          setWorkflows(res.data);
        }
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }, []);

  return (
    <Card className="w-2/3 mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projelerim</CardTitle>
        <Link href="/workflows/create">
          <Button size={"sm"} variant={"outline"}>
            <Plus className="w-4 h-4 mr-2" /> Yeni Ekle
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex w-full items-center justify-center ">
        <Table>
          <TableCaption>Projeleriniz</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Proje Adı</TableHead>
              <TableHead>Firma</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead className="text-right">-</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows.map((workflow) => (
              <TableRow key={workflow.id}>
                <TableCell className="font-medium">{workflow.name}</TableCell>
                <TableCell>{workflow.company}</TableCell>
                <TableCell>{workflow.description}</TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <div className=" space-x-2 ">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size={"icon"}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Projenizin detayları</p>
                        </TooltipContent>
                      </Tooltip>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size={"icon"}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {`${workflow.name} projesini silmek istediginden emin misiniz?`}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu işlem geri alınamaz, projeyi sildiğinizde
                              projeye bağlı veritabanı ve form bilgileri de
                              silinecektir.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction>Sil</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WorkflowsPage;
