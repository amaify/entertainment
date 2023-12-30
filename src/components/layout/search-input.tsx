"use client";

import type { ChangeEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Input from "../ui/input";

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
    <div className="pr-[3.2rem] mb-[3.5rem]">
      <Input variant="searchInput" placeholder={placeholderText} onChange={onInputChange} />
    </div>
  );
}
