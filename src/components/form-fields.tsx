/**
 * Reusable form field components that follow the site's design system.
 * These provide consistent styling, error states, and accessibility
 * (aria-invalid, aria-describedby for error messages, proper labels).
 */
import { forwardRef, type ReactNode } from 'react';
import { type FieldError } from 'react-hook-form';

type BaseProps = {
  label: string;
  error?: FieldError;
  required?: boolean;
  hint?: string;
  id: string;
};

const baseInput =
  'w-full px-4 py-3 rounded-[14px] border bg-white text-ink placeholder-ink/40 font-body text-[0.95rem] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold/40';

const errorInput = 'border-crisis/60 focus:ring-crisis/25 focus:border-crisis';
const okInput = 'border-ink/15 hover:border-ink/25 focus:border-gold/70';

export function FormField({
  label,
  error,
  required,
  hint,
  id,
  children,
}: BaseProps & { children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block font-body text-[0.82rem] font-semibold text-ink"
      >
        {label}
        {required && <span className="ml-1 text-crisis" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="font-body text-xs text-ink/50">{hint}</p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1 font-body text-xs text-crisis"
        >
          <span aria-hidden="true">⚠</span>
          {error.message}
        </p>
      )}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & BaseProps;

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, hint, id, className = '', ...props }, ref) => (
    <FormField label={label} error={error} required={required} hint={hint} id={id}>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${baseInput} ${error ? errorInput : okInput} ${className}`}
        {...props}
      />
    </FormField>
  )
);
FormInput.displayName = 'FormInput';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & BaseProps;

export const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, hint, id, className = '', ...props }, ref) => (
    <FormField label={label} error={error} required={required} hint={hint} id={id}>
      <textarea
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${baseInput} ${error ? errorInput : okInput} ${className} min-h-[120px] resize-y`}
        {...props}
      />
    </FormField>
  )
);
FormTextarea.displayName = 'FormTextarea';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & BaseProps;

export const FormSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, required, hint, id, className = '', children, ...props }, ref) => (
    <FormField label={label} error={error} required={required} hint={hint} id={id}>
      <select
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${baseInput} ${error ? errorInput : okInput} ${className} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2310231C%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22></polyline></svg>')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
        {...props}
      >
        {children}
      </select>
    </FormField>
  )
);
FormSelect.displayName = 'FormSelect';

/* ───────────── Success / Error banners ───────────── */
export function FormSuccess({ message, onReset }: { message: string; onReset?: () => void }) {
  return (
    <div
      role="status"
      className="card-base p-7 text-center"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest/10">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2F6B4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h4 className="mb-2 font-display text-xl text-forest">Thank you</h4>
      <p className="mx-auto max-w-md font-body text-sm leading-relaxed text-ink/60">{message}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 font-body text-[0.8rem] font-semibold text-forest underline decoration-gold/60 decoration-2 underline-offset-4 transition-colors hover:text-forest-light"
        >
          Submit another response →
        </button>
      )}
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-[14px] border border-crisis/30 bg-crisis/[0.07] p-4 font-body text-sm text-crisis"
    >
      <strong className="font-semibold">Error:</strong> {message}
    </div>
  );
}

/* ───────────── Checkbox with label ───────────── */
type CheckboxProps = {
  id: string;
  label: string;
  description?: string;
  error?: FieldError;
  required?: boolean;
};

export const FormCheckbox = forwardRef<HTMLInputElement, CheckboxProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ id, label, description, error, required, className = '', ...props }, ref) => (
    <div className="space-y-1">
      <label htmlFor={id} className="group flex cursor-pointer items-start gap-3">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={!!error}
          className={`mt-1 h-4 w-4 shrink-0 rounded-[4px] border-ink/25 text-forest focus:ring-gold/40 ${className}`}
          {...props}
        />
        <span className="font-body text-sm text-ink">
          {label}
          {required && <span className="ml-1 text-crisis" aria-hidden="true">*</span>}
          {description && (
            <span className="mt-0.5 block text-xs text-ink/50">{description}</span>
          )}
        </span>
      </label>
      {error && (
        <p role="alert" className="ml-7 font-body text-xs text-crisis">
          {error.message}
        </p>
      )}
    </div>
  )
);
FormCheckbox.displayName = 'FormCheckbox';

/* ───────────── Radio Group (horizontal) ───────────── */
type RadioGroupProps = {
  id: string;
  label: string;
  options: { value: string; label: string; description?: string }[];
  error?: FieldError;
  required?: boolean;
};

export function FormRadioGroup({
  id,
  label,
  options,
  error,
  required,
}: RadioGroupProps) {
  return (
    <div className="space-y-2">
      <span className="block font-body text-[0.82rem] font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-crisis" aria-hidden="true">*</span>}
      </span>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            htmlFor={`${id}-${opt.value}`}
            className="relative cursor-pointer"
          >
            <input
              type="radio"
              id={`${id}-${opt.value}`}
              value={opt.value}
              name={id}
              className="peer sr-only"
            />
            <div className="rounded-[14px] border border-ink/15 bg-white px-3 py-2.5 text-center font-body text-sm text-ink transition-colors hover:border-ink/30 peer-checked:border-gold peer-checked:bg-gold/10 peer-checked:font-semibold peer-checked:text-forest peer-focus-visible:ring-2 peer-focus-visible:ring-gold/50">
              {opt.label}
            </div>
            {opt.description && (
              <span className="mt-1 block text-center text-xs text-ink/50">
                {opt.description}
              </span>
            )}
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="font-body text-xs text-crisis">
          {error.message}
        </p>
      )}
    </div>
  );
}
