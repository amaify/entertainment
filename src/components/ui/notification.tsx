"use client";

import { useEffect } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import toast, { ToastBar, Toaster, useToasterStore } from "react-hot-toast";

const TOAST_LIMIT = 3;

export default function Notification() {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((tt) => toast.dismiss(tt.id));
  }, [toasts]);

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{ className: "", style: { background: "transparent", boxShadow: "none" } }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <Transition
              appear
              show={t.visible}
              enter="transition-all duration-150"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-75"
            >
              <span className="relative flex w-[28.4rem] gap-2 rounded-md bg-white p-5 shadow-[2px_2px_12px_1px_rgba(0,0,0,0.3)] sm:w-[33.4rem]">
                {icon}
                <span className="text-[1.4rem] font-medium">{message}</span>
                <XMarkIcon
                  className="absolute right-2 top-3 h-8 w-8 hover:cursor-pointer hover:fill-primary"
                  onClick={() => toast.dismiss(t.id)}
                />
              </span>
            </Transition>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
