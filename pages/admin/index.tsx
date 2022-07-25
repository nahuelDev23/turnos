import { Button, Grid, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

import { CheckDayTemplate } from "../../components/admin/CheckDayTemplate";
import { AdminLayout } from "../../components/admin/layout/AdminLayout";
import { DaysContext } from "../../context/DaysContext";
const index = () => {
  const { sendForm, successUpdateDaysHours, errorUpdateDaysHours } =
    useContext(DaysContext);

  useEffect(() => {
    successUpdateDaysHours &&
      toast.success("Los días y los horarios se actualizaron");
  }, [successUpdateDaysHours]);

  useEffect(() => {
    errorUpdateDaysHours &&
      toast.error(
        "Los días y los horarios no se actualizaron,intenta mas tarde",
      );
  }, [errorUpdateDaysHours]);

  return (
    <AdminLayout>
      <Toaster />
      <Stack>
        <Heading>Panel admin</Heading>
        <Grid gap="1rem" gridTemplateColumns="repeat(7,1fr)">
          <CheckDayTemplate text="domingo" />
          <CheckDayTemplate text="lunes" />
          <CheckDayTemplate text="martes" />
          <CheckDayTemplate text="miercoles" />
          <CheckDayTemplate text="jueves" />
          <CheckDayTemplate text="viernes" />
          <CheckDayTemplate text="sabado" />
        </Grid>

        <Button onClick={sendForm}>Guardar cambios</Button>
      </Stack>
    </AdminLayout>
  );
};

export default index;
