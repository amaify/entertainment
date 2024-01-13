"use client";

import { useEffect, type ChangeEvent, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Input from "./input";

export default function SearchInput({ placeholderText }: { placeholderText: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState(searchParams.get("q") ?? "");

  let previousPath = "";
  if (typeof window !== "undefined") {
    previousPath = sessionStorage.getItem("previousPath") ?? "";
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value.toLowerCase());

    const queryParam = new URLSearchParams(searchParams);
    queryParam.set("q", value.toLowerCase());
    router.replace(`/search?${queryParam.toString()}`);

    if (value === "") router.replace(previousPath);
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
    if (pathname.includes("search")) inputRef.current?.focus();
    if (!pathname.includes("search")) sessionStorage.setItem("previousPath", pathname);

    return () => {
      if (searchFieldElement) observer.unobserve(searchFieldElement);
    };
  }, []);

  return (
    <div
      className="[ search-bar-container ] bg-primary-background pb-[4.4rem] pl-[1.6rem] pr-[1.6rem] sm:px-[2.4rem] xl:pl-0 xl:pr-[3.2rem]"
      id="searchField"
    >
      <Input
        variant="searchInput"
        placeholder={placeholderText}
        onChange={onInputChange}
        value={inputValue}
        ref={inputRef}
        showCloseIcon={inputValue !== ""}
        onClickCloseIcon={() => router.replace(previousPath)}
      />
    </div>
  );
}
