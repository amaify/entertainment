import type { HtmlHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

export interface Props
  extends HtmlHTMLAttributes<HTMLElement>,
    Required<Pick<VariantProps<typeof typography>, "intent">> {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children: ReactNode;
}

const typography = cva("leading-normal text-white", {
  variants: {
    intent: {
      "heading-xs": "text-heading-xs",
      "heading-light-sm": "text-heading-light-sm",
      "heading-medium-sm": "text-heading-medium-sm",
      "heading-lg": "text-heading-lg",
      "heading-lg-tablet": "text-heading-lg-tab",
      "heading-lg-mobile": "text-heading-lg-mobile",
      "body-sm": "text-body-sm text-white/75",
      "body-sm-mobile": "text-body-sm-mobile",
      "body-md": "text-body-md",
      "heading-error-lg": "text-4xl font-bold text-primary",
      "fluid-heading": "text-fluid-heading"
    }
  }
});

export default function Typography({ as, children, className, intent }: Props) {
  const Tag = as;

  return <Tag className={clsx(typography({ intent, className }))}>{children}</Tag>;
}
