import {
    Avatar,
    Box,
    Button,
    ButtonGroup, Checkbox, Collapse,
    Divider,
    Heading,
    HStack,
    Input,
    SkeletonText, StackDivider,
    Text,
    VStack
} from "@chakra-ui/react";
import {Editor} from "@tinymce/tinymce-react";
import {Editor as TinyMCEEditor} from "tinymce";
import React, {useRef, useState} from "react";
import useUser from "../lib/useUser";
import AddRecipientDrawer from "../components/composeEmail/addRecipientsDrawer";
import {IRecipient} from "../types";

export default function ComposeEmail() {
    const editorRef = useRef<null | TinyMCEEditor>(null);
    const {isUserLoading, user} = useUser();
    const subjectRef = useRef<null | string>(null);
    const [isRecipientDrawerOpen, setIsRecipientDrawerOpen] = useState<boolean>(false);
    const [recipients, setRecipients] = useState<IRecipient[]>([]);

    const MainButtonGroups = () => {
        return (
            <ButtonGroup>
                <Button>Save Draft</Button>
                <Button colorScheme={"red"}>Cancel</Button>
                <Button colorScheme={"blue"}>Send</Button>
            </ButtonGroup>
        )
    }

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current?.getContent());
        }
    }

    return (
        <VStack
            w={"100%"}
            h={"100%"}
            overflowY={"scroll"}
        >
            <HStack w={"100%"} px={5} py={5} justifyContent={"space-between"}>
                <Heading size={"md"}>Compose New Mail</Heading>
                <MainButtonGroups />
            </HStack>
            <Divider borderColor={"gray.500"} />
            <HStack px={5} w={"100%"} justifyContent={"space-between"}>
                <Text width={"110px"}>Sender</Text>
                {
                    isUserLoading ?
                        <SkeletonText />
                        :
                        <Input variant={"flushed"} isReadOnly={true} defaultValue={user?.primary_email}/>
                }
            </HStack>
            <HStack  px={5} w={"100%"} justifyContent={"space-between"}>
                <Text width={"110px"}>Subject</Text>
                <Input variant={"flushed"} isRequired={true} placeholder={"Please enter a subject"} />
            </HStack>
            <VStack px={5} w={"100%"}>
                <HStack w={"100%"} justifyContent={"space-between"}>
                    <Text width={"110px"}>Recipients</Text>
                    <Input variant={"flushed"} placeholder={"Please enter recipients"} isReadOnly={true} onClick={() => setIsRecipientDrawerOpen(true)} />
                </HStack>

                <HStack as={Collapse} in={recipients.length > 0} w={"100%"}>
                    <HStack w={"100%"} justifyContent={"space-between"}>
                        <Box w={"110px"} h={"auto"}></Box>
                        <VStack
                            w={"100%"}
                            px={5}
                            divider={<StackDivider />}
                            justifyContent={"space-between"}
                            border={"1px solid"}
                            borderColor={"gray.500"}
                            borderRadius={6}
                            onClick={() => setIsRecipientDrawerOpen(true)}
                        >
                            <HStack w={"100%"} columnGap={1} py={3} justifyContent={"space-between"}>
                                <Heading textAlign={"center"} flexBasis={"20%"} size={"xs"}>Name</Heading>
                                <Heading textAlign={"center"} flexBasis={"40%"} size={"xs"}>Occupation</Heading>
                                <Heading textAlign={"center"} flexBasis={"15%"} size={"xs"}>Primary</Heading>
                                <Heading textAlign={"center"} flexBasis={"15%"} size={"xs"}>Secondary</Heading>
                                <Heading textAlign={"center"} flexBasis={"10%"} size={"xs"}>Type</Heading>
                            </HStack>
                            <VStack
                                w={"100%"}
                                maxH={"10rem"}
                                overflowY={"scroll"}
                                overflowX={"hidden"}
                                divider={<StackDivider />}
                            >
                                {
                                    recipients.map((recipient, idx) => (
                                        <HStack borderRadius={6} px={3} py={2} key={idx} w={"100%"} columnGap={1} justifyContent={"space-between"} _hover={{backgroundColor: "gray.200"}}>
                                            <HStack w={"100%"} flexBasis={"20%"} columnGap={2} justifyContent={"start"}>
                                                <Box display={"flex"} justifyContent={"center"}><Avatar  name={recipient.full_name} src={recipient.avatar} size={"xs"} /></Box>
                                                <Text textAlign={"center"} fontSize={"sm"}>{recipient.full_name}</Text>
                                            </HStack>
                                            <Text textAlign={"center"} flexBasis={"40%"} fontSize={"xs"} isTruncated>{recipient.occupation.company} / {recipient.occupation.department} / {recipient.occupation.group} / {recipient.occupation.team}</Text>
                                            <Text textAlign={"center"} flexBasis={"15%"} fontSize={"xs"} isTruncated>{recipient.primary_email.split("@")[0]}</Text>
                                            <Text textAlign={"center"} flexBasis={"15%"} fontSize={"xs"} isTruncated>{recipient.username}</Text>
                                            <Text textAlign={"center"} flexBasis={"10%"} fontSize={"xs"}>{recipient.type}</Text>
                                        </HStack>
                                    ))
                                }

                            </VStack>
                        </VStack>
                    </HStack>
                </HStack>

            </VStack>
            <AddRecipientDrawer
                isOpen={isRecipientDrawerOpen}
                onClose={() => setIsRecipientDrawerOpen(false)}
                updateRecipients={setRecipients}
            />


            <VStack px={5} w={"100%"}>
                <HStack w={"100%"} justifyContent={"start"}>
                    <Text width={"110px"}>Attachments</Text>
                    <Button size={"sm"} colorScheme={"teal"} variant={"outline"}>File</Button>
                </HStack>
            </VStack>
            <Divider borderColor={"gray.500"} my={3} w={"95%"}/>
            <Box w={"100%"} px={5}>
                <Editor
                    tinymceScriptSrc={"/tinymce/tinymce.min.js"}
                    licenseKey={"gpl"}
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue={"<p>This is the initial content of the editor.</p>"}
                    init={{
                        statusbar: false,
                        promotion: false,
                        width: "100%",
                        height: 700,
                        menubar: true,
                        plugins: [
                            "advlist", "autolink", "lists", "link", "image", "charmap", "anchor",
                            "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media",
                            "table", "preview", "help", "wordcount"
                        ],
                        toolbar: "undo redo | blocks | " +
                            "bold italic forecolor | aignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol" +
                            "removeformat | help",
                        content_style: "body { font-family:Helvetica, Arial, sans-serif; font-size: 14px}"
                    }}
                />
            </Box>
            <Divider borderColor={"gray.500"} my={3} w={"95%"}/>
            <HStack w={"100%"} py={2} px={5} justifyContent={"flex-end"}>
                <MainButtonGroups />
            </HStack>
        </VStack>
    );
}
