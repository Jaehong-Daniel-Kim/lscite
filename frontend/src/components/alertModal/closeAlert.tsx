import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Button, HStack
} from "@chakra-ui/react";
import {useCallback, useRef} from "react";

interface ICloseAlertProps {
    isAlertOpen: boolean;
    onAlertClose: () => void;
    onConfirmedClose: () => void;
    title: string;
    description: string;
}

export default function CloseAlert(
    {
        isAlertOpen,
        onAlertClose,
        onConfirmedClose,
        title,
        description,
    }: ICloseAlertProps) {

    const cancelRef = useRef(null);

    const handleConfirmedClose = useCallback(() => {
        onAlertClose();
        onConfirmedClose();
    }, [onAlertClose, onConfirmedClose])

    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isAlertOpen}
            onClose={onAlertClose}
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
                    {title}
                </AlertDialogHeader>
                <AlertDialogBody>
                    {description}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <HStack justifyContent={"right"} spacing={3}>
                        <Button ref={cancelRef} onClick={onAlertClose}>
                            Cancel
                        </Button>
                        <Button colorScheme={"red"} onClick={handleConfirmedClose}>
                            Close
                        </Button>
                    </HStack>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        )
}