import {IconButton} from "@chakra-ui/react";
import {FaRegPenToSquare} from "react-icons/fa6";

export default function NewMailSm() {
    return (
        <IconButton
            aria-label={"New Mail"}
            colorScheme={"pink"}
            marginTop={5}
        >
            <FaRegPenToSquare />
        </IconButton>
    )
}