import React from 'react'
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

export default function Graph({ data }) {
    const total = data?.total || [];
    const closed = data?.closed || [];

    // if no data 
    if (!data || !data.total || !data.closed) {
        return <div>No data available</div>;
    }

    var percentage = [];
    for (var i = 0; i < data?.total?.length; i++) {
        const value = (data.closed[i] / data.total[i]) * 100;
        percentage.push(Math.round(value) + "%");
    }

    const dataLable = ["STR", "FIN", "QLT", "MAN", "STO", "HR"];

    const graphData = {
        labels: percentage.map(
            (value, index) => `${value}` + "\n" + `${dataLable[index]}`
        ),
        datasets: [
            {
                label: "Total",
                data: data.total,
                backgroundColor: "blue",
                borderColor: "blue",
                borderWidth: 1,
                borderRadius: 5,
                barPercentage: 0.5,
                categoryPercentage: 0.4,
            },
            {
                label: "Closed",
                data: data.closed,
                backgroundColor: "green",
                borderColor: "green",
                borderWidth: 1,
                borderRadius: 5,
                barPercentage: 0.5,
                categoryPercentage: 0.4,
            },
        ]

    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        weight: "bold",
                    },
                    autoSkip: false,
                    maxRotation: 0,
                    padding: 0,
                },
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                },
            },
            datalabels: {
                display: true,
                color: "black",
                anchor: "end",
                offset: -17,
                align: "start",
            },
        },
    };

    return (
        <>
            <Bar
                width={"355px"}
                height={"360px"}
                data={graphData}
                options={options}
            >
            </Bar>

        </>
    )
}
