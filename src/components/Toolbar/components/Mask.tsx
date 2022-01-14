import type { VNode } from "preact";
import { createPortal, memo } from "preact/compat";
import { useEffect, useState } from "preact/hooks";

type MaskProps = {
  toolbar: HTMLDivElement | null;
  children: VNode;
};

export const Mask = memo(({ toolbar, children }: MaskProps) => {
  const [rootElement] = useState<HTMLDivElement | null>(() => {
    const element = document.createElement("div");
    element.style.position = "absolute";
    return element;
  });

  useEffect(() => {
    if (toolbar && rootElement) {
      toolbar.appendChild(rootElement);
    }
  }, [rootElement, toolbar]);

  useEffect(() => {
    if (rootElement && toolbar) {
      toolbar.appendChild(rootElement);

      const toolbarRect = toolbar.getBoundingClientRect();
      const halfHeight = toolbarRect.height / 2 - 31;
      rootElement.style.top = halfHeight + "px";
      rootElement.style.left = "41px";
      rootElement.style.width = "17px";
      rootElement.style.height = "62px";

      return () => {
        toolbar.removeChild(rootElement);
      };
    }
  }, [rootElement, toolbar]);

  if (rootElement) {
    return createPortal(children, rootElement);
  } else {
    return null;
  }
});
