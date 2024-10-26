import {
    Box,
    Button,
    Collapse,
    Divider,
    HStack,
    Icon,
    IconButton,
    Text,
    Tooltip,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import DefaultMailboxes from "./defaultMailboxes";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {IoIosAdd} from "react-icons/io";
import CustomMailbox from "./customMailbox";
import {useState} from "react";

interface IInnerBoardProps {
    isMenuCollapsed: boolean;
}

export default function InnerBoard({isMenuCollapsed}: IInnerBoardProps) {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <VStack
            w={"100%"}
            h={"100%"}
        >
            {/*Default mailboxes*/}
            <DefaultMailboxes isMenuCollapsed={isMenuCollapsed}/>

            {/*Divider*/}
            <Divider py={"2"} borderColor={"black"}  w={"85%"} orientation={"horizontal"} />


            {/*Custom Mailbox Divider & Expand Button*/}
            <Tooltip label={isOpen ? "Collapse" : "Expand"}>
                <HStack
                    px={6}
                    as={Button}
                    w={"100%"}
                    justifyContent={isMenuCollapsed ? "center" : "space-between"}
                    variant={"unstyled"}
                    onClick={() => setIsOpen((prev) => !prev)}
                    _hover={{cursor: "pointer", color: "blue.400"}}
                >
                    {
                        isMenuCollapsed
                            ?
                                <Icon as={isOpen ? FaCaretDown : FaCaretUp} />
                            :
                                <>
                                    <Text fontSize={"md"} as={"b"}>My Mailbox</Text>
                                    <Icon as={isOpen ? FaCaretDown : FaCaretUp} />
                                </>
                    }
                </HStack>
            </Tooltip>


            {/*Custom Mailboxes*/}
            <Collapse in={isOpen} animateOpacity style={{overflow: "inherit"}}>
            <VStack w={"100%"}>
                    {

                        Array(20).fill(null).map((item, idx) => (
                            <CustomMailbox
                                key={idx}
                                name={`custom mailbox ${idx}`}
                                unreadMails={`${idx - 1}`}
                                isMenuCollapsed={isMenuCollapsed}
                            />
                        ))
                    }
            </VStack>
            </Collapse>

            {/*Add new mailbox button*/}
            <HStack
                px={3}
                pt={3}
                pb={5}
                as={Button}
                w={"100%"}
                justifyContent={"center"}
                variant={"unstyled"}
                _hover={{cursor: "pointer"}}
            >
                {
                    isMenuCollapsed
                        ?
                            <Tooltip label={"Add new mailbox"}>
                                <Icon as={IoIosAdd} boxSize={5}/>
                            </Tooltip>
                        :
                            <> <Icon as={IoIosAdd}/>
                                <Text fontSize={"sm"} w={"100%"} textAlign={"left"}>New Mailbox</Text>
                            </>
                }
            </HStack>
        </VStack>
    )
}