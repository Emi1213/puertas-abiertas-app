import { Building2, ScanFace, Users2 } from "lucide-vue-next";

export interface SidebarItem {
  label: string;
  to: string;
  icon: any;
  roles?: string[];
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export const sidebarMenu: SidebarSection[] = [
  {
    title: "Principal",
    items: [
      {
        label: "Empresas",
        to: "/companies",
        icon: Building2,
        roles: ["admin", "supervisor", "Lectura"],
      },
      {
        label: "Ingresos",
        to: "/ingresos",
        icon: ScanFace,
        roles: ["admin", "vigilante", "Lectura"],
      },
      {
        label: "Usuarios",
        to: "/usuarios",
        icon: Users2,
        roles: ["admin", "vigilante", "Lectura"],
      },
    ],
  },
];
