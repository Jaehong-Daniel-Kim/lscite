import {Button, HStack, Text} from "@chakra-ui/react";

interface IMailBox {
    icon: any  // How to explicitly type react-icons
    name: string;
    mailCount: number;
}

export default function MailBox({icon, name, mailCount}: IMailBox) {
    return (
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
    )
}
