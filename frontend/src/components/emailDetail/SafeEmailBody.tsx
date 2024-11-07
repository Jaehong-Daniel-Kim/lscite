import DOMPurify from "dompurify";
import {Box} from "@chakra-ui/react";

interface ISafeEmailBodyProps {
    bodyHTML: string | undefined;
}

export default function SafeEmailBody({bodyHTML}: ISafeEmailBodyProps) {
    const sanitizedHTML = DOMPurify.sanitize((bodyHTML as string))
    return (
        <Box
            w={"100%"}
            dangerouslySetInnerHTML={{__html: sanitizedHTML}}
        />
    )
}