import * as React from "react";
import { cn } from "@/lib/utils";

const containerSizes = {
  default: "max-w-6xl", //normal sayfa genişliği
  narrow: "max-w-3xl", //daha dar içerikler için, yazı/heading alanları
  wide: "max-w-7xl", //daha geniş grid veya büyük layout'lar için
};

type ContainerProps = React.ComponentProps<"div"> & {
  //container normal bir div gibi davranabilir. Yani -id- div proplarını alabilir.
  size?: keyof typeof containerSizes; //default | narrow | wide gibi değerlerden biri olabilir.
};

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerSizes[size], //seçilen max-width ı uygular.
        className, //dışarıdan extra class eklememize izin verir.
      )}
      {...props}
    />
  );
}
