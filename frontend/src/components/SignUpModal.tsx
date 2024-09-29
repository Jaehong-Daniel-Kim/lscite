import {
    Tooltip,
    Text,
    Box,
    Button,
    Divider,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
    useDisclosure,
    Collapse,
    Select,
    InputRightElement,
    IconButton,
    Alert,
    AlertIcon, InputLeftAddon, PinInput, PinInputField, Highlight, Card, CardHeader, Heading, CardBody, StackDivider,
} from "@chakra-ui/react";
import {FaCaretDown, FaCaretUp, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser, FaUserCheck} from "react-icons/fa";
import LoginOptions from "./LoginOptions";
import React, {useRef, useState} from "react";
import {MdGroup, MdTitle} from "react-icons/md";
import {BiSolidInstitution} from "react-icons/bi";
import {TbBinaryTree2} from "react-icons/tb";
import {GrGroup} from "react-icons/gr";
import {AiOutlineTeam} from "react-icons/ai";
import {getExistenceOfUser} from "../api";
import {isStrongPassword} from "validator";

interface ISignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type InputEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
type InputRef = React.MutableRefObject<string>

export default function SignUpModal({isOpen, onClose}: ISignUpModalProps) {
    const firstName = useRef("")
    const lastName = useRef("")
    const username = useRef("")
    const email = useRef("")
    const emailDomain = useRef("")
    const password = useRef("")
    const checkPassword = useRef("")
    const company = useRef("")
    const department = useRef("")
    const group = useRef("")
    const team = useRef("")

    const [showPassword, setShowPassword] = useState(false);
    const [showCheckPassword, setShowCheckPassword] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
    const [isPasswordAvailable, setIsPasswordAvailable] = useState(false);
    const [isPasswordChecked, setIsPasswordChecked] = useState(false);
    const [emailAddress, setEmailAddress] = useState("");

    const { isOpen: isBasicInfoOpen, onToggle: onBasicInfoToggle } = useDisclosure();
    const { isOpen: isAccountInfoOpen, onToggle: onAccountInfoToggle } = useDisclosure();
    const { isOpen: isEmailInfoOpen, onToggle: onEmailInfoToggle } = useDisclosure();

    const { isOpen: isUsernameHelpTextOpen, onToggle: onUsernameHelpTextToggle } = useDisclosure();
    const { isOpen: isPasswordValidationMsgOpen, onToggle: onPasswordValidationMsgToggle } = useDisclosure();
    const { isOpen: isCheckPasswordValidationMsgOpen, onToggle: onCheckPasswordValidationMsgToggle } = useDisclosure();
    const { isOpen: isEmailVerificationCodeOpen, onToggle: onEmailVerificationCodeToggle } = useDisclosure();
    const fillInputColor = (e: InputEvent, refObj: InputRef) => {
        if (refObj.current !== "") {
            e.target.style.color = "black";
        } else {
            e.target.style.color = "#718096";
        }
    }

    const handlePasswordVisibility1 = () => setShowPassword(!showPassword);
    const handlePasswordVisibility2 = () => setShowCheckPassword(!showCheckPassword);
    const handleBasicInfoAutoClose = () => {
        if (
            firstName.current &&
            lastName.current &&
            company.current &&
            department.current &&
            group.current &&
            team.current
        ) {
            onBasicInfoToggle();
        }
    }

    const handleAccountInfoAutoClose = () => {
        if (
            (username.current && isUsernameAvailable) &&
            (password.current && isPasswordAvailable) &&
            (checkPassword.current && isPasswordChecked)
        ) {
            if (!isAccountInfoOpen) {
                onAccountInfoToggle();
            }
        }
    }

    const handleBasicInfoInput = (e: InputEvent) => {
        switch (e.target.name) {
            case "firstName":
                firstName.current = e.target.value;
                break;
            case "lastName":
                lastName.current = e.target.value;
                break;
            case "company":
                company.current = e.target.value;
                fillInputColor(e, company);
                break;
            case "department":
                department.current = e.target.value;
                fillInputColor(e, department);
                break;
            case "group":
                group.current = e.target.value;
                fillInputColor(e, group);
                break;
            case "team":
                team.current = e.target.value;
                fillInputColor(e, team)
                break;
        }
        handleBasicInfoAutoClose();
    }

    const handleAccountInfoChange = (e: InputEvent)  => {
        switch (e.target.name) {
            case "username":
                if (isUsernameHelpTextOpen) {
                    onUsernameHelpTextToggle();
                }
                username.current = e.target.value;
                break;
            case "password":
                password.current = e.target.value;
                if (isPasswordValidationMsgOpen) {
                    onPasswordValidationMsgToggle();
                }
                break;
            case "checkPassword":
                checkPassword.current = e.target.value;
                if (isCheckPasswordValidationMsgOpen) {
                    onCheckPasswordValidationMsgToggle();
                }
                break;
        }
    }

    const handleEmailInfoChange = (e: InputEvent) => {
        switch (e.target.name) {
            case "email":
                email.current = e.target.value
                break;
            case "emailDomain":
                emailDomain.current = e.target.value
                break;
        }
        setEmailAddress(`${email.current}@${emailDomain.current}`)
        if (
            email.current &&
            emailDomain.current &&
            !isEmailVerificationCodeOpen
        ) {
            onEmailVerificationCodeToggle();
        }
    }

    const validateUsername = async () => {
        if (username.current) {
            const response = await getExistenceOfUser(username.current);
            const {Ok, Error} = response
            if (Ok) {
                setIsUsernameAvailable(true);
            } else if (Error) {
                setIsUsernameAvailable(false);
            } else {
                console.log(response)
            }
            if (!isUsernameHelpTextOpen) {
                onUsernameHelpTextToggle();
            }
        }
    }

    const validatePassword = (e: InputEvent) => {
        if (password.current) {
            if (isStrongPassword(e.target.value, {
                minLength: 8, minLowercase:1, minNumbers: 1, minUppercase: 0, minSymbols: 0
            })) {
                setIsPasswordAvailable(true)
            } else {
                setIsPasswordAvailable(false)
            }
            if (!isPasswordValidationMsgOpen) {
                onPasswordValidationMsgToggle();
            }
        }
    }

    const validateCheckPassword = () => {
        if (checkPassword.current) {
            if (password.current === checkPassword.current) {
                setIsPasswordChecked(true);
            } else {
                setIsPasswordChecked(false);
            }
            if (!isCheckPasswordValidationMsgOpen) {
                onCheckPasswordValidationMsgToggle();
            }
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior={"inside"}
            closeOnOverlayClick={false}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>SignUp</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {/*Section Divider - Basic Information*/}
                    <HStack
                        onClick={onBasicInfoToggle}
                    >
                        <Divider borderColor={"gray.400"} />
                        <Text
                            whiteSpace={"nowrap"}
                            fontSize={"sm"}
                            py={3}
                        >Basic Information
                        </Text>
                        { isBasicInfoOpen ? <FaCaretUp size={"25"}/> : <FaCaretDown size={"25"}/> }
                        <Divider borderColor={"gray.400"} />
                    </HStack>
                    <Collapse in={!isBasicInfoOpen} animateOpacity>
                        <VStack>
                            {/*First Name*/}
                            <InputGroup>
                                <InputLeftElement
                                    children={ <Box color={"gray.400"}><MdTitle /></Box> }
                                />
                                <Input
                                    name={"firstName"}
                                    variant={"filled"}
                                    placeholder={"First Name"}
                                    onChange={(e) => handleBasicInfoInput(e)}
                                />
                            </InputGroup>

                            {/*Last Name*/}
                            <InputGroup>
                                <InputLeftElement
                                    children={<Box color={"gray.400"}><MdTitle/></Box>}
                                />
                                <Input
                                    name={"lastName"}
                                    variant={"filled"}
                                    placeholder={"Last Name"}
                                    onChange={(e) => handleBasicInfoInput(e)}
                                />
                            </InputGroup>

                            {/*Company*/}
                            <HStack w={"100%"} bg={"gray.100"} gap={0}>
                                <Box color={"gray.400"} paddingLeft={3}>
                                    <BiSolidInstitution />
                                </Box>
                                <Select
                                    name={"company"}
                                    placeholder={"Select Company"}
                                    size={"md"}
                                    color={"gray.500"}
                                    variant={"filled"}
                                    colorScheme={"gray.300"}
                                    onChange={(e) => handleBasicInfoInput(e)}
                                >
                                    <option value={"opt1"}>opt1</option>
                                    <option value={"opt2"}>opt2</option>
                                    <option value={"opt3"}>opt3</option>
                                    <option value={"new"}>Not listed</option>
                                </Select>
                            </HStack>

                            {/*Department*/}
                            <HStack w={"100%"} bg={"gray.100"} gap={0}>
                                <Box color={"gray.400"} paddingLeft={3}>
                                    <TbBinaryTree2 />
                                </Box>
                                <Select
                                    name={"department"}
                                    placeholder={"Select Department"}
                                    size={"md"}
                                    color={"gray.500"}
                                    variant={"filled"}
                                    colorScheme={"gray.300"}
                                    onChange={(e) => handleBasicInfoInput(e)}
                                >
                                    <option value={"opt1"}>opt1</option>
                                    <option value={"opt2"}>opt2</option>
                                    <option value={"opt3"}>opt3</option>
                                    <option value={"new"}>Not listed</option>
                                </Select>
                            </HStack>

                            {/*Group*/}
                            <HStack w={"100%"} bg={"gray.100"} gap={0}>
                                <Box color={"gray.400"} paddingLeft={3}>
                                    <GrGroup />
                                </Box>
                                <Select
                                    name={"group"}
                                    placeholder={"Select Group"}
                                    size={"md"}
                                    color={"gray.500"}
                                    variant={"filled"}
                                    colorScheme={"gray.300"}
                                    onChange={(e) => handleBasicInfoInput(e)}
                                >
                                    <option value={"opt1"}>opt1</option>
                                    <option value={"opt2"}>opt2</option>
                                    <option value={"opt3"}>opt3</option>
                                    <option value={"new"}>Not listed</option>
                                </Select>
                            </HStack>

                            {/*Team*/}
                            <HStack w={"100%"} bg={"gray.100"} gap={0}>
                                <Box color={"gray.400"} paddingLeft={3}>
                                    <AiOutlineTeam />
                                </Box>
                                <Select
                                    name={"team"}
                                    placeholder={"Select Team"}
                                    size={"md"}
                                    color={"gray.500"}
                                    variant={"filled"}
                                    colorScheme={"gray.300"}
                                    onChange={(e) => handleBasicInfoInput(e)}
                                >
                                    <option value={"opt1"}>opt1</option>
                                    <option value={"opt2"}>opt2</option>
                                    <option value={"opt3"}>opt3</option>
                                    <option value={"new"}>Not listed</option>
                                </Select>
                            </HStack>
                        </VStack>
                    </Collapse>


                    {/*Section Divider - Account Information*/}
                    <HStack
                        onClick={onAccountInfoToggle}
                    >
                        <Divider borderColor={"gray.400"} />
                        <Text
                            whiteSpace={"nowrap"}
                            fontSize={"sm"}
                            py={3}
                        >Account Info
                        </Text>
                        { isAccountInfoOpen ? <FaCaretUp size={"25"}/> : <FaCaretDown size={"25"}/> }
                        <Divider borderColor={"gray.400"} />
                    </HStack>
                    <Collapse
                        in={!isAccountInfoOpen}
                        animateOpacity
                    >
                        <VStack paddingBottom={5}>
                            {/*username*/}
                            <Tooltip label={"User account"}>
                                <InputGroup>
                                    <InputLeftElement
                                        children={ <Box color={"gray.400"}> <FaUser/> </Box>}
                                    />
                                    <Input
                                        name={"username"}
                                        variant={"filled"}
                                        placeholder={"Username"}
                                        onChange={(e) => handleAccountInfoChange(e)}
                                        onBlur={validateUsername}
                                    />
                                    <InputRightAddon bg={"gray.600"} color={"white"}>@testemail.com</InputRightAddon>
                                </InputGroup>
                            </Tooltip>
                            {/*username help collapse box*/}
                            <Box as={Collapse} in={isUsernameHelpTextOpen} animateOpacity w={"100%"}>
                                {
                                    isUsernameAvailable ? (
                                        <Alert status={"success"} variant={"left-accent"}>
                                            <AlertIcon />
                                            Username available to use!
                                        </Alert>
                                    ) : (
                                        <Alert status={"error"} variant={"left-accent"}>
                                            <AlertIcon />
                                            Username already in use
                                        </Alert>
                                    )
                                }
                            </Box>

                            {/*Password*/}
                            <Tooltip label={"Password with at least 8 characters including a number and a letter"}>
                                <InputGroup>
                                    <InputLeftElement
                                        children={<Box color={"gray.400"}> <FaLock/> </Box>}
                                    />
                                    <Input
                                        name={"password"}
                                        variant={"filled"}
                                        type={showPassword ? "text" : "password"}
                                        placeholder={"Password"}
                                        onChange={(e) => handleAccountInfoChange(e)}
                                        onBlur={(e) => validatePassword(e)}
                                    />
                                    <InputRightElement>
                                        {
                                            showPassword ? (
                                                <IconButton
                                                    aria-label={"password visible"}
                                                    icon={<FaEye />}
                                                    variant={"ghost"}
                                                    h={"80%"}
                                                    onClick={handlePasswordVisibility1}
                                                />
                                            ) : (
                                                <IconButton
                                                    aria-label={"password hidden"}
                                                    icon={<FaEyeSlash />}
                                                    variant={"ghost"}
                                                    h={"80%"}
                                                    onClick={handlePasswordVisibility1}
                                                />
                                            )
                                        }
                                    </InputRightElement>
                                </InputGroup>
                            </Tooltip>
                            {/*Password Validation Message*/}
                            <Box as={Collapse} in={isPasswordValidationMsgOpen} w={"100%"}>
                                {
                                    isPasswordAvailable ? (
                                        <Alert status={"success"} variant={"left-accent"}>
                                            <AlertIcon />
                                            Password is available to use
                                        </Alert>
                                    ) : (
                                        <Alert status={"error"} variant={"left-accent"}>
                                            <AlertIcon />
                                            Must be longer than 8 characters with at least one letter and one number.
                                        </Alert>
                                    )
                                }
                            </Box>

                            {/*Password Check*/}
                            <Tooltip label={"Enter password again"}>
                                <InputGroup>
                                    <InputLeftElement
                                        children={<Box color={"gray.400"}> <FaLock/> </Box>}
                                    />
                                    <Input
                                        name={"checkPassword"}
                                        variant={"filled"}
                                        type={showCheckPassword ? "text" : "password"}
                                        placeholder={"Check Password"}
                                        onChange={(e) => handleAccountInfoChange(e)}
                                        onBlur={validateCheckPassword}
                                    />
                                    <InputRightElement>
                                        {
                                            showCheckPassword ? (
                                                <IconButton
                                                    aria-label={"password visible"}
                                                    icon={<FaEye />}
                                                    variant={"ghost"}
                                                    h={"80%"}
                                                    onClick={handlePasswordVisibility2}
                                                />
                                            ) : (
                                                <IconButton
                                                    aria-label={"password hidden"}
                                                    icon={<FaEyeSlash />}
                                                    variant={"ghost"}
                                                    h={"80%"}
                                                    onClick={handlePasswordVisibility2}
                                                />
                                            )
                                        }
                                    </InputRightElement>
                                </InputGroup>
                            </Tooltip>
                            {/*Password Check Validation Message*/}
                            <Box as={Collapse} in={isCheckPasswordValidationMsgOpen} w={"100%"}>
                                {
                                    isPasswordChecked ? (
                                        <Alert status={"success"} variant={"left-accent"}>
                                            <AlertIcon />
                                            Successful!
                                        </Alert>
                                    ) : (
                                        <Alert status={"error"} variant={"left-accent"}>
                                            <AlertIcon />
                                            Passwords do not match.
                                        </Alert>
                                    )
                                }
                            </Box>
                        </VStack>
                    </Collapse>

                    {/*Section Divider - Email Information*/}
                    <HStack
                        onClick={onEmailInfoToggle}
                    >
                        <Divider borderColor={"gray.400"} />
                        <Text
                            whiteSpace={"nowrap"}
                            fontSize={"sm"}
                            py={3}
                        >Email Info
                        </Text>
                        { isEmailInfoOpen ? <FaCaretUp size={"25"}/> : <FaCaretDown size={"25"}/> }
                        <Divider borderColor={"gray.400"} />
                    </HStack>
                    <Collapse
                        in={!isEmailInfoOpen}
                        animateOpacity
                    >
                        <VStack paddingBottom={5}>
                            {/*Email*/}
                            <Tooltip label={"User email address"}>
                                <InputGroup>
                                    <InputLeftElement
                                        children={<Box color={"gray.400"}> <FaEnvelope/> </Box>}
                                    />
                                    <Input
                                        name={"email"}
                                        variant={"filled"}
                                        placeholder={"email"}
                                        onChange={(e) => handleEmailInfoChange(e)}
                                        onFocus={handleAccountInfoAutoClose}
                                        w={"45%"}
                                        defaultValue={email.current}
                                    />
                                    <InputRightAddon
                                        bg={"gray.600"}
                                        color={"white"}
                                        w={"auto"}
                                        borderRadius={0}
                                    >@</InputRightAddon>
                                    <InputRightElement
                                        position={"relative"}
                                        w={"45%"}
                                    >
                                        <Select
                                            borderRadius={0}
                                            name={"emailDomain"}
                                            placeholder={"select domain"}
                                            size={"md"}
                                            color={"gray.500"}
                                            variant={"filled"}
                                            colorScheme={"gray.300"}
                                            onChange={(e) => handleEmailInfoChange(e)}
                                            defaultValue={emailDomain.current}
                                        >
                                            <option value={"email1.com"}>email1.com</option>
                                            <option value={"email2.com"}>email2.com</option>
                                        </Select>
                                    </InputRightElement>
                                </InputGroup>
                            </Tooltip>
                            {/*Email Verification*/}
                            <Card
                                as={Collapse}
                                in={isEmailVerificationCodeOpen}
                                w={"100%"}
                                bg={"blue.800"}
                            >
                                <CardHeader>
                                    <Heading
                                        size={"md"}
                                        color={"gray.100"}
                                    >Verify Email</Heading>
                                </CardHeader>
                                <CardBody>
                                    <VStack divider={<StackDivider />} spacing={"3"}>
                                        <Box w={"100%"}>
                                            <Heading color={"yellow.200"} size={"sm"}>{emailAddress}</Heading>
                                            <Text  color={"gray.100"} pt={"2"} fontSize={"sm"}>Send verification code to the email above</Text>
                                        </Box>

                                        <HStack w={"100%"}>
                                            <Button
                                                colorScheme={"blue"}
                                                flex={"1 1 0"}
                                            >Send Code</Button>
                                            <PinInput
                                                otp
                                                onChange={(e) => console.log(e)}
                                            >
                                                <PinInputField color={"white"}/>
                                                <PinInputField color={"white"}/>
                                                <PinInputField color={"white"}/>
                                                <PinInputField color={"white"}/>
                                            </PinInput>
                                        </HStack>
                                    </VStack>
                                </CardBody>
                            </Card>
                        </VStack>
                    </Collapse>

                    <Button colorScheme={"red"} w={"100%"}>SignUp</Button>
                    <LoginOptions/>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}