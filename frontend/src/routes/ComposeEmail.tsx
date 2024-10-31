import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Heading,
    HStack,
    Input,
    SkeletonText,
    Text,
    VStack
} from "@chakra-ui/react";
import {Editor} from "@tinymce/tinymce-react";
import {Editor as TinyMCEEditor} from "tinymce";
import {useRef, useState} from "react";
import useUser from "../lib/useUser";
import AddRecipientDrawer from "../components/composeEmail/addRecipientsDrawer";

export default function ComposeEmail() {
    const editorRef = useRef<null | TinyMCEEditor>(null);
    const {isUserLoading, user} = useUser();
    const subjectRef = useRef<null | string>(null);
    const [isRecipientDrawerOpen, setIsRecipientDrawerOpen] = useState<boolean>(false);
    const [recipients, setRecipients] = useState({
        "cc": [],
        "to": [],
        "bcc": [],
    });

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
                <Input variant={"flushed"} placeholder={"Please enter a subject"} />
            </HStack>
            <VStack px={5} w={"100%"}>
                <HStack w={"100%"} justifyContent={"space-between"}>
                    <Text width={"110px"}>Recipients</Text>
                    <Input variant={"flushed"} placeholder={"Please enter recipients"} isReadOnly={true} onClick={() => setIsRecipientDrawerOpen(true)} />
                </HStack>
            </VStack>
            <AddRecipientDrawer isOpen={isRecipientDrawerOpen} onClose={() => setIsRecipientDrawerOpen(false)} />
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
