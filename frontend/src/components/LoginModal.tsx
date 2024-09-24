import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack
} from "@chakra-ui/react";
import {FaLock, FaUser} from "react-icons/fa";
import LoginOptions from "./LoginOptions";
import React from "react";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({isOpen, onClose}: LoginModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <VStack mb={"6"}>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.400"}>
                                    <FaUser/>
                                </Box>}
                            />
                            <Input variant={"filled"} placeholder={"Username"}/>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.400"}>
                                    <FaLock/>
                                </Box>}
                            />
                            <Input variant={"filled"} placeholder={"Password"}/>
                        </InputGroup>
                    </VStack>
                    <Button colorScheme={"red"} w={"100%"}>Login</Button>
                    <LoginOptions/>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}