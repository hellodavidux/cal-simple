import { useEffect, useRef } from "react";

export function useAutoScroll(deps: readonly unknown[]) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, deps);

  return endRef;
}
