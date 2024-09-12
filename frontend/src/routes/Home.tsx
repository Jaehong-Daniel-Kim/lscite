import {
    Box,
    Button,
    Checkbox, Divider,
    Grid,
    HStack,
    IconButton,
    Input,
    InputGroup,
    StackDivider,
    Text, useColorMode, useColorModeValue,
    VStack
} from "@chakra-ui/react";
import React, {useState} from "react";
import {FaArrowDown, FaFilter} from "react-icons/fa";
import {IoFlagOutline, IoFlagSharp} from "react-icons/io5";
import {BsPinAngleFill} from "react-icons/bs";

export default function Home() {

    const [checkedItems, setCheckedItems] = useState([false, false])
    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    return (
        <Box></Box>
        // <VStack py={10}
        //         px={10}
        //         w={"100%"}
        //         h={"100%"}
        //         align={"stretch"}
        //         divider={<StackDivider borderColor={"gray.500"} />}
        // >
        //     {/*Header*/}
        //     <HStack justifyContent={"space-between"}>
        //         <HStack w={"100%"}>
        //             <Checkbox isChecked={allChecked}
        //                       isIndeterminate={isIndeterminate}
        //                       onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
        //             />
        //             <Text paddingLeft={5}>총 (20)</Text>
        //             <Button variant={"ghost"} leftIcon={<FaFilter />}>필터</Button>
        //         </HStack>
        //         <Input w={"50%"} placeholder={"Search"} variant={"filled"}></Input>
        //     </HStack>
        //     {/*Titles*/}
        //     <HStack>
        //         <Checkbox isChecked={allChecked}
        //                   isIndeterminate={isIndeterminate}
        //                   onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
        //         />
        //         <HStack width={"100%"} justifyContent={"space-between"}>
        //             <Button resize={"horizontal"} overflow={"auto"} minW={"20%"} justifyContent={"left"} w={"50%"} variant={"ghost"} rightIcon={<FaArrowDown />}>제목</Button>
        //             <Divider orientation={"vertical"} h={4} borderColor={"gray.500"}/>
        //             <Button justifyContent={"left"} variant={"ghost"} rightIcon={<FaArrowDown />}>보낸사람</Button>
        //             <Divider orientation={"vertical"} h={4} borderColor={"gray.500"}/>
        //             <Button justifyContent={"left"} variant={"ghost"} rightIcon={<FaArrowDown />}>구분</Button>
        //             <Divider orientation={"vertical"} h={4} borderColor={"gray.500"}/>
        //             <Button justifyContent={"left"} variant={"ghost"} rightIcon={<FaArrowDown />}>날짜</Button>
        //             <IconButton aria-label={"pin"} variant={"ghost"} icon={<BsPinAngleFill />} />
        //         </HStack>
        //     </HStack>
        //     {/*Mails*/}
        //     <HStack>
        //         <Checkbox isChecked={checkedItems[0]}
        //                   onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        //         />
        //         <HStack px={4} w={"100%"} justifyContent={"space-between"}>
        //             <Text alignContent={"left"} w={"70"}>The first mail title</Text>
        //             <Text justifyContent={"left"} >Sender Information 1</Text>
        //             <Text justifyContent={"left"} >참조</Text>
        //             <Text justifyContent={"left"} >2024-08-30 14:28</Text>
        //         </HStack>
        //     </HStack>
        //     <HStack>
        //         <Box w={"100%"} h={"50px"} bg={"blue"} />
        //         <Box w={"100%"} h={"50px"} bg={"blue"} />
        //         <Box w={"100%"} h={"50px"} bg={"blue"} />
        //     </HStack>
        // </VStack>
    );
}