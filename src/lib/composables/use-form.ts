// src/lib/composables/use-form.ts
import { ref, reactive, toRaw } from 'vue'
import { type ZodSchema, ZodError } from 'zod'

export function useForm<T extends Record<string, any>>(
  initialSchema: ZodSchema<T>,
  initialValues?: Partial<T>
) {
  const schema = ref<ZodSchema<T>>(initialSchema)
  const formData = reactive<T>({} as T)
  const errors = ref<Record<keyof T, string | null>>({} as Record<keyof T, string | null>)

  const resetErrors = () => {
    for (const key in errors.value) {
      errors.value[key as keyof T] = null
    }
  }

  const updateErrorsFromZod = (error: ZodError<T>) => {
    resetErrors()
    for (const err of error.issues) {
      const field = err.path[0] as keyof T
      errors.value[field] = err.message
    }
  }

  const validate = (): boolean => {
    try {
      const dataToValidate = { ...toRaw(formData) } as T

      for (const key of Object.keys(dataToValidate)) {
        if (dataToValidate[key] === '') delete dataToValidate[key]
      }

      schema.value.parse(dataToValidate)
      resetErrors()
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        updateErrorsFromZod(error as ZodError<T>)
      }
      return false
    }
  }

  const validateField = (field: keyof T): void => {
    try {
      if ((formData as any)[field] === '') {
        errors.value[field] = null
        return
      }

      const dataToValidate = { ...toRaw(formData) } as T
      schema.value.parse(dataToValidate)
      errors.value[field] = null
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldError = error.issues.find((err) => err.path[0] === field)
        errors.value[field] = fieldError?.message ?? null
      }
    }
  }

  const resetForm = (values?: Partial<T>) => {
    const defaults = values || initialValues || {}
    Object.assign(formData, defaults)
    resetErrors()
  }

  const handleSubmit = (callback: (data: T) => void) => {
    if (validate()) {
      const dataToSubmit = { ...toRaw(formData) } as T
      for (const key in dataToSubmit) {
        if (dataToSubmit[key] === '') delete dataToSubmit[key]
      }
      callback(dataToSubmit)
    }
  }

  const setSchema = (newSchema: ZodSchema<T>) => {
    schema.value = newSchema
    validate()
  }

  if (initialValues) {
    resetForm(initialValues)
  }

  return {
    formData,
    errors,
    handleSubmit,
    validateField,
    resetForm,
    setSchema,
  }
}
