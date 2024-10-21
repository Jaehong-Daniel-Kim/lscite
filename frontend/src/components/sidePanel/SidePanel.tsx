import {
    chakra,
    Text,
    Box,
    Heading,
    HStack,
    IconButton,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import {TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse} from "react-icons/tb";
import {useState} from "react";
import SidePanelLg from "./SidePanelLg";
import NewMailLg from "./NewMailLg";
import NewMailSm from "./NewMailSm";
import SidePanelSm from "./SidePanelSm";


export default function SidePanel() {

    const [isMenuCollapsed, setMenuCollapsed] = useState(false);

    const handleMenuCollapse = () => {
        console.log("clicked")
        setMenuCollapsed((prev) => !prev);
    }

    return (
        <HStack
            py={5}
            borderRight={"0.5px solid gray"}
            w={!isMenuCollapsed ? "600px" : "100px"}
            h={"100vh"}
            position={"relative"}
        >
            <VStack
                position={"relative"}
                w={"100%"}
                h={"100%"}
            >
                {!isMenuCollapsed? (
                    <VStack w={"80%"}>
                        <HStack w={"95%"} justifyContent={"space-between"}>
                            <Heading fontSize={"2xl"}>Mail</Heading>
                            <Tooltip label = {"Collapse"}>
                                <IconButton
                                    aria-label={"Collapse"}
                                    icon={<TbLayoutSidebarLeftCollapse size={"25"} />}
                                    variant={"ghost"}
                                    onClick={handleMenuCollapse}
                                />
                            </Tooltip>
                        </HStack>
                        <NewMailLg />
                    </VStack>
                ) : (
                    <VStack w={"100%"}>
                        <Tooltip label = {"Expend"}>
                            <IconButton
                                aria-label={"Expend"}
                                icon={<TbLayoutSidebarRightCollapse size={"25"} />}
                                variant={"ghost"}
                                onClick={handleMenuCollapse}
                            />
                        </Tooltip>
                        <NewMailSm />
                    </VStack>

                )}
                {!isMenuCollapsed ? (
                    <SidePanelLg />
                ) : (
                    <SidePanelSm />
                )}
            </VStack>
            {/*Resize Divider*/}
            <Box
                display={"flex"}
                position={"absolute"}
                cursor={"col-resize"}
                justifyContent={"center"}
                alignItems={"center"}
                h={"100%"}
                w={"8px"}
                left={"calc(100% - 1px)"}
                _hover={
                    { borderLeft: "1px solid red" }
                }
            >
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"2px"}
                >
                    <chakra.span display={"block"} width={"2px"} h={"2px"} bgColor={"#5a5a5a"} />
                    <chakra.span display={"block"} width={"2px"} h={"2px"} bgColor={"#5a5a5a"} />
                    <chakra.span display={"block"} width={"2px"} h={"2px"} bgColor={"#5a5a5a"} />
                    <chakra.span display={"block"} width={"2px"} h={"2px"} bgColor={"#5a5a5a"} />
                </Box>

            </Box>
        </HStack>
    )
}
