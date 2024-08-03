import InfoCardList from "@/components/dashboard/InfoCardList";
import TaskList from "@/components/dashboard/tasklist/TaskList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="w-full flex flex-col gap-10">
          <InfoCardList />
          <TaskList />
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardPage;
