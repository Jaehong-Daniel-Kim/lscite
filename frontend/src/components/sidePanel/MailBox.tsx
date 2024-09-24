import {Box, Button, HStack, IconButton, Text, Tooltip} from "@chakra-ui/react";

interface IMailBox {
    icon: any  // How to explicitly type react-icons
    name: string;
    mailCount: number;
    isSm?: boolean;
}

export default function MailBox({icon, name, mailCount, isSm = false}: IMailBox) {
    return (
        <Box w={"100%"}>
            {
                !isSm ? (
                    <HStack w={"100%"}>
                        <Button
                            w={"100%"}
                            justifyContent={"left"}
                            fontSize={"xl"}
                            leftIcon={icon}
                            variant={"ghost"}
                            colorScheme={"pink"}
                        >
                            <HStack w={"100%"} justifyContent={"space-between"}>
                                <Text>{name}</Text>
                                <HStack w={"10%"}>
                                    <Text>{mailCount? mailCount : null}</Text>
                                </HStack>
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
