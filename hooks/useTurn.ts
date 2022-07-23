import { useEffect, useState } from "react";

export const useTurn = () => {
  const [currentItem, setCurrentItem] = useState({ id: "", hour: "" });
  const [isSuccessUpdate, setIsSuccessUpdate] = useState(false);
  const [isErrorUpdate, setIsErrorUpdate] = useState(false);

  const onInputHourChange = (e: any, id: string) => {
    setCurrentItem({ id, hour: e.target.value });
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
  };
};
