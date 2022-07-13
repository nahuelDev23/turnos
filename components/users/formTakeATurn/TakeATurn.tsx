import { Stack, Text, Heading } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import useSWR from "swr";
import moment from "moment";

import { useTakeATurn } from "../../../hooks/useTakeATurn";
import { numbersOfDaysToDelete } from "../../../helpers/numbersOfDaysToDelete";

import { Form } from "./Form";

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

export const TakeATurn = () => {
  const { data: availableDays, error: errorAvailableDays } = useSWR(
    "/api/admin/availableDays",
    fetcher,
  );
  const {
    onSubmit,
    onInputChange,
    error,
    success,
    hoursPerDay,
    startDate,
    setStartDate,
    form,
  } = useTakeATurn(availableDays);

  const isAvailableDay = (date: Date) => {
    const day = date.getDay();

    const listToDisableDayInNumber = numbersOfDaysToDelete(availableDays);

    const isDayCalendarInListToDisable = listToDisableDayInNumber.includes(day);

    return !isDayCalendarInListToDisable;
  };

  if (errorAvailableDays)
    return <Text>No se pudieron cargar los horarios</Text>;

  return (
    <>
      <Heading>Saca un turno conmigo 😇</Heading>
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
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
      <Stack color="black">
        {availableDays ? (
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
    </>
  );
};
