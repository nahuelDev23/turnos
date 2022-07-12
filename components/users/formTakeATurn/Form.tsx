import { FC } from "react";
import { Select, Input, Button } from "@chakra-ui/react";

import { ITurnForm } from "../../../interface";
import { IAvailableHours } from "../../../interface/IAvailableDays";

interface Props {
  onSubmit: any;
  form: ITurnForm;
  onInputChange: any;
  hoursPerDay: IAvailableHours[];
}

export const Form: FC<Props> = ({
  onSubmit,
  form,
  onInputChange,
  hoursPerDay,
}) => {
  const { name, dni, phone, hour } = form;

  return (
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
  );
};
