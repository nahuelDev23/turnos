import { Stack, Text } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import useSWR from "swr";

import { useTakeATurn } from "../../../hooks/useTakeATurn";
import { turnOffDaysInCalendarNumberFormat } from "../../../helpers/turnOffDaysInCalendarNumberFormat";

import { Form } from "./Form";

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

export const FormTakeATurn = () => {
  const { data: availableDays, error: errorAvailableDays } = useSWR(
    "/api/availableDays",
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

  const isWeekday = (date: Date) => {
    const day = date.getDay();

    const listToDisableDayInNumber =
      turnOffDaysInCalendarNumberFormat(availableDays);
    const isDayInCalendarInListToDisable =
      listToDisableDayInNumber.includes(day);

    return !isDayInCalendarInListToDisable;
  };

  if (errorAvailableDays)
    return <Text>No se pudieron cargar los horarios</Text>;

  return (
    <>
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
        // setStartDate={setStartDate}
        // startDate={startDate}
        // turnOffDaysInCalendar={turnOffDaysInCalendar}
        onInputChange={(e: any) => onInputChange(e)}
        onSubmit={onSubmit}
      />
      <Stack color="black">
        {availableDays ? (
          <DatePicker
            filterDate={isWeekday}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        ) : (
          <Text>Obteniendo dias disponibles</Text>
        )}
      </Stack>
    </>
  );
};
