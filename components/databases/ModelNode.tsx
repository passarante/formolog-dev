"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Handle, NodeProps, Position } from "reactflow";
import { Model } from "@/types";
import { Edit, KeyRound, Plus, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { toast } from "../ui/use-toast";
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
} from "../ui/alert-dialog";

const ModelNode = ({ data }: NodeProps<Model>) => {
  const addFieldRef = useRef<HTMLButtonElement>(null);
  const [selectedFieldName, setSelectedFieldName] = useState<string>("");

  const [editMode, setEditMode] = useState(false);

  const addFieldFormSchema = z.object({
    fieldName: z
      .string()
      .min(3, { message: "Alan adı en az 3 karakter olmalıdır" }),
    fieldType: z.string(),
    description: z.optional(z.string()),
    isNullable: z.optional(z.boolean()),
  });

  const form = useForm<z.infer<typeof addFieldFormSchema>>({
    resolver: zodResolver(addFieldFormSchema),
  });

  const handleAddFieldClick = () => {
    if (addFieldRef && addFieldRef.current) {
      form.reset();
      setEditMode(false);
      addFieldRef.current.click();
    }
  };

  const handleEditFieldClick = (
    name: string,
    type: string,
    description: string = "",
    isNullable: boolean = false
  ) => {
    form.setValue("fieldName", name);
    form.setValue("fieldType", type);
    form.setValue("description", description);
    form.setValue("isNullable", isNullable);
    if (addFieldRef && addFieldRef.current) {
      setEditMode(true);
      setSelectedFieldName(name);
      addFieldRef.current.click();
    }
  };

  const onSubmit = (values: z.infer<typeof addFieldFormSchema>) => {
    if (editMode) {
      if (selectedFieldName !== values.fieldName) {
        const existingField = data.fields.find(
          (field) => field.name === values.fieldName
        );
        if (existingField) {
          toast({
            variant: "destructive",
            title: "Hata!",
            description: "Alan adı zaten var",
          });
          return;
        }
        console.log("object");
      }
      const index = data.fields.findIndex(
        (field) => field.name === selectedFieldName
      );
      if (index !== -1) {
        data.fields[index].name = values.fieldName;
        data.fields[index].type = values.fieldType;
        data.fields[index].description = values.description;
        data.fields[index].isNullable = values.isNullable;
      }
      setEditMode(false);
      form.reset();
    } else {
      const existingField = data.fields.find(
        (field) => field.name === values.fieldName
      );
      if (existingField) {
        toast({
          variant: "destructive",
          title: "Hata!",
          description: "Alan adı zaten var",
        });
        return;
      } else {
        data.fields.unshift({
          name: values.fieldName,
          type: values.fieldType,
          description: values.description,
          hasConnections: false,
          isNullable: values.isNullable,
          isDefault: false,
        });
      }
    }
  };

  const handleDeleteField = (name: string) => {
    const index = data.fields.findIndex((field) => field.name === name);
    if (index !== -1) {
      console.log("Name", name, index);
      data.fields = data.fields.filter((field) => field.name !== name);
      console.log(data.fields);
    }
    toast({
      title: "Alan silindi.Güncellemek için lütfen ekrana tıklayın.",
    });
  };

  return (
    <Card>
      <CardHeader className="bg-[#3d5787] rounded-t-lg h-10 flex items-center justify-center relative">
        <CardTitle className="text-base">{data.name}</CardTitle>
        <div className="absolute right-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Plus className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleAddFieldClick}>
                Yeni Alan
              </DropdownMenuItem>
              <DropdownMenuItem>Yeni İlişki</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent
        style={{ overflow: "auto" }}
        className={`bg-[#282828] w-full p-0 nowheel max-h-[500px]  `}
      >
        <ul className="bg-[#282828] w-full ">
          {data.fields &&
            data.fields.map(
              (
                {
                  name,
                  type,
                  hasConnections,
                  isIdentity,
                  description,
                  isNullable,
                  isDefault,
                },
                index
              ) => (
                <li
                  key={index}
                  className={`flex justify-between gap-4 px-2 py-1 w-96 ${
                    index % 2 ? "bg-[#232323]" : "bg-[#282828]"
                  }`}
                >
                  {data.isChild && (
                    <Handle
                      id={data.name}
                      position={Position.Top}
                      type="target"
                    />
                  )}
                  <div className="flex flex-1 items-center">
                    {isIdentity ? (
                      <KeyRound className="w-4 h-4 mr-1 text-yellow-600" />
                    ) : (
                      ""
                    )}
                    <div
                      className={`${
                        isDefault ? "text-white/60" : "text-white"
                      }`}
                    >
                      {name}
                    </div>
                  </div>
                  <div
                    className={`${isDefault ? "text-white/60" : "text-white"}`}
                  >
                    {type}
                  </div>
                  {!isDefault && (
                    <div className="flex items-center justify-center space-x-2">
                      <Edit
                        className="w-4 h-4"
                        onClick={() =>
                          handleEditFieldClick(
                            name,
                            type,
                            description,
                            isNullable
                          )
                        }
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Trash className="w-4 h-4 text-red-500" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {name} alanını silmek istediğinize emin misiniz?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu işlem geri alınamaz. Lütfen alanı silmek
                              istediğinizden eminseniz Sil butonuna tıklayın.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteField(name)}
                            >
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}

                  {hasConnections && (
                    <Handle
                      position={Position.Right}
                      id={`${data.name}-${name}`}
                      type="source"
                      style={{ top: 36 + 18 + 36 * index }}
                    />
                  )}
                </li>
              )
            )}
        </ul>
      </CardContent>

      <div className="hidden">
        <Dialog>
          <DialogTrigger ref={addFieldRef}></DialogTrigger>
          <DialogContent
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
          >
            <DialogHeader>
              <DialogTitle>
                <div>
                  {editMode
                    ? "Alanı Düzenle"
                    : data.name + "Tablosuna yeni alan ekleme"}
                </div>
              </DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4 mt-4"
                  >
                    <FormField
                      name="fieldName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alan Adı</FormLabel>
                          <Input {...field} placeholder="Alan Adı" />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="fieldType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alan Tipi</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Lütfen alan tipini seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="String">String</SelectItem>
                              <SelectItem value="Integer">Integer</SelectItem>
                              <SelectItem value="Boolean">Boolean</SelectItem>
                              <SelectItem value="DateTime">DateTime</SelectItem>
                              <SelectItem value="Decimal">Decimal</SelectItem>
                              <SelectItem value="Float">Float</SelectItem>
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
                    <FormField
                      name="isNullable"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="terms"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Boş bırakılabilir (Nullable Field)
                            </label>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <DialogClose>
                        <Button className="mt-4">Kaydet</Button>
                      </DialogClose>
                    </div>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default ModelNode;
