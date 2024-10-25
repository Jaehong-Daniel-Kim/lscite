import {IconButton} from "@chakra-ui/react";
import {FaRegPenToSquare} from "react-icons/fa6";

export default function NewMailSm() {
    return (
        <IconButton
            aria-label={"New Mail"}
            colorScheme={"blue"}
            size={"sm"}
        >
            <FaRegPenToSquare />
        </IconButton>
    )
}