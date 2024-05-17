"use client";

import { Variant, useVariant } from "@/hooks/useVariant";
import Link from "next/link";

type LinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
};

const CustomLink = (props: LinkProps) => {
  const { variant, href, ...rest } = props;
  const variantClass = useVariant(variant ?? "primary");
  return (
    <Link {...rest} href={href}>
      <div className={`${variantClass} px-4 py-2 rounded `}>
        {props.children}
      </div>
    </Link>
  );
};
export { CustomLink as Link };
