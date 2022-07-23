import { Text } from "@chakra-ui/react";
import useSWR from "swr";

import { AdminLayout } from "../../components/admin/layout/AdminLayout";
import { TableTurn } from "../../components/admin/table/TableTurn";

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

const turns = () => {
  const { data, error: errorListTurns } = useSWR("/api/turn", fetcher);

  if (errorListTurns) <Text>Algo salio mal</Text>;

  return (
    <AdminLayout>
      {!data ? (
        <Text>Cargando Turnos</Text>
      ) : (
        <TableTurn turnsView={data.listTurns} />
      )}
    </AdminLayout>
  );
};

export default turns;
