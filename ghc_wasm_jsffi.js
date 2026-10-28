// This file implements the JavaScript runtime logic for Haskell
// modules that use JSFFI. It is not an ESM module, but the template
// of one; the post-linker script will copy all contents into a new
// ESM module.

// Manage a mapping from 32-bit ids to actual JavaScript values.
class JSValManager {
  #lastk = 0;
  #kv = new Map();

  newJSVal(v) {
    const k = ++this.#lastk;
    this.#kv.set(k, v);
    return k;
  }

  // A separate has() call to ensure we can store undefined as a value
  // too. Also, unconditionally check this since the check is cheap
  // anyway, if the check fails then there's a use-after-free to be
  // fixed.
  getJSVal(k) {
    if (!this.#kv.has(k)) {
      throw new WebAssembly.RuntimeError(`getJSVal(${k})`);
    }
    return this.#kv.get(k);
  }

  // Check for double free as well.
  freeJSVal(k) {
    if (!this.#kv.delete(k)) {
      throw new WebAssembly.RuntimeError(`freeJSVal(${k})`);
    }
  }
}

// The actual setImmediate() to be used. This is a ESM module top
// level binding and doesn't pollute the globalThis namespace.
//
// To benchmark different setImmediate() implementations in the
// browser, use https://github.com/jphpsf/setImmediate-shim-demo as a
// starting point.
const setImmediate = await (async () => {
  // node, bun, or other scripts might have set this up in the browser
  if (globalThis.setImmediate) {
    return globalThis.setImmediate;
  }

  // deno
  if (globalThis.Deno) {
    try {
      return (await import("node:timers")).setImmediate;
    } catch {}
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/postTask
  if (globalThis.scheduler) {
    return (cb, ...args) => scheduler.postTask(() => cb(...args));
  }

  // Cloudflare workers doesn't support MessageChannel
  if (globalThis.MessageChannel) {
    // A simple & fast setImmediate() implementation for browsers. It's
    // not a drop-in replacement for node.js setImmediate() because:
    // 1. There's no clearImmediate(), and setImmediate() doesn't return
    //    anything
    // 2. There's no guarantee that callbacks scheduled by setImmediate()
    //    are executed in the same order (in fact it's the opposite lol),
    //    but you are never supposed to rely on this assumption anyway
    class SetImmediate {
      #fs = [];
      #mc = new MessageChannel();

      constructor() {
        this.#mc.port1.addEventListener("message", () => {
          this.#fs.pop()();
        });
        this.#mc.port1.start();
      }

      setImmediate(cb, ...args) {
        this.#fs.push(() => cb(...args));
        this.#mc.port2.postMessage(undefined);
      }
    }

    const sm = new SetImmediate();
    return (cb, ...args) => sm.setImmediate(cb, ...args);
  }

  return (cb, ...args) => setTimeout(cb, 0, ...args);
})();

export default (__exports) => {
const __ghc_wasm_jsffi_jsval_manager = new JSValManager();
const __ghc_wasm_jsffi_finalization_registry = globalThis.FinalizationRegistry ? new FinalizationRegistry(sp => __exports.rts_freeStablePtr(sp)) : { register: () => {}, unregister: () => true };
return {
newJSVal: (v) => __ghc_wasm_jsffi_jsval_manager.newJSVal(v),
getJSVal: (k) => __ghc_wasm_jsffi_jsval_manager.getJSVal(k),
freeJSVal: (k) => __ghc_wasm_jsffi_jsval_manager.freeJSVal(k),
scheduleWork: () => setImmediate(__exports.rts_schedulerLoop),
ZC0ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: () => (Number(document.getElementById('stage').dataset.bytes ?? 0)),
ZC1ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: () => (globalThis.presentationWasmBytes ?? 0),
ZC2ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: ($1,$2) => {const e = document.getElementById($1); if (e) e.textContent = $2;},
ZC3ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: () => (performance.now()),
ZC4ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()),
ZC5ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: ($1) => ($1.target.closest('a') !== null),
ZC6ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: ($1) => ($1.clientX / window.innerWidth),
ZC7ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: ($1) => ($1.preventDefault()),
ZC8ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: ($1) => ($1.ctrlKey || $1.metaKey || $1.altKey),
ZC9ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: ($1) => ($1.key),
ZC10ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: ($1,$2) => (document.addEventListener($1, $2)),
ZC12ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: ($1) => ((...args) => __exports.ghczuwasmzujsffiZC11ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC($1, ...args)),
ZC13ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: ($1) => (history.replaceState(null, '', '#' + $1)),
ZC14ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: () => (location.hash),
ZC15ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: ($1,$2) => (document.getElementById($1).className = $2),
ZC16ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCDomZC: ($1,$2) => (document.getElementById($1).innerHTML = $2),
ZC0ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2) => {$1.activeTexture($1.TEXTURE0); $1.bindTexture($1.TEXTURE_2D, $2[1])},
ZC1ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: () => (null),
ZC2ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2) => ($1.bindFramebuffer($1.FRAMEBUFFER, $2 === null ? null : $2[0])),
ZC3ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2) => {$1.deleteFramebuffer($2[0]); $1.deleteTexture($2[1]); $1.deleteRenderbuffer($2[2]);},
ZC4ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3) => {const f = $1.createFramebuffer(), t = $1.createTexture(), d = $1.createRenderbuffer(); $1.bindTexture($1.TEXTURE_2D, t); $1.texImage2D($1.TEXTURE_2D, 0, $1.RGBA, $2, $3, 0, $1.RGBA, $1.UNSIGNED_BYTE, null); $1.texParameteri($1.TEXTURE_2D, $1.TEXTURE_MIN_FILTER, $1.LINEAR); $1.texParameteri($1.TEXTURE_2D, $1.TEXTURE_WRAP_S, $1.CLAMP_TO_EDGE); $1.texParameteri($1.TEXTURE_2D, $1.TEXTURE_WRAP_T, $1.CLAMP_TO_EDGE); $1.bindRenderbuffer($1.RENDERBUFFER, d); $1.renderbufferStorage($1.RENDERBUFFER, $1.DEPTH_COMPONENT16, $2, $3); $1.bindFramebuffer($1.FRAMEBUFFER, f); $1.framebufferTexture2D($1.FRAMEBUFFER, $1.COLOR_ATTACHMENT0, $1.TEXTURE_2D, t, 0); $1.framebufferRenderbuffer($1.FRAMEBUFFER, $1.DEPTH_ATTACHMENT, $1.RENDERBUFFER, d); $1.bindFramebuffer($1.FRAMEBUFFER, null); return [f, t, d];},
ZC5ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3,$4) => {if ($2 === 0) $1.disable($1.BLEND); else { $1.enable($1.BLEND); $1.blendFunc($1.SRC_ALPHA, $2 === 1 ? $1.ONE : $1.ONE_MINUS_SRC_ALPHA); } if ($3) $1.enable($1.DEPTH_TEST); else $1.disable($1.DEPTH_TEST); $1.depthMask($4);},
ZC6ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2) => ($1.drawElements($1.TRIANGLES, $2, $1.UNSIGNED_SHORT, 0)),
ZC7ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3) => ($1.drawArraysInstanced($1.TRIANGLE_STRIP, 0, $2, $3)),
ZC8ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2) => ($1.drawArrays($1.TRIANGLE_STRIP, 0, $2)),
ZC9ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3,$4) => {$1.clearColor($2, $3, $4, 1); $1.clear($1.COLOR_BUFFER_BIT | $1.DEPTH_BUFFER_BIT)},
ZC10ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3) => ($1.viewport(0, 0, $2, $3)),
ZC11ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3,$4,$5,$6) => {if ($2 >= 0) { $1.enableVertexAttribArray($2); $1.vertexAttribPointer($2, $3, $1.FLOAT, false, $4, $5); $1.vertexAttribDivisor($2, $6); }},
ZC12ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3,$4) => {const b = $1.createBuffer(), t = $2 ? $1.ELEMENT_ARRAY_BUFFER : $1.ARRAY_BUFFER; $1.bindBuffer(t, b); $1.bufferData(t, new Uint8Array(__exports.memory.buffer, $3, $4), $1.STATIC_DRAW); return b;},
ZC13ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2) => ($1.bindVertexArray($2)),
ZC14ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1) => ($1.createVertexArray()),
ZC15ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2) => ($1.bindBuffer($1.ARRAY_BUFFER, $2)),
ZC16ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3) => ($1.uniformMatrix4fv($2, false, new Float32Array(__exports.memory.buffer, $3, 16))),
ZC17ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3) => ($1.uniform1i($2, $3)),
ZC18ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3,$4,$5) => ($1.uniform3f($2, $3, $4, $5)),
ZC19ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3,$4) => ($1.uniform2f($2, $3, $4)),
ZC20ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3) => ($1.uniform1f($2, $3)),
ZC21ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3) => ($1.getUniformLocation($2, $3)),
ZC22ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3) => ($1.getAttribLocation($2, $3)),
ZC23ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2) => ($1.useProgram($2)),
ZC24ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3,$4) => ($1.getProgramParameter($2, $1.LINK_STATUS) ? '' : [$1.getShaderInfoLog($3), $1.getShaderInfoLog($4), $1.getProgramInfoLog($2)].join('\n')),
ZC25ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3) => {const p = $1.createProgram(); $1.attachShader(p, $2); $1.attachShader(p, $3); $1.linkProgram(p); return p;},
ZC26ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2,$3) => {const s = $1.createShader($2 ? $1.VERTEX_SHADER : $1.FRAGMENT_SHADER); $1.shaderSource(s, $3); $1.compileShader(s); return s;},
ZC28ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1) => ((...args) => __exports.ghczuwasmzujsffiZC27ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC($1, ...args)),
ZC29ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1) => (requestAnimationFrame($1)),
ZC30ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1,$2) => (document.getElementById($1).textContent = $2),
ZC31ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1) => {const c = $1, r = window.devicePixelRatio || 1; const w = Math.max(1, Math.round(c.clientWidth * r)), h = Math.max(1, Math.round(c.clientHeight * r)); if (c.width !== w || c.height !== h) { c.width = w; c.height = h; } return w * 65536 + h;},
ZC32ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1) => ($1 === null),
ZC33ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1) => ($1.getContext('webgl2', {antialias: true})),
ZC34ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1) => ($1 !== null && $1.isConnected),
ZC35ZCmunihac2026presentationzm0zi1zi0zi0zm4kOZZQpnIUhlAWWDulZZ9JdPzmmunihac2026presentationZCGlZC: ($1) => (document.getElementById($1)),
ZC0ZCghczminternalZCGHCziInternalziWasmziPrimziExportsZC: ($1,$2) => ($1.reject(new WebAssembly.RuntimeError($2))),
ZC19ZCghczminternalZCGHCziInternalziWasmziPrimziExportsZC: ($1) => ($1.resolve()),
ZC20ZCghczminternalZCGHCziInternalziWasmziPrimziExportsZC: ($1) => {$1.throwTo = () => {};},
ZC21ZCghczminternalZCGHCziInternalziWasmziPrimziExportsZC: ($1,$2) => {$1.throwTo = (err) => __exports.rts_promiseThrowTo($2, err);},
ZC22ZCghczminternalZCGHCziInternalziWasmziPrimziExportsZC: () => {let res, rej; const p = new Promise((resolve, reject) => { res = resolve; rej = reject; }); p.resolve = res; p.reject = rej; return p;},
ZC23ZCghczminternalZCGHCziInternalziWasmziPrimziExportsZC: ($1,$2) => (__ghc_wasm_jsffi_finalization_registry.register($1, $2, $1)),
ZC0ZCghczminternalZCGHCziInternalziWasmziPrimziTypesZC: ($1) => (`${$1.stack ? $1.stack : $1}`),
ZC1ZCghczminternalZCGHCziInternalziWasmziPrimziTypesZC: ($1,$2) => ((new TextDecoder('utf-8', {fatal: true})).decode(new Uint8Array(__exports.memory.buffer, $1, $2))),
ZC2ZCghczminternalZCGHCziInternalziWasmziPrimziTypesZC: ($1,$2,$3) => ((new TextEncoder()).encodeInto($1, new Uint8Array(__exports.memory.buffer, $2, $3)).written),
ZC3ZCghczminternalZCGHCziInternalziWasmziPrimziTypesZC: ($1) => ($1.length),
ZC4ZCghczminternalZCGHCziInternalziWasmziPrimziTypesZC: ($1) => {try { __ghc_wasm_jsffi_finalization_registry.unregister($1); } catch {}},
ZC18ZCghczminternalZCGHCziInternalziWasmziPrimziImportsZC: ($1,$2) => ($1.then(() => __exports.rts_promiseResolveUnit($2), err => __exports.rts_promiseReject($2, err))),
ZC0ZCghczminternalZCGHCziInternalziWasmziPrimziConcziInternalZC: async ($1) => (new Promise(res => setTimeout(res, $1 / 1000))),
};
};
