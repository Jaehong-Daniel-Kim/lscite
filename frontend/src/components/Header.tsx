import {
    Box,
    Button,
    HStack,
    IconButton, Link, Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {ImMail3} from "react-icons/im";
import {FaMoon, FaSun} from "react-icons/fa";
import LoginModal from "./LoginModal";
import React from "react";
import SignUpModal from "./SignUpModal";

interface IHeaderNav {
    href: string;
    text: string;
}

export default function Header() {

    const {isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen} = useDisclosure()
    const {isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen} = useDisclosure()

    const {toggleColorMode} = useColorMode()
    const logoColor = useColorModeValue("red.500", "red.200")
    const Icon = useColorModeValue(FaMoon, FaSun)

    const HeaderNavigation = ({href, text}: IHeaderNav) =>  (
        <Link href={`${href}`}>
            <Text fontSize={"lg"} as={"b"} _hover={{cursor: "pointer", color: "crimson"}}>{text}</Text>
        </Link>
    )

    return (
        <VStack
            backgroundColor={"gray.400"}
            justifyContent={"space-between"}
            paddingTop={"10"}
            paddingBottom={"5"}
            px={"5"}
            borderBottomWidth={1}
            w={"100%"}
            h={"150px"}
            position={"fixed"}
        >
            <HStack
                w={"100%"}
                justifyContent={"space-between"}
                px={"5"}
            >
                <Box color={logoColor}>
                    <Link href={"/"}>
                        <ImMail3 size={"36"}/>
                    </Link>
                </Box>
                <HStack spacing={"2.5px"}>
                    <IconButton variant={"ghost"}
                                onClick={toggleColorMode}
                                aria-label={"Toggle dark mode"}
                                icon={<Icon/>}
                    />
                    <Button onClick={onLoginOpen}>Log in</Button>
                    <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign up</Button>
                </HStack>
                <LoginModal isOpen={isLoginOpen} onClose={onLoginClose}/>
                <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose}/>
            </HStack>
            <HStack
                w={"100%"}
                paddingTop={"5"}
                columnGap={"5"}
                px={"5"}
            >
                <HeaderNavigation href={"/"} text={"Home"} />
                <HeaderNavigation href={"/"} text={"Mail"} />
                <HeaderNavigation href={"/"} text={"Contacts"} />
            </HStack>
        </VStack>
    )
}