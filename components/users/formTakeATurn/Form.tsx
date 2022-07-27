import { FC, FormEvent } from "react";
import { Select, Input, Button, Stack, Text } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import moment from "moment";

import { ITurnForm } from "../../../interface";
import { IAvailableHours, IDaysHours } from "../../../interface/IAvailableDays";
import { numbersOfDaysToDelete } from "../../../helpers";

interface Props {
  onSubmit: (e: FormEvent) => void;
  form: ITurnForm;
  onInputChange: (e: any) => void;
  hoursPerDay: IAvailableHours[];
  setStartDate: any;
  startDate: any;
  availableDays: IDaysHours[];
}

export const Form: FC<Props> = ({
  onSubmit,
  form,
  onInputChange,
  hoursPerDay,
  setStartDate,
  availableDays,
  startDate,
}) => {
  const { name, dni, phone, hour } = form;

  const isAvailableDay = (date: Date) => {
    form.hour = "";

    const day = date.getDay();

    const listToDisableDayInNumber = numbersOfDaysToDelete(availableDays);

    const isDayCalendarInListToDisable = listToDisableDayInNumber.includes(day);

    return !isDayCalendarInListToDisable;
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          mb="4"
          name="name"
          placeholder="Nombre"
          type="text"
          value={name}
          onChange={(e) => {
            onInputChange(e);
          }}
        />
        <Input
          mb="4"
          name="dni"
          placeholder="D.N.I"
          type="text"
          value={dni}
          onChange={(e) => {
            onInputChange(e);
          }}
        />
        <Input
          mb="4"
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
          mb="4"
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

        <Stack color="black">
          {availableDays?.length ? (
            <DatePicker
              filterDate={isAvailableDay}
              minDate={moment().toDate()}
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          ) : (
            <Text>Obteniendo días disponibles</Text>
          )}
        </Stack>

        <Button disabled={!hour} type="submit">
          Reservar
        </Button>
      </form>
    </>
  );
};
