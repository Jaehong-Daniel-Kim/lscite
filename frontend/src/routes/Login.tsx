import {
    Box,
    Button,
    Container, IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text, useToast,
    VStack
} from "@chakra-ui/react";
import {FaEye, FaEyeSlash, FaLock, FaUser} from "react-icons/fa";
import React, {useRef, useState} from "react";
import LoginOptions from "../components/LoginOptions";
import {LogIn} from "../api";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const userName = useRef("");
    const userPw = useRef("");
    const navigate = useNavigate();
    const toast = useToast();

    const handlePasswordVisibility = () => setShowPassword(!showPassword);
    const handleUserNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        userName.current = e.target.value
    }

    const handleUserPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        userPw.current = e.target.value
    }


    const handleLogin = async () => {
        const loginStatusToast = toast({
            title: "Waiting",
            description: "Trying to logging you in...",
            status: "loading",
        });
        const response = await LogIn(userName.current, userPw.current);
        const {OK: successMsg, ERROR: failMsg} = response.data

        if (response.status === 200) {
            toast.update(loginStatusToast, {
                title: "OK",
                description: successMsg,
                status: "success",
            })
            navigate("/home")

        } else {
            toast.update(loginStatusToast, {
                title: "ERROR",
                description: failMsg,
                status: "error"
            })
        }
    }

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
                {/*username input*/}
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
                        name={"userName"}
                        id={"userName"}
                        onChange={handleUserNameInput}
                    />
                </InputGroup>

                {/*password input*/}
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
                        type={showPassword ? "text" : "password"}
                        placeholder={"Password"}
                        name={"userPassword"}
                        id={"userPassword"}
                        onChange={handleUserPasswordInput}
                    />
                    <InputRightElement>
                        {
                            showPassword ? (
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

            {/*login button*/}
            <Button
                colorScheme={"red"}
                w={"100%"}
                onClick={handleLogin}
            >Login
            </Button>
            <LoginOptions />
        </Container>
    )
}