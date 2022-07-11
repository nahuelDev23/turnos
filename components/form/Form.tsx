import { FC } from "react";
import { Input, Button, Select, Stack } from "@chakra-ui/react";
import DatePicker from "react-datepicker";

import { ITurnForm } from "../../interface";
interface Props {
  onSubmit: any;
  setStartDate: any;
  form: ITurnForm;
  onInputChange: any;
  startDate: Date;
  turnOffDaysInCalendar: () => (number | undefined)[];
  hoursPerDay: any;
}

export const Form: FC<Props> = ({
  onSubmit,
  setStartDate,
  form,
  onInputChange,
  startDate,
  turnOffDaysInCalendar,
  hoursPerDay,
}) => {
  const { name, dni, phone, hour } = form;
  const isWeekday = (date: Date) => {
    const day = date.getDay();

    const listToDisableDayInNumber = turnOffDaysInCalendar();
    const isDayInCalendarInListToDisable =
      listToDisableDayInNumber.includes(day);

    return !isDayInCalendarInListToDisable;
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          name="name"
          placeholder="Nombre"
          type="text"
          value={name}
          onChange={(e) => {
            onInputChange(e);
          }}
        />
        <Input
          name="dni"
          placeholder="D.N.I"
          type="text"
          value={dni}
          onChange={(e) => {
            onInputChange(e);
          }}
        />
        <Input
          name="phone"
          placeholder="Teléfono"
          type="text"
          value={phone}
          onChange={(e) => {
            onInputChange(e);
          }}
        />

        <Select
          id="hour"
          name="hour"
          value={hour}
          onChange={(e) => {
            onInputChange(e);
          }}
        >
          <option
            value=""
            onChange={(e) => {
              onInputChange(e);
            }}
          >
            Elegí una hora
          </option>
          {hoursPerDay &&
            hoursPerDay.map((hour: any, index: number) => (
              <option key={index} value={hour.time}>
                {hour.time}
              </option>
            ))}
        </Select>

        <Button type="submit">Reservar</Button>
      </form>
      <Stack color="black">
        <DatePicker
          filterDate={isWeekday}
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </Stack>
    </>
  );
};
