import { Box } from "@chakra-ui/react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Box mb="4">
      <Link passHref href="/admin">
        <Box as="a" bgColor="blue.500" borderRadius="md" color="white" p="2">
          Panel administrador
        </Box>
      </Link>
    </Box>
  );
};
