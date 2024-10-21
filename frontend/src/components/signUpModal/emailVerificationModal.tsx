import {
    Box,
    Button, Heading, Highlight, HStack, Icon, IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay, PinInput, PinInputField, Spinner, Text, Tooltip,
    useDisclosure, VStack
} from "@chakra-ui/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import CloseAlert from "../alertModal/closeAlert";
import {GrSend} from "react-icons/gr";
import {checkPinCode, generatePinCode} from "../../api";
import {FaRedoAlt} from "react-icons/fa";

interface IEmailVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    setData: (isChecked: boolean) => void;
    email: string;
}

export default function EmailVerificationModal(
    {
        isOpen,
        onClose,
        setData,
        email,
    }: IEmailVerificationModalProps) {

    const {isOpen: isAlertOpen, onOpen:onAlertOpen, onClose: onAlertClose} = useDisclosure();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [pinCode, setPinCode] = useState<string>("");
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [isPinCodeGenerating, setIsPinCodeGenerating] = useState<boolean>(false);
    const initialFocusRef = useRef<null | HTMLInputElement>(null);

    const [timer , setTimer] = useState<number>(3 * 60);  // 3 minutes
    const resetTimer = useCallback((): void => {
        setTimer(3 * 60);
    }, [])

    useEffect(() => {
        // do nothing when modal is closed
        if (!isOpen || timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        // Clean up function to clean up old interval when the component is re-rendered or unmounted
        return () => clearInterval(interval);
    }, [timer, isOpen]);

    useEffect(() => {
        if (isOpen) {
            resetTimer(); // reset timer on every modal open
        }
    }, [resetTimer, isOpen])

    const formatTime = (timeLeft: number): string => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    const handleModalClose = useCallback((): void => {
        onAlertOpen();
    }, [onAlertOpen])

    const handleSubmit = useCallback(async(): Promise<void> => {
        setIsChecking(true);
        if (buttonRef.current) {
            buttonRef.current.disabled = true;
        }
        const response = await checkPinCode(pinCode, email)
        const {status, } = response
        if (status === "success") {
            setData(true);
            onClose();
        } else {
            console.log(response);
        }
        setIsChecking(false);
        if (buttonRef.current) {
            buttonRef.current.disabled = false;
        }

    }, [email, pinCode, onClose, setData])

    const handleResendCode = useCallback(async(): Promise<void> => {
        setIsPinCodeGenerating(true);
        const response = await generatePinCode(email);
        const {status, } = response
        if (status === "success") {
            // Reset Timer
            setIsPinCodeGenerating(false);
            resetTimer();
        } else {
            console.log(response);
        }
    }, [email, resetTimer])

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleModalClose}
            closeOnOverlayClick={false}
            scrollBehavior={"inside"}
            initialFocusRef={initialFocusRef}
            size={"sm"}
        >
            <ModalOverlay />
            <ModalContent
                top={"5rem"}
            >
                <Box position={"relative"} display={"block"} h={12} />
                <ModalBody>
                    <VStack spacing={6}>
                        <Heading fontSize={"xl"}>Please verify your email</Heading>
                        <Icon color={"blue.300"} boxSize={20} as={GrSend} />
                        <Text>
                            <Highlight  query={email} styles={{px: "2", py: "1", rounded: "full", bg: "orange.100", color: "black", fontWeight: "500"}}>
                                {`A verification code has been sent to your email address, ${email}.
                                 Copy and paste the code underneath to continue.`}
                            </Highlight>
                        </Text>
                        <HStack spacing={4} justifyContent={"center"}>
                            <VStack justifyContent={"center"} alignContent={"center"} rowGap={0}>
                                <Tooltip label={"Resend code"} placement={"left"}>
                                    <IconButton
                                        variant={"ghost"}
                                        aria-label={"resend"}
                                        icon={<FaRedoAlt />}
                                        size={"sm"}
                                        colorScheme={"blue"}
                                        onClick={handleResendCode}
                                        _active={{}}
                                        _hover={{}}
                                    />
                                </Tooltip>
                                {
                                    !isPinCodeGenerating ?
                                        <Text fontSize={"sm"}> { formatTime(timer) } </Text> :
                                        <Spinner size={"sm"} />
                                }
                            </VStack>
                            <PinInput
                                otp
                                onComplete={(e) => setPinCode(e)}
                            >
                                <PinInputField ref={initialFocusRef} _placeholder={{color: "white"}} bg={"teal.600"} color={"white"} />
                                <PinInputField bg={"teal.600"} _placeholder={{color: "white"}} color={"white"} />
                                <PinInputField bg={"teal.600"} _placeholder={{color: "white"}} color={"white"} />
                                <PinInputField bg={"teal.600"} _placeholder={{color: "white"}} color={"white"} />
                                <PinInputField bg={"teal.600"} _placeholder={{color: "white"}} color={"white"} />
                            </PinInput>
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <HStack justifyContent={"right"} spacing={3}>
                        <Button
                            ref={buttonRef}
                            isDisabled={!(pinCode)}
                            colorScheme={"blue"}
                            variant={"solid"}
                            onClick={(e) => handleSubmit()}
                            minW={"5rem"}
                        >
                            {
                                isChecking
                                    ? <Spinner size={"lg"}/>
                                    : "Submit"
                            }

                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={handleModalClose}
                        >
                            Close
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
            <CloseAlert
                isAlertOpen={isAlertOpen}
                onAlertClose={onAlertClose}
                onConfirmedClose={onClose}
                title={"Close Verification"}
                description={"You sure to close?"}
            />
        </Modal>
    )
}