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
import {
    IOccupationCompany,
    IOccupationDepartment,
    IOccupationGroup,
    IOccupationTeam,
} from "../../types";


type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>
type SelectFocusEvent = React.FocusEvent<HTMLSelectElement>
type InputFocusEvent = React.FocusEvent<HTMLInputElement>

type SectionName = "basicInfo"
interface IBasicInfoProps {
    onChange: (SignUpSection: SectionName, data: object) => void;
    occupationTree: IOccupationCompany[] | undefined;
}

export default function BasicInfoSection({onChange, occupationTree}: IBasicInfoProps) {
    const [isSectionOpen, setIsSectionOpen] = useState<boolean>(true);
    const firstName = useRef<null | HTMLInputElement>(null);
    const lastName = useRef<null | HTMLInputElement>(null);
    const [selectData, setSelectData] = useState<Record<string, number>>({
        company: 0,
        department: 0,
        group: 0,
        team: 0,
    });
    console.log(selectData)

    const departments = useMemo<IOccupationDepartment[] | undefined>(() => {
        return occupationTree?.find((company) => company.id === selectData.company)?.department;
    }, [selectData.company, occupationTree])

    const groups = useMemo<IOccupationGroup[] | undefined>(() => {
        return departments?.find((department) => department.id === selectData.department)?.group;
    }, [selectData.department, departments])

    const teams = useMemo<IOccupationTeam[] | undefined>(() => {
        return groups?.find((group) => group.id === selectData.group)?.team;
    }, [selectData.group, groups])

    const handleDataExport = useCallback((e: SelectFocusEvent | InputFocusEvent): void => {
        const {name, value} = e.target
        onChange("basicInfo", {[name]: value})
    }, [onChange])

    const handleSelectDataChange = useCallback((e: SelectChangeEvent): void => {
        const {name, value} = e.target
        const newValue = value === "" ? "0" : value
        setSelectData((prev) => ({...prev, [name]: parseInt(newValue)}));
    }, [])

    /*
    The commented functions below manage auto-close functionality of the section.
    It is still in development

    const isAllSelected = useMemo<boolean>(() => {
        return Object.values(selectData).every((value) => value > 0)
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
    */

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
                                color={selectData.company <= 0 ? "gray.500" : ""}
                                variant={"filled"}
                                value={selectData.company}
                                onChange={handleSelectDataChange}
                                onBlur={handleDataExport}
                                isDisabled={!occupationTree}
                            >
                                {
                                    occupationTree?.map((company) => (
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    ))
                                }
                            </Select>
                        </HStack>
                    </Tooltip>

                    {/*Select Department*/}
                    <Box as={Collapse} in={(departments?.length as number) > 0} w={"100%"} animateOpacity>
                        <Tooltip label={"Select department"} placement={"left"} >
                            <HStack w={"100%"} bg={"gray.100"} gap={0}>
                                <Box color={"gray.400"} paddingLeft={3}>
                                    <TbBinaryTree2 />
                                </Box>
                                <Select
                                    name={"department"}
                                    placeholder={"Select Department"}
                                    size={"md"}
                                    color={selectData.department <= 0 ? "gray.500" : ""}
                                    variant={"filled"}
                                    value={selectData.department}
                                    onChange={handleSelectDataChange}
                                    onBlur={handleDataExport}
                                >
                                    {
                                        departments?.map((department) => (
                                            <option key={department.id} value={department.id}>{department.name}</option>
                                        ))
                                    }
                                </Select>
                            </HStack>
                        </Tooltip>
                    </Box>

                    {/*Group*/}
                    <Box as={Collapse} in={(groups?.length as number) > 0} w={"100%"} animateOpacity>
                        <Tooltip label={"Select group"} placement={"left"} >
                            <HStack w={"100%"} bg={"gray.100"} gap={0}>
                                <Box color={"gray.400"} paddingLeft={3}>
                                    <GrGroup />
                                </Box>
                                <Select
                                    name={"group"}
                                    placeholder={"Select Group"}
                                    size={"md"}
                                    color={selectData.group <= 0 ? "gray.500" : ""}
                                    variant={"filled"}
                                    value={selectData.group}
                                    onChange={handleSelectDataChange}
                                    onBlur={handleDataExport}
                                >
                                    {
                                        groups?.map((group) => (
                                            <option key={group.id} value={group.id}>{group.name}</option>
                                        ))
                                    }
                                </Select>
                            </HStack>
                        </Tooltip>
                    </Box>

                    {/*team*/}
                    <Box as={Collapse} in={(teams?.length as number) > 0} w={"100%"} animateOpacity>
                        <Tooltip label={"Select team"} placement={"left"} >
                            <HStack w={"100%"} bg={"gray.100"} gap={0}>
                                <Box color={"gray.400"} paddingLeft={3}>
                                    <AiOutlineTeam />
                                </Box>
                                <Select
                                    name={"team"}
                                    placeholder={"Select Team"}
                                    size={"md"}
                                    color={selectData.team <= 0 ? "gray.500" : ""}
                                    variant={"filled"}
                                    value={selectData.team}
                                    onChange={handleSelectDataChange}
                                    onBlur={handleDataExport}
                                >
                                    {
                                        teams?.map((team) => (
                                            <option key={team.id} value={team.id}>{team.name}</option>
                                        ))
                                    }
                                </Select>
                            </HStack>
                        </Tooltip>
                    </Box>
                </VStack>
            </Collapse>
        </>
    )
}