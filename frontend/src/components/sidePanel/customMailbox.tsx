import {Button, HStack, Icon, Text, Tooltip} from "@chakra-ui/react";
import {IoIosAdd} from "react-icons/io";
import {BsDot} from "react-icons/bs";


interface ICustomMailboxProps {
    name: string
    unreadMails: string

    isMenuCollapsed: boolean;
}
export default function CustomMailbox({name, unreadMails, isMenuCollapsed}: ICustomMailboxProps) {
    return (
        <HStack
            as={Button}
            boxSize={7}
            px={2}
            columnGap={3}
            w={"95%"}
            justifyContent={"center"}
            variant={"unstyled"}
            _hover={{cursor: "pointer", backgroundColor: "gray.200"}}
        >
            {
                isMenuCollapsed
                    ?
                        <Tooltip label={name}>
                            <Icon as={BsDot} />
                        </Tooltip>
                    :
                        <>
                            <Icon as={BsDot} boxSize={3.5} />
                            <Text w={"100%"} textAlign={"left"} fontSize={"sm"} isTruncated>{name[0].toUpperCase() + name.slice(1)}</Text>
                            <Text fontSize={"sm"} color={"gray.500"} >{parseInt(unreadMails) > 0 ? unreadMails : ""}</Text>
                        </>
            }

        </HStack>
    )

}