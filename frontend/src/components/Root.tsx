import {Outlet} from "react-router-dom";
import {Box, HStack, VStack} from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import MailList from "./MailList";
import SidePanel from "./sidePanel/SidePanel";

export default function Root() {
    return (
        <VStack
            w={"100vw"}
            h={"100vh"}
            position={"fixed"}
            id={"container"}
            gap={0}
        >
            <Header />
            <Outlet />
        </VStack>
    )
}