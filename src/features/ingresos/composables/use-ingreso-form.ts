import { ref } from "vue";
import { useForm } from "@/lib/composables/use-form";
import { z } from "zod";
import type { IEmpresa } from "@/features/empresas/interfaces/IEmpresa";
import type { IPersonal } from "@/features/personal/interfaces/IPersonal";
import { ESTADOS_INGRESO } from "../interfaces/EstadosIngreso";

export const ingresoSchema = z
  .object({
    personalId: z.number().min(1, "Debe seleccionar personal"),
    fechaInicio: z.date(),
    fechaFin: z.date().optional(),
    duracion: z.string().optional(),
    comentario: z.string().optional(),
    idMotivo: z.string().optional(),
    tipoMotivo: z.enum(["INCIDENTE", "CAMBIO", "OTROS"]),
    causa: z.string().optional(),
    fechaRecon: z.date().optional(),
    usuarioReconId: z.number().optional(),
    estado: z.string().optional().default(ESTADOS_INGRESO.EN_PROCESO),
  })
  .refine(
    (data) => {

      if (data.fechaFin && data.fechaInicio) {
        return data.fechaFin >= data.fechaInicio;
      }
      return true;
    },
    {
      message: "La fecha de fin debe ser posterior a la fecha de inicio",
      path: ["fechaFin"],
    }
  );

export type IngresoFormData = z.infer<typeof ingresoSchema>;
export type MotivoType = "INCIDENTE" | "CAMBIO" | "OTROS";

export function useIngresoForm() {
  const loading = ref(false);

  const selectedEmpresa = ref<IEmpresa | null>(null);
  const selectedPersonal = ref<IPersonal | null>(null);

  const initialFormData: Partial<IngresoFormData> = {
    personalId: 0,
    tipoMotivo: "INCIDENTE" as MotivoType,
    fechaInicio: new Date(),
    fechaFin: undefined,
    comentario: "",
    estado: ESTADOS_INGRESO.EN_PROCESO,
  };

  const {
    formData,
    errors,
    handleSubmit: originalHandleSubmit,
    validateField,
    resetForm,
  } = useForm(ingresoSchema, initialFormData);

  const motivosOptions = [
    { value: "INCIDENTE", label: "Incidente" },
    { value: "CAMBIO", label: "Cambio" },
    { value: "OTROS", label: "Otros" },
  ] as const;

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const handleEmpresaChange = (_empresaId: number | undefined) => {
    // No se envía al servidor, solo para filtrar personal
  };

  const handleEmpresaModelChange = (empresa: IEmpresa | null) => {
    selectedEmpresa.value = empresa;
    // Limpiar personal seleccionado cuando cambia la empresa
    if (
      selectedPersonal.value &&
      empresa?.id !== selectedPersonal.value.empresa.id
    ) {
      selectedPersonal.value = null;
      formData.personalId = 0;
    }
  };

  // Manejar selección de personal
  const handlePersonalChange = (personalId: number | undefined) => {
    formData.personalId = personalId || 0;
    if (personalId) {
      validateField("personalId");
    }
  };

  const handlePersonalModelChange = (personal: IPersonal | null) => {
    selectedPersonal.value = personal;
  };

  // Handle submit con tipado correcto
  const handleFormSubmit = async (
    onValid: (data: IngresoFormData) => Promise<void>
  ) => {
    if (loading.value) return;

    await originalHandleSubmit(async (validatedData) => {
      loading.value = true;
      try {
        // Convertir el tipo validated a IngresoFormData
        const ingresoData: IngresoFormData = validatedData as IngresoFormData;
        await onValid(ingresoData);
      } finally {
        loading.value = false;
      }
    });
  };

  return {
    // Form data
    formData,
    errors,
    loading,

    // Additional state
    selectedEmpresa,
    selectedPersonal,

    // Options
    motivosOptions,
    minDate,
    maxDate,

    // Handlers
    handleEmpresaChange,
    handleEmpresaModelChange,
    handlePersonalChange,
    handlePersonalModelChange,
    handleFormSubmit,
    validateField,
    resetForm,
  };
}
