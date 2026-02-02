export default function LoaderUI() {
    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-900"
        >
            <div className="flex flex-col items-center">
                {/* Animated Brand Logo Container */}
                <div className="relative mb-12 flex flex-col items-center">
                    <div className="relative">
                        <h1 className="text-4xl sm:text-6xl font-black tracking-[0.25em] text-primary select-none animate-pulse-slow">
                            GOCLOUDEX
                        </h1>
                        {/* Reflective shine effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shine"></div>
                    </div>

                    {/* Animated Loading Progress Line */}
                    <div className="w-full h-1 bg-primary/10 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-primary animate-progress-indefinite rounded-full"></div>
                    </div>
                </div>

                {/* Premium Geometric Spinner */}
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-primary/5 rounded-2xl rotate-45"></div>
                    <div className="absolute inset-0 border-4 border-t-primary rounded-2xl rotate-45 animate-spin-slow"></div>
                    <div className="absolute inset-4 border-2 border-primary/20 rounded-full animate-pulse"></div>
                </div>

                <div className="mt-12 flex items-center space-x-3">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                </div>

                <p className="mt-4 text-xs font-bold tracking-[0.4em] text-textLight/40 dark:text-textDark/40 uppercase">
                    Digital Excellence
                </p>
            </div>
        </div>
    );
}
