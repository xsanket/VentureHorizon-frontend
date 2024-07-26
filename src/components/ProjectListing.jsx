import React, { useState, useEffect } from 'react';
import { Box, useBreakpointValue, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Select, useDisclosure, List, ListItem, Icon, Flex, InputGroup, InputLeftElement, Input, Text, DrawerCloseButton, Button } from "@chakra-ui/react";
import { RepeatIcon, SearchIcon } from "@chakra-ui/icons";
import ProjectTable from './ProjectTable.jsx';
import { useSearchParams } from "react-router-dom";
import CardComponent from './CardComponent.jsx';
import { BsFilterLeft } from "react-icons/bs";
import { getSort, getQuery } from '../sort/SortLogic.js';
import {  updateProjectStatus } from '../apiCalls/projectApiCall.js';
import Pagination from './Pagination.jsx';

function getPage(value) {
  value = Number(value);
  if (!value || value < 1) {
    value = 1;
  }
  return value;
}

export default function ProjectListing({ projects, updateProjectStatusInDashboard }) {

  const isVertical = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initPage = getPage(searchParams.get("page"));
  const initSort = getSort(searchParams.get("sortOrder"));
  const [totalPages, setTotalPages] = useState(0);
  const AllPage = Math.ceil(totalPages / 10);
  const initQuery = getQuery(searchParams.get("query"));
  const [page, setPage] = useState(initPage);
  const [sortBy, setSortBy] = useState(initSort);
  const [query, setQuery] = useState(initQuery || "");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getProjectsData(page, sortBy, query);
  }, [page, query, sortBy]);


  const getProjectsData = async (page, sortBy, query) => {
    try {
      const response = await fetch(`https://venture-horizon-backend.vercel.app/api/fetchProjects?page=${page}&sort=${sortBy}&filter=${query}`);
      

      if (response.ok) {
       
        const data = await response.json();
        setData(data.projects);
        setFilteredData(data.projects);
        setTotalPages(data.totalCount);
      }
    } catch (error) {
      toast({
        title: "Failed to load Project data",
        status: "error",
        duration: 3000,
        position: "top"
    });
    }
  };






  const handleSelectChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOptionSelect = (option) => {
    setSortBy(option);
    onClose();
  };



  useEffect(() => {
    setFilteredData(projects);
  }, [projects]);




  // for updating the status
  const handleUpdate = async (value, id) => {
    try {
      const response = await updateProjectStatus({ value, id });
      if (response.success) {
        updateProjectStatusInDashboard(response);
        const updatedProject = response.data;
        setFilteredData(prevData =>
          prevData.map(item => item._id === id ? updatedProject : item)
        );
      }
      else {
        alert("Error in updating status")
      }

    } catch (error) {
      toast({
        title: "Failed to update Project status",
        status: "error",
        duration: 3000,
        position: "top"
    });
    }
  };




  const handleSearchIcon = () => {
   
    const filtered = data.filter(project =>
      project.ProjectName.toLowerCase().includes(query.toLowerCase()) ||
      project.Reason.toLowerCase().includes(query.toLowerCase()) ||
      project.Type.toLowerCase().includes(query.toLowerCase()) ||
      project.Division.toLowerCase().includes(query.toLowerCase()) ||
      project.Category.toLowerCase().includes(query.toLowerCase()) ||
      project.Priority.toLowerCase().includes(query.toLowerCase()) ||
      project.Department.toLowerCase().includes(query.toLowerCase()) ||
      project.Location.toLowerCase().includes(query.toLowerCase()) ||
      project.Status.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setQuery('');
    setFilteredData(data);
  }


  useEffect(() => {
    if (query === "") {
      setSearchParams({ page, sortBy });
    } else {
      setSearchParams({ page, query, sortBy });
    }
  }, [setSearchParams, page, query, sortBy]);


  return (
    <>
      <Flex
        pb={5}
        pt={3}
        pl={3}
        px={isVertical ? 2 : 8}
        justifyContent={"space-between"}
      >
        <Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              variant="flushed"
            />
            <Box display="flex" alignItems="center" onClick={handleSearchIcon}>
              <SearchIcon
                color="gray.500"
                cursor="pointer"
                alignSelf="center"
              />
            </Box>


            <Box display="flex" alignItems="center">
              <RepeatIcon
                color="gray.500"
                ml={2}
                cursor="pointer"
                onClick={handleReset}
                size="sm"

                variant="outline"
              >

              </RepeatIcon>
            </Box>
          </InputGroup>
        </Box>

        <Box>
          {!isVertical ? (
            <Flex
              flexDir={"row"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              gap={3}
            >
              <Text color={"gray.400"}> Sort By </Text>
              <Box>
                <Select
                  placeholder="Sort By"
                  value={sortBy}
                  onChange={handleSelectChange}
                  variant="unstyled"
                >
                  <option value="ProjectName">ProjectName</option>
                  <option value="Reason">Reason</option>
                  <option value="Type">Type</option>
                  <option value="Division">Division</option>
                  <option value="Category">Category</option>
                  <option value="Priority">Priority</option>
                  <option value="Department">Department</option>
                  <option value="Location">Location</option>
                  <option value="Status">Status</option>
                  <option value="StartDate">StartDate</option>
                  <option value="EndDate">EndDate</option>
                </Select>
              </Box>
            </Flex>
          ) : (
            <Box>
              <Box onClick={onOpen} cursor="pointer">
                <Icon boxSize={8} as={BsFilterLeft} />
              </Box>



              <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Sort Projects By</DrawerHeader>
                  <DrawerBody>
                    <List spacing={5}>
                      <ListItem onClick={() => handleOptionSelect("ProjectName")}>Project Name</ListItem>
                      <ListItem onClick={() => handleOptionSelect("Priority")}>Priority</ListItem>
                      <ListItem onClick={() => handleOptionSelect("Status")}>Status</ListItem>
                      <ListItem onClick={() => handleOptionSelect("StartDate")}>StartDate</ListItem>
                      <ListItem onClick={() => handleOptionSelect("EndDate")}>EndDate</ListItem>
                    </List>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>


            </Box>
          )}
        </Box>
      </Flex>

      {isVertical ? (
        <Box w={"100%"}>
          {filteredData.length >= 1 &&
            filteredData?.map((item) => (
              <CardComponent
                key={item._id}
                ProjectName={item.ProjectName}
                Category={item.Category}
                Division={item.Division}
                Location={item.Location}
                StartDate={item.StartDate}
                EndDate={item.EndDate}
                Priority={item.Priority}
                Status={item.Status}
                Type={item.Type}
                Reason={item.Reason}
                Department={item.Department}
                handleUpdate={handleUpdate}
                id={item._id}
              />
            ))}
        </Box>
      ) : (
        <ProjectTable handleUpdate={handleUpdate} data={filteredData} />
      )}

      {AllPage === 1 ? (
        ""
      ) : (
        <Box mb={2} p={2} borderRadius={5}>
          <Pagination
            currentPage={page}
            totalPages={AllPage}
            onPageChange={(page) => setPage(page)}
          />
        </Box>
      )}
    </>
  );
}
