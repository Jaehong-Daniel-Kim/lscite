import {Button, Text, HStack, Icon, Skeleton, VStack, Tooltip, SkeletonText} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query"
import {IMailbox} from "../../types";
import {getMailboxes} from "../../api";
import {BsEnvelopeArrowDown, BsEnvelopeArrowUp} from "react-icons/bs";
import {Dispatch, SetStateAction, useCallback, useMemo} from "react";
import {CiFileOn} from "react-icons/ci";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;


interface IDefaultMailboxesProps {
    mailbox: IMailbox;
    isMenuCollapsed: boolean;
    onClick: Dispatch<SetStateAction<IMailbox | undefined>>;
    resetSelected: () => void;
    isActive: boolean;
}

export default function DefaultMailbox({mailbox, isMenuCollapsed, onClick, resetSelected, isActive}: IDefaultMailboxesProps) {

    const mailboxIcons = useMemo<Record<string, any>>(() => {
        return {
            inbox: BsEnvelopeArrowDown,
            sent: BsEnvelopeArrowUp,
            drafts: CiFileOn,
        }
    }, [])

    const handleClickMailbox = useCallback(() => {
        onClick(mailbox);
        resetSelected();
    }, [onClick, mailbox, resetSelected])

    return (
        <VStack
            w={"100%"}
        >
            <Tooltip key={mailbox.id} label={mailbox.name}>
                <HStack
                    as={Button}
                    boxSize={7}
                    borderRadius={6}
                    w={"90%"}
                    justifyContent={"center"}
                    mx={6}
                    onClick={handleClickMailbox}
                    backgroundColor={isActive ? "gray.300" : ""}
                >
                    {
                        isMenuCollapsed
                            ? <Icon as={mailboxIcons[mailbox.name]} />
                            : <>
                                <Icon as={mailboxIcons[mailbox.name]} boxSize={3.5} />
                                <Text w={"100%"} textAlign={"left"} fontSize={"sm"} isTruncated>
                                    {mailbox.name[0].toUpperCase() + mailbox.name.slice(1)}
                                </Text>
                                <Text fontSize={"sm"} color={"gray.500"}>
                                    {
                                        (parseInt(mailbox.unreadMails) > 0 && mailbox.name !== "sent")
                                            ? mailbox.unreadMails
                                            : ""
                                    }
                                </Text>
                            </>
                    }
                </HStack>
            </Tooltip>
        </VStack>
    )
}