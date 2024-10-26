import {Button, Text, HStack, Icon, Skeleton, VStack, Tooltip} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query"
import {IMailbox} from "../../types";
import {getMailboxes} from "../../api";
import {BsEnvelopeArrowDown, BsEnvelopeArrowUp} from "react-icons/bs";
import {useMemo} from "react";
import {CiFileOn} from "react-icons/ci";


interface IDefaultMailboxesProps {
    isMenuCollapsed: boolean;
}

export default function DefaultMailboxes({isMenuCollapsed}: IDefaultMailboxesProps) {

    const {isLoading: isMailboxLoading, data: mailboxes} = useQuery<IMailbox[]>({
        queryKey: ["mailboxes"], queryFn: getMailboxes
    });

    const mailboxIcons = useMemo<Record<string, any>>(() => {
        return {
            inbox: BsEnvelopeArrowDown,
            sent: BsEnvelopeArrowUp,
            drafts: CiFileOn,
        }
    }, [])

    return (
        <VStack
            w={"100%"}
        >
            {
                mailboxes?.map((mailbox, idx) => (
                    <HStack
                        key={idx}
                        as={Button}
                        boxSize={7}
                        borderRadius={6}
                        w={"90%"}
                        justifyContent={"center"}
                        mx={6}
                        onClick={() => console.log("clicked")}
                    >
                        {
                            isMenuCollapsed
                                ?
                                    <Tooltip label={mailbox.name}>
                                        <Icon as={mailboxIcons[mailbox.name]} />
                                    </Tooltip>
                                :
                                    <>
                                        <Icon as={mailboxIcons[mailbox.name]} boxSize={3.5} />
                                        <Text w={"100%"} textAlign={"left"} fontSize={"sm"} isTruncated>{mailbox.name[0].toUpperCase() + mailbox.name.slice(1)}</Text>
                                        <Text fontSize={"sm"} color={"gray.500"}>{parseInt(mailbox.unreadMails) > 0 ? mailbox.unreadMails : ""}</Text>
                                    </>
                        }
                    </HStack>
                ))
            }
        </VStack>
    )
}