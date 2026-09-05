'use strict';
(() => {
  var Y1 = Object.create;
  var Vh = Object.defineProperty;
  var k1 = Object.getOwnPropertyDescriptor;
  var B1 = Object.getOwnPropertyNames;
  var _1 = Object.getPrototypeOf,
    z1 = Object.prototype.hasOwnProperty;
  var Ut = (e, t) => () => {
    try {
      return (t || e((t = { exports: {} }).exports, t), t.exports);
    } catch (n) {
      throw ((t = 0), n);
    }
  };
  var L1 = (e, t, n, a) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let o of B1(t))
        !z1.call(e, o) &&
          o !== n &&
          Vh(e, o, {
            get: () => t[o],
            enumerable: !(a = k1(t, o)) || a.enumerable,
          });
    return e;
  };
  var F = (e, t, n) => (
    (n = e != null ? Y1(_1(e)) : {}),
    L1(
      t || !e || !e.__esModule
        ? Vh(n, 'default', { value: e, enumerable: !0 })
        : n,
      e,
    )
  );
  var ag = Ut((ue) => {
    'use strict';
    function ou(e, t) {
      var n = e.length;
      e.push(t);
      e: for (; 0 < n; ) {
        var a = (n - 1) >>> 1,
          o = e[a];
        if (0 < Wi(o, t)) ((e[a] = t), (e[n] = o), (n = a));
        else break e;
      }
    }
    function Yt(e) {
      return e.length === 0 ? null : e[0];
    }
    function Pi(e) {
      if (e.length === 0) return null;
      var t = e[0],
        n = e.pop();
      if (n !== t) {
        e[0] = n;
        e: for (var a = 0, o = e.length, r = o >>> 1; a < r; ) {
          var i = 2 * (a + 1) - 1,
            s = e[i],
            l = i + 1,
            c = e[l];
          if (0 > Wi(s, n))
            l < o && 0 > Wi(c, s)
              ? ((e[a] = c), (e[l] = n), (a = l))
              : ((e[a] = s), (e[i] = n), (a = i));
          else if (l < o && 0 > Wi(c, n)) ((e[a] = c), (e[l] = n), (a = l));
          else break e;
        }
      }
      return t;
    }
    function Wi(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return n !== 0 ? n : e.id - t.id;
    }
    ue.unstable_now = void 0;
    typeof performance == 'object' && typeof performance.now == 'function'
      ? ((jh = performance),
        (ue.unstable_now = function () {
          return jh.now();
        }))
      : ((tu = Date),
        (Gh = tu.now()),
        (ue.unstable_now = function () {
          return tu.now() - Gh;
        }));
    var jh,
      tu,
      Gh,
      jt = [],
      wn = [],
      Z1 = 1,
      ft = null,
      Be = 3,
      ru = !1,
      ur = !1,
      fr = !1,
      iu = !1,
      Kh = typeof setTimeout == 'function' ? setTimeout : null,
      Jh = typeof clearTimeout == 'function' ? clearTimeout : null,
      Xh = typeof setImmediate < 'u' ? setImmediate : null;
    function Fi(e) {
      for (var t = Yt(wn); t !== null; ) {
        if (t.callback === null) Pi(wn);
        else if (t.startTime <= e)
          (Pi(wn), (t.sortIndex = t.expirationTime), ou(jt, t));
        else break;
        t = Yt(wn);
      }
    }
    function su(e) {
      if (((fr = !1), Fi(e), !ur))
        if (Yt(jt) !== null) ((ur = !0), Ka || ((Ka = !0), Qa()));
        else {
          var t = Yt(wn);
          t !== null && lu(su, t.startTime - e);
        }
    }
    var Ka = !1,
      dr = -1,
      eg = 5,
      tg = -1;
    function ng() {
      return iu ? !0 : !(ue.unstable_now() - tg < eg);
    }
    function nu() {
      if (((iu = !1), Ka)) {
        var e = ue.unstable_now();
        tg = e;
        var t = !0;
        try {
          e: {
            ((ur = !1), fr && ((fr = !1), Jh(dr), (dr = -1)), (ru = !0));
            var n = Be;
            try {
              t: {
                for (
                  Fi(e), ft = Yt(jt);
                  ft !== null && !(ft.expirationTime > e && ng());
                ) {
                  var a = ft.callback;
                  if (typeof a == 'function') {
                    ((ft.callback = null), (Be = ft.priorityLevel));
                    var o = a(ft.expirationTime <= e);
                    if (((e = ue.unstable_now()), typeof o == 'function')) {
                      ((ft.callback = o), Fi(e), (t = !0));
                      break t;
                    }
                    (ft === Yt(jt) && Pi(jt), Fi(e));
                  } else Pi(jt);
                  ft = Yt(jt);
                }
                if (ft !== null) t = !0;
                else {
                  var r = Yt(wn);
                  (r !== null && lu(su, r.startTime - e), (t = !1));
                }
              }
              break e;
            } finally {
              ((ft = null), (Be = n), (ru = !1));
            }
            t = void 0;
          }
        } finally {
          t ? Qa() : (Ka = !1);
        }
      }
    }
    var Qa;
    typeof Xh == 'function'
      ? (Qa = function () {
          Xh(nu);
        })
      : typeof MessageChannel < 'u'
        ? ((au = new MessageChannel()),
          (Qh = au.port2),
          (au.port1.onmessage = nu),
          (Qa = function () {
            Qh.postMessage(null);
          }))
        : (Qa = function () {
            Kh(nu, 0);
          });
    var au, Qh;
    function lu(e, t) {
      dr = Kh(function () {
        e(ue.unstable_now());
      }, t);
    }
    ue.unstable_IdlePriority = 5;
    ue.unstable_ImmediatePriority = 1;
    ue.unstable_LowPriority = 4;
    ue.unstable_NormalPriority = 3;
    ue.unstable_Profiling = null;
    ue.unstable_UserBlockingPriority = 2;
    ue.unstable_cancelCallback = function (e) {
      e.callback = null;
    };
    ue.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
          )
        : (eg = 0 < e ? Math.floor(1e3 / e) : 5);
    };
    ue.unstable_getCurrentPriorityLevel = function () {
      return Be;
    };
    ue.unstable_next = function (e) {
      switch (Be) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = Be;
      }
      var n = Be;
      Be = t;
      try {
        return e();
      } finally {
        Be = n;
      }
    };
    ue.unstable_requestPaint = function () {
      iu = !0;
    };
    ue.unstable_runWithPriority = function (e, t) {
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
      var n = Be;
      Be = e;
      try {
        return t();
      } finally {
        Be = n;
      }
    };
    ue.unstable_scheduleCallback = function (e, t, n) {
      var a = ue.unstable_now();
      switch (
        (typeof n == 'object' && n !== null
          ? ((n = n.delay), (n = typeof n == 'number' && 0 < n ? a + n : a))
          : (n = a),
        e)
      ) {
        case 1:
          var o = -1;
          break;
        case 2:
          o = 250;
          break;
        case 5:
          o = 1073741823;
          break;
        case 4:
          o = 1e4;
          break;
        default:
          o = 5e3;
      }
      return (
        (o = n + o),
        (e = {
          id: Z1++,
          callback: t,
          priorityLevel: e,
          startTime: n,
          expirationTime: o,
          sortIndex: -1,
        }),
        n > a
          ? ((e.sortIndex = n),
            ou(wn, e),
            Yt(jt) === null &&
              e === Yt(wn) &&
              (fr ? (Jh(dr), (dr = -1)) : (fr = !0), lu(su, n - a)))
          : ((e.sortIndex = o),
            ou(jt, e),
            ur || ru || ((ur = !0), Ka || ((Ka = !0), Qa()))),
        e
      );
    };
    ue.unstable_shouldYield = ng;
    ue.unstable_wrapCallback = function (e) {
      var t = Be;
      return function () {
        var n = Be;
        Be = t;
        try {
          return e.apply(this, arguments);
        } finally {
          Be = n;
        }
      };
    };
  });
  var rg = Ut((BR, og) => {
    'use strict';
    og.exports = ag();
  });
  var pg = Ut((U) => {
    'use strict';
    var fu = Symbol.for('react.transitional.element'),
      W1 = Symbol.for('react.portal'),
      F1 = Symbol.for('react.fragment'),
      P1 = Symbol.for('react.strict_mode'),
      q1 = Symbol.for('react.profiler'),
      V1 = Symbol.for('react.consumer'),
      j1 = Symbol.for('react.context'),
      G1 = Symbol.for('react.forward_ref'),
      X1 = Symbol.for('react.suspense'),
      Q1 = Symbol.for('react.memo'),
      ug = Symbol.for('react.lazy'),
      K1 = Symbol.for('react.activity'),
      ig = Symbol.iterator;
    function J1(e) {
      return e === null || typeof e != 'object'
        ? null
        : ((e = (ig && e[ig]) || e['@@iterator']),
          typeof e == 'function' ? e : null);
    }
    var fg = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      dg = Object.assign,
      mg = {};
    function eo(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = mg),
        (this.updater = n || fg));
    }
    eo.prototype.isReactComponent = {};
    eo.prototype.setState = function (e, t) {
      if (typeof e != 'object' && typeof e != 'function' && e != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.',
        );
      this.updater.enqueueSetState(this, e, t, 'setState');
    };
    eo.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
    };
    function hg() {}
    hg.prototype = eo.prototype;
    function du(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = mg),
        (this.updater = n || fg));
    }
    var mu = (du.prototype = new hg());
    mu.constructor = du;
    dg(mu, eo.prototype);
    mu.isPureReactComponent = !0;
    var sg = Array.isArray;
    function uu() {}
    var oe = { H: null, A: null, T: null, S: null },
      gg = Object.prototype.hasOwnProperty;
    function hu(e, t, n) {
      var a = n.ref;
      return {
        $$typeof: fu,
        type: e,
        key: t,
        ref: a !== void 0 ? a : null,
        props: n,
      };
    }
    function eD(e, t) {
      return hu(e.type, t, e.props);
    }
    function gu(e) {
      return typeof e == 'object' && e !== null && e.$$typeof === fu;
    }
    function tD(e) {
      var t = { '=': '=0', ':': '=2' };
      return (
        '$' +
        e.replace(/[=:]/g, function (n) {
          return t[n];
        })
      );
    }
    var lg = /\/+/g;
    function cu(e, t) {
      return typeof e == 'object' && e !== null && e.key != null
        ? tD('' + e.key)
        : t.toString(36);
    }
    function nD(e) {
      switch (e.status) {
        case 'fulfilled':
          return e.value;
        case 'rejected':
          throw e.reason;
        default:
          switch (
            (typeof e.status == 'string'
              ? e.then(uu, uu)
              : ((e.status = 'pending'),
                e.then(
                  function (t) {
                    e.status === 'pending' &&
                      ((e.status = 'fulfilled'), (e.value = t));
                  },
                  function (t) {
                    e.status === 'pending' &&
                      ((e.status = 'rejected'), (e.reason = t));
                  },
                )),
            e.status)
          ) {
            case 'fulfilled':
              return e.value;
            case 'rejected':
              throw e.reason;
          }
      }
      throw e;
    }
    function Ja(e, t, n, a, o) {
      var r = typeof e;
      (r === 'undefined' || r === 'boolean') && (e = null);
      var i = !1;
      if (e === null) i = !0;
      else
        switch (r) {
          case 'bigint':
          case 'string':
          case 'number':
            i = !0;
            break;
          case 'object':
            switch (e.$$typeof) {
              case fu:
              case W1:
                i = !0;
                break;
              case ug:
                return ((i = e._init), Ja(i(e._payload), t, n, a, o));
            }
        }
      if (i)
        return (
          (o = o(e)),
          (i = a === '' ? '.' + cu(e, 0) : a),
          sg(o)
            ? ((n = ''),
              i != null && (n = i.replace(lg, '$&/') + '/'),
              Ja(o, t, n, '', function (c) {
                return c;
              }))
            : o != null &&
              (gu(o) &&
                (o = eD(
                  o,
                  n +
                    (o.key == null || (e && e.key === o.key)
                      ? ''
                      : ('' + o.key).replace(lg, '$&/') + '/') +
                    i,
                )),
              t.push(o)),
          1
        );
      i = 0;
      var s = a === '' ? '.' : a + ':';
      if (sg(e))
        for (var l = 0; l < e.length; l++)
          ((a = e[l]), (r = s + cu(a, l)), (i += Ja(a, t, n, r, o)));
      else if (((l = J1(e)), typeof l == 'function'))
        for (e = l.call(e), l = 0; !(a = e.next()).done; )
          ((a = a.value), (r = s + cu(a, l++)), (i += Ja(a, t, n, r, o)));
      else if (r === 'object') {
        if (typeof e.then == 'function') return Ja(nD(e), t, n, a, o);
        throw (
          (t = String(e)),
          Error(
            'Objects are not valid as a React child (found: ' +
              (t === '[object Object]'
                ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                : t) +
              '). If you meant to render a collection of children, use an array instead.',
          )
        );
      }
      return i;
    }
    function qi(e, t, n) {
      if (e == null) return e;
      var a = [],
        o = 0;
      return (
        Ja(e, a, '', '', function (r) {
          return t.call(n, r, o++);
        }),
        a
      );
    }
    function aD(e) {
      if (e._status === -1) {
        var t = e._result;
        ((t = t()),
          t.then(
            function (n) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 1), (e._result = n));
            },
            function (n) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 2), (e._result = n));
            },
          ),
          e._status === -1 && ((e._status = 0), (e._result = t)));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var cg =
        typeof reportError == 'function'
          ? reportError
          : function (e) {
              if (
                typeof window == 'object' &&
                typeof window.ErrorEvent == 'function'
              ) {
                var t = new window.ErrorEvent('error', {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof e == 'object' &&
                    e !== null &&
                    typeof e.message == 'string'
                      ? String(e.message)
                      : String(e),
                  error: e,
                });
                if (!window.dispatchEvent(t)) return;
              } else if (
                typeof process == 'object' &&
                typeof process.emit == 'function'
              ) {
                process.emit('uncaughtException', e);
                return;
              }
              console.error(e);
            },
      oD = {
        map: qi,
        forEach: function (e, t, n) {
          qi(
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
            qi(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            qi(e, function (t) {
              return t;
            }) || []
          );
        },
        only: function (e) {
          if (!gu(e))
            throw Error(
              'React.Children.only expected to receive a single React element child.',
            );
          return e;
        },
      };
    U.Activity = K1;
    U.Children = oD;
    U.Component = eo;
    U.Fragment = F1;
    U.Profiler = q1;
    U.PureComponent = du;
    U.StrictMode = P1;
    U.Suspense = X1;
    U.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = oe;
    U.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (e) {
        return oe.H.useMemoCache(e);
      },
    };
    U.cache = function (e) {
      return function () {
        return e.apply(null, arguments);
      };
    };
    U.cacheSignal = function () {
      return null;
    };
    U.cloneElement = function (e, t, n) {
      if (e == null)
        throw Error(
          'The argument must be a React element, but you passed ' + e + '.',
        );
      var a = dg({}, e.props),
        o = e.key;
      if (t != null)
        for (r in (t.key !== void 0 && (o = '' + t.key), t))
          !gg.call(t, r) ||
            r === 'key' ||
            r === '__self' ||
            r === '__source' ||
            (r === 'ref' && t.ref === void 0) ||
            (a[r] = t[r]);
      var r = arguments.length - 2;
      if (r === 1) a.children = n;
      else if (1 < r) {
        for (var i = Array(r), s = 0; s < r; s++) i[s] = arguments[s + 2];
        a.children = i;
      }
      return hu(e.type, o, a);
    };
    U.createContext = function (e) {
      return (
        (e = {
          $$typeof: j1,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (e.Provider = e),
        (e.Consumer = { $$typeof: V1, _context: e }),
        e
      );
    };
    U.createElement = function (e, t, n) {
      var a,
        o = {},
        r = null;
      if (t != null)
        for (a in (t.key !== void 0 && (r = '' + t.key), t))
          gg.call(t, a) &&
            a !== 'key' &&
            a !== '__self' &&
            a !== '__source' &&
            (o[a] = t[a]);
      var i = arguments.length - 2;
      if (i === 1) o.children = n;
      else if (1 < i) {
        for (var s = Array(i), l = 0; l < i; l++) s[l] = arguments[l + 2];
        o.children = s;
      }
      if (e && e.defaultProps)
        for (a in ((i = e.defaultProps), i)) o[a] === void 0 && (o[a] = i[a]);
      return hu(e, r, o);
    };
    U.createRef = function () {
      return { current: null };
    };
    U.forwardRef = function (e) {
      return { $$typeof: G1, render: e };
    };
    U.isValidElement = gu;
    U.lazy = function (e) {
      return { $$typeof: ug, _payload: { _status: -1, _result: e }, _init: aD };
    };
    U.memo = function (e, t) {
      return { $$typeof: Q1, type: e, compare: t === void 0 ? null : t };
    };
    U.startTransition = function (e) {
      var t = oe.T,
        n = {};
      oe.T = n;
      try {
        var a = e(),
          o = oe.S;
        (o !== null && o(n, a),
          typeof a == 'object' &&
            a !== null &&
            typeof a.then == 'function' &&
            a.then(uu, cg));
      } catch (r) {
        cg(r);
      } finally {
        (t !== null && n.types !== null && (t.types = n.types), (oe.T = t));
      }
    };
    U.unstable_useCacheRefresh = function () {
      return oe.H.useCacheRefresh();
    };
    U.use = function (e) {
      return oe.H.use(e);
    };
    U.useActionState = function (e, t, n) {
      return oe.H.useActionState(e, t, n);
    };
    U.useCallback = function (e, t) {
      return oe.H.useCallback(e, t);
    };
    U.useContext = function (e) {
      return oe.H.useContext(e);
    };
    U.useDebugValue = function () {};
    U.useDeferredValue = function (e, t) {
      return oe.H.useDeferredValue(e, t);
    };
    U.useEffect = function (e, t) {
      return oe.H.useEffect(e, t);
    };
    U.useEffectEvent = function (e) {
      return oe.H.useEffectEvent(e);
    };
    U.useId = function () {
      return oe.H.useId();
    };
    U.useImperativeHandle = function (e, t, n) {
      return oe.H.useImperativeHandle(e, t, n);
    };
    U.useInsertionEffect = function (e, t) {
      return oe.H.useInsertionEffect(e, t);
    };
    U.useLayoutEffect = function (e, t) {
      return oe.H.useLayoutEffect(e, t);
    };
    U.useMemo = function (e, t) {
      return oe.H.useMemo(e, t);
    };
    U.useOptimistic = function (e, t) {
      return oe.H.useOptimistic(e, t);
    };
    U.useReducer = function (e, t, n) {
      return oe.H.useReducer(e, t, n);
    };
    U.useRef = function (e) {
      return oe.H.useRef(e);
    };
    U.useState = function (e) {
      return oe.H.useState(e);
    };
    U.useSyncExternalStore = function (e, t, n) {
      return oe.H.useSyncExternalStore(e, t, n);
    };
    U.useTransition = function () {
      return oe.H.useTransition();
    };
    U.version = '19.2.8';
  });
  var dt = Ut((zR, yg) => {
    'use strict';
    yg.exports = pg();
  });
  var bg = Ut((Le) => {
    'use strict';
    var rD = dt();
    function vg(e) {
      var t = 'https://react.dev/errors/' + e;
      if (1 < arguments.length) {
        t += '?args[]=' + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += '&args[]=' + encodeURIComponent(arguments[n]);
      }
      return (
        'Minified React error #' +
        e +
        '; visit ' +
        t +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
      );
    }
    function Rn() {}
    var ze = {
        d: {
          f: Rn,
          r: function () {
            throw Error(vg(522));
          },
          D: Rn,
          C: Rn,
          L: Rn,
          m: Rn,
          X: Rn,
          S: Rn,
          M: Rn,
        },
        p: 0,
        findDOMNode: null,
      },
      iD = Symbol.for('react.portal');
    function sD(e, t, n) {
      var a =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: iD,
        key: a == null ? null : '' + a,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    var mr = rD.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function Vi(e, t) {
      if (e === 'font') return '';
      if (typeof t == 'string') return t === 'use-credentials' ? t : '';
    }
    Le.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ze;
    Le.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
        throw Error(vg(299));
      return sD(e, t, null, n);
    };
    Le.flushSync = function (e) {
      var t = mr.T,
        n = ze.p;
      try {
        if (((mr.T = null), (ze.p = 2), e)) return e();
      } finally {
        ((mr.T = t), (ze.p = n), ze.d.f());
      }
    };
    Le.preconnect = function (e, t) {
      typeof e == 'string' &&
        (t
          ? ((t = t.crossOrigin),
            (t =
              typeof t == 'string'
                ? t === 'use-credentials'
                  ? t
                  : ''
                : void 0))
          : (t = null),
        ze.d.C(e, t));
    };
    Le.prefetchDNS = function (e) {
      typeof e == 'string' && ze.d.D(e);
    };
    Le.preinit = function (e, t) {
      if (typeof e == 'string' && t && typeof t.as == 'string') {
        var n = t.as,
          a = Vi(n, t.crossOrigin),
          o = typeof t.integrity == 'string' ? t.integrity : void 0,
          r = typeof t.fetchPriority == 'string' ? t.fetchPriority : void 0;
        n === 'style'
          ? ze.d.S(e, typeof t.precedence == 'string' ? t.precedence : void 0, {
              crossOrigin: a,
              integrity: o,
              fetchPriority: r,
            })
          : n === 'script' &&
            ze.d.X(e, {
              crossOrigin: a,
              integrity: o,
              fetchPriority: r,
              nonce: typeof t.nonce == 'string' ? t.nonce : void 0,
            });
      }
    };
    Le.preinitModule = function (e, t) {
      if (typeof e == 'string')
        if (typeof t == 'object' && t !== null) {
          if (t.as == null || t.as === 'script') {
            var n = Vi(t.as, t.crossOrigin);
            ze.d.M(e, {
              crossOrigin: n,
              integrity: typeof t.integrity == 'string' ? t.integrity : void 0,
              nonce: typeof t.nonce == 'string' ? t.nonce : void 0,
            });
          }
        } else t == null && ze.d.M(e);
    };
    Le.preload = function (e, t) {
      if (
        typeof e == 'string' &&
        typeof t == 'object' &&
        t !== null &&
        typeof t.as == 'string'
      ) {
        var n = t.as,
          a = Vi(n, t.crossOrigin);
        ze.d.L(e, n, {
          crossOrigin: a,
          integrity: typeof t.integrity == 'string' ? t.integrity : void 0,
          nonce: typeof t.nonce == 'string' ? t.nonce : void 0,
          type: typeof t.type == 'string' ? t.type : void 0,
          fetchPriority:
            typeof t.fetchPriority == 'string' ? t.fetchPriority : void 0,
          referrerPolicy:
            typeof t.referrerPolicy == 'string' ? t.referrerPolicy : void 0,
          imageSrcSet:
            typeof t.imageSrcSet == 'string' ? t.imageSrcSet : void 0,
          imageSizes: typeof t.imageSizes == 'string' ? t.imageSizes : void 0,
          media: typeof t.media == 'string' ? t.media : void 0,
        });
      }
    };
    Le.preloadModule = function (e, t) {
      if (typeof e == 'string')
        if (t) {
          var n = Vi(t.as, t.crossOrigin);
          ze.d.m(e, {
            as: typeof t.as == 'string' && t.as !== 'script' ? t.as : void 0,
            crossOrigin: n,
            integrity: typeof t.integrity == 'string' ? t.integrity : void 0,
          });
        } else ze.d.m(e);
    };
    Le.requestFormReset = function (e) {
      ze.d.r(e);
    };
    Le.unstable_batchedUpdates = function (e, t) {
      return e(t);
    };
    Le.useFormState = function (e, t, n) {
      return mr.H.useFormState(e, t, n);
    };
    Le.useFormStatus = function () {
      return mr.H.useHostTransitionStatus();
    };
    Le.version = '19.2.8';
  });
  var to = Ut((ZR, Tg) => {
    'use strict';
    function Sg() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sg);
        } catch (e) {
          console.error(e);
        }
    }
    (Sg(), (Tg.exports = bg()));
  });
  var Ib = Ut((vl) => {
    'use strict';
    var Ne = rg(),
      Vp = dt(),
      lD = to();
    function M(e) {
      var t = 'https://react.dev/errors/' + e;
      if (1 < arguments.length) {
        t += '?args[]=' + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += '&args[]=' + encodeURIComponent(arguments[n]);
      }
      return (
        'Minified React error #' +
        e +
        '; visit ' +
        t +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
      );
    }
    function jp(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function Jr(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
        while (e);
      }
      return t.tag === 3 ? n : null;
    }
    function Gp(e) {
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
    function Xp(e) {
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
    function Dg(e) {
      if (Jr(e) !== e) throw Error(M(188));
    }
    function cD(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = Jr(e)), t === null)) throw Error(M(188));
        return t !== e ? null : e;
      }
      for (var n = e, a = t; ; ) {
        var o = n.return;
        if (o === null) break;
        var r = o.alternate;
        if (r === null) {
          if (((a = o.return), a !== null)) {
            n = a;
            continue;
          }
          break;
        }
        if (o.child === r.child) {
          for (r = o.child; r; ) {
            if (r === n) return (Dg(o), e);
            if (r === a) return (Dg(o), t);
            r = r.sibling;
          }
          throw Error(M(188));
        }
        if (n.return !== a.return) ((n = o), (a = r));
        else {
          for (var i = !1, s = o.child; s; ) {
            if (s === n) {
              ((i = !0), (n = o), (a = r));
              break;
            }
            if (s === a) {
              ((i = !0), (a = o), (n = r));
              break;
            }
            s = s.sibling;
          }
          if (!i) {
            for (s = r.child; s; ) {
              if (s === n) {
                ((i = !0), (n = r), (a = o));
                break;
              }
              if (s === a) {
                ((i = !0), (a = r), (n = o));
                break;
              }
              s = s.sibling;
            }
            if (!i) throw Error(M(189));
          }
        }
        if (n.alternate !== a) throw Error(M(190));
      }
      if (n.tag !== 3) throw Error(M(188));
      return n.stateNode.current === n ? e : t;
    }
    function Qp(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (((t = Qp(e)), t !== null)) return t;
        e = e.sibling;
      }
      return null;
    }
    var se = Object.assign,
      uD = Symbol.for('react.element'),
      ji = Symbol.for('react.transitional.element'),
      Tr = Symbol.for('react.portal'),
      so = Symbol.for('react.fragment'),
      Kp = Symbol.for('react.strict_mode'),
      Gu = Symbol.for('react.profiler'),
      Jp = Symbol.for('react.consumer'),
      nn = Symbol.for('react.context'),
      Pf = Symbol.for('react.forward_ref'),
      Xu = Symbol.for('react.suspense'),
      Qu = Symbol.for('react.suspense_list'),
      qf = Symbol.for('react.memo'),
      $n = Symbol.for('react.lazy'),
      Ku = Symbol.for('react.activity'),
      fD = Symbol.for('react.memo_cache_sentinel'),
      Mg = Symbol.iterator;
    function hr(e) {
      return e === null || typeof e != 'object'
        ? null
        : ((e = (Mg && e[Mg]) || e['@@iterator']),
          typeof e == 'function' ? e : null);
    }
    var dD = Symbol.for('react.client.reference');
    function Ju(e) {
      if (e == null) return null;
      if (typeof e == 'function')
        return e.$$typeof === dD ? null : e.displayName || e.name || null;
      if (typeof e == 'string') return e;
      switch (e) {
        case so:
          return 'Fragment';
        case Gu:
          return 'Profiler';
        case Kp:
          return 'StrictMode';
        case Xu:
          return 'Suspense';
        case Qu:
          return 'SuspenseList';
        case Ku:
          return 'Activity';
      }
      if (typeof e == 'object')
        switch (e.$$typeof) {
          case Tr:
            return 'Portal';
          case nn:
            return e.displayName || 'Context';
          case Jp:
            return (e._context.displayName || 'Context') + '.Consumer';
          case Pf:
            var t = e.render;
            return (
              (e = e.displayName),
              e ||
                ((e = t.displayName || t.name || ''),
                (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
              e
            );
          case qf:
            return (
              (t = e.displayName || null),
              t !== null ? t : Ju(e.type) || 'Memo'
            );
          case $n:
            ((t = e._payload), (e = e._init));
            try {
              return Ju(e(t));
            } catch {}
        }
      return null;
    }
    var Dr = Array.isArray,
      H = Vp.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      q = lD.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      ya = { pending: !1, data: null, method: null, action: null },
      ef = [],
      lo = -1;
    function Lt(e) {
      return { current: e };
    }
    function $e(e) {
      0 > lo || ((e.current = ef[lo]), (ef[lo] = null), lo--);
    }
    function ae(e, t) {
      (lo++, (ef[lo] = e.current), (e.current = t));
    }
    var zt = Lt(null),
      _r = Lt(null),
      Ln = Lt(null),
      Ns = Lt(null);
    function ws(e, t) {
      switch ((ae(Ln, t), ae(_r, e), ae(zt, null), t.nodeType)) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? $p(e) : 0;
          break;
        default:
          if (((e = t.tagName), (t = t.namespaceURI)))
            ((t = $p(t)), (e = bb(t, e)));
          else
            switch (e) {
              case 'svg':
                e = 1;
                break;
              case 'math':
                e = 2;
                break;
              default:
                e = 0;
            }
      }
      ($e(zt), ae(zt, e));
    }
    function No() {
      ($e(zt), $e(_r), $e(Ln));
    }
    function tf(e) {
      e.memoizedState !== null && ae(Ns, e);
      var t = zt.current,
        n = bb(t, e.type);
      t !== n && (ae(_r, e), ae(zt, n));
    }
    function Rs(e) {
      (_r.current === e && ($e(zt), $e(_r)),
        Ns.current === e && ($e(Ns), (Xr._currentValue = ya)));
    }
    var pu, Eg;
    function ma(e) {
      if (pu === void 0)
        try {
          throw Error();
        } catch (n) {
          var t = n.stack.trim().match(/\n( *(at )?)/);
          ((pu = (t && t[1]) || ''),
            (Eg =
              -1 <
              n.stack.indexOf(`
    at`)
                ? ' (<anonymous>)'
                : -1 < n.stack.indexOf('@')
                  ? '@unknown:0:0'
                  : ''));
        }
      return (
        `
` +
        pu +
        e +
        Eg
      );
    }
    var yu = !1;
    function vu(e, t) {
      if (!e || yu) return '';
      yu = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var a = {
          DetermineComponentFrameRoot: function () {
            try {
              if (t) {
                var d = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(d.prototype, 'props', {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == 'object' && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(d, []);
                  } catch (m) {
                    var f = m;
                  }
                  Reflect.construct(e, [], d);
                } else {
                  try {
                    d.call();
                  } catch (m) {
                    f = m;
                  }
                  e.call(d.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (m) {
                  f = m;
                }
                (d = e()) &&
                  typeof d.catch == 'function' &&
                  d.catch(function () {});
              }
            } catch (m) {
              if (m && f && typeof m.stack == 'string')
                return [m.stack, f.stack];
            }
            return [null, null];
          },
        };
        a.DetermineComponentFrameRoot.displayName =
          'DetermineComponentFrameRoot';
        var o = Object.getOwnPropertyDescriptor(
          a.DetermineComponentFrameRoot,
          'name',
        );
        o &&
          o.configurable &&
          Object.defineProperty(a.DetermineComponentFrameRoot, 'name', {
            value: 'DetermineComponentFrameRoot',
          });
        var r = a.DetermineComponentFrameRoot(),
          i = r[0],
          s = r[1];
        if (i && s) {
          var l = i.split(`
`),
            c = s.split(`
`);
          for (
            o = a = 0;
            a < l.length && !l[a].includes('DetermineComponentFrameRoot');
          )
            a++;
          for (
            ;
            o < c.length && !c[o].includes('DetermineComponentFrameRoot');
          )
            o++;
          if (a === l.length || o === c.length)
            for (
              a = l.length - 1, o = c.length - 1;
              1 <= a && 0 <= o && l[a] !== c[o];
            )
              o--;
          for (; 1 <= a && 0 <= o; a--, o--)
            if (l[a] !== c[o]) {
              if (a !== 1 || o !== 1)
                do
                  if ((a--, o--, 0 > o || l[a] !== c[o])) {
                    var u =
                      `
` + l[a].replace(' at new ', ' at ');
                    return (
                      e.displayName &&
                        u.includes('<anonymous>') &&
                        (u = u.replace('<anonymous>', e.displayName)),
                      u
                    );
                  }
                while (1 <= a && 0 <= o);
              break;
            }
        }
      } finally {
        ((yu = !1), (Error.prepareStackTrace = n));
      }
      return (n = e ? e.displayName || e.name : '') ? ma(n) : '';
    }
    function mD(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return ma(e.type);
        case 16:
          return ma('Lazy');
        case 13:
          return e.child !== t && t !== null
            ? ma('Suspense Fallback')
            : ma('Suspense');
        case 19:
          return ma('SuspenseList');
        case 0:
        case 15:
          return vu(e.type, !1);
        case 11:
          return vu(e.type.render, !1);
        case 1:
          return vu(e.type, !0);
        case 31:
          return ma('Activity');
        default:
          return '';
      }
    }
    function Og(e) {
      try {
        var t = '',
          n = null;
        do ((t += mD(e, n)), (n = e), (e = e.return));
        while (e);
        return t;
      } catch (a) {
        return (
          `
Error generating stack: ` +
          a.message +
          `
` +
          a.stack
        );
      }
    }
    var nf = Object.prototype.hasOwnProperty,
      Vf = Ne.unstable_scheduleCallback,
      bu = Ne.unstable_cancelCallback,
      hD = Ne.unstable_shouldYield,
      gD = Ne.unstable_requestPaint,
      ot = Ne.unstable_now,
      pD = Ne.unstable_getCurrentPriorityLevel,
      ey = Ne.unstable_ImmediatePriority,
      ty = Ne.unstable_UserBlockingPriority,
      $s = Ne.unstable_NormalPriority,
      yD = Ne.unstable_LowPriority,
      ny = Ne.unstable_IdlePriority,
      vD = Ne.log,
      bD = Ne.unstable_setDisableYieldValue,
      ei = null,
      rt = null;
    function Yn(e) {
      if (
        (typeof vD == 'function' && bD(e),
        rt && typeof rt.setStrictMode == 'function')
      )
        try {
          rt.setStrictMode(ei, e);
        } catch {}
    }
    var it = Math.clz32 ? Math.clz32 : DD,
      SD = Math.log,
      TD = Math.LN2;
    function DD(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((SD(e) / TD) | 0)) | 0);
    }
    var Gi = 256,
      Xi = 262144,
      Qi = 4194304;
    function ha(e) {
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
    function nl(e, t, n) {
      var a = e.pendingLanes;
      if (a === 0) return 0;
      var o = 0,
        r = e.suspendedLanes,
        i = e.pingedLanes;
      e = e.warmLanes;
      var s = a & 134217727;
      return (
        s !== 0
          ? ((a = s & ~r),
            a !== 0
              ? (o = ha(a))
              : ((i &= s),
                i !== 0
                  ? (o = ha(i))
                  : n || ((n = s & ~e), n !== 0 && (o = ha(n)))))
          : ((s = a & ~r),
            s !== 0
              ? (o = ha(s))
              : i !== 0
                ? (o = ha(i))
                : n || ((n = a & ~e), n !== 0 && (o = ha(n)))),
        o === 0
          ? 0
          : t !== 0 &&
              t !== o &&
              (t & r) === 0 &&
              ((r = o & -o),
              (n = t & -t),
              r >= n || (r === 32 && (n & 4194048) !== 0))
            ? t
            : o
      );
    }
    function ti(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function MD(e, t) {
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
    function ay() {
      var e = Qi;
      return ((Qi <<= 1), (Qi & 62914560) === 0 && (Qi = 4194304), e);
    }
    function Su(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function ni(e, t) {
      ((e.pendingLanes |= t),
        t !== 268435456 &&
          ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
    }
    function ED(e, t, n, a, o, r) {
      var i = e.pendingLanes;
      ((e.pendingLanes = n),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.warmLanes = 0),
        (e.expiredLanes &= n),
        (e.entangledLanes &= n),
        (e.errorRecoveryDisabledLanes &= n),
        (e.shellSuspendCounter = 0));
      var s = e.entanglements,
        l = e.expirationTimes,
        c = e.hiddenUpdates;
      for (n = i & ~n; 0 < n; ) {
        var u = 31 - it(n),
          d = 1 << u;
        ((s[u] = 0), (l[u] = -1));
        var f = c[u];
        if (f !== null)
          for (c[u] = null, u = 0; u < f.length; u++) {
            var m = f[u];
            m !== null && (m.lane &= -536870913);
          }
        n &= ~d;
      }
      (a !== 0 && oy(e, a, 0),
        r !== 0 &&
          o === 0 &&
          e.tag !== 0 &&
          (e.suspendedLanes |= r & ~(i & ~t)));
    }
    function oy(e, t, n) {
      ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
      var a = 31 - it(t);
      ((e.entangledLanes |= t),
        (e.entanglements[a] = e.entanglements[a] | 1073741824 | (n & 261930)));
    }
    function ry(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n; ) {
        var a = 31 - it(n),
          o = 1 << a;
        ((o & t) | (e[a] & t) && (e[a] |= t), (n &= ~o));
      }
    }
    function iy(e, t) {
      var n = t & -t;
      return (
        (n = (n & 42) !== 0 ? 1 : jf(n)),
        (n & (e.suspendedLanes | t)) !== 0 ? 0 : n
      );
    }
    function jf(e) {
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
    function Gf(e) {
      return (
        (e &= -e),
        2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
      );
    }
    function sy() {
      var e = q.p;
      return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : $b(e.type));
    }
    function Cg(e, t) {
      var n = q.p;
      try {
        return ((q.p = e), t());
      } finally {
        q.p = n;
      }
    }
    var ea = Math.random().toString(36).slice(2),
      He = '__reactFiber$' + ea,
      Ge = '__reactProps$' + ea,
      Bo = '__reactContainer$' + ea,
      af = '__reactEvents$' + ea,
      OD = '__reactListeners$' + ea,
      CD = '__reactHandles$' + ea,
      Ng = '__reactResources$' + ea,
      ai = '__reactMarker$' + ea;
    function Xf(e) {
      (delete e[He], delete e[Ge], delete e[af], delete e[OD], delete e[CD]);
    }
    function co(e) {
      var t = e[He];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[Bo] || n[He])) {
          if (
            ((n = t.alternate),
            t.child !== null || (n !== null && n.child !== null))
          )
            for (e = Up(e); e !== null; ) {
              if ((n = e[He])) return n;
              e = Up(e);
            }
          return t;
        }
        ((e = n), (n = e.parentNode));
      }
      return null;
    }
    function _o(e) {
      if ((e = e[He] || e[Bo])) {
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
    function Mr(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
      throw Error(M(33));
    }
    function So(e) {
      var t = e[Ng];
      return (
        t ||
          (t = e[Ng] =
            { hoistableStyles: new Map(), hoistableScripts: new Map() }),
        t
      );
    }
    function Re(e) {
      e[ai] = !0;
    }
    var ly = new Set(),
      cy = {};
    function Na(e, t) {
      (wo(e, t), wo(e + 'Capture', t));
    }
    function wo(e, t) {
      for (cy[e] = t, e = 0; e < t.length; e++) ly.add(t[e]);
    }
    var ND = RegExp(
        '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$',
      ),
      wg = {},
      Rg = {};
    function wD(e) {
      return nf.call(Rg, e)
        ? !0
        : nf.call(wg, e)
          ? !1
          : ND.test(e)
            ? (Rg[e] = !0)
            : ((wg[e] = !0), !1);
    }
    function ds(e, t, n) {
      if (wD(t))
        if (n === null) e.removeAttribute(t);
        else {
          switch (typeof n) {
            case 'undefined':
            case 'function':
            case 'symbol':
              e.removeAttribute(t);
              return;
            case 'boolean':
              var a = t.toLowerCase().slice(0, 5);
              if (a !== 'data-' && a !== 'aria-') {
                e.removeAttribute(t);
                return;
              }
          }
          e.setAttribute(t, '' + n);
        }
    }
    function Ki(e, t, n) {
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case 'undefined':
          case 'function':
          case 'symbol':
          case 'boolean':
            e.removeAttribute(t);
            return;
        }
        e.setAttribute(t, '' + n);
      }
    }
    function Gt(e, t, n, a) {
      if (a === null) e.removeAttribute(n);
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
          case 'boolean':
            e.removeAttribute(n);
            return;
        }
        e.setAttributeNS(t, n, '' + a);
      }
    }
    function ht(e) {
      switch (typeof e) {
        case 'bigint':
        case 'boolean':
        case 'number':
        case 'string':
        case 'undefined':
          return e;
        case 'object':
          return e;
        default:
          return '';
      }
    }
    function uy(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === 'input' &&
        (t === 'checkbox' || t === 'radio')
      );
    }
    function RD(e, t, n) {
      var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      if (
        !e.hasOwnProperty(t) &&
        typeof a < 'u' &&
        typeof a.get == 'function' &&
        typeof a.set == 'function'
      ) {
        var o = a.get,
          r = a.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return o.call(this);
            },
            set: function (i) {
              ((n = '' + i), r.call(this, i));
            },
          }),
          Object.defineProperty(e, t, { enumerable: a.enumerable }),
          {
            getValue: function () {
              return n;
            },
            setValue: function (i) {
              n = '' + i;
            },
            stopTracking: function () {
              ((e._valueTracker = null), delete e[t]);
            },
          }
        );
      }
    }
    function of(e) {
      if (!e._valueTracker) {
        var t = uy(e) ? 'checked' : 'value';
        e._valueTracker = RD(e, t, '' + e[t]);
      }
    }
    function fy(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        a = '';
      return (
        e && (a = uy(e) ? (e.checked ? 'true' : 'false') : e.value),
        (e = a),
        e !== n ? (t.setValue(e), !0) : !1
      );
    }
    function xs(e) {
      if (
        ((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')
      )
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var $D = /[\n"\\]/g;
    function yt(e) {
      return e.replace($D, function (t) {
        return '\\' + t.charCodeAt(0).toString(16) + ' ';
      });
    }
    function rf(e, t, n, a, o, r, i, s) {
      ((e.name = ''),
        i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean'
          ? (e.type = i)
          : e.removeAttribute('type'),
        t != null
          ? i === 'number'
            ? ((t === 0 && e.value === '') || e.value != t) &&
              (e.value = '' + ht(t))
            : e.value !== '' + ht(t) && (e.value = '' + ht(t))
          : (i !== 'submit' && i !== 'reset') || e.removeAttribute('value'),
        t != null
          ? sf(e, i, ht(t))
          : n != null
            ? sf(e, i, ht(n))
            : a != null && e.removeAttribute('value'),
        o == null && r != null && (e.defaultChecked = !!r),
        o != null &&
          (e.checked = o && typeof o != 'function' && typeof o != 'symbol'),
        s != null &&
        typeof s != 'function' &&
        typeof s != 'symbol' &&
        typeof s != 'boolean'
          ? (e.name = '' + ht(s))
          : e.removeAttribute('name'));
    }
    function dy(e, t, n, a, o, r, i, s) {
      if (
        (r != null &&
          typeof r != 'function' &&
          typeof r != 'symbol' &&
          typeof r != 'boolean' &&
          (e.type = r),
        t != null || n != null)
      ) {
        if (!((r !== 'submit' && r !== 'reset') || t != null)) {
          of(e);
          return;
        }
        ((n = n != null ? '' + ht(n) : ''),
          (t = t != null ? '' + ht(t) : n),
          s || t === e.value || (e.value = t),
          (e.defaultValue = t));
      }
      ((a = a ?? o),
        (a = typeof a != 'function' && typeof a != 'symbol' && !!a),
        (e.checked = s ? e.checked : !!a),
        (e.defaultChecked = !!a),
        i != null &&
          typeof i != 'function' &&
          typeof i != 'symbol' &&
          typeof i != 'boolean' &&
          (e.name = i),
        of(e));
    }
    function sf(e, t, n) {
      (t === 'number' && xs(e.ownerDocument) === e) ||
        e.defaultValue === '' + n ||
        (e.defaultValue = '' + n);
    }
    function To(e, t, n, a) {
      if (((e = e.options), t)) {
        t = {};
        for (var o = 0; o < n.length; o++) t['$' + n[o]] = !0;
        for (n = 0; n < e.length; n++)
          ((o = t.hasOwnProperty('$' + e[n].value)),
            e[n].selected !== o && (e[n].selected = o),
            o && a && (e[n].defaultSelected = !0));
      } else {
        for (n = '' + ht(n), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === n) {
            ((e[o].selected = !0), a && (e[o].defaultSelected = !0));
            return;
          }
          t !== null || e[o].disabled || (t = e[o]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function my(e, t, n) {
      if (
        t != null &&
        ((t = '' + ht(t)), t !== e.value && (e.value = t), n == null)
      ) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = n != null ? '' + ht(n) : '';
    }
    function hy(e, t, n, a) {
      if (t == null) {
        if (a != null) {
          if (n != null) throw Error(M(92));
          if (Dr(a)) {
            if (1 < a.length) throw Error(M(93));
            a = a[0];
          }
          n = a;
        }
        (n == null && (n = ''), (t = n));
      }
      ((n = ht(t)),
        (e.defaultValue = n),
        (a = e.textContent),
        a === n && a !== '' && a !== null && (e.value = a),
        of(e));
    }
    function Ro(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var xD = new Set(
      'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
        ' ',
      ),
    );
    function $g(e, t, n) {
      var a = t.indexOf('--') === 0;
      n == null || typeof n == 'boolean' || n === ''
        ? a
          ? e.setProperty(t, '')
          : t === 'float'
            ? (e.cssFloat = '')
            : (e[t] = '')
        : a
          ? e.setProperty(t, n)
          : typeof n != 'number' || n === 0 || xD.has(t)
            ? t === 'float'
              ? (e.cssFloat = n)
              : (e[t] = ('' + n).trim())
            : (e[t] = n + 'px');
    }
    function gy(e, t, n) {
      if (t != null && typeof t != 'object') throw Error(M(62));
      if (((e = e.style), n != null)) {
        for (var a in n)
          !n.hasOwnProperty(a) ||
            (t != null && t.hasOwnProperty(a)) ||
            (a.indexOf('--') === 0
              ? e.setProperty(a, '')
              : a === 'float'
                ? (e.cssFloat = '')
                : (e[a] = ''));
        for (var o in t)
          ((a = t[o]), t.hasOwnProperty(o) && n[o] !== a && $g(e, o, a));
      } else for (var r in t) t.hasOwnProperty(r) && $g(e, r, t[r]);
    }
    function Qf(e) {
      if (e.indexOf('-') === -1) return !1;
      switch (e) {
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
          return !1;
        default:
          return !0;
      }
    }
    var AD = new Map([
        ['acceptCharset', 'accept-charset'],
        ['htmlFor', 'for'],
        ['httpEquiv', 'http-equiv'],
        ['crossOrigin', 'crossorigin'],
        ['accentHeight', 'accent-height'],
        ['alignmentBaseline', 'alignment-baseline'],
        ['arabicForm', 'arabic-form'],
        ['baselineShift', 'baseline-shift'],
        ['capHeight', 'cap-height'],
        ['clipPath', 'clip-path'],
        ['clipRule', 'clip-rule'],
        ['colorInterpolation', 'color-interpolation'],
        ['colorInterpolationFilters', 'color-interpolation-filters'],
        ['colorProfile', 'color-profile'],
        ['colorRendering', 'color-rendering'],
        ['dominantBaseline', 'dominant-baseline'],
        ['enableBackground', 'enable-background'],
        ['fillOpacity', 'fill-opacity'],
        ['fillRule', 'fill-rule'],
        ['floodColor', 'flood-color'],
        ['floodOpacity', 'flood-opacity'],
        ['fontFamily', 'font-family'],
        ['fontSize', 'font-size'],
        ['fontSizeAdjust', 'font-size-adjust'],
        ['fontStretch', 'font-stretch'],
        ['fontStyle', 'font-style'],
        ['fontVariant', 'font-variant'],
        ['fontWeight', 'font-weight'],
        ['glyphName', 'glyph-name'],
        ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
        ['glyphOrientationVertical', 'glyph-orientation-vertical'],
        ['horizAdvX', 'horiz-adv-x'],
        ['horizOriginX', 'horiz-origin-x'],
        ['imageRendering', 'image-rendering'],
        ['letterSpacing', 'letter-spacing'],
        ['lightingColor', 'lighting-color'],
        ['markerEnd', 'marker-end'],
        ['markerMid', 'marker-mid'],
        ['markerStart', 'marker-start'],
        ['overlinePosition', 'overline-position'],
        ['overlineThickness', 'overline-thickness'],
        ['paintOrder', 'paint-order'],
        ['panose-1', 'panose-1'],
        ['pointerEvents', 'pointer-events'],
        ['renderingIntent', 'rendering-intent'],
        ['shapeRendering', 'shape-rendering'],
        ['stopColor', 'stop-color'],
        ['stopOpacity', 'stop-opacity'],
        ['strikethroughPosition', 'strikethrough-position'],
        ['strikethroughThickness', 'strikethrough-thickness'],
        ['strokeDasharray', 'stroke-dasharray'],
        ['strokeDashoffset', 'stroke-dashoffset'],
        ['strokeLinecap', 'stroke-linecap'],
        ['strokeLinejoin', 'stroke-linejoin'],
        ['strokeMiterlimit', 'stroke-miterlimit'],
        ['strokeOpacity', 'stroke-opacity'],
        ['strokeWidth', 'stroke-width'],
        ['textAnchor', 'text-anchor'],
        ['textDecoration', 'text-decoration'],
        ['textRendering', 'text-rendering'],
        ['transformOrigin', 'transform-origin'],
        ['underlinePosition', 'underline-position'],
        ['underlineThickness', 'underline-thickness'],
        ['unicodeBidi', 'unicode-bidi'],
        ['unicodeRange', 'unicode-range'],
        ['unitsPerEm', 'units-per-em'],
        ['vAlphabetic', 'v-alphabetic'],
        ['vHanging', 'v-hanging'],
        ['vIdeographic', 'v-ideographic'],
        ['vMathematical', 'v-mathematical'],
        ['vectorEffect', 'vector-effect'],
        ['vertAdvY', 'vert-adv-y'],
        ['vertOriginX', 'vert-origin-x'],
        ['vertOriginY', 'vert-origin-y'],
        ['wordSpacing', 'word-spacing'],
        ['writingMode', 'writing-mode'],
        ['xmlnsXlink', 'xmlns:xlink'],
        ['xHeight', 'x-height'],
      ]),
      ID =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function ms(e) {
      return ID.test('' + e)
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : e;
    }
    function an() {}
    var lf = null;
    function Kf(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var uo = null,
      Do = null;
    function xg(e) {
      var t = _o(e);
      if (t && (e = t.stateNode)) {
        var n = e[Ge] || null;
        e: switch (((e = t.stateNode), t.type)) {
          case 'input':
            if (
              (rf(
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
              n.type === 'radio' && t != null)
            ) {
              for (n = e; n.parentNode; ) n = n.parentNode;
              for (
                n = n.querySelectorAll(
                  'input[name="' + yt('' + t) + '"][type="radio"]',
                ),
                  t = 0;
                t < n.length;
                t++
              ) {
                var a = n[t];
                if (a !== e && a.form === e.form) {
                  var o = a[Ge] || null;
                  if (!o) throw Error(M(90));
                  rf(
                    a,
                    o.value,
                    o.defaultValue,
                    o.defaultValue,
                    o.checked,
                    o.defaultChecked,
                    o.type,
                    o.name,
                  );
                }
              }
              for (t = 0; t < n.length; t++)
                ((a = n[t]), a.form === e.form && fy(a));
            }
            break e;
          case 'textarea':
            my(e, n.value, n.defaultValue);
            break e;
          case 'select':
            ((t = n.value), t != null && To(e, !!n.multiple, t, !1));
        }
      }
    }
    var Tu = !1;
    function py(e, t, n) {
      if (Tu) return e(t, n);
      Tu = !0;
      try {
        var a = e(t);
        return a;
      } finally {
        if (
          ((Tu = !1),
          (uo !== null || Do !== null) &&
            (hl(), uo && ((t = uo), (e = Do), (Do = uo = null), xg(t), e)))
        )
          for (t = 0; t < e.length; t++) xg(e[t]);
      }
    }
    function zr(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var a = n[Ge] || null;
      if (a === null) return null;
      n = a[t];
      e: switch (t) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
        case 'onMouseEnter':
          ((a = !a.disabled) ||
            ((e = e.type),
            (a = !(
              e === 'button' ||
              e === 'input' ||
              e === 'select' ||
              e === 'textarea'
            ))),
            (e = !a));
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && typeof n != 'function') throw Error(M(231, t, typeof n));
      return n;
    }
    var cn = !(
        typeof window > 'u' ||
        typeof window.document > 'u' ||
        typeof window.document.createElement > 'u'
      ),
      cf = !1;
    if (cn)
      try {
        ((no = {}),
          Object.defineProperty(no, 'passive', {
            get: function () {
              cf = !0;
            },
          }),
          window.addEventListener('test', no, no),
          window.removeEventListener('test', no, no));
      } catch {
        cf = !1;
      }
    var no,
      kn = null,
      Jf = null,
      hs = null;
    function yy() {
      if (hs) return hs;
      var e,
        t = Jf,
        n = t.length,
        a,
        o = 'value' in kn ? kn.value : kn.textContent,
        r = o.length;
      for (e = 0; e < n && t[e] === o[e]; e++);
      var i = n - e;
      for (a = 1; a <= i && t[n - a] === o[r - a]; a++);
      return (hs = o.slice(e, 1 < a ? 1 - a : void 0));
    }
    function gs(e) {
      var t = e.keyCode;
      return (
        'charCode' in e
          ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
          : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function Ji() {
      return !0;
    }
    function Ag() {
      return !1;
    }
    function Xe(e) {
      function t(n, a, o, r, i) {
        ((this._reactName = n),
          (this._targetInst = o),
          (this.type = a),
          (this.nativeEvent = r),
          (this.target = i),
          (this.currentTarget = null));
        for (var s in e)
          e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(r) : r[s]));
        return (
          (this.isDefaultPrevented = (
            r.defaultPrevented != null
              ? r.defaultPrevented
              : r.returnValue === !1
          )
            ? Ji
            : Ag),
          (this.isPropagationStopped = Ag),
          this
        );
      }
      return (
        se(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n &&
              (n.preventDefault
                ? n.preventDefault()
                : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
              (this.isDefaultPrevented = Ji));
          },
          stopPropagation: function () {
            var n = this.nativeEvent;
            n &&
              (n.stopPropagation
                ? n.stopPropagation()
                : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
              (this.isPropagationStopped = Ji));
          },
          persist: function () {},
          isPersistent: Ji,
        }),
        t
      );
    }
    var wa = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      al = Xe(wa),
      oi = se({}, wa, { view: 0, detail: 0 }),
      HD = Xe(oi),
      Du,
      Mu,
      gr,
      ol = se({}, oi, {
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
        getModifierState: ed,
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
          return 'movementX' in e
            ? e.movementX
            : (e !== gr &&
                (gr && e.type === 'mousemove'
                  ? ((Du = e.screenX - gr.screenX),
                    (Mu = e.screenY - gr.screenY))
                  : (Mu = Du = 0),
                (gr = e)),
              Du);
        },
        movementY: function (e) {
          return 'movementY' in e ? e.movementY : Mu;
        },
      }),
      Ig = Xe(ol),
      UD = se({}, ol, { dataTransfer: 0 }),
      YD = Xe(UD),
      kD = se({}, oi, { relatedTarget: 0 }),
      Eu = Xe(kD),
      BD = se({}, wa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      _D = Xe(BD),
      zD = se({}, wa, {
        clipboardData: function (e) {
          return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
        },
      }),
      LD = Xe(zD),
      ZD = se({}, wa, { data: 0 }),
      Hg = Xe(ZD),
      WD = {
        Esc: 'Escape',
        Spacebar: ' ',
        Left: 'ArrowLeft',
        Up: 'ArrowUp',
        Right: 'ArrowRight',
        Down: 'ArrowDown',
        Del: 'Delete',
        Win: 'OS',
        Menu: 'ContextMenu',
        Apps: 'ContextMenu',
        Scroll: 'ScrollLock',
        MozPrintableKey: 'Unidentified',
      },
      FD = {
        8: 'Backspace',
        9: 'Tab',
        12: 'Clear',
        13: 'Enter',
        16: 'Shift',
        17: 'Control',
        18: 'Alt',
        19: 'Pause',
        20: 'CapsLock',
        27: 'Escape',
        32: ' ',
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'ArrowLeft',
        38: 'ArrowUp',
        39: 'ArrowRight',
        40: 'ArrowDown',
        45: 'Insert',
        46: 'Delete',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'NumLock',
        145: 'ScrollLock',
        224: 'Meta',
      },
      PD = {
        Alt: 'altKey',
        Control: 'ctrlKey',
        Meta: 'metaKey',
        Shift: 'shiftKey',
      };
    function qD(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : (e = PD[e])
          ? !!t[e]
          : !1;
    }
    function ed() {
      return qD;
    }
    var VD = se({}, oi, {
        key: function (e) {
          if (e.key) {
            var t = WD[e.key] || e.key;
            if (t !== 'Unidentified') return t;
          }
          return e.type === 'keypress'
            ? ((e = gs(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
            : e.type === 'keydown' || e.type === 'keyup'
              ? FD[e.keyCode] || 'Unidentified'
              : '';
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: ed,
        charCode: function (e) {
          return e.type === 'keypress' ? gs(e) : 0;
        },
        keyCode: function (e) {
          return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
        },
        which: function (e) {
          return e.type === 'keypress'
            ? gs(e)
            : e.type === 'keydown' || e.type === 'keyup'
              ? e.keyCode
              : 0;
        },
      }),
      jD = Xe(VD),
      GD = se({}, ol, {
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
      Ug = Xe(GD),
      XD = se({}, oi, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: ed,
      }),
      QD = Xe(XD),
      KD = se({}, wa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      JD = Xe(KD),
      eM = se({}, ol, {
        deltaX: function (e) {
          return 'deltaX' in e
            ? e.deltaX
            : 'wheelDeltaX' in e
              ? -e.wheelDeltaX
              : 0;
        },
        deltaY: function (e) {
          return 'deltaY' in e
            ? e.deltaY
            : 'wheelDeltaY' in e
              ? -e.wheelDeltaY
              : 'wheelDelta' in e
                ? -e.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      }),
      tM = Xe(eM),
      nM = se({}, wa, { newState: 0, oldState: 0 }),
      aM = Xe(nM),
      oM = [9, 13, 27, 32],
      td = cn && 'CompositionEvent' in window,
      Cr = null;
    cn && 'documentMode' in document && (Cr = document.documentMode);
    var rM = cn && 'TextEvent' in window && !Cr,
      vy = cn && (!td || (Cr && 8 < Cr && 11 >= Cr)),
      Yg = ' ',
      kg = !1;
    function by(e, t) {
      switch (e) {
        case 'keyup':
          return oM.indexOf(t.keyCode) !== -1;
        case 'keydown':
          return t.keyCode !== 229;
        case 'keypress':
        case 'mousedown':
        case 'focusout':
          return !0;
        default:
          return !1;
      }
    }
    function Sy(e) {
      return (
        (e = e.detail),
        typeof e == 'object' && 'data' in e ? e.data : null
      );
    }
    var fo = !1;
    function iM(e, t) {
      switch (e) {
        case 'compositionend':
          return Sy(t);
        case 'keypress':
          return t.which !== 32 ? null : ((kg = !0), Yg);
        case 'textInput':
          return ((e = t.data), e === Yg && kg ? null : e);
        default:
          return null;
      }
    }
    function sM(e, t) {
      if (fo)
        return e === 'compositionend' || (!td && by(e, t))
          ? ((e = yy()), (hs = Jf = kn = null), (fo = !1), e)
          : null;
      switch (e) {
        case 'paste':
          return null;
        case 'keypress':
          if (
            !(t.ctrlKey || t.altKey || t.metaKey) ||
            (t.ctrlKey && t.altKey)
          ) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case 'compositionend':
          return vy && t.locale !== 'ko' ? null : t.data;
        default:
          return null;
      }
    }
    var lM = {
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
    function Bg(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === 'input' ? !!lM[e.type] : t === 'textarea';
    }
    function Ty(e, t, n, a) {
      (uo ? (Do ? Do.push(a) : (Do = [a])) : (uo = a),
        (t = Gs(t, 'onChange')),
        0 < t.length &&
          ((n = new al('onChange', 'change', null, n, a)),
          e.push({ event: n, listeners: t })));
    }
    var Nr = null,
      Lr = null;
    function cM(e) {
      pb(e, 0);
    }
    function rl(e) {
      var t = Mr(e);
      if (fy(t)) return e;
    }
    function _g(e, t) {
      if (e === 'change') return t;
    }
    var Dy = !1;
    cn &&
      (cn
        ? ((ts = 'oninput' in document),
          ts ||
            ((Ou = document.createElement('div')),
            Ou.setAttribute('oninput', 'return;'),
            (ts = typeof Ou.oninput == 'function')),
          (es = ts))
        : (es = !1),
      (Dy = es && (!document.documentMode || 9 < document.documentMode)));
    var es, ts, Ou;
    function zg() {
      Nr && (Nr.detachEvent('onpropertychange', My), (Lr = Nr = null));
    }
    function My(e) {
      if (e.propertyName === 'value' && rl(Lr)) {
        var t = [];
        (Ty(t, Lr, e, Kf(e)), py(cM, t));
      }
    }
    function uM(e, t, n) {
      e === 'focusin'
        ? (zg(), (Nr = t), (Lr = n), Nr.attachEvent('onpropertychange', My))
        : e === 'focusout' && zg();
    }
    function fM(e) {
      if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
        return rl(Lr);
    }
    function dM(e, t) {
      if (e === 'click') return rl(t);
    }
    function mM(e, t) {
      if (e === 'input' || e === 'change') return rl(t);
    }
    function hM(e, t) {
      return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
    }
    var lt = typeof Object.is == 'function' ? Object.is : hM;
    function Zr(e, t) {
      if (lt(e, t)) return !0;
      if (
        typeof e != 'object' ||
        e === null ||
        typeof t != 'object' ||
        t === null
      )
        return !1;
      var n = Object.keys(e),
        a = Object.keys(t);
      if (n.length !== a.length) return !1;
      for (a = 0; a < n.length; a++) {
        var o = n[a];
        if (!nf.call(t, o) || !lt(e[o], t[o])) return !1;
      }
      return !0;
    }
    function Lg(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Zg(e, t) {
      var n = Lg(e);
      e = 0;
      for (var a; n; ) {
        if (n.nodeType === 3) {
          if (((a = e + n.textContent.length), e <= t && a >= t))
            return { node: n, offset: t - e };
          e = a;
        }
        e: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break e;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = Lg(n);
      }
    }
    function Ey(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? Ey(e, t.parentNode)
              : 'contains' in e
                ? e.contains(t)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(t) & 16)
                  : !1
        : !1;
    }
    function Oy(e) {
      e =
        e != null &&
        e.ownerDocument != null &&
        e.ownerDocument.defaultView != null
          ? e.ownerDocument.defaultView
          : window;
      for (var t = xs(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == 'string';
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = xs(e.document);
      }
      return t;
    }
    function nd(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        ((t === 'input' &&
          (e.type === 'text' ||
            e.type === 'search' ||
            e.type === 'tel' ||
            e.type === 'url' ||
            e.type === 'password')) ||
          t === 'textarea' ||
          e.contentEditable === 'true')
      );
    }
    var gM = cn && 'documentMode' in document && 11 >= document.documentMode,
      mo = null,
      uf = null,
      wr = null,
      ff = !1;
    function Wg(e, t, n) {
      var a =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      ff ||
        mo == null ||
        mo !== xs(a) ||
        ((a = mo),
        'selectionStart' in a && nd(a)
          ? (a = { start: a.selectionStart, end: a.selectionEnd })
          : ((a = (
              (a.ownerDocument && a.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (a = {
              anchorNode: a.anchorNode,
              anchorOffset: a.anchorOffset,
              focusNode: a.focusNode,
              focusOffset: a.focusOffset,
            })),
        (wr && Zr(wr, a)) ||
          ((wr = a),
          (a = Gs(uf, 'onSelect')),
          0 < a.length &&
            ((t = new al('onSelect', 'select', null, t, n)),
            e.push({ event: t, listeners: a }),
            (t.target = mo))));
    }
    function da(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n['Webkit' + e] = 'webkit' + t),
        (n['Moz' + e] = 'moz' + t),
        n
      );
    }
    var ho = {
        animationend: da('Animation', 'AnimationEnd'),
        animationiteration: da('Animation', 'AnimationIteration'),
        animationstart: da('Animation', 'AnimationStart'),
        transitionrun: da('Transition', 'TransitionRun'),
        transitionstart: da('Transition', 'TransitionStart'),
        transitioncancel: da('Transition', 'TransitionCancel'),
        transitionend: da('Transition', 'TransitionEnd'),
      },
      Cu = {},
      Cy = {};
    cn &&
      ((Cy = document.createElement('div').style),
      'AnimationEvent' in window ||
        (delete ho.animationend.animation,
        delete ho.animationiteration.animation,
        delete ho.animationstart.animation),
      'TransitionEvent' in window || delete ho.transitionend.transition);
    function Ra(e) {
      if (Cu[e]) return Cu[e];
      if (!ho[e]) return e;
      var t = ho[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in Cy) return (Cu[e] = t[n]);
      return e;
    }
    var Ny = Ra('animationend'),
      wy = Ra('animationiteration'),
      Ry = Ra('animationstart'),
      pM = Ra('transitionrun'),
      yM = Ra('transitionstart'),
      vM = Ra('transitioncancel'),
      $y = Ra('transitionend'),
      xy = new Map(),
      df =
        'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
          ' ',
        );
    df.push('scrollEnd');
    function Ct(e, t) {
      (xy.set(e, t), Na(t, [e]));
    }
    var As =
        typeof reportError == 'function'
          ? reportError
          : function (e) {
              if (
                typeof window == 'object' &&
                typeof window.ErrorEvent == 'function'
              ) {
                var t = new window.ErrorEvent('error', {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof e == 'object' &&
                    e !== null &&
                    typeof e.message == 'string'
                      ? String(e.message)
                      : String(e),
                  error: e,
                });
                if (!window.dispatchEvent(t)) return;
              } else if (
                typeof process == 'object' &&
                typeof process.emit == 'function'
              ) {
                process.emit('uncaughtException', e);
                return;
              }
              console.error(e);
            },
      mt = [],
      go = 0,
      ad = 0;
    function il() {
      for (var e = go, t = (ad = go = 0); t < e; ) {
        var n = mt[t];
        mt[t++] = null;
        var a = mt[t];
        mt[t++] = null;
        var o = mt[t];
        mt[t++] = null;
        var r = mt[t];
        if (((mt[t++] = null), a !== null && o !== null)) {
          var i = a.pending;
          (i === null ? (o.next = o) : ((o.next = i.next), (i.next = o)),
            (a.pending = o));
        }
        r !== 0 && Ay(n, o, r);
      }
    }
    function sl(e, t, n, a) {
      ((mt[go++] = e),
        (mt[go++] = t),
        (mt[go++] = n),
        (mt[go++] = a),
        (ad |= a),
        (e.lanes |= a),
        (e = e.alternate),
        e !== null && (e.lanes |= a));
    }
    function od(e, t, n, a) {
      return (sl(e, t, n, a), Is(e));
    }
    function $a(e, t) {
      return (sl(e, null, null, t), Is(e));
    }
    function Ay(e, t, n) {
      e.lanes |= n;
      var a = e.alternate;
      a !== null && (a.lanes |= n);
      for (var o = !1, r = e.return; r !== null; )
        ((r.childLanes |= n),
          (a = r.alternate),
          a !== null && (a.childLanes |= n),
          r.tag === 22 &&
            ((e = r.stateNode), e === null || e._visibility & 1 || (o = !0)),
          (e = r),
          (r = r.return));
      return e.tag === 3
        ? ((r = e.stateNode),
          o &&
            t !== null &&
            ((o = 31 - it(n)),
            (e = r.hiddenUpdates),
            (a = e[o]),
            a === null ? (e[o] = [t]) : a.push(t),
            (t.lane = n | 536870912)),
          r)
        : null;
    }
    function Is(e) {
      if (50 < kr) throw ((kr = 0), (If = null), Error(M(185)));
      for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
      return e.tag === 3 ? e.stateNode : null;
    }
    var po = {};
    function bM(e, t, n, a) {
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
        (this.mode = a),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
    }
    function nt(e, t, n, a) {
      return new bM(e, t, n, a);
    }
    function rd(e) {
      return ((e = e.prototype), !(!e || !e.isReactComponent));
    }
    function rn(e, t) {
      var n = e.alternate;
      return (
        n === null
          ? ((n = nt(e.tag, t, e.key, e.mode)),
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
          t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        (n.refCleanup = e.refCleanup),
        n
      );
    }
    function Iy(e, t) {
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
    function ps(e, t, n, a, o, r) {
      var i = 0;
      if (((a = e), typeof e == 'function')) rd(e) && (i = 1);
      else if (typeof e == 'string')
        i = DE(e, n, zt.current)
          ? 26
          : e === 'html' || e === 'head' || e === 'body'
            ? 27
            : 5;
      else
        e: switch (e) {
          case Ku:
            return (
              (e = nt(31, n, t, o)),
              (e.elementType = Ku),
              (e.lanes = r),
              e
            );
          case so:
            return va(n.children, o, r, t);
          case Kp:
            ((i = 8), (o |= 24));
            break;
          case Gu:
            return (
              (e = nt(12, n, t, o | 2)),
              (e.elementType = Gu),
              (e.lanes = r),
              e
            );
          case Xu:
            return (
              (e = nt(13, n, t, o)),
              (e.elementType = Xu),
              (e.lanes = r),
              e
            );
          case Qu:
            return (
              (e = nt(19, n, t, o)),
              (e.elementType = Qu),
              (e.lanes = r),
              e
            );
          default:
            if (typeof e == 'object' && e !== null)
              switch (e.$$typeof) {
                case nn:
                  i = 10;
                  break e;
                case Jp:
                  i = 9;
                  break e;
                case Pf:
                  i = 11;
                  break e;
                case qf:
                  i = 14;
                  break e;
                case $n:
                  ((i = 16), (a = null));
                  break e;
              }
            ((i = 29),
              (n = Error(M(130, e === null ? 'null' : typeof e, ''))),
              (a = null));
        }
      return (
        (t = nt(i, n, t, o)),
        (t.elementType = e),
        (t.type = a),
        (t.lanes = r),
        t
      );
    }
    function va(e, t, n, a) {
      return ((e = nt(7, e, a, t)), (e.lanes = n), e);
    }
    function Nu(e, t, n) {
      return ((e = nt(6, e, null, t)), (e.lanes = n), e);
    }
    function Hy(e) {
      var t = nt(18, null, null, 0);
      return ((t.stateNode = e), t);
    }
    function wu(e, t, n) {
      return (
        (t = nt(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    var Fg = new WeakMap();
    function vt(e, t) {
      if (typeof e == 'object' && e !== null) {
        var n = Fg.get(e);
        return n !== void 0
          ? n
          : ((t = { value: e, source: t, stack: Og(t) }), Fg.set(e, t), t);
      }
      return { value: e, source: t, stack: Og(t) };
    }
    var yo = [],
      vo = 0,
      Hs = null,
      Wr = 0,
      gt = [],
      pt = 0,
      Xn = null,
      kt = 1,
      Bt = '';
    function en(e, t) {
      ((yo[vo++] = Wr), (yo[vo++] = Hs), (Hs = e), (Wr = t));
    }
    function Uy(e, t, n) {
      ((gt[pt++] = kt), (gt[pt++] = Bt), (gt[pt++] = Xn), (Xn = e));
      var a = kt;
      e = Bt;
      var o = 32 - it(a) - 1;
      ((a &= ~(1 << o)), (n += 1));
      var r = 32 - it(t) + o;
      if (30 < r) {
        var i = o - (o % 5);
        ((r = (a & ((1 << i) - 1)).toString(32)),
          (a >>= i),
          (o -= i),
          (kt = (1 << (32 - it(t) + o)) | (n << o) | a),
          (Bt = r + e));
      } else ((kt = (1 << r) | (n << o) | a), (Bt = e));
    }
    function id(e) {
      e.return !== null && (en(e, 1), Uy(e, 1, 0));
    }
    function sd(e) {
      for (; e === Hs; )
        ((Hs = yo[--vo]), (yo[vo] = null), (Wr = yo[--vo]), (yo[vo] = null));
      for (; e === Xn; )
        ((Xn = gt[--pt]),
          (gt[pt] = null),
          (Bt = gt[--pt]),
          (gt[pt] = null),
          (kt = gt[--pt]),
          (gt[pt] = null));
    }
    function Yy(e, t) {
      ((gt[pt++] = kt),
        (gt[pt++] = Bt),
        (gt[pt++] = Xn),
        (kt = t.id),
        (Bt = t.overflow),
        (Xn = e));
    }
    var Ue = null,
      ie = null,
      L = !1,
      Zn = null,
      bt = !1,
      mf = Error(M(519));
    function Qn(e) {
      var t = Error(
        M(
          418,
          1 < arguments.length && arguments[1] !== void 0 && arguments[1]
            ? 'text'
            : 'HTML',
          '',
        ),
      );
      throw (Fr(vt(t, e)), mf);
    }
    function Pg(e) {
      var t = e.stateNode,
        n = e.type,
        a = e.memoizedProps;
      switch (((t[He] = e), (t[Ge] = a), n)) {
        case 'dialog':
          (B('cancel', t), B('close', t));
          break;
        case 'iframe':
        case 'object':
        case 'embed':
          B('load', t);
          break;
        case 'video':
        case 'audio':
          for (n = 0; n < jr.length; n++) B(jr[n], t);
          break;
        case 'source':
          B('error', t);
          break;
        case 'img':
        case 'image':
        case 'link':
          (B('error', t), B('load', t));
          break;
        case 'details':
          B('toggle', t);
          break;
        case 'input':
          (B('invalid', t),
            dy(
              t,
              a.value,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name,
              !0,
            ));
          break;
        case 'select':
          B('invalid', t);
          break;
        case 'textarea':
          (B('invalid', t), hy(t, a.value, a.defaultValue, a.children));
      }
      ((n = a.children),
        (typeof n != 'string' &&
          typeof n != 'number' &&
          typeof n != 'bigint') ||
        t.textContent === '' + n ||
        a.suppressHydrationWarning === !0 ||
        vb(t.textContent, n)
          ? (a.popover != null && (B('beforetoggle', t), B('toggle', t)),
            a.onScroll != null && B('scroll', t),
            a.onScrollEnd != null && B('scrollend', t),
            a.onClick != null && (t.onclick = an),
            (t = !0))
          : (t = !1),
        t || Qn(e, !0));
    }
    function qg(e) {
      for (Ue = e.return; Ue; )
        switch (Ue.tag) {
          case 5:
          case 31:
          case 13:
            bt = !1;
            return;
          case 27:
          case 3:
            bt = !0;
            return;
          default:
            Ue = Ue.return;
        }
    }
    function ao(e) {
      if (e !== Ue) return !1;
      if (!L) return (qg(e), (L = !0), !1);
      var t = e.tag,
        n;
      if (
        ((n = t !== 3 && t !== 27) &&
          ((n = t === 5) &&
            ((n = e.type),
            (n =
              !(n !== 'form' && n !== 'button') ||
              Bf(e.type, e.memoizedProps))),
          (n = !n)),
        n && ie && Qn(e),
        qg(e),
        t === 13)
      ) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(M(317));
        ie = Hp(e);
      } else if (t === 31) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(M(317));
        ie = Hp(e);
      } else
        t === 27
          ? ((t = ie),
            ta(e.type) ? ((e = Zf), (Zf = null), (ie = e)) : (ie = t))
          : (ie = Ue ? Tt(e.stateNode.nextSibling) : null);
      return !0;
    }
    function Da() {
      ((ie = Ue = null), (L = !1));
    }
    function Ru() {
      var e = Zn;
      return (
        e !== null &&
          (Ve === null ? (Ve = e) : Ve.push.apply(Ve, e), (Zn = null)),
        e
      );
    }
    function Fr(e) {
      Zn === null ? (Zn = [e]) : Zn.push(e);
    }
    var hf = Lt(null),
      xa = null,
      on = null;
    function An(e, t, n) {
      (ae(hf, t._currentValue), (t._currentValue = n));
    }
    function sn(e) {
      ((e._currentValue = hf.current), $e(hf));
    }
    function gf(e, t, n) {
      for (; e !== null; ) {
        var a = e.alternate;
        if (
          ((e.childLanes & t) !== t
            ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
            : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
          e === n)
        )
          break;
        e = e.return;
      }
    }
    function pf(e, t, n, a) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var r = o.dependencies;
        if (r !== null) {
          var i = o.child;
          r = r.firstContext;
          e: for (; r !== null; ) {
            var s = r;
            r = o;
            for (var l = 0; l < t.length; l++)
              if (s.context === t[l]) {
                ((r.lanes |= n),
                  (s = r.alternate),
                  s !== null && (s.lanes |= n),
                  gf(r.return, n, e),
                  a || (i = null));
                break e;
              }
            r = s.next;
          }
        } else if (o.tag === 18) {
          if (((i = o.return), i === null)) throw Error(M(341));
          ((i.lanes |= n),
            (r = i.alternate),
            r !== null && (r.lanes |= n),
            gf(i, n, e),
            (i = null));
        } else i = o.child;
        if (i !== null) i.return = o;
        else
          for (i = o; i !== null; ) {
            if (i === e) {
              i = null;
              break;
            }
            if (((o = i.sibling), o !== null)) {
              ((o.return = i.return), (i = o));
              break;
            }
            i = i.return;
          }
        o = i;
      }
    }
    function zo(e, t, n, a) {
      e = null;
      for (var o = t, r = !1; o !== null; ) {
        if (!r) {
          if ((o.flags & 524288) !== 0) r = !0;
          else if ((o.flags & 262144) !== 0) break;
        }
        if (o.tag === 10) {
          var i = o.alternate;
          if (i === null) throw Error(M(387));
          if (((i = i.memoizedProps), i !== null)) {
            var s = o.type;
            lt(o.pendingProps.value, i.value) ||
              (e !== null ? e.push(s) : (e = [s]));
          }
        } else if (o === Ns.current) {
          if (((i = o.alternate), i === null)) throw Error(M(387));
          i.memoizedState.memoizedState !== o.memoizedState.memoizedState &&
            (e !== null ? e.push(Xr) : (e = [Xr]));
        }
        o = o.return;
      }
      (e !== null && pf(t, e, n, a), (t.flags |= 262144));
    }
    function Us(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!lt(e.context._currentValue, e.memoizedValue)) return !0;
        e = e.next;
      }
      return !1;
    }
    function Ma(e) {
      ((xa = e),
        (on = null),
        (e = e.dependencies),
        e !== null && (e.firstContext = null));
    }
    function Ye(e) {
      return ky(xa, e);
    }
    function ns(e, t) {
      return (xa === null && Ma(e), ky(e, t));
    }
    function ky(e, t) {
      var n = t._currentValue;
      if (((t = { context: t, memoizedValue: n, next: null }), on === null)) {
        if (e === null) throw Error(M(308));
        ((on = t),
          (e.dependencies = { lanes: 0, firstContext: t }),
          (e.flags |= 524288));
      } else on = on.next = t;
      return n;
    }
    var SM =
        typeof AbortController < 'u'
          ? AbortController
          : function () {
              var e = [],
                t = (this.signal = {
                  aborted: !1,
                  addEventListener: function (n, a) {
                    e.push(a);
                  },
                });
              this.abort = function () {
                ((t.aborted = !0),
                  e.forEach(function (n) {
                    return n();
                  }));
              };
            },
      TM = Ne.unstable_scheduleCallback,
      DM = Ne.unstable_NormalPriority,
      Me = {
        $$typeof: nn,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function ld() {
      return { controller: new SM(), data: new Map(), refCount: 0 };
    }
    function ri(e) {
      (e.refCount--,
        e.refCount === 0 &&
          TM(DM, function () {
            e.controller.abort();
          }));
    }
    var Rr = null,
      yf = 0,
      $o = 0,
      Mo = null;
    function MM(e, t) {
      if (Rr === null) {
        var n = (Rr = []);
        ((yf = 0),
          ($o = Id()),
          (Mo = {
            status: 'pending',
            value: void 0,
            then: function (a) {
              n.push(a);
            },
          }));
      }
      return (yf++, t.then(Vg, Vg), t);
    }
    function Vg() {
      if (--yf === 0 && Rr !== null) {
        Mo !== null && (Mo.status = 'fulfilled');
        var e = Rr;
        ((Rr = null), ($o = 0), (Mo = null));
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function EM(e, t) {
      var n = [],
        a = {
          status: 'pending',
          value: null,
          reason: null,
          then: function (o) {
            n.push(o);
          },
        };
      return (
        e.then(
          function () {
            ((a.status = 'fulfilled'), (a.value = t));
            for (var o = 0; o < n.length; o++) (0, n[o])(t);
          },
          function (o) {
            for (a.status = 'rejected', a.reason = o, o = 0; o < n.length; o++)
              (0, n[o])(void 0);
          },
        ),
        a
      );
    }
    var jg = H.S;
    H.S = function (e, t) {
      ((Qv = ot()),
        typeof t == 'object' &&
          t !== null &&
          typeof t.then == 'function' &&
          MM(e, t),
        jg !== null && jg(e, t));
    };
    var ba = Lt(null);
    function cd() {
      var e = ba.current;
      return e !== null ? e : te.pooledCache;
    }
    function ys(e, t) {
      t === null ? ae(ba, ba.current) : ae(ba, t.pool);
    }
    function By() {
      var e = cd();
      return e === null ? null : { parent: Me._currentValue, pool: e };
    }
    var Lo = Error(M(460)),
      ud = Error(M(474)),
      ll = Error(M(542)),
      Ys = { then: function () {} };
    function Gg(e) {
      return ((e = e.status), e === 'fulfilled' || e === 'rejected');
    }
    function _y(e, t, n) {
      switch (
        ((n = e[n]),
        n === void 0 ? e.push(t) : n !== t && (t.then(an, an), (t = n)),
        t.status)
      ) {
        case 'fulfilled':
          return t.value;
        case 'rejected':
          throw ((e = t.reason), Qg(e), e);
        default:
          if (typeof t.status == 'string') t.then(an, an);
          else {
            if (((e = te), e !== null && 100 < e.shellSuspendCounter))
              throw Error(M(482));
            ((e = t),
              (e.status = 'pending'),
              e.then(
                function (a) {
                  if (t.status === 'pending') {
                    var o = t;
                    ((o.status = 'fulfilled'), (o.value = a));
                  }
                },
                function (a) {
                  if (t.status === 'pending') {
                    var o = t;
                    ((o.status = 'rejected'), (o.reason = a));
                  }
                },
              ));
          }
          switch (t.status) {
            case 'fulfilled':
              return t.value;
            case 'rejected':
              throw ((e = t.reason), Qg(e), e);
          }
          throw ((Sa = t), Lo);
      }
    }
    function ga(e) {
      try {
        var t = e._init;
        return t(e._payload);
      } catch (n) {
        throw n !== null && typeof n == 'object' && typeof n.then == 'function'
          ? ((Sa = n), Lo)
          : n;
      }
    }
    var Sa = null;
    function Xg() {
      if (Sa === null) throw Error(M(459));
      var e = Sa;
      return ((Sa = null), e);
    }
    function Qg(e) {
      if (e === Lo || e === ll) throw Error(M(483));
    }
    var Eo = null,
      Pr = 0;
    function as(e) {
      var t = Pr;
      return ((Pr += 1), Eo === null && (Eo = []), _y(Eo, e, t));
    }
    function pr(e, t) {
      ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
    }
    function os(e, t) {
      throw t.$$typeof === uD
        ? Error(M(525))
        : ((e = Object.prototype.toString.call(t)),
          Error(
            M(
              31,
              e === '[object Object]'
                ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                : e,
            ),
          ));
    }
    function zy(e) {
      function t(g, h) {
        if (e) {
          var y = g.deletions;
          y === null ? ((g.deletions = [h]), (g.flags |= 16)) : y.push(h);
        }
      }
      function n(g, h) {
        if (!e) return null;
        for (; h !== null; ) (t(g, h), (h = h.sibling));
        return null;
      }
      function a(g) {
        for (var h = new Map(); g !== null; )
          (g.key !== null ? h.set(g.key, g) : h.set(g.index, g),
            (g = g.sibling));
        return h;
      }
      function o(g, h) {
        return ((g = rn(g, h)), (g.index = 0), (g.sibling = null), g);
      }
      function r(g, h, y) {
        return (
          (g.index = y),
          e
            ? ((y = g.alternate),
              y !== null
                ? ((y = y.index), y < h ? ((g.flags |= 67108866), h) : y)
                : ((g.flags |= 67108866), h))
            : ((g.flags |= 1048576), h)
        );
      }
      function i(g) {
        return (e && g.alternate === null && (g.flags |= 67108866), g);
      }
      function s(g, h, y, b) {
        return h === null || h.tag !== 6
          ? ((h = Nu(y, g.mode, b)), (h.return = g), h)
          : ((h = o(h, y)), (h.return = g), h);
      }
      function l(g, h, y, b) {
        var O = y.type;
        return O === so
          ? u(g, h, y.props.children, b, y.key)
          : h !== null &&
              (h.elementType === O ||
                (typeof O == 'object' &&
                  O !== null &&
                  O.$$typeof === $n &&
                  ga(O) === h.type))
            ? ((h = o(h, y.props)), pr(h, y), (h.return = g), h)
            : ((h = ps(y.type, y.key, y.props, null, g.mode, b)),
              pr(h, y),
              (h.return = g),
              h);
      }
      function c(g, h, y, b) {
        return h === null ||
          h.tag !== 4 ||
          h.stateNode.containerInfo !== y.containerInfo ||
          h.stateNode.implementation !== y.implementation
          ? ((h = wu(y, g.mode, b)), (h.return = g), h)
          : ((h = o(h, y.children || [])), (h.return = g), h);
      }
      function u(g, h, y, b, O) {
        return h === null || h.tag !== 7
          ? ((h = va(y, g.mode, b, O)), (h.return = g), h)
          : ((h = o(h, y)), (h.return = g), h);
      }
      function d(g, h, y) {
        if (
          (typeof h == 'string' && h !== '') ||
          typeof h == 'number' ||
          typeof h == 'bigint'
        )
          return ((h = Nu('' + h, g.mode, y)), (h.return = g), h);
        if (typeof h == 'object' && h !== null) {
          switch (h.$$typeof) {
            case ji:
              return (
                (y = ps(h.type, h.key, h.props, null, g.mode, y)),
                pr(y, h),
                (y.return = g),
                y
              );
            case Tr:
              return ((h = wu(h, g.mode, y)), (h.return = g), h);
            case $n:
              return ((h = ga(h)), d(g, h, y));
          }
          if (Dr(h) || hr(h))
            return ((h = va(h, g.mode, y, null)), (h.return = g), h);
          if (typeof h.then == 'function') return d(g, as(h), y);
          if (h.$$typeof === nn) return d(g, ns(g, h), y);
          os(g, h);
        }
        return null;
      }
      function f(g, h, y, b) {
        var O = h !== null ? h.key : null;
        if (
          (typeof y == 'string' && y !== '') ||
          typeof y == 'number' ||
          typeof y == 'bigint'
        )
          return O !== null ? null : s(g, h, '' + y, b);
        if (typeof y == 'object' && y !== null) {
          switch (y.$$typeof) {
            case ji:
              return y.key === O ? l(g, h, y, b) : null;
            case Tr:
              return y.key === O ? c(g, h, y, b) : null;
            case $n:
              return ((y = ga(y)), f(g, h, y, b));
          }
          if (Dr(y) || hr(y)) return O !== null ? null : u(g, h, y, b, null);
          if (typeof y.then == 'function') return f(g, h, as(y), b);
          if (y.$$typeof === nn) return f(g, h, ns(g, y), b);
          os(g, y);
        }
        return null;
      }
      function m(g, h, y, b, O) {
        if (
          (typeof b == 'string' && b !== '') ||
          typeof b == 'number' ||
          typeof b == 'bigint'
        )
          return ((g = g.get(y) || null), s(h, g, '' + b, O));
        if (typeof b == 'object' && b !== null) {
          switch (b.$$typeof) {
            case ji:
              return (
                (g = g.get(b.key === null ? y : b.key) || null),
                l(h, g, b, O)
              );
            case Tr:
              return (
                (g = g.get(b.key === null ? y : b.key) || null),
                c(h, g, b, O)
              );
            case $n:
              return ((b = ga(b)), m(g, h, y, b, O));
          }
          if (Dr(b) || hr(b))
            return ((g = g.get(y) || null), u(h, g, b, O, null));
          if (typeof b.then == 'function') return m(g, h, y, as(b), O);
          if (b.$$typeof === nn) return m(g, h, y, ns(h, b), O);
          os(h, b);
        }
        return null;
      }
      function v(g, h, y, b) {
        for (
          var O = null, x = null, C = h, $ = (h = 0), R = null;
          C !== null && $ < y.length;
          $++
        ) {
          C.index > $ ? ((R = C), (C = null)) : (R = C.sibling);
          var I = f(g, C, y[$], b);
          if (I === null) {
            C === null && (C = R);
            break;
          }
          (e && C && I.alternate === null && t(g, C),
            (h = r(I, h, $)),
            x === null ? (O = I) : (x.sibling = I),
            (x = I),
            (C = R));
        }
        if ($ === y.length) return (n(g, C), L && en(g, $), O);
        if (C === null) {
          for (; $ < y.length; $++)
            ((C = d(g, y[$], b)),
              C !== null &&
                ((h = r(C, h, $)),
                x === null ? (O = C) : (x.sibling = C),
                (x = C)));
          return (L && en(g, $), O);
        }
        for (C = a(C); $ < y.length; $++)
          ((R = m(C, g, $, y[$], b)),
            R !== null &&
              (e &&
                R.alternate !== null &&
                C.delete(R.key === null ? $ : R.key),
              (h = r(R, h, $)),
              x === null ? (O = R) : (x.sibling = R),
              (x = R)));
        return (
          e &&
            C.forEach(function (Oe) {
              return t(g, Oe);
            }),
          L && en(g, $),
          O
        );
      }
      function p(g, h, y, b) {
        if (y == null) throw Error(M(151));
        for (
          var O = null, x = null, C = h, $ = (h = 0), R = null, I = y.next();
          C !== null && !I.done;
          $++, I = y.next()
        ) {
          C.index > $ ? ((R = C), (C = null)) : (R = C.sibling);
          var Oe = f(g, C, I.value, b);
          if (Oe === null) {
            C === null && (C = R);
            break;
          }
          (e && C && Oe.alternate === null && t(g, C),
            (h = r(Oe, h, $)),
            x === null ? (O = Oe) : (x.sibling = Oe),
            (x = Oe),
            (C = R));
        }
        if (I.done) return (n(g, C), L && en(g, $), O);
        if (C === null) {
          for (; !I.done; $++, I = y.next())
            ((I = d(g, I.value, b)),
              I !== null &&
                ((h = r(I, h, $)),
                x === null ? (O = I) : (x.sibling = I),
                (x = I)));
          return (L && en(g, $), O);
        }
        for (C = a(C); !I.done; $++, I = y.next())
          ((I = m(C, g, $, I.value, b)),
            I !== null &&
              (e &&
                I.alternate !== null &&
                C.delete(I.key === null ? $ : I.key),
              (h = r(I, h, $)),
              x === null ? (O = I) : (x.sibling = I),
              (x = I)));
        return (
          e &&
            C.forEach(function (Se) {
              return t(g, Se);
            }),
          L && en(g, $),
          O
        );
      }
      function E(g, h, y, b) {
        if (
          (typeof y == 'object' &&
            y !== null &&
            y.type === so &&
            y.key === null &&
            (y = y.props.children),
          typeof y == 'object' && y !== null)
        ) {
          switch (y.$$typeof) {
            case ji:
              e: {
                for (var O = y.key; h !== null; ) {
                  if (h.key === O) {
                    if (((O = y.type), O === so)) {
                      if (h.tag === 7) {
                        (n(g, h.sibling),
                          (b = o(h, y.props.children)),
                          (b.return = g),
                          (g = b));
                        break e;
                      }
                    } else if (
                      h.elementType === O ||
                      (typeof O == 'object' &&
                        O !== null &&
                        O.$$typeof === $n &&
                        ga(O) === h.type)
                    ) {
                      (n(g, h.sibling),
                        (b = o(h, y.props)),
                        pr(b, y),
                        (b.return = g),
                        (g = b));
                      break e;
                    }
                    n(g, h);
                    break;
                  } else t(g, h);
                  h = h.sibling;
                }
                y.type === so
                  ? ((b = va(y.props.children, g.mode, b, y.key)),
                    (b.return = g),
                    (g = b))
                  : ((b = ps(y.type, y.key, y.props, null, g.mode, b)),
                    pr(b, y),
                    (b.return = g),
                    (g = b));
              }
              return i(g);
            case Tr:
              e: {
                for (O = y.key; h !== null; ) {
                  if (h.key === O)
                    if (
                      h.tag === 4 &&
                      h.stateNode.containerInfo === y.containerInfo &&
                      h.stateNode.implementation === y.implementation
                    ) {
                      (n(g, h.sibling),
                        (b = o(h, y.children || [])),
                        (b.return = g),
                        (g = b));
                      break e;
                    } else {
                      n(g, h);
                      break;
                    }
                  else t(g, h);
                  h = h.sibling;
                }
                ((b = wu(y, g.mode, b)), (b.return = g), (g = b));
              }
              return i(g);
            case $n:
              return ((y = ga(y)), E(g, h, y, b));
          }
          if (Dr(y)) return v(g, h, y, b);
          if (hr(y)) {
            if (((O = hr(y)), typeof O != 'function')) throw Error(M(150));
            return ((y = O.call(y)), p(g, h, y, b));
          }
          if (typeof y.then == 'function') return E(g, h, as(y), b);
          if (y.$$typeof === nn) return E(g, h, ns(g, y), b);
          os(g, y);
        }
        return (typeof y == 'string' && y !== '') ||
          typeof y == 'number' ||
          typeof y == 'bigint'
          ? ((y = '' + y),
            h !== null && h.tag === 6
              ? (n(g, h.sibling), (b = o(h, y)), (b.return = g), (g = b))
              : (n(g, h), (b = Nu(y, g.mode, b)), (b.return = g), (g = b)),
            i(g))
          : n(g, h);
      }
      return function (g, h, y, b) {
        try {
          Pr = 0;
          var O = E(g, h, y, b);
          return ((Eo = null), O);
        } catch (C) {
          if (C === Lo || C === ll) throw C;
          var x = nt(29, C, null, g.mode);
          return ((x.lanes = b), (x.return = g), x);
        }
      };
    }
    var Ea = zy(!0),
      Ly = zy(!1),
      xn = !1;
    function fd(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function vf(e, t) {
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
    function Wn(e) {
      return { lane: e, tag: 0, payload: null, callback: null, next: null };
    }
    function Fn(e, t, n) {
      var a = e.updateQueue;
      if (a === null) return null;
      if (((a = a.shared), (P & 2) !== 0)) {
        var o = a.pending;
        return (
          o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
          (a.pending = t),
          (t = Is(e)),
          Ay(e, null, n),
          t
        );
      }
      return (sl(e, a, t, n), Is(e));
    }
    function $r(e, t, n) {
      if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194048) !== 0))
      ) {
        var a = t.lanes;
        ((a &= e.pendingLanes), (n |= a), (t.lanes = n), ry(e, n));
      }
    }
    function $u(e, t) {
      var n = e.updateQueue,
        a = e.alternate;
      if (a !== null && ((a = a.updateQueue), n === a)) {
        var o = null,
          r = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
          do {
            var i = {
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: null,
              next: null,
            };
            (r === null ? (o = r = i) : (r = r.next = i), (n = n.next));
          } while (n !== null);
          r === null ? (o = r = t) : (r = r.next = t);
        } else o = r = t;
        ((n = {
          baseState: a.baseState,
          firstBaseUpdate: o,
          lastBaseUpdate: r,
          shared: a.shared,
          callbacks: a.callbacks,
        }),
          (e.updateQueue = n));
        return;
      }
      ((e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t));
    }
    var bf = !1;
    function xr() {
      if (bf) {
        var e = Mo;
        if (e !== null) throw e;
      }
    }
    function Ar(e, t, n, a) {
      bf = !1;
      var o = e.updateQueue;
      xn = !1;
      var r = o.firstBaseUpdate,
        i = o.lastBaseUpdate,
        s = o.shared.pending;
      if (s !== null) {
        o.shared.pending = null;
        var l = s,
          c = l.next;
        ((l.next = null), i === null ? (r = c) : (i.next = c), (i = l));
        var u = e.alternate;
        u !== null &&
          ((u = u.updateQueue),
          (s = u.lastBaseUpdate),
          s !== i &&
            (s === null ? (u.firstBaseUpdate = c) : (s.next = c),
            (u.lastBaseUpdate = l)));
      }
      if (r !== null) {
        var d = o.baseState;
        ((i = 0), (u = c = l = null), (s = r));
        do {
          var f = s.lane & -536870913,
            m = f !== s.lane;
          if (m ? (z & f) === f : (a & f) === f) {
            (f !== 0 && f === $o && (bf = !0),
              u !== null &&
                (u = u.next =
                  {
                    lane: 0,
                    tag: s.tag,
                    payload: s.payload,
                    callback: null,
                    next: null,
                  }));
            e: {
              var v = e,
                p = s;
              f = t;
              var E = n;
              switch (p.tag) {
                case 1:
                  if (((v = p.payload), typeof v == 'function')) {
                    d = v.call(E, d, f);
                    break e;
                  }
                  d = v;
                  break e;
                case 3:
                  v.flags = (v.flags & -65537) | 128;
                case 0:
                  if (
                    ((v = p.payload),
                    (f = typeof v == 'function' ? v.call(E, d, f) : v),
                    f == null)
                  )
                    break e;
                  d = se({}, d, f);
                  break e;
                case 2:
                  xn = !0;
              }
            }
            ((f = s.callback),
              f !== null &&
                ((e.flags |= 64),
                m && (e.flags |= 8192),
                (m = o.callbacks),
                m === null ? (o.callbacks = [f]) : m.push(f)));
          } else
            ((m = {
              lane: f,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            }),
              u === null ? ((c = u = m), (l = d)) : (u = u.next = m),
              (i |= f));
          if (((s = s.next), s === null)) {
            if (((s = o.shared.pending), s === null)) break;
            ((m = s),
              (s = m.next),
              (m.next = null),
              (o.lastBaseUpdate = m),
              (o.shared.pending = null));
          }
        } while (!0);
        (u === null && (l = d),
          (o.baseState = l),
          (o.firstBaseUpdate = c),
          (o.lastBaseUpdate = u),
          r === null && (o.shared.lanes = 0),
          (Jn |= i),
          (e.lanes = i),
          (e.memoizedState = d));
      }
    }
    function Zy(e, t) {
      if (typeof e != 'function') throw Error(M(191, e));
      e.call(t);
    }
    function Wy(e, t) {
      var n = e.callbacks;
      if (n !== null)
        for (e.callbacks = null, e = 0; e < n.length; e++) Zy(n[e], t);
    }
    var xo = Lt(null),
      ks = Lt(0);
    function Kg(e, t) {
      ((e = mn), ae(ks, e), ae(xo, t), (mn = e | t.baseLanes));
    }
    function Sf() {
      (ae(ks, mn), ae(xo, xo.current));
    }
    function dd() {
      ((mn = ks.current), $e(xo), $e(ks));
    }
    var ct = Lt(null),
      St = null;
    function In(e) {
      var t = e.alternate;
      (ae(pe, pe.current & 1),
        ae(ct, e),
        St === null &&
          (t === null || xo.current !== null || t.memoizedState !== null) &&
          (St = e));
    }
    function Tf(e) {
      (ae(pe, pe.current), ae(ct, e), St === null && (St = e));
    }
    function Fy(e) {
      e.tag === 22
        ? (ae(pe, pe.current), ae(ct, e), St === null && (St = e))
        : Hn(e);
    }
    function Hn() {
      (ae(pe, pe.current), ae(ct, ct.current));
    }
    function tt(e) {
      ($e(ct), St === e && (St = null), $e(pe));
    }
    var pe = Lt(0);
    function Bs(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (n !== null && ((n = n.dehydrated), n === null || zf(n) || Lf(n)))
            return t;
        } else if (
          t.tag === 19 &&
          (t.memoizedProps.revealOrder === 'forwards' ||
            t.memoizedProps.revealOrder === 'backwards' ||
            t.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
            t.memoizedProps.revealOrder === 'together')
        ) {
          if ((t.flags & 128) !== 0) return t;
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
    var un = 0,
      Y = null,
      J = null,
      Te = null,
      _s = !1,
      Oo = !1,
      Oa = !1,
      zs = 0,
      qr = 0,
      Co = null,
      OM = 0;
    function he() {
      throw Error(M(321));
    }
    function md(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!lt(e[n], t[n])) return !1;
      return !0;
    }
    function hd(e, t, n, a, o, r) {
      return (
        (un = r),
        (Y = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (H.H = e === null || e.memoizedState === null ? Tv : Od),
        (Oa = !1),
        (r = n(a, o)),
        (Oa = !1),
        Oo && (r = qy(t, n, a, o)),
        Py(e),
        r
      );
    }
    function Py(e) {
      H.H = Vr;
      var t = J !== null && J.next !== null;
      if (((un = 0), (Te = J = Y = null), (_s = !1), (qr = 0), (Co = null), t))
        throw Error(M(300));
      e === null ||
        Ee ||
        ((e = e.dependencies), e !== null && Us(e) && (Ee = !0));
    }
    function qy(e, t, n, a) {
      Y = e;
      var o = 0;
      do {
        if ((Oo && (Co = null), (qr = 0), (Oo = !1), 25 <= o))
          throw Error(M(301));
        if (((o += 1), (Te = J = null), e.updateQueue != null)) {
          var r = e.updateQueue;
          ((r.lastEffect = null),
            (r.events = null),
            (r.stores = null),
            r.memoCache != null && (r.memoCache.index = 0));
        }
        ((H.H = Dv), (r = t(n, a)));
      } while (Oo);
      return r;
    }
    function CM() {
      var e = H.H,
        t = e.useState()[0];
      return (
        (t = typeof t.then == 'function' ? ii(t) : t),
        (e = e.useState()[0]),
        (J !== null ? J.memoizedState : null) !== e && (Y.flags |= 1024),
        t
      );
    }
    function gd() {
      var e = zs !== 0;
      return ((zs = 0), e);
    }
    function pd(e, t, n) {
      ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
    }
    function yd(e) {
      if (_s) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          (t !== null && (t.pending = null), (e = e.next));
        }
        _s = !1;
      }
      ((un = 0), (Te = J = Y = null), (Oo = !1), (qr = zs = 0), (Co = null));
    }
    function Ze() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return (
        Te === null ? (Y.memoizedState = Te = e) : (Te = Te.next = e),
        Te
      );
    }
    function ye() {
      if (J === null) {
        var e = Y.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = J.next;
      var t = Te === null ? Y.memoizedState : Te.next;
      if (t !== null) ((Te = t), (J = e));
      else {
        if (e === null)
          throw Y.alternate === null ? Error(M(467)) : Error(M(310));
        ((J = e),
          (e = {
            memoizedState: J.memoizedState,
            baseState: J.baseState,
            baseQueue: J.baseQueue,
            queue: J.queue,
            next: null,
          }),
          Te === null ? (Y.memoizedState = Te = e) : (Te = Te.next = e));
      }
      return Te;
    }
    function cl() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function ii(e) {
      var t = qr;
      return (
        (qr += 1),
        Co === null && (Co = []),
        (e = _y(Co, e, t)),
        (t = Y),
        (Te === null ? t.memoizedState : Te.next) === null &&
          ((t = t.alternate),
          (H.H = t === null || t.memoizedState === null ? Tv : Od)),
        e
      );
    }
    function ul(e) {
      if (e !== null && typeof e == 'object') {
        if (typeof e.then == 'function') return ii(e);
        if (e.$$typeof === nn) return Ye(e);
      }
      throw Error(M(438, String(e)));
    }
    function vd(e) {
      var t = null,
        n = Y.updateQueue;
      if ((n !== null && (t = n.memoCache), t == null)) {
        var a = Y.alternate;
        a !== null &&
          ((a = a.updateQueue),
          a !== null &&
            ((a = a.memoCache),
            a != null &&
              (t = {
                data: a.data.map(function (o) {
                  return o.slice();
                }),
                index: 0,
              })));
      }
      if (
        (t == null && (t = { data: [], index: 0 }),
        n === null && ((n = cl()), (Y.updateQueue = n)),
        (n.memoCache = t),
        (n = t.data[t.index]),
        n === void 0)
      )
        for (n = t.data[t.index] = Array(e), a = 0; a < e; a++) n[a] = fD;
      return (t.index++, n);
    }
    function fn(e, t) {
      return typeof t == 'function' ? t(e) : t;
    }
    function vs(e) {
      var t = ye();
      return bd(t, J, e);
    }
    function bd(e, t, n) {
      var a = e.queue;
      if (a === null) throw Error(M(311));
      a.lastRenderedReducer = n;
      var o = e.baseQueue,
        r = a.pending;
      if (r !== null) {
        if (o !== null) {
          var i = o.next;
          ((o.next = r.next), (r.next = i));
        }
        ((t.baseQueue = o = r), (a.pending = null));
      }
      if (((r = e.baseState), o === null)) e.memoizedState = r;
      else {
        t = o.next;
        var s = (i = null),
          l = null,
          c = t,
          u = !1;
        do {
          var d = c.lane & -536870913;
          if (d !== c.lane ? (z & d) === d : (un & d) === d) {
            var f = c.revertLane;
            if (f === 0)
              (l !== null &&
                (l = l.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    gesture: null,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null,
                  }),
                d === $o && (u = !0));
            else if ((un & f) === f) {
              ((c = c.next), f === $o && (u = !0));
              continue;
            } else
              ((d = {
                lane: 0,
                revertLane: c.revertLane,
                gesture: null,
                action: c.action,
                hasEagerState: c.hasEagerState,
                eagerState: c.eagerState,
                next: null,
              }),
                l === null ? ((s = l = d), (i = r)) : (l = l.next = d),
                (Y.lanes |= f),
                (Jn |= f));
            ((d = c.action),
              Oa && n(r, d),
              (r = c.hasEagerState ? c.eagerState : n(r, d)));
          } else
            ((f = {
              lane: d,
              revertLane: c.revertLane,
              gesture: c.gesture,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
              l === null ? ((s = l = f), (i = r)) : (l = l.next = f),
              (Y.lanes |= d),
              (Jn |= d));
          c = c.next;
        } while (c !== null && c !== t);
        if (
          (l === null ? (i = r) : (l.next = s),
          !lt(r, e.memoizedState) && ((Ee = !0), u && ((n = Mo), n !== null)))
        )
          throw n;
        ((e.memoizedState = r),
          (e.baseState = i),
          (e.baseQueue = l),
          (a.lastRenderedState = r));
      }
      return (o === null && (a.lanes = 0), [e.memoizedState, a.dispatch]);
    }
    function xu(e) {
      var t = ye(),
        n = t.queue;
      if (n === null) throw Error(M(311));
      n.lastRenderedReducer = e;
      var a = n.dispatch,
        o = n.pending,
        r = t.memoizedState;
      if (o !== null) {
        n.pending = null;
        var i = (o = o.next);
        do ((r = e(r, i.action)), (i = i.next));
        while (i !== o);
        (lt(r, t.memoizedState) || (Ee = !0),
          (t.memoizedState = r),
          t.baseQueue === null && (t.baseState = r),
          (n.lastRenderedState = r));
      }
      return [r, a];
    }
    function Vy(e, t, n) {
      var a = Y,
        o = ye(),
        r = L;
      if (r) {
        if (n === void 0) throw Error(M(407));
        n = n();
      } else n = t();
      var i = !lt((J || o).memoizedState, n);
      if (
        (i && ((o.memoizedState = n), (Ee = !0)),
        (o = o.queue),
        Sd(Xy.bind(null, a, o, e), [e]),
        o.getSnapshot !== t || i || (Te !== null && Te.memoizedState.tag & 1))
      ) {
        if (
          ((a.flags |= 2048),
          Ao(9, { destroy: void 0 }, Gy.bind(null, a, o, n, t), null),
          te === null)
        )
          throw Error(M(349));
        r || (un & 127) !== 0 || jy(a, t, n);
      }
      return n;
    }
    function jy(e, t, n) {
      ((e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = Y.updateQueue),
        t === null
          ? ((t = cl()), (Y.updateQueue = t), (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
    }
    function Gy(e, t, n, a) {
      ((t.value = n), (t.getSnapshot = a), Qy(t) && Ky(e));
    }
    function Xy(e, t, n) {
      return n(function () {
        Qy(t) && Ky(e);
      });
    }
    function Qy(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !lt(e, n);
      } catch {
        return !0;
      }
    }
    function Ky(e) {
      var t = $a(e, 2);
      t !== null && je(t, e, 2);
    }
    function Df(e) {
      var t = Ze();
      if (typeof e == 'function') {
        var n = e;
        if (((e = n()), Oa)) {
          Yn(!0);
          try {
            n();
          } finally {
            Yn(!1);
          }
        }
      }
      return (
        (t.memoizedState = t.baseState = e),
        (t.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: fn,
          lastRenderedState: e,
        }),
        t
      );
    }
    function Jy(e, t, n, a) {
      return ((e.baseState = n), bd(e, J, typeof a == 'function' ? a : fn));
    }
    function NM(e, t, n, a, o) {
      if (dl(e)) throw Error(M(485));
      if (((e = t.action), e !== null)) {
        var r = {
          payload: o,
          action: e,
          next: null,
          isTransition: !0,
          status: 'pending',
          value: null,
          reason: null,
          listeners: [],
          then: function (i) {
            r.listeners.push(i);
          },
        };
        (H.T !== null ? n(!0) : (r.isTransition = !1),
          a(r),
          (n = t.pending),
          n === null
            ? ((r.next = t.pending = r), ev(t, r))
            : ((r.next = n.next), (t.pending = n.next = r)));
      }
    }
    function ev(e, t) {
      var n = t.action,
        a = t.payload,
        o = e.state;
      if (t.isTransition) {
        var r = H.T,
          i = {};
        H.T = i;
        try {
          var s = n(o, a),
            l = H.S;
          (l !== null && l(i, s), Jg(e, t, s));
        } catch (c) {
          Mf(e, t, c);
        } finally {
          (r !== null && i.types !== null && (r.types = i.types), (H.T = r));
        }
      } else
        try {
          ((r = n(o, a)), Jg(e, t, r));
        } catch (c) {
          Mf(e, t, c);
        }
    }
    function Jg(e, t, n) {
      n !== null && typeof n == 'object' && typeof n.then == 'function'
        ? n.then(
            function (a) {
              ep(e, t, a);
            },
            function (a) {
              return Mf(e, t, a);
            },
          )
        : ep(e, t, n);
    }
    function ep(e, t, n) {
      ((t.status = 'fulfilled'),
        (t.value = n),
        tv(t),
        (e.state = n),
        (t = e.pending),
        t !== null &&
          ((n = t.next),
          n === t
            ? (e.pending = null)
            : ((n = n.next), (t.next = n), ev(e, n))));
    }
    function Mf(e, t, n) {
      var a = e.pending;
      if (((e.pending = null), a !== null)) {
        a = a.next;
        do ((t.status = 'rejected'), (t.reason = n), tv(t), (t = t.next));
        while (t !== a);
      }
      e.action = null;
    }
    function tv(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function nv(e, t) {
      return t;
    }
    function tp(e, t) {
      if (L) {
        var n = te.formState;
        if (n !== null) {
          e: {
            var a = Y;
            if (L) {
              if (ie) {
                t: {
                  for (var o = ie, r = bt; o.nodeType !== 8; ) {
                    if (!r) {
                      o = null;
                      break t;
                    }
                    if (((o = Tt(o.nextSibling)), o === null)) {
                      o = null;
                      break t;
                    }
                  }
                  ((r = o.data), (o = r === 'F!' || r === 'F' ? o : null));
                }
                if (o) {
                  ((ie = Tt(o.nextSibling)), (a = o.data === 'F!'));
                  break e;
                }
              }
              Qn(a);
            }
            a = !1;
          }
          a && (t = n[0]);
        }
      }
      return (
        (n = Ze()),
        (n.memoizedState = n.baseState = t),
        (a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: nv,
          lastRenderedState: t,
        }),
        (n.queue = a),
        (n = vv.bind(null, Y, a)),
        (a.dispatch = n),
        (a = Df(!1)),
        (r = Ed.bind(null, Y, !1, a.queue)),
        (a = Ze()),
        (o = { state: t, dispatch: null, action: e, pending: null }),
        (a.queue = o),
        (n = NM.bind(null, Y, o, r, n)),
        (o.dispatch = n),
        (a.memoizedState = e),
        [t, n, !1]
      );
    }
    function np(e) {
      var t = ye();
      return av(t, J, e);
    }
    function av(e, t, n) {
      if (
        ((t = bd(e, t, nv)[0]),
        (e = vs(fn)[0]),
        typeof t == 'object' && t !== null && typeof t.then == 'function')
      )
        try {
          var a = ii(t);
        } catch (i) {
          throw i === Lo ? ll : i;
        }
      else a = t;
      t = ye();
      var o = t.queue,
        r = o.dispatch;
      return (
        n !== t.memoizedState &&
          ((Y.flags |= 2048),
          Ao(9, { destroy: void 0 }, wM.bind(null, o, n), null)),
        [a, r, e]
      );
    }
    function wM(e, t) {
      e.action = t;
    }
    function ap(e) {
      var t = ye(),
        n = J;
      if (n !== null) return av(t, n, e);
      (ye(), (t = t.memoizedState), (n = ye()));
      var a = n.queue.dispatch;
      return ((n.memoizedState = e), [t, a, !1]);
    }
    function Ao(e, t, n, a) {
      return (
        (e = { tag: e, create: n, deps: a, inst: t, next: null }),
        (t = Y.updateQueue),
        t === null && ((t = cl()), (Y.updateQueue = t)),
        (n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((a = n.next), (n.next = e), (e.next = a), (t.lastEffect = e)),
        e
      );
    }
    function ov() {
      return ye().memoizedState;
    }
    function bs(e, t, n, a) {
      var o = Ze();
      ((Y.flags |= e),
        (o.memoizedState = Ao(
          1 | t,
          { destroy: void 0 },
          n,
          a === void 0 ? null : a,
        )));
    }
    function fl(e, t, n, a) {
      var o = ye();
      a = a === void 0 ? null : a;
      var r = o.memoizedState.inst;
      J !== null && a !== null && md(a, J.memoizedState.deps)
        ? (o.memoizedState = Ao(t, r, n, a))
        : ((Y.flags |= e), (o.memoizedState = Ao(1 | t, r, n, a)));
    }
    function op(e, t) {
      bs(8390656, 8, e, t);
    }
    function Sd(e, t) {
      fl(2048, 8, e, t);
    }
    function RM(e) {
      Y.flags |= 4;
      var t = Y.updateQueue;
      if (t === null) ((t = cl()), (Y.updateQueue = t), (t.events = [e]));
      else {
        var n = t.events;
        n === null ? (t.events = [e]) : n.push(e);
      }
    }
    function rv(e) {
      var t = ye().memoizedState;
      return (
        RM({ ref: t, nextImpl: e }),
        function () {
          if ((P & 2) !== 0) throw Error(M(440));
          return t.impl.apply(void 0, arguments);
        }
      );
    }
    function iv(e, t) {
      return fl(4, 2, e, t);
    }
    function sv(e, t) {
      return fl(4, 4, e, t);
    }
    function lv(e, t) {
      if (typeof t == 'function') {
        e = e();
        var n = t(e);
        return function () {
          typeof n == 'function' ? n() : t(null);
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
    function cv(e, t, n) {
      ((n = n != null ? n.concat([e]) : null),
        fl(4, 4, lv.bind(null, t, e), n));
    }
    function Td() {}
    function uv(e, t) {
      var n = ye();
      t = t === void 0 ? null : t;
      var a = n.memoizedState;
      return t !== null && md(t, a[1]) ? a[0] : ((n.memoizedState = [e, t]), e);
    }
    function fv(e, t) {
      var n = ye();
      t = t === void 0 ? null : t;
      var a = n.memoizedState;
      if (t !== null && md(t, a[1])) return a[0];
      if (((a = e()), Oa)) {
        Yn(!0);
        try {
          e();
        } finally {
          Yn(!1);
        }
      }
      return ((n.memoizedState = [a, t]), a);
    }
    function Dd(e, t, n) {
      return n === void 0 || ((un & 1073741824) !== 0 && (z & 261930) === 0)
        ? (e.memoizedState = t)
        : ((e.memoizedState = n), (e = Jv()), (Y.lanes |= e), (Jn |= e), n);
    }
    function dv(e, t, n, a) {
      return lt(n, t)
        ? n
        : xo.current !== null
          ? ((e = Dd(e, n, a)), lt(e, t) || (Ee = !0), e)
          : (un & 42) === 0 || ((un & 1073741824) !== 0 && (z & 261930) === 0)
            ? ((Ee = !0), (e.memoizedState = n))
            : ((e = Jv()), (Y.lanes |= e), (Jn |= e), t);
    }
    function mv(e, t, n, a, o) {
      var r = q.p;
      q.p = r !== 0 && 8 > r ? r : 8;
      var i = H.T,
        s = {};
      ((H.T = s), Ed(e, !1, t, n));
      try {
        var l = o(),
          c = H.S;
        if (
          (c !== null && c(s, l),
          l !== null && typeof l == 'object' && typeof l.then == 'function')
        ) {
          var u = EM(l, a);
          Ir(e, t, u, st(e));
        } else Ir(e, t, a, st(e));
      } catch (d) {
        Ir(e, t, { then: function () {}, status: 'rejected', reason: d }, st());
      } finally {
        ((q.p = r),
          i !== null && s.types !== null && (i.types = s.types),
          (H.T = i));
      }
    }
    function $M() {}
    function Ef(e, t, n, a) {
      if (e.tag !== 5) throw Error(M(476));
      var o = hv(e).queue;
      mv(
        e,
        o,
        t,
        ya,
        n === null
          ? $M
          : function () {
              return (gv(e), n(a));
            },
      );
    }
    function hv(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: ya,
        baseState: ya,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: fn,
          lastRenderedState: ya,
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
            lastRenderedReducer: fn,
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
    function gv(e) {
      var t = hv(e);
      (t.next === null && (t = e.alternate.memoizedState),
        Ir(e, t.next.queue, {}, st()));
    }
    function Md() {
      return Ye(Xr);
    }
    function pv() {
      return ye().memoizedState;
    }
    function yv() {
      return ye().memoizedState;
    }
    function xM(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var n = st();
            e = Wn(n);
            var a = Fn(t, e, n);
            (a !== null && (je(a, t, n), $r(a, t, n)),
              (t = { cache: ld() }),
              (e.payload = t));
            return;
        }
        t = t.return;
      }
    }
    function AM(e, t, n) {
      var a = st();
      ((n = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
        dl(e)
          ? bv(t, n)
          : ((n = od(e, t, n, a)), n !== null && (je(n, e, a), Sv(n, t, a))));
    }
    function vv(e, t, n) {
      var a = st();
      Ir(e, t, n, a);
    }
    function Ir(e, t, n, a) {
      var o = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if (dl(e)) bv(t, o);
      else {
        var r = e.alternate;
        if (
          e.lanes === 0 &&
          (r === null || r.lanes === 0) &&
          ((r = t.lastRenderedReducer), r !== null)
        )
          try {
            var i = t.lastRenderedState,
              s = r(i, n);
            if (((o.hasEagerState = !0), (o.eagerState = s), lt(s, i)))
              return (sl(e, t, o, 0), te === null && il(), !1);
          } catch {}
        if (((n = od(e, t, o, a)), n !== null))
          return (je(n, e, a), Sv(n, t, a), !0);
      }
      return !1;
    }
    function Ed(e, t, n, a) {
      if (
        ((a = {
          lane: 2,
          revertLane: Id(),
          gesture: null,
          action: a,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        dl(e))
      ) {
        if (t) throw Error(M(479));
      } else ((t = od(e, n, a, 2)), t !== null && je(t, e, 2));
    }
    function dl(e) {
      var t = e.alternate;
      return e === Y || (t !== null && t === Y);
    }
    function bv(e, t) {
      Oo = _s = !0;
      var n = e.pending;
      (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t));
    }
    function Sv(e, t, n) {
      if ((n & 4194048) !== 0) {
        var a = t.lanes;
        ((a &= e.pendingLanes), (n |= a), (t.lanes = n), ry(e, n));
      }
    }
    var Vr = {
      readContext: Ye,
      use: ul,
      useCallback: he,
      useContext: he,
      useEffect: he,
      useImperativeHandle: he,
      useLayoutEffect: he,
      useInsertionEffect: he,
      useMemo: he,
      useReducer: he,
      useRef: he,
      useState: he,
      useDebugValue: he,
      useDeferredValue: he,
      useTransition: he,
      useSyncExternalStore: he,
      useId: he,
      useHostTransitionStatus: he,
      useFormState: he,
      useActionState: he,
      useOptimistic: he,
      useMemoCache: he,
      useCacheRefresh: he,
    };
    Vr.useEffectEvent = he;
    var Tv = {
        readContext: Ye,
        use: ul,
        useCallback: function (e, t) {
          return ((Ze().memoizedState = [e, t === void 0 ? null : t]), e);
        },
        useContext: Ye,
        useEffect: op,
        useImperativeHandle: function (e, t, n) {
          ((n = n != null ? n.concat([e]) : null),
            bs(4194308, 4, lv.bind(null, t, e), n));
        },
        useLayoutEffect: function (e, t) {
          return bs(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          bs(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = Ze();
          t = t === void 0 ? null : t;
          var a = e();
          if (Oa) {
            Yn(!0);
            try {
              e();
            } finally {
              Yn(!1);
            }
          }
          return ((n.memoizedState = [a, t]), a);
        },
        useReducer: function (e, t, n) {
          var a = Ze();
          if (n !== void 0) {
            var o = n(t);
            if (Oa) {
              Yn(!0);
              try {
                n(t);
              } finally {
                Yn(!1);
              }
            }
          } else o = t;
          return (
            (a.memoizedState = a.baseState = o),
            (e = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: o,
            }),
            (a.queue = e),
            (e = e.dispatch = AM.bind(null, Y, e)),
            [a.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = Ze();
          return ((e = { current: e }), (t.memoizedState = e));
        },
        useState: function (e) {
          e = Df(e);
          var t = e.queue,
            n = vv.bind(null, Y, t);
          return ((t.dispatch = n), [e.memoizedState, n]);
        },
        useDebugValue: Td,
        useDeferredValue: function (e, t) {
          var n = Ze();
          return Dd(n, e, t);
        },
        useTransition: function () {
          var e = Df(!1);
          return (
            (e = mv.bind(null, Y, e.queue, !0, !1)),
            (Ze().memoizedState = e),
            [!1, e]
          );
        },
        useSyncExternalStore: function (e, t, n) {
          var a = Y,
            o = Ze();
          if (L) {
            if (n === void 0) throw Error(M(407));
            n = n();
          } else {
            if (((n = t()), te === null)) throw Error(M(349));
            (z & 127) !== 0 || jy(a, t, n);
          }
          o.memoizedState = n;
          var r = { value: n, getSnapshot: t };
          return (
            (o.queue = r),
            op(Xy.bind(null, a, r, e), [e]),
            (a.flags |= 2048),
            Ao(9, { destroy: void 0 }, Gy.bind(null, a, r, n, t), null),
            n
          );
        },
        useId: function () {
          var e = Ze(),
            t = te.identifierPrefix;
          if (L) {
            var n = Bt,
              a = kt;
            ((n = (a & ~(1 << (32 - it(a) - 1))).toString(32) + n),
              (t = '_' + t + 'R_' + n),
              (n = zs++),
              0 < n && (t += 'H' + n.toString(32)),
              (t += '_'));
          } else ((n = OM++), (t = '_' + t + 'r_' + n.toString(32) + '_'));
          return (e.memoizedState = t);
        },
        useHostTransitionStatus: Md,
        useFormState: tp,
        useActionState: tp,
        useOptimistic: function (e) {
          var t = Ze();
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
            (t = Ed.bind(null, Y, !0, n)),
            (n.dispatch = t),
            [e, t]
          );
        },
        useMemoCache: vd,
        useCacheRefresh: function () {
          return (Ze().memoizedState = xM.bind(null, Y));
        },
        useEffectEvent: function (e) {
          var t = Ze(),
            n = { impl: e };
          return (
            (t.memoizedState = n),
            function () {
              if ((P & 2) !== 0) throw Error(M(440));
              return n.impl.apply(void 0, arguments);
            }
          );
        },
      },
      Od = {
        readContext: Ye,
        use: ul,
        useCallback: uv,
        useContext: Ye,
        useEffect: Sd,
        useImperativeHandle: cv,
        useInsertionEffect: iv,
        useLayoutEffect: sv,
        useMemo: fv,
        useReducer: vs,
        useRef: ov,
        useState: function () {
          return vs(fn);
        },
        useDebugValue: Td,
        useDeferredValue: function (e, t) {
          var n = ye();
          return dv(n, J.memoizedState, e, t);
        },
        useTransition: function () {
          var e = vs(fn)[0],
            t = ye().memoizedState;
          return [typeof e == 'boolean' ? e : ii(e), t];
        },
        useSyncExternalStore: Vy,
        useId: pv,
        useHostTransitionStatus: Md,
        useFormState: np,
        useActionState: np,
        useOptimistic: function (e, t) {
          var n = ye();
          return Jy(n, J, e, t);
        },
        useMemoCache: vd,
        useCacheRefresh: yv,
      };
    Od.useEffectEvent = rv;
    var Dv = {
      readContext: Ye,
      use: ul,
      useCallback: uv,
      useContext: Ye,
      useEffect: Sd,
      useImperativeHandle: cv,
      useInsertionEffect: iv,
      useLayoutEffect: sv,
      useMemo: fv,
      useReducer: xu,
      useRef: ov,
      useState: function () {
        return xu(fn);
      },
      useDebugValue: Td,
      useDeferredValue: function (e, t) {
        var n = ye();
        return J === null ? Dd(n, e, t) : dv(n, J.memoizedState, e, t);
      },
      useTransition: function () {
        var e = xu(fn)[0],
          t = ye().memoizedState;
        return [typeof e == 'boolean' ? e : ii(e), t];
      },
      useSyncExternalStore: Vy,
      useId: pv,
      useHostTransitionStatus: Md,
      useFormState: ap,
      useActionState: ap,
      useOptimistic: function (e, t) {
        var n = ye();
        return J !== null
          ? Jy(n, J, e, t)
          : ((n.baseState = e), [e, n.queue.dispatch]);
      },
      useMemoCache: vd,
      useCacheRefresh: yv,
    };
    Dv.useEffectEvent = rv;
    function Au(e, t, n, a) {
      ((t = e.memoizedState),
        (n = n(a, t)),
        (n = n == null ? t : se({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n));
    }
    var Of = {
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var a = st(),
          o = Wn(a);
        ((o.payload = t),
          n != null && (o.callback = n),
          (t = Fn(e, o, a)),
          t !== null && (je(t, e, a), $r(t, e, a)));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var a = st(),
          o = Wn(a);
        ((o.tag = 1),
          (o.payload = t),
          n != null && (o.callback = n),
          (t = Fn(e, o, a)),
          t !== null && (je(t, e, a), $r(t, e, a)));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = st(),
          a = Wn(n);
        ((a.tag = 2),
          t != null && (a.callback = t),
          (t = Fn(e, a, n)),
          t !== null && (je(t, e, n), $r(t, e, n)));
      },
    };
    function rp(e, t, n, a, o, r, i) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == 'function'
          ? e.shouldComponentUpdate(a, r, i)
          : t.prototype && t.prototype.isPureReactComponent
            ? !Zr(n, a) || !Zr(o, r)
            : !0
      );
    }
    function ip(e, t, n, a) {
      ((e = t.state),
        typeof t.componentWillReceiveProps == 'function' &&
          t.componentWillReceiveProps(n, a),
        typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
          t.UNSAFE_componentWillReceiveProps(n, a),
        t.state !== e && Of.enqueueReplaceState(t, t.state, null));
    }
    function Ca(e, t) {
      var n = t;
      if ('ref' in t) {
        n = {};
        for (var a in t) a !== 'ref' && (n[a] = t[a]);
      }
      if ((e = e.defaultProps)) {
        n === t && (n = se({}, n));
        for (var o in e) n[o] === void 0 && (n[o] = e[o]);
      }
      return n;
    }
    function Mv(e) {
      As(e);
    }
    function Ev(e) {
      console.error(e);
    }
    function Ov(e) {
      As(e);
    }
    function Ls(e, t) {
      try {
        var n = e.onUncaughtError;
        n(t.value, { componentStack: t.stack });
      } catch (a) {
        setTimeout(function () {
          throw a;
        });
      }
    }
    function sp(e, t, n) {
      try {
        var a = e.onCaughtError;
        a(n.value, {
          componentStack: n.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null,
        });
      } catch (o) {
        setTimeout(function () {
          throw o;
        });
      }
    }
    function Cf(e, t, n) {
      return (
        (n = Wn(n)),
        (n.tag = 3),
        (n.payload = { element: null }),
        (n.callback = function () {
          Ls(e, t);
        }),
        n
      );
    }
    function Cv(e) {
      return ((e = Wn(e)), (e.tag = 3), e);
    }
    function Nv(e, t, n, a) {
      var o = n.type.getDerivedStateFromError;
      if (typeof o == 'function') {
        var r = a.value;
        ((e.payload = function () {
          return o(r);
        }),
          (e.callback = function () {
            sp(t, n, a);
          }));
      }
      var i = n.stateNode;
      i !== null &&
        typeof i.componentDidCatch == 'function' &&
        (e.callback = function () {
          (sp(t, n, a),
            typeof o != 'function' &&
              (Pn === null ? (Pn = new Set([this])) : Pn.add(this)));
          var s = a.stack;
          this.componentDidCatch(a.value, {
            componentStack: s !== null ? s : '',
          });
        });
    }
    function IM(e, t, n, a, o) {
      if (
        ((n.flags |= 32768),
        a !== null && typeof a == 'object' && typeof a.then == 'function')
      ) {
        if (
          ((t = n.alternate),
          t !== null && zo(t, n, o, !0),
          (n = ct.current),
          n !== null)
        ) {
          switch (n.tag) {
            case 31:
            case 13:
              return (
                St === null
                  ? qs()
                  : n.alternate === null && ge === 0 && (ge = 3),
                (n.flags &= -257),
                (n.flags |= 65536),
                (n.lanes = o),
                a === Ys
                  ? (n.flags |= 16384)
                  : ((t = n.updateQueue),
                    t === null ? (n.updateQueue = new Set([a])) : t.add(a),
                    Wu(e, a, o)),
                !1
              );
            case 22:
              return (
                (n.flags |= 65536),
                a === Ys
                  ? (n.flags |= 16384)
                  : ((t = n.updateQueue),
                    t === null
                      ? ((t = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([a]),
                        }),
                        (n.updateQueue = t))
                      : ((n = t.retryQueue),
                        n === null ? (t.retryQueue = new Set([a])) : n.add(a)),
                    Wu(e, a, o)),
                !1
              );
          }
          throw Error(M(435, n.tag));
        }
        return (Wu(e, a, o), qs(), !1);
      }
      if (L)
        return (
          (t = ct.current),
          t !== null
            ? ((t.flags & 65536) === 0 && (t.flags |= 256),
              (t.flags |= 65536),
              (t.lanes = o),
              a !== mf && ((e = Error(M(422), { cause: a })), Fr(vt(e, n))))
            : (a !== mf && ((t = Error(M(423), { cause: a })), Fr(vt(t, n))),
              (e = e.current.alternate),
              (e.flags |= 65536),
              (o &= -o),
              (e.lanes |= o),
              (a = vt(a, n)),
              (o = Cf(e.stateNode, a, o)),
              $u(e, o),
              ge !== 4 && (ge = 2)),
          !1
        );
      var r = Error(M(520), { cause: a });
      if (
        ((r = vt(r, n)),
        Yr === null ? (Yr = [r]) : Yr.push(r),
        ge !== 4 && (ge = 2),
        t === null)
      )
        return !0;
      ((a = vt(a, n)), (n = t));
      do {
        switch (n.tag) {
          case 3:
            return (
              (n.flags |= 65536),
              (e = o & -o),
              (n.lanes |= e),
              (e = Cf(n.stateNode, a, e)),
              $u(n, e),
              !1
            );
          case 1:
            if (
              ((t = n.type),
              (r = n.stateNode),
              (n.flags & 128) === 0 &&
                (typeof t.getDerivedStateFromError == 'function' ||
                  (r !== null &&
                    typeof r.componentDidCatch == 'function' &&
                    (Pn === null || !Pn.has(r)))))
            )
              return (
                (n.flags |= 65536),
                (o &= -o),
                (n.lanes |= o),
                (o = Cv(o)),
                Nv(o, e, n, a),
                $u(n, o),
                !1
              );
        }
        n = n.return;
      } while (n !== null);
      return !1;
    }
    var Cd = Error(M(461)),
      Ee = !1;
    function Ie(e, t, n, a) {
      t.child = e === null ? Ly(t, null, n, a) : Ea(t, e.child, n, a);
    }
    function lp(e, t, n, a, o) {
      n = n.render;
      var r = t.ref;
      if ('ref' in a) {
        var i = {};
        for (var s in a) s !== 'ref' && (i[s] = a[s]);
      } else i = a;
      return (
        Ma(t),
        (a = hd(e, t, n, i, r, o)),
        (s = gd()),
        e !== null && !Ee
          ? (pd(e, t, o), dn(e, t, o))
          : (L && s && id(t), (t.flags |= 1), Ie(e, t, a, o), t.child)
      );
    }
    function cp(e, t, n, a, o) {
      if (e === null) {
        var r = n.type;
        return typeof r == 'function' &&
          !rd(r) &&
          r.defaultProps === void 0 &&
          n.compare === null
          ? ((t.tag = 15), (t.type = r), wv(e, t, r, a, o))
          : ((e = ps(n.type, null, a, t, t.mode, o)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((r = e.child), !Nd(e, o))) {
        var i = r.memoizedProps;
        if (
          ((n = n.compare),
          (n = n !== null ? n : Zr),
          n(i, a) && e.ref === t.ref)
        )
          return dn(e, t, o);
      }
      return (
        (t.flags |= 1),
        (e = rn(r, a)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
      );
    }
    function wv(e, t, n, a, o) {
      if (e !== null) {
        var r = e.memoizedProps;
        if (Zr(r, a) && e.ref === t.ref)
          if (((Ee = !1), (t.pendingProps = a = r), Nd(e, o)))
            (e.flags & 131072) !== 0 && (Ee = !0);
          else return ((t.lanes = e.lanes), dn(e, t, o));
      }
      return Nf(e, t, n, a, o);
    }
    function Rv(e, t, n, a) {
      var o = a.children,
        r = e !== null ? e.memoizedState : null;
      if (
        (e === null &&
          t.stateNode === null &&
          (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        a.mode === 'hidden')
      ) {
        if ((t.flags & 128) !== 0) {
          if (((r = r !== null ? r.baseLanes | n : n), e !== null)) {
            for (a = t.child = e.child, o = 0; a !== null; )
              ((o = o | a.lanes | a.childLanes), (a = a.sibling));
            a = o & ~r;
          } else ((a = 0), (t.child = null));
          return up(e, t, r, n, a);
        }
        if ((n & 536870912) !== 0)
          ((t.memoizedState = { baseLanes: 0, cachePool: null }),
            e !== null && ys(t, r !== null ? r.cachePool : null),
            r !== null ? Kg(t, r) : Sf(),
            Fy(t));
        else
          return (
            (a = t.lanes = 536870912),
            up(e, t, r !== null ? r.baseLanes | n : n, n, a)
          );
      } else
        r !== null
          ? (ys(t, r.cachePool), Kg(t, r), Hn(t), (t.memoizedState = null))
          : (e !== null && ys(t, null), Sf(), Hn(t));
      return (Ie(e, t, o, n), t.child);
    }
    function Er(e, t) {
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
    function up(e, t, n, a, o) {
      var r = cd();
      return (
        (r = r === null ? null : { parent: Me._currentValue, pool: r }),
        (t.memoizedState = { baseLanes: n, cachePool: r }),
        e !== null && ys(t, null),
        Sf(),
        Fy(t),
        e !== null && zo(e, t, a, !0),
        (t.childLanes = o),
        null
      );
    }
    function Ss(e, t) {
      return (
        (t = Zs({ mode: t.mode, children: t.children }, e.mode)),
        (t.ref = e.ref),
        (e.child = t),
        (t.return = e),
        t
      );
    }
    function fp(e, t, n) {
      return (
        Ea(t, e.child, null, n),
        (e = Ss(t, t.pendingProps)),
        (e.flags |= 2),
        tt(t),
        (t.memoizedState = null),
        e
      );
    }
    function HM(e, t, n) {
      var a = t.pendingProps,
        o = (t.flags & 128) !== 0;
      if (((t.flags &= -129), e === null)) {
        if (L) {
          if (a.mode === 'hidden')
            return ((e = Ss(t, a)), (t.lanes = 536870912), Er(null, e));
          if (
            (Tf(t),
            (e = ie)
              ? ((e = Tb(e, bt)),
                (e = e !== null && e.data === '&' ? e : null),
                e !== null &&
                  ((t.memoizedState = {
                    dehydrated: e,
                    treeContext: Xn !== null ? { id: kt, overflow: Bt } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (n = Hy(e)),
                  (n.return = t),
                  (t.child = n),
                  (Ue = t),
                  (ie = null)))
              : (e = null),
            e === null)
          )
            throw Qn(t);
          return ((t.lanes = 536870912), null);
        }
        return Ss(t, a);
      }
      var r = e.memoizedState;
      if (r !== null) {
        var i = r.dehydrated;
        if ((Tf(t), o))
          if (t.flags & 256) ((t.flags &= -257), (t = fp(e, t, n)));
          else if (t.memoizedState !== null)
            ((t.child = e.child), (t.flags |= 128), (t = null));
          else throw Error(M(558));
        else if (
          (Ee || zo(e, t, n, !1), (o = (n & e.childLanes) !== 0), Ee || o)
        ) {
          if (
            ((a = te),
            a !== null && ((i = iy(a, n)), i !== 0 && i !== r.retryLane))
          )
            throw ((r.retryLane = i), $a(e, i), je(a, e, i), Cd);
          (qs(), (t = fp(e, t, n)));
        } else
          ((e = r.treeContext),
            (ie = Tt(i.nextSibling)),
            (Ue = t),
            (L = !0),
            (Zn = null),
            (bt = !1),
            e !== null && Yy(t, e),
            (t = Ss(t, a)),
            (t.flags |= 4096));
        return t;
      }
      return (
        (e = rn(e.child, { mode: a.mode, children: a.children })),
        (e.ref = t.ref),
        (t.child = e),
        (e.return = t),
        e
      );
    }
    function Ts(e, t) {
      var n = t.ref;
      if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof n != 'function' && typeof n != 'object') throw Error(M(284));
        (e === null || e.ref !== n) && (t.flags |= 4194816);
      }
    }
    function Nf(e, t, n, a, o) {
      return (
        Ma(t),
        (n = hd(e, t, n, a, void 0, o)),
        (a = gd()),
        e !== null && !Ee
          ? (pd(e, t, o), dn(e, t, o))
          : (L && a && id(t), (t.flags |= 1), Ie(e, t, n, o), t.child)
      );
    }
    function dp(e, t, n, a, o, r) {
      return (
        Ma(t),
        (t.updateQueue = null),
        (n = qy(t, a, n, o)),
        Py(e),
        (a = gd()),
        e !== null && !Ee
          ? (pd(e, t, r), dn(e, t, r))
          : (L && a && id(t), (t.flags |= 1), Ie(e, t, n, r), t.child)
      );
    }
    function mp(e, t, n, a, o) {
      if ((Ma(t), t.stateNode === null)) {
        var r = po,
          i = n.contextType;
        (typeof i == 'object' && i !== null && (r = Ye(i)),
          (r = new n(a, r)),
          (t.memoizedState =
            r.state !== null && r.state !== void 0 ? r.state : null),
          (r.updater = Of),
          (t.stateNode = r),
          (r._reactInternals = t),
          (r = t.stateNode),
          (r.props = a),
          (r.state = t.memoizedState),
          (r.refs = {}),
          fd(t),
          (i = n.contextType),
          (r.context = typeof i == 'object' && i !== null ? Ye(i) : po),
          (r.state = t.memoizedState),
          (i = n.getDerivedStateFromProps),
          typeof i == 'function' &&
            (Au(t, n, i, a), (r.state = t.memoizedState)),
          typeof n.getDerivedStateFromProps == 'function' ||
            typeof r.getSnapshotBeforeUpdate == 'function' ||
            (typeof r.UNSAFE_componentWillMount != 'function' &&
              typeof r.componentWillMount != 'function') ||
            ((i = r.state),
            typeof r.componentWillMount == 'function' && r.componentWillMount(),
            typeof r.UNSAFE_componentWillMount == 'function' &&
              r.UNSAFE_componentWillMount(),
            i !== r.state && Of.enqueueReplaceState(r, r.state, null),
            Ar(t, a, r, o),
            xr(),
            (r.state = t.memoizedState)),
          typeof r.componentDidMount == 'function' && (t.flags |= 4194308),
          (a = !0));
      } else if (e === null) {
        r = t.stateNode;
        var s = t.memoizedProps,
          l = Ca(n, s);
        r.props = l;
        var c = r.context,
          u = n.contextType;
        ((i = po), typeof u == 'object' && u !== null && (i = Ye(u)));
        var d = n.getDerivedStateFromProps;
        ((u =
          typeof d == 'function' ||
          typeof r.getSnapshotBeforeUpdate == 'function'),
          (s = t.pendingProps !== s),
          u ||
            (typeof r.UNSAFE_componentWillReceiveProps != 'function' &&
              typeof r.componentWillReceiveProps != 'function') ||
            ((s || c !== i) && ip(t, r, a, i)),
          (xn = !1));
        var f = t.memoizedState;
        ((r.state = f),
          Ar(t, a, r, o),
          xr(),
          (c = t.memoizedState),
          s || f !== c || xn
            ? (typeof d == 'function' &&
                (Au(t, n, d, a), (c = t.memoizedState)),
              (l = xn || rp(t, n, l, a, f, c, i))
                ? (u ||
                    (typeof r.UNSAFE_componentWillMount != 'function' &&
                      typeof r.componentWillMount != 'function') ||
                    (typeof r.componentWillMount == 'function' &&
                      r.componentWillMount(),
                    typeof r.UNSAFE_componentWillMount == 'function' &&
                      r.UNSAFE_componentWillMount()),
                  typeof r.componentDidMount == 'function' &&
                    (t.flags |= 4194308))
                : (typeof r.componentDidMount == 'function' &&
                    (t.flags |= 4194308),
                  (t.memoizedProps = a),
                  (t.memoizedState = c)),
              (r.props = a),
              (r.state = c),
              (r.context = i),
              (a = l))
            : (typeof r.componentDidMount == 'function' && (t.flags |= 4194308),
              (a = !1)));
      } else {
        ((r = t.stateNode),
          vf(e, t),
          (i = t.memoizedProps),
          (u = Ca(n, i)),
          (r.props = u),
          (d = t.pendingProps),
          (f = r.context),
          (c = n.contextType),
          (l = po),
          typeof c == 'object' && c !== null && (l = Ye(c)),
          (s = n.getDerivedStateFromProps),
          (c =
            typeof s == 'function' ||
            typeof r.getSnapshotBeforeUpdate == 'function') ||
            (typeof r.UNSAFE_componentWillReceiveProps != 'function' &&
              typeof r.componentWillReceiveProps != 'function') ||
            ((i !== d || f !== l) && ip(t, r, a, l)),
          (xn = !1),
          (f = t.memoizedState),
          (r.state = f),
          Ar(t, a, r, o),
          xr());
        var m = t.memoizedState;
        i !== d ||
        f !== m ||
        xn ||
        (e !== null && e.dependencies !== null && Us(e.dependencies))
          ? (typeof s == 'function' && (Au(t, n, s, a), (m = t.memoizedState)),
            (u =
              xn ||
              rp(t, n, u, a, f, m, l) ||
              (e !== null && e.dependencies !== null && Us(e.dependencies)))
              ? (c ||
                  (typeof r.UNSAFE_componentWillUpdate != 'function' &&
                    typeof r.componentWillUpdate != 'function') ||
                  (typeof r.componentWillUpdate == 'function' &&
                    r.componentWillUpdate(a, m, l),
                  typeof r.UNSAFE_componentWillUpdate == 'function' &&
                    r.UNSAFE_componentWillUpdate(a, m, l)),
                typeof r.componentDidUpdate == 'function' && (t.flags |= 4),
                typeof r.getSnapshotBeforeUpdate == 'function' &&
                  (t.flags |= 1024))
              : (typeof r.componentDidUpdate != 'function' ||
                  (i === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                typeof r.getSnapshotBeforeUpdate != 'function' ||
                  (i === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = a),
                (t.memoizedState = m)),
            (r.props = a),
            (r.state = m),
            (r.context = l),
            (a = u))
          : (typeof r.componentDidUpdate != 'function' ||
              (i === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof r.getSnapshotBeforeUpdate != 'function' ||
              (i === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (a = !1));
      }
      return (
        (r = a),
        Ts(e, t),
        (a = (t.flags & 128) !== 0),
        r || a
          ? ((r = t.stateNode),
            (n =
              a && typeof n.getDerivedStateFromError != 'function'
                ? null
                : r.render()),
            (t.flags |= 1),
            e !== null && a
              ? ((t.child = Ea(t, e.child, null, o)),
                (t.child = Ea(t, null, n, o)))
              : Ie(e, t, n, o),
            (t.memoizedState = r.state),
            (e = t.child))
          : (e = dn(e, t, o)),
        e
      );
    }
    function hp(e, t, n, a) {
      return (Da(), (t.flags |= 256), Ie(e, t, n, a), t.child);
    }
    var Iu = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null,
    };
    function Hu(e) {
      return { baseLanes: e, cachePool: By() };
    }
    function Uu(e, t, n) {
      return ((e = e !== null ? e.childLanes & ~n : 0), t && (e |= at), e);
    }
    function $v(e, t, n) {
      var a = t.pendingProps,
        o = !1,
        r = (t.flags & 128) !== 0,
        i;
      if (
        ((i = r) ||
          (i =
            e !== null && e.memoizedState === null
              ? !1
              : (pe.current & 2) !== 0),
        i && ((o = !0), (t.flags &= -129)),
        (i = (t.flags & 32) !== 0),
        (t.flags &= -33),
        e === null)
      ) {
        if (L) {
          if (
            (o ? In(t) : Hn(t),
            (e = ie)
              ? ((e = Tb(e, bt)),
                (e = e !== null && e.data !== '&' ? e : null),
                e !== null &&
                  ((t.memoizedState = {
                    dehydrated: e,
                    treeContext: Xn !== null ? { id: kt, overflow: Bt } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (n = Hy(e)),
                  (n.return = t),
                  (t.child = n),
                  (Ue = t),
                  (ie = null)))
              : (e = null),
            e === null)
          )
            throw Qn(t);
          return (Lf(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
        }
        var s = a.children;
        return (
          (a = a.fallback),
          o
            ? (Hn(t),
              (o = t.mode),
              (s = Zs({ mode: 'hidden', children: s }, o)),
              (a = va(a, o, n, null)),
              (s.return = t),
              (a.return = t),
              (s.sibling = a),
              (t.child = s),
              (a = t.child),
              (a.memoizedState = Hu(n)),
              (a.childLanes = Uu(e, i, n)),
              (t.memoizedState = Iu),
              Er(null, a))
            : (In(t), wf(t, s))
        );
      }
      var l = e.memoizedState;
      if (l !== null && ((s = l.dehydrated), s !== null)) {
        if (r)
          t.flags & 256
            ? (In(t), (t.flags &= -257), (t = Yu(e, t, n)))
            : t.memoizedState !== null
              ? (Hn(t), (t.child = e.child), (t.flags |= 128), (t = null))
              : (Hn(t),
                (s = a.fallback),
                (o = t.mode),
                (a = Zs({ mode: 'visible', children: a.children }, o)),
                (s = va(s, o, n, null)),
                (s.flags |= 2),
                (a.return = t),
                (s.return = t),
                (a.sibling = s),
                (t.child = a),
                Ea(t, e.child, null, n),
                (a = t.child),
                (a.memoizedState = Hu(n)),
                (a.childLanes = Uu(e, i, n)),
                (t.memoizedState = Iu),
                (t = Er(null, a)));
        else if ((In(t), Lf(s))) {
          if (((i = s.nextSibling && s.nextSibling.dataset), i)) var c = i.dgst;
          ((i = c),
            (a = Error(M(419))),
            (a.stack = ''),
            (a.digest = i),
            Fr({ value: a, source: null, stack: null }),
            (t = Yu(e, t, n)));
        } else if (
          (Ee || zo(e, t, n, !1), (i = (n & e.childLanes) !== 0), Ee || i)
        ) {
          if (
            ((i = te),
            i !== null && ((a = iy(i, n)), a !== 0 && a !== l.retryLane))
          )
            throw ((l.retryLane = a), $a(e, a), je(i, e, a), Cd);
          (zf(s) || qs(), (t = Yu(e, t, n)));
        } else
          zf(s)
            ? ((t.flags |= 192), (t.child = e.child), (t = null))
            : ((e = l.treeContext),
              (ie = Tt(s.nextSibling)),
              (Ue = t),
              (L = !0),
              (Zn = null),
              (bt = !1),
              e !== null && Yy(t, e),
              (t = wf(t, a.children)),
              (t.flags |= 4096));
        return t;
      }
      return o
        ? (Hn(t),
          (s = a.fallback),
          (o = t.mode),
          (l = e.child),
          (c = l.sibling),
          (a = rn(l, { mode: 'hidden', children: a.children })),
          (a.subtreeFlags = l.subtreeFlags & 65011712),
          c !== null
            ? (s = rn(c, s))
            : ((s = va(s, o, n, null)), (s.flags |= 2)),
          (s.return = t),
          (a.return = t),
          (a.sibling = s),
          (t.child = a),
          Er(null, a),
          (a = t.child),
          (s = e.child.memoizedState),
          s === null
            ? (s = Hu(n))
            : ((o = s.cachePool),
              o !== null
                ? ((l = Me._currentValue),
                  (o = o.parent !== l ? { parent: l, pool: l } : o))
                : (o = By()),
              (s = { baseLanes: s.baseLanes | n, cachePool: o })),
          (a.memoizedState = s),
          (a.childLanes = Uu(e, i, n)),
          (t.memoizedState = Iu),
          Er(e.child, a))
        : (In(t),
          (n = e.child),
          (e = n.sibling),
          (n = rn(n, { mode: 'visible', children: a.children })),
          (n.return = t),
          (n.sibling = null),
          e !== null &&
            ((i = t.deletions),
            i === null ? ((t.deletions = [e]), (t.flags |= 16)) : i.push(e)),
          (t.child = n),
          (t.memoizedState = null),
          n);
    }
    function wf(e, t) {
      return (
        (t = Zs({ mode: 'visible', children: t }, e.mode)),
        (t.return = e),
        (e.child = t)
      );
    }
    function Zs(e, t) {
      return ((e = nt(22, e, null, t)), (e.lanes = 0), e);
    }
    function Yu(e, t, n) {
      return (
        Ea(t, e.child, null, n),
        (e = wf(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function gp(e, t, n) {
      e.lanes |= t;
      var a = e.alternate;
      (a !== null && (a.lanes |= t), gf(e.return, t, n));
    }
    function ku(e, t, n, a, o, r) {
      var i = e.memoizedState;
      i === null
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: a,
            tail: n,
            tailMode: o,
            treeForkCount: r,
          })
        : ((i.isBackwards = t),
          (i.rendering = null),
          (i.renderingStartTime = 0),
          (i.last = a),
          (i.tail = n),
          (i.tailMode = o),
          (i.treeForkCount = r));
    }
    function xv(e, t, n) {
      var a = t.pendingProps,
        o = a.revealOrder,
        r = a.tail;
      a = a.children;
      var i = pe.current,
        s = (i & 2) !== 0;
      if (
        (s ? ((i = (i & 1) | 2), (t.flags |= 128)) : (i &= 1),
        ae(pe, i),
        Ie(e, t, a, n),
        (a = L ? Wr : 0),
        !s && e !== null && (e.flags & 128) !== 0)
      )
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && gp(e, n, t);
          else if (e.tag === 19) gp(e, n, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      switch (o) {
        case 'forwards':
          for (n = t.child, o = null; n !== null; )
            ((e = n.alternate),
              e !== null && Bs(e) === null && (o = n),
              (n = n.sibling));
          ((n = o),
            n === null
              ? ((o = t.child), (t.child = null))
              : ((o = n.sibling), (n.sibling = null)),
            ku(t, !1, o, n, r, a));
          break;
        case 'backwards':
        case 'unstable_legacy-backwards':
          for (n = null, o = t.child, t.child = null; o !== null; ) {
            if (((e = o.alternate), e !== null && Bs(e) === null)) {
              t.child = o;
              break;
            }
            ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
          }
          ku(t, !0, n, null, r, a);
          break;
        case 'together':
          ku(t, !1, null, null, void 0, a);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function dn(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies),
        (Jn |= t.lanes),
        (n & t.childLanes) === 0)
      )
        if (e !== null) {
          if ((zo(e, t, n, !1), (n & t.childLanes) === 0)) return null;
        } else return null;
      if (e !== null && t.child !== e.child) throw Error(M(153));
      if (t.child !== null) {
        for (
          e = t.child, n = rn(e, e.pendingProps), t.child = n, n.return = t;
          e.sibling !== null;
        )
          ((e = e.sibling),
            (n = n.sibling = rn(e, e.pendingProps)),
            (n.return = t));
        n.sibling = null;
      }
      return t.child;
    }
    function Nd(e, t) {
      return (e.lanes & t) !== 0
        ? !0
        : ((e = e.dependencies), !!(e !== null && Us(e)));
    }
    function UM(e, t, n) {
      switch (t.tag) {
        case 3:
          (ws(t, t.stateNode.containerInfo),
            An(t, Me, e.memoizedState.cache),
            Da());
          break;
        case 27:
        case 5:
          tf(t);
          break;
        case 4:
          ws(t, t.stateNode.containerInfo);
          break;
        case 10:
          An(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return ((t.flags |= 128), Tf(t), null);
          break;
        case 13:
          var a = t.memoizedState;
          if (a !== null)
            return a.dehydrated !== null
              ? (In(t), (t.flags |= 128), null)
              : (n & t.child.childLanes) !== 0
                ? $v(e, t, n)
                : (In(t), (e = dn(e, t, n)), e !== null ? e.sibling : null);
          In(t);
          break;
        case 19:
          var o = (e.flags & 128) !== 0;
          if (
            ((a = (n & t.childLanes) !== 0),
            a || (zo(e, t, n, !1), (a = (n & t.childLanes) !== 0)),
            o)
          ) {
            if (a) return xv(e, t, n);
            t.flags |= 128;
          }
          if (
            ((o = t.memoizedState),
            o !== null &&
              ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
            ae(pe, pe.current),
            a)
          )
            break;
          return null;
        case 22:
          return ((t.lanes = 0), Rv(e, t, n, t.pendingProps));
        case 24:
          An(t, Me, e.memoizedState.cache);
      }
      return dn(e, t, n);
    }
    function Av(e, t, n) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps) Ee = !0;
        else {
          if (!Nd(e, n) && (t.flags & 128) === 0)
            return ((Ee = !1), UM(e, t, n));
          Ee = (e.flags & 131072) !== 0;
        }
      else ((Ee = !1), L && (t.flags & 1048576) !== 0 && Uy(t, Wr, t.index));
      switch (((t.lanes = 0), t.tag)) {
        case 16:
          e: {
            var a = t.pendingProps;
            if (((e = ga(t.elementType)), (t.type = e), typeof e == 'function'))
              rd(e)
                ? ((a = Ca(e, a)), (t.tag = 1), (t = mp(null, t, e, a, n)))
                : ((t.tag = 0), (t = Nf(null, t, e, a, n)));
            else {
              if (e != null) {
                var o = e.$$typeof;
                if (o === Pf) {
                  ((t.tag = 11), (t = lp(null, t, e, a, n)));
                  break e;
                } else if (o === qf) {
                  ((t.tag = 14), (t = cp(null, t, e, a, n)));
                  break e;
                }
              }
              throw ((t = Ju(e) || e), Error(M(306, t, '')));
            }
          }
          return t;
        case 0:
          return Nf(e, t, t.type, t.pendingProps, n);
        case 1:
          return ((a = t.type), (o = Ca(a, t.pendingProps)), mp(e, t, a, o, n));
        case 3:
          e: {
            if ((ws(t, t.stateNode.containerInfo), e === null))
              throw Error(M(387));
            a = t.pendingProps;
            var r = t.memoizedState;
            ((o = r.element), vf(e, t), Ar(t, a, null, n));
            var i = t.memoizedState;
            if (
              ((a = i.cache),
              An(t, Me, a),
              a !== r.cache && pf(t, [Me], n, !0),
              xr(),
              (a = i.element),
              r.isDehydrated)
            )
              if (
                ((r = { element: a, isDehydrated: !1, cache: i.cache }),
                (t.updateQueue.baseState = r),
                (t.memoizedState = r),
                t.flags & 256)
              ) {
                t = hp(e, t, a, n);
                break e;
              } else if (a !== o) {
                ((o = vt(Error(M(424)), t)), Fr(o), (t = hp(e, t, a, n)));
                break e;
              } else
                for (
                  e = t.stateNode.containerInfo,
                    e.nodeType === 9
                      ? (e = e.body)
                      : (e = e.nodeName === 'HTML' ? e.ownerDocument.body : e),
                    ie = Tt(e.firstChild),
                    Ue = t,
                    L = !0,
                    Zn = null,
                    bt = !0,
                    n = Ly(t, null, a, n),
                    t.child = n;
                  n;
                )
                  ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            else {
              if ((Da(), a === o)) {
                t = dn(e, t, n);
                break e;
              }
              Ie(e, t, a, n);
            }
            t = t.child;
          }
          return t;
        case 26:
          return (
            Ts(e, t),
            e === null
              ? (n = kp(t.type, null, t.pendingProps, null))
                ? (t.memoizedState = n)
                : L ||
                  ((n = t.type),
                  (e = t.pendingProps),
                  (a = Xs(Ln.current).createElement(n)),
                  (a[He] = t),
                  (a[Ge] = e),
                  ke(a, n, e),
                  Re(a),
                  (t.stateNode = a))
              : (t.memoizedState = kp(
                  t.type,
                  e.memoizedProps,
                  t.pendingProps,
                  e.memoizedState,
                )),
            null
          );
        case 27:
          return (
            tf(t),
            e === null &&
              L &&
              ((a = t.stateNode = Db(t.type, t.pendingProps, Ln.current)),
              (Ue = t),
              (bt = !0),
              (o = ie),
              ta(t.type) ? ((Zf = o), (ie = Tt(a.firstChild))) : (ie = o)),
            Ie(e, t, t.pendingProps.children, n),
            Ts(e, t),
            e === null && (t.flags |= 4194304),
            t.child
          );
        case 5:
          return (
            e === null &&
              L &&
              ((o = a = ie) &&
                ((a = cE(a, t.type, t.pendingProps, bt)),
                a !== null
                  ? ((t.stateNode = a),
                    (Ue = t),
                    (ie = Tt(a.firstChild)),
                    (bt = !1),
                    (o = !0))
                  : (o = !1)),
              o || Qn(t)),
            tf(t),
            (o = t.type),
            (r = t.pendingProps),
            (i = e !== null ? e.memoizedProps : null),
            (a = r.children),
            Bf(o, r) ? (a = null) : i !== null && Bf(o, i) && (t.flags |= 32),
            t.memoizedState !== null &&
              ((o = hd(e, t, CM, null, null, n)), (Xr._currentValue = o)),
            Ts(e, t),
            Ie(e, t, a, n),
            t.child
          );
        case 6:
          return (
            e === null &&
              L &&
              ((e = n = ie) &&
                ((n = uE(n, t.pendingProps, bt)),
                n !== null
                  ? ((t.stateNode = n), (Ue = t), (ie = null), (e = !0))
                  : (e = !1)),
              e || Qn(t)),
            null
          );
        case 13:
          return $v(e, t, n);
        case 4:
          return (
            ws(t, t.stateNode.containerInfo),
            (a = t.pendingProps),
            e === null ? (t.child = Ea(t, null, a, n)) : Ie(e, t, a, n),
            t.child
          );
        case 11:
          return lp(e, t, t.type, t.pendingProps, n);
        case 7:
          return (Ie(e, t, t.pendingProps, n), t.child);
        case 8:
          return (Ie(e, t, t.pendingProps.children, n), t.child);
        case 12:
          return (Ie(e, t, t.pendingProps.children, n), t.child);
        case 10:
          return (
            (a = t.pendingProps),
            An(t, t.type, a.value),
            Ie(e, t, a.children, n),
            t.child
          );
        case 9:
          return (
            (o = t.type._context),
            (a = t.pendingProps.children),
            Ma(t),
            (o = Ye(o)),
            (a = a(o)),
            (t.flags |= 1),
            Ie(e, t, a, n),
            t.child
          );
        case 14:
          return cp(e, t, t.type, t.pendingProps, n);
        case 15:
          return wv(e, t, t.type, t.pendingProps, n);
        case 19:
          return xv(e, t, n);
        case 31:
          return HM(e, t, n);
        case 22:
          return Rv(e, t, n, t.pendingProps);
        case 24:
          return (
            Ma(t),
            (a = Ye(Me)),
            e === null
              ? ((o = cd()),
                o === null &&
                  ((o = te),
                  (r = ld()),
                  (o.pooledCache = r),
                  r.refCount++,
                  r !== null && (o.pooledCacheLanes |= n),
                  (o = r)),
                (t.memoizedState = { parent: a, cache: o }),
                fd(t),
                An(t, Me, o))
              : ((e.lanes & n) !== 0 && (vf(e, t), Ar(t, null, null, n), xr()),
                (o = e.memoizedState),
                (r = t.memoizedState),
                o.parent !== a
                  ? ((o = { parent: a, cache: a }),
                    (t.memoizedState = o),
                    t.lanes === 0 &&
                      (t.memoizedState = t.updateQueue.baseState = o),
                    An(t, Me, a))
                  : ((a = r.cache),
                    An(t, Me, a),
                    a !== o.cache && pf(t, [Me], n, !0))),
            Ie(e, t, t.pendingProps.children, n),
            t.child
          );
        case 29:
          throw t.pendingProps;
      }
      throw Error(M(156, t.tag));
    }
    function Xt(e) {
      e.flags |= 4;
    }
    function Bu(e, t, n, a, o) {
      if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
        if (((e.flags |= 16777216), (o & 335544128) === o))
          if (e.stateNode.complete) e.flags |= 8192;
          else if (nb()) e.flags |= 8192;
          else throw ((Sa = Ys), ud);
      } else e.flags &= -16777217;
    }
    function pp(e, t) {
      if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0)
        e.flags &= -16777217;
      else if (((e.flags |= 16777216), !Ob(t)))
        if (nb()) e.flags |= 8192;
        else throw ((Sa = Ys), ud);
    }
    function rs(e, t) {
      (t !== null && (e.flags |= 4),
        e.flags & 16384 &&
          ((t = e.tag !== 22 ? ay() : 536870912), (e.lanes |= t), (Io |= t)));
    }
    function yr(e, t) {
      if (!L)
        switch (e.tailMode) {
          case 'hidden':
            t = e.tail;
            for (var n = null; t !== null; )
              (t.alternate !== null && (n = t), (t = t.sibling));
            n === null ? (e.tail = null) : (n.sibling = null);
            break;
          case 'collapsed':
            n = e.tail;
            for (var a = null; n !== null; )
              (n.alternate !== null && (a = n), (n = n.sibling));
            a === null
              ? t || e.tail === null
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (a.sibling = null);
        }
    }
    function re(e) {
      var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        a = 0;
      if (t)
        for (var o = e.child; o !== null; )
          ((n |= o.lanes | o.childLanes),
            (a |= o.subtreeFlags & 65011712),
            (a |= o.flags & 65011712),
            (o.return = e),
            (o = o.sibling));
      else
        for (o = e.child; o !== null; )
          ((n |= o.lanes | o.childLanes),
            (a |= o.subtreeFlags),
            (a |= o.flags),
            (o.return = e),
            (o = o.sibling));
      return ((e.subtreeFlags |= a), (e.childLanes = n), t);
    }
    function YM(e, t, n) {
      var a = t.pendingProps;
      switch ((sd(t), t.tag)) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (re(t), null);
        case 1:
          return (re(t), null);
        case 3:
          return (
            (n = t.stateNode),
            (a = null),
            e !== null && (a = e.memoizedState.cache),
            t.memoizedState.cache !== a && (t.flags |= 2048),
            sn(Me),
            No(),
            n.pendingContext &&
              ((n.context = n.pendingContext), (n.pendingContext = null)),
            (e === null || e.child === null) &&
              (ao(t)
                ? Xt(t)
                : e === null ||
                  (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                  ((t.flags |= 1024), Ru())),
            re(t),
            null
          );
        case 26:
          var o = t.type,
            r = t.memoizedState;
          return (
            e === null
              ? (Xt(t),
                r !== null ? (re(t), pp(t, r)) : (re(t), Bu(t, o, null, a, n)))
              : r
                ? r !== e.memoizedState
                  ? (Xt(t), re(t), pp(t, r))
                  : (re(t), (t.flags &= -16777217))
                : ((e = e.memoizedProps),
                  e !== a && Xt(t),
                  re(t),
                  Bu(t, o, e, a, n)),
            null
          );
        case 27:
          if (
            (Rs(t),
            (n = Ln.current),
            (o = t.type),
            e !== null && t.stateNode != null)
          )
            e.memoizedProps !== a && Xt(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(M(166));
              return (re(t), null);
            }
            ((e = zt.current),
              ao(t) ? Pg(t, e) : ((e = Db(o, a, n)), (t.stateNode = e), Xt(t)));
          }
          return (re(t), null);
        case 5:
          if ((Rs(t), (o = t.type), e !== null && t.stateNode != null))
            e.memoizedProps !== a && Xt(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(M(166));
              return (re(t), null);
            }
            if (((r = zt.current), ao(t))) Pg(t, r);
            else {
              var i = Xs(Ln.current);
              switch (r) {
                case 1:
                  r = i.createElementNS('http://www.w3.org/2000/svg', o);
                  break;
                case 2:
                  r = i.createElementNS(
                    'http://www.w3.org/1998/Math/MathML',
                    o,
                  );
                  break;
                default:
                  switch (o) {
                    case 'svg':
                      r = i.createElementNS('http://www.w3.org/2000/svg', o);
                      break;
                    case 'math':
                      r = i.createElementNS(
                        'http://www.w3.org/1998/Math/MathML',
                        o,
                      );
                      break;
                    case 'script':
                      ((r = i.createElement('div')),
                        (r.innerHTML = '<script><\/script>'),
                        (r = r.removeChild(r.firstChild)));
                      break;
                    case 'select':
                      ((r =
                        typeof a.is == 'string'
                          ? i.createElement('select', { is: a.is })
                          : i.createElement('select')),
                        a.multiple
                          ? (r.multiple = !0)
                          : a.size && (r.size = a.size));
                      break;
                    default:
                      r =
                        typeof a.is == 'string'
                          ? i.createElement(o, { is: a.is })
                          : i.createElement(o);
                  }
              }
              ((r[He] = t), (r[Ge] = a));
              e: for (i = t.child; i !== null; ) {
                if (i.tag === 5 || i.tag === 6) r.appendChild(i.stateNode);
                else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                  ((i.child.return = i), (i = i.child));
                  continue;
                }
                if (i === t) break e;
                for (; i.sibling === null; ) {
                  if (i.return === null || i.return === t) break e;
                  i = i.return;
                }
                ((i.sibling.return = i.return), (i = i.sibling));
              }
              t.stateNode = r;
              e: switch ((ke(r, o, a), o)) {
                case 'button':
                case 'input':
                case 'select':
                case 'textarea':
                  a = !!a.autoFocus;
                  break e;
                case 'img':
                  a = !0;
                  break e;
                default:
                  a = !1;
              }
              a && Xt(t);
            }
          }
          return (
            re(t),
            Bu(
              t,
              t.type,
              e === null ? null : e.memoizedProps,
              t.pendingProps,
              n,
            ),
            null
          );
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== a && Xt(t);
          else {
            if (typeof a != 'string' && t.stateNode === null)
              throw Error(M(166));
            if (((e = Ln.current), ao(t))) {
              if (
                ((e = t.stateNode),
                (n = t.memoizedProps),
                (a = null),
                (o = Ue),
                o !== null)
              )
                switch (o.tag) {
                  case 27:
                  case 5:
                    a = o.memoizedProps;
                }
              ((e[He] = t),
                (e = !!(
                  e.nodeValue === n ||
                  (a !== null && a.suppressHydrationWarning === !0) ||
                  vb(e.nodeValue, n)
                )),
                e || Qn(t, !0));
            } else
              ((e = Xs(e).createTextNode(a)), (e[He] = t), (t.stateNode = e));
          }
          return (re(t), null);
        case 31:
          if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
            if (((a = ao(t)), n !== null)) {
              if (e === null) {
                if (!a) throw Error(M(318));
                if (
                  ((e = t.memoizedState),
                  (e = e !== null ? e.dehydrated : null),
                  !e)
                )
                  throw Error(M(557));
                e[He] = t;
              } else
                (Da(),
                  (t.flags & 128) === 0 && (t.memoizedState = null),
                  (t.flags |= 4));
              (re(t), (e = !1));
            } else
              ((n = Ru()),
                e !== null &&
                  e.memoizedState !== null &&
                  (e.memoizedState.hydrationErrors = n),
                (e = !0));
            if (!e) return t.flags & 256 ? (tt(t), t) : (tt(t), null);
            if ((t.flags & 128) !== 0) throw Error(M(558));
          }
          return (re(t), null);
        case 13:
          if (
            ((a = t.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (((o = ao(t)), a !== null && a.dehydrated !== null)) {
              if (e === null) {
                if (!o) throw Error(M(318));
                if (
                  ((o = t.memoizedState),
                  (o = o !== null ? o.dehydrated : null),
                  !o)
                )
                  throw Error(M(317));
                o[He] = t;
              } else
                (Da(),
                  (t.flags & 128) === 0 && (t.memoizedState = null),
                  (t.flags |= 4));
              (re(t), (o = !1));
            } else
              ((o = Ru()),
                e !== null &&
                  e.memoizedState !== null &&
                  (e.memoizedState.hydrationErrors = o),
                (o = !0));
            if (!o) return t.flags & 256 ? (tt(t), t) : (tt(t), null);
          }
          return (
            tt(t),
            (t.flags & 128) !== 0
              ? ((t.lanes = n), t)
              : ((n = a !== null),
                (e = e !== null && e.memoizedState !== null),
                n &&
                  ((a = t.child),
                  (o = null),
                  a.alternate !== null &&
                    a.alternate.memoizedState !== null &&
                    a.alternate.memoizedState.cachePool !== null &&
                    (o = a.alternate.memoizedState.cachePool.pool),
                  (r = null),
                  a.memoizedState !== null &&
                    a.memoizedState.cachePool !== null &&
                    (r = a.memoizedState.cachePool.pool),
                  r !== o && (a.flags |= 2048)),
                n !== e && n && (t.child.flags |= 8192),
                rs(t, t.updateQueue),
                re(t),
                null)
          );
        case 4:
          return (
            No(),
            e === null && Hd(t.stateNode.containerInfo),
            re(t),
            null
          );
        case 10:
          return (sn(t.type), re(t), null);
        case 19:
          if (($e(pe), (a = t.memoizedState), a === null)) return (re(t), null);
          if (((o = (t.flags & 128) !== 0), (r = a.rendering), r === null))
            if (o) yr(a, !1);
            else {
              if (ge !== 0 || (e !== null && (e.flags & 128) !== 0))
                for (e = t.child; e !== null; ) {
                  if (((r = Bs(e)), r !== null)) {
                    for (
                      t.flags |= 128,
                        yr(a, !1),
                        e = r.updateQueue,
                        t.updateQueue = e,
                        rs(t, e),
                        t.subtreeFlags = 0,
                        e = n,
                        n = t.child;
                      n !== null;
                    )
                      (Iy(n, e), (n = n.sibling));
                    return (
                      ae(pe, (pe.current & 1) | 2),
                      L && en(t, a.treeForkCount),
                      t.child
                    );
                  }
                  e = e.sibling;
                }
              a.tail !== null &&
                ot() > Fs &&
                ((t.flags |= 128), (o = !0), yr(a, !1), (t.lanes = 4194304));
            }
          else {
            if (!o)
              if (((e = Bs(r)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (o = !0),
                  (e = e.updateQueue),
                  (t.updateQueue = e),
                  rs(t, e),
                  yr(a, !0),
                  a.tail === null &&
                    a.tailMode === 'hidden' &&
                    !r.alternate &&
                    !L)
                )
                  return (re(t), null);
              } else
                2 * ot() - a.renderingStartTime > Fs &&
                  n !== 536870912 &&
                  ((t.flags |= 128), (o = !0), yr(a, !1), (t.lanes = 4194304));
            a.isBackwards
              ? ((r.sibling = t.child), (t.child = r))
              : ((e = a.last),
                e !== null ? (e.sibling = r) : (t.child = r),
                (a.last = r));
          }
          return a.tail !== null
            ? ((e = a.tail),
              (a.rendering = e),
              (a.tail = e.sibling),
              (a.renderingStartTime = ot()),
              (e.sibling = null),
              (n = pe.current),
              ae(pe, o ? (n & 1) | 2 : n & 1),
              L && en(t, a.treeForkCount),
              e)
            : (re(t), null);
        case 22:
        case 23:
          return (
            tt(t),
            dd(),
            (a = t.memoizedState !== null),
            e !== null
              ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
              : a && (t.flags |= 8192),
            a
              ? (n & 536870912) !== 0 &&
                (t.flags & 128) === 0 &&
                (re(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : re(t),
            (n = t.updateQueue),
            n !== null && rs(t, n.retryQueue),
            (n = null),
            e !== null &&
              e.memoizedState !== null &&
              e.memoizedState.cachePool !== null &&
              (n = e.memoizedState.cachePool.pool),
            (a = null),
            t.memoizedState !== null &&
              t.memoizedState.cachePool !== null &&
              (a = t.memoizedState.cachePool.pool),
            a !== n && (t.flags |= 2048),
            e !== null && $e(ba),
            null
          );
        case 24:
          return (
            (n = null),
            e !== null && (n = e.memoizedState.cache),
            t.memoizedState.cache !== n && (t.flags |= 2048),
            sn(Me),
            re(t),
            null
          );
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(M(156, t.tag));
    }
    function kM(e, t) {
      switch ((sd(t), t.tag)) {
        case 1:
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            sn(Me),
            No(),
            (e = t.flags),
            (e & 65536) !== 0 && (e & 128) === 0
              ? ((t.flags = (e & -65537) | 128), t)
              : null
          );
        case 26:
        case 27:
        case 5:
          return (Rs(t), null);
        case 31:
          if (t.memoizedState !== null) {
            if ((tt(t), t.alternate === null)) throw Error(M(340));
            Da();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 13:
          if (
            (tt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(M(340));
            Da();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 19:
          return ($e(pe), null);
        case 4:
          return (No(), null);
        case 10:
          return (sn(t.type), null);
        case 22:
        case 23:
          return (
            tt(t),
            dd(),
            e !== null && $e(ba),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 24:
          return (sn(Me), null);
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Iv(e, t) {
      switch ((sd(t), t.tag)) {
        case 3:
          (sn(Me), No());
          break;
        case 26:
        case 27:
        case 5:
          Rs(t);
          break;
        case 4:
          No();
          break;
        case 31:
          t.memoizedState !== null && tt(t);
          break;
        case 13:
          tt(t);
          break;
        case 19:
          $e(pe);
          break;
        case 10:
          sn(t.type);
          break;
        case 22:
        case 23:
          (tt(t), dd(), e !== null && $e(ba));
          break;
        case 24:
          sn(Me);
      }
    }
    function si(e, t) {
      try {
        var n = t.updateQueue,
          a = n !== null ? n.lastEffect : null;
        if (a !== null) {
          var o = a.next;
          n = o;
          do {
            if ((n.tag & e) === e) {
              a = void 0;
              var r = n.create,
                i = n.inst;
              ((a = r()), (i.destroy = a));
            }
            n = n.next;
          } while (n !== o);
        }
      } catch (s) {
        Q(t, t.return, s);
      }
    }
    function Kn(e, t, n) {
      try {
        var a = t.updateQueue,
          o = a !== null ? a.lastEffect : null;
        if (o !== null) {
          var r = o.next;
          a = r;
          do {
            if ((a.tag & e) === e) {
              var i = a.inst,
                s = i.destroy;
              if (s !== void 0) {
                ((i.destroy = void 0), (o = t));
                var l = n,
                  c = s;
                try {
                  c();
                } catch (u) {
                  Q(o, l, u);
                }
              }
            }
            a = a.next;
          } while (a !== r);
        }
      } catch (u) {
        Q(t, t.return, u);
      }
    }
    function Hv(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var n = e.stateNode;
        try {
          Wy(t, n);
        } catch (a) {
          Q(e, e.return, a);
        }
      }
    }
    function Uv(e, t, n) {
      ((n.props = Ca(e.type, e.memoizedProps)), (n.state = e.memoizedState));
      try {
        n.componentWillUnmount();
      } catch (a) {
        Q(e, t, a);
      }
    }
    function Hr(e, t) {
      try {
        var n = e.ref;
        if (n !== null) {
          switch (e.tag) {
            case 26:
            case 27:
            case 5:
              var a = e.stateNode;
              break;
            case 30:
              a = e.stateNode;
              break;
            default:
              a = e.stateNode;
          }
          typeof n == 'function' ? (e.refCleanup = n(a)) : (n.current = a);
        }
      } catch (o) {
        Q(e, t, o);
      }
    }
    function _t(e, t) {
      var n = e.ref,
        a = e.refCleanup;
      if (n !== null)
        if (typeof a == 'function')
          try {
            a();
          } catch (o) {
            Q(e, t, o);
          } finally {
            ((e.refCleanup = null),
              (e = e.alternate),
              e != null && (e.refCleanup = null));
          }
        else if (typeof n == 'function')
          try {
            n(null);
          } catch (o) {
            Q(e, t, o);
          }
        else n.current = null;
    }
    function Yv(e) {
      var t = e.type,
        n = e.memoizedProps,
        a = e.stateNode;
      try {
        e: switch (t) {
          case 'button':
          case 'input':
          case 'select':
          case 'textarea':
            n.autoFocus && a.focus();
            break e;
          case 'img':
            n.src ? (a.src = n.src) : n.srcSet && (a.srcset = n.srcSet);
        }
      } catch (o) {
        Q(e, e.return, o);
      }
    }
    function _u(e, t, n) {
      try {
        var a = e.stateNode;
        (aE(a, e.type, n, t), (a[Ge] = t));
      } catch (o) {
        Q(e, e.return, o);
      }
    }
    function kv(e) {
      return (
        e.tag === 5 ||
        e.tag === 3 ||
        e.tag === 26 ||
        (e.tag === 27 && ta(e.type)) ||
        e.tag === 4
      );
    }
    function zu(e) {
      e: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || kv(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
        ) {
          if (
            (e.tag === 27 && ta(e.type)) ||
            e.flags & 2 ||
            e.child === null ||
            e.tag === 4
          )
            continue e;
          ((e.child.return = e), (e = e.child));
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Rf(e, t, n) {
      var a = e.tag;
      if (a === 5 || a === 6)
        ((e = e.stateNode),
          t
            ? (n.nodeType === 9
                ? n.body
                : n.nodeName === 'HTML'
                  ? n.ownerDocument.body
                  : n
              ).insertBefore(e, t)
            : ((t =
                n.nodeType === 9
                  ? n.body
                  : n.nodeName === 'HTML'
                    ? n.ownerDocument.body
                    : n),
              t.appendChild(e),
              (n = n._reactRootContainer),
              n != null || t.onclick !== null || (t.onclick = an)));
      else if (
        a !== 4 &&
        (a === 27 && ta(e.type) && ((n = e.stateNode), (t = null)),
        (e = e.child),
        e !== null)
      )
        for (Rf(e, t, n), e = e.sibling; e !== null; )
          (Rf(e, t, n), (e = e.sibling));
    }
    function Ws(e, t, n) {
      var a = e.tag;
      if (a === 5 || a === 6)
        ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
      else if (
        a !== 4 &&
        (a === 27 && ta(e.type) && (n = e.stateNode), (e = e.child), e !== null)
      )
        for (Ws(e, t, n), e = e.sibling; e !== null; )
          (Ws(e, t, n), (e = e.sibling));
    }
    function Bv(e) {
      var t = e.stateNode,
        n = e.memoizedProps;
      try {
        for (var a = e.type, o = t.attributes; o.length; )
          t.removeAttributeNode(o[0]);
        (ke(t, a, n), (t[He] = e), (t[Ge] = n));
      } catch (r) {
        Q(e, e.return, r);
      }
    }
    var tn = !1,
      De = !1,
      Lu = !1,
      yp = typeof WeakSet == 'function' ? WeakSet : Set,
      we = null;
    function BM(e, t) {
      if (((e = e.containerInfo), (Yf = el), (e = Oy(e)), nd(e))) {
        if ('selectionStart' in e)
          var n = { start: e.selectionStart, end: e.selectionEnd };
        else
          e: {
            n = ((n = e.ownerDocument) && n.defaultView) || window;
            var a = n.getSelection && n.getSelection();
            if (a && a.rangeCount !== 0) {
              n = a.anchorNode;
              var o = a.anchorOffset,
                r = a.focusNode;
              a = a.focusOffset;
              try {
                (n.nodeType, r.nodeType);
              } catch {
                n = null;
                break e;
              }
              var i = 0,
                s = -1,
                l = -1,
                c = 0,
                u = 0,
                d = e,
                f = null;
              t: for (;;) {
                for (
                  var m;
                  d !== n || (o !== 0 && d.nodeType !== 3) || (s = i + o),
                    d !== r || (a !== 0 && d.nodeType !== 3) || (l = i + a),
                    d.nodeType === 3 && (i += d.nodeValue.length),
                    (m = d.firstChild) !== null;
                )
                  ((f = d), (d = m));
                for (;;) {
                  if (d === e) break t;
                  if (
                    (f === n && ++c === o && (s = i),
                    f === r && ++u === a && (l = i),
                    (m = d.nextSibling) !== null)
                  )
                    break;
                  ((d = f), (f = d.parentNode));
                }
                d = m;
              }
              n = s === -1 || l === -1 ? null : { start: s, end: l };
            } else n = null;
          }
        n = n || { start: 0, end: 0 };
      } else n = null;
      for (
        kf = { focusedElem: e, selectionRange: n }, el = !1, we = t;
        we !== null;
      )
        if (
          ((t = we), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
          ((e.return = t), (we = e));
        else
          for (; we !== null; ) {
            switch (((t = we), (r = t.alternate), (e = t.flags), t.tag)) {
              case 0:
                if (
                  (e & 4) !== 0 &&
                  ((e = t.updateQueue),
                  (e = e !== null ? e.events : null),
                  e !== null)
                )
                  for (n = 0; n < e.length; n++)
                    ((o = e[n]), (o.ref.impl = o.nextImpl));
                break;
              case 11:
              case 15:
                break;
              case 1:
                if ((e & 1024) !== 0 && r !== null) {
                  ((e = void 0),
                    (n = t),
                    (o = r.memoizedProps),
                    (r = r.memoizedState),
                    (a = n.stateNode));
                  try {
                    var v = Ca(n.type, o);
                    ((e = a.getSnapshotBeforeUpdate(v, r)),
                      (a.__reactInternalSnapshotBeforeUpdate = e));
                  } catch (p) {
                    Q(n, n.return, p);
                  }
                }
                break;
              case 3:
                if ((e & 1024) !== 0) {
                  if (
                    ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                  )
                    _f(e);
                  else if (n === 1)
                    switch (e.nodeName) {
                      case 'HEAD':
                      case 'HTML':
                      case 'BODY':
                        _f(e);
                        break;
                      default:
                        e.textContent = '';
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
                if ((e & 1024) !== 0) throw Error(M(163));
            }
            if (((e = t.sibling), e !== null)) {
              ((e.return = t.return), (we = e));
              break;
            }
            we = t.return;
          }
    }
    function _v(e, t, n) {
      var a = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          (Kt(e, n), a & 4 && si(5, n));
          break;
        case 1:
          if ((Kt(e, n), a & 4))
            if (((e = n.stateNode), t === null))
              try {
                e.componentDidMount();
              } catch (i) {
                Q(n, n.return, i);
              }
            else {
              var o = Ca(n.type, t.memoizedProps);
              t = t.memoizedState;
              try {
                e.componentDidUpdate(
                  o,
                  t,
                  e.__reactInternalSnapshotBeforeUpdate,
                );
              } catch (i) {
                Q(n, n.return, i);
              }
            }
          (a & 64 && Hv(n), a & 512 && Hr(n, n.return));
          break;
        case 3:
          if ((Kt(e, n), a & 64 && ((e = n.updateQueue), e !== null))) {
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
              Wy(e, t);
            } catch (i) {
              Q(n, n.return, i);
            }
          }
          break;
        case 27:
          t === null && a & 4 && Bv(n);
        case 26:
        case 5:
          (Kt(e, n), t === null && a & 4 && Yv(n), a & 512 && Hr(n, n.return));
          break;
        case 12:
          Kt(e, n);
          break;
        case 31:
          (Kt(e, n), a & 4 && Zv(e, n));
          break;
        case 13:
          (Kt(e, n),
            a & 4 && Wv(e, n),
            a & 64 &&
              ((e = n.memoizedState),
              e !== null &&
                ((e = e.dehydrated),
                e !== null && ((n = VM.bind(null, n)), fE(e, n)))));
          break;
        case 22:
          if (((a = n.memoizedState !== null || tn), !a)) {
            ((t = (t !== null && t.memoizedState !== null) || De), (o = tn));
            var r = De;
            ((tn = a),
              (De = t) && !r
                ? Jt(e, n, (n.subtreeFlags & 8772) !== 0)
                : Kt(e, n),
              (tn = o),
              (De = r));
          }
          break;
        case 30:
          break;
        default:
          Kt(e, n);
      }
    }
    function zv(e) {
      var t = e.alternate;
      (t !== null && ((e.alternate = null), zv(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 && ((t = e.stateNode), t !== null && Xf(t)),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null));
    }
    var fe = null,
      qe = !1;
    function Qt(e, t, n) {
      for (n = n.child; n !== null; ) (Lv(e, t, n), (n = n.sibling));
    }
    function Lv(e, t, n) {
      if (rt && typeof rt.onCommitFiberUnmount == 'function')
        try {
          rt.onCommitFiberUnmount(ei, n);
        } catch {}
      switch (n.tag) {
        case 26:
          (De || _t(n, t),
            Qt(e, t, n),
            n.memoizedState
              ? n.memoizedState.count--
              : n.stateNode &&
                ((n = n.stateNode), n.parentNode.removeChild(n)));
          break;
        case 27:
          De || _t(n, t);
          var a = fe,
            o = qe;
          (ta(n.type) && ((fe = n.stateNode), (qe = !1)),
            Qt(e, t, n),
            Br(n.stateNode),
            (fe = a),
            (qe = o));
          break;
        case 5:
          De || _t(n, t);
        case 6:
          if (
            ((a = fe),
            (o = qe),
            (fe = null),
            Qt(e, t, n),
            (fe = a),
            (qe = o),
            fe !== null)
          )
            if (qe)
              try {
                (fe.nodeType === 9
                  ? fe.body
                  : fe.nodeName === 'HTML'
                    ? fe.ownerDocument.body
                    : fe
                ).removeChild(n.stateNode);
              } catch (r) {
                Q(n, t, r);
              }
            else
              try {
                fe.removeChild(n.stateNode);
              } catch (r) {
                Q(n, t, r);
              }
          break;
        case 18:
          fe !== null &&
            (qe
              ? ((e = fe),
                Ap(
                  e.nodeType === 9
                    ? e.body
                    : e.nodeName === 'HTML'
                      ? e.ownerDocument.body
                      : e,
                  n.stateNode,
                ),
                ko(e))
              : Ap(fe, n.stateNode));
          break;
        case 4:
          ((a = fe),
            (o = qe),
            (fe = n.stateNode.containerInfo),
            (qe = !0),
            Qt(e, t, n),
            (fe = a),
            (qe = o));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          (Kn(2, n, t), De || Kn(4, n, t), Qt(e, t, n));
          break;
        case 1:
          (De ||
            (_t(n, t),
            (a = n.stateNode),
            typeof a.componentWillUnmount == 'function' && Uv(n, t, a)),
            Qt(e, t, n));
          break;
        case 21:
          Qt(e, t, n);
          break;
        case 22:
          ((De = (a = De) || n.memoizedState !== null), Qt(e, t, n), (De = a));
          break;
        default:
          Qt(e, t, n);
      }
    }
    function Zv(e, t) {
      if (
        t.memoizedState === null &&
        ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
      ) {
        e = e.dehydrated;
        try {
          ko(e);
        } catch (n) {
          Q(t, t.return, n);
        }
      }
    }
    function Wv(e, t) {
      if (
        t.memoizedState === null &&
        ((e = t.alternate),
        e !== null &&
          ((e = e.memoizedState),
          e !== null && ((e = e.dehydrated), e !== null)))
      )
        try {
          ko(e);
        } catch (n) {
          Q(t, t.return, n);
        }
    }
    function _M(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return (t === null && (t = e.stateNode = new yp()), t);
        case 22:
          return (
            (e = e.stateNode),
            (t = e._retryCache),
            t === null && (t = e._retryCache = new yp()),
            t
          );
        default:
          throw Error(M(435, e.tag));
      }
    }
    function is(e, t) {
      var n = _M(e);
      t.forEach(function (a) {
        if (!n.has(a)) {
          n.add(a);
          var o = jM.bind(null, e, a);
          a.then(o, o);
        }
      });
    }
    function Fe(e, t) {
      var n = t.deletions;
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var o = n[a],
            r = e,
            i = t,
            s = i;
          e: for (; s !== null; ) {
            switch (s.tag) {
              case 27:
                if (ta(s.type)) {
                  ((fe = s.stateNode), (qe = !1));
                  break e;
                }
                break;
              case 5:
                ((fe = s.stateNode), (qe = !1));
                break e;
              case 3:
              case 4:
                ((fe = s.stateNode.containerInfo), (qe = !0));
                break e;
            }
            s = s.return;
          }
          if (fe === null) throw Error(M(160));
          (Lv(r, i, o),
            (fe = null),
            (qe = !1),
            (r = o.alternate),
            r !== null && (r.return = null),
            (o.return = null));
        }
      if (t.subtreeFlags & 13886)
        for (t = t.child; t !== null; ) (Fv(t, e), (t = t.sibling));
    }
    var Ot = null;
    function Fv(e, t) {
      var n = e.alternate,
        a = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Fe(t, e),
            Pe(e),
            a & 4 && (Kn(3, e, e.return), si(3, e), Kn(5, e, e.return)));
          break;
        case 1:
          (Fe(t, e),
            Pe(e),
            a & 512 && (De || n === null || _t(n, n.return)),
            a & 64 &&
              tn &&
              ((e = e.updateQueue),
              e !== null &&
                ((a = e.callbacks),
                a !== null &&
                  ((n = e.shared.hiddenCallbacks),
                  (e.shared.hiddenCallbacks = n === null ? a : n.concat(a))))));
          break;
        case 26:
          var o = Ot;
          if (
            (Fe(t, e),
            Pe(e),
            a & 512 && (De || n === null || _t(n, n.return)),
            a & 4)
          ) {
            var r = n !== null ? n.memoizedState : null;
            if (((a = e.memoizedState), n === null))
              if (a === null)
                if (e.stateNode === null) {
                  e: {
                    ((a = e.type),
                      (n = e.memoizedProps),
                      (o = o.ownerDocument || o));
                    t: switch (a) {
                      case 'title':
                        ((r = o.getElementsByTagName('title')[0]),
                          (!r ||
                            r[ai] ||
                            r[He] ||
                            r.namespaceURI === 'http://www.w3.org/2000/svg' ||
                            r.hasAttribute('itemprop')) &&
                            ((r = o.createElement(a)),
                            o.head.insertBefore(
                              r,
                              o.querySelector('head > title'),
                            )),
                          ke(r, a, n),
                          (r[He] = e),
                          Re(r),
                          (a = r));
                        break e;
                      case 'link':
                        var i = _p('link', 'href', o).get(a + (n.href || ''));
                        if (i) {
                          for (var s = 0; s < i.length; s++)
                            if (
                              ((r = i[s]),
                              r.getAttribute('href') ===
                                (n.href == null || n.href === ''
                                  ? null
                                  : n.href) &&
                                r.getAttribute('rel') ===
                                  (n.rel == null ? null : n.rel) &&
                                r.getAttribute('title') ===
                                  (n.title == null ? null : n.title) &&
                                r.getAttribute('crossorigin') ===
                                  (n.crossOrigin == null
                                    ? null
                                    : n.crossOrigin))
                            ) {
                              i.splice(s, 1);
                              break t;
                            }
                        }
                        ((r = o.createElement(a)),
                          ke(r, a, n),
                          o.head.appendChild(r));
                        break;
                      case 'meta':
                        if (
                          (i = _p('meta', 'content', o).get(
                            a + (n.content || ''),
                          ))
                        ) {
                          for (s = 0; s < i.length; s++)
                            if (
                              ((r = i[s]),
                              r.getAttribute('content') ===
                                (n.content == null ? null : '' + n.content) &&
                                r.getAttribute('name') ===
                                  (n.name == null ? null : n.name) &&
                                r.getAttribute('property') ===
                                  (n.property == null ? null : n.property) &&
                                r.getAttribute('http-equiv') ===
                                  (n.httpEquiv == null ? null : n.httpEquiv) &&
                                r.getAttribute('charset') ===
                                  (n.charSet == null ? null : n.charSet))
                            ) {
                              i.splice(s, 1);
                              break t;
                            }
                        }
                        ((r = o.createElement(a)),
                          ke(r, a, n),
                          o.head.appendChild(r));
                        break;
                      default:
                        throw Error(M(468, a));
                    }
                    ((r[He] = e), Re(r), (a = r));
                  }
                  e.stateNode = a;
                } else zp(o, e.type, e.stateNode);
              else e.stateNode = Bp(o, a, e.memoizedProps);
            else
              r !== a
                ? (r === null
                    ? n.stateNode !== null &&
                      ((n = n.stateNode), n.parentNode.removeChild(n))
                    : r.count--,
                  a === null
                    ? zp(o, e.type, e.stateNode)
                    : Bp(o, a, e.memoizedProps))
                : a === null &&
                  e.stateNode !== null &&
                  _u(e, e.memoizedProps, n.memoizedProps);
          }
          break;
        case 27:
          (Fe(t, e),
            Pe(e),
            a & 512 && (De || n === null || _t(n, n.return)),
            n !== null && a & 4 && _u(e, e.memoizedProps, n.memoizedProps));
          break;
        case 5:
          if (
            (Fe(t, e),
            Pe(e),
            a & 512 && (De || n === null || _t(n, n.return)),
            e.flags & 32)
          ) {
            o = e.stateNode;
            try {
              Ro(o, '');
            } catch (v) {
              Q(e, e.return, v);
            }
          }
          (a & 4 &&
            e.stateNode != null &&
            ((o = e.memoizedProps), _u(e, o, n !== null ? n.memoizedProps : o)),
            a & 1024 && (Lu = !0));
          break;
        case 6:
          if ((Fe(t, e), Pe(e), a & 4)) {
            if (e.stateNode === null) throw Error(M(162));
            ((a = e.memoizedProps), (n = e.stateNode));
            try {
              n.nodeValue = a;
            } catch (v) {
              Q(e, e.return, v);
            }
          }
          break;
        case 3:
          if (
            ((Es = null),
            (o = Ot),
            (Ot = Qs(t.containerInfo)),
            Fe(t, e),
            (Ot = o),
            Pe(e),
            a & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              ko(t.containerInfo);
            } catch (v) {
              Q(e, e.return, v);
            }
          Lu && ((Lu = !1), Pv(e));
          break;
        case 4:
          ((a = Ot),
            (Ot = Qs(e.stateNode.containerInfo)),
            Fe(t, e),
            Pe(e),
            (Ot = a));
          break;
        case 12:
          (Fe(t, e), Pe(e));
          break;
        case 31:
          (Fe(t, e),
            Pe(e),
            a & 4 &&
              ((a = e.updateQueue),
              a !== null && ((e.updateQueue = null), is(e, a))));
          break;
        case 13:
          (Fe(t, e),
            Pe(e),
            e.child.flags & 8192 &&
              (e.memoizedState !== null) !=
                (n !== null && n.memoizedState !== null) &&
              (ml = ot()),
            a & 4 &&
              ((a = e.updateQueue),
              a !== null && ((e.updateQueue = null), is(e, a))));
          break;
        case 22:
          o = e.memoizedState !== null;
          var l = n !== null && n.memoizedState !== null,
            c = tn,
            u = De;
          if (
            ((tn = c || o),
            (De = u || l),
            Fe(t, e),
            (De = u),
            (tn = c),
            Pe(e),
            a & 8192)
          )
            e: for (
              t = e.stateNode,
                t._visibility = o ? t._visibility & -2 : t._visibility | 1,
                o && (n === null || l || tn || De || pa(e)),
                n = null,
                t = e;
              ;
            ) {
              if (t.tag === 5 || t.tag === 26) {
                if (n === null) {
                  l = n = t;
                  try {
                    if (((r = l.stateNode), o))
                      ((i = r.style),
                        typeof i.setProperty == 'function'
                          ? i.setProperty('display', 'none', 'important')
                          : (i.display = 'none'));
                    else {
                      s = l.stateNode;
                      var d = l.memoizedProps.style,
                        f =
                          d != null && d.hasOwnProperty('display')
                            ? d.display
                            : null;
                      s.style.display =
                        f == null || typeof f == 'boolean'
                          ? ''
                          : ('' + f).trim();
                    }
                  } catch (v) {
                    Q(l, l.return, v);
                  }
                }
              } else if (t.tag === 6) {
                if (n === null) {
                  l = t;
                  try {
                    l.stateNode.nodeValue = o ? '' : l.memoizedProps;
                  } catch (v) {
                    Q(l, l.return, v);
                  }
                }
              } else if (t.tag === 18) {
                if (n === null) {
                  l = t;
                  try {
                    var m = l.stateNode;
                    o ? Ip(m, !0) : Ip(l.stateNode, !1);
                  } catch (v) {
                    Q(l, l.return, v);
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
              if (t === e) break e;
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) break e;
                (n === t && (n = null), (t = t.return));
              }
              (n === t && (n = null),
                (t.sibling.return = t.return),
                (t = t.sibling));
            }
          a & 4 &&
            ((a = e.updateQueue),
            a !== null &&
              ((n = a.retryQueue),
              n !== null && ((a.retryQueue = null), is(e, n))));
          break;
        case 19:
          (Fe(t, e),
            Pe(e),
            a & 4 &&
              ((a = e.updateQueue),
              a !== null && ((e.updateQueue = null), is(e, a))));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          (Fe(t, e), Pe(e));
      }
    }
    function Pe(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          for (var n, a = e.return; a !== null; ) {
            if (kv(a)) {
              n = a;
              break;
            }
            a = a.return;
          }
          if (n == null) throw Error(M(160));
          switch (n.tag) {
            case 27:
              var o = n.stateNode,
                r = zu(e);
              Ws(e, r, o);
              break;
            case 5:
              var i = n.stateNode;
              n.flags & 32 && (Ro(i, ''), (n.flags &= -33));
              var s = zu(e);
              Ws(e, s, i);
              break;
            case 3:
            case 4:
              var l = n.stateNode.containerInfo,
                c = zu(e);
              Rf(e, c, l);
              break;
            default:
              throw Error(M(161));
          }
        } catch (u) {
          Q(e, e.return, u);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function Pv(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e;
          (Pv(t),
            t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
            (e = e.sibling));
        }
    }
    function Kt(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; )
          (_v(e, t.alternate, t), (t = t.sibling));
    }
    function pa(e) {
      for (e = e.child; e !== null; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            (Kn(4, t, t.return), pa(t));
            break;
          case 1:
            _t(t, t.return);
            var n = t.stateNode;
            (typeof n.componentWillUnmount == 'function' && Uv(t, t.return, n),
              pa(t));
            break;
          case 27:
            Br(t.stateNode);
          case 26:
          case 5:
            (_t(t, t.return), pa(t));
            break;
          case 22:
            t.memoizedState === null && pa(t);
            break;
          case 30:
            pa(t);
            break;
          default:
            pa(t);
        }
        e = e.sibling;
      }
    }
    function Jt(e, t, n) {
      for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
        var a = t.alternate,
          o = e,
          r = t,
          i = r.flags;
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            (Jt(o, r, n), si(4, r));
            break;
          case 1:
            if (
              (Jt(o, r, n),
              (a = r),
              (o = a.stateNode),
              typeof o.componentDidMount == 'function')
            )
              try {
                o.componentDidMount();
              } catch (c) {
                Q(a, a.return, c);
              }
            if (((a = r), (o = a.updateQueue), o !== null)) {
              var s = a.stateNode;
              try {
                var l = o.shared.hiddenCallbacks;
                if (l !== null)
                  for (
                    o.shared.hiddenCallbacks = null, o = 0;
                    o < l.length;
                    o++
                  )
                    Zy(l[o], s);
              } catch (c) {
                Q(a, a.return, c);
              }
            }
            (n && i & 64 && Hv(r), Hr(r, r.return));
            break;
          case 27:
            Bv(r);
          case 26:
          case 5:
            (Jt(o, r, n), n && a === null && i & 4 && Yv(r), Hr(r, r.return));
            break;
          case 12:
            Jt(o, r, n);
            break;
          case 31:
            (Jt(o, r, n), n && i & 4 && Zv(o, r));
            break;
          case 13:
            (Jt(o, r, n), n && i & 4 && Wv(o, r));
            break;
          case 22:
            (r.memoizedState === null && Jt(o, r, n), Hr(r, r.return));
            break;
          case 30:
            break;
          default:
            Jt(o, r, n);
        }
        t = t.sibling;
      }
    }
    function wd(e, t) {
      var n = null;
      (e !== null &&
        e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (n = e.memoizedState.cachePool.pool),
        (e = null),
        t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (e = t.memoizedState.cachePool.pool),
        e !== n && (e != null && e.refCount++, n != null && ri(n)));
    }
    function Rd(e, t) {
      ((e = null),
        t.alternate !== null && (e = t.alternate.memoizedState.cache),
        (t = t.memoizedState.cache),
        t !== e && (t.refCount++, e != null && ri(e)));
    }
    function Et(e, t, n, a) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) (qv(e, t, n, a), (t = t.sibling));
    }
    function qv(e, t, n, a) {
      var o = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          (Et(e, t, n, a), o & 2048 && si(9, t));
          break;
        case 1:
          Et(e, t, n, a);
          break;
        case 3:
          (Et(e, t, n, a),
            o & 2048 &&
              ((e = null),
              t.alternate !== null && (e = t.alternate.memoizedState.cache),
              (t = t.memoizedState.cache),
              t !== e && (t.refCount++, e != null && ri(e))));
          break;
        case 12:
          if (o & 2048) {
            (Et(e, t, n, a), (e = t.stateNode));
            try {
              var r = t.memoizedProps,
                i = r.id,
                s = r.onPostCommit;
              typeof s == 'function' &&
                s(
                  i,
                  t.alternate === null ? 'mount' : 'update',
                  e.passiveEffectDuration,
                  -0,
                );
            } catch (l) {
              Q(t, t.return, l);
            }
          } else Et(e, t, n, a);
          break;
        case 31:
          Et(e, t, n, a);
          break;
        case 13:
          Et(e, t, n, a);
          break;
        case 23:
          break;
        case 22:
          ((r = t.stateNode),
            (i = t.alternate),
            t.memoizedState !== null
              ? r._visibility & 2
                ? Et(e, t, n, a)
                : Ur(e, t)
              : r._visibility & 2
                ? Et(e, t, n, a)
                : ((r._visibility |= 2),
                  ro(e, t, n, a, (t.subtreeFlags & 10256) !== 0 || !1)),
            o & 2048 && wd(i, t));
          break;
        case 24:
          (Et(e, t, n, a), o & 2048 && Rd(t.alternate, t));
          break;
        default:
          Et(e, t, n, a);
      }
    }
    function ro(e, t, n, a, o) {
      for (
        o = o && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
        t !== null;
      ) {
        var r = e,
          i = t,
          s = n,
          l = a,
          c = i.flags;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            (ro(r, i, s, l, o), si(8, i));
            break;
          case 23:
            break;
          case 22:
            var u = i.stateNode;
            (i.memoizedState !== null
              ? u._visibility & 2
                ? ro(r, i, s, l, o)
                : Ur(r, i)
              : ((u._visibility |= 2), ro(r, i, s, l, o)),
              o && c & 2048 && wd(i.alternate, i));
            break;
          case 24:
            (ro(r, i, s, l, o), o && c & 2048 && Rd(i.alternate, i));
            break;
          default:
            ro(r, i, s, l, o);
        }
        t = t.sibling;
      }
    }
    function Ur(e, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var n = e,
            a = t,
            o = a.flags;
          switch (a.tag) {
            case 22:
              (Ur(n, a), o & 2048 && wd(a.alternate, a));
              break;
            case 24:
              (Ur(n, a), o & 2048 && Rd(a.alternate, a));
              break;
            default:
              Ur(n, a);
          }
          t = t.sibling;
        }
    }
    var Or = 8192;
    function oo(e, t, n) {
      if (e.subtreeFlags & Or)
        for (e = e.child; e !== null; ) (Vv(e, t, n), (e = e.sibling));
    }
    function Vv(e, t, n) {
      switch (e.tag) {
        case 26:
          (oo(e, t, n),
            e.flags & Or &&
              e.memoizedState !== null &&
              ME(n, Ot, e.memoizedState, e.memoizedProps));
          break;
        case 5:
          oo(e, t, n);
          break;
        case 3:
        case 4:
          var a = Ot;
          ((Ot = Qs(e.stateNode.containerInfo)), oo(e, t, n), (Ot = a));
          break;
        case 22:
          e.memoizedState === null &&
            ((a = e.alternate),
            a !== null && a.memoizedState !== null
              ? ((a = Or), (Or = 16777216), oo(e, t, n), (Or = a))
              : oo(e, t, n));
          break;
        default:
          oo(e, t, n);
      }
    }
    function jv(e) {
      var t = e.alternate;
      if (t !== null && ((e = t.child), e !== null)) {
        t.child = null;
        do ((t = e.sibling), (e.sibling = null), (e = t));
        while (e !== null);
      }
    }
    function vr(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var a = t[n];
            ((we = a), Xv(a, e));
          }
        jv(e);
      }
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; ) (Gv(e), (e = e.sibling));
    }
    function Gv(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          (vr(e), e.flags & 2048 && Kn(9, e, e.return));
          break;
        case 3:
          vr(e);
          break;
        case 12:
          vr(e);
          break;
        case 22:
          var t = e.stateNode;
          e.memoizedState !== null &&
          t._visibility & 2 &&
          (e.return === null || e.return.tag !== 13)
            ? ((t._visibility &= -3), Ds(e))
            : vr(e);
          break;
        default:
          vr(e);
      }
    }
    function Ds(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var a = t[n];
            ((we = a), Xv(a, e));
          }
        jv(e);
      }
      for (e = e.child; e !== null; ) {
        switch (((t = e), t.tag)) {
          case 0:
          case 11:
          case 15:
            (Kn(8, t, t.return), Ds(t));
            break;
          case 22:
            ((n = t.stateNode),
              n._visibility & 2 && ((n._visibility &= -3), Ds(t)));
            break;
          default:
            Ds(t);
        }
        e = e.sibling;
      }
    }
    function Xv(e, t) {
      for (; we !== null; ) {
        var n = we;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Kn(8, n, t);
            break;
          case 23:
          case 22:
            if (
              n.memoizedState !== null &&
              n.memoizedState.cachePool !== null
            ) {
              var a = n.memoizedState.cachePool.pool;
              a != null && a.refCount++;
            }
            break;
          case 24:
            ri(n.memoizedState.cache);
        }
        if (((a = n.child), a !== null)) ((a.return = n), (we = a));
        else
          e: for (n = e; we !== null; ) {
            a = we;
            var o = a.sibling,
              r = a.return;
            if ((zv(a), a === n)) {
              we = null;
              break e;
            }
            if (o !== null) {
              ((o.return = r), (we = o));
              break e;
            }
            we = r;
          }
      }
    }
    var zM = {
        getCacheForType: function (e) {
          var t = Ye(Me),
            n = t.data.get(e);
          return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
        },
        cacheSignal: function () {
          return Ye(Me).controller.signal;
        },
      },
      LM = typeof WeakMap == 'function' ? WeakMap : Map,
      P = 0,
      te = null,
      _ = null,
      z = 0,
      X = 0,
      et = null,
      Bn = !1,
      Zo = !1,
      $d = !1,
      mn = 0,
      ge = 0,
      Jn = 0,
      Ta = 0,
      xd = 0,
      at = 0,
      Io = 0,
      Yr = null,
      Ve = null,
      $f = !1,
      ml = 0,
      Qv = 0,
      Fs = 1 / 0,
      Ps = null,
      Pn = null,
      Ce = 0,
      qn = null,
      Ho = null,
      ln = 0,
      xf = 0,
      Af = null,
      Kv = null,
      kr = 0,
      If = null;
    function st() {
      return (P & 2) !== 0 && z !== 0 ? z & -z : H.T !== null ? Id() : sy();
    }
    function Jv() {
      if (at === 0)
        if ((z & 536870912) === 0 || L) {
          var e = Xi;
          ((Xi <<= 1), (Xi & 3932160) === 0 && (Xi = 262144), (at = e));
        } else at = 536870912;
      return ((e = ct.current), e !== null && (e.flags |= 32), at);
    }
    function je(e, t, n) {
      (((e === te && (X === 2 || X === 9)) || e.cancelPendingCommit !== null) &&
        (Uo(e, 0), _n(e, z, at, !1)),
        ni(e, n),
        ((P & 2) === 0 || e !== te) &&
          (e === te &&
            ((P & 2) === 0 && (Ta |= n), ge === 4 && _n(e, z, at, !1)),
          Zt(e)));
    }
    function eb(e, t, n) {
      if ((P & 6) !== 0) throw Error(M(327));
      var a = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || ti(e, t),
        o = a ? FM(e, t) : Zu(e, t, !0),
        r = a;
      do {
        if (o === 0) {
          Zo && !a && _n(e, t, 0, !1);
          break;
        } else {
          if (((n = e.current.alternate), r && !ZM(n))) {
            ((o = Zu(e, t, !1)), (r = !1));
            continue;
          }
          if (o === 2) {
            if (((r = t), e.errorRecoveryDisabledLanes & r)) var i = 0;
            else
              ((i = e.pendingLanes & -536870913),
                (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0));
            if (i !== 0) {
              t = i;
              e: {
                var s = e;
                o = Yr;
                var l = s.current.memoizedState.isDehydrated;
                if (
                  (l && (Uo(s, i).flags |= 256), (i = Zu(s, i, !1)), i !== 2)
                ) {
                  if ($d && !l) {
                    ((s.errorRecoveryDisabledLanes |= r), (Ta |= r), (o = 4));
                    break e;
                  }
                  ((r = Ve),
                    (Ve = o),
                    r !== null &&
                      (Ve === null ? (Ve = r) : Ve.push.apply(Ve, r)));
                }
                o = i;
              }
              if (((r = !1), o !== 2)) continue;
            }
          }
          if (o === 1) {
            (Uo(e, 0), _n(e, t, 0, !0));
            break;
          }
          e: {
            switch (((a = e), (r = o), r)) {
              case 0:
              case 1:
                throw Error(M(345));
              case 4:
                if ((t & 4194048) !== t) break;
              case 6:
                _n(a, t, at, !Bn);
                break e;
              case 2:
                Ve = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(M(329));
            }
            if ((t & 62914560) === t && ((o = ml + 300 - ot()), 10 < o)) {
              if ((_n(a, t, at, !Bn), nl(a, 0, !0) !== 0)) break e;
              ((ln = t),
                (a.timeoutHandle = Sb(
                  vp.bind(
                    null,
                    a,
                    n,
                    Ve,
                    Ps,
                    $f,
                    t,
                    at,
                    Ta,
                    Io,
                    Bn,
                    r,
                    'Throttled',
                    -0,
                    0,
                  ),
                  o,
                )));
              break e;
            }
            vp(a, n, Ve, Ps, $f, t, at, Ta, Io, Bn, r, null, -0, 0);
          }
        }
        break;
      } while (!0);
      Zt(e);
    }
    function vp(e, t, n, a, o, r, i, s, l, c, u, d, f, m) {
      if (
        ((e.timeoutHandle = -1),
        (d = t.subtreeFlags),
        d & 8192 || (d & 16785408) === 16785408)
      ) {
        ((d = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: !0,
          waitingForViewTransition: !1,
          unsuspend: an,
        }),
          Vv(t, r, d));
        var v =
          (r & 62914560) === r
            ? ml - ot()
            : (r & 4194048) === r
              ? Qv - ot()
              : 0;
        if (((v = EE(d, v)), v !== null)) {
          ((ln = r),
            (e.cancelPendingCommit = v(
              Sp.bind(null, e, t, r, n, a, o, i, s, l, u, d, null, f, m),
            )),
            _n(e, r, i, !c));
          return;
        }
      }
      Sp(e, t, r, n, a, o, i, s, l);
    }
    function ZM(e) {
      for (var t = e; ; ) {
        var n = t.tag;
        if (
          (n === 0 || n === 11 || n === 15) &&
          t.flags & 16384 &&
          ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
        )
          for (var a = 0; a < n.length; a++) {
            var o = n[a],
              r = o.getSnapshot;
            o = o.value;
            try {
              if (!lt(r(), o)) return !1;
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
    function _n(e, t, n, a) {
      ((t &= ~xd),
        (t &= ~Ta),
        (e.suspendedLanes |= t),
        (e.pingedLanes &= ~t),
        a && (e.warmLanes |= t),
        (a = e.expirationTimes));
      for (var o = t; 0 < o; ) {
        var r = 31 - it(o),
          i = 1 << r;
        ((a[r] = -1), (o &= ~i));
      }
      n !== 0 && oy(e, n, t);
    }
    function hl() {
      return (P & 6) === 0 ? (li(0, !1), !1) : !0;
    }
    function Ad() {
      if (_ !== null) {
        if (X === 0) var e = _.return;
        else ((e = _), (on = xa = null), yd(e), (Eo = null), (Pr = 0), (e = _));
        for (; e !== null; ) (Iv(e.alternate, e), (e = e.return));
        _ = null;
      }
    }
    function Uo(e, t) {
      var n = e.timeoutHandle;
      (n !== -1 && ((e.timeoutHandle = -1), iE(n)),
        (n = e.cancelPendingCommit),
        n !== null && ((e.cancelPendingCommit = null), n()),
        (ln = 0),
        Ad(),
        (te = e),
        (_ = n = rn(e.current, null)),
        (z = t),
        (X = 0),
        (et = null),
        (Bn = !1),
        (Zo = ti(e, t)),
        ($d = !1),
        (Io = at = xd = Ta = Jn = ge = 0),
        (Ve = Yr = null),
        ($f = !1),
        (t & 8) !== 0 && (t |= t & 32));
      var a = e.entangledLanes;
      if (a !== 0)
        for (e = e.entanglements, a &= t; 0 < a; ) {
          var o = 31 - it(a),
            r = 1 << o;
          ((t |= e[o]), (a &= ~r));
        }
      return ((mn = t), il(), n);
    }
    function tb(e, t) {
      ((Y = null),
        (H.H = Vr),
        t === Lo || t === ll
          ? ((t = Xg()), (X = 3))
          : t === ud
            ? ((t = Xg()), (X = 4))
            : (X =
                t === Cd
                  ? 8
                  : t !== null &&
                      typeof t == 'object' &&
                      typeof t.then == 'function'
                    ? 6
                    : 1),
        (et = t),
        _ === null && ((ge = 1), Ls(e, vt(t, e.current))));
    }
    function nb() {
      var e = ct.current;
      return e === null
        ? !0
        : (z & 4194048) === z
          ? St === null
          : (z & 62914560) === z || (z & 536870912) !== 0
            ? e === St
            : !1;
    }
    function ab() {
      var e = H.H;
      return ((H.H = Vr), e === null ? Vr : e);
    }
    function ob() {
      var e = H.A;
      return ((H.A = zM), e);
    }
    function qs() {
      ((ge = 4),
        Bn || ((z & 4194048) !== z && ct.current !== null) || (Zo = !0),
        ((Jn & 134217727) === 0 && (Ta & 134217727) === 0) ||
          te === null ||
          _n(te, z, at, !1));
    }
    function Zu(e, t, n) {
      var a = P;
      P |= 2;
      var o = ab(),
        r = ob();
      ((te !== e || z !== t) && ((Ps = null), Uo(e, t)), (t = !1));
      var i = ge;
      e: do
        try {
          if (X !== 0 && _ !== null) {
            var s = _,
              l = et;
            switch (X) {
              case 8:
                (Ad(), (i = 6));
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                ct.current === null && (t = !0);
                var c = X;
                if (((X = 0), (et = null), bo(e, s, l, c), n && Zo)) {
                  i = 0;
                  break e;
                }
                break;
              default:
                ((c = X), (X = 0), (et = null), bo(e, s, l, c));
            }
          }
          (WM(), (i = ge));
          break;
        } catch (u) {
          tb(e, u);
        }
      while (!0);
      return (
        t && e.shellSuspendCounter++,
        (on = xa = null),
        (P = a),
        (H.H = o),
        (H.A = r),
        _ === null && ((te = null), (z = 0), il()),
        i
      );
    }
    function WM() {
      for (; _ !== null; ) rb(_);
    }
    function FM(e, t) {
      var n = P;
      P |= 2;
      var a = ab(),
        o = ob();
      te !== e || z !== t
        ? ((Ps = null), (Fs = ot() + 500), Uo(e, t))
        : (Zo = ti(e, t));
      e: do
        try {
          if (X !== 0 && _ !== null) {
            t = _;
            var r = et;
            t: switch (X) {
              case 1:
                ((X = 0), (et = null), bo(e, t, r, 1));
                break;
              case 2:
              case 9:
                if (Gg(r)) {
                  ((X = 0), (et = null), bp(t));
                  break;
                }
                ((t = function () {
                  ((X !== 2 && X !== 9) || te !== e || (X = 7), Zt(e));
                }),
                  r.then(t, t));
                break e;
              case 3:
                X = 7;
                break e;
              case 4:
                X = 5;
                break e;
              case 7:
                Gg(r)
                  ? ((X = 0), (et = null), bp(t))
                  : ((X = 0), (et = null), bo(e, t, r, 7));
                break;
              case 5:
                var i = null;
                switch (_.tag) {
                  case 26:
                    i = _.memoizedState;
                  case 5:
                  case 27:
                    var s = _;
                    if (i ? Ob(i) : s.stateNode.complete) {
                      ((X = 0), (et = null));
                      var l = s.sibling;
                      if (l !== null) _ = l;
                      else {
                        var c = s.return;
                        c !== null ? ((_ = c), gl(c)) : (_ = null);
                      }
                      break t;
                    }
                }
                ((X = 0), (et = null), bo(e, t, r, 5));
                break;
              case 6:
                ((X = 0), (et = null), bo(e, t, r, 6));
                break;
              case 8:
                (Ad(), (ge = 6));
                break e;
              default:
                throw Error(M(462));
            }
          }
          PM();
          break;
        } catch (u) {
          tb(e, u);
        }
      while (!0);
      return (
        (on = xa = null),
        (H.H = a),
        (H.A = o),
        (P = n),
        _ !== null ? 0 : ((te = null), (z = 0), il(), ge)
      );
    }
    function PM() {
      for (; _ !== null && !hD(); ) rb(_);
    }
    function rb(e) {
      var t = Av(e.alternate, e, mn);
      ((e.memoizedProps = e.pendingProps), t === null ? gl(e) : (_ = t));
    }
    function bp(e) {
      var t = e,
        n = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = dp(n, t, t.pendingProps, t.type, void 0, z);
          break;
        case 11:
          t = dp(n, t, t.pendingProps, t.type.render, t.ref, z);
          break;
        case 5:
          yd(t);
        default:
          (Iv(n, t), (t = _ = Iy(t, mn)), (t = Av(n, t, mn)));
      }
      ((e.memoizedProps = e.pendingProps), t === null ? gl(e) : (_ = t));
    }
    function bo(e, t, n, a) {
      ((on = xa = null), yd(t), (Eo = null), (Pr = 0));
      var o = t.return;
      try {
        if (IM(e, o, t, n, z)) {
          ((ge = 1), Ls(e, vt(n, e.current)), (_ = null));
          return;
        }
      } catch (r) {
        if (o !== null) throw ((_ = o), r);
        ((ge = 1), Ls(e, vt(n, e.current)), (_ = null));
        return;
      }
      t.flags & 32768
        ? (L || a === 1
            ? (e = !0)
            : Zo || (z & 536870912) !== 0
              ? (e = !1)
              : ((Bn = e = !0),
                (a === 2 || a === 9 || a === 3 || a === 6) &&
                  ((a = ct.current),
                  a !== null && a.tag === 13 && (a.flags |= 16384))),
          ib(t, e))
        : gl(t);
    }
    function gl(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          ib(t, Bn);
          return;
        }
        e = t.return;
        var n = YM(t.alternate, t, mn);
        if (n !== null) {
          _ = n;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          _ = t;
          return;
        }
        _ = t = e;
      } while (t !== null);
      ge === 0 && (ge = 5);
    }
    function ib(e, t) {
      do {
        var n = kM(e.alternate, e);
        if (n !== null) {
          ((n.flags &= 32767), (_ = n));
          return;
        }
        if (
          ((n = e.return),
          n !== null &&
            ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
          !t && ((e = e.sibling), e !== null))
        ) {
          _ = e;
          return;
        }
        _ = e = n;
      } while (e !== null);
      ((ge = 6), (_ = null));
    }
    function Sp(e, t, n, a, o, r, i, s, l) {
      e.cancelPendingCommit = null;
      do pl();
      while (Ce !== 0);
      if ((P & 6) !== 0) throw Error(M(327));
      if (t !== null) {
        if (t === e.current) throw Error(M(177));
        if (
          ((r = t.lanes | t.childLanes),
          (r |= ad),
          ED(e, n, r, i, s, l),
          e === te && ((_ = te = null), (z = 0)),
          (Ho = t),
          (qn = e),
          (ln = n),
          (xf = r),
          (Af = o),
          (Kv = a),
          (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
            ? ((e.callbackNode = null),
              (e.callbackPriority = 0),
              GM($s, function () {
                return (fb(), null);
              }))
            : ((e.callbackNode = null), (e.callbackPriority = 0)),
          (a = (t.flags & 13878) !== 0),
          (t.subtreeFlags & 13878) !== 0 || a)
        ) {
          ((a = H.T), (H.T = null), (o = q.p), (q.p = 2), (i = P), (P |= 4));
          try {
            BM(e, t, n);
          } finally {
            ((P = i), (q.p = o), (H.T = a));
          }
        }
        ((Ce = 1), sb(), lb(), cb());
      }
    }
    function sb() {
      if (Ce === 1) {
        Ce = 0;
        var e = qn,
          t = Ho,
          n = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || n) {
          ((n = H.T), (H.T = null));
          var a = q.p;
          q.p = 2;
          var o = P;
          P |= 4;
          try {
            Fv(t, e);
            var r = kf,
              i = Oy(e.containerInfo),
              s = r.focusedElem,
              l = r.selectionRange;
            if (
              i !== s &&
              s &&
              s.ownerDocument &&
              Ey(s.ownerDocument.documentElement, s)
            ) {
              if (l !== null && nd(s)) {
                var c = l.start,
                  u = l.end;
                if ((u === void 0 && (u = c), 'selectionStart' in s))
                  ((s.selectionStart = c),
                    (s.selectionEnd = Math.min(u, s.value.length)));
                else {
                  var d = s.ownerDocument || document,
                    f = (d && d.defaultView) || window;
                  if (f.getSelection) {
                    var m = f.getSelection(),
                      v = s.textContent.length,
                      p = Math.min(l.start, v),
                      E = l.end === void 0 ? p : Math.min(l.end, v);
                    !m.extend && p > E && ((i = E), (E = p), (p = i));
                    var g = Zg(s, p),
                      h = Zg(s, E);
                    if (
                      g &&
                      h &&
                      (m.rangeCount !== 1 ||
                        m.anchorNode !== g.node ||
                        m.anchorOffset !== g.offset ||
                        m.focusNode !== h.node ||
                        m.focusOffset !== h.offset)
                    ) {
                      var y = d.createRange();
                      (y.setStart(g.node, g.offset),
                        m.removeAllRanges(),
                        p > E
                          ? (m.addRange(y), m.extend(h.node, h.offset))
                          : (y.setEnd(h.node, h.offset), m.addRange(y)));
                    }
                  }
                }
              }
              for (d = [], m = s; (m = m.parentNode); )
                m.nodeType === 1 &&
                  d.push({ element: m, left: m.scrollLeft, top: m.scrollTop });
              for (
                typeof s.focus == 'function' && s.focus(), s = 0;
                s < d.length;
                s++
              ) {
                var b = d[s];
                ((b.element.scrollLeft = b.left),
                  (b.element.scrollTop = b.top));
              }
            }
            ((el = !!Yf), (kf = Yf = null));
          } finally {
            ((P = o), (q.p = a), (H.T = n));
          }
        }
        ((e.current = t), (Ce = 2));
      }
    }
    function lb() {
      if (Ce === 2) {
        Ce = 0;
        var e = qn,
          t = Ho,
          n = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || n) {
          ((n = H.T), (H.T = null));
          var a = q.p;
          q.p = 2;
          var o = P;
          P |= 4;
          try {
            _v(e, t.alternate, t);
          } finally {
            ((P = o), (q.p = a), (H.T = n));
          }
        }
        Ce = 3;
      }
    }
    function cb() {
      if (Ce === 4 || Ce === 3) {
        ((Ce = 0), gD());
        var e = qn,
          t = Ho,
          n = ln,
          a = Kv;
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? (Ce = 5)
          : ((Ce = 0), (Ho = qn = null), ub(e, e.pendingLanes));
        var o = e.pendingLanes;
        if (
          (o === 0 && (Pn = null),
          Gf(n),
          (t = t.stateNode),
          rt && typeof rt.onCommitFiberRoot == 'function')
        )
          try {
            rt.onCommitFiberRoot(
              ei,
              t,
              void 0,
              (t.current.flags & 128) === 128,
            );
          } catch {}
        if (a !== null) {
          ((t = H.T), (o = q.p), (q.p = 2), (H.T = null));
          try {
            for (var r = e.onRecoverableError, i = 0; i < a.length; i++) {
              var s = a[i];
              r(s.value, { componentStack: s.stack });
            }
          } finally {
            ((H.T = t), (q.p = o));
          }
        }
        ((ln & 3) !== 0 && pl(),
          Zt(e),
          (o = e.pendingLanes),
          (n & 261930) !== 0 && (o & 42) !== 0
            ? e === If
              ? kr++
              : ((kr = 0), (If = e))
            : (kr = 0),
          li(0, !1));
      }
    }
    function ub(e, t) {
      (e.pooledCacheLanes &= t) === 0 &&
        ((t = e.pooledCache), t != null && ((e.pooledCache = null), ri(t)));
    }
    function pl() {
      return (sb(), lb(), cb(), fb());
    }
    function fb() {
      if (Ce !== 5) return !1;
      var e = qn,
        t = xf;
      xf = 0;
      var n = Gf(ln),
        a = H.T,
        o = q.p;
      try {
        ((q.p = 32 > n ? 32 : n), (H.T = null), (n = Af), (Af = null));
        var r = qn,
          i = ln;
        if (((Ce = 0), (Ho = qn = null), (ln = 0), (P & 6) !== 0))
          throw Error(M(331));
        var s = P;
        if (
          ((P |= 4),
          Gv(r.current),
          qv(r, r.current, i, n),
          (P = s),
          li(0, !1),
          rt && typeof rt.onPostCommitFiberRoot == 'function')
        )
          try {
            rt.onPostCommitFiberRoot(ei, r);
          } catch {}
        return !0;
      } finally {
        ((q.p = o), (H.T = a), ub(e, t));
      }
    }
    function Tp(e, t, n) {
      ((t = vt(n, t)),
        (t = Cf(e.stateNode, t, 2)),
        (e = Fn(e, t, 2)),
        e !== null && (ni(e, 2), Zt(e)));
    }
    function Q(e, t, n) {
      if (e.tag === 3) Tp(e, e, n);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            Tp(t, e, n);
            break;
          } else if (t.tag === 1) {
            var a = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == 'function' ||
              (typeof a.componentDidCatch == 'function' &&
                (Pn === null || !Pn.has(a)))
            ) {
              ((e = vt(n, e)),
                (n = Cv(2)),
                (a = Fn(t, n, 2)),
                a !== null && (Nv(n, a, t, e), ni(a, 2), Zt(a)));
              break;
            }
          }
          t = t.return;
        }
    }
    function Wu(e, t, n) {
      var a = e.pingCache;
      if (a === null) {
        a = e.pingCache = new LM();
        var o = new Set();
        a.set(t, o);
      } else ((o = a.get(t)), o === void 0 && ((o = new Set()), a.set(t, o)));
      o.has(n) ||
        (($d = !0), o.add(n), (e = qM.bind(null, e, t, n)), t.then(e, e));
    }
    function qM(e, t, n) {
      var a = e.pingCache;
      (a !== null && a.delete(t),
        (e.pingedLanes |= e.suspendedLanes & n),
        (e.warmLanes &= ~n),
        te === e &&
          (z & n) === n &&
          (ge === 4 || (ge === 3 && (z & 62914560) === z && 300 > ot() - ml)
            ? (P & 2) === 0 && Uo(e, 0)
            : (xd |= n),
          Io === z && (Io = 0)),
        Zt(e));
    }
    function db(e, t) {
      (t === 0 && (t = ay()), (e = $a(e, t)), e !== null && (ni(e, t), Zt(e)));
    }
    function VM(e) {
      var t = e.memoizedState,
        n = 0;
      (t !== null && (n = t.retryLane), db(e, n));
    }
    function jM(e, t) {
      var n = 0;
      switch (e.tag) {
        case 31:
        case 13:
          var a = e.stateNode,
            o = e.memoizedState;
          o !== null && (n = o.retryLane);
          break;
        case 19:
          a = e.stateNode;
          break;
        case 22:
          a = e.stateNode._retryCache;
          break;
        default:
          throw Error(M(314));
      }
      (a !== null && a.delete(t), db(e, n));
    }
    function GM(e, t) {
      return Vf(e, t);
    }
    var Vs = null,
      io = null,
      Hf = !1,
      js = !1,
      Fu = !1,
      zn = 0;
    function Zt(e) {
      (e !== io &&
        e.next === null &&
        (io === null ? (Vs = io = e) : (io = io.next = e)),
        (js = !0),
        Hf || ((Hf = !0), QM()));
    }
    function li(e, t) {
      if (!Fu && js) {
        Fu = !0;
        do
          for (var n = !1, a = Vs; a !== null; ) {
            if (!t)
              if (e !== 0) {
                var o = a.pendingLanes;
                if (o === 0) var r = 0;
                else {
                  var i = a.suspendedLanes,
                    s = a.pingedLanes;
                  ((r = (1 << (31 - it(42 | e) + 1)) - 1),
                    (r &= o & ~(i & ~s)),
                    (r = r & 201326741 ? (r & 201326741) | 1 : r ? r | 2 : 0));
                }
                r !== 0 && ((n = !0), Dp(a, r));
              } else
                ((r = z),
                  (r = nl(
                    a,
                    a === te ? r : 0,
                    a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
                  )),
                  (r & 3) === 0 || ti(a, r) || ((n = !0), Dp(a, r)));
            a = a.next;
          }
        while (n);
        Fu = !1;
      }
    }
    function XM() {
      mb();
    }
    function mb() {
      js = Hf = !1;
      var e = 0;
      zn !== 0 && rE() && (e = zn);
      for (var t = ot(), n = null, a = Vs; a !== null; ) {
        var o = a.next,
          r = hb(a, t);
        (r === 0
          ? ((a.next = null),
            n === null ? (Vs = o) : (n.next = o),
            o === null && (io = n))
          : ((n = a), (e !== 0 || (r & 3) !== 0) && (js = !0)),
          (a = o));
      }
      ((Ce !== 0 && Ce !== 5) || li(e, !1), zn !== 0 && (zn = 0));
    }
    function hb(e, t) {
      for (
        var n = e.suspendedLanes,
          a = e.pingedLanes,
          o = e.expirationTimes,
          r = e.pendingLanes & -62914561;
        0 < r;
      ) {
        var i = 31 - it(r),
          s = 1 << i,
          l = o[i];
        (l === -1
          ? ((s & n) === 0 || (s & a) !== 0) && (o[i] = MD(s, t))
          : l <= t && (e.expiredLanes |= s),
          (r &= ~s));
      }
      if (
        ((t = te),
        (n = z),
        (n = nl(
          e,
          e === t ? n : 0,
          e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
        )),
        (a = e.callbackNode),
        n === 0 ||
          (e === t && (X === 2 || X === 9)) ||
          e.cancelPendingCommit !== null)
      )
        return (
          a !== null && a !== null && bu(a),
          (e.callbackNode = null),
          (e.callbackPriority = 0)
        );
      if ((n & 3) === 0 || ti(e, n)) {
        if (((t = n & -n), t === e.callbackPriority)) return t;
        switch ((a !== null && bu(a), Gf(n))) {
          case 2:
          case 8:
            n = ty;
            break;
          case 32:
            n = $s;
            break;
          case 268435456:
            n = ny;
            break;
          default:
            n = $s;
        }
        return (
          (a = gb.bind(null, e)),
          (n = Vf(n, a)),
          (e.callbackPriority = t),
          (e.callbackNode = n),
          t
        );
      }
      return (
        a !== null && a !== null && bu(a),
        (e.callbackPriority = 2),
        (e.callbackNode = null),
        2
      );
    }
    function gb(e, t) {
      if (Ce !== 0 && Ce !== 5)
        return ((e.callbackNode = null), (e.callbackPriority = 0), null);
      var n = e.callbackNode;
      if (pl() && e.callbackNode !== n) return null;
      var a = z;
      return (
        (a = nl(
          e,
          e === te ? a : 0,
          e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
        )),
        a === 0
          ? null
          : (eb(e, a, t),
            hb(e, ot()),
            e.callbackNode != null && e.callbackNode === n
              ? gb.bind(null, e)
              : null)
      );
    }
    function Dp(e, t) {
      if (pl()) return null;
      eb(e, t, !0);
    }
    function QM() {
      sE(function () {
        (P & 6) !== 0 ? Vf(ey, XM) : mb();
      });
    }
    function Id() {
      if (zn === 0) {
        var e = $o;
        (e === 0 && ((e = Gi), (Gi <<= 1), (Gi & 261888) === 0 && (Gi = 256)),
          (zn = e));
      }
      return zn;
    }
    function Mp(e) {
      return e == null || typeof e == 'symbol' || typeof e == 'boolean'
        ? null
        : typeof e == 'function'
          ? e
          : ms('' + e);
    }
    function Ep(e, t) {
      var n = t.ownerDocument.createElement('input');
      return (
        (n.name = t.name),
        (n.value = t.value),
        e.id && n.setAttribute('form', e.id),
        t.parentNode.insertBefore(n, t),
        (e = new FormData(e)),
        n.parentNode.removeChild(n),
        e
      );
    }
    function KM(e, t, n, a, o) {
      if (t === 'submit' && n && n.stateNode === o) {
        var r = Mp((o[Ge] || null).action),
          i = a.submitter;
        i &&
          ((t = (t = i[Ge] || null)
            ? Mp(t.formAction)
            : i.getAttribute('formAction')),
          t !== null && ((r = t), (i = null)));
        var s = new al('action', 'action', null, a, o);
        e.push({
          event: s,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (a.defaultPrevented) {
                  if (zn !== 0) {
                    var l = i ? Ep(o, i) : new FormData(o);
                    Ef(
                      n,
                      { pending: !0, data: l, method: o.method, action: r },
                      null,
                      l,
                    );
                  }
                } else
                  typeof r == 'function' &&
                    (s.preventDefault(),
                    (l = i ? Ep(o, i) : new FormData(o)),
                    Ef(
                      n,
                      { pending: !0, data: l, method: o.method, action: r },
                      r,
                      l,
                    ));
              },
              currentTarget: o,
            },
          ],
        });
      }
    }
    for (ss = 0; ss < df.length; ss++)
      ((ls = df[ss]),
        (Op = ls.toLowerCase()),
        (Cp = ls[0].toUpperCase() + ls.slice(1)),
        Ct(Op, 'on' + Cp));
    var ls, Op, Cp, ss;
    Ct(Ny, 'onAnimationEnd');
    Ct(wy, 'onAnimationIteration');
    Ct(Ry, 'onAnimationStart');
    Ct('dblclick', 'onDoubleClick');
    Ct('focusin', 'onFocus');
    Ct('focusout', 'onBlur');
    Ct(pM, 'onTransitionRun');
    Ct(yM, 'onTransitionStart');
    Ct(vM, 'onTransitionCancel');
    Ct($y, 'onTransitionEnd');
    wo('onMouseEnter', ['mouseout', 'mouseover']);
    wo('onMouseLeave', ['mouseout', 'mouseover']);
    wo('onPointerEnter', ['pointerout', 'pointerover']);
    wo('onPointerLeave', ['pointerout', 'pointerover']);
    Na(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' ',
      ),
    );
    Na(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' ',
      ),
    );
    Na('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
    Na(
      'onCompositionEnd',
      'compositionend focusout keydown keypress keyup mousedown'.split(' '),
    );
    Na(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
    );
    Na(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
    );
    var jr =
        'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
          ' ',
        ),
      JM = new Set(
        'beforetoggle cancel close invalid load scroll scrollend toggle'
          .split(' ')
          .concat(jr),
      );
    function pb(e, t) {
      t = (t & 4) !== 0;
      for (var n = 0; n < e.length; n++) {
        var a = e[n],
          o = a.event;
        a = a.listeners;
        e: {
          var r = void 0;
          if (t)
            for (var i = a.length - 1; 0 <= i; i--) {
              var s = a[i],
                l = s.instance,
                c = s.currentTarget;
              if (((s = s.listener), l !== r && o.isPropagationStopped()))
                break e;
              ((r = s), (o.currentTarget = c));
              try {
                r(o);
              } catch (u) {
                As(u);
              }
              ((o.currentTarget = null), (r = l));
            }
          else
            for (i = 0; i < a.length; i++) {
              if (
                ((s = a[i]),
                (l = s.instance),
                (c = s.currentTarget),
                (s = s.listener),
                l !== r && o.isPropagationStopped())
              )
                break e;
              ((r = s), (o.currentTarget = c));
              try {
                r(o);
              } catch (u) {
                As(u);
              }
              ((o.currentTarget = null), (r = l));
            }
        }
      }
    }
    function B(e, t) {
      var n = t[af];
      n === void 0 && (n = t[af] = new Set());
      var a = e + '__bubble';
      n.has(a) || (yb(t, e, 2, !1), n.add(a));
    }
    function Pu(e, t, n) {
      var a = 0;
      (t && (a |= 4), yb(n, e, a, t));
    }
    var cs = '_reactListening' + Math.random().toString(36).slice(2);
    function Hd(e) {
      if (!e[cs]) {
        ((e[cs] = !0),
          ly.forEach(function (n) {
            n !== 'selectionchange' &&
              (JM.has(n) || Pu(n, !1, e), Pu(n, !0, e));
          }));
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[cs] || ((t[cs] = !0), Pu('selectionchange', !1, t));
      }
    }
    function yb(e, t, n, a) {
      switch ($b(t)) {
        case 2:
          var o = NE;
          break;
        case 8:
          o = wE;
          break;
        default:
          o = Bd;
      }
      ((n = o.bind(null, t, n, e)),
        (o = void 0),
        !cf ||
          (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
          (o = !0),
        a
          ? o !== void 0
            ? e.addEventListener(t, n, { capture: !0, passive: o })
            : e.addEventListener(t, n, !0)
          : o !== void 0
            ? e.addEventListener(t, n, { passive: o })
            : e.addEventListener(t, n, !1));
    }
    function qu(e, t, n, a, o) {
      var r = a;
      if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
        e: for (;;) {
          if (a === null) return;
          var i = a.tag;
          if (i === 3 || i === 4) {
            var s = a.stateNode.containerInfo;
            if (s === o) break;
            if (i === 4)
              for (i = a.return; i !== null; ) {
                var l = i.tag;
                if ((l === 3 || l === 4) && i.stateNode.containerInfo === o)
                  return;
                i = i.return;
              }
            for (; s !== null; ) {
              if (((i = co(s)), i === null)) return;
              if (((l = i.tag), l === 5 || l === 6 || l === 26 || l === 27)) {
                a = r = i;
                continue e;
              }
              s = s.parentNode;
            }
          }
          a = a.return;
        }
      py(function () {
        var c = r,
          u = Kf(n),
          d = [];
        e: {
          var f = xy.get(e);
          if (f !== void 0) {
            var m = al,
              v = e;
            switch (e) {
              case 'keypress':
                if (gs(n) === 0) break e;
              case 'keydown':
              case 'keyup':
                m = jD;
                break;
              case 'focusin':
                ((v = 'focus'), (m = Eu));
                break;
              case 'focusout':
                ((v = 'blur'), (m = Eu));
                break;
              case 'beforeblur':
              case 'afterblur':
                m = Eu;
                break;
              case 'click':
                if (n.button === 2) break e;
              case 'auxclick':
              case 'dblclick':
              case 'mousedown':
              case 'mousemove':
              case 'mouseup':
              case 'mouseout':
              case 'mouseover':
              case 'contextmenu':
                m = Ig;
                break;
              case 'drag':
              case 'dragend':
              case 'dragenter':
              case 'dragexit':
              case 'dragleave':
              case 'dragover':
              case 'dragstart':
              case 'drop':
                m = YD;
                break;
              case 'touchcancel':
              case 'touchend':
              case 'touchmove':
              case 'touchstart':
                m = QD;
                break;
              case Ny:
              case wy:
              case Ry:
                m = _D;
                break;
              case $y:
                m = JD;
                break;
              case 'scroll':
              case 'scrollend':
                m = HD;
                break;
              case 'wheel':
                m = tM;
                break;
              case 'copy':
              case 'cut':
              case 'paste':
                m = LD;
                break;
              case 'gotpointercapture':
              case 'lostpointercapture':
              case 'pointercancel':
              case 'pointerdown':
              case 'pointermove':
              case 'pointerout':
              case 'pointerover':
              case 'pointerup':
                m = Ug;
                break;
              case 'toggle':
              case 'beforetoggle':
                m = aM;
            }
            var p = (t & 4) !== 0,
              E = !p && (e === 'scroll' || e === 'scrollend'),
              g = p ? (f !== null ? f + 'Capture' : null) : f;
            p = [];
            for (var h = c, y; h !== null; ) {
              var b = h;
              if (
                ((y = b.stateNode),
                (b = b.tag),
                (b !== 5 && b !== 26 && b !== 27) ||
                  y === null ||
                  g === null ||
                  ((b = zr(h, g)), b != null && p.push(Gr(h, b, y))),
                E)
              )
                break;
              h = h.return;
            }
            0 < p.length &&
              ((f = new m(f, v, null, n, u)),
              d.push({ event: f, listeners: p }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (
              ((f = e === 'mouseover' || e === 'pointerover'),
              (m = e === 'mouseout' || e === 'pointerout'),
              f &&
                n !== lf &&
                (v = n.relatedTarget || n.fromElement) &&
                (co(v) || v[Bo]))
            )
              break e;
            if (
              (m || f) &&
              ((f =
                u.window === u
                  ? u
                  : (f = u.ownerDocument)
                    ? f.defaultView || f.parentWindow
                    : window),
              m
                ? ((v = n.relatedTarget || n.toElement),
                  (m = c),
                  (v = v ? co(v) : null),
                  v !== null &&
                    ((E = Jr(v)),
                    (p = v.tag),
                    v !== E || (p !== 5 && p !== 27 && p !== 6)) &&
                    (v = null))
                : ((m = null), (v = c)),
              m !== v)
            ) {
              if (
                ((p = Ig),
                (b = 'onMouseLeave'),
                (g = 'onMouseEnter'),
                (h = 'mouse'),
                (e === 'pointerout' || e === 'pointerover') &&
                  ((p = Ug),
                  (b = 'onPointerLeave'),
                  (g = 'onPointerEnter'),
                  (h = 'pointer')),
                (E = m == null ? f : Mr(m)),
                (y = v == null ? f : Mr(v)),
                (f = new p(b, h + 'leave', m, n, u)),
                (f.target = E),
                (f.relatedTarget = y),
                (b = null),
                co(u) === c &&
                  ((p = new p(g, h + 'enter', v, n, u)),
                  (p.target = y),
                  (p.relatedTarget = E),
                  (b = p)),
                (E = b),
                m && v)
              )
                t: {
                  for (p = eE, g = m, h = v, y = 0, b = g; b; b = p(b)) y++;
                  b = 0;
                  for (var O = h; O; O = p(O)) b++;
                  for (; 0 < y - b; ) ((g = p(g)), y--);
                  for (; 0 < b - y; ) ((h = p(h)), b--);
                  for (; y--; ) {
                    if (g === h || (h !== null && g === h.alternate)) {
                      p = g;
                      break t;
                    }
                    ((g = p(g)), (h = p(h)));
                  }
                  p = null;
                }
              else p = null;
              (m !== null && Np(d, f, m, p, !1),
                v !== null && E !== null && Np(d, E, v, p, !0));
            }
          }
          e: {
            if (
              ((f = c ? Mr(c) : window),
              (m = f.nodeName && f.nodeName.toLowerCase()),
              m === 'select' || (m === 'input' && f.type === 'file'))
            )
              var x = _g;
            else if (Bg(f))
              if (Dy) x = mM;
              else {
                x = fM;
                var C = uM;
              }
            else
              ((m = f.nodeName),
                !m ||
                m.toLowerCase() !== 'input' ||
                (f.type !== 'checkbox' && f.type !== 'radio')
                  ? c && Qf(c.elementType) && (x = _g)
                  : (x = dM));
            if (x && (x = x(e, c))) {
              Ty(d, x, n, u);
              break e;
            }
            (C && C(e, f, c),
              e === 'focusout' &&
                c &&
                f.type === 'number' &&
                c.memoizedProps.value != null &&
                sf(f, 'number', f.value));
          }
          switch (((C = c ? Mr(c) : window), e)) {
            case 'focusin':
              (Bg(C) || C.contentEditable === 'true') &&
                ((mo = C), (uf = c), (wr = null));
              break;
            case 'focusout':
              wr = uf = mo = null;
              break;
            case 'mousedown':
              ff = !0;
              break;
            case 'contextmenu':
            case 'mouseup':
            case 'dragend':
              ((ff = !1), Wg(d, n, u));
              break;
            case 'selectionchange':
              if (gM) break;
            case 'keydown':
            case 'keyup':
              Wg(d, n, u);
          }
          var $;
          if (td)
            e: {
              switch (e) {
                case 'compositionstart':
                  var R = 'onCompositionStart';
                  break e;
                case 'compositionend':
                  R = 'onCompositionEnd';
                  break e;
                case 'compositionupdate':
                  R = 'onCompositionUpdate';
                  break e;
              }
              R = void 0;
            }
          else
            fo
              ? by(e, n) && (R = 'onCompositionEnd')
              : e === 'keydown' &&
                n.keyCode === 229 &&
                (R = 'onCompositionStart');
          (R &&
            (vy &&
              n.locale !== 'ko' &&
              (fo || R !== 'onCompositionStart'
                ? R === 'onCompositionEnd' && fo && ($ = yy())
                : ((kn = u),
                  (Jf = 'value' in kn ? kn.value : kn.textContent),
                  (fo = !0))),
            (C = Gs(c, R)),
            0 < C.length &&
              ((R = new Hg(R, e, null, n, u)),
              d.push({ event: R, listeners: C }),
              $ ? (R.data = $) : (($ = Sy(n)), $ !== null && (R.data = $)))),
            ($ = rM ? iM(e, n) : sM(e, n)) &&
              ((R = Gs(c, 'onBeforeInput')),
              0 < R.length &&
                ((C = new Hg('onBeforeInput', 'beforeinput', null, n, u)),
                d.push({ event: C, listeners: R }),
                (C.data = $))),
            KM(d, e, c, n, u));
        }
        pb(d, t);
      });
    }
    function Gr(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function Gs(e, t) {
      for (var n = t + 'Capture', a = []; e !== null; ) {
        var o = e,
          r = o.stateNode;
        if (
          ((o = o.tag),
          (o !== 5 && o !== 26 && o !== 27) ||
            r === null ||
            ((o = zr(e, n)),
            o != null && a.unshift(Gr(e, o, r)),
            (o = zr(e, t)),
            o != null && a.push(Gr(e, o, r))),
          e.tag === 3)
        )
          return a;
        e = e.return;
      }
      return [];
    }
    function eE(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function Np(e, t, n, a, o) {
      for (var r = t._reactName, i = []; n !== null && n !== a; ) {
        var s = n,
          l = s.alternate,
          c = s.stateNode;
        if (((s = s.tag), l !== null && l === a)) break;
        ((s !== 5 && s !== 26 && s !== 27) ||
          c === null ||
          ((l = c),
          o
            ? ((c = zr(n, r)), c != null && i.unshift(Gr(n, c, l)))
            : o || ((c = zr(n, r)), c != null && i.push(Gr(n, c, l)))),
          (n = n.return));
      }
      i.length !== 0 && e.push({ event: t, listeners: i });
    }
    var tE = /\r\n?/g,
      nE = /\u0000|\uFFFD/g;
    function wp(e) {
      return (typeof e == 'string' ? e : '' + e)
        .replace(
          tE,
          `
`,
        )
        .replace(nE, '');
    }
    function vb(e, t) {
      return ((t = wp(t)), wp(e) === t);
    }
    function K(e, t, n, a, o, r) {
      switch (n) {
        case 'children':
          typeof a == 'string'
            ? t === 'body' || (t === 'textarea' && a === '') || Ro(e, a)
            : (typeof a == 'number' || typeof a == 'bigint') &&
              t !== 'body' &&
              Ro(e, '' + a);
          break;
        case 'className':
          Ki(e, 'class', a);
          break;
        case 'tabIndex':
          Ki(e, 'tabindex', a);
          break;
        case 'dir':
        case 'role':
        case 'viewBox':
        case 'width':
        case 'height':
          Ki(e, n, a);
          break;
        case 'style':
          gy(e, a, r);
          break;
        case 'data':
          if (t !== 'object') {
            Ki(e, 'data', a);
            break;
          }
        case 'src':
        case 'href':
          if (a === '' && (t !== 'a' || n !== 'href')) {
            e.removeAttribute(n);
            break;
          }
          if (
            a == null ||
            typeof a == 'function' ||
            typeof a == 'symbol' ||
            typeof a == 'boolean'
          ) {
            e.removeAttribute(n);
            break;
          }
          ((a = ms('' + a)), e.setAttribute(n, a));
          break;
        case 'action':
        case 'formAction':
          if (typeof a == 'function') {
            e.setAttribute(
              n,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
            );
            break;
          } else
            typeof r == 'function' &&
              (n === 'formAction'
                ? (t !== 'input' && K(e, t, 'name', o.name, o, null),
                  K(e, t, 'formEncType', o.formEncType, o, null),
                  K(e, t, 'formMethod', o.formMethod, o, null),
                  K(e, t, 'formTarget', o.formTarget, o, null))
                : (K(e, t, 'encType', o.encType, o, null),
                  K(e, t, 'method', o.method, o, null),
                  K(e, t, 'target', o.target, o, null)));
          if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
            e.removeAttribute(n);
            break;
          }
          ((a = ms('' + a)), e.setAttribute(n, a));
          break;
        case 'onClick':
          a != null && (e.onclick = an);
          break;
        case 'onScroll':
          a != null && B('scroll', e);
          break;
        case 'onScrollEnd':
          a != null && B('scrollend', e);
          break;
        case 'dangerouslySetInnerHTML':
          if (a != null) {
            if (typeof a != 'object' || !('__html' in a)) throw Error(M(61));
            if (((n = a.__html), n != null)) {
              if (o.children != null) throw Error(M(60));
              e.innerHTML = n;
            }
          }
          break;
        case 'multiple':
          e.multiple = a && typeof a != 'function' && typeof a != 'symbol';
          break;
        case 'muted':
          e.muted = a && typeof a != 'function' && typeof a != 'symbol';
          break;
        case 'suppressContentEditableWarning':
        case 'suppressHydrationWarning':
        case 'defaultValue':
        case 'defaultChecked':
        case 'innerHTML':
        case 'ref':
          break;
        case 'autoFocus':
          break;
        case 'xlinkHref':
          if (
            a == null ||
            typeof a == 'function' ||
            typeof a == 'boolean' ||
            typeof a == 'symbol'
          ) {
            e.removeAttribute('xlink:href');
            break;
          }
          ((n = ms('' + a)),
            e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', n));
          break;
        case 'contentEditable':
        case 'spellCheck':
        case 'draggable':
        case 'value':
        case 'autoReverse':
        case 'externalResourcesRequired':
        case 'focusable':
        case 'preserveAlpha':
          a != null && typeof a != 'function' && typeof a != 'symbol'
            ? e.setAttribute(n, '' + a)
            : e.removeAttribute(n);
          break;
        case 'inert':
        case 'allowFullScreen':
        case 'async':
        case 'autoPlay':
        case 'controls':
        case 'default':
        case 'defer':
        case 'disabled':
        case 'disablePictureInPicture':
        case 'disableRemotePlayback':
        case 'formNoValidate':
        case 'hidden':
        case 'loop':
        case 'noModule':
        case 'noValidate':
        case 'open':
        case 'playsInline':
        case 'readOnly':
        case 'required':
        case 'reversed':
        case 'scoped':
        case 'seamless':
        case 'itemScope':
          a && typeof a != 'function' && typeof a != 'symbol'
            ? e.setAttribute(n, '')
            : e.removeAttribute(n);
          break;
        case 'capture':
        case 'download':
          a === !0
            ? e.setAttribute(n, '')
            : a !== !1 &&
                a != null &&
                typeof a != 'function' &&
                typeof a != 'symbol'
              ? e.setAttribute(n, a)
              : e.removeAttribute(n);
          break;
        case 'cols':
        case 'rows':
        case 'size':
        case 'span':
          a != null &&
          typeof a != 'function' &&
          typeof a != 'symbol' &&
          !isNaN(a) &&
          1 <= a
            ? e.setAttribute(n, a)
            : e.removeAttribute(n);
          break;
        case 'rowSpan':
        case 'start':
          a == null ||
          typeof a == 'function' ||
          typeof a == 'symbol' ||
          isNaN(a)
            ? e.removeAttribute(n)
            : e.setAttribute(n, a);
          break;
        case 'popover':
          (B('beforetoggle', e), B('toggle', e), ds(e, 'popover', a));
          break;
        case 'xlinkActuate':
          Gt(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
          break;
        case 'xlinkArcrole':
          Gt(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
          break;
        case 'xlinkRole':
          Gt(e, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
          break;
        case 'xlinkShow':
          Gt(e, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
          break;
        case 'xlinkTitle':
          Gt(e, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
          break;
        case 'xlinkType':
          Gt(e, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
          break;
        case 'xmlBase':
          Gt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
          break;
        case 'xmlLang':
          Gt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
          break;
        case 'xmlSpace':
          Gt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
          break;
        case 'is':
          ds(e, 'is', a);
          break;
        case 'innerText':
        case 'textContent':
          break;
        default:
          (!(2 < n.length) ||
            (n[0] !== 'o' && n[0] !== 'O') ||
            (n[1] !== 'n' && n[1] !== 'N')) &&
            ((n = AD.get(n) || n), ds(e, n, a));
      }
    }
    function Uf(e, t, n, a, o, r) {
      switch (n) {
        case 'style':
          gy(e, a, r);
          break;
        case 'dangerouslySetInnerHTML':
          if (a != null) {
            if (typeof a != 'object' || !('__html' in a)) throw Error(M(61));
            if (((n = a.__html), n != null)) {
              if (o.children != null) throw Error(M(60));
              e.innerHTML = n;
            }
          }
          break;
        case 'children':
          typeof a == 'string'
            ? Ro(e, a)
            : (typeof a == 'number' || typeof a == 'bigint') && Ro(e, '' + a);
          break;
        case 'onScroll':
          a != null && B('scroll', e);
          break;
        case 'onScrollEnd':
          a != null && B('scrollend', e);
          break;
        case 'onClick':
          a != null && (e.onclick = an);
          break;
        case 'suppressContentEditableWarning':
        case 'suppressHydrationWarning':
        case 'innerHTML':
        case 'ref':
          break;
        case 'innerText':
        case 'textContent':
          break;
        default:
          if (!cy.hasOwnProperty(n))
            e: {
              if (
                n[0] === 'o' &&
                n[1] === 'n' &&
                ((o = n.endsWith('Capture')),
                (t = n.slice(2, o ? n.length - 7 : void 0)),
                (r = e[Ge] || null),
                (r = r != null ? r[n] : null),
                typeof r == 'function' && e.removeEventListener(t, r, o),
                typeof a == 'function')
              ) {
                (typeof r != 'function' &&
                  r !== null &&
                  (n in e
                    ? (e[n] = null)
                    : e.hasAttribute(n) && e.removeAttribute(n)),
                  e.addEventListener(t, a, o));
                break e;
              }
              n in e
                ? (e[n] = a)
                : a === !0
                  ? e.setAttribute(n, '')
                  : ds(e, n, a);
            }
      }
    }
    function ke(e, t, n) {
      switch (t) {
        case 'div':
        case 'span':
        case 'svg':
        case 'path':
        case 'a':
        case 'g':
        case 'p':
        case 'li':
          break;
        case 'img':
          (B('error', e), B('load', e));
          var a = !1,
            o = !1,
            r;
          for (r in n)
            if (n.hasOwnProperty(r)) {
              var i = n[r];
              if (i != null)
                switch (r) {
                  case 'src':
                    a = !0;
                    break;
                  case 'srcSet':
                    o = !0;
                    break;
                  case 'children':
                  case 'dangerouslySetInnerHTML':
                    throw Error(M(137, t));
                  default:
                    K(e, t, r, i, n, null);
                }
            }
          (o && K(e, t, 'srcSet', n.srcSet, n, null),
            a && K(e, t, 'src', n.src, n, null));
          return;
        case 'input':
          B('invalid', e);
          var s = (r = i = o = null),
            l = null,
            c = null;
          for (a in n)
            if (n.hasOwnProperty(a)) {
              var u = n[a];
              if (u != null)
                switch (a) {
                  case 'name':
                    o = u;
                    break;
                  case 'type':
                    i = u;
                    break;
                  case 'checked':
                    l = u;
                    break;
                  case 'defaultChecked':
                    c = u;
                    break;
                  case 'value':
                    r = u;
                    break;
                  case 'defaultValue':
                    s = u;
                    break;
                  case 'children':
                  case 'dangerouslySetInnerHTML':
                    if (u != null) throw Error(M(137, t));
                    break;
                  default:
                    K(e, t, a, u, n, null);
                }
            }
          dy(e, r, s, l, c, i, o, !1);
          return;
        case 'select':
          (B('invalid', e), (a = i = r = null));
          for (o in n)
            if (n.hasOwnProperty(o) && ((s = n[o]), s != null))
              switch (o) {
                case 'value':
                  r = s;
                  break;
                case 'defaultValue':
                  i = s;
                  break;
                case 'multiple':
                  a = s;
                default:
                  K(e, t, o, s, n, null);
              }
          ((t = r),
            (n = i),
            (e.multiple = !!a),
            t != null ? To(e, !!a, t, !1) : n != null && To(e, !!a, n, !0));
          return;
        case 'textarea':
          (B('invalid', e), (r = o = a = null));
          for (i in n)
            if (n.hasOwnProperty(i) && ((s = n[i]), s != null))
              switch (i) {
                case 'value':
                  a = s;
                  break;
                case 'defaultValue':
                  o = s;
                  break;
                case 'children':
                  r = s;
                  break;
                case 'dangerouslySetInnerHTML':
                  if (s != null) throw Error(M(91));
                  break;
                default:
                  K(e, t, i, s, n, null);
              }
          hy(e, a, o, r);
          return;
        case 'option':
          for (l in n)
            n.hasOwnProperty(l) &&
              ((a = n[l]), a != null) &&
              (l === 'selected'
                ? (e.selected =
                    a && typeof a != 'function' && typeof a != 'symbol')
                : K(e, t, l, a, n, null));
          return;
        case 'dialog':
          (B('beforetoggle', e), B('toggle', e), B('cancel', e), B('close', e));
          break;
        case 'iframe':
        case 'object':
          B('load', e);
          break;
        case 'video':
        case 'audio':
          for (a = 0; a < jr.length; a++) B(jr[a], e);
          break;
        case 'image':
          (B('error', e), B('load', e));
          break;
        case 'details':
          B('toggle', e);
          break;
        case 'embed':
        case 'source':
        case 'link':
          (B('error', e), B('load', e));
        case 'area':
        case 'base':
        case 'br':
        case 'col':
        case 'hr':
        case 'keygen':
        case 'meta':
        case 'param':
        case 'track':
        case 'wbr':
        case 'menuitem':
          for (c in n)
            if (n.hasOwnProperty(c) && ((a = n[c]), a != null))
              switch (c) {
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(M(137, t));
                default:
                  K(e, t, c, a, n, null);
              }
          return;
        default:
          if (Qf(t)) {
            for (u in n)
              n.hasOwnProperty(u) &&
                ((a = n[u]), a !== void 0 && Uf(e, t, u, a, n, void 0));
            return;
          }
      }
      for (s in n)
        n.hasOwnProperty(s) &&
          ((a = n[s]), a != null && K(e, t, s, a, n, null));
    }
    function aE(e, t, n, a) {
      switch (t) {
        case 'div':
        case 'span':
        case 'svg':
        case 'path':
        case 'a':
        case 'g':
        case 'p':
        case 'li':
          break;
        case 'input':
          var o = null,
            r = null,
            i = null,
            s = null,
            l = null,
            c = null,
            u = null;
          for (m in n) {
            var d = n[m];
            if (n.hasOwnProperty(m) && d != null)
              switch (m) {
                case 'checked':
                  break;
                case 'value':
                  break;
                case 'defaultValue':
                  l = d;
                default:
                  a.hasOwnProperty(m) || K(e, t, m, null, a, d);
              }
          }
          for (var f in a) {
            var m = a[f];
            if (((d = n[f]), a.hasOwnProperty(f) && (m != null || d != null)))
              switch (f) {
                case 'type':
                  r = m;
                  break;
                case 'name':
                  o = m;
                  break;
                case 'checked':
                  c = m;
                  break;
                case 'defaultChecked':
                  u = m;
                  break;
                case 'value':
                  i = m;
                  break;
                case 'defaultValue':
                  s = m;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (m != null) throw Error(M(137, t));
                  break;
                default:
                  m !== d && K(e, t, f, m, a, d);
              }
          }
          rf(e, i, s, l, c, u, r, o);
          return;
        case 'select':
          m = i = s = f = null;
          for (r in n)
            if (((l = n[r]), n.hasOwnProperty(r) && l != null))
              switch (r) {
                case 'value':
                  break;
                case 'multiple':
                  m = l;
                default:
                  a.hasOwnProperty(r) || K(e, t, r, null, a, l);
              }
          for (o in a)
            if (
              ((r = a[o]),
              (l = n[o]),
              a.hasOwnProperty(o) && (r != null || l != null))
            )
              switch (o) {
                case 'value':
                  f = r;
                  break;
                case 'defaultValue':
                  s = r;
                  break;
                case 'multiple':
                  i = r;
                default:
                  r !== l && K(e, t, o, r, a, l);
              }
          ((t = s),
            (n = i),
            (a = m),
            f != null
              ? To(e, !!n, f, !1)
              : !!a != !!n &&
                (t != null ? To(e, !!n, t, !0) : To(e, !!n, n ? [] : '', !1)));
          return;
        case 'textarea':
          m = f = null;
          for (s in n)
            if (
              ((o = n[s]),
              n.hasOwnProperty(s) && o != null && !a.hasOwnProperty(s))
            )
              switch (s) {
                case 'value':
                  break;
                case 'children':
                  break;
                default:
                  K(e, t, s, null, a, o);
              }
          for (i in a)
            if (
              ((o = a[i]),
              (r = n[i]),
              a.hasOwnProperty(i) && (o != null || r != null))
            )
              switch (i) {
                case 'value':
                  f = o;
                  break;
                case 'defaultValue':
                  m = o;
                  break;
                case 'children':
                  break;
                case 'dangerouslySetInnerHTML':
                  if (o != null) throw Error(M(91));
                  break;
                default:
                  o !== r && K(e, t, i, o, a, r);
              }
          my(e, f, m);
          return;
        case 'option':
          for (var v in n)
            ((f = n[v]),
              n.hasOwnProperty(v) &&
                f != null &&
                !a.hasOwnProperty(v) &&
                (v === 'selected'
                  ? (e.selected = !1)
                  : K(e, t, v, null, a, f)));
          for (l in a)
            ((f = a[l]),
              (m = n[l]),
              a.hasOwnProperty(l) &&
                f !== m &&
                (f != null || m != null) &&
                (l === 'selected'
                  ? (e.selected =
                      f && typeof f != 'function' && typeof f != 'symbol')
                  : K(e, t, l, f, a, m)));
          return;
        case 'img':
        case 'link':
        case 'area':
        case 'base':
        case 'br':
        case 'col':
        case 'embed':
        case 'hr':
        case 'keygen':
        case 'meta':
        case 'param':
        case 'source':
        case 'track':
        case 'wbr':
        case 'menuitem':
          for (var p in n)
            ((f = n[p]),
              n.hasOwnProperty(p) &&
                f != null &&
                !a.hasOwnProperty(p) &&
                K(e, t, p, null, a, f));
          for (c in a)
            if (
              ((f = a[c]),
              (m = n[c]),
              a.hasOwnProperty(c) && f !== m && (f != null || m != null))
            )
              switch (c) {
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (f != null) throw Error(M(137, t));
                  break;
                default:
                  K(e, t, c, f, a, m);
              }
          return;
        default:
          if (Qf(t)) {
            for (var E in n)
              ((f = n[E]),
                n.hasOwnProperty(E) &&
                  f !== void 0 &&
                  !a.hasOwnProperty(E) &&
                  Uf(e, t, E, void 0, a, f));
            for (u in a)
              ((f = a[u]),
                (m = n[u]),
                !a.hasOwnProperty(u) ||
                  f === m ||
                  (f === void 0 && m === void 0) ||
                  Uf(e, t, u, f, a, m));
            return;
          }
      }
      for (var g in n)
        ((f = n[g]),
          n.hasOwnProperty(g) &&
            f != null &&
            !a.hasOwnProperty(g) &&
            K(e, t, g, null, a, f));
      for (d in a)
        ((f = a[d]),
          (m = n[d]),
          !a.hasOwnProperty(d) ||
            f === m ||
            (f == null && m == null) ||
            K(e, t, d, f, a, m));
    }
    function Rp(e) {
      switch (e) {
        case 'css':
        case 'script':
        case 'font':
        case 'img':
        case 'image':
        case 'input':
        case 'link':
          return !0;
        default:
          return !1;
      }
    }
    function oE() {
      if (typeof performance.getEntriesByType == 'function') {
        for (
          var e = 0, t = 0, n = performance.getEntriesByType('resource'), a = 0;
          a < n.length;
          a++
        ) {
          var o = n[a],
            r = o.transferSize,
            i = o.initiatorType,
            s = o.duration;
          if (r && s && Rp(i)) {
            for (i = 0, s = o.responseEnd, a += 1; a < n.length; a++) {
              var l = n[a],
                c = l.startTime;
              if (c > s) break;
              var u = l.transferSize,
                d = l.initiatorType;
              u &&
                Rp(d) &&
                ((l = l.responseEnd),
                (i += u * (l < s ? 1 : (s - c) / (l - c))));
            }
            if ((--a, (t += (8 * (r + i)) / (o.duration / 1e3)), e++, 10 < e))
              break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection &&
        ((e = navigator.connection.downlink), typeof e == 'number')
        ? e
        : 5;
    }
    var Yf = null,
      kf = null;
    function Xs(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function $p(e) {
      switch (e) {
        case 'http://www.w3.org/2000/svg':
          return 1;
        case 'http://www.w3.org/1998/Math/MathML':
          return 2;
        default:
          return 0;
      }
    }
    function bb(e, t) {
      if (e === 0)
        switch (t) {
          case 'svg':
            return 1;
          case 'math':
            return 2;
          default:
            return 0;
        }
      return e === 1 && t === 'foreignObject' ? 0 : e;
    }
    function Bf(e, t) {
      return (
        e === 'textarea' ||
        e === 'noscript' ||
        typeof t.children == 'string' ||
        typeof t.children == 'number' ||
        typeof t.children == 'bigint' ||
        (typeof t.dangerouslySetInnerHTML == 'object' &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      );
    }
    var Vu = null;
    function rE() {
      var e = window.event;
      return e && e.type === 'popstate'
        ? e === Vu
          ? !1
          : ((Vu = e), !0)
        : ((Vu = null), !1);
    }
    var Sb = typeof setTimeout == 'function' ? setTimeout : void 0,
      iE = typeof clearTimeout == 'function' ? clearTimeout : void 0,
      xp = typeof Promise == 'function' ? Promise : void 0,
      sE =
        typeof queueMicrotask == 'function'
          ? queueMicrotask
          : typeof xp < 'u'
            ? function (e) {
                return xp.resolve(null).then(e).catch(lE);
              }
            : Sb;
    function lE(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function ta(e) {
      return e === 'head';
    }
    function Ap(e, t) {
      var n = t,
        a = 0;
      do {
        var o = n.nextSibling;
        if ((e.removeChild(n), o && o.nodeType === 8))
          if (((n = o.data), n === '/$' || n === '/&')) {
            if (a === 0) {
              (e.removeChild(o), ko(t));
              return;
            }
            a--;
          } else if (
            n === '$' ||
            n === '$?' ||
            n === '$~' ||
            n === '$!' ||
            n === '&'
          )
            a++;
          else if (n === 'html') Br(e.ownerDocument.documentElement);
          else if (n === 'head') {
            ((n = e.ownerDocument.head), Br(n));
            for (var r = n.firstChild; r; ) {
              var i = r.nextSibling,
                s = r.nodeName;
              (r[ai] ||
                s === 'SCRIPT' ||
                s === 'STYLE' ||
                (s === 'LINK' && r.rel.toLowerCase() === 'stylesheet') ||
                n.removeChild(r),
                (r = i));
            }
          } else n === 'body' && Br(e.ownerDocument.body);
        n = o;
      } while (n);
      ko(t);
    }
    function Ip(e, t) {
      var n = e;
      e = 0;
      do {
        var a = n.nextSibling;
        if (
          (n.nodeType === 1
            ? t
              ? ((n._stashedDisplay = n.style.display),
                (n.style.display = 'none'))
              : ((n.style.display = n._stashedDisplay || ''),
                n.getAttribute('style') === '' && n.removeAttribute('style'))
            : n.nodeType === 3 &&
              (t
                ? ((n._stashedText = n.nodeValue), (n.nodeValue = ''))
                : (n.nodeValue = n._stashedText || '')),
          a && a.nodeType === 8)
        )
          if (((n = a.data), n === '/$')) {
            if (e === 0) break;
            e--;
          } else (n !== '$' && n !== '$?' && n !== '$~' && n !== '$!') || e++;
        n = a;
      } while (n);
    }
    function _f(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var n = t;
        switch (((t = t.nextSibling), n.nodeName)) {
          case 'HTML':
          case 'HEAD':
          case 'BODY':
            (_f(n), Xf(n));
            continue;
          case 'SCRIPT':
          case 'STYLE':
            continue;
          case 'LINK':
            if (n.rel.toLowerCase() === 'stylesheet') continue;
        }
        e.removeChild(n);
      }
    }
    function cE(e, t, n, a) {
      for (; e.nodeType === 1; ) {
        var o = n;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!a && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
        } else if (a) {
          if (!e[ai])
            switch (t) {
              case 'meta':
                if (!e.hasAttribute('itemprop')) break;
                return e;
              case 'link':
                if (
                  ((r = e.getAttribute('rel')),
                  r === 'stylesheet' && e.hasAttribute('data-precedence'))
                )
                  break;
                if (
                  r !== o.rel ||
                  e.getAttribute('href') !==
                    (o.href == null || o.href === '' ? null : o.href) ||
                  e.getAttribute('crossorigin') !==
                    (o.crossOrigin == null ? null : o.crossOrigin) ||
                  e.getAttribute('title') !== (o.title == null ? null : o.title)
                )
                  break;
                return e;
              case 'style':
                if (e.hasAttribute('data-precedence')) break;
                return e;
              case 'script':
                if (
                  ((r = e.getAttribute('src')),
                  (r !== (o.src == null ? null : o.src) ||
                    e.getAttribute('type') !==
                      (o.type == null ? null : o.type) ||
                    e.getAttribute('crossorigin') !==
                      (o.crossOrigin == null ? null : o.crossOrigin)) &&
                    r &&
                    e.hasAttribute('async') &&
                    !e.hasAttribute('itemprop'))
                )
                  break;
                return e;
              default:
                return e;
            }
        } else if (t === 'input' && e.type === 'hidden') {
          var r = o.name == null ? null : '' + o.name;
          if (o.type === 'hidden' && e.getAttribute('name') === r) return e;
        } else return e;
        if (((e = Tt(e.nextSibling)), e === null)) break;
      }
      return null;
    }
    function uE(e, t, n) {
      if (t === '') return null;
      for (; e.nodeType !== 3; )
        if (
          ((e.nodeType !== 1 ||
            e.nodeName !== 'INPUT' ||
            e.type !== 'hidden') &&
            !n) ||
          ((e = Tt(e.nextSibling)), e === null)
        )
          return null;
      return e;
    }
    function Tb(e, t) {
      for (; e.nodeType !== 8; )
        if (
          ((e.nodeType !== 1 ||
            e.nodeName !== 'INPUT' ||
            e.type !== 'hidden') &&
            !t) ||
          ((e = Tt(e.nextSibling)), e === null)
        )
          return null;
      return e;
    }
    function zf(e) {
      return e.data === '$?' || e.data === '$~';
    }
    function Lf(e) {
      return (
        e.data === '$!' ||
        (e.data === '$?' && e.ownerDocument.readyState !== 'loading')
      );
    }
    function fE(e, t) {
      var n = e.ownerDocument;
      if (e.data === '$~') e._reactRetry = t;
      else if (e.data !== '$?' || n.readyState !== 'loading') t();
      else {
        var a = function () {
          (t(), n.removeEventListener('DOMContentLoaded', a));
        };
        (n.addEventListener('DOMContentLoaded', a), (e._reactRetry = a));
      }
    }
    function Tt(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (
            ((t = e.data),
            t === '$' ||
              t === '$!' ||
              t === '$?' ||
              t === '$~' ||
              t === '&' ||
              t === 'F!' ||
              t === 'F')
          )
            break;
          if (t === '/$' || t === '/&') return null;
        }
      }
      return e;
    }
    var Zf = null;
    function Hp(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === '/$' || n === '/&') {
            if (t === 0) return Tt(e.nextSibling);
            t--;
          } else
            (n !== '$' &&
              n !== '$!' &&
              n !== '$?' &&
              n !== '$~' &&
              n !== '&') ||
              t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function Up(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (
            n === '$' ||
            n === '$!' ||
            n === '$?' ||
            n === '$~' ||
            n === '&'
          ) {
            if (t === 0) return e;
            t--;
          } else (n !== '/$' && n !== '/&') || t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function Db(e, t, n) {
      switch (((t = Xs(n)), e)) {
        case 'html':
          if (((e = t.documentElement), !e)) throw Error(M(452));
          return e;
        case 'head':
          if (((e = t.head), !e)) throw Error(M(453));
          return e;
        case 'body':
          if (((e = t.body), !e)) throw Error(M(454));
          return e;
        default:
          throw Error(M(451));
      }
    }
    function Br(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
      Xf(e);
    }
    var Dt = new Map(),
      Yp = new Set();
    function Qs(e) {
      return typeof e.getRootNode == 'function'
        ? e.getRootNode()
        : e.nodeType === 9
          ? e
          : e.ownerDocument;
    }
    var hn = q.d;
    q.d = { f: dE, r: mE, D: hE, C: gE, L: pE, m: yE, X: bE, S: vE, M: SE };
    function dE() {
      var e = hn.f(),
        t = hl();
      return e || t;
    }
    function mE(e) {
      var t = _o(e);
      t !== null && t.tag === 5 && t.type === 'form' ? gv(t) : hn.r(e);
    }
    var Wo = typeof document > 'u' ? null : document;
    function Mb(e, t, n) {
      var a = Wo;
      if (a && typeof t == 'string' && t) {
        var o = yt(t);
        ((o = 'link[rel="' + e + '"][href="' + o + '"]'),
          typeof n == 'string' && (o += '[crossorigin="' + n + '"]'),
          Yp.has(o) ||
            (Yp.add(o),
            (e = { rel: e, crossOrigin: n, href: t }),
            a.querySelector(o) === null &&
              ((t = a.createElement('link')),
              ke(t, 'link', e),
              Re(t),
              a.head.appendChild(t))));
      }
    }
    function hE(e) {
      (hn.D(e), Mb('dns-prefetch', e, null));
    }
    function gE(e, t) {
      (hn.C(e, t), Mb('preconnect', e, t));
    }
    function pE(e, t, n) {
      hn.L(e, t, n);
      var a = Wo;
      if (a && e && t) {
        var o = 'link[rel="preload"][as="' + yt(t) + '"]';
        t === 'image' && n && n.imageSrcSet
          ? ((o += '[imagesrcset="' + yt(n.imageSrcSet) + '"]'),
            typeof n.imageSizes == 'string' &&
              (o += '[imagesizes="' + yt(n.imageSizes) + '"]'))
          : (o += '[href="' + yt(e) + '"]');
        var r = o;
        switch (t) {
          case 'style':
            r = Yo(e);
            break;
          case 'script':
            r = Fo(e);
        }
        Dt.has(r) ||
          ((e = se(
            {
              rel: 'preload',
              href: t === 'image' && n && n.imageSrcSet ? void 0 : e,
              as: t,
            },
            n,
          )),
          Dt.set(r, e),
          a.querySelector(o) !== null ||
            (t === 'style' && a.querySelector(ci(r))) ||
            (t === 'script' && a.querySelector(ui(r))) ||
            ((t = a.createElement('link')),
            ke(t, 'link', e),
            Re(t),
            a.head.appendChild(t)));
      }
    }
    function yE(e, t) {
      hn.m(e, t);
      var n = Wo;
      if (n && e) {
        var a = t && typeof t.as == 'string' ? t.as : 'script',
          o =
            'link[rel="modulepreload"][as="' +
            yt(a) +
            '"][href="' +
            yt(e) +
            '"]',
          r = o;
        switch (a) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            r = Fo(e);
        }
        if (
          !Dt.has(r) &&
          ((e = se({ rel: 'modulepreload', href: e }, t)),
          Dt.set(r, e),
          n.querySelector(o) === null)
        ) {
          switch (a) {
            case 'audioworklet':
            case 'paintworklet':
            case 'serviceworker':
            case 'sharedworker':
            case 'worker':
            case 'script':
              if (n.querySelector(ui(r))) return;
          }
          ((a = n.createElement('link')),
            ke(a, 'link', e),
            Re(a),
            n.head.appendChild(a));
        }
      }
    }
    function vE(e, t, n) {
      hn.S(e, t, n);
      var a = Wo;
      if (a && e) {
        var o = So(a).hoistableStyles,
          r = Yo(e);
        t = t || 'default';
        var i = o.get(r);
        if (!i) {
          var s = { loading: 0, preload: null };
          if ((i = a.querySelector(ci(r)))) s.loading = 5;
          else {
            ((e = se({ rel: 'stylesheet', href: e, 'data-precedence': t }, n)),
              (n = Dt.get(r)) && Ud(e, n));
            var l = (i = a.createElement('link'));
            (Re(l),
              ke(l, 'link', e),
              (l._p = new Promise(function (c, u) {
                ((l.onload = c), (l.onerror = u));
              })),
              l.addEventListener('load', function () {
                s.loading |= 1;
              }),
              l.addEventListener('error', function () {
                s.loading |= 2;
              }),
              (s.loading |= 4),
              Ms(i, t, a));
          }
          ((i = { type: 'stylesheet', instance: i, count: 1, state: s }),
            o.set(r, i));
        }
      }
    }
    function bE(e, t) {
      hn.X(e, t);
      var n = Wo;
      if (n && e) {
        var a = So(n).hoistableScripts,
          o = Fo(e),
          r = a.get(o);
        r ||
          ((r = n.querySelector(ui(o))),
          r ||
            ((e = se({ src: e, async: !0 }, t)),
            (t = Dt.get(o)) && Yd(e, t),
            (r = n.createElement('script')),
            Re(r),
            ke(r, 'link', e),
            n.head.appendChild(r)),
          (r = { type: 'script', instance: r, count: 1, state: null }),
          a.set(o, r));
      }
    }
    function SE(e, t) {
      hn.M(e, t);
      var n = Wo;
      if (n && e) {
        var a = So(n).hoistableScripts,
          o = Fo(e),
          r = a.get(o);
        r ||
          ((r = n.querySelector(ui(o))),
          r ||
            ((e = se({ src: e, async: !0, type: 'module' }, t)),
            (t = Dt.get(o)) && Yd(e, t),
            (r = n.createElement('script')),
            Re(r),
            ke(r, 'link', e),
            n.head.appendChild(r)),
          (r = { type: 'script', instance: r, count: 1, state: null }),
          a.set(o, r));
      }
    }
    function kp(e, t, n, a) {
      var o = (o = Ln.current) ? Qs(o) : null;
      if (!o) throw Error(M(446));
      switch (e) {
        case 'meta':
        case 'title':
          return null;
        case 'style':
          return typeof n.precedence == 'string' && typeof n.href == 'string'
            ? ((t = Yo(n.href)),
              (n = So(o).hoistableStyles),
              (a = n.get(t)),
              a ||
                ((a = { type: 'style', instance: null, count: 0, state: null }),
                n.set(t, a)),
              a)
            : { type: 'void', instance: null, count: 0, state: null };
        case 'link':
          if (
            n.rel === 'stylesheet' &&
            typeof n.href == 'string' &&
            typeof n.precedence == 'string'
          ) {
            e = Yo(n.href);
            var r = So(o).hoistableStyles,
              i = r.get(e);
            if (
              (i ||
                ((o = o.ownerDocument || o),
                (i = {
                  type: 'stylesheet',
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                r.set(e, i),
                (r = o.querySelector(ci(e))) &&
                  !r._p &&
                  ((i.instance = r), (i.state.loading = 5)),
                Dt.has(e) ||
                  ((n = {
                    rel: 'preload',
                    as: 'style',
                    href: n.href,
                    crossOrigin: n.crossOrigin,
                    integrity: n.integrity,
                    media: n.media,
                    hrefLang: n.hrefLang,
                    referrerPolicy: n.referrerPolicy,
                  }),
                  Dt.set(e, n),
                  r || TE(o, e, n, i.state))),
              t && a === null)
            )
              throw Error(M(528, ''));
            return i;
          }
          if (t && a !== null) throw Error(M(529, ''));
          return null;
        case 'script':
          return (
            (t = n.async),
            (n = n.src),
            typeof n == 'string' &&
            t &&
            typeof t != 'function' &&
            typeof t != 'symbol'
              ? ((t = Fo(n)),
                (n = So(o).hoistableScripts),
                (a = n.get(t)),
                a ||
                  ((a = {
                    type: 'script',
                    instance: null,
                    count: 0,
                    state: null,
                  }),
                  n.set(t, a)),
                a)
              : { type: 'void', instance: null, count: 0, state: null }
          );
        default:
          throw Error(M(444, e));
      }
    }
    function Yo(e) {
      return 'href="' + yt(e) + '"';
    }
    function ci(e) {
      return 'link[rel="stylesheet"][' + e + ']';
    }
    function Eb(e) {
      return se({}, e, { 'data-precedence': e.precedence, precedence: null });
    }
    function TE(e, t, n, a) {
      e.querySelector('link[rel="preload"][as="style"][' + t + ']')
        ? (a.loading = 1)
        : ((t = e.createElement('link')),
          (a.preload = t),
          t.addEventListener('load', function () {
            return (a.loading |= 1);
          }),
          t.addEventListener('error', function () {
            return (a.loading |= 2);
          }),
          ke(t, 'link', n),
          Re(t),
          e.head.appendChild(t));
    }
    function Fo(e) {
      return '[src="' + yt(e) + '"]';
    }
    function ui(e) {
      return 'script[async]' + e;
    }
    function Bp(e, t, n) {
      if ((t.count++, t.instance === null))
        switch (t.type) {
          case 'style':
            var a = e.querySelector('style[data-href~="' + yt(n.href) + '"]');
            if (a) return ((t.instance = a), Re(a), a);
            var o = se({}, n, {
              'data-href': n.href,
              'data-precedence': n.precedence,
              href: null,
              precedence: null,
            });
            return (
              (a = (e.ownerDocument || e).createElement('style')),
              Re(a),
              ke(a, 'style', o),
              Ms(a, n.precedence, e),
              (t.instance = a)
            );
          case 'stylesheet':
            o = Yo(n.href);
            var r = e.querySelector(ci(o));
            if (r) return ((t.state.loading |= 4), (t.instance = r), Re(r), r);
            ((a = Eb(n)),
              (o = Dt.get(o)) && Ud(a, o),
              (r = (e.ownerDocument || e).createElement('link')),
              Re(r));
            var i = r;
            return (
              (i._p = new Promise(function (s, l) {
                ((i.onload = s), (i.onerror = l));
              })),
              ke(r, 'link', a),
              (t.state.loading |= 4),
              Ms(r, n.precedence, e),
              (t.instance = r)
            );
          case 'script':
            return (
              (r = Fo(n.src)),
              (o = e.querySelector(ui(r)))
                ? ((t.instance = o), Re(o), o)
                : ((a = n),
                  (o = Dt.get(r)) && ((a = se({}, n)), Yd(a, o)),
                  (e = e.ownerDocument || e),
                  (o = e.createElement('script')),
                  Re(o),
                  ke(o, 'link', a),
                  e.head.appendChild(o),
                  (t.instance = o))
            );
          case 'void':
            return null;
          default:
            throw Error(M(443, t.type));
        }
      else
        t.type === 'stylesheet' &&
          (t.state.loading & 4) === 0 &&
          ((a = t.instance), (t.state.loading |= 4), Ms(a, n.precedence, e));
      return t.instance;
    }
    function Ms(e, t, n) {
      for (
        var a = n.querySelectorAll(
            'link[rel="stylesheet"][data-precedence],style[data-precedence]',
          ),
          o = a.length ? a[a.length - 1] : null,
          r = o,
          i = 0;
        i < a.length;
        i++
      ) {
        var s = a[i];
        if (s.dataset.precedence === t) r = s;
        else if (r !== o) break;
      }
      r
        ? r.parentNode.insertBefore(e, r.nextSibling)
        : ((t = n.nodeType === 9 ? n.head : n),
          t.insertBefore(e, t.firstChild));
    }
    function Ud(e, t) {
      (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.title == null && (e.title = t.title));
    }
    function Yd(e, t) {
      (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.integrity == null && (e.integrity = t.integrity));
    }
    var Es = null;
    function _p(e, t, n) {
      if (Es === null) {
        var a = new Map(),
          o = (Es = new Map());
        o.set(n, a);
      } else ((o = Es), (a = o.get(n)), a || ((a = new Map()), o.set(n, a)));
      if (a.has(e)) return a;
      for (
        a.set(e, null), n = n.getElementsByTagName(e), o = 0;
        o < n.length;
        o++
      ) {
        var r = n[o];
        if (
          !(
            r[ai] ||
            r[He] ||
            (e === 'link' && r.getAttribute('rel') === 'stylesheet')
          ) &&
          r.namespaceURI !== 'http://www.w3.org/2000/svg'
        ) {
          var i = r.getAttribute(t) || '';
          i = e + i;
          var s = a.get(i);
          s ? s.push(r) : a.set(i, [r]);
        }
      }
      return a;
    }
    function zp(e, t, n) {
      ((e = e.ownerDocument || e),
        e.head.insertBefore(
          n,
          t === 'title' ? e.querySelector('head > title') : null,
        ));
    }
    function DE(e, t, n) {
      if (n === 1 || t.itemProp != null) return !1;
      switch (e) {
        case 'meta':
        case 'title':
          return !0;
        case 'style':
          if (
            typeof t.precedence != 'string' ||
            typeof t.href != 'string' ||
            t.href === ''
          )
            break;
          return !0;
        case 'link':
          if (
            typeof t.rel != 'string' ||
            typeof t.href != 'string' ||
            t.href === '' ||
            t.onLoad ||
            t.onError
          )
            break;
          return t.rel === 'stylesheet'
            ? ((e = t.disabled), typeof t.precedence == 'string' && e == null)
            : !0;
        case 'script':
          if (
            t.async &&
            typeof t.async != 'function' &&
            typeof t.async != 'symbol' &&
            !t.onLoad &&
            !t.onError &&
            t.src &&
            typeof t.src == 'string'
          )
            return !0;
      }
      return !1;
    }
    function Ob(e) {
      return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
    }
    function ME(e, t, n, a) {
      if (
        n.type === 'stylesheet' &&
        (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
        (n.state.loading & 4) === 0
      ) {
        if (n.instance === null) {
          var o = Yo(a.href),
            r = t.querySelector(ci(o));
          if (r) {
            ((t = r._p),
              t !== null &&
                typeof t == 'object' &&
                typeof t.then == 'function' &&
                (e.count++, (e = Ks.bind(e)), t.then(e, e)),
              (n.state.loading |= 4),
              (n.instance = r),
              Re(r));
            return;
          }
          ((r = t.ownerDocument || t),
            (a = Eb(a)),
            (o = Dt.get(o)) && Ud(a, o),
            (r = r.createElement('link')),
            Re(r));
          var i = r;
          ((i._p = new Promise(function (s, l) {
            ((i.onload = s), (i.onerror = l));
          })),
            ke(r, 'link', a),
            (n.instance = r));
        }
        (e.stylesheets === null && (e.stylesheets = new Map()),
          e.stylesheets.set(n, t),
          (t = n.state.preload) &&
            (n.state.loading & 3) === 0 &&
            (e.count++,
            (n = Ks.bind(e)),
            t.addEventListener('load', n),
            t.addEventListener('error', n)));
      }
    }
    var ju = 0;
    function EE(e, t) {
      return (
        e.stylesheets && e.count === 0 && Os(e, e.stylesheets),
        0 < e.count || 0 < e.imgCount
          ? function (n) {
              var a = setTimeout(function () {
                if ((e.stylesheets && Os(e, e.stylesheets), e.unsuspend)) {
                  var r = e.unsuspend;
                  ((e.unsuspend = null), r());
                }
              }, 6e4 + t);
              0 < e.imgBytes && ju === 0 && (ju = 62500 * oE());
              var o = setTimeout(
                function () {
                  if (
                    ((e.waitingForImages = !1),
                    e.count === 0 &&
                      (e.stylesheets && Os(e, e.stylesheets), e.unsuspend))
                  ) {
                    var r = e.unsuspend;
                    ((e.unsuspend = null), r());
                  }
                },
                (e.imgBytes > ju ? 50 : 800) + t,
              );
              return (
                (e.unsuspend = n),
                function () {
                  ((e.unsuspend = null), clearTimeout(a), clearTimeout(o));
                }
              );
            }
          : null
      );
    }
    function Ks() {
      if (
        (this.count--,
        this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
      ) {
        if (this.stylesheets) Os(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          ((this.unsuspend = null), e());
        }
      }
    }
    var Js = null;
    function Os(e, t) {
      ((e.stylesheets = null),
        e.unsuspend !== null &&
          (e.count++,
          (Js = new Map()),
          t.forEach(OE, e),
          (Js = null),
          Ks.call(e)));
    }
    function OE(e, t) {
      if (!(t.state.loading & 4)) {
        var n = Js.get(e);
        if (n) var a = n.get(null);
        else {
          ((n = new Map()), Js.set(e, n));
          for (
            var o = e.querySelectorAll(
                'link[data-precedence],style[data-precedence]',
              ),
              r = 0;
            r < o.length;
            r++
          ) {
            var i = o[r];
            (i.nodeName === 'LINK' || i.getAttribute('media') !== 'not all') &&
              (n.set(i.dataset.precedence, i), (a = i));
          }
          a && n.set(null, a);
        }
        ((o = t.instance),
          (i = o.getAttribute('data-precedence')),
          (r = n.get(i) || a),
          r === a && n.set(null, o),
          n.set(i, o),
          this.count++,
          (a = Ks.bind(this)),
          o.addEventListener('load', a),
          o.addEventListener('error', a),
          r
            ? r.parentNode.insertBefore(o, r.nextSibling)
            : ((e = e.nodeType === 9 ? e.head : e),
              e.insertBefore(o, e.firstChild)),
          (t.state.loading |= 4));
      }
    }
    var Xr = {
      $$typeof: nn,
      Provider: null,
      Consumer: null,
      _currentValue: ya,
      _currentValue2: ya,
      _threadCount: 0,
    };
    function CE(e, t, n, a, o, r, i, s, l) {
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
        (this.expirationTimes = Su(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = Su(0)),
        (this.hiddenUpdates = Su(null)),
        (this.identifierPrefix = a),
        (this.onUncaughtError = o),
        (this.onCaughtError = r),
        (this.onRecoverableError = i),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = l),
        (this.incompleteTransitions = new Map()));
    }
    function Cb(e, t, n, a, o, r, i, s, l, c, u, d) {
      return (
        (e = new CE(e, t, n, i, l, c, u, d, s)),
        (t = 1),
        r === !0 && (t |= 24),
        (r = nt(3, null, null, t)),
        (e.current = r),
        (r.stateNode = e),
        (t = ld()),
        t.refCount++,
        (e.pooledCache = t),
        t.refCount++,
        (r.memoizedState = { element: a, isDehydrated: n, cache: t }),
        fd(r),
        e
      );
    }
    function Nb(e) {
      return e ? ((e = po), e) : po;
    }
    function wb(e, t, n, a, o, r) {
      ((o = Nb(o)),
        a.context === null ? (a.context = o) : (a.pendingContext = o),
        (a = Wn(t)),
        (a.payload = { element: n }),
        (r = r === void 0 ? null : r),
        r !== null && (a.callback = r),
        (n = Fn(e, a, t)),
        n !== null && (je(n, e, t), $r(n, e, t)));
    }
    function Lp(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function kd(e, t) {
      (Lp(e, t), (e = e.alternate) && Lp(e, t));
    }
    function Rb(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = $a(e, 67108864);
        (t !== null && je(t, e, 67108864), kd(e, 67108864));
      }
    }
    function Zp(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = st();
        t = jf(t);
        var n = $a(e, t);
        (n !== null && je(n, e, t), kd(e, t));
      }
    }
    var el = !0;
    function NE(e, t, n, a) {
      var o = H.T;
      H.T = null;
      var r = q.p;
      try {
        ((q.p = 2), Bd(e, t, n, a));
      } finally {
        ((q.p = r), (H.T = o));
      }
    }
    function wE(e, t, n, a) {
      var o = H.T;
      H.T = null;
      var r = q.p;
      try {
        ((q.p = 8), Bd(e, t, n, a));
      } finally {
        ((q.p = r), (H.T = o));
      }
    }
    function Bd(e, t, n, a) {
      if (el) {
        var o = Wf(a);
        if (o === null) (qu(e, t, a, tl, n), Wp(e, a));
        else if ($E(o, e, t, n, a)) a.stopPropagation();
        else if ((Wp(e, a), t & 4 && -1 < RE.indexOf(e))) {
          for (; o !== null; ) {
            var r = _o(o);
            if (r !== null)
              switch (r.tag) {
                case 3:
                  if (
                    ((r = r.stateNode), r.current.memoizedState.isDehydrated)
                  ) {
                    var i = ha(r.pendingLanes);
                    if (i !== 0) {
                      var s = r;
                      for (s.pendingLanes |= 2, s.entangledLanes |= 2; i; ) {
                        var l = 1 << (31 - it(i));
                        ((s.entanglements[1] |= l), (i &= ~l));
                      }
                      (Zt(r), (P & 6) === 0 && ((Fs = ot() + 500), li(0, !1)));
                    }
                  }
                  break;
                case 31:
                case 13:
                  ((s = $a(r, 2)), s !== null && je(s, r, 2), hl(), kd(r, 2));
              }
            if (((r = Wf(a)), r === null && qu(e, t, a, tl, n), r === o)) break;
            o = r;
          }
          o !== null && a.stopPropagation();
        } else qu(e, t, a, null, n);
      }
    }
    function Wf(e) {
      return ((e = Kf(e)), _d(e));
    }
    var tl = null;
    function _d(e) {
      if (((tl = null), (e = co(e)), e !== null)) {
        var t = Jr(e);
        if (t === null) e = null;
        else {
          var n = t.tag;
          if (n === 13) {
            if (((e = Gp(t)), e !== null)) return e;
            e = null;
          } else if (n === 31) {
            if (((e = Xp(t)), e !== null)) return e;
            e = null;
          } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return ((tl = e), null);
    }
    function $b(e) {
      switch (e) {
        case 'beforetoggle':
        case 'cancel':
        case 'click':
        case 'close':
        case 'contextmenu':
        case 'copy':
        case 'cut':
        case 'auxclick':
        case 'dblclick':
        case 'dragend':
        case 'dragstart':
        case 'drop':
        case 'focusin':
        case 'focusout':
        case 'input':
        case 'invalid':
        case 'keydown':
        case 'keypress':
        case 'keyup':
        case 'mousedown':
        case 'mouseup':
        case 'paste':
        case 'pause':
        case 'play':
        case 'pointercancel':
        case 'pointerdown':
        case 'pointerup':
        case 'ratechange':
        case 'reset':
        case 'resize':
        case 'seeked':
        case 'submit':
        case 'toggle':
        case 'touchcancel':
        case 'touchend':
        case 'touchstart':
        case 'volumechange':
        case 'change':
        case 'selectionchange':
        case 'textInput':
        case 'compositionstart':
        case 'compositionend':
        case 'compositionupdate':
        case 'beforeblur':
        case 'afterblur':
        case 'beforeinput':
        case 'blur':
        case 'fullscreenchange':
        case 'focus':
        case 'hashchange':
        case 'popstate':
        case 'select':
        case 'selectstart':
          return 2;
        case 'drag':
        case 'dragenter':
        case 'dragexit':
        case 'dragleave':
        case 'dragover':
        case 'mousemove':
        case 'mouseout':
        case 'mouseover':
        case 'pointermove':
        case 'pointerout':
        case 'pointerover':
        case 'scroll':
        case 'touchmove':
        case 'wheel':
        case 'mouseenter':
        case 'mouseleave':
        case 'pointerenter':
        case 'pointerleave':
          return 8;
        case 'message':
          switch (pD()) {
            case ey:
              return 2;
            case ty:
              return 8;
            case $s:
            case yD:
              return 32;
            case ny:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Ff = !1,
      Vn = null,
      jn = null,
      Gn = null,
      Qr = new Map(),
      Kr = new Map(),
      Un = [],
      RE =
        'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
          ' ',
        );
    function Wp(e, t) {
      switch (e) {
        case 'focusin':
        case 'focusout':
          Vn = null;
          break;
        case 'dragenter':
        case 'dragleave':
          jn = null;
          break;
        case 'mouseover':
        case 'mouseout':
          Gn = null;
          break;
        case 'pointerover':
        case 'pointerout':
          Qr.delete(t.pointerId);
          break;
        case 'gotpointercapture':
        case 'lostpointercapture':
          Kr.delete(t.pointerId);
      }
    }
    function br(e, t, n, a, o, r) {
      return e === null || e.nativeEvent !== r
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: a,
            nativeEvent: r,
            targetContainers: [o],
          }),
          t !== null && ((t = _o(t)), t !== null && Rb(t)),
          e)
        : ((e.eventSystemFlags |= a),
          (t = e.targetContainers),
          o !== null && t.indexOf(o) === -1 && t.push(o),
          e);
    }
    function $E(e, t, n, a, o) {
      switch (t) {
        case 'focusin':
          return ((Vn = br(Vn, e, t, n, a, o)), !0);
        case 'dragenter':
          return ((jn = br(jn, e, t, n, a, o)), !0);
        case 'mouseover':
          return ((Gn = br(Gn, e, t, n, a, o)), !0);
        case 'pointerover':
          var r = o.pointerId;
          return (Qr.set(r, br(Qr.get(r) || null, e, t, n, a, o)), !0);
        case 'gotpointercapture':
          return (
            (r = o.pointerId),
            Kr.set(r, br(Kr.get(r) || null, e, t, n, a, o)),
            !0
          );
      }
      return !1;
    }
    function xb(e) {
      var t = co(e.target);
      if (t !== null) {
        var n = Jr(t);
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = Gp(n)), t !== null)) {
              ((e.blockedOn = t),
                Cg(e.priority, function () {
                  Zp(n);
                }));
              return;
            }
          } else if (t === 31) {
            if (((t = Xp(n)), t !== null)) {
              ((e.blockedOn = t),
                Cg(e.priority, function () {
                  Zp(n);
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
    function Cs(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Wf(e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var a = new n.constructor(n.type, n);
          ((lf = a), n.target.dispatchEvent(a), (lf = null));
        } else return ((t = _o(n)), t !== null && Rb(t), (e.blockedOn = n), !1);
        t.shift();
      }
      return !0;
    }
    function Fp(e, t, n) {
      Cs(e) && n.delete(t);
    }
    function xE() {
      ((Ff = !1),
        Vn !== null && Cs(Vn) && (Vn = null),
        jn !== null && Cs(jn) && (jn = null),
        Gn !== null && Cs(Gn) && (Gn = null),
        Qr.forEach(Fp),
        Kr.forEach(Fp));
    }
    function us(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        Ff ||
          ((Ff = !0),
          Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority, xE)));
    }
    var fs = null;
    function Pp(e) {
      fs !== e &&
        ((fs = e),
        Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority, function () {
          fs === e && (fs = null);
          for (var t = 0; t < e.length; t += 3) {
            var n = e[t],
              a = e[t + 1],
              o = e[t + 2];
            if (typeof a != 'function') {
              if (_d(a || n) === null) continue;
              break;
            }
            var r = _o(n);
            r !== null &&
              (e.splice(t, 3),
              (t -= 3),
              Ef(
                r,
                { pending: !0, data: o, method: n.method, action: a },
                a,
                o,
              ));
          }
        }));
    }
    function ko(e) {
      function t(l) {
        return us(l, e);
      }
      (Vn !== null && us(Vn, e),
        jn !== null && us(jn, e),
        Gn !== null && us(Gn, e),
        Qr.forEach(t),
        Kr.forEach(t));
      for (var n = 0; n < Un.length; n++) {
        var a = Un[n];
        a.blockedOn === e && (a.blockedOn = null);
      }
      for (; 0 < Un.length && ((n = Un[0]), n.blockedOn === null); )
        (xb(n), n.blockedOn === null && Un.shift());
      if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
        for (a = 0; a < n.length; a += 3) {
          var o = n[a],
            r = n[a + 1],
            i = o[Ge] || null;
          if (typeof r == 'function') i || Pp(n);
          else if (i) {
            var s = null;
            if (r && r.hasAttribute('formAction')) {
              if (((o = r), (i = r[Ge] || null))) s = i.formAction;
              else if (_d(o) !== null) continue;
            } else s = i.action;
            (typeof s == 'function'
              ? (n[a + 1] = s)
              : (n.splice(a, 3), (a -= 3)),
              Pp(n));
          }
        }
    }
    function Ab() {
      function e(r) {
        r.canIntercept &&
          r.info === 'react-transition' &&
          r.intercept({
            handler: function () {
              return new Promise(function (i) {
                return (o = i);
              });
            },
            focusReset: 'manual',
            scroll: 'manual',
          });
      }
      function t() {
        (o !== null && (o(), (o = null)), a || setTimeout(n, 20));
      }
      function n() {
        if (!a && !navigation.transition) {
          var r = navigation.currentEntry;
          r &&
            r.url != null &&
            navigation.navigate(r.url, {
              state: r.getState(),
              info: 'react-transition',
              history: 'replace',
            });
        }
      }
      if (typeof navigation == 'object') {
        var a = !1,
          o = null;
        return (
          navigation.addEventListener('navigate', e),
          navigation.addEventListener('navigatesuccess', t),
          navigation.addEventListener('navigateerror', t),
          setTimeout(n, 100),
          function () {
            ((a = !0),
              navigation.removeEventListener('navigate', e),
              navigation.removeEventListener('navigatesuccess', t),
              navigation.removeEventListener('navigateerror', t),
              o !== null && (o(), (o = null)));
          }
        );
      }
    }
    function zd(e) {
      this._internalRoot = e;
    }
    yl.prototype.render = zd.prototype.render = function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(M(409));
      var n = t.current,
        a = st();
      wb(n, a, e, t, null, null);
    };
    yl.prototype.unmount = zd.prototype.unmount = function () {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (wb(e.current, 2, null, e, null, null), hl(), (t[Bo] = null));
      }
    };
    function yl(e) {
      this._internalRoot = e;
    }
    yl.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = sy();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < Un.length && t !== 0 && t < Un[n].priority; n++);
        (Un.splice(n, 0, e), n === 0 && xb(e));
      }
    };
    var qp = Vp.version;
    if (qp !== '19.2.8') throw Error(M(527, qp, '19.2.8'));
    q.findDOMNode = function (e) {
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == 'function'
          ? Error(M(188))
          : ((e = Object.keys(e).join(',')), Error(M(268, e)));
      return (
        (e = cD(t)),
        (e = e !== null ? Qp(e) : null),
        (e = e === null ? null : e.stateNode),
        e
      );
    };
    var AE = {
      bundleType: 0,
      version: '19.2.8',
      rendererPackageName: 'react-dom',
      currentDispatcherRef: H,
      reconcilerVersion: '19.2.8',
    };
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u' &&
      ((Sr = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !Sr.isDisabled && Sr.supportsFiber)
    )
      try {
        ((ei = Sr.inject(AE)), (rt = Sr));
      } catch {}
    var Sr;
    vl.createRoot = function (e, t) {
      if (!jp(e)) throw Error(M(299));
      var n = !1,
        a = '',
        o = Mv,
        r = Ev,
        i = Ov;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (o = t.onUncaughtError),
          t.onCaughtError !== void 0 && (r = t.onCaughtError),
          t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = Cb(e, 1, !1, null, null, n, a, null, o, r, i, Ab)),
        (e[Bo] = t.current),
        Hd(e),
        new zd(t)
      );
    };
    vl.hydrateRoot = function (e, t, n) {
      if (!jp(e)) throw Error(M(299));
      var a = !1,
        o = '',
        r = Mv,
        i = Ev,
        s = Ov,
        l = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (a = !0),
          n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (r = n.onUncaughtError),
          n.onCaughtError !== void 0 && (i = n.onCaughtError),
          n.onRecoverableError !== void 0 && (s = n.onRecoverableError),
          n.formState !== void 0 && (l = n.formState)),
        (t = Cb(e, 1, !0, t, n ?? null, a, o, l, r, i, s, Ab)),
        (t.context = Nb(null)),
        (n = t.current),
        (a = st()),
        (a = jf(a)),
        (o = Wn(a)),
        (o.callback = null),
        Fn(n, o, a),
        (n = a),
        (t.current.lanes = n),
        ni(t, n),
        Zt(t),
        (e[Bo] = t.current),
        Hd(e),
        new yl(t)
      );
    };
    vl.version = '19.2.8';
  });
  var Yb = Ut((FR, Ub) => {
    'use strict';
    function Hb() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Hb);
        } catch (e) {
          console.error(e);
        }
    }
    (Hb(), (Ub.exports = Ib()));
  });
  var TT = Ut((Rc) => {
    'use strict';
    var UN = Symbol.for('react.transitional.element'),
      YN = Symbol.for('react.fragment');
    function ST(e, t, n) {
      var a = null;
      if (
        (n !== void 0 && (a = '' + n),
        t.key !== void 0 && (a = '' + t.key),
        'key' in t)
      ) {
        n = {};
        for (var o in t) o !== 'key' && (n[o] = t[o]);
      } else n = t;
      return (
        (t = n.ref),
        {
          $$typeof: UN,
          type: e,
          key: a,
          ref: t !== void 0 ? t : null,
          props: n,
        }
      );
    }
    Rc.Fragment = YN;
    Rc.jsx = ST;
    Rc.jsxs = ST;
  });
  var Ae = Ut((cz, DT) => {
    'use strict';
    DT.exports = TT();
  });
  var H1 = F(Yb());
  var eu = F(dt());
  var Nt = globalThis.Temporal;
  var kb = (e, t) => `Non-positive ${e}: ${t}`,
    Bb = (e, t) => `Non-finite ${e}: ${t}`,
    _b = (e) => `Cannot convert bigint to ${e}`,
    zb = 'Invalid object',
    fi = (e, t, n, a) => Po(e, t) + `; must be between ${n}-${a}`,
    Po = (e, t) => `Invalid ${e}: ${t}`;
  var bl = 1e3,
    Sl = 1e6,
    Tl = 1e9,
    Dl = 6e10,
    Ml = 36e11;
  function El(e) {
    return e === void 0 ? Object.create(null) : Wd(e);
  }
  function Ol(e, t = 'number') {
    if (typeof e == 'bigint') throw new TypeError(_b(t));
    if (((e = Number(e)), !Number.isFinite(e))) throw new RangeError(Bb(t, e));
    return e;
  }
  function Aa(e, t) {
    return Math.trunc(Ol(e, t)) || 0;
  }
  function Cl(e, t) {
    return Lb(Aa(e, t), t);
  }
  function Lb(e, t = 'number') {
    if (e <= 0) throw new RangeError(kb(t, e));
    return e;
  }
  function Zd(e, t, n) {
    return Math.min(Math.max(e, t), n);
  }
  function di(e) {
    return e !== null && (typeof e == 'object' || typeof e == 'function');
  }
  function Wd(e) {
    if (!di(e)) throw new TypeError(zb);
    return e;
  }
  function Wt(e) {
    return (t, n, a) => {
      let o = QE(a);
      if (o.roundingMode)
        return t.until(n, { ...o, largestUnit: e, smallestUnit: e })[e];
      let r = t.until(n, { ...o, largestUnit: e });
      if (zE(e)) return r.total(e);
      let i =
        !('day' in t) && 'toPlainDate' in t ? t.toPlainDate({ day: 1 }) : t;
      return r.total({ unit: e, relativeTo: i });
    };
  }
  function zE(e) {
    return (
      e === 'hours' ||
      e === 'minutes' ||
      e === 'seconds' ||
      e === 'milliseconds' ||
      e === 'microseconds' ||
      e === 'nanoseconds'
    );
  }
  var LE = Wt('years'),
    ZE = Wt('months'),
    WE = Wt('weeks'),
    FE = Wt('days'),
    PE = Wt('hours'),
    qE = Wt('minutes'),
    VE = Wt('seconds'),
    jE = Wt('milliseconds'),
    GE = Wt('microseconds'),
    XE = Wt('nanoseconds');
  function QE(e) {
    return typeof e == 'string' ? { roundingMode: e } : e || {};
  }
  var tO = Po;
  var nO = (e) => `Missing ${e}`;
  var aO = (e, t, n) => Po(e, t) + '; must be ' + Object.keys(n).join(),
    Qb = 'Cannot use valueOf',
    Kb = 'Invalid calling context';
  var Jb = (e, t) => `Unknown calendar ${e}; might need ${t}`,
    oO = (e) => Po('TimeZone', e),
    Ul = 'Out-of-bounds date';
  var rO = (e) => `Cannot parse: ${e}`,
    iO = (e) => `Invalid substring: ${e}`;
  var e0 = Zd;
  function xe(e) {
    throw new RangeError(e);
  }
  function pn(e) {
    throw new TypeError(e);
  }
  function qb(e, t, n, a, o) {
    return Xd(
      t,
      ((r, i) => {
        let s = r[i];
        return (s === void 0 && pn(nO(i)), s);
      })(e, t),
      n,
      a,
      o,
    );
  }
  function Xd(e, t, n, a, o, r) {
    let i = e0(t, n, a);
    return (
      o &&
        t !== i &&
        xe(
          ((s, l, c, u, d) => (d ? fi(s, d[l], d[c], d[u]) : fi(s, l, c, u)))(
            e,
            t,
            n,
            a,
            r,
          ),
        ),
      i
    );
  }
  function qo(e, t = Map) {
    let n = new t();
    return (a, ...o) => {
      if (n.has(a)) return n.get(a);
      let r = e(a, ...o);
      return (n.set(a, r), r);
    };
  }
  var t0 = (e) => sO({ name: e }, 1),
    sO = (e, t) => gi((n) => ({ value: n, configurable: 1, writable: !t }), e),
    n0 = (e) => ({ [Symbol.toStringTag]: { value: e, configurable: 1 } });
  function gi(e, t) {
    let n = {};
    for (let a in t) n[a] = e(t[a], a);
    return n;
  }
  function lO(e, t) {
    let n = {};
    for (let a of e) n[a] = t;
    return n;
  }
  function Qd(e) {
    let t = {};
    for (let n of e) t[n] = (a) => a[n];
    return t;
  }
  function Rl(e, t, n = Object.create(null)) {
    for (let a of e) n[a] = t[a];
    return n;
  }
  function Yl(e, ...t) {
    return (...n) => e(...t, ...n);
  }
  function Kd() {}
  function Vb(e) {
    return e[0].toUpperCase() + e.substring(1);
  }
  function Jd(e) {
    return new RegExp(`^${e}$`, 'i');
  }
  function cO(e) {
    return parseInt(e.padEnd(9, '0'));
  }
  function uO(e) {
    return e && e !== '+' ? -1 : 1;
  }
  function Fd(e) {
    return e === void 0 ? 0 : parseInt(e);
  }
  function $l(e, t) {
    return String(t).padStart(e, '0');
  }
  var gn = Yl($l, 2);
  function fO(e, t) {
    return Math.sign(e - t);
  }
  function a0(e, t) {
    let n = e / t;
    return e % t < 0n ? n - 1n : n;
  }
  function o0(e, t) {
    let n = a0(e, t);
    return [n, e - n * t];
  }
  function na(e, t) {
    return [Math.floor(e / t), kl(e, t)];
  }
  function kl(e, t) {
    return ((e % t) + t) % t;
  }
  function dO(e, t) {
    return Math.trunc(e / t) || 0;
  }
  function Nl(e) {
    return Math.abs(e % 1) === 0.5;
  }
  function mO(e) {
    let t = e
      .normalize('NFD')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    return t === 'bc' || t === 'b' ? 'bce' : t === 'ad' || t === 'a' ? 'ce' : t;
  }
  var Ia = void 0;
  function pi(e) {
    return e === Ia ? 'iso8601' : e === 0 ? 'gregory' : e.id;
  }
  function hO(e, t) {
    return 'M' + gn(e) + (t ? 'L' : '');
  }
  var gO = {
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
    },
    pO = Object.keys(gO);
  var yi = bl,
    Vo = Sl,
    Ha = Tl,
    vi = Dl,
    Bl = Ml,
    _l = 864e11;
  var em = BigInt(Vo),
    xl = BigInt(Ha);
  var aa = BigInt(_l);
  var bi = pO.slice(0, 6),
    Si = Qd(bi);
  var r0 = ['day', 'month', 'year'];
  function i0(e) {
    return (vO(e, 1), e);
  }
  var yO = { hour: 23, minute: 59, second: 59 };
  function vO(e, t) {
    let n = {};
    for (let a of bi) n[a] = Xd(a, e[a], 0, yO[a] || 999, t);
    return n;
  }
  function zl(e) {
    return s0(e) * Ha + l0(e);
  }
  function s0(e) {
    return 3600 * e.hour + 60 * e.minute + e.second;
  }
  function l0(e) {
    return e.millisecond * Vo + e.microsecond * yi + e.nanosecond;
  }
  function bO(e) {
    let [t, n] = na(e, Vo),
      [a, o] = na(n, yi);
    return SO(t, a, o);
  }
  function SO(e, t = 0, n = 0) {
    let [a, o] = na(e, 36e5),
      [r, i] = na(o, 6e4),
      [s, l] = na(i, 1e3);
    return {
      hour: a,
      minute: r,
      second: s,
      millisecond: l,
      microsecond: t,
      nanosecond: n,
    };
  }
  function jb(e) {
    let [t, n] = o0(e, xl);
    return [Number(t), Number(n)];
  }
  function Al(e) {
    return Ti(e) + BigInt(zl(e));
  }
  function Ti(e) {
    return BigInt(mi(e)) * aa;
  }
  function mi(e) {
    return hi(e.year, e.month, e.day);
  }
  function hi(e, t = 1, n = 1) {
    let a = t - 1;
    return (
      (e += Math.floor(a / 12)),
      (t = kl(a, 12)),
      Date.UTC((e % 400) - 400, t, 0) / 864e5 + 146097 * (dO(e, 400) + 1) + n
    );
  }
  function Di(e) {
    let [t, n] = o0(e, aa);
    return { ...TO(Number(t)), ...bO(Number(n)) };
  }
  function TO(e) {
    let t = new Date(864e5 * kl(e, 146097));
    return {
      year: t.getUTCFullYear() + 400 * Math.floor(e / 146097),
      month: t.getUTCMonth() + 1,
      day: t.getUTCDate(),
    };
  }
  function DO(e) {
    return [e, 0];
  }
  function MO(e, t, n) {
    return { year: e, month: t, day: n };
  }
  function c0(e, t) {
    switch (t) {
      case 2:
        return Ll(e) ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
    }
    return 31;
  }
  function EO(e) {
    return Ll(e) ? 366 : 365;
  }
  function Ll(e) {
    return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
  }
  function Mi(e) {
    return kl(hi(e.year, e.month, e.day) + 4, 7) || 7;
  }
  function u0(e) {
    return hi(e.year, e.month, e.day) - hi(e.year) + 1;
  }
  function tm(e) {
    let t = e.year,
      n = Math.floor((u0(e) - Mi(e) + 10) / 7),
      a = Pd(t);
    return (
      n < 1 ? (n = a = Pd(--t)) : n > a && ((n = 1), (a = Pd(++t))),
      { weekOfYear: n, yearOfWeek: t, Be: a }
    );
  }
  function Pd(e) {
    let t = Mi({ year: e, month: 1, day: 1 });
    return t === 4 || (t === 3 && Ll(e)) ? 53 : 52;
  }
  function OO({ year: e }) {
    return e < 1 ? { era: 'bce', eraYear: 1 - e } : { era: 'ce', eraYear: e };
  }
  function f0(e) {
    return (d0(e), i0(e));
  }
  function d0(e) {
    return (CO(e, 1), e);
  }
  function CO(e, t) {
    let { year: n } = e,
      a = qb(e, 'month', 1, 12, t);
    return { year: n, month: a, day: qb(e, 'day', 1, c0(n, a), t) };
  }
  function wt(e, t) {
    return e ? e.ae(t) : t;
  }
  function NO(e, t, n) {
    return e ? e.L(t, n) : DO(n);
  }
  function nm(e, t) {
    return e === 0 ? OO(t) : (e && e.h?.(t)) || {};
  }
  function m0(e, t, n, a) {
    return e ? e.de(t, n, a) : MO(t, n, a);
  }
  function wO(e, t) {
    return e ? e.j(t) : 12;
  }
  function RO(e, t, n) {
    return e ? e.o(t, n) : c0(t, n);
  }
  function am(e, t) {
    let { year: n, month: a } = wt(e, t),
      [o, r] = NO(e, n, a);
    return hO(o, r);
  }
  function Zl(e, t) {
    let { year: n } = wt(e, t);
    return e ? e.q(n) : Ll(n);
  }
  function Wl(e, t) {
    let { year: n } = wt(e, t);
    return wO(e, n);
  }
  function Fl(e, t) {
    let { year: n, month: a } = wt(e, t);
    return RO(e, n, a);
  }
  function Pl(e, t) {
    let { year: n } = wt(e, t);
    return e ? e.i(n) : EO(n);
  }
  function om(e, t) {
    if (!e) return u0(t);
    let { year: n } = wt(e, t),
      a = m0(e, n, 1, 1);
    return mi(t) - mi(a) + 1;
  }
  function rm(e, t) {
    return e === Ia ? tm(t).weekOfYear : void 0;
  }
  function im(e, t) {
    return e === Ia ? tm(t).yearOfWeek : void 0;
  }
  var Il = Yl($O, 'string');
  function $O(e, t, n = e) {
    return (typeof t !== e && pn(tO(n, t)), t);
  }
  function xO(e, t = 'number') {
    return (
      Number.isInteger(e) || xe(((n, a) => `Non-integer ${n}: ${a}`)(t, e)),
      e || 0
    );
  }
  function AO(e) {
    return (
      typeof e == 'symbol' && pn('Cannot convert Symbol to string'),
      String(e)
    );
  }
  function h0(e, t) {
    return di(e) ? String(e) : Il(e, t);
  }
  function g0(e, t) {
    return xO(Ol(e, t), t);
  }
  var IO = { compatible: 0, reject: 1, earlier: 2, later: 3 };
  var HO = [
    Math.floor,
    (e) => (Nl(e) ? Math.floor(e) : Math.round(e)),
    Math.ceil,
    (e) => (Nl(e) ? Math.ceil(e) : Math.round(e)),
    Math.trunc,
    (e) => (Nl(e) ? Math.trunc(e) || 0 : Math.round(e)),
    (e) => (e < 0 ? Math.floor(e) : Math.ceil(e)),
    (e) => Math.sign(e) * Math.round(Math.abs(e)) || 0,
    (e) => (Nl(e) ? (e = Math.trunc(e) || 0) + (e % 2) : Math.round(e)),
  ];
  function UO(e, t, n, a = 0) {
    let o = n[e];
    if (o === void 0) return a;
    let r = AO(o),
      i = t[r];
    return (i === void 0 && xe(aO(e, r, t)), i);
  }
  var YO = Yl(UO, 'disambiguation', IO);
  function p0(e, t) {
    return Rl(r0, e, Rl(bi, t));
  }
  var y0 = BigInt(1e8) * aa,
    sm = BigInt(-1e8) * aa,
    v0 = sm - aa;
  function b0(e, t = 1) {
    return (T0(Ti(e), t), e);
  }
  function S0(e) {
    let t = Ti(e);
    return (T0(t), t !== v0 || zl(e) || xe(Ul), e);
  }
  function T0(e, t = 1) {
    (e < (t ? v0 : sm) || e > y0) && xe(Ul);
  }
  function jo(e) {
    return ((e < sm || e > y0) && xe(Ul), e);
  }
  function D0(e, t) {
    return jo(Ti(e) + BigInt(zl(e) - t));
  }
  function M0(e) {
    return { epochNanoseconds: e };
  }
  function lm(e, t, n) {
    return { calendar: n, timeZone: t, epochNanoseconds: e };
  }
  function E0(e, t) {
    return Rl(bi, e, O0(e, t));
  }
  function O0(e, t) {
    return Rl(r0, e, { calendar: t });
  }
  function cm(e) {
    return ((t = e.epochNanoseconds), Number(a0(t, em)));
    var t;
  }
  function um(e) {
    return e.epochNanoseconds;
  }
  function Vd(e) {
    return C0(e, vi, 7);
  }
  function C0(e, t, n) {
    return N0(e / t, n) * t;
  }
  function N0(e, t) {
    return HO[t](e);
  }
  var ql = qo(kO, WeakMap);
  function kO(e) {
    let { epochNanoseconds: t, timeZone: n } = e,
      a = n.B(t);
    return { ...Di(t + BigInt(a)), offsetNanoseconds: a };
  }
  function w0(e, t, n, a = 0, o = 0, r, i) {
    if (n !== void 0 && a === 1 && (a === 1 || i)) return D0(t, n);
    (a !== 2 && a !== 0) || b0(t, 0);
    let s = e.N(t);
    if (n !== void 0 && a !== 3) {
      let l = ((c, u, d, f) => {
        let m = Al(u);
        f && (d = Vd(d));
        for (let v of c) {
          let p = Number(m - v);
          if ((f && (p = Vd(p)), p === d)) return v;
        }
      })(s, t, n, r);
      if (l !== void 0) return l;
      a === 0 && xe('Invalid TimeZone offset');
    }
    return i ? Al(t) : fm(e, t, o, s);
  }
  function fm(e, t, n = 0, a = e.N(t)) {
    if (a.length === 1) return a[0];
    if ((n === 1 && xe('Ambiguous offset'), a.length))
      return a[n === 3 ? 1 : 0];
    let o = Al(t),
      r = ((s, l) => {
        let c = s.B(l - aa);
        return ((u) => (u > _l && xe('Out-of-bounds TimeZone gap'), u))(
          s.B(l + aa) - c,
        );
      })(e, o),
      i = Di(o + BigInt(r * (n === 2 ? -1 : 1)));
    return (a = e.N(i))[n === 2 ? 0 : a.length - 1];
  }
  var h$ = 2 ** 53;
  var BO = Jd(
    '([+-])(\\d{2})(?::?(\\d{2})(?::?(\\d{2})(?:[.,](\\d{1,9}))?)?)?',
  );
  function _O(e) {
    let t = R0(e);
    return (t === void 0 && xe(rO(e)), t);
  }
  function R0(e, t) {
    let n = BO.exec(e);
    if (
      n &&
      ((a) =>
        ((o) => {
          (o[0] !== 'T' && o[0] !== 't') || (o = o.slice(1));
          let r = o.search(/[.,]/),
            i = r < 0 ? o : o.slice(0, r),
            s = i.split(':');
          return s.length === 1
            ? /^(?:\d{2}|\d{4}|\d{6})$/i.test(i)
            : (s.length === 2 || s.length === 3) &&
                s.every((l) => l.length === 2 && /^\d{2}$/i.test(l));
        })(a.slice(1)))(n[0])
    )
      return ((a, o) => {
        let r = a[4] || a[5];
        return (
          o && r && xe(iO(r)),
          (s =
            (Fd(a[2]) * Bl + Fd(a[3]) * vi + Fd(a[4]) * Ha + cO(a[5] || '')) *
            uO(a[1])),
          Math.abs(s) >= _l && xe('Out-of-bounds offset'),
          s
        );
        var s;
      })(n, t);
  }
  var zO = {
      era: h0,
      month: Cl,
      monthCode(e, t) {
        if (typeof e == 'string') return e;
        if (e && typeof e == 'object') {
          let n = e.toString;
          if (typeof n == 'function') return Il(n.call(e), t);
        }
        return Il(e, t);
      },
      day: Cl,
    },
    LO = lO(bi, Aa);
  var ZO = Object.assign({}, zO, LO),
    g$ = {
      offset(e) {
        return _O(h0(e));
      },
      ...ZO,
    };
  var $0 = Intl.DateTimeFormat;
  function WO(e, t) {
    t < -864e13 && xe(Ul);
    let n = e.formatToParts(t),
      a = {};
    for (let o of n) a[o.type] = o.value;
    return a;
  }
  var FO = {
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
    qd = -388152e4;
  function x0(e) {
    return dm(Di(e.epochNanoseconds), void 0) + 'Z';
  }
  function A0(e) {
    let t = e.calendar,
      n = e.timeZone,
      a = n.B(e.epochNanoseconds);
    return (
      dm(Di(e.epochNanoseconds + BigInt(a)), void 0) +
      mm(Vd(a)) +
      jO(n.id, 0) +
      (t === Ia ? '' : H0(pi(t), 0))
    );
  }
  function I0(e) {
    let t = e.calendar;
    return dm(e, void 0) + (t === Ia ? '' : H0(pi(t), 0));
  }
  function dm(e, t) {
    return PO(e) + 'T' + VO(e, t);
  }
  function PO(e) {
    return qO(e) + '-' + gn(e.day);
  }
  function qO(e) {
    let { year: t } = e;
    return (
      (t < 0 || t > 9999 ? Y0(t) + $l(6, Math.abs(t)) : $l(4, t)) +
      '-' +
      gn(e.month)
    );
  }
  function VO(e, t) {
    let n = [gn(e.hour), gn(e.minute)];
    return (
      t !== -1 &&
        n.push(
          gn(e.second) +
            ((a, o, r, i) => U0(a * Vo + o * yi + r, i))(
              e.millisecond,
              e.microsecond,
              e.nanosecond,
              t,
            ),
        ),
      n.join(':')
    );
  }
  function mm(e, t = 0) {
    if (t === 1) return '';
    let [n, a] = na(Math.abs(e), Bl),
      [o, r] = na(a, vi),
      [i, s] = na(r, Ha);
    return Y0(e) + gn(n) + ':' + gn(o) + (i || s ? ':' + gn(i) + U0(s) : '');
  }
  function jO(e, t) {
    return t !== 1 ? '[' + (t === 2 ? '!' : '') + e + ']' : '';
  }
  function H0(e, t) {
    return '[' + (t ? '!' : '') + 'u-ca=' + e + ']';
  }
  var GO = /0+$/;
  function U0(e, t) {
    let n = $l(9, e);
    return (
      (n = t === void 0 ? n.replace(GO, '') : n.slice(0, t)),
      n ? '.' + n : ''
    );
  }
  function Y0(e) {
    return e < 0 ? '-' : '+';
  }
  var XO =
      /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/,
    QO = /[^\w\/:+-]+/;
  function hm(e) {
    return KO(Il(e));
  }
  function KO(e) {
    return k0(e).id;
  }
  function k0(e) {
    let t = e.toUpperCase(),
      n = ((o) => {
        let r = R0(o, 1);
        if (r !== void 0) return { id: mm(r), X: r, m: r };
      })(t);
    if (n) return { kind: 'fixed', ...n };
    let a =
      t === 'UTC'
        ? 'UTC'
        : ((o) => (
            QO.test(o) && xe(oO(o)),
            XO.test(o) && xe('Forbidden ICU TimeZone'),
            o
              .toLowerCase()
              .split('/')
              .map((r, i) =>
                (r.length <= 3 || /\d/.test(r)) && !/etc|yap/.test(r)
                  ? r.toUpperCase()
                  : r.replace(/baja|dumont|[a-z]+/g, (s, l) =>
                      (s.length <= 2 && !i) || s === 'in' || s === 'chat'
                        ? s.toUpperCase()
                        : s.length > 2 || !l
                          ? Vb(s).replace(
                              /island|noronha|murdo|rivadavia|urville/,
                              Vb,
                            )
                          : s,
                    ),
              )
              .join('/')
          ))(e);
    return JO(a);
  }
  var JO = qo((e) => {
      if (e === 'UTC') return { kind: 'utc', id: e, m: e };
      let t = e.toUpperCase(),
        n = eC(t);
      return {
        kind: 'named',
        id: e,
        format: n,
        m: n.resolvedOptions().timeZone,
      };
    }),
    eC = qo(
      (e) =>
        new $0('en-u-hc-h23', {
          calendar: 'iso8601',
          timeZone: e,
          era: 'short',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }),
    );
  function gm(e) {
    let t = k0(e);
    return tC(t.id, t);
  }
  var tC = qo((e, t) =>
      t.kind === 'named'
        ? new Gd(e, t.m, t.format)
        : new jd(e, t.m, t.kind === 'fixed' ? t.X : 0),
    ),
    jd = class {
      constructor(t, n, a) {
        ((this.id = t), (this.m = n), (this.X = a));
      }
      B() {
        return this.X;
      }
      N(t) {
        return [D0(t, this.X)];
      }
      O() {}
    },
    Gd = class {
      constructor(t, n, a) {
        ((this.id = t),
          (this.m = n),
          (this.ke = ((o, r) => {
            let i = qo(o),
              s = qo(nC),
              l = 86400 * r;
            function c(d) {
              let [f, m] = Xb(d, l),
                v = wl(f),
                p = wl(m),
                E = i(v),
                g = i(p);
              return E === g ? E : u(s(v, p), E, g, d);
            }
            function u(d, f, m, v) {
              let p, E;
              for (
                ;
                (v === void 0 ||
                  (p = v < d[0] ? f : v >= d[1] ? m : void 0) === void 0) &&
                (E = d[1] - d[0]);
              ) {
                let g = d[0] + Math.floor(E / 2);
                o(g) === m ? (d[1] = g) : (d[0] = g + 1);
              }
              return p;
            }
            return {
              xe(d) {
                let f = c(d - 86400),
                  m = c(d + 86400),
                  v = d - f,
                  p = d - m;
                if (f === m) return [v];
                let E = c(v);
                return E === c(p) ? [d - E] : f > m ? [v, p] : [];
              },
              we: c,
              O: function d(f, m) {
                if (m > 0 && f >= 864e10) return;
                if (m < 0) {
                  if (f <= qd) return;
                  let b = Gb() + 94867200;
                  if (f > b) return d(b, -1);
                }
                let v = m > 0 ? Math.max(f, qd) : f,
                  [p, E] = Xb(v, l),
                  g = l * m,
                  h = m > 0 ? Math.max(f, Gb()) + 94867200 : qd,
                  y = () => (m < 0 ? E > h : p < h);
                for (; y(); ) {
                  let b = wl(p),
                    O = wl(E),
                    x = i(b),
                    C = i(O);
                  if (x !== C) {
                    let $ = s(b, O);
                    u($, x, C);
                    let R = $[0];
                    if ((fO(R, f) || 1) === m) return R;
                  }
                  ((p += g), (E += g));
                }
              },
            };
          })(
            ((o) => (r) => {
              let i = WO(o, 1e3 * r);
              return (
                86400 *
                  hi(
                    ((s) => {
                      let l = s.relatedYear;
                      if (l !== void 0) return parseInt(l);
                      let c = parseInt(s.year);
                      return s.era !== void 0 && mO(s.era) === 'bce'
                        ? 1 - c
                        : c;
                    })(i),
                    parseInt(i.month),
                    parseInt(i.day),
                  ) +
                3600 * parseInt(i.hour) +
                60 * parseInt(i.minute) +
                parseInt(i.second) -
                r
              );
            })(a),
            ((o) => {
              let r = o.split('/').pop();
              return FO[r] || 60;
            })(t),
          )));
      }
      B(t) {
        return this.ke.we(((n) => jb(n)[0])(t)) * Ha;
      }
      N(t) {
        let n = 86400 * mi(t) + s0(t),
          a = l0(t);
        return this.ke.xe(n).map((o) => jo(BigInt(o) * xl + BigInt(a)));
      }
      O(t, n) {
        let [a, o] = jb(t),
          r = this.ke.O(a + (n > 0 || o ? 1 : 0), n);
        if (r !== void 0) return BigInt(r) * xl;
      }
    };
  function Gb() {
    return Math.floor(Date.now() / 1e3);
  }
  function nC(e, t) {
    return [e, t];
  }
  function Xb(e, t) {
    let n = Math.floor(e / t) * t;
    return [n, n + t];
  }
  function wl(e) {
    return e0(e, -1e10, 864e10);
  }
  function Hl(e) {
    return `(\\d{2})(?:(:?)(\\d{2})(?:\\${e}(\\d{2})(?:[.,](\\d{1,9}))?)?)?`;
  }
  var aC =
    '(?:(?:([+-])(\\d{6}))|(\\d{4}))(-?)(\\d{2})\\4(\\d{2})(?:[T ]' +
    Hl(8) +
    '(Z|([+-])' +
    Hl(15) +
    ')?)?';
  var p$ = Jd(aC + '((?:\\[(!?)([^\\]]*)\\]){0,9})'),
    y$ = Jd('T?' + Hl(2) + `(([+-])${Hl(9)})?((?:\\[(!?)([^\\]]*)\\]){0,9})`);
  function B0(e, t, n) {
    return lm(e.epochNanoseconds, t, n);
  }
  function _0(e, t, n) {
    let a = fm(t, e, ((o) => YO(El(o)))(n));
    return lm(jo(a), t, e.calendar);
  }
  function z0(e) {
    return M0(jo(BigInt(g0(e)) * em));
  }
  function oC(e, t, n, a, o) {
    let r = new Set(e),
      i = new Set(t),
      s = new Set(n);
    return (l, c) => {
      let u,
        d,
        f = {},
        m = {},
        v = {},
        p = 0,
        E = 0;
      for (let R of Object.keys(l)) {
        let I = l[R];
        I === void 0 ||
          s.has(R) ||
          (r.has(R)
            ? R === 'dateStyle'
              ? (u = I)
              : R === 'timeStyle'
                ? (d = I)
                : (f[R] = I)
            : R === 'era'
              ? (m[R] = I)
              : i.has(R)
                ? R === 'dateStyle' || R === 'timeStyle'
                  ? (E = 1)
                  : (p = 1)
                : (v[R] = I));
      }
      let g = u !== void 0,
        h = d !== void 0,
        y = g || h,
        b = Object.keys(f).length > 0,
        O = p || E,
        x = b || g || h,
        C = Object.keys(m).length > 0;
      ((!c && O) || (c && O && !x) || (y && (b || C || p))) &&
        pn('Invalid formatting options');
      let $ = {};
      return (
        y || x || Object.assign($, a),
        Object.assign($, f, m, v),
        g && (o ? Object.assign($, o[u]) : ($.dateStyle = u)),
        h && ($.timeStyle = d),
        $
      );
    };
  }
  var rC = { year: 'numeric', month: 'numeric', day: 'numeric' },
    iC = { hour: 'numeric', minute: 'numeric', second: 'numeric' },
    sC = Object.assign({}, rC, iC),
    lC = ['weekday', 'year', 'month', 'day', 'dateStyle'],
    cC = [
      'dayPeriod',
      'hour',
      'minute',
      'second',
      'fractionalSecondDigits',
      'timeStyle',
    ],
    uC = lC.concat(cC);
  var fC = oC(uC, [], [], { ...sC, timeZoneName: 'short' });
  var L0 = 'PlainYearMonth',
    Z0 = 'PlainMonthDay',
    W0 = 'PlainDate',
    F0 = 'PlainDateTime',
    P0 = 'PlainTime',
    q0 = 'ZonedDateTime',
    V0 = 'Instant',
    j0 = 'Duration',
    G0 = 'Calendar';
  function yn(e, t, n, ...a) {
    return (
      Object.defineProperties(t, t0(e)),
      Object.defineProperties(t.prototype, n0('Temporal.' + e)),
      Object.defineProperties(
        t.prototype,
        gi(
          (o) => ({
            get() {
              return o(n(this));
            },
            configurable: 1,
          }),
          Object.assign({}, ...a),
        ),
      ),
      t
    );
  }
  var vn =
    Kd.name === 'noop'
      ? (e) => {
          Object.defineProperty(e, '_str_', { value: e.toJSON() });
        }
      : Kd;
  function Ei() {
    pn(Kb);
  }
  function jl() {
    pn(Qb);
  }
  var Gl = {
    era(e) {
      return nm(e.calendar, e).era;
    },
    eraYear(e) {
      return nm(e.calendar, e).eraYear;
    },
    year(e) {
      return wt(e.calendar, e).year;
    },
    month(e) {
      return wt(e.calendar, e).month;
    },
    monthCode(e) {
      return am(e.calendar, e);
    },
    day(e) {
      return wt(e.calendar, e).day;
    },
  };
  var mC = {
      daysInMonth(e) {
        return Fl(e.calendar, e);
      },
      daysInYear(e) {
        return Pl(e.calendar, e);
      },
      monthsInYear(e) {
        return Wl(e.calendar, e);
      },
      inLeapYear(e) {
        return Zl(e.calendar, e);
      },
    },
    hC = {
      dayOfWeek(e) {
        return Mi(e);
      },
      dayOfYear(e) {
        return om(e.calendar, e);
      },
      weekOfYear(e) {
        return rm(e.calendar, e);
      },
      yearOfWeek(e) {
        return im(e.calendar, e);
      },
      daysInWeek() {
        return 7;
      },
      daysInMonth(e) {
        return Fl(e.calendar, e);
      },
      daysInYear(e) {
        return Pl(e.calendar, e);
      },
      monthsInYear(e) {
        return Wl(e.calendar, e);
      },
      inLeapYear(e) {
        return Zl(e.calendar, e);
      },
    };
  function Vl(e) {
    return Qd(Object.keys(e));
  }
  var pm = Vl(Si);
  var ym = Vl(Gl);
  (Vl(mC), Vl(hC));
  var X0 = `${L0}Record`,
    Q0 = `${Z0}Record`,
    K0 = `${W0}Record`,
    Xl = `${F0}Record`,
    J0 = `${P0}Record`,
    Ql = `${q0}Record`,
    Kl = `${V0}Record`,
    eS = `${j0}Record`,
    C$ = `${G0}Record`,
    gC = new WeakMap(),
    tS = new WeakMap(),
    nS = new WeakMap(),
    aS = new WeakMap();
  function oS(e) {
    return pC(e) || Ei();
  }
  function pC(e) {
    return gC.get(e);
  }
  function Jl(e) {
    return yC(e) || Ei();
  }
  function yC(e) {
    return tS.get(e);
  }
  function ec(e, t) {
    tS.set(e, t);
  }
  function tc(e) {
    return vm(e) || Ei();
  }
  function vm(e) {
    return nS.get(e);
  }
  function nc(e, t) {
    nS.set(e, t);
  }
  function ac(e) {
    return bm(e) || Ei();
  }
  function bm(e) {
    return aS.get(e);
  }
  function oc(e, t) {
    aS.set(e, t);
  }
  function Sm(e) {
    return oS(e).id;
  }
  function rc(e) {
    let t = oS(e).ue;
    return (t || xe(Jb(Sm(e), 'getExotic or getAny')), t);
  }
  function $C(e) {
    if (e !== void 0) return xC(e);
  }
  function xC(e) {
    return (rc(e), Sm(e));
  }
  var Oi = ac,
    AC = yn(
      Xl,
      class {
        get calendarId() {
          return Oi(this).calendarId;
        }
        toJSON() {
          return Oi(this).toJSON();
        }
        valueOf() {
          return Oi(this).valueOf();
        }
      },
      Oi,
      ym,
      pm,
    );
  function IC(e) {
    let t = Object.create(AC.prototype);
    return (oc(t, e), vn(t), t);
  }
  function rS(e, t, n, a, o, r, i, s, l, c) {
    return IC(new Nt.PlainDateTime(e, t, n, a, o, r, i, s, l, $C(c)));
  }
  function iS(e, t, n) {
    return sS(Oi(e).toZonedDateTime(t, n));
  }
  var oa = tc,
    HC = yn(
      Ql,
      class {
        get calendarId() {
          return oa(this).calendarId;
        }
        get timeZoneId() {
          return oa(this).timeZoneId;
        }
        get epochMilliseconds() {
          return oa(this).epochMilliseconds;
        }
        get epochNanoseconds() {
          return oa(this).epochNanoseconds;
        }
        toJSON() {
          return oa(this).toJSON();
        }
        valueOf() {
          return oa(this).valueOf();
        }
      },
      oa,
      ym,
      pm,
    );
  function sS(e) {
    let t = Object.create(HC.prototype);
    return (nc(t, e), vn(t), t);
  }
  function lS(e) {
    return oa(e).offsetNanoseconds;
  }
  var Ci = Jl,
    UC = yn(
      Kl,
      class {
        get epochMilliseconds() {
          return Ci(this).epochMilliseconds;
        }
        get epochNanoseconds() {
          return Ci(this).epochNanoseconds;
        }
        toJSON() {
          return Ci(this).toJSON();
        }
        valueOf() {
          return Ci(this).valueOf();
        }
      },
    );
  function YC(e) {
    let t = Object.create(UC.prototype);
    return (ec(t, e), vn(t), t);
  }
  function cS(e) {
    return YC(Nt.Instant.fromEpochMilliseconds(e));
  }
  function uS(e, t) {
    return sS(Ci(e).toZonedDateTimeISO(t));
  }
  function kC(e) {
    return e === void 0 ? Ia : BC(e);
  }
  function BC(e) {
    return rc(e)();
  }
  var ic = ac,
    _C = yn(
      Xl,
      class {
        get calendarId() {
          return pi(ic(this).calendar);
        }
        toJSON() {
          return I0(ic(this));
        }
        valueOf() {
          return jl();
        }
      },
      ic,
      Gl,
      Si,
    );
  function zC(e) {
    let t = Object.create(_C.prototype);
    return (oc(t, e), vn(t), t);
  }
  function fS(e, t, n, a = 0, o = 0, r = 0, i = 0, s = 0, l = 0, c) {
    let u = S0(
        f0(
          gi(Aa, {
            year: e,
            month: t,
            day: n,
            hour: a,
            minute: o,
            second: r,
            millisecond: i,
            microsecond: s,
            nanosecond: l,
          }),
        ),
      ),
      d = kC(c);
    return zC(E0(u, d));
  }
  function dS(e, t, n) {
    return Tm(_0(ic(e), gm(hm(t)), n));
  }
  var ra = tc,
    LC = yn(
      Ql,
      class {
        get calendarId() {
          return pi(ra(this).calendar);
        }
        get timeZoneId() {
          return ra(this).timeZone.id;
        }
        get epochMilliseconds() {
          return cm(ra(this));
        }
        get epochNanoseconds() {
          return um(ra(this));
        }
        toJSON() {
          return A0(ra(this));
        }
        valueOf() {
          return jl();
        }
      },
      ZC,
      Gl,
      Si,
    );
  function Tm(e) {
    let t = Object.create(LC.prototype);
    return (nc(t, e), vn(t), t);
  }
  function ZC(e) {
    let t = ra(e);
    return { ...ql(t), calendar: t.calendar };
  }
  function mS(e) {
    return ql(ra(e)).offsetNanoseconds;
  }
  var WC = Ni(
      (e) => ({
        hour: e.hour,
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
      }),
      Bl - 1,
    ),
    FC = Ni(
      (e) => ({
        hour: e.hour,
        minute: e.minute,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
      }),
      vi - 1,
    ),
    PC = Ni(
      (e) => ({
        hour: e.hour,
        minute: e.minute,
        second: e.second,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
      }),
      Ha - 1,
    ),
    qC = Ni(
      (e) => ({
        hour: e.hour,
        minute: e.minute,
        second: e.second,
        millisecond: e.millisecond,
        microsecond: 0,
        nanosecond: 0,
      }),
      Vo - 1,
    ),
    VC = Ni(
      (e) => ({
        hour: e.hour,
        minute: e.minute,
        second: e.second,
        millisecond: e.millisecond,
        microsecond: e.microsecond,
        nanosecond: 0,
      }),
      yi - 1,
    );
  function Ni(e, t = 0) {
    return (n) => {
      let a = ra(n),
        { timeZone: o } = a,
        r = ql(a),
        i = p0(r, e(r)),
        s = w0(o, i, r.offsetNanoseconds, 2, 0, 1) + BigInt(t);
      return Tm({ ...a, epochNanoseconds: jo(s) });
    };
  }
  var sc = Jl,
    jC = yn(
      Kl,
      class {
        get epochMilliseconds() {
          return cm(sc(this));
        }
        get epochNanoseconds() {
          return um(sc(this));
        }
        toJSON() {
          return x0(sc(this));
        }
        valueOf() {
          return jl();
        }
      },
    );
  function GC(e) {
    let t = Object.create(jC.prototype);
    return (ec(t, e), vn(t), t);
  }
  function hS(e) {
    return GC(z0(e));
  }
  function gS(e, t) {
    return Tm(B0(sc(e), gm(hm(t))));
  }
  var pS = Nt ? lS : mS;
  var Dm = Nt ? rS : fS;
  var Mm = Nt ? iS : dS;
  var yS = Nt ? cS : hS;
  var vS = Nt ? uS : gS;
  function Rm(e, t) {
    let n = Xo(e);
    return ((n[2] += t * 7), Mt(n));
  }
  function ne(e, t) {
    let n = Xo(e);
    return ((n[2] += t), Mt(n));
  }
  function bn(e, t) {
    let n = Xo(e);
    return ((n[6] += t), Mt(n));
  }
  function DS(e, t) {
    return ia(e, t) / 7;
  }
  function ia(e, t) {
    return (t.valueOf() - e.valueOf()) / (1e3 * 60 * 60 * 24);
  }
  function JC(e, t) {
    return (t.valueOf() - e.valueOf()) / (1e3 * 60 * 60);
  }
  function e2(e, t) {
    return (t.valueOf() - e.valueOf()) / (1e3 * 60);
  }
  function t2(e, t) {
    return (t.valueOf() - e.valueOf()) / 1e3;
  }
  function MS(e, t) {
    let n = G(e),
      a = G(t);
    return {
      years: 0,
      months: 0,
      days: Math.round(ia(n, a)),
      milliseconds: t.valueOf() - a.valueOf() - (e.valueOf() - n.valueOf()),
    };
  }
  function $m(e, t) {
    let n = Ua(e, t);
    return n !== null && n % 7 === 0 ? n / 7 : null;
  }
  function Ua(e, t) {
    return Go(e) === Go(t) ? Math.round(ia(e, t)) : null;
  }
  function G(e) {
    return Mt([e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()]);
  }
  function n2(e) {
    return Mt([
      e.getUTCFullYear(),
      e.getUTCMonth(),
      e.getUTCDate(),
      e.getUTCHours(),
    ]);
  }
  function a2(e) {
    return Mt([
      e.getUTCFullYear(),
      e.getUTCMonth(),
      e.getUTCDate(),
      e.getUTCHours(),
      e.getUTCMinutes(),
    ]);
  }
  function o2(e) {
    return Mt([
      e.getUTCFullYear(),
      e.getUTCMonth(),
      e.getUTCDate(),
      e.getUTCHours(),
      e.getUTCMinutes(),
      e.getUTCSeconds(),
    ]);
  }
  function r2(e, t, n) {
    let a = e.getUTCFullYear(),
      o = Em(e, a, t, n);
    if (o < 1) return Em(e, a - 1, t, n);
    let r = Em(e, a + 1, t, n);
    return r >= 1 ? Math.min(o, r) : o;
  }
  function Em(e, t, n, a) {
    let o = Mt([t, 0, 1 + i2(t, n, a)]),
      r = G(e),
      i = Math.round(ia(o, r));
    return Math.floor(i / 7) + 1;
  }
  function i2(e, t, n) {
    let a = 7 + t - n;
    return -((7 + Mt([e, 0, a]).getUTCDay() - t) % 7) + a - 1;
  }
  function s2(e) {
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
  function bS(e) {
    return new Date(
      e[0],
      e[1] || 0,
      e[2] == null ? 1 : e[2],
      e[3] || 0,
      e[4] || 0,
      e[5] || 0,
    );
  }
  function Xo(e) {
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
  function Mt(e) {
    return (e.length === 1 && (e = e.concat([0])), new Date(Date.UTC(...e)));
  }
  function ES(e) {
    return !isNaN(e.valueOf());
  }
  function Go(e) {
    return (
      e.getUTCHours() * 1e3 * 60 * 60 +
      e.getUTCMinutes() * 1e3 * 60 +
      e.getUTCSeconds() * 1e3 +
      e.getUTCMilliseconds()
    );
  }
  var OS = {};
  function l2(e, t) {
    OS[e] = t;
  }
  function c2(e) {
    return new OS[e]();
  }
  var Nm = class {
    getMarkerYear(t) {
      return t.getUTCFullYear();
    }
    getMarkerMonth(t) {
      return t.getUTCMonth();
    }
    getMarkerDay(t) {
      return t.getUTCDate();
    }
    arrayToMarker(t) {
      return Mt(t);
    }
    markerToArray(t) {
      return Xo(t);
    }
  };
  l2('gregory', Nm);
  function CS(e, t) {
    let n = null,
      a = null;
    return (
      e.start && (n = t.createMarker(e.start)),
      e.end && (a = t.createMarker(e.end)),
      (!n && !a) || (n && a && a < n) ? null : { start: n, end: a }
    );
  }
  function xm(e, t) {
    let n = [],
      { start: a } = t,
      o,
      r;
    for (e.sort(u2), o = 0; o < e.length; o += 1)
      ((r = e[o]),
        r.start > a && n.push({ start: a, end: r.start }),
        r.end > a && (a = r.end));
    return (a < t.end && n.push({ start: a, end: t.end }), n);
  }
  function u2(e, t) {
    return e.start.valueOf() - t.start.valueOf();
  }
  function Rt(e, t) {
    let { start: n, end: a } = e,
      o = null;
    return (
      t.start !== null &&
        (n === null
          ? (n = t.start)
          : (n = new Date(Math.max(n.valueOf(), t.start.valueOf())))),
      t.end != null &&
        (a === null
          ? (a = t.end)
          : (a = new Date(Math.min(a.valueOf(), t.end.valueOf())))),
      (n === null || a === null || n < a) && (o = { start: n, end: a }),
      o
    );
  }
  function NS(e, t) {
    return (
      (e.end === null || t.start === null || e.end > t.start) &&
      (e.start === null || t.end === null || e.start < t.end)
    );
  }
  function $t(e, t) {
    return (e.start === null || t >= e.start) && (e.end === null || t < e.end);
  }
  function wS(e, t) {
    return t.start != null && e < t.start
      ? t.start
      : t.end != null && e >= t.end
        ? new Date(t.end.valueOf() - 1)
        : e;
  }
  function SS(e, t) {
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
  function cc(e, t, n) {
    let a = SS(e, n.calendarSystem),
      o = t ? SS(t, n.calendarSystem) : null;
    return {
      date: a,
      start: a,
      end: o,
      timeZone: n.timeZone,
      localeCodes: n.locale.codes,
    };
  }
  function Om(e) {
    return e % 1 === 0;
  }
  function Cm(e, t) {
    let n = String(e);
    return '000'.substr(0, t - n.length) + n;
  }
  var f2 = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
  function W(e, t) {
    return typeof e == 'string'
      ? d2(e)
      : typeof e == 'object' && e
        ? TS(e)
        : typeof e == 'number'
          ? TS({ [t || 'milliseconds']: e })
          : null;
  }
  function d2(e) {
    let t = f2.exec(e);
    if (t) {
      let n = t[1] ? -1 : 1;
      return {
        years: 0,
        months: 0,
        days: n * (t[2] ? parseInt(t[2], 10) : 0),
        milliseconds:
          n *
          ((t[3] ? parseInt(t[3], 10) : 0) * 60 * 60 * 1e3 +
            (t[4] ? parseInt(t[4], 10) : 0) * 60 * 1e3 +
            (t[5] ? parseInt(t[5], 10) : 0) * 1e3 +
            (t[6] ? parseInt(t[6], 10) : 0)),
      };
    }
    return null;
  }
  function TS(e) {
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
  function RS(e, t) {
    return (
      e.years === t.years &&
      e.months === t.months &&
      e.days === t.days &&
      e.milliseconds === t.milliseconds
    );
  }
  function $S(e, t) {
    return {
      years: e.years - t.years,
      months: e.months - t.months,
      days: e.days - t.days,
      milliseconds: e.milliseconds - t.milliseconds,
    };
  }
  function m2(e) {
    return Ya(e) / 365;
  }
  function h2(e) {
    return Ya(e) / 30;
  }
  function Ya(e) {
    return ka(e) / 864e5;
  }
  function ka(e) {
    return (
      e.years * (365 * 864e5) +
      e.months * (30 * 864e5) +
      e.days * 864e5 +
      e.milliseconds
    );
  }
  function wi(e) {
    let t = e.milliseconds;
    if (t) {
      if (t % 1e3 !== 0) return { unit: 'millisecond', value: t };
      if (t % (1e3 * 60) !== 0) return { unit: 'second', value: t / 1e3 };
      if (t % (1e3 * 60 * 60) !== 0)
        return { unit: 'minute', value: t / (1e3 * 60) };
      if (t) return { unit: 'hour', value: t / (1e3 * 60 * 60) };
    }
    return e.days
      ? e.specifiedWeeks && e.days % 7 === 0
        ? { unit: 'week', value: e.days / 7 }
        : { unit: 'day', value: e.days }
      : e.months
        ? { unit: 'month', value: e.months }
        : e.years
          ? { unit: 'year', value: e.years }
          : { unit: 'millisecond', value: 0 };
  }
  function xS(e, t, n = !1) {
    let a = e.toISOString();
    return (
      (a = a.replace('.000', '')),
      n && (a = a.replace('T00:00:00Z', '')),
      a.length > 10 &&
        (t == null
          ? (a = a.replace('Z', ''))
          : t !== 0 && (a = a.replace('Z', hc(t, !0)))),
      a
    );
  }
  function Ba(e) {
    return e.toISOString().replace(/T.*$/, '');
  }
  function hc(e, t = !1) {
    let n = e < 0 ? '-' : '+',
      a = Math.abs(e),
      o = Math.floor(a / 60),
      r = Math.round(a % 60);
    return t
      ? `${n + Cm(o, 2)}:${Cm(r, 2)}`
      : `GMT${n}${o}${r ? `:${Cm(r, 2)}` : ''}`;
  }
  function ve(e) {
    let t = '';
    for (let n of e) t += n.value;
    return t;
  }
  var g2 =
    /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
  function p2(e) {
    let t = g2.exec(e);
    if (t) {
      let n = new Date(
        Date.UTC(
          Number(t[1]),
          t[3] ? Number(t[3]) - 1 : 0,
          Number(t[5] || 1),
          Number(t[7] || 0),
          Number(t[8] || 0),
          Number(t[10] || 0),
          t[12] ? +`0.${t[12]}` * 1e3 : 0,
        ),
      );
      if (ES(n)) {
        let a = null;
        return (
          t[13] &&
            (a =
              (t[15] === '-' ? -1 : 1) *
              (Number(t[16] || 0) * 60 + Number(t[18] || 0))),
          { marker: n, isTimeUnspecified: !t[6], timeZoneOffset: a }
        );
      }
    }
    return null;
  }
  var uc = class {
      constructor(t) {
        ((this.timeZone = t.timeZone),
          (this.calendarSystem = c2(t.calendarSystem)),
          (this.locale = t.locale),
          (this.weekDow = t.locale.week.dow),
          (this.weekDoy = t.locale.week.doy),
          t.weekNumberCalculation === 'ISO' &&
            ((this.weekDow = 1), (this.weekDoy = 4)),
          typeof t.firstDay == 'number' && (this.weekDow = t.firstDay),
          typeof t.weekNumberCalculation == 'function' &&
            (this.weekNumberFunc = t.weekNumberCalculation),
          (this.weekTextLong = t.weekTextLong),
          (this.weekTextShort = t.weekTextShort ?? t.weekTextLong),
          (this.cmdFormatter = t.cmdFormatter));
      }
      createMarker(t) {
        let n = this.createMarkerMeta(t);
        return n === null ? null : n.marker;
      }
      createNowMarker() {
        return this.timestampToMarker(new Date().valueOf());
      }
      createMarkerMeta(t) {
        if (typeof t == 'string') return this.parse(t);
        let n = null;
        return (
          typeof t == 'number'
            ? (n = this.timestampToMarker(t))
            : t instanceof Date
              ? ((t = t.valueOf()), isNaN(t) || (n = this.timestampToMarker(t)))
              : Array.isArray(t) && (n = Mt(t)),
          n === null || !ES(n) ? null : { marker: n, isTimeUnspecified: !1 }
        );
      }
      parse(t) {
        let n = p2(t);
        if (n === null) return null;
        let { marker: a } = n;
        return (
          n.timeZoneOffset !== null &&
            (a = this.timestampToMarker(
              a.valueOf() - n.timeZoneOffset * 60 * 1e3,
            )),
          { marker: a, isTimeUnspecified: n.isTimeUnspecified }
        );
      }
      getYear(t) {
        return this.calendarSystem.getMarkerYear(t);
      }
      getMonth(t) {
        return this.calendarSystem.getMarkerMonth(t);
      }
      getDay(t) {
        return this.calendarSystem.getMarkerDay(t);
      }
      add(t, n) {
        let a = this.calendarSystem.markerToArray(t);
        return (
          (a[0] += n.years),
          (a[1] += n.months),
          (a[2] += n.days),
          (a[6] += n.milliseconds),
          this.calendarSystem.arrayToMarker(a)
        );
      }
      subtract(t, n) {
        let a = this.calendarSystem.markerToArray(t);
        return (
          (a[0] -= n.years),
          (a[1] -= n.months),
          (a[2] -= n.days),
          (a[6] -= n.milliseconds),
          this.calendarSystem.arrayToMarker(a)
        );
      }
      addYears(t, n) {
        let a = this.calendarSystem.markerToArray(t);
        return ((a[0] += n), this.calendarSystem.arrayToMarker(a));
      }
      addMonths(t, n) {
        let a = this.calendarSystem.markerToArray(t);
        return ((a[1] += n), this.calendarSystem.arrayToMarker(a));
      }
      diffWholeYears(t, n) {
        let { calendarSystem: a } = this;
        return Go(t) === Go(n) &&
          a.getMarkerDay(t) === a.getMarkerDay(n) &&
          a.getMarkerMonth(t) === a.getMarkerMonth(n)
          ? a.getMarkerYear(n) - a.getMarkerYear(t)
          : null;
      }
      diffWholeMonths(t, n) {
        let { calendarSystem: a } = this;
        return Go(t) === Go(n) && a.getMarkerDay(t) === a.getMarkerDay(n)
          ? a.getMarkerMonth(n) -
              a.getMarkerMonth(t) +
              (a.getMarkerYear(n) - a.getMarkerYear(t)) * 12
          : null;
      }
      greatestWholeUnit(t, n) {
        let a = this.diffWholeYears(t, n);
        return a !== null
          ? { unit: 'year', value: a }
          : ((a = this.diffWholeMonths(t, n)),
            a !== null
              ? { unit: 'month', value: a }
              : ((a = $m(t, n)),
                a !== null
                  ? { unit: 'week', value: a }
                  : ((a = Ua(t, n)),
                    a !== null
                      ? { unit: 'day', value: a }
                      : ((a = JC(t, n)),
                        Om(a)
                          ? { unit: 'hour', value: a }
                          : ((a = e2(t, n)),
                            Om(a)
                              ? { unit: 'minute', value: a }
                              : ((a = t2(t, n)),
                                Om(a)
                                  ? { unit: 'second', value: a }
                                  : {
                                      unit: 'millisecond',
                                      value: n.valueOf() - t.valueOf(),
                                    }))))));
      }
      countDurationsBetween(t, n, a) {
        let o;
        return a.years && ((o = this.diffWholeYears(t, n)), o !== null)
          ? o / m2(a)
          : a.months && ((o = this.diffWholeMonths(t, n)), o !== null)
            ? o / h2(a)
            : a.days && ((o = Ua(t, n)), o !== null)
              ? o / Ya(a)
              : (n.valueOf() - t.valueOf()) / ka(a);
      }
      startOf(t, n) {
        return n === 'year'
          ? this.startOfYear(t)
          : n === 'month'
            ? this.startOfMonth(t)
            : n === 'week'
              ? this.startOfWeek(t)
              : n === 'day'
                ? G(t)
                : n === 'hour'
                  ? n2(t)
                  : n === 'minute'
                    ? a2(t)
                    : n === 'second'
                      ? o2(t)
                      : null;
      }
      startOfYear(t) {
        return this.calendarSystem.arrayToMarker([
          this.calendarSystem.getMarkerYear(t),
        ]);
      }
      startOfMonth(t) {
        return this.calendarSystem.arrayToMarker([
          this.calendarSystem.getMarkerYear(t),
          this.calendarSystem.getMarkerMonth(t),
        ]);
      }
      startOfWeek(t) {
        return this.calendarSystem.arrayToMarker([
          this.calendarSystem.getMarkerYear(t),
          this.calendarSystem.getMarkerMonth(t),
          t.getUTCDate() - ((t.getUTCDay() - this.weekDow + 7) % 7),
        ]);
      }
      computeWeekNumber(t) {
        return this.weekNumberFunc
          ? this.weekNumberFunc(this.toDate(t))
          : r2(t, this.weekDow, this.weekDoy);
      }
      formatToParts(t, n) {
        return n.formatToParts(
          { marker: t, timeZoneOffset: this.offsetForMarker(t) },
          this,
        );
      }
      formatRangeToParts(t, n, a, o = {}) {
        return (
          o.isEndExclusive && (n = bn(n, -1)),
          a.formatRangeToParts(
            { marker: t, timeZoneOffset: this.offsetForMarker(t) },
            { marker: n, timeZoneOffset: this.offsetForMarker(n) },
            this,
          )
        );
      }
      formatIso(t, n = {}) {
        let a = null;
        return (
          n.omitTimeZoneOffset || (a = this.offsetForMarker(t)),
          xS(t, a, n.omitTime)
        );
      }
      timestampToMarker(t) {
        if (this.timeZone === 'local') return Mt(s2(new Date(t)));
        if (this.timeZone === 'UTC') return new Date(t);
        let n = vS(yS(t), this.timeZone);
        return new Date(
          Date.UTC(
            n.year,
            n.month - 1,
            n.day,
            n.hour,
            n.minute,
            n.second,
            n.millisecond,
          ),
        );
      }
      offsetForMarker(t) {
        return this.timeZone === 'local'
          ? -bS(Xo(t)).getTimezoneOffset()
          : this.timeZone === 'UTC'
            ? 0
            : pS(
                Mm(
                  Dm(
                    t.getUTCFullYear(),
                    t.getUTCMonth() + 1,
                    t.getUTCDate(),
                    t.getUTCHours(),
                    t.getUTCMinutes(),
                    t.getUTCSeconds(),
                    t.getUTCMilliseconds(),
                  ),
                  this.timeZone,
                ),
              ) /
              (1e9 * 60);
      }
      toDate(t) {
        return this.timeZone === 'local'
          ? bS(Xo(t))
          : this.timeZone === 'UTC'
            ? new Date(t.valueOf())
            : new Date(
                Mm(
                  Dm(
                    t.getUTCFullYear(),
                    t.getUTCMonth() + 1,
                    t.getUTCDate(),
                    t.getUTCHours(),
                    t.getUTCMinutes(),
                    t.getUTCSeconds(),
                    t.getUTCMilliseconds(),
                  ),
                  this.timeZone,
                ).epochMilliseconds,
              );
      }
    },
    y2 = new Set([
      'week',
      'meridiem',
      'omitZeroMinute',
      'omitCommas',
      'forceCommas',
      'omitTrailing',
      'weekdayJustify',
    ]),
    lc = /([ap])\.?m\.?/i,
    v2 = /,/g,
    b2 = /\u200e/g,
    S2 = /[\s.,]+$/,
    wm = /^\s+$/,
    fc = class {
      constructor(t) {
        let n = {},
          a = {};
        for (let o in t) y2.has(o) ? (a[o] = t[o]) : (n[o] = t[o]);
        (n.timeZoneName === 'long' && (n.timeZoneName = 'short'),
          (this.timeZoneOnly =
            Object.keys(n).length === 1 && n.timeZoneName === 'short'),
          (this.weekOnly = !!(!Object.keys(n).length && a.week)),
          this.timeZoneOnly ||
            (n.timeZoneName &&
              (n.hour || (n.hour = '2-digit'),
              n.minute || (n.minute = '2-digit')),
            a.omitZeroMinute &&
              (n.second || n.fractionalSecondDigits) &&
              delete a.omitZeroMinute,
            (n.timeZone = 'UTC')),
          (this.standardOptions = n),
          (this.extendedOptions = a));
      }
      formatToParts(t, n) {
        let { standardOptions: a, extendedOptions: o } = this;
        if (this.timeZoneOnly)
          return [{ type: 'timeZoneName', value: hc(t.timeZoneOffset) }];
        if (this.weekOnly)
          return M2(
            n.computeWeekNumber(t.marker),
            n.weekTextLong,
            n.weekTextShort,
            n.locale,
            o.week,
          );
        let { normalFormat: r, zeroFormat: i } = this.getFormats(n),
          l = (i && !t.marker.getUTCMinutes() ? i : r).formatToParts(t.marker);
        return T2(l, t, a, o);
      }
      formatRangeToParts(t, n, a) {
        let { standardOptions: o, extendedOptions: r } = this;
        if (this.timeZoneOnly || this.weekOnly)
          return this.formatToParts(t, a).map((u) => ({
            source: u.type === 'literal' ? 'shared' : 'startRange',
            ...u,
          }));
        let { normalFormat: i, zeroFormat: s } = this.getFormats(a),
          c = (
            s && !t.marker.getUTCMinutes() && !n.marker.getUTCMinutes() ? s : i
          ).formatRangeToParts(t.marker, n.marker);
        return D2(c, t, n, o, r);
      }
      getFormats(t) {
        if (this.cachedContext !== t) {
          let { standardOptions: n, extendedOptions: a } = this,
            { codes: o } = t.locale,
            r = new Intl.DateTimeFormat(o, n),
            i;
          if (a.omitZeroMinute) {
            let s = { ...n };
            (delete s.minute, (i = new Intl.DateTimeFormat(o, s)));
          }
          ((this.cachedContext = t),
            (this.cachedFormats = { normalFormat: r, zeroFormat: i }));
        }
        return this.cachedFormats;
      }
    };
  function AS(e, t, n) {
    let a = !1,
      o;
    for (let r of e) {
      let i = r.type === 'literal';
      if (i || r.type === 'dayPeriod') {
        let s = r.value;
        if (
          ((s = s.replace(b2, '')), t.omitCommas && (s = s.replace(v2, '')), !i)
        ) {
          let { meridiem: l } = t;
          (l === !1
            ? (s = s.replace(lc, ''))
            : l === 'narrow'
              ? (s = s.replace(lc, (c, u) => u.toLocaleLowerCase()))
              : l === 'short'
                ? (s = s.replace(lc, (c, u) => `${u.toLocaleLowerCase()}m`))
                : l === 'lowercase' &&
                  (s = s.replace(lc, (c) => c.toLocaleLowerCase())),
            o && (o.value = o.value.trimEnd()));
        }
        r.value = s;
      } else if (r.type === 'timeZoneName') {
        let s = n(r);
        s != null && ((r.value = s), (a = !0));
      }
      o = i ? r : void 0;
    }
    return { lastLiteral: o, anyTzInjected: a };
  }
  function T2(e, t, n, a) {
    let o =
        n.timeZoneName === 'short'
          ? t.timeZoneOffset == null
            ? 'UTC'
            : hc(t.timeZoneOffset)
          : void 0,
      { lastLiteral: r, anyTzInjected: i } = AS(e, a, () => o);
    if (
      (o &&
        !i &&
        (r ? (r.value += ' ') : e.push({ type: 'literal', value: ' ' }),
        e.push({ type: 'timeZoneName', value: o })),
      a.weekdayJustify &&
        e.length === 3 &&
        wm.test(e[1].value) &&
        e[a.weekdayJustify === 'start' ? 2 : 0].type === 'weekday' &&
        e.reverse(),
      a.forceCommas)
    )
      for (let s of e)
        s.type === 'literal' && wm.test(s.value) && (s.value = `,${s.value}`);
    return (a.omitTrailing && IS(e), e.filter((s) => s.value));
  }
  function D2(e, t, n, a, o) {
    let r = a.timeZoneName === 'short';
    if (
      (AS(e, o, (i) => {
        if (!r) return;
        let s = i.source === 'endRange' ? n.timeZoneOffset : t.timeZoneOffset;
        return s == null ? 'UTC' : hc(s);
      }),
      o.forceCommas)
    )
      for (let i of e)
        i.type === 'literal' && wm.test(i.value) && (i.value = `,${i.value}`);
    return (o.omitTrailing && IS(e), e.filter((i) => i.value));
  }
  function IS(e) {
    let t = e[e.length - 1];
    t?.type === 'literal' &&
      ((t.value = t.value.replace(S2, '')), t.value || e.pop());
  }
  function M2(e, t, n, a, o) {
    let r = [];
    return (
      o === 'long'
        ? r.push({ type: 'literal', value: t })
        : (o === 'short' || o === 'narrow') &&
          r.push({ type: 'literal', value: n }),
      (o === 'long' || o === 'short') &&
        r.push({ type: 'literal', value: ' ' }),
      r.push({ type: 'week', value: a.simpleNumberFormat.format(e) }),
      a.options.direction === 'rtl' && r.reverse(),
      r
    );
  }
  var dc = class {
      constructor(t) {
        this.cmdStr = t;
      }
      formatToParts(t, n) {
        let a = n.cmdFormatter(this.cmdStr, cc(t, null, n));
        return Array.isArray(a) ? a : [{ type: 'literal', value: a }];
      }
      formatRangeToParts(t, n, a) {
        let o = a.cmdFormatter(this.cmdStr, cc(t, n, a));
        return Array.isArray(o)
          ? o.map((r) => ({ source: 'shared', ...r }))
          : [{ source: 'shared', type: 'literal', value: o }];
      }
    },
    mc = class {
      constructor(t) {
        this.func = t;
      }
      formatToParts(t, n) {
        return [{ type: 'literal', value: this.func(cc(t, null, n)) }];
      }
      formatRangeToParts(t, n, a) {
        return [
          { source: 'shared', type: 'literal', value: this.func(cc(t, n, a)) },
        ];
      }
    };
  var S = {
    popoverZ: 'fc-nH',
    isolate: 'fc-7s',
    borderBoxRoot: 'fc-wa',
    notAllowed: 'fc-4m',
    noScrollbars: 'fc-eM',
    noShrink: 'fc-Qo',
    calendarScreenRoot: 'fc-fi',
    safeTiles: 'fc-fl',
    calendarPrintRoot: 'fc-Jf',
    cursorPointer: 'fc-DP',
    cursorResizeT: 'fc-An',
    cursorResizeB: 'fc-lZ',
    cursorResizeS: 'fc-9V',
    cursorResizeE: 'fc-70',
    cursorColResizer: 'fc-gQ',
    hit: 'fc-mN',
    hitX: 'fc-2d',
    hitY: 'fc-B0',
    hitXSkinny: 'fc-Z1',
    selectNone: 'fc-1Y',
    invisible: 'fc-a9',
    borderNone: 'fc-Tu',
    borderOnlyT: 'fc-hU',
    borderOnlyB: 'fc-3e',
    borderOnlyS: 'fc-PB',
    borderOnlyE: 'fc-II',
    borderlessX: 'fc-MQ',
    borderlessY: 'fc-Vo',
    fakeBorderS: 'fc-2l',
    flexRow: 'fc-Ao',
    flexCol: 'fc-HH',
    grow: 'fc-GV',
    liquid: 'fc-g2',
    minHeight0: 'fc-Ot',
    liquidX: 'fc-hp',
    printRoot: 'fc-uD',
    printHeader: 'fc-jM',
    noPadding: 'fc-OJ',
    noMargin: 'fc-oE',
    noMarginY: 'fc-V3',
    noMarginX: 'fc-SS',
    whiteSpaceNoWrap: 'fc-y2',
    whiteSpacePre: 'fc-CN',
    overflowAnchorNone: 'fc-gZ',
    crop: 'fc-FA',
    cropNowrap: 'fc-7T',
    rel: 'fc-cc',
    abs: 'fc-H0',
    start0: 'fc-6t',
    fill: 'fc-ct',
    fillTop: 'fc-iv',
    fillX: 'fc-Uu',
    fillY: 'fc-7k',
    fillStart: 'fc-Yw',
    sticky: 'fc-Ip',
    stickyT: 'fc-CS',
    stickyS: 'fc-tT',
    tableHeaderSticky: 'fc-hy',
    contentBox: 'fc-Np',
    offscreen: 'fc-aP',
    alignCenter: 'fc-6H',
    alignStart: 'fc-K8',
    alignEnd: 'fc-E3',
    footerScrollbarSticky: 'fc-Px',
    footerScrollbar: 'fc-J4',
    breakInsideAvoid: 'fc-Yi',
    printSiblingRow: 'fc-fx',
    z0: 'fc-BS',
    z1: 'fc-iu',
    focusZ2: 'fc-Bk',
    internalTimelineSlot: 'fc-Nm',
    internalEvent: 'fc-Ft',
    internalEventMirror: 'fc-lc',
    internalEventDraggable: 'fc-uL',
    internalEventSelected: 'fc-Bv',
    internalEventResizable: 'fc-Qk',
    internalEventResizer: 'fc-9X',
    internalEventResizerStart: 'fc-Sj',
    internalEventResizerEnd: 'fc-DL',
    internalBgEvent: 'fc-oP',
    internalMoreLink: 'fc-R2',
    internalNavLink: 'fc-SW',
    internalPopover: 'fc-Cs',
    internalView: 'fc-LQ',
    internalScroller: 'fc-dT',
  };
  function D(...e) {
    return e.filter(Boolean).join(' ');
  }
  function Am(e) {
    return e * 100 + '%';
  }
  function ee(e) {
    return typeof e == 'object' && e
      ? new fc(e)
      : typeof e == 'string'
        ? new dc(e)
        : typeof e == 'function'
          ? new mc(e)
          : null;
  }
  function xt(...e) {
    console.warn('FullCalendar:', ...e);
  }
  var HS = {};
  function be(e, t) {
    return !e || typeof e == 'string' ? e : (E2(t), '');
  }
  function N(e, t) {
    return typeof e == 'function' ? (n) => be(e(n), t) : be(e, t);
  }
  function E2(e) {
    HS[e] ||
      (xt(
        `Invalid option \`${e}\`: expected a className string or a falsy value.`,
      ),
      (HS[e] = !0));
  }
  function O2(e, t) {
    return (n) => {
      let a = n.target.closest(e);
      a && t.call(a, n, a);
    };
  }
  function Um(e, t, n, a) {
    let o = O2(n, a);
    return (
      e.addEventListener(t, o),
      () => {
        e.removeEventListener(t, o);
      }
    );
  }
  function BS(e, t, n, a) {
    let o;
    return Um(e, 'mouseover', t, (r, i) => {
      if (i !== o) {
        ((o = i), n(r, i));
        let s = (l) => {
          ((o = null), a(l, i), i.removeEventListener('mouseleave', s));
        };
        i.addEventListener('mouseleave', s);
      }
    });
  }
  function $i(e) {
    return { onClick: e, ..._S(e) };
  }
  function _S(e) {
    return {
      tabIndex: 0,
      onKeyDown(t) {
        (t.key === 'Enter' || t.key === ' ') && (e(t), t.preventDefault());
      },
    };
  }
  var US = 0;
  function Qe() {
    return ((US += 1), String(US));
  }
  function C2(e) {
    let t = [],
      n = [],
      a,
      o;
    for (
      typeof e == 'string'
        ? (n = e.split(/\s*,\s*/))
        : typeof e == 'function'
          ? (n = [e])
          : Array.isArray(e) && (n = e),
        a = 0;
      a < n.length;
      a += 1
    )
      ((o = n[a]),
        typeof o == 'string'
          ? t.push(
              o.charAt(0) === '-'
                ? { field: o.substring(1), order: -1 }
                : { field: o, order: 1 },
            )
          : typeof o == 'function' && t.push({ func: o }));
    return t;
  }
  function N2(e, t, n) {
    let a, o;
    for (a = 0; a < n.length; a += 1) if (((o = w2(e, t, n[a])), o)) return o;
    return 0;
  }
  function w2(e, t, n) {
    return n.func ? n.func(e, t) : R2(e[n.field], t[n.field]) * (n.order || 1);
  }
  function R2(e, t) {
    return !e && !t
      ? 0
      : t == null
        ? -1
        : e == null
          ? 1
          : typeof e == 'string' || typeof t == 'string'
            ? String(e).localeCompare(String(t))
            : e - t;
  }
  function We(e, t, n) {
    return typeof e == 'function'
      ? e(...t)
      : typeof e == 'string'
        ? t.reduce((a, o, r) => a.replace('$' + r, o || ''), e)
        : n;
  }
  function zS(e, t) {
    return e === t;
  }
  function Tn(e) {
    let t = e.borderless;
    return {
      borderlessX: !!(e.borderlessX ?? t),
      borderlessTop: !!(e.borderlessTop ?? t),
      borderlessBottom: !!(e.borderlessBottom ?? t),
    };
  }
  var { hasOwnProperty: Qo } = Object.prototype;
  function sa(e, t) {
    let n = {};
    for (let a in e) t(e[a], a) && (n[a] = e[a]);
    return n;
  }
  function za(e, t) {
    let n = {};
    for (let a in e) n[a] = t(e[a], a);
    return n;
  }
  function vc(e) {
    let t = [];
    for (let n in e) t.push(e[n]);
    return t;
  }
  function Ym(e) {
    let t = {};
    for (let n of e) t[n] = !0;
    return t;
  }
  function $2(e, t) {
    return typeof e == 'object' && e && typeof t == 'object' && t
      ? km(e, t, Ft)
      : e === t;
  }
  function km(e, t, n) {
    if (e === t) return !0;
    for (let a in e) if (Qo.call(e, a) && !(a in t)) return !1;
    for (let a in t)
      if (Qo.call(t, a) && (!(a in e) || !n(e[a], t[a], a))) return !1;
    return !0;
  }
  function Im(e, t) {
    return typeof e == 'object' && typeof t == 'object' && e && t
      ? Ft(e, t)
      : e === t;
  }
  function Ft(e, t) {
    return km(e, t, zS);
  }
  function Bm(e, t, n) {
    return km(e, t, (a, o, r) => {
      let i = n[r];
      return i ? i(a, o) : a === o;
    });
  }
  function LS(e, t) {
    let n = [];
    for (let a in e) Qo.call(e, a) && (a in t || n.push(a));
    for (let a in t) Qo.call(t, a) && e[a] !== t[a] && n.push(a);
    return n;
  }
  function ZS(e, t) {
    return e ? x2(e, t, A2) : t;
  }
  function x2(e, t, n) {
    let a = {};
    for (let o in e) Qo.call(e, o) && (o in t || (a[o] = e[o]));
    for (let o in t)
      Qo.call(t, o) && (o in e ? (a[o] = n(e[o], t[o])) : (a[o] = t[o]));
    return a;
  }
  function A2(e, t) {
    return Object.assign({}, e, t);
  }
  function gc(e, t) {
    return Array.isArray(e) && Array.isArray(t) ? La(e, t) : e === t;
  }
  function La(e, t, n = zS) {
    if (e === t) return !0;
    let a = e.length,
      o;
    if (a !== t.length) return !1;
    for (o = 0; o < a; o += 1) if (!n(e[o], t[o])) return !1;
    return !0;
  }
  var _m = {
      navLinkDayClick: T,
      navLinkWeekClick: T,
      duration: W,
      buttons: T,
      toolbarElements: T,
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
      listText: T,
      todayHint: T,
      prevHint: T,
      nextHint: T,
      buttonDisplay: T,
      buttonGroupClass: N,
      buttonClass: N,
      defaultAllDayEventDuration: W,
      defaultTimedEventDuration: W,
      nextDayThreshold: W,
      scrollTime: W,
      scrollTimeReset: Boolean,
      slotMinTime: W,
      slotMaxTime: W,
      popoverFormat: ee,
      slotDuration: W,
      snapDuration: W,
      headerToolbar: T,
      footerToolbar: T,
      forceEventDuration: Boolean,
      dayLaneClass: N,
      dayLaneInnerClass: N,
      dayLaneDidMount: T,
      dayLaneWillUnmount: T,
      initialView: String,
      aspectRatio: Number,
      weekends: Boolean,
      weekNumberCalculation: T,
      weekNumbers: Boolean,
      weekNumberHeaderClass: N,
      weekNumberHeaderInnerClass: N,
      weekNumberHeaderContent: T,
      weekNumberHeaderDidMount: T,
      weekNumberHeaderWillUnmount: T,
      inlineWeekNumberClass: N,
      inlineWeekNumberContent: T,
      inlineWeekNumberDidMount: T,
      inlineWeekNumberWillUnmount: T,
      editable: Boolean,
      controller: T,
      nowIndicator: Boolean,
      nowIndicatorSnap: T,
      nowIndicatorHeaderClass: N,
      nowIndicatorHeaderContent: T,
      nowIndicatorHeaderDidMount: T,
      nowIndicatorHeaderWillUnmount: T,
      nowIndicatorDotClass: be,
      nowIndicatorLineClass: N,
      nowIndicatorLineContent: T,
      nowIndicatorLineDidMount: T,
      nowIndicatorLineWillUnmount: T,
      showNonCurrentDates: Boolean,
      lazyFetching: Boolean,
      startParam: String,
      endParam: String,
      timeZoneParam: String,
      timeZone: String,
      locales: T,
      locale: T,
      dragRevertDuration: Number,
      dragScroll: Boolean,
      allDayMaintainDuration: Boolean,
      unselectAuto: Boolean,
      dropAccept: T,
      eventOrder: C2,
      eventOrderStrict: Boolean,
      eventSlicing: Boolean,
      eventPrintLayout: String,
      longPressDelay: Number,
      eventDragMinDistance: Number,
      expandRows: Boolean,
      height: T,
      contentHeight: T,
      direction: String,
      colorScheme: String,
      weekNumberFormat: ee,
      eventResizableFromStart: Boolean,
      displayEventTime: Boolean,
      displayEventEnd: Boolean,
      progressiveEventRendering: Boolean,
      businessHours: T,
      initialDate: T,
      now: T,
      eventDataTransform: T,
      tableHeaderSticky: T,
      footerScrollbarSticky: T,
      defaultAllDay: Boolean,
      eventSourceFailure: T,
      eventSourceSuccess: T,
      eventDisplay: String,
      eventStartEditable: Boolean,
      eventDurationEditable: Boolean,
      eventOverlap: T,
      eventConstraint: T,
      eventAllow: T,
      eventColor: String,
      eventContrastColor: String,
      eventDidMount: T,
      eventWillUnmount: T,
      eventContent: T,
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
      rowEventBeforeContent: T,
      rowEventAfterClass: N,
      rowEventAfterContent: T,
      columnEventClass: N,
      columnEventInnerClass: N,
      columnEventTimeClass: N,
      columnEventTitleClass: N,
      columnEventTitleSticky: Boolean,
      columnEventBeforeClass: N,
      columnEventAfterClass: N,
      backgroundEventClass: N,
      backgroundEventDidMount: T,
      backgroundEventWillUnmount: T,
      backgroundEventContent: T,
      backgroundEventInnerClass: N,
      backgroundEventTitleClass: N,
      backgroundEventColor: String,
      selectConstraint: T,
      selectOverlap: T,
      selectAllow: T,
      droppable: Boolean,
      unselectCancel: String,
      slotHeaderFormat: T,
      slotLaneClass: N,
      slotLaneDidMount: T,
      slotLaneWillUnmount: T,
      slotHeaderClass: N,
      slotHeaderInnerClass: N,
      slotHeaderContent: T,
      slotHeaderDidMount: T,
      slotHeaderWillUnmount: T,
      slotHeaderAlign: T,
      slotHeaderSticky: T,
      slotHeaderRowClass: be,
      slotHeaderDividerClass: N,
      dayMaxEvents: T,
      dayMaxEventRows: T,
      dayMinWidth: Number,
      slotHeaderInterval: W,
      dayHeaderClass: N,
      dayHeaderInnerClass: N,
      dayHeaderContent: T,
      dayHeaderDidMount: T,
      dayHeaderWillUnmount: T,
      dayHeaderAlign: T,
      _dayHeaderSticky: T,
      dayHeaderRowClass: be,
      dayHeaderDividerClass: N,
      dayRowClass: be,
      dayCellDidMount: T,
      dayCellWillUnmount: T,
      dayCellClass: N,
      dayCellInnerClass: N,
      dayCellTopContent: T,
      dayCellTopClass: N,
      dayCellTopInnerClass: N,
      dayCellBottomClass: N,
      allDaySlot: Boolean,
      allDayText: String,
      allDayHeaderClass: N,
      allDayHeaderInnerClass: N,
      allDayHeaderContent: T,
      allDayHeaderDidMount: T,
      allDayHeaderWillUnmount: T,
      timedText: String,
      slotMinWidth: Number,
      slotMinHeight: Number,
      navLinks: Boolean,
      eventTimeFormat: ee,
      rerenderDelay: Number,
      moreLinkText: T,
      moreLinkHint: T,
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
      dateIncrement: W,
      hiddenDays: T,
      fixedWeekCount: Boolean,
      validRange: T,
      visibleRange: T,
      titleFormat: T,
      eventInteractive: Boolean,
      noEventsText: String,
      viewHint: T,
      viewChangeHint: String,
      navLinkHint: T,
      closeHint: String,
      eventsHint: String,
      headingLevel: Number,
      moreLinkClick: T,
      moreLinkContent: T,
      moreLinkDidMount: T,
      moreLinkWillUnmount: T,
      moreLinkClass: N,
      moreLinkInnerClass: N,
      rowMoreLinkClass: N,
      rowMoreLinkInnerClass: N,
      columnMoreLinkClass: N,
      columnMoreLinkInnerClass: N,
      navLinkClass: be,
      monthStartFormat: ee,
      dayCellFormat: ee,
      handleCustomRendering: T,
      customRenderingMetaMap: T,
      popoverClass: be,
      popoverCloseClass: be,
      popoverCloseContent: T,
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
      toolbarTitleClass: be,
      tableClass: N,
      tableHeaderClass: N,
      tableBodyClass: N,
      nonBusinessHoursClass: be,
      highlightClass: be,
      dayHeaders: Boolean,
      dayHeaderFormat: ee,
      allDayDividerClass: be,
      listDaysClass: be,
      listDayClass: N,
      listDayFormat: YS,
      listDayAltFormat: YS,
      listDayHeaderDidMount: T,
      listDayHeaderWillUnmount: T,
      listDayHeaderClass: N,
      listDayHeaderInnerClass: N,
      listDayHeaderContent: T,
      listDayBodyClass: N,
      noEventsClass: N,
      noEventsInnerClass: N,
      noEventsContent: T,
      noEventsDidMount: T,
      noEventsWillUnmount: T,
      multiMonthMaxColumns: Number,
      singleMonthMinWidth: Number,
      singleMonthTitleFormat: ee,
      singleMonthDidMount: T,
      singleMonthWillUnmount: T,
      singleMonthClass: N,
      singleMonthHeaderClass: N,
      singleMonthHeaderInnerClass: N,
    },
    bc = {
      buttonDisplay: 'auto',
      eventDisplay: 'auto',
      defaultTimedEventDuration: '01:00:00',
      defaultAllDayEventDuration: { day: 1 },
      forceEventDuration: !1,
      nextDayThreshold: '00:00:00',
      initialView: '',
      aspectRatio: 1.35,
      weekends: !0,
      weekNumbers: !1,
      weekNumberCalculation: 'local',
      editable: !1,
      nowIndicator: !1,
      scrollTime: '06:00:00',
      scrollTimeReset: !0,
      slotMinTime: '00:00:00',
      slotMaxTime: '24:00:00',
      showNonCurrentDates: !0,
      lazyFetching: !0,
      startParam: 'start',
      endParam: 'end',
      timeZoneParam: 'timeZone',
      timeZone: 'local',
      locales: [],
      locale: '',
      dragRevertDuration: 500,
      dragScroll: !0,
      allDayMaintainDuration: !1,
      unselectAuto: !0,
      dropAccept: '*',
      eventOrder: 'start,-duration,allDay,title',
      eventPrintLayout: 'auto',
      popoverFormat: { month: 'long', day: 'numeric', year: 'numeric' },
      longPressDelay: 1e3,
      eventDragMinDistance: 5,
      expandRows: !1,
      navLinks: !1,
      selectable: !1,
      eventMinHeight: 15,
      eventMinWidth: 30,
      eventShortHeight: 30,
      monthStartFormat: { month: 'long', day: 'numeric' },
      dayCellFormat: { day: 'numeric', omitTrailing: !0 },
      headingLevel: 2,
      outerBorder: !0,
      dayNarrowWidth: 80,
      eventOverlap: !0,
      slotHeaderAlign: 'start',
      slotHeaderSticky: !0,
      dayHeaderAlign: 'start',
      _dayHeaderSticky: !0,
      rowEventTitleSticky: !0,
      columnEventTitleSticky: !0,
      nowIndicatorSnap: 'auto',
      dayHeaders: !0,
    },
    zm = {
      datesSet: T,
      eventsSet: T,
      eventAdd: T,
      eventChange: T,
      eventRemove: T,
      eventClick: T,
      eventMouseEnter: T,
      eventMouseLeave: T,
      select: T,
      unselect: T,
      loading: T,
      _unmount: T,
      _beforeprint: T,
      _afterprint: T,
      _noDateSelect: T,
      _noEventDrop: T,
      _noEventResize: T,
      _timeScrollRequest: T,
      dateClick: T,
      eventDragStart: T,
      eventDragStop: T,
      eventDrop: T,
      eventResizeStart: T,
      eventResizeStop: T,
      eventResize: T,
      drop: T,
      eventReceive: T,
      eventLeave: T,
    },
    Lm = {
      class: N,
      className: N,
      viewClass: N,
      viewDidMount: T,
      viewWillUnmount: T,
      views: T,
      plugins: T,
      initialEvents: T,
      events: T,
      eventSources: T,
    },
    WS = {
      type: String,
      component: T,
      class: N,
      className: N,
      content: T,
      didMount: T,
      willUnmount: T,
      buttonTextKey: String,
      dateProfileGeneratorClass: T,
      usesMinMaxTime: Boolean,
      disallowAmbigTitle: Boolean,
    },
    Za = {
      dateIncrement: Im,
      headerToolbar: Im,
      footerToolbar: Im,
      buttons: $2,
      plugins: gc,
      events: gc,
      eventSources: gc,
      resources: gc,
    };
  function Sc(e, t) {
    let n = {},
      a = {};
    for (let o in t) o in e && (n[o] = t[o](e[o], o));
    for (let o in e) o in t || (a[o] = e[o]);
    return { refined: n, extra: a };
  }
  function T(e) {
    return e;
  }
  function YS(e) {
    return e === !1 ? null : ee(e);
  }
  function FS(e) {
    let t = Math.floor(ia(e.start, e.end)) || 1,
      n = G(e.start),
      a = ne(n, t);
    return { start: n, end: a };
  }
  function Zm(e, t = W(0)) {
    let n = null,
      a = null;
    if (e.end) {
      a = G(e.end);
      let o = e.end.valueOf() - a.valueOf();
      o && o >= ka(t) && (a = ne(a, 1));
    }
    return (
      e.start && ((n = G(e.start)), a && a <= n && (a = ne(n, 1))),
      { start: n, end: a }
    );
  }
  function pc(e, t, n, a) {
    return a === 'year'
      ? W(n.diffWholeYears(e, t), 'year')
      : a === 'month'
        ? W(n.diffWholeMonths(e, t), 'month')
        : MS(e, t);
  }
  function Wm(e, t) {
    return { instanceId: Qe(), defId: e, range: t };
  }
  function I2(e, t, n, a) {
    for (let o = 0; o < a.length; o += 1) {
      let r = a[o].parse(e, n);
      if (r) {
        let { allDay: i } = e;
        return (
          i == null &&
            ((i = t),
            i == null && ((i = r.allDayGuess), i == null && (i = !1))),
          { allDay: i, duration: r.duration, typeData: r.typeData, typeId: o }
        );
      }
    }
    return null;
  }
  function Wa(e, t, n) {
    let { dateEnv: a, pluginHooks: o, options: r } = n,
      { defs: i, instances: s } = e;
    s = sa(s, (l) => !i[l.defId].recurringDef);
    for (let l in i) {
      let c = i[l];
      if (c.recurringDef) {
        let { duration: u } = c.recurringDef;
        u ||
          (u = c.allDay
            ? r.defaultAllDayEventDuration
            : r.defaultTimedEventDuration);
        let d = H2(c, u, t, a, o.recurringTypes);
        for (let f of d) {
          let m = Wm(l, { start: f, end: a.add(f, u) });
          s[m.instanceId] = m;
        }
      }
    }
    return { defs: i, instances: s };
  }
  function H2(e, t, n, a, o) {
    let i = o[e.recurringDef.typeId].expand(
      e.recurringDef.typeData,
      { start: a.subtract(n.start, t), end: n.end },
      a,
    );
    return (e.allDay && (i = i.map(G)), i);
  }
  function _a(e, t, n, a, o, r) {
    let i = Dn(),
      s = Pm(n);
    for (let l of e) {
      let c = Fm(l, t, n, a, s, o, r);
      c && Tc(c, i);
    }
    return i;
  }
  function Tc(e, t = Dn()) {
    return (
      (t.defs[e.def.defId] = e.def),
      e.instance && (t.instances[e.instance.instanceId] = e.instance),
      t
    );
  }
  function U2(e, t) {
    let n = e.instances[t];
    if (n) {
      let a = e.defs[n.defId],
        o = Mc(e, (r) => Y2(a, r));
      return ((o.defs[a.defId] = a), (o.instances[n.instanceId] = n), o);
    }
    return Dn();
  }
  function Y2(e, t) {
    return !!(e.groupId && e.groupId === t.groupId);
  }
  function Dn() {
    return { defs: {}, instances: {} };
  }
  function Dc(e, t) {
    return {
      defs: { ...e.defs, ...t.defs },
      instances: { ...e.instances, ...t.instances },
    };
  }
  function Mc(e, t) {
    let n = sa(e.defs, t),
      a = sa(e.instances, (o) => n[o.defId]);
    return { defs: n, instances: a };
  }
  function PS(e, t) {
    let { defs: n, instances: a } = e,
      o = {},
      r = {};
    for (let i in n) t.defs[i] || (o[i] = n[i]);
    for (let i in a) !t.instances[i] && o[a[i].defId] && (r[i] = a[i]);
    return { defs: o, instances: r };
  }
  function k2(e, t) {
    return Array.isArray(e)
      ? _a(e, null, t, !0)
      : typeof e == 'object' && e
        ? _a([e], null, t, !0)
        : e != null
          ? String(e)
          : null;
  }
  var Ri = {
      display: String,
      editable: Boolean,
      startEditable: Boolean,
      durationEditable: Boolean,
      constraint: T,
      overlap: T,
      allow: T,
      class: be,
      className: be,
      color: String,
      contrastColor: String,
    },
    B2 = {
      display: null,
      startEditable: null,
      durationEditable: null,
      constraints: [],
      overlap: null,
      allows: [],
      color: '',
      contrastColor: '',
      className: '',
    };
  function Ko(e, t) {
    let n = k2(e.constraint, t);
    return {
      display: e.display || null,
      startEditable: e.startEditable != null ? e.startEditable : e.editable,
      durationEditable:
        e.durationEditable != null ? e.durationEditable : e.editable,
      constraints: n != null ? [n] : [],
      overlap: e.overlap != null ? e.overlap : null,
      allows: e.allow != null ? [e.allow] : [],
      color: e.color || '',
      contrastColor: e.contrastColor || '',
      className: (e.class ?? e.className) || '',
    };
  }
  function _2(e) {
    return e.reduce(z2, B2);
  }
  function z2(e, t) {
    return {
      display: t.display != null ? t.display : e.display,
      startEditable:
        t.startEditable != null ? t.startEditable : e.startEditable,
      durationEditable:
        t.durationEditable != null ? t.durationEditable : e.durationEditable,
      constraints: e.constraints.concat(t.constraints),
      overlap: typeof t.overlap == 'boolean' ? t.overlap : e.overlap,
      allows: e.allows.concat(t.allows),
      color: t.color || e.color,
      contrastColor: t.contrastColor || e.contrastColor,
      className: D(e.className, t.className),
    };
  }
  var yc = {
      id: String,
      groupId: String,
      title: String,
      url: String,
      interactive: Boolean,
    },
    qS = { start: T, end: T, date: T, allDay: Boolean },
    L2 = { ...yc, ...qS, extendedProps: T };
  function Fm(e, t, n, a, o = Pm(n), r, i) {
    let { refined: s, extra: l } = VS(e, n, o),
      c = W2(t, n),
      u = I2(s, c, n.dateEnv, n.pluginHooks.recurringTypes);
    if (u) {
      let f = Hm(s, l, t ? t.sourceId : '', u.allDay, !!u.duration, n, r);
      return (
        (f.recurringDef = {
          typeId: u.typeId,
          typeData: u.typeData,
          duration: u.duration,
        }),
        { def: f, instance: null }
      );
    }
    let d = Z2(s, c, n, a);
    if (d) {
      let f = Hm(s, l, t ? t.sourceId : '', d.allDay, d.hasEnd, n, r),
        m = Wm(f.defId, d.range);
      return (
        i && f.publicId && i[f.publicId] && (m.instanceId = i[f.publicId]),
        { def: f, instance: m }
      );
    }
    return null;
  }
  function VS(e, t, n = Pm(t)) {
    return Sc(e, n);
  }
  function Pm(e) {
    return { ...Ri, ...L2, ...e.pluginHooks.eventRefiners };
  }
  function Hm(e, t, n, a, o, r, i) {
    let s = {
      title: e.title || '',
      groupId: e.groupId || '',
      publicId: e.id || '',
      url: e.url || '',
      recurringDef: null,
      defId: (i && e.id ? i[e.id] : '') || Qe(),
      sourceId: n,
      allDay: a,
      hasEnd: o,
      interactive: e.interactive,
      ui: Ko(e, r),
      extendedProps: { ...(e.extendedProps || {}), ...t },
    };
    for (let l of r.pluginHooks.eventDefMemberAdders) Object.assign(s, l(e));
    return (Object.freeze(s.ui.className), Object.freeze(s.extendedProps), s);
  }
  function Z2(e, t, n, a) {
    let { allDay: o } = e,
      r,
      i = null,
      s = !1,
      l,
      c = null,
      u = e.start != null ? e.start : e.date;
    if (((r = n.dateEnv.createMarkerMeta(u)), r)) i = r.marker;
    else if (!a) return null;
    return (
      e.end != null && (l = n.dateEnv.createMarkerMeta(e.end)),
      o == null &&
        (t != null
          ? (o = t)
          : (o = (!r || r.isTimeUnspecified) && (!l || l.isTimeUnspecified))),
      o && i && (i = G(i)),
      l && ((c = l.marker), o && (c = G(c)), i && c <= i && (c = null)),
      c
        ? (s = !0)
        : a ||
          ((s = n.options.forceEventDuration || !1),
          (c = n.dateEnv.add(
            i,
            o
              ? n.options.defaultAllDayEventDuration
              : n.options.defaultTimedEventDuration,
          ))),
      { allDay: o, hasEnd: s, range: { start: i, end: c } }
    );
  }
  function W2(e, t) {
    let n = null;
    return (
      e && (n = e.defaultAllDay),
      n == null && (n = t.options.defaultAllDay),
      n
    );
  }
  var F2 = { start: T, end: T, allDay: Boolean };
  function jS(e, t, n) {
    let a = P2(e, t),
      { range: o } = a;
    if (!o.start) return null;
    if (!o.end) {
      if (n == null) return null;
      o.end = t.add(o.start, n);
    }
    return a;
  }
  function P2(e, t) {
    let { refined: n, extra: a } = Sc(e, F2),
      o = n.start ? t.createMarkerMeta(n.start) : null,
      r = n.end ? t.createMarkerMeta(n.end) : null,
      { allDay: i } = n;
    return (
      i == null &&
        (i = o && o.isTimeUnspecified && (!r || r.isTimeUnspecified)),
      {
        range: { start: o ? o.marker : null, end: r ? r.marker : null },
        allDay: i,
        ...a,
      }
    );
  }
  function q2(e, t) {
    return { ...GS(e.range, t, e.allDay), allDay: e.allDay };
  }
  function qm(e, t, n) {
    return { ...GS(e, t, n), timeZone: t.timeZone };
  }
  function GS(e, t, n) {
    return {
      start: t.toDate(e.start),
      end: t.toDate(e.end),
      startStr: t.formatIso(e.start, { omitTime: n }),
      endStr: t.formatIso(e.end, { omitTime: n }),
    };
  }
  function XS(e, t, n) {
    let a = VS({ editable: !1 }, n),
      o = Hm(a.refined, a.extra, '', e.allDay, !0, n);
    return {
      def: o,
      ui: eT(o, t),
      instance: Wm(o.defId, e.range),
      range: e.range,
      isStart: !0,
      isEnd: !0,
    };
  }
  function QS(e, t, n) {
    n.emitter.trigger('select', {
      ...V2(e, n),
      jsEvent: t ? t.origEvent : null,
      view: n.viewApi || n.calendarApi.view,
    });
  }
  function KS(e, t) {
    t.emitter.trigger('unselect', {
      jsEvent: e ? e.origEvent : null,
      view: t.viewApi || t.calendarApi.view,
    });
  }
  function V2(e, t) {
    let n = {};
    for (let a of t.pluginHooks.dateSpanTransforms) Object.assign(n, a(e, t));
    return (Object.assign(n, q2(e, t.dateEnv)), n);
  }
  function kS(e, t, n) {
    let { dateEnv: a, options: o } = n,
      r = t;
    return (
      e
        ? ((r = G(r)), (r = a.add(r, o.defaultAllDayEventDuration)))
        : (r = a.add(r, o.defaultTimedEventDuration)),
      r
    );
  }
  function j2(e, t, n, a) {
    let o = JS(e.defs, t),
      r = Dn();
    for (let i in e.defs) {
      let s = e.defs[i];
      r.defs[i] = G2(s, o[i], n, a);
    }
    for (let i in e.instances) {
      let s = e.instances[i],
        l = r.defs[s.defId];
      r.instances[i] = X2(s, l, o[s.defId], n, a);
    }
    return r;
  }
  function G2(e, t, n, a) {
    let o = n.standardProps || {};
    o.hasEnd == null &&
      t.durationEditable &&
      (n.startDelta || n.endDelta) &&
      (o.hasEnd = !0);
    let r = { ...e, ...o, ui: { ...e.ui, ...o.ui } };
    n.extendedProps &&
      (r.extendedProps = { ...r.extendedProps, ...n.extendedProps });
    for (let i of a.pluginHooks.eventDefMutationAppliers) i(r, n, a);
    return (!r.hasEnd && a.options.forceEventDuration && (r.hasEnd = !0), r);
  }
  function X2(e, t, n, a, o) {
    let { dateEnv: r } = o,
      i = a.standardProps && a.standardProps.allDay === !0,
      s = a.standardProps && a.standardProps.hasEnd === !1,
      l = { ...e };
    return (
      i && (l.range = FS(l.range)),
      a.datesDelta &&
        n.startEditable &&
        (l.range = {
          start: r.add(l.range.start, a.datesDelta),
          end: r.add(l.range.end, a.datesDelta),
        }),
      a.startDelta &&
        n.durationEditable &&
        (l.range = {
          start: r.add(l.range.start, a.startDelta),
          end: l.range.end,
        }),
      a.endDelta &&
        n.durationEditable &&
        (l.range = {
          start: l.range.start,
          end: r.add(l.range.end, a.endDelta),
        }),
      s &&
        (l.range = {
          start: l.range.start,
          end: kS(t.allDay, l.range.start, o),
        }),
      t.allDay && (l.range = { start: G(l.range.start), end: G(l.range.end) }),
      l.range.end < l.range.start &&
        (l.range.end = kS(t.allDay, l.range.start, o)),
      l
    );
  }
  var Sn = class {
      constructor(t, n) {
        ((this.context = t), (this.internalEventSource = n));
      }
      remove() {
        this.context.dispatch({
          type: 'REMOVE_EVENT_SOURCE',
          sourceId: this.internalEventSource.sourceId,
        });
      }
      refetch() {
        this.context.dispatch({
          type: 'FETCH_EVENT_SOURCES',
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
    _e = class e {
      constructor(t, n, a) {
        ((this._context = t), (this._def = n), (this._instance = a || null));
      }
      setProp(t, n) {
        if (t in qS)
          xt(
            `Cannot set date-related event property \`${t}\`. Use a method instead.`,
          );
        else if (t === 'id')
          ((n = yc[t](n)), this.mutate({ standardProps: { publicId: n } }));
        else if (t in yc)
          ((n = yc[t](n)), this.mutate({ standardProps: { [t]: n } }));
        else if (t in Ri) {
          let a = Ri[t](n);
          (t === 'editable'
            ? (a = { startEditable: n, durationEditable: n })
            : (a = { [t]: n }),
            this.mutate({ standardProps: { ui: a } }));
        } else
          xt(
            `Cannot set event property \`${t}\`. Use setExtendedProp instead.`,
          );
      }
      setExtendedProp(t, n) {
        this.mutate({ extendedProps: { [t]: n } });
      }
      setStart(t, n = {}) {
        let { dateEnv: a } = this._context,
          o = a.createMarker(t);
        if (o && this._instance) {
          let r = this._instance.range,
            i = pc(r.start, o, a, n.granularity);
          n.maintainDuration
            ? this.mutate({ datesDelta: i })
            : this.mutate({ startDelta: i });
        }
      }
      setEnd(t, n = {}) {
        let { dateEnv: a } = this._context,
          o;
        if (!(t != null && ((o = a.createMarker(t)), !o)) && this._instance)
          if (o) {
            let r = pc(this._instance.range.end, o, a, n.granularity);
            this.mutate({ endDelta: r });
          } else this.mutate({ standardProps: { hasEnd: !1 } });
      }
      setDates(t, n, a = {}) {
        let { dateEnv: o } = this._context,
          r = { allDay: a.allDay },
          i = o.createMarker(t),
          s;
        if (
          i &&
          !(n != null && ((s = o.createMarker(n)), !s)) &&
          this._instance
        ) {
          let l = this._instance.range;
          a.allDay === !0 && (l = FS(l));
          let c = pc(l.start, i, o, a.granularity);
          if (s) {
            let u = pc(l.end, s, o, a.granularity);
            RS(c, u)
              ? this.mutate({ datesDelta: c, standardProps: r })
              : this.mutate({ startDelta: c, endDelta: u, standardProps: r });
          } else
            ((r.hasEnd = !1), this.mutate({ datesDelta: c, standardProps: r }));
        }
      }
      moveStart(t) {
        let n = W(t);
        n && this.mutate({ startDelta: n });
      }
      moveEnd(t) {
        let n = W(t);
        n && this.mutate({ endDelta: n });
      }
      moveDates(t) {
        let n = W(t);
        n && this.mutate({ datesDelta: n });
      }
      setAllDay(t, n = {}) {
        let a = { allDay: t },
          { maintainDuration: o } = n;
        (o == null && (o = this._context.options.allDayMaintainDuration),
          this._def.allDay !== t && (a.hasEnd = o),
          this.mutate({ standardProps: a }));
      }
      formatRange(t) {
        let { dateEnv: n } = this._context,
          a = this._instance,
          o = ee(t);
        return this._def.hasEnd
          ? ve(n.formatRangeToParts(a.range.start, a.range.end, o))
          : ve(n.formatToParts(a.range.start, o));
      }
      mutate(t) {
        let n = this._instance;
        if (n) {
          let a = this._def,
            o = this._context,
            { eventStore: r } = o.getCurrentData(),
            i = U2(r, n.instanceId);
          i = j2(
            i,
            {
              '': {
                display: '',
                startEditable: !0,
                durationEditable: !0,
                constraints: [],
                overlap: null,
                allows: [],
                color: '',
                contrastColor: '',
                className: '',
              },
            },
            t,
            o,
          );
          let l = new e(o, a, n);
          ((this._def = i.defs[a.defId]),
            (this._instance = i.instances[n.instanceId]),
            o.dispatch({ type: 'MERGE_EVENTS', eventStore: i }),
            o.emitter.trigger('eventChange', {
              oldEvent: l,
              event: this,
              relatedEvents: xi(i, o, n),
              revert() {
                o.dispatch({ type: 'RESET_EVENTS', eventStore: r });
              },
            }));
        }
      }
      remove() {
        let t = this._context,
          n = Vm(this);
        (t.dispatch({ type: 'REMOVE_EVENTS', eventStore: n }),
          t.emitter.trigger('eventRemove', {
            event: this,
            relatedEvents: [],
            revert() {
              t.dispatch({ type: 'MERGE_EVENTS', eventStore: n });
            },
          }));
      }
      get source() {
        let { sourceId: t } = this._def;
        return t
          ? new Sn(
              this._context,
              this._context.getCurrentData().eventSources[t],
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
        let t = this._instance;
        return t
          ? this._context.dateEnv.formatIso(t.range.start, {
              omitTime: this._def.allDay,
            })
          : '';
      }
      get endStr() {
        let t = this._instance;
        return t && this._def.hasEnd
          ? this._context.dateEnv.formatIso(t.range.end, {
              omitTime: this._def.allDay,
            })
          : '';
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
        return this._def.ui.display || 'auto';
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
      toPlainObject(t = {}) {
        let n = this._def,
          { ui: a } = n,
          { startStr: o, endStr: r } = this,
          i = { allDay: n.allDay };
        return (
          n.title && (i.title = n.title),
          o && (i.start = o),
          r && (i.end = r),
          n.publicId && (i.id = n.publicId),
          n.groupId && (i.groupId = n.groupId),
          n.url && (i.url = n.url),
          a.display && a.display !== 'auto' && (i.display = a.display),
          a.color && (i.color = a.color),
          a.contrastColor && (i.contrastColor = a.contrastColor),
          a.className && (i.className = a.className),
          Object.keys(n.extendedProps).length &&
            (t.collapseExtendedProps
              ? Object.assign(i, n.extendedProps)
              : (i.extendedProps = n.extendedProps)),
          i
        );
      }
      toJSON() {
        return this.toPlainObject();
      }
    };
  function Vm(e) {
    let t = e._def,
      n = e._instance;
    return {
      defs: { [t.defId]: t },
      instances: n ? { [n.instanceId]: n } : {},
    };
  }
  function xi(e, t, n) {
    let { defs: a, instances: o } = e,
      r = [],
      i = n ? n.instanceId : '';
    for (let s in o) {
      let l = o[s],
        c = a[l.defId];
      l.instanceId !== i && r.push(new _e(t, c, l));
    }
    return r;
  }
  function Ec(e) {
    return e.eventRange.instance.instanceId;
  }
  function Ai(e, t, n, a) {
    let o = {},
      r = {},
      i = {},
      s = [],
      l = [],
      c = JS(e.defs, t);
    for (let u in e.defs) {
      let d = e.defs[u];
      c[d.defId].display === 'inverse-background' &&
        (d.groupId
          ? ((o[d.groupId] = []), i[d.groupId] || (i[d.groupId] = d))
          : (r[u] = []));
    }
    for (let u in e.instances) {
      let d = e.instances[u],
        f = e.defs[d.defId],
        m = c[f.defId],
        v = d.range,
        p = !f.allDay && a ? Zm(v, a) : v,
        E = Rt(p, n);
      E &&
        (m.display === 'inverse-background'
          ? f.groupId
            ? o[f.groupId].push(E)
            : r[d.defId].push(E)
          : m.display !== 'none' &&
            (m.display === 'background' ? s : l).push({
              def: f,
              ui: m,
              instance: d,
              range: E,
              isStart: p.start && p.start.valueOf() === E.start.valueOf(),
              isEnd: p.end && p.end.valueOf() === E.end.valueOf(),
            }));
    }
    for (let u in o) {
      let d = o[u],
        f = xm(d, n);
      for (let m of f) {
        let v = i[u],
          p = c[v.defId];
        s.push({
          def: v,
          ui: p,
          instance: null,
          range: m,
          isStart: !1,
          isEnd: !1,
        });
      }
    }
    for (let u in r) {
      let d = r[u],
        f = xm(d, n);
      for (let m of f)
        s.push({
          def: e.defs[u],
          ui: c[u],
          instance: null,
          range: m,
          isStart: !1,
          isEnd: !1,
        });
    }
    return { bg: s, fg: l };
  }
  function Jo(e, t) {
    e.fcEventRange = t;
  }
  function Oc(e) {
    return e.fcEventRange || e.parentNode.fcEventRange || null;
  }
  function JS(e, t) {
    return za(e, (n) => eT(n, t));
  }
  function eT(e, t) {
    let n = [],
      a = t[''],
      o = t[e.defId];
    return (a && n.push(a), o && n.push(o), n.push(e.ui), _2(n));
  }
  function Cc(e, t) {
    let n = e.map(Q2);
    return (n.sort((a, o) => N2(a, o, t)), n.map((a) => a._seg));
  }
  function Q2(e) {
    let { eventRange: t } = e,
      n = t.def,
      a = t.instance ? t.instance.range : t.range,
      o = a.start ? a.start.valueOf() : 0,
      r = a.end ? a.end.valueOf() : 0;
    return {
      ...n.extendedProps,
      ...n,
      id: n.publicId,
      start: o,
      end: r,
      duration: r - o,
      allDay: Number(n.allDay),
      _seg: e,
    };
  }
  function tT(e, t) {
    let { pluginHooks: n } = t,
      a = n.isDraggableTransformers,
      { def: o, ui: r } = e,
      i = r.startEditable;
    for (let s of a) i = s(i, o, r, t);
    return i;
  }
  function nT(e, t, n, a, o, r, i, s = !0, l = !0) {
    let { dateEnv: c, options: u } = i,
      { def: d } = t,
      { displayEventTime: f, displayEventEnd: m } = u;
    (f == null && (f = s !== !1), m == null && (m = l !== !1));
    let v =
        !o && n && G(n).valueOf() !== G(t.instance.range.start).valueOf()
          ? n
          : t.instance.range.start,
      p =
        !r &&
        a &&
        G(bn(a, -1)).valueOf() !== G(bn(t.instance.range.end, -1)).valueOf()
          ? a
          : t.instance.range.end;
    if (f && !d.allDay) {
      if (m && (o || r) && d.hasEnd) {
        let E = c.formatRangeToParts(v, p, e),
          g = J2(E);
        return g != null
          ? ve(c.formatToParts(v, e)) + g + ve(c.formatToParts(p, e))
          : ve(E);
      }
      if (o) return ve(c.formatToParts(v, e));
    }
    return '';
  }
  var K2 = new Set(['year', 'month', 'day']);
  function J2(e) {
    let t,
      n = !1;
    for (let a of e)
      (a.source === 'shared' && (t = a), K2.has(a.type) && (n = !0));
    return n ? t.value : void 0;
  }
  function er(e, t, n) {
    let a = e.range;
    return {
      isPast: a.end <= (n || t.start),
      isFuture: a.start >= (n || t.end),
      isToday: t && $t(t, a.start),
    };
  }
  function aT(e, t) {
    let { def: n, instance: a } = e,
      { url: o } = n;
    if (o) return ['a', { href: o }, !0];
    let { emitter: r, options: i } = t,
      { eventInteractive: s } = i;
    s == null &&
      ((s = n.interactive), s == null && (s = !!r.hasHandlers('eventClick')));
    let l;
    return (
      s &&
        ((l = _S((c) => {
          r.trigger('eventClick', {
            el: c.target,
            event: new _e(t, n, a),
            jsEvent: c,
            view: t.viewApi,
          });
        })),
        (l = { role: 'button', ...l })),
      ['div', l, s]
    );
  }
  var eN = /(^c|C)lass(Name)?$/,
    tN = /Content$/,
    nN = /(DidMount|WillUnmount)$/,
    aN = /^on[A-Z]/,
    oN = { buttons: ZS };
  function oT(...e) {
    let t = {};
    for (let n of e)
      for (let a in n) {
        let o = n[a];
        t[a] ? (t[a] = At(t[a], o)) : (t[a] = o);
      }
    return t;
  }
  function At(...e) {
    let t = {};
    for (let n of e)
      for (let a in n)
        if (a in t) {
          let o =
            oN[a] ||
            (eN.test(a) ? rN : tN.test(a) ? iN : nN.test(a) ? sN : void 0);
          t[a] = o ? o(t[a], n[a], a) : n[a];
        } else t[a] = n[a];
    return t;
  }
  function rN(e, t, n) {
    let a = typeof e == 'function',
      o = typeof t == 'function';
    if (a || o) {
      let r = (i) => D(be(a ? e(i) : e, n), be(o ? t(i) : t, n));
      return ((r.parts = [e, t]), r);
    }
    return D(be(e, n), be(t, n));
  }
  function iN(e, t) {
    if (typeof t == 'function') {
      let n = (a) => {
        let o = t(a);
        return o === !0 ? (typeof e == 'function' ? e(a) : e) : o;
      };
      return ((n.parts = [e, t]), n);
    }
    return t ?? e;
  }
  function sN(e, t) {
    if (e && t) {
      let n = (...a) => {
        (e(...a), t(...a));
      };
      return ((n.parts = [e, t]), n);
    }
    return e || t;
  }
  function rT(e, t) {
    let n = LS(e, t);
    for (let a of n) if (!aN.test(a)) return !1;
    return !0;
  }
  function Nc(e, t) {
    let n = e && e.parts,
      a = t && t.parts;
    if (n && a) {
      let o = n.length,
        r = a.length;
      if (o !== r) return !1;
      for (let i = 0; i < o; i++)
        if (!(n[i] === a[i] || Nc(n[i], a[i]))) return !1;
      return !0;
    }
    return !1;
  }
  var lN = [],
    sT = {
      code: 'en',
      week: { dow: 0, doy: 4 },
      direction: 'ltr',
      todayText: 'Today',
      prevText: 'Prev',
      nextText: 'Next',
      prevYearText: 'Prev year',
      nextYearText: 'Next year',
      yearText: 'Year',
      monthText: 'Month',
      weekTextLong: 'Week',
      dayText: 'Day',
      listText: 'List',
      closeHint: 'Close',
      eventsHint: 'Events',
      allDayText: 'All-day',
      timedText: 'Timed',
      moreLinkText: 'more',
      noEventsText: 'No events to display',
    },
    lT = {
      ...sT,
      weekTextShort: 'W',
      todayHint: (e, t) => (t === 'day' ? 'Today' : `This ${e}`),
      prevHint: 'Previous $0',
      nextHint: 'Next $0',
      viewHint: '$0 view',
      viewChangeHint: 'Change view',
      navLinkHint: 'Go to $0',
      moreLinkHint(e) {
        return `Show ${e} more event${e === 1 ? '' : 's'}`;
      },
    };
  function cT(e) {
    let t = e.length > 0 ? e[0].code : 'en',
      n = lN.concat(e),
      a = { en: lT };
    for (let o of n) a[o.code] = o;
    return { map: a, defaultCode: t };
  }
  function jm(e, t) {
    return typeof e == 'object' && !Array.isArray(e)
      ? uT(e.code, [e.code], e)
      : cN(e, t);
  }
  function cN(e, t) {
    let n = [].concat(e || []),
      a = uN(n, t) || lT;
    return uT(e, n, a);
  }
  function uN(e, t) {
    for (let n = 0; n < e.length; n += 1) {
      let a = e[n].toLocaleLowerCase().split('-');
      for (let o = a.length; o > 0; o -= 1) {
        let r = a.slice(0, o).join('-');
        if (t[r]) return t[r];
      }
    }
    return null;
  }
  function uT(e, t, n) {
    let a = At(sT, n);
    delete a.code;
    let { week: o } = a;
    return (
      delete a.week,
      {
        codeArg: e,
        codes: t,
        week: o,
        simpleNumberFormat: new Intl.NumberFormat(e),
        options: a,
      }
    );
  }
  var wc = class extends Error {
    constructor(t, n) {
      (super(t), (this.response = n));
    }
  };
  function fN(e, t, n) {
    e = e.toUpperCase();
    let a = { method: e };
    return (
      e === 'GET'
        ? (t += (t.indexOf('?') === -1 ? '?' : '&') + new URLSearchParams(n))
        : ((a.body = new URLSearchParams(n)),
          (a.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          })),
      fetch(t, a).then((o) => {
        if (o.ok)
          return o.json().then(
            (r) => [r, o],
            () => {
              throw new wc('Failure parsing JSON', o);
            },
          );
        throw new wc('Request failed', o);
      })
    );
  }
  function dN(e, t) {
    t.emitter.trigger('datesSet', {
      ...qm(e.activeRange, t.dateEnv),
      view: t.viewApi,
    });
  }
  function mN(e, t) {
    let { emitter: n } = t;
    n.hasHandlers('eventsSet') && n.trigger('eventsSet', xi(e, t));
  }
  var hN = {
      ignoreRange: !0,
      parseMeta(e) {
        return Array.isArray(e.events) ? e.events : null;
      },
      fetch(e, t) {
        t({ rawEvents: e.eventSource.meta });
      },
    },
    gN = { name: 'array-event-source', eventSourceDefs: [hN] };
  function pN(e, t, n) {
    let a = !1,
      o = function (s) {
        a || ((a = !0), t(s));
      },
      r = function (s) {
        a || ((a = !0), n(s));
      },
      i = e(o, r);
    i && typeof i.then == 'function' && i.then(o, r);
  }
  var yN = {
      parseMeta(e) {
        return typeof e.events == 'function' ? e.events : null;
      },
      fetch(e, t, n) {
        let { dateEnv: a } = e.context,
          o = e.eventSource.meta;
        pN(o.bind(null, qm(e.range, a)), (r) => t({ rawEvents: r }), n);
      },
    },
    vN = { name: 'func-event-source', eventSourceDefs: [yN] },
    bN = {
      method: String,
      extraParams: T,
      startParam: String,
      endParam: String,
      timeZoneParam: String,
    },
    SN = {
      parseMeta(e) {
        return e.url && (e.format === 'json' || !e.format)
          ? {
              url: e.url,
              format: 'json',
              method: (e.method || 'GET').toUpperCase(),
              extraParams: e.extraParams,
              startParam: e.startParam,
              endParam: e.endParam,
              timeZoneParam: e.timeZoneParam,
            }
          : null;
      },
      fetch(e, t, n) {
        let { meta: a } = e.eventSource,
          o = DN(a, e.range, e.context);
        fN(a.method, a.url, o).then(([r, i]) => {
          t({ rawEvents: r, response: i });
        }, n);
      },
    },
    TN = {
      name: 'json-event-source',
      eventSourceRefiners: bN,
      eventSourceDefs: [SN],
    };
  function DN(e, t, n) {
    let { dateEnv: a, options: o } = n,
      r,
      i,
      s,
      l,
      c = {};
    return (
      (r = e.startParam),
      r == null && (r = o.startParam),
      (i = e.endParam),
      i == null && (i = o.endParam),
      (s = e.timeZoneParam),
      s == null && (s = o.timeZoneParam),
      typeof e.extraParams == 'function'
        ? (l = e.extraParams())
        : (l = e.extraParams || {}),
      Object.assign(c, l),
      (c[r] = a.formatIso(t.start)),
      (c[i] = a.formatIso(t.end)),
      a.timeZone !== 'local' && (c[s] = a.timeZone),
      c
    );
  }
  var MN = {
    name: 'change-handler',
    optionChangeHandlers: {
      controller(e, t) {
        e._setApi(t.calendarApi);
      },
      events(e, t) {
        iT([e], t);
      },
      eventSources: iT,
    },
  };
  function iT(e, t) {
    let n = vc(t.getCurrentData().eventSources);
    if (
      n.length === 1 &&
      e.length === 1 &&
      Array.isArray(n[0]._raw) &&
      Array.isArray(e[0])
    ) {
      t.dispatch({
        type: 'RESET_RAW_EVENTS',
        sourceId: n[0].sourceId,
        rawEvents: e[0],
      });
      return;
    }
    let a = [];
    for (let o of e) {
      let r = !1;
      for (let i = 0; i < n.length; i += 1)
        if (n[i]._raw === o) {
          (n.splice(i, 1), (r = !0));
          break;
        }
      r || a.push(o);
    }
    for (let o of n)
      t.dispatch({ type: 'REMOVE_EVENT_SOURCE', sourceId: o.sourceId });
    for (let o of a) t.calendarApi.addEventSource(o);
  }
  var EN = {
    id: String,
    defaultAllDay: Boolean,
    url: String,
    format: String,
    events: T,
    eventDataTransform: T,
    success: T,
    failure: T,
  };
  function Gm(e, t, n = fT(t)) {
    let a;
    if (
      (typeof e == 'string'
        ? (a = { url: e })
        : typeof e == 'function' || Array.isArray(e)
          ? (a = { events: e })
          : typeof e == 'object' && e && (a = e),
      a)
    ) {
      let { refined: o, extra: r } = Sc(a, n),
        i = ON(o, t);
      if (i)
        return {
          _raw: e,
          isFetching: !1,
          latestFetchId: '',
          fetchRange: null,
          defaultAllDay: o.defaultAllDay,
          eventDataTransform: o.eventDataTransform,
          success: o.success,
          failure: o.failure,
          publicId: o.id || '',
          sourceId: Qe(),
          sourceDefId: i.sourceDefId,
          meta: i.meta,
          ui: Ko(o, t),
          extendedProps: r,
        };
    }
    return null;
  }
  function fT(e) {
    return { ...Ri, ...EN, ...e.pluginHooks.eventSourceRefiners };
  }
  function ON(e, t) {
    let n = t.pluginHooks.eventSourceDefs;
    for (let a = n.length - 1; a >= 0; a -= 1) {
      let r = n[a].parseMeta(e);
      if (r) return { sourceDefId: a, meta: r };
    }
    return null;
  }
  function dT(e, t, n) {
    let a = t ? t.activeRange : null;
    return gT({}, $N(e, n), a, n);
  }
  function mT(e, t, n, a) {
    let o = n ? n.activeRange : null;
    switch (t.type) {
      case 'ADD_EVENT_SOURCES':
        return gT(e, t.sources, o, a);
      case 'REMOVE_EVENT_SOURCE':
        return CN(e, t.sourceId);
      case 'PREV':
      case 'NEXT':
      case 'CHANGE_DATE':
      case 'CHANGE_VIEW_TYPE':
        return n ? pT(e, o, a) : e;
      case 'FETCH_EVENT_SOURCES':
        return Qm(
          e,
          t.sourceIds ? Ym(t.sourceIds) : yT(e, a),
          o,
          t.isRefetch || !1,
          a,
        );
      case 'RECEIVE_EVENTS':
      case 'RECEIVE_EVENT_ERROR':
        return RN(e, t.sourceId, t.fetchId, t.fetchRange);
      case 'REMOVE_ALL_EVENT_SOURCES':
        return {};
      default:
        return e;
    }
  }
  function hT(e, t, n) {
    let a = t ? t.activeRange : null;
    return Qm(e, yT(e, n), a, !0, n);
  }
  function Xm(e) {
    for (let t in e) if (e[t].isFetching) return !0;
    return !1;
  }
  function gT(e, t, n, a) {
    let o = {};
    for (let r of t) o[r.sourceId] = r;
    return (n && (o = pT(o, n, a)), { ...e, ...o });
  }
  function CN(e, t) {
    return sa(e, (n) => n.sourceId !== t);
  }
  function pT(e, t, n) {
    return Qm(
      e,
      sa(e, (a) => NN(a, t, n)),
      t,
      !1,
      n,
    );
  }
  function NN(e, t, n) {
    return vT(e, n)
      ? !n.options.lazyFetching ||
          !e.fetchRange ||
          e.isFetching ||
          t.start < e.fetchRange.start ||
          t.end > e.fetchRange.end
      : !e.latestFetchId;
  }
  function Qm(e, t, n, a, o) {
    let r = {};
    for (let i in e) {
      let s = e[i];
      t[i] ? (r[i] = wN(s, n, a, o)) : (r[i] = s);
    }
    return r;
  }
  function wN(e, t, n, a) {
    let { options: o, calendarApi: r } = a,
      i = a.pluginHooks.eventSourceDefs[e.sourceDefId],
      s = Qe();
    return (
      i.fetch(
        { eventSource: e, range: t, isRefetch: n, context: a },
        (l) => {
          let { rawEvents: c } = l;
          (o.eventSourceSuccess &&
            (c = o.eventSourceSuccess.call(r, c, l.response) || c),
            e.success && (c = e.success.call(r, c, l.response) || c),
            a.dispatch({
              type: 'RECEIVE_EVENTS',
              sourceId: e.sourceId,
              fetchId: s,
              fetchRange: t,
              rawEvents: c,
            }));
        },
        (l) => {
          let c = !1;
          (o.eventSourceFailure && (o.eventSourceFailure.call(r, l), (c = !0)),
            e.failure && (e.failure(l), (c = !0)),
            c || xt(`Unhandled event source error: ${l.message}`, l),
            a.dispatch({
              type: 'RECEIVE_EVENT_ERROR',
              sourceId: e.sourceId,
              fetchId: s,
              fetchRange: t,
              error: l,
            }));
        },
      ),
      { ...e, isFetching: !0, latestFetchId: s }
    );
  }
  function RN(e, t, n, a) {
    let o = e[t];
    return o && n === o.latestFetchId
      ? { ...e, [t]: { ...o, isFetching: !1, fetchRange: a } }
      : e;
  }
  function yT(e, t) {
    return sa(e, (n) => vT(n, t));
  }
  function $N(e, t) {
    let n = fT(t),
      a = [].concat(e.eventSources || []),
      o = [];
    (e.initialEvents && a.unshift(e.initialEvents),
      e.events && a.unshift(e.events));
    for (let r of a) {
      let i = Gm(r, t, n);
      i && o.push(i);
    }
    return o;
  }
  function vT(e, t) {
    return !t.pluginHooks.eventSourceDefs[e.sourceDefId].ignoreRange;
  }
  var xN = {
      daysOfWeek: T,
      startTime: W,
      endTime: W,
      duration: W,
      startRecur: T,
      endRecur: T,
    },
    AN = {
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
            a;
          return (
            e.duration && (a = e.duration),
            !a && e.startTime && e.endTime && (a = $S(e.endTime, e.startTime)),
            {
              allDayGuess: !e.startTime && !e.endTime,
              duration: a,
              typeData: n,
            }
          );
        }
        return null;
      },
      expand(e, t, n) {
        let a = Rt(t, { start: e.startRecur, end: e.endRecur });
        return a ? HN(e.daysOfWeek, e.startTime, e.dateEnv, n, a) : [];
      },
    },
    IN = {
      name: 'simple-recurring-event',
      recurringTypes: [AN],
      eventRefiners: xN,
    };
  function HN(e, t, n, a, o) {
    let r = e ? Ym(e) : null,
      i = G(o.start),
      s = o.end,
      l = [];
    for (
      t &&
      (t.milliseconds < 0
        ? (s = ne(s, 1))
        : t.milliseconds >= 1e3 * 60 * 60 * 24 && (i = ne(i, -1)));
      i < s;
    ) {
      let c;
      ((!r || r[i.getUTCDay()]) &&
        (t ? (c = a.add(i, t)) : (c = i), l.push(a.createMarker(n.toDate(c)))),
        (i = ne(i, 1)));
    }
    return l;
  }
  var bT = [
    gN,
    vN,
    TN,
    IN,
    MN,
    {
      name: 'misc',
      isLoadingFuncs: [(e) => Xm(e.eventSources)],
      propSetHandlers: { dateProfile: dN, eventStore: mN },
    },
  ];
  var FT = F(dt(), 1);
  var Yc = F(Ae(), 1),
    Je = F(dt(), 1),
    WT = F(to(), 1);
  var ut = F(dt(), 1);
  function k(e, t, n) {
    let a, o;
    return function (...r) {
      if (!a) o = e.apply(this, r);
      else if (!La(a, r)) {
        n && n(o);
        let i = e.apply(this, r);
        (!t || !t(i, o)) && (o = i);
      }
      return ((a = r), o);
    };
  }
  function la(e, t, n) {
    let a, o;
    return (r) => {
      if (!a) o = e.call(this, r);
      else if (!Ft(a, r)) {
        n && n(o);
        let i = e.call(this, r);
        (!t || !t(i, o)) && (o = i);
      }
      return ((a = r), o);
    };
  }
  var Mn = (0, ut.createContext)({});
  function MT(e, t, n, a, o, r, i, s, l, c, u, d, f, m) {
    return {
      dateEnv: o,
      nowManager: r,
      options: n,
      pluginHooks: i,
      emitter: c,
      dispatch: s,
      getCurrentData: l,
      calendarApi: u,
      viewSpec: e,
      viewApi: t,
      dateProfileGenerator: a,
      baseId: d,
      registerInteractiveComponent: f,
      unregisterInteractiveComponent: m,
    };
  }
  var Pt = class extends ut.Component {
    shouldComponentUpdate(t, n) {
      return (
        !Bm(this.props, t, this.propEquality) ||
        !Bm(this.state, n, this.stateEquality)
      );
    }
  };
  Pt.addPropsEquality = kN;
  Pt.addStateEquality = BN;
  Pt.contextType = Mn;
  Pt.prototype.propEquality = {};
  Pt.prototype.stateEquality = {};
  var Z = class extends Pt {};
  Z.contextType = Mn;
  function kN(e) {
    let t = Object.create(this.prototype.propEquality);
    (Object.assign(t, e), (this.prototype.propEquality = t));
  }
  function BN(e) {
    let t = Object.create(this.prototype.stateEquality);
    (Object.assign(t, e), (this.prototype.stateEquality = t));
  }
  function V(e, t) {
    typeof e == 'function' ? e(t) : e && (e.current = t);
  }
  var Ii = class extends Z {
    constructor() {
      (super(...arguments),
        (this.id = Qe()),
        (this.queuedDomNodes = []),
        (this.currentDomNodes = []),
        (this.handleEl = (t) => {
          ((this.el = t), this.props.elRef && V(this.props.elRef, t));
        }));
    }
    render() {
      let { props: t, context: n } = this,
        { options: a } = n,
        { customGenerator: o, defaultGenerator: r, renderProps: i } = t,
        s = ET(t, '', this.handleEl),
        l = !1,
        c,
        u = [],
        d;
      if (o != null) {
        let f = typeof o == 'function' ? o(i) : o;
        if (f === !0) l = !0;
        else {
          let m = f && typeof f == 'object';
          m && 'html' in f
            ? (s.dangerouslySetInnerHTML = { __html: f.html })
            : m && 'domNodes' in f
              ? (u = Array.prototype.slice.call(f.domNodes))
              : (m ? (0, ut.isValidElement)(f) : typeof f != 'function')
                ? (c = f)
                : (d = f);
        }
      } else l = !_N(t.generatorName, a);
      return (
        l && r && (c = r(i)),
        (this.queuedDomNodes = u),
        (this.currentGeneratorMeta = d),
        (0, ut.createElement)(t.tag, s, c)
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
    triggerCustomRendering(t) {
      let { props: n, context: a } = this,
        { handleCustomRendering: o, customRenderingMetaMap: r } = a.options;
      if (o) {
        let i = this.currentGeneratorMeta ?? r?.[n.generatorName];
        i &&
          o({
            id: this.id,
            isActive: t,
            containerEl: this.el,
            generatorMeta: i,
            renderProps: n.renderProps,
          });
      }
    }
    applyQueueudDomNodes() {
      let { queuedDomNodes: t, currentDomNodes: n } = this,
        { el: a } = this;
      if (!La(t, n)) {
        for (let o of n) o.remove();
        for (let o of t) a.appendChild(o);
        this.currentDomNodes = t;
      }
    }
  };
  Ii.addPropsEquality({ renderProps: Ft, attrs: rT, style: Ft });
  function _N(e, t) {
    return !!(t.handleCustomRendering && e && t.customRenderingMetaMap?.[e]);
  }
  function ET(e, t, n) {
    let a = { ...e.attrs, ref: n };
    return (
      (e.className || t) && (a.className = D(t, e.className, a.className)),
      e.style && (a.style = e.style),
      a
    );
  }
  var zN = (0, ut.createContext)(0),
    le = class extends ut.Component {
      constructor() {
        (super(...arguments),
          (this.InnerContent = LN.bind(void 0, this)),
          (this.handleEl = (t) => {
            ((this.el = t),
              this.props.elRef &&
                (V(this.props.elRef, t),
                t && this.didMountMisfire && this.componentDidMount()));
          }));
      }
      render() {
        let { props: t } = this,
          n = w(t.classNameGenerator, t.renderProps);
        if (t.children) {
          let a = ET(t, n, this.handleEl),
            o = t.children(this.InnerContent, t.renderProps, a);
          return t.tag ? (0, ut.createElement)(t.tag, a, o) : o;
        } else
          return (0, ut.createElement)(Ii, {
            ...t,
            elRef: this.handleEl,
            tag: t.tag || 'div',
            className: D(t.className, n),
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
  le.contextType = zN;
  function LN(e, t) {
    let n = e.props;
    return (0, ut.createElement)(Ii, {
      renderProps: n.renderProps,
      generatorName: n.generatorName,
      customGenerator: n.customGenerator,
      defaultGenerator: n.defaultGenerator,
      renderId: e.context,
      ...t,
    });
  }
  function w(e, t) {
    return (typeof e == 'function' ? e(t) : e) || '';
  }
  function Hi(e) {
    return e.text;
  }
  function Ke(e) {
    return e.height === 'auto' || e.contentHeight === 'auto';
  }
  function Km(e) {
    let { tableHeaderSticky: t } = e;
    return ((t == null || t === 'auto') && (t = Ke(e)), t);
  }
  function OT(e) {
    let t = Ke(e),
      { footerScrollbarSticky: n } = e;
    return ((n == null || n === 'auto') && (n = t), !!n && t);
  }
  function CT(e) {
    let t = e.scrollerSyncerClass;
    if (!t) throw new RangeError('Must import @fullcalendar/scrollgrid');
    return t;
  }
  var tr = class {
    constructor(t) {
      ((this.handleChange = t),
        (this.isMounted = !1),
        (this.handleRefresh = () => {
          let n = this.computeTiming();
          (n.nowDate.valueOf() !== this.nowDate.valueOf() &&
            ((this.nowDate = n.nowDate),
            (this.todayRange = n.todayRange),
            this.handleChange()),
            this.clearTimeout(),
            this.setTimeout(n.waitMs));
        }),
        (this.handleVisibilityChange = () => {
          document.hidden || this.handleRefresh();
        }));
    }
    update(t) {
      if (this.isMounted)
        (t.unit !== this.unit ||
          t.unitValue !== this.unitValue ||
          t.nowIndicatorSnap !== this.nowIndicatorSnap ||
          t.nowManager !== this.nowManager ||
          t.dateEnv !== this.dateEnv) &&
          ((this.unit = t.unit),
          (this.unitValue = t.unitValue),
          (this.nowIndicatorSnap = t.nowIndicatorSnap),
          (this.nowManager = t.nowManager),
          (this.dateEnv = t.dateEnv),
          this.clearTimeout(),
          this.setTimeout());
      else {
        ((this.isMounted = !0),
          (this.unit = t.unit),
          (this.unitValue = t.unitValue),
          (this.nowIndicatorSnap = t.nowIndicatorSnap),
          (this.nowManager = t.nowManager),
          (this.dateEnv = t.dateEnv));
        let n = this.computeTiming();
        ((this.nowDate = n.nowDate),
          (this.todayRange = n.todayRange),
          this.setTimeout(),
          this.nowManager.addResetListener(this.handleRefresh),
          typeof document < 'u' &&
            document.addEventListener(
              'visibilitychange',
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
        typeof document < 'u' &&
          document.removeEventListener(
            'visibilitychange',
            this.handleVisibilityChange,
          ));
    }
    computeTiming() {
      let t = this.nowManager.getDateMarker(),
        { unit: n, unitValue: a, nowIndicatorSnap: o, dateEnv: r } = this;
      o === 'auto' && (o = /year|month|week|day/.test(n) || (a || 1) === 1);
      let i, s;
      return (
        o
          ? ((i = r.startOf(t, n)),
            (s = r.add(i, W(1, n)).valueOf() - t.valueOf()))
          : ((i = t), (s = 1e3 * 60)),
        (s = Math.min(1e3 * 60 * 60 * 24, s)),
        { nowDate: i, todayRange: ZN(i), waitMs: s }
      );
    }
    setTimeout(t = this.computeTiming().waitMs) {
      this.timeoutId = setTimeout(() => {
        let n = this.computeTiming();
        ((this.nowDate = n.nowDate),
          (this.todayRange = n.todayRange),
          this.handleChange(),
          this.setTimeout(n.waitMs));
      }, t);
    }
    clearTimeout() {
      this.timeoutId && clearTimeout(this.timeoutId);
    }
  };
  function ZN(e) {
    let t = G(e),
      n = ne(t, 1);
    return { start: t, end: n };
  }
  var ce = F(Ae(), 1);
  var nr = class {
    constructor(t) {
      ((this.props = t), this.initHiddenDays());
    }
    buildPrev(t, n, a, o) {
      let { dateEnv: r } = this.props,
        i = r.subtract(r.startOf(n, t.currentRangeUnit), t.dateIncrement);
      return this.build(i, a, -1, o);
    }
    buildNext(t, n, a, o) {
      let { dateEnv: r } = this.props,
        i = r.add(r.startOf(n, t.currentRangeUnit), t.dateIncrement);
      return this.build(i, a, 1, o);
    }
    build(t, n, a, o = !0) {
      let { props: r } = this,
        i,
        s,
        l,
        c,
        u,
        d;
      return (
        (i = this.buildValidRange(n)),
        (i = this.trimHiddenDays(i)),
        o && (t = wS(t, i)),
        (s = this.buildCurrentRangeInfo(t, a)),
        (l = /^(year|month|week|day)$/.test(s.unit)),
        (c = this.buildRenderRange(this.trimHiddenDays(s.range), s.unit, l)),
        (c = this.trimHiddenDays(c)),
        (u = c),
        r.showNonCurrentDates || (u = Rt(u, s.range)),
        (u = this.adjustActiveRange(u)),
        (u = Rt(u, i)),
        (d = NS(s.range, i)),
        $t(c, t) || (t = c.start),
        {
          currentDate: t,
          validRange: i,
          currentRange: s.range,
          currentRangeUnit: s.unit,
          isRangeAllDay: l,
          activeRange: u,
          renderRange: c,
          slotMinTime: r.slotMinTime,
          slotMaxTime: r.slotMaxTime,
          isValid: d,
          dateIncrement: this.buildDateIncrement(s.duration),
        }
      );
    }
    buildValidRange(t) {
      let n = this.props.validRangeInput,
        a =
          typeof n == 'function'
            ? n.call(this.props.calendarApi, this.props.dateEnv.toDate(t))
            : n;
      return this.refineRange(a) || { start: null, end: null };
    }
    buildCurrentRangeInfo(t, n) {
      let { props: a } = this,
        o = null,
        r = null,
        i = null,
        s;
      return (
        a.duration
          ? ((o = a.duration),
            (r = a.durationUnit),
            (i = this.buildRangeFromDuration(t, n, o, r)))
          : (s = this.props.dayCount)
            ? ((r = 'day'), (i = this.buildRangeFromDayCount(t, n, s)))
            : (i = this.buildCustomVisibleRange(t))
              ? (r = a.dateEnv.greatestWholeUnit(i.start, i.end).unit)
              : ((o = this.getFallbackDuration()),
                (r = wi(o).unit),
                (i = this.buildRangeFromDuration(t, n, o, r))),
        { duration: o, unit: r, range: i }
      );
    }
    getFallbackDuration() {
      return W({ day: 1 });
    }
    adjustActiveRange(t) {
      let {
          dateEnv: n,
          usesMinMaxTime: a,
          slotMinTime: o,
          slotMaxTime: r,
        } = this.props,
        { start: i, end: s } = t;
      return (
        a &&
          (Ya(o) < 0 && ((i = G(i)), (i = n.add(i, o))),
          Ya(r) > 1 && ((s = G(s)), (s = ne(s, -1)), (s = n.add(s, r)))),
        { start: i, end: s }
      );
    }
    buildRangeFromDuration(t, n, a, o) {
      let { dateEnv: r, dateAlignment: i } = this.props,
        s,
        l,
        c;
      if (!i) {
        let { dateIncrement: d } = this.props;
        d && ka(d) < ka(a) ? (i = wi(d).unit) : (i = o);
      }
      Ya(a) <= 1 &&
        this.isHiddenDay(s) &&
        ((s = this.skipHiddenDays(s, n)), (s = G(s)));
      function u() {
        ((s = r.startOf(t, i)), (l = r.add(s, a)), (c = { start: s, end: l }));
      }
      return (
        u(),
        this.trimHiddenDays(c) || ((t = this.skipHiddenDays(t, n)), u()),
        c
      );
    }
    buildRangeFromDayCount(t, n, a) {
      let { dateEnv: o, dateAlignment: r } = this.props,
        i = 0,
        s = t,
        l;
      (r && (s = o.startOf(s, r)),
        (s = G(s)),
        (s = this.skipHiddenDays(s, n)),
        (l = s));
      do ((l = ne(l, 1)), this.isHiddenDay(l) || (i += 1));
      while (i < a);
      return { start: s, end: l };
    }
    buildCustomVisibleRange(t) {
      let { props: n } = this,
        a = n.visibleRangeInput,
        o =
          typeof a == 'function'
            ? a.call(n.calendarApi, n.dateEnv.toDate(t))
            : a,
        r = this.refineRange(o);
      return r && (r.start == null || r.end == null) ? null : r;
    }
    buildRenderRange(t, n, a) {
      return t;
    }
    buildDateIncrement(t) {
      let { dateIncrement: n } = this.props,
        a;
      return (
        n || ((a = this.props.dateAlignment) ? W(1, a) : t || W({ days: 1 }))
      );
    }
    refineRange(t) {
      if (t) {
        let n = CS(t, this.props.dateEnv);
        return (n && (n = Zm(n)), n);
      }
      return null;
    }
    initHiddenDays() {
      let t = this.props.hiddenDays || [],
        n = [],
        a = 0,
        o;
      for (this.props.weekends === !1 && t.push(0, 6), o = 0; o < 7; o += 1)
        (n[o] = t.indexOf(o) !== -1) || (a += 1);
      if (!a) throw new Error('invalid hiddenDays');
      this.isHiddenDayHash = n;
    }
    trimHiddenDays(t) {
      let { start: n, end: a } = t;
      return (
        n && (n = this.skipHiddenDays(n)),
        a && (a = this.skipHiddenDays(a, -1, !0)),
        n == null || a == null || n < a ? { start: n, end: a } : null
      );
    }
    isHiddenDay(t) {
      return (
        t instanceof Date && (t = t.getUTCDay()),
        this.isHiddenDayHash[t]
      );
    }
    skipHiddenDays(t, n = 1, a = !1) {
      for (; this.isHiddenDayHash[(t.getUTCDay() + (a ? n : 0) + 7) % 7]; )
        t = ne(t, n);
      return t;
    }
  };
  function Jm(e, t) {
    let { currentRange: n } = e;
    if (e.currentRangeUnit === 'year')
      return t.diffWholeYears(n.start, n.end) > 1 ? 'year' : 'month';
    if (e.currentRangeUnit === 'month') {
      if (t.diffWholeMonths(n.start, n.end) > 1) return 'month';
    } else if (e.currentRangeUnit === 'week') {
      if ($m(n.start, n.end) > 1) return 'week';
    } else if (e.currentRangeUnit === 'day' && Ua(n.start, n.end) > 1)
      return 'day';
  }
  function eh(e, t, n) {
    if (e.valueOf() === G(e).valueOf()) {
      if (t === 'year') return !n.getMonth(e) && n.getDay(e) === 1;
      if (t === 'month') return n.getDay(e) === 1;
      if (t === 'week') return e.getUTCDay() === n.weekDow;
      if (t === 'day') return !0;
    }
    return !1;
  }
  function wT(e, t, n, a, o) {
    switch (t.type) {
      case 'RECEIVE_EVENTS':
        return WN(e, n[t.sourceId], t.fetchId, t.fetchRange, t.rawEvents, o);
      case 'RESET_RAW_EVENTS':
        return FN(e, n[t.sourceId], t.rawEvents, a.activeRange, o);
      case 'ADD_EVENTS':
        return PN(e, t.eventStore, a ? a.activeRange : null, o);
      case 'RESET_EVENTS':
        return t.eventStore;
      case 'MERGE_EVENTS':
        return Dc(e, t.eventStore);
      case 'PREV':
      case 'NEXT':
      case 'CHANGE_DATE':
      case 'CHANGE_VIEW_TYPE':
        return a ? Wa(e, a.activeRange, o) : e;
      case 'REMOVE_EVENTS':
        return PS(e, t.eventStore);
      case 'REMOVE_EVENT_SOURCE':
        return $T(e, t.sourceId);
      case 'REMOVE_ALL_EVENT_SOURCES':
        return Mc(e, (r) => !r.sourceId);
      case 'REMOVE_ALL_EVENTS':
        return Dn();
      default:
        return e;
    }
  }
  function WN(e, t, n, a, o, r) {
    if (t && n === t.latestFetchId) {
      let i = _a(RT(o, t, r), t, r);
      return (a && (i = Wa(i, a, r)), Dc($T(e, t.sourceId), i));
    }
    return e;
  }
  function FN(e, t, n, a, o) {
    let { defIdMap: r, instanceIdMap: i } = qN(e),
      s = _a(RT(n, t, o), t, o, !1, r, i);
    return Wa(s, a, o);
  }
  function RT(e, t, n) {
    let a = n.options.eventDataTransform,
      o = t ? t.eventDataTransform : null;
    return (o && (e = NT(e, o)), a && (e = NT(e, a)), e);
  }
  function NT(e, t) {
    let n;
    if (!t) n = e;
    else {
      n = [];
      for (let a of e) {
        let o = t(a);
        o ? n.push(o) : o == null && n.push(a);
      }
    }
    return n;
  }
  function PN(e, t, n, a) {
    return (n && (t = Wa(t, n, a)), Dc(e, t));
  }
  function th(e, t, n) {
    let { defs: a } = e,
      o = za(e.instances, (r) =>
        a[r.defId].allDay
          ? r
          : {
              ...r,
              range: {
                start: n.createMarker(t.toDate(r.range.start)),
                end: n.createMarker(t.toDate(r.range.end)),
              },
            },
      );
    return { defs: a, instances: o };
  }
  function $T(e, t) {
    return Mc(e, (n) => n.sourceId !== t);
  }
  function qN(e) {
    let { defs: t, instances: n } = e,
      a = {},
      o = {};
    for (let r in t) {
      let i = t[r],
        { publicId: s } = i;
      s && (a[s] = r);
    }
    for (let r in n) {
      let i = n[r],
        s = t[i.defId],
        { publicId: l } = s;
      l && (o[l] = r);
    }
    return { defIdMap: a, instanceIdMap: o };
  }
  var Ui = class {
    constructor(t) {
      ((this.component = t.component),
        (this.isHitComboAllowed = t.isHitComboAllowed || null));
    }
    destroy() {}
  };
  function xT(e, t) {
    return {
      component: e,
      el: t.el,
      useEventCenter: t.useEventCenter != null ? t.useEventCenter : !0,
      isHitComboAllowed: t.isHitComboAllowed || null,
    };
  }
  var nh = {};
  var ar = class {
    constructor() {
      ((this.handlers = {}), (this.thisContext = null));
    }
    setThisContext(t) {
      this.thisContext = t;
    }
    setOptions(t) {
      this.options = t;
    }
    on(t, n) {
      VN(this.handlers, t, n);
    }
    off(t, n) {
      jN(this.handlers, t, n);
    }
    trigger(t, ...n) {
      let a = this.handlers[t] || [],
        o = this.options && this.options[t],
        r = [].concat(o || [], a);
      for (let i of r) i.apply(this.thisContext, n);
    }
    hasHandlers(t) {
      return !!(
        (this.handlers[t] && this.handlers[t].length) ||
        (this.options && this.options[t])
      );
    }
  };
  function VN(e, t, n) {
    (e[t] || (e[t] = [])).push(n);
  }
  function jN(e, t, n) {
    n ? e[t] && (e[t] = e[t].filter((a) => a !== n)) : delete e[t];
  }
  var Fa = F(dt(), 1),
    ah = F(to(), 1);
  function GN(e) {
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
      initialView: e.initialView || '',
      elementDraggingImpl: e.elementDraggingImpl,
      optionChangeHandlers: e.optionChangeHandlers || {},
      scrollerSyncerClass: e.scrollerSyncerClass || null,
      listenerRefiners: e.listenerRefiners || {},
      optionRefiners: e.optionRefiners || {},
      optionDefaults: e.optionDefaults ? [e.optionDefaults] : [],
      propSetHandlers: e.propSetHandlers || {},
    };
  }
  function XN(e, t) {
    let n = {},
      a = {
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
        initialView: '',
        elementDraggingImpl: null,
        optionChangeHandlers: {},
        scrollerSyncerClass: null,
        listenerRefiners: {},
        optionRefiners: {},
        optionDefaults: [],
        propSetHandlers: {},
      };
    function o(r) {
      for (let i of r) {
        let { name: s } = i;
        if (!s) throw new Error('Plugin must specify a name');
        if (!n[s]) {
          let l = (n[s] = GN(i));
          ((a = KN(a, l)), o(i.deps || []));
        }
      }
    }
    return (e && o(e), o(t), a);
  }
  function QN() {
    let e = [],
      t = [],
      n;
    return (a, o) => (
      (!n || !La(a, e) || !La(o, t)) && (n = XN(a, o)),
      (e = a),
      (t = o),
      n
    );
  }
  function KN(e, t) {
    return {
      premiumReleaseDate: JN(e.premiumReleaseDate, t.premiumReleaseDate),
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
      views: oT(e.views, t.views),
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
  function JN(e, t) {
    return e === void 0
      ? t
      : t === void 0
        ? e
        : new Date(Math.max(e.valueOf(), t.valueOf()));
  }
  function ew(e, t) {
    let n = {},
      a;
    for (a in e) oh(a, n, e, t);
    for (a in t) oh(a, n, e, t);
    return n;
  }
  function oh(e, t, n, a) {
    if (t[e]) return t[e];
    let o = tw(e, t, n, a);
    return (o && (t[e] = o), o);
  }
  function tw(e, t, n, a) {
    let o = n[e],
      r = a[e],
      i = (u) => (o && o[u] !== null ? o[u] : r && r[u] !== null ? r[u] : null),
      s = i('component'),
      l = i('superType'),
      c = null;
    if (l) {
      if (l === e)
        throw new Error("Can't have a custom view type that references itself");
      c = oh(l, t, n, a);
    }
    return (
      !s && c && (s = c.component),
      s
        ? {
            type: e,
            component: s,
            defaults: At(c ? c.defaults : {}, o ? o.rawOptions : {}),
            overrides: At(c ? c.overrides : {}, r ? r.rawOptions : {}),
          }
        : null
    );
  }
  function AT(e) {
    return za(e, nw);
  }
  function nw(e) {
    let t = typeof e == 'function' ? { component: e } : e,
      { component: n } = t;
    return (
      t.content
        ? (n = IT(t.content))
        : n && !(n.prototype instanceof Z) && (n = IT(n)),
      { superType: t.type, component: n, rawOptions: t }
    );
  }
  function IT(e) {
    return (t) =>
      (0, ce.jsx)(Mn.Consumer, {
        children: (n) => {
          let { options: a, viewSpec: o } = n,
            r = {
              ...t,
              nextDayThreshold: a.nextDayThreshold,
              ...Tn(a),
              options: {
                headerToolbar: a.headerToolbar,
                footerToolbar: a.footerToolbar,
              },
              isHeightAuto: Ke(a),
              view: n.viewApi,
            };
          return (0, ce.jsx)(le, {
            tag: 'div',
            className: D(
              w(a.viewClass, r),
              w(o.optionDefaults.class, r),
              w(o.optionDefaults.className, r),
              w(o.optionOverrides.class, r),
              w(o.optionOverrides.className, r),
            ),
            renderProps: r,
            generatorName: void 0,
            customGenerator: e,
            didMount: a.didMount || a.viewDidMount,
            willUnmount: a.willUnmount || a.viewWillUnmount,
          });
        },
      });
  }
  function aw(e, t, n) {
    let a = AT(e),
      o = AT(t.views),
      r = ew(a, o);
    return za(r, (i) => ow(i, o, t, n));
  }
  function ow(e, t, n, a) {
    let o =
        e.overrides.duration || e.defaults.duration || a.duration || n.duration,
      r = null,
      i = '',
      s = '',
      l = {};
    if (o && ((r = rw(o)), r)) {
      let c = wi(r);
      ((i = c.unit),
        c.value === 1 && ((s = i), (l = t[i] ? t[i].rawOptions : {})));
    }
    return {
      type: e.type,
      component: e.component,
      duration: r,
      durationUnit: i,
      singleUnit: s,
      optionDefaults: e.defaults,
      optionOverrides: { ...l, ...e.overrides },
    };
  }
  var HT = {};
  function rw(e) {
    let t = JSON.stringify(e),
      n = HT[t];
    return (n === void 0 && ((n = W(e)), (HT[t] = n)), n);
  }
  function iw(e, t) {
    return (t.type === 'CHANGE_VIEW_TYPE' && (e = t.viewType), e);
  }
  function sw(e, t) {
    return t.type === 'CHANGE_DATE' ? t.dateMarker : e;
  }
  function lw(e, t, n) {
    let a = e.initialDate;
    return a != null ? t.createMarker(a) : n.getDateMarker();
  }
  function cw(e, t) {
    return t.type === 'SET_OPTION'
      ? { ...e, [t.optionName]: t.rawOptionValue }
      : e;
  }
  function uw(e, t, n, a, o) {
    let r;
    switch (t.type) {
      case 'CHANGE_VIEW_TYPE':
        return o.build(t.dateMarker || n, a);
      case 'CHANGE_DATE':
        return o.build(t.dateMarker, a);
      case 'PREV':
        if (((r = o.buildPrev(e, n, a)), r.isValid)) return r;
        break;
      case 'NEXT':
        if (((r = o.buildNext(e, n, a)), r.isValid)) return r;
        break;
    }
    return e;
  }
  function fw(e, t) {
    switch (t.type) {
      case 'UNSELECT_DATES':
        return null;
      case 'SELECT_DATES':
        return t.selection;
      default:
        return e;
    }
  }
  function dw(e, t) {
    switch (t.type) {
      case 'UNSELECT_EVENT':
        return '';
      case 'SELECT_EVENT':
        return t.eventInstanceId;
      default:
        return e;
    }
  }
  function mw(e, t) {
    let n;
    switch (t.type) {
      case 'UNSET_EVENT_DRAG':
        return null;
      case 'SET_EVENT_DRAG':
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
  function hw(e, t) {
    let n;
    switch (t.type) {
      case 'UNSET_EVENT_RESIZE':
        return null;
      case 'SET_EVENT_RESIZE':
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
  function gw(e, t, n) {
    let a = e.headerToolbar ? UT(e.headerToolbar, e, t, n) : null,
      o = e.footerToolbar ? UT(e.footerToolbar, e, t, n) : null;
    return { header: a, footer: o };
  }
  function UT(e, t, n, a) {
    let o = t.direction === 'rtl',
      r = [],
      i = !1;
    function s(c) {
      let u = pw(c, t, n, a);
      return (r.push(...u.viewsWithButtons), (i = i || u.hasTitle), u.widgets);
    }
    return {
      sectionWidgets: {
        start: s(e[o ? 'right' : 'left'] || e.start || ''),
        center: s(e.center || ''),
        end: s(e[o ? 'left' : 'right'] || e.end || ''),
      },
      viewsWithButtons: r,
      hasTitle: i,
    };
  }
  function pw(e, t, n, a) {
    let o = t.buttons || {},
      r = t.toolbarElements || {},
      i = e ? e.split(' ') : [],
      s = [],
      l = !1;
    return {
      widgets: i.map((u) =>
        u.split(',').map((d) => {
          if (d === 'title') return ((l = !0), { name: d });
          if (r[d]) return { name: d, customElement: r[d] };
          let f,
            m = o[d] || {},
            v,
            p,
            E;
          if ((f = n[d])) {
            s.push(d);
            let g = f.optionDefaults.buttonTextKey;
            ((v =
              m.text ||
              (g ? t[g] : '') ||
              (f.singleUnit
                ? t[f.singleUnit + 'TextLong'] || t[f.singleUnit + 'Text']
                : '') ||
              d),
              (p = We(m.hint || t.viewHint, [v, d], v)),
              (E = (h) => {
                (m?.click?.(h), h.defaultPrevented || a.changeView(d));
              }));
          } else
            ((v = m.text || t[d + 'TextLong'] || t[d + 'Text'] || d),
              d === 'prevYear'
                ? (p = We(m.hint || t.prevHint, [t.yearText, 'year'], v))
                : d === 'nextYear'
                  ? (p = We(m.hint || t.nextHint, [t.yearText, 'year'], v))
                  : (p = (g) =>
                      We(
                        m.hint || t[d + 'Hint'],
                        [t[g + 'TextLong'] || t[g + 'Text'], g],
                        v,
                      )),
              (E = (g) => {
                (m?.click?.(g), g.defaultPrevented || a[d]?.());
              }));
          return {
            name: d,
            isView: !!f,
            buttonText: v,
            buttonHint: p,
            buttonDisplay: m.display,
            buttonIconClass: m.iconClass,
            buttonIconContent: m.iconContent,
            buttonClick: E,
            buttonIsPrimary: m.isPrimary || !1,
            buttonClass: m.class ?? m.className,
            buttonDidMount: m.didMount,
            buttonWillUnmount: m.willUnmount,
          };
        }),
      ),
      viewsWithButtons: s,
      hasTitle: l,
    };
  }
  var rh = class {
      constructor(t, n, a) {
        ((this.type = t), (this.getCurrentData = n), (this.dateEnv = a));
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
      getOption(t) {
        return this.getCurrentData().options[t];
      }
    },
    yw = {
      startTime: '09:00',
      endTime: '17:00',
      daysOfWeek: [1, 2, 3, 4, 5],
      display: 'inverse-background',
      className: '',
      groupId: '_businessHours',
    };
  function vw(e, t) {
    return _a(bw(e), null, t);
  }
  function bw(e) {
    let t;
    return (
      e === !0
        ? (t = [{}])
        : Array.isArray(e)
          ? (t = e.filter((n) => n.daysOfWeek))
          : typeof e == 'object' && e
            ? (t = [e])
            : (t = []),
      (t = t.map((n) => ({ ...yw, ...n }))),
      t
    );
  }
  function Sw(e, t, n) {
    let a;
    /^(year|month)$/.test(e.currentRangeUnit)
      ? (a = e.currentRange)
      : (a = e.activeRange);
    let o,
      r = { isEndExclusive: e.isRangeAllDay };
    return (
      t.titleFormat
        ? (o = n.formatRangeToParts(a.start, a.end, ee(t.titleFormat), r))
        : ((o = n.formatRangeToParts(
            a.start,
            a.end,
            ee(YT(e, t.disallowAmbigTitle, 'long')),
            r,
          )),
          Tw(o) &&
            (o = n.formatRangeToParts(
              a.start,
              a.end,
              ee(YT(e, t.disallowAmbigTitle, 'short')),
              r,
            ))),
      ve(o)
    );
  }
  function YT(e, t, n) {
    let { currentRangeUnit: a } = e;
    if (a === 'year') return { year: 'numeric' };
    if (a === 'month') return { year: 'numeric', month: n };
    if (!t) {
      let o = Ua(e.currentRange.start, e.currentRange.end);
      if (o !== null && o > 1) return { year: 'numeric', month: n };
    }
    return { year: 'numeric', month: 'long', day: 'numeric' };
  }
  function Tw(e) {
    let t = !1,
      n = !1;
    for (let a of e)
      a.type === 'month' &&
        (a.source === 'startRange' && (t = !0),
        a.source === 'endRange' && (n = !0));
    return t && n;
  }
  var $c = class {
      constructor() {
        this.resetListeners = new Set();
      }
      handleInput(t, n) {
        let a = this.dateEnv;
        if (
          t !== a &&
          (typeof n == 'function'
            ? (this.nowFn = n)
            : a ||
              ((this.nowAnchorDate = t.toDate(
                n ? t.createMarker(n) : t.createNowMarker(),
              )),
              (this.nowAnchorQueried = Date.now())),
          (this.dateEnv = t),
          a)
        )
          for (let o of this.resetListeners.values()) o();
      }
      getDateMarker() {
        return this.nowAnchorDate
          ? this.dateEnv.timestampToMarker(
              this.nowAnchorDate.valueOf() +
                (Date.now() - this.nowAnchorQueried),
            )
          : this.dateEnv.createMarker(this.nowFn());
      }
      addResetListener(t) {
        this.resetListeners.add(t);
      }
      removeResetListener(t) {
        this.resetListeners.delete(t);
      }
    },
    xc = class {
      constructor(t) {
        ((this.computeCurrentViewData = k(this._computeCurrentViewData)),
          (this.organizeRawLocales = k(cT)),
          (this.buildLocale = k(jm)),
          (this.buildPluginHooks = QN()),
          (this.buildDateEnv = k(Dw)),
          (this.parseToolbars = k(gw)),
          (this.buildViewSpecs = k(aw)),
          (this.buildDateProfileGenerator = la(Mw)),
          (this.buildViewApi = k(Ew)),
          (this.buildViewUiProps = la(Nw)),
          (this.buildEventUiBySource = k(Ow, Ft)),
          (this.buildEventUiBases = k(Cw)),
          (this.parseContextBusinessHours = la(ww)),
          (this.buildToolbarProps = k(Rw)),
          (this.buildTitle = k(Sw)),
          (this.nowManager = new $c()),
          (this.isDrainingActionQueue = !1),
          (this.actionQueue = []),
          (this.optionOverrides = {}),
          (this.emitter = new ar()),
          (this.currentCalendarOptionsRefiners = {}),
          (this.currentCalendarOptionsInput = {}),
          (this.currentCalendarOptionsRefined = {}),
          (this.currentViewOptionsInput = {}),
          (this.currentViewOptionsRefined = {}),
          (this.optionsForRefining = []),
          (this.optionsForHandling = []),
          (this.getCurrentData = () => this.data),
          (this.handleNowChange = () => {
            this.dispatch({ type: 'UPDATE_NOW' });
          }),
          (this.dispatch = (n) => {
            (this.actionQueue.push(n),
              this.isDrainingActionQueue || this.drainActionQueue());
          }),
          (this.config = t),
          (this.nowManager = new $c()),
          (this.nowTimer = new tr(this.handleNowChange)));
      }
      destroy() {
        this.nowTimer.destroy();
      }
      update(t) {
        return (
          (this.optionOverrides = t),
          this.actionQueue.push({ type: 'IDLE' }),
          this.drainActionQueue(),
          this.data
        );
      }
      resetOptions(t, n) {
        (n === void 0
          ? (this.optionOverrides = t)
          : ((this.optionOverrides = { ...this.optionOverrides, ...t }),
            this.optionsForRefining.push(...n)),
          this.dispatch({ type: 'RESET_OPTIONS' }));
      }
      drainActionQueue() {
        let t,
          { state: n, data: a } = this,
          o = !n,
          { actionQueue: r } = this,
          i = [];
        for (this.isDrainingActionQueue = !0; r.length; ) {
          let s = r.shift();
          (({ state: n, data: a, calendarContext: t } = this.reduce(n, a, s)),
            (this.state = n),
            (this.data = a),
            s.type !== 'IDLE' && i.push(s));
        }
        if (((this.isDrainingActionQueue = !1), o)) {
          let s = t.options.controller;
          s && s._setApi(this.config.calendarApi);
        }
        if (!o && i.length) {
          let { onDataChange: s } = this.config;
          s && s(this.data, i);
        }
      }
      reduce(t, n, a) {
        let { config: o } = this,
          r = !t,
          i = r ? {} : cw(t.dynamicOptionOverrides, a),
          s = this.computeOptionsData(this.optionOverrides, i, o.calendarApi),
          l = r
            ? s.calendarOptions.initialView || s.pluginHooks.initialView
            : iw(t.currentViewType, a),
          c = this.computeCurrentViewData(l, s, this.optionOverrides, i);
        ((o.calendarApi.currentDataManager = this),
          this.emitter.setThisContext(o.calendarApi),
          this.emitter.setOptions(c.options));
        let u = {
            nowManager: this.nowManager,
            dateEnv: s.dateEnv,
            options: s.calendarOptions,
            pluginHooks: s.pluginHooks,
            calendarApi: o.calendarApi,
            dispatch: this.dispatch,
            emitter: this.emitter,
            getCurrentData: this.getCurrentData,
          },
          { nowDate: d } = this.nowTimer.update({
            unit: 'day',
            unitValue: 1,
            nowIndicatorSnap: 'auto',
            nowManager: this.nowManager,
            dateEnv: s.dateEnv,
          }),
          f = r
            ? lw(s.calendarOptions, s.dateEnv, this.nowManager)
            : sw(t.currentDate, a),
          m;
        (r
          ? (m = c.dateProfileGenerator.build(f, d))
          : ((m = t.dateProfile),
            n &&
              n.dateProfileGenerator !== c.dateProfileGenerator &&
              (m = c.dateProfileGenerator.build(f, d)),
            (m = uw(m, a, f, d, c.dateProfileGenerator))),
          ((a && (a.type === 'PREV' || a.type === 'NEXT')) ||
            !$t(m.activeRange, f)) &&
            (f = m.currentRange.start));
        let v = r ? dT(s.calendarOptions, m, u) : mT(t.eventSources, a, m, u),
          p = r ? Dn() : wT(t.eventStore, a, v, m, u),
          E = Xm(v),
          g = r
            ? Dn()
            : (E &&
                !c.options.progressiveEventRendering &&
                t.renderableEventStore) ||
              p,
          { eventUiSingleBase: h, selectionConfig: y } =
            this.buildViewUiProps(u),
          b = this.buildEventUiBySource(v),
          O = r ? {} : this.buildEventUiBases(g.defs, h, b),
          x = {
            dynamicOptionOverrides: i,
            currentViewType: l,
            currentDate: f,
            dateProfile: m,
            eventSources: v,
            eventStore: p,
            renderableEventStore: g,
            selectionConfig: y,
            eventUiBases: O,
            businessHours: this.parseContextBusinessHours(u),
            dateSelection: r ? null : fw(t.dateSelection, a),
            eventSelection: r ? '' : dw(t.eventSelection, a),
            eventDrag: r ? null : mw(t.eventDrag, a),
            eventResize: r ? null : hw(t.eventResize, a),
            nowDate: d,
          },
          C = { ...u, ...x };
        for (let fa of s.pluginHooks.reducers) Object.assign(x, fa(t, a, C));
        let $ = t ? kT(t, u) : !1,
          R = kT(x, u);
        !$ && R
          ? this.emitter.trigger('loading', !0)
          : $ && !R && this.emitter.trigger('loading', !1);
        let I = this.buildTitle(m, c.options, s.dateEnv),
          Oe = this.buildToolbarProps(
            c.viewSpec,
            m,
            c.dateProfileGenerator,
            f,
            d,
            I,
          ),
          Se = {
            viewTitle: I,
            nowManager: this.nowManager,
            calendarApi: o.calendarApi,
            dispatch: this.dispatch,
            emitter: this.emitter,
            getCurrentData: this.getCurrentData,
            toolbarProps: Oe,
            ...s,
            ...c,
            ...x,
          },
          Vt = s.pluginHooks.optionChangeHandlers,
          Li = n && n.calendarOptions,
          Zi = s.calendarOptions;
        if (Li && Li !== Zi) {
          Li.timeZone !== Zi.timeZone &&
            ((x.eventSources = Se.eventSources = hT(Se.eventSources, m, Se)),
            (x.eventStore = Se.eventStore =
              th(Se.eventStore, n.dateEnv, Se.dateEnv)),
            (x.renderableEventStore = Se.renderableEventStore =
              th(Se.renderableEventStore, n.dateEnv, Se.dateEnv)));
          for (let fa in Vt)
            (this.optionsForHandling.indexOf(fa) !== -1 || Li[fa] !== Zi[fa]) &&
              Vt[fa](Zi[fa], Se);
        }
        return (
          (this.optionsForHandling = []),
          { state: x, data: Se, calendarContext: u }
        );
      }
      computeOptionsData(t, n, a) {
        if (
          !this.optionsForRefining.length &&
          t === this.stableOptionOverrides &&
          n === this.stableDynamicOptionOverrides
        )
          return this.stableCalendarOptionsData;
        let {
            refinedOptions: o,
            pluginHooks: r,
            localeDefaults: i,
            availableLocaleData: s,
          } = this.processRawCalendarOptions(t, n),
          l = this.buildDateEnv(
            o.timeZone,
            o.locale,
            o.weekNumberCalculation,
            o.firstDay,
            o.weekTextLong,
            o.weekTextShort,
            r,
            s,
          ),
          c = this.buildViewSpecs(
            r.views,
            this.stableOptionOverrides,
            this.stableDynamicOptionOverrides,
          ),
          u = this.parseToolbars(o, c, a);
        return (this.stableCalendarOptionsData = {
          calendarOptions: o,
          pluginHooks: r,
          dateEnv: l,
          viewSpecs: c,
          toolbarConfig: u,
          localeDefaults: i,
          availableRawLocales: s.map,
        });
      }
      processRawCalendarOptions(t, n) {
        let { locales: a, locale: o } = At(bc, t, n),
          r = this.organizeRawLocales(a),
          i = r.map,
          s = this.buildLocale(o || r.defaultCode, i).options,
          l = this.buildPluginHooks(t.plugins || [], bT),
          c = (this.currentCalendarOptionsRefiners = {
            ..._m,
            ...zm,
            ...Lm,
            ...l.listenerRefiners,
            ...l.optionRefiners,
          }),
          u = At(bc, ...l.optionDefaults, s, _T(At(t, n), c)),
          d = {},
          f = this.currentCalendarOptionsInput,
          m = this.currentCalendarOptionsRefined,
          v = !1;
        for (let p in u)
          this.optionsForRefining.indexOf(p) === -1 &&
          (u[p] === f[p] ||
            (Za[p] && p in f && Za[p](f[p], u[p])) ||
            Nc(f[p], u[p]))
            ? (d[p] = m[p])
            : c[p] && ((d[p] = c[p](u[p], p)), (v = !0));
        return (
          v &&
            ((this.currentCalendarOptionsInput = u),
            (this.currentCalendarOptionsRefined = d),
            (this.stableOptionOverrides = t),
            (this.stableDynamicOptionOverrides = n)),
          this.optionsForHandling.push(...this.optionsForRefining),
          (this.optionsForRefining = []),
          {
            rawOptions: this.currentCalendarOptionsInput,
            refinedOptions: this.currentCalendarOptionsRefined,
            pluginHooks: l,
            availableLocaleData: r,
            localeDefaults: s,
          }
        );
      }
      _computeCurrentViewData(t, n, a, o) {
        let r = n.viewSpecs[t];
        if (!r)
          throw new Error(
            `viewType "${t}" is not available. Please make sure you've loaded all neccessary plugins`,
          );
        let { refinedOptions: i } = this.processRawViewOptions(
          r,
          n.pluginHooks,
          n.localeDefaults,
          a,
          o,
        );
        this.nowManager.handleInput(n.dateEnv, i.now);
        let s = this.buildDateProfileGenerator({
            dateProfileGeneratorClass:
              r.optionDefaults.dateProfileGeneratorClass,
            duration: r.duration,
            durationUnit: r.durationUnit,
            usesMinMaxTime: r.optionDefaults.usesMinMaxTime,
            dateEnv: n.dateEnv,
            calendarApi: this.config.calendarApi,
            slotMinTime: i.slotMinTime,
            slotMaxTime: i.slotMaxTime,
            showNonCurrentDates: i.showNonCurrentDates,
            dayCount: i.dayCount,
            dateAlignment: i.dateAlignment,
            dateIncrement: i.dateIncrement,
            hiddenDays: i.hiddenDays,
            weekends: i.weekends,
            validRangeInput: i.validRange,
            visibleRangeInput: i.visibleRange,
            fixedWeekCount: i.fixedWeekCount,
          }),
          l = this.buildViewApi(t, this.getCurrentData, n.dateEnv);
        return { viewSpec: r, options: i, dateProfileGenerator: s, viewApi: l };
      }
      processRawViewOptions(t, n, a, o, r) {
        let i = {
            ..._m,
            ...zm,
            ...Lm,
            ...WS,
            ...n.listenerRefiners,
            ...n.optionRefiners,
          },
          s = At(
            bc,
            ...n.optionDefaults,
            t.optionDefaults,
            a,
            _T(At(o, t.optionOverrides, r), i),
          ),
          l = {},
          c = this.currentViewOptionsInput,
          u = this.currentViewOptionsRefined,
          d = !1;
        for (let f in s)
          s[f] === c[f] || (Za[f] && Za[f](s[f], c[f])) || Nc(c[f], s[f])
            ? (l[f] = u[f])
            : (s[f] === this.currentCalendarOptionsInput[f] ||
              (Za[f] && Za[f](s[f], this.currentCalendarOptionsInput[f]))
                ? f in this.currentCalendarOptionsRefined &&
                  (l[f] = this.currentCalendarOptionsRefined[f])
                : i[f] && (l[f] = i[f](s[f], f)),
              (d = !0));
        return (
          d &&
            ((this.currentViewOptionsInput = s),
            (this.currentViewOptionsRefined = l)),
          {
            rawOptions: this.currentViewOptionsInput,
            refinedOptions: this.currentViewOptionsRefined,
          }
        );
      }
    };
  function Dw(e, t, n, a, o, r, i, s) {
    let l = jm(t || s.defaultCode, s.map);
    return new uc({
      calendarSystem: 'gregory',
      timeZone: e,
      locale: l,
      weekNumberCalculation: n,
      firstDay: a,
      weekTextLong: o,
      weekTextShort: r,
      cmdFormatter: i.cmdFormatter,
    });
  }
  function Mw(e) {
    let t = e.dateProfileGeneratorClass || nr;
    return new t(e);
  }
  function Ew(e, t, n) {
    return new rh(e, t, n);
  }
  function Ow(e) {
    return za(e, (t) => t.ui);
  }
  function Cw(e, t, n) {
    let a = { '': t };
    for (let o in e) {
      let r = e[o];
      r.sourceId && n[r.sourceId] && (a[o] = n[r.sourceId]);
    }
    return a;
  }
  function Nw(e) {
    let { options: t } = e;
    return {
      eventUiSingleBase: Ko(
        {
          display: t.eventDisplay,
          editable: t.editable,
          startEditable: t.eventStartEditable,
          durationEditable: t.eventDurationEditable,
          constraint: t.eventConstraint,
          overlap: typeof t.eventOverlap == 'boolean' ? t.eventOverlap : void 0,
          allow: t.eventAllow,
        },
        e,
      ),
      selectionConfig: Ko(
        {
          constraint: t.selectConstraint,
          overlap:
            typeof t.selectOverlap == 'boolean' ? t.selectOverlap : void 0,
          allow: t.selectAllow,
        },
        e,
      ),
    };
  }
  function kT(e, t) {
    for (let n of t.pluginHooks.isLoadingFuncs) if (n(e)) return !0;
    return !1;
  }
  function ww(e) {
    return vw(e.options.businessHours, e);
  }
  var BT = {};
  function _T(e, t) {
    let n = {};
    for (let a in e)
      t[a]
        ? (n[a] = e[a])
        : BT[a] || (xt(`Unknown option \`${a}\`.`), (BT[a] = !0));
    return n;
  }
  function Rw(e, t, n, a, o, r) {
    let i = n.build(o, o, void 0, !1),
      s = n.buildPrev(t, a, o, !1),
      l = n.buildNext(t, a, o, !1);
    return {
      title: r,
      selectedButton: e.type,
      navUnit: e.singleUnit,
      isTodayEnabled: i.isValid && !$t(t.currentRange, o),
      isPrevEnabled: s.isValid,
      isNextEnabled: l.isValid,
    };
  }
  var Ac = class {
    getCurrentData() {
      return this.currentDataManager.getCurrentData();
    }
    dispatch(t) {
      this.currentDataManager.dispatch(t);
    }
    get view() {
      return this.getCurrentData().viewApi;
    }
    batchRendering(t) {
      t();
    }
    setOption(t, n) {
      this.dispatch({ type: 'SET_OPTION', optionName: t, rawOptionValue: n });
    }
    getOption(t) {
      return this.currentDataManager.currentCalendarOptionsInput[t];
    }
    getAvailableLocaleCodes() {
      return Object.keys(this.getCurrentData().availableRawLocales);
    }
    on(t, n) {
      let { currentDataManager: a } = this;
      a.currentCalendarOptionsRefiners[t]
        ? a.emitter.on(t, n)
        : xt(`Unknown listener \`${t}\`.`);
    }
    off(t, n) {
      this.currentDataManager.emitter.off(t, n);
    }
    trigger(t, ...n) {
      this.currentDataManager.emitter.trigger(t, ...n);
    }
    changeView(t, n) {
      this.batchRendering(() => {
        if ((this.unselect(), n))
          if (n.start && n.end)
            (this.dispatch({ type: 'CHANGE_VIEW_TYPE', viewType: t }),
              this.dispatch({
                type: 'SET_OPTION',
                optionName: 'visibleRange',
                rawOptionValue: n,
              }));
          else {
            let { dateEnv: a } = this.getCurrentData();
            this.dispatch({
              type: 'CHANGE_VIEW_TYPE',
              viewType: t,
              dateMarker: a.createMarker(n),
            });
          }
        else this.dispatch({ type: 'CHANGE_VIEW_TYPE', viewType: t });
      });
    }
    zoomTo(t, n) {
      let a = this.getCurrentData(),
        o;
      ((n = n || 'day'),
        (o = a.viewSpecs[n] || this.getUnitViewSpec(n)),
        this.unselect(),
        o
          ? this.dispatch({
              type: 'CHANGE_VIEW_TYPE',
              viewType: o.type,
              dateMarker: t,
            })
          : this.dispatch({ type: 'CHANGE_DATE', dateMarker: t }));
    }
    getUnitViewSpec(t) {
      let { viewSpecs: n, toolbarConfig: a } = this.getCurrentData(),
        o = [].concat(
          a.header ? a.header.viewsWithButtons : [],
          a.footer ? a.footer.viewsWithButtons : [],
        ),
        r,
        i;
      for (let s in n) o.push(s);
      for (r = 0; r < o.length; r += 1)
        if (((i = n[o[r]]), i && i.singleUnit === t)) return i;
      return null;
    }
    prev() {
      (this.unselect(), this.dispatch({ type: 'PREV' }));
    }
    next() {
      (this.unselect(), this.dispatch({ type: 'NEXT' }));
    }
    prevYear() {
      let t = this.getCurrentData();
      (this.unselect(),
        this.dispatch({
          type: 'CHANGE_DATE',
          dateMarker: t.dateEnv.addYears(t.currentDate, -1),
        }));
    }
    nextYear() {
      let t = this.getCurrentData();
      (this.unselect(),
        this.dispatch({
          type: 'CHANGE_DATE',
          dateMarker: t.dateEnv.addYears(t.currentDate, 1),
        }));
    }
    today() {
      let t = this.getCurrentData();
      (this.unselect(),
        this.dispatch({
          type: 'CHANGE_DATE',
          dateMarker: t.nowManager.getDateMarker(),
        }));
    }
    gotoDate(t) {
      let n = this.getCurrentData();
      (this.unselect(),
        this.dispatch({
          type: 'CHANGE_DATE',
          dateMarker: n.dateEnv.createMarker(t),
        }));
    }
    incrementDate(t) {
      let n = this.getCurrentData(),
        a = W(t);
      a &&
        (this.unselect(),
        this.dispatch({
          type: 'CHANGE_DATE',
          dateMarker: n.dateEnv.add(n.currentDate, a),
        }));
    }
    getDate() {
      let t = this.getCurrentData();
      return t.dateEnv.toDate(t.currentDate);
    }
    formatDate(t, n) {
      let { dateEnv: a } = this.getCurrentData();
      return ve(a.formatToParts(a.createMarker(t), ee(n)));
    }
    formatRange(t, n, a) {
      let { dateEnv: o } = this.getCurrentData();
      return ve(
        o.formatRangeToParts(o.createMarker(t), o.createMarker(n), ee(a), a),
      );
    }
    formatIso(t, n) {
      let { dateEnv: a } = this.getCurrentData();
      return a.formatIso(a.createMarker(t), { omitTime: n });
    }
    select(t, n) {
      let a;
      n == null
        ? t.start != null
          ? (a = t)
          : (a = { start: t, end: null })
        : (a = { start: t, end: n });
      let o = this.getCurrentData(),
        r = jS(a, o.dateEnv, W({ days: 1 }));
      r &&
        (this.dispatch({ type: 'SELECT_DATES', selection: r }), QS(r, null, o));
    }
    unselect(t) {
      let n = this.getCurrentData();
      n.dateSelection && (this.dispatch({ type: 'UNSELECT_DATES' }), KS(t, n));
    }
    addEvent(t, n) {
      if (t instanceof _e) {
        let i = t._def,
          s = t._instance;
        return (
          this.getCurrentData().eventStore.defs[i.defId] ||
            (this.dispatch({
              type: 'ADD_EVENTS',
              eventStore: Tc({ def: i, instance: s }),
            }),
            this.triggerEventAdd(t)),
          t
        );
      }
      let a = this.getCurrentData(),
        o;
      if (n instanceof Sn) o = n.internalEventSource;
      else if (typeof n == 'boolean') n && ([o] = vc(a.eventSources));
      else if (n != null) {
        let i = this.getEventSourceById(n);
        if (!i) return (xt(`Unknown event source ID \`${n}\`.`), null);
        o = i.internalEventSource;
      }
      let r = Fm(t, o, a, !1);
      if (r) {
        let i = new _e(a, r.def, r.def.recurringDef ? null : r.instance);
        return (
          this.dispatch({ type: 'ADD_EVENTS', eventStore: Tc(r) }),
          this.triggerEventAdd(i),
          i
        );
      }
      return null;
    }
    triggerEventAdd(t) {
      let { emitter: n } = this.getCurrentData();
      n.trigger('eventAdd', {
        event: t,
        relatedEvents: [],
        revert: () => {
          this.dispatch({ type: 'REMOVE_EVENTS', eventStore: Vm(t) });
        },
      });
    }
    getEventById(t) {
      let n = this.getCurrentData(),
        { defs: a, instances: o } = n.eventStore;
      t = String(t);
      for (let r in a) {
        let i = a[r];
        if (i.publicId === t) {
          if (i.recurringDef) return new _e(n, i, null);
          for (let s in o) {
            let l = o[s];
            if (l.defId === i.defId) return new _e(n, i, l);
          }
        }
      }
      return null;
    }
    getEvents() {
      let t = this.getCurrentData();
      return xi(t.eventStore, t);
    }
    removeAllEvents() {
      this.dispatch({ type: 'REMOVE_ALL_EVENTS' });
    }
    getEventSources() {
      let t = this.getCurrentData(),
        n = t.eventSources,
        a = [];
      for (let o in n) a.push(new Sn(t, n[o]));
      return a;
    }
    getEventSourceById(t) {
      let n = this.getCurrentData(),
        a = n.eventSources;
      t = String(t);
      for (let o in a) if (a[o].publicId === t) return new Sn(n, a[o]);
      return null;
    }
    addEventSource(t) {
      let n = this.getCurrentData();
      if (t instanceof Sn)
        return (
          n.eventSources[t.internalEventSource.sourceId] ||
            this.dispatch({
              type: 'ADD_EVENT_SOURCES',
              sources: [t.internalEventSource],
            }),
          t
        );
      let a = Gm(t, n);
      return a
        ? (this.dispatch({ type: 'ADD_EVENT_SOURCES', sources: [a] }),
          new Sn(n, a))
        : null;
    }
    removeAllEventSources() {
      this.dispatch({ type: 'REMOVE_ALL_EVENT_SOURCES' });
    }
    refetchEvents() {
      this.dispatch({ type: 'FETCH_EVENT_SOURCES', isRefetch: !0 });
    }
    scrollToTime(t) {
      let n = W(t);
      n && this.trigger('_timeScrollRequest', n);
    }
    getButtonState() {
      let t = this.getCurrentData(),
        { toolbarProps: n } = t,
        a = t.calendarOptions,
        o = a.buttons || {},
        r = t.viewSpecs,
        i = t.viewSpec.singleUnit,
        s = [i ? zT(i, a) : '', i],
        l = {
          today: {
            text: a.todayText,
            hint: We(a.todayHint, s, a.todayText),
            isDisabled: !n.isTodayEnabled,
          },
          prev: {
            text: a.prevText,
            hint: We(a.prevHint, s, a.prevText),
            isDisabled: !n.isPrevEnabled,
          },
          next: {
            text: a.nextText,
            hint: We(a.nextHint, s, a.nextText),
            isDisabled: !n.isNextEnabled,
          },
          prevYear: {
            text: a.prevYearText,
            hint: We(a.prevHint, [a.yearText, 'year'], a.prevYearText),
            isDisabled: !1,
          },
          nextYear: {
            text: a.prevYearText,
            hint: We(a.nextHint, [a.yearText, 'year'], a.nextYearText),
            isDisabled: !1,
          },
        };
      for (let c in r) {
        let u = r[c],
          { singleUnit: d } = u,
          f = u.optionDefaults.buttonTextKey,
          m = o[c]?.text || (f ? a[f] : '') || (d ? zT(d, a) : '') || c,
          v = We(a.viewHint, [m, c], m);
        l[c] = { text: m, hint: v };
      }
      return l;
    }
  };
  function zT(e, t) {
    return t[e + 'TextLong'] || t[e + 'Text'];
  }
  var Ic = class extends Fa.Component {
    constructor() {
      (super(...arguments),
        (this.state = { forPrint: !1 }),
        (this.handleBeforePrint = () => {
          (0, ah.flushSync)(() => {
            this.setState({ forPrint: !0 });
          });
        }),
        (this.handleAfterPrint = () => {
          (0, ah.flushSync)(() => {
            this.setState({ forPrint: !1 });
          });
        }));
    }
    render() {
      return this.props?.children(this.state.forPrint);
    }
    componentDidMount() {
      let { props: t } = this,
        { emitter: n } = t;
      (n.on('_beforeprint', this.handleBeforePrint),
        n.on('_afterprint', this.handleAfterPrint));
    }
    componentWillUnmount() {
      let { props: t } = this,
        { emitter: n } = t;
      (n.off('_beforeprint', this.handleBeforePrint),
        n.off('_afterprint', this.handleAfterPrint));
    }
  };
  function LT(e, t) {
    let n = e.borderlessX ?? e.borderless,
      a = e.borderlessTop ?? e.borderless,
      o = e.borderlessBottom ?? e.borderless,
      r = { borderlessX: !!n, borderlessTop: !!a, borderlessBottom: !!o };
    return D(
      w(e.class, r),
      w(e.className, r),
      S.borderBoxRoot,
      S.isolate,
      S.flexCol,
      t ? S.calendarPrintRoot : S.calendarScreenRoot,
    );
  }
  var ih = class extends Z {
      render() {
        let { contentGenerator: t, className: n } = this.props;
        if (t)
          return (0, ce.jsx)(le, {
            tag: 'span',
            style: { display: 'contents' },
            attrs: { 'aria-hidden': !0 },
            renderProps: {},
            generatorName: void 0,
            customGenerator: t,
          });
        if (n !== void 0)
          return (0, ce.jsx)('span', { 'aria-hidden': !0, className: n });
      }
    },
    sh = class extends Z {
      render() {
        let { props: t } = this,
          { options: n } = this.context,
          a = t.widgetGroups.map((o) => this.renderWidgetGroup(o));
        return (0, Fa.createElement)(
          'div',
          { className: w(n.toolbarSectionClass, { name: t.name }) },
          ...a,
        );
      }
      renderWidgetGroup(t) {
        let { props: n, context: a } = this,
          { options: o } = a,
          r = [],
          i = !0,
          s = !0;
        for (let l of t) {
          let { name: c, isView: u } = l;
          c === 'title' ? (i = !1) : u || (s = !1);
        }
        for (let l of t) {
          let { name: c, customElement: u, buttonHint: d } = l;
          if (c === 'title')
            r.push(
              (0, ce.jsx)('div', {
                role: 'heading',
                'aria-level': o.headingLevel,
                id: n.titleId,
                className: D(o.toolbarTitleClass),
                children: n.title,
              }),
            );
          else if (u)
            r.push(
              (0, ce.jsx)(le, {
                tag: 'span',
                style: { display: 'contents' },
                renderProps: {},
                generatorName: void 0,
                customGenerator: u,
              }),
            );
          else {
            let f = c === n.selectedButton,
              m =
                (!n.isTodayEnabled && c === 'today') ||
                (!n.isPrevEnabled && c === 'prev') ||
                (!n.isNextEnabled && c === 'next'),
              v = l.buttonDisplay ?? o.buttonDisplay;
            v === 'auto' &&
              (v = l.buttonIconContent || l.buttonIconClass ? 'icon' : 'text');
            let p;
            v !== 'text' &&
              (p = (0, ce.jsx)(ih, {
                className: l.buttonIconClass,
                contentGenerator: l.buttonIconContent,
              }));
            let E = t.length > 1 && i,
              g = E ? { hasSelection: s } : null,
              h = {
                name: c,
                text: l.buttonText,
                isPrimary: l.buttonIsPrimary,
                isSelected: f,
                isDisabled: m,
                isIconOnly: v === 'icon',
                buttonGroup: g,
              };
            r.push(
              (0, ce.jsx)(le, {
                tag: 'button',
                attrs: {
                  type: 'button',
                  disabled: m,
                  ...(i && s
                    ? { role: 'tab', 'aria-selected': f }
                    : { 'aria-pressed': f }),
                  'aria-label': typeof d == 'function' ? d(n.navUnit) : d,
                  onClick: l.buttonClick,
                },
                className: D(
                  w(o.buttonClass, h),
                  !m && S.cursorPointer,
                  E && D(f ? S.z1 : S.z0, S.focusZ2),
                ),
                renderProps: h,
                generatorName: void 0,
                classNameGenerator: l.buttonClass,
                didMount: l.buttonDidMount,
                willUnmount: l.buttonWillUnmount,
                children: () =>
                  v === 'text'
                    ? l.buttonText
                    : v === 'icon'
                      ? p
                      : v === 'icon-text'
                        ? (0, ce.jsxs)(ce.Fragment, {
                            children: [p, l.buttonText],
                          })
                        : (0, ce.jsxs)(ce.Fragment, {
                            children: [l.buttonText, p],
                          }),
              }),
            );
          }
        }
        return r.length > 1
          ? (0, Fa.createElement)(
              'div',
              {
                role: i && s ? 'tablist' : void 0,
                'aria-label': i && s ? o.viewChangeHint : void 0,
                className: D(
                  w(o.buttonGroupClass, { hasSelection: s }),
                  S.isolate,
                ),
              },
              ...r,
            )
          : r[0];
      }
    },
    Hc = class extends Z {
      render() {
        let { props: t } = this,
          n = this.context.options,
          { sectionWidgets: a } = t.model,
          { borderlessX: o, borderlessTop: r, borderlessBottom: i } = Tn(n),
          s = t.isHeader ? n.headerToolbarClass : n.footerToolbarClass;
        return (0, ce.jsxs)('div', {
          className: D(
            w(s, { borderlessX: o, borderlessTop: r, borderlessBottom: i }),
            w(n.toolbarClass, {
              borderlessX: o,
              borderlessTop: r,
              borderlessBottom: i,
            }),
          ),
          children: [
            this.renderSection('start', a.start),
            this.renderSection('center', a.center),
            this.renderSection('end', a.end),
          ],
        });
      }
      renderSection(t, n) {
        let { props: a } = this;
        return (0, ce.jsx)(
          sh,
          {
            name: t,
            widgetGroups: n,
            title: a.title,
            titleId: a.titleId,
            navUnit: a.navUnit,
            selectedButton: a.selectedButton,
            isTodayEnabled: a.isTodayEnabled,
            isPrevEnabled: a.isPrevEnabled,
            isNextEnabled: a.isNextEnabled,
          },
          t,
        );
      }
    },
    lh = class extends Ui {
      constructor(t) {
        (super(t),
          (this.handleSegClick = (n, a) => {
            let { component: o } = this,
              { context: r } = o,
              i = Oc(a);
            i &&
              o.isValidSegDownEl(n.target) &&
              r.emitter.trigger('eventClick', {
                el: a,
                event: new _e(o.context, i.def, i.instance),
                jsEvent: n,
                view: r.viewApi,
              });
          }),
          (this.destroy = Um(
            t.el,
            'click',
            `.${S.internalEvent}`,
            this.handleSegClick,
          )));
      }
    },
    ch = class extends Ui {
      constructor(t) {
        (super(t),
          (this.handleEventElRemove = (n) => {
            n === this.currentSegEl &&
              this.handleSegLeave(null, this.currentSegEl);
          }),
          (this.handleSegEnter = (n, a) => {
            Oc(a) &&
              ((this.currentSegEl = a),
              this.triggerEvent('eventMouseEnter', n, a));
          }),
          (this.handleSegLeave = (n, a) => {
            this.currentSegEl &&
              ((this.currentSegEl = null),
              this.triggerEvent('eventMouseLeave', n, a));
          }),
          (this.removeHoverListeners = BS(
            t.el,
            `.${S.internalEvent}`,
            this.handleSegEnter,
            this.handleSegLeave,
          )));
      }
      destroy() {
        this.removeHoverListeners();
      }
      triggerEvent(t, n, a) {
        let { component: o } = this,
          { context: r } = o,
          i = Oc(a);
        (!n || o.isValidSegDownEl(n.target)) &&
          r.emitter.trigger(t, {
            el: a,
            event: new _e(r, i.def, i.instance),
            jsEvent: n,
            view: r.viewApi,
          });
      }
    },
    Uc = class extends Pt {
      constructor() {
        (super(...arguments),
          (this.buildViewContext = k(MT)),
          (this.buildViewPropTransformers = k($w)),
          (this.interactionsStore = {}),
          (this.calendarInteractions = []),
          (this.registerInteractiveComponent = (t, n) => {
            let a = xT(t, n),
              r = [lh, ch];
            n.disableHits ||
              (r = r.concat(this.props.pluginHooks.componentInteractions));
            let i = r.map((s) => new s(a));
            ((this.interactionsStore[t.uid] = i), (nh[t.uid] = a));
          }),
          (this.unregisterInteractiveComponent = (t) => {
            let n = this.interactionsStore[t.uid];
            if (n) {
              for (let a of n) a.destroy();
              delete this.interactionsStore[t.uid];
            }
            delete nh[t.uid];
          }));
      }
      get viewTitleId() {
        return this.props.baseId + 'title';
      }
      render() {
        let { props: t } = this,
          { toolbarConfig: n, options: a } = t,
          o,
          r = !1,
          i;
        t.forPrint ||
          Ke(a) ||
          (a.height != null
            ? (r = !0)
            : a.contentHeight != null
              ? (o = a.contentHeight)
              : (i = Math.max(a.aspectRatio, 0.5)));
        let s = this.buildViewContext(
          t.viewSpec,
          t.viewApi,
          t.options,
          t.dateProfileGenerator,
          t.dateEnv,
          t.nowManager,
          t.pluginHooks,
          t.dispatch,
          t.getCurrentData,
          t.emitter,
          t.calendarApi,
          t.baseId,
          this.registerInteractiveComponent,
          this.unregisterInteractiveComponent,
        );
        return (0, ce.jsxs)(Mn.Provider, {
          value: s,
          children: [
            n.header &&
              (0, ce.jsx)(Hc, {
                model: n.header,
                isHeader: !0,
                titleId: this.viewTitleId,
                ...t.toolbarProps,
              }),
            (0, ce.jsxs)('div', {
              className: D(
                S.flexCol,
                S.rel,
                S.overflowAnchorNone,
                S.minHeight0,
                r && S.liquid,
              ),
              style: { height: o, aspectRatio: i != null ? String(i) : void 0 },
              children: [
                this.renderView(
                  D((r || o) && S.liquid, i != null && S.fill, S.internalView),
                ),
                this.buildAppendContent(),
              ],
            }),
            n.footer &&
              (0, ce.jsx)(Hc, {
                model: n.footer,
                isHeader: !1,
                ...t.toolbarProps,
              }),
          ],
        });
      }
      renderView(t) {
        let { props: n } = this,
          {
            pluginHooks: a,
            viewSpec: o,
            toolbarConfig: r,
            toolbarProps: i,
          } = n,
          s = {
            className: t,
            dateProfile: n.dateProfile,
            businessHours: n.businessHours,
            eventStore: n.renderableEventStore,
            eventUiBases: n.eventUiBases,
            dateSelection: n.dateSelection,
            eventSelection: n.eventSelection,
            eventDrag: n.eventDrag,
            eventResize: n.eventResize,
            forPrint: n.forPrint,
            labelId: r.header && r.header.hasTitle ? this.viewTitleId : void 0,
            labelStr: r.header && r.header.hasTitle ? void 0 : i.title,
          },
          l = this.buildViewPropTransformers(a.viewPropsTransformers),
          c = { ...n, toolbarProps: i, forPrint: n.forPrint };
        for (let d of l) Object.assign(s, d.transform(s, c));
        let u = o.component;
        return (0, ce.jsx)(u, { ...s });
      }
      buildAppendContent() {
        let { props: t } = this;
        return (0, ce.jsx)(ce.Fragment, {
          children: t.pluginHooks.viewContainerAppends.map((n, a) =>
            (0, ce.jsx)(Fa.Fragment, { children: n(t) }, a),
          ),
        });
      }
      componentDidMount() {
        let { props: t } = this;
        this.calendarInteractions = t.pluginHooks.calendarInteractions.map(
          (a) => new a(t),
        );
        let { propSetHandlers: n } = t.pluginHooks;
        for (let a in n) n[a](t[a], t);
        for (let a of t.pluginHooks.contextInit) a(t);
      }
      componentDidUpdate(t) {
        let { props: n } = this,
          { propSetHandlers: a } = n.pluginHooks;
        for (let o in a) n[o] !== t[o] && a[o](n[o], n);
      }
      componentWillUnmount() {
        let { props: t } = this;
        for (let n of this.calendarInteractions) n.destroy();
        ((this.calendarInteractions = []), t.emitter.trigger('_unmount'));
      }
    };
  function $w(e) {
    return e.map((t) => new t());
  }
  var kc = (0, Je.forwardRef)((e, t) => {
    let n = Iw(e.id),
      [a, o] = (0, Je.useState)('');
    function r(c, u) {
      (xw(u) ? WT.flushSync : Aw)(() => {
        o(Qe());
      });
    }
    let [i] = (0, Je.useState)(() => new Ac()),
      [s] = (0, Je.useState)(() => new xc({ calendarApi: i, onDataChange: r }));
    ((0, Je.useEffect)(
      () => () => {
        s.destroy();
      },
      [],
    ),
      (0, Je.useImperativeHandle)(t, () => ({ getApi: () => i }), []));
    let l = s.update(e);
    return (0, Yc.jsx)(Ic, {
      emitter: l.emitter,
      children: (c) => {
        let u = l.calendarOptions,
          d = u.direction === 'rtl',
          f = LT(u, c);
        return (0, Yc.jsx)('div', {
          dir: d ? 'rtl' : void 0,
          className: f,
          style: { height: u.height },
          'data-color-scheme': u.colorScheme || void 0,
          children: (0, Yc.jsx)(Uc, { ...l, baseId: n, forPrint: c }),
        });
      },
    });
  });
  function xw(e) {
    for (let t of e)
      if (
        t.type === 'SET_EVENT_DRAG' ||
        t.type === 'UNSET_EVENT_DRAG' ||
        t.type === 'SET_EVENT_RESIZE' ||
        t.type === 'UNSET_EVENT_RESIZE' ||
        t.type === 'MERGE_EVENTS'
      )
        return !0;
    return !1;
  }
  function Aw(e) {
    e();
  }
  var ZT = !1;
  function Iw(e) {
    if (Je.default.useId) return Je.default.useId();
    let [t] = (0, Je.useState)(() => Qe());
    return e
      ? e + ':'
      : (ZT ||
          ((ZT = !0),
          xt(
            'Missing `id` prop. Provide one for better SSR support in React 17.',
          )),
        `fc:${t}:`);
  }
  var It = F(Ae()),
    qt = 'text-[0.6875rem]/[1.090909]',
    Bc = 'size-5',
    Hw = 'outline-2',
    _c = 'focus-visible:outline-2',
    PT = 'outline-offset-2',
    qT = '-outline-offset-2',
    zc = 'outline-(--fc-classic-primary)',
    Uw =
      '[background:linear-gradient(var(--fc-classic-strong),var(--fc-classic-strong))_var(--fc-classic-background)]',
    n1 = 'hover:bg-(--fc-classic-muted) hover:cursor-pointer',
    VT = `${n1} focus-visible:bg-(--fc-classic-muted) active:bg-(--fc-classic-strong)`,
    a1 = 'hover:bg-(--fc-classic-faint)',
    Yw = `${a1} focus-visible:bg-(--fc-classic-faint) active:bg-(--fc-classic-muted)`,
    o1 = 'absolute hidden group-hover:block',
    jT = `${o1} inset-y-0 w-2`,
    GT = `${o1} inset-x-0 h-2`,
    r1 =
      'absolute size-2 border border-(--fc-event-color) bg-(--fc-classic-background) rounded-full',
    XT = `${r1} top-1/2 -mt-1`,
    QT = `${r1} left-1/2 -ml-1`,
    KT = (e) =>
      D(
        'border',
        e.isMajor
          ? 'border-(--fc-classic-strong-border)'
          : 'border-(--fc-classic-border)',
        e.isDisabled
          ? 'bg-(--fc-classic-faint)'
          : e.isToday && 'not-print:bg-(--fc-classic-today)',
      ),
    JT = (e) =>
      D('border border-(--fc-classic-border)', e.isMinor && 'border-dotted'),
    kw = {
      listItemEventClass: (e) =>
        D(
          'mb-px p-px rounded-sm',
          e.isNarrow ? 'mx-px' : 'mx-0.5',
          e.isSelected
            ? D('bg-(--fc-classic-muted)', e.isDragging && 'shadow-sm')
            : e.isInteractive
              ? VT
              : n1,
        ),
      listItemEventBeforeClass: (e) =>
        D(
          'border-[calc(var(--fc-classic-small-dot-width)/2)]',
          e.isNarrow ? 'mx-px' : 'mx-1',
        ),
      listItemEventInnerClass: (e) =>
        D(
          'flex flex-row items-center py-px gap-0.5 ',
          e.isNarrow ? qt : 'text-xs',
        ),
      listItemEventTimeClass:
        'px-px whitespace-nowrap overflow-hidden shrink-1',
      listItemEventTitleClass:
        'px-px font-bold whitespace-nowrap overflow-hidden shrink-100',
      rowEventClass: (e) =>
        D(
          e.isStart && D('rounded-s-sm', e.isNarrow ? 'ms-px' : 'ms-0.5'),
          e.isEnd && D('rounded-e-sm', e.isNarrow ? 'me-px' : 'me-0.5'),
        ),
      rowEventInnerClass: 'py-px gap-0.5',
      rowEventTimeClass: 'px-px',
      rowEventTitleClass: 'px-px',
      rowMoreLinkClass: (e) =>
        D(
          'mb-px border rounded-sm',
          e.isNarrow
            ? 'mx-px border-(--fc-classic-primary)'
            : 'self-start mx-0.5 border-transparent',
          VT,
        ),
      rowMoreLinkInnerClass: (e) => D('p-px', e.isNarrow ? qt : 'text-xs'),
    };
  function i1({ availableViews: e, addButton: t, buttons: n, views: a, ...o }) {
    return (0, It.jsx)(kc, {
      initialView: e[0],
      className: 'gap-5',
      viewClass: (r) => {
        let i = r.options.headerToolbar || !r.borderlessTop,
          s = r.options.footerToolbar || !r.borderlessBottom,
          l = !r.borderlessX;
        return D(
          'bg-(--fc-classic-background) text-(--fc-classic-foreground) border-(--fc-classic-border)',
          i && 'border-t',
          s && 'border-b',
          l && 'border-x',
        );
      },
      headerToolbar: {
        start: (t ? 'add ' : '') + 'today prev,next',
        center: 'title',
        end: e.join(','),
      },
      toolbarClass: (r) =>
        D(
          'flex flex-row flex-wrap items-center justify-between gap-3',
          r.borderlessX && 'px-3',
        ),
      toolbarSectionClass: 'shrink-0 flex flex-row items-center gap-3',
      toolbarTitleClass: 'text-2xl font-bold',
      buttonGroupClass: 'flex flex-row items-center',
      buttonClass: (r) =>
        D(
          'py-2 border-x flex flex-row items-center focus-visible:outline-3 outline-(--fc-classic-button-outline) print:bg-white text-sm text-(--fc-classic-button-foreground) print:text-black',
          r.isIconOnly ? 'px-2.5' : 'px-3',
          r.buttonGroup
            ? 'first:rounded-s-[4px] last:rounded-e-[4px]'
            : 'rounded-[4px]',
          r.isSelected
            ? 'border-(--fc-classic-button-strong-border) bg-(--fc-classic-button-strong)'
            : 'border-(--fc-classic-button-border) hover:border-(--fc-classic-button-strong-border) active:border-(--fc-classic-button-strong-border) print:border-(--fc-classic-button-strong-border) bg-(--fc-classic-button) hover:bg-(--fc-classic-button-strong) active:bg-(--fc-classic-button-strong)',
          r.isDisabled && 'opacity-65 pointer-events-none',
        ),
      buttons: {
        prev: { iconContent: () => e1(`${Bc} [[dir=rtl]_&]:rotate-180`) },
        next: {
          iconContent: () => e1(`${Bc} rotate-180 [[dir=rtl]_&]:rotate-0`),
        },
        prevYear: { iconContent: () => t1(`${Bc} [[dir=rtl]_&]:rotate-180`) },
        nextYear: {
          iconContent: () => t1(`${Bc} rotate-180 [[dir=rtl]_&]:rotate-0`),
        },
        ...n,
        add: t || {},
      },
      eventColor: 'var(--fc-classic-event)',
      eventContrastColor: 'var(--fc-classic-event-contrast)',
      eventClass: (r) =>
        D(
          r.isDragging && '',
          r.event.url && '',
          r.isSelected ? D(Hw, r.isDragging ? 'shadow-lg' : 'shadow-md') : _c,
          zc,
        ),
      backgroundEventColor: 'var(--fc-classic-background-event)',
      backgroundEventClass:
        'not-print:bg-[color-mix(in_oklab,var(--fc-event-color)_var(--fc-classic-background-event-opacity),transparent)] print:border-1 print:border-(--fc-event-color)',
      backgroundEventTitleClass: (r) =>
        D(
          'opacity-(--fc-classic-background-event-foreground-opacity) italic',
          r.isNarrow ? `p-0.5 ${qt}` : 'p-1.5 text-xs',
        ),
      listItemEventClass: 'items-center bg-(--fc-classic-primary) text-white',
      listItemEventBeforeClass: 'border-(--fc-event-color) rounded-full',
      blockEventClass: (r) =>
        D(
          'group relative border-transparent print:border-(--fc-event-color) bg-(--fc-event-color) print:bg-white',
          r.isDragging && !r.isSelected && 'opacity-75',
          PT,
        ),
      blockEventInnerClass: 'text-(--fc-event-contrast-color) print:text-black',
      blockEventTimeClass: 'whitespace-nowrap overflow-hidden shrink-1',
      blockEventTitleClass: 'whitespace-nowrap overflow-hidden shrink-100',
      rowEventClass: (r) =>
        D('mb-px border-y', r.isStart && 'border-s', r.isEnd && 'border-e'),
      rowEventBeforeClass: (r) =>
        D(r.isStartResizable && D(r.isSelected ? XT : jT, '-start-1')),
      rowEventAfterClass: (r) =>
        D(r.isEndResizable && D(r.isSelected ? XT : jT, '-end-1')),
      rowEventInnerClass: (r) =>
        D('flex flex-row items-center', r.isNarrow ? qt : 'text-xs'),
      rowEventTimeClass: 'font-bold',
      columnEventClass: (r) =>
        D(
          'border-x ring ring-(--fc-classic-background)',
          r.isStart && 'border-t rounded-t-sm',
          r.isEnd && 'mb-px border-b rounded-b-sm',
        ),
      columnEventBeforeClass: (r) =>
        D(r.isStartResizable && D(r.isSelected ? QT : GT, '-top-1')),
      columnEventAfterClass: (r) =>
        D(r.isEndResizable && D(r.isSelected ? QT : GT, '-bottom-1')),
      columnEventInnerClass: (r) =>
        D(
          'flex',
          r.isShort ? 'p-0.5 flex-row items-center gap-1' : 'px-0.5 flex-col',
        ),
      columnEventTimeClass: (r) => D(!r.isShort && 'pt-0.5', qt),
      columnEventTitleClass: (r) =>
        D(!r.isShort && 'py-0.5', r.isShort || r.isNarrow ? qt : 'text-xs'),
      moreLinkClass: `${_c} ${zc}`,
      moreLinkInnerClass: 'whitespace-nowrap overflow-hidden',
      columnMoreLinkClass: `mb-px rounded-sm border border-transparent print:border-black ${Uw} print:bg-white ring ring-(--fc-classic-background) ${PT}`,
      columnMoreLinkInnerClass: (r) => D('p-0.5', r.isNarrow ? qt : 'text-xs'),
      dayHeaderAlign: (r) => (r.inPopover ? 'start' : 'center'),
      dayHeaderClass: (r) =>
        D(
          'justify-center',
          r.isDisabled && 'bg-(--fc-classic-faint)',
          r.inPopover
            ? 'border-b border-(--fc-classic-border) bg-(--fc-classic-muted)'
            : D(
                'border',
                r.isMajor
                  ? 'border-(--fc-classic-strong-border)'
                  : 'border-(--fc-classic-border)',
              ),
        ),
      dayHeaderInnerClass: (r) =>
        D('mx-1 my-0.5 flex flex-col', r.isNarrow ? qt : 'text-sm'),
      dayHeaderDividerClass: 'border-b border-(--fc-classic-border)',
      dayCellClass: KT,
      dayCellTopClass: (r) =>
        D(r.isNarrow ? 'min-h-px' : 'min-h-0.5', 'flex flex-row justify-end'),
      dayCellTopInnerClass: (r) =>
        D(
          'mx-1 whitespace-nowrap',
          r.isNarrow ? `my-0.5 ${qt}` : 'my-1 text-sm',
          r.isOther && 'text-(--fc-classic-faint-foreground)',
          r.monthText && 'font-bold',
        ),
      dayCellInnerClass: (r) => D(r.inPopover && 'p-2'),
      popoverClass:
        'bg-(--fc-classic-background) text-(--fc-classic-foreground) border border-(--fc-classic-border) shadow-md min-w-55',
      popoverCloseClass: `group absolute top-0.5 end-0.5 ${_c} ${zc}`,
      popoverCloseContent: () =>
        Bw('size-5 text-sm not-group-hover:opacity-65'),
      dayLaneClass: KT,
      dayLaneInnerClass: (r) =>
        D(r.isStack ? 'm-1' : r.isNarrow ? 'mx-px' : 'ms-0.5 me-[2.5%]'),
      slotLaneClass: JT,
      listDayHeaderClass:
        'border-b border-(--fc-classic-border) bg-(--fc-classic-list-header) -mb-px flex flex-row items-center justify-between text-(--fc-classic-primary)',
      listDayHeaderInnerClass: 'px-3 py-2 text-sm font-bold',
      singleMonthClass: (r) =>
        D(
          r.multiMonthColumns > 1 && 'm-4',
          r.multiMonthColumns === 1 &&
            !r.isLast &&
            'border-b border-(--fc-classic-border)',
        ),
      singleMonthHeaderClass: (r) =>
        D(
          r.multiMonthColumns > 1
            ? 'pb-4'
            : 'py-2 border-b border-(--fc-classic-border) bg-(--fc-classic-background)',
          'items-center',
        ),
      singleMonthHeaderInnerClass: 'text-base font-bold',
      tableHeaderClass: 'bg-(--fc-classic-background)',
      fillerClass: 'border border-(--fc-classic-border) opacity-50',
      dayHeaderRowClass: 'border border-(--fc-classic-border)',
      dayRowClass: 'border border-(--fc-classic-border)',
      slotHeaderRowClass: 'border border-(--fc-classic-border)',
      slotHeaderClass: JT,
      navLinkClass: `hover:underline ${_c} ${qT} ${zc}`,
      inlineWeekNumberClass: (r) =>
        D(
          'absolute top-0 start-0 rounded-ee-sm p-0.5 text-center text-(--fc-classic-muted-foreground) bg-(--fc-classic-muted)',
          r.isNarrow ? qt : 'text-sm',
        ),
      nonBusinessHoursClass: 'bg-(--fc-classic-faint)',
      highlightClass: 'bg-(--fc-classic-highlight)',
      views: {
        ...a,
        dayGrid: { ...kw, dayCellBottomClass: 'min-h-px', ...a?.dayGrid },
        list: {
          listDayClass: (r) =>
            D(
              'flex flex-col',
              !r.isLast && 'border-b border-(--fc-classic-border)',
            ),
          listItemEventClass: (r) =>
            D(
              'group px-3 py-2 gap-3 border-t border-(--fc-classic-border) bg-transparent',
              r.isInteractive ? D(Yw, qT) : a1,
            ),
          listItemEventBeforeClass:
            'border-[calc(var(--fc-classic-large-dot-width)/2)]',
          listItemEventInnerClass: () => D('text-black [display:contents]'),
          listItemEventTimeClass:
            '-order-1 shrink-0 w-1/2 max-w-50 whitespace-nowrap overflow-hidden text-ellipsis text-sm',
          listItemEventTitleClass: (r) =>
            D(
              'grow min-w-0 whitespace-nowrap overflow-hidden text-sm',
              r.event.url && 'group-hover:underline',
            ),
          noEventsClass:
            'bg-(--fc-classic-muted) flex flex-col items-center justify-center',
          noEventsInnerClass: 'sticky bottom-0 py-15',
          ...a?.list,
        },
      },
      ...o,
    });
  }
  function e1(e) {
    return (0, It.jsx)('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      className: e,
      width: '20',
      height: '20',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      children: (0, It.jsx)('polyline', { points: '15 18 9 12 15 6' }),
    });
  }
  function t1(e) {
    return (0, It.jsxs)('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      className: e,
      width: '20',
      height: '20',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      children: [
        (0, It.jsx)('polyline', { points: '11 17 6 12 11 7' }),
        (0, It.jsx)('polyline', { points: '18 17 13 12 18 7' }),
      ],
    });
  }
  function Bw(e) {
    return (0, It.jsxs)('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      className: e,
      width: '20',
      height: '20',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      children: [
        (0, It.jsx)('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
        (0, It.jsx)('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
      ],
    });
  }
  var Uh = F(Ae(), 1);
  var f1 = F(dt(), 1);
  var de = F(Ae(), 1);
  function s1(e) {
    let t = e.getRootNode();
    return t instanceof Document ? t.body || t.documentElement : t;
  }
  function or(e) {
    return getComputedStyle(e).direction === 'rtl';
  }
  var _w = /(top|left|right|bottom|width|height)$/i;
  function l1(e, t) {
    for (let n in t) zw(e, n, t[n]);
  }
  function zw(e, t, n) {
    n == null
      ? (e.style[t] = '')
      : typeof n == 'number' && _w.test(t)
        ? (e.style[t] = `${n}px`)
        : (e.style[t] = n);
  }
  function c1(e) {
    return e.composedPath?.()[0] ?? e.target;
  }
  var d1 = F(to(), 1);
  var Pa = class extends f1.Component {
    constructor(t, n) {
      (super(t, n),
        (this.handleChange = () => {
          this.forceUpdate();
        }),
        (this.runner = new tr(this.handleChange)));
    }
    render() {
      let { props: t, context: n } = this,
        { nowDate: a, todayRange: o } = this.runner.update({
          nowManager: n.nowManager,
          unit: t.unit,
          unitValue: t.unitValue,
          nowIndicatorSnap: n.options.nowIndicatorSnap,
          dateEnv: n.dateEnv,
        });
      return t.children(a, o);
    }
    componentWillUnmount() {
      this.runner.destroy();
    }
  };
  Pa.contextType = Mn;
  var Fc = ee({ year: 'numeric', month: 'long', day: 'numeric' }),
    Lw = ee({ week: 'long' }),
    ir = ee({ weekday: 'long' });
  function qa(e) {
    for (let t of e) if (t.type === 'weekday') return t.value;
    return '';
  }
  function Va(e) {
    for (let t of e) if (t.type === 'day') return t.value;
    return '';
  }
  function gh(e) {
    for (let t of e) if (t.type === 'month') return t.value;
    return '';
  }
  function ja(e, t, n = 'day') {
    return ve(e.dateEnv.formatToParts(t, n === 'week' ? Lw : Fc));
  }
  function sr(e, t, n = 'day', a = ja(e, t, n), o = !0) {
    let { dateEnv: r, options: i, calendarApi: s } = e,
      l = r.toDate(t),
      c = (u) => {
        let d =
          n === 'day'
            ? i.navLinkDayClick
            : n === 'week'
              ? i.navLinkWeekClick
              : null;
        typeof d == 'function'
          ? d.call(s, r.toDate(t), u)
          : (typeof d == 'string' && (n = d), s.zoomTo(t, n));
      };
    return {
      role: 'link',
      'aria-label': We(i.navLinkHint, [a, l], a),
      className: D(i.navLinkClass, S.cursorPointer, S.internalNavLink),
      ...(o ? $i(c) : { onClick: c }),
    };
  }
  function lr(e, t, n, a, o) {
    let r = !!(n && (!n.activeRange || !$t(n.activeRange, e)));
    return {
      date: t.toDate(e),
      dow: e.getUTCDay(),
      isDisabled: r,
      isOther: !r && !!(n && !$t(n.currentRange, e)),
      isToday: !r && !!(a && $t(a, e)),
      isPast: !r && !!(o ? e < o : a && e < a.start),
      isFuture: !r && !!(o ? e > o : a && e >= a.end),
    };
  }
  function Zc(e, t) {
    return e != null && (e === t || Math.abs(e - t) < 0.01);
  }
  var Zw = !0,
    fh = new Map(),
    dh = new Set(),
    mh = !1,
    uh = !1;
  function Ga(e) {
    (dh.add(e),
      !mh &&
        !uh &&
        ((uh = !0),
        requestAnimationFrame(() => {
          ((uh = !1), m1());
        })));
  }
  function m1() {
    for (let e of dh.values()) (e(), dh.delete(e));
  }
  var Lc =
    typeof ResizeObserver < 'u' &&
    new ResizeObserver((e) => {
      mh = !0;
      for (let t of e) {
        let n = t.target,
          a = fh.get(n),
          o,
          r;
        if (t.borderBoxSize && Zw) {
          let s = t.borderBoxSize[0] || t.borderBoxSize;
          ((o = s.inlineSize), (r = s.blockSize));
        } else ({ width: o, height: r } = n.getBoundingClientRect());
        let i = !1;
        (Zc(a.width, o) || ((a.width = o), (i = a.watchWidth)),
          Zc(a.height, r) || ((a.height = r), i || (i = a.watchHeight)),
          i && a.callback(o, r));
      }
      (0, d1.flushSync)(() => {
        (m1(), (mh = !1));
      });
    });
  function Yi(e, t, n = !0, a = !0) {
    return (
      fh.set(e, { callback: t, watchWidth: n, watchHeight: a }),
      Lc && Lc.observe(e, { box: 'border-box' }),
      () => {
        (fh.delete(e), Lc && Lc.unobserve(e));
      }
    );
  }
  function ph(e, t) {
    return Yi(e, t, !0);
  }
  function cr(e, t) {
    return Yi(e, (n, a) => t(a), !1, !0);
  }
  var rr = class extends Z {
    constructor() {
      (super(...arguments), (this.refineRenderProps = la(Ww)));
    }
    render() {
      let { props: t, context: n } = this,
        { options: a, viewSpec: o } = n,
        r = this.refineRenderProps({
          ...Tn(a),
          options: {
            headerToolbar: a.headerToolbar,
            footerToolbar: a.footerToolbar,
          },
          isHeightAuto: Ke(a),
          viewApi: n.viewApi,
        });
      return (0, de.jsx)(le, {
        elRef: t.elRef,
        tag: t.tag || 'div',
        attrs: t.attrs,
        style: t.style,
        className: D(
          t.className,
          w(a.viewClass, r),
          w(o.optionDefaults.class, r),
          w(o.optionDefaults.className, r),
          w(o.optionOverrides.class, r),
          w(o.optionOverrides.className, r),
        ),
        renderProps: r,
        generatorName: void 0,
        didMount: a.didMount || a.viewDidMount,
        willUnmount: a.willUnmount || a.viewWillUnmount,
        children: () => t.children,
      });
    }
  };
  function Ww(e) {
    return {
      view: e.viewApi,
      borderlessX: e.borderlessX,
      borderlessTop: e.borderlessTop,
      borderlessBottom: e.borderlessBottom,
      options: e.options,
      isHeightAuto: e.isHeightAuto,
    };
  }
  var En = class extends Z {
      constructor() {
        (super(...arguments), (this.uid = Qe()));
      }
      prepareHits() {}
      queryHit(t, n, a, o, r) {
        return null;
      }
      isValidSegDownEl(t) {
        return (
          !this.props.eventDrag &&
          !this.props.eventResize &&
          !t.closest(`.${S.internalEventMirror}`)
        );
      }
      isValidDateDownEl(t) {
        return (
          !t.closest(`.${S.internalEvent}:not(.${S.internalBgEvent})`) &&
          !t.closest(`.${S.internalMoreLink}`) &&
          !t.closest(`.${S.internalNavLink}`) &&
          !t.closest(`.${S.internalPopover}`)
        );
      }
    },
    Wc = class {
      constructor(t) {
        ((this.drainedOption = t),
          (this.isRunning = !1),
          (this.isDirty = !1),
          (this.pauseDepths = {}),
          (this.timeoutId = 0));
      }
      request(t) {
        ((this.isDirty = !0),
          this.isPaused() ||
            (this.clearTimeout(),
            t == null
              ? this.tryDrain()
              : (this.timeoutId = setTimeout(this.tryDrain.bind(this), t))));
      }
      pause(t = '') {
        let { pauseDepths: n } = this;
        ((n[t] = (n[t] || 0) + 1), this.clearTimeout());
      }
      resume(t = '', n) {
        let { pauseDepths: a } = this;
        t in a &&
          (n ? delete a[t] : ((a[t] -= 1), a[t] <= 0 && delete a[t]),
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
        this.timeoutId && (clearTimeout(this.timeoutId), (this.timeoutId = 0));
      }
      drained() {
        this.drainedOption && this.drainedOption();
      }
    },
    hh = class {
      constructor(t) {
        ((this.el = t),
          (this.emitter = new ar()),
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
              this.emitter.trigger('scroll', this.getIsDevice()),
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
          (this.wheelWaiter = new Wc(this.handleWheelWait)),
          (this.scrollWaiter = new Wc(this.handleScrollWait)),
          t.addEventListener('scroll', this.handleScroll, { passive: !0 }),
          t.addEventListener('wheel', this.handleWheel, { passive: !0 }),
          t.addEventListener('mousedown', this.handleMouseDown),
          t.addEventListener('mouseup', this.handleMouseUp),
          t.addEventListener('touchstart', this.handleTouchStart, {
            passive: !0,
          }),
          t.addEventListener('touchend', this.handleTouchEnd));
      }
      destroy() {
        let { el: t } = this;
        (t.removeEventListener('scroll', this.handleScroll, { passive: !0 }),
          t.removeEventListener('wheel', this.handleWheel, { passive: !0 }),
          t.removeEventListener('mousedown', this.handleMouseDown),
          t.removeEventListener('mouseup', this.handleMouseUp),
          t.removeEventListener('touchstart', this.handleTouchStart, {
            passive: !0,
          }),
          t.removeEventListener('touchend', this.handleTouchEnd));
      }
      startScroll() {
        this.isScroll ||
          ((this.isScroll = !0),
          this.emitter.trigger('scrollStart', this.getIsDevice()));
      }
      endScroll() {
        this.isScroll &&
          (this.scrollWaiter.clear(),
          this.wheelWaiter.clear(),
          (this.isScroll = !1),
          (this.isWheelRecent = !1),
          this.emitter.trigger('scrollEnd', this.getIsDevice()),
          (this.isMouse = !1),
          (this.isTouch = !1),
          (this.isWheel = !1));
      }
      getIsDevice() {
        return this.isWheel || this.isMouse || this.isTouch;
      }
    },
    On = class extends En {
      constructor() {
        (super(...arguments),
          (this.handleEl = (t) => {
            (this.el &&
              ((this.el = null),
              (this._isUnmounting = !0),
              this.listener.destroy()),
              t &&
                ((this.el = t),
                (this._isUnmounting = !1),
                (this.listener = new hh(t))));
          }),
          (this.handleHRuler = (t) => {
            (this.disconnectHRuler &&
              (this.disconnectHRuler(),
              (this.disconnectHRuler = void 0),
              this.clientWidth !== void 0 &&
                ((this.clientWidth = void 0),
                V(this.props.clientWidthRef, null))),
              t &&
                (this.disconnectHRuler = ph(t, (n) => {
                  this._isUnmounting ||
                    (n !== this.clientWidth &&
                      ((this.clientWidth = n),
                      V(this.props.clientWidthRef, n)));
                })));
          }),
          (this.handleVRuler = (t) => {
            (this.disconnectVRuler &&
              (this.disconnectVRuler(),
              (this.disconnectVRuler = void 0),
              this.clientHeight !== void 0 &&
                ((this.clientHeight = void 0),
                V(this.props.clientHeightRef, null))),
              t &&
                (this.disconnectVRuler = cr(t, (n) => {
                  if (this._isUnmounting) return;
                  n !== this.clientHeight &&
                    ((this.clientHeight = n), V(this.props.clientHeightRef, n));
                  let a = Math.round(
                    this.el.getBoundingClientRect().height - n,
                  );
                  a !== this.bottomScrollbarWidth &&
                    ((this.bottomScrollbarWidth = a),
                    V(this.props.bottomScrollbarWidthRef, a));
                })));
          }));
      }
      render() {
        let { props: t } = this,
          n = t.horizontal || t.vertical ? 'hidden' : '';
        return (0, de.jsxs)('div', {
          ref: this.handleEl,
          className: D(
            t.className,
            S.noPadding,
            S.rel,
            t.hideScrollbars && S.noScrollbars,
            S.internalScroller,
          ),
          style: {
            ...t.style,
            overflowX: t.horizontal ? 'auto' : n,
            overflowY: t.vertical ? 'auto' : n,
          },
          children: [
            t.children,
            !!t.clientWidthRef &&
              (0, de.jsx)('div', {
                ref: this.handleHRuler,
                className: S.fillTop,
              }),
            !!(t.clientHeightRef || t.bottomScrollbarWidthRef) &&
              (0, de.jsx)('div', {
                ref: this.handleVRuler,
                className: S.fillStart,
              }),
          ],
        });
      }
      endScroll() {
        this.listener.endScroll();
      }
      get x() {
        let { el: t } = this;
        return t ? Fw(t) : 0;
      }
      get y() {
        let { el: t } = this;
        return t ? t.scrollTop : 0;
      }
      scrollTo({ x: t, y: n }) {
        let { el: a } = this;
        a && (n != null && (a.scrollTop = n), t != null && Pw(a, t));
      }
      addScrollStartListener(t) {
        this.listener.emitter.on('scrollStart', t);
      }
      removeScrollStartListener(t) {
        this.listener.emitter.off('scrollStart', t);
      }
      addScrollEndListener(t) {
        this.listener.emitter.on('scrollEnd', t);
      }
      removeScrollEndListener(t) {
        this.listener.emitter.off('scrollEnd', t);
      }
    };
  function Fw(e) {
    let { scrollLeft: t } = e;
    return or(e) ? qw(t, e) : t;
  }
  function Pw(e, t) {
    let n = or(e);
    e.scrollLeft = n ? Vw(t, e) : t;
  }
  function qw(e, t) {
    switch (h1()) {
      case 'positive':
        return t.scrollWidth - t.clientWidth - e;
      case 'negative':
        return -e;
    }
    return e;
  }
  function Vw(e, t) {
    switch (h1()) {
      case 'positive':
        return t.scrollWidth - t.clientWidth - e;
      case 'negative':
        return -e;
    }
    return e;
  }
  var u1;
  function h1() {
    return u1 || (u1 = jw());
  }
  function jw() {
    let e = document.createElement('div');
    ((e.style.position = 'absolute'),
      (e.style.top = '-1000px'),
      (e.style.width = '100px'),
      (e.style.height = '100px'),
      (e.style.overflow = 'scroll'),
      (e.style.direction = 'rtl'));
    let t = document.createElement('div');
    ((t.style.width = '200px'),
      (t.style.height = '200px'),
      e.appendChild(t),
      document.body.appendChild(e));
    let n;
    return (
      e.scrollLeft > 0
        ? (n = 'positive')
        : ((e.scrollLeft = 50),
          e.scrollLeft > 0 ? (n = 'reverse') : (n = 'negative')),
      e.remove(),
      n
    );
  }
  var ca = class extends Z {
    constructor() {
      (super(...arguments),
        (this.buildPublicEvent = k((t, n, a) => new _e(t, n, a))),
        (this.handleEl = (t) => {
          ((this.el = t),
            V(this.props.elRef, t),
            t && Jo(t, this.props.eventRange));
        }));
    }
    render() {
      let { props: t, context: n } = this,
        { options: a } = n,
        { eventRange: o } = t,
        r = o.ui,
        i = a.eventTimeFormat || t.defaultTimeFormat,
        s =
          t.forcedTimeText ??
          nT(
            i,
            o,
            t.slicedStart,
            t.slicedEnd,
            t.isStart,
            t.isEnd,
            n,
            t.defaultDisplayEventTime,
            t.defaultDisplayEventEnd,
          ),
        [l, c, u] = aT(o, n),
        d = this.buildPublicEvent(n, o.def, o.instance),
        f = !t.disableDragging && tT(o, n),
        m = /row|column/.test(t.display),
        v = {
          event: d,
          isNarrow: t.isNarrow || !1,
          isShort: t.isShort || !1,
          timeText: s,
        },
        p = {
          event: d,
          view: n.viewApi,
          timeText: s,
          color: r.color || a.eventColor,
          contrastColor: r.contrastColor || a.eventContrastColor,
          isDraggable: f,
          isStartResizable:
            !t.disableResizing &&
            t.isStart &&
            r.durationEditable &&
            a.eventResizableFromStart,
          isEndResizable: !t.disableResizing && t.isEnd && r.durationEditable,
          isMirror: t.isMirror,
          isStart: !!t.isStart,
          isEnd: !!t.isEnd,
          isFirst: !!t.isFirst,
          isLast: !!t.isLast,
          isPast: !!t.isPast,
          isFuture: !!t.isFuture,
          isToday: !!t.isToday,
          isSelected: !!t.isSelected,
          isDragging: !!t.isDragging,
          isResizing: !!t.isResizing,
          isInteractive: u,
          isNarrow: t.isNarrow || !1,
          isShort: t.isShort || !1,
          level: t.level || 0,
          timeClass: D(
            w(a.eventTimeClass, v),
            m && w(a.blockEventTimeClass, v),
            t.display === 'row' && w(a.rowEventTimeClass, v),
            t.display === 'column' && w(a.columnEventTimeClass, v),
            t.display === 'list-item' && w(a.listItemEventTimeClass, v),
          ),
          titleClass: D(
            w(a.eventTitleClass, v),
            m && w(a.blockEventTitleClass, v),
            t.display === 'row' && w(a.rowEventTitleClass, v),
            t.display === 'column' && w(a.columnEventTitleClass, v),
            t.display === 'list-item' && w(a.listItemEventTitleClass, v),
            t.display === 'row' && a.rowEventTitleSticky && S.stickyS,
            t.display === 'column' && a.columnEventTitleSticky && S.stickyT,
          ),
          options: { eventOverlap: !!a.eventOverlap },
        },
        E = D(
          m && w(a.blockEventClass, p),
          t.display === 'row' && w(a.rowEventClass, p),
          t.display === 'column' && w(a.columnEventClass, p),
          t.display === 'list-item' && w(a.listItemEventClass, p),
          r.className,
          t.className,
          t.display === 'column' ? S.flexCol : S.flexRow,
          (o.def.url || f) && S.cursorPointer,
          S.internalEvent,
          t.isMirror && S.internalEventMirror,
          f && S.internalEventDraggable,
          p.isSelected && S.internalEventSelected,
          (p.isStartResizable || p.isEndResizable) && S.internalEventResizable,
        ),
        g = D(
          w(a.eventBeforeClass, p),
          m && w(a.blockEventBeforeClass, p),
          t.display === 'row' && w(a.rowEventBeforeClass, p),
          t.display === 'column' && w(a.columnEventBeforeClass, p),
          t.display === 'list-item' && w(a.listItemEventBeforeClass, p),
        ),
        h = D(
          w(a.eventAfterClass, p),
          m && w(a.blockEventAfterClass, p),
          t.display === 'row' && w(a.rowEventAfterClass, p),
          t.display === 'column' && w(a.columnEventAfterClass, p),
          t.display === 'list-item' && w(a.listItemEventAfterClass, p),
        ),
        y = D(
          w(a.eventInnerClass, p),
          m && w(a.blockEventInnerClass, p),
          t.display === 'row' && w(a.rowEventInnerClass, p),
          t.display === 'column' && w(a.columnEventInnerClass, p),
          t.display === 'list-item' && w(a.listItemEventInnerClass, p),
          !t.disableLiquid && S.liquid,
        ),
        b = t.display === 'row' && a.rowEventBeforeContent,
        O = t.display === 'row' && a.rowEventAfterContent;
      return (0, de.jsx)(le, {
        tag: l,
        attrs: {
          ...t.attrs,
          ...c,
          dir: t.isDragging && a.direction === 'rtl' ? 'rtl' : void 0,
        },
        className: E,
        style: {
          '--fc-event-color': p.color,
          '--fc-event-contrast-color': p.contrastColor,
        },
        elRef: this.handleEl,
        renderProps: p,
        generatorName: 'eventContent',
        customGenerator: a.eventContent,
        defaultGenerator: Gw,
        classNameGenerator: a.eventClass,
        didMount: a.eventDidMount,
        willUnmount: a.eventWillUnmount,
        children: (x) =>
          (0, de.jsxs)(de.Fragment, {
            children: [
              !!(p.isSelected && m) &&
                (0, de.jsx)('div', {
                  className: t.display === 'column' ? S.hitX : S.hitY,
                }),
              (g || b) &&
                (0, de.jsxs)('div', {
                  className: D(
                    g,
                    !t.disableZindexes && S.z1,
                    p.isStartResizable &&
                      D(
                        t.display === 'column'
                          ? S.cursorResizeT
                          : S.cursorResizeS,
                        S.internalEventResizer,
                        S.internalEventResizerStart,
                      ),
                  ),
                  children: [
                    b &&
                      (0, de.jsx)(le, {
                        tag: 'div',
                        style: { display: 'contents' },
                        attrs: { 'aria-hidden': !0 },
                        renderProps: p,
                        generatorName: void 0,
                        customGenerator: b,
                      }),
                    !!(p.isStartResizable && p.isSelected) &&
                      (0, de.jsx)('div', { className: S.hit }),
                  ],
                }),
              (0, de.jsx)(x, {
                tag: 'div',
                className: D(y, !t.disableZindexes && S.z0),
              }),
              (h || O) &&
                (0, de.jsxs)('div', {
                  className: D(
                    h,
                    !t.disableZindexes && S.z1,
                    p.isEndResizable &&
                      D(
                        t.display === 'column'
                          ? S.cursorResizeB
                          : S.cursorResizeE,
                        S.internalEventResizer,
                        S.internalEventResizerEnd,
                      ),
                  ),
                  children: [
                    O &&
                      (0, de.jsx)(le, {
                        tag: 'div',
                        style: { display: 'contents' },
                        attrs: { 'aria-hidden': !0 },
                        renderProps: p,
                        generatorName: void 0,
                        customGenerator: O,
                      }),
                    !!(p.isEndResizable && p.isSelected) &&
                      (0, de.jsx)('div', { className: S.hit }),
                  ],
                }),
            ],
          }),
      });
    }
    componentDidUpdate(t) {
      this.el &&
        this.props.eventRange !== t.eventRange &&
        Jo(this.el, this.props.eventRange);
    }
  };
  ca.addPropsEquality({ seg: Ft });
  function Gw(e) {
    return (0, de.jsxs)(de.Fragment, {
      children: [
        e.timeText &&
          (0, de.jsx)('div', { className: e.timeClass, children: e.timeText }),
        (0, de.jsx)('div', {
          className: e.titleClass,
          children:
            e.event.title || (0, de.jsx)(de.Fragment, { children: '\xA0' }),
        }),
      ],
    });
  }
  var A = F(Ae(), 1),
    Cn = F(dt(), 1);
  var M1 = F(to(), 1);
  function Xw(e, t) {
    let n = {
      left: Math.max(e.left, t.left),
      right: Math.min(e.right, t.right),
      top: Math.max(e.top, t.top),
      bottom: Math.min(e.bottom, t.bottom),
    };
    return n.left < n.right && n.top < n.bottom ? n : !1;
  }
  function g1(e) {
    let t = Qw(e),
      n = e.getBoundingClientRect();
    for (let a of t) {
      let o = Xw(n, a.getBoundingClientRect());
      if (o) n = o;
      else return null;
    }
    return n;
  }
  function Qw(e) {
    let t = [];
    for (; e instanceof HTMLElement; ) {
      let n = window.getComputedStyle(e);
      if (n.position === 'fixed') break;
      (/(auto|scroll)/.test(n.overflow + n.overflowY + n.overflowX) &&
        t.push(e),
        (e = e.parentNode));
    }
    return t;
  }
  var Sh = class {
    constructor() {
      ((this.sliceBusinessHours = k(this._sliceBusinessHours)),
        (this.sliceDateSelection = k(this._sliceDateSpan)),
        (this.sliceEventStore = k(this._sliceEventStore)),
        (this.sliceEventDrag = k(this._sliceInteraction)),
        (this.sliceEventResize = k(this._sliceInteraction)),
        (this.forceDayIfListItem = !1));
    }
    sliceProps(t, n, a, o, ...r) {
      let { eventUiBases: i } = t,
        s = this.sliceEventStore(t.eventStore, i, n, a, ...r);
      return {
        dateSelectionSegs: this.sliceDateSelection(
          t.dateSelection,
          n,
          a,
          i,
          o,
          ...r,
        ),
        businessHourSegs: this.sliceBusinessHours(
          t.businessHours,
          n,
          a,
          o,
          ...r,
        ),
        fgEventSegs: s.fg,
        bgEventSegs: s.bg,
        eventDrag: this.sliceEventDrag(t.eventDrag, i, n, a, ...r),
        eventResize: this.sliceEventResize(t.eventResize, i, n, a, ...r),
        eventSelection: t.eventSelection,
      };
    }
    sliceNowDate(t, n, a, o, ...r) {
      return this._sliceDateSpan(
        { range: { start: t, end: bn(t, 1) }, allDay: !1 },
        n,
        a,
        {},
        o,
        ...r,
      );
    }
    _sliceBusinessHours(t, n, a, o, ...r) {
      return t
        ? this._sliceEventStore(Wa(t, Pc(n, !!a), o), {}, n, a, ...r).bg
        : [];
    }
    _sliceEventStore(t, n, a, o, ...r) {
      if (t) {
        let i = Ai(t, n, Pc(a, !!o), o);
        return {
          bg: this.sliceEventRanges(i.bg, r),
          fg: this.sliceEventRanges(i.fg, r),
        };
      }
      return { bg: [], fg: [] };
    }
    _sliceInteraction(t, n, a, o, ...r) {
      if (!t) return null;
      let i = Ai(t.mutatedEvents, n, Pc(a, !!o), o);
      return {
        segs: this.sliceEventRanges(i.fg, r),
        affectedInstances: t.affectedEvents.instances,
        isEvent: t.isEvent,
      };
    }
    _sliceDateSpan(t, n, a, o, r, ...i) {
      if (!t) return [];
      let s = Pc(n, !!a),
        l = Rt(t.range, s);
      if (l) {
        t = { ...t, range: l };
        let c = XS(t, o, r),
          u = this.sliceRange(t.range, ...i);
        for (let d of u) d.eventRange = c;
        return u;
      }
      return [];
    }
    sliceEventRanges(t, n) {
      let a = [];
      for (let o of t) a.push(...this.sliceEventRange(o, n));
      return a;
    }
    sliceEventRange(t, n) {
      let a = t.range;
      this.forceDayIfListItem &&
        t.ui.display === 'list-item' &&
        (a = { start: a.start, end: ne(a.start, 1) });
      let o = this.sliceRange(a, ...n);
      for (let r of o)
        ((r.eventRange = t),
          (r.isStart = t.isStart && r.isStart),
          (r.isEnd = t.isEnd && r.isEnd));
      return o;
    }
  };
  function Pc(e, t) {
    let n = e.activeRange;
    return t
      ? n
      : {
          start: bn(n.start, e.slotMinTime.milliseconds),
          end: bn(n.end, e.slotMaxTime.milliseconds - 864e5),
        };
  }
  var Vc = class extends Sh {
      constructor() {
        (super(...arguments), (this.forceDayIfListItem = !0));
      }
      sliceRange(t, n) {
        return n.sliceRange(t);
      }
    },
    Kw = new Date(2592e5);
  function E1(e, t, n, a, o, r) {
    let i = Jw(e, t, n, a, o, r),
      s = Jm(n, r.dateEnv);
    if (t && s !== 'day')
      for (let l of i.dataConfigs)
        eh(l.dateMarker, s, r.dateEnv) && (l.renderProps.isMajor = !0);
    return [i];
  }
  function Jw(e, t, n, a, o, r, i, s) {
    return {
      isDateRow: !0,
      renderConfig: eR(o, t, r),
      dataConfigs: tR(e, t, n, a, o, r, i, void 0, void 0, void 0, void 0, s),
    };
  }
  function eR(e, t, n) {
    let { options: a } = n;
    return {
      generatorName: 'dayHeaderContent',
      customGenerator: a.dayHeaderContent,
      classNameGenerator: a.dayHeaderClass,
      innerClassNameGenerator: a.dayHeaderInnerClass,
      didMount: a.dayHeaderDidMount,
      willUnmount: a.dayHeaderWillUnmount,
      align: a.dayHeaderAlign,
      sticky: a._dayHeaderSticky,
      dayHeaderFormat: e,
      datesRepDistinctDays: t,
    };
  }
  var O1 = [];
  for (let e = 0; e < 7; e++) O1.push(ne(new Date(2592e5), e));
  function tR(e, t, n, a, o, r, i = 1, s = '', l = {}, c = {}, u = '', d) {
    let { dateEnv: f, viewApi: m, options: v } = r;
    return t
      ? e.map((p, E) => {
          let g = lr(p, f, n, a),
            h = d != null && !(E % d),
            y = v.navLinks && !g.isDisabled && e.length > 1,
            b = {
              ...g,
              ...l,
              isMajor: h,
              isSticky: !1,
              inPopover: !1,
              hasNavLink: y,
              view: m,
            },
            O = ja(r, p);
          return {
            key: s + p.toUTCString(),
            dateMarker: p,
            renderProps: b,
            attrs: {
              'aria-label': O,
              ...(g.isToday ? { 'aria-current': 'date' } : {}),
              'data-date': Ba(p),
              ...c,
            },
            innerAttrs: y ? sr(r, p, void 0, O) : { 'aria-hidden': !0 },
            colSpan: i,
            hasNavLink: y,
            className: u,
          };
        })
      : e.map((p, E) => {
          let g = p.getUTCDay(),
            h = ne(Kw, g),
            y = {
              date: f.toDate(p),
              dow: g,
              isDisabled: !1,
              isFuture: !1,
              isPast: !1,
              isToday: !1,
              isOther: !1,
            },
            b = d != null && !(E % d),
            O = {
              ...y,
              date: O1[g],
              isMajor: b,
              isSticky: !1,
              inPopover: !1,
              hasNavLink: !1,
              view: m,
              ...l,
            },
            x = ve(f.formatToParts(h, ir));
          return {
            key: s + String(g),
            dateMarker: p,
            renderProps: O,
            attrs: { 'aria-label': x, ...c },
            innerAttrs: { 'aria-hidden': !0 },
            colSpan: i,
            className: u,
          };
        });
  }
  var Nn = class {
      constructor(t, n = !1) {
        ((this.masterCallback = t),
          (this.ignoreDeletes = n),
          (this.rev = ''),
          (this.current = new Map()),
          (this.callbacks = new Map()),
          (this.handleValue = (a, o) => {
            let { current: r, callbacks: i } = this;
            (a === null
              ? this.ignoreDeletes || (r.delete(o), i.delete(o))
              : r.set(o, a),
              (this.rev = Qe()),
              this.masterCallback && this.masterCallback(a, o));
          }));
      }
      createRef(t) {
        let n = this.callbacks.get(t);
        return (
          n ||
            ((n = (a) => {
              this.handleValue(a, t);
            }),
            this.callbacks.set(t, n)),
          n
        );
      }
    },
    ki = class extends Z {
      constructor() {
        (super(...arguments), (this.elRef = (0, Cn.createRef)()));
      }
      render() {
        return (0, A.jsx)('div', { ref: this.elRef });
      }
      componentDidMount() {
        this._isUnmounting = !1;
        let { props: t } = this,
          n = this.elRef.current;
        this.disconnectWidth = ph(n, (a) => {
          this._isUnmounting || V(t.widthRef, a);
        });
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0), this.disconnectWidth());
        let { props: t } = this;
        t.widthRef && V(t.widthRef, null);
      }
    };
  function Xa(e) {
    return (
      Ec(e) +
      ':' +
      e.start +
      (e.standinFor ? ':standin' : e.isSlice ? ':slice' : '')
    );
  }
  function qc(e, t) {
    let n = [];
    for (let a = 0; a < t; a++) n[a] = [];
    for (let a of e) n[a.row].push(a);
    return n;
  }
  function p1(e, t) {
    let n = [];
    if (e) {
      for (let a = 0; a < t; a++)
        n[a] = {
          affectedInstances: e.affectedInstances,
          isEvent: e.isEvent,
          segs: [],
        };
      for (let a of e.segs) n[a.row].segs.push(a);
    } else for (let a = 0; a < t; a++) n[a] = null;
    return n;
  }
  function y1(e, t) {
    return {
      ...e,
      start: t,
      end: t + 1,
      isStart: e.isStart && e.start === t,
      isEnd: e.isEnd && e.end - 1 === t,
      standinFor: e,
    };
  }
  var Th = class extends Z {
    constructor() {
      (super(...arguments),
        (this.buildPublicEvent = k((t, n, a) => new _e(t, n, a))),
        (this.handleEl = (t) => {
          ((this.el = t), t && Jo(t, this.props.eventRange));
        }));
    }
    render() {
      let { props: t, context: n } = this,
        { eventRange: a } = t,
        { options: o } = n,
        r = a.ui,
        i = this.buildPublicEvent(n, a.def, a.instance),
        s = { event: i, isNarrow: t.isNarrow || !1, isShort: t.isShort || !1 },
        l = {
          event: i,
          view: n.viewApi,
          timeText: '',
          color: r.color || o.backgroundEventColor,
          contrastColor: r.contrastColor,
          isDraggable: !1,
          isStartResizable: !1,
          isEndResizable: !1,
          isMirror: !1,
          isStart: t.isStart,
          isEnd: t.isEnd,
          isFirst: !1,
          isLast: !1,
          isPast: t.isPast,
          isFuture: t.isFuture,
          isToday: t.isToday,
          isSelected: !1,
          isDragging: !1,
          isResizing: !1,
          isInteractive: !1,
          level: 0,
          isNarrow: t.isNarrow || !1,
          isShort: t.isShort || !1,
          timeClass: '',
          titleClass: w(o.backgroundEventTitleClass, s),
          options: { eventOverlap: !!o.eventOverlap },
        },
        c = D(
          r.className,
          S.fill,
          S.internalEvent,
          S.internalBgEvent,
          t.isVertical ? S.flexCol : S.flexRow,
        ),
        u = D(w(o.backgroundEventInnerClass, l), S.liquid);
      return (0, A.jsx)(le, {
        tag: 'div',
        className: c,
        style: {
          '--fc-event-color': l.color,
          '--fc-event-contrast-color': l.contrastColor,
        },
        defaultGenerator: nR,
        elRef: this.handleEl,
        renderProps: l,
        generatorName: 'backgroundEventContent',
        customGenerator: o.backgroundEventContent,
        classNameGenerator: o.backgroundEventClass,
        didMount: o.backgroundEventDidMount,
        willUnmount: o.backgroundEventWillUnmount,
        children: (d) => (0, A.jsx)(d, { tag: 'div', className: u }),
      });
    }
    componentDidUpdate(t) {
      this.el &&
        this.props.eventRange !== t.eventRange &&
        Jo(this.el, this.props.eventRange);
    }
  };
  function nR(e) {
    let { title: t } = e.event;
    return (
      t &&
      (0, A.jsx)('div', { className: e.titleClass, children: e.event.title })
    );
  }
  function aR(e, t) {
    return (0, A.jsx)('div', {
      className: D(
        e === 'non-business'
          ? t.nonBusinessHoursClass
          : e === 'highlight'
            ? t.highlightClass
            : void 0,
        S.fill,
      ),
    });
  }
  var yh = 10,
    oR = 1,
    Dh = class extends En {
      constructor() {
        (super(...arguments),
          (this.getDateMeta = k(lr)),
          (this.closeRef = (0, Cn.createRef)()),
          (this.focusStartRef = (0, Cn.createRef)()),
          (this.focusEndRef = (0, Cn.createRef)()),
          (this.handleRootEl = (t) => {
            ((this.rootEl = t),
              t
                ? this.context.registerInteractiveComponent(this, {
                    el: t,
                    useEventCenter: !1,
                  })
                : this.context.unregisterInteractiveComponent(this));
          }),
          (this.handleDocumentMouseDown = (t) => {
            let n = c1(t);
            this.rootEl.contains(n) || this.handleClose();
          }),
          (this.handleDocumentKeyDown = (t) => {
            t.key === 'Escape' && this.handleClose();
          }),
          (this.handleClose = () => {
            let { onClose: t } = this.props;
            t && t();
          }));
      }
      render() {
        let { props: t, context: n } = this,
          { options: a, dateEnv: o, viewApi: r } = n,
          { startDate: i, todayRange: s, dateProfile: l } = t,
          c = this.getDateMeta(i, o, l, s),
          u = o.formatToParts(i, a.popoverFormat),
          d = ve(u),
          f = {
            ...c,
            isMajor: !1,
            isNarrow: !1,
            isSticky: !1,
            inPopover: !0,
            level: 0,
            hasNavLink: !1,
            text: d,
            textParts: u,
            get weekdayText() {
              return qa(u);
            },
            get dayNumberText() {
              return Va(u);
            },
            view: r,
          },
          m = {
            ...c,
            isMajor: !1,
            isNarrow: !1,
            inPopover: !0,
            hasNavLink: !1,
            get weekdayText() {
              return qa(u);
            },
            get dayNumberText() {
              return Va(u);
            },
            get monthText() {
              return gh(u);
            },
            view: r,
            text: '',
            textParts: [],
            options: { businessHours: !!a.businessHours },
          },
          v = Ba(i),
          { dayHeaderAlign: p } = a,
          E =
            typeof p == 'function'
              ? p({ level: 0, inPopover: !0, isNarrow: !1 })
              : p,
          g = or(t.alignEl);
        return (0, M1.createPortal)(
          (0, A.jsxs)('div', {
            'data-date': v,
            id: t.id,
            role: 'dialog',
            'aria-labelledby': t.titleId,
            className: D(
              a.popoverClass,
              S.flexCol,
              S.popoverZ,
              S.abs,
              S.borderBoxRoot,
              S.internalPopover,
            ),
            style: { top: 0, left: 0 },
            dir: g ? 'rtl' : void 0,
            'data-color-scheme': a.colorScheme || void 0,
            ref: this.handleRootEl,
            children: [
              (0, A.jsx)('div', {
                tabIndex: 0,
                style: { outline: 'none' },
                ref: this.focusStartRef,
              }),
              (0, A.jsxs)('div', {
                className: D(
                  w(a.dayHeaderClass, f),
                  S.flexCol,
                  S.borderOnlyB,
                  E === 'center'
                    ? S.alignCenter
                    : E === 'end'
                      ? S.alignEnd
                      : S.alignStart,
                ),
                children: [
                  (0, A.jsx)('div', {
                    children: (0, A.jsx)(le, {
                      tag: 'div',
                      attrs: { id: t.titleId },
                      generatorName: 'dayHeaderContent',
                      renderProps: f,
                      customGenerator: a.dayHeaderContent,
                      defaultGenerator: rR,
                      classNameGenerator: a.dayHeaderInnerClass,
                      didMount: a.dayHeaderDidMount,
                      willUnmount: a.dayHeaderWillUnmount,
                    }),
                  }),
                  (0, A.jsx)(le, {
                    tag: 'button',
                    attrs: {
                      'aria-label': a.closeHint,
                      ...$i(this.handleClose),
                    },
                    elRef: this.closeRef,
                    className: D(
                      a.popoverCloseClass,
                      S.flexRow,
                      S.cursorPointer,
                    ),
                    renderProps: {},
                    customGenerator: a.popoverCloseContent,
                    generatorName: 'popoverCloseContent',
                  }),
                ],
              }),
              (0, A.jsx)('div', {
                className: D(w(a.dayCellClass, m), S.flexCol, S.borderNone),
                children: (0, A.jsx)('div', {
                  className: w(a.dayCellInnerClass, m),
                  children: t.children,
                }),
              }),
              (0, A.jsx)('div', {
                tabIndex: 0,
                style: { outline: 'none' },
                ref: this.focusEndRef,
              }),
            ],
          }),
          s1(t.alignEl),
        );
      }
      queryHit(t, n, a, o, r) {
        let { rootEl: i, props: s } = this;
        return n >= 0 && n < o && a >= 0 && a < r
          ? {
              dateProfile: s.dateProfile,
              dateSpan: {
                allDay: !s.forceTimed,
                range: { start: s.startDate, end: s.endDate },
                ...s.dateSpanProps,
              },
              getDayEl: () => i,
              rect: { left: 0, top: 0, right: o, bottom: r },
              layer: 1,
            }
          : null;
      }
      componentDidMount() {
        (document.addEventListener('mousedown', this.handleDocumentMouseDown),
          document.addEventListener('keydown', this.handleDocumentKeyDown),
          this.focusStartRef.current.addEventListener(
            'focus',
            this.handleClose,
          ),
          this.focusEndRef.current.addEventListener('focus', this.handleClose),
          this.closeRef.current.focus({ preventScroll: !0 }),
          this.updateSize());
      }
      componentWillUnmount() {
        (document.removeEventListener(
          'mousedown',
          this.handleDocumentMouseDown,
        ),
          document.removeEventListener('keydown', this.handleDocumentKeyDown),
          this.focusStartRef.current.removeEventListener(
            'focus',
            this.handleClose,
          ),
          this.focusEndRef.current.removeEventListener(
            'focus',
            this.handleClose,
          ));
      }
      updateSize() {
        let { alignEl: t, alignParentTop: n } = this.props,
          { rootEl: a } = this,
          o = or(t),
          r = g1(t);
        if (r) {
          let i = a.getBoundingClientRect(),
            s = n ? t.closest(n).getBoundingClientRect().top - oR : r.top,
            l = o ? r.right - i.width : r.left;
          ((s = Math.max(s, yh)),
            (l = Math.min(
              l,
              document.documentElement.clientWidth - yh - i.width,
            )),
            (l = Math.max(l, yh)));
          let { offsetParent: c } = a,
            u,
            d;
          if (!c || c === document.body)
            ((u = s + window.scrollY), (d = l + window.scrollX));
          else {
            let f = c.getBoundingClientRect();
            ((u = s - f.top + c.scrollTop), (d = l - f.left + c.scrollLeft));
          }
          l1(a, { top: u, left: d });
        }
      }
    };
  function rR(e) {
    return e.text;
  }
  function v1(e, t) {
    let n = Math.max(e.start, t.start),
      a = Math.min(e.end, t.end);
    if (n < a)
      return {
        start: n,
        end: a,
        isStart: e.isStart && n === e.start,
        isEnd: e.isEnd && a === e.end,
      };
  }
  function b1(e) {
    return e.end;
  }
  function iR(e) {
    return e.reduce(lR).eventRange.range.start;
  }
  function sR(e) {
    return e.reduce(cR).eventRange.range.end;
  }
  function lR(e, t) {
    return e.eventRange.range.start < t.eventRange.range.start ? e : t;
  }
  function cR(e, t) {
    return e.eventRange.range.end > t.eventRange.range.end ? e : t;
  }
  var Mh = class extends Z {
    constructor() {
      (super(...arguments),
        (this.state = { isPopoverOpen: !1 }),
        (this.handleLinkEl = (t) => {
          ((this.linkEl = t), this.props.elRef && V(this.props.elRef, t));
        }),
        (this.handleClick = (t) => {
          let { props: n, context: a } = this,
            { dateEnv: o, options: r } = a,
            { moreLinkClick: i } = r,
            s = S1(n).start;
          function l(c) {
            let { def: u, instance: d, range: f } = c.eventRange;
            return {
              event: new _e(a, u, d),
              start: o.toDate(f.start),
              end: o.toDate(f.end),
              isStart: c.isStart,
              isEnd: c.isEnd,
            };
          }
          (typeof i == 'function' &&
            (i = i({
              date: o.toDate(s),
              allDay: !!n.allDayDate,
              allSegs: n.segs.map(l),
              hiddenSegs: n.hiddenSegs.map(l),
              jsEvent: t,
              view: a.viewApi,
            })),
            !i || i === 'popover'
              ? this.setState({ isPopoverOpen: !0 })
              : typeof i == 'string' && a.calendarApi.zoomTo(s, i));
        }),
        (this.handlePopoverClose = () => {
          (this.linkEl && this.linkEl.focus(),
            this.setState({ isPopoverOpen: !1 }));
        }));
    }
    render() {
      let { props: t, state: n } = this;
      return (0, A.jsx)(Mn.Consumer, {
        children: (a) => {
          let { viewApi: o, options: r, calendarApi: i, baseId: s } = a,
            { moreLinkText: l } = r,
            c = t.hiddenSegs.length,
            u = S1(t),
            d = s + 'popover-' + u.start.toISOString(),
            f = `+${c}`,
            m = typeof l == 'function' ? l.call(i, c) : `${f} ${l}`,
            v = We(r.moreLinkHint, [c], m),
            p = {
              num: c,
              numericText: f,
              longText: m,
              text: t.isMicro || t.display === 'column' ? f : m,
              isNarrow: t.isNarrow,
              view: o,
            };
          return (0, A.jsxs)(A.Fragment, {
            children: [
              !!c &&
                (0, A.jsx)(le, {
                  tag: 'div',
                  elRef: this.handleLinkEl,
                  className: D(
                    w(
                      t.display === 'row'
                        ? r.rowMoreLinkClass
                        : r.columnMoreLinkClass,
                      p,
                    ),
                    t.className,
                    t.display === 'row' ? S.flexRow : S.flexCol,
                    S.internalMoreLink,
                    S.cursorPointer,
                  ),
                  style: t.style,
                  attrs: {
                    ...t.attrs,
                    ...$i(this.handleClick),
                    title: v,
                    role: 'button',
                    'aria-haspopup': 'dialog',
                    'aria-expanded': n.isPopoverOpen,
                    'aria-controls': n.isPopoverOpen ? d : void 0,
                  },
                  renderProps: p,
                  generatorName: 'moreLinkContent',
                  customGenerator: r.moreLinkContent,
                  defaultGenerator: uR,
                  classNameGenerator: r.moreLinkClass,
                  didMount: r.moreLinkDidMount,
                  willUnmount: r.moreLinkWillUnmount,
                  children: (E) =>
                    (0, A.jsx)(E, {
                      tag: 'div',
                      className: D(
                        w(r.moreLinkInnerClass, p),
                        w(
                          t.display === 'row'
                            ? r.rowMoreLinkInnerClass
                            : r.columnMoreLinkInnerClass,
                          p,
                        ),
                        t.display === 'row' ? S.stickyS : S.stickyT,
                      ),
                    }),
                }),
              n.isPopoverOpen &&
                (0, A.jsx)(Dh, {
                  id: d,
                  titleId: d + '-title',
                  startDate: u.start,
                  endDate: u.end,
                  dateProfile: t.dateProfile,
                  todayRange: t.todayRange,
                  dateSpanProps: t.dateSpanProps,
                  alignEl: t.alignElRef ? t.alignElRef.current : this.linkEl,
                  alignParentTop: t.alignParentTop,
                  forceTimed: t.forceTimed,
                  onClose: this.handlePopoverClose,
                  children: t.popoverContent(),
                }),
            ],
          });
        },
      });
    }
  };
  function uR(e) {
    return e.text;
  }
  function S1(e) {
    return e.allDayDate
      ? { start: e.allDayDate, end: ne(e.allDayDate, 1) }
      : { start: iR(e.hiddenSegs), end: sR(e.hiddenSegs) };
  }
  var C1 = ee({
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: !0,
    meridiem: 'narrow',
  });
  function N1(e) {
    let { display: t } = e.eventRange.ui;
    return (
      t === 'list-item' ||
      (t === 'auto' &&
        !e.eventRange.def.allDay &&
        e.end - e.start === 1 &&
        e.isStart &&
        e.isEnd)
    );
  }
  var Eh = class extends Z {
      render() {
        let { props: t } = this;
        return (0, A.jsx)(Mh, {
          display: 'row',
          className: t.className,
          isNarrow: t.isNarrow,
          isMicro: t.isMicro,
          dateProfile: t.dateProfile,
          todayRange: t.todayRange,
          allDayDate: t.allDayDate,
          segs: t.segs,
          hiddenSegs: t.hiddenSegs,
          alignElRef: t.alignElRef,
          alignParentTop: t.alignParentTop,
          dateSpanProps: t.dateSpanProps,
          popoverContent: () =>
            (0, A.jsx)(A.Fragment, {
              children: t.segs.map((n) => {
                let { eventRange: a } = n,
                  { instanceId: o } = a.instance,
                  r = !!(t.eventDrag && t.eventDrag.affectedInstances[o]),
                  i = !!(t.eventResize && t.eventResize.affectedInstances[o]);
                return (0, A.jsx)(
                  'div',
                  {
                    style: { visibility: r || i ? 'hidden' : void 0 },
                    children: (0, A.jsx)(ca, {
                      display: N1(n) ? 'list-item' : 'row',
                      eventRange: a,
                      isStart: n.isStart,
                      isEnd: n.isEnd,
                      isDragging: r,
                      isResizing: i,
                      isMirror: !1,
                      isSelected: o === t.eventSelection,
                      defaultTimeFormat: C1,
                      defaultDisplayEventEnd: !1,
                      ...er(a, t.todayRange),
                    }),
                  },
                  o,
                );
              }),
            }),
        });
      }
    },
    Oh = class extends En {
      constructor() {
        (super(...arguments),
          (this.getDateMeta = k(lr)),
          (this.refineRenderProps = la(mR)),
          (this.rootElRef = (0, Cn.createRef)()),
          (this.handleBodyEl = (t) => {
            (this.disconnectBodyHeight &&
              (this.disconnectBodyHeight(),
              (this.disconnectBodyHeight = void 0),
              V(this.props.headerHeightRef, null),
              V(this.props.mainHeightRef, null)),
              t &&
                (this.disconnectBodyHeight = Yi(t, (n, a) => {
                  if (this._isUnmounting) return;
                  let { props: o } = this,
                    r = t.getBoundingClientRect(),
                    i = this.rootElRef.current.getBoundingClientRect(),
                    s = r.top - i.top;
                  (Zc(this.headerHeight, s) ||
                    ((this.headerHeight = s), V(o.headerHeightRef, s)),
                    o.fgLiquidHeight && V(o.mainHeightRef, a));
                })));
          }));
      }
      render() {
        let { props: t, context: n } = this,
          { options: a, dateEnv: o } = n,
          r = t.showDayNumber && dR(t.date, t.dateProfile.currentRange, o),
          i = this.getDateMeta(t.date, o, t.dateProfile, t.todayRange),
          s = D(
            t.borderStart ? S.borderOnlyS : S.borderNone,
            t.width != null ? '' : S.liquid,
            S.flexCol,
            S.noMargin,
            S.noPadding,
          ),
          l = a.navLinks,
          c = this.refineRenderProps({
            date: t.date,
            isMajor: t.isMajor,
            isNarrow: t.isNarrow,
            dateMeta: i,
            hasLabel: t.showDayNumber,
            hasMonthLabel: r,
            hasNavLink: l,
            renderProps: t.renderProps,
            viewApi: n.viewApi,
            dateEnv: n.dateEnv,
            monthStartFormat: a.monthStartFormat,
            dayCellFormat: a.dayCellFormat,
            businessHours: !!a.businessHours,
          });
        if (i.isDisabled)
          return (0, A.jsx)('div', {
            role: 'gridcell',
            'aria-disabled': !0,
            className: D(w(a.dayCellClass, c), t.className, s),
            style: { width: t.width },
          });
        let u = ja(n, t.date);
        return (0, A.jsx)(le, {
          tag: 'div',
          elRef: this.rootElRef,
          className: D(t.className, s),
          attrs: {
            ...t.attrs,
            role: 'gridcell',
            'aria-label': u,
            ...(c.isToday ? { 'aria-current': 'date' } : {}),
            'data-date': Ba(t.date),
          },
          style: { width: t.width },
          renderProps: c,
          generatorName: 'dayCellTopContent',
          customGenerator: a.dayCellTopContent,
          defaultGenerator: fR,
          classNameGenerator: a.dayCellClass,
          didMount: a.dayCellDidMount,
          willUnmount: a.dayCellWillUnmount,
          children: (d) =>
            (0, A.jsxs)(A.Fragment, {
              children: [
                (0, A.jsx)('div', {
                  className: D(S.rel, w(a.dayCellTopClass, c)),
                  children:
                    t.showDayNumber &&
                    (0, A.jsx)(d, {
                      tag: 'div',
                      attrs: l
                        ? sr(n, t.date, void 0, u)
                        : { 'aria-hidden': !0 },
                      className: w(a.dayCellTopInnerClass, c),
                    }),
                }),
                (0, A.jsxs)('div', {
                  className: D(S.flexCol, t.fgLiquidHeight ? S.liquid : S.grow),
                  ref: this.handleBodyEl,
                  children: [
                    (0, A.jsx)('div', {
                      className: w(a.dayCellInnerClass, c),
                      style: { minHeight: t.fgHeight },
                      children: t.fg,
                    }),
                    (0, A.jsx)(Eh, {
                      className: S.rel,
                      allDayDate: t.date,
                      segs: t.segs,
                      hiddenSegs: t.hiddenSegs,
                      alignElRef: this.rootElRef,
                      alignParentTop: t.showDayNumber
                        ? '[role=row]'
                        : `.${S.internalView}`,
                      dateSpanProps: t.dateSpanProps,
                      dateProfile: t.dateProfile,
                      eventSelection: t.eventSelection,
                      eventDrag: t.eventDrag,
                      eventResize: t.eventResize,
                      todayRange: t.todayRange,
                      isNarrow: t.isNarrow,
                      isMicro: t.isMicro,
                    }),
                  ],
                }),
                (0, A.jsx)('div', {
                  className: D(S.rel, w(a.dayCellBottomClass, c)),
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
  function fR(e) {
    return e.text || (0, A.jsx)(A.Fragment, { children: '\xA0' });
  }
  function dR(e, t, n) {
    let { start: a, end: o } = t,
      r = bn(o, -1),
      i = n.getYear(a),
      s = n.getMonth(a),
      l = n.getYear(r),
      c = n.getMonth(r);
    return (
      !(i === l && s === c) &&
      (e.valueOf() === a.valueOf() ||
        (n.getDay(e) === 1 && e.valueOf() < o.valueOf()))
    );
  }
  function mR(e) {
    let {
        date: t,
        dateEnv: n,
        hasLabel: a,
        hasMonthLabel: o,
        hasNavLink: r,
        businessHours: i,
      } = e,
      s = [],
      l = '';
    return (
      a &&
        ((s = n.formatToParts(t, o ? e.monthStartFormat : e.dayCellFormat)),
        (l = ve(s))),
      {
        ...e.dateMeta,
        ...e.renderProps,
        text: l,
        textParts: s,
        isMajor: e.isMajor,
        isNarrow: e.isNarrow,
        inPopover: !1,
        hasNavLink: r,
        get weekdayText() {
          return qa(s);
        },
        get dayNumberText() {
          return Va(s);
        },
        get monthText() {
          return gh(s);
        },
        options: { businessHours: i },
        view: e.viewApi,
      }
    );
  }
  var jc = class {
    constructor(t, n = (l) => 1, a = !1, o, r, i = !1, s = !1) {
      ((this.getSegThickness = n),
        (this.strictOrder = a),
        (this.maxCoord = o),
        (this.maxDepth = r),
        (this.hiddenConsumes = i),
        (this.allowSlicing = s),
        (this.placementsByLevel = []),
        (this.levelCoords = []),
        (this.hiddenSegs = []));
      for (let l of t) this.insertSeg(l, this.getSegThickness(l));
    }
    insertSeg(t, n, a) {
      if (n != null) {
        let o = this.findInsertion(t, n);
        if (this.isInsertionValid(o, n)) this.insertSegAt(t, o, n, a);
        else {
          let { touchingPlacement: r } = o;
          if (r) {
            if (
              this.hiddenConsumes &&
              !r.isZombie &&
              ((r.isZombie = !0), this.hiddenSegs.push(r), this.allowSlicing)
            ) {
              let i = Object.assign({}, r);
              (Object.assign(r, v1(r, t)),
                (r.isSlice = !0),
                this.splitSeg(i, r.thickness, r));
            }
            this.allowSlicing
              ? (this.hiddenSegs.push({ ...t, ...v1(t, r) }),
                this.splitSeg(t, n, r))
              : this.hiddenSegs.push(t);
          } else this.hiddenSegs.push(t);
        }
      }
    }
    isInsertionValid(t, n) {
      return (
        (this.maxCoord == null || t.levelCoord + n <= this.maxCoord) &&
        (this.maxDepth == null || t.depth < this.maxDepth)
      );
    }
    splitSeg(t, n, a) {
      (t.start < a.start &&
        this.insertSeg({ ...t, end: a.start, isEnd: !1 }, n, !0),
        t.end > a.end &&
          this.insertSeg({ ...t, start: a.end, isStart: !1 }, n, !0));
    }
    insertSegAt(t, n, a, o) {
      let r = {
        ...t,
        thickness: a,
        depth: n.depth,
        isSlice: o || t.isSlice || !1,
        isZombie: !1,
      };
      n.lateralIndex === -1
        ? (vh(this.placementsByLevel, n.levelIndex, [r]),
          vh(this.levelCoords, n.levelIndex, n.levelCoord))
        : vh(this.placementsByLevel[n.levelIndex], n.lateralIndex, r);
    }
    findInsertion(t, n) {
      let { placementsByLevel: a, levelCoords: o } = this,
        r = a.length,
        i = 0,
        s,
        l,
        c = 0;
      for (let f = 0; f < r; f += 1) {
        let m = o[f];
        if (!this.strictOrder && m >= i + n) break;
        let v = a[f],
          p,
          [E, g] = T1(v, t.start, b1),
          h = E + g;
        for (; (p = v[h]) && p.start < t.end; ) {
          let y = m + p.thickness;
          (y > i && ((i = y), (s = p), (l = f)),
            y === i && (c = Math.max(c, p.depth + 1)),
            (h += 1));
        }
      }
      let u = 0;
      if (s) for (u = l + 1; u < r && o[u] < i; ) u += 1;
      let d = -1;
      return (
        u < r && o[u] === i && ([d] = T1(a[u], t.end, b1)),
        {
          touchingPlacement: s,
          levelCoord: i,
          levelIndex: u,
          lateralIndex: d,
          depth: c,
        }
      );
    }
    traverseSegs(t) {
      let { placementsByLevel: n, levelCoords: a } = this;
      for (let o = 0; o < n.length; o++) {
        let r = n[o],
          i = a[o];
        for (let s of r) s.isZombie || t(s, i);
      }
    }
  };
  function vh(e, t, n) {
    e.splice(t, 0, n);
  }
  function T1(e, t, n) {
    let a = 0,
      o = e.length;
    if (!o || t < n(e[a])) return [0, 0];
    if (t > n(e[o - 1])) return [o, 0];
    for (; a < o; ) {
      let r = Math.floor(a + (o - a) / 2),
        i = n(e[r]);
      if (t < i) o = r;
      else if (t > i) a = r + 1;
      else return [r, 1];
    }
    return [a, 0];
  }
  function hR(e, t, n, a, o, r = !0, i, s) {
    let l, c, u;
    i === !0 || s === !0
      ? ((l = a), (u = !0))
      : typeof i == 'number'
        ? ((c = i), (u = !1))
        : typeof s == 'number' && ((c = s), (u = !0));
    let d = new Map(),
      f = new Map(),
      m = new Map(),
      v = new Map(),
      p = new jc(e, (b) => t.get(Xa(b)), o, l, c, u, r);
    p.traverseSegs((b, O) => {
      (bh(d, b), m.set(Xa(b), O), b.isSlice && v.set(b.eventRange, !0));
    });
    for (let b of p.hiddenSegs) bh(f, b);
    if (v.size) {
      (m.clear(),
        (p = new jc(gR(e, d), (b) => t.get(Xa(b)), o, l, c, u)),
        p.traverseSegs((b, O) => {
          m.set(Xa(b), O);
        }));
      for (let b of p.hiddenSegs) bh(f, b);
    }
    let E = [],
      g = [],
      h = [],
      y = [];
    for (let b = 0; b < n.length; b++)
      (E.push([]), g.push([]), h.push([]), y.push(0));
    for (let b of e) {
      let { eventRange: O } = b,
        x = d.get(O) || [],
        C = f.get(O) || [],
        $ = v.get(O) || !1;
      if ((h[b.start].push(b), $)) for (let R of x) h[R.start].push(R);
      for (let R of x) {
        for (let Se = R.start; Se < R.end; Se++) {
          let Vt = y1(R, Se);
          E[Se].push(Vt);
        }
        let I = Xa(R),
          Oe = m.get(I);
        if (Oe != null) {
          let Se = t.get(I);
          for (let Vt = R.start; Vt < R.end; Vt++)
            y[Vt] = Math.max(y[Vt], Oe + Se);
        }
      }
      for (let R of C)
        for (let I = R.start; I < R.end; I++) {
          let Oe = y1(R, I);
          (E[I].push(Oe), g[I].push(Oe));
        }
    }
    return [E, g, h, m, y];
  }
  function bh(e, t) {
    let n = e.get(t.eventRange);
    (n || e.set(t.eventRange, (n = [])), n.push(t));
  }
  function gR(e, t) {
    let n = [];
    for (let a of e) n.push(...(t.get(a.eventRange) || []));
    return n;
  }
  var Ch = class {
      constructor(t, n) {
        let a = t.start,
          { end: o } = t,
          r = [],
          i = [],
          s = -1;
        for (; a < o; )
          (n.isHiddenDay(a)
            ? r.push(s + 0.5)
            : ((s += 1), r.push(s), i.push(a)),
            (a = ne(a, 1)));
        ((this.dates = i), (this.indices = r), (this.cnt = i.length));
      }
      sliceRange(t) {
        let n = this.getDateDayIndex(t.start),
          a = this.getDateDayIndex(ne(t.end, -1)),
          o = Math.max(0, n),
          r = Math.min(this.cnt - 1, a);
        return (
          (o = Math.ceil(o)),
          (r = Math.floor(r)),
          o <= r
            ? { start: o, end: r + 1, isStart: n === o, isEnd: a === r }
            : null
        );
      }
      getDateDayIndex(t) {
        let { indices: n } = this,
          a = Math.floor(ia(this.dates[0], t));
        return a < 0 ? n[0] - 1 : a >= n.length ? n[n.length - 1] + 1 : n[a];
      }
    },
    Nh = class {
      constructor(t, n, a, o = '') {
        ((this.dateEnv = a), (this.majorUnit = o));
        let { dates: r } = t,
          i,
          s,
          l;
        if (n) {
          for (
            s = r[0].getUTCDay(), i = 1;
            i < r.length && r[i].getUTCDay() !== s;
            i += 1
          );
          l = Math.ceil(r.length / i);
        } else ((l = 1), (i = r.length));
        ((this.rowCount = l),
          (this.colCount = i),
          (this.daySeries = t),
          (this.cellRows = this.buildCells()),
          (this.headerDates = this.buildHeaderDates()));
      }
      buildCells() {
        let t = [];
        for (let n = 0; n < this.rowCount; n += 1) {
          let a = [];
          for (let o = 0; o < this.colCount; o += 1)
            a.push(this.buildCell(n, o));
          t.push(a);
        }
        return t;
      }
      buildCell(t, n) {
        let a = this.daySeries.dates[t * this.colCount + n];
        return { key: a.toISOString(), date: a, isMajor: this.cellIsMajor(a) };
      }
      cellIsMajor(t) {
        return this.majorUnit ? eh(t, this.majorUnit, this.dateEnv) : !1;
      }
      buildHeaderDates() {
        let t = [];
        for (let n = 0; n < this.colCount; n += 1)
          t.push(this.cellRows[0][n].date);
        return t;
      }
      sliceRange(t) {
        let { colCount: n } = this,
          a = this.daySeries.sliceRange(t),
          o = [];
        if (a) {
          let { start: r, end: i } = a,
            s = r;
          for (; s < i; ) {
            let l = Math.floor(s / n),
              c = Math.min((l + 1) * n, i);
            (o.push({
              row: l,
              start: s % n,
              end: ((c - 1) % n) + 1,
              isStart: a.isStart && s === r,
              isEnd: a.isEnd && c === i,
            }),
              (s = c));
          }
        }
        return o;
      }
    };
  function w1(e, t, n) {
    let a = new Ch(e.renderRange, t),
      o = /year|month|week/.test(e.currentRangeUnit),
      r = !o && Jm(e, n);
    return new Nh(a, o, n, r !== 'day' ? r : void 0);
  }
  function R1(e, t, n) {
    return n == null ? [void 0, void 0] : n / e < t ? [t * e, t] : [n, void 0];
  }
  function $1(e, t, n) {
    let a = 0;
    for (let o of t) {
      let r = o[0].key,
        i = o[0].date,
        s = o[o.length - 1].date;
      if (e >= i && e <= s) return a;
      let l = n.get(r);
      if (l == null) return;
      a += l;
    }
    return a;
  }
  function D1(e, t, n) {
    let a, o;
    if (t != null) ((a = e.start * t), (o = (n - e.end) * t));
    else {
      let r = 1 / n;
      ((a = Am(e.start * r)), (o = Am(1 - e.end * r)));
    }
    return { insetInlineStart: a, insetInlineEnd: o };
  }
  function pR(e, t, n, a, o) {
    let r = n ?? t / a,
      i = Math.floor(e / r),
      s = o ? a - i - 1 : i,
      l = i * r,
      c = l + r;
    return { col: s, left: l, right: c };
  }
  function yR(e, t, n) {
    let a = 0,
      o = 0,
      r = 0;
    for (let i of t) {
      let s = i[0].key;
      if (((o = r), (r = o + n.get(s)), e < r)) break;
      a++;
    }
    return { row: a, top: o, bottom: r };
  }
  function vR(e, t) {
    return e.querySelectorAll('[role=row]')[t];
  }
  function bR(e, t) {
    return e.querySelectorAll('[role=gridcell]')[t];
  }
  var xh = 60,
    SR = ee({ weekday: 'narrow' });
  function x1(e, t, n) {
    return e || TR(t, n);
  }
  function TR(e, t) {
    return e
      ? t > 1
        ? ee({
            weekday: 'short',
            weekdayJustify: 'start',
            day: 'numeric',
            omitCommas: !0,
            omitTrailing: !0,
          })
        : ee({
            weekday: 'long',
            weekdayJustify: 'start',
            day: 'numeric',
            omitCommas: !0,
            omitTrailing: !0,
          })
      : ee({ weekday: 'short' });
  }
  var wh = class extends Cn.Component {
      constructor() {
        (super(...arguments), (this.rootElRef = (0, Cn.createRef)()));
      }
      render() {
        let { props: t } = this;
        return (0, A.jsx)('div', {
          className: D(t.className, S.abs),
          style: t.style,
          ref: this.rootElRef,
          children: t.children,
        });
      }
      componentDidMount() {
        this._isUnmounting = !1;
        let t = this.rootElRef.current;
        this.disconnectHeight = cr(t, (n) => {
          this._isUnmounting || V(this.props.heightRef, n);
        });
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0),
          this.disconnectHeight(),
          V(this.props.heightRef, null));
      }
    },
    DR = ee({ week: 'narrow' }),
    Rh = class extends Z {
      constructor() {
        (super(...arguments),
          (this.headerHeightRefMap = new Nn(() => {
            Ga(this.handleSegPositioning);
          })),
          (this.mainHeightRefMap = new Nn(() => {
            (this.props.dayMaxEvents === !0 ||
              this.props.dayMaxEventRows === !0) &&
              Ga(this.handleSegPositioning);
          })),
          (this.segHeightRefMap = new Nn(() => {
            Ga(this.handleSegPositioning);
          })),
          (this.buildWeekNumberRenderProps = k(MR)),
          (this.handleRootEl = (t) => {
            ((this.rootEl = t), V(this.props.rootElRef, t));
          }),
          (this.handleSegPositioning = () => {
            this._isUnmounting || this.forceUpdate();
          }));
      }
      render() {
        let {
            props: t,
            context: n,
            headerHeightRefMap: a,
            mainHeightRefMap: o,
          } = this,
          { cells: r } = t,
          { options: i } = n,
          s = t.cells[0].date,
          l = t.dayMaxEvents === !0 || t.dayMaxEventRows === !0,
          c = Cc(t.fgEventSegs, i.eventOrder),
          [u, d] = this.computeFgDims(),
          [f, m, v, p, E] = hR(
            c,
            this.segHeightRefMap.current,
            r,
            l ? d : void 0,
            i.eventOrderStrict,
            i.eventSlicing,
            t.dayMaxEvents,
            t.dayMaxEventRows,
          ),
          g = [];
        if (u != null) {
          let C = 0;
          for (let $ of r) {
            let R = a.current.get($.key);
            if (R != null) {
              let I = u - R;
              g.push(E[C] + I);
            } else g.push(void 0);
            C++;
          }
        }
        let h = this.getHighlightSegs(),
          y = this.getMirrorSegs(),
          b = i.navLinks,
          O = ja(n, s, 'week'),
          x = this.buildWeekNumberRenderProps(s, n, t.cellIsNarrow, b);
        return (0, A.jsxs)('div', {
          role: t.role,
          'aria-label': t.role === 'row' ? O : void 0,
          className: D(
            i.dayRowClass,
            t.className,
            S.flexRow,
            S.rel,
            S.isolate,
            t.forPrint && t.basis !== void 0 && S.printSiblingRow,
          ),
          style: { flexBasis: t.basis },
          ref: this.handleRootEl,
          children: [
            t.showWeekNumbers &&
              !t.cellIsMicro &&
              (0, A.jsx)(le, {
                tag: 'div',
                attrs: {
                  ...(b ? sr(n, s, 'week', O, !1) : {}),
                  role: void 0,
                  'aria-hidden': !0,
                },
                className: S.z1,
                renderProps: x,
                generatorName: 'inlineWeekNumberContent',
                customGenerator: i.inlineWeekNumberContent,
                defaultGenerator: Hi,
                classNameGenerator: i.inlineWeekNumberClass,
                didMount: i.inlineWeekNumberDidMount,
                willUnmount: i.inlineWeekNumberWillUnmount,
              }),
            this.renderFillSegs(t.businessHourSegs, 'non-business'),
            this.renderFillSegs(t.bgEventSegs, 'bg-event'),
            this.renderFillSegs(h, 'highlight'),
            t.cells.map((C, $) => {
              let R = this.renderFgSegs(u, v[$], p, t.todayRange, !1);
              return (0, A.jsx)(
                Oh,
                {
                  dateProfile: t.dateProfile,
                  todayRange: t.todayRange,
                  date: C.date,
                  isMajor: C.isMajor,
                  showDayNumber: t.showDayNumbers,
                  isNarrow: t.cellIsNarrow,
                  isMicro: t.cellIsMicro,
                  borderStart: !!$,
                  segs: f[$],
                  hiddenSegs: m[$],
                  fgLiquidHeight: l,
                  fg: (0, A.jsx)(A.Fragment, { children: R }),
                  eventDrag: t.eventDrag,
                  eventResize: t.eventResize,
                  eventSelection: t.eventSelection,
                  renderProps: C.renderProps,
                  dateSpanProps: C.dateSpanProps,
                  attrs: C.attrs,
                  className: C.className,
                  fgHeight: g[$],
                  width: t.colWidth,
                  headerHeightRef: a.createRef(C.key),
                  mainHeightRef: o.createRef(C.key),
                },
                C.key,
              );
            }),
            this.renderFgSegs(u, y, p, t.todayRange, !0),
          ],
        });
      }
      renderFgSegs(t, n, a, o, r) {
        let { props: i, segHeightRefMap: s } = this,
          { colWidth: l, eventSelection: c, cellIsMicro: u } = i,
          d = i.cells.length,
          f = i.cells.length === 1,
          m = [];
        for (let v of n) {
          let p = Xa(v),
            { standinFor: E, eventRange: g } = v,
            { instanceId: h } = g.instance;
          if (E) continue;
          let { insetInlineStart: y, insetInlineEnd: b } = D1(v, l, d),
            O = a.get(E ? Xa(E) : p) ?? (r ? 0 : void 0),
            x = t != null && O != null ? t + O : void 0,
            C = !!(i.eventDrag && i.eventDrag.affectedInstances[h]),
            $ = !!(i.eventResize && i.eventResize.affectedInstances[h]),
            R = !r && (C || $ || E || x == null),
            I = N1(v),
            Oe = h === c;
          m.push(
            (0, A.jsx)(
              wh,
              {
                className: v.start ? S.fakeBorderS : '',
                style: {
                  visibility: R ? 'hidden' : void 0,
                  top: x,
                  insetInlineStart: y,
                  insetInlineEnd: b,
                  zIndex: Oe ? 1e3 : 0,
                },
                heightRef: !E && !r ? s.createRef(p) : null,
                children: (0, A.jsx)(ca, {
                  display: I ? 'list-item' : 'row',
                  eventRange: g,
                  isStart: v.isStart,
                  isEnd: v.isEnd,
                  isDragging: C,
                  isResizing: $,
                  isMirror: r,
                  isSelected: Oe,
                  isNarrow: i.cellIsNarrow,
                  defaultTimeFormat: C1,
                  defaultDisplayEventEnd: f,
                  disableResizing: I,
                  forcedTimeText: u ? '' : void 0,
                  ...er(g, o),
                }),
              },
              p,
            ),
          );
        }
        return m;
      }
      renderFillSegs(t, n) {
        let { props: a, context: o } = this,
          { todayRange: r, colWidth: i } = a,
          s = a.cells.length,
          l = [];
        for (let c of t) {
          let u = c.start + ':' + c.end,
            { insetInlineStart: d, insetInlineEnd: f } = D1(c, i, s),
            m = !c.standinFor;
          l.push(
            (0, A.jsx)(
              'div',
              {
                className: S.fillY,
                style: {
                  visibility: m ? '' : 'hidden',
                  insetInlineStart: d,
                  insetInlineEnd: f,
                },
                children:
                  n === 'bg-event'
                    ? (0, A.jsx)(Th, {
                        eventRange: c.eventRange,
                        isStart: c.isStart,
                        isEnd: c.isEnd,
                        isNarrow: a.cellIsNarrow,
                        isVertical: !1,
                        ...er(c.eventRange, r),
                      })
                    : aR(n, o.options),
              },
              u,
            ),
          );
        }
        return (0, A.jsx)(A.Fragment, { children: l });
      }
      componentDidMount() {
        this._isUnmounting = !1;
        let { rootEl: t } = this;
        this.disconnectHeight = cr(t, (n) => {
          V(this.props.heightRef, n);
        });
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0),
          this.disconnectHeight(),
          V(this.props.heightRef, null));
      }
      computeFgDims() {
        let { cells: t } = this.props,
          n = this.headerHeightRefMap.current,
          a = this.mainHeightRefMap.current,
          o,
          r;
        for (let i of t) {
          let s = n.get(i.key),
            l = a.get(i.key);
          if (s != null && ((o === void 0 || s > o) && (o = s), l != null)) {
            let c = s + l;
            (r === void 0 || c < r) && (r = c);
          }
        }
        return [o, r != null && o != null ? r - o : void 0];
      }
      getMirrorSegs() {
        let { props: t } = this;
        return t.eventResize && t.eventResize.segs.length
          ? t.eventResize.segs
          : [];
      }
      getHighlightSegs() {
        let { props: t } = this;
        return t.eventDrag && t.eventDrag.segs.length
          ? t.eventDrag.segs
          : t.eventResize && t.eventResize.segs.length
            ? t.eventResize.segs
            : t.dateSelectionSegs;
      }
    };
  function MR(e, t, n, a) {
    let { dateEnv: o, options: r } = t,
      i = o.computeWeekNumber(e),
      s = o.formatToParts(e, r.weekNumberFormat || DR),
      l = ve(s),
      c = o.toDate(e);
    return {
      num: i,
      text: l,
      textParts: s,
      date: c,
      isNarrow: n,
      hasNavLink: a,
    };
  }
  var Bi = class extends En {
    constructor() {
      (super(...arguments),
        (this.splitBusinessHourSegs = k(qc)),
        (this.splitBgEventSegs = k(OR)),
        (this.splitFgEventSegs = k(qc)),
        (this.splitDateSelectionSegs = k(qc)),
        (this.splitEventDrag = k(p1)),
        (this.splitEventResize = k(p1)),
        (this.rowHeightRefMap = new Nn((t, n) => {
          let { rowHeightRefMap: a } = this.props;
          a && a.handleValue(t, n);
        })),
        (this.handleRootEl = (t) => {
          ((this.rootEl = t),
            t
              ? this.context.registerInteractiveComponent(this, {
                  el: t,
                  isHitComboAllowed: this.props.isHitComboAllowed,
                })
              : this.context.unregisterInteractiveComponent(this));
        }));
    }
    render() {
      let { props: t, context: n, rowHeightRefMap: a } = this,
        { options: o } = n,
        { cellRows: r } = t,
        i = r.length,
        s = r[0]?.[0]?.key || '',
        l = this.splitFgEventSegs(t.fgEventSegs, i),
        c = this.splitBgEventSegs(t.bgEventSegs, i),
        u = this.splitBusinessHourSegs(t.businessHourSegs, i),
        d = this.splitDateSelectionSegs(t.dateSelectionSegs, i),
        f = this.splitEventDrag(t.eventDrag, i),
        m = this.splitEventResize(t.eventResize, i),
        v = Ke(o),
        p = !t.forPrint && !v,
        E = CR(t.visibleWidth, i, v, o);
      return (0, A.jsx)('div', {
        role: 'rowgroup',
        className: D(t.className, !t.forPrint && S.flexCol),
        style: { width: t.width },
        ref: this.handleRootEl,
        children: r.map((g, h) =>
          (0, A.jsx)(
            Rh,
            {
              role: 'row',
              dateProfile: t.dateProfile,
              todayRange: t.todayRange,
              cells: g,
              cellIsNarrow: t.cellIsNarrow,
              cellIsMicro: t.cellIsMicro,
              showDayNumbers: i > 1,
              showWeekNumbers: i > 1 && o.weekNumbers,
              forPrint: t.forPrint,
              className: D(
                p && S.grow,
                i > 1 && S.breakInsideAvoid,
                h < i - 1 ? S.borderOnlyB : S.borderNone,
              ),
              fgEventSegs: l[h],
              bgEventSegs: c[h],
              businessHourSegs: u[h],
              dateSelectionSegs: d[h],
              eventSelection: t.eventSelection,
              eventDrag: f[h],
              eventResize: m[h],
              dayMaxEvents: t.dayMaxEvents,
              dayMaxEventRows: t.dayMaxEventRows,
              colWidth: t.colWidth,
              basis: E,
              heightRef: a.createRef(g[0].key),
            },
            s + ':' + g[0].key,
          ),
        ),
      });
    }
    queryHit(t, n, a, o) {
      let { props: r } = this,
        i = r.cellRows[0].length,
        { col: s, left: l, right: c } = pR(n, o, r.colWidth, i, t),
        {
          row: u,
          top: d,
          bottom: f,
        } = yR(a, r.cellRows, this.rowHeightRefMap.current),
        m = r.cellRows[u][s],
        v = m.date,
        p = ne(v, 1);
      return {
        dateProfile: r.dateProfile,
        dateSpan: {
          range: { start: v, end: p },
          allDay: !0,
          ...m.dateSpanProps,
        },
        getDayEl: () => bR(vR(this.rootEl, u), s),
        rect: { left: l, right: c, top: d, bottom: f },
        layer: 0,
      };
    }
  };
  function ER(e) {
    return e.eventRange.def.allDay;
  }
  function OR(e, t) {
    return qc(e.filter(ER), t);
  }
  function CR(e, t, n, a) {
    if (e != null) {
      let o = e / a.aspectRatio / 6;
      return t > 6 || n ? o : 0;
    }
    return 0;
  }
  var $h = class extends Z {
    constructor() {
      (super(...arguments),
        (this.state = {}),
        (this.buildDayHeaderText = k(NR)),
        (this.handleInnerEl = (t) => {
          (this.disconnectSize &&
            (this.disconnectSize(), (this.disconnectSize = void 0)),
            t
              ? (this.disconnectSize = Yi(t, (n, a) => {
                  this._isUnmounting ||
                    (V(this.props.innerHeightRef, a),
                    this.setState({ innerWidth: n }));
                }))
              : V(this.props.innerHeightRef, null));
        }));
    }
    render() {
      let { props: t, state: n, context: a } = this,
        { renderConfig: o, dataConfig: r } = t,
        i = t.colWidth != null ? t.colWidth * (r.colSpan || 1) : void 0,
        s = r.renderProps.isDisabled,
        l = o.dayHeaderFormat
          ? this.buildDayHeaderRenderProps(
              r.renderProps,
              t.cellIsNarrow,
              t.rowLevel,
              t.cellIsMicro,
              r.dateMarker,
              o.dayHeaderFormat,
              !!o.datesRepDistinctDays,
              a.dateEnv,
            )
          : { ...r.renderProps, isNarrow: t.cellIsNarrow, level: t.rowLevel },
        c = o.align,
        u =
          typeof c == 'function'
            ? c({
                level: t.rowLevel,
                inPopover: r.renderProps.inPopover,
                isNarrow: t.cellIsNarrow,
              })
            : c,
        d = o.sticky,
        f =
          t.rowLevel > 0 &&
          d !== !1 &&
          (u !== 'center' ||
            (i != null &&
              t.viewportWidth != null &&
              i > t.viewportWidth * 0.75)),
        m;
      return (
        f &&
          (u === 'center'
            ? n.innerWidth != null && (m = `calc(50% - ${n.innerWidth / 2}px)`)
            : (m = typeof d == 'number' || typeof d == 'string' ? d : 0)),
        (0, A.jsx)(le, {
          tag: 'div',
          attrs: {
            role: 'columnheader',
            'aria-colspan': r.colSpan,
            ...r.attrs,
          },
          className: D(
            r.className,
            S.noMargin,
            S.noPadding,
            S.flexCol,
            t.borderStart ? S.borderOnlyS : S.borderNone,
            u === 'center'
              ? S.alignCenter
              : u === 'end'
                ? S.alignEnd
                : S.alignStart,
            t.colWidth == null && S.liquid,
            !f && S.crop,
          ),
          style: { width: i },
          renderProps: l,
          generatorName: o.generatorName,
          customGenerator: o.customGenerator,
          defaultGenerator: Hi,
          classNameGenerator: s ? void 0 : o.classNameGenerator,
          didMount: o.didMount,
          willUnmount: o.willUnmount,
          children: (v) =>
            (0, A.jsx)('div', {
              ref: this.handleInnerEl,
              className: D(
                S.flexCol,
                S.noShrink,
                S.whiteSpaceNoWrap,
                f && S.sticky,
              ),
              style: { left: m, right: m },
              children: (0, A.jsx)(v, {
                tag: 'div',
                attrs: r.innerAttrs,
                className: w(o.innerClassNameGenerator, l),
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
    buildDayHeaderRenderProps(t, n, a, o, r, i, s, l) {
      let c = this.buildDayHeaderText(s ? r : t.date, i, s, l),
        u = o ? this.buildDayHeaderText(r, SR, !1, l) : c;
      return {
        ...t,
        isNarrow: n,
        level: a,
        text: u.text,
        textParts: u.textParts,
        weekdayText: o ? u.text : c.weekdayText,
        dayNumberText: c.dayNumberText,
      };
    }
  };
  function NR(e, t, n, a) {
    let o = a.formatToParts(e, t);
    return {
      text: ve(o),
      textParts: o,
      weekdayText: qa(o),
      dayNumberText: n ? Va(o) : '',
    };
  }
  var Gc = class extends Z {
    constructor() {
      (super(...arguments),
        (this.innerHeightRefMap = new Nn(() => {
          Ga(this.handleInnerHeights);
        })),
        (this.handleInnerHeights = () => {
          if (this._isUnmounting) return;
          let t = this.innerHeightRefMap.current,
            n = 0;
          for (let a of t.values()) n = Math.max(n, a);
          this.currentInnerHeight !== n &&
            ((this.currentInnerHeight = n), V(this.props.innerHeightRef, n));
        }));
    }
    render() {
      let { props: t, context: n } = this,
        { options: a } = n;
      return (0, A.jsx)('div', {
        role: t.role,
        'aria-rowindex': t.rowIndex != null ? 1 + t.rowIndex : void 0,
        className: D(
          a.dayHeaderRowClass,
          t.className,
          S.flexRow,
          S.contentBox,
          t.borderBottom ? S.borderOnlyB : S.borderNone,
        ),
        style: { height: t.height },
        children: t.dataConfigs.map((o, r) =>
          (0, A.jsx)(
            $h,
            {
              renderConfig: t.renderConfig,
              dataConfig: o,
              borderStart: !!r,
              colWidth: t.colWidth,
              viewportWidth: t.viewportWidth,
              innerHeightRef: this.innerHeightRefMap.createRef(o.key),
              cellIsNarrow: t.cellIsNarrow,
              cellIsMicro: t.cellIsMicro,
              rowLevel: t.rowLevel,
            },
            o.key,
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
        V(this.props.innerHeightRef, null));
    }
  };
  var j = F(Ae(), 1);
  var ua = F(dt(), 1);
  var Xc = class extends Z {
      render() {
        let { props: t } = this,
          { headerTiers: n } = t;
        return (0, j.jsx)('div', {
          role: 'rowgroup',
          className: D(t.className, S.flexCol, t.width == null && S.liquid),
          style: { width: t.width },
          children: n.map((a, o) =>
            (0, ua.createElement)(Gc, {
              ...a,
              key: o,
              role: 'row',
              borderBottom: o < n.length - 1,
              colWidth: t.colWidth,
              viewportWidth: t.viewportWidth,
              cellIsNarrow: t.cellIsNarrow,
              cellIsMicro: t.cellIsMicro,
              rowLevel: n.length - o - 1,
            }),
          ),
        });
      }
    },
    Ah = class extends Z {
      constructor() {
        (super(...arguments),
          (this.state = {}),
          (this.handleScroller = (t) => {
            V(this.props.scrollerRef, t);
          }),
          (this.handleTotalWidth = (t) => {
            this._isUnmounting || this.setState({ totalWidth: t });
          }),
          (this.handleClientWidth = (t) => {
            this._isUnmounting || this.setState({ clientWidth: t });
          }));
      }
      render() {
        let { props: t, state: n, context: a } = this,
          { options: o } = a,
          { borderlessX: r, borderlessTop: i, borderlessBottom: s } = Tn(o),
          { totalWidth: l, clientWidth: c } = n,
          u = l != null && c != null ? l - c : void 0;
        u < 3 && (u = 0);
        let d = !t.forPrint && !Ke(o),
          f = !t.forPrint && Km(o),
          m = t.cellRows[0].length,
          v = c != null ? c / m : void 0,
          p = v != null && v <= xh,
          E = p || (v != null && v <= o.dayNarrowWidth);
        return (0, j.jsxs)(j.Fragment, {
          children: [
            o.dayHeaders &&
              (0, j.jsxs)('div', {
                className: D(
                  w(o.tableHeaderClass, {
                    isSticky: f,
                    borderlessX: r,
                    borderlessTop: i,
                    borderlessBottom: s,
                    multiMonthColumns: 0,
                  }),
                  S.printHeader,
                  f && S.tableHeaderSticky,
                ),
                children: [
                  (0, j.jsxs)('div', {
                    className: S.flexRow,
                    children: [
                      (0, j.jsx)(Xc, {
                        headerTiers: t.headerTiers,
                        cellIsNarrow: E,
                        cellIsMicro: p,
                      }),
                      !!u &&
                        (0, j.jsx)('div', {
                          className: D(
                            w(o.fillerClass, { inTableHeader: !0 }),
                            S.borderOnlyS,
                          ),
                          style: { minWidth: u },
                        }),
                    ],
                  }),
                  (0, j.jsx)('div', {
                    className: w(o.dayHeaderDividerClass, {
                      isSticky: f,
                      multiMonthColumns: 0,
                      options: { allDaySlot: !!o.allDaySlot },
                    }),
                  }),
                ],
              }),
            (0, j.jsx)(On, {
              vertical: d,
              className: D(
                w(o.tableBodyClass, {
                  borderlessX: r,
                  borderlessTop: i,
                  borderlessBottom: s,
                  multiMonthColumns: 0,
                }),
                !t.forPrint && S.flexCol,
                d && S.liquid,
              ),
              ref: this.handleScroller,
              clientWidthRef: this.handleClientWidth,
              children: (0, j.jsx)(Bi, {
                dateProfile: t.dateProfile,
                todayRange: t.todayRange,
                cellRows: t.cellRows,
                forPrint: t.forPrint,
                isHitComboAllowed: t.isHitComboAllowed,
                className: S.grow,
                dayMaxEvents: t.forPrint ? void 0 : o.dayMaxEvents,
                dayMaxEventRows: o.dayMaxEventRows,
                fgEventSegs: t.fgEventSegs,
                bgEventSegs: t.bgEventSegs,
                businessHourSegs: t.businessHourSegs,
                dateSelectionSegs: t.dateSelectionSegs,
                eventDrag: t.eventDrag,
                eventResize: t.eventResize,
                eventSelection: t.eventSelection,
                visibleWidth: l,
                cellIsNarrow: E,
                cellIsMicro: p,
                rowHeightRefMap: t.rowHeightRefMap,
              }),
            }),
            (0, j.jsx)(ki, { widthRef: this.handleTotalWidth }),
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
    Ih = class extends Z {
      constructor() {
        (super(...arguments), (this.rootElRef = (0, ua.createRef)()));
      }
      render() {
        let { props: t } = this;
        return (0, j.jsx)('div', {
          ref: this.rootElRef,
          className: D(
            S.footerScrollbar,
            t.isSticky && S.footerScrollbarSticky,
          ),
          children: (0, j.jsx)(On, {
            horizontal: !0,
            ref: t.scrollerRef,
            children: (0, j.jsx)('div', { style: { minWidth: t.canvasWidth } }),
          }),
        });
      }
      componentDidMount() {
        ((this._isUnmounting = !1),
          (this.disconnectHeight = cr(this.rootElRef.current, (t) => {
            this._isUnmounting || V(this.props.scrollbarWidthRef, t);
          })));
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0),
          this.disconnectHeight(),
          V(this.props.scrollbarWidthRef, null));
      }
    },
    Hh = class extends Z {
      constructor() {
        (super(...arguments),
          (this.state = {}),
          (this.headerScrollerRef = (0, ua.createRef)()),
          (this.bodyScrollerRef = (0, ua.createRef)()),
          (this.footerScrollerRef = (0, ua.createRef)()),
          (this.handleTotalWidth = (t) => {
            this._isUnmounting || this.setState({ totalWidth: t });
          }),
          (this.handleClientWidth = (t) => {
            this._isUnmounting || this.setState({ clientWidth: t });
          }));
      }
      render() {
        let { props: t, state: n, context: a } = this,
          { options: o } = a,
          { borderlessX: r, borderlessTop: i, borderlessBottom: s } = Tn(o),
          { totalWidth: l, clientWidth: c } = n,
          u = l != null && c != null ? l - c : void 0,
          d = !t.forPrint && !Ke(o),
          f = !t.forPrint && Km(o),
          m = !t.forPrint && OT(o),
          v = t.cellRows[0].length,
          [p, E] = R1(v, t.dayMinWidth, c),
          g = E != null && E <= xh,
          h = g || (E != null && E <= o.dayNarrowWidth);
        return (0, j.jsxs)(j.Fragment, {
          children: [
            o.dayHeaders &&
              (0, j.jsxs)('div', {
                className: D(
                  w(o.tableHeaderClass, {
                    isSticky: f,
                    borderlessX: r,
                    borderlessTop: i,
                    borderlessBottom: s,
                    multiMonthColumns: 0,
                  }),
                  S.printHeader,
                  f && S.tableHeaderSticky,
                ),
                children: [
                  (0, j.jsxs)(On, {
                    horizontal: !0,
                    hideScrollbars: !0,
                    className: S.flexRow,
                    ref: this.headerScrollerRef,
                    children: [
                      (0, j.jsx)(Xc, {
                        headerTiers: t.headerTiers,
                        colWidth: E,
                        viewportWidth: c,
                        width: p,
                        cellIsNarrow: h,
                        cellIsMicro: g,
                      }),
                      !!u &&
                        (0, j.jsx)('div', {
                          className: D(
                            w(o.fillerClass, { inTableHeader: !0 }),
                            S.borderOnlyS,
                          ),
                          style: { minWidth: u },
                        }),
                    ],
                  }),
                  (0, j.jsx)('div', {
                    className: w(o.dayHeaderDividerClass, {
                      isSticky: f,
                      multiMonthColumns: 0,
                      options: { allDaySlot: !!o.allDaySlot },
                    }),
                  }),
                ],
              }),
            (0, j.jsx)(On, {
              vertical: d,
              horizontal: !0,
              hideScrollbars: m || t.forPrint,
              className: D(
                w(o.tableBodyClass, {
                  borderlessX: r,
                  borderlessTop: i,
                  borderlessBottom: s,
                  multiMonthColumns: 0,
                }),
                !t.forPrint && S.flexCol,
                d && S.liquid,
              ),
              ref: this.bodyScrollerRef,
              clientWidthRef: this.handleClientWidth,
              children: (0, j.jsx)(Bi, {
                dateProfile: t.dateProfile,
                todayRange: t.todayRange,
                cellRows: t.cellRows,
                forPrint: t.forPrint,
                isHitComboAllowed: t.isHitComboAllowed,
                className: S.grow,
                dayMaxEvents: t.forPrint ? void 0 : o.dayMaxEvents,
                dayMaxEventRows: o.dayMaxEventRows,
                fgEventSegs: t.fgEventSegs,
                bgEventSegs: t.bgEventSegs,
                businessHourSegs: t.businessHourSegs,
                dateSelectionSegs: t.dateSelectionSegs,
                eventDrag: t.eventDrag,
                eventResize: t.eventResize,
                eventSelection: t.eventSelection,
                colWidth: E,
                width: p,
                visibleWidth: l,
                cellIsNarrow: h,
                cellIsMicro: g,
                rowHeightRefMap: t.rowHeightRefMap,
              }),
            }),
            !!m &&
              (0, j.jsx)(Ih, {
                isSticky: !0,
                canvasWidth: p,
                scrollerRef: this.footerScrollerRef,
              }),
            (0, j.jsx)(ki, { widthRef: this.handleTotalWidth }),
          ],
        });
      }
      componentDidMount() {
        this._isUnmounting = !1;
        let t = CT(this.context.pluginHooks);
        ((this.syncedScroller = new t(!0)),
          V(this.props.scrollerRef, this.syncedScroller),
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
    Qc = class extends Z {
      constructor() {
        (super(...arguments),
          (this.scrollerRef = (0, ua.createRef)()),
          (this.rowHeightRefMap = new Nn(() => {
            Ga(this.updateScrollY);
          })),
          (this.scrollDate = null),
          (this.updateScrollY = () => {
            if (this._isUnmounting) return;
            let t = this.rowHeightRefMap.current,
              n = this.scrollerRef.current;
            if (n && this.scrollDate) {
              let a = $1(this.scrollDate, this.props.cellRows, t);
              a != null && (a && a++, n.scrollTo({ y: a }));
            }
          }),
          (this.handleScrollEnd = (t) => {
            t && (this.scrollDate = null);
          }));
      }
      render() {
        let { props: t, context: n } = this,
          { options: a } = n,
          { borderlessX: o, borderlessTop: r, borderlessBottom: i } = Tn(a),
          s = t.forPrint ? [] : t.businessHourSegs,
          l = t.forPrint ? [] : t.dateSelectionSegs,
          c = t.forPrint ? null : t.eventDrag,
          u = t.forPrint ? null : t.eventResize,
          d = {
            ...t,
            businessHourSegs: s,
            dateSelectionSegs: l,
            eventDrag: c,
            eventResize: u,
            scrollerRef: this.scrollerRef,
            rowHeightRefMap: this.rowHeightRefMap,
          };
        return (0, j.jsx)(rr, {
          viewSpec: n.viewSpec,
          attrs: {
            role: 'grid',
            'aria-rowcount': t.headerTiers.length + t.cellRows.length,
            'aria-colcount': t.cellRows[0].length,
            'aria-labelledby': t.labelId,
            'aria-label': t.labelStr,
          },
          className: D(
            t.className,
            S.printRoot,
            w(a.tableClass, {
              borderlessX: o,
              borderlessTop: r,
              borderlessBottom: i,
              multiMonthColumns: 0,
            }),
          ),
          children: a.dayMinWidth
            ? (0, j.jsx)(Hh, { ...d, dayMinWidth: a.dayMinWidth })
            : (0, j.jsx)(Ah, { ...d }),
        });
      }
      componentDidMount() {
        ((this._isUnmounting = !1),
          this.resetScroll(),
          this.scrollerRef.current.addScrollEndListener(this.handleScrollEnd));
      }
      componentDidUpdate(t) {
        t.dateProfile !== this.props.dateProfile &&
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
    };
  var Kc = class extends nr {
    buildRenderRange(t, n, a) {
      let o = super.buildRenderRange(t, n, a),
        { props: r } = this;
      return wR({
        currentRange: o,
        snapToWeek: /^(year|month)$/.test(n),
        fixedWeekCount: r.fixedWeekCount,
        dateEnv: r.dateEnv,
      });
    }
  };
  function wR(e) {
    let { dateEnv: t, currentRange: n } = e,
      { start: a, end: o } = n,
      r;
    if (
      (e.snapToWeek &&
        ((a = t.startOfWeek(a)),
        (r = t.startOfWeek(o)),
        r.valueOf() !== o.valueOf() && (o = Rm(r, 1))),
      e.fixedWeekCount)
    ) {
      let i = t.startOfWeek(t.startOfMonth(ne(n.end, -1))),
        s = Math.ceil(DS(i, o));
      o = Rm(o, 6 - s);
    }
    return { start: a, end: o };
  }
  var Yh = class extends Z {
      constructor() {
        (super(...arguments),
          (this.buildDayTableModel = k(w1)),
          (this.buildDateRowConfigs = k(E1)),
          (this.createDayHeaderFormatter = k(x1)),
          (this.slicer = new Vc()));
      }
      render() {
        let { props: t, context: n } = this,
          { dateProfile: a } = t,
          { options: o, dateEnv: r } = n,
          i = this.buildDayTableModel(a, n.dateProfileGenerator, r),
          s = i.rowCount === 1,
          l = this.createDayHeaderFormatter(
            n.options.dayHeaderFormat,
            s,
            i.colCount,
          ),
          c = this.slicer.sliceProps(t, a, o.nextDayThreshold, n, i);
        return (0, Uh.jsx)(Pa, {
          unit: 'day',
          children: (u, d) => {
            let f = this.buildDateRowConfigs(i.headerDates, s, a, d, l, n);
            return (0, Uh.jsx)(Qc, {
              labelId: t.labelId,
              labelStr: t.labelStr,
              dateProfile: a,
              todayRange: d,
              cellRows: i.cellRows,
              forPrint: t.forPrint,
              className: t.className,
              headerTiers: f,
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
    kh = {
      name: 'daygrid',
      initialView: 'dayGridMonth',
      views: {
        dayGrid: { component: Yh, dateProfileGeneratorClass: Kc },
        dayGridDay: { type: 'dayGrid', duration: { days: 1 } },
        dayGridWeek: { type: 'dayGrid', duration: { weeks: 1 } },
        dayGridMonth: {
          type: 'dayGrid',
          duration: { months: 1 },
          fixedWeekCount: !0,
        },
        dayGridYear: { type: 'dayGrid', duration: { years: 1 } },
      },
    };
  var me = F(Ae(), 1);
  var Jc = class extends Z {
      render() {
        let { props: t, context: n } = this,
          { options: a } = n,
          o = n.dateEnv.formatToParts(t.dayDate, t.dayFormat),
          r = ve(o),
          i = a.navLinks,
          s = {
            ...t.dateMeta,
            view: n.viewApi,
            text: r,
            textParts: o,
            get weekdayText() {
              return qa(o);
            },
            get dayNumberText() {
              return Va(o);
            },
            hasNavLink: i,
            level: t.level,
          },
          l = i
            ? sr(this.context, t.dayDate, void 0, r, this.props.isTabbable)
            : {};
        return (0, me.jsx)(le, {
          tag: 'div',
          attrs: l,
          renderProps: s,
          generatorName: 'listDayHeaderContent',
          customGenerator: a.listDayHeaderContent,
          defaultGenerator: Hi,
          classNameGenerator: a.listDayHeaderInnerClass,
        });
      }
    },
    Bh = class extends Z {
      render() {
        let { options: t, viewApi: n, viewSpec: a } = this.context,
          { dayDate: o, dateMeta: r } = this.props,
          i = !this.props.forPrint,
          s = t.listDayFormat ?? RR(a),
          l = t.listDayAltFormat ?? $R(a),
          c = { ...r, view: n };
        return (0, me.jsx)(le, {
          tag: 'div',
          attrs: {
            'data-date': Ba(o),
            ...(r.isToday ? { 'aria-current': 'date' } : {}),
          },
          className: i ? S.stickyT : '',
          renderProps: c,
          generatorName: void 0,
          classNameGenerator: t.listDayHeaderClass,
          didMount: t.listDayHeaderDidMount,
          willUnmount: t.listDayHeaderWillUnmount,
          children: () =>
            (0, me.jsxs)(me.Fragment, {
              children: [
                !!s &&
                  (0, me.jsx)(Jc, {
                    dayDate: o,
                    dayFormat: s,
                    isTabbable: !0,
                    dateMeta: r,
                    level: 0,
                  }),
                !!l &&
                  (0, me.jsx)(Jc, {
                    dayDate: o,
                    dayFormat: l,
                    isTabbable: !1,
                    dateMeta: r,
                    level: 1,
                  }),
              ],
            }),
        });
      }
    };
  function RR({ durationUnit: e, singleUnit: t }) {
    return t === 'day' ? ir : e === 'day' || t === 'week' ? ir : Fc;
  }
  function $R({ durationUnit: e, singleUnit: t }) {
    if (t !== 'day') return e === 'day' || t === 'week' ? Fc : ir;
  }
  var xR = ee({ hour: 'numeric', minute: '2-digit', meridiem: 'short' }),
    _h = class extends Z {
      render() {
        let { props: t, context: n } = this,
          { eventRange: a } = t,
          { displayEventTime: o } = n.options,
          r =
            o !== !1 && (a.def.allDay || (!t.isStart && !t.isEnd))
              ? n.options.allDayText
              : void 0;
        return (0, me.jsx)(ca, {
          ...t,
          attrs: { role: 'listitem' },
          forcedTimeText: r,
          defaultTimeFormat: xR,
          disableDragging: !0,
          disableResizing: !0,
          disableZindexes: !0,
          display: 'list-item',
        });
      }
    },
    zh = class extends Z {
      constructor() {
        (super(...arguments),
          (this.getDateMeta = k(lr)),
          (this.sortEventSegs = k(Cc)));
      }
      render() {
        let { props: t, context: n } = this,
          { nowDate: a, todayRange: o } = t,
          { options: r } = n,
          i = this.getDateMeta(t.dayDate, n.dateEnv, void 0, o),
          s = this.sortEventSegs(t.segs, r.eventOrder),
          l = ja(this.context, t.dayDate),
          c = { ...i, isFirst: t.isFirst, isLast: t.isLast, view: n.viewApi },
          u = { ...i, view: n.viewApi };
        return (0, me.jsxs)('div', {
          role: 'listitem',
          'aria-label': l,
          className: w(r.listDayClass, c),
          children: [
            (0, me.jsx)(Bh, {
              dayDate: t.dayDate,
              dateMeta: i,
              forPrint: t.forPrint,
            }),
            (0, me.jsx)('div', {
              role: 'list',
              'aria-label': r.eventsHint,
              className: D(w(r.listDayBodyClass, u), S.flexCol),
              children: s.map((d, f) => {
                let m = Ec(d),
                  v = f === 0,
                  p = f === s.length - 1;
                return (0, me.jsx)(
                  _h,
                  {
                    eventRange: d.eventRange,
                    slicedStart: d.slicedStart,
                    slicedEnd: d.slicedEnd,
                    isStart: d.isStart,
                    isEnd: d.isEnd,
                    isFirst: v,
                    isLast: p,
                    isDragging: !1,
                    isResizing: !1,
                    isMirror: !1,
                    isSelected: !1,
                    ...er(d.eventRange, o, a),
                  },
                  m,
                );
              }),
            }),
          ],
        });
      }
    },
    Lh = class extends En {
      constructor() {
        (super(...arguments),
          (this.computeDateVars = k(IR)),
          (this.eventStoreToSegs = k(this._eventStoreToSegs)),
          (this.setRootEl = (t) => {
            t
              ? this.context.registerInteractiveComponent(this, {
                  el: t,
                  disableHits: !0,
                })
              : this.context.unregisterInteractiveComponent(this);
          }));
      }
      render() {
        let { props: t, context: n } = this,
          { options: a } = n,
          { dayDates: o, dayRanges: r } = this.computeDateVars(t.dateProfile),
          i = this.eventStoreToSegs(t.eventStore, t.eventUiBases, r),
          s = !t.forPrint && !Ke(a);
        return (0, me.jsx)(rr, {
          viewSpec: n.viewSpec,
          className: D(t.className, S.flexCol),
          elRef: this.setRootEl,
          children: i.length
            ? (0, me.jsx)(On, {
                vertical: s,
                className: D(S.flexCol, s ? S.liquid : ''),
                children: this.renderSegList(i, o),
              })
            : this.renderEmptyMessage(),
        });
      }
      renderEmptyMessage() {
        let { options: t, viewApi: n } = this.context,
          a = { text: t.noEventsText, view: n };
        return (0, me.jsx)(le, {
          tag: 'div',
          attrs: { role: 'status' },
          renderProps: a,
          generatorName: 'noEventsContent',
          customGenerator: t.noEventsContent,
          defaultGenerator: AR,
          classNameGenerator: t.noEventsClass,
          className: S.grow,
          didMount: t.noEventsDidMount,
          willUnmount: t.noEventsWillUnmount,
          children: (o) =>
            (0, me.jsx)(o, {
              tag: 'div',
              className: w(t.noEventsInnerClass, a),
            }),
        });
      }
      renderSegList(t, n) {
        let { options: a } = this.context,
          o = HR(t);
        return (0, me.jsx)('div', {
          role: 'list',
          'aria-labelledby': this.props.labelId,
          'aria-label': this.props.labelStr,
          className: D(S.flexCol, D(a.listDaysClass)),
          children: (0, me.jsx)(Pa, {
            unit: 'day',
            children: (r, i) => {
              let s = [],
                l = o.reduce((u, d) => u + (d ? 1 : 0), 0),
                c = 0;
              for (let u = 0; u < o.length; u += 1) {
                let d = o[u];
                if (d) {
                  let f = n[u],
                    m = Ba(f),
                    v = c === 0,
                    p = c === l - 1;
                  (s.push(
                    (0, me.jsx)(
                      zh,
                      {
                        dayDate: f,
                        nowDate: r,
                        todayRange: i,
                        segs: d,
                        isFirst: v,
                        isLast: p,
                        forPrint: this.props.forPrint,
                      },
                      m,
                    ),
                  ),
                    (c += 1));
                }
              }
              return (0, me.jsx)(me.Fragment, { children: s });
            },
          }),
        });
      }
      _eventStoreToSegs(t, n, a) {
        return this.eventRangesToSegs(
          Ai(
            t,
            n,
            this.props.dateProfile.activeRange,
            this.context.options.nextDayThreshold,
          ).fg,
          a,
        );
      }
      eventRangesToSegs(t, n) {
        let a = [];
        for (let o of t) a.push(...this.eventRangeToSegs(o, n));
        return a;
      }
      eventRangeToSegs(t, n) {
        let a = t.range,
          o,
          r = [];
        for (o = 0; o < n.length; o += 1) {
          let i = Rt(a, n[o]);
          i &&
            r.push({
              eventRange: t,
              slicedStart: i.start,
              slicedEnd: i.end,
              isStart: t.isStart && a.start.valueOf() === i.start.valueOf(),
              isEnd: t.isEnd && a.end.valueOf() === i.end.valueOf(),
              dayIndex: o,
            });
        }
        return r;
      }
    };
  function AR(e) {
    return e.text;
  }
  function IR(e) {
    let t = G(e.renderRange.start),
      n = e.renderRange.end,
      a = [],
      o = [];
    for (; t < n; )
      (a.push(t), o.push({ start: t, end: ne(t, 1) }), (t = ne(t, 1)));
    return { dayDates: a, dayRanges: o };
  }
  function HR(e) {
    let t = [],
      n,
      a;
    for (n = 0; n < e.length; n += 1)
      ((a = e[n]), (t[a.dayIndex] || (t[a.dayIndex] = [])).push(a));
    return t;
  }
  var Zh = {
    name: 'list',
    views: {
      list: {
        component: Lh,
        buttonTextKey: 'listText',
        disallowAmbigTitle: !0,
      },
      listDay: { type: 'list', duration: { days: 1 } },
      listWeek: { type: 'list', duration: { weeks: 1 } },
      listMonth: { type: 'list', duration: { month: 1 } },
      listYear: { type: 'list', duration: { year: 1 } },
    },
  };
  function A1(e) {
    if (e) {
      let n = e.replace(/\\/g, '').split('-');
      return `${n[0].trim()}, ${n[1].trim()}`;
    }
    return '';
  }
  function I1(e) {
    let t = new Date(e);
    function n(r) {
      if (r > 3 && r < 21) return 'th';
      switch (r % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }
    let a = t.getDate(),
      o = n(a);
    if (e.length === 10) {
      let r = t.toLocaleDateString('en-us', { month: 'long', year: 'numeric' });
      return `${r.split(' ')} ${a}${o}, ${r.split(' ')[1]}`;
    } else {
      let r = t.toLocaleDateString('en-us', { month: 'long', year: 'numeric' }),
        i = t.toLocaleTimeString('en-us', {
          hour: 'numeric',
          minute: 'numeric',
        });
      return `${r.split(' ')[0]} ${a}${o}, ${r.split(' ')[1]} at ${i}`;
    }
  }
  var Ht = F(Ae());
  function Wh({ closeModal: e, info: t }) {
    return (0, Ht.jsx)('div', {
      id: 'modal',
      className:
        'fixed top-0 left-0 w-full h-full bg-[#9fa9a3]/80 flex items-center justify-center z-1',
      children: (0, Ht.jsxs)('div', {
        className: 'calendar-modal',
        children: [
          (0, Ht.jsx)('h3', { children: t.event.title }),
          (0, Ht.jsx)('h4', { children: A1(t.event.extendedProps.location) }),
          (0, Ht.jsx)('h5', { children: I1(t.event.startStr) }),
          (0, Ht.jsx)('div', { children: t.event.extendedProps.description }),
          (0, Ht.jsx)('button', {
            onClick: e,
            className:
              'absolute top-1 right-1 bg-transparent border-none cursor-pointer',
            children: (0, Ht.jsx)('svg', {
              xmlns: 'http://www.w3.org/2000/svg',
              x: '0px',
              y: '0px',
              width: '20',
              height: '20',
              viewBox: '0 0 50 50',
              className: 'stroke-[#9fa9a3] fill-[#9fa9a3]',
              children: (0, Ht.jsx)('path', {
                d: 'M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z',
              }),
            }),
          }),
        ],
      }),
    });
  }
  var Fh = F(dt()),
    _i = F(Ae());
  function Ph({ events: e, view: t = 'dayGridMonth' }) {
    let [n, a] = (0, Fh.useState)(!1),
      [o, r] = (0, Fh.useState)(null);
    return (0, _i.jsxs)('div', {
      className: 'p-6 h-lvh',
      children: [
        (0, _i.jsx)(i1, {
          availableViews: ['dayGridMonth', 'listMonth'],
          initialView: t,
          plugins: [kh, Zh],
          height: t === 'listMonth' ? '95vh' : void 0,
          events: e,
          headerToolbar: { start: 'title', end: 'prev,next' },
          eventClick: (s) => {
            (s.jsEvent.preventDefault(), r(s), a(!0));
          },
        }),
        n && (0, _i.jsx)(Wh, { info: o, closeModal: () => a(!1) }),
      ],
    });
  }
  var zi = F(Ae());
  function qh({ events: e }) {
    let [t, n] = (0, eu.useState)(null);
    return (
      (0, eu.useEffect)(() => {
        let a = () => {
          (console.log('updateView', window.innerWidth),
            n(window.innerWidth < 800 ? 'listMonth' : 'dayGridMonth'));
        };
        return (
          a(),
          window.addEventListener('resize', a),
          () => {
            window.removeEventListener('resize', a);
          }
        );
      }, []),
      t
        ? (0, zi.jsx)(zi.Fragment, {
            children: (0, zi.jsx)(Ph, { events: e, view: t }),
          })
        : null
    );
  }
  var U1 = F(Ae());
  function UR(e, t) {
    (0, H1.createRoot)(e).render((0, U1.jsx)(qh, { events: t }));
  }
  window.ChurchCalendar = { mountCalendar: UR };
})();
/*! Bundled license information:

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=calendar-client.js.map
