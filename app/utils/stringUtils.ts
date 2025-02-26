export const formatKey = (key: string | number | symbol): string => {
  if (typeof key === "string") return key.replace(/_/g, " ").toUpperCase(); // Exemple : "moving_time" -> "MOVING TIME"
  return String(key); // Conversion pour les nombres ou autres types
};
