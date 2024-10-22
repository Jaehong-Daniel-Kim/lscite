import {
    HStack,
    Divider,
    Text,
    Collapse,
    VStack,
    Tooltip,
    InputGroup,
    InputLeftElement,
    Box,
    Input, InputRightAddon, Alert, AlertIcon, InputRightElement, IconButton, Spinner
} from "@chakra-ui/react";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {FaCaretDown, FaCaretUp, FaEye, FaEyeSlash, FaLock, FaUser} from "react-icons/fa";
import {checkExistence} from "../../api";
import {isStrongPassword} from "validator";

interface IUsernameCheckState {
    status: "info" | "warning" | "success" | "error" | "loading";
    description: string;
}

interface IPasswordCheckState {
    password: {open: boolean, checked: boolean};
    checkPassword: {open: boolean, checked: boolean};
}

type SectionName = "accountInfo"
interface IAccountInfoProps {
    onChange: (SignUpSection: SectionName, data: object) => void;
}

type InputFocusEvent = React.FocusEvent<HTMLInputElement>

export default function AccountInfoSection({onChange}: IAccountInfoProps) {
    const [isSectionOpen, setIsSectionOpen] = useState<boolean>(true);
    const username = useRef<null | HTMLInputElement>(null);
    const password = useRef<null | HTMLInputElement>(null);
    const checkPassword = useRef<null | HTMLInputElement>(null);

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isCheckPasswordVisible, setIsCheckPasswordVisible] = useState<boolean>(false);
    const [passwordCheckState, setPasswordCheckState] = useState<IPasswordCheckState>({
        password: {open: false, checked: false},
        checkPassword: {open: false, checked: false},
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

// password alert message

    const [usernameCheckState, setUsernameCheckState] = useState<IUsernameCheckState>({
        status: "info",
        description: "",
    });
    const [usernameValidationMsgOpen, setUsernameValidationMsgOpen] = useState<boolean>(false);

    const handleDataExport = useCallback((data: {username: string, password: string, primaryEmail: string}): void => {
        onChange("accountInfo", data)
    }, [onChange])

    // validators
    const validateUsername = useCallback(async(e: InputFocusEvent): Promise<void> => {
        if (username.current?.value) {
            setIsLoading(true);
            setUsernameValidationMsgOpen(true);
            const response = await checkExistence({username: username.current.value});
            const {status, message,} = response;
            setUsernameCheckState((prev) => (
                {...prev, status, description: message}
            ));
            setIsLoading(false);
        }
    }, [])

    const validatePassword = useCallback((e: InputFocusEvent): void => {
        const {value: enteredPassword} = e.target
        if (password.current?.value) {
            if (isStrongPassword(
                enteredPassword,
                {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                }
            )) {
                setPasswordCheckState({...passwordCheckState, password: {...passwordCheckState.password, open: true, checked: true}});
            } else {
                setPasswordCheckState({...passwordCheckState, password: {...passwordCheckState.password, open: true, checked: false}});
            }
        }
    }, [passwordCheckState])

    const validateCheckPassword = useCallback((e: InputFocusEvent): void => {
        const {value: enteredCheckPassword} = e.target
        if ((password.current?.value as string)?.length > 0 && passwordCheckState.password.checked) {
            if (password.current?.value === enteredCheckPassword) {
                setPasswordCheckState({...passwordCheckState, checkPassword: {...passwordCheckState.checkPassword, open: true, checked: true}});
            } else {
                setPasswordCheckState({...passwordCheckState, checkPassword: {...passwordCheckState.checkPassword, open: true, checked: false}});
            }
        }
    }, [passwordCheckState])

    const isAllFilled = useMemo<boolean>(() => {
        return (
            !!username.current?.value &&
                usernameCheckState.status === "success" &&
                passwordCheckState.password.checked &&
                passwordCheckState.checkPassword.checked
        )

    }, [username, usernameCheckState, passwordCheckState])

    useEffect((): void => {
        if (isAllFilled && username.current && password.current) {
            handleDataExport({
                username: username.current.value,
                password: password.current.value,
                primaryEmail: `${username.current.value}@priemail.com`,
            })
            setIsSectionOpen(false);
        }
    }, [isAllFilled, handleDataExport])

    return (
        <>
            {/*Section Divider*/}
            <HStack
                onClick={() => setIsSectionOpen((prev) => !prev)}
            >
                <Divider borderColor={"gray.400"} />
                <Text
                    whiteSpace={"nowrap"}
                    fontSize={"sm"}
                    py={3}
                > Account Information </Text>
                { isSectionOpen ? <FaCaretUp size={"25"}/> : <FaCaretDown size={"25"}/> }
                <Divider borderColor={"gray.400"} />
            </HStack>

            {/*Section Content*/}
            <Collapse in={isSectionOpen} animateOpacity>
                <VStack>
                    {/*Username*/}
                    <Tooltip label={"User account"} placement={"left"}>
                        <InputGroup>
                            <InputLeftElement
                                children={<Box color={"gray.400"}><FaUser /></Box>}
                            />
                            <Input
                                ref={username}
                                autoComplete={"username"}
                                name={"username"}
                                variant={"filled"}
                                placeholder={"Username"}
                                onFocus={() => setUsernameValidationMsgOpen(false)}
                                onBlur={validateUsername}
                            />
                            <InputRightAddon bg={"gray.600"} color={"white"}>@testemail.com</InputRightAddon>
                        </InputGroup>
                    </Tooltip>

                    {/*Username Validation Collapse Box*/}
                    <Box
                        as={Collapse}
                        in={usernameValidationMsgOpen}
                        animateOpacity
                        w={"100%"}
                    >
                        {isLoading
                            ? <HStack justifyContent={"center"}>
                                <Spinner size={"md"} />
                            </HStack>
                            : <Alert status={usernameCheckState.status} variant={"left-accent"}>
                                <AlertIcon />
                                {usernameCheckState.description}
                            </Alert>
                        }
                    </Box>

                    {/*Password*/}
                    <Tooltip
                        label={"Password with at least 8 characters including a number and a letter"}
                        placement={"left"}
                    >
                        <InputGroup>
                            <InputLeftElement children={<Box color={"gray.400"}> <FaLock /> </Box>}/>
                            <Input
                                ref={password}
                                autoComplete={"new-password"}
                                name={"password"}
                                variant={"filled"}
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder={"Password"}
                                onFocus={() => setPasswordCheckState({...passwordCheckState, password: {...passwordCheckState.password, open: false}})}
                                onBlur={validatePassword}
                            />
                            <InputRightElement>
                                <IconButton
                                    aria-label={"toggle password visibility"}
                                    icon={isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                    variant={"ghost"}
                                    h={"80%"}
                                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </Tooltip>
                    {/*Password Validation Message*/}
                    <Box
                        as={Collapse}
                        in={passwordCheckState.password.open}
                        w={"100%"}
                    >
                        <Alert
                            status={passwordCheckState.password.checked ? "success" : "error"}
                            variant={"left-accent"}
                        >
                            <AlertIcon />
                            {
                                passwordCheckState.password.checked ?
                                    "Password available to use" :
                                    "Password unavailable"
                            }
                        </Alert>
                    </Box>

                    {/*Check Password*/}
                    <Tooltip
                        label={password.current?.value ? "Enter password again" : "Enter password field first"}
                        placement={"left"}
                    >
                        <InputGroup>
                            <InputLeftElement children={<Box color={"gray.400"}> <FaLock/> </Box>} />
                            <Input
                                ref={checkPassword}
                                autoComplete={"off"}
                                name={"checkPassword"}
                                variant={"filled"}
                                type={isCheckPasswordVisible ? "text" : "password"}
                                placeholder={"Check Password"}
                                onFocus={() => setPasswordCheckState({...passwordCheckState, checkPassword: {...passwordCheckState.checkPassword, open: false}})}
                                onBlur={validateCheckPassword}
                            />
                            <InputRightElement>
                                <IconButton
                                    aria-label={"toggle password visibility"}
                                    icon={isCheckPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                    variant={"ghost"}
                                    h={"80%"}
                                    onClick={() => setIsCheckPasswordVisible((prev) => !prev)}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </Tooltip>

                    {/*Check Password Validation Message*/}
                    <Box
                        as={Collapse}
                        in={passwordCheckState.checkPassword.open}
                        w={"100%"}
                    >
                        <Alert
                            status={passwordCheckState.checkPassword.checked ? "success" : "error"}
                            variant={"left-accent"}
                        >
                            <AlertIcon />
                            {
                                passwordCheckState.checkPassword.checked ?
                                    "Successful!" :
                                    "Passwords do not match..."
                            }
                        </Alert>
                    </Box>
                </VStack>
            </Collapse>

        </>
    )

}