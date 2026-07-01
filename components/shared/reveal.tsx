"use client";

//bir elementi ekrana girince animasyonla görünür yapmak.
//scroll, reveal animasyonunu tekrar kullanılabilir hale getirir.
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  // bu componentin alabileceği ayarlar:delay, direction..
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
};

export function Reveal({
  className,
  delay = 0,
  direction = "up",
  distance = 18,
  ...props
}: RevealProps) {
  //seçilen yöne göre başlangıç pozisyonu hesaplanıyor.
  const x =
    direction === "left" ? distance : direction === "right" ? -distance : 0;
  const y =
    direction === "up" ? distance : direction === "down" ? -distance : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }} //ekrana girince
      viewport={{ once: true, margin: "-80px" }} //animasyon sadece bir kere çalışır. Kullanıcı aşağı-yukarı scroll yapınca tekrar tekrar oynamaz.
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...props}
    />
  );
}
