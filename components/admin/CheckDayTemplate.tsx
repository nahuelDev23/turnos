import { Button } from "@chakra-ui/react";
import { FC, useContext, useState, useEffect, useMemo } from "react";

import { DaysContext } from "../../context/DaysContext";

interface Props {
  text: string;
  // onChange: () => void;
}

export const CheckDayTemplate: FC<Props> = ({ text }) => {
  const { addFormToFormData, daysData } = useContext(DaysContext);
  const { days: theDay } = daysData;
  // desde el provider tener los valores de la db si coincide con el text llenar los hour
  // todo hacer hooks de add inputs y todo eso
  const initialState = {
    day: text,
    hours: [{ time: "" }],
  };

  const [formAvailableDays, setFormAvailableDays] = useState<any>(initialState);

  const [day, setDay] = useState(formAvailableDays.hours[0].time !== "");

  const handleChangeStep = (e: any, i: number) => {
    const values = { ...formAvailableDays };

    values.hours[i].time = e.target.value;
    setFormAvailableDays(values);
  };

  const setDayAvailable = () => {
    setDay((isAvailable) => !isAvailable);
    setFormAvailableDays(initialState);
  };

  const addStep = (e: any) => {
    const values = { ...formAvailableDays };

    values.hours.push({
      time: "",
    });
    setFormAvailableDays(values);
  };

  const deleteStep = (e: any, i: number) => {
    const values = { ...formAvailableDays };

    values.hours.splice(i, 1);
    setFormAvailableDays(values);
  };

  const computedPreviousHour = useMemo(() => {
    const first =
      formAvailableDays.hours.length === 1 &&
      formAvailableDays.hours[0].time === "";
    const second =
      formAvailableDays.hours.length > 1 &&
      formAvailableDays.hours[formAvailableDays.hours.length - 1].time === "";

    return first || second;
  }, [formAvailableDays]);

  useEffect(() => {
    addFormToFormData(formAvailableDays);
    console.log("se disparo");
  }, [formAvailableDays]);

  useEffect(() => {
    theDay &&
      theDay.map((item) => {
        if (item.day === text) {
          console.log("item", item);
          setDay(true);
          setFormAvailableDays({
            day: item.day,
            hours: [...item.hours],
          });
        }
      });
  }, [theDay]);

  return (
    <>
      <Button bgColor={day ? "green.600" : undefined} onClick={setDayAvailable}>
        {text}
      </Button>

      {day &&
        formAvailableDays.hours.map((el: any, i: number) => (
          <div key={i} className="flex">
            <input
              required
              className="w-full rounded shadow p-2 mb-4 text-black rounded-tr-none"
              name="hours"
              placeholder={`Paso ${i}`}
              type="text"
              value={el.time}
              onChange={(e) => handleChangeStep(e, i)}
            />
            <Button
              className="h-full py-2 px-4 bg-yellow-300 rounded-tr rounded-br mr-2"
              disabled={computedPreviousHour}
              onClick={addStep}
            >
              +
            </Button>
            {i > 0 && (
              <Button
                className="h-full py-2 px-4 px-2  bg-red-300 text-black rounded"
                onClick={() => deleteStep(el, i)}
              >
                -
              </Button>
            )}
          </div>
        ))}
    </>
  );
};
