const FormatNumbers = (num) => {
  const formatWithSuffix = (value, suffix) =>
    value.toFixed(1).replace(/\.0$/, "") + suffix;

  return num >= 1_000_000_000_000
    ? formatWithSuffix(num / 1_000_000_000_000, "T")
    : num >= 1_000_000_000
    ? formatWithSuffix(num / 1_000_000_000, "B")
    : num >= 1_000_000
    ? formatWithSuffix(num / 1_000_000, "M")
    : num >= 1_000
    ? formatWithSuffix(num / 1_000, "K")
    : num.toString();
};

export default FormatNumbers;
