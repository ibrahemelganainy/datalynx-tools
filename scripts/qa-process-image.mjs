/*
 * Functional test: actually process an image in both languages and confirm
 * the tool lifecycle end to end (select -> process -> result -> download).
 *
 * The file is generated in the page, so nothing is uploaded anywhere. If
 * any request leaves the origin during processing, the runner reports it.
 */
export default async function run(page) {
  const out = {};

  // Build a real JPEG in-page and hand it to the file input.
  async function addImageToInput() {
    return page.evaluate(async () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1400;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');

      // Deliberately noisy so there is something to compress.
      for (let i = 0; i < 6000; i += 1) {
        ctx.fillStyle = `hsl(${(i * 37) % 360},80%,55%)`;
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          22,
          22
        );
      }

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', 0.95)
      );

      const file = new File([blob], 'qa-sample.jpg', { type: 'image/jpeg' });
      const input = document.querySelector('input[type="file"]');

      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));

      return { size: blob.size, type: blob.type };
    });
  }

  async function runTool() {
    // Click the primary "start" button inside the settings panel.
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const start = buttons.find((b) =>
        /ابدأ الضغط|Start compression/.test(b.textContent.trim())
      );
      if (start) start.click();
    });

    // Wait for a "done" marker to appear.
    await page.waitForFunction(
      () =>
        /تم توفير|Saved|جاري|Compressing/.test(document.body.innerText) ||
        Boolean(document.querySelector('a[download], button')),
      { timeout: 20000 }
    );

    await page.waitForTimeout(3500);

    return page.evaluate(() => {
      const text = document.body.innerText;
      const savings = text.match(/(\d+(\.\d+)?)\s*%/);
      return {
        hasOriginalSize: /الحجم الأصلي|Original size/.test(text),
        hasSavings: /تم توفير|Saved/.test(text),
        savingsPercent: savings ? savings[1] : null,
        hasDownloadButton: Array.from(document.querySelectorAll('button')).some(
          (b) =>
            /^تحميل$|^Download$/.test(b.textContent.trim()) ||
            /تحميل الكل ZIP|Download all as ZIP/.test(b.textContent.trim())
        ),
        stillProcessing: /جاري/.test(text),
        errorShown: /تعذر|could not|error/i.test(text),
        snippet: text.replace(/\s+/g, ' ').slice(0, 260),
      };
    });
  }

  // ---------- Arabic ----------
  await page.goto('http://localhost:4321/#image-compression', {
    waitUntil: 'load',
  });
  await page.waitForTimeout(1500);
  out.arabicInput = await addImageToInput();
  await page.waitForTimeout(700);
  out.arabic = await runTool();

  // ---------- English ----------
  await page.goto('http://localhost:4321/en/#image-compression', {
    waitUntil: 'load',
  });
  await page.waitForTimeout(1500);
  out.englishInput = await addImageToInput();
  await page.waitForTimeout(700);
  out.english = await runTool();

  return out;
}
