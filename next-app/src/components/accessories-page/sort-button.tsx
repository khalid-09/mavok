"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortButtonProps {
  currentSort: "recommendation" | "a-z";
}

const SortButton = ({ currentSort }: SortButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    if (sort === "recommendation") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }
    return params.toString();
  };

  const handleSort = (sort: "recommendation" | "a-z") => {
    const queryString = createQueryString(sort);
    router.push(`?${queryString}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-8 items-center gap-2 rounded-md p-1 md:p-2 md:pl-3"
          variant="ghost"
        >
          <span className="text-xs font-bold uppercase -tracking--1%">
            {currentSort === "recommendation"
              ? "Recommendation"
              : "Title (A-Z)"}
          </span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuItem
          className="text-xs font-bold uppercase -tracking--1%"
          onClick={() => handleSort("recommendation")}
        >
          Recommendation
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xs font-bold uppercase -tracking--1%"
          onClick={() => handleSort("a-z")}
        >
          Title (A-Z)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortButton;
