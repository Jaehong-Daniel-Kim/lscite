import {
    Box,
    Button,
    Container, Divider, HStack, IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement, useDisclosure,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";
import {FaEye, FaEyeSlash, FaLock, FaUser} from "react-icons/fa";
import React, {useCallback, useRef, useState} from "react";
import {logIn} from "../api";
import {useNavigate} from "react-router-dom";
import {TbPencilPlus} from "react-icons/tb";
import SignUpModal from "../components/signUpModal/SignUpModal";

type InputKeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

export default function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const username = useRef<null | HTMLInputElement>(null);
    const password = useRef<null | HTMLInputElement>(null);

    const {isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen} = useDisclosure()

    const navigate = useNavigate();
    const toast = useToast();

    const handleLogin = useCallback(async() => {
       const loginStatusToast = toast({
           title: "Waiting",
           description: "Trying to logging you in...",
           status: "loading",
       });
        if (username.current?.value && password.current?.value) {
            const response = await logIn(username.current.value, password.current.value);
            const {status, message, } = response;
            if (status === "success") {
                toast.update(loginStatusToast, {
                    status: status,
                    title: status,
                    description: message,
                });
                navigate("/home")
            } else {
                toast.update(loginStatusToast, {
                    status: status,
                    title: status,
                    description: message
                });
            }
        } else {
            toast.close(loginStatusToast);
        }
    }, [navigate, toast]);

    const handleEnterKey = useCallback(async(e: InputKeyboardEvent): Promise<void> => {
        if (e.key === "Enter") {
            await handleLogin()
        }
    }, [handleLogin])

    return (
        <Container
            boxShadow={"2xl"}
            backgroundColor={"gray.300"}
            border={"0.5px solid"}
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
                        ref={username}
                        autoFocus={true}
                        focusBorderColor={"pink.400"}
                        variant={"filled"}
                        placeholder={"Username"}
                        name={"userName"}
                        id={"userName"}
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
                        ref={password}
                        focusBorderColor={"pink.400"}
                        variant={"filled"}
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder={"Password"}
                        name={"userPassword"}
                        id={"userPassword"}
                        onKeyDown={handleEnterKey}
                    />
                    <InputRightElement>
                        {
                            isPasswordVisible ? (
                                <IconButton
                                    aria-label={"password visible"}
                                    icon={<FaEye />}
                                    variant={"ghost"}
                                    h={"80%"}
                                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                                />
                            ) : (
                                <IconButton
                                    aria-label={"password hidden"}
                                    icon={<FaEyeSlash />}
                                    variant={"ghost"}
                                    h={"80%"}
                                    onClick={() => setIsPasswordVisible((prev) => !prev)}
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

            <HStack my={8}>
                <Divider borderColor={"white"}/>
                <Text textTransform={"uppercase"}
                      color={"gray.700"}
                      fontSize={"xs"}
                      as={"b"}>
                    Or
                </Text>
                <Divider borderColor={"white"}/>
            </HStack>
            <VStack>
                <Button w={"100%"} leftIcon={<TbPencilPlus/>} colorScheme={"green"} onClick={onSignUpOpen}>
                    Sign Up New
                </Button>
            </VStack>
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose}/>
        </Container>
    )
}