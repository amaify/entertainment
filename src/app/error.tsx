"use client";

import { usePathname } from "next/navigation";
import AppLayout from "./_layout/app-layout";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <AppLayout pathname={pathname}>
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-primary">Error</h1>
            <p className="text-white">{error.message}</p>
          </div>
        </AppLayout>
      </body>
    </html>
  );
}
