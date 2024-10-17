import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { datasets } from '../../mocks/mockedData';

interface BarChartViewProps {
    data: any[];
    selectedDatasetName: string;
}

export function BarChartView({ data, selectedDatasetName }: BarChartViewProps) {
    const [chartData, setChartData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [axesFlipped, setAxesFlipped] = useState<boolean>(false);
    const [canFlipAxes, setCanFlipAxes] = useState<boolean>(false);
    const [xAxisLabel, setXAxisLabel] = useState<string>('');
    const [yAxisLabel, setYAxisLabel] = useState<string>('');

    useEffect(() => {
        processData();
    }, [data, axesFlipped]);

    const processData = () => {
        if (!data || data.length === 0) {
            setError("No data available");
            return;
        }

        const keys = Object.keys(data[0]);
        const numericKeys = keys.filter(key => data.every(item => typeof item[key] === 'number'));
        const nonNumericKeys = keys.filter(key => !numericKeys.includes(key));

        if (numericKeys.length === 0) {
            setError("No numeric columns found for Y-axis");
            setCanFlipAxes(false);
            return;
        }

        let xKey = axesFlipped ? numericKeys[0] : (nonNumericKeys[0] || numericKeys[0]);
        let yKey = axesFlipped ? (nonNumericKeys[0] || numericKeys[1] || numericKeys[0]) : numericKeys[0];


        if (axesFlipped && !numericKeys.includes(yKey)) {
            alert("Cannot flip axes: Y-axis must contain numeric values");
            setAxesFlipped(false);
            return;
        }

        setCanFlipAxes(numericKeys.length > 1 || (numericKeys.length === 1 && nonNumericKeys.length > 0));

        setXAxisLabel(xKey);
        setYAxisLabel(yKey);

        const labels = data.map(item => item[xKey]);
        const values = data.map(item => item[yKey]);

        setChartData({
            labels,
            datasets: [{
                label: yKey,
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }]
        });
        setError(null);
    };

    const handleFlipAxes = () => {
        const newFlippedState = !axesFlipped;
        setAxesFlipped(newFlippedState);
    };

    return (
        <div className="bar-chart-container">
            <h2>{selectedDatasetName}</h2>
            {canFlipAxes && (
                <div className="flip-axes-container">
                    <button 
                        onClick={handleFlipAxes} 
                        className="flip-axes-button"
                        title="Switch between vertical and horizontal bar orientation"
                    >
                        Flip Axes
                    </button>
                    <span className="flip-axes-explanation">
                        (Switches between vertical and horizontal bar orientation)
                    </span>
                </div>
            )}
            {error ? (
                <div className="error-message">{error}</div>
            ) : chartData && (
                <div className="chart-wrapper" style={{ overflowX: 'auto', width: '100%'}}>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            indexAxis: axesFlipped ? 'y' : 'x',
                            plugins: {
                                legend: {
                                    position: 'top' as const,
                                },
                                title: {
                                    display: true,
                                    text: `Bar Chart for ${selectedDatasetName}`,
                                },
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: xAxisLabel,
                                    },
                                    ticks: {
                                        autoSkip: false,
                                        maxRotation: 90,
                                        minRotation: 90
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: yAxisLabel,
                                    },
                                }
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}