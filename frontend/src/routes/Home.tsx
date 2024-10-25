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
import SidePanelV2 from "../components/sidePanel/SidePanelv2";


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
                w={"100%"}
                position={"relative"}
                gap={0}
            >
                {/*<SidePanel />*/}
                <SidePanelV2 />

                <MailList title={"Inbox"}/>
            </HStack>
        </>
    );
}