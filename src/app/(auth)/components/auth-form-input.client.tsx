"use client";

import { type ChangeEvent, useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import type { DefaultInputValue, FormFields, FormInputName } from "./auth-form-layout";
import { validateInput } from "./form-input-validator";

interface Props {
  formFields: FormFields[];
  btnTitle: string;
  defaultInputValue: DefaultInputValue;
}

export default function AuthFormInput({ formFields, btnTitle, defaultInputValue }: Props) {
  const [inputValue, setInputValue] = useState(defaultInputValue);
  const [inputError, setInputError] = useState<Record<string, string>>({});
  const isError = Object.values(inputError).some((value) => value);

  const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    const validatedValue = isError
      ? validateInput({ enteredValue: value, name: name as FormInputName, inputValue })
      : "";
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
    setInputError((prevState) => ({ ...prevState, [name]: validatedValue }));
  };

  const onInputBlur = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    const validatedValue = validateInput({ enteredValue: value, name: name as FormInputName, inputValue });
    setInputError((prevState) => ({ ...prevState, [name]: validatedValue }));
  };

  return (
    <>
      <div className="mb-[4rem] flex flex-col gap-[2.4rem]">
        {formFields.map((field) => (
          <Input
            key={field.id}
            variant={field.variant}
            type={field.type}
            name={field.name}
            value={inputValue[field.name as keyof typeof inputValue]}
            onChange={onInputChange}
            onBlur={onInputBlur}
            inputError={inputError}
            autoComplete="off"
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <Button type="submit" title={btnTitle} aria-disabled={isError}>
        {btnTitle}
      </Button>
    </>
  );
}
