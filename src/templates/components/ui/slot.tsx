import { cn } from "@/lib/utils";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
} from "react";

type ElementProps = {
  className?: string;
  [key: string]: any;
};

type SlotProps = ElementProps & {
  children: ReactElement;
};

const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...restProps }, ref) => {
    const child = Children.only(children);

    if (!isValidElement(child)) {
      console.error("Slot requires a single valid React element as a child");
      return null;
    }

    const childProps = {
      ...restProps,
      ...(child.props as ElementProps),
      ref,
      className: cn((child.props as ElementProps).className, className),
    };

    return cloneElement(child, childProps);
  }
);

Slot.displayName = "Slot";

export { Slot, type SlotProps };
