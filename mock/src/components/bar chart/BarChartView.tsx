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
    const [xAxis, setXAxis] = useState<string>('');
    const [yAxis, setYAxis] = useState<string>('');
    const [availableColumns, setAvailableColumns] = useState<{
        x: string[],
        y: string[]
    }>({ x: [], y: [] });

    useEffect(() => {
        if (data && data.length > 0) {
            const columns = Object.keys(data[0]);
            const xColumns = columns.filter(col => 
                data.every(row => typeof row[col] === 'string' || typeof row[col] === 'number')
            );
            const yColumns = columns.filter(col => 
                data.every(row => typeof row[col] === 'number')
            );
            setAvailableColumns({ x: xColumns, y: yColumns });
        }
    }, [data]);

    useEffect(() => {
        if (xAxis && yAxis) {
            processData();
        } else {
            setChartData(null);
            setError("Please select both X and Y axes");
        }
    }, [xAxis, yAxis, data]);

    const processData = () => {
        if (!data || data.length === 0) {
            setError("No data available");
            return;
        }

        const labels = data.map(item => item[xAxis]);
        const values = data.map(item => item[yAxis]);

        setChartData({
            labels,
            datasets: [{
                label: yAxis,
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }]
        });
        setError(null);
    };

    const handleAxisChange = (axis: 'x' | 'y', value: string) => {
        if (axis === 'x') {
            setXAxis(value);
        } else {
            setYAxis(value);
        }
    };

    return (
        <div className="bar-chart-container">
            <h2>{selectedDatasetName}</h2>
            <div className="axis-selection">
                <div className="axis-dropdown">
                    <label htmlFor="x-axis">X Axis: </label>
                    <select
                        id="x-axis"
                        value={xAxis}
                        onChange={(e) => handleAxisChange('x', e.target.value)}
                    >
                        <option value="">Select X Axis</option>
                        {availableColumns.x.map(col => (
                            <option key={col} value={col}>{col}</option>
                        ))}
                    </select>
                </div>
                <div className="axis-dropdown">
                    <label htmlFor="y-axis">Y Axis: </label>
                    <select
                        id="y-axis"
                        value={yAxis}
                        onChange={(e) => handleAxisChange('y', e.target.value)}
                    >
                        <option value="">Select Y Axis</option>
                        {availableColumns.y.map(col => (
                            <option key={col} value={col}>{col}</option>
                        ))}
                    </select>
                </div>
            </div>
            {error ? (
                <div className="error-message">{error}</div>
            ) : chartData && (
                <div className="chart-wrapper" style={{ height: '600px', width: '100%' }}>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
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
                                        text: xAxis,
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
                                        text: yAxis,
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