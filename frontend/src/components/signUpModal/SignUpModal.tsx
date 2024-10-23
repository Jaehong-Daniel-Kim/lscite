import {
    Alert, AlertIcon, Box,
    Button, Collapse,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Spinner, Text, useDisclosure, useToast
} from "@chakra-ui/react";
import BasicInfoSection from "./basicSection";
import AccountInfoSection from "./accountSection";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {IUser, ISignUpFormInputData, SignUpFormSection} from "../../types";
import EmailInfoSection from "./emailSection";
import WarningAlert from "../alertModal/warningAlert";
import {getOccupationTree, signUp} from "../../api";
import {useQuery} from "@tanstack/react-query";

interface ISignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}


export default function SignUpModal({isOpen, onClose}: ISignUpModalProps) {

    const {isLoading: isOccupationTreeLoading, data: occupationTree, isError: isOccupationTreeError} = useQuery({queryKey: ["occupationTree"], queryFn: getOccupationTree})
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {isOpen: isAlertOpen, onClose: onAlertClose, onOpen: onAlertOpen} = useDisclosure();
    const [formData, setFormData] = useState<ISignUpFormInputData>({
        basicInfo: {
            firstName: "",
            lastName: "",
            company: "",
            department: "",
            group: "",
            team: "",
        },
        accountInfo: {
            username: "",
            password: "",
            primaryEmail: "",
        },
        emailInfo: {
            email: "",
        },
    });
    const toast = useToast()

    const handleFormDataUpdate = useCallback((section: SignUpFormSection, data: object): void => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                ...data
            }
        }));
    }, []);

    const isSignUpFormFilled = useMemo<boolean>(() => {
        const { basicInfo, accountInfo, emailInfo } = formData;

        const isBasicInfoFilled = Object.values(basicInfo).every((value) => !!value);
        const isAccountInfoFilled = Object.values(accountInfo).every((value) => !!value);
        const isEmailInfoFilled = Object.values(emailInfo).every((value) => !!value);

        return isBasicInfoFilled && isAccountInfoFilled && isEmailInfoFilled;
    }, [formData]);

    const handleSubmit = useCallback(async() => {
        if (isSignUpFormFilled) {
            const signUpToast = toast({
                title: "Loading....",
                description: "Signing you up",
                status: "loading",
                duration: null,
                isClosable: false,
            })
            const data: IUser = {
                first_name: formData.basicInfo.firstName,
                last_name: formData.basicInfo.lastName,
                occupation: {
                    company: formData.basicInfo.company,
                    department: formData.basicInfo.department,
                    group: formData.basicInfo.group,
                    team: formData.basicInfo.team,
                },
                username: formData.accountInfo.username,
                password: formData.accountInfo.password,
                primary_email: formData.accountInfo.primaryEmail,
                secondary_email: formData.emailInfo.email,
            };
            const response = await signUp(data);
            const {status, message, detail} = response;
            if (status === "success") {
                const fullName = `${detail.first_name} ${detail.last_name}`
                toast.update(signUpToast, {
                    title: `Hello, ${fullName}`,
                    description: `You are ready to go as ${detail.username}`,
                    status: "success",
                    duration: 8000,
                    isClosable: true,
                });
                onClose();
            } else {
                toast.update(signUpToast, {
                    title: `Error`,
                    description: message,
                    status: "error",
                    duration: 8000,
                    isClosable: true,
                });
            }
        } else {
            onAlertOpen();
        }

    }, [formData, toast, isSignUpFormFilled, onAlertOpen, onClose]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            scrollBehavior={"inside"}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign Up</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    {
                        isOccupationTreeLoading
                            ? <Spinner size={"xl"} justifySelf={"center"}/>
                            : occupationTree?.status === "success"
                                ? <>
                                    <BasicInfoSection
                                        onChange={handleFormDataUpdate}
                                        occupationTree={occupationTree.detail}
                                    />

                                    {/*Account Info Section*/}
                                    <AccountInfoSection
                                        onChange={handleFormDataUpdate}
                                    />

                                    {/*Email Info Section*/}
                                    <EmailInfoSection
                                        onChange={handleFormDataUpdate}
                                    />
                                </>
                                : <Text size={"lg"}>Something went wrong</Text>

                    }
                    {/*Basic Info Section*/}
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme={"blue"}
                        onClick={handleSubmit}
                        minWidth={"21%"}
                        isDisabled={occupationTree?.status !== "success"}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
            <WarningAlert
                isAlertOpen={isAlertOpen}
                onAlertClose={onAlertClose}
                title={"Insufficient Information"}
                description={"Please answer to every field above."}
            />
        </Modal>
    )
}