'use client';

import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { pieChartData1, pieChartData2 } from '@/data/dashboard-charts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#c084fc', '#FDBA74', '#2DD4BF', '#cbd5e1'];

export default function DualPieChart() {
    return (
        <ResponsiveContainer width="100%" height={ 320 }>
            <PieChart>
                <Pie data={ pieChartData1 } dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={ 70 } fill="#8884d8">
                    { pieChartData1.map((_, i) => (
                        <Cell key={ i } fill={ COLORS[i % COLORS.length] } />
                    )) }
                </Pie>
                <Pie data={ pieChartData2 } dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={ 80 } outerRadius={ 110 } fill="#82ca9d" label>
                    { pieChartData2.map((_, i) => (
                        <Cell key={ i } fill={ COLORS[(i + 3) % COLORS.length] } />
                    )) }
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={ 36 } />
            </PieChart>
        </ResponsiveContainer>
    );
}
