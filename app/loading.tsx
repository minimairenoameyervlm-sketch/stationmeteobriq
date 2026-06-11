export default function Loading() {
    return (
        <div className="w-screen h-screen bg-gradient-to-r from-fuchsia-600 to-orange-300 flex items-center justify-center">
            <div className="w-4/6 h-4/6 shadow-[0_0_4px_theme(colors.orange.500)] hover:shadow-[0_0_15px_theme(colors.orange.400)] transition-shadow duration-300 bg-black rounded-xl border-orange-300 border-dotted border-2 flex items-center justify-center">
                <div className="font-[Silkscreen] text-orange-200 text-center text-xl">Loading weather dashboard…</div>
            </div>
        </div>
    );
}
