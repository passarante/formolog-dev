"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createWorkflowSchema } from "@/schemas";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
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
import { createWorkFlow } from "@/actions/workflow-actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const CreateWorkFlowPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof createWorkflowSchema>>({
    resolver: zodResolver(createWorkflowSchema),
  });

  const onSubmit = (values: z.infer<typeof createWorkflowSchema>) => {
    createWorkFlow(values, "1")
      .then((res) => {
        if (res.success) {
          toast({
            title: "Bilgi",
            description: "Proje eklendi",
          });
          router.push("/workflows");
        } else {
          toast({
            variant: "destructive",
            title: "Hata!",
            description: res.error as string,
          });
        }
      })
      .catch((err) => {
        console.log("ERR", err);
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
        href="/workflows"
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
                    <FormLabel>Proje Adı</FormLabel>
                    <Input {...field} placeholder="Proje Adı" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firma Adı</FormLabel>
                    <Input {...field} placeholder="Firma Adı" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <Textarea {...field} placeholder="Firma Adı" />
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

export default CreateWorkFlowPage;
