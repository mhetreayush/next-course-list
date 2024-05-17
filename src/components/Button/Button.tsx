import { Variant, useVariant } from "@/hooks/useVariant";
import { forwardRef } from "react";

type ButtonProps = {
  variant: Variant;
  children: React.ReactNode;
};

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const { variant, ...buttonProps } = props;
    const variantClass = useVariant(variant ?? "primary");
    return (
      <button
        {...buttonProps}
        ref={forwardedRef}
        className={`px-4 py-2 rounded ${variantClass}`}
      >
        {props.children}
      </button>
    );
  },
);

export { Button };
