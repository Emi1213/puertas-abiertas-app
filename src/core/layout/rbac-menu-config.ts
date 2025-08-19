import {
  BriefcaseBusiness,
  Building2,
  Home,
  ScanFace,
  Users2,
} from "lucide-vue-next";

export interface ModuleMenuConfig {
  label: string;
  to: string;
  icon: any;
  order: number;
}

export const moduleMenuConfig: Record<string, ModuleMenuConfig> = {
  dashboard: {
    label: "Dashboard",
    to: "/dashboard",
    icon: Home,
    order: 0,
  },
  ingresos: {
    label: "Ingresos",
    to: "/ingresos",
    icon: ScanFace,
    order: 1,
  },
  empresas: {
    label: "Empresas",
    to: "/empresas",
    icon: Building2,
    order: 2,
  },
  usuarios: {
    label: "Usuarios",
    to: "/usuarios",
    icon: Users2,
    order: 3,
  },
  personal: {
    label: "Personal",
    to: "/personal",
    icon: BriefcaseBusiness,
    order: 4,
  },
  perfiles: {
    label: "Perfiles",
    to: "/perfiles",
    icon: Users2,
    order: 5,
  },
};

export function createMenuItemsFromModules(modules: { alias: string }[]) {
  return modules
    .map((modulo) => {
      const config = moduleMenuConfig[modulo.alias];
      if (!config) return null;

      return {
        label: config.label,
        to: config.to,
        alias: modulo.alias,
        icon: config.icon,
        order: config.order,
      };
    })
    .filter((item) => item !== null)
    .sort((a, b) => a!.order - b!.order);
}
