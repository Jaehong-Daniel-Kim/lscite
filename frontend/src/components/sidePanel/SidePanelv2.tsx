import {Box, Heading, HStack, IconButton, Tooltip, useColorModeValue, VStack} from "@chakra-ui/react";
import {useState} from "react";
import {TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse} from "react-icons/tb";
import NewMailSm from "./NewMailSm";
import NewMailLg from "./NewMailLg";
import InnerBoard from "./InnerBoard";

export default function SidePanelV2() {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState<boolean>(false);
    const sidePanelColor = useColorModeValue("gray.100", "gray.800")

    return (
        <VStack
            borderRight={"0.5px solid gray"}
            w={!isMenuCollapsed ? "200px" : "100px"}
            minW={!isMenuCollapsed ? "200px" : "100px"}
            maxW={!isMenuCollapsed ? "200px" : "100px"}
            h={"100%"}
            rowGap={5}
            position={"relative"}
            bg={sidePanelColor}
        >
            {/*Title and collapse button*/}
            <HStack
                w={"100%"}
                px={6}
                pt={5}
                justifyContent={isMenuCollapsed ? "center" : "space-between"}
            >
                {
                    isMenuCollapsed
                        ? <></>
                        : <Heading fontSize={"xl"}>Mail</Heading>

                }
                <Tooltip
                    label={isMenuCollapsed ? "Expand" : "Collapse"}
                >
                    <IconButton
                        aria-label={isMenuCollapsed ? "Expand" : "Collapse"}
                        icon={
                            isMenuCollapsed
                                ? <TbLayoutSidebarLeftCollapse  size={25} />
                                : <TbLayoutSidebarRightCollapse size={25} />
                        }
                        variant={"ghost"}
                        onClick={() => setIsMenuCollapsed((prev) => !prev)}
                    />
                </Tooltip>
            </HStack>

            {/*New mail button*/}
            <HStack
                w={"100%"}
                justifyContent={"center"}
            >
                {
                    isMenuCollapsed
                        ? <NewMailSm />
                        : <NewMailLg />
                }
            </HStack>
            <VStack
                w={"100%"}
                h={"100%"}
                position={"relative"}
                overflowX={"hidden"}
                overflowY={"scroll"}
            >
                <InnerBoard isMenuCollapsed={isMenuCollapsed}/>
            </VStack>
        </VStack>
    )
}