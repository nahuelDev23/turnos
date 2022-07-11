export const numberDayToString = (dayNumber: number) => {
  let currentDay: string | null = null;

  switch (dayNumber) {
    case 0:
      currentDay = "domingo";
      break;
    case 1:
      currentDay = "lunes";
      break;
    case 2:
      currentDay = "martes";
      break;
    case 3:
      currentDay = "miercoles";
      break;
    case 4:
      currentDay = "jueves";
      break;
    case 5:
      currentDay = "viernes";
      break;
    case 6:
      currentDay = "sabado";
      break;
    default:
      break;
  }

  return currentDay;
};
