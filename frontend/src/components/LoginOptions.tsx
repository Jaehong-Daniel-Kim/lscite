import {Box, Button, Divider, HStack, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {FaComment, FaGithub} from "react-icons/fa";
import React from "react";
import {TbPencilPlus} from "react-icons/tb";
import SignUpModal from "./SignUpModal";

export default function LoginOptions() {

    const {isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen} = useDisclosure()

    return (
        <Box>
            <HStack my={8}>
                <Divider borderColor={"white"}/>
                <Text textTransform={"uppercase"}
                      color={"gray.700"}
                      fontSize={"xs"}
                      as={"b"}>
                    Or
                </Text>
                <Divider borderColor={"white"}/>
            </HStack>
            <VStack>
                <Button w={"100%"} leftIcon={<TbPencilPlus/>} colorScheme={"green"} onClick={onSignUpOpen}>
                    Sign Up New
                </Button>
                <Button w={"100%"} leftIcon={<FaGithub/>} colorScheme={"blue"}>
                    Continue with Github
                </Button>
                <Button w={"100%"} leftIcon={<FaComment/>} colorScheme={"yellow"}>
                    Continue with Kakao
                </Button>
            </VStack>
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Box>
    )
}