import type { GetServerSideProps } from "next";

// eslint-disable-next-line import/order

import "react-datepicker/dist/react-datepicker.css";

import { Stack, Text, Grid, Heading, Button } from "@chakra-ui/react";
import { FC, FormEvent, useContext, useEffect, useState } from "react";

import { PublicLayout } from "../components/Layout/PublicLayout";
import { getAllTurns } from "../database/dbTurns";
import { daysString, IDaysHours, ITurnForm } from "../interface";
import { Form } from "../components/form/Form";
import { TableTurn } from "../components/table/TableTurn";
import { CheckDayTemplate } from "../components/admin/CheckDayTemplate";
import { DaysContext } from "../context/DaysContext";
import { getAvailableDays } from "../database/dbAvailableDays";

interface Props {
  turns: ITurnForm[];
  availableDays: IDaysHours[];
}

const Home: FC<Props> = ({ turns, availableDays }) => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [turnsView, setTurnViews] = useState<ITurnForm[]>([]);
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const { sendForm, fillFormData, formData } = useContext(DaysContext);
  const [hoursPerDay, setHoursPerDay] = useState<any>(null);
  const [form, setForm] = useState<ITurnForm>({
    name: "",
    dni: "",
    phone: "",
    hour: "",
    day: startDate,
  });
  const hardCodedDays: string[] = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];

  const turnOffDaysInCalendar = () => {
    const bodyDay = availableDays.map((item: any) => item.day);
    const dayToDelete = hardCodedDays.filter((v) => !bodyDay.includes(v));
    const dayToNumber = [];

    for (const iterator of dayToDelete) {
      switch (iterator) {
        case "domingo":
          dayToNumber.push(0);
          break;
        case "lunes":
          dayToNumber.push(1);
          break;
        case "martes":
          dayToNumber.push(2);
          break;
        case "miercoles":
          dayToNumber.push(3);
          break;
        case "jueves":
          dayToNumber.push(4);
          break;
        case "viernes":
          dayToNumber.push(5);
          break;
        case "sabado":
          dayToNumber.push(6);
          break;
        default:
          break;
      }
    }

    return dayToNumber;
  };

  useEffect(() => {
    setTurnViews(turns);
    fillFormData(availableDays);
  }, []);

  useEffect(() => {
    let currentDay: string | null = null;

    // todo hacer helper
    switch (startDate.getDay()) {
      case 0:
        currentDay = "domingo";
        break;
      case 1:
        currentDay = "lunes";
        break;
      case 2:
        currentDay = "martes";
        break;
      case 3:
        currentDay = "miercoles";
        break;
      case 4:
        currentDay = "jueves";
        break;
      case 5:
        currentDay = "viernes";
        break;
      case 6:
        currentDay = "sabado";
        break;
      default:
        break;
    }

    if (formData.length > 0) {
      const { hours } = formData.find((item) => item.day === currentDay);

      console.log(hours);
      setHoursPerDay(hours);
    }
  }, [startDate]);

  useEffect(() => {
    setForm((form) => ({ ...form, day: startDate }));
  }, [startDate]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch("/api/turn", {
      method: "POST",
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.message);
        }
        setSuccess(data.message);
        setError(null);
        setTurnViews((prev) => {
          return [...prev, data.turn];
        });
      })
      .catch((err) => {
        setSuccess(null);
        setError(err.message);
      });
  };

  const onInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <PublicLayout>
      <Grid gap="4" templateColumns="repeat(2,1fr)">
        <Stack>
          {error && (
            <Stack bgColor="red.300" borderRadius="md" my="4" p="4">
              <Text color="red.800">{error}</Text>
            </Stack>
          )}
          {success && (
            <Stack bgColor="green.300" borderRadius="md" my="4" p="4">
              <Text color="gray.800">{success}</Text>
            </Stack>
          )}

          <Form
            form={form}
            hoursPerDay={hoursPerDay}
            setStartDate={setStartDate}
            startDate={startDate}
            turnOffDaysInCalendar={turnOffDaysInCalendar}
            onInputChange={(e: any) => onInputChange(e)}
            onSubmit={onSubmit}
          />

          <TableTurn turnsView={turnsView} />
        </Stack>
        <Stack>
          <Heading>Panel admin</Heading>
          <CheckDayTemplate text="domingo" />
          <CheckDayTemplate text="lunes" />
          <CheckDayTemplate text="martes" />
          <CheckDayTemplate text="miercoles" />
          <CheckDayTemplate text="jueves" />
          <CheckDayTemplate text="viernes" />
          <CheckDayTemplate text="sabado" />
          <Button onClick={sendForm}>Guardar cambios</Button>
        </Stack>
      </Grid>
    </PublicLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const turns = await getAllTurns();
  const availableDays = await getAvailableDays();

  return {
    props: {
      turns,
      availableDays,
    },
  };
};
