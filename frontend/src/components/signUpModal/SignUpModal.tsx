import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import BasicInfoSection from "./basicSection";
import AccountInfoSection from "./accountSection";
import {useCallback, useState} from "react";
import {ISignUpFormData, SignUpFormSection} from "../../types";
import EmailInfoSection from "./emailSection";

interface ISignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}


export default function SignUpModal({isOpen, onClose}: ISignUpModalProps) {

    const [formData, setFormData] = useState<ISignUpFormData>({
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
                    <Button onClick={() => {console.log(formData)}}>Submit</Button>
                </ModalFooter>

            </ModalContent>

        </Modal>
    )
}