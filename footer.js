// MEM ONLINE (MIDDLE EASTERN MARKET CENTRE) - GLOBAL ENTERPRISE FOOTER
document.addEventListener("DOMContentLoaded", function () {
    // 1. Muundo wa Muonekano (HTML Premium Footer)
    const memFooterHTML = `
    <footer class="mem-global-footer">
        <div class="mem-footer-container">
            <!-- Safu ya 1: Kuhusu Jukwaa -->
            <div class="mem-footer-section mem-about">
                <h3 class="mem-logo-text">MEM <span>Online</span></h3>
                <p class="mem-tagline">Middle Eastern Market Centre</p>
                <p class="mem-description">The premier digital gateway connecting premium Tanzanian artists, cultural craft builders, and fine painters directly with elite collectors across the Middle East and worldwide markets.</p>
            </div>

            <!-- Safu ya 2: Menu Muhimu za Biashara -->
            <div class="mem-footer-section mem-nav">
                <h3>Market Navigation</h3>
                <ul>
                    <li><a href="index.html">Art Gallery</a></li>
                    <li><a href="artists.html">Our Artists</a></li>
                    <li><a href="auctions.html">Live Auctions</a></li>
                    <li><a href="shipping.html">Global Logistics</a></li>
                </ul>
            </div>

            <!-- Safu ya 3: Uongozi wa Kampuni (Executive Card) -->
            <div class="mem-footer-section mem-executive">
                <h3>Executive Directorate</h3>
                <div class="mem-ceo-profile-card">
                    <h4>Hafidh Hussein Athuman</h4>
                    <span class="mem-badge">Founder & Chief Executive Officer</span>
                    <p class="mem-academic-credit">Form Three Tech Scholar | Azania High School</p>
                    <p class="mem-hq"><strong>HQ:</strong> Dar es Salaam, Tanzania</p>
                </div>
            </div>
        </div>

        <!-- Sehemu ya Chini Kabisa: Global Enterprise Metadata -->
        <div class="mem-footer-bottom">
            <div class="mem-bottom-content">
                <p>&copy; 2026 Middle Eastern Market Centre (MEM Online). All International Rights Reserved.</p>
                <p class="mem-developer-framework">
                    Enterprise Platform Engineered by 
                    <a href="https://vercel.app" target="_blank" rel="author" title="Hafidh Hussein Athuman - Official Portfolio">www.hafidhhussein.me</a>
                </p>
            </div>
        </div>
    </footer>
    `;

    // 2. Kuingiza Msimbo wa Kimataifa wa Google E-commerce Schema (JSON-LD)
    const memSeoSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "OnlineBusiness",
                "@id": "https://vercel.app/#mem-online",
                "name": "Middle Eastern Market Centre (MEM Online)",
                "url": "https://vercel.app",
                "logo": "https://vercel.app/logo.png",
                "description": "Premium e-commerce platform connecting African artists with the Middle Eastern art market.",
                "founder": {
                    "@id": "https://vercel.app/#ceo"
                }
            },
            {
                "@type": "Person",
                "@id": "https://vercel.app/#ceo",
                "name": "Hafidh Hussein Athuman",
                "jobTitle": "Chief Executive Officer & Platform Architect",
                "nationality": "Tanzanian",
                "worksFor": {
                    "@id": "https://vercel.app/#mem-online"
                }
            }
        ]
    };

    // Kuingiza HTML mwishoni mwa kila page ya tovuti yako ya MEM
    document.body.insertAdjacentHTML('beforeend', memFooterHTML);

    // Kuingiza kodi ya siri ya Google SEO kwenye <head> ya kila page kiotomatiki
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(memSeoSchema);
    document.head.appendChild(scriptTag);
});
