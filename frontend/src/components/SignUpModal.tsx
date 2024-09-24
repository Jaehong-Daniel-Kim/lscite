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
import {FaEnvelope, FaLock, FaUser, FaUserCheck} from "react-icons/fa";
import LoginOptions from "./LoginOptions";
import React from "react";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignUpModal({isOpen, onClose}: SignUpModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>SignUp</ModalHeader>
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
                                    <FaUserCheck/>
                                </Box>}
                            />
                            <Input variant={"filled"} placeholder={"name"}/>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.400"}>
                                    <FaEnvelope/>
                                </Box>}
                            />
                            <Input variant={"filled"} placeholder={"email"}/>
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
                    <Button colorScheme={"red"} w={"100%"}>SignUp</Button>
                    <LoginOptions/>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}