async function getWeatherData() {
    const res = await fetch("https://aeroxnoameteo.periodicbrake.fr/api/pull/all", {
        cache: 'no-store' // Force le rafraîchissement à chaque requête pour du temps réel
    });
    if (!res.ok) return null;
    return res.json();
}

export default async function Home() {
    const data = await getWeatherData();

    // Extraction des valeurs et formatage sécurisé
    const temp = data?.temps?.value !== undefined ? `${data.temps.value.toFixed(1)} °C` : '--';
    const humi = data?.humidity?.value !== undefined ? `${data.humidity.value.toFixed(1)} %` : '--';
    const pres = data?.pressure?.value !== undefined ? `${data.pressure.value.toFixed(0)} hPa` : '--';
    const dust = data?.dust?.value !== undefined ? `${data.dust.value.toFixed(1)} pcs` : '--';
    const co2 = data?.quality?.value !== undefined ? `${data.quality.value.toFixed(0)} ppm` : '--';
    
    // Gestion dynamique de la batterie / alimentation
    const batteryValue = data?.battery?.value;
    const isSecteur = batteryValue === undefined || batteryValue === -1;

    // Formatage de la date de synchronisation
    let syncTime = "Connexion aux capteurs...";
    if (data?.temps?.updated_at) {
        const date = new Date(data.temps.updated_at);
        syncTime = `Dernière mise à jour : ${date.toLocaleTimeString('fr-FR')}`;
    }

    return (
        <div className="min-h-screen bg-[#f0f2f5] text-[#333] flex flex-col items-center justify-center p-5 font-sans antialiased">
            
            {/* Titres du Projet */}
            <h1 className="text-3xl font-bold text-[#1a73e8] mb-1 tracking-tight text-center">🌍 Météo Briqu</h1>
            <h2 className="text-xs text-[#666] mb-6 font-normal tracking-wide text-center max-w-xs px-2 leading-relaxed">
                Noa Meyer, Luca Sforza, Victor Lefèvre, George Martinez
            </h2>

            {/* BLOC UNIQUE : LES CAPTEURS */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] w-full max-w-[350px] text-left border border-gray-100 flex flex-col gap-4">
                
                {/* Widget Source d'alimentation */}
                <div className="flex justify-between items-center">
                    <span className="text-base font-medium">⚡ Source :</span>
                    {isSecteur ? (
                        <span className="font-bold px-3 py-1 rounded-full text-xs bg-[#e3f2fd] text-[#0d47a1]">
                            🔌 Secteur (USB)
                        </span>
                    ) : (
                        <span className="font-bold px-3 py-1 rounded-full text-xs bg-[#e8f5e9] text-[#1b5e20]">
                            🔋 Pile : {batteryValue.toFixed(0)}%
                        </span>
                    )}
                </div>
                
                <hr className="border-0 h-px bg-gray-100 my-1" />

                {/* Liste des Métriques */}
                <div className="flex justify-between items-center text-[1.05rem]">
                    <span>🌡️ Température :</span>
                    <span className="font-bold text-[#111] font-mono text-lg">{temp}</span>
                </div>
                
                <div className="flex justify-between items-center text-[1.05rem]">
                    <span>💧 Humidité :</span>
                    <span className="font-bold text-[#111] font-mono text-lg">{humi}</span>
                </div>
                
                <div className="flex justify-between items-center text-[1.05rem]">
                    <span>🌪️ Pression :</span>
                    <span className="font-bold text-[#111] font-mono text-lg">{pres}</span>
                </div>
                
                <hr className="border-0 h-px bg-gray-100 my-1" />
                
                <div className="flex justify-between items-center text-[1.05rem]">
                    <span>💨 Qualité de l'air (CO2) :</span>
                    <span className="font-bold text-[#111] font-mono text-lg">{co2}</span>
                </div>
                
                <div className="flex justify-between items-center text-[1.05rem]">
                    <span>🌫️ Poussière :</span>
                    <span className="font-bold text-[#111] font-mono text-lg">{dust}</span>
                </div>

                {/* Status de synchronisation */}
                <div className="text-center text-xs text-gray-400 font-medium mt-2 tracking-wide break-words">
                    {syncTime}
                </div>
            </div>

        </div>
    );
}