import { FC, useContext, useEffect } from "react";

import { DaysContext } from "../../context/DaysContext";
import { useMultipleInputs } from "../../hooks/useMultipleInputs";
import { daysString } from "../../interface/IAvailableDays";

import { ButtonDay } from "./form/ButtonDay";
import { InputHour } from "./form/InputHour";

interface Props {
  text: daysString;
}

export const CheckDayTemplate: FC<Props> = ({ text }) => {
  const { addFormToFormData, daysData, loading } = useContext(DaysContext);

  const {
    addStep,
    deleteStep,
    formAvailableDays,
    isPreviousInputEmpty,
    handleChangeStep,
    haveAtLastOneTime,
    setDayAvailable,
    setFormAvailableDays,
    setOriginalState,
  } = useMultipleInputs(text);

  useEffect(() => {
    addFormToFormData(formAvailableDays);
  }, [formAvailableDays]);

  useEffect(() => {
    const currentDayComponent = daysData.find((item) => item.day === text);

    if (currentDayComponent) {
      setFormAvailableDays({
        day: currentDayComponent.day,
        hours: currentDayComponent.hours,
      });
      setOriginalState({
        day: currentDayComponent.day,
        hours: currentDayComponent.hours,
      });
    }
  }, [daysData]);

  return (
    <>
      <ButtonDay
        haveAtLastOneTime={haveAtLastOneTime}
        loading={loading}
        setDayAvailable={setDayAvailable}
        text={text}
      />
      {loading && "buscando horarios en db"}
      {haveAtLastOneTime &&
        formAvailableDays.hours.map((element: any, index: number) => (
          <div key={index} className="flex">
            <InputHour
              addStep={addStep}
              deleteStep={deleteStep}
              element={element}
              handleChangeStep={handleChangeStep}
              index={index}
              isPreviousInputEmpty={isPreviousInputEmpty}
            />
          </div>
        ))}
    </>
  );
};
