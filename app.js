const STORAGE_KEY = 'vendtrack_v2_state';

const DEFAULT_USER = {
  email: 'admin@vendtrack.io',
  username: 'admin',
  password: 'VendTrack2026!'
};

const PAGE_META = {
  'dashboard':      { title: 'Operations Dashboard',  subtitle: 'Live telemetry, revenue performance, and fleet alerts' },
  'machines':       { title: 'Machines & Locations',  subtitle: 'Fleet directory, stock levels, and terminal connectivity' },
  'machine-detail': { title: 'Machine Details',       subtitle: 'Interactive coil planogram telemetry and slot replenishment' },
  'products':       { title: 'Product Catalog',       subtitle: 'SKU pricing, unit costs, and gross profit margins' },
  'sales':          { title: 'Sales Ledger',          subtitle: 'Cashless QR and cash vault transaction reconciliation' },
  'restocking':     { title: 'Restocking History',    subtitle: 'Field replenishment logs and batch stock entries' },
  'maintenance':    { title: 'Maintenance Requests',  subtitle: 'Hardware fault tickets and technician dispatch' },
  'employees':      { title: 'Employees & Reports',   subtitle: 'Operator roles, zone assignments, and printable summaries' }
};

const INITIAL_STATE = {
  selectedMachineId: 'VM-001',
  totalVends: 642,
  digitalRevenue: 101265.00,
  cashRevenue: 47655.00,
  machines: [
    {
      id: 'VM-001', location: 'Engineering Building Lobby', model: 'SmartVend Pro-48', status: 'Online',
      coils: [
        { slot: 'A1', sku: 'SKU-101', name: 'Cold Brew Coffee 250ml', price: 55, current: 10, max: 12 },
        { slot: 'A2', sku: 'SKU-102', name: 'Mineral Water 500ml',    price: 20, current: 14, max: 15 },
        { slot: 'B1', sku: 'SKU-204', name: 'Salted Potato Crisps',   price: 35, current: 8,  max: 10 },
        { slot: 'B2', sku: 'SKU-208', name: 'Choco Oat Energy Bar',   price: 30, current: 9,  max: 10 }
      ]
    },
    {
      id: 'VM-002', location: 'Main Library Ground Floor', model: 'SmartVend Pro-48', status: 'Low Stock',
      coils: [
        { slot: 'A1', sku: 'SKU-101', name: 'Cold Brew Coffee 250ml', price: 55, current: 2, max: 12 },
        { slot: 'A2', sku: 'SKU-102', name: 'Mineral Water 500ml',    price: 20, current: 4, max: 15 },
        { slot: 'B1', sku: 'SKU-204', name: 'Salted Potato Crisps',   price: 35, current: 3, max: 10 },
        { slot: 'B2', sku: 'SKU-208', name: 'Choco Oat Energy Bar',   price: 30, current: 2, max: 10 }
      ]
    },
    {
      id: 'VM-003', location: 'IT Building 2nd Floor', model: 'SmartVend Mini-32', status: 'Online',
      coils: [
        { slot: 'A1', sku: 'SKU-101', name: 'Cold Brew Coffee 250ml', price: 55, current: 9, max: 12 },
        { slot: 'A2', sku: 'SKU-102', name: 'Mineral Water 500ml',    price: 20, current: 12, max: 15 },
        { slot: 'B1', sku: 'SKU-204', name: 'Salted Potato Crisps',   price: 35, current: 7, max: 10 },
        { slot: 'B2', sku: 'SKU-208', name: 'Choco Oat Energy Bar',   price: 30, current: 8, max: 10 }
      ]
    },
    {
      id: 'VM-004', location: 'Science Complex Atrium', model: 'SmartVend Pro-48', status: 'Low Stock',
      coils: [
        { slot: 'A1', sku: 'SKU-101', name: 'Cold Brew Coffee 250ml', price: 55, current: 1, max: 12 },
        { slot: 'A2', sku: 'SKU-102', name: 'Mineral Water 500ml',    price: 20, current: 3, max: 15 },
        { slot: 'B1', sku: 'SKU-204', name: 'Salted Potato Crisps',   price: 35, current: 2, max: 10 },
        { slot: 'B2', sku: 'SKU-208', name: 'Choco Oat Energy Bar',   price: 30, current: 2, max: 10 }
      ]
    },
    {
      id: 'VM-009', location: 'Gymnasium Pavilion', model: 'SmartVend Pro-48', status: 'Maintenance',
      coils: [
        { slot: 'A1', sku: 'SKU-105', name: 'Electrolyte Sports Drink', price: 42, current: 8, max: 12 },
        { slot: 'A2', sku: 'SKU-102', name: 'Mineral Water 500ml',      price: 20, current: 11, max: 15 },
        { slot: 'B1', sku: 'SKU-204', name: 'Salted Potato Crisps',     price: 35, current: 6, max: 10 },
        { slot: 'B2', sku: 'SKU-208', name: 'Choco Oat Energy Bar',     price: 30, current: 7, max: 10 }
      ]
    }
  ],
  products: [
    { sku: 'SKU-101', name: 'Cold Brew Coffee 250ml',      category: 'Beverages', cost: 32.00, price: 55.00 },
    { sku: 'SKU-102', name: 'Purified Mineral Water 500ml', category: 'Beverages', cost: 9.50,  price: 20.00 },
    { sku: 'SKU-105', name: 'Electrolyte Sports Drink',     category: 'Beverages', cost: 24.00, price: 42.00 },
    { sku: 'SKU-204', name: 'Salted Potato Crisps 60g',     category: 'Snacks',    cost: 19.00, price: 35.00 },
    { sku: 'SKU-208', name: 'Choco Oat Energy Bar',         category: 'Snacks',    cost: 16.00, price: 30.00 }
  ],
  transactions: [
    { id: '#TX-9482', machine: 'VM-001', item: 'Cold Brew Coffee 250ml', method: 'GCash QR', amount: 55.00, time: 'Nov 26, 2026 • 19:58' },
    { id: '#TX-9481', machine: 'VM-003', item: 'Salted Potato Crisps 60g', method: 'Cash', amount: 35.00, time: 'Nov 26, 2026 • 19:44' },
    { id: '#TX-9480', machine: 'VM-002', item: 'Purified Mineral Water 500ml', method: 'Maya QR', amount: 20.00, time: 'Nov 26, 2026 • 19:31' }
  ],
  restocks: [
    { id: '#RS-410', machine: 'VM-001 (Engineering Building Lobby)', tech: 'Marco Santos', units: 48, level: '96% Full' },
    { id: '#RS-409', machine: 'VM-003 (IT Building 2nd Floor)', tech: 'Rina Dizon', units: 36, level: '92% Full' }
  ],
  tickets: [
    { id: '#MT-118', machine: 'VM-009 (Gymnasium Pavilion)', desc: 'Bill acceptor optical sensor jam', priority: 'High', status: 'In Progress' },
    { id: '#MT-117', machine: 'VM-001 (Engineering Building Lobby)', desc: 'Condenser filter preventative clean', priority: 'Routine', status: 'Resolved' }
  ]
};

let appState = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(INITIAL_STATE));
  } catch (e) {
    return JSON.parse(JSON.stringify(INITIAL_STATE));
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {}
}

function resetDemoData() {
  appState = JSON.parse(JSON.stringify(INITIAL_STATE));
  saveState();
  renderAll();
  showToast('Demo fleet data restored to defaults.');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

/* ---------------- SHOW PASSWORD MODE & JAVA/LOCAL AUTH ---------------- */
function fillDefaultCredentials() {
  document.getElementById('login-identity').value = DEFAULT_USER.email;
  document.getElementById('login-password').value = DEFAULT_USER.password;
  document.getElementById('login-error').classList.add('hidden');
  showToast('Default credentials filled.');
}

function togglePasswordVisibility() {
  const input = document.getElementById('login-password');
  const btn = document.getElementById('toggle-pw-btn');
  const label = document.getElementById('toggle-pw-label');
  const eyeOpen = document.getElementById('eye-open-icon');
  const eyeClosed = document.getElementById('eye-closed-icon');
  const modeBadge = document.getElementById('pw-mode-badge');

  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.setAttribute('aria-pressed', String(isHidden));
  label.textContent = isHidden ? 'Hide' : 'Show';
  eyeOpen.classList.toggle('hidden', isHidden);
  eyeClosed.classList.toggle('hidden', !isHidden);
  modeBadge.textContent = isHidden ? 'Password visible' : 'Password hidden';
  modeBadge.className = isHidden ? 'pw-mode-visible' : 'pw-mode-badge';
}

function checkCapsLock(event) {
  const warning = document.getElementById('capslock-warning');
  if (event.getModifierState && event.getModifierState('CapsLock')) {
    warning.classList.remove('hidden');
  } else {
    warning.classList.add('hidden');
  }
}

function showAuthScreen(screen) {
  document.getElementById('auth-login-view').classList.toggle('hidden', screen !== 'login');
  document.getElementById('auth-recovery-view').classList.toggle('hidden', screen !== 'recovery');
  document.getElementById('recovery-success').classList.add('hidden');
}

async function handleLogin(event) {
  event.preventDefault();
  const identity = document.getElementById('login-identity').value.trim();
  const password = document.getElementById('login-password').value;
  const errorBox = document.getElementById('login-error');

  let authenticated = false;
  let displayEmail = identity.toLowerCase() === DEFAULT_USER.username ? DEFAULT_USER.email : identity;

  // Attempt authentication against VendTrackServer.java first
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity, password })
    });
    if (res.ok) {
      const data = await res.json();
      authenticated = Boolean(data.success);
      if (data.email) displayEmail = data.email;
    }
  } catch (err) {
    // Fallback when opened directly via file:// without Java server running
    const validId = identity.toLowerCase() === DEFAULT_USER.email || identity.toLowerCase() === DEFAULT_USER.username;
    authenticated = validId && password === DEFAULT_USER.password;
  }

  if (authenticated) {
    errorBox.classList.add('hidden');
    document.getElementById('sidebar-user-email').textContent = displayEmail;
    document.getElementById('auth-login-view').classList.add('hidden');
    document.getElementById('auth-recovery-view').classList.add('hidden');
    document.getElementById('app-shell').classList.remove('hidden');
    renderAll();
  } else {
    errorBox.classList.remove('hidden');
  }
}

function handleRecovery(event) {
  event.preventDefault();
  document.getElementById('recovery-success').classList.remove('hidden');
}

function handleLogout() {
  document.getElementById('app-shell').classList.add('hidden');
  showAuthScreen('login');
}

/* ---------------- NAVIGATION & MODALS ---------------- */
function toggleMobileSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('mobile-backdrop').classList.toggle('hidden');
}

function switchPage(pageKey) {
  document.querySelectorAll('.module-page').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById('page-' + pageKey);
  if (target) target.classList.remove('hidden');

  if (PAGE_META[pageKey]) {
    document.getElementById('topbar-title').textContent = PAGE_META[pageKey].title;
    document.getElementById('topbar-subtitle').textContent = PAGE_META[pageKey].subtitle;
  }

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-nav') === pageKey);
  });

  if (window.innerWidth < 1024) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('mobile-backdrop').classList.add('hidden');
  }
}

function openModal(id) {
  populateDropdowns();
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

/* ---------------- RENDERING ENGINE ---------------- */
function computeStockPercent(machine) {
  if (!machine.coils || machine.coils.length === 0) return 100;
  const cur = machine.coils.reduce((sum, c) => sum + c.current, 0);
  const max = machine.coils.reduce((sum, c) => sum + c.max, 0);
  return Math.round((cur / max) * 100);
}

function syncMachineStatuses() {
  appState.machines.forEach(m => {
    if (m.status !== 'Maintenance') {
      const pct = computeStockPercent(m);
      m.status = pct < 30 ? 'Low Stock' : 'Online';
    }
  });
}

function renderAll() {
  syncMachineStatuses();
  populateDropdowns();
  renderDashboard();
  renderMachinesTable();
  renderMachineDetail();
  renderProductsTable();
  renderSalesLedger();
  renderRestockTable();
  renderMaintenanceTable();
}

function populateDropdowns() {
  const machineOptions = appState.machines
    .map(m => `<option value="${m.id}">${m.id} (${m.location})</option>`)
    .join('');

  ['detail-machine-select', 'restock-machine', 'sim-machine', 'new-ticket-machine'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const prev = el.value;
      el.innerHTML = machineOptions;
      if (prev && appState.machines.some(m => m.id === prev)) el.value = prev;
    }
  });

  const detailSel = document.getElementById('detail-machine-select');
  if (detailSel) detailSel.value = appState.selectedMachineId;

  const simProd = document.getElementById('sim-product');
  if (simProd) {
    simProd.innerHTML = appState.products
      .map(p => `<option value="${p.sku}">${p.name} — ₱${p.price.toFixed(2)}</option>`)
      .join('');
  }
}

function renderDashboard() {
  const gross = appState.digitalRevenue + appState.cashRevenue;
  document.getElementById('kpi-revenue').textContent =
    '₱' + gross.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const onlineCount = appState.machines.filter(m => m.status !== 'Maintenance').length;
  document.getElementById('kpi-machines').textContent = `${onlineCount} / ${appState.machines.length}`;

  const lowStockMachines = appState.machines.filter(m => computeStockPercent(m) < 30);
  document.getElementById('kpi-lowstock').textContent = `${lowStockMachines.length} Units`;
  document.getElementById('kpi-vends').textContent = appState.totalVends.toLocaleString();

  const alertsEl = document.getElementById('dashboard-alerts-list');
  const alertCards = [];

  lowStockMachines.slice(0, 2).forEach(m => {
    const pct = computeStockPercent(m);
    alertCards.push(`
      <div class="alert-card-amber">
        <div class="alert-card-top">
          <span>${m.id} • ${m.location}</span>
          <span>${pct}% Stock</span>
        </div>
        <p>Coil inventory below 30% threshold.</p>
      </div>
    `);
  });

  appState.tickets.filter(t => t.status !== 'Resolved').slice(0, 2).forEach(t => {
    alertCards.push(`
      <div class="alert-card-red">
        <div class="alert-card-top">
          <span>${t.machine}</span>
          <span>${t.priority}</span>
        </div>
        <p>${t.desc}</p>
      </div>
    `);
  });

  alertsEl.innerHTML = alertCards.length
    ? alertCards.join('')
    : `<p class="muted-text">All machines operating within optimal thresholds.</p>`;

  document.getElementById('dashboard-recent-txns').innerHTML = appState.transactions.slice(0, 5).map(t => `
    <tr>
      <td class="mono font-bold">${t.id}</td>
      <td>${t.machine}</td>
      <td>${t.item}</td>
      <td><span class="badge badge-teal">${t.method}</span></td>
      <td class="font-bold">₱${t.amount.toFixed(2)}</td>
      <td class="muted-text">${t.time}</td>
    </tr>
  `).join('');
}

function renderMachinesTable() {
  const q = (document.getElementById('machine-search')?.value || '').toLowerCase();
  const status = document.getElementById('machine-status-filter')?.value || 'all';

  const filtered = appState.machines.filter(m => {
    const matchesText = m.id.toLowerCase().includes(q) || m.location.toLowerCase().includes(q) || m.model.toLowerCase().includes(q);
    const matchesStatus = status === 'all' || m.status === status;
    return matchesText && matchesStatus;
  });

  document.getElementById('machines-tbody').innerHTML = filtered.map(m => {
    const pct = computeStockPercent(m);
    const badgeClass =
      m.status === 'Online' ? 'badge-green' :
      m.status === 'Low Stock' ? 'badge-amber' : 'badge-red';
    const barClass = pct < 30 ? 'progress-low' : 'progress-fill';

    return `
      <tr>
        <td class="mono font-bold">${m.id}</td>
        <td>${m.location}</td>
        <td class="muted-text">${m.model}</td>
        <td>
          <div class="progress-wrap">
            <div class="progress-track">
              <div class="${barClass}" style="width: ${pct}%"></div>
            </div>
            <span class="font-bold">${pct}%</span>
          </div>
        </td>
        <td><span class="badge ${badgeClass}">${m.status}</span></td>
        <td class="text-right">
          <button onclick="openMachineDetail('${m.id}')" class="link-btn">Inspect Coils &rarr;</button>
        </td>
      </tr>
    `;
  }).join('');
}

function openMachineDetail(machineId) {
  appState.selectedMachineId = machineId;
  saveState();
  renderMachineDetail();
  switchPage('machine-detail');
}

function selectMachineDetail(machineId) {
  appState.selectedMachineId = machineId;
  saveState();
  renderMachineDetail();
}

function renderMachineDetail() {
  const m = appState.machines.find(x => x.id === appState.selectedMachineId) || appState.machines[0];
  if (!m) return;

  document.getElementById('detail-machine-title').textContent = `${m.id} • ${m.location}`;
  document.getElementById('detail-machine-meta').textContent = `Model: ${m.model} • Firmware v4.12 • Overall Capacity: ${computeStockPercent(m)}%`;

  const badge = document.getElementById('detail-machine-badge');
  badge.textContent = `${m.status} • 4.2°C`;
  badge.className = m.status === 'Online' ? 'badge badge-green' : 'badge badge-amber';

  document.getElementById('coil-planogram-grid').innerHTML = m.coils.map((c, idx) => {
    const pct = Math.round((c.current / c.max) * 100);
    const low = pct < 30;
    return `
      <div class="coil-card ${low ? 'low' : ''}">
        <div>
          <div class="coil-top">
            <span>Slot ${c.slot}</span>
            <span>${c.current} / ${c.max}</span>
          </div>
          <p class="coil-name">${c.name}</p>
          <p class="coil-sub">₱${c.price.toFixed(2)} • ${c.sku}</p>
          <div class="progress-track full-width">
            <div class="${low ? 'progress-low' : 'progress-fill'}" style="width: ${pct}%"></div>
          </div>
        </div>
        <button onclick="restockSingleSlot('${m.id}', ${idx})" class="btn-outline full-width mt-16">
          + Refill Slot to Max
        </button>
      </div>
    `;
  }).join('');
}

function restockSingleSlot(machineId, slotIdx) {
  const m = appState.machines.find(x => x.id === machineId);
  if (!m) return;
  const slot = m.coils[slotIdx];
  const added = slot.max - slot.current;
  if (added <= 0) {
    showToast(`Slot ${slot.slot} is already full.`);
    return;
  }
  slot.current = slot.max;
  appState.restocks.unshift({
    id: '#RS-' + (411 + appState.restocks.length),
    machine: `${m.id} (${m.location})`,
    tech: 'Ops Administrator',
    units: added,
    level: `${computeStockPercent(m)}% Full`
  });
  saveState();
  renderAll();
  showToast(`Refilled ${m.id} Slot ${slot.slot} (+${added} units).`);
}

function restockAllSlotsForCurrentMachine() {
  const m = appState.machines.find(x => x.id === appState.selectedMachineId);
  if (!m) return;
  let totalAdded = 0;
  m.coils.forEach(c => {
    totalAdded += (c.max - c.current);
    c.current = c.max;
  });
  if (totalAdded === 0) {
    showToast(`${m.id} coils are already at 100% capacity.`);
    return;
  }
  appState.restocks.unshift({
    id: '#RS-' + (411 + appState.restocks.length),
    machine: `${m.id} (${m.location})`,
    tech: 'Ops Administrator',
    units: totalAdded,
    level: '100% Full'
  });
  saveState();
  renderAll();
  showToast(`Filled all coils on ${m.id} (+${totalAdded} units).`);
}

function renderProductsTable() {
  document.getElementById('products-tbody').innerHTML = appState.products.map(p => {
    const margin = (((p.price - p.cost) / p.price) * 100).toFixed(1);
    return `
      <tr>
        <td class="mono font-bold">${p.sku}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>₱${p.cost.toFixed(2)}</td>
        <td class="font-bold">₱${p.price.toFixed(2)}</td>
        <td><span class="badge badge-green">${margin}%</span></td>
      </tr>
    `;
  }).join('');
}

function renderSalesLedger() {
  document.getElementById('ledger-digital-total').textContent =
    '₱' + appState.digitalRevenue.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('ledger-cash-total').textContent =
    '₱' + appState.cashRevenue.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById('sales-ledger-tbody').innerHTML = appState.transactions.map(t => `
    <tr>
      <td class="mono font-bold">${t.id}</td>
      <td class="muted-text">${t.time}</td>
      <td class="font-bold">${t.machine}</td>
      <td>${t.item}</td>
      <td><span class="badge badge-teal">${t.method}</span></td>
      <td class="font-bold">₱${t.amount.toFixed(2)}</td>
    </tr>
  `).join('');
}

function renderRestockTable() {
  document.getElementById('restock-tbody').innerHTML = appState.restocks.map(r => `
    <tr>
      <td class="mono">${r.id}</td>
      <td class="font-bold">${r.machine}</td>
      <td>${r.tech}</td>
      <td class="font-bold text-green">+${r.units} units</td>
      <td><span class="badge badge-green">${r.level}</span></td>
    </tr>
  `).join('');
}

function renderMaintenanceTable() {
  document.getElementById('maintenance-tbody').innerHTML = appState.tickets.map((t, idx) => {
    const isResolved = t.status === 'Resolved';
    const prioBadge = t.priority === 'High' ? 'badge-red' : 'badge-gray';
    const statusBadge = isResolved ? 'badge-green' : 'badge-amber';

    return `
      <tr>
        <td class="mono">${t.id}</td>
        <td class="font-bold">${t.machine}</td>
        <td>${t.desc}</td>
        <td><span class="badge ${prioBadge}">${t.priority}</span></td>
        <td>
          <button onclick="toggleTicketStatus(${idx})" class="badge ${statusBadge}" style="border:none; cursor:pointer;">
            ${t.status}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

/* ---------------- ACTION HANDLERS ---------------- */
function handleSimulateVend(event) {
  event.preventDefault();
  const machineId = document.getElementById('sim-machine').value;
  const sku = document.getElementById('sim-product').value;
  const method = document.getElementById('sim-payment').value;

  const machine = appState.machines.find(m => m.id === machineId);
  const product = appState.products.find(p => p.sku === sku);
  if (!machine || !product) return;

  const coil = machine.coils.find(c => c.sku === sku && c.current > 0) || machine.coils.find(c => c.current > 0);
  if (coil) coil.current = Math.max(0, coil.current - 1);

  appState.totalVends += 1;
  if (method === 'Cash') {
    appState.cashRevenue += product.price;
  } else {
    appState.digitalRevenue += product.price;
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  appState.transactions.unshift({
    id: '#TX-' + (9483 + appState.transactions.length),
    machine: machine.id,
    item: product.name,
    method: method,
    amount: product.price,
    time: `Nov 26, 2026 • ${timeStr}`
  });

  saveState();
  renderAll();
  closeModal('vend-modal');
  showToast(`Vended ${product.name} at ${machine.id} (₱${product.price.toFixed(2)})`);
}

function handleAddMachine(event) {
  event.preventDefault();
  const id = document.getElementById('new-machine-id').value.trim().toUpperCase();
  const location = document.getElementById('new-machine-loc').value.trim();
  const model = document.getElementById('new-machine-model').value;

  appState.machines.push({
    id,
    location,
    model,
    status: 'Online',
    coils: [
      { slot: 'A1', sku: 'SKU-101', name: 'Cold Brew Coffee 250ml', price: 55, current: 12, max: 12 },
      { slot: 'A2', sku: 'SKU-102', name: 'Mineral Water 500ml',    price: 20, current: 15, max: 15 },
      { slot: 'B1', sku: 'SKU-204', name: 'Salted Potato Crisps',   price: 35, current: 10, max: 10 },
      { slot: 'B2', sku: 'SKU-208', name: 'Choco Oat Energy Bar',   price: 30, current: 10, max: 10 }
    ]
  });

  saveState();
  renderAll();
  closeModal('machine-modal');
  event.target.reset();
  showToast(`Registered ${id} at ${location}.`);
}

function handleAddProduct(event) {
  event.preventDefault();
  const sku = document.getElementById('new-sku-code').value.trim().toUpperCase();
  const category = document.getElementById('new-sku-cat').value;
  const name = document.getElementById('new-sku-name').value.trim();
  const cost = parseFloat(document.getElementById('new-sku-cost').value);
  const price = parseFloat(document.getElementById('new-sku-price').value);

  appState.products.push({ sku, name, category, cost, price });
  saveState();
  renderAll();
  closeModal('product-modal');
  event.target.reset();
  showToast(`Added ${sku} (${name}) to catalog.`);
}

function addRestockLog(event) {
  event.preventDefault();
  const machineId = document.getElementById('restock-machine').value;
  const items = parseInt(document.getElementById('restock-items').value, 10);
  const tech = document.getElementById('restock-tech').value.trim();

  const machine = appState.machines.find(m => m.id === machineId);
  if (machine) {
    machine.coils.forEach(c => { c.current = c.max; });
  }

  appState.restocks.unshift({
    id: '#RS-' + (411 + appState.restocks.length),
    machine: machine ? `${machine.id} (${machine.location})` : machineId,
    tech,
    units: items,
    level: '100% Full'
  });

  saveState();
  renderAll();
  showToast(`Logged restock (+${items} units) for ${machineId}.`);
}

function handleAddTicket(event) {
  event.preventDefault();
  const machineId = document.getElementById('new-ticket-machine').value;
  const desc = document.getElementById('new-ticket-desc').value.trim();
  const priority = document.getElementById('new-ticket-priority').value;
  const machine = appState.machines.find(m => m.id === machineId);

  appState.tickets.unshift({
    id: '#MT-' + (119 + appState.tickets.length),
    machine: machine ? `${machine.id} (${machine.location})` : machineId,
    desc,
    priority,
    status: 'In Progress'
  });

  saveState();
  renderAll();
  closeModal('ticket-modal');
  event.target.reset();
  showToast(`Maintenance ticket created for ${machineId}.`);
}

function toggleTicketStatus(idx) {
  const ticket = appState.tickets[idx];
  if (!ticket) return;
  ticket.status = ticket.status === 'Resolved' ? 'In Progress' : 'Resolved';
  saveState();
  renderAll();
  showToast(`Ticket ${ticket.id} marked as ${ticket.status}.`);
}

function exportSalesCSV() {
  const headers = ['Reference', 'Date_Time', 'Terminal', 'Item', 'Payment_Method', 'Gross_PHP'];
  const rows = appState.transactions.map(t =>
    [t.id, `"${t.time}"`, t.machine, `"${t.item}"`, t.method, t.amount.toFixed(2)].join(',')
  );
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', 'vendtrack_sales_ledger.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Exported vendtrack_sales_ledger.csv');
}