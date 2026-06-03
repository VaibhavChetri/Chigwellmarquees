import { forwardRef, useId } from "react";
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

const controlClass = cn(
  "w-full bg-ivory text-ink font-sans text-[var(--step-0)]",
  "border border-ink/20 rounded-[var(--radius-input)]",
  "px-4 py-3 min-h-11",
  "transition-colors duration-[var(--dur-micro)]",
  "focus:border-gold focus:outline-none",
  "placeholder:text-taupe/70",
);

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
};

function FieldWrapper({ label, htmlFor, error, required, hint, children, className }: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-ink-soft"
      >
        {label}
        {required && <span className="ml-1 text-rose-deep">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[0.78rem] text-taupe">{hint}</p>}
      {error && (
        <p role="alert" className="text-[0.78rem] text-rose-deep">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export const Field = forwardRef<HTMLInputElement, InputProps>(function Field(
  { label, error, hint, required, wrapperClassName, id, className, ...rest },
  ref,
) {
  const reactId = useId();
  const fieldId = id ?? reactId;
  return (
    <FieldWrapper
      label={label}
      htmlFor={fieldId}
      error={error}
      hint={hint}
      required={required}
      className={wrapperClassName}
    >
      <input
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(controlClass, className)}
        {...rest}
      />
    </FieldWrapper>
  );
});

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, required, wrapperClassName, id, className, children, ...rest },
  ref,
) {
  const reactId = useId();
  const fieldId = id ?? reactId;
  return (
    <FieldWrapper
      label={label}
      htmlFor={fieldId}
      error={error}
      hint={hint}
      required={required}
      className={wrapperClassName}
    >
      <select
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(controlClass, "appearance-none pr-10", className)}
        {...rest}
      >
        {children}
      </select>
    </FieldWrapper>
  );
});

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, required, wrapperClassName, id, className, ...rest },
  ref,
) {
  const reactId = useId();
  const fieldId = id ?? reactId;
  return (
    <FieldWrapper
      label={label}
      htmlFor={fieldId}
      error={error}
      hint={hint}
      required={required}
      className={wrapperClassName}
    >
      <textarea
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(controlClass, "min-h-28 resize-y", className)}
        {...rest}
      />
    </FieldWrapper>
  );
});
