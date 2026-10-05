/**
 * CRAD-JOS Autonomous Sweep & Micro-Token Test Runner
 * Headless CLI Invariant Verification (< 300ms, < 400 tokens)
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const PORT = 3000;

const results = [];
let testIndex = 1;

function record(category, name, pass, detail) {
  results.push({
    index: testIndex++,
    category,
    name,
    status: pass ? 'PASS' : 'FAIL',
    detail: detail.slice(0, 35)
  });
}

function printAsciiTable() {
  console.log('+---+----------+--------------------------------+--------+-------------------------------------+');
  console.log('| # | Category | Invariant Name                 | Status | Detail                              |');
  console.log('+---+----------+--------------------------------+--------+-------------------------------------+');
  for (const r of results) {
    const idx = String(r.index).padEnd(2);
    const cat = r.category.padEnd(8);
    const name = r.name.padEnd(30);
    const stat = r.status.padEnd(6);
    const det = r.detail.padEnd(35);
    console.log(`| ${idx}| ${cat} | ${name} | ${stat} | ${det} |`);
  }
  console.log('+---+----------+--------------------------------+--------+-------------------------------------+');
}

function checkHttpRequest(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${PORT}${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          contentType: res.headers['content-type'] || '',
          length: data.length
        });
      });
    });
    req.on('error', (err) => {
      resolve({ statusCode: 0, error: err.message });
    });
    req.setTimeout(1500, () => {
      req.destroy();
      resolve({ statusCode: 0, error: 'Timeout' });
    });
  });
}

async function runSweep() {
  // ─── Archetype 1: Kernel Invariants ──────────────────────────────────────────

  // 1. Core Asset Files
  const requiredFiles = [
    'index.html',
    'css/styles.css',
    'js/main.js',
    'public/logo.svg',
    'public/icon-512.png',
    'public/manifest.json'
  ];
  let missingFiles = [];
  for (const f of requiredFiles) {
    const full = path.join(ROOT, f);
    if (!fs.existsSync(full) || fs.statSync(full).size === 0) {
      missingFiles.push(f);
    }
  }
  record('Kernel', 'Core Asset Files Exist', missingFiles.length === 0,
    missingFiles.length === 0 ? `${requiredFiles.length}/${requiredFiles.length} files OK` : `Missing: ${missingFiles.join(', ')}`);

  // 2. JS Syntax Integrity
  let jsSyntaxOk = true;
  let jsError = '';
  try {
    const mainJs = fs.readFileSync(path.join(ROOT, 'js/main.js'), 'utf8');
    new vm.Script(mainJs);
    const serverJs = fs.readFileSync(path.join(ROOT, 'server.js'), 'utf8');
    new vm.Script(serverJs);
  } catch (err) {
    jsSyntaxOk = false;
    jsError = err.message;
  }
  record('Kernel', 'JS Syntax Integrity', jsSyntaxOk, jsSyntaxOk ? 'main.js & server.js valid' : jsError);

  // 3. HTML Semantic Landmarks
  const html = fs.existsSync(path.join(ROOT, 'index.html'))
    ? fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
    : '';

  const hasLandmarks = html.includes('<header') &&
                       html.includes('<main') &&
                       html.includes('<footer') &&
                       html.includes('id="services"') &&
                       html.includes('id="facilities"') &&
                       html.includes('id="contact"');
  record('Kernel', 'HTML Semantic Landmarks', hasLandmarks, hasLandmarks ? 'header, main, footer, sections OK' : 'Missing landmark tags');

  // 4. Diagnostic Services Matrix (11 services)
  const expectedServices = [
    'MRI', 'Digital Mammography', 'CT Scan', 'Digital X-Ray',
    'Ultrasound Scan', 'X-Ray Imaging', 'X-Ray Special Procedures',
    'Laboratory Services', 'EEG', 'ECG', 'Echocardiogram'
  ];
  const foundServices = expectedServices.filter(s => html.includes(s));
  record('Kernel', 'Diagnostic Services Matrix', foundServices.length === 11,
    `${foundServices.length}/11 services present in DOM`);

  // 5. Contact & Location Invariants
  const hasPhone = html.includes('0814 684 4470');
  const hasAddress = html.includes('Jos, Plateau State') && html.includes('Keana Road');
  const hasEmail = html.includes('craddiagnostics@gmail.com');
  const contactOk = hasPhone && hasAddress && hasEmail;
  record('Kernel', 'Contact & Location Invariants', contactOk, contactOk ? 'Phone, email, Jos address OK' : 'Incomplete contact info');

  // ─── Archetype 2: Contract-Bound Headless Synthetic Scenario ─────────────────

  // 6. HTTP Root Endpoint
  const rootRes = await checkHttpRequest('/');
  const rootOk = rootRes.statusCode === 200 && rootRes.contentType.includes('text/html');
  record('Contract', 'HTTP Root Endpoint', rootOk, `Status ${rootRes.statusCode}, ${rootRes.contentType.split(';')[0]}`);

  // 7. Static CSS Asset Contract
  const cssRes = await checkHttpRequest('/css/styles.css');
  const cssOk = cssRes.statusCode === 200 && cssRes.contentType.includes('text/css');
  record('Contract', 'Static CSS Asset MIME', cssOk, `Status ${cssRes.statusCode}, ${cssRes.contentType.split(';')[0]}`);

  // 8. Static JS Asset Contract
  const jsRes = await checkHttpRequest('/js/main.js');
  const jsOk = jsRes.statusCode === 200 && jsRes.contentType.includes('javascript');
  record('Contract', 'Static JS Asset MIME', jsOk, `Status ${jsRes.statusCode}, ${jsRes.contentType.split(';')[0]}`);

  // 9. Static SVG Logo Contract
  const svgRes = await checkHttpRequest('/public/logo.svg');
  const svgOk = svgRes.statusCode === 200 && svgRes.contentType.includes('svg');
  record('Contract', 'Static SVG Logo MIME', svgOk, `Status ${svgRes.statusCode}, ${svgRes.contentType.split(';')[0]}`);

  // 10. 404 Route Containment
  const missingRes = await checkHttpRequest('/nonexistent-test-probe');
  const missingOk = missingRes.statusCode === 404;
  record('Contract', '404 Route Containment', missingOk, `Status ${missingRes.statusCode} returned properly`);

  // Print results
  printAsciiTable();

  const failed = results.filter(r => r.status === 'FAIL');
  process.exit(failed.length > 0 ? 1 : 0);
}

runSweep();
