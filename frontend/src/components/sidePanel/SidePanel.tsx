import {
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
        <VStack
            borderRight={"0.5px solid gray"}
            position={"relative"}
            py={5}
            w={!isMenuCollapsed ? "600px" : "100px"}
            h={"100vh"}
        >
            {!isMenuCollapsed? (
                <VStack w={"80%"}>
                    <HStack w={"95%"} justifyContent={"space-between"}>
                        <Heading fontSize={"3xl"}>Mail</Heading>
                        <Tooltip label = {"Collapse"}>
                            <IconButton
                                aria-label={"Collapse"}
                                icon={<TbLayoutSidebarLeftCollapse size={"30"} />}
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
                            icon={<TbLayoutSidebarRightCollapse size={"30"} />}
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
    )
}
