// default-layout.tsx
import { AppHeader } from "@/components/container/header";
import { Sidebar } from "@/components/container/sidebar";
import { useState, useEffect } from "react";

type DefaultLayoutProps = {
  children: React.ReactNode;
  pageTitle?: string;
  subTitle?: string;
  className?: string;
  search?: {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
  };
};

export default function DefaultLayout(props: DefaultLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;

    const savedState = localStorage.getItem("sidebarOpen");
    return savedState !== null ? JSON.parse(savedState) : window.innerWidth >= 768;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen">
      <main className={`transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-16"}`}>
        <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
        <AppHeader
          title={props.pageTitle}
          subTitle={props.subTitle}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          {...(props.search ? { search: props.search } : {})}
        />
        <section className={`p-5 md:p-6 ${props.className || ""}`}>{props.children}</section>
      </main>
    </div>
  );
}
