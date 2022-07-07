export interface ITurnDB {
  _id: string;
  name: string;
  phone: string;
  hour: string;
  day: Date;
  dni: string;
}

export interface ITurnForm {
  _id?: string;
  name: string;
  phone: string;
  hour: string;
  day: Date;
  dni: string;
}
