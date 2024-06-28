import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
import AssignmentForm from "@/components/global/assignment-form";
import { HeroParallax } from "@/components/global/connect-parallax";
import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { LampComponent } from "@/components/global/lamp";
import Navbar from "@/components/global/navbar";
import { Button } from "@/components/ui/button";
import { clients, products } from "@/lib/constant";

import { CheckIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="h-screen w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <Button
                  size={"lg"}
                  className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                >
                  <Link
                    href="#form"
                    className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black"
                  >
                    Hemen Başvur
                  </Link>
                </Button>
                <h1 className="text-5xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Formolog olmaya hazır mısınız?
                </h1>
              </div>
            }
          />
        </div>
      </section>
      {/* <InfiniteMovingCards
        className="md:mt-[18rem] mt-[-100px]"
        items={clients}
        direction="right"
        speed="slow"
      /> */}
      <section id="about" className="mt-40">
        <HeroParallax products={products}></HeroParallax>
      </section>
      <section className="mt-[-500px]" id="features">
        <LampComponent />
        <div className="grid md:grid-cols-4 grid-cols-1 items-center justify-center flex-col md:flex-row gap-8 -mt-72">
          <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card min-h-64  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                <span className="border border-white-[1px] p-2 rounded-md mb-1 cursor-pointer  ">
                  AN
                </span>
                <h2 className="text-3xl mt-2 ">Analist</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-4 dark:text-neutral-300 "
              >
                Müşteri ihtiyaçlarını analiz eden ve bunu tasarımcı formologlara
                ileten formologlardır. Analitik düşünebilme ve enpati
                yetenekleri analist formolog olmak için önemli kriterlerdir.
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card min-h-64  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                <span className="border border-white-[1px] p-2 rounded-md mb-1 cursor-pointer  ">
                  TS
                </span>
                <h2 className="text-3xl mt-2 ">Tasarımcı</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-4 dark:text-neutral-300 "
              >
                Platform üzerinde form ve ekran tasarımları yapan formologtur.
                Listeleri, raporları ve kontrol panellerini (dashboard)
                oluşturur.
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card min-h-64  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                <span className="border border-white-[1px] p-2 rounded-md mb-1 cursor-pointer  ">
                  KR
                </span>
                <h2 className="text-3xl mt-2 ">Kurulum Uzmanı</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-4 dark:text-neutral-300 "
              >
                Web tabanlı uygulamalar hazırladığımız için projelerin müşteri
                sunucularına kurulum ve yedekleme işlemlerinden sorumlu
                formologtur. Sunucu, donanım ve IIS ile ilgili teknik bilgi
                gerektirir.
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card min-h-64  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                <span className="border border-white-[1px] p-2 rounded-md mb-1 cursor-pointer  ">
                  EG
                </span>
                <h2 className="text-3xl mt-2 ">Eğitmen</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-4 dark:text-neutral-300 "
              >
                Tamamlanmış uygulamalar, formolog platformunun alt yapısı ve
                tasarımların nasıl geçekleştirileceği hakkında eğitimleri veren
                formologlardır.
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card min-h-64  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                <span className="border border-white-[1px] p-2 rounded-md mb-1 cursor-pointer  ">
                  EN
                </span>
                <h2 className="text-3xl mt-2 ">Entegrasyon Uzmanı</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-4 dark:text-neutral-300 "
              >
                Farklı ticari programlar ve alt yapılar konusunda uzmanlaşmış ve
                bu konularda tasarımcı formologlarla birlikte çözüm üreten
                formologlardır. Planladığımız entegrasyon eğitimlerinde uzman
                olduğunuz konularda yazılım geliştirebiliyor olacaksınız.
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card min-h-64  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                <span className="border border-white-[1px] p-2 rounded-md mb-1 cursor-pointer  ">
                  ST
                </span>
                <h2 className="text-3xl mt-2 ">Satış Temsilcisi</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-4 dark:text-neutral-300 "
              >
                Hep yapmak olmaz birilerinin de satması gerekiyor. Formolog
                eğitim noktalarından alacağınız eğitimler ile kısa sürede birçok
                sektörde yazılım konusunda uzman bir formolog olacaksınız.
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card min-h-64  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                <span className="border border-white-[1px] p-2 rounded-md mb-1 cursor-pointer  ">
                  BY
                </span>
                <h2 className="text-3xl mt-2 ">Çözüm Ortağı</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-4 dark:text-neutral-300 "
              >
                Veribis olarak Türkiye`de yazılım geliştirici firmalarla
                yıllardır süregelen stratejik ortaklıklarımızı her geçen gün
                güçlendiriyoruz. Çözüm ortağı formologlar kendi yazılımlarını
                üretetip bizimle ya da kendi başlarına satış pazarlama
                yapabilirler
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card min-h-64  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                <span className="border border-white-[1px] p-2 rounded-md mb-1 cursor-pointer  ">
                  YZ
                </span>
                <h2 className="text-3xl mt-2 ">Yazılım Uzmanı</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-4 dark:text-neutral-300 "
              >
                Çalıştığı proje ihtiyaçlarına göre araştırma ve geliştirme
                çalışmaları yapan, yazılım programları tasarlayan formologtur.
                Bilişim çağının getirdiği teknolojik gelişmelere bağlı projeler
                üretir.
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </section>
      <section id="form" className="mt-16  max-w-7xl  mx-auto">
        <div className="p-4">
          <AssignmentForm />
        </div>
      </section>
    </main>
  );
}
