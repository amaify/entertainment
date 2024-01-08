import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Avatar({ ...props }: Props) {
  return (
    <label
      htmlFor="upload"
      className="mt-2 w-1/3 rounded-xl bg-primary p-4 text-center text-body-md text-white transition-all hover:cursor-pointer hover:bg-white hover:text-primary-background"
    >
      Upload
      <input type="file" accept="image/*" id="upload" className="absolute hidden" onChange={props.onChange} />
    </label>
  );
}
