import {
    Alert, AlertIcon, Box,
    Button, Collapse,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import BasicInfoSection from "./basicSection";
import AccountInfoSection from "./accountSection";
import {useCallback, useMemo, useState} from "react";
import {IUser, ISignUpFormInputData, SignUpFormSection} from "../../types";
import EmailInfoSection from "./emailSection";
import WarningAlert from "../alertModal/warningAlert";
import {signUp} from "../../api";

interface ISignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}


export default function SignUpModal({isOpen, onClose}: ISignUpModalProps) {

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

    const handleFormDataUpdate = useCallback((section: SignUpFormSection, data: object): void => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                ...data
            }
        }));
    }, []);

    const isSignUpFormFilled = useMemo(() => {
        const { basicInfo, accountInfo, emailInfo } = formData;

        const isBasicInfoFilled = Object.values(basicInfo).every((value) => !!value);
        const isAccountInfoFilled = Object.values(accountInfo).every((value) => !!value);
        const isEmailInfoFilled = Object.values(emailInfo).every((value) => !!value);

        return isBasicInfoFilled && isAccountInfoFilled && isEmailInfoFilled;
    }, [formData]);

    const handleSubmit = useCallback(async() => {
        if (isSignUpFormFilled) {
            const data: IUser = {
                first_name: formData.basicInfo.firstName,
                last_name: formData.basicInfo.lastName,
                company: {name: formData.basicInfo.company},
                department: {
                    department: formData.basicInfo.department,
                    group: formData.basicInfo.group,
                    team: formData.basicInfo.team,
                },
                username: formData.accountInfo.username,
                password: formData.accountInfo.password,
                primary_email: formData.accountInfo.primaryEmail,
                secondary_email: formData.emailInfo.email,
            };
            console.log(data)
            const response = await signUp(data);
            const {status, message, detail} = response;
            console.log(status, message, detail)
        } else {
            onAlertOpen();
        }

    }, [formData, isSignUpFormFilled, onAlertOpen]);

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
                    {/*Basic Info Section*/}
                    <BasicInfoSection
                        onChange={handleFormDataUpdate}
                    />

                    {/*Account Info Section*/}
                    <AccountInfoSection
                        onChange={handleFormDataUpdate}
                    />

                    {/*Email Info Section*/}
                    <EmailInfoSection
                        onChange={handleFormDataUpdate}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>Submit</Button>
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