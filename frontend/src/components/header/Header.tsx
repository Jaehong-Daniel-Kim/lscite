import {
    Avatar,
    Box,
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
import useUser from "../../lib/useUser";
import {LogOut} from "../../api";

interface IHeaderNav {
    href: string;
    text: string;
}

export default function Header() {

    const { user } = useUser();

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
                </HStack>
            </HStack>

            {/*Navigation Menus*/}
            <HStack
                w={"100%"}
                py={"2"}
                px={"5"}
                columnGap={"5"}
            >
                <HeaderNavigation href={"/"} text={"Home"} />
                <HeaderNavigation href={"/"} text={"Mail"} />
                <HeaderNavigation href={"/"} text={"Contacts"} />
            </HStack>
        </VStack>
    )
}