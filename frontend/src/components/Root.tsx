import {Outlet} from "react-router-dom";
import {Box, HStack} from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import MailList from "./MailList";
import SidePanel from "./sidePanel/SidePanel";

export default function Root() {
    return (
        <Box
            w={"100vw"}
            h={"100vh"}
            overflowY={"hidden"}
        >
            <Outlet />
            <Header />

            <HStack>
                <SidePanel />
                <MailList title={"Inbox"}/>
            </HStack>
        </Box>
    )
}