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
import {useNavigate} from "react-router-dom";

interface ISessionErrorModal {
    isOpen: boolean;
    onClose: () => void;
}
export default function SessionErrorModal({isOpen, onClose}: ISessionErrorModal) {

    const navigate = useNavigate()
    const handleBackToLogin = () => {
        onClose()
        navigate("/")
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Session Expired</ModalHeader>
                <ModalCloseButton />
                <ModalBody> Session has expired. Please login again. </ModalBody>
                <ModalFooter>
                    <Button onClick={handleBackToLogin}>Ok</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}