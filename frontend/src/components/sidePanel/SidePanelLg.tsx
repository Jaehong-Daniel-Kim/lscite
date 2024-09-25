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
import {useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getMailboxes} from "../../api";
import {IMailbox} from "../../types";

export default function SidePanelLg() {
    const [activeMailbox, setActiveMailbox] = useState("Inbox");
    const {isLoading: isMailboxLoaindg, data: mailBoxes} = useQuery<IMailbox[]>({
        queryKey: ["mailboxes"], queryFn: getMailboxes
    });


    const handleActiveMailbox = (mailbox: string) => {
        setActiveMailbox(mailbox)
    }

    const {isOpen, onToggle} = useDisclosure()

    return (
        <VStack px={"7"} w={"100%"} overflowY={"scroll"}>
            {/*Default Mailboxes*/}
            {
                mailBoxes?.slice(0, 3).map((mailbox, idx) => {
                    return (
                        <MailBox
                            key={idx}
                            name={mailbox.name[0].toUpperCase() + mailbox.name.slice(1)}
                            icon={<BsEnvelopeArrowDown />}
                            mailCount={mailbox.unreadMails}
                            clickFn={handleActiveMailbox}
                            activeMailbox={activeMailbox}
                        />
                    )
                })
            }
            <Divider py={"2"} borderColor={"black"}  w={"100%"} orientation={"horizontal"} />


            {/*Custom Mailbox Divider & Expand Button*/}
            <HStack px={"2"} w={"100%"} justifyContent={"space-between"}>
                <Text fontSize={"lg"} as={"b"}>My Mailbox</Text>
                {
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

            {/*Custom Mailboxes*/}
            <Collapse style={{width: "100%"}} in={!isOpen} animateOpacity>
                <Stack w={"100%"}>
                    {
                        mailBoxes?.slice(3).map((mailbox, idx) => {
                            return (
                                <MailBox
                                    key={idx}
                                    name={mailbox.name[0].toUpperCase() + mailbox.name.slice(1)}
                                    icon={<BsEnvelopeArrowDown />}
                                    mailCount={mailbox.unreadMails}
                                    clickFn={handleActiveMailbox}
                                    activeMailbox={activeMailbox}
                                />
                            )
                        })
                    }
                </Stack>
            </Collapse>
        </VStack>
    )
}