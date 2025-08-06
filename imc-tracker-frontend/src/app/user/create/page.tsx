import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import UserForm from "@/components/UserForm";
import { Flex } from "@chakra-ui/react";

export default function CreateUser() {
  return (
    <Flex height={"100vh"} direction={"column"} justify={"space-between"}>
      <Header />
      <UserForm />
      <Footer />
    </Flex>
  );
}
