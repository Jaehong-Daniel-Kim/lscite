import {Box, Button, HStack, IconButton, Text, Tooltip} from "@chakra-ui/react";
import React from "react";

interface IMailBox {
    icon: any  // How to explicitly type react-icons
    name: string;
    mailCount: string;
    activeMailbox: string;
    clickFn: (mailbox: string) => void;
    isSm?: boolean;
}

export default function MailBox({icon, name, mailCount, activeMailbox, clickFn, isSm = false}: IMailBox) {
    return (
        <Box w={"100%"}>
            {
                !isSm ? (
                    <HStack w={"100%"}>
                        <Button
                            w={"100%"}
                            justifyContent={"left"}
                            fontSize={"lg"}
                            leftIcon={icon}
                            variant={"ghost"}
                            colorScheme={"pink"}
                            position={"relative"}
                            onClick={() => clickFn(name)}
                            bgColor={activeMailbox === name ? "gray.200" : ""}
                        >
                            <HStack w={"90%"} justifyContent={"space-between"}>
                                <Text>{name}</Text>
                                <Text fontSize={"lg"}>{mailCount !== "0" ? mailCount : null}</Text>
                            </HStack>
                        </Button>
                    </HStack>
                ) : (
                    <Tooltip label={name}>
                        <IconButton aria-label={name} colorScheme={"pink"}>
                            {
                                !icon? (
                                    <Text>{mailCount}</Text>
                                ) : (
                                    <Box>{icon}</Box>
                            )}
                        </IconButton>
                    </Tooltip>
                )
            }
        </Box>
    )
}
