"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Handle, NodeProps, Position } from "reactflow";
import { Model } from "@/types";
import { Cross, Key, KeyRound } from "lucide-react";

const ModelNode = ({ data }: NodeProps<Model>) => {
  return (
    <Card>
      <CardHeader className="bg-[#3d5787] rounded-t-lg h-10 flex items-center justify-center">
        <CardTitle className="text-base">{data.name}</CardTitle>
      </CardHeader>
      <CardContent
        style={{ overflow: "auto" }}
        className={`bg-[#282828] w-full p-0 nowheel max-h-[500px]  `}
      >
        <ul className="bg-[#282828] w-full ">
          {data.fields &&
            data.fields.map(
              ({ name, type, hasConnections, isIdentity }, index) => (
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
                    <div>{name}</div>
                  </div>
                  <div>{type}</div>

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
    </Card>
  );
};

export default ModelNode;
