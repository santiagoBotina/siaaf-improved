"use client";
import { memo } from "react";
import { usePathname } from "next/navigation";
import { SideBarItem } from "@/app/components/sidebar/sideBarItem";
import { H1 } from "@/app/components/Title/h1";

interface Route {
  path: string;
  label: string;
  icon: string;
}

interface Props {
  routes: Route[];
}

const Component = ({ routes }: Props) => {
  const currentPathname = usePathname();
  console.log(currentPathname);

  const isRouteSelected = (path: string) => {
    return currentPathname === path;
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen top-0 fixed left-0 z-10">
      <div className="p-7 flex-shrink-0">
        <H1 title="Wabi" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <nav className="space-y-2">
            {routes.map(({ path, label, icon }: Route, index: number) => (
              <SideBarItem
                key={index}
                isItemSelected={isRouteSelected(path)}
                icon={icon}
                path={path}
                label={label}
              />
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <SideBarItem icon="logout" path="/login" label="Cerrar sesión" />
      </div>
    </div>
  );
};

const SideBar = memo(Component);

export { SideBar };
