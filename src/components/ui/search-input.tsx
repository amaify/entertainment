"use client";

import { useEffect, type ChangeEvent, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Input from "./input";

export default function SearchInput({ placeholderText }: { placeholderText: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("show") ?? "");

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    const queryParam = new URLSearchParams(searchParams);
    queryParam.set("show", value);
    router.replace(`${pathname}?${queryParam.toString()}`);

    if (value === "") router.replace(`${pathname}`);
  };

  useEffect(() => {
    const searchFieldElement = document.querySelector("#searchField");
    const rootElement = document.querySelector("#showsColumn");
    const observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle("search-bar-pinned", e.intersectionRatio < 1);
      },
      {
        threshold: [0, 1],
        root: rootElement
      }
    );

    if (searchFieldElement) observer.observe(searchFieldElement);
  }, []);

  return (
    <div
      className="[ search-bar-container ] bg-primary-background pb-[4.4rem] pl-[1.6rem] pr-[1.6rem] sm:px-[2.4rem] xl:pl-0 xl:pr-[3.2rem]"
      id="searchField"
    >
      <Input variant="searchInput" placeholder={placeholderText} onChange={onInputChange} value={inputValue} />
    </div>
  );
}
