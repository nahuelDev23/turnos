import type { GetServerSideProps } from "next";

// eslint-disable-next-line import/order
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {
  Heading,
  Input,
  Button,
  Select,
  Stack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { FC, FormEvent, useEffect, useState } from "react";

import { PublicLayout } from "../components/Layout/PublicLayout";
import { getAllTurns } from "../database/dbTurns";
import { ITurnForm } from "../interface";

interface Props {
  turns: ITurnForm[];
}
const Home: FC<Props> = ({ turns }) => {
  // const [startDate, setStartDate] = useState(new Date());
  const [turnsView, setTurnViews] = useState<ITurnForm[]>([]);
  const [error, setError] = useState<string>("");

  const [form, setForm] = useState<ITurnForm>({
    name: "",
    dni: "",
    phone: "",
    hour: "",
    day: new Date(),
  });

  const { name, dni, phone, hour, day } = form;

  // const isWeekday = (date: Date) => {
  //   const day = date.getDay();

  //   return day !== 0 && day !== 6;
  // };

  useEffect(() => {
    setTurnViews(turns);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch("/api/turn", {
      method: "POST",
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.turn);
        // if (data.status !== 200) {
        //   throw new Error(data.message);
        // }

        setTurnViews((prev) => {
          return [...prev, data.turn];
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const onInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!turns) return <p>loading</p>;

  return (
    <PublicLayout>
      <>
        <Heading>joder</Heading>
        {error && error}
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
          <Input
            name="day"
            placeholder="day"
            type="date"
            value={day}
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
              Elegi una hora
            </option>
            <option value="10:00:00">10:00:00</option>
            <option value="12:00:00">12:00:00</option>
            <option value="14:00:00">14:00:00</option>
          </Select>

          <Button type="submit">Reservar</Button>
        </form>
        {/* <Stack color="black">
          <DatePicker
            filterDate={isWeekday}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </Stack> */}

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
                <Td>{turn.day.toString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    </PublicLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const turns = await getAllTurns();

  return {
    props: {
      turns,
    },
  };
};
