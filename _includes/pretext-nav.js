// Shared pretext canvas rendering for header and footer
// Expects: SITE_DATA global with { title, email, github, twitter }

import { prepareWithSegments, layoutWithLines } from 'https://esm.sh/@chenglou/pretext@0.0.4'

const PAD = 48
const SITE_FONT = '700 28px "JetBrains Mono", monospace'
const LINK_FONT = '400 12px "JetBrains Mono", monospace'
const FOOTER_FONT = '300 11px "JetBrains Mono", monospace'
const COL_TITLE = '#e8e8e8'
const COL_LINK = '#555'
const COL_SEP = '#222'
const COL_FOOTER = '#333'
const BG = '#0a0a0a'

await document.fonts.load(SITE_FONT)
await document.fonts.load(LINK_FONT)
await document.fonts.ready

export function renderHeader(canvas, data) {
  const hitRegions = []
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const cssW = Math.min(window.innerWidth, 820)
  const maxW = cssW - PAD * 2

  const titlePrep = prepareWithSegments(data.title, SITE_FONT)
  const titleLayout = layoutWithLines(titlePrep, maxW, 36)

  let totalH = PAD
  totalH += titleLayout.height + 20 // title
  totalH += 18 + 24                 // nav links
  totalH += 1 + 24                  // separator

  canvas.width = cssW * dpr
  canvas.height = totalH * dpr
  canvas.style.width = cssW + 'px'
  canvas.style.height = totalH + 'px'
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, cssW, totalH)
  ctx.textBaseline = 'top'

  let y = PAD

  // Site title
  ctx.font = SITE_FONT
  ctx.fillStyle = COL_TITLE
  for (let i = 0; i < titleLayout.lines.length; i++) {
    ctx.fillText(titleLayout.lines[i].text, PAD, y + i * 36)
  }
  hitRegions.push({ x: PAD, y: y, w: titleLayout.lines[0].width, h: titleLayout.height, url: '/' })
  y += titleLayout.height + 20

  // Nav links
  ctx.font = LINK_FONT
  ctx.fillStyle = COL_LINK
  const navItems = [
    { label: '> home', url: '/' },
    { label: '> about', url: '/about' },
    data.github ? { label: '> github', url: 'https://github.com/' + data.github } : null,
    data.twitter ? { label: '> twitter', url: 'https://twitter.com/' + data.twitter } : null,
    { label: '> mail', url: 'mailto:' + data.email }
  ].filter(Boolean)

  let navX = PAD
  for (const item of navItems) {
    const w = ctx.measureText(item.label).width
    ctx.fillText(item.label, navX, y)
    hitRegions.push({ x: navX, y: y - 2, w, h: 18, url: item.url })
    navX += w + 28
  }
  y += 18 + 24

  // Separator
  ctx.fillStyle = COL_SEP
  ctx.fillRect(PAD, y, maxW, 1)

  return hitRegions
}

export function renderFooter(canvas, data) {
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const cssW = Math.min(window.innerWidth, 820)
  const maxW = cssW - PAD * 2

  const totalH = 60

  canvas.width = cssW * dpr
  canvas.height = totalH * dpr
  canvas.style.width = cssW + 'px'
  canvas.style.height = totalH + 'px'
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, cssW, totalH)
  ctx.textBaseline = 'top'

  // Separator
  ctx.fillStyle = COL_SEP
  ctx.fillRect(PAD, 16, maxW, 1)

  // Footer text
  ctx.font = FOOTER_FONT
  ctx.fillStyle = COL_FOOTER
  const parts = [
    data.github ? 'gh/' + data.github : null,
    data.twitter ? '@' + data.twitter : null,
    data.email
  ].filter(Boolean)
  ctx.fillText(parts.join('    '), PAD, 32)
}

export function setupHitRegions(canvas, regions) {
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    for (const r of regions) {
      if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
        if (r.url.startsWith('http') || r.url.startsWith('mailto:')) {
          window.open(r.url, '_blank')
        } else {
          window.location.href = r.url
        }
        return
      }
    }
  })
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    let over = false
    for (const r of regions) {
      if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
        over = true
        break
      }
    }
    canvas.style.cursor = over ? 'pointer' : 'default'
  })
}
