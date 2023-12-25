import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Avatar({ ...props }: Props) {
  return (
    <label
      htmlFor="upload"
      className="w-1/3 bg-primary p-4 mt-2 text-body-md text-center rounded-xl text-white transition-all hover:cursor-pointer hover:bg-white hover:text-primary-background"
    >
      Upload
      <input type="file" accept="image/*" id="upload" className="hidden absolute" onChange={props.onChange} />
    </label>
  );
}
