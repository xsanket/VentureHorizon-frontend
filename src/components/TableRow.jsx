import React from 'react';
import { Tr, Td, Button, Text, Heading } from "@chakra-ui/react";

export default function TableRow({
    id,
    ProjectName,
    StartDate = "",
    EndDate = "",
    Reason,
    Type,
    Division,
    Category,
    Priority,
    Department,
    Location,
    Status,
    handleUpdate,
}) {

    const monthNumberToWord = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString("en-US", { month: "short" });
    };

    const formatDate = (date) => {
        if (!date || date.length < 10) return "Invalid Date";
        const month = monthNumberToWord(date.slice(5, 7));
        const day = date.slice(8, 10);
        const year = date.slice(0, 4);
        return `${month} ${day}, ${year}`;
    };

    return (
        <>
            <Tr>
                <Td w={"100px"} h={"40px"}>
                    <Heading fontWeight={500} fontSize={"17px"} color={"gray.700"}>
                        {ProjectName}
                    </Heading>
                    <Text fontSize={"13px"} color={"gray.500"}>
                        {formatDate(StartDate)} to {formatDate(EndDate)}
                    </Text>
                </Td>
                <Td>{Reason}</Td>
                <Td>{Type}</Td>
                <Td>{Division}</Td>
                <Td>{Category}</Td>
                <Td>{Priority}</Td>
                <Td>{Department}</Td>
                <Td>{Location}</Td>
                <Td fontWeight={"bold"}>{Status}</Td>
                
                <Td display={"flex"} gap={2}>
                    <Button
                        size={"sm"}
                        borderRadius={20}
                        colorScheme="blue"
                        variant={"solid"}
                        fontWeight={400}
                        w={"60px"}
                        onClick={() => handleUpdate("Running", id)}
                    >
                        START
                    </Button>
                    <Button
                        size={"sm"}
                        borderRadius={20}
                        colorScheme="blue"
                        variant={"outline"}
                        w={"60px"}
                        fontWeight={400}
                        onClick={() => handleUpdate("Closed", id)}
                    >
                        CLOSE
                    </Button>
                    <Button
                        size={"sm"}
                        borderRadius={20}
                        colorScheme="blue"
                        fontWeight={400}
                        w={"60px"}
                        variant={"outline"}
                        onClick={() => handleUpdate("Cancelled", id)}
                    >
                        END
                    </Button>
                </Td>
            </Tr>
        </>
    );
}
