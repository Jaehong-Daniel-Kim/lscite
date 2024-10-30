import {Button} from "@chakra-ui/react";
import {FaRegPenToSquare} from "react-icons/fa6";

interface INewMailProps {
    onClick: () => void;
}

export default function NewMailLg({onClick}: INewMailProps) {
    return (
        <Button
            leftIcon={<FaRegPenToSquare />}
            colorScheme={"blue"}
            py={7}
            px={6}
            fontSize={"lg"}
            borderRadius={10}
            onClick={() => onClick()}
        >
            New Mail
        </Button>
    )
}