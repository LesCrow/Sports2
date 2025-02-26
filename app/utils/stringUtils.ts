export const formatKey = (key: string | number | symbol): string => {
  if (typeof key === "string") return key.replace(/_/g, " ").toUpperCase(); // Exemple : "moving_time" -> "MOVING TIME"
  return String(key); // Conversion pour les nombres ou autres types
};

// Texte préformatté en fonction de l'heure
export const getMessageBasedOnTime = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Morning";
  }
  if (currentHour >= 12 && currentHour < 18) {
    return "Afternoon";
  }
  if (currentHour >= 18 && currentHour < 22) {
    return "Evening";
  }
  return "Night";
};
