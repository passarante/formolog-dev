"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createDatabaseSchema, createWorkflowSchema } from "@/schemas";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createDatabase } from "@/actions/database-actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkFlow } from "@prisma/client";
import { getUserWorkflows } from "@/actions/workflow-actions";

const CreateDatabasePage = () => {
  const [workflows, setWorkflows] = useState<WorkFlow[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    getUserWorkflows("1").then((res) => {
      if (res && res.data) {
        if (res.data.length > 0) {
          setWorkflows(res.data);
        } else {
          toast({
            variant: "destructive",
            title: "Hata!",
            description: "Proje bulunamadı, lütfen önce proje ekleyin",
          });
          router.push("/workflows/create");
        }
      }
    });
  }, [router, toast]);

  const form = useForm<z.infer<typeof createDatabaseSchema>>({
    resolver: zodResolver(createDatabaseSchema),
  });

  const onSubmit = (values: z.infer<typeof createDatabaseSchema>) => {
    createDatabase(values, "1")
      .then((res) => {
        if (res.success) {
          toast({
            title: "Bilgi",
            description: "Veritabanı eklendi",
          });
          router.push("/databases");
        } else {
          toast({
            variant: "destructive",
            title: "Hata!",
            description: res.error as string,
          });
        }
      })
      .catch((err) => {
        console.log("ERR", JSON.stringify(err));
        toast({
          variant: "destructive",
          title: "Hata!",
          description: "Sunucu hatası lütfen tekrar deneyin",
        });
      });
  };

  return (
    <div className="flex flex-col space-y-4">
      <Link
        href="/databases"
        className="flex items-center space-x-2 cursor-pointer hover:text-muted-foreground transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
        Geri
      </Link>

      <Card className="w-2/3 mx-auto">
        <CardHeader className="flex flex-row items-center space-x-2">
          <CardTitle>Yeni Proje Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veritabanı Adı</FormLabel>
                    <Input {...field} placeholder="Veritabanı Adı" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="workflowId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proje Adı</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-1/3">
                        <SelectValue placeholder="Proje seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {workflows.map((workflow) => (
                          <SelectItem key={workflow.id} value={workflow.id}>
                            {workflow.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              <div>
                <Button className="mt-4">Kaydet</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDatabasePage;
