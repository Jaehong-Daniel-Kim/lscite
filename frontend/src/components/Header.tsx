import {Box, Button, HStack, IconButton, useDisclosure} from "@chakra-ui/react";
import {ImMail3} from "react-icons/im";
import {FaMoon} from "react-icons/fa";
import LoginModal from "./LoginModal";
import React from "react";
import SignUpModal from "./SignUpModal";

export default function Header() {

    const {isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen} = useDisclosure()
    const {isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen} = useDisclosure()

    return (
        <HStack
            justifyContent={"space-between"}
            py={"10"}
            px={"5"}
            borderBottomWidth={1}
        >
            <Box color={"red.500"}>
                <ImMail3 size={"36"}/>
            </Box>
            <HStack spacing={"2.5px"}>
                <IconButton variant={"ghost"} aria-label={"Toggle dark mode"} icon={<FaMoon/>}/>
                <Button onClick={onLoginOpen}>Log in</Button>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign up</Button>
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose}/>
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose}/>
        </HStack>
    )
}