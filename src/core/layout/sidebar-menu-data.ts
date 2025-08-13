import {
  BriefcaseBusiness,
  Building2,
  Home,
  ScanFace,
  Users2,
} from "lucide-vue-next";

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
        label: "Dashboard",
        to: "/dashboard",
        icon: Home,
      },
      {
        label: "Ingresos",
        to: "/ingresos",
        icon: ScanFace,
        roles: ["admin", "vigilante", "Lectura"],
      },
      {
        label: "Empresas",
        to: "/empresas",
        icon: Building2,
        roles: ["admin", "supervisor", "Lectura"],
      },
      {
        label: "Usuarios",
        to: "/usuarios",
        icon: Users2,
        roles: ["admin", "vigilante", "Lectura"],
      },
      {
        label: "Personal",
        to: "/personal",
        icon: BriefcaseBusiness,
        roles: ["admin", "supervisor", "Lectura"],
      },
    ],
  },
];
