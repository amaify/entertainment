import SvgIcon from "@/components/svg/svg";
import cn from "@/helpers/cn";
import type { InputHTMLAttributes } from "react";

export type FormInputVariant = "searchInput" | "formInput";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  variant: FormInputVariant;
  inputError?: Record<string, string>;
}

export default function Input({ variant, inputError, ...props }: Props) {
  if (variant === "searchInput") {
    return (
      <div className="flex w-full items-center gap-[2.4rem]">
        <SvgIcon variant="searchIcon" />
        <label
          htmlFor={props.id}
          className="relative focus-within:after:content-[''] focus-within:after:absolute focus-within:after:w-full focus-within:after:h-[1px] focus-within:after:-bottom-6 focus-within:after:bg-tertiary-background focus-within:after:block"
        >
          <input
            type={props.type}
            id={props.id}
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            className="text-heading-light-sm bg-transparent text-white caret-primary placeholder:text-white/50 focus:outline-none"
          />
        </label>
      </div>
    );
  }

  return (
    <label
      htmlFor={props.id}
      className={cn(
        "relative transition-colors w-full",
        "after:content-[''] after:absolute after:w-full after:h-[1px] after:-bottom-6 after:bg-tertiary-background after:block",
        "focus-within:after:bg-white",
        {
          "after:bg-primary focus-within:after:bg-primary":
            inputError && inputError[props.name ?? ""],
        }
      )}
    >
      <input
        {...props}
        className="text-body-md bg-transparent px-[1.6rem] text-white caret-primary placeholder:text-white/50 focus:outline-none"
      />
      {inputError && inputError[props.name ?? ""] && (
        <span className="text-primary text-body-sm ml-2">
          {inputError[props.name ?? ""]}
        </span>
      )}
    </label>
  );
}
