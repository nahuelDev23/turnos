import { Button, Container, Heading, Stack } from "@chakra-ui/react";
import { useContext } from "react";

import { CheckDayTemplate } from "../../components/admin/CheckDayTemplate";
import { DaysContext } from "../../context/DaysContext";

const index = () => {
  const { sendForm } = useContext(DaysContext);

  return (
    <Container maxW="container.md">
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
    </Container>
  );
};

export default index;
