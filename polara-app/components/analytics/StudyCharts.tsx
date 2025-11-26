'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts'

type StudyChartsProps = {
    dailyStats: { name: string; hours: number }[]
    courseStats: { name: string; value: number; color: string }[]
}

export function StudyCharts({ dailyStats, courseStats }: StudyChartsProps) {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Weekly Activity Chart */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                    Weekly Activity (Hours)
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <XAxis
                                dataKey="name"
                                stroke="#6b7280"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#6b7280"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}h`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                                cursor={{ fill: '#f3f4f6', opacity: 0.1 }}
                            />
                            <Bar
                                dataKey="hours"
                                fill="#4f46e5"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Subject Distribution Chart */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                    Subject Distribution
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={courseStats}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {courseStats.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => `${Math.round(value)} mins`}
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
