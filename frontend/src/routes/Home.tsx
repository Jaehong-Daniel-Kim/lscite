import {
    Box,
    Button,
    Checkbox, Divider,
    Grid,
    HStack,
    IconButton,
    Input,
    InputGroup,
    StackDivider,
    Text, useColorMode, useColorModeValue, useDisclosure,
    VStack
} from "@chakra-ui/react";
import React, {useState} from "react";
import SidePanel from "../components/sidePanel/SidePanel";
import MailList from "../components/MailList";
import Header from "../components/header/Header";
import useUser from "../lib/useUser";
import SessionErrorModal from "../components/SessionErrorModal";


export default function Home() {
    const {isUserLoading, isUserLoggedIn, user} = useUser()
    const {isOpen, onClose, onOpen} = useDisclosure()

    const handleOpenModal = () => {
        console.log("called")
        onOpen()
    }

    return (
        <>
            <Header />
            <HStack
                position={"relative"}
                gap={0}
            >
                <SidePanel />

                <MailList title={"Inbox"}/>
            </HStack>
        </>
    );
}