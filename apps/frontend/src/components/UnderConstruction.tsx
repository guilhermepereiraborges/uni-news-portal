import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import { 
  ArrowLeft, 
  Construction, 
  Hammer, 
  Rocket, 
  Settings,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UnderConstruction() {
  const router = useRouter();
  const [isLaunching, setIsLaunching] = useState(false);

  const handleGoBack = () => {
    setIsLaunching(true);
    
    setTimeout(() => {
      router.history.back();
    }, 1000);
  };

  return (
    <div className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_at_center,black_60%,transparent_100%)]">
      </div>
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3], 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl mix-blend-multiply"
          />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="relative mb-12"
      >
        <div className="relative size-48 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-2xl animate-pulse" />
            
            <div className="relative size-40 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-sm shadow-sm ring-1 ring-white/60">
                
                <motion.div
                   animate={{ rotate: [0, -15, 0] }}
                   transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                   className="text-slate-700 z-10 drop-shadow-sm"
                >
                    <Hammer className="size-14" strokeWidth={1.5} />
                </motion.div>

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -right-4 top-0 text-blue-500 bg-white rounded-full p-2 shadow-sm"
                >
                    <Settings className="size-6" />
                </motion.div>

                <motion.div
                    animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, 5, 0] 
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-2 bottom-2 text-purple-600 bg-white rounded-full p-2 shadow-sm"
                >
                    <Rocket className="size-6" />
                </motion.div>
                
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-2 left-6 text-amber-400"
                >
                    <Sparkles className="size-5" fill="currentColor" />
                </motion.div>
            </div>
        </div>
      </motion.div>

      <div className="text-center space-y-4 max-w-md z-10 px-4">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm text-slate-600 border border-slate-200/50 text-xs font-medium mb-5 shadow-sm">
                <Construction className="size-3.5" />
                <span>Em Construção</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
                Em breve uma nova experiência.
            </h1>
            
            <p className="text-slate-500 text-lg leading-relaxed">
                A equipe <span className='italic'>
                    Atlas</span> continua polindo cada detalhe. <br/>
                Esta funcionalidade estará disponível em breve.
            </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-8 flex justify-center"
        >
            <Button 
                onClick={handleGoBack} 
                variant="default"
                size="lg"
                disabled={isLaunching}
                className="group relative h-12 min-w-50 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10 transition-all overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {!isLaunching ? (
                        <motion.div
                            key="text"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Voltar para segurança</span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="rocket"
                            className="absolute inset-0 flex items-center justify-center bg-blue-600"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                animate={{ 
                                    x: [0, 150],
                                    y: [0, -150],
                                    scale: [1, 0.5],
                                    opacity: [1, 0]
                                }}
                                transition={{ duration: 0.8, ease: "circIn", delay: 0.1 }}
                            >
                                <Rocket className="size-6 text-white fill-white rotate-45" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>
        </motion.div>
      </div>
    </div>
  );
}