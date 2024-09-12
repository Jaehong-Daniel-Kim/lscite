import {Box, Button, Divider, Heading, HStack, IconButton, Stack, Tooltip, VStack, Text} from "@chakra-ui/react";
import {TbLayoutSidebarLeftCollapse} from "react-icons/tb";
import {BsDot, BsEnvelopeArrowDown, BsEnvelopeArrowUp} from "react-icons/bs";
import {IoDocumentOutline} from "react-icons/io5";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import CustomMailBox from "./CustomMailBox";
import {useState} from "react";

interface IMenuBtn {
    icon: any;
    name: string;
    mailCount: number;
}

export default function SideMenuBar() {

    const [isOpen, setIsOpen] = useState(true);
    const [isMenuCollapsed, setMenuCollapsed] = useState(false);

    const handleFold = () => {
        setIsOpen((prev) => !prev);
    }

    const handleMenuCollapse = () => {
        setMenuCollapsed((prev) => !prev);
    }
    const MenuButton = ({icon, name, mailCount}: IMenuBtn) => (
        <HStack
            w={"100%"}>
            justifyContent={"left"}
            <Button
                w={"100%"}
                fontSize={"xl"}
                leftIcon={icon}
                variant={"ghost"}
                colorScheme={"pink"}
            >
                <HStack w={"100%"} justifyContent={"space-between"}>
                    <Text>{name}</Text>
                    <HStack w={"10%"}>
                        <Text>{mailCount? mailCount : null}</Text>
                    </HStack>
                </HStack>
            </Button>
        </HStack>
    )

    return (
        <></>
            )
/*
        <VStack
            position={"fixed"}
            left={0}
            top={"150px"}
            py={5}
            w={"300px"}
            minH={"100%"}
            maxH={"100%"}
            backgroundColor={"pink.100"}
        >
            <VStack px={"7"} w={"100%"} my={"5"} >
                <HStack w={"95%"} justifyContent={"space-between"}>
                    <Heading fontSize={"3xl"}>Mail</Heading>
                    <Tooltip label={"Collapse"}>
                        {}
                        <IconButton
                            aria-label={"Collapse"}
                            icon={<TbLayoutSidebarLeftCollapse size={"30"} />}
                            variant={"ghost"}
                        />
                    </Tooltip>
                </HStack>
                <Button colorScheme={"pink"} marginTop={5} py={"7"} w={"100%"} fontSize={"2xl"} borderRadius={"10"}>New Mail</Button>
            </VStack>
            <VStack px={"7"} w={"100%"} overflowY={"scroll"}>
                <MenuButton icon={<BsEnvelopeArrowDown />} name={"Inbox"} mailCount={4}/>
                <MenuButton icon={<BsEnvelopeArrowUp />} name={"Sent"} mailCount={5} />
                <MenuButton icon={<IoDocumentOutline />} name={"Temp Mails"} mailCount={0}/>
                <Divider py={"2"} borderColor={"black"}  w={"100%"} orientation={"horizontal"} />

                <HStack px={"2"} w={"100%"} justifyContent={"space-between"}>
                    <Text fontSize={"lg"} as={"b"}>My Mails Box</Text>
                    {!isOpen? (
                        <Tooltip label={"Expand"}>
                            <IconButton
                                aria-label={"Expand"}
                                icon={<FaCaretDown size={"20"}/>}
                                variant={"ghost"}
                                onClick={handleFold}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip label={"Collapse"}>
                            <IconButton
                                aria-label={"Collapse"}
                                icon={<FaCaretUp size={"20"}/>}
                                variant={"ghost"}
                                onClick={handleFold}
                            />
                        </Tooltip>
                    )}
                </HStack>
                {!isOpen? (
                    <Box></Box>
                ) : (
                    <Stack w={"100%"}>
                        <CustomMailBox name={"First"} mailCount={1} />
                        <CustomMailBox name={"First"} mailCount={1} />
                        <CustomMailBox name={"First"} mailCount={1} />
                        <CustomMailBox name={"First"} mailCount={1} />
                        <CustomMailBox name={"First"} mailCount={1} />
                        <CustomMailBox name={"First"} mailCount={1} />
                        <CustomMailBox name={"First"} mailCount={1} />
                        <CustomMailBox name={"First"} mailCount={1} />
                        <CustomMailBox name={"First"} mailCount={1} />
                        <CustomMailBox name={"First"} mailCount={1} />
                    </Stack>
                )}

            </VStack>
        </VStack>


    )
*/
}