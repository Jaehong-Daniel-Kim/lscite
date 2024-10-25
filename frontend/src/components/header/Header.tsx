import {
    Avatar,
    Box,
    HStack,
    IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text,
    useColorMode,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import {FaMoon, FaSun} from "react-icons/fa";
import React from "react";
import useUser from "../../lib/useUser";
import {logOut} from "../../api";
import {IoIosMail} from "react-icons/io";

interface IHeaderNav {
    href: string;
    text: string;
}

export default function Header() {

    const headerBgColor = useColorModeValue("blue.500", "blue.200")
    const { isUserLoading, isUserLoggedIn, user } = useUser();
    const {toggleColorMode} = useColorMode();
    const logoColor = useColorModeValue("white", "black");
    const Icon = useColorModeValue(FaMoon, FaSun);

    const onLogOut = async () => {
        await logOut()
    }

    return (
        <VStack
            bg={headerBgColor}
            justifyContent={"space-between"}
            paddingTop={3}
            paddingBottom={5}
            px={6}
            borderBottomWidth={1}
            w={"100vw"}
            h={"100px"}
            position={"relative"}
        >
            <HStack
                w={"100%"}
                justifyContent={"space-between"}
                px={5}
            >
                {/* Logo */}
                <HStack color={logoColor}>
                    <Text fontWeight={500} fontSize={"lg"}>Mail Service</Text>
                    <Link href={"/"}>
                        <IoIosMail size={"36"}/>
                    </Link>
                </HStack>

                {/* Color Mode & User Badge */}
                <HStack spacing={"2.5px"}>
                    {/*Color Mode */}
                    <IconButton
                        variant={"unstyled"}
                        onClick={toggleColorMode}
                        aria-label={"Toggle dark mode"}
                        icon={<Icon color={logoColor}/>}
                    />

                    {/* User Badge */}
                    <Menu>
                        <MenuButton>
                            <Avatar name={user?.username} src={user?.avatar} size={"sm"}/>
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
                py={1}
                px={5}
                columnGap={5}
            >
                <Link href={"/"}>
                    <Box
                        layerStyle={"activeBottom"}
                    >
                        <Text as={"b"} color={logoColor} _hover={{cursor: "pointer", color: "crimson"}}>Home</Text>
                    </Box>
                </Link>
            </HStack>
        </VStack>
    )
}