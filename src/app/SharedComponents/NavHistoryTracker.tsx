"use client";

import { updateNavHistory } from "@/domain/store/navHistory";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


const NavHistoryTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    updateNavHistory(pathname);
  }, [pathname]);

  return null;
};

export default NavHistoryTracker;
