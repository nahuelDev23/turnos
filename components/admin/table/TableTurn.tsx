import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FC } from "react";
import Moment from "react-moment";

import { ITurnDB, ITurnForm } from "../../../interface/ITurn";

interface Props {
  turnsView: ITurnDB[];
}

export const TableTurn: FC<Props> = ({ turnsView }) => {
  return (
    <>
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
              <Td>{turn.hour}</Td>
              <Td>{turn.dni}</Td>
              <Td>{<Moment format="DD/MM/YYYY">{turn.day}</Moment>}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
