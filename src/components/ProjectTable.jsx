import React from 'react'
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import TableRow from './TableRow';

export default function ProjectTable({ data, handleUpdate }) {


    
    return (
        <>
            <TableContainer borderRadius={5} w={"100%"}>
                <Table size={"sm"} variant="simple">
                    <Thead bgColor={"blue.100"}>
                        <Tr>
                            <Th py={5}>Project Name</Th>
                            <Th>Reason</Th>
                            <Th>Type</Th>
                            <Th>Division</Th>
                            <Th>Category</Th>
                            <Th>Priority</Th>
                            <Th>Dept.</Th>
                            <Th>Location</Th>
                            <Th>Status</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody w={"100%"}>
                        {data?.map((item) => {
                            return (
                                <TableRow
                                    key={item?._id}
                                    ProjectName={item?.ProjectName}
                                    Category={item?.Category}
                                    Division={item?.Division}
                                    Location={item?.Location}
                                    StartDate={item?.StartDate}
                                    EndDate={item?.EndDate}
                                    Priority={item?.Priority}
                                    Status={item?.Status}
                                    Type={item?.Type}
                                    Reason={item?.Reason}
                                    Department={item?.Department}
                                    id={item?._id}
                                    handleUpdate={handleUpdate}
                                />
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>



        </>
    )
}
