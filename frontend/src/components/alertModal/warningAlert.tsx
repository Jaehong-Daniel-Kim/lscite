import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Button
} from "@chakra-ui/react";
import {useRef} from "react";

interface IWarningAlertProps {
    isAlertOpen: boolean;
    onAlertClose: () => void;
    title: string;
    description: string;
}

export default function WarningAlert(
    {
        isAlertOpen,
        onAlertClose,
        title,
        description,
    }: IWarningAlertProps) {

    const cancelRef = useRef(null);

    return (
        <AlertDialog
            size={"lg"}
            leastDestructiveRef={cancelRef}
            isOpen={isAlertOpen}
            onClose={onAlertClose}
        >
            <AlertDialogOverlay />
            <AlertDialogContent top={"5rem"}>
                <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                    {title}
                </AlertDialogHeader>
                <AlertDialogBody>
                    {description}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onAlertClose}>
                        Ok
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
