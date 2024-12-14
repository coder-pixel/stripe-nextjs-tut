"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";

type PaymentLinkProps = {
  href: string;
  paymentLink?: string;
  text: string;
};

const PaymentLink = ({ href, paymentLink, text }: PaymentLinkProps) => {
  return (
    <Link
      href={href}
      className={buttonVariants()}
      onClick={() => {
        if (paymentLink) {
          localStorage.setItem("Stripe_Payment_Link", paymentLink);
        }
      }}
    >
      {text}
    </Link>
  );
};

export default PaymentLink;
