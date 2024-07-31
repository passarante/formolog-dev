import React from "react";
import Sidebar from "@/components/sidebar";
import InfoBar from "@/components/infobar";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="w-full">
        <Image src={"/logo.png"} width={200} height={50} alt="logo" />
        <InfoBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
