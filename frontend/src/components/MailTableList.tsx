import {Text, Checkbox, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Box} from "@chakra-ui/react";
import React, {useCallback, useEffect, useRef, useState} from "react";

interface ITableContent {
    title: string;
    sender: string;
    recType: string;
    date: string;
}

interface IMailContent {
    headers: [string, string, string, string];
    minCellWidth: number;
    tableContent: ITableContent[];
}

// www.letsbuildui.dev/articles/resizable-tables-with-react-and-css-grid/
const createHeaders = (headers: [string, string, string, string]) => {
    return headers.map((item) => ({
        text: item, ref: useRef<any>()
    }));
}

export default function MailTableList({headers, minCellWidth, tableContent}: IMailContent) {

    const [tableHeight, setTableHeight] = useState("auto");
    const [activeIndex, setActiveIndex] = useState(null);
    const tableElement = useRef<any>(null);
    const columns = createHeaders(headers);

    const styles = `
        .resize-handle {
            display: block;
            position: absolute;
            cursor: col-resize;
            width: 7px;
            right: 0;
            top: 0;
            z-index: 1;
            border-right: 2px solid transparent;
        }

        .resize-handle:hover {
            border-color: #ccc;
        }

        .resize-handle.active {
            border-color: #517ea5;
        }
    `

    useEffect(() => {
        setTableHeight(tableElement.current.offsetHeight);
    }, [])

    const mouseDown = (index: any)  => {
        setActiveIndex(index);
    }


    const mouseMove = useCallback((e: MouseEvent) => {
        // Return an array of px values
        const gridColumns = columns.map((col, i) => {
            if (i === activeIndex) {
                // Calculate the column width
                const width = e.clientX - (col.ref.current? col.ref.current.offsetLeft : 0)
                if (width >= minCellWidth) {
                    return `${width}px`;
                }
            }
            // otherwise return the previous width (no changes)
            return `${col.ref.current.offsetWidth}px`
        });
        // Assign the px values to the table
        if (tableElement.current) {
            tableElement.current.style.gridTemplateColumns = `${gridColumns.join(' ')}`;
        }
    }, [activeIndex, columns, minCellWidth]);

    const removeListeners = useCallback(() => {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', removeListeners);
    }, [mouseMove]);

    const mouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    }, [setActiveIndex, removeListeners]);

    useEffect(() => {
        if (activeIndex !== null) {
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
        }
        return () => {
            removeListeners();
        }
    }, [activeIndex, mouseMove, mouseUp, removeListeners])




    return (
        <TableContainer w={"100%"} overflowX={"scroll"}>
            <style>{styles}</style>
            <Table
                overflow={"auto"}
                w={"100%"}
                variant={"simple"}
                colorScheme={"blackAlpha"}
                display={"grid"}
                gridTemplateColumns={"65px minmax(150px, 2fr) repeat(3, minmax(150px, 1fr))"}
                ref={tableElement}
            >
                <Thead display={"contents"}>
                    <Tr display={"contents"}>
                        <Th display={"block"} position={"relative"}><Checkbox /></Th>
                        {
                            columns.map(({ref, text}, idx) => (
                                <Th
                                    ref={ref}
                                    key={idx}
                                    display={"block"}
                                    position={"relative"}
                                    textOverflow={"ellipsis"}
                                >
                                    <Text>{text}</Text>
                                    <Box
                                        h={tableHeight}
                                        onMouseDown={() => mouseDown(idx)}
                                        className={`resize-handle ${activeIndex === idx ? 'active' : 'idle' }`}
                                    />
                                </Th>
                            ))
                        }
                    </Tr>
                </Thead>
                {
                    tableContent.map((obj, idx) => (
                        <Tbody key={idx} display={"contents"}>
                            <Tr display={"contents"}>
                                <Td display={"block"} position={"relative"}><Checkbox /></Td>
                                <Td display={"block"} overflow={"hidden"} textOverflow={"ellipsis"}>{obj.title}</Td>
                                <Td display={"block"} overflow={"hidden"} textOverflow={"ellipsis"}>{obj.sender}</Td>
                                <Td display={"block"} overflow={"hidden"} textOverflow={"ellipsis"}>{obj.recType}</Td>
                                <Td display={"block"} overflow={"hidden"} textOverflow={"ellipsis"}>{obj.date}</Td>
                            </Tr>
                        </Tbody>
                    ))
                }
            </Table>
        </TableContainer>
    )
}