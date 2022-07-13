import { FC, useContext, useEffect, useMemo, useState } from "react";

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
  const [toggleDisableDay, setToggleDisableDay] = useState(false);

  const {
    addStep,
    deleteStep,
    formAvailableDays,
    isPreviousInputEmpty,
    handleChangeStep,
    setFormAvailableDays,
  } = useMultipleInputs(text);

  const setDayAvailable = () => {
    setToggleDisableDay((isAvailable) => !isAvailable);
  };
  const currentDayComponent = useMemo(
    () => daysData.find((item) => item.day === text),
    [daysData, text],
  );

  useEffect(() => {
    addFormToFormData(formAvailableDays);
  }, [formAvailableDays]);

  useEffect(() => {
    /** hace que se rellene automáticamente
     * y se ponga en true el toggle de los Dias
     *  */

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
    if (!toggleDisableDay) return removeDay(text);

    // if (currentDayComponent)
    //   return setFormAvailableDays({
    //     day: currentDayComponent.day,
    //     hours: currentDayComponent.hours,
    //   });

    setFormAvailableDays({
      day: formAvailableDays.day,
      hours: formAvailableDays.hours,
    });
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
        formAvailableDays.hours.map((times: any, index: number) => (
          <div key={index} className="flex">
            <InputHour
              addStep={addStep}
              deleteStep={deleteStep}
              handleChangeStep={handleChangeStep}
              index={index}
              isPreviousInputEmpty={isPreviousInputEmpty}
              times={times}
            />
          </div>
        ))}
    </>
  );
};
