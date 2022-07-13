export const stringDayToNumber = (day: string): number => {
  switch (day) {
    case "domingo":
      return 0;
    case "lunes":
      return 1;
    case "martes":
      return 2;
    case "miercoles":
      return 3;
    case "jueves":
      return 4;
    case "viernes":
      return 5;
    case "sabado":
      return 6;
    default:
      return 7;
  }
};
