import { FC, useContext, useEffect } from "react";

import { DaysContext } from "../../context/DaysContext";
import { useMultipleInputs } from "../../hooks/useMultipleInputs";
import { daysString, IAvailableHours } from "../../interface/IAvailableDays";

import { ButtonDay } from "./form/ButtonDay";
import { InputHour } from "./form/InputHour";

interface Props {
  text: daysString;
}

export const CheckDayTemplate: FC<Props> = ({ text }) => {
  const { addFormToFormData, daysData, isLoadingFormData, removeDay } =
    useContext(DaysContext);

  const {
    addStep,
    deleteStep,
    formAvailableDays,
    isPreviousInputEmpty,
    handleChangeStep,
    toggleDisableDay,
    setDayAvailable,
    setFormAvailableDays,
    setToggleDisableDay,
    // setOriginalState,
  } = useMultipleInputs(text);

  useEffect(() => {
    addFormToFormData(formAvailableDays);
  }, [formAvailableDays]);

  useEffect(() => {
    const currentDayComponent = daysData.find((item) => item.day === text);

    if (currentDayComponent) {
      const hasAtLastOneTimeSetted = currentDayComponent.hours.some(
        (item: IAvailableHours) => item.time !== "",
      );

      setToggleDisableDay(hasAtLastOneTimeSetted);

      setFormAvailableDays({
        day: currentDayComponent.day,
        hours: currentDayComponent.hours,
      });
    }
  }, [daysData]);

  useEffect(() => {
    const currentDayComponent = daysData.find((item) => item.day === text);

    if (!toggleDisableDay) {
      removeDay(text);
    } else {
      if (currentDayComponent) {
        console.log({ currentDayComponent });

        setFormAvailableDays({
          day: currentDayComponent.day,
          hours: currentDayComponent.hours,
        });
      }
    }
  }, [toggleDisableDay]);

  return (
    <>
      <ButtonDay
        haveAtLastOneTime={toggleDisableDay}
        isLoadingFormData={isLoadingFormData}
        setDayAvailable={setDayAvailable}
        text={text}
      />
      {isLoadingFormData && "buscando horarios en db"}
      {toggleDisableDay &&
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
