import { Text } from "@chakra-ui/react";
import useSWR from "swr";
import { useEffect } from "react";

import { AdminLayout } from "../../components/admin/layout/AdminLayout";
import { TableTurn } from "../../components/admin/table/TableTurn";
import { useTurn } from "../../hooks";

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

const turns = () => {
  const { data, error: errorListTurns } = useSWR("/api/turn", fetcher);
  const {
    listTurns,
    loadTurnList,
    onInputHourChange,
    isSuccessUpdate,
    isErrorUpdate,
    handleDelete,
  } = useTurn();

  if (errorListTurns) <Text>Algo salio mal</Text>;

  useEffect(() => {
    data && loadTurnList(data.listTurns);
  }, [data]);

  return (
    <AdminLayout>
      {!listTurns ? (
        <Text>Cargando Turnos</Text>
      ) : (
        <TableTurn
          handleDelete={handleDelete}
          isErrorUpdate={isErrorUpdate}
          isSuccessUpdate={isSuccessUpdate}
          turnsView={listTurns}
          onInputHourChange={onInputHourChange}
        />
      )}
    </AdminLayout>
  );
};

export default turns;
