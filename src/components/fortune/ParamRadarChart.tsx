'use client';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';

interface ParamRadarChartProps {
    data: {
        fortune: number;
        qi: number;
        aura: number;
        intuition: number;
        karma: number;
    };
}

export default function ParamRadarChart({ data }: ParamRadarChartProps) {
    const chartData = [
        { subject: '運勢', A: data.fortune, fullMark: 100 },
        { subject: '気', A: data.qi, fullMark: 100 },
        { subject: '直感', A: data.intuition, fullMark: 100 },
        { subject: 'カルマ', A: data.karma, fullMark: 100 },
        { subject: 'オーラ', A: data.aura, fullMark: 100 },
    ];

    return (
        <div className="w-full h-[300px] sm:h-[350px] relative">
            {/* Background decoration for the chart */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent rounded-full blur-xl pointer-events-none"></div>

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="rgba(216, 180, 254, 0.3)" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#e9d5ff', fontSize: 13, fontWeight: 'bold' }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Tsukuyomi Luna"
                        dataKey="A"
                        stroke="#fbbf24" /* Amber-400 */
                        strokeWidth={3}
                        fill="#fbbf24"
                        fillOpacity={0.5}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
