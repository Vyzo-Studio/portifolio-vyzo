const {defineConfig,devices} = require('@playwright/test');
module.exports=defineConfig({
  testDir:'./qa',
  timeout:25000,
  expect:{timeout:7000},
  retries:0,
  use:{...devices['Desktop Chrome'],browserName:'chromium',headless:true,viewport:{width:1366,height:820},reducedMotion:'no-preference'},
  projects:[{name:'chromium',use:{browserName:'chromium'}}]
});