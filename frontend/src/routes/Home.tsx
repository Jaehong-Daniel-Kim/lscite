import {
    HStack, useDisclosure, VStack
} from "@chakra-ui/react";
import MailList from "../components/MailList";
import Header from "../components/header/Header";
import useUser from "../lib/useUser";
import SidePanelV2 from "../components/sidePanel/SidePanelv2";


export default function Home() {

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