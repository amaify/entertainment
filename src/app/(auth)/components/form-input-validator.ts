import type { DefaultInputValue, FormInputName } from "./auth-form-layout";

interface ValidateInputArgs {
  enteredValue: string;
  name: FormInputName;
  inputValue?: DefaultInputValue;
}

function validateEmail(value: string) {
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegEx.test(value) && value !== "") return "Wrong format";
  if (value === "") return "Can't be empty";
  return "";
}

function validatePassword(value: string) {
  if (value === "") return "Can't be empty";
  if (value.length < 4) return "Too short";
  return "";
}

function validateConfirmPassword(password: string | undefined, repeatPassword: string | undefined) {
  if (password !== repeatPassword) return "Passwords don't match";
  return "";
}

export function validateInput({ enteredValue, name, inputValue }: ValidateInputArgs) {
  if (name === "email") return validateEmail(enteredValue);
  if (name === "password") return validatePassword(enteredValue);
  if (name === "repeatPassword") return validateConfirmPassword(inputValue?.password, inputValue?.repeatPassword);
  return "";
}
