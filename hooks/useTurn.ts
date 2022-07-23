import { useEffect, useState } from "react";

import { ITurnDB } from "../interface/ITurn";

export const useTurn = () => {
  const [listTurns, setListTurns] = useState<ITurnDB[]>([]);
  const [currentItem, setCurrentItem] = useState({ id: "", hour: "" });
  const [isSuccessUpdate, setIsSuccessUpdate] = useState(false);
  const [isErrorUpdate, setIsErrorUpdate] = useState(false);

  const [isSuccessDelete, setIsSuccessDelete] = useState(false);
  const [isErrorDelete, setIsErrorDelete] = useState(false);

  const onInputHourChange = (e: any, id: string) => {
    setCurrentItem({ id, hour: e.target.value });
  };

  const loadTurnList = (turnList: ITurnDB[]) => {
    setListTurns(turnList);
  };

  const handleDelete = async (_id: string) => {
    const request = await fetch("/api/admin/turns", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
    });
    const response = await request.json();

    if (response.ok) {
      setIsSuccessDelete(true);
      setListTurns((listTurns) => listTurns.filter((item) => item._id !== _id));
      setTimeout(() => {
        setIsSuccessDelete(false);
      }, 2000);
    }
    if (!response.ok) {
      setIsErrorDelete(true);
      setTimeout(() => {
        setIsErrorDelete(false);
      }, 2000);
    }
  };
  const updateHourTurn = async () => {
    const request = await fetch("/api/admin/turns", {
      method: "PUT",
      body: JSON.stringify(currentItem),
    });

    const response = await request.json();

    if (response.ok) {
      setIsSuccessUpdate(true);
      setTimeout(() => {
        setIsSuccessUpdate(false);
      }, 2000);
    }
    if (!response.ok) {
      setIsErrorUpdate(true);
      setTimeout(() => {
        setIsErrorUpdate(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (currentItem.id) updateHourTurn();
  }, [currentItem]);

  return {
    onInputHourChange,
    currentItem,
    isSuccessUpdate,
    isErrorUpdate,
    isSuccessDelete,
    isErrorDelete,
    handleDelete,
    listTurns,
    loadTurnList,
  };
};
