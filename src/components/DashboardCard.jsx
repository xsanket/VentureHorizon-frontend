import React from 'react'
import { Box, Heading, Text, useBreakpointValue } from "@chakra-ui/react";


const Card = ({ head, count }) => {
    const isVertical = useBreakpointValue({ base: true, lg: false });

    return (
        <>
            <Box
                boxShadow="2xl"
                width={!isVertical ? "calc(100% / 5)" : "100%"}
                borderWidth={1}
                borderLeftColor="teal.300"
                borderLeftWidth={5}
                borderRadius="md"
                padding={2}
                marginBottom={4}
                bgColor={"white"}
                textAlign={"left"}
            >

                <Text color={"gray.500"}>{head}</Text>
                <Heading pr={20} color={"gray.600"} fontSize={"5xl"}>
                    {count}
                </Heading>
            </Box>
        </>
    )
}


export default function DashboardCard({ data }) {
    const isVertical = useBreakpointValue({ base: true, lg: false });

    return (
        <>
            <Box
                width={"100%"}
                display="flex"
                gap={5}
                overflow={isVertical ? "scroll" : "inherit"}
            >
                {data && data.length > 0 ? (
                    data.map((ele, index) => (
                        <Card key={index} head={ele.head} count={ele.count} />
                    ))
                ) : (
                    <Text>No data available</Text>
                )}
            </Box>



        </>
    )
}



