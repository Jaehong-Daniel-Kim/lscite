import {Box, Button, HStack, Text} from "@chakra-ui/react";
import {BsDot} from "react-icons/bs";

interface ICustomMailBox {
    name: string;
    mailCount: number;
}

export default function CustomMailBox({name, mailCount}: ICustomMailBox) {
    return (
        <HStack w={"100%"}>
            <Button
                w={"100%"}
                justifyContent={"left"}
                fontSize={"xl"}
                leftIcon={<BsDot />}
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