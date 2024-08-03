import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

type InfoCardProps = {
  title: string;
  value: string;
  icon: JSX.Element;
  link: string;
  borderColor: string;
};

const InfoCard = ({ title, value, icon, link, borderColor }: InfoCardProps) => {
  return (
    <Card
      className={`border-r-${borderColor}-600 border-b-${borderColor}-600 border-2  hover:border-${borderColor}-600 
        hover:border-b-0 hover:border-r-0 shadow-md transition-all duration-200 cursor-pointer`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">4</div>
        <Link href={link} className="group">
          <p
            className={`text-sm text-muted-foreground hover:text-${borderColor}-500 transition-all duration-200`}
          >
            Tümünü Göster
          </p>
        </Link>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
