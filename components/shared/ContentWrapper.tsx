import React from "react";

interface ContentWrapperProps {
  children: React.ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <div className="flex flex-col p-8 md:px-12 gap-6 justify-start items-center">
      {children}
    </div>
  );
}
