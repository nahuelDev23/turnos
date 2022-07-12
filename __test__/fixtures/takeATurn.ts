export const emptyForm = {
  name: "",
  dni: "",
  phone: "",
  hour: "",
  day: new Date(new Date().setHours(0, 0, 0, 0)),
};

export const filledForm = {
  name: "mileno",
  dni: "40.000.000",
  phone: "11.111.111",
  hour: "10:00",
  day: new Date(new Date().setHours(0, 0, 0, 0)),
};
