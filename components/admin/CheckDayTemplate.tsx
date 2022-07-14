import { FC, useContext, useEffect, useMemo, useState } from "react";
import { Stack, Text } from "@chakra-ui/react";

import { DaysContext } from "../../context/DaysContext";
import { useMultipleInputs } from "../../hooks/useMultipleInputs";
import { daysString, IAvailableHours } from "../../interface/IAvailableDays";
import { SkeletonLoadingTimes } from "../UI/SkeletonLoadingTimes";

import { ButtonDay } from "./form/ButtonDay";
import { InputHour } from "./form/InputHour";

interface Props {
  text: daysString;
}

export const CheckDayTemplate: FC<Props> = ({ text }) => {
  const { addFormToFormData, daysData, isLoadingFormData, removeDay } =
    useContext(DaysContext);

  const [isActiveDay, setIsActiveDay] = useState(false);

  const {
    addStep,
    deleteStep,
    formAvailableDays,
    isSomeInputEmpty,
    handleChangeStep,
    setFormAvailableDays,
  } = useMultipleInputs(text);

  const setDayAvailable = () => {
    setIsActiveDay((isAvailable) => !isAvailable);
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

      setIsActiveDay(hasAtLastOneTimeSetted);

      setFormAvailableDays({
        day: currentDayComponent.day,
        hours: currentDayComponent.hours,
      });
    }
  }, [daysData]);

  useEffect(() => {
    if (!isActiveDay) return removeDay(text);

    setFormAvailableDays({
      day: formAvailableDays.day,
      hours: formAvailableDays.hours,
    });
  }, [isActiveDay]);

  return (
    <>
      <Stack>
        <ButtonDay
          haveAtLastOneTime={isActiveDay}
          isLoadingFormData={isLoadingFormData}
          setDayAvailable={setDayAvailable}
          text={text}
        />
        {isLoadingFormData && <SkeletonLoadingTimes />}
        {isActiveDay &&
          formAvailableDays.hours.map((times: any, index: number) => (
            <div key={index} className="flex">
              <InputHour
                addStep={addStep}
                deleteStep={deleteStep}
                handleChangeStep={handleChangeStep}
                index={index}
                isSomeInputEmpty={isSomeInputEmpty}
                times={times}
              />
            </div>
          ))}
      </Stack>
    </>
  );
};
