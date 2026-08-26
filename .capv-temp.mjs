import { chromium } from 'playwright-core';
const OUT = process.env.SHOT;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto(`file://${OUT}/prueba-kling26.mp4`);
const dur = await page.evaluate(async () => {
  const v = document.querySelector('video');
  v.pause();
  if (!isFinite(v.duration)) {
    await new Promise(r => v.addEventListener('loadedmetadata', r, { once: true }));
  }
  return v.duration;
});
for (const f of [0, 0.25, 0.5, 0.75, 0.98]) {
  await page.evaluate(async (t) => {
    const v = document.querySelector('video');
    v.currentTime = t;
    await new Promise(r => (v.onseeked = r));
  }, dur * f);
  await page.screenshot({ path: `${OUT}/prueba-t${Math.round(f * 100)}.png` });
}
console.log('duracion:', dur);
await browser.close();
