import { FortuneResult } from '@/utils/fortune';

interface BaZiTableProps {
    fourPillars: FortuneResult['fourPillars'];
}

export default function BaZiTable({ fourPillars }: BaZiTableProps) {
    return (
        <div className="w-full max-w-3xl mx-auto bg-slate-900 border border-purple-800/50 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-purple-950/40 p-4 text-center border-b border-purple-800/30">
                <h3 className="text-xl font-serif text-purple-200 tracking-widest">四柱推命 命式表</h3>
            </div>
            <div className="p-4 md:p-6 overflow-x-auto">
                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr>
                            <th className="p-3 text-gray-500 font-normal text-sm w-20"></th>
                            <th className="p-3 text-purple-300 font-serif text-lg">年柱<div className="text-xs text-purple-500/70 mt-1">祖先・幼少期</div></th>
                            <th className="p-3 text-purple-300 font-serif text-lg">月柱<div className="text-xs text-purple-500/70 mt-1">社会・青年期</div></th>
                            <th className="p-3 text-purple-300 font-serif text-lg">日柱<div className="text-xs text-purple-500/70 mt-1">自分・中年期</div></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-200">
                        <tr className="border-t border-purple-800/30">
                            <td className="p-4 text-gray-400 font-medium">天干</td>
                            <td className="p-4">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full font-serif text-xl bg-gray-800 border border-gray-700" style={{ color: fourPillars.year.color }}>
                                    {fourPillars.year.heavenlyStem}
                                </span>
                                <div className="text-xs mt-1 text-gray-500">{fourPillars.year.element}</div>
                            </td>
                            <td className="p-4 relative">
                                {/* Highlight the Month Stem as it represents social self */}
                                <span className="absolute inset-0 bg-purple-500/5 rounded opacity-50"></span>
                                <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full font-serif text-xl bg-gray-800 border border-gray-700 shadow-[0_0_10px_rgba(168,85,247,0.3)]" style={{ color: fourPillars.month.color }}>
                                    {fourPillars.month.heavenlyStem}
                                </span>
                                <div className="relative text-xs mt-1 text-gray-500">{fourPillars.month.element}</div>
                            </td>
                            <td className="p-4">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full font-serif text-xl bg-gray-800 border border-gray-700" style={{ color: fourPillars.day.color }}>
                                    {fourPillars.day.heavenlyStem}
                                </span>
                                <div className="text-xs mt-1 text-gray-500">{fourPillars.day.element}</div>
                            </td>
                        </tr>
                        <tr className="border-t border-purple-800/30">
                            <td className="p-4 text-gray-400 font-medium">地支</td>
                            <td className="p-4 text-lg font-serif">{fourPillars.year.earthlyBranch}</td>
                            <td className="p-4 text-lg font-serif">{fourPillars.month.earthlyBranch}</td>
                            <td className="p-4 text-lg font-serif">{fourPillars.day.earthlyBranch}</td>
                        </tr>
                        <tr className="border-t border-purple-800/30 bg-purple-900/10">
                            <td className="p-3 text-gray-400 font-medium text-sm">通変星</td>
                            <td className="p-3 text-white font-medium">{fourPillars.year.tenGods}</td>
                            <td className="p-3 text-yellow-300 font-bold text-lg relative">
                                {fourPillars.month.tenGods}
                                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                                </span>
                            </td>
                            <td className="p-3 text-gray-500 text-xs">-</td>
                        </tr>
                        <tr className="border-t border-purple-800/30">
                            <td className="p-4 text-gray-400 font-medium text-sm">十二運</td>
                            <td className="p-4 text-gray-300">{fourPillars.year.twelveGods}</td>
                            <td className="p-4 text-gray-300">{fourPillars.month.twelveGods}</td>
                            <td className="p-4 text-gray-300">{fourPillars.day.twelveGods}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
