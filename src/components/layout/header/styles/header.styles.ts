import { tv } from "tailwind-variants";

export const header = tv({
  base: "fixed top-0 left-0 w-full z-50 transition-all duration-300 *:text-white",
  variants: {
    mode: {
      default: "bg-transparent py-6",
      scrolled: "bg-[#4B2616] shadow-lg py-3",
      services: "bg-[#4B2616] shadow-lg py-3",
    },
  },
});
