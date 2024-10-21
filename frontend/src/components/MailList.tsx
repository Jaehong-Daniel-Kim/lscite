import {
    Box,
    Divider,
    Heading,
    VStack,
    Text,
} from "@chakra-ui/react";
import MailTableList from "./MailTableList";

interface IMailList {
    title: string;
}

export default function MailList({title}: IMailList) {

    const tableContents = [
        {
            title: "bblablahblablahblablahblablahblablahbla",
            sender: "sender1",
            recType: "receive",
            date: "2024.08.01",
        },
        {
            title: "bbbblablahblablahblablahblablahblablahblablahlablahlablahblablahblablahblablahblablahblablahlablah",
            sender: "sender1",
            recType: "receive",
            date: "2024.08.01",
        },
        {
            title: "helloworld",
            sender: "sender1",
            recType: "receive",
            date: "2024.08.01",
        },
    ]

    return (
        <VStack
            position={"relative"}
            display={"block"}
            // position={"fixed"}
            // top={"150px"}
            w={"auto"}
            h={"100%"}
            // left={"300px"}
        >
            <Box
                w={"100%"}
            >
                <Heading
                    paddingTop={"5"}
                    paddingBottom={"2"}
                    px={"5"}
                    marginLeft={"5"}
                    w={"fit-content"}
                    borderBottom={"3px solid black"}
                > {title}
                </Heading>
                <Divider orientation={"horizontal"} borderColor={"gray"} />
            </Box>

            <Box w={"100%"}>
                <Text px={"10"} py={"3"} fontSize={"xl"}>Total: 5</Text>
                <Divider margin={"auto"} w={"95%"} orientation={"horizontal"} borderColor={"gray"} />
            </Box>
            <MailTableList
                headers={["Title", "Sender", "Receive Type", "Date"]}
                minCellWidth={200}
                tableContent={tableContents}
            />
        </VStack>
    )
}