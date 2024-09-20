import {Box, Button, Divider, HStack, Text, VStack} from "@chakra-ui/react";
import {FaComment, FaGithub} from "react-icons/fa";
import React from "react";

export default function SocialLogin() {
    return (
        <Box>
            <HStack my={8}>
                <Divider borderColor={"white"}/>
                <Text textTransform={"uppercase"}
                      color={"gray.700"}
                      fontSize={"xs"}
                      as={"b"} >
                    Or
                </Text>
                <Divider borderColor={"white"}/>
            </HStack>
            <VStack>
                <Button w={"100%"} leftIcon={<FaGithub />} colorScheme={"blue"}>
                    Continue with Github
                </Button>
                <Button w={"100%"} leftIcon={<FaComment />} colorScheme={"yellow"}>
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    )
}