import {
    Box,
    Collapse,
    Divider,
    HStack,
    Input,
    InputGroup,
    InputLeftElement, Select,
    Text,
    Tooltip,
    VStack
} from "@chakra-ui/react";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {MdTitle} from "react-icons/md";
import {BiSolidInstitution} from "react-icons/bi";
import {TbBinaryTree2} from "react-icons/tb";
import {GrGroup} from "react-icons/gr";
import {AiOutlineTeam} from "react-icons/ai";


type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>
type SelectFocusEvent = React.FocusEvent<HTMLSelectElement>
type InputFocusEvent = React.FocusEvent<HTMLInputElement>

type SectionName = "basicInfo"
interface IBasicInfoProps {
    onChange: (SignUpSection: SectionName, data: object) => void;
}

export default function BasicInfoSection({onChange}: IBasicInfoProps) {

    const [isSectionOpen, setIsSectionOpen] = useState<boolean>(true);
    const firstName = useRef<null | HTMLInputElement>(null);
    const lastName = useRef<null | HTMLInputElement>(null);
    const [selectData, setSelectData] = useState<Record<string, string>>({
        company: "",
        department: "",
        group: "",
        team: "",
    });

    const handleDataExport = useCallback((e: SelectFocusEvent | InputFocusEvent): void => {
        const {name, value} = e.target
        onChange("basicInfo", {[name]: value})
    }, [onChange])

    const handleSelectDataChange = useCallback((e: SelectChangeEvent): void => {
        const {name, value} = e.target
        setSelectData((prev) => ({...prev, [name]: value}));
    }, [])

    const isAllSelected = useMemo<boolean>(() => {
        return Object.values(selectData).every((value) => value.length > 0)
    }, [selectData])

    const checkSectionOpenState = useCallback((): void => {
        if (!firstName.current || (firstName.current && firstName.current.value?.length <= 0)) return;
        if (!lastName.current || (lastName.current && lastName.current.value?.length <= 0)) return;
        if (!isAllSelected) return;
        setIsSectionOpen((prev) => !prev)
    }, [firstName, isAllSelected])

    useEffect((): void => {
        checkSectionOpenState();
    }, [checkSectionOpenState])

    return (
        <>
            {/*Section Divider*/}
            <HStack
                borderColor={"blue"}
                onClick={() => setIsSectionOpen((prev) => !prev)}
            >
                <Divider borderColor={"gray.400"} />
                <Text
                    whiteSpace={"nowrap"}
                    fontSize={"sm"}
                    py={3}
                > Basic Information </Text>
                { isSectionOpen ? <FaCaretUp size={"25"}/> : <FaCaretDown size={"25"}/> }
                <Divider borderColor={"gray.400"} />
            </HStack>

            {/*Section Content*/}
            <Collapse in={isSectionOpen} animateOpacity>
                <VStack>
                    {/*First Name*/}
                    <Tooltip label={"Your first name"} placement={"left"}>
                        <InputGroup>
                            <InputLeftElement
                                children={<Box color={"gray.400"}><MdTitle /></Box>}
                            />
                            <Input
                                ref={firstName}
                                autoComplete={"given-name"}
                                name={"firstName"}
                                variant={"filled"}
                                placeholder={"First Name"}
                                onBlur={handleDataExport}
                            />
                        </InputGroup>
                    </Tooltip>

                    {/*Last Name*/}
                    <Tooltip label={"Your last name"} placement={"left"} >
                        <InputGroup>
                            <InputLeftElement
                                children={<Box color={"gray.400"}><MdTitle /></Box>}
                            />
                            <Input
                                ref={lastName}
                                autoComplete={"family-name"}
                                name={"lastName"}
                                variant={"filled"}
                                placeholder={"Last Name"}
                                onBlur={handleDataExport}
                            />
                        </InputGroup>
                    </Tooltip>

                    {/*Select Company*/}
                    <Tooltip label={"Select company"} placement={"left"} >
                        <HStack w={"100%"} bg={"gray.100"} gap={0}>
                            <Box color={"gray.400"} paddingLeft={3}>
                                <BiSolidInstitution />
                            </Box>
                            <Select
                                name={"company"}
                                placeholder={"Select Company"}
                                size={"md"}
                                color={selectData.company?.length <= 0 ? "gray.500" : ""}
                                variant={"filled"}
                                value={selectData.company}
                                onChange={handleSelectDataChange}
                                onBlur={handleDataExport}
                            >
                                <option value={"opt1"}>company1</option>
                                <option value={"opt2"}>company2</option>
                                <option value={"opt3"}>company3</option>
                            </Select>
                        </HStack>
                    </Tooltip>

                    {/*Select Department*/}
                    <Tooltip label={"Select department"} placement={"left"} >
                        <HStack w={"100%"} bg={"gray.100"} gap={0}>
                            <Box color={"gray.400"} paddingLeft={3}>
                                <TbBinaryTree2 />
                            </Box>
                            <Select
                                name={"department"}
                                placeholder={"Select Department"}
                                size={"md"}
                                color={selectData.department?.length <= 0 ? "gray.500" : ""}
                                variant={"filled"}
                                value={selectData.department}
                                onChange={handleSelectDataChange}
                                onBlur={handleDataExport}
                            >
                                <option value={"opt1"}>dept1</option>
                                <option value={"opt2"}>dept2</option>
                                <option value={"opt3"}>dept3</option>
                            </Select>
                        </HStack>
                    </Tooltip>

                    {/*Group*/}
                    <Tooltip label={"Select group"} placement={"left"} >
                        <HStack w={"100%"} bg={"gray.100"} gap={0}>
                            <Box color={"gray.400"} paddingLeft={3}>
                                <GrGroup />
                            </Box>
                            <Select
                                name={"group"}
                                placeholder={"Select Group"}
                                size={"md"}
                                color={selectData.group?.length <= 0 ? "gray.500" : ""}
                                variant={"filled"}
                                value={selectData.group}
                                onChange={handleSelectDataChange}
                                onBlur={handleDataExport}
                            >
                                <option value={"opt1"}>group1</option>
                                <option value={"opt2"}>group2</option>
                                <option value={"opt3"}>group3</option>
                            </Select>
                        </HStack>
                    </Tooltip>

                    {/*team*/}
                    <Tooltip label={"Select team"} placement={"left"} >
                        <HStack w={"100%"} bg={"gray.100"} gap={0}>
                            <Box color={"gray.400"} paddingLeft={3}>
                                <AiOutlineTeam />
                            </Box>
                            <Select
                                name={"team"}
                                placeholder={"Select Team"}
                                size={"md"}
                                color={selectData.team?.length <= 0 ? "gray.500" : ""}
                                variant={"filled"}
                                value={selectData.team}
                                onChange={handleSelectDataChange}
                                onBlur={handleDataExport}
                            >
                                <option value={"opt1"}>team1</option>
                                <option value={"opt2"}>team2</option>
                                <option value={"opt3"}>team3</option>
                            </Select>
                        </HStack>
                    </Tooltip>
                </VStack>
            </Collapse>
        </>
    )
}