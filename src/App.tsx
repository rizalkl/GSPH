/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Clock, 
  Activity, 
  Coffee, 
  Calculator, 
  RefreshCw,
  Timer,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  // Simple Inputs
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('16:30');
  const [totalA, setTotalA] = useState<number | ''>('');
  const [downtimeC, setDowntimeC] = useState<number | ''>('');

  // Calculations
  const totalMinutesB = useMemo(() => {
    if (!startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    let diff = (endH * 60 + endM) - (startH * 60 + startM);
    if (diff < 0) diff += 24 * 60; // Handle overnight
    return diff;
  }, [startTime, endTime]);

  const netTime = Math.max(0, totalMinutesB - (Number(downtimeC) || 0));
  
  const gsph = useMemo(() => {
    if (netTime <= 0 || !totalA) return 0;
    return (Number(totalA) / netTime) * 60;
  }, [totalA, netTime]);

  const reset = () => {
    setTotalA('');
    setDowntimeC('');
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans p-4 flex items-center justify-center">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-emerald-600 rounded-[28px] shadow-xl shadow-emerald-200 mb-4">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">GsPH Calculator</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">by Kushal Rizal</p>
        </div>

        <div className="bg-white rounded-[48px] shadow-2xl shadow-slate-300/50 border border-white p-6 md:p-10 space-y-10">
          
          {/* Step 1: Time (B) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-200">B</div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Shift Time</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[32px] p-6 border-4 border-slate-100 shadow-sm focus-within:border-blue-500 transition-all">
                <label className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Start Time
                </label>
                <input 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-transparent text-3xl font-black outline-none text-slate-800 cursor-pointer"
                />
              </div>
              <div className="bg-white rounded-[32px] p-6 border-4 border-slate-100 shadow-sm focus-within:border-blue-500 transition-all">
                <label className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> End Time
                </label>
                <input 
                  type="time" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-transparent text-3xl font-black outline-none text-slate-800 cursor-pointer"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 py-4 px-6 bg-blue-600 rounded-2xl shadow-md shadow-blue-100">
              <Timer className="w-5 h-5 text-white" />
              <span className="text-sm font-black text-white uppercase tracking-widest">Total Time: {totalMinutesB} Minutes</span>
            </div>
          </div>

          {/* Step 2: Strokes (A) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-emerald-200">A</div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Total Strokes</h2>
            </div>
            <div className="bg-white rounded-[32px] p-6 border-4 border-slate-100 shadow-sm focus-within:border-emerald-500 transition-all">
              <label className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Enter Number
              </label>
              <input 
                type="number" 
                inputMode="numeric"
                placeholder="0"
                value={totalA}
                onChange={(e) => setTotalA(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-transparent text-6xl font-black text-emerald-700 placeholder:text-emerald-100 outline-none"
              />
            </div>
          </div>

          {/* Step 3: Break (C) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-200">C</div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Break Time</h2>
            </div>
            <div className="bg-white rounded-[32px] p-6 border-4 border-slate-100 shadow-sm focus-within:border-orange-500 transition-all relative">
              <label className="text-xs font-black text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Coffee className="w-4 h-4" /> Minutes Off
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  inputMode="numeric"
                  placeholder="0"
                  value={downtimeC}
                  onChange={(e) => setDowntimeC(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-transparent text-6xl font-black text-orange-700 placeholder:text-orange-100 outline-none"
                />
                <span className="text-orange-300 font-black text-2xl">MIN</span>
              </div>
            </div>
          </div>

          {/* Final Result */}
          <motion.div 
            animate={{ 
              scale: gsph > 0 ? [1, 1.05, 1] : 1,
              backgroundColor: gsph > 0 ? '#0F172A' : '#F8FAFC'
            }}
            className="p-12 rounded-[48px] text-center shadow-2xl border-4 border-white transition-all"
          >
            <div className={`text-xs font-black uppercase tracking-[0.5em] mb-6 ${gsph > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
              Calculated GsPH
            </div>
            <div className={`text-9xl font-black tracking-tighter leading-none ${gsph > 0 ? 'text-white' : 'text-slate-200'}`}>
              {gsph > 0 ? Math.round(gsph).toLocaleString() : '0'}
            </div>
          </motion.div>

          {/* Reset */}
          <button 
            onClick={reset}
            className="w-full py-2 flex items-center justify-center gap-2 text-slate-300 hover:text-red-400 font-black uppercase tracking-[0.2em] text-[9px] transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Clear Data
          </button>
        </div>

        {/* Visual Formula Legend */}
        <div className="mt-8 flex items-center justify-center gap-4 opacity-20 grayscale">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <div className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center">A</div>
            <span>Strokes</span>
          </div>
          <ChevronRight className="w-3 h-3" />
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <div className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center">B</div>
            <span>Time</span>
          </div>
          <ChevronRight className="w-3 h-3" />
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <div className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center">C</div>
            <span>Break</span>
          </div>
        </div>
      </div>
    </div>
  );
}
