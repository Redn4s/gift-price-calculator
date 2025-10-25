import { FC, PropsWithChildren } from "react";

import { Navbar } from "@/components/navbar";

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />

      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
    </div>
  );
};
