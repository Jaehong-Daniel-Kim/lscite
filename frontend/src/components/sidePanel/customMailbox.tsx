import {
    MenuButton,
    Circle,
    HStack,
    Icon,
    IconButton,
    Menu,
    Text,
    Tooltip,
    Box, MenuList, MenuItem, Portal, useDisclosure
} from "@chakra-ui/react";
import {BsDot, BsThreeDots} from "react-icons/bs";
import {Dispatch, SetStateAction, useCallback, useState} from "react";
import {IMailbox} from "../../types";

interface ICustomMailboxProps {
    mailbox: IMailbox;

    isMenuCollapsed: boolean;
    setMailboxToRemove: Dispatch<SetStateAction<number>>
    onClick: Dispatch<SetStateAction<IMailbox | undefined>>
    resetSelected: () => void;
    isActive: boolean
}
export default function CustomMailbox({
                                          mailbox,
                                          isMenuCollapsed,
                                          setMailboxToRemove,
                                          onClick,
                                          resetSelected,
                                          isActive,
                                      }: ICustomMailboxProps)
{
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

    const handleClickMailbox = useCallback(() => {
        onClick(mailbox);
        resetSelected();
    }, [onClick, mailbox, resetSelected])

    return (
        <HStack
            boxSize={7}
            borderRadius={6}
            justifyContent={"center"}
            mx={6}
            px={2}
            columnGap={2}
            w={"85%"}
            _hover={{cursor: "pointer", backgroundColor: "gray.200"}}
            onClick={handleClickMailbox}
            backgroundColor={isActive ? "gray.200" : ""}
        >
            {
                isMenuCollapsed ?
                <Tooltip label={mailbox.name}>
                    <Circle shadow={"base"} size={"1.5rem"} bg={"white"} color={"gray.500"}>
                        {parseInt(mailbox.unreadMails) > 0 ? mailbox.unreadMails : "0"}
                    </Circle>
                </Tooltip>
                :
                <HStack w={"100%"}
                    onMouseOver={() => setIsMenuVisible(true)}
                    onMouseOut={() => setIsMenuVisible(false)}
                >
                    <HStack
                        w={"90%"}
                    >
                        <Icon as={BsDot} boxSize={3.5} />
                        <Text w={"100%"} fontWeight={"600"} textAlign={"left"} fontSize={"sm"} isTruncated>{mailbox.name}</Text>
                        <Text fontSize={"sm"} fontWeight={"600"} color={"gray.500"} >{parseInt(mailbox.unreadMails) > 0 ? mailbox.unreadMails : ""}</Text>
                    </HStack>
                    <Box
                        w={isMenuVisible || isOpen ? "fit-content" : "0"}
                        visibility={isMenuVisible || isOpen ? "visible" : "hidden"}
                    >
                        <Menu
                            isLazy
                            isOpen={isOpen}
                            onClose={onClose}
                            onOpen={onOpen}
                            autoSelect={false}
                        >
                            <MenuButton
                                as={IconButton}
                                aria-label={"Options"}
                                icon={<BsThreeDots />}
                                variant={"unstyled"}
                            >
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuItem fontSize={"sm"} onClick={() => setMailboxToRemove(mailbox.id)}>Delete Mailbox</MenuItem>
                                    <MenuItem fontSize={"sm"}>TBD</MenuItem>
                                    <MenuItem fontSize={"sm"}>TBD</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </HStack>
            }
        </HStack>
    )
}