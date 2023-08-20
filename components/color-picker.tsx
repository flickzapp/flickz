"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Icons } from "@/components/icons";

export function ColorPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const solids = [
    "#E2E2E2",
    "#ff75c3",
    "#ffa647",
    "#ffe83f",
    "#9fff5b",
    "#70e2ff",
    "#cd93ff",
    "#09203f",
    "#ffffff",
    "#000C40",
    "#BBD2C5",
    "#5433FF",
    "#C9FFBF",
    "#485563",
    "#e53935",
    "#EECDA3",
  ];

  const gradients = [
    "linear-gradient(to bottom right,#accbee,#e7f0fd)",
    "linear-gradient(to bottom right,#d5d4d0,#d5d4d0,#eeeeec)",
    "linear-gradient(to bottom right,#000000,#434343)",
    "linear-gradient(to bottom right,#09203f,#537895)",
    "linear-gradient(to bottom right,#AC32E4,#7918F2,#4801FF)",
    "linear-gradient(to bottom right,#f953c6,#b91d73)",
    "linear-gradient(to bottom right,#ee0979,#ff6a00)",
    "linear-gradient(to bottom right,#F00000,#DC281E)",
    "linear-gradient(to bottom right,#00c6ff,#0072ff)",
    "linear-gradient(to bottom right,#4facfe,#00f2fe)",
    "linear-gradient(to bottom right,#0ba360,#3cba92)",
    "linear-gradient(to bottom right,#FDFC47,#24FE41)",
    "linear-gradient(to bottom right,#8a2be2,#0000cd,#228b22,#ccff00)",
    "linear-gradient(to bottom right,#40E0D0,#FF8C00,#FF0080)",
    "linear-gradient(to bottom right,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)",
    "linear-gradient(to bottom right,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
    "linear-gradient(to top left,#16222A,#3A6073)",
    "linear-gradient(to top left,#acb6e5,#86fde8)",
    "linear-gradient(to top left,#091E3A,#2F80ED,#2D9EE0)",
    "linear-gradient(to top left,#FF512F,#F09819)",
    "linear-gradient(to top left,#f857a6,#ff5858)",
    "linear-gradient(to top left,#ECE9E6,#FFFFFF)",
    "linear-gradient(to top left,#9EFBD3,#57E9F2,#45D4FB)",
    "linear-gradient(to top left,#5433FF,#20BDFF,#A5FECB)",
  ];

  // const images = [
  //   "url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  //   "url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90",
  //   "url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  //   "url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  // ];

  const defaultTab = useMemo(() => {
    if (background.includes("url")) return "image";
    if (background.includes("gradient")) return "gradient";
    return "solid";
  }, [background]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full max-w-[250px] justify-start text-left font-normal",
            !background && "text-muted-foreground",
            className
          )}
        >
          <div className="flex w-full items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Icons.paintBrush className="h-4 w-4" />
            )}
            <div className="flex-1 truncate">
              {background ? background : "Pick a color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
            {/* <TabsTrigger className="flex-1" value="image">
              Image
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="solid" className="mt-0 flex flex-wrap gap-1">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
            <div className="mb-2 flex flex-wrap gap-1">
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Don't remove the below content please */}

          {/* 
          <TabsContent value="image" className="mt-0">
            <div className="mb-2 grid grid-cols-2 gap-1">
              {images.map((s) => (
                <div
                  key={s}
                  style={{ backgroundImage: s }}
                  className="h-12 w-full cursor-pointer rounded-md bg-cover bg-center active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent> */}
        </Tabs>

        <Input
          id="custom"
          value={background}
          className="col-span-2 mt-4 h-8"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
