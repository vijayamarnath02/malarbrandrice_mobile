// node_modules/web-animations-js/web-animations.min.js
!function() {
  var a = {}, b = {};
  !function(a2, b2) {
    function c(a3) {
      if ("number" == typeof a3) return a3;
      var b3 = {};
      for (var c2 in a3) b3[c2] = a3[c2];
      return b3;
    }
    function d() {
      this._delay = 0, this._endDelay = 0, this._fill = "none", this._iterationStart = 0, this._iterations = 1, this._duration = 0, this._playbackRate = 1, this._direction = "normal", this._easing = "linear", this._easingFunction = x;
    }
    function e() {
      return a2.isDeprecated("Invalid timing inputs", "2016-03-02", "TypeError exceptions will be thrown instead.", true);
    }
    function f(b3, c2, e2) {
      var f2 = new d();
      return c2 && (f2.fill = "both", f2.duration = "auto"), "number" != typeof b3 || isNaN(b3) ? void 0 !== b3 && Object.getOwnPropertyNames(b3).forEach(function(c3) {
        if ("auto" != b3[c3]) {
          if (("number" == typeof f2[c3] || "duration" == c3) && ("number" != typeof b3[c3] || isNaN(b3[c3]))) return;
          if ("fill" == c3 && -1 == v.indexOf(b3[c3])) return;
          if ("direction" == c3 && -1 == w.indexOf(b3[c3])) return;
          if ("playbackRate" == c3 && 1 !== b3[c3] && a2.isDeprecated("AnimationEffectTiming.playbackRate", "2014-11-28", "Use Animation.playbackRate instead.")) return;
          f2[c3] = b3[c3];
        }
      }) : f2.duration = b3, f2;
    }
    function g(a3) {
      return "number" == typeof a3 && (a3 = isNaN(a3) ? { duration: 0 } : { duration: a3 }), a3;
    }
    function h(b3, c2) {
      return b3 = a2.numericTimingToObject(b3), f(b3, c2);
    }
    function i(a3, b3, c2, d2) {
      return a3 < 0 || a3 > 1 || c2 < 0 || c2 > 1 ? x : function(e2) {
        function f2(a4, b4, c3) {
          return 3 * a4 * (1 - c3) * (1 - c3) * c3 + 3 * b4 * (1 - c3) * c3 * c3 + c3 * c3 * c3;
        }
        if (e2 <= 0) {
          var g2 = 0;
          return a3 > 0 ? g2 = b3 / a3 : !b3 && c2 > 0 && (g2 = d2 / c2), g2 * e2;
        }
        if (e2 >= 1) {
          var h2 = 0;
          return c2 < 1 ? h2 = (d2 - 1) / (c2 - 1) : 1 == c2 && a3 < 1 && (h2 = (b3 - 1) / (a3 - 1)), 1 + h2 * (e2 - 1);
        }
        for (var i2 = 0, j2 = 1; i2 < j2; ) {
          var k2 = (i2 + j2) / 2, l2 = f2(a3, c2, k2);
          if (Math.abs(e2 - l2) < 1e-5) return f2(b3, d2, k2);
          l2 < e2 ? i2 = k2 : j2 = k2;
        }
        return f2(b3, d2, k2);
      };
    }
    function j(a3, b3) {
      return function(c2) {
        if (c2 >= 1) return 1;
        var d2 = 1 / a3;
        return (c2 += b3 * d2) - c2 % d2;
      };
    }
    function k(a3) {
      C || (C = document.createElement("div").style), C.animationTimingFunction = "", C.animationTimingFunction = a3;
      var b3 = C.animationTimingFunction;
      if ("" == b3 && e()) throw new TypeError(a3 + " is not a valid value for easing");
      return b3;
    }
    function l(a3) {
      if ("linear" == a3) return x;
      var b3 = E.exec(a3);
      if (b3) return i.apply(this, b3.slice(1).map(Number));
      var c2 = F.exec(a3);
      if (c2) return j(Number(c2[1]), A);
      var d2 = G.exec(a3);
      return d2 ? j(Number(d2[1]), { start: y, middle: z, end: A }[d2[2]]) : B[a3] || x;
    }
    function m(a3) {
      return Math.abs(n(a3) / a3.playbackRate);
    }
    function n(a3) {
      return 0 === a3.duration || 0 === a3.iterations ? 0 : a3.duration * a3.iterations;
    }
    function o(a3, b3, c2) {
      if (null == b3) return H;
      var d2 = c2.delay + a3 + c2.endDelay;
      return b3 < Math.min(c2.delay, d2) ? I : b3 >= Math.min(c2.delay + a3, d2) ? J : K;
    }
    function p(a3, b3, c2, d2, e2) {
      switch (d2) {
        case I:
          return "backwards" == b3 || "both" == b3 ? 0 : null;
        case K:
          return c2 - e2;
        case J:
          return "forwards" == b3 || "both" == b3 ? a3 : null;
        case H:
          return null;
      }
    }
    function q(a3, b3, c2, d2, e2) {
      var f2 = e2;
      return 0 === a3 ? b3 !== I && (f2 += c2) : f2 += d2 / a3, f2;
    }
    function r(a3, b3, c2, d2, e2, f2) {
      var g2 = a3 === 1 / 0 ? b3 % 1 : a3 % 1;
      return 0 !== g2 || c2 !== J || 0 === d2 || 0 === e2 && 0 !== f2 || (g2 = 1), g2;
    }
    function s(a3, b3, c2, d2) {
      return a3 === J && b3 === 1 / 0 ? 1 / 0 : 1 === c2 ? Math.floor(d2) - 1 : Math.floor(d2);
    }
    function t(a3, b3, c2) {
      var d2 = a3;
      if ("normal" !== a3 && "reverse" !== a3) {
        var e2 = b3;
        "alternate-reverse" === a3 && (e2 += 1), d2 = "normal", e2 !== 1 / 0 && e2 % 2 != 0 && (d2 = "reverse");
      }
      return "normal" === d2 ? c2 : 1 - c2;
    }
    function u(a3, b3, c2) {
      var d2 = o(a3, b3, c2), e2 = p(a3, c2.fill, b3, d2, c2.delay);
      if (null === e2) return null;
      var f2 = q(c2.duration, d2, c2.iterations, e2, c2.iterationStart), g2 = r(f2, c2.iterationStart, d2, c2.iterations, e2, c2.duration), h2 = s(d2, c2.iterations, g2, f2), i2 = t(c2.direction, h2, g2);
      return c2._easingFunction(i2);
    }
    var v = "backwards|forwards|both|none".split("|"), w = "reverse|alternate|alternate-reverse".split("|"), x = function(a3) {
      return a3;
    };
    d.prototype = { _setMember: function(b3, c2) {
      this["_" + b3] = c2, this._effect && (this._effect._timingInput[b3] = c2, this._effect._timing = a2.normalizeTimingInput(this._effect._timingInput), this._effect.activeDuration = a2.calculateActiveDuration(this._effect._timing), this._effect._animation && this._effect._animation._rebuildUnderlyingAnimation());
    }, get playbackRate() {
      return this._playbackRate;
    }, set delay(a3) {
      this._setMember("delay", a3);
    }, get delay() {
      return this._delay;
    }, set endDelay(a3) {
      this._setMember("endDelay", a3);
    }, get endDelay() {
      return this._endDelay;
    }, set fill(a3) {
      this._setMember("fill", a3);
    }, get fill() {
      return this._fill;
    }, set iterationStart(a3) {
      if ((isNaN(a3) || a3 < 0) && e()) throw new TypeError("iterationStart must be a non-negative number, received: " + a3);
      this._setMember("iterationStart", a3);
    }, get iterationStart() {
      return this._iterationStart;
    }, set duration(a3) {
      if ("auto" != a3 && (isNaN(a3) || a3 < 0) && e()) throw new TypeError("duration must be non-negative or auto, received: " + a3);
      this._setMember("duration", a3);
    }, get duration() {
      return this._duration;
    }, set direction(a3) {
      this._setMember("direction", a3);
    }, get direction() {
      return this._direction;
    }, set easing(a3) {
      this._easingFunction = l(k(a3)), this._setMember("easing", a3);
    }, get easing() {
      return this._easing;
    }, set iterations(a3) {
      if ((isNaN(a3) || a3 < 0) && e()) throw new TypeError("iterations must be non-negative, received: " + a3);
      this._setMember("iterations", a3);
    }, get iterations() {
      return this._iterations;
    } };
    var y = 1, z = 0.5, A = 0, B = { ease: i(0.25, 0.1, 0.25, 1), "ease-in": i(0.42, 0, 1, 1), "ease-out": i(0, 0, 0.58, 1), "ease-in-out": i(0.42, 0, 0.58, 1), "step-start": j(1, y), "step-middle": j(1, z), "step-end": j(1, A) }, C = null, D = "\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*", E = new RegExp("cubic-bezier\\(" + D + "," + D + "," + D + "," + D + "\\)"), F = /steps\(\s*(\d+)\s*\)/, G = /steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/, H = 0, I = 1, J = 2, K = 3;
    a2.cloneTimingInput = c, a2.makeTiming = f, a2.numericTimingToObject = g, a2.normalizeTimingInput = h, a2.calculateActiveDuration = m, a2.calculateIterationProgress = u, a2.calculatePhase = o, a2.normalizeEasing = k, a2.parseEasingFunction = l;
  }(a), function(a2, b2) {
    function c(a3, b3) {
      return a3 in k ? k[a3][b3] || b3 : b3;
    }
    function d(a3) {
      return "display" === a3 || 0 === a3.lastIndexOf("animation", 0) || 0 === a3.lastIndexOf("transition", 0);
    }
    function e(a3, b3, e2) {
      if (!d(a3)) {
        var f2 = h[a3];
        if (f2) {
          i.style[a3] = b3;
          for (var g2 in f2) {
            var j2 = f2[g2], k2 = i.style[j2];
            e2[j2] = c(j2, k2);
          }
        } else e2[a3] = c(a3, b3);
      }
    }
    function f(a3) {
      var b3 = [];
      for (var c2 in a3) if (!(c2 in ["easing", "offset", "composite"])) {
        var d2 = a3[c2];
        Array.isArray(d2) || (d2 = [d2]);
        for (var e2, f2 = d2.length, g2 = 0; g2 < f2; g2++) e2 = {}, e2.offset = "offset" in a3 ? a3.offset : 1 == f2 ? 1 : g2 / (f2 - 1), "easing" in a3 && (e2.easing = a3.easing), "composite" in a3 && (e2.composite = a3.composite), e2[c2] = d2[g2], b3.push(e2);
      }
      return b3.sort(function(a4, b4) {
        return a4.offset - b4.offset;
      }), b3;
    }
    function g(b3) {
      function c2() {
        var a3 = d2.length;
        null == d2[a3 - 1].offset && (d2[a3 - 1].offset = 1), a3 > 1 && null == d2[0].offset && (d2[0].offset = 0);
        for (var b4 = 0, c3 = d2[0].offset, e2 = 1; e2 < a3; e2++) {
          var f2 = d2[e2].offset;
          if (null != f2) {
            for (var g3 = 1; g3 < e2 - b4; g3++) d2[b4 + g3].offset = c3 + (f2 - c3) * g3 / (e2 - b4);
            b4 = e2, c3 = f2;
          }
        }
      }
      if (null == b3) return [];
      window.Symbol && Symbol.iterator && Array.prototype.from && b3[Symbol.iterator] && (b3 = Array.from(b3)), Array.isArray(b3) || (b3 = f(b3));
      for (var d2 = b3.map(function(b4) {
        var c3 = {};
        for (var d3 in b4) {
          var f2 = b4[d3];
          if ("offset" == d3) {
            if (null != f2) {
              if (f2 = Number(f2), !isFinite(f2)) throw new TypeError("Keyframe offsets must be numbers.");
              if (f2 < 0 || f2 > 1) throw new TypeError("Keyframe offsets must be between 0 and 1.");
            }
          } else if ("composite" == d3) {
            if ("add" == f2 || "accumulate" == f2) throw { type: DOMException.NOT_SUPPORTED_ERR, name: "NotSupportedError", message: "add compositing is not supported" };
            if ("replace" != f2) throw new TypeError("Invalid composite mode " + f2 + ".");
          } else f2 = "easing" == d3 ? a2.normalizeEasing(f2) : "" + f2;
          e(d3, f2, c3);
        }
        return void 0 == c3.offset && (c3.offset = null), void 0 == c3.easing && (c3.easing = "linear"), c3;
      }), g2 = true, h2 = -1 / 0, i2 = 0; i2 < d2.length; i2++) {
        var j2 = d2[i2].offset;
        if (null != j2) {
          if (j2 < h2) throw new TypeError("Keyframes are not loosely sorted by offset. Sort or specify offsets.");
          h2 = j2;
        } else g2 = false;
      }
      return d2 = d2.filter(function(a3) {
        return a3.offset >= 0 && a3.offset <= 1;
      }), g2 || c2(), d2;
    }
    var h = { background: ["backgroundImage", "backgroundPosition", "backgroundSize", "backgroundRepeat", "backgroundAttachment", "backgroundOrigin", "backgroundClip", "backgroundColor"], border: ["borderTopColor", "borderTopStyle", "borderTopWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth"], borderBottom: ["borderBottomWidth", "borderBottomStyle", "borderBottomColor"], borderColor: ["borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"], borderLeft: ["borderLeftWidth", "borderLeftStyle", "borderLeftColor"], borderRadius: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], borderRight: ["borderRightWidth", "borderRightStyle", "borderRightColor"], borderTop: ["borderTopWidth", "borderTopStyle", "borderTopColor"], borderWidth: ["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"], flex: ["flexGrow", "flexShrink", "flexBasis"], font: ["fontFamily", "fontSize", "fontStyle", "fontVariant", "fontWeight", "lineHeight"], margin: ["marginTop", "marginRight", "marginBottom", "marginLeft"], outline: ["outlineColor", "outlineStyle", "outlineWidth"], padding: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"] }, i = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), j = { thin: "1px", medium: "3px", thick: "5px" }, k = { borderBottomWidth: j, borderLeftWidth: j, borderRightWidth: j, borderTopWidth: j, fontSize: { "xx-small": "60%", "x-small": "75%", small: "89%", medium: "100%", large: "120%", "x-large": "150%", "xx-large": "200%" }, fontWeight: { normal: "400", bold: "700" }, outlineWidth: j, textShadow: { none: "0px 0px 0px transparent" }, boxShadow: { none: "0px 0px 0px 0px transparent" } };
    a2.convertToArrayForm = f, a2.normalizeKeyframes = g;
  }(a), function(a2) {
    var b2 = {};
    a2.isDeprecated = function(a3, c, d, e) {
      var f = e ? "are" : "is", g = /* @__PURE__ */ new Date(), h = new Date(c);
      return h.setMonth(h.getMonth() + 3), !(g < h && (a3 in b2 || console.warn("Web Animations: " + a3 + " " + f + " deprecated and will stop working on " + h.toDateString() + ". " + d), b2[a3] = true, 1));
    }, a2.deprecated = function(b3, c, d, e) {
      var f = e ? "are" : "is";
      if (a2.isDeprecated(b3, c, d, e)) throw new Error(b3 + " " + f + " no longer supported. " + d);
    };
  }(a), function() {
    if (document.documentElement.animate) {
      var c = document.documentElement.animate([], 0), d = true;
      if (c && (d = false, "play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState".split("|").forEach(function(a2) {
        void 0 === c[a2] && (d = true);
      })), !d) return;
    }
    !function(a2, b2, c2) {
      function d2(a3) {
        for (var b3 = {}, c3 = 0; c3 < a3.length; c3++) for (var d3 in a3[c3]) if ("offset" != d3 && "easing" != d3 && "composite" != d3) {
          var e2 = { offset: a3[c3].offset, easing: a3[c3].easing, value: a3[c3][d3] };
          b3[d3] = b3[d3] || [], b3[d3].push(e2);
        }
        for (var f in b3) {
          var g = b3[f];
          if (0 != g[0].offset || 1 != g[g.length - 1].offset) throw { type: DOMException.NOT_SUPPORTED_ERR, name: "NotSupportedError", message: "Partial keyframes are not supported" };
        }
        return b3;
      }
      function e(c3) {
        var d3 = [];
        for (var e2 in c3) for (var f = c3[e2], g = 0; g < f.length - 1; g++) {
          var h = g, i = g + 1, j = f[h].offset, k = f[i].offset, l = j, m = k;
          0 == g && (l = -1 / 0, 0 == k && (i = h)), g == f.length - 2 && (m = 1 / 0, 1 == j && (h = i)), d3.push({ applyFrom: l, applyTo: m, startOffset: f[h].offset, endOffset: f[i].offset, easingFunction: a2.parseEasingFunction(f[h].easing), property: e2, interpolation: b2.propertyInterpolation(e2, f[h].value, f[i].value) });
        }
        return d3.sort(function(a3, b3) {
          return a3.startOffset - b3.startOffset;
        }), d3;
      }
      b2.convertEffectInput = function(c3) {
        var f = a2.normalizeKeyframes(c3), g = d2(f), h = e(g);
        return function(a3, c4) {
          if (null != c4) h.filter(function(a4) {
            return c4 >= a4.applyFrom && c4 < a4.applyTo;
          }).forEach(function(d4) {
            var e2 = c4 - d4.startOffset, f2 = d4.endOffset - d4.startOffset, g2 = 0 == f2 ? 0 : d4.easingFunction(e2 / f2);
            b2.apply(a3, d4.property, d4.interpolation(g2));
          });
          else for (var d3 in g) "offset" != d3 && "easing" != d3 && "composite" != d3 && b2.clear(a3, d3);
        };
      };
    }(a, b), function(a2, b2, c2) {
      function d2(a3) {
        return a3.replace(/-(.)/g, function(a4, b3) {
          return b3.toUpperCase();
        });
      }
      function e(a3, b3, c3) {
        h[c3] = h[c3] || [], h[c3].push([a3, b3]);
      }
      function f(a3, b3, c3) {
        for (var f2 = 0; f2 < c3.length; f2++) {
          e(a3, b3, d2(c3[f2]));
        }
      }
      function g(c3, e2, f2) {
        var g2 = c3;
        /-/.test(c3) && !a2.isDeprecated("Hyphenated property names", "2016-03-22", "Use camelCase instead.", true) && (g2 = d2(c3)), "initial" != e2 && "initial" != f2 || ("initial" == e2 && (e2 = i[g2]), "initial" == f2 && (f2 = i[g2]));
        for (var j = e2 == f2 ? [] : h[g2], k = 0; j && k < j.length; k++) {
          var l = j[k][0](e2), m = j[k][0](f2);
          if (void 0 !== l && void 0 !== m) {
            var n = j[k][1](l, m);
            if (n) {
              var o = b2.Interpolation.apply(null, n);
              return function(a3) {
                return 0 == a3 ? e2 : 1 == a3 ? f2 : o(a3);
              };
            }
          }
        }
        return b2.Interpolation(false, true, function(a3) {
          return a3 ? f2 : e2;
        });
      }
      var h = {};
      b2.addPropertiesHandler = f;
      var i = { backgroundColor: "transparent", backgroundPosition: "0% 0%", borderBottomColor: "currentColor", borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px", borderBottomWidth: "3px", borderLeftColor: "currentColor", borderLeftWidth: "3px", borderRightColor: "currentColor", borderRightWidth: "3px", borderSpacing: "2px", borderTopColor: "currentColor", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderTopWidth: "3px", bottom: "auto", clip: "rect(0px, 0px, 0px, 0px)", color: "black", fontSize: "100%", fontWeight: "400", height: "auto", left: "auto", letterSpacing: "normal", lineHeight: "120%", marginBottom: "0px", marginLeft: "0px", marginRight: "0px", marginTop: "0px", maxHeight: "none", maxWidth: "none", minHeight: "0px", minWidth: "0px", opacity: "1.0", outlineColor: "invert", outlineOffset: "0px", outlineWidth: "3px", paddingBottom: "0px", paddingLeft: "0px", paddingRight: "0px", paddingTop: "0px", right: "auto", strokeDasharray: "none", strokeDashoffset: "0px", textIndent: "0px", textShadow: "0px 0px 0px transparent", top: "auto", transform: "", verticalAlign: "0px", visibility: "visible", width: "auto", wordSpacing: "normal", zIndex: "auto" };
      b2.propertyInterpolation = g;
    }(a, b), function(a2, b2, c2) {
      function d2(b3) {
        var c3 = a2.calculateActiveDuration(b3), d3 = function(d4) {
          return a2.calculateIterationProgress(c3, d4, b3);
        };
        return d3._totalDuration = b3.delay + c3 + b3.endDelay, d3;
      }
      b2.KeyframeEffect = function(c3, e, f, g) {
        var h, i = d2(a2.normalizeTimingInput(f)), j = b2.convertEffectInput(e), k = function() {
          j(c3, h);
        };
        return k._update = function(a3) {
          return null !== (h = i(a3));
        }, k._clear = function() {
          j(c3, null);
        }, k._hasSameTarget = function(a3) {
          return c3 === a3;
        }, k._target = c3, k._totalDuration = i._totalDuration, k._id = g, k;
      };
    }(a, b), function(a2, b2) {
      function c2(a3, b3) {
        return !(!b3.namespaceURI || -1 == b3.namespaceURI.indexOf("/svg")) && (g in a3 || (a3[g] = /Trident|MSIE|IEMobile|Edge|Android 4/i.test(a3.navigator.userAgent)), a3[g]);
      }
      function d2(a3, b3, c3) {
        c3.enumerable = true, c3.configurable = true, Object.defineProperty(a3, b3, c3);
      }
      function e(a3) {
        this._element = a3, this._surrogateStyle = document.createElementNS("http://www.w3.org/1999/xhtml", "div").style, this._style = a3.style, this._length = 0, this._isAnimatedProperty = {}, this._updateSvgTransformAttr = c2(window, a3), this._savedTransformAttr = null;
        for (var b3 = 0; b3 < this._style.length; b3++) {
          var d3 = this._style[b3];
          this._surrogateStyle[d3] = this._style[d3];
        }
        this._updateIndices();
      }
      function f(a3) {
        if (!a3._webAnimationsPatchedStyle) {
          var b3 = new e(a3);
          try {
            d2(a3, "style", { get: function() {
              return b3;
            } });
          } catch (b4) {
            a3.style._set = function(b5, c3) {
              a3.style[b5] = c3;
            }, a3.style._clear = function(b5) {
              a3.style[b5] = "";
            };
          }
          a3._webAnimationsPatchedStyle = a3.style;
        }
      }
      var g = "_webAnimationsUpdateSvgTransformAttr", h = { cssText: 1, length: 1, parentRule: 1 }, i = { getPropertyCSSValue: 1, getPropertyPriority: 1, getPropertyValue: 1, item: 1, removeProperty: 1, setProperty: 1 }, j = { removeProperty: 1, setProperty: 1 };
      e.prototype = { get cssText() {
        return this._surrogateStyle.cssText;
      }, set cssText(a3) {
        for (var b3 = {}, c3 = 0; c3 < this._surrogateStyle.length; c3++) b3[this._surrogateStyle[c3]] = true;
        this._surrogateStyle.cssText = a3, this._updateIndices();
        for (var c3 = 0; c3 < this._surrogateStyle.length; c3++) b3[this._surrogateStyle[c3]] = true;
        for (var d3 in b3) this._isAnimatedProperty[d3] || this._style.setProperty(d3, this._surrogateStyle.getPropertyValue(d3));
      }, get length() {
        return this._surrogateStyle.length;
      }, get parentRule() {
        return this._style.parentRule;
      }, _updateIndices: function() {
        for (; this._length < this._surrogateStyle.length; ) Object.defineProperty(this, this._length, { configurable: true, enumerable: false, get: /* @__PURE__ */ function(a3) {
          return function() {
            return this._surrogateStyle[a3];
          };
        }(this._length) }), this._length++;
        for (; this._length > this._surrogateStyle.length; ) this._length--, Object.defineProperty(this, this._length, { configurable: true, enumerable: false, value: void 0 });
      }, _set: function(b3, c3) {
        this._style[b3] = c3, this._isAnimatedProperty[b3] = true, this._updateSvgTransformAttr && "transform" == a2.unprefixedPropertyName(b3) && (null == this._savedTransformAttr && (this._savedTransformAttr = this._element.getAttribute("transform")), this._element.setAttribute("transform", a2.transformToSvgMatrix(c3)));
      }, _clear: function(b3) {
        this._style[b3] = this._surrogateStyle[b3], this._updateSvgTransformAttr && "transform" == a2.unprefixedPropertyName(b3) && (this._savedTransformAttr ? this._element.setAttribute("transform", this._savedTransformAttr) : this._element.removeAttribute("transform"), this._savedTransformAttr = null), delete this._isAnimatedProperty[b3];
      } };
      for (var k in i) e.prototype[k] = /* @__PURE__ */ function(a3, b3) {
        return function() {
          var c3 = this._surrogateStyle[a3].apply(this._surrogateStyle, arguments);
          return b3 && (this._isAnimatedProperty[arguments[0]] || this._style[a3].apply(this._style, arguments), this._updateIndices()), c3;
        };
      }(k, k in j);
      for (var l in document.documentElement.style) l in h || l in i || function(a3) {
        d2(e.prototype, a3, { get: function() {
          return this._surrogateStyle[a3];
        }, set: function(b3) {
          this._surrogateStyle[a3] = b3, this._updateIndices(), this._isAnimatedProperty[a3] || (this._style[a3] = b3);
        } });
      }(l);
      a2.apply = function(b3, c3, d3) {
        f(b3), b3.style._set(a2.propertyName(c3), d3);
      }, a2.clear = function(b3, c3) {
        b3._webAnimationsPatchedStyle && b3.style._clear(a2.propertyName(c3));
      };
    }(b), function(a2) {
      window.Element.prototype.animate = function(b2, c2) {
        var d2 = "";
        return c2 && c2.id && (d2 = c2.id), a2.timeline._play(a2.KeyframeEffect(this, b2, c2, d2));
      };
    }(b), function(a2, b2) {
      function c2(a3, b3, d2) {
        if ("number" == typeof a3 && "number" == typeof b3) return a3 * (1 - d2) + b3 * d2;
        if ("boolean" == typeof a3 && "boolean" == typeof b3) return d2 < 0.5 ? a3 : b3;
        if (a3.length == b3.length) {
          for (var e = [], f = 0; f < a3.length; f++) e.push(c2(a3[f], b3[f], d2));
          return e;
        }
        throw "Mismatched interpolation arguments " + a3 + ":" + b3;
      }
      a2.Interpolation = function(a3, b3, d2) {
        return function(e) {
          return d2(c2(a3, b3, e));
        };
      };
    }(b), function(a2, b2) {
      function c2(a3, b3, c3) {
        return Math.max(Math.min(a3, c3), b3);
      }
      function d2(b3, d3, e2) {
        var f = a2.dot(b3, d3);
        f = c2(f, -1, 1);
        var g = [];
        if (1 === f) g = b3;
        else for (var h = Math.acos(f), i = 1 * Math.sin(e2 * h) / Math.sqrt(1 - f * f), j = 0; j < 4; j++) g.push(b3[j] * (Math.cos(e2 * h) - f * i) + d3[j] * i);
        return g;
      }
      var e = /* @__PURE__ */ function() {
        function a3(a4, b4) {
          for (var c4 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], d3 = 0; d3 < 4; d3++) for (var e2 = 0; e2 < 4; e2++) for (var f = 0; f < 4; f++) c4[d3][e2] += b4[d3][f] * a4[f][e2];
          return c4;
        }
        function b3(a4) {
          return 0 == a4[0][2] && 0 == a4[0][3] && 0 == a4[1][2] && 0 == a4[1][3] && 0 == a4[2][0] && 0 == a4[2][1] && 1 == a4[2][2] && 0 == a4[2][3] && 0 == a4[3][2] && 1 == a4[3][3];
        }
        function c3(c4, d3, e2, f, g) {
          for (var h = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], i = 0; i < 4; i++) h[i][3] = g[i];
          for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) h[3][i] += c4[j] * h[j][i];
          var k = f[0], l = f[1], m = f[2], n = f[3], o = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
          o[0][0] = 1 - 2 * (l * l + m * m), o[0][1] = 2 * (k * l - m * n), o[0][2] = 2 * (k * m + l * n), o[1][0] = 2 * (k * l + m * n), o[1][1] = 1 - 2 * (k * k + m * m), o[1][2] = 2 * (l * m - k * n), o[2][0] = 2 * (k * m - l * n), o[2][1] = 2 * (l * m + k * n), o[2][2] = 1 - 2 * (k * k + l * l), h = a3(h, o);
          var p = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
          e2[2] && (p[2][1] = e2[2], h = a3(h, p)), e2[1] && (p[2][1] = 0, p[2][0] = e2[0], h = a3(h, p)), e2[0] && (p[2][0] = 0, p[1][0] = e2[0], h = a3(h, p));
          for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) h[i][j] *= d3[i];
          return b3(h) ? [h[0][0], h[0][1], h[1][0], h[1][1], h[3][0], h[3][1]] : h[0].concat(h[1], h[2], h[3]);
        }
        return c3;
      }();
      a2.composeMatrix = e, a2.quat = d2;
    }(b), function(a2, b2, c2) {
      a2.sequenceNumber = 0;
      var d2 = function(a3, b3, c3) {
        this.target = a3, this.currentTime = b3, this.timelineTime = c3, this.type = "finish", this.bubbles = false, this.cancelable = false, this.currentTarget = a3, this.defaultPrevented = false, this.eventPhase = Event.AT_TARGET, this.timeStamp = Date.now();
      };
      b2.Animation = function(b3) {
        this.id = "", b3 && b3._id && (this.id = b3._id), this._sequenceNumber = a2.sequenceNumber++, this._currentTime = 0, this._startTime = null, this._paused = false, this._playbackRate = 1, this._inTimeline = true, this._finishedFlag = true, this.onfinish = null, this._finishHandlers = [], this._effect = b3, this._inEffect = this._effect._update(0), this._idle = true, this._currentTimePending = false;
      }, b2.Animation.prototype = { _ensureAlive: function() {
        this.playbackRate < 0 && 0 === this.currentTime ? this._inEffect = this._effect._update(-1) : this._inEffect = this._effect._update(this.currentTime), this._inTimeline || !this._inEffect && this._finishedFlag || (this._inTimeline = true, b2.timeline._animations.push(this));
      }, _tickCurrentTime: function(a3, b3) {
        a3 != this._currentTime && (this._currentTime = a3, this._isFinished && !b3 && (this._currentTime = this._playbackRate > 0 ? this._totalDuration : 0), this._ensureAlive());
      }, get currentTime() {
        return this._idle || this._currentTimePending ? null : this._currentTime;
      }, set currentTime(a3) {
        a3 = +a3, isNaN(a3) || (b2.restart(), this._paused || null == this._startTime || (this._startTime = this._timeline.currentTime - a3 / this._playbackRate), this._currentTimePending = false, this._currentTime != a3 && (this._idle && (this._idle = false, this._paused = true), this._tickCurrentTime(a3, true), b2.applyDirtiedAnimation(this)));
      }, get startTime() {
        return this._startTime;
      }, set startTime(a3) {
        a3 = +a3, isNaN(a3) || this._paused || this._idle || (this._startTime = a3, this._tickCurrentTime((this._timeline.currentTime - this._startTime) * this.playbackRate), b2.applyDirtiedAnimation(this));
      }, get playbackRate() {
        return this._playbackRate;
      }, set playbackRate(a3) {
        if (a3 != this._playbackRate) {
          var c3 = this.currentTime;
          this._playbackRate = a3, this._startTime = null, "paused" != this.playState && "idle" != this.playState && (this._finishedFlag = false, this._idle = false, this._ensureAlive(), b2.applyDirtiedAnimation(this)), null != c3 && (this.currentTime = c3);
        }
      }, get _isFinished() {
        return !this._idle && (this._playbackRate > 0 && this._currentTime >= this._totalDuration || this._playbackRate < 0 && this._currentTime <= 0);
      }, get _totalDuration() {
        return this._effect._totalDuration;
      }, get playState() {
        return this._idle ? "idle" : null == this._startTime && !this._paused && 0 != this.playbackRate || this._currentTimePending ? "pending" : this._paused ? "paused" : this._isFinished ? "finished" : "running";
      }, _rewind: function() {
        if (this._playbackRate >= 0) this._currentTime = 0;
        else {
          if (!(this._totalDuration < 1 / 0)) throw new DOMException("Unable to rewind negative playback rate animation with infinite duration", "InvalidStateError");
          this._currentTime = this._totalDuration;
        }
      }, play: function() {
        this._paused = false, (this._isFinished || this._idle) && (this._rewind(), this._startTime = null), this._finishedFlag = false, this._idle = false, this._ensureAlive(), b2.applyDirtiedAnimation(this);
      }, pause: function() {
        this._isFinished || this._paused || this._idle ? this._idle && (this._rewind(), this._idle = false) : this._currentTimePending = true, this._startTime = null, this._paused = true;
      }, finish: function() {
        this._idle || (this.currentTime = this._playbackRate > 0 ? this._totalDuration : 0, this._startTime = this._totalDuration - this.currentTime, this._currentTimePending = false, b2.applyDirtiedAnimation(this));
      }, cancel: function() {
        this._inEffect && (this._inEffect = false, this._idle = true, this._paused = false, this._finishedFlag = true, this._currentTime = 0, this._startTime = null, this._effect._update(null), b2.applyDirtiedAnimation(this));
      }, reverse: function() {
        this.playbackRate *= -1, this.play();
      }, addEventListener: function(a3, b3) {
        "function" == typeof b3 && "finish" == a3 && this._finishHandlers.push(b3);
      }, removeEventListener: function(a3, b3) {
        if ("finish" == a3) {
          var c3 = this._finishHandlers.indexOf(b3);
          c3 >= 0 && this._finishHandlers.splice(c3, 1);
        }
      }, _fireEvents: function(a3) {
        if (this._isFinished) {
          if (!this._finishedFlag) {
            var b3 = new d2(this, this._currentTime, a3), c3 = this._finishHandlers.concat(this.onfinish ? [this.onfinish] : []);
            setTimeout(function() {
              c3.forEach(function(a4) {
                a4.call(b3.target, b3);
              });
            }, 0), this._finishedFlag = true;
          }
        } else this._finishedFlag = false;
      }, _tick: function(a3, b3) {
        this._idle || this._paused || (null == this._startTime ? b3 && (this.startTime = a3 - this._currentTime / this.playbackRate) : this._isFinished || this._tickCurrentTime((a3 - this._startTime) * this.playbackRate)), b3 && (this._currentTimePending = false, this._fireEvents(a3));
      }, get _needsTick() {
        return this.playState in { pending: 1, running: 1 } || !this._finishedFlag;
      }, _targetAnimations: function() {
        var a3 = this._effect._target;
        return a3._activeAnimations || (a3._activeAnimations = []), a3._activeAnimations;
      }, _markTarget: function() {
        var a3 = this._targetAnimations();
        -1 === a3.indexOf(this) && a3.push(this);
      }, _unmarkTarget: function() {
        var a3 = this._targetAnimations(), b3 = a3.indexOf(this);
        -1 !== b3 && a3.splice(b3, 1);
      } };
    }(a, b), function(a2, b2, c2) {
      function d2(a3) {
        var b3 = j;
        j = [], a3 < q.currentTime && (a3 = q.currentTime), q._animations.sort(e), q._animations = h(a3, true, q._animations)[0], b3.forEach(function(b4) {
          b4[1](a3);
        }), g(), l = void 0;
      }
      function e(a3, b3) {
        return a3._sequenceNumber - b3._sequenceNumber;
      }
      function f() {
        this._animations = [], this.currentTime = window.performance && performance.now ? performance.now() : 0;
      }
      function g() {
        o.forEach(function(a3) {
          a3();
        }), o.length = 0;
      }
      function h(a3, c3, d3) {
        p = true, n = false, b2.timeline.currentTime = a3, m = false;
        var e2 = [], f2 = [], g2 = [], h2 = [];
        return d3.forEach(function(b3) {
          b3._tick(a3, c3), b3._inEffect ? (f2.push(b3._effect), b3._markTarget()) : (e2.push(b3._effect), b3._unmarkTarget()), b3._needsTick && (m = true);
          var d4 = b3._inEffect || b3._needsTick;
          b3._inTimeline = d4, d4 ? g2.push(b3) : h2.push(b3);
        }), o.push.apply(o, e2), o.push.apply(o, f2), m && requestAnimationFrame(function() {
        }), p = false, [g2, h2];
      }
      var i = window.requestAnimationFrame, j = [], k = 0;
      window.requestAnimationFrame = function(a3) {
        var b3 = k++;
        return 0 == j.length && i(d2), j.push([b3, a3]), b3;
      }, window.cancelAnimationFrame = function(a3) {
        j.forEach(function(b3) {
          b3[0] == a3 && (b3[1] = function() {
          });
        });
      }, f.prototype = { _play: function(c3) {
        c3._timing = a2.normalizeTimingInput(c3.timing);
        var d3 = new b2.Animation(c3);
        return d3._idle = false, d3._timeline = this, this._animations.push(d3), b2.restart(), b2.applyDirtiedAnimation(d3), d3;
      } };
      var l = void 0, m = false, n = false;
      b2.restart = function() {
        return m || (m = true, requestAnimationFrame(function() {
        }), n = true), n;
      }, b2.applyDirtiedAnimation = function(a3) {
        if (!p) {
          a3._markTarget();
          var c3 = a3._targetAnimations();
          c3.sort(e), h(b2.timeline.currentTime, false, c3.slice())[1].forEach(function(a4) {
            var b3 = q._animations.indexOf(a4);
            -1 !== b3 && q._animations.splice(b3, 1);
          }), g();
        }
      };
      var o = [], p = false, q = new f();
      b2.timeline = q;
    }(a, b), function(a2, b2) {
      function c2(a3, b3) {
        for (var c3 = 0, d3 = 0; d3 < a3.length; d3++) c3 += a3[d3] * b3[d3];
        return c3;
      }
      function d2(a3, b3) {
        return [a3[0] * b3[0] + a3[4] * b3[1] + a3[8] * b3[2] + a3[12] * b3[3], a3[1] * b3[0] + a3[5] * b3[1] + a3[9] * b3[2] + a3[13] * b3[3], a3[2] * b3[0] + a3[6] * b3[1] + a3[10] * b3[2] + a3[14] * b3[3], a3[3] * b3[0] + a3[7] * b3[1] + a3[11] * b3[2] + a3[15] * b3[3], a3[0] * b3[4] + a3[4] * b3[5] + a3[8] * b3[6] + a3[12] * b3[7], a3[1] * b3[4] + a3[5] * b3[5] + a3[9] * b3[6] + a3[13] * b3[7], a3[2] * b3[4] + a3[6] * b3[5] + a3[10] * b3[6] + a3[14] * b3[7], a3[3] * b3[4] + a3[7] * b3[5] + a3[11] * b3[6] + a3[15] * b3[7], a3[0] * b3[8] + a3[4] * b3[9] + a3[8] * b3[10] + a3[12] * b3[11], a3[1] * b3[8] + a3[5] * b3[9] + a3[9] * b3[10] + a3[13] * b3[11], a3[2] * b3[8] + a3[6] * b3[9] + a3[10] * b3[10] + a3[14] * b3[11], a3[3] * b3[8] + a3[7] * b3[9] + a3[11] * b3[10] + a3[15] * b3[11], a3[0] * b3[12] + a3[4] * b3[13] + a3[8] * b3[14] + a3[12] * b3[15], a3[1] * b3[12] + a3[5] * b3[13] + a3[9] * b3[14] + a3[13] * b3[15], a3[2] * b3[12] + a3[6] * b3[13] + a3[10] * b3[14] + a3[14] * b3[15], a3[3] * b3[12] + a3[7] * b3[13] + a3[11] * b3[14] + a3[15] * b3[15]];
      }
      function e(a3) {
        var b3 = a3.rad || 0;
        return ((a3.deg || 0) / 360 + (a3.grad || 0) / 400 + (a3.turn || 0)) * (2 * Math.PI) + b3;
      }
      function f(a3) {
        switch (a3.t) {
          case "rotatex":
            var b3 = e(a3.d[0]);
            return [1, 0, 0, 0, 0, Math.cos(b3), Math.sin(b3), 0, 0, -Math.sin(b3), Math.cos(b3), 0, 0, 0, 0, 1];
          case "rotatey":
            var b3 = e(a3.d[0]);
            return [Math.cos(b3), 0, -Math.sin(b3), 0, 0, 1, 0, 0, Math.sin(b3), 0, Math.cos(b3), 0, 0, 0, 0, 1];
          case "rotate":
          case "rotatez":
            var b3 = e(a3.d[0]);
            return [Math.cos(b3), Math.sin(b3), 0, 0, -Math.sin(b3), Math.cos(b3), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
          case "rotate3d":
            var c3 = a3.d[0], d3 = a3.d[1], f2 = a3.d[2], b3 = e(a3.d[3]), g2 = c3 * c3 + d3 * d3 + f2 * f2;
            if (0 === g2) c3 = 1, d3 = 0, f2 = 0;
            else if (1 !== g2) {
              var h2 = Math.sqrt(g2);
              c3 /= h2, d3 /= h2, f2 /= h2;
            }
            var i2 = Math.sin(b3 / 2), j = i2 * Math.cos(b3 / 2), k = i2 * i2;
            return [1 - 2 * (d3 * d3 + f2 * f2) * k, 2 * (c3 * d3 * k + f2 * j), 2 * (c3 * f2 * k - d3 * j), 0, 2 * (c3 * d3 * k - f2 * j), 1 - 2 * (c3 * c3 + f2 * f2) * k, 2 * (d3 * f2 * k + c3 * j), 0, 2 * (c3 * f2 * k + d3 * j), 2 * (d3 * f2 * k - c3 * j), 1 - 2 * (c3 * c3 + d3 * d3) * k, 0, 0, 0, 0, 1];
          case "scale":
            return [a3.d[0], 0, 0, 0, 0, a3.d[1], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
          case "scalex":
            return [a3.d[0], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
          case "scaley":
            return [1, 0, 0, 0, 0, a3.d[0], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
          case "scalez":
            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, a3.d[0], 0, 0, 0, 0, 1];
          case "scale3d":
            return [a3.d[0], 0, 0, 0, 0, a3.d[1], 0, 0, 0, 0, a3.d[2], 0, 0, 0, 0, 1];
          case "skew":
            var l = e(a3.d[0]), m = e(a3.d[1]);
            return [1, Math.tan(m), 0, 0, Math.tan(l), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
          case "skewx":
            var b3 = e(a3.d[0]);
            return [1, 0, 0, 0, Math.tan(b3), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
          case "skewy":
            var b3 = e(a3.d[0]);
            return [1, Math.tan(b3), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
          case "translate":
            var c3 = a3.d[0].px || 0, d3 = a3.d[1].px || 0;
            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c3, d3, 0, 1];
          case "translatex":
            var c3 = a3.d[0].px || 0;
            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c3, 0, 0, 1];
          case "translatey":
            var d3 = a3.d[0].px || 0;
            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, d3, 0, 1];
          case "translatez":
            var f2 = a3.d[0].px || 0;
            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, f2, 1];
          case "translate3d":
            var c3 = a3.d[0].px || 0, d3 = a3.d[1].px || 0, f2 = a3.d[2].px || 0;
            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c3, d3, f2, 1];
          case "perspective":
            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, a3.d[0].px ? -1 / a3.d[0].px : 0, 0, 0, 0, 1];
          case "matrix":
            return [a3.d[0], a3.d[1], 0, 0, a3.d[2], a3.d[3], 0, 0, 0, 0, 1, 0, a3.d[4], a3.d[5], 0, 1];
          case "matrix3d":
            return a3.d;
        }
      }
      function g(a3) {
        return 0 === a3.length ? [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] : a3.map(f).reduce(d2);
      }
      function h(a3) {
        return [i(g(a3))];
      }
      var i = /* @__PURE__ */ function() {
        function a3(a4) {
          return a4[0][0] * a4[1][1] * a4[2][2] + a4[1][0] * a4[2][1] * a4[0][2] + a4[2][0] * a4[0][1] * a4[1][2] - a4[0][2] * a4[1][1] * a4[2][0] - a4[1][2] * a4[2][1] * a4[0][0] - a4[2][2] * a4[0][1] * a4[1][0];
        }
        function b3(b4) {
          for (var c3 = 1 / a3(b4), d4 = b4[0][0], e3 = b4[0][1], f3 = b4[0][2], g3 = b4[1][0], h3 = b4[1][1], i3 = b4[1][2], j2 = b4[2][0], k = b4[2][1], l = b4[2][2], m = [[(h3 * l - i3 * k) * c3, (f3 * k - e3 * l) * c3, (e3 * i3 - f3 * h3) * c3, 0], [(i3 * j2 - g3 * l) * c3, (d4 * l - f3 * j2) * c3, (f3 * g3 - d4 * i3) * c3, 0], [(g3 * k - h3 * j2) * c3, (j2 * e3 - d4 * k) * c3, (d4 * h3 - e3 * g3) * c3, 0]], n = [], o = 0; o < 3; o++) {
            for (var p = 0, q = 0; q < 3; q++) p += b4[3][q] * m[q][o];
            n.push(p);
          }
          return n.push(1), m.push(n), m;
        }
        function d3(a4) {
          return [[a4[0][0], a4[1][0], a4[2][0], a4[3][0]], [a4[0][1], a4[1][1], a4[2][1], a4[3][1]], [a4[0][2], a4[1][2], a4[2][2], a4[3][2]], [a4[0][3], a4[1][3], a4[2][3], a4[3][3]]];
        }
        function e2(a4, b4) {
          for (var c3 = [], d4 = 0; d4 < 4; d4++) {
            for (var e3 = 0, f3 = 0; f3 < 4; f3++) e3 += a4[f3] * b4[f3][d4];
            c3.push(e3);
          }
          return c3;
        }
        function f2(a4) {
          var b4 = g2(a4);
          return [a4[0] / b4, a4[1] / b4, a4[2] / b4];
        }
        function g2(a4) {
          return Math.sqrt(a4[0] * a4[0] + a4[1] * a4[1] + a4[2] * a4[2]);
        }
        function h2(a4, b4, c3, d4) {
          return [c3 * a4[0] + d4 * b4[0], c3 * a4[1] + d4 * b4[1], c3 * a4[2] + d4 * b4[2]];
        }
        function i2(a4, b4) {
          return [a4[1] * b4[2] - a4[2] * b4[1], a4[2] * b4[0] - a4[0] * b4[2], a4[0] * b4[1] - a4[1] * b4[0]];
        }
        function j(j2) {
          var k = [j2.slice(0, 4), j2.slice(4, 8), j2.slice(8, 12), j2.slice(12, 16)];
          if (1 !== k[3][3]) return null;
          for (var l = [], m = 0; m < 4; m++) l.push(k[m].slice());
          for (var m = 0; m < 3; m++) l[m][3] = 0;
          if (0 === a3(l)) return null;
          var n, o = [];
          k[0][3] || k[1][3] || k[2][3] ? (o.push(k[0][3]), o.push(k[1][3]), o.push(k[2][3]), o.push(k[3][3]), n = e2(o, d3(b3(l)))) : n = [0, 0, 0, 1];
          var p = k[3].slice(0, 3), q = [];
          q.push(k[0].slice(0, 3));
          var r = [];
          r.push(g2(q[0])), q[0] = f2(q[0]);
          var s = [];
          q.push(k[1].slice(0, 3)), s.push(c2(q[0], q[1])), q[1] = h2(q[1], q[0], 1, -s[0]), r.push(g2(q[1])), q[1] = f2(q[1]), s[0] /= r[1], q.push(k[2].slice(0, 3)), s.push(c2(q[0], q[2])), q[2] = h2(q[2], q[0], 1, -s[1]), s.push(c2(q[1], q[2])), q[2] = h2(q[2], q[1], 1, -s[2]), r.push(g2(q[2])), q[2] = f2(q[2]), s[1] /= r[2], s[2] /= r[2];
          var t = i2(q[1], q[2]);
          if (c2(q[0], t) < 0) for (var m = 0; m < 3; m++) r[m] *= -1, q[m][0] *= -1, q[m][1] *= -1, q[m][2] *= -1;
          var u, v, w = q[0][0] + q[1][1] + q[2][2] + 1;
          return w > 1e-4 ? (u = 0.5 / Math.sqrt(w), v = [(q[2][1] - q[1][2]) * u, (q[0][2] - q[2][0]) * u, (q[1][0] - q[0][1]) * u, 0.25 / u]) : q[0][0] > q[1][1] && q[0][0] > q[2][2] ? (u = 2 * Math.sqrt(1 + q[0][0] - q[1][1] - q[2][2]), v = [0.25 * u, (q[0][1] + q[1][0]) / u, (q[0][2] + q[2][0]) / u, (q[2][1] - q[1][2]) / u]) : q[1][1] > q[2][2] ? (u = 2 * Math.sqrt(1 + q[1][1] - q[0][0] - q[2][2]), v = [(q[0][1] + q[1][0]) / u, 0.25 * u, (q[1][2] + q[2][1]) / u, (q[0][2] - q[2][0]) / u]) : (u = 2 * Math.sqrt(1 + q[2][2] - q[0][0] - q[1][1]), v = [(q[0][2] + q[2][0]) / u, (q[1][2] + q[2][1]) / u, 0.25 * u, (q[1][0] - q[0][1]) / u]), [p, r, s, v, n];
        }
        return j;
      }();
      a2.dot = c2, a2.makeMatrixDecomposition = h, a2.transformListToMatrix = g;
    }(b), function(a2) {
      function b2(a3, b3) {
        var c3 = a3.exec(b3);
        if (c3) return c3 = a3.ignoreCase ? c3[0].toLowerCase() : c3[0], [c3, b3.substr(c3.length)];
      }
      function c2(a3, b3) {
        b3 = b3.replace(/^\s*/, "");
        var c3 = a3(b3);
        if (c3) return [c3[0], c3[1].replace(/^\s*/, "")];
      }
      function d2(a3, d3, e2) {
        a3 = c2.bind(null, a3);
        for (var f2 = []; ; ) {
          var g2 = a3(e2);
          if (!g2) return [f2, e2];
          if (f2.push(g2[0]), e2 = g2[1], !(g2 = b2(d3, e2)) || "" == g2[1]) return [f2, e2];
          e2 = g2[1];
        }
      }
      function e(a3, b3) {
        for (var c3 = 0, d3 = 0; d3 < b3.length && (!/\s|,/.test(b3[d3]) || 0 != c3); d3++) if ("(" == b3[d3]) c3++;
        else if (")" == b3[d3] && (c3--, 0 == c3 && d3++, c3 <= 0)) break;
        var e2 = a3(b3.substr(0, d3));
        return void 0 == e2 ? void 0 : [e2, b3.substr(d3)];
      }
      function f(a3, b3) {
        for (var c3 = a3, d3 = b3; c3 && d3; ) c3 > d3 ? c3 %= d3 : d3 %= c3;
        return c3 = a3 * b3 / (c3 + d3);
      }
      function g(a3) {
        return function(b3) {
          var c3 = a3(b3);
          return c3 && (c3[0] = void 0), c3;
        };
      }
      function h(a3, b3) {
        return function(c3) {
          return a3(c3) || [b3, c3];
        };
      }
      function i(b3, c3) {
        for (var d3 = [], e2 = 0; e2 < b3.length; e2++) {
          var f2 = a2.consumeTrimmed(b3[e2], c3);
          if (!f2 || "" == f2[0]) return;
          void 0 !== f2[0] && d3.push(f2[0]), c3 = f2[1];
        }
        if ("" == c3) return d3;
      }
      function j(a3, b3, c3, d3, e2) {
        for (var g2 = [], h2 = [], i2 = [], j2 = f(d3.length, e2.length), k2 = 0; k2 < j2; k2++) {
          var l = b3(d3[k2 % d3.length], e2[k2 % e2.length]);
          if (!l) return;
          g2.push(l[0]), h2.push(l[1]), i2.push(l[2]);
        }
        return [g2, h2, function(b4) {
          var d4 = b4.map(function(a4, b5) {
            return i2[b5](a4);
          }).join(c3);
          return a3 ? a3(d4) : d4;
        }];
      }
      function k(a3, b3, c3) {
        for (var d3 = [], e2 = [], f2 = [], g2 = 0, h2 = 0; h2 < c3.length; h2++) if ("function" == typeof c3[h2]) {
          var i2 = c3[h2](a3[g2], b3[g2++]);
          d3.push(i2[0]), e2.push(i2[1]), f2.push(i2[2]);
        } else !function(a4) {
          d3.push(false), e2.push(false), f2.push(function() {
            return c3[a4];
          });
        }(h2);
        return [d3, e2, function(a4) {
          for (var b4 = "", c4 = 0; c4 < a4.length; c4++) b4 += f2[c4](a4[c4]);
          return b4;
        }];
      }
      a2.consumeToken = b2, a2.consumeTrimmed = c2, a2.consumeRepeated = d2, a2.consumeParenthesised = e, a2.ignore = g, a2.optional = h, a2.consumeList = i, a2.mergeNestedRepeated = j.bind(null, null), a2.mergeWrappedNestedRepeated = j, a2.mergeList = k;
    }(b), function(a2) {
      function b2(b3) {
        function c3(b4) {
          var c4 = a2.consumeToken(/^inset/i, b4);
          return c4 ? (d3.inset = true, c4) : (c4 = a2.consumeLengthOrPercent(b4)) ? (d3.lengths.push(c4[0]), c4) : (c4 = a2.consumeColor(b4), c4 ? (d3.color = c4[0], c4) : void 0);
        }
        var d3 = { inset: false, lengths: [], color: null }, e2 = a2.consumeRepeated(c3, /^/, b3);
        if (e2 && e2[0].length) return [d3, e2[1]];
      }
      function c2(c3) {
        var d3 = a2.consumeRepeated(b2, /^,/, c3);
        if (d3 && "" == d3[1]) return d3[0];
      }
      function d2(b3, c3) {
        for (; b3.lengths.length < Math.max(b3.lengths.length, c3.lengths.length); ) b3.lengths.push({ px: 0 });
        for (; c3.lengths.length < Math.max(b3.lengths.length, c3.lengths.length); ) c3.lengths.push({ px: 0 });
        if (b3.inset == c3.inset && !!b3.color == !!c3.color) {
          for (var d3, e2 = [], f2 = [[], 0], g = [[], 0], h = 0; h < b3.lengths.length; h++) {
            var i = a2.mergeDimensions(b3.lengths[h], c3.lengths[h], 2 == h);
            f2[0].push(i[0]), g[0].push(i[1]), e2.push(i[2]);
          }
          if (b3.color && c3.color) {
            var j = a2.mergeColors(b3.color, c3.color);
            f2[1] = j[0], g[1] = j[1], d3 = j[2];
          }
          return [f2, g, function(a3) {
            for (var c4 = b3.inset ? "inset " : " ", f3 = 0; f3 < e2.length; f3++) c4 += e2[f3](a3[0][f3]) + " ";
            return d3 && (c4 += d3(a3[1])), c4;
          }];
        }
      }
      function e(b3, c3, d3, e2) {
        function f2(a3) {
          return { inset: a3, color: [0, 0, 0, 0], lengths: [{ px: 0 }, { px: 0 }, { px: 0 }, { px: 0 }] };
        }
        for (var g = [], h = [], i = 0; i < d3.length || i < e2.length; i++) {
          var j = d3[i] || f2(e2[i].inset), k = e2[i] || f2(d3[i].inset);
          g.push(j), h.push(k);
        }
        return a2.mergeNestedRepeated(b3, c3, g, h);
      }
      var f = e.bind(null, d2, ", ");
      a2.addPropertiesHandler(c2, f, ["box-shadow", "text-shadow"]);
    }(b), function(a2, b2) {
      function c2(a3) {
        return a3.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
      }
      function d2(a3, b3, c3) {
        return Math.min(b3, Math.max(a3, c3));
      }
      function e(a3) {
        if (/^\s*[-+]?(\d*\.)?\d+\s*$/.test(a3)) return Number(a3);
      }
      function f(a3, b3) {
        return [a3, b3, c2];
      }
      function g(a3, b3) {
        if (0 != a3) return i(0, 1 / 0)(a3, b3);
      }
      function h(a3, b3) {
        return [a3, b3, function(a4) {
          return Math.round(d2(1, 1 / 0, a4));
        }];
      }
      function i(a3, b3) {
        return function(e2, f2) {
          return [e2, f2, function(e3) {
            return c2(d2(a3, b3, e3));
          }];
        };
      }
      function j(a3) {
        var b3 = a3.trim().split(/\s*[\s,]\s*/);
        if (0 !== b3.length) {
          for (var c3 = [], d3 = 0; d3 < b3.length; d3++) {
            var f2 = e(b3[d3]);
            if (void 0 === f2) return;
            c3.push(f2);
          }
          return c3;
        }
      }
      function k(a3, b3) {
        if (a3.length == b3.length) return [a3, b3, function(a4) {
          return a4.map(c2).join(" ");
        }];
      }
      function l(a3, b3) {
        return [a3, b3, Math.round];
      }
      a2.clamp = d2, a2.addPropertiesHandler(j, k, ["stroke-dasharray"]), a2.addPropertiesHandler(e, i(0, 1 / 0), ["border-image-width", "line-height"]), a2.addPropertiesHandler(e, i(0, 1), ["opacity", "shape-image-threshold"]), a2.addPropertiesHandler(e, g, ["flex-grow", "flex-shrink"]), a2.addPropertiesHandler(e, h, ["orphans", "widows"]), a2.addPropertiesHandler(e, l, ["z-index"]), a2.parseNumber = e, a2.parseNumberList = j, a2.mergeNumbers = f, a2.numberToString = c2;
    }(b), function(a2, b2) {
      function c2(a3, b3) {
        if ("visible" == a3 || "visible" == b3) return [0, 1, function(c3) {
          return c3 <= 0 ? a3 : c3 >= 1 ? b3 : "visible";
        }];
      }
      a2.addPropertiesHandler(String, c2, ["visibility"]);
    }(b), function(a2, b2) {
      function c2(a3) {
        a3 = a3.trim(), f.fillStyle = "#000", f.fillStyle = a3;
        var b3 = f.fillStyle;
        if (f.fillStyle = "#fff", f.fillStyle = a3, b3 == f.fillStyle) {
          f.fillRect(0, 0, 1, 1);
          var c3 = f.getImageData(0, 0, 1, 1).data;
          f.clearRect(0, 0, 1, 1);
          var d3 = c3[3] / 255;
          return [c3[0] * d3, c3[1] * d3, c3[2] * d3, d3];
        }
      }
      function d2(b3, c3) {
        return [b3, c3, function(b4) {
          function c4(a3) {
            return Math.max(0, Math.min(255, a3));
          }
          if (b4[3]) for (var d3 = 0; d3 < 3; d3++) b4[d3] = Math.round(c4(b4[d3] / b4[3]));
          return b4[3] = a2.numberToString(a2.clamp(0, 1, b4[3])), "rgba(" + b4.join(",") + ")";
        }];
      }
      var e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
      e.width = e.height = 1;
      var f = e.getContext("2d");
      a2.addPropertiesHandler(c2, d2, ["background-color", "border-bottom-color", "border-left-color", "border-right-color", "border-top-color", "color", "fill", "flood-color", "lighting-color", "outline-color", "stop-color", "stroke", "text-decoration-color"]), a2.consumeColor = a2.consumeParenthesised.bind(null, c2), a2.mergeColors = d2;
    }(b), function(a2, b2) {
      function c2(a3) {
        function b3() {
          var b4 = h2.exec(a3);
          g2 = b4 ? b4[0] : void 0;
        }
        function c3() {
          var a4 = Number(g2);
          return b3(), a4;
        }
        function d3() {
          if ("(" !== g2) return c3();
          b3();
          var a4 = f2();
          return ")" !== g2 ? NaN : (b3(), a4);
        }
        function e2() {
          for (var a4 = d3(); "*" === g2 || "/" === g2; ) {
            var c4 = g2;
            b3();
            var e3 = d3();
            "*" === c4 ? a4 *= e3 : a4 /= e3;
          }
          return a4;
        }
        function f2() {
          for (var a4 = e2(); "+" === g2 || "-" === g2; ) {
            var c4 = g2;
            b3();
            var d4 = e2();
            "+" === c4 ? a4 += d4 : a4 -= d4;
          }
          return a4;
        }
        var g2, h2 = /([\+\-\w\.]+|[\(\)\*\/])/g;
        return b3(), f2();
      }
      function d2(a3, b3) {
        if ("0" == (b3 = b3.trim().toLowerCase()) && "px".search(a3) >= 0) return { px: 0 };
        if (/^[^(]*$|^calc/.test(b3)) {
          b3 = b3.replace(/calc\(/g, "(");
          var d3 = {};
          b3 = b3.replace(a3, function(a4) {
            return d3[a4] = null, "U" + a4;
          });
          for (var e2 = "U(" + a3.source + ")", f2 = b3.replace(/[-+]?(\d*\.)?\d+([Ee][-+]?\d+)?/g, "N").replace(new RegExp("N" + e2, "g"), "D").replace(/\s[+-]\s/g, "O").replace(/\s/g, ""), g2 = [/N\*(D)/g, /(N|D)[*\/]N/g, /(N|D)O\1/g, /\((N|D)\)/g], h2 = 0; h2 < g2.length; ) g2[h2].test(f2) ? (f2 = f2.replace(g2[h2], "$1"), h2 = 0) : h2++;
          if ("D" == f2) {
            for (var i2 in d3) {
              var j2 = c2(b3.replace(new RegExp("U" + i2, "g"), "").replace(new RegExp(e2, "g"), "*0"));
              if (!isFinite(j2)) return;
              d3[i2] = j2;
            }
            return d3;
          }
        }
      }
      function e(a3, b3) {
        return f(a3, b3, true);
      }
      function f(b3, c3, d3) {
        var e2, f2 = [];
        for (e2 in b3) f2.push(e2);
        for (e2 in c3) f2.indexOf(e2) < 0 && f2.push(e2);
        return b3 = f2.map(function(a3) {
          return b3[a3] || 0;
        }), c3 = f2.map(function(a3) {
          return c3[a3] || 0;
        }), [b3, c3, function(b4) {
          var c4 = b4.map(function(c5, e3) {
            return 1 == b4.length && d3 && (c5 = Math.max(c5, 0)), a2.numberToString(c5) + f2[e3];
          }).join(" + ");
          return b4.length > 1 ? "calc(" + c4 + ")" : c4;
        }];
      }
      var g = "px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc", h = d2.bind(null, new RegExp(g, "g")), i = d2.bind(null, new RegExp(g + "|%", "g")), j = d2.bind(null, /deg|rad|grad|turn/g);
      a2.parseLength = h, a2.parseLengthOrPercent = i, a2.consumeLengthOrPercent = a2.consumeParenthesised.bind(null, i), a2.parseAngle = j, a2.mergeDimensions = f;
      var k = a2.consumeParenthesised.bind(null, h), l = a2.consumeRepeated.bind(void 0, k, /^/), m = a2.consumeRepeated.bind(void 0, l, /^,/);
      a2.consumeSizePairList = m;
      var n = function(a3) {
        var b3 = m(a3);
        if (b3 && "" == b3[1]) return b3[0];
      }, o = a2.mergeNestedRepeated.bind(void 0, e, " "), p = a2.mergeNestedRepeated.bind(void 0, o, ",");
      a2.mergeNonNegativeSizePair = o, a2.addPropertiesHandler(n, p, ["background-size"]), a2.addPropertiesHandler(i, e, ["border-bottom-width", "border-image-width", "border-left-width", "border-right-width", "border-top-width", "flex-basis", "font-size", "height", "line-height", "max-height", "max-width", "outline-width", "width"]), a2.addPropertiesHandler(i, f, ["border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius", "bottom", "left", "letter-spacing", "margin-bottom", "margin-left", "margin-right", "margin-top", "min-height", "min-width", "outline-offset", "padding-bottom", "padding-left", "padding-right", "padding-top", "perspective", "right", "shape-margin", "stroke-dashoffset", "text-indent", "top", "vertical-align", "word-spacing"]);
    }(b), function(a2, b2) {
      function c2(b3) {
        return a2.consumeLengthOrPercent(b3) || a2.consumeToken(/^auto/, b3);
      }
      function d2(b3) {
        var d3 = a2.consumeList([a2.ignore(a2.consumeToken.bind(null, /^rect/)), a2.ignore(a2.consumeToken.bind(null, /^\(/)), a2.consumeRepeated.bind(null, c2, /^,/), a2.ignore(a2.consumeToken.bind(null, /^\)/))], b3);
        if (d3 && 4 == d3[0].length) return d3[0];
      }
      function e(b3, c3) {
        return "auto" == b3 || "auto" == c3 ? [true, false, function(d3) {
          var e2 = d3 ? b3 : c3;
          if ("auto" == e2) return "auto";
          var f2 = a2.mergeDimensions(e2, e2);
          return f2[2](f2[0]);
        }] : a2.mergeDimensions(b3, c3);
      }
      function f(a3) {
        return "rect(" + a3 + ")";
      }
      var g = a2.mergeWrappedNestedRepeated.bind(null, f, e, ", ");
      a2.parseBox = d2, a2.mergeBoxes = g, a2.addPropertiesHandler(d2, g, ["clip"]);
    }(b), function(a2, b2) {
      function c2(a3) {
        return function(b3) {
          var c3 = 0;
          return a3.map(function(a4) {
            return a4 === k ? b3[c3++] : a4;
          });
        };
      }
      function d2(a3) {
        return a3;
      }
      function e(b3) {
        if ("none" == (b3 = b3.toLowerCase().trim())) return [];
        for (var c3, d3 = /\s*(\w+)\(([^)]*)\)/g, e2 = [], f2 = 0; c3 = d3.exec(b3); ) {
          if (c3.index != f2) return;
          f2 = c3.index + c3[0].length;
          var g2 = c3[1], h2 = n[g2];
          if (!h2) return;
          var i2 = c3[2].split(","), j2 = h2[0];
          if (j2.length < i2.length) return;
          for (var k2 = [], o = 0; o < j2.length; o++) {
            var p, q = i2[o], r = j2[o];
            if (void 0 === (p = q ? { A: function(b4) {
              return "0" == b4.trim() ? m : a2.parseAngle(b4);
            }, N: a2.parseNumber, T: a2.parseLengthOrPercent, L: a2.parseLength }[r.toUpperCase()](q) : { a: m, n: k2[0], t: l }[r])) return;
            k2.push(p);
          }
          if (e2.push({ t: g2, d: k2 }), d3.lastIndex == b3.length) return e2;
        }
      }
      function f(a3) {
        return a3.toFixed(6).replace(".000000", "");
      }
      function g(b3, c3) {
        if (b3.decompositionPair !== c3) {
          b3.decompositionPair = c3;
          var d3 = a2.makeMatrixDecomposition(b3);
        }
        if (c3.decompositionPair !== b3) {
          c3.decompositionPair = b3;
          var e2 = a2.makeMatrixDecomposition(c3);
        }
        return null == d3[0] || null == e2[0] ? [[false], [true], function(a3) {
          return a3 ? c3[0].d : b3[0].d;
        }] : (d3[0].push(0), e2[0].push(1), [d3, e2, function(b4) {
          var c4 = a2.quat(d3[0][3], e2[0][3], b4[5]);
          return a2.composeMatrix(b4[0], b4[1], b4[2], c4, b4[4]).map(f).join(",");
        }]);
      }
      function h(a3) {
        return a3.replace(/[xy]/, "");
      }
      function i(a3) {
        return a3.replace(/(x|y|z|3d)?$/, "3d");
      }
      function j(b3, c3) {
        var d3 = a2.makeMatrixDecomposition && true, e2 = false;
        if (!b3.length || !c3.length) {
          b3.length || (e2 = true, b3 = c3, c3 = []);
          for (var f2 = 0; f2 < b3.length; f2++) {
            var j2 = b3[f2].t, k2 = b3[f2].d, l2 = "scale" == j2.substr(0, 5) ? 1 : 0;
            c3.push({ t: j2, d: k2.map(function(a3) {
              if ("number" == typeof a3) return l2;
              var b4 = {};
              for (var c4 in a3) b4[c4] = l2;
              return b4;
            }) });
          }
        }
        var m2 = function(a3, b4) {
          return "perspective" == a3 && "perspective" == b4 || ("matrix" == a3 || "matrix3d" == a3) && ("matrix" == b4 || "matrix3d" == b4);
        }, o = [], p = [], q = [];
        if (b3.length != c3.length) {
          if (!d3) return;
          var r = g(b3, c3);
          o = [r[0]], p = [r[1]], q = [["matrix", [r[2]]]];
        } else for (var f2 = 0; f2 < b3.length; f2++) {
          var j2, s = b3[f2].t, t = c3[f2].t, u = b3[f2].d, v = c3[f2].d, w = n[s], x = n[t];
          if (m2(s, t)) {
            if (!d3) return;
            var r = g([b3[f2]], [c3[f2]]);
            o.push(r[0]), p.push(r[1]), q.push(["matrix", [r[2]]]);
          } else {
            if (s == t) j2 = s;
            else if (w[2] && x[2] && h(s) == h(t)) j2 = h(s), u = w[2](u), v = x[2](v);
            else {
              if (!w[1] || !x[1] || i(s) != i(t)) {
                if (!d3) return;
                var r = g(b3, c3);
                o = [r[0]], p = [r[1]], q = [["matrix", [r[2]]]];
                break;
              }
              j2 = i(s), u = w[1](u), v = x[1](v);
            }
            for (var y = [], z = [], A = [], B = 0; B < u.length; B++) {
              var C = "number" == typeof u[B] ? a2.mergeNumbers : a2.mergeDimensions, r = C(u[B], v[B]);
              y[B] = r[0], z[B] = r[1], A.push(r[2]);
            }
            o.push(y), p.push(z), q.push([j2, A]);
          }
        }
        if (e2) {
          var D = o;
          o = p, p = D;
        }
        return [o, p, function(a3) {
          return a3.map(function(a4, b4) {
            var c4 = a4.map(function(a5, c5) {
              return q[b4][1][c5](a5);
            }).join(",");
            return "matrix" == q[b4][0] && 16 == c4.split(",").length && (q[b4][0] = "matrix3d"), q[b4][0] + "(" + c4 + ")";
          }).join(" ");
        }];
      }
      var k = null, l = { px: 0 }, m = { deg: 0 }, n = { matrix: ["NNNNNN", [k, k, 0, 0, k, k, 0, 0, 0, 0, 1, 0, k, k, 0, 1], d2], matrix3d: ["NNNNNNNNNNNNNNNN", d2], rotate: ["A"], rotatex: ["A"], rotatey: ["A"], rotatez: ["A"], rotate3d: ["NNNA"], perspective: ["L"], scale: ["Nn", c2([k, k, 1]), d2], scalex: ["N", c2([k, 1, 1]), c2([k, 1])], scaley: ["N", c2([1, k, 1]), c2([1, k])], scalez: ["N", c2([1, 1, k])], scale3d: ["NNN", d2], skew: ["Aa", null, d2], skewx: ["A", null, c2([k, m])], skewy: ["A", null, c2([m, k])], translate: ["Tt", c2([k, k, l]), d2], translatex: ["T", c2([k, l, l]), c2([k, l])], translatey: ["T", c2([l, k, l]), c2([l, k])], translatez: ["L", c2([l, l, k])], translate3d: ["TTL", d2] };
      a2.addPropertiesHandler(e, j, ["transform"]), a2.transformToSvgMatrix = function(b3) {
        var c3 = a2.transformListToMatrix(e(b3));
        return "matrix(" + f(c3[0]) + " " + f(c3[1]) + " " + f(c3[4]) + " " + f(c3[5]) + " " + f(c3[12]) + " " + f(c3[13]) + ")";
      };
    }(b), function(a2) {
      function b2(a3) {
        var b3 = Number(a3);
        if (!(isNaN(b3) || b3 < 100 || b3 > 900 || b3 % 100 != 0)) return b3;
      }
      function c2(b3) {
        return b3 = 100 * Math.round(b3 / 100), b3 = a2.clamp(100, 900, b3), 400 === b3 ? "normal" : 700 === b3 ? "bold" : String(b3);
      }
      function d2(a3, b3) {
        return [a3, b3, c2];
      }
      a2.addPropertiesHandler(b2, d2, ["font-weight"]);
    }(b), function(a2) {
      function b2(a3) {
        var b3 = {};
        for (var c3 in a3) b3[c3] = -a3[c3];
        return b3;
      }
      function c2(b3) {
        return a2.consumeToken(/^(left|center|right|top|bottom)\b/i, b3) || a2.consumeLengthOrPercent(b3);
      }
      function d2(b3, d3) {
        var e2 = a2.consumeRepeated(c2, /^/, d3);
        if (e2 && "" == e2[1]) {
          var f2 = e2[0];
          if (f2[0] = f2[0] || "center", f2[1] = f2[1] || "center", 3 == b3 && (f2[2] = f2[2] || { px: 0 }), f2.length == b3) {
            if (/top|bottom/.test(f2[0]) || /left|right/.test(f2[1])) {
              var h2 = f2[0];
              f2[0] = f2[1], f2[1] = h2;
            }
            if (/left|right|center|Object/.test(f2[0]) && /top|bottom|center|Object/.test(f2[1])) return f2.map(function(a3) {
              return "object" == typeof a3 ? a3 : g[a3];
            });
          }
        }
      }
      function e(d3) {
        var e2 = a2.consumeRepeated(c2, /^/, d3);
        if (e2) {
          for (var f2 = e2[0], h2 = [{ "%": 50 }, { "%": 50 }], i2 = 0, j = false, k = 0; k < f2.length; k++) {
            var l = f2[k];
            "string" == typeof l ? (j = /bottom|right/.test(l), i2 = { left: 0, right: 0, center: i2, top: 1, bottom: 1 }[l], h2[i2] = g[l], "center" == l && i2++) : (j && (l = b2(l), l["%"] = (l["%"] || 0) + 100), h2[i2] = l, i2++, j = false);
          }
          return [h2, e2[1]];
        }
      }
      function f(b3) {
        var c3 = a2.consumeRepeated(e, /^,/, b3);
        if (c3 && "" == c3[1]) return c3[0];
      }
      var g = { left: { "%": 0 }, center: { "%": 50 }, right: { "%": 100 }, top: { "%": 0 }, bottom: { "%": 100 } }, h = a2.mergeNestedRepeated.bind(null, a2.mergeDimensions, " ");
      a2.addPropertiesHandler(d2.bind(null, 3), h, ["transform-origin"]), a2.addPropertiesHandler(d2.bind(null, 2), h, ["perspective-origin"]), a2.consumePosition = e, a2.mergeOffsetList = h;
      var i = a2.mergeNestedRepeated.bind(null, h, ", ");
      a2.addPropertiesHandler(f, i, ["background-position", "object-position"]);
    }(b), function(a2) {
      function b2(b3) {
        var c3 = a2.consumeToken(/^circle/, b3);
        if (c3 && c3[0]) return ["circle"].concat(a2.consumeList([a2.ignore(a2.consumeToken.bind(void 0, /^\(/)), d2, a2.ignore(a2.consumeToken.bind(void 0, /^at/)), a2.consumePosition, a2.ignore(a2.consumeToken.bind(void 0, /^\)/))], c3[1]));
        var f2 = a2.consumeToken(/^ellipse/, b3);
        if (f2 && f2[0]) return ["ellipse"].concat(a2.consumeList([a2.ignore(a2.consumeToken.bind(void 0, /^\(/)), e, a2.ignore(a2.consumeToken.bind(void 0, /^at/)), a2.consumePosition, a2.ignore(a2.consumeToken.bind(void 0, /^\)/))], f2[1]));
        var g2 = a2.consumeToken(/^polygon/, b3);
        return g2 && g2[0] ? ["polygon"].concat(a2.consumeList([a2.ignore(a2.consumeToken.bind(void 0, /^\(/)), a2.optional(a2.consumeToken.bind(void 0, /^nonzero\s*,|^evenodd\s*,/), "nonzero,"), a2.consumeSizePairList, a2.ignore(a2.consumeToken.bind(void 0, /^\)/))], g2[1])) : void 0;
      }
      function c2(b3, c3) {
        if (b3[0] === c3[0]) return "circle" == b3[0] ? a2.mergeList(b3.slice(1), c3.slice(1), ["circle(", a2.mergeDimensions, " at ", a2.mergeOffsetList, ")"]) : "ellipse" == b3[0] ? a2.mergeList(b3.slice(1), c3.slice(1), ["ellipse(", a2.mergeNonNegativeSizePair, " at ", a2.mergeOffsetList, ")"]) : "polygon" == b3[0] && b3[1] == c3[1] ? a2.mergeList(b3.slice(2), c3.slice(2), ["polygon(", b3[1], g, ")"]) : void 0;
      }
      var d2 = a2.consumeParenthesised.bind(null, a2.parseLengthOrPercent), e = a2.consumeRepeated.bind(void 0, d2, /^/), f = a2.mergeNestedRepeated.bind(void 0, a2.mergeDimensions, " "), g = a2.mergeNestedRepeated.bind(void 0, f, ",");
      a2.addPropertiesHandler(b2, c2, ["shape-outside"]);
    }(b), function(a2, b2) {
      function c2(a3, b3) {
        b3.concat([a3]).forEach(function(b4) {
          b4 in document.documentElement.style && (d2[a3] = b4), e[b4] = a3;
        });
      }
      var d2 = {}, e = {};
      c2("transform", ["webkitTransform", "msTransform"]), c2("transformOrigin", ["webkitTransformOrigin"]), c2("perspective", ["webkitPerspective"]), c2("perspectiveOrigin", ["webkitPerspectiveOrigin"]), a2.propertyName = function(a3) {
        return d2[a3] || a3;
      }, a2.unprefixedPropertyName = function(a3) {
        return e[a3] || a3;
      };
    }(b);
  }(), function() {
    if (void 0 === document.createElement("div").animate([]).oncancel) {
      var a2;
      if (window.performance && performance.now) var a2 = function() {
        return performance.now();
      };
      else var a2 = function() {
        return Date.now();
      };
      var b2 = function(a3, b3, c2) {
        this.target = a3, this.currentTime = b3, this.timelineTime = c2, this.type = "cancel", this.bubbles = false, this.cancelable = false, this.currentTarget = a3, this.defaultPrevented = false, this.eventPhase = Event.AT_TARGET, this.timeStamp = Date.now();
      }, c = window.Element.prototype.animate;
      window.Element.prototype.animate = function(d, e) {
        var f = c.call(this, d, e);
        f._cancelHandlers = [], f.oncancel = null;
        var g = f.cancel;
        f.cancel = function() {
          g.call(this);
          var c2 = new b2(this, null, a2()), d2 = this._cancelHandlers.concat(this.oncancel ? [this.oncancel] : []);
          setTimeout(function() {
            d2.forEach(function(a3) {
              a3.call(c2.target, c2);
            });
          }, 0);
        };
        var h = f.addEventListener;
        f.addEventListener = function(a3, b3) {
          "function" == typeof b3 && "cancel" == a3 ? this._cancelHandlers.push(b3) : h.call(this, a3, b3);
        };
        var i = f.removeEventListener;
        return f.removeEventListener = function(a3, b3) {
          if ("cancel" == a3) {
            var c2 = this._cancelHandlers.indexOf(b3);
            c2 >= 0 && this._cancelHandlers.splice(c2, 1);
          } else i.call(this, a3, b3);
        }, f;
      };
    }
  }(), function(a2) {
    var b2 = document.documentElement, c = null, d = false;
    try {
      var e = getComputedStyle(b2).getPropertyValue("opacity"), f = "0" == e ? "1" : "0";
      c = b2.animate({ opacity: [f, f] }, { duration: 1 }), c.currentTime = 0, d = getComputedStyle(b2).getPropertyValue("opacity") == f;
    } catch (a3) {
    } finally {
      c && c.cancel();
    }
    if (!d) {
      var g = window.Element.prototype.animate;
      window.Element.prototype.animate = function(b3, c2) {
        return window.Symbol && Symbol.iterator && Array.prototype.from && b3[Symbol.iterator] && (b3 = Array.from(b3)), Array.isArray(b3) || null === b3 || (b3 = a2.convertToArrayForm(b3)), g.call(this, b3, c2);
      };
    }
  }(a);
}();
//# sourceMappingURL=web-animations-js.js.map
