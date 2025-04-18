interface SelectionCardProps {
  title: string
  description?: string
  isSelected: boolean
  onClick: () => void
  isDisabled?: boolean
}

export function BookingFormOption({
  title,
  description,
  isSelected,
  onClick,
  isDisabled = false,
}: SelectionCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-between rounded-md border
        ${isDisabled
      ? 'border-muted bg-popover cursor-pointer opacity-70 hover:border-gray-400 hover:opacity-100'
      : isSelected
        ? 'border-primary'
        : 'border-muted bg-popover hover:bg-accent hover:text-accent-foreground'
    } cursor-pointer p-4 transition-all`}
      onClick={onClick}
    >
      <span className="text-center font-medium">{title}</span>
      {description && (
        <span className="text-muted-foreground mt-2 text-center text-xs">{description}</span>
      )}
    </div>
  )
}
