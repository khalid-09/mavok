"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

// Error component to display when an error occurs

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-svh items-center justify-center">
      <div>
        <h2 className="mb-6 text-3xl font-bold">Something went wrong!</h2>
        <div className="flex w-full justify-center gap-3">
          <Button
            variant="destructive"
            className="text-center"
            onClick={() => reset()}
          >
            Try again
          </Button>
          <Button>
            <Link href="/">Go Home</Link>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
