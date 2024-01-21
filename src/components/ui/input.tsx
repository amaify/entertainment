import { type InputHTMLAttributes, forwardRef } from "react";
import cn from "@/helpers/cn";
import SvgIcon from "../svg/svg";

export type FormInputVariant = "searchInput" | "formInput";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  variant: FormInputVariant;
  showCloseIcon?: boolean;
  inputError?: Record<string, string>;
  onClickCloseIcon?: () => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ variant, inputError, showCloseIcon, onClickCloseIcon, ...props }, ref) => {
    if (variant === "searchInput") {
      return (
        <div className="flex w-full items-center gap-[2.4rem]">
          <SvgIcon variant="searchIcon" />
          <label
            htmlFor={props.id}
            className="relative flex w-full focus-within:after:absolute focus-within:after:-bottom-6 focus-within:after:block focus-within:after:h-[1px] focus-within:after:w-full focus-within:after:bg-tertiary-background focus-within:after:content-['']"
          >
            <input
              {...props}
              ref={ref}
              className="w-full bg-transparent text-[1.6rem] font-light text-white caret-primary placeholder:text-white/50 focus:outline-none sm:text-heading-light-sm"
            />
            <button
              onClick={onClickCloseIcon}
              className={cn("group/close-btn transition-colors", showCloseIcon ? "visible" : "hidden")}
            >
              <span>
                <SvgIcon
                  variant="closeIcon"
                  fillColour="white"
                  className="size-5 transition-colors group-hover/close-btn:fill-primary"
                />
              </span>
            </button>
          </label>
        </div>
      );
    }

    return (
      <label
        htmlFor={props.id}
        className={cn(
          "relative flex w-full gap-2 transition-colors",
          "after:absolute after:-bottom-6 after:block after:h-[1px] after:w-full after:bg-tertiary-background after:content-['']",
          "focus-within:after:bg-white",
          {
            "after:bg-primary focus-within:after:bg-primary": inputError && inputError[props.name ?? ""]
          }
        )}
      >
        <input
          {...props}
          ref={ref}
          className="!placeholder:text-white/50 mr-auto w-full bg-transparent px-[1.6rem] text-body-md text-white caret-primary focus:outline-none"
        />
        {inputError && inputError[props.name ?? ""] && (
          <span className="ml-2 w-full text-right text-body-sm text-primary" data-testid="errorMessage">
            {inputError[props.name ?? ""]}
          </span>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
