import { Button, ButtonGroup, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const [pageNumbers, setPageNumbers] = useState([]);


    useEffect(() => {
        const numbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    }, [totalPages]);


    return (
        <>
            <Center>
                <ButtonGroup variant="outline" size="sm">
                    <Button
                        isDisabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)} >
                        Previous
                    </Button>


                    {pageNumbers.map((pageNumber) => (
                        <Button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            colorScheme={pageNumber === currentPage ? "blue" : "gray"}
                        >
                            {pageNumber}

                        </Button>

                    ))}

                    <Button
                        isDisabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        colorScheme="blue"
                    > Next

                    </Button>



                </ButtonGroup>
            </Center>



        </>
    )
}
