"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Transition({children}: { children: React.ReactNode}) {

  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.25 }}
      className="flex flex-col flex-auto h-full"
    >
      {children}
    </motion.div>
  );
}