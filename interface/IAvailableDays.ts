// export interface IAvailableDays {
//   domingo: String;
//   lunes: String;
//   martes: String;
//   miercoles: String;
//   jueves: String;
//   viernes: String;
//   sabado: String;
// }

export interface IAvailableHours {
  time: String;
}

export type daysString =
  | "domingo"
  | "lunes"
  | "martes"
  | "miercoles"
  | "jueves"
  | "viernes"
  | "sabado";

export interface IDaysHours {
  hours: IAvailableHours[];
  day: daysString;
  days?: daysString; // todo arreglar esto qye sea day en todos lados
}
