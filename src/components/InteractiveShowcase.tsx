import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Compass, Cpu, Database, Save, Play, RefreshCw, Terminal, Check, Info } from 'lucide-react';
import { VibeTheme, GlowLevel } from '../types';

interface InteractiveShowcaseProps {
  theme: VibeTheme;
  glow: GlowLevel;
}

export default function InteractiveShowcase({ theme, glow }: InteractiveShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'graph' | 'schema'>('editor');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStatus, setCompileStatus] = useState<'idle' | 'success' | 'stale'>('idle');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('origin-0');

  // Network topological clusters
  const [clusters, setClusters] = useState([
    { id: 'origin-0', name: 'Origin Gateway (Tokyo-A)', ip: '10.0.9.1', load: '14%', region: 'APAC' },
    { id: 'edge-1', name: 'Frankfurt Core Router', ip: '10.0.12.8', load: '45%', region: 'EU' },
    { id: 'edge-2', name: 'Silicon Valley Proxy Grid', ip: '10.0.15.22', load: '28%', region: 'US-WEST' },
    { id: 'edge-3', name: 'Sydney Relational Stream', ip: '10.0.33.104', load: '82%', region: 'OCEANIA' },
  ]);

  const handleCompile = () => {
    setIsCompiling(true);
    setCompileStatus('stale');
    setTimeout(() => {
      setIsCompiling(false);
      setCompileStatus('success');
    }, 1800);
  };

  const getThemeColor = () => {
    if (theme === 'cyan') return {
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bgBg: 'from-cyan-500/10 to-transparent',
      glow: 'shadow-[0_0_25px_rgba(34,211,238,0.25)]',
      primaryBtn: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
    };
    if (theme === 'purple') return {
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      bgBg: 'from-purple-500/10 to-transparent',
      glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
      primaryBtn: 'bg-purple-500 hover:bg-purple-400 text-white',
    };
    return {
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      bgBg: 'from-amber-500/10 to-transparent',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
      primaryBtn: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
    };
  };

  const colors = getThemeColor();

  return (
    <section id="system-ide" className="relative py-28 overflow-hidden bg-brand-deep">
      
      {/* Background Volumetric Glow and Matrix Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/5 filter blur-[120px] rounded-full volumetric-pulse pointer-events-none" />
        <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Title and Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] rounded-full border ${colors.border} ${colors.text} bg-[#030014] font-semibold uppercase mb-4`}>
              THE OPERATING INTERFACE
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
              Control the compile vector in high fidelity.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Explore the Voryn Studio IDE directly in this interactive workspace. 
              Modify variables, run network simulations, and inspect cloud topology.
            </p>
          </div>
        </div>

        {/* Studio IDE Layout Mockup (Premium SaaS Device representation) */}
        <div 
          data-cursor="card"
          data-spotlight
          className="w-full rounded-2xl bg-slate-950/90 border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[650px] relative transition-all duration-300 hover:border-white/15"
          style={{
            background: 'radial-gradient(350px circle at var(--mouse-px-x, 50%) var(--mouse-px-y, 50%), rgba(34, 211, 238, 0.04) 0%, rgba(3, 0, 20, 0.96) 80%)',
          }}
        >
          
          {/* Top Bar Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 bg-[#08051e]/80 p-4 gap-4">
            
            {/* Left Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('editor')}
                data-magnetic
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold uppercase transition-all duration-300 ${
                  activeTab === 'editor' 
                    ? 'bg-white/10 text-white border border-white/10' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Code2 className="h-4 w-4" />
                <span>Code Editor</span>
              </button>

              <button
                onClick={() => setActiveTab('graph')}
                data-magnetic
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold uppercase transition-all duration-300 ${
                  activeTab === 'graph' 
                    ? 'bg-white/10 text-white border border-white/10' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Compass className="h-4 w-4" />
                <span>Topology Mesh</span>
              </button>

              <button
                onClick={() => setActiveTab('schema')}
                data-magnetic
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold uppercase transition-all duration-300 ${
                  activeTab === 'schema' 
                    ? 'bg-white/10 text-white border border-white/10' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Database className="h-4 w-4" />
                <span>Static Schema</span>
              </button>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full ${isCompiling ? 'bg-yellow-400 animate-pulse' : 'bg-green-400 animate-ping'} mr-1`} />
              <span className="font-mono text-xs text-slate-400 uppercase">
                {isCompiling ? 'COMPILING SECTOR...' : 'REPLICATOR ACTIVE'}
              </span>
              
              <button
                onClick={handleCompile}
                disabled={isCompiling}
                data-magnetic
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isCompiling 
                    ? 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                    : colors.primaryBtn
                }`}
              >
                {isCompiling ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>COMPILE PROTOCOL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* IDE Main Workspace */}
          <div className="flex-1 w-full flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Folder Explorer File system */}
            <div className="w-full md:w-60 border-r border-white/5 bg-[#060419]/70 p-4 shrink-0 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 block mb-3">WORKSPACE SOURCES</span>
                <div className="space-y-1 font-mono text-xs text-slate-300">
                  <div data-magnetic className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-200 cursor-pointer flex items-center gap-2 transition-all">
                    <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>voryn_cluster.rs</span>
                  </div>
                  <div data-magnetic className="p-2.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-2 transition-all">
                    <Database className="h-3.5 w-3.5" />
                    <span>schema.db_manifest</span>
                  </div>
                  <div data-magnetic className="p-2.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-2 transition-all">
                    <Cpu className="h-3.5 w-3.5" />
                    <span>hardware_tune.conf</span>
                  </div>
                </div>
              </div>

              {/* Version Specs */}
              <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500 leading-relaxed">
                <div>WORKSPACE: build_local_core</div>
                <div>METRIC DEPTH: 4,096 nodes</div>
                <div>SYNC SECURITY: SECURE-98</div>
              </div>
            </div>

            {/* Content Display Window */}
            <div className="flex-1 overflow-auto bg-[#030014]/40 relative flex flex-col">
              
              {/* Tab render content */}
              <div className="flex-1 p-6 relative">
                
                {/* 1. CODE EDITOR TAB */}
                {activeTab === 'editor' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div className="font-mono text-[12.5px] leading-6 text-slate-300 custom-scrollbar overflow-x-auto space-y-1">
                      <div><span className="text-purple-400">use</span> voryn_core::&#123;<span className="text-cyan-400">Compiler</span>, <span className="text-amber-400">NodeMesh</span>&#125;;</div>
                      <div><span className="text-purple-400">use</span> voryn_crypto::&#123;<span className="text-green-400">QuantumVault</span>&#125;;</div>
                      <br />
                      <div><span className="text-pink-400">#[spatial_compiler_entry]</span></div>
                      <div><span className="text-purple-400">pub async fn</span> <span className="text-emerald-400">boot_voryn_protocol</span>() -&gt; <span className="text-cyan-400">Result</span>&lt;(), <span className="text-red-500">VorynError</span>&gt; &#123;</div>
                      <div className="pl-6"><span className="text-slate-500">// Initialize distributed network cluster layout</span></div>
                      <div className="pl-6"><span className="text-purple-400">let</span> <span className="text-amber-400">nodes</span> = <span className="text-cyan-400">NodeMesh</span>::<span className="text-blue-400">find_edge_peers</span>(Region::GLOBAL).<span className="text-blue-400">await</span>?;</div>
                      <div className="pl-6"><span className="text-purple-400">let</span> <span className="text-emerald-400">vault</span> = <span className="text-cyan-400">QuantumVault</span>::<span className="text-blue-400">instantiate</span>(<span className="text-emerald-400">"AES-GCM-256"</span>).<span className="text-blue-400">unwrap</span>();</div>
                      <br />
                      <div className="pl-6 text-slate-500">// Spin up 60 FPS real-time compiler engine state synchronization</div>
                      <div className="pl-6"><span className="text-purple-400">let</span> <span className="text-pink-400">compiler</span> = <span className="text-cyan-400">Compiler</span>::<span className="text-blue-400">new</span>(<span className="text-purple-400">Some</span>(nodes))</div>
                      <div className="pl-12">.<span className="text-blue-400">with_synchronizer</span>(vault)</div>
                      <div className="pl-12">.<span className="text-blue-400">set_latency_threshold</span>(<span className="text-purple-400">2.4</span>);</div>
                      <br />
                      <div className="pl-6"><span className="text-pink-400">compiler</span>.<span className="text-blue-400">synthesize</span>().<span className="text-blue-400">await</span>?;</div>
                      <div className="pl-6"><span className="text-purple-400">Ok</span>(())</div>
                      <div>&#125;</div>
                    </div>

                    {/* Compile Logs Console */}
                    <div className="border shadow-inner p-4 rounded-xl bg-slate-950 border-white/5">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                          Debugger shell output
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Compiler v1.0.2</span>
                      </div>
                      
                      <div className="font-mono text-xs min-h-[40px]">
                        {isCompiling ? (
                          <div className="flex items-center gap-2 text-yellow-400 animate-pulse">
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                            <span>{"Parsing Rust source tree -> Allocating hardware thread nodes -> Syncing keys..."}</span>
                          </div>
                        ) : compileStatus === 'success' ? (
                          <div className="text-emerald-400">
                            <div>✓ STAGE_COMPILE_SUCCEEDED in 1.09ms (File hashed: SHA-256: 0x8a92f...fc03)</div>
                            <div>✓ SECURE CHANNELS STABILIZED. Relational pipeline active with 10.0.9.1 edge peer.</div>
                          </div>
                        ) : (
                          <div className="text-slate-500 flex items-center gap-1">
                            <Info className="h-3.5 w-3.5" />
                            <span>Awaiting compiler execution sequence... Click the 'COMPILE PROTOCOL' button above to build.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. TOPOLOGY MESH GRAPH TAB */}
                {activeTab === 'graph' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="h-full flex flex-col md:flex-row gap-6"
                  >
                    {/* Graph viewport representation */}
                    <div className="flex-1 rounded-xl bg-slate-950/50 border border-white/5 relative flex items-center justify-center p-4">
                      
                      {/* Topo Web background */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <g stroke="rgba(255,255,255,0.08)" strokeWidth="1.5">
                          <line x1="20%" y1="25%" x2="80%" y2="25%" />
                          <line x1="20%" y1="25%" x2="30%" y2="75%" />
                          <line x1="80%" y1="25%" x2="70%" y2="75%" />
                          <line x1="30%" y1="75%" x2="70%" y2="75%" />
                          <line x1="20%" y1="25%" x2="70%" y2="75%" />
                          <line x1="80%" y1="25%" x2="30%" y2="75%" />
                        </g>

                        {/* Interactive packet pulse trace */}
                        <motion.circle 
                          r="3.5" 
                          fill={theme === 'cyan' ? '#22d3ee' : theme === 'purple' ? '#a855f7' : '#f59e0b'}
                          animate={{
                            cx: ['20%', '80%', '70%', '30%', '20%'],
                            cy: ['25%', '25%', '75%', '75%', '25%']
                          }}
                          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                        />
                      </svg>

                      {/* Floating cluster Nodes */}
                      <div className="absolute top-[20%] left-[15%]">
                        <button
                          onClick={() => setSelectedNodeId('origin-0')}
                          className={`w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center border transition-all ${
                            selectedNodeId === 'origin-0'
                              ? `${colors.border} bg-white/10 scale-110 shadow-lg text-white`
                              : 'border-white/5 bg-slate-950/60 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <Compass className="h-4 w-4" />
                          <span className="text-[8px] font-mono mt-1">Origin-0</span>
                        </button>
                      </div>

                      <div className="absolute top-[20%] right-[15%]">
                        <button
                          onClick={() => setSelectedNodeId('edge-1')}
                          className={`w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center border transition-all ${
                            selectedNodeId === 'edge-1'
                              ? `${colors.border} bg-white/10 scale-110 shadow-lg text-white`
                              : 'border-white/5 bg-slate-950/60 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <Cpu className="h-4 w-4" />
                          <span className="text-[8px] font-mono mt-1">Edge-1</span>
                        </button>
                      </div>

                      <div className="absolute bottom-[20%] left-[25%]">
                        <button
                          onClick={() => setSelectedNodeId('edge-2')}
                          className={`w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center border transition-all ${
                            selectedNodeId === 'edge-2'
                              ? `${colors.border} bg-white/10 scale-110 shadow-lg text-white`
                              : 'border-white/5 bg-slate-950/60 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <Database className="h-4 w-4" />
                          <span className="text-[8px] font-mono mt-1">Edge-2</span>
                        </button>
                      </div>

                      <div className="absolute bottom-[20%] right-[25%]">
                        <button
                          onClick={() => setSelectedNodeId('edge-3')}
                          className={`w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center border transition-all ${
                            selectedNodeId === 'edge-3'
                              ? `${colors.border} bg-white/10 scale-110 shadow-lg text-white`
                              : 'border-white/5 bg-slate-950/60 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <Compass className="h-4 w-4" />
                          <span className="text-[8px] font-mono mt-1">Edge-3</span>
                        </button>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 bg-slate-950/80 p-2 border border-white/5 rounded text-[10px] font-mono text-slate-400">
                        Topological Nodes: 4 Active
                      </div>
                    </div>

                    {/* Selected Node Inspector Pane */}
                    <div className="w-full md:w-60 bg-slate-950/60 border border-white/5 rounded-xl p-4 flex flex-col justify-between shrink-0">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">NODE INSPECTOR</span>
                        
                        {selectedNodeId ? (
                          <div className="space-y-4 font-mono text-xs">
                            <div>
                              <span className="block text-slate-500 text-[10px]">NAME:</span>
                              <span className="font-semibold text-white text-sm">{clusters.find(c => c.id === selectedNodeId)?.name}</span>
                            </div>
                            <div>
                              <span className="block text-slate-500 text-[10px]">IP_ADDRESS:</span>
                              <span className="text-slate-300">{clusters.find(c => c.id === selectedNodeId)?.ip}</span>
                            </div>
                            <div>
                              <span className="block text-slate-500 text-[10px]">REGION:</span>
                              <span className="text-slate-300">{clusters.find(c => c.id === selectedNodeId)?.region}</span>
                            </div>
                            <div>
                              <span className="block text-slate-500 text-[10px]">VOLUME LOAD:</span>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="h-2 flex-1 rounded-full bg-slate-800 overflow-hidden">
                                  <div 
                                    className={`h-full ${
                                      theme === 'cyan' ? 'bg-cyan-400' : theme === 'purple' ? 'bg-purple-400' : 'bg-amber-400'
                                    }`}
                                    style={{ width: clusters.find(c => c.id === selectedNodeId)?.load }}
                                  />
                                </div>
                                <span className="text-white">{clusters.find(c => c.id === selectedNodeId)?.load}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-xs italic block p-4 text-center">Click any node to explore telemetry</span>
                        )}
                      </div>

                      <div className="border-t border-white/5 pt-3 mt-3 text-[10px] font-mono text-slate-400 leading-relaxed">
                        Data nodes are mapped dynamically via tracer routes.
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. STATIC SCHEMA EDITOR TAB */}
                {activeTab === 'schema' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div className="font-mono text-xs leading-6 text-slate-300 overflow-y-auto">
                      <span className="text-slate-500 tracking-wider font-bold block mb-2">// RELATIONAL GRAPH SCHEMAS SCHEMA.yaml</span>
                      <div><span className="text-orange-400">schema_version:</span> <span className="text-green-500">1.0.2</span></div>
                      <div><span className="text-orange-400">primary_region:</span> <span className="text-green-500">"tokyo-alpha"</span></div>
                      <br />
                      <div><span className="text-orange-400">tables:</span></div>
                      <div className="pl-6"><span className="text-orange-400">users:</span></div>
                      <div className="pl-12"><span className="text-orange-400">columns:</span></div>
                      <div className="pl-18"><span className="text-purple-400">id:</span> <span className="text-blue-400">UUID PRIMARY KEY</span></div>
                      <div className="pl-18"><span className="text-purple-400">created_at:</span> <span className="text-blue-400">TIMESTAMP</span></div>
                      <div className="pl-18"><span className="text-purple-400">state_vector:</span> <span className="text-blue-400">VECTOR(1536)</span></div>
                      <br />
                      <div className="pl-6"><span className="text-orange-400">mesh_transactions:</span></div>
                      <div className="pl-12"><span className="text-orange-400">columns:</span></div>
                      <div className="pl-18"><span className="text-purple-400">hash:</span> <span className="text-blue-400">VARCHAR(64) UNIQUE</span></div>
                      <div className="pl-18"><span className="text-purple-400">sender_id:</span> <span className="text-blue-400">UUID FOREIGN KEY</span></div>
                      <div className="pl-18"><span className="text-purple-400">payload_checksum:</span> <span className="text-blue-400">VARCHAR(32)</span></div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/5 rounded-lg flex items-center gap-3 text-xs text-slate-400">
                      <Save className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Workspace auto-saves secure relational schema edits. Version synchronized up to date.</span>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
