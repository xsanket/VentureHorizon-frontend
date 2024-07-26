import React, { useEffect, useState } from 'react';
import { Box, Heading, Stack, useBreakpointValue } from "@chakra-ui/react";
import DashboardCard from './DashboardCard.jsx';
import Graph from './Graph.jsx';
import { countProject, getGraphData } from '../apiCalls/graphApiCall.js';
import HashLoader from "react-spinners/HashLoader";

export default function Dashboard({ projectCount, setProjectCount, graphData, setGraphData }) {
  const isVertical = useBreakpointValue({ base: true, lg: false });
  const [loading, setLoading] = useState(false);


  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [countResponse, graphResponse] = await Promise.all([
        countProject(),
        getGraphData()
      ]);
      setProjectCount(countResponse);
      setGraphData(graphResponse);
    } catch (error) {
      throw error;
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);



  return (
    <>
      {loading ? (
        <div className="loader-container">
          <HashLoader color="#36d7b7" loading={loading} />
        </div>
      ) : (


        <Stack
          w={"100%"}

        >
          <DashboardCard data={projectCount} />
          <Box textAlign={"left"}>
            <Heading
              fontSize={isVertical ? "15" : "20px"}
              fontWeight={"500"}
              mb={4}
            >
              Department wise : Total Vs closed
            </Heading>
          </Box>


          {/* graph box */}
          <Box
            w={!isVertical ? "50%" : "full"}
            p={!isVertical ? 10 : 1}

            rounded="md"
            boxShadow="2xl"
          >
            {<Graph data={graphData} />}
          </Box>

        </Stack>
      )
      }

    </>
  )
};
