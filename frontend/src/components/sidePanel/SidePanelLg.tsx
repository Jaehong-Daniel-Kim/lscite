import {
    Text,
    Divider,
    HStack,
    IconButton,
    Tooltip,
    useDisclosure,
    VStack,
    Collapse, Stack
} from "@chakra-ui/react";
import MailBox from "./MailBox";
import {BsDot, BsEnvelopeArrowDown, BsEnvelopeArrowUp} from "react-icons/bs";
import {IoDocumentOutline} from "react-icons/io5";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";

export default function SidePanelLg() {

    const {isOpen, onToggle} = useDisclosure()

    return (
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
    )
}