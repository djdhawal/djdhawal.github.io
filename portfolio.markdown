---
layout: page
title: Portfolio
permalink: /portfolio/
---

## research work

_TBD — add research papers, preprints, and ongoing investigations here._

## projects

_TBD — add selected projects with links and short descriptions here._

## skills

- **languages** — Python, C++, C#, R, SQL
- **ml & modelling** — PyTorch, JAX/Flax/Optax, NumPyro, scikit-learn, LightGBM, TensorFlow, Keras
- **nlp & llms** — Transformers, spaCy, NLTK, LangChain, Langfuse, vLLM
- **data infrastructure** — Spark, Delta Lake, Hive/Impala, HDFS/YARN, Microsoft Fabric
- **ml & data ops** — MLflow, Dataiku, SSMS, Linux, Modal, Weights & Biases

<style>
  .rv-char { visibility: hidden; }
  .rv-char.rv-on { visibility: visible; }
  .rv-char.rv-scramble { color: #3a3a3a; }
</style>

<script>
(function () {
  var DURATION = 2600   // ms from the first character landing to the last
  var SETTLE   = 320    // ms a character spends scrambling before it lands
  var TICK     = 55     // ms between glyph swaps while scrambling
  var GLYPHS   = '!<>-_\\/[]{}=+*^?#%$&01'

  var list = document.querySelector('#skills + ul')
  if (!list) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  function glyph() {
    return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length))
  }

  // Wrap every non-space character in its own span. Spaces stay as plain text
  // so the list still wraps at word boundaries.
  var walker = document.createTreeWalker(list, NodeFilter.SHOW_TEXT)
  var nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)

  var chars = []
  nodes.forEach(function (node) {
    var frag = document.createDocumentFragment()
    Array.prototype.forEach.call(node.nodeValue, function (ch) {
      if (ch === ' ' || ch === '\n' || ch === '\t') {
        frag.appendChild(document.createTextNode(ch))
        return
      }
      var span = document.createElement('span')
      span.className = 'rv-char'
      span.textContent = ch          // reserves the glyph's width while hidden
      frag.appendChild(span)
      chars.push({ span: span, final: ch, at: Math.random() * DURATION })
    })
    node.parentNode.replaceChild(frag, node)
  })
  if (!chars.length) return

  function run() {
    var start = performance.now()
    var lastTick = 0
    var pending = chars.slice()

    requestAnimationFrame(function frame(now) {
      var t = now - start
      var swap = now - lastTick >= TICK
      if (swap) lastTick = now

      var still = []
      for (var i = 0; i < pending.length; i++) {
        var c = pending[i]
        if (t >= c.at) {
          c.span.textContent = c.final
          c.span.className = 'rv-char rv-on'
        } else if (t >= c.at - SETTLE) {
          if (swap) c.span.textContent = glyph()
          c.span.className = 'rv-char rv-on rv-scramble'
          still.push(c)
        } else {
          still.push(c)
        }
      }
      pending = still
      if (pending.length) requestAnimationFrame(frame)
    })
  }

  // Hold until the section is actually on screen, but never leave the text
  // hidden: if the observer has not fired by then, just play it.
  var started = false
  function startOnce() {
    if (started) return
    started = true
    run()
  }

  if (!('IntersectionObserver' in window)) { startOnce(); return }
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) { io.disconnect(); startOnce() }
  }, { threshold: 0.15 })
  io.observe(list)
  setTimeout(startOnce, 5000)
})()
</script>
