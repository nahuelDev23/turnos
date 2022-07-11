import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  haveAtLastOneTime: boolean;
  isLoadingFormData: boolean;
  setDayAvailable: () => void;
  text: string;
}

export const ButtonDay: FC<Props> = ({
  haveAtLastOneTime,
  isLoadingFormData,
  setDayAvailable,
  text,
}) => {
  return (
    <Button
      bgColor={haveAtLastOneTime ? "green.600" : undefined}
      disabled={isLoadingFormData}
      onClick={setDayAvailable}
    >
      {text}
    </Button>
  );
};
