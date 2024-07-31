"use client";
import { getDatabase } from "@/actions/database-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { defaultDbTables } from "@/constants";
import { Database } from "@prisma/client";
import { ChevronLeft, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DefaultDbType = {
  name: string;
};

const EditDatabasePage = () => {
  const { databaseId } = useParams();
  const [database, setDatabase] = useState<Database>();
  const [databaseTables, setDatabaseTables] =
    useState<DefaultDbType[]>(defaultDbTables);

  const [selectedTable, setSelectedTable] = useState<DefaultDbType>();

  useEffect(() => {
    getDatabase(databaseId.toString()).then((res) => {
      if (res && res.data) {
        setDatabase(res.data);
      }
    });
  }, [databaseId]);

  const columns: ColumnDef<DefaultDbType>[] = [
    {
      accessorKey: "name",
      header: "Tablo Adı",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size={"icon"}
                  onClick={() => setSelectedTable(data)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tablo detaylarını göster</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <Link
        href="/databases"
        className="flex items-center space-x-2 cursor-pointer hover:text-muted-foreground transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
        Geri
      </Link>
      <div className="w-full mt-4">
        <Card>
          <CardHeader>
            {database && <CardTitle>Veritabanı: {database.name}</CardTitle>}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <p>{selectedTable?.name}</p>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="border-b border-muted-foreground/50 pb-2 text-lg">
                    Tablolar
                  </CardTitle>
                  <CardContent>
                    <DataTable columns={columns} data={databaseTables} />
                  </CardContent>
                </CardHeader>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditDatabasePage;
