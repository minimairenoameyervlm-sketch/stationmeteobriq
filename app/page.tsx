async function getWeatherData() {
    const res = await fetch("https://aeroxnoameteo.periodicbrake.fr/api/pull/all", {
        // Optionnel : Next.js met en cache par défaut, 
        // force le rafraîchissement si tu veux du temps réel
        cache: 'no-store'
    });
    return res.json();
}

export default async function Home() {

    const data = await getWeatherData();

    return (
        <div className="w-screen h-screen bg-gradient-to-r from-fuchsia-600 to-orange-300 flex flex-col items-center justify-center gap-10">
            <nav className="w-4/6 h-4/6 grid grid-cols-[repeat(2,1fr)] grid-rows-[repeat(3,1fr)] gap-3">
                <ul className="flex items-center justify-center shadow-[0_0_4px_theme(colors.orange.500)] hover:shadow-[0_0_15px_theme(colors.orange.400)] transition-shadow duration-120 bg-black rounded-xl border-orange-300 border-dotted border-2 col-span-2">
                    <p className="font-[Silkscreen] text-orange-200 text-[4.5rem]">{data.temps?.value ?? '--'}°C</p>
                </ul>
                <ul className="flex items-center justify-center shadow-[0_0_4px_theme(colors.orange.500)] hover:shadow-[0_0_15px_theme(colors.orange.400)] transition-shadow duration-120 bg-black rounded-xl border-orange-300 border-dotted border-2 row-start-2">
                    <p className="font-[Silkscreen] text-orange-200 text-center text-[3rem]">{data.humidity?.value ?? '--'}%<br />Humidity</p>
                </ul>
                <ul className="flex items-center justify-center shadow-[0_0_4px_theme(colors.orange.500)] hover:shadow-[0_0_15px_theme(colors.orange.400)] transition-shadow duration-120 bg-black rounded-xl border-orange-300 border-dotted border-2 row-start-2 col-start-2">
                    <p className="font-[Silkscreen] text-orange-200 text-center text-[3rem]">{data.dust?.value ?? '--'}µg/m³<br />Dust</p>
                </ul>
                <ul className="flex items-center justify-center shadow-[0_0_4px_theme(colors.orange.500)] hover:shadow-[0_0_15px_theme(colors.orange.400)] transition-shadow duration-120 bg-black rounded-xl border-orange-300 border-dotted border-2 row-start-3 col-start-1">
                    <p className="font-[Silkscreen] text-orange-200 text-center text-[3rem]">{data.pressure?.value ?? '--'}hPa<br />Pressure</p>
                </ul>
                <ul className="flex items-center justify-center shadow-[0_0_4px_theme(colors.orange.500)] hover:shadow-[0_0_15px_theme(colors.orange.400)] transition-shadow duration-120 bg-black rounded-xl border-orange-300 border-dotted border-2 row-start-3 col-start-2">
                    <p className="font-[Silkscreen] text-orange-200 text-center text-[3rem]">{data.quality?.value ?? '--'} AQI<br />Air quality</p>
                </ul>
            </nav>
        </div>
    );
}

