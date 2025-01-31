"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-rose-100 p-3 rounded-full">
            <AlertTriangleIcon className="size-10 text-rose-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Something went wrong!
          </h2>
          <p>{error.message}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Button asChild variant="ghost" className="font-medium">
          <Link href="/">
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
        <Button onClick={reset} className="font-medium px-6">
          Try again
        </Button>
      </div>
    </div>
  );
}
