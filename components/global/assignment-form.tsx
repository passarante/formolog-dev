"use client";
import React from "react";
import { Form, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const AssignmentForm = () => {
  const formSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    firmName: z.string(),
    lastSchool: z.string(),
    lastSchoolDepartment: z.string(),
    dob: z.string(),
    lob: z.string(),
    city: z.string(),
    town: z.string(),
    message: z.string(),
    kvkk: z.boolean(),
    interest: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="flex flex-col w-full items-center p-4 ">
      <h3 className="text-3xl font-bold ">Başvuru Formu</h3>
      <div className="w-full mt-2">
        <Card>
          <CardContent className="p-4 shadow-md">
            <Form {...form}>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2  w-full gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        placeholder="Adınız Soyadınız"
                        {...field}
                        className="w-full"
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <Input
                        placeholder="Email Adresiniz"
                        type="email"
                        {...field}
                        className="w-full"
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <Input
                        placeholder="Cep Telefonu"
                        {...field}
                        className="w-full"
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="firmName"
                    render={({ field }) => (
                      <Input
                        placeholder="Çalışıyorsanız firma adınız"
                        {...field}
                        className="w-full"
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastSchool"
                    render={({ field }) => (
                      <Input
                        placeholder="En son mezun olduğunuz okul"
                        {...field}
                        className="w-full"
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastSchool"
                    render={({ field }) => (
                      <Input
                        placeholder="En son mezun olduğunuz bölüm"
                        {...field}
                        className="w-full"
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <Input
                        placeholder="Doğum Tarihiniz"
                        {...field}
                        className="w-full"
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lob"
                    render={({ field }) => (
                      <Input
                        placeholder="Doğum Yeriniz"
                        {...field}
                        className="w-full"
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <Input
                        placeholder="Yaşadığınız İl"
                        {...field}
                        className="w-full"
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="town"
                    render={({ field }) => (
                      <Input
                        placeholder="Yaşadığınız İlçe"
                        {...field}
                        className="w-full"
                      />
                    )}
                  />
                </div>
                <div className="col-span-2 mt-4">
                  <Label>Eğitimler</Label>
                  <div className="flex gap-4 ">
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="designer" />
                            <label
                              htmlFor="designer"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Tasarımcı
                            </label>
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="analyst" />
                            <label
                              htmlFor="analyst"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Analist
                            </label>
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="kr" />
                            <label
                              htmlFor="kr"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Kurulum Uzmanı
                            </label>
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="eg" />
                            <label
                              htmlFor="eg"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Eğitmen
                            </label>
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="st" />
                            <label
                              htmlFor="st"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Satış Temsilcisi
                            </label>
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="by" />
                            <label
                              htmlFor="by"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Çözüm Ortağı
                            </label>
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="en" />
                            <label
                              htmlFor="en"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Entegrasyon Uzmanı
                            </label>
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="yz" />
                            <label
                              htmlFor="yz"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Yazılım Uzmanı
                            </label>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-2 mt-4">
                  <div className="flex gap-4 items-center justify-between ">
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="kvkk" />
                            <label
                              htmlFor="kvkk"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              KVKK bilgilendirmesini okudum.
                            </label>
                          </div>
                        </div>
                      )}
                    />
                    <Button>BAŞVUR</Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-sm border-white p-2 border-[1px] rounded-md">
              6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca,
              Şirketimiz tarafından, Veri Sorumlusu sıfatıyla, kişisel
              verileriniz, iş amaçlarıyla bağlı olarak, aşağıda açıklandığı
              çerçevede kullanılmak, kaydedilmek, saklanmak, güncellenmek,
              aktarılmak ve/veya sınıflandırılmak suretiyle işlenecektir. Bu
              kapsamda Şirketimiz tarafından başta özel hayatın gizliliği olmak
              üzere, kişilerin temel hak ve özgürlüklerini korumak ve kişisel
              verilerin korunması amacıyla düzenlenen Kanun ve Yönetmelikler
              gereğince Şirketimiz, kişisel verilerinizin hukuka aykırı olarak
              işlenmesini önleme, hukuka aykırı olarak erişilmesini önleme ve
              muhafazasını sağlama amacıyla, uygun güvenlik düzeyini temin
              etmeye yönelik tüm teknik ve idari tedbirleri almaktadır. Bu
              metnin hedef kitlesi, Şirketimiz çalışanları veya Şirketimize iş
              başvurusu yapmış olan çalışan adayları dışındaki, Şirketimiz
              tarafından kişisel verileri işlenen tüm gerçek kişilerdir. Kişisel
              verilerin işlenme amaçları ve hukuki sebepleri; Tarafınızca
              paylaşılan kişisel verileriniz; Şirketimiz tarafından sunulan ürün
              ve hizmetlerden sizleri ve/veya temsil ettiğiniz kurum ve
              kuruluşları faydalandırmak için, Şirketimizin ticari ve iş
              stratejilerinin belirlenmesi ve uygulanması, pazarlama
              faaliyetlerinin yapılması, iş geliştirme ve planlama
              faaliyetlerinin gerçekleştirilmesi dahil ve fakat bunlarla sınırlı
              olmamak üzere gerekli çalışmaların yürütülmesi, Şirketimiz
              tarafından yürütülen iletişime yönelik idari operasyonların
              yürütülmesi, Şirketimizin kullanımda olan lokasyonların fiziksel
              güvenliğinin ve denetiminin sağlanması,İş ortağı/müşteri/tedarikçi
              (yetkili veya çalışanları) ilişkilerinin kurulması, İş
              ortaklarımız, tedarikçilerimiz veya sair üçüncü kişilerle birlikte
              sunulan ürün ve hizmetlere ilişkin sözleşme gereklerinin ve
              finansal mutabakatın sağlanması,Şirketimizin insan kaynakları
              politikalarının yürütülmesi, Şirketimizin çağrı merkezinin
              aranması veya internet sayfasının kullanılması, Şirketimizin
              düzenlediği eğitim, seminer veya organizasyonlara katılım
              sağlanması amacıyla işlenecektir.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AssignmentForm;
