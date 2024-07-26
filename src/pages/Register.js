import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, FormControl, InputRightElement, FormErrorMessage, FormLabel, Image, Input, InputGroup, Stack, Text, useBreakpointValue, useColorModeValue, viewIcon, Toast, useToast } from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { userLogin, userRegistration } from '../apiCalls/userApiCall';
import { Link, useNavigate } from 'react-router-dom';
import BgImage from '../../public/bg.svg';
import logoImage from "../../public/Logo.svg"
import Login from './Login';


export default function Register() {

    const isVertical = useBreakpointValue({ base: true, lg: false })
    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const [valid, setValid] = useState(false)





    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };



    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setCheckEmail(false);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setCheckPassword(false);
    }


    const handleSubmit = async (values) => {
        if (!validateEmail(email)) {
            setCheckEmail(true);
            return;
        }

        if (password.trim() === "") {
            setCheckPassword(true);
            return;
        }

        try {


            const response = await userRegistration({ email, password });

            if (response.success) {
                toast({
                    title: "Registered Successfully",
                    status: "success",
                    duration: 3000,
                    position: "top"
                });
                navigate("/")
            }
            else if (response.message === "user already exist") {
                toast({
                    title: "User already exist",
                    status: "warning",
                    duration: 3000,
                    position: "top"
                });
            }


        } catch (error) {
            setError("Internal Server Error");
            toast({
                title: "Internal Server Error",
                status: "error",
                duration: 3000,
                position: "top"
            });
        }

    }


    return (

        <>
            <Box w={"100%"}>
                <Box
                    w={"full"}
                    h={isVertical ? "37vh" : "79vh"}
                    backgroundImage={`url(${BgImage})`}
                    backgroundPosition={isVertical ? "0 0" : "0 -90"}
                    backgroundSize={'cover'}
                    bgRepeat={"no-repeat"}
                >
                </Box>


                <Box
                    w={"100%"}
                    mt={isVertical ? -200 : -500}
                >
                    <Flex
                        gap={5}
                        mt={0}
                        flexDir={"column"}
                        alignItems={"center"}
                    >
                        <Image boxSize="80px" src={logoImage} />
                        <Text
                            textAlign={"center"} fontWeight={300} fontSize={"20px"} color={"white"}
                        >
                            Streamlining Your Projects <br /> with Finesse
                        </Text>

                    </Flex>

                </Box>

            </Box>


            {/* ************* form *******************************/}

            <Box
                mt={isVertical ? 60 : 10}
                w={"auto"}
            >
                <Stack
                    mt={isVertical ? -150 : 0}
                    bg={"white"}
                    mx={"auto"}
                    maxW={"md"}
                    px={isVertical ? 2 : 8}
                    py={isVertical ? 0 : 8}
                    borderRadius={isVertical ? 0 : 15}
                    boxShadow={isVertical ? "none" : "2xl"}
                    spacing={5}
                >
                    <Stack>
                        <Text
                            textAlign={isVertical ? "center" : "center"}
                            fontWeight={400}
                            fontSize={isVertical ? "20px" : "20px"}
                            color={"gray.600"}
                        >
                            Register to get Started

                        </Text>
                    </Stack>

                    <Box>
                        <Stack
                            spacing={5} pb={0}
                        >
                            <FormControl isInvalid={checkEmail} id="email" isRequired>
                                <FormLabel color={"gray.500"}>Email</FormLabel>
                                <Input
                                    onChange={handleEmailChange}
                                    type="email"
                                    placeholder="Enter your email"
                                    size={"lg"}
                                    value={email}
                                ></Input>
                                {checkEmail && (
                                    <FormErrorMessage>Email is mandatory</FormErrorMessage>
                                )}
                            </FormControl>


                            <FormControl isInvalid={checkPassword} id="password" isRequired>
                                <FormLabel color={"gray.500"} >Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        onChange={handlePasswordChange}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        size={"lg"}
                                        value={password}
                                    ></Input>
                                    <InputRightElement h={"full"}>
                                        <Button
                                            variant={"ghost"}
                                            onClick={() => {
                                                setShowPassword((showPassword) => !showPassword)
                                            }}
                                        >
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />} </Button>

                                    </InputRightElement>

                                </InputGroup>
                                {checkPassword && (
                                    <FormErrorMessage>Password is mandatory</FormErrorMessage>
                                )}
                            </FormControl>

                            <Stack
                                mt={5} spacing={5}
                            >
                                {isVertical && (
                                    <Text
                                        textAlign={"left"}
                                        mt={-5}
                                        pl={5}
                                        fontSize={"18px"}
                                        fontWeight={"bold"}
                                        color={"red.800"}
                                    >
                                        {error}

                                    </Text>
                                )}
                                <Button
                                    w={isVertical ? "100%" : "50%"}
                                    margin={"auto"}
                                    color={"white"}
                                    borderRadius={20}
                                    bg={"blue.600"}
                                    fontWeight={500}
                                    _hover={{ bg: "blue.500" }}

                                    onClick={handleSubmit}

                                >
                                    Register


                                </Button>
                                <Text
                                    textAlign={isVertical ? "center" : "center"}
                                    fontWeight={300}
                                    mb={0}
                                    fontSize={isVertical ? "15px" : "15px"}
                                    color={"gray.600"}
                                >
                                    Already have an account?  <Link to="/" style={{ color: "blue" }} >Login here</Link>

                                </Text>


                            </Stack>

                        </Stack>
                    </Box>

                </Stack>

            </Box>
            {isVertical && (
                <Text
                    textAlign={"center"}
                    fontSize={"14px"}
                    color={"red.500"}
                    mt={9}
                >
                    {error}
                </Text>
            )}


        </>
    );
};

