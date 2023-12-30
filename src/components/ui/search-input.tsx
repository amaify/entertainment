"use client";

import { type ChangeEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Input from "./input";

interface Props {
  placeholderText: string;
}

export default function SearchInput({ placeholderText }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const queryParam = new URLSearchParams(searchParams);
    queryParam.set("show", value);
    router.replace(`${pathname}?${queryParam.toString()}`);

    if (value === "") router.replace(`${pathname}`);
  };

  return (
    <div className="pl-[1.6rem] pr-[1.6rem] mb-[2.4rem] sm:px-[2.4rem] sm:mb-[3.4rem] xl:pl-0 xl:pr-[3.2rem] xl:mb-[3.5rem]">
      <Input
        variant="searchInput"
        placeholder={placeholderText}
        onChange={onInputChange}
        value={searchParams.get("show") ?? ""}
      />
    </div>
  );
}
