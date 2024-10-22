import {
    Alert, AlertIcon,
    Box, Button,
    Collapse,
    Divider,
    HStack,
    Input,
    InputGroup,
    InputLeftElement, InputRightAddon, InputRightElement, Select, Spinner,
    Text,
    Tooltip, useDisclosure,
    VStack
} from "@chakra-ui/react";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {FaCaretDown, FaCaretUp, FaEnvelope} from "react-icons/fa";
import {isEmail} from "validator";
import EmailVerificationModal from "./emailVerificationModal";
import {checkExistence, generatePinCode} from "../../api";

type SectionName = "emailInfo"
interface IEmailInfoProps {
    onChange: (SignUpSection: SectionName, data: object) => void;
}

interface IEmailAddress {
    email: string;
    domain: string;
}

interface IEmailCheckState {
    isEmailVerified: boolean;
    isPinCodeVerified: boolean;
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;

export default function EmailInfoSection({onChange}: IEmailInfoProps) {

    const [isSectionOpen, setIsSectionOpen] = useState<boolean>(true);
    const verifyEmailButtonRef = useRef<null | HTMLButtonElement>(null);
    const [emailAddress, setEmailAddress] = useState<IEmailAddress>({
       email: "",
       domain: "",
    });
    const [emailCheckState, setEmailCheckState] = useState<IEmailCheckState>({
       isEmailVerified: false,
       isPinCodeVerified: false,
    });

    const [emailVerificationAlertMsg, setEmailVerificationAlertMsg] = useState<string>("");

    const [isEmailVerificationAlertOpen, setIsEmailVerificationAlertOpen] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        isOpen: isEmailVerificationOpen,
        onOpen: onEmailVerificationOpen,
        onClose: onEmailVerificationClose,
    } = useDisclosure();

    const getEmailAddress = useCallback((): string => {
        return `${emailAddress.email}@${emailAddress.domain}`
    }, [emailAddress.email, emailAddress.domain]);

    const handleEmailAddressChange = useCallback((e: InputChangeEvent | SelectChangeEvent): void => {
        const {name, value} = e.target
        setEmailAddress({...emailAddress, [name]: value});
        if (isEmailVerificationAlertOpen) {
            setIsEmailVerificationAlertOpen(false);
        }
    }, [emailAddress, isEmailVerificationAlertOpen])

    const isEmailFilled = useMemo<boolean>(() => {
        return Object.values(emailAddress).every((value) => value.length > 0);
    }, [emailAddress])

    const isEmailVerified = useMemo<boolean>(() => {
        return Object.values(emailCheckState).every((value) => (!!value))
    }, [emailCheckState])

    const handleEmailExistenceCheck = useCallback(async(email: string): Promise<boolean> => {
        const {status, message} = await checkExistence({email: email});
        if (status === "success") {
            return true;
        } else if (status === "error") {
            setEmailCheckState((prev) => ({...prev, isEmailVerified: false}));
            setEmailVerificationAlertMsg(message)
            setIsEmailVerificationAlertOpen(true);
            return false;
        } else {
            console.log("Something is wrong. Contact the admin.")
            return false;
        }
    }, [])

    const handleVerifyEmailButtonClick = useCallback(async(): Promise<void> => {
        const email = getEmailAddress();
        if (isEmail(email,{allow_utf8_local_part: false,})) {
            setIsLoading(true);
            if (await handleEmailExistenceCheck(email)) { // Check if email is available to use
                setEmailCheckState((prev) => ({...prev, isEmailVerified: true}));
                const {status, message, detail} = await generatePinCode(email); // generate pin code
                if (status === "success") {
                    onEmailVerificationOpen();
                    console.log(detail)
                } else if (status === "error") {
                    setIsEmailVerificationAlertOpen(true);
                    setEmailVerificationAlertMsg(message)
                } else {
                    console.log("Something is wrong. Contact the admin.")
                }
            }
            setIsLoading(false);
        } else {
            setEmailCheckState((prev) => ({...prev, isEmailVerified: false}));
            setIsEmailVerificationAlertOpen(true);
        }
    }, [getEmailAddress, handleEmailExistenceCheck, onEmailVerificationOpen])

    const handleDataExport = useCallback((): void => {
        const email = getEmailAddress();
        onChange("emailInfo",{email: email})
    }, [onChange, getEmailAddress]);

    const handlePinCodeCheckStatusUpdate = useCallback((isChecked: boolean): void => {
        setEmailCheckState((prev) => ({...prev, isPinCodeVerified: isChecked}));
    }, [])

    useEffect(() => {
        if (isEmailVerified && verifyEmailButtonRef.current) {
            verifyEmailButtonRef.current.disabled = true;
            verifyEmailButtonRef.current.textContent = "Verified!"
            handleDataExport();
        }
    }, [isEmailVerified, handleDataExport])

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
                > Email Information </Text>
                { isSectionOpen ? <FaCaretUp size={"25"}/> : <FaCaretDown size={"25"}/> }
                <Divider borderColor={"gray.400"} />
            </HStack>

            {/*Section Content*/}
            <Collapse in={isSectionOpen} animateOpacity>
                <VStack>
                    <Tooltip label={"Your email address"} placement={"left"}>
                        <InputGroup>
                            <InputLeftElement children={<Box color={"gray.400"}> <FaEnvelope /> </Box>} />
                            <Input
                                name={"email"}
                                autoComplete={"off"}
                                variant={"filled"}
                                placeholder={"email"}
                                w={"45%"}
                                onFocus={() => setIsEmailVerificationAlertOpen(false)}
                                onChange={handleEmailAddressChange}
                            />
                            <InputRightAddon
                                bg={"gray.600"}
                                color={"white"}
                                w={"auto"}
                                borderRadius={0}
                            > @ </InputRightAddon>
                            <InputRightElement
                                position={"relative"}
                                w={"45%"}
                            >
                                <Select
                                    borderRadius={0}
                                    name={"domain"}
                                    placeholder={"select domain"}
                                    size={"md"}
                                    color={!!(emailAddress.domain) ? "" : "gray.500"}
                                    variant={"filled"}
                                    onChange={handleEmailAddressChange}
                                >
                                    <option value={"mydomain.com"}>mydomain.com</option>
                                    <option value={"yourdomain.com"}>yourdomain.com</option>
                                </Select>
                            </InputRightElement>
                        </InputGroup>
                    </Tooltip>
                    <Button
                        ref={verifyEmailButtonRef}
                        isDisabled={!isEmailFilled}
                        variant={"solid"}
                        colorScheme={"teal"}
                        width={"100%"}
                        onClick={() => handleVerifyEmailButtonClick()}
                    >
                        {
                            isLoading ?
                                <Spinner size={"lg"} /> :
                                "Verify Email"
                        }
                    </Button>
                    <Box
                        as={Collapse}
                        in={isEmailVerificationAlertOpen}
                        w={"100%"}
                    >
                        <Alert status={"error"} variant={"left-accent"}>
                            <AlertIcon />
                            {emailVerificationAlertMsg}
                        </Alert>
                    </Box>
                    <EmailVerificationModal
                        isOpen={isEmailVerificationOpen}
                        onClose={onEmailVerificationClose}
                        setData={handlePinCodeCheckStatusUpdate}
                        email={`${emailAddress.email}@${emailAddress.domain}`}
                    />
                </VStack>
            </Collapse>
        </>
    );
}