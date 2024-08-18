"use client";
import { getDatabase } from "@/actions/database-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import FlowDesigner from "@/components/databases/FlowDesigner";

const EditDatabasePage = () => {
  const { databaseId } = useParams();
  const [database, setDatabase] = useState<Database>();

  useEffect(() => {
    getDatabase(databaseId.toString()).then((res) => {
      if (res && res.data) {
        setDatabase(res.data);
      }
    });
  }, [databaseId]);

  return (
    <div className="w-full  ">
      <Link
        href="/databases"
        className="flex items-center space-x-2 cursor-pointer hover:text-muted-foreground transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
        Geri
      </Link>

      <div className="w-full  mt-4  ">
        <Card className="  w-full">
          <CardHeader>
            {database && (
              <CardTitle className="flex items-center justify-between ">
                <span>Veritabanı: {database.name}</span>
              </CardTitle>
            )}
          </CardHeader>
          <CardContent className="w-full h-[800px]">
            {/* <SchemaVisualizer /> */}
            <FlowDesigner />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditDatabasePage;
