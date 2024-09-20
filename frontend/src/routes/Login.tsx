import {
    Box,
    Button,
    Center,
    Container, IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
    VStack
} from "@chakra-ui/react";
import {FaEye, FaEyeSlash, FaLock, FaUser} from "react-icons/fa";
import React, {useState} from "react";
import SocialLogin from "../components/SocialLogin";

export default function Login() {
    const [show, setShow] = useState(false)
    const handlePasswordVisibility = () => setShow(!show)

    return (
        <Container
            backgroundColor={"gray.300"}
            border={"1px solid"}
            m={0}
            paddingBottom={5}
            borderRadius={10}
            display={"block"}
            position={"absolute"}
            top={"50%"}
            transform={"translate(0, -50%)"}

        >
            <VStack my={5}>
                <InputGroup
                    bg={"white"}
                    borderRadius={10}
                >
                    <InputLeftElement children={
                        <Box color={"pink.500"}>
                            <FaUser/>
                        </Box>}
                    />
                    <Input
                        autoFocus={true}
                        focusBorderColor={"pink.400"}
                        variant={"filled"}
                        placeholder={"Username"}
                    />
                </InputGroup>

                <InputGroup
                    bg={"white"}
                    borderRadius={10}
                >
                    <InputLeftElement children={
                        <Box color={"pink.500"}>
                            <FaLock/>
                        </Box>}
                    />
                    <Input
                        focusBorderColor={"pink.400"}
                        variant={"filled"}
                        type={show ? "text" : "password"}
                        placeholder={"Password"}
                    />
                    <InputRightElement>
                        {
                            show ? (
                                <IconButton
                                    aria-label={"password visible"}
                                    icon={<FaEye />}
                                    variant={"ghost"}
                                    h={"80%"}
                                    onClick={handlePasswordVisibility}
                                />
                            ) : (
                                <IconButton
                                    aria-label={"password hidden"}
                                    icon={<FaEyeSlash />}
                                    variant={"ghost"}
                                    h={"80%"}
                                    onClick={handlePasswordVisibility}
                                />
                            )
                        }
                    </InputRightElement>
                </InputGroup>
            </VStack>
            <Button
                colorScheme={"red"}
                w={"100%"}
            >Login
            </Button>
            <SocialLogin />
        </Container>
    )
}