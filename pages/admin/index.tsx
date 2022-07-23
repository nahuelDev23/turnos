import { Button, Grid, Heading, Stack } from "@chakra-ui/react";
import { useContext } from "react";

import { CheckDayTemplate } from "../../components/admin/CheckDayTemplate";
import { AdminLayout } from "../../components/Layout/AdminLayout";
import { DaysContext } from "../../context/DaysContext";

const index = () => {
  const { sendForm } = useContext(DaysContext);

  return (
    <AdminLayout>
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
