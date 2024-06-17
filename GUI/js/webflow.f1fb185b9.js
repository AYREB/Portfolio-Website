/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var u = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
  var bs = u(() => {
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (a) {
          let c = window.getComputedStyle(a, null),
            d = c.getPropertyValue("position"),
            _ = c.getPropertyValue("overflow"),
            E = c.getPropertyValue("display");
          (!d || d === "static") && (a.style.position = "relative"),
            _ !== "hidden" && (a.style.overflow = "hidden"),
            (!E || E === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        o = function (a) {
          let c = window.getComputedStyle(a, null),
            d = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let _ in d)
            c.getPropertyValue(_) !== d[_] && (a.style[_] = d[_]);
        },
        i = function (a) {
          let c = a.parentNode;
          n(c),
            o(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > c.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let c = 0; c < a.length; c++) {
            if (!a[c].nodeName) continue;
            let d = a[c].nodeName.toLowerCase();
            if (d === "img") {
              if (t) continue;
              a[c].complete
                ? i(a[c])
                : a[c].addEventListener("load", function () {
                    i(this);
                  });
            } else
              d === "video"
                ? a[c].readyState > 0
                  ? i(a[c])
                  : a[c].addEventListener("loadedmetadata", function () {
                      i(this);
                    })
                : i(a[c]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var Ss = u(() => {
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (o) {
          $(this).prop("hidden", () => o === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (o) {
          $(this).prop("hidden", () => o === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        n.addEventListener("change", (o) => {
          e(!o.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (o) {
            if (Webflow.env("design")) return;
            let i = $(o.currentTarget),
              s = $(`video#${i.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                r(i),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(i);
                    });
              } else s.pause(), t(i);
          });
      });
    })();
  });
  var Wi = u(() => {
    window.tram = (function (e) {
      function t(l, m) {
        var S = new p.Bare();
        return S.init(l, m);
      }
      function r(l) {
        return l.replace(/[A-Z]/g, function (m) {
          return "-" + m.toLowerCase();
        });
      }
      function n(l) {
        var m = parseInt(l.slice(1), 16),
          S = (m >> 16) & 255,
          C = (m >> 8) & 255,
          I = 255 & m;
        return [S, C, I];
      }
      function o(l, m, S) {
        return (
          "#" + ((1 << 24) | (l << 16) | (m << 8) | S).toString(16).slice(1)
        );
      }
      function i() {}
      function s(l, m) {
        d("Type warning: Expected: [" + l + "] Got: [" + typeof m + "] " + m);
      }
      function a(l, m, S) {
        d("Units do not match [" + l + "]: " + m + ", " + S);
      }
      function c(l, m, S) {
        if ((m !== void 0 && (S = m), l === void 0)) return S;
        var C = S;
        return (
          We.test(l) || !Ye.test(l)
            ? (C = parseInt(l, 10))
            : Ye.test(l) && (C = 1e3 * parseFloat(l)),
          0 > C && (C = 0),
          C === C ? C : S
        );
      }
      function d(l) {
        oe.debug && window && window.console.warn(l);
      }
      function _(l) {
        for (var m = -1, S = l ? l.length : 0, C = []; ++m < S; ) {
          var I = l[m];
          I && C.push(I);
        }
        return C;
      }
      var E = (function (l, m, S) {
          function C(ue) {
            return typeof ue == "object";
          }
          function I(ue) {
            return typeof ue == "function";
          }
          function x() {}
          function re(ue, ye) {
            function Q() {
              var Me = new de();
              return I(Me.init) && Me.init.apply(Me, arguments), Me;
            }
            function de() {}
            ye === S && ((ye = ue), (ue = Object)), (Q.Bare = de);
            var pe,
              Ae = (x[l] = ue[l]),
              st = (de[l] = Q[l] = new x());
            return (
              (st.constructor = Q),
              (Q.mixin = function (Me) {
                return (de[l] = Q[l] = re(Q, Me)[l]), Q;
              }),
              (Q.open = function (Me) {
                if (
                  ((pe = {}),
                  I(Me) ? (pe = Me.call(Q, st, Ae, Q, ue)) : C(Me) && (pe = Me),
                  C(pe))
                )
                  for (var Ar in pe) m.call(pe, Ar) && (st[Ar] = pe[Ar]);
                return I(st.init) || (st.init = ue), Q;
              }),
              Q.open(ye)
            );
          }
          return re;
        })("prototype", {}.hasOwnProperty),
        y = {
          ease: [
            "ease",
            function (l, m, S, C) {
              var I = (l /= C) * l,
                x = I * l;
              return (
                m +
                S * (-2.75 * x * I + 11 * I * I + -15.5 * x + 8 * I + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, m, S, C) {
              var I = (l /= C) * l,
                x = I * l;
              return m + S * (-1 * x * I + 3 * I * I + -3 * x + 2 * I);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, m, S, C) {
              var I = (l /= C) * l,
                x = I * l;
              return (
                m +
                S * (0.3 * x * I + -1.6 * I * I + 2.2 * x + -1.8 * I + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, m, S, C) {
              var I = (l /= C) * l,
                x = I * l;
              return m + S * (2 * x * I + -5 * I * I + 2 * x + 2 * I);
            },
          ],
          linear: [
            "linear",
            function (l, m, S, C) {
              return (S * l) / C + m;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, m, S, C) {
              return S * (l /= C) * l + m;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, m, S, C) {
              return -S * (l /= C) * (l - 2) + m;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, m, S, C) {
              return (l /= C / 2) < 1
                ? (S / 2) * l * l + m
                : (-S / 2) * (--l * (l - 2) - 1) + m;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, m, S, C) {
              return S * (l /= C) * l * l + m;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, m, S, C) {
              return S * ((l = l / C - 1) * l * l + 1) + m;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, m, S, C) {
              return (l /= C / 2) < 1
                ? (S / 2) * l * l * l + m
                : (S / 2) * ((l -= 2) * l * l + 2) + m;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, m, S, C) {
              return S * (l /= C) * l * l * l + m;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, m, S, C) {
              return -S * ((l = l / C - 1) * l * l * l - 1) + m;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, m, S, C) {
              return (l /= C / 2) < 1
                ? (S / 2) * l * l * l * l + m
                : (-S / 2) * ((l -= 2) * l * l * l - 2) + m;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, m, S, C) {
              return S * (l /= C) * l * l * l * l + m;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, m, S, C) {
              return S * ((l = l / C - 1) * l * l * l * l + 1) + m;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, m, S, C) {
              return (l /= C / 2) < 1
                ? (S / 2) * l * l * l * l * l + m
                : (S / 2) * ((l -= 2) * l * l * l * l + 2) + m;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, m, S, C) {
              return -S * Math.cos((l / C) * (Math.PI / 2)) + S + m;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, m, S, C) {
              return S * Math.sin((l / C) * (Math.PI / 2)) + m;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, m, S, C) {
              return (-S / 2) * (Math.cos((Math.PI * l) / C) - 1) + m;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, m, S, C) {
              return l === 0 ? m : S * Math.pow(2, 10 * (l / C - 1)) + m;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, m, S, C) {
              return l === C
                ? m + S
                : S * (-Math.pow(2, (-10 * l) / C) + 1) + m;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, m, S, C) {
              return l === 0
                ? m
                : l === C
                ? m + S
                : (l /= C / 2) < 1
                ? (S / 2) * Math.pow(2, 10 * (l - 1)) + m
                : (S / 2) * (-Math.pow(2, -10 * --l) + 2) + m;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, m, S, C) {
              return -S * (Math.sqrt(1 - (l /= C) * l) - 1) + m;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, m, S, C) {
              return S * Math.sqrt(1 - (l = l / C - 1) * l) + m;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, m, S, C) {
              return (l /= C / 2) < 1
                ? (-S / 2) * (Math.sqrt(1 - l * l) - 1) + m
                : (S / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + m;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, m, S, C, I) {
              return (
                I === void 0 && (I = 1.70158),
                S * (l /= C) * l * ((I + 1) * l - I) + m
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, m, S, C, I) {
              return (
                I === void 0 && (I = 1.70158),
                S * ((l = l / C - 1) * l * ((I + 1) * l + I) + 1) + m
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, m, S, C, I) {
              return (
                I === void 0 && (I = 1.70158),
                (l /= C / 2) < 1
                  ? (S / 2) * l * l * (((I *= 1.525) + 1) * l - I) + m
                  : (S / 2) *
                      ((l -= 2) * l * (((I *= 1.525) + 1) * l + I) + 2) +
                    m
              );
            },
          ],
        },
        T = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        R = document,
        A = window,
        G = "bkwld-tram",
        N = /[\-\.0-9]/g,
        q = /[A-Z]/,
        w = "number",
        D = /^(rgb|#)/,
        L = /(em|cm|mm|in|pt|pc|px)$/,
        M = /(em|cm|mm|in|pt|pc|px|%)$/,
        H = /(deg|rad|turn)$/,
        J = "unitless",
        ee = /(all|none) 0s ease 0s/,
        se = /^(width|height)$/,
        ne = " ",
        V = R.createElement("a"),
        O = ["Webkit", "Moz", "O", "ms"],
        U = ["-webkit-", "-moz-", "-o-", "-ms-"],
        B = function (l) {
          if (l in V.style) return { dom: l, css: l };
          var m,
            S,
            C = "",
            I = l.split("-");
          for (m = 0; m < I.length; m++)
            C += I[m].charAt(0).toUpperCase() + I[m].slice(1);
          for (m = 0; m < O.length; m++)
            if (((S = O[m] + C), S in V.style))
              return { dom: S, css: U[m] + l };
        },
        j = (t.support = {
          bind: Function.prototype.bind,
          transform: B("transform"),
          transition: B("transition"),
          backface: B("backface-visibility"),
          timing: B("transition-timing-function"),
        });
      if (j.transition) {
        var F = j.timing.dom;
        if (((V.style[F] = y["ease-in-back"][0]), !V.style[F]))
          for (var W in T) y[W][0] = T[W];
      }
      var b = (t.frame = (function () {
          var l =
            A.requestAnimationFrame ||
            A.webkitRequestAnimationFrame ||
            A.mozRequestAnimationFrame ||
            A.oRequestAnimationFrame ||
            A.msRequestAnimationFrame;
          return l && j.bind
            ? l.bind(A)
            : function (m) {
                A.setTimeout(m, 16);
              };
        })()),
        k = (t.now = (function () {
          var l = A.performance,
            m = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return m && j.bind
            ? m.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        f = E(function (l) {
          function m(ie, ve) {
            var Oe = _(("" + ie).split(ne)),
              Ee = Oe[0];
            ve = ve || {};
            var Fe = Y[Ee];
            if (!Fe) return d("Unsupported property: " + Ee);
            if (!ve.weak || !this.props[Ee]) {
              var $e = Fe[0],
                Ve = this.props[Ee];
              return (
                Ve || (Ve = this.props[Ee] = new $e.Bare()),
                Ve.init(this.$el, Oe, Fe, ve),
                Ve
              );
            }
          }
          function S(ie, ve, Oe) {
            if (ie) {
              var Ee = typeof ie;
              if (
                (ve ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                Ee == "number" && ve)
              )
                return (
                  (this.timer = new ae({
                    duration: ie,
                    context: this,
                    complete: x,
                  })),
                  void (this.active = !0)
                );
              if (Ee == "string" && ve) {
                switch (ie) {
                  case "hide":
                    Q.call(this);
                    break;
                  case "stop":
                    re.call(this);
                    break;
                  case "redraw":
                    de.call(this);
                    break;
                  default:
                    m.call(this, ie, Oe && Oe[1]);
                }
                return x.call(this);
              }
              if (Ee == "function") return void ie.call(this, this);
              if (Ee == "object") {
                var Fe = 0;
                st.call(
                  this,
                  ie,
                  function (we, ym) {
                    we.span > Fe && (Fe = we.span), we.stop(), we.animate(ym);
                  },
                  function (we) {
                    "wait" in we && (Fe = c(we.wait, 0));
                  }
                ),
                  Ae.call(this),
                  Fe > 0 &&
                    ((this.timer = new ae({ duration: Fe, context: this })),
                    (this.active = !0),
                    ve && (this.timer.complete = x));
                var $e = this,
                  Ve = !1,
                  ln = {};
                b(function () {
                  st.call($e, ie, function (we) {
                    we.active && ((Ve = !0), (ln[we.name] = we.nextStyle));
                  }),
                    Ve && $e.$el.css(ln);
                });
              }
            }
          }
          function C(ie) {
            (ie = c(ie, 0)),
              this.active
                ? this.queue.push({ options: ie })
                : ((this.timer = new ae({
                    duration: ie,
                    context: this,
                    complete: x,
                  })),
                  (this.active = !0));
          }
          function I(ie) {
            return this.active
              ? (this.queue.push({ options: ie, args: arguments }),
                void (this.timer.complete = x))
              : d(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function x() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var ie = this.queue.shift();
              S.call(this, ie.options, !0, ie.args);
            }
          }
          function re(ie) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var ve;
            typeof ie == "string"
              ? ((ve = {}), (ve[ie] = 1))
              : (ve = typeof ie == "object" && ie != null ? ie : this.props),
              st.call(this, ve, Me),
              Ae.call(this);
          }
          function ue(ie) {
            re.call(this, ie), st.call(this, ie, Ar, Em);
          }
          function ye(ie) {
            typeof ie != "string" && (ie = "block"),
              (this.el.style.display = ie);
          }
          function Q() {
            re.call(this), (this.el.style.display = "none");
          }
          function de() {
            this.el.offsetHeight;
          }
          function pe() {
            re.call(this),
              e.removeData(this.el, G),
              (this.$el = this.el = null);
          }
          function Ae() {
            var ie,
              ve,
              Oe = [];
            this.upstream && Oe.push(this.upstream);
            for (ie in this.props)
              (ve = this.props[ie]), ve.active && Oe.push(ve.string);
            (Oe = Oe.join(",")),
              this.style !== Oe &&
                ((this.style = Oe), (this.el.style[j.transition.dom] = Oe));
          }
          function st(ie, ve, Oe) {
            var Ee,
              Fe,
              $e,
              Ve,
              ln = ve !== Me,
              we = {};
            for (Ee in ie)
              ($e = ie[Ee]),
                Ee in ge
                  ? (we.transform || (we.transform = {}),
                    (we.transform[Ee] = $e))
                  : (q.test(Ee) && (Ee = r(Ee)),
                    Ee in Y ? (we[Ee] = $e) : (Ve || (Ve = {}), (Ve[Ee] = $e)));
            for (Ee in we) {
              if ((($e = we[Ee]), (Fe = this.props[Ee]), !Fe)) {
                if (!ln) continue;
                Fe = m.call(this, Ee);
              }
              ve.call(this, Fe, $e);
            }
            Oe && Ve && Oe.call(this, Ve);
          }
          function Me(ie) {
            ie.stop();
          }
          function Ar(ie, ve) {
            ie.set(ve);
          }
          function Em(ie) {
            this.$el.css(ie);
          }
          function Qe(ie, ve) {
            l[ie] = function () {
              return this.children
                ? _m.call(this, ve, arguments)
                : (this.el && ve.apply(this, arguments), this);
            };
          }
          function _m(ie, ve) {
            var Oe,
              Ee = this.children.length;
            for (Oe = 0; Ee > Oe; Oe++) ie.apply(this.children[Oe], ve);
            return this;
          }
          (l.init = function (ie) {
            if (
              ((this.$el = e(ie)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              oe.keepInherited && !oe.fallback)
            ) {
              var ve = K(this.el, "transition");
              ve && !ee.test(ve) && (this.upstream = ve);
            }
            j.backface &&
              oe.hideBackface &&
              v(this.el, j.backface.css, "hidden");
          }),
            Qe("add", m),
            Qe("start", S),
            Qe("wait", C),
            Qe("then", I),
            Qe("next", x),
            Qe("stop", re),
            Qe("set", ue),
            Qe("show", ye),
            Qe("hide", Q),
            Qe("redraw", de),
            Qe("destroy", pe);
        }),
        p = E(f, function (l) {
          function m(S, C) {
            var I = e.data(S, G) || e.data(S, G, new f.Bare());
            return I.el || I.init(S), C ? I.start(C) : I;
          }
          l.init = function (S, C) {
            var I = e(S);
            if (!I.length) return this;
            if (I.length === 1) return m(I[0], C);
            var x = [];
            return (
              I.each(function (re, ue) {
                x.push(m(ue, C));
              }),
              (this.children = x),
              this
            );
          };
        }),
        h = E(function (l) {
          function m() {
            var x = this.get();
            this.update("auto");
            var re = this.get();
            return this.update(x), re;
          }
          function S(x, re, ue) {
            return re !== void 0 && (ue = re), x in y ? x : ue;
          }
          function C(x) {
            var re = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(x);
            return (re ? o(re[1], re[2], re[3]) : x).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var I = { duration: 500, ease: "ease", delay: 0 };
          (l.init = function (x, re, ue, ye) {
            (this.$el = x), (this.el = x[0]);
            var Q = re[0];
            ue[2] && (Q = ue[2]),
              te[Q] && (Q = te[Q]),
              (this.name = Q),
              (this.type = ue[1]),
              (this.duration = c(re[1], this.duration, I.duration)),
              (this.ease = S(re[2], this.ease, I.ease)),
              (this.delay = c(re[3], this.delay, I.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = se.test(this.name)),
              (this.unit = ye.unit || this.unit || oe.defaultUnit),
              (this.angle = ye.angle || this.angle || oe.defaultAngle),
              oe.fallback || ye.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    ne +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? ne + y[this.ease][0] : "") +
                    (this.delay ? ne + this.delay + "ms" : "")));
          }),
            (l.set = function (x) {
              (x = this.convert(x, this.type)), this.update(x), this.redraw();
            }),
            (l.transition = function (x) {
              (this.active = !0),
                (x = this.convert(x, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  x == "auto" && (x = m.call(this))),
                (this.nextStyle = x);
            }),
            (l.fallback = function (x) {
              var re =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (x = this.convert(x, this.type)),
                this.auto &&
                  (re == "auto" && (re = this.convert(this.get(), this.type)),
                  x == "auto" && (x = m.call(this))),
                (this.tween = new z({
                  from: re,
                  to: x,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (l.get = function () {
              return K(this.el, this.name);
            }),
            (l.update = function (x) {
              v(this.el, this.name, x);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                v(this.el, this.name, this.get()));
              var x = this.tween;
              x && x.context && x.destroy();
            }),
            (l.convert = function (x, re) {
              if (x == "auto" && this.auto) return x;
              var ue,
                ye = typeof x == "number",
                Q = typeof x == "string";
              switch (re) {
                case w:
                  if (ye) return x;
                  if (Q && x.replace(N, "") === "") return +x;
                  ue = "number(unitless)";
                  break;
                case D:
                  if (Q) {
                    if (x === "" && this.original) return this.original;
                    if (re.test(x))
                      return x.charAt(0) == "#" && x.length == 7 ? x : C(x);
                  }
                  ue = "hex or rgb string";
                  break;
                case L:
                  if (ye) return x + this.unit;
                  if (Q && re.test(x)) return x;
                  ue = "number(px) or string(unit)";
                  break;
                case M:
                  if (ye) return x + this.unit;
                  if (Q && re.test(x)) return x;
                  ue = "number(px) or string(unit or %)";
                  break;
                case H:
                  if (ye) return x + this.angle;
                  if (Q && re.test(x)) return x;
                  ue = "number(deg) or string(angle)";
                  break;
                case J:
                  if (ye || (Q && M.test(x))) return x;
                  ue = "number(unitless) or string(unit or %)";
              }
              return s(ue, x), x;
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        g = E(h, function (l, m) {
          l.init = function () {
            m.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), D));
          };
        }),
        X = E(h, function (l, m) {
          (l.init = function () {
            m.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (S) {
              this.$el[this.name](S);
            });
        }),
        Z = E(h, function (l, m) {
          function S(C, I) {
            var x, re, ue, ye, Q;
            for (x in C)
              (ye = ge[x]),
                (ue = ye[0]),
                (re = ye[1] || x),
                (Q = this.convert(C[x], ue)),
                I.call(this, re, Q, ue);
          }
          (l.init = function () {
            m.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                ge.perspective &&
                  oe.perspective &&
                  ((this.current.perspective = oe.perspective),
                  v(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (l.set = function (C) {
              S.call(this, C, function (I, x) {
                this.current[I] = x;
              }),
                v(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (l.transition = function (C) {
              var I = this.values(C);
              this.tween = new he({
                current: this.current,
                values: I,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var x,
                re = {};
              for (x in this.current) re[x] = x in I ? I[x] : this.current[x];
              (this.active = !0), (this.nextStyle = this.style(re));
            }),
            (l.fallback = function (C) {
              var I = this.values(C);
              this.tween = new he({
                current: this.current,
                values: I,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              v(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (C) {
              var I,
                x = "";
              for (I in C) x += I + "(" + C[I] + ") ";
              return x;
            }),
            (l.values = function (C) {
              var I,
                x = {};
              return (
                S.call(this, C, function (re, ue, ye) {
                  (x[re] = ue),
                    this.current[re] === void 0 &&
                      ((I = 0),
                      ~re.indexOf("scale") && (I = 1),
                      (this.current[re] = this.convert(I, ye)));
                }),
                x
              );
            });
        }),
        z = E(function (l) {
          function m(Q) {
            ue.push(Q) === 1 && b(S);
          }
          function S() {
            var Q,
              de,
              pe,
              Ae = ue.length;
            if (Ae)
              for (b(S), de = k(), Q = Ae; Q--; )
                (pe = ue[Q]), pe && pe.render(de);
          }
          function C(Q) {
            var de,
              pe = e.inArray(Q, ue);
            pe >= 0 &&
              ((de = ue.slice(pe + 1)),
              (ue.length = pe),
              de.length && (ue = ue.concat(de)));
          }
          function I(Q) {
            return Math.round(Q * ye) / ye;
          }
          function x(Q, de, pe) {
            return o(
              Q[0] + pe * (de[0] - Q[0]),
              Q[1] + pe * (de[1] - Q[1]),
              Q[2] + pe * (de[2] - Q[2])
            );
          }
          var re = { ease: y.ease[1], from: 0, to: 1 };
          (l.init = function (Q) {
            (this.duration = Q.duration || 0), (this.delay = Q.delay || 0);
            var de = Q.ease || re.ease;
            y[de] && (de = y[de][1]),
              typeof de != "function" && (de = re.ease),
              (this.ease = de),
              (this.update = Q.update || i),
              (this.complete = Q.complete || i),
              (this.context = Q.context || this),
              (this.name = Q.name);
            var pe = Q.from,
              Ae = Q.to;
            pe === void 0 && (pe = re.from),
              Ae === void 0 && (Ae = re.to),
              (this.unit = Q.unit || ""),
              typeof pe == "number" && typeof Ae == "number"
                ? ((this.begin = pe), (this.change = Ae - pe))
                : this.format(Ae, pe),
              (this.value = this.begin + this.unit),
              (this.start = k()),
              Q.autoplay !== !1 && this.play();
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = k()), (this.active = !0), m(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), C(this));
            }),
            (l.render = function (Q) {
              var de,
                pe = Q - this.start;
              if (this.delay) {
                if (pe <= this.delay) return;
                pe -= this.delay;
              }
              if (pe < this.duration) {
                var Ae = this.ease(pe, 0, 1, this.duration);
                return (
                  (de = this.startRGB
                    ? x(this.startRGB, this.endRGB, Ae)
                    : I(this.begin + Ae * this.change)),
                  (this.value = de + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (de = this.endHex || this.begin + this.change),
                (this.value = de + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (l.format = function (Q, de) {
              if (((de += ""), (Q += ""), Q.charAt(0) == "#"))
                return (
                  (this.startRGB = n(de)),
                  (this.endRGB = n(Q)),
                  (this.endHex = Q),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var pe = de.replace(N, ""),
                  Ae = Q.replace(N, "");
                pe !== Ae && a("tween", de, Q), (this.unit = pe);
              }
              (de = parseFloat(de)),
                (Q = parseFloat(Q)),
                (this.begin = this.value = de),
                (this.change = Q - de);
            }),
            (l.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = i);
            });
          var ue = [],
            ye = 1e3;
        }),
        ae = E(z, function (l) {
          (l.init = function (m) {
            (this.duration = m.duration || 0),
              (this.complete = m.complete || i),
              (this.context = m.context),
              this.play();
          }),
            (l.render = function (m) {
              var S = m - this.start;
              S < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        he = E(z, function (l, m) {
          (l.init = function (S) {
            (this.context = S.context),
              (this.update = S.update),
              (this.tweens = []),
              (this.current = S.current);
            var C, I;
            for (C in S.values)
              (I = S.values[C]),
                this.current[C] !== I &&
                  this.tweens.push(
                    new z({
                      name: C,
                      from: this.current[C],
                      to: I,
                      duration: S.duration,
                      delay: S.delay,
                      ease: S.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (l.render = function (S) {
              var C,
                I,
                x = this.tweens.length,
                re = !1;
              for (C = x; C--; )
                (I = this.tweens[C]),
                  I.context &&
                    (I.render(S), (this.current[I.name] = I.value), (re = !0));
              return re
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((m.destroy.call(this), this.tweens)) {
                var S,
                  C = this.tweens.length;
                for (S = C; S--; ) this.tweens[S].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        oe = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !j.transition,
          agentTests: [],
        });
      (t.fallback = function (l) {
        if (!j.transition) return (oe.fallback = !0);
        oe.agentTests.push("(" + l + ")");
        var m = new RegExp(oe.agentTests.join("|"), "i");
        oe.fallback = m.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new z(l);
        }),
        (t.delay = function (l, m, S) {
          return new ae({ complete: m, duration: l, context: S });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        });
      var v = e.style,
        K = e.css,
        te = { transform: j.transform && j.transform.css },
        Y = {
          color: [g, D],
          background: [g, D, "background-color"],
          "outline-color": [g, D],
          "border-color": [g, D],
          "border-top-color": [g, D],
          "border-right-color": [g, D],
          "border-bottom-color": [g, D],
          "border-left-color": [g, D],
          "border-width": [h, L],
          "border-top-width": [h, L],
          "border-right-width": [h, L],
          "border-bottom-width": [h, L],
          "border-left-width": [h, L],
          "border-spacing": [h, L],
          "letter-spacing": [h, L],
          margin: [h, L],
          "margin-top": [h, L],
          "margin-right": [h, L],
          "margin-bottom": [h, L],
          "margin-left": [h, L],
          padding: [h, L],
          "padding-top": [h, L],
          "padding-right": [h, L],
          "padding-bottom": [h, L],
          "padding-left": [h, L],
          "outline-width": [h, L],
          opacity: [h, w],
          top: [h, M],
          right: [h, M],
          bottom: [h, M],
          left: [h, M],
          "font-size": [h, M],
          "text-indent": [h, M],
          "word-spacing": [h, M],
          width: [h, M],
          "min-width": [h, M],
          "max-width": [h, M],
          height: [h, M],
          "min-height": [h, M],
          "max-height": [h, M],
          "line-height": [h, J],
          "scroll-top": [X, w, "scrollTop"],
          "scroll-left": [X, w, "scrollLeft"],
        },
        ge = {};
      j.transform &&
        ((Y.transform = [Z]),
        (ge = {
          x: [M, "translateX"],
          y: [M, "translateY"],
          rotate: [H],
          rotateX: [H],
          rotateY: [H],
          scale: [w],
          scaleX: [w],
          scaleY: [w],
          skew: [H],
          skewX: [H],
          skewY: [H],
        })),
        j.transform &&
          j.backface &&
          ((ge.z = [M, "translateZ"]),
          (ge.rotateZ = [H]),
          (ge.scaleZ = [w]),
          (ge.perspective = [L]));
      var We = /ms/,
        Ye = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var ws = u((yV, As) => {
    var mm = window.$,
      Tm = Wi() && mm.tram;
    As.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        o = Function.prototype,
        i = r.push,
        s = r.slice,
        a = r.concat,
        c = n.toString,
        d = n.hasOwnProperty,
        _ = r.forEach,
        E = r.map,
        y = r.reduce,
        T = r.reduceRight,
        R = r.filter,
        A = r.every,
        G = r.some,
        N = r.indexOf,
        q = r.lastIndexOf,
        w = Array.isArray,
        D = Object.keys,
        L = o.bind,
        M =
          (e.each =
          e.forEach =
            function (O, U, B) {
              if (O == null) return O;
              if (_ && O.forEach === _) O.forEach(U, B);
              else if (O.length === +O.length) {
                for (var j = 0, F = O.length; j < F; j++)
                  if (U.call(B, O[j], j, O) === t) return;
              } else
                for (var W = e.keys(O), j = 0, F = W.length; j < F; j++)
                  if (U.call(B, O[W[j]], W[j], O) === t) return;
              return O;
            });
      (e.map = e.collect =
        function (O, U, B) {
          var j = [];
          return O == null
            ? j
            : E && O.map === E
            ? O.map(U, B)
            : (M(O, function (F, W, b) {
                j.push(U.call(B, F, W, b));
              }),
              j);
        }),
        (e.find = e.detect =
          function (O, U, B) {
            var j;
            return (
              H(O, function (F, W, b) {
                if (U.call(B, F, W, b)) return (j = F), !0;
              }),
              j
            );
          }),
        (e.filter = e.select =
          function (O, U, B) {
            var j = [];
            return O == null
              ? j
              : R && O.filter === R
              ? O.filter(U, B)
              : (M(O, function (F, W, b) {
                  U.call(B, F, W, b) && j.push(F);
                }),
                j);
          });
      var H =
        (e.some =
        e.any =
          function (O, U, B) {
            U || (U = e.identity);
            var j = !1;
            return O == null
              ? j
              : G && O.some === G
              ? O.some(U, B)
              : (M(O, function (F, W, b) {
                  if (j || (j = U.call(B, F, W, b))) return t;
                }),
                !!j);
          });
      (e.contains = e.include =
        function (O, U) {
          return O == null
            ? !1
            : N && O.indexOf === N
            ? O.indexOf(U) != -1
            : H(O, function (B) {
                return B === U;
              });
        }),
        (e.delay = function (O, U) {
          var B = s.call(arguments, 2);
          return setTimeout(function () {
            return O.apply(null, B);
          }, U);
        }),
        (e.defer = function (O) {
          return e.delay.apply(e, [O, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (O) {
          var U, B, j;
          return function () {
            U ||
              ((U = !0),
              (B = arguments),
              (j = this),
              Tm.frame(function () {
                (U = !1), O.apply(j, B);
              }));
          };
        }),
        (e.debounce = function (O, U, B) {
          var j,
            F,
            W,
            b,
            k,
            f = function () {
              var p = e.now() - b;
              p < U
                ? (j = setTimeout(f, U - p))
                : ((j = null), B || ((k = O.apply(W, F)), (W = F = null)));
            };
          return function () {
            (W = this), (F = arguments), (b = e.now());
            var p = B && !j;
            return (
              j || (j = setTimeout(f, U)),
              p && ((k = O.apply(W, F)), (W = F = null)),
              k
            );
          };
        }),
        (e.defaults = function (O) {
          if (!e.isObject(O)) return O;
          for (var U = 1, B = arguments.length; U < B; U++) {
            var j = arguments[U];
            for (var F in j) O[F] === void 0 && (O[F] = j[F]);
          }
          return O;
        }),
        (e.keys = function (O) {
          if (!e.isObject(O)) return [];
          if (D) return D(O);
          var U = [];
          for (var B in O) e.has(O, B) && U.push(B);
          return U;
        }),
        (e.has = function (O, U) {
          return d.call(O, U);
        }),
        (e.isObject = function (O) {
          return O === Object(O);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var J = /(.)^/,
        ee = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        se = /\\|'|\r|\n|\u2028|\u2029/g,
        ne = function (O) {
          return "\\" + ee[O];
        },
        V = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (O, U, B) {
          !U && B && (U = B), (U = e.defaults({}, U, e.templateSettings));
          var j = RegExp(
              [
                (U.escape || J).source,
                (U.interpolate || J).source,
                (U.evaluate || J).source,
              ].join("|") + "|$",
              "g"
            ),
            F = 0,
            W = "__p+='";
          O.replace(j, function (p, h, g, X, Z) {
            return (
              (W += O.slice(F, Z).replace(se, ne)),
              (F = Z + p.length),
              h
                ? (W +=
                    `'+
((__t=(` +
                    h +
                    `))==null?'':_.escape(__t))+
'`)
                : g
                ? (W +=
                    `'+
((__t=(` +
                    g +
                    `))==null?'':__t)+
'`)
                : X &&
                  (W +=
                    `';
` +
                    X +
                    `
__p+='`),
              p
            );
          }),
            (W += `';
`);
          var b = U.variable;
          if (b) {
            if (!V.test(b))
              throw new Error("variable is not a bare identifier: " + b);
          } else
            (W =
              `with(obj||{}){
` +
              W +
              `}
`),
              (b = "obj");
          W =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            W +
            `return __p;
`;
          var k;
          try {
            k = new Function(U.variable || "obj", "_", W);
          } catch (p) {
            throw ((p.source = W), p);
          }
          var f = function (p) {
            return k.call(this, p, e);
          };
          return (
            (f.source =
              "function(" +
              b +
              `){
` +
              W +
              "}"),
            f
          );
        }),
        e
      );
    })();
  });
  var Be = u((mV, Ds) => {
    var _e = {},
      Yt = {},
      Qt = [],
      Bi = window.Webflow || [],
      bt = window.jQuery,
      Je = bt(window),
      Im = bt(document),
      ut = bt.isFunction,
      Ze = (_e._ = ws()),
      Cs = (_e.tram = Wi() && bt.tram),
      dn = !1,
      ki = !1;
    Cs.config.hideBackface = !1;
    Cs.config.keepInherited = !0;
    _e.define = function (e, t, r) {
      Yt[e] && xs(Yt[e]);
      var n = (Yt[e] = t(bt, Ze, r) || {});
      return Ns(n), n;
    };
    _e.require = function (e) {
      return Yt[e];
    };
    function Ns(e) {
      _e.env() &&
        (ut(e.design) && Je.on("__wf_design", e.design),
        ut(e.preview) && Je.on("__wf_preview", e.preview)),
        ut(e.destroy) && Je.on("__wf_destroy", e.destroy),
        e.ready && ut(e.ready) && Om(e);
    }
    function Om(e) {
      if (dn) {
        e.ready();
        return;
      }
      Ze.contains(Qt, e.ready) || Qt.push(e.ready);
    }
    function xs(e) {
      ut(e.design) && Je.off("__wf_design", e.design),
        ut(e.preview) && Je.off("__wf_preview", e.preview),
        ut(e.destroy) && Je.off("__wf_destroy", e.destroy),
        e.ready && ut(e.ready) && bm(e);
    }
    function bm(e) {
      Qt = Ze.filter(Qt, function (t) {
        return t !== e.ready;
      });
    }
    _e.push = function (e) {
      if (dn) {
        ut(e) && e();
        return;
      }
      Bi.push(e);
    };
    _e.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var fn = navigator.userAgent.toLowerCase(),
      qs = (_e.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      Sm = (_e.env.chrome =
        /chrome/.test(fn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(fn.match(/chrome\/(\d+)\./)[1], 10)),
      Am = (_e.env.ios = /(ipod|iphone|ipad)/.test(fn));
    _e.env.safari = /safari/.test(fn) && !Sm && !Am;
    var Vi;
    qs &&
      Im.on("touchstart mousedown", function (e) {
        Vi = e.target;
      });
    _e.validClick = qs
      ? function (e) {
          return e === Vi || bt.contains(e, Vi);
        }
      : function () {
          return !0;
        };
    var Ls = "resize.webflow orientationchange.webflow load.webflow",
      wm = "scroll.webflow " + Ls;
    _e.resize = Hi(Je, Ls);
    _e.scroll = Hi(Je, wm);
    _e.redraw = Hi();
    function Hi(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = Ze.throttle(function (o) {
          Ze.each(r, function (i) {
            i(o);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (o) {
          typeof o == "function" && (Ze.contains(r, o) || r.push(o));
        }),
        (n.off = function (o) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = Ze.filter(r, function (i) {
            return i !== o;
          });
        }),
        n
      );
    }
    _e.location = function (e) {
      window.location = e;
    };
    _e.env() && (_e.location = function () {});
    _e.ready = function () {
      (dn = !0), ki ? Rm() : Ze.each(Qt, Rs), Ze.each(Bi, Rs), _e.resize.up();
    };
    function Rs(e) {
      ut(e) && e();
    }
    function Rm() {
      (ki = !1), Ze.each(Yt, Ns);
    }
    var Mt;
    _e.load = function (e) {
      Mt.then(e);
    };
    function Ps() {
      Mt && (Mt.reject(), Je.off("load", Mt.resolve)),
        (Mt = new bt.Deferred()),
        Je.on("load", Mt.resolve);
    }
    _e.destroy = function (e) {
      (e = e || {}),
        (ki = !0),
        Je.triggerHandler("__wf_destroy"),
        e.domready != null && (dn = e.domready),
        Ze.each(Yt, xs),
        _e.resize.off(),
        _e.scroll.off(),
        _e.redraw.off(),
        (Qt = []),
        (Bi = []),
        Mt.state() === "pending" && Ps();
    };
    bt(_e.ready);
    Ps();
    Ds.exports = window.Webflow = _e;
  });
  var Gs = u((TV, Fs) => {
    var Ms = Be();
    Ms.define(
      "brand",
      (Fs.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          o = e("body"),
          i = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          c =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          d;
        t.ready = function () {
          var T = n.attr("data-wf-status"),
            R = n.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(R) && s.hostname !== R && (T = !0),
            T &&
              !a &&
              ((d = d || E()),
              y(),
              setTimeout(y, 500),
              e(r).off(c, _).on(c, _));
        };
        function _() {
          var T =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(d).attr("style", T ? "display: none !important;" : "");
        }
        function E() {
          var T = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            R = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon.f67cd735e3.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "8px", width: "16px" }),
            A = e("<img>")
              .attr(
                "src",
                "https://d1otoma47x30pg.cloudfront.net/img/webflow-badge-text.6faa6a38cd.svg"
              )
              .attr("alt", "Made in Webflow");
          return T.append(R, A), T[0];
        }
        function y() {
          var T = o.children(i),
            R = T.length && T.get(0) === d,
            A = Ms.env("editor");
          if (R) {
            A && T.remove();
            return;
          }
          T.length && T.remove(), A || o.append(d);
        }
        return t;
      })
    );
  });
  var Us = u((IV, Xs) => {
    var ji = Be();
    ji.define(
      "edit",
      (Xs.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (ji.env("test") || ji.env("frame")) && !r.fixture && !Cm())
        )
          return { exit: 1 };
        var n = {},
          o = e(window),
          i = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          c,
          d = r.load || y,
          _ = !1;
        try {
          _ =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        _
          ? d()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            d()
          : o.on(a, E).triggerHandler(a);
        function E() {
          c || (/\?edit/.test(s.hash) && d());
        }
        function y() {
          (c = !0),
            (window.WebflowEditor = !0),
            o.off(a, E),
            q(function (D) {
              e.ajax({
                url: N("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: i.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: T(D),
              });
            });
        }
        function T(D) {
          return function (L) {
            if (!L) {
              console.error("Could not load editor data");
              return;
            }
            (L.thirdPartyCookiesSupported = D),
              R(G(L.bugReporterScriptPath), function () {
                R(G(L.scriptPath), function () {
                  window.WebflowEditor(L);
                });
              });
          };
        }
        function R(D, L) {
          e.ajax({ type: "GET", url: D, dataType: "script", cache: !0 }).then(
            L,
            A
          );
        }
        function A(D, L, M) {
          throw (console.error("Could not load editor script: " + L), M);
        }
        function G(D) {
          return D.indexOf("//") >= 0
            ? D
            : N("https://editor-api.webflow.com" + D);
        }
        function N(D) {
          return D.replace(/([^:])\/\//g, "$1/");
        }
        function q(D) {
          var L = window.document.createElement("iframe");
          (L.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (L.style.display = "none"),
            (L.sandbox = "allow-scripts allow-same-origin");
          var M = function (H) {
            H.data === "WF_third_party_cookies_unsupported"
              ? (w(L, M), D(!1))
              : H.data === "WF_third_party_cookies_supported" &&
                (w(L, M), D(!0));
          };
          (L.onerror = function () {
            w(L, M), D(!1);
          }),
            window.addEventListener("message", M, !1),
            window.document.body.appendChild(L);
        }
        function w(D, L) {
          window.removeEventListener("message", L, !1), D.remove();
        }
        return n;
      })
    );
    function Cm() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Vs = u((OV, Ws) => {
    var Nm = Be();
    Nm.define(
      "focus-visible",
      (Ws.exports = function () {
        function e(r) {
          var n = !0,
            o = !1,
            i = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(w) {
            return !!(
              w &&
              w !== document &&
              w.nodeName !== "HTML" &&
              w.nodeName !== "BODY" &&
              "classList" in w &&
              "contains" in w.classList
            );
          }
          function c(w) {
            var D = w.type,
              L = w.tagName;
            return !!(
              (L === "INPUT" && s[D] && !w.readOnly) ||
              (L === "TEXTAREA" && !w.readOnly) ||
              w.isContentEditable
            );
          }
          function d(w) {
            w.getAttribute("data-wf-focus-visible") ||
              w.setAttribute("data-wf-focus-visible", "true");
          }
          function _(w) {
            w.getAttribute("data-wf-focus-visible") &&
              w.removeAttribute("data-wf-focus-visible");
          }
          function E(w) {
            w.metaKey ||
              w.altKey ||
              w.ctrlKey ||
              (a(r.activeElement) && d(r.activeElement), (n = !0));
          }
          function y() {
            n = !1;
          }
          function T(w) {
            a(w.target) && (n || c(w.target)) && d(w.target);
          }
          function R(w) {
            a(w.target) &&
              w.target.hasAttribute("data-wf-focus-visible") &&
              ((o = !0),
              window.clearTimeout(i),
              (i = window.setTimeout(function () {
                o = !1;
              }, 100)),
              _(w.target));
          }
          function A() {
            document.visibilityState === "hidden" && (o && (n = !0), G());
          }
          function G() {
            document.addEventListener("mousemove", q),
              document.addEventListener("mousedown", q),
              document.addEventListener("mouseup", q),
              document.addEventListener("pointermove", q),
              document.addEventListener("pointerdown", q),
              document.addEventListener("pointerup", q),
              document.addEventListener("touchmove", q),
              document.addEventListener("touchstart", q),
              document.addEventListener("touchend", q);
          }
          function N() {
            document.removeEventListener("mousemove", q),
              document.removeEventListener("mousedown", q),
              document.removeEventListener("mouseup", q),
              document.removeEventListener("pointermove", q),
              document.removeEventListener("pointerdown", q),
              document.removeEventListener("pointerup", q),
              document.removeEventListener("touchmove", q),
              document.removeEventListener("touchstart", q),
              document.removeEventListener("touchend", q);
          }
          function q(w) {
            (w.target.nodeName && w.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), N());
          }
          document.addEventListener("keydown", E, !0),
            document.addEventListener("mousedown", y, !0),
            document.addEventListener("pointerdown", y, !0),
            document.addEventListener("touchstart", y, !0),
            document.addEventListener("visibilitychange", A, !0),
            G(),
            r.addEventListener("focus", T, !0),
            r.addEventListener("blur", R, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var Hs = u((bV, ks) => {
    var Bs = Be();
    Bs.define(
      "focus",
      (ks.exports = function () {
        var e = [],
          t = !1;
        function r(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function n(s) {
          var a = s.target,
            c = a.tagName;
          return (
            (/^a$/i.test(c) && a.href != null) ||
            (/^(button|textarea)$/i.test(c) && a.disabled !== !0) ||
            (/^input$/i.test(c) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(c) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(c) ||
            (/^video$/i.test(c) && a.controls === !0)
          );
        }
        function o(s) {
          n(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function i() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Bs.env.safari &&
            (document.addEventListener("mousedown", o, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: i };
      })
    );
  });
  var hn = u((SV, Ks) => {
    "use strict";
    var Ki = window.jQuery,
      ct = {},
      pn = [],
      js = ".w-ix",
      vn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Ki(t).triggerHandler(ct.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Ki(t).triggerHandler(ct.types.OUTRO));
        },
      };
    ct.triggers = {};
    ct.types = { INTRO: "w-ix-intro" + js, OUTRO: "w-ix-outro" + js };
    ct.init = function () {
      for (var e = pn.length, t = 0; t < e; t++) {
        var r = pn[t];
        r[0](0, r[1]);
      }
      (pn = []), Ki.extend(ct.triggers, vn);
    };
    ct.async = function () {
      for (var e in vn) {
        var t = vn[e];
        vn.hasOwnProperty(e) &&
          (ct.triggers[e] = function (r, n) {
            pn.push([t, n]);
          });
      }
    };
    ct.async();
    Ks.exports = ct;
  });
  var Ys = u((AV, zs) => {
    var et = Be(),
      gn = hn();
    et.define(
      "ix",
      (zs.exports = function (e, t) {
        var r = {},
          n,
          o = e(window),
          i = ".w-ix",
          s = e.tram,
          a = et.env,
          c = a(),
          d = a.chrome && a.chrome < 35,
          _ = "none 0s ease 0s",
          E = e(),
          y = {},
          T = [],
          R = [],
          A = [],
          G,
          N = 1,
          q = {
            tabs: ".w-tab-link, .w-tab-pane",
            dropdown: ".w-dropdown",
            slider: ".w-slide",
            navbar: ".w-nav",
          };
        (r.init = function (F) {
          setTimeout(function () {
            w(F);
          }, 1);
        }),
          (r.preview = function () {
            (n = !1),
              (N = 100),
              setTimeout(function () {
                w(window.__wf_ix);
              }, 1);
          }),
          (r.design = function () {
            (n = !0), r.destroy();
          }),
          (r.destroy = function () {
            (G = !0),
              E.each(J),
              et.scroll.off(ee),
              gn.async(),
              (T = []),
              (R = []),
              (A = []);
          }),
          (r.ready = function () {
            if (c) return a("design") ? r.design() : r.preview();
            y && G && ((G = !1), D());
          }),
          (r.run = V),
          (r.style = c ? U : B);
        function w(F) {
          F &&
            ((y = {}),
            t.each(F, function (W) {
              y[W.slug] = W.value;
            }),
            D());
        }
        function D() {
          L(), gn.init(), et.redraw.up();
        }
        function L() {
          var F = e("[data-ix]");
          F.length &&
            (F.each(J),
            F.each(M),
            T.length && (et.scroll.on(ee), setTimeout(ee, 1)),
            R.length && et.load(se),
            A.length && setTimeout(ne, N));
        }
        function M(F, W) {
          var b = e(W),
            k = b.attr("data-ix"),
            f = y[k];
          if (f) {
            var p = f.triggers;
            p &&
              (r.style(b, f.style),
              t.each(p, function (h) {
                var g = {},
                  X = h.type,
                  Z = h.stepsB && h.stepsB.length;
                function z() {
                  V(h, b, { group: "A" });
                }
                function ae() {
                  V(h, b, { group: "B" });
                }
                if (X === "load") {
                  h.preload && !c ? R.push(z) : A.push(z);
                  return;
                }
                if (X === "click") {
                  b.on("click" + i, function (v) {
                    et.validClick(v.currentTarget) &&
                      (b.attr("href") === "#" && v.preventDefault(),
                      V(h, b, { group: g.clicked ? "B" : "A" }),
                      Z && (g.clicked = !g.clicked));
                  }),
                    (E = E.add(b));
                  return;
                }
                if (X === "hover") {
                  b.on("mouseenter" + i, z),
                    b.on("mouseleave" + i, ae),
                    (E = E.add(b));
                  return;
                }
                if (X === "scroll") {
                  T.push({
                    el: b,
                    trigger: h,
                    state: { active: !1 },
                    offsetTop: H(h.offsetTop),
                    offsetBot: H(h.offsetBot),
                  });
                  return;
                }
                var he = q[X];
                if (he) {
                  var oe = b.closest(he);
                  oe.on(gn.types.INTRO, z).on(gn.types.OUTRO, ae),
                    (E = E.add(oe));
                  return;
                }
              }));
          }
        }
        function H(F) {
          if (!F) return 0;
          F = String(F);
          var W = parseInt(F, 10);
          return W !== W
            ? 0
            : (F.indexOf("%") > 0 && ((W /= 100), W >= 1 && (W = 0.999)), W);
        }
        function J(F, W) {
          e(W).off(i);
        }
        function ee() {
          for (
            var F = o.scrollTop(), W = o.height(), b = T.length, k = 0;
            k < b;
            k++
          ) {
            var f = T[k],
              p = f.el,
              h = f.trigger,
              g = h.stepsB && h.stepsB.length,
              X = f.state,
              Z = p.offset().top,
              z = p.outerHeight(),
              ae = f.offsetTop,
              he = f.offsetBot;
            ae < 1 && ae > 0 && (ae *= W), he < 1 && he > 0 && (he *= W);
            var oe = Z + z - ae >= F && Z + he <= F + W;
            oe !== X.active &&
              ((oe === !1 && !g) ||
                ((X.active = oe), V(h, p, { group: oe ? "A" : "B" })));
          }
        }
        function se() {
          for (var F = R.length, W = 0; W < F; W++) R[W]();
        }
        function ne() {
          for (var F = A.length, W = 0; W < F; W++) A[W]();
        }
        function V(F, W, b, k) {
          b = b || {};
          var f = b.done,
            p = F.preserve3d;
          if (n && !b.force) return;
          var h = b.group || "A",
            g = F["loop" + h],
            X = F["steps" + h];
          if (!X || !X.length) return;
          if ((X.length < 2 && (g = !1), !k)) {
            var Z = F.selector;
            Z &&
              (F.descend
                ? (W = W.find(Z))
                : F.siblings
                ? (W = W.siblings(Z))
                : (W = e(Z)),
              c && W.attr("data-ix-affect", 1)),
              d && W.addClass("w-ix-emptyfix"),
              p && W.css("transform-style", "preserve-3d");
          }
          for (var z = s(W), ae = { omit3d: !p }, he = 0; he < X.length; he++)
            O(z, X[he], ae);
          function oe() {
            if (g) return V(F, W, b, !0);
            ae.width === "auto" && z.set({ width: "auto" }),
              ae.height === "auto" && z.set({ height: "auto" }),
              f && f();
          }
          ae.start ? z.then(oe) : oe();
        }
        function O(F, W, b) {
          var k = "add",
            f = "start";
          b.start && (k = f = "then");
          var p = W.transition;
          if (p) {
            p = p.split(",");
            for (var h = 0; h < p.length; h++) {
              var g = p[h];
              F[k](g);
            }
          }
          var X = j(W, b) || {};
          if (
            (X.width != null && (b.width = X.width),
            X.height != null && (b.height = X.height),
            p == null)
          ) {
            b.start
              ? F.then(function () {
                  var ae = this.queue;
                  this.set(X),
                    X.display && (F.redraw(), et.redraw.up()),
                    (this.queue = ae),
                    this.next();
                })
              : (F.set(X), X.display && (F.redraw(), et.redraw.up()));
            var Z = X.wait;
            Z != null && (F.wait(Z), (b.start = !0));
          } else {
            if (X.display) {
              var z = X.display;
              delete X.display,
                b.start
                  ? F.then(function () {
                      var ae = this.queue;
                      this.set({ display: z }).redraw(),
                        et.redraw.up(),
                        (this.queue = ae),
                        this.next();
                    })
                  : (F.set({ display: z }).redraw(), et.redraw.up());
            }
            F[f](X), (b.start = !0);
          }
        }
        function U(F, W) {
          var b = s(F);
          if (!e.isEmptyObject(W)) {
            F.css("transition", "");
            var k = F.css("transition");
            k === _ && (k = b.upstream = null),
              (b.upstream = _),
              b.set(j(W)),
              (b.upstream = k);
          }
        }
        function B(F, W) {
          s(F).set(j(W));
        }
        function j(F, W) {
          var b = W && W.omit3d,
            k = {},
            f = !1;
          for (var p in F)
            p !== "transition" &&
              p !== "keysort" &&
              ((b &&
                (p === "z" ||
                  p === "rotateX" ||
                  p === "rotateY" ||
                  p === "scaleZ")) ||
                ((k[p] = F[p]), (f = !0)));
          return f ? k : null;
        }
        return r;
      })
    );
  });
  var _n = u((wV, Zs) => {
    "use strict";
    var zi = hn();
    function Qs(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var xm = window.jQuery,
      En = {},
      $s = ".w-ix",
      qm = {
        reset: function (e, t) {
          zi.triggers.reset(e, t);
        },
        intro: function (e, t) {
          zi.triggers.intro(e, t), Qs(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          zi.triggers.outro(e, t), Qs(t, "COMPONENT_INACTIVE");
        },
      };
    En.triggers = {};
    En.types = { INTRO: "w-ix-intro" + $s, OUTRO: "w-ix-outro" + $s };
    xm.extend(En.triggers, qm);
    Zs.exports = En;
  });
  var Js = u((RV, yt) => {
    function Yi(e) {
      return (
        (yt.exports = Yi =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (yt.exports.__esModule = !0),
        (yt.exports.default = yt.exports),
        Yi(e)
      );
    }
    (yt.exports = Yi),
      (yt.exports.__esModule = !0),
      (yt.exports.default = yt.exports);
  });
  var $t = u((CV, wr) => {
    var Lm = Js().default;
    function eu(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (eu = function (o) {
        return o ? r : t;
      })(e);
    }
    function Pm(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (Lm(e) !== "object" && typeof e != "function"))
        return { default: e };
      var r = eu(t);
      if (r && r.has(e)) return r.get(e);
      var n = {},
        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e)
        if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
          var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(n, i, s)
            : (n[i] = e[i]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (wr.exports = Pm),
      (wr.exports.__esModule = !0),
      (wr.exports.default = wr.exports);
  });
  var lt = u((NV, Rr) => {
    function Dm(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Rr.exports = Dm),
      (Rr.exports.__esModule = !0),
      (Rr.exports.default = Rr.exports);
  });
  var Ie = u((xV, tu) => {
    var yn = function (e) {
      return e && e.Math == Math && e;
    };
    tu.exports =
      yn(typeof globalThis == "object" && globalThis) ||
      yn(typeof window == "object" && window) ||
      yn(typeof self == "object" && self) ||
      yn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var Zt = u((qV, ru) => {
    ru.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var Ft = u((LV, nu) => {
    var Mm = Zt();
    nu.exports = !Mm(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var mn = u((PV, iu) => {
    var Cr = Function.prototype.call;
    iu.exports = Cr.bind
      ? Cr.bind(Cr)
      : function () {
          return Cr.apply(Cr, arguments);
        };
  });
  var uu = u((su) => {
    "use strict";
    var ou = {}.propertyIsEnumerable,
      au = Object.getOwnPropertyDescriptor,
      Fm = au && !ou.call({ 1: 2 }, 1);
    su.f = Fm
      ? function (t) {
          var r = au(this, t);
          return !!r && r.enumerable;
        }
      : ou;
  });
  var Qi = u((MV, cu) => {
    cu.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var tt = u((FV, fu) => {
    var lu = Function.prototype,
      $i = lu.bind,
      Zi = lu.call,
      Gm = $i && $i.bind(Zi);
    fu.exports = $i
      ? function (e) {
          return e && Gm(Zi, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return Zi.apply(e, arguments);
            }
          );
        };
  });
  var vu = u((GV, pu) => {
    var du = tt(),
      Xm = du({}.toString),
      Um = du("".slice);
    pu.exports = function (e) {
      return Um(Xm(e), 8, -1);
    };
  });
  var gu = u((XV, hu) => {
    var Wm = Ie(),
      Vm = tt(),
      Bm = Zt(),
      km = vu(),
      Ji = Wm.Object,
      Hm = Vm("".split);
    hu.exports = Bm(function () {
      return !Ji("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return km(e) == "String" ? Hm(e, "") : Ji(e);
        }
      : Ji;
  });
  var eo = u((UV, Eu) => {
    var jm = Ie(),
      Km = jm.TypeError;
    Eu.exports = function (e) {
      if (e == null) throw Km("Can't call method on " + e);
      return e;
    };
  });
  var Nr = u((WV, _u) => {
    var zm = gu(),
      Ym = eo();
    _u.exports = function (e) {
      return zm(Ym(e));
    };
  });
  var ft = u((VV, yu) => {
    yu.exports = function (e) {
      return typeof e == "function";
    };
  });
  var Jt = u((BV, mu) => {
    var Qm = ft();
    mu.exports = function (e) {
      return typeof e == "object" ? e !== null : Qm(e);
    };
  });
  var xr = u((kV, Tu) => {
    var to = Ie(),
      $m = ft(),
      Zm = function (e) {
        return $m(e) ? e : void 0;
      };
    Tu.exports = function (e, t) {
      return arguments.length < 2 ? Zm(to[e]) : to[e] && to[e][t];
    };
  });
  var Ou = u((HV, Iu) => {
    var Jm = tt();
    Iu.exports = Jm({}.isPrototypeOf);
  });
  var Su = u((jV, bu) => {
    var eT = xr();
    bu.exports = eT("navigator", "userAgent") || "";
  });
  var qu = u((KV, xu) => {
    var Nu = Ie(),
      ro = Su(),
      Au = Nu.process,
      wu = Nu.Deno,
      Ru = (Au && Au.versions) || (wu && wu.version),
      Cu = Ru && Ru.v8,
      rt,
      Tn;
    Cu &&
      ((rt = Cu.split(".")),
      (Tn = rt[0] > 0 && rt[0] < 4 ? 1 : +(rt[0] + rt[1])));
    !Tn &&
      ro &&
      ((rt = ro.match(/Edge\/(\d+)/)),
      (!rt || rt[1] >= 74) &&
        ((rt = ro.match(/Chrome\/(\d+)/)), rt && (Tn = +rt[1])));
    xu.exports = Tn;
  });
  var no = u((zV, Pu) => {
    var Lu = qu(),
      tT = Zt();
    Pu.exports =
      !!Object.getOwnPropertySymbols &&
      !tT(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Lu && Lu < 41)
        );
      });
  });
  var io = u((YV, Du) => {
    var rT = no();
    Du.exports = rT && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var oo = u((QV, Mu) => {
    var nT = Ie(),
      iT = xr(),
      oT = ft(),
      aT = Ou(),
      sT = io(),
      uT = nT.Object;
    Mu.exports = sT
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = iT("Symbol");
          return oT(t) && aT(t.prototype, uT(e));
        };
  });
  var Gu = u(($V, Fu) => {
    var cT = Ie(),
      lT = cT.String;
    Fu.exports = function (e) {
      try {
        return lT(e);
      } catch {
        return "Object";
      }
    };
  });
  var Uu = u((ZV, Xu) => {
    var fT = Ie(),
      dT = ft(),
      pT = Gu(),
      vT = fT.TypeError;
    Xu.exports = function (e) {
      if (dT(e)) return e;
      throw vT(pT(e) + " is not a function");
    };
  });
  var Vu = u((JV, Wu) => {
    var hT = Uu();
    Wu.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : hT(r);
    };
  });
  var ku = u((eB, Bu) => {
    var gT = Ie(),
      ao = mn(),
      so = ft(),
      uo = Jt(),
      ET = gT.TypeError;
    Bu.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && so((r = e.toString)) && !uo((n = ao(r, e)))) ||
        (so((r = e.valueOf)) && !uo((n = ao(r, e)))) ||
        (t !== "string" && so((r = e.toString)) && !uo((n = ao(r, e))))
      )
        return n;
      throw ET("Can't convert object to primitive value");
    };
  });
  var ju = u((tB, Hu) => {
    Hu.exports = !1;
  });
  var In = u((rB, zu) => {
    var Ku = Ie(),
      _T = Object.defineProperty;
    zu.exports = function (e, t) {
      try {
        _T(Ku, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        Ku[e] = t;
      }
      return t;
    };
  });
  var On = u((nB, Qu) => {
    var yT = Ie(),
      mT = In(),
      Yu = "__core-js_shared__",
      TT = yT[Yu] || mT(Yu, {});
    Qu.exports = TT;
  });
  var co = u((iB, Zu) => {
    var IT = ju(),
      $u = On();
    (Zu.exports = function (e, t) {
      return $u[e] || ($u[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: IT ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var ec = u((oB, Ju) => {
    var OT = Ie(),
      bT = eo(),
      ST = OT.Object;
    Ju.exports = function (e) {
      return ST(bT(e));
    };
  });
  var St = u((aB, tc) => {
    var AT = tt(),
      wT = ec(),
      RT = AT({}.hasOwnProperty);
    tc.exports =
      Object.hasOwn ||
      function (t, r) {
        return RT(wT(t), r);
      };
  });
  var lo = u((sB, rc) => {
    var CT = tt(),
      NT = 0,
      xT = Math.random(),
      qT = CT((1).toString);
    rc.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + qT(++NT + xT, 36);
    };
  });
  var fo = u((uB, sc) => {
    var LT = Ie(),
      PT = co(),
      nc = St(),
      DT = lo(),
      ic = no(),
      ac = io(),
      er = PT("wks"),
      Gt = LT.Symbol,
      oc = Gt && Gt.for,
      MT = ac ? Gt : (Gt && Gt.withoutSetter) || DT;
    sc.exports = function (e) {
      if (!nc(er, e) || !(ic || typeof er[e] == "string")) {
        var t = "Symbol." + e;
        ic && nc(Gt, e)
          ? (er[e] = Gt[e])
          : ac && oc
          ? (er[e] = oc(t))
          : (er[e] = MT(t));
      }
      return er[e];
    };
  });
  var fc = u((cB, lc) => {
    var FT = Ie(),
      GT = mn(),
      uc = Jt(),
      cc = oo(),
      XT = Vu(),
      UT = ku(),
      WT = fo(),
      VT = FT.TypeError,
      BT = WT("toPrimitive");
    lc.exports = function (e, t) {
      if (!uc(e) || cc(e)) return e;
      var r = XT(e, BT),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = GT(r, e, t)), !uc(n) || cc(n))
        )
          return n;
        throw VT("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), UT(e, t);
    };
  });
  var po = u((lB, dc) => {
    var kT = fc(),
      HT = oo();
    dc.exports = function (e) {
      var t = kT(e, "string");
      return HT(t) ? t : t + "";
    };
  });
  var ho = u((fB, vc) => {
    var jT = Ie(),
      pc = Jt(),
      vo = jT.document,
      KT = pc(vo) && pc(vo.createElement);
    vc.exports = function (e) {
      return KT ? vo.createElement(e) : {};
    };
  });
  var go = u((dB, hc) => {
    var zT = Ft(),
      YT = Zt(),
      QT = ho();
    hc.exports =
      !zT &&
      !YT(function () {
        return (
          Object.defineProperty(QT("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var Eo = u((Ec) => {
    var $T = Ft(),
      ZT = mn(),
      JT = uu(),
      eI = Qi(),
      tI = Nr(),
      rI = po(),
      nI = St(),
      iI = go(),
      gc = Object.getOwnPropertyDescriptor;
    Ec.f = $T
      ? gc
      : function (t, r) {
          if (((t = tI(t)), (r = rI(r)), iI))
            try {
              return gc(t, r);
            } catch {}
          if (nI(t, r)) return eI(!ZT(JT.f, t, r), t[r]);
        };
  });
  var qr = u((vB, yc) => {
    var _c = Ie(),
      oI = Jt(),
      aI = _c.String,
      sI = _c.TypeError;
    yc.exports = function (e) {
      if (oI(e)) return e;
      throw sI(aI(e) + " is not an object");
    };
  });
  var Lr = u((Ic) => {
    var uI = Ie(),
      cI = Ft(),
      lI = go(),
      mc = qr(),
      fI = po(),
      dI = uI.TypeError,
      Tc = Object.defineProperty;
    Ic.f = cI
      ? Tc
      : function (t, r, n) {
          if ((mc(t), (r = fI(r)), mc(n), lI))
            try {
              return Tc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw dI("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var bn = u((gB, Oc) => {
    var pI = Ft(),
      vI = Lr(),
      hI = Qi();
    Oc.exports = pI
      ? function (e, t, r) {
          return vI.f(e, t, hI(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var yo = u((EB, bc) => {
    var gI = tt(),
      EI = ft(),
      _o = On(),
      _I = gI(Function.toString);
    EI(_o.inspectSource) ||
      (_o.inspectSource = function (e) {
        return _I(e);
      });
    bc.exports = _o.inspectSource;
  });
  var wc = u((_B, Ac) => {
    var yI = Ie(),
      mI = ft(),
      TI = yo(),
      Sc = yI.WeakMap;
    Ac.exports = mI(Sc) && /native code/.test(TI(Sc));
  });
  var mo = u((yB, Cc) => {
    var II = co(),
      OI = lo(),
      Rc = II("keys");
    Cc.exports = function (e) {
      return Rc[e] || (Rc[e] = OI(e));
    };
  });
  var Sn = u((mB, Nc) => {
    Nc.exports = {};
  });
  var Mc = u((TB, Dc) => {
    var bI = wc(),
      Pc = Ie(),
      To = tt(),
      SI = Jt(),
      AI = bn(),
      Io = St(),
      Oo = On(),
      wI = mo(),
      RI = Sn(),
      xc = "Object already initialized",
      So = Pc.TypeError,
      CI = Pc.WeakMap,
      An,
      Pr,
      wn,
      NI = function (e) {
        return wn(e) ? Pr(e) : An(e, {});
      },
      xI = function (e) {
        return function (t) {
          var r;
          if (!SI(t) || (r = Pr(t)).type !== e)
            throw So("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    bI || Oo.state
      ? ((At = Oo.state || (Oo.state = new CI())),
        (qc = To(At.get)),
        (bo = To(At.has)),
        (Lc = To(At.set)),
        (An = function (e, t) {
          if (bo(At, e)) throw new So(xc);
          return (t.facade = e), Lc(At, e, t), t;
        }),
        (Pr = function (e) {
          return qc(At, e) || {};
        }),
        (wn = function (e) {
          return bo(At, e);
        }))
      : ((Xt = wI("state")),
        (RI[Xt] = !0),
        (An = function (e, t) {
          if (Io(e, Xt)) throw new So(xc);
          return (t.facade = e), AI(e, Xt, t), t;
        }),
        (Pr = function (e) {
          return Io(e, Xt) ? e[Xt] : {};
        }),
        (wn = function (e) {
          return Io(e, Xt);
        }));
    var At, qc, bo, Lc, Xt;
    Dc.exports = { set: An, get: Pr, has: wn, enforce: NI, getterFor: xI };
  });
  var Xc = u((IB, Gc) => {
    var Ao = Ft(),
      qI = St(),
      Fc = Function.prototype,
      LI = Ao && Object.getOwnPropertyDescriptor,
      wo = qI(Fc, "name"),
      PI = wo && function () {}.name === "something",
      DI = wo && (!Ao || (Ao && LI(Fc, "name").configurable));
    Gc.exports = { EXISTS: wo, PROPER: PI, CONFIGURABLE: DI };
  });
  var kc = u((OB, Bc) => {
    var MI = Ie(),
      Uc = ft(),
      FI = St(),
      Wc = bn(),
      GI = In(),
      XI = yo(),
      Vc = Mc(),
      UI = Xc().CONFIGURABLE,
      WI = Vc.get,
      VI = Vc.enforce,
      BI = String(String).split("String");
    (Bc.exports = function (e, t, r, n) {
      var o = n ? !!n.unsafe : !1,
        i = n ? !!n.enumerable : !1,
        s = n ? !!n.noTargetGet : !1,
        a = n && n.name !== void 0 ? n.name : t,
        c;
      if (
        (Uc(r) &&
          (String(a).slice(0, 7) === "Symbol(" &&
            (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!FI(r, "name") || (UI && r.name !== a)) && Wc(r, "name", a),
          (c = VI(r)),
          c.source || (c.source = BI.join(typeof a == "string" ? a : ""))),
        e === MI)
      ) {
        i ? (e[t] = r) : GI(t, r);
        return;
      } else o ? !s && e[t] && (i = !0) : delete e[t];
      i ? (e[t] = r) : Wc(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Uc(this) && WI(this).source) || XI(this);
    });
  });
  var Ro = u((bB, Hc) => {
    var kI = Math.ceil,
      HI = Math.floor;
    Hc.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? HI : kI)(t);
    };
  });
  var Kc = u((SB, jc) => {
    var jI = Ro(),
      KI = Math.max,
      zI = Math.min;
    jc.exports = function (e, t) {
      var r = jI(e);
      return r < 0 ? KI(r + t, 0) : zI(r, t);
    };
  });
  var Yc = u((AB, zc) => {
    var YI = Ro(),
      QI = Math.min;
    zc.exports = function (e) {
      return e > 0 ? QI(YI(e), 9007199254740991) : 0;
    };
  });
  var $c = u((wB, Qc) => {
    var $I = Yc();
    Qc.exports = function (e) {
      return $I(e.length);
    };
  });
  var Co = u((RB, Jc) => {
    var ZI = Nr(),
      JI = Kc(),
      eO = $c(),
      Zc = function (e) {
        return function (t, r, n) {
          var o = ZI(t),
            i = eO(o),
            s = JI(n, i),
            a;
          if (e && r != r) {
            for (; i > s; ) if (((a = o[s++]), a != a)) return !0;
          } else
            for (; i > s; s++)
              if ((e || s in o) && o[s] === r) return e || s || 0;
          return !e && -1;
        };
      };
    Jc.exports = { includes: Zc(!0), indexOf: Zc(!1) };
  });
  var xo = u((CB, tl) => {
    var tO = tt(),
      No = St(),
      rO = Nr(),
      nO = Co().indexOf,
      iO = Sn(),
      el = tO([].push);
    tl.exports = function (e, t) {
      var r = rO(e),
        n = 0,
        o = [],
        i;
      for (i in r) !No(iO, i) && No(r, i) && el(o, i);
      for (; t.length > n; ) No(r, (i = t[n++])) && (~nO(o, i) || el(o, i));
      return o;
    };
  });
  var Rn = u((NB, rl) => {
    rl.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var il = u((nl) => {
    var oO = xo(),
      aO = Rn(),
      sO = aO.concat("length", "prototype");
    nl.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return oO(t, sO);
      };
  });
  var al = u((ol) => {
    ol.f = Object.getOwnPropertySymbols;
  });
  var ul = u((LB, sl) => {
    var uO = xr(),
      cO = tt(),
      lO = il(),
      fO = al(),
      dO = qr(),
      pO = cO([].concat);
    sl.exports =
      uO("Reflect", "ownKeys") ||
      function (t) {
        var r = lO.f(dO(t)),
          n = fO.f;
        return n ? pO(r, n(t)) : r;
      };
  });
  var ll = u((PB, cl) => {
    var vO = St(),
      hO = ul(),
      gO = Eo(),
      EO = Lr();
    cl.exports = function (e, t) {
      for (var r = hO(t), n = EO.f, o = gO.f, i = 0; i < r.length; i++) {
        var s = r[i];
        vO(e, s) || n(e, s, o(t, s));
      }
    };
  });
  var dl = u((DB, fl) => {
    var _O = Zt(),
      yO = ft(),
      mO = /#|\.prototype\./,
      Dr = function (e, t) {
        var r = IO[TO(e)];
        return r == bO ? !0 : r == OO ? !1 : yO(t) ? _O(t) : !!t;
      },
      TO = (Dr.normalize = function (e) {
        return String(e).replace(mO, ".").toLowerCase();
      }),
      IO = (Dr.data = {}),
      OO = (Dr.NATIVE = "N"),
      bO = (Dr.POLYFILL = "P");
    fl.exports = Dr;
  });
  var vl = u((MB, pl) => {
    var qo = Ie(),
      SO = Eo().f,
      AO = bn(),
      wO = kc(),
      RO = In(),
      CO = ll(),
      NO = dl();
    pl.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        o = e.stat,
        i,
        s,
        a,
        c,
        d,
        _;
      if (
        (n
          ? (s = qo)
          : o
          ? (s = qo[r] || RO(r, {}))
          : (s = (qo[r] || {}).prototype),
        s)
      )
        for (a in t) {
          if (
            ((d = t[a]),
            e.noTargetGet ? ((_ = SO(s, a)), (c = _ && _.value)) : (c = s[a]),
            (i = NO(n ? a : r + (o ? "." : "#") + a, e.forced)),
            !i && c !== void 0)
          ) {
            if (typeof d == typeof c) continue;
            CO(d, c);
          }
          (e.sham || (c && c.sham)) && AO(d, "sham", !0), wO(s, a, d, e);
        }
    };
  });
  var gl = u((FB, hl) => {
    var xO = xo(),
      qO = Rn();
    hl.exports =
      Object.keys ||
      function (t) {
        return xO(t, qO);
      };
  });
  var _l = u((GB, El) => {
    var LO = Ft(),
      PO = Lr(),
      DO = qr(),
      MO = Nr(),
      FO = gl();
    El.exports = LO
      ? Object.defineProperties
      : function (t, r) {
          DO(t);
          for (var n = MO(r), o = FO(r), i = o.length, s = 0, a; i > s; )
            PO.f(t, (a = o[s++]), n[a]);
          return t;
        };
  });
  var ml = u((XB, yl) => {
    var GO = xr();
    yl.exports = GO("document", "documentElement");
  });
  var Rl = u((UB, wl) => {
    var XO = qr(),
      UO = _l(),
      Tl = Rn(),
      WO = Sn(),
      VO = ml(),
      BO = ho(),
      kO = mo(),
      Il = ">",
      Ol = "<",
      Po = "prototype",
      Do = "script",
      Sl = kO("IE_PROTO"),
      Lo = function () {},
      Al = function (e) {
        return Ol + Do + Il + e + Ol + "/" + Do + Il;
      },
      bl = function (e) {
        e.write(Al("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      HO = function () {
        var e = BO("iframe"),
          t = "java" + Do + ":",
          r;
        return (
          (e.style.display = "none"),
          VO.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(Al("document.F=Object")),
          r.close(),
          r.F
        );
      },
      Cn,
      Nn = function () {
        try {
          Cn = new ActiveXObject("htmlfile");
        } catch {}
        Nn =
          typeof document < "u"
            ? document.domain && Cn
              ? bl(Cn)
              : HO()
            : bl(Cn);
        for (var e = Tl.length; e--; ) delete Nn[Po][Tl[e]];
        return Nn();
      };
    WO[Sl] = !0;
    wl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((Lo[Po] = XO(t)), (n = new Lo()), (Lo[Po] = null), (n[Sl] = t))
            : (n = Nn()),
          r === void 0 ? n : UO(n, r)
        );
      };
  });
  var Nl = u((WB, Cl) => {
    var jO = fo(),
      KO = Rl(),
      zO = Lr(),
      Mo = jO("unscopables"),
      Fo = Array.prototype;
    Fo[Mo] == null && zO.f(Fo, Mo, { configurable: !0, value: KO(null) });
    Cl.exports = function (e) {
      Fo[Mo][e] = !0;
    };
  });
  var xl = u(() => {
    "use strict";
    var YO = vl(),
      QO = Co().includes,
      $O = Nl();
    YO(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return QO(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    $O("includes");
  });
  var Ll = u((kB, ql) => {
    var ZO = Ie(),
      JO = tt();
    ql.exports = function (e, t) {
      return JO(ZO[e].prototype[t]);
    };
  });
  var Dl = u((HB, Pl) => {
    xl();
    var eb = Ll();
    Pl.exports = eb("Array", "includes");
  });
  var Fl = u((jB, Ml) => {
    var tb = Dl();
    Ml.exports = tb;
  });
  var Xl = u((KB, Gl) => {
    var rb = Fl();
    Gl.exports = rb;
  });
  var Go = u((zB, Ul) => {
    var nb =
      typeof global == "object" && global && global.Object === Object && global;
    Ul.exports = nb;
  });
  var nt = u((YB, Wl) => {
    var ib = Go(),
      ob = typeof self == "object" && self && self.Object === Object && self,
      ab = ib || ob || Function("return this")();
    Wl.exports = ab;
  });
  var tr = u((QB, Vl) => {
    var sb = nt(),
      ub = sb.Symbol;
    Vl.exports = ub;
  });
  var jl = u(($B, Hl) => {
    var Bl = tr(),
      kl = Object.prototype,
      cb = kl.hasOwnProperty,
      lb = kl.toString,
      Mr = Bl ? Bl.toStringTag : void 0;
    function fb(e) {
      var t = cb.call(e, Mr),
        r = e[Mr];
      try {
        e[Mr] = void 0;
        var n = !0;
      } catch {}
      var o = lb.call(e);
      return n && (t ? (e[Mr] = r) : delete e[Mr]), o;
    }
    Hl.exports = fb;
  });
  var zl = u((ZB, Kl) => {
    var db = Object.prototype,
      pb = db.toString;
    function vb(e) {
      return pb.call(e);
    }
    Kl.exports = vb;
  });
  var wt = u((JB, $l) => {
    var Yl = tr(),
      hb = jl(),
      gb = zl(),
      Eb = "[object Null]",
      _b = "[object Undefined]",
      Ql = Yl ? Yl.toStringTag : void 0;
    function yb(e) {
      return e == null
        ? e === void 0
          ? _b
          : Eb
        : Ql && Ql in Object(e)
        ? hb(e)
        : gb(e);
    }
    $l.exports = yb;
  });
  var Xo = u((ek, Zl) => {
    function mb(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    Zl.exports = mb;
  });
  var Uo = u((tk, Jl) => {
    var Tb = Xo(),
      Ib = Tb(Object.getPrototypeOf, Object);
    Jl.exports = Ib;
  });
  var mt = u((rk, ef) => {
    function Ob(e) {
      return e != null && typeof e == "object";
    }
    ef.exports = Ob;
  });
  var Wo = u((nk, rf) => {
    var bb = wt(),
      Sb = Uo(),
      Ab = mt(),
      wb = "[object Object]",
      Rb = Function.prototype,
      Cb = Object.prototype,
      tf = Rb.toString,
      Nb = Cb.hasOwnProperty,
      xb = tf.call(Object);
    function qb(e) {
      if (!Ab(e) || bb(e) != wb) return !1;
      var t = Sb(e);
      if (t === null) return !0;
      var r = Nb.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && tf.call(r) == xb;
    }
    rf.exports = qb;
  });
  var nf = u((Vo) => {
    "use strict";
    Object.defineProperty(Vo, "__esModule", { value: !0 });
    Vo.default = Lb;
    function Lb(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var of = u((ko, Bo) => {
    "use strict";
    Object.defineProperty(ko, "__esModule", { value: !0 });
    var Pb = nf(),
      Db = Mb(Pb);
    function Mb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var rr;
    typeof self < "u"
      ? (rr = self)
      : typeof window < "u"
      ? (rr = window)
      : typeof global < "u"
      ? (rr = global)
      : typeof Bo < "u"
      ? (rr = Bo)
      : (rr = Function("return this")());
    var Fb = (0, Db.default)(rr);
    ko.default = Fb;
  });
  var Ho = u((Fr) => {
    "use strict";
    Fr.__esModule = !0;
    Fr.ActionTypes = void 0;
    Fr.default = cf;
    var Gb = Wo(),
      Xb = uf(Gb),
      Ub = of(),
      af = uf(Ub);
    function uf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var sf = (Fr.ActionTypes = { INIT: "@@redux/INIT" });
    function cf(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(cf)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var o = e,
        i = t,
        s = [],
        a = s,
        c = !1;
      function d() {
        a === s && (a = s.slice());
      }
      function _() {
        return i;
      }
      function E(A) {
        if (typeof A != "function")
          throw new Error("Expected listener to be a function.");
        var G = !0;
        return (
          d(),
          a.push(A),
          function () {
            if (G) {
              (G = !1), d();
              var q = a.indexOf(A);
              a.splice(q, 1);
            }
          }
        );
      }
      function y(A) {
        if (!(0, Xb.default)(A))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof A.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (c) throw new Error("Reducers may not dispatch actions.");
        try {
          (c = !0), (i = o(i, A));
        } finally {
          c = !1;
        }
        for (var G = (s = a), N = 0; N < G.length; N++) G[N]();
        return A;
      }
      function T(A) {
        if (typeof A != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (o = A), y({ type: sf.INIT });
      }
      function R() {
        var A,
          G = E;
        return (
          (A = {
            subscribe: function (q) {
              if (typeof q != "object")
                throw new TypeError("Expected the observer to be an object.");
              function w() {
                q.next && q.next(_());
              }
              w();
              var D = G(w);
              return { unsubscribe: D };
            },
          }),
          (A[af.default] = function () {
            return this;
          }),
          A
        );
      }
      return (
        y({ type: sf.INIT }),
        (n = { dispatch: y, subscribe: E, getState: _, replaceReducer: T }),
        (n[af.default] = R),
        n
      );
    }
  });
  var Ko = u((jo) => {
    "use strict";
    jo.__esModule = !0;
    jo.default = Wb;
    function Wb(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var df = u((zo) => {
    "use strict";
    zo.__esModule = !0;
    zo.default = jb;
    var lf = Ho(),
      Vb = Wo(),
      sk = ff(Vb),
      Bb = Ko(),
      uk = ff(Bb);
    function ff(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function kb(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function Hb(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: lf.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var o =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: o }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                lf.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function jb(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var o = t[n];
        typeof e[o] == "function" && (r[o] = e[o]);
      }
      var i = Object.keys(r);
      if (!1) var s;
      var a;
      try {
        Hb(r);
      } catch (c) {
        a = c;
      }
      return function () {
        var d =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          _ = arguments[1];
        if (a) throw a;
        if (!1) var E;
        for (var y = !1, T = {}, R = 0; R < i.length; R++) {
          var A = i[R],
            G = r[A],
            N = d[A],
            q = G(N, _);
          if (typeof q > "u") {
            var w = kb(A, _);
            throw new Error(w);
          }
          (T[A] = q), (y = y || q !== N);
        }
        return y ? T : d;
      };
    }
  });
  var vf = u((Yo) => {
    "use strict";
    Yo.__esModule = !0;
    Yo.default = Kb;
    function pf(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function Kb(e, t) {
      if (typeof e == "function") return pf(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, o = 0; o < r.length; o++) {
        var i = r[o],
          s = e[i];
        typeof s == "function" && (n[i] = pf(s, t));
      }
      return n;
    }
  });
  var $o = u((Qo) => {
    "use strict";
    Qo.__esModule = !0;
    Qo.default = zb;
    function zb() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (i) {
          return i;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        o = t.slice(0, -1);
      return function () {
        return o.reduceRight(function (i, s) {
          return s(i);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var hf = u((Zo) => {
    "use strict";
    Zo.__esModule = !0;
    var Yb =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Zo.default = Jb;
    var Qb = $o(),
      $b = Zb(Qb);
    function Zb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Jb() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (o, i, s) {
          var a = n(o, i, s),
            c = a.dispatch,
            d = [],
            _ = {
              getState: a.getState,
              dispatch: function (y) {
                return c(y);
              },
            };
          return (
            (d = t.map(function (E) {
              return E(_);
            })),
            (c = $b.default.apply(void 0, d)(a.dispatch)),
            Yb({}, a, { dispatch: c })
          );
        };
      };
    }
  });
  var Jo = u((Ke) => {
    "use strict";
    Ke.__esModule = !0;
    Ke.compose =
      Ke.applyMiddleware =
      Ke.bindActionCreators =
      Ke.combineReducers =
      Ke.createStore =
        void 0;
    var eS = Ho(),
      tS = nr(eS),
      rS = df(),
      nS = nr(rS),
      iS = vf(),
      oS = nr(iS),
      aS = hf(),
      sS = nr(aS),
      uS = $o(),
      cS = nr(uS),
      lS = Ko(),
      pk = nr(lS);
    function nr(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Ke.createStore = tS.default;
    Ke.combineReducers = nS.default;
    Ke.bindActionCreators = oS.default;
    Ke.applyMiddleware = sS.default;
    Ke.compose = cS.default;
  });
  var gf = u((xe) => {
    "use strict";
    Object.defineProperty(xe, "__esModule", { value: !0 });
    xe.QuickEffectIds =
      xe.QuickEffectDirectionConsts =
      xe.EventTypeConsts =
      xe.EventLimitAffectedElements =
      xe.EventContinuousMouseAxes =
      xe.EventBasedOn =
      xe.EventAppliesTo =
        void 0;
    var fS = {
      NAVBAR_OPEN: "NAVBAR_OPEN",
      NAVBAR_CLOSE: "NAVBAR_CLOSE",
      TAB_ACTIVE: "TAB_ACTIVE",
      TAB_INACTIVE: "TAB_INACTIVE",
      SLIDER_ACTIVE: "SLIDER_ACTIVE",
      SLIDER_INACTIVE: "SLIDER_INACTIVE",
      DROPDOWN_OPEN: "DROPDOWN_OPEN",
      DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
      MOUSE_CLICK: "MOUSE_CLICK",
      MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
      MOUSE_DOWN: "MOUSE_DOWN",
      MOUSE_UP: "MOUSE_UP",
      MOUSE_OVER: "MOUSE_OVER",
      MOUSE_OUT: "MOUSE_OUT",
      MOUSE_MOVE: "MOUSE_MOVE",
      MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
      SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
      SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
      SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
      ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
      ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
      PAGE_START: "PAGE_START",
      PAGE_FINISH: "PAGE_FINISH",
      PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
      PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
      PAGE_SCROLL: "PAGE_SCROLL",
    };
    xe.EventTypeConsts = fS;
    var dS = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" };
    xe.EventAppliesTo = dS;
    var pS = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" };
    xe.EventBasedOn = pS;
    var vS = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" };
    xe.EventContinuousMouseAxes = vS;
    var hS = {
      CHILDREN: "CHILDREN",
      SIBLINGS: "SIBLINGS",
      IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
    };
    xe.EventLimitAffectedElements = hS;
    var gS = {
      FADE_EFFECT: "FADE_EFFECT",
      SLIDE_EFFECT: "SLIDE_EFFECT",
      GROW_EFFECT: "GROW_EFFECT",
      SHRINK_EFFECT: "SHRINK_EFFECT",
      SPIN_EFFECT: "SPIN_EFFECT",
      FLY_EFFECT: "FLY_EFFECT",
      POP_EFFECT: "POP_EFFECT",
      FLIP_EFFECT: "FLIP_EFFECT",
      JIGGLE_EFFECT: "JIGGLE_EFFECT",
      PULSE_EFFECT: "PULSE_EFFECT",
      DROP_EFFECT: "DROP_EFFECT",
      BLINK_EFFECT: "BLINK_EFFECT",
      BOUNCE_EFFECT: "BOUNCE_EFFECT",
      FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
      FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
      RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
      JELLO_EFFECT: "JELLO_EFFECT",
      GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
      SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
      PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
    };
    xe.QuickEffectIds = gS;
    var ES = {
      LEFT: "LEFT",
      RIGHT: "RIGHT",
      BOTTOM: "BOTTOM",
      TOP: "TOP",
      BOTTOM_LEFT: "BOTTOM_LEFT",
      BOTTOM_RIGHT: "BOTTOM_RIGHT",
      TOP_RIGHT: "TOP_RIGHT",
      TOP_LEFT: "TOP_LEFT",
      CLOCKWISE: "CLOCKWISE",
      COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
    };
    xe.QuickEffectDirectionConsts = ES;
  });
  var ea = u((ir) => {
    "use strict";
    Object.defineProperty(ir, "__esModule", { value: !0 });
    ir.ActionTypeConsts = ir.ActionAppliesTo = void 0;
    var _S = {
      TRANSFORM_MOVE: "TRANSFORM_MOVE",
      TRANSFORM_SCALE: "TRANSFORM_SCALE",
      TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
      TRANSFORM_SKEW: "TRANSFORM_SKEW",
      STYLE_OPACITY: "STYLE_OPACITY",
      STYLE_SIZE: "STYLE_SIZE",
      STYLE_FILTER: "STYLE_FILTER",
      STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
      STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
      STYLE_BORDER: "STYLE_BORDER",
      STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
      PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
      GENERAL_DISPLAY: "GENERAL_DISPLAY",
      GENERAL_START_ACTION: "GENERAL_START_ACTION",
      GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
      GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
      GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
      GENERAL_LOOP: "GENERAL_LOOP",
      STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
    };
    ir.ActionTypeConsts = _S;
    var yS = {
      ELEMENT: "ELEMENT",
      ELEMENT_CLASS: "ELEMENT_CLASS",
      TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
    };
    ir.ActionAppliesTo = yS;
  });
  var Ef = u((xn) => {
    "use strict";
    Object.defineProperty(xn, "__esModule", { value: !0 });
    xn.InteractionTypeConsts = void 0;
    var mS = {
      MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
      MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
      MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
      SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
      SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
      MOUSE_MOVE_IN_VIEWPORT_INTERACTION: "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
      PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
      PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
      PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
      NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
      DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
      ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
      TAB_INTERACTION: "TAB_INTERACTION",
      SLIDER_INTERACTION: "SLIDER_INTERACTION",
    };
    xn.InteractionTypeConsts = mS;
  });
  var _f = u((qn) => {
    "use strict";
    Object.defineProperty(qn, "__esModule", { value: !0 });
    qn.ReducedMotionTypes = void 0;
    var TS = ea(),
      {
        TRANSFORM_MOVE: IS,
        TRANSFORM_SCALE: OS,
        TRANSFORM_ROTATE: bS,
        TRANSFORM_SKEW: SS,
        STYLE_SIZE: AS,
        STYLE_FILTER: wS,
        STYLE_FONT_VARIATION: RS,
      } = TS.ActionTypeConsts,
      CS = {
        [IS]: !0,
        [OS]: !0,
        [bS]: !0,
        [SS]: !0,
        [AS]: !0,
        [wS]: !0,
        [RS]: !0,
      };
    qn.ReducedMotionTypes = CS;
  });
  var yf = u((le) => {
    "use strict";
    Object.defineProperty(le, "__esModule", { value: !0 });
    le.IX2_VIEWPORT_WIDTH_CHANGED =
      le.IX2_TEST_FRAME_RENDERED =
      le.IX2_STOP_REQUESTED =
      le.IX2_SESSION_STOPPED =
      le.IX2_SESSION_STARTED =
      le.IX2_SESSION_INITIALIZED =
      le.IX2_RAW_DATA_IMPORTED =
      le.IX2_PREVIEW_REQUESTED =
      le.IX2_PLAYBACK_REQUESTED =
      le.IX2_PARAMETER_CHANGED =
      le.IX2_MEDIA_QUERIES_DEFINED =
      le.IX2_INSTANCE_STARTED =
      le.IX2_INSTANCE_REMOVED =
      le.IX2_INSTANCE_ADDED =
      le.IX2_EVENT_STATE_CHANGED =
      le.IX2_EVENT_LISTENER_ADDED =
      le.IX2_ELEMENT_STATE_CHANGED =
      le.IX2_CLEAR_REQUESTED =
      le.IX2_ANIMATION_FRAME_CHANGED =
      le.IX2_ACTION_LIST_PLAYBACK_CHANGED =
        void 0;
    var NS = "IX2_RAW_DATA_IMPORTED";
    le.IX2_RAW_DATA_IMPORTED = NS;
    var xS = "IX2_SESSION_INITIALIZED";
    le.IX2_SESSION_INITIALIZED = xS;
    var qS = "IX2_SESSION_STARTED";
    le.IX2_SESSION_STARTED = qS;
    var LS = "IX2_SESSION_STOPPED";
    le.IX2_SESSION_STOPPED = LS;
    var PS = "IX2_PREVIEW_REQUESTED";
    le.IX2_PREVIEW_REQUESTED = PS;
    var DS = "IX2_PLAYBACK_REQUESTED";
    le.IX2_PLAYBACK_REQUESTED = DS;
    var MS = "IX2_STOP_REQUESTED";
    le.IX2_STOP_REQUESTED = MS;
    var FS = "IX2_CLEAR_REQUESTED";
    le.IX2_CLEAR_REQUESTED = FS;
    var GS = "IX2_EVENT_LISTENER_ADDED";
    le.IX2_EVENT_LISTENER_ADDED = GS;
    var XS = "IX2_EVENT_STATE_CHANGED";
    le.IX2_EVENT_STATE_CHANGED = XS;
    var US = "IX2_ANIMATION_FRAME_CHANGED";
    le.IX2_ANIMATION_FRAME_CHANGED = US;
    var WS = "IX2_PARAMETER_CHANGED";
    le.IX2_PARAMETER_CHANGED = WS;
    var VS = "IX2_INSTANCE_ADDED";
    le.IX2_INSTANCE_ADDED = VS;
    var BS = "IX2_INSTANCE_STARTED";
    le.IX2_INSTANCE_STARTED = BS;
    var kS = "IX2_INSTANCE_REMOVED";
    le.IX2_INSTANCE_REMOVED = kS;
    var HS = "IX2_ELEMENT_STATE_CHANGED";
    le.IX2_ELEMENT_STATE_CHANGED = HS;
    var jS = "IX2_ACTION_LIST_PLAYBACK_CHANGED";
    le.IX2_ACTION_LIST_PLAYBACK_CHANGED = jS;
    var KS = "IX2_VIEWPORT_WIDTH_CHANGED";
    le.IX2_VIEWPORT_WIDTH_CHANGED = KS;
    var zS = "IX2_MEDIA_QUERIES_DEFINED";
    le.IX2_MEDIA_QUERIES_DEFINED = zS;
    var YS = "IX2_TEST_FRAME_RENDERED";
    le.IX2_TEST_FRAME_RENDERED = YS;
  });
  var mf = u((P) => {
    "use strict";
    Object.defineProperty(P, "__esModule", { value: !0 });
    P.W_MOD_JS =
      P.W_MOD_IX =
      P.WILL_CHANGE =
      P.WIDTH =
      P.WF_PAGE =
      P.TRANSLATE_Z =
      P.TRANSLATE_Y =
      P.TRANSLATE_X =
      P.TRANSLATE_3D =
      P.TRANSFORM =
      P.SKEW_Y =
      P.SKEW_X =
      P.SKEW =
      P.SIBLINGS =
      P.SCALE_Z =
      P.SCALE_Y =
      P.SCALE_X =
      P.SCALE_3D =
      P.ROTATE_Z =
      P.ROTATE_Y =
      P.ROTATE_X =
      P.RENDER_TRANSFORM =
      P.RENDER_STYLE =
      P.RENDER_PLUGIN =
      P.RENDER_GENERAL =
      P.PRESERVE_3D =
      P.PLAIN_OBJECT =
      P.PARENT =
      P.OPACITY =
      P.IX2_ID_DELIMITER =
      P.IMMEDIATE_CHILDREN =
      P.HTML_ELEMENT =
      P.HEIGHT =
      P.FONT_VARIATION_SETTINGS =
      P.FLEX =
      P.FILTER =
      P.DISPLAY =
      P.CONFIG_Z_VALUE =
      P.CONFIG_Z_UNIT =
      P.CONFIG_Y_VALUE =
      P.CONFIG_Y_UNIT =
      P.CONFIG_X_VALUE =
      P.CONFIG_X_UNIT =
      P.CONFIG_VALUE =
      P.CONFIG_UNIT =
      P.COMMA_DELIMITER =
      P.COLOR =
      P.COLON_DELIMITER =
      P.CHILDREN =
      P.BOUNDARY_SELECTOR =
      P.BORDER_COLOR =
      P.BAR_DELIMITER =
      P.BACKGROUND_COLOR =
      P.BACKGROUND =
      P.AUTO =
      P.ABSTRACT_NODE =
        void 0;
    var QS = "|";
    P.IX2_ID_DELIMITER = QS;
    var $S = "data-wf-page";
    P.WF_PAGE = $S;
    var ZS = "w-mod-js";
    P.W_MOD_JS = ZS;
    var JS = "w-mod-ix";
    P.W_MOD_IX = JS;
    var eA = ".w-dyn-item";
    P.BOUNDARY_SELECTOR = eA;
    var tA = "xValue";
    P.CONFIG_X_VALUE = tA;
    var rA = "yValue";
    P.CONFIG_Y_VALUE = rA;
    var nA = "zValue";
    P.CONFIG_Z_VALUE = nA;
    var iA = "value";
    P.CONFIG_VALUE = iA;
    var oA = "xUnit";
    P.CONFIG_X_UNIT = oA;
    var aA = "yUnit";
    P.CONFIG_Y_UNIT = aA;
    var sA = "zUnit";
    P.CONFIG_Z_UNIT = sA;
    var uA = "unit";
    P.CONFIG_UNIT = uA;
    var cA = "transform";
    P.TRANSFORM = cA;
    var lA = "translateX";
    P.TRANSLATE_X = lA;
    var fA = "translateY";
    P.TRANSLATE_Y = fA;
    var dA = "translateZ";
    P.TRANSLATE_Z = dA;
    var pA = "translate3d";
    P.TRANSLATE_3D = pA;
    var vA = "scaleX";
    P.SCALE_X = vA;
    var hA = "scaleY";
    P.SCALE_Y = hA;
    var gA = "scaleZ";
    P.SCALE_Z = gA;
    var EA = "scale3d";
    P.SCALE_3D = EA;
    var _A = "rotateX";
    P.ROTATE_X = _A;
    var yA = "rotateY";
    P.ROTATE_Y = yA;
    var mA = "rotateZ";
    P.ROTATE_Z = mA;
    var TA = "skew";
    P.SKEW = TA;
    var IA = "skewX";
    P.SKEW_X = IA;
    var OA = "skewY";
    P.SKEW_Y = OA;
    var bA = "opacity";
    P.OPACITY = bA;
    var SA = "filter";
    P.FILTER = SA;
    var AA = "font-variation-settings";
    P.FONT_VARIATION_SETTINGS = AA;
    var wA = "width";
    P.WIDTH = wA;
    var RA = "height";
    P.HEIGHT = RA;
    var CA = "backgroundColor";
    P.BACKGROUND_COLOR = CA;
    var NA = "background";
    P.BACKGROUND = NA;
    var xA = "borderColor";
    P.BORDER_COLOR = xA;
    var qA = "color";
    P.COLOR = qA;
    var LA = "display";
    P.DISPLAY = LA;
    var PA = "flex";
    P.FLEX = PA;
    var DA = "willChange";
    P.WILL_CHANGE = DA;
    var MA = "AUTO";
    P.AUTO = MA;
    var FA = ",";
    P.COMMA_DELIMITER = FA;
    var GA = ":";
    P.COLON_DELIMITER = GA;
    var XA = "|";
    P.BAR_DELIMITER = XA;
    var UA = "CHILDREN";
    P.CHILDREN = UA;
    var WA = "IMMEDIATE_CHILDREN";
    P.IMMEDIATE_CHILDREN = WA;
    var VA = "SIBLINGS";
    P.SIBLINGS = VA;
    var BA = "PARENT";
    P.PARENT = BA;
    var kA = "preserve-3d";
    P.PRESERVE_3D = kA;
    var HA = "HTML_ELEMENT";
    P.HTML_ELEMENT = HA;
    var jA = "PLAIN_OBJECT";
    P.PLAIN_OBJECT = jA;
    var KA = "ABSTRACT_NODE";
    P.ABSTRACT_NODE = KA;
    var zA = "RENDER_TRANSFORM";
    P.RENDER_TRANSFORM = zA;
    var YA = "RENDER_GENERAL";
    P.RENDER_GENERAL = YA;
    var QA = "RENDER_STYLE";
    P.RENDER_STYLE = QA;
    var $A = "RENDER_PLUGIN";
    P.RENDER_PLUGIN = $A;
  });
  var ke = u((Re) => {
    "use strict";
    var Tf = $t().default;
    Object.defineProperty(Re, "__esModule", { value: !0 });
    var Ln = { IX2EngineActionTypes: !0, IX2EngineConstants: !0 };
    Re.IX2EngineConstants = Re.IX2EngineActionTypes = void 0;
    var ta = gf();
    Object.keys(ta).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(Ln, e) ||
        (e in Re && Re[e] === ta[e]) ||
        Object.defineProperty(Re, e, {
          enumerable: !0,
          get: function () {
            return ta[e];
          },
        });
    });
    var ra = ea();
    Object.keys(ra).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(Ln, e) ||
        (e in Re && Re[e] === ra[e]) ||
        Object.defineProperty(Re, e, {
          enumerable: !0,
          get: function () {
            return ra[e];
          },
        });
    });
    var na = Ef();
    Object.keys(na).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(Ln, e) ||
        (e in Re && Re[e] === na[e]) ||
        Object.defineProperty(Re, e, {
          enumerable: !0,
          get: function () {
            return na[e];
          },
        });
    });
    var ia = _f();
    Object.keys(ia).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(Ln, e) ||
        (e in Re && Re[e] === ia[e]) ||
        Object.defineProperty(Re, e, {
          enumerable: !0,
          get: function () {
            return ia[e];
          },
        });
    });
    var ZA = Tf(yf());
    Re.IX2EngineActionTypes = ZA;
    var JA = Tf(mf());
    Re.IX2EngineConstants = JA;
  });
  var If = u((Pn) => {
    "use strict";
    Object.defineProperty(Pn, "__esModule", { value: !0 });
    Pn.ixData = void 0;
    var ew = ke(),
      { IX2_RAW_DATA_IMPORTED: tw } = ew.IX2EngineActionTypes,
      rw = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case tw:
            return t.payload.ixData || Object.freeze({});
          default:
            return e;
        }
      };
    Pn.ixData = rw;
  });
  var Gr = u((Ok, Tt) => {
    function oa() {
      return (
        (Tt.exports = oa =
          Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }),
        (Tt.exports.__esModule = !0),
        (Tt.exports.default = Tt.exports),
        oa.apply(this, arguments)
      );
    }
    (Tt.exports = oa),
      (Tt.exports.__esModule = !0),
      (Tt.exports.default = Tt.exports);
  });
  var or = u((be) => {
    "use strict";
    Object.defineProperty(be, "__esModule", { value: !0 });
    var nw =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    be.clone = Mn;
    be.addLast = Sf;
    be.addFirst = Af;
    be.removeLast = wf;
    be.removeFirst = Rf;
    be.insert = Cf;
    be.removeAt = Nf;
    be.replaceAt = xf;
    be.getIn = Fn;
    be.set = Gn;
    be.setIn = Xn;
    be.update = Lf;
    be.updateIn = Pf;
    be.merge = Df;
    be.mergeDeep = Mf;
    be.mergeIn = Ff;
    be.omit = Gf;
    be.addDefaults = Xf;
    var Of = "INVALID_ARGS";
    function bf(e) {
      throw new Error(e);
    }
    function aa(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var iw = {}.hasOwnProperty;
    function Mn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = aa(e), r = {}, n = 0; n < t.length; n++) {
        var o = t[n];
        r[o] = e[o];
      }
      return r;
    }
    function He(e, t, r) {
      var n = r;
      n == null && bf(Of);
      for (
        var o = !1, i = arguments.length, s = Array(i > 3 ? i - 3 : 0), a = 3;
        a < i;
        a++
      )
        s[a - 3] = arguments[a];
      for (var c = 0; c < s.length; c++) {
        var d = s[c];
        if (d != null) {
          var _ = aa(d);
          if (_.length)
            for (var E = 0; E <= _.length; E++) {
              var y = _[E];
              if (!(e && n[y] !== void 0)) {
                var T = d[y];
                t && Dn(n[y]) && Dn(T) && (T = He(e, t, n[y], T)),
                  !(T === void 0 || T === n[y]) &&
                    (o || ((o = !0), (n = Mn(n))), (n[y] = T));
              }
            }
        }
      }
      return n;
    }
    function Dn(e) {
      var t = typeof e > "u" ? "undefined" : nw(e);
      return e != null && (t === "object" || t === "function");
    }
    function Sf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Af(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function wf(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Rf(e) {
      return e.length ? e.slice(1) : e;
    }
    function Cf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Nf(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function xf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, o = Array(n), i = 0; i < n; i++) o[i] = e[i];
      return (o[t] = r), o;
    }
    function Fn(e, t) {
      if ((!Array.isArray(t) && bf(Of), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var o = t[n];
          if (((r = r?.[o]), r === void 0)) return r;
        }
        return r;
      }
    }
    function Gn(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        o = e ?? n;
      if (o[t] === r) return o;
      var i = Mn(o);
      return (i[t] = r), i;
    }
    function qf(e, t, r, n) {
      var o = void 0,
        i = t[n];
      if (n === t.length - 1) o = r;
      else {
        var s =
          Dn(e) && Dn(e[i]) ? e[i] : typeof t[n + 1] == "number" ? [] : {};
        o = qf(s, t, r, n + 1);
      }
      return Gn(e, i, o);
    }
    function Xn(e, t, r) {
      return t.length ? qf(e, t, r, 0) : r;
    }
    function Lf(e, t, r) {
      var n = e?.[t],
        o = r(n);
      return Gn(e, t, o);
    }
    function Pf(e, t, r) {
      var n = Fn(e, t),
        o = r(n);
      return Xn(e, t, o);
    }
    function Df(e, t, r, n, o, i) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6;
        c < s;
        c++
      )
        a[c - 6] = arguments[c];
      return a.length
        ? He.call.apply(He, [null, !1, !1, e, t, r, n, o, i].concat(a))
        : He(!1, !1, e, t, r, n, o, i);
    }
    function Mf(e, t, r, n, o, i) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6;
        c < s;
        c++
      )
        a[c - 6] = arguments[c];
      return a.length
        ? He.call.apply(He, [null, !1, !0, e, t, r, n, o, i].concat(a))
        : He(!1, !0, e, t, r, n, o, i);
    }
    function Ff(e, t, r, n, o, i, s) {
      var a = Fn(e, t);
      a == null && (a = {});
      for (
        var c = void 0,
          d = arguments.length,
          _ = Array(d > 7 ? d - 7 : 0),
          E = 7;
        E < d;
        E++
      )
        _[E - 7] = arguments[E];
      return (
        _.length
          ? (c = He.call.apply(He, [null, !1, !1, a, r, n, o, i, s].concat(_)))
          : (c = He(!1, !1, a, r, n, o, i, s)),
        Xn(e, t, c)
      );
    }
    function Gf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, o = 0; o < r.length; o++)
        if (iw.call(e, r[o])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var i = {}, s = aa(e), a = 0; a < s.length; a++) {
        var c = s[a];
        r.indexOf(c) >= 0 || (i[c] = e[c]);
      }
      return i;
    }
    function Xf(e, t, r, n, o, i) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6;
        c < s;
        c++
      )
        a[c - 6] = arguments[c];
      return a.length
        ? He.call.apply(He, [null, !0, !1, e, t, r, n, o, i].concat(a))
        : He(!0, !1, e, t, r, n, o, i);
    }
    var ow = {
      clone: Mn,
      addLast: Sf,
      addFirst: Af,
      removeLast: wf,
      removeFirst: Rf,
      insert: Cf,
      removeAt: Nf,
      replaceAt: xf,
      getIn: Fn,
      set: Gn,
      setIn: Xn,
      update: Lf,
      updateIn: Pf,
      merge: Df,
      mergeDeep: Mf,
      mergeIn: Ff,
      omit: Gf,
      addDefaults: Xf,
    };
    be.default = ow;
  });
  var Wf = u((Un) => {
    "use strict";
    var aw = lt().default;
    Object.defineProperty(Un, "__esModule", { value: !0 });
    Un.ixRequest = void 0;
    var sw = aw(Gr()),
      uw = ke(),
      cw = or(),
      {
        IX2_PREVIEW_REQUESTED: lw,
        IX2_PLAYBACK_REQUESTED: fw,
        IX2_STOP_REQUESTED: dw,
        IX2_CLEAR_REQUESTED: pw,
      } = uw.IX2EngineActionTypes,
      vw = { preview: {}, playback: {}, stop: {}, clear: {} },
      Uf = Object.create(null, {
        [lw]: { value: "preview" },
        [fw]: { value: "playback" },
        [dw]: { value: "stop" },
        [pw]: { value: "clear" },
      }),
      hw = (e = vw, t) => {
        if (t.type in Uf) {
          let r = [Uf[t.type]];
          return (0, cw.setIn)(e, [r], (0, sw.default)({}, t.payload));
        }
        return e;
      };
    Un.ixRequest = hw;
  });
  var Bf = u((Wn) => {
    "use strict";
    Object.defineProperty(Wn, "__esModule", { value: !0 });
    Wn.ixSession = void 0;
    var gw = ke(),
      dt = or(),
      {
        IX2_SESSION_INITIALIZED: Ew,
        IX2_SESSION_STARTED: _w,
        IX2_TEST_FRAME_RENDERED: yw,
        IX2_SESSION_STOPPED: mw,
        IX2_EVENT_LISTENER_ADDED: Tw,
        IX2_EVENT_STATE_CHANGED: Iw,
        IX2_ANIMATION_FRAME_CHANGED: Ow,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: bw,
        IX2_VIEWPORT_WIDTH_CHANGED: Sw,
        IX2_MEDIA_QUERIES_DEFINED: Aw,
      } = gw.IX2EngineActionTypes,
      Vf = {
        active: !1,
        tick: 0,
        eventListeners: [],
        eventState: {},
        playbackState: {},
        viewportWidth: 0,
        mediaQueryKey: null,
        hasBoundaryNodes: !1,
        hasDefinedMediaQueries: !1,
        reducedMotion: !1,
      },
      ww = 20,
      Rw = (e = Vf, t) => {
        switch (t.type) {
          case Ew: {
            let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
            return (0, dt.merge)(e, { hasBoundaryNodes: r, reducedMotion: n });
          }
          case _w:
            return (0, dt.set)(e, "active", !0);
          case yw: {
            let {
              payload: { step: r = ww },
            } = t;
            return (0, dt.set)(e, "tick", e.tick + r);
          }
          case mw:
            return Vf;
          case Ow: {
            let {
              payload: { now: r },
            } = t;
            return (0, dt.set)(e, "tick", r);
          }
          case Tw: {
            let r = (0, dt.addLast)(e.eventListeners, t.payload);
            return (0, dt.set)(e, "eventListeners", r);
          }
          case Iw: {
            let { stateKey: r, newState: n } = t.payload;
            return (0, dt.setIn)(e, ["eventState", r], n);
          }
          case bw: {
            let { actionListId: r, isPlaying: n } = t.payload;
            return (0, dt.setIn)(e, ["playbackState", r], n);
          }
          case Sw: {
            let { width: r, mediaQueries: n } = t.payload,
              o = n.length,
              i = null;
            for (let s = 0; s < o; s++) {
              let { key: a, min: c, max: d } = n[s];
              if (r >= c && r <= d) {
                i = a;
                break;
              }
            }
            return (0, dt.merge)(e, { viewportWidth: r, mediaQueryKey: i });
          }
          case Aw:
            return (0, dt.set)(e, "hasDefinedMediaQueries", !0);
          default:
            return e;
        }
      };
    Wn.ixSession = Rw;
  });
  var Hf = u((wk, kf) => {
    function Cw() {
      (this.__data__ = []), (this.size = 0);
    }
    kf.exports = Cw;
  });
  var Vn = u((Rk, jf) => {
    function Nw(e, t) {
      return e === t || (e !== e && t !== t);
    }
    jf.exports = Nw;
  });
  var Xr = u((Ck, Kf) => {
    var xw = Vn();
    function qw(e, t) {
      for (var r = e.length; r--; ) if (xw(e[r][0], t)) return r;
      return -1;
    }
    Kf.exports = qw;
  });
  var Yf = u((Nk, zf) => {
    var Lw = Xr(),
      Pw = Array.prototype,
      Dw = Pw.splice;
    function Mw(e) {
      var t = this.__data__,
        r = Lw(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : Dw.call(t, r, 1), --this.size, !0;
    }
    zf.exports = Mw;
  });
  var $f = u((xk, Qf) => {
    var Fw = Xr();
    function Gw(e) {
      var t = this.__data__,
        r = Fw(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    Qf.exports = Gw;
  });
  var Jf = u((qk, Zf) => {
    var Xw = Xr();
    function Uw(e) {
      return Xw(this.__data__, e) > -1;
    }
    Zf.exports = Uw;
  });
  var td = u((Lk, ed) => {
    var Ww = Xr();
    function Vw(e, t) {
      var r = this.__data__,
        n = Ww(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    ed.exports = Vw;
  });
  var Ur = u((Pk, rd) => {
    var Bw = Hf(),
      kw = Yf(),
      Hw = $f(),
      jw = Jf(),
      Kw = td();
    function ar(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    ar.prototype.clear = Bw;
    ar.prototype.delete = kw;
    ar.prototype.get = Hw;
    ar.prototype.has = jw;
    ar.prototype.set = Kw;
    rd.exports = ar;
  });
  var id = u((Dk, nd) => {
    var zw = Ur();
    function Yw() {
      (this.__data__ = new zw()), (this.size = 0);
    }
    nd.exports = Yw;
  });
  var ad = u((Mk, od) => {
    function Qw(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    od.exports = Qw;
  });
  var ud = u((Fk, sd) => {
    function $w(e) {
      return this.__data__.get(e);
    }
    sd.exports = $w;
  });
  var ld = u((Gk, cd) => {
    function Zw(e) {
      return this.__data__.has(e);
    }
    cd.exports = Zw;
  });
  var pt = u((Xk, fd) => {
    function Jw(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    fd.exports = Jw;
  });
  var sa = u((Uk, dd) => {
    var e0 = wt(),
      t0 = pt(),
      r0 = "[object AsyncFunction]",
      n0 = "[object Function]",
      i0 = "[object GeneratorFunction]",
      o0 = "[object Proxy]";
    function a0(e) {
      if (!t0(e)) return !1;
      var t = e0(e);
      return t == n0 || t == i0 || t == r0 || t == o0;
    }
    dd.exports = a0;
  });
  var vd = u((Wk, pd) => {
    var s0 = nt(),
      u0 = s0["__core-js_shared__"];
    pd.exports = u0;
  });
  var Ed = u((Vk, gd) => {
    var ua = vd(),
      hd = (function () {
        var e = /[^.]+$/.exec((ua && ua.keys && ua.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function c0(e) {
      return !!hd && hd in e;
    }
    gd.exports = c0;
  });
  var ca = u((Bk, _d) => {
    var l0 = Function.prototype,
      f0 = l0.toString;
    function d0(e) {
      if (e != null) {
        try {
          return f0.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    _d.exports = d0;
  });
  var md = u((kk, yd) => {
    var p0 = sa(),
      v0 = Ed(),
      h0 = pt(),
      g0 = ca(),
      E0 = /[\\^$.*+?()[\]{}|]/g,
      _0 = /^\[object .+?Constructor\]$/,
      y0 = Function.prototype,
      m0 = Object.prototype,
      T0 = y0.toString,
      I0 = m0.hasOwnProperty,
      O0 = RegExp(
        "^" +
          T0.call(I0)
            .replace(E0, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function b0(e) {
      if (!h0(e) || v0(e)) return !1;
      var t = p0(e) ? O0 : _0;
      return t.test(g0(e));
    }
    yd.exports = b0;
  });
  var Id = u((Hk, Td) => {
    function S0(e, t) {
      return e?.[t];
    }
    Td.exports = S0;
  });
  var Rt = u((jk, Od) => {
    var A0 = md(),
      w0 = Id();
    function R0(e, t) {
      var r = w0(e, t);
      return A0(r) ? r : void 0;
    }
    Od.exports = R0;
  });
  var Bn = u((Kk, bd) => {
    var C0 = Rt(),
      N0 = nt(),
      x0 = C0(N0, "Map");
    bd.exports = x0;
  });
  var Wr = u((zk, Sd) => {
    var q0 = Rt(),
      L0 = q0(Object, "create");
    Sd.exports = L0;
  });
  var Rd = u((Yk, wd) => {
    var Ad = Wr();
    function P0() {
      (this.__data__ = Ad ? Ad(null) : {}), (this.size = 0);
    }
    wd.exports = P0;
  });
  var Nd = u((Qk, Cd) => {
    function D0(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Cd.exports = D0;
  });
  var qd = u(($k, xd) => {
    var M0 = Wr(),
      F0 = "__lodash_hash_undefined__",
      G0 = Object.prototype,
      X0 = G0.hasOwnProperty;
    function U0(e) {
      var t = this.__data__;
      if (M0) {
        var r = t[e];
        return r === F0 ? void 0 : r;
      }
      return X0.call(t, e) ? t[e] : void 0;
    }
    xd.exports = U0;
  });
  var Pd = u((Zk, Ld) => {
    var W0 = Wr(),
      V0 = Object.prototype,
      B0 = V0.hasOwnProperty;
    function k0(e) {
      var t = this.__data__;
      return W0 ? t[e] !== void 0 : B0.call(t, e);
    }
    Ld.exports = k0;
  });
  var Md = u((Jk, Dd) => {
    var H0 = Wr(),
      j0 = "__lodash_hash_undefined__";
    function K0(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = H0 && t === void 0 ? j0 : t),
        this
      );
    }
    Dd.exports = K0;
  });
  var Gd = u((eH, Fd) => {
    var z0 = Rd(),
      Y0 = Nd(),
      Q0 = qd(),
      $0 = Pd(),
      Z0 = Md();
    function sr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    sr.prototype.clear = z0;
    sr.prototype.delete = Y0;
    sr.prototype.get = Q0;
    sr.prototype.has = $0;
    sr.prototype.set = Z0;
    Fd.exports = sr;
  });
  var Wd = u((tH, Ud) => {
    var Xd = Gd(),
      J0 = Ur(),
      eR = Bn();
    function tR() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Xd(),
          map: new (eR || J0)(),
          string: new Xd(),
        });
    }
    Ud.exports = tR;
  });
  var Bd = u((rH, Vd) => {
    function rR(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Vd.exports = rR;
  });
  var Vr = u((nH, kd) => {
    var nR = Bd();
    function iR(e, t) {
      var r = e.__data__;
      return nR(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    kd.exports = iR;
  });
  var jd = u((iH, Hd) => {
    var oR = Vr();
    function aR(e) {
      var t = oR(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    Hd.exports = aR;
  });
  var zd = u((oH, Kd) => {
    var sR = Vr();
    function uR(e) {
      return sR(this, e).get(e);
    }
    Kd.exports = uR;
  });
  var Qd = u((aH, Yd) => {
    var cR = Vr();
    function lR(e) {
      return cR(this, e).has(e);
    }
    Yd.exports = lR;
  });
  var Zd = u((sH, $d) => {
    var fR = Vr();
    function dR(e, t) {
      var r = fR(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    $d.exports = dR;
  });
  var kn = u((uH, Jd) => {
    var pR = Wd(),
      vR = jd(),
      hR = zd(),
      gR = Qd(),
      ER = Zd();
    function ur(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    ur.prototype.clear = pR;
    ur.prototype.delete = vR;
    ur.prototype.get = hR;
    ur.prototype.has = gR;
    ur.prototype.set = ER;
    Jd.exports = ur;
  });
  var tp = u((cH, ep) => {
    var _R = Ur(),
      yR = Bn(),
      mR = kn(),
      TR = 200;
    function IR(e, t) {
      var r = this.__data__;
      if (r instanceof _R) {
        var n = r.__data__;
        if (!yR || n.length < TR - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new mR(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    ep.exports = IR;
  });
  var la = u((lH, rp) => {
    var OR = Ur(),
      bR = id(),
      SR = ad(),
      AR = ud(),
      wR = ld(),
      RR = tp();
    function cr(e) {
      var t = (this.__data__ = new OR(e));
      this.size = t.size;
    }
    cr.prototype.clear = bR;
    cr.prototype.delete = SR;
    cr.prototype.get = AR;
    cr.prototype.has = wR;
    cr.prototype.set = RR;
    rp.exports = cr;
  });
  var ip = u((fH, np) => {
    var CR = "__lodash_hash_undefined__";
    function NR(e) {
      return this.__data__.set(e, CR), this;
    }
    np.exports = NR;
  });
  var ap = u((dH, op) => {
    function xR(e) {
      return this.__data__.has(e);
    }
    op.exports = xR;
  });
  var up = u((pH, sp) => {
    var qR = kn(),
      LR = ip(),
      PR = ap();
    function Hn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new qR(); ++t < r; ) this.add(e[t]);
    }
    Hn.prototype.add = Hn.prototype.push = LR;
    Hn.prototype.has = PR;
    sp.exports = Hn;
  });
  var lp = u((vH, cp) => {
    function DR(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    cp.exports = DR;
  });
  var dp = u((hH, fp) => {
    function MR(e, t) {
      return e.has(t);
    }
    fp.exports = MR;
  });
  var fa = u((gH, pp) => {
    var FR = up(),
      GR = lp(),
      XR = dp(),
      UR = 1,
      WR = 2;
    function VR(e, t, r, n, o, i) {
      var s = r & UR,
        a = e.length,
        c = t.length;
      if (a != c && !(s && c > a)) return !1;
      var d = i.get(e),
        _ = i.get(t);
      if (d && _) return d == t && _ == e;
      var E = -1,
        y = !0,
        T = r & WR ? new FR() : void 0;
      for (i.set(e, t), i.set(t, e); ++E < a; ) {
        var R = e[E],
          A = t[E];
        if (n) var G = s ? n(A, R, E, t, e, i) : n(R, A, E, e, t, i);
        if (G !== void 0) {
          if (G) continue;
          y = !1;
          break;
        }
        if (T) {
          if (
            !GR(t, function (N, q) {
              if (!XR(T, q) && (R === N || o(R, N, r, n, i))) return T.push(q);
            })
          ) {
            y = !1;
            break;
          }
        } else if (!(R === A || o(R, A, r, n, i))) {
          y = !1;
          break;
        }
      }
      return i.delete(e), i.delete(t), y;
    }
    pp.exports = VR;
  });
  var hp = u((EH, vp) => {
    var BR = nt(),
      kR = BR.Uint8Array;
    vp.exports = kR;
  });
  var Ep = u((_H, gp) => {
    function HR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, o) {
          r[++t] = [o, n];
        }),
        r
      );
    }
    gp.exports = HR;
  });
  var yp = u((yH, _p) => {
    function jR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    _p.exports = jR;
  });
  var bp = u((mH, Op) => {
    var mp = tr(),
      Tp = hp(),
      KR = Vn(),
      zR = fa(),
      YR = Ep(),
      QR = yp(),
      $R = 1,
      ZR = 2,
      JR = "[object Boolean]",
      eC = "[object Date]",
      tC = "[object Error]",
      rC = "[object Map]",
      nC = "[object Number]",
      iC = "[object RegExp]",
      oC = "[object Set]",
      aC = "[object String]",
      sC = "[object Symbol]",
      uC = "[object ArrayBuffer]",
      cC = "[object DataView]",
      Ip = mp ? mp.prototype : void 0,
      da = Ip ? Ip.valueOf : void 0;
    function lC(e, t, r, n, o, i, s) {
      switch (r) {
        case cC:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case uC:
          return !(e.byteLength != t.byteLength || !i(new Tp(e), new Tp(t)));
        case JR:
        case eC:
        case nC:
          return KR(+e, +t);
        case tC:
          return e.name == t.name && e.message == t.message;
        case iC:
        case aC:
          return e == t + "";
        case rC:
          var a = YR;
        case oC:
          var c = n & $R;
          if ((a || (a = QR), e.size != t.size && !c)) return !1;
          var d = s.get(e);
          if (d) return d == t;
          (n |= ZR), s.set(e, t);
          var _ = zR(a(e), a(t), n, o, i, s);
          return s.delete(e), _;
        case sC:
          if (da) return da.call(e) == da.call(t);
      }
      return !1;
    }
    Op.exports = lC;
  });
  var jn = u((TH, Sp) => {
    function fC(e, t) {
      for (var r = -1, n = t.length, o = e.length; ++r < n; ) e[o + r] = t[r];
      return e;
    }
    Sp.exports = fC;
  });
  var qe = u((IH, Ap) => {
    var dC = Array.isArray;
    Ap.exports = dC;
  });
  var pa = u((OH, wp) => {
    var pC = jn(),
      vC = qe();
    function hC(e, t, r) {
      var n = t(e);
      return vC(e) ? n : pC(n, r(e));
    }
    wp.exports = hC;
  });
  var Cp = u((bH, Rp) => {
    function gC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
        var s = e[r];
        t(s, r, e) && (i[o++] = s);
      }
      return i;
    }
    Rp.exports = gC;
  });
  var va = u((SH, Np) => {
    function EC() {
      return [];
    }
    Np.exports = EC;
  });
  var ha = u((AH, qp) => {
    var _C = Cp(),
      yC = va(),
      mC = Object.prototype,
      TC = mC.propertyIsEnumerable,
      xp = Object.getOwnPropertySymbols,
      IC = xp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                _C(xp(e), function (t) {
                  return TC.call(e, t);
                }));
          }
        : yC;
    qp.exports = IC;
  });
  var Pp = u((wH, Lp) => {
    function OC(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Lp.exports = OC;
  });
  var Mp = u((RH, Dp) => {
    var bC = wt(),
      SC = mt(),
      AC = "[object Arguments]";
    function wC(e) {
      return SC(e) && bC(e) == AC;
    }
    Dp.exports = wC;
  });
  var Br = u((CH, Xp) => {
    var Fp = Mp(),
      RC = mt(),
      Gp = Object.prototype,
      CC = Gp.hasOwnProperty,
      NC = Gp.propertyIsEnumerable,
      xC = Fp(
        (function () {
          return arguments;
        })()
      )
        ? Fp
        : function (e) {
            return RC(e) && CC.call(e, "callee") && !NC.call(e, "callee");
          };
    Xp.exports = xC;
  });
  var Wp = u((NH, Up) => {
    function qC() {
      return !1;
    }
    Up.exports = qC;
  });
  var Kn = u((kr, lr) => {
    var LC = nt(),
      PC = Wp(),
      kp = typeof kr == "object" && kr && !kr.nodeType && kr,
      Vp = kp && typeof lr == "object" && lr && !lr.nodeType && lr,
      DC = Vp && Vp.exports === kp,
      Bp = DC ? LC.Buffer : void 0,
      MC = Bp ? Bp.isBuffer : void 0,
      FC = MC || PC;
    lr.exports = FC;
  });
  var zn = u((xH, Hp) => {
    var GC = 9007199254740991,
      XC = /^(?:0|[1-9]\d*)$/;
    function UC(e, t) {
      var r = typeof e;
      return (
        (t = t ?? GC),
        !!t &&
          (r == "number" || (r != "symbol" && XC.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Hp.exports = UC;
  });
  var Yn = u((qH, jp) => {
    var WC = 9007199254740991;
    function VC(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= WC;
    }
    jp.exports = VC;
  });
  var zp = u((LH, Kp) => {
    var BC = wt(),
      kC = Yn(),
      HC = mt(),
      jC = "[object Arguments]",
      KC = "[object Array]",
      zC = "[object Boolean]",
      YC = "[object Date]",
      QC = "[object Error]",
      $C = "[object Function]",
      ZC = "[object Map]",
      JC = "[object Number]",
      eN = "[object Object]",
      tN = "[object RegExp]",
      rN = "[object Set]",
      nN = "[object String]",
      iN = "[object WeakMap]",
      oN = "[object ArrayBuffer]",
      aN = "[object DataView]",
      sN = "[object Float32Array]",
      uN = "[object Float64Array]",
      cN = "[object Int8Array]",
      lN = "[object Int16Array]",
      fN = "[object Int32Array]",
      dN = "[object Uint8Array]",
      pN = "[object Uint8ClampedArray]",
      vN = "[object Uint16Array]",
      hN = "[object Uint32Array]",
      Te = {};
    Te[sN] =
      Te[uN] =
      Te[cN] =
      Te[lN] =
      Te[fN] =
      Te[dN] =
      Te[pN] =
      Te[vN] =
      Te[hN] =
        !0;
    Te[jC] =
      Te[KC] =
      Te[oN] =
      Te[zC] =
      Te[aN] =
      Te[YC] =
      Te[QC] =
      Te[$C] =
      Te[ZC] =
      Te[JC] =
      Te[eN] =
      Te[tN] =
      Te[rN] =
      Te[nN] =
      Te[iN] =
        !1;
    function gN(e) {
      return HC(e) && kC(e.length) && !!Te[BC(e)];
    }
    Kp.exports = gN;
  });
  var Qp = u((PH, Yp) => {
    function EN(e) {
      return function (t) {
        return e(t);
      };
    }
    Yp.exports = EN;
  });
  var Zp = u((Hr, fr) => {
    var _N = Go(),
      $p = typeof Hr == "object" && Hr && !Hr.nodeType && Hr,
      jr = $p && typeof fr == "object" && fr && !fr.nodeType && fr,
      yN = jr && jr.exports === $p,
      ga = yN && _N.process,
      mN = (function () {
        try {
          var e = jr && jr.require && jr.require("util").types;
          return e || (ga && ga.binding && ga.binding("util"));
        } catch {}
      })();
    fr.exports = mN;
  });
  var Qn = u((DH, tv) => {
    var TN = zp(),
      IN = Qp(),
      Jp = Zp(),
      ev = Jp && Jp.isTypedArray,
      ON = ev ? IN(ev) : TN;
    tv.exports = ON;
  });
  var Ea = u((MH, rv) => {
    var bN = Pp(),
      SN = Br(),
      AN = qe(),
      wN = Kn(),
      RN = zn(),
      CN = Qn(),
      NN = Object.prototype,
      xN = NN.hasOwnProperty;
    function qN(e, t) {
      var r = AN(e),
        n = !r && SN(e),
        o = !r && !n && wN(e),
        i = !r && !n && !o && CN(e),
        s = r || n || o || i,
        a = s ? bN(e.length, String) : [],
        c = a.length;
      for (var d in e)
        (t || xN.call(e, d)) &&
          !(
            s &&
            (d == "length" ||
              (o && (d == "offset" || d == "parent")) ||
              (i &&
                (d == "buffer" || d == "byteLength" || d == "byteOffset")) ||
              RN(d, c))
          ) &&
          a.push(d);
      return a;
    }
    rv.exports = qN;
  });
  var $n = u((FH, nv) => {
    var LN = Object.prototype;
    function PN(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || LN;
      return e === r;
    }
    nv.exports = PN;
  });
  var ov = u((GH, iv) => {
    var DN = Xo(),
      MN = DN(Object.keys, Object);
    iv.exports = MN;
  });
  var Zn = u((XH, av) => {
    var FN = $n(),
      GN = ov(),
      XN = Object.prototype,
      UN = XN.hasOwnProperty;
    function WN(e) {
      if (!FN(e)) return GN(e);
      var t = [];
      for (var r in Object(e)) UN.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    av.exports = WN;
  });
  var Ut = u((UH, sv) => {
    var VN = sa(),
      BN = Yn();
    function kN(e) {
      return e != null && BN(e.length) && !VN(e);
    }
    sv.exports = kN;
  });
  var Kr = u((WH, uv) => {
    var HN = Ea(),
      jN = Zn(),
      KN = Ut();
    function zN(e) {
      return KN(e) ? HN(e) : jN(e);
    }
    uv.exports = zN;
  });
  var lv = u((VH, cv) => {
    var YN = pa(),
      QN = ha(),
      $N = Kr();
    function ZN(e) {
      return YN(e, $N, QN);
    }
    cv.exports = ZN;
  });
  var pv = u((BH, dv) => {
    var fv = lv(),
      JN = 1,
      ex = Object.prototype,
      tx = ex.hasOwnProperty;
    function rx(e, t, r, n, o, i) {
      var s = r & JN,
        a = fv(e),
        c = a.length,
        d = fv(t),
        _ = d.length;
      if (c != _ && !s) return !1;
      for (var E = c; E--; ) {
        var y = a[E];
        if (!(s ? y in t : tx.call(t, y))) return !1;
      }
      var T = i.get(e),
        R = i.get(t);
      if (T && R) return T == t && R == e;
      var A = !0;
      i.set(e, t), i.set(t, e);
      for (var G = s; ++E < c; ) {
        y = a[E];
        var N = e[y],
          q = t[y];
        if (n) var w = s ? n(q, N, y, t, e, i) : n(N, q, y, e, t, i);
        if (!(w === void 0 ? N === q || o(N, q, r, n, i) : w)) {
          A = !1;
          break;
        }
        G || (G = y == "constructor");
      }
      if (A && !G) {
        var D = e.constructor,
          L = t.constructor;
        D != L &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof D == "function" &&
            D instanceof D &&
            typeof L == "function" &&
            L instanceof L
          ) &&
          (A = !1);
      }
      return i.delete(e), i.delete(t), A;
    }
    dv.exports = rx;
  });
  var hv = u((kH, vv) => {
    var nx = Rt(),
      ix = nt(),
      ox = nx(ix, "DataView");
    vv.exports = ox;
  });
  var Ev = u((HH, gv) => {
    var ax = Rt(),
      sx = nt(),
      ux = ax(sx, "Promise");
    gv.exports = ux;
  });
  var yv = u((jH, _v) => {
    var cx = Rt(),
      lx = nt(),
      fx = cx(lx, "Set");
    _v.exports = fx;
  });
  var _a = u((KH, mv) => {
    var dx = Rt(),
      px = nt(),
      vx = dx(px, "WeakMap");
    mv.exports = vx;
  });
  var Jn = u((zH, wv) => {
    var ya = hv(),
      ma = Bn(),
      Ta = Ev(),
      Ia = yv(),
      Oa = _a(),
      Av = wt(),
      dr = ca(),
      Tv = "[object Map]",
      hx = "[object Object]",
      Iv = "[object Promise]",
      Ov = "[object Set]",
      bv = "[object WeakMap]",
      Sv = "[object DataView]",
      gx = dr(ya),
      Ex = dr(ma),
      _x = dr(Ta),
      yx = dr(Ia),
      mx = dr(Oa),
      Wt = Av;
    ((ya && Wt(new ya(new ArrayBuffer(1))) != Sv) ||
      (ma && Wt(new ma()) != Tv) ||
      (Ta && Wt(Ta.resolve()) != Iv) ||
      (Ia && Wt(new Ia()) != Ov) ||
      (Oa && Wt(new Oa()) != bv)) &&
      (Wt = function (e) {
        var t = Av(e),
          r = t == hx ? e.constructor : void 0,
          n = r ? dr(r) : "";
        if (n)
          switch (n) {
            case gx:
              return Sv;
            case Ex:
              return Tv;
            case _x:
              return Iv;
            case yx:
              return Ov;
            case mx:
              return bv;
          }
        return t;
      });
    wv.exports = Wt;
  });
  var Dv = u((YH, Pv) => {
    var ba = la(),
      Tx = fa(),
      Ix = bp(),
      Ox = pv(),
      Rv = Jn(),
      Cv = qe(),
      Nv = Kn(),
      bx = Qn(),
      Sx = 1,
      xv = "[object Arguments]",
      qv = "[object Array]",
      ei = "[object Object]",
      Ax = Object.prototype,
      Lv = Ax.hasOwnProperty;
    function wx(e, t, r, n, o, i) {
      var s = Cv(e),
        a = Cv(t),
        c = s ? qv : Rv(e),
        d = a ? qv : Rv(t);
      (c = c == xv ? ei : c), (d = d == xv ? ei : d);
      var _ = c == ei,
        E = d == ei,
        y = c == d;
      if (y && Nv(e)) {
        if (!Nv(t)) return !1;
        (s = !0), (_ = !1);
      }
      if (y && !_)
        return (
          i || (i = new ba()),
          s || bx(e) ? Tx(e, t, r, n, o, i) : Ix(e, t, c, r, n, o, i)
        );
      if (!(r & Sx)) {
        var T = _ && Lv.call(e, "__wrapped__"),
          R = E && Lv.call(t, "__wrapped__");
        if (T || R) {
          var A = T ? e.value() : e,
            G = R ? t.value() : t;
          return i || (i = new ba()), o(A, G, r, n, i);
        }
      }
      return y ? (i || (i = new ba()), Ox(e, t, r, n, o, i)) : !1;
    }
    Pv.exports = wx;
  });
  var Sa = u((QH, Gv) => {
    var Rx = Dv(),
      Mv = mt();
    function Fv(e, t, r, n, o) {
      return e === t
        ? !0
        : e == null || t == null || (!Mv(e) && !Mv(t))
        ? e !== e && t !== t
        : Rx(e, t, r, n, Fv, o);
    }
    Gv.exports = Fv;
  });
  var Uv = u(($H, Xv) => {
    var Cx = la(),
      Nx = Sa(),
      xx = 1,
      qx = 2;
    function Lx(e, t, r, n) {
      var o = r.length,
        i = o,
        s = !n;
      if (e == null) return !i;
      for (e = Object(e); o--; ) {
        var a = r[o];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++o < i; ) {
        a = r[o];
        var c = a[0],
          d = e[c],
          _ = a[1];
        if (s && a[2]) {
          if (d === void 0 && !(c in e)) return !1;
        } else {
          var E = new Cx();
          if (n) var y = n(d, _, c, e, t, E);
          if (!(y === void 0 ? Nx(_, d, xx | qx, n, E) : y)) return !1;
        }
      }
      return !0;
    }
    Xv.exports = Lx;
  });
  var Aa = u((ZH, Wv) => {
    var Px = pt();
    function Dx(e) {
      return e === e && !Px(e);
    }
    Wv.exports = Dx;
  });
  var Bv = u((JH, Vv) => {
    var Mx = Aa(),
      Fx = Kr();
    function Gx(e) {
      for (var t = Fx(e), r = t.length; r--; ) {
        var n = t[r],
          o = e[n];
        t[r] = [n, o, Mx(o)];
      }
      return t;
    }
    Vv.exports = Gx;
  });
  var wa = u((e5, kv) => {
    function Xx(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    kv.exports = Xx;
  });
  var jv = u((t5, Hv) => {
    var Ux = Uv(),
      Wx = Bv(),
      Vx = wa();
    function Bx(e) {
      var t = Wx(e);
      return t.length == 1 && t[0][2]
        ? Vx(t[0][0], t[0][1])
        : function (r) {
            return r === e || Ux(r, e, t);
          };
    }
    Hv.exports = Bx;
  });
  var zr = u((r5, Kv) => {
    var kx = wt(),
      Hx = mt(),
      jx = "[object Symbol]";
    function Kx(e) {
      return typeof e == "symbol" || (Hx(e) && kx(e) == jx);
    }
    Kv.exports = Kx;
  });
  var ti = u((n5, zv) => {
    var zx = qe(),
      Yx = zr(),
      Qx = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      $x = /^\w*$/;
    function Zx(e, t) {
      if (zx(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        Yx(e)
        ? !0
        : $x.test(e) || !Qx.test(e) || (t != null && e in Object(t));
    }
    zv.exports = Zx;
  });
  var $v = u((i5, Qv) => {
    var Yv = kn(),
      Jx = "Expected a function";
    function Ra(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(Jx);
      var r = function () {
        var n = arguments,
          o = t ? t.apply(this, n) : n[0],
          i = r.cache;
        if (i.has(o)) return i.get(o);
        var s = e.apply(this, n);
        return (r.cache = i.set(o, s) || i), s;
      };
      return (r.cache = new (Ra.Cache || Yv)()), r;
    }
    Ra.Cache = Yv;
    Qv.exports = Ra;
  });
  var Jv = u((o5, Zv) => {
    var eq = $v(),
      tq = 500;
    function rq(e) {
      var t = eq(e, function (n) {
          return r.size === tq && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    Zv.exports = rq;
  });
  var th = u((a5, eh) => {
    var nq = Jv(),
      iq =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      oq = /\\(\\)?/g,
      aq = nq(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(iq, function (r, n, o, i) {
            t.push(o ? i.replace(oq, "$1") : n || r);
          }),
          t
        );
      });
    eh.exports = aq;
  });
  var Ca = u((s5, rh) => {
    function sq(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
        o[r] = t(e[r], r, e);
      return o;
    }
    rh.exports = sq;
  });
  var uh = u((u5, sh) => {
    var nh = tr(),
      uq = Ca(),
      cq = qe(),
      lq = zr(),
      fq = 1 / 0,
      ih = nh ? nh.prototype : void 0,
      oh = ih ? ih.toString : void 0;
    function ah(e) {
      if (typeof e == "string") return e;
      if (cq(e)) return uq(e, ah) + "";
      if (lq(e)) return oh ? oh.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -fq ? "-0" : t;
    }
    sh.exports = ah;
  });
  var lh = u((c5, ch) => {
    var dq = uh();
    function pq(e) {
      return e == null ? "" : dq(e);
    }
    ch.exports = pq;
  });
  var Yr = u((l5, fh) => {
    var vq = qe(),
      hq = ti(),
      gq = th(),
      Eq = lh();
    function _q(e, t) {
      return vq(e) ? e : hq(e, t) ? [e] : gq(Eq(e));
    }
    fh.exports = _q;
  });
  var pr = u((f5, dh) => {
    var yq = zr(),
      mq = 1 / 0;
    function Tq(e) {
      if (typeof e == "string" || yq(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -mq ? "-0" : t;
    }
    dh.exports = Tq;
  });
  var ri = u((d5, ph) => {
    var Iq = Yr(),
      Oq = pr();
    function bq(e, t) {
      t = Iq(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[Oq(t[r++])];
      return r && r == n ? e : void 0;
    }
    ph.exports = bq;
  });
  var ni = u((p5, vh) => {
    var Sq = ri();
    function Aq(e, t, r) {
      var n = e == null ? void 0 : Sq(e, t);
      return n === void 0 ? r : n;
    }
    vh.exports = Aq;
  });
  var gh = u((v5, hh) => {
    function wq(e, t) {
      return e != null && t in Object(e);
    }
    hh.exports = wq;
  });
  var _h = u((h5, Eh) => {
    var Rq = Yr(),
      Cq = Br(),
      Nq = qe(),
      xq = zn(),
      qq = Yn(),
      Lq = pr();
    function Pq(e, t, r) {
      t = Rq(t, e);
      for (var n = -1, o = t.length, i = !1; ++n < o; ) {
        var s = Lq(t[n]);
        if (!(i = e != null && r(e, s))) break;
        e = e[s];
      }
      return i || ++n != o
        ? i
        : ((o = e == null ? 0 : e.length),
          !!o && qq(o) && xq(s, o) && (Nq(e) || Cq(e)));
    }
    Eh.exports = Pq;
  });
  var mh = u((g5, yh) => {
    var Dq = gh(),
      Mq = _h();
    function Fq(e, t) {
      return e != null && Mq(e, t, Dq);
    }
    yh.exports = Fq;
  });
  var Ih = u((E5, Th) => {
    var Gq = Sa(),
      Xq = ni(),
      Uq = mh(),
      Wq = ti(),
      Vq = Aa(),
      Bq = wa(),
      kq = pr(),
      Hq = 1,
      jq = 2;
    function Kq(e, t) {
      return Wq(e) && Vq(t)
        ? Bq(kq(e), t)
        : function (r) {
            var n = Xq(r, e);
            return n === void 0 && n === t ? Uq(r, e) : Gq(t, n, Hq | jq);
          };
    }
    Th.exports = Kq;
  });
  var ii = u((_5, Oh) => {
    function zq(e) {
      return e;
    }
    Oh.exports = zq;
  });
  var Na = u((y5, bh) => {
    function Yq(e) {
      return function (t) {
        return t?.[e];
      };
    }
    bh.exports = Yq;
  });
  var Ah = u((m5, Sh) => {
    var Qq = ri();
    function $q(e) {
      return function (t) {
        return Qq(t, e);
      };
    }
    Sh.exports = $q;
  });
  var Rh = u((T5, wh) => {
    var Zq = Na(),
      Jq = Ah(),
      eL = ti(),
      tL = pr();
    function rL(e) {
      return eL(e) ? Zq(tL(e)) : Jq(e);
    }
    wh.exports = rL;
  });
  var Ct = u((I5, Ch) => {
    var nL = jv(),
      iL = Ih(),
      oL = ii(),
      aL = qe(),
      sL = Rh();
    function uL(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? oL
        : typeof e == "object"
        ? aL(e)
          ? iL(e[0], e[1])
          : nL(e)
        : sL(e);
    }
    Ch.exports = uL;
  });
  var xa = u((O5, Nh) => {
    var cL = Ct(),
      lL = Ut(),
      fL = Kr();
    function dL(e) {
      return function (t, r, n) {
        var o = Object(t);
        if (!lL(t)) {
          var i = cL(r, 3);
          (t = fL(t)),
            (r = function (a) {
              return i(o[a], a, o);
            });
        }
        var s = e(t, r, n);
        return s > -1 ? o[i ? t[s] : s] : void 0;
      };
    }
    Nh.exports = dL;
  });
  var qa = u((b5, xh) => {
    function pL(e, t, r, n) {
      for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
        if (t(e[i], i, e)) return i;
      return -1;
    }
    xh.exports = pL;
  });
  var Lh = u((S5, qh) => {
    var vL = /\s/;
    function hL(e) {
      for (var t = e.length; t-- && vL.test(e.charAt(t)); );
      return t;
    }
    qh.exports = hL;
  });
  var Dh = u((A5, Ph) => {
    var gL = Lh(),
      EL = /^\s+/;
    function _L(e) {
      return e && e.slice(0, gL(e) + 1).replace(EL, "");
    }
    Ph.exports = _L;
  });
  var oi = u((w5, Gh) => {
    var yL = Dh(),
      Mh = pt(),
      mL = zr(),
      Fh = 0 / 0,
      TL = /^[-+]0x[0-9a-f]+$/i,
      IL = /^0b[01]+$/i,
      OL = /^0o[0-7]+$/i,
      bL = parseInt;
    function SL(e) {
      if (typeof e == "number") return e;
      if (mL(e)) return Fh;
      if (Mh(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Mh(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = yL(e);
      var r = IL.test(e);
      return r || OL.test(e) ? bL(e.slice(2), r ? 2 : 8) : TL.test(e) ? Fh : +e;
    }
    Gh.exports = SL;
  });
  var Wh = u((R5, Uh) => {
    var AL = oi(),
      Xh = 1 / 0,
      wL = 17976931348623157e292;
    function RL(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = AL(e)), e === Xh || e === -Xh)) {
        var t = e < 0 ? -1 : 1;
        return t * wL;
      }
      return e === e ? e : 0;
    }
    Uh.exports = RL;
  });
  var La = u((C5, Vh) => {
    var CL = Wh();
    function NL(e) {
      var t = CL(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    Vh.exports = NL;
  });
  var kh = u((N5, Bh) => {
    var xL = qa(),
      qL = Ct(),
      LL = La(),
      PL = Math.max;
    function DL(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var o = r == null ? 0 : LL(r);
      return o < 0 && (o = PL(n + o, 0)), xL(e, qL(t, 3), o);
    }
    Bh.exports = DL;
  });
  var Pa = u((x5, Hh) => {
    var ML = xa(),
      FL = kh(),
      GL = ML(FL);
    Hh.exports = GL;
  });
  var si = u((Ge) => {
    "use strict";
    var XL = lt().default;
    Object.defineProperty(Ge, "__esModule", { value: !0 });
    Ge.withBrowser =
      Ge.TRANSFORM_STYLE_PREFIXED =
      Ge.TRANSFORM_PREFIXED =
      Ge.IS_BROWSER_ENV =
      Ge.FLEX_PREFIXED =
      Ge.ELEMENT_MATCHES =
        void 0;
    var UL = XL(Pa()),
      Kh = typeof window < "u";
    Ge.IS_BROWSER_ENV = Kh;
    var ai = (e, t) => (Kh ? e() : t);
    Ge.withBrowser = ai;
    var WL = ai(() =>
      (0, UL.default)(
        [
          "matches",
          "matchesSelector",
          "mozMatchesSelector",
          "msMatchesSelector",
          "oMatchesSelector",
          "webkitMatchesSelector",
        ],
        (e) => e in Element.prototype
      )
    );
    Ge.ELEMENT_MATCHES = WL;
    var VL = ai(() => {
      let e = document.createElement("i"),
        t = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"],
        r = "";
      try {
        let { length: n } = t;
        for (let o = 0; o < n; o++) {
          let i = t[o];
          if (((e.style.display = i), e.style.display === i)) return i;
        }
        return r;
      } catch {
        return r;
      }
    }, "flex");
    Ge.FLEX_PREFIXED = VL;
    var zh = ai(() => {
      let e = document.createElement("i");
      if (e.style.transform == null) {
        let t = ["Webkit", "Moz", "ms"],
          r = "Transform",
          { length: n } = t;
        for (let o = 0; o < n; o++) {
          let i = t[o] + r;
          if (e.style[i] !== void 0) return i;
        }
      }
      return "transform";
    }, "transform");
    Ge.TRANSFORM_PREFIXED = zh;
    var jh = zh.split("transform")[0],
      BL = jh ? jh + "TransformStyle" : "transformStyle";
    Ge.TRANSFORM_STYLE_PREFIXED = BL;
  });
  var Da = u((L5, Jh) => {
    var kL = 4,
      HL = 0.001,
      jL = 1e-7,
      KL = 10,
      Qr = 11,
      ui = 1 / (Qr - 1),
      zL = typeof Float32Array == "function";
    function Yh(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function Qh(e, t) {
      return 3 * t - 6 * e;
    }
    function $h(e) {
      return 3 * e;
    }
    function ci(e, t, r) {
      return ((Yh(t, r) * e + Qh(t, r)) * e + $h(t)) * e;
    }
    function Zh(e, t, r) {
      return 3 * Yh(t, r) * e * e + 2 * Qh(t, r) * e + $h(t);
    }
    function YL(e, t, r, n, o) {
      var i,
        s,
        a = 0;
      do
        (s = t + (r - t) / 2), (i = ci(s, n, o) - e), i > 0 ? (r = s) : (t = s);
      while (Math.abs(i) > jL && ++a < KL);
      return s;
    }
    function QL(e, t, r, n) {
      for (var o = 0; o < kL; ++o) {
        var i = Zh(t, r, n);
        if (i === 0) return t;
        var s = ci(t, r, n) - e;
        t -= s / i;
      }
      return t;
    }
    Jh.exports = function (t, r, n, o) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var i = zL ? new Float32Array(Qr) : new Array(Qr);
      if (t !== r || n !== o)
        for (var s = 0; s < Qr; ++s) i[s] = ci(s * ui, t, n);
      function a(c) {
        for (var d = 0, _ = 1, E = Qr - 1; _ !== E && i[_] <= c; ++_) d += ui;
        --_;
        var y = (c - i[_]) / (i[_ + 1] - i[_]),
          T = d + y * ui,
          R = Zh(T, t, n);
        return R >= HL ? QL(c, T, t, n) : R === 0 ? T : YL(c, d, d + ui, t, n);
      }
      return function (d) {
        return t === r && n === o
          ? d
          : d === 0
          ? 0
          : d === 1
          ? 1
          : ci(a(d), r, o);
      };
    };
  });
  var Ma = u((ce) => {
    "use strict";
    var $L = lt().default;
    Object.defineProperty(ce, "__esModule", { value: !0 });
    ce.bounce = LP;
    ce.bouncePast = PP;
    ce.easeOut = ce.easeInOut = ce.easeIn = ce.ease = void 0;
    ce.inBack = bP;
    ce.inCirc = mP;
    ce.inCubic = oP;
    ce.inElastic = wP;
    ce.inExpo = EP;
    ce.inOutBack = AP;
    ce.inOutCirc = IP;
    ce.inOutCubic = sP;
    ce.inOutElastic = CP;
    ce.inOutExpo = yP;
    ce.inOutQuad = iP;
    ce.inOutQuart = lP;
    ce.inOutQuint = pP;
    ce.inOutSine = gP;
    ce.inQuad = rP;
    ce.inQuart = uP;
    ce.inQuint = fP;
    ce.inSine = vP;
    ce.outBack = SP;
    ce.outBounce = OP;
    ce.outCirc = TP;
    ce.outCubic = aP;
    ce.outElastic = RP;
    ce.outExpo = _P;
    ce.outQuad = nP;
    ce.outQuart = cP;
    ce.outQuint = dP;
    ce.outSine = hP;
    ce.swingFrom = xP;
    ce.swingFromTo = NP;
    ce.swingTo = qP;
    var li = $L(Da()),
      It = 1.70158,
      ZL = (0, li.default)(0.25, 0.1, 0.25, 1);
    ce.ease = ZL;
    var JL = (0, li.default)(0.42, 0, 1, 1);
    ce.easeIn = JL;
    var eP = (0, li.default)(0, 0, 0.58, 1);
    ce.easeOut = eP;
    var tP = (0, li.default)(0.42, 0, 0.58, 1);
    ce.easeInOut = tP;
    function rP(e) {
      return Math.pow(e, 2);
    }
    function nP(e) {
      return -(Math.pow(e - 1, 2) - 1);
    }
    function iP(e) {
      return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
    }
    function oP(e) {
      return Math.pow(e, 3);
    }
    function aP(e) {
      return Math.pow(e - 1, 3) + 1;
    }
    function sP(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 3)
        : 0.5 * (Math.pow(e - 2, 3) + 2);
    }
    function uP(e) {
      return Math.pow(e, 4);
    }
    function cP(e) {
      return -(Math.pow(e - 1, 4) - 1);
    }
    function lP(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 4)
        : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
    }
    function fP(e) {
      return Math.pow(e, 5);
    }
    function dP(e) {
      return Math.pow(e - 1, 5) + 1;
    }
    function pP(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 5)
        : 0.5 * (Math.pow(e - 2, 5) + 2);
    }
    function vP(e) {
      return -Math.cos(e * (Math.PI / 2)) + 1;
    }
    function hP(e) {
      return Math.sin(e * (Math.PI / 2));
    }
    function gP(e) {
      return -0.5 * (Math.cos(Math.PI * e) - 1);
    }
    function EP(e) {
      return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
    }
    function _P(e) {
      return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
    }
    function yP(e) {
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (e /= 0.5) < 1
        ? 0.5 * Math.pow(2, 10 * (e - 1))
        : 0.5 * (-Math.pow(2, -10 * --e) + 2);
    }
    function mP(e) {
      return -(Math.sqrt(1 - e * e) - 1);
    }
    function TP(e) {
      return Math.sqrt(1 - Math.pow(e - 1, 2));
    }
    function IP(e) {
      return (e /= 0.5) < 1
        ? -0.5 * (Math.sqrt(1 - e * e) - 1)
        : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
    function OP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function bP(e) {
      let t = It;
      return e * e * ((t + 1) * e - t);
    }
    function SP(e) {
      let t = It;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function AP(e) {
      let t = It;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function wP(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          -(
            n *
            Math.pow(2, 10 * (e -= 1)) *
            Math.sin(((e - t) * (2 * Math.PI)) / r)
          ));
    }
    function RP(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) +
            1);
    }
    function CP(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : (e /= 1 / 2) === 2
        ? 1
        : (r || (r = 0.3 * 1.5),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          e < 1
            ? -0.5 *
              (n *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r))
            : n *
                Math.pow(2, -10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r) *
                0.5 +
              1);
    }
    function NP(e) {
      let t = It;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function xP(e) {
      let t = It;
      return e * e * ((t + 1) * e - t);
    }
    function qP(e) {
      let t = It;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function LP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function PP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
        : e < 2.5 / 2.75
        ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
        : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
    }
  });
  var Ga = u(($r) => {
    "use strict";
    var DP = lt().default,
      MP = $t().default;
    Object.defineProperty($r, "__esModule", { value: !0 });
    $r.applyEasing = XP;
    $r.createBezierEasing = GP;
    $r.optimizeFloat = Fa;
    var eg = MP(Ma()),
      FP = DP(Da());
    function Fa(e, t = 5, r = 10) {
      let n = Math.pow(r, t),
        o = Number(Math.round(e * n) / n);
      return Math.abs(o) > 1e-4 ? o : 0;
    }
    function GP(e) {
      return (0, FP.default)(...e);
    }
    function XP(e, t, r) {
      return t === 0
        ? 0
        : t === 1
        ? 1
        : Fa(r ? (t > 0 ? r(t) : t) : t > 0 && e && eg[e] ? eg[e](t) : t);
    }
  });
  var ig = u((vr) => {
    "use strict";
    Object.defineProperty(vr, "__esModule", { value: !0 });
    vr.createElementState = ng;
    vr.ixElements = void 0;
    vr.mergeActionState = Xa;
    var fi = or(),
      rg = ke(),
      {
        HTML_ELEMENT: M5,
        PLAIN_OBJECT: UP,
        ABSTRACT_NODE: F5,
        CONFIG_X_VALUE: WP,
        CONFIG_Y_VALUE: VP,
        CONFIG_Z_VALUE: BP,
        CONFIG_VALUE: kP,
        CONFIG_X_UNIT: HP,
        CONFIG_Y_UNIT: jP,
        CONFIG_Z_UNIT: KP,
        CONFIG_UNIT: zP,
      } = rg.IX2EngineConstants,
      {
        IX2_SESSION_STOPPED: YP,
        IX2_INSTANCE_ADDED: QP,
        IX2_ELEMENT_STATE_CHANGED: $P,
      } = rg.IX2EngineActionTypes,
      tg = {},
      ZP = "refState",
      JP = (e = tg, t = {}) => {
        switch (t.type) {
          case YP:
            return tg;
          case QP: {
            let {
                elementId: r,
                element: n,
                origin: o,
                actionItem: i,
                refType: s,
              } = t.payload,
              { actionTypeId: a } = i,
              c = e;
            return (
              (0, fi.getIn)(c, [r, n]) !== n && (c = ng(c, n, s, r, i)),
              Xa(c, r, a, o, i)
            );
          }
          case $P: {
            let {
              elementId: r,
              actionTypeId: n,
              current: o,
              actionItem: i,
            } = t.payload;
            return Xa(e, r, n, o, i);
          }
          default:
            return e;
        }
      };
    vr.ixElements = JP;
    function ng(e, t, r, n, o) {
      let i =
        r === UP ? (0, fi.getIn)(o, ["config", "target", "objectId"]) : null;
      return (0, fi.mergeIn)(e, [n], { id: n, ref: t, refId: i, refType: r });
    }
    function Xa(e, t, r, n, o) {
      let i = tD(o),
        s = [t, ZP, r];
      return (0, fi.mergeIn)(e, s, n, i);
    }
    var eD = [
      [WP, HP],
      [VP, jP],
      [BP, KP],
      [kP, zP],
    ];
    function tD(e) {
      let { config: t } = e;
      return eD.reduce((r, n) => {
        let o = n[0],
          i = n[1],
          s = t[o],
          a = t[i];
        return s != null && a != null && (r[i] = a), r;
      }, {});
    }
  });
  var og = u((Le) => {
    "use strict";
    Object.defineProperty(Le, "__esModule", { value: !0 });
    Le.renderPlugin =
      Le.getPluginOrigin =
      Le.getPluginDuration =
      Le.getPluginDestination =
      Le.getPluginConfig =
      Le.createPluginInstance =
      Le.clearPlugin =
        void 0;
    var rD = (e) => e.value;
    Le.getPluginConfig = rD;
    var nD = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    Le.getPluginDuration = nD;
    var iD = (e) => e || { value: 0 };
    Le.getPluginOrigin = iD;
    var oD = (e) => ({ value: e.value });
    Le.getPluginDestination = oD;
    var aD = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    Le.createPluginInstance = aD;
    var sD = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    Le.renderPlugin = sD;
    var uD = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    Le.clearPlugin = uD;
  });
  var Ua = u((Ne) => {
    "use strict";
    Object.defineProperty(Ne, "__esModule", { value: !0 });
    Ne.getPluginOrigin =
      Ne.getPluginDuration =
      Ne.getPluginDestination =
      Ne.getPluginConfig =
      Ne.createPluginInstance =
      Ne.clearPlugin =
        void 0;
    Ne.isPluginType = fD;
    Ne.renderPlugin = void 0;
    var Vt = og(),
      ag = ke(),
      cD = si(),
      lD = {
        [ag.ActionTypeConsts.PLUGIN_LOTTIE]: {
          getConfig: Vt.getPluginConfig,
          getOrigin: Vt.getPluginOrigin,
          getDuration: Vt.getPluginDuration,
          getDestination: Vt.getPluginDestination,
          createInstance: Vt.createPluginInstance,
          render: Vt.renderPlugin,
          clear: Vt.clearPlugin,
        },
      };
    function fD(e) {
      return e === ag.ActionTypeConsts.PLUGIN_LOTTIE;
    }
    var Bt = (e) => (t) => {
        if (!cD.IS_BROWSER_ENV) return () => null;
        let r = lD[t];
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      },
      dD = Bt("getConfig");
    Ne.getPluginConfig = dD;
    var pD = Bt("getOrigin");
    Ne.getPluginOrigin = pD;
    var vD = Bt("getDuration");
    Ne.getPluginDuration = vD;
    var hD = Bt("getDestination");
    Ne.getPluginDestination = hD;
    var gD = Bt("createInstance");
    Ne.createPluginInstance = gD;
    var ED = Bt("render");
    Ne.renderPlugin = ED;
    var _D = Bt("clear");
    Ne.clearPlugin = _D;
  });
  var ug = u((W5, sg) => {
    function yD(e, t) {
      return e == null || e !== e ? t : e;
    }
    sg.exports = yD;
  });
  var lg = u((V5, cg) => {
    function mD(e, t, r, n) {
      var o = -1,
        i = e == null ? 0 : e.length;
      for (n && i && (r = e[++o]); ++o < i; ) r = t(r, e[o], o, e);
      return r;
    }
    cg.exports = mD;
  });
  var dg = u((B5, fg) => {
    function TD(e) {
      return function (t, r, n) {
        for (var o = -1, i = Object(t), s = n(t), a = s.length; a--; ) {
          var c = s[e ? a : ++o];
          if (r(i[c], c, i) === !1) break;
        }
        return t;
      };
    }
    fg.exports = TD;
  });
  var vg = u((k5, pg) => {
    var ID = dg(),
      OD = ID();
    pg.exports = OD;
  });
  var Wa = u((H5, hg) => {
    var bD = vg(),
      SD = Kr();
    function AD(e, t) {
      return e && bD(e, t, SD);
    }
    hg.exports = AD;
  });
  var Eg = u((j5, gg) => {
    var wD = Ut();
    function RD(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!wD(r)) return e(r, n);
        for (
          var o = r.length, i = t ? o : -1, s = Object(r);
          (t ? i-- : ++i < o) && n(s[i], i, s) !== !1;

        );
        return r;
      };
    }
    gg.exports = RD;
  });
  var Va = u((K5, _g) => {
    var CD = Wa(),
      ND = Eg(),
      xD = ND(CD);
    _g.exports = xD;
  });
  var mg = u((z5, yg) => {
    function qD(e, t, r, n, o) {
      return (
        o(e, function (i, s, a) {
          r = n ? ((n = !1), i) : t(r, i, s, a);
        }),
        r
      );
    }
    yg.exports = qD;
  });
  var Ig = u((Y5, Tg) => {
    var LD = lg(),
      PD = Va(),
      DD = Ct(),
      MD = mg(),
      FD = qe();
    function GD(e, t, r) {
      var n = FD(e) ? LD : MD,
        o = arguments.length < 3;
      return n(e, DD(t, 4), r, o, PD);
    }
    Tg.exports = GD;
  });
  var bg = u((Q5, Og) => {
    var XD = qa(),
      UD = Ct(),
      WD = La(),
      VD = Math.max,
      BD = Math.min;
    function kD(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var o = n - 1;
      return (
        r !== void 0 &&
          ((o = WD(r)), (o = r < 0 ? VD(n + o, 0) : BD(o, n - 1))),
        XD(e, UD(t, 3), o, !0)
      );
    }
    Og.exports = kD;
  });
  var Ag = u(($5, Sg) => {
    var HD = xa(),
      jD = bg(),
      KD = HD(jD);
    Sg.exports = KD;
  });
  var Rg = u((di) => {
    "use strict";
    Object.defineProperty(di, "__esModule", { value: !0 });
    di.default = void 0;
    var zD = Object.prototype.hasOwnProperty;
    function wg(e, t) {
      return e === t
        ? e !== 0 || t !== 0 || 1 / e === 1 / t
        : e !== e && t !== t;
    }
    function YD(e, t) {
      if (wg(e, t)) return !0;
      if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
      )
        return !1;
      let r = Object.keys(e),
        n = Object.keys(t);
      if (r.length !== n.length) return !1;
      for (let o = 0; o < r.length; o++)
        if (!zD.call(t, r[o]) || !wg(e[r[o]], t[r[o]])) return !1;
      return !0;
    }
    var QD = YD;
    di.default = QD;
  });
  var Yg = u((me) => {
    "use strict";
    var hi = lt().default;
    Object.defineProperty(me, "__esModule", { value: !0 });
    me.cleanupHTMLElement = KM;
    me.clearAllStyles = jM;
    me.getActionListProgress = YM;
    me.getAffectedElements = za;
    me.getComputedStyle = TM;
    me.getDestinationValues = RM;
    me.getElementId = EM;
    me.getInstanceId = hM;
    me.getInstanceOrigin = bM;
    me.getItemConfigByKey = void 0;
    me.getMaxDurationItemIndex = zg;
    me.getNamespacedParameterId = ZM;
    me.getRenderType = Hg;
    me.getStyleProp = CM;
    me.mediaQueriesEqual = e1;
    me.observeStore = mM;
    me.reduceListToGroup = QM;
    me.reifyState = _M;
    me.renderHTMLElement = NM;
    Object.defineProperty(me, "shallowEqual", {
      enumerable: !0,
      get: function () {
        return Gg.default;
      },
    });
    me.shouldAllowMediaQuery = JM;
    me.shouldNamespaceEventParameter = $M;
    me.stringifyTarget = t1;
    var Nt = hi(ug()),
      ka = hi(Ig()),
      Ba = hi(Ag()),
      Cg = or(),
      kt = ke(),
      Gg = hi(Rg()),
      $D = Ga(),
      gt = Ua(),
      Xe = si(),
      {
        BACKGROUND: ZD,
        TRANSFORM: JD,
        TRANSLATE_3D: eM,
        SCALE_3D: tM,
        ROTATE_X: rM,
        ROTATE_Y: nM,
        ROTATE_Z: iM,
        SKEW: oM,
        PRESERVE_3D: aM,
        FLEX: sM,
        OPACITY: pi,
        FILTER: Zr,
        FONT_VARIATION_SETTINGS: Jr,
        WIDTH: vt,
        HEIGHT: ht,
        BACKGROUND_COLOR: Xg,
        BORDER_COLOR: uM,
        COLOR: cM,
        CHILDREN: Ng,
        IMMEDIATE_CHILDREN: lM,
        SIBLINGS: xg,
        PARENT: fM,
        DISPLAY: vi,
        WILL_CHANGE: hr,
        AUTO: xt,
        COMMA_DELIMITER: en,
        COLON_DELIMITER: dM,
        BAR_DELIMITER: qg,
        RENDER_TRANSFORM: Ug,
        RENDER_GENERAL: Ha,
        RENDER_STYLE: ja,
        RENDER_PLUGIN: Wg,
      } = kt.IX2EngineConstants,
      {
        TRANSFORM_MOVE: gr,
        TRANSFORM_SCALE: Er,
        TRANSFORM_ROTATE: _r,
        TRANSFORM_SKEW: tn,
        STYLE_OPACITY: Vg,
        STYLE_FILTER: rn,
        STYLE_FONT_VARIATION: nn,
        STYLE_SIZE: yr,
        STYLE_BACKGROUND_COLOR: mr,
        STYLE_BORDER: Tr,
        STYLE_TEXT_COLOR: Ir,
        GENERAL_DISPLAY: gi,
      } = kt.ActionTypeConsts,
      pM = "OBJECT_VALUE",
      Bg = (e) => e.trim(),
      Ka = Object.freeze({ [mr]: Xg, [Tr]: uM, [Ir]: cM }),
      kg = Object.freeze({
        [Xe.TRANSFORM_PREFIXED]: JD,
        [Xg]: ZD,
        [pi]: pi,
        [Zr]: Zr,
        [vt]: vt,
        [ht]: ht,
        [Jr]: Jr,
      }),
      Lg = {},
      vM = 1;
    function hM() {
      return "i" + vM++;
    }
    var gM = 1;
    function EM(e, t) {
      for (let r in e) {
        let n = e[r];
        if (n && n.ref === t) return n.id;
      }
      return "e" + gM++;
    }
    function _M({ events: e, actionLists: t, site: r } = {}) {
      let n = (0, ka.default)(
          e,
          (s, a) => {
            let { eventTypeId: c } = a;
            return s[c] || (s[c] = {}), (s[c][a.id] = a), s;
          },
          {}
        ),
        o = r && r.mediaQueries,
        i = [];
      return (
        o
          ? (i = o.map((s) => s.key))
          : ((o = []), console.warn("IX2 missing mediaQueries in site data")),
        {
          ixData: {
            events: e,
            actionLists: t,
            eventTypeMap: n,
            mediaQueries: o,
            mediaQueryKeys: i,
          },
        }
      );
    }
    var yM = (e, t) => e === t;
    function mM({ store: e, select: t, onChange: r, comparator: n = yM }) {
      let { getState: o, subscribe: i } = e,
        s = i(c),
        a = t(o());
      function c() {
        let d = t(o());
        if (d == null) {
          s();
          return;
        }
        n(d, a) || ((a = d), r(a, e));
      }
      return s;
    }
    function Pg(e) {
      let t = typeof e;
      if (t === "string") return { id: e };
      if (e != null && t === "object") {
        let {
          id: r,
          objectId: n,
          selector: o,
          selectorGuids: i,
          appliesTo: s,
          useEventTarget: a,
        } = e;
        return {
          id: r,
          objectId: n,
          selector: o,
          selectorGuids: i,
          appliesTo: s,
          useEventTarget: a,
        };
      }
      return {};
    }
    function za({
      config: e,
      event: t,
      eventTarget: r,
      elementRoot: n,
      elementApi: o,
    }) {
      var i, s, a;
      if (!o) throw new Error("IX2 missing elementApi");
      let { targets: c } = e;
      if (Array.isArray(c) && c.length > 0)
        return c.reduce(
          (B, j) =>
            B.concat(
              za({
                config: { target: j },
                event: t,
                eventTarget: r,
                elementRoot: n,
                elementApi: o,
              })
            ),
          []
        );
      let {
          getValidDocument: d,
          getQuerySelector: _,
          queryDocument: E,
          getChildElements: y,
          getSiblingElements: T,
          matchSelector: R,
          elementContains: A,
          isSiblingNode: G,
        } = o,
        { target: N } = e;
      if (!N) return [];
      let {
        id: q,
        objectId: w,
        selector: D,
        selectorGuids: L,
        appliesTo: M,
        useEventTarget: H,
      } = Pg(N);
      if (w) return [Lg[w] || (Lg[w] = {})];
      if (M === kt.EventAppliesTo.PAGE) {
        let B = d(q);
        return B ? [B] : [];
      }
      let ee =
          ((i =
            t == null ||
            (s = t.action) === null ||
            s === void 0 ||
            (a = s.config) === null ||
            a === void 0
              ? void 0
              : a.affectedElements) !== null && i !== void 0
            ? i
            : {})[q || D] || {},
        se = !!(ee.id || ee.selector),
        ne,
        V,
        O,
        U = t && _(Pg(t.target));
      if (
        (se
          ? ((ne = ee.limitAffectedElements), (V = U), (O = _(ee)))
          : (V = O = _({ id: q, selector: D, selectorGuids: L })),
        t && H)
      ) {
        let B = r && (O || H === !0) ? [r] : E(U);
        if (O) {
          if (H === fM) return E(O).filter((j) => B.some((F) => A(j, F)));
          if (H === Ng) return E(O).filter((j) => B.some((F) => A(F, j)));
          if (H === xg) return E(O).filter((j) => B.some((F) => G(F, j)));
        }
        return B;
      }
      return V == null || O == null
        ? []
        : Xe.IS_BROWSER_ENV && n
        ? E(O).filter((B) => n.contains(B))
        : ne === Ng
        ? E(V, O)
        : ne === lM
        ? y(E(V)).filter(R(O))
        : ne === xg
        ? T(E(V)).filter(R(O))
        : E(O);
    }
    function TM({ element: e, actionItem: t }) {
      if (!Xe.IS_BROWSER_ENV) return {};
      let { actionTypeId: r } = t;
      switch (r) {
        case yr:
        case mr:
        case Tr:
        case Ir:
        case gi:
          return window.getComputedStyle(e);
        default:
          return {};
      }
    }
    var Dg = /px/,
      IM = (e, t) =>
        t.reduce(
          (r, n) => (r[n.type] == null && (r[n.type] = xM[n.type]), r),
          e || {}
        ),
      OM = (e, t) =>
        t.reduce(
          (r, n) => (
            r[n.type] == null &&
              (r[n.type] = qM[n.type] || n.defaultValue || 0),
            r
          ),
          e || {}
        );
    function bM(e, t = {}, r = {}, n, o) {
      let { getStyle: i } = o,
        { actionTypeId: s } = n;
      if ((0, gt.isPluginType)(s)) return (0, gt.getPluginOrigin)(s)(t[s]);
      switch (n.actionTypeId) {
        case gr:
        case Er:
        case _r:
        case tn:
          return t[n.actionTypeId] || Ya[n.actionTypeId];
        case rn:
          return IM(t[n.actionTypeId], n.config.filters);
        case nn:
          return OM(t[n.actionTypeId], n.config.fontVariations);
        case Vg:
          return { value: (0, Nt.default)(parseFloat(i(e, pi)), 1) };
        case yr: {
          let a = i(e, vt),
            c = i(e, ht),
            d,
            _;
          return (
            n.config.widthUnit === xt
              ? (d = Dg.test(a) ? parseFloat(a) : parseFloat(r.width))
              : (d = (0, Nt.default)(parseFloat(a), parseFloat(r.width))),
            n.config.heightUnit === xt
              ? (_ = Dg.test(c) ? parseFloat(c) : parseFloat(r.height))
              : (_ = (0, Nt.default)(parseFloat(c), parseFloat(r.height))),
            { widthValue: d, heightValue: _ }
          );
        }
        case mr:
        case Tr:
        case Ir:
          return BM({
            element: e,
            actionTypeId: n.actionTypeId,
            computedStyle: r,
            getStyle: i,
          });
        case gi:
          return { value: (0, Nt.default)(i(e, vi), r.display) };
        case pM:
          return t[n.actionTypeId] || { value: 0 };
        default:
          return;
      }
    }
    var SM = (e, t) => (t && (e[t.type] = t.value || 0), e),
      AM = (e, t) => (t && (e[t.type] = t.value || 0), e),
      wM = (e, t, r) => {
        if ((0, gt.isPluginType)(e)) return (0, gt.getPluginConfig)(e)(r, t);
        switch (e) {
          case rn: {
            let n = (0, Ba.default)(r.filters, ({ type: o }) => o === t);
            return n ? n.value : 0;
          }
          case nn: {
            let n = (0, Ba.default)(r.fontVariations, ({ type: o }) => o === t);
            return n ? n.value : 0;
          }
          default:
            return r[t];
        }
      };
    me.getItemConfigByKey = wM;
    function RM({ element: e, actionItem: t, elementApi: r }) {
      if ((0, gt.isPluginType)(t.actionTypeId))
        return (0, gt.getPluginDestination)(t.actionTypeId)(t.config);
      switch (t.actionTypeId) {
        case gr:
        case Er:
        case _r:
        case tn: {
          let { xValue: n, yValue: o, zValue: i } = t.config;
          return { xValue: n, yValue: o, zValue: i };
        }
        case yr: {
          let { getStyle: n, setStyle: o, getProperty: i } = r,
            { widthUnit: s, heightUnit: a } = t.config,
            { widthValue: c, heightValue: d } = t.config;
          if (!Xe.IS_BROWSER_ENV) return { widthValue: c, heightValue: d };
          if (s === xt) {
            let _ = n(e, vt);
            o(e, vt, ""), (c = i(e, "offsetWidth")), o(e, vt, _);
          }
          if (a === xt) {
            let _ = n(e, ht);
            o(e, ht, ""), (d = i(e, "offsetHeight")), o(e, ht, _);
          }
          return { widthValue: c, heightValue: d };
        }
        case mr:
        case Tr:
        case Ir: {
          let { rValue: n, gValue: o, bValue: i, aValue: s } = t.config;
          return { rValue: n, gValue: o, bValue: i, aValue: s };
        }
        case rn:
          return t.config.filters.reduce(SM, {});
        case nn:
          return t.config.fontVariations.reduce(AM, {});
        default: {
          let { value: n } = t.config;
          return { value: n };
        }
      }
    }
    function Hg(e) {
      if (/^TRANSFORM_/.test(e)) return Ug;
      if (/^STYLE_/.test(e)) return ja;
      if (/^GENERAL_/.test(e)) return Ha;
      if (/^PLUGIN_/.test(e)) return Wg;
    }
    function CM(e, t) {
      return e === ja ? t.replace("STYLE_", "").toLowerCase() : null;
    }
    function NM(e, t, r, n, o, i, s, a, c) {
      switch (a) {
        case Ug:
          return DM(e, t, r, o, s);
        case ja:
          return kM(e, t, r, o, i, s);
        case Ha:
          return HM(e, o, s);
        case Wg: {
          let { actionTypeId: d } = o;
          if ((0, gt.isPluginType)(d)) return (0, gt.renderPlugin)(d)(c, t, o);
        }
      }
    }
    var Ya = {
        [gr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Er]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [_r]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [tn]: Object.freeze({ xValue: 0, yValue: 0 }),
      },
      xM = Object.freeze({
        blur: 0,
        "hue-rotate": 0,
        invert: 0,
        grayscale: 0,
        saturate: 100,
        sepia: 0,
        contrast: 100,
        brightness: 100,
      }),
      qM = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
      LM = (e, t) => {
        let r = (0, Ba.default)(t.filters, ({ type: n }) => n === e);
        if (r && r.unit) return r.unit;
        switch (e) {
          case "blur":
            return "px";
          case "hue-rotate":
            return "deg";
          default:
            return "%";
        }
      },
      PM = Object.keys(Ya);
    function DM(e, t, r, n, o) {
      let i = PM.map((a) => {
          let c = Ya[a],
            {
              xValue: d = c.xValue,
              yValue: _ = c.yValue,
              zValue: E = c.zValue,
              xUnit: y = "",
              yUnit: T = "",
              zUnit: R = "",
            } = t[a] || {};
          switch (a) {
            case gr:
              return `${eM}(${d}${y}, ${_}${T}, ${E}${R})`;
            case Er:
              return `${tM}(${d}${y}, ${_}${T}, ${E}${R})`;
            case _r:
              return `${rM}(${d}${y}) ${nM}(${_}${T}) ${iM}(${E}${R})`;
            case tn:
              return `${oM}(${d}${y}, ${_}${T})`;
            default:
              return "";
          }
        }).join(" "),
        { setStyle: s } = o;
      Ht(e, Xe.TRANSFORM_PREFIXED, o),
        s(e, Xe.TRANSFORM_PREFIXED, i),
        GM(n, r) && s(e, Xe.TRANSFORM_STYLE_PREFIXED, aM);
    }
    function MM(e, t, r, n) {
      let o = (0, ka.default)(t, (s, a, c) => `${s} ${c}(${a}${LM(c, r)})`, ""),
        { setStyle: i } = n;
      Ht(e, Zr, n), i(e, Zr, o);
    }
    function FM(e, t, r, n) {
      let o = (0, ka.default)(
          t,
          (s, a, c) => (s.push(`"${c}" ${a}`), s),
          []
        ).join(", "),
        { setStyle: i } = n;
      Ht(e, Jr, n), i(e, Jr, o);
    }
    function GM({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
      return (
        (e === gr && n !== void 0) ||
        (e === Er && n !== void 0) ||
        (e === _r && (t !== void 0 || r !== void 0))
      );
    }
    var XM = "\\(([^)]+)\\)",
      UM = /^rgb/,
      WM = RegExp(`rgba?${XM}`);
    function VM(e, t) {
      let r = e.exec(t);
      return r ? r[1] : "";
    }
    function BM({
      element: e,
      actionTypeId: t,
      computedStyle: r,
      getStyle: n,
    }) {
      let o = Ka[t],
        i = n(e, o),
        s = UM.test(i) ? i : r[o],
        a = VM(WM, s).split(en);
      return {
        rValue: (0, Nt.default)(parseInt(a[0], 10), 255),
        gValue: (0, Nt.default)(parseInt(a[1], 10), 255),
        bValue: (0, Nt.default)(parseInt(a[2], 10), 255),
        aValue: (0, Nt.default)(parseFloat(a[3]), 1),
      };
    }
    function kM(e, t, r, n, o, i) {
      let { setStyle: s } = i;
      switch (n.actionTypeId) {
        case yr: {
          let { widthUnit: a = "", heightUnit: c = "" } = n.config,
            { widthValue: d, heightValue: _ } = r;
          d !== void 0 &&
            (a === xt && (a = "px"), Ht(e, vt, i), s(e, vt, d + a)),
            _ !== void 0 &&
              (c === xt && (c = "px"), Ht(e, ht, i), s(e, ht, _ + c));
          break;
        }
        case rn: {
          MM(e, r, n.config, i);
          break;
        }
        case nn: {
          FM(e, r, n.config, i);
          break;
        }
        case mr:
        case Tr:
        case Ir: {
          let a = Ka[n.actionTypeId],
            c = Math.round(r.rValue),
            d = Math.round(r.gValue),
            _ = Math.round(r.bValue),
            E = r.aValue;
          Ht(e, a, i),
            s(
              e,
              a,
              E >= 1 ? `rgb(${c},${d},${_})` : `rgba(${c},${d},${_},${E})`
            );
          break;
        }
        default: {
          let { unit: a = "" } = n.config;
          Ht(e, o, i), s(e, o, r.value + a);
          break;
        }
      }
    }
    function HM(e, t, r) {
      let { setStyle: n } = r;
      switch (t.actionTypeId) {
        case gi: {
          let { value: o } = t.config;
          o === sM && Xe.IS_BROWSER_ENV
            ? n(e, vi, Xe.FLEX_PREFIXED)
            : n(e, vi, o);
          return;
        }
      }
    }
    function Ht(e, t, r) {
      if (!Xe.IS_BROWSER_ENV) return;
      let n = kg[t];
      if (!n) return;
      let { getStyle: o, setStyle: i } = r,
        s = o(e, hr);
      if (!s) {
        i(e, hr, n);
        return;
      }
      let a = s.split(en).map(Bg);
      a.indexOf(n) === -1 && i(e, hr, a.concat(n).join(en));
    }
    function jg(e, t, r) {
      if (!Xe.IS_BROWSER_ENV) return;
      let n = kg[t];
      if (!n) return;
      let { getStyle: o, setStyle: i } = r,
        s = o(e, hr);
      !s ||
        s.indexOf(n) === -1 ||
        i(
          e,
          hr,
          s
            .split(en)
            .map(Bg)
            .filter((a) => a !== n)
            .join(en)
        );
    }
    function jM({ store: e, elementApi: t }) {
      let { ixData: r } = e.getState(),
        { events: n = {}, actionLists: o = {} } = r;
      Object.keys(n).forEach((i) => {
        let s = n[i],
          { config: a } = s.action,
          { actionListId: c } = a,
          d = o[c];
        d && Mg({ actionList: d, event: s, elementApi: t });
      }),
        Object.keys(o).forEach((i) => {
          Mg({ actionList: o[i], elementApi: t });
        });
    }
    function Mg({ actionList: e = {}, event: t, elementApi: r }) {
      let { actionItemGroups: n, continuousParameterGroups: o } = e;
      n &&
        n.forEach((i) => {
          Fg({ actionGroup: i, event: t, elementApi: r });
        }),
        o &&
          o.forEach((i) => {
            let { continuousActionGroups: s } = i;
            s.forEach((a) => {
              Fg({ actionGroup: a, event: t, elementApi: r });
            });
          });
    }
    function Fg({ actionGroup: e, event: t, elementApi: r }) {
      let { actionItems: n } = e;
      n.forEach(({ actionTypeId: o, config: i }) => {
        let s;
        (0, gt.isPluginType)(o)
          ? (s = (0, gt.clearPlugin)(o))
          : (s = Kg({ effect: zM, actionTypeId: o, elementApi: r })),
          za({ config: i, event: t, elementApi: r }).forEach(s);
      });
    }
    function KM(e, t, r) {
      let { setStyle: n, getStyle: o } = r,
        { actionTypeId: i } = t;
      if (i === yr) {
        let { config: s } = t;
        s.widthUnit === xt && n(e, vt, ""), s.heightUnit === xt && n(e, ht, "");
      }
      o(e, hr) && Kg({ effect: jg, actionTypeId: i, elementApi: r })(e);
    }
    var Kg =
      ({ effect: e, actionTypeId: t, elementApi: r }) =>
      (n) => {
        switch (t) {
          case gr:
          case Er:
          case _r:
          case tn:
            e(n, Xe.TRANSFORM_PREFIXED, r);
            break;
          case rn:
            e(n, Zr, r);
            break;
          case nn:
            e(n, Jr, r);
            break;
          case Vg:
            e(n, pi, r);
            break;
          case yr:
            e(n, vt, r), e(n, ht, r);
            break;
          case mr:
          case Tr:
          case Ir:
            e(n, Ka[t], r);
            break;
          case gi:
            e(n, vi, r);
            break;
        }
      };
    function zM(e, t, r) {
      let { setStyle: n } = r;
      jg(e, t, r),
        n(e, t, ""),
        t === Xe.TRANSFORM_PREFIXED && n(e, Xe.TRANSFORM_STYLE_PREFIXED, "");
    }
    function zg(e) {
      let t = 0,
        r = 0;
      return (
        e.forEach((n, o) => {
          let { config: i } = n,
            s = i.delay + i.duration;
          s >= t && ((t = s), (r = o));
        }),
        r
      );
    }
    function YM(e, t) {
      let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
        { actionItem: o, verboseTimeElapsed: i = 0 } = t,
        s = 0,
        a = 0;
      return (
        r.forEach((c, d) => {
          if (n && d === 0) return;
          let { actionItems: _ } = c,
            E = _[zg(_)],
            { config: y, actionTypeId: T } = E;
          o.id === E.id && (a = s + i);
          let R = Hg(T) === Ha ? 0 : y.duration;
          s += y.delay + R;
        }),
        s > 0 ? (0, $D.optimizeFloat)(a / s) : 0
      );
    }
    function QM({ actionList: e, actionItemId: t, rawData: r }) {
      let { actionItemGroups: n, continuousParameterGroups: o } = e,
        i = [],
        s = (a) => (
          i.push((0, Cg.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
          a.id === t
        );
      return (
        n && n.some(({ actionItems: a }) => a.some(s)),
        o &&
          o.some((a) => {
            let { continuousActionGroups: c } = a;
            return c.some(({ actionItems: d }) => d.some(s));
          }),
        (0, Cg.setIn)(r, ["actionLists"], {
          [e.id]: { id: e.id, actionItemGroups: [{ actionItems: i }] },
        })
      );
    }
    function $M(e, { basedOn: t }) {
      return (
        (e === kt.EventTypeConsts.SCROLLING_IN_VIEW &&
          (t === kt.EventBasedOn.ELEMENT || t == null)) ||
        (e === kt.EventTypeConsts.MOUSE_MOVE && t === kt.EventBasedOn.ELEMENT)
      );
    }
    function ZM(e, t) {
      return e + dM + t;
    }
    function JM(e, t) {
      return t == null ? !0 : e.indexOf(t) !== -1;
    }
    function e1(e, t) {
      return (0, Gg.default)(e && e.sort(), t && t.sort());
    }
    function t1(e) {
      if (typeof e == "string") return e;
      let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
      return t + qg + r + qg + n;
    }
  });
  var jt = u((Ue) => {
    "use strict";
    var Or = $t().default;
    Object.defineProperty(Ue, "__esModule", { value: !0 });
    Ue.IX2VanillaUtils =
      Ue.IX2VanillaPlugins =
      Ue.IX2ElementsReducer =
      Ue.IX2Easings =
      Ue.IX2EasingUtils =
      Ue.IX2BrowserSupport =
        void 0;
    var r1 = Or(si());
    Ue.IX2BrowserSupport = r1;
    var n1 = Or(Ma());
    Ue.IX2Easings = n1;
    var i1 = Or(Ga());
    Ue.IX2EasingUtils = i1;
    var o1 = Or(ig());
    Ue.IX2ElementsReducer = o1;
    var a1 = Or(Ua());
    Ue.IX2VanillaPlugins = a1;
    var s1 = Or(Yg());
    Ue.IX2VanillaUtils = s1;
  });
  var Jg = u((_i) => {
    "use strict";
    Object.defineProperty(_i, "__esModule", { value: !0 });
    _i.ixInstances = void 0;
    var Qg = ke(),
      $g = jt(),
      br = or(),
      {
        IX2_RAW_DATA_IMPORTED: u1,
        IX2_SESSION_STOPPED: c1,
        IX2_INSTANCE_ADDED: l1,
        IX2_INSTANCE_STARTED: f1,
        IX2_INSTANCE_REMOVED: d1,
        IX2_ANIMATION_FRAME_CHANGED: p1,
      } = Qg.IX2EngineActionTypes,
      {
        optimizeFloat: Ei,
        applyEasing: Zg,
        createBezierEasing: v1,
      } = $g.IX2EasingUtils,
      { RENDER_GENERAL: h1 } = Qg.IX2EngineConstants,
      {
        getItemConfigByKey: Qa,
        getRenderType: g1,
        getStyleProp: E1,
      } = $g.IX2VanillaUtils,
      _1 = (e, t) => {
        let {
            position: r,
            parameterId: n,
            actionGroups: o,
            destinationKeys: i,
            smoothing: s,
            restingValue: a,
            actionTypeId: c,
            customEasingFn: d,
            skipMotion: _,
            skipToValue: E,
          } = e,
          { parameters: y } = t.payload,
          T = Math.max(1 - s, 0.01),
          R = y[n];
        R == null && ((T = 1), (R = a));
        let A = Math.max(R, 0) || 0,
          G = Ei(A - r),
          N = _ ? E : Ei(r + G * T),
          q = N * 100;
        if (N === r && e.current) return e;
        let w, D, L, M;
        for (let J = 0, { length: ee } = o; J < ee; J++) {
          let { keyframe: se, actionItems: ne } = o[J];
          if ((J === 0 && (w = ne[0]), q >= se)) {
            w = ne[0];
            let V = o[J + 1],
              O = V && q !== se;
            (D = O ? V.actionItems[0] : null),
              O && ((L = se / 100), (M = (V.keyframe - se) / 100));
          }
        }
        let H = {};
        if (w && !D)
          for (let J = 0, { length: ee } = i; J < ee; J++) {
            let se = i[J];
            H[se] = Qa(c, se, w.config);
          }
        else if (w && D && L !== void 0 && M !== void 0) {
          let J = (N - L) / M,
            ee = w.config.easing,
            se = Zg(ee, J, d);
          for (let ne = 0, { length: V } = i; ne < V; ne++) {
            let O = i[ne],
              U = Qa(c, O, w.config),
              F = (Qa(c, O, D.config) - U) * se + U;
            H[O] = F;
          }
        }
        return (0, br.merge)(e, { position: N, current: H });
      },
      y1 = (e, t) => {
        let {
            active: r,
            origin: n,
            start: o,
            immediate: i,
            renderType: s,
            verbose: a,
            actionItem: c,
            destination: d,
            destinationKeys: _,
            pluginDuration: E,
            instanceDelay: y,
            customEasingFn: T,
            skipMotion: R,
          } = e,
          A = c.config.easing,
          { duration: G, delay: N } = c.config;
        E != null && (G = E),
          (N = y ?? N),
          s === h1 ? (G = 0) : (i || R) && (G = N = 0);
        let { now: q } = t.payload;
        if (r && n) {
          let w = q - (o + N);
          if (a) {
            let J = q - o,
              ee = G + N,
              se = Ei(Math.min(Math.max(0, J / ee), 1));
            e = (0, br.set)(e, "verboseTimeElapsed", ee * se);
          }
          if (w < 0) return e;
          let D = Ei(Math.min(Math.max(0, w / G), 1)),
            L = Zg(A, D, T),
            M = {},
            H = null;
          return (
            _.length &&
              (H = _.reduce((J, ee) => {
                let se = d[ee],
                  ne = parseFloat(n[ee]) || 0,
                  O = (parseFloat(se) - ne) * L + ne;
                return (J[ee] = O), J;
              }, {})),
            (M.current = H),
            (M.position = D),
            D === 1 && ((M.active = !1), (M.complete = !0)),
            (0, br.merge)(e, M)
          );
        }
        return e;
      },
      m1 = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case u1:
            return t.payload.ixInstances || Object.freeze({});
          case c1:
            return Object.freeze({});
          case l1: {
            let {
                instanceId: r,
                elementId: n,
                actionItem: o,
                eventId: i,
                eventTarget: s,
                eventStateKey: a,
                actionListId: c,
                groupIndex: d,
                isCarrier: _,
                origin: E,
                destination: y,
                immediate: T,
                verbose: R,
                continuous: A,
                parameterId: G,
                actionGroups: N,
                smoothing: q,
                restingValue: w,
                pluginInstance: D,
                pluginDuration: L,
                instanceDelay: M,
                skipMotion: H,
                skipToValue: J,
              } = t.payload,
              { actionTypeId: ee } = o,
              se = g1(ee),
              ne = E1(se, ee),
              V = Object.keys(y).filter((U) => y[U] != null),
              { easing: O } = o.config;
            return (0, br.set)(e, r, {
              id: r,
              elementId: n,
              active: !1,
              position: 0,
              start: 0,
              origin: E,
              destination: y,
              destinationKeys: V,
              immediate: T,
              verbose: R,
              current: null,
              actionItem: o,
              actionTypeId: ee,
              eventId: i,
              eventTarget: s,
              eventStateKey: a,
              actionListId: c,
              groupIndex: d,
              renderType: se,
              isCarrier: _,
              styleProp: ne,
              continuous: A,
              parameterId: G,
              actionGroups: N,
              smoothing: q,
              restingValue: w,
              pluginInstance: D,
              pluginDuration: L,
              instanceDelay: M,
              skipMotion: H,
              skipToValue: J,
              customEasingFn:
                Array.isArray(O) && O.length === 4 ? v1(O) : void 0,
            });
          }
          case f1: {
            let { instanceId: r, time: n } = t.payload;
            return (0, br.mergeIn)(e, [r], {
              active: !0,
              complete: !1,
              start: n,
            });
          }
          case d1: {
            let { instanceId: r } = t.payload;
            if (!e[r]) return e;
            let n = {},
              o = Object.keys(e),
              { length: i } = o;
            for (let s = 0; s < i; s++) {
              let a = o[s];
              a !== r && (n[a] = e[a]);
            }
            return n;
          }
          case p1: {
            let r = e,
              n = Object.keys(e),
              { length: o } = n;
            for (let i = 0; i < o; i++) {
              let s = n[i],
                a = e[s],
                c = a.continuous ? _1 : y1;
              r = (0, br.set)(r, s, c(a, t));
            }
            return r;
          }
          default:
            return e;
        }
      };
    _i.ixInstances = m1;
  });
  var eE = u((yi) => {
    "use strict";
    Object.defineProperty(yi, "__esModule", { value: !0 });
    yi.ixParameters = void 0;
    var T1 = ke(),
      {
        IX2_RAW_DATA_IMPORTED: I1,
        IX2_SESSION_STOPPED: O1,
        IX2_PARAMETER_CHANGED: b1,
      } = T1.IX2EngineActionTypes,
      S1 = (e = {}, t) => {
        switch (t.type) {
          case I1:
            return t.payload.ixParameters || {};
          case O1:
            return {};
          case b1: {
            let { key: r, value: n } = t.payload;
            return (e[r] = n), e;
          }
          default:
            return e;
        }
      };
    yi.ixParameters = S1;
  });
  var tE = u((mi) => {
    "use strict";
    Object.defineProperty(mi, "__esModule", { value: !0 });
    mi.default = void 0;
    var A1 = Jo(),
      w1 = If(),
      R1 = Wf(),
      C1 = Bf(),
      N1 = jt(),
      x1 = Jg(),
      q1 = eE(),
      { ixElements: L1 } = N1.IX2ElementsReducer,
      P1 = (0, A1.combineReducers)({
        ixData: w1.ixData,
        ixRequest: R1.ixRequest,
        ixSession: C1.ixSession,
        ixElements: L1,
        ixInstances: x1.ixInstances,
        ixParameters: q1.ixParameters,
      });
    mi.default = P1;
  });
  var rE = u((ij, on) => {
    function D1(e, t) {
      if (e == null) return {};
      var r = {},
        n = Object.keys(e),
        o,
        i;
      for (i = 0; i < n.length; i++)
        (o = n[i]), !(t.indexOf(o) >= 0) && (r[o] = e[o]);
      return r;
    }
    (on.exports = D1),
      (on.exports.__esModule = !0),
      (on.exports.default = on.exports);
  });
  var iE = u((oj, nE) => {
    var M1 = wt(),
      F1 = qe(),
      G1 = mt(),
      X1 = "[object String]";
    function U1(e) {
      return typeof e == "string" || (!F1(e) && G1(e) && M1(e) == X1);
    }
    nE.exports = U1;
  });
  var aE = u((aj, oE) => {
    var W1 = Na(),
      V1 = W1("length");
    oE.exports = V1;
  });
  var uE = u((sj, sE) => {
    var B1 = "\\ud800-\\udfff",
      k1 = "\\u0300-\\u036f",
      H1 = "\\ufe20-\\ufe2f",
      j1 = "\\u20d0-\\u20ff",
      K1 = k1 + H1 + j1,
      z1 = "\\ufe0e\\ufe0f",
      Y1 = "\\u200d",
      Q1 = RegExp("[" + Y1 + B1 + K1 + z1 + "]");
    function $1(e) {
      return Q1.test(e);
    }
    sE.exports = $1;
  });
  var EE = u((uj, gE) => {
    var lE = "\\ud800-\\udfff",
      Z1 = "\\u0300-\\u036f",
      J1 = "\\ufe20-\\ufe2f",
      eF = "\\u20d0-\\u20ff",
      tF = Z1 + J1 + eF,
      rF = "\\ufe0e\\ufe0f",
      nF = "[" + lE + "]",
      $a = "[" + tF + "]",
      Za = "\\ud83c[\\udffb-\\udfff]",
      iF = "(?:" + $a + "|" + Za + ")",
      fE = "[^" + lE + "]",
      dE = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      pE = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      oF = "\\u200d",
      vE = iF + "?",
      hE = "[" + rF + "]?",
      aF = "(?:" + oF + "(?:" + [fE, dE, pE].join("|") + ")" + hE + vE + ")*",
      sF = hE + vE + aF,
      uF = "(?:" + [fE + $a + "?", $a, dE, pE, nF].join("|") + ")",
      cE = RegExp(Za + "(?=" + Za + ")|" + uF + sF, "g");
    function cF(e) {
      for (var t = (cE.lastIndex = 0); cE.test(e); ) ++t;
      return t;
    }
    gE.exports = cF;
  });
  var yE = u((cj, _E) => {
    var lF = aE(),
      fF = uE(),
      dF = EE();
    function pF(e) {
      return fF(e) ? dF(e) : lF(e);
    }
    _E.exports = pF;
  });
  var TE = u((lj, mE) => {
    var vF = Zn(),
      hF = Jn(),
      gF = Ut(),
      EF = iE(),
      _F = yE(),
      yF = "[object Map]",
      mF = "[object Set]";
    function TF(e) {
      if (e == null) return 0;
      if (gF(e)) return EF(e) ? _F(e) : e.length;
      var t = hF(e);
      return t == yF || t == mF ? e.size : vF(e).length;
    }
    mE.exports = TF;
  });
  var OE = u((fj, IE) => {
    var IF = "Expected a function";
    function OF(e) {
      if (typeof e != "function") throw new TypeError(IF);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    IE.exports = OF;
  });
  var Ja = u((dj, bE) => {
    var bF = Rt(),
      SF = (function () {
        try {
          var e = bF(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    bE.exports = SF;
  });
  var es = u((pj, AE) => {
    var SE = Ja();
    function AF(e, t, r) {
      t == "__proto__" && SE
        ? SE(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    AE.exports = AF;
  });
  var RE = u((vj, wE) => {
    var wF = es(),
      RF = Vn(),
      CF = Object.prototype,
      NF = CF.hasOwnProperty;
    function xF(e, t, r) {
      var n = e[t];
      (!(NF.call(e, t) && RF(n, r)) || (r === void 0 && !(t in e))) &&
        wF(e, t, r);
    }
    wE.exports = xF;
  });
  var xE = u((hj, NE) => {
    var qF = RE(),
      LF = Yr(),
      PF = zn(),
      CE = pt(),
      DF = pr();
    function MF(e, t, r, n) {
      if (!CE(e)) return e;
      t = LF(t, e);
      for (var o = -1, i = t.length, s = i - 1, a = e; a != null && ++o < i; ) {
        var c = DF(t[o]),
          d = r;
        if (c === "__proto__" || c === "constructor" || c === "prototype")
          return e;
        if (o != s) {
          var _ = a[c];
          (d = n ? n(_, c, a) : void 0),
            d === void 0 && (d = CE(_) ? _ : PF(t[o + 1]) ? [] : {});
        }
        qF(a, c, d), (a = a[c]);
      }
      return e;
    }
    NE.exports = MF;
  });
  var LE = u((gj, qE) => {
    var FF = ri(),
      GF = xE(),
      XF = Yr();
    function UF(e, t, r) {
      for (var n = -1, o = t.length, i = {}; ++n < o; ) {
        var s = t[n],
          a = FF(e, s);
        r(a, s) && GF(i, XF(s, e), a);
      }
      return i;
    }
    qE.exports = UF;
  });
  var DE = u((Ej, PE) => {
    var WF = jn(),
      VF = Uo(),
      BF = ha(),
      kF = va(),
      HF = Object.getOwnPropertySymbols,
      jF = HF
        ? function (e) {
            for (var t = []; e; ) WF(t, BF(e)), (e = VF(e));
            return t;
          }
        : kF;
    PE.exports = jF;
  });
  var FE = u((_j, ME) => {
    function KF(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    ME.exports = KF;
  });
  var XE = u((yj, GE) => {
    var zF = pt(),
      YF = $n(),
      QF = FE(),
      $F = Object.prototype,
      ZF = $F.hasOwnProperty;
    function JF(e) {
      if (!zF(e)) return QF(e);
      var t = YF(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !ZF.call(e, n))) || r.push(n);
      return r;
    }
    GE.exports = JF;
  });
  var WE = u((mj, UE) => {
    var e2 = Ea(),
      t2 = XE(),
      r2 = Ut();
    function n2(e) {
      return r2(e) ? e2(e, !0) : t2(e);
    }
    UE.exports = n2;
  });
  var BE = u((Tj, VE) => {
    var i2 = pa(),
      o2 = DE(),
      a2 = WE();
    function s2(e) {
      return i2(e, a2, o2);
    }
    VE.exports = s2;
  });
  var HE = u((Ij, kE) => {
    var u2 = Ca(),
      c2 = Ct(),
      l2 = LE(),
      f2 = BE();
    function d2(e, t) {
      if (e == null) return {};
      var r = u2(f2(e), function (n) {
        return [n];
      });
      return (
        (t = c2(t)),
        l2(e, r, function (n, o) {
          return t(n, o[0]);
        })
      );
    }
    kE.exports = d2;
  });
  var KE = u((Oj, jE) => {
    var p2 = Ct(),
      v2 = OE(),
      h2 = HE();
    function g2(e, t) {
      return h2(e, v2(p2(t)));
    }
    jE.exports = g2;
  });
  var YE = u((bj, zE) => {
    var E2 = Zn(),
      _2 = Jn(),
      y2 = Br(),
      m2 = qe(),
      T2 = Ut(),
      I2 = Kn(),
      O2 = $n(),
      b2 = Qn(),
      S2 = "[object Map]",
      A2 = "[object Set]",
      w2 = Object.prototype,
      R2 = w2.hasOwnProperty;
    function C2(e) {
      if (e == null) return !0;
      if (
        T2(e) &&
        (m2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          I2(e) ||
          b2(e) ||
          y2(e))
      )
        return !e.length;
      var t = _2(e);
      if (t == S2 || t == A2) return !e.size;
      if (O2(e)) return !E2(e).length;
      for (var r in e) if (R2.call(e, r)) return !1;
      return !0;
    }
    zE.exports = C2;
  });
  var $E = u((Sj, QE) => {
    var N2 = es(),
      x2 = Wa(),
      q2 = Ct();
    function L2(e, t) {
      var r = {};
      return (
        (t = q2(t, 3)),
        x2(e, function (n, o, i) {
          N2(r, o, t(n, o, i));
        }),
        r
      );
    }
    QE.exports = L2;
  });
  var JE = u((Aj, ZE) => {
    function P2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    ZE.exports = P2;
  });
  var t_ = u((wj, e_) => {
    var D2 = ii();
    function M2(e) {
      return typeof e == "function" ? e : D2;
    }
    e_.exports = M2;
  });
  var n_ = u((Rj, r_) => {
    var F2 = JE(),
      G2 = Va(),
      X2 = t_(),
      U2 = qe();
    function W2(e, t) {
      var r = U2(e) ? F2 : G2;
      return r(e, X2(t));
    }
    r_.exports = W2;
  });
  var o_ = u((Cj, i_) => {
    var V2 = nt(),
      B2 = function () {
        return V2.Date.now();
      };
    i_.exports = B2;
  });
  var u_ = u((Nj, s_) => {
    var k2 = pt(),
      ts = o_(),
      a_ = oi(),
      H2 = "Expected a function",
      j2 = Math.max,
      K2 = Math.min;
    function z2(e, t, r) {
      var n,
        o,
        i,
        s,
        a,
        c,
        d = 0,
        _ = !1,
        E = !1,
        y = !0;
      if (typeof e != "function") throw new TypeError(H2);
      (t = a_(t) || 0),
        k2(r) &&
          ((_ = !!r.leading),
          (E = "maxWait" in r),
          (i = E ? j2(a_(r.maxWait) || 0, t) : i),
          (y = "trailing" in r ? !!r.trailing : y));
      function T(M) {
        var H = n,
          J = o;
        return (n = o = void 0), (d = M), (s = e.apply(J, H)), s;
      }
      function R(M) {
        return (d = M), (a = setTimeout(N, t)), _ ? T(M) : s;
      }
      function A(M) {
        var H = M - c,
          J = M - d,
          ee = t - H;
        return E ? K2(ee, i - J) : ee;
      }
      function G(M) {
        var H = M - c,
          J = M - d;
        return c === void 0 || H >= t || H < 0 || (E && J >= i);
      }
      function N() {
        var M = ts();
        if (G(M)) return q(M);
        a = setTimeout(N, A(M));
      }
      function q(M) {
        return (a = void 0), y && n ? T(M) : ((n = o = void 0), s);
      }
      function w() {
        a !== void 0 && clearTimeout(a), (d = 0), (n = c = o = a = void 0);
      }
      function D() {
        return a === void 0 ? s : q(ts());
      }
      function L() {
        var M = ts(),
          H = G(M);
        if (((n = arguments), (o = this), (c = M), H)) {
          if (a === void 0) return R(c);
          if (E) return clearTimeout(a), (a = setTimeout(N, t)), T(c);
        }
        return a === void 0 && (a = setTimeout(N, t)), s;
      }
      return (L.cancel = w), (L.flush = D), L;
    }
    s_.exports = z2;
  });
  var l_ = u((xj, c_) => {
    var Y2 = u_(),
      Q2 = pt(),
      $2 = "Expected a function";
    function Z2(e, t, r) {
      var n = !0,
        o = !0;
      if (typeof e != "function") throw new TypeError($2);
      return (
        Q2(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (o = "trailing" in r ? !!r.trailing : o)),
        Y2(e, t, { leading: n, maxWait: t, trailing: o })
      );
    }
    c_.exports = Z2;
  });
  var Ti = u((fe) => {
    "use strict";
    var J2 = lt().default;
    Object.defineProperty(fe, "__esModule", { value: !0 });
    fe.viewportWidthChanged =
      fe.testFrameRendered =
      fe.stopRequested =
      fe.sessionStopped =
      fe.sessionStarted =
      fe.sessionInitialized =
      fe.rawDataImported =
      fe.previewRequested =
      fe.playbackRequested =
      fe.parameterChanged =
      fe.mediaQueriesDefined =
      fe.instanceStarted =
      fe.instanceRemoved =
      fe.instanceAdded =
      fe.eventStateChanged =
      fe.eventListenerAdded =
      fe.elementStateChanged =
      fe.clearRequested =
      fe.animationFrameChanged =
      fe.actionListPlaybackChanged =
        void 0;
    var f_ = J2(Gr()),
      d_ = ke(),
      eG = jt(),
      {
        IX2_RAW_DATA_IMPORTED: tG,
        IX2_SESSION_INITIALIZED: rG,
        IX2_SESSION_STARTED: nG,
        IX2_SESSION_STOPPED: iG,
        IX2_PREVIEW_REQUESTED: oG,
        IX2_PLAYBACK_REQUESTED: aG,
        IX2_STOP_REQUESTED: sG,
        IX2_CLEAR_REQUESTED: uG,
        IX2_EVENT_LISTENER_ADDED: cG,
        IX2_TEST_FRAME_RENDERED: lG,
        IX2_EVENT_STATE_CHANGED: fG,
        IX2_ANIMATION_FRAME_CHANGED: dG,
        IX2_PARAMETER_CHANGED: pG,
        IX2_INSTANCE_ADDED: vG,
        IX2_INSTANCE_STARTED: hG,
        IX2_INSTANCE_REMOVED: gG,
        IX2_ELEMENT_STATE_CHANGED: EG,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: _G,
        IX2_VIEWPORT_WIDTH_CHANGED: yG,
        IX2_MEDIA_QUERIES_DEFINED: mG,
      } = d_.IX2EngineActionTypes,
      { reifyState: TG } = eG.IX2VanillaUtils,
      IG = (e) => ({ type: tG, payload: (0, f_.default)({}, TG(e)) });
    fe.rawDataImported = IG;
    var OG = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
      type: rG,
      payload: { hasBoundaryNodes: e, reducedMotion: t },
    });
    fe.sessionInitialized = OG;
    var bG = () => ({ type: nG });
    fe.sessionStarted = bG;
    var SG = () => ({ type: iG });
    fe.sessionStopped = SG;
    var AG = ({ rawData: e, defer: t }) => ({
      type: oG,
      payload: { defer: t, rawData: e },
    });
    fe.previewRequested = AG;
    var wG = ({
      actionTypeId: e = d_.ActionTypeConsts.GENERAL_START_ACTION,
      actionListId: t,
      actionItemId: r,
      eventId: n,
      allowEvents: o,
      immediate: i,
      testManual: s,
      verbose: a,
      rawData: c,
    }) => ({
      type: aG,
      payload: {
        actionTypeId: e,
        actionListId: t,
        actionItemId: r,
        testManual: s,
        eventId: n,
        allowEvents: o,
        immediate: i,
        verbose: a,
        rawData: c,
      },
    });
    fe.playbackRequested = wG;
    var RG = (e) => ({ type: sG, payload: { actionListId: e } });
    fe.stopRequested = RG;
    var CG = () => ({ type: uG });
    fe.clearRequested = CG;
    var NG = (e, t) => ({
      type: cG,
      payload: { target: e, listenerParams: t },
    });
    fe.eventListenerAdded = NG;
    var xG = (e = 1) => ({ type: lG, payload: { step: e } });
    fe.testFrameRendered = xG;
    var qG = (e, t) => ({ type: fG, payload: { stateKey: e, newState: t } });
    fe.eventStateChanged = qG;
    var LG = (e, t) => ({ type: dG, payload: { now: e, parameters: t } });
    fe.animationFrameChanged = LG;
    var PG = (e, t) => ({ type: pG, payload: { key: e, value: t } });
    fe.parameterChanged = PG;
    var DG = (e) => ({ type: vG, payload: (0, f_.default)({}, e) });
    fe.instanceAdded = DG;
    var MG = (e, t) => ({ type: hG, payload: { instanceId: e, time: t } });
    fe.instanceStarted = MG;
    var FG = (e) => ({ type: gG, payload: { instanceId: e } });
    fe.instanceRemoved = FG;
    var GG = (e, t, r, n) => ({
      type: EG,
      payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
    });
    fe.elementStateChanged = GG;
    var XG = ({ actionListId: e, isPlaying: t }) => ({
      type: _G,
      payload: { actionListId: e, isPlaying: t },
    });
    fe.actionListPlaybackChanged = XG;
    var UG = ({ width: e, mediaQueries: t }) => ({
      type: yG,
      payload: { width: e, mediaQueries: t },
    });
    fe.viewportWidthChanged = UG;
    var WG = () => ({ type: mG });
    fe.mediaQueriesDefined = WG;
  });
  var h_ = u((Pe) => {
    "use strict";
    Object.defineProperty(Pe, "__esModule", { value: !0 });
    Pe.elementContains = JG;
    Pe.getChildElements = tX;
    Pe.getClosestElement = void 0;
    Pe.getProperty = zG;
    Pe.getQuerySelector = QG;
    Pe.getRefType = iX;
    Pe.getSiblingElements = rX;
    Pe.getStyle = KG;
    Pe.getValidDocument = $G;
    Pe.isSiblingNode = eX;
    Pe.matchSelector = YG;
    Pe.queryDocument = ZG;
    Pe.setStyle = jG;
    var VG = jt(),
      BG = ke(),
      { ELEMENT_MATCHES: rs } = VG.IX2BrowserSupport,
      {
        IX2_ID_DELIMITER: p_,
        HTML_ELEMENT: kG,
        PLAIN_OBJECT: HG,
        WF_PAGE: v_,
      } = BG.IX2EngineConstants;
    function jG(e, t, r) {
      e.style[t] = r;
    }
    function KG(e, t) {
      return e.style[t];
    }
    function zG(e, t) {
      return e[t];
    }
    function YG(e) {
      return (t) => t[rs](e);
    }
    function QG({ id: e, selector: t }) {
      if (e) {
        let r = e;
        if (e.indexOf(p_) !== -1) {
          let n = e.split(p_),
            o = n[0];
          if (((r = n[1]), o !== document.documentElement.getAttribute(v_)))
            return null;
        }
        return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
      }
      return t;
    }
    function $G(e) {
      return e == null || e === document.documentElement.getAttribute(v_)
        ? document
        : null;
    }
    function ZG(e, t) {
      return Array.prototype.slice.call(
        document.querySelectorAll(t ? e + " " + t : e)
      );
    }
    function JG(e, t) {
      return e.contains(t);
    }
    function eX(e, t) {
      return e !== t && e.parentNode === t.parentNode;
    }
    function tX(e) {
      let t = [];
      for (let r = 0, { length: n } = e || []; r < n; r++) {
        let { children: o } = e[r],
          { length: i } = o;
        if (i) for (let s = 0; s < i; s++) t.push(o[s]);
      }
      return t;
    }
    function rX(e = []) {
      let t = [],
        r = [];
      for (let n = 0, { length: o } = e; n < o; n++) {
        let { parentNode: i } = e[n];
        if (!i || !i.children || !i.children.length || r.indexOf(i) !== -1)
          continue;
        r.push(i);
        let s = i.firstElementChild;
        for (; s != null; )
          e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
      }
      return t;
    }
    var nX = Element.prototype.closest
      ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
      : (e, t) => {
          if (!document.documentElement.contains(e)) return null;
          let r = e;
          do {
            if (r[rs] && r[rs](t)) return r;
            r = r.parentNode;
          } while (r != null);
          return null;
        };
    Pe.getClosestElement = nX;
    function iX(e) {
      return e != null && typeof e == "object"
        ? e instanceof Element
          ? kG
          : HG
        : null;
    }
  });
  var ns = u((Pj, E_) => {
    var oX = pt(),
      g_ = Object.create,
      aX = (function () {
        function e() {}
        return function (t) {
          if (!oX(t)) return {};
          if (g_) return g_(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    E_.exports = aX;
  });
  var Ii = u((Dj, __) => {
    function sX() {}
    __.exports = sX;
  });
  var bi = u((Mj, y_) => {
    var uX = ns(),
      cX = Ii();
    function Oi(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    Oi.prototype = uX(cX.prototype);
    Oi.prototype.constructor = Oi;
    y_.exports = Oi;
  });
  var O_ = u((Fj, I_) => {
    var m_ = tr(),
      lX = Br(),
      fX = qe(),
      T_ = m_ ? m_.isConcatSpreadable : void 0;
    function dX(e) {
      return fX(e) || lX(e) || !!(T_ && e && e[T_]);
    }
    I_.exports = dX;
  });
  var A_ = u((Gj, S_) => {
    var pX = jn(),
      vX = O_();
    function b_(e, t, r, n, o) {
      var i = -1,
        s = e.length;
      for (r || (r = vX), o || (o = []); ++i < s; ) {
        var a = e[i];
        t > 0 && r(a)
          ? t > 1
            ? b_(a, t - 1, r, n, o)
            : pX(o, a)
          : n || (o[o.length] = a);
      }
      return o;
    }
    S_.exports = b_;
  });
  var R_ = u((Xj, w_) => {
    var hX = A_();
    function gX(e) {
      var t = e == null ? 0 : e.length;
      return t ? hX(e, 1) : [];
    }
    w_.exports = gX;
  });
  var N_ = u((Uj, C_) => {
    function EX(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    C_.exports = EX;
  });
  var L_ = u((Wj, q_) => {
    var _X = N_(),
      x_ = Math.max;
    function yX(e, t, r) {
      return (
        (t = x_(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, o = -1, i = x_(n.length - t, 0), s = Array(i);
            ++o < i;

          )
            s[o] = n[t + o];
          o = -1;
          for (var a = Array(t + 1); ++o < t; ) a[o] = n[o];
          return (a[t] = r(s)), _X(e, this, a);
        }
      );
    }
    q_.exports = yX;
  });
  var D_ = u((Vj, P_) => {
    function mX(e) {
      return function () {
        return e;
      };
    }
    P_.exports = mX;
  });
  var G_ = u((Bj, F_) => {
    var TX = D_(),
      M_ = Ja(),
      IX = ii(),
      OX = M_
        ? function (e, t) {
            return M_(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: TX(t),
              writable: !0,
            });
          }
        : IX;
    F_.exports = OX;
  });
  var U_ = u((kj, X_) => {
    var bX = 800,
      SX = 16,
      AX = Date.now;
    function wX(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = AX(),
          o = SX - (n - r);
        if (((r = n), o > 0)) {
          if (++t >= bX) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    X_.exports = wX;
  });
  var V_ = u((Hj, W_) => {
    var RX = G_(),
      CX = U_(),
      NX = CX(RX);
    W_.exports = NX;
  });
  var k_ = u((jj, B_) => {
    var xX = R_(),
      qX = L_(),
      LX = V_();
    function PX(e) {
      return LX(qX(e, void 0, xX), e + "");
    }
    B_.exports = PX;
  });
  var K_ = u((Kj, j_) => {
    var H_ = _a(),
      DX = H_ && new H_();
    j_.exports = DX;
  });
  var Y_ = u((zj, z_) => {
    function MX() {}
    z_.exports = MX;
  });
  var is = u((Yj, $_) => {
    var Q_ = K_(),
      FX = Y_(),
      GX = Q_
        ? function (e) {
            return Q_.get(e);
          }
        : FX;
    $_.exports = GX;
  });
  var J_ = u((Qj, Z_) => {
    var XX = {};
    Z_.exports = XX;
  });
  var os = u(($j, ty) => {
    var ey = J_(),
      UX = Object.prototype,
      WX = UX.hasOwnProperty;
    function VX(e) {
      for (
        var t = e.name + "", r = ey[t], n = WX.call(ey, t) ? r.length : 0;
        n--;

      ) {
        var o = r[n],
          i = o.func;
        if (i == null || i == e) return o.name;
      }
      return t;
    }
    ty.exports = VX;
  });
  var Ai = u((Zj, ry) => {
    var BX = ns(),
      kX = Ii(),
      HX = 4294967295;
    function Si(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = HX),
        (this.__views__ = []);
    }
    Si.prototype = BX(kX.prototype);
    Si.prototype.constructor = Si;
    ry.exports = Si;
  });
  var iy = u((Jj, ny) => {
    function jX(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    ny.exports = jX;
  });
  var ay = u((eK, oy) => {
    var KX = Ai(),
      zX = bi(),
      YX = iy();
    function QX(e) {
      if (e instanceof KX) return e.clone();
      var t = new zX(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = YX(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    oy.exports = QX;
  });
  var cy = u((tK, uy) => {
    var $X = Ai(),
      sy = bi(),
      ZX = Ii(),
      JX = qe(),
      eU = mt(),
      tU = ay(),
      rU = Object.prototype,
      nU = rU.hasOwnProperty;
    function wi(e) {
      if (eU(e) && !JX(e) && !(e instanceof $X)) {
        if (e instanceof sy) return e;
        if (nU.call(e, "__wrapped__")) return tU(e);
      }
      return new sy(e);
    }
    wi.prototype = ZX.prototype;
    wi.prototype.constructor = wi;
    uy.exports = wi;
  });
  var fy = u((rK, ly) => {
    var iU = Ai(),
      oU = is(),
      aU = os(),
      sU = cy();
    function uU(e) {
      var t = aU(e),
        r = sU[t];
      if (typeof r != "function" || !(t in iU.prototype)) return !1;
      if (e === r) return !0;
      var n = oU(r);
      return !!n && e === n[0];
    }
    ly.exports = uU;
  });
  var hy = u((nK, vy) => {
    var dy = bi(),
      cU = k_(),
      lU = is(),
      as = os(),
      fU = qe(),
      py = fy(),
      dU = "Expected a function",
      pU = 8,
      vU = 32,
      hU = 128,
      gU = 256;
    function EU(e) {
      return cU(function (t) {
        var r = t.length,
          n = r,
          o = dy.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var i = t[n];
          if (typeof i != "function") throw new TypeError(dU);
          if (o && !s && as(i) == "wrapper") var s = new dy([], !0);
        }
        for (n = s ? n : r; ++n < r; ) {
          i = t[n];
          var a = as(i),
            c = a == "wrapper" ? lU(i) : void 0;
          c &&
          py(c[0]) &&
          c[1] == (hU | pU | vU | gU) &&
          !c[4].length &&
          c[9] == 1
            ? (s = s[as(c[0])].apply(s, c[3]))
            : (s = i.length == 1 && py(i) ? s[a]() : s.thru(i));
        }
        return function () {
          var d = arguments,
            _ = d[0];
          if (s && d.length == 1 && fU(_)) return s.plant(_).value();
          for (var E = 0, y = r ? t[E].apply(this, d) : _; ++E < r; )
            y = t[E].call(this, y);
          return y;
        };
      });
    }
    vy.exports = EU;
  });
  var Ey = u((iK, gy) => {
    var _U = hy(),
      yU = _U();
    gy.exports = yU;
  });
  var yy = u((oK, _y) => {
    function mU(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    _y.exports = mU;
  });
  var Ty = u((aK, my) => {
    var TU = yy(),
      ss = oi();
    function IU(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = ss(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = ss(t)), (t = t === t ? t : 0)),
        TU(ss(e), t, r)
      );
    }
    my.exports = IU;
  });
  var Xy = u((qi) => {
    "use strict";
    var xi = lt().default;
    Object.defineProperty(qi, "__esModule", { value: !0 });
    qi.default = void 0;
    var ze = xi(Gr()),
      OU = xi(Ey()),
      bU = xi(ni()),
      SU = xi(Ty()),
      Kt = ke(),
      us = ds(),
      Ri = Ti(),
      AU = jt(),
      {
        MOUSE_CLICK: wU,
        MOUSE_SECOND_CLICK: RU,
        MOUSE_DOWN: CU,
        MOUSE_UP: NU,
        MOUSE_OVER: xU,
        MOUSE_OUT: qU,
        DROPDOWN_CLOSE: LU,
        DROPDOWN_OPEN: PU,
        SLIDER_ACTIVE: DU,
        SLIDER_INACTIVE: MU,
        TAB_ACTIVE: FU,
        TAB_INACTIVE: GU,
        NAVBAR_CLOSE: XU,
        NAVBAR_OPEN: UU,
        MOUSE_MOVE: WU,
        PAGE_SCROLL_DOWN: Ny,
        SCROLL_INTO_VIEW: xy,
        SCROLL_OUT_OF_VIEW: VU,
        PAGE_SCROLL_UP: BU,
        SCROLLING_IN_VIEW: kU,
        PAGE_FINISH: qy,
        ECOMMERCE_CART_CLOSE: HU,
        ECOMMERCE_CART_OPEN: jU,
        PAGE_START: Ly,
        PAGE_SCROLL: KU,
      } = Kt.EventTypeConsts,
      cs = "COMPONENT_ACTIVE",
      Py = "COMPONENT_INACTIVE",
      { COLON_DELIMITER: Iy } = Kt.IX2EngineConstants,
      { getNamespacedParameterId: Oy } = AU.IX2VanillaUtils,
      Dy = (e) => (t) => typeof t == "object" && e(t) ? !0 : t,
      sn = Dy(({ element: e, nativeEvent: t }) => e === t.target),
      zU = Dy(({ element: e, nativeEvent: t }) => e.contains(t.target)),
      Et = (0, OU.default)([sn, zU]),
      My = (e, t) => {
        if (t) {
          let { ixData: r } = e.getState(),
            { events: n } = r,
            o = n[t];
          if (o && !QU[o.eventTypeId]) return o;
        }
        return null;
      },
      YU = ({ store: e, event: t }) => {
        let { action: r } = t,
          { autoStopEventId: n } = r.config;
        return !!My(e, n);
      },
      je = ({ store: e, event: t, element: r, eventStateKey: n }, o) => {
        let { action: i, id: s } = t,
          { actionListId: a, autoStopEventId: c } = i.config,
          d = My(e, c);
        return (
          d &&
            (0, us.stopActionGroup)({
              store: e,
              eventId: c,
              eventTarget: r,
              eventStateKey: c + Iy + n.split(Iy)[1],
              actionListId: (0, bU.default)(d, "action.config.actionListId"),
            }),
          (0, us.stopActionGroup)({
            store: e,
            eventId: s,
            eventTarget: r,
            eventStateKey: n,
            actionListId: a,
          }),
          (0, us.startActionGroup)({
            store: e,
            eventId: s,
            eventTarget: r,
            eventStateKey: n,
            actionListId: a,
          }),
          o
        );
      },
      it = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n,
      un = { handler: it(Et, je) },
      Fy = (0, ze.default)({}, un, { types: [cs, Py].join(" ") }),
      ls = [
        { target: window, types: "resize orientationchange", throttle: !0 },
        {
          target: document,
          types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
          throttle: !0,
        },
      ],
      by = "mouseover mouseout",
      fs = { types: ls },
      QU = { PAGE_START: Ly, PAGE_FINISH: qy },
      an = (() => {
        let e = window.pageXOffset !== void 0,
          r =
            document.compatMode === "CSS1Compat"
              ? document.documentElement
              : document.body;
        return () => ({
          scrollLeft: e ? window.pageXOffset : r.scrollLeft,
          scrollTop: e ? window.pageYOffset : r.scrollTop,
          stiffScrollTop: (0, SU.default)(
            e ? window.pageYOffset : r.scrollTop,
            0,
            r.scrollHeight - window.innerHeight
          ),
          scrollWidth: r.scrollWidth,
          scrollHeight: r.scrollHeight,
          clientWidth: r.clientWidth,
          clientHeight: r.clientHeight,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        });
      })(),
      $U = (e, t) =>
        !(
          e.left > t.right ||
          e.right < t.left ||
          e.top > t.bottom ||
          e.bottom < t.top
        ),
      ZU = ({ element: e, nativeEvent: t }) => {
        let { type: r, target: n, relatedTarget: o } = t,
          i = e.contains(n);
        if (r === "mouseover" && i) return !0;
        let s = e.contains(o);
        return !!(r === "mouseout" && i && s);
      },
      JU = (e) => {
        let {
            element: t,
            event: { config: r },
          } = e,
          { clientWidth: n, clientHeight: o } = an(),
          i = r.scrollOffsetValue,
          c = r.scrollOffsetUnit === "PX" ? i : (o * (i || 0)) / 100;
        return $U(t.getBoundingClientRect(), {
          left: 0,
          top: c,
          right: n,
          bottom: o - c,
        });
      },
      Gy = (e) => (t, r) => {
        let { type: n } = t.nativeEvent,
          o = [cs, Py].indexOf(n) !== -1 ? n === cs : r.isActive,
          i = (0, ze.default)({}, r, { isActive: o });
        return ((!r || i.isActive !== r.isActive) && e(t, i)) || i;
      },
      Sy = (e) => (t, r) => {
        let n = { elementHovered: ZU(t) };
        return (
          ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
            e(t, n)) ||
          n
        );
      },
      eW = (e) => (t, r) => {
        let n = (0, ze.default)({}, r, { elementVisible: JU(t) });
        return (
          ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
            e(t, n)) ||
          n
        );
      },
      Ay =
        (e) =>
        (t, r = {}) => {
          let { stiffScrollTop: n, scrollHeight: o, innerHeight: i } = an(),
            {
              event: { config: s, eventTypeId: a },
            } = t,
            { scrollOffsetValue: c, scrollOffsetUnit: d } = s,
            _ = d === "PX",
            E = o - i,
            y = Number((n / E).toFixed(2));
          if (r && r.percentTop === y) return r;
          let T = (_ ? c : (i * (c || 0)) / 100) / E,
            R,
            A,
            G = 0;
          r &&
            ((R = y > r.percentTop),
            (A = r.scrollingDown !== R),
            (G = A ? y : r.anchorTop));
          let N = a === Ny ? y >= G + T : y <= G - T,
            q = (0, ze.default)({}, r, {
              percentTop: y,
              inBounds: N,
              anchorTop: G,
              scrollingDown: R,
            });
          return (r && N && (A || q.inBounds !== r.inBounds) && e(t, q)) || q;
        },
      tW = (e, t) =>
        e.left > t.left &&
        e.left < t.right &&
        e.top > t.top &&
        e.top < t.bottom,
      rW = (e) => (t, r) => {
        let n = { finished: document.readyState === "complete" };
        return n.finished && !(r && r.finshed) && e(t), n;
      },
      nW = (e) => (t, r) => {
        let n = { started: !0 };
        return r || e(t), n;
      },
      wy =
        (e) =>
        (t, r = { clickCount: 0 }) => {
          let n = { clickCount: (r.clickCount % 2) + 1 };
          return (n.clickCount !== r.clickCount && e(t, n)) || n;
        },
      Ci = (e = !0) =>
        (0, ze.default)({}, Fy, {
          handler: it(
            e ? Et : sn,
            Gy((t, r) => (r.isActive ? un.handler(t, r) : r))
          ),
        }),
      Ni = (e = !0) =>
        (0, ze.default)({}, Fy, {
          handler: it(
            e ? Et : sn,
            Gy((t, r) => (r.isActive ? r : un.handler(t, r)))
          ),
        }),
      Ry = (0, ze.default)({}, fs, {
        handler: eW((e, t) => {
          let { elementVisible: r } = t,
            { event: n, store: o } = e,
            { ixData: i } = o.getState(),
            { events: s } = i;
          return !s[n.action.config.autoStopEventId] && t.triggered
            ? t
            : (n.eventTypeId === xy) === r
            ? (je(e), (0, ze.default)({}, t, { triggered: !0 }))
            : t;
        }),
      }),
      Cy = 0.05,
      iW = {
        [DU]: Ci(),
        [MU]: Ni(),
        [PU]: Ci(),
        [LU]: Ni(),
        [UU]: Ci(!1),
        [XU]: Ni(!1),
        [FU]: Ci(),
        [GU]: Ni(),
        [jU]: { types: "ecommerce-cart-open", handler: it(Et, je) },
        [HU]: { types: "ecommerce-cart-close", handler: it(Et, je) },
        [wU]: {
          types: "click",
          handler: it(
            Et,
            wy((e, { clickCount: t }) => {
              YU(e) ? t === 1 && je(e) : je(e);
            })
          ),
        },
        [RU]: {
          types: "click",
          handler: it(
            Et,
            wy((e, { clickCount: t }) => {
              t === 2 && je(e);
            })
          ),
        },
        [CU]: (0, ze.default)({}, un, { types: "mousedown" }),
        [NU]: (0, ze.default)({}, un, { types: "mouseup" }),
        [xU]: {
          types: by,
          handler: it(
            Et,
            Sy((e, t) => {
              t.elementHovered && je(e);
            })
          ),
        },
        [qU]: {
          types: by,
          handler: it(
            Et,
            Sy((e, t) => {
              t.elementHovered || je(e);
            })
          ),
        },
        [WU]: {
          types: "mousemove mouseout scroll",
          handler: (
            {
              store: e,
              element: t,
              eventConfig: r,
              nativeEvent: n,
              eventStateKey: o,
            },
            i = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
          ) => {
            let {
                basedOn: s,
                selectedAxis: a,
                continuousParameterGroupId: c,
                reverse: d,
                restingState: _ = 0,
              } = r,
              {
                clientX: E = i.clientX,
                clientY: y = i.clientY,
                pageX: T = i.pageX,
                pageY: R = i.pageY,
              } = n,
              A = a === "X_AXIS",
              G = n.type === "mouseout",
              N = _ / 100,
              q = c,
              w = !1;
            switch (s) {
              case Kt.EventBasedOn.VIEWPORT: {
                N = A
                  ? Math.min(E, window.innerWidth) / window.innerWidth
                  : Math.min(y, window.innerHeight) / window.innerHeight;
                break;
              }
              case Kt.EventBasedOn.PAGE: {
                let {
                  scrollLeft: D,
                  scrollTop: L,
                  scrollWidth: M,
                  scrollHeight: H,
                } = an();
                N = A ? Math.min(D + T, M) / M : Math.min(L + R, H) / H;
                break;
              }
              case Kt.EventBasedOn.ELEMENT:
              default: {
                q = Oy(o, c);
                let D = n.type.indexOf("mouse") === 0;
                if (D && Et({ element: t, nativeEvent: n }) !== !0) break;
                let L = t.getBoundingClientRect(),
                  { left: M, top: H, width: J, height: ee } = L;
                if (!D && !tW({ left: E, top: y }, L)) break;
                (w = !0), (N = A ? (E - M) / J : (y - H) / ee);
                break;
              }
            }
            return (
              G && (N > 1 - Cy || N < Cy) && (N = Math.round(N)),
              (s !== Kt.EventBasedOn.ELEMENT || w || w !== i.elementHovered) &&
                ((N = d ? 1 - N : N),
                e.dispatch((0, Ri.parameterChanged)(q, N))),
              { elementHovered: w, clientX: E, clientY: y, pageX: T, pageY: R }
            );
          },
        },
        [KU]: {
          types: ls,
          handler: ({ store: e, eventConfig: t }) => {
            let { continuousParameterGroupId: r, reverse: n } = t,
              { scrollTop: o, scrollHeight: i, clientHeight: s } = an(),
              a = o / (i - s);
            (a = n ? 1 - a : a), e.dispatch((0, Ri.parameterChanged)(r, a));
          },
        },
        [kU]: {
          types: ls,
          handler: (
            { element: e, store: t, eventConfig: r, eventStateKey: n },
            o = { scrollPercent: 0 }
          ) => {
            let {
                scrollLeft: i,
                scrollTop: s,
                scrollWidth: a,
                scrollHeight: c,
                clientHeight: d,
              } = an(),
              {
                basedOn: _,
                selectedAxis: E,
                continuousParameterGroupId: y,
                startsEntering: T,
                startsExiting: R,
                addEndOffset: A,
                addStartOffset: G,
                addOffsetValue: N = 0,
                endOffsetValue: q = 0,
              } = r,
              w = E === "X_AXIS";
            if (_ === Kt.EventBasedOn.VIEWPORT) {
              let D = w ? i / a : s / c;
              return (
                D !== o.scrollPercent &&
                  t.dispatch((0, Ri.parameterChanged)(y, D)),
                { scrollPercent: D }
              );
            } else {
              let D = Oy(n, y),
                L = e.getBoundingClientRect(),
                M = (G ? N : 0) / 100,
                H = (A ? q : 0) / 100;
              (M = T ? M : 1 - M), (H = R ? H : 1 - H);
              let J = L.top + Math.min(L.height * M, d),
                se = L.top + L.height * H - J,
                ne = Math.min(d + se, c),
                O = Math.min(Math.max(0, d - J), ne) / ne;
              return (
                O !== o.scrollPercent &&
                  t.dispatch((0, Ri.parameterChanged)(D, O)),
                { scrollPercent: O }
              );
            }
          },
        },
        [xy]: Ry,
        [VU]: Ry,
        [Ny]: (0, ze.default)({}, fs, {
          handler: Ay((e, t) => {
            t.scrollingDown && je(e);
          }),
        }),
        [BU]: (0, ze.default)({}, fs, {
          handler: Ay((e, t) => {
            t.scrollingDown || je(e);
          }),
        }),
        [qy]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: it(sn, rW(je)),
        },
        [Ly]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: it(sn, nW(je)),
        },
      };
    qi.default = iW;
  });
  var ds = u((Lt) => {
    "use strict";
    var at = lt().default,
      oW = $t().default;
    Object.defineProperty(Lt, "__esModule", { value: !0 });
    Lt.observeRequests = PW;
    Lt.startActionGroup = ys;
    Lt.startEngine = Mi;
    Lt.stopActionGroup = _s;
    Lt.stopAllActionGroups = zy;
    Lt.stopEngine = Fi;
    var aW = at(Gr()),
      sW = at(rE()),
      uW = at(Pa()),
      qt = at(ni()),
      cW = at(TE()),
      lW = at(KE()),
      fW = at(YE()),
      dW = at($E()),
      cn = at(n_()),
      pW = at(l_()),
      ot = ke(),
      Vy = jt(),
      Se = Ti(),
      Ce = oW(h_()),
      vW = at(Xy()),
      hW = ["store", "computedStyle"],
      gW = Object.keys(ot.QuickEffectIds),
      ps = (e) => gW.includes(e),
      {
        COLON_DELIMITER: vs,
        BOUNDARY_SELECTOR: Li,
        HTML_ELEMENT: By,
        RENDER_GENERAL: EW,
        W_MOD_IX: Uy,
      } = ot.IX2EngineConstants,
      {
        getAffectedElements: Pi,
        getElementId: _W,
        getDestinationValues: hs,
        observeStore: zt,
        getInstanceId: yW,
        renderHTMLElement: mW,
        clearAllStyles: ky,
        getMaxDurationItemIndex: TW,
        getComputedStyle: IW,
        getInstanceOrigin: OW,
        reduceListToGroup: bW,
        shouldNamespaceEventParameter: SW,
        getNamespacedParameterId: AW,
        shouldAllowMediaQuery: Di,
        cleanupHTMLElement: wW,
        stringifyTarget: RW,
        mediaQueriesEqual: CW,
        shallowEqual: NW,
      } = Vy.IX2VanillaUtils,
      {
        isPluginType: gs,
        createPluginInstance: Es,
        getPluginDuration: xW,
      } = Vy.IX2VanillaPlugins,
      Wy = navigator.userAgent,
      qW = Wy.match(/iPad/i) || Wy.match(/iPhone/),
      LW = 12;
    function PW(e) {
      zt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: FW }),
        zt({
          store: e,
          select: ({ ixRequest: t }) => t.playback,
          onChange: GW,
        }),
        zt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: XW }),
        zt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: UW });
    }
    function DW(e) {
      zt({
        store: e,
        select: ({ ixSession: t }) => t.mediaQueryKey,
        onChange: () => {
          Fi(e),
            ky({ store: e, elementApi: Ce }),
            Mi({ store: e, allowEvents: !0 }),
            Hy();
        },
      });
    }
    function MW(e, t) {
      let r = zt({
        store: e,
        select: ({ ixSession: n }) => n.tick,
        onChange: (n) => {
          t(n), r();
        },
      });
    }
    function FW({ rawData: e, defer: t }, r) {
      let n = () => {
        Mi({ store: r, rawData: e, allowEvents: !0 }), Hy();
      };
      t ? setTimeout(n, 0) : n();
    }
    function Hy() {
      document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
    }
    function GW(e, t) {
      let {
          actionTypeId: r,
          actionListId: n,
          actionItemId: o,
          eventId: i,
          allowEvents: s,
          immediate: a,
          testManual: c,
          verbose: d = !0,
        } = e,
        { rawData: _ } = e;
      if (n && o && _ && a) {
        let E = _.actionLists[n];
        E && (_ = bW({ actionList: E, actionItemId: o, rawData: _ }));
      }
      if (
        (Mi({ store: t, rawData: _, allowEvents: s, testManual: c }),
        (n && r === ot.ActionTypeConsts.GENERAL_START_ACTION) || ps(r))
      ) {
        _s({ store: t, actionListId: n }),
          Ky({ store: t, actionListId: n, eventId: i });
        let E = ys({
          store: t,
          eventId: i,
          actionListId: n,
          immediate: a,
          verbose: d,
        });
        d &&
          E &&
          t.dispatch(
            (0, Se.actionListPlaybackChanged)({
              actionListId: n,
              isPlaying: !a,
            })
          );
      }
    }
    function XW({ actionListId: e }, t) {
      e ? _s({ store: t, actionListId: e }) : zy({ store: t }), Fi(t);
    }
    function UW(e, t) {
      Fi(t), ky({ store: t, elementApi: Ce });
    }
    function Mi({ store: e, rawData: t, allowEvents: r, testManual: n }) {
      let { ixSession: o } = e.getState();
      t && e.dispatch((0, Se.rawDataImported)(t)),
        o.active ||
          (e.dispatch(
            (0, Se.sessionInitialized)({
              hasBoundaryNodes: !!document.querySelector(Li),
              reducedMotion:
                document.body.hasAttribute("data-wf-ix-vacation") &&
                window.matchMedia("(prefers-reduced-motion)").matches,
            })
          ),
          r &&
            (jW(e),
            WW(),
            e.getState().ixSession.hasDefinedMediaQueries && DW(e)),
          e.dispatch((0, Se.sessionStarted)()),
          VW(e, n));
    }
    function WW() {
      let { documentElement: e } = document;
      e.className.indexOf(Uy) === -1 && (e.className += ` ${Uy}`);
    }
    function VW(e, t) {
      let r = (n) => {
        let { ixSession: o, ixParameters: i } = e.getState();
        o.active &&
          (e.dispatch((0, Se.animationFrameChanged)(n, i)),
          t ? MW(e, r) : requestAnimationFrame(r));
      };
      r(window.performance.now());
    }
    function Fi(e) {
      let { ixSession: t } = e.getState();
      if (t.active) {
        let { eventListeners: r } = t;
        r.forEach(BW), e.dispatch((0, Se.sessionStopped)());
      }
    }
    function BW({ target: e, listenerParams: t }) {
      e.removeEventListener.apply(e, t);
    }
    function kW({
      store: e,
      eventStateKey: t,
      eventTarget: r,
      eventId: n,
      eventConfig: o,
      actionListId: i,
      parameterGroup: s,
      smoothing: a,
      restingValue: c,
    }) {
      let { ixData: d, ixSession: _ } = e.getState(),
        { events: E } = d,
        y = E[n],
        { eventTypeId: T } = y,
        R = {},
        A = {},
        G = [],
        { continuousActionGroups: N } = s,
        { id: q } = s;
      SW(T, o) && (q = AW(t, q));
      let w = _.hasBoundaryNodes && r ? Ce.getClosestElement(r, Li) : null;
      N.forEach((D) => {
        let { keyframe: L, actionItems: M } = D;
        M.forEach((H) => {
          let { actionTypeId: J } = H,
            { target: ee } = H.config;
          if (!ee) return;
          let se = ee.boundaryMode ? w : null,
            ne = RW(ee) + vs + J;
          if (((A[ne] = HW(A[ne], L, H)), !R[ne])) {
            R[ne] = !0;
            let { config: V } = H;
            Pi({
              config: V,
              event: y,
              eventTarget: r,
              elementRoot: se,
              elementApi: Ce,
            }).forEach((O) => {
              G.push({ element: O, key: ne });
            });
          }
        });
      }),
        G.forEach(({ element: D, key: L }) => {
          let M = A[L],
            H = (0, qt.default)(M, "[0].actionItems[0]", {}),
            { actionTypeId: J } = H,
            ee = gs(J) ? Es(J)(D, H) : null,
            se = hs({ element: D, actionItem: H, elementApi: Ce }, ee);
          ms({
            store: e,
            element: D,
            eventId: n,
            actionListId: i,
            actionItem: H,
            destination: se,
            continuous: !0,
            parameterId: q,
            actionGroups: M,
            smoothing: a,
            restingValue: c,
            pluginInstance: ee,
          });
        });
    }
    function HW(e = [], t, r) {
      let n = [...e],
        o;
      return (
        n.some((i, s) => (i.keyframe === t ? ((o = s), !0) : !1)),
        o == null && ((o = n.length), n.push({ keyframe: t, actionItems: [] })),
        n[o].actionItems.push(r),
        n
      );
    }
    function jW(e) {
      let { ixData: t } = e.getState(),
        { eventTypeMap: r } = t;
      jy(e),
        (0, cn.default)(r, (o, i) => {
          let s = vW.default[i];
          if (!s) {
            console.warn(`IX2 event type not configured: ${i}`);
            return;
          }
          ZW({ logic: s, store: e, events: o });
        });
      let { ixSession: n } = e.getState();
      n.eventListeners.length && zW(e);
    }
    var KW = ["resize", "orientationchange"];
    function zW(e) {
      let t = () => {
        jy(e);
      };
      KW.forEach((r) => {
        window.addEventListener(r, t),
          e.dispatch((0, Se.eventListenerAdded)(window, [r, t]));
      }),
        t();
    }
    function jy(e) {
      let { ixSession: t, ixData: r } = e.getState(),
        n = window.innerWidth;
      if (n !== t.viewportWidth) {
        let { mediaQueries: o } = r;
        e.dispatch((0, Se.viewportWidthChanged)({ width: n, mediaQueries: o }));
      }
    }
    var YW = (e, t) => (0, lW.default)((0, dW.default)(e, t), fW.default),
      QW = (e, t) => {
        (0, cn.default)(e, (r, n) => {
          r.forEach((o, i) => {
            let s = n + vs + i;
            t(o, n, s);
          });
        });
      },
      $W = (e) => {
        let t = { target: e.target, targets: e.targets };
        return Pi({ config: t, elementApi: Ce });
      };
    function ZW({ logic: e, store: t, events: r }) {
      JW(r);
      let { types: n, handler: o } = e,
        { ixData: i } = t.getState(),
        { actionLists: s } = i,
        a = YW(r, $W);
      if (!(0, cW.default)(a)) return;
      (0, cn.default)(a, (E, y) => {
        let T = r[y],
          { action: R, id: A, mediaQueries: G = i.mediaQueryKeys } = T,
          { actionListId: N } = R.config;
        CW(G, i.mediaQueryKeys) || t.dispatch((0, Se.mediaQueriesDefined)()),
          R.actionTypeId === ot.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
            (Array.isArray(T.config) ? T.config : [T.config]).forEach((w) => {
              let { continuousParameterGroupId: D } = w,
                L = (0, qt.default)(s, `${N}.continuousParameterGroups`, []),
                M = (0, uW.default)(L, ({ id: ee }) => ee === D),
                H = (w.smoothing || 0) / 100,
                J = (w.restingState || 0) / 100;
              M &&
                E.forEach((ee, se) => {
                  let ne = A + vs + se;
                  kW({
                    store: t,
                    eventStateKey: ne,
                    eventTarget: ee,
                    eventId: A,
                    eventConfig: w,
                    actionListId: N,
                    parameterGroup: M,
                    smoothing: H,
                    restingValue: J,
                  });
                });
            }),
          (R.actionTypeId === ot.ActionTypeConsts.GENERAL_START_ACTION ||
            ps(R.actionTypeId)) &&
            Ky({ store: t, actionListId: N, eventId: A });
      });
      let c = (E) => {
          let { ixSession: y } = t.getState();
          QW(a, (T, R, A) => {
            let G = r[R],
              N = y.eventState[A],
              { action: q, mediaQueries: w = i.mediaQueryKeys } = G;
            if (!Di(w, y.mediaQueryKey)) return;
            let D = (L = {}) => {
              let M = o(
                {
                  store: t,
                  element: T,
                  event: G,
                  eventConfig: L,
                  nativeEvent: E,
                  eventStateKey: A,
                },
                N
              );
              NW(M, N) || t.dispatch((0, Se.eventStateChanged)(A, M));
            };
            q.actionTypeId === ot.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION
              ? (Array.isArray(G.config) ? G.config : [G.config]).forEach(D)
              : D();
          });
        },
        d = (0, pW.default)(c, LW),
        _ = ({ target: E = document, types: y, throttle: T }) => {
          y.split(" ")
            .filter(Boolean)
            .forEach((R) => {
              let A = T ? d : c;
              E.addEventListener(R, A),
                t.dispatch((0, Se.eventListenerAdded)(E, [R, A]));
            });
        };
      Array.isArray(n) ? n.forEach(_) : typeof n == "string" && _(e);
    }
    function JW(e) {
      if (!qW) return;
      let t = {},
        r = "";
      for (let n in e) {
        let { eventTypeId: o, target: i } = e[n],
          s = Ce.getQuerySelector(i);
        t[s] ||
          ((o === ot.EventTypeConsts.MOUSE_CLICK ||
            o === ot.EventTypeConsts.MOUSE_SECOND_CLICK) &&
            ((t[s] = !0),
            (r += s + "{cursor: pointer;touch-action: manipulation;}")));
      }
      if (r) {
        let n = document.createElement("style");
        (n.textContent = r), document.body.appendChild(n);
      }
    }
    function Ky({ store: e, actionListId: t, eventId: r }) {
      let { ixData: n, ixSession: o } = e.getState(),
        { actionLists: i, events: s } = n,
        a = s[r],
        c = i[t];
      if (c && c.useFirstGroupAsInitialState) {
        let d = (0, qt.default)(c, "actionItemGroups[0].actionItems", []),
          _ = (0, qt.default)(a, "mediaQueries", n.mediaQueryKeys);
        if (!Di(_, o.mediaQueryKey)) return;
        d.forEach((E) => {
          var y;
          let { config: T, actionTypeId: R } = E,
            A =
              (T == null || (y = T.target) === null || y === void 0
                ? void 0
                : y.useEventTarget) === !0
                ? { target: a.target, targets: a.targets }
                : T,
            G = Pi({ config: A, event: a, elementApi: Ce }),
            N = gs(R);
          G.forEach((q) => {
            let w = N ? Es(R)(q, E) : null;
            ms({
              destination: hs({ element: q, actionItem: E, elementApi: Ce }, w),
              immediate: !0,
              store: e,
              element: q,
              eventId: r,
              actionItem: E,
              actionListId: t,
              pluginInstance: w,
            });
          });
        });
      }
    }
    function zy({ store: e }) {
      let { ixInstances: t } = e.getState();
      (0, cn.default)(t, (r) => {
        if (!r.continuous) {
          let { actionListId: n, verbose: o } = r;
          Ts(r, e),
            o &&
              e.dispatch(
                (0, Se.actionListPlaybackChanged)({
                  actionListId: n,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function _s({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: o,
    }) {
      let { ixInstances: i, ixSession: s } = e.getState(),
        a = s.hasBoundaryNodes && r ? Ce.getClosestElement(r, Li) : null;
      (0, cn.default)(i, (c) => {
        let d = (0, qt.default)(c, "actionItem.config.target.boundaryMode"),
          _ = n ? c.eventStateKey === n : !0;
        if (c.actionListId === o && c.eventId === t && _) {
          if (a && d && !Ce.elementContains(a, c.element)) return;
          Ts(c, e),
            c.verbose &&
              e.dispatch(
                (0, Se.actionListPlaybackChanged)({
                  actionListId: o,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function ys({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: o,
      groupIndex: i = 0,
      immediate: s,
      verbose: a,
    }) {
      var c;
      let { ixData: d, ixSession: _ } = e.getState(),
        { events: E } = d,
        y = E[t] || {},
        { mediaQueries: T = d.mediaQueryKeys } = y,
        R = (0, qt.default)(d, `actionLists.${o}`, {}),
        { actionItemGroups: A, useFirstGroupAsInitialState: G } = R;
      if (!A || !A.length) return !1;
      i >= A.length && (0, qt.default)(y, "config.loop") && (i = 0),
        i === 0 && G && i++;
      let q =
          (i === 0 || (i === 1 && G)) &&
          ps((c = y.action) === null || c === void 0 ? void 0 : c.actionTypeId)
            ? y.config.delay
            : void 0,
        w = (0, qt.default)(A, [i, "actionItems"], []);
      if (!w.length || !Di(T, _.mediaQueryKey)) return !1;
      let D = _.hasBoundaryNodes && r ? Ce.getClosestElement(r, Li) : null,
        L = TW(w),
        M = !1;
      return (
        w.forEach((H, J) => {
          let { config: ee, actionTypeId: se } = H,
            ne = gs(se),
            { target: V } = ee;
          if (!V) return;
          let O = V.boundaryMode ? D : null;
          Pi({
            config: ee,
            event: y,
            eventTarget: r,
            elementRoot: O,
            elementApi: Ce,
          }).forEach((B, j) => {
            let F = ne ? Es(se)(B, H) : null,
              W = ne ? xW(se)(B, H) : null;
            M = !0;
            let b = L === J && j === 0,
              k = IW({ element: B, actionItem: H }),
              f = hs({ element: B, actionItem: H, elementApi: Ce }, F);
            ms({
              store: e,
              element: B,
              actionItem: H,
              eventId: t,
              eventTarget: r,
              eventStateKey: n,
              actionListId: o,
              groupIndex: i,
              isCarrier: b,
              computedStyle: k,
              destination: f,
              immediate: s,
              verbose: a,
              pluginInstance: F,
              pluginDuration: W,
              instanceDelay: q,
            });
          });
        }),
        M
      );
    }
    function ms(e) {
      var t;
      let { store: r, computedStyle: n } = e,
        o = (0, sW.default)(e, hW),
        {
          element: i,
          actionItem: s,
          immediate: a,
          pluginInstance: c,
          continuous: d,
          restingValue: _,
          eventId: E,
        } = o,
        y = !d,
        T = yW(),
        { ixElements: R, ixSession: A, ixData: G } = r.getState(),
        N = _W(R, i),
        { refState: q } = R[N] || {},
        w = Ce.getRefType(i),
        D = A.reducedMotion && ot.ReducedMotionTypes[s.actionTypeId],
        L;
      if (D && d)
        switch (
          (t = G.events[E]) === null || t === void 0 ? void 0 : t.eventTypeId
        ) {
          case ot.EventTypeConsts.MOUSE_MOVE:
          case ot.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
            L = _;
            break;
          default:
            L = 0.5;
            break;
        }
      let M = OW(i, q, n, s, Ce, c);
      if (
        (r.dispatch(
          (0, Se.instanceAdded)(
            (0, aW.default)(
              {
                instanceId: T,
                elementId: N,
                origin: M,
                refType: w,
                skipMotion: D,
                skipToValue: L,
              },
              o
            )
          )
        ),
        Yy(document.body, "ix2-animation-started", T),
        a)
      ) {
        eV(r, T);
        return;
      }
      zt({ store: r, select: ({ ixInstances: H }) => H[T], onChange: Qy }),
        y && r.dispatch((0, Se.instanceStarted)(T, A.tick));
    }
    function Ts(e, t) {
      Yy(document.body, "ix2-animation-stopping", {
        instanceId: e.id,
        state: t.getState(),
      });
      let { elementId: r, actionItem: n } = e,
        { ixElements: o } = t.getState(),
        { ref: i, refType: s } = o[r] || {};
      s === By && wW(i, n, Ce), t.dispatch((0, Se.instanceRemoved)(e.id));
    }
    function Yy(e, t, r) {
      let n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
    }
    function eV(e, t) {
      let { ixParameters: r } = e.getState();
      e.dispatch((0, Se.instanceStarted)(t, 0)),
        e.dispatch((0, Se.animationFrameChanged)(performance.now(), r));
      let { ixInstances: n } = e.getState();
      Qy(n[t], e);
    }
    function Qy(e, t) {
      let {
          active: r,
          continuous: n,
          complete: o,
          elementId: i,
          actionItem: s,
          actionTypeId: a,
          renderType: c,
          current: d,
          groupIndex: _,
          eventId: E,
          eventTarget: y,
          eventStateKey: T,
          actionListId: R,
          isCarrier: A,
          styleProp: G,
          verbose: N,
          pluginInstance: q,
        } = e,
        { ixData: w, ixSession: D } = t.getState(),
        { events: L } = w,
        M = L[E] || {},
        { mediaQueries: H = w.mediaQueryKeys } = M;
      if (Di(H, D.mediaQueryKey) && (n || r || o)) {
        if (d || (c === EW && o)) {
          t.dispatch((0, Se.elementStateChanged)(i, a, d, s));
          let { ixElements: J } = t.getState(),
            { ref: ee, refType: se, refState: ne } = J[i] || {},
            V = ne && ne[a];
          switch (se) {
            case By: {
              mW(ee, ne, V, E, s, G, Ce, c, q);
              break;
            }
          }
        }
        if (o) {
          if (A) {
            let J = ys({
              store: t,
              eventId: E,
              eventTarget: y,
              eventStateKey: T,
              actionListId: R,
              groupIndex: _ + 1,
              verbose: N,
            });
            N &&
              !J &&
              t.dispatch(
                (0, Se.actionListPlaybackChanged)({
                  actionListId: R,
                  isPlaying: !1,
                })
              );
          }
          Ts(e, t);
        }
      }
    }
  });
  var Zy = u((Ot) => {
    "use strict";
    var tV = $t().default,
      rV = lt().default;
    Object.defineProperty(Ot, "__esModule", { value: !0 });
    Ot.actions = void 0;
    Ot.destroy = $y;
    Ot.init = sV;
    Ot.setEnv = aV;
    Ot.store = void 0;
    Xl();
    var nV = Jo(),
      iV = rV(tE()),
      Is = ds(),
      oV = tV(Ti());
    Ot.actions = oV;
    var Gi = (0, nV.createStore)(iV.default);
    Ot.store = Gi;
    function aV(e) {
      e() && (0, Is.observeRequests)(Gi);
    }
    function sV(e) {
      $y(), (0, Is.startEngine)({ store: Gi, rawData: e, allowEvents: !0 });
    }
    function $y() {
      (0, Is.stopEngine)(Gi);
    }
  });
  var rm = u((lK, tm) => {
    var Jy = Be(),
      em = Zy();
    em.setEnv(Jy.env);
    Jy.define(
      "ix2",
      (tm.exports = function () {
        return em;
      })
    );
  });
  var im = u((fK, nm) => {
    var Sr = Be();
    Sr.define(
      "links",
      (nm.exports = function (e, t) {
        var r = {},
          n = e(window),
          o,
          i = Sr.env(),
          s = window.location,
          a = document.createElement("a"),
          c = "w--current",
          d = /index\.(html|php)$/,
          _ = /\/$/,
          E,
          y;
        r.ready = r.design = r.preview = T;
        function T() {
          (o = i && Sr.env("design")),
            (y = Sr.env("slug") || s.pathname || ""),
            Sr.scroll.off(A),
            (E = []);
          for (var N = document.links, q = 0; q < N.length; ++q) R(N[q]);
          E.length && (Sr.scroll.on(A), A());
        }
        function R(N) {
          var q =
            (o && N.getAttribute("href-disabled")) || N.getAttribute("href");
          if (((a.href = q), !(q.indexOf(":") >= 0))) {
            var w = e(N);
            if (
              a.hash.length > 1 &&
              a.host + a.pathname === s.host + s.pathname
            ) {
              if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
              var D = e(a.hash);
              D.length && E.push({ link: w, sec: D, active: !1 });
              return;
            }
            if (!(q === "#" || q === "")) {
              var L = a.href === s.href || q === y || (d.test(q) && _.test(y));
              G(w, c, L);
            }
          }
        }
        function A() {
          var N = n.scrollTop(),
            q = n.height();
          t.each(E, function (w) {
            var D = w.link,
              L = w.sec,
              M = L.offset().top,
              H = L.outerHeight(),
              J = q * 0.5,
              ee = L.is(":visible") && M + H - J >= N && M + J <= N + q;
            w.active !== ee && ((w.active = ee), G(D, c, ee));
          });
        }
        function G(N, q, w) {
          var D = N.hasClass(q);
          (w && D) || (!w && !D) || (w ? N.addClass(q) : N.removeClass(q));
        }
        return r;
      })
    );
  });
  var am = u((dK, om) => {
    var Xi = Be();
    Xi.define(
      "scroll",
      (om.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = R() ? null : window.history,
          o = e(window),
          i = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (V) {
              window.setTimeout(V, 15);
            },
          c = Xi.env("editor") ? ".w-editor-body" : "body",
          d =
            "header, " +
            c +
            " > .header, " +
            c +
            " > .w-nav:not([data-no-scroll])",
          _ = 'a[href="#"]',
          E = 'a[href*="#"]:not(.w-tab-link):not(' + _ + ")",
          y = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          T = document.createElement("style");
        T.appendChild(document.createTextNode(y));
        function R() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var A = /^#[a-zA-Z0-9][\w:.-]*$/;
        function G(V) {
          return A.test(V.hash) && V.host + V.pathname === r.host + r.pathname;
        }
        let N =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function q() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            N.matches
          );
        }
        function w(V, O) {
          var U;
          switch (O) {
            case "add":
              (U = V.attr("tabindex")),
                U
                  ? V.attr("data-wf-tabindex-swap", U)
                  : V.attr("tabindex", "-1");
              break;
            case "remove":
              (U = V.attr("data-wf-tabindex-swap")),
                U
                  ? (V.attr("tabindex", U),
                    V.removeAttr("data-wf-tabindex-swap"))
                  : V.removeAttr("tabindex");
              break;
          }
          V.toggleClass("wf-force-outline-none", O === "add");
        }
        function D(V) {
          var O = V.currentTarget;
          if (
            !(
              Xi.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(O.className))
            )
          ) {
            var U = G(O) ? O.hash : "";
            if (U !== "") {
              var B = e(U);
              B.length &&
                (V && (V.preventDefault(), V.stopPropagation()),
                L(U, V),
                window.setTimeout(
                  function () {
                    M(B, function () {
                      w(B, "add"),
                        B.get(0).focus({ preventScroll: !0 }),
                        w(B, "remove");
                    });
                  },
                  V ? 0 : 300
                ));
            }
          }
        }
        function L(V) {
          if (
            r.hash !== V &&
            n &&
            n.pushState &&
            !(Xi.env.chrome && r.protocol === "file:")
          ) {
            var O = n.state && n.state.hash;
            O !== V && n.pushState({ hash: V }, "", V);
          }
        }
        function M(V, O) {
          var U = o.scrollTop(),
            B = H(V);
          if (U !== B) {
            var j = J(V, U, B),
              F = Date.now(),
              W = function () {
                var b = Date.now() - F;
                window.scroll(0, ee(U, B, b, j)),
                  b <= j ? a(W) : typeof O == "function" && O();
              };
            a(W);
          }
        }
        function H(V) {
          var O = e(d),
            U = O.css("position") === "fixed" ? O.outerHeight() : 0,
            B = V.offset().top - U;
          if (V.data("scroll") === "mid") {
            var j = o.height() - U,
              F = V.outerHeight();
            F < j && (B -= Math.round((j - F) / 2));
          }
          return B;
        }
        function J(V, O, U) {
          if (q()) return 0;
          var B = 1;
          return (
            s.add(V).each(function (j, F) {
              var W = parseFloat(F.getAttribute("data-scroll-time"));
              !isNaN(W) && W >= 0 && (B = W);
            }),
            (472.143 * Math.log(Math.abs(O - U) + 125) - 2e3) * B
          );
        }
        function ee(V, O, U, B) {
          return U > B ? O : V + (O - V) * se(U / B);
        }
        function se(V) {
          return V < 0.5
            ? 4 * V * V * V
            : (V - 1) * (2 * V - 2) * (2 * V - 2) + 1;
        }
        function ne() {
          var { WF_CLICK_EMPTY: V, WF_CLICK_SCROLL: O } = t;
          i.on(O, E, D),
            i.on(V, _, function (U) {
              U.preventDefault();
            }),
            document.head.insertBefore(T, document.head.firstChild);
        }
        return { ready: ne };
      })
    );
  });
  var um = u((pK, sm) => {
    var uV = Be();
    uV.define(
      "touch",
      (sm.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (i) {
            return (
              (i = typeof i == "string" ? e(i).get(0) : i), i ? new n(i) : null
            );
          });
        function n(i) {
          var s = !1,
            a = !1,
            c = Math.min(Math.round(window.innerWidth * 0.04), 40),
            d,
            _;
          i.addEventListener("touchstart", E, !1),
            i.addEventListener("touchmove", y, !1),
            i.addEventListener("touchend", T, !1),
            i.addEventListener("touchcancel", R, !1),
            i.addEventListener("mousedown", E, !1),
            i.addEventListener("mousemove", y, !1),
            i.addEventListener("mouseup", T, !1),
            i.addEventListener("mouseout", R, !1);
          function E(G) {
            var N = G.touches;
            (N && N.length > 1) ||
              ((s = !0),
              N ? ((a = !0), (d = N[0].clientX)) : (d = G.clientX),
              (_ = d));
          }
          function y(G) {
            if (s) {
              if (a && G.type === "mousemove") {
                G.preventDefault(), G.stopPropagation();
                return;
              }
              var N = G.touches,
                q = N ? N[0].clientX : G.clientX,
                w = q - _;
              (_ = q),
                Math.abs(w) > c &&
                  r &&
                  String(r()) === "" &&
                  (o("swipe", G, { direction: w > 0 ? "right" : "left" }), R());
            }
          }
          function T(G) {
            if (s && ((s = !1), a && G.type === "mouseup")) {
              G.preventDefault(), G.stopPropagation(), (a = !1);
              return;
            }
          }
          function R() {
            s = !1;
          }
          function A() {
            i.removeEventListener("touchstart", E, !1),
              i.removeEventListener("touchmove", y, !1),
              i.removeEventListener("touchend", T, !1),
              i.removeEventListener("touchcancel", R, !1),
              i.removeEventListener("mousedown", E, !1),
              i.removeEventListener("mousemove", y, !1),
              i.removeEventListener("mouseup", T, !1),
              i.removeEventListener("mouseout", R, !1),
              (i = null);
          }
          this.destroy = A;
        }
        function o(i, s, a) {
          var c = e.Event(i, { originalEvent: s });
          e(s.target).trigger(c, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var cm = u((Os) => {
    "use strict";
    Object.defineProperty(Os, "__esModule", { value: !0 });
    Os.default = cV;
    function cV(e, t, r, n, o, i, s, a, c, d, _, E, y) {
      return function (T) {
        e(T);
        var R = T.form,
          A = {
            name: R.attr("data-name") || R.attr("name") || "Untitled Form",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              R.html()
            ),
            trackingCookies: n(),
          };
        let G = R.attr("data-wf-flow");
        G && (A.wfFlow = G), o(T);
        var N = i(R, A.fields);
        if (N) return s(N);
        if (((A.fileUploads = a(R)), c(T), !d)) {
          _(T);
          return;
        }
        E.ajax({
          url: y,
          type: "POST",
          data: A,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (q) {
            q && q.code === 200 && (T.success = !0), _(T);
          })
          .fail(function () {
            _(T);
          });
      };
    }
  });
  var fm = u((hK, lm) => {
    var Ui = Be();
    Ui.define(
      "forms",
      (lm.exports = function (e, t) {
        var r = {},
          n = e(document),
          o,
          i = window.location,
          s = window.XDomainRequest && !window.atob,
          a = ".w-form",
          c,
          d = /e(-)?mail/i,
          _ = /^\S+@\S+$/,
          E = window.alert,
          y = Ui.env(),
          T,
          R,
          A,
          G = /list-manage[1-9]?.com/i,
          N = t.debounce(function () {
            E(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              q(), !y && !T && D();
            };
        function q() {
          (c = e("html").attr("data-wf-site")),
            (R = "https://webflow.com/api/v1/form/" + c),
            s &&
              R.indexOf("https://webflow.com") >= 0 &&
              (R = R.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (A = `${R}/signFile`),
            (o = e(a + " form")),
            o.length && o.each(w);
        }
        function w(b, k) {
          var f = e(k),
            p = e.data(k, a);
          p || (p = e.data(k, a, { form: f })), L(p);
          var h = f.closest("div.w-form");
          (p.done = h.find("> .w-form-done")),
            (p.fail = h.find("> .w-form-fail")),
            (p.fileUploads = h.find(".w-file-upload")),
            p.fileUploads.each(function (Z) {
              j(Z, p);
            });
          var g =
            p.form.attr("aria-label") || p.form.attr("data-name") || "Form";
          p.done.attr("aria-label") || p.form.attr("aria-label", g),
            p.done.attr("tabindex", "-1"),
            p.done.attr("role", "region"),
            p.done.attr("aria-label") ||
              p.done.attr("aria-label", g + " success"),
            p.fail.attr("tabindex", "-1"),
            p.fail.attr("role", "region"),
            p.fail.attr("aria-label") ||
              p.fail.attr("aria-label", g + " failure");
          var X = (p.action = f.attr("action"));
          if (
            ((p.handler = null),
            (p.redirect = f.attr("data-redirect")),
            G.test(X))
          ) {
            p.handler = O;
            return;
          }
          if (!X) {
            if (c) {
              p.handler = (() => {
                let Z = cm().default;
                return Z(L, i, Ui, se, B, H, E, J, M, c, U, e, R);
              })();
              return;
            }
            N();
          }
        }
        function D() {
          (T = !0),
            n.on("submit", a + " form", function (Z) {
              var z = e.data(this, a);
              z.handler && ((z.evt = Z), z.handler(z));
            });
          let b = ".w-checkbox-input",
            k = ".w-radio-input",
            f = "w--redirected-checked",
            p = "w--redirected-focus",
            h = "w--redirected-focus-visible",
            g = ":focus-visible, [data-wf-focus-visible]",
            X = [
              ["checkbox", b],
              ["radio", k],
            ];
          n.on(
            "change",
            a + ' form input[type="checkbox"]:not(' + b + ")",
            (Z) => {
              e(Z.target).siblings(b).toggleClass(f);
            }
          ),
            n.on("change", a + ' form input[type="radio"]', (Z) => {
              e(`input[name="${Z.target.name}"]:not(${b})`).map((ae, he) =>
                e(he).siblings(k).removeClass(f)
              );
              let z = e(Z.target);
              z.hasClass("w-radio-input") || z.siblings(k).addClass(f);
            }),
            X.forEach(([Z, z]) => {
              n.on(
                "focus",
                a + ` form input[type="${Z}"]:not(` + z + ")",
                (ae) => {
                  e(ae.target).siblings(z).addClass(p),
                    e(ae.target).filter(g).siblings(z).addClass(h);
                }
              ),
                n.on(
                  "blur",
                  a + ` form input[type="${Z}"]:not(` + z + ")",
                  (ae) => {
                    e(ae.target).siblings(z).removeClass(`${p} ${h}`);
                  }
                );
            });
        }
        function L(b) {
          var k = (b.btn = b.form.find(':input[type="submit"]'));
          (b.wait = b.btn.attr("data-wait") || null),
            (b.success = !1),
            k.prop("disabled", !1),
            b.label && k.val(b.label);
        }
        function M(b) {
          var k = b.btn,
            f = b.wait;
          k.prop("disabled", !0), f && ((b.label = k.val()), k.val(f));
        }
        function H(b, k) {
          var f = null;
          return (
            (k = k || {}),
            b
              .find(':input:not([type="submit"]):not([type="file"])')
              .each(function (p, h) {
                var g = e(h),
                  X = g.attr("type"),
                  Z =
                    g.attr("data-name") || g.attr("name") || "Field " + (p + 1),
                  z = g.val();
                if (X === "checkbox") z = g.is(":checked");
                else if (X === "radio") {
                  if (k[Z] === null || typeof k[Z] == "string") return;
                  z =
                    b
                      .find('input[name="' + g.attr("name") + '"]:checked')
                      .val() || null;
                }
                typeof z == "string" && (z = e.trim(z)),
                  (k[Z] = z),
                  (f = f || ne(g, X, Z, z));
              }),
            f
          );
        }
        function J(b) {
          var k = {};
          return (
            b.find(':input[type="file"]').each(function (f, p) {
              var h = e(p),
                g = h.attr("data-name") || h.attr("name") || "File " + (f + 1),
                X = h.attr("data-value");
              typeof X == "string" && (X = e.trim(X)), (k[g] = X);
            }),
            k
          );
        }
        let ee = { _mkto_trk: "marketo" };
        function se() {
          return document.cookie.split("; ").reduce(function (k, f) {
            let p = f.split("="),
              h = p[0];
            if (h in ee) {
              let g = ee[h],
                X = p.slice(1).join("=");
              k[g] = X;
            }
            return k;
          }, {});
        }
        function ne(b, k, f, p) {
          var h = null;
          return (
            k === "password"
              ? (h = "Passwords cannot be submitted.")
              : b.attr("required")
              ? p
                ? d.test(b.attr("type")) &&
                  (_.test(p) ||
                    (h = "Please enter a valid email address for: " + f))
                : (h = "Please fill out the required field: " + f)
              : f === "g-recaptcha-response" &&
                !p &&
                (h = "Please confirm you\u2019re not a robot."),
            h
          );
        }
        function V(b) {
          B(b), U(b);
        }
        function O(b) {
          L(b);
          var k = b.form,
            f = {};
          if (/^https/.test(i.href) && !/^https/.test(b.action)) {
            k.attr("method", "post");
            return;
          }
          B(b);
          var p = H(k, f);
          if (p) return E(p);
          M(b);
          var h;
          t.each(f, function (z, ae) {
            d.test(ae) && (f.EMAIL = z),
              /^((full[ _-]?)?name)$/i.test(ae) && (h = z),
              /^(first[ _-]?name)$/i.test(ae) && (f.FNAME = z),
              /^(last[ _-]?name)$/i.test(ae) && (f.LNAME = z);
          }),
            h &&
              !f.FNAME &&
              ((h = h.split(" ")),
              (f.FNAME = h[0]),
              (f.LNAME = f.LNAME || h[1]));
          var g = b.action.replace("/post?", "/post-json?") + "&c=?",
            X = g.indexOf("u=") + 2;
          X = g.substring(X, g.indexOf("&", X));
          var Z = g.indexOf("id=") + 3;
          (Z = g.substring(Z, g.indexOf("&", Z))),
            (f["b_" + X + "_" + Z] = ""),
            e
              .ajax({ url: g, data: f, dataType: "jsonp" })
              .done(function (z) {
                (b.success = z.result === "success" || /already/.test(z.msg)),
                  b.success || console.info("MailChimp error: " + z.msg),
                  U(b);
              })
              .fail(function () {
                U(b);
              });
        }
        function U(b) {
          var k = b.form,
            f = b.redirect,
            p = b.success;
          if (p && f) {
            Ui.location(f);
            return;
          }
          b.done.toggle(p),
            b.fail.toggle(!p),
            p ? b.done.focus() : b.fail.focus(),
            k.toggle(!p),
            L(b);
        }
        function B(b) {
          b.evt && b.evt.preventDefault(), (b.evt = null);
        }
        function j(b, k) {
          if (!k.fileUploads || !k.fileUploads[b]) return;
          var f,
            p = e(k.fileUploads[b]),
            h = p.find("> .w-file-upload-default"),
            g = p.find("> .w-file-upload-uploading"),
            X = p.find("> .w-file-upload-success"),
            Z = p.find("> .w-file-upload-error"),
            z = h.find(".w-file-upload-input"),
            ae = h.find(".w-file-upload-label"),
            he = ae.children(),
            oe = Z.find(".w-file-upload-error-msg"),
            v = X.find(".w-file-upload-file"),
            K = X.find(".w-file-remove-link"),
            te = v.find(".w-file-upload-file-name"),
            Y = oe.attr("data-w-size-error"),
            ge = oe.attr("data-w-type-error"),
            We = oe.attr("data-w-generic-error");
          if (
            (y ||
              ae.on("click keydown", function (I) {
                (I.type === "keydown" && I.which !== 13 && I.which !== 32) ||
                  (I.preventDefault(), z.click());
              }),
            ae.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            K.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            y)
          )
            z.on("click", function (I) {
              I.preventDefault();
            }),
              ae.on("click", function (I) {
                I.preventDefault();
              }),
              he.on("click", function (I) {
                I.preventDefault();
              });
          else {
            K.on("click keydown", function (I) {
              if (I.type === "keydown") {
                if (I.which !== 13 && I.which !== 32) return;
                I.preventDefault();
              }
              z.removeAttr("data-value"),
                z.val(""),
                te.html(""),
                h.toggle(!0),
                X.toggle(!1),
                ae.focus();
            }),
              z.on("change", function (I) {
                (f = I.target && I.target.files && I.target.files[0]),
                  f &&
                    (h.toggle(!1),
                    Z.toggle(!1),
                    g.toggle(!0),
                    g.focus(),
                    te.text(f.name),
                    C() || M(k),
                    (k.fileUploads[b].uploading = !0),
                    F(f, m));
              });
            var Ye = ae.outerHeight();
            z.height(Ye), z.width(1);
          }
          function l(I) {
            var x = I.responseJSON && I.responseJSON.msg,
              re = We;
            typeof x == "string" && x.indexOf("InvalidFileTypeError") === 0
              ? (re = ge)
              : typeof x == "string" &&
                x.indexOf("MaxFileSizeError") === 0 &&
                (re = Y),
              oe.text(re),
              z.removeAttr("data-value"),
              z.val(""),
              g.toggle(!1),
              h.toggle(!0),
              Z.toggle(!0),
              Z.focus(),
              (k.fileUploads[b].uploading = !1),
              C() || L(k);
          }
          function m(I, x) {
            if (I) return l(I);
            var re = x.fileName,
              ue = x.postData,
              ye = x.fileId,
              Q = x.s3Url;
            z.attr("data-value", ye), W(Q, ue, f, re, S);
          }
          function S(I) {
            if (I) return l(I);
            g.toggle(!1),
              X.css("display", "inline-block"),
              X.focus(),
              (k.fileUploads[b].uploading = !1),
              C() || L(k);
          }
          function C() {
            var I = (k.fileUploads && k.fileUploads.toArray()) || [];
            return I.some(function (x) {
              return x.uploading;
            });
          }
        }
        function F(b, k) {
          var f = new URLSearchParams({ name: b.name, size: b.size });
          e.ajax({ type: "GET", url: `${A}?${f}`, crossDomain: !0 })
            .done(function (p) {
              k(null, p);
            })
            .fail(function (p) {
              k(p);
            });
        }
        function W(b, k, f, p, h) {
          var g = new FormData();
          for (var X in k) g.append(X, k[X]);
          g.append("file", f, p),
            e
              .ajax({
                type: "POST",
                url: b,
                data: g,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                h(null);
              })
              .fail(function (Z) {
                h(Z);
              });
        }
        return r;
      })
    );
  });
  var pm = u((gK, dm) => {
    var Pt = Be(),
      lV = _n(),
      De = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    Pt.define(
      "navbar",
      (dm.exports = function (e, t) {
        var r = {},
          n = e.tram,
          o = e(window),
          i = e(document),
          s = t.debounce,
          a,
          c,
          d,
          _,
          E = Pt.env(),
          y = '<div class="w-nav-overlay" data-wf-ignore />',
          T = ".w-nav",
          R = "w--open",
          A = "w--nav-dropdown-open",
          G = "w--nav-dropdown-toggle-open",
          N = "w--nav-dropdown-list-open",
          q = "w--nav-link-open",
          w = lV.triggers,
          D = e();
        (r.ready = r.design = r.preview = L),
          (r.destroy = function () {
            (D = e()), M(), c && c.length && c.each(se);
          });
        function L() {
          (d = E && Pt.env("design")),
            (_ = Pt.env("editor")),
            (a = e(document.body)),
            (c = i.find(T)),
            c.length && (c.each(ee), M(), H());
        }
        function M() {
          Pt.resize.off(J);
        }
        function H() {
          Pt.resize.on(J);
        }
        function J() {
          c.each(h);
        }
        function ee(v, K) {
          var te = e(K),
            Y = e.data(K, T);
          Y ||
            (Y = e.data(K, T, {
              open: !1,
              el: te,
              config: {},
              selectedIdx: -1,
            })),
            (Y.menu = te.find(".w-nav-menu")),
            (Y.links = Y.menu.find(".w-nav-link")),
            (Y.dropdowns = Y.menu.find(".w-dropdown")),
            (Y.dropdownToggle = Y.menu.find(".w-dropdown-toggle")),
            (Y.dropdownList = Y.menu.find(".w-dropdown-list")),
            (Y.button = te.find(".w-nav-button")),
            (Y.container = te.find(".w-container")),
            (Y.overlayContainerId = "w-nav-overlay-" + v),
            (Y.outside = f(Y));
          var ge = te.find(".w-nav-brand");
          ge &&
            ge.attr("href") === "/" &&
            ge.attr("aria-label") == null &&
            ge.attr("aria-label", "home"),
            Y.button.attr("style", "-webkit-user-select: text;"),
            Y.button.attr("aria-label") == null &&
              Y.button.attr("aria-label", "menu"),
            Y.button.attr("role", "button"),
            Y.button.attr("tabindex", "0"),
            Y.button.attr("aria-controls", Y.overlayContainerId),
            Y.button.attr("aria-haspopup", "menu"),
            Y.button.attr("aria-expanded", "false"),
            Y.el.off(T),
            Y.button.off(T),
            Y.menu.off(T),
            O(Y),
            d
              ? (ne(Y), Y.el.on("setting" + T, U(Y)))
              : (V(Y),
                Y.button.on("click" + T, b(Y)),
                Y.menu.on("click" + T, "a", k(Y)),
                Y.button.on("keydown" + T, B(Y)),
                Y.el.on("keydown" + T, j(Y))),
            h(v, K);
        }
        function se(v, K) {
          var te = e.data(K, T);
          te && (ne(te), e.removeData(K, T));
        }
        function ne(v) {
          v.overlay && (oe(v, !0), v.overlay.remove(), (v.overlay = null));
        }
        function V(v) {
          v.overlay ||
            ((v.overlay = e(y).appendTo(v.el)),
            v.overlay.attr("id", v.overlayContainerId),
            (v.parent = v.menu.parent()),
            oe(v, !0));
        }
        function O(v) {
          var K = {},
            te = v.config || {},
            Y = (K.animation = v.el.attr("data-animation") || "default");
          (K.animOver = /^over/.test(Y)),
            (K.animDirect = /left$/.test(Y) ? -1 : 1),
            te.animation !== Y && v.open && t.defer(W, v),
            (K.easing = v.el.attr("data-easing") || "ease"),
            (K.easing2 = v.el.attr("data-easing2") || "ease");
          var ge = v.el.attr("data-duration");
          (K.duration = ge != null ? Number(ge) : 400),
            (K.docHeight = v.el.attr("data-doc-height")),
            (v.config = K);
        }
        function U(v) {
          return function (K, te) {
            te = te || {};
            var Y = o.width();
            O(v),
              te.open === !0 && ae(v, !0),
              te.open === !1 && oe(v, !0),
              v.open &&
                t.defer(function () {
                  Y !== o.width() && W(v);
                });
          };
        }
        function B(v) {
          return function (K) {
            switch (K.keyCode) {
              case De.SPACE:
              case De.ENTER:
                return b(v)(), K.preventDefault(), K.stopPropagation();
              case De.ESCAPE:
                return oe(v), K.preventDefault(), K.stopPropagation();
              case De.ARROW_RIGHT:
              case De.ARROW_DOWN:
              case De.HOME:
              case De.END:
                return v.open
                  ? (K.keyCode === De.END
                      ? (v.selectedIdx = v.links.length - 1)
                      : (v.selectedIdx = 0),
                    F(v),
                    K.preventDefault(),
                    K.stopPropagation())
                  : (K.preventDefault(), K.stopPropagation());
            }
          };
        }
        function j(v) {
          return function (K) {
            if (v.open)
              switch (
                ((v.selectedIdx = v.links.index(document.activeElement)),
                K.keyCode)
              ) {
                case De.HOME:
                case De.END:
                  return (
                    K.keyCode === De.END
                      ? (v.selectedIdx = v.links.length - 1)
                      : (v.selectedIdx = 0),
                    F(v),
                    K.preventDefault(),
                    K.stopPropagation()
                  );
                case De.ESCAPE:
                  return (
                    oe(v),
                    v.button.focus(),
                    K.preventDefault(),
                    K.stopPropagation()
                  );
                case De.ARROW_LEFT:
                case De.ARROW_UP:
                  return (
                    (v.selectedIdx = Math.max(-1, v.selectedIdx - 1)),
                    F(v),
                    K.preventDefault(),
                    K.stopPropagation()
                  );
                case De.ARROW_RIGHT:
                case De.ARROW_DOWN:
                  return (
                    (v.selectedIdx = Math.min(
                      v.links.length - 1,
                      v.selectedIdx + 1
                    )),
                    F(v),
                    K.preventDefault(),
                    K.stopPropagation()
                  );
              }
          };
        }
        function F(v) {
          if (v.links[v.selectedIdx]) {
            var K = v.links[v.selectedIdx];
            K.focus(), k(K);
          }
        }
        function W(v) {
          v.open && (oe(v, !0), ae(v, !0));
        }
        function b(v) {
          return s(function () {
            v.open ? oe(v) : ae(v);
          });
        }
        function k(v) {
          return function (K) {
            var te = e(this),
              Y = te.attr("href");
            if (!Pt.validClick(K.currentTarget)) {
              K.preventDefault();
              return;
            }
            Y && Y.indexOf("#") === 0 && v.open && oe(v);
          };
        }
        function f(v) {
          return (
            v.outside && i.off("click" + T, v.outside),
            function (K) {
              var te = e(K.target);
              (_ && te.closest(".w-editor-bem-EditorOverlay").length) ||
                p(v, te);
            }
          );
        }
        var p = s(function (v, K) {
          if (v.open) {
            var te = K.closest(".w-nav-menu");
            v.menu.is(te) || oe(v);
          }
        });
        function h(v, K) {
          var te = e.data(K, T),
            Y = (te.collapsed = te.button.css("display") !== "none");
          if ((te.open && !Y && !d && oe(te, !0), te.container.length)) {
            var ge = X(te);
            te.links.each(ge), te.dropdowns.each(ge);
          }
          te.open && he(te);
        }
        var g = "max-width";
        function X(v) {
          var K = v.container.css(g);
          return (
            K === "none" && (K = ""),
            function (te, Y) {
              (Y = e(Y)), Y.css(g, ""), Y.css(g) === "none" && Y.css(g, K);
            }
          );
        }
        function Z(v, K) {
          K.setAttribute("data-nav-menu-open", "");
        }
        function z(v, K) {
          K.removeAttribute("data-nav-menu-open");
        }
        function ae(v, K) {
          if (v.open) return;
          (v.open = !0),
            v.menu.each(Z),
            v.links.addClass(q),
            v.dropdowns.addClass(A),
            v.dropdownToggle.addClass(G),
            v.dropdownList.addClass(N),
            v.button.addClass(R);
          var te = v.config,
            Y = te.animation;
          (Y === "none" || !n.support.transform || te.duration <= 0) &&
            (K = !0);
          var ge = he(v),
            We = v.menu.outerHeight(!0),
            Ye = v.menu.outerWidth(!0),
            l = v.el.height(),
            m = v.el[0];
          if (
            (h(0, m),
            w.intro(0, m),
            Pt.redraw.up(),
            d || i.on("click" + T, v.outside),
            K)
          ) {
            I();
            return;
          }
          var S = "transform " + te.duration + "ms " + te.easing;
          if (
            (v.overlay &&
              ((D = v.menu.prev()), v.overlay.show().append(v.menu)),
            te.animOver)
          ) {
            n(v.menu)
              .add(S)
              .set({ x: te.animDirect * Ye, height: ge })
              .start({ x: 0 })
              .then(I),
              v.overlay && v.overlay.width(Ye);
            return;
          }
          var C = l + We;
          n(v.menu).add(S).set({ y: -C }).start({ y: 0 }).then(I);
          function I() {
            v.button.attr("aria-expanded", "true");
          }
        }
        function he(v) {
          var K = v.config,
            te = K.docHeight ? i.height() : a.height();
          return (
            K.animOver
              ? v.menu.height(te)
              : v.el.css("position") !== "fixed" &&
                (te -= v.el.outerHeight(!0)),
            v.overlay && v.overlay.height(te),
            te
          );
        }
        function oe(v, K) {
          if (!v.open) return;
          (v.open = !1), v.button.removeClass(R);
          var te = v.config;
          if (
            ((te.animation === "none" ||
              !n.support.transform ||
              te.duration <= 0) &&
              (K = !0),
            w.outro(0, v.el[0]),
            i.off("click" + T, v.outside),
            K)
          ) {
            n(v.menu).stop(), m();
            return;
          }
          var Y = "transform " + te.duration + "ms " + te.easing2,
            ge = v.menu.outerHeight(!0),
            We = v.menu.outerWidth(!0),
            Ye = v.el.height();
          if (te.animOver) {
            n(v.menu)
              .add(Y)
              .start({ x: We * te.animDirect })
              .then(m);
            return;
          }
          var l = Ye + ge;
          n(v.menu).add(Y).start({ y: -l }).then(m);
          function m() {
            v.menu.height(""),
              n(v.menu).set({ x: 0, y: 0 }),
              v.menu.each(z),
              v.links.removeClass(q),
              v.dropdowns.removeClass(A),
              v.dropdownToggle.removeClass(G),
              v.dropdownList.removeClass(N),
              v.overlay &&
                v.overlay.children().length &&
                (D.length ? v.menu.insertAfter(D) : v.menu.prependTo(v.parent),
                v.overlay.attr("style", "").hide()),
              v.el.triggerHandler("w-close"),
              v.button.attr("aria-expanded", "false");
          }
        }
        return r;
      })
    );
  });
  var gm = u((EK, hm) => {
    var Dt = Be(),
      fV = _n(),
      _t = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      vm =
        'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    Dt.define(
      "slider",
      (hm.exports = function (e, t) {
        var r = {},
          n = e.tram,
          o = e(document),
          i,
          s,
          a = Dt.env(),
          c = ".w-slider",
          d = '<div class="w-slider-dot" data-wf-ignore />',
          _ =
            '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
          E = "w-slider-force-show",
          y = fV.triggers,
          T,
          R = !1;
        (r.ready = function () {
          (s = Dt.env("design")), A();
        }),
          (r.design = function () {
            (s = !0), setTimeout(A, 1e3);
          }),
          (r.preview = function () {
            (s = !1), A();
          }),
          (r.redraw = function () {
            (R = !0), A(), (R = !1);
          }),
          (r.destroy = G);
        function A() {
          (i = o.find(c)), i.length && (i.each(w), !T && (G(), N()));
        }
        function G() {
          Dt.resize.off(q), Dt.redraw.off(r.redraw);
        }
        function N() {
          Dt.resize.on(q), Dt.redraw.on(r.redraw);
        }
        function q() {
          i.filter(":visible").each(j);
        }
        function w(f, p) {
          var h = e(p),
            g = e.data(p, c);
          g ||
            (g = e.data(p, c, {
              index: 0,
              depth: 1,
              hasFocus: { keyboard: !1, mouse: !1 },
              el: h,
              config: {},
            })),
            (g.mask = h.children(".w-slider-mask")),
            (g.left = h.children(".w-slider-arrow-left")),
            (g.right = h.children(".w-slider-arrow-right")),
            (g.nav = h.children(".w-slider-nav")),
            (g.slides = g.mask.children(".w-slide")),
            g.slides.each(y.reset),
            R && (g.maskWidth = 0),
            h.attr("role") === void 0 && h.attr("role", "region"),
            h.attr("aria-label") === void 0 && h.attr("aria-label", "carousel");
          var X = g.mask.attr("id");
          if (
            (X || ((X = "w-slider-mask-" + f), g.mask.attr("id", X)),
            !s && !g.ariaLiveLabel && (g.ariaLiveLabel = e(_).appendTo(g.mask)),
            g.left.attr("role", "button"),
            g.left.attr("tabindex", "0"),
            g.left.attr("aria-controls", X),
            g.left.attr("aria-label") === void 0 &&
              g.left.attr("aria-label", "previous slide"),
            g.right.attr("role", "button"),
            g.right.attr("tabindex", "0"),
            g.right.attr("aria-controls", X),
            g.right.attr("aria-label") === void 0 &&
              g.right.attr("aria-label", "next slide"),
            !n.support.transform)
          ) {
            g.left.hide(), g.right.hide(), g.nav.hide(), (T = !0);
            return;
          }
          g.el.off(c),
            g.left.off(c),
            g.right.off(c),
            g.nav.off(c),
            D(g),
            s
              ? (g.el.on("setting" + c, O(g)), V(g), (g.hasTimer = !1))
              : (g.el.on("swipe" + c, O(g)),
                g.left.on("click" + c, J(g)),
                g.right.on("click" + c, ee(g)),
                g.left.on("keydown" + c, H(g, J)),
                g.right.on("keydown" + c, H(g, ee)),
                g.nav.on("keydown" + c, "> div", O(g)),
                g.config.autoplay &&
                  !g.hasTimer &&
                  ((g.hasTimer = !0), (g.timerCount = 1), ne(g)),
                g.el.on("mouseenter" + c, M(g, !0, "mouse")),
                g.el.on("focusin" + c, M(g, !0, "keyboard")),
                g.el.on("mouseleave" + c, M(g, !1, "mouse")),
                g.el.on("focusout" + c, M(g, !1, "keyboard"))),
            g.nav.on("click" + c, "> div", O(g)),
            a ||
              g.mask
                .contents()
                .filter(function () {
                  return this.nodeType === 3;
                })
                .remove();
          var Z = h.filter(":hidden");
          Z.addClass(E);
          var z = h.parents(":hidden");
          z.addClass(E), R || j(f, p), Z.removeClass(E), z.removeClass(E);
        }
        function D(f) {
          var p = {};
          (p.crossOver = 0),
            (p.animation = f.el.attr("data-animation") || "slide"),
            p.animation === "outin" &&
              ((p.animation = "cross"), (p.crossOver = 0.5)),
            (p.easing = f.el.attr("data-easing") || "ease");
          var h = f.el.attr("data-duration");
          if (
            ((p.duration = h != null ? parseInt(h, 10) : 500),
            L(f.el.attr("data-infinite")) && (p.infinite = !0),
            L(f.el.attr("data-disable-swipe")) && (p.disableSwipe = !0),
            L(f.el.attr("data-hide-arrows"))
              ? (p.hideArrows = !0)
              : f.config.hideArrows && (f.left.show(), f.right.show()),
            L(f.el.attr("data-autoplay")))
          ) {
            (p.autoplay = !0),
              (p.delay = parseInt(f.el.attr("data-delay"), 10) || 2e3),
              (p.timerMax = parseInt(f.el.attr("data-autoplay-limit"), 10));
            var g = "mousedown" + c + " touchstart" + c;
            s ||
              f.el.off(g).one(g, function () {
                V(f);
              });
          }
          var X = f.right.width();
          (p.edge = X ? X + 40 : 100), (f.config = p);
        }
        function L(f) {
          return f === "1" || f === "true";
        }
        function M(f, p, h) {
          return function (g) {
            if (p) f.hasFocus[h] = p;
            else if (
              e.contains(f.el.get(0), g.relatedTarget) ||
              ((f.hasFocus[h] = p),
              (f.hasFocus.mouse && h === "keyboard") ||
                (f.hasFocus.keyboard && h === "mouse"))
            )
              return;
            p
              ? (f.ariaLiveLabel.attr("aria-live", "polite"),
                f.hasTimer && V(f))
              : (f.ariaLiveLabel.attr("aria-live", "off"), f.hasTimer && ne(f));
          };
        }
        function H(f, p) {
          return function (h) {
            switch (h.keyCode) {
              case _t.SPACE:
              case _t.ENTER:
                return p(f)(), h.preventDefault(), h.stopPropagation();
            }
          };
        }
        function J(f) {
          return function () {
            B(f, { index: f.index - 1, vector: -1 });
          };
        }
        function ee(f) {
          return function () {
            B(f, { index: f.index + 1, vector: 1 });
          };
        }
        function se(f, p) {
          var h = null;
          p === f.slides.length && (A(), F(f)),
            t.each(f.anchors, function (g, X) {
              e(g.els).each(function (Z, z) {
                e(z).index() === p && (h = X);
              });
            }),
            h != null && B(f, { index: h, immediate: !0 });
        }
        function ne(f) {
          V(f);
          var p = f.config,
            h = p.timerMax;
          (h && f.timerCount++ > h) ||
            (f.timerId = window.setTimeout(function () {
              f.timerId == null || s || (ee(f)(), ne(f));
            }, p.delay));
        }
        function V(f) {
          window.clearTimeout(f.timerId), (f.timerId = null);
        }
        function O(f) {
          return function (p, h) {
            h = h || {};
            var g = f.config;
            if (s && p.type === "setting") {
              if (h.select === "prev") return J(f)();
              if (h.select === "next") return ee(f)();
              if ((D(f), F(f), h.select == null)) return;
              se(f, h.select);
              return;
            }
            if (p.type === "swipe")
              return g.disableSwipe || Dt.env("editor")
                ? void 0
                : h.direction === "left"
                ? ee(f)()
                : h.direction === "right"
                ? J(f)()
                : void 0;
            if (f.nav.has(p.target).length) {
              var X = e(p.target).index();
              if (
                (p.type === "click" && B(f, { index: X }), p.type === "keydown")
              )
                switch (p.keyCode) {
                  case _t.ENTER:
                  case _t.SPACE: {
                    B(f, { index: X }), p.preventDefault();
                    break;
                  }
                  case _t.ARROW_LEFT:
                  case _t.ARROW_UP: {
                    U(f.nav, Math.max(X - 1, 0)), p.preventDefault();
                    break;
                  }
                  case _t.ARROW_RIGHT:
                  case _t.ARROW_DOWN: {
                    U(f.nav, Math.min(X + 1, f.pages)), p.preventDefault();
                    break;
                  }
                  case _t.HOME: {
                    U(f.nav, 0), p.preventDefault();
                    break;
                  }
                  case _t.END: {
                    U(f.nav, f.pages), p.preventDefault();
                    break;
                  }
                  default:
                    return;
                }
            }
          };
        }
        function U(f, p) {
          var h = f.children().eq(p).focus();
          f.children().not(h);
        }
        function B(f, p) {
          p = p || {};
          var h = f.config,
            g = f.anchors;
          f.previous = f.index;
          var X = p.index,
            Z = {};
          X < 0
            ? ((X = g.length - 1),
              h.infinite &&
                ((Z.x = -f.endX), (Z.from = 0), (Z.to = g[0].width)))
            : X >= g.length &&
              ((X = 0),
              h.infinite &&
                ((Z.x = g[g.length - 1].width),
                (Z.from = -g[g.length - 1].x),
                (Z.to = Z.from - Z.x))),
            (f.index = X);
          var z = f.nav
            .children()
            .eq(X)
            .addClass("w-active")
            .attr("aria-pressed", "true")
            .attr("tabindex", "0");
          f.nav
            .children()
            .not(z)
            .removeClass("w-active")
            .attr("aria-pressed", "false")
            .attr("tabindex", "-1"),
            h.hideArrows &&
              (f.index === g.length - 1 ? f.right.hide() : f.right.show(),
              f.index === 0 ? f.left.hide() : f.left.show());
          var ae = f.offsetX || 0,
            he = (f.offsetX = -g[f.index].x),
            oe = { x: he, opacity: 1, visibility: "" },
            v = e(g[f.index].els),
            K = e(g[f.previous] && g[f.previous].els),
            te = f.slides.not(v),
            Y = h.animation,
            ge = h.easing,
            We = Math.round(h.duration),
            Ye = p.vector || (f.index > f.previous ? 1 : -1),
            l = "opacity " + We + "ms " + ge,
            m = "transform " + We + "ms " + ge;
          if (
            (v.find(vm).removeAttr("tabindex"),
            v.removeAttr("aria-hidden"),
            v.find("*").removeAttr("aria-hidden"),
            te.find(vm).attr("tabindex", "-1"),
            te.attr("aria-hidden", "true"),
            te.find("*").attr("aria-hidden", "true"),
            s || (v.each(y.intro), te.each(y.outro)),
            p.immediate && !R)
          ) {
            n(v).set(oe), I();
            return;
          }
          if (f.index === f.previous) return;
          if (
            (s || f.ariaLiveLabel.text(`Slide ${X + 1} of ${g.length}.`),
            Y === "cross")
          ) {
            var S = Math.round(We - We * h.crossOver),
              C = Math.round(We - S);
            (l = "opacity " + S + "ms " + ge),
              n(K).set({ visibility: "" }).add(l).start({ opacity: 0 }),
              n(v)
                .set({ visibility: "", x: he, opacity: 0, zIndex: f.depth++ })
                .add(l)
                .wait(C)
                .then({ opacity: 1 })
                .then(I);
            return;
          }
          if (Y === "fade") {
            n(K).set({ visibility: "" }).stop(),
              n(v)
                .set({ visibility: "", x: he, opacity: 0, zIndex: f.depth++ })
                .add(l)
                .start({ opacity: 1 })
                .then(I);
            return;
          }
          if (Y === "over") {
            (oe = { x: f.endX }),
              n(K).set({ visibility: "" }).stop(),
              n(v)
                .set({
                  visibility: "",
                  zIndex: f.depth++,
                  x: he + g[f.index].width * Ye,
                })
                .add(m)
                .start({ x: he })
                .then(I);
            return;
          }
          h.infinite && Z.x
            ? (n(f.slides.not(K))
                .set({ visibility: "", x: Z.x })
                .add(m)
                .start({ x: he }),
              n(K).set({ visibility: "", x: Z.from }).add(m).start({ x: Z.to }),
              (f.shifted = K))
            : (h.infinite &&
                f.shifted &&
                (n(f.shifted).set({ visibility: "", x: ae }),
                (f.shifted = null)),
              n(f.slides).set({ visibility: "" }).add(m).start({ x: he }));
          function I() {
            (v = e(g[f.index].els)),
              (te = f.slides.not(v)),
              Y !== "slide" && (oe.visibility = "hidden"),
              n(te).set(oe);
          }
        }
        function j(f, p) {
          var h = e.data(p, c);
          if (h) {
            if (b(h)) return F(h);
            s && k(h) && F(h);
          }
        }
        function F(f) {
          var p = 1,
            h = 0,
            g = 0,
            X = 0,
            Z = f.maskWidth,
            z = Z - f.config.edge;
          z < 0 && (z = 0),
            (f.anchors = [{ els: [], x: 0, width: 0 }]),
            f.slides.each(function (he, oe) {
              g - h > z &&
                (p++,
                (h += Z),
                (f.anchors[p - 1] = { els: [], x: g, width: 0 })),
                (X = e(oe).outerWidth(!0)),
                (g += X),
                (f.anchors[p - 1].width += X),
                f.anchors[p - 1].els.push(oe);
              var v = he + 1 + " of " + f.slides.length;
              e(oe).attr("aria-label", v), e(oe).attr("role", "group");
            }),
            (f.endX = g),
            s && (f.pages = null),
            f.nav.length && f.pages !== p && ((f.pages = p), W(f));
          var ae = f.index;
          ae >= p && (ae = p - 1), B(f, { immediate: !0, index: ae });
        }
        function W(f) {
          var p = [],
            h,
            g = f.el.attr("data-nav-spacing");
          g && (g = parseFloat(g) + "px");
          for (var X = 0, Z = f.pages; X < Z; X++)
            (h = e(d)),
              h
                .attr("aria-label", "Show slide " + (X + 1) + " of " + Z)
                .attr("aria-pressed", "false")
                .attr("role", "button")
                .attr("tabindex", "-1"),
              f.nav.hasClass("w-num") && h.text(X + 1),
              g != null && h.css({ "margin-left": g, "margin-right": g }),
              p.push(h);
          f.nav.empty().append(p);
        }
        function b(f) {
          var p = f.mask.width();
          return f.maskWidth !== p ? ((f.maskWidth = p), !0) : !1;
        }
        function k(f) {
          var p = 0;
          return (
            f.slides.each(function (h, g) {
              p += e(g).outerWidth(!0);
            }),
            f.slidesWidth !== p ? ((f.slidesWidth = p), !0) : !1
          );
        }
        return r;
      })
    );
  });
  bs();
  Ss();
  Gs();
  Us();
  Vs();
  Hs();
  hn();
  Ys();
  _n();
  rm();
  im();
  am();
  um();
  fm();
  pm();
  gm();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions: Init
 */
Webflow.require("ix").init([
  {
    slug: "hamburger",
    name: "Hamburger",
    value: {
      style: {},
      triggers: [
        {
          type: "navbar",
          selector: ".top-line",
          preserve3d: true,
          stepsA: [
            {
              title: "Open State",
              transition: "transform 250ms ease 0",
              x: "0px",
              y: "10px",
              z: "0px",
              rotateX: "0deg",
              rotateY: "0deg",
              rotateZ: "45deg",
            },
          ],
          stepsB: [
            {
              transition: "transform 200 ease 0",
              x: "0px",
              y: "0px",
              z: "0px",
              rotateX: "0deg",
              rotateY: "0deg",
              rotateZ: "0deg",
            },
          ],
        },
        {
          type: "navbar",
          selector: ".middle-line",
          stepsA: [
            {
              width: "0px",
              height: "0px",
              transition: "width 200 ease 0, height 200 ease 0",
            },
          ],
          stepsB: [
            {
              width: "40px",
              height: "4px",
              transition: "width 200 ease 0, height 200 ease 0",
            },
          ],
        },
        {
          type: "navbar",
          selector: ".bottom-line",
          preserve3d: true,
          stepsA: [
            {
              transition: "transform 250ms ease 0",
              rotateX: "0deg",
              rotateY: "0deg",
              rotateZ: "-45deg",
              x: "6px",
              y: "-8px",
              z: "0px",
            },
          ],
          stepsB: [
            {
              transition: "transform 200 ease 0",
              x: "0px",
              y: "0px",
              z: "0px",
              rotateX: "0deg",
              rotateY: "0deg",
              rotateZ: "0deg",
            },
          ],
        },
      ],
    },
  },
]);
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    "e-47": {
      id: "e-47",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-48" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|e94d8d93-4a07-f526-d639-ad94c2f908f8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|e94d8d93-4a07-f526-d639-ad94c2f908f8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 30,
        scrollOffsetUnit: "%",
        delay: 488,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1536209791865,
    },
    "e-49": {
      id: "e-49",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-50" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|d68c031e-14d0-ab30-2ea0-5ff450ce36e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|d68c031e-14d0-ab30-2ea0-5ff450ce36e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1536245720522,
    },
    "e-51": {
      id: "e-51",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-52" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|d68c031e-14d0-ab30-2ea0-5ff450ce36e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|d68c031e-14d0-ab30-2ea0-5ff450ce36e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1536245720522,
    },
    "e-53": {
      id: "e-53",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SPIN_EFFECT",
        instant: false,
        config: { actionListId: "spinInClockwise", autoStopEventId: "e-54" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|905eb075-bfd0-bd13-2bd9-7877be0e3bee",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|905eb075-bfd0-bd13-2bd9-7877be0e3bee",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "CLOCKWISE",
        effectIn: true,
      },
      createdOn: 1536280519452,
    },
    "e-55": {
      id: "e-55",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInTop", autoStopEventId: "e-56" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|83a5382e-03af-7ed4-eea3-d02e208a3d83",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|83a5382e-03af-7ed4-eea3-d02e208a3d83",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "TOP",
        effectIn: true,
      },
      createdOn: 1536280568070,
    },
    "e-57": {
      id: "e-57",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SPIN_EFFECT",
        instant: false,
        config: { actionListId: "spinInClockwise", autoStopEventId: "e-58" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|1d2cfe28-0a6d-9dee-9476-360881aa5983",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|1d2cfe28-0a6d-9dee-9476-360881aa5983",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "CLOCKWISE",
        effectIn: true,
      },
      createdOn: 1536280772911,
    },
    "e-59": {
      id: "e-59",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInTop", autoStopEventId: "e-60" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|1d2cfe28-0a6d-9dee-9476-360881aa5984",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|1d2cfe28-0a6d-9dee-9476-360881aa5984",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "TOP",
        effectIn: true,
      },
      createdOn: 1536280772911,
    },
    "e-62": {
      id: "e-62",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-65",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1516051266464,
    },
    "e-63": {
      id: "e-63",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-64",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1516390394512,
    },
    "e-64": {
      id: "e-64",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-63",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1516390394511,
    },
    "e-66": {
      id: "e-66",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-70",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".nav-button-animated",
        originalId:
          "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0e",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-button-animated",
          originalId:
            "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0e",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1516047799517,
    },
    "e-67": {
      id: "e-67",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-61",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c08",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c08",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1516051247372,
    },
    "e-69": {
      id: "e-69",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-68",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1516050972403,
    },
    "e-70": {
      id: "e-70",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-66",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".nav-button-animated",
        originalId:
          "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0e",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-button-animated",
          originalId:
            "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0e",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1516047799517,
    },
    "e-94": {
      id: "e-94",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-95",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5b9a8915f61933d9aed7b45c|83f480ba-c960-14a8-7749-2c477bae8f50",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9a8915f61933d9aed7b45c|83f480ba-c960-14a8-7749-2c477bae8f50",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537194503723,
    },
    "e-95": {
      id: "e-95",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-94",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5b9a8915f61933d9aed7b45c|83f480ba-c960-14a8-7749-2c477bae8f50",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9a8915f61933d9aed7b45c|83f480ba-c960-14a8-7749-2c477bae8f50",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537194503723,
    },
    "e-96": {
      id: "e-96",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-97",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9a8915f61933d9aed7b45c|83f480ba-c960-14a8-7749-2c477bae8f53",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9a8915f61933d9aed7b45c|83f480ba-c960-14a8-7749-2c477bae8f53",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537194503723,
    },
    "e-98": {
      id: "e-98",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-99",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9a8915f61933d9aed7b45c|83f480ba-c960-14a8-7749-2c477bae8f55",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9a8915f61933d9aed7b45c|83f480ba-c960-14a8-7749-2c477bae8f55",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537194503723,
    },
    "e-100": {
      id: "e-100",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-101",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9a8915f61933d9aed7b45c|83f480ba-c960-14a8-7749-2c477bae8f57",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9a8915f61933d9aed7b45c|83f480ba-c960-14a8-7749-2c477bae8f57",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537194503723,
    },
    "e-110": {
      id: "e-110",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-111" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|e94d8d93-4a07-f526-d639-ad94c2f908f8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|e94d8d93-4a07-f526-d639-ad94c2f908f8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 30,
        scrollOffsetUnit: "%",
        delay: 488,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1537316958110,
    },
    "e-112": {
      id: "e-112",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-113" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|d68c031e-14d0-ab30-2ea0-5ff450ce36e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|d68c031e-14d0-ab30-2ea0-5ff450ce36e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537316958110,
    },
    "e-114": {
      id: "e-114",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-115" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|d68c031e-14d0-ab30-2ea0-5ff450ce36e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|d68c031e-14d0-ab30-2ea0-5ff450ce36e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537316958110,
    },
    "e-116": {
      id: "e-116",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SPIN_EFFECT",
        instant: false,
        config: { actionListId: "spinInClockwise", autoStopEventId: "e-117" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|905eb075-bfd0-bd13-2bd9-7877be0e3bee",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|905eb075-bfd0-bd13-2bd9-7877be0e3bee",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "CLOCKWISE",
        effectIn: true,
      },
      createdOn: 1537316958110,
    },
    "e-118": {
      id: "e-118",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInTop", autoStopEventId: "e-119" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|83a5382e-03af-7ed4-eea3-d02e208a3d83",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|83a5382e-03af-7ed4-eea3-d02e208a3d83",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "TOP",
        effectIn: true,
      },
      createdOn: 1537316958110,
    },
    "e-120": {
      id: "e-120",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SPIN_EFFECT",
        instant: false,
        config: { actionListId: "spinInClockwise", autoStopEventId: "e-121" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|1d2cfe28-0a6d-9dee-9476-360881aa5983",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|1d2cfe28-0a6d-9dee-9476-360881aa5983",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "CLOCKWISE",
        effectIn: true,
      },
      createdOn: 1537316958110,
    },
    "e-122": {
      id: "e-122",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInTop", autoStopEventId: "e-123" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|1d2cfe28-0a6d-9dee-9476-360881aa5984",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|1d2cfe28-0a6d-9dee-9476-360881aa5984",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "TOP",
        effectIn: true,
      },
      createdOn: 1537316958110,
    },
    "e-133": {
      id: "e-133",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-134" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|b4774ccb-5053-4238-e3c4-9b68132d6a7c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|b4774ccb-5053-4238-e3c4-9b68132d6a7c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 29,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450464299,
    },
    "e-135": {
      id: "e-135",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-136" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|afc56fd7-1667-2b83-37cc-36eec29ca18f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|afc56fd7-1667-2b83-37cc-36eec29ca18f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 26,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450510340,
    },
    "e-139": {
      id: "e-139",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-140" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|4ac3a03b-123c-1ef5-3134-348541dabc27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|4ac3a03b-123c-1ef5-3134-348541dabc27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 29,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450561833,
    },
    "e-141": {
      id: "e-141",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-142" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|3ccec528-e20c-9819-610c-3463d1f9f94d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|3ccec528-e20c-9819-610c-3463d1f9f94d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 28,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450576627,
    },
    "e-143": {
      id: "e-143",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-144" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|ef99636d-36bc-cd7a-d6e9-fae3b8e62b79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|ef99636d-36bc-cd7a-d6e9-fae3b8e62b79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 29,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450614453,
    },
    "e-145": {
      id: "e-145",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-146" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|6d894aac-7cf7-92e3-878c-0eea4bc08b08",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|6d894aac-7cf7-92e3-878c-0eea4bc08b08",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 29,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450630175,
    },
    "e-147": {
      id: "e-147",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-148" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|821e2991-390c-0918-27ba-02eb4081fb17",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|821e2991-390c-0918-27ba-02eb4081fb17",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 29,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450646517,
    },
    "e-149": {
      id: "e-149",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-150" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|1cd01ae3-6fdd-4ec7-58af-030f624ddeaa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|1cd01ae3-6fdd-4ec7-58af-030f624ddeaa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 29,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450662530,
    },
    "e-151": {
      id: "e-151",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-152" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|e67e7e25-3b94-77de-acd8-53b54208ff12",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|e67e7e25-3b94-77de-acd8-53b54208ff12",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 29,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450676138,
    },
    "e-153": {
      id: "e-153",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-154" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|c606dba9-482d-4416-9b23-f6b9867ef1d9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|c606dba9-482d-4416-9b23-f6b9867ef1d9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 19,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450689061,
    },
    "e-155": {
      id: "e-155",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-156" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|d1e26a3c-ba81-c8af-43eb-7e44c20b1cbb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|d1e26a3c-ba81-c8af-43eb-7e44c20b1cbb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 29,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450702175,
    },
    "e-157": {
      id: "e-157",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-158" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|2e0ed132-38ed-2c80-ab05-afb0cb6bf2ac",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|2e0ed132-38ed-2c80-ab05-afb0cb6bf2ac",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 29,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450714958,
    },
    "e-159": {
      id: "e-159",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-160" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|1c0e672e-4c71-3c45-6262-ea5079dd7847",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|1c0e672e-4c71-3c45-6262-ea5079dd7847",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 29,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450727879,
    },
    "e-161": {
      id: "e-161",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-162" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92|8d5bbca8-1701-99c0-117a-9e473b869acb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92|8d5bbca8-1701-99c0-117a-9e473b869acb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 29,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537450742723,
    },
    "e-164": {
      id: "e-164",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-163",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b90b358b3abfb2042963c92",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b90b358b3abfb2042963c92",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537450940001,
    },
    "e-166": {
      id: "e-166",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-165",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9ee1bbe4c33c1164cdb529",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9ee1bbe4c33c1164cdb529",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537454103513,
    },
    "e-167": {
      id: "e-167",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SPIN_EFFECT",
        instant: false,
        config: { actionListId: "spinInClockwise", autoStopEventId: "e-168" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9ee1bbe4c33c1164cdb529|36b53c67-5c9f-e70c-083e-2987667ba833",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9ee1bbe4c33c1164cdb529|36b53c67-5c9f-e70c-083e-2987667ba833",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "CLOCKWISE",
        effectIn: true,
      },
      createdOn: 1537638552074,
    },
    "e-169": {
      id: "e-169",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInTop", autoStopEventId: "e-170" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9ee1bbe4c33c1164cdb529|36b53c67-5c9f-e70c-083e-2987667ba834",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9ee1bbe4c33c1164cdb529|36b53c67-5c9f-e70c-083e-2987667ba834",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "TOP",
        effectIn: true,
      },
      createdOn: 1537638616094,
    },
    "e-179": {
      id: "e-179",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-180" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|9bd9c8c1-24f6-6e0f-bba4-78529b307cce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|9bd9c8c1-24f6-6e0f-bba4-78529b307cce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537735685274,
    },
    "e-181": {
      id: "e-181",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-182" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|1a0b8568-8f8d-8519-046c-2d8d4034f7d5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|1a0b8568-8f8d-8519-046c-2d8d4034f7d5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537736067468,
    },
    "e-183": {
      id: "e-183",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-184" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|6b12e51b-e9bd-ae27-7e8f-95b42de0d226",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|6b12e51b-e9bd-ae27-7e8f-95b42de0d226",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537736270531,
    },
    "e-185": {
      id: "e-185",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-186" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|2613fab9-94f3-1ad5-3466-8ba4f7a6653a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|2613fab9-94f3-1ad5-3466-8ba4f7a6653a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537737192419,
    },
    "e-187": {
      id: "e-187",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-188" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|1693461c-8c9c-36d5-527d-ee255a5fe279",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|1693461c-8c9c-36d5-527d-ee255a5fe279",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537737987709,
    },
    "e-189": {
      id: "e-189",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-190" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|12848bff-0474-455a-c079-b149f22cd6ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|12848bff-0474-455a-c079-b149f22cd6ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537738592909,
    },
    "e-199": {
      id: "e-199",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-200" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d55001",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d55001",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537804816811,
    },
    "e-201": {
      id: "e-201",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-202" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d5500c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d5500c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537804816811,
    },
    "e-203": {
      id: "e-203",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-204" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d55017",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d55017",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537804816811,
    },
    "e-205": {
      id: "e-205",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-206" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d55024",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d55024",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537804816811,
    },
    "e-207": {
      id: "e-207",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-208" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d5502f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d5502f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537804816811,
    },
    "e-209": {
      id: "e-209",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-210" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d5503a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d5503a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537804816811,
    },
    "e-211": {
      id: "e-211",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-212" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d54ff6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d54ff6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537804925755,
    },
    "e-214": {
      id: "e-214",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-213",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537810519978,
    },
    "e-216": {
      id: "e-216",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-215",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537810900532,
    },
    "e-218": {
      id: "e-218",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-217",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9a8915f61933d9aed7b45c",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9a8915f61933d9aed7b45c",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537838277228,
    },
    "e-219": {
      id: "e-219",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-220",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9a8915f61933d9aed7b45c|3e01528e-d765-9ac4-bcb6-b39d355d4b93",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9a8915f61933d9aed7b45c|3e01528e-d765-9ac4-bcb6-b39d355d4b93",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537846527638,
    },
    "e-221": {
      id: "e-221",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-222" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9a8915f61933d9aed7b45c|49d53581-93f2-67b2-b304-9a6bf355fd37",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9a8915f61933d9aed7b45c|49d53581-93f2-67b2-b304-9a6bf355fd37",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 171,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537846865569,
    },
    "e-225": {
      id: "e-225",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-226" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".full-width-img",
        originalId:
          "5b9a8915f61933d9aed7b45c|6bf6181f-2003-f283-9421-042d428b2e3d",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".full-width-img",
          originalId:
            "5b9a8915f61933d9aed7b45c|6bf6181f-2003-f283-9421-042d428b2e3d",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537847246261,
    },
    "e-227": {
      id: "e-227",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-228",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5ba9d0ce69be1d2672d2e146|83f480ba-c960-14a8-7749-2c477bae8f50",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba9d0ce69be1d2672d2e146|83f480ba-c960-14a8-7749-2c477bae8f50",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537855749778,
    },
    "e-228": {
      id: "e-228",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-227",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5ba9d0ce69be1d2672d2e146|83f480ba-c960-14a8-7749-2c477bae8f50",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba9d0ce69be1d2672d2e146|83f480ba-c960-14a8-7749-2c477bae8f50",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537855749778,
    },
    "e-229": {
      id: "e-229",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-230",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba9d0ce69be1d2672d2e146|83f480ba-c960-14a8-7749-2c477bae8f53",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba9d0ce69be1d2672d2e146|83f480ba-c960-14a8-7749-2c477bae8f53",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537855749778,
    },
    "e-231": {
      id: "e-231",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-232",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba9d0ce69be1d2672d2e146|83f480ba-c960-14a8-7749-2c477bae8f55",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba9d0ce69be1d2672d2e146|83f480ba-c960-14a8-7749-2c477bae8f55",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537855749778,
    },
    "e-233": {
      id: "e-233",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-234",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba9d0ce69be1d2672d2e146|83f480ba-c960-14a8-7749-2c477bae8f57",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba9d0ce69be1d2672d2e146|83f480ba-c960-14a8-7749-2c477bae8f57",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537855749778,
    },
    "e-236": {
      id: "e-236",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-235",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba9d0ce69be1d2672d2e146",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba9d0ce69be1d2672d2e146",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1537855749778,
    },
    "e-237": {
      id: "e-237",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-238",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba9d0ce69be1d2672d2e146|3e01528e-d765-9ac4-bcb6-b39d355d4b93",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba9d0ce69be1d2672d2e146|3e01528e-d765-9ac4-bcb6-b39d355d4b93",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537855749778,
    },
    "e-239": {
      id: "e-239",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-240" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba9d0ce69be1d2672d2e146|49d53581-93f2-67b2-b304-9a6bf355fd37",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba9d0ce69be1d2672d2e146|49d53581-93f2-67b2-b304-9a6bf355fd37",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 171,
        direction: null,
        effectIn: true,
      },
      createdOn: 1537855749778,
    },
    "e-250": {
      id: "e-250",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-249",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bad9de81c68cceb4c256b99",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bad9de81c68cceb4c256b99",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1538104867000,
    },
    "e-251": {
      id: "e-251",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-252",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bad9de81c68cceb4c256b99|3e01528e-d765-9ac4-bcb6-b39d355d4b93",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bad9de81c68cceb4c256b99|3e01528e-d765-9ac4-bcb6-b39d355d4b93",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1538104867000,
    },
    "e-262": {
      id: "e-262",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-261",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baee9cabf02340a7639602e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baee9cabf02340a7639602e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1538189829370,
    },
    "e-272": {
      id: "e-272",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-271",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baefe90c110e440e87ed44b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1538195148187,
    },
    "e-282": {
      id: "e-282",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-281",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb01c2dc110e42e887f8a85",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb01c2dc110e42e887f8a85",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1538268265850,
    },
    "e-300": {
      id: "e-300",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-299",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1538277987974,
    },
    "e-301": {
      id: "e-301",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-302",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baee9cabf02340a7639602e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baee9cabf02340a7639602e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1538280147378,
    },
    "e-305": {
      id: "e-305",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-306",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d54ff6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d54ff6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1538281421396,
    },
    "e-307": {
      id: "e-307",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-308",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d54fff",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d54fff",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1538281540909,
    },
    "e-325": {
      id: "e-325",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-326",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1538283121778,
    },
    "e-417": {
      id: "e-417",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-42",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-418",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baee9cabf02340a7639602e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baee9cabf02340a7639602e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1538350282881,
    },
    "e-429": {
      id: "e-429",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-430",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".hover-animation.text-span",
        originalId:
          "5df9b1e4b6c9eb8a7a6fffcf|419464b3-5b7d-b83f-45dc-c59ac53457c3",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".hover-animation.text-span",
          originalId:
            "5df9b1e4b6c9eb8a7a6fffcf|419464b3-5b7d-b83f-45dc-c59ac53457c3",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1576648133795,
    },
    "e-430": {
      id: "e-430",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-429",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".hover-animation.text-span",
        originalId:
          "5df9b1e4b6c9eb8a7a6fffcf|419464b3-5b7d-b83f-45dc-c59ac53457c3",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".hover-animation.text-span",
          originalId:
            "5df9b1e4b6c9eb8a7a6fffcf|419464b3-5b7d-b83f-45dc-c59ac53457c3",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1576648133826,
    },
    "e-442": {
      id: "e-442",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-46",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-441",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e04ef300aa529a8567a9adb",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e04ef300aa529a8567a9adb",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1577381680668,
    },
    "e-453": {
      id: "e-453",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-454" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|cad8b79c-c613-1d0d-aa4d-59584368a8da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|cad8b79c-c613-1d0d-aa4d-59584368a8da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1577726091505,
    },
    "e-456": {
      id: "e-456",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-49",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-455",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578077532021,
    },
    "e-467": {
      id: "e-467",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-468" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|4ed57176-865b-9204-829d-e5bdbd172c5e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|4ed57176-865b-9204-829d-e5bdbd172c5e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578083564851,
    },
    "e-469": {
      id: "e-469",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-470" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|59fe75d7-9b82-04b6-7baf-68295958ed24",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|59fe75d7-9b82-04b6-7baf-68295958ed24",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578085644517,
    },
    "e-471": {
      id: "e-471",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-472" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|c22b069f-34e1-6419-bbfc-e80c2e49be89",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|c22b069f-34e1-6419-bbfc-e80c2e49be89",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578085696668,
    },
    "e-483": {
      id: "e-483",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-484" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".lead-video.fade-in",
        originalId:
          "5e10055b6a42a415565077c1|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".lead-video.fade-in",
          originalId:
            "5e10055b6a42a415565077c1|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578153850780,
    },
    "e-485": {
      id: "e-485",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-486" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".lead-video",
        originalId:
          "5e10055b6a42a415565077c1|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".lead-video",
          originalId:
            "5e10055b6a42a415565077c1|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578153956550,
    },
    "e-487": {
      id: "e-487",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-488" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578154048959,
    },
    "e-493": {
      id: "e-493",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-494" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578154190215,
    },
    "e-495": {
      id: "e-495",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-496" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1|88a5c979-6e61-8800-a157-5482535e900d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|88a5c979-6e61-8800-a157-5482535e900d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578154237220,
    },
    "e-497": {
      id: "e-497",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-498" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".single-img",
        originalId:
          "5e10055b6a42a415565077c1|10c0aed8-b2d9-713f-04db-c8771fc85b97",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".single-img",
          originalId:
            "5e10055b6a42a415565077c1|10c0aed8-b2d9-713f-04db-c8771fc85b97",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578154368740,
    },
    "e-501": {
      id: "e-501",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-502" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".content-left-collumn",
        originalId:
          "5e10055b6a42a415565077c1|2035fc91-b48f-2209-7501-c0b8073440b7",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".content-left-collumn",
          originalId:
            "5e10055b6a42a415565077c1|2035fc91-b48f-2209-7501-c0b8073440b7",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578154467946,
    },
    "e-503": {
      id: "e-503",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-504" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".content-right-collumn",
        originalId:
          "5e10055b6a42a415565077c1|2035fc91-b48f-2209-7501-c0b8073440b8",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".content-right-collumn",
          originalId:
            "5e10055b6a42a415565077c1|2035fc91-b48f-2209-7501-c0b8073440b8",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 220,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578154512946,
    },
    "e-505": {
      id: "e-505",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-506" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578156128301,
    },
    "e-507": {
      id: "e-507",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-508" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578156170009,
    },
    "e-509": {
      id: "e-509",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-510" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578156189772,
    },
    "e-511": {
      id: "e-511",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-512" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578156351050,
    },
    "e-517": {
      id: "e-517",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-518" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|608b7edb-1d47-d4b6-46a8-3b7df4935703",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|608b7edb-1d47-d4b6-46a8-3b7df4935703",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578159576717,
    },
    "e-521": {
      id: "e-521",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-522" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|608b7edb-1d47-d4b6-46a8-3b7df493570a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|608b7edb-1d47-d4b6-46a8-3b7df493570a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578159576717,
    },
    "e-523": {
      id: "e-523",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-524" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|608b7edb-1d47-d4b6-46a8-3b7df4935711",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|608b7edb-1d47-d4b6-46a8-3b7df4935711",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578159576717,
    },
    "e-535": {
      id: "e-535",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-536" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|6df92a9e-5a57-f1cd-cf5c-254d24fff7c7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|6df92a9e-5a57-f1cd-cf5c-254d24fff7c7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578159975923,
    },
    "e-539": {
      id: "e-539",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-540" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|6df92a9e-5a57-f1cd-cf5c-254d24fff7ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|6df92a9e-5a57-f1cd-cf5c-254d24fff7ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578159975923,
    },
    "e-541": {
      id: "e-541",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-542" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|6df92a9e-5a57-f1cd-cf5c-254d24fff7d5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|6df92a9e-5a57-f1cd-cf5c-254d24fff7d5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578159975923,
    },
    "e-545": {
      id: "e-545",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-546" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|343124e9-ec1b-25a8-001e-755fad321f0a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|343124e9-ec1b-25a8-001e-755fad321f0a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578160363560,
    },
    "e-547": {
      id: "e-547",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-548" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|343124e9-ec1b-25a8-001e-755fad321f11",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|343124e9-ec1b-25a8-001e-755fad321f11",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578160363560,
    },
    "e-549": {
      id: "e-549",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-550" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|343124e9-ec1b-25a8-001e-755fad321f18",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|343124e9-ec1b-25a8-001e-755fad321f18",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578160363560,
    },
    "e-553": {
      id: "e-553",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-554" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|17844c74-d4c7-9d6f-4630-b1c142cfc7ee",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|17844c74-d4c7-9d6f-4630-b1c142cfc7ee",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578160368879,
    },
    "e-555": {
      id: "e-555",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-556" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|17844c74-d4c7-9d6f-4630-b1c142cfc7f5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|17844c74-d4c7-9d6f-4630-b1c142cfc7f5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578160368879,
    },
    "e-557": {
      id: "e-557",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-558" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|17844c74-d4c7-9d6f-4630-b1c142cfc7fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|17844c74-d4c7-9d6f-4630-b1c142cfc7fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578160368879,
    },
    "e-569": {
      id: "e-569",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-570" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578164210435,
    },
    "e-571": {
      id: "e-571",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-572" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578164210435,
    },
    "e-573": {
      id: "e-573",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-574" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722|88a5c979-6e61-8800-a157-5482535e900d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|88a5c979-6e61-8800-a157-5482535e900d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578164210435,
    },
    "e-575": {
      id: "e-575",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-576" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578164210435,
    },
    "e-577": {
      id: "e-577",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-578" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578164210435,
    },
    "e-579": {
      id: "e-579",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-580" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578164210435,
    },
    "e-581": {
      id: "e-581",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-582" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578164210435,
    },
    "e-595": {
      id: "e-595",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-596" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578166592800,
    },
    "e-597": {
      id: "e-597",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-598" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578166592800,
    },
    "e-599": {
      id: "e-599",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-600" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef|88a5c979-6e61-8800-a157-5482535e900d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|88a5c979-6e61-8800-a157-5482535e900d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578166592800,
    },
    "e-601": {
      id: "e-601",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-602" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578166592800,
    },
    "e-603": {
      id: "e-603",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-604" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578166592800,
    },
    "e-605": {
      id: "e-605",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-606" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578166592800,
    },
    "e-607": {
      id: "e-607",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-608" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578166592800,
    },
    "e-641": {
      id: "e-641",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-642" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578176765363,
    },
    "e-643": {
      id: "e-643",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-644" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578176765363,
    },
    "e-645": {
      id: "e-645",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-646" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|88a5c979-6e61-8800-a157-5482535e900d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|88a5c979-6e61-8800-a157-5482535e900d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578176765363,
    },
    "e-647": {
      id: "e-647",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-648" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578176765363,
    },
    "e-649": {
      id: "e-649",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-650" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578176765363,
    },
    "e-651": {
      id: "e-651",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-652" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578176765363,
    },
    "e-653": {
      id: "e-653",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-654" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578176765363,
    },
    "e-667": {
      id: "e-667",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-668" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578179035560,
    },
    "e-669": {
      id: "e-669",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-670" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578179035560,
    },
    "e-671": {
      id: "e-671",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-672" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|88a5c979-6e61-8800-a157-5482535e900d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|88a5c979-6e61-8800-a157-5482535e900d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578179035560,
    },
    "e-673": {
      id: "e-673",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-674" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578179035560,
    },
    "e-675": {
      id: "e-675",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-676" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578179035560,
    },
    "e-677": {
      id: "e-677",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-678" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578179035560,
    },
    "e-679": {
      id: "e-679",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-680" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578179035560,
    },
    "e-693": {
      id: "e-693",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-694" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|d8e95998-9e6e-b1c4-17ef-7ccc740173c3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|d8e95998-9e6e-b1c4-17ef-7ccc740173c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578179539159,
    },
    "e-695": {
      id: "e-695",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-696" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|835744b6-fce6-c00a-db5e-1a640d4d67c5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|835744b6-fce6-c00a-db5e-1a640d4d67c5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578179608700,
    },
    "e-697": {
      id: "e-697",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-698" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|bf83f7ac-aef2-72e8-b5a5-29a047fd77f4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|bf83f7ac-aef2-72e8-b5a5-29a047fd77f4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578179635230,
    },
    "e-699": {
      id: "e-699",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-700" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578180963837,
    },
    "e-701": {
      id: "e-701",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-702" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578180963837,
    },
    "e-703": {
      id: "e-703",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-704" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|88a5c979-6e61-8800-a157-5482535e900d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|88a5c979-6e61-8800-a157-5482535e900d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578180963837,
    },
    "e-705": {
      id: "e-705",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-706" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578180963837,
    },
    "e-707": {
      id: "e-707",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-708" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578180963837,
    },
    "e-709": {
      id: "e-709",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-710" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578180963837,
    },
    "e-711": {
      id: "e-711",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-712" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578180963837,
    },
    "e-725": {
      id: "e-725",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-726" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|41186ec1-9c83-8cc9-2692-a52997a26aa0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|41186ec1-9c83-8cc9-2692-a52997a26aa0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578181413480,
    },
    "e-727": {
      id: "e-727",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-728" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578194546742,
    },
    "e-729": {
      id: "e-729",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-730" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578194546742,
    },
    "e-731": {
      id: "e-731",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-732" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae|88a5c979-6e61-8800-a157-5482535e900d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|88a5c979-6e61-8800-a157-5482535e900d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578194546742,
    },
    "e-733": {
      id: "e-733",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-734" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578194546742,
    },
    "e-735": {
      id: "e-735",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-736" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578194546742,
    },
    "e-737": {
      id: "e-737",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-738" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578194546742,
    },
    "e-739": {
      id: "e-739",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-740" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578194546742,
    },
    "e-753": {
      id: "e-753",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-754" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578239479130,
    },
    "e-755": {
      id: "e-755",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-756" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578239479130,
    },
    "e-757": {
      id: "e-757",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-758" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90|88a5c979-6e61-8800-a157-5482535e900d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|88a5c979-6e61-8800-a157-5482535e900d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578239479130,
    },
    "e-759": {
      id: "e-759",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-760" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578239479130,
    },
    "e-761": {
      id: "e-761",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-762" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578239479130,
    },
    "e-763": {
      id: "e-763",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-764" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578239479130,
    },
    "e-765": {
      id: "e-765",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-766" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578239479130,
    },
    "e-779": {
      id: "e-779",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-780" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578242784923,
    },
    "e-781": {
      id: "e-781",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-782" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578242784923,
    },
    "e-783": {
      id: "e-783",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-784" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|88a5c979-6e61-8800-a157-5482535e900d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|88a5c979-6e61-8800-a157-5482535e900d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578242784923,
    },
    "e-785": {
      id: "e-785",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-786" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578242784923,
    },
    "e-787": {
      id: "e-787",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-788" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578242784923,
    },
    "e-789": {
      id: "e-789",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-790" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578242784923,
    },
    "e-791": {
      id: "e-791",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-792" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578242784923,
    },
    "e-805": {
      id: "e-805",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-806" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578247384604,
    },
    "e-807": {
      id: "e-807",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-808" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578247384604,
    },
    "e-809": {
      id: "e-809",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-810" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|88a5c979-6e61-8800-a157-5482535e900d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|88a5c979-6e61-8800-a157-5482535e900d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578247384604,
    },
    "e-811": {
      id: "e-811",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-812" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578247384604,
    },
    "e-813": {
      id: "e-813",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-814" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578247384604,
    },
    "e-815": {
      id: "e-815",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-816" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578247384604,
    },
    "e-817": {
      id: "e-817",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-818" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578247384604,
    },
    "e-831": {
      id: "e-831",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-832" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|d8e95998-9e6e-b1c4-17ef-7ccc740173c3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|d8e95998-9e6e-b1c4-17ef-7ccc740173c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578247384604,
    },
    "e-833": {
      id: "e-833",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-834" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|835744b6-fce6-c00a-db5e-1a640d4d67c5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|835744b6-fce6-c00a-db5e-1a640d4d67c5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578247384604,
    },
    "e-835": {
      id: "e-835",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-836" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|bf83f7ac-aef2-72e8-b5a5-29a047fd77f4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|bf83f7ac-aef2-72e8-b5a5-29a047fd77f4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578247384604,
    },
    "e-837": {
      id: "e-837",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-838" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|74ab76a2-a584-ecf1-2308-98cb8d68a7ff",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|74ab76a2-a584-ecf1-2308-98cb8d68a7ff",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578280964302,
    },
    "e-839": {
      id: "e-839",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-840" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|74ab76a2-a584-ecf1-2308-98cb8d68a801",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|74ab76a2-a584-ecf1-2308-98cb8d68a801",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578280964302,
    },
    "e-841": {
      id: "e-841",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-842" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|9b7f6af5-8423-a297-550f-267878f8e370",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|9b7f6af5-8423-a297-550f-267878f8e370",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578281037196,
    },
    "e-843": {
      id: "e-843",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-844" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578281733787,
    },
    "e-849": {
      id: "e-849",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-850" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578281733787,
    },
    "e-851": {
      id: "e-851",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-852" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578281733787,
    },
    "e-853": {
      id: "e-853",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-854" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578281733787,
    },
    "e-855": {
      id: "e-855",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-856" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578281733787,
    },
    "e-869": {
      id: "e-869",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-870" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|d8e95998-9e6e-b1c4-17ef-7ccc740173c3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|d8e95998-9e6e-b1c4-17ef-7ccc740173c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578281733787,
    },
    "e-871": {
      id: "e-871",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-872" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|835744b6-fce6-c00a-db5e-1a640d4d67c5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|835744b6-fce6-c00a-db5e-1a640d4d67c5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578281733787,
    },
    "e-873": {
      id: "e-873",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-874" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|bf83f7ac-aef2-72e8-b5a5-29a047fd77f4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|bf83f7ac-aef2-72e8-b5a5-29a047fd77f4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578281733787,
    },
    "e-881": {
      id: "e-881",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-882" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|69ee2a0f-6ae0-05d5-cbc5-802d281e7443",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|69ee2a0f-6ae0-05d5-cbc5-802d281e7443",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578282247179,
    },
    "e-883": {
      id: "e-883",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-884" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|960f80a7-57c0-9719-113b-85a110839e09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|960f80a7-57c0-9719-113b-85a110839e09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578282541926,
    },
    "e-885": {
      id: "e-885",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-886" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|d3cf92a4-5b21-5c9d-530d-a28ba2bc2faf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578282541926,
    },
    "e-887": {
      id: "e-887",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-888" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|88a5c979-6e61-8800-a157-5482535e900d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|88a5c979-6e61-8800-a157-5482535e900d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1578282541926,
    },
    "e-889": {
      id: "e-889",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-890" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|616282e8-f96c-bd2e-90cd-bc3cec6ebdad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578282541926,
    },
    "e-891": {
      id: "e-891",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-892" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|616282e8-f96c-bd2e-90cd-bc3cec6ebdae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 240,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578282541926,
    },
    "e-893": {
      id: "e-893",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-894" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|59702735-8c16-5b88-5c01-51e15272a7ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|59702735-8c16-5b88-5c01-51e15272a7ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 340,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578282541926,
    },
    "e-895": {
      id: "e-895",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-896" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|efbb9674-2acb-ce4c-25bb-7c1b6ce64506",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 140,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578282541926,
    },
    "e-909": {
      id: "e-909",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-910" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|d8e95998-9e6e-b1c4-17ef-7ccc740173c3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|d8e95998-9e6e-b1c4-17ef-7ccc740173c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578282541926,
    },
    "e-911": {
      id: "e-911",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-912" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|835744b6-fce6-c00a-db5e-1a640d4d67c5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|835744b6-fce6-c00a-db5e-1a640d4d67c5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578282541926,
    },
    "e-913": {
      id: "e-913",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-914" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|bf83f7ac-aef2-72e8-b5a5-29a047fd77f4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|bf83f7ac-aef2-72e8-b5a5-29a047fd77f4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 14,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1578282541926,
    },
    "e-935": {
      id: "e-935",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-936" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12cdf6c5e98cee68fc0228|d4aa21ef-58bc-88b9-10f0-7b8325c40b23",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12cdf6c5e98cee68fc0228|d4aa21ef-58bc-88b9-10f0-7b8325c40b23",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578290912572,
    },
    "e-939": {
      id: "e-939",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-940" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12cdf6c5e98cee68fc0228|d4aa21ef-58bc-88b9-10f0-7b8325c40b3b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12cdf6c5e98cee68fc0228|d4aa21ef-58bc-88b9-10f0-7b8325c40b3b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578290912572,
    },
    "e-941": {
      id: "e-941",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-942" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12cdf6c5e98cee68fc0228|d4aa21ef-58bc-88b9-10f0-7b8325c40b46",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12cdf6c5e98cee68fc0228|d4aa21ef-58bc-88b9-10f0-7b8325c40b46",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578290912572,
    },
    "e-953": {
      id: "e-953",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-954" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12cdf6c5e98cee68fc0228|d4aa21ef-58bc-88b9-10f0-7b8325c40b72",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12cdf6c5e98cee68fc0228|d4aa21ef-58bc-88b9-10f0-7b8325c40b72",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578290912572,
    },
    "e-967": {
      id: "e-967",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-968" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246ac4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246ac4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578292068796,
    },
    "e-969": {
      id: "e-969",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-970" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246ad1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246ad1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578292068796,
    },
    "e-973": {
      id: "e-973",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-974" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246ae7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246ae7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578292068796,
    },
    "e-975": {
      id: "e-975",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-976",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246ae7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246ae7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578292068796,
    },
    "e-977": {
      id: "e-977",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-978",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246af0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246af0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578292068796,
    },
    "e-979": {
      id: "e-979",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-980" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246af2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246af2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578292068796,
    },
    "e-981": {
      id: "e-981",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-982" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246afd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246afd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578292068796,
    },
    "e-983": {
      id: "e-983",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-984" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246b08",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246b08",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578292068796,
    },
    "e-985": {
      id: "e-985",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-986" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246b13",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|66c590c4-7e57-5235-edc9-119f6d246b13",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1578292068796,
    },
    "e-1047": {
      id: "e-1047",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1048",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ebd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ebd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293142018,
    },
    "e-1048": {
      id: "e-1048",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1047",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ebd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ebd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293142018,
    },
    "e-1049": {
      id: "e-1049",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1050",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ec0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ec0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293142018,
    },
    "e-1051": {
      id: "e-1051",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1052",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ec2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ec2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293142018,
    },
    "e-1053": {
      id: "e-1053",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1054",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ec4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ec4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293142018,
    },
    "e-1055": {
      id: "e-1055",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1056",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ec6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|4f4c6258-64ef-050c-2acb-92748a1f0ec6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293142018,
    },
    "e-1077": {
      id: "e-1077",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1078",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb05",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb05",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293195280,
    },
    "e-1078": {
      id: "e-1078",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1077",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb05",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb05",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293195280,
    },
    "e-1079": {
      id: "e-1079",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1080",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb08",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb08",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293195280,
    },
    "e-1081": {
      id: "e-1081",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1082",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb0a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb0a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293195280,
    },
    "e-1083": {
      id: "e-1083",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1084",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb0c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb0c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293195280,
    },
    "e-1085": {
      id: "e-1085",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1086",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb0e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|d8f8484c-8054-39f8-e325-3a6afa95cb0e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578293195280,
    },
    "e-1547": {
      id: "e-1547",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1548",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e66763",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e66763",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578294302062,
    },
    "e-1548": {
      id: "e-1548",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1547",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e66763",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e66763",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578294302062,
    },
    "e-1549": {
      id: "e-1549",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1550",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e66766",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e66766",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578294302062,
    },
    "e-1551": {
      id: "e-1551",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1552",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e66768",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e66768",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578294302062,
    },
    "e-1553": {
      id: "e-1553",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1554",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e6676a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e6676a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578294302062,
    },
    "e-1555": {
      id: "e-1555",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1556",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e6676c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|1fb34bde-01b6-f2f1-5eb7-2de863e6676c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578294302062,
    },
    "e-1557": {
      id: "e-1557",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1558",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a786279",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a786279",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504210014,
    },
    "e-1558": {
      id: "e-1558",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1557",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a786279",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a786279",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504210014,
    },
    "e-1559": {
      id: "e-1559",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1560",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a78627c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a78627c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504210014,
    },
    "e-1561": {
      id: "e-1561",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1562",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a78627e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a78627e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504210014,
    },
    "e-1563": {
      id: "e-1563",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1564",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a786280",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a786280",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504210014,
    },
    "e-1565": {
      id: "e-1565",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1566",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a786282",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|1f8f9f8f-fdd2-752a-d594-b80e4a786282",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504210014,
    },
    "e-1567": {
      id: "e-1567",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1568",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b569",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b569",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504212498,
    },
    "e-1568": {
      id: "e-1568",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1567",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b569",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b569",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504212498,
    },
    "e-1569": {
      id: "e-1569",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1570",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b56c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b56c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504212498,
    },
    "e-1571": {
      id: "e-1571",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1572",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b56e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b56e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504212498,
    },
    "e-1573": {
      id: "e-1573",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1574",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b570",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b570",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504212498,
    },
    "e-1575": {
      id: "e-1575",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1576",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b572",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31|01698ac5-0113-dfb0-2383-75e90f81b572",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504212498,
    },
    "e-1577": {
      id: "e-1577",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1578",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eece97",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eece97",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504219528,
    },
    "e-1578": {
      id: "e-1578",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1577",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eece97",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eece97",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504219528,
    },
    "e-1579": {
      id: "e-1579",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1580",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eece9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eece9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504219528,
    },
    "e-1581": {
      id: "e-1581",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1582",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eece9c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eece9c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504219528,
    },
    "e-1583": {
      id: "e-1583",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1584",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eece9e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eece9e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504219528,
    },
    "e-1585": {
      id: "e-1585",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1586",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eecea0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e04ef300aa529a8567a9adb|618ec5da-8c86-3d43-79c6-6cd7c3eecea0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504219528,
    },
    "e-1587": {
      id: "e-1587",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1588",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28f3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28f3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504227605,
    },
    "e-1588": {
      id: "e-1588",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1587",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28f3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28f3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504227605,
    },
    "e-1589": {
      id: "e-1589",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1590",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504227605,
    },
    "e-1591": {
      id: "e-1591",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1592",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28f8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28f8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504227605,
    },
    "e-1593": {
      id: "e-1593",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1594",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28fa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504227605,
    },
    "e-1595": {
      id: "e-1595",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1596",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baee9cabf02340a7639602e|024fafe2-dc2b-e12d-cab4-15b0f2da28fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504227605,
    },
    "e-1597": {
      id: "e-1597",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1598",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0dae1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0dae1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504247948,
    },
    "e-1598": {
      id: "e-1598",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1597",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0dae1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0dae1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504247948,
    },
    "e-1599": {
      id: "e-1599",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1600",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0dae4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0dae4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504247948,
    },
    "e-1601": {
      id: "e-1601",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1602",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0dae6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0dae6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504247948,
    },
    "e-1603": {
      id: "e-1603",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1604",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0dae8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0dae8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504247948,
    },
    "e-1605": {
      id: "e-1605",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1606",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0daea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bad9de81c68cceb4c256b99|1c82ae44-0a3f-545f-38a6-a917ade0daea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504247948,
    },
    "e-1607": {
      id: "e-1607",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1608",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504260861,
    },
    "e-1608": {
      id: "e-1608",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1607",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504260861,
    },
    "e-1609": {
      id: "e-1609",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1610",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016d1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016d1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504260861,
    },
    "e-1611": {
      id: "e-1611",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1612",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016d3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016d3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504260861,
    },
    "e-1613": {
      id: "e-1613",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1614",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016d5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016d5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504260861,
    },
    "e-1615": {
      id: "e-1615",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1616",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016d7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb01c2dc110e42e887f8a85|f6db00e4-a346-a9ba-e941-e70c419016d7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504260861,
    },
    "e-1617": {
      id: "e-1617",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1618",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6bf7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6bf7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504267460,
    },
    "e-1618": {
      id: "e-1618",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1617",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6bf7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6bf7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504267460,
    },
    "e-1619": {
      id: "e-1619",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1620",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6bfa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6bfa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504267460,
    },
    "e-1621": {
      id: "e-1621",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1622",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6bfc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6bfc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504267460,
    },
    "e-1623": {
      id: "e-1623",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1624",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6bfe",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6bfe",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504267460,
    },
    "e-1625": {
      id: "e-1625",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1626",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6c00",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b|56e7b620-bb63-84ce-5ccf-f8a74f8d6c00",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504267460,
    },
    "e-1627": {
      id: "e-1627",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1628",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504276895,
    },
    "e-1628": {
      id: "e-1628",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1627",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504276895,
    },
    "e-1629": {
      id: "e-1629",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1630",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504276895,
    },
    "e-1631": {
      id: "e-1631",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1632",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4e7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4e7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504276895,
    },
    "e-1633": {
      id: "e-1633",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1634",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4e9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4e9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504276895,
    },
    "e-1635": {
      id: "e-1635",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1636",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4eb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba819e6e33cb61a351c72ca|265e915d-a2db-387f-40da-38616ee6d4eb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504276895,
    },
    "e-1637": {
      id: "e-1637",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1638",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e750",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e750",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504286138,
    },
    "e-1638": {
      id: "e-1638",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1637",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e750",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e750",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504286138,
    },
    "e-1639": {
      id: "e-1639",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1640",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e753",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e753",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504286138,
    },
    "e-1641": {
      id: "e-1641",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1642",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e755",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e755",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504286138,
    },
    "e-1643": {
      id: "e-1643",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1644",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e757",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e757",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504286138,
    },
    "e-1645": {
      id: "e-1645",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1646",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e759",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742|e826a863-af07-23d6-8fa7-4d142001e759",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504286138,
    },
    "e-1647": {
      id: "e-1647",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1648",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6ea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6ea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504294460,
    },
    "e-1648": {
      id: "e-1648",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1647",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6ea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6ea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504294460,
    },
    "e-1649": {
      id: "e-1649",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1650",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6ed",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6ed",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504294460,
    },
    "e-1651": {
      id: "e-1651",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1652",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6ef",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6ef",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504294460,
    },
    "e-1653": {
      id: "e-1653",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1654",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6f1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6f1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504294460,
    },
    "e-1655": {
      id: "e-1655",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1656",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6f3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb02a853a685eafbad78011|25615fd8-d418-1c8c-2840-b758a0e1d6f3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504294460,
    },
    "e-1657": {
      id: "e-1657",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1658",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb7522",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb7522",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504303409,
    },
    "e-1658": {
      id: "e-1658",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1657",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb7522",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb7522",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504303409,
    },
    "e-1659": {
      id: "e-1659",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1660",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb7525",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb7525",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504303409,
    },
    "e-1661": {
      id: "e-1661",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1662",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb7527",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb7527",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504303409,
    },
    "e-1663": {
      id: "e-1663",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1664",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb7529",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb7529",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504303409,
    },
    "e-1665": {
      id: "e-1665",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1666",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb752b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba7e9bd5ced0c1ec5e5f726|4055e62c-8291-e4ef-1ab5-432365eb752b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504303409,
    },
    "e-1667": {
      id: "e-1667",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1668",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e93045069",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e93045069",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504310332,
    },
    "e-1668": {
      id: "e-1668",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1667",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e93045069",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e93045069",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504310332,
    },
    "e-1669": {
      id: "e-1669",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1670",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e9304506c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e9304506c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504310332,
    },
    "e-1671": {
      id: "e-1671",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1672",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e9304506e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e9304506e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504310332,
    },
    "e-1673": {
      id: "e-1673",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1674",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e93045070",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e93045070",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504310332,
    },
    "e-1675": {
      id: "e-1675",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1676",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e93045072",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9ee1bbe4c33c1164cdb529|dff0b861-39ee-b2b2-7e2b-193e93045072",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504310332,
    },
    "e-1677": {
      id: "e-1677",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1678",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e17",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e17",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504324888,
    },
    "e-1678": {
      id: "e-1678",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1677",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e17",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e17",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504324888,
    },
    "e-1679": {
      id: "e-1679",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1680",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e1a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e1a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504324888,
    },
    "e-1681": {
      id: "e-1681",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1682",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e1c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e1c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504324888,
    },
    "e-1683": {
      id: "e-1683",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1684",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e1e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e1e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504324888,
    },
    "e-1685": {
      id: "e-1685",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1686",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e20",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5dfba63e147ea68218fcdf76|aba8d6ea-a83b-478a-1617-fd25870e0e20",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504324888,
    },
    "e-1687": {
      id: "e-1687",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1688",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f440",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f440",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504332116,
    },
    "e-1688": {
      id: "e-1688",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1687",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f440",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f440",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504332116,
    },
    "e-1689": {
      id: "e-1689",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1690",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f443",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f443",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504332116,
    },
    "e-1691": {
      id: "e-1691",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1692",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f445",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f445",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504332116,
    },
    "e-1693": {
      id: "e-1693",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1694",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f447",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f447",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504332116,
    },
    "e-1695": {
      id: "e-1695",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1696",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f449",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12cdf6c5e98cee68fc0228|18185b0b-1125-aab7-7230-384da602f449",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504332116,
    },
    "e-1697": {
      id: "e-1697",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1698",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e904878",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e904878",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504460345,
    },
    "e-1698": {
      id: "e-1698",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1697",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e904878",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e904878",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504460345,
    },
    "e-1699": {
      id: "e-1699",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1700",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e90487b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e90487b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504460345,
    },
    "e-1701": {
      id: "e-1701",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1702",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e90487d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e90487d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504460345,
    },
    "e-1703": {
      id: "e-1703",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1704",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e90487f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e90487f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504460345,
    },
    "e-1705": {
      id: "e-1705",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1706",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e904881",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12d177c5e98c6ad1fc15ee|4e11e5bc-70d9-8af6-beea-563e5e904881",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504460345,
    },
    "e-1707": {
      id: "e-1707",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1708",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51cb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51cb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504472614,
    },
    "e-1708": {
      id: "e-1708",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1707",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51cb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51cb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504472614,
    },
    "e-1709": {
      id: "e-1709",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1710",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504472614,
    },
    "e-1711": {
      id: "e-1711",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1712",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51d0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51d0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504472614,
    },
    "e-1713": {
      id: "e-1713",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1714",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51d2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51d2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504472614,
    },
    "e-1715": {
      id: "e-1715",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1716",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10cdd35aa3982b14fb8fab|de35f697-0da9-3912-452d-d9be096c51d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504472614,
    },
    "e-1717": {
      id: "e-1717",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1718",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c73f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c73f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504490507,
    },
    "e-1718": {
      id: "e-1718",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1717",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c73f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c73f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504490507,
    },
    "e-1719": {
      id: "e-1719",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1720",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c742",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c742",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504490507,
    },
    "e-1721": {
      id: "e-1721",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1722",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c744",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c744",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504490507,
    },
    "e-1723": {
      id: "e-1723",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1724",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c746",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c746",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504490507,
    },
    "e-1725": {
      id: "e-1725",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1726",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c748",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef|25ba5a09-1584-ee02-579d-3dd3d9b9c748",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504490507,
    },
    "e-1727": {
      id: "e-1727",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1728",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd91",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd91",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504501718,
    },
    "e-1728": {
      id: "e-1728",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1727",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd91",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd91",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504501718,
    },
    "e-1729": {
      id: "e-1729",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1730",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd94",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd94",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504501718,
    },
    "e-1731": {
      id: "e-1731",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1732",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd96",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd96",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504501718,
    },
    "e-1733": {
      id: "e-1733",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1734",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd98",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd98",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504501718,
    },
    "e-1735": {
      id: "e-1735",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1736",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1|f08e1a88-0d8f-b501-9a2b-71e3cba6cd9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504501718,
    },
    "e-1737": {
      id: "e-1737",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1738",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504509369,
    },
    "e-1738": {
      id: "e-1738",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1737",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504509369,
    },
    "e-1739": {
      id: "e-1739",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1740",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6d1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6d1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504509369,
    },
    "e-1741": {
      id: "e-1741",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1742",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6d3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6d3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504509369,
    },
    "e-1743": {
      id: "e-1743",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1744",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6d5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6d5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504509369,
    },
    "e-1745": {
      id: "e-1745",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1746",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6d7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722|53f4809b-44a4-c615-97a6-5ca6cbfae6d7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504509369,
    },
    "e-1747": {
      id: "e-1747",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1748",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed3f7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed3f7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504517335,
    },
    "e-1748": {
      id: "e-1748",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1747",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed3f7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed3f7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504517335,
    },
    "e-1749": {
      id: "e-1749",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1750",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed3fa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed3fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504517335,
    },
    "e-1751": {
      id: "e-1751",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1752",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed3fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed3fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504517335,
    },
    "e-1753": {
      id: "e-1753",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1754",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed3fe",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed3fe",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504517335,
    },
    "e-1755": {
      id: "e-1755",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1756",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed400",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23|e4f0d44a-2884-df71-074b-cf7dd10ed400",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504517335,
    },
    "e-1757": {
      id: "e-1757",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1758",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e81",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e81",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504524240,
    },
    "e-1758": {
      id: "e-1758",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1757",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e81",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e81",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504524240,
    },
    "e-1759": {
      id: "e-1759",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1760",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e84",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e84",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504524240,
    },
    "e-1761": {
      id: "e-1761",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1762",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e86",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e86",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504524240,
    },
    "e-1763": {
      id: "e-1763",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1764",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e88",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e88",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504524240,
    },
    "e-1765": {
      id: "e-1765",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1766",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e8a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238|70c763fe-f799-8ee8-b767-45b7ad093e8a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504524240,
    },
    "e-1767": {
      id: "e-1767",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1768",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc41",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc41",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504531779,
    },
    "e-1768": {
      id: "e-1768",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1767",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc41",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc41",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504531779,
    },
    "e-1769": {
      id: "e-1769",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1770",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc44",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc44",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504531779,
    },
    "e-1771": {
      id: "e-1771",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1772",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc46",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc46",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504531779,
    },
    "e-1773": {
      id: "e-1773",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1774",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc48",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc48",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504531779,
    },
    "e-1775": {
      id: "e-1775",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1776",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc4a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d|c07a6850-9ca5-1094-3fe7-8fdad1bcfc4a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504531779,
    },
    "e-1777": {
      id: "e-1777",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1778",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965dafc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965dafc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504538696,
    },
    "e-1778": {
      id: "e-1778",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1777",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965dafc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965dafc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504538696,
    },
    "e-1779": {
      id: "e-1779",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1780",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965daff",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965daff",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504538696,
    },
    "e-1781": {
      id: "e-1781",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1782",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965db01",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965db01",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504538696,
    },
    "e-1783": {
      id: "e-1783",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1784",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965db03",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965db03",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504538696,
    },
    "e-1785": {
      id: "e-1785",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1786",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965db05",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae|7cec2adb-bdd2-f3c8-25dd-d27fe965db05",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504538696,
    },
    "e-1787": {
      id: "e-1787",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1788",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac798",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac798",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504545243,
    },
    "e-1788": {
      id: "e-1788",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1787",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac798",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac798",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504545243,
    },
    "e-1789": {
      id: "e-1789",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1790",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac79b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac79b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504545243,
    },
    "e-1791": {
      id: "e-1791",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1792",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac79d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac79d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504545243,
    },
    "e-1793": {
      id: "e-1793",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1794",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac79f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac79f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504545243,
    },
    "e-1795": {
      id: "e-1795",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1796",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac7a1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90|0e8cb3c7-6fb8-01cf-8915-bcfa6abac7a1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504545243,
    },
    "e-1797": {
      id: "e-1797",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1798",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea67086e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea67086e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504552209,
    },
    "e-1798": {
      id: "e-1798",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1797",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea67086e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea67086e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504552209,
    },
    "e-1799": {
      id: "e-1799",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1800",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea670871",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea670871",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504552209,
    },
    "e-1801": {
      id: "e-1801",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1802",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea670873",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea670873",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504552209,
    },
    "e-1803": {
      id: "e-1803",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1804",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea670875",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea670875",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504552209,
    },
    "e-1805": {
      id: "e-1805",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1806",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea670877",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8|3d8538c5-7db6-377d-3b40-a999ea670877",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504552209,
    },
    "e-1807": {
      id: "e-1807",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1808",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504558980,
    },
    "e-1808": {
      id: "e-1808",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1807",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504558980,
    },
    "e-1809": {
      id: "e-1809",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1810",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e82",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e82",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504558980,
    },
    "e-1811": {
      id: "e-1811",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1812",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e84",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e84",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504558980,
    },
    "e-1813": {
      id: "e-1813",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1814",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e86",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e86",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504558980,
    },
    "e-1815": {
      id: "e-1815",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1816",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e88",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047|d6513e3d-7a9f-495a-8eb9-72227fed1e88",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504558980,
    },
    "e-1817": {
      id: "e-1817",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1818",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828bb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828bb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504566772,
    },
    "e-1818": {
      id: "e-1818",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1817",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828bb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828bb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504566772,
    },
    "e-1819": {
      id: "e-1819",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1820",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504566772,
    },
    "e-1821": {
      id: "e-1821",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1822",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828c0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828c0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504566772,
    },
    "e-1823": {
      id: "e-1823",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1824",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828c2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828c2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504566772,
    },
    "e-1825": {
      id: "e-1825",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1826",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828c4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d|ba2d65f8-ccb9-1612-e6d0-1d31d2f828c4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504566772,
    },
    "e-1827": {
      id: "e-1827",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1828",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d2491",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d2491",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504573701,
    },
    "e-1828": {
      id: "e-1828",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1827",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d2491",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d2491",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504573701,
    },
    "e-1829": {
      id: "e-1829",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1830",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d2494",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d2494",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504573701,
    },
    "e-1831": {
      id: "e-1831",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1832",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d2496",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d2496",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504573701,
    },
    "e-1833": {
      id: "e-1833",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1834",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d2498",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d2498",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504573701,
    },
    "e-1835": {
      id: "e-1835",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1836",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d249a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90|7d08ed12-3986-e9a0-48cc-168e4a1d249a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1578504573701,
    },
    "e-1837": {
      id: "e-1837",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10e9400227d05dd3769bef",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10e9400227d05dd3769bef",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578508741516,
    },
    "e-1838": {
      id: "e-1838",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10055b6a42a415565077c1",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10055b6a42a415565077c1",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578512676817,
    },
    "e-1839": {
      id: "e-1839",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e10dff298f2dc6facd78722",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e10dff298f2dc6facd78722",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578512822592,
    },
    "e-1840": {
      id: "e-1840",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1110fb98f2dc033bd8ec23",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1110fb98f2dc033bd8ec23",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578513061850,
    },
    "e-1841": {
      id: "e-1841",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1121636a42a4edb3571238",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1121636a42a4edb3571238",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516127475,
    },
    "e-1842": {
      id: "e-1842",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1119db5aa3988259fd770d",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1119db5aa3988259fd770d",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516167606,
    },
    "e-1843": {
      id: "e-1843",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1156725aa39829b00128ae",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1156725aa39829b00128ae",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516193542,
    },
    "e-1844": {
      id: "e-1844",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1224d85aa3983b0104db90",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1224d85aa3983b0104db90",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516211181,
    },
    "e-1845": {
      id: "e-1845",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ae2d946b128572bd28c8",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ae2d946b128572bd28c8",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516227880,
    },
    "e-1846": {
      id: "e-1846",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e12ab055aa3985745087047",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e12ab055aa3985745087047",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516252392,
    },
    "e-1847": {
      id: "e-1847",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1212e0c5e98ccf0bf6b60d",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1212e0c5e98ccf0bf6b60d",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516283766,
    },
    "e-1848": {
      id: "e-1848",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e1205f64b55b0056c399d90",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e1205f64b55b0056c399d90",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516297750,
    },
    "e-1849": {
      id: "e-1849",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e0f8d5b4b55b0958526eb31",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e0f8d5b4b55b0958526eb31",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516393692,
    },
    "e-1850": {
      id: "e-1850",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bad9de81c68cceb4c256b99",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bad9de81c68cceb4c256b99",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516820606,
    },
    "e-1851": {
      id: "e-1851",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb01c2dc110e42e887f8a85",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb01c2dc110e42e887f8a85",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516839861,
    },
    "e-1852": {
      id: "e-1852",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5baefe90c110e440e87ed44b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5baefe90c110e440e87ed44b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516854422,
    },
    "e-1853": {
      id: "e-1853",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba819e6e33cb61a351c72ca",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba819e6e33cb61a351c72ca",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578516891388,
    },
    "e-1854": {
      id: "e-1854",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb023fbace69c16bdb3d742",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb023fbace69c16bdb3d742",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578517060170,
    },
    "e-1855": {
      id: "e-1855",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5bb02a853a685eafbad78011",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5bb02a853a685eafbad78011",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578517086515,
    },
    "e-1856": {
      id: "e-1856",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5e04ef300aa529a8567a9adb",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5e04ef300aa529a8567a9adb",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1578528001133,
    },
    "e-1857": {
      id: "e-1857",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-85",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1858",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6090262beb57639d2ee2d2f0|e3515a63-d0b9-4bde-0f4d-2cf0ea1d417c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|e3515a63-d0b9-4bde-0f4d-2cf0ea1d417c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620089183734,
    },
    "e-1859": {
      id: "e-1859",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-87",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1860",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|e3515a63-d0b9-4bde-0f4d-2cf0ea1d417c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|e3515a63-d0b9-4bde-0f4d-2cf0ea1d417c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620159010287,
    },
    "e-1861": {
      id: "e-1861",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-88",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1862",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|94939dd1-30ad-405c-d31f-b20c8497d97e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|94939dd1-30ad-405c-d31f-b20c8497d97e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620159378865,
    },
    "e-1863": {
      id: "e-1863",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-90",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1864",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|94939dd1-30ad-405c-d31f-b20c8497d97e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|94939dd1-30ad-405c-d31f-b20c8497d97e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620159485134,
    },
    "e-1865": {
      id: "e-1865",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-93",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1866",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620162145828,
    },
    "e-1866": {
      id: "e-1866",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-94",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1865",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620162145875,
    },
    "e-1867": {
      id: "e-1867",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-95",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1868",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620170481646,
    },
    "e-1869": {
      id: "e-1869",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-96",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1870",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620172265539,
    },
    "e-1870": {
      id: "e-1870",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-97",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1869",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620172265580,
    },
    "e-1871": {
      id: "e-1871",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-100",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1872",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620173767251,
    },
    "e-1872": {
      id: "e-1872",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-101",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1871",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620173767299,
    },
    "e-1873": {
      id: "e-1873",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-103",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1874",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620258328263,
    },
    "e-1875": {
      id: "e-1875",
      name: "",
      animationType: "custom",
      eventTypeId: "SLIDER_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-107",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1876",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|ce765b5c-ccb6-81d2-b998-4daf5b4c67c9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|ce765b5c-ccb6-81d2-b998-4daf5b4c67c9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1621017250419,
    },
    "e-1876": {
      id: "e-1876",
      name: "",
      animationType: "custom",
      eventTypeId: "SLIDER_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-110",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1875",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|ce765b5c-ccb6-81d2-b998-4daf5b4c67c9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|ce765b5c-ccb6-81d2-b998-4daf5b4c67c9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1621017250492,
    },
    "e-1879": {
      id: "e-1879",
      name: "",
      animationType: "custom",
      eventTypeId: "SLIDER_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-106",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1880",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|ce765b5c-ccb6-81d2-b998-4daf5b4c67c8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|ce765b5c-ccb6-81d2-b998-4daf5b4c67c8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1621021419605,
    },
    "e-1880": {
      id: "e-1880",
      name: "",
      animationType: "custom",
      eventTypeId: "SLIDER_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-109",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1879",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|ce765b5c-ccb6-81d2-b998-4daf5b4c67c8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|ce765b5c-ccb6-81d2-b998-4daf5b4c67c8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1621021419658,
    },
    "e-1881": {
      id: "e-1881",
      name: "",
      animationType: "custom",
      eventTypeId: "SLIDER_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-108",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1882",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|d9473eb6-2664-94bd-a0da-87744e857ad3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|d9473eb6-2664-94bd-a0da-87744e857ad3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1621021955686,
    },
    "e-1882": {
      id: "e-1882",
      name: "",
      animationType: "custom",
      eventTypeId: "SLIDER_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-111",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1881",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|d9473eb6-2664-94bd-a0da-87744e857ad3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|d9473eb6-2664-94bd-a0da-87744e857ad3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1621021955735,
    },
    "e-1884": {
      id: "e-1884",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-121",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1883",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1621027924406,
    },
    "e-1885": {
      id: "e-1885",
      name: "",
      animationType: "custom",
      eventTypeId: "SLIDER_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-122",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1886",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|3cc88af7-619b-003f-524e-153053733347",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|3cc88af7-619b-003f-524e-153053733347",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1621039097533,
    },
    "e-1886": {
      id: "e-1886",
      name: "",
      animationType: "custom",
      eventTypeId: "SLIDER_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-123",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1885",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6090262beb57639d2ee2d2f0|3cc88af7-619b-003f-524e-153053733347",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6090262beb57639d2ee2d2f0|3cc88af7-619b-003f-524e-153053733347",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1621039097593,
    },
    "e-1887": {
      id: "e-1887",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-125",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1888",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60de44d30f5041934c3aa62e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60de44d30f5041934c3aa62e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1625180260791,
    },
    "e-1889": {
      id: "e-1889",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-125",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1890",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60de44d30f5041934c3aa62e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60de44d30f5041934c3aa62e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1625180793150,
    },
    "e-1891": {
      id: "e-1891",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-125",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1892",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60de44d30f5041934c3aa62e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60de44d30f5041934c3aa62e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1625180822009,
    },
    "e-1893": {
      id: "e-1893",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-126",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1894",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60de44d30f5041934c3aa62e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60de44d30f5041934c3aa62e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1625181181272,
    },
    "e-1895": {
      id: "e-1895",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-127",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1896",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60de44d30f5041934c3aa62e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60de44d30f5041934c3aa62e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1625181388649,
    },
    "e-1897": {
      id: "e-1897",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1898" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|91710896-8326-e02a-4267-16d91846d13c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|91710896-8326-e02a-4267-16d91846d13c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 12,
        scrollOffsetUnit: "%",
        delay: 146,
        direction: null,
        effectIn: true,
      },
      createdOn: 1667420210911,
    },
    "e-1902": {
      id: "e-1902",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-129",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1901",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1670114456064,
    },
    "e-1903": {
      id: "e-1903",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-130",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1904",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ba1982a28c40a579666e024|9929e34a-9180-1ee9-9167-c18ab40d91a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ba1982a28c40a579666e024|9929e34a-9180-1ee9-9167-c18ab40d91a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1670114911994,
    },
    "e-1905": {
      id: "e-1905",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-130",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1906",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9ee1bbe4c33c1164cdb529|3e12afbe-1e6a-056a-f12e-7b914b5ce111",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9ee1bbe4c33c1164cdb529|3e12afbe-1e6a-056a-f12e-7b914b5ce111",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1670116248039,
    },
    "e-1907": {
      id: "e-1907",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-129",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1908",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5b9ee1bbe4c33c1164cdb529",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5b9ee1bbe4c33c1164cdb529",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1670116370586,
    },
    "e-1911": {
      id: "e-1911",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1912",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b1d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b1d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1670708027473,
    },
    "e-1912": {
      id: "e-1912",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-79",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1911",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b1d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b1d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1670708027473,
    },
    "e-1913": {
      id: "e-1913",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1914",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b20",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b20",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1670708027473,
    },
    "e-1915": {
      id: "e-1915",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1916",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b22",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b22",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1670708027473,
    },
    "e-1917": {
      id: "e-1917",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1918",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b24",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b24",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1670708027473,
    },
    "e-1919": {
      id: "e-1919",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1920",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b26",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|b34286c2-f635-06ca-b7ec-1d7df12b7b26",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1670708027473,
    },
    "e-1921": {
      id: "e-1921",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SPIN_EFFECT",
        instant: false,
        config: { actionListId: "spinInClockwise", autoStopEventId: "e-1922" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6393ae012381c53b855cdf78|c6f6bc1d-7ba6-89b8-baf7-71c060a40f64",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|c6f6bc1d-7ba6-89b8-baf7-71c060a40f64",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "CLOCKWISE",
        effectIn: true,
      },
      createdOn: 1670708178809,
    },
    "e-1923": {
      id: "e-1923",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInTop", autoStopEventId: "e-1924" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6393ae012381c53b855cdf78|c6f6bc1d-7ba6-89b8-baf7-71c060a40f65",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|c6f6bc1d-7ba6-89b8-baf7-71c060a40f65",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "TOP",
        effectIn: true,
      },
      createdOn: 1670708178809,
    },
    "e-1925": {
      id: "e-1925",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1926" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6393ae012381c53b855cdf78|b804a5ef-e12a-60d3-58b1-1cf2b67ac9e7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|b804a5ef-e12a-60d3-58b1-1cf2b67ac9e7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1670708217075,
    },
    "e-1927": {
      id: "e-1927",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1928" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6393ae012381c53b855cdf78|b804a5ef-e12a-60d3-58b1-1cf2b67ac9e9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|b804a5ef-e12a-60d3-58b1-1cf2b67ac9e9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1670708217075,
    },
    "e-1929": {
      id: "e-1929",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SPIN_EFFECT",
        instant: false,
        config: { actionListId: "spinInClockwise", autoStopEventId: "e-1930" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6393ae012381c53b855cdf78|98aa80a9-161a-7065-bbe2-e954d35aaf74",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|98aa80a9-161a-7065-bbe2-e954d35aaf74",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "CLOCKWISE",
        effectIn: true,
      },
      createdOn: 1670708248479,
    },
    "e-1931": {
      id: "e-1931",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInTop", autoStopEventId: "e-1932" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6393ae012381c53b855cdf78|98aa80a9-161a-7065-bbe2-e954d35aaf75",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6393ae012381c53b855cdf78|98aa80a9-161a-7065-bbe2-e954d35aaf75",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "TOP",
        effectIn: true,
      },
      createdOn: 1670708248479,
    },
  },
  actionLists: {
    "a-2": {
      id: "a-2",
      title: "Hamburger Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".top-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72b"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-2-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".top-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72b"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".middle-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72a"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".bottom-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-2-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".bottom-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72f"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1516047851812,
    },
    "a-4": {
      id: "a-4",
      title: "Menu Hover",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0f",
                },
                globalSwatchId: "",
                rValue: 212,
                bValue: 212,
                gValue: 212,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-4-n-2",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c10",
                },
                globalSwatchId: "",
                rValue: 212,
                bValue: 212,
                gValue: 212,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-4-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c11",
                },
                globalSwatchId: "",
                rValue: 212,
                bValue: 212,
                gValue: 212,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1516390836572,
    },
    "a-5": {
      id: "a-5",
      title: "Hover out menu",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-5-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c0f",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-2",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c10",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5b90b358b3abfb2042963c92|22db296b-bd08-0b87-ea56-5091da0b4c11",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1516391548095,
    },
    "a-3": {
      id: "a-3",
      title: "Hamburger Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-3-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  selector: ".top-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72b"],
                },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-3-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  selector: ".top-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72b"],
                },
                yValue: 10,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-3-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  selector: ".middle-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72a"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-3-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  selector: ".bottom-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72f"],
                },
                zValue: -45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-3-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  selector: ".bottom-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72f"],
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-3-n-8",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".top-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72b"],
                },
                globalSwatchId: "",
                rValue: 212,
                bValue: 212,
                gValue: 212,
                aValue: 1,
              },
            },
            {
              id: "a-3-n-6",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bottom-line-2",
                  selectorGuids: ["0412d4db-0321-9c61-7b92-780a028cf72f"],
                },
                globalSwatchId: "",
                rValue: 212,
                bValue: 212,
                gValue: 212,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1516047851812,
    },
    "a-9": {
      id: "a-9",
      title: "Page-load",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".image-9",
                  selectorGuids: ["75711f2d-7d2d-2f56-821c-7eb4e50ef8d6"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-9-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".image-9",
                  selectorGuids: ["75711f2d-7d2d-2f56-821c-7eb4e50ef8d6"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1537450956550,
    },
    "a-10": {
      id: "a-10",
      title: "New Timed Animation",
      actionItemGroups: [],
      useFirstGroupAsInitialState: false,
      createdOn: 1537454113200,
    },
    "a-16": {
      id: "a-16",
      title: "text-page-load",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-16-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5ba1982a28c40a579666e024|7a53d6a4-ca74-bc58-a608-78bfa5496846",
                },
                xValue: -13,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-16-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5ba1982a28c40a579666e024|7a53d6a4-ca74-bc58-a608-78bfa5496846",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-16-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5ba1982a28c40a579666e024|7a53d6a4-ca74-bc58-a608-78bfa5496846",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-16-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeOut",
                duration: 1000,
                target: {
                  id: "5ba1982a28c40a579666e024|7a53d6a4-ca74-bc58-a608-78bfa5496846",
                },
                xValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1537810907249,
    },
    "a-18": {
      id: "a-18",
      title: "pre-loader-fade",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-18-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5b9a8915f61933d9aed7b45c|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-18-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  id: "5b9a8915f61933d9aed7b45c|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1537838285347,
    },
    "a-19": {
      id: "a-19",
      title: "inline-img-load",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-19-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".inline-img",
                  selectorGuids: ["0cf53743-fe4b-1972-9535-2ec48e0987a0"],
                },
                yValue: 22,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-19-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".inline-img",
                  selectorGuids: ["0cf53743-fe4b-1972-9535-2ec48e0987a0"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-19-n-3",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".inline-img",
                  selectorGuids: ["0cf53743-fe4b-1972-9535-2ec48e0987a0"],
                },
                xValue: 0.98,
                yValue: 0.98,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-19-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".inline-img",
                  selectorGuids: ["0cf53743-fe4b-1972-9535-2ec48e0987a0"],
                },
                xValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-19-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".inline-img",
                  selectorGuids: ["0cf53743-fe4b-1972-9535-2ec48e0987a0"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-19-n-6",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".inline-img",
                  selectorGuids: ["0cf53743-fe4b-1972-9535-2ec48e0987a0"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1537846578623,
    },
    "a-20": {
      id: "a-20",
      title: "Hover out menu 5",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-20-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5ba9d0ce69be1d2672d2e146|22db296b-bd08-0b87-ea56-5091da0b4c0f",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-20-n-2",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5ba9d0ce69be1d2672d2e146|22db296b-bd08-0b87-ea56-5091da0b4c10",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-20-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5ba9d0ce69be1d2672d2e146|22db296b-bd08-0b87-ea56-5091da0b4c11",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1516391548095,
    },
    "a-21": {
      id: "a-21",
      title: "Menu Hover 5",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-21-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "5ba9d0ce69be1d2672d2e146|22db296b-bd08-0b87-ea56-5091da0b4c0f",
                },
                globalSwatchId: "",
                rValue: 212,
                bValue: 212,
                gValue: 212,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-21-n-2",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5ba9d0ce69be1d2672d2e146|22db296b-bd08-0b87-ea56-5091da0b4c10",
                },
                globalSwatchId: "",
                rValue: 212,
                bValue: 212,
                gValue: 212,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-21-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5ba9d0ce69be1d2672d2e146|22db296b-bd08-0b87-ea56-5091da0b4c11",
                },
                globalSwatchId: "",
                rValue: 212,
                bValue: 212,
                gValue: 212,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1516390836572,
    },
    "a-22": {
      id: "a-22",
      title: "pre-loader-fade 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-22-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5ba9d0ce69be1d2672d2e146|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-22-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  id: "5ba9d0ce69be1d2672d2e146|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1537838285347,
    },
    "a-25": {
      id: "a-25",
      title: "pre-loader-fade 3",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-25-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5bad9de81c68cceb4c256b99|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  id: "5bad9de81c68cceb4c256b99|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1537838285347,
    },
    "a-28": {
      id: "a-28",
      title: "pre-loader-fade 4",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5baee9cabf02340a7639602e|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  id: "5baee9cabf02340a7639602e|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1537838285347,
    },
    "a-31": {
      id: "a-31",
      title: "pre-loader-fade 5",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-31-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5baefe90c110e440e87ed44b|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-31-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  id: "5baefe90c110e440e87ed44b|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1537838285347,
    },
    "a-34": {
      id: "a-34",
      title: "pre-loader-fade 6",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-34-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5bb01c2dc110e42e887f8a85|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-34-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  id: "5bb01c2dc110e42e887f8a85|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1537838285347,
    },
    "a-39": {
      id: "a-39",
      title: "main-pre-loader",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-39-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".pre-loader",
                  selectorGuids: ["fd15dd39-7f8f-14f9-f376-dd98646819ce"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-39-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".pre-loader",
                  selectorGuids: ["fd15dd39-7f8f-14f9-f376-dd98646819ce"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-39-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 2000,
                easing: "outBack",
                duration: 1000,
                target: {
                  selector: ".pre-loader",
                  selectorGuids: ["fd15dd39-7f8f-14f9-f376-dd98646819ce"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-39-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".pre-loader",
                  selectorGuids: ["fd15dd39-7f8f-14f9-f376-dd98646819ce"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1538278041400,
    },
    "a-40": {
      id: "a-40",
      title: "New Timed Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-40-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d54ff6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-40-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "easeIn",
                duration: 500,
                target: {
                  id: "5ba1982a28c40a579666e024|c04c5f17-55ba-4a1c-81c5-904816d54ff6",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1538281434871,
    },
    "a-41": {
      id: "a-41",
      title: "New Timed Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-41-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5ba7e9bd5ced0c1ec5e5f726|af742b4e-57af-03c0-5c34-cb9e7290f70c",
                },
                yValue: 4,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-41-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5ba7e9bd5ced0c1ec5e5f726|af742b4e-57af-03c0-5c34-cb9e7290f70c",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-41-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "",
                duration: 500,
                target: {
                  id: "5ba7e9bd5ced0c1ec5e5f726|af742b4e-57af-03c0-5c34-cb9e7290f70c",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-41-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "easeIn",
                duration: 500,
                target: {
                  id: "5ba7e9bd5ced0c1ec5e5f726|af742b4e-57af-03c0-5c34-cb9e7290f70c",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1538283141654,
    },
    "a-42": {
      id: "a-42",
      title: "New Timed Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-42-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5baee9cabf02340a7639602e|3e466ce2-f1d7-e08a-0bdf-4b3f031eb67e",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-42-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "5baee9cabf02340a7639602e|3e466ce2-f1d7-e08a-0bdf-4b3f031eb67e",
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-42-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5baee9cabf02340a7639602e|3e466ce2-f1d7-e08a-0bdf-4b3f031eb67e",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1538350292785,
    },
    "a-44": {
      id: "a-44",
      title: "hover-reveal-img",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-44-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  selector: ".image-55",
                  selectorGuids: ["083dc3f6-a4a0-cd1d-b903-936102fed185"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1576648175415,
    },
    "a-45": {
      id: "a-45",
      title: "hover-hide-image",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-45-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".image-55",
                  selectorGuids: ["083dc3f6-a4a0-cd1d-b903-936102fed185"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1576648354783,
    },
    "a-46": {
      id: "a-46",
      title: "pre-loader-fade 7",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-46-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5e04ef300aa529a8567a9adb|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-46-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  id: "5e04ef300aa529a8567a9adb|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1537838285347,
    },
    "a-49": {
      id: "a-49",
      title: "pre-loader-fade 8",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-49-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5e0f8d5b4b55b0958526eb31|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-49-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  id: "5e0f8d5b4b55b0958526eb31|743e047e-00de-1dbf-6d97-cd51c0aaf8ac",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1537838285347,
    },
    "a-78": {
      id: "a-78",
      title: "Hover out menu 26",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-78-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5e12d177c5e98c6ad1fc15ee|22db296b-bd08-0b87-ea56-5091da0b4c0f",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-78-n-2",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5e12d177c5e98c6ad1fc15ee|22db296b-bd08-0b87-ea56-5091da0b4c10",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-78-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5e12d177c5e98c6ad1fc15ee|22db296b-bd08-0b87-ea56-5091da0b4c11",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1516391548095,
    },
    "a-79": {
      id: "a-79",
      title: "Menu Hover 26",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-79-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "5e12d177c5e98c6ad1fc15ee|22db296b-bd08-0b87-ea56-5091da0b4c0f",
                },
                globalSwatchId: "",
                rValue: 212,
                bValue: 212,
                gValue: 212,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-79-n-2",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5e12d177c5e98c6ad1fc15ee|22db296b-bd08-0b87-ea56-5091da0b4c10",
                },
                globalSwatchId: "",
                rValue: 212,
                bValue: 212,
                gValue: 212,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-79-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  id: "5e12d177c5e98c6ad1fc15ee|22db296b-bd08-0b87-ea56-5091da0b4c11",
                },
                globalSwatchId: "",
                rValue: 212,
                bValue: 212,
                gValue: 212,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1516390836572,
    },
    "a-80": {
      id: "a-80",
      title: "Scroll Progress Indicator",
      continuousParameterGroups: [
        {
          id: "a-80-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-80-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".scroll-progress",
                      selectorGuids: ["015ef189-d28d-0d84-6253-2aba86dd31ea"],
                    },
                    xValue: 0,
                    locked: false,
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-80-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".scroll-progress",
                      selectorGuids: ["015ef189-d28d-0d84-6253-2aba86dd31ea"],
                    },
                    xValue: 1,
                    locked: false,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1578508757136,
    },
    "a-85": {
      id: "a-85",
      title: "Show space",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-85-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 1400,
                target: {
                  selector: ".space-manifesto",
                  selectorGuids: ["744c722d-e9fb-22be-1cf9-f2dfde000d11"],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "vh",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620089281834,
    },
    "a-87": {
      id: "a-87",
      title: "hide-earth",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-87-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "6090262beb57639d2ee2d2f0|e3515a63-d0b9-4bde-0f4d-2cf0ea1d417c",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-87-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6090262beb57639d2ee2d2f0|e3515a63-d0b9-4bde-0f4d-2cf0ea1d417c",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620159017338,
    },
    "a-88": {
      id: "a-88",
      title: "hide-space",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-88-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 2000,
                target: {
                  selector: ".space-manifesto",
                  selectorGuids: ["744c722d-e9fb-22be-1cf9-f2dfde000d11"],
                },
                yValue: -100,
                xUnit: "PX",
                yUnit: "vh",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620159386765,
    },
    "a-90": {
      id: "a-90",
      title: "Show-earth-on-close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-90-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".earth",
                  selectorGuids: ["7625e10b-1556-1304-7e71-caa6eebbf97f"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-90-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".earth",
                  selectorGuids: ["7625e10b-1556-1304-7e71-caa6eebbf97f"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620159659123,
    },
    "a-93": {
      id: "a-93",
      title: "Show-mountain-hover",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-93-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".mountain-gif",
                  selectorGuids: ["af6ac358-81fe-a058-b00d-3b96fedb0990"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-93-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".mountain-gif",
                  selectorGuids: ["af6ac358-81fe-a058-b00d-3b96fedb0990"],
                },
                value: "block",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620162156936,
    },
    "a-94": {
      id: "a-94",
      title: "hide-mountain",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-94-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  selector: ".mountain-gif",
                  selectorGuids: ["af6ac358-81fe-a058-b00d-3b96fedb0990"],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-94-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".mountain-gif",
                  selectorGuids: ["af6ac358-81fe-a058-b00d-3b96fedb0990"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1620162243758,
    },
    "a-95": {
      id: "a-95",
      title: "Eyes-fade in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-95-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-95-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1500,
                easing: "",
                duration: 800,
                target: {
                  id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620170488190,
    },
    "a-96": {
      id: "a-96",
      title: "eyes-hide-on-hover",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-96-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620172274523,
    },
    "a-97": {
      id: "a-97",
      title: "eyes-reveal-off-hover",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-97-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "6090262beb57639d2ee2d2f0|31a9dd19-3016-2e13-73ce-dd689e96f917",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620172316667,
    },
    "a-100": {
      id: "a-100",
      title: "preloader-off",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-100-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6090262beb57639d2ee2d2f0|9605036c-1cd3-b998-44af-b8b151df0f47",
                },
                value: "flex",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620174663044,
    },
    "a-101": {
      id: "a-101",
      title: "pre-loader-off",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-101-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 4000,
                easing: "",
                duration: 800,
                target: {
                  id: "6090262beb57639d2ee2d2f0|9605036c-1cd3-b998-44af-b8b151df0f47",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-101-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 1000,
                easing: "",
                duration: 0,
                target: {
                  id: "6090262beb57639d2ee2d2f0|9605036c-1cd3-b998-44af-b8b151df0f47",
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620174760349,
    },
    "a-103": {
      id: "a-103",
      title: "rotate-more-projects",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-103-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6090262beb57639d2ee2d2f0|ddb57be1-4a41-1da7-f7b6-6f567ff6140b",
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-103-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 15000,
                target: {
                  id: "6090262beb57639d2ee2d2f0|ddb57be1-4a41-1da7-f7b6-6f567ff6140b",
                },
                zValue: 360,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-103-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6090262beb57639d2ee2d2f0|ddb57be1-4a41-1da7-f7b6-6f567ff6140b",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620257190685,
    },
    "a-107": {
      id: "a-107",
      title: "offscreen-slider 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-107-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".work-slide-4",
                  selectorGuids: ["030ed9f5-2fc3-9d56-73d1-faeede4212f1"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-107-n-2",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".work-slide-4",
                  selectorGuids: ["030ed9f5-2fc3-9d56-73d1-faeede4212f1"],
                },
                filters: [
                  { type: "contrast", filterId: "e914", value: 29, unit: "%" },
                  {
                    type: "brightness",
                    filterId: "1fbc",
                    value: 143,
                    unit: "%",
                  },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1621021547910,
    },
    "a-110": {
      id: "a-110",
      title: "offscreen-slider-2-off",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-110-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".work-slide-4",
                  selectorGuids: ["030ed9f5-2fc3-9d56-73d1-faeede4212f1"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-110-n-2",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".work-slide-4",
                  selectorGuids: ["030ed9f5-2fc3-9d56-73d1-faeede4212f1"],
                },
                filters: [
                  { type: "contrast", filterId: "e914", value: 100, unit: "%" },
                  {
                    type: "brightness",
                    filterId: "1fbc",
                    value: 100,
                    unit: "%",
                  },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1621021547910,
    },
    "a-106": {
      id: "a-106",
      title: "offscreen-slider",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-106-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".work-slide-3",
                  selectorGuids: ["422e9392-149d-6b36-cae7-38bb6579fa74"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-106-n-2",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".work-slide-3",
                  selectorGuids: ["422e9392-149d-6b36-cae7-38bb6579fa74"],
                },
                filters: [
                  { type: "contrast", filterId: "e914", value: 29, unit: "%" },
                  {
                    type: "brightness",
                    filterId: "1fbc",
                    value: 143,
                    unit: "%",
                  },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1621021547910,
    },
    "a-109": {
      id: "a-109",
      title: "offscreen-slider-1-off",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-109-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".work-slide-3",
                  selectorGuids: ["422e9392-149d-6b36-cae7-38bb6579fa74"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-109-n-2",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".work-slide-3",
                  selectorGuids: ["422e9392-149d-6b36-cae7-38bb6579fa74"],
                },
                filters: [
                  { type: "contrast", filterId: "e914", value: 100, unit: "%" },
                  {
                    type: "brightness",
                    filterId: "1fbc",
                    value: 100,
                    unit: "%",
                  },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1621021547910,
    },
    "a-108": {
      id: "a-108",
      title: "offscreen-slider 3",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-108-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".work-slide-5",
                  selectorGuids: ["8e719a33-d1b7-40bd-f7b1-7268a4902861"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-108-n-2",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".work-slide-5",
                  selectorGuids: ["8e719a33-d1b7-40bd-f7b1-7268a4902861"],
                },
                filters: [
                  { type: "contrast", filterId: "e914", value: 29, unit: "%" },
                  {
                    type: "brightness",
                    filterId: "1fbc",
                    value: 143,
                    unit: "%",
                  },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1621021547910,
    },
    "a-111": {
      id: "a-111",
      title: "offscreen-slider-3-off",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-111-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".work-slide-5",
                  selectorGuids: ["8e719a33-d1b7-40bd-f7b1-7268a4902861"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-111-n-2",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".work-slide-5",
                  selectorGuids: ["8e719a33-d1b7-40bd-f7b1-7268a4902861"],
                },
                filters: [
                  { type: "contrast", filterId: "e914", value: 100, unit: "%" },
                  {
                    type: "brightness",
                    filterId: "1fbc",
                    value: 100,
                    unit: "%",
                  },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1621021547910,
    },
    "a-121": {
      id: "a-121",
      title: "rotate-more-is-more",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-121-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6090262beb57639d2ee2d2f0|be5bd850-9b7a-1ce0-24c2-4943ebf42b71",
                },
                xValue: 0,
                yValue: 0,
                zValue: 0,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-121-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 16000,
                target: {
                  id: "6090262beb57639d2ee2d2f0|be5bd850-9b7a-1ce0-24c2-4943ebf42b71",
                },
                zValue: 360,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-121-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6090262beb57639d2ee2d2f0|be5bd850-9b7a-1ce0-24c2-4943ebf42b71",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1621027933127,
    },
    "a-122": {
      id: "a-122",
      title: "Off-see-more-work",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-122-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".see-all-work",
                  selectorGuids: ["1ad82fa8-a115-0dfc-a11e-db9fd2466ef3"],
                },
                value: 0.05,
                unit: "",
              },
            },
            {
              id: "a-122-n-2",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".see-all-work",
                  selectorGuids: ["1ad82fa8-a115-0dfc-a11e-db9fd2466ef3"],
                },
                filters: [
                  { type: "saturate", filterId: "62a3", value: 0, unit: "%" },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1621039106316,
    },
    "a-123": {
      id: "a-123",
      title: "see-more-work-out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-123-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".see-all-work",
                  selectorGuids: ["1ad82fa8-a115-0dfc-a11e-db9fd2466ef3"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-123-n-2",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".see-all-work",
                  selectorGuids: ["1ad82fa8-a115-0dfc-a11e-db9fd2466ef3"],
                },
                filters: [
                  { type: "saturate", filterId: "b2d0", value: 0, unit: "%" },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1621039271369,
    },
    "a-125": {
      id: "a-125",
      title: "Buddha-spin",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-125-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "60de44d30f5041934c3aa62e|7c86374f-4727-d580-de4a-708a49eec637",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-125-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200000,
                target: {
                  id: "60de44d30f5041934c3aa62e|7c86374f-4727-d580-de4a-708a49eec637",
                },
                zValue: -360,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-125-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "60de44d30f5041934c3aa62e|7c86374f-4727-d580-de4a-708a49eec637",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1625180266954,
    },
    "a-126": {
      id: "a-126",
      title: "rotate-buddha",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-126-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "60de44d30f5041934c3aa62e|df2db002-e16a-d2e3-87a9-49b43536131f",
                },
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-126-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200000,
                target: {
                  id: "60de44d30f5041934c3aa62e|df2db002-e16a-d2e3-87a9-49b43536131f",
                },
                zValue: 360,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-126-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "60de44d30f5041934c3aa62e|df2db002-e16a-d2e3-87a9-49b43536131f",
                },
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1625181186960,
    },
    "a-127": {
      id: "a-127",
      title: "roate-3rd-buddha",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-127-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "60de44d30f5041934c3aa62e|694ceeed-d83e-7d6f-ba79-cccb8f66fd27",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-127-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200000,
                target: {
                  id: "60de44d30f5041934c3aa62e|694ceeed-d83e-7d6f-ba79-cccb8f66fd27",
                },
                zValue: 360,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-127-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "60de44d30f5041934c3aa62e|694ceeed-d83e-7d6f-ba79-cccb8f66fd27",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1625181395371,
    },
    "a-129": {
      id: "a-129",
      title: "Email CTA Slide In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-129-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "5ba1982a28c40a579666e024|bac585e8-0c6f-7e5c-a421-5fc55b801b55",
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-129-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 4000,
                easing: "",
                duration: 500,
                target: {
                  id: "5ba1982a28c40a579666e024|bac585e8-0c6f-7e5c-a421-5fc55b801b55",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1670114463109,
    },
    "a-130": {
      id: "a-130",
      title: "Email CTA Slide Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-130-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".email-cta-slide-up",
                  selectorGuids: ["8a3585cb-38ec-96fc-fe82-2853c72a373d"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-130-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".email-cta-slide-up",
                  selectorGuids: ["8a3585cb-38ec-96fc-fe82-2853c72a373d"],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1670114926661,
    },
    slideInLeft: {
      id: "slideInLeft",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: -100,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
    },
    fadeIn: {
      id: "fadeIn",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    spinInClockwise: {
      id: "spinInClockwise",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                zValue: -900,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    slideInTop: {
      id: "slideInTop",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: -100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
    },
    slideInBottom: {
      id: "slideInBottom",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});