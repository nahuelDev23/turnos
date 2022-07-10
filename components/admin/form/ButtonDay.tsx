import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  haveAtLastOneTime: boolean;
  loading: boolean;
  setDayAvailable: () => void;
  text: string;
}

export const ButtonDay: FC<Props> = ({
  haveAtLastOneTime,
  loading,
  setDayAvailable,
  text,
}) => {
  return (
    <Button
      bgColor={haveAtLastOneTime ? "green.600" : undefined}
      disabled={loading}
      onClick={setDayAvailable}
    >
      {text}
    </Button>
  );
};
