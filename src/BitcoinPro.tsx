import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Zap, Shield, ArrowUpRight, ArrowDownRight, Globe, RefreshCcw, Github 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Interfaces para TypeScript
interface DatosPrecio {
  time: string;
  price: number;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function BitcoinPro() {
  const [precioActual, setPrecioActual] = useState<number>(0);
  const [cambio24h, setCambio24h] = useState<number>(0);
  const [datosGrafico, setDatosGrafico] = useState<DatosPrecio[]>([]);
  const [cargando, setCargando] = useState(true);

  const obtenerDatos = useCallback(async () => {
    try {
      const resPrecio = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true'
      );
      setPrecioActual(resPrecio.data.bitcoin.usd);
      setCambio24h(resPrecio.data.bitcoin.usd_24h_change);

      const resGrafico = await axios.get(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1'
      );
      
      const datosFormateados = resGrafico.data.prices.map((p: [number, number]) => ({
        time: new Date(p[0]).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        price: p[1]
      })).slice(-20);

      setDatosGrafico(datosFormateados);
      setCargando(false);
    } catch (error) {
      console.error("Error cargando datos de la API:", error);
    }
  }, []);

  useEffect(() => {
    const init = async () => { await obtenerDatos(); };
    init();
    const intervalo = setInterval(obtenerDatos, 60000);
    return () => clearInterval(intervalo);
  }, [obtenerDatos]);

  if (cargando) return (
    <div className="h-screen flex items-center justify-center bg-black text-bitcoin animate-pulse font-mono text-lg md:text-xl tracking-widest p-4 text-center">
      INICIALIZANDO TERMINAL...
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-slate-300 p-4 sm:p-6 md:p-8 font-sans">
      {/* Barra de Navegación Responsiva */}
      <nav className="max-w-7xl mx-auto flex flex-row justify-between items-center mb-6 md:mb-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-bitcoin rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            <span className="text-black font-black text-xl sm:text-2xl">₿</span>
          </div>
          <h1 className="text-white font-bold text-xl sm:text-2xl tracking-tighter uppercase">
            Bitcoin<span className="text-bitcoin">Pro</span>
          </h1>
        </div>

        {/* Grupo de botones (GitHub + Refresh) */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a 
            href="https://github.com/TU_USUARIO" // CAMBIA ESTO POR TU LINK
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full text-slate-500 hover:text-white hover:bg-white/5 transition-all"
            title="Ver en GitHub"
          >
            <Github size={22} />
          </a>
          <button 
            onClick={() => obtenerDatos()} 
            className="hover:rotate-180 transition-transform duration-500 cursor-pointer p-2 rounded-full hover:bg-white/5 active:scale-95"
            title="Actualizar datos"
          >
            <RefreshCcw size={20} className="text-slate-500 hover:text-bitcoin" />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Panel del Gráfico */}
        <div className="lg:col-span-3 bg-card-bg border border-white/5 rounded-3xl md:rounded-4xl p-5 md:p-8 shadow-2xl relative overflow-hidden">
          <p className="text-bitcoin font-mono text-[10px] sm:text-xs tracking-widest mb-2 uppercase font-bold">
            Precio de Mercado (USD)
          </p>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter break-words">
            ${precioActual.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h2>
          
          <div className={`flex items-center gap-2 mt-4 font-bold text-sm sm:text-base ${cambio24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {cambio24h >= 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
            {cambio24h.toFixed(2)}% 
            <span className="text-slate-500 font-normal text-xs sm:text-sm ml-1 sm:ml-2 uppercase">24h</span>
          </div>

          <div className="h-[250px] sm:h-[300px] md:h-[350px] mt-6 md:mt-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={datosGrafico}>
                <defs>
                  <linearGradient id="colorPrecio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  labelStyle={{ color: '#94a3b8' }}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value: number | undefined) => {
                    return value ? [`$${value.toLocaleString()}`, 'Precio'] : ['$0', 'Precio'];
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#f97316" 
                  strokeWidth={3} 
                  fill="url(#colorPrecio)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar de Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <MetricCard icon={<Zap size={20} className="text-yellow-400"/>} label="Poder de Minado" value="582 EH/s" />
          <MetricCard icon={<Shield size={20} className="text-blue-400"/>} label="Seguridad" value="Nivel Alto" />
          <MetricCard icon={<Globe size={20} className="text-purple-400"/>} label="Nodos Activos" value="18,245" />
          
          <div className="sm:col-span-2 lg:col-span-1 p-5 md:p-6 bg-bitcoin/5 border border-bitcoin/10 rounded-2xl md:rounded-3xl flex flex-col justify-center">
            <p className="text-[10px] text-bitcoin font-bold tracking-widest uppercase mb-1">Estado del Sistema</p>
            <div className="flex items-center gap-2 text-green-400 font-mono text-[10px] sm:text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              RED SINCRONIZADA
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <div className="bg-card-bg border border-white/5 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:border-bitcoin/30 transition-all duration-300 group cursor-default shadow-lg">
      <div className="mb-3 md:mb-4 p-2 bg-black/40 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <p className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">{label}</p>
      <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 font-mono tracking-tight">{value}</h3>
    </div>
  );
}