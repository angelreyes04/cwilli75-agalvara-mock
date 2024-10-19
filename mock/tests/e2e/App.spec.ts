import { test, expect } from '@playwright/test';

test.describe('Mock Application Tests', () => {
  async function login(page) {
    await page.waitForSelector('button[aria-label="Login"]', { state: 'visible', timeout: 5000 });
    const loginButton = page.locator('button[aria-label="Login"]')
      .or(page.getByRole('button', { name: 'Login' }))
      .or(page.locator('button:has-text("Login")'));
    await loginButton.click();
    await page.waitForSelector('button[aria-label="Sign Out"]', { state: 'visible', timeout: 5000 });
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000');
    if (test.info().title !== 'login functionality') {
      await login(page);
    }
  });

  test('initial state - dropdown is present and no table is shown', async ({ page }) => {
    const dropdown = await page.locator('select.dropdown');
    await expect(dropdown).toBeVisible();
    const table = await page.locator('table');
    await expect(table).not.toBeVisible();
  });

  test('selecting a dataset displays the correct table', async ({ page }) => {
    await page.selectOption('select.dropdown', 'Basic Dataset');
    await page.waitForSelector('table tr:nth-child(2)');
    const headers = await page.locator('th').allInnerTexts();
    const names = await page.locator('tr td:nth-child(2)').allInnerTexts();
    const firstRowName = names[0];
    expect(headers).toEqual(['id', 'name', 'age']);
    expect(firstRowName).toBe('John Doe');
  });

  test('switching between datasets updates the table correctly', async ({ page }) => {
    async function getDetailedTableData() {
      const headers = await page.locator('th').allInnerTexts();
      const rows = await page.locator('tbody tr').all();
      const rowData = await Promise.all(rows.map(async (row) => {
        const cells = await row.locator('td').allInnerTexts();
        return cells;
      }));
      return { headers, rowData };
    }  
    await page.selectOption('select.dropdown', 'Basic Dataset');
    await page.waitForSelector('table tr:nth-child(2)');
    const basicDatasetData = await getDetailedTableData();

    await page.selectOption('select.dropdown', 'Many Columns Dataset');
    await page.waitForSelector('table tr:nth-child(2)');
    const manyColumnsDatasetData = await getDetailedTableData();

    expect(basicDatasetData.rowData[0][1]).toBe('John Doe');
    expect(manyColumnsDatasetData.rowData[0][1]).toBe('John');
    expect(manyColumnsDatasetData.headers).toContain('salary');
    expect(manyColumnsDatasetData.headers).toContain('startDate');
  });


  test('empty dataset handling', async ({ page }) => {
    await page.selectOption('select.dropdown', 'Empty Dataset');
    const noDataMessage = page.locator('div:text("No data available")');
    await expect(noDataMessage).toBeVisible();
  });

  test('long text handling in table cells', async ({ page }) => {
    await page.selectOption('select.dropdown', 'Long Text Dataset');
    
    const longTextCell = await page.locator('tr:nth-child(2) td:nth-child(3)');
    const cellContent = await longTextCell.textContent();
    expect(cellContent?.length).toBeGreaterThan(100);
  });

  test('special characters handling', async ({ page }) => {
    await page.selectOption('select.dropdown', 'Special Characters Dataset');
    
    const specialCharCell = page.locator('tr:nth-child(2) td:nth-child(2)');
    const cellContent = await specialCharCell.textContent();
    expect(cellContent).toBe('Zoë Müller');
  });

  test('responsive design - mobile view', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 360, height: 640 });

    const dropdown = page.locator('select.dropdown');
    await expect(dropdown).toBeVisible();

    await page.selectOption('select.dropdown', 'Many Columns Dataset');
    
    const table = page.locator('table');
    await expect(table).toBeVisible();

    const tableContainer = page.locator('.table-container');
    const hasHorizontalScrollbar = await tableContainer.evaluate((el) => {
      return el.scrollWidth > el.clientWidth;
    });
    expect(hasHorizontalScrollbar).toBe(true);

    const headers = await page.locator('th').allTextContents();
    expect(headers).toEqual(['id', 'name', 'age', 'city', 'job', 'salary', 'startDate']);
    const lastColumnContent = await page.locator('tr:first-child td:last-child').textContent();
    expect(lastColumnContent).toBeTruthy();
  });

  test('vertical scrolling for many rows', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.selectOption('select.dropdown', 'Many Rows Dataset');
    
    const table = page.locator('table');
    await expect(table).toBeVisible();
    const tableContainer = await page.locator('.table-container');
    const hasVerticalScrollbar = await tableContainer.evaluate((el) => {
      return el.scrollHeight > el.clientHeight;
    });
    expect(hasVerticalScrollbar).toBe(true);

    await tableContainer.evaluate((el) => el.scrollTop = el.scrollHeight);
    const lastRowContent = await page.locator('tr:last-child td:first-child').textContent();
    expect(lastRowContent).toBe('1000');
  });


  test('renders bar chart correctly', async ({ page }) => {
    await page.selectOption('select.dropdown', 'Simple Bar Chart Data' );
    await page.waitForSelector('button:has-text("Bar Chart")');
    await page.click('button:has-text("Bar Chart")');
    
    await page.waitForSelector('canvas');
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    const chartContainer = page.locator('.chart-wrapper');
    await expect(chartContainer).toBeVisible();
  });

  test('displays error message for invalid data', async ({ page }) => {
    await page.selectOption('select.dropdown', 'Invalid Data');
    await page.waitForSelector('button:has-text("Bar Chart")');
    await page.click('button:has-text("Bar Chart")');
    
    await page.waitForSelector('.error-message');
    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('No numeric columns found for Y-axis');
  });

  test('navigate between datasets and visualizations', async ({ page }) => {
    // Function to check if table is visible and has content
    async function checkTable() {
      const table = page.locator('table');
      await expect(table).toBeVisible();
      const rows = await table.locator('tr').count();
      expect(rows).toBeGreaterThan(1); // At least header row and one data row
    }

    // Function to check if bar chart is visible
    async function checkBarChart() {
      const chartWrapper = page.locator('.chart-wrapper');
      await expect(chartWrapper).toBeVisible();
      const canvas = chartWrapper.locator('canvas');
      await expect(canvas).toBeVisible();
    }

    // Start with 'Simple Bar Chart' dataset in table view
    await page.selectOption('select.dropdown','Simple Bar Chart Data');
    await checkTable();

    // Switch to bar chart view
    await page.click('button:has-text("Bar Chart")');
    await checkBarChart();

    /*
    // Check flip axes functionality
    const flipButton = page.locator('button:has-text("Flip Axes")');
    await expect(flipButton).toBeVisible();
    await flipButton.click();
    await expect(page.locator('.chart-wrapper')).toHaveAttribute('data-index-axis', 'y');
    */

    // Switch back to table view
    await page.click('button:has-text("Table View")');
    await checkTable();

    // Switch to 'Many Columns Dataset'
    await page.selectOption('select.dropdown', 'Many Columns Dataset');
    await checkTable();

    // Verify more columns are present
    const headers = await page.locator('th').allTextContents();
    expect(headers.length).toBeGreaterThan(3); // Assuming 'Many Columns' has more than 3 columns

    // Switch to bar chart view for 'Many Columns Dataset'
    await page.click('button:has-text("Bar Chart")');
    await checkBarChart();

    // Switch to 'Invalid Data' dataset
    await page.selectOption('select.dropdown', 'Invalid Data');
    
    // Check for error message in bar chart view
    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('No numeric columns found for Y-axis');

    // Switch back to table view for 'Invalid Data'
    await page.click('button:has-text("Table View")');
    await checkTable();

    // Finally, switch back to 'Simple Bar Chart' and verify bar chart
    await page.selectOption('select.dropdown', 'Simple Bar Chart Data');
    await page.click('button:has-text("Bar Chart")');
    await checkBarChart();

    // Verify the chart title
    const chartTitle = await page.locator('.bar-chart-container h2').textContent();
    expect(chartTitle).toBe('Simple Bar Chart Data');
  });
});