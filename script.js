// ====== MAIN TAB NAVIGATOR (Vault / Corporate Services) ======
function switchMainTab(targetSection) {
    const vaultPage = document.getElementById('mainVaultPage');
    const servicesPage = document.getElementById('mainServicesPage');
    const vaultBtn = document.getElementById('tabVaultBtn');
    const servicesBtn = document.getElementById('tabServicesBtn');
    
    if(targetSection === 'vault') {
        vaultPage.classList.add('active');
        servicesPage.classList.remove('active');
        vaultBtn.classList.add('active');
        servicesBtn.classList.remove('active');
    } else {
        servicesPage.classList.add('active');
        vaultPage.classList.remove('active');
        servicesBtn.classList.add('active');
        vaultBtn.classList.remove('active');
    }
}


// ====== LUXURY SPLASH SCREEN CONTROLLER ======
window.addEventListener('DOMContentLoaded', () => {
    // Inasubiri sekunde 3 (muda wa bar kujaa) kisha inaondoa splash screen
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) {
            splash.classList.add('fade-out');
        }
    }, 2800); 
});

// ====== SYSTEM STATE (Hifadhi ya Ndani) ======
let cart = JSON.parse(localStorage.getItem('market_cart')) || [];
let successfulPurchases = JSON.parse(localStorage.getItem('successful_purchases')) || 0;

// ====== DOM ELEMENTS ======
const artGrid = document.getElementById('artGridContainer');
const cartCountLabel = document.getElementById('cartCountLabel');
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalLabel = document.getElementById('cartTotalLabel');
const profilePurchaseCount = document.getElementById('profilePurchaseCount');
const toastAlert = document.getElementById('toastAlert');
const toastMessage = document.getElementById('toastMessage');

// Sidebar Control Panel Elements
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const openSidebarBtn = document.getElementById('openSidebarBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');

// Modals
const profileModal = document.getElementById('profileModal');
const aboutModal = document.getElementById('aboutModal');
const contactModal = document.getElementById('contactModal');

// ====== INITIALIZE APP ======
updateCartUI();

// ====== SIDEBAR & THEME LOGIC ======
openSidebarBtn.addEventListener('click', () => {
    sidebarMenu.classList.add('active');
    sidebarOverlay.classList.add('active');
});

const closeSidebar = () => {
    sidebarMenu.classList.remove('active');
    sidebarOverlay.classList.remove('active');
};
closeSidebarBtn.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// Theme Toggle
document.getElementById('themeToggleCheckbox').addEventListener('change', function() {
    if(this.checked) {
        document.body.style.setProperty('--background-dark', '#ffffff');
        document.body.style.setProperty('--card-bg', '#f5f6fa');
        document.body.style.setProperty('--text-light', '#2f3640');
        document.body.style.setProperty('--border-color', '#dcdde1');
    } else {
        document.body.style.setProperty('--background-dark', '#090a0f');
        document.body.style.setProperty('--card-bg', '#121622');
        document.body.style.setProperty('--text-light', '#f8f9fa');
        document.body.style.setProperty('--border-color', 'rgba(212, 175, 55, 0.2)');
    }
});

// ====== MODAL ROUTING INTERACTION ======
const setupModal = (btnId, modalId, closeId) => {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    const close = document.getElementById(closeId);
    
    if(btn && modal && close) {
        btn.addEventListener('click', () => { closeSidebar(); modal.classList.add('active'); });
        close.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('active'); });
    }
};

setupModal('openCartBtn', 'cartModal', 'closeCartBtn');
setupModal('menuProfileBtn', 'profileModal', 'closeProfileBtn');
setupModal('menuAboutBtn', 'aboutModal', 'closeAboutBtn');
setupModal('menuContactBtn', 'contactModal', 'closeContactBtn');

// ====== MARKETPLACE ENGINE (Buy / Vault) ======
if(artGrid) {
    artGrid.addEventListener('click', function(e) {
        const targetBtn = e.target.closest('.buy-btn');
        if(!targetBtn) return;
        
        const card = targetBtn.closest('.art-card');
        const title = card.querySelector('h3').innerText;
        const price = parseInt(card.querySelector('.price').innerText.replace('$', '').replace(',', ''));
        const imageSrc = card.querySelector('img').getAttribute('src');

        // Angalia kama kadi tayari ipo kwenye kadi yako ya malipo
        if(cart.some(item => item.title === title)) {
            showToast("Item is already inside your Vault!", "warning");
            return;
        }

        cart.push({ title, price, image: imageSrc });
        saveCartToDatabase();
        updateCartUI();
        showToast(`${title} secured in Vault!`);
    });
}

function saveCartToDatabase() {
    localStorage.setItem('market_cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update counter
    cartCountLabel.innerText = cart.length;
    profilePurchaseCount.innerText = `${successfulPurchases} Assets`;

    // Clear list
    cartItemsContainer.innerHTML = '';
    
    if(cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:20px;">Your acquisition vault is empty.</p>`;
        cartTotalLabel.innerText = "$0";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';
        itemRow.style.display = 'flex';
        itemRow.style.justifyContent = 'space-between';
        itemRow.style.alignItems = 'center';
        itemRow.style.marginBottom = '15px';
        itemRow.style.borderBottom = '1px solid var(--border-color)';
        itemRow.style.paddingBottom = '10px';

        itemRow.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px;">
                <img src="${item.image}" style="width:50px; height:50px; object-fit:cover; border-radius:6px; border:1px solid var(--gold);">
                <div>
                    <h4 style="font-size:14px; color:var(--text-light);">${item.title}</h4>
                    <span style="color:var(--gold); font-size:13px; font-weight:700;">$${item.price.toLocaleString()}</span>
                </div>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff7675; cursor:pointer; font-size:16px;"><i class="fas fa-trash-can"></i></button>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    cartTotalLabel.innerText = `$${total.toLocaleString()}`;
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCartToDatabase();
    updateCartUI();
    showToast("Asset removed from Vault.");
};

// ====== DATABASE ENGINE: DATABASE SUBMISSION ======
document.getElementById('advancedPurchaseForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if(cart.length === 0) {
        showToast("Vault is empty. Add assets before checkout.", "warning");
        return;
    }

    const investorName = document.getElementById('fullName').value;
    const investorEmail = document.getElementById('emailAddress').value;
    const shippingAddressVal = document.getElementById('shippingAddress') ? document.getElementById('shippingAddress').value : '';
    const deliveryMethodVal = document.getElementById('deliveryMethod') ? document.getElementById('deliveryMethod').value : 'standard';
    const channel = document.getElementById('paymentMethod').value;
    const totalValue = cartTotalLabel.innerText;

    const deliveryLabels = { standard: 'Standard Vault Delivery (3-5 Days)', express: 'Express Concierge Delivery (24 Hrs)' };

    // Tengeneza muundo wa kurekodi kwenye Database ya Malipo
    const orderData = {
        orderId: 'MEM-' + Date.now(),
        investor: investorName,
        email: investorEmail,
        payment_gateway: channel,
        total_paid: totalValue,
        items: cart.map(item => ({ title: item.title, price: item.price, image: item.image })),
        assets_purchased: cart.map(item => item.title).join(', '),
        shipping_address: shippingAddressVal,
        delivery_method: deliveryLabels[deliveryMethodVal] || deliveryMethodVal,
        status: 'Confirmed',
        timestamp: new Date().toLocaleString()
    };

    // 1. Kuhifadhi kwenye Database ya Kudumu ya Mteja (LocalStorage Database)
    let allOrders = JSON.parse(localStorage.getItem('all_database_orders')) || [];
    allOrders.push(orderData);
    localStorage.setItem('all_database_orders', JSON.stringify(allOrders));

    // 2. TUMA DATA KWENYE EMAIL/SERVER YA NJE (SIFA KUBWA YA BACKEND YA SPCK)
    // Unaweza kubadilisha 'your-formspree-id' na ID yako ya bure ya Formspree ukijisajili
    fetch('https://formspree.io/f/your-formspree-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(orderData)
    }).catch(err => console.log("Offline mode database backup saved locally."));

    // Simulia Malipo yamefanikiwa kwa Usalama
    successfulPurchases += cart.length;
    localStorage.setItem('successful_purchases', successfulPurchases);

    // Safisha kila kitu baada ya malipo kukubalika
    cart = [];
    saveCartToDatabase();
    updateCartUI();
    cartModal.classList.remove('active');

    // Onyesha Ujumbe wa Ushindi wa Kifalme
    alert(`⚡ TRANSACTION AUTHORIZED SUCCESSFULLY!\n\nDear ${investorName},\nYour payment of ${totalValue} via ${channel.toUpperCase()} has been verified.\nThe commercial licenses have been dispatched to: ${investorEmail}.\n\nThank you for choosing Middle Eastern Market Centre.`);
});

// ====== FILTER CATEGORIES ENGINE ======
const catButtons = document.querySelectorAll('.cat-btn');
const artCards = document.querySelectorAll('.art-card');

catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        catButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        artCards.forEach(card => {
            if(filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ====== SEARCH FILTERS ENGINE ======
document.getElementById('artSearchInput').addEventListener('input', function(e) {
    const searchStr = e.target.value.toLowerCase();
    artCards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const artist = card.querySelector('.artist').innerText.toLowerCase();
        if(title.includes(searchStr) || artist.includes(searchStr)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// ====== TOAST ALERT CONTROLLER ======
function showToast(message, type = "success") {
    toastMessage.innerText = message;
    if(type === "warning") {
        toastAlert.style.borderLeft = "4px solid #ff7675";
    } else {
        toastAlert.style.borderLeft = "4px solid var(--gold)";
    }
    toastAlert.classList.add('active');
    setTimeout(() => { toastAlert.classList.remove('active'); }, 3000);
}
