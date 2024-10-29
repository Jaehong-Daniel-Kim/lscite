import {
    Box,
    Button,
    Checkbox, Divider,
    Grid,
    HStack,
    IconButton,
    Input,
    InputGroup, Popover, PopoverAnchor, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger,
    StackDivider,
    Text, useColorMode, useColorModeValue, useDisclosure,
    VStack
} from "@chakra-ui/react";
import React, {useRef, useState} from "react";
import SidePanel from "../components/sidePanel/SidePanel";
import MailList from "../components/MailList";
import Header from "../components/header/Header";
import useUser from "../lib/useUser";
import SessionErrorModal from "../components/SessionErrorModal";
import SidePanelV2 from "../components/sidePanel/SidePanelv2";


export default function Home() {
    const {isUserLoading, isUserLoggedIn, user} = useUser();
    const {isOpen, onClose, onOpen} = useDisclosure();

    return (
        <VStack
            overflow={"hidden"}
            w={"100%"}
            h={"100%"}
            position={"relative"}
            gap={0}

        >
            <Header />
            <HStack
                w={"100%"}
                flex={"1 1 auto"}
                minH={0}
                position={"relative"}
                gap={0}
            >
                {/*<SidePanel />*/}
                <SidePanelV2 />
                <MailList title={"Inbox"}/>
            </HStack>
        </VStack>
    );
}