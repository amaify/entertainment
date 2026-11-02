"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, useState } from "react";
import Input from "@/components/ui/input";

export default function SearchInput({ placeholderText }: { placeholderText: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [inputValue, setInputValue] = useState(searchParams.get("q") ?? "");

    const queryParam = new URLSearchParams(searchParams);

    let previousPath = "";

    if (typeof window !== "undefined") {
        previousPath = sessionStorage.getItem("previousPath") ?? "/";
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value.toLowerCase());

        queryParam.set("q", value.toLowerCase());

        switch (pathname) {
            case "/bookmarks":
                router.replace(`/bookmarks?${queryParam.toString()}`, { scroll: false });
                if (value === "") {
                    queryParam.delete("q");
                    router.replace(`/bookmarks?${queryParam.toString()}`, { scroll: false });
                }
                break;

            default:
                router.replace(`/search?${queryParam.toString()}`, { scroll: false });
                if (value === "") router.replace(previousPath);
                break;
        }
    };

    const handleFocus = (element: HTMLInputElement | null) => {
        if (pathname.includes("search")) {
            element?.focus();
            element?.setSelectionRange(element.value.length, element.value.length);
        }
    };

    const onClickCloseIcon = () => {
        switch (pathname) {
            case "/bookmarks":
                queryParam.delete("q");
                router.replace(`/bookmarks?${queryParam.toString()}`, { scroll: false });
                setInputValue("");
                break;

            default:
                router.replace(previousPath);
                break;
        }
    };

    return (
        <div
            className="[ search-bar-container ] bg-primary-background pb-[4.4rem] pl-[1.6rem] pr-[1.6rem] sm:px-[2.4rem] xl:pl-0 xl:pr-[3.2rem]"
            id="searchField"
        >
            <Input
                variant="searchInput"
                name="search-input"
                id="search-input"
                placeholder={placeholderText}
                onChange={onInputChange}
                value={inputValue}
                ref={handleFocus}
                autoComplete="off"
                showCloseIcon={inputValue !== ""}
                onClickCloseIcon={onClickCloseIcon}
            />
        </div>
    );
}
