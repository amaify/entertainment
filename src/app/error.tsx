"use client";

import ShowProvider from "./providers/show-provider";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <html lang="en">
      <body>
        <ShowProvider>
          <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-primary">Error</h1>
            <p className="text-white">{error.message}</p>
          </div>
        </ShowProvider>
      </body>
    </html>
  );
}
