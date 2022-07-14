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
      _hover={{ backgroundColor: "rgba(0,0,0,.1)" }}
      bgColor={haveAtLastOneTime ? "blue.700" : "transparent"}
      border={haveAtLastOneTime ? undefined : "2px solid"}
      borderStyle={haveAtLastOneTime ? undefined : "dashed"}
      color="white"
      disabled={isLoadingFormData}
      onClick={setDayAvailable}
    >
      {text}
    </Button>
  );
};
