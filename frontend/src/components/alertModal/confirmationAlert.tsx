import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Button, HStack
} from "@chakra-ui/react";
import {useCallback, useRef, useState} from "react";


interface IConfirmationAlertProps {
    isAlertOpen: boolean;
    onAlertClose: () => void;
    callback: () => void;
    title: string;
    description: string;
}

export default function ConfirmationAlert({isAlertOpen, onAlertClose, callback, title, description}: IConfirmationAlertProps) {
    const cancelRef = useRef(null);

    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isAlertOpen}
            onClose={onAlertClose}
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader fontSize={"lg"}>
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
                        <Button colorScheme={"red"} onClick={() => callback()}>
                            Delete
                        </Button>
                    </HStack>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    )
}