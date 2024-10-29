import {
    Box,
    Button,
    Collapse,
    Divider,
    HStack,
    Icon,
    IconButton, Input,
    InputGroup,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    Tooltip,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import DefaultMailbox from "./defaultMailbox";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {IoIosAdd} from "react-icons/io";
import CustomMailbox from "./customMailbox";
import {Dispatch, MutableRefObject, SetStateAction, useState} from "react";

interface IInnerBoardProps {
    isMenuCollapsed: boolean;
    newMailboxTrigger: Dispatch<SetStateAction<boolean>>;
    newMailboxButtonRef: MutableRefObject<null | HTMLButtonElement>;
}

export default function InnerBoard({newMailboxTrigger, isMenuCollapsed, newMailboxButtonRef}: IInnerBoardProps) {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <></>
    )
}