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

export default function SidePanelSm() {

    const {isOpen, onToggle} = useDisclosure()

    return (
        <VStack px={"7"} w={"100%"} overflowY={"scroll"}>
            <MailBox icon={<BsEnvelopeArrowDown />} name={"Inbox"} mailCount={4} isSm={true} />
            <MailBox icon={<BsEnvelopeArrowUp />} name={"Sent"} mailCount={4} isSm={true} />
            <MailBox icon={<IoDocumentOutline />} name={"Temp Mails"} mailCount={0} isSm={true} />
            <Divider py={"2"} borderColor={"black"}  w={"100%"} orientation={"horizontal"} />

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
                )}

            <Collapse style={{width: "100%"}} in={!isOpen} animateOpacity>
                <Stack w={"100%"}>
                    <MailBox icon={null} name={"First"} mailCount={2} isSm={true} />
                    <MailBox icon={null} name={"Second"} mailCount={1} isSm={true} />
                    <MailBox icon={null} name={"Thrid"} mailCount={0} isSm={true} />
                    <MailBox icon={null} name={"Forth"} mailCount={5} isSm={true} />
                    <MailBox icon={null} name={"Fifth"} mailCount={5} isSm={true} />
                </Stack>
            </Collapse>
        </VStack>
    )
}