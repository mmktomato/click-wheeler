/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a;
const t$2 = globalThis, e$2 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s = Symbol(), o$2 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$2.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$2.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$2 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s), i$2 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s);
}, S$1 = (s2, o2) => {
  if (e$2) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$2.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$2(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$1, defineProperty: e$1, getOwnPropertyDescriptor: r$1, getOwnPropertyNames: h$2, getOwnPropertySymbols: o$1, getPrototypeOf: n$2 } = Object, a = globalThis, c$1 = a.trustedTypes, l = c$1 ? c$1.emptyScript : "", p = a.reactiveElementPolyfillSupport, d = (t2, s2) => t2, u = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$2 = (t2, s2) => !i$1(t2, s2), y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f$2 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class b extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = y) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), r2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== r2 && e$1(this.prototype, t2, r2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: h2 } = r$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get() {
      return e2 == null ? void 0 : e2.call(this);
    }, set(s3) {
      const r2 = e2 == null ? void 0 : e2.call(this);
      h2.call(this, s3), this.requestUpdate(t2, r2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t3 = this.properties, s2 = [...h$2(t3), ...o$1(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i2.unshift(c$2(s3));
    } else void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$EC(t2, s2) {
    var _a2;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const r2 = (void 0 !== ((_a2 = i2.converter) == null ? void 0 : _a2.toAttribute) ? i2.converter : u).toAttribute(s2, i2.type);
      this._$Em = t2, null == r2 ? this.removeAttribute(e2) : this.setAttribute(e2, r2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), r2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u;
      this._$Em = e2, this[e2] = r2.fromAttribute(s2, t3.type), this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2) {
    if (void 0 !== t2) {
      if (i2 ?? (i2 = this.constructor.getPropertyOptions(t2)), !(i2.hasChanged ?? f$2)(this[t2], s2)) return;
      this.P(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t2, s2, i2) {
    this._$AL.has(t2) || this._$AL.set(t2, s2), true === i2.reflect && this._$Em !== t2 && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t2);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) true !== i2.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.P(s3, this[s3], i2);
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$EU();
    } catch (s3) {
      throw t2 = false, this._$EU(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t3) => this._$EC(t3, this[t3]))), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p == null ? void 0 : p({ ReactiveElement: b }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = globalThis, c = n$1.trustedTypes, h$1 = c ? c.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, f$1 = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, m = "?" + v, _ = `<${m}>`, w = document, lt = () => w.createComment(""), st = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, g = Array.isArray, $ = (t2) => g(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), x = "[ 	\n\f\r]", T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, E = /-->/g, k = />/g, O = RegExp(`>|${x}(?:([^\\s"'>=/]+)(${x}*=${x}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), S = /'/g, j = /"/g, M = /^(?:script|style|textarea|title)$/i, P = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), ke = P(1), R = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), V = /* @__PURE__ */ new WeakMap(), I = w.createTreeWalker(w, 129);
function N(t2, i2) {
  if (!g(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== h$1 ? h$1.createHTML(i2) : i2;
}
const U = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let h2, o2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", n3 = T;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let r2, l2, c2 = -1, a2 = 0;
    for (; a2 < s3.length && (n3.lastIndex = a2, l2 = n3.exec(s3), null !== l2); ) a2 = n3.lastIndex, n3 === T ? "!--" === l2[1] ? n3 = E : void 0 !== l2[1] ? n3 = k : void 0 !== l2[2] ? (M.test(l2[2]) && (h2 = RegExp("</" + l2[2], "g")), n3 = O) : void 0 !== l2[3] && (n3 = O) : n3 === O ? ">" === l2[0] ? (n3 = h2 ?? T, c2 = -1) : void 0 === l2[1] ? c2 = -2 : (c2 = n3.lastIndex - l2[2].length, r2 = l2[1], n3 = void 0 === l2[3] ? O : '"' === l2[3] ? j : S) : n3 === j || n3 === S ? n3 = O : n3 === E || n3 === k ? n3 = T : (n3 = O, h2 = void 0);
    const u2 = n3 === O && t2[i3 + 1].startsWith("/>") ? " " : "";
    o2 += n3 === T ? s3 + _ : c2 >= 0 ? (e2.push(r2), s3.slice(0, c2) + f$1 + s3.slice(c2) + v + u2) : s3 + v + (-2 === c2 ? i3 : u2);
  }
  return [N(t2, o2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), e2];
};
class B {
  constructor({ strings: t2, _$litType$: i2 }, s2) {
    let e2;
    this.parts = [];
    let h2 = 0, o2 = 0;
    const n3 = t2.length - 1, r2 = this.parts, [l2, a2] = U(t2, i2);
    if (this.el = B.createElement(l2, s2), I.currentNode = this.el.content, 2 === i2 || 3 === i2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (e2 = I.nextNode()) && r2.length < n3; ) {
      if (1 === e2.nodeType) {
        if (e2.hasAttributes()) for (const t3 of e2.getAttributeNames()) if (t3.endsWith(f$1)) {
          const i3 = a2[o2++], s3 = e2.getAttribute(t3).split(v), n4 = /([.?@])?(.*)/.exec(i3);
          r2.push({ type: 1, index: h2, name: n4[2], strings: s3, ctor: "." === n4[1] ? Y : "?" === n4[1] ? Z : "@" === n4[1] ? q : G }), e2.removeAttribute(t3);
        } else t3.startsWith(v) && (r2.push({ type: 6, index: h2 }), e2.removeAttribute(t3));
        if (M.test(e2.tagName)) {
          const t3 = e2.textContent.split(v), i3 = t3.length - 1;
          if (i3 > 0) {
            e2.textContent = c ? c.emptyScript : "";
            for (let s3 = 0; s3 < i3; s3++) e2.append(t3[s3], lt()), I.nextNode(), r2.push({ type: 2, index: ++h2 });
            e2.append(t3[i3], lt());
          }
        }
      } else if (8 === e2.nodeType) if (e2.data === m) r2.push({ type: 2, index: h2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = e2.data.indexOf(v, t3 + 1)); ) r2.push({ type: 7, index: h2 }), t3 += v.length - 1;
      }
      h2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = w.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function z(t2, i2, s2 = t2, e2) {
  var _a2, _b;
  if (i2 === R) return i2;
  let h2 = void 0 !== e2 ? (_a2 = s2.o) == null ? void 0 : _a2[e2] : s2.l;
  const o2 = st(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2.o ?? (s2.o = []))[e2] = h2 : s2.l = h2), void 0 !== h2 && (i2 = z(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class F {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? w).importNode(i2, true);
    I.currentNode = e2;
    let h2 = I.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i3;
        2 === r2.type ? i3 = new et(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i3 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i3 = new K(h2, this, t2)), this._$AV.push(i3), r2 = s2[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h2 = I.nextNode(), o2++);
    }
    return I.currentNode = w, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class et {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this.v;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this.v = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = z(this, t2, i2), st(t2) ? t2 === D || null == t2 || "" === t2 ? (this._$AH !== D && this._$AR(), this._$AH = D) : t2 !== this._$AH && t2 !== R && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : $(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== D && st(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(w.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = B.createElement(N(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i2);
    else {
      const t3 = new F(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = V.get(t2.strings);
    return void 0 === i2 && V.set(t2.strings, i2 = new B(t2)), i2;
  }
  k(t2) {
    g(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new et(this.O(lt()), this.O(lt()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this.v = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class G {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = D, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = D;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = z(this, t2, i2, 0), o2 = !st(t2) || t2 !== this._$AH && t2 !== R, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = z(this, e3[s2 + n3], i2, n3), r2 === R && (r2 = this._$AH[n3]), o2 || (o2 = !st(r2) || r2 !== this._$AH[n3]), r2 === D ? t2 = D : t2 !== D && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class Y extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === D ? void 0 : t2;
  }
}
class Z extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== D);
  }
}
class q extends G {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = z(this, t2, i2, 0) ?? D) === R) return;
    const s2 = this._$AH, e2 = t2 === D && s2 !== D || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== D && (s2 === D || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class K {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    z(this, t2);
  }
}
const Re = n$1.litHtmlPolyfillSupport;
Re == null ? void 0 : Re(B, et), (n$1.litHtmlVersions ?? (n$1.litHtmlVersions = [])).push("3.2.0");
const Q = (t2, i2, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new et(i2.insertBefore(lt(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class h extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.o = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const e2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this.o = Q(e2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this.o) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this.o) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return R;
  }
}
h._$litElement$ = true, h["finalized"] = true, (_a = globalThis.litElementHydrateSupport) == null ? void 0 : _a.call(globalThis, { LitElement: h });
const f = globalThis.litElementPolyfillSupport;
f == null ? void 0 : f({ LitElement: h });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this.t = t2, this._$AM = e2, this.i = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class le extends i {
  constructor(i2) {
    if (super(i2), this.it = D, i2.type !== t$1.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t2) {
    if (t2 === D || null == t2) return this._t = void 0, this.it = t2;
    if (t2 === R) return t2;
    if ("string" != typeof t2) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t2 === this.it) return this._t;
    this.it = t2;
    const i2 = [t2];
    return i2.raw = i2, this._t = { _$litType$: this.constructor.resultType, strings: i2, values: [] };
  }
}
le.directiveName = "unsafeHTML", le.resultType = 1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class pe extends le {
}
pe.directiveName = "unsafeSVG", pe.resultType = 2;
const fe = e(pe);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f$2 }, r = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e3) {
      return void 0 !== e3 && this.P(o2, void 0, t2), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, r2 ? { ...t3, wrapped: true } : t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
const forwardIcon = '<?xml version="1.0" encoding="utf-8"?>\n<svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">\n  <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5z"/>\n</svg>';
const menuIcon = '<svg width="42" height="18" viewBox="0 0 42 18" xmlns="http://www.w3.org/2000/svg">\n  <text\n    fill="currentColor"\n    font-size="14"\n    font-family="Verdana"\n    text-anchor="start"\n    dominant-baseline="text-before-edge"\n    textLength="42"\n  >\n    MENU\n  </text>\n</svg>';
const playPauseIcon = '<?xml version="1.0" encoding="UTF-8"?>\n<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n    <g fill="currentColor" fill-rule="nonzero">\n      <path d="M3.65140982,6.61646219 L11.1528787,11.3693959 C11.3672679,11.5052331 11.4827597,11.722675 11.4993749,11.9464385 L11.4984593,7.25 C11.4984593,6.83578644 11.8342458,6.5 12.2484593,6.5 L15.2484593,6.5 C15.6626729,6.5 15.9984593,6.83578644 15.9984593,7.25 L15.9984593,16.75 C15.9984593,17.1642136 15.6626729,17.5 15.2484593,17.5 L12.2484593,17.5 C11.8342458,17.5 11.4984593,17.1642136 11.4984593,16.75 L11.4993494,12.0597632 C11.4826318,12.2835468 11.3670166,12.5009613 11.1525249,12.6366956 L3.65105604,17.3837618 C3.15168144,17.6997752 2.5,17.3409648 2.5,16.75 L2.5,7.25 C2.5,6.65884683 3.15205264,6.30006928 3.65140982,6.61646219 Z M21.2477085,6.50037474 C21.661922,6.50037474 21.9977085,6.83616118 21.9977085,7.25037474 L21.9977085,16.7496253 C21.9977085,17.1638388 21.661922,17.4996253 21.2477085,17.4996253 L18.2477085,17.4996253 C17.8334949,17.4996253 17.4977085,17.1638388 17.4977085,16.7496253 L17.4977085,7.25037474 C17.4977085,6.83616118 17.8334949,6.50037474 18.2477085,6.50037474 L21.2477085,6.50037474 Z" />\n    </g>\n  </g>\n</svg>';
const dispatchRotateEvent = (target, detail) => {
  const ev = new CustomEvent("rotate", {
    bubbles: true,
    composed: true,
    detail
  });
  target.dispatchEvent(ev);
};
const dispatchTapEvent = (target, detail) => {
  const ev = new CustomEvent("tap", {
    bubbles: true,
    composed: true,
    detail
  });
  target.dispatchEvent(ev);
};
const handlePointerDownForTap = (eventTarget, tapArea, onEmitting) => {
  return window.setTimeout(() => {
    onEmitting();
    dispatchTapEvent(eventTarget, { type: "long-tap", tapArea });
  }, 1e3);
};
const handlePointerUpForTap = (eventTarget, longTapTimer, tapArea) => {
  if (longTapTimer !== void 0) {
    window.clearTimeout(longTapTimer);
    dispatchTapEvent(eventTarget, { type: "tap", tapArea });
  }
};
const handlePointerLeaveForTap = (longTapTimer) => {
  window.clearTimeout(longTapTimer);
};
const hitTest = (point, boundingClientRect, circleSize) => {
  const hitPointX = point.x - boundingClientRect.x;
  const hitPointY = point.y - boundingClientRect.y;
  const diameter = circleSize;
  const largerThanLine1 = hitPointY > hitPointX;
  const largerThanLine2 = hitPointY > hitPointX * -1 + diameter;
  if (largerThanLine1 && largerThanLine2) return "bottom";
  if (largerThanLine1 && !largerThanLine2) return "left";
  if (!largerThanLine1 && !largerThanLine2) return "top";
  if (!largerThanLine1 && largerThanLine2) return "right";
  return null;
};
const getDirection = (area, from, to) => {
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  switch (area) {
    case "top":
    case "bottom":
      if (0 === deltaX) {
        return null;
      }
      break;
    case "left":
    case "right":
      if (0 === deltaY) {
        return null;
      }
      break;
    default:
      return null;
  }
  switch (area) {
    case "top":
      return 0 < deltaX ? "clockwise" : "counter-clockwise";
    case "bottom":
      return 0 < deltaX ? "counter-clockwise" : "clockwise";
    case "right":
      return 0 < deltaY ? "clockwise" : "counter-clockwise";
    case "left":
      return 0 < deltaY ? "counter-clockwise" : "clockwise";
  }
};
const getDistance = (from, to) => {
  return Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
};
const getTotalDistance = (from, to, direction, accDistance) => {
  let distance = getDistance(from, to);
  if (direction === accDistance.direction) {
    distance += accDistance.distance;
  } else {
    distance = accDistance.distance - distance;
  }
  if (distance < 0) {
    return {
      distance: distance * -1,
      direction: accDistance.direction === "clockwise" ? "counter-clockwise" : "clockwise"
    };
  }
  return {
    distance,
    direction: accDistance.direction
  };
};
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let ClickWheeler = class extends h {
  constructor() {
    super();
    this.size = 200;
    this.disablePullToRefresh = (e2) => {
      e2.preventDefault();
    };
    this.getArea = (e2) => {
      if (!e2.currentTarget || !(e2.currentTarget instanceof HTMLElement)) {
        return null;
      }
      const hitPoint = { x: e2.clientX, y: e2.clientY };
      const boundingClientRect = e2.currentTarget.getBoundingClientRect();
      return hitTest(hitPoint, boundingClientRect, this.size);
    };
    this.releaseTargetPointerCapture = (e2) => {
      if (e2.target && e2.target instanceof Element) {
        const hasPointerCapture = e2.target.hasPointerCapture(e2.pointerId);
        if (hasPointerCapture) {
          e2.target.releasePointerCapture(e2.pointerId);
        }
      }
    };
    this.onOuterPointerDown = (e2) => {
      this.releaseTargetPointerCapture(e2);
    };
    this.onOuterPointerMove = (e2) => {
      try {
        if (!this.prevPoint) {
          return;
        }
        const area = this.getArea(e2);
        if (!area) {
          return;
        }
        const p2 = { x: e2.x, y: e2.y };
        const direction = getDirection(area, this.prevPoint, p2);
        if (!direction) {
          return;
        }
        if (!this.accDistance) {
          this.accDistance = { distance: 0, direction };
        }
        const totalDistance = getTotalDistance(this.prevPoint, p2, direction, this.accDistance);
        if (totalDistance.distance < 15) {
          this.accDistance = totalDistance;
          return;
        }
        this.accDistance = void 0;
        const velocity = Math.round(totalDistance.distance * 10) / 10;
        dispatchRotateEvent(this, { direction, velocity });
      } finally {
        this.prevPoint = { x: e2.x, y: e2.y };
      }
    };
    this.onOuterPointerLeave = () => {
      this.prevPoint = void 0;
      this.accDistance = void 0;
    };
    this.onInnerPointerDown = (e2) => {
      e2.stopPropagation();
      this.pointerDownTarget = "inner";
      this.releaseTargetPointerCapture(e2);
      this.longTapTimer = handlePointerDownForTap(this, "center", () => {
        this.longTapTimer = void 0;
      });
    };
    this.onInnerPointerUp = (e2) => {
      e2.stopPropagation();
      if (this.pointerDownTarget === "inner") {
        handlePointerUpForTap(this, this.longTapTimer, "center");
      }
    };
    this.onInnerPointerMove = (e2) => {
      e2.stopPropagation();
    };
    this.onInnerPointerLeave = (e2) => {
      e2.stopPropagation();
      this.pointerDownTarget = void 0;
      handlePointerLeaveForTap(this.longTapTimer);
    };
    this.onIconPointerDown = (e2, tapArea) => {
      e2.stopPropagation();
      this.pointerDownTarget = "icon";
      this.releaseTargetPointerCapture(e2);
      this.longTapTimer = handlePointerDownForTap(this, tapArea, () => {
        this.longTapTimer = void 0;
      });
    };
    this.onIconPointerUp = (e2, tapArea) => {
      e2.stopPropagation();
      if (this.pointerDownTarget === "icon") {
        handlePointerUpForTap(this, this.longTapTimer, tapArea);
      }
    };
    this.onIconPointerMove = () => {
    };
    this.onIconPointerLeave = (e2) => {
      e2.stopPropagation();
      this.pointerDownTarget = void 0;
      handlePointerLeaveForTap(this.longTapTimer);
    };
    this.addEventListener("touchmove", this.disablePullToRefresh);
  }
  firstUpdated(_changedProperties) {
    var _a2;
    super.firstUpdated(_changedProperties);
    (_a2 = this.renderRoot.querySelector("div.container")) == null ? void 0 : _a2.style.setProperty("--circle-size", `${this.size}px`);
  }
  render() {
    return ke`
      <div class="container">
        <div
          class="outer"
          @pointerdown="${this.onOuterPointerDown}"
          @pointermove="${this.onOuterPointerMove}"
          @pointerleave="${this.onOuterPointerLeave}"
        >
          <div
            class="inner"
            @pointerdown="${this.onInnerPointerDown}"
            @pointerup="${this.onInnerPointerUp}"
            @pointermove="${this.onInnerPointerMove}"
            @pointerleave="${this.onInnerPointerLeave}"
          ></div>
          <div
            class="icon playPauseIcon"
            @pointerdown="${(e2) => this.onIconPointerDown(e2, "playPause")}"
            @pointerup="${(e2) => this.onIconPointerUp(e2, "playPause")}"
            @pointermove="${this.onIconPointerMove}"
            @pointerleave="${this.onIconPointerLeave}"
          >
            ${fe(playPauseIcon)}
          </div>
          <div
            class="icon menuIcon"
            @pointerdown="${(e2) => this.onIconPointerDown(e2, "menu")}"
            @pointerup="${(e2) => this.onIconPointerUp(e2, "menu")}"
            @pointermove="${this.onIconPointerMove}"
            @pointerleave="${this.onIconPointerLeave}"
          >
            ${fe(menuIcon)}
          </div>
          <div
            class="icon backwardIcon"
            @pointerdown="${(e2) => this.onIconPointerDown(e2, "backward")}"
            @pointerup="${(e2) => this.onIconPointerUp(e2, "backward")}"
            @pointermove="${this.onIconPointerMove}"
            @pointerleave="${this.onIconPointerLeave}"
          >
            ${fe(forwardIcon)}
          </div>
          <div
            class="icon forwardIcon"
            @pointerdown="${(e2) => this.onIconPointerDown(e2, "forward")}"
            @pointerup="${(e2) => this.onIconPointerUp(e2, "forward")}"
            @pointermove="${this.onIconPointerMove}"
            @pointerleave="${this.onIconPointerLeave}"
          >
            ${fe(forwardIcon)}
          </div>
        </div>
      </div>
    `;
  }
};
ClickWheeler.styles = i$2`
    .container {
      width: var(--circle-size);
      height: var(--circle-size);
    }

    .outer {
      display: flex;
      position: relative;
      width: 100%;
      height: 100%;
      background: #f1f1f1;
      border-radius: 50%;
    }

    .inner {
      width: 40%;
      height: 40%;
      margin: auto;
      background: white;
      border-radius: 50%;
    }

    .icon {
      display: flex;
      position: absolute;
      padding: 8px;
      color: #ccc;
      user-select: none;
    }

    .playPauseIcon {
      top: calc(85% - 8px);
      left: calc(50% - 20px);
    }

    .menuIcon {
      top: calc(15% - 24px);
      left: calc(50% - 29px);
    }

    .backwardIcon {
      top: calc(50% - 18px);
      left: calc(15% - 28px);
      transform: rotate(180deg);
    }

    .forwardIcon {
      top: calc(50% - 18px);
      left: calc(85% - 8px);
    }
  `;
__decorateClass([
  n2({ type: Number })
], ClickWheeler.prototype, "size", 2);
ClickWheeler = __decorateClass([
  t("click-wheeler")
], ClickWheeler);
export {
  ClickWheeler
};
