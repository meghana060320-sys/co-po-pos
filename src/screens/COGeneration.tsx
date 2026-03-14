import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User as UserIcon, 
  ChevronLeft, 
  Save, 
  RefreshCw, 
  Edit3, 
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  MessageSquare,
  Cpu,
  Zap
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface CO {
  id: string;
  code: string;
  statement: string;
  btLevel: string;
  mappedPOs: string[];
}

export default function COGeneration({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hello! I'm your OBE AI Assistant. I can help you generate Course Outcomes (COs) for your course. Please tell me the course name and paste your syllabus topics." }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cos, setCos] = useState<CO[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsGenerating(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an OBE (Outcome Based Education) expert. Based on the following user input about a course syllabus, generate 5 clear Course Outcomes (COs) with their Bloom's Taxonomy (BT) levels (L1-L6) and suggested PO mappings (PO1-PO12). 
        
        User Input: ${userMessage}
        
        Return the response in JSON format like this:
        {
          "cos": [
            { "code": "CO1", "statement": "...", "btLevel": "L2", "mappedPOs": ["PO1", "PO2"] },
            ...
          ]
        }`,
        config: {
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text || '{}');
      if (data.cos) {
        setCos(data.cos.map((c: any, i: number) => ({ ...c, id: `co-${i}` })));
        setMessages(prev => [...prev, { role: 'bot', text: "I've generated the COs based on your syllabus. You can review and edit them in the panel on the right." }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: "I couldn't generate the COs. Could you please provide more details about the syllabus?" }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <header className="p-5 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-5">
          <button 
            onClick={onBack} 
            className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all border border-transparent hover:border-slate-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="h-10 w-px bg-slate-100"></div>
          <div>
            <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-100">
                <Sparkles className="h-5 w-5" />
              </div>
              AI CO Generation
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">CS301: Data Structures & Algorithms</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            Export Draft
          </button>
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-blue-100">
            <Save className="h-4 w-4" /> Save All COs
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat Panel */}
        <div className="w-1/2 flex flex-col border-r border-slate-100 bg-white">
          <div className="p-4 border-b border-slate-50 bg-slate-50/30 flex items-center gap-3">
            <MessageSquare className="h-4 w-4 text-blue-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Assistant Session</span>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'bot' ? 'bg-blue-600 text-white shadow-blue-100' : 'bg-slate-100 text-slate-500'}`}>
                    {msg.role === 'bot' ? <Bot className="h-6 w-6" /> : <UserIcon className="h-6 w-6" />}
                  </div>
                  <div className={`max-w-[80%] p-5 rounded-3xl text-sm leading-relaxed shadow-sm border ${
                    msg.role === 'bot' 
                      ? 'bg-white text-slate-700 border-slate-100 rounded-tl-none' 
                      : 'bg-blue-600 text-white border-blue-500 rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isGenerating && (
              <div className="flex gap-5">
                <div className="h-11 w-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center animate-pulse shadow-lg shadow-blue-100">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="bg-white border border-slate-100 p-5 rounded-3xl rounded-tl-none flex gap-2 items-center shadow-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Paste syllabus or ask to refine COs..."
                className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] pl-6 pr-16 py-5 text-sm focus:ring-0 focus:border-blue-500 focus:bg-white transition-all resize-none min-h-[120px] shadow-inner font-medium text-slate-700"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                className="absolute right-4 bottom-4 h-12 w-12 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-100 flex items-center justify-center group-hover:scale-105"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-1.5">
                <Cpu className="h-3 w-3 text-slate-300" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gemini 3.1 Pro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-slate-300" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Low Latency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 flex flex-col bg-[#f8fafc]">
          <div className="p-6 border-b border-slate-100 bg-white/50 flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Live CO Preview</h2>
            <button className="text-[10px] font-black text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 uppercase tracking-widest">
              <RefreshCw className="h-3 w-3" /> Regenerate
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-5 custom-scrollbar">
            {cos.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-12">
                <div className="h-20 w-20 bg-white rounded-3xl border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                  <Bot className="h-10 w-10 opacity-20" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">No COs Generated Yet</h3>
                <p className="text-sm font-medium max-w-xs">Start by chatting with the AI assistant on the left to generate your course outcomes.</p>
              </div>
            ) : (
              cos.map((co, i) => (
                <motion.div
                  key={co.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-100 rounded-3xl p-6 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-lg shadow-sm">{co.code}</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg">{co.btLevel}</span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <button className="p-2 hover:bg-blue-50 rounded-xl text-slate-400 hover:text-blue-600 transition-all"><Edit3 className="h-4 w-4" /></button>
                      <button className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600 transition-all"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed mb-5 relative z-10">{co.statement}</p>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {co.mappedPOs.map(po => (
                      <span key={po} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg border border-blue-100/50">{po}</span>
                    ))}
                    <button className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black rounded-lg hover:bg-slate-100 transition-all flex items-center gap-1.5 border border-slate-100">
                      <Plus className="h-3 w-3" /> Add PO
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
          {cos.length > 0 && (
            <div className="p-6 bg-white/80 backdrop-blur-sm border-t border-slate-100">
              <div className="flex items-center gap-3 text-emerald-600 text-sm font-black uppercase tracking-widest">
                <CheckCircle2 className="h-5 w-5" />
                Validation Passed: All COs Mapped
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
