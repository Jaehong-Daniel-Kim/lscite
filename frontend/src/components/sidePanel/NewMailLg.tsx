import {Button} from "@chakra-ui/react";
import {FaRegPenToSquare} from "react-icons/fa6";

export default function NewMailLg() {
    return (
        <Button
            leftIcon={<FaRegPenToSquare />}
            colorScheme={"blue"}
            py={7}
            px={6}
            fontSize={"lg"}
            borderRadius={10}
            onClick={() => {console.log('clicked')}}
        >
            New Mail
        </Button>
    )
}