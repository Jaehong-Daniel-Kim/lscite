import {
    Text,
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    Icon,
    IconButton,
    Tooltip,
    useColorModeValue,
    VStack,
    Collapse,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverBody, Input, Skeleton, useDisclosure, SkeletonText
} from "@chakra-ui/react";
import React, {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import {TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse} from "react-icons/tb";
import NewMailSm from "./NewMailSm";
import NewMailLg from "./NewMailLg";
import DefaultMailbox from "./defaultMailbox";
import CustomMailbox from "./customMailbox";
import {FaCaretDown, FaCaretUp, FaUserTie} from "react-icons/fa";
import {IoIosAdd} from "react-icons/io";
import {newMailBox, removeMailbox} from "../../api";
import {useQueryClient} from "@tanstack/react-query"
import WarningAlert from "../alertModal/warningAlert";
import ConfirmationAlert from "../alertModal/confirmationAlert";
import {IMailbox} from "../../types";

interface ISidePanelProps {
    defaultMailboxes: IMailbox[] | undefined;
    customMailboxes: IMailbox[] | undefined;
    currentMailbox: IMailbox | undefined;
    setCurrentMailbox: Dispatch<SetStateAction<IMailbox | undefined>>
    resetSelected: () => void
}


export default function SidePanelV2({
                                        defaultMailboxes,
                                        customMailboxes,
                                        currentMailbox,
                                        setCurrentMailbox,
                                        resetSelected,
                                    } : ISidePanelProps) {
    const queryClient = useQueryClient();
    // const {isLoading: isMailboxLoading, data: mailboxes} = useQuery({
    //     queryKey: ["mailboxes"], queryFn: getMailboxes, retry: 3,
    // });
    const newMailboxRef = useRef<null | HTMLInputElement>(null);
    const [mailboxToRemove, setMailboxToRemove] = useState<number>(0);
    const [isRemoveConfirmationAlertOpen, setIsRemoveConfirmationAlertOpen] = useState(false);
    const [isMenuCollapsed, setIsMenuCollapsed] = useState<boolean>(false);
    const [isCustomMailboxOpen, setIsCustomMailboxOpen] = useState<boolean>(true);
    const [isNewMailboxPopoverOpen, setIsNewMailboxPopoverOpen] = useState<boolean>(false);
    const sidePanelColor = useColorModeValue("gray.100", "gray.800")
    const {
        isOpen: isNewMailboxWarningOpen,
        onOpen: onNewMailboxWarningOpen,
        onClose: onNewMailboxWarningClose,
    } = useDisclosure();
    const warningMessage = useRef<string>("");

    const handleNewMailbox = useCallback(async () => {
        if (newMailboxRef.current && newMailboxRef.current.value !== "") {
            const postboxName = newMailboxRef.current.value;
            const response = await newMailBox(postboxName);
            const {status, message, detail } = response;
            if (status === "success") {
                customMailboxes?.push(detail)
                setIsNewMailboxPopoverOpen(false)
                newMailboxRef.current.value = "";
            } else {
                onNewMailboxWarningOpen();
                warningMessage.current = message;
                newMailboxRef.current.value = "";
            }
        } else {
            onNewMailboxWarningOpen();
            warningMessage.current = "Name of a mailbox cannot be empty."
        }
    }, [customMailboxes, onNewMailboxWarningOpen])

    const handleRemoveMailbox = useCallback(async() => {
        if (mailboxToRemove) {
            const response = await removeMailbox(mailboxToRemove);
            const {status, message, detail} = response;
            if (status === "success") {
                setIsRemoveConfirmationAlertOpen(false);
                setMailboxToRemove(0);
                await queryClient.invalidateQueries({queryKey: ["mailboxes"]});
            } else {
                console.log(status, message, detail)
            }
        } else {
            console.log("wrong request")
        }
    }, [mailboxToRemove, queryClient]);

    useEffect(() => {
        if (mailboxToRemove) {
            setIsRemoveConfirmationAlertOpen(true);
        }

    }, [mailboxToRemove, handleRemoveMailbox]);

    const handleComposeMail = useCallback( () => {
        const w = window.screen.width * 0.5;
        const h = window.screen.height * 0.9;
        const l = window.screen.width / 2 - w / 2
        const t = window.screen.height / 2 - h / 2;
        return window.open(
            'compose',
            '_blank',
            `width=${w},height=${h},top=${t},left=${l},toolbar,menubar,scrollbars=true`
        )
    }, [])

    return (
        <VStack
            borderRight={"0.5px solid gray"}
            w={!isMenuCollapsed ? "200px" : "100px"}
            minW={!isMenuCollapsed ? "200px" : "100px"}
            maxW={!isMenuCollapsed ? "200px" : "100px"}
            h={"100%"}
            rowGap={5}
            position={"relative"}
            bg={sidePanelColor}
        >
            {/*Title and collapse button*/}
            <HStack
                w={"100%"}
                px={6}
                pt={5}
                justifyContent={isMenuCollapsed ? "center" : "space-between"}
            >
                {
                    isMenuCollapsed
                        ? <></>
                        : <Heading fontSize={"xl"}>Mail</Heading>

                }
                <Tooltip
                    label={isMenuCollapsed ? "Expand" : "Collapse"}
                >
                    <IconButton
                        aria-label={isMenuCollapsed ? "Expand" : "Collapse"}
                        icon={
                            isMenuCollapsed
                                ? <TbLayoutSidebarLeftCollapse  size={25} />
                                : <TbLayoutSidebarRightCollapse size={25} />
                        }
                        variant={"ghost"}
                        onClick={() => setIsMenuCollapsed((prev) => !prev)}
                    />
                </Tooltip>
            </HStack>

            {/*New mail button*/}
            <Tooltip label={"compose"}>
                <HStack
                    w={"100%"}
                    justifyContent={"center"}
                >
                    {
                        isMenuCollapsed
                            ? <NewMailSm onClick={handleComposeMail}/>
                            : <NewMailLg onClick={handleComposeMail}/>
                    }
                </HStack>
            </Tooltip>
            <VStack
                w={"100%"}
                h={"100%"}
                position={"relative"}
                overflowX={"hidden"}
                overflowY={"scroll"}
            >
                <VStack
                    w={"100%"}
                    h={"100%"}
                >
                    {/*Default mailboxes*/}
                    {/* Skeleton Placeholders */}
                    { /*
                    {isMailboxLoading ? (
                        Array(3).fill("").map((_, idx) => (
                            <HStack
                                key={idx}
                                boxSize={7}
                                borderRadius={6}
                                w={"90%"}
                                justifyContent={"center"}
                                mx={6}
                            >
                                <Skeleton boxSize={3.5} borderRadius="full" />
                                { !isMenuCollapsed && <SkeletonText noOfLines={1} width="70%" spacing="4" />}
                            </HStack>
                        ))
                    ) : (
                        mailboxes?.detail.default.map((mailbox, idx) => (
                            <DefaultMailbox key={idx} mailbox={mailbox} isMenuCollapsed={isMenuCollapsed} />
                        ))

                        )
                    }
                    */ }
                    {
                        defaultMailboxes?.map((mailbox, idx) => (
                            <DefaultMailbox
                                key={idx}
                                mailbox={mailbox}
                                isMenuCollapsed={isMenuCollapsed}
                                onClick={setCurrentMailbox}
                                resetSelected={resetSelected}
                                isActive={currentMailbox?.id === mailbox.id}
                            />
                        ))
                    }
                    {/*Divider*/}
                    <Divider py={"2"} borderColor={"black"}  w={"85%"} orientation={"horizontal"} />


                    {/*Custom Mailbox Divider & Expand Button*/}
                    <Tooltip label={isCustomMailboxOpen ? "Collapse" : "Expand"}>
                        <HStack
                            px={6}
                            as={Button}
                            w={"100%"}
                            justifyContent={isMenuCollapsed ? "center" : "space-between"}
                            variant={"unstyled"}
                            onClick={() => setIsCustomMailboxOpen((prev) => !prev)}
                            _hover={{cursor: "pointer", color: "blue.400"}}
                        >
                            {
                                isMenuCollapsed
                                    ?
                                    <Icon as={isCustomMailboxOpen ? FaCaretDown : FaCaretUp} />
                                    :
                                    <>
                                        <Text fontSize={"md"} as={"b"}>My Mailbox</Text>
                                        <Icon as={isCustomMailboxOpen ? FaCaretDown : FaCaretUp} />
                                    </>
                            }
                        </HStack>
                    </Tooltip>

                    {/*Custom Mailboxes*/}
                    <Box w={"100%"} as={Collapse} in={isCustomMailboxOpen} style={{overflow: ""}}>
                        <VStack w={"100%"}>
                            {
                                customMailboxes?.map((mailbox, idx) => (
                                    <CustomMailbox
                                        key={idx}
                                        mailbox={mailbox}
                                        isMenuCollapsed={isMenuCollapsed}
                                        setMailboxToRemove={setMailboxToRemove}
                                        onClick={setCurrentMailbox}
                                        resetSelected={resetSelected}
                                        isActive={currentMailbox?.id === mailbox.id}
                                    />
                                ))
                            }
                        </VStack>
                    </Box>

                    {/*Add new mailbox button*/}
                    <Popover
                        closeOnBlur={false}
                        placement={"right"}
                        isOpen={isNewMailboxPopoverOpen}
                    >
                        <PopoverTrigger>
                            <Tooltip label={"new mailbox"}>
                                <HStack
                                    px={3}
                                    pt={3}
                                    pb={5}
                                    as={Button}
                                    w={"100%"}
                                    justifyContent={"center"}
                                    variant={"unstyled"}
                                    _hover={{cursor: "pointer"}}
                                    onClick={() => setIsNewMailboxPopoverOpen(true)}
                                >
                                    {
                                        isMenuCollapsed
                                            ? <Icon as={IoIosAdd} boxSize={5}/>
                                            :
                                            <> <Icon as={IoIosAdd}/>
                                                <Text fontSize={"sm"} w={"100%"} textAlign={"left"}>New Mailbox</Text>
                                            </>
                                    }
                                </HStack>
                            </Tooltip>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent w={"17rem"}>
                                <PopoverArrow/>
                                <PopoverBody>
                                    <VStack>
                                        <Input ref={newMailboxRef} placeholder={"name"} />
                                        <HStack columnGap={2} justifyContent={"right"} w={"100%"}>
                                            <Button colorScheme={"blue"} size={"sm"} onClick={() => handleNewMailbox()}>Create</Button>
                                            <Button colorScheme={"red"} size={"sm"} onClick={() => setIsNewMailboxPopoverOpen(false)}>Cancel</Button>
                                        </HStack>
                                    </VStack>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                   <VStack w={"100%"} py={"5rem"}>
                       <Text size={"xs"}>Admins</Text>
                       <HStack justifyContent={"center"}>
                           <IconButton aria-label={"admin badge"} icon={<FaUserTie />} boxSize={4} />
                           <IconButton aria-label={"admin badge"} icon={<FaUserTie />} boxSize={4} />
                       </HStack>
                   </VStack>
                </VStack>
            </VStack>
            <Portal>
                <WarningAlert
                    isAlertOpen={isNewMailboxWarningOpen}
                    onAlertClose={onNewMailboxWarningClose}
                    title={"Error"}
                    description={warningMessage.current}
                />
            </Portal>
            <Portal>
                <ConfirmationAlert
                    isAlertOpen={isRemoveConfirmationAlertOpen}
                    onAlertClose={() => setIsRemoveConfirmationAlertOpen(false)}
                    title={"Delete mailbox"}
                    description={"Are you sure to delete?"}
                    callback={handleRemoveMailbox}
                />
            </Portal>
        </VStack>
    )
}