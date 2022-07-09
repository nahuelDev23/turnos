import { FC, useContext, useState, useEffect } from "react";

import { DaysContext } from "../../context/DaysContext";

interface Props {
  text: string;
  // onChange: () => void;
}

export const CheckDayTemplate: FC<Props> = ({ text }) => {
  const [formAvailableDays, setFormAvailableDays] = useState<any>({
    day: text,
    hours: [{ time: "" }],
  });
  const { addFormToFormData } = useContext(DaysContext);

  const handleChangeStep = (e, i) => {
    const values = { ...formAvailableDays };

    values.hours[i].time = e.target.value;
    setFormAvailableDays(values);
  };

  const addStep = (e: any) => {
    const values = { ...formAvailableDays };

    values.hours.push({
      time: "",
    });
    setFormAvailableDays(values);
  };

  useEffect(() => {
    console.log(formAvailableDays);
    addFormToFormData(formAvailableDays);
  }, [formAvailableDays]);

  return (
    <>
      {/* <Checkbox value="domingo" onChange={onChange}>
        {text}
      </Checkbox> */}
      {text}
      {formAvailableDays.hours.map((el, i) => (
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
          <div
            className="h-full py-2 px-4 bg-yellow-300 rounded-tr rounded-br mr-2"
            onClick={addStep}
          >
            +
          </div>
          {/* {i > 0 && (
            <div
              className="h-full py-2 px-4 px-2  bg-red-300 text-black rounded"
              onClick={deleteStep}
            >
              -
            </div>
          )} */}
        </div>
      ))}

      {/* <Button onClick={() => { }}>Setear {text}</Button> */}
    </>
  );
};
