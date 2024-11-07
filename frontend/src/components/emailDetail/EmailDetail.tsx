import {
    Divider,
    Heading,
    HStack,
    Input,
    InputGroup,
    VStack,
    Text,
    IconButton,
    Tooltip,
    Grid,
    Avatar, StackDivider, Button, ButtonGroup, Box
} from "@chakra-ui/react";
import {FaRegListAlt, FaRegWindowRestore, FaReply, FaReplyAll} from "react-icons/fa";
import {ISimpleMailObject} from "../../types";
import {useQuery} from "@tanstack/react-query";
import {getDetailedEmail} from "../../api";
import {TiArrowForward} from "react-icons/ti";
import {MdDelete} from "react-icons/md";
import SafeEmailBody from "./SafeEmailBody";

interface IEmailDetailProps {
    title: string | undefined;
    emailId: number
}
export default function EmailDetail({title, emailId}: IEmailDetailProps) {
    const {isLoading: isEmailDataLoading, data: emailData} = useQuery({queryKey: ["email", emailId], queryFn: getDetailedEmail, enabled: !!emailId})
    const email = emailData?.detail;

    return (
        <VStack w={"100%"} h={"100%"}>

            <HStack
                px={5}
                pt={5}
                w={"100%"}
            >
                <Heading size={"md"}>{title}</Heading>
            </HStack>
            <Divider borderColor={"gray.400"} />
            <VStack
                w={"100%"}
                h={"100%"}
                overflow={"hidden"}
            >
                <HStack
                    px={5}
                    w={"100%"}
                    justifyContent={"space-between"}
                >
                    <HStack>
                        <Tooltip label={"back to list"}>
                            <IconButton size={"sm"} variant={"outline"} aria-label={"list"} icon={<FaRegListAlt />} />
                        </Tooltip>
                        <Tooltip label={"open in new window"}>
                            <IconButton size={"sm"} variant={"outline"} aria-label={"list"} icon={<FaRegWindowRestore />} />
                        </Tooltip>
                    </HStack>
                </HStack>
                <Divider w={"95%"} borderColor={"gray.400"} />
                <VStack w={"100%"} h={"100%"} overflow={"hidden"}>
                    <HStack px={5} py={2} w={"100%"} justifyContent={"space-between"}>
                        <Heading size={"md"}>
                            {email?.subject}
                        </Heading>
                    </HStack>

                    <HStack columnGap={5} py={3} px={5} w={"100%"} justifyContent={"start"}>
                        <HStack>
                            <Avatar size={"md"} name={email?.sender.full_name} src={email?.sender.avatar} />
                        </HStack>
                        <VStack>
                            <Text fontWeight={600} w={"100%"} textAlign={"left"}>{email?.sender.full_name} / {email?.sender.occupation.company}</Text>
                            <HStack columnGap={1} divider={<StackDivider borderColor={"gray.400"} />}>
                                <HStack>
                                    <Heading size={"xs"}>To</Heading>
                                    <Text size={"xs"}>
                                        {email?.recipients.at(0)?.user.full_name}
                                        {(email?.recipients.length as number) > 1 ? ` with ${email?.recipients.length}` : ""}
                                    </Text>
                                </HStack>
                                <HStack>
                                    <Heading size={"xs"}>Cc</Heading>
                                    <Text size={"xs"}>{email?.recipients.at(0)?.user.full_name}</Text>
                                    {(email?.recipients.length as number) > 1 ? ` with ${email?.recipients.length}` : ""}
                                </HStack>
                            </HStack>
                        </VStack>
                    </HStack>
                    <HStack w={"100%"} justifyContent={"start"} px={5} pb={3}>
                        <ButtonGroup variant={"outline"}>
                            <Button leftIcon={<FaReply />}>Reply</Button>
                            <Button leftIcon={<FaReplyAll />}>Reply All</Button>
                            <Button leftIcon={<TiArrowForward />}>Forward</Button>
                            <Button leftIcon={<MdDelete />}>Delete</Button>
                        </ButtonGroup>
                    </HStack>
                    <Divider borderColor={"gray.400"} />
                    <VStack
                        w={"100%"}
                        h={"auto"}
                        position={"relative"}
                        overflow={"hidden"}
                    >
                        <VStack
                            justifyContent={"left"}
                            px={5}
                            pb={5}
                            w={"100%"}
                            h={"100%"}
                            overflowX={"scroll"}
                            overflowY={"scroll"}
                        >
                            <SafeEmailBody bodyHTML={email?.mail_body} />
                        </VStack>

                    </VStack>
                </VStack>
            </VStack>
        </VStack>
    )
}