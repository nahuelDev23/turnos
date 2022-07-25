import { Text, Heading } from "@chakra-ui/react";
import useSWR from "swr";

import { useTakeATurn } from "../../../hooks/useTakeATurn";
import AlertMessage from "../../admin/UI/AlertMessage";

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

  if (errorAvailableDays)
    return <Text>No se pudieron cargar los horarios</Text>;

  return (
    <>
      <Heading>Saca un turno conmigo 😇</Heading>
      {error && (
        <AlertMessage bgColor="red.300" text={error} textColor="red.800" />
      )}
      {success && (
        <AlertMessage bgColor="green.300" text={success} textColor="gray.800" />
      )}
      <Form
        availableDays={availableDays}
        form={form}
        hoursPerDay={hoursPerDay}
        setStartDate={setStartDate}
        startDate={startDate}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
    </>
  );
};
