import { useTranslation } from 'react-i18next'

export const Label = ({
  label,
  name,
  labelClassName,
  required
}: {
  label: string
  name: string
  labelClassName?: string
  required?: boolean
}) => {
  const { t } = useTranslation()

  return (
    <label
      title={label}
      htmlFor={name}
      className={
        "w-[100px] lg:w-[120px] shrink-0 font-medium text-gray-600 text-ellipsis text-xs whitespace max-h-[32px] capitalize flex items-center gap-2 " +
        labelClassName
      }
    >
      {t(label)?.replace(/_/g, " ")}
      {required ? (
        <span className="text-red-500 mx-1">*</span>
      ) : null}
    </label>
  )
}
