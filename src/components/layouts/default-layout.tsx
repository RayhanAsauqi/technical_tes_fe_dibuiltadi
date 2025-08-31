import { AppHeader } from "@/components/container/header";
import { Sidebar } from "@/components/container/sidebar";
import { useState } from "react";

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
  // Tentukan default langsung di useState
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );

  return (
    <div className="min-h-screen">
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-16"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
        <AppHeader
          title={props.pageTitle}
          subTitle={props.subTitle}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          {...(props.search ? { search: props.search } : {})}
        />
        <section className={`p-5 md:p-6 ${props.className || ""}`}>
          {props.children}
        </section>
      </main>
    </div>
  );
}
