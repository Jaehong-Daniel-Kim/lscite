import {Button} from "@chakra-ui/react";
import {FaRegPenToSquare} from "react-icons/fa6";

export default function NewMailLg() {
    return (
        <Button
            leftIcon={<FaRegPenToSquare />}
            colorScheme={"pink"}
            marginTop={5}
            py={"7"}
            w={"100%"}
            fontSize={"2xl"}
            borderRadius={"10"}
            onClick={() => {console.log('clicked')}}
        >
            New Mail
        </Button>
    )
}