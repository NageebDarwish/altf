export const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });

  return `${day}-${month}-${year} (${weekday})`;
};
