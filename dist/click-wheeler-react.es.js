import React from "react";
import { ClickWheeler } from "./click-wheeler.es.js";
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = /* @__PURE__ */ new Set(["children", "localName", "ref", "style", "className"]), n = /* @__PURE__ */ new WeakMap(), t = (e2, t2, o2, l, a) => {
  const s = a == null ? void 0 : a[t2];
  void 0 === s ? (e2[t2] = o2, null == o2 && t2 in HTMLElement.prototype && e2.removeAttribute(t2)) : o2 !== l && ((e3, t3, o3) => {
    let l2 = n.get(e3);
    void 0 === l2 && n.set(e3, l2 = /* @__PURE__ */ new Map());
    let a2 = l2.get(t3);
    void 0 !== o3 ? void 0 === a2 ? (l2.set(t3, a2 = { handleEvent: o3 }), e3.addEventListener(t3, a2)) : a2.handleEvent = o3 : void 0 !== a2 && (l2.delete(t3), e3.removeEventListener(t3, a2));
  })(e2, s, o2);
}, o = ({ react: n2, tagName: o2, elementClass: l, events: a, displayName: s }) => {
  const c = new Set(Object.keys(a ?? {})), r = n2.forwardRef((s2, r2) => {
    const i = n2.useRef(/* @__PURE__ */ new Map()), d = n2.useRef(null), f = {}, u = {};
    for (const [n3, t2] of Object.entries(s2)) e.has(n3) ? f["className" === n3 ? "class" : n3] = t2 : c.has(n3) || n3 in l.prototype ? u[n3] = t2 : f[n3] = t2;
    return n2.useLayoutEffect(() => {
      if (null === d.current) return;
      const e2 = /* @__PURE__ */ new Map();
      for (const n3 in u) t(d.current, n3, s2[n3], i.current.get(n3), a), i.current.delete(n3), e2.set(n3, s2[n3]);
      for (const [e3, n3] of i.current) t(d.current, e3, void 0, n3, a);
      i.current = e2;
    }), n2.useLayoutEffect(() => {
      var _a;
      (_a = d.current) == null ? void 0 : _a.removeAttribute("defer-hydration");
    }, []), f.suppressHydrationWarning = true, n2.createElement(o2, { ...f, ref: n2.useCallback((e2) => {
      d.current = e2, "function" == typeof r2 ? r2(e2) : null !== r2 && (r2.current = e2);
    }, [r2]) });
  });
  return r.displayName = s ?? l.name, r;
};
const ClickWheelerComponent = o({
  tagName: "click-wheeler",
  elementClass: ClickWheeler,
  react: React,
  events: {
    onRotate: "rotate",
    onTap: "tap"
  }
});
export {
  ClickWheelerComponent
};
