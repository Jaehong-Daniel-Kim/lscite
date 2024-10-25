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
            px={3}
            as={Button}
            w={"100%"}
            justifyContent={"center"}
            variant={"unstyled"}
            _hover={{cursor: "pointer"}}
        >
            {
                isMenuCollapsed
                    ?
                        <Tooltip label={name}>
                            <Icon as={BsDot} />
                        </Tooltip>
                    :
                        <>
                            <Icon as={BsDot} />
                            <Text w={"100%"} textAlign={"left"} isTruncated>{name[0].toUpperCase() + name.slice(1)}</Text>
                            <Text>{parseInt(unreadMails) > 0 ? unreadMails : ""}</Text>
                        </>
            }

        </HStack>
    )

}