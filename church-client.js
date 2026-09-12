(function () {
  var e = Object.create,
    t = Object.defineProperty,
    n = Object.getOwnPropertyDescriptor,
    r = Object.getOwnPropertyNames,
    i = Object.getPrototypeOf,
    a = Object.prototype.hasOwnProperty,
    o = (e, t) => () => (
      t || (e((t = { exports: {} }).exports, t), (e = null)),
      t.exports
    ),
    s = (e, i, o, s) => {
      if ((i && typeof i == `object`) || typeof i == `function`)
        for (var c = r(i), l = 0, u = c.length, d; l < u; l++)
          ((d = c[l]),
            !a.call(e, d) &&
              d !== o &&
              t(e, d, {
                get: ((e) => i[e]).bind(null, d),
                enumerable: !(s = n(i, d)) || s.enumerable,
              }));
      return e;
    },
    c = (n, r, o) => (
      (o = n == null ? {} : e(i(n))),
      s(
        r || !n || !n.__esModule || !a.call(n, `default`)
          ? t(o, `default`, { value: n, enumerable: !0 })
          : o,
        n,
      )
    ),
    l = o((e) => {
      function t(e, t) {
        var n = e.length;
        e.push(t);
        a: for (; 0 < n; ) {
          var r = (n - 1) >>> 1,
            a = e[r];
          if (0 < i(a, t)) ((e[r] = t), (e[n] = a), (n = r));
          else break a;
        }
      }
      function n(e) {
        return e.length === 0 ? null : e[0];
      }
      function r(e) {
        if (e.length === 0) return null;
        var t = e[0],
          n = e.pop();
        if (n !== t) {
          e[0] = n;
          a: for (var r = 0, a = e.length, o = a >>> 1; r < o; ) {
            var s = 2 * (r + 1) - 1,
              c = e[s],
              l = s + 1,
              u = e[l];
            if (0 > i(c, n))
              l < a && 0 > i(u, c)
                ? ((e[r] = u), (e[l] = n), (r = l))
                : ((e[r] = c), (e[s] = n), (r = s));
            else if (l < a && 0 > i(u, n)) ((e[r] = u), (e[l] = n), (r = l));
            else break a;
          }
        }
        return t;
      }
      function i(e, t) {
        var n = e.sortIndex - t.sortIndex;
        return n === 0 ? e.id - t.id : n;
      }
      if (
        ((e.unstable_now = void 0),
        typeof performance == `object` && typeof performance.now == `function`)
      ) {
        var a = performance;
        e.unstable_now = function () {
          return a.now();
        };
      } else {
        var o = Date,
          s = o.now();
        e.unstable_now = function () {
          return o.now() - s;
        };
      }
      var c = [],
        l = [],
        u = 1,
        d = null,
        f = 3,
        p = !1,
        m = !1,
        h = !1,
        g = !1,
        _ = typeof setTimeout == `function` ? setTimeout : null,
        v = typeof clearTimeout == `function` ? clearTimeout : null,
        y = typeof setImmediate < `u` ? setImmediate : null;
      function b(e) {
        for (var i = n(l); i !== null; ) {
          if (i.callback === null) r(l);
          else if (i.startTime <= e)
            (r(l), (i.sortIndex = i.expirationTime), t(c, i));
          else break;
          i = n(l);
        }
      }
      function x(e) {
        if (((h = !1), b(e), !m)) {
          if (n(c) !== null) ((m = !0), ee || ((ee = !0), ie()));
          else {
            var t = n(l);
            t !== null && se(x, t.startTime - e);
          }
        }
      }
      var ee = !1,
        S = -1,
        C = 5,
        te = -1;
      function ne() {
        return g ? !0 : !(e.unstable_now() - te < C);
      }
      function re() {
        if (((g = !1), ee)) {
          var t = e.unstable_now();
          te = t;
          var i = !0;
          try {
            a: {
              ((m = !1), h && ((h = !1), v(S), (S = -1)), (p = !0));
              var a = f;
              try {
                b: {
                  for (
                    b(t), d = n(c);
                    d !== null && !(d.expirationTime > t && ne());
                  ) {
                    var o = d.callback;
                    if (typeof o == `function`) {
                      ((d.callback = null), (f = d.priorityLevel));
                      var s = o(d.expirationTime <= t);
                      if (((t = e.unstable_now()), typeof s == `function`)) {
                        ((d.callback = s), b(t), (i = !0));
                        break b;
                      }
                      (d === n(c) && r(c), b(t));
                    } else r(c);
                    d = n(c);
                  }
                  if (d !== null) i = !0;
                  else {
                    var u = n(l);
                    (u !== null && se(x, u.startTime - t), (i = !1));
                  }
                }
                break a;
              } finally {
                ((d = null), (f = a), (p = !1));
              }
              i = void 0;
            }
          } finally {
            i ? ie() : (ee = !1);
          }
        }
      }
      var ie;
      if (typeof y == `function`)
        ie = function () {
          y(re);
        };
      else if (typeof MessageChannel < `u`) {
        var ae = new MessageChannel(),
          oe = ae.port2;
        ((ae.port1.onmessage = re),
          (ie = function () {
            oe.postMessage(null);
          }));
      } else
        ie = function () {
          _(re, 0);
        };
      function se(t, n) {
        S = _(function () {
          t(e.unstable_now());
        }, n);
      }
      ((e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (e) {
          e.callback = null;
        }),
        (e.unstable_forceFrameRate = function (e) {
          0 > e || 125 < e
            ? console.error(
                `forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`,
              )
            : (C = 0 < e ? Math.floor(1e3 / e) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
          return f;
        }),
        (e.unstable_next = function (e) {
          switch (f) {
            case 1:
            case 2:
            case 3:
              var t = 3;
              break;
            default:
              t = f;
          }
          var n = f;
          f = t;
          try {
            return e();
          } finally {
            f = n;
          }
        }),
        (e.unstable_requestPaint = function () {
          g = !0;
        }),
        (e.unstable_runWithPriority = function (e, t) {
          switch (e) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            default:
              e = 3;
          }
          var n = f;
          f = e;
          try {
            return t();
          } finally {
            f = n;
          }
        }),
        (e.unstable_scheduleCallback = function (r, i, a) {
          var o = e.unstable_now();
          switch (
            (typeof a == `object` && a
              ? ((a = a.delay), (a = typeof a == `number` && 0 < a ? o + a : o))
              : (a = o),
            r)
          ) {
            case 1:
              var s = -1;
              break;
            case 2:
              s = 250;
              break;
            case 5:
              s = 1073741823;
              break;
            case 4:
              s = 1e4;
              break;
            default:
              s = 5e3;
          }
          return (
            (s = a + s),
            (r = {
              id: u++,
              callback: i,
              priorityLevel: r,
              startTime: a,
              expirationTime: s,
              sortIndex: -1,
            }),
            a > o
              ? ((r.sortIndex = a),
                t(l, r),
                n(c) === null &&
                  r === n(l) &&
                  (h ? (v(S), (S = -1)) : (h = !0), se(x, a - o)))
              : ((r.sortIndex = s),
                t(c, r),
                m || p || ((m = !0), ee || ((ee = !0), ie()))),
            r
          );
        }),
        (e.unstable_shouldYield = ne),
        (e.unstable_wrapCallback = function (e) {
          var t = f;
          return function () {
            var n = f;
            f = t;
            try {
              return e.apply(this, arguments);
            } finally {
              f = n;
            }
          };
        }));
    }),
    u = o((e, t) => {
      t.exports = l();
    }),
    d = o((e) => {
      var t = Symbol.for(`react.transitional.element`),
        n = Symbol.for(`react.portal`),
        r = Symbol.for(`react.fragment`),
        i = Symbol.for(`react.strict_mode`),
        a = Symbol.for(`react.profiler`),
        o = Symbol.for(`react.consumer`),
        s = Symbol.for(`react.context`),
        c = Symbol.for(`react.forward_ref`),
        l = Symbol.for(`react.suspense`),
        u = Symbol.for(`react.memo`),
        d = Symbol.for(`react.lazy`),
        f = Symbol.for(`react.activity`),
        p = Symbol.iterator;
      function m(e) {
        return typeof e != `object` || !e
          ? null
          : ((e = (p && e[p]) || e[`@@iterator`]),
            typeof e == `function` ? e : null);
      }
      var h = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function () {},
          enqueueReplaceState: function () {},
          enqueueSetState: function () {},
        },
        g = Object.assign,
        _ = {};
      function v(e, t, n) {
        ((this.props = e),
          (this.context = t),
          (this.refs = _),
          (this.updater = n || h));
      }
      ((v.prototype.isReactComponent = {}),
        (v.prototype.setState = function (e, t) {
          if (typeof e != `object` && typeof e != `function` && e != null)
            throw Error(
              `takes an object of state variables to update or a function which returns an object of state variables.`,
            );
          this.updater.enqueueSetState(this, e, t, `setState`);
        }),
        (v.prototype.forceUpdate = function (e) {
          this.updater.enqueueForceUpdate(this, e, `forceUpdate`);
        }));
      function y() {}
      y.prototype = v.prototype;
      function b(e, t, n) {
        ((this.props = e),
          (this.context = t),
          (this.refs = _),
          (this.updater = n || h));
      }
      var x = (b.prototype = new y());
      ((x.constructor = b), g(x, v.prototype), (x.isPureReactComponent = !0));
      var ee = Array.isArray;
      function S() {}
      var C = { H: null, A: null, T: null, S: null },
        te = Object.prototype.hasOwnProperty;
      function ne(e, n, r) {
        var i = r.ref;
        return {
          $$typeof: t,
          type: e,
          key: n,
          ref: i === void 0 ? null : i,
          props: r,
        };
      }
      function re(e, t) {
        return ne(e.type, t, e.props);
      }
      function ie(e) {
        return typeof e == `object` && !!e && e.$$typeof === t;
      }
      function ae(e) {
        var t = { '=': `=0`, ':': `=2` };
        return (
          `$` +
          e.replace(/[=:]/g, function (e) {
            return t[e];
          })
        );
      }
      var oe = /\/+/g;
      function se(e, t) {
        return typeof e == `object` && e && e.key != null
          ? ae(`` + e.key)
          : t.toString(36);
      }
      function ce(e) {
        switch (e.status) {
          case `fulfilled`:
            return e.value;
          case `rejected`:
            throw e.reason;
          default:
            switch (
              (typeof e.status == `string`
                ? e.then(S, S)
                : ((e.status = `pending`),
                  e.then(
                    function (t) {
                      e.status === `pending` &&
                        ((e.status = `fulfilled`), (e.value = t));
                    },
                    function (t) {
                      e.status === `pending` &&
                        ((e.status = `rejected`), (e.reason = t));
                    },
                  )),
              e.status)
            ) {
              case `fulfilled`:
                return e.value;
              case `rejected`:
                throw e.reason;
            }
        }
        throw e;
      }
      function le(e, r, i, a, o) {
        var s = typeof e;
        (s === `undefined` || s === `boolean`) && (e = null);
        var c = !1;
        if (e === null) c = !0;
        else
          switch (s) {
            case `bigint`:
            case `string`:
            case `number`:
              c = !0;
              break;
            case `object`:
              switch (e.$$typeof) {
                case t:
                case n:
                  c = !0;
                  break;
                case d:
                  return ((c = e._init), le(c(e._payload), r, i, a, o));
              }
          }
        if (c)
          return (
            (o = o(e)),
            (c = a === `` ? `.` + se(e, 0) : a),
            ee(o)
              ? ((i = ``),
                c != null && (i = c.replace(oe, `$&/`) + `/`),
                le(o, r, i, ``, function (e) {
                  return e;
                }))
              : o != null &&
                (ie(o) &&
                  (o = re(
                    o,
                    i +
                      (o.key == null || (e && e.key === o.key)
                        ? ``
                        : (`` + o.key).replace(oe, `$&/`) + `/`) +
                      c,
                  )),
                r.push(o)),
            1
          );
        c = 0;
        var l = a === `` ? `.` : a + `:`;
        if (ee(e))
          for (var u = 0; u < e.length; u++)
            ((a = e[u]), (s = l + se(a, u)), (c += le(a, r, i, s, o)));
        else if (((u = m(e)), typeof u == `function`))
          for (e = u.call(e), u = 0; !(a = e.next()).done; )
            ((a = a.value), (s = l + se(a, u++)), (c += le(a, r, i, s, o)));
        else if (s === `object`) {
          if (typeof e.then == `function`) return le(ce(e), r, i, a, o);
          throw (
            (r = String(e)),
            Error(
              `Objects are not valid as a React child (found: ` +
                (r === `[object Object]`
                  ? `object with keys {` + Object.keys(e).join(`, `) + `}`
                  : r) +
                `). If you meant to render a collection of children, use an array instead.`,
            )
          );
        }
        return c;
      }
      function ue(e, t, n) {
        if (e == null) return e;
        var r = [],
          i = 0;
        return (
          le(e, r, ``, ``, function (e) {
            return t.call(n, e, i++);
          }),
          r
        );
      }
      function de(e) {
        if (e._status === -1) {
          var t = e._result;
          ((t = t()),
            t.then(
              function (t) {
                (e._status === 0 || e._status === -1) &&
                  ((e._status = 1), (e._result = t));
              },
              function (t) {
                (e._status === 0 || e._status === -1) &&
                  ((e._status = 2), (e._result = t));
              },
            ),
            e._status === -1 && ((e._status = 0), (e._result = t)));
        }
        if (e._status === 1) return e._result.default;
        throw e._result;
      }
      var w =
          typeof reportError == `function`
            ? reportError
            : function (e) {
                if (
                  typeof window == `object` &&
                  typeof window.ErrorEvent == `function`
                ) {
                  var t = new window.ErrorEvent(`error`, {
                    bubbles: !0,
                    cancelable: !0,
                    message:
                      typeof e == `object` && e && typeof e.message == `string`
                        ? String(e.message)
                        : String(e),
                    error: e,
                  });
                  if (!window.dispatchEvent(t)) return;
                } else if (
                  typeof process == `object` &&
                  typeof process.emit == `function`
                ) {
                  process.emit(`uncaughtException`, e);
                  return;
                }
                console.error(e);
              },
        T = {
          map: ue,
          forEach: function (e, t, n) {
            ue(
              e,
              function () {
                t.apply(this, arguments);
              },
              n,
            );
          },
          count: function (e) {
            var t = 0;
            return (
              ue(e, function () {
                t++;
              }),
              t
            );
          },
          toArray: function (e) {
            return (
              ue(e, function (e) {
                return e;
              }) || []
            );
          },
          only: function (e) {
            if (!ie(e))
              throw Error(
                `React.Children.only expected to receive a single React element child.`,
              );
            return e;
          },
        };
      ((e.Activity = f),
        (e.Children = T),
        (e.Component = v),
        (e.Fragment = r),
        (e.Profiler = a),
        (e.PureComponent = b),
        (e.StrictMode = i),
        (e.Suspense = l),
        (e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C),
        (e.__COMPILER_RUNTIME = {
          __proto__: null,
          c: function (e) {
            return C.H.useMemoCache(e);
          },
        }),
        (e.cache = function (e) {
          return function () {
            return e.apply(null, arguments);
          };
        }),
        (e.cacheSignal = function () {
          return null;
        }),
        (e.cloneElement = function (e, t, n) {
          if (e == null)
            throw Error(
              `The argument must be a React element, but you passed ` + e + `.`,
            );
          var r = g({}, e.props),
            i = e.key;
          if (t != null)
            for (a in (t.key !== void 0 && (i = `` + t.key), t))
              !te.call(t, a) ||
                a === `key` ||
                a === `__self` ||
                a === `__source` ||
                (a === `ref` && t.ref === void 0) ||
                (r[a] = t[a]);
          var a = arguments.length - 2;
          if (a === 1) r.children = n;
          else if (1 < a) {
            for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
            r.children = o;
          }
          return ne(e.type, i, r);
        }),
        (e.createContext = function (e) {
          return (
            (e = {
              $$typeof: s,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
            }),
            (e.Provider = e),
            (e.Consumer = { $$typeof: o, _context: e }),
            e
          );
        }),
        (e.createElement = function (e, t, n) {
          var r,
            i = {},
            a = null;
          if (t != null)
            for (r in (t.key !== void 0 && (a = `` + t.key), t))
              te.call(t, r) &&
                r !== `key` &&
                r !== `__self` &&
                r !== `__source` &&
                (i[r] = t[r]);
          var o = arguments.length - 2;
          if (o === 1) i.children = n;
          else if (1 < o) {
            for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
            i.children = s;
          }
          if (e && e.defaultProps)
            for (r in ((o = e.defaultProps), o))
              i[r] === void 0 && (i[r] = o[r]);
          return ne(e, a, i);
        }),
        (e.createRef = function () {
          return { current: null };
        }),
        (e.forwardRef = function (e) {
          return { $$typeof: c, render: e };
        }),
        (e.isValidElement = ie),
        (e.lazy = function (e) {
          return {
            $$typeof: d,
            _payload: { _status: -1, _result: e },
            _init: de,
          };
        }),
        (e.memo = function (e, t) {
          return { $$typeof: u, type: e, compare: t === void 0 ? null : t };
        }),
        (e.startTransition = function (e) {
          var t = C.T,
            n = {};
          C.T = n;
          try {
            var r = e(),
              i = C.S;
            (i !== null && i(n, r),
              typeof r == `object` &&
                r &&
                typeof r.then == `function` &&
                r.then(S, w));
          } catch (e) {
            w(e);
          } finally {
            (t !== null && n.types !== null && (t.types = n.types), (C.T = t));
          }
        }),
        (e.unstable_useCacheRefresh = function () {
          return C.H.useCacheRefresh();
        }),
        (e.use = function (e) {
          return C.H.use(e);
        }),
        (e.useActionState = function (e, t, n) {
          return C.H.useActionState(e, t, n);
        }),
        (e.useCallback = function (e, t) {
          return C.H.useCallback(e, t);
        }),
        (e.useContext = function (e) {
          return C.H.useContext(e);
        }),
        (e.useDebugValue = function () {}),
        (e.useDeferredValue = function (e, t) {
          return C.H.useDeferredValue(e, t);
        }),
        (e.useEffect = function (e, t) {
          return C.H.useEffect(e, t);
        }),
        (e.useEffectEvent = function (e) {
          return C.H.useEffectEvent(e);
        }),
        (e.useId = function () {
          return C.H.useId();
        }),
        (e.useImperativeHandle = function (e, t, n) {
          return C.H.useImperativeHandle(e, t, n);
        }),
        (e.useInsertionEffect = function (e, t) {
          return C.H.useInsertionEffect(e, t);
        }),
        (e.useLayoutEffect = function (e, t) {
          return C.H.useLayoutEffect(e, t);
        }),
        (e.useMemo = function (e, t) {
          return C.H.useMemo(e, t);
        }),
        (e.useOptimistic = function (e, t) {
          return C.H.useOptimistic(e, t);
        }),
        (e.useReducer = function (e, t, n) {
          return C.H.useReducer(e, t, n);
        }),
        (e.useRef = function (e) {
          return C.H.useRef(e);
        }),
        (e.useState = function (e) {
          return C.H.useState(e);
        }),
        (e.useSyncExternalStore = function (e, t, n) {
          return C.H.useSyncExternalStore(e, t, n);
        }),
        (e.useTransition = function () {
          return C.H.useTransition();
        }),
        (e.version = `19.2.8`));
    }),
    f = o((e, t) => {
      t.exports = d();
    }),
    p = o((e) => {
      var t = f();
      function n(e) {
        var t = `https://react.dev/errors/` + e;
        if (1 < arguments.length) {
          t += `?args[]=` + encodeURIComponent(arguments[1]);
          for (var n = 2; n < arguments.length; n++)
            t += `&args[]=` + encodeURIComponent(arguments[n]);
        }
        return (
          `Minified React error #` +
          e +
          `; visit ` +
          t +
          ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
        );
      }
      function r() {}
      var i = {
          d: {
            f: r,
            r: function () {
              throw Error(n(522));
            },
            D: r,
            C: r,
            L: r,
            m: r,
            X: r,
            S: r,
            M: r,
          },
          p: 0,
          findDOMNode: null,
        },
        a = Symbol.for(`react.portal`);
      function o(e, t, n) {
        var r =
          3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
          $$typeof: a,
          key: r == null ? null : `` + r,
          children: e,
          containerInfo: t,
          implementation: n,
        };
      }
      var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      function c(e, t) {
        if (e === `font`) return ``;
        if (typeof t == `string`) return t === `use-credentials` ? t : ``;
      }
      ((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i),
        (e.createPortal = function (e, t) {
          var r =
            2 < arguments.length && arguments[2] !== void 0
              ? arguments[2]
              : null;
          if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
            throw Error(n(299));
          return o(e, t, null, r);
        }),
        (e.flushSync = function (e) {
          var t = s.T,
            n = i.p;
          try {
            if (((s.T = null), (i.p = 2), e)) return e();
          } finally {
            ((s.T = t), (i.p = n), i.d.f());
          }
        }),
        (e.preconnect = function (e, t) {
          typeof e == `string` &&
            (t
              ? ((t = t.crossOrigin),
                (t =
                  typeof t == `string`
                    ? t === `use-credentials`
                      ? t
                      : ``
                    : void 0))
              : (t = null),
            i.d.C(e, t));
        }),
        (e.prefetchDNS = function (e) {
          typeof e == `string` && i.d.D(e);
        }),
        (e.preinit = function (e, t) {
          if (typeof e == `string` && t && typeof t.as == `string`) {
            var n = t.as,
              r = c(n, t.crossOrigin),
              a = typeof t.integrity == `string` ? t.integrity : void 0,
              o = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0;
            n === `style`
              ? i.d.S(
                  e,
                  typeof t.precedence == `string` ? t.precedence : void 0,
                  { crossOrigin: r, integrity: a, fetchPriority: o },
                )
              : n === `script` &&
                i.d.X(e, {
                  crossOrigin: r,
                  integrity: a,
                  fetchPriority: o,
                  nonce: typeof t.nonce == `string` ? t.nonce : void 0,
                });
          }
        }),
        (e.preinitModule = function (e, t) {
          if (typeof e == `string`) {
            if (typeof t == `object` && t) {
              if (t.as == null || t.as === `script`) {
                var n = c(t.as, t.crossOrigin);
                i.d.M(e, {
                  crossOrigin: n,
                  integrity:
                    typeof t.integrity == `string` ? t.integrity : void 0,
                  nonce: typeof t.nonce == `string` ? t.nonce : void 0,
                });
              }
            } else t ?? i.d.M(e);
          }
        }),
        (e.preload = function (e, t) {
          if (
            typeof e == `string` &&
            typeof t == `object` &&
            t &&
            typeof t.as == `string`
          ) {
            var n = t.as,
              r = c(n, t.crossOrigin);
            i.d.L(e, n, {
              crossOrigin: r,
              integrity: typeof t.integrity == `string` ? t.integrity : void 0,
              nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              type: typeof t.type == `string` ? t.type : void 0,
              fetchPriority:
                typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
              referrerPolicy:
                typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
              imageSrcSet:
                typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
              imageSizes:
                typeof t.imageSizes == `string` ? t.imageSizes : void 0,
              media: typeof t.media == `string` ? t.media : void 0,
            });
          }
        }),
        (e.preloadModule = function (e, t) {
          if (typeof e == `string`) {
            if (t) {
              var n = c(t.as, t.crossOrigin);
              i.d.m(e, {
                as:
                  typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
                crossOrigin: n,
                integrity:
                  typeof t.integrity == `string` ? t.integrity : void 0,
              });
            } else i.d.m(e);
          }
        }),
        (e.requestFormReset = function (e) {
          i.d.r(e);
        }),
        (e.unstable_batchedUpdates = function (e, t) {
          return e(t);
        }),
        (e.useFormState = function (e, t, n) {
          return s.H.useFormState(e, t, n);
        }),
        (e.useFormStatus = function () {
          return s.H.useHostTransitionStatus();
        }),
        (e.version = `19.2.8`));
    }),
    m = o((e, t) => {
      function n() {
        if (
          !(
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
          )
        )
          try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
          } catch (e) {
            console.error(e);
          }
      }
      (n(), (t.exports = p()));
    }),
    h = o((e) => {
      var t = u(),
        n = f(),
        r = m();
      function i(e) {
        var t = `https://react.dev/errors/` + e;
        if (1 < arguments.length) {
          t += `?args[]=` + encodeURIComponent(arguments[1]);
          for (var n = 2; n < arguments.length; n++)
            t += `&args[]=` + encodeURIComponent(arguments[n]);
        }
        return (
          `Minified React error #` +
          e +
          `; visit ` +
          t +
          ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
        );
      }
      function a(e) {
        return !(
          !e ||
          (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
        );
      }
      function o(e) {
        var t = e,
          n = e;
        if (e.alternate) for (; t.return; ) t = t.return;
        else {
          e = t;
          do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
          while (e);
        }
        return t.tag === 3 ? n : null;
      }
      function s(e) {
        if (e.tag === 13) {
          var t = e.memoizedState;
          if (
            (t === null &&
              ((e = e.alternate), e !== null && (t = e.memoizedState)),
            t !== null)
          )
            return t.dehydrated;
        }
        return null;
      }
      function c(e) {
        if (e.tag === 31) {
          var t = e.memoizedState;
          if (
            (t === null &&
              ((e = e.alternate), e !== null && (t = e.memoizedState)),
            t !== null)
          )
            return t.dehydrated;
        }
        return null;
      }
      function l(e) {
        if (o(e) !== e) throw Error(i(188));
      }
      function d(e) {
        var t = e.alternate;
        if (!t) {
          if (((t = o(e)), t === null)) throw Error(i(188));
          return t === e ? e : null;
        }
        for (var n = e, r = t; ; ) {
          var a = n.return;
          if (a === null) break;
          var s = a.alternate;
          if (s === null) {
            if (((r = a.return), r !== null)) {
              n = r;
              continue;
            }
            break;
          }
          if (a.child === s.child) {
            for (s = a.child; s; ) {
              if (s === n) return (l(a), e);
              if (s === r) return (l(a), t);
              s = s.sibling;
            }
            throw Error(i(188));
          }
          if (n.return !== r.return) ((n = a), (r = s));
          else {
            for (var c = !1, u = a.child; u; ) {
              if (u === n) {
                ((c = !0), (n = a), (r = s));
                break;
              }
              if (u === r) {
                ((c = !0), (r = a), (n = s));
                break;
              }
              u = u.sibling;
            }
            if (!c) {
              for (u = s.child; u; ) {
                if (u === n) {
                  ((c = !0), (n = s), (r = a));
                  break;
                }
                if (u === r) {
                  ((c = !0), (r = s), (n = a));
                  break;
                }
                u = u.sibling;
              }
              if (!c) throw Error(i(189));
            }
          }
          if (n.alternate !== r) throw Error(i(190));
        }
        if (n.tag !== 3) throw Error(i(188));
        return n.stateNode.current === n ? e : t;
      }
      function p(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6) return e;
        for (e = e.child; e !== null; ) {
          if (((t = p(e)), t !== null)) return t;
          e = e.sibling;
        }
        return null;
      }
      var h = Object.assign,
        g = Symbol.for(`react.element`),
        _ = Symbol.for(`react.transitional.element`),
        v = Symbol.for(`react.portal`),
        y = Symbol.for(`react.fragment`),
        b = Symbol.for(`react.strict_mode`),
        x = Symbol.for(`react.profiler`),
        ee = Symbol.for(`react.consumer`),
        S = Symbol.for(`react.context`),
        C = Symbol.for(`react.forward_ref`),
        te = Symbol.for(`react.suspense`),
        ne = Symbol.for(`react.suspense_list`),
        re = Symbol.for(`react.memo`),
        ie = Symbol.for(`react.lazy`),
        ae = Symbol.for(`react.activity`),
        oe = Symbol.for(`react.memo_cache_sentinel`),
        se = Symbol.iterator;
      function ce(e) {
        return typeof e != `object` || !e
          ? null
          : ((e = (se && e[se]) || e[`@@iterator`]),
            typeof e == `function` ? e : null);
      }
      var le = Symbol.for(`react.client.reference`);
      function ue(e) {
        if (e == null) return null;
        if (typeof e == `function`)
          return e.$$typeof === le ? null : e.displayName || e.name || null;
        if (typeof e == `string`) return e;
        switch (e) {
          case y:
            return `Fragment`;
          case x:
            return `Profiler`;
          case b:
            return `StrictMode`;
          case te:
            return `Suspense`;
          case ne:
            return `SuspenseList`;
          case ae:
            return `Activity`;
        }
        if (typeof e == `object`)
          switch (e.$$typeof) {
            case v:
              return `Portal`;
            case S:
              return e.displayName || `Context`;
            case ee:
              return (e._context.displayName || `Context`) + `.Consumer`;
            case C:
              var t = e.render;
              return (
                (e = e.displayName),
                (e ||=
                  ((e = t.displayName || t.name || ``),
                  e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
                e
              );
            case re:
              return (
                (t = e.displayName || null),
                t === null ? ue(e.type) || `Memo` : t
              );
            case ie:
              ((t = e._payload), (e = e._init));
              try {
                return ue(e(t));
              } catch {}
          }
        return null;
      }
      var de = Array.isArray,
        w = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        T = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        fe = { pending: !1, data: null, method: null, action: null },
        pe = [],
        me = -1;
      function he(e) {
        return { current: e };
      }
      function ge(e) {
        0 > me || ((e.current = pe[me]), (pe[me] = null), me--);
      }
      function E(e, t) {
        (me++, (pe[me] = e.current), (e.current = t));
      }
      var _e = he(null),
        ve = he(null),
        ye = he(null),
        be = he(null);
      function xe(e, t) {
        switch ((E(ye, t), E(ve, e), E(_e, null), t.nodeType)) {
          case 9:
          case 11:
            e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
            break;
          default:
            if (((e = t.tagName), (t = t.namespaceURI)))
              ((t = Vd(t)), (e = Hd(t, e)));
            else
              switch (e) {
                case `svg`:
                  e = 1;
                  break;
                case `math`:
                  e = 2;
                  break;
                default:
                  e = 0;
              }
        }
        (ge(_e), E(_e, e));
      }
      function Se() {
        (ge(_e), ge(ve), ge(ye));
      }
      function Ce(e) {
        e.memoizedState !== null && E(be, e);
        var t = _e.current,
          n = Hd(t, e.type);
        t !== n && (E(ve, e), E(_e, n));
      }
      function we(e) {
        (ve.current === e && (ge(_e), ge(ve)),
          be.current === e && (ge(be), (Qf._currentValue = fe)));
      }
      var Te, Ee;
      function De(e) {
        if (Te === void 0)
          try {
            throw Error();
          } catch (e) {
            var t = e.stack.trim().match(/\n( *(at )?)/);
            ((Te = (t && t[1]) || ``),
              (Ee =
                -1 <
                e.stack.indexOf(`
    at`)
                  ? ` (<anonymous>)`
                  : -1 < e.stack.indexOf(`@`)
                    ? `@unknown:0:0`
                    : ``));
          }
        return (
          `
` +
          Te +
          e +
          Ee
        );
      }
      var Oe = !1;
      function ke(e, t) {
        if (!e || Oe) return ``;
        Oe = !0;
        var n = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          var r = {
            DetermineComponentFrameRoot: function () {
              try {
                if (t) {
                  var n = function () {
                    throw Error();
                  };
                  if (
                    (Object.defineProperty(n.prototype, 'props', {
                      set: function () {
                        throw Error();
                      },
                    }),
                    typeof Reflect == `object` && Reflect.construct)
                  ) {
                    try {
                      Reflect.construct(n, []);
                    } catch (e) {
                      var r = e;
                    }
                    Reflect.construct(e, [], n);
                  } else {
                    try {
                      n.call();
                    } catch (e) {
                      r = e;
                    }
                    e.call(n.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (e) {
                    r = e;
                  }
                  (n = e()) &&
                    typeof n.catch == `function` &&
                    n.catch(function () {});
                }
              } catch (e) {
                if (e && r && typeof e.stack == `string`)
                  return [e.stack, r.stack];
              }
              return [null, null];
            },
          };
          r.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`;
          var i = Object.getOwnPropertyDescriptor(
            r.DetermineComponentFrameRoot,
            `name`,
          );
          i &&
            i.configurable &&
            Object.defineProperty(r.DetermineComponentFrameRoot, 'name', {
              value: `DetermineComponentFrameRoot`,
            });
          var a = r.DetermineComponentFrameRoot(),
            o = a[0],
            s = a[1];
          if (o && s) {
            var c = o.split(`
`),
              l = s.split(`
`);
            for (
              i = r = 0;
              r < c.length && !c[r].includes(`DetermineComponentFrameRoot`);
            )
              r++;
            for (
              ;
              i < l.length && !l[i].includes(`DetermineComponentFrameRoot`);
            )
              i++;
            if (r === c.length || i === l.length)
              for (
                r = c.length - 1, i = l.length - 1;
                1 <= r && 0 <= i && c[r] !== l[i];
              )
                i--;
            for (; 1 <= r && 0 <= i; r--, i--)
              if (c[r] !== l[i]) {
                if (r !== 1 || i !== 1)
                  do
                    if ((r--, i--, 0 > i || c[r] !== l[i])) {
                      var u =
                        `
` + c[r].replace(` at new `, ` at `);
                      return (
                        e.displayName &&
                          u.includes(`<anonymous>`) &&
                          (u = u.replace(`<anonymous>`, e.displayName)),
                        u
                      );
                    }
                  while (1 <= r && 0 <= i);
                break;
              }
          }
        } finally {
          ((Oe = !1), (Error.prepareStackTrace = n));
        }
        return (n = e ? e.displayName || e.name : ``) ? De(n) : ``;
      }
      function Ae(e, t) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            return De(e.type);
          case 16:
            return De(`Lazy`);
          case 13:
            return e.child !== t && t !== null
              ? De(`Suspense Fallback`)
              : De(`Suspense`);
          case 19:
            return De(`SuspenseList`);
          case 0:
          case 15:
            return ke(e.type, !1);
          case 11:
            return ke(e.type.render, !1);
          case 1:
            return ke(e.type, !0);
          case 31:
            return De(`Activity`);
          default:
            return ``;
        }
      }
      function je(e) {
        try {
          var t = ``,
            n = null;
          do ((t += Ae(e, n)), (n = e), (e = e.return));
          while (e);
          return t;
        } catch (e) {
          return (
            `
Error generating stack: ` +
            e.message +
            `
` +
            e.stack
          );
        }
      }
      var Me = Object.prototype.hasOwnProperty,
        Ne = t.unstable_scheduleCallback,
        Pe = t.unstable_cancelCallback,
        Fe = t.unstable_shouldYield,
        Ie = t.unstable_requestPaint,
        Le = t.unstable_now,
        Re = t.unstable_getCurrentPriorityLevel,
        ze = t.unstable_ImmediatePriority,
        Be = t.unstable_UserBlockingPriority,
        Ve = t.unstable_NormalPriority,
        He = t.unstable_LowPriority,
        Ue = t.unstable_IdlePriority,
        We = t.log,
        Ge = t.unstable_setDisableYieldValue,
        Ke = null,
        qe = null;
      function Je(e) {
        if (
          (typeof We == `function` && Ge(e),
          qe && typeof qe.setStrictMode == `function`)
        )
          try {
            qe.setStrictMode(Ke, e);
          } catch {}
      }
      var Ye = Math.clz32 ? Math.clz32 : Qe,
        Xe = Math.log,
        Ze = Math.LN2;
      function Qe(e) {
        return ((e >>>= 0), e === 0 ? 32 : (31 - ((Xe(e) / Ze) | 0)) | 0);
      }
      var $e = 256,
        et = 262144,
        tt = 4194304;
      function nt(e) {
        var t = e & 42;
        if (t !== 0) return t;
        switch (e & -e) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
            return 64;
          case 128:
            return 128;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
            return e & 261888;
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return e & 3932160;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return e & 62914560;
          case 67108864:
            return 67108864;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 0;
          default:
            return e;
        }
      }
      function rt(e, t, n) {
        var r = e.pendingLanes;
        if (r === 0) return 0;
        var i = 0,
          a = e.suspendedLanes,
          o = e.pingedLanes;
        e = e.warmLanes;
        var s = r & 134217727;
        return (
          s === 0
            ? ((s = r & ~a),
              s === 0
                ? o === 0
                  ? n || ((n = r & ~e), n !== 0 && (i = nt(n)))
                  : (i = nt(o))
                : (i = nt(s)))
            : ((r = s & ~a),
              r === 0
                ? ((o &= s),
                  o === 0
                    ? n || ((n = s & ~e), n !== 0 && (i = nt(n)))
                    : (i = nt(o)))
                : (i = nt(r))),
          i === 0
            ? 0
            : t !== 0 &&
                t !== i &&
                (t & a) === 0 &&
                ((a = i & -i),
                (n = t & -t),
                a >= n || (a === 32 && n & 4194048))
              ? t
              : i
        );
      }
      function it(e, t) {
        return (
          (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
        );
      }
      function at(e, t) {
        switch (e) {
          case 1:
          case 2:
          case 4:
          case 8:
          case 64:
            return t + 250;
          case 16:
          case 32:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return t + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return -1;
          case 67108864:
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function ot() {
        var e = tt;
        return ((tt <<= 1), !(tt & 62914560) && (tt = 4194304), e);
      }
      function st(e) {
        for (var t = [], n = 0; 31 > n; n++) t.push(e);
        return t;
      }
      function ct(e, t) {
        ((e.pendingLanes |= t),
          t !== 268435456 &&
            ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
      }
      function lt(e, t, n, r, i, a) {
        var o = e.pendingLanes;
        ((e.pendingLanes = n),
          (e.suspendedLanes = 0),
          (e.pingedLanes = 0),
          (e.warmLanes = 0),
          (e.expiredLanes &= n),
          (e.entangledLanes &= n),
          (e.errorRecoveryDisabledLanes &= n),
          (e.shellSuspendCounter = 0));
        var s = e.entanglements,
          c = e.expirationTimes,
          l = e.hiddenUpdates;
        for (n = o & ~n; 0 < n; ) {
          var u = 31 - Ye(n),
            d = 1 << u;
          ((s[u] = 0), (c[u] = -1));
          var f = l[u];
          if (f !== null)
            for (l[u] = null, u = 0; u < f.length; u++) {
              var p = f[u];
              p !== null && (p.lane &= -536870913);
            }
          n &= ~d;
        }
        (r !== 0 && ut(e, r, 0),
          a !== 0 &&
            i === 0 &&
            e.tag !== 0 &&
            (e.suspendedLanes |= a & ~(o & ~t)));
      }
      function ut(e, t, n) {
        ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
        var r = 31 - Ye(t);
        ((e.entangledLanes |= t),
          (e.entanglements[r] =
            e.entanglements[r] | 1073741824 | (n & 261930)));
      }
      function dt(e, t) {
        var n = (e.entangledLanes |= t);
        for (e = e.entanglements; n; ) {
          var r = 31 - Ye(n),
            i = 1 << r;
          ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
        }
      }
      function ft(e, t) {
        var n = t & -t;
        return (
          (n = n & 42 ? 1 : pt(n)),
          (n & (e.suspendedLanes | t)) === 0 ? n : 0
        );
      }
      function pt(e) {
        switch (e) {
          case 2:
            e = 1;
            break;
          case 8:
            e = 4;
            break;
          case 32:
            e = 16;
            break;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            e = 128;
            break;
          case 268435456:
            e = 134217728;
            break;
          default:
            e = 0;
        }
        return e;
      }
      function mt(e) {
        return (
          (e &= -e),
          2 < e ? (8 < e ? (e & 134217727 ? 32 : 268435456) : 8) : 2
        );
      }
      function ht() {
        var e = T.p;
        return e === 0
          ? ((e = window.event), e === void 0 ? 32 : mp(e.type))
          : e;
      }
      function gt(e, t) {
        var n = T.p;
        try {
          return ((T.p = e), t());
        } finally {
          T.p = n;
        }
      }
      var _t = Math.random().toString(36).slice(2),
        vt = `__reactFiber$` + _t,
        yt = `__reactProps$` + _t,
        bt = `__reactContainer$` + _t,
        xt = `__reactEvents$` + _t,
        St = `__reactListeners$` + _t,
        Ct = `__reactHandles$` + _t,
        wt = `__reactResources$` + _t,
        Tt = `__reactMarker$` + _t;
      function Et(e) {
        (delete e[vt], delete e[yt], delete e[xt], delete e[St], delete e[Ct]);
      }
      function Dt(e) {
        var t = e[vt];
        if (t) return t;
        for (var n = e.parentNode; n; ) {
          if ((t = n[bt] || n[vt])) {
            if (
              ((n = t.alternate),
              t.child !== null || (n !== null && n.child !== null))
            )
              for (e = df(e); e !== null; ) {
                if ((n = e[vt])) return n;
                e = df(e);
              }
            return t;
          }
          ((e = n), (n = e.parentNode));
        }
        return null;
      }
      function Ot(e) {
        if ((e = e[vt] || e[bt])) {
          var t = e.tag;
          if (
            t === 5 ||
            t === 6 ||
            t === 13 ||
            t === 31 ||
            t === 26 ||
            t === 27 ||
            t === 3
          )
            return e;
        }
        return null;
      }
      function kt(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
        throw Error(i(33));
      }
      function At(e) {
        var t = e[wt];
        return (
          (t ||= e[wt] =
            { hoistableStyles: new Map(), hoistableScripts: new Map() }),
          t
        );
      }
      function jt(e) {
        e[Tt] = !0;
      }
      var Mt = new Set(),
        Nt = {};
      function Pt(e, t) {
        (Ft(e, t), Ft(e + `Capture`, t));
      }
      function Ft(e, t) {
        for (Nt[e] = t, e = 0; e < t.length; e++) Mt.add(t[e]);
      }
      var It = RegExp(
          `^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`,
        ),
        Lt = {},
        Rt = {};
      function zt(e) {
        return Me.call(Rt, e)
          ? !0
          : Me.call(Lt, e)
            ? !1
            : It.test(e)
              ? (Rt[e] = !0)
              : ((Lt[e] = !0), !1);
      }
      function Bt(e, t, n) {
        if (zt(t)) {
          if (n === null) e.removeAttribute(t);
          else {
            switch (typeof n) {
              case `undefined`:
              case `function`:
              case `symbol`:
                e.removeAttribute(t);
                return;
              case `boolean`:
                var r = t.toLowerCase().slice(0, 5);
                if (r !== `data-` && r !== `aria-`) {
                  e.removeAttribute(t);
                  return;
                }
            }
            e.setAttribute(t, `` + n);
          }
        }
      }
      function Vt(e, t, n) {
        if (n === null) e.removeAttribute(t);
        else {
          switch (typeof n) {
            case `undefined`:
            case `function`:
            case `symbol`:
            case `boolean`:
              e.removeAttribute(t);
              return;
          }
          e.setAttribute(t, `` + n);
        }
      }
      function Ht(e, t, n, r) {
        if (r === null) e.removeAttribute(n);
        else {
          switch (typeof r) {
            case `undefined`:
            case `function`:
            case `symbol`:
            case `boolean`:
              e.removeAttribute(n);
              return;
          }
          e.setAttributeNS(t, n, `` + r);
        }
      }
      function Ut(e) {
        switch (typeof e) {
          case `bigint`:
          case `boolean`:
          case `number`:
          case `string`:
          case `undefined`:
            return e;
          case `object`:
            return e;
          default:
            return ``;
        }
      }
      function Wt(e) {
        var t = e.type;
        return (
          (e = e.nodeName) &&
          e.toLowerCase() === `input` &&
          (t === `checkbox` || t === `radio`)
        );
      }
      function Gt(e, t, n) {
        var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
        if (
          !e.hasOwnProperty(t) &&
          r !== void 0 &&
          typeof r.get == `function` &&
          typeof r.set == `function`
        ) {
          var i = r.get,
            a = r.set;
          return (
            Object.defineProperty(e, t, {
              configurable: !0,
              get: function () {
                return i.call(this);
              },
              set: function (e) {
                ((n = `` + e), a.call(this, e));
              },
            }),
            Object.defineProperty(e, t, { enumerable: r.enumerable }),
            {
              getValue: function () {
                return n;
              },
              setValue: function (e) {
                n = `` + e;
              },
              stopTracking: function () {
                ((e._valueTracker = null), delete e[t]);
              },
            }
          );
        }
      }
      function Kt(e) {
        if (!e._valueTracker) {
          var t = Wt(e) ? `checked` : `value`;
          e._valueTracker = Gt(e, t, `` + e[t]);
        }
      }
      function qt(e) {
        if (!e) return !1;
        var t = e._valueTracker;
        if (!t) return !0;
        var n = t.getValue(),
          r = ``;
        return (
          e && (r = Wt(e) ? (e.checked ? `true` : `false`) : e.value),
          (e = r),
          e !== n && (t.setValue(e), !0)
        );
      }
      function Jt(e) {
        if (((e ||= typeof document < `u` ? document : void 0), e === void 0))
          return null;
        try {
          return e.activeElement || e.body;
        } catch {
          return e.body;
        }
      }
      var Yt = /[\n"\\]/g;
      function Xt(e) {
        return e.replace(Yt, function (e) {
          return `\\` + e.charCodeAt(0).toString(16) + ` `;
        });
      }
      function Zt(e, t, n, r, i, a, o, s) {
        ((e.name = ``),
          o != null &&
          typeof o != `function` &&
          typeof o != `symbol` &&
          typeof o != `boolean`
            ? (e.type = o)
            : e.removeAttribute(`type`),
          t == null
            ? (o !== `submit` && o !== `reset`) || e.removeAttribute(`value`)
            : o === `number`
              ? ((t === 0 && e.value === ``) || e.value != t) &&
                (e.value = `` + Ut(t))
              : e.value !== `` + Ut(t) && (e.value = `` + Ut(t)),
          t == null
            ? n == null
              ? r != null && e.removeAttribute(`value`)
              : $t(e, o, Ut(n))
            : $t(e, o, Ut(t)),
          i == null && a != null && (e.defaultChecked = !!a),
          i != null &&
            (e.checked = i && typeof i != `function` && typeof i != `symbol`),
          s != null &&
          typeof s != `function` &&
          typeof s != `symbol` &&
          typeof s != `boolean`
            ? (e.name = `` + Ut(s))
            : e.removeAttribute(`name`));
      }
      function Qt(e, t, n, r, i, a, o, s) {
        if (
          (a != null &&
            typeof a != `function` &&
            typeof a != `symbol` &&
            typeof a != `boolean` &&
            (e.type = a),
          t != null || n != null)
        ) {
          if (!((a !== `submit` && a !== `reset`) || t != null)) {
            Kt(e);
            return;
          }
          ((n = n == null ? `` : `` + Ut(n)),
            (t = t == null ? n : `` + Ut(t)),
            s || t === e.value || (e.value = t),
            (e.defaultValue = t));
        }
        ((r ??= i),
          (r = typeof r != `function` && typeof r != `symbol` && !!r),
          (e.checked = s ? e.checked : !!r),
          (e.defaultChecked = !!r),
          o != null &&
            typeof o != `function` &&
            typeof o != `symbol` &&
            typeof o != `boolean` &&
            (e.name = o),
          Kt(e));
      }
      function $t(e, t, n) {
        (t === `number` && Jt(e.ownerDocument) === e) ||
          e.defaultValue === `` + n ||
          (e.defaultValue = `` + n);
      }
      function en(e, t, n, r) {
        if (((e = e.options), t)) {
          t = {};
          for (var i = 0; i < n.length; i++) t[`$` + n[i]] = !0;
          for (n = 0; n < e.length; n++)
            ((i = t.hasOwnProperty(`$` + e[n].value)),
              e[n].selected !== i && (e[n].selected = i),
              i && r && (e[n].defaultSelected = !0));
        } else {
          for (n = `` + Ut(n), t = null, i = 0; i < e.length; i++) {
            if (e[i].value === n) {
              ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
              return;
            }
            t !== null || e[i].disabled || (t = e[i]);
          }
          t !== null && (t.selected = !0);
        }
      }
      function tn(e, t, n) {
        if (
          t != null &&
          ((t = `` + Ut(t)), t !== e.value && (e.value = t), n == null)
        ) {
          e.defaultValue !== t && (e.defaultValue = t);
          return;
        }
        e.defaultValue = n == null ? `` : `` + Ut(n);
      }
      function nn(e, t, n, r) {
        if (t == null) {
          if (r != null) {
            if (n != null) throw Error(i(92));
            if (de(r)) {
              if (1 < r.length) throw Error(i(93));
              r = r[0];
            }
            n = r;
          }
          ((n ??= ``), (t = n));
        }
        ((n = Ut(t)),
          (e.defaultValue = n),
          (r = e.textContent),
          r === n && r !== `` && r !== null && (e.value = r),
          Kt(e));
      }
      function rn(e, t) {
        if (t) {
          var n = e.firstChild;
          if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
          }
        }
        e.textContent = t;
      }
      var an = new Set(
        `animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(
          ` `,
        ),
      );
      function on(e, t, n) {
        var r = t.indexOf(`--`) === 0;
        n == null || typeof n == `boolean` || n === ``
          ? r
            ? e.setProperty(t, ``)
            : t === `float`
              ? (e.cssFloat = ``)
              : (e[t] = ``)
          : r
            ? e.setProperty(t, n)
            : typeof n != `number` || n === 0 || an.has(t)
              ? t === `float`
                ? (e.cssFloat = n)
                : (e[t] = (`` + n).trim())
              : (e[t] = n + `px`);
      }
      function sn(e, t, n) {
        if (t != null && typeof t != `object`) throw Error(i(62));
        if (((e = e.style), n != null)) {
          for (var r in n)
            !n.hasOwnProperty(r) ||
              (t != null && t.hasOwnProperty(r)) ||
              (r.indexOf(`--`) === 0
                ? e.setProperty(r, ``)
                : r === `float`
                  ? (e.cssFloat = ``)
                  : (e[r] = ``));
          for (var a in t)
            ((r = t[a]), t.hasOwnProperty(a) && n[a] !== r && on(e, a, r));
        } else for (var o in t) t.hasOwnProperty(o) && on(e, o, t[o]);
      }
      function cn(e) {
        if (e.indexOf(`-`) === -1) return !1;
        switch (e) {
          case `annotation-xml`:
          case `color-profile`:
          case `font-face`:
          case `font-face-src`:
          case `font-face-uri`:
          case `font-face-format`:
          case `font-face-name`:
          case `missing-glyph`:
            return !1;
          default:
            return !0;
        }
      }
      var ln = new Map([
          [`acceptCharset`, `accept-charset`],
          [`htmlFor`, `for`],
          [`httpEquiv`, `http-equiv`],
          [`crossOrigin`, `crossorigin`],
          [`accentHeight`, `accent-height`],
          [`alignmentBaseline`, `alignment-baseline`],
          [`arabicForm`, `arabic-form`],
          [`baselineShift`, `baseline-shift`],
          [`capHeight`, `cap-height`],
          [`clipPath`, `clip-path`],
          [`clipRule`, `clip-rule`],
          [`colorInterpolation`, `color-interpolation`],
          [`colorInterpolationFilters`, `color-interpolation-filters`],
          [`colorProfile`, `color-profile`],
          [`colorRendering`, `color-rendering`],
          [`dominantBaseline`, `dominant-baseline`],
          [`enableBackground`, `enable-background`],
          [`fillOpacity`, `fill-opacity`],
          [`fillRule`, `fill-rule`],
          [`floodColor`, `flood-color`],
          [`floodOpacity`, `flood-opacity`],
          [`fontFamily`, `font-family`],
          [`fontSize`, `font-size`],
          [`fontSizeAdjust`, `font-size-adjust`],
          [`fontStretch`, `font-stretch`],
          [`fontStyle`, `font-style`],
          [`fontVariant`, `font-variant`],
          [`fontWeight`, `font-weight`],
          [`glyphName`, `glyph-name`],
          [`glyphOrientationHorizontal`, `glyph-orientation-horizontal`],
          [`glyphOrientationVertical`, `glyph-orientation-vertical`],
          [`horizAdvX`, `horiz-adv-x`],
          [`horizOriginX`, `horiz-origin-x`],
          [`imageRendering`, `image-rendering`],
          [`letterSpacing`, `letter-spacing`],
          [`lightingColor`, `lighting-color`],
          [`markerEnd`, `marker-end`],
          [`markerMid`, `marker-mid`],
          [`markerStart`, `marker-start`],
          [`overlinePosition`, `overline-position`],
          [`overlineThickness`, `overline-thickness`],
          [`paintOrder`, `paint-order`],
          [`panose-1`, `panose-1`],
          [`pointerEvents`, `pointer-events`],
          [`renderingIntent`, `rendering-intent`],
          [`shapeRendering`, `shape-rendering`],
          [`stopColor`, `stop-color`],
          [`stopOpacity`, `stop-opacity`],
          [`strikethroughPosition`, `strikethrough-position`],
          [`strikethroughThickness`, `strikethrough-thickness`],
          [`strokeDasharray`, `stroke-dasharray`],
          [`strokeDashoffset`, `stroke-dashoffset`],
          [`strokeLinecap`, `stroke-linecap`],
          [`strokeLinejoin`, `stroke-linejoin`],
          [`strokeMiterlimit`, `stroke-miterlimit`],
          [`strokeOpacity`, `stroke-opacity`],
          [`strokeWidth`, `stroke-width`],
          [`textAnchor`, `text-anchor`],
          [`textDecoration`, `text-decoration`],
          [`textRendering`, `text-rendering`],
          [`transformOrigin`, `transform-origin`],
          [`underlinePosition`, `underline-position`],
          [`underlineThickness`, `underline-thickness`],
          [`unicodeBidi`, `unicode-bidi`],
          [`unicodeRange`, `unicode-range`],
          [`unitsPerEm`, `units-per-em`],
          [`vAlphabetic`, `v-alphabetic`],
          [`vHanging`, `v-hanging`],
          [`vIdeographic`, `v-ideographic`],
          [`vMathematical`, `v-mathematical`],
          [`vectorEffect`, `vector-effect`],
          [`vertAdvY`, `vert-adv-y`],
          [`vertOriginX`, `vert-origin-x`],
          [`vertOriginY`, `vert-origin-y`],
          [`wordSpacing`, `word-spacing`],
          [`writingMode`, `writing-mode`],
          [`xmlnsXlink`, `xmlns:xlink`],
          [`xHeight`, `x-height`],
        ]),
        un =
          /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
      function dn(e) {
        return un.test(`` + e)
          ? `javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`
          : e;
      }
      function fn() {}
      var pn = null;
      function mn(e) {
        return (
          (e = e.target || e.srcElement || window),
          e.correspondingUseElement && (e = e.correspondingUseElement),
          e.nodeType === 3 ? e.parentNode : e
        );
      }
      var hn = null,
        gn = null;
      function _n(e) {
        var t = Ot(e);
        if (t && (e = t.stateNode)) {
          var n = e[yt] || null;
          a: switch (((e = t.stateNode), t.type)) {
            case `input`:
              if (
                (Zt(
                  e,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name,
                ),
                (t = n.name),
                n.type === `radio` && t != null)
              ) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                  n = n.querySelectorAll(
                    `input[name="` + Xt(`` + t) + `"][type="radio"]`,
                  ),
                    t = 0;
                  t < n.length;
                  t++
                ) {
                  var r = n[t];
                  if (r !== e && r.form === e.form) {
                    var a = r[yt] || null;
                    if (!a) throw Error(i(90));
                    Zt(
                      r,
                      a.value,
                      a.defaultValue,
                      a.defaultValue,
                      a.checked,
                      a.defaultChecked,
                      a.type,
                      a.name,
                    );
                  }
                }
                for (t = 0; t < n.length; t++)
                  ((r = n[t]), r.form === e.form && qt(r));
              }
              break a;
            case `textarea`:
              tn(e, n.value, n.defaultValue);
              break a;
            case `select`:
              ((t = n.value), t != null && en(e, !!n.multiple, t, !1));
          }
        }
      }
      var vn = !1;
      function yn(e, t, n) {
        if (vn) return e(t, n);
        vn = !0;
        try {
          return e(t);
        } finally {
          if (
            ((vn = !1),
            (hn !== null || gn !== null) &&
              (bu(), hn && ((t = hn), (e = gn), (gn = hn = null), _n(t), e)))
          )
            for (t = 0; t < e.length; t++) _n(e[t]);
        }
      }
      function bn(e, t) {
        var n = e.stateNode;
        if (n === null) return null;
        var r = n[yt] || null;
        if (r === null) return null;
        n = r[t];
        a: switch (t) {
          case `onClick`:
          case `onClickCapture`:
          case `onDoubleClick`:
          case `onDoubleClickCapture`:
          case `onMouseDown`:
          case `onMouseDownCapture`:
          case `onMouseMove`:
          case `onMouseMoveCapture`:
          case `onMouseUp`:
          case `onMouseUpCapture`:
          case `onMouseEnter`:
            ((r = !r.disabled) ||
              ((e = e.type),
              (r =
                e !== `button` &&
                e !== `input` &&
                e !== `select` &&
                e !== `textarea`)),
              (e = !r));
            break a;
          default:
            e = !1;
        }
        if (e) return null;
        if (n && typeof n != `function`) throw Error(i(231, t, typeof n));
        return n;
      }
      var xn = !(
          typeof window > `u` ||
          window.document === void 0 ||
          window.document.createElement === void 0
        ),
        Sn = !1;
      if (xn)
        try {
          var Cn = {};
          (Object.defineProperty(Cn, 'passive', {
            get: function () {
              Sn = !0;
            },
          }),
            window.addEventListener(`test`, Cn, Cn),
            window.removeEventListener(`test`, Cn, Cn));
        } catch {
          Sn = !1;
        }
      var wn = null,
        Tn = null,
        En = null;
      function Dn() {
        if (En) return En;
        var e,
          t = Tn,
          n = t.length,
          r,
          i = `value` in wn ? wn.value : wn.textContent,
          a = i.length;
        for (e = 0; e < n && t[e] === i[e]; e++);
        var o = n - e;
        for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
        return (En = i.slice(e, 1 < r ? 1 - r : void 0));
      }
      function On(e) {
        var t = e.keyCode;
        return (
          `charCode` in e
            ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
            : (e = t),
          e === 10 && (e = 13),
          32 <= e || e === 13 ? e : 0
        );
      }
      function kn() {
        return !0;
      }
      function An() {
        return !1;
      }
      function jn(e) {
        function t(t, n, r, i, a) {
          for (var o in ((this._reactName = t),
          (this._targetInst = r),
          (this.type = n),
          (this.nativeEvent = i),
          (this.target = a),
          (this.currentTarget = null),
          e))
            e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(i) : i[o]));
          return (
            (this.isDefaultPrevented = (
              i.defaultPrevented == null
                ? !1 === i.returnValue
                : i.defaultPrevented
            )
              ? kn
              : An),
            (this.isPropagationStopped = An),
            this
          );
        }
        return (
          h(t.prototype, {
            preventDefault: function () {
              this.defaultPrevented = !0;
              var e = this.nativeEvent;
              e &&
                (e.preventDefault
                  ? e.preventDefault()
                  : typeof e.returnValue != `unknown` && (e.returnValue = !1),
                (this.isDefaultPrevented = kn));
            },
            stopPropagation: function () {
              var e = this.nativeEvent;
              e &&
                (e.stopPropagation
                  ? e.stopPropagation()
                  : typeof e.cancelBubble != `unknown` && (e.cancelBubble = !0),
                (this.isPropagationStopped = kn));
            },
            persist: function () {},
            isPersistent: kn,
          }),
          t
        );
      }
      var Mn = {
          eventPhase: 0,
          bubbles: 0,
          cancelable: 0,
          timeStamp: function (e) {
            return e.timeStamp || Date.now();
          },
          defaultPrevented: 0,
          isTrusted: 0,
        },
        Nn = jn(Mn),
        Pn = h({}, Mn, { view: 0, detail: 0 }),
        Fn = jn(Pn),
        In,
        Ln,
        Rn,
        zn = h({}, Pn, {
          screenX: 0,
          screenY: 0,
          clientX: 0,
          clientY: 0,
          pageX: 0,
          pageY: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          getModifierState: Xn,
          button: 0,
          buttons: 0,
          relatedTarget: function (e) {
            return e.relatedTarget === void 0
              ? e.fromElement === e.srcElement
                ? e.toElement
                : e.fromElement
              : e.relatedTarget;
          },
          movementX: function (e) {
            return `movementX` in e
              ? e.movementX
              : (e !== Rn &&
                  (Rn && e.type === `mousemove`
                    ? ((In = e.screenX - Rn.screenX),
                      (Ln = e.screenY - Rn.screenY))
                    : (Ln = In = 0),
                  (Rn = e)),
                In);
          },
          movementY: function (e) {
            return `movementY` in e ? e.movementY : Ln;
          },
        }),
        Bn = jn(zn),
        Vn = jn(h({}, zn, { dataTransfer: 0 })),
        Hn = jn(h({}, Pn, { relatedTarget: 0 })),
        Un = jn(
          h({}, Mn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
        ),
        Wn = jn(
          h({}, Mn, {
            clipboardData: function (e) {
              return `clipboardData` in e
                ? e.clipboardData
                : window.clipboardData;
            },
          }),
        ),
        Gn = jn(h({}, Mn, { data: 0 })),
        Kn = {
          Esc: `Escape`,
          Spacebar: ` `,
          Left: `ArrowLeft`,
          Up: `ArrowUp`,
          Right: `ArrowRight`,
          Down: `ArrowDown`,
          Del: `Delete`,
          Win: `OS`,
          Menu: `ContextMenu`,
          Apps: `ContextMenu`,
          Scroll: `ScrollLock`,
          MozPrintableKey: `Unidentified`,
        },
        qn = {
          8: `Backspace`,
          9: `Tab`,
          12: `Clear`,
          13: `Enter`,
          16: `Shift`,
          17: `Control`,
          18: `Alt`,
          19: `Pause`,
          20: `CapsLock`,
          27: `Escape`,
          32: ` `,
          33: `PageUp`,
          34: `PageDown`,
          35: `End`,
          36: `Home`,
          37: `ArrowLeft`,
          38: `ArrowUp`,
          39: `ArrowRight`,
          40: `ArrowDown`,
          45: `Insert`,
          46: `Delete`,
          112: `F1`,
          113: `F2`,
          114: `F3`,
          115: `F4`,
          116: `F5`,
          117: `F6`,
          118: `F7`,
          119: `F8`,
          120: `F9`,
          121: `F10`,
          122: `F11`,
          123: `F12`,
          144: `NumLock`,
          145: `ScrollLock`,
          224: `Meta`,
        },
        Jn = {
          Alt: `altKey`,
          Control: `ctrlKey`,
          Meta: `metaKey`,
          Shift: `shiftKey`,
        };
      function Yn(e) {
        var t = this.nativeEvent;
        return t.getModifierState
          ? t.getModifierState(e)
          : (e = Jn[e])
            ? !!t[e]
            : !1;
      }
      function Xn() {
        return Yn;
      }
      var Zn = jn(
          h({}, Pn, {
            key: function (e) {
              if (e.key) {
                var t = Kn[e.key] || e.key;
                if (t !== `Unidentified`) return t;
              }
              return e.type === `keypress`
                ? ((e = On(e)), e === 13 ? `Enter` : String.fromCharCode(e))
                : e.type === `keydown` || e.type === `keyup`
                  ? qn[e.keyCode] || `Unidentified`
                  : ``;
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: Xn,
            charCode: function (e) {
              return e.type === `keypress` ? On(e) : 0;
            },
            keyCode: function (e) {
              return e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0;
            },
            which: function (e) {
              return e.type === `keypress`
                ? On(e)
                : e.type === `keydown` || e.type === `keyup`
                  ? e.keyCode
                  : 0;
            },
          }),
        ),
        Qn = jn(
          h({}, zn, {
            pointerId: 0,
            width: 0,
            height: 0,
            pressure: 0,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            twist: 0,
            pointerType: 0,
            isPrimary: 0,
          }),
        ),
        $n = jn(
          h({}, Pn, {
            touches: 0,
            targetTouches: 0,
            changedTouches: 0,
            altKey: 0,
            metaKey: 0,
            ctrlKey: 0,
            shiftKey: 0,
            getModifierState: Xn,
          }),
        ),
        er = jn(
          h({}, Mn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
        ),
        tr = jn(
          h({}, zn, {
            deltaX: function (e) {
              return `deltaX` in e
                ? e.deltaX
                : `wheelDeltaX` in e
                  ? -e.wheelDeltaX
                  : 0;
            },
            deltaY: function (e) {
              return `deltaY` in e
                ? e.deltaY
                : `wheelDeltaY` in e
                  ? -e.wheelDeltaY
                  : `wheelDelta` in e
                    ? -e.wheelDelta
                    : 0;
            },
            deltaZ: 0,
            deltaMode: 0,
          }),
        ),
        nr = jn(h({}, Mn, { newState: 0, oldState: 0 })),
        rr = [9, 13, 27, 32],
        ir = xn && `CompositionEvent` in window,
        ar = null;
      xn && `documentMode` in document && (ar = document.documentMode);
      var or = xn && `TextEvent` in window && !ar,
        sr = xn && (!ir || (ar && 8 < ar && 11 >= ar)),
        cr = ` `,
        lr = !1;
      function ur(e, t) {
        switch (e) {
          case `keyup`:
            return rr.indexOf(t.keyCode) !== -1;
          case `keydown`:
            return t.keyCode !== 229;
          case `keypress`:
          case `mousedown`:
          case `focusout`:
            return !0;
          default:
            return !1;
        }
      }
      function dr(e) {
        return (
          (e = e.detail),
          typeof e == `object` && `data` in e ? e.data : null
        );
      }
      var fr = !1;
      function pr(e, t) {
        switch (e) {
          case `compositionend`:
            return dr(t);
          case `keypress`:
            return t.which === 32 ? ((lr = !0), cr) : null;
          case `textInput`:
            return ((e = t.data), e === cr && lr ? null : e);
          default:
            return null;
        }
      }
      function mr(e, t) {
        if (fr)
          return e === `compositionend` || (!ir && ur(e, t))
            ? ((e = Dn()), (En = Tn = wn = null), (fr = !1), e)
            : null;
        switch (e) {
          case `paste`:
            return null;
          case `keypress`:
            if (
              !(t.ctrlKey || t.altKey || t.metaKey) ||
              (t.ctrlKey && t.altKey)
            ) {
              if (t.char && 1 < t.char.length) return t.char;
              if (t.which) return String.fromCharCode(t.which);
            }
            return null;
          case `compositionend`:
            return sr && t.locale !== `ko` ? null : t.data;
          default:
            return null;
        }
      }
      var hr = {
        color: !0,
        date: !0,
        datetime: !0,
        'datetime-local': !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
      };
      function gr(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t === `input` ? !!hr[e.type] : t === `textarea`;
      }
      function _r(e, t, n, r) {
        (hn ? (gn ? gn.push(r) : (gn = [r])) : (hn = r),
          (t = Ed(t, `onChange`)),
          0 < t.length &&
            ((n = new Nn(`onChange`, `change`, null, n, r)),
            e.push({ event: n, listeners: t })));
      }
      var vr = null,
        yr = null;
      function br(e) {
        yd(e, 0);
      }
      function xr(e) {
        if (qt(kt(e))) return e;
      }
      function Sr(e, t) {
        if (e === `change`) return t;
      }
      var Cr = !1;
      if (xn) {
        var wr;
        if (xn) {
          var Tr = `oninput` in document;
          if (!Tr) {
            var Er = document.createElement(`div`);
            (Er.setAttribute(`oninput`, `return;`),
              (Tr = typeof Er.oninput == `function`));
          }
          wr = Tr;
        } else wr = !1;
        Cr = wr && (!document.documentMode || 9 < document.documentMode);
      }
      function Dr() {
        vr && (vr.detachEvent(`onpropertychange`, Or), (yr = vr = null));
      }
      function Or(e) {
        if (e.propertyName === `value` && xr(yr)) {
          var t = [];
          (_r(t, yr, e, mn(e)), yn(br, t));
        }
      }
      function kr(e, t, n) {
        e === `focusin`
          ? (Dr(), (vr = t), (yr = n), vr.attachEvent(`onpropertychange`, Or))
          : e === `focusout` && Dr();
      }
      function Ar(e) {
        if (e === `selectionchange` || e === `keyup` || e === `keydown`)
          return xr(yr);
      }
      function jr(e, t) {
        if (e === `click`) return xr(t);
      }
      function Mr(e, t) {
        if (e === `input` || e === `change`) return xr(t);
      }
      function Nr(e, t) {
        return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
      }
      var Pr = typeof Object.is == `function` ? Object.is : Nr;
      function Fr(e, t) {
        if (Pr(e, t)) return !0;
        if (typeof e != `object` || !e || typeof t != `object` || !t) return !1;
        var n = Object.keys(e),
          r = Object.keys(t);
        if (n.length !== r.length) return !1;
        for (r = 0; r < n.length; r++) {
          var i = n[r];
          if (!Me.call(t, i) || !Pr(e[i], t[i])) return !1;
        }
        return !0;
      }
      function Ir(e) {
        for (; e && e.firstChild; ) e = e.firstChild;
        return e;
      }
      function Lr(e, t) {
        var n = Ir(e);
        e = 0;
        for (var r; n; ) {
          if (n.nodeType === 3) {
            if (((r = e + n.textContent.length), e <= t && r >= t))
              return { node: n, offset: t - e };
            e = r;
          }
          a: {
            for (; n; ) {
              if (n.nextSibling) {
                n = n.nextSibling;
                break a;
              }
              n = n.parentNode;
            }
            n = void 0;
          }
          n = Ir(n);
        }
      }
      function Rr(e, t) {
        return e && t
          ? e === t
            ? !0
            : e && e.nodeType === 3
              ? !1
              : t && t.nodeType === 3
                ? Rr(e, t.parentNode)
                : `contains` in e
                  ? e.contains(t)
                  : e.compareDocumentPosition
                    ? !!(e.compareDocumentPosition(t) & 16)
                    : !1
          : !1;
      }
      function zr(e) {
        e =
          e != null &&
          e.ownerDocument != null &&
          e.ownerDocument.defaultView != null
            ? e.ownerDocument.defaultView
            : window;
        for (var t = Jt(e.document); t instanceof e.HTMLIFrameElement; ) {
          try {
            var n = typeof t.contentWindow.location.href == `string`;
          } catch {
            n = !1;
          }
          if (n) e = t.contentWindow;
          else break;
          t = Jt(e.document);
        }
        return t;
      }
      function Br(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return (
          t &&
          ((t === `input` &&
            (e.type === `text` ||
              e.type === `search` ||
              e.type === `tel` ||
              e.type === `url` ||
              e.type === `password`)) ||
            t === `textarea` ||
            e.contentEditable === `true`)
        );
      }
      var Vr = xn && `documentMode` in document && 11 >= document.documentMode,
        Hr = null,
        Ur = null,
        Wr = null,
        Gr = !1;
      function Kr(e, t, n) {
        var r =
          n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
        Gr ||
          Hr == null ||
          Hr !== Jt(r) ||
          ((r = Hr),
          `selectionStart` in r && Br(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : ((r = (
                (r.ownerDocument && r.ownerDocument.defaultView) ||
                window
              ).getSelection()),
              (r = {
                anchorNode: r.anchorNode,
                anchorOffset: r.anchorOffset,
                focusNode: r.focusNode,
                focusOffset: r.focusOffset,
              })),
          (Wr && Fr(Wr, r)) ||
            ((Wr = r),
            (r = Ed(Ur, `onSelect`)),
            0 < r.length &&
              ((t = new Nn(`onSelect`, `select`, null, t, n)),
              e.push({ event: t, listeners: r }),
              (t.target = Hr))));
      }
      function qr(e, t) {
        var n = {};
        return (
          (n[e.toLowerCase()] = t.toLowerCase()),
          (n[`Webkit` + e] = `webkit` + t),
          (n[`Moz` + e] = `moz` + t),
          n
        );
      }
      var Jr = {
          animationend: qr(`Animation`, `AnimationEnd`),
          animationiteration: qr(`Animation`, `AnimationIteration`),
          animationstart: qr(`Animation`, `AnimationStart`),
          transitionrun: qr(`Transition`, `TransitionRun`),
          transitionstart: qr(`Transition`, `TransitionStart`),
          transitioncancel: qr(`Transition`, `TransitionCancel`),
          transitionend: qr(`Transition`, `TransitionEnd`),
        },
        Yr = {},
        Xr = {};
      xn &&
        ((Xr = document.createElement(`div`).style),
        `AnimationEvent` in window ||
          (delete Jr.animationend.animation,
          delete Jr.animationiteration.animation,
          delete Jr.animationstart.animation),
        `TransitionEvent` in window || delete Jr.transitionend.transition);
      function Zr(e) {
        if (Yr[e]) return Yr[e];
        if (!Jr[e]) return e;
        var t = Jr[e],
          n;
        for (n in t) if (t.hasOwnProperty(n) && n in Xr) return (Yr[e] = t[n]);
        return e;
      }
      var Qr = Zr(`animationend`),
        $r = Zr(`animationiteration`),
        ei = Zr(`animationstart`),
        ti = Zr(`transitionrun`),
        ni = Zr(`transitionstart`),
        ri = Zr(`transitioncancel`),
        ii = Zr(`transitionend`),
        ai = new Map(),
        oi =
          `abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(
            ` `,
          );
      oi.push(`scrollEnd`);
      function si(e, t) {
        (ai.set(e, t), Pt(t, [e]));
      }
      var ci =
          typeof reportError == `function`
            ? reportError
            : function (e) {
                if (
                  typeof window == `object` &&
                  typeof window.ErrorEvent == `function`
                ) {
                  var t = new window.ErrorEvent(`error`, {
                    bubbles: !0,
                    cancelable: !0,
                    message:
                      typeof e == `object` && e && typeof e.message == `string`
                        ? String(e.message)
                        : String(e),
                    error: e,
                  });
                  if (!window.dispatchEvent(t)) return;
                } else if (
                  typeof process == `object` &&
                  typeof process.emit == `function`
                ) {
                  process.emit(`uncaughtException`, e);
                  return;
                }
                console.error(e);
              },
        li = [],
        ui = 0,
        di = 0;
      function fi() {
        for (var e = ui, t = (di = ui = 0); t < e; ) {
          var n = li[t];
          li[t++] = null;
          var r = li[t];
          li[t++] = null;
          var i = li[t];
          li[t++] = null;
          var a = li[t];
          if (((li[t++] = null), r !== null && i !== null)) {
            var o = r.pending;
            (o === null ? (i.next = i) : ((i.next = o.next), (o.next = i)),
              (r.pending = i));
          }
          a !== 0 && gi(n, i, a);
        }
      }
      function pi(e, t, n, r) {
        ((li[ui++] = e),
          (li[ui++] = t),
          (li[ui++] = n),
          (li[ui++] = r),
          (di |= r),
          (e.lanes |= r),
          (e = e.alternate),
          e !== null && (e.lanes |= r));
      }
      function mi(e, t, n, r) {
        return (pi(e, t, n, r), _i(e));
      }
      function hi(e, t) {
        return (pi(e, null, null, t), _i(e));
      }
      function gi(e, t, n) {
        e.lanes |= n;
        var r = e.alternate;
        r !== null && (r.lanes |= n);
        for (var i = !1, a = e.return; a !== null; )
          ((a.childLanes |= n),
            (r = a.alternate),
            r !== null && (r.childLanes |= n),
            a.tag === 22 &&
              ((e = a.stateNode), e === null || e._visibility & 1 || (i = !0)),
            (e = a),
            (a = a.return));
        return e.tag === 3
          ? ((a = e.stateNode),
            i &&
              t !== null &&
              ((i = 31 - Ye(n)),
              (e = a.hiddenUpdates),
              (r = e[i]),
              r === null ? (e[i] = [t]) : r.push(t),
              (t.lane = n | 536870912)),
            a)
          : null;
      }
      function _i(e) {
        if (50 < du) throw ((du = 0), (fu = null), Error(i(185)));
        for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
        return e.tag === 3 ? e.stateNode : null;
      }
      var vi = {};
      function yi(e, t, n, r) {
        ((this.tag = e),
          (this.key = n),
          (this.sibling =
            this.child =
            this.return =
            this.stateNode =
            this.type =
            this.elementType =
              null),
          (this.index = 0),
          (this.refCleanup = this.ref = null),
          (this.pendingProps = t),
          (this.dependencies =
            this.memoizedState =
            this.updateQueue =
            this.memoizedProps =
              null),
          (this.mode = r),
          (this.subtreeFlags = this.flags = 0),
          (this.deletions = null),
          (this.childLanes = this.lanes = 0),
          (this.alternate = null));
      }
      function bi(e, t, n, r) {
        return new yi(e, t, n, r);
      }
      function xi(e) {
        return ((e = e.prototype), !(!e || !e.isReactComponent));
      }
      function Si(e, t) {
        var n = e.alternate;
        return (
          n === null
            ? ((n = bi(e.tag, t, e.key, e.mode)),
              (n.elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t),
              (n.type = e.type),
              (n.flags = 0),
              (n.subtreeFlags = 0),
              (n.deletions = null)),
          (n.flags = e.flags & 65011712),
          (n.childLanes = e.childLanes),
          (n.lanes = e.lanes),
          (n.child = e.child),
          (n.memoizedProps = e.memoizedProps),
          (n.memoizedState = e.memoizedState),
          (n.updateQueue = e.updateQueue),
          (t = e.dependencies),
          (n.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext }),
          (n.sibling = e.sibling),
          (n.index = e.index),
          (n.ref = e.ref),
          (n.refCleanup = e.refCleanup),
          n
        );
      }
      function Ci(e, t) {
        e.flags &= 65011714;
        var n = e.alternate;
        return (
          n === null
            ? ((e.childLanes = 0),
              (e.lanes = t),
              (e.child = null),
              (e.subtreeFlags = 0),
              (e.memoizedProps = null),
              (e.memoizedState = null),
              (e.updateQueue = null),
              (e.dependencies = null),
              (e.stateNode = null))
            : ((e.childLanes = n.childLanes),
              (e.lanes = n.lanes),
              (e.child = n.child),
              (e.subtreeFlags = 0),
              (e.deletions = null),
              (e.memoizedProps = n.memoizedProps),
              (e.memoizedState = n.memoizedState),
              (e.updateQueue = n.updateQueue),
              (e.type = n.type),
              (t = n.dependencies),
              (e.dependencies =
                t === null
                  ? null
                  : { lanes: t.lanes, firstContext: t.firstContext })),
          e
        );
      }
      function wi(e, t, n, r, a, o) {
        var s = 0;
        if (((r = e), typeof e == `function`)) xi(e) && (s = 1);
        else if (typeof e == `string`)
          s = Uf(e, n, _e.current)
            ? 26
            : e === `html` || e === `head` || e === `body`
              ? 27
              : 5;
        else
          a: switch (e) {
            case ae:
              return (
                (e = bi(31, n, t, a)),
                (e.elementType = ae),
                (e.lanes = o),
                e
              );
            case y:
              return Ti(n.children, a, o, t);
            case b:
              ((s = 8), (a |= 24));
              break;
            case x:
              return (
                (e = bi(12, n, t, a | 2)),
                (e.elementType = x),
                (e.lanes = o),
                e
              );
            case te:
              return (
                (e = bi(13, n, t, a)),
                (e.elementType = te),
                (e.lanes = o),
                e
              );
            case ne:
              return (
                (e = bi(19, n, t, a)),
                (e.elementType = ne),
                (e.lanes = o),
                e
              );
            default:
              if (typeof e == `object` && e)
                switch (e.$$typeof) {
                  case S:
                    s = 10;
                    break a;
                  case ee:
                    s = 9;
                    break a;
                  case C:
                    s = 11;
                    break a;
                  case re:
                    s = 14;
                    break a;
                  case ie:
                    ((s = 16), (r = null));
                    break a;
                }
              ((s = 29),
                (n = Error(i(130, e === null ? `null` : typeof e, ``))),
                (r = null));
          }
        return (
          (t = bi(s, n, t, a)),
          (t.elementType = e),
          (t.type = r),
          (t.lanes = o),
          t
        );
      }
      function Ti(e, t, n, r) {
        return ((e = bi(7, e, r, t)), (e.lanes = n), e);
      }
      function Ei(e, t, n) {
        return ((e = bi(6, e, null, t)), (e.lanes = n), e);
      }
      function Di(e) {
        var t = bi(18, null, null, 0);
        return ((t.stateNode = e), t);
      }
      function Oi(e, t, n) {
        return (
          (t = bi(4, e.children === null ? [] : e.children, e.key, t)),
          (t.lanes = n),
          (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation,
          }),
          t
        );
      }
      var ki = new WeakMap();
      function Ai(e, t) {
        if (typeof e == `object` && e) {
          var n = ki.get(e);
          return n === void 0
            ? ((t = { value: e, source: t, stack: je(t) }), ki.set(e, t), t)
            : n;
        }
        return { value: e, source: t, stack: je(t) };
      }
      var ji = [],
        Mi = 0,
        Ni = null,
        Pi = 0,
        Fi = [],
        Ii = 0,
        Li = null,
        Ri = 1,
        zi = ``;
      function Bi(e, t) {
        ((ji[Mi++] = Pi), (ji[Mi++] = Ni), (Ni = e), (Pi = t));
      }
      function Vi(e, t, n) {
        ((Fi[Ii++] = Ri), (Fi[Ii++] = zi), (Fi[Ii++] = Li), (Li = e));
        var r = Ri;
        e = zi;
        var i = 32 - Ye(r) - 1;
        ((r &= ~(1 << i)), (n += 1));
        var a = 32 - Ye(t) + i;
        if (30 < a) {
          var o = i - (i % 5);
          ((a = (r & ((1 << o) - 1)).toString(32)),
            (r >>= o),
            (i -= o),
            (Ri = (1 << (32 - Ye(t) + i)) | (n << i) | r),
            (zi = a + e));
        } else ((Ri = (1 << a) | (n << i) | r), (zi = e));
      }
      function Hi(e) {
        e.return !== null && (Bi(e, 1), Vi(e, 1, 0));
      }
      function Ui(e) {
        for (; e === Ni; )
          ((Ni = ji[--Mi]), (ji[Mi] = null), (Pi = ji[--Mi]), (ji[Mi] = null));
        for (; e === Li; )
          ((Li = Fi[--Ii]),
            (Fi[Ii] = null),
            (zi = Fi[--Ii]),
            (Fi[Ii] = null),
            (Ri = Fi[--Ii]),
            (Fi[Ii] = null));
      }
      function Wi(e, t) {
        ((Fi[Ii++] = Ri),
          (Fi[Ii++] = zi),
          (Fi[Ii++] = Li),
          (Ri = t.id),
          (zi = t.overflow),
          (Li = e));
      }
      var Gi = null,
        Ki = null,
        D = !1,
        qi = null,
        Ji = !1,
        Yi = Error(i(519));
      function Xi(e) {
        throw (
          na(
            Ai(
              Error(
                i(
                  418,
                  1 < arguments.length &&
                    arguments[1] !== void 0 &&
                    arguments[1]
                    ? `text`
                    : `HTML`,
                  ``,
                ),
              ),
              e,
            ),
          ),
          Yi
        );
      }
      function Zi(e) {
        var t = e.stateNode,
          n = e.type,
          r = e.memoizedProps;
        switch (((t[vt] = e), (t[yt] = r), n)) {
          case `dialog`:
            (Q(`cancel`, t), Q(`close`, t));
            break;
          case `iframe`:
          case `object`:
          case `embed`:
            Q(`load`, t);
            break;
          case `video`:
          case `audio`:
            for (n = 0; n < _d.length; n++) Q(_d[n], t);
            break;
          case `source`:
            Q(`error`, t);
            break;
          case `img`:
          case `image`:
          case `link`:
            (Q(`error`, t), Q(`load`, t));
            break;
          case `details`:
            Q(`toggle`, t);
            break;
          case `input`:
            (Q(`invalid`, t),
              Qt(
                t,
                r.value,
                r.defaultValue,
                r.checked,
                r.defaultChecked,
                r.type,
                r.name,
                !0,
              ));
            break;
          case `select`:
            Q(`invalid`, t);
            break;
          case `textarea`:
            (Q(`invalid`, t), nn(t, r.value, r.defaultValue, r.children));
        }
        ((n = r.children),
          (typeof n != `string` &&
            typeof n != `number` &&
            typeof n != `bigint`) ||
          t.textContent === `` + n ||
          !0 === r.suppressHydrationWarning ||
          Md(t.textContent, n)
            ? (r.popover != null && (Q(`beforetoggle`, t), Q(`toggle`, t)),
              r.onScroll != null && Q(`scroll`, t),
              r.onScrollEnd != null && Q(`scrollend`, t),
              r.onClick != null && (t.onclick = fn),
              (t = !0))
            : (t = !1),
          t || Xi(e, !0));
      }
      function Qi(e) {
        for (Gi = e.return; Gi; )
          switch (Gi.tag) {
            case 5:
            case 31:
            case 13:
              Ji = !1;
              return;
            case 27:
            case 3:
              Ji = !0;
              return;
            default:
              Gi = Gi.return;
          }
      }
      function $i(e) {
        if (e !== Gi) return !1;
        if (!D) return (Qi(e), (D = !0), !1);
        var t = e.tag,
          n;
        if (
          ((n = t !== 3 && t !== 27) &&
            ((n = t === 5) &&
              ((n = e.type),
              (n =
                n === `form` || n === `button` || Ud(e.type, e.memoizedProps))),
            (n = !n)),
          n && Ki && Xi(e),
          Qi(e),
          t === 13)
        ) {
          if (
            ((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e)
          )
            throw Error(i(317));
          Ki = uf(e);
        } else if (t === 31) {
          if (
            ((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e)
          )
            throw Error(i(317));
          Ki = uf(e);
        } else
          t === 27
            ? ((t = Ki),
              Zd(e.type) ? ((e = lf), (lf = null), (Ki = e)) : (Ki = t))
            : (Ki = Gi ? cf(e.stateNode.nextSibling) : null);
        return !0;
      }
      function ea() {
        ((Ki = Gi = null), (D = !1));
      }
      function ta() {
        var e = qi;
        return (
          e !== null &&
            (Zl === null ? (Zl = e) : Zl.push.apply(Zl, e), (qi = null)),
          e
        );
      }
      function na(e) {
        qi === null ? (qi = [e]) : qi.push(e);
      }
      var ra = he(null),
        ia = null,
        aa = null;
      function oa(e, t, n) {
        (E(ra, t._currentValue), (t._currentValue = n));
      }
      function O(e) {
        ((e._currentValue = ra.current), ge(ra));
      }
      function sa(e, t, n) {
        for (; e !== null; ) {
          var r = e.alternate;
          if (
            ((e.childLanes & t) === t
              ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t)
              : ((e.childLanes |= t), r !== null && (r.childLanes |= t)),
            e === n)
          )
            break;
          e = e.return;
        }
      }
      function ca(e, t, n, r) {
        var a = e.child;
        for (a !== null && (a.return = e); a !== null; ) {
          var o = a.dependencies;
          if (o !== null) {
            var s = a.child;
            o = o.firstContext;
            a: for (; o !== null; ) {
              var c = o;
              o = a;
              for (var l = 0; l < t.length; l++)
                if (c.context === t[l]) {
                  ((o.lanes |= n),
                    (c = o.alternate),
                    c !== null && (c.lanes |= n),
                    sa(o.return, n, e),
                    r || (s = null));
                  break a;
                }
              o = c.next;
            }
          } else if (a.tag === 18) {
            if (((s = a.return), s === null)) throw Error(i(341));
            ((s.lanes |= n),
              (o = s.alternate),
              o !== null && (o.lanes |= n),
              sa(s, n, e),
              (s = null));
          } else s = a.child;
          if (s !== null) s.return = a;
          else
            for (s = a; s !== null; ) {
              if (s === e) {
                s = null;
                break;
              }
              if (((a = s.sibling), a !== null)) {
                ((a.return = s.return), (s = a));
                break;
              }
              s = s.return;
            }
          a = s;
        }
      }
      function la(e, t, n, r) {
        e = null;
        for (var a = t, o = !1; a !== null; ) {
          if (!o) {
            if (a.flags & 524288) o = !0;
            else if (a.flags & 262144) break;
          }
          if (a.tag === 10) {
            var s = a.alternate;
            if (s === null) throw Error(i(387));
            if (((s = s.memoizedProps), s !== null)) {
              var c = a.type;
              Pr(a.pendingProps.value, s.value) ||
                (e === null ? (e = [c]) : e.push(c));
            }
          } else if (a === be.current) {
            if (((s = a.alternate), s === null)) throw Error(i(387));
            s.memoizedState.memoizedState !== a.memoizedState.memoizedState &&
              (e === null ? (e = [Qf]) : e.push(Qf));
          }
          a = a.return;
        }
        (e !== null && ca(t, e, n, r), (t.flags |= 262144));
      }
      function ua(e) {
        for (e = e.firstContext; e !== null; ) {
          if (!Pr(e.context._currentValue, e.memoizedValue)) return !0;
          e = e.next;
        }
        return !1;
      }
      function da(e) {
        ((ia = e),
          (aa = null),
          (e = e.dependencies),
          e !== null && (e.firstContext = null));
      }
      function fa(e) {
        return ma(ia, e);
      }
      function pa(e, t) {
        return (ia === null && da(e), ma(e, t));
      }
      function ma(e, t) {
        var n = t._currentValue;
        if (((t = { context: t, memoizedValue: n, next: null }), aa === null)) {
          if (e === null) throw Error(i(308));
          ((aa = t),
            (e.dependencies = { lanes: 0, firstContext: t }),
            (e.flags |= 524288));
        } else aa = aa.next = t;
        return n;
      }
      var ha =
          typeof AbortController < `u`
            ? AbortController
            : function () {
                var e = [],
                  t = (this.signal = {
                    aborted: !1,
                    addEventListener: function (t, n) {
                      e.push(n);
                    },
                  });
                this.abort = function () {
                  ((t.aborted = !0),
                    e.forEach(function (e) {
                      return e();
                    }));
                };
              },
        ga = t.unstable_scheduleCallback,
        _a = t.unstable_NormalPriority,
        va = {
          $$typeof: S,
          Consumer: null,
          Provider: null,
          _currentValue: null,
          _currentValue2: null,
          _threadCount: 0,
        };
      function ya() {
        return { controller: new ha(), data: new Map(), refCount: 0 };
      }
      function ba(e) {
        (e.refCount--,
          e.refCount === 0 &&
            ga(_a, function () {
              e.controller.abort();
            }));
      }
      var xa = null,
        Sa = 0,
        Ca = 0,
        wa = null;
      function Ta(e, t) {
        if (xa === null) {
          var n = (xa = []);
          ((Sa = 0),
            (Ca = dd()),
            (wa = {
              status: `pending`,
              value: void 0,
              then: function (e) {
                n.push(e);
              },
            }));
        }
        return (Sa++, t.then(Ea, Ea), t);
      }
      function Ea() {
        if (--Sa === 0 && xa !== null) {
          wa !== null && (wa.status = `fulfilled`);
          var e = xa;
          ((xa = null), (Ca = 0), (wa = null));
          for (var t = 0; t < e.length; t++) (0, e[t])();
        }
      }
      function Da(e, t) {
        var n = [],
          r = {
            status: `pending`,
            value: null,
            reason: null,
            then: function (e) {
              n.push(e);
            },
          };
        return (
          e.then(
            function () {
              ((r.status = `fulfilled`), (r.value = t));
              for (var e = 0; e < n.length; e++) (0, n[e])(t);
            },
            function (e) {
              for (
                r.status = `rejected`, r.reason = e, e = 0;
                e < n.length;
                e++
              )
                (0, n[e])(void 0);
            },
          ),
          r
        );
      }
      var Oa = w.S;
      w.S = function (e, t) {
        ((eu = Le()),
          typeof t == `object` && t && typeof t.then == `function` && Ta(e, t),
          Oa !== null && Oa(e, t));
      };
      var ka = he(null);
      function Aa() {
        var e = ka.current;
        return e === null ? q.pooledCache : e;
      }
      function ja(e, t) {
        t === null ? E(ka, ka.current) : E(ka, t.pool);
      }
      function Ma() {
        var e = Aa();
        return e === null ? null : { parent: va._currentValue, pool: e };
      }
      var Na = Error(i(460)),
        k = Error(i(474)),
        Pa = Error(i(542)),
        Fa = { then: function () {} };
      function Ia(e) {
        return ((e = e.status), e === `fulfilled` || e === `rejected`);
      }
      function La(e, t, n) {
        switch (
          ((n = e[n]),
          n === void 0 ? e.push(t) : n !== t && (t.then(fn, fn), (t = n)),
          t.status)
        ) {
          case `fulfilled`:
            return t.value;
          case `rejected`:
            throw ((e = t.reason), Va(e), e);
          default:
            if (typeof t.status == `string`) t.then(fn, fn);
            else {
              if (((e = q), e !== null && 100 < e.shellSuspendCounter))
                throw Error(i(482));
              ((e = t),
                (e.status = `pending`),
                e.then(
                  function (e) {
                    if (t.status === `pending`) {
                      var n = t;
                      ((n.status = `fulfilled`), (n.value = e));
                    }
                  },
                  function (e) {
                    if (t.status === `pending`) {
                      var n = t;
                      ((n.status = `rejected`), (n.reason = e));
                    }
                  },
                ));
            }
            switch (t.status) {
              case `fulfilled`:
                return t.value;
              case `rejected`:
                throw ((e = t.reason), Va(e), e);
            }
            throw ((za = t), Na);
        }
      }
      function Ra(e) {
        try {
          var t = e._init;
          return t(e._payload);
        } catch (e) {
          throw typeof e == `object` && e && typeof e.then == `function`
            ? ((za = e), Na)
            : e;
        }
      }
      var za = null;
      function Ba() {
        if (za === null) throw Error(i(459));
        var e = za;
        return ((za = null), e);
      }
      function Va(e) {
        if (e === Na || e === Pa) throw Error(i(483));
      }
      var Ha = null,
        Ua = 0;
      function Wa(e) {
        var t = Ua;
        return ((Ua += 1), Ha === null && (Ha = []), La(Ha, e, t));
      }
      function Ga(e, t) {
        ((t = t.props.ref), (e.ref = t === void 0 ? null : t));
      }
      function Ka(e, t) {
        throw t.$$typeof === g
          ? Error(i(525))
          : ((e = Object.prototype.toString.call(t)),
            Error(
              i(
                31,
                e === `[object Object]`
                  ? `object with keys {` + Object.keys(t).join(`, `) + `}`
                  : e,
              ),
            ));
      }
      function qa(e) {
        function t(t, n) {
          if (e) {
            var r = t.deletions;
            r === null ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
          }
        }
        function n(n, r) {
          if (!e) return null;
          for (; r !== null; ) (t(n, r), (r = r.sibling));
          return null;
        }
        function r(e) {
          for (var t = new Map(); e !== null; )
            (e.key === null ? t.set(e.index, e) : t.set(e.key, e),
              (e = e.sibling));
          return t;
        }
        function a(e, t) {
          return ((e = Si(e, t)), (e.index = 0), (e.sibling = null), e);
        }
        function o(t, n, r) {
          return (
            (t.index = r),
            e
              ? ((r = t.alternate),
                r === null
                  ? ((t.flags |= 67108866), n)
                  : ((r = r.index), r < n ? ((t.flags |= 67108866), n) : r))
              : ((t.flags |= 1048576), n)
          );
        }
        function s(t) {
          return (e && t.alternate === null && (t.flags |= 67108866), t);
        }
        function c(e, t, n, r) {
          return t === null || t.tag !== 6
            ? ((t = Ei(n, e.mode, r)), (t.return = e), t)
            : ((t = a(t, n)), (t.return = e), t);
        }
        function l(e, t, n, r) {
          var i = n.type;
          return i === y
            ? d(e, t, n.props.children, r, n.key)
            : t !== null &&
                (t.elementType === i ||
                  (typeof i == `object` &&
                    i &&
                    i.$$typeof === ie &&
                    Ra(i) === t.type))
              ? ((t = a(t, n.props)), Ga(t, n), (t.return = e), t)
              : ((t = wi(n.type, n.key, n.props, null, e.mode, r)),
                Ga(t, n),
                (t.return = e),
                t);
        }
        function u(e, t, n, r) {
          return t === null ||
            t.tag !== 4 ||
            t.stateNode.containerInfo !== n.containerInfo ||
            t.stateNode.implementation !== n.implementation
            ? ((t = Oi(n, e.mode, r)), (t.return = e), t)
            : ((t = a(t, n.children || [])), (t.return = e), t);
        }
        function d(e, t, n, r, i) {
          return t === null || t.tag !== 7
            ? ((t = Ti(n, e.mode, r, i)), (t.return = e), t)
            : ((t = a(t, n)), (t.return = e), t);
        }
        function f(e, t, n) {
          if (
            (typeof t == `string` && t !== ``) ||
            typeof t == `number` ||
            typeof t == `bigint`
          )
            return ((t = Ei(`` + t, e.mode, n)), (t.return = e), t);
          if (typeof t == `object` && t) {
            switch (t.$$typeof) {
              case _:
                return (
                  (n = wi(t.type, t.key, t.props, null, e.mode, n)),
                  Ga(n, t),
                  (n.return = e),
                  n
                );
              case v:
                return ((t = Oi(t, e.mode, n)), (t.return = e), t);
              case ie:
                return ((t = Ra(t)), f(e, t, n));
            }
            if (de(t) || ce(t))
              return ((t = Ti(t, e.mode, n, null)), (t.return = e), t);
            if (typeof t.then == `function`) return f(e, Wa(t), n);
            if (t.$$typeof === S) return f(e, pa(e, t), n);
            Ka(e, t);
          }
          return null;
        }
        function p(e, t, n, r) {
          var i = t === null ? null : t.key;
          if (
            (typeof n == `string` && n !== ``) ||
            typeof n == `number` ||
            typeof n == `bigint`
          )
            return i === null ? c(e, t, `` + n, r) : null;
          if (typeof n == `object` && n) {
            switch (n.$$typeof) {
              case _:
                return n.key === i ? l(e, t, n, r) : null;
              case v:
                return n.key === i ? u(e, t, n, r) : null;
              case ie:
                return ((n = Ra(n)), p(e, t, n, r));
            }
            if (de(n) || ce(n)) return i === null ? d(e, t, n, r, null) : null;
            if (typeof n.then == `function`) return p(e, t, Wa(n), r);
            if (n.$$typeof === S) return p(e, t, pa(e, n), r);
            Ka(e, n);
          }
          return null;
        }
        function m(e, t, n, r, i) {
          if (
            (typeof r == `string` && r !== ``) ||
            typeof r == `number` ||
            typeof r == `bigint`
          )
            return ((e = e.get(n) || null), c(t, e, `` + r, i));
          if (typeof r == `object` && r) {
            switch (r.$$typeof) {
              case _:
                return (
                  (e = e.get(r.key === null ? n : r.key) || null),
                  l(t, e, r, i)
                );
              case v:
                return (
                  (e = e.get(r.key === null ? n : r.key) || null),
                  u(t, e, r, i)
                );
              case ie:
                return ((r = Ra(r)), m(e, t, n, r, i));
            }
            if (de(r) || ce(r))
              return ((e = e.get(n) || null), d(t, e, r, i, null));
            if (typeof r.then == `function`) return m(e, t, n, Wa(r), i);
            if (r.$$typeof === S) return m(e, t, n, pa(t, r), i);
            Ka(t, r);
          }
          return null;
        }
        function h(i, a, s, c) {
          for (
            var l = null, u = null, d = a, h = (a = 0), g = null;
            d !== null && h < s.length;
            h++
          ) {
            d.index > h ? ((g = d), (d = null)) : (g = d.sibling);
            var _ = p(i, d, s[h], c);
            if (_ === null) {
              d === null && (d = g);
              break;
            }
            (e && d && _.alternate === null && t(i, d),
              (a = o(_, a, h)),
              u === null ? (l = _) : (u.sibling = _),
              (u = _),
              (d = g));
          }
          if (h === s.length) return (n(i, d), D && Bi(i, h), l);
          if (d === null) {
            for (; h < s.length; h++)
              ((d = f(i, s[h], c)),
                d !== null &&
                  ((a = o(d, a, h)),
                  u === null ? (l = d) : (u.sibling = d),
                  (u = d)));
            return (D && Bi(i, h), l);
          }
          for (d = r(d); h < s.length; h++)
            ((g = m(d, i, h, s[h], c)),
              g !== null &&
                (e &&
                  g.alternate !== null &&
                  d.delete(g.key === null ? h : g.key),
                (a = o(g, a, h)),
                u === null ? (l = g) : (u.sibling = g),
                (u = g)));
          return (
            e &&
              d.forEach(function (e) {
                return t(i, e);
              }),
            D && Bi(i, h),
            l
          );
        }
        function g(a, s, c, l) {
          if (c == null) throw Error(i(151));
          for (
            var u = null, d = null, h = s, g = (s = 0), _ = null, v = c.next();
            h !== null && !v.done;
            g++, v = c.next()
          ) {
            h.index > g ? ((_ = h), (h = null)) : (_ = h.sibling);
            var y = p(a, h, v.value, l);
            if (y === null) {
              h === null && (h = _);
              break;
            }
            (e && h && y.alternate === null && t(a, h),
              (s = o(y, s, g)),
              d === null ? (u = y) : (d.sibling = y),
              (d = y),
              (h = _));
          }
          if (v.done) return (n(a, h), D && Bi(a, g), u);
          if (h === null) {
            for (; !v.done; g++, v = c.next())
              ((v = f(a, v.value, l)),
                v !== null &&
                  ((s = o(v, s, g)),
                  d === null ? (u = v) : (d.sibling = v),
                  (d = v)));
            return (D && Bi(a, g), u);
          }
          for (h = r(h); !v.done; g++, v = c.next())
            ((v = m(h, a, g, v.value, l)),
              v !== null &&
                (e &&
                  v.alternate !== null &&
                  h.delete(v.key === null ? g : v.key),
                (s = o(v, s, g)),
                d === null ? (u = v) : (d.sibling = v),
                (d = v)));
          return (
            e &&
              h.forEach(function (e) {
                return t(a, e);
              }),
            D && Bi(a, g),
            u
          );
        }
        function b(e, r, o, c) {
          if (
            (typeof o == `object` &&
              o &&
              o.type === y &&
              o.key === null &&
              (o = o.props.children),
            typeof o == `object` && o)
          ) {
            switch (o.$$typeof) {
              case _:
                a: {
                  for (var l = o.key; r !== null; ) {
                    if (r.key === l) {
                      if (((l = o.type), l === y)) {
                        if (r.tag === 7) {
                          (n(e, r.sibling),
                            (c = a(r, o.props.children)),
                            (c.return = e),
                            (e = c));
                          break a;
                        }
                      } else if (
                        r.elementType === l ||
                        (typeof l == `object` &&
                          l &&
                          l.$$typeof === ie &&
                          Ra(l) === r.type)
                      ) {
                        (n(e, r.sibling),
                          (c = a(r, o.props)),
                          Ga(c, o),
                          (c.return = e),
                          (e = c));
                        break a;
                      }
                      n(e, r);
                      break;
                    }
                    (t(e, r), (r = r.sibling));
                  }
                  o.type === y
                    ? ((c = Ti(o.props.children, e.mode, c, o.key)),
                      (c.return = e),
                      (e = c))
                    : ((c = wi(o.type, o.key, o.props, null, e.mode, c)),
                      Ga(c, o),
                      (c.return = e),
                      (e = c));
                }
                return s(e);
              case v:
                a: {
                  for (l = o.key; r !== null; ) {
                    if (r.key === l) {
                      if (
                        r.tag === 4 &&
                        r.stateNode.containerInfo === o.containerInfo &&
                        r.stateNode.implementation === o.implementation
                      ) {
                        (n(e, r.sibling),
                          (c = a(r, o.children || [])),
                          (c.return = e),
                          (e = c));
                        break a;
                      }
                      n(e, r);
                      break;
                    }
                    (t(e, r), (r = r.sibling));
                  }
                  ((c = Oi(o, e.mode, c)), (c.return = e), (e = c));
                }
                return s(e);
              case ie:
                return ((o = Ra(o)), b(e, r, o, c));
            }
            if (de(o)) return h(e, r, o, c);
            if (ce(o)) {
              if (((l = ce(o)), typeof l != `function`)) throw Error(i(150));
              return ((o = l.call(o)), g(e, r, o, c));
            }
            if (typeof o.then == `function`) return b(e, r, Wa(o), c);
            if (o.$$typeof === S) return b(e, r, pa(e, o), c);
            Ka(e, o);
          }
          return (typeof o == `string` && o !== ``) ||
            typeof o == `number` ||
            typeof o == `bigint`
            ? ((o = `` + o),
              r !== null && r.tag === 6
                ? (n(e, r.sibling), (c = a(r, o)), (c.return = e), (e = c))
                : (n(e, r), (c = Ei(o, e.mode, c)), (c.return = e), (e = c)),
              s(e))
            : n(e, r);
        }
        return function (e, t, n, r) {
          try {
            Ua = 0;
            var i = b(e, t, n, r);
            return ((Ha = null), i);
          } catch (t) {
            if (t === Na || t === Pa) throw t;
            var a = bi(29, t, null, e.mode);
            return ((a.lanes = r), (a.return = e), a);
          }
        };
      }
      var Ja = qa(!0),
        Ya = qa(!1),
        Xa = !1;
      function Za(e) {
        e.updateQueue = {
          baseState: e.memoizedState,
          firstBaseUpdate: null,
          lastBaseUpdate: null,
          shared: { pending: null, lanes: 0, hiddenCallbacks: null },
          callbacks: null,
        };
      }
      function Qa(e, t) {
        ((e = e.updateQueue),
          t.updateQueue === e &&
            (t.updateQueue = {
              baseState: e.baseState,
              firstBaseUpdate: e.firstBaseUpdate,
              lastBaseUpdate: e.lastBaseUpdate,
              shared: e.shared,
              callbacks: null,
            }));
      }
      function $a(e) {
        return { lane: e, tag: 0, payload: null, callback: null, next: null };
      }
      function eo(e, t, n) {
        var r = e.updateQueue;
        if (r === null) return null;
        if (((r = r.shared), K & 2)) {
          var i = r.pending;
          return (
            i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
            (r.pending = t),
            (t = _i(e)),
            gi(e, null, n),
            t
          );
        }
        return (pi(e, r, t, n), _i(e));
      }
      function to(e, t, n) {
        if (
          ((t = t.updateQueue), t !== null && ((t = t.shared), n & 4194048))
        ) {
          var r = t.lanes;
          ((r &= e.pendingLanes), (n |= r), (t.lanes = n), dt(e, n));
        }
      }
      function no(e, t) {
        var n = e.updateQueue,
          r = e.alternate;
        if (r !== null && ((r = r.updateQueue), n === r)) {
          var i = null,
            a = null;
          if (((n = n.firstBaseUpdate), n !== null)) {
            do {
              var o = {
                lane: n.lane,
                tag: n.tag,
                payload: n.payload,
                callback: null,
                next: null,
              };
              (a === null ? (i = a = o) : (a = a.next = o), (n = n.next));
            } while (n !== null);
            a === null ? (i = a = t) : (a = a.next = t);
          } else i = a = t;
          ((n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: a,
            shared: r.shared,
            callbacks: r.callbacks,
          }),
            (e.updateQueue = n));
          return;
        }
        ((e = n.lastBaseUpdate),
          e === null ? (n.firstBaseUpdate = t) : (e.next = t),
          (n.lastBaseUpdate = t));
      }
      var ro = !1;
      function io() {
        if (ro) {
          var e = wa;
          if (e !== null) throw e;
        }
      }
      function ao(e, t, n, r) {
        ro = !1;
        var i = e.updateQueue;
        Xa = !1;
        var a = i.firstBaseUpdate,
          o = i.lastBaseUpdate,
          s = i.shared.pending;
        if (s !== null) {
          i.shared.pending = null;
          var c = s,
            l = c.next;
          ((c.next = null), o === null ? (a = l) : (o.next = l), (o = c));
          var u = e.alternate;
          u !== null &&
            ((u = u.updateQueue),
            (s = u.lastBaseUpdate),
            s !== o &&
              (s === null ? (u.firstBaseUpdate = l) : (s.next = l),
              (u.lastBaseUpdate = c)));
        }
        if (a !== null) {
          var d = i.baseState;
          ((o = 0), (u = l = c = null), (s = a));
          do {
            var f = s.lane & -536870913,
              p = f !== s.lane;
            if (p ? (Y & f) === f : (r & f) === f) {
              (f !== 0 && f === Ca && (ro = !0),
                u !== null &&
                  (u = u.next =
                    {
                      lane: 0,
                      tag: s.tag,
                      payload: s.payload,
                      callback: null,
                      next: null,
                    }));
              a: {
                var m = e,
                  g = s;
                f = t;
                var _ = n;
                switch (g.tag) {
                  case 1:
                    if (((m = g.payload), typeof m == `function`)) {
                      d = m.call(_, d, f);
                      break a;
                    }
                    d = m;
                    break a;
                  case 3:
                    m.flags = (m.flags & -65537) | 128;
                  case 0:
                    if (
                      ((m = g.payload),
                      (f = typeof m == `function` ? m.call(_, d, f) : m),
                      f == null)
                    )
                      break a;
                    d = h({}, d, f);
                    break a;
                  case 2:
                    Xa = !0;
                }
              }
              ((f = s.callback),
                f !== null &&
                  ((e.flags |= 64),
                  p && (e.flags |= 8192),
                  (p = i.callbacks),
                  p === null ? (i.callbacks = [f]) : p.push(f)));
            } else
              ((p = {
                lane: f,
                tag: s.tag,
                payload: s.payload,
                callback: s.callback,
                next: null,
              }),
                u === null ? ((l = u = p), (c = d)) : (u = u.next = p),
                (o |= f));
            if (((s = s.next), s === null)) {
              if (((s = i.shared.pending), s === null)) break;
              ((p = s),
                (s = p.next),
                (p.next = null),
                (i.lastBaseUpdate = p),
                (i.shared.pending = null));
            }
          } while (1);
          (u === null && (c = d),
            (i.baseState = c),
            (i.firstBaseUpdate = l),
            (i.lastBaseUpdate = u),
            a === null && (i.shared.lanes = 0),
            (Gl |= o),
            (e.lanes = o),
            (e.memoizedState = d));
        }
      }
      function oo(e, t) {
        if (typeof e != `function`) throw Error(i(191, e));
        e.call(t);
      }
      function so(e, t) {
        var n = e.callbacks;
        if (n !== null)
          for (e.callbacks = null, e = 0; e < n.length; e++) oo(n[e], t);
      }
      var co = he(null),
        lo = he(0);
      function A(e, t) {
        ((e = Ul), E(lo, e), E(co, t), (Ul = e | t.baseLanes));
      }
      function j() {
        (E(lo, Ul), E(co, co.current));
      }
      function uo() {
        ((Ul = lo.current), ge(co), ge(lo));
      }
      var M = he(null),
        fo = null;
      function po(e) {
        var t = e.alternate;
        (E(_o, _o.current & 1),
          E(M, e),
          fo === null &&
            (t === null || co.current !== null || t.memoizedState !== null) &&
            (fo = e));
      }
      function mo(e) {
        (E(_o, _o.current), E(M, e), fo === null && (fo = e));
      }
      function N(e) {
        e.tag === 22
          ? (E(_o, _o.current), E(M, e), fo === null && (fo = e))
          : ho(e);
      }
      function ho() {
        (E(_o, _o.current), E(M, M.current));
      }
      function go(e) {
        (ge(M), fo === e && (fo = null), ge(_o));
      }
      var _o = he(0);
      function vo(e) {
        for (var t = e; t !== null; ) {
          if (t.tag === 13) {
            var n = t.memoizedState;
            if (
              n !== null &&
              ((n = n.dehydrated), n === null || af(n) || of(n))
            )
              return t;
          } else if (
            t.tag === 19 &&
            (t.memoizedProps.revealOrder === `forwards` ||
              t.memoizedProps.revealOrder === `backwards` ||
              t.memoizedProps.revealOrder === `unstable_legacy-backwards` ||
              t.memoizedProps.revealOrder === `together`)
          ) {
            if (t.flags & 128) return t;
          } else if (t.child !== null) {
            ((t.child.return = t), (t = t.child));
            continue;
          }
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
        return null;
      }
      var yo = 0,
        P = null,
        F = null,
        I = null,
        bo = !1,
        xo = !1,
        So = !1,
        Co = 0,
        wo = 0,
        To = null,
        Eo = 0;
      function L() {
        throw Error(i(321));
      }
      function Do(e, t) {
        if (t === null) return !1;
        for (var n = 0; n < t.length && n < e.length; n++)
          if (!Pr(e[n], t[n])) return !1;
        return !0;
      }
      function Oo(e, t, n, r, i, a) {
        return (
          (yo = a),
          (P = t),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.lanes = 0),
          (w.H = e === null || e.memoizedState === null ? Ws : Gs),
          (So = !1),
          (a = n(r, i)),
          (So = !1),
          xo && (a = Ao(t, n, r, i)),
          ko(e),
          a
        );
      }
      function ko(e) {
        w.H = Us;
        var t = F !== null && F.next !== null;
        if (((yo = 0), (I = F = P = null), (bo = !1), (wo = 0), (To = null), t))
          throw Error(i(300));
        e === null ||
          cc ||
          ((e = e.dependencies), e !== null && ua(e) && (cc = !0));
      }
      function Ao(e, t, n, r) {
        P = e;
        var a = 0;
        do {
          if ((xo && (To = null), (wo = 0), (xo = !1), 25 <= a))
            throw Error(i(301));
          if (((a += 1), (I = F = null), e.updateQueue != null)) {
            var o = e.updateQueue;
            ((o.lastEffect = null),
              (o.events = null),
              (o.stores = null),
              o.memoCache != null && (o.memoCache.index = 0));
          }
          ((w.H = Ks), (o = t(n, r)));
        } while (xo);
        return o;
      }
      function jo() {
        var e = w.H,
          t = e.useState()[0];
        return (
          (t = typeof t.then == `function` ? Ro(t) : t),
          (e = e.useState()[0]),
          (F === null ? null : F.memoizedState) !== e && (P.flags |= 1024),
          t
        );
      }
      function Mo() {
        var e = Co !== 0;
        return ((Co = 0), e);
      }
      function No(e, t, n) {
        ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
      }
      function Po(e) {
        if (bo) {
          for (e = e.memoizedState; e !== null; ) {
            var t = e.queue;
            (t !== null && (t.pending = null), (e = e.next));
          }
          bo = !1;
        }
        ((yo = 0), (I = F = P = null), (xo = !1), (wo = Co = 0), (To = null));
      }
      function Fo() {
        var e = {
          memoizedState: null,
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null,
        };
        return (I === null ? (P.memoizedState = I = e) : (I = I.next = e), I);
      }
      function Io() {
        if (F === null) {
          var e = P.alternate;
          e = e === null ? null : e.memoizedState;
        } else e = F.next;
        var t = I === null ? P.memoizedState : I.next;
        if (t !== null) ((I = t), (F = e));
        else {
          if (e === null)
            throw P.alternate === null ? Error(i(467)) : Error(i(310));
          ((F = e),
            (e = {
              memoizedState: F.memoizedState,
              baseState: F.baseState,
              baseQueue: F.baseQueue,
              queue: F.queue,
              next: null,
            }),
            I === null ? (P.memoizedState = I = e) : (I = I.next = e));
        }
        return I;
      }
      function Lo() {
        return {
          lastEffect: null,
          events: null,
          stores: null,
          memoCache: null,
        };
      }
      function Ro(e) {
        var t = wo;
        return (
          (wo += 1),
          To === null && (To = []),
          (e = La(To, e, t)),
          (t = P),
          (I === null ? t.memoizedState : I.next) === null &&
            ((t = t.alternate),
            (w.H = t === null || t.memoizedState === null ? Ws : Gs)),
          e
        );
      }
      function zo(e) {
        if (typeof e == `object` && e) {
          if (typeof e.then == `function`) return Ro(e);
          if (e.$$typeof === S) return fa(e);
        }
        throw Error(i(438, String(e)));
      }
      function Bo(e) {
        var t = null,
          n = P.updateQueue;
        if ((n !== null && (t = n.memoCache), t == null)) {
          var r = P.alternate;
          r !== null &&
            ((r = r.updateQueue),
            r !== null &&
              ((r = r.memoCache),
              r != null &&
                (t = {
                  data: r.data.map(function (e) {
                    return e.slice();
                  }),
                  index: 0,
                })));
        }
        if (
          ((t ??= { data: [], index: 0 }),
          n === null && ((n = Lo()), (P.updateQueue = n)),
          (n.memoCache = t),
          (n = t.data[t.index]),
          n === void 0)
        )
          for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = oe;
        return (t.index++, n);
      }
      function Vo(e, t) {
        return typeof t == `function` ? t(e) : t;
      }
      function Ho(e) {
        return Uo(Io(), F, e);
      }
      function Uo(e, t, n) {
        var r = e.queue;
        if (r === null) throw Error(i(311));
        r.lastRenderedReducer = n;
        var a = e.baseQueue,
          o = r.pending;
        if (o !== null) {
          if (a !== null) {
            var s = a.next;
            ((a.next = o.next), (o.next = s));
          }
          ((t.baseQueue = a = o), (r.pending = null));
        }
        if (((o = e.baseState), a === null)) e.memoizedState = o;
        else {
          t = a.next;
          var c = (s = null),
            l = null,
            u = t,
            d = !1;
          do {
            var f = u.lane & -536870913;
            if (f === u.lane ? (yo & f) === f : (Y & f) === f) {
              var p = u.revertLane;
              if (p === 0)
                (l !== null &&
                  (l = l.next =
                    {
                      lane: 0,
                      revertLane: 0,
                      gesture: null,
                      action: u.action,
                      hasEagerState: u.hasEagerState,
                      eagerState: u.eagerState,
                      next: null,
                    }),
                  f === Ca && (d = !0));
              else if ((yo & p) === p) {
                ((u = u.next), p === Ca && (d = !0));
                continue;
              } else
                ((f = {
                  lane: 0,
                  revertLane: u.revertLane,
                  gesture: null,
                  action: u.action,
                  hasEagerState: u.hasEagerState,
                  eagerState: u.eagerState,
                  next: null,
                }),
                  l === null ? ((c = l = f), (s = o)) : (l = l.next = f),
                  (P.lanes |= p),
                  (Gl |= p));
              ((f = u.action),
                So && n(o, f),
                (o = u.hasEagerState ? u.eagerState : n(o, f)));
            } else
              ((p = {
                lane: f,
                revertLane: u.revertLane,
                gesture: u.gesture,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null,
              }),
                l === null ? ((c = l = p), (s = o)) : (l = l.next = p),
                (P.lanes |= f),
                (Gl |= f));
            u = u.next;
          } while (u !== null && u !== t);
          if (
            (l === null ? (s = o) : (l.next = c),
            !Pr(o, e.memoizedState) && ((cc = !0), d && ((n = wa), n !== null)))
          )
            throw n;
          ((e.memoizedState = o),
            (e.baseState = s),
            (e.baseQueue = l),
            (r.lastRenderedState = o));
        }
        return (a === null && (r.lanes = 0), [e.memoizedState, r.dispatch]);
      }
      function Wo(e) {
        var t = Io(),
          n = t.queue;
        if (n === null) throw Error(i(311));
        n.lastRenderedReducer = e;
        var r = n.dispatch,
          a = n.pending,
          o = t.memoizedState;
        if (a !== null) {
          n.pending = null;
          var s = (a = a.next);
          do ((o = e(o, s.action)), (s = s.next));
          while (s !== a);
          (Pr(o, t.memoizedState) || (cc = !0),
            (t.memoizedState = o),
            t.baseQueue === null && (t.baseState = o),
            (n.lastRenderedState = o));
        }
        return [o, r];
      }
      function Go(e, t, n) {
        var r = P,
          a = Io(),
          o = D;
        if (o) {
          if (n === void 0) throw Error(i(407));
          n = n();
        } else n = t();
        var s = !Pr((F || a).memoizedState, n);
        if (
          (s && ((a.memoizedState = n), (cc = !0)),
          (a = a.queue),
          hs(Jo.bind(null, r, a, e), [e]),
          a.getSnapshot !== t || s || (I !== null && I.memoizedState.tag & 1))
        ) {
          if (
            ((r.flags |= 2048),
            us(9, { destroy: void 0 }, qo.bind(null, r, a, n, t), null),
            q === null)
          )
            throw Error(i(349));
          o || yo & 127 || Ko(r, t, n);
        }
        return n;
      }
      function Ko(e, t, n) {
        ((e.flags |= 16384),
          (e = { getSnapshot: t, value: n }),
          (t = P.updateQueue),
          t === null
            ? ((t = Lo()), (P.updateQueue = t), (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
      }
      function qo(e, t, n, r) {
        ((t.value = n), (t.getSnapshot = r), R(t) && Yo(e));
      }
      function Jo(e, t, n) {
        return n(function () {
          R(t) && Yo(e);
        });
      }
      function R(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
          var n = t();
          return !Pr(e, n);
        } catch {
          return !0;
        }
      }
      function Yo(e) {
        var t = hi(e, 2);
        t !== null && hu(t, e, 2);
      }
      function Xo(e) {
        var t = Fo();
        if (typeof e == `function`) {
          var n = e;
          if (((e = n()), So)) {
            Je(!0);
            try {
              n();
            } finally {
              Je(!1);
            }
          }
        }
        return (
          (t.memoizedState = t.baseState = e),
          (t.queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Vo,
            lastRenderedState: e,
          }),
          t
        );
      }
      function Zo(e, t, n, r) {
        return ((e.baseState = n), Uo(e, F, typeof r == `function` ? r : Vo));
      }
      function Qo(e, t, n, r, a) {
        if (Bs(e)) throw Error(i(485));
        if (((e = t.action), e !== null)) {
          var o = {
            payload: a,
            action: e,
            next: null,
            isTransition: !0,
            status: `pending`,
            value: null,
            reason: null,
            listeners: [],
            then: function (e) {
              o.listeners.push(e);
            },
          };
          (w.T === null ? (o.isTransition = !1) : n(!0),
            r(o),
            (n = t.pending),
            n === null
              ? ((o.next = t.pending = o), $o(t, o))
              : ((o.next = n.next), (t.pending = n.next = o)));
        }
      }
      function $o(e, t) {
        var n = t.action,
          r = t.payload,
          i = e.state;
        if (t.isTransition) {
          var a = w.T,
            o = {};
          w.T = o;
          try {
            var s = n(i, r),
              c = w.S;
            (c !== null && c(o, s), es(e, t, s));
          } catch (n) {
            ns(e, t, n);
          } finally {
            (a !== null && o.types !== null && (a.types = o.types), (w.T = a));
          }
        } else
          try {
            ((a = n(i, r)), es(e, t, a));
          } catch (n) {
            ns(e, t, n);
          }
      }
      function es(e, t, n) {
        typeof n == `object` && n && typeof n.then == `function`
          ? n.then(
              function (n) {
                ts(e, t, n);
              },
              function (n) {
                return ns(e, t, n);
              },
            )
          : ts(e, t, n);
      }
      function ts(e, t, n) {
        ((t.status = `fulfilled`),
          (t.value = n),
          rs(t),
          (e.state = n),
          (t = e.pending),
          t !== null &&
            ((n = t.next),
            n === t
              ? (e.pending = null)
              : ((n = n.next), (t.next = n), $o(e, n))));
      }
      function ns(e, t, n) {
        var r = e.pending;
        if (((e.pending = null), r !== null)) {
          r = r.next;
          do ((t.status = `rejected`), (t.reason = n), rs(t), (t = t.next));
          while (t !== r);
        }
        e.action = null;
      }
      function rs(e) {
        e = e.listeners;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
      function is(e, t) {
        return t;
      }
      function as(e, t) {
        if (D) {
          var n = q.formState;
          if (n !== null) {
            a: {
              var r = P;
              if (D) {
                if (Ki) {
                  b: {
                    for (var i = Ki, a = Ji; i.nodeType !== 8; ) {
                      if (!a) {
                        i = null;
                        break b;
                      }
                      if (((i = cf(i.nextSibling)), i === null)) {
                        i = null;
                        break b;
                      }
                    }
                    ((a = i.data), (i = a === `F!` || a === `F` ? i : null));
                  }
                  if (i) {
                    ((Ki = cf(i.nextSibling)), (r = i.data === `F!`));
                    break a;
                  }
                }
                Xi(r);
              }
              r = !1;
            }
            r && (t = n[0]);
          }
        }
        return (
          (n = Fo()),
          (n.memoizedState = n.baseState = t),
          (r = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: is,
            lastRenderedState: t,
          }),
          (n.queue = r),
          (n = Ls.bind(null, P, r)),
          (r.dispatch = n),
          (r = Xo(!1)),
          (a = zs.bind(null, P, !1, r.queue)),
          (r = Fo()),
          (i = { state: t, dispatch: null, action: e, pending: null }),
          (r.queue = i),
          (n = Qo.bind(null, P, i, a, n)),
          (i.dispatch = n),
          (r.memoizedState = e),
          [t, n, !1]
        );
      }
      function os(e) {
        return ss(Io(), F, e);
      }
      function ss(e, t, n) {
        if (
          ((t = Uo(e, t, is)[0]),
          (e = Ho(Vo)[0]),
          typeof t == `object` && t && typeof t.then == `function`)
        )
          try {
            var r = Ro(t);
          } catch (e) {
            throw e === Na ? Pa : e;
          }
        else r = t;
        t = Io();
        var i = t.queue,
          a = i.dispatch;
        return (
          n !== t.memoizedState &&
            ((P.flags |= 2048),
            us(9, { destroy: void 0 }, cs.bind(null, i, n), null)),
          [r, a, e]
        );
      }
      function cs(e, t) {
        e.action = t;
      }
      function ls(e) {
        var t = Io(),
          n = F;
        if (n !== null) return ss(t, n, e);
        (Io(), (t = t.memoizedState), (n = Io()));
        var r = n.queue.dispatch;
        return ((n.memoizedState = e), [t, r, !1]);
      }
      function us(e, t, n, r) {
        return (
          (e = { tag: e, create: n, deps: r, inst: t, next: null }),
          (t = P.updateQueue),
          t === null && ((t = Lo()), (P.updateQueue = t)),
          (n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
          e
        );
      }
      function ds() {
        return Io().memoizedState;
      }
      function fs(e, t, n, r) {
        var i = Fo();
        ((P.flags |= e),
          (i.memoizedState = us(
            1 | t,
            { destroy: void 0 },
            n,
            r === void 0 ? null : r,
          )));
      }
      function ps(e, t, n, r) {
        var i = Io();
        r = r === void 0 ? null : r;
        var a = i.memoizedState.inst;
        F !== null && r !== null && Do(r, F.memoizedState.deps)
          ? (i.memoizedState = us(t, a, n, r))
          : ((P.flags |= e), (i.memoizedState = us(1 | t, a, n, r)));
      }
      function ms(e, t) {
        fs(8390656, 8, e, t);
      }
      function hs(e, t) {
        ps(2048, 8, e, t);
      }
      function gs(e) {
        P.flags |= 4;
        var t = P.updateQueue;
        if (t === null) ((t = Lo()), (P.updateQueue = t), (t.events = [e]));
        else {
          var n = t.events;
          n === null ? (t.events = [e]) : n.push(e);
        }
      }
      function _s(e) {
        var t = Io().memoizedState;
        return (
          gs({ ref: t, nextImpl: e }),
          function () {
            if (K & 2) throw Error(i(440));
            return t.impl.apply(void 0, arguments);
          }
        );
      }
      function vs(e, t) {
        return ps(4, 2, e, t);
      }
      function ys(e, t) {
        return ps(4, 4, e, t);
      }
      function bs(e, t) {
        if (typeof t == `function`) {
          e = e();
          var n = t(e);
          return function () {
            typeof n == `function` ? n() : t(null);
          };
        }
        if (t != null)
          return (
            (e = e()),
            (t.current = e),
            function () {
              t.current = null;
            }
          );
      }
      function xs(e, t, n) {
        ((n = n == null ? null : n.concat([e])),
          ps(4, 4, bs.bind(null, t, e), n));
      }
      function Ss() {}
      function Cs(e, t) {
        var n = Io();
        t = t === void 0 ? null : t;
        var r = n.memoizedState;
        return t !== null && Do(t, r[1])
          ? r[0]
          : ((n.memoizedState = [e, t]), e);
      }
      function ws(e, t) {
        var n = Io();
        t = t === void 0 ? null : t;
        var r = n.memoizedState;
        if (t !== null && Do(t, r[1])) return r[0];
        if (((r = e()), So)) {
          Je(!0);
          try {
            e();
          } finally {
            Je(!1);
          }
        }
        return ((n.memoizedState = [r, t]), r);
      }
      function Ts(e, t, n) {
        return n === void 0 || (yo & 1073741824 && !(Y & 261930))
          ? (e.memoizedState = t)
          : ((e.memoizedState = n), (e = mu()), (P.lanes |= e), (Gl |= e), n);
      }
      function Es(e, t, n, r) {
        return Pr(n, t)
          ? n
          : co.current === null
            ? !(yo & 42) || (yo & 1073741824 && !(Y & 261930))
              ? ((cc = !0), (e.memoizedState = n))
              : ((e = mu()), (P.lanes |= e), (Gl |= e), t)
            : ((e = Ts(e, n, r)), Pr(e, t) || (cc = !0), e);
      }
      function Ds(e, t, n, r, i) {
        var a = T.p;
        T.p = a !== 0 && 8 > a ? a : 8;
        var o = w.T,
          s = {};
        ((w.T = s), zs(e, !1, t, n));
        try {
          var c = i(),
            l = w.S;
          (l !== null && l(s, c),
            typeof c == `object` && c && typeof c.then == `function`
              ? Rs(e, t, Da(c, r), pu(e))
              : Rs(e, t, r, pu(e)));
        } catch (n) {
          Rs(
            e,
            t,
            { then: function () {}, status: `rejected`, reason: n },
            pu(),
          );
        } finally {
          ((T.p = a),
            o !== null && s.types !== null && (o.types = s.types),
            (w.T = o));
        }
      }
      function Os() {}
      function ks(e, t, n, r) {
        if (e.tag !== 5) throw Error(i(476));
        var a = As(e).queue;
        Ds(
          e,
          a,
          t,
          fe,
          n === null
            ? Os
            : function () {
                return (js(e), n(r));
              },
        );
      }
      function As(e) {
        var t = e.memoizedState;
        if (t !== null) return t;
        t = {
          memoizedState: fe,
          baseState: fe,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Vo,
            lastRenderedState: fe,
          },
          next: null,
        };
        var n = {};
        return (
          (t.next = {
            memoizedState: n,
            baseState: n,
            baseQueue: null,
            queue: {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: Vo,
              lastRenderedState: n,
            },
            next: null,
          }),
          (e.memoizedState = t),
          (e = e.alternate),
          e !== null && (e.memoizedState = t),
          t
        );
      }
      function js(e) {
        var t = As(e);
        (t.next === null && (t = e.alternate.memoizedState),
          Rs(e, t.next.queue, {}, pu()));
      }
      function Ms() {
        return fa(Qf);
      }
      function Ns() {
        return Io().memoizedState;
      }
      function Ps() {
        return Io().memoizedState;
      }
      function Fs(e) {
        for (var t = e.return; t !== null; ) {
          switch (t.tag) {
            case 24:
            case 3:
              var n = pu();
              e = $a(n);
              var r = eo(t, e, n);
              (r !== null && (hu(r, t, n), to(r, t, n)),
                (t = { cache: ya() }),
                (e.payload = t));
              return;
          }
          t = t.return;
        }
      }
      function Is(e, t, n) {
        var r = pu();
        ((n = {
          lane: r,
          revertLane: 0,
          gesture: null,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
          Bs(e)
            ? Vs(t, n)
            : ((n = mi(e, t, n, r)), n !== null && (hu(n, e, r), Hs(n, t, r))));
      }
      function Ls(e, t, n) {
        Rs(e, t, n, pu());
      }
      function Rs(e, t, n, r) {
        var i = {
          lane: r,
          revertLane: 0,
          gesture: null,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        };
        if (Bs(e)) Vs(t, i);
        else {
          var a = e.alternate;
          if (
            e.lanes === 0 &&
            (a === null || a.lanes === 0) &&
            ((a = t.lastRenderedReducer), a !== null)
          )
            try {
              var o = t.lastRenderedState,
                s = a(o, n);
              if (((i.hasEagerState = !0), (i.eagerState = s), Pr(s, o)))
                return (pi(e, t, i, 0), q === null && fi(), !1);
            } catch {}
          if (((n = mi(e, t, i, r)), n !== null))
            return (hu(n, e, r), Hs(n, t, r), !0);
        }
        return !1;
      }
      function zs(e, t, n, r) {
        if (
          ((r = {
            lane: 2,
            revertLane: dd(),
            gesture: null,
            action: r,
            hasEagerState: !1,
            eagerState: null,
            next: null,
          }),
          Bs(e))
        ) {
          if (t) throw Error(i(479));
        } else ((t = mi(e, n, r, 2)), t !== null && hu(t, e, 2));
      }
      function Bs(e) {
        var t = e.alternate;
        return e === P || (t !== null && t === P);
      }
      function Vs(e, t) {
        xo = bo = !0;
        var n = e.pending;
        (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
          (e.pending = t));
      }
      function Hs(e, t, n) {
        if (n & 4194048) {
          var r = t.lanes;
          ((r &= e.pendingLanes), (n |= r), (t.lanes = n), dt(e, n));
        }
      }
      var Us = {
        readContext: fa,
        use: zo,
        useCallback: L,
        useContext: L,
        useEffect: L,
        useImperativeHandle: L,
        useLayoutEffect: L,
        useInsertionEffect: L,
        useMemo: L,
        useReducer: L,
        useRef: L,
        useState: L,
        useDebugValue: L,
        useDeferredValue: L,
        useTransition: L,
        useSyncExternalStore: L,
        useId: L,
        useHostTransitionStatus: L,
        useFormState: L,
        useActionState: L,
        useOptimistic: L,
        useMemoCache: L,
        useCacheRefresh: L,
      };
      Us.useEffectEvent = L;
      var Ws = {
          readContext: fa,
          use: zo,
          useCallback: function (e, t) {
            return ((Fo().memoizedState = [e, t === void 0 ? null : t]), e);
          },
          useContext: fa,
          useEffect: ms,
          useImperativeHandle: function (e, t, n) {
            ((n = n == null ? null : n.concat([e])),
              fs(4194308, 4, bs.bind(null, t, e), n));
          },
          useLayoutEffect: function (e, t) {
            return fs(4194308, 4, e, t);
          },
          useInsertionEffect: function (e, t) {
            fs(4, 2, e, t);
          },
          useMemo: function (e, t) {
            var n = Fo();
            t = t === void 0 ? null : t;
            var r = e();
            if (So) {
              Je(!0);
              try {
                e();
              } finally {
                Je(!1);
              }
            }
            return ((n.memoizedState = [r, t]), r);
          },
          useReducer: function (e, t, n) {
            var r = Fo();
            if (n !== void 0) {
              var i = n(t);
              if (So) {
                Je(!0);
                try {
                  n(t);
                } finally {
                  Je(!1);
                }
              }
            } else i = t;
            return (
              (r.memoizedState = r.baseState = i),
              (e = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: i,
              }),
              (r.queue = e),
              (e = e.dispatch = Is.bind(null, P, e)),
              [r.memoizedState, e]
            );
          },
          useRef: function (e) {
            var t = Fo();
            return ((e = { current: e }), (t.memoizedState = e));
          },
          useState: function (e) {
            e = Xo(e);
            var t = e.queue,
              n = Ls.bind(null, P, t);
            return ((t.dispatch = n), [e.memoizedState, n]);
          },
          useDebugValue: Ss,
          useDeferredValue: function (e, t) {
            return Ts(Fo(), e, t);
          },
          useTransition: function () {
            var e = Xo(!1);
            return (
              (e = Ds.bind(null, P, e.queue, !0, !1)),
              (Fo().memoizedState = e),
              [!1, e]
            );
          },
          useSyncExternalStore: function (e, t, n) {
            var r = P,
              a = Fo();
            if (D) {
              if (n === void 0) throw Error(i(407));
              n = n();
            } else {
              if (((n = t()), q === null)) throw Error(i(349));
              Y & 127 || Ko(r, t, n);
            }
            a.memoizedState = n;
            var o = { value: n, getSnapshot: t };
            return (
              (a.queue = o),
              ms(Jo.bind(null, r, o, e), [e]),
              (r.flags |= 2048),
              us(9, { destroy: void 0 }, qo.bind(null, r, o, n, t), null),
              n
            );
          },
          useId: function () {
            var e = Fo(),
              t = q.identifierPrefix;
            if (D) {
              var n = zi,
                r = Ri;
              ((n = (r & ~(1 << (32 - Ye(r) - 1))).toString(32) + n),
                (t = `_` + t + `R_` + n),
                (n = Co++),
                0 < n && (t += `H` + n.toString(32)),
                (t += `_`));
            } else ((n = Eo++), (t = `_` + t + `r_` + n.toString(32) + `_`));
            return (e.memoizedState = t);
          },
          useHostTransitionStatus: Ms,
          useFormState: as,
          useActionState: as,
          useOptimistic: function (e) {
            var t = Fo();
            t.memoizedState = t.baseState = e;
            var n = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: null,
              lastRenderedState: null,
            };
            return (
              (t.queue = n),
              (t = zs.bind(null, P, !0, n)),
              (n.dispatch = t),
              [e, t]
            );
          },
          useMemoCache: Bo,
          useCacheRefresh: function () {
            return (Fo().memoizedState = Fs.bind(null, P));
          },
          useEffectEvent: function (e) {
            var t = Fo(),
              n = { impl: e };
            return (
              (t.memoizedState = n),
              function () {
                if (K & 2) throw Error(i(440));
                return n.impl.apply(void 0, arguments);
              }
            );
          },
        },
        Gs = {
          readContext: fa,
          use: zo,
          useCallback: Cs,
          useContext: fa,
          useEffect: hs,
          useImperativeHandle: xs,
          useInsertionEffect: vs,
          useLayoutEffect: ys,
          useMemo: ws,
          useReducer: Ho,
          useRef: ds,
          useState: function () {
            return Ho(Vo);
          },
          useDebugValue: Ss,
          useDeferredValue: function (e, t) {
            return Es(Io(), F.memoizedState, e, t);
          },
          useTransition: function () {
            var e = Ho(Vo)[0],
              t = Io().memoizedState;
            return [typeof e == `boolean` ? e : Ro(e), t];
          },
          useSyncExternalStore: Go,
          useId: Ns,
          useHostTransitionStatus: Ms,
          useFormState: os,
          useActionState: os,
          useOptimistic: function (e, t) {
            return Zo(Io(), F, e, t);
          },
          useMemoCache: Bo,
          useCacheRefresh: Ps,
        };
      Gs.useEffectEvent = _s;
      var Ks = {
        readContext: fa,
        use: zo,
        useCallback: Cs,
        useContext: fa,
        useEffect: hs,
        useImperativeHandle: xs,
        useInsertionEffect: vs,
        useLayoutEffect: ys,
        useMemo: ws,
        useReducer: Wo,
        useRef: ds,
        useState: function () {
          return Wo(Vo);
        },
        useDebugValue: Ss,
        useDeferredValue: function (e, t) {
          var n = Io();
          return F === null ? Ts(n, e, t) : Es(n, F.memoizedState, e, t);
        },
        useTransition: function () {
          var e = Wo(Vo)[0],
            t = Io().memoizedState;
          return [typeof e == `boolean` ? e : Ro(e), t];
        },
        useSyncExternalStore: Go,
        useId: Ns,
        useHostTransitionStatus: Ms,
        useFormState: ls,
        useActionState: ls,
        useOptimistic: function (e, t) {
          var n = Io();
          return F === null
            ? ((n.baseState = e), [e, n.queue.dispatch])
            : Zo(n, F, e, t);
        },
        useMemoCache: Bo,
        useCacheRefresh: Ps,
      };
      Ks.useEffectEvent = _s;
      function qs(e, t, n, r) {
        ((t = e.memoizedState),
          (n = n(r, t)),
          (n = n == null ? t : h({}, t, n)),
          (e.memoizedState = n),
          e.lanes === 0 && (e.updateQueue.baseState = n));
      }
      var Js = {
        enqueueSetState: function (e, t, n) {
          e = e._reactInternals;
          var r = pu(),
            i = $a(r);
          ((i.payload = t),
            n != null && (i.callback = n),
            (t = eo(e, i, r)),
            t !== null && (hu(t, e, r), to(t, e, r)));
        },
        enqueueReplaceState: function (e, t, n) {
          e = e._reactInternals;
          var r = pu(),
            i = $a(r);
          ((i.tag = 1),
            (i.payload = t),
            n != null && (i.callback = n),
            (t = eo(e, i, r)),
            t !== null && (hu(t, e, r), to(t, e, r)));
        },
        enqueueForceUpdate: function (e, t) {
          e = e._reactInternals;
          var n = pu(),
            r = $a(n);
          ((r.tag = 2),
            t != null && (r.callback = t),
            (t = eo(e, r, n)),
            t !== null && (hu(t, e, n), to(t, e, n)));
        },
      };
      function Ys(e, t, n, r, i, a, o) {
        return (
          (e = e.stateNode),
          typeof e.shouldComponentUpdate == `function`
            ? e.shouldComponentUpdate(r, a, o)
            : t.prototype && t.prototype.isPureReactComponent
              ? !Fr(n, r) || !Fr(i, a)
              : !0
        );
      }
      function Xs(e, t, n, r) {
        ((e = t.state),
          typeof t.componentWillReceiveProps == `function` &&
            t.componentWillReceiveProps(n, r),
          typeof t.UNSAFE_componentWillReceiveProps == `function` &&
            t.UNSAFE_componentWillReceiveProps(n, r),
          t.state !== e && Js.enqueueReplaceState(t, t.state, null));
      }
      function Zs(e, t) {
        var n = t;
        if (`ref` in t)
          for (var r in ((n = {}), t)) r !== `ref` && (n[r] = t[r]);
        if ((e = e.defaultProps))
          for (var i in (n === t && (n = h({}, n)), e))
            n[i] === void 0 && (n[i] = e[i]);
        return n;
      }
      function Qs(e) {
        ci(e);
      }
      function $s(e) {
        console.error(e);
      }
      function ec(e) {
        ci(e);
      }
      function tc(e, t) {
        try {
          var n = e.onUncaughtError;
          n(t.value, { componentStack: t.stack });
        } catch (e) {
          setTimeout(function () {
            throw e;
          });
        }
      }
      function nc(e, t, n) {
        try {
          var r = e.onCaughtError;
          r(n.value, {
            componentStack: n.stack,
            errorBoundary: t.tag === 1 ? t.stateNode : null,
          });
        } catch (e) {
          setTimeout(function () {
            throw e;
          });
        }
      }
      function rc(e, t, n) {
        return (
          (n = $a(n)),
          (n.tag = 3),
          (n.payload = { element: null }),
          (n.callback = function () {
            tc(e, t);
          }),
          n
        );
      }
      function ic(e) {
        return ((e = $a(e)), (e.tag = 3), e);
      }
      function ac(e, t, n, r) {
        var i = n.type.getDerivedStateFromError;
        if (typeof i == `function`) {
          var a = r.value;
          ((e.payload = function () {
            return i(a);
          }),
            (e.callback = function () {
              nc(t, n, r);
            }));
        }
        var o = n.stateNode;
        o !== null &&
          typeof o.componentDidCatch == `function` &&
          (e.callback = function () {
            (nc(t, n, r),
              typeof i != `function` &&
                (ru === null ? (ru = new Set([this])) : ru.add(this)));
            var e = r.stack;
            this.componentDidCatch(r.value, {
              componentStack: e === null ? `` : e,
            });
          });
      }
      function oc(e, t, n, r, a) {
        if (
          ((n.flags |= 32768),
          typeof r == `object` && r && typeof r.then == `function`)
        ) {
          if (
            ((t = n.alternate),
            t !== null && la(t, n, a, !0),
            (n = M.current),
            n !== null)
          ) {
            switch (n.tag) {
              case 31:
              case 13:
                return (
                  fo === null
                    ? Du()
                    : n.alternate === null && Wl === 0 && (Wl = 3),
                  (n.flags &= -257),
                  (n.flags |= 65536),
                  (n.lanes = a),
                  r === Fa
                    ? (n.flags |= 16384)
                    : ((t = n.updateQueue),
                      t === null ? (n.updateQueue = new Set([r])) : t.add(r),
                      Gu(e, r, a)),
                  !1
                );
              case 22:
                return (
                  (n.flags |= 65536),
                  r === Fa
                    ? (n.flags |= 16384)
                    : ((t = n.updateQueue),
                      t === null
                        ? ((t = {
                            transitions: null,
                            markerInstances: null,
                            retryQueue: new Set([r]),
                          }),
                          (n.updateQueue = t))
                        : ((n = t.retryQueue),
                          n === null
                            ? (t.retryQueue = new Set([r]))
                            : n.add(r)),
                      Gu(e, r, a)),
                  !1
                );
            }
            throw Error(i(435, n.tag));
          }
          return (Gu(e, r, a), Du(), !1);
        }
        if (D)
          return (
            (t = M.current),
            t === null
              ? (r !== Yi && ((t = Error(i(423), { cause: r })), na(Ai(t, n))),
                (e = e.current.alternate),
                (e.flags |= 65536),
                (a &= -a),
                (e.lanes |= a),
                (r = Ai(r, n)),
                (a = rc(e.stateNode, r, a)),
                no(e, a),
                Wl !== 4 && (Wl = 2))
              : (!(t.flags & 65536) && (t.flags |= 256),
                (t.flags |= 65536),
                (t.lanes = a),
                r !== Yi && ((e = Error(i(422), { cause: r })), na(Ai(e, n)))),
            !1
          );
        var o = Error(i(520), { cause: r });
        if (
          ((o = Ai(o, n)),
          Xl === null ? (Xl = [o]) : Xl.push(o),
          Wl !== 4 && (Wl = 2),
          t === null)
        )
          return !0;
        ((r = Ai(r, n)), (n = t));
        do {
          switch (n.tag) {
            case 3:
              return (
                (n.flags |= 65536),
                (e = a & -a),
                (n.lanes |= e),
                (e = rc(n.stateNode, r, e)),
                no(n, e),
                !1
              );
            case 1:
              if (
                ((t = n.type),
                (o = n.stateNode),
                !(n.flags & 128) &&
                  (typeof t.getDerivedStateFromError == `function` ||
                    (o !== null &&
                      typeof o.componentDidCatch == `function` &&
                      (ru === null || !ru.has(o)))))
              )
                return (
                  (n.flags |= 65536),
                  (a &= -a),
                  (n.lanes |= a),
                  (a = ic(a)),
                  ac(a, e, n, r),
                  no(n, a),
                  !1
                );
          }
          n = n.return;
        } while (n !== null);
        return !1;
      }
      var sc = Error(i(461)),
        cc = !1;
      function lc(e, t, n, r) {
        t.child = e === null ? Ya(t, null, n, r) : Ja(t, e.child, n, r);
      }
      function uc(e, t, n, r, i) {
        n = n.render;
        var a = t.ref;
        if (`ref` in r) {
          var o = {};
          for (var s in r) s !== `ref` && (o[s] = r[s]);
        } else o = r;
        return (
          da(t),
          (r = Oo(e, t, n, o, a, i)),
          (s = Mo()),
          e !== null && !cc
            ? (No(e, t, i), Pc(e, t, i))
            : (D && s && Hi(t), (t.flags |= 1), lc(e, t, r, i), t.child)
        );
      }
      function dc(e, t, n, r, i) {
        if (e === null) {
          var a = n.type;
          return typeof a == `function` &&
            !xi(a) &&
            a.defaultProps === void 0 &&
            n.compare === null
            ? ((t.tag = 15), (t.type = a), fc(e, t, a, r, i))
            : ((e = wi(n.type, null, r, t, t.mode, i)),
              (e.ref = t.ref),
              (e.return = t),
              (t.child = e));
        }
        if (((a = e.child), !Fc(e, i))) {
          var o = a.memoizedProps;
          if (
            ((n = n.compare),
            (n = n === null ? Fr : n),
            n(o, r) && e.ref === t.ref)
          )
            return Pc(e, t, i);
        }
        return (
          (t.flags |= 1),
          (e = Si(a, r)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e)
        );
      }
      function fc(e, t, n, r, i) {
        if (e !== null) {
          var a = e.memoizedProps;
          if (Fr(a, r) && e.ref === t.ref) {
            if (((cc = !1), (t.pendingProps = r = a), Fc(e, i)))
              e.flags & 131072 && (cc = !0);
            else return ((t.lanes = e.lanes), Pc(e, t, i));
          }
        }
        return bc(e, t, n, r, i);
      }
      function pc(e, t, n, r) {
        var i = r.children,
          a = e === null ? null : e.memoizedState;
        if (
          (e === null &&
            t.stateNode === null &&
            (t.stateNode = {
              _visibility: 1,
              _pendingMarkers: null,
              _retryCache: null,
              _transitions: null,
            }),
          r.mode === `hidden`)
        ) {
          if (t.flags & 128) {
            if (((a = a === null ? n : a.baseLanes | n), e !== null)) {
              for (r = t.child = e.child, i = 0; r !== null; )
                ((i = i | r.lanes | r.childLanes), (r = r.sibling));
              r = i & ~a;
            } else ((r = 0), (t.child = null));
            return hc(e, t, a, n, r);
          }
          if (n & 536870912)
            ((t.memoizedState = { baseLanes: 0, cachePool: null }),
              e !== null && ja(t, a === null ? null : a.cachePool),
              a === null ? j() : A(t, a),
              N(t));
          else
            return (
              (r = t.lanes = 536870912),
              hc(e, t, a === null ? n : a.baseLanes | n, n, r)
            );
        } else
          a === null
            ? (e !== null && ja(t, null), j(), ho(t))
            : (ja(t, a.cachePool), A(t, a), ho(t), (t.memoizedState = null));
        return (lc(e, t, i, n), t.child);
      }
      function mc(e, t) {
        return (
          (e !== null && e.tag === 22) ||
            t.stateNode !== null ||
            (t.stateNode = {
              _visibility: 1,
              _pendingMarkers: null,
              _retryCache: null,
              _transitions: null,
            }),
          t.sibling
        );
      }
      function hc(e, t, n, r, i) {
        var a = Aa();
        return (
          (a = a === null ? null : { parent: va._currentValue, pool: a }),
          (t.memoizedState = { baseLanes: n, cachePool: a }),
          e !== null && ja(t, null),
          j(),
          N(t),
          e !== null && la(e, t, r, !0),
          (t.childLanes = i),
          null
        );
      }
      function gc(e, t) {
        return (
          (t = kc({ mode: t.mode, children: t.children }, e.mode)),
          (t.ref = e.ref),
          (e.child = t),
          (t.return = e),
          t
        );
      }
      function _c(e, t, n) {
        return (
          Ja(t, e.child, null, n),
          (e = gc(t, t.pendingProps)),
          (e.flags |= 2),
          go(t),
          (t.memoizedState = null),
          e
        );
      }
      function vc(e, t, n) {
        var r = t.pendingProps,
          a = !!(t.flags & 128);
        if (((t.flags &= -129), e === null)) {
          if (D) {
            if (r.mode === `hidden`)
              return ((e = gc(t, r)), (t.lanes = 536870912), mc(null, e));
            if (
              (mo(t),
              (e = Ki)
                ? ((e = rf(e, Ji)),
                  (e = e !== null && e.data === `&` ? e : null),
                  e !== null &&
                    ((t.memoizedState = {
                      dehydrated: e,
                      treeContext:
                        Li === null ? null : { id: Ri, overflow: zi },
                      retryLane: 536870912,
                      hydrationErrors: null,
                    }),
                    (n = Di(e)),
                    (n.return = t),
                    (t.child = n),
                    (Gi = t),
                    (Ki = null)))
                : (e = null),
              e === null)
            )
              throw Xi(t);
            return ((t.lanes = 536870912), null);
          }
          return gc(t, r);
        }
        var o = e.memoizedState;
        if (o !== null) {
          var s = o.dehydrated;
          if ((mo(t), a)) {
            if (t.flags & 256) ((t.flags &= -257), (t = _c(e, t, n)));
            else if (t.memoizedState !== null)
              ((t.child = e.child), (t.flags |= 128), (t = null));
            else throw Error(i(558));
          } else if (
            (cc || la(e, t, n, !1), (a = (n & e.childLanes) !== 0), cc || a)
          ) {
            if (
              ((r = q),
              r !== null && ((s = ft(r, n)), s !== 0 && s !== o.retryLane))
            )
              throw ((o.retryLane = s), hi(e, s), hu(r, e, s), sc);
            (Du(), (t = _c(e, t, n)));
          } else
            ((e = o.treeContext),
              (Ki = cf(s.nextSibling)),
              (Gi = t),
              (D = !0),
              (qi = null),
              (Ji = !1),
              e !== null && Wi(t, e),
              (t = gc(t, r)),
              (t.flags |= 4096));
          return t;
        }
        return (
          (e = Si(e.child, { mode: r.mode, children: r.children })),
          (e.ref = t.ref),
          (t.child = e),
          (e.return = t),
          e
        );
      }
      function yc(e, t) {
        var n = t.ref;
        if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
        else {
          if (typeof n != `function` && typeof n != `object`)
            throw Error(i(284));
          (e === null || e.ref !== n) && (t.flags |= 4194816);
        }
      }
      function bc(e, t, n, r, i) {
        return (
          da(t),
          (n = Oo(e, t, n, r, void 0, i)),
          (r = Mo()),
          e !== null && !cc
            ? (No(e, t, i), Pc(e, t, i))
            : (D && r && Hi(t), (t.flags |= 1), lc(e, t, n, i), t.child)
        );
      }
      function xc(e, t, n, r, i, a) {
        return (
          da(t),
          (t.updateQueue = null),
          (n = Ao(t, r, n, i)),
          ko(e),
          (r = Mo()),
          e !== null && !cc
            ? (No(e, t, a), Pc(e, t, a))
            : (D && r && Hi(t), (t.flags |= 1), lc(e, t, n, a), t.child)
        );
      }
      function Sc(e, t, n, r, i) {
        if ((da(t), t.stateNode === null)) {
          var a = vi,
            o = n.contextType;
          (typeof o == `object` && o && (a = fa(o)),
            (a = new n(r, a)),
            (t.memoizedState =
              a.state !== null && a.state !== void 0 ? a.state : null),
            (a.updater = Js),
            (t.stateNode = a),
            (a._reactInternals = t),
            (a = t.stateNode),
            (a.props = r),
            (a.state = t.memoizedState),
            (a.refs = {}),
            Za(t),
            (o = n.contextType),
            (a.context = typeof o == `object` && o ? fa(o) : vi),
            (a.state = t.memoizedState),
            (o = n.getDerivedStateFromProps),
            typeof o == `function` &&
              (qs(t, n, o, r), (a.state = t.memoizedState)),
            typeof n.getDerivedStateFromProps == `function` ||
              typeof a.getSnapshotBeforeUpdate == `function` ||
              (typeof a.UNSAFE_componentWillMount != `function` &&
                typeof a.componentWillMount != `function`) ||
              ((o = a.state),
              typeof a.componentWillMount == `function` &&
                a.componentWillMount(),
              typeof a.UNSAFE_componentWillMount == `function` &&
                a.UNSAFE_componentWillMount(),
              o !== a.state && Js.enqueueReplaceState(a, a.state, null),
              ao(t, r, a, i),
              io(),
              (a.state = t.memoizedState)),
            typeof a.componentDidMount == `function` && (t.flags |= 4194308),
            (r = !0));
        } else if (e === null) {
          a = t.stateNode;
          var s = t.memoizedProps,
            c = Zs(n, s);
          a.props = c;
          var l = a.context,
            u = n.contextType;
          ((o = vi), typeof u == `object` && u && (o = fa(u)));
          var d = n.getDerivedStateFromProps;
          ((u =
            typeof d == `function` ||
            typeof a.getSnapshotBeforeUpdate == `function`),
            (s = t.pendingProps !== s),
            u ||
              (typeof a.UNSAFE_componentWillReceiveProps != `function` &&
                typeof a.componentWillReceiveProps != `function`) ||
              ((s || l !== o) && Xs(t, a, r, o)),
            (Xa = !1));
          var f = t.memoizedState;
          ((a.state = f),
            ao(t, r, a, i),
            io(),
            (l = t.memoizedState),
            s || f !== l || Xa
              ? (typeof d == `function` &&
                  (qs(t, n, d, r), (l = t.memoizedState)),
                (c = Xa || Ys(t, n, c, r, f, l, o))
                  ? (u ||
                      (typeof a.UNSAFE_componentWillMount != `function` &&
                        typeof a.componentWillMount != `function`) ||
                      (typeof a.componentWillMount == `function` &&
                        a.componentWillMount(),
                      typeof a.UNSAFE_componentWillMount == `function` &&
                        a.UNSAFE_componentWillMount()),
                    typeof a.componentDidMount == `function` &&
                      (t.flags |= 4194308))
                  : (typeof a.componentDidMount == `function` &&
                      (t.flags |= 4194308),
                    (t.memoizedProps = r),
                    (t.memoizedState = l)),
                (a.props = r),
                (a.state = l),
                (a.context = o),
                (r = c))
              : (typeof a.componentDidMount == `function` &&
                  (t.flags |= 4194308),
                (r = !1)));
        } else {
          ((a = t.stateNode),
            Qa(e, t),
            (o = t.memoizedProps),
            (u = Zs(n, o)),
            (a.props = u),
            (d = t.pendingProps),
            (f = a.context),
            (l = n.contextType),
            (c = vi),
            typeof l == `object` && l && (c = fa(l)),
            (s = n.getDerivedStateFromProps),
            (l =
              typeof s == `function` ||
              typeof a.getSnapshotBeforeUpdate == `function`) ||
              (typeof a.UNSAFE_componentWillReceiveProps != `function` &&
                typeof a.componentWillReceiveProps != `function`) ||
              ((o !== d || f !== c) && Xs(t, a, r, c)),
            (Xa = !1),
            (f = t.memoizedState),
            (a.state = f),
            ao(t, r, a, i),
            io());
          var p = t.memoizedState;
          o !== d ||
          f !== p ||
          Xa ||
          (e !== null && e.dependencies !== null && ua(e.dependencies))
            ? (typeof s == `function` &&
                (qs(t, n, s, r), (p = t.memoizedState)),
              (u =
                Xa ||
                Ys(t, n, u, r, f, p, c) ||
                (e !== null && e.dependencies !== null && ua(e.dependencies)))
                ? (l ||
                    (typeof a.UNSAFE_componentWillUpdate != `function` &&
                      typeof a.componentWillUpdate != `function`) ||
                    (typeof a.componentWillUpdate == `function` &&
                      a.componentWillUpdate(r, p, c),
                    typeof a.UNSAFE_componentWillUpdate == `function` &&
                      a.UNSAFE_componentWillUpdate(r, p, c)),
                  typeof a.componentDidUpdate == `function` && (t.flags |= 4),
                  typeof a.getSnapshotBeforeUpdate == `function` &&
                    (t.flags |= 1024))
                : (typeof a.componentDidUpdate != `function` ||
                    (o === e.memoizedProps && f === e.memoizedState) ||
                    (t.flags |= 4),
                  typeof a.getSnapshotBeforeUpdate != `function` ||
                    (o === e.memoizedProps && f === e.memoizedState) ||
                    (t.flags |= 1024),
                  (t.memoizedProps = r),
                  (t.memoizedState = p)),
              (a.props = r),
              (a.state = p),
              (a.context = c),
              (r = u))
            : (typeof a.componentDidUpdate != `function` ||
                (o === e.memoizedProps && f === e.memoizedState) ||
                (t.flags |= 4),
              typeof a.getSnapshotBeforeUpdate != `function` ||
                (o === e.memoizedProps && f === e.memoizedState) ||
                (t.flags |= 1024),
              (r = !1));
        }
        return (
          (a = r),
          yc(e, t),
          (r = !!(t.flags & 128)),
          a || r
            ? ((a = t.stateNode),
              (n =
                r && typeof n.getDerivedStateFromError != `function`
                  ? null
                  : a.render()),
              (t.flags |= 1),
              e !== null && r
                ? ((t.child = Ja(t, e.child, null, i)),
                  (t.child = Ja(t, null, n, i)))
                : lc(e, t, n, i),
              (t.memoizedState = a.state),
              (e = t.child))
            : (e = Pc(e, t, i)),
          e
        );
      }
      function Cc(e, t, n, r) {
        return (ea(), (t.flags |= 256), lc(e, t, n, r), t.child);
      }
      var wc = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null,
      };
      function Tc(e) {
        return { baseLanes: e, cachePool: Ma() };
      }
      function Ec(e, t, n) {
        return ((e = e === null ? 0 : e.childLanes & ~n), t && (e |= Jl), e);
      }
      function Dc(e, t, n) {
        var r = t.pendingProps,
          a = !1,
          o = !!(t.flags & 128),
          s;
        if (
          ((s = o) ||
            (s =
              e !== null && e.memoizedState === null ? !1 : !!(_o.current & 2)),
          s && ((a = !0), (t.flags &= -129)),
          (s = !!(t.flags & 32)),
          (t.flags &= -33),
          e === null)
        ) {
          if (D) {
            if (
              (a ? po(t) : ho(t),
              (e = Ki)
                ? ((e = rf(e, Ji)),
                  (e = e !== null && e.data !== `&` ? e : null),
                  e !== null &&
                    ((t.memoizedState = {
                      dehydrated: e,
                      treeContext:
                        Li === null ? null : { id: Ri, overflow: zi },
                      retryLane: 536870912,
                      hydrationErrors: null,
                    }),
                    (n = Di(e)),
                    (n.return = t),
                    (t.child = n),
                    (Gi = t),
                    (Ki = null)))
                : (e = null),
              e === null)
            )
              throw Xi(t);
            return (of(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
          }
          var c = r.children;
          return (
            (r = r.fallback),
            a
              ? (ho(t),
                (a = t.mode),
                (c = kc({ mode: `hidden`, children: c }, a)),
                (r = Ti(r, a, n, null)),
                (c.return = t),
                (r.return = t),
                (c.sibling = r),
                (t.child = c),
                (r = t.child),
                (r.memoizedState = Tc(n)),
                (r.childLanes = Ec(e, s, n)),
                (t.memoizedState = wc),
                mc(null, r))
              : (po(t), Oc(t, c))
          );
        }
        var l = e.memoizedState;
        if (l !== null && ((c = l.dehydrated), c !== null)) {
          if (o)
            t.flags & 256
              ? (po(t), (t.flags &= -257), (t = Ac(e, t, n)))
              : t.memoizedState === null
                ? (ho(t),
                  (c = r.fallback),
                  (a = t.mode),
                  (r = kc({ mode: `visible`, children: r.children }, a)),
                  (c = Ti(c, a, n, null)),
                  (c.flags |= 2),
                  (r.return = t),
                  (c.return = t),
                  (r.sibling = c),
                  (t.child = r),
                  Ja(t, e.child, null, n),
                  (r = t.child),
                  (r.memoizedState = Tc(n)),
                  (r.childLanes = Ec(e, s, n)),
                  (t.memoizedState = wc),
                  (t = mc(null, r)))
                : (ho(t), (t.child = e.child), (t.flags |= 128), (t = null));
          else if ((po(t), of(c))) {
            if (((s = c.nextSibling && c.nextSibling.dataset), s))
              var u = s.dgst;
            ((s = u),
              (r = Error(i(419))),
              (r.stack = ``),
              (r.digest = s),
              na({ value: r, source: null, stack: null }),
              (t = Ac(e, t, n)));
          } else if (
            (cc || la(e, t, n, !1), (s = (n & e.childLanes) !== 0), cc || s)
          ) {
            if (
              ((s = q),
              s !== null && ((r = ft(s, n)), r !== 0 && r !== l.retryLane))
            )
              throw ((l.retryLane = r), hi(e, r), hu(s, e, r), sc);
            (af(c) || Du(), (t = Ac(e, t, n)));
          } else
            af(c)
              ? ((t.flags |= 192), (t.child = e.child), (t = null))
              : ((e = l.treeContext),
                (Ki = cf(c.nextSibling)),
                (Gi = t),
                (D = !0),
                (qi = null),
                (Ji = !1),
                e !== null && Wi(t, e),
                (t = Oc(t, r.children)),
                (t.flags |= 4096));
          return t;
        }
        return a
          ? (ho(t),
            (c = r.fallback),
            (a = t.mode),
            (l = e.child),
            (u = l.sibling),
            (r = Si(l, { mode: `hidden`, children: r.children })),
            (r.subtreeFlags = l.subtreeFlags & 65011712),
            u === null
              ? ((c = Ti(c, a, n, null)), (c.flags |= 2))
              : (c = Si(u, c)),
            (c.return = t),
            (r.return = t),
            (r.sibling = c),
            (t.child = r),
            mc(null, r),
            (r = t.child),
            (c = e.child.memoizedState),
            c === null
              ? (c = Tc(n))
              : ((a = c.cachePool),
                a === null
                  ? (a = Ma())
                  : ((l = va._currentValue),
                    (a = a.parent === l ? a : { parent: l, pool: l })),
                (c = { baseLanes: c.baseLanes | n, cachePool: a })),
            (r.memoizedState = c),
            (r.childLanes = Ec(e, s, n)),
            (t.memoizedState = wc),
            mc(e.child, r))
          : (po(t),
            (n = e.child),
            (e = n.sibling),
            (n = Si(n, { mode: `visible`, children: r.children })),
            (n.return = t),
            (n.sibling = null),
            e !== null &&
              ((s = t.deletions),
              s === null ? ((t.deletions = [e]), (t.flags |= 16)) : s.push(e)),
            (t.child = n),
            (t.memoizedState = null),
            n);
      }
      function Oc(e, t) {
        return (
          (t = kc({ mode: `visible`, children: t }, e.mode)),
          (t.return = e),
          (e.child = t)
        );
      }
      function kc(e, t) {
        return ((e = bi(22, e, null, t)), (e.lanes = 0), e);
      }
      function Ac(e, t, n) {
        return (
          Ja(t, e.child, null, n),
          (e = Oc(t, t.pendingProps.children)),
          (e.flags |= 2),
          (t.memoizedState = null),
          e
        );
      }
      function jc(e, t, n) {
        e.lanes |= t;
        var r = e.alternate;
        (r !== null && (r.lanes |= t), sa(e.return, t, n));
      }
      function Mc(e, t, n, r, i, a) {
        var o = e.memoizedState;
        o === null
          ? (e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailMode: i,
              treeForkCount: a,
            })
          : ((o.isBackwards = t),
            (o.rendering = null),
            (o.renderingStartTime = 0),
            (o.last = r),
            (o.tail = n),
            (o.tailMode = i),
            (o.treeForkCount = a));
      }
      function Nc(e, t, n) {
        var r = t.pendingProps,
          i = r.revealOrder,
          a = r.tail;
        r = r.children;
        var o = _o.current,
          s = !!(o & 2);
        if (
          (s ? ((o = (o & 1) | 2), (t.flags |= 128)) : (o &= 1),
          E(_o, o),
          lc(e, t, r, n),
          (r = D ? Pi : 0),
          !s && e !== null && e.flags & 128)
        )
          a: for (e = t.child; e !== null; ) {
            if (e.tag === 13) e.memoizedState !== null && jc(e, n, t);
            else if (e.tag === 19) jc(e, n, t);
            else if (e.child !== null) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break a;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break a;
              e = e.return;
            }
            ((e.sibling.return = e.return), (e = e.sibling));
          }
        switch (i) {
          case `forwards`:
            for (n = t.child, i = null; n !== null; )
              ((e = n.alternate),
                e !== null && vo(e) === null && (i = n),
                (n = n.sibling));
            ((n = i),
              n === null
                ? ((i = t.child), (t.child = null))
                : ((i = n.sibling), (n.sibling = null)),
              Mc(t, !1, i, n, a, r));
            break;
          case `backwards`:
          case `unstable_legacy-backwards`:
            for (n = null, i = t.child, t.child = null; i !== null; ) {
              if (((e = i.alternate), e !== null && vo(e) === null)) {
                t.child = i;
                break;
              }
              ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
            }
            Mc(t, !0, n, null, a, r);
            break;
          case `together`:
            Mc(t, !1, null, null, void 0, r);
            break;
          default:
            t.memoizedState = null;
        }
        return t.child;
      }
      function Pc(e, t, n) {
        if (
          (e !== null && (t.dependencies = e.dependencies),
          (Gl |= t.lanes),
          (n & t.childLanes) === 0)
        ) {
          if (e !== null) {
            if ((la(e, t, n, !1), (n & t.childLanes) === 0)) return null;
          } else return null;
        }
        if (e !== null && t.child !== e.child) throw Error(i(153));
        if (t.child !== null) {
          for (
            e = t.child, n = Si(e, e.pendingProps), t.child = n, n.return = t;
            e.sibling !== null;
          )
            ((e = e.sibling),
              (n = n.sibling = Si(e, e.pendingProps)),
              (n.return = t));
          n.sibling = null;
        }
        return t.child;
      }
      function Fc(e, t) {
        return (
          (e.lanes & t) !== 0 || ((e = e.dependencies), !!(e !== null && ua(e)))
        );
      }
      function Ic(e, t, n) {
        switch (t.tag) {
          case 3:
            (xe(t, t.stateNode.containerInfo),
              oa(t, va, e.memoizedState.cache),
              ea());
            break;
          case 27:
          case 5:
            Ce(t);
            break;
          case 4:
            xe(t, t.stateNode.containerInfo);
            break;
          case 10:
            oa(t, t.type, t.memoizedProps.value);
            break;
          case 31:
            if (t.memoizedState !== null)
              return ((t.flags |= 128), mo(t), null);
            break;
          case 13:
            var r = t.memoizedState;
            if (r !== null)
              return r.dehydrated === null
                ? (n & t.child.childLanes) === 0
                  ? (po(t), (e = Pc(e, t, n)), e === null ? null : e.sibling)
                  : Dc(e, t, n)
                : (po(t), (t.flags |= 128), null);
            po(t);
            break;
          case 19:
            var i = !!(e.flags & 128);
            if (
              ((r = (n & t.childLanes) !== 0),
              (r ||= (la(e, t, n, !1), (n & t.childLanes) !== 0)),
              i)
            ) {
              if (r) return Nc(e, t, n);
              t.flags |= 128;
            }
            if (
              ((i = t.memoizedState),
              i !== null &&
                ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
              E(_o, _o.current),
              r)
            )
              break;
            return null;
          case 22:
            return ((t.lanes = 0), pc(e, t, n, t.pendingProps));
          case 24:
            oa(t, va, e.memoizedState.cache);
        }
        return Pc(e, t, n);
      }
      function Lc(e, t, n) {
        if (e !== null) {
          if (e.memoizedProps !== t.pendingProps) cc = !0;
          else {
            if (!Fc(e, n) && !(t.flags & 128)) return ((cc = !1), Ic(e, t, n));
            cc = !!(e.flags & 131072);
          }
        } else ((cc = !1), D && t.flags & 1048576 && Vi(t, Pi, t.index));
        switch (((t.lanes = 0), t.tag)) {
          case 16:
            a: {
              var r = t.pendingProps;
              if (
                ((e = Ra(t.elementType)), (t.type = e), typeof e == `function`)
              )
                xi(e)
                  ? ((r = Zs(e, r)), (t.tag = 1), (t = Sc(null, t, e, r, n)))
                  : ((t.tag = 0), (t = bc(null, t, e, r, n)));
              else {
                if (e != null) {
                  var a = e.$$typeof;
                  if (a === C) {
                    ((t.tag = 11), (t = uc(null, t, e, r, n)));
                    break a;
                  }
                  if (a === re) {
                    ((t.tag = 14), (t = dc(null, t, e, r, n)));
                    break a;
                  }
                }
                throw ((t = ue(e) || e), Error(i(306, t, ``)));
              }
            }
            return t;
          case 0:
            return bc(e, t, t.type, t.pendingProps, n);
          case 1:
            return (
              (r = t.type),
              (a = Zs(r, t.pendingProps)),
              Sc(e, t, r, a, n)
            );
          case 3:
            a: {
              if ((xe(t, t.stateNode.containerInfo), e === null))
                throw Error(i(387));
              r = t.pendingProps;
              var o = t.memoizedState;
              ((a = o.element), Qa(e, t), ao(t, r, null, n));
              var s = t.memoizedState;
              if (
                ((r = s.cache),
                oa(t, va, r),
                r !== o.cache && ca(t, [va], n, !0),
                io(),
                (r = s.element),
                o.isDehydrated)
              ) {
                if (
                  ((o = { element: r, isDehydrated: !1, cache: s.cache }),
                  (t.updateQueue.baseState = o),
                  (t.memoizedState = o),
                  t.flags & 256)
                ) {
                  t = Cc(e, t, r, n);
                  break a;
                }
                if (r !== a) {
                  ((a = Ai(Error(i(424)), t)), na(a), (t = Cc(e, t, r, n)));
                  break a;
                }
                switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                  case 9:
                    e = e.body;
                    break;
                  default:
                    e = e.nodeName === `HTML` ? e.ownerDocument.body : e;
                }
                for (
                  Ki = cf(e.firstChild),
                    Gi = t,
                    D = !0,
                    qi = null,
                    Ji = !0,
                    n = Ya(t, null, r, n),
                    t.child = n;
                  n;
                )
                  ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
              } else {
                if ((ea(), r === a)) {
                  t = Pc(e, t, n);
                  break a;
                }
                lc(e, t, r, n);
              }
              t = t.child;
            }
            return t;
          case 26:
            return (
              yc(e, t),
              e === null
                ? (n = kf(t.type, null, t.pendingProps, null))
                  ? (t.memoizedState = n)
                  : D ||
                    ((n = t.type),
                    (e = t.pendingProps),
                    (r = Bd(ye.current).createElement(n)),
                    (r[vt] = t),
                    (r[yt] = e),
                    Pd(r, n, e),
                    jt(r),
                    (t.stateNode = r))
                : (t.memoizedState = kf(
                    t.type,
                    e.memoizedProps,
                    t.pendingProps,
                    e.memoizedState,
                  )),
              null
            );
          case 27:
            return (
              Ce(t),
              e === null &&
                D &&
                ((r = t.stateNode = ff(t.type, t.pendingProps, ye.current)),
                (Gi = t),
                (Ji = !0),
                (a = Ki),
                Zd(t.type) ? ((lf = a), (Ki = cf(r.firstChild))) : (Ki = a)),
              lc(e, t, t.pendingProps.children, n),
              yc(e, t),
              e === null && (t.flags |= 4194304),
              t.child
            );
          case 5:
            return (
              e === null &&
                D &&
                ((a = r = Ki) &&
                  ((r = tf(r, t.type, t.pendingProps, Ji)),
                  r === null
                    ? (a = !1)
                    : ((t.stateNode = r),
                      (Gi = t),
                      (Ki = cf(r.firstChild)),
                      (Ji = !1),
                      (a = !0))),
                a || Xi(t)),
              Ce(t),
              (a = t.type),
              (o = t.pendingProps),
              (s = e === null ? null : e.memoizedProps),
              (r = o.children),
              Ud(a, o) ? (r = null) : s !== null && Ud(a, s) && (t.flags |= 32),
              t.memoizedState !== null &&
                ((a = Oo(e, t, jo, null, null, n)), (Qf._currentValue = a)),
              yc(e, t),
              lc(e, t, r, n),
              t.child
            );
          case 6:
            return (
              e === null &&
                D &&
                ((e = n = Ki) &&
                  ((n = nf(n, t.pendingProps, Ji)),
                  n === null
                    ? (e = !1)
                    : ((t.stateNode = n), (Gi = t), (Ki = null), (e = !0))),
                e || Xi(t)),
              null
            );
          case 13:
            return Dc(e, t, n);
          case 4:
            return (
              xe(t, t.stateNode.containerInfo),
              (r = t.pendingProps),
              e === null ? (t.child = Ja(t, null, r, n)) : lc(e, t, r, n),
              t.child
            );
          case 11:
            return uc(e, t, t.type, t.pendingProps, n);
          case 7:
            return (lc(e, t, t.pendingProps, n), t.child);
          case 8:
            return (lc(e, t, t.pendingProps.children, n), t.child);
          case 12:
            return (lc(e, t, t.pendingProps.children, n), t.child);
          case 10:
            return (
              (r = t.pendingProps),
              oa(t, t.type, r.value),
              lc(e, t, r.children, n),
              t.child
            );
          case 9:
            return (
              (a = t.type._context),
              (r = t.pendingProps.children),
              da(t),
              (a = fa(a)),
              (r = r(a)),
              (t.flags |= 1),
              lc(e, t, r, n),
              t.child
            );
          case 14:
            return dc(e, t, t.type, t.pendingProps, n);
          case 15:
            return fc(e, t, t.type, t.pendingProps, n);
          case 19:
            return Nc(e, t, n);
          case 31:
            return vc(e, t, n);
          case 22:
            return pc(e, t, n, t.pendingProps);
          case 24:
            return (
              da(t),
              (r = fa(va)),
              e === null
                ? ((a = Aa()),
                  a === null &&
                    ((a = q),
                    (o = ya()),
                    (a.pooledCache = o),
                    o.refCount++,
                    o !== null && (a.pooledCacheLanes |= n),
                    (a = o)),
                  (t.memoizedState = { parent: r, cache: a }),
                  Za(t),
                  oa(t, va, a))
                : ((e.lanes & n) !== 0 &&
                    (Qa(e, t), ao(t, null, null, n), io()),
                  (a = e.memoizedState),
                  (o = t.memoizedState),
                  a.parent === r
                    ? ((r = o.cache),
                      oa(t, va, r),
                      r !== a.cache && ca(t, [va], n, !0))
                    : ((a = { parent: r, cache: r }),
                      (t.memoizedState = a),
                      t.lanes === 0 &&
                        (t.memoizedState = t.updateQueue.baseState = a),
                      oa(t, va, r))),
              lc(e, t, t.pendingProps.children, n),
              t.child
            );
          case 29:
            throw t.pendingProps;
        }
        throw Error(i(156, t.tag));
      }
      function Rc(e) {
        e.flags |= 4;
      }
      function zc(e, t, n, r, i) {
        if (((t = !!(e.mode & 32)) && (t = !1), t)) {
          if (((e.flags |= 16777216), (i & 335544128) === i)) {
            if (e.stateNode.complete) e.flags |= 8192;
            else if (wu()) e.flags |= 8192;
            else throw ((za = Fa), k);
          }
        } else e.flags &= -16777217;
      }
      function Bc(e, t) {
        if (t.type !== `stylesheet` || t.state.loading & 4)
          e.flags &= -16777217;
        else if (((e.flags |= 16777216), !Wf(t))) {
          if (wu()) e.flags |= 8192;
          else throw ((za = Fa), k);
        }
      }
      function Vc(e, t) {
        (t !== null && (e.flags |= 4),
          e.flags & 16384 &&
            ((t = e.tag === 22 ? 536870912 : ot()), (e.lanes |= t), (Yl |= t)));
      }
      function Hc(e, t) {
        if (!D)
          switch (e.tailMode) {
            case `hidden`:
              t = e.tail;
              for (var n = null; t !== null; )
                (t.alternate !== null && (n = t), (t = t.sibling));
              n === null ? (e.tail = null) : (n.sibling = null);
              break;
            case `collapsed`:
              n = e.tail;
              for (var r = null; n !== null; )
                (n.alternate !== null && (r = n), (n = n.sibling));
              r === null
                ? t || e.tail === null
                  ? (e.tail = null)
                  : (e.tail.sibling = null)
                : (r.sibling = null);
          }
      }
      function z(e) {
        var t = e.alternate !== null && e.alternate.child === e.child,
          n = 0,
          r = 0;
        if (t)
          for (var i = e.child; i !== null; )
            ((n |= i.lanes | i.childLanes),
              (r |= i.subtreeFlags & 65011712),
              (r |= i.flags & 65011712),
              (i.return = e),
              (i = i.sibling));
        else
          for (i = e.child; i !== null; )
            ((n |= i.lanes | i.childLanes),
              (r |= i.subtreeFlags),
              (r |= i.flags),
              (i.return = e),
              (i = i.sibling));
        return ((e.subtreeFlags |= r), (e.childLanes = n), t);
      }
      function Uc(e, t, n) {
        var r = t.pendingProps;
        switch ((Ui(t), t.tag)) {
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return (z(t), null);
          case 1:
            return (z(t), null);
          case 3:
            return (
              (n = t.stateNode),
              (r = null),
              e !== null && (r = e.memoizedState.cache),
              t.memoizedState.cache !== r && (t.flags |= 2048),
              O(va),
              Se(),
              n.pendingContext &&
                ((n.context = n.pendingContext), (n.pendingContext = null)),
              (e === null || e.child === null) &&
                ($i(t)
                  ? Rc(t)
                  : e === null ||
                    (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                    ((t.flags |= 1024), ta())),
              z(t),
              null
            );
          case 26:
            var a = t.type,
              o = t.memoizedState;
            return (
              e === null
                ? (Rc(t),
                  o === null ? (z(t), zc(t, a, null, r, n)) : (z(t), Bc(t, o)))
                : o
                  ? o === e.memoizedState
                    ? (z(t), (t.flags &= -16777217))
                    : (Rc(t), z(t), Bc(t, o))
                  : ((e = e.memoizedProps),
                    e !== r && Rc(t),
                    z(t),
                    zc(t, a, e, r, n)),
              null
            );
          case 27:
            if (
              (we(t),
              (n = ye.current),
              (a = t.type),
              e !== null && t.stateNode != null)
            )
              e.memoizedProps !== r && Rc(t);
            else {
              if (!r) {
                if (t.stateNode === null) throw Error(i(166));
                return (z(t), null);
              }
              ((e = _e.current),
                $i(t)
                  ? Zi(t, e)
                  : ((e = ff(a, r, n)), (t.stateNode = e), Rc(t)));
            }
            return (z(t), null);
          case 5:
            if ((we(t), (a = t.type), e !== null && t.stateNode != null))
              e.memoizedProps !== r && Rc(t);
            else {
              if (!r) {
                if (t.stateNode === null) throw Error(i(166));
                return (z(t), null);
              }
              if (((o = _e.current), $i(t))) Zi(t, o);
              else {
                var s = Bd(ye.current);
                switch (o) {
                  case 1:
                    o = s.createElementNS(`http://www.w3.org/2000/svg`, a);
                    break;
                  case 2:
                    o = s.createElementNS(
                      `http://www.w3.org/1998/Math/MathML`,
                      a,
                    );
                    break;
                  default:
                    switch (a) {
                      case `svg`:
                        o = s.createElementNS(`http://www.w3.org/2000/svg`, a);
                        break;
                      case `math`:
                        o = s.createElementNS(
                          `http://www.w3.org/1998/Math/MathML`,
                          a,
                        );
                        break;
                      case `script`:
                        ((o = s.createElement(`div`)),
                          (o.innerHTML = `<script><\/script>`),
                          (o = o.removeChild(o.firstChild)));
                        break;
                      case `select`:
                        ((o =
                          typeof r.is == `string`
                            ? s.createElement(`select`, { is: r.is })
                            : s.createElement(`select`)),
                          r.multiple
                            ? (o.multiple = !0)
                            : r.size && (o.size = r.size));
                        break;
                      default:
                        o =
                          typeof r.is == `string`
                            ? s.createElement(a, { is: r.is })
                            : s.createElement(a);
                    }
                }
                ((o[vt] = t), (o[yt] = r));
                a: for (s = t.child; s !== null; ) {
                  if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
                  else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                    ((s.child.return = s), (s = s.child));
                    continue;
                  }
                  if (s === t) break a;
                  for (; s.sibling === null; ) {
                    if (s.return === null || s.return === t) break a;
                    s = s.return;
                  }
                  ((s.sibling.return = s.return), (s = s.sibling));
                }
                t.stateNode = o;
                a: switch ((Pd(o, a, r), a)) {
                  case `button`:
                  case `input`:
                  case `select`:
                  case `textarea`:
                    r = !!r.autoFocus;
                    break a;
                  case `img`:
                    r = !0;
                    break a;
                  default:
                    r = !1;
                }
                r && Rc(t);
              }
            }
            return (
              z(t),
              zc(
                t,
                t.type,
                e === null ? null : e.memoizedProps,
                t.pendingProps,
                n,
              ),
              null
            );
          case 6:
            if (e && t.stateNode != null) e.memoizedProps !== r && Rc(t);
            else {
              if (typeof r != `string` && t.stateNode === null)
                throw Error(i(166));
              if (((e = ye.current), $i(t))) {
                if (
                  ((e = t.stateNode),
                  (n = t.memoizedProps),
                  (r = null),
                  (a = Gi),
                  a !== null)
                )
                  switch (a.tag) {
                    case 27:
                    case 5:
                      r = a.memoizedProps;
                  }
                ((e[vt] = t),
                  (e = !!(
                    e.nodeValue === n ||
                    (r !== null && !0 === r.suppressHydrationWarning) ||
                    Md(e.nodeValue, n)
                  )),
                  e || Xi(t, !0));
              } else
                ((e = Bd(e).createTextNode(r)), (e[vt] = t), (t.stateNode = e));
            }
            return (z(t), null);
          case 31:
            if (
              ((n = t.memoizedState), e === null || e.memoizedState !== null)
            ) {
              if (((r = $i(t)), n !== null)) {
                if (e === null) {
                  if (!r) throw Error(i(318));
                  if (
                    ((e = t.memoizedState),
                    (e = e === null ? null : e.dehydrated),
                    !e)
                  )
                    throw Error(i(557));
                  e[vt] = t;
                } else
                  (ea(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    (t.flags |= 4));
                (z(t), (e = !1));
              } else
                ((n = ta()),
                  e !== null &&
                    e.memoizedState !== null &&
                    (e.memoizedState.hydrationErrors = n),
                  (e = !0));
              if (!e) return t.flags & 256 ? (go(t), t) : (go(t), null);
              if (t.flags & 128) throw Error(i(558));
            }
            return (z(t), null);
          case 13:
            if (
              ((r = t.memoizedState),
              e === null ||
                (e.memoizedState !== null &&
                  e.memoizedState.dehydrated !== null))
            ) {
              if (((a = $i(t)), r !== null && r.dehydrated !== null)) {
                if (e === null) {
                  if (!a) throw Error(i(318));
                  if (
                    ((a = t.memoizedState),
                    (a = a === null ? null : a.dehydrated),
                    !a)
                  )
                    throw Error(i(317));
                  a[vt] = t;
                } else
                  (ea(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    (t.flags |= 4));
                (z(t), (a = !1));
              } else
                ((a = ta()),
                  e !== null &&
                    e.memoizedState !== null &&
                    (e.memoizedState.hydrationErrors = a),
                  (a = !0));
              if (!a) return t.flags & 256 ? (go(t), t) : (go(t), null);
            }
            return (
              go(t),
              t.flags & 128
                ? ((t.lanes = n), t)
                : ((n = r !== null),
                  (e = e !== null && e.memoizedState !== null),
                  n &&
                    ((r = t.child),
                    (a = null),
                    r.alternate !== null &&
                      r.alternate.memoizedState !== null &&
                      r.alternate.memoizedState.cachePool !== null &&
                      (a = r.alternate.memoizedState.cachePool.pool),
                    (o = null),
                    r.memoizedState !== null &&
                      r.memoizedState.cachePool !== null &&
                      (o = r.memoizedState.cachePool.pool),
                    o !== a && (r.flags |= 2048)),
                  n !== e && n && (t.child.flags |= 8192),
                  Vc(t, t.updateQueue),
                  z(t),
                  null)
            );
          case 4:
            return (
              Se(),
              e === null && Sd(t.stateNode.containerInfo),
              z(t),
              null
            );
          case 10:
            return (O(t.type), z(t), null);
          case 19:
            if ((ge(_o), (r = t.memoizedState), r === null))
              return (z(t), null);
            if (((a = !!(t.flags & 128)), (o = r.rendering), o === null)) {
              if (a) Hc(r, !1);
              else {
                if (Wl !== 0 || (e !== null && e.flags & 128))
                  for (e = t.child; e !== null; ) {
                    if (((o = vo(e)), o !== null)) {
                      for (
                        t.flags |= 128,
                          Hc(r, !1),
                          e = o.updateQueue,
                          t.updateQueue = e,
                          Vc(t, e),
                          t.subtreeFlags = 0,
                          e = n,
                          n = t.child;
                        n !== null;
                      )
                        (Ci(n, e), (n = n.sibling));
                      return (
                        E(_o, (_o.current & 1) | 2),
                        D && Bi(t, r.treeForkCount),
                        t.child
                      );
                    }
                    e = e.sibling;
                  }
                r.tail !== null &&
                  Le() > tu &&
                  ((t.flags |= 128), (a = !0), Hc(r, !1), (t.lanes = 4194304));
              }
            } else {
              if (!a) {
                if (((e = vo(o)), e !== null)) {
                  if (
                    ((t.flags |= 128),
                    (a = !0),
                    (e = e.updateQueue),
                    (t.updateQueue = e),
                    Vc(t, e),
                    Hc(r, !0),
                    r.tail === null &&
                      r.tailMode === `hidden` &&
                      !o.alternate &&
                      !D)
                  )
                    return (z(t), null);
                } else
                  2 * Le() - r.renderingStartTime > tu &&
                    n !== 536870912 &&
                    ((t.flags |= 128),
                    (a = !0),
                    Hc(r, !1),
                    (t.lanes = 4194304));
              }
              r.isBackwards
                ? ((o.sibling = t.child), (t.child = o))
                : ((e = r.last),
                  e === null ? (t.child = o) : (e.sibling = o),
                  (r.last = o));
            }
            return r.tail === null
              ? (z(t), null)
              : ((e = r.tail),
                (r.rendering = e),
                (r.tail = e.sibling),
                (r.renderingStartTime = Le()),
                (e.sibling = null),
                (n = _o.current),
                E(_o, a ? (n & 1) | 2 : n & 1),
                D && Bi(t, r.treeForkCount),
                e);
          case 22:
          case 23:
            return (
              go(t),
              uo(),
              (r = t.memoizedState !== null),
              e === null
                ? r && (t.flags |= 8192)
                : (e.memoizedState !== null) !== r && (t.flags |= 8192),
              r
                ? n & 536870912 &&
                  !(t.flags & 128) &&
                  (z(t), t.subtreeFlags & 6 && (t.flags |= 8192))
                : z(t),
              (n = t.updateQueue),
              n !== null && Vc(t, n.retryQueue),
              (n = null),
              e !== null &&
                e.memoizedState !== null &&
                e.memoizedState.cachePool !== null &&
                (n = e.memoizedState.cachePool.pool),
              (r = null),
              t.memoizedState !== null &&
                t.memoizedState.cachePool !== null &&
                (r = t.memoizedState.cachePool.pool),
              r !== n && (t.flags |= 2048),
              e !== null && ge(ka),
              null
            );
          case 24:
            return (
              (n = null),
              e !== null && (n = e.memoizedState.cache),
              t.memoizedState.cache !== n && (t.flags |= 2048),
              O(va),
              z(t),
              null
            );
          case 25:
            return null;
          case 30:
            return null;
        }
        throw Error(i(156, t.tag));
      }
      function Wc(e, t) {
        switch ((Ui(t), t.tag)) {
          case 1:
            return (
              (e = t.flags),
              e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
          case 3:
            return (
              O(va),
              Se(),
              (e = t.flags),
              e & 65536 && !(e & 128)
                ? ((t.flags = (e & -65537) | 128), t)
                : null
            );
          case 26:
          case 27:
          case 5:
            return (we(t), null);
          case 31:
            if (t.memoizedState !== null) {
              if ((go(t), t.alternate === null)) throw Error(i(340));
              ea();
            }
            return (
              (e = t.flags),
              e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
          case 13:
            if (
              (go(t),
              (e = t.memoizedState),
              e !== null && e.dehydrated !== null)
            ) {
              if (t.alternate === null) throw Error(i(340));
              ea();
            }
            return (
              (e = t.flags),
              e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
          case 19:
            return (ge(_o), null);
          case 4:
            return (Se(), null);
          case 10:
            return (O(t.type), null);
          case 22:
          case 23:
            return (
              go(t),
              uo(),
              e !== null && ge(ka),
              (e = t.flags),
              e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
          case 24:
            return (O(va), null);
          case 25:
            return null;
          default:
            return null;
        }
      }
      function Gc(e, t) {
        switch ((Ui(t), t.tag)) {
          case 3:
            (O(va), Se());
            break;
          case 26:
          case 27:
          case 5:
            we(t);
            break;
          case 4:
            Se();
            break;
          case 31:
            t.memoizedState !== null && go(t);
            break;
          case 13:
            go(t);
            break;
          case 19:
            ge(_o);
            break;
          case 10:
            O(t.type);
            break;
          case 22:
          case 23:
            (go(t), uo(), e !== null && ge(ka));
            break;
          case 24:
            O(va);
        }
      }
      function Kc(e, t) {
        try {
          var n = t.updateQueue,
            r = n === null ? null : n.lastEffect;
          if (r !== null) {
            var i = r.next;
            n = i;
            do {
              if ((n.tag & e) === e) {
                r = void 0;
                var a = n.create,
                  o = n.inst;
                ((r = a()), (o.destroy = r));
              }
              n = n.next;
            } while (n !== i);
          }
        } catch (e) {
          Z(t, t.return, e);
        }
      }
      function qc(e, t, n) {
        try {
          var r = t.updateQueue,
            i = r === null ? null : r.lastEffect;
          if (i !== null) {
            var a = i.next;
            r = a;
            do {
              if ((r.tag & e) === e) {
                var o = r.inst,
                  s = o.destroy;
                if (s !== void 0) {
                  ((o.destroy = void 0), (i = t));
                  var c = n,
                    l = s;
                  try {
                    l();
                  } catch (e) {
                    Z(i, c, e);
                  }
                }
              }
              r = r.next;
            } while (r !== a);
          }
        } catch (e) {
          Z(t, t.return, e);
        }
      }
      function Jc(e) {
        var t = e.updateQueue;
        if (t !== null) {
          var n = e.stateNode;
          try {
            so(t, n);
          } catch (t) {
            Z(e, e.return, t);
          }
        }
      }
      function Yc(e, t, n) {
        ((n.props = Zs(e.type, e.memoizedProps)), (n.state = e.memoizedState));
        try {
          n.componentWillUnmount();
        } catch (n) {
          Z(e, t, n);
        }
      }
      function Xc(e, t) {
        try {
          var n = e.ref;
          if (n !== null) {
            switch (e.tag) {
              case 26:
              case 27:
              case 5:
                var r = e.stateNode;
                break;
              case 30:
                r = e.stateNode;
                break;
              default:
                r = e.stateNode;
            }
            typeof n == `function` ? (e.refCleanup = n(r)) : (n.current = r);
          }
        } catch (n) {
          Z(e, t, n);
        }
      }
      function Zc(e, t) {
        var n = e.ref,
          r = e.refCleanup;
        if (n !== null) {
          if (typeof r == `function`)
            try {
              r();
            } catch (n) {
              Z(e, t, n);
            } finally {
              ((e.refCleanup = null),
                (e = e.alternate),
                e != null && (e.refCleanup = null));
            }
          else if (typeof n == `function`)
            try {
              n(null);
            } catch (n) {
              Z(e, t, n);
            }
          else n.current = null;
        }
      }
      function Qc(e) {
        var t = e.type,
          n = e.memoizedProps,
          r = e.stateNode;
        try {
          a: switch (t) {
            case `button`:
            case `input`:
            case `select`:
            case `textarea`:
              n.autoFocus && r.focus();
              break a;
            case `img`:
              n.src ? (r.src = n.src) : n.srcSet && (r.srcset = n.srcSet);
          }
        } catch (t) {
          Z(e, e.return, t);
        }
      }
      function $c(e, t, n) {
        try {
          var r = e.stateNode;
          (Fd(r, e.type, n, t), (r[yt] = t));
        } catch (t) {
          Z(e, e.return, t);
        }
      }
      function el(e) {
        return (
          e.tag === 5 ||
          e.tag === 3 ||
          e.tag === 26 ||
          (e.tag === 27 && Zd(e.type)) ||
          e.tag === 4
        );
      }
      function B(e) {
        a: for (;;) {
          for (; e.sibling === null; ) {
            if (e.return === null || el(e.return)) return null;
            e = e.return;
          }
          for (
            e.sibling.return = e.return, e = e.sibling;
            e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
          ) {
            if (
              (e.tag === 27 && Zd(e.type)) ||
              e.flags & 2 ||
              e.child === null ||
              e.tag === 4
            )
              continue a;
            ((e.child.return = e), (e = e.child));
          }
          if (!(e.flags & 2)) return e.stateNode;
        }
      }
      function V(e, t, n) {
        var r = e.tag;
        if (r === 5 || r === 6)
          ((e = e.stateNode),
            t
              ? (n.nodeType === 9
                  ? n.body
                  : n.nodeName === `HTML`
                    ? n.ownerDocument.body
                    : n
                ).insertBefore(e, t)
              : ((t =
                  n.nodeType === 9
                    ? n.body
                    : n.nodeName === `HTML`
                      ? n.ownerDocument.body
                      : n),
                t.appendChild(e),
                (n = n._reactRootContainer),
                n != null || t.onclick !== null || (t.onclick = fn)));
        else if (
          r !== 4 &&
          (r === 27 && Zd(e.type) && ((n = e.stateNode), (t = null)),
          (e = e.child),
          e !== null)
        )
          for (V(e, t, n), e = e.sibling; e !== null; )
            (V(e, t, n), (e = e.sibling));
      }
      function tl(e, t, n) {
        var r = e.tag;
        if (r === 5 || r === 6)
          ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
        else if (
          r !== 4 &&
          (r === 27 && Zd(e.type) && (n = e.stateNode),
          (e = e.child),
          e !== null)
        )
          for (tl(e, t, n), e = e.sibling; e !== null; )
            (tl(e, t, n), (e = e.sibling));
      }
      function nl(e) {
        var t = e.stateNode,
          n = e.memoizedProps;
        try {
          for (var r = e.type, i = t.attributes; i.length; )
            t.removeAttributeNode(i[0]);
          (Pd(t, r, n), (t[vt] = e), (t[yt] = n));
        } catch (t) {
          Z(e, e.return, t);
        }
      }
      var rl = !1,
        il = !1,
        H = !1,
        al = typeof WeakSet == `function` ? WeakSet : Set,
        ol = null;
      function U(e, t) {
        if (((e = e.containerInfo), (Rd = sp), (e = zr(e)), Br(e))) {
          if (`selectionStart` in e)
            var n = { start: e.selectionStart, end: e.selectionEnd };
          else
            a: {
              n = ((n = e.ownerDocument) && n.defaultView) || window;
              var r = n.getSelection && n.getSelection();
              if (r && r.rangeCount !== 0) {
                n = r.anchorNode;
                var a = r.anchorOffset,
                  o = r.focusNode;
                r = r.focusOffset;
                try {
                  (n.nodeType, o.nodeType);
                } catch {
                  n = null;
                  break a;
                }
                var s = 0,
                  c = -1,
                  l = -1,
                  u = 0,
                  d = 0,
                  f = e,
                  p = null;
                b: for (;;) {
                  for (
                    var m;
                    f !== n || (a !== 0 && f.nodeType !== 3) || (c = s + a),
                      f !== o || (r !== 0 && f.nodeType !== 3) || (l = s + r),
                      f.nodeType === 3 && (s += f.nodeValue.length),
                      (m = f.firstChild) !== null;
                  )
                    ((p = f), (f = m));
                  for (;;) {
                    if (f === e) break b;
                    if (
                      (p === n && ++u === a && (c = s),
                      p === o && ++d === r && (l = s),
                      (m = f.nextSibling) !== null)
                    )
                      break;
                    ((f = p), (p = f.parentNode));
                  }
                  f = m;
                }
                n = c === -1 || l === -1 ? null : { start: c, end: l };
              } else n = null;
            }
          n ||= { start: 0, end: 0 };
        } else n = null;
        for (
          zd = { focusedElem: e, selectionRange: n }, sp = !1, ol = t;
          ol !== null;
        )
          if (((t = ol), (e = t.child), t.subtreeFlags & 1028 && e !== null))
            ((e.return = t), (ol = e));
          else
            for (; ol !== null; ) {
              switch (((t = ol), (o = t.alternate), (e = t.flags), t.tag)) {
                case 0:
                  if (
                    e & 4 &&
                    ((e = t.updateQueue),
                    (e = e === null ? null : e.events),
                    e !== null)
                  )
                    for (n = 0; n < e.length; n++)
                      ((a = e[n]), (a.ref.impl = a.nextImpl));
                  break;
                case 11:
                case 15:
                  break;
                case 1:
                  if (e & 1024 && o !== null) {
                    ((e = void 0),
                      (n = t),
                      (a = o.memoizedProps),
                      (o = o.memoizedState),
                      (r = n.stateNode));
                    try {
                      var h = Zs(n.type, a);
                      ((e = r.getSnapshotBeforeUpdate(h, o)),
                        (r.__reactInternalSnapshotBeforeUpdate = e));
                    } catch (e) {
                      Z(n, n.return, e);
                    }
                  }
                  break;
                case 3:
                  if (e & 1024) {
                    if (
                      ((e = t.stateNode.containerInfo),
                      (n = e.nodeType),
                      n === 9)
                    )
                      ef(e);
                    else if (n === 1)
                      switch (e.nodeName) {
                        case `HEAD`:
                        case `HTML`:
                        case `BODY`:
                          ef(e);
                          break;
                        default:
                          e.textContent = ``;
                      }
                  }
                  break;
                case 5:
                case 26:
                case 27:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  if (e & 1024) throw Error(i(163));
              }
              if (((e = t.sibling), e !== null)) {
                ((e.return = t.return), (ol = e));
                break;
              }
              ol = t.return;
            }
      }
      function sl(e, t, n) {
        var r = n.flags;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            (bl(e, n), r & 4 && Kc(5, n));
            break;
          case 1:
            if ((bl(e, n), r & 4)) {
              if (((e = n.stateNode), t === null))
                try {
                  e.componentDidMount();
                } catch (e) {
                  Z(n, n.return, e);
                }
              else {
                var i = Zs(n.type, t.memoizedProps);
                t = t.memoizedState;
                try {
                  e.componentDidUpdate(
                    i,
                    t,
                    e.__reactInternalSnapshotBeforeUpdate,
                  );
                } catch (e) {
                  Z(n, n.return, e);
                }
              }
            }
            (r & 64 && Jc(n), r & 512 && Xc(n, n.return));
            break;
          case 3:
            if ((bl(e, n), r & 64 && ((e = n.updateQueue), e !== null))) {
              if (((t = null), n.child !== null))
                switch (n.child.tag) {
                  case 27:
                  case 5:
                    t = n.child.stateNode;
                    break;
                  case 1:
                    t = n.child.stateNode;
                }
              try {
                so(e, t);
              } catch (e) {
                Z(n, n.return, e);
              }
            }
            break;
          case 27:
            t === null && r & 4 && nl(n);
          case 26:
          case 5:
            (bl(e, n),
              t === null && r & 4 && Qc(n),
              r & 512 && Xc(n, n.return));
            break;
          case 12:
            bl(e, n);
            break;
          case 31:
            (bl(e, n), r & 4 && G(e, n));
            break;
          case 13:
            (bl(e, n),
              r & 4 && fl(e, n),
              r & 64 &&
                ((e = n.memoizedState),
                e !== null &&
                  ((e = e.dehydrated),
                  e !== null && ((n = Ju.bind(null, n)), sf(e, n)))));
            break;
          case 22:
            if (((r = n.memoizedState !== null || rl), !r)) {
              ((t = (t !== null && t.memoizedState !== null) || il), (i = rl));
              var a = il;
              ((rl = r),
                (il = t) && !a ? Sl(e, n, !!(n.subtreeFlags & 8772)) : bl(e, n),
                (rl = i),
                (il = a));
            }
            break;
          case 30:
            break;
          default:
            bl(e, n);
        }
      }
      function cl(e) {
        var t = e.alternate;
        (t !== null && ((e.alternate = null), cl(t)),
          (e.child = null),
          (e.deletions = null),
          (e.sibling = null),
          e.tag === 5 && ((t = e.stateNode), t !== null && Et(t)),
          (e.stateNode = null),
          (e.return = null),
          (e.dependencies = null),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.pendingProps = null),
          (e.stateNode = null),
          (e.updateQueue = null));
      }
      var ll = null,
        ul = !1;
      function W(e, t, n) {
        for (n = n.child; n !== null; ) (dl(e, t, n), (n = n.sibling));
      }
      function dl(e, t, n) {
        if (qe && typeof qe.onCommitFiberUnmount == `function`)
          try {
            qe.onCommitFiberUnmount(Ke, n);
          } catch {}
        switch (n.tag) {
          case 26:
            (il || Zc(n, t),
              W(e, t, n),
              n.memoizedState
                ? n.memoizedState.count--
                : n.stateNode &&
                  ((n = n.stateNode), n.parentNode.removeChild(n)));
            break;
          case 27:
            il || Zc(n, t);
            var r = ll,
              i = ul;
            (Zd(n.type) && ((ll = n.stateNode), (ul = !1)),
              W(e, t, n),
              pf(n.stateNode),
              (ll = r),
              (ul = i));
            break;
          case 5:
            il || Zc(n, t);
          case 6:
            if (
              ((r = ll),
              (i = ul),
              (ll = null),
              W(e, t, n),
              (ll = r),
              (ul = i),
              ll !== null)
            ) {
              if (ul)
                try {
                  (ll.nodeType === 9
                    ? ll.body
                    : ll.nodeName === `HTML`
                      ? ll.ownerDocument.body
                      : ll
                  ).removeChild(n.stateNode);
                } catch (e) {
                  Z(n, t, e);
                }
              else
                try {
                  ll.removeChild(n.stateNode);
                } catch (e) {
                  Z(n, t, e);
                }
            }
            break;
          case 18:
            ll !== null &&
              (ul
                ? ((e = ll),
                  Qd(
                    e.nodeType === 9
                      ? e.body
                      : e.nodeName === `HTML`
                        ? e.ownerDocument.body
                        : e,
                    n.stateNode,
                  ),
                  Np(e))
                : Qd(ll, n.stateNode));
            break;
          case 4:
            ((r = ll),
              (i = ul),
              (ll = n.stateNode.containerInfo),
              (ul = !0),
              W(e, t, n),
              (ll = r),
              (ul = i));
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            (qc(2, n, t), il || qc(4, n, t), W(e, t, n));
            break;
          case 1:
            (il ||
              (Zc(n, t),
              (r = n.stateNode),
              typeof r.componentWillUnmount == `function` && Yc(n, t, r)),
              W(e, t, n));
            break;
          case 21:
            W(e, t, n);
            break;
          case 22:
            ((il = (r = il) || n.memoizedState !== null), W(e, t, n), (il = r));
            break;
          default:
            W(e, t, n);
        }
      }
      function G(e, t) {
        if (
          t.memoizedState === null &&
          ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
        ) {
          e = e.dehydrated;
          try {
            Np(e);
          } catch (e) {
            Z(t, t.return, e);
          }
        }
      }
      function fl(e, t) {
        if (
          t.memoizedState === null &&
          ((e = t.alternate),
          e !== null &&
            ((e = e.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)))
        )
          try {
            Np(e);
          } catch (e) {
            Z(t, t.return, e);
          }
      }
      function pl(e) {
        switch (e.tag) {
          case 31:
          case 13:
          case 19:
            var t = e.stateNode;
            return (t === null && (t = e.stateNode = new al()), t);
          case 22:
            return (
              (e = e.stateNode),
              (t = e._retryCache),
              t === null && (t = e._retryCache = new al()),
              t
            );
          default:
            throw Error(i(435, e.tag));
        }
      }
      function ml(e, t) {
        var n = pl(e);
        t.forEach(function (t) {
          if (!n.has(t)) {
            n.add(t);
            var r = Yu.bind(null, e, t);
            t.then(r, r);
          }
        });
      }
      function hl(e, t) {
        var n = t.deletions;
        if (n !== null)
          for (var r = 0; r < n.length; r++) {
            var a = n[r],
              o = e,
              s = t,
              c = s;
            a: for (; c !== null; ) {
              switch (c.tag) {
                case 27:
                  if (Zd(c.type)) {
                    ((ll = c.stateNode), (ul = !1));
                    break a;
                  }
                  break;
                case 5:
                  ((ll = c.stateNode), (ul = !1));
                  break a;
                case 3:
                case 4:
                  ((ll = c.stateNode.containerInfo), (ul = !0));
                  break a;
              }
              c = c.return;
            }
            if (ll === null) throw Error(i(160));
            (dl(o, s, a),
              (ll = null),
              (ul = !1),
              (o = a.alternate),
              o !== null && (o.return = null),
              (a.return = null));
          }
        if (t.subtreeFlags & 13886)
          for (t = t.child; t !== null; ) (_l(t, e), (t = t.sibling));
      }
      var gl = null;
      function _l(e, t) {
        var n = e.alternate,
          r = e.flags;
        switch (e.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            (hl(t, e),
              vl(e),
              r & 4 && (qc(3, e, e.return), Kc(3, e), qc(5, e, e.return)));
            break;
          case 1:
            (hl(t, e),
              vl(e),
              r & 512 && (il || n === null || Zc(n, n.return)),
              r & 64 &&
                rl &&
                ((e = e.updateQueue),
                e !== null &&
                  ((r = e.callbacks),
                  r !== null &&
                    ((n = e.shared.hiddenCallbacks),
                    (e.shared.hiddenCallbacks =
                      n === null ? r : n.concat(r))))));
            break;
          case 26:
            var a = gl;
            if (
              (hl(t, e),
              vl(e),
              r & 512 && (il || n === null || Zc(n, n.return)),
              r & 4)
            ) {
              var o = n === null ? null : n.memoizedState;
              if (((r = e.memoizedState), n === null)) {
                if (r === null) {
                  if (e.stateNode === null) {
                    a: {
                      ((r = e.type),
                        (n = e.memoizedProps),
                        (a = a.ownerDocument || a));
                      b: switch (r) {
                        case `title`:
                          ((o = a.getElementsByTagName(`title`)[0]),
                            (!o ||
                              o[Tt] ||
                              o[vt] ||
                              o.namespaceURI === `http://www.w3.org/2000/svg` ||
                              o.hasAttribute(`itemprop`)) &&
                              ((o = a.createElement(r)),
                              a.head.insertBefore(
                                o,
                                a.querySelector(`head > title`),
                              )),
                            Pd(o, r, n),
                            (o[vt] = e),
                            jt(o),
                            (r = o));
                          break a;
                        case `link`:
                          var s = Vf(`link`, `href`, a).get(r + (n.href || ``));
                          if (s) {
                            for (var c = 0; c < s.length; c++)
                              if (
                                ((o = s[c]),
                                o.getAttribute(`href`) ===
                                  (n.href == null || n.href === ``
                                    ? null
                                    : n.href) &&
                                  o.getAttribute(`rel`) ===
                                    (n.rel == null ? null : n.rel) &&
                                  o.getAttribute(`title`) ===
                                    (n.title == null ? null : n.title) &&
                                  o.getAttribute(`crossorigin`) ===
                                    (n.crossOrigin == null
                                      ? null
                                      : n.crossOrigin))
                              ) {
                                s.splice(c, 1);
                                break b;
                              }
                          }
                          ((o = a.createElement(r)),
                            Pd(o, r, n),
                            a.head.appendChild(o));
                          break;
                        case `meta`:
                          if (
                            (s = Vf(`meta`, `content`, a).get(
                              r + (n.content || ``),
                            ))
                          ) {
                            for (c = 0; c < s.length; c++)
                              if (
                                ((o = s[c]),
                                o.getAttribute(`content`) ===
                                  (n.content == null ? null : `` + n.content) &&
                                  o.getAttribute(`name`) ===
                                    (n.name == null ? null : n.name) &&
                                  o.getAttribute(`property`) ===
                                    (n.property == null ? null : n.property) &&
                                  o.getAttribute(`http-equiv`) ===
                                    (n.httpEquiv == null
                                      ? null
                                      : n.httpEquiv) &&
                                  o.getAttribute(`charset`) ===
                                    (n.charSet == null ? null : n.charSet))
                              ) {
                                s.splice(c, 1);
                                break b;
                              }
                          }
                          ((o = a.createElement(r)),
                            Pd(o, r, n),
                            a.head.appendChild(o));
                          break;
                        default:
                          throw Error(i(468, r));
                      }
                      ((o[vt] = e), jt(o), (r = o));
                    }
                    e.stateNode = r;
                  } else Hf(a, e.type, e.stateNode);
                } else e.stateNode = If(a, r, e.memoizedProps);
              } else
                o === r
                  ? r === null &&
                    e.stateNode !== null &&
                    $c(e, e.memoizedProps, n.memoizedProps)
                  : (o === null
                      ? n.stateNode !== null &&
                        ((n = n.stateNode), n.parentNode.removeChild(n))
                      : o.count--,
                    r === null
                      ? Hf(a, e.type, e.stateNode)
                      : If(a, r, e.memoizedProps));
            }
            break;
          case 27:
            (hl(t, e),
              vl(e),
              r & 512 && (il || n === null || Zc(n, n.return)),
              n !== null && r & 4 && $c(e, e.memoizedProps, n.memoizedProps));
            break;
          case 5:
            if (
              (hl(t, e),
              vl(e),
              r & 512 && (il || n === null || Zc(n, n.return)),
              e.flags & 32)
            ) {
              a = e.stateNode;
              try {
                rn(a, ``);
              } catch (t) {
                Z(e, e.return, t);
              }
            }
            (r & 4 &&
              e.stateNode != null &&
              ((a = e.memoizedProps),
              $c(e, a, n === null ? a : n.memoizedProps)),
              r & 1024 && (H = !0));
            break;
          case 6:
            if ((hl(t, e), vl(e), r & 4)) {
              if (e.stateNode === null) throw Error(i(162));
              ((r = e.memoizedProps), (n = e.stateNode));
              try {
                n.nodeValue = r;
              } catch (t) {
                Z(e, e.return, t);
              }
            }
            break;
          case 3:
            if (
              ((Bf = null),
              (a = gl),
              (gl = gf(t.containerInfo)),
              hl(t, e),
              (gl = a),
              vl(e),
              r & 4 && n !== null && n.memoizedState.isDehydrated)
            )
              try {
                Np(t.containerInfo);
              } catch (t) {
                Z(e, e.return, t);
              }
            H && ((H = !1), yl(e));
            break;
          case 4:
            ((r = gl),
              (gl = gf(e.stateNode.containerInfo)),
              hl(t, e),
              vl(e),
              (gl = r));
            break;
          case 12:
            (hl(t, e), vl(e));
            break;
          case 31:
            (hl(t, e),
              vl(e),
              r & 4 &&
                ((r = e.updateQueue),
                r !== null && ((e.updateQueue = null), ml(e, r))));
            break;
          case 13:
            (hl(t, e),
              vl(e),
              e.child.flags & 8192 &&
                (e.memoizedState !== null) !=
                  (n !== null && n.memoizedState !== null) &&
                ($l = Le()),
              r & 4 &&
                ((r = e.updateQueue),
                r !== null && ((e.updateQueue = null), ml(e, r))));
            break;
          case 22:
            a = e.memoizedState !== null;
            var l = n !== null && n.memoizedState !== null,
              u = rl,
              d = il;
            if (
              ((rl = u || a),
              (il = d || l),
              hl(t, e),
              (il = d),
              (rl = u),
              vl(e),
              r & 8192)
            )
              a: for (
                t = e.stateNode,
                  t._visibility = a ? t._visibility & -2 : t._visibility | 1,
                  a && (n === null || l || rl || il || xl(e)),
                  n = null,
                  t = e;
                ;
              ) {
                if (t.tag === 5 || t.tag === 26) {
                  if (n === null) {
                    l = n = t;
                    try {
                      if (((o = l.stateNode), a))
                        ((s = o.style),
                          typeof s.setProperty == `function`
                            ? s.setProperty(`display`, `none`, `important`)
                            : (s.display = `none`));
                      else {
                        c = l.stateNode;
                        var f = l.memoizedProps.style,
                          p =
                            f != null && f.hasOwnProperty(`display`)
                              ? f.display
                              : null;
                        c.style.display =
                          p == null || typeof p == `boolean`
                            ? ``
                            : (`` + p).trim();
                      }
                    } catch (e) {
                      Z(l, l.return, e);
                    }
                  }
                } else if (t.tag === 6) {
                  if (n === null) {
                    l = t;
                    try {
                      l.stateNode.nodeValue = a ? `` : l.memoizedProps;
                    } catch (e) {
                      Z(l, l.return, e);
                    }
                  }
                } else if (t.tag === 18) {
                  if (n === null) {
                    l = t;
                    try {
                      var m = l.stateNode;
                      a ? $d(m, !0) : $d(l.stateNode, !1);
                    } catch (e) {
                      Z(l, l.return, e);
                    }
                  }
                } else if (
                  ((t.tag !== 22 && t.tag !== 23) ||
                    t.memoizedState === null ||
                    t === e) &&
                  t.child !== null
                ) {
                  ((t.child.return = t), (t = t.child));
                  continue;
                }
                if (t === e) break a;
                for (; t.sibling === null; ) {
                  if (t.return === null || t.return === e) break a;
                  (n === t && (n = null), (t = t.return));
                }
                (n === t && (n = null),
                  (t.sibling.return = t.return),
                  (t = t.sibling));
              }
            r & 4 &&
              ((r = e.updateQueue),
              r !== null &&
                ((n = r.retryQueue),
                n !== null && ((r.retryQueue = null), ml(e, n))));
            break;
          case 19:
            (hl(t, e),
              vl(e),
              r & 4 &&
                ((r = e.updateQueue),
                r !== null && ((e.updateQueue = null), ml(e, r))));
            break;
          case 30:
            break;
          case 21:
            break;
          default:
            (hl(t, e), vl(e));
        }
      }
      function vl(e) {
        var t = e.flags;
        if (t & 2) {
          try {
            for (var n, r = e.return; r !== null; ) {
              if (el(r)) {
                n = r;
                break;
              }
              r = r.return;
            }
            if (n == null) throw Error(i(160));
            switch (n.tag) {
              case 27:
                var a = n.stateNode;
                tl(e, B(e), a);
                break;
              case 5:
                var o = n.stateNode;
                (n.flags & 32 && (rn(o, ``), (n.flags &= -33)), tl(e, B(e), o));
                break;
              case 3:
              case 4:
                var s = n.stateNode.containerInfo;
                V(e, B(e), s);
                break;
              default:
                throw Error(i(161));
            }
          } catch (t) {
            Z(e, e.return, t);
          }
          e.flags &= -3;
        }
        t & 4096 && (e.flags &= -4097);
      }
      function yl(e) {
        if (e.subtreeFlags & 1024)
          for (e = e.child; e !== null; ) {
            var t = e;
            (yl(t),
              t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
              (e = e.sibling));
          }
      }
      function bl(e, t) {
        if (t.subtreeFlags & 8772)
          for (t = t.child; t !== null; )
            (sl(e, t.alternate, t), (t = t.sibling));
      }
      function xl(e) {
        for (e = e.child; e !== null; ) {
          var t = e;
          switch (t.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              (qc(4, t, t.return), xl(t));
              break;
            case 1:
              Zc(t, t.return);
              var n = t.stateNode;
              (typeof n.componentWillUnmount == `function` &&
                Yc(t, t.return, n),
                xl(t));
              break;
            case 27:
              pf(t.stateNode);
            case 26:
            case 5:
              (Zc(t, t.return), xl(t));
              break;
            case 22:
              t.memoizedState === null && xl(t);
              break;
            case 30:
              xl(t);
              break;
            default:
              xl(t);
          }
          e = e.sibling;
        }
      }
      function Sl(e, t, n) {
        for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null; ) {
          var r = t.alternate,
            i = e,
            a = t,
            o = a.flags;
          switch (a.tag) {
            case 0:
            case 11:
            case 15:
              (Sl(i, a, n), Kc(4, a));
              break;
            case 1:
              if (
                (Sl(i, a, n),
                (r = a),
                (i = r.stateNode),
                typeof i.componentDidMount == `function`)
              )
                try {
                  i.componentDidMount();
                } catch (e) {
                  Z(r, r.return, e);
                }
              if (((r = a), (i = r.updateQueue), i !== null)) {
                var s = r.stateNode;
                try {
                  var c = i.shared.hiddenCallbacks;
                  if (c !== null)
                    for (
                      i.shared.hiddenCallbacks = null, i = 0;
                      i < c.length;
                      i++
                    )
                      oo(c[i], s);
                } catch (e) {
                  Z(r, r.return, e);
                }
              }
              (n && o & 64 && Jc(a), Xc(a, a.return));
              break;
            case 27:
              nl(a);
            case 26:
            case 5:
              (Sl(i, a, n), n && r === null && o & 4 && Qc(a), Xc(a, a.return));
              break;
            case 12:
              Sl(i, a, n);
              break;
            case 31:
              (Sl(i, a, n), n && o & 4 && G(i, a));
              break;
            case 13:
              (Sl(i, a, n), n && o & 4 && fl(i, a));
              break;
            case 22:
              (a.memoizedState === null && Sl(i, a, n), Xc(a, a.return));
              break;
            case 30:
              break;
            default:
              Sl(i, a, n);
          }
          t = t.sibling;
        }
      }
      function Cl(e, t) {
        var n = null;
        (e !== null &&
          e.memoizedState !== null &&
          e.memoizedState.cachePool !== null &&
          (n = e.memoizedState.cachePool.pool),
          (e = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (e = t.memoizedState.cachePool.pool),
          e !== n && (e != null && e.refCount++, n != null && ba(n)));
      }
      function wl(e, t) {
        ((e = null),
          t.alternate !== null && (e = t.alternate.memoizedState.cache),
          (t = t.memoizedState.cache),
          t !== e && (t.refCount++, e != null && ba(e)));
      }
      function Tl(e, t, n, r) {
        if (t.subtreeFlags & 10256)
          for (t = t.child; t !== null; ) (El(e, t, n, r), (t = t.sibling));
      }
      function El(e, t, n, r) {
        var i = t.flags;
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            (Tl(e, t, n, r), i & 2048 && Kc(9, t));
            break;
          case 1:
            Tl(e, t, n, r);
            break;
          case 3:
            (Tl(e, t, n, r),
              i & 2048 &&
                ((e = null),
                t.alternate !== null && (e = t.alternate.memoizedState.cache),
                (t = t.memoizedState.cache),
                t !== e && (t.refCount++, e != null && ba(e))));
            break;
          case 12:
            if (i & 2048) {
              (Tl(e, t, n, r), (e = t.stateNode));
              try {
                var a = t.memoizedProps,
                  o = a.id,
                  s = a.onPostCommit;
                typeof s == `function` &&
                  s(
                    o,
                    t.alternate === null ? `mount` : `update`,
                    e.passiveEffectDuration,
                    -0,
                  );
              } catch (e) {
                Z(t, t.return, e);
              }
            } else Tl(e, t, n, r);
            break;
          case 31:
            Tl(e, t, n, r);
            break;
          case 13:
            Tl(e, t, n, r);
            break;
          case 23:
            break;
          case 22:
            ((a = t.stateNode),
              (o = t.alternate),
              t.memoizedState === null
                ? a._visibility & 2
                  ? Tl(e, t, n, r)
                  : ((a._visibility |= 2),
                    Dl(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))
                : a._visibility & 2
                  ? Tl(e, t, n, r)
                  : Ol(e, t),
              i & 2048 && Cl(o, t));
            break;
          case 24:
            (Tl(e, t, n, r), i & 2048 && wl(t.alternate, t));
            break;
          default:
            Tl(e, t, n, r);
        }
      }
      function Dl(e, t, n, r, i) {
        for (
          i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child;
          t !== null;
        ) {
          var a = e,
            o = t,
            s = n,
            c = r,
            l = o.flags;
          switch (o.tag) {
            case 0:
            case 11:
            case 15:
              (Dl(a, o, s, c, i), Kc(8, o));
              break;
            case 23:
              break;
            case 22:
              var u = o.stateNode;
              (o.memoizedState === null
                ? ((u._visibility |= 2), Dl(a, o, s, c, i))
                : u._visibility & 2
                  ? Dl(a, o, s, c, i)
                  : Ol(a, o),
                i && l & 2048 && Cl(o.alternate, o));
              break;
            case 24:
              (Dl(a, o, s, c, i), i && l & 2048 && wl(o.alternate, o));
              break;
            default:
              Dl(a, o, s, c, i);
          }
          t = t.sibling;
        }
      }
      function Ol(e, t) {
        if (t.subtreeFlags & 10256)
          for (t = t.child; t !== null; ) {
            var n = e,
              r = t,
              i = r.flags;
            switch (r.tag) {
              case 22:
                (Ol(n, r), i & 2048 && Cl(r.alternate, r));
                break;
              case 24:
                (Ol(n, r), i & 2048 && wl(r.alternate, r));
                break;
              default:
                Ol(n, r);
            }
            t = t.sibling;
          }
      }
      var kl = 8192;
      function Al(e, t, n) {
        if (e.subtreeFlags & kl)
          for (e = e.child; e !== null; ) (jl(e, t, n), (e = e.sibling));
      }
      function jl(e, t, n) {
        switch (e.tag) {
          case 26:
            (Al(e, t, n),
              e.flags & kl &&
                e.memoizedState !== null &&
                Gf(n, gl, e.memoizedState, e.memoizedProps));
            break;
          case 5:
            Al(e, t, n);
            break;
          case 3:
          case 4:
            var r = gl;
            ((gl = gf(e.stateNode.containerInfo)), Al(e, t, n), (gl = r));
            break;
          case 22:
            e.memoizedState === null &&
              ((r = e.alternate),
              r !== null && r.memoizedState !== null
                ? ((r = kl), (kl = 16777216), Al(e, t, n), (kl = r))
                : Al(e, t, n));
            break;
          default:
            Al(e, t, n);
        }
      }
      function Ml(e) {
        var t = e.alternate;
        if (t !== null && ((e = t.child), e !== null)) {
          t.child = null;
          do ((t = e.sibling), (e.sibling = null), (e = t));
          while (e !== null);
        }
      }
      function Nl(e) {
        var t = e.deletions;
        if (e.flags & 16) {
          if (t !== null)
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              ((ol = r), Il(r, e));
            }
          Ml(e);
        }
        if (e.subtreeFlags & 10256)
          for (e = e.child; e !== null; ) (Pl(e), (e = e.sibling));
      }
      function Pl(e) {
        switch (e.tag) {
          case 0:
          case 11:
          case 15:
            (Nl(e), e.flags & 2048 && qc(9, e, e.return));
            break;
          case 3:
            Nl(e);
            break;
          case 12:
            Nl(e);
            break;
          case 22:
            var t = e.stateNode;
            e.memoizedState !== null &&
            t._visibility & 2 &&
            (e.return === null || e.return.tag !== 13)
              ? ((t._visibility &= -3), Fl(e))
              : Nl(e);
            break;
          default:
            Nl(e);
        }
      }
      function Fl(e) {
        var t = e.deletions;
        if (e.flags & 16) {
          if (t !== null)
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              ((ol = r), Il(r, e));
            }
          Ml(e);
        }
        for (e = e.child; e !== null; ) {
          switch (((t = e), t.tag)) {
            case 0:
            case 11:
            case 15:
              (qc(8, t, t.return), Fl(t));
              break;
            case 22:
              ((n = t.stateNode),
                n._visibility & 2 && ((n._visibility &= -3), Fl(t)));
              break;
            default:
              Fl(t);
          }
          e = e.sibling;
        }
      }
      function Il(e, t) {
        for (; ol !== null; ) {
          var n = ol;
          switch (n.tag) {
            case 0:
            case 11:
            case 15:
              qc(8, n, t);
              break;
            case 23:
            case 22:
              if (
                n.memoizedState !== null &&
                n.memoizedState.cachePool !== null
              ) {
                var r = n.memoizedState.cachePool.pool;
                r != null && r.refCount++;
              }
              break;
            case 24:
              ba(n.memoizedState.cache);
          }
          if (((r = n.child), r !== null)) ((r.return = n), (ol = r));
          else
            a: for (n = e; ol !== null; ) {
              r = ol;
              var i = r.sibling,
                a = r.return;
              if ((cl(r), r === n)) {
                ol = null;
                break a;
              }
              if (i !== null) {
                ((i.return = a), (ol = i));
                break a;
              }
              ol = a;
            }
        }
      }
      var Ll = {
          getCacheForType: function (e) {
            var t = fa(va),
              n = t.data.get(e);
            return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
          },
          cacheSignal: function () {
            return fa(va).controller.signal;
          },
        },
        Rl = typeof WeakMap == `function` ? WeakMap : Map,
        K = 0,
        q = null,
        J = null,
        Y = 0,
        X = 0,
        zl = null,
        Bl = !1,
        Vl = !1,
        Hl = !1,
        Ul = 0,
        Wl = 0,
        Gl = 0,
        Kl = 0,
        ql = 0,
        Jl = 0,
        Yl = 0,
        Xl = null,
        Zl = null,
        Ql = !1,
        $l = 0,
        eu = 0,
        tu = 1 / 0,
        nu = null,
        ru = null,
        iu = 0,
        au = null,
        ou = null,
        su = 0,
        cu = 0,
        lu = null,
        uu = null,
        du = 0,
        fu = null;
      function pu() {
        return K & 2 && Y !== 0 ? Y & -Y : w.T === null ? ht() : dd();
      }
      function mu() {
        if (Jl === 0) {
          if (!(Y & 536870912) || D) {
            var e = et;
            ((et <<= 1), !(et & 3932160) && (et = 262144), (Jl = e));
          } else Jl = 536870912;
        }
        return ((e = M.current), e !== null && (e.flags |= 32), Jl);
      }
      function hu(e, t, n) {
        (((e === q && (X === 2 || X === 9)) ||
          e.cancelPendingCommit !== null) &&
          (Su(e, 0), yu(e, Y, Jl, !1)),
          ct(e, n),
          (!(K & 2) || e !== q) &&
            (e === q && (!(K & 2) && (Kl |= n), Wl === 4 && yu(e, Y, Jl, !1)),
            rd(e)));
      }
      function gu(e, t, n) {
        if (K & 6) throw Error(i(327));
        var r = (!n && !(t & 127) && (t & e.expiredLanes) === 0) || it(e, t),
          a = r ? Au(e, t) : Ou(e, t, !0),
          o = r;
        do {
          if (a === 0) {
            Vl && !r && yu(e, t, 0, !1);
            break;
          }
          if (((n = e.current.alternate), o && !vu(n))) {
            ((a = Ou(e, t, !1)), (o = !1));
            continue;
          }
          if (a === 2) {
            if (((o = t), e.errorRecoveryDisabledLanes & o)) var s = 0;
            else
              ((s = e.pendingLanes & -536870913),
                (s = s === 0 ? (s & 536870912 ? 536870912 : 0) : s));
            if (s !== 0) {
              t = s;
              a: {
                var c = e;
                a = Xl;
                var l = c.current.memoizedState.isDehydrated;
                if (
                  (l && (Su(c, s).flags |= 256), (s = Ou(c, s, !1)), s !== 2)
                ) {
                  if (Hl && !l) {
                    ((c.errorRecoveryDisabledLanes |= o), (Kl |= o), (a = 4));
                    break a;
                  }
                  ((o = Zl),
                    (Zl = a),
                    o !== null &&
                      (Zl === null ? (Zl = o) : Zl.push.apply(Zl, o)));
                }
                a = s;
              }
              if (((o = !1), a !== 2)) continue;
            }
          }
          if (a === 1) {
            (Su(e, 0), yu(e, t, 0, !0));
            break;
          }
          a: {
            switch (((r = e), (o = a), o)) {
              case 0:
              case 1:
                throw Error(i(345));
              case 4:
                if ((t & 4194048) !== t) break;
              case 6:
                yu(r, t, Jl, !Bl);
                break a;
              case 2:
                Zl = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(i(329));
            }
            if ((t & 62914560) === t && ((a = $l + 300 - Le()), 10 < a)) {
              if ((yu(r, t, Jl, !Bl), rt(r, 0, !0) !== 0)) break a;
              ((su = t),
                (r.timeoutHandle = Kd(
                  _u.bind(
                    null,
                    r,
                    n,
                    Zl,
                    nu,
                    Ql,
                    t,
                    Jl,
                    Kl,
                    Yl,
                    Bl,
                    o,
                    `Throttled`,
                    -0,
                    0,
                  ),
                  a,
                )));
              break a;
            }
            _u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, null, -0, 0);
          }
          break;
        } while (1);
        rd(e);
      }
      function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
        if (
          ((e.timeoutHandle = -1),
          (d = t.subtreeFlags),
          d & 8192 || (d & 16785408) == 16785408)
        ) {
          ((d = {
            stylesheets: null,
            count: 0,
            imgCount: 0,
            imgBytes: 0,
            suspenseyImages: [],
            waitingForImages: !0,
            waitingForViewTransition: !1,
            unsuspend: fn,
          }),
            jl(t, a, d));
          var m =
            (a & 62914560) === a
              ? $l - Le()
              : (a & 4194048) === a
                ? eu - Le()
                : 0;
          if (((m = qf(d, m)), m !== null)) {
            ((su = a),
              (e.cancelPendingCommit = m(
                Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p),
              )),
              yu(e, a, o, !l));
            return;
          }
        }
        Lu(e, t, a, n, r, i, o, s, c);
      }
      function vu(e) {
        for (var t = e; ; ) {
          var n = t.tag;
          if (
            (n === 0 || n === 11 || n === 15) &&
            t.flags & 16384 &&
            ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
          )
            for (var r = 0; r < n.length; r++) {
              var i = n[r],
                a = i.getSnapshot;
              i = i.value;
              try {
                if (!Pr(a(), i)) return !1;
              } catch {
                return !1;
              }
            }
          if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
            ((n.return = t), (t = n));
          else {
            if (t === e) break;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) return !0;
              t = t.return;
            }
            ((t.sibling.return = t.return), (t = t.sibling));
          }
        }
        return !0;
      }
      function yu(e, t, n, r) {
        ((t &= ~ql),
          (t &= ~Kl),
          (e.suspendedLanes |= t),
          (e.pingedLanes &= ~t),
          r && (e.warmLanes |= t),
          (r = e.expirationTimes));
        for (var i = t; 0 < i; ) {
          var a = 31 - Ye(i),
            o = 1 << a;
          ((r[a] = -1), (i &= ~o));
        }
        n !== 0 && ut(e, n, t);
      }
      function bu() {
        return K & 6 ? !0 : (id(0, !1), !1);
      }
      function xu() {
        if (J !== null) {
          if (X === 0) var e = J.return;
          else
            ((e = J), (aa = ia = null), Po(e), (Ha = null), (Ua = 0), (e = J));
          for (; e !== null; ) (Gc(e.alternate, e), (e = e.return));
          J = null;
        }
      }
      function Su(e, t) {
        var n = e.timeoutHandle;
        (n !== -1 && ((e.timeoutHandle = -1), qd(n)),
          (n = e.cancelPendingCommit),
          n !== null && ((e.cancelPendingCommit = null), n()),
          (su = 0),
          xu(),
          (q = e),
          (J = n = Si(e.current, null)),
          (Y = t),
          (X = 0),
          (zl = null),
          (Bl = !1),
          (Vl = it(e, t)),
          (Hl = !1),
          (Yl = Jl = ql = Kl = Gl = Wl = 0),
          (Zl = Xl = null),
          (Ql = !1),
          t & 8 && (t |= t & 32));
        var r = e.entangledLanes;
        if (r !== 0)
          for (e = e.entanglements, r &= t; 0 < r; ) {
            var i = 31 - Ye(r),
              a = 1 << i;
            ((t |= e[i]), (r &= ~a));
          }
        return ((Ul = t), fi(), n);
      }
      function Cu(e, t) {
        ((P = null),
          (w.H = Us),
          t === Na || t === Pa
            ? ((t = Ba()), (X = 3))
            : t === k
              ? ((t = Ba()), (X = 4))
              : (X =
                  t === sc
                    ? 8
                    : typeof t == `object` && t && typeof t.then == `function`
                      ? 6
                      : 1),
          (zl = t),
          J === null && ((Wl = 1), tc(e, Ai(t, e.current))));
      }
      function wu() {
        var e = M.current;
        return e === null
          ? !0
          : (Y & 4194048) === Y
            ? fo === null
            : (Y & 62914560) === Y || Y & 536870912
              ? e === fo
              : !1;
      }
      function Tu() {
        var e = w.H;
        return ((w.H = Us), e === null ? Us : e);
      }
      function Eu() {
        var e = w.A;
        return ((w.A = Ll), e);
      }
      function Du() {
        ((Wl = 4),
          Bl || ((Y & 4194048) !== Y && M.current !== null) || (Vl = !0),
          (!(Gl & 134217727) && !(Kl & 134217727)) ||
            q === null ||
            yu(q, Y, Jl, !1));
      }
      function Ou(e, t, n) {
        var r = K;
        K |= 2;
        var i = Tu(),
          a = Eu();
        ((q !== e || Y !== t) && ((nu = null), Su(e, t)), (t = !1));
        var o = Wl;
        a: do
          try {
            if (X !== 0 && J !== null) {
              var s = J,
                c = zl;
              switch (X) {
                case 8:
                  (xu(), (o = 6));
                  break a;
                case 3:
                case 2:
                case 9:
                case 6:
                  M.current === null && (t = !0);
                  var l = X;
                  if (((X = 0), (zl = null), Pu(e, s, c, l), n && Vl)) {
                    o = 0;
                    break a;
                  }
                  break;
                default:
                  ((l = X), (X = 0), (zl = null), Pu(e, s, c, l));
              }
            }
            (ku(), (o = Wl));
            break;
          } catch (t) {
            Cu(e, t);
          }
        while (1);
        return (
          t && e.shellSuspendCounter++,
          (aa = ia = null),
          (K = r),
          (w.H = i),
          (w.A = a),
          J === null && ((q = null), (Y = 0), fi()),
          o
        );
      }
      function ku() {
        for (; J !== null; ) Mu(J);
      }
      function Au(e, t) {
        var n = K;
        K |= 2;
        var r = Tu(),
          a = Eu();
        q !== e || Y !== t
          ? ((nu = null), (tu = Le() + 500), Su(e, t))
          : (Vl = it(e, t));
        a: do
          try {
            if (X !== 0 && J !== null) {
              t = J;
              var o = zl;
              b: switch (X) {
                case 1:
                  ((X = 0), (zl = null), Pu(e, t, o, 1));
                  break;
                case 2:
                case 9:
                  if (Ia(o)) {
                    ((X = 0), (zl = null), Nu(t));
                    break;
                  }
                  ((t = function () {
                    ((X !== 2 && X !== 9) || q !== e || (X = 7), rd(e));
                  }),
                    o.then(t, t));
                  break a;
                case 3:
                  X = 7;
                  break a;
                case 4:
                  X = 5;
                  break a;
                case 7:
                  Ia(o)
                    ? ((X = 0), (zl = null), Nu(t))
                    : ((X = 0), (zl = null), Pu(e, t, o, 7));
                  break;
                case 5:
                  var s = null;
                  switch (J.tag) {
                    case 26:
                      s = J.memoizedState;
                    case 5:
                    case 27:
                      var c = J;
                      if (s ? Wf(s) : c.stateNode.complete) {
                        ((X = 0), (zl = null));
                        var l = c.sibling;
                        if (l !== null) J = l;
                        else {
                          var u = c.return;
                          u === null ? (J = null) : ((J = u), Fu(u));
                        }
                        break b;
                      }
                  }
                  ((X = 0), (zl = null), Pu(e, t, o, 5));
                  break;
                case 6:
                  ((X = 0), (zl = null), Pu(e, t, o, 6));
                  break;
                case 8:
                  (xu(), (Wl = 6));
                  break a;
                default:
                  throw Error(i(462));
              }
            }
            ju();
            break;
          } catch (t) {
            Cu(e, t);
          }
        while (1);
        return (
          (aa = ia = null),
          (w.H = r),
          (w.A = a),
          (K = n),
          J === null ? ((q = null), (Y = 0), fi(), Wl) : 0
        );
      }
      function ju() {
        for (; J !== null && !Fe(); ) Mu(J);
      }
      function Mu(e) {
        var t = Lc(e.alternate, e, Ul);
        ((e.memoizedProps = e.pendingProps), t === null ? Fu(e) : (J = t));
      }
      function Nu(e) {
        var t = e,
          n = t.alternate;
        switch (t.tag) {
          case 15:
          case 0:
            t = xc(n, t, t.pendingProps, t.type, void 0, Y);
            break;
          case 11:
            t = xc(n, t, t.pendingProps, t.type.render, t.ref, Y);
            break;
          case 5:
            Po(t);
          default:
            (Gc(n, t), (t = J = Ci(t, Ul)), (t = Lc(n, t, Ul)));
        }
        ((e.memoizedProps = e.pendingProps), t === null ? Fu(e) : (J = t));
      }
      function Pu(e, t, n, r) {
        ((aa = ia = null), Po(t), (Ha = null), (Ua = 0));
        var i = t.return;
        try {
          if (oc(e, i, t, n, Y)) {
            ((Wl = 1), tc(e, Ai(n, e.current)), (J = null));
            return;
          }
        } catch (t) {
          if (i !== null) throw ((J = i), t);
          ((Wl = 1), tc(e, Ai(n, e.current)), (J = null));
          return;
        }
        t.flags & 32768
          ? (D || r === 1
              ? (e = !0)
              : Vl || Y & 536870912
                ? (e = !1)
                : ((Bl = e = !0),
                  (r === 2 || r === 9 || r === 3 || r === 6) &&
                    ((r = M.current),
                    r !== null && r.tag === 13 && (r.flags |= 16384))),
            Iu(t, e))
          : Fu(t);
      }
      function Fu(e) {
        var t = e;
        do {
          if (t.flags & 32768) {
            Iu(t, Bl);
            return;
          }
          e = t.return;
          var n = Uc(t.alternate, t, Ul);
          if (n !== null) {
            J = n;
            return;
          }
          if (((t = t.sibling), t !== null)) {
            J = t;
            return;
          }
          J = t = e;
        } while (t !== null);
        Wl === 0 && (Wl = 5);
      }
      function Iu(e, t) {
        do {
          var n = Wc(e.alternate, e);
          if (n !== null) {
            ((n.flags &= 32767), (J = n));
            return;
          }
          if (
            ((n = e.return),
            n !== null &&
              ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
            !t && ((e = e.sibling), e !== null))
          ) {
            J = e;
            return;
          }
          J = e = n;
        } while (e !== null);
        ((Wl = 6), (J = null));
      }
      function Lu(e, t, n, r, a, o, s, c, l) {
        e.cancelPendingCommit = null;
        do Hu();
        while (iu !== 0);
        if (K & 6) throw Error(i(327));
        if (t !== null) {
          if (t === e.current) throw Error(i(177));
          if (
            ((o = t.lanes | t.childLanes),
            (o |= di),
            lt(e, n, o, s, c, l),
            e === q && ((J = q = null), (Y = 0)),
            (ou = t),
            (au = e),
            (su = n),
            (cu = o),
            (lu = a),
            (uu = r),
            t.subtreeFlags & 10256 || t.flags & 10256
              ? ((e.callbackNode = null),
                (e.callbackPriority = 0),
                Xu(Ve, function () {
                  return (Uu(), null);
                }))
              : ((e.callbackNode = null), (e.callbackPriority = 0)),
            (r = !!(t.flags & 13878)),
            t.subtreeFlags & 13878 || r)
          ) {
            ((r = w.T), (w.T = null), (a = T.p), (T.p = 2), (s = K), (K |= 4));
            try {
              U(e, t, n);
            } finally {
              ((K = s), (T.p = a), (w.T = r));
            }
          }
          ((iu = 1), Ru(), zu(), Bu());
        }
      }
      function Ru() {
        if (iu === 1) {
          iu = 0;
          var e = au,
            t = ou,
            n = !!(t.flags & 13878);
          if (t.subtreeFlags & 13878 || n) {
            ((n = w.T), (w.T = null));
            var r = T.p;
            T.p = 2;
            var i = K;
            K |= 4;
            try {
              _l(t, e);
              var a = zd,
                o = zr(e.containerInfo),
                s = a.focusedElem,
                c = a.selectionRange;
              if (
                o !== s &&
                s &&
                s.ownerDocument &&
                Rr(s.ownerDocument.documentElement, s)
              ) {
                if (c !== null && Br(s)) {
                  var l = c.start,
                    u = c.end;
                  if ((u === void 0 && (u = l), `selectionStart` in s))
                    ((s.selectionStart = l),
                      (s.selectionEnd = Math.min(u, s.value.length)));
                  else {
                    var d = s.ownerDocument || document,
                      f = (d && d.defaultView) || window;
                    if (f.getSelection) {
                      var p = f.getSelection(),
                        m = s.textContent.length,
                        h = Math.min(c.start, m),
                        g = c.end === void 0 ? h : Math.min(c.end, m);
                      !p.extend && h > g && ((o = g), (g = h), (h = o));
                      var _ = Lr(s, h),
                        v = Lr(s, g);
                      if (
                        _ &&
                        v &&
                        (p.rangeCount !== 1 ||
                          p.anchorNode !== _.node ||
                          p.anchorOffset !== _.offset ||
                          p.focusNode !== v.node ||
                          p.focusOffset !== v.offset)
                      ) {
                        var y = d.createRange();
                        (y.setStart(_.node, _.offset),
                          p.removeAllRanges(),
                          h > g
                            ? (p.addRange(y), p.extend(v.node, v.offset))
                            : (y.setEnd(v.node, v.offset), p.addRange(y)));
                      }
                    }
                  }
                }
                for (d = [], p = s; (p = p.parentNode); )
                  p.nodeType === 1 &&
                    d.push({
                      element: p,
                      left: p.scrollLeft,
                      top: p.scrollTop,
                    });
                for (
                  typeof s.focus == `function` && s.focus(), s = 0;
                  s < d.length;
                  s++
                ) {
                  var b = d[s];
                  ((b.element.scrollLeft = b.left),
                    (b.element.scrollTop = b.top));
                }
              }
              ((sp = !!Rd), (zd = Rd = null));
            } finally {
              ((K = i), (T.p = r), (w.T = n));
            }
          }
          ((e.current = t), (iu = 2));
        }
      }
      function zu() {
        if (iu === 2) {
          iu = 0;
          var e = au,
            t = ou,
            n = !!(t.flags & 8772);
          if (t.subtreeFlags & 8772 || n) {
            ((n = w.T), (w.T = null));
            var r = T.p;
            T.p = 2;
            var i = K;
            K |= 4;
            try {
              sl(e, t.alternate, t);
            } finally {
              ((K = i), (T.p = r), (w.T = n));
            }
          }
          iu = 3;
        }
      }
      function Bu() {
        if (iu === 4 || iu === 3) {
          ((iu = 0), Ie());
          var e = au,
            t = ou,
            n = su,
            r = uu;
          t.subtreeFlags & 10256 || t.flags & 10256
            ? (iu = 5)
            : ((iu = 0), (ou = au = null), Vu(e, e.pendingLanes));
          var i = e.pendingLanes;
          if (
            (i === 0 && (ru = null),
            mt(n),
            (t = t.stateNode),
            qe && typeof qe.onCommitFiberRoot == `function`)
          )
            try {
              qe.onCommitFiberRoot(
                Ke,
                t,
                void 0,
                (t.current.flags & 128) == 128,
              );
            } catch {}
          if (r !== null) {
            ((t = w.T), (i = T.p), (T.p = 2), (w.T = null));
            try {
              for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
                var s = r[o];
                a(s.value, { componentStack: s.stack });
              }
            } finally {
              ((w.T = t), (T.p = i));
            }
          }
          (su & 3 && Hu(),
            rd(e),
            (i = e.pendingLanes),
            n & 261930 && i & 42
              ? e === fu
                ? du++
                : ((du = 0), (fu = e))
              : (du = 0),
            id(0, !1));
        }
      }
      function Vu(e, t) {
        (e.pooledCacheLanes &= t) === 0 &&
          ((t = e.pooledCache), t != null && ((e.pooledCache = null), ba(t)));
      }
      function Hu() {
        return (Ru(), zu(), Bu(), Uu());
      }
      function Uu() {
        if (iu !== 5) return !1;
        var e = au,
          t = cu;
        cu = 0;
        var n = mt(su),
          r = w.T,
          a = T.p;
        try {
          ((T.p = 32 > n ? 32 : n), (w.T = null), (n = lu), (lu = null));
          var o = au,
            s = su;
          if (((iu = 0), (ou = au = null), (su = 0), K & 6))
            throw Error(i(331));
          var c = K;
          if (
            ((K |= 4),
            Pl(o.current),
            El(o, o.current, s, n),
            (K = c),
            id(0, !1),
            qe && typeof qe.onPostCommitFiberRoot == `function`)
          )
            try {
              qe.onPostCommitFiberRoot(Ke, o);
            } catch {}
          return !0;
        } finally {
          ((T.p = a), (w.T = r), Vu(e, t));
        }
      }
      function Wu(e, t, n) {
        ((t = Ai(n, t)),
          (t = rc(e.stateNode, t, 2)),
          (e = eo(e, t, 2)),
          e !== null && (ct(e, 2), rd(e)));
      }
      function Z(e, t, n) {
        if (e.tag === 3) Wu(e, e, n);
        else
          for (; t !== null; ) {
            if (t.tag === 3) {
              Wu(t, e, n);
              break;
            }
            if (t.tag === 1) {
              var r = t.stateNode;
              if (
                typeof t.type.getDerivedStateFromError == `function` ||
                (typeof r.componentDidCatch == `function` &&
                  (ru === null || !ru.has(r)))
              ) {
                ((e = Ai(n, e)),
                  (n = ic(2)),
                  (r = eo(t, n, 2)),
                  r !== null && (ac(n, r, t, e), ct(r, 2), rd(r)));
                break;
              }
            }
            t = t.return;
          }
      }
      function Gu(e, t, n) {
        var r = e.pingCache;
        if (r === null) {
          r = e.pingCache = new Rl();
          var i = new Set();
          r.set(t, i);
        } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
        i.has(n) ||
          ((Hl = !0), i.add(n), (e = Ku.bind(null, e, t, n)), t.then(e, e));
      }
      function Ku(e, t, n) {
        var r = e.pingCache;
        (r !== null && r.delete(t),
          (e.pingedLanes |= e.suspendedLanes & n),
          (e.warmLanes &= ~n),
          q === e &&
            (Y & n) === n &&
            (Wl === 4 || (Wl === 3 && (Y & 62914560) === Y && 300 > Le() - $l)
              ? !(K & 2) && Su(e, 0)
              : (ql |= n),
            Yl === Y && (Yl = 0)),
          rd(e));
      }
      function qu(e, t) {
        (t === 0 && (t = ot()),
          (e = hi(e, t)),
          e !== null && (ct(e, t), rd(e)));
      }
      function Ju(e) {
        var t = e.memoizedState,
          n = 0;
        (t !== null && (n = t.retryLane), qu(e, n));
      }
      function Yu(e, t) {
        var n = 0;
        switch (e.tag) {
          case 31:
          case 13:
            var r = e.stateNode,
              a = e.memoizedState;
            a !== null && (n = a.retryLane);
            break;
          case 19:
            r = e.stateNode;
            break;
          case 22:
            r = e.stateNode._retryCache;
            break;
          default:
            throw Error(i(314));
        }
        (r !== null && r.delete(t), qu(e, n));
      }
      function Xu(e, t) {
        return Ne(e, t);
      }
      var Zu = null,
        Qu = null,
        $u = !1,
        ed = !1,
        td = !1,
        nd = 0;
      function rd(e) {
        (e !== Qu &&
          e.next === null &&
          (Qu === null ? (Zu = Qu = e) : (Qu = Qu.next = e)),
          (ed = !0),
          $u || (($u = !0), ud()));
      }
      function id(e, t) {
        if (!td && ed) {
          td = !0;
          do
            for (var n = !1, r = Zu; r !== null; ) {
              if (!t) {
                if (e !== 0) {
                  var i = r.pendingLanes;
                  if (i === 0) var a = 0;
                  else {
                    var o = r.suspendedLanes,
                      s = r.pingedLanes;
                    ((a = (1 << (31 - Ye(42 | e) + 1)) - 1),
                      (a &= i & ~(o & ~s)),
                      (a =
                        a & 201326741 ? (a & 201326741) | 1 : a ? a | 2 : 0));
                  }
                  a !== 0 && ((n = !0), ld(r, a));
                } else
                  ((a = Y),
                    (a = rt(
                      r,
                      r === q ? a : 0,
                      r.cancelPendingCommit !== null || r.timeoutHandle !== -1,
                    )),
                    !(a & 3) || it(r, a) || ((n = !0), ld(r, a)));
              }
              r = r.next;
            }
          while (n);
          td = !1;
        }
      }
      function ad() {
        od();
      }
      function od() {
        ed = $u = !1;
        var e = 0;
        nd !== 0 && Gd() && (e = nd);
        for (var t = Le(), n = null, r = Zu; r !== null; ) {
          var i = r.next,
            a = sd(r, t);
          (a === 0
            ? ((r.next = null),
              n === null ? (Zu = i) : (n.next = i),
              i === null && (Qu = n))
            : ((n = r), (e !== 0 || a & 3) && (ed = !0)),
            (r = i));
        }
        ((iu !== 0 && iu !== 5) || id(e, !1), nd !== 0 && (nd = 0));
      }
      function sd(e, t) {
        for (
          var n = e.suspendedLanes,
            r = e.pingedLanes,
            i = e.expirationTimes,
            a = e.pendingLanes & -62914561;
          0 < a;
        ) {
          var o = 31 - Ye(a),
            s = 1 << o,
            c = i[o];
          (c === -1
            ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = at(s, t))
            : c <= t && (e.expiredLanes |= s),
            (a &= ~s));
        }
        if (
          ((t = q),
          (n = Y),
          (n = rt(
            e,
            e === t ? n : 0,
            e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
          )),
          (r = e.callbackNode),
          n === 0 ||
            (e === t && (X === 2 || X === 9)) ||
            e.cancelPendingCommit !== null)
        )
          return (
            r !== null && r !== null && Pe(r),
            (e.callbackNode = null),
            (e.callbackPriority = 0)
          );
        if (!(n & 3) || it(e, n)) {
          if (((t = n & -n), t === e.callbackPriority)) return t;
          switch ((r !== null && Pe(r), mt(n))) {
            case 2:
            case 8:
              n = Be;
              break;
            case 32:
              n = Ve;
              break;
            case 268435456:
              n = Ue;
              break;
            default:
              n = Ve;
          }
          return (
            (r = cd.bind(null, e)),
            (n = Ne(n, r)),
            (e.callbackPriority = t),
            (e.callbackNode = n),
            t
          );
        }
        return (
          r !== null && r !== null && Pe(r),
          (e.callbackPriority = 2),
          (e.callbackNode = null),
          2
        );
      }
      function cd(e, t) {
        if (iu !== 0 && iu !== 5)
          return ((e.callbackNode = null), (e.callbackPriority = 0), null);
        var n = e.callbackNode;
        if (Hu() && e.callbackNode !== n) return null;
        var r = Y;
        return (
          (r = rt(
            e,
            e === q ? r : 0,
            e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
          )),
          r === 0
            ? null
            : (gu(e, r, t),
              sd(e, Le()),
              e.callbackNode != null && e.callbackNode === n
                ? cd.bind(null, e)
                : null)
        );
      }
      function ld(e, t) {
        if (Hu()) return null;
        gu(e, t, !0);
      }
      function ud() {
        Yd(function () {
          K & 6 ? Ne(ze, ad) : od();
        });
      }
      function dd() {
        if (nd === 0) {
          var e = Ca;
          (e === 0 && ((e = $e), ($e <<= 1), !($e & 261888) && ($e = 256)),
            (nd = e));
        }
        return nd;
      }
      function fd(e) {
        return e == null || typeof e == `symbol` || typeof e == `boolean`
          ? null
          : typeof e == `function`
            ? e
            : dn(`` + e);
      }
      function pd(e, t) {
        var n = t.ownerDocument.createElement(`input`);
        return (
          (n.name = t.name),
          (n.value = t.value),
          e.id && n.setAttribute(`form`, e.id),
          t.parentNode.insertBefore(n, t),
          (e = new FormData(e)),
          n.parentNode.removeChild(n),
          e
        );
      }
      function md(e, t, n, r, i) {
        if (t === `submit` && n && n.stateNode === i) {
          var a = fd((i[yt] || null).action),
            o = r.submitter;
          o &&
            ((t = (t = o[yt] || null)
              ? fd(t.formAction)
              : o.getAttribute(`formAction`)),
            t !== null && ((a = t), (o = null)));
          var s = new Nn(`action`, `action`, null, r, i);
          e.push({
            event: s,
            listeners: [
              {
                instance: null,
                listener: function () {
                  if (r.defaultPrevented) {
                    if (nd !== 0) {
                      var e = o ? pd(i, o) : new FormData(i);
                      ks(
                        n,
                        { pending: !0, data: e, method: i.method, action: a },
                        null,
                        e,
                      );
                    }
                  } else
                    typeof a == `function` &&
                      (s.preventDefault(),
                      (e = o ? pd(i, o) : new FormData(i)),
                      ks(
                        n,
                        { pending: !0, data: e, method: i.method, action: a },
                        a,
                        e,
                      ));
                },
                currentTarget: i,
              },
            ],
          });
        }
      }
      for (var hd = 0; hd < oi.length; hd++) {
        var gd = oi[hd];
        si(gd.toLowerCase(), `on` + (gd[0].toUpperCase() + gd.slice(1)));
      }
      (si(Qr, `onAnimationEnd`),
        si($r, `onAnimationIteration`),
        si(ei, `onAnimationStart`),
        si(`dblclick`, `onDoubleClick`),
        si(`focusin`, `onFocus`),
        si(`focusout`, `onBlur`),
        si(ti, `onTransitionRun`),
        si(ni, `onTransitionStart`),
        si(ri, `onTransitionCancel`),
        si(ii, `onTransitionEnd`),
        Ft(`onMouseEnter`, [`mouseout`, `mouseover`]),
        Ft(`onMouseLeave`, [`mouseout`, `mouseover`]),
        Ft(`onPointerEnter`, [`pointerout`, `pointerover`]),
        Ft(`onPointerLeave`, [`pointerout`, `pointerover`]),
        Pt(
          `onChange`,
          `change click focusin focusout input keydown keyup selectionchange`.split(
            ` `,
          ),
        ),
        Pt(
          `onSelect`,
          `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(
            ` `,
          ),
        ),
        Pt(`onBeforeInput`, [
          `compositionend`,
          `keypress`,
          `textInput`,
          `paste`,
        ]),
        Pt(
          `onCompositionEnd`,
          `compositionend focusout keydown keypress keyup mousedown`.split(` `),
        ),
        Pt(
          `onCompositionStart`,
          `compositionstart focusout keydown keypress keyup mousedown`.split(
            ` `,
          ),
        ),
        Pt(
          `onCompositionUpdate`,
          `compositionupdate focusout keydown keypress keyup mousedown`.split(
            ` `,
          ),
        ));
      var _d =
          `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(
            ` `,
          ),
        vd = new Set(
          `beforetoggle cancel close invalid load scroll scrollend toggle`
            .split(` `)
            .concat(_d),
        );
      function yd(e, t) {
        t = !!(t & 4);
        for (var n = 0; n < e.length; n++) {
          var r = e[n],
            i = r.event;
          r = r.listeners;
          a: {
            var a = void 0;
            if (t)
              for (var o = r.length - 1; 0 <= o; o--) {
                var s = r[o],
                  c = s.instance,
                  l = s.currentTarget;
                if (((s = s.listener), c !== a && i.isPropagationStopped()))
                  break a;
                ((a = s), (i.currentTarget = l));
                try {
                  a(i);
                } catch (e) {
                  ci(e);
                }
                ((i.currentTarget = null), (a = c));
              }
            else
              for (o = 0; o < r.length; o++) {
                if (
                  ((s = r[o]),
                  (c = s.instance),
                  (l = s.currentTarget),
                  (s = s.listener),
                  c !== a && i.isPropagationStopped())
                )
                  break a;
                ((a = s), (i.currentTarget = l));
                try {
                  a(i);
                } catch (e) {
                  ci(e);
                }
                ((i.currentTarget = null), (a = c));
              }
          }
        }
      }
      function Q(e, t) {
        var n = t[xt];
        n === void 0 && (n = t[xt] = new Set());
        var r = e + `__bubble`;
        n.has(r) || (Cd(t, e, 2, !1), n.add(r));
      }
      function bd(e, t, n) {
        var r = 0;
        (t && (r |= 4), Cd(n, e, r, t));
      }
      var xd = `_reactListening` + Math.random().toString(36).slice(2);
      function Sd(e) {
        if (!e[xd]) {
          ((e[xd] = !0),
            Mt.forEach(function (t) {
              t !== `selectionchange` &&
                (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
            }));
          var t = e.nodeType === 9 ? e : e.ownerDocument;
          t === null || t[xd] || ((t[xd] = !0), bd(`selectionchange`, !1, t));
        }
      }
      function Cd(e, t, n, r) {
        switch (mp(t)) {
          case 2:
            var i = cp;
            break;
          case 8:
            i = lp;
            break;
          default:
            i = up;
        }
        ((n = i.bind(null, t, n, e)),
          (i = void 0),
          !Sn ||
            (t !== `touchstart` && t !== `touchmove` && t !== `wheel`) ||
            (i = !0),
          r
            ? i === void 0
              ? e.addEventListener(t, n, !0)
              : e.addEventListener(t, n, { capture: !0, passive: i })
            : i === void 0
              ? e.addEventListener(t, n, !1)
              : e.addEventListener(t, n, { passive: i }));
      }
      function wd(e, t, n, r, i) {
        var a = r;
        if (!(t & 1) && !(t & 2) && r !== null)
          a: for (;;) {
            if (r === null) return;
            var s = r.tag;
            if (s === 3 || s === 4) {
              var c = r.stateNode.containerInfo;
              if (c === i) break;
              if (s === 4)
                for (s = r.return; s !== null; ) {
                  var l = s.tag;
                  if ((l === 3 || l === 4) && s.stateNode.containerInfo === i)
                    return;
                  s = s.return;
                }
              for (; c !== null; ) {
                if (((s = Dt(c)), s === null)) return;
                if (((l = s.tag), l === 5 || l === 6 || l === 26 || l === 27)) {
                  r = a = s;
                  continue a;
                }
                c = c.parentNode;
              }
            }
            r = r.return;
          }
        yn(function () {
          var r = a,
            i = mn(n),
            s = [];
          a: {
            var c = ai.get(e);
            if (c !== void 0) {
              var l = Nn,
                u = e;
              switch (e) {
                case `keypress`:
                  if (On(n) === 0) break a;
                case `keydown`:
                case `keyup`:
                  l = Zn;
                  break;
                case `focusin`:
                  ((u = `focus`), (l = Hn));
                  break;
                case `focusout`:
                  ((u = `blur`), (l = Hn));
                  break;
                case `beforeblur`:
                case `afterblur`:
                  l = Hn;
                  break;
                case `click`:
                  if (n.button === 2) break a;
                case `auxclick`:
                case `dblclick`:
                case `mousedown`:
                case `mousemove`:
                case `mouseup`:
                case `mouseout`:
                case `mouseover`:
                case `contextmenu`:
                  l = Bn;
                  break;
                case `drag`:
                case `dragend`:
                case `dragenter`:
                case `dragexit`:
                case `dragleave`:
                case `dragover`:
                case `dragstart`:
                case `drop`:
                  l = Vn;
                  break;
                case `touchcancel`:
                case `touchend`:
                case `touchmove`:
                case `touchstart`:
                  l = $n;
                  break;
                case Qr:
                case $r:
                case ei:
                  l = Un;
                  break;
                case ii:
                  l = er;
                  break;
                case `scroll`:
                case `scrollend`:
                  l = Fn;
                  break;
                case `wheel`:
                  l = tr;
                  break;
                case `copy`:
                case `cut`:
                case `paste`:
                  l = Wn;
                  break;
                case `gotpointercapture`:
                case `lostpointercapture`:
                case `pointercancel`:
                case `pointerdown`:
                case `pointermove`:
                case `pointerout`:
                case `pointerover`:
                case `pointerup`:
                  l = Qn;
                  break;
                case `toggle`:
                case `beforetoggle`:
                  l = nr;
              }
              var d = !!(t & 4),
                f = !d && (e === `scroll` || e === `scrollend`),
                p = d ? (c === null ? null : c + `Capture`) : c;
              d = [];
              for (var m = r, h; m !== null; ) {
                var g = m;
                if (
                  ((h = g.stateNode),
                  (g = g.tag),
                  (g !== 5 && g !== 26 && g !== 27) ||
                    h === null ||
                    p === null ||
                    ((g = bn(m, p)), g != null && d.push(Td(m, g, h))),
                  f)
                )
                  break;
                m = m.return;
              }
              0 < d.length &&
                ((c = new l(c, u, null, n, i)),
                s.push({ event: c, listeners: d }));
            }
          }
          if (!(t & 7)) {
            a: {
              if (
                ((c = e === `mouseover` || e === `pointerover`),
                (l = e === `mouseout` || e === `pointerout`),
                c &&
                  n !== pn &&
                  (u = n.relatedTarget || n.fromElement) &&
                  (Dt(u) || u[bt]))
              )
                break a;
              if (
                (l || c) &&
                ((c =
                  i.window === i
                    ? i
                    : (c = i.ownerDocument)
                      ? c.defaultView || c.parentWindow
                      : window),
                l
                  ? ((u = n.relatedTarget || n.toElement),
                    (l = r),
                    (u = u ? Dt(u) : null),
                    u !== null &&
                      ((f = o(u)),
                      (d = u.tag),
                      u !== f || (d !== 5 && d !== 27 && d !== 6)) &&
                      (u = null))
                  : ((l = null), (u = r)),
                l !== u)
              ) {
                if (
                  ((d = Bn),
                  (g = `onMouseLeave`),
                  (p = `onMouseEnter`),
                  (m = `mouse`),
                  (e === `pointerout` || e === `pointerover`) &&
                    ((d = Qn),
                    (g = `onPointerLeave`),
                    (p = `onPointerEnter`),
                    (m = `pointer`)),
                  (f = l == null ? c : kt(l)),
                  (h = u == null ? c : kt(u)),
                  (c = new d(g, m + `leave`, l, n, i)),
                  (c.target = f),
                  (c.relatedTarget = h),
                  (g = null),
                  Dt(i) === r &&
                    ((d = new d(p, m + `enter`, u, n, i)),
                    (d.target = h),
                    (d.relatedTarget = f),
                    (g = d)),
                  (f = g),
                  l && u)
                )
                  b: {
                    for (d = Dd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
                    g = 0;
                    for (var _ = m; _; _ = d(_)) g++;
                    for (; 0 < h - g; ) ((p = d(p)), h--);
                    for (; 0 < g - h; ) ((m = d(m)), g--);
                    for (; h--; ) {
                      if (p === m || (m !== null && p === m.alternate)) {
                        d = p;
                        break b;
                      }
                      ((p = d(p)), (m = d(m)));
                    }
                    d = null;
                  }
                else d = null;
                (l !== null && Od(s, c, l, d, !1),
                  u !== null && f !== null && Od(s, f, u, d, !0));
              }
            }
            a: {
              if (
                ((c = r ? kt(r) : window),
                (l = c.nodeName && c.nodeName.toLowerCase()),
                l === `select` || (l === `input` && c.type === `file`))
              )
                var v = Sr;
              else if (gr(c)) {
                if (Cr) v = Mr;
                else {
                  v = Ar;
                  var y = kr;
                }
              } else
                ((l = c.nodeName),
                  !l ||
                  l.toLowerCase() !== `input` ||
                  (c.type !== `checkbox` && c.type !== `radio`)
                    ? r && cn(r.elementType) && (v = Sr)
                    : (v = jr));
              if ((v &&= v(e, r))) {
                _r(s, v, n, i);
                break a;
              }
              (y && y(e, c, r),
                e === `focusout` &&
                  r &&
                  c.type === `number` &&
                  r.memoizedProps.value != null &&
                  $t(c, `number`, c.value));
            }
            switch (((y = r ? kt(r) : window), e)) {
              case `focusin`:
                (gr(y) || y.contentEditable === `true`) &&
                  ((Hr = y), (Ur = r), (Wr = null));
                break;
              case `focusout`:
                Wr = Ur = Hr = null;
                break;
              case `mousedown`:
                Gr = !0;
                break;
              case `contextmenu`:
              case `mouseup`:
              case `dragend`:
                ((Gr = !1), Kr(s, n, i));
                break;
              case `selectionchange`:
                if (Vr) break;
              case `keydown`:
              case `keyup`:
                Kr(s, n, i);
            }
            var b;
            if (ir)
              b: {
                switch (e) {
                  case `compositionstart`:
                    var x = `onCompositionStart`;
                    break b;
                  case `compositionend`:
                    x = `onCompositionEnd`;
                    break b;
                  case `compositionupdate`:
                    x = `onCompositionUpdate`;
                    break b;
                }
                x = void 0;
              }
            else
              fr
                ? ur(e, n) && (x = `onCompositionEnd`)
                : e === `keydown` &&
                  n.keyCode === 229 &&
                  (x = `onCompositionStart`);
            (x &&
              (sr &&
                n.locale !== `ko` &&
                (fr || x !== `onCompositionStart`
                  ? x === `onCompositionEnd` && fr && (b = Dn())
                  : ((wn = i),
                    (Tn = `value` in wn ? wn.value : wn.textContent),
                    (fr = !0))),
              (y = Ed(r, x)),
              0 < y.length &&
                ((x = new Gn(x, e, null, n, i)),
                s.push({ event: x, listeners: y }),
                b ? (x.data = b) : ((b = dr(n)), b !== null && (x.data = b)))),
              (b = or ? pr(e, n) : mr(e, n)) &&
                ((x = Ed(r, `onBeforeInput`)),
                0 < x.length &&
                  ((y = new Gn(`onBeforeInput`, `beforeinput`, null, n, i)),
                  s.push({ event: y, listeners: x }),
                  (y.data = b))),
              md(s, e, r, n, i));
          }
          yd(s, t);
        });
      }
      function Td(e, t, n) {
        return { instance: e, listener: t, currentTarget: n };
      }
      function Ed(e, t) {
        for (var n = t + `Capture`, r = []; e !== null; ) {
          var i = e,
            a = i.stateNode;
          if (
            ((i = i.tag),
            (i !== 5 && i !== 26 && i !== 27) ||
              a === null ||
              ((i = bn(e, n)),
              i != null && r.unshift(Td(e, i, a)),
              (i = bn(e, t)),
              i != null && r.push(Td(e, i, a))),
            e.tag === 3)
          )
            return r;
          e = e.return;
        }
        return [];
      }
      function Dd(e) {
        if (e === null) return null;
        do e = e.return;
        while (e && e.tag !== 5 && e.tag !== 27);
        return e || null;
      }
      function Od(e, t, n, r, i) {
        for (var a = t._reactName, o = []; n !== null && n !== r; ) {
          var s = n,
            c = s.alternate,
            l = s.stateNode;
          if (((s = s.tag), c !== null && c === r)) break;
          ((s !== 5 && s !== 26 && s !== 27) ||
            l === null ||
            ((c = l),
            i
              ? ((l = bn(n, a)), l != null && o.unshift(Td(n, l, c)))
              : i || ((l = bn(n, a)), l != null && o.push(Td(n, l, c)))),
            (n = n.return));
        }
        o.length !== 0 && e.push({ event: t, listeners: o });
      }
      var kd = /\r\n?/g,
        Ad = /\u0000|\uFFFD/g;
      function jd(e) {
        return (typeof e == `string` ? e : `` + e)
          .replace(
            kd,
            `
`,
          )
          .replace(Ad, ``);
      }
      function Md(e, t) {
        return ((t = jd(t)), jd(e) === t);
      }
      function $(e, t, n, r, a, o) {
        switch (n) {
          case `children`:
            typeof r == `string`
              ? t === `body` || (t === `textarea` && r === ``) || rn(e, r)
              : (typeof r == `number` || typeof r == `bigint`) &&
                t !== `body` &&
                rn(e, `` + r);
            break;
          case `className`:
            Vt(e, `class`, r);
            break;
          case `tabIndex`:
            Vt(e, `tabindex`, r);
            break;
          case `dir`:
          case `role`:
          case `viewBox`:
          case `width`:
          case `height`:
            Vt(e, n, r);
            break;
          case `style`:
            sn(e, r, o);
            break;
          case `data`:
            if (t !== `object`) {
              Vt(e, `data`, r);
              break;
            }
          case `src`:
          case `href`:
            if (r === `` && (t !== `a` || n !== `href`)) {
              e.removeAttribute(n);
              break;
            }
            if (
              r == null ||
              typeof r == `function` ||
              typeof r == `symbol` ||
              typeof r == `boolean`
            ) {
              e.removeAttribute(n);
              break;
            }
            ((r = dn(`` + r)), e.setAttribute(n, r));
            break;
          case `action`:
          case `formAction`:
            if (typeof r == `function`) {
              e.setAttribute(
                n,
                `javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`,
              );
              break;
            }
            if (
              (typeof o == `function` &&
                (n === `formAction`
                  ? (t !== `input` && $(e, t, `name`, a.name, a, null),
                    $(e, t, `formEncType`, a.formEncType, a, null),
                    $(e, t, `formMethod`, a.formMethod, a, null),
                    $(e, t, `formTarget`, a.formTarget, a, null))
                  : ($(e, t, `encType`, a.encType, a, null),
                    $(e, t, `method`, a.method, a, null),
                    $(e, t, `target`, a.target, a, null))),
              r == null || typeof r == `symbol` || typeof r == `boolean`)
            ) {
              e.removeAttribute(n);
              break;
            }
            ((r = dn(`` + r)), e.setAttribute(n, r));
            break;
          case `onClick`:
            r != null && (e.onclick = fn);
            break;
          case `onScroll`:
            r != null && Q(`scroll`, e);
            break;
          case `onScrollEnd`:
            r != null && Q(`scrollend`, e);
            break;
          case `dangerouslySetInnerHTML`:
            if (r != null) {
              if (typeof r != `object` || !(`__html` in r)) throw Error(i(61));
              if (((n = r.__html), n != null)) {
                if (a.children != null) throw Error(i(60));
                e.innerHTML = n;
              }
            }
            break;
          case `multiple`:
            e.multiple = r && typeof r != `function` && typeof r != `symbol`;
            break;
          case `muted`:
            e.muted = r && typeof r != `function` && typeof r != `symbol`;
            break;
          case `suppressContentEditableWarning`:
          case `suppressHydrationWarning`:
          case `defaultValue`:
          case `defaultChecked`:
          case `innerHTML`:
          case `ref`:
            break;
          case `autoFocus`:
            break;
          case `xlinkHref`:
            if (
              r == null ||
              typeof r == `function` ||
              typeof r == `boolean` ||
              typeof r == `symbol`
            ) {
              e.removeAttribute(`xlink:href`);
              break;
            }
            ((n = dn(`` + r)),
              e.setAttributeNS(
                `http://www.w3.org/1999/xlink`,
                `xlink:href`,
                n,
              ));
            break;
          case `contentEditable`:
          case `spellCheck`:
          case `draggable`:
          case `value`:
          case `autoReverse`:
          case `externalResourcesRequired`:
          case `focusable`:
          case `preserveAlpha`:
            r != null && typeof r != `function` && typeof r != `symbol`
              ? e.setAttribute(n, `` + r)
              : e.removeAttribute(n);
            break;
          case `inert`:
          case `allowFullScreen`:
          case `async`:
          case `autoPlay`:
          case `controls`:
          case `default`:
          case `defer`:
          case `disabled`:
          case `disablePictureInPicture`:
          case `disableRemotePlayback`:
          case `formNoValidate`:
          case `hidden`:
          case `loop`:
          case `noModule`:
          case `noValidate`:
          case `open`:
          case `playsInline`:
          case `readOnly`:
          case `required`:
          case `reversed`:
          case `scoped`:
          case `seamless`:
          case `itemScope`:
            r && typeof r != `function` && typeof r != `symbol`
              ? e.setAttribute(n, ``)
              : e.removeAttribute(n);
            break;
          case `capture`:
          case `download`:
            !0 === r
              ? e.setAttribute(n, ``)
              : !1 !== r &&
                  r != null &&
                  typeof r != `function` &&
                  typeof r != `symbol`
                ? e.setAttribute(n, r)
                : e.removeAttribute(n);
            break;
          case `cols`:
          case `rows`:
          case `size`:
          case `span`:
            r != null &&
            typeof r != `function` &&
            typeof r != `symbol` &&
            !isNaN(r) &&
            1 <= r
              ? e.setAttribute(n, r)
              : e.removeAttribute(n);
            break;
          case `rowSpan`:
          case `start`:
            r == null ||
            typeof r == `function` ||
            typeof r == `symbol` ||
            isNaN(r)
              ? e.removeAttribute(n)
              : e.setAttribute(n, r);
            break;
          case `popover`:
            (Q(`beforetoggle`, e), Q(`toggle`, e), Bt(e, `popover`, r));
            break;
          case `xlinkActuate`:
            Ht(e, `http://www.w3.org/1999/xlink`, `xlink:actuate`, r);
            break;
          case `xlinkArcrole`:
            Ht(e, `http://www.w3.org/1999/xlink`, `xlink:arcrole`, r);
            break;
          case `xlinkRole`:
            Ht(e, `http://www.w3.org/1999/xlink`, `xlink:role`, r);
            break;
          case `xlinkShow`:
            Ht(e, `http://www.w3.org/1999/xlink`, `xlink:show`, r);
            break;
          case `xlinkTitle`:
            Ht(e, `http://www.w3.org/1999/xlink`, `xlink:title`, r);
            break;
          case `xlinkType`:
            Ht(e, `http://www.w3.org/1999/xlink`, `xlink:type`, r);
            break;
          case `xmlBase`:
            Ht(e, `http://www.w3.org/XML/1998/namespace`, `xml:base`, r);
            break;
          case `xmlLang`:
            Ht(e, `http://www.w3.org/XML/1998/namespace`, `xml:lang`, r);
            break;
          case `xmlSpace`:
            Ht(e, `http://www.w3.org/XML/1998/namespace`, `xml:space`, r);
            break;
          case `is`:
            Bt(e, `is`, r);
            break;
          case `innerText`:
          case `textContent`:
            break;
          default:
            (!(2 < n.length) ||
              (n[0] !== `o` && n[0] !== `O`) ||
              (n[1] !== `n` && n[1] !== `N`)) &&
              ((n = ln.get(n) || n), Bt(e, n, r));
        }
      }
      function Nd(e, t, n, r, a, o) {
        switch (n) {
          case `style`:
            sn(e, r, o);
            break;
          case `dangerouslySetInnerHTML`:
            if (r != null) {
              if (typeof r != `object` || !(`__html` in r)) throw Error(i(61));
              if (((n = r.__html), n != null)) {
                if (a.children != null) throw Error(i(60));
                e.innerHTML = n;
              }
            }
            break;
          case `children`:
            typeof r == `string`
              ? rn(e, r)
              : (typeof r == `number` || typeof r == `bigint`) && rn(e, `` + r);
            break;
          case `onScroll`:
            r != null && Q(`scroll`, e);
            break;
          case `onScrollEnd`:
            r != null && Q(`scrollend`, e);
            break;
          case `onClick`:
            r != null && (e.onclick = fn);
            break;
          case `suppressContentEditableWarning`:
          case `suppressHydrationWarning`:
          case `innerHTML`:
          case `ref`:
            break;
          case `innerText`:
          case `textContent`:
            break;
          default:
            if (!Nt.hasOwnProperty(n))
              a: {
                if (
                  n[0] === `o` &&
                  n[1] === `n` &&
                  ((a = n.endsWith(`Capture`)),
                  (t = n.slice(2, a ? n.length - 7 : void 0)),
                  (o = e[yt] || null),
                  (o = o == null ? null : o[n]),
                  typeof o == `function` && e.removeEventListener(t, o, a),
                  typeof r == `function`)
                ) {
                  (typeof o != `function` &&
                    o !== null &&
                    (n in e
                      ? (e[n] = null)
                      : e.hasAttribute(n) && e.removeAttribute(n)),
                    e.addEventListener(t, r, a));
                  break a;
                }
                n in e
                  ? (e[n] = r)
                  : !0 === r
                    ? e.setAttribute(n, ``)
                    : Bt(e, n, r);
              }
        }
      }
      function Pd(e, t, n) {
        switch (t) {
          case `div`:
          case `span`:
          case `svg`:
          case `path`:
          case `a`:
          case `g`:
          case `p`:
          case `li`:
            break;
          case `img`:
            (Q(`error`, e), Q(`load`, e));
            var r = !1,
              a = !1,
              o;
            for (o in n)
              if (n.hasOwnProperty(o)) {
                var s = n[o];
                if (s != null)
                  switch (o) {
                    case `src`:
                      r = !0;
                      break;
                    case `srcSet`:
                      a = !0;
                      break;
                    case `children`:
                    case `dangerouslySetInnerHTML`:
                      throw Error(i(137, t));
                    default:
                      $(e, t, o, s, n, null);
                  }
              }
            (a && $(e, t, `srcSet`, n.srcSet, n, null),
              r && $(e, t, `src`, n.src, n, null));
            return;
          case `input`:
            Q(`invalid`, e);
            var c = (o = s = a = null),
              l = null,
              u = null;
            for (r in n)
              if (n.hasOwnProperty(r)) {
                var d = n[r];
                if (d != null)
                  switch (r) {
                    case `name`:
                      a = d;
                      break;
                    case `type`:
                      s = d;
                      break;
                    case `checked`:
                      l = d;
                      break;
                    case `defaultChecked`:
                      u = d;
                      break;
                    case `value`:
                      o = d;
                      break;
                    case `defaultValue`:
                      c = d;
                      break;
                    case `children`:
                    case `dangerouslySetInnerHTML`:
                      if (d != null) throw Error(i(137, t));
                      break;
                    default:
                      $(e, t, r, d, n, null);
                  }
              }
            Qt(e, o, c, l, u, s, a, !1);
            return;
          case `select`:
            for (a in (Q(`invalid`, e), (r = s = o = null), n))
              if (n.hasOwnProperty(a) && ((c = n[a]), c != null))
                switch (a) {
                  case `value`:
                    o = c;
                    break;
                  case `defaultValue`:
                    s = c;
                    break;
                  case `multiple`:
                    r = c;
                  default:
                    $(e, t, a, c, n, null);
                }
            ((t = o),
              (n = s),
              (e.multiple = !!r),
              t == null ? n != null && en(e, !!r, n, !0) : en(e, !!r, t, !1));
            return;
          case `textarea`:
            for (s in (Q(`invalid`, e), (o = a = r = null), n))
              if (n.hasOwnProperty(s) && ((c = n[s]), c != null))
                switch (s) {
                  case `value`:
                    r = c;
                    break;
                  case `defaultValue`:
                    a = c;
                    break;
                  case `children`:
                    o = c;
                    break;
                  case `dangerouslySetInnerHTML`:
                    if (c != null) throw Error(i(91));
                    break;
                  default:
                    $(e, t, s, c, n, null);
                }
            nn(e, r, a, o);
            return;
          case `option`:
            for (l in n)
              if (n.hasOwnProperty(l) && ((r = n[l]), r != null))
                switch (l) {
                  case `selected`:
                    e.selected =
                      r && typeof r != `function` && typeof r != `symbol`;
                    break;
                  default:
                    $(e, t, l, r, n, null);
                }
            return;
          case `dialog`:
            (Q(`beforetoggle`, e),
              Q(`toggle`, e),
              Q(`cancel`, e),
              Q(`close`, e));
            break;
          case `iframe`:
          case `object`:
            Q(`load`, e);
            break;
          case `video`:
          case `audio`:
            for (r = 0; r < _d.length; r++) Q(_d[r], e);
            break;
          case `image`:
            (Q(`error`, e), Q(`load`, e));
            break;
          case `details`:
            Q(`toggle`, e);
            break;
          case `embed`:
          case `source`:
          case `link`:
            (Q(`error`, e), Q(`load`, e));
          case `area`:
          case `base`:
          case `br`:
          case `col`:
          case `hr`:
          case `keygen`:
          case `meta`:
          case `param`:
          case `track`:
          case `wbr`:
          case `menuitem`:
            for (u in n)
              if (n.hasOwnProperty(u) && ((r = n[u]), r != null))
                switch (u) {
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    throw Error(i(137, t));
                  default:
                    $(e, t, u, r, n, null);
                }
            return;
          default:
            if (cn(t)) {
              for (d in n)
                n.hasOwnProperty(d) &&
                  ((r = n[d]), r !== void 0 && Nd(e, t, d, r, n, void 0));
              return;
            }
        }
        for (c in n)
          n.hasOwnProperty(c) &&
            ((r = n[c]), r != null && $(e, t, c, r, n, null));
      }
      function Fd(e, t, n, r) {
        switch (t) {
          case `div`:
          case `span`:
          case `svg`:
          case `path`:
          case `a`:
          case `g`:
          case `p`:
          case `li`:
            break;
          case `input`:
            var a = null,
              o = null,
              s = null,
              c = null,
              l = null,
              u = null,
              d = null;
            for (m in n) {
              var f = n[m];
              if (n.hasOwnProperty(m) && f != null)
                switch (m) {
                  case `checked`:
                    break;
                  case `value`:
                    break;
                  case `defaultValue`:
                    l = f;
                  default:
                    r.hasOwnProperty(m) || $(e, t, m, null, r, f);
                }
            }
            for (var p in r) {
              var m = r[p];
              if (((f = n[p]), r.hasOwnProperty(p) && (m != null || f != null)))
                switch (p) {
                  case `type`:
                    o = m;
                    break;
                  case `name`:
                    a = m;
                    break;
                  case `checked`:
                    u = m;
                    break;
                  case `defaultChecked`:
                    d = m;
                    break;
                  case `value`:
                    s = m;
                    break;
                  case `defaultValue`:
                    c = m;
                    break;
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    if (m != null) throw Error(i(137, t));
                    break;
                  default:
                    m !== f && $(e, t, p, m, r, f);
                }
            }
            Zt(e, s, c, l, u, d, o, a);
            return;
          case `select`:
            for (o in ((m = s = c = p = null), n))
              if (((l = n[o]), n.hasOwnProperty(o) && l != null))
                switch (o) {
                  case `value`:
                    break;
                  case `multiple`:
                    m = l;
                  default:
                    r.hasOwnProperty(o) || $(e, t, o, null, r, l);
                }
            for (a in r)
              if (
                ((o = r[a]),
                (l = n[a]),
                r.hasOwnProperty(a) && (o != null || l != null))
              )
                switch (a) {
                  case `value`:
                    p = o;
                    break;
                  case `defaultValue`:
                    c = o;
                    break;
                  case `multiple`:
                    s = o;
                  default:
                    o !== l && $(e, t, a, o, r, l);
                }
            ((t = c),
              (n = s),
              (r = m),
              p == null
                ? !!r != !!n &&
                  (t == null ? en(e, !!n, n ? [] : ``, !1) : en(e, !!n, t, !0))
                : en(e, !!n, p, !1));
            return;
          case `textarea`:
            for (c in ((m = p = null), n))
              if (
                ((a = n[c]),
                n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c))
              )
                switch (c) {
                  case `value`:
                    break;
                  case `children`:
                    break;
                  default:
                    $(e, t, c, null, r, a);
                }
            for (s in r)
              if (
                ((a = r[s]),
                (o = n[s]),
                r.hasOwnProperty(s) && (a != null || o != null))
              )
                switch (s) {
                  case `value`:
                    p = a;
                    break;
                  case `defaultValue`:
                    m = a;
                    break;
                  case `children`:
                    break;
                  case `dangerouslySetInnerHTML`:
                    if (a != null) throw Error(i(91));
                    break;
                  default:
                    a !== o && $(e, t, s, a, r, o);
                }
            tn(e, p, m);
            return;
          case `option`:
            for (var h in n)
              if (
                ((p = n[h]),
                n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h))
              )
                switch (h) {
                  case `selected`:
                    e.selected = !1;
                    break;
                  default:
                    $(e, t, h, null, r, p);
                }
            for (l in r)
              if (
                ((p = r[l]),
                (m = n[l]),
                r.hasOwnProperty(l) && p !== m && (p != null || m != null))
              )
                switch (l) {
                  case `selected`:
                    e.selected =
                      p && typeof p != `function` && typeof p != `symbol`;
                    break;
                  default:
                    $(e, t, l, p, r, m);
                }
            return;
          case `img`:
          case `link`:
          case `area`:
          case `base`:
          case `br`:
          case `col`:
          case `embed`:
          case `hr`:
          case `keygen`:
          case `meta`:
          case `param`:
          case `source`:
          case `track`:
          case `wbr`:
          case `menuitem`:
            for (var g in n)
              ((p = n[g]),
                n.hasOwnProperty(g) &&
                  p != null &&
                  !r.hasOwnProperty(g) &&
                  $(e, t, g, null, r, p));
            for (u in r)
              if (
                ((p = r[u]),
                (m = n[u]),
                r.hasOwnProperty(u) && p !== m && (p != null || m != null))
              )
                switch (u) {
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    if (p != null) throw Error(i(137, t));
                    break;
                  default:
                    $(e, t, u, p, r, m);
                }
            return;
          default:
            if (cn(t)) {
              for (var _ in n)
                ((p = n[_]),
                  n.hasOwnProperty(_) &&
                    p !== void 0 &&
                    !r.hasOwnProperty(_) &&
                    Nd(e, t, _, void 0, r, p));
              for (d in r)
                ((p = r[d]),
                  (m = n[d]),
                  !r.hasOwnProperty(d) ||
                    p === m ||
                    (p === void 0 && m === void 0) ||
                    Nd(e, t, d, p, r, m));
              return;
            }
        }
        for (var v in n)
          ((p = n[v]),
            n.hasOwnProperty(v) &&
              p != null &&
              !r.hasOwnProperty(v) &&
              $(e, t, v, null, r, p));
        for (f in r)
          ((p = r[f]),
            (m = n[f]),
            !r.hasOwnProperty(f) ||
              p === m ||
              (p == null && m == null) ||
              $(e, t, f, p, r, m));
      }
      function Id(e) {
        switch (e) {
          case `css`:
          case `script`:
          case `font`:
          case `img`:
          case `image`:
          case `input`:
          case `link`:
            return !0;
          default:
            return !1;
        }
      }
      function Ld() {
        if (typeof performance.getEntriesByType == `function`) {
          for (
            var e = 0,
              t = 0,
              n = performance.getEntriesByType(`resource`),
              r = 0;
            r < n.length;
            r++
          ) {
            var i = n[r],
              a = i.transferSize,
              o = i.initiatorType,
              s = i.duration;
            if (a && s && Id(o)) {
              for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
                var c = n[r],
                  l = c.startTime;
                if (l > s) break;
                var u = c.transferSize,
                  d = c.initiatorType;
                u &&
                  Id(d) &&
                  ((c = c.responseEnd),
                  (o += u * (c < s ? 1 : (s - l) / (c - l))));
              }
              if ((--r, (t += (8 * (a + o)) / (i.duration / 1e3)), e++, 10 < e))
                break;
            }
          }
          if (0 < e) return t / e / 1e6;
        }
        return navigator.connection &&
          ((e = navigator.connection.downlink), typeof e == `number`)
          ? e
          : 5;
      }
      var Rd = null,
        zd = null;
      function Bd(e) {
        return e.nodeType === 9 ? e : e.ownerDocument;
      }
      function Vd(e) {
        switch (e) {
          case `http://www.w3.org/2000/svg`:
            return 1;
          case `http://www.w3.org/1998/Math/MathML`:
            return 2;
          default:
            return 0;
        }
      }
      function Hd(e, t) {
        if (e === 0)
          switch (t) {
            case `svg`:
              return 1;
            case `math`:
              return 2;
            default:
              return 0;
          }
        return e === 1 && t === `foreignObject` ? 0 : e;
      }
      function Ud(e, t) {
        return (
          e === `textarea` ||
          e === `noscript` ||
          typeof t.children == `string` ||
          typeof t.children == `number` ||
          typeof t.children == `bigint` ||
          (typeof t.dangerouslySetInnerHTML == `object` &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
        );
      }
      var Wd = null;
      function Gd() {
        var e = window.event;
        return e && e.type === `popstate`
          ? e !== Wd && ((Wd = e), !0)
          : ((Wd = null), !1);
      }
      var Kd = typeof setTimeout == `function` ? setTimeout : void 0,
        qd = typeof clearTimeout == `function` ? clearTimeout : void 0,
        Jd = typeof Promise == `function` ? Promise : void 0,
        Yd =
          typeof queueMicrotask == `function`
            ? queueMicrotask
            : Jd === void 0
              ? Kd
              : function (e) {
                  return Jd.resolve(null).then(e).catch(Xd);
                };
      function Xd(e) {
        setTimeout(function () {
          throw e;
        });
      }
      function Zd(e) {
        return e === `head`;
      }
      function Qd(e, t) {
        var n = t,
          r = 0;
        do {
          var i = n.nextSibling;
          if ((e.removeChild(n), i && i.nodeType === 8)) {
            if (((n = i.data), n === `/$` || n === `/&`)) {
              if (r === 0) {
                (e.removeChild(i), Np(t));
                return;
              }
              r--;
            } else if (
              n === `$` ||
              n === `$?` ||
              n === `$~` ||
              n === `$!` ||
              n === `&`
            )
              r++;
            else if (n === `html`) pf(e.ownerDocument.documentElement);
            else if (n === `head`) {
              ((n = e.ownerDocument.head), pf(n));
              for (var a = n.firstChild; a; ) {
                var o = a.nextSibling,
                  s = a.nodeName;
                (a[Tt] ||
                  s === `SCRIPT` ||
                  s === `STYLE` ||
                  (s === `LINK` && a.rel.toLowerCase() === `stylesheet`) ||
                  n.removeChild(a),
                  (a = o));
              }
            } else n === `body` && pf(e.ownerDocument.body);
          }
          n = i;
        } while (n);
        Np(t);
      }
      function $d(e, t) {
        var n = e;
        e = 0;
        do {
          var r = n.nextSibling;
          if (
            (n.nodeType === 1
              ? t
                ? ((n._stashedDisplay = n.style.display),
                  (n.style.display = `none`))
                : ((n.style.display = n._stashedDisplay || ``),
                  n.getAttribute(`style`) === `` && n.removeAttribute(`style`))
              : n.nodeType === 3 &&
                (t
                  ? ((n._stashedText = n.nodeValue), (n.nodeValue = ``))
                  : (n.nodeValue = n._stashedText || ``)),
            r && r.nodeType === 8)
          ) {
            if (((n = r.data), n === `/$`)) {
              if (e === 0) break;
              e--;
            } else (n !== `$` && n !== `$?` && n !== `$~` && n !== `$!`) || e++;
          }
          n = r;
        } while (n);
      }
      function ef(e) {
        var t = e.firstChild;
        for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
          var n = t;
          switch (((t = t.nextSibling), n.nodeName)) {
            case `HTML`:
            case `HEAD`:
            case `BODY`:
              (ef(n), Et(n));
              continue;
            case `SCRIPT`:
            case `STYLE`:
              continue;
            case `LINK`:
              if (n.rel.toLowerCase() === `stylesheet`) continue;
          }
          e.removeChild(n);
        }
      }
      function tf(e, t, n, r) {
        for (; e.nodeType === 1; ) {
          var i = n;
          if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
            if (!r && (e.nodeName !== `INPUT` || e.type !== `hidden`)) break;
          } else if (!r) {
            if (t === `input` && e.type === `hidden`) {
              var a = i.name == null ? null : `` + i.name;
              if (i.type === `hidden` && e.getAttribute(`name`) === a) return e;
            } else return e;
          } else if (!e[Tt])
            switch (t) {
              case `meta`:
                if (!e.hasAttribute(`itemprop`)) break;
                return e;
              case `link`:
                if (
                  ((a = e.getAttribute(`rel`)),
                  (a === `stylesheet` && e.hasAttribute(`data-precedence`)) ||
                    a !== i.rel ||
                    e.getAttribute(`href`) !==
                      (i.href == null || i.href === `` ? null : i.href) ||
                    e.getAttribute(`crossorigin`) !==
                      (i.crossOrigin == null ? null : i.crossOrigin) ||
                    e.getAttribute(`title`) !==
                      (i.title == null ? null : i.title))
                )
                  break;
                return e;
              case `style`:
                if (e.hasAttribute(`data-precedence`)) break;
                return e;
              case `script`:
                if (
                  ((a = e.getAttribute(`src`)),
                  (a !== (i.src == null ? null : i.src) ||
                    e.getAttribute(`type`) !==
                      (i.type == null ? null : i.type) ||
                    e.getAttribute(`crossorigin`) !==
                      (i.crossOrigin == null ? null : i.crossOrigin)) &&
                    a &&
                    e.hasAttribute(`async`) &&
                    !e.hasAttribute(`itemprop`))
                )
                  break;
                return e;
              default:
                return e;
            }
          if (((e = cf(e.nextSibling)), e === null)) break;
        }
        return null;
      }
      function nf(e, t, n) {
        if (t === ``) return null;
        for (; e.nodeType !== 3; )
          if (
            ((e.nodeType !== 1 ||
              e.nodeName !== `INPUT` ||
              e.type !== `hidden`) &&
              !n) ||
            ((e = cf(e.nextSibling)), e === null)
          )
            return null;
        return e;
      }
      function rf(e, t) {
        for (; e.nodeType !== 8; )
          if (
            ((e.nodeType !== 1 ||
              e.nodeName !== `INPUT` ||
              e.type !== `hidden`) &&
              !t) ||
            ((e = cf(e.nextSibling)), e === null)
          )
            return null;
        return e;
      }
      function af(e) {
        return e.data === `$?` || e.data === `$~`;
      }
      function of(e) {
        return (
          e.data === `$!` ||
          (e.data === `$?` && e.ownerDocument.readyState !== `loading`)
        );
      }
      function sf(e, t) {
        var n = e.ownerDocument;
        if (e.data === `$~`) e._reactRetry = t;
        else if (e.data !== `$?` || n.readyState !== `loading`) t();
        else {
          var r = function () {
            (t(), n.removeEventListener(`DOMContentLoaded`, r));
          };
          (n.addEventListener(`DOMContentLoaded`, r), (e._reactRetry = r));
        }
      }
      function cf(e) {
        for (; e != null; e = e.nextSibling) {
          var t = e.nodeType;
          if (t === 1 || t === 3) break;
          if (t === 8) {
            if (
              ((t = e.data),
              t === `$` ||
                t === `$!` ||
                t === `$?` ||
                t === `$~` ||
                t === `&` ||
                t === `F!` ||
                t === `F`)
            )
              break;
            if (t === `/$` || t === `/&`) return null;
          }
        }
        return e;
      }
      var lf = null;
      function uf(e) {
        e = e.nextSibling;
        for (var t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === `/$` || n === `/&`) {
              if (t === 0) return cf(e.nextSibling);
              t--;
            } else
              (n !== `$` &&
                n !== `$!` &&
                n !== `$?` &&
                n !== `$~` &&
                n !== `&`) ||
                t++;
          }
          e = e.nextSibling;
        }
        return null;
      }
      function df(e) {
        e = e.previousSibling;
        for (var t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (
              n === `$` ||
              n === `$!` ||
              n === `$?` ||
              n === `$~` ||
              n === `&`
            ) {
              if (t === 0) return e;
              t--;
            } else (n !== `/$` && n !== `/&`) || t++;
          }
          e = e.previousSibling;
        }
        return null;
      }
      function ff(e, t, n) {
        switch (((t = Bd(n)), e)) {
          case `html`:
            if (((e = t.documentElement), !e)) throw Error(i(452));
            return e;
          case `head`:
            if (((e = t.head), !e)) throw Error(i(453));
            return e;
          case `body`:
            if (((e = t.body), !e)) throw Error(i(454));
            return e;
          default:
            throw Error(i(451));
        }
      }
      function pf(e) {
        for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
        Et(e);
      }
      var mf = new Map(),
        hf = new Set();
      function gf(e) {
        return typeof e.getRootNode == `function`
          ? e.getRootNode()
          : e.nodeType === 9
            ? e
            : e.ownerDocument;
      }
      var _f = T.d;
      T.d = { f: vf, r: yf, D: Sf, C: Cf, L: wf, m: Tf, X: Df, S: Ef, M: Of };
      function vf() {
        var e = _f.f(),
          t = bu();
        return e || t;
      }
      function yf(e) {
        var t = Ot(e);
        t !== null && t.tag === 5 && t.type === `form` ? js(t) : _f.r(e);
      }
      var bf = typeof document > `u` ? null : document;
      function xf(e, t, n) {
        var r = bf;
        if (r && typeof t == `string` && t) {
          var i = Xt(t);
          ((i = `link[rel="` + e + `"][href="` + i + `"]`),
            typeof n == `string` && (i += `[crossorigin="` + n + `"]`),
            hf.has(i) ||
              (hf.add(i),
              (e = { rel: e, crossOrigin: n, href: t }),
              r.querySelector(i) === null &&
                ((t = r.createElement(`link`)),
                Pd(t, `link`, e),
                jt(t),
                r.head.appendChild(t))));
        }
      }
      function Sf(e) {
        (_f.D(e), xf(`dns-prefetch`, e, null));
      }
      function Cf(e, t) {
        (_f.C(e, t), xf(`preconnect`, e, t));
      }
      function wf(e, t, n) {
        _f.L(e, t, n);
        var r = bf;
        if (r && e && t) {
          var i = `link[rel="preload"][as="` + Xt(t) + `"]`;
          t === `image` && n && n.imageSrcSet
            ? ((i += `[imagesrcset="` + Xt(n.imageSrcSet) + `"]`),
              typeof n.imageSizes == `string` &&
                (i += `[imagesizes="` + Xt(n.imageSizes) + `"]`))
            : (i += `[href="` + Xt(e) + `"]`);
          var a = i;
          switch (t) {
            case `style`:
              a = Af(e);
              break;
            case `script`:
              a = Pf(e);
          }
          mf.has(a) ||
            ((e = h(
              {
                rel: `preload`,
                href: t === `image` && n && n.imageSrcSet ? void 0 : e,
                as: t,
              },
              n,
            )),
            mf.set(a, e),
            r.querySelector(i) !== null ||
              (t === `style` && r.querySelector(jf(a))) ||
              (t === `script` && r.querySelector(Ff(a))) ||
              ((t = r.createElement(`link`)),
              Pd(t, `link`, e),
              jt(t),
              r.head.appendChild(t)));
        }
      }
      function Tf(e, t) {
        _f.m(e, t);
        var n = bf;
        if (n && e) {
          var r = t && typeof t.as == `string` ? t.as : `script`,
            i =
              `link[rel="modulepreload"][as="` +
              Xt(r) +
              `"][href="` +
              Xt(e) +
              `"]`,
            a = i;
          switch (r) {
            case `audioworklet`:
            case `paintworklet`:
            case `serviceworker`:
            case `sharedworker`:
            case `worker`:
            case `script`:
              a = Pf(e);
          }
          if (
            !mf.has(a) &&
            ((e = h({ rel: `modulepreload`, href: e }, t)),
            mf.set(a, e),
            n.querySelector(i) === null)
          ) {
            switch (r) {
              case `audioworklet`:
              case `paintworklet`:
              case `serviceworker`:
              case `sharedworker`:
              case `worker`:
              case `script`:
                if (n.querySelector(Ff(a))) return;
            }
            ((r = n.createElement(`link`)),
              Pd(r, `link`, e),
              jt(r),
              n.head.appendChild(r));
          }
        }
      }
      function Ef(e, t, n) {
        _f.S(e, t, n);
        var r = bf;
        if (r && e) {
          var i = At(r).hoistableStyles,
            a = Af(e);
          t ||= `default`;
          var o = i.get(a);
          if (!o) {
            var s = { loading: 0, preload: null };
            if ((o = r.querySelector(jf(a)))) s.loading = 5;
            else {
              ((e = h({ rel: `stylesheet`, href: e, 'data-precedence': t }, n)),
                (n = mf.get(a)) && Rf(e, n));
              var c = (o = r.createElement(`link`));
              (jt(c),
                Pd(c, `link`, e),
                (c._p = new Promise(function (e, t) {
                  ((c.onload = e), (c.onerror = t));
                })),
                c.addEventListener(`load`, function () {
                  s.loading |= 1;
                }),
                c.addEventListener(`error`, function () {
                  s.loading |= 2;
                }),
                (s.loading |= 4),
                Lf(o, t, r));
            }
            ((o = { type: `stylesheet`, instance: o, count: 1, state: s }),
              i.set(a, o));
          }
        }
      }
      function Df(e, t) {
        _f.X(e, t);
        var n = bf;
        if (n && e) {
          var r = At(n).hoistableScripts,
            i = Pf(e),
            a = r.get(i);
          a ||
            ((a = n.querySelector(Ff(i))),
            a ||
              ((e = h({ src: e, async: !0 }, t)),
              (t = mf.get(i)) && zf(e, t),
              (a = n.createElement(`script`)),
              jt(a),
              Pd(a, `link`, e),
              n.head.appendChild(a)),
            (a = { type: `script`, instance: a, count: 1, state: null }),
            r.set(i, a));
        }
      }
      function Of(e, t) {
        _f.M(e, t);
        var n = bf;
        if (n && e) {
          var r = At(n).hoistableScripts,
            i = Pf(e),
            a = r.get(i);
          a ||
            ((a = n.querySelector(Ff(i))),
            a ||
              ((e = h({ src: e, async: !0, type: `module` }, t)),
              (t = mf.get(i)) && zf(e, t),
              (a = n.createElement(`script`)),
              jt(a),
              Pd(a, `link`, e),
              n.head.appendChild(a)),
            (a = { type: `script`, instance: a, count: 1, state: null }),
            r.set(i, a));
        }
      }
      function kf(e, t, n, r) {
        var a = (a = ye.current) ? gf(a) : null;
        if (!a) throw Error(i(446));
        switch (e) {
          case `meta`:
          case `title`:
            return null;
          case `style`:
            return typeof n.precedence == `string` && typeof n.href == `string`
              ? ((t = Af(n.href)),
                (n = At(a).hoistableStyles),
                (r = n.get(t)),
                r ||
                  ((r = {
                    type: `style`,
                    instance: null,
                    count: 0,
                    state: null,
                  }),
                  n.set(t, r)),
                r)
              : { type: `void`, instance: null, count: 0, state: null };
          case `link`:
            if (
              n.rel === `stylesheet` &&
              typeof n.href == `string` &&
              typeof n.precedence == `string`
            ) {
              e = Af(n.href);
              var o = At(a).hoistableStyles,
                s = o.get(e);
              if (
                (s ||
                  ((a = a.ownerDocument || a),
                  (s = {
                    type: `stylesheet`,
                    instance: null,
                    count: 0,
                    state: { loading: 0, preload: null },
                  }),
                  o.set(e, s),
                  (o = a.querySelector(jf(e))) &&
                    !o._p &&
                    ((s.instance = o), (s.state.loading = 5)),
                  mf.has(e) ||
                    ((n = {
                      rel: `preload`,
                      as: `style`,
                      href: n.href,
                      crossOrigin: n.crossOrigin,
                      integrity: n.integrity,
                      media: n.media,
                      hrefLang: n.hrefLang,
                      referrerPolicy: n.referrerPolicy,
                    }),
                    mf.set(e, n),
                    o || Nf(a, e, n, s.state))),
                t && r === null)
              )
                throw Error(i(528, ``));
              return s;
            }
            if (t && r !== null) throw Error(i(529, ``));
            return null;
          case `script`:
            return (
              (t = n.async),
              (n = n.src),
              typeof n == `string` &&
              t &&
              typeof t != `function` &&
              typeof t != `symbol`
                ? ((t = Pf(n)),
                  (n = At(a).hoistableScripts),
                  (r = n.get(t)),
                  r ||
                    ((r = {
                      type: `script`,
                      instance: null,
                      count: 0,
                      state: null,
                    }),
                    n.set(t, r)),
                  r)
                : { type: `void`, instance: null, count: 0, state: null }
            );
          default:
            throw Error(i(444, e));
        }
      }
      function Af(e) {
        return `href="` + Xt(e) + `"`;
      }
      function jf(e) {
        return `link[rel="stylesheet"][` + e + `]`;
      }
      function Mf(e) {
        return h({}, e, { 'data-precedence': e.precedence, precedence: null });
      }
      function Nf(e, t, n, r) {
        e.querySelector(`link[rel="preload"][as="style"][` + t + `]`)
          ? (r.loading = 1)
          : ((t = e.createElement(`link`)),
            (r.preload = t),
            t.addEventListener(`load`, function () {
              return (r.loading |= 1);
            }),
            t.addEventListener(`error`, function () {
              return (r.loading |= 2);
            }),
            Pd(t, `link`, n),
            jt(t),
            e.head.appendChild(t));
      }
      function Pf(e) {
        return `[src="` + Xt(e) + `"]`;
      }
      function Ff(e) {
        return `script[async]` + e;
      }
      function If(e, t, n) {
        if ((t.count++, t.instance === null))
          switch (t.type) {
            case `style`:
              var r = e.querySelector(`style[data-href~="` + Xt(n.href) + `"]`);
              if (r) return ((t.instance = r), jt(r), r);
              var a = h({}, n, {
                'data-href': n.href,
                'data-precedence': n.precedence,
                href: null,
                precedence: null,
              });
              return (
                (r = (e.ownerDocument || e).createElement(`style`)),
                jt(r),
                Pd(r, `style`, a),
                Lf(r, n.precedence, e),
                (t.instance = r)
              );
            case `stylesheet`:
              a = Af(n.href);
              var o = e.querySelector(jf(a));
              if (o)
                return ((t.state.loading |= 4), (t.instance = o), jt(o), o);
              ((r = Mf(n)),
                (a = mf.get(a)) && Rf(r, a),
                (o = (e.ownerDocument || e).createElement(`link`)),
                jt(o));
              var s = o;
              return (
                (s._p = new Promise(function (e, t) {
                  ((s.onload = e), (s.onerror = t));
                })),
                Pd(o, `link`, r),
                (t.state.loading |= 4),
                Lf(o, n.precedence, e),
                (t.instance = o)
              );
            case `script`:
              return (
                (o = Pf(n.src)),
                (a = e.querySelector(Ff(o)))
                  ? ((t.instance = a), jt(a), a)
                  : ((r = n),
                    (a = mf.get(o)) && ((r = h({}, n)), zf(r, a)),
                    (e = e.ownerDocument || e),
                    (a = e.createElement(`script`)),
                    jt(a),
                    Pd(a, `link`, r),
                    e.head.appendChild(a),
                    (t.instance = a))
              );
            case `void`:
              return null;
            default:
              throw Error(i(443, t.type));
          }
        else
          t.type === `stylesheet` &&
            !(t.state.loading & 4) &&
            ((r = t.instance), (t.state.loading |= 4), Lf(r, n.precedence, e));
        return t.instance;
      }
      function Lf(e, t, n) {
        for (
          var r = n.querySelectorAll(
              `link[rel="stylesheet"][data-precedence],style[data-precedence]`,
            ),
            i = r.length ? r[r.length - 1] : null,
            a = i,
            o = 0;
          o < r.length;
          o++
        ) {
          var s = r[o];
          if (s.dataset.precedence === t) a = s;
          else if (a !== i) break;
        }
        a
          ? a.parentNode.insertBefore(e, a.nextSibling)
          : ((t = n.nodeType === 9 ? n.head : n),
            t.insertBefore(e, t.firstChild));
      }
      function Rf(e, t) {
        ((e.crossOrigin ??= t.crossOrigin),
          (e.referrerPolicy ??= t.referrerPolicy),
          (e.title ??= t.title));
      }
      function zf(e, t) {
        ((e.crossOrigin ??= t.crossOrigin),
          (e.referrerPolicy ??= t.referrerPolicy),
          (e.integrity ??= t.integrity));
      }
      var Bf = null;
      function Vf(e, t, n) {
        if (Bf === null) {
          var r = new Map(),
            i = (Bf = new Map());
          i.set(n, r);
        } else ((i = Bf), (r = i.get(n)), r || ((r = new Map()), i.set(n, r)));
        if (r.has(e)) return r;
        for (
          r.set(e, null), n = n.getElementsByTagName(e), i = 0;
          i < n.length;
          i++
        ) {
          var a = n[i];
          if (
            !(
              a[Tt] ||
              a[vt] ||
              (e === `link` && a.getAttribute(`rel`) === `stylesheet`)
            ) &&
            a.namespaceURI !== `http://www.w3.org/2000/svg`
          ) {
            var o = a.getAttribute(t) || ``;
            o = e + o;
            var s = r.get(o);
            s ? s.push(a) : r.set(o, [a]);
          }
        }
        return r;
      }
      function Hf(e, t, n) {
        ((e = e.ownerDocument || e),
          e.head.insertBefore(
            n,
            t === `title` ? e.querySelector(`head > title`) : null,
          ));
      }
      function Uf(e, t, n) {
        if (n === 1 || t.itemProp != null) return !1;
        switch (e) {
          case `meta`:
          case `title`:
            return !0;
          case `style`:
            if (
              typeof t.precedence != `string` ||
              typeof t.href != `string` ||
              t.href === ``
            )
              break;
            return !0;
          case `link`:
            if (
              typeof t.rel != `string` ||
              typeof t.href != `string` ||
              t.href === `` ||
              t.onLoad ||
              t.onError
            )
              break;
            switch (t.rel) {
              case `stylesheet`:
                return (
                  (e = t.disabled),
                  typeof t.precedence == `string` && e == null
                );
              default:
                return !0;
            }
          case `script`:
            if (
              t.async &&
              typeof t.async != `function` &&
              typeof t.async != `symbol` &&
              !t.onLoad &&
              !t.onError &&
              t.src &&
              typeof t.src == `string`
            )
              return !0;
        }
        return !1;
      }
      function Wf(e) {
        return !(e.type === `stylesheet` && !(e.state.loading & 3));
      }
      function Gf(e, t, n, r) {
        if (
          n.type === `stylesheet` &&
          (typeof r.media != `string` || !1 !== matchMedia(r.media).matches) &&
          !(n.state.loading & 4)
        ) {
          if (n.instance === null) {
            var i = Af(r.href),
              a = t.querySelector(jf(i));
            if (a) {
              ((t = a._p),
                typeof t == `object` &&
                  t &&
                  typeof t.then == `function` &&
                  (e.count++, (e = Jf.bind(e)), t.then(e, e)),
                (n.state.loading |= 4),
                (n.instance = a),
                jt(a));
              return;
            }
            ((a = t.ownerDocument || t),
              (r = Mf(r)),
              (i = mf.get(i)) && Rf(r, i),
              (a = a.createElement(`link`)),
              jt(a));
            var o = a;
            ((o._p = new Promise(function (e, t) {
              ((o.onload = e), (o.onerror = t));
            })),
              Pd(a, `link`, r),
              (n.instance = a));
          }
          (e.stylesheets === null && (e.stylesheets = new Map()),
            e.stylesheets.set(n, t),
            (t = n.state.preload) &&
              !(n.state.loading & 3) &&
              (e.count++,
              (n = Jf.bind(e)),
              t.addEventListener(`load`, n),
              t.addEventListener(`error`, n)));
        }
      }
      var Kf = 0;
      function qf(e, t) {
        return (
          e.stylesheets && e.count === 0 && Xf(e, e.stylesheets),
          0 < e.count || 0 < e.imgCount
            ? function (n) {
                var r = setTimeout(function () {
                  if ((e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
                    var t = e.unsuspend;
                    ((e.unsuspend = null), t());
                  }
                }, 6e4 + t);
                0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
                var i = setTimeout(
                  function () {
                    if (
                      ((e.waitingForImages = !1),
                      e.count === 0 &&
                        (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend))
                    ) {
                      var t = e.unsuspend;
                      ((e.unsuspend = null), t());
                    }
                  },
                  (e.imgBytes > Kf ? 50 : 800) + t,
                );
                return (
                  (e.unsuspend = n),
                  function () {
                    ((e.unsuspend = null), clearTimeout(r), clearTimeout(i));
                  }
                );
              }
            : null
        );
      }
      function Jf() {
        if (
          (this.count--,
          this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
        ) {
          if (this.stylesheets) Xf(this, this.stylesheets);
          else if (this.unsuspend) {
            var e = this.unsuspend;
            ((this.unsuspend = null), e());
          }
        }
      }
      var Yf = null;
      function Xf(e, t) {
        ((e.stylesheets = null),
          e.unsuspend !== null &&
            (e.count++,
            (Yf = new Map()),
            t.forEach(Zf, e),
            (Yf = null),
            Jf.call(e)));
      }
      function Zf(e, t) {
        if (!(t.state.loading & 4)) {
          var n = Yf.get(e);
          if (n) var r = n.get(null);
          else {
            ((n = new Map()), Yf.set(e, n));
            for (
              var i = e.querySelectorAll(
                  `link[data-precedence],style[data-precedence]`,
                ),
                a = 0;
              a < i.length;
              a++
            ) {
              var o = i[a];
              (o.nodeName === `LINK` ||
                o.getAttribute(`media`) !== `not all`) &&
                (n.set(o.dataset.precedence, o), (r = o));
            }
            r && n.set(null, r);
          }
          ((i = t.instance),
            (o = i.getAttribute(`data-precedence`)),
            (a = n.get(o) || r),
            a === r && n.set(null, i),
            n.set(o, i),
            this.count++,
            (r = Jf.bind(this)),
            i.addEventListener(`load`, r),
            i.addEventListener(`error`, r),
            a
              ? a.parentNode.insertBefore(i, a.nextSibling)
              : ((e = e.nodeType === 9 ? e.head : e),
                e.insertBefore(i, e.firstChild)),
            (t.state.loading |= 4));
        }
      }
      var Qf = {
        $$typeof: S,
        Provider: null,
        Consumer: null,
        _currentValue: fe,
        _currentValue2: fe,
        _threadCount: 0,
      };
      function $f(e, t, n, r, i, a, o, s, c) {
        ((this.tag = 1),
          (this.containerInfo = e),
          (this.pingCache = this.current = this.pendingChildren = null),
          (this.timeoutHandle = -1),
          (this.callbackNode =
            this.next =
            this.pendingContext =
            this.context =
            this.cancelPendingCommit =
              null),
          (this.callbackPriority = 0),
          (this.expirationTimes = st(-1)),
          (this.entangledLanes =
            this.shellSuspendCounter =
            this.errorRecoveryDisabledLanes =
            this.expiredLanes =
            this.warmLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
              0),
          (this.entanglements = st(0)),
          (this.hiddenUpdates = st(null)),
          (this.identifierPrefix = r),
          (this.onUncaughtError = i),
          (this.onCaughtError = a),
          (this.onRecoverableError = o),
          (this.pooledCache = null),
          (this.pooledCacheLanes = 0),
          (this.formState = c),
          (this.incompleteTransitions = new Map()));
      }
      function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
        return (
          (e = new $f(e, t, n, o, c, l, u, d, s)),
          (t = 1),
          !0 === a && (t |= 24),
          (a = bi(3, null, null, t)),
          (e.current = a),
          (a.stateNode = e),
          (t = ya()),
          t.refCount++,
          (e.pooledCache = t),
          t.refCount++,
          (a.memoizedState = { element: r, isDehydrated: n, cache: t }),
          Za(a),
          e
        );
      }
      function tp(e) {
        return e ? ((e = vi), e) : vi;
      }
      function np(e, t, n, r, i, a) {
        ((i = tp(i)),
          r.context === null ? (r.context = i) : (r.pendingContext = i),
          (r = $a(t)),
          (r.payload = { element: n }),
          (a = a === void 0 ? null : a),
          a !== null && (r.callback = a),
          (n = eo(e, r, t)),
          n !== null && (hu(n, e, t), to(n, e, t)));
      }
      function rp(e, t) {
        if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
          var n = e.retryLane;
          e.retryLane = n !== 0 && n < t ? n : t;
        }
      }
      function ip(e, t) {
        (rp(e, t), (e = e.alternate) && rp(e, t));
      }
      function ap(e) {
        if (e.tag === 13 || e.tag === 31) {
          var t = hi(e, 67108864);
          (t !== null && hu(t, e, 67108864), ip(e, 67108864));
        }
      }
      function op(e) {
        if (e.tag === 13 || e.tag === 31) {
          var t = pu();
          t = pt(t);
          var n = hi(e, t);
          (n !== null && hu(n, e, t), ip(e, t));
        }
      }
      var sp = !0;
      function cp(e, t, n, r) {
        var i = w.T;
        w.T = null;
        var a = T.p;
        try {
          ((T.p = 2), up(e, t, n, r));
        } finally {
          ((T.p = a), (w.T = i));
        }
      }
      function lp(e, t, n, r) {
        var i = w.T;
        w.T = null;
        var a = T.p;
        try {
          ((T.p = 8), up(e, t, n, r));
        } finally {
          ((T.p = a), (w.T = i));
        }
      }
      function up(e, t, n, r) {
        if (sp) {
          var i = dp(r);
          if (i === null) (wd(e, t, r, fp, n), Cp(e, r));
          else if (Tp(i, e, t, n, r)) r.stopPropagation();
          else if ((Cp(e, r), t & 4 && -1 < Sp.indexOf(e))) {
            for (; i !== null; ) {
              var a = Ot(i);
              if (a !== null)
                switch (a.tag) {
                  case 3:
                    if (
                      ((a = a.stateNode), a.current.memoizedState.isDehydrated)
                    ) {
                      var o = nt(a.pendingLanes);
                      if (o !== 0) {
                        var s = a;
                        for (s.pendingLanes |= 2, s.entangledLanes |= 2; o; ) {
                          var c = 1 << (31 - Ye(o));
                          ((s.entanglements[1] |= c), (o &= ~c));
                        }
                        (rd(a), !(K & 6) && ((tu = Le() + 500), id(0, !1)));
                      }
                    }
                    break;
                  case 31:
                  case 13:
                    ((s = hi(a, 2)), s !== null && hu(s, a, 2), bu(), ip(a, 2));
                }
              if (((a = dp(r)), a === null && wd(e, t, r, fp, n), a === i))
                break;
              i = a;
            }
            i !== null && r.stopPropagation();
          } else wd(e, t, r, null, n);
        }
      }
      function dp(e) {
        return ((e = mn(e)), pp(e));
      }
      var fp = null;
      function pp(e) {
        if (((fp = null), (e = Dt(e)), e !== null)) {
          var t = o(e);
          if (t === null) e = null;
          else {
            var n = t.tag;
            if (n === 13) {
              if (((e = s(t)), e !== null)) return e;
              e = null;
            } else if (n === 31) {
              if (((e = c(t)), e !== null)) return e;
              e = null;
            } else if (n === 3) {
              if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
              e = null;
            } else t !== e && (e = null);
          }
        }
        return ((fp = e), null);
      }
      function mp(e) {
        switch (e) {
          case `beforetoggle`:
          case `cancel`:
          case `click`:
          case `close`:
          case `contextmenu`:
          case `copy`:
          case `cut`:
          case `auxclick`:
          case `dblclick`:
          case `dragend`:
          case `dragstart`:
          case `drop`:
          case `focusin`:
          case `focusout`:
          case `input`:
          case `invalid`:
          case `keydown`:
          case `keypress`:
          case `keyup`:
          case `mousedown`:
          case `mouseup`:
          case `paste`:
          case `pause`:
          case `play`:
          case `pointercancel`:
          case `pointerdown`:
          case `pointerup`:
          case `ratechange`:
          case `reset`:
          case `resize`:
          case `seeked`:
          case `submit`:
          case `toggle`:
          case `touchcancel`:
          case `touchend`:
          case `touchstart`:
          case `volumechange`:
          case `change`:
          case `selectionchange`:
          case `textInput`:
          case `compositionstart`:
          case `compositionend`:
          case `compositionupdate`:
          case `beforeblur`:
          case `afterblur`:
          case `beforeinput`:
          case `blur`:
          case `fullscreenchange`:
          case `focus`:
          case `hashchange`:
          case `popstate`:
          case `select`:
          case `selectstart`:
            return 2;
          case `drag`:
          case `dragenter`:
          case `dragexit`:
          case `dragleave`:
          case `dragover`:
          case `mousemove`:
          case `mouseout`:
          case `mouseover`:
          case `pointermove`:
          case `pointerout`:
          case `pointerover`:
          case `scroll`:
          case `touchmove`:
          case `wheel`:
          case `mouseenter`:
          case `mouseleave`:
          case `pointerenter`:
          case `pointerleave`:
            return 8;
          case `message`:
            switch (Re()) {
              case ze:
                return 2;
              case Be:
                return 8;
              case Ve:
              case He:
                return 32;
              case Ue:
                return 268435456;
              default:
                return 32;
            }
          default:
            return 32;
        }
      }
      var hp = !1,
        gp = null,
        _p = null,
        vp = null,
        yp = new Map(),
        bp = new Map(),
        xp = [],
        Sp =
          `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(
            ` `,
          );
      function Cp(e, t) {
        switch (e) {
          case `focusin`:
          case `focusout`:
            gp = null;
            break;
          case `dragenter`:
          case `dragleave`:
            _p = null;
            break;
          case `mouseover`:
          case `mouseout`:
            vp = null;
            break;
          case `pointerover`:
          case `pointerout`:
            yp.delete(t.pointerId);
            break;
          case `gotpointercapture`:
          case `lostpointercapture`:
            bp.delete(t.pointerId);
        }
      }
      function wp(e, t, n, r, i, a) {
        return e === null || e.nativeEvent !== a
          ? ((e = {
              blockedOn: t,
              domEventName: n,
              eventSystemFlags: r,
              nativeEvent: a,
              targetContainers: [i],
            }),
            t !== null && ((t = Ot(t)), t !== null && ap(t)),
            e)
          : ((e.eventSystemFlags |= r),
            (t = e.targetContainers),
            i !== null && t.indexOf(i) === -1 && t.push(i),
            e);
      }
      function Tp(e, t, n, r, i) {
        switch (t) {
          case `focusin`:
            return ((gp = wp(gp, e, t, n, r, i)), !0);
          case `dragenter`:
            return ((_p = wp(_p, e, t, n, r, i)), !0);
          case `mouseover`:
            return ((vp = wp(vp, e, t, n, r, i)), !0);
          case `pointerover`:
            var a = i.pointerId;
            return (yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0);
          case `gotpointercapture`:
            return (
              (a = i.pointerId),
              bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)),
              !0
            );
        }
        return !1;
      }
      function Ep(e) {
        var t = Dt(e.target);
        if (t !== null) {
          var n = o(t);
          if (n !== null) {
            if (((t = n.tag), t === 13)) {
              if (((t = s(n)), t !== null)) {
                ((e.blockedOn = t),
                  gt(e.priority, function () {
                    op(n);
                  }));
                return;
              }
            } else if (t === 31) {
              if (((t = c(n)), t !== null)) {
                ((e.blockedOn = t),
                  gt(e.priority, function () {
                    op(n);
                  }));
                return;
              }
            } else if (
              t === 3 &&
              n.stateNode.current.memoizedState.isDehydrated
            ) {
              e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
              return;
            }
          }
        }
        e.blockedOn = null;
      }
      function Dp(e) {
        if (e.blockedOn !== null) return !1;
        for (var t = e.targetContainers; 0 < t.length; ) {
          var n = dp(e.nativeEvent);
          if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            ((pn = r), n.target.dispatchEvent(r), (pn = null));
          } else
            return ((t = Ot(n)), t !== null && ap(t), (e.blockedOn = n), !1);
          t.shift();
        }
        return !0;
      }
      function Op(e, t, n) {
        Dp(e) && n.delete(t);
      }
      function kp() {
        ((hp = !1),
          gp !== null && Dp(gp) && (gp = null),
          _p !== null && Dp(_p) && (_p = null),
          vp !== null && Dp(vp) && (vp = null),
          yp.forEach(Op),
          bp.forEach(Op));
      }
      function Ap(e, n) {
        e.blockedOn === n &&
          ((e.blockedOn = null),
          hp ||
            ((hp = !0),
            t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
      }
      var jp = null;
      function Mp(e) {
        jp !== e &&
          ((jp = e),
          t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
            jp === e && (jp = null);
            for (var t = 0; t < e.length; t += 3) {
              var n = e[t],
                r = e[t + 1],
                i = e[t + 2];
              if (typeof r != `function`) {
                if (pp(r || n) === null) continue;
                break;
              }
              var a = Ot(n);
              a !== null &&
                (e.splice(t, 3),
                (t -= 3),
                ks(
                  a,
                  { pending: !0, data: i, method: n.method, action: r },
                  r,
                  i,
                ));
            }
          }));
      }
      function Np(e) {
        function t(t) {
          return Ap(t, e);
        }
        (gp !== null && Ap(gp, e),
          _p !== null && Ap(_p, e),
          vp !== null && Ap(vp, e),
          yp.forEach(t),
          bp.forEach(t));
        for (var n = 0; n < xp.length; n++) {
          var r = xp[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
        for (; 0 < xp.length && ((n = xp[0]), n.blockedOn === null); )
          (Ep(n), n.blockedOn === null && xp.shift());
        if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
          for (r = 0; r < n.length; r += 3) {
            var i = n[r],
              a = n[r + 1],
              o = i[yt] || null;
            if (typeof a == `function`) o || Mp(n);
            else if (o) {
              var s = null;
              if (a && a.hasAttribute(`formAction`)) {
                if (((i = a), (o = a[yt] || null))) s = o.formAction;
                else if (pp(i) !== null) continue;
              } else s = o.action;
              (typeof s == `function`
                ? (n[r + 1] = s)
                : (n.splice(r, 3), (r -= 3)),
                Mp(n));
            }
          }
      }
      function Pp() {
        function e(e) {
          e.canIntercept &&
            e.info === `react-transition` &&
            e.intercept({
              handler: function () {
                return new Promise(function (e) {
                  return (i = e);
                });
              },
              focusReset: `manual`,
              scroll: `manual`,
            });
        }
        function t() {
          (i !== null && (i(), (i = null)), r || setTimeout(n, 20));
        }
        function n() {
          if (!r && !navigation.transition) {
            var e = navigation.currentEntry;
            e &&
              e.url != null &&
              navigation.navigate(e.url, {
                state: e.getState(),
                info: `react-transition`,
                history: `replace`,
              });
          }
        }
        if (typeof navigation == `object`) {
          var r = !1,
            i = null;
          return (
            navigation.addEventListener(`navigate`, e),
            navigation.addEventListener(`navigatesuccess`, t),
            navigation.addEventListener(`navigateerror`, t),
            setTimeout(n, 100),
            function () {
              ((r = !0),
                navigation.removeEventListener(`navigate`, e),
                navigation.removeEventListener(`navigatesuccess`, t),
                navigation.removeEventListener(`navigateerror`, t),
                i !== null && (i(), (i = null)));
            }
          );
        }
      }
      function Fp(e) {
        this._internalRoot = e;
      }
      ((Ip.prototype.render = Fp.prototype.render =
        function (e) {
          var t = this._internalRoot;
          if (t === null) throw Error(i(409));
          var n = t.current;
          np(n, pu(), e, t, null, null);
        }),
        (Ip.prototype.unmount = Fp.prototype.unmount =
          function () {
            var e = this._internalRoot;
            if (e !== null) {
              this._internalRoot = null;
              var t = e.containerInfo;
              (np(e.current, 2, null, e, null, null), bu(), (t[bt] = null));
            }
          }));
      function Ip(e) {
        this._internalRoot = e;
      }
      Ip.prototype.unstable_scheduleHydration = function (e) {
        if (e) {
          var t = ht();
          e = { blockedOn: null, target: e, priority: t };
          for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
          (xp.splice(n, 0, e), n === 0 && Ep(e));
        }
      };
      var Lp = n.version;
      if (Lp !== `19.2.8`) throw Error(i(527, Lp, `19.2.8`));
      T.findDOMNode = function (e) {
        var t = e._reactInternals;
        if (t === void 0)
          throw typeof e.render == `function`
            ? Error(i(188))
            : ((e = Object.keys(e).join(`,`)), Error(i(268, e)));
        return (
          (e = d(t)),
          (e = e === null ? null : p(e)),
          (e = e === null ? null : e.stateNode),
          e
        );
      };
      var Rp = {
        bundleType: 0,
        version: `19.2.8`,
        rendererPackageName: `react-dom`,
        currentDispatcherRef: w,
        reconcilerVersion: `19.2.8`,
      };
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
        var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!zp.isDisabled && zp.supportsFiber)
          try {
            ((Ke = zp.inject(Rp)), (qe = zp));
          } catch {}
      }
      e.createRoot = function (e, t) {
        if (!a(e)) throw Error(i(299));
        var n = !1,
          r = ``,
          o = Qs,
          s = $s,
          c = ec;
        return (
          t != null &&
            (!0 === t.unstable_strictMode && (n = !0),
            t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
            t.onUncaughtError !== void 0 && (o = t.onUncaughtError),
            t.onCaughtError !== void 0 && (s = t.onCaughtError),
            t.onRecoverableError !== void 0 && (c = t.onRecoverableError)),
          (t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp)),
          (e[bt] = t.current),
          Sd(e),
          new Fp(t)
        );
      };
    }),
    g = o((e, t) => {
      function n() {
        if (
          !(
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
          )
        )
          try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
          } catch (e) {
            console.error(e);
          }
      }
      (n(), (t.exports = h()));
    }),
    _ = o((e) => {
      var t =
        f().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      e.c = function (e) {
        return t.H.useMemoCache(e);
      };
    }),
    v = o((e, t) => {
      t.exports = _();
    }),
    y = g(),
    b = v();
  function x(e) {
    return new Date(e).toLocaleDateString(`en-us`, {
      month: `numeric`,
      day: `numeric`,
    });
  }
  var ee = o((e) => {
      var t = Symbol.for(`react.transitional.element`),
        n = Symbol.for(`react.fragment`);
      function r(e, n, r) {
        var i = null;
        if (
          (r !== void 0 && (i = `` + r),
          n.key !== void 0 && (i = `` + n.key),
          `key` in n)
        )
          for (var a in ((r = {}), n)) a !== `key` && (r[a] = n[a]);
        else r = n;
        return (
          (n = r.ref),
          {
            $$typeof: t,
            type: e,
            key: i,
            ref: n === void 0 ? null : n,
            props: r,
          }
        );
      }
      ((e.Fragment = n), (e.jsx = r), (e.jsxs = r));
    }),
    S = o((e, t) => {
      t.exports = ee();
    })();
  function C(e) {
    let t = (0, b.c)(23),
      { event: n } = e,
      r;
    t[0] === n.image
      ? (r = t[1])
      : ((r = (0, S.jsx)(`div`, {
          className: `church:flex-1`,
          children: (0, S.jsx)(`img`, { src: n.image, alt: `event image` }),
        })),
        (t[0] = n.image),
        (t[1] = r));
    let i;
    t[2] !== n.event_url || t[3] !== r
      ? ((i = (0, S.jsx)(`a`, {
          href: n.event_url,
          target: `_blank`,
          children: r,
        })),
        (t[2] = n.event_url),
        (t[3] = r),
        (t[4] = i))
      : (i = t[4]);
    let a;
    t[5] === n.name
      ? (a = t[6])
      : ((a = (0, S.jsx)(`h4`, {
          className: `church:mb-2 church:font-bold church:text-left`,
          children: n.name,
        })),
        (t[5] = n.name),
        (t[6] = a));
    let o;
    t[7] === n.start_time
      ? (o = t[8])
      : ((o = x(n.start_time)), (t[7] = n.start_time), (t[8] = o));
    let s;
    t[9] === o
      ? (s = t[10])
      : ((s = (0, S.jsx)(`h5`, {
          className: `church:mb-4 church:text-left`,
          children: o,
        })),
        (t[9] = o),
        (t[10] = s));
    let c = n.registration_url === null ? `hidden` : `visible`,
      l;
    t[11] === c
      ? (l = t[12])
      : ((l = { visibility: c }), (t[11] = c), (t[12] = l));
    let u;
    t[13] !== n.registration_url || t[14] !== l
      ? ((u = (0, S.jsx)(`a`, {
          className: `btn church:mx-auto church:mt-4 church:sm:mt-8 church:lg:mt-auto`,
          style: l,
          href: n.registration_url,
          target: `_blank`,
          children: `Register`,
        })),
        (t[13] = n.registration_url),
        (t[14] = l),
        (t[15] = u))
      : (u = t[15]);
    let d;
    t[16] !== a || t[17] !== s || t[18] !== u
      ? ((d = (0, S.jsxs)(`div`, {
          className: `church:flex church:flex-col church:py-4 church:px-8 church:md:py-8 church:flex-1 church:bg-white`,
          children: [a, s, u],
        })),
        (t[16] = a),
        (t[17] = s),
        (t[18] = u),
        (t[19] = d))
      : (d = t[19]);
    let f;
    return (
      t[20] !== i || t[21] !== d
        ? ((f = (0, S.jsx)(`div`, {
            children: (0, S.jsxs)(`div`, {
              className: `church:flex church:flex-col church:overflow-hidden church:rounded-[1em] church:shadow-xl church:mb-10 church:last:mb-0 church:bg-dark`,
              children: [i, d],
            }),
          })),
          (t[20] = i),
          (t[21] = d),
          (t[22] = f))
        : (f = t[22]),
      f
    );
  }
  function te() {
    let e = (0, b.c)(1),
      t;
    return (
      e[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((t = (0, S.jsxs)(`h5`, {
            className: `church:text-center`,
            children: [
              `No upcoming events at this time`,
              (0, S.jsx)(`br`, {}),
              (0, S.jsx)(`br`, {}),
              `Check back later!`,
            ],
          })),
          (e[0] = t))
        : (t = e[0]),
      t
    );
  }
  function ne(e) {
    let t = (0, b.c)(9),
      { events: n } = e,
      r;
    t[0] === n.length
      ? (r = t[1])
      : ((r = n.length === 0 && (0, S.jsx)(te, {})),
        (t[0] = n.length),
        (t[1] = r));
    let i;
    t[2] === n ? (i = t[3]) : ((i = n.map(re)), (t[2] = n), (t[3] = i));
    let a;
    t[4] === i
      ? (a = t[5])
      : ((a = (0, S.jsx)(`div`, {
          className: `church:grid church:md:grid-cols-2 church:xl:grid-cols-3 church:gap-[1em] church:lg:gap-[2em]`,
          children: i,
        })),
        (t[4] = i),
        (t[5] = a));
    let o;
    return (
      t[6] !== r || t[7] !== a
        ? ((o = (0, S.jsxs)(`div`, { children: [r, a] })),
          (t[6] = r),
          (t[7] = a),
          (t[8] = o))
        : (o = t[8]),
      o
    );
  }
  function re(e) {
    return (0, S.jsx)(C, { event: e }, e.id);
  }
  function ie() {
    let e = (0, b.c)(1),
      t;
    return (
      e[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((t = (0, S.jsx)(`h5`, {
            className: `church:text-center`,
            children: `Small groups are currently not in session`,
          })),
          (e[0] = t))
        : (t = e[0]),
      t
    );
  }
  function ae() {
    let e = (0, b.c)(3),
      t;
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((t = (0, S.jsx)(`h5`, { children: `MORE INFO` })), (e[0] = t))
      : (t = e[0]);
    let n;
    e[1] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((n = { color: `#808080` }), (e[1] = n))
      : (n = e[1]);
    let r;
    return (
      e[2] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((r = (0, S.jsx)(`div`, {
            children: (0, S.jsx)(`button`, {
              className: `church:ml-[1em] church:mb-[.5em] church:text-[1em] church:font-medium cursor-pointer church:text-[#808080]`,
              children: (0, S.jsxs)(`div`, {
                className: `church:flex church:justify-start`,
                children: [
                  t,
                  (0, S.jsx)(`svg`, {
                    className: `church:w-[1.5em] church:h=[1.5em] church:inline-block church:ml-[.5em]`,
                    style: n,
                    'aria-hidden': `true`,
                    xmlns: `http://www.w3.org/2000/svg`,
                    fill: `none`,
                    viewBox: `0 0 24 24`,
                    children: (0, S.jsx)(`path`, {
                      stroke: `currentColor`,
                      strokeLinecap: `round`,
                      strokeLinejoin: `round`,
                      strokeWidth: `2`,
                      d: `M19 12H5m14 0-4 4m4-4-4-4`,
                    }),
                  }),
                ],
              }),
            }),
          })),
          (e[2] = r))
        : (r = e[2]),
      r
    );
  }
  function oe(e) {
    let t = (0, b.c)(6),
      { group: n } = e,
      r;
    t[0] === n.group_img
      ? (r = t[1])
      : ((r = (0, S.jsx)(`div`, {
          className: `church:mb-5`,
          children: (0, S.jsx)(`img`, { src: n.group_img, alt: `group image` }),
        })),
        (t[0] = n.group_img),
        (t[1] = r));
    let i;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((i = (0, S.jsx)(ae, {})), (t[2] = i))
      : (i = t[2]);
    let a;
    return (
      t[3] !== n.registration_url || t[4] !== r
        ? ((a = (0, S.jsx)(`div`, {
            className: `church:rounded-[.5em] church:overflow-hidden church:shadow-xl church:bg-light church:md:mb-0 church:md:mx-0`,
            children: (0, S.jsxs)(`a`, {
              href: n.registration_url,
              target: `_blank`,
              children: [r, i],
            }),
          })),
          (t[3] = n.registration_url),
          (t[4] = r),
          (t[5] = a))
        : (a = t[5]),
      a
    );
  }
  function se(e) {
    let t = (0, b.c)(10),
      { groups: n } = e,
      r,
      i,
      a;
    if (t[0] !== n) {
      let e = n.filter(le);
      ((a = e.length === 0 && (0, S.jsx)(ie, {})),
        (r = `church:grid church:md:grid-cols-2 church:xl:grid-cols-3 church:gap-[1em] church:lg:gap-[2em]`),
        (i = e.map(ce)),
        (t[0] = n),
        (t[1] = r),
        (t[2] = i),
        (t[3] = a));
    } else ((r = t[1]), (i = t[2]), (a = t[3]));
    let o;
    t[4] !== r || t[5] !== i
      ? ((o = (0, S.jsx)(`div`, { className: r, children: i })),
        (t[4] = r),
        (t[5] = i),
        (t[6] = o))
      : (o = t[6]);
    let s;
    return (
      t[7] !== a || t[8] !== o
        ? ((s = (0, S.jsxs)(`div`, { children: [a, o] })),
          (t[7] = a),
          (t[8] = o),
          (t[9] = s))
        : (s = t[9]),
      s
    );
  }
  function ce(e) {
    return (0, S.jsx)(oe, { group: e }, e.id);
  }
  function le(e) {
    return e.visibility === !0;
  }
  var ue = globalThis.Temporal,
    de = (e, t) => `Non-positive ${e}: ${t}`,
    w = (e, t) => `Non-finite ${e}: ${t}`,
    T = (e) => `Cannot convert bigint to ${e}`,
    fe = `Invalid object`,
    pe = (e, t, n, r) => me(e, t) + `; must be between ${n}-${r}`,
    me = (e, t) => `Invalid ${e}: ${t}`,
    he = 1e3,
    ge = 1e6,
    E = 1e9,
    _e = 6e10,
    ve = 36e11;
  function ye(e) {
    return e === void 0 ? Object.create(null) : Ee(e);
  }
  function be(e, t = `number`) {
    if (typeof e == `bigint`) throw TypeError(T(t));
    if (((e = Number(e)), !Number.isFinite(e))) throw RangeError(w(t, e));
    return e;
  }
  function xe(e, t) {
    return Math.trunc(be(e, t)) || 0;
  }
  function Se(e, t) {
    return Ce(xe(e, t), t);
  }
  function Ce(e, t = `number`) {
    if (e <= 0) throw RangeError(de(t, e));
    return e;
  }
  function we(e, t, n) {
    return Math.min(Math.max(e, t), n);
  }
  function Te(e) {
    return e !== null && (typeof e == `object` || typeof e == `function`);
  }
  function Ee(e) {
    if (!Te(e)) throw TypeError(fe);
    return e;
  }
  var De = me,
    Oe = (e) => `Missing ${e}`,
    ke = (e, t, n) => me(e, t) + `; must be ` + Object.keys(n).join(),
    Ae = `Cannot use valueOf`,
    je = `Invalid calling context`,
    Me = (e, t) => `Unknown calendar ${e}; might need ${t}`,
    Ne = (e) => me(`TimeZone`, e),
    Pe = (e) => `Invalid substring: ${e}`,
    Fe = we;
  function Ie(e) {
    throw RangeError(e);
  }
  function Le(e) {
    throw TypeError(e);
  }
  function Re(e, t, n, r, i) {
    return ze(
      t,
      ((e, t) => {
        let n = e[t];
        return (n === void 0 && Le(Oe(t)), n);
      })(e, t),
      n,
      r,
      i,
    );
  }
  function ze(e, t, n, r, i, a) {
    let o = Fe(t, n, r);
    return (
      i &&
        t !== o &&
        Ie(
          ((e, t, n, r, i) => (i ? pe(e, i[t], i[n], i[r]) : pe(e, t, n, r)))(
            e,
            t,
            n,
            r,
            a,
          ),
        ),
      o
    );
  }
  function Be(e, t = Map) {
    let n = new t();
    return (t, ...r) => {
      if (n.has(t)) return n.get(t);
      let i = e(t, ...r);
      return (n.set(t, i), i);
    };
  }
  var Ve = (e) => He({ name: e }, 1),
    He = (e, t) => We((e) => ({ value: e, configurable: 1, writable: !t }), e),
    Ue = (e) => ({ [Symbol.toStringTag]: { value: e, configurable: 1 } });
  function We(e, t) {
    let n = {};
    for (let r in t) n[r] = e(t[r], r);
    return n;
  }
  function Ge(e, t) {
    let n = {};
    for (let r of e) n[r] = t;
    return n;
  }
  function Ke(e) {
    let t = {};
    for (let n of e) t[n] = (e) => e[n];
    return t;
  }
  function qe(e, t, n = Object.create(null)) {
    for (let r of e) n[r] = t[r];
    return n;
  }
  function Je(e, ...t) {
    return (...n) => e(...t, ...n);
  }
  function Ye() {}
  function Xe(e) {
    return e[0].toUpperCase() + e.substring(1);
  }
  function Ze(e) {
    return RegExp(`^${e}$`, `i`);
  }
  function Qe(e) {
    return parseInt(e.padEnd(9, `0`));
  }
  function $e(e) {
    return e && e !== `+` ? -1 : 1;
  }
  function et(e) {
    return e === void 0 ? 0 : parseInt(e);
  }
  function tt(e, t) {
    return String(t).padStart(e, `0`);
  }
  var nt = Je(tt, 2);
  function rt(e, t) {
    return Math.sign(e - t);
  }
  function it(e, t) {
    let n = e / t;
    return e % t < 0n ? n - 1n : n;
  }
  function at(e, t) {
    let n = it(e, t);
    return [n, e - n * t];
  }
  function ot(e, t) {
    return [Math.floor(e / t), st(e, t)];
  }
  function st(e, t) {
    return ((e % t) + t) % t;
  }
  function ct(e, t) {
    return Math.trunc(e / t) || 0;
  }
  function lt(e) {
    return Math.abs(e % 1) === 0.5;
  }
  function ut(e) {
    let t = e
      .normalize(`NFD`)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ``);
    return t === `bc` || t === `b` ? `bce` : t === `ad` || t === `a` ? `ce` : t;
  }
  function dt(e) {
    return e === void 0 ? `iso8601` : e === 0 ? `gregory` : e.id;
  }
  function ft(e, t) {
    return `M` + nt(e) + (t ? `L` : ``);
  }
  var pt = Object.keys({
      nanosecond: 0,
      microsecond: 1,
      millisecond: 2,
      second: 3,
      minute: 4,
      hour: 5,
      day: 6,
      week: 7,
      month: 8,
      year: 9,
    }),
    mt = he,
    ht = ge,
    gt = E,
    _t = _e,
    vt = ve,
    yt = 864e11,
    bt = BigInt(ht),
    xt = BigInt(gt),
    St = BigInt(yt),
    Ct = pt.slice(0, 6),
    wt = Ke(Ct),
    Tt = [`day`, `month`, `year`];
  function Et(e) {
    return (Ot(e, 1), e);
  }
  var Dt = { hour: 23, minute: 59, second: 59 };
  function Ot(e, t) {
    let n = {};
    for (let r of Ct) n[r] = ze(r, e[r], 0, Dt[r] || 999, t);
    return n;
  }
  function kt(e) {
    return At(e) * gt + jt(e);
  }
  function At(e) {
    return 3600 * e.hour + 60 * e.minute + e.second;
  }
  function jt(e) {
    return e.millisecond * ht + e.microsecond * mt + e.nanosecond;
  }
  function Mt(e) {
    let [t, n] = ot(e, ht),
      [r, i] = ot(n, mt);
    return Nt(t, r, i);
  }
  function Nt(e, t = 0, n = 0) {
    let [r, i] = ot(e, 36e5),
      [a, o] = ot(i, 6e4),
      [s, c] = ot(o, 1e3);
    return {
      hour: r,
      minute: a,
      second: s,
      millisecond: c,
      microsecond: t,
      nanosecond: n,
    };
  }
  function Pt(e) {
    let [t, n] = at(e, xt);
    return [Number(t), Number(n)];
  }
  function Ft(e) {
    return It(e) + BigInt(kt(e));
  }
  function It(e) {
    return BigInt(Lt(e)) * St;
  }
  function Lt(e) {
    return Rt(e.year, e.month, e.day);
  }
  function Rt(e, t = 1, n = 1) {
    let r = t - 1;
    return (
      (e += Math.floor(r / 12)),
      (t = st(r, 12)),
      Date.UTC((e % 400) - 400, t, 0) / 864e5 + 146097 * (ct(e, 400) + 1) + n
    );
  }
  function zt(e) {
    let [t, n] = at(e, St);
    return { ...Bt(Number(t)), ...Mt(Number(n)) };
  }
  function Bt(e) {
    let t = new Date(864e5 * st(e, 146097));
    return {
      year: t.getUTCFullYear() + 400 * Math.floor(e / 146097),
      month: t.getUTCMonth() + 1,
      day: t.getUTCDate(),
    };
  }
  function Vt(e) {
    return [e, 0];
  }
  function Ht(e, t, n) {
    return { year: e, month: t, day: n };
  }
  function Ut(e, t) {
    switch (t) {
      case 2:
        return Gt(e) ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
    }
    return 31;
  }
  function Wt(e) {
    return Gt(e) ? 366 : 365;
  }
  function Gt(e) {
    return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
  }
  function Kt(e) {
    return st(Rt(e.year, e.month, e.day) + 4, 7) || 7;
  }
  function qt(e) {
    return Rt(e.year, e.month, e.day) - Rt(e.year) + 1;
  }
  function Jt(e) {
    let t = e.year,
      n = Math.floor((qt(e) - Kt(e) + 10) / 7),
      r = Yt(t);
    return (
      n < 1 ? (n = r = Yt(--t)) : n > r && ((n = 1), (r = Yt(++t))),
      { weekOfYear: n, yearOfWeek: t, Be: r }
    );
  }
  function Yt(e) {
    let t = Kt({ year: e, month: 1, day: 1 });
    return t === 4 || (t === 3 && Gt(e)) ? 53 : 52;
  }
  function Xt({ year: e }) {
    return e < 1 ? { era: `bce`, eraYear: 1 - e } : { era: `ce`, eraYear: e };
  }
  function Zt(e) {
    return (Qt(e), Et(e));
  }
  function Qt(e) {
    return ($t(e, 1), e);
  }
  function $t(e, t) {
    let { year: n } = e,
      r = Re(e, `month`, 1, 12, t);
    return { year: n, month: r, day: Re(e, `day`, 1, Ut(n, r), t) };
  }
  function en(e, t) {
    return e ? e.ae(t) : t;
  }
  function tn(e, t, n) {
    return e ? e.L(t, n) : Vt(n);
  }
  function nn(e, t) {
    return e === 0 ? Xt(t) : (e && e.h?.(t)) || {};
  }
  function rn(e, t, n, r) {
    return e ? e.de(t, n, r) : Ht(t, n, r);
  }
  function an(e, t) {
    return e ? e.j(t) : 12;
  }
  function on(e, t, n) {
    return e ? e.o(t, n) : Ut(t, n);
  }
  function sn(e, t) {
    let { year: n, month: r } = en(e, t),
      [i, a] = tn(e, n, r);
    return ft(i, a);
  }
  function cn(e, t) {
    let { year: n } = en(e, t);
    return e ? e.q(n) : Gt(n);
  }
  function ln(e, t) {
    let { year: n } = en(e, t);
    return an(e, n);
  }
  function un(e, t) {
    let { year: n, month: r } = en(e, t);
    return on(e, n, r);
  }
  function dn(e, t) {
    let { year: n } = en(e, t);
    return e ? e.i(n) : Wt(n);
  }
  function fn(e, t) {
    if (!e) return qt(t);
    let { year: n } = en(e, t),
      r = rn(e, n, 1, 1);
    return Lt(t) - Lt(r) + 1;
  }
  function pn(e, t) {
    return e === void 0 ? Jt(t).weekOfYear : void 0;
  }
  function mn(e, t) {
    return e === void 0 ? Jt(t).yearOfWeek : void 0;
  }
  var hn = Je(gn, `string`);
  function gn(e, t, n = e) {
    return (typeof t !== e && Le(De(n, t)), t);
  }
  function _n(e, t = `number`) {
    return (
      Number.isInteger(e) || Ie(((e, t) => `Non-integer ${e}: ${t}`)(t, e)),
      e || 0
    );
  }
  function vn(e) {
    return (
      typeof e == `symbol` && Le(`Cannot convert Symbol to string`),
      String(e)
    );
  }
  function yn(e, t) {
    return Te(e) ? String(e) : hn(e, t);
  }
  function bn(e, t) {
    return _n(be(e, t), t);
  }
  var xn = { compatible: 0, reject: 1, earlier: 2, later: 3 },
    Sn = [
      Math.floor,
      (e) => (lt(e) ? Math.floor(e) : Math.round(e)),
      Math.ceil,
      (e) => (lt(e) ? Math.ceil(e) : Math.round(e)),
      Math.trunc,
      (e) => (lt(e) ? Math.trunc(e) || 0 : Math.round(e)),
      (e) => (e < 0 ? Math.floor(e) : Math.ceil(e)),
      (e) => Math.sign(e) * Math.round(Math.abs(e)) || 0,
      (e) => (lt(e) ? (e = Math.trunc(e) || 0) + (e % 2) : Math.round(e)),
    ];
  function Cn(e, t, n, r = 0) {
    let i = n[e];
    if (i === void 0) return r;
    let a = vn(i),
      o = t[a];
    return (o === void 0 && Ie(ke(e, a, t)), o);
  }
  var wn = Je(Cn, `disambiguation`, xn),
    Tn = BigInt(1e8) * St,
    En = BigInt(-1e8) * St,
    Dn = En - St;
  function On(e) {
    let t = It(e);
    return (kn(t), t !== Dn || kt(e) || Ie(`Out-of-bounds date`), e);
  }
  function kn(e, t = 1) {
    (e < (t ? Dn : En) || e > Tn) && Ie(`Out-of-bounds date`);
  }
  function An(e) {
    return ((e < En || e > Tn) && Ie(`Out-of-bounds date`), e);
  }
  function jn(e, t) {
    return An(It(e) + BigInt(kt(e) - t));
  }
  function Mn(e) {
    return { epochNanoseconds: e };
  }
  function Nn(e, t, n) {
    return { calendar: n, timeZone: t, epochNanoseconds: e };
  }
  function Pn(e, t) {
    return qe(Ct, e, Fn(e, t));
  }
  function Fn(e, t) {
    return qe(Tt, e, { calendar: t });
  }
  function In(e) {
    return ((t = e.epochNanoseconds), Number(it(t, bt)));
    var t;
  }
  function Ln(e) {
    return e.epochNanoseconds;
  }
  function Rn(e) {
    return zn(e, _t, 7);
  }
  function zn(e, t, n) {
    return Bn(e / t, n) * t;
  }
  function Bn(e, t) {
    return Sn[t](e);
  }
  var Vn = Be(Hn, WeakMap);
  function Hn(e) {
    let { epochNanoseconds: t, timeZone: n } = e,
      r = n.B(t);
    return { ...zt(t + BigInt(r)), offsetNanoseconds: r };
  }
  function Un(e, t, n = 0, r = e.N(t)) {
    if (r.length === 1) return r[0];
    if ((n === 1 && Ie(`Ambiguous offset`), r.length)) return r[+(n === 3)];
    let i = Ft(t),
      a = ((e, t) => {
        let n = e.B(t - St);
        return ((e) => (e > 864e11 && Ie(`Out-of-bounds TimeZone gap`), e))(
          e.B(t + St) - n,
        );
      })(e, i),
      o = zt(i + BigInt(a * (n === 2 ? -1 : 1)));
    return (r = e.N(o))[n === 2 ? 0 : r.length - 1];
  }
  var Wn = Ze(
    `([+-])(\\d{2})(?::?(\\d{2})(?::?(\\d{2})(?:[.,](\\d{1,9}))?)?)?`,
  );
  function Gn(e, t) {
    let n = Wn.exec(e);
    if (
      n &&
      ((e) =>
        ((e) => {
          (e[0] !== `T` && e[0] !== `t`) || (e = e.slice(1));
          let t = e.search(/[.,]/),
            n = t < 0 ? e : e.slice(0, t),
            r = n.split(`:`);
          return r.length === 1
            ? /^(?:\d{2}|\d{4}|\d{6})$/i.test(n)
            : (r.length === 2 || r.length === 3) &&
                r.every((e) => e.length === 2 && /^\d{2}$/i.test(e));
        })(e.slice(1)))(n[0])
    )
      return ((e, t) => {
        let n = e[4] || e[5];
        return (
          t && n && Ie(Pe(n)),
          (r =
            (et(e[2]) * vt + et(e[3]) * _t + et(e[4]) * gt + Qe(e[5] || ``)) *
            $e(e[1])),
          Math.abs(r) >= 864e11 && Ie(`Out-of-bounds offset`),
          r
        );
        var r;
      })(n, t);
  }
  ({
    ...Object.assign(
      {},
      {
        era: yn,
        month: Se,
        monthCode(e, t) {
          if (typeof e == `string`) return e;
          if (e && typeof e == `object`) {
            let n = e.toString;
            if (typeof n == `function`) return hn(n.call(e), t);
          }
          return hn(e, t);
        },
        day: Se,
      },
      Ge(Ct, xe),
    ),
  });
  var Kn = Intl.DateTimeFormat;
  function qn(e, t) {
    t < -864e13 && Ie(`Out-of-bounds date`);
    let n = e.formatToParts(t),
      r = {};
    for (let e of n) r[e.type] = e.value;
    return r;
  }
  var Jn = {
      El_Aaiun: 17,
      Tucuman: 12,
      Tirane: 11,
      Riga: 10,
      Simferopol: 9,
      Vienna: 9,
      Tunis: 8,
      Boa_Vista: 6,
      Fortaleza: 6,
      Maceio: 6,
      Noronha: 6,
      Recife: 6,
      Gaza: 6,
      Hebron: 6,
      DeNoronha: 6,
    },
    Yn = -388152e4;
  function Xn(e) {
    return $n(zt(e.epochNanoseconds), void 0) + `Z`;
  }
  function Zn(e) {
    let t = e.calendar,
      n = e.timeZone,
      r = n.B(e.epochNanoseconds);
    return (
      $n(zt(e.epochNanoseconds + BigInt(r)), void 0) +
      rr(Rn(r)) +
      ir(n.id, 0) +
      (t === void 0 ? `` : ar(dt(t), 0))
    );
  }
  function Qn(e) {
    let t = e.calendar;
    return $n(e, void 0) + (t === void 0 ? `` : ar(dt(t), 0));
  }
  function $n(e, t) {
    return er(e) + `T` + nr(e, t);
  }
  function er(e) {
    return tr(e) + `-` + nt(e.day);
  }
  function tr(e) {
    let { year: t } = e;
    return (
      (t < 0 || t > 9999 ? cr(t) + tt(6, Math.abs(t)) : tt(4, t)) +
      `-` +
      nt(e.month)
    );
  }
  function nr(e, t) {
    let n = [nt(e.hour), nt(e.minute)];
    return (
      t !== -1 &&
        n.push(
          nt(e.second) +
            ((e, t, n, r) => sr(e * ht + t * mt + n, r))(
              e.millisecond,
              e.microsecond,
              e.nanosecond,
              t,
            ),
        ),
      n.join(`:`)
    );
  }
  function rr(e, t = 0) {
    if (t === 1) return ``;
    let [n, r] = ot(Math.abs(e), vt),
      [i, a] = ot(r, _t),
      [o, s] = ot(a, gt);
    return cr(e) + nt(n) + `:` + nt(i) + (o || s ? `:` + nt(o) + sr(s) : ``);
  }
  function ir(e, t) {
    return t === 1 ? `` : `[` + (t === 2 ? `!` : ``) + e + `]`;
  }
  function ar(e, t) {
    return `[` + (t ? `!` : ``) + `u-ca=` + e + `]`;
  }
  var or = /0+$/;
  function sr(e, t) {
    let n = tt(9, e);
    return (
      (n = t === void 0 ? n.replace(or, ``) : n.slice(0, t)),
      n ? `.` + n : ``
    );
  }
  function cr(e) {
    return e < 0 ? `-` : `+`;
  }
  var lr =
      /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/,
    ur = /[^\w\/:+-]+/;
  function dr(e) {
    return fr(hn(e));
  }
  function fr(e) {
    return pr(e).id;
  }
  function pr(e) {
    let t = e.toUpperCase(),
      n = ((e) => {
        let t = Gn(e, 1);
        if (t !== void 0) return { id: rr(t), X: t, m: t };
      })(t);
    return n
      ? { kind: `fixed`, ...n }
      : mr(
          t === `UTC`
            ? `UTC`
            : ((e) => (
                ur.test(e) && Ie(Ne(e)),
                lr.test(e) && Ie(`Forbidden ICU TimeZone`),
                e
                  .toLowerCase()
                  .split(`/`)
                  .map((e, t) =>
                    (e.length <= 3 || /\d/.test(e)) && !/etc|yap/.test(e)
                      ? e.toUpperCase()
                      : e.replace(/baja|dumont|[a-z]+/g, (e, n) =>
                          (e.length <= 2 && !t) || e === `in` || e === `chat`
                            ? e.toUpperCase()
                            : e.length > 2 || !n
                              ? Xe(e).replace(
                                  /island|noronha|murdo|rivadavia|urville/,
                                  Xe,
                                )
                              : e,
                        ),
                  )
                  .join(`/`)
              ))(e),
        );
  }
  var mr = Be((e) => {
      if (e === `UTC`) return { kind: `utc`, id: e, m: e };
      let t = hr(e.toUpperCase());
      return {
        kind: `named`,
        id: e,
        format: t,
        m: t.resolvedOptions().timeZone,
      };
    }),
    hr = Be(
      (e) =>
        new Kn(`en-u-hc-h23`, {
          calendar: `iso8601`,
          timeZone: e,
          era: `short`,
          year: `numeric`,
          month: `numeric`,
          day: `numeric`,
          hour: `numeric`,
          minute: `numeric`,
          second: `numeric`,
        }),
    );
  function gr(e) {
    let t = pr(e);
    return _r(t.id, t);
  }
  var _r = Be((e, t) =>
      t.kind === `named`
        ? new yr(e, t.m, t.format)
        : new vr(e, t.m, t.kind === `fixed` ? t.X : 0),
    ),
    vr = class {
      constructor(e, t, n) {
        ((this.id = e), (this.m = t), (this.X = n));
      }
      B() {
        return this.X;
      }
      N(e) {
        return [jn(e, this.X)];
      }
      O() {}
    },
    yr = class {
      constructor(e, t, n) {
        ((this.id = e),
          (this.m = t),
          (this.ke = ((e, t) => {
            let n = Be(e),
              r = Be(xr),
              i = 86400 * t;
            function a(e) {
              let [t, a] = Sr(e, i),
                s = Cr(t),
                c = Cr(a),
                l = n(s),
                u = n(c);
              return l === u ? l : o(r(s, c), l, u, e);
            }
            function o(t, n, r, i) {
              let a, o;
              for (
                ;
                (i === void 0 ||
                  (a = i < t[0] ? n : i >= t[1] ? r : void 0) === void 0) &&
                (o = t[1] - t[0]);
              ) {
                let n = t[0] + Math.floor(o / 2);
                e(n) === r ? (t[1] = n) : (t[0] = n + 1);
              }
              return a;
            }
            return {
              xe(e) {
                let t = a(e - 86400),
                  n = a(e + 86400),
                  r = e - t,
                  i = e - n;
                if (t === n) return [r];
                let o = a(r);
                return o === a(i) ? [e - o] : t > n ? [r, i] : [];
              },
              we: a,
              O: function e(t, a) {
                if (a > 0 && t >= 864e10) return;
                if (a < 0) {
                  if (t <= Yn) return;
                  let n = br() + 94867200;
                  if (t > n) return e(n, -1);
                }
                let [s, c] = Sr(a > 0 ? Math.max(t, Yn) : t, i),
                  l = i * a,
                  u = a > 0 ? Math.max(t, br()) + 94867200 : Yn,
                  d = () => (a < 0 ? c > u : s < u);
                for (; d(); ) {
                  let e = Cr(s),
                    i = Cr(c),
                    u = n(e),
                    d = n(i);
                  if (u !== d) {
                    let n = r(e, i);
                    o(n, u, d);
                    let s = n[0];
                    if ((rt(s, t) || 1) === a) return s;
                  }
                  ((s += l), (c += l));
                }
              },
            };
          })(
            ((e) => (t) => {
              let n = qn(e, 1e3 * t);
              return (
                86400 *
                  Rt(
                    ((e) => {
                      let t = e.relatedYear;
                      if (t !== void 0) return parseInt(t);
                      let n = parseInt(e.year);
                      return e.era !== void 0 && ut(e.era) === `bce`
                        ? 1 - n
                        : n;
                    })(n),
                    parseInt(n.month),
                    parseInt(n.day),
                  ) +
                3600 * parseInt(n.hour) +
                60 * parseInt(n.minute) +
                parseInt(n.second) -
                t
              );
            })(n),
            ((e) => Jn[e.split(`/`).pop()] || 60)(e),
          )));
      }
      B(e) {
        return this.ke.we(((e) => Pt(e)[0])(e)) * gt;
      }
      N(e) {
        let t = 86400 * Lt(e) + At(e),
          n = jt(e);
        return this.ke.xe(t).map((e) => An(BigInt(e) * xt + BigInt(n)));
      }
      O(e, t) {
        let [n, r] = Pt(e),
          i = this.ke.O(n + (t > 0 || r ? 1 : 0), t);
        if (i !== void 0) return BigInt(i) * xt;
      }
    };
  function br() {
    return Math.floor(Date.now() / 1e3);
  }
  function xr(e, t) {
    return [e, t];
  }
  function Sr(e, t) {
    let n = Math.floor(e / t) * t;
    return [n, n + t];
  }
  function Cr(e) {
    return Fe(e, -1e10, 864e10);
  }
  function wr(e) {
    return `(\\d{2})(?:(:?)(\\d{2})(?:\\${e}(\\d{2})(?:[.,](\\d{1,9}))?)?)?`;
  }
  (`` + wr(8) + wr(15),
    `` + wr(2) + `(([+-])${wr(9)})?((?:\\[(!?)([^\\]]*)\\]){0,9})`);
  function Tr(e, t, n) {
    return Nn(e.epochNanoseconds, t, n);
  }
  function Er(e, t, n) {
    return Nn(An(Un(t, e, ((e) => wn(ye(e)))(n))), t, e.calendar);
  }
  function Dr(e) {
    return Mn(An(BigInt(bn(e)) * bt));
  }
  ({
    ...Object.assign(
      {},
      { year: `numeric`, month: `numeric`, day: `numeric` },
      { hour: `numeric`, minute: `numeric`, second: `numeric` },
    ),
  });
  var Or = `PlainYearMonth`,
    kr = `PlainMonthDay`,
    Ar = `PlainDate`,
    jr = `PlainDateTime`,
    Mr = `PlainTime`,
    Nr = `ZonedDateTime`,
    Pr = `Instant`,
    Fr = `Duration`,
    Ir = `Calendar`;
  function Lr(e, t, n, ...r) {
    return (
      Object.defineProperties(t, Ve(e)),
      Object.defineProperties(t.prototype, Ue(`Temporal.` + e)),
      Object.defineProperties(
        t.prototype,
        We(
          (e) => ({
            get() {
              return e(n(this));
            },
            configurable: 1,
          }),
          Object.assign({}, ...r),
        ),
      ),
      t
    );
  }
  var Rr =
    Ye.name === `noop`
      ? (e) => {
          Object.defineProperty(e, '_str_', { value: e.toJSON() });
        }
      : Ye;
  function zr() {
    Le(je);
  }
  function Br() {
    Le(Ae);
  }
  var Vr = {
      era(e) {
        return nn(e.calendar, e).era;
      },
      eraYear(e) {
        return nn(e.calendar, e).eraYear;
      },
      year(e) {
        return en(e.calendar, e).year;
      },
      month(e) {
        return en(e.calendar, e).month;
      },
      monthCode(e) {
        return sn(e.calendar, e);
      },
      day(e) {
        return en(e.calendar, e).day;
      },
    },
    Hr = {
      daysInMonth(e) {
        return un(e.calendar, e);
      },
      daysInYear(e) {
        return dn(e.calendar, e);
      },
      monthsInYear(e) {
        return ln(e.calendar, e);
      },
      inLeapYear(e) {
        return cn(e.calendar, e);
      },
    },
    Ur = {
      dayOfWeek(e) {
        return Kt(e);
      },
      dayOfYear(e) {
        return fn(e.calendar, e);
      },
      weekOfYear(e) {
        return pn(e.calendar, e);
      },
      yearOfWeek(e) {
        return mn(e.calendar, e);
      },
      daysInWeek() {
        return 7;
      },
      daysInMonth(e) {
        return un(e.calendar, e);
      },
      daysInYear(e) {
        return dn(e.calendar, e);
      },
      monthsInYear(e) {
        return ln(e.calendar, e);
      },
      inLeapYear(e) {
        return cn(e.calendar, e);
      },
    };
  function Wr(e) {
    return Ke(Object.keys(e));
  }
  var Gr = Wr(wt),
    Kr = Wr(Vr);
  (Wr(Hr), Wr(Ur), `${Or}`, `${kr}`, `${Ar}`);
  var qr = `${jr}Record`;
  `${Mr}`;
  var Jr = `${Nr}Record`,
    Yr = `${Pr}Record`;
  (`${Fr}`, `${Ir}`);
  var Xr = new WeakMap(),
    Zr = new WeakMap(),
    Qr = new WeakMap(),
    $r = new WeakMap();
  function ei(e) {
    return ti(e) || zr();
  }
  function ti(e) {
    return Xr.get(e);
  }
  function ni(e) {
    return ri(e) || zr();
  }
  function ri(e) {
    return Zr.get(e);
  }
  function ii(e, t) {
    Zr.set(e, t);
  }
  function ai(e) {
    return oi(e) || zr();
  }
  function oi(e) {
    return Qr.get(e);
  }
  function si(e, t) {
    Qr.set(e, t);
  }
  function ci(e) {
    return li(e) || zr();
  }
  function li(e) {
    return $r.get(e);
  }
  function ui(e, t) {
    $r.set(e, t);
  }
  function di(e) {
    return ei(e).id;
  }
  function fi(e) {
    let t = ei(e).ue;
    return (t || Ie(Me(di(e), `getExotic or getAny`)), t);
  }
  function pi(e) {
    if (e !== void 0) return mi(e);
  }
  function mi(e) {
    return (fi(e), di(e));
  }
  var hi = ci,
    gi = Lr(
      qr,
      class {
        get calendarId() {
          return hi(this).calendarId;
        }
        toJSON() {
          return hi(this).toJSON();
        }
        valueOf() {
          return hi(this).valueOf();
        }
      },
      hi,
      Kr,
      Gr,
    );
  function _i(e) {
    let t = Object.create(gi.prototype);
    return (ui(t, e), Rr(t), t);
  }
  function vi(e, t, n, r, i, a, o, s, c, l) {
    return _i(new ue.PlainDateTime(e, t, n, r, i, a, o, s, c, pi(l)));
  }
  function yi(e, t, n) {
    return Si(hi(e).toZonedDateTime(t, n));
  }
  var bi = ai,
    xi = Lr(
      Jr,
      class {
        get calendarId() {
          return bi(this).calendarId;
        }
        get timeZoneId() {
          return bi(this).timeZoneId;
        }
        get epochMilliseconds() {
          return bi(this).epochMilliseconds;
        }
        get epochNanoseconds() {
          return bi(this).epochNanoseconds;
        }
        toJSON() {
          return bi(this).toJSON();
        }
        valueOf() {
          return bi(this).valueOf();
        }
      },
      bi,
      Kr,
      Gr,
    );
  function Si(e) {
    let t = Object.create(xi.prototype);
    return (si(t, e), Rr(t), t);
  }
  function Ci(e) {
    return bi(e).offsetNanoseconds;
  }
  var wi = ni,
    Ti = Lr(
      Yr,
      class {
        get epochMilliseconds() {
          return wi(this).epochMilliseconds;
        }
        get epochNanoseconds() {
          return wi(this).epochNanoseconds;
        }
        toJSON() {
          return wi(this).toJSON();
        }
        valueOf() {
          return wi(this).valueOf();
        }
      },
    );
  function Ei(e) {
    let t = Object.create(Ti.prototype);
    return (ii(t, e), Rr(t), t);
  }
  function Di(e) {
    return Ei(ue.Instant.fromEpochMilliseconds(e));
  }
  function Oi(e, t) {
    return Si(wi(e).toZonedDateTimeISO(t));
  }
  function ki(e) {
    return e === void 0 ? void 0 : Ai(e);
  }
  function Ai(e) {
    return fi(e)();
  }
  var ji = ci,
    Mi = Lr(
      qr,
      class {
        get calendarId() {
          return dt(ji(this).calendar);
        }
        toJSON() {
          return Qn(ji(this));
        }
        valueOf() {
          return Br();
        }
      },
      ji,
      Vr,
      wt,
    );
  function Ni(e) {
    let t = Object.create(Mi.prototype);
    return (ui(t, e), Rr(t), t);
  }
  function Pi(e, t, n, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l) {
    return Ni(
      Pn(
        On(
          Zt(
            We(xe, {
              year: e,
              month: t,
              day: n,
              hour: r,
              minute: i,
              second: a,
              millisecond: o,
              microsecond: s,
              nanosecond: c,
            }),
          ),
        ),
        ki(l),
      ),
    );
  }
  function Fi(e, t, n) {
    return Ri(Er(ji(e), gr(dr(t)), n));
  }
  var Ii = ai,
    Li = Lr(
      Jr,
      class {
        get calendarId() {
          return dt(Ii(this).calendar);
        }
        get timeZoneId() {
          return Ii(this).timeZone.id;
        }
        get epochMilliseconds() {
          return In(Ii(this));
        }
        get epochNanoseconds() {
          return Ln(Ii(this));
        }
        toJSON() {
          return Zn(Ii(this));
        }
        valueOf() {
          return Br();
        }
      },
      zi,
      Vr,
      wt,
    );
  function Ri(e) {
    let t = Object.create(Li.prototype);
    return (si(t, e), Rr(t), t);
  }
  function zi(e) {
    let t = Ii(e);
    return { ...Vn(t), calendar: t.calendar };
  }
  function Bi(e) {
    return Vn(Ii(e)).offsetNanoseconds;
  }
  (vt - 1, _t - 1, gt - 1, ht - 1, mt - 1);
  var Vi = ni,
    Hi = Lr(
      Yr,
      class {
        get epochMilliseconds() {
          return In(Vi(this));
        }
        get epochNanoseconds() {
          return Ln(Vi(this));
        }
        toJSON() {
          return Xn(Vi(this));
        }
        valueOf() {
          return Br();
        }
      },
    );
  function Ui(e) {
    let t = Object.create(Hi.prototype);
    return (ii(t, e), Rr(t), t);
  }
  function Wi(e) {
    return Ui(Dr(e));
  }
  function Gi(e, t) {
    return Ri(Tr(Vi(e), gr(dr(t))));
  }
  var Ki = ue ? Ci : Bi,
    D = ue ? vi : Pi,
    qi = ue ? yi : Fi,
    Ji = ue ? Di : Wi,
    Yi = ue ? Oi : Gi;
  function Xi(e, t) {
    let n = ha(e);
    return ((n[2] += t * 7), ga(n));
  }
  function Zi(e, t) {
    let n = ha(e);
    return ((n[2] += t), ga(n));
  }
  function Qi(e, t) {
    let n = ha(e);
    return ((n[6] += t), ga(n));
  }
  function $i(e, t) {
    return ea(e, t) / 7;
  }
  function ea(e, t) {
    return (t.valueOf() - e.valueOf()) / 864e5;
  }
  function ta(e, t) {
    return (t.valueOf() - e.valueOf()) / 36e5;
  }
  function na(e, t) {
    return (t.valueOf() - e.valueOf()) / 6e4;
  }
  function ra(e, t) {
    return (t.valueOf() - e.valueOf()) / 1e3;
  }
  function ia(e, t) {
    let n = O(e),
      r = O(t);
    return {
      years: 0,
      months: 0,
      days: Math.round(ea(n, r)),
      milliseconds: t.valueOf() - r.valueOf() - (e.valueOf() - n.valueOf()),
    };
  }
  function aa(e, t) {
    let n = oa(e, t);
    return n !== null && n % 7 == 0 ? n / 7 : null;
  }
  function oa(e, t) {
    return va(e) === va(t) ? Math.round(ea(e, t)) : null;
  }
  function O(e) {
    return ga([e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()]);
  }
  function sa(e) {
    return ga([
      e.getUTCFullYear(),
      e.getUTCMonth(),
      e.getUTCDate(),
      e.getUTCHours(),
    ]);
  }
  function ca(e) {
    return ga([
      e.getUTCFullYear(),
      e.getUTCMonth(),
      e.getUTCDate(),
      e.getUTCHours(),
      e.getUTCMinutes(),
    ]);
  }
  function la(e) {
    return ga([
      e.getUTCFullYear(),
      e.getUTCMonth(),
      e.getUTCDate(),
      e.getUTCHours(),
      e.getUTCMinutes(),
      e.getUTCSeconds(),
    ]);
  }
  function ua(e, t, n) {
    let r = e.getUTCFullYear(),
      i = da(e, r, t, n);
    if (i < 1) return da(e, r - 1, t, n);
    let a = da(e, r + 1, t, n);
    return a >= 1 ? Math.min(i, a) : i;
  }
  function da(e, t, n, r) {
    let i = ga([t, 0, 1 + fa(t, n, r)]),
      a = O(e),
      o = Math.round(ea(i, a));
    return Math.floor(o / 7) + 1;
  }
  function fa(e, t, n) {
    let r = 7 + t - n;
    return -((7 + ga([e, 0, r]).getUTCDay() - t) % 7) + r - 1;
  }
  function pa(e) {
    return [
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds(),
    ];
  }
  function ma(e) {
    return new Date(
      e[0],
      e[1] || 0,
      e[2] == null ? 1 : e[2],
      e[3] || 0,
      e[4] || 0,
      e[5] || 0,
    );
  }
  function ha(e) {
    return [
      e.getUTCFullYear(),
      e.getUTCMonth(),
      e.getUTCDate(),
      e.getUTCHours(),
      e.getUTCMinutes(),
      e.getUTCSeconds(),
      e.getUTCMilliseconds(),
    ];
  }
  function ga(e) {
    return (e.length === 1 && (e = e.concat([0])), new Date(Date.UTC(...e)));
  }
  function _a(e) {
    return !isNaN(e.valueOf());
  }
  function va(e) {
    return (
      e.getUTCHours() * 1e3 * 60 * 60 +
      e.getUTCMinutes() * 1e3 * 60 +
      e.getUTCSeconds() * 1e3 +
      e.getUTCMilliseconds()
    );
  }
  var ya = {};
  function ba(e, t) {
    ya[e] = t;
  }
  function xa(e) {
    return new ya[e]();
  }
  ba(
    `gregory`,
    class {
      getMarkerYear(e) {
        return e.getUTCFullYear();
      }
      getMarkerMonth(e) {
        return e.getUTCMonth();
      }
      getMarkerDay(e) {
        return e.getUTCDate();
      }
      arrayToMarker(e) {
        return ga(e);
      }
      markerToArray(e) {
        return ha(e);
      }
    },
  );
  function Sa(e, t) {
    let n = null,
      r = null;
    return (
      e.start && (n = t.createMarker(e.start)),
      e.end && (r = t.createMarker(e.end)),
      (!n && !r) || (n && r && r < n) ? null : { start: n, end: r }
    );
  }
  function Ca(e, t) {
    let n = [],
      { start: r } = t,
      i,
      a;
    for (e.sort(wa), i = 0; i < e.length; i += 1)
      ((a = e[i]),
        a.start > r && n.push({ start: r, end: a.start }),
        a.end > r && (r = a.end));
    return (r < t.end && n.push({ start: r, end: t.end }), n);
  }
  function wa(e, t) {
    return e.start.valueOf() - t.start.valueOf();
  }
  function Ta(e, t) {
    let { start: n, end: r } = e,
      i = null;
    return (
      t.start !== null &&
        (n =
          n === null
            ? t.start
            : new Date(Math.max(n.valueOf(), t.start.valueOf()))),
      t.end != null &&
        (r =
          r === null
            ? t.end
            : new Date(Math.min(r.valueOf(), t.end.valueOf()))),
      (n === null || r === null || n < r) && (i = { start: n, end: r }),
      i
    );
  }
  function Ea(e, t) {
    return (
      (e.end === null || t.start === null || e.end > t.start) &&
      (e.start === null || t.end === null || e.start < t.end)
    );
  }
  function Da(e, t) {
    return (e.start === null || t >= e.start) && (e.end === null || t < e.end);
  }
  function Oa(e, t) {
    return t.start != null && e < t.start
      ? t.start
      : t.end != null && e >= t.end
        ? new Date(t.end.valueOf() - 1)
        : e;
  }
  function ka(e, t) {
    let n = t.markerToArray(e.marker);
    return {
      marker: e.marker,
      timeZoneOffset: e.timeZoneOffset,
      array: n,
      year: n[0],
      month: n[1],
      day: n[2],
      hour: n[3],
      minute: n[4],
      second: n[5],
      millisecond: n[6],
    };
  }
  function Aa(e, t, n) {
    let r = ka(e, n.calendarSystem);
    return {
      date: r,
      start: r,
      end: t ? ka(t, n.calendarSystem) : null,
      timeZone: n.timeZone,
      localeCodes: n.locale.codes,
    };
  }
  function ja(e) {
    return e % 1 == 0;
  }
  function Ma(e, t) {
    let n = String(e);
    return `000`.substr(0, t - n.length) + n;
  }
  var Na = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
  function k(e, t) {
    return typeof e == `string`
      ? Pa(e)
      : typeof e == `object` && e
        ? Fa(e)
        : typeof e == `number`
          ? Fa({ [t || `milliseconds`]: e })
          : null;
  }
  function Pa(e) {
    let t = Na.exec(e);
    if (t) {
      let e = t[1] ? -1 : 1;
      return {
        years: 0,
        months: 0,
        days: e * (t[2] ? parseInt(t[2], 10) : 0),
        milliseconds:
          e *
          ((t[3] ? parseInt(t[3], 10) : 0) * 60 * 60 * 1e3 +
            (t[4] ? parseInt(t[4], 10) : 0) * 60 * 1e3 +
            (t[5] ? parseInt(t[5], 10) : 0) * 1e3 +
            (t[6] ? parseInt(t[6], 10) : 0)),
      };
    }
    return null;
  }
  function Fa(e) {
    let t = {
        years: e.years || e.year || 0,
        months: e.months || e.month || 0,
        days: e.days || e.day || 0,
        milliseconds:
          (e.hours || e.hour || 0) * 60 * 60 * 1e3 +
          (e.minutes || e.minute || 0) * 60 * 1e3 +
          (e.seconds || e.second || 0) * 1e3 +
          (e.milliseconds || e.millisecond || e.ms || 0),
      },
      n = e.weeks || e.week;
    return (n && ((t.days += n * 7), (t.specifiedWeeks = !0)), t);
  }
  function Ia(e, t) {
    return (
      e.years === t.years &&
      e.months === t.months &&
      e.days === t.days &&
      e.milliseconds === t.milliseconds
    );
  }
  function La(e, t) {
    return {
      years: e.years - t.years,
      months: e.months - t.months,
      days: e.days - t.days,
      milliseconds: e.milliseconds - t.milliseconds,
    };
  }
  function Ra(e) {
    return Ba(e) / 365;
  }
  function za(e) {
    return Ba(e) / 30;
  }
  function Ba(e) {
    return Va(e) / 864e5;
  }
  function Va(e) {
    return (
      e.years * 31536e6 + e.months * 2592e6 + e.days * 864e5 + e.milliseconds
    );
  }
  function Ha(e) {
    let t = e.milliseconds;
    if (t) {
      if (t % 1e3 != 0) return { unit: `millisecond`, value: t };
      if (t % 6e4 != 0) return { unit: `second`, value: t / 1e3 };
      if (t % 36e5 != 0) return { unit: `minute`, value: t / 6e4 };
      if (t) return { unit: `hour`, value: t / 36e5 };
    }
    return e.days
      ? e.specifiedWeeks && e.days % 7 == 0
        ? { unit: `week`, value: e.days / 7 }
        : { unit: `day`, value: e.days }
      : e.months
        ? { unit: `month`, value: e.months }
        : e.years
          ? { unit: `year`, value: e.years }
          : { unit: `millisecond`, value: 0 };
  }
  function Ua(e, t, n = !1) {
    let r = e.toISOString();
    return (
      (r = r.replace(`.000`, ``)),
      n && (r = r.replace(`T00:00:00Z`, ``)),
      r.length > 10 &&
        (t == null
          ? (r = r.replace(`Z`, ``))
          : t !== 0 && (r = r.replace(`Z`, Ga(t, !0)))),
      r
    );
  }
  function Wa(e) {
    return e.toISOString().replace(/T.*$/, ``);
  }
  function Ga(e, t = !1) {
    let n = e < 0 ? `-` : `+`,
      r = Math.abs(e),
      i = Math.floor(r / 60),
      a = Math.round(r % 60);
    return t
      ? `${n + Ma(i, 2)}:${Ma(a, 2)}`
      : `GMT${n}${i}${a ? `:${Ma(a, 2)}` : ``}`;
  }
  function Ka(e) {
    let t = ``;
    for (let n of e) t += n.value;
    return t;
  }
  var qa =
    /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
  function Ja(e) {
    let t = qa.exec(e);
    if (t) {
      let e = new Date(
        Date.UTC(
          Number(t[1]),
          t[3] ? Number(t[3]) - 1 : 0,
          Number(t[5] || 1),
          Number(t[7] || 0),
          Number(t[8] || 0),
          Number(t[10] || 0),
          t[12] ? Number(`0.${t[12]}`) * 1e3 : 0,
        ),
      );
      if (_a(e)) {
        let n = null;
        return (
          t[13] &&
            (n =
              (t[15] === `-` ? -1 : 1) *
              (Number(t[16] || 0) * 60 + Number(t[18] || 0))),
          { marker: e, isTimeUnspecified: !t[6], timeZoneOffset: n }
        );
      }
    }
    return null;
  }
  var Ya = class {
      constructor(e) {
        ((this.timeZone = e.timeZone),
          (this.calendarSystem = xa(e.calendarSystem)),
          (this.locale = e.locale),
          (this.weekDow = e.locale.week.dow),
          (this.weekDoy = e.locale.week.doy),
          e.weekNumberCalculation === `ISO` &&
            ((this.weekDow = 1), (this.weekDoy = 4)),
          typeof e.firstDay == `number` && (this.weekDow = e.firstDay),
          typeof e.weekNumberCalculation == `function` &&
            (this.weekNumberFunc = e.weekNumberCalculation),
          (this.weekTextLong = e.weekTextLong),
          (this.weekTextShort = e.weekTextShort ?? e.weekTextLong),
          (this.cmdFormatter = e.cmdFormatter));
      }
      createMarker(e) {
        let t = this.createMarkerMeta(e);
        return t === null ? null : t.marker;
      }
      createNowMarker() {
        return this.timestampToMarker(new Date().valueOf());
      }
      createMarkerMeta(e) {
        if (typeof e == `string`) return this.parse(e);
        let t = null;
        return (
          typeof e == `number`
            ? (t = this.timestampToMarker(e))
            : e instanceof Date
              ? ((e = e.valueOf()), isNaN(e) || (t = this.timestampToMarker(e)))
              : Array.isArray(e) && (t = ga(e)),
          t === null || !_a(t) ? null : { marker: t, isTimeUnspecified: !1 }
        );
      }
      parse(e) {
        let t = Ja(e);
        if (t === null) return null;
        let { marker: n } = t;
        return (
          t.timeZoneOffset !== null &&
            (n = this.timestampToMarker(
              n.valueOf() - t.timeZoneOffset * 60 * 1e3,
            )),
          { marker: n, isTimeUnspecified: t.isTimeUnspecified }
        );
      }
      getYear(e) {
        return this.calendarSystem.getMarkerYear(e);
      }
      getMonth(e) {
        return this.calendarSystem.getMarkerMonth(e);
      }
      getDay(e) {
        return this.calendarSystem.getMarkerDay(e);
      }
      add(e, t) {
        let n = this.calendarSystem.markerToArray(e);
        return (
          (n[0] += t.years),
          (n[1] += t.months),
          (n[2] += t.days),
          (n[6] += t.milliseconds),
          this.calendarSystem.arrayToMarker(n)
        );
      }
      subtract(e, t) {
        let n = this.calendarSystem.markerToArray(e);
        return (
          (n[0] -= t.years),
          (n[1] -= t.months),
          (n[2] -= t.days),
          (n[6] -= t.milliseconds),
          this.calendarSystem.arrayToMarker(n)
        );
      }
      addYears(e, t) {
        let n = this.calendarSystem.markerToArray(e);
        return ((n[0] += t), this.calendarSystem.arrayToMarker(n));
      }
      addMonths(e, t) {
        let n = this.calendarSystem.markerToArray(e);
        return ((n[1] += t), this.calendarSystem.arrayToMarker(n));
      }
      diffWholeYears(e, t) {
        let { calendarSystem: n } = this;
        return va(e) === va(t) &&
          n.getMarkerDay(e) === n.getMarkerDay(t) &&
          n.getMarkerMonth(e) === n.getMarkerMonth(t)
          ? n.getMarkerYear(t) - n.getMarkerYear(e)
          : null;
      }
      diffWholeMonths(e, t) {
        let { calendarSystem: n } = this;
        return va(e) === va(t) && n.getMarkerDay(e) === n.getMarkerDay(t)
          ? n.getMarkerMonth(t) -
              n.getMarkerMonth(e) +
              (n.getMarkerYear(t) - n.getMarkerYear(e)) * 12
          : null;
      }
      greatestWholeUnit(e, t) {
        let n = this.diffWholeYears(e, t);
        return n === null
          ? ((n = this.diffWholeMonths(e, t)),
            n === null
              ? ((n = aa(e, t)),
                n === null
                  ? ((n = oa(e, t)),
                    n === null
                      ? ((n = ta(e, t)),
                        ja(n)
                          ? { unit: `hour`, value: n }
                          : ((n = na(e, t)),
                            ja(n)
                              ? { unit: `minute`, value: n }
                              : ((n = ra(e, t)),
                                ja(n)
                                  ? { unit: `second`, value: n }
                                  : {
                                      unit: `millisecond`,
                                      value: t.valueOf() - e.valueOf(),
                                    })))
                      : { unit: `day`, value: n })
                  : { unit: `week`, value: n })
              : { unit: `month`, value: n })
          : { unit: `year`, value: n };
      }
      countDurationsBetween(e, t, n) {
        let r;
        return n.years && ((r = this.diffWholeYears(e, t)), r !== null)
          ? r / Ra(n)
          : n.months && ((r = this.diffWholeMonths(e, t)), r !== null)
            ? r / za(n)
            : n.days && ((r = oa(e, t)), r !== null)
              ? r / Ba(n)
              : (t.valueOf() - e.valueOf()) / Va(n);
      }
      startOf(e, t) {
        return t === `year`
          ? this.startOfYear(e)
          : t === `month`
            ? this.startOfMonth(e)
            : t === `week`
              ? this.startOfWeek(e)
              : t === `day`
                ? O(e)
                : t === `hour`
                  ? sa(e)
                  : t === `minute`
                    ? ca(e)
                    : t === `second`
                      ? la(e)
                      : null;
      }
      startOfYear(e) {
        return this.calendarSystem.arrayToMarker([
          this.calendarSystem.getMarkerYear(e),
        ]);
      }
      startOfMonth(e) {
        return this.calendarSystem.arrayToMarker([
          this.calendarSystem.getMarkerYear(e),
          this.calendarSystem.getMarkerMonth(e),
        ]);
      }
      startOfWeek(e) {
        return this.calendarSystem.arrayToMarker([
          this.calendarSystem.getMarkerYear(e),
          this.calendarSystem.getMarkerMonth(e),
          e.getUTCDate() - ((e.getUTCDay() - this.weekDow + 7) % 7),
        ]);
      }
      computeWeekNumber(e) {
        return this.weekNumberFunc
          ? this.weekNumberFunc(this.toDate(e))
          : ua(e, this.weekDow, this.weekDoy);
      }
      formatToParts(e, t) {
        return t.formatToParts(
          { marker: e, timeZoneOffset: this.offsetForMarker(e) },
          this,
        );
      }
      formatRangeToParts(e, t, n, r = {}) {
        return (
          r.isEndExclusive && (t = Qi(t, -1)),
          n.formatRangeToParts(
            { marker: e, timeZoneOffset: this.offsetForMarker(e) },
            { marker: t, timeZoneOffset: this.offsetForMarker(t) },
            this,
          )
        );
      }
      formatIso(e, t = {}) {
        let n = null;
        return (
          t.omitTimeZoneOffset || (n = this.offsetForMarker(e)),
          Ua(e, n, t.omitTime)
        );
      }
      timestampToMarker(e) {
        if (this.timeZone === `local`) return ga(pa(new Date(e)));
        if (this.timeZone === `UTC`) return new Date(e);
        let t = Yi(Ji(e), this.timeZone);
        return new Date(
          Date.UTC(
            t.year,
            t.month - 1,
            t.day,
            t.hour,
            t.minute,
            t.second,
            t.millisecond,
          ),
        );
      }
      offsetForMarker(e) {
        return this.timeZone === `local`
          ? -ma(ha(e)).getTimezoneOffset()
          : this.timeZone === `UTC`
            ? 0
            : Ki(
                qi(
                  D(
                    e.getUTCFullYear(),
                    e.getUTCMonth() + 1,
                    e.getUTCDate(),
                    e.getUTCHours(),
                    e.getUTCMinutes(),
                    e.getUTCSeconds(),
                    e.getUTCMilliseconds(),
                  ),
                  this.timeZone,
                ),
              ) / 6e10;
      }
      toDate(e) {
        return this.timeZone === `local`
          ? ma(ha(e))
          : this.timeZone === `UTC`
            ? new Date(e.valueOf())
            : new Date(
                qi(
                  D(
                    e.getUTCFullYear(),
                    e.getUTCMonth() + 1,
                    e.getUTCDate(),
                    e.getUTCHours(),
                    e.getUTCMinutes(),
                    e.getUTCSeconds(),
                    e.getUTCMilliseconds(),
                  ),
                  this.timeZone,
                ).epochMilliseconds,
              );
      }
    },
    Xa = new Set([
      `week`,
      `meridiem`,
      `omitZeroMinute`,
      `omitCommas`,
      `forceCommas`,
      `omitTrailing`,
      `weekdayJustify`,
    ]),
    Za = /([ap])\.?m\.?/i,
    Qa = /,/g,
    $a = /\u200e/g,
    eo = /[\s.,]+$/,
    to = /^\s+$/,
    no = class {
      constructor(e) {
        let t = {},
          n = {};
        for (let r in e) Xa.has(r) ? (n[r] = e[r]) : (t[r] = e[r]);
        (t.timeZoneName === `long` && (t.timeZoneName = `short`),
          (this.timeZoneOnly =
            Object.keys(t).length === 1 && t.timeZoneName === `short`),
          (this.weekOnly = !(Object.keys(t).length || !n.week)),
          this.timeZoneOnly ||
            (t.timeZoneName &&
              ((t.hour ||= `2-digit`), (t.minute ||= `2-digit`)),
            n.omitZeroMinute &&
              (t.second || t.fractionalSecondDigits) &&
              delete n.omitZeroMinute,
            (t.timeZone = `UTC`)),
          (this.standardOptions = t),
          (this.extendedOptions = n));
      }
      formatToParts(e, t) {
        let { standardOptions: n, extendedOptions: r } = this;
        if (this.timeZoneOnly)
          return [{ type: `timeZoneName`, value: Ga(e.timeZoneOffset) }];
        if (this.weekOnly)
          return so(
            t.computeWeekNumber(e.marker),
            t.weekTextLong,
            t.weekTextShort,
            t.locale,
            r.week,
          );
        let { normalFormat: i, zeroFormat: a } = this.getFormats(t);
        return io(
          (a && !e.marker.getUTCMinutes() ? a : i).formatToParts(e.marker),
          e,
          n,
          r,
        );
      }
      formatRangeToParts(e, t, n) {
        let { standardOptions: r, extendedOptions: i } = this;
        if (this.timeZoneOnly || this.weekOnly)
          return this.formatToParts(e, n).map((e) => ({
            source: e.type === `literal` ? `shared` : `startRange`,
            ...e,
          }));
        let { normalFormat: a, zeroFormat: o } = this.getFormats(n);
        return ao(
          (o && !e.marker.getUTCMinutes() && !t.marker.getUTCMinutes()
            ? o
            : a
          ).formatRangeToParts(e.marker, t.marker),
          e,
          t,
          r,
          i,
        );
      }
      getFormats(e) {
        if (this.cachedContext !== e) {
          let { standardOptions: t, extendedOptions: n } = this,
            { codes: r } = e.locale,
            i = new Intl.DateTimeFormat(r, t),
            a;
          if (n.omitZeroMinute) {
            let e = { ...t };
            (delete e.minute, (a = new Intl.DateTimeFormat(r, e)));
          }
          ((this.cachedContext = e),
            (this.cachedFormats = { normalFormat: i, zeroFormat: a }));
        }
        return this.cachedFormats;
      }
    };
  function ro(e, t, n) {
    let r = !1,
      i;
    for (let a of e) {
      let e = a.type === `literal`;
      if (e || a.type === `dayPeriod`) {
        let n = a.value;
        if (
          ((n = n.replace($a, ``)), t.omitCommas && (n = n.replace(Qa, ``)), !e)
        ) {
          let { meridiem: e } = t;
          (e === !1
            ? (n = n.replace(Za, ``))
            : e === `narrow`
              ? (n = n.replace(Za, (e, t) => t.toLocaleLowerCase()))
              : e === `short`
                ? (n = n.replace(Za, (e, t) => `${t.toLocaleLowerCase()}m`))
                : e === `lowercase` &&
                  (n = n.replace(Za, (e) => e.toLocaleLowerCase())),
            i && (i.value = i.value.trimEnd()));
        }
        a.value = n;
      } else if (a.type === `timeZoneName`) {
        let e = n(a);
        e != null && ((a.value = e), (r = !0));
      }
      i = e ? a : void 0;
    }
    return { lastLiteral: i, anyTzInjected: r };
  }
  function io(e, t, n, r) {
    let i =
        n.timeZoneName === `short`
          ? t.timeZoneOffset == null
            ? `UTC`
            : Ga(t.timeZoneOffset)
          : void 0,
      { lastLiteral: a, anyTzInjected: o } = ro(e, r, () => i);
    if (
      (i &&
        !o &&
        (a ? (a.value += ` `) : e.push({ type: `literal`, value: ` ` }),
        e.push({ type: `timeZoneName`, value: i })),
      r.weekdayJustify &&
        e.length === 3 &&
        to.test(e[1].value) &&
        e[r.weekdayJustify === `start` ? 2 : 0].type === `weekday` &&
        e.reverse(),
      r.forceCommas)
    )
      for (let t of e)
        t.type === `literal` && to.test(t.value) && (t.value = `,${t.value}`);
    return (r.omitTrailing && oo(e), e.filter((e) => e.value));
  }
  function ao(e, t, n, r, i) {
    let a = r.timeZoneName === `short`;
    if (
      (ro(e, i, (e) => {
        if (!a) return;
        let r = e.source === `endRange` ? n.timeZoneOffset : t.timeZoneOffset;
        return r == null ? `UTC` : Ga(r);
      }),
      i.forceCommas)
    )
      for (let t of e)
        t.type === `literal` && to.test(t.value) && (t.value = `,${t.value}`);
    return (i.omitTrailing && oo(e), e.filter((e) => e.value));
  }
  function oo(e) {
    let t = e[e.length - 1];
    t?.type === `literal` &&
      ((t.value = t.value.replace(eo, ``)), t.value || e.pop());
  }
  function so(e, t, n, r, i) {
    let a = [];
    return (
      i === `long`
        ? a.push({ type: `literal`, value: t })
        : (i === `short` || i === `narrow`) &&
          a.push({ type: `literal`, value: n }),
      (i === `long` || i === `short`) &&
        a.push({ type: `literal`, value: ` ` }),
      a.push({ type: `week`, value: r.simpleNumberFormat.format(e) }),
      r.options.direction === `rtl` && a.reverse(),
      a
    );
  }
  var co = class {
      constructor(e) {
        this.cmdStr = e;
      }
      formatToParts(e, t) {
        let n = t.cmdFormatter(this.cmdStr, Aa(e, null, t));
        return Array.isArray(n) ? n : [{ type: `literal`, value: n }];
      }
      formatRangeToParts(e, t, n) {
        let r = n.cmdFormatter(this.cmdStr, Aa(e, t, n));
        return Array.isArray(r)
          ? r.map((e) => ({ source: `shared`, ...e }))
          : [{ source: `shared`, type: `literal`, value: r }];
      }
    },
    lo = class {
      constructor(e) {
        this.func = e;
      }
      formatToParts(e, t) {
        return [{ type: `literal`, value: this.func(Aa(e, null, t)) }];
      }
      formatRangeToParts(e, t, n) {
        return [
          { source: `shared`, type: `literal`, value: this.func(Aa(e, t, n)) },
        ];
      }
    },
    A = {
      popoverZ: `fc-nH`,
      isolate: `fc-7s`,
      borderBoxRoot: `fc-wa`,
      notAllowed: `fc-4m`,
      noScrollbars: `fc-eM`,
      noShrink: `fc-Qo`,
      calendarScreenRoot: `fc-fi`,
      safeTiles: `fc-fl`,
      calendarPrintRoot: `fc-Jf`,
      cursorPointer: `fc-DP`,
      cursorResizeT: `fc-An`,
      cursorResizeB: `fc-lZ`,
      cursorResizeS: `fc-9V`,
      cursorResizeE: `fc-70`,
      cursorColResizer: `fc-gQ`,
      hit: `fc-mN`,
      hitX: `fc-2d`,
      hitY: `fc-B0`,
      hitXSkinny: `fc-Z1`,
      selectNone: `fc-1Y`,
      invisible: `fc-a9`,
      borderNone: `fc-Tu`,
      borderOnlyT: `fc-hU`,
      borderOnlyB: `fc-3e`,
      borderOnlyS: `fc-PB`,
      borderOnlyE: `fc-II`,
      borderlessX: `fc-MQ`,
      borderlessY: `fc-Vo`,
      fakeBorderS: `fc-2l`,
      flexRow: `fc-Ao`,
      flexCol: `fc-HH`,
      grow: `fc-GV`,
      liquid: `fc-g2`,
      minHeight0: `fc-Ot`,
      liquidX: `fc-hp`,
      printRoot: `fc-uD`,
      printHeader: `fc-jM`,
      noPadding: `fc-OJ`,
      noMargin: `fc-oE`,
      noMarginY: `fc-V3`,
      noMarginX: `fc-SS`,
      whiteSpaceNoWrap: `fc-y2`,
      whiteSpacePre: `fc-CN`,
      overflowAnchorNone: `fc-gZ`,
      crop: `fc-FA`,
      cropNowrap: `fc-7T`,
      rel: `fc-cc`,
      abs: `fc-H0`,
      start0: `fc-6t`,
      fill: `fc-ct`,
      fillTop: `fc-iv`,
      fillX: `fc-Uu`,
      fillY: `fc-7k`,
      fillStart: `fc-Yw`,
      sticky: `fc-Ip`,
      stickyT: `fc-CS`,
      stickyS: `fc-tT`,
      tableHeaderSticky: `fc-hy`,
      contentBox: `fc-Np`,
      offscreen: `fc-aP`,
      alignCenter: `fc-6H`,
      alignStart: `fc-K8`,
      alignEnd: `fc-E3`,
      footerScrollbarSticky: `fc-Px`,
      footerScrollbar: `fc-J4`,
      breakInsideAvoid: `fc-Yi`,
      printSiblingRow: `fc-fx`,
      z0: `fc-BS`,
      z1: `fc-iu`,
      focusZ2: `fc-Bk`,
      internalTimelineSlot: `fc-Nm`,
      internalEvent: `fc-Ft`,
      internalEventMirror: `fc-lc`,
      internalEventDraggable: `fc-uL`,
      internalEventSelected: `fc-Bv`,
      internalEventResizable: `fc-Qk`,
      internalEventResizer: `fc-9X`,
      internalEventResizerStart: `fc-Sj`,
      internalEventResizerEnd: `fc-DL`,
      internalBgEvent: `fc-oP`,
      internalMoreLink: `fc-R2`,
      internalNavLink: `fc-SW`,
      internalPopover: `fc-Cs`,
      internalView: `fc-LQ`,
      internalScroller: `fc-dT`,
    };
  function j(...e) {
    return e.filter(Boolean).join(` `);
  }
  function uo(e) {
    return e * 100 + `%`;
  }
  function M(e) {
    return typeof e == `object` && e
      ? new no(e)
      : typeof e == `string`
        ? new co(e)
        : typeof e == `function`
          ? new lo(e)
          : null;
  }
  function fo(...e) {
    console.warn(`FullCalendar:`, ...e);
  }
  var po = {};
  function mo(e, t) {
    return !e || typeof e == `string` ? e : (ho(t), ``);
  }
  function N(e, t) {
    return typeof e == `function` ? (n) => mo(e(n), t) : mo(e, t);
  }
  function ho(e) {
    po[e] ||
      (fo(
        `Invalid option \`${e}\`: expected a className string or a falsy value.`,
      ),
      (po[e] = !0));
  }
  function go(e, t) {
    return (n) => {
      let r = n.target.closest(e);
      r && t.call(r, n, r);
    };
  }
  function _o(e, t, n, r) {
    let i = go(n, r);
    return (
      e.addEventListener(t, i),
      () => {
        e.removeEventListener(t, i);
      }
    );
  }
  function vo(e, t, n, r) {
    let i;
    return _o(e, `mouseover`, t, (e, t) => {
      if (t !== i) {
        ((i = t), n(e, t));
        let a = (e) => {
          ((i = null), r(e, t), t.removeEventListener(`mouseleave`, a));
        };
        t.addEventListener(`mouseleave`, a);
      }
    });
  }
  function yo(e) {
    return { onClick: e, ...P(e) };
  }
  function P(e) {
    return {
      tabIndex: 0,
      onKeyDown(t) {
        (t.key === `Enter` || t.key === ` `) && (e(t), t.preventDefault());
      },
    };
  }
  var F = 0;
  function I() {
    return ((F += 1), String(F));
  }
  function bo(e) {
    let t = [],
      n = [],
      r,
      i;
    for (
      typeof e == `string`
        ? (n = e.split(/\s*,\s*/))
        : typeof e == `function`
          ? (n = [e])
          : Array.isArray(e) && (n = e),
        r = 0;
      r < n.length;
      r += 1
    )
      ((i = n[r]),
        typeof i == `string`
          ? t.push(
              i.charAt(0) === `-`
                ? { field: i.substring(1), order: -1 }
                : { field: i, order: 1 },
            )
          : typeof i == `function` && t.push({ func: i }));
    return t;
  }
  function xo(e, t, n) {
    let r, i;
    for (r = 0; r < n.length; r += 1) if (((i = So(e, t, n[r])), i)) return i;
    return 0;
  }
  function So(e, t, n) {
    return n.func ? n.func(e, t) : Co(e[n.field], t[n.field]) * (n.order || 1);
  }
  function Co(e, t) {
    return !e && !t
      ? 0
      : t == null
        ? -1
        : e == null
          ? 1
          : typeof e == `string` || typeof t == `string`
            ? String(e).localeCompare(String(t))
            : e - t;
  }
  function wo(e, t, n) {
    return typeof e == `function`
      ? e(...t)
      : typeof e == `string`
        ? t.reduce((e, t, n) => e.replace(`$` + n, t || ``), e)
        : n;
  }
  function To(e, t) {
    return e === t;
  }
  function Eo(e) {
    let t = e.borderless;
    return {
      borderlessX: !!(e.borderlessX ?? t),
      borderlessTop: !!(e.borderlessTop ?? t),
      borderlessBottom: !!(e.borderlessBottom ?? t),
    };
  }
  var { hasOwnProperty: L } = Object.prototype;
  function Do(e, t) {
    let n = {};
    for (let r in e) t(e[r], r) && (n[r] = e[r]);
    return n;
  }
  function Oo(e, t) {
    let n = {};
    for (let r in e) n[r] = t(e[r], r);
    return n;
  }
  function ko(e) {
    let t = [];
    for (let n in e) t.push(e[n]);
    return t;
  }
  function Ao(e) {
    let t = {};
    for (let n of e) t[n] = !0;
    return t;
  }
  function jo(e, t) {
    return typeof e == `object` && e && typeof t == `object` && t
      ? Mo(e, t, Po)
      : e === t;
  }
  function Mo(e, t, n) {
    if (e === t) return !0;
    for (let n in e) if (L.call(e, n) && !(n in t)) return !1;
    for (let r in t)
      if (L.call(t, r) && (!(r in e) || !n(e[r], t[r], r))) return !1;
    return !0;
  }
  function No(e, t) {
    return typeof e == `object` && typeof t == `object` && e && t
      ? Po(e, t)
      : e === t;
  }
  function Po(e, t) {
    return Mo(e, t, To);
  }
  function Fo(e, t, n) {
    return Mo(e, t, (e, t, r) => {
      let i = n[r];
      return i ? i(e, t) : e === t;
    });
  }
  function Io(e, t) {
    let n = [];
    for (let r in e) L.call(e, r) && (r in t || n.push(r));
    for (let r in t) L.call(t, r) && e[r] !== t[r] && n.push(r);
    return n;
  }
  function Lo(e, t) {
    return e ? Ro(e, t, zo) : t;
  }
  function Ro(e, t, n) {
    let r = {};
    for (let n in e) L.call(e, n) && (n in t || (r[n] = e[n]));
    for (let i in t) L.call(t, i) && (r[i] = i in e ? n(e[i], t[i]) : t[i]);
    return r;
  }
  function zo(e, t) {
    return Object.assign({}, e, t);
  }
  function Bo(e, t) {
    return Array.isArray(e) && Array.isArray(t) ? Vo(e, t) : e === t;
  }
  function Vo(e, t, n = To) {
    if (e === t) return !0;
    let r = e.length,
      i;
    if (r !== t.length) return !1;
    for (i = 0; i < r; i += 1) if (!n(e[i], t[i])) return !1;
    return !0;
  }
  var Ho = {
      navLinkDayClick: R,
      navLinkWeekClick: R,
      duration: k,
      buttons: R,
      toolbarElements: R,
      prevText: String,
      nextText: String,
      prevYearText: String,
      nextYearText: String,
      todayText: String,
      yearText: String,
      monthText: String,
      weekTextLong: String,
      weekTextShort: String,
      dayText: String,
      listText: R,
      todayHint: R,
      prevHint: R,
      nextHint: R,
      buttonDisplay: R,
      buttonGroupClass: N,
      buttonClass: N,
      defaultAllDayEventDuration: k,
      defaultTimedEventDuration: k,
      nextDayThreshold: k,
      scrollTime: k,
      scrollTimeReset: Boolean,
      slotMinTime: k,
      slotMaxTime: k,
      popoverFormat: M,
      slotDuration: k,
      snapDuration: k,
      headerToolbar: R,
      footerToolbar: R,
      forceEventDuration: Boolean,
      dayLaneClass: N,
      dayLaneInnerClass: N,
      dayLaneDidMount: R,
      dayLaneWillUnmount: R,
      initialView: String,
      aspectRatio: Number,
      weekends: Boolean,
      weekNumberCalculation: R,
      weekNumbers: Boolean,
      weekNumberHeaderClass: N,
      weekNumberHeaderInnerClass: N,
      weekNumberHeaderContent: R,
      weekNumberHeaderDidMount: R,
      weekNumberHeaderWillUnmount: R,
      inlineWeekNumberClass: N,
      inlineWeekNumberContent: R,
      inlineWeekNumberDidMount: R,
      inlineWeekNumberWillUnmount: R,
      editable: Boolean,
      controller: R,
      nowIndicator: Boolean,
      nowIndicatorSnap: R,
      nowIndicatorHeaderClass: N,
      nowIndicatorHeaderContent: R,
      nowIndicatorHeaderDidMount: R,
      nowIndicatorHeaderWillUnmount: R,
      nowIndicatorDotClass: mo,
      nowIndicatorLineClass: N,
      nowIndicatorLineContent: R,
      nowIndicatorLineDidMount: R,
      nowIndicatorLineWillUnmount: R,
      showNonCurrentDates: Boolean,
      lazyFetching: Boolean,
      startParam: String,
      endParam: String,
      timeZoneParam: String,
      timeZone: String,
      locales: R,
      locale: R,
      dragRevertDuration: Number,
      dragScroll: Boolean,
      allDayMaintainDuration: Boolean,
      unselectAuto: Boolean,
      dropAccept: R,
      eventOrder: bo,
      eventOrderStrict: Boolean,
      eventSlicing: Boolean,
      eventPrintLayout: String,
      longPressDelay: Number,
      eventDragMinDistance: Number,
      expandRows: Boolean,
      height: R,
      contentHeight: R,
      direction: String,
      colorScheme: String,
      weekNumberFormat: M,
      eventResizableFromStart: Boolean,
      displayEventTime: Boolean,
      displayEventEnd: Boolean,
      progressiveEventRendering: Boolean,
      businessHours: R,
      initialDate: R,
      now: R,
      eventDataTransform: R,
      tableHeaderSticky: R,
      footerScrollbarSticky: R,
      defaultAllDay: Boolean,
      eventSourceFailure: R,
      eventSourceSuccess: R,
      eventDisplay: String,
      eventStartEditable: Boolean,
      eventDurationEditable: Boolean,
      eventOverlap: R,
      eventConstraint: R,
      eventAllow: R,
      eventColor: String,
      eventContrastColor: String,
      eventDidMount: R,
      eventWillUnmount: R,
      eventContent: R,
      eventClass: N,
      eventInnerClass: N,
      eventTimeClass: N,
      eventTitleClass: N,
      eventBeforeClass: N,
      eventAfterClass: N,
      listItemEventClass: N,
      listItemEventInnerClass: N,
      listItemEventTimeClass: N,
      listItemEventTitleClass: N,
      listItemEventBeforeClass: N,
      listItemEventAfterClass: N,
      blockEventClass: N,
      blockEventInnerClass: N,
      blockEventTimeClass: N,
      blockEventTitleClass: N,
      blockEventBeforeClass: N,
      blockEventAfterClass: N,
      rowEventClass: N,
      rowEventInnerClass: N,
      rowEventTimeClass: N,
      rowEventTitleClass: N,
      rowEventTitleSticky: Boolean,
      rowEventBeforeClass: N,
      rowEventBeforeContent: R,
      rowEventAfterClass: N,
      rowEventAfterContent: R,
      columnEventClass: N,
      columnEventInnerClass: N,
      columnEventTimeClass: N,
      columnEventTitleClass: N,
      columnEventTitleSticky: Boolean,
      columnEventBeforeClass: N,
      columnEventAfterClass: N,
      backgroundEventClass: N,
      backgroundEventDidMount: R,
      backgroundEventWillUnmount: R,
      backgroundEventContent: R,
      backgroundEventInnerClass: N,
      backgroundEventTitleClass: N,
      backgroundEventColor: String,
      selectConstraint: R,
      selectOverlap: R,
      selectAllow: R,
      droppable: Boolean,
      unselectCancel: String,
      slotHeaderFormat: R,
      slotLaneClass: N,
      slotLaneDidMount: R,
      slotLaneWillUnmount: R,
      slotHeaderClass: N,
      slotHeaderInnerClass: N,
      slotHeaderContent: R,
      slotHeaderDidMount: R,
      slotHeaderWillUnmount: R,
      slotHeaderAlign: R,
      slotHeaderSticky: R,
      slotHeaderRowClass: mo,
      slotHeaderDividerClass: N,
      dayMaxEvents: R,
      dayMaxEventRows: R,
      dayMinWidth: Number,
      slotHeaderInterval: k,
      dayHeaderClass: N,
      dayHeaderInnerClass: N,
      dayHeaderContent: R,
      dayHeaderDidMount: R,
      dayHeaderWillUnmount: R,
      dayHeaderAlign: R,
      _dayHeaderSticky: R,
      dayHeaderRowClass: mo,
      dayHeaderDividerClass: N,
      dayRowClass: mo,
      dayCellDidMount: R,
      dayCellWillUnmount: R,
      dayCellClass: N,
      dayCellInnerClass: N,
      dayCellTopContent: R,
      dayCellTopClass: N,
      dayCellTopInnerClass: N,
      dayCellBottomClass: N,
      allDaySlot: Boolean,
      allDayText: String,
      allDayHeaderClass: N,
      allDayHeaderInnerClass: N,
      allDayHeaderContent: R,
      allDayHeaderDidMount: R,
      allDayHeaderWillUnmount: R,
      timedText: String,
      slotMinWidth: Number,
      slotMinHeight: Number,
      navLinks: Boolean,
      eventTimeFormat: M,
      rerenderDelay: Number,
      moreLinkText: R,
      moreLinkHint: R,
      selectMinDistance: Number,
      selectable: Boolean,
      selectLongPressDelay: Number,
      eventLongPressDelay: Number,
      selectMirror: Boolean,
      eventMaxStack: Number,
      eventMinHeight: Number,
      eventMinWidth: Number,
      eventShortHeight: Number,
      slotEventOverlap: Boolean,
      firstDay: Number,
      dayCount: Number,
      dateAlignment: String,
      dateIncrement: k,
      hiddenDays: R,
      fixedWeekCount: Boolean,
      validRange: R,
      visibleRange: R,
      titleFormat: R,
      eventInteractive: Boolean,
      noEventsText: String,
      viewHint: R,
      viewChangeHint: String,
      navLinkHint: R,
      closeHint: String,
      eventsHint: String,
      headingLevel: Number,
      moreLinkClick: R,
      moreLinkContent: R,
      moreLinkDidMount: R,
      moreLinkWillUnmount: R,
      moreLinkClass: N,
      moreLinkInnerClass: N,
      rowMoreLinkClass: N,
      rowMoreLinkInnerClass: N,
      columnMoreLinkClass: N,
      columnMoreLinkInnerClass: N,
      navLinkClass: mo,
      monthStartFormat: M,
      dayCellFormat: M,
      handleCustomRendering: R,
      customRenderingMetaMap: R,
      popoverClass: mo,
      popoverCloseClass: mo,
      popoverCloseContent: R,
      dayNarrowWidth: Number,
      borderless: Boolean,
      borderlessX: Boolean,
      borderlessTop: Boolean,
      borderlessBottom: Boolean,
      fillerClass: N,
      headerToolbarClass: N,
      footerToolbarClass: N,
      toolbarClass: N,
      toolbarSectionClass: N,
      toolbarTitleClass: mo,
      tableClass: N,
      tableHeaderClass: N,
      tableBodyClass: N,
      nonBusinessHoursClass: mo,
      highlightClass: mo,
      dayHeaders: Boolean,
      dayHeaderFormat: M,
      allDayDividerClass: mo,
      listDaysClass: mo,
      listDayClass: N,
      listDayFormat: Yo,
      listDayAltFormat: Yo,
      listDayHeaderDidMount: R,
      listDayHeaderWillUnmount: R,
      listDayHeaderClass: N,
      listDayHeaderInnerClass: N,
      listDayHeaderContent: R,
      listDayBodyClass: N,
      noEventsClass: N,
      noEventsInnerClass: N,
      noEventsContent: R,
      noEventsDidMount: R,
      noEventsWillUnmount: R,
      multiMonthMaxColumns: Number,
      singleMonthMinWidth: Number,
      singleMonthTitleFormat: M,
      singleMonthDidMount: R,
      singleMonthWillUnmount: R,
      singleMonthClass: N,
      singleMonthHeaderClass: N,
      singleMonthHeaderInnerClass: N,
    },
    Uo = {
      buttonDisplay: `auto`,
      eventDisplay: `auto`,
      defaultTimedEventDuration: `01:00:00`,
      defaultAllDayEventDuration: { day: 1 },
      forceEventDuration: !1,
      nextDayThreshold: `00:00:00`,
      initialView: ``,
      aspectRatio: 1.35,
      weekends: !0,
      weekNumbers: !1,
      weekNumberCalculation: `local`,
      editable: !1,
      nowIndicator: !1,
      scrollTime: `06:00:00`,
      scrollTimeReset: !0,
      slotMinTime: `00:00:00`,
      slotMaxTime: `24:00:00`,
      showNonCurrentDates: !0,
      lazyFetching: !0,
      startParam: `start`,
      endParam: `end`,
      timeZoneParam: `timeZone`,
      timeZone: `local`,
      locales: [],
      locale: ``,
      dragRevertDuration: 500,
      dragScroll: !0,
      allDayMaintainDuration: !1,
      unselectAuto: !0,
      dropAccept: `*`,
      eventOrder: `start,-duration,allDay,title`,
      eventPrintLayout: `auto`,
      popoverFormat: { month: `long`, day: `numeric`, year: `numeric` },
      longPressDelay: 1e3,
      eventDragMinDistance: 5,
      expandRows: !1,
      navLinks: !1,
      selectable: !1,
      eventMinHeight: 15,
      eventMinWidth: 30,
      eventShortHeight: 30,
      monthStartFormat: { month: `long`, day: `numeric` },
      dayCellFormat: { day: `numeric`, omitTrailing: !0 },
      headingLevel: 2,
      outerBorder: !0,
      dayNarrowWidth: 80,
      eventOverlap: !0,
      slotHeaderAlign: `start`,
      slotHeaderSticky: !0,
      dayHeaderAlign: `start`,
      _dayHeaderSticky: !0,
      rowEventTitleSticky: !0,
      columnEventTitleSticky: !0,
      nowIndicatorSnap: `auto`,
      dayHeaders: !0,
    },
    Wo = {
      datesSet: R,
      eventsSet: R,
      eventAdd: R,
      eventChange: R,
      eventRemove: R,
      eventClick: R,
      eventMouseEnter: R,
      eventMouseLeave: R,
      select: R,
      unselect: R,
      loading: R,
      _unmount: R,
      _beforeprint: R,
      _afterprint: R,
      _noDateSelect: R,
      _noEventDrop: R,
      _noEventResize: R,
      _timeScrollRequest: R,
      dateClick: R,
      eventDragStart: R,
      eventDragStop: R,
      eventDrop: R,
      eventResizeStart: R,
      eventResizeStop: R,
      eventResize: R,
      drop: R,
      eventReceive: R,
      eventLeave: R,
    },
    Go = {
      class: N,
      className: N,
      viewClass: N,
      viewDidMount: R,
      viewWillUnmount: R,
      views: R,
      plugins: R,
      initialEvents: R,
      events: R,
      eventSources: R,
    },
    Ko = {
      type: String,
      component: R,
      class: N,
      className: N,
      content: R,
      didMount: R,
      willUnmount: R,
      buttonTextKey: String,
      dateProfileGeneratorClass: R,
      usesMinMaxTime: Boolean,
      disallowAmbigTitle: Boolean,
    },
    qo = {
      dateIncrement: No,
      headerToolbar: No,
      footerToolbar: No,
      buttons: jo,
      plugins: Bo,
      events: Bo,
      eventSources: Bo,
      resources: Bo,
    };
  function Jo(e, t) {
    let n = {},
      r = {};
    for (let r in t) r in e && (n[r] = t[r](e[r], r));
    for (let n in e) n in t || (r[n] = e[n]);
    return { refined: n, extra: r };
  }
  function R(e) {
    return e;
  }
  function Yo(e) {
    return e === !1 ? null : M(e);
  }
  function Xo(e) {
    let t = Math.floor(ea(e.start, e.end)) || 1,
      n = O(e.start);
    return { start: n, end: Zi(n, t) };
  }
  function Zo(e, t = k(0)) {
    let n = null,
      r = null;
    if (e.end) {
      r = O(e.end);
      let n = e.end.valueOf() - r.valueOf();
      n && n >= Va(t) && (r = Zi(r, 1));
    }
    return (
      e.start && ((n = O(e.start)), r && r <= n && (r = Zi(n, 1))),
      { start: n, end: r }
    );
  }
  function Qo(e, t, n, r) {
    return r === `year`
      ? k(n.diffWholeYears(e, t), `year`)
      : r === `month`
        ? k(n.diffWholeMonths(e, t), `month`)
        : ia(e, t);
  }
  function $o(e, t) {
    return { instanceId: I(), defId: e, range: t };
  }
  function es(e, t, n, r) {
    for (let i = 0; i < r.length; i += 1) {
      let a = r[i].parse(e, n);
      if (a) {
        let { allDay: n } = e;
        return (
          n ?? ((n = t), n ?? ((n = a.allDayGuess), (n ??= !1))),
          { allDay: n, duration: a.duration, typeData: a.typeData, typeId: i }
        );
      }
    }
    return null;
  }
  function ts(e, t, n) {
    let { dateEnv: r, pluginHooks: i, options: a } = n,
      { defs: o, instances: s } = e;
    s = Do(s, (e) => !o[e.defId].recurringDef);
    for (let e in o) {
      let n = o[e];
      if (n.recurringDef) {
        let { duration: o } = n.recurringDef;
        o ||= n.allDay
          ? a.defaultAllDayEventDuration
          : a.defaultTimedEventDuration;
        let c = ns(n, o, t, r, i.recurringTypes);
        for (let t of c) {
          let n = $o(e, { start: t, end: r.add(t, o) });
          s[n.instanceId] = n;
        }
      }
    }
    return { defs: o, instances: s };
  }
  function ns(e, t, n, r, i) {
    let a = i[e.recurringDef.typeId].expand(
      e.recurringDef.typeData,
      { start: r.subtract(n.start, t), end: n.end },
      r,
    );
    return (e.allDay && (a = a.map(O)), a);
  }
  function rs(e, t, n, r, i, a) {
    let o = ss(),
      s = Ss(n);
    for (let c of e) {
      let e = bs(c, t, n, r, s, i, a);
      e && is(e, o);
    }
    return o;
  }
  function is(e, t = ss()) {
    return (
      (t.defs[e.def.defId] = e.def),
      e.instance && (t.instances[e.instance.instanceId] = e.instance),
      t
    );
  }
  function as(e, t) {
    let n = e.instances[t];
    if (n) {
      let t = e.defs[n.defId],
        r = ls(e, (e) => os(t, e));
      return ((r.defs[t.defId] = t), (r.instances[n.instanceId] = n), r);
    }
    return ss();
  }
  function os(e, t) {
    return !!(e.groupId && e.groupId === t.groupId);
  }
  function ss() {
    return { defs: {}, instances: {} };
  }
  function cs(e, t) {
    return {
      defs: { ...e.defs, ...t.defs },
      instances: { ...e.instances, ...t.instances },
    };
  }
  function ls(e, t) {
    let n = Do(e.defs, t);
    return { defs: n, instances: Do(e.instances, (e) => n[e.defId]) };
  }
  function us(e, t) {
    let { defs: n, instances: r } = e,
      i = {},
      a = {};
    for (let e in n) t.defs[e] || (i[e] = n[e]);
    for (let e in r) !t.instances[e] && i[r[e].defId] && (a[e] = r[e]);
    return { defs: i, instances: a };
  }
  function ds(e, t) {
    return Array.isArray(e)
      ? rs(e, null, t, !0)
      : typeof e == `object` && e
        ? rs([e], null, t, !0)
        : e == null
          ? null
          : String(e);
  }
  var fs = {
      display: String,
      editable: Boolean,
      startEditable: Boolean,
      durationEditable: Boolean,
      constraint: R,
      overlap: R,
      allow: R,
      class: mo,
      className: mo,
      color: String,
      contrastColor: String,
    },
    ps = {
      display: null,
      startEditable: null,
      durationEditable: null,
      constraints: [],
      overlap: null,
      allows: [],
      color: ``,
      contrastColor: ``,
      className: ``,
    };
  function ms(e, t) {
    let n = ds(e.constraint, t);
    return {
      display: e.display || null,
      startEditable: e.startEditable == null ? e.editable : e.startEditable,
      durationEditable:
        e.durationEditable == null ? e.editable : e.durationEditable,
      constraints: n == null ? [] : [n],
      overlap: e.overlap == null ? null : e.overlap,
      allows: e.allow == null ? [] : [e.allow],
      color: e.color || ``,
      contrastColor: e.contrastColor || ``,
      className: (e.class ?? e.className) || ``,
    };
  }
  function hs(e) {
    return e.reduce(gs, ps);
  }
  function gs(e, t) {
    return {
      display: t.display == null ? e.display : t.display,
      startEditable:
        t.startEditable == null ? e.startEditable : t.startEditable,
      durationEditable:
        t.durationEditable == null ? e.durationEditable : t.durationEditable,
      constraints: e.constraints.concat(t.constraints),
      overlap: typeof t.overlap == `boolean` ? t.overlap : e.overlap,
      allows: e.allows.concat(t.allows),
      color: t.color || e.color,
      contrastColor: t.contrastColor || e.contrastColor,
      className: j(e.className, t.className),
    };
  }
  var _s = {
      id: String,
      groupId: String,
      title: String,
      url: String,
      interactive: Boolean,
    },
    vs = { start: R, end: R, date: R, allDay: Boolean },
    ys = { ..._s, ...vs, extendedProps: R };
  function bs(e, t, n, r, i = Ss(n), a, o) {
    let { refined: s, extra: c } = xs(e, n, i),
      l = Ts(t, n),
      u = es(s, l, n.dateEnv, n.pluginHooks.recurringTypes);
    if (u) {
      let e = Cs(s, c, t ? t.sourceId : ``, u.allDay, !!u.duration, n, a);
      return (
        (e.recurringDef = {
          typeId: u.typeId,
          typeData: u.typeData,
          duration: u.duration,
        }),
        { def: e, instance: null }
      );
    }
    let d = ws(s, l, n, r);
    if (d) {
      let e = Cs(s, c, t ? t.sourceId : ``, d.allDay, d.hasEnd, n, a),
        r = $o(e.defId, d.range);
      return (
        o && e.publicId && o[e.publicId] && (r.instanceId = o[e.publicId]),
        { def: e, instance: r }
      );
    }
    return null;
  }
  function xs(e, t, n = Ss(t)) {
    return Jo(e, n);
  }
  function Ss(e) {
    return { ...fs, ...ys, ...e.pluginHooks.eventRefiners };
  }
  function Cs(e, t, n, r, i, a, o) {
    let s = {
      title: e.title || ``,
      groupId: e.groupId || ``,
      publicId: e.id || ``,
      url: e.url || ``,
      recurringDef: null,
      defId: (o && e.id ? o[e.id] : ``) || I(),
      sourceId: n,
      allDay: r,
      hasEnd: i,
      interactive: e.interactive,
      ui: ms(e, a),
      extendedProps: { ...(e.extendedProps || {}), ...t },
    };
    for (let t of a.pluginHooks.eventDefMemberAdders) Object.assign(s, t(e));
    return (Object.freeze(s.ui.className), Object.freeze(s.extendedProps), s);
  }
  function ws(e, t, n, r) {
    let { allDay: i } = e,
      a,
      o = null,
      s = !1,
      c,
      l = null,
      u = e.start == null ? e.date : e.start;
    if (((a = n.dateEnv.createMarkerMeta(u)), a)) o = a.marker;
    else if (!r) return null;
    return (
      e.end != null && (c = n.dateEnv.createMarkerMeta(e.end)),
      (i ??= t ?? ((!a || a.isTimeUnspecified) && (!c || c.isTimeUnspecified))),
      i && o && (o = O(o)),
      c && ((l = c.marker), i && (l = O(l)), o && l <= o && (l = null)),
      l
        ? (s = !0)
        : r ||
          ((s = n.options.forceEventDuration || !1),
          (l = n.dateEnv.add(
            o,
            i
              ? n.options.defaultAllDayEventDuration
              : n.options.defaultTimedEventDuration,
          ))),
      { allDay: i, hasEnd: s, range: { start: o, end: l } }
    );
  }
  function Ts(e, t) {
    let n = null;
    return (e && (n = e.defaultAllDay), (n ??= t.options.defaultAllDay), n);
  }
  var Es = { start: R, end: R, allDay: Boolean };
  function Ds(e, t, n) {
    let r = Os(e, t),
      { range: i } = r;
    if (!i.start) return null;
    if (!i.end) {
      if (n == null) return null;
      i.end = t.add(i.start, n);
    }
    return r;
  }
  function Os(e, t) {
    let { refined: n, extra: r } = Jo(e, Es),
      i = n.start ? t.createMarkerMeta(n.start) : null,
      a = n.end ? t.createMarkerMeta(n.end) : null,
      { allDay: o } = n;
    return (
      (o ??= i && i.isTimeUnspecified && (!a || a.isTimeUnspecified)),
      {
        range: { start: i ? i.marker : null, end: a ? a.marker : null },
        allDay: o,
        ...r,
      }
    );
  }
  function ks(e, t) {
    return { ...js(e.range, t, e.allDay), allDay: e.allDay };
  }
  function As(e, t, n) {
    return { ...js(e, t, n), timeZone: t.timeZone };
  }
  function js(e, t, n) {
    return {
      start: t.toDate(e.start),
      end: t.toDate(e.end),
      startStr: t.formatIso(e.start, { omitTime: n }),
      endStr: t.formatIso(e.end, { omitTime: n }),
    };
  }
  function Ms(e, t, n) {
    let r = xs({ editable: !1 }, n),
      i = Cs(r.refined, r.extra, ``, e.allDay, !0, n);
    return {
      def: i,
      ui: Ys(i, t),
      instance: $o(i.defId, e.range),
      range: e.range,
      isStart: !0,
      isEnd: !0,
    };
  }
  function Ns(e, t, n) {
    n.emitter.trigger(`select`, {
      ...Fs(e, n),
      jsEvent: t ? t.origEvent : null,
      view: n.viewApi || n.calendarApi.view,
    });
  }
  function Ps(e, t) {
    t.emitter.trigger(`unselect`, {
      jsEvent: e ? e.origEvent : null,
      view: t.viewApi || t.calendarApi.view,
    });
  }
  function Fs(e, t) {
    let n = {};
    for (let r of t.pluginHooks.dateSpanTransforms) Object.assign(n, r(e, t));
    return (Object.assign(n, ks(e, t.dateEnv)), n);
  }
  function Is(e, t, n) {
    let { dateEnv: r, options: i } = n,
      a = t;
    return (
      e
        ? ((a = O(a)), (a = r.add(a, i.defaultAllDayEventDuration)))
        : (a = r.add(a, i.defaultTimedEventDuration)),
      a
    );
  }
  function Ls(e, t, n, r) {
    let i = Js(e.defs, t),
      a = ss();
    for (let t in e.defs) {
      let o = e.defs[t];
      a.defs[t] = Rs(o, i[t], n, r);
    }
    for (let t in e.instances) {
      let o = e.instances[t],
        s = a.defs[o.defId];
      a.instances[t] = zs(o, s, i[o.defId], n, r);
    }
    return a;
  }
  function Rs(e, t, n, r) {
    let i = n.standardProps || {};
    i.hasEnd == null &&
      t.durationEditable &&
      (n.startDelta || n.endDelta) &&
      (i.hasEnd = !0);
    let a = { ...e, ...i, ui: { ...e.ui, ...i.ui } };
    n.extendedProps &&
      (a.extendedProps = { ...a.extendedProps, ...n.extendedProps });
    for (let e of r.pluginHooks.eventDefMutationAppliers) e(a, n, r);
    return (!a.hasEnd && r.options.forceEventDuration && (a.hasEnd = !0), a);
  }
  function zs(e, t, n, r, i) {
    let { dateEnv: a } = i,
      o = r.standardProps && r.standardProps.allDay === !0,
      s = r.standardProps && r.standardProps.hasEnd === !1,
      c = { ...e };
    return (
      o && (c.range = Xo(c.range)),
      r.datesDelta &&
        n.startEditable &&
        (c.range = {
          start: a.add(c.range.start, r.datesDelta),
          end: a.add(c.range.end, r.datesDelta),
        }),
      r.startDelta &&
        n.durationEditable &&
        (c.range = {
          start: a.add(c.range.start, r.startDelta),
          end: c.range.end,
        }),
      r.endDelta &&
        n.durationEditable &&
        (c.range = {
          start: c.range.start,
          end: a.add(c.range.end, r.endDelta),
        }),
      s &&
        (c.range = {
          start: c.range.start,
          end: Is(t.allDay, c.range.start, i),
        }),
      t.allDay && (c.range = { start: O(c.range.start), end: O(c.range.end) }),
      c.range.end < c.range.start &&
        (c.range.end = Is(t.allDay, c.range.start, i)),
      c
    );
  }
  var Bs = class {
      constructor(e, t) {
        ((this.context = e), (this.internalEventSource = t));
      }
      remove() {
        this.context.dispatch({
          type: `REMOVE_EVENT_SOURCE`,
          sourceId: this.internalEventSource.sourceId,
        });
      }
      refetch() {
        this.context.dispatch({
          type: `FETCH_EVENT_SOURCES`,
          sourceIds: [this.internalEventSource.sourceId],
          isRefetch: !0,
        });
      }
      get id() {
        return this.internalEventSource.publicId;
      }
      get url() {
        return this.internalEventSource.meta.url;
      }
      get format() {
        return this.internalEventSource.meta.format;
      }
    },
    Vs = class e {
      constructor(e, t, n) {
        ((this._context = e), (this._def = t), (this._instance = n || null));
      }
      setProp(e, t) {
        if (e in vs)
          fo(
            `Cannot set date-related event property \`${e}\`. Use a method instead.`,
          );
        else if (e === `id`)
          ((t = _s[e](t)), this.mutate({ standardProps: { publicId: t } }));
        else if (e in _s)
          ((t = _s[e](t)), this.mutate({ standardProps: { [e]: t } }));
        else if (e in fs) {
          let n = fs[e](t);
          ((n =
            e === `editable`
              ? { startEditable: t, durationEditable: t }
              : { [e]: t }),
            this.mutate({ standardProps: { ui: n } }));
        } else
          fo(
            `Cannot set event property \`${e}\`. Use setExtendedProp instead.`,
          );
      }
      setExtendedProp(e, t) {
        this.mutate({ extendedProps: { [e]: t } });
      }
      setStart(e, t = {}) {
        let { dateEnv: n } = this._context,
          r = n.createMarker(e);
        if (r && this._instance) {
          let e = this._instance.range,
            i = Qo(e.start, r, n, t.granularity);
          t.maintainDuration
            ? this.mutate({ datesDelta: i })
            : this.mutate({ startDelta: i });
        }
      }
      setEnd(e, t = {}) {
        let { dateEnv: n } = this._context,
          r;
        if (!(e != null && ((r = n.createMarker(e)), !r)) && this._instance) {
          if (r) {
            let e = Qo(this._instance.range.end, r, n, t.granularity);
            this.mutate({ endDelta: e });
          } else this.mutate({ standardProps: { hasEnd: !1 } });
        }
      }
      setDates(e, t, n = {}) {
        let { dateEnv: r } = this._context,
          i = { allDay: n.allDay },
          a = r.createMarker(e),
          o;
        if (
          a &&
          !(t != null && ((o = r.createMarker(t)), !o)) &&
          this._instance
        ) {
          let e = this._instance.range;
          n.allDay === !0 && (e = Xo(e));
          let t = Qo(e.start, a, r, n.granularity);
          if (o) {
            let a = Qo(e.end, o, r, n.granularity);
            Ia(t, a)
              ? this.mutate({ datesDelta: t, standardProps: i })
              : this.mutate({ startDelta: t, endDelta: a, standardProps: i });
          } else
            ((i.hasEnd = !1), this.mutate({ datesDelta: t, standardProps: i }));
        }
      }
      moveStart(e) {
        let t = k(e);
        t && this.mutate({ startDelta: t });
      }
      moveEnd(e) {
        let t = k(e);
        t && this.mutate({ endDelta: t });
      }
      moveDates(e) {
        let t = k(e);
        t && this.mutate({ datesDelta: t });
      }
      setAllDay(e, t = {}) {
        let n = { allDay: e },
          { maintainDuration: r } = t;
        ((r ??= this._context.options.allDayMaintainDuration),
          this._def.allDay !== e && (n.hasEnd = r),
          this.mutate({ standardProps: n }));
      }
      formatRange(e) {
        let { dateEnv: t } = this._context,
          n = this._instance,
          r = M(e);
        return this._def.hasEnd
          ? Ka(t.formatRangeToParts(n.range.start, n.range.end, r))
          : Ka(t.formatToParts(n.range.start, r));
      }
      mutate(t) {
        let n = this._instance;
        if (n) {
          let r = this._def,
            i = this._context,
            { eventStore: a } = i.getCurrentData(),
            o = as(a, n.instanceId);
          o = Ls(
            o,
            {
              '': {
                display: ``,
                startEditable: !0,
                durationEditable: !0,
                constraints: [],
                overlap: null,
                allows: [],
                color: ``,
                contrastColor: ``,
                className: ``,
              },
            },
            t,
            i,
          );
          let s = new e(i, r, n);
          ((this._def = o.defs[r.defId]),
            (this._instance = o.instances[n.instanceId]),
            i.dispatch({ type: `MERGE_EVENTS`, eventStore: o }),
            i.emitter.trigger(`eventChange`, {
              oldEvent: s,
              event: this,
              relatedEvents: Us(o, i, n),
              revert() {
                i.dispatch({ type: `RESET_EVENTS`, eventStore: a });
              },
            }));
        }
      }
      remove() {
        let e = this._context,
          t = Hs(this);
        (e.dispatch({ type: `REMOVE_EVENTS`, eventStore: t }),
          e.emitter.trigger(`eventRemove`, {
            event: this,
            relatedEvents: [],
            revert() {
              e.dispatch({ type: `MERGE_EVENTS`, eventStore: t });
            },
          }));
      }
      get source() {
        let { sourceId: e } = this._def;
        return e
          ? new Bs(
              this._context,
              this._context.getCurrentData().eventSources[e],
            )
          : null;
      }
      get start() {
        return this._instance
          ? this._context.dateEnv.toDate(this._instance.range.start)
          : null;
      }
      get end() {
        return this._instance && this._def.hasEnd
          ? this._context.dateEnv.toDate(this._instance.range.end)
          : null;
      }
      get startStr() {
        let e = this._instance;
        return e
          ? this._context.dateEnv.formatIso(e.range.start, {
              omitTime: this._def.allDay,
            })
          : ``;
      }
      get endStr() {
        let e = this._instance;
        return e && this._def.hasEnd
          ? this._context.dateEnv.formatIso(e.range.end, {
              omitTime: this._def.allDay,
            })
          : ``;
      }
      get id() {
        return this._def.publicId;
      }
      get groupId() {
        return this._def.groupId;
      }
      get allDay() {
        return this._def.allDay;
      }
      get title() {
        return this._def.title;
      }
      get url() {
        return this._def.url;
      }
      get display() {
        return this._def.ui.display || `auto`;
      }
      get startEditable() {
        return this._def.ui.startEditable;
      }
      get durationEditable() {
        return this._def.ui.durationEditable;
      }
      get constraint() {
        return this._def.ui.constraints[0] || null;
      }
      get overlap() {
        return this._def.ui.overlap;
      }
      get allow() {
        return this._def.ui.allows[0] || null;
      }
      get color() {
        return this._def.ui.color;
      }
      get contrastColor() {
        return this._def.ui.contrastColor;
      }
      get className() {
        return this._def.ui.className;
      }
      get extendedProps() {
        return this._def.extendedProps;
      }
      toPlainObject(e = {}) {
        let t = this._def,
          { ui: n } = t,
          { startStr: r, endStr: i } = this,
          a = { allDay: t.allDay };
        return (
          t.title && (a.title = t.title),
          r && (a.start = r),
          i && (a.end = i),
          t.publicId && (a.id = t.publicId),
          t.groupId && (a.groupId = t.groupId),
          t.url && (a.url = t.url),
          n.display && n.display !== `auto` && (a.display = n.display),
          n.color && (a.color = n.color),
          n.contrastColor && (a.contrastColor = n.contrastColor),
          n.className && (a.className = n.className),
          Object.keys(t.extendedProps).length &&
            (e.collapseExtendedProps
              ? Object.assign(a, t.extendedProps)
              : (a.extendedProps = t.extendedProps)),
          a
        );
      }
      toJSON() {
        return this.toPlainObject();
      }
    };
  function Hs(e) {
    let t = e._def,
      n = e._instance;
    return {
      defs: { [t.defId]: t },
      instances: n ? { [n.instanceId]: n } : {},
    };
  }
  function Us(e, t, n) {
    let { defs: r, instances: i } = e,
      a = [],
      o = n ? n.instanceId : ``;
    for (let e in i) {
      let n = i[e],
        s = r[n.defId];
      n.instanceId !== o && a.push(new Vs(t, s, n));
    }
    return a;
  }
  function Ws(e) {
    return e.eventRange.instance.instanceId;
  }
  function Gs(e, t, n, r) {
    let i = {},
      a = {},
      o = {},
      s = [],
      c = [],
      l = Js(e.defs, t);
    for (let t in e.defs) {
      let n = e.defs[t];
      l[n.defId].display === `inverse-background` &&
        (n.groupId
          ? ((i[n.groupId] = []), o[n.groupId] || (o[n.groupId] = n))
          : (a[t] = []));
    }
    for (let t in e.instances) {
      let o = e.instances[t],
        u = e.defs[o.defId],
        d = l[u.defId],
        f = o.range,
        p = !u.allDay && r ? Zo(f, r) : f,
        m = Ta(p, n);
      m &&
        (d.display === `inverse-background`
          ? u.groupId
            ? i[u.groupId].push(m)
            : a[o.defId].push(m)
          : d.display !== `none` &&
            (d.display === `background` ? s : c).push({
              def: u,
              ui: d,
              instance: o,
              range: m,
              isStart: p.start && p.start.valueOf() === m.start.valueOf(),
              isEnd: p.end && p.end.valueOf() === m.end.valueOf(),
            }));
    }
    for (let e in i) {
      let t = i[e],
        r = Ca(t, n);
      for (let t of r) {
        let n = o[e],
          r = l[n.defId];
        s.push({
          def: n,
          ui: r,
          instance: null,
          range: t,
          isStart: !1,
          isEnd: !1,
        });
      }
    }
    for (let t in a) {
      let r = a[t],
        i = Ca(r, n);
      for (let n of i)
        s.push({
          def: e.defs[t],
          ui: l[t],
          instance: null,
          range: n,
          isStart: !1,
          isEnd: !1,
        });
    }
    return { bg: s, fg: c };
  }
  function Ks(e, t) {
    e.fcEventRange = t;
  }
  function qs(e) {
    return e.fcEventRange || e.parentNode.fcEventRange || null;
  }
  function Js(e, t) {
    return Oo(e, (e) => Ys(e, t));
  }
  function Ys(e, t) {
    let n = [],
      r = t[``],
      i = t[e.defId];
    return (r && n.push(r), i && n.push(i), n.push(e.ui), hs(n));
  }
  function Xs(e, t) {
    let n = e.map(Zs);
    return (n.sort((e, n) => xo(e, n, t)), n.map((e) => e._seg));
  }
  function Zs(e) {
    let { eventRange: t } = e,
      n = t.def,
      r = t.instance ? t.instance.range : t.range,
      i = r.start ? r.start.valueOf() : 0,
      a = r.end ? r.end.valueOf() : 0;
    return {
      ...n.extendedProps,
      ...n,
      id: n.publicId,
      start: i,
      end: a,
      duration: a - i,
      allDay: Number(n.allDay),
      _seg: e,
    };
  }
  function Qs(e, t) {
    let { pluginHooks: n } = t,
      r = n.isDraggableTransformers,
      { def: i, ui: a } = e,
      o = a.startEditable;
    for (let e of r) o = e(o, i, a, t);
    return o;
  }
  function $s(e, t, n, r, i, a, o, s = !0, c = !0) {
    let { dateEnv: l, options: u } = o,
      { def: d } = t,
      { displayEventTime: f, displayEventEnd: p } = u;
    ((f ??= s !== !1), (p ??= c !== !1));
    let m =
        !i && n && O(n).valueOf() !== O(t.instance.range.start).valueOf()
          ? n
          : t.instance.range.start,
      h =
        !a &&
        r &&
        O(Qi(r, -1)).valueOf() !== O(Qi(t.instance.range.end, -1)).valueOf()
          ? r
          : t.instance.range.end;
    if (f && !d.allDay) {
      if (p && (i || a) && d.hasEnd) {
        let t = l.formatRangeToParts(m, h, e),
          n = tc(t);
        return n == null
          ? Ka(t)
          : Ka(l.formatToParts(m, e)) + n + Ka(l.formatToParts(h, e));
      }
      if (i) return Ka(l.formatToParts(m, e));
    }
    return ``;
  }
  var ec = new Set([`year`, `month`, `day`]);
  function tc(e) {
    let t,
      n = !1;
    for (let r of e)
      (r.source === `shared` && (t = r), ec.has(r.type) && (n = !0));
    return n ? t.value : void 0;
  }
  function nc(e, t, n) {
    let r = e.range;
    return {
      isPast: r.end <= (n || t.start),
      isFuture: r.start >= (n || t.end),
      isToday: t && Da(t, r.start),
    };
  }
  function rc(e, t) {
    let { def: n, instance: r } = e,
      { url: i } = n;
    if (i) return [`a`, { href: i }, !0];
    let { emitter: a, options: o } = t,
      { eventInteractive: s } = o;
    s ?? ((s = n.interactive), (s ??= !!a.hasHandlers(`eventClick`)));
    let c;
    return (
      s &&
        ((c = P((e) => {
          a.trigger(`eventClick`, {
            el: e.target,
            event: new Vs(t, n, r),
            jsEvent: e,
            view: t.viewApi,
          });
        })),
        (c = { role: `button`, ...c })),
      [`div`, c, s]
    );
  }
  var ic = /(^c|C)lass(Name)?$/,
    ac = /Content$/,
    oc = /(DidMount|WillUnmount)$/,
    sc = /^on[A-Z]/,
    cc = { buttons: Lo };
  function lc(...e) {
    let t = {};
    for (let n of e)
      for (let e in n) {
        let r = n[e];
        t[e] = t[e] ? uc(t[e], r) : r;
      }
    return t;
  }
  function uc(...e) {
    let t = {};
    for (let n of e)
      for (let e in n)
        if (e in t) {
          let r =
            cc[e] ||
            (ic.test(e) ? dc : ac.test(e) ? fc : oc.test(e) ? pc : void 0);
          t[e] = r ? r(t[e], n[e], e) : n[e];
        } else t[e] = n[e];
    return t;
  }
  function dc(e, t, n) {
    let r = typeof e == `function`,
      i = typeof t == `function`;
    if (r || i) {
      let a = (a) => j(mo(r ? e(a) : e, n), mo(i ? t(a) : t, n));
      return ((a.parts = [e, t]), a);
    }
    return j(mo(e, n), mo(t, n));
  }
  function fc(e, t) {
    if (typeof t == `function`) {
      let n = (n) => {
        let r = t(n);
        return r === !0 ? (typeof e == `function` ? e(n) : e) : r;
      };
      return ((n.parts = [e, t]), n);
    }
    return t ?? e;
  }
  function pc(e, t) {
    if (e && t) {
      let n = (...n) => {
        (e(...n), t(...n));
      };
      return ((n.parts = [e, t]), n);
    }
    return e || t;
  }
  function mc(e, t) {
    let n = Io(e, t);
    for (let e of n) if (!sc.test(e)) return !1;
    return !0;
  }
  function hc(e, t) {
    let n = e && e.parts,
      r = t && t.parts;
    if (n && r) {
      let e = n.length;
      if (e !== r.length) return !1;
      for (let t = 0; t < e; t++)
        if (!(n[t] === r[t] || hc(n[t], r[t]))) return !1;
      return !0;
    }
    return !1;
  }
  var gc = [],
    _c = {
      code: `en`,
      week: { dow: 0, doy: 4 },
      direction: `ltr`,
      todayText: `Today`,
      prevText: `Prev`,
      nextText: `Next`,
      prevYearText: `Prev year`,
      nextYearText: `Next year`,
      yearText: `Year`,
      monthText: `Month`,
      weekTextLong: `Week`,
      dayText: `Day`,
      listText: `List`,
      closeHint: `Close`,
      eventsHint: `Events`,
      allDayText: `All-day`,
      timedText: `Timed`,
      moreLinkText: `more`,
      noEventsText: `No events to display`,
    },
    vc = {
      ..._c,
      weekTextShort: `W`,
      todayHint: (e, t) => (t === `day` ? `Today` : `This ${e}`),
      prevHint: `Previous $0`,
      nextHint: `Next $0`,
      viewHint: `$0 view`,
      viewChangeHint: `Change view`,
      navLinkHint: `Go to $0`,
      moreLinkHint(e) {
        return `Show ${e} more event${e === 1 ? `` : `s`}`;
      },
    };
  function yc(e) {
    let t = e.length > 0 ? e[0].code : `en`,
      n = gc.concat(e),
      r = { en: vc };
    for (let e of n) r[e.code] = e;
    return { map: r, defaultCode: t };
  }
  function bc(e, t) {
    return typeof e == `object` && !Array.isArray(e)
      ? Cc(e.code, [e.code], e)
      : xc(e, t);
  }
  function xc(e, t) {
    let n = [].concat(e || []);
    return Cc(e, n, Sc(n, t) || vc);
  }
  function Sc(e, t) {
    for (let n = 0; n < e.length; n += 1) {
      let r = e[n].toLocaleLowerCase().split(`-`);
      for (let e = r.length; e > 0; --e) {
        let n = r.slice(0, e).join(`-`);
        if (t[n]) return t[n];
      }
    }
    return null;
  }
  function Cc(e, t, n) {
    let r = uc(_c, n);
    delete r.code;
    let { week: i } = r;
    return (
      delete r.week,
      {
        codeArg: e,
        codes: t,
        week: i,
        simpleNumberFormat: new Intl.NumberFormat(e),
        options: r,
      }
    );
  }
  var wc = class extends Error {
    constructor(e, t) {
      (super(e), (this.response = t));
    }
  };
  function Tc(e, t, n) {
    e = e.toUpperCase();
    let r = { method: e };
    return (
      e === `GET`
        ? (t += (t.indexOf(`?`) === -1 ? `?` : `&`) + new URLSearchParams(n))
        : ((r.body = new URLSearchParams(n)),
          (r.headers = {
            'Content-Type': `application/x-www-form-urlencoded`,
          })),
      fetch(t, r).then((e) => {
        if (e.ok)
          return e.json().then(
            (t) => [t, e],
            () => {
              throw new wc(`Failure parsing JSON`, e);
            },
          );
        throw new wc(`Request failed`, e);
      })
    );
  }
  function Ec(e, t) {
    t.emitter.trigger(`datesSet`, {
      ...As(e.activeRange, t.dateEnv),
      view: t.viewApi,
    });
  }
  function Dc(e, t) {
    let { emitter: n } = t;
    n.hasHandlers(`eventsSet`) && n.trigger(`eventsSet`, Us(e, t));
  }
  var Oc = {
    name: `array-event-source`,
    eventSourceDefs: [
      {
        ignoreRange: !0,
        parseMeta(e) {
          return Array.isArray(e.events) ? e.events : null;
        },
        fetch(e, t) {
          t({ rawEvents: e.eventSource.meta });
        },
      },
    ],
  };
  function kc(e, t, n) {
    let r = !1,
      i = function (e) {
        r || ((r = !0), t(e));
      },
      a = function (e) {
        r || ((r = !0), n(e));
      },
      o = e(i, a);
    o && typeof o.then == `function` && o.then(i, a);
  }
  var Ac = {
      name: `func-event-source`,
      eventSourceDefs: [
        {
          parseMeta(e) {
            return typeof e.events == `function` ? e.events : null;
          },
          fetch(e, t, n) {
            let { dateEnv: r } = e.context,
              i = e.eventSource.meta;
            kc(i.bind(null, As(e.range, r)), (e) => t({ rawEvents: e }), n);
          },
        },
      ],
    },
    jc = {
      name: `json-event-source`,
      eventSourceRefiners: {
        method: String,
        extraParams: R,
        startParam: String,
        endParam: String,
        timeZoneParam: String,
      },
      eventSourceDefs: [
        {
          parseMeta(e) {
            return e.url && (e.format === `json` || !e.format)
              ? {
                  url: e.url,
                  format: `json`,
                  method: (e.method || `GET`).toUpperCase(),
                  extraParams: e.extraParams,
                  startParam: e.startParam,
                  endParam: e.endParam,
                  timeZoneParam: e.timeZoneParam,
                }
              : null;
          },
          fetch(e, t, n) {
            let { meta: r } = e.eventSource,
              i = Mc(r, e.range, e.context);
            Tc(r.method, r.url, i).then(([e, n]) => {
              t({ rawEvents: e, response: n });
            }, n);
          },
        },
      ],
    };
  function Mc(e, t, n) {
    let { dateEnv: r, options: i } = n,
      a,
      o,
      s,
      c,
      l = {};
    return (
      (a = e.startParam),
      (a ??= i.startParam),
      (o = e.endParam),
      (o ??= i.endParam),
      (s = e.timeZoneParam),
      (s ??= i.timeZoneParam),
      (c =
        typeof e.extraParams == `function`
          ? e.extraParams()
          : e.extraParams || {}),
      Object.assign(l, c),
      (l[a] = r.formatIso(t.start)),
      (l[o] = r.formatIso(t.end)),
      r.timeZone !== `local` && (l[s] = r.timeZone),
      l
    );
  }
  var Nc = {
    name: `change-handler`,
    optionChangeHandlers: {
      controller(e, t) {
        e._setApi(t.calendarApi);
      },
      events(e, t) {
        Pc([e], t);
      },
      eventSources: Pc,
    },
  };
  function Pc(e, t) {
    let n = ko(t.getCurrentData().eventSources);
    if (
      n.length === 1 &&
      e.length === 1 &&
      Array.isArray(n[0]._raw) &&
      Array.isArray(e[0])
    ) {
      t.dispatch({
        type: `RESET_RAW_EVENTS`,
        sourceId: n[0].sourceId,
        rawEvents: e[0],
      });
      return;
    }
    let r = [];
    for (let t of e) {
      let e = !1;
      for (let r = 0; r < n.length; r += 1)
        if (n[r]._raw === t) {
          (n.splice(r, 1), (e = !0));
          break;
        }
      e || r.push(t);
    }
    for (let e of n)
      t.dispatch({ type: `REMOVE_EVENT_SOURCE`, sourceId: e.sourceId });
    for (let e of r) t.calendarApi.addEventSource(e);
  }
  var Fc = {
    id: String,
    defaultAllDay: Boolean,
    url: String,
    format: String,
    events: R,
    eventDataTransform: R,
    success: R,
    failure: R,
  };
  function Ic(e, t, n = Lc(t)) {
    let r;
    if (
      (typeof e == `string`
        ? (r = { url: e })
        : typeof e == `function` || Array.isArray(e)
          ? (r = { events: e })
          : typeof e == `object` && e && (r = e),
      r)
    ) {
      let { refined: i, extra: a } = Jo(r, n),
        o = Rc(i, t);
      if (o)
        return {
          _raw: e,
          isFetching: !1,
          latestFetchId: ``,
          fetchRange: null,
          defaultAllDay: i.defaultAllDay,
          eventDataTransform: i.eventDataTransform,
          success: i.success,
          failure: i.failure,
          publicId: i.id || ``,
          sourceId: I(),
          sourceDefId: o.sourceDefId,
          meta: o.meta,
          ui: ms(i, t),
          extendedProps: a,
        };
    }
    return null;
  }
  function Lc(e) {
    return { ...fs, ...Fc, ...e.pluginHooks.eventSourceRefiners };
  }
  function Rc(e, t) {
    let n = t.pluginHooks.eventSourceDefs;
    for (let t = n.length - 1; t >= 0; --t) {
      let r = n[t].parseMeta(e);
      if (r) return { sourceDefId: t, meta: r };
    }
    return null;
  }
  function zc(e, t, n) {
    let r = t ? t.activeRange : null;
    return z({}, Xc(e, n), r, n);
  }
  function Bc(e, t, n, r) {
    let i = n ? n.activeRange : null;
    switch (t.type) {
      case `ADD_EVENT_SOURCES`:
        return z(e, t.sources, i, r);
      case `REMOVE_EVENT_SOURCE`:
        return Uc(e, t.sourceId);
      case `PREV`:
      case `NEXT`:
      case `CHANGE_DATE`:
      case `CHANGE_VIEW_TYPE`:
        return n ? Wc(e, i, r) : e;
      case `FETCH_EVENT_SOURCES`:
        return Kc(
          e,
          t.sourceIds ? Ao(t.sourceIds) : Yc(e, r),
          i,
          t.isRefetch || !1,
          r,
        );
      case `RECEIVE_EVENTS`:
      case `RECEIVE_EVENT_ERROR`:
        return Jc(e, t.sourceId, t.fetchId, t.fetchRange);
      case `REMOVE_ALL_EVENT_SOURCES`:
        return {};
      default:
        return e;
    }
  }
  function Vc(e, t, n) {
    let r = t ? t.activeRange : null;
    return Kc(e, Yc(e, n), r, !0, n);
  }
  function Hc(e) {
    for (let t in e) if (e[t].isFetching) return !0;
    return !1;
  }
  function z(e, t, n, r) {
    let i = {};
    for (let e of t) i[e.sourceId] = e;
    return (n && (i = Wc(i, n, r)), { ...e, ...i });
  }
  function Uc(e, t) {
    return Do(e, (e) => e.sourceId !== t);
  }
  function Wc(e, t, n) {
    return Kc(
      e,
      Do(e, (e) => Gc(e, t, n)),
      t,
      !1,
      n,
    );
  }
  function Gc(e, t, n) {
    return Zc(e, n)
      ? !n.options.lazyFetching ||
          !e.fetchRange ||
          e.isFetching ||
          t.start < e.fetchRange.start ||
          t.end > e.fetchRange.end
      : !e.latestFetchId;
  }
  function Kc(e, t, n, r, i) {
    let a = {};
    for (let o in e) {
      let s = e[o];
      a[o] = t[o] ? qc(s, n, r, i) : s;
    }
    return a;
  }
  function qc(e, t, n, r) {
    let { options: i, calendarApi: a } = r,
      o = r.pluginHooks.eventSourceDefs[e.sourceDefId],
      s = I();
    return (
      o.fetch(
        { eventSource: e, range: t, isRefetch: n, context: r },
        (n) => {
          let { rawEvents: o } = n;
          (i.eventSourceSuccess &&
            (o = i.eventSourceSuccess.call(a, o, n.response) || o),
            e.success && (o = e.success.call(a, o, n.response) || o),
            r.dispatch({
              type: `RECEIVE_EVENTS`,
              sourceId: e.sourceId,
              fetchId: s,
              fetchRange: t,
              rawEvents: o,
            }));
        },
        (n) => {
          let o = !1;
          (i.eventSourceFailure && (i.eventSourceFailure.call(a, n), (o = !0)),
            e.failure && (e.failure(n), (o = !0)),
            o || fo(`Unhandled event source error: ${n.message}`, n),
            r.dispatch({
              type: `RECEIVE_EVENT_ERROR`,
              sourceId: e.sourceId,
              fetchId: s,
              fetchRange: t,
              error: n,
            }));
        },
      ),
      { ...e, isFetching: !0, latestFetchId: s }
    );
  }
  function Jc(e, t, n, r) {
    let i = e[t];
    return i && n === i.latestFetchId
      ? { ...e, [t]: { ...i, isFetching: !1, fetchRange: r } }
      : e;
  }
  function Yc(e, t) {
    return Do(e, (e) => Zc(e, t));
  }
  function Xc(e, t) {
    let n = Lc(t),
      r = [].concat(e.eventSources || []),
      i = [];
    (e.initialEvents && r.unshift(e.initialEvents),
      e.events && r.unshift(e.events));
    for (let e of r) {
      let r = Ic(e, t, n);
      r && i.push(r);
    }
    return i;
  }
  function Zc(e, t) {
    return !t.pluginHooks.eventSourceDefs[e.sourceDefId].ignoreRange;
  }
  var Qc = {
    name: `simple-recurring-event`,
    recurringTypes: [
      {
        parse(e, t) {
          if (
            e.daysOfWeek ||
            e.startTime ||
            e.endTime ||
            e.startRecur ||
            e.endRecur
          ) {
            let n = {
                daysOfWeek: e.daysOfWeek || null,
                startTime: e.startTime || null,
                endTime: e.endTime || null,
                startRecur: e.startRecur ? t.createMarker(e.startRecur) : null,
                endRecur: e.endRecur ? t.createMarker(e.endRecur) : null,
                dateEnv: t,
              },
              r;
            return (
              e.duration && (r = e.duration),
              !r &&
                e.startTime &&
                e.endTime &&
                (r = La(e.endTime, e.startTime)),
              {
                allDayGuess: !e.startTime && !e.endTime,
                duration: r,
                typeData: n,
              }
            );
          }
          return null;
        },
        expand(e, t, n) {
          let r = Ta(t, { start: e.startRecur, end: e.endRecur });
          return r ? $c(e.daysOfWeek, e.startTime, e.dateEnv, n, r) : [];
        },
      },
    ],
    eventRefiners: {
      daysOfWeek: R,
      startTime: k,
      endTime: k,
      duration: k,
      startRecur: R,
      endRecur: R,
    },
  };
  function $c(e, t, n, r, i) {
    let a = e ? Ao(e) : null,
      o = O(i.start),
      s = i.end,
      c = [];
    for (
      t &&
      (t.milliseconds < 0
        ? (s = Zi(s, 1))
        : t.milliseconds >= 864e5 && (o = Zi(o, -1)));
      o < s;
    ) {
      let e;
      ((!a || a[o.getUTCDay()]) &&
        ((e = t ? r.add(o, t) : o), c.push(r.createMarker(n.toDate(e)))),
        (o = Zi(o, 1)));
    }
    return c;
  }
  var el = [
      Oc,
      Ac,
      jc,
      Qc,
      Nc,
      {
        name: `misc`,
        isLoadingFuncs: [(e) => Hc(e.eventSources)],
        propSetHandlers: { dateProfile: Ec, eventStore: Dc },
      },
    ],
    B = c(f(), 1);
  function V(e, t, n) {
    let r, i;
    return function (...a) {
      if (!r) i = e.apply(this, a);
      else if (!Vo(r, a)) {
        n && n(i);
        let r = e.apply(this, a);
        (!t || !t(r, i)) && (i = r);
      }
      return ((r = a), i);
    };
  }
  function tl(e, t, n) {
    let r, i;
    return (a) => {
      if (!r) i = e.call(this, a);
      else if (!Po(r, a)) {
        n && n(i);
        let r = e.call(this, a);
        (!t || !t(r, i)) && (i = r);
      }
      return ((r = a), i);
    };
  }
  var nl = (0, B.createContext)({});
  function rl(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
    return {
      dateEnv: i,
      nowManager: a,
      options: n,
      pluginHooks: o,
      emitter: l,
      dispatch: s,
      getCurrentData: c,
      calendarApi: u,
      viewSpec: e,
      viewApi: t,
      dateProfileGenerator: r,
      baseId: d,
      registerInteractiveComponent: f,
      unregisterInteractiveComponent: p,
    };
  }
  var il = class extends B.Component {
    shouldComponentUpdate(e, t) {
      return (
        !Fo(this.props, e, this.propEquality) ||
        !Fo(this.state, t, this.stateEquality)
      );
    }
  };
  ((il.addPropsEquality = al),
    (il.addStateEquality = ol),
    (il.contextType = nl),
    (il.prototype.propEquality = {}),
    (il.prototype.stateEquality = {}));
  var H = class extends il {};
  H.contextType = nl;
  function al(e) {
    let t = Object.create(this.prototype.propEquality);
    (Object.assign(t, e), (this.prototype.propEquality = t));
  }
  function ol(e) {
    let t = Object.create(this.prototype.stateEquality);
    (Object.assign(t, e), (this.prototype.stateEquality = t));
  }
  function U(e, t) {
    typeof e == `function` ? e(t) : e && (e.current = t);
  }
  var sl = class extends H {
    constructor() {
      (super(...arguments),
        (this.id = I()),
        (this.queuedDomNodes = []),
        (this.currentDomNodes = []),
        (this.handleEl = (e) => {
          ((this.el = e), this.props.elRef && U(this.props.elRef, e));
        }));
    }
    render() {
      let { props: e, context: t } = this,
        { options: n } = t,
        { customGenerator: r, defaultGenerator: i, renderProps: a } = e,
        o = ll(e, ``, this.handleEl),
        s = !1,
        c,
        l = [],
        u;
      if (r != null) {
        let e = typeof r == `function` ? r(a) : r;
        if (e === !0) s = !0;
        else {
          let t = e && typeof e == `object`;
          t && `html` in e
            ? (o.dangerouslySetInnerHTML = { __html: e.html })
            : t && `domNodes` in e
              ? (l = Array.prototype.slice.call(e.domNodes))
              : (t ? (0, B.isValidElement)(e) : typeof e != `function`)
                ? (c = e)
                : (u = e);
        }
      } else s = !cl(e.generatorName, n);
      return (
        s && i && (c = i(a)),
        (this.queuedDomNodes = l),
        (this.currentGeneratorMeta = u),
        (0, B.createElement)(e.tag, o, c)
      );
    }
    componentDidMount() {
      (this.applyQueueudDomNodes(), this.triggerCustomRendering(!0));
    }
    componentDidUpdate() {
      (this.applyQueueudDomNodes(), this.triggerCustomRendering(!0));
    }
    componentWillUnmount() {
      this.triggerCustomRendering(!1);
    }
    triggerCustomRendering(e) {
      let { props: t, context: n } = this,
        { handleCustomRendering: r, customRenderingMetaMap: i } = n.options;
      if (r) {
        let n = this.currentGeneratorMeta ?? i?.[t.generatorName];
        n &&
          r({
            id: this.id,
            isActive: e,
            containerEl: this.el,
            generatorMeta: n,
            renderProps: t.renderProps,
          });
      }
    }
    applyQueueudDomNodes() {
      let { queuedDomNodes: e, currentDomNodes: t } = this,
        { el: n } = this;
      if (!Vo(e, t)) {
        for (let e of t) e.remove();
        for (let t of e) n.appendChild(t);
        this.currentDomNodes = e;
      }
    }
  };
  sl.addPropsEquality({ renderProps: Po, attrs: mc, style: Po });
  function cl(e, t) {
    return !!(t.handleCustomRendering && e && t.customRenderingMetaMap?.[e]);
  }
  function ll(e, t, n) {
    let r = { ...e.attrs, ref: n };
    return (
      (e.className || t) && (r.className = j(t, e.className, r.className)),
      e.style && (r.style = e.style),
      r
    );
  }
  var ul = (0, B.createContext)(0),
    W = class extends B.Component {
      constructor() {
        (super(...arguments),
          (this.InnerContent = dl.bind(void 0, this)),
          (this.handleEl = (e) => {
            ((this.el = e),
              this.props.elRef &&
                (U(this.props.elRef, e),
                e && this.didMountMisfire && this.componentDidMount()));
          }));
      }
      render() {
        let { props: e } = this,
          t = G(e.classNameGenerator, e.renderProps);
        if (e.children) {
          let n = ll(e, t, this.handleEl),
            r = e.children(this.InnerContent, e.renderProps, n);
          return e.tag ? (0, B.createElement)(e.tag, n, r) : r;
        }
        return (0, B.createElement)(sl, {
          ...e,
          elRef: this.handleEl,
          tag: e.tag || `div`,
          className: j(e.className, t),
          renderId: this.context,
        });
      }
      componentDidMount() {
        this.el
          ? this.props.didMount?.({ ...this.props.renderProps, el: this.el })
          : (this.didMountMisfire = !0);
      }
      componentWillUnmount() {
        this.props.willUnmount?.({ ...this.props.renderProps, el: this.el });
      }
    };
  W.contextType = ul;
  function dl(e, t) {
    let n = e.props;
    return (0, B.createElement)(sl, {
      renderProps: n.renderProps,
      generatorName: n.generatorName,
      customGenerator: n.customGenerator,
      defaultGenerator: n.defaultGenerator,
      renderId: e.context,
      ...t,
    });
  }
  function G(e, t) {
    return (typeof e == `function` ? e(t) : e) || ``;
  }
  function fl(e) {
    return e.text;
  }
  function pl(e) {
    return e.height === `auto` || e.contentHeight === `auto`;
  }
  function ml(e) {
    let { tableHeaderSticky: t } = e;
    return ((t == null || t === `auto`) && (t = pl(e)), t);
  }
  function hl(e) {
    let t = pl(e),
      { footerScrollbarSticky: n } = e;
    return ((n == null || n === `auto`) && (n = t), !!n && t);
  }
  function gl(e) {
    let t = e.scrollerSyncerClass;
    if (!t) throw RangeError(`Must import @fullcalendar/scrollgrid`);
    return t;
  }
  var _l = class {
    constructor(e) {
      ((this.handleChange = e),
        (this.isMounted = !1),
        (this.handleRefresh = () => {
          let e = this.computeTiming();
          (e.nowDate.valueOf() !== this.nowDate.valueOf() &&
            ((this.nowDate = e.nowDate),
            (this.todayRange = e.todayRange),
            this.handleChange()),
            this.clearTimeout(),
            this.setTimeout(e.waitMs));
        }),
        (this.handleVisibilityChange = () => {
          document.hidden || this.handleRefresh();
        }));
    }
    update(e) {
      if (this.isMounted)
        (e.unit !== this.unit ||
          e.unitValue !== this.unitValue ||
          e.nowIndicatorSnap !== this.nowIndicatorSnap ||
          e.nowManager !== this.nowManager ||
          e.dateEnv !== this.dateEnv) &&
          ((this.unit = e.unit),
          (this.unitValue = e.unitValue),
          (this.nowIndicatorSnap = e.nowIndicatorSnap),
          (this.nowManager = e.nowManager),
          (this.dateEnv = e.dateEnv),
          this.clearTimeout(),
          this.setTimeout());
      else {
        ((this.isMounted = !0),
          (this.unit = e.unit),
          (this.unitValue = e.unitValue),
          (this.nowIndicatorSnap = e.nowIndicatorSnap),
          (this.nowManager = e.nowManager),
          (this.dateEnv = e.dateEnv));
        let t = this.computeTiming();
        ((this.nowDate = t.nowDate),
          (this.todayRange = t.todayRange),
          this.setTimeout(),
          this.nowManager.addResetListener(this.handleRefresh),
          typeof document < `u` &&
            document.addEventListener(
              `visibilitychange`,
              this.handleVisibilityChange,
            ));
      }
      return { nowDate: this.nowDate, todayRange: this.todayRange };
    }
    destroy() {
      this.isMounted &&
        ((this.isMounted = !1),
        this.clearTimeout(),
        this.nowManager.removeResetListener(this.handleRefresh),
        typeof document < `u` &&
          document.removeEventListener(
            `visibilitychange`,
            this.handleVisibilityChange,
          ));
    }
    computeTiming() {
      let e = this.nowManager.getDateMarker(),
        { unit: t, unitValue: n, nowIndicatorSnap: r, dateEnv: i } = this;
      r === `auto` && (r = /year|month|week|day/.test(t) || (n || 1) === 1);
      let a, o;
      return (
        r
          ? ((a = i.startOf(e, t)),
            (o = i.add(a, k(1, t)).valueOf() - e.valueOf()))
          : ((a = e), (o = 6e4)),
        (o = Math.min(864e5, o)),
        { nowDate: a, todayRange: vl(a), waitMs: o }
      );
    }
    setTimeout(e = this.computeTiming().waitMs) {
      this.timeoutId = setTimeout(() => {
        let e = this.computeTiming();
        ((this.nowDate = e.nowDate),
          (this.todayRange = e.todayRange),
          this.handleChange(),
          this.setTimeout(e.waitMs));
      }, e);
    }
    clearTimeout() {
      this.timeoutId && clearTimeout(this.timeoutId);
    }
  };
  function vl(e) {
    let t = O(e);
    return { start: t, end: Zi(t, 1) };
  }
  var yl = class {
    constructor(e) {
      ((this.props = e), this.initHiddenDays());
    }
    buildPrev(e, t, n, r) {
      let { dateEnv: i } = this.props,
        a = i.subtract(i.startOf(t, e.currentRangeUnit), e.dateIncrement);
      return this.build(a, n, -1, r);
    }
    buildNext(e, t, n, r) {
      let { dateEnv: i } = this.props,
        a = i.add(i.startOf(t, e.currentRangeUnit), e.dateIncrement);
      return this.build(a, n, 1, r);
    }
    build(e, t, n, r = !0) {
      let { props: i } = this,
        a,
        o,
        s,
        c,
        l,
        u;
      return (
        (a = this.buildValidRange(t)),
        (a = this.trimHiddenDays(a)),
        r && (e = Oa(e, a)),
        (o = this.buildCurrentRangeInfo(e, n)),
        (s = /^(year|month|week|day)$/.test(o.unit)),
        (c = this.buildRenderRange(this.trimHiddenDays(o.range), o.unit, s)),
        (c = this.trimHiddenDays(c)),
        (l = c),
        i.showNonCurrentDates || (l = Ta(l, o.range)),
        (l = this.adjustActiveRange(l)),
        (l = Ta(l, a)),
        (u = Ea(o.range, a)),
        Da(c, e) || (e = c.start),
        {
          currentDate: e,
          validRange: a,
          currentRange: o.range,
          currentRangeUnit: o.unit,
          isRangeAllDay: s,
          activeRange: l,
          renderRange: c,
          slotMinTime: i.slotMinTime,
          slotMaxTime: i.slotMaxTime,
          isValid: u,
          dateIncrement: this.buildDateIncrement(o.duration),
        }
      );
    }
    buildValidRange(e) {
      let t = this.props.validRangeInput,
        n =
          typeof t == `function`
            ? t.call(this.props.calendarApi, this.props.dateEnv.toDate(e))
            : t;
      return this.refineRange(n) || { start: null, end: null };
    }
    buildCurrentRangeInfo(e, t) {
      let { props: n } = this,
        r = null,
        i = null,
        a = null,
        o;
      return (
        n.duration
          ? ((r = n.duration),
            (i = n.durationUnit),
            (a = this.buildRangeFromDuration(e, t, r, i)))
          : (o = this.props.dayCount)
            ? ((i = `day`), (a = this.buildRangeFromDayCount(e, t, o)))
            : (a = this.buildCustomVisibleRange(e))
              ? (i = n.dateEnv.greatestWholeUnit(a.start, a.end).unit)
              : ((r = this.getFallbackDuration()),
                (i = Ha(r).unit),
                (a = this.buildRangeFromDuration(e, t, r, i))),
        { duration: r, unit: i, range: a }
      );
    }
    getFallbackDuration() {
      return k({ day: 1 });
    }
    adjustActiveRange(e) {
      let {
          dateEnv: t,
          usesMinMaxTime: n,
          slotMinTime: r,
          slotMaxTime: i,
        } = this.props,
        { start: a, end: o } = e;
      return (
        n &&
          (Ba(r) < 0 && ((a = O(a)), (a = t.add(a, r))),
          Ba(i) > 1 && ((o = O(o)), (o = Zi(o, -1)), (o = t.add(o, i)))),
        { start: a, end: o }
      );
    }
    buildRangeFromDuration(e, t, n, r) {
      let { dateEnv: i, dateAlignment: a } = this.props,
        o,
        s,
        c;
      if (!a) {
        let { dateIncrement: e } = this.props;
        a = e && Va(e) < Va(n) ? Ha(e).unit : r;
      }
      Ba(n) <= 1 &&
        this.isHiddenDay(o) &&
        ((o = this.skipHiddenDays(o, t)), (o = O(o)));
      function l() {
        ((o = i.startOf(e, a)), (s = i.add(o, n)), (c = { start: o, end: s }));
      }
      return (
        l(),
        this.trimHiddenDays(c) || ((e = this.skipHiddenDays(e, t)), l()),
        c
      );
    }
    buildRangeFromDayCount(e, t, n) {
      let { dateEnv: r, dateAlignment: i } = this.props,
        a = 0,
        o = e,
        s;
      (i && (o = r.startOf(o, i)),
        (o = O(o)),
        (o = this.skipHiddenDays(o, t)),
        (s = o));
      do ((s = Zi(s, 1)), this.isHiddenDay(s) || (a += 1));
      while (a < n);
      return { start: o, end: s };
    }
    buildCustomVisibleRange(e) {
      let { props: t } = this,
        n = t.visibleRangeInput,
        r =
          typeof n == `function`
            ? n.call(t.calendarApi, t.dateEnv.toDate(e))
            : n,
        i = this.refineRange(r);
      return i && (i.start == null || i.end == null) ? null : i;
    }
    buildRenderRange(e, t, n) {
      return e;
    }
    buildDateIncrement(e) {
      let { dateIncrement: t } = this.props,
        n;
      return (
        t || ((n = this.props.dateAlignment) ? k(1, n) : e || k({ days: 1 }))
      );
    }
    refineRange(e) {
      if (e) {
        let t = Sa(e, this.props.dateEnv);
        return ((t &&= Zo(t)), t);
      }
      return null;
    }
    initHiddenDays() {
      let e = this.props.hiddenDays || [],
        t = [],
        n = 0,
        r;
      for (this.props.weekends === !1 && e.push(0, 6), r = 0; r < 7; r += 1)
        (t[r] = e.indexOf(r) !== -1) || (n += 1);
      if (!n) throw Error(`invalid hiddenDays`);
      this.isHiddenDayHash = t;
    }
    trimHiddenDays(e) {
      let { start: t, end: n } = e;
      return (
        (t &&= this.skipHiddenDays(t)),
        (n &&= this.skipHiddenDays(n, -1, !0)),
        t == null || n == null || t < n ? { start: t, end: n } : null
      );
    }
    isHiddenDay(e) {
      return (
        e instanceof Date && (e = e.getUTCDay()),
        this.isHiddenDayHash[e]
      );
    }
    skipHiddenDays(e, t = 1, n = !1) {
      for (; this.isHiddenDayHash[(e.getUTCDay() + (n ? t : 0) + 7) % 7]; )
        e = Zi(e, t);
      return e;
    }
  };
  function bl(e, t) {
    let { currentRange: n } = e;
    if (e.currentRangeUnit === `year`)
      return t.diffWholeYears(n.start, n.end) > 1 ? `year` : `month`;
    if (e.currentRangeUnit === `month`) {
      if (t.diffWholeMonths(n.start, n.end) > 1) return `month`;
    } else if (e.currentRangeUnit === `week`) {
      if (aa(n.start, n.end) > 1) return `week`;
    } else if (e.currentRangeUnit === `day` && oa(n.start, n.end) > 1)
      return `day`;
  }
  function xl(e, t, n) {
    if (e.valueOf() === O(e).valueOf()) {
      if (t === `year`) return !n.getMonth(e) && n.getDay(e) === 1;
      if (t === `month`) return n.getDay(e) === 1;
      if (t === `week`) return e.getUTCDay() === n.weekDow;
      if (t === `day`) return !0;
    }
    return !1;
  }
  function Sl(e, t, n, r, i) {
    switch (t.type) {
      case `RECEIVE_EVENTS`:
        return Cl(e, n[t.sourceId], t.fetchId, t.fetchRange, t.rawEvents, i);
      case `RESET_RAW_EVENTS`:
        return wl(e, n[t.sourceId], t.rawEvents, r.activeRange, i);
      case `ADD_EVENTS`:
        return Dl(e, t.eventStore, r ? r.activeRange : null, i);
      case `RESET_EVENTS`:
        return t.eventStore;
      case `MERGE_EVENTS`:
        return cs(e, t.eventStore);
      case `PREV`:
      case `NEXT`:
      case `CHANGE_DATE`:
      case `CHANGE_VIEW_TYPE`:
        return r ? ts(e, r.activeRange, i) : e;
      case `REMOVE_EVENTS`:
        return us(e, t.eventStore);
      case `REMOVE_EVENT_SOURCE`:
        return kl(e, t.sourceId);
      case `REMOVE_ALL_EVENT_SOURCES`:
        return ls(e, (e) => !e.sourceId);
      case `REMOVE_ALL_EVENTS`:
        return ss();
      default:
        return e;
    }
  }
  function Cl(e, t, n, r, i, a) {
    if (t && n === t.latestFetchId) {
      let n = rs(Tl(i, t, a), t, a);
      return (r && (n = ts(n, r, a)), cs(kl(e, t.sourceId), n));
    }
    return e;
  }
  function wl(e, t, n, r, i) {
    let { defIdMap: a, instanceIdMap: o } = Al(e);
    return ts(rs(Tl(n, t, i), t, i, !1, a, o), r, i);
  }
  function Tl(e, t, n) {
    let r = n.options.eventDataTransform,
      i = t ? t.eventDataTransform : null;
    return (i && (e = El(e, i)), r && (e = El(e, r)), e);
  }
  function El(e, t) {
    let n;
    if (!t) n = e;
    else {
      n = [];
      for (let r of e) {
        let e = t(r);
        e ? n.push(e) : (e ?? n.push(r));
      }
    }
    return n;
  }
  function Dl(e, t, n, r) {
    return (n && (t = ts(t, n, r)), cs(e, t));
  }
  function Ol(e, t, n) {
    let { defs: r } = e;
    return {
      defs: r,
      instances: Oo(e.instances, (e) =>
        r[e.defId].allDay
          ? e
          : {
              ...e,
              range: {
                start: n.createMarker(t.toDate(e.range.start)),
                end: n.createMarker(t.toDate(e.range.end)),
              },
            },
      ),
    };
  }
  function kl(e, t) {
    return ls(e, (e) => e.sourceId !== t);
  }
  function Al(e) {
    let { defs: t, instances: n } = e,
      r = {},
      i = {};
    for (let e in t) {
      let { publicId: n } = t[e];
      n && (r[n] = e);
    }
    for (let e in n) {
      let { publicId: r } = t[n[e].defId];
      r && (i[r] = e);
    }
    return { defIdMap: r, instanceIdMap: i };
  }
  var jl = class {
    constructor(e) {
      ((this.component = e.component),
        (this.isHitComboAllowed = e.isHitComboAllowed || null));
    }
    destroy() {}
  };
  function Ml(e, t) {
    return {
      component: e,
      el: t.el,
      useEventCenter: t.useEventCenter == null || t.useEventCenter,
      isHitComboAllowed: t.isHitComboAllowed || null,
    };
  }
  var Nl = {},
    Pl = class {
      constructor() {
        ((this.handlers = {}), (this.thisContext = null));
      }
      setThisContext(e) {
        this.thisContext = e;
      }
      setOptions(e) {
        this.options = e;
      }
      on(e, t) {
        Fl(this.handlers, e, t);
      }
      off(e, t) {
        Il(this.handlers, e, t);
      }
      trigger(e, ...t) {
        let n = this.handlers[e] || [],
          r = this.options && this.options[e],
          i = [].concat(r || [], n);
        for (let e of i) e.apply(this.thisContext, t);
      }
      hasHandlers(e) {
        return !!(
          (this.handlers[e] && this.handlers[e].length) ||
          (this.options && this.options[e])
        );
      }
    };
  function Fl(e, t, n) {
    (e[t] || (e[t] = [])).push(n);
  }
  function Il(e, t, n) {
    n ? e[t] && (e[t] = e[t].filter((e) => e !== n)) : delete e[t];
  }
  var Ll = m();
  function Rl(e) {
    return {
      name: e.name,
      premiumReleaseDate: e.premiumReleaseDate
        ? new Date(e.premiumReleaseDate)
        : void 0,
      reducers: e.reducers || [],
      isLoadingFuncs: e.isLoadingFuncs || [],
      contextInit: [].concat(e.contextInit || []),
      eventRefiners: e.eventRefiners || {},
      eventDefMemberAdders: e.eventDefMemberAdders || [],
      eventSourceRefiners: e.eventSourceRefiners || {},
      isDraggableTransformers: e.isDraggableTransformers || [],
      eventDragMutationMassagers: e.eventDragMutationMassagers || [],
      eventDefMutationAppliers: e.eventDefMutationAppliers || [],
      dateSelectionTransformers: e.dateSelectionTransformers || [],
      datePointTransforms: e.datePointTransforms || [],
      dateSpanTransforms: e.dateSpanTransforms || [],
      views: e.views || {},
      viewPropsTransformers: e.viewPropsTransformers || [],
      isPropsValid: e.isPropsValid || null,
      externalDefTransforms: e.externalDefTransforms || [],
      viewContainerAppends: e.viewContainerAppends || [],
      eventDropTransformers: e.eventDropTransformers || [],
      componentInteractions: e.componentInteractions || [],
      calendarInteractions: e.calendarInteractions || [],
      eventSourceDefs: e.eventSourceDefs || [],
      cmdFormatter: e.cmdFormatter,
      recurringTypes: e.recurringTypes || [],
      initialView: e.initialView || ``,
      elementDraggingImpl: e.elementDraggingImpl,
      optionChangeHandlers: e.optionChangeHandlers || {},
      scrollerSyncerClass: e.scrollerSyncerClass || null,
      listenerRefiners: e.listenerRefiners || {},
      optionRefiners: e.optionRefiners || {},
      optionDefaults: e.optionDefaults ? [e.optionDefaults] : [],
      propSetHandlers: e.propSetHandlers || {},
    };
  }
  function K(e, t) {
    let n = {},
      r = {
        premiumReleaseDate: void 0,
        reducers: [],
        isLoadingFuncs: [],
        contextInit: [],
        eventRefiners: {},
        eventDefMemberAdders: [],
        eventSourceRefiners: {},
        isDraggableTransformers: [],
        eventDragMutationMassagers: [],
        eventDefMutationAppliers: [],
        dateSelectionTransformers: [],
        datePointTransforms: [],
        dateSpanTransforms: [],
        views: {},
        viewPropsTransformers: [],
        isPropsValid: null,
        externalDefTransforms: [],
        viewContainerAppends: [],
        eventDropTransformers: [],
        componentInteractions: [],
        calendarInteractions: [],
        eventSourceDefs: [],
        cmdFormatter: null,
        recurringTypes: [],
        initialView: ``,
        elementDraggingImpl: null,
        optionChangeHandlers: {},
        scrollerSyncerClass: null,
        listenerRefiners: {},
        optionRefiners: {},
        optionDefaults: [],
        propSetHandlers: {},
      };
    function i(e) {
      for (let t of e) {
        let { name: e } = t;
        if (!e) throw Error(`Plugin must specify a name`);
        if (!n[e]) {
          let a = (n[e] = Rl(t));
          ((r = J(r, a)), i(t.deps || []));
        }
      }
    }
    return (e && i(e), i(t), r);
  }
  function q() {
    let e = [],
      t = [],
      n;
    return (r, i) => (
      (!n || !Vo(r, e) || !Vo(i, t)) && (n = K(r, i)),
      (e = r),
      (t = i),
      n
    );
  }
  function J(e, t) {
    return {
      premiumReleaseDate: Y(e.premiumReleaseDate, t.premiumReleaseDate),
      reducers: e.reducers.concat(t.reducers),
      isLoadingFuncs: e.isLoadingFuncs.concat(t.isLoadingFuncs),
      contextInit: e.contextInit.concat(t.contextInit),
      eventRefiners: { ...e.eventRefiners, ...t.eventRefiners },
      eventDefMemberAdders: e.eventDefMemberAdders.concat(
        t.eventDefMemberAdders,
      ),
      eventSourceRefiners: {
        ...e.eventSourceRefiners,
        ...t.eventSourceRefiners,
      },
      isDraggableTransformers: e.isDraggableTransformers.concat(
        t.isDraggableTransformers,
      ),
      eventDragMutationMassagers: e.eventDragMutationMassagers.concat(
        t.eventDragMutationMassagers,
      ),
      eventDefMutationAppliers: e.eventDefMutationAppliers.concat(
        t.eventDefMutationAppliers,
      ),
      dateSelectionTransformers: e.dateSelectionTransformers.concat(
        t.dateSelectionTransformers,
      ),
      datePointTransforms: e.datePointTransforms.concat(t.datePointTransforms),
      dateSpanTransforms: e.dateSpanTransforms.concat(t.dateSpanTransforms),
      views: lc(e.views, t.views),
      viewPropsTransformers: e.viewPropsTransformers.concat(
        t.viewPropsTransformers,
      ),
      isPropsValid: t.isPropsValid || e.isPropsValid,
      externalDefTransforms: e.externalDefTransforms.concat(
        t.externalDefTransforms,
      ),
      viewContainerAppends: e.viewContainerAppends.concat(
        t.viewContainerAppends,
      ),
      eventDropTransformers: e.eventDropTransformers.concat(
        t.eventDropTransformers,
      ),
      calendarInteractions: e.calendarInteractions.concat(
        t.calendarInteractions,
      ),
      componentInteractions: e.componentInteractions.concat(
        t.componentInteractions,
      ),
      eventSourceDefs: e.eventSourceDefs.concat(t.eventSourceDefs),
      cmdFormatter: t.cmdFormatter || e.cmdFormatter,
      recurringTypes: e.recurringTypes.concat(t.recurringTypes),
      initialView: e.initialView || t.initialView,
      elementDraggingImpl: e.elementDraggingImpl || t.elementDraggingImpl,
      optionChangeHandlers: {
        ...e.optionChangeHandlers,
        ...t.optionChangeHandlers,
      },
      scrollerSyncerClass: e.scrollerSyncerClass || t.scrollerSyncerClass,
      listenerRefiners: { ...e.listenerRefiners, ...t.listenerRefiners },
      optionRefiners: { ...e.optionRefiners, ...t.optionRefiners },
      optionDefaults: e.optionDefaults.concat(t.optionDefaults),
      propSetHandlers: { ...e.propSetHandlers, ...t.propSetHandlers },
    };
  }
  function Y(e, t) {
    return e === void 0
      ? t
      : t === void 0
        ? e
        : new Date(Math.max(e.valueOf(), t.valueOf()));
  }
  function X(e, t) {
    let n = {},
      r;
    for (r in e) zl(r, n, e, t);
    for (r in t) zl(r, n, e, t);
    return n;
  }
  function zl(e, t, n, r) {
    if (t[e]) return t[e];
    let i = Bl(e, t, n, r);
    return (i && (t[e] = i), i);
  }
  function Bl(e, t, n, r) {
    let i = n[e],
      a = r[e],
      o = (e) => (i && i[e] !== null ? i[e] : a && a[e] !== null ? a[e] : null),
      s = o(`component`),
      c = o(`superType`),
      l = null;
    if (c) {
      if (c === e)
        throw Error(`Can't have a custom view type that references itself`);
      l = zl(c, t, n, r);
    }
    return (
      !s && l && (s = l.component),
      s
        ? {
            type: e,
            component: s,
            defaults: uc(l ? l.defaults : {}, i ? i.rawOptions : {}),
            overrides: uc(l ? l.overrides : {}, a ? a.rawOptions : {}),
          }
        : null
    );
  }
  function Vl(e) {
    return Oo(e, Hl);
  }
  function Hl(e) {
    let t = typeof e == `function` ? { component: e } : e,
      { component: n } = t;
    return (
      t.content
        ? (n = Ul(t.content))
        : n && !(n.prototype instanceof H) && (n = Ul(n)),
      { superType: t.type, component: n, rawOptions: t }
    );
  }
  function Ul(e) {
    return (t) =>
      (0, S.jsx)(nl.Consumer, {
        children: (n) => {
          let { options: r, viewSpec: i } = n,
            a = {
              ...t,
              nextDayThreshold: r.nextDayThreshold,
              ...Eo(r),
              options: {
                headerToolbar: r.headerToolbar,
                footerToolbar: r.footerToolbar,
              },
              isHeightAuto: pl(r),
              view: n.viewApi,
            };
          return (0, S.jsx)(W, {
            tag: `div`,
            className: j(
              G(r.viewClass, a),
              G(i.optionDefaults.class, a),
              G(i.optionDefaults.className, a),
              G(i.optionOverrides.class, a),
              G(i.optionOverrides.className, a),
            ),
            renderProps: a,
            generatorName: void 0,
            customGenerator: e,
            didMount: r.didMount || r.viewDidMount,
            willUnmount: r.willUnmount || r.viewWillUnmount,
          });
        },
      });
  }
  function Wl(e, t, n) {
    let r = Vl(e),
      i = Vl(t.views);
    return Oo(X(r, i), (e) => Gl(e, i, t, n));
  }
  function Gl(e, t, n, r) {
    let i =
        e.overrides.duration || e.defaults.duration || r.duration || n.duration,
      a = null,
      o = ``,
      s = ``,
      c = {};
    if (i && ((a = ql(i)), a)) {
      let e = Ha(a);
      ((o = e.unit),
        e.value === 1 && ((s = o), (c = t[o] ? t[o].rawOptions : {})));
    }
    return {
      type: e.type,
      component: e.component,
      duration: a,
      durationUnit: o,
      singleUnit: s,
      optionDefaults: e.defaults,
      optionOverrides: { ...c, ...e.overrides },
    };
  }
  var Kl = {};
  function ql(e) {
    let t = JSON.stringify(e),
      n = Kl[t];
    return (n === void 0 && ((n = k(e)), (Kl[t] = n)), n);
  }
  function Jl(e, t) {
    return (t.type === `CHANGE_VIEW_TYPE` && (e = t.viewType), e);
  }
  function Yl(e, t) {
    switch (t.type) {
      case `CHANGE_DATE`:
        return t.dateMarker;
      default:
        return e;
    }
  }
  function Xl(e, t, n) {
    let r = e.initialDate;
    return r == null ? n.getDateMarker() : t.createMarker(r);
  }
  function Zl(e, t) {
    switch (t.type) {
      case `SET_OPTION`:
        return { ...e, [t.optionName]: t.rawOptionValue };
      default:
        return e;
    }
  }
  function Ql(e, t, n, r, i) {
    let a;
    switch (t.type) {
      case `CHANGE_VIEW_TYPE`:
        return i.build(t.dateMarker || n, r);
      case `CHANGE_DATE`:
        return i.build(t.dateMarker, r);
      case `PREV`:
        if (((a = i.buildPrev(e, n, r)), a.isValid)) return a;
        break;
      case `NEXT`:
        if (((a = i.buildNext(e, n, r)), a.isValid)) return a;
    }
    return e;
  }
  function $l(e, t) {
    switch (t.type) {
      case `UNSELECT_DATES`:
        return null;
      case `SELECT_DATES`:
        return t.selection;
      default:
        return e;
    }
  }
  function eu(e, t) {
    switch (t.type) {
      case `UNSELECT_EVENT`:
        return ``;
      case `SELECT_EVENT`:
        return t.eventInstanceId;
      default:
        return e;
    }
  }
  function tu(e, t) {
    let n;
    switch (t.type) {
      case `UNSET_EVENT_DRAG`:
        return null;
      case `SET_EVENT_DRAG`:
        return (
          (n = t.state),
          {
            affectedEvents: n.affectedEvents,
            mutatedEvents: n.mutatedEvents,
            isEvent: n.isEvent,
          }
        );
      default:
        return e;
    }
  }
  function nu(e, t) {
    let n;
    switch (t.type) {
      case `UNSET_EVENT_RESIZE`:
        return null;
      case `SET_EVENT_RESIZE`:
        return (
          (n = t.state),
          {
            affectedEvents: n.affectedEvents,
            mutatedEvents: n.mutatedEvents,
            isEvent: n.isEvent,
          }
        );
      default:
        return e;
    }
  }
  function ru(e, t, n) {
    return {
      header: e.headerToolbar ? iu(e.headerToolbar, e, t, n) : null,
      footer: e.footerToolbar ? iu(e.footerToolbar, e, t, n) : null,
    };
  }
  function iu(e, t, n, r) {
    let i = t.direction === `rtl`,
      a = [],
      o = !1;
    function s(e) {
      let i = au(e, t, n, r);
      return (a.push(...i.viewsWithButtons), (o ||= i.hasTitle), i.widgets);
    }
    return {
      sectionWidgets: {
        start: s(e[i ? `right` : `left`] || e.start || ``),
        center: s(e.center || ``),
        end: s(e[i ? `left` : `right`] || e.end || ``),
      },
      viewsWithButtons: a,
      hasTitle: o,
    };
  }
  function au(e, t, n, r) {
    let i = t.buttons || {},
      a = t.toolbarElements || {},
      o = e ? e.split(` `) : [],
      s = [],
      c = !1;
    return {
      widgets: o.map((e) =>
        e.split(`,`).map((e) => {
          if (e === `title`) return ((c = !0), { name: e });
          if (a[e]) return { name: e, customElement: a[e] };
          let o,
            l = i[e] || {},
            u,
            d,
            f;
          if ((o = n[e])) {
            s.push(e);
            let n = o.optionDefaults.buttonTextKey;
            ((u =
              l.text ||
              (n ? t[n] : ``) ||
              (o.singleUnit
                ? t[o.singleUnit + `TextLong`] || t[o.singleUnit + `Text`]
                : ``) ||
              e),
              (d = wo(l.hint || t.viewHint, [u, e], u)),
              (f = (t) => {
                (l?.click?.(t), t.defaultPrevented || r.changeView(e));
              }));
          } else
            ((u = l.text || t[e + `TextLong`] || t[e + `Text`] || e),
              (d =
                e === `prevYear`
                  ? wo(l.hint || t.prevHint, [t.yearText, `year`], u)
                  : e === `nextYear`
                    ? wo(l.hint || t.nextHint, [t.yearText, `year`], u)
                    : (n) =>
                        wo(
                          l.hint || t[e + `Hint`],
                          [t[n + `TextLong`] || t[n + `Text`], n],
                          u,
                        )),
              (f = (t) => {
                (l?.click?.(t), t.defaultPrevented || r[e]?.());
              }));
          return {
            name: e,
            isView: !!o,
            buttonText: u,
            buttonHint: d,
            buttonDisplay: l.display,
            buttonIconClass: l.iconClass,
            buttonIconContent: l.iconContent,
            buttonClick: f,
            buttonIsPrimary: l.isPrimary || !1,
            buttonClass: l.class ?? l.className,
            buttonDidMount: l.didMount,
            buttonWillUnmount: l.willUnmount,
          };
        }),
      ),
      viewsWithButtons: s,
      hasTitle: c,
    };
  }
  var ou = class {
      constructor(e, t, n) {
        ((this.type = e), (this.getCurrentData = t), (this.dateEnv = n));
      }
      get calendar() {
        return this.getCurrentData().calendarApi;
      }
      get title() {
        return this.getCurrentData().viewTitle;
      }
      get activeStart() {
        return this.dateEnv.toDate(
          this.getCurrentData().dateProfile.activeRange.start,
        );
      }
      get activeEnd() {
        return this.dateEnv.toDate(
          this.getCurrentData().dateProfile.activeRange.end,
        );
      }
      get currentStart() {
        return this.dateEnv.toDate(
          this.getCurrentData().dateProfile.currentRange.start,
        );
      }
      get currentEnd() {
        return this.dateEnv.toDate(
          this.getCurrentData().dateProfile.currentRange.end,
        );
      }
      getOption(e) {
        return this.getCurrentData().options[e];
      }
    },
    su = {
      startTime: `09:00`,
      endTime: `17:00`,
      daysOfWeek: [1, 2, 3, 4, 5],
      display: `inverse-background`,
      className: ``,
      groupId: `_businessHours`,
    };
  function cu(e, t) {
    return rs(lu(e), null, t);
  }
  function lu(e) {
    let t;
    return (
      (t =
        e === !0
          ? [{}]
          : Array.isArray(e)
            ? e.filter((e) => e.daysOfWeek)
            : typeof e == `object` && e
              ? [e]
              : []),
      (t = t.map((e) => ({ ...su, ...e }))),
      t
    );
  }
  function uu(e, t, n) {
    let r;
    r = /^(year|month)$/.test(e.currentRangeUnit)
      ? e.currentRange
      : e.activeRange;
    let i,
      a = { isEndExclusive: e.isRangeAllDay };
    return (
      t.titleFormat
        ? (i = n.formatRangeToParts(r.start, r.end, M(t.titleFormat), a))
        : ((i = n.formatRangeToParts(
            r.start,
            r.end,
            M(du(e, t.disallowAmbigTitle, `long`)),
            a,
          )),
          fu(i) &&
            (i = n.formatRangeToParts(
              r.start,
              r.end,
              M(du(e, t.disallowAmbigTitle, `short`)),
              a,
            ))),
      Ka(i)
    );
  }
  function du(e, t, n) {
    let { currentRangeUnit: r } = e;
    if (r === `year`) return { year: `numeric` };
    if (r === `month`) return { year: `numeric`, month: n };
    if (!t) {
      let t = oa(e.currentRange.start, e.currentRange.end);
      if (t !== null && t > 1) return { year: `numeric`, month: n };
    }
    return { year: `numeric`, month: `long`, day: `numeric` };
  }
  function fu(e) {
    let t = !1,
      n = !1;
    for (let r of e)
      r.type === `month` &&
        (r.source === `startRange` && (t = !0),
        r.source === `endRange` && (n = !0));
    return t && n;
  }
  var pu = class {
      constructor() {
        this.resetListeners = new Set();
      }
      handleInput(e, t) {
        let n = this.dateEnv;
        if (
          e !== n &&
          (typeof t == `function`
            ? (this.nowFn = t)
            : n ||
              ((this.nowAnchorDate = e.toDate(
                t ? e.createMarker(t) : e.createNowMarker(),
              )),
              (this.nowAnchorQueried = Date.now())),
          (this.dateEnv = e),
          n)
        )
          for (let e of this.resetListeners.values()) e();
      }
      getDateMarker() {
        return this.nowAnchorDate
          ? this.dateEnv.timestampToMarker(
              this.nowAnchorDate.valueOf() +
                (Date.now() - this.nowAnchorQueried),
            )
          : this.dateEnv.createMarker(this.nowFn());
      }
      addResetListener(e) {
        this.resetListeners.add(e);
      }
      removeResetListener(e) {
        this.resetListeners.delete(e);
      }
    },
    mu = class {
      constructor(e) {
        ((this.computeCurrentViewData = V(this._computeCurrentViewData)),
          (this.organizeRawLocales = V(yc)),
          (this.buildLocale = V(bc)),
          (this.buildPluginHooks = q()),
          (this.buildDateEnv = V(hu)),
          (this.parseToolbars = V(ru)),
          (this.buildViewSpecs = V(Wl)),
          (this.buildDateProfileGenerator = tl(gu)),
          (this.buildViewApi = V(_u)),
          (this.buildViewUiProps = tl(bu)),
          (this.buildEventUiBySource = V(vu, Po)),
          (this.buildEventUiBases = V(yu)),
          (this.parseContextBusinessHours = tl(Su)),
          (this.buildToolbarProps = V(Tu)),
          (this.buildTitle = V(uu)),
          (this.nowManager = new pu()),
          (this.isDrainingActionQueue = !1),
          (this.actionQueue = []),
          (this.optionOverrides = {}),
          (this.emitter = new Pl()),
          (this.currentCalendarOptionsRefiners = {}),
          (this.currentCalendarOptionsInput = {}),
          (this.currentCalendarOptionsRefined = {}),
          (this.currentViewOptionsInput = {}),
          (this.currentViewOptionsRefined = {}),
          (this.optionsForRefining = []),
          (this.optionsForHandling = []),
          (this.getCurrentData = () => this.data),
          (this.handleNowChange = () => {
            this.dispatch({ type: `UPDATE_NOW` });
          }),
          (this.dispatch = (e) => {
            (this.actionQueue.push(e),
              this.isDrainingActionQueue || this.drainActionQueue());
          }),
          (this.config = e),
          (this.nowManager = new pu()),
          (this.nowTimer = new _l(this.handleNowChange)));
      }
      destroy() {
        this.nowTimer.destroy();
      }
      update(e) {
        return (
          (this.optionOverrides = e),
          this.actionQueue.push({ type: `IDLE` }),
          this.drainActionQueue(),
          this.data
        );
      }
      resetOptions(e, t) {
        (t === void 0
          ? (this.optionOverrides = e)
          : ((this.optionOverrides = { ...this.optionOverrides, ...e }),
            this.optionsForRefining.push(...t)),
          this.dispatch({ type: `RESET_OPTIONS` }));
      }
      drainActionQueue() {
        let e,
          { state: t, data: n } = this,
          r = !t,
          { actionQueue: i } = this,
          a = [];
        for (this.isDrainingActionQueue = !0; i.length; ) {
          let r = i.shift();
          (({ state: t, data: n, calendarContext: e } = this.reduce(t, n, r)),
            (this.state = t),
            (this.data = n),
            r.type !== `IDLE` && a.push(r));
        }
        if (((this.isDrainingActionQueue = !1), r)) {
          let t = e.options.controller;
          t && t._setApi(this.config.calendarApi);
        }
        if (!r && a.length) {
          let { onDataChange: e } = this.config;
          e && e(this.data, a);
        }
      }
      reduce(e, t, n) {
        let { config: r } = this,
          i = !e,
          a = i ? {} : Zl(e.dynamicOptionOverrides, n),
          o = this.computeOptionsData(this.optionOverrides, a, r.calendarApi),
          s = i
            ? o.calendarOptions.initialView || o.pluginHooks.initialView
            : Jl(e.currentViewType, n),
          c = this.computeCurrentViewData(s, o, this.optionOverrides, a);
        ((r.calendarApi.currentDataManager = this),
          this.emitter.setThisContext(r.calendarApi),
          this.emitter.setOptions(c.options));
        let l = {
            nowManager: this.nowManager,
            dateEnv: o.dateEnv,
            options: o.calendarOptions,
            pluginHooks: o.pluginHooks,
            calendarApi: r.calendarApi,
            dispatch: this.dispatch,
            emitter: this.emitter,
            getCurrentData: this.getCurrentData,
          },
          { nowDate: u } = this.nowTimer.update({
            unit: `day`,
            unitValue: 1,
            nowIndicatorSnap: `auto`,
            nowManager: this.nowManager,
            dateEnv: o.dateEnv,
          }),
          d = i
            ? Xl(o.calendarOptions, o.dateEnv, this.nowManager)
            : Yl(e.currentDate, n),
          f;
        (i
          ? (f = c.dateProfileGenerator.build(d, u))
          : ((f = e.dateProfile),
            t &&
              t.dateProfileGenerator !== c.dateProfileGenerator &&
              (f = c.dateProfileGenerator.build(d, u)),
            (f = Ql(f, n, d, u, c.dateProfileGenerator))),
          ((n && (n.type === `PREV` || n.type === `NEXT`)) ||
            !Da(f.activeRange, d)) &&
            (d = f.currentRange.start));
        let p = i ? zc(o.calendarOptions, f, l) : Bc(e.eventSources, n, f, l),
          m = i ? ss() : Sl(e.eventStore, n, p, f, l),
          h = Hc(p),
          g = i
            ? ss()
            : (h &&
                !c.options.progressiveEventRendering &&
                e.renderableEventStore) ||
              m,
          { eventUiSingleBase: _, selectionConfig: v } =
            this.buildViewUiProps(l),
          y = this.buildEventUiBySource(p),
          b = i ? {} : this.buildEventUiBases(g.defs, _, y),
          x = {
            dynamicOptionOverrides: a,
            currentViewType: s,
            currentDate: d,
            dateProfile: f,
            eventSources: p,
            eventStore: m,
            renderableEventStore: g,
            selectionConfig: v,
            eventUiBases: b,
            businessHours: this.parseContextBusinessHours(l),
            dateSelection: i ? null : $l(e.dateSelection, n),
            eventSelection: i ? `` : eu(e.eventSelection, n),
            eventDrag: i ? null : tu(e.eventDrag, n),
            eventResize: i ? null : nu(e.eventResize, n),
            nowDate: u,
          },
          ee = { ...l, ...x };
        for (let t of o.pluginHooks.reducers) Object.assign(x, t(e, n, ee));
        let S = e ? xu(e, l) : !1,
          C = xu(x, l);
        !S && C
          ? this.emitter.trigger(`loading`, !0)
          : S && !C && this.emitter.trigger(`loading`, !1);
        let te = this.buildTitle(f, c.options, o.dateEnv),
          ne = this.buildToolbarProps(
            c.viewSpec,
            f,
            c.dateProfileGenerator,
            d,
            u,
            te,
          ),
          re = {
            viewTitle: te,
            nowManager: this.nowManager,
            calendarApi: r.calendarApi,
            dispatch: this.dispatch,
            emitter: this.emitter,
            getCurrentData: this.getCurrentData,
            toolbarProps: ne,
            ...o,
            ...c,
            ...x,
          },
          ie = o.pluginHooks.optionChangeHandlers,
          ae = t && t.calendarOptions,
          oe = o.calendarOptions;
        if (ae && ae !== oe) {
          ae.timeZone !== oe.timeZone &&
            ((x.eventSources = re.eventSources = Vc(re.eventSources, f, re)),
            (x.eventStore = re.eventStore =
              Ol(re.eventStore, t.dateEnv, re.dateEnv)),
            (x.renderableEventStore = re.renderableEventStore =
              Ol(re.renderableEventStore, t.dateEnv, re.dateEnv)));
          for (let e in ie)
            (this.optionsForHandling.indexOf(e) !== -1 || ae[e] !== oe[e]) &&
              ie[e](oe[e], re);
        }
        return (
          (this.optionsForHandling = []),
          { state: x, data: re, calendarContext: l }
        );
      }
      computeOptionsData(e, t, n) {
        if (
          !this.optionsForRefining.length &&
          e === this.stableOptionOverrides &&
          t === this.stableDynamicOptionOverrides
        )
          return this.stableCalendarOptionsData;
        let {
            refinedOptions: r,
            pluginHooks: i,
            localeDefaults: a,
            availableLocaleData: o,
          } = this.processRawCalendarOptions(e, t),
          s = this.buildDateEnv(
            r.timeZone,
            r.locale,
            r.weekNumberCalculation,
            r.firstDay,
            r.weekTextLong,
            r.weekTextShort,
            i,
            o,
          ),
          c = this.buildViewSpecs(
            i.views,
            this.stableOptionOverrides,
            this.stableDynamicOptionOverrides,
          ),
          l = this.parseToolbars(r, c, n);
        return (this.stableCalendarOptionsData = {
          calendarOptions: r,
          pluginHooks: i,
          dateEnv: s,
          viewSpecs: c,
          toolbarConfig: l,
          localeDefaults: a,
          availableRawLocales: o.map,
        });
      }
      processRawCalendarOptions(e, t) {
        let { locales: n, locale: r } = uc(Uo, e, t),
          i = this.organizeRawLocales(n),
          a = i.map,
          o = this.buildLocale(r || i.defaultCode, a).options,
          s = this.buildPluginHooks(e.plugins || [], el),
          c = (this.currentCalendarOptionsRefiners = {
            ...Ho,
            ...Wo,
            ...Go,
            ...s.listenerRefiners,
            ...s.optionRefiners,
          }),
          l = uc(Uo, ...s.optionDefaults, o, wu(uc(e, t), c)),
          u = {},
          d = this.currentCalendarOptionsInput,
          f = this.currentCalendarOptionsRefined,
          p = !1;
        for (let e in l)
          this.optionsForRefining.indexOf(e) === -1 &&
          (l[e] === d[e] ||
            (qo[e] && e in d && qo[e](d[e], l[e])) ||
            hc(d[e], l[e]))
            ? (u[e] = f[e])
            : c[e] && ((u[e] = c[e](l[e], e)), (p = !0));
        return (
          p &&
            ((this.currentCalendarOptionsInput = l),
            (this.currentCalendarOptionsRefined = u),
            (this.stableOptionOverrides = e),
            (this.stableDynamicOptionOverrides = t)),
          this.optionsForHandling.push(...this.optionsForRefining),
          (this.optionsForRefining = []),
          {
            rawOptions: this.currentCalendarOptionsInput,
            refinedOptions: this.currentCalendarOptionsRefined,
            pluginHooks: s,
            availableLocaleData: i,
            localeDefaults: o,
          }
        );
      }
      _computeCurrentViewData(e, t, n, r) {
        let i = t.viewSpecs[e];
        if (!i)
          throw Error(
            `viewType "${e}" is not available. Please make sure you've loaded all neccessary plugins`,
          );
        let { refinedOptions: a } = this.processRawViewOptions(
          i,
          t.pluginHooks,
          t.localeDefaults,
          n,
          r,
        );
        return (
          this.nowManager.handleInput(t.dateEnv, a.now),
          {
            viewSpec: i,
            options: a,
            dateProfileGenerator: this.buildDateProfileGenerator({
              dateProfileGeneratorClass:
                i.optionDefaults.dateProfileGeneratorClass,
              duration: i.duration,
              durationUnit: i.durationUnit,
              usesMinMaxTime: i.optionDefaults.usesMinMaxTime,
              dateEnv: t.dateEnv,
              calendarApi: this.config.calendarApi,
              slotMinTime: a.slotMinTime,
              slotMaxTime: a.slotMaxTime,
              showNonCurrentDates: a.showNonCurrentDates,
              dayCount: a.dayCount,
              dateAlignment: a.dateAlignment,
              dateIncrement: a.dateIncrement,
              hiddenDays: a.hiddenDays,
              weekends: a.weekends,
              validRangeInput: a.validRange,
              visibleRangeInput: a.visibleRange,
              fixedWeekCount: a.fixedWeekCount,
            }),
            viewApi: this.buildViewApi(e, this.getCurrentData, t.dateEnv),
          }
        );
      }
      processRawViewOptions(e, t, n, r, i) {
        let a = {
            ...Ho,
            ...Wo,
            ...Go,
            ...Ko,
            ...t.listenerRefiners,
            ...t.optionRefiners,
          },
          o = uc(
            Uo,
            ...t.optionDefaults,
            e.optionDefaults,
            n,
            wu(uc(r, e.optionOverrides, i), a),
          ),
          s = {},
          c = this.currentViewOptionsInput,
          l = this.currentViewOptionsRefined,
          u = !1;
        for (let e in o)
          o[e] === c[e] || (qo[e] && qo[e](o[e], c[e])) || hc(c[e], o[e])
            ? (s[e] = l[e])
            : (o[e] === this.currentCalendarOptionsInput[e] ||
              (qo[e] && qo[e](o[e], this.currentCalendarOptionsInput[e]))
                ? e in this.currentCalendarOptionsRefined &&
                  (s[e] = this.currentCalendarOptionsRefined[e])
                : a[e] && (s[e] = a[e](o[e], e)),
              (u = !0));
        return (
          u &&
            ((this.currentViewOptionsInput = o),
            (this.currentViewOptionsRefined = s)),
          {
            rawOptions: this.currentViewOptionsInput,
            refinedOptions: this.currentViewOptionsRefined,
          }
        );
      }
    };
  function hu(e, t, n, r, i, a, o, s) {
    return new Ya({
      calendarSystem: `gregory`,
      timeZone: e,
      locale: bc(t || s.defaultCode, s.map),
      weekNumberCalculation: n,
      firstDay: r,
      weekTextLong: i,
      weekTextShort: a,
      cmdFormatter: o.cmdFormatter,
    });
  }
  function gu(e) {
    return new (e.dateProfileGeneratorClass || yl)(e);
  }
  function _u(e, t, n) {
    return new ou(e, t, n);
  }
  function vu(e) {
    return Oo(e, (e) => e.ui);
  }
  function yu(e, t, n) {
    let r = { '': t };
    for (let t in e) {
      let i = e[t];
      i.sourceId && n[i.sourceId] && (r[t] = n[i.sourceId]);
    }
    return r;
  }
  function bu(e) {
    let { options: t } = e;
    return {
      eventUiSingleBase: ms(
        {
          display: t.eventDisplay,
          editable: t.editable,
          startEditable: t.eventStartEditable,
          durationEditable: t.eventDurationEditable,
          constraint: t.eventConstraint,
          overlap: typeof t.eventOverlap == `boolean` ? t.eventOverlap : void 0,
          allow: t.eventAllow,
        },
        e,
      ),
      selectionConfig: ms(
        {
          constraint: t.selectConstraint,
          overlap:
            typeof t.selectOverlap == `boolean` ? t.selectOverlap : void 0,
          allow: t.selectAllow,
        },
        e,
      ),
    };
  }
  function xu(e, t) {
    for (let n of t.pluginHooks.isLoadingFuncs) if (n(e)) return !0;
    return !1;
  }
  function Su(e) {
    return cu(e.options.businessHours, e);
  }
  var Cu = {};
  function wu(e, t) {
    let n = {};
    for (let r in e)
      t[r]
        ? (n[r] = e[r])
        : Cu[r] || (fo(`Unknown option \`${r}\`.`), (Cu[r] = !0));
    return n;
  }
  function Tu(e, t, n, r, i, a) {
    let o = n.build(i, i, void 0, !1),
      s = n.buildPrev(t, r, i, !1),
      c = n.buildNext(t, r, i, !1);
    return {
      title: a,
      selectedButton: e.type,
      navUnit: e.singleUnit,
      isTodayEnabled: o.isValid && !Da(t.currentRange, i),
      isPrevEnabled: s.isValid,
      isNextEnabled: c.isValid,
    };
  }
  var Eu = class {
    getCurrentData() {
      return this.currentDataManager.getCurrentData();
    }
    dispatch(e) {
      this.currentDataManager.dispatch(e);
    }
    get view() {
      return this.getCurrentData().viewApi;
    }
    batchRendering(e) {
      e();
    }
    setOption(e, t) {
      this.dispatch({ type: `SET_OPTION`, optionName: e, rawOptionValue: t });
    }
    getOption(e) {
      return this.currentDataManager.currentCalendarOptionsInput[e];
    }
    getAvailableLocaleCodes() {
      return Object.keys(this.getCurrentData().availableRawLocales);
    }
    on(e, t) {
      let { currentDataManager: n } = this;
      n.currentCalendarOptionsRefiners[e]
        ? n.emitter.on(e, t)
        : fo(`Unknown listener \`${e}\`.`);
    }
    off(e, t) {
      this.currentDataManager.emitter.off(e, t);
    }
    trigger(e, ...t) {
      this.currentDataManager.emitter.trigger(e, ...t);
    }
    changeView(e, t) {
      this.batchRendering(() => {
        if ((this.unselect(), t)) {
          if (t.start && t.end)
            (this.dispatch({ type: `CHANGE_VIEW_TYPE`, viewType: e }),
              this.dispatch({
                type: `SET_OPTION`,
                optionName: `visibleRange`,
                rawOptionValue: t,
              }));
          else {
            let { dateEnv: n } = this.getCurrentData();
            this.dispatch({
              type: `CHANGE_VIEW_TYPE`,
              viewType: e,
              dateMarker: n.createMarker(t),
            });
          }
        } else this.dispatch({ type: `CHANGE_VIEW_TYPE`, viewType: e });
      });
    }
    zoomTo(e, t) {
      let n = this.getCurrentData(),
        r;
      ((t ||= `day`),
        (r = n.viewSpecs[t] || this.getUnitViewSpec(t)),
        this.unselect(),
        r
          ? this.dispatch({
              type: `CHANGE_VIEW_TYPE`,
              viewType: r.type,
              dateMarker: e,
            })
          : this.dispatch({ type: `CHANGE_DATE`, dateMarker: e }));
    }
    getUnitViewSpec(e) {
      let { viewSpecs: t, toolbarConfig: n } = this.getCurrentData(),
        r = [].concat(
          n.header ? n.header.viewsWithButtons : [],
          n.footer ? n.footer.viewsWithButtons : [],
        ),
        i,
        a;
      for (let e in t) r.push(e);
      for (i = 0; i < r.length; i += 1)
        if (((a = t[r[i]]), a && a.singleUnit === e)) return a;
      return null;
    }
    prev() {
      (this.unselect(), this.dispatch({ type: `PREV` }));
    }
    next() {
      (this.unselect(), this.dispatch({ type: `NEXT` }));
    }
    prevYear() {
      let e = this.getCurrentData();
      (this.unselect(),
        this.dispatch({
          type: `CHANGE_DATE`,
          dateMarker: e.dateEnv.addYears(e.currentDate, -1),
        }));
    }
    nextYear() {
      let e = this.getCurrentData();
      (this.unselect(),
        this.dispatch({
          type: `CHANGE_DATE`,
          dateMarker: e.dateEnv.addYears(e.currentDate, 1),
        }));
    }
    today() {
      let e = this.getCurrentData();
      (this.unselect(),
        this.dispatch({
          type: `CHANGE_DATE`,
          dateMarker: e.nowManager.getDateMarker(),
        }));
    }
    gotoDate(e) {
      let t = this.getCurrentData();
      (this.unselect(),
        this.dispatch({
          type: `CHANGE_DATE`,
          dateMarker: t.dateEnv.createMarker(e),
        }));
    }
    incrementDate(e) {
      let t = this.getCurrentData(),
        n = k(e);
      n &&
        (this.unselect(),
        this.dispatch({
          type: `CHANGE_DATE`,
          dateMarker: t.dateEnv.add(t.currentDate, n),
        }));
    }
    getDate() {
      let e = this.getCurrentData();
      return e.dateEnv.toDate(e.currentDate);
    }
    formatDate(e, t) {
      let { dateEnv: n } = this.getCurrentData();
      return Ka(n.formatToParts(n.createMarker(e), M(t)));
    }
    formatRange(e, t, n) {
      let { dateEnv: r } = this.getCurrentData();
      return Ka(
        r.formatRangeToParts(r.createMarker(e), r.createMarker(t), M(n), n),
      );
    }
    formatIso(e, t) {
      let { dateEnv: n } = this.getCurrentData();
      return n.formatIso(n.createMarker(e), { omitTime: t });
    }
    select(e, t) {
      let n;
      n =
        t == null
          ? e.start == null
            ? { start: e, end: null }
            : e
          : { start: e, end: t };
      let r = this.getCurrentData(),
        i = Ds(n, r.dateEnv, k({ days: 1 }));
      i &&
        (this.dispatch({ type: `SELECT_DATES`, selection: i }), Ns(i, null, r));
    }
    unselect(e) {
      let t = this.getCurrentData();
      t.dateSelection && (this.dispatch({ type: `UNSELECT_DATES` }), Ps(e, t));
    }
    addEvent(e, t) {
      if (e instanceof Vs) {
        let t = e._def,
          n = e._instance;
        return (
          this.getCurrentData().eventStore.defs[t.defId] ||
            (this.dispatch({
              type: `ADD_EVENTS`,
              eventStore: is({ def: t, instance: n }),
            }),
            this.triggerEventAdd(e)),
          e
        );
      }
      let n = this.getCurrentData(),
        r;
      if (t instanceof Bs) r = t.internalEventSource;
      else if (typeof t == `boolean`) t && ([r] = ko(n.eventSources));
      else if (t != null) {
        let e = this.getEventSourceById(t);
        if (!e) return (fo(`Unknown event source ID \`${t}\`.`), null);
        r = e.internalEventSource;
      }
      let i = bs(e, r, n, !1);
      if (i) {
        let e = new Vs(n, i.def, i.def.recurringDef ? null : i.instance);
        return (
          this.dispatch({ type: `ADD_EVENTS`, eventStore: is(i) }),
          this.triggerEventAdd(e),
          e
        );
      }
      return null;
    }
    triggerEventAdd(e) {
      let { emitter: t } = this.getCurrentData();
      t.trigger(`eventAdd`, {
        event: e,
        relatedEvents: [],
        revert: () => {
          this.dispatch({ type: `REMOVE_EVENTS`, eventStore: Hs(e) });
        },
      });
    }
    getEventById(e) {
      let t = this.getCurrentData(),
        { defs: n, instances: r } = t.eventStore;
      e = String(e);
      for (let i in n) {
        let a = n[i];
        if (a.publicId === e) {
          if (a.recurringDef) return new Vs(t, a, null);
          for (let e in r) {
            let n = r[e];
            if (n.defId === a.defId) return new Vs(t, a, n);
          }
        }
      }
      return null;
    }
    getEvents() {
      let e = this.getCurrentData();
      return Us(e.eventStore, e);
    }
    removeAllEvents() {
      this.dispatch({ type: `REMOVE_ALL_EVENTS` });
    }
    getEventSources() {
      let e = this.getCurrentData(),
        t = e.eventSources,
        n = [];
      for (let r in t) n.push(new Bs(e, t[r]));
      return n;
    }
    getEventSourceById(e) {
      let t = this.getCurrentData(),
        n = t.eventSources;
      e = String(e);
      for (let r in n) if (n[r].publicId === e) return new Bs(t, n[r]);
      return null;
    }
    addEventSource(e) {
      let t = this.getCurrentData();
      if (e instanceof Bs)
        return (
          t.eventSources[e.internalEventSource.sourceId] ||
            this.dispatch({
              type: `ADD_EVENT_SOURCES`,
              sources: [e.internalEventSource],
            }),
          e
        );
      let n = Ic(e, t);
      return n
        ? (this.dispatch({ type: `ADD_EVENT_SOURCES`, sources: [n] }),
          new Bs(t, n))
        : null;
    }
    removeAllEventSources() {
      this.dispatch({ type: `REMOVE_ALL_EVENT_SOURCES` });
    }
    refetchEvents() {
      this.dispatch({ type: `FETCH_EVENT_SOURCES`, isRefetch: !0 });
    }
    scrollToTime(e) {
      let t = k(e);
      t && this.trigger(`_timeScrollRequest`, t);
    }
    getButtonState() {
      let e = this.getCurrentData(),
        { toolbarProps: t } = e,
        n = e.calendarOptions,
        r = n.buttons || {},
        i = e.viewSpecs,
        a = e.viewSpec.singleUnit,
        o = [a ? Du(a, n) : ``, a],
        s = {
          today: {
            text: n.todayText,
            hint: wo(n.todayHint, o, n.todayText),
            isDisabled: !t.isTodayEnabled,
          },
          prev: {
            text: n.prevText,
            hint: wo(n.prevHint, o, n.prevText),
            isDisabled: !t.isPrevEnabled,
          },
          next: {
            text: n.nextText,
            hint: wo(n.nextHint, o, n.nextText),
            isDisabled: !t.isNextEnabled,
          },
          prevYear: {
            text: n.prevYearText,
            hint: wo(n.prevHint, [n.yearText, `year`], n.prevYearText),
            isDisabled: !1,
          },
          nextYear: {
            text: n.prevYearText,
            hint: wo(n.nextHint, [n.yearText, `year`], n.nextYearText),
            isDisabled: !1,
          },
        };
      for (let e in i) {
        let t = i[e],
          { singleUnit: a } = t,
          o = t.optionDefaults.buttonTextKey,
          c = r[e]?.text || (o ? n[o] : ``) || (a ? Du(a, n) : ``) || e;
        s[e] = { text: c, hint: wo(n.viewHint, [c, e], c) };
      }
      return s;
    }
  };
  function Du(e, t) {
    return t[e + `TextLong`] || t[e + `Text`];
  }
  var Ou = class extends B.Component {
    constructor() {
      (super(...arguments),
        (this.state = { forPrint: !1 }),
        (this.handleBeforePrint = () => {
          (0, Ll.flushSync)(() => {
            this.setState({ forPrint: !0 });
          });
        }),
        (this.handleAfterPrint = () => {
          (0, Ll.flushSync)(() => {
            this.setState({ forPrint: !1 });
          });
        }));
    }
    render() {
      return this.props?.children(this.state.forPrint);
    }
    componentDidMount() {
      let { props: e } = this,
        { emitter: t } = e;
      (t.on(`_beforeprint`, this.handleBeforePrint),
        t.on(`_afterprint`, this.handleAfterPrint));
    }
    componentWillUnmount() {
      let { props: e } = this,
        { emitter: t } = e;
      (t.off(`_beforeprint`, this.handleBeforePrint),
        t.off(`_afterprint`, this.handleAfterPrint));
    }
  };
  function ku(e, t) {
    let n = e.borderlessX ?? e.borderless,
      r = e.borderlessTop ?? e.borderless,
      i = e.borderlessBottom ?? e.borderless,
      a = { borderlessX: !!n, borderlessTop: !!r, borderlessBottom: !!i };
    return j(
      G(e.class, a),
      G(e.className, a),
      A.borderBoxRoot,
      A.isolate,
      A.flexCol,
      t ? A.calendarPrintRoot : A.calendarScreenRoot,
    );
  }
  var Au = class extends H {
      render() {
        let { contentGenerator: e, className: t } = this.props;
        if (e)
          return (0, S.jsx)(W, {
            tag: `span`,
            style: { display: `contents` },
            attrs: { 'aria-hidden': !0 },
            renderProps: {},
            generatorName: void 0,
            customGenerator: e,
          });
        if (t !== void 0)
          return (0, S.jsx)(`span`, { 'aria-hidden': !0, className: t });
      }
    },
    ju = class extends H {
      render() {
        let { props: e } = this,
          { options: t } = this.context,
          n = e.widgetGroups.map((e) => this.renderWidgetGroup(e));
        return (0, B.createElement)(
          `div`,
          { className: G(t.toolbarSectionClass, { name: e.name }) },
          ...n,
        );
      }
      renderWidgetGroup(e) {
        let { props: t, context: n } = this,
          { options: r } = n,
          i = [],
          a = !0,
          o = !0;
        for (let t of e) {
          let { name: e, isView: n } = t;
          e === `title` ? (a = !1) : n || (o = !1);
        }
        for (let n of e) {
          let { name: s, customElement: c, buttonHint: l } = n;
          if (s === `title`)
            i.push(
              (0, S.jsx)(`div`, {
                role: `heading`,
                'aria-level': r.headingLevel,
                id: t.titleId,
                className: j(r.toolbarTitleClass),
                children: t.title,
              }),
            );
          else if (c)
            i.push(
              (0, S.jsx)(W, {
                tag: `span`,
                style: { display: `contents` },
                renderProps: {},
                generatorName: void 0,
                customGenerator: c,
              }),
            );
          else {
            let c = s === t.selectedButton,
              u =
                (!t.isTodayEnabled && s === `today`) ||
                (!t.isPrevEnabled && s === `prev`) ||
                (!t.isNextEnabled && s === `next`),
              d = n.buttonDisplay ?? r.buttonDisplay;
            d === `auto` &&
              (d = n.buttonIconContent || n.buttonIconClass ? `icon` : `text`);
            let f;
            d !== `text` &&
              (f = (0, S.jsx)(Au, {
                className: n.buttonIconClass,
                contentGenerator: n.buttonIconContent,
              }));
            let p = e.length > 1 && a,
              m = p ? { hasSelection: o } : null,
              h = {
                name: s,
                text: n.buttonText,
                isPrimary: n.buttonIsPrimary,
                isSelected: c,
                isDisabled: u,
                isIconOnly: d === `icon`,
                buttonGroup: m,
              };
            i.push(
              (0, S.jsx)(W, {
                tag: `button`,
                attrs: {
                  type: `button`,
                  disabled: u,
                  ...(a && o
                    ? { role: `tab`, 'aria-selected': c }
                    : { 'aria-pressed': c }),
                  'aria-label': typeof l == `function` ? l(t.navUnit) : l,
                  onClick: n.buttonClick,
                },
                className: j(
                  G(r.buttonClass, h),
                  !u && A.cursorPointer,
                  p && j(c ? A.z1 : A.z0, A.focusZ2),
                ),
                renderProps: h,
                generatorName: void 0,
                classNameGenerator: n.buttonClass,
                didMount: n.buttonDidMount,
                willUnmount: n.buttonWillUnmount,
                children: () =>
                  d === `text`
                    ? n.buttonText
                    : d === `icon`
                      ? f
                      : d === `icon-text`
                        ? (0, S.jsxs)(S.Fragment, {
                            children: [f, n.buttonText],
                          })
                        : (0, S.jsxs)(S.Fragment, {
                            children: [n.buttonText, f],
                          }),
              }),
            );
          }
        }
        return i.length > 1
          ? (0, B.createElement)(
              `div`,
              {
                role: a && o ? `tablist` : void 0,
                'aria-label': a && o ? r.viewChangeHint : void 0,
                className: j(
                  G(r.buttonGroupClass, { hasSelection: o }),
                  A.isolate,
                ),
              },
              ...i,
            )
          : i[0];
      }
    },
    Mu = class extends H {
      render() {
        let { props: e } = this,
          t = this.context.options,
          { sectionWidgets: n } = e.model,
          { borderlessX: r, borderlessTop: i, borderlessBottom: a } = Eo(t),
          o = e.isHeader ? t.headerToolbarClass : t.footerToolbarClass;
        return (0, S.jsxs)(`div`, {
          className: j(
            G(o, { borderlessX: r, borderlessTop: i, borderlessBottom: a }),
            G(t.toolbarClass, {
              borderlessX: r,
              borderlessTop: i,
              borderlessBottom: a,
            }),
          ),
          children: [
            this.renderSection(`start`, n.start),
            this.renderSection(`center`, n.center),
            this.renderSection(`end`, n.end),
          ],
        });
      }
      renderSection(e, t) {
        let { props: n } = this;
        return (0, S.jsx)(
          ju,
          {
            name: e,
            widgetGroups: t,
            title: n.title,
            titleId: n.titleId,
            navUnit: n.navUnit,
            selectedButton: n.selectedButton,
            isTodayEnabled: n.isTodayEnabled,
            isPrevEnabled: n.isPrevEnabled,
            isNextEnabled: n.isNextEnabled,
          },
          e,
        );
      }
    },
    Nu = class extends jl {
      constructor(e) {
        (super(e),
          (this.handleSegClick = (e, t) => {
            let { component: n } = this,
              { context: r } = n,
              i = qs(t);
            i &&
              n.isValidSegDownEl(e.target) &&
              r.emitter.trigger(`eventClick`, {
                el: t,
                event: new Vs(n.context, i.def, i.instance),
                jsEvent: e,
                view: r.viewApi,
              });
          }),
          (this.destroy = _o(
            e.el,
            `click`,
            `.${A.internalEvent}`,
            this.handleSegClick,
          )));
      }
    },
    Pu = class extends jl {
      constructor(e) {
        (super(e),
          (this.handleEventElRemove = (e) => {
            e === this.currentSegEl &&
              this.handleSegLeave(null, this.currentSegEl);
          }),
          (this.handleSegEnter = (e, t) => {
            qs(t) &&
              ((this.currentSegEl = t),
              this.triggerEvent(`eventMouseEnter`, e, t));
          }),
          (this.handleSegLeave = (e, t) => {
            this.currentSegEl &&
              ((this.currentSegEl = null),
              this.triggerEvent(`eventMouseLeave`, e, t));
          }),
          (this.removeHoverListeners = vo(
            e.el,
            `.${A.internalEvent}`,
            this.handleSegEnter,
            this.handleSegLeave,
          )));
      }
      destroy() {
        this.removeHoverListeners();
      }
      triggerEvent(e, t, n) {
        let { component: r } = this,
          { context: i } = r,
          a = qs(n);
        (!t || r.isValidSegDownEl(t.target)) &&
          i.emitter.trigger(e, {
            el: n,
            event: new Vs(i, a.def, a.instance),
            jsEvent: t,
            view: i.viewApi,
          });
      }
    },
    Fu = class extends il {
      constructor() {
        (super(...arguments),
          (this.buildViewContext = V(rl)),
          (this.buildViewPropTransformers = V(Iu)),
          (this.interactionsStore = {}),
          (this.calendarInteractions = []),
          (this.registerInteractiveComponent = (e, t) => {
            let n = Ml(e, t),
              r = [Nu, Pu];
            t.disableHits ||
              (r = r.concat(this.props.pluginHooks.componentInteractions));
            let i = r.map((e) => new e(n));
            ((this.interactionsStore[e.uid] = i), (Nl[e.uid] = n));
          }),
          (this.unregisterInteractiveComponent = (e) => {
            let t = this.interactionsStore[e.uid];
            if (t) {
              for (let e of t) e.destroy();
              delete this.interactionsStore[e.uid];
            }
            delete Nl[e.uid];
          }));
      }
      get viewTitleId() {
        return this.props.baseId + `title`;
      }
      render() {
        let { props: e } = this,
          { toolbarConfig: t, options: n } = e,
          r,
          i = !1,
          a;
        e.forPrint ||
          pl(n) ||
          (n.height == null
            ? n.contentHeight == null
              ? (a = Math.max(n.aspectRatio, 0.5))
              : (r = n.contentHeight)
            : (i = !0));
        let o = this.buildViewContext(
          e.viewSpec,
          e.viewApi,
          e.options,
          e.dateProfileGenerator,
          e.dateEnv,
          e.nowManager,
          e.pluginHooks,
          e.dispatch,
          e.getCurrentData,
          e.emitter,
          e.calendarApi,
          e.baseId,
          this.registerInteractiveComponent,
          this.unregisterInteractiveComponent,
        );
        return (0, S.jsxs)(nl.Provider, {
          value: o,
          children: [
            t.header &&
              (0, S.jsx)(Mu, {
                model: t.header,
                isHeader: !0,
                titleId: this.viewTitleId,
                ...e.toolbarProps,
              }),
            (0, S.jsxs)(`div`, {
              className: j(
                A.flexCol,
                A.rel,
                A.overflowAnchorNone,
                A.minHeight0,
                i && A.liquid,
              ),
              style: { height: r, aspectRatio: a == null ? void 0 : String(a) },
              children: [
                this.renderView(
                  j((i || r) && A.liquid, a != null && A.fill, A.internalView),
                ),
                this.buildAppendContent(),
              ],
            }),
            t.footer &&
              (0, S.jsx)(Mu, {
                model: t.footer,
                isHeader: !1,
                ...e.toolbarProps,
              }),
          ],
        });
      }
      renderView(e) {
        let { props: t } = this,
          {
            pluginHooks: n,
            viewSpec: r,
            toolbarConfig: i,
            toolbarProps: a,
          } = t,
          o = {
            className: e,
            dateProfile: t.dateProfile,
            businessHours: t.businessHours,
            eventStore: t.renderableEventStore,
            eventUiBases: t.eventUiBases,
            dateSelection: t.dateSelection,
            eventSelection: t.eventSelection,
            eventDrag: t.eventDrag,
            eventResize: t.eventResize,
            forPrint: t.forPrint,
            labelId: i.header && i.header.hasTitle ? this.viewTitleId : void 0,
            labelStr: i.header && i.header.hasTitle ? void 0 : a.title,
          },
          s = this.buildViewPropTransformers(n.viewPropsTransformers),
          c = { ...t, toolbarProps: a, forPrint: t.forPrint };
        for (let e of s) Object.assign(o, e.transform(o, c));
        let l = r.component;
        return (0, S.jsx)(l, { ...o });
      }
      buildAppendContent() {
        let { props: e } = this;
        return (0, S.jsx)(S.Fragment, {
          children: e.pluginHooks.viewContainerAppends.map((t, n) =>
            (0, S.jsx)(B.Fragment, { children: t(e) }, n),
          ),
        });
      }
      componentDidMount() {
        let { props: e } = this;
        this.calendarInteractions = e.pluginHooks.calendarInteractions.map(
          (t) => new t(e),
        );
        let { propSetHandlers: t } = e.pluginHooks;
        for (let n in t) t[n](e[n], e);
        for (let t of e.pluginHooks.contextInit) t(e);
      }
      componentDidUpdate(e) {
        let { props: t } = this,
          { propSetHandlers: n } = t.pluginHooks;
        for (let r in n) t[r] !== e[r] && n[r](t[r], t);
      }
      componentWillUnmount() {
        let { props: e } = this;
        for (let e of this.calendarInteractions) e.destroy();
        ((this.calendarInteractions = []), e.emitter.trigger(`_unmount`));
      }
    };
  function Iu(e) {
    return e.map((e) => new e());
  }
  var Lu = (0, B.forwardRef)((e, t) => {
    let n = Vu(e.id),
      [r, i] = (0, B.useState)(``);
    function a(e, t) {
      (Ru(t) ? Ll.flushSync : zu)(() => {
        i(I());
      });
    }
    let [o] = (0, B.useState)(() => new Eu()),
      [s] = (0, B.useState)(() => new mu({ calendarApi: o, onDataChange: a }));
    ((0, B.useEffect)(
      () => () => {
        s.destroy();
      },
      [],
    ),
      (0, B.useImperativeHandle)(t, () => ({ getApi: () => o }), []));
    let c = s.update(e);
    return (0, S.jsx)(Ou, {
      emitter: c.emitter,
      children: (e) => {
        let t = c.calendarOptions,
          r = t.direction === `rtl`,
          i = ku(t, e);
        return (0, S.jsx)(`div`, {
          dir: r ? `rtl` : void 0,
          className: i,
          style: { height: t.height },
          'data-color-scheme': t.colorScheme || void 0,
          children: (0, S.jsx)(Fu, { ...c, baseId: n, forPrint: e }),
        });
      },
    });
  });
  function Ru(e) {
    for (let t of e)
      if (
        t.type === `SET_EVENT_DRAG` ||
        t.type === `UNSET_EVENT_DRAG` ||
        t.type === `SET_EVENT_RESIZE` ||
        t.type === `UNSET_EVENT_RESIZE` ||
        t.type === `MERGE_EVENTS`
      )
        return !0;
    return !1;
  }
  function zu(e) {
    e();
  }
  var Bu = !1;
  function Vu(e) {
    if (B.useId) return B.useId();
    let [t] = (0, B.useState)(() => I());
    return e
      ? e + `:`
      : (Bu ||
          ((Bu = !0),
          fo(
            'Missing `id` prop. Provide one for better SSR support in React 17.',
          )),
        `fc:${t}:`);
  }
  var Hu = `text-[0.6875rem]/[1.090909]`,
    Uu = `size-5`,
    Wu = `outline-2`,
    Z = `focus-visible:outline-2`,
    Gu = `outline-offset-2`,
    Ku = `-outline-offset-2`,
    qu = `outline-(--fc-classic-primary)`,
    Ju = `[background:linear-gradient(var(--fc-classic-strong),var(--fc-classic-strong))_var(--fc-classic-background)]`,
    Yu = `hover:bg-(--fc-classic-muted) hover:cursor-pointer`,
    Xu = `${Yu} focus-visible:bg-(--fc-classic-muted) active:bg-(--fc-classic-strong)`,
    Zu = `hover:bg-(--fc-classic-faint)`,
    Qu = `${Zu} focus-visible:bg-(--fc-classic-faint) active:bg-(--fc-classic-muted)`,
    $u = `absolute hidden group-hover:block`,
    ed = `${$u} inset-y-0 w-2`,
    td = `${$u} inset-x-0 h-2`,
    nd = `absolute size-2 border border-(--fc-event-color) bg-(--fc-classic-background) rounded-full`,
    rd = `${nd} top-1/2 -mt-1`,
    id = `${nd} left-1/2 -ml-1`,
    ad = (e) =>
      j(
        `border`,
        e.isMajor
          ? `border-(--fc-classic-strong-border)`
          : `border-(--fc-classic-border)`,
        e.isDisabled
          ? `bg-(--fc-classic-faint)`
          : e.isToday && `not-print:bg-(--fc-classic-today)`,
      ),
    od = (e) =>
      j(`border border-(--fc-classic-border)`, e.isMinor && `border-dotted`),
    sd = {
      listItemEventClass: (e) =>
        j(
          `mb-px p-px rounded-sm`,
          e.isNarrow ? `mx-px` : `mx-0.5`,
          e.isSelected
            ? j(`bg-(--fc-classic-muted)`, e.isDragging && `shadow-sm`)
            : e.isInteractive
              ? Xu
              : Yu,
        ),
      listItemEventBeforeClass: (e) =>
        j(
          `border-[calc(var(--fc-classic-small-dot-width)/2)]`,
          e.isNarrow ? `mx-px` : `mx-1`,
        ),
      listItemEventInnerClass: (e) =>
        j(
          `flex flex-row items-center py-px gap-0.5 `,
          e.isNarrow ? Hu : `text-xs`,
        ),
      listItemEventTimeClass: `px-px whitespace-nowrap overflow-hidden shrink-1`,
      listItemEventTitleClass: `px-px font-bold whitespace-nowrap overflow-hidden shrink-100`,
      rowEventClass: (e) =>
        j(
          e.isStart && j(`rounded-s-sm`, e.isNarrow ? `ms-px` : `ms-0.5`),
          e.isEnd && j(`rounded-e-sm`, e.isNarrow ? `me-px` : `me-0.5`),
        ),
      rowEventInnerClass: `py-px gap-0.5`,
      rowEventTimeClass: `px-px`,
      rowEventTitleClass: `px-px`,
      rowMoreLinkClass: (e) =>
        j(
          `mb-px border rounded-sm`,
          e.isNarrow
            ? `mx-px border-(--fc-classic-primary)`
            : `self-start mx-0.5 border-transparent`,
          Xu,
        ),
      rowMoreLinkInnerClass: (e) => j(`p-px`, e.isNarrow ? Hu : `text-xs`),
    };
  function cd(e) {
    let t = (0, b.c)(34),
      n,
      r,
      i,
      a,
      o;
    t[0] === e
      ? ((n = t[1]), (r = t[2]), (i = t[3]), (a = t[4]), (o = t[5]))
      : (({ availableViews: r, addButton: n, buttons: a, views: o, ...i } = e),
        (t[0] = e),
        (t[1] = n),
        (t[2] = r),
        (t[3] = i),
        (t[4] = a),
        (t[5] = o));
    let s = r[0],
      c = (n ? `add ` : ``) + `today prev,next`,
      l;
    t[6] === r ? (l = t[7]) : ((l = r.join(`,`)), (t[6] = r), (t[7] = l));
    let u;
    t[8] !== c || t[9] !== l
      ? ((u = { start: c, center: `title`, end: l }),
        (t[8] = c),
        (t[9] = l),
        (t[10] = u))
      : (u = t[10]);
    let d, f, p, m;
    t[11] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((d = { iconContent: zd }),
        (f = { iconContent: Rd }),
        (p = { iconContent: Ld }),
        (m = { iconContent: Id }),
        (t[11] = d),
        (t[12] = f),
        (t[13] = p),
        (t[14] = m))
      : ((d = t[11]), (f = t[12]), (p = t[13]), (m = t[14]));
    let h;
    t[15] === n ? (h = t[16]) : ((h = n || {}), (t[15] = n), (t[16] = h));
    let g;
    t[17] !== h || t[18] !== a
      ? ((g = { prev: d, next: f, prevYear: p, nextYear: m, ...a, add: h }),
        (t[17] = h),
        (t[18] = a),
        (t[19] = g))
      : (g = t[19]);
    let _ = o?.dayGrid,
      v;
    t[20] === _
      ? (v = t[21])
      : ((v = { ...sd, dayCellBottomClass: `min-h-px`, ..._ }),
        (t[20] = _),
        (t[21] = v));
    let y = o?.list,
      x;
    t[22] === y
      ? (x = t[23])
      : ((x = {
          listDayClass: fd,
          listItemEventClass: dd,
          listItemEventBeforeClass: `border-[calc(var(--fc-classic-large-dot-width)/2)]`,
          listItemEventInnerClass: ud,
          listItemEventTimeClass: `-order-1 shrink-0 w-1/2 max-w-50 whitespace-nowrap overflow-hidden text-ellipsis text-sm`,
          listItemEventTitleClass: ld,
          noEventsClass: `bg-(--fc-classic-muted) flex flex-col items-center justify-center`,
          noEventsInnerClass: `sticky bottom-0 py-15`,
          ...y,
        }),
        (t[22] = y),
        (t[23] = x));
    let ee;
    t[24] !== v || t[25] !== x || t[26] !== o
      ? ((ee = { ...o, dayGrid: v, list: x }),
        (t[24] = v),
        (t[25] = x),
        (t[26] = o),
        (t[27] = ee))
      : (ee = t[27]);
    let C;
    return (
      t[28] !== r[0] ||
      t[29] !== i ||
      t[30] !== g ||
      t[31] !== ee ||
      t[32] !== u
        ? ((C = (0, S.jsx)(Lu, {
            initialView: s,
            className: `gap-5`,
            viewClass: Hd,
            headerToolbar: u,
            toolbarClass: Vd,
            toolbarSectionClass: `shrink-0 flex flex-row items-center gap-3`,
            toolbarTitleClass: `text-2xl font-bold`,
            buttonGroupClass: `flex flex-row items-center`,
            buttonClass: Bd,
            buttons: g,
            eventColor: `var(--fc-classic-event)`,
            eventContrastColor: `var(--fc-classic-event-contrast)`,
            eventClass: Fd,
            backgroundEventColor: `var(--fc-classic-background-event)`,
            backgroundEventClass: `not-print:bg-[color-mix(in_oklab,var(--fc-event-color)_var(--fc-classic-background-event-opacity),transparent)] print:border-1 print:border-(--fc-event-color)`,
            backgroundEventTitleClass: Pd,
            listItemEventClass: `items-center bg-(--fc-classic-primary) text-white`,
            listItemEventBeforeClass: `border-(--fc-event-color) rounded-full`,
            blockEventClass: Nd,
            blockEventInnerClass: `text-(--fc-event-contrast-color) print:text-black`,
            blockEventTimeClass: `whitespace-nowrap overflow-hidden shrink-1`,
            blockEventTitleClass: `whitespace-nowrap overflow-hidden shrink-100`,
            rowEventClass: $,
            rowEventBeforeClass: Md,
            rowEventAfterClass: jd,
            rowEventInnerClass: Ad,
            rowEventTimeClass: `font-bold`,
            columnEventClass: kd,
            columnEventBeforeClass: Od,
            columnEventAfterClass: Dd,
            columnEventInnerClass: Ed,
            columnEventTimeClass: Td,
            columnEventTitleClass: wd,
            moreLinkClass: `${Z} ${qu}`,
            moreLinkInnerClass: `whitespace-nowrap overflow-hidden`,
            columnMoreLinkClass: `mb-px rounded-sm border border-transparent print:border-black ${Ju} print:bg-white ring ring-(--fc-classic-background) ${Gu}`,
            columnMoreLinkInnerClass: Cd,
            dayHeaderAlign: Sd,
            dayHeaderClass: xd,
            dayHeaderInnerClass: bd,
            dayHeaderDividerClass: `border-b border-(--fc-classic-border)`,
            dayCellClass: ad,
            dayCellTopClass: Q,
            dayCellTopInnerClass: yd,
            dayCellInnerClass: vd,
            popoverClass: `bg-(--fc-classic-background) text-(--fc-classic-foreground) border border-(--fc-classic-border) shadow-md min-w-55`,
            popoverCloseClass: `group absolute top-0.5 end-0.5 ${Z} ${qu}`,
            popoverCloseContent: _d,
            dayLaneClass: ad,
            dayLaneInnerClass: gd,
            slotLaneClass: od,
            listDayHeaderClass: `border-b border-(--fc-classic-border) bg-(--fc-classic-list-header) -mb-px flex flex-row items-center justify-between text-(--fc-classic-primary)`,
            listDayHeaderInnerClass: `px-3 py-2 text-sm font-bold`,
            singleMonthClass: hd,
            singleMonthHeaderClass: md,
            singleMonthHeaderInnerClass: `text-base font-bold`,
            tableHeaderClass: `bg-(--fc-classic-background)`,
            fillerClass: `border border-(--fc-classic-border) opacity-50`,
            dayHeaderRowClass: `border border-(--fc-classic-border)`,
            dayRowClass: `border border-(--fc-classic-border)`,
            slotHeaderRowClass: `border border-(--fc-classic-border)`,
            slotHeaderClass: od,
            navLinkClass: `hover:underline ${Z} ${Ku} ${qu}`,
            inlineWeekNumberClass: pd,
            nonBusinessHoursClass: `bg-(--fc-classic-faint)`,
            highlightClass: `bg-(--fc-classic-highlight)`,
            views: ee,
            ...i,
          })),
          (t[28] = r[0]),
          (t[29] = i),
          (t[30] = g),
          (t[31] = ee),
          (t[32] = u),
          (t[33] = C))
        : (C = t[33]),
      C
    );
  }
  function ld(e) {
    return j(
      `grow min-w-0 whitespace-nowrap overflow-hidden text-sm`,
      e.event.url && `group-hover:underline`,
    );
  }
  function ud() {
    return j(`text-black [display:contents]`);
  }
  function dd(e) {
    return j(
      `group px-3 py-2 gap-3 border-t border-(--fc-classic-border) bg-transparent`,
      e.isInteractive ? j(Qu, Ku) : Zu,
    );
  }
  function fd(e) {
    return j(
      `flex flex-col`,
      !e.isLast && `border-b border-(--fc-classic-border)`,
    );
  }
  function pd(e) {
    return j(
      `absolute top-0 start-0 rounded-ee-sm p-0.5 text-center text-(--fc-classic-muted-foreground) bg-(--fc-classic-muted)`,
      e.isNarrow ? Hu : `text-sm`,
    );
  }
  function md(e) {
    return j(
      e.multiMonthColumns > 1
        ? `pb-4`
        : `py-2 border-b border-(--fc-classic-border) bg-(--fc-classic-background)`,
      `items-center`,
    );
  }
  function hd(e) {
    return j(
      e.multiMonthColumns > 1 && `m-4`,
      e.multiMonthColumns === 1 &&
        !e.isLast &&
        `border-b border-(--fc-classic-border)`,
    );
  }
  function gd(e) {
    return j(e.isStack ? `m-1` : e.isNarrow ? `mx-px` : `ms-0.5 me-[2.5%]`);
  }
  function _d() {
    return Gd(`size-5 text-sm not-group-hover:opacity-65`);
  }
  function vd(e) {
    return j(e.inPopover && `p-2`);
  }
  function yd(e) {
    return j(
      `mx-1 whitespace-nowrap`,
      e.isNarrow ? `my-0.5 ${Hu}` : `my-1 text-sm`,
      e.isOther && `text-(--fc-classic-faint-foreground)`,
      e.monthText && `font-bold`,
    );
  }
  function Q(e) {
    return j(
      e.isNarrow ? `min-h-px` : `min-h-0.5`,
      `flex flex-row justify-end`,
    );
  }
  function bd(e) {
    return j(`mx-1 my-0.5 flex flex-col`, e.isNarrow ? Hu : `text-sm`);
  }
  function xd(e) {
    return j(
      `justify-center`,
      e.isDisabled && `bg-(--fc-classic-faint)`,
      e.inPopover
        ? `border-b border-(--fc-classic-border) bg-(--fc-classic-muted)`
        : j(
            `border`,
            e.isMajor
              ? `border-(--fc-classic-strong-border)`
              : `border-(--fc-classic-border)`,
          ),
    );
  }
  function Sd(e) {
    return e.inPopover ? `start` : `center`;
  }
  function Cd(e) {
    return j(`p-0.5`, e.isNarrow ? Hu : `text-xs`);
  }
  function wd(e) {
    return j(!e.isShort && `py-0.5`, e.isShort || e.isNarrow ? Hu : `text-xs`);
  }
  function Td(e) {
    return j(!e.isShort && `pt-0.5`, Hu);
  }
  function Ed(e) {
    return j(
      `flex`,
      e.isShort ? `p-0.5 flex-row items-center gap-1` : `px-0.5 flex-col`,
    );
  }
  function Dd(e) {
    return j(e.isEndResizable && j(e.isSelected ? id : td, `-bottom-1`));
  }
  function Od(e) {
    return j(e.isStartResizable && j(e.isSelected ? id : td, `-top-1`));
  }
  function kd(e) {
    return j(
      `border-x ring ring-(--fc-classic-background)`,
      e.isStart && `border-t rounded-t-sm`,
      e.isEnd && `mb-px border-b rounded-b-sm`,
    );
  }
  function Ad(e) {
    return j(`flex flex-row items-center`, e.isNarrow ? Hu : `text-xs`);
  }
  function jd(e) {
    return j(e.isEndResizable && j(e.isSelected ? rd : ed, `-end-1`));
  }
  function Md(e) {
    return j(e.isStartResizable && j(e.isSelected ? rd : ed, `-start-1`));
  }
  function $(e) {
    return j(`mb-px border-y`, e.isStart && `border-s`, e.isEnd && `border-e`);
  }
  function Nd(e) {
    return j(
      `group relative border-transparent print:border-(--fc-event-color) bg-(--fc-event-color) print:bg-white`,
      e.isDragging && !e.isSelected && `opacity-75`,
      Gu,
    );
  }
  function Pd(e) {
    return j(
      `opacity-(--fc-classic-background-event-foreground-opacity) italic`,
      e.isNarrow ? `p-0.5 ${Hu}` : `p-1.5 text-xs`,
    );
  }
  function Fd(e) {
    return j(
      e.isDragging && ``,
      e.event.url && ``,
      e.isSelected ? j(Wu, e.isDragging ? `shadow-lg` : `shadow-md`) : Z,
      qu,
    );
  }
  function Id() {
    return Wd(`${Uu} rotate-180 [[dir=rtl]_&]:rotate-0`);
  }
  function Ld() {
    return Wd(`${Uu} [[dir=rtl]_&]:rotate-180`);
  }
  function Rd() {
    return Ud(`${Uu} rotate-180 [[dir=rtl]_&]:rotate-0`);
  }
  function zd() {
    return Ud(`${Uu} [[dir=rtl]_&]:rotate-180`);
  }
  function Bd(e) {
    return j(
      `py-2 border-x flex flex-row items-center focus-visible:outline-3 outline-(--fc-classic-button-outline) print:bg-white text-sm text-(--fc-classic-button-foreground) print:text-black`,
      e.isIconOnly ? `px-2.5` : `px-3`,
      e.buttonGroup
        ? `first:rounded-s-[4px] last:rounded-e-[4px]`
        : `rounded-[4px]`,
      e.isSelected
        ? `border-(--fc-classic-button-strong-border) bg-(--fc-classic-button-strong)`
        : `border-(--fc-classic-button-border) hover:border-(--fc-classic-button-strong-border) active:border-(--fc-classic-button-strong-border) print:border-(--fc-classic-button-strong-border) bg-(--fc-classic-button) hover:bg-(--fc-classic-button-strong) active:bg-(--fc-classic-button-strong)`,
      e.isDisabled && `opacity-65 pointer-events-none`,
    );
  }
  function Vd(e) {
    return j(
      `flex flex-row flex-wrap items-center justify-between gap-3`,
      e.borderlessX && `px-3`,
    );
  }
  function Hd(e) {
    let t = e.options.headerToolbar || !e.borderlessTop,
      n = e.options.footerToolbar || !e.borderlessBottom,
      r = !e.borderlessX;
    return j(
      `bg-(--fc-classic-background) text-(--fc-classic-foreground) border-(--fc-classic-border)`,
      t && `border-t`,
      n && `border-b`,
      r && `border-x`,
    );
  }
  function Ud(e) {
    return (0, S.jsx)(`svg`, {
      xmlns: `http://www.w3.org/2000/svg`,
      className: e,
      width: `20`,
      height: `20`,
      viewBox: `0 0 24 24`,
      fill: `none`,
      stroke: `currentColor`,
      strokeWidth: `2`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      children: (0, S.jsx)(`polyline`, { points: `15 18 9 12 15 6` }),
    });
  }
  function Wd(e) {
    return (0, S.jsxs)(`svg`, {
      xmlns: `http://www.w3.org/2000/svg`,
      className: e,
      width: `20`,
      height: `20`,
      viewBox: `0 0 24 24`,
      fill: `none`,
      stroke: `currentColor`,
      strokeWidth: `2`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      children: [
        (0, S.jsx)(`polyline`, { points: `11 17 6 12 11 7` }),
        (0, S.jsx)(`polyline`, { points: `18 17 13 12 18 7` }),
      ],
    });
  }
  function Gd(e) {
    return (0, S.jsxs)(`svg`, {
      xmlns: `http://www.w3.org/2000/svg`,
      className: e,
      width: `20`,
      height: `20`,
      viewBox: `0 0 24 24`,
      fill: `none`,
      stroke: `currentColor`,
      strokeWidth: `2`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      children: [
        (0, S.jsx)(`line`, { x1: `18`, y1: `6`, x2: `6`, y2: `18` }),
        (0, S.jsx)(`line`, { x1: `6`, y1: `6`, x2: `18`, y2: `18` }),
      ],
    });
  }
  function Kd(e) {
    let t = e.getRootNode();
    return t instanceof Document ? t.body || t.documentElement : t;
  }
  function qd(e) {
    return getComputedStyle(e).direction === `rtl`;
  }
  var Jd = /(top|left|right|bottom|width|height)$/i;
  function Yd(e, t) {
    for (let n in t) Xd(e, n, t[n]);
  }
  function Xd(e, t, n) {
    n == null
      ? (e.style[t] = ``)
      : typeof n == `number` && Jd.test(t)
        ? (e.style[t] = `${n}px`)
        : (e.style[t] = n);
  }
  function Zd(e) {
    return e.composedPath?.()[0] ?? e.target;
  }
  var Qd = class extends B.Component {
    constructor(e, t) {
      (super(e, t),
        (this.handleChange = () => {
          this.forceUpdate();
        }),
        (this.runner = new _l(this.handleChange)));
    }
    render() {
      let { props: e, context: t } = this,
        { nowDate: n, todayRange: r } = this.runner.update({
          nowManager: t.nowManager,
          unit: e.unit,
          unitValue: e.unitValue,
          nowIndicatorSnap: t.options.nowIndicatorSnap,
          dateEnv: t.dateEnv,
        });
      return e.children(n, r);
    }
    componentWillUnmount() {
      this.runner.destroy();
    }
  };
  Qd.contextType = nl;
  var $d = M({ year: `numeric`, month: `long`, day: `numeric` }),
    ef = M({ week: `long` }),
    tf = M({ weekday: `long` });
  function nf(e) {
    for (let t of e) if (t.type === `weekday`) return t.value;
    return ``;
  }
  function rf(e) {
    for (let t of e) if (t.type === `day`) return t.value;
    return ``;
  }
  function af(e) {
    for (let t of e) if (t.type === `month`) return t.value;
    return ``;
  }
  function of(e, t, n = `day`) {
    return Ka(e.dateEnv.formatToParts(t, n === `week` ? ef : $d));
  }
  function sf(e, t, n = `day`, r = of(e, t, n), i = !0) {
    let { dateEnv: a, options: o, calendarApi: s } = e,
      c = a.toDate(t),
      l = (e) => {
        let r =
          n === `day`
            ? o.navLinkDayClick
            : n === `week`
              ? o.navLinkWeekClick
              : null;
        typeof r == `function`
          ? r.call(s, a.toDate(t), e)
          : (typeof r == `string` && (n = r), s.zoomTo(t, n));
      };
    return {
      role: `link`,
      'aria-label': wo(o.navLinkHint, [r, c], r),
      className: j(o.navLinkClass, A.cursorPointer, A.internalNavLink),
      ...(i ? yo(l) : { onClick: l }),
    };
  }
  function cf(e, t, n, r, i) {
    let a = !(!n || (n.activeRange && Da(n.activeRange, e)));
    return {
      date: t.toDate(e),
      dow: e.getUTCDay(),
      isDisabled: a,
      isOther: !a && !(!n || Da(n.currentRange, e)),
      isToday: !a && !!(r && Da(r, e)),
      isPast: !a && !!(i ? e < i : r && e < r.start),
      isFuture: !a && !!(i ? e > i : r && e >= r.end),
    };
  }
  function lf(e, t) {
    return e != null && (e === t || Math.abs(e - t) < 0.01);
  }
  var uf = !0,
    df = new Map(),
    ff = new Set(),
    pf = !1,
    mf = !1;
  function hf(e) {
    (ff.add(e),
      !pf &&
        !mf &&
        ((mf = !0),
        requestAnimationFrame(() => {
          ((mf = !1), gf());
        })));
  }
  function gf() {
    for (let e of ff.values()) (e(), ff.delete(e));
  }
  var _f =
    typeof ResizeObserver < `u` &&
    new ResizeObserver((e) => {
      pf = !0;
      for (let t of e) {
        let e = t.target,
          n = df.get(e),
          r,
          i;
        if (t.borderBoxSize && uf) {
          let e = t.borderBoxSize[0] || t.borderBoxSize;
          ((r = e.inlineSize), (i = e.blockSize));
        } else ({ width: r, height: i } = e.getBoundingClientRect());
        let a = !1;
        (lf(n.width, r) || ((n.width = r), (a = n.watchWidth)),
          lf(n.height, i) || ((n.height = i), (a ||= n.watchHeight)),
          a && n.callback(r, i));
      }
      (0, Ll.flushSync)(() => {
        (gf(), (pf = !1));
      });
    });
  function vf(e, t, n = !0, r = !0) {
    return (
      df.set(e, { callback: t, watchWidth: n, watchHeight: r }),
      _f && _f.observe(e, { box: `border-box` }),
      () => {
        (df.delete(e), _f && _f.unobserve(e));
      }
    );
  }
  function yf(e, t) {
    return vf(e, t, !0);
  }
  function bf(e, t) {
    return vf(e, (e, n) => t(n), !1, !0);
  }
  var xf = class extends H {
    constructor() {
      (super(...arguments), (this.refineRenderProps = tl(Sf)));
    }
    render() {
      let { props: e, context: t } = this,
        { options: n, viewSpec: r } = t,
        i = this.refineRenderProps({
          ...Eo(n),
          options: {
            headerToolbar: n.headerToolbar,
            footerToolbar: n.footerToolbar,
          },
          isHeightAuto: pl(n),
          viewApi: t.viewApi,
        });
      return (0, S.jsx)(W, {
        elRef: e.elRef,
        tag: e.tag || `div`,
        attrs: e.attrs,
        style: e.style,
        className: j(
          e.className,
          G(n.viewClass, i),
          G(r.optionDefaults.class, i),
          G(r.optionDefaults.className, i),
          G(r.optionOverrides.class, i),
          G(r.optionOverrides.className, i),
        ),
        renderProps: i,
        generatorName: void 0,
        didMount: n.didMount || n.viewDidMount,
        willUnmount: n.willUnmount || n.viewWillUnmount,
        children: () => e.children,
      });
    }
  };
  function Sf(e) {
    return {
      view: e.viewApi,
      borderlessX: e.borderlessX,
      borderlessTop: e.borderlessTop,
      borderlessBottom: e.borderlessBottom,
      options: e.options,
      isHeightAuto: e.isHeightAuto,
    };
  }
  var Cf = class extends H {
      constructor() {
        (super(...arguments), (this.uid = I()));
      }
      prepareHits() {}
      queryHit(e, t, n, r, i) {
        return null;
      }
      isValidSegDownEl(e) {
        return (
          !this.props.eventDrag &&
          !this.props.eventResize &&
          !e.closest(`.${A.internalEventMirror}`)
        );
      }
      isValidDateDownEl(e) {
        return (
          !e.closest(`.${A.internalEvent}:not(.${A.internalBgEvent})`) &&
          !e.closest(`.${A.internalMoreLink}`) &&
          !e.closest(`.${A.internalNavLink}`) &&
          !e.closest(`.${A.internalPopover}`)
        );
      }
    },
    wf = class {
      constructor(e) {
        ((this.drainedOption = e),
          (this.isRunning = !1),
          (this.isDirty = !1),
          (this.pauseDepths = {}),
          (this.timeoutId = 0));
      }
      request(e) {
        ((this.isDirty = !0),
          this.isPaused() ||
            (this.clearTimeout(),
            e == null
              ? this.tryDrain()
              : (this.timeoutId = setTimeout(this.tryDrain.bind(this), e))));
      }
      pause(e = ``) {
        let { pauseDepths: t } = this;
        ((t[e] = (t[e] || 0) + 1), this.clearTimeout());
      }
      resume(e = ``, t) {
        let { pauseDepths: n } = this;
        e in n &&
          (t ? delete n[e] : (--n[e], n[e] <= 0 && delete n[e]),
          this.tryDrain());
      }
      isPaused() {
        return Object.keys(this.pauseDepths).length;
      }
      tryDrain() {
        if (!this.isRunning && !this.isPaused()) {
          for (this.isRunning = !0; this.isDirty; )
            ((this.isDirty = !1), this.drained());
          this.isRunning = !1;
        }
      }
      clear() {
        (this.clearTimeout(), (this.isDirty = !1), (this.pauseDepths = {}));
      }
      clearTimeout() {
        this.timeoutId &&= (clearTimeout(this.timeoutId), 0);
      }
      drained() {
        this.drainedOption && this.drainedOption();
      }
    },
    Tf = class {
      constructor(e) {
        ((this.el = e),
          (this.emitter = new Pl()),
          (this.isScroll = !1),
          (this.isScrollRecent = !1),
          (this.isWheelRecent = !1),
          (this.isMouseDown = !1),
          (this.isTouchDown = !1),
          (this.isMouse = !1),
          (this.isTouch = !1),
          (this.isWheel = !1),
          (this.handleScroll = () => {
            ((this.isScrollRecent = !0),
              this.isMouseDown && (this.isMouse = !0),
              this.isTouchDown && (this.isTouch = !0),
              this.isWheelRecent && (this.isWheel = !0),
              this.startScroll(),
              this.emitter.trigger(`scroll`, this.getIsDevice()),
              this.scrollWaiter.request(500));
          }),
          (this.handleScrollWait = () => {
            ((this.isScrollRecent = !1), this.isTouchDown || this.endScroll());
          }),
          (this.handleWheel = () => {
            ((this.isWheelRecent = !0), this.wheelWaiter.request(500));
          }),
          (this.handleWheelWait = () => {
            this.isWheelRecent = !1;
          }),
          (this.handleMouseDown = () => {
            this.isMouseDown = !0;
          }),
          (this.handleMouseUp = () => {
            this.isMouseDown = !1;
          }),
          (this.handleTouchStart = () => {
            this.isTouchDown = !0;
          }),
          (this.handleTouchEnd = () => {
            ((this.isTouchDown = !1), this.isScrollRecent || this.endScroll());
          }),
          (this.wheelWaiter = new wf(this.handleWheelWait)),
          (this.scrollWaiter = new wf(this.handleScrollWait)),
          e.addEventListener(`scroll`, this.handleScroll, { passive: !0 }),
          e.addEventListener(`wheel`, this.handleWheel, { passive: !0 }),
          e.addEventListener(`mousedown`, this.handleMouseDown),
          e.addEventListener(`mouseup`, this.handleMouseUp),
          e.addEventListener(`touchstart`, this.handleTouchStart, {
            passive: !0,
          }),
          e.addEventListener(`touchend`, this.handleTouchEnd));
      }
      destroy() {
        let { el: e } = this;
        (e.removeEventListener(`scroll`, this.handleScroll, { passive: !0 }),
          e.removeEventListener(`wheel`, this.handleWheel, { passive: !0 }),
          e.removeEventListener(`mousedown`, this.handleMouseDown),
          e.removeEventListener(`mouseup`, this.handleMouseUp),
          e.removeEventListener(`touchstart`, this.handleTouchStart, {
            passive: !0,
          }),
          e.removeEventListener(`touchend`, this.handleTouchEnd));
      }
      startScroll() {
        this.isScroll ||
          ((this.isScroll = !0),
          this.emitter.trigger(`scrollStart`, this.getIsDevice()));
      }
      endScroll() {
        this.isScroll &&
          (this.scrollWaiter.clear(),
          this.wheelWaiter.clear(),
          (this.isScroll = !1),
          (this.isWheelRecent = !1),
          this.emitter.trigger(`scrollEnd`, this.getIsDevice()),
          (this.isMouse = !1),
          (this.isTouch = !1),
          (this.isWheel = !1));
      }
      getIsDevice() {
        return this.isWheel || this.isMouse || this.isTouch;
      }
    },
    Ef = class extends Cf {
      constructor() {
        (super(...arguments),
          (this.handleEl = (e) => {
            (this.el &&
              ((this.el = null),
              (this._isUnmounting = !0),
              this.listener.destroy()),
              e &&
                ((this.el = e),
                (this._isUnmounting = !1),
                (this.listener = new Tf(e))));
          }),
          (this.handleHRuler = (e) => {
            (this.disconnectHRuler &&
              (this.disconnectHRuler(),
              (this.disconnectHRuler = void 0),
              this.clientWidth !== void 0 &&
                ((this.clientWidth = void 0),
                U(this.props.clientWidthRef, null))),
              e &&
                (this.disconnectHRuler = yf(e, (e) => {
                  this._isUnmounting ||
                    (e !== this.clientWidth &&
                      ((this.clientWidth = e),
                      U(this.props.clientWidthRef, e)));
                })));
          }),
          (this.handleVRuler = (e) => {
            (this.disconnectVRuler &&
              (this.disconnectVRuler(),
              (this.disconnectVRuler = void 0),
              this.clientHeight !== void 0 &&
                ((this.clientHeight = void 0),
                U(this.props.clientHeightRef, null))),
              e &&
                (this.disconnectVRuler = bf(e, (e) => {
                  if (this._isUnmounting) return;
                  e !== this.clientHeight &&
                    ((this.clientHeight = e), U(this.props.clientHeightRef, e));
                  let t = Math.round(
                    this.el.getBoundingClientRect().height - e,
                  );
                  t !== this.bottomScrollbarWidth &&
                    ((this.bottomScrollbarWidth = t),
                    U(this.props.bottomScrollbarWidthRef, t));
                })));
          }));
      }
      render() {
        let { props: e } = this,
          t = e.horizontal || e.vertical ? `hidden` : ``;
        return (0, S.jsxs)(`div`, {
          ref: this.handleEl,
          className: j(
            e.className,
            A.noPadding,
            A.rel,
            e.hideScrollbars && A.noScrollbars,
            A.internalScroller,
          ),
          style: {
            ...e.style,
            overflowX: e.horizontal ? `auto` : t,
            overflowY: e.vertical ? `auto` : t,
          },
          children: [
            e.children,
            !!e.clientWidthRef &&
              (0, S.jsx)(`div`, {
                ref: this.handleHRuler,
                className: A.fillTop,
              }),
            !!(e.clientHeightRef || e.bottomScrollbarWidthRef) &&
              (0, S.jsx)(`div`, {
                ref: this.handleVRuler,
                className: A.fillStart,
              }),
          ],
        });
      }
      endScroll() {
        this.listener.endScroll();
      }
      get x() {
        let { el: e } = this;
        return e ? Df(e) : 0;
      }
      get y() {
        let { el: e } = this;
        return e ? e.scrollTop : 0;
      }
      scrollTo({ x: e, y: t }) {
        let { el: n } = this;
        n && (t != null && (n.scrollTop = t), e != null && Of(n, e));
      }
      addScrollStartListener(e) {
        this.listener.emitter.on(`scrollStart`, e);
      }
      removeScrollStartListener(e) {
        this.listener.emitter.off(`scrollStart`, e);
      }
      addScrollEndListener(e) {
        this.listener.emitter.on(`scrollEnd`, e);
      }
      removeScrollEndListener(e) {
        this.listener.emitter.off(`scrollEnd`, e);
      }
    };
  function Df(e) {
    let { scrollLeft: t } = e;
    return qd(e) ? kf(t, e) : t;
  }
  function Of(e, t) {
    e.scrollLeft = qd(e) ? Af(t, e) : t;
  }
  function kf(e, t) {
    switch (Mf()) {
      case `positive`:
        return t.scrollWidth - t.clientWidth - e;
      case `negative`:
        return -e;
    }
    return e;
  }
  function Af(e, t) {
    switch (Mf()) {
      case `positive`:
        return t.scrollWidth - t.clientWidth - e;
      case `negative`:
        return -e;
    }
    return e;
  }
  var jf;
  function Mf() {
    return (jf ||= Nf());
  }
  function Nf() {
    let e = document.createElement(`div`);
    ((e.style.position = `absolute`),
      (e.style.top = `-1000px`),
      (e.style.width = `100px`),
      (e.style.height = `100px`),
      (e.style.overflow = `scroll`),
      (e.style.direction = `rtl`));
    let t = document.createElement(`div`);
    ((t.style.width = `200px`),
      (t.style.height = `200px`),
      e.appendChild(t),
      document.body.appendChild(e));
    let n;
    return (
      e.scrollLeft > 0
        ? (n = `positive`)
        : ((e.scrollLeft = 50),
          (n = e.scrollLeft > 0 ? `reverse` : `negative`)),
      e.remove(),
      n
    );
  }
  var Pf = class extends H {
    constructor() {
      (super(...arguments),
        (this.buildPublicEvent = V((e, t, n) => new Vs(e, t, n))),
        (this.handleEl = (e) => {
          ((this.el = e),
            U(this.props.elRef, e),
            e && Ks(e, this.props.eventRange));
        }));
    }
    render() {
      let { props: e, context: t } = this,
        { options: n } = t,
        { eventRange: r } = e,
        i = r.ui,
        a = n.eventTimeFormat || e.defaultTimeFormat,
        o =
          e.forcedTimeText ??
          $s(
            a,
            r,
            e.slicedStart,
            e.slicedEnd,
            e.isStart,
            e.isEnd,
            t,
            e.defaultDisplayEventTime,
            e.defaultDisplayEventEnd,
          ),
        [s, c, l] = rc(r, t),
        u = this.buildPublicEvent(t, r.def, r.instance),
        d = !e.disableDragging && Qs(r, t),
        f = /row|column/.test(e.display),
        p = {
          event: u,
          isNarrow: e.isNarrow || !1,
          isShort: e.isShort || !1,
          timeText: o,
        },
        m = {
          event: u,
          view: t.viewApi,
          timeText: o,
          color: i.color || n.eventColor,
          contrastColor: i.contrastColor || n.eventContrastColor,
          isDraggable: d,
          isStartResizable:
            !e.disableResizing &&
            e.isStart &&
            i.durationEditable &&
            n.eventResizableFromStart,
          isEndResizable: !e.disableResizing && e.isEnd && i.durationEditable,
          isMirror: e.isMirror,
          isStart: !!e.isStart,
          isEnd: !!e.isEnd,
          isFirst: !!e.isFirst,
          isLast: !!e.isLast,
          isPast: !!e.isPast,
          isFuture: !!e.isFuture,
          isToday: !!e.isToday,
          isSelected: !!e.isSelected,
          isDragging: !!e.isDragging,
          isResizing: !!e.isResizing,
          isInteractive: l,
          isNarrow: e.isNarrow || !1,
          isShort: e.isShort || !1,
          level: e.level || 0,
          timeClass: j(
            G(n.eventTimeClass, p),
            f && G(n.blockEventTimeClass, p),
            e.display === `row` && G(n.rowEventTimeClass, p),
            e.display === `column` && G(n.columnEventTimeClass, p),
            e.display === `list-item` && G(n.listItemEventTimeClass, p),
          ),
          titleClass: j(
            G(n.eventTitleClass, p),
            f && G(n.blockEventTitleClass, p),
            e.display === `row` && G(n.rowEventTitleClass, p),
            e.display === `column` && G(n.columnEventTitleClass, p),
            e.display === `list-item` && G(n.listItemEventTitleClass, p),
            e.display === `row` && n.rowEventTitleSticky && A.stickyS,
            e.display === `column` && n.columnEventTitleSticky && A.stickyT,
          ),
          options: { eventOverlap: !!n.eventOverlap },
        },
        h = j(
          f && G(n.blockEventClass, m),
          e.display === `row` && G(n.rowEventClass, m),
          e.display === `column` && G(n.columnEventClass, m),
          e.display === `list-item` && G(n.listItemEventClass, m),
          i.className,
          e.className,
          e.display === `column` ? A.flexCol : A.flexRow,
          (r.def.url || d) && A.cursorPointer,
          A.internalEvent,
          e.isMirror && A.internalEventMirror,
          d && A.internalEventDraggable,
          m.isSelected && A.internalEventSelected,
          (m.isStartResizable || m.isEndResizable) && A.internalEventResizable,
        ),
        g = j(
          G(n.eventBeforeClass, m),
          f && G(n.blockEventBeforeClass, m),
          e.display === `row` && G(n.rowEventBeforeClass, m),
          e.display === `column` && G(n.columnEventBeforeClass, m),
          e.display === `list-item` && G(n.listItemEventBeforeClass, m),
        ),
        _ = j(
          G(n.eventAfterClass, m),
          f && G(n.blockEventAfterClass, m),
          e.display === `row` && G(n.rowEventAfterClass, m),
          e.display === `column` && G(n.columnEventAfterClass, m),
          e.display === `list-item` && G(n.listItemEventAfterClass, m),
        ),
        v = j(
          G(n.eventInnerClass, m),
          f && G(n.blockEventInnerClass, m),
          e.display === `row` && G(n.rowEventInnerClass, m),
          e.display === `column` && G(n.columnEventInnerClass, m),
          e.display === `list-item` && G(n.listItemEventInnerClass, m),
          !e.disableLiquid && A.liquid,
        ),
        y = e.display === `row` && n.rowEventBeforeContent,
        b = e.display === `row` && n.rowEventAfterContent;
      return (0, S.jsx)(W, {
        tag: s,
        attrs: {
          ...e.attrs,
          ...c,
          dir: e.isDragging && n.direction === `rtl` ? `rtl` : void 0,
        },
        className: h,
        style: {
          '--fc-event-color': m.color,
          '--fc-event-contrast-color': m.contrastColor,
        },
        elRef: this.handleEl,
        renderProps: m,
        generatorName: `eventContent`,
        customGenerator: n.eventContent,
        defaultGenerator: Ff,
        classNameGenerator: n.eventClass,
        didMount: n.eventDidMount,
        willUnmount: n.eventWillUnmount,
        children: (t) =>
          (0, S.jsxs)(S.Fragment, {
            children: [
              !!(m.isSelected && f) &&
                (0, S.jsx)(`div`, {
                  className: e.display === `column` ? A.hitX : A.hitY,
                }),
              (g || y) &&
                (0, S.jsxs)(`div`, {
                  className: j(
                    g,
                    !e.disableZindexes && A.z1,
                    m.isStartResizable &&
                      j(
                        e.display === `column`
                          ? A.cursorResizeT
                          : A.cursorResizeS,
                        A.internalEventResizer,
                        A.internalEventResizerStart,
                      ),
                  ),
                  children: [
                    y &&
                      (0, S.jsx)(W, {
                        tag: `div`,
                        style: { display: `contents` },
                        attrs: { 'aria-hidden': !0 },
                        renderProps: m,
                        generatorName: void 0,
                        customGenerator: y,
                      }),
                    !!(m.isStartResizable && m.isSelected) &&
                      (0, S.jsx)(`div`, { className: A.hit }),
                  ],
                }),
              (0, S.jsx)(t, {
                tag: `div`,
                className: j(v, !e.disableZindexes && A.z0),
              }),
              (_ || b) &&
                (0, S.jsxs)(`div`, {
                  className: j(
                    _,
                    !e.disableZindexes && A.z1,
                    m.isEndResizable &&
                      j(
                        e.display === `column`
                          ? A.cursorResizeB
                          : A.cursorResizeE,
                        A.internalEventResizer,
                        A.internalEventResizerEnd,
                      ),
                  ),
                  children: [
                    b &&
                      (0, S.jsx)(W, {
                        tag: `div`,
                        style: { display: `contents` },
                        attrs: { 'aria-hidden': !0 },
                        renderProps: m,
                        generatorName: void 0,
                        customGenerator: b,
                      }),
                    !!(m.isEndResizable && m.isSelected) &&
                      (0, S.jsx)(`div`, { className: A.hit }),
                  ],
                }),
            ],
          }),
      });
    }
    componentDidUpdate(e) {
      this.el &&
        this.props.eventRange !== e.eventRange &&
        Ks(this.el, this.props.eventRange);
    }
  };
  Pf.addPropsEquality({ seg: Po });
  function Ff(e) {
    return (0, S.jsxs)(S.Fragment, {
      children: [
        e.timeText &&
          (0, S.jsx)(`div`, { className: e.timeClass, children: e.timeText }),
        (0, S.jsx)(`div`, {
          className: e.titleClass,
          children:
            e.event.title || (0, S.jsx)(S.Fragment, { children: `\xA0` }),
        }),
      ],
    });
  }
  function If(e, t) {
    let n = {
      left: Math.max(e.left, t.left),
      right: Math.min(e.right, t.right),
      top: Math.max(e.top, t.top),
      bottom: Math.min(e.bottom, t.bottom),
    };
    return n.left < n.right && n.top < n.bottom && n;
  }
  function Lf(e) {
    let t = Rf(e),
      n = e.getBoundingClientRect();
    for (let e of t) {
      let t = If(n, e.getBoundingClientRect());
      if (t) n = t;
      else return null;
    }
    return n;
  }
  function Rf(e) {
    let t = [];
    for (; e instanceof HTMLElement; ) {
      let n = window.getComputedStyle(e);
      if (n.position === `fixed`) break;
      (/(auto|scroll)/.test(n.overflow + n.overflowY + n.overflowX) &&
        t.push(e),
        (e = e.parentNode));
    }
    return t;
  }
  var zf = class {
    constructor() {
      ((this.sliceBusinessHours = V(this._sliceBusinessHours)),
        (this.sliceDateSelection = V(this._sliceDateSpan)),
        (this.sliceEventStore = V(this._sliceEventStore)),
        (this.sliceEventDrag = V(this._sliceInteraction)),
        (this.sliceEventResize = V(this._sliceInteraction)),
        (this.forceDayIfListItem = !1));
    }
    sliceProps(e, t, n, r, ...i) {
      let { eventUiBases: a } = e,
        o = this.sliceEventStore(e.eventStore, a, t, n, ...i);
      return {
        dateSelectionSegs: this.sliceDateSelection(
          e.dateSelection,
          t,
          n,
          a,
          r,
          ...i,
        ),
        businessHourSegs: this.sliceBusinessHours(
          e.businessHours,
          t,
          n,
          r,
          ...i,
        ),
        fgEventSegs: o.fg,
        bgEventSegs: o.bg,
        eventDrag: this.sliceEventDrag(e.eventDrag, a, t, n, ...i),
        eventResize: this.sliceEventResize(e.eventResize, a, t, n, ...i),
        eventSelection: e.eventSelection,
      };
    }
    sliceNowDate(e, t, n, r, ...i) {
      return this._sliceDateSpan(
        { range: { start: e, end: Qi(e, 1) }, allDay: !1 },
        t,
        n,
        {},
        r,
        ...i,
      );
    }
    _sliceBusinessHours(e, t, n, r, ...i) {
      return e
        ? this._sliceEventStore(ts(e, Bf(t, !!n), r), {}, t, n, ...i).bg
        : [];
    }
    _sliceEventStore(e, t, n, r, ...i) {
      if (e) {
        let a = Gs(e, t, Bf(n, !!r), r);
        return {
          bg: this.sliceEventRanges(a.bg, i),
          fg: this.sliceEventRanges(a.fg, i),
        };
      }
      return { bg: [], fg: [] };
    }
    _sliceInteraction(e, t, n, r, ...i) {
      if (!e) return null;
      let a = Gs(e.mutatedEvents, t, Bf(n, !!r), r);
      return {
        segs: this.sliceEventRanges(a.fg, i),
        affectedInstances: e.affectedEvents.instances,
        isEvent: e.isEvent,
      };
    }
    _sliceDateSpan(e, t, n, r, i, ...a) {
      if (!e) return [];
      let o = Bf(t, !!n),
        s = Ta(e.range, o);
      if (s) {
        e = { ...e, range: s };
        let t = Ms(e, r, i),
          n = this.sliceRange(e.range, ...a);
        for (let e of n) e.eventRange = t;
        return n;
      }
      return [];
    }
    sliceEventRanges(e, t) {
      let n = [];
      for (let r of e) n.push(...this.sliceEventRange(r, t));
      return n;
    }
    sliceEventRange(e, t) {
      let n = e.range;
      this.forceDayIfListItem &&
        e.ui.display === `list-item` &&
        (n = { start: n.start, end: Zi(n.start, 1) });
      let r = this.sliceRange(n, ...t);
      for (let t of r)
        ((t.eventRange = e),
          (t.isStart = e.isStart && t.isStart),
          (t.isEnd = e.isEnd && t.isEnd));
      return r;
    }
  };
  function Bf(e, t) {
    let n = e.activeRange;
    return t
      ? n
      : {
          start: Qi(n.start, e.slotMinTime.milliseconds),
          end: Qi(n.end, e.slotMaxTime.milliseconds - 864e5),
        };
  }
  var Vf = class extends zf {
      constructor() {
        (super(...arguments), (this.forceDayIfListItem = !0));
      }
      sliceRange(e, t) {
        return t.sliceRange(e);
      }
    },
    Hf = new Date(2592e5);
  function Uf(e, t, n, r, i, a) {
    let o = Wf(e, t, n, r, i, a),
      s = bl(n, a.dateEnv);
    if (t && s !== `day`)
      for (let e of o.dataConfigs)
        xl(e.dateMarker, s, a.dateEnv) && (e.renderProps.isMajor = !0);
    return [o];
  }
  function Wf(e, t, n, r, i, a, o, s) {
    return {
      isDateRow: !0,
      renderConfig: Gf(i, t, a),
      dataConfigs: qf(e, t, n, r, i, a, o, void 0, void 0, void 0, void 0, s),
    };
  }
  function Gf(e, t, n) {
    let { options: r } = n;
    return {
      generatorName: `dayHeaderContent`,
      customGenerator: r.dayHeaderContent,
      classNameGenerator: r.dayHeaderClass,
      innerClassNameGenerator: r.dayHeaderInnerClass,
      didMount: r.dayHeaderDidMount,
      willUnmount: r.dayHeaderWillUnmount,
      align: r.dayHeaderAlign,
      sticky: r._dayHeaderSticky,
      dayHeaderFormat: e,
      datesRepDistinctDays: t,
    };
  }
  var Kf = [];
  for (let e = 0; e < 7; e++) Kf.push(Zi(new Date(2592e5), e));
  function qf(e, t, n, r, i, a, o = 1, s = ``, c = {}, l = {}, u = ``, d) {
    let { dateEnv: f, viewApi: p, options: m } = a;
    return t
      ? e.map((t, i) => {
          let h = cf(t, f, n, r),
            g = d != null && !(i % d),
            _ = m.navLinks && !h.isDisabled && e.length > 1,
            v = {
              ...h,
              ...c,
              isMajor: g,
              isSticky: !1,
              inPopover: !1,
              hasNavLink: _,
              view: p,
            },
            y = of(a, t);
          return {
            key: s + t.toUTCString(),
            dateMarker: t,
            renderProps: v,
            attrs: {
              'aria-label': y,
              ...(h.isToday ? { 'aria-current': `date` } : {}),
              'data-date': Wa(t),
              ...l,
            },
            innerAttrs: _ ? sf(a, t, void 0, y) : { 'aria-hidden': !0 },
            colSpan: o,
            hasNavLink: _,
            className: u,
          };
        })
      : e.map((e, t) => {
          let n = e.getUTCDay(),
            r = Zi(Hf, n),
            i = {
              date: f.toDate(e),
              dow: n,
              isDisabled: !1,
              isFuture: !1,
              isPast: !1,
              isToday: !1,
              isOther: !1,
            },
            a = d != null && !(t % d),
            m = {
              ...i,
              date: Kf[n],
              isMajor: a,
              isSticky: !1,
              inPopover: !1,
              hasNavLink: !1,
              view: p,
              ...c,
            },
            h = Ka(f.formatToParts(r, tf));
          return {
            key: s + String(n),
            dateMarker: e,
            renderProps: m,
            attrs: { 'aria-label': h, ...l },
            innerAttrs: { 'aria-hidden': !0 },
            colSpan: o,
            className: u,
          };
        });
  }
  var Jf = class {
      constructor(e, t = !1) {
        ((this.masterCallback = e),
          (this.ignoreDeletes = t),
          (this.rev = ``),
          (this.current = new Map()),
          (this.callbacks = new Map()),
          (this.handleValue = (e, t) => {
            let { current: n, callbacks: r } = this;
            (e === null
              ? this.ignoreDeletes || (n.delete(t), r.delete(t))
              : n.set(t, e),
              (this.rev = I()),
              this.masterCallback && this.masterCallback(e, t));
          }));
      }
      createRef(e) {
        let t = this.callbacks.get(e);
        return (
          t ||
            ((t = (t) => {
              this.handleValue(t, e);
            }),
            this.callbacks.set(e, t)),
          t
        );
      }
    },
    Yf = class extends H {
      constructor() {
        (super(...arguments), (this.elRef = (0, B.createRef)()));
      }
      render() {
        return (0, S.jsx)(`div`, { ref: this.elRef });
      }
      componentDidMount() {
        this._isUnmounting = !1;
        let { props: e } = this,
          t = this.elRef.current;
        this.disconnectWidth = yf(t, (t) => {
          this._isUnmounting || U(e.widthRef, t);
        });
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0), this.disconnectWidth());
        let { props: e } = this;
        e.widthRef && U(e.widthRef, null);
      }
    };
  function Xf(e) {
    return (
      Ws(e) +
      `:` +
      e.start +
      (e.standinFor ? `:standin` : e.isSlice ? `:slice` : ``)
    );
  }
  function Zf(e, t) {
    let n = [];
    for (let e = 0; e < t; e++) n[e] = [];
    for (let t of e) n[t.row].push(t);
    return n;
  }
  function Qf(e, t) {
    let n = [];
    if (e) {
      for (let r = 0; r < t; r++)
        n[r] = {
          affectedInstances: e.affectedInstances,
          isEvent: e.isEvent,
          segs: [],
        };
      for (let t of e.segs) n[t.row].segs.push(t);
    } else for (let e = 0; e < t; e++) n[e] = null;
    return n;
  }
  function $f(e, t) {
    return {
      ...e,
      start: t,
      end: t + 1,
      isStart: e.isStart && e.start === t,
      isEnd: e.isEnd && e.end - 1 === t,
      standinFor: e,
    };
  }
  var ep = class extends H {
    constructor() {
      (super(...arguments),
        (this.buildPublicEvent = V((e, t, n) => new Vs(e, t, n))),
        (this.handleEl = (e) => {
          ((this.el = e), e && Ks(e, this.props.eventRange));
        }));
    }
    render() {
      let { props: e, context: t } = this,
        { eventRange: n } = e,
        { options: r } = t,
        i = n.ui,
        a = this.buildPublicEvent(t, n.def, n.instance),
        o = { event: a, isNarrow: e.isNarrow || !1, isShort: e.isShort || !1 },
        s = {
          event: a,
          view: t.viewApi,
          timeText: ``,
          color: i.color || r.backgroundEventColor,
          contrastColor: i.contrastColor,
          isDraggable: !1,
          isStartResizable: !1,
          isEndResizable: !1,
          isMirror: !1,
          isStart: e.isStart,
          isEnd: e.isEnd,
          isFirst: !1,
          isLast: !1,
          isPast: e.isPast,
          isFuture: e.isFuture,
          isToday: e.isToday,
          isSelected: !1,
          isDragging: !1,
          isResizing: !1,
          isInteractive: !1,
          level: 0,
          isNarrow: e.isNarrow || !1,
          isShort: e.isShort || !1,
          timeClass: ``,
          titleClass: G(r.backgroundEventTitleClass, o),
          options: { eventOverlap: !!r.eventOverlap },
        },
        c = j(
          i.className,
          A.fill,
          A.internalEvent,
          A.internalBgEvent,
          e.isVertical ? A.flexCol : A.flexRow,
        ),
        l = j(G(r.backgroundEventInnerClass, s), A.liquid);
      return (0, S.jsx)(W, {
        tag: `div`,
        className: c,
        style: {
          '--fc-event-color': s.color,
          '--fc-event-contrast-color': s.contrastColor,
        },
        defaultGenerator: tp,
        elRef: this.handleEl,
        renderProps: s,
        generatorName: `backgroundEventContent`,
        customGenerator: r.backgroundEventContent,
        classNameGenerator: r.backgroundEventClass,
        didMount: r.backgroundEventDidMount,
        willUnmount: r.backgroundEventWillUnmount,
        children: (e) => (0, S.jsx)(e, { tag: `div`, className: l }),
      });
    }
    componentDidUpdate(e) {
      this.el &&
        this.props.eventRange !== e.eventRange &&
        Ks(this.el, this.props.eventRange);
    }
  };
  function tp(e) {
    let { title: t } = e.event;
    return (
      t &&
      (0, S.jsx)(`div`, { className: e.titleClass, children: e.event.title })
    );
  }
  function np(e, t) {
    return (0, S.jsx)(`div`, {
      className: j(
        e === `non-business`
          ? t.nonBusinessHoursClass
          : e === `highlight`
            ? t.highlightClass
            : void 0,
        A.fill,
      ),
    });
  }
  var rp = 10,
    ip = 1,
    ap = class extends Cf {
      constructor() {
        (super(...arguments),
          (this.getDateMeta = V(cf)),
          (this.closeRef = (0, B.createRef)()),
          (this.focusStartRef = (0, B.createRef)()),
          (this.focusEndRef = (0, B.createRef)()),
          (this.handleRootEl = (e) => {
            ((this.rootEl = e),
              e
                ? this.context.registerInteractiveComponent(this, {
                    el: e,
                    useEventCenter: !1,
                  })
                : this.context.unregisterInteractiveComponent(this));
          }),
          (this.handleDocumentMouseDown = (e) => {
            let t = Zd(e);
            this.rootEl.contains(t) || this.handleClose();
          }),
          (this.handleDocumentKeyDown = (e) => {
            e.key === `Escape` && this.handleClose();
          }),
          (this.handleClose = () => {
            let { onClose: e } = this.props;
            e && e();
          }));
      }
      render() {
        let { props: e, context: t } = this,
          { options: n, dateEnv: r, viewApi: i } = t,
          { startDate: a, todayRange: o, dateProfile: s } = e,
          c = this.getDateMeta(a, r, s, o),
          l = r.formatToParts(a, n.popoverFormat),
          u = Ka(l),
          d = {
            ...c,
            isMajor: !1,
            isNarrow: !1,
            isSticky: !1,
            inPopover: !0,
            level: 0,
            hasNavLink: !1,
            text: u,
            textParts: l,
            get weekdayText() {
              return nf(l);
            },
            get dayNumberText() {
              return rf(l);
            },
            view: i,
          },
          f = {
            ...c,
            isMajor: !1,
            isNarrow: !1,
            inPopover: !0,
            hasNavLink: !1,
            get weekdayText() {
              return nf(l);
            },
            get dayNumberText() {
              return rf(l);
            },
            get monthText() {
              return af(l);
            },
            view: i,
            text: ``,
            textParts: [],
            options: { businessHours: !!n.businessHours },
          },
          p = Wa(a),
          { dayHeaderAlign: m } = n,
          h =
            typeof m == `function`
              ? m({ level: 0, inPopover: !0, isNarrow: !1 })
              : m,
          g = qd(e.alignEl);
        return (0, Ll.createPortal)(
          (0, S.jsxs)(`div`, {
            'data-date': p,
            id: e.id,
            role: `dialog`,
            'aria-labelledby': e.titleId,
            className: j(
              n.popoverClass,
              A.flexCol,
              A.popoverZ,
              A.abs,
              A.borderBoxRoot,
              A.internalPopover,
            ),
            style: { top: 0, left: 0 },
            dir: g ? `rtl` : void 0,
            'data-color-scheme': n.colorScheme || void 0,
            ref: this.handleRootEl,
            children: [
              (0, S.jsx)(`div`, {
                tabIndex: 0,
                style: { outline: `none` },
                ref: this.focusStartRef,
              }),
              (0, S.jsxs)(`div`, {
                className: j(
                  G(n.dayHeaderClass, d),
                  A.flexCol,
                  A.borderOnlyB,
                  h === `center`
                    ? A.alignCenter
                    : h === `end`
                      ? A.alignEnd
                      : A.alignStart,
                ),
                children: [
                  (0, S.jsx)(`div`, {
                    children: (0, S.jsx)(W, {
                      tag: `div`,
                      attrs: { id: e.titleId },
                      generatorName: `dayHeaderContent`,
                      renderProps: d,
                      customGenerator: n.dayHeaderContent,
                      defaultGenerator: op,
                      classNameGenerator: n.dayHeaderInnerClass,
                      didMount: n.dayHeaderDidMount,
                      willUnmount: n.dayHeaderWillUnmount,
                    }),
                  }),
                  (0, S.jsx)(W, {
                    tag: `button`,
                    attrs: {
                      'aria-label': n.closeHint,
                      ...yo(this.handleClose),
                    },
                    elRef: this.closeRef,
                    className: j(
                      n.popoverCloseClass,
                      A.flexRow,
                      A.cursorPointer,
                    ),
                    renderProps: {},
                    customGenerator: n.popoverCloseContent,
                    generatorName: `popoverCloseContent`,
                  }),
                ],
              }),
              (0, S.jsx)(`div`, {
                className: j(G(n.dayCellClass, f), A.flexCol, A.borderNone),
                children: (0, S.jsx)(`div`, {
                  className: G(n.dayCellInnerClass, f),
                  children: e.children,
                }),
              }),
              (0, S.jsx)(`div`, {
                tabIndex: 0,
                style: { outline: `none` },
                ref: this.focusEndRef,
              }),
            ],
          }),
          Kd(e.alignEl),
        );
      }
      queryHit(e, t, n, r, i) {
        let { rootEl: a, props: o } = this;
        return t >= 0 && t < r && n >= 0 && n < i
          ? {
              dateProfile: o.dateProfile,
              dateSpan: {
                allDay: !o.forceTimed,
                range: { start: o.startDate, end: o.endDate },
                ...o.dateSpanProps,
              },
              getDayEl: () => a,
              rect: { left: 0, top: 0, right: r, bottom: i },
              layer: 1,
            }
          : null;
      }
      componentDidMount() {
        (document.addEventListener(`mousedown`, this.handleDocumentMouseDown),
          document.addEventListener(`keydown`, this.handleDocumentKeyDown),
          this.focusStartRef.current.addEventListener(
            `focus`,
            this.handleClose,
          ),
          this.focusEndRef.current.addEventListener(`focus`, this.handleClose),
          this.closeRef.current.focus({ preventScroll: !0 }),
          this.updateSize());
      }
      componentWillUnmount() {
        (document.removeEventListener(
          `mousedown`,
          this.handleDocumentMouseDown,
        ),
          document.removeEventListener(`keydown`, this.handleDocumentKeyDown),
          this.focusStartRef.current.removeEventListener(
            `focus`,
            this.handleClose,
          ),
          this.focusEndRef.current.removeEventListener(
            `focus`,
            this.handleClose,
          ));
      }
      updateSize() {
        let { alignEl: e, alignParentTop: t } = this.props,
          { rootEl: n } = this,
          r = qd(e),
          i = Lf(e);
        if (i) {
          let a = n.getBoundingClientRect(),
            o = t ? e.closest(t).getBoundingClientRect().top - ip : i.top,
            s = r ? i.right - a.width : i.left;
          ((o = Math.max(o, rp)),
            (s = Math.min(
              s,
              document.documentElement.clientWidth - rp - a.width,
            )),
            (s = Math.max(s, rp)));
          let { offsetParent: c } = n,
            l,
            u;
          if (!c || c === document.body)
            ((l = o + window.scrollY), (u = s + window.scrollX));
          else {
            let e = c.getBoundingClientRect();
            ((l = o - e.top + c.scrollTop), (u = s - e.left + c.scrollLeft));
          }
          Yd(n, { top: l, left: u });
        }
      }
    };
  function op(e) {
    return e.text;
  }
  function sp(e, t) {
    let n = Math.max(e.start, t.start),
      r = Math.min(e.end, t.end);
    if (n < r)
      return {
        start: n,
        end: r,
        isStart: e.isStart && n === e.start,
        isEnd: e.isEnd && r === e.end,
      };
  }
  function cp(e) {
    return e.end;
  }
  function lp(e) {
    return e.reduce(dp).eventRange.range.start;
  }
  function up(e) {
    return e.reduce(fp).eventRange.range.end;
  }
  function dp(e, t) {
    return e.eventRange.range.start < t.eventRange.range.start ? e : t;
  }
  function fp(e, t) {
    return e.eventRange.range.end > t.eventRange.range.end ? e : t;
  }
  var pp = class extends H {
    constructor() {
      (super(...arguments),
        (this.state = { isPopoverOpen: !1 }),
        (this.handleLinkEl = (e) => {
          ((this.linkEl = e), this.props.elRef && U(this.props.elRef, e));
        }),
        (this.handleClick = (e) => {
          let { props: t, context: n } = this,
            { dateEnv: r, options: i } = n,
            { moreLinkClick: a } = i,
            o = hp(t).start;
          function s(e) {
            let { def: t, instance: i, range: a } = e.eventRange;
            return {
              event: new Vs(n, t, i),
              start: r.toDate(a.start),
              end: r.toDate(a.end),
              isStart: e.isStart,
              isEnd: e.isEnd,
            };
          }
          (typeof a == `function` &&
            (a = a({
              date: r.toDate(o),
              allDay: !!t.allDayDate,
              allSegs: t.segs.map(s),
              hiddenSegs: t.hiddenSegs.map(s),
              jsEvent: e,
              view: n.viewApi,
            })),
            !a || a === `popover`
              ? this.setState({ isPopoverOpen: !0 })
              : typeof a == `string` && n.calendarApi.zoomTo(o, a));
        }),
        (this.handlePopoverClose = () => {
          (this.linkEl && this.linkEl.focus(),
            this.setState({ isPopoverOpen: !1 }));
        }));
    }
    render() {
      let { props: e, state: t } = this;
      return (0, S.jsx)(nl.Consumer, {
        children: (n) => {
          let { viewApi: r, options: i, calendarApi: a, baseId: o } = n,
            { moreLinkText: s } = i,
            c = e.hiddenSegs.length,
            l = hp(e),
            u = o + `popover-` + l.start.toISOString(),
            d = `+${c}`,
            f = typeof s == `function` ? s.call(a, c) : `${d} ${s}`,
            p = wo(i.moreLinkHint, [c], f),
            m = {
              num: c,
              numericText: d,
              longText: f,
              text: e.isMicro || e.display === `column` ? d : f,
              isNarrow: e.isNarrow,
              view: r,
            };
          return (0, S.jsxs)(S.Fragment, {
            children: [
              !!c &&
                (0, S.jsx)(W, {
                  tag: `div`,
                  elRef: this.handleLinkEl,
                  className: j(
                    G(
                      e.display === `row`
                        ? i.rowMoreLinkClass
                        : i.columnMoreLinkClass,
                      m,
                    ),
                    e.className,
                    e.display === `row` ? A.flexRow : A.flexCol,
                    A.internalMoreLink,
                    A.cursorPointer,
                  ),
                  style: e.style,
                  attrs: {
                    ...e.attrs,
                    ...yo(this.handleClick),
                    title: p,
                    role: `button`,
                    'aria-haspopup': `dialog`,
                    'aria-expanded': t.isPopoverOpen,
                    'aria-controls': t.isPopoverOpen ? u : void 0,
                  },
                  renderProps: m,
                  generatorName: `moreLinkContent`,
                  customGenerator: i.moreLinkContent,
                  defaultGenerator: mp,
                  classNameGenerator: i.moreLinkClass,
                  didMount: i.moreLinkDidMount,
                  willUnmount: i.moreLinkWillUnmount,
                  children: (t) =>
                    (0, S.jsx)(t, {
                      tag: `div`,
                      className: j(
                        G(i.moreLinkInnerClass, m),
                        G(
                          e.display === `row`
                            ? i.rowMoreLinkInnerClass
                            : i.columnMoreLinkInnerClass,
                          m,
                        ),
                        e.display === `row` ? A.stickyS : A.stickyT,
                      ),
                    }),
                }),
              t.isPopoverOpen &&
                (0, S.jsx)(ap, {
                  id: u,
                  titleId: u + `-title`,
                  startDate: l.start,
                  endDate: l.end,
                  dateProfile: e.dateProfile,
                  todayRange: e.todayRange,
                  dateSpanProps: e.dateSpanProps,
                  alignEl: e.alignElRef ? e.alignElRef.current : this.linkEl,
                  alignParentTop: e.alignParentTop,
                  forceTimed: e.forceTimed,
                  onClose: this.handlePopoverClose,
                  children: e.popoverContent(),
                }),
            ],
          });
        },
      });
    }
  };
  function mp(e) {
    return e.text;
  }
  function hp(e) {
    return e.allDayDate
      ? { start: e.allDayDate, end: Zi(e.allDayDate, 1) }
      : { start: lp(e.hiddenSegs), end: up(e.hiddenSegs) };
  }
  var gp = M({
    hour: `numeric`,
    minute: `2-digit`,
    omitZeroMinute: !0,
    meridiem: `narrow`,
  });
  function _p(e) {
    let { display: t } = e.eventRange.ui;
    return (
      t === `list-item` ||
      (t === `auto` &&
        !e.eventRange.def.allDay &&
        e.end - e.start === 1 &&
        e.isStart &&
        e.isEnd)
    );
  }
  var vp = class extends H {
      render() {
        let { props: e } = this;
        return (0, S.jsx)(pp, {
          display: `row`,
          className: e.className,
          isNarrow: e.isNarrow,
          isMicro: e.isMicro,
          dateProfile: e.dateProfile,
          todayRange: e.todayRange,
          allDayDate: e.allDayDate,
          segs: e.segs,
          hiddenSegs: e.hiddenSegs,
          alignElRef: e.alignElRef,
          alignParentTop: e.alignParentTop,
          dateSpanProps: e.dateSpanProps,
          popoverContent: () =>
            (0, S.jsx)(S.Fragment, {
              children: e.segs.map((t) => {
                let { eventRange: n } = t,
                  { instanceId: r } = n.instance,
                  i = !!(e.eventDrag && e.eventDrag.affectedInstances[r]),
                  a = !!(e.eventResize && e.eventResize.affectedInstances[r]);
                return (0, S.jsx)(
                  `div`,
                  {
                    style: { visibility: i || a ? `hidden` : void 0 },
                    children: (0, S.jsx)(Pf, {
                      display: _p(t) ? `list-item` : `row`,
                      eventRange: n,
                      isStart: t.isStart,
                      isEnd: t.isEnd,
                      isDragging: i,
                      isResizing: a,
                      isMirror: !1,
                      isSelected: r === e.eventSelection,
                      defaultTimeFormat: gp,
                      defaultDisplayEventEnd: !1,
                      ...nc(n, e.todayRange),
                    }),
                  },
                  r,
                );
              }),
            }),
        });
      }
    },
    yp = class extends Cf {
      constructor() {
        (super(...arguments),
          (this.getDateMeta = V(cf)),
          (this.refineRenderProps = tl(Sp)),
          (this.rootElRef = (0, B.createRef)()),
          (this.handleBodyEl = (e) => {
            (this.disconnectBodyHeight &&
              (this.disconnectBodyHeight(),
              (this.disconnectBodyHeight = void 0),
              U(this.props.headerHeightRef, null),
              U(this.props.mainHeightRef, null)),
              e &&
                (this.disconnectBodyHeight = vf(e, (t, n) => {
                  if (this._isUnmounting) return;
                  let { props: r } = this,
                    i = e.getBoundingClientRect(),
                    a = this.rootElRef.current.getBoundingClientRect(),
                    o = i.top - a.top;
                  (lf(this.headerHeight, o) ||
                    ((this.headerHeight = o), U(r.headerHeightRef, o)),
                    r.fgLiquidHeight && U(r.mainHeightRef, n));
                })));
          }));
      }
      render() {
        let { props: e, context: t } = this,
          { options: n, dateEnv: r } = t,
          i = e.showDayNumber && xp(e.date, e.dateProfile.currentRange, r),
          a = this.getDateMeta(e.date, r, e.dateProfile, e.todayRange),
          o = j(
            e.borderStart ? A.borderOnlyS : A.borderNone,
            e.width == null ? A.liquid : ``,
            A.flexCol,
            A.noMargin,
            A.noPadding,
          ),
          s = n.navLinks,
          c = this.refineRenderProps({
            date: e.date,
            isMajor: e.isMajor,
            isNarrow: e.isNarrow,
            dateMeta: a,
            hasLabel: e.showDayNumber,
            hasMonthLabel: i,
            hasNavLink: s,
            renderProps: e.renderProps,
            viewApi: t.viewApi,
            dateEnv: t.dateEnv,
            monthStartFormat: n.monthStartFormat,
            dayCellFormat: n.dayCellFormat,
            businessHours: !!n.businessHours,
          });
        if (a.isDisabled)
          return (0, S.jsx)(`div`, {
            role: `gridcell`,
            'aria-disabled': !0,
            className: j(G(n.dayCellClass, c), e.className, o),
            style: { width: e.width },
          });
        let l = of(t, e.date);
        return (0, S.jsx)(W, {
          tag: `div`,
          elRef: this.rootElRef,
          className: j(e.className, o),
          attrs: {
            ...e.attrs,
            role: `gridcell`,
            'aria-label': l,
            ...(c.isToday ? { 'aria-current': `date` } : {}),
            'data-date': Wa(e.date),
          },
          style: { width: e.width },
          renderProps: c,
          generatorName: `dayCellTopContent`,
          customGenerator: n.dayCellTopContent,
          defaultGenerator: bp,
          classNameGenerator: n.dayCellClass,
          didMount: n.dayCellDidMount,
          willUnmount: n.dayCellWillUnmount,
          children: (r) =>
            (0, S.jsxs)(S.Fragment, {
              children: [
                (0, S.jsx)(`div`, {
                  className: j(A.rel, G(n.dayCellTopClass, c)),
                  children:
                    e.showDayNumber &&
                    (0, S.jsx)(r, {
                      tag: `div`,
                      attrs: s
                        ? sf(t, e.date, void 0, l)
                        : { 'aria-hidden': !0 },
                      className: G(n.dayCellTopInnerClass, c),
                    }),
                }),
                (0, S.jsxs)(`div`, {
                  className: j(A.flexCol, e.fgLiquidHeight ? A.liquid : A.grow),
                  ref: this.handleBodyEl,
                  children: [
                    (0, S.jsx)(`div`, {
                      className: G(n.dayCellInnerClass, c),
                      style: { minHeight: e.fgHeight },
                      children: e.fg,
                    }),
                    (0, S.jsx)(vp, {
                      className: A.rel,
                      allDayDate: e.date,
                      segs: e.segs,
                      hiddenSegs: e.hiddenSegs,
                      alignElRef: this.rootElRef,
                      alignParentTop: e.showDayNumber
                        ? `[role=row]`
                        : `.${A.internalView}`,
                      dateSpanProps: e.dateSpanProps,
                      dateProfile: e.dateProfile,
                      eventSelection: e.eventSelection,
                      eventDrag: e.eventDrag,
                      eventResize: e.eventResize,
                      todayRange: e.todayRange,
                      isNarrow: e.isNarrow,
                      isMicro: e.isMicro,
                    }),
                  ],
                }),
                (0, S.jsx)(`div`, {
                  className: j(A.rel, G(n.dayCellBottomClass, c)),
                }),
              ],
            }),
        });
      }
      componentDidMount() {
        this._isUnmounting = !1;
      }
      componentWillUnmount() {
        this._isUnmounting = !0;
      }
    };
  function bp(e) {
    return e.text || (0, S.jsx)(S.Fragment, { children: `\xA0` });
  }
  function xp(e, t, n) {
    let { start: r, end: i } = t,
      a = Qi(i, -1),
      o = n.getYear(r),
      s = n.getMonth(r),
      c = n.getYear(a),
      l = n.getMonth(a);
    return (
      (o !== c || s !== l) &&
      (e.valueOf() === r.valueOf() ||
        (n.getDay(e) === 1 && e.valueOf() < i.valueOf()))
    );
  }
  function Sp(e) {
    let {
        date: t,
        dateEnv: n,
        hasLabel: r,
        hasMonthLabel: i,
        hasNavLink: a,
        businessHours: o,
      } = e,
      s = [],
      c = ``;
    return (
      r &&
        ((s = n.formatToParts(t, i ? e.monthStartFormat : e.dayCellFormat)),
        (c = Ka(s))),
      {
        ...e.dateMeta,
        ...e.renderProps,
        text: c,
        textParts: s,
        isMajor: e.isMajor,
        isNarrow: e.isNarrow,
        inPopover: !1,
        hasNavLink: a,
        get weekdayText() {
          return nf(s);
        },
        get dayNumberText() {
          return rf(s);
        },
        get monthText() {
          return af(s);
        },
        options: { businessHours: o },
        view: e.viewApi,
      }
    );
  }
  var Cp = class {
    constructor(e, t = (e) => 1, n = !1, r, i, a = !1, o = !1) {
      ((this.getSegThickness = t),
        (this.strictOrder = n),
        (this.maxCoord = r),
        (this.maxDepth = i),
        (this.hiddenConsumes = a),
        (this.allowSlicing = o),
        (this.placementsByLevel = []),
        (this.levelCoords = []),
        (this.hiddenSegs = []));
      for (let t of e) this.insertSeg(t, this.getSegThickness(t));
    }
    insertSeg(e, t, n) {
      if (t != null) {
        let r = this.findInsertion(e, t);
        if (this.isInsertionValid(r, t)) this.insertSegAt(e, r, t, n);
        else {
          let { touchingPlacement: n } = r;
          if (n) {
            if (
              this.hiddenConsumes &&
              !n.isZombie &&
              ((n.isZombie = !0), this.hiddenSegs.push(n), this.allowSlicing)
            ) {
              let t = Object.assign({}, n);
              (Object.assign(n, sp(n, e)),
                (n.isSlice = !0),
                this.splitSeg(t, n.thickness, n));
            }
            this.allowSlicing
              ? (this.hiddenSegs.push({ ...e, ...sp(e, n) }),
                this.splitSeg(e, t, n))
              : this.hiddenSegs.push(e);
          } else this.hiddenSegs.push(e);
        }
      }
    }
    isInsertionValid(e, t) {
      return (
        (this.maxCoord == null || e.levelCoord + t <= this.maxCoord) &&
        (this.maxDepth == null || e.depth < this.maxDepth)
      );
    }
    splitSeg(e, t, n) {
      (e.start < n.start &&
        this.insertSeg({ ...e, end: n.start, isEnd: !1 }, t, !0),
        e.end > n.end &&
          this.insertSeg({ ...e, start: n.end, isStart: !1 }, t, !0));
    }
    insertSegAt(e, t, n, r) {
      let i = {
        ...e,
        thickness: n,
        depth: t.depth,
        isSlice: r || e.isSlice || !1,
        isZombie: !1,
      };
      t.lateralIndex === -1
        ? (wp(this.placementsByLevel, t.levelIndex, [i]),
          wp(this.levelCoords, t.levelIndex, t.levelCoord))
        : wp(this.placementsByLevel[t.levelIndex], t.lateralIndex, i);
    }
    findInsertion(e, t) {
      let { placementsByLevel: n, levelCoords: r } = this,
        i = n.length,
        a = 0,
        o,
        s,
        c = 0;
      for (let l = 0; l < i; l += 1) {
        let i = r[l];
        if (!this.strictOrder && i >= a + t) break;
        let u = n[l],
          d,
          [f, p] = Tp(u, e.start, cp),
          m = f + p;
        for (; (d = u[m]) && d.start < e.end; ) {
          let e = i + d.thickness;
          (e > a && ((a = e), (o = d), (s = l)),
            e === a && (c = Math.max(c, d.depth + 1)),
            (m += 1));
        }
      }
      let l = 0;
      if (o) for (l = s + 1; l < i && r[l] < a; ) l += 1;
      let u = -1;
      return (
        l < i && r[l] === a && ([u] = Tp(n[l], e.end, cp)),
        {
          touchingPlacement: o,
          levelCoord: a,
          levelIndex: l,
          lateralIndex: u,
          depth: c,
        }
      );
    }
    traverseSegs(e) {
      let { placementsByLevel: t, levelCoords: n } = this;
      for (let r = 0; r < t.length; r++) {
        let i = t[r],
          a = n[r];
        for (let t of i) t.isZombie || e(t, a);
      }
    }
  };
  function wp(e, t, n) {
    e.splice(t, 0, n);
  }
  function Tp(e, t, n) {
    let r = 0,
      i = e.length;
    if (!i || t < n(e[r])) return [0, 0];
    if (t > n(e[i - 1])) return [i, 0];
    for (; r < i; ) {
      let a = Math.floor(r + (i - r) / 2),
        o = n(e[a]);
      if (t < o) i = a;
      else if (t > o) r = a + 1;
      else return [a, 1];
    }
    return [r, 0];
  }
  function Ep(e, t, n, r, i, a = !0, o, s) {
    let c, l, u;
    o === !0 || s === !0
      ? ((c = r), (u = !0))
      : typeof o == `number`
        ? ((l = o), (u = !1))
        : typeof s == `number` && ((l = s), (u = !0));
    let d = new Map(),
      f = new Map(),
      p = new Map(),
      m = new Map(),
      h = new Cp(e, (e) => t.get(Xf(e)), i, c, l, u, a);
    h.traverseSegs((e, t) => {
      (Dp(d, e), p.set(Xf(e), t), e.isSlice && m.set(e.eventRange, !0));
    });
    for (let e of h.hiddenSegs) Dp(f, e);
    if (m.size) {
      (p.clear(),
        (h = new Cp(Op(e, d), (e) => t.get(Xf(e)), i, c, l, u)),
        h.traverseSegs((e, t) => {
          p.set(Xf(e), t);
        }));
      for (let e of h.hiddenSegs) Dp(f, e);
    }
    let g = [],
      _ = [],
      v = [],
      y = [];
    for (let e = 0; e < n.length; e++)
      (g.push([]), _.push([]), v.push([]), y.push(0));
    for (let n of e) {
      let { eventRange: e } = n,
        r = d.get(e) || [],
        i = f.get(e) || [],
        a = m.get(e) || !1;
      if ((v[n.start].push(n), a)) for (let e of r) v[e.start].push(e);
      for (let e of r) {
        for (let t = e.start; t < e.end; t++) {
          let n = $f(e, t);
          g[t].push(n);
        }
        let n = Xf(e),
          r = p.get(n);
        if (r != null) {
          let i = t.get(n);
          for (let t = e.start; t < e.end; t++) y[t] = Math.max(y[t], r + i);
        }
      }
      for (let e of i)
        for (let t = e.start; t < e.end; t++) {
          let n = $f(e, t);
          (g[t].push(n), _[t].push(n));
        }
    }
    return [g, _, v, p, y];
  }
  function Dp(e, t) {
    let n = e.get(t.eventRange);
    (n || e.set(t.eventRange, (n = [])), n.push(t));
  }
  function Op(e, t) {
    let n = [];
    for (let r of e) n.push(...(t.get(r.eventRange) || []));
    return n;
  }
  var kp = class {
      constructor(e, t) {
        let n = e.start,
          { end: r } = e,
          i = [],
          a = [],
          o = -1;
        for (; n < r; )
          (t.isHiddenDay(n)
            ? i.push(o + 0.5)
            : ((o += 1), i.push(o), a.push(n)),
            (n = Zi(n, 1)));
        ((this.dates = a), (this.indices = i), (this.cnt = a.length));
      }
      sliceRange(e) {
        let t = this.getDateDayIndex(e.start),
          n = this.getDateDayIndex(Zi(e.end, -1)),
          r = Math.max(0, t),
          i = Math.min(this.cnt - 1, n);
        return (
          (r = Math.ceil(r)),
          (i = Math.floor(i)),
          r <= i
            ? { start: r, end: i + 1, isStart: t === r, isEnd: n === i }
            : null
        );
      }
      getDateDayIndex(e) {
        let { indices: t } = this,
          n = Math.floor(ea(this.dates[0], e));
        return n < 0 ? t[0] - 1 : n >= t.length ? t[t.length - 1] + 1 : t[n];
      }
    },
    Ap = class {
      constructor(e, t, n, r = ``) {
        ((this.dateEnv = n), (this.majorUnit = r));
        let { dates: i } = e,
          a,
          o,
          s;
        if (t) {
          for (
            o = i[0].getUTCDay(), a = 1;
            a < i.length && i[a].getUTCDay() !== o;
            a += 1
          );
          s = Math.ceil(i.length / a);
        } else ((s = 1), (a = i.length));
        ((this.rowCount = s),
          (this.colCount = a),
          (this.daySeries = e),
          (this.cellRows = this.buildCells()),
          (this.headerDates = this.buildHeaderDates()));
      }
      buildCells() {
        let e = [];
        for (let t = 0; t < this.rowCount; t += 1) {
          let n = [];
          for (let e = 0; e < this.colCount; e += 1)
            n.push(this.buildCell(t, e));
          e.push(n);
        }
        return e;
      }
      buildCell(e, t) {
        let n = this.daySeries.dates[e * this.colCount + t];
        return { key: n.toISOString(), date: n, isMajor: this.cellIsMajor(n) };
      }
      cellIsMajor(e) {
        return this.majorUnit ? xl(e, this.majorUnit, this.dateEnv) : !1;
      }
      buildHeaderDates() {
        let e = [];
        for (let t = 0; t < this.colCount; t += 1)
          e.push(this.cellRows[0][t].date);
        return e;
      }
      sliceRange(e) {
        let { colCount: t } = this,
          n = this.daySeries.sliceRange(e),
          r = [];
        if (n) {
          let { start: e, end: i } = n,
            a = e;
          for (; a < i; ) {
            let o = Math.floor(a / t),
              s = Math.min((o + 1) * t, i);
            (r.push({
              row: o,
              start: a % t,
              end: ((s - 1) % t) + 1,
              isStart: n.isStart && a === e,
              isEnd: n.isEnd && s === i,
            }),
              (a = s));
          }
        }
        return r;
      }
    };
  function jp(e, t, n) {
    let r = new kp(e.renderRange, t),
      i = /year|month|week/.test(e.currentRangeUnit),
      a = !i && bl(e, n);
    return new Ap(r, i, n, a === `day` ? void 0 : a);
  }
  function Mp(e, t, n) {
    return n == null ? [void 0, void 0] : n / e < t ? [t * e, t] : [n, void 0];
  }
  function Np(e, t, n) {
    let r = 0;
    for (let i of t) {
      let t = i[0].key,
        a = i[0].date,
        o = i[i.length - 1].date;
      if (e >= a && e <= o) return r;
      let s = n.get(t);
      if (s == null) return;
      r += s;
    }
    return r;
  }
  function Pp(e, t, n) {
    let r, i;
    if (t != null) ((r = e.start * t), (i = (n - e.end) * t));
    else {
      let t = 1 / n;
      ((r = uo(e.start * t)), (i = uo(1 - e.end * t)));
    }
    return { insetInlineStart: r, insetInlineEnd: i };
  }
  function Fp(e, t, n, r, i) {
    let a = n ?? t / r,
      o = Math.floor(e / a),
      s = i ? r - o - 1 : o,
      c = o * a;
    return { col: s, left: c, right: c + a };
  }
  function Ip(e, t, n) {
    let r = 0,
      i = 0,
      a = 0;
    for (let o of t) {
      let t = o[0].key;
      if (((i = a), (a = i + n.get(t)), e < a)) break;
      r++;
    }
    return { row: r, top: i, bottom: a };
  }
  function Lp(e, t) {
    return e.querySelectorAll(`[role=row]`)[t];
  }
  function Rp(e, t) {
    return e.querySelectorAll(`[role=gridcell]`)[t];
  }
  var zp = M({ weekday: `narrow` });
  function Bp(e, t, n) {
    return e || Vp(t, n);
  }
  function Vp(e, t) {
    return M(
      e
        ? t > 1
          ? {
              weekday: `short`,
              weekdayJustify: `start`,
              day: `numeric`,
              omitCommas: !0,
              omitTrailing: !0,
            }
          : {
              weekday: `long`,
              weekdayJustify: `start`,
              day: `numeric`,
              omitCommas: !0,
              omitTrailing: !0,
            }
        : { weekday: `short` },
    );
  }
  var Hp = class extends B.Component {
      constructor() {
        (super(...arguments), (this.rootElRef = (0, B.createRef)()));
      }
      render() {
        let { props: e } = this;
        return (0, S.jsx)(`div`, {
          className: j(e.className, A.abs),
          style: e.style,
          ref: this.rootElRef,
          children: e.children,
        });
      }
      componentDidMount() {
        this._isUnmounting = !1;
        let e = this.rootElRef.current;
        this.disconnectHeight = bf(e, (e) => {
          this._isUnmounting || U(this.props.heightRef, e);
        });
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0),
          this.disconnectHeight(),
          U(this.props.heightRef, null));
      }
    },
    Up = M({ week: `narrow` }),
    Wp = class extends H {
      constructor() {
        (super(...arguments),
          (this.headerHeightRefMap = new Jf(() => {
            hf(this.handleSegPositioning);
          })),
          (this.mainHeightRefMap = new Jf(() => {
            (this.props.dayMaxEvents === !0 ||
              this.props.dayMaxEventRows === !0) &&
              hf(this.handleSegPositioning);
          })),
          (this.segHeightRefMap = new Jf(() => {
            hf(this.handleSegPositioning);
          })),
          (this.buildWeekNumberRenderProps = V(Gp)),
          (this.handleRootEl = (e) => {
            ((this.rootEl = e), U(this.props.rootElRef, e));
          }),
          (this.handleSegPositioning = () => {
            this._isUnmounting || this.forceUpdate();
          }));
      }
      render() {
        let {
            props: e,
            context: t,
            headerHeightRefMap: n,
            mainHeightRefMap: r,
          } = this,
          { cells: i } = e,
          { options: a } = t,
          o = e.cells[0].date,
          s = e.dayMaxEvents === !0 || e.dayMaxEventRows === !0,
          c = Xs(e.fgEventSegs, a.eventOrder),
          [l, u] = this.computeFgDims(),
          [d, f, p, m, h] = Ep(
            c,
            this.segHeightRefMap.current,
            i,
            s ? u : void 0,
            a.eventOrderStrict,
            a.eventSlicing,
            e.dayMaxEvents,
            e.dayMaxEventRows,
          ),
          g = [];
        if (l != null) {
          let e = 0;
          for (let t of i) {
            let r = n.current.get(t.key);
            if (r != null) {
              let t = l - r;
              g.push(h[e] + t);
            } else g.push(void 0);
            e++;
          }
        }
        let _ = this.getHighlightSegs(),
          v = this.getMirrorSegs(),
          y = a.navLinks,
          b = of(t, o, `week`),
          x = this.buildWeekNumberRenderProps(o, t, e.cellIsNarrow, y);
        return (0, S.jsxs)(`div`, {
          role: e.role,
          'aria-label': e.role === `row` ? b : void 0,
          className: j(
            a.dayRowClass,
            e.className,
            A.flexRow,
            A.rel,
            A.isolate,
            e.forPrint && e.basis !== void 0 && A.printSiblingRow,
          ),
          style: { flexBasis: e.basis },
          ref: this.handleRootEl,
          children: [
            e.showWeekNumbers &&
              !e.cellIsMicro &&
              (0, S.jsx)(W, {
                tag: `div`,
                attrs: {
                  ...(y ? sf(t, o, `week`, b, !1) : {}),
                  role: void 0,
                  'aria-hidden': !0,
                },
                className: A.z1,
                renderProps: x,
                generatorName: `inlineWeekNumberContent`,
                customGenerator: a.inlineWeekNumberContent,
                defaultGenerator: fl,
                classNameGenerator: a.inlineWeekNumberClass,
                didMount: a.inlineWeekNumberDidMount,
                willUnmount: a.inlineWeekNumberWillUnmount,
              }),
            this.renderFillSegs(e.businessHourSegs, `non-business`),
            this.renderFillSegs(e.bgEventSegs, `bg-event`),
            this.renderFillSegs(_, `highlight`),
            e.cells.map((t, i) => {
              let a = this.renderFgSegs(l, p[i], m, e.todayRange, !1);
              return (0, S.jsx)(
                yp,
                {
                  dateProfile: e.dateProfile,
                  todayRange: e.todayRange,
                  date: t.date,
                  isMajor: t.isMajor,
                  showDayNumber: e.showDayNumbers,
                  isNarrow: e.cellIsNarrow,
                  isMicro: e.cellIsMicro,
                  borderStart: !!i,
                  segs: d[i],
                  hiddenSegs: f[i],
                  fgLiquidHeight: s,
                  fg: (0, S.jsx)(S.Fragment, { children: a }),
                  eventDrag: e.eventDrag,
                  eventResize: e.eventResize,
                  eventSelection: e.eventSelection,
                  renderProps: t.renderProps,
                  dateSpanProps: t.dateSpanProps,
                  attrs: t.attrs,
                  className: t.className,
                  fgHeight: g[i],
                  width: e.colWidth,
                  headerHeightRef: n.createRef(t.key),
                  mainHeightRef: r.createRef(t.key),
                },
                t.key,
              );
            }),
            this.renderFgSegs(l, v, m, e.todayRange, !0),
          ],
        });
      }
      renderFgSegs(e, t, n, r, i) {
        let { props: a, segHeightRefMap: o } = this,
          { colWidth: s, eventSelection: c, cellIsMicro: l } = a,
          u = a.cells.length,
          d = a.cells.length === 1,
          f = [];
        for (let p of t) {
          let t = Xf(p),
            { standinFor: m, eventRange: h } = p,
            { instanceId: g } = h.instance;
          if (m) continue;
          let { insetInlineStart: _, insetInlineEnd: v } = Pp(p, s, u),
            y = n.get(m ? Xf(m) : t) ?? (i ? 0 : void 0),
            b = e != null && y != null ? e + y : void 0,
            x = !!(a.eventDrag && a.eventDrag.affectedInstances[g]),
            ee = !!(a.eventResize && a.eventResize.affectedInstances[g]),
            C = !i && (x || ee || m || b == null),
            te = _p(p),
            ne = g === c;
          f.push(
            (0, S.jsx)(
              Hp,
              {
                className: p.start ? A.fakeBorderS : ``,
                style: {
                  visibility: C ? `hidden` : void 0,
                  top: b,
                  insetInlineStart: _,
                  insetInlineEnd: v,
                  zIndex: ne ? 1e3 : 0,
                },
                heightRef: !m && !i ? o.createRef(t) : null,
                children: (0, S.jsx)(Pf, {
                  display: te ? `list-item` : `row`,
                  eventRange: h,
                  isStart: p.isStart,
                  isEnd: p.isEnd,
                  isDragging: x,
                  isResizing: ee,
                  isMirror: i,
                  isSelected: ne,
                  isNarrow: a.cellIsNarrow,
                  defaultTimeFormat: gp,
                  defaultDisplayEventEnd: d,
                  disableResizing: te,
                  forcedTimeText: l ? `` : void 0,
                  ...nc(h, r),
                }),
              },
              t,
            ),
          );
        }
        return f;
      }
      renderFillSegs(e, t) {
        let { props: n, context: r } = this,
          { todayRange: i, colWidth: a } = n,
          o = n.cells.length,
          s = [];
        for (let c of e) {
          let e = c.start + `:` + c.end,
            { insetInlineStart: l, insetInlineEnd: u } = Pp(c, a, o),
            d = !c.standinFor;
          s.push(
            (0, S.jsx)(
              `div`,
              {
                className: A.fillY,
                style: {
                  visibility: d ? `` : `hidden`,
                  insetInlineStart: l,
                  insetInlineEnd: u,
                },
                children:
                  t === `bg-event`
                    ? (0, S.jsx)(ep, {
                        eventRange: c.eventRange,
                        isStart: c.isStart,
                        isEnd: c.isEnd,
                        isNarrow: n.cellIsNarrow,
                        isVertical: !1,
                        ...nc(c.eventRange, i),
                      })
                    : np(t, r.options),
              },
              e,
            ),
          );
        }
        return (0, S.jsx)(S.Fragment, { children: s });
      }
      componentDidMount() {
        this._isUnmounting = !1;
        let { rootEl: e } = this;
        this.disconnectHeight = bf(e, (e) => {
          U(this.props.heightRef, e);
        });
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0),
          this.disconnectHeight(),
          U(this.props.heightRef, null));
      }
      computeFgDims() {
        let { cells: e } = this.props,
          t = this.headerHeightRefMap.current,
          n = this.mainHeightRefMap.current,
          r,
          i;
        for (let a of e) {
          let e = t.get(a.key),
            o = n.get(a.key);
          if (e != null && ((r === void 0 || e > r) && (r = e), o != null)) {
            let t = e + o;
            (i === void 0 || t < i) && (i = t);
          }
        }
        return [r, i != null && r != null ? i - r : void 0];
      }
      getMirrorSegs() {
        let { props: e } = this;
        return e.eventResize && e.eventResize.segs.length
          ? e.eventResize.segs
          : [];
      }
      getHighlightSegs() {
        let { props: e } = this;
        return e.eventDrag && e.eventDrag.segs.length
          ? e.eventDrag.segs
          : e.eventResize && e.eventResize.segs.length
            ? e.eventResize.segs
            : e.dateSelectionSegs;
      }
    };
  function Gp(e, t, n, r) {
    let { dateEnv: i, options: a } = t,
      o = i.computeWeekNumber(e),
      s = i.formatToParts(e, a.weekNumberFormat || Up);
    return {
      num: o,
      text: Ka(s),
      textParts: s,
      date: i.toDate(e),
      isNarrow: n,
      hasNavLink: r,
    };
  }
  var Kp = class extends Cf {
    constructor() {
      (super(...arguments),
        (this.splitBusinessHourSegs = V(Zf)),
        (this.splitBgEventSegs = V(Jp)),
        (this.splitFgEventSegs = V(Zf)),
        (this.splitDateSelectionSegs = V(Zf)),
        (this.splitEventDrag = V(Qf)),
        (this.splitEventResize = V(Qf)),
        (this.rowHeightRefMap = new Jf((e, t) => {
          let { rowHeightRefMap: n } = this.props;
          n && n.handleValue(e, t);
        })),
        (this.handleRootEl = (e) => {
          ((this.rootEl = e),
            e
              ? this.context.registerInteractiveComponent(this, {
                  el: e,
                  isHitComboAllowed: this.props.isHitComboAllowed,
                })
              : this.context.unregisterInteractiveComponent(this));
        }));
    }
    render() {
      let { props: e, context: t, rowHeightRefMap: n } = this,
        { options: r } = t,
        { cellRows: i } = e,
        a = i.length,
        o = i[0]?.[0]?.key || ``,
        s = this.splitFgEventSegs(e.fgEventSegs, a),
        c = this.splitBgEventSegs(e.bgEventSegs, a),
        l = this.splitBusinessHourSegs(e.businessHourSegs, a),
        u = this.splitDateSelectionSegs(e.dateSelectionSegs, a),
        d = this.splitEventDrag(e.eventDrag, a),
        f = this.splitEventResize(e.eventResize, a),
        p = pl(r),
        m = !e.forPrint && !p,
        h = Yp(e.visibleWidth, a, p, r);
      return (0, S.jsx)(`div`, {
        role: `rowgroup`,
        className: j(e.className, !e.forPrint && A.flexCol),
        style: { width: e.width },
        ref: this.handleRootEl,
        children: i.map((t, i) =>
          (0, S.jsx)(
            Wp,
            {
              role: `row`,
              dateProfile: e.dateProfile,
              todayRange: e.todayRange,
              cells: t,
              cellIsNarrow: e.cellIsNarrow,
              cellIsMicro: e.cellIsMicro,
              showDayNumbers: a > 1,
              showWeekNumbers: a > 1 && r.weekNumbers,
              forPrint: e.forPrint,
              className: j(
                m && A.grow,
                a > 1 && A.breakInsideAvoid,
                i < a - 1 ? A.borderOnlyB : A.borderNone,
              ),
              fgEventSegs: s[i],
              bgEventSegs: c[i],
              businessHourSegs: l[i],
              dateSelectionSegs: u[i],
              eventSelection: e.eventSelection,
              eventDrag: d[i],
              eventResize: f[i],
              dayMaxEvents: e.dayMaxEvents,
              dayMaxEventRows: e.dayMaxEventRows,
              colWidth: e.colWidth,
              basis: h,
              heightRef: n.createRef(t[0].key),
            },
            o + `:` + t[0].key,
          ),
        ),
      });
    }
    queryHit(e, t, n, r) {
      let { props: i } = this,
        a = i.cellRows[0].length,
        { col: o, left: s, right: c } = Fp(t, r, i.colWidth, a, e),
        {
          row: l,
          top: u,
          bottom: d,
        } = Ip(n, i.cellRows, this.rowHeightRefMap.current),
        f = i.cellRows[l][o],
        p = f.date,
        m = Zi(p, 1);
      return {
        dateProfile: i.dateProfile,
        dateSpan: {
          range: { start: p, end: m },
          allDay: !0,
          ...f.dateSpanProps,
        },
        getDayEl: () => Rp(Lp(this.rootEl, l), o),
        rect: { left: s, right: c, top: u, bottom: d },
        layer: 0,
      };
    }
  };
  function qp(e) {
    return e.eventRange.def.allDay;
  }
  function Jp(e, t) {
    return Zf(e.filter(qp), t);
  }
  function Yp(e, t, n, r) {
    if (e != null) {
      let i = e / r.aspectRatio / 6;
      return t > 6 || n ? i : 0;
    }
    return 0;
  }
  var Xp = class extends H {
    constructor() {
      (super(...arguments),
        (this.state = {}),
        (this.buildDayHeaderText = V(Zp)),
        (this.handleInnerEl = (e) => {
          ((this.disconnectSize &&= (this.disconnectSize(), void 0)),
            e
              ? (this.disconnectSize = vf(e, (e, t) => {
                  this._isUnmounting ||
                    (U(this.props.innerHeightRef, t),
                    this.setState({ innerWidth: e }));
                }))
              : U(this.props.innerHeightRef, null));
        }));
    }
    render() {
      let { props: e, state: t, context: n } = this,
        { renderConfig: r, dataConfig: i } = e,
        a = e.colWidth == null ? void 0 : e.colWidth * (i.colSpan || 1),
        o = i.renderProps.isDisabled,
        s = r.dayHeaderFormat
          ? this.buildDayHeaderRenderProps(
              i.renderProps,
              e.cellIsNarrow,
              e.rowLevel,
              e.cellIsMicro,
              i.dateMarker,
              r.dayHeaderFormat,
              !!r.datesRepDistinctDays,
              n.dateEnv,
            )
          : { ...i.renderProps, isNarrow: e.cellIsNarrow, level: e.rowLevel },
        c = r.align,
        l =
          typeof c == `function`
            ? c({
                level: e.rowLevel,
                inPopover: i.renderProps.inPopover,
                isNarrow: e.cellIsNarrow,
              })
            : c,
        u = r.sticky,
        d =
          e.rowLevel > 0 &&
          u !== !1 &&
          (l !== `center` ||
            (a != null &&
              e.viewportWidth != null &&
              a > e.viewportWidth * 0.75)),
        f;
      return (
        d &&
          (l === `center`
            ? t.innerWidth != null && (f = `calc(50% - ${t.innerWidth / 2}px)`)
            : (f = typeof u == `number` || typeof u == `string` ? u : 0)),
        (0, S.jsx)(W, {
          tag: `div`,
          attrs: {
            role: `columnheader`,
            'aria-colspan': i.colSpan,
            ...i.attrs,
          },
          className: j(
            i.className,
            A.noMargin,
            A.noPadding,
            A.flexCol,
            e.borderStart ? A.borderOnlyS : A.borderNone,
            l === `center`
              ? A.alignCenter
              : l === `end`
                ? A.alignEnd
                : A.alignStart,
            e.colWidth == null && A.liquid,
            !d && A.crop,
          ),
          style: { width: a },
          renderProps: s,
          generatorName: r.generatorName,
          customGenerator: r.customGenerator,
          defaultGenerator: fl,
          classNameGenerator: o ? void 0 : r.classNameGenerator,
          didMount: r.didMount,
          willUnmount: r.willUnmount,
          children: (e) =>
            (0, S.jsx)(`div`, {
              ref: this.handleInnerEl,
              className: j(
                A.flexCol,
                A.noShrink,
                A.whiteSpaceNoWrap,
                d && A.sticky,
              ),
              style: { left: f, right: f },
              children: (0, S.jsx)(e, {
                tag: `div`,
                attrs: i.innerAttrs,
                className: G(r.innerClassNameGenerator, s),
              }),
            }),
        })
      );
    }
    componentDidMount() {
      this._isUnmounting = !1;
    }
    componentWillUnmount() {
      this._isUnmounting = !0;
    }
    buildDayHeaderRenderProps(e, t, n, r, i, a, o, s) {
      let c = this.buildDayHeaderText(o ? i : e.date, a, o, s),
        l = r ? this.buildDayHeaderText(i, zp, !1, s) : c;
      return {
        ...e,
        isNarrow: t,
        level: n,
        text: l.text,
        textParts: l.textParts,
        weekdayText: r ? l.text : c.weekdayText,
        dayNumberText: c.dayNumberText,
      };
    }
  };
  function Zp(e, t, n, r) {
    let i = r.formatToParts(e, t);
    return {
      text: Ka(i),
      textParts: i,
      weekdayText: nf(i),
      dayNumberText: n ? rf(i) : ``,
    };
  }
  var Qp = class extends H {
      constructor() {
        (super(...arguments),
          (this.innerHeightRefMap = new Jf(() => {
            hf(this.handleInnerHeights);
          })),
          (this.handleInnerHeights = () => {
            if (this._isUnmounting) return;
            let e = this.innerHeightRefMap.current,
              t = 0;
            for (let n of e.values()) t = Math.max(t, n);
            this.currentInnerHeight !== t &&
              ((this.currentInnerHeight = t), U(this.props.innerHeightRef, t));
          }));
      }
      render() {
        let { props: e, context: t } = this,
          { options: n } = t;
        return (0, S.jsx)(`div`, {
          role: e.role,
          'aria-rowindex': e.rowIndex == null ? void 0 : 1 + e.rowIndex,
          className: j(
            n.dayHeaderRowClass,
            e.className,
            A.flexRow,
            A.contentBox,
            e.borderBottom ? A.borderOnlyB : A.borderNone,
          ),
          style: { height: e.height },
          children: e.dataConfigs.map((t, n) =>
            (0, S.jsx)(
              Xp,
              {
                renderConfig: e.renderConfig,
                dataConfig: t,
                borderStart: !!n,
                colWidth: e.colWidth,
                viewportWidth: e.viewportWidth,
                innerHeightRef: this.innerHeightRefMap.createRef(t.key),
                cellIsNarrow: e.cellIsNarrow,
                cellIsMicro: e.cellIsMicro,
                rowLevel: e.rowLevel,
              },
              t.key,
            ),
          ),
        });
      }
      componentDidMount() {
        this._isUnmounting = !1;
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0),
          (this.currentInnerHeight = void 0),
          U(this.props.innerHeightRef, null));
      }
    },
    $p = class extends H {
      render() {
        let { props: e } = this,
          { headerTiers: t } = e;
        return (0, S.jsx)(`div`, {
          role: `rowgroup`,
          className: j(e.className, A.flexCol, e.width == null && A.liquid),
          style: { width: e.width },
          children: t.map((n, r) =>
            (0, B.createElement)(Qp, {
              ...n,
              key: r,
              role: `row`,
              borderBottom: r < t.length - 1,
              colWidth: e.colWidth,
              viewportWidth: e.viewportWidth,
              cellIsNarrow: e.cellIsNarrow,
              cellIsMicro: e.cellIsMicro,
              rowLevel: t.length - r - 1,
            }),
          ),
        });
      }
    },
    em = class extends H {
      constructor() {
        (super(...arguments),
          (this.state = {}),
          (this.handleScroller = (e) => {
            U(this.props.scrollerRef, e);
          }),
          (this.handleTotalWidth = (e) => {
            this._isUnmounting || this.setState({ totalWidth: e });
          }),
          (this.handleClientWidth = (e) => {
            this._isUnmounting || this.setState({ clientWidth: e });
          }));
      }
      render() {
        let { props: e, state: t, context: n } = this,
          { options: r } = n,
          { borderlessX: i, borderlessTop: a, borderlessBottom: o } = Eo(r),
          { totalWidth: s, clientWidth: c } = t,
          l = s != null && c != null ? s - c : void 0;
        l < 3 && (l = 0);
        let u = !e.forPrint && !pl(r),
          d = !e.forPrint && ml(r),
          f = e.cellRows[0].length,
          p = c == null ? void 0 : c / f,
          m = p != null && p <= 60,
          h = m || (p != null && p <= r.dayNarrowWidth);
        return (0, S.jsxs)(S.Fragment, {
          children: [
            r.dayHeaders &&
              (0, S.jsxs)(`div`, {
                className: j(
                  G(r.tableHeaderClass, {
                    isSticky: d,
                    borderlessX: i,
                    borderlessTop: a,
                    borderlessBottom: o,
                    multiMonthColumns: 0,
                  }),
                  A.printHeader,
                  d && A.tableHeaderSticky,
                ),
                children: [
                  (0, S.jsxs)(`div`, {
                    className: A.flexRow,
                    children: [
                      (0, S.jsx)($p, {
                        headerTiers: e.headerTiers,
                        cellIsNarrow: h,
                        cellIsMicro: m,
                      }),
                      !!l &&
                        (0, S.jsx)(`div`, {
                          className: j(
                            G(r.fillerClass, { inTableHeader: !0 }),
                            A.borderOnlyS,
                          ),
                          style: { minWidth: l },
                        }),
                    ],
                  }),
                  (0, S.jsx)(`div`, {
                    className: G(r.dayHeaderDividerClass, {
                      isSticky: d,
                      multiMonthColumns: 0,
                      options: { allDaySlot: !!r.allDaySlot },
                    }),
                  }),
                ],
              }),
            (0, S.jsx)(Ef, {
              vertical: u,
              className: j(
                G(r.tableBodyClass, {
                  borderlessX: i,
                  borderlessTop: a,
                  borderlessBottom: o,
                  multiMonthColumns: 0,
                }),
                !e.forPrint && A.flexCol,
                u && A.liquid,
              ),
              ref: this.handleScroller,
              clientWidthRef: this.handleClientWidth,
              children: (0, S.jsx)(Kp, {
                dateProfile: e.dateProfile,
                todayRange: e.todayRange,
                cellRows: e.cellRows,
                forPrint: e.forPrint,
                isHitComboAllowed: e.isHitComboAllowed,
                className: A.grow,
                dayMaxEvents: e.forPrint ? void 0 : r.dayMaxEvents,
                dayMaxEventRows: r.dayMaxEventRows,
                fgEventSegs: e.fgEventSegs,
                bgEventSegs: e.bgEventSegs,
                businessHourSegs: e.businessHourSegs,
                dateSelectionSegs: e.dateSelectionSegs,
                eventDrag: e.eventDrag,
                eventResize: e.eventResize,
                eventSelection: e.eventSelection,
                visibleWidth: s,
                cellIsNarrow: h,
                cellIsMicro: m,
                rowHeightRefMap: e.rowHeightRefMap,
              }),
            }),
            (0, S.jsx)(Yf, { widthRef: this.handleTotalWidth }),
          ],
        });
      }
      componentDidMount() {
        this._isUnmounting = !1;
      }
      componentWillUnmount() {
        this._isUnmounting = !0;
      }
    },
    tm = class extends H {
      constructor() {
        (super(...arguments), (this.rootElRef = (0, B.createRef)()));
      }
      render() {
        let { props: e } = this;
        return (0, S.jsx)(`div`, {
          ref: this.rootElRef,
          className: j(
            A.footerScrollbar,
            e.isSticky && A.footerScrollbarSticky,
          ),
          children: (0, S.jsx)(Ef, {
            horizontal: !0,
            ref: e.scrollerRef,
            children: (0, S.jsx)(`div`, { style: { minWidth: e.canvasWidth } }),
          }),
        });
      }
      componentDidMount() {
        ((this._isUnmounting = !1),
          (this.disconnectHeight = bf(this.rootElRef.current, (e) => {
            this._isUnmounting || U(this.props.scrollbarWidthRef, e);
          })));
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0),
          this.disconnectHeight(),
          U(this.props.scrollbarWidthRef, null));
      }
    },
    nm = class extends H {
      constructor() {
        (super(...arguments),
          (this.state = {}),
          (this.headerScrollerRef = (0, B.createRef)()),
          (this.bodyScrollerRef = (0, B.createRef)()),
          (this.footerScrollerRef = (0, B.createRef)()),
          (this.handleTotalWidth = (e) => {
            this._isUnmounting || this.setState({ totalWidth: e });
          }),
          (this.handleClientWidth = (e) => {
            this._isUnmounting || this.setState({ clientWidth: e });
          }));
      }
      render() {
        let { props: e, state: t, context: n } = this,
          { options: r } = n,
          { borderlessX: i, borderlessTop: a, borderlessBottom: o } = Eo(r),
          { totalWidth: s, clientWidth: c } = t,
          l = s != null && c != null ? s - c : void 0,
          u = !e.forPrint && !pl(r),
          d = !e.forPrint && ml(r),
          f = !e.forPrint && hl(r),
          p = e.cellRows[0].length,
          [m, h] = Mp(p, e.dayMinWidth, c),
          g = h != null && h <= 60,
          _ = g || (h != null && h <= r.dayNarrowWidth);
        return (0, S.jsxs)(S.Fragment, {
          children: [
            r.dayHeaders &&
              (0, S.jsxs)(`div`, {
                className: j(
                  G(r.tableHeaderClass, {
                    isSticky: d,
                    borderlessX: i,
                    borderlessTop: a,
                    borderlessBottom: o,
                    multiMonthColumns: 0,
                  }),
                  A.printHeader,
                  d && A.tableHeaderSticky,
                ),
                children: [
                  (0, S.jsxs)(Ef, {
                    horizontal: !0,
                    hideScrollbars: !0,
                    className: A.flexRow,
                    ref: this.headerScrollerRef,
                    children: [
                      (0, S.jsx)($p, {
                        headerTiers: e.headerTiers,
                        colWidth: h,
                        viewportWidth: c,
                        width: m,
                        cellIsNarrow: _,
                        cellIsMicro: g,
                      }),
                      !!l &&
                        (0, S.jsx)(`div`, {
                          className: j(
                            G(r.fillerClass, { inTableHeader: !0 }),
                            A.borderOnlyS,
                          ),
                          style: { minWidth: l },
                        }),
                    ],
                  }),
                  (0, S.jsx)(`div`, {
                    className: G(r.dayHeaderDividerClass, {
                      isSticky: d,
                      multiMonthColumns: 0,
                      options: { allDaySlot: !!r.allDaySlot },
                    }),
                  }),
                ],
              }),
            (0, S.jsx)(Ef, {
              vertical: u,
              horizontal: !0,
              hideScrollbars: f || e.forPrint,
              className: j(
                G(r.tableBodyClass, {
                  borderlessX: i,
                  borderlessTop: a,
                  borderlessBottom: o,
                  multiMonthColumns: 0,
                }),
                !e.forPrint && A.flexCol,
                u && A.liquid,
              ),
              ref: this.bodyScrollerRef,
              clientWidthRef: this.handleClientWidth,
              children: (0, S.jsx)(Kp, {
                dateProfile: e.dateProfile,
                todayRange: e.todayRange,
                cellRows: e.cellRows,
                forPrint: e.forPrint,
                isHitComboAllowed: e.isHitComboAllowed,
                className: A.grow,
                dayMaxEvents: e.forPrint ? void 0 : r.dayMaxEvents,
                dayMaxEventRows: r.dayMaxEventRows,
                fgEventSegs: e.fgEventSegs,
                bgEventSegs: e.bgEventSegs,
                businessHourSegs: e.businessHourSegs,
                dateSelectionSegs: e.dateSelectionSegs,
                eventDrag: e.eventDrag,
                eventResize: e.eventResize,
                eventSelection: e.eventSelection,
                colWidth: h,
                width: m,
                visibleWidth: s,
                cellIsNarrow: _,
                cellIsMicro: g,
                rowHeightRefMap: e.rowHeightRefMap,
              }),
            }),
            !!f &&
              (0, S.jsx)(tm, {
                isSticky: !0,
                canvasWidth: m,
                scrollerRef: this.footerScrollerRef,
              }),
            (0, S.jsx)(Yf, { widthRef: this.handleTotalWidth }),
          ],
        });
      }
      componentDidMount() {
        this._isUnmounting = !1;
        let e = gl(this.context.pluginHooks);
        ((this.syncedScroller = new e(!0)),
          U(this.props.scrollerRef, this.syncedScroller),
          this.updateSyncedScroller());
      }
      componentDidUpdate() {
        this.updateSyncedScroller();
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0), this.syncedScroller.destroy());
      }
      updateSyncedScroller() {
        this.syncedScroller.handleChildren([
          this.headerScrollerRef.current,
          this.bodyScrollerRef.current,
          this.footerScrollerRef.current,
        ]);
      }
    },
    rm = class extends H {
      constructor() {
        (super(...arguments),
          (this.scrollerRef = (0, B.createRef)()),
          (this.rowHeightRefMap = new Jf(() => {
            hf(this.updateScrollY);
          })),
          (this.scrollDate = null),
          (this.updateScrollY = () => {
            if (this._isUnmounting) return;
            let e = this.rowHeightRefMap.current,
              t = this.scrollerRef.current;
            if (t && this.scrollDate) {
              let n = Np(this.scrollDate, this.props.cellRows, e);
              n != null && (n && n++, t.scrollTo({ y: n }));
            }
          }),
          (this.handleScrollEnd = (e) => {
            e && (this.scrollDate = null);
          }));
      }
      render() {
        let { props: e, context: t } = this,
          { options: n } = t,
          { borderlessX: r, borderlessTop: i, borderlessBottom: a } = Eo(n),
          o = e.forPrint ? [] : e.businessHourSegs,
          s = e.forPrint ? [] : e.dateSelectionSegs,
          c = e.forPrint ? null : e.eventDrag,
          l = e.forPrint ? null : e.eventResize,
          u = {
            ...e,
            businessHourSegs: o,
            dateSelectionSegs: s,
            eventDrag: c,
            eventResize: l,
            scrollerRef: this.scrollerRef,
            rowHeightRefMap: this.rowHeightRefMap,
          };
        return (0, S.jsx)(xf, {
          viewSpec: t.viewSpec,
          attrs: {
            role: `grid`,
            'aria-rowcount': e.headerTiers.length + e.cellRows.length,
            'aria-colcount': e.cellRows[0].length,
            'aria-labelledby': e.labelId,
            'aria-label': e.labelStr,
          },
          className: j(
            e.className,
            A.printRoot,
            G(n.tableClass, {
              borderlessX: r,
              borderlessTop: i,
              borderlessBottom: a,
              multiMonthColumns: 0,
            }),
          ),
          children: n.dayMinWidth
            ? (0, S.jsx)(nm, { ...u, dayMinWidth: n.dayMinWidth })
            : (0, S.jsx)(em, { ...u }),
        });
      }
      componentDidMount() {
        ((this._isUnmounting = !1),
          this.resetScroll(),
          this.scrollerRef.current.addScrollEndListener(this.handleScrollEnd));
      }
      componentDidUpdate(e) {
        e.dateProfile !== this.props.dateProfile &&
          this.context.options.scrollTimeReset &&
          this.resetScroll();
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0),
          this.scrollerRef.current.removeScrollEndListener(
            this.handleScrollEnd,
          ));
      }
      resetScroll() {
        ((this.scrollDate = this.props.dateProfile.currentDate),
          this.updateScrollY(),
          this.scrollerRef.current.scrollTo({ x: 0 }));
      }
    },
    im = class extends yl {
      buildRenderRange(e, t, n) {
        let r = super.buildRenderRange(e, t, n),
          { props: i } = this;
        return am({
          currentRange: r,
          snapToWeek: /^(year|month)$/.test(t),
          fixedWeekCount: i.fixedWeekCount,
          dateEnv: i.dateEnv,
        });
      }
    };
  function am(e) {
    let { dateEnv: t, currentRange: n } = e,
      { start: r, end: i } = n,
      a;
    if (
      (e.snapToWeek &&
        ((r = t.startOfWeek(r)),
        (a = t.startOfWeek(i)),
        a.valueOf() !== i.valueOf() && (i = Xi(a, 1))),
      e.fixedWeekCount)
    ) {
      let e = t.startOfWeek(t.startOfMonth(Zi(n.end, -1))),
        r = Math.ceil($i(e, i));
      i = Xi(i, 6 - r);
    }
    return { start: r, end: i };
  }
  var om = {
      name: `daygrid`,
      initialView: `dayGridMonth`,
      views: {
        dayGrid: {
          component: class extends H {
            constructor() {
              (super(...arguments),
                (this.buildDayTableModel = V(jp)),
                (this.buildDateRowConfigs = V(Uf)),
                (this.createDayHeaderFormatter = V(Bp)),
                (this.slicer = new Vf()));
            }
            render() {
              let { props: e, context: t } = this,
                { dateProfile: n } = e,
                { options: r, dateEnv: i } = t,
                a = this.buildDayTableModel(n, t.dateProfileGenerator, i),
                o = a.rowCount === 1,
                s = this.createDayHeaderFormatter(
                  t.options.dayHeaderFormat,
                  o,
                  a.colCount,
                ),
                c = this.slicer.sliceProps(e, n, r.nextDayThreshold, t, a);
              return (0, S.jsx)(Qd, {
                unit: `day`,
                children: (r, i) => {
                  let l = this.buildDateRowConfigs(
                    a.headerDates,
                    o,
                    n,
                    i,
                    s,
                    t,
                  );
                  return (0, S.jsx)(rm, {
                    labelId: e.labelId,
                    labelStr: e.labelStr,
                    dateProfile: n,
                    todayRange: i,
                    cellRows: a.cellRows,
                    forPrint: e.forPrint,
                    className: e.className,
                    headerTiers: l,
                    fgEventSegs: c.fgEventSegs,
                    bgEventSegs: c.bgEventSegs,
                    businessHourSegs: c.businessHourSegs,
                    dateSelectionSegs: c.dateSelectionSegs,
                    eventDrag: c.eventDrag,
                    eventResize: c.eventResize,
                    eventSelection: c.eventSelection,
                  });
                },
              });
            }
          },
          dateProfileGeneratorClass: im,
        },
        dayGridDay: { type: `dayGrid`, duration: { days: 1 } },
        dayGridWeek: { type: `dayGrid`, duration: { weeks: 1 } },
        dayGridMonth: {
          type: `dayGrid`,
          duration: { months: 1 },
          fixedWeekCount: !0,
        },
        dayGridYear: { type: `dayGrid`, duration: { years: 1 } },
      },
    },
    sm = class extends H {
      render() {
        let { props: e, context: t } = this,
          { options: n } = t,
          r = t.dateEnv.formatToParts(e.dayDate, e.dayFormat),
          i = Ka(r),
          a = n.navLinks,
          o = {
            ...e.dateMeta,
            view: t.viewApi,
            text: i,
            textParts: r,
            get weekdayText() {
              return nf(r);
            },
            get dayNumberText() {
              return rf(r);
            },
            hasNavLink: a,
            level: e.level,
          },
          s = a
            ? sf(this.context, e.dayDate, void 0, i, this.props.isTabbable)
            : {};
        return (0, S.jsx)(W, {
          tag: `div`,
          attrs: s,
          renderProps: o,
          generatorName: `listDayHeaderContent`,
          customGenerator: n.listDayHeaderContent,
          defaultGenerator: fl,
          classNameGenerator: n.listDayHeaderInnerClass,
        });
      }
    },
    cm = class extends H {
      render() {
        let { options: e, viewApi: t, viewSpec: n } = this.context,
          { dayDate: r, dateMeta: i } = this.props,
          a = !this.props.forPrint,
          o = e.listDayFormat ?? lm(n),
          s = e.listDayAltFormat ?? um(n),
          c = { ...i, view: t };
        return (0, S.jsx)(W, {
          tag: `div`,
          attrs: {
            'data-date': Wa(r),
            ...(i.isToday ? { 'aria-current': `date` } : {}),
          },
          className: a ? A.stickyT : ``,
          renderProps: c,
          generatorName: void 0,
          classNameGenerator: e.listDayHeaderClass,
          didMount: e.listDayHeaderDidMount,
          willUnmount: e.listDayHeaderWillUnmount,
          children: () =>
            (0, S.jsxs)(S.Fragment, {
              children: [
                !!o &&
                  (0, S.jsx)(sm, {
                    dayDate: r,
                    dayFormat: o,
                    isTabbable: !0,
                    dateMeta: i,
                    level: 0,
                  }),
                !!s &&
                  (0, S.jsx)(sm, {
                    dayDate: r,
                    dayFormat: s,
                    isTabbable: !1,
                    dateMeta: i,
                    level: 1,
                  }),
              ],
            }),
        });
      }
    };
  function lm({ durationUnit: e, singleUnit: t }) {
    return t === `day` || e === `day` || t === `week` ? tf : $d;
  }
  function um({ durationUnit: e, singleUnit: t }) {
    if (t !== `day`) return e === `day` || t === `week` ? $d : tf;
  }
  var dm = M({ hour: `numeric`, minute: `2-digit`, meridiem: `short` }),
    fm = class extends H {
      render() {
        let { props: e, context: t } = this,
          { eventRange: n } = e,
          { displayEventTime: r } = t.options,
          i =
            r !== !1 && (n.def.allDay || (!e.isStart && !e.isEnd))
              ? t.options.allDayText
              : void 0;
        return (0, S.jsx)(Pf, {
          ...e,
          attrs: { role: `listitem` },
          forcedTimeText: i,
          defaultTimeFormat: dm,
          disableDragging: !0,
          disableResizing: !0,
          disableZindexes: !0,
          display: `list-item`,
        });
      }
    },
    pm = class extends H {
      constructor() {
        (super(...arguments),
          (this.getDateMeta = V(cf)),
          (this.sortEventSegs = V(Xs)));
      }
      render() {
        let { props: e, context: t } = this,
          { nowDate: n, todayRange: r } = e,
          { options: i } = t,
          a = this.getDateMeta(e.dayDate, t.dateEnv, void 0, r),
          o = this.sortEventSegs(e.segs, i.eventOrder),
          s = of(this.context, e.dayDate),
          c = { ...a, isFirst: e.isFirst, isLast: e.isLast, view: t.viewApi },
          l = { ...a, view: t.viewApi };
        return (0, S.jsxs)(`div`, {
          role: `listitem`,
          'aria-label': s,
          className: G(i.listDayClass, c),
          children: [
            (0, S.jsx)(cm, {
              dayDate: e.dayDate,
              dateMeta: a,
              forPrint: e.forPrint,
            }),
            (0, S.jsx)(`div`, {
              role: `list`,
              'aria-label': i.eventsHint,
              className: j(G(i.listDayBodyClass, l), A.flexCol),
              children: o.map((e, t) => {
                let i = Ws(e),
                  a = t === 0,
                  s = t === o.length - 1;
                return (0, S.jsx)(
                  fm,
                  {
                    eventRange: e.eventRange,
                    slicedStart: e.slicedStart,
                    slicedEnd: e.slicedEnd,
                    isStart: e.isStart,
                    isEnd: e.isEnd,
                    isFirst: a,
                    isLast: s,
                    isDragging: !1,
                    isResizing: !1,
                    isMirror: !1,
                    isSelected: !1,
                    ...nc(e.eventRange, r, n),
                  },
                  i,
                );
              }),
            }),
          ],
        });
      }
    },
    mm = class extends Cf {
      constructor() {
        (super(...arguments),
          (this.computeDateVars = V(gm)),
          (this.eventStoreToSegs = V(this._eventStoreToSegs)),
          (this.setRootEl = (e) => {
            e
              ? this.context.registerInteractiveComponent(this, {
                  el: e,
                  disableHits: !0,
                })
              : this.context.unregisterInteractiveComponent(this);
          }));
      }
      render() {
        let { props: e, context: t } = this,
          { options: n } = t,
          { dayDates: r, dayRanges: i } = this.computeDateVars(e.dateProfile),
          a = this.eventStoreToSegs(e.eventStore, e.eventUiBases, i),
          o = !e.forPrint && !pl(n);
        return (0, S.jsx)(xf, {
          viewSpec: t.viewSpec,
          className: j(e.className, A.flexCol),
          elRef: this.setRootEl,
          children: a.length
            ? (0, S.jsx)(Ef, {
                vertical: o,
                className: j(A.flexCol, o ? A.liquid : ``),
                children: this.renderSegList(a, r),
              })
            : this.renderEmptyMessage(),
        });
      }
      renderEmptyMessage() {
        let { options: e, viewApi: t } = this.context,
          n = { text: e.noEventsText, view: t };
        return (0, S.jsx)(W, {
          tag: `div`,
          attrs: { role: `status` },
          renderProps: n,
          generatorName: `noEventsContent`,
          customGenerator: e.noEventsContent,
          defaultGenerator: hm,
          classNameGenerator: e.noEventsClass,
          className: A.grow,
          didMount: e.noEventsDidMount,
          willUnmount: e.noEventsWillUnmount,
          children: (t) =>
            (0, S.jsx)(t, {
              tag: `div`,
              className: G(e.noEventsInnerClass, n),
            }),
        });
      }
      renderSegList(e, t) {
        let { options: n } = this.context,
          r = _m(e);
        return (0, S.jsx)(`div`, {
          role: `list`,
          'aria-labelledby': this.props.labelId,
          'aria-label': this.props.labelStr,
          className: j(A.flexCol, j(n.listDaysClass)),
          children: (0, S.jsx)(Qd, {
            unit: `day`,
            children: (e, n) => {
              let i = [],
                a = r.reduce((e, t) => e + +!!t, 0),
                o = 0;
              for (let s = 0; s < r.length; s += 1) {
                let c = r[s];
                if (c) {
                  let r = t[s],
                    l = Wa(r),
                    u = o === 0,
                    d = o === a - 1;
                  (i.push(
                    (0, S.jsx)(
                      pm,
                      {
                        dayDate: r,
                        nowDate: e,
                        todayRange: n,
                        segs: c,
                        isFirst: u,
                        isLast: d,
                        forPrint: this.props.forPrint,
                      },
                      l,
                    ),
                  ),
                    (o += 1));
                }
              }
              return (0, S.jsx)(S.Fragment, { children: i });
            },
          }),
        });
      }
      _eventStoreToSegs(e, t, n) {
        return this.eventRangesToSegs(
          Gs(
            e,
            t,
            this.props.dateProfile.activeRange,
            this.context.options.nextDayThreshold,
          ).fg,
          n,
        );
      }
      eventRangesToSegs(e, t) {
        let n = [];
        for (let r of e) n.push(...this.eventRangeToSegs(r, t));
        return n;
      }
      eventRangeToSegs(e, t) {
        let n = e.range,
          r,
          i = [];
        for (r = 0; r < t.length; r += 1) {
          let a = Ta(n, t[r]);
          a &&
            i.push({
              eventRange: e,
              slicedStart: a.start,
              slicedEnd: a.end,
              isStart: e.isStart && n.start.valueOf() === a.start.valueOf(),
              isEnd: e.isEnd && n.end.valueOf() === a.end.valueOf(),
              dayIndex: r,
            });
        }
        return i;
      }
    };
  function hm(e) {
    return e.text;
  }
  function gm(e) {
    let t = O(e.renderRange.start),
      n = e.renderRange.end,
      r = [],
      i = [];
    for (; t < n; )
      (r.push(t), i.push({ start: t, end: Zi(t, 1) }), (t = Zi(t, 1)));
    return { dayDates: r, dayRanges: i };
  }
  function _m(e) {
    let t = [],
      n,
      r;
    for (n = 0; n < e.length; n += 1)
      ((r = e[n]), (t[r.dayIndex] || (t[r.dayIndex] = [])).push(r));
    return t;
  }
  var vm = {
    name: `list`,
    views: {
      list: {
        component: mm,
        buttonTextKey: `listText`,
        disallowAmbigTitle: !0,
      },
      listDay: { type: `list`, duration: { days: 1 } },
      listWeek: { type: `list`, duration: { weeks: 1 } },
      listMonth: { type: `list`, duration: { month: 1 } },
      listYear: { type: `list`, duration: { year: 1 } },
    },
  };
  function ym(e) {
    if (e) {
      let t = e.replace(/\\/g, ``).split(`-`);
      return `${t[0].trim()}, ${t[1].trim()}`;
    }
    return ``;
  }
  function bm(e) {
    let t = new Date(e);
    function n(e) {
      if (e > 3 && e < 21) return `th`;
      switch (e % 10) {
        case 1:
          return `st`;
        case 2:
          return `nd`;
        case 3:
          return `rd`;
        default:
          return `th`;
      }
    }
    let r = t.getDate(),
      i = n(r);
    if (e.length === 10) {
      let e = t.toLocaleDateString(`en-us`, { month: `long`, year: `numeric` });
      return `${e.split(` `)} ${r}${i}, ${e.split(` `)[1]}`;
    }
    {
      let e = t.toLocaleDateString(`en-us`, { month: `long`, year: `numeric` }),
        n = t.toLocaleTimeString(`en-us`, {
          hour: `numeric`,
          minute: `numeric`,
        });
      return `${e.split(` `)[0]} ${r}${i}, ${e.split(` `)[1]} at ${n}`;
    }
  }
  function xm(e) {
    let t = (0, b.c)(21),
      { closeModal: n, info: r } = e,
      i;
    t[0] === r.event.title
      ? (i = t[1])
      : ((i = (0, S.jsx)(`h3`, { children: r.event.title })),
        (t[0] = r.event.title),
        (t[1] = i));
    let a;
    t[2] === r.event.extendedProps.location
      ? (a = t[3])
      : ((a = ym(r.event.extendedProps.location)),
        (t[2] = r.event.extendedProps.location),
        (t[3] = a));
    let o;
    t[4] === a
      ? (o = t[5])
      : ((o = (0, S.jsx)(`h4`, { children: a })), (t[4] = a), (t[5] = o));
    let s;
    t[6] === r.event.startStr
      ? (s = t[7])
      : ((s = bm(r.event.startStr)), (t[6] = r.event.startStr), (t[7] = s));
    let c;
    t[8] === s
      ? (c = t[9])
      : ((c = (0, S.jsx)(`h5`, { children: s })), (t[8] = s), (t[9] = c));
    let l;
    t[10] === r.event.extendedProps.description
      ? (l = t[11])
      : ((l = (0, S.jsx)(`div`, {
          children: r.event.extendedProps.description,
        })),
        (t[10] = r.event.extendedProps.description),
        (t[11] = l));
    let u;
    t[12] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((u = (0, S.jsx)(`svg`, {
          xmlns: `http://www.w3.org/2000/svg`,
          x: `0px`,
          y: `0px`,
          width: `20`,
          height: `20`,
          viewBox: `0 0 50 50`,
          className: `stroke-main fill-main`,
          children: (0, S.jsx)(`path`, {
            d: `M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z`,
          }),
        })),
        (t[12] = u))
      : (u = t[12]);
    let d;
    t[13] === n
      ? (d = t[14])
      : ((d = (0, S.jsx)(`button`, {
          onClick: n,
          className: `absolute top-1 right-1 bg-transparent border-none cursor-pointer`,
          children: u,
        })),
        (t[13] = n),
        (t[14] = d));
    let f;
    return (
      t[15] !== i || t[16] !== o || t[17] !== c || t[18] !== l || t[19] !== d
        ? ((f = (0, S.jsx)(`div`, {
            id: `modal`,
            className: `fixed top-0 left-0 w-full h-full bg-main/80 flex items-center justify-center z-1`,
            children: (0, S.jsxs)(`div`, {
              className: `calendar-modal`,
              children: [i, o, c, l, d],
            }),
          })),
          (t[15] = i),
          (t[16] = o),
          (t[17] = c),
          (t[18] = l),
          (t[19] = d),
          (t[20] = f))
        : (f = t[20]),
      f
    );
  }
  function Sm(e) {
    let t = (0, b.c)(14),
      { events: n, view: r } = e,
      i = r === void 0 ? `dayGridMonth` : r,
      [a, o] = (0, B.useState)(!1),
      [s, c] = (0, B.useState)(null),
      l;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((l = (e) => {
          (console.log(e.jsEvent), e.jsEvent.preventDefault(), c(e), o(!0));
        }),
        (t[0] = l))
      : (l = t[0]);
    let u = l,
      d;
    t[1] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((d = [`dayGridMonth`, `listMonth`]), (t[1] = d))
      : (d = t[1]);
    let f;
    t[2] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((f = [om, vm]), (t[2] = f))
      : (f = t[2]);
    let p = i === `listMonth` ? `95vh` : void 0,
      m;
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((m = { start: `title`, end: `prev,next` }), (t[3] = m))
      : (m = t[3]);
    let h;
    t[4] !== n || t[5] !== p || t[6] !== i
      ? ((h = (0, S.jsx)(cd, {
          availableViews: d,
          initialView: i,
          plugins: f,
          height: p,
          events: n,
          headerToolbar: m,
          eventClick: u,
        })),
        (t[4] = n),
        (t[5] = p),
        (t[6] = i),
        (t[7] = h))
      : (h = t[7]);
    let g;
    t[8] !== a || t[9] !== s
      ? ((g = a && (0, S.jsx)(xm, { info: s, closeModal: () => o(!1) })),
        (t[8] = a),
        (t[9] = s),
        (t[10] = g))
      : (g = t[10]);
    let _;
    return (
      t[11] !== h || t[12] !== g
        ? ((_ = (0, S.jsxs)(`div`, { className: `p-6`, children: [h, g] })),
          (t[11] = h),
          (t[12] = g),
          (t[13] = _))
        : (_ = t[13]),
      _
    );
  }
  function Cm(e) {
    let t = (0, b.c)(5),
      { events: n } = e,
      [r, i] = (0, B.useState)(null),
      a,
      o;
    if (
      (t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((a = () => {
            let e = () => {
              (console.log(`updateView`, window.innerWidth),
                i(window.innerWidth < 800 ? `listMonth` : `dayGridMonth`));
            };
            return (
              e(),
              window.addEventListener(`resize`, e),
              () => {
                window.removeEventListener(`resize`, e);
              }
            );
          }),
          (o = []),
          (t[0] = a),
          (t[1] = o))
        : ((a = t[0]), (o = t[1])),
      (0, B.useEffect)(a, o),
      !r)
    )
      return null;
    let s;
    return (
      t[2] !== n || t[3] !== r
        ? ((s = (0, S.jsx)(S.Fragment, {
            children: (0, S.jsx)(Sm, { events: n, view: r }),
          })),
          (t[2] = n),
          (t[3] = r),
          (t[4] = s))
        : (s = t[4]),
      s
    );
  }
  var wm = new WeakMap();
  function Tm(e) {
    let t = wm.get(e);
    if (t) return t;
    let n = (0, y.createRoot)(e);
    return (wm.set(e, n), n);
  }
  function Em(e, t) {
    Tm(e).render((0, S.jsx)(ne, { events: t }));
  }
  function Dm(e, t) {
    Tm(e).render((0, S.jsx)(se, { groups: t }));
  }
  function Om(e, t) {
    Tm(e).render((0, S.jsx)(Cm, { events: t }));
  }
  window.ChurchEmbed = { mountEvents: Em, mountGroups: Dm, mountCalendar: Om };
})();
