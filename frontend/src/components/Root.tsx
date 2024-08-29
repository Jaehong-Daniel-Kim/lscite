import {Outlet} from "react-router-dom";
import {Box, HStack} from "@chakra-ui/react";

export default function Root() {
    return(
        <Box>
            <HStack></HStack>
            <Outlet />
        </Box>
    )
}