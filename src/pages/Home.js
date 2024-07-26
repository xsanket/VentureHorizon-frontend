import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, FormControl, InputRightElement, FormErrorMessage, FormLabel, Image, Input, InputGroup, Stack, Text, useBreakpointValue, useColorModeValue, viewIcon, Toast, useToast, Heading, Tabs, TabList, Tab, Divider, TabPanels, TabPanel } from "@chakra-ui/react";
import HeaderImage from '../../public/Header.svg';
import LogoImage from '../../public/Logo.svg';
import LogoutImage from '../../public/Logout.svg';
import DashboardImage from '../../public/Dashboard.svg';
import ProjectListingImage from '../../public/ProjectList.svg';
import CreateProjectImage from '../../public/CreateProject.svg';
import CreateProject from '../components/CreateProject';
import ProjectListing from '../components/ProjectListing';
import Dashboard from '../components/Dashboard';
import { countProject, getGraphData } from '../apiCalls/graphApiCall';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchProjects, } from '../apiCalls/projectApiCall';
import { getQuery, getSort } from '../sort/SortLogic';


function getPage(value) {
    value = Number(value);
    if (!value || value < 1) {
        value = 1;
    }
    return value;
}
export default function Home() {

    const isVertical = useBreakpointValue({ base: true, lg: false });
    const tabs = ["Dashboard", "Project Listing", "Create Project"];
    const [projects, setProjects] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [activeTab, setActiveTab] = useState(null);
    const [projectCount, setProjectCount] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const initPage = getPage(searchParams.get("page"));
    const initSort = getSort(searchParams.get("sortOrder"));
    const initQuery = getQuery(searchParams.get("query"));
    const [page, setPage] = useState(initPage);
    const [sortBy, setSortBy] = useState(initSort);
    const [query, setQuery] = useState(initQuery || "");
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const toast = useToast();
    


    const fetchProjectListingData = useCallback(async () => {
        try {
            const response = await fetchProjects({ page, query, sortBy });
            setProjects(response.projects);
            setTotalPages(response.totalCount);
        } catch (error) {

        }
    }, [page, query, sortBy]);



    const fetchDashboardData = useCallback(async () => {
        try {
            const [countResponse, graphResponse] = await Promise.all([
                countProject(),
                getGraphData()

            ]);
            setProjectCount(countResponse);
            setGraphData(graphResponse);
        } catch (error) {
            throw error;
        }

    }, [fetchProjectListingData]);



    const updateProjectStatusInDashboard = useCallback(async () => {
        await fetchDashboardData();
    }, [fetchDashboardData]);




    const addNewProject = useCallback(async (newProject) => {
        await fetchProjectListingData();
        await fetchDashboardData();
    }, [fetchProjectListingData, fetchDashboardData]);






    const handleTab = (tab) => {
        if (tab === activeTab) {
            return;
        }

        setActiveTab(tab);

    };

    const handleTabChange = (index) => {
        setCurrentTab(index);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        toast({
            title: "Logout  Successful",
            status: "success",
            duration: 3000,
            position: "top"
        });
        navigate('/')
    }


    return (
        <>
            
                <Box w={"100%"}>
                    <Box
                        w={"100%"}
                        h={isVertical ? "8vh" : "30vh"}
                        backgroundImage={`url(${HeaderImage})`}
                        backgroundPosition={isVertical ? "0 0" : "60px 0"}
                        backgroundSize={isVertical ? "cover" : "contain"}
                        bgRepeat={"no-repeat"}
                    >
                    </Box>

                    {/* LOGO and the tab name  */}

                    {!isVertical && (
                        <Flex
                            mt={-180}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            w={"50%"}
                            ml={20}
                        >
                            <Heading
                                fontSize={"30px"}
                                fontWeight={400}
                                pl={10}
                                color={"white"}
                            >

                                {/* have to set the heading here */}
                                {tabs[currentTab]}
                            </Heading>
                            <Image boxSize={"60px"} src={LogoImage}></Image>

                        </Flex>
                    )}

                    {isVertical && (
                        <Flex
                            mt={-45}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            gap={10}
                            ml={isVertical ? 10 : 20}

                        >
                            <Heading
                                fontSize={"25px"}
                                fontWeight={400}
                                // pl={10}
                                color={"white"}
                            >
                                {tabs[currentTab]}
                            </Heading>
                            <Image cursor={"pointer"} onClick={handleLogout} mr={5} src={LogoutImage}></Image>
                        </Flex>
                    )}


                    {/* *********sidebar*************** */}


                    <Tabs
                        onChange={handleTabChange}
                        index={currentTab}
                        bg={"transparent"}
                        align="center"

                        pt={isVertical ? "40px" : ""}
                        orientation={!isVertical ? "vertical" : "horizontal"}
                    >
                        {!isVertical && (
                            <TabList
                                pr={2}
                                boxShadow="xl"
                                borderRadius={5}
                                mr={5}
                                mt={-200}
                            >
                                <Tab
                                    position={"sticky"}
                                    onClick={() => handleTab("tab1")}
                                    _selected={{
                                        borderLeft: "5px solid blue",

                                    }}
                                    mt={5}
                                >
                                    <Image boxSize={7} position={"sticky"} src={DashboardImage} />
                                </Tab>



                                <Tab
                                    position={"sticky"}
                                    onClick={() => handleTab("Tab2")}
                                    _selected={{
                                        borderLeft: "5px solid blue",
                                    }}
                                    mt={5}
                                >
                                    <Image boxSize={7} position={"sticky"} src={ProjectListingImage} />
                                </Tab>

                                <Divider position={"sticky"} p={3} w="70%" borderColor="black" />

                                <Tab
                                    position={"sticky"}
                                    _selected={{
                                        borderLeft: "5px solid blue",
                                    }}

                                >
                                    <Image boxSize={7} position={"sticky"} src={CreateProjectImage} />
                                </Tab>
                                <Tab></Tab>

                                <Button
                                    onClick={handleLogout}
                                    leftIcon={<Image src={LogoutImage} boxSize={5} />}
                                    variant="unstyled"
                                    justifyContent="center"
                                    alignItems="center"
                                    ml={3}
                                    position="absolute"
                                    pb={5}
                                    bottom="0"

                                >

                                </Button>

                            </TabList>

                        )}


                        {/* ***************** All  3 tabs ************* */}



                        <TabPanels m={!isVertical ? 5 : 0} minHeight={isVertical ? "calc(100vh - 150px)" : "auto"}>


                            <TabPanel
                                h={!isVertical ? "700px" : ""}
                                borderRadius={5}
                                boxShadow="xl"
                            // bg={"white"}
                            >
                                <Dashboard projectCount={projectCount} graphData={graphData}
                                    setProjectCount={setProjectCount} setGraphData={setGraphData}
                                    
                                />
                            </TabPanel>


                            <TabPanel
                                h={!isVertical ? "700px" : ""}
                                boxShadow="xl"
                                bg={"white"}
                                borderRadius={5}

                            >
                                <ProjectListing
                                    projects={projects}
                                    updateProjectStatusInDashboard={updateProjectStatusInDashboard}
                                />
                            </TabPanel>


                            <TabPanel
                                h={!isVertical ? "700px" : ""}
                                boxShadow="xl"
                                borderRadius={5}
                                bg={"white"}
                            >

                                <CreateProject addNewProject={addNewProject} />
                            </TabPanel>

                        </TabPanels>



                        {isVertical && (
                            <TabList
                                position={"sticky"}
                                bottom={0}
                                bgColor={"white"}
                                py={2}
                                boxShadow={
                                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                                }
                                w={"100%"}
                                borderTopRadius={10}
                                gap={8}
                            >
                                <Tab
                                    onClick={() => handleTab("tab1")}
                                    _selected={{
                                        borderBottom: "5px solid blue",
                                    }}
                                >
                                    <Image src={DashboardImage} />
                                </Tab>


                                <Tab
                                    onClick={() => handleTab("Tab2")}
                                    _selected={{
                                        borderBottom: "4px solid blue",
                                    }}
                                >
                                    <Image src={ProjectListingImage} />
                                </Tab>


                                <Tab
                                    _selected={{
                                        borderBottom: "5px solid blue",
                                    }}
                                >
                                    <Image src={CreateProjectImage} />
                                </Tab>
                            </TabList>
                        )}

                    </Tabs>

                </Box>
            

        </>
    )
}
