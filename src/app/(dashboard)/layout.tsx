import { SideBar } from "@/app/components/sidebar";
import { NavBar } from "@/app/components/navBar";
import { ReactNode } from "react";

const routes = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: "home",
  },
  {
    path: "/calls",
    label: "Chats",
    icon: "phone",
  },
  {
    path: "/upload",
    label: "Subir archivos",
    icon: "file",
  },
];

export default function NexaTalkLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SideBar routes={routes} />
      <div className="ml-80">
        <NavBar />
        <main className="overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
