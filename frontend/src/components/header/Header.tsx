import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {ImMail3} from "react-icons/im";
import {FaMoon, FaSun} from "react-icons/fa";
import React from "react";
import LoginModal from "../LoginModal";
import SignUpModal from "../SignUpModal";
import useUser from "../../lib/useUser";
import {LogOut} from "../../api";
import {redirect} from "react-router-dom";

interface IHeaderNav {
    href: string;
    text: string;
}

export default function Header() {

    const { isUser, isUserLoading, user } = useUser();

    const {isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen} = useDisclosure();
    const {isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen} = useDisclosure();

    const {toggleColorMode} = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun);

    const HeaderNavigation = ({href, text}: IHeaderNav) =>  (
        <Link href={`${href}`}>
            <Text fontSize={"lg"} as={"b"} _hover={{cursor: "pointer", color: "crimson"}}>{text}</Text>
        </Link>
    );

    const onLogOut = async () => {
        await LogOut()
    }

    return (
        <VStack
            justifyContent={"space-between"}
            paddingTop={"7"}
            paddingBottom={"5"}
            px={"5"}
            borderBottomWidth={1}
            w={"100vw"}
            h={"130px"}
            position={"relative"}
        >
            <HStack
                w={"100%"}
                justifyContent={"space-between"}
                px={"5"}
                id={"hstack"}
            >
                {/* Logo */}
                <Box color={logoColor}>
                    <Link href={"/"}>
                        <ImMail3 size={"36"}/>
                    </Link>
                </Box>

                {/* Color Mode & User Badge */}
                <HStack spacing={"2.5px"}>
                    {/*Color Mode */}
                    <IconButton variant={"ghost"}
                                onClick={toggleColorMode}
                                aria-label={"Toggle dark mode"}
                                icon={<Icon/>}
                    />
                    {/* User Badge */}
                    <Menu>
                        <MenuButton>
                            <Avatar name={user?.username} src={user?.avatar} size={"md"}/>
                        </MenuButton>
                        <MenuList>
                            <Link href={"/"}>
                                <MenuItem onClick={onLogOut}>Log Out</MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                    {/*<Button onClick={onLoginOpen}>Log in</Button>*/}
                    {/*<Button onClick={onSignUpOpen} colorScheme={"red"}>Sign up</Button>*/}
                </HStack>


                {/*<LoginModal isOpen={isLoginOpen} onClose={onLoginClose}/>*/}
                {/*<SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose}/>*/}
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