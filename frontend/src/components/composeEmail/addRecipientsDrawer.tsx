import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody, CardFooter,
    CardHeader,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack, IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Select,
    Text, Tooltip,
    VStack
} from "@chakra-ui/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {PiListMagnifyingGlass} from "react-icons/pi";
import {IUser} from "../../types";
import useDebounce from "../../lib/useDebounce";
import {searchPublicUser} from "../../api";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

interface IAddRecipientDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddRecipientDrawer({isOpen, onClose}: IAddRecipientDrawerProps) {
    const [recipients, setRecipients] = useState<IUser[]>([]);
    const searchCategoryRef = useRef<null | HTMLSelectElement>(null);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const currentPageNumber = useRef(1);
    const maxPageNumber = useRef(0);
    const minPageNumber = useRef(1);
    const debouncedValue = useDebounce(searchKeyword, 1000);
    const [searchResult, setSearchResult] = useState<IUser[]>([]);
    const messageTitle = useRef<string> ("Type keyword to search");

    const handleSelectRecipient = useCallback((e: React.MouseEvent<HTMLDivElement>, user: IUser) => {
        // e.currentTarget.style.boxShadow =  "0 0 0 3px rgba(66, 153, 225, 0.6)"
        setRecipients((prev) => ([...prev, user]))
    }, [])

    const handleSearchRecipients = useCallback(async () => {
        if (searchCategoryRef.current) {
            const category = searchCategoryRef.current.value;
            const response = await searchPublicUser(category, debouncedValue, currentPageNumber.current);
            const {status, message, detail} = response
            if (status === "success") {
                if (detail.data.length >= 1) {
                    if (!maxPageNumber.current) {
                        maxPageNumber.current = Math.ceil(detail.total / detail.count)
                    }
                    messageTitle.current = "Select recipients"

                } else {
                    messageTitle.current = "Result not found"
                }
                setSearchResult(detail.data)
            } else {
                messageTitle.current = "something went wrong"
                console.log(message)
                console.log(detail)
            }
        }
    }, [debouncedValue]);

    const handleNextPage = useCallback(() => {
        if (currentPageNumber.current !== maxPageNumber.current) {
            currentPageNumber.current = currentPageNumber.current + 1
            handleSearchRecipients();
        }
    }, [handleSearchRecipients])

    const handlePrevPage = useCallback(() => {
        if (currentPageNumber.current !== minPageNumber.current) {
            currentPageNumber.current = currentPageNumber.current - 1
            handleSearchRecipients();
        }
    }, [handleSearchRecipients])

    useEffect(() => {
        if (debouncedValue) {
            currentPageNumber.current = 1;
            maxPageNumber.current = 0;
            handleSearchRecipients();
        }
    }, [debouncedValue, handleSearchRecipients]);

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            size={"md"}
        >
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader> Add Recipients </DrawerHeader>
                <Divider borderColor={"gray.500"} my={5} />
                <DrawerBody>
                    <VStack mt={5} rowGap={5}>
                        <HStack w={"100%"} justifyContent={"space-between"} mb={3}>
                            <InputGroup w={"100%"} >
                                <InputLeftElement
                                    position={"relative"}
                                    w={"12rem"}
                                >
                                    <Select
                                        ref={searchCategoryRef}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={0}
                                        defaultValue={"name"}
                                    >

                                        <option value={"name"}>name</option>
                                        <option value={"company"}>company</option>
                                        <option value={"team"}>team</option>
                                    </Select>
                                </InputLeftElement>
                                <Input
                                    name={"name"}
                                    autoComplete={"off"}
                                    placeholder={"name"}
                                    borderTopLeftRadius={0}
                                    borderBottomLeftRadius={0}
                                    w={"100%"}
                                    paddingLeft={5}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                                <InputRightElement>
                                    <IconButton
                                        aria-label={"search button"}
                                        icon={<PiListMagnifyingGlass />}
                                        variant={"unstyled"}
                                        _hover={{cursor: "pointer"}}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </HStack>

                        <Card w={"100%"} bg={"gray.100"}>
                            <CardHeader>
                                <Heading size={"md"}>{messageTitle.current}</Heading>
                            </CardHeader>
                            <VStack >
                                <CardBody w={"100%"} minH={"10rem"} maxH={"30rem"} overflowY={"scroll"}>
                                    {
                                        searchResult.map((user, idx) => (
                                            <React.Fragment key={idx}>
                                                <VStack>
                                                    <VStack
                                                        px={2}
                                                        py={2}
                                                        w={"100%"}
                                                        onClick={(e) => handleSelectRecipient(e, user)}
                                                        _hover={{shadow: "outline", backgroundColor: "gray.200"}}
                                                    >
                                                        <HStack w={"100%"} justifyContent={"start"}>
                                                            <Avatar size={"xs"} name-={user.full_name} src={user.avatar}/>
                                                            <Heading size={"xs"}>{user.full_name}</Heading>
                                                            <Text color={"gray.600"} fontWeight={"500"} fontSize={"xs"} isTruncated>{user.occupation.company} / {user.occupation.department} / {user.occupation.group} / {user.occupation.team}</Text>
                                                        </HStack>
                                                        <VStack w={"100%"} justifyContent={"start"}>
                                                            <Text w={"100%"} fontSize={"sm"} isTruncated>{user.primary_email} / {user.secondary_email} </Text>
                                                        </VStack>
                                                    </VStack>
                                                </VStack>
                                                <Divider borderColor={"gray.500"} my={1.5}/>
                                            </React.Fragment>
                                        ))
                                    }
                                </CardBody>
                                <CardFooter>
                                    {
                                        maxPageNumber.current === 0 ?
                                            <></>
                                            :
                                            <HStack>
                                                <Button
                                                    leftIcon={<FaAngleLeft />}
                                                    onClick={handlePrevPage}
                                                >
                                                    Prev
                                                </Button>
                                                <Text as={"b"}>{currentPageNumber.current} / {maxPageNumber.current}</Text>
                                                <Button
                                                    rightIcon={<FaAngleRight />}
                                                    onClick={handleNextPage}
                                                >
                                                    Next
                                                </Button>
                                            </HStack>
                                    }
                                </CardFooter>
                            </VStack>
                        </Card>
                        <VStack w={"100%"} px={5} border={"1px solid"} borderColor={"gray.400"} borderRadius={5} minH={"10rem"}>

                            {
                                recipients.map((recipient, idx) => (
                                    <Tooltip label={recipient.full_name}>
                                        <Avatar size={"xs"} name-={recipient.full_name} src={recipient.avatar} />
                                    </Tooltip>
                                ))
                            }
                        </VStack>

                        <ButtonGroup w={"100%"} justifyContent={"end"} >
                            <Button colorScheme={"red"} onClick={onClose}>Cancel</Button>
                            <Button colorScheme={"blue"}>Ok</Button>
                        </ButtonGroup>
                    </VStack>
                </DrawerBody>

                <DrawerFooter >
                </DrawerFooter>
            </DrawerContent>

        </Drawer>
    )
}