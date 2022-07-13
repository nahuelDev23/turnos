import { FC } from "react";
import { Input, Button } from "@chakra-ui/react";

import { IAvailableHours } from "../../../interface";

interface Props {
  handleChangeStep: (e: any, i: number) => void;
  index: number;
  times: IAvailableHours;
  addStep: () => void;
  deleteStep: (index: number) => void;
  isPreviousInputEmpty: boolean;
}

// todo usemultipleinputs hacer test
export const InputHour: FC<Props> = ({
  handleChangeStep,
  index,
  times,
  addStep,
  deleteStep,
  isPreviousInputEmpty,
}) => {
  return (
    <>
      <Input
        required
        aria-label="input-hour"
        className="w-full rounded shadow p-2 mb-4 text-black rounded-tr-none"
        name="hours"
        placeholder={`Horario N ${index}`}
        type="text"
        value={times.time}
        onChange={(event) => handleChangeStep(event, index)}
      />
      <Button
        className="h-full py-2 px-4 bg-yellow-300 rounded-tr rounded-br mr-2"
        disabled={isPreviousInputEmpty}
        onClick={addStep}
      >
        +
      </Button>
      {index > 0 && (
        <Button
          className="h-full py-2 px-4 px-2  bg-red-300 text-black rounded"
          onClick={() => deleteStep(index)}
        >
          -
        </Button>
      )}
    </>
  );
};
