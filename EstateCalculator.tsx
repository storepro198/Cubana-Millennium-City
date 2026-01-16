import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Currency } from '../types';
import { CURRENCY_RATES } from '../constants';

const PLOT_OPTIONS = [
  { size: 258, price: 37000000, label: 'Starter Plot' },
  { size: 315, price: 47000000, label: 'Standard Plot' },
  { size: 560, price: 80000000, label: 'Executive Plot' },
];

const PURCHASE_YEARS = [2026, 2027, 2028];

// Realistic Appreciation Model (Base 2026 = 1.0)
// The prices provided in PLOT_OPTIONS are the 2026 market prices.
// Growth is projected forward from this baseline.
const GROWTH_FACTORS: Record<number, number> = {
    2026: 1.00,
    2027: 1.15, // 15% Growth
    2028: 1.35, // 35% Growth (Cumulative)
    2029: 1.55, // 55% Growth
    2030: 1.80, // 80% Growth
    2031: 2.10, // 110% Growth
};

const EstateCalculator: React.FC = () => {
  const [selectedPlotIndex, setSelectedPlotIndex] = useState(2); // Default to Executive
  const [purchaseYear, setPurchaseYear] = useState(2026);
  const [currency, setCurrency] = useState<Currency>(Currency.NGN);

  const selectedPlot = PLOT_OPTIONS[selectedPlotIndex];
  
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(val);
  };

  // Helper to calculate price for a specific year based on 2026 baseline
  const getPriceForYear = (basePrice2026: number, year: number) => {
      const factor = GROWTH_FACTORS[year] || (1 + (year - 2026) * 0.15);
      return basePrice2026 * factor;
  };

  // Generate projection data based on purchase year
  const { chartData, entryPrice, year1Value, totalAppreciation, endYear } = useMemo(() => {
    const basePrice2026 = selectedPlot.price;
    
    // Generate data points starting from purchase year up to 2031
    const maxYear = 2031;
    const years = [];
    for (let y = purchaseYear; y <= maxYear; y++) {
        years.push(y);
    }
    
    const data = years.map(year => {
        const val = getPriceForYear(basePrice2026, year);
        return {
            year: year.toString(),
            value: val,
            displayValue: val * CURRENCY_RATES[currency],
            isEntry: year === purchaseYear
        };
    });

    const entryVal = data[0].displayValue;
    const finalVal = data[data.length - 1].displayValue;
    const nextYearVal = data[Math.min(1, data.length - 1)].displayValue;
    const appreciation = ((finalVal - entryVal) / entryVal) * 100;

    return {
        chartData: data,
        entryPrice: entryVal,
        year1Value: nextYearVal,
        totalAppreciation: appreciation,
        endYear: maxYear
    };
  }, [selectedPlot, currency, purchaseYear]);

  return (
    <section id="invest" className="scroll-mt-28 py-24 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-gold tracking-[0.2em] text-sm uppercase font-semibold mb-3">ESTATES INTELLIGENCE</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">Wealth Projector</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-obsidian-light/50 p-8 rounded-2xl border border-white/5">
            {/* Controls */}
            <div className="lg:col-span-4 space-y-8">
                <div className="flex flex-col gap-4">
                    {/* Currency Selector */}
                    <div>
                        <label className="text-gray-400 text-xs uppercase tracking-widest block mb-2">Currency</label>
                        <div className="flex bg-black p-1 rounded-lg border border-white/10 w-fit">
                            {Object.values(Currency).map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCurrency(c)}
                                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                                        currency === c ? 'bg-gold text-obsidian' : 'text-gray-500 hover:text-white'
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Purchase Year Selector */}
                    <div>
                        <label className="text-gray-400 text-xs uppercase tracking-widest block mb-2">Projected Purchase Year</label>
                        <div className="flex gap-2">
                            {PURCHASE_YEARS.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setPurchaseYear(year)}
                                    className={`flex-1 py-2 rounded border transition-all text-sm ${
                                        purchaseYear === year 
                                        ? 'bg-white/10 border-gold text-gold' 
                                        : 'bg-black border-white/10 text-gray-400 hover:border-white/30'
                                    }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-gray-400 text-xs uppercase tracking-widest block mb-4">
                        Select Plot Type (2026 Prices)
                    </label>
                    <div className="space-y-3">
                        {PLOT_OPTIONS.map((plot, idx) => {
                            // Calculate price based on selected year
                            const priceAtYear = getPriceForYear(plot.price, purchaseYear);
                            const displayPrice = priceAtYear * CURRENCY_RATES[currency];

                            return (
                                <div 
                                    key={idx}
                                    onClick={() => setSelectedPlotIndex(idx)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex justify-between items-center group ${
                                        selectedPlotIndex === idx 
                                        ? 'bg-gold/10 border-gold' 
                                        : 'bg-black border-white/10 hover:border-gold/50'
                                    }`}
                                >
                                    <div>
                                        <p className={`font-serif text-lg ${selectedPlotIndex === idx ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                            {plot.size}sqm
                                        </p>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">{plot.label}</p>
                                    </div>
                                    <div className={`text-right ${selectedPlotIndex === idx ? 'text-gold' : 'text-gray-500'}`}>
                                        <p className="font-bold">{formatCurrency(displayPrice)}</p>
                                        <p className="text-[10px] text-gray-500">Price in {purchaseYear}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-gray-900 to-black border border-gold/20 rounded-xl space-y-4">
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Entry Price ({purchaseYear})</p>
                        <p className="text-2xl font-serif text-white">{formatCurrency(entryPrice)}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-gold text-xs uppercase tracking-widest mb-1">Projected Value ({Math.min(purchaseYear + 1, endYear)})</p>
                        <p className="text-3xl lg:text-4xl font-serif text-gold">{formatCurrency(year1Value)}</p>
                        <p className="text-green-400 text-xs mt-2 flex items-center gap-2">
                             Potential Growth by {endYear}: +{totalAppreciation.toFixed(0)}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="lg:col-span-8 h-[500px] bg-black/40 rounded-xl p-6 border border-white/5 relative">
                <h4 className="absolute top-6 left-6 text-white font-serif text-lg z-10">Asset Appreciation Timeline</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 50, right: 20, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis 
                            dataKey="year" 
                            stroke="#666" 
                            tick={{fill: '#666', fontSize: 12}} 
                            axisLine={false} 
                            tickLine={false} 
                            dy={10}
                        />
                        <YAxis 
                            stroke="#666" 
                            tick={{fill: '#666', fontSize: 12}} 
                            axisLine={false} 
                            tickLine={false} 
                            tickFormatter={(val) => currency === 'NGN' ? `${(val/1000000).toFixed(0)}M` : `${(val/1000).toFixed(0)}k`} 
                            dx={-10}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
                            itemStyle={{ color: '#D4AF37' }}
                            formatter={(val: number) => [formatCurrency(val), "Market Value"]}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="displayValue" 
                            stroke="#D4AF37" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorValue)" 
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 flex justify-between items-start text-xs text-gray-500 italic">
                    <p>*Projections based on conservative annual yield estimates from 2026 baseline.</p>
                    <p className="text-right max-w-xs">
                         2026 prices are fixed. Future years reflect projected market appreciation.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default EstateCalculator;