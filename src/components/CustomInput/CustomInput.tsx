"use client";

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const CustomInput = ({
  label = "",
  type = "text",
  value,
  onChange,
  placeholder = "",
  description = "",
  error = "",
  required = false,
  disabled = false,
  minLength=0,
  maxLength=100,
}: CommonInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Field>
      {label && label.length > 0 && (
        <FieldLabel htmlFor={label}>
          {label} {required && <span className="text-red-500">*</span>}
        </FieldLabel>
      )}
      <Input
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        className="bg-white"
      />
      {description && description.length > 0 && (
        <FieldDescription>{description}</FieldDescription>
      )}
      {error && error.length > 0 && <FieldError>{error}</FieldError>}
    </Field>
  );
};

export default CustomInput;
