// eslint-disable-next-line import/order

import "react-datepicker/dist/react-datepicker.css";

import { Stack } from "@chakra-ui/react";

import { PublicLayout } from "../components/Layout/PublicLayout";
import { TakeATurn } from "../components/users/formTakeATurn/TakeATurn";

const Home = () => {
  return (
    <PublicLayout>
      <Stack>
        <TakeATurn />
      </Stack>
    </PublicLayout>
  );
};

export default Home;
