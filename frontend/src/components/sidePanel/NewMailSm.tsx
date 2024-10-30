import {IconButton} from "@chakra-ui/react";
import {FaRegPenToSquare} from "react-icons/fa6";

interface INewMailProps {
    onClick: () => void;
}

export default function NewMailSm({onClick}: INewMailProps) {
    return (
        <IconButton
            aria-label={"New Mail"}
            colorScheme={"blue"}
            size={"sm"}
            onClick={() => onClick()}
        >
            <FaRegPenToSquare />
        </IconButton>
    )
}