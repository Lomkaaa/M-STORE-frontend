export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString("ru-RU", {
      weekday: "long", // День недели (например, "вторник")
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }