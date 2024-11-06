import {
    HStack, useDisclosure, VStack, Spinner
} from "@chakra-ui/react";
import Header from "../components/header/Header";
import useUser from "../lib/useUser";
import SidePanelV2 from "../components/sidePanel/SidePanelv2";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getEmailList, getMailboxes} from "../api";
import {useEffect, useRef, useState} from "react";
import ReceivedMailList from "../components/mailList/ReceivedMailList";
import {IMailbox} from "../types";
import SentMailList from "../components/mailList/SentMailList";


export default function Home() {
    const queryClient = useQueryClient();
    const {isLoading: isMailboxLoading, data: mailboxes} = useQuery({
        queryKey: ["mailboxes"], queryFn: getMailboxes, retry: 3,
    });
    const [currentMailbox, setCurrentMailbox] = useState<IMailbox | undefined>(undefined);
    const currentPageNumberRef = useRef<number>(1);
    const {isLoading: isMailListLoading, data: mailList} = useQuery(
        {
            queryKey: ["mailList", currentMailbox?.id, currentPageNumberRef.current],
            queryFn: getEmailList,
            enabled: !!currentMailbox,
        }
    )
    useEffect(() => {
        setCurrentMailbox(() => {
            const inbox =  mailboxes?.detail.default.filter((item) => item.name === "inbox")[0]
            if (inbox) {
                return inbox
            } else {
                return undefined
            }
        }
        )
    }, [mailboxes])


    return (
        <VStack
            overflow={"hidden"}
            w={"100%"}
            h={"100%"}
            position={"relative"}
            gap={0}

        >
            <Header />
            <HStack
                w={"100%"}
                flex={"1 1 auto"}
                minH={0}
                position={"relative"}
                gap={0}
            >
                {
                    isMailboxLoading
                        ? <Spinner />
                        :
                        <>
                            <SidePanelV2
                                defaultMailboxes={mailboxes?.detail.default}
                                customMailboxes={mailboxes?.detail.custom}
                                currentMailbox={currentMailbox}
                                setCurrentMailbox={setCurrentMailbox}
                            />
                            {
                                currentMailbox?.name === "sent"
                                    ? <SentMailList title={currentMailbox?.name} mailList={mailList?.detail} />
                                    : <ReceivedMailList title={currentMailbox?.name} mailList={mailList?.detail}/>
                            }
                        </>
                }
                {/*<SidePanel />*/}
            </HStack>
        </VStack>
    );
}