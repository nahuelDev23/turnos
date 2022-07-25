import { Stack, Text } from "@chakra-ui/react";

interface Props {
  text: string;
  bgColor: string;
  textColor: string;
}

const AlertMessage = ({ text, bgColor, textColor }: Props) => {
  return (
    <Stack bgColor={bgColor} borderRadius="md" my="4" p="4">
      <Text color={textColor}>{text}</Text>
    </Stack>
  );
};

export default AlertMessage;
