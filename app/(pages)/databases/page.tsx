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
import { DatabaseWithWorkFlow } from "@/types";
import {
  deleteUserDatabase,
  getUserDatabases,
} from "@/actions/database-actions";
import { useToast } from "@/components/ui/use-toast";
import prisma from "@/lib/db";

const DatabasesPage = () => {
  const { toast } = useToast();
  const [databases, setDatabases] = useState<DatabaseWithWorkFlow[]>([]);

  useEffect(() => {
    getUserDatabases("1")
      .then((res) => {
        if (res && res.data) {
          setDatabases(res.data);
        }
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }, []);

  const deleteDatabase = async (id: string) => {
    try {
      const response = await deleteUserDatabase(id);
      if (response) {
        console.log(response);
        toast({
          title: "Bilgi",
          description: "Veritabanı silindi",
        });
        setDatabases((prev) => prev.filter((database) => database.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Hata!",
        description: "Veritabanı silinirken hata oluştu",
      });
    }
  };

  return (
    <Card className="w-2/3 mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Veritabanlarım</CardTitle>
        <Link href="/databases/create">
          <Button size={"sm"} variant={"outline"}>
            <Plus className="w-4 h-4 mr-2" /> Yeni Ekle
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex w-full items-center justify-center ">
        <Table>
          <TableCaption>Veritabanlarınız</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Veritabanı Adı</TableHead>
              <TableHead>Proje Adı</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead className="text-right">-</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {databases.map((database) => (
              <TableRow key={database.id}>
                <TableCell className="font-medium">{database.name}</TableCell>
                <TableCell>{database.workflow.name}</TableCell>
                <TableCell>{database.description}</TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <div className=" space-x-2 ">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/databases/edit/${database.id}`}>
                            <Button variant="outline" size={"icon"}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Veritabanı detayları</p>
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
                              {`${database.name} veritabanını silmek istediginden emin misiniz?`}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu işlem geri alınamaz, veritabanını sildiğinizde
                              veritabanına bağlı tabloları da silinecektir.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteDatabase(database.id)}
                            >
                              Sil
                            </AlertDialogAction>
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

export default DatabasesPage;
