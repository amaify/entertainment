"use client";

import Typography from "@/components/typography/typography";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col items-center justify-center">
          <Typography as="h1" intent="heading-error-lg">
            Error
          </Typography>
          <Typography as="p" intent="body-md">
            {error.message}
          </Typography>
        </div>
      </body>
    </html>
  );
}
