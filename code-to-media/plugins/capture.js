const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

;(async () => {
  // 启动无头浏览器
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  // 导航到你的HTML页面
  await page.goto('file:///path/to/your/htmlfile.html')

  // 设置视口大小（可选）
  await page.setViewport({ width: 375, height: 667 })

  // 捕获帧的目录
  const outputDir = './frames'
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  // 捕获初始帧
  await page.screenshot({ path: path.join(outputDir, 'frame-0000.png') })

  // 这里你可以添加逻辑来动态改变页面内容并捕获更多帧
  // 例如，使用setTimeout模拟页面变化
  for (let i = 1; i < 100; i++) {
    // 假设你想捕获100帧
    await page.evaluate(() => {
      // 这里添加你的JavaScript代码来动态改变页面内容
      // 例如，模拟一个动画或更新页面数据
    })
    await page.waitForTimeout(100) // 等待100毫秒
    await page.screenshot({ path: path.join(outputDir, `frame-${String(i).padStart(4, '0')}.png`) })
  }

  // 关闭浏览器
  await browser.close()
})()
