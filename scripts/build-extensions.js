const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://calculator-net-web-2026.web.app';

const calculators = [
    { id: 'bmi-calculator', path: '/health/bmi-calculator', name: 'BMI Calculator', desc: 'Fast and free body mass index calculator.' },
    { id: 'mortgage-calculator', path: '/financial/mortgage-calculator', name: 'Mortgage Calculator', desc: 'Estimate monthly mortgage payments instantly.' },
    { id: 'scientific-calculator', path: '/math/scientific-calculator', name: 'Scientific Calculator', desc: 'Free online scientific calculator.' },
    { id: 'percentage-calculator', path: '/math/percentage-calculator', name: 'Percentage Calculator', desc: 'Free percentage calculator for % mathematics.' }
];

const extensionsDir = path.join(__dirname, '..', 'extensions');

if (!fs.existsSync(extensionsDir)) {
    fs.mkdirSync(extensionsDir);
}

calculators.forEach(calc => {
    const calcDir = path.join(extensionsDir, calc.id);
    if (!fs.existsSync(calcDir)) {
        fs.mkdirSync(calcDir, { recursive: true });
    }

    // manifest.json
    const manifest = {
        manifest_version: 3,
        name: calc.name,
        version: "1.0.0",
        description: calc.desc,
        action: {
            default_popup: "popup.html",
            default_title: calc.name
        },
        icons: {
            "128": "icon.png"
        }
    };

    fs.writeFileSync(path.join(calcDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

    // popup.html (iframe wrapper)
    // To allow iframe to work smoothly in Chrome extension popup, we just embed it.
    const popupHtml = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 0; width: 450px; height: 600px; overflow: hidden; }
    iframe { width: 100%; height: 100%; border: none; }
  </style>
</head>
<body>
  <iframe src="${BASE_URL}${calc.path}?utm_source=extension"></iframe>
</body>
</html>`;

    fs.writeFileSync(path.join(calcDir, 'popup.html'), popupHtml);

    // create a dummy 128x128 icon block
    const dummyIconSvg = `<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" fill="#2563eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="sans-serif">${calc.name.charAt(0)}</text></svg>`;
    // Since Chrome requires PNG we will just put our dummy script logic to tell the user they need a PNG later, or we can just drop the icon for the script and let manifest use default icon by removing it from manifest.
});

// Remove icons from manifest so we dont get errors while loading unpacked extension without images
calculators.forEach(calc => {
    const calcDir = path.join(extensionsDir, calc.id);
    const manifestPath = path.join(calcDir, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath));
    delete manifest.icons;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
});

console.log('Extensions built successfully in /extensions directory!');
