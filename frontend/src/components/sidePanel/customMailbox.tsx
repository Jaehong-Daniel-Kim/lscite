import {
    Button,
    MenuButton,
    Circle,
    HStack,
    Icon,
    IconButton,
    Menu,
    Text,
    Tooltip,
    Collapse,
    Box, MenuList, MenuItem, Portal, useDisclosure
} from "@chakra-ui/react";
import {BsDot, BsThreeDots} from "react-icons/bs";
import {Dispatch, SetStateAction, useCallback, useRef, useState} from "react";
import {IMailbox} from "../../types";

interface ICustomMailboxProps {
    mailbox: IMailbox;

    isMenuCollapsed: boolean;
    setMailboxToRemove: Dispatch<SetStateAction<number>>
}
export default function CustomMailbox({mailbox, isMenuCollapsed, setMailboxToRemove}: ICustomMailboxProps) {

    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

    return (
        <HStack
            boxSize={7}
            borderRadius={6}
            justifyContent={"center"}
            mx={6}
            onMouseOver={() => setIsMenuVisible(true)}
            onMouseOut={() => setIsMenuVisible(false)}
            px={2}
            columnGap={2}
            w={"85%"}
            _hover={{cursor: "pointer", backgroundColor: "gray.200"}}
        >
            {
                isMenuCollapsed ?
                <Tooltip label={mailbox.name}>
                    <Circle shadow={"base"} size={"1.5rem"} bg={"white"} color={"gray.500"}>
                        {parseInt(mailbox.unreadMails) > 0 ? mailbox.unreadMails : "0"}
                    </Circle>
                </Tooltip>
                :
                <HStack w={"100%"}>
                    <HStack
                        w={"90%"}
                        onClick={() => console.log("clicked")}
                    >
                        <Icon as={BsDot} boxSize={3.5} />
                        <Text w={"100%"} fontWeight={"600"} textAlign={"left"} fontSize={"sm"} isTruncated>{mailbox.name}</Text>
                        <Text fontSize={"sm"} fontWeight={"600"} color={"gray.500"} >{parseInt(mailbox.unreadMails) > 0 ? mailbox.unreadMails : "0"}</Text>
                    </HStack>
                    <Box as={Collapse} in={isMenuVisible}>
                        <Menu isLazy>
                            <MenuButton
                                as={IconButton}
                                aria-label={"Options"}
                                icon={<BsThreeDots />}
                                variant={"unstyled"}
                            >
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuItem onClick={() => setMailboxToRemove(mailbox.id)}>Delete Mailbox</MenuItem>
                                    <MenuItem>TBD</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </HStack>
            }
        </HStack>
    )

}