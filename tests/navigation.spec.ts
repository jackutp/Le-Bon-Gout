import { test, expect } from '@playwright/test';

test('debe navegar a la página de reservas desde la navbar', async ({ page }) => {
  // Nota: Esto asume que el servidor está corriendo en localhost:3000
  await page.goto('http://localhost:3000/');
  
  // Click en el botón de RESERVAS
  await page.click('text=RESERVAS');
  
  // Verificar que la URL cambie
  await expect(page).toHaveURL(/.*reservas/);
});
