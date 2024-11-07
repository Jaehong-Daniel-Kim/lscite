import {IMailList} from "../../types";
import {
    Checkbox,
    Divider,
    Heading,
    HStack,
    Input,
    Text,
    InputGroup,
    StackDivider,
    VStack,
    Button
} from "@chakra-ui/react";
import React from "react";

interface IMailListProps {
    title: string | undefined;
    mailList: IMailList[]| undefined;

}
export default function SentMailList({title, mailList}: IMailListProps) {
    return (
        <VStack w={"100%"} h={"100%"} >
            <HStack
                px={5}
                pt={5}
                w={"100%"}
            >
                <Heading size={"md"}>{title}</Heading>
            </HStack>
            <Divider borderColor={"gray.400"} />
            <HStack
                px={5}
                w={"100%"}
                justifyContent={"space-between"}
            >
                <Text fontSize={"xs"}> Total: {mailList?.length} </Text>
                <InputGroup w={"250px"} size={"sm"}>
                    <Input placeholder={"Search"} />
                </InputGroup>
            </HStack>
            <Divider borderColor={"gray.400"} />
            <VStack
                w={"100%"}
                h={"auto"}
                position={"relative"}
                overflow={"hidden"}
            >
                <VStack
                    px={4}
                    w={"100%"}
                    h={"100%"}
                    divider={<StackDivider />}
                >
                    <HStack w={"100%"} columnGap={1} py={1} justifyContent={"space-between"}>
                        <Checkbox display={"flex"} justifyContent={"center"} flexBasis={"20px"} size={"md"} />
                        <Text as={"b"} textAlign={"start"} flexBasis={"30%"} fontSize={"xs"}>Subject</Text>
                        <Text as={"b"} textAlign={"start"} flexBasis={"40%"} fontSize={"xs"}>to</Text>
                        <Text as={"b"} textAlign={"start"} flexBasis={"10%"} fontSize={"xs"}>Date</Text>
                    </HStack>
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
                            divider={<StackDivider />}
                        >
                            {
                                mailList?.map((email, idx) => (
                                    <HStack
                                        key={idx}
                                        w={"100%"}
                                        columnGap={1}
                                        justifyContent={"space-between"}
                                    >
                                        <Checkbox display={"flex"} justifyContent={"center"} flexBasis={"20px"} size={"md"} />
                                        <Text textAlign={"start"} flexBasis={"30%"} fontSize={"sm"} isTruncated={true}>{email.subject}</Text>
                                        <Button textAlign={"start"} variant={"unstyled"} flexBasis={"40%"} size={"xs"}>
                                            {email.recipients?.at(0)?.user.full_name}
                                            {(email.recipients?.length as number) - 1 > 0
                                                ? ` with ${(email.recipients?.length as number) - 1}`
                                                : ""}
                                        </Button>
                                        <Text textAlign={"start"} flexBasis={"10%"} fontSize={"sm"} isTruncated={true}> {email.created_datetime} </Text>
                                    </HStack>
                                ))
                            }
                        </VStack>
                    </VStack>
                </VStack>

            </VStack>
        </VStack>
    )
}