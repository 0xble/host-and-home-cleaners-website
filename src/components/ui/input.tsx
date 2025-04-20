import { cn } from '@/lib/utils'

import * as React from 'react'

type BaseInputProps = Omit<React.ComponentProps<'input'>, 'placeholder'>;

type StandardInputProps = BaseInputProps & {
  placeholder?: string;
  label?: never;
};

type LabelInputProps = BaseInputProps & {
  label: string;
  placeholder?: never;
};

type InputProps = StandardInputProps | LabelInputProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, placeholder, value = '', ...props }, ref) => {
    if (label) {
      return (
        <div className="relative">
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-neutral-400 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-shade focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-900 dark:bg-shade dark:ring-offset-shade dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
              'peer pt-4 placeholder:opacity-0',
              className,
            )}
            ref={ref}
            placeholder={label}
            value={value}
            {...props}
          />
          <label
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 transition-all duration-200',
              'peer-focus:-translate-y-[22px] peer-focus:text-xs peer-focus:text-neutral-600',
              'peer-[:not(:placeholder-shown)]:-translate-y-[22px] peer-[:not(:placeholder-shown)]:text-xs',
              'dark:text-neutral-400 dark:peer-focus:text-neutral-300 dark:peer-[:not(:placeholder-shown)]:text-neutral-300'
            )}
          >
            {label}
          </label>
        </div>
      )
    }
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-neutral-400 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-shade placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-shade focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-shade dark:bg-shade dark:ring-offset-shade dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
          className,
        )}
        ref={ref}
        placeholder={placeholder}
        value={value}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
