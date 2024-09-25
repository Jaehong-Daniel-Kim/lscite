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
    Text, useColorMode, useColorModeValue,
    VStack
} from "@chakra-ui/react";
import React, {useState} from "react";
import SidePanel from "../components/sidePanel/SidePanel";
import MailList from "../components/MailList";
import Header from "../components/header/Header";

export default function Home() {

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