import { Select, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import Moment from "react-moment";
import toast, { Toaster } from "react-hot-toast";

import { ITurnDB, ITurnForm } from "../../../interface/ITurn";
import { useTurn } from "../../../hooks/useTurn";

interface Props {
  turnsView: ITurnDB[];
}

export const TableTurn: FC<Props> = ({ turnsView }) => {
  const { onInputHourChange, isSuccessUpdate, isErrorUpdate } = useTurn();

  useEffect(() => {
    isSuccessUpdate && toast.success("El horario se actualizo correctamente");
  }, [isSuccessUpdate]);

  useEffect(() => {
    isErrorUpdate && toast.error("No se pudo actualizar el horario");
  }, [isErrorUpdate]);

  return (
    <>
      <Toaster />
      <Table overflow="scroll" size="sm">
        <Thead>
          <Tr>
            <Th>nombre</Th>
            <Th>teléfono</Th>
            <Th>hora</Th>
            <Th>dni</Th>
            <Th>dia</Th>
          </Tr>
        </Thead>
        <Tbody>
          {turnsView.map((turn: ITurnForm) => (
            <Tr key={turn._id}>
              <Td>{turn.name}</Td>
              <Td>{turn.phone}</Td>
              <Td>
                <Select
                  aria-label="select"
                  name="hour"
                  onChange={(e) => {
                    onInputHourChange(e, turn._id!);
                  }}
                >
                  <option>{turn.hour}</option>
                  <option>13:00</option>
                </Select>
              </Td>
              <Td>{turn.dni}</Td>
              <Td>{<Moment format="DD/MM/YYYY">{turn.day}</Moment>}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
