"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { clsx } from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import SvgIcon from "@/components/svg/svg";
import ModalContent from "./modal-content";

export default function Modal() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const showId = searchParams.get("id") as string;
    const showCategory = searchParams.get("category") as "movie" | "tv";

    const handleCloseModal = () => window.history.replaceState(null, "", pathname);

    return (
        <Dialog open={!!showId} onClose={handleCloseModal}>
            <div aria-hidden="true" className="fixed inset-0 z-20 bg-black/50 backdrop-blur" />
            <DialogPanel
                className={clsx(
                    "max-h-[80%] w-[90%] overflow-y-auto rounded-xl bg-white",
                    "fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2",
                    "md:max-h-full md:min-h-0 md:w-[85%] md:px-10 md:py-12",
                    "xl:w-3/5 2xl:max-w-512",
                )}
            >
                <div className={clsx("absolute right-10 top-8 z-10")}>
                    <button
                        type="button"
                        className="bg-primary size-16 rounded-full flex justify-center items-center md:rounded-none md:size-auto md:bg-transparent"
                        onClick={handleCloseModal}
                    >
                        <span className="sr-only">Close Modal</span>
                        <SvgIcon variant="closeIcon" />
                    </button>
                </div>
                <ModalContent showId={showId} variant={showCategory} />
            </DialogPanel>
        </Dialog>
    );
}
