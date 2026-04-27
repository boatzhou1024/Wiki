---
title: 在线工具箱
description: 常用的开发者小工具集合，包括 JSON 格式化、Base64 编解码、URL 编解码和时间戳转换。
---

<script setup>
import { ref, computed, onMounted } from 'vue'

// ── JSON 格式化 ──────────────────────────────────────────
const jsonInput = ref('')
const jsonOutput = ref('')
const jsonError = ref('')
const jsonIndent = ref(2)

function formatJson() {
  jsonError.value = ''
  jsonOutput.value = ''
  try {
    const parsed = JSON.parse(jsonInput.value)
    jsonOutput.value = JSON.stringify(parsed, null, Number(jsonIndent.value))
  } catch (e) {
    jsonError.value = e.message
  }
}

function minifyJson() {
  jsonError.value = ''
  jsonOutput.value = ''
  try {
    const parsed = JSON.parse(jsonInput.value)
    jsonOutput.value = JSON.stringify(parsed)
  } catch (e) {
    jsonError.value = e.message
  }
}

function clearJson() {
  jsonInput.value = ''
  jsonOutput.value = ''
  jsonError.value = ''
}

// ── Base64 ──────────────────────────────────────────────
const b64Input = ref('')
const b64Output = ref('')
const b64Error = ref('')

function b64Encode() {
  b64Error.value = ''
  try {
    b64Output.value = btoa(unescape(encodeURIComponent(b64Input.value)))
  } catch (e) {
    b64Error.value = '编码失败：' + e.message
  }
}

function b64Decode() {
  b64Error.value = ''
  try {
    b64Output.value = decodeURIComponent(escape(atob(b64Input.value)))
  } catch (e) {
    b64Error.value = '解码失败：请确认输入是合法的 Base64 字符串'
  }
}

function clearB64() {
  b64Input.value = ''
  b64Output.value = ''
  b64Error.value = ''
}

// ── URL 编解码 ────────────────────────────────────────────
const urlInput = ref('')
const urlOutput = ref('')
const urlError = ref('')

function urlEncode() {
  urlError.value = ''
  try {
    urlOutput.value = encodeURIComponent(urlInput.value)
  } catch (e) {
    urlError.value = e.message
  }
}

function urlDecode() {
  urlError.value = ''
  try {
    urlOutput.value = decodeURIComponent(urlInput.value)
  } catch (e) {
    urlError.value = '解码失败：URL 格式不合法'
  }
}

function clearUrl() {
  urlInput.value = ''
  urlOutput.value = ''
  urlError.value = ''
}

// ── 时间戳转换 ────────────────────────────────────────────
const tsInput = ref('')
const tsResult = ref('')
const nowTs = ref('')
const dateInput = ref('')
const dateToTs = ref('')

// onMounted 保证 SSR 兼容：仅在客户端执行
onMounted(() => {
  nowTs.value = String(Math.floor(Date.now() / 1000))
  tsInput.value = nowTs.value
  convertTs()

  const now = new Date()
  const pad = n => String(n).padStart(2, '0')
  dateInput.value = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  convertDate()
})

function convertTs() {
  tsResult.value = ''
  const raw = tsInput.value.trim()
  if (!raw) return
  let ms = Number(raw)
  if (isNaN(ms)) { tsResult.value = '❌ 请输入合法数字'; return }
  // 自动识别秒级 / 毫秒级
  if (raw.length <= 10) ms *= 1000
  const d = new Date(ms)
  tsResult.value = isNaN(d.getTime()) ? '❌ 无效时间戳' : d.toLocaleString('zh-CN', { hour12: false })
}

function useNow() {
  nowTs.value = String(Math.floor(Date.now() / 1000))
  tsInput.value = nowTs.value
  convertTs()
}

function convertDate() {
  dateToTs.value = ''
  const d = new Date(dateInput.value)
  dateToTs.value = isNaN(d.getTime())
    ? '❌ 请输入格式如 2024-01-01 12:00:00 的日期'
    : String(Math.floor(d.getTime() / 1000))
}

// ── 通用复制 ──────────────────────────────────────────────
const copiedKey = ref('')
async function copyText(text, key) {
  if (!text) return
  await navigator.clipboard.writeText(text)
  copiedKey.value = key
  setTimeout(() => { copiedKey.value = '' }, 1500)
}
</script>

# 🧰 在线工具箱

> 常用开发者工具集合，所有操作均在浏览器本地完成，不会上传任何数据。

## 时间戳转换

<div :class="$style.card">
  <div :class="$style.tsGrid">
    <div :class="$style.tsBlock">
      <h4 :class="$style.tsTitle">时间戳 → 日期时间</h4>
      <div :class="$style.tsRow">
        <input
          v-model="tsInput"
          :class="$style.input"
          placeholder="输入时间戳（秒或毫秒）"
          type="number"
        />
        <button :class="$style.btn" @click="convertTs">转换</button>
        <button :class="[$style.btn, $style.secondary]" @click="useNow">当前时间</button>
      </div>
      <div v-if="tsResult" :class="[$style.tsResult, tsResult.startsWith('❌') && $style.error]">
        {{ tsResult }}
      </div>
      <p :class="$style.hint">当前 Unix 时间戳（秒）：<code>{{ nowTs }}</code></p>
    </div>
    <div :class="$style.tsBlock">
      <h4 :class="$style.tsTitle">日期时间 → 时间戳</h4>
      <div :class="$style.tsRow">
        <input
          v-model="dateInput"
          :class="$style.input"
          placeholder="2024-01-01 12:00:00"
        />
        <button :class="$style.btn" @click="convertDate">转换</button>
      </div>
      <div v-if="dateToTs" :class="[$style.tsResult, dateToTs.startsWith('❌') && $style.error]">
        {{ dateToTs.startsWith('❌') ? dateToTs : `Unix 时间戳（秒）：${dateToTs}` }}
        <button
          v-if="!dateToTs.startsWith('❌')"
          :class="[$style.copyBtn, copiedKey === 'ts' && $style.copied]"
          @click="copyText(dateToTs, 'ts')"
        >{{ copiedKey === 'ts' ? '✓ 已复制' : '复制' }}</button>
      </div>
    </div>
  </div>
</div>

## Base64 编解码

<div :class="$style.card">
  <div :class="$style.row">
    <div :class="$style.col">
      <label :class="$style.label">输入内容</label>
      <textarea
        v-model="b64Input"
        :class="$style.textarea"
        placeholder="输入文本或 Base64 字符串..."
        rows="6"
      />
    </div>
    <div :class="$style.col">
      <label :class="$style.label">
        输出结果
        <button
          :class="[$style.copyBtn, copiedKey === 'b64' && $style.copied]"
          @click="copyText(b64Output, 'b64')"
        >{{ copiedKey === 'b64' ? '✓ 已复制' : '复制' }}</button>
      </label>
      <textarea
        :value="b64Error || b64Output"
        :class="[$style.textarea, b64Error && $style.error]"
        readonly
        rows="6"
        placeholder="结果将显示在这里..."
      />
    </div>
  </div>

  <div :class="$style.toolbar">
    <button :class="$style.btn" @click="b64Encode">编码 →</button>
    <button :class="$style.btn" @click="b64Decode">← 解码</button>
    <button :class="[$style.btn, $style.secondary]" @click="clearB64">清空</button>
  </div>
</div>

## JSON 格式化 / 压缩

<div :class="$style.card">

<div :class="$style.row">
  <div :class="$style.col">
    <label :class="$style.label">输入 JSON</label>
    <textarea
      v-model="jsonInput"
      :class="$style.textarea"
      placeholder='{"name":"VitePress","version":2}'
      rows="10"
    />
  </div>
  <div :class="$style.col">
    <label :class="$style.label">
      输出结果
      <button
        :class="[$style.copyBtn, copiedKey === 'json' && $style.copied]"
        @click="copyText(jsonOutput, 'json')"
      >{{ copiedKey === 'json' ? '✓ 已复制' : '复制' }}</button>
    </label>
    <textarea
      :value="jsonError || jsonOutput"
      :class="[$style.textarea, jsonError && $style.error]"
      readonly
      rows="10"
      placeholder="结果将显示在这里..."
    />
  </div>
</div>

<div :class="$style.toolbar">
  <label :class="$style.inlineLabel">
    缩进空格数：
    <select v-model="jsonIndent" :class="$style.select">
      <option value="2">2</option>
      <option value="4">4</option>
      <option value="8">8</option>
    </select>
  </label>
  <button :class="$style.btn" @click="formatJson">格式化</button>
  <button :class="$style.btn" @click="minifyJson">压缩</button>
  <button :class="[$style.btn, $style.secondary]" @click="clearJson">清空</button>
</div>

</div>

## URL 编解码

<div :class="$style.card">

<div :class="$style.row">
  <div :class="$style.col">
    <label :class="$style.label">输入内容</label>
    <textarea
      v-model="urlInput"
      :class="$style.textarea"
      placeholder="输入 URL 或原始字符串..."
      rows="4"
    />
  </div>
  <div :class="$style.col">
    <label :class="$style.label">
      输出结果
      <button
        :class="[$style.copyBtn, copiedKey === 'url' && $style.copied]"
        @click="copyText(urlOutput, 'url')"
      >{{ copiedKey === 'url' ? '✓ 已复制' : '复制' }}</button>
    </label>
    <textarea
      :value="urlError || urlOutput"
      :class="[$style.textarea, urlError && $style.error]"
      readonly
      rows="4"
      placeholder="结果将显示在这里..."
    />
  </div>
</div>

<div :class="$style.toolbar">
  <button :class="$style.btn" @click="urlEncode">编码 →</button>
  <button :class="$style.btn" @click="urlDecode">← 解码</button>
  <button :class="[$style.btn, $style.secondary]" @click="clearUrl">清空</button>
</div>

</div>

<style module>
/* ── 卡片容器 ─────────────────────────────── */
.card {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 20px 24px 16px;
  margin: 16px 0 24px;
}

/* ── 两列布局 ─────────────────────────────── */
.row {
  display: flex;
  gap: 16px;
}
.col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* ── 标签行 ──────────────────────────────── */
.label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── 文本域 ──────────────────────────────── */
.textarea {
  width: 100%;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.6;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  resize: vertical;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}
.textarea.error {
  border-color: var(--vp-c-danger-1, #f53b57);
  color: var(--vp-c-danger-1, #f53b57);
}

/* ── 工具栏 ──────────────────────────────── */
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.inlineLabel {
  font-size: 13px;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ── 按钮 ────────────────────────────────── */
.btn {
  padding: 5px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--vp-button-brand-border, var(--vp-c-brand-1));
  background-color: var(--vp-button-brand-bg, var(--vp-c-brand-1));
  color: var(--vp-button-brand-text, #fff);
  transition: background 0.2s, opacity 0.2s;
}
.btn:hover {
  opacity: 0.85;
}
.btn.secondary {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}
.btn.secondary:hover {
  background-color: var(--vp-c-bg-soft);
}

/* ── 复制按钮 ─────────────────────────────── */
.copyBtn {
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  margin-left: auto;
}
.copyBtn.copied {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

/* ── Select ──────────────────────────────── */
.select {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  color: var(--vp-c-text-1);
  padding: 2px 6px;
  font-size: 13px;
}

/* ── 时间戳区域 ───────────────────────────── */
.tsGrid {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.tsBlock {
  flex: 1;
  min-width: 260px;
}
.tsTitle {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 10px;
}
.tsRow {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.input {
  flex: 1;
  min-width: 180px;
  padding: 5px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-family: var(--vp-font-family-mono);
}
.input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}
.tsResult {
  margin-top: 10px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 14px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  gap: 8px;
}
.tsResult.error {
  color: var(--vp-c-danger-1, #f53b57);
}
.hint {
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

/* ── 响应式 ──────────────────────────────── */
@media (max-width: 640px) {
  .row {
    flex-direction: column;
  }
  .tsGrid {
    flex-direction: column;
  }
}
</style>
