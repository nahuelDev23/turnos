export interface IAvailableHours {
  time: string;
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

export interface RawAvailableDaysFromDb {
  id: string;
  hours: IAvailableHours[];
  day: daysString;
  createdAt: Date;
  updatedAt: Date;
}
