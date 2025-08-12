
export interface FormattedDate {
  date: string;
  time: string;
  full: string;
  short: string;
  tooltip: string;
}

export const formatDate = (date: Date | string): FormattedDate => {
  const fecha = new Date(date);
  
  const dateFormatted = fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  
  const timeFormatted = fecha.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  const shortDate = fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  
  const fullDate = fecha.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long", 
    year: "numeric",
  });
  
  return {
    date: dateFormatted,
    time: timeFormatted,
    full: `${dateFormatted} ${timeFormatted}`,
    short: `${shortDate} • ${timeFormatted}`,
    tooltip: `${fullDate} a las ${timeFormatted}`,
  };
};
export const isValidDate = (date: Date | string | null | undefined): boolean => {
  if (!date) return false;
  const fechaObj = new Date(date);
  return !isNaN(fechaObj.getTime());
};
