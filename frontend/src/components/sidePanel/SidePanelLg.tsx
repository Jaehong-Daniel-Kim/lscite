import {
    Text,
    Button,
    Divider,
    Heading,
    HStack,
    IconButton,
    Tooltip,
    useDisclosure,
    VStack,
    Collapse, Stack
} from "@chakra-ui/react";
import {TbLayoutSidebarLeftCollapse} from "react-icons/tb";
import {FaRegPenToSquare} from "react-icons/fa6";
import MailBox from "./MailBox";
import {BsDot, BsEnvelopeArrowDown, BsEnvelopeArrowUp} from "react-icons/bs";
import {IoDocumentOutline} from "react-icons/io5";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";

export default function SidePanelLg() {

    const {isOpen, onToggle} = useDisclosure()

    return (
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
                <Button
                    leftIcon={<FaRegPenToSquare />}
                    colorScheme={"pink"}
                    marginTop={5}
                    py={"7"}
                    w={"100%"}
                    fontSize={"2xl"}
                    borderRadius={"10"}
                >
                    New Mail
                </Button>
            </VStack>
            <VStack px={"7"} w={"100%"} overflowY={"scroll"}>
                <MailBox icon={<BsEnvelopeArrowDown />} name={"Inbox"} mailCount={4} />
                <MailBox icon={<BsEnvelopeArrowUp />} name={"Sent"} mailCount={4} />
                <MailBox icon={<IoDocumentOutline />} name={"Temp Mails"} mailCount={0} />
                <Divider py={"2"} borderColor={"black"}  w={"100%"} orientation={"horizontal"} />

                <HStack px={"2"} w={"100%"} justifyContent={"space-between"}>
                    <Text fontSize={"lg"} as={"b"}>My Mailbox</Text>
                    { //My Mailbox Expand Button
                        !isOpen ? (
                            <Tooltip label={"Expand"}>
                                <IconButton
                                    aria-label={"Expand"}
                                    icon={<FaCaretDown size={"20"} />}
                                    variant={"ghost"}
                                    onClick={onToggle}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip label={"Collapse"}>
                                <IconButton
                                    aria-label={"Collapse"}
                                    icon={<FaCaretUp size={"20"} />}
                                    variant={"ghost"}
                                    onClick={onToggle}
                                />
                            </Tooltip>
                        )
                    }

                </HStack>
                <Collapse style={{width: "100%"}} in={!isOpen} animateOpacity>
                    <Stack w={"100%"}>
                        <MailBox icon={<BsDot />} name={"First"} mailCount={2} />
                        <MailBox icon={<BsDot />} name={"Second"} mailCount={1} />
                        <MailBox icon={<BsDot />} name={"Thrid"} mailCount={0} />
                        <MailBox icon={<BsDot />} name={"Forth"} mailCount={5} />
                        <MailBox icon={<BsDot />} name={"Fifth"} mailCount={5} />
                    </Stack>
                </Collapse>
            </VStack>
        </VStack>
    )
}