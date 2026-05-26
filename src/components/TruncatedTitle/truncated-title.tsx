"use client";

import { useEffect, useRef, useState } from "react";

export function TruncatedTitle({
  text,
}: {
  text: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const isOverflowing =
      el.scrollWidth > el.clientWidth;

    setTitle(isOverflowing ? text : "");
  }, [text]);

  return (
    <span
      ref={ref}
      title={title}
      className="truncate block"
    >
      {text}
    </span>
  );
}