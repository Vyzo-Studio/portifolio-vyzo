const { test, expect } = require('@playwright/test');

const URL = 'http://127.0.0.1:4173/?animacoes=1&v=v5-smoke';

test.beforeEach(async ({ page }) => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.service-card')).toHaveCount(4);
  await expect(page.locator('.process-step')).toHaveCount(6);
});

test('carrossel: botões, limites, indicadores e seleção de serviço', async ({ page }) => {
  const rail = page.locator('#services-grid');
  const prev = page.locator('#services-prev');
  const next = page.locator('#services-next');
  await expect(prev).toBeDisabled();
  await expect(next).toBeEnabled();
  await next.click();
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(40);
  await expect(prev).toBeEnabled();
  const dots = page.locator('.services-dot');
  await expect(dots).toHaveCount(4);
  await dots.last().click();
  await expect.poll(() => rail.evaluate(el => Math.round(el.scrollLeft + el.clientWidth - el.scrollWidth)), {timeout:4500}).toBeGreaterThan(-4);
  await expect(next).toBeDisabled();
  await dots.first().click();
  await expect.poll(() => rail.evaluate(el => el.scrollLeft), {timeout:4500}).toBeLessThan(5);
  await page.locator('.service-card').first().locator('.service-action').click();
  await expect(page.locator('#project-type')).toHaveValue('Identidade visual');
});

test('carrossel: controle por teclado e arraste/touch simulado', async ({ page }) => {
  await page.locator('#services-grid').focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => page.locator('#services-grid').evaluate(el => el.scrollLeft)).toBeGreaterThan(40);
  await page.keyboard.press('ArrowLeft');
  await expect.poll(() => page.locator('#services-grid').evaluate(el => el.scrollLeft),{timeout:4000}).toBeLessThan(5);
});

test('processo: etapas, seleção por clique e teclado, sem carrossel', async ({ page }) => {
  const steps = page.locator('.process-step');
  await expect(steps).toHaveCount(6);
  await steps.last().click();
  await expect(page.locator('#process-active-title')).toHaveText('Entrega');
  await expect(steps.last()).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#process-active-description')).toContainText('Organizamos');
  await steps.last().focus();
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('#process-active-title')).toHaveText('Refinamento');
  await expect(page.locator('#process-list')).not.toHaveClass(/services-rail/);
});

test('briefing: prazo removido, validação, texto e Direct', async ({ page }) => {
  await expect(page.locator('#project-timeline')).toHaveCount(0);
  await page.locator('#client-name').fill('Pessoa Teste');
  await page.locator('#client-contact').fill('@exemploteste');
  await page.locator('#project-type').selectOption('Website');
  await page.locator('#project-description').fill('Preciso de uma nova página institucional para meu negócio.');
  await page.locator('#project-form button[type=submit]').click();
  await expect(page.locator('#form-feedback')).toBeVisible();
  const text = await page.locator('#brief-preview').inputValue();
  expect(text).toContain('Pessoa Teste');
  expect(text).toContain('Website');
  expect(text).not.toMatch(/prazo|timeline/i);
  await expect(page.locator('#open-direct')).toHaveAttribute('href',/ig\.me\/m\/vyzo_std/);
});

test('portfólio: filtros e janela de projeto', async ({ page }) => {
  await expect(page.locator('.project-card')).toHaveCount(4);
  await page.locator('[data-filter="web"]').click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.locator('.project-card .project-media').click();
  await expect(page.locator('#case-modal')).toBeVisible();
  await expect(page.locator('#modal-title')).toBeVisible();
  await page.locator('#modal-close').click();
  await expect(page.locator('#case-modal')).toBeHidden();
});

test('cinematic reveal: uma vez, sem reocultar ao subir', async ({ page }) => {
  const target=page.locator('.section-about .about-intro');
  await target.scrollIntoViewIfNeeded();
  await expect.poll(()=>target.getAttribute('data-cinema'),{timeout:4500}).toBe('visible');
  await page.evaluate(()=>scrollTo(0,0));
  await page.waitForTimeout(150);
  expect(await target.getAttribute('data-cinema')).toBe('visible');
});

for (const width of [320,360,375,390,430,768,1024,1366,1440,1920]) {
  test('responsivo '+width+'px: sem overflow horizontal e elementos presentes', async ({ browser }) => {
    const page=await browser.newPage({viewport:{width,height:820},reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(URL,{waitUntil:'domcontentloaded'});
    await expect(page.locator('.service-card')).toHaveCount(4);
    await expect(page.locator('.process-step')).toHaveCount(6);
    const dimension=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,vw:innerWidth,rail:document.getElementById('services-grid').scrollWidth,
      client:document.getElementById('services-grid').clientWidth}));
    expect(dimension.doc).toBeLessThanOrEqual(dimension.vw+2);
    expect(dimension.rail).toBeGreaterThan(dimension.client);
    expect(errors).toEqual([]);
    await page.close();
  });
}
