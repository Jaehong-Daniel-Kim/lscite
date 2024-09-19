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

export default function Home() {

    return (
        <HStack position={"relative"}>
            <SidePanel />
            <MailList title={"Inbox"}/>
        </HStack>
    );
}