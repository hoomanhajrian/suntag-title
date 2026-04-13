import React from "react";
import Image from "next/image";

const paymentMethods = [
  { id: "visa",       label: "Visa",             src: "/assets/payments/visa.png" },
  { id: "mastercard", label: "Mastercard",        src: "/assets/payments/master.png" },
  { id: "amex",       label: "American Express",  src: "/assets/payments/amx.png" },
  { id: "applepay",   label: "Apple Pay",         src: "/assets/payments/apple.png" },
  { id: "googlepay",  label: "Google Pay",        src: "/assets/payments/google.png" },
];

const PaymentSection = () => {
  return (
    <section className="bg-background border-t border-white/5 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-text-base text-2xl font-semibold tracking-wide">
            Accepted Payment Methods
          </h2>
          <p className="text-text-base/50 text-sm">
            We accept the following forms of payment —{" "}
            <span className="text-red-400 font-medium">in person only</span>. No online or over-the-phone payments accepted.
          </p>
        </div>

        {/* Logos */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          {paymentMethods.map(({ id, label, src }) => (
            <div
              key={id}
              className="flex items-center justify-center rounded-lg p-3 bg-white/5 hover:border-white/25 hover:bg-white/10 transition-colors duration-200 z-10"
              style={{ minWidth: "100px", height: "68px" }}
            >
              <Image
                src={src}
                alt={label}
                width={80}
                height={48}
                className="object-contain h-10 w-auto"
              />
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-text-base/30 text-xs">
          All transactions are processed securely on-site at our office.
        </p>
      </div>
    </section>
  );
};

export default PaymentSection;
