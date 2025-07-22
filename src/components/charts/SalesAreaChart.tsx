'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { stackedAreaChart } from '@/data/dashboard-charts';

export default function SalesAreaChart() {
    return (
        <ResponsiveContainer width="100%" height={ 320 }>
            <AreaChart
                data={ stackedAreaChart }
                margin={ { top: 10, right: 30, left: 0, bottom: 0 } }
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" name="Sales" />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#22c55e" fill="#bbf7d0" name="Users" />
                <Area type="monotone" dataKey="orders" stackId="1" stroke="#f97316" fill="#fde68a" name="Orders" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
