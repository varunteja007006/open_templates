import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { NumberFormatBase } from "react-number-format";

const IndianCurrencyInput = forwardRef(function IndianCurrencyInput(
  { maximumFractionDigits, className, ...props }: any,
  ref
) {
  return (
    <NumberFormatBase
      type="text"
      prefix="$"
      thousandsGroupStyle="lakh"
      thousandsSeparator=","
      decimalScale={2}
      {...props}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className ?? ""
      )}
      getInputRef={ref}
    />
  );
});

IndianCurrencyInput.displayName = "IndianCurrencyInput";

export default IndianCurrencyInput;
