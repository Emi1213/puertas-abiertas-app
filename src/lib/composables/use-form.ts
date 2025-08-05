import { ref, reactive, toRaw } from "vue";
import { ZodError, ZodObject } from "zod";
import type { ZodRawShape } from "zod";

export function useForm<T extends Record<string, any>>(
  initialSchema: ZodObject<ZodRawShape>,
  initialValues?: Partial<T>
) {
  const schema = ref(initialSchema);

  const formData = reactive({ ...(initialValues || {}) }) as T;
  const errors = ref<Record<keyof T, string | null>>(
    {} as Record<keyof T, string | null>
  );

  const resetErrors = () => {
    for (const key in errors.value) {
      errors.value[key as keyof T] = null;
    }
  };

  const updateErrorsFromZod = (error: ZodError<T>) => {
    resetErrors();
    for (const err of error.issues) {
      const field = err.path[0] as keyof T;
      errors.value[field] = err.message;
    }
  };

  const validate = (): boolean => {
    try {
      const dataToValidate = { ...toRaw(formData) } as T;
      schema.value.parse(dataToValidate);
      resetErrors();
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        updateErrorsFromZod(error as ZodError<T>);
      }
      return false;
    }
  };

  const validateField = (field: keyof T): void => {
    try {
      const dataToValidate = { ...toRaw(formData) } as T;
      schema.value.parse(dataToValidate);
      errors.value[field] = null;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldError = error.issues.find((err) => err.path[0] === field);
        errors.value[field] = fieldError?.message ?? null;
      }
    }
  };

  const resetForm = (values?: Partial<T>) => {
    Object.assign(formData, values || initialValues || {});
    resetErrors();
  };

  const handleSubmit = async (callback: (data: T) => Promise<void>) => {
    if (validate()) {
      const dataToSubmit = { ...toRaw(formData) } as T;
      await callback(dataToSubmit);
    }
  };

  const setSchema = (newSchema: ZodObject<ZodRawShape>) => {
    schema.value = newSchema;
    validate();
  };

  return {
    formData,
    errors,
    handleSubmit,
    validateField,
    resetForm,
    setSchema,
  };
}
