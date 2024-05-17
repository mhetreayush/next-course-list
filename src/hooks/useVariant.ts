export type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "warning"
  | "success"
  | "info";

const useVariant = (variant: Variant) => {
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    tertiary: "bg-gray-200 text-black",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    success: "bg-green-500 text-white",
    info: "bg-blue-200 text-black",
  };

  return variantClasses[variant];
};

export { useVariant };
