'use strict';
(() => {
  var Q1 = Object.create;
  var lp = Object.defineProperty;
  var K1 = Object.getOwnPropertyDescriptor;
  var J1 = Object.getOwnPropertyNames;
  var eD = Object.getPrototypeOf,
    tD = Object.prototype.hasOwnProperty;
  var kt = (e, t) => () => {
    try {
      return (t || e((t = { exports: {} }).exports, t), t.exports);
    } catch (n) {
      throw ((t = 0), n);
    }
  };
  var nD = (e, t, n, a) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let o of J1(t))
        !tD.call(e, o) &&
          o !== n &&
          lp(e, o, {
            get: () => t[o],
            enumerable: !(a = K1(t, o)) || a.enumerable,
          });
    return e;
  };
  var U = (e, t, n) => (
    (n = e != null ? Q1(eD(e)) : {}),
    nD(
      t || !e || !e.__esModule
        ? lp(n, 'default', { value: e, enumerable: !0 })
        : n,
      e,
    )
  );
  var vp = kt((fe) => {
    'use strict';
    function du(e, t) {
      var n = e.length;
      e.push(t);
      e: for (; 0 < n; ) {
        var a = (n - 1) >>> 1,
          o = e[a];
        if (0 < Gi(o, t)) ((e[a] = t), (e[n] = o), (n = a));
        else break e;
      }
    }
    function Yt(e) {
      return e.length === 0 ? null : e[0];
    }
    function Qi(e) {
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
          if (0 > Gi(s, n))
            l < o && 0 > Gi(c, s)
              ? ((e[a] = c), (e[l] = n), (a = l))
              : ((e[a] = s), (e[i] = n), (a = i));
          else if (l < o && 0 > Gi(c, n)) ((e[a] = c), (e[l] = n), (a = l));
          else break e;
        }
      }
      return t;
    }
    function Gi(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return n !== 0 ? n : e.id - t.id;
    }
    fe.unstable_now = void 0;
    typeof performance == 'object' && typeof performance.now == 'function'
      ? ((cp = performance),
        (fe.unstable_now = function () {
          return cp.now();
        }))
      : ((cu = Date),
        (up = cu.now()),
        (fe.unstable_now = function () {
          return cu.now() - up;
        }));
    var cp,
      cu,
      up,
      Gt = [],
      Rn = [],
      aD = 1,
      ft = null,
      Be = 3,
      mu = !1,
      pr = !1,
      gr = !1,
      hu = !1,
      mp = typeof setTimeout == 'function' ? setTimeout : null,
      hp = typeof clearTimeout == 'function' ? clearTimeout : null,
      fp = typeof setImmediate < 'u' ? setImmediate : null;
    function Xi(e) {
      for (var t = Yt(Rn); t !== null; ) {
        if (t.callback === null) Qi(Rn);
        else if (t.startTime <= e)
          (Qi(Rn), (t.sortIndex = t.expirationTime), du(Gt, t));
        else break;
        t = Yt(Rn);
      }
    }
    function pu(e) {
      if (((gr = !1), Xi(e), !pr))
        if (Yt(Gt) !== null) ((pr = !0), to || ((to = !0), eo()));
        else {
          var t = Yt(Rn);
          t !== null && gu(pu, t.startTime - e);
        }
    }
    var to = !1,
      yr = -1,
      pp = 5,
      gp = -1;
    function yp() {
      return hu ? !0 : !(fe.unstable_now() - gp < pp);
    }
    function uu() {
      if (((hu = !1), to)) {
        var e = fe.unstable_now();
        gp = e;
        var t = !0;
        try {
          e: {
            ((pr = !1), gr && ((gr = !1), hp(yr), (yr = -1)), (mu = !0));
            var n = Be;
            try {
              t: {
                for (
                  Xi(e), ft = Yt(Gt);
                  ft !== null && !(ft.expirationTime > e && yp());
                ) {
                  var a = ft.callback;
                  if (typeof a == 'function') {
                    ((ft.callback = null), (Be = ft.priorityLevel));
                    var o = a(ft.expirationTime <= e);
                    if (((e = fe.unstable_now()), typeof o == 'function')) {
                      ((ft.callback = o), Xi(e), (t = !0));
                      break t;
                    }
                    (ft === Yt(Gt) && Qi(Gt), Xi(e));
                  } else Qi(Gt);
                  ft = Yt(Gt);
                }
                if (ft !== null) t = !0;
                else {
                  var r = Yt(Rn);
                  (r !== null && gu(pu, r.startTime - e), (t = !1));
                }
              }
              break e;
            } finally {
              ((ft = null), (Be = n), (mu = !1));
            }
            t = void 0;
          }
        } finally {
          t ? eo() : (to = !1);
        }
      }
    }
    var eo;
    typeof fp == 'function'
      ? (eo = function () {
          fp(uu);
        })
      : typeof MessageChannel < 'u'
        ? ((fu = new MessageChannel()),
          (dp = fu.port2),
          (fu.port1.onmessage = uu),
          (eo = function () {
            dp.postMessage(null);
          }))
        : (eo = function () {
            mp(uu, 0);
          });
    var fu, dp;
    function gu(e, t) {
      yr = mp(function () {
        e(fe.unstable_now());
      }, t);
    }
    fe.unstable_IdlePriority = 5;
    fe.unstable_ImmediatePriority = 1;
    fe.unstable_LowPriority = 4;
    fe.unstable_NormalPriority = 3;
    fe.unstable_Profiling = null;
    fe.unstable_UserBlockingPriority = 2;
    fe.unstable_cancelCallback = function (e) {
      e.callback = null;
    };
    fe.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
          )
        : (pp = 0 < e ? Math.floor(1e3 / e) : 5);
    };
    fe.unstable_getCurrentPriorityLevel = function () {
      return Be;
    };
    fe.unstable_next = function (e) {
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
    fe.unstable_requestPaint = function () {
      hu = !0;
    };
    fe.unstable_runWithPriority = function (e, t) {
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
    fe.unstable_scheduleCallback = function (e, t, n) {
      var a = fe.unstable_now();
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
          id: aD++,
          callback: t,
          priorityLevel: e,
          startTime: n,
          expirationTime: o,
          sortIndex: -1,
        }),
        n > a
          ? ((e.sortIndex = n),
            du(Rn, e),
            Yt(Gt) === null &&
              e === Yt(Rn) &&
              (gr ? (hp(yr), (yr = -1)) : (gr = !0), gu(pu, n - a)))
          : ((e.sortIndex = o),
            du(Gt, e),
            pr || mu || ((pr = !0), to || ((to = !0), eo()))),
        e
      );
    };
    fe.unstable_shouldYield = yp;
    fe.unstable_wrapCallback = function (e) {
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
  var Sp = kt((t$, bp) => {
    'use strict';
    bp.exports = vp();
  });
  var xp = kt((k) => {
    'use strict';
    var bu = Symbol.for('react.transitional.element'),
      oD = Symbol.for('react.portal'),
      rD = Symbol.for('react.fragment'),
      iD = Symbol.for('react.strict_mode'),
      sD = Symbol.for('react.profiler'),
      lD = Symbol.for('react.consumer'),
      cD = Symbol.for('react.context'),
      uD = Symbol.for('react.forward_ref'),
      fD = Symbol.for('react.suspense'),
      dD = Symbol.for('react.memo'),
      Op = Symbol.for('react.lazy'),
      mD = Symbol.for('react.activity'),
      Tp = Symbol.iterator;
    function hD(e) {
      return e === null || typeof e != 'object'
        ? null
        : ((e = (Tp && e[Tp]) || e['@@iterator']),
          typeof e == 'function' ? e : null);
    }
    var Cp = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      Np = Object.assign,
      wp = {};
    function ao(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = wp),
        (this.updater = n || Cp));
    }
    ao.prototype.isReactComponent = {};
    ao.prototype.setState = function (e, t) {
      if (typeof e != 'object' && typeof e != 'function' && e != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.',
        );
      this.updater.enqueueSetState(this, e, t, 'setState');
    };
    ao.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
    };
    function Rp() {}
    Rp.prototype = ao.prototype;
    function Su(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = wp),
        (this.updater = n || Cp));
    }
    var Tu = (Su.prototype = new Rp());
    Tu.constructor = Su;
    Np(Tu, ao.prototype);
    Tu.isPureReactComponent = !0;
    var Dp = Array.isArray;
    function vu() {}
    var re = { H: null, A: null, T: null, S: null },
      $p = Object.prototype.hasOwnProperty;
    function Du(e, t, n) {
      var a = n.ref;
      return {
        $$typeof: bu,
        type: e,
        key: t,
        ref: a !== void 0 ? a : null,
        props: n,
      };
    }
    function pD(e, t) {
      return Du(e.type, t, e.props);
    }
    function Mu(e) {
      return typeof e == 'object' && e !== null && e.$$typeof === bu;
    }
    function gD(e) {
      var t = { '=': '=0', ':': '=2' };
      return (
        '$' +
        e.replace(/[=:]/g, function (n) {
          return t[n];
        })
      );
    }
    var Mp = /\/+/g;
    function yu(e, t) {
      return typeof e == 'object' && e !== null && e.key != null
        ? gD('' + e.key)
        : t.toString(36);
    }
    function yD(e) {
      switch (e.status) {
        case 'fulfilled':
          return e.value;
        case 'rejected':
          throw e.reason;
        default:
          switch (
            (typeof e.status == 'string'
              ? e.then(vu, vu)
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
    function no(e, t, n, a, o) {
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
              case bu:
              case oD:
                i = !0;
                break;
              case Op:
                return ((i = e._init), no(i(e._payload), t, n, a, o));
            }
        }
      if (i)
        return (
          (o = o(e)),
          (i = a === '' ? '.' + yu(e, 0) : a),
          Dp(o)
            ? ((n = ''),
              i != null && (n = i.replace(Mp, '$&/') + '/'),
              no(o, t, n, '', function (c) {
                return c;
              }))
            : o != null &&
              (Mu(o) &&
                (o = pD(
                  o,
                  n +
                    (o.key == null || (e && e.key === o.key)
                      ? ''
                      : ('' + o.key).replace(Mp, '$&/') + '/') +
                    i,
                )),
              t.push(o)),
          1
        );
      i = 0;
      var s = a === '' ? '.' : a + ':';
      if (Dp(e))
        for (var l = 0; l < e.length; l++)
          ((a = e[l]), (r = s + yu(a, l)), (i += no(a, t, n, r, o)));
      else if (((l = hD(e)), typeof l == 'function'))
        for (e = l.call(e), l = 0; !(a = e.next()).done; )
          ((a = a.value), (r = s + yu(a, l++)), (i += no(a, t, n, r, o)));
      else if (r === 'object') {
        if (typeof e.then == 'function') return no(yD(e), t, n, a, o);
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
    function Ki(e, t, n) {
      if (e == null) return e;
      var a = [],
        o = 0;
      return (
        no(e, a, '', '', function (r) {
          return t.call(n, r, o++);
        }),
        a
      );
    }
    function vD(e) {
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
    var Ep =
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
      bD = {
        map: Ki,
        forEach: function (e, t, n) {
          Ki(
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
            Ki(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            Ki(e, function (t) {
              return t;
            }) || []
          );
        },
        only: function (e) {
          if (!Mu(e))
            throw Error(
              'React.Children.only expected to receive a single React element child.',
            );
          return e;
        },
      };
    k.Activity = mD;
    k.Children = bD;
    k.Component = ao;
    k.Fragment = rD;
    k.Profiler = sD;
    k.PureComponent = Su;
    k.StrictMode = iD;
    k.Suspense = fD;
    k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = re;
    k.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (e) {
        return re.H.useMemoCache(e);
      },
    };
    k.cache = function (e) {
      return function () {
        return e.apply(null, arguments);
      };
    };
    k.cacheSignal = function () {
      return null;
    };
    k.cloneElement = function (e, t, n) {
      if (e == null)
        throw Error(
          'The argument must be a React element, but you passed ' + e + '.',
        );
      var a = Np({}, e.props),
        o = e.key;
      if (t != null)
        for (r in (t.key !== void 0 && (o = '' + t.key), t))
          !$p.call(t, r) ||
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
      return Du(e.type, o, a);
    };
    k.createContext = function (e) {
      return (
        (e = {
          $$typeof: cD,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (e.Provider = e),
        (e.Consumer = { $$typeof: lD, _context: e }),
        e
      );
    };
    k.createElement = function (e, t, n) {
      var a,
        o = {},
        r = null;
      if (t != null)
        for (a in (t.key !== void 0 && (r = '' + t.key), t))
          $p.call(t, a) &&
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
      return Du(e, r, o);
    };
    k.createRef = function () {
      return { current: null };
    };
    k.forwardRef = function (e) {
      return { $$typeof: uD, render: e };
    };
    k.isValidElement = Mu;
    k.lazy = function (e) {
      return { $$typeof: Op, _payload: { _status: -1, _result: e }, _init: vD };
    };
    k.memo = function (e, t) {
      return { $$typeof: dD, type: e, compare: t === void 0 ? null : t };
    };
    k.startTransition = function (e) {
      var t = re.T,
        n = {};
      re.T = n;
      try {
        var a = e(),
          o = re.S;
        (o !== null && o(n, a),
          typeof a == 'object' &&
            a !== null &&
            typeof a.then == 'function' &&
            a.then(vu, Ep));
      } catch (r) {
        Ep(r);
      } finally {
        (t !== null && n.types !== null && (t.types = n.types), (re.T = t));
      }
    };
    k.unstable_useCacheRefresh = function () {
      return re.H.useCacheRefresh();
    };
    k.use = function (e) {
      return re.H.use(e);
    };
    k.useActionState = function (e, t, n) {
      return re.H.useActionState(e, t, n);
    };
    k.useCallback = function (e, t) {
      return re.H.useCallback(e, t);
    };
    k.useContext = function (e) {
      return re.H.useContext(e);
    };
    k.useDebugValue = function () {};
    k.useDeferredValue = function (e, t) {
      return re.H.useDeferredValue(e, t);
    };
    k.useEffect = function (e, t) {
      return re.H.useEffect(e, t);
    };
    k.useEffectEvent = function (e) {
      return re.H.useEffectEvent(e);
    };
    k.useId = function () {
      return re.H.useId();
    };
    k.useImperativeHandle = function (e, t, n) {
      return re.H.useImperativeHandle(e, t, n);
    };
    k.useInsertionEffect = function (e, t) {
      return re.H.useInsertionEffect(e, t);
    };
    k.useLayoutEffect = function (e, t) {
      return re.H.useLayoutEffect(e, t);
    };
    k.useMemo = function (e, t) {
      return re.H.useMemo(e, t);
    };
    k.useOptimistic = function (e, t) {
      return re.H.useOptimistic(e, t);
    };
    k.useReducer = function (e, t, n) {
      return re.H.useReducer(e, t, n);
    };
    k.useRef = function (e) {
      return re.H.useRef(e);
    };
    k.useState = function (e) {
      return re.H.useState(e);
    };
    k.useSyncExternalStore = function (e, t, n) {
      return re.H.useSyncExternalStore(e, t, n);
    };
    k.useTransition = function () {
      return re.H.useTransition();
    };
    k.version = '19.2.8';
  });
  var dt = kt((a$, Ap) => {
    'use strict';
    Ap.exports = xp();
  });
  var Hp = kt((Le) => {
    'use strict';
    var SD = dt();
    function Ip(e) {
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
    function $n() {}
    var ze = {
        d: {
          f: $n,
          r: function () {
            throw Error(Ip(522));
          },
          D: $n,
          C: $n,
          L: $n,
          m: $n,
          X: $n,
          S: $n,
          M: $n,
        },
        p: 0,
        findDOMNode: null,
      },
      TD = Symbol.for('react.portal');
    function DD(e, t, n) {
      var a =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: TD,
        key: a == null ? null : '' + a,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    var vr = SD.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function Ji(e, t) {
      if (e === 'font') return '';
      if (typeof t == 'string') return t === 'use-credentials' ? t : '';
    }
    Le.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ze;
    Le.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
        throw Error(Ip(299));
      return DD(e, t, null, n);
    };
    Le.flushSync = function (e) {
      var t = vr.T,
        n = ze.p;
      try {
        if (((vr.T = null), (ze.p = 2), e)) return e();
      } finally {
        ((vr.T = t), (ze.p = n), ze.d.f());
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
          a = Ji(n, t.crossOrigin),
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
            var n = Ji(t.as, t.crossOrigin);
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
          a = Ji(n, t.crossOrigin);
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
          var n = Ji(t.as, t.crossOrigin);
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
      return vr.H.useFormState(e, t, n);
    };
    Le.useFormStatus = function () {
      return vr.H.useHostTransitionStatus();
    };
    Le.version = '19.2.8';
  });
  var oo = kt((r$, kp) => {
    'use strict';
    function Up() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Up);
        } catch (e) {
          console.error(e);
        }
    }
    (Up(), (kp.exports = Hp()));
  });
  var jb = kt((El) => {
    'use strict';
    var we = Sp(),
      ly = dt(),
      MD = oo();
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
    function cy(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function oi(e) {
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
    function uy(e) {
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
    function fy(e) {
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
    function Yp(e) {
      if (oi(e) !== e) throw Error(M(188));
    }
    function ED(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = oi(e)), t === null)) throw Error(M(188));
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
            if (r === n) return (Yp(o), e);
            if (r === a) return (Yp(o), t);
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
    function dy(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (((t = dy(e)), t !== null)) return t;
        e = e.sibling;
      }
      return null;
    }
    var le = Object.assign,
      OD = Symbol.for('react.element'),
      es = Symbol.for('react.transitional.element'),
      Cr = Symbol.for('react.portal'),
      uo = Symbol.for('react.fragment'),
      my = Symbol.for('react.strict_mode'),
      af = Symbol.for('react.profiler'),
      hy = Symbol.for('react.consumer'),
      an = Symbol.for('react.context'),
      Jf = Symbol.for('react.forward_ref'),
      of = Symbol.for('react.suspense'),
      rf = Symbol.for('react.suspense_list'),
      ed = Symbol.for('react.memo'),
      xn = Symbol.for('react.lazy'),
      sf = Symbol.for('react.activity'),
      CD = Symbol.for('react.memo_cache_sentinel'),
      Bp = Symbol.iterator;
    function br(e) {
      return e === null || typeof e != 'object'
        ? null
        : ((e = (Bp && e[Bp]) || e['@@iterator']),
          typeof e == 'function' ? e : null);
    }
    var ND = Symbol.for('react.client.reference');
    function lf(e) {
      if (e == null) return null;
      if (typeof e == 'function')
        return e.$$typeof === ND ? null : e.displayName || e.name || null;
      if (typeof e == 'string') return e;
      switch (e) {
        case uo:
          return 'Fragment';
        case af:
          return 'Profiler';
        case my:
          return 'StrictMode';
        case of:
          return 'Suspense';
        case rf:
          return 'SuspenseList';
        case sf:
          return 'Activity';
      }
      if (typeof e == 'object')
        switch (e.$$typeof) {
          case Cr:
            return 'Portal';
          case an:
            return e.displayName || 'Context';
          case hy:
            return (e._context.displayName || 'Context') + '.Consumer';
          case Jf:
            var t = e.render;
            return (
              (e = e.displayName),
              e ||
                ((e = t.displayName || t.name || ''),
                (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
              e
            );
          case ed:
            return (
              (t = e.displayName || null),
              t !== null ? t : lf(e.type) || 'Memo'
            );
          case xn:
            ((t = e._payload), (e = e._init));
            try {
              return lf(e(t));
            } catch {}
        }
      return null;
    }
    var Nr = Array.isArray,
      H = ly.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      V = MD.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      ba = { pending: !1, data: null, method: null, action: null },
      cf = [],
      fo = -1;
    function Zt(e) {
      return { current: e };
    }
    function xe(e) {
      0 > fo || ((e.current = cf[fo]), (cf[fo] = null), fo--);
    }
    function oe(e, t) {
      (fo++, (cf[fo] = e.current), (e.current = t));
    }
    var Lt = Zt(null),
      Fr = Zt(null),
      Zn = Zt(null),
      Is = Zt(null);
    function Hs(e, t) {
      switch ((oe(Zn, t), oe(Fr, e), oe(Lt, null), t.nodeType)) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? Pg(e) : 0;
          break;
        default:
          if (((e = t.tagName), (t = t.namespaceURI)))
            ((t = Pg(t)), (e = Hb(t, e)));
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
      (xe(Lt), oe(Lt, e));
    }
    function $o() {
      (xe(Lt), xe(Fr), xe(Zn));
    }
    function uf(e) {
      e.memoizedState !== null && oe(Is, e);
      var t = Lt.current,
        n = Hb(t, e.type);
      t !== n && (oe(Fr, e), oe(Lt, n));
    }
    function Us(e) {
      (Fr.current === e && (xe(Lt), xe(Fr)),
        Is.current === e && (xe(Is), (ti._currentValue = ba)));
    }
    var Eu, _p;
    function pa(e) {
      if (Eu === void 0)
        try {
          throw Error();
        } catch (n) {
          var t = n.stack.trim().match(/\n( *(at )?)/);
          ((Eu = (t && t[1]) || ''),
            (_p =
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
        Eu +
        e +
        _p
      );
    }
    var Ou = !1;
    function Cu(e, t) {
      if (!e || Ou) return '';
      Ou = !0;
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
        ((Ou = !1), (Error.prepareStackTrace = n));
      }
      return (n = e ? e.displayName || e.name : '') ? pa(n) : '';
    }
    function wD(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return pa(e.type);
        case 16:
          return pa('Lazy');
        case 13:
          return e.child !== t && t !== null
            ? pa('Suspense Fallback')
            : pa('Suspense');
        case 19:
          return pa('SuspenseList');
        case 0:
        case 15:
          return Cu(e.type, !1);
        case 11:
          return Cu(e.type.render, !1);
        case 1:
          return Cu(e.type, !0);
        case 31:
          return pa('Activity');
        default:
          return '';
      }
    }
    function zp(e) {
      try {
        var t = '',
          n = null;
        do ((t += wD(e, n)), (n = e), (e = e.return));
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
    var ff = Object.prototype.hasOwnProperty,
      td = we.unstable_scheduleCallback,
      Nu = we.unstable_cancelCallback,
      RD = we.unstable_shouldYield,
      $D = we.unstable_requestPaint,
      ot = we.unstable_now,
      xD = we.unstable_getCurrentPriorityLevel,
      py = we.unstable_ImmediatePriority,
      gy = we.unstable_UserBlockingPriority,
      ks = we.unstable_NormalPriority,
      AD = we.unstable_LowPriority,
      yy = we.unstable_IdlePriority,
      ID = we.log,
      HD = we.unstable_setDisableYieldValue,
      ri = null,
      rt = null;
    function Yn(e) {
      if (
        (typeof ID == 'function' && HD(e),
        rt && typeof rt.setStrictMode == 'function')
      )
        try {
          rt.setStrictMode(ri, e);
        } catch {}
    }
    var it = Math.clz32 ? Math.clz32 : YD,
      UD = Math.log,
      kD = Math.LN2;
    function YD(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((UD(e) / kD) | 0)) | 0);
    }
    var ts = 256,
      ns = 262144,
      as = 4194304;
    function ga(e) {
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
    function ll(e, t, n) {
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
              ? (o = ga(a))
              : ((i &= s),
                i !== 0
                  ? (o = ga(i))
                  : n || ((n = s & ~e), n !== 0 && (o = ga(n)))))
          : ((s = a & ~r),
            s !== 0
              ? (o = ga(s))
              : i !== 0
                ? (o = ga(i))
                : n || ((n = a & ~e), n !== 0 && (o = ga(n)))),
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
    function ii(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function BD(e, t) {
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
    function vy() {
      var e = as;
      return ((as <<= 1), (as & 62914560) === 0 && (as = 4194304), e);
    }
    function wu(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function si(e, t) {
      ((e.pendingLanes |= t),
        t !== 268435456 &&
          ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
    }
    function _D(e, t, n, a, o, r) {
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
      (a !== 0 && by(e, a, 0),
        r !== 0 &&
          o === 0 &&
          e.tag !== 0 &&
          (e.suspendedLanes |= r & ~(i & ~t)));
    }
    function by(e, t, n) {
      ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
      var a = 31 - it(t);
      ((e.entangledLanes |= t),
        (e.entanglements[a] = e.entanglements[a] | 1073741824 | (n & 261930)));
    }
    function Sy(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n; ) {
        var a = 31 - it(n),
          o = 1 << a;
        ((o & t) | (e[a] & t) && (e[a] |= t), (n &= ~o));
      }
    }
    function Ty(e, t) {
      var n = t & -t;
      return (
        (n = (n & 42) !== 0 ? 1 : nd(n)),
        (n & (e.suspendedLanes | t)) !== 0 ? 0 : n
      );
    }
    function nd(e) {
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
    function ad(e) {
      return (
        (e &= -e),
        2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
      );
    }
    function Dy() {
      var e = V.p;
      return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Pb(e.type));
    }
    function Lp(e, t) {
      var n = V.p;
      try {
        return ((V.p = e), t());
      } finally {
        V.p = n;
      }
    }
    var ta = Math.random().toString(36).slice(2),
      He = '__reactFiber$' + ta,
      Ge = '__reactProps$' + ta,
      Lo = '__reactContainer$' + ta,
      df = '__reactEvents$' + ta,
      zD = '__reactListeners$' + ta,
      LD = '__reactHandles$' + ta,
      Zp = '__reactResources$' + ta,
      li = '__reactMarker$' + ta;
    function od(e) {
      (delete e[He], delete e[Ge], delete e[df], delete e[zD], delete e[LD]);
    }
    function mo(e) {
      var t = e[He];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[Lo] || n[He])) {
          if (
            ((n = t.alternate),
            t.child !== null || (n !== null && n.child !== null))
          )
            for (e = Xg(e); e !== null; ) {
              if ((n = e[He])) return n;
              e = Xg(e);
            }
          return t;
        }
        ((e = n), (n = e.parentNode));
      }
      return null;
    }
    function Zo(e) {
      if ((e = e[He] || e[Lo])) {
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
    function wr(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
      throw Error(M(33));
    }
    function Mo(e) {
      var t = e[Zp];
      return (
        t ||
          (t = e[Zp] =
            { hoistableStyles: new Map(), hoistableScripts: new Map() }),
        t
      );
    }
    function $e(e) {
      e[li] = !0;
    }
    var My = new Set(),
      Ey = {};
    function Ra(e, t) {
      (xo(e, t), xo(e + 'Capture', t));
    }
    function xo(e, t) {
      for (Ey[e] = t, e = 0; e < t.length; e++) My.add(t[e]);
    }
    var ZD = RegExp(
        '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$',
      ),
      Wp = {},
      Fp = {};
    function WD(e) {
      return ff.call(Fp, e)
        ? !0
        : ff.call(Wp, e)
          ? !1
          : ZD.test(e)
            ? (Fp[e] = !0)
            : ((Wp[e] = !0), !1);
    }
    function vs(e, t, n) {
      if (WD(t))
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
    function os(e, t, n) {
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
    function Xt(e, t, n, a) {
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
    function Oy(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === 'input' &&
        (t === 'checkbox' || t === 'radio')
      );
    }
    function FD(e, t, n) {
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
    function mf(e) {
      if (!e._valueTracker) {
        var t = Oy(e) ? 'checked' : 'value';
        e._valueTracker = FD(e, t, '' + e[t]);
      }
    }
    function Cy(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        a = '';
      return (
        e && (a = Oy(e) ? (e.checked ? 'true' : 'false') : e.value),
        (e = a),
        e !== n ? (t.setValue(e), !0) : !1
      );
    }
    function Ys(e) {
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
    var PD = /[\n"\\]/g;
    function yt(e) {
      return e.replace(PD, function (t) {
        return '\\' + t.charCodeAt(0).toString(16) + ' ';
      });
    }
    function hf(e, t, n, a, o, r, i, s) {
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
          ? pf(e, i, ht(t))
          : n != null
            ? pf(e, i, ht(n))
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
    function Ny(e, t, n, a, o, r, i, s) {
      if (
        (r != null &&
          typeof r != 'function' &&
          typeof r != 'symbol' &&
          typeof r != 'boolean' &&
          (e.type = r),
        t != null || n != null)
      ) {
        if (!((r !== 'submit' && r !== 'reset') || t != null)) {
          mf(e);
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
        mf(e));
    }
    function pf(e, t, n) {
      (t === 'number' && Ys(e.ownerDocument) === e) ||
        e.defaultValue === '' + n ||
        (e.defaultValue = '' + n);
    }
    function Eo(e, t, n, a) {
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
    function wy(e, t, n) {
      if (
        t != null &&
        ((t = '' + ht(t)), t !== e.value && (e.value = t), n == null)
      ) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = n != null ? '' + ht(n) : '';
    }
    function Ry(e, t, n, a) {
      if (t == null) {
        if (a != null) {
          if (n != null) throw Error(M(92));
          if (Nr(a)) {
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
        mf(e));
    }
    function Ao(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var qD = new Set(
      'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
        ' ',
      ),
    );
    function Pp(e, t, n) {
      var a = t.indexOf('--') === 0;
      n == null || typeof n == 'boolean' || n === ''
        ? a
          ? e.setProperty(t, '')
          : t === 'float'
            ? (e.cssFloat = '')
            : (e[t] = '')
        : a
          ? e.setProperty(t, n)
          : typeof n != 'number' || n === 0 || qD.has(t)
            ? t === 'float'
              ? (e.cssFloat = n)
              : (e[t] = ('' + n).trim())
            : (e[t] = n + 'px');
    }
    function $y(e, t, n) {
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
          ((a = t[o]), t.hasOwnProperty(o) && n[o] !== a && Pp(e, o, a));
      } else for (var r in t) t.hasOwnProperty(r) && Pp(e, r, t[r]);
    }
    function rd(e) {
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
    var VD = new Map([
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
      jD =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function bs(e) {
      return jD.test('' + e)
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : e;
    }
    function on() {}
    var gf = null;
    function id(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var ho = null,
      Oo = null;
    function qp(e) {
      var t = Zo(e);
      if (t && (e = t.stateNode)) {
        var n = e[Ge] || null;
        e: switch (((e = t.stateNode), t.type)) {
          case 'input':
            if (
              (hf(
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
                  hf(
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
                ((a = n[t]), a.form === e.form && Cy(a));
            }
            break e;
          case 'textarea':
            wy(e, n.value, n.defaultValue);
            break e;
          case 'select':
            ((t = n.value), t != null && Eo(e, !!n.multiple, t, !1));
        }
      }
    }
    var Ru = !1;
    function xy(e, t, n) {
      if (Ru) return e(t, n);
      Ru = !0;
      try {
        var a = e(t);
        return a;
      } finally {
        if (
          ((Ru = !1),
          (ho !== null || Oo !== null) &&
            (Sl(), ho && ((t = ho), (e = Oo), (Oo = ho = null), qp(t), e)))
        )
          for (t = 0; t < e.length; t++) qp(e[t]);
      }
    }
    function Pr(e, t) {
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
    var un = !(
        typeof window > 'u' ||
        typeof window.document > 'u' ||
        typeof window.document.createElement > 'u'
      ),
      yf = !1;
    if (un)
      try {
        ((ro = {}),
          Object.defineProperty(ro, 'passive', {
            get: function () {
              yf = !0;
            },
          }),
          window.addEventListener('test', ro, ro),
          window.removeEventListener('test', ro, ro));
      } catch {
        yf = !1;
      }
    var ro,
      Bn = null,
      sd = null,
      Ss = null;
    function Ay() {
      if (Ss) return Ss;
      var e,
        t = sd,
        n = t.length,
        a,
        o = 'value' in Bn ? Bn.value : Bn.textContent,
        r = o.length;
      for (e = 0; e < n && t[e] === o[e]; e++);
      var i = n - e;
      for (a = 1; a <= i && t[n - a] === o[r - a]; a++);
      return (Ss = o.slice(e, 1 < a ? 1 - a : void 0));
    }
    function Ts(e) {
      var t = e.keyCode;
      return (
        'charCode' in e
          ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
          : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function rs() {
      return !0;
    }
    function Vp() {
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
            ? rs
            : Vp),
          (this.isPropagationStopped = Vp),
          this
        );
      }
      return (
        le(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n &&
              (n.preventDefault
                ? n.preventDefault()
                : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
              (this.isDefaultPrevented = rs));
          },
          stopPropagation: function () {
            var n = this.nativeEvent;
            n &&
              (n.stopPropagation
                ? n.stopPropagation()
                : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
              (this.isPropagationStopped = rs));
          },
          persist: function () {},
          isPersistent: rs,
        }),
        t
      );
    }
    var $a = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      cl = Xe($a),
      ci = le({}, $a, { view: 0, detail: 0 }),
      GD = Xe(ci),
      $u,
      xu,
      Sr,
      ul = le({}, ci, {
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
        getModifierState: ld,
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
            : (e !== Sr &&
                (Sr && e.type === 'mousemove'
                  ? (($u = e.screenX - Sr.screenX),
                    (xu = e.screenY - Sr.screenY))
                  : (xu = $u = 0),
                (Sr = e)),
              $u);
        },
        movementY: function (e) {
          return 'movementY' in e ? e.movementY : xu;
        },
      }),
      jp = Xe(ul),
      XD = le({}, ul, { dataTransfer: 0 }),
      QD = Xe(XD),
      KD = le({}, ci, { relatedTarget: 0 }),
      Au = Xe(KD),
      JD = le({}, $a, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      eM = Xe(JD),
      tM = le({}, $a, {
        clipboardData: function (e) {
          return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
        },
      }),
      nM = Xe(tM),
      aM = le({}, $a, { data: 0 }),
      Gp = Xe(aM),
      oM = {
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
      rM = {
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
      iM = {
        Alt: 'altKey',
        Control: 'ctrlKey',
        Meta: 'metaKey',
        Shift: 'shiftKey',
      };
    function sM(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : (e = iM[e])
          ? !!t[e]
          : !1;
    }
    function ld() {
      return sM;
    }
    var lM = le({}, ci, {
        key: function (e) {
          if (e.key) {
            var t = oM[e.key] || e.key;
            if (t !== 'Unidentified') return t;
          }
          return e.type === 'keypress'
            ? ((e = Ts(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
            : e.type === 'keydown' || e.type === 'keyup'
              ? rM[e.keyCode] || 'Unidentified'
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
        getModifierState: ld,
        charCode: function (e) {
          return e.type === 'keypress' ? Ts(e) : 0;
        },
        keyCode: function (e) {
          return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
        },
        which: function (e) {
          return e.type === 'keypress'
            ? Ts(e)
            : e.type === 'keydown' || e.type === 'keyup'
              ? e.keyCode
              : 0;
        },
      }),
      cM = Xe(lM),
      uM = le({}, ul, {
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
      Xp = Xe(uM),
      fM = le({}, ci, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: ld,
      }),
      dM = Xe(fM),
      mM = le({}, $a, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      hM = Xe(mM),
      pM = le({}, ul, {
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
      gM = Xe(pM),
      yM = le({}, $a, { newState: 0, oldState: 0 }),
      vM = Xe(yM),
      bM = [9, 13, 27, 32],
      cd = un && 'CompositionEvent' in window,
      xr = null;
    un && 'documentMode' in document && (xr = document.documentMode);
    var SM = un && 'TextEvent' in window && !xr,
      Iy = un && (!cd || (xr && 8 < xr && 11 >= xr)),
      Qp = ' ',
      Kp = !1;
    function Hy(e, t) {
      switch (e) {
        case 'keyup':
          return bM.indexOf(t.keyCode) !== -1;
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
    function Uy(e) {
      return (
        (e = e.detail),
        typeof e == 'object' && 'data' in e ? e.data : null
      );
    }
    var po = !1;
    function TM(e, t) {
      switch (e) {
        case 'compositionend':
          return Uy(t);
        case 'keypress':
          return t.which !== 32 ? null : ((Kp = !0), Qp);
        case 'textInput':
          return ((e = t.data), e === Qp && Kp ? null : e);
        default:
          return null;
      }
    }
    function DM(e, t) {
      if (po)
        return e === 'compositionend' || (!cd && Hy(e, t))
          ? ((e = Ay()), (Ss = sd = Bn = null), (po = !1), e)
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
          return Iy && t.locale !== 'ko' ? null : t.data;
        default:
          return null;
      }
    }
    var MM = {
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
    function Jp(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === 'input' ? !!MM[e.type] : t === 'textarea';
    }
    function ky(e, t, n, a) {
      (ho ? (Oo ? Oo.push(a) : (Oo = [a])) : (ho = a),
        (t = tl(t, 'onChange')),
        0 < t.length &&
          ((n = new cl('onChange', 'change', null, n, a)),
          e.push({ event: n, listeners: t })));
    }
    var Ar = null,
      qr = null;
    function EM(e) {
      xb(e, 0);
    }
    function fl(e) {
      var t = wr(e);
      if (Cy(t)) return e;
    }
    function eg(e, t) {
      if (e === 'change') return t;
    }
    var Yy = !1;
    un &&
      (un
        ? ((ss = 'oninput' in document),
          ss ||
            ((Iu = document.createElement('div')),
            Iu.setAttribute('oninput', 'return;'),
            (ss = typeof Iu.oninput == 'function')),
          (is = ss))
        : (is = !1),
      (Yy = is && (!document.documentMode || 9 < document.documentMode)));
    var is, ss, Iu;
    function tg() {
      Ar && (Ar.detachEvent('onpropertychange', By), (qr = Ar = null));
    }
    function By(e) {
      if (e.propertyName === 'value' && fl(qr)) {
        var t = [];
        (ky(t, qr, e, id(e)), xy(EM, t));
      }
    }
    function OM(e, t, n) {
      e === 'focusin'
        ? (tg(), (Ar = t), (qr = n), Ar.attachEvent('onpropertychange', By))
        : e === 'focusout' && tg();
    }
    function CM(e) {
      if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
        return fl(qr);
    }
    function NM(e, t) {
      if (e === 'click') return fl(t);
    }
    function wM(e, t) {
      if (e === 'input' || e === 'change') return fl(t);
    }
    function RM(e, t) {
      return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
    }
    var lt = typeof Object.is == 'function' ? Object.is : RM;
    function Vr(e, t) {
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
        if (!ff.call(t, o) || !lt(e[o], t[o])) return !1;
      }
      return !0;
    }
    function ng(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function ag(e, t) {
      var n = ng(e);
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
        n = ng(n);
      }
    }
    function _y(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? _y(e, t.parentNode)
              : 'contains' in e
                ? e.contains(t)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(t) & 16)
                  : !1
        : !1;
    }
    function zy(e) {
      e =
        e != null &&
        e.ownerDocument != null &&
        e.ownerDocument.defaultView != null
          ? e.ownerDocument.defaultView
          : window;
      for (var t = Ys(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == 'string';
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = Ys(e.document);
      }
      return t;
    }
    function ud(e) {
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
    var $M = un && 'documentMode' in document && 11 >= document.documentMode,
      go = null,
      vf = null,
      Ir = null,
      bf = !1;
    function og(e, t, n) {
      var a =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      bf ||
        go == null ||
        go !== Ys(a) ||
        ((a = go),
        'selectionStart' in a && ud(a)
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
        (Ir && Vr(Ir, a)) ||
          ((Ir = a),
          (a = tl(vf, 'onSelect')),
          0 < a.length &&
            ((t = new cl('onSelect', 'select', null, t, n)),
            e.push({ event: t, listeners: a }),
            (t.target = go))));
    }
    function ha(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n['Webkit' + e] = 'webkit' + t),
        (n['Moz' + e] = 'moz' + t),
        n
      );
    }
    var yo = {
        animationend: ha('Animation', 'AnimationEnd'),
        animationiteration: ha('Animation', 'AnimationIteration'),
        animationstart: ha('Animation', 'AnimationStart'),
        transitionrun: ha('Transition', 'TransitionRun'),
        transitionstart: ha('Transition', 'TransitionStart'),
        transitioncancel: ha('Transition', 'TransitionCancel'),
        transitionend: ha('Transition', 'TransitionEnd'),
      },
      Hu = {},
      Ly = {};
    un &&
      ((Ly = document.createElement('div').style),
      'AnimationEvent' in window ||
        (delete yo.animationend.animation,
        delete yo.animationiteration.animation,
        delete yo.animationstart.animation),
      'TransitionEvent' in window || delete yo.transitionend.transition);
    function xa(e) {
      if (Hu[e]) return Hu[e];
      if (!yo[e]) return e;
      var t = yo[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in Ly) return (Hu[e] = t[n]);
      return e;
    }
    var Zy = xa('animationend'),
      Wy = xa('animationiteration'),
      Fy = xa('animationstart'),
      xM = xa('transitionrun'),
      AM = xa('transitionstart'),
      IM = xa('transitioncancel'),
      Py = xa('transitionend'),
      qy = new Map(),
      Sf =
        'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
          ' ',
        );
    Sf.push('scrollEnd');
    function Ct(e, t) {
      (qy.set(e, t), Ra(t, [e]));
    }
    var Bs =
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
      vo = 0,
      fd = 0;
    function dl() {
      for (var e = vo, t = (fd = vo = 0); t < e; ) {
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
        r !== 0 && Vy(n, o, r);
      }
    }
    function ml(e, t, n, a) {
      ((mt[vo++] = e),
        (mt[vo++] = t),
        (mt[vo++] = n),
        (mt[vo++] = a),
        (fd |= a),
        (e.lanes |= a),
        (e = e.alternate),
        e !== null && (e.lanes |= a));
    }
    function dd(e, t, n, a) {
      return (ml(e, t, n, a), _s(e));
    }
    function Aa(e, t) {
      return (ml(e, null, null, t), _s(e));
    }
    function Vy(e, t, n) {
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
    function _s(e) {
      if (50 < Zr) throw ((Zr = 0), (Lf = null), Error(M(185)));
      for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
      return e.tag === 3 ? e.stateNode : null;
    }
    var bo = {};
    function HM(e, t, n, a) {
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
      return new HM(e, t, n, a);
    }
    function md(e) {
      return ((e = e.prototype), !(!e || !e.isReactComponent));
    }
    function sn(e, t) {
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
    function jy(e, t) {
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
    function Ds(e, t, n, a, o, r) {
      var i = 0;
      if (((a = e), typeof e == 'function')) md(e) && (i = 1);
      else if (typeof e == 'string')
        i = YE(e, n, Lt.current)
          ? 26
          : e === 'html' || e === 'head' || e === 'body'
            ? 27
            : 5;
      else
        e: switch (e) {
          case sf:
            return (
              (e = nt(31, n, t, o)),
              (e.elementType = sf),
              (e.lanes = r),
              e
            );
          case uo:
            return Sa(n.children, o, r, t);
          case my:
            ((i = 8), (o |= 24));
            break;
          case af:
            return (
              (e = nt(12, n, t, o | 2)),
              (e.elementType = af),
              (e.lanes = r),
              e
            );
          case of:
            return (
              (e = nt(13, n, t, o)),
              (e.elementType = of),
              (e.lanes = r),
              e
            );
          case rf:
            return (
              (e = nt(19, n, t, o)),
              (e.elementType = rf),
              (e.lanes = r),
              e
            );
          default:
            if (typeof e == 'object' && e !== null)
              switch (e.$$typeof) {
                case an:
                  i = 10;
                  break e;
                case hy:
                  i = 9;
                  break e;
                case Jf:
                  i = 11;
                  break e;
                case ed:
                  i = 14;
                  break e;
                case xn:
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
    function Sa(e, t, n, a) {
      return ((e = nt(7, e, a, t)), (e.lanes = n), e);
    }
    function Uu(e, t, n) {
      return ((e = nt(6, e, null, t)), (e.lanes = n), e);
    }
    function Gy(e) {
      var t = nt(18, null, null, 0);
      return ((t.stateNode = e), t);
    }
    function ku(e, t, n) {
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
    var rg = new WeakMap();
    function vt(e, t) {
      if (typeof e == 'object' && e !== null) {
        var n = rg.get(e);
        return n !== void 0
          ? n
          : ((t = { value: e, source: t, stack: zp(t) }), rg.set(e, t), t);
      }
      return { value: e, source: t, stack: zp(t) };
    }
    var So = [],
      To = 0,
      zs = null,
      jr = 0,
      pt = [],
      gt = 0,
      Qn = null,
      Bt = 1,
      _t = '';
    function tn(e, t) {
      ((So[To++] = jr), (So[To++] = zs), (zs = e), (jr = t));
    }
    function Xy(e, t, n) {
      ((pt[gt++] = Bt), (pt[gt++] = _t), (pt[gt++] = Qn), (Qn = e));
      var a = Bt;
      e = _t;
      var o = 32 - it(a) - 1;
      ((a &= ~(1 << o)), (n += 1));
      var r = 32 - it(t) + o;
      if (30 < r) {
        var i = o - (o % 5);
        ((r = (a & ((1 << i) - 1)).toString(32)),
          (a >>= i),
          (o -= i),
          (Bt = (1 << (32 - it(t) + o)) | (n << o) | a),
          (_t = r + e));
      } else ((Bt = (1 << r) | (n << o) | a), (_t = e));
    }
    function hd(e) {
      e.return !== null && (tn(e, 1), Xy(e, 1, 0));
    }
    function pd(e) {
      for (; e === zs; )
        ((zs = So[--To]), (So[To] = null), (jr = So[--To]), (So[To] = null));
      for (; e === Qn; )
        ((Qn = pt[--gt]),
          (pt[gt] = null),
          (_t = pt[--gt]),
          (pt[gt] = null),
          (Bt = pt[--gt]),
          (pt[gt] = null));
    }
    function Qy(e, t) {
      ((pt[gt++] = Bt),
        (pt[gt++] = _t),
        (pt[gt++] = Qn),
        (Bt = t.id),
        (_t = t.overflow),
        (Qn = e));
    }
    var Ue = null,
      se = null,
      Z = !1,
      Wn = null,
      bt = !1,
      Tf = Error(M(519));
    function Kn(e) {
      var t = Error(
        M(
          418,
          1 < arguments.length && arguments[1] !== void 0 && arguments[1]
            ? 'text'
            : 'HTML',
          '',
        ),
      );
      throw (Gr(vt(t, e)), Tf);
    }
    function ig(e) {
      var t = e.stateNode,
        n = e.type,
        a = e.memoizedProps;
      switch (((t[He] = e), (t[Ge] = a), n)) {
        case 'dialog':
          (_('cancel', t), _('close', t));
          break;
        case 'iframe':
        case 'object':
        case 'embed':
          _('load', t);
          break;
        case 'video':
        case 'audio':
          for (n = 0; n < Jr.length; n++) _(Jr[n], t);
          break;
        case 'source':
          _('error', t);
          break;
        case 'img':
        case 'image':
        case 'link':
          (_('error', t), _('load', t));
          break;
        case 'details':
          _('toggle', t);
          break;
        case 'input':
          (_('invalid', t),
            Ny(
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
          _('invalid', t);
          break;
        case 'textarea':
          (_('invalid', t), Ry(t, a.value, a.defaultValue, a.children));
      }
      ((n = a.children),
        (typeof n != 'string' &&
          typeof n != 'number' &&
          typeof n != 'bigint') ||
        t.textContent === '' + n ||
        a.suppressHydrationWarning === !0 ||
        Ib(t.textContent, n)
          ? (a.popover != null && (_('beforetoggle', t), _('toggle', t)),
            a.onScroll != null && _('scroll', t),
            a.onScrollEnd != null && _('scrollend', t),
            a.onClick != null && (t.onclick = on),
            (t = !0))
          : (t = !1),
        t || Kn(e, !0));
    }
    function sg(e) {
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
    function io(e) {
      if (e !== Ue) return !1;
      if (!Z) return (sg(e), (Z = !0), !1);
      var t = e.tag,
        n;
      if (
        ((n = t !== 3 && t !== 27) &&
          ((n = t === 5) &&
            ((n = e.type),
            (n =
              !(n !== 'form' && n !== 'button') ||
              qf(e.type, e.memoizedProps))),
          (n = !n)),
        n && se && Kn(e),
        sg(e),
        t === 13)
      ) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(M(317));
        se = Gg(e);
      } else if (t === 31) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(M(317));
        se = Gg(e);
      } else
        t === 27
          ? ((t = se),
            na(e.type) ? ((e = Xf), (Xf = null), (se = e)) : (se = t))
          : (se = Ue ? Tt(e.stateNode.nextSibling) : null);
      return !0;
    }
    function Ea() {
      ((se = Ue = null), (Z = !1));
    }
    function Yu() {
      var e = Wn;
      return (
        e !== null &&
          (Ve === null ? (Ve = e) : Ve.push.apply(Ve, e), (Wn = null)),
        e
      );
    }
    function Gr(e) {
      Wn === null ? (Wn = [e]) : Wn.push(e);
    }
    var Df = Zt(null),
      Ia = null,
      rn = null;
    function In(e, t, n) {
      (oe(Df, t._currentValue), (t._currentValue = n));
    }
    function ln(e) {
      ((e._currentValue = Df.current), xe(Df));
    }
    function Mf(e, t, n) {
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
    function Ef(e, t, n, a) {
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
                  Mf(r.return, n, e),
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
            Mf(i, n, e),
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
    function Wo(e, t, n, a) {
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
        } else if (o === Is.current) {
          if (((i = o.alternate), i === null)) throw Error(M(387));
          i.memoizedState.memoizedState !== o.memoizedState.memoizedState &&
            (e !== null ? e.push(ti) : (e = [ti]));
        }
        o = o.return;
      }
      (e !== null && Ef(t, e, n, a), (t.flags |= 262144));
    }
    function Ls(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!lt(e.context._currentValue, e.memoizedValue)) return !0;
        e = e.next;
      }
      return !1;
    }
    function Oa(e) {
      ((Ia = e),
        (rn = null),
        (e = e.dependencies),
        e !== null && (e.firstContext = null));
    }
    function ke(e) {
      return Ky(Ia, e);
    }
    function ls(e, t) {
      return (Ia === null && Oa(e), Ky(e, t));
    }
    function Ky(e, t) {
      var n = t._currentValue;
      if (((t = { context: t, memoizedValue: n, next: null }), rn === null)) {
        if (e === null) throw Error(M(308));
        ((rn = t),
          (e.dependencies = { lanes: 0, firstContext: t }),
          (e.flags |= 524288));
      } else rn = rn.next = t;
      return n;
    }
    var UM =
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
      kM = we.unstable_scheduleCallback,
      YM = we.unstable_NormalPriority,
      Ee = {
        $$typeof: an,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function gd() {
      return { controller: new UM(), data: new Map(), refCount: 0 };
    }
    function ui(e) {
      (e.refCount--,
        e.refCount === 0 &&
          kM(YM, function () {
            e.controller.abort();
          }));
    }
    var Hr = null,
      Of = 0,
      Io = 0,
      Co = null;
    function BM(e, t) {
      if (Hr === null) {
        var n = (Hr = []);
        ((Of = 0),
          (Io = Ld()),
          (Co = {
            status: 'pending',
            value: void 0,
            then: function (a) {
              n.push(a);
            },
          }));
      }
      return (Of++, t.then(lg, lg), t);
    }
    function lg() {
      if (--Of === 0 && Hr !== null) {
        Co !== null && (Co.status = 'fulfilled');
        var e = Hr;
        ((Hr = null), (Io = 0), (Co = null));
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function _M(e, t) {
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
    var cg = H.S;
    H.S = function (e, t) {
      ((db = ot()),
        typeof t == 'object' &&
          t !== null &&
          typeof t.then == 'function' &&
          BM(e, t),
        cg !== null && cg(e, t));
    };
    var Ta = Zt(null);
    function yd() {
      var e = Ta.current;
      return e !== null ? e : ne.pooledCache;
    }
    function Ms(e, t) {
      t === null ? oe(Ta, Ta.current) : oe(Ta, t.pool);
    }
    function Jy() {
      var e = yd();
      return e === null ? null : { parent: Ee._currentValue, pool: e };
    }
    var Fo = Error(M(460)),
      vd = Error(M(474)),
      hl = Error(M(542)),
      Zs = { then: function () {} };
    function ug(e) {
      return ((e = e.status), e === 'fulfilled' || e === 'rejected');
    }
    function ev(e, t, n) {
      switch (
        ((n = e[n]),
        n === void 0 ? e.push(t) : n !== t && (t.then(on, on), (t = n)),
        t.status)
      ) {
        case 'fulfilled':
          return t.value;
        case 'rejected':
          throw ((e = t.reason), dg(e), e);
        default:
          if (typeof t.status == 'string') t.then(on, on);
          else {
            if (((e = ne), e !== null && 100 < e.shellSuspendCounter))
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
              throw ((e = t.reason), dg(e), e);
          }
          throw ((Da = t), Fo);
      }
    }
    function ya(e) {
      try {
        var t = e._init;
        return t(e._payload);
      } catch (n) {
        throw n !== null && typeof n == 'object' && typeof n.then == 'function'
          ? ((Da = n), Fo)
          : n;
      }
    }
    var Da = null;
    function fg() {
      if (Da === null) throw Error(M(459));
      var e = Da;
      return ((Da = null), e);
    }
    function dg(e) {
      if (e === Fo || e === hl) throw Error(M(483));
    }
    var No = null,
      Xr = 0;
    function cs(e) {
      var t = Xr;
      return ((Xr += 1), No === null && (No = []), ev(No, e, t));
    }
    function Tr(e, t) {
      ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
    }
    function us(e, t) {
      throw t.$$typeof === OD
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
    function tv(e) {
      function t(p, h) {
        if (e) {
          var y = p.deletions;
          y === null ? ((p.deletions = [h]), (p.flags |= 16)) : y.push(h);
        }
      }
      function n(p, h) {
        if (!e) return null;
        for (; h !== null; ) (t(p, h), (h = h.sibling));
        return null;
      }
      function a(p) {
        for (var h = new Map(); p !== null; )
          (p.key !== null ? h.set(p.key, p) : h.set(p.index, p),
            (p = p.sibling));
        return h;
      }
      function o(p, h) {
        return ((p = sn(p, h)), (p.index = 0), (p.sibling = null), p);
      }
      function r(p, h, y) {
        return (
          (p.index = y),
          e
            ? ((y = p.alternate),
              y !== null
                ? ((y = y.index), y < h ? ((p.flags |= 67108866), h) : y)
                : ((p.flags |= 67108866), h))
            : ((p.flags |= 1048576), h)
        );
      }
      function i(p) {
        return (e && p.alternate === null && (p.flags |= 67108866), p);
      }
      function s(p, h, y, b) {
        return h === null || h.tag !== 6
          ? ((h = Uu(y, p.mode, b)), (h.return = p), h)
          : ((h = o(h, y)), (h.return = p), h);
      }
      function l(p, h, y, b) {
        var O = y.type;
        return O === uo
          ? u(p, h, y.props.children, b, y.key)
          : h !== null &&
              (h.elementType === O ||
                (typeof O == 'object' &&
                  O !== null &&
                  O.$$typeof === xn &&
                  ya(O) === h.type))
            ? ((h = o(h, y.props)), Tr(h, y), (h.return = p), h)
            : ((h = Ds(y.type, y.key, y.props, null, p.mode, b)),
              Tr(h, y),
              (h.return = p),
              h);
      }
      function c(p, h, y, b) {
        return h === null ||
          h.tag !== 4 ||
          h.stateNode.containerInfo !== y.containerInfo ||
          h.stateNode.implementation !== y.implementation
          ? ((h = ku(y, p.mode, b)), (h.return = p), h)
          : ((h = o(h, y.children || [])), (h.return = p), h);
      }
      function u(p, h, y, b, O) {
        return h === null || h.tag !== 7
          ? ((h = Sa(y, p.mode, b, O)), (h.return = p), h)
          : ((h = o(h, y)), (h.return = p), h);
      }
      function d(p, h, y) {
        if (
          (typeof h == 'string' && h !== '') ||
          typeof h == 'number' ||
          typeof h == 'bigint'
        )
          return ((h = Uu('' + h, p.mode, y)), (h.return = p), h);
        if (typeof h == 'object' && h !== null) {
          switch (h.$$typeof) {
            case es:
              return (
                (y = Ds(h.type, h.key, h.props, null, p.mode, y)),
                Tr(y, h),
                (y.return = p),
                y
              );
            case Cr:
              return ((h = ku(h, p.mode, y)), (h.return = p), h);
            case xn:
              return ((h = ya(h)), d(p, h, y));
          }
          if (Nr(h) || br(h))
            return ((h = Sa(h, p.mode, y, null)), (h.return = p), h);
          if (typeof h.then == 'function') return d(p, cs(h), y);
          if (h.$$typeof === an) return d(p, ls(p, h), y);
          us(p, h);
        }
        return null;
      }
      function f(p, h, y, b) {
        var O = h !== null ? h.key : null;
        if (
          (typeof y == 'string' && y !== '') ||
          typeof y == 'number' ||
          typeof y == 'bigint'
        )
          return O !== null ? null : s(p, h, '' + y, b);
        if (typeof y == 'object' && y !== null) {
          switch (y.$$typeof) {
            case es:
              return y.key === O ? l(p, h, y, b) : null;
            case Cr:
              return y.key === O ? c(p, h, y, b) : null;
            case xn:
              return ((y = ya(y)), f(p, h, y, b));
          }
          if (Nr(y) || br(y)) return O !== null ? null : u(p, h, y, b, null);
          if (typeof y.then == 'function') return f(p, h, cs(y), b);
          if (y.$$typeof === an) return f(p, h, ls(p, y), b);
          us(p, y);
        }
        return null;
      }
      function m(p, h, y, b, O) {
        if (
          (typeof b == 'string' && b !== '') ||
          typeof b == 'number' ||
          typeof b == 'bigint'
        )
          return ((p = p.get(y) || null), s(h, p, '' + b, O));
        if (typeof b == 'object' && b !== null) {
          switch (b.$$typeof) {
            case es:
              return (
                (p = p.get(b.key === null ? y : b.key) || null),
                l(h, p, b, O)
              );
            case Cr:
              return (
                (p = p.get(b.key === null ? y : b.key) || null),
                c(h, p, b, O)
              );
            case xn:
              return ((b = ya(b)), m(p, h, y, b, O));
          }
          if (Nr(b) || br(b))
            return ((p = p.get(y) || null), u(h, p, b, O, null));
          if (typeof b.then == 'function') return m(p, h, y, cs(b), O);
          if (b.$$typeof === an) return m(p, h, y, ls(h, b), O);
          us(h, b);
        }
        return null;
      }
      function v(p, h, y, b) {
        for (
          var O = null, x = null, C = h, $ = (h = 0), R = null;
          C !== null && $ < y.length;
          $++
        ) {
          C.index > $ ? ((R = C), (C = null)) : (R = C.sibling);
          var I = f(p, C, y[$], b);
          if (I === null) {
            C === null && (C = R);
            break;
          }
          (e && C && I.alternate === null && t(p, C),
            (h = r(I, h, $)),
            x === null ? (O = I) : (x.sibling = I),
            (x = I),
            (C = R));
        }
        if ($ === y.length) return (n(p, C), Z && tn(p, $), O);
        if (C === null) {
          for (; $ < y.length; $++)
            ((C = d(p, y[$], b)),
              C !== null &&
                ((h = r(C, h, $)),
                x === null ? (O = C) : (x.sibling = C),
                (x = C)));
          return (Z && tn(p, $), O);
        }
        for (C = a(C); $ < y.length; $++)
          ((R = m(C, p, $, y[$], b)),
            R !== null &&
              (e &&
                R.alternate !== null &&
                C.delete(R.key === null ? $ : R.key),
              (h = r(R, h, $)),
              x === null ? (O = R) : (x.sibling = R),
              (x = R)));
        return (
          e &&
            C.forEach(function (Ce) {
              return t(p, Ce);
            }),
          Z && tn(p, $),
          O
        );
      }
      function g(p, h, y, b) {
        if (y == null) throw Error(M(151));
        for (
          var O = null, x = null, C = h, $ = (h = 0), R = null, I = y.next();
          C !== null && !I.done;
          $++, I = y.next()
        ) {
          C.index > $ ? ((R = C), (C = null)) : (R = C.sibling);
          var Ce = f(p, C, I.value, b);
          if (Ce === null) {
            C === null && (C = R);
            break;
          }
          (e && C && Ce.alternate === null && t(p, C),
            (h = r(Ce, h, $)),
            x === null ? (O = Ce) : (x.sibling = Ce),
            (x = Ce),
            (C = R));
        }
        if (I.done) return (n(p, C), Z && tn(p, $), O);
        if (C === null) {
          for (; !I.done; $++, I = y.next())
            ((I = d(p, I.value, b)),
              I !== null &&
                ((h = r(I, h, $)),
                x === null ? (O = I) : (x.sibling = I),
                (x = I)));
          return (Z && tn(p, $), O);
        }
        for (C = a(C); !I.done; $++, I = y.next())
          ((I = m(C, p, $, I.value, b)),
            I !== null &&
              (e &&
                I.alternate !== null &&
                C.delete(I.key === null ? $ : I.key),
              (h = r(I, h, $)),
              x === null ? (O = I) : (x.sibling = I),
              (x = I)));
        return (
          e &&
            C.forEach(function (Te) {
              return t(p, Te);
            }),
          Z && tn(p, $),
          O
        );
      }
      function E(p, h, y, b) {
        if (
          (typeof y == 'object' &&
            y !== null &&
            y.type === uo &&
            y.key === null &&
            (y = y.props.children),
          typeof y == 'object' && y !== null)
        ) {
          switch (y.$$typeof) {
            case es:
              e: {
                for (var O = y.key; h !== null; ) {
                  if (h.key === O) {
                    if (((O = y.type), O === uo)) {
                      if (h.tag === 7) {
                        (n(p, h.sibling),
                          (b = o(h, y.props.children)),
                          (b.return = p),
                          (p = b));
                        break e;
                      }
                    } else if (
                      h.elementType === O ||
                      (typeof O == 'object' &&
                        O !== null &&
                        O.$$typeof === xn &&
                        ya(O) === h.type)
                    ) {
                      (n(p, h.sibling),
                        (b = o(h, y.props)),
                        Tr(b, y),
                        (b.return = p),
                        (p = b));
                      break e;
                    }
                    n(p, h);
                    break;
                  } else t(p, h);
                  h = h.sibling;
                }
                y.type === uo
                  ? ((b = Sa(y.props.children, p.mode, b, y.key)),
                    (b.return = p),
                    (p = b))
                  : ((b = Ds(y.type, y.key, y.props, null, p.mode, b)),
                    Tr(b, y),
                    (b.return = p),
                    (p = b));
              }
              return i(p);
            case Cr:
              e: {
                for (O = y.key; h !== null; ) {
                  if (h.key === O)
                    if (
                      h.tag === 4 &&
                      h.stateNode.containerInfo === y.containerInfo &&
                      h.stateNode.implementation === y.implementation
                    ) {
                      (n(p, h.sibling),
                        (b = o(h, y.children || [])),
                        (b.return = p),
                        (p = b));
                      break e;
                    } else {
                      n(p, h);
                      break;
                    }
                  else t(p, h);
                  h = h.sibling;
                }
                ((b = ku(y, p.mode, b)), (b.return = p), (p = b));
              }
              return i(p);
            case xn:
              return ((y = ya(y)), E(p, h, y, b));
          }
          if (Nr(y)) return v(p, h, y, b);
          if (br(y)) {
            if (((O = br(y)), typeof O != 'function')) throw Error(M(150));
            return ((y = O.call(y)), g(p, h, y, b));
          }
          if (typeof y.then == 'function') return E(p, h, cs(y), b);
          if (y.$$typeof === an) return E(p, h, ls(p, y), b);
          us(p, y);
        }
        return (typeof y == 'string' && y !== '') ||
          typeof y == 'number' ||
          typeof y == 'bigint'
          ? ((y = '' + y),
            h !== null && h.tag === 6
              ? (n(p, h.sibling), (b = o(h, y)), (b.return = p), (p = b))
              : (n(p, h), (b = Uu(y, p.mode, b)), (b.return = p), (p = b)),
            i(p))
          : n(p, h);
      }
      return function (p, h, y, b) {
        try {
          Xr = 0;
          var O = E(p, h, y, b);
          return ((No = null), O);
        } catch (C) {
          if (C === Fo || C === hl) throw C;
          var x = nt(29, C, null, p.mode);
          return ((x.lanes = b), (x.return = p), x);
        }
      };
    }
    var Ca = tv(!0),
      nv = tv(!1),
      An = !1;
    function bd(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function Cf(e, t) {
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
    function Fn(e) {
      return { lane: e, tag: 0, payload: null, callback: null, next: null };
    }
    function Pn(e, t, n) {
      var a = e.updateQueue;
      if (a === null) return null;
      if (((a = a.shared), (q & 2) !== 0)) {
        var o = a.pending;
        return (
          o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
          (a.pending = t),
          (t = _s(e)),
          Vy(e, null, n),
          t
        );
      }
      return (ml(e, a, t, n), _s(e));
    }
    function Ur(e, t, n) {
      if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194048) !== 0))
      ) {
        var a = t.lanes;
        ((a &= e.pendingLanes), (n |= a), (t.lanes = n), Sy(e, n));
      }
    }
    function Bu(e, t) {
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
    var Nf = !1;
    function kr() {
      if (Nf) {
        var e = Co;
        if (e !== null) throw e;
      }
    }
    function Yr(e, t, n, a) {
      Nf = !1;
      var o = e.updateQueue;
      An = !1;
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
          if (m ? (L & f) === f : (a & f) === f) {
            (f !== 0 && f === Io && (Nf = !0),
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
                g = s;
              f = t;
              var E = n;
              switch (g.tag) {
                case 1:
                  if (((v = g.payload), typeof v == 'function')) {
                    d = v.call(E, d, f);
                    break e;
                  }
                  d = v;
                  break e;
                case 3:
                  v.flags = (v.flags & -65537) | 128;
                case 0:
                  if (
                    ((v = g.payload),
                    (f = typeof v == 'function' ? v.call(E, d, f) : v),
                    f == null)
                  )
                    break e;
                  d = le({}, d, f);
                  break e;
                case 2:
                  An = !0;
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
          (ea |= i),
          (e.lanes = i),
          (e.memoizedState = d));
      }
    }
    function av(e, t) {
      if (typeof e != 'function') throw Error(M(191, e));
      e.call(t);
    }
    function ov(e, t) {
      var n = e.callbacks;
      if (n !== null)
        for (e.callbacks = null, e = 0; e < n.length; e++) av(n[e], t);
    }
    var Ho = Zt(null),
      Ws = Zt(0);
    function mg(e, t) {
      ((e = hn), oe(Ws, e), oe(Ho, t), (hn = e | t.baseLanes));
    }
    function wf() {
      (oe(Ws, hn), oe(Ho, Ho.current));
    }
    function Sd() {
      ((hn = Ws.current), xe(Ho), xe(Ws));
    }
    var ct = Zt(null),
      St = null;
    function Hn(e) {
      var t = e.alternate;
      (oe(ye, ye.current & 1),
        oe(ct, e),
        St === null &&
          (t === null || Ho.current !== null || t.memoizedState !== null) &&
          (St = e));
    }
    function Rf(e) {
      (oe(ye, ye.current), oe(ct, e), St === null && (St = e));
    }
    function rv(e) {
      e.tag === 22
        ? (oe(ye, ye.current), oe(ct, e), St === null && (St = e))
        : Un(e);
    }
    function Un() {
      (oe(ye, ye.current), oe(ct, ct.current));
    }
    function tt(e) {
      (xe(ct), St === e && (St = null), xe(ye));
    }
    var ye = Zt(0);
    function Fs(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (n !== null && ((n = n.dehydrated), n === null || jf(n) || Gf(n)))
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
    var fn = 0,
      Y = null,
      ee = null,
      De = null,
      Ps = !1,
      wo = !1,
      Na = !1,
      qs = 0,
      Qr = 0,
      Ro = null,
      zM = 0;
    function pe() {
      throw Error(M(321));
    }
    function Td(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!lt(e[n], t[n])) return !1;
      return !0;
    }
    function Dd(e, t, n, a, o, r) {
      return (
        (fn = r),
        (Y = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (H.H = e === null || e.memoizedState === null ? kv : Id),
        (Na = !1),
        (r = n(a, o)),
        (Na = !1),
        wo && (r = sv(t, n, a, o)),
        iv(e),
        r
      );
    }
    function iv(e) {
      H.H = Kr;
      var t = ee !== null && ee.next !== null;
      if (((fn = 0), (De = ee = Y = null), (Ps = !1), (Qr = 0), (Ro = null), t))
        throw Error(M(300));
      e === null ||
        Oe ||
        ((e = e.dependencies), e !== null && Ls(e) && (Oe = !0));
    }
    function sv(e, t, n, a) {
      Y = e;
      var o = 0;
      do {
        if ((wo && (Ro = null), (Qr = 0), (wo = !1), 25 <= o))
          throw Error(M(301));
        if (((o += 1), (De = ee = null), e.updateQueue != null)) {
          var r = e.updateQueue;
          ((r.lastEffect = null),
            (r.events = null),
            (r.stores = null),
            r.memoCache != null && (r.memoCache.index = 0));
        }
        ((H.H = Yv), (r = t(n, a)));
      } while (wo);
      return r;
    }
    function LM() {
      var e = H.H,
        t = e.useState()[0];
      return (
        (t = typeof t.then == 'function' ? fi(t) : t),
        (e = e.useState()[0]),
        (ee !== null ? ee.memoizedState : null) !== e && (Y.flags |= 1024),
        t
      );
    }
    function Md() {
      var e = qs !== 0;
      return ((qs = 0), e);
    }
    function Ed(e, t, n) {
      ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
    }
    function Od(e) {
      if (Ps) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          (t !== null && (t.pending = null), (e = e.next));
        }
        Ps = !1;
      }
      ((fn = 0), (De = ee = Y = null), (wo = !1), (Qr = qs = 0), (Ro = null));
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
        De === null ? (Y.memoizedState = De = e) : (De = De.next = e),
        De
      );
    }
    function ve() {
      if (ee === null) {
        var e = Y.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = ee.next;
      var t = De === null ? Y.memoizedState : De.next;
      if (t !== null) ((De = t), (ee = e));
      else {
        if (e === null)
          throw Y.alternate === null ? Error(M(467)) : Error(M(310));
        ((ee = e),
          (e = {
            memoizedState: ee.memoizedState,
            baseState: ee.baseState,
            baseQueue: ee.baseQueue,
            queue: ee.queue,
            next: null,
          }),
          De === null ? (Y.memoizedState = De = e) : (De = De.next = e));
      }
      return De;
    }
    function pl() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function fi(e) {
      var t = Qr;
      return (
        (Qr += 1),
        Ro === null && (Ro = []),
        (e = ev(Ro, e, t)),
        (t = Y),
        (De === null ? t.memoizedState : De.next) === null &&
          ((t = t.alternate),
          (H.H = t === null || t.memoizedState === null ? kv : Id)),
        e
      );
    }
    function gl(e) {
      if (e !== null && typeof e == 'object') {
        if (typeof e.then == 'function') return fi(e);
        if (e.$$typeof === an) return ke(e);
      }
      throw Error(M(438, String(e)));
    }
    function Cd(e) {
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
        n === null && ((n = pl()), (Y.updateQueue = n)),
        (n.memoCache = t),
        (n = t.data[t.index]),
        n === void 0)
      )
        for (n = t.data[t.index] = Array(e), a = 0; a < e; a++) n[a] = CD;
      return (t.index++, n);
    }
    function dn(e, t) {
      return typeof t == 'function' ? t(e) : t;
    }
    function Es(e) {
      var t = ve();
      return Nd(t, ee, e);
    }
    function Nd(e, t, n) {
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
          if (d !== c.lane ? (L & d) === d : (fn & d) === d) {
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
                d === Io && (u = !0));
            else if ((fn & f) === f) {
              ((c = c.next), f === Io && (u = !0));
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
                (ea |= f));
            ((d = c.action),
              Na && n(r, d),
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
              (ea |= d));
          c = c.next;
        } while (c !== null && c !== t);
        if (
          (l === null ? (i = r) : (l.next = s),
          !lt(r, e.memoizedState) && ((Oe = !0), u && ((n = Co), n !== null)))
        )
          throw n;
        ((e.memoizedState = r),
          (e.baseState = i),
          (e.baseQueue = l),
          (a.lastRenderedState = r));
      }
      return (o === null && (a.lanes = 0), [e.memoizedState, a.dispatch]);
    }
    function _u(e) {
      var t = ve(),
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
        (lt(r, t.memoizedState) || (Oe = !0),
          (t.memoizedState = r),
          t.baseQueue === null && (t.baseState = r),
          (n.lastRenderedState = r));
      }
      return [r, a];
    }
    function lv(e, t, n) {
      var a = Y,
        o = ve(),
        r = Z;
      if (r) {
        if (n === void 0) throw Error(M(407));
        n = n();
      } else n = t();
      var i = !lt((ee || o).memoizedState, n);
      if (
        (i && ((o.memoizedState = n), (Oe = !0)),
        (o = o.queue),
        wd(fv.bind(null, a, o, e), [e]),
        o.getSnapshot !== t || i || (De !== null && De.memoizedState.tag & 1))
      ) {
        if (
          ((a.flags |= 2048),
          Uo(9, { destroy: void 0 }, uv.bind(null, a, o, n, t), null),
          ne === null)
        )
          throw Error(M(349));
        r || (fn & 127) !== 0 || cv(a, t, n);
      }
      return n;
    }
    function cv(e, t, n) {
      ((e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = Y.updateQueue),
        t === null
          ? ((t = pl()), (Y.updateQueue = t), (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
    }
    function uv(e, t, n, a) {
      ((t.value = n), (t.getSnapshot = a), dv(t) && mv(e));
    }
    function fv(e, t, n) {
      return n(function () {
        dv(t) && mv(e);
      });
    }
    function dv(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !lt(e, n);
      } catch {
        return !0;
      }
    }
    function mv(e) {
      var t = Aa(e, 2);
      t !== null && je(t, e, 2);
    }
    function $f(e) {
      var t = Ze();
      if (typeof e == 'function') {
        var n = e;
        if (((e = n()), Na)) {
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
          lastRenderedReducer: dn,
          lastRenderedState: e,
        }),
        t
      );
    }
    function hv(e, t, n, a) {
      return ((e.baseState = n), Nd(e, ee, typeof a == 'function' ? a : dn));
    }
    function ZM(e, t, n, a, o) {
      if (vl(e)) throw Error(M(485));
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
            ? ((r.next = t.pending = r), pv(t, r))
            : ((r.next = n.next), (t.pending = n.next = r)));
      }
    }
    function pv(e, t) {
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
          (l !== null && l(i, s), hg(e, t, s));
        } catch (c) {
          xf(e, t, c);
        } finally {
          (r !== null && i.types !== null && (r.types = i.types), (H.T = r));
        }
      } else
        try {
          ((r = n(o, a)), hg(e, t, r));
        } catch (c) {
          xf(e, t, c);
        }
    }
    function hg(e, t, n) {
      n !== null && typeof n == 'object' && typeof n.then == 'function'
        ? n.then(
            function (a) {
              pg(e, t, a);
            },
            function (a) {
              return xf(e, t, a);
            },
          )
        : pg(e, t, n);
    }
    function pg(e, t, n) {
      ((t.status = 'fulfilled'),
        (t.value = n),
        gv(t),
        (e.state = n),
        (t = e.pending),
        t !== null &&
          ((n = t.next),
          n === t
            ? (e.pending = null)
            : ((n = n.next), (t.next = n), pv(e, n))));
    }
    function xf(e, t, n) {
      var a = e.pending;
      if (((e.pending = null), a !== null)) {
        a = a.next;
        do ((t.status = 'rejected'), (t.reason = n), gv(t), (t = t.next));
        while (t !== a);
      }
      e.action = null;
    }
    function gv(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function yv(e, t) {
      return t;
    }
    function gg(e, t) {
      if (Z) {
        var n = ne.formState;
        if (n !== null) {
          e: {
            var a = Y;
            if (Z) {
              if (se) {
                t: {
                  for (var o = se, r = bt; o.nodeType !== 8; ) {
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
                  ((se = Tt(o.nextSibling)), (a = o.data === 'F!'));
                  break e;
                }
              }
              Kn(a);
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
          lastRenderedReducer: yv,
          lastRenderedState: t,
        }),
        (n.queue = a),
        (n = Iv.bind(null, Y, a)),
        (a.dispatch = n),
        (a = $f(!1)),
        (r = Ad.bind(null, Y, !1, a.queue)),
        (a = Ze()),
        (o = { state: t, dispatch: null, action: e, pending: null }),
        (a.queue = o),
        (n = ZM.bind(null, Y, o, r, n)),
        (o.dispatch = n),
        (a.memoizedState = e),
        [t, n, !1]
      );
    }
    function yg(e) {
      var t = ve();
      return vv(t, ee, e);
    }
    function vv(e, t, n) {
      if (
        ((t = Nd(e, t, yv)[0]),
        (e = Es(dn)[0]),
        typeof t == 'object' && t !== null && typeof t.then == 'function')
      )
        try {
          var a = fi(t);
        } catch (i) {
          throw i === Fo ? hl : i;
        }
      else a = t;
      t = ve();
      var o = t.queue,
        r = o.dispatch;
      return (
        n !== t.memoizedState &&
          ((Y.flags |= 2048),
          Uo(9, { destroy: void 0 }, WM.bind(null, o, n), null)),
        [a, r, e]
      );
    }
    function WM(e, t) {
      e.action = t;
    }
    function vg(e) {
      var t = ve(),
        n = ee;
      if (n !== null) return vv(t, n, e);
      (ve(), (t = t.memoizedState), (n = ve()));
      var a = n.queue.dispatch;
      return ((n.memoizedState = e), [t, a, !1]);
    }
    function Uo(e, t, n, a) {
      return (
        (e = { tag: e, create: n, deps: a, inst: t, next: null }),
        (t = Y.updateQueue),
        t === null && ((t = pl()), (Y.updateQueue = t)),
        (n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((a = n.next), (n.next = e), (e.next = a), (t.lastEffect = e)),
        e
      );
    }
    function bv() {
      return ve().memoizedState;
    }
    function Os(e, t, n, a) {
      var o = Ze();
      ((Y.flags |= e),
        (o.memoizedState = Uo(
          1 | t,
          { destroy: void 0 },
          n,
          a === void 0 ? null : a,
        )));
    }
    function yl(e, t, n, a) {
      var o = ve();
      a = a === void 0 ? null : a;
      var r = o.memoizedState.inst;
      ee !== null && a !== null && Td(a, ee.memoizedState.deps)
        ? (o.memoizedState = Uo(t, r, n, a))
        : ((Y.flags |= e), (o.memoizedState = Uo(1 | t, r, n, a)));
    }
    function bg(e, t) {
      Os(8390656, 8, e, t);
    }
    function wd(e, t) {
      yl(2048, 8, e, t);
    }
    function FM(e) {
      Y.flags |= 4;
      var t = Y.updateQueue;
      if (t === null) ((t = pl()), (Y.updateQueue = t), (t.events = [e]));
      else {
        var n = t.events;
        n === null ? (t.events = [e]) : n.push(e);
      }
    }
    function Sv(e) {
      var t = ve().memoizedState;
      return (
        FM({ ref: t, nextImpl: e }),
        function () {
          if ((q & 2) !== 0) throw Error(M(440));
          return t.impl.apply(void 0, arguments);
        }
      );
    }
    function Tv(e, t) {
      return yl(4, 2, e, t);
    }
    function Dv(e, t) {
      return yl(4, 4, e, t);
    }
    function Mv(e, t) {
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
    function Ev(e, t, n) {
      ((n = n != null ? n.concat([e]) : null),
        yl(4, 4, Mv.bind(null, t, e), n));
    }
    function Rd() {}
    function Ov(e, t) {
      var n = ve();
      t = t === void 0 ? null : t;
      var a = n.memoizedState;
      return t !== null && Td(t, a[1]) ? a[0] : ((n.memoizedState = [e, t]), e);
    }
    function Cv(e, t) {
      var n = ve();
      t = t === void 0 ? null : t;
      var a = n.memoizedState;
      if (t !== null && Td(t, a[1])) return a[0];
      if (((a = e()), Na)) {
        Yn(!0);
        try {
          e();
        } finally {
          Yn(!1);
        }
      }
      return ((n.memoizedState = [a, t]), a);
    }
    function $d(e, t, n) {
      return n === void 0 || ((fn & 1073741824) !== 0 && (L & 261930) === 0)
        ? (e.memoizedState = t)
        : ((e.memoizedState = n), (e = hb()), (Y.lanes |= e), (ea |= e), n);
    }
    function Nv(e, t, n, a) {
      return lt(n, t)
        ? n
        : Ho.current !== null
          ? ((e = $d(e, n, a)), lt(e, t) || (Oe = !0), e)
          : (fn & 42) === 0 || ((fn & 1073741824) !== 0 && (L & 261930) === 0)
            ? ((Oe = !0), (e.memoizedState = n))
            : ((e = hb()), (Y.lanes |= e), (ea |= e), t);
    }
    function wv(e, t, n, a, o) {
      var r = V.p;
      V.p = r !== 0 && 8 > r ? r : 8;
      var i = H.T,
        s = {};
      ((H.T = s), Ad(e, !1, t, n));
      try {
        var l = o(),
          c = H.S;
        if (
          (c !== null && c(s, l),
          l !== null && typeof l == 'object' && typeof l.then == 'function')
        ) {
          var u = _M(l, a);
          Br(e, t, u, st(e));
        } else Br(e, t, a, st(e));
      } catch (d) {
        Br(e, t, { then: function () {}, status: 'rejected', reason: d }, st());
      } finally {
        ((V.p = r),
          i !== null && s.types !== null && (i.types = s.types),
          (H.T = i));
      }
    }
    function PM() {}
    function Af(e, t, n, a) {
      if (e.tag !== 5) throw Error(M(476));
      var o = Rv(e).queue;
      wv(
        e,
        o,
        t,
        ba,
        n === null
          ? PM
          : function () {
              return ($v(e), n(a));
            },
      );
    }
    function Rv(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: ba,
        baseState: ba,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: dn,
          lastRenderedState: ba,
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
            lastRenderedReducer: dn,
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
    function $v(e) {
      var t = Rv(e);
      (t.next === null && (t = e.alternate.memoizedState),
        Br(e, t.next.queue, {}, st()));
    }
    function xd() {
      return ke(ti);
    }
    function xv() {
      return ve().memoizedState;
    }
    function Av() {
      return ve().memoizedState;
    }
    function qM(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var n = st();
            e = Fn(n);
            var a = Pn(t, e, n);
            (a !== null && (je(a, t, n), Ur(a, t, n)),
              (t = { cache: gd() }),
              (e.payload = t));
            return;
        }
        t = t.return;
      }
    }
    function VM(e, t, n) {
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
        vl(e)
          ? Hv(t, n)
          : ((n = dd(e, t, n, a)), n !== null && (je(n, e, a), Uv(n, t, a))));
    }
    function Iv(e, t, n) {
      var a = st();
      Br(e, t, n, a);
    }
    function Br(e, t, n, a) {
      var o = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if (vl(e)) Hv(t, o);
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
              return (ml(e, t, o, 0), ne === null && dl(), !1);
          } catch {}
        if (((n = dd(e, t, o, a)), n !== null))
          return (je(n, e, a), Uv(n, t, a), !0);
      }
      return !1;
    }
    function Ad(e, t, n, a) {
      if (
        ((a = {
          lane: 2,
          revertLane: Ld(),
          gesture: null,
          action: a,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        vl(e))
      ) {
        if (t) throw Error(M(479));
      } else ((t = dd(e, n, a, 2)), t !== null && je(t, e, 2));
    }
    function vl(e) {
      var t = e.alternate;
      return e === Y || (t !== null && t === Y);
    }
    function Hv(e, t) {
      wo = Ps = !0;
      var n = e.pending;
      (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t));
    }
    function Uv(e, t, n) {
      if ((n & 4194048) !== 0) {
        var a = t.lanes;
        ((a &= e.pendingLanes), (n |= a), (t.lanes = n), Sy(e, n));
      }
    }
    var Kr = {
      readContext: ke,
      use: gl,
      useCallback: pe,
      useContext: pe,
      useEffect: pe,
      useImperativeHandle: pe,
      useLayoutEffect: pe,
      useInsertionEffect: pe,
      useMemo: pe,
      useReducer: pe,
      useRef: pe,
      useState: pe,
      useDebugValue: pe,
      useDeferredValue: pe,
      useTransition: pe,
      useSyncExternalStore: pe,
      useId: pe,
      useHostTransitionStatus: pe,
      useFormState: pe,
      useActionState: pe,
      useOptimistic: pe,
      useMemoCache: pe,
      useCacheRefresh: pe,
    };
    Kr.useEffectEvent = pe;
    var kv = {
        readContext: ke,
        use: gl,
        useCallback: function (e, t) {
          return ((Ze().memoizedState = [e, t === void 0 ? null : t]), e);
        },
        useContext: ke,
        useEffect: bg,
        useImperativeHandle: function (e, t, n) {
          ((n = n != null ? n.concat([e]) : null),
            Os(4194308, 4, Mv.bind(null, t, e), n));
        },
        useLayoutEffect: function (e, t) {
          return Os(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          Os(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = Ze();
          t = t === void 0 ? null : t;
          var a = e();
          if (Na) {
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
            if (Na) {
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
            (e = e.dispatch = VM.bind(null, Y, e)),
            [a.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = Ze();
          return ((e = { current: e }), (t.memoizedState = e));
        },
        useState: function (e) {
          e = $f(e);
          var t = e.queue,
            n = Iv.bind(null, Y, t);
          return ((t.dispatch = n), [e.memoizedState, n]);
        },
        useDebugValue: Rd,
        useDeferredValue: function (e, t) {
          var n = Ze();
          return $d(n, e, t);
        },
        useTransition: function () {
          var e = $f(!1);
          return (
            (e = wv.bind(null, Y, e.queue, !0, !1)),
            (Ze().memoizedState = e),
            [!1, e]
          );
        },
        useSyncExternalStore: function (e, t, n) {
          var a = Y,
            o = Ze();
          if (Z) {
            if (n === void 0) throw Error(M(407));
            n = n();
          } else {
            if (((n = t()), ne === null)) throw Error(M(349));
            (L & 127) !== 0 || cv(a, t, n);
          }
          o.memoizedState = n;
          var r = { value: n, getSnapshot: t };
          return (
            (o.queue = r),
            bg(fv.bind(null, a, r, e), [e]),
            (a.flags |= 2048),
            Uo(9, { destroy: void 0 }, uv.bind(null, a, r, n, t), null),
            n
          );
        },
        useId: function () {
          var e = Ze(),
            t = ne.identifierPrefix;
          if (Z) {
            var n = _t,
              a = Bt;
            ((n = (a & ~(1 << (32 - it(a) - 1))).toString(32) + n),
              (t = '_' + t + 'R_' + n),
              (n = qs++),
              0 < n && (t += 'H' + n.toString(32)),
              (t += '_'));
          } else ((n = zM++), (t = '_' + t + 'r_' + n.toString(32) + '_'));
          return (e.memoizedState = t);
        },
        useHostTransitionStatus: xd,
        useFormState: gg,
        useActionState: gg,
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
            (t = Ad.bind(null, Y, !0, n)),
            (n.dispatch = t),
            [e, t]
          );
        },
        useMemoCache: Cd,
        useCacheRefresh: function () {
          return (Ze().memoizedState = qM.bind(null, Y));
        },
        useEffectEvent: function (e) {
          var t = Ze(),
            n = { impl: e };
          return (
            (t.memoizedState = n),
            function () {
              if ((q & 2) !== 0) throw Error(M(440));
              return n.impl.apply(void 0, arguments);
            }
          );
        },
      },
      Id = {
        readContext: ke,
        use: gl,
        useCallback: Ov,
        useContext: ke,
        useEffect: wd,
        useImperativeHandle: Ev,
        useInsertionEffect: Tv,
        useLayoutEffect: Dv,
        useMemo: Cv,
        useReducer: Es,
        useRef: bv,
        useState: function () {
          return Es(dn);
        },
        useDebugValue: Rd,
        useDeferredValue: function (e, t) {
          var n = ve();
          return Nv(n, ee.memoizedState, e, t);
        },
        useTransition: function () {
          var e = Es(dn)[0],
            t = ve().memoizedState;
          return [typeof e == 'boolean' ? e : fi(e), t];
        },
        useSyncExternalStore: lv,
        useId: xv,
        useHostTransitionStatus: xd,
        useFormState: yg,
        useActionState: yg,
        useOptimistic: function (e, t) {
          var n = ve();
          return hv(n, ee, e, t);
        },
        useMemoCache: Cd,
        useCacheRefresh: Av,
      };
    Id.useEffectEvent = Sv;
    var Yv = {
      readContext: ke,
      use: gl,
      useCallback: Ov,
      useContext: ke,
      useEffect: wd,
      useImperativeHandle: Ev,
      useInsertionEffect: Tv,
      useLayoutEffect: Dv,
      useMemo: Cv,
      useReducer: _u,
      useRef: bv,
      useState: function () {
        return _u(dn);
      },
      useDebugValue: Rd,
      useDeferredValue: function (e, t) {
        var n = ve();
        return ee === null ? $d(n, e, t) : Nv(n, ee.memoizedState, e, t);
      },
      useTransition: function () {
        var e = _u(dn)[0],
          t = ve().memoizedState;
        return [typeof e == 'boolean' ? e : fi(e), t];
      },
      useSyncExternalStore: lv,
      useId: xv,
      useHostTransitionStatus: xd,
      useFormState: vg,
      useActionState: vg,
      useOptimistic: function (e, t) {
        var n = ve();
        return ee !== null
          ? hv(n, ee, e, t)
          : ((n.baseState = e), [e, n.queue.dispatch]);
      },
      useMemoCache: Cd,
      useCacheRefresh: Av,
    };
    Yv.useEffectEvent = Sv;
    function zu(e, t, n, a) {
      ((t = e.memoizedState),
        (n = n(a, t)),
        (n = n == null ? t : le({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n));
    }
    var If = {
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var a = st(),
          o = Fn(a);
        ((o.payload = t),
          n != null && (o.callback = n),
          (t = Pn(e, o, a)),
          t !== null && (je(t, e, a), Ur(t, e, a)));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var a = st(),
          o = Fn(a);
        ((o.tag = 1),
          (o.payload = t),
          n != null && (o.callback = n),
          (t = Pn(e, o, a)),
          t !== null && (je(t, e, a), Ur(t, e, a)));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = st(),
          a = Fn(n);
        ((a.tag = 2),
          t != null && (a.callback = t),
          (t = Pn(e, a, n)),
          t !== null && (je(t, e, n), Ur(t, e, n)));
      },
    };
    function Sg(e, t, n, a, o, r, i) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == 'function'
          ? e.shouldComponentUpdate(a, r, i)
          : t.prototype && t.prototype.isPureReactComponent
            ? !Vr(n, a) || !Vr(o, r)
            : !0
      );
    }
    function Tg(e, t, n, a) {
      ((e = t.state),
        typeof t.componentWillReceiveProps == 'function' &&
          t.componentWillReceiveProps(n, a),
        typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
          t.UNSAFE_componentWillReceiveProps(n, a),
        t.state !== e && If.enqueueReplaceState(t, t.state, null));
    }
    function wa(e, t) {
      var n = t;
      if ('ref' in t) {
        n = {};
        for (var a in t) a !== 'ref' && (n[a] = t[a]);
      }
      if ((e = e.defaultProps)) {
        n === t && (n = le({}, n));
        for (var o in e) n[o] === void 0 && (n[o] = e[o]);
      }
      return n;
    }
    function Bv(e) {
      Bs(e);
    }
    function _v(e) {
      console.error(e);
    }
    function zv(e) {
      Bs(e);
    }
    function Vs(e, t) {
      try {
        var n = e.onUncaughtError;
        n(t.value, { componentStack: t.stack });
      } catch (a) {
        setTimeout(function () {
          throw a;
        });
      }
    }
    function Dg(e, t, n) {
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
    function Hf(e, t, n) {
      return (
        (n = Fn(n)),
        (n.tag = 3),
        (n.payload = { element: null }),
        (n.callback = function () {
          Vs(e, t);
        }),
        n
      );
    }
    function Lv(e) {
      return ((e = Fn(e)), (e.tag = 3), e);
    }
    function Zv(e, t, n, a) {
      var o = n.type.getDerivedStateFromError;
      if (typeof o == 'function') {
        var r = a.value;
        ((e.payload = function () {
          return o(r);
        }),
          (e.callback = function () {
            Dg(t, n, a);
          }));
      }
      var i = n.stateNode;
      i !== null &&
        typeof i.componentDidCatch == 'function' &&
        (e.callback = function () {
          (Dg(t, n, a),
            typeof o != 'function' &&
              (qn === null ? (qn = new Set([this])) : qn.add(this)));
          var s = a.stack;
          this.componentDidCatch(a.value, {
            componentStack: s !== null ? s : '',
          });
        });
    }
    function jM(e, t, n, a, o) {
      if (
        ((n.flags |= 32768),
        a !== null && typeof a == 'object' && typeof a.then == 'function')
      ) {
        if (
          ((t = n.alternate),
          t !== null && Wo(t, n, o, !0),
          (n = ct.current),
          n !== null)
        ) {
          switch (n.tag) {
            case 31:
            case 13:
              return (
                St === null
                  ? Ks()
                  : n.alternate === null && ge === 0 && (ge = 3),
                (n.flags &= -257),
                (n.flags |= 65536),
                (n.lanes = o),
                a === Zs
                  ? (n.flags |= 16384)
                  : ((t = n.updateQueue),
                    t === null ? (n.updateQueue = new Set([a])) : t.add(a),
                    Qu(e, a, o)),
                !1
              );
            case 22:
              return (
                (n.flags |= 65536),
                a === Zs
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
                    Qu(e, a, o)),
                !1
              );
          }
          throw Error(M(435, n.tag));
        }
        return (Qu(e, a, o), Ks(), !1);
      }
      if (Z)
        return (
          (t = ct.current),
          t !== null
            ? ((t.flags & 65536) === 0 && (t.flags |= 256),
              (t.flags |= 65536),
              (t.lanes = o),
              a !== Tf && ((e = Error(M(422), { cause: a })), Gr(vt(e, n))))
            : (a !== Tf && ((t = Error(M(423), { cause: a })), Gr(vt(t, n))),
              (e = e.current.alternate),
              (e.flags |= 65536),
              (o &= -o),
              (e.lanes |= o),
              (a = vt(a, n)),
              (o = Hf(e.stateNode, a, o)),
              Bu(e, o),
              ge !== 4 && (ge = 2)),
          !1
        );
      var r = Error(M(520), { cause: a });
      if (
        ((r = vt(r, n)),
        Lr === null ? (Lr = [r]) : Lr.push(r),
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
              (e = Hf(n.stateNode, a, e)),
              Bu(n, e),
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
                    (qn === null || !qn.has(r)))))
            )
              return (
                (n.flags |= 65536),
                (o &= -o),
                (n.lanes |= o),
                (o = Lv(o)),
                Zv(o, e, n, a),
                Bu(n, o),
                !1
              );
        }
        n = n.return;
      } while (n !== null);
      return !1;
    }
    var Hd = Error(M(461)),
      Oe = !1;
    function Ie(e, t, n, a) {
      t.child = e === null ? nv(t, null, n, a) : Ca(t, e.child, n, a);
    }
    function Mg(e, t, n, a, o) {
      n = n.render;
      var r = t.ref;
      if ('ref' in a) {
        var i = {};
        for (var s in a) s !== 'ref' && (i[s] = a[s]);
      } else i = a;
      return (
        Oa(t),
        (a = Dd(e, t, n, i, r, o)),
        (s = Md()),
        e !== null && !Oe
          ? (Ed(e, t, o), mn(e, t, o))
          : (Z && s && hd(t), (t.flags |= 1), Ie(e, t, a, o), t.child)
      );
    }
    function Eg(e, t, n, a, o) {
      if (e === null) {
        var r = n.type;
        return typeof r == 'function' &&
          !md(r) &&
          r.defaultProps === void 0 &&
          n.compare === null
          ? ((t.tag = 15), (t.type = r), Wv(e, t, r, a, o))
          : ((e = Ds(n.type, null, a, t, t.mode, o)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((r = e.child), !Ud(e, o))) {
        var i = r.memoizedProps;
        if (
          ((n = n.compare),
          (n = n !== null ? n : Vr),
          n(i, a) && e.ref === t.ref)
        )
          return mn(e, t, o);
      }
      return (
        (t.flags |= 1),
        (e = sn(r, a)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
      );
    }
    function Wv(e, t, n, a, o) {
      if (e !== null) {
        var r = e.memoizedProps;
        if (Vr(r, a) && e.ref === t.ref)
          if (((Oe = !1), (t.pendingProps = a = r), Ud(e, o)))
            (e.flags & 131072) !== 0 && (Oe = !0);
          else return ((t.lanes = e.lanes), mn(e, t, o));
      }
      return Uf(e, t, n, a, o);
    }
    function Fv(e, t, n, a) {
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
          return Og(e, t, r, n, a);
        }
        if ((n & 536870912) !== 0)
          ((t.memoizedState = { baseLanes: 0, cachePool: null }),
            e !== null && Ms(t, r !== null ? r.cachePool : null),
            r !== null ? mg(t, r) : wf(),
            rv(t));
        else
          return (
            (a = t.lanes = 536870912),
            Og(e, t, r !== null ? r.baseLanes | n : n, n, a)
          );
      } else
        r !== null
          ? (Ms(t, r.cachePool), mg(t, r), Un(t), (t.memoizedState = null))
          : (e !== null && Ms(t, null), wf(), Un(t));
      return (Ie(e, t, o, n), t.child);
    }
    function Rr(e, t) {
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
    function Og(e, t, n, a, o) {
      var r = yd();
      return (
        (r = r === null ? null : { parent: Ee._currentValue, pool: r }),
        (t.memoizedState = { baseLanes: n, cachePool: r }),
        e !== null && Ms(t, null),
        wf(),
        rv(t),
        e !== null && Wo(e, t, a, !0),
        (t.childLanes = o),
        null
      );
    }
    function Cs(e, t) {
      return (
        (t = js({ mode: t.mode, children: t.children }, e.mode)),
        (t.ref = e.ref),
        (e.child = t),
        (t.return = e),
        t
      );
    }
    function Cg(e, t, n) {
      return (
        Ca(t, e.child, null, n),
        (e = Cs(t, t.pendingProps)),
        (e.flags |= 2),
        tt(t),
        (t.memoizedState = null),
        e
      );
    }
    function GM(e, t, n) {
      var a = t.pendingProps,
        o = (t.flags & 128) !== 0;
      if (((t.flags &= -129), e === null)) {
        if (Z) {
          if (a.mode === 'hidden')
            return ((e = Cs(t, a)), (t.lanes = 536870912), Rr(null, e));
          if (
            (Rf(t),
            (e = se)
              ? ((e = kb(e, bt)),
                (e = e !== null && e.data === '&' ? e : null),
                e !== null &&
                  ((t.memoizedState = {
                    dehydrated: e,
                    treeContext: Qn !== null ? { id: Bt, overflow: _t } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (n = Gy(e)),
                  (n.return = t),
                  (t.child = n),
                  (Ue = t),
                  (se = null)))
              : (e = null),
            e === null)
          )
            throw Kn(t);
          return ((t.lanes = 536870912), null);
        }
        return Cs(t, a);
      }
      var r = e.memoizedState;
      if (r !== null) {
        var i = r.dehydrated;
        if ((Rf(t), o))
          if (t.flags & 256) ((t.flags &= -257), (t = Cg(e, t, n)));
          else if (t.memoizedState !== null)
            ((t.child = e.child), (t.flags |= 128), (t = null));
          else throw Error(M(558));
        else if (
          (Oe || Wo(e, t, n, !1), (o = (n & e.childLanes) !== 0), Oe || o)
        ) {
          if (
            ((a = ne),
            a !== null && ((i = Ty(a, n)), i !== 0 && i !== r.retryLane))
          )
            throw ((r.retryLane = i), Aa(e, i), je(a, e, i), Hd);
          (Ks(), (t = Cg(e, t, n)));
        } else
          ((e = r.treeContext),
            (se = Tt(i.nextSibling)),
            (Ue = t),
            (Z = !0),
            (Wn = null),
            (bt = !1),
            e !== null && Qy(t, e),
            (t = Cs(t, a)),
            (t.flags |= 4096));
        return t;
      }
      return (
        (e = sn(e.child, { mode: a.mode, children: a.children })),
        (e.ref = t.ref),
        (t.child = e),
        (e.return = t),
        e
      );
    }
    function Ns(e, t) {
      var n = t.ref;
      if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof n != 'function' && typeof n != 'object') throw Error(M(284));
        (e === null || e.ref !== n) && (t.flags |= 4194816);
      }
    }
    function Uf(e, t, n, a, o) {
      return (
        Oa(t),
        (n = Dd(e, t, n, a, void 0, o)),
        (a = Md()),
        e !== null && !Oe
          ? (Ed(e, t, o), mn(e, t, o))
          : (Z && a && hd(t), (t.flags |= 1), Ie(e, t, n, o), t.child)
      );
    }
    function Ng(e, t, n, a, o, r) {
      return (
        Oa(t),
        (t.updateQueue = null),
        (n = sv(t, a, n, o)),
        iv(e),
        (a = Md()),
        e !== null && !Oe
          ? (Ed(e, t, r), mn(e, t, r))
          : (Z && a && hd(t), (t.flags |= 1), Ie(e, t, n, r), t.child)
      );
    }
    function wg(e, t, n, a, o) {
      if ((Oa(t), t.stateNode === null)) {
        var r = bo,
          i = n.contextType;
        (typeof i == 'object' && i !== null && (r = ke(i)),
          (r = new n(a, r)),
          (t.memoizedState =
            r.state !== null && r.state !== void 0 ? r.state : null),
          (r.updater = If),
          (t.stateNode = r),
          (r._reactInternals = t),
          (r = t.stateNode),
          (r.props = a),
          (r.state = t.memoizedState),
          (r.refs = {}),
          bd(t),
          (i = n.contextType),
          (r.context = typeof i == 'object' && i !== null ? ke(i) : bo),
          (r.state = t.memoizedState),
          (i = n.getDerivedStateFromProps),
          typeof i == 'function' &&
            (zu(t, n, i, a), (r.state = t.memoizedState)),
          typeof n.getDerivedStateFromProps == 'function' ||
            typeof r.getSnapshotBeforeUpdate == 'function' ||
            (typeof r.UNSAFE_componentWillMount != 'function' &&
              typeof r.componentWillMount != 'function') ||
            ((i = r.state),
            typeof r.componentWillMount == 'function' && r.componentWillMount(),
            typeof r.UNSAFE_componentWillMount == 'function' &&
              r.UNSAFE_componentWillMount(),
            i !== r.state && If.enqueueReplaceState(r, r.state, null),
            Yr(t, a, r, o),
            kr(),
            (r.state = t.memoizedState)),
          typeof r.componentDidMount == 'function' && (t.flags |= 4194308),
          (a = !0));
      } else if (e === null) {
        r = t.stateNode;
        var s = t.memoizedProps,
          l = wa(n, s);
        r.props = l;
        var c = r.context,
          u = n.contextType;
        ((i = bo), typeof u == 'object' && u !== null && (i = ke(u)));
        var d = n.getDerivedStateFromProps;
        ((u =
          typeof d == 'function' ||
          typeof r.getSnapshotBeforeUpdate == 'function'),
          (s = t.pendingProps !== s),
          u ||
            (typeof r.UNSAFE_componentWillReceiveProps != 'function' &&
              typeof r.componentWillReceiveProps != 'function') ||
            ((s || c !== i) && Tg(t, r, a, i)),
          (An = !1));
        var f = t.memoizedState;
        ((r.state = f),
          Yr(t, a, r, o),
          kr(),
          (c = t.memoizedState),
          s || f !== c || An
            ? (typeof d == 'function' &&
                (zu(t, n, d, a), (c = t.memoizedState)),
              (l = An || Sg(t, n, l, a, f, c, i))
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
          Cf(e, t),
          (i = t.memoizedProps),
          (u = wa(n, i)),
          (r.props = u),
          (d = t.pendingProps),
          (f = r.context),
          (c = n.contextType),
          (l = bo),
          typeof c == 'object' && c !== null && (l = ke(c)),
          (s = n.getDerivedStateFromProps),
          (c =
            typeof s == 'function' ||
            typeof r.getSnapshotBeforeUpdate == 'function') ||
            (typeof r.UNSAFE_componentWillReceiveProps != 'function' &&
              typeof r.componentWillReceiveProps != 'function') ||
            ((i !== d || f !== l) && Tg(t, r, a, l)),
          (An = !1),
          (f = t.memoizedState),
          (r.state = f),
          Yr(t, a, r, o),
          kr());
        var m = t.memoizedState;
        i !== d ||
        f !== m ||
        An ||
        (e !== null && e.dependencies !== null && Ls(e.dependencies))
          ? (typeof s == 'function' && (zu(t, n, s, a), (m = t.memoizedState)),
            (u =
              An ||
              Sg(t, n, u, a, f, m, l) ||
              (e !== null && e.dependencies !== null && Ls(e.dependencies)))
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
        Ns(e, t),
        (a = (t.flags & 128) !== 0),
        r || a
          ? ((r = t.stateNode),
            (n =
              a && typeof n.getDerivedStateFromError != 'function'
                ? null
                : r.render()),
            (t.flags |= 1),
            e !== null && a
              ? ((t.child = Ca(t, e.child, null, o)),
                (t.child = Ca(t, null, n, o)))
              : Ie(e, t, n, o),
            (t.memoizedState = r.state),
            (e = t.child))
          : (e = mn(e, t, o)),
        e
      );
    }
    function Rg(e, t, n, a) {
      return (Ea(), (t.flags |= 256), Ie(e, t, n, a), t.child);
    }
    var Lu = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null,
    };
    function Zu(e) {
      return { baseLanes: e, cachePool: Jy() };
    }
    function Wu(e, t, n) {
      return ((e = e !== null ? e.childLanes & ~n : 0), t && (e |= at), e);
    }
    function Pv(e, t, n) {
      var a = t.pendingProps,
        o = !1,
        r = (t.flags & 128) !== 0,
        i;
      if (
        ((i = r) ||
          (i =
            e !== null && e.memoizedState === null
              ? !1
              : (ye.current & 2) !== 0),
        i && ((o = !0), (t.flags &= -129)),
        (i = (t.flags & 32) !== 0),
        (t.flags &= -33),
        e === null)
      ) {
        if (Z) {
          if (
            (o ? Hn(t) : Un(t),
            (e = se)
              ? ((e = kb(e, bt)),
                (e = e !== null && e.data !== '&' ? e : null),
                e !== null &&
                  ((t.memoizedState = {
                    dehydrated: e,
                    treeContext: Qn !== null ? { id: Bt, overflow: _t } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (n = Gy(e)),
                  (n.return = t),
                  (t.child = n),
                  (Ue = t),
                  (se = null)))
              : (e = null),
            e === null)
          )
            throw Kn(t);
          return (Gf(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
        }
        var s = a.children;
        return (
          (a = a.fallback),
          o
            ? (Un(t),
              (o = t.mode),
              (s = js({ mode: 'hidden', children: s }, o)),
              (a = Sa(a, o, n, null)),
              (s.return = t),
              (a.return = t),
              (s.sibling = a),
              (t.child = s),
              (a = t.child),
              (a.memoizedState = Zu(n)),
              (a.childLanes = Wu(e, i, n)),
              (t.memoizedState = Lu),
              Rr(null, a))
            : (Hn(t), kf(t, s))
        );
      }
      var l = e.memoizedState;
      if (l !== null && ((s = l.dehydrated), s !== null)) {
        if (r)
          t.flags & 256
            ? (Hn(t), (t.flags &= -257), (t = Fu(e, t, n)))
            : t.memoizedState !== null
              ? (Un(t), (t.child = e.child), (t.flags |= 128), (t = null))
              : (Un(t),
                (s = a.fallback),
                (o = t.mode),
                (a = js({ mode: 'visible', children: a.children }, o)),
                (s = Sa(s, o, n, null)),
                (s.flags |= 2),
                (a.return = t),
                (s.return = t),
                (a.sibling = s),
                (t.child = a),
                Ca(t, e.child, null, n),
                (a = t.child),
                (a.memoizedState = Zu(n)),
                (a.childLanes = Wu(e, i, n)),
                (t.memoizedState = Lu),
                (t = Rr(null, a)));
        else if ((Hn(t), Gf(s))) {
          if (((i = s.nextSibling && s.nextSibling.dataset), i)) var c = i.dgst;
          ((i = c),
            (a = Error(M(419))),
            (a.stack = ''),
            (a.digest = i),
            Gr({ value: a, source: null, stack: null }),
            (t = Fu(e, t, n)));
        } else if (
          (Oe || Wo(e, t, n, !1), (i = (n & e.childLanes) !== 0), Oe || i)
        ) {
          if (
            ((i = ne),
            i !== null && ((a = Ty(i, n)), a !== 0 && a !== l.retryLane))
          )
            throw ((l.retryLane = a), Aa(e, a), je(i, e, a), Hd);
          (jf(s) || Ks(), (t = Fu(e, t, n)));
        } else
          jf(s)
            ? ((t.flags |= 192), (t.child = e.child), (t = null))
            : ((e = l.treeContext),
              (se = Tt(s.nextSibling)),
              (Ue = t),
              (Z = !0),
              (Wn = null),
              (bt = !1),
              e !== null && Qy(t, e),
              (t = kf(t, a.children)),
              (t.flags |= 4096));
        return t;
      }
      return o
        ? (Un(t),
          (s = a.fallback),
          (o = t.mode),
          (l = e.child),
          (c = l.sibling),
          (a = sn(l, { mode: 'hidden', children: a.children })),
          (a.subtreeFlags = l.subtreeFlags & 65011712),
          c !== null
            ? (s = sn(c, s))
            : ((s = Sa(s, o, n, null)), (s.flags |= 2)),
          (s.return = t),
          (a.return = t),
          (a.sibling = s),
          (t.child = a),
          Rr(null, a),
          (a = t.child),
          (s = e.child.memoizedState),
          s === null
            ? (s = Zu(n))
            : ((o = s.cachePool),
              o !== null
                ? ((l = Ee._currentValue),
                  (o = o.parent !== l ? { parent: l, pool: l } : o))
                : (o = Jy()),
              (s = { baseLanes: s.baseLanes | n, cachePool: o })),
          (a.memoizedState = s),
          (a.childLanes = Wu(e, i, n)),
          (t.memoizedState = Lu),
          Rr(e.child, a))
        : (Hn(t),
          (n = e.child),
          (e = n.sibling),
          (n = sn(n, { mode: 'visible', children: a.children })),
          (n.return = t),
          (n.sibling = null),
          e !== null &&
            ((i = t.deletions),
            i === null ? ((t.deletions = [e]), (t.flags |= 16)) : i.push(e)),
          (t.child = n),
          (t.memoizedState = null),
          n);
    }
    function kf(e, t) {
      return (
        (t = js({ mode: 'visible', children: t }, e.mode)),
        (t.return = e),
        (e.child = t)
      );
    }
    function js(e, t) {
      return ((e = nt(22, e, null, t)), (e.lanes = 0), e);
    }
    function Fu(e, t, n) {
      return (
        Ca(t, e.child, null, n),
        (e = kf(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function $g(e, t, n) {
      e.lanes |= t;
      var a = e.alternate;
      (a !== null && (a.lanes |= t), Mf(e.return, t, n));
    }
    function Pu(e, t, n, a, o, r) {
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
    function qv(e, t, n) {
      var a = t.pendingProps,
        o = a.revealOrder,
        r = a.tail;
      a = a.children;
      var i = ye.current,
        s = (i & 2) !== 0;
      if (
        (s ? ((i = (i & 1) | 2), (t.flags |= 128)) : (i &= 1),
        oe(ye, i),
        Ie(e, t, a, n),
        (a = Z ? jr : 0),
        !s && e !== null && (e.flags & 128) !== 0)
      )
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && $g(e, n, t);
          else if (e.tag === 19) $g(e, n, t);
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
              e !== null && Fs(e) === null && (o = n),
              (n = n.sibling));
          ((n = o),
            n === null
              ? ((o = t.child), (t.child = null))
              : ((o = n.sibling), (n.sibling = null)),
            Pu(t, !1, o, n, r, a));
          break;
        case 'backwards':
        case 'unstable_legacy-backwards':
          for (n = null, o = t.child, t.child = null; o !== null; ) {
            if (((e = o.alternate), e !== null && Fs(e) === null)) {
              t.child = o;
              break;
            }
            ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
          }
          Pu(t, !0, n, null, r, a);
          break;
        case 'together':
          Pu(t, !1, null, null, void 0, a);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function mn(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies),
        (ea |= t.lanes),
        (n & t.childLanes) === 0)
      )
        if (e !== null) {
          if ((Wo(e, t, n, !1), (n & t.childLanes) === 0)) return null;
        } else return null;
      if (e !== null && t.child !== e.child) throw Error(M(153));
      if (t.child !== null) {
        for (
          e = t.child, n = sn(e, e.pendingProps), t.child = n, n.return = t;
          e.sibling !== null;
        )
          ((e = e.sibling),
            (n = n.sibling = sn(e, e.pendingProps)),
            (n.return = t));
        n.sibling = null;
      }
      return t.child;
    }
    function Ud(e, t) {
      return (e.lanes & t) !== 0
        ? !0
        : ((e = e.dependencies), !!(e !== null && Ls(e)));
    }
    function XM(e, t, n) {
      switch (t.tag) {
        case 3:
          (Hs(t, t.stateNode.containerInfo),
            In(t, Ee, e.memoizedState.cache),
            Ea());
          break;
        case 27:
        case 5:
          uf(t);
          break;
        case 4:
          Hs(t, t.stateNode.containerInfo);
          break;
        case 10:
          In(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return ((t.flags |= 128), Rf(t), null);
          break;
        case 13:
          var a = t.memoizedState;
          if (a !== null)
            return a.dehydrated !== null
              ? (Hn(t), (t.flags |= 128), null)
              : (n & t.child.childLanes) !== 0
                ? Pv(e, t, n)
                : (Hn(t), (e = mn(e, t, n)), e !== null ? e.sibling : null);
          Hn(t);
          break;
        case 19:
          var o = (e.flags & 128) !== 0;
          if (
            ((a = (n & t.childLanes) !== 0),
            a || (Wo(e, t, n, !1), (a = (n & t.childLanes) !== 0)),
            o)
          ) {
            if (a) return qv(e, t, n);
            t.flags |= 128;
          }
          if (
            ((o = t.memoizedState),
            o !== null &&
              ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
            oe(ye, ye.current),
            a)
          )
            break;
          return null;
        case 22:
          return ((t.lanes = 0), Fv(e, t, n, t.pendingProps));
        case 24:
          In(t, Ee, e.memoizedState.cache);
      }
      return mn(e, t, n);
    }
    function Vv(e, t, n) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps) Oe = !0;
        else {
          if (!Ud(e, n) && (t.flags & 128) === 0)
            return ((Oe = !1), XM(e, t, n));
          Oe = (e.flags & 131072) !== 0;
        }
      else ((Oe = !1), Z && (t.flags & 1048576) !== 0 && Xy(t, jr, t.index));
      switch (((t.lanes = 0), t.tag)) {
        case 16:
          e: {
            var a = t.pendingProps;
            if (((e = ya(t.elementType)), (t.type = e), typeof e == 'function'))
              md(e)
                ? ((a = wa(e, a)), (t.tag = 1), (t = wg(null, t, e, a, n)))
                : ((t.tag = 0), (t = Uf(null, t, e, a, n)));
            else {
              if (e != null) {
                var o = e.$$typeof;
                if (o === Jf) {
                  ((t.tag = 11), (t = Mg(null, t, e, a, n)));
                  break e;
                } else if (o === ed) {
                  ((t.tag = 14), (t = Eg(null, t, e, a, n)));
                  break e;
                }
              }
              throw ((t = lf(e) || e), Error(M(306, t, '')));
            }
          }
          return t;
        case 0:
          return Uf(e, t, t.type, t.pendingProps, n);
        case 1:
          return ((a = t.type), (o = wa(a, t.pendingProps)), wg(e, t, a, o, n));
        case 3:
          e: {
            if ((Hs(t, t.stateNode.containerInfo), e === null))
              throw Error(M(387));
            a = t.pendingProps;
            var r = t.memoizedState;
            ((o = r.element), Cf(e, t), Yr(t, a, null, n));
            var i = t.memoizedState;
            if (
              ((a = i.cache),
              In(t, Ee, a),
              a !== r.cache && Ef(t, [Ee], n, !0),
              kr(),
              (a = i.element),
              r.isDehydrated)
            )
              if (
                ((r = { element: a, isDehydrated: !1, cache: i.cache }),
                (t.updateQueue.baseState = r),
                (t.memoizedState = r),
                t.flags & 256)
              ) {
                t = Rg(e, t, a, n);
                break e;
              } else if (a !== o) {
                ((o = vt(Error(M(424)), t)), Gr(o), (t = Rg(e, t, a, n)));
                break e;
              } else
                for (
                  e = t.stateNode.containerInfo,
                    e.nodeType === 9
                      ? (e = e.body)
                      : (e = e.nodeName === 'HTML' ? e.ownerDocument.body : e),
                    se = Tt(e.firstChild),
                    Ue = t,
                    Z = !0,
                    Wn = null,
                    bt = !0,
                    n = nv(t, null, a, n),
                    t.child = n;
                  n;
                )
                  ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            else {
              if ((Ea(), a === o)) {
                t = mn(e, t, n);
                break e;
              }
              Ie(e, t, a, n);
            }
            t = t.child;
          }
          return t;
        case 26:
          return (
            Ns(e, t),
            e === null
              ? (n = Kg(t.type, null, t.pendingProps, null))
                ? (t.memoizedState = n)
                : Z ||
                  ((n = t.type),
                  (e = t.pendingProps),
                  (a = nl(Zn.current).createElement(n)),
                  (a[He] = t),
                  (a[Ge] = e),
                  Ye(a, n, e),
                  $e(a),
                  (t.stateNode = a))
              : (t.memoizedState = Kg(
                  t.type,
                  e.memoizedProps,
                  t.pendingProps,
                  e.memoizedState,
                )),
            null
          );
        case 27:
          return (
            uf(t),
            e === null &&
              Z &&
              ((a = t.stateNode = Yb(t.type, t.pendingProps, Zn.current)),
              (Ue = t),
              (bt = !0),
              (o = se),
              na(t.type) ? ((Xf = o), (se = Tt(a.firstChild))) : (se = o)),
            Ie(e, t, t.pendingProps.children, n),
            Ns(e, t),
            e === null && (t.flags |= 4194304),
            t.child
          );
        case 5:
          return (
            e === null &&
              Z &&
              ((o = a = se) &&
                ((a = EE(a, t.type, t.pendingProps, bt)),
                a !== null
                  ? ((t.stateNode = a),
                    (Ue = t),
                    (se = Tt(a.firstChild)),
                    (bt = !1),
                    (o = !0))
                  : (o = !1)),
              o || Kn(t)),
            uf(t),
            (o = t.type),
            (r = t.pendingProps),
            (i = e !== null ? e.memoizedProps : null),
            (a = r.children),
            qf(o, r) ? (a = null) : i !== null && qf(o, i) && (t.flags |= 32),
            t.memoizedState !== null &&
              ((o = Dd(e, t, LM, null, null, n)), (ti._currentValue = o)),
            Ns(e, t),
            Ie(e, t, a, n),
            t.child
          );
        case 6:
          return (
            e === null &&
              Z &&
              ((e = n = se) &&
                ((n = OE(n, t.pendingProps, bt)),
                n !== null
                  ? ((t.stateNode = n), (Ue = t), (se = null), (e = !0))
                  : (e = !1)),
              e || Kn(t)),
            null
          );
        case 13:
          return Pv(e, t, n);
        case 4:
          return (
            Hs(t, t.stateNode.containerInfo),
            (a = t.pendingProps),
            e === null ? (t.child = Ca(t, null, a, n)) : Ie(e, t, a, n),
            t.child
          );
        case 11:
          return Mg(e, t, t.type, t.pendingProps, n);
        case 7:
          return (Ie(e, t, t.pendingProps, n), t.child);
        case 8:
          return (Ie(e, t, t.pendingProps.children, n), t.child);
        case 12:
          return (Ie(e, t, t.pendingProps.children, n), t.child);
        case 10:
          return (
            (a = t.pendingProps),
            In(t, t.type, a.value),
            Ie(e, t, a.children, n),
            t.child
          );
        case 9:
          return (
            (o = t.type._context),
            (a = t.pendingProps.children),
            Oa(t),
            (o = ke(o)),
            (a = a(o)),
            (t.flags |= 1),
            Ie(e, t, a, n),
            t.child
          );
        case 14:
          return Eg(e, t, t.type, t.pendingProps, n);
        case 15:
          return Wv(e, t, t.type, t.pendingProps, n);
        case 19:
          return qv(e, t, n);
        case 31:
          return GM(e, t, n);
        case 22:
          return Fv(e, t, n, t.pendingProps);
        case 24:
          return (
            Oa(t),
            (a = ke(Ee)),
            e === null
              ? ((o = yd()),
                o === null &&
                  ((o = ne),
                  (r = gd()),
                  (o.pooledCache = r),
                  r.refCount++,
                  r !== null && (o.pooledCacheLanes |= n),
                  (o = r)),
                (t.memoizedState = { parent: a, cache: o }),
                bd(t),
                In(t, Ee, o))
              : ((e.lanes & n) !== 0 && (Cf(e, t), Yr(t, null, null, n), kr()),
                (o = e.memoizedState),
                (r = t.memoizedState),
                o.parent !== a
                  ? ((o = { parent: a, cache: a }),
                    (t.memoizedState = o),
                    t.lanes === 0 &&
                      (t.memoizedState = t.updateQueue.baseState = o),
                    In(t, Ee, a))
                  : ((a = r.cache),
                    In(t, Ee, a),
                    a !== o.cache && Ef(t, [Ee], n, !0))),
            Ie(e, t, t.pendingProps.children, n),
            t.child
          );
        case 29:
          throw t.pendingProps;
      }
      throw Error(M(156, t.tag));
    }
    function Qt(e) {
      e.flags |= 4;
    }
    function qu(e, t, n, a, o) {
      if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
        if (((e.flags |= 16777216), (o & 335544128) === o))
          if (e.stateNode.complete) e.flags |= 8192;
          else if (yb()) e.flags |= 8192;
          else throw ((Da = Zs), vd);
      } else e.flags &= -16777217;
    }
    function xg(e, t) {
      if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0)
        e.flags &= -16777217;
      else if (((e.flags |= 16777216), !zb(t)))
        if (yb()) e.flags |= 8192;
        else throw ((Da = Zs), vd);
    }
    function fs(e, t) {
      (t !== null && (e.flags |= 4),
        e.flags & 16384 &&
          ((t = e.tag !== 22 ? vy() : 536870912), (e.lanes |= t), (ko |= t)));
    }
    function Dr(e, t) {
      if (!Z)
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
    function ie(e) {
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
    function QM(e, t, n) {
      var a = t.pendingProps;
      switch ((pd(t), t.tag)) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (ie(t), null);
        case 1:
          return (ie(t), null);
        case 3:
          return (
            (n = t.stateNode),
            (a = null),
            e !== null && (a = e.memoizedState.cache),
            t.memoizedState.cache !== a && (t.flags |= 2048),
            ln(Ee),
            $o(),
            n.pendingContext &&
              ((n.context = n.pendingContext), (n.pendingContext = null)),
            (e === null || e.child === null) &&
              (io(t)
                ? Qt(t)
                : e === null ||
                  (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                  ((t.flags |= 1024), Yu())),
            ie(t),
            null
          );
        case 26:
          var o = t.type,
            r = t.memoizedState;
          return (
            e === null
              ? (Qt(t),
                r !== null ? (ie(t), xg(t, r)) : (ie(t), qu(t, o, null, a, n)))
              : r
                ? r !== e.memoizedState
                  ? (Qt(t), ie(t), xg(t, r))
                  : (ie(t), (t.flags &= -16777217))
                : ((e = e.memoizedProps),
                  e !== a && Qt(t),
                  ie(t),
                  qu(t, o, e, a, n)),
            null
          );
        case 27:
          if (
            (Us(t),
            (n = Zn.current),
            (o = t.type),
            e !== null && t.stateNode != null)
          )
            e.memoizedProps !== a && Qt(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(M(166));
              return (ie(t), null);
            }
            ((e = Lt.current),
              io(t) ? ig(t, e) : ((e = Yb(o, a, n)), (t.stateNode = e), Qt(t)));
          }
          return (ie(t), null);
        case 5:
          if ((Us(t), (o = t.type), e !== null && t.stateNode != null))
            e.memoizedProps !== a && Qt(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(M(166));
              return (ie(t), null);
            }
            if (((r = Lt.current), io(t))) ig(t, r);
            else {
              var i = nl(Zn.current);
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
              e: switch ((Ye(r, o, a), o)) {
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
              a && Qt(t);
            }
          }
          return (
            ie(t),
            qu(
              t,
              t.type,
              e === null ? null : e.memoizedProps,
              t.pendingProps,
              n,
            ),
            null
          );
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== a && Qt(t);
          else {
            if (typeof a != 'string' && t.stateNode === null)
              throw Error(M(166));
            if (((e = Zn.current), io(t))) {
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
                  Ib(e.nodeValue, n)
                )),
                e || Kn(t, !0));
            } else
              ((e = nl(e).createTextNode(a)), (e[He] = t), (t.stateNode = e));
          }
          return (ie(t), null);
        case 31:
          if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
            if (((a = io(t)), n !== null)) {
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
                (Ea(),
                  (t.flags & 128) === 0 && (t.memoizedState = null),
                  (t.flags |= 4));
              (ie(t), (e = !1));
            } else
              ((n = Yu()),
                e !== null &&
                  e.memoizedState !== null &&
                  (e.memoizedState.hydrationErrors = n),
                (e = !0));
            if (!e) return t.flags & 256 ? (tt(t), t) : (tt(t), null);
            if ((t.flags & 128) !== 0) throw Error(M(558));
          }
          return (ie(t), null);
        case 13:
          if (
            ((a = t.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (((o = io(t)), a !== null && a.dehydrated !== null)) {
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
                (Ea(),
                  (t.flags & 128) === 0 && (t.memoizedState = null),
                  (t.flags |= 4));
              (ie(t), (o = !1));
            } else
              ((o = Yu()),
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
                fs(t, t.updateQueue),
                ie(t),
                null)
          );
        case 4:
          return (
            $o(),
            e === null && Zd(t.stateNode.containerInfo),
            ie(t),
            null
          );
        case 10:
          return (ln(t.type), ie(t), null);
        case 19:
          if ((xe(ye), (a = t.memoizedState), a === null)) return (ie(t), null);
          if (((o = (t.flags & 128) !== 0), (r = a.rendering), r === null))
            if (o) Dr(a, !1);
            else {
              if (ge !== 0 || (e !== null && (e.flags & 128) !== 0))
                for (e = t.child; e !== null; ) {
                  if (((r = Fs(e)), r !== null)) {
                    for (
                      t.flags |= 128,
                        Dr(a, !1),
                        e = r.updateQueue,
                        t.updateQueue = e,
                        fs(t, e),
                        t.subtreeFlags = 0,
                        e = n,
                        n = t.child;
                      n !== null;
                    )
                      (jy(n, e), (n = n.sibling));
                    return (
                      oe(ye, (ye.current & 1) | 2),
                      Z && tn(t, a.treeForkCount),
                      t.child
                    );
                  }
                  e = e.sibling;
                }
              a.tail !== null &&
                ot() > Xs &&
                ((t.flags |= 128), (o = !0), Dr(a, !1), (t.lanes = 4194304));
            }
          else {
            if (!o)
              if (((e = Fs(r)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (o = !0),
                  (e = e.updateQueue),
                  (t.updateQueue = e),
                  fs(t, e),
                  Dr(a, !0),
                  a.tail === null &&
                    a.tailMode === 'hidden' &&
                    !r.alternate &&
                    !Z)
                )
                  return (ie(t), null);
              } else
                2 * ot() - a.renderingStartTime > Xs &&
                  n !== 536870912 &&
                  ((t.flags |= 128), (o = !0), Dr(a, !1), (t.lanes = 4194304));
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
              (n = ye.current),
              oe(ye, o ? (n & 1) | 2 : n & 1),
              Z && tn(t, a.treeForkCount),
              e)
            : (ie(t), null);
        case 22:
        case 23:
          return (
            tt(t),
            Sd(),
            (a = t.memoizedState !== null),
            e !== null
              ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
              : a && (t.flags |= 8192),
            a
              ? (n & 536870912) !== 0 &&
                (t.flags & 128) === 0 &&
                (ie(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : ie(t),
            (n = t.updateQueue),
            n !== null && fs(t, n.retryQueue),
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
            e !== null && xe(Ta),
            null
          );
        case 24:
          return (
            (n = null),
            e !== null && (n = e.memoizedState.cache),
            t.memoizedState.cache !== n && (t.flags |= 2048),
            ln(Ee),
            ie(t),
            null
          );
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(M(156, t.tag));
    }
    function KM(e, t) {
      switch ((pd(t), t.tag)) {
        case 1:
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            ln(Ee),
            $o(),
            (e = t.flags),
            (e & 65536) !== 0 && (e & 128) === 0
              ? ((t.flags = (e & -65537) | 128), t)
              : null
          );
        case 26:
        case 27:
        case 5:
          return (Us(t), null);
        case 31:
          if (t.memoizedState !== null) {
            if ((tt(t), t.alternate === null)) throw Error(M(340));
            Ea();
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
            Ea();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 19:
          return (xe(ye), null);
        case 4:
          return ($o(), null);
        case 10:
          return (ln(t.type), null);
        case 22:
        case 23:
          return (
            tt(t),
            Sd(),
            e !== null && xe(Ta),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 24:
          return (ln(Ee), null);
        case 25:
          return null;
        default:
          return null;
      }
    }
    function jv(e, t) {
      switch ((pd(t), t.tag)) {
        case 3:
          (ln(Ee), $o());
          break;
        case 26:
        case 27:
        case 5:
          Us(t);
          break;
        case 4:
          $o();
          break;
        case 31:
          t.memoizedState !== null && tt(t);
          break;
        case 13:
          tt(t);
          break;
        case 19:
          xe(ye);
          break;
        case 10:
          ln(t.type);
          break;
        case 22:
        case 23:
          (tt(t), Sd(), e !== null && xe(Ta));
          break;
        case 24:
          ln(Ee);
      }
    }
    function di(e, t) {
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
        K(t, t.return, s);
      }
    }
    function Jn(e, t, n) {
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
                  K(o, l, u);
                }
              }
            }
            a = a.next;
          } while (a !== r);
        }
      } catch (u) {
        K(t, t.return, u);
      }
    }
    function Gv(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var n = e.stateNode;
        try {
          ov(t, n);
        } catch (a) {
          K(e, e.return, a);
        }
      }
    }
    function Xv(e, t, n) {
      ((n.props = wa(e.type, e.memoizedProps)), (n.state = e.memoizedState));
      try {
        n.componentWillUnmount();
      } catch (a) {
        K(e, t, a);
      }
    }
    function _r(e, t) {
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
        K(e, t, o);
      }
    }
    function zt(e, t) {
      var n = e.ref,
        a = e.refCleanup;
      if (n !== null)
        if (typeof a == 'function')
          try {
            a();
          } catch (o) {
            K(e, t, o);
          } finally {
            ((e.refCleanup = null),
              (e = e.alternate),
              e != null && (e.refCleanup = null));
          }
        else if (typeof n == 'function')
          try {
            n(null);
          } catch (o) {
            K(e, t, o);
          }
        else n.current = null;
    }
    function Qv(e) {
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
        K(e, e.return, o);
      }
    }
    function Vu(e, t, n) {
      try {
        var a = e.stateNode;
        (vE(a, e.type, n, t), (a[Ge] = t));
      } catch (o) {
        K(e, e.return, o);
      }
    }
    function Kv(e) {
      return (
        e.tag === 5 ||
        e.tag === 3 ||
        e.tag === 26 ||
        (e.tag === 27 && na(e.type)) ||
        e.tag === 4
      );
    }
    function ju(e) {
      e: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || Kv(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
        ) {
          if (
            (e.tag === 27 && na(e.type)) ||
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
    function Yf(e, t, n) {
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
              n != null || t.onclick !== null || (t.onclick = on)));
      else if (
        a !== 4 &&
        (a === 27 && na(e.type) && ((n = e.stateNode), (t = null)),
        (e = e.child),
        e !== null)
      )
        for (Yf(e, t, n), e = e.sibling; e !== null; )
          (Yf(e, t, n), (e = e.sibling));
    }
    function Gs(e, t, n) {
      var a = e.tag;
      if (a === 5 || a === 6)
        ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
      else if (
        a !== 4 &&
        (a === 27 && na(e.type) && (n = e.stateNode), (e = e.child), e !== null)
      )
        for (Gs(e, t, n), e = e.sibling; e !== null; )
          (Gs(e, t, n), (e = e.sibling));
    }
    function Jv(e) {
      var t = e.stateNode,
        n = e.memoizedProps;
      try {
        for (var a = e.type, o = t.attributes; o.length; )
          t.removeAttributeNode(o[0]);
        (Ye(t, a, n), (t[He] = e), (t[Ge] = n));
      } catch (r) {
        K(e, e.return, r);
      }
    }
    var nn = !1,
      Me = !1,
      Gu = !1,
      Ag = typeof WeakSet == 'function' ? WeakSet : Set,
      Re = null;
    function JM(e, t) {
      if (((e = e.containerInfo), (Ff = il), (e = zy(e)), ud(e))) {
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
        Pf = { focusedElem: e, selectionRange: n }, il = !1, Re = t;
        Re !== null;
      )
        if (
          ((t = Re), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
          ((e.return = t), (Re = e));
        else
          for (; Re !== null; ) {
            switch (((t = Re), (r = t.alternate), (e = t.flags), t.tag)) {
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
                    var v = wa(n.type, o);
                    ((e = a.getSnapshotBeforeUpdate(v, r)),
                      (a.__reactInternalSnapshotBeforeUpdate = e));
                  } catch (g) {
                    K(n, n.return, g);
                  }
                }
                break;
              case 3:
                if ((e & 1024) !== 0) {
                  if (
                    ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                  )
                    Vf(e);
                  else if (n === 1)
                    switch (e.nodeName) {
                      case 'HEAD':
                      case 'HTML':
                      case 'BODY':
                        Vf(e);
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
              ((e.return = t.return), (Re = e));
              break;
            }
            Re = t.return;
          }
    }
    function eb(e, t, n) {
      var a = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          (Jt(e, n), a & 4 && di(5, n));
          break;
        case 1:
          if ((Jt(e, n), a & 4))
            if (((e = n.stateNode), t === null))
              try {
                e.componentDidMount();
              } catch (i) {
                K(n, n.return, i);
              }
            else {
              var o = wa(n.type, t.memoizedProps);
              t = t.memoizedState;
              try {
                e.componentDidUpdate(
                  o,
                  t,
                  e.__reactInternalSnapshotBeforeUpdate,
                );
              } catch (i) {
                K(n, n.return, i);
              }
            }
          (a & 64 && Gv(n), a & 512 && _r(n, n.return));
          break;
        case 3:
          if ((Jt(e, n), a & 64 && ((e = n.updateQueue), e !== null))) {
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
              ov(e, t);
            } catch (i) {
              K(n, n.return, i);
            }
          }
          break;
        case 27:
          t === null && a & 4 && Jv(n);
        case 26:
        case 5:
          (Jt(e, n), t === null && a & 4 && Qv(n), a & 512 && _r(n, n.return));
          break;
        case 12:
          Jt(e, n);
          break;
        case 31:
          (Jt(e, n), a & 4 && ab(e, n));
          break;
        case 13:
          (Jt(e, n),
            a & 4 && ob(e, n),
            a & 64 &&
              ((e = n.memoizedState),
              e !== null &&
                ((e = e.dehydrated),
                e !== null && ((n = lE.bind(null, n)), CE(e, n)))));
          break;
        case 22:
          if (((a = n.memoizedState !== null || nn), !a)) {
            ((t = (t !== null && t.memoizedState !== null) || Me), (o = nn));
            var r = Me;
            ((nn = a),
              (Me = t) && !r
                ? en(e, n, (n.subtreeFlags & 8772) !== 0)
                : Jt(e, n),
              (nn = o),
              (Me = r));
          }
          break;
        case 30:
          break;
        default:
          Jt(e, n);
      }
    }
    function tb(e) {
      var t = e.alternate;
      (t !== null && ((e.alternate = null), tb(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 && ((t = e.stateNode), t !== null && od(t)),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null));
    }
    var de = null,
      qe = !1;
    function Kt(e, t, n) {
      for (n = n.child; n !== null; ) (nb(e, t, n), (n = n.sibling));
    }
    function nb(e, t, n) {
      if (rt && typeof rt.onCommitFiberUnmount == 'function')
        try {
          rt.onCommitFiberUnmount(ri, n);
        } catch {}
      switch (n.tag) {
        case 26:
          (Me || zt(n, t),
            Kt(e, t, n),
            n.memoizedState
              ? n.memoizedState.count--
              : n.stateNode &&
                ((n = n.stateNode), n.parentNode.removeChild(n)));
          break;
        case 27:
          Me || zt(n, t);
          var a = de,
            o = qe;
          (na(n.type) && ((de = n.stateNode), (qe = !1)),
            Kt(e, t, n),
            Wr(n.stateNode),
            (de = a),
            (qe = o));
          break;
        case 5:
          Me || zt(n, t);
        case 6:
          if (
            ((a = de),
            (o = qe),
            (de = null),
            Kt(e, t, n),
            (de = a),
            (qe = o),
            de !== null)
          )
            if (qe)
              try {
                (de.nodeType === 9
                  ? de.body
                  : de.nodeName === 'HTML'
                    ? de.ownerDocument.body
                    : de
                ).removeChild(n.stateNode);
              } catch (r) {
                K(n, t, r);
              }
            else
              try {
                de.removeChild(n.stateNode);
              } catch (r) {
                K(n, t, r);
              }
          break;
        case 18:
          de !== null &&
            (qe
              ? ((e = de),
                Vg(
                  e.nodeType === 9
                    ? e.body
                    : e.nodeName === 'HTML'
                      ? e.ownerDocument.body
                      : e,
                  n.stateNode,
                ),
                zo(e))
              : Vg(de, n.stateNode));
          break;
        case 4:
          ((a = de),
            (o = qe),
            (de = n.stateNode.containerInfo),
            (qe = !0),
            Kt(e, t, n),
            (de = a),
            (qe = o));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          (Jn(2, n, t), Me || Jn(4, n, t), Kt(e, t, n));
          break;
        case 1:
          (Me ||
            (zt(n, t),
            (a = n.stateNode),
            typeof a.componentWillUnmount == 'function' && Xv(n, t, a)),
            Kt(e, t, n));
          break;
        case 21:
          Kt(e, t, n);
          break;
        case 22:
          ((Me = (a = Me) || n.memoizedState !== null), Kt(e, t, n), (Me = a));
          break;
        default:
          Kt(e, t, n);
      }
    }
    function ab(e, t) {
      if (
        t.memoizedState === null &&
        ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
      ) {
        e = e.dehydrated;
        try {
          zo(e);
        } catch (n) {
          K(t, t.return, n);
        }
      }
    }
    function ob(e, t) {
      if (
        t.memoizedState === null &&
        ((e = t.alternate),
        e !== null &&
          ((e = e.memoizedState),
          e !== null && ((e = e.dehydrated), e !== null)))
      )
        try {
          zo(e);
        } catch (n) {
          K(t, t.return, n);
        }
    }
    function eE(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return (t === null && (t = e.stateNode = new Ag()), t);
        case 22:
          return (
            (e = e.stateNode),
            (t = e._retryCache),
            t === null && (t = e._retryCache = new Ag()),
            t
          );
        default:
          throw Error(M(435, e.tag));
      }
    }
    function ds(e, t) {
      var n = eE(e);
      t.forEach(function (a) {
        if (!n.has(a)) {
          n.add(a);
          var o = cE.bind(null, e, a);
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
                if (na(s.type)) {
                  ((de = s.stateNode), (qe = !1));
                  break e;
                }
                break;
              case 5:
                ((de = s.stateNode), (qe = !1));
                break e;
              case 3:
              case 4:
                ((de = s.stateNode.containerInfo), (qe = !0));
                break e;
            }
            s = s.return;
          }
          if (de === null) throw Error(M(160));
          (nb(r, i, o),
            (de = null),
            (qe = !1),
            (r = o.alternate),
            r !== null && (r.return = null),
            (o.return = null));
        }
      if (t.subtreeFlags & 13886)
        for (t = t.child; t !== null; ) (rb(t, e), (t = t.sibling));
    }
    var Ot = null;
    function rb(e, t) {
      var n = e.alternate,
        a = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Fe(t, e),
            Pe(e),
            a & 4 && (Jn(3, e, e.return), di(3, e), Jn(5, e, e.return)));
          break;
        case 1:
          (Fe(t, e),
            Pe(e),
            a & 512 && (Me || n === null || zt(n, n.return)),
            a & 64 &&
              nn &&
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
            a & 512 && (Me || n === null || zt(n, n.return)),
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
                            r[li] ||
                            r[He] ||
                            r.namespaceURI === 'http://www.w3.org/2000/svg' ||
                            r.hasAttribute('itemprop')) &&
                            ((r = o.createElement(a)),
                            o.head.insertBefore(
                              r,
                              o.querySelector('head > title'),
                            )),
                          Ye(r, a, n),
                          (r[He] = e),
                          $e(r),
                          (a = r));
                        break e;
                      case 'link':
                        var i = ey('link', 'href', o).get(a + (n.href || ''));
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
                          Ye(r, a, n),
                          o.head.appendChild(r));
                        break;
                      case 'meta':
                        if (
                          (i = ey('meta', 'content', o).get(
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
                          Ye(r, a, n),
                          o.head.appendChild(r));
                        break;
                      default:
                        throw Error(M(468, a));
                    }
                    ((r[He] = e), $e(r), (a = r));
                  }
                  e.stateNode = a;
                } else ty(o, e.type, e.stateNode);
              else e.stateNode = Jg(o, a, e.memoizedProps);
            else
              r !== a
                ? (r === null
                    ? n.stateNode !== null &&
                      ((n = n.stateNode), n.parentNode.removeChild(n))
                    : r.count--,
                  a === null
                    ? ty(o, e.type, e.stateNode)
                    : Jg(o, a, e.memoizedProps))
                : a === null &&
                  e.stateNode !== null &&
                  Vu(e, e.memoizedProps, n.memoizedProps);
          }
          break;
        case 27:
          (Fe(t, e),
            Pe(e),
            a & 512 && (Me || n === null || zt(n, n.return)),
            n !== null && a & 4 && Vu(e, e.memoizedProps, n.memoizedProps));
          break;
        case 5:
          if (
            (Fe(t, e),
            Pe(e),
            a & 512 && (Me || n === null || zt(n, n.return)),
            e.flags & 32)
          ) {
            o = e.stateNode;
            try {
              Ao(o, '');
            } catch (v) {
              K(e, e.return, v);
            }
          }
          (a & 4 &&
            e.stateNode != null &&
            ((o = e.memoizedProps), Vu(e, o, n !== null ? n.memoizedProps : o)),
            a & 1024 && (Gu = !0));
          break;
        case 6:
          if ((Fe(t, e), Pe(e), a & 4)) {
            if (e.stateNode === null) throw Error(M(162));
            ((a = e.memoizedProps), (n = e.stateNode));
            try {
              n.nodeValue = a;
            } catch (v) {
              K(e, e.return, v);
            }
          }
          break;
        case 3:
          if (
            (($s = null),
            (o = Ot),
            (Ot = al(t.containerInfo)),
            Fe(t, e),
            (Ot = o),
            Pe(e),
            a & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              zo(t.containerInfo);
            } catch (v) {
              K(e, e.return, v);
            }
          Gu && ((Gu = !1), ib(e));
          break;
        case 4:
          ((a = Ot),
            (Ot = al(e.stateNode.containerInfo)),
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
              a !== null && ((e.updateQueue = null), ds(e, a))));
          break;
        case 13:
          (Fe(t, e),
            Pe(e),
            e.child.flags & 8192 &&
              (e.memoizedState !== null) !=
                (n !== null && n.memoizedState !== null) &&
              (bl = ot()),
            a & 4 &&
              ((a = e.updateQueue),
              a !== null && ((e.updateQueue = null), ds(e, a))));
          break;
        case 22:
          o = e.memoizedState !== null;
          var l = n !== null && n.memoizedState !== null,
            c = nn,
            u = Me;
          if (
            ((nn = c || o),
            (Me = u || l),
            Fe(t, e),
            (Me = u),
            (nn = c),
            Pe(e),
            a & 8192)
          )
            e: for (
              t = e.stateNode,
                t._visibility = o ? t._visibility & -2 : t._visibility | 1,
                o && (n === null || l || nn || Me || va(e)),
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
                    K(l, l.return, v);
                  }
                }
              } else if (t.tag === 6) {
                if (n === null) {
                  l = t;
                  try {
                    l.stateNode.nodeValue = o ? '' : l.memoizedProps;
                  } catch (v) {
                    K(l, l.return, v);
                  }
                }
              } else if (t.tag === 18) {
                if (n === null) {
                  l = t;
                  try {
                    var m = l.stateNode;
                    o ? jg(m, !0) : jg(l.stateNode, !1);
                  } catch (v) {
                    K(l, l.return, v);
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
              n !== null && ((a.retryQueue = null), ds(e, n))));
          break;
        case 19:
          (Fe(t, e),
            Pe(e),
            a & 4 &&
              ((a = e.updateQueue),
              a !== null && ((e.updateQueue = null), ds(e, a))));
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
            if (Kv(a)) {
              n = a;
              break;
            }
            a = a.return;
          }
          if (n == null) throw Error(M(160));
          switch (n.tag) {
            case 27:
              var o = n.stateNode,
                r = ju(e);
              Gs(e, r, o);
              break;
            case 5:
              var i = n.stateNode;
              n.flags & 32 && (Ao(i, ''), (n.flags &= -33));
              var s = ju(e);
              Gs(e, s, i);
              break;
            case 3:
            case 4:
              var l = n.stateNode.containerInfo,
                c = ju(e);
              Yf(e, c, l);
              break;
            default:
              throw Error(M(161));
          }
        } catch (u) {
          K(e, e.return, u);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function ib(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e;
          (ib(t),
            t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
            (e = e.sibling));
        }
    }
    function Jt(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; )
          (eb(e, t.alternate, t), (t = t.sibling));
    }
    function va(e) {
      for (e = e.child; e !== null; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            (Jn(4, t, t.return), va(t));
            break;
          case 1:
            zt(t, t.return);
            var n = t.stateNode;
            (typeof n.componentWillUnmount == 'function' && Xv(t, t.return, n),
              va(t));
            break;
          case 27:
            Wr(t.stateNode);
          case 26:
          case 5:
            (zt(t, t.return), va(t));
            break;
          case 22:
            t.memoizedState === null && va(t);
            break;
          case 30:
            va(t);
            break;
          default:
            va(t);
        }
        e = e.sibling;
      }
    }
    function en(e, t, n) {
      for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
        var a = t.alternate,
          o = e,
          r = t,
          i = r.flags;
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            (en(o, r, n), di(4, r));
            break;
          case 1:
            if (
              (en(o, r, n),
              (a = r),
              (o = a.stateNode),
              typeof o.componentDidMount == 'function')
            )
              try {
                o.componentDidMount();
              } catch (c) {
                K(a, a.return, c);
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
                    av(l[o], s);
              } catch (c) {
                K(a, a.return, c);
              }
            }
            (n && i & 64 && Gv(r), _r(r, r.return));
            break;
          case 27:
            Jv(r);
          case 26:
          case 5:
            (en(o, r, n), n && a === null && i & 4 && Qv(r), _r(r, r.return));
            break;
          case 12:
            en(o, r, n);
            break;
          case 31:
            (en(o, r, n), n && i & 4 && ab(o, r));
            break;
          case 13:
            (en(o, r, n), n && i & 4 && ob(o, r));
            break;
          case 22:
            (r.memoizedState === null && en(o, r, n), _r(r, r.return));
            break;
          case 30:
            break;
          default:
            en(o, r, n);
        }
        t = t.sibling;
      }
    }
    function kd(e, t) {
      var n = null;
      (e !== null &&
        e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (n = e.memoizedState.cachePool.pool),
        (e = null),
        t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (e = t.memoizedState.cachePool.pool),
        e !== n && (e != null && e.refCount++, n != null && ui(n)));
    }
    function Yd(e, t) {
      ((e = null),
        t.alternate !== null && (e = t.alternate.memoizedState.cache),
        (t = t.memoizedState.cache),
        t !== e && (t.refCount++, e != null && ui(e)));
    }
    function Et(e, t, n, a) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) (sb(e, t, n, a), (t = t.sibling));
    }
    function sb(e, t, n, a) {
      var o = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          (Et(e, t, n, a), o & 2048 && di(9, t));
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
              t !== e && (t.refCount++, e != null && ui(e))));
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
              K(t, t.return, l);
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
                : zr(e, t)
              : r._visibility & 2
                ? Et(e, t, n, a)
                : ((r._visibility |= 2),
                  lo(e, t, n, a, (t.subtreeFlags & 10256) !== 0 || !1)),
            o & 2048 && kd(i, t));
          break;
        case 24:
          (Et(e, t, n, a), o & 2048 && Yd(t.alternate, t));
          break;
        default:
          Et(e, t, n, a);
      }
    }
    function lo(e, t, n, a, o) {
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
            (lo(r, i, s, l, o), di(8, i));
            break;
          case 23:
            break;
          case 22:
            var u = i.stateNode;
            (i.memoizedState !== null
              ? u._visibility & 2
                ? lo(r, i, s, l, o)
                : zr(r, i)
              : ((u._visibility |= 2), lo(r, i, s, l, o)),
              o && c & 2048 && kd(i.alternate, i));
            break;
          case 24:
            (lo(r, i, s, l, o), o && c & 2048 && Yd(i.alternate, i));
            break;
          default:
            lo(r, i, s, l, o);
        }
        t = t.sibling;
      }
    }
    function zr(e, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var n = e,
            a = t,
            o = a.flags;
          switch (a.tag) {
            case 22:
              (zr(n, a), o & 2048 && kd(a.alternate, a));
              break;
            case 24:
              (zr(n, a), o & 2048 && Yd(a.alternate, a));
              break;
            default:
              zr(n, a);
          }
          t = t.sibling;
        }
    }
    var $r = 8192;
    function so(e, t, n) {
      if (e.subtreeFlags & $r)
        for (e = e.child; e !== null; ) (lb(e, t, n), (e = e.sibling));
    }
    function lb(e, t, n) {
      switch (e.tag) {
        case 26:
          (so(e, t, n),
            e.flags & $r &&
              e.memoizedState !== null &&
              BE(n, Ot, e.memoizedState, e.memoizedProps));
          break;
        case 5:
          so(e, t, n);
          break;
        case 3:
        case 4:
          var a = Ot;
          ((Ot = al(e.stateNode.containerInfo)), so(e, t, n), (Ot = a));
          break;
        case 22:
          e.memoizedState === null &&
            ((a = e.alternate),
            a !== null && a.memoizedState !== null
              ? ((a = $r), ($r = 16777216), so(e, t, n), ($r = a))
              : so(e, t, n));
          break;
        default:
          so(e, t, n);
      }
    }
    function cb(e) {
      var t = e.alternate;
      if (t !== null && ((e = t.child), e !== null)) {
        t.child = null;
        do ((t = e.sibling), (e.sibling = null), (e = t));
        while (e !== null);
      }
    }
    function Mr(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var a = t[n];
            ((Re = a), fb(a, e));
          }
        cb(e);
      }
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; ) (ub(e), (e = e.sibling));
    }
    function ub(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          (Mr(e), e.flags & 2048 && Jn(9, e, e.return));
          break;
        case 3:
          Mr(e);
          break;
        case 12:
          Mr(e);
          break;
        case 22:
          var t = e.stateNode;
          e.memoizedState !== null &&
          t._visibility & 2 &&
          (e.return === null || e.return.tag !== 13)
            ? ((t._visibility &= -3), ws(e))
            : Mr(e);
          break;
        default:
          Mr(e);
      }
    }
    function ws(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var a = t[n];
            ((Re = a), fb(a, e));
          }
        cb(e);
      }
      for (e = e.child; e !== null; ) {
        switch (((t = e), t.tag)) {
          case 0:
          case 11:
          case 15:
            (Jn(8, t, t.return), ws(t));
            break;
          case 22:
            ((n = t.stateNode),
              n._visibility & 2 && ((n._visibility &= -3), ws(t)));
            break;
          default:
            ws(t);
        }
        e = e.sibling;
      }
    }
    function fb(e, t) {
      for (; Re !== null; ) {
        var n = Re;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Jn(8, n, t);
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
            ui(n.memoizedState.cache);
        }
        if (((a = n.child), a !== null)) ((a.return = n), (Re = a));
        else
          e: for (n = e; Re !== null; ) {
            a = Re;
            var o = a.sibling,
              r = a.return;
            if ((tb(a), a === n)) {
              Re = null;
              break e;
            }
            if (o !== null) {
              ((o.return = r), (Re = o));
              break e;
            }
            Re = r;
          }
      }
    }
    var tE = {
        getCacheForType: function (e) {
          var t = ke(Ee),
            n = t.data.get(e);
          return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
        },
        cacheSignal: function () {
          return ke(Ee).controller.signal;
        },
      },
      nE = typeof WeakMap == 'function' ? WeakMap : Map,
      q = 0,
      ne = null,
      z = null,
      L = 0,
      Q = 0,
      et = null,
      _n = !1,
      Po = !1,
      Bd = !1,
      hn = 0,
      ge = 0,
      ea = 0,
      Ma = 0,
      _d = 0,
      at = 0,
      ko = 0,
      Lr = null,
      Ve = null,
      Bf = !1,
      bl = 0,
      db = 0,
      Xs = 1 / 0,
      Qs = null,
      qn = null,
      Ne = 0,
      Vn = null,
      Yo = null,
      cn = 0,
      _f = 0,
      zf = null,
      mb = null,
      Zr = 0,
      Lf = null;
    function st() {
      return (q & 2) !== 0 && L !== 0 ? L & -L : H.T !== null ? Ld() : Dy();
    }
    function hb() {
      if (at === 0)
        if ((L & 536870912) === 0 || Z) {
          var e = ns;
          ((ns <<= 1), (ns & 3932160) === 0 && (ns = 262144), (at = e));
        } else at = 536870912;
      return ((e = ct.current), e !== null && (e.flags |= 32), at);
    }
    function je(e, t, n) {
      (((e === ne && (Q === 2 || Q === 9)) || e.cancelPendingCommit !== null) &&
        (Bo(e, 0), zn(e, L, at, !1)),
        si(e, n),
        ((q & 2) === 0 || e !== ne) &&
          (e === ne &&
            ((q & 2) === 0 && (Ma |= n), ge === 4 && zn(e, L, at, !1)),
          Wt(e)));
    }
    function pb(e, t, n) {
      if ((q & 6) !== 0) throw Error(M(327));
      var a = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || ii(e, t),
        o = a ? rE(e, t) : Xu(e, t, !0),
        r = a;
      do {
        if (o === 0) {
          Po && !a && zn(e, t, 0, !1);
          break;
        } else {
          if (((n = e.current.alternate), r && !aE(n))) {
            ((o = Xu(e, t, !1)), (r = !1));
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
                o = Lr;
                var l = s.current.memoizedState.isDehydrated;
                if (
                  (l && (Bo(s, i).flags |= 256), (i = Xu(s, i, !1)), i !== 2)
                ) {
                  if (Bd && !l) {
                    ((s.errorRecoveryDisabledLanes |= r), (Ma |= r), (o = 4));
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
            (Bo(e, 0), zn(e, t, 0, !0));
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
                zn(a, t, at, !_n);
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
            if ((t & 62914560) === t && ((o = bl + 300 - ot()), 10 < o)) {
              if ((zn(a, t, at, !_n), ll(a, 0, !0) !== 0)) break e;
              ((cn = t),
                (a.timeoutHandle = Ub(
                  Ig.bind(
                    null,
                    a,
                    n,
                    Ve,
                    Qs,
                    Bf,
                    t,
                    at,
                    Ma,
                    ko,
                    _n,
                    r,
                    'Throttled',
                    -0,
                    0,
                  ),
                  o,
                )));
              break e;
            }
            Ig(a, n, Ve, Qs, Bf, t, at, Ma, ko, _n, r, null, -0, 0);
          }
        }
        break;
      } while (!0);
      Wt(e);
    }
    function Ig(e, t, n, a, o, r, i, s, l, c, u, d, f, m) {
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
          unsuspend: on,
        }),
          lb(t, r, d));
        var v =
          (r & 62914560) === r
            ? bl - ot()
            : (r & 4194048) === r
              ? db - ot()
              : 0;
        if (((v = _E(d, v)), v !== null)) {
          ((cn = r),
            (e.cancelPendingCommit = v(
              Ug.bind(null, e, t, r, n, a, o, i, s, l, u, d, null, f, m),
            )),
            zn(e, r, i, !c));
          return;
        }
      }
      Ug(e, t, r, n, a, o, i, s, l);
    }
    function aE(e) {
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
    function zn(e, t, n, a) {
      ((t &= ~_d),
        (t &= ~Ma),
        (e.suspendedLanes |= t),
        (e.pingedLanes &= ~t),
        a && (e.warmLanes |= t),
        (a = e.expirationTimes));
      for (var o = t; 0 < o; ) {
        var r = 31 - it(o),
          i = 1 << r;
        ((a[r] = -1), (o &= ~i));
      }
      n !== 0 && by(e, n, t);
    }
    function Sl() {
      return (q & 6) === 0 ? (mi(0, !1), !1) : !0;
    }
    function zd() {
      if (z !== null) {
        if (Q === 0) var e = z.return;
        else ((e = z), (rn = Ia = null), Od(e), (No = null), (Xr = 0), (e = z));
        for (; e !== null; ) (jv(e.alternate, e), (e = e.return));
        z = null;
      }
    }
    function Bo(e, t) {
      var n = e.timeoutHandle;
      (n !== -1 && ((e.timeoutHandle = -1), TE(n)),
        (n = e.cancelPendingCommit),
        n !== null && ((e.cancelPendingCommit = null), n()),
        (cn = 0),
        zd(),
        (ne = e),
        (z = n = sn(e.current, null)),
        (L = t),
        (Q = 0),
        (et = null),
        (_n = !1),
        (Po = ii(e, t)),
        (Bd = !1),
        (ko = at = _d = Ma = ea = ge = 0),
        (Ve = Lr = null),
        (Bf = !1),
        (t & 8) !== 0 && (t |= t & 32));
      var a = e.entangledLanes;
      if (a !== 0)
        for (e = e.entanglements, a &= t; 0 < a; ) {
          var o = 31 - it(a),
            r = 1 << o;
          ((t |= e[o]), (a &= ~r));
        }
      return ((hn = t), dl(), n);
    }
    function gb(e, t) {
      ((Y = null),
        (H.H = Kr),
        t === Fo || t === hl
          ? ((t = fg()), (Q = 3))
          : t === vd
            ? ((t = fg()), (Q = 4))
            : (Q =
                t === Hd
                  ? 8
                  : t !== null &&
                      typeof t == 'object' &&
                      typeof t.then == 'function'
                    ? 6
                    : 1),
        (et = t),
        z === null && ((ge = 1), Vs(e, vt(t, e.current))));
    }
    function yb() {
      var e = ct.current;
      return e === null
        ? !0
        : (L & 4194048) === L
          ? St === null
          : (L & 62914560) === L || (L & 536870912) !== 0
            ? e === St
            : !1;
    }
    function vb() {
      var e = H.H;
      return ((H.H = Kr), e === null ? Kr : e);
    }
    function bb() {
      var e = H.A;
      return ((H.A = tE), e);
    }
    function Ks() {
      ((ge = 4),
        _n || ((L & 4194048) !== L && ct.current !== null) || (Po = !0),
        ((ea & 134217727) === 0 && (Ma & 134217727) === 0) ||
          ne === null ||
          zn(ne, L, at, !1));
    }
    function Xu(e, t, n) {
      var a = q;
      q |= 2;
      var o = vb(),
        r = bb();
      ((ne !== e || L !== t) && ((Qs = null), Bo(e, t)), (t = !1));
      var i = ge;
      e: do
        try {
          if (Q !== 0 && z !== null) {
            var s = z,
              l = et;
            switch (Q) {
              case 8:
                (zd(), (i = 6));
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                ct.current === null && (t = !0);
                var c = Q;
                if (((Q = 0), (et = null), Do(e, s, l, c), n && Po)) {
                  i = 0;
                  break e;
                }
                break;
              default:
                ((c = Q), (Q = 0), (et = null), Do(e, s, l, c));
            }
          }
          (oE(), (i = ge));
          break;
        } catch (u) {
          gb(e, u);
        }
      while (!0);
      return (
        t && e.shellSuspendCounter++,
        (rn = Ia = null),
        (q = a),
        (H.H = o),
        (H.A = r),
        z === null && ((ne = null), (L = 0), dl()),
        i
      );
    }
    function oE() {
      for (; z !== null; ) Sb(z);
    }
    function rE(e, t) {
      var n = q;
      q |= 2;
      var a = vb(),
        o = bb();
      ne !== e || L !== t
        ? ((Qs = null), (Xs = ot() + 500), Bo(e, t))
        : (Po = ii(e, t));
      e: do
        try {
          if (Q !== 0 && z !== null) {
            t = z;
            var r = et;
            t: switch (Q) {
              case 1:
                ((Q = 0), (et = null), Do(e, t, r, 1));
                break;
              case 2:
              case 9:
                if (ug(r)) {
                  ((Q = 0), (et = null), Hg(t));
                  break;
                }
                ((t = function () {
                  ((Q !== 2 && Q !== 9) || ne !== e || (Q = 7), Wt(e));
                }),
                  r.then(t, t));
                break e;
              case 3:
                Q = 7;
                break e;
              case 4:
                Q = 5;
                break e;
              case 7:
                ug(r)
                  ? ((Q = 0), (et = null), Hg(t))
                  : ((Q = 0), (et = null), Do(e, t, r, 7));
                break;
              case 5:
                var i = null;
                switch (z.tag) {
                  case 26:
                    i = z.memoizedState;
                  case 5:
                  case 27:
                    var s = z;
                    if (i ? zb(i) : s.stateNode.complete) {
                      ((Q = 0), (et = null));
                      var l = s.sibling;
                      if (l !== null) z = l;
                      else {
                        var c = s.return;
                        c !== null ? ((z = c), Tl(c)) : (z = null);
                      }
                      break t;
                    }
                }
                ((Q = 0), (et = null), Do(e, t, r, 5));
                break;
              case 6:
                ((Q = 0), (et = null), Do(e, t, r, 6));
                break;
              case 8:
                (zd(), (ge = 6));
                break e;
              default:
                throw Error(M(462));
            }
          }
          iE();
          break;
        } catch (u) {
          gb(e, u);
        }
      while (!0);
      return (
        (rn = Ia = null),
        (H.H = a),
        (H.A = o),
        (q = n),
        z !== null ? 0 : ((ne = null), (L = 0), dl(), ge)
      );
    }
    function iE() {
      for (; z !== null && !RD(); ) Sb(z);
    }
    function Sb(e) {
      var t = Vv(e.alternate, e, hn);
      ((e.memoizedProps = e.pendingProps), t === null ? Tl(e) : (z = t));
    }
    function Hg(e) {
      var t = e,
        n = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = Ng(n, t, t.pendingProps, t.type, void 0, L);
          break;
        case 11:
          t = Ng(n, t, t.pendingProps, t.type.render, t.ref, L);
          break;
        case 5:
          Od(t);
        default:
          (jv(n, t), (t = z = jy(t, hn)), (t = Vv(n, t, hn)));
      }
      ((e.memoizedProps = e.pendingProps), t === null ? Tl(e) : (z = t));
    }
    function Do(e, t, n, a) {
      ((rn = Ia = null), Od(t), (No = null), (Xr = 0));
      var o = t.return;
      try {
        if (jM(e, o, t, n, L)) {
          ((ge = 1), Vs(e, vt(n, e.current)), (z = null));
          return;
        }
      } catch (r) {
        if (o !== null) throw ((z = o), r);
        ((ge = 1), Vs(e, vt(n, e.current)), (z = null));
        return;
      }
      t.flags & 32768
        ? (Z || a === 1
            ? (e = !0)
            : Po || (L & 536870912) !== 0
              ? (e = !1)
              : ((_n = e = !0),
                (a === 2 || a === 9 || a === 3 || a === 6) &&
                  ((a = ct.current),
                  a !== null && a.tag === 13 && (a.flags |= 16384))),
          Tb(t, e))
        : Tl(t);
    }
    function Tl(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          Tb(t, _n);
          return;
        }
        e = t.return;
        var n = QM(t.alternate, t, hn);
        if (n !== null) {
          z = n;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          z = t;
          return;
        }
        z = t = e;
      } while (t !== null);
      ge === 0 && (ge = 5);
    }
    function Tb(e, t) {
      do {
        var n = KM(e.alternate, e);
        if (n !== null) {
          ((n.flags &= 32767), (z = n));
          return;
        }
        if (
          ((n = e.return),
          n !== null &&
            ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
          !t && ((e = e.sibling), e !== null))
        ) {
          z = e;
          return;
        }
        z = e = n;
      } while (e !== null);
      ((ge = 6), (z = null));
    }
    function Ug(e, t, n, a, o, r, i, s, l) {
      e.cancelPendingCommit = null;
      do Dl();
      while (Ne !== 0);
      if ((q & 6) !== 0) throw Error(M(327));
      if (t !== null) {
        if (t === e.current) throw Error(M(177));
        if (
          ((r = t.lanes | t.childLanes),
          (r |= fd),
          _D(e, n, r, i, s, l),
          e === ne && ((z = ne = null), (L = 0)),
          (Yo = t),
          (Vn = e),
          (cn = n),
          (_f = r),
          (zf = o),
          (mb = a),
          (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
            ? ((e.callbackNode = null),
              (e.callbackPriority = 0),
              uE(ks, function () {
                return (Cb(), null);
              }))
            : ((e.callbackNode = null), (e.callbackPriority = 0)),
          (a = (t.flags & 13878) !== 0),
          (t.subtreeFlags & 13878) !== 0 || a)
        ) {
          ((a = H.T), (H.T = null), (o = V.p), (V.p = 2), (i = q), (q |= 4));
          try {
            JM(e, t, n);
          } finally {
            ((q = i), (V.p = o), (H.T = a));
          }
        }
        ((Ne = 1), Db(), Mb(), Eb());
      }
    }
    function Db() {
      if (Ne === 1) {
        Ne = 0;
        var e = Vn,
          t = Yo,
          n = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || n) {
          ((n = H.T), (H.T = null));
          var a = V.p;
          V.p = 2;
          var o = q;
          q |= 4;
          try {
            rb(t, e);
            var r = Pf,
              i = zy(e.containerInfo),
              s = r.focusedElem,
              l = r.selectionRange;
            if (
              i !== s &&
              s &&
              s.ownerDocument &&
              _y(s.ownerDocument.documentElement, s)
            ) {
              if (l !== null && ud(s)) {
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
                      g = Math.min(l.start, v),
                      E = l.end === void 0 ? g : Math.min(l.end, v);
                    !m.extend && g > E && ((i = E), (E = g), (g = i));
                    var p = ag(s, g),
                      h = ag(s, E);
                    if (
                      p &&
                      h &&
                      (m.rangeCount !== 1 ||
                        m.anchorNode !== p.node ||
                        m.anchorOffset !== p.offset ||
                        m.focusNode !== h.node ||
                        m.focusOffset !== h.offset)
                    ) {
                      var y = d.createRange();
                      (y.setStart(p.node, p.offset),
                        m.removeAllRanges(),
                        g > E
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
            ((il = !!Ff), (Pf = Ff = null));
          } finally {
            ((q = o), (V.p = a), (H.T = n));
          }
        }
        ((e.current = t), (Ne = 2));
      }
    }
    function Mb() {
      if (Ne === 2) {
        Ne = 0;
        var e = Vn,
          t = Yo,
          n = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || n) {
          ((n = H.T), (H.T = null));
          var a = V.p;
          V.p = 2;
          var o = q;
          q |= 4;
          try {
            eb(e, t.alternate, t);
          } finally {
            ((q = o), (V.p = a), (H.T = n));
          }
        }
        Ne = 3;
      }
    }
    function Eb() {
      if (Ne === 4 || Ne === 3) {
        ((Ne = 0), $D());
        var e = Vn,
          t = Yo,
          n = cn,
          a = mb;
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? (Ne = 5)
          : ((Ne = 0), (Yo = Vn = null), Ob(e, e.pendingLanes));
        var o = e.pendingLanes;
        if (
          (o === 0 && (qn = null),
          ad(n),
          (t = t.stateNode),
          rt && typeof rt.onCommitFiberRoot == 'function')
        )
          try {
            rt.onCommitFiberRoot(
              ri,
              t,
              void 0,
              (t.current.flags & 128) === 128,
            );
          } catch {}
        if (a !== null) {
          ((t = H.T), (o = V.p), (V.p = 2), (H.T = null));
          try {
            for (var r = e.onRecoverableError, i = 0; i < a.length; i++) {
              var s = a[i];
              r(s.value, { componentStack: s.stack });
            }
          } finally {
            ((H.T = t), (V.p = o));
          }
        }
        ((cn & 3) !== 0 && Dl(),
          Wt(e),
          (o = e.pendingLanes),
          (n & 261930) !== 0 && (o & 42) !== 0
            ? e === Lf
              ? Zr++
              : ((Zr = 0), (Lf = e))
            : (Zr = 0),
          mi(0, !1));
      }
    }
    function Ob(e, t) {
      (e.pooledCacheLanes &= t) === 0 &&
        ((t = e.pooledCache), t != null && ((e.pooledCache = null), ui(t)));
    }
    function Dl() {
      return (Db(), Mb(), Eb(), Cb());
    }
    function Cb() {
      if (Ne !== 5) return !1;
      var e = Vn,
        t = _f;
      _f = 0;
      var n = ad(cn),
        a = H.T,
        o = V.p;
      try {
        ((V.p = 32 > n ? 32 : n), (H.T = null), (n = zf), (zf = null));
        var r = Vn,
          i = cn;
        if (((Ne = 0), (Yo = Vn = null), (cn = 0), (q & 6) !== 0))
          throw Error(M(331));
        var s = q;
        if (
          ((q |= 4),
          ub(r.current),
          sb(r, r.current, i, n),
          (q = s),
          mi(0, !1),
          rt && typeof rt.onPostCommitFiberRoot == 'function')
        )
          try {
            rt.onPostCommitFiberRoot(ri, r);
          } catch {}
        return !0;
      } finally {
        ((V.p = o), (H.T = a), Ob(e, t));
      }
    }
    function kg(e, t, n) {
      ((t = vt(n, t)),
        (t = Hf(e.stateNode, t, 2)),
        (e = Pn(e, t, 2)),
        e !== null && (si(e, 2), Wt(e)));
    }
    function K(e, t, n) {
      if (e.tag === 3) kg(e, e, n);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            kg(t, e, n);
            break;
          } else if (t.tag === 1) {
            var a = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == 'function' ||
              (typeof a.componentDidCatch == 'function' &&
                (qn === null || !qn.has(a)))
            ) {
              ((e = vt(n, e)),
                (n = Lv(2)),
                (a = Pn(t, n, 2)),
                a !== null && (Zv(n, a, t, e), si(a, 2), Wt(a)));
              break;
            }
          }
          t = t.return;
        }
    }
    function Qu(e, t, n) {
      var a = e.pingCache;
      if (a === null) {
        a = e.pingCache = new nE();
        var o = new Set();
        a.set(t, o);
      } else ((o = a.get(t)), o === void 0 && ((o = new Set()), a.set(t, o)));
      o.has(n) ||
        ((Bd = !0), o.add(n), (e = sE.bind(null, e, t, n)), t.then(e, e));
    }
    function sE(e, t, n) {
      var a = e.pingCache;
      (a !== null && a.delete(t),
        (e.pingedLanes |= e.suspendedLanes & n),
        (e.warmLanes &= ~n),
        ne === e &&
          (L & n) === n &&
          (ge === 4 || (ge === 3 && (L & 62914560) === L && 300 > ot() - bl)
            ? (q & 2) === 0 && Bo(e, 0)
            : (_d |= n),
          ko === L && (ko = 0)),
        Wt(e));
    }
    function Nb(e, t) {
      (t === 0 && (t = vy()), (e = Aa(e, t)), e !== null && (si(e, t), Wt(e)));
    }
    function lE(e) {
      var t = e.memoizedState,
        n = 0;
      (t !== null && (n = t.retryLane), Nb(e, n));
    }
    function cE(e, t) {
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
      (a !== null && a.delete(t), Nb(e, n));
    }
    function uE(e, t) {
      return td(e, t);
    }
    var Js = null,
      co = null,
      Zf = !1,
      el = !1,
      Ku = !1,
      Ln = 0;
    function Wt(e) {
      (e !== co &&
        e.next === null &&
        (co === null ? (Js = co = e) : (co = co.next = e)),
        (el = !0),
        Zf || ((Zf = !0), dE()));
    }
    function mi(e, t) {
      if (!Ku && el) {
        Ku = !0;
        do
          for (var n = !1, a = Js; a !== null; ) {
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
                r !== 0 && ((n = !0), Yg(a, r));
              } else
                ((r = L),
                  (r = ll(
                    a,
                    a === ne ? r : 0,
                    a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
                  )),
                  (r & 3) === 0 || ii(a, r) || ((n = !0), Yg(a, r)));
            a = a.next;
          }
        while (n);
        Ku = !1;
      }
    }
    function fE() {
      wb();
    }
    function wb() {
      el = Zf = !1;
      var e = 0;
      Ln !== 0 && SE() && (e = Ln);
      for (var t = ot(), n = null, a = Js; a !== null; ) {
        var o = a.next,
          r = Rb(a, t);
        (r === 0
          ? ((a.next = null),
            n === null ? (Js = o) : (n.next = o),
            o === null && (co = n))
          : ((n = a), (e !== 0 || (r & 3) !== 0) && (el = !0)),
          (a = o));
      }
      ((Ne !== 0 && Ne !== 5) || mi(e, !1), Ln !== 0 && (Ln = 0));
    }
    function Rb(e, t) {
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
          ? ((s & n) === 0 || (s & a) !== 0) && (o[i] = BD(s, t))
          : l <= t && (e.expiredLanes |= s),
          (r &= ~s));
      }
      if (
        ((t = ne),
        (n = L),
        (n = ll(
          e,
          e === t ? n : 0,
          e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
        )),
        (a = e.callbackNode),
        n === 0 ||
          (e === t && (Q === 2 || Q === 9)) ||
          e.cancelPendingCommit !== null)
      )
        return (
          a !== null && a !== null && Nu(a),
          (e.callbackNode = null),
          (e.callbackPriority = 0)
        );
      if ((n & 3) === 0 || ii(e, n)) {
        if (((t = n & -n), t === e.callbackPriority)) return t;
        switch ((a !== null && Nu(a), ad(n))) {
          case 2:
          case 8:
            n = gy;
            break;
          case 32:
            n = ks;
            break;
          case 268435456:
            n = yy;
            break;
          default:
            n = ks;
        }
        return (
          (a = $b.bind(null, e)),
          (n = td(n, a)),
          (e.callbackPriority = t),
          (e.callbackNode = n),
          t
        );
      }
      return (
        a !== null && a !== null && Nu(a),
        (e.callbackPriority = 2),
        (e.callbackNode = null),
        2
      );
    }
    function $b(e, t) {
      if (Ne !== 0 && Ne !== 5)
        return ((e.callbackNode = null), (e.callbackPriority = 0), null);
      var n = e.callbackNode;
      if (Dl() && e.callbackNode !== n) return null;
      var a = L;
      return (
        (a = ll(
          e,
          e === ne ? a : 0,
          e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
        )),
        a === 0
          ? null
          : (pb(e, a, t),
            Rb(e, ot()),
            e.callbackNode != null && e.callbackNode === n
              ? $b.bind(null, e)
              : null)
      );
    }
    function Yg(e, t) {
      if (Dl()) return null;
      pb(e, t, !0);
    }
    function dE() {
      DE(function () {
        (q & 6) !== 0 ? td(py, fE) : wb();
      });
    }
    function Ld() {
      if (Ln === 0) {
        var e = Io;
        (e === 0 && ((e = ts), (ts <<= 1), (ts & 261888) === 0 && (ts = 256)),
          (Ln = e));
      }
      return Ln;
    }
    function Bg(e) {
      return e == null || typeof e == 'symbol' || typeof e == 'boolean'
        ? null
        : typeof e == 'function'
          ? e
          : bs('' + e);
    }
    function _g(e, t) {
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
    function mE(e, t, n, a, o) {
      if (t === 'submit' && n && n.stateNode === o) {
        var r = Bg((o[Ge] || null).action),
          i = a.submitter;
        i &&
          ((t = (t = i[Ge] || null)
            ? Bg(t.formAction)
            : i.getAttribute('formAction')),
          t !== null && ((r = t), (i = null)));
        var s = new cl('action', 'action', null, a, o);
        e.push({
          event: s,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (a.defaultPrevented) {
                  if (Ln !== 0) {
                    var l = i ? _g(o, i) : new FormData(o);
                    Af(
                      n,
                      { pending: !0, data: l, method: o.method, action: r },
                      null,
                      l,
                    );
                  }
                } else
                  typeof r == 'function' &&
                    (s.preventDefault(),
                    (l = i ? _g(o, i) : new FormData(o)),
                    Af(
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
    for (ms = 0; ms < Sf.length; ms++)
      ((hs = Sf[ms]),
        (zg = hs.toLowerCase()),
        (Lg = hs[0].toUpperCase() + hs.slice(1)),
        Ct(zg, 'on' + Lg));
    var hs, zg, Lg, ms;
    Ct(Zy, 'onAnimationEnd');
    Ct(Wy, 'onAnimationIteration');
    Ct(Fy, 'onAnimationStart');
    Ct('dblclick', 'onDoubleClick');
    Ct('focusin', 'onFocus');
    Ct('focusout', 'onBlur');
    Ct(xM, 'onTransitionRun');
    Ct(AM, 'onTransitionStart');
    Ct(IM, 'onTransitionCancel');
    Ct(Py, 'onTransitionEnd');
    xo('onMouseEnter', ['mouseout', 'mouseover']);
    xo('onMouseLeave', ['mouseout', 'mouseover']);
    xo('onPointerEnter', ['pointerout', 'pointerover']);
    xo('onPointerLeave', ['pointerout', 'pointerover']);
    Ra(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' ',
      ),
    );
    Ra(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' ',
      ),
    );
    Ra('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
    Ra(
      'onCompositionEnd',
      'compositionend focusout keydown keypress keyup mousedown'.split(' '),
    );
    Ra(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
    );
    Ra(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
    );
    var Jr =
        'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
          ' ',
        ),
      hE = new Set(
        'beforetoggle cancel close invalid load scroll scrollend toggle'
          .split(' ')
          .concat(Jr),
      );
    function xb(e, t) {
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
                Bs(u);
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
                Bs(u);
              }
              ((o.currentTarget = null), (r = l));
            }
        }
      }
    }
    function _(e, t) {
      var n = t[df];
      n === void 0 && (n = t[df] = new Set());
      var a = e + '__bubble';
      n.has(a) || (Ab(t, e, 2, !1), n.add(a));
    }
    function Ju(e, t, n) {
      var a = 0;
      (t && (a |= 4), Ab(n, e, a, t));
    }
    var ps = '_reactListening' + Math.random().toString(36).slice(2);
    function Zd(e) {
      if (!e[ps]) {
        ((e[ps] = !0),
          My.forEach(function (n) {
            n !== 'selectionchange' &&
              (hE.has(n) || Ju(n, !1, e), Ju(n, !0, e));
          }));
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[ps] || ((t[ps] = !0), Ju('selectionchange', !1, t));
      }
    }
    function Ab(e, t, n, a) {
      switch (Pb(t)) {
        case 2:
          var o = ZE;
          break;
        case 8:
          o = WE;
          break;
        default:
          o = qd;
      }
      ((n = o.bind(null, t, n, e)),
        (o = void 0),
        !yf ||
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
    function ef(e, t, n, a, o) {
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
              if (((i = mo(s)), i === null)) return;
              if (((l = i.tag), l === 5 || l === 6 || l === 26 || l === 27)) {
                a = r = i;
                continue e;
              }
              s = s.parentNode;
            }
          }
          a = a.return;
        }
      xy(function () {
        var c = r,
          u = id(n),
          d = [];
        e: {
          var f = qy.get(e);
          if (f !== void 0) {
            var m = cl,
              v = e;
            switch (e) {
              case 'keypress':
                if (Ts(n) === 0) break e;
              case 'keydown':
              case 'keyup':
                m = cM;
                break;
              case 'focusin':
                ((v = 'focus'), (m = Au));
                break;
              case 'focusout':
                ((v = 'blur'), (m = Au));
                break;
              case 'beforeblur':
              case 'afterblur':
                m = Au;
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
                m = jp;
                break;
              case 'drag':
              case 'dragend':
              case 'dragenter':
              case 'dragexit':
              case 'dragleave':
              case 'dragover':
              case 'dragstart':
              case 'drop':
                m = QD;
                break;
              case 'touchcancel':
              case 'touchend':
              case 'touchmove':
              case 'touchstart':
                m = dM;
                break;
              case Zy:
              case Wy:
              case Fy:
                m = eM;
                break;
              case Py:
                m = hM;
                break;
              case 'scroll':
              case 'scrollend':
                m = GD;
                break;
              case 'wheel':
                m = gM;
                break;
              case 'copy':
              case 'cut':
              case 'paste':
                m = nM;
                break;
              case 'gotpointercapture':
              case 'lostpointercapture':
              case 'pointercancel':
              case 'pointerdown':
              case 'pointermove':
              case 'pointerout':
              case 'pointerover':
              case 'pointerup':
                m = Xp;
                break;
              case 'toggle':
              case 'beforetoggle':
                m = vM;
            }
            var g = (t & 4) !== 0,
              E = !g && (e === 'scroll' || e === 'scrollend'),
              p = g ? (f !== null ? f + 'Capture' : null) : f;
            g = [];
            for (var h = c, y; h !== null; ) {
              var b = h;
              if (
                ((y = b.stateNode),
                (b = b.tag),
                (b !== 5 && b !== 26 && b !== 27) ||
                  y === null ||
                  p === null ||
                  ((b = Pr(h, p)), b != null && g.push(ei(h, b, y))),
                E)
              )
                break;
              h = h.return;
            }
            0 < g.length &&
              ((f = new m(f, v, null, n, u)),
              d.push({ event: f, listeners: g }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (
              ((f = e === 'mouseover' || e === 'pointerover'),
              (m = e === 'mouseout' || e === 'pointerout'),
              f &&
                n !== gf &&
                (v = n.relatedTarget || n.fromElement) &&
                (mo(v) || v[Lo]))
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
                  (v = v ? mo(v) : null),
                  v !== null &&
                    ((E = oi(v)),
                    (g = v.tag),
                    v !== E || (g !== 5 && g !== 27 && g !== 6)) &&
                    (v = null))
                : ((m = null), (v = c)),
              m !== v)
            ) {
              if (
                ((g = jp),
                (b = 'onMouseLeave'),
                (p = 'onMouseEnter'),
                (h = 'mouse'),
                (e === 'pointerout' || e === 'pointerover') &&
                  ((g = Xp),
                  (b = 'onPointerLeave'),
                  (p = 'onPointerEnter'),
                  (h = 'pointer')),
                (E = m == null ? f : wr(m)),
                (y = v == null ? f : wr(v)),
                (f = new g(b, h + 'leave', m, n, u)),
                (f.target = E),
                (f.relatedTarget = y),
                (b = null),
                mo(u) === c &&
                  ((g = new g(p, h + 'enter', v, n, u)),
                  (g.target = y),
                  (g.relatedTarget = E),
                  (b = g)),
                (E = b),
                m && v)
              )
                t: {
                  for (g = pE, p = m, h = v, y = 0, b = p; b; b = g(b)) y++;
                  b = 0;
                  for (var O = h; O; O = g(O)) b++;
                  for (; 0 < y - b; ) ((p = g(p)), y--);
                  for (; 0 < b - y; ) ((h = g(h)), b--);
                  for (; y--; ) {
                    if (p === h || (h !== null && p === h.alternate)) {
                      g = p;
                      break t;
                    }
                    ((p = g(p)), (h = g(h)));
                  }
                  g = null;
                }
              else g = null;
              (m !== null && Zg(d, f, m, g, !1),
                v !== null && E !== null && Zg(d, E, v, g, !0));
            }
          }
          e: {
            if (
              ((f = c ? wr(c) : window),
              (m = f.nodeName && f.nodeName.toLowerCase()),
              m === 'select' || (m === 'input' && f.type === 'file'))
            )
              var x = eg;
            else if (Jp(f))
              if (Yy) x = wM;
              else {
                x = CM;
                var C = OM;
              }
            else
              ((m = f.nodeName),
                !m ||
                m.toLowerCase() !== 'input' ||
                (f.type !== 'checkbox' && f.type !== 'radio')
                  ? c && rd(c.elementType) && (x = eg)
                  : (x = NM));
            if (x && (x = x(e, c))) {
              ky(d, x, n, u);
              break e;
            }
            (C && C(e, f, c),
              e === 'focusout' &&
                c &&
                f.type === 'number' &&
                c.memoizedProps.value != null &&
                pf(f, 'number', f.value));
          }
          switch (((C = c ? wr(c) : window), e)) {
            case 'focusin':
              (Jp(C) || C.contentEditable === 'true') &&
                ((go = C), (vf = c), (Ir = null));
              break;
            case 'focusout':
              Ir = vf = go = null;
              break;
            case 'mousedown':
              bf = !0;
              break;
            case 'contextmenu':
            case 'mouseup':
            case 'dragend':
              ((bf = !1), og(d, n, u));
              break;
            case 'selectionchange':
              if ($M) break;
            case 'keydown':
            case 'keyup':
              og(d, n, u);
          }
          var $;
          if (cd)
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
            po
              ? Hy(e, n) && (R = 'onCompositionEnd')
              : e === 'keydown' &&
                n.keyCode === 229 &&
                (R = 'onCompositionStart');
          (R &&
            (Iy &&
              n.locale !== 'ko' &&
              (po || R !== 'onCompositionStart'
                ? R === 'onCompositionEnd' && po && ($ = Ay())
                : ((Bn = u),
                  (sd = 'value' in Bn ? Bn.value : Bn.textContent),
                  (po = !0))),
            (C = tl(c, R)),
            0 < C.length &&
              ((R = new Gp(R, e, null, n, u)),
              d.push({ event: R, listeners: C }),
              $ ? (R.data = $) : (($ = Uy(n)), $ !== null && (R.data = $)))),
            ($ = SM ? TM(e, n) : DM(e, n)) &&
              ((R = tl(c, 'onBeforeInput')),
              0 < R.length &&
                ((C = new Gp('onBeforeInput', 'beforeinput', null, n, u)),
                d.push({ event: C, listeners: R }),
                (C.data = $))),
            mE(d, e, c, n, u));
        }
        xb(d, t);
      });
    }
    function ei(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function tl(e, t) {
      for (var n = t + 'Capture', a = []; e !== null; ) {
        var o = e,
          r = o.stateNode;
        if (
          ((o = o.tag),
          (o !== 5 && o !== 26 && o !== 27) ||
            r === null ||
            ((o = Pr(e, n)),
            o != null && a.unshift(ei(e, o, r)),
            (o = Pr(e, t)),
            o != null && a.push(ei(e, o, r))),
          e.tag === 3)
        )
          return a;
        e = e.return;
      }
      return [];
    }
    function pE(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function Zg(e, t, n, a, o) {
      for (var r = t._reactName, i = []; n !== null && n !== a; ) {
        var s = n,
          l = s.alternate,
          c = s.stateNode;
        if (((s = s.tag), l !== null && l === a)) break;
        ((s !== 5 && s !== 26 && s !== 27) ||
          c === null ||
          ((l = c),
          o
            ? ((c = Pr(n, r)), c != null && i.unshift(ei(n, c, l)))
            : o || ((c = Pr(n, r)), c != null && i.push(ei(n, c, l)))),
          (n = n.return));
      }
      i.length !== 0 && e.push({ event: t, listeners: i });
    }
    var gE = /\r\n?/g,
      yE = /\u0000|\uFFFD/g;
    function Wg(e) {
      return (typeof e == 'string' ? e : '' + e)
        .replace(
          gE,
          `
`,
        )
        .replace(yE, '');
    }
    function Ib(e, t) {
      return ((t = Wg(t)), Wg(e) === t);
    }
    function J(e, t, n, a, o, r) {
      switch (n) {
        case 'children':
          typeof a == 'string'
            ? t === 'body' || (t === 'textarea' && a === '') || Ao(e, a)
            : (typeof a == 'number' || typeof a == 'bigint') &&
              t !== 'body' &&
              Ao(e, '' + a);
          break;
        case 'className':
          os(e, 'class', a);
          break;
        case 'tabIndex':
          os(e, 'tabindex', a);
          break;
        case 'dir':
        case 'role':
        case 'viewBox':
        case 'width':
        case 'height':
          os(e, n, a);
          break;
        case 'style':
          $y(e, a, r);
          break;
        case 'data':
          if (t !== 'object') {
            os(e, 'data', a);
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
          ((a = bs('' + a)), e.setAttribute(n, a));
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
                ? (t !== 'input' && J(e, t, 'name', o.name, o, null),
                  J(e, t, 'formEncType', o.formEncType, o, null),
                  J(e, t, 'formMethod', o.formMethod, o, null),
                  J(e, t, 'formTarget', o.formTarget, o, null))
                : (J(e, t, 'encType', o.encType, o, null),
                  J(e, t, 'method', o.method, o, null),
                  J(e, t, 'target', o.target, o, null)));
          if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
            e.removeAttribute(n);
            break;
          }
          ((a = bs('' + a)), e.setAttribute(n, a));
          break;
        case 'onClick':
          a != null && (e.onclick = on);
          break;
        case 'onScroll':
          a != null && _('scroll', e);
          break;
        case 'onScrollEnd':
          a != null && _('scrollend', e);
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
          ((n = bs('' + a)),
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
          (_('beforetoggle', e), _('toggle', e), vs(e, 'popover', a));
          break;
        case 'xlinkActuate':
          Xt(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
          break;
        case 'xlinkArcrole':
          Xt(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
          break;
        case 'xlinkRole':
          Xt(e, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
          break;
        case 'xlinkShow':
          Xt(e, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
          break;
        case 'xlinkTitle':
          Xt(e, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
          break;
        case 'xlinkType':
          Xt(e, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
          break;
        case 'xmlBase':
          Xt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
          break;
        case 'xmlLang':
          Xt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
          break;
        case 'xmlSpace':
          Xt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
          break;
        case 'is':
          vs(e, 'is', a);
          break;
        case 'innerText':
        case 'textContent':
          break;
        default:
          (!(2 < n.length) ||
            (n[0] !== 'o' && n[0] !== 'O') ||
            (n[1] !== 'n' && n[1] !== 'N')) &&
            ((n = VD.get(n) || n), vs(e, n, a));
      }
    }
    function Wf(e, t, n, a, o, r) {
      switch (n) {
        case 'style':
          $y(e, a, r);
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
            ? Ao(e, a)
            : (typeof a == 'number' || typeof a == 'bigint') && Ao(e, '' + a);
          break;
        case 'onScroll':
          a != null && _('scroll', e);
          break;
        case 'onScrollEnd':
          a != null && _('scrollend', e);
          break;
        case 'onClick':
          a != null && (e.onclick = on);
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
          if (!Ey.hasOwnProperty(n))
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
                  : vs(e, n, a);
            }
      }
    }
    function Ye(e, t, n) {
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
          (_('error', e), _('load', e));
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
                    J(e, t, r, i, n, null);
                }
            }
          (o && J(e, t, 'srcSet', n.srcSet, n, null),
            a && J(e, t, 'src', n.src, n, null));
          return;
        case 'input':
          _('invalid', e);
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
                    J(e, t, a, u, n, null);
                }
            }
          Ny(e, r, s, l, c, i, o, !1);
          return;
        case 'select':
          (_('invalid', e), (a = i = r = null));
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
                  J(e, t, o, s, n, null);
              }
          ((t = r),
            (n = i),
            (e.multiple = !!a),
            t != null ? Eo(e, !!a, t, !1) : n != null && Eo(e, !!a, n, !0));
          return;
        case 'textarea':
          (_('invalid', e), (r = o = a = null));
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
                  J(e, t, i, s, n, null);
              }
          Ry(e, a, o, r);
          return;
        case 'option':
          for (l in n)
            n.hasOwnProperty(l) &&
              ((a = n[l]), a != null) &&
              (l === 'selected'
                ? (e.selected =
                    a && typeof a != 'function' && typeof a != 'symbol')
                : J(e, t, l, a, n, null));
          return;
        case 'dialog':
          (_('beforetoggle', e), _('toggle', e), _('cancel', e), _('close', e));
          break;
        case 'iframe':
        case 'object':
          _('load', e);
          break;
        case 'video':
        case 'audio':
          for (a = 0; a < Jr.length; a++) _(Jr[a], e);
          break;
        case 'image':
          (_('error', e), _('load', e));
          break;
        case 'details':
          _('toggle', e);
          break;
        case 'embed':
        case 'source':
        case 'link':
          (_('error', e), _('load', e));
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
                  J(e, t, c, a, n, null);
              }
          return;
        default:
          if (rd(t)) {
            for (u in n)
              n.hasOwnProperty(u) &&
                ((a = n[u]), a !== void 0 && Wf(e, t, u, a, n, void 0));
            return;
          }
      }
      for (s in n)
        n.hasOwnProperty(s) &&
          ((a = n[s]), a != null && J(e, t, s, a, n, null));
    }
    function vE(e, t, n, a) {
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
                  a.hasOwnProperty(m) || J(e, t, m, null, a, d);
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
                  m !== d && J(e, t, f, m, a, d);
              }
          }
          hf(e, i, s, l, c, u, r, o);
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
                  a.hasOwnProperty(r) || J(e, t, r, null, a, l);
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
                  r !== l && J(e, t, o, r, a, l);
              }
          ((t = s),
            (n = i),
            (a = m),
            f != null
              ? Eo(e, !!n, f, !1)
              : !!a != !!n &&
                (t != null ? Eo(e, !!n, t, !0) : Eo(e, !!n, n ? [] : '', !1)));
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
                  J(e, t, s, null, a, o);
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
                  o !== r && J(e, t, i, o, a, r);
              }
          wy(e, f, m);
          return;
        case 'option':
          for (var v in n)
            ((f = n[v]),
              n.hasOwnProperty(v) &&
                f != null &&
                !a.hasOwnProperty(v) &&
                (v === 'selected'
                  ? (e.selected = !1)
                  : J(e, t, v, null, a, f)));
          for (l in a)
            ((f = a[l]),
              (m = n[l]),
              a.hasOwnProperty(l) &&
                f !== m &&
                (f != null || m != null) &&
                (l === 'selected'
                  ? (e.selected =
                      f && typeof f != 'function' && typeof f != 'symbol')
                  : J(e, t, l, f, a, m)));
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
          for (var g in n)
            ((f = n[g]),
              n.hasOwnProperty(g) &&
                f != null &&
                !a.hasOwnProperty(g) &&
                J(e, t, g, null, a, f));
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
                  J(e, t, c, f, a, m);
              }
          return;
        default:
          if (rd(t)) {
            for (var E in n)
              ((f = n[E]),
                n.hasOwnProperty(E) &&
                  f !== void 0 &&
                  !a.hasOwnProperty(E) &&
                  Wf(e, t, E, void 0, a, f));
            for (u in a)
              ((f = a[u]),
                (m = n[u]),
                !a.hasOwnProperty(u) ||
                  f === m ||
                  (f === void 0 && m === void 0) ||
                  Wf(e, t, u, f, a, m));
            return;
          }
      }
      for (var p in n)
        ((f = n[p]),
          n.hasOwnProperty(p) &&
            f != null &&
            !a.hasOwnProperty(p) &&
            J(e, t, p, null, a, f));
      for (d in a)
        ((f = a[d]),
          (m = n[d]),
          !a.hasOwnProperty(d) ||
            f === m ||
            (f == null && m == null) ||
            J(e, t, d, f, a, m));
    }
    function Fg(e) {
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
    function bE() {
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
          if (r && s && Fg(i)) {
            for (i = 0, s = o.responseEnd, a += 1; a < n.length; a++) {
              var l = n[a],
                c = l.startTime;
              if (c > s) break;
              var u = l.transferSize,
                d = l.initiatorType;
              u &&
                Fg(d) &&
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
    var Ff = null,
      Pf = null;
    function nl(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function Pg(e) {
      switch (e) {
        case 'http://www.w3.org/2000/svg':
          return 1;
        case 'http://www.w3.org/1998/Math/MathML':
          return 2;
        default:
          return 0;
      }
    }
    function Hb(e, t) {
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
    function qf(e, t) {
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
    var tf = null;
    function SE() {
      var e = window.event;
      return e && e.type === 'popstate'
        ? e === tf
          ? !1
          : ((tf = e), !0)
        : ((tf = null), !1);
    }
    var Ub = typeof setTimeout == 'function' ? setTimeout : void 0,
      TE = typeof clearTimeout == 'function' ? clearTimeout : void 0,
      qg = typeof Promise == 'function' ? Promise : void 0,
      DE =
        typeof queueMicrotask == 'function'
          ? queueMicrotask
          : typeof qg < 'u'
            ? function (e) {
                return qg.resolve(null).then(e).catch(ME);
              }
            : Ub;
    function ME(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function na(e) {
      return e === 'head';
    }
    function Vg(e, t) {
      var n = t,
        a = 0;
      do {
        var o = n.nextSibling;
        if ((e.removeChild(n), o && o.nodeType === 8))
          if (((n = o.data), n === '/$' || n === '/&')) {
            if (a === 0) {
              (e.removeChild(o), zo(t));
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
          else if (n === 'html') Wr(e.ownerDocument.documentElement);
          else if (n === 'head') {
            ((n = e.ownerDocument.head), Wr(n));
            for (var r = n.firstChild; r; ) {
              var i = r.nextSibling,
                s = r.nodeName;
              (r[li] ||
                s === 'SCRIPT' ||
                s === 'STYLE' ||
                (s === 'LINK' && r.rel.toLowerCase() === 'stylesheet') ||
                n.removeChild(r),
                (r = i));
            }
          } else n === 'body' && Wr(e.ownerDocument.body);
        n = o;
      } while (n);
      zo(t);
    }
    function jg(e, t) {
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
    function Vf(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var n = t;
        switch (((t = t.nextSibling), n.nodeName)) {
          case 'HTML':
          case 'HEAD':
          case 'BODY':
            (Vf(n), od(n));
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
    function EE(e, t, n, a) {
      for (; e.nodeType === 1; ) {
        var o = n;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!a && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
        } else if (a) {
          if (!e[li])
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
    function OE(e, t, n) {
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
    function kb(e, t) {
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
    function jf(e) {
      return e.data === '$?' || e.data === '$~';
    }
    function Gf(e) {
      return (
        e.data === '$!' ||
        (e.data === '$?' && e.ownerDocument.readyState !== 'loading')
      );
    }
    function CE(e, t) {
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
    var Xf = null;
    function Gg(e) {
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
    function Xg(e) {
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
    function Yb(e, t, n) {
      switch (((t = nl(n)), e)) {
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
    function Wr(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
      od(e);
    }
    var Dt = new Map(),
      Qg = new Set();
    function al(e) {
      return typeof e.getRootNode == 'function'
        ? e.getRootNode()
        : e.nodeType === 9
          ? e
          : e.ownerDocument;
    }
    var pn = V.d;
    V.d = { f: NE, r: wE, D: RE, C: $E, L: xE, m: AE, X: HE, S: IE, M: UE };
    function NE() {
      var e = pn.f(),
        t = Sl();
      return e || t;
    }
    function wE(e) {
      var t = Zo(e);
      t !== null && t.tag === 5 && t.type === 'form' ? $v(t) : pn.r(e);
    }
    var qo = typeof document > 'u' ? null : document;
    function Bb(e, t, n) {
      var a = qo;
      if (a && typeof t == 'string' && t) {
        var o = yt(t);
        ((o = 'link[rel="' + e + '"][href="' + o + '"]'),
          typeof n == 'string' && (o += '[crossorigin="' + n + '"]'),
          Qg.has(o) ||
            (Qg.add(o),
            (e = { rel: e, crossOrigin: n, href: t }),
            a.querySelector(o) === null &&
              ((t = a.createElement('link')),
              Ye(t, 'link', e),
              $e(t),
              a.head.appendChild(t))));
      }
    }
    function RE(e) {
      (pn.D(e), Bb('dns-prefetch', e, null));
    }
    function $E(e, t) {
      (pn.C(e, t), Bb('preconnect', e, t));
    }
    function xE(e, t, n) {
      pn.L(e, t, n);
      var a = qo;
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
            r = _o(e);
            break;
          case 'script':
            r = Vo(e);
        }
        Dt.has(r) ||
          ((e = le(
            {
              rel: 'preload',
              href: t === 'image' && n && n.imageSrcSet ? void 0 : e,
              as: t,
            },
            n,
          )),
          Dt.set(r, e),
          a.querySelector(o) !== null ||
            (t === 'style' && a.querySelector(hi(r))) ||
            (t === 'script' && a.querySelector(pi(r))) ||
            ((t = a.createElement('link')),
            Ye(t, 'link', e),
            $e(t),
            a.head.appendChild(t)));
      }
    }
    function AE(e, t) {
      pn.m(e, t);
      var n = qo;
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
            r = Vo(e);
        }
        if (
          !Dt.has(r) &&
          ((e = le({ rel: 'modulepreload', href: e }, t)),
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
              if (n.querySelector(pi(r))) return;
          }
          ((a = n.createElement('link')),
            Ye(a, 'link', e),
            $e(a),
            n.head.appendChild(a));
        }
      }
    }
    function IE(e, t, n) {
      pn.S(e, t, n);
      var a = qo;
      if (a && e) {
        var o = Mo(a).hoistableStyles,
          r = _o(e);
        t = t || 'default';
        var i = o.get(r);
        if (!i) {
          var s = { loading: 0, preload: null };
          if ((i = a.querySelector(hi(r)))) s.loading = 5;
          else {
            ((e = le({ rel: 'stylesheet', href: e, 'data-precedence': t }, n)),
              (n = Dt.get(r)) && Wd(e, n));
            var l = (i = a.createElement('link'));
            ($e(l),
              Ye(l, 'link', e),
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
              Rs(i, t, a));
          }
          ((i = { type: 'stylesheet', instance: i, count: 1, state: s }),
            o.set(r, i));
        }
      }
    }
    function HE(e, t) {
      pn.X(e, t);
      var n = qo;
      if (n && e) {
        var a = Mo(n).hoistableScripts,
          o = Vo(e),
          r = a.get(o);
        r ||
          ((r = n.querySelector(pi(o))),
          r ||
            ((e = le({ src: e, async: !0 }, t)),
            (t = Dt.get(o)) && Fd(e, t),
            (r = n.createElement('script')),
            $e(r),
            Ye(r, 'link', e),
            n.head.appendChild(r)),
          (r = { type: 'script', instance: r, count: 1, state: null }),
          a.set(o, r));
      }
    }
    function UE(e, t) {
      pn.M(e, t);
      var n = qo;
      if (n && e) {
        var a = Mo(n).hoistableScripts,
          o = Vo(e),
          r = a.get(o);
        r ||
          ((r = n.querySelector(pi(o))),
          r ||
            ((e = le({ src: e, async: !0, type: 'module' }, t)),
            (t = Dt.get(o)) && Fd(e, t),
            (r = n.createElement('script')),
            $e(r),
            Ye(r, 'link', e),
            n.head.appendChild(r)),
          (r = { type: 'script', instance: r, count: 1, state: null }),
          a.set(o, r));
      }
    }
    function Kg(e, t, n, a) {
      var o = (o = Zn.current) ? al(o) : null;
      if (!o) throw Error(M(446));
      switch (e) {
        case 'meta':
        case 'title':
          return null;
        case 'style':
          return typeof n.precedence == 'string' && typeof n.href == 'string'
            ? ((t = _o(n.href)),
              (n = Mo(o).hoistableStyles),
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
            e = _o(n.href);
            var r = Mo(o).hoistableStyles,
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
                (r = o.querySelector(hi(e))) &&
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
                  r || kE(o, e, n, i.state))),
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
              ? ((t = Vo(n)),
                (n = Mo(o).hoistableScripts),
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
    function _o(e) {
      return 'href="' + yt(e) + '"';
    }
    function hi(e) {
      return 'link[rel="stylesheet"][' + e + ']';
    }
    function _b(e) {
      return le({}, e, { 'data-precedence': e.precedence, precedence: null });
    }
    function kE(e, t, n, a) {
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
          Ye(t, 'link', n),
          $e(t),
          e.head.appendChild(t));
    }
    function Vo(e) {
      return '[src="' + yt(e) + '"]';
    }
    function pi(e) {
      return 'script[async]' + e;
    }
    function Jg(e, t, n) {
      if ((t.count++, t.instance === null))
        switch (t.type) {
          case 'style':
            var a = e.querySelector('style[data-href~="' + yt(n.href) + '"]');
            if (a) return ((t.instance = a), $e(a), a);
            var o = le({}, n, {
              'data-href': n.href,
              'data-precedence': n.precedence,
              href: null,
              precedence: null,
            });
            return (
              (a = (e.ownerDocument || e).createElement('style')),
              $e(a),
              Ye(a, 'style', o),
              Rs(a, n.precedence, e),
              (t.instance = a)
            );
          case 'stylesheet':
            o = _o(n.href);
            var r = e.querySelector(hi(o));
            if (r) return ((t.state.loading |= 4), (t.instance = r), $e(r), r);
            ((a = _b(n)),
              (o = Dt.get(o)) && Wd(a, o),
              (r = (e.ownerDocument || e).createElement('link')),
              $e(r));
            var i = r;
            return (
              (i._p = new Promise(function (s, l) {
                ((i.onload = s), (i.onerror = l));
              })),
              Ye(r, 'link', a),
              (t.state.loading |= 4),
              Rs(r, n.precedence, e),
              (t.instance = r)
            );
          case 'script':
            return (
              (r = Vo(n.src)),
              (o = e.querySelector(pi(r)))
                ? ((t.instance = o), $e(o), o)
                : ((a = n),
                  (o = Dt.get(r)) && ((a = le({}, n)), Fd(a, o)),
                  (e = e.ownerDocument || e),
                  (o = e.createElement('script')),
                  $e(o),
                  Ye(o, 'link', a),
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
          ((a = t.instance), (t.state.loading |= 4), Rs(a, n.precedence, e));
      return t.instance;
    }
    function Rs(e, t, n) {
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
    function Wd(e, t) {
      (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.title == null && (e.title = t.title));
    }
    function Fd(e, t) {
      (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.integrity == null && (e.integrity = t.integrity));
    }
    var $s = null;
    function ey(e, t, n) {
      if ($s === null) {
        var a = new Map(),
          o = ($s = new Map());
        o.set(n, a);
      } else ((o = $s), (a = o.get(n)), a || ((a = new Map()), o.set(n, a)));
      if (a.has(e)) return a;
      for (
        a.set(e, null), n = n.getElementsByTagName(e), o = 0;
        o < n.length;
        o++
      ) {
        var r = n[o];
        if (
          !(
            r[li] ||
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
    function ty(e, t, n) {
      ((e = e.ownerDocument || e),
        e.head.insertBefore(
          n,
          t === 'title' ? e.querySelector('head > title') : null,
        ));
    }
    function YE(e, t, n) {
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
    function zb(e) {
      return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
    }
    function BE(e, t, n, a) {
      if (
        n.type === 'stylesheet' &&
        (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
        (n.state.loading & 4) === 0
      ) {
        if (n.instance === null) {
          var o = _o(a.href),
            r = t.querySelector(hi(o));
          if (r) {
            ((t = r._p),
              t !== null &&
                typeof t == 'object' &&
                typeof t.then == 'function' &&
                (e.count++, (e = ol.bind(e)), t.then(e, e)),
              (n.state.loading |= 4),
              (n.instance = r),
              $e(r));
            return;
          }
          ((r = t.ownerDocument || t),
            (a = _b(a)),
            (o = Dt.get(o)) && Wd(a, o),
            (r = r.createElement('link')),
            $e(r));
          var i = r;
          ((i._p = new Promise(function (s, l) {
            ((i.onload = s), (i.onerror = l));
          })),
            Ye(r, 'link', a),
            (n.instance = r));
        }
        (e.stylesheets === null && (e.stylesheets = new Map()),
          e.stylesheets.set(n, t),
          (t = n.state.preload) &&
            (n.state.loading & 3) === 0 &&
            (e.count++,
            (n = ol.bind(e)),
            t.addEventListener('load', n),
            t.addEventListener('error', n)));
      }
    }
    var nf = 0;
    function _E(e, t) {
      return (
        e.stylesheets && e.count === 0 && xs(e, e.stylesheets),
        0 < e.count || 0 < e.imgCount
          ? function (n) {
              var a = setTimeout(function () {
                if ((e.stylesheets && xs(e, e.stylesheets), e.unsuspend)) {
                  var r = e.unsuspend;
                  ((e.unsuspend = null), r());
                }
              }, 6e4 + t);
              0 < e.imgBytes && nf === 0 && (nf = 62500 * bE());
              var o = setTimeout(
                function () {
                  if (
                    ((e.waitingForImages = !1),
                    e.count === 0 &&
                      (e.stylesheets && xs(e, e.stylesheets), e.unsuspend))
                  ) {
                    var r = e.unsuspend;
                    ((e.unsuspend = null), r());
                  }
                },
                (e.imgBytes > nf ? 50 : 800) + t,
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
    function ol() {
      if (
        (this.count--,
        this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
      ) {
        if (this.stylesheets) xs(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          ((this.unsuspend = null), e());
        }
      }
    }
    var rl = null;
    function xs(e, t) {
      ((e.stylesheets = null),
        e.unsuspend !== null &&
          (e.count++,
          (rl = new Map()),
          t.forEach(zE, e),
          (rl = null),
          ol.call(e)));
    }
    function zE(e, t) {
      if (!(t.state.loading & 4)) {
        var n = rl.get(e);
        if (n) var a = n.get(null);
        else {
          ((n = new Map()), rl.set(e, n));
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
          (a = ol.bind(this)),
          o.addEventListener('load', a),
          o.addEventListener('error', a),
          r
            ? r.parentNode.insertBefore(o, r.nextSibling)
            : ((e = e.nodeType === 9 ? e.head : e),
              e.insertBefore(o, e.firstChild)),
          (t.state.loading |= 4));
      }
    }
    var ti = {
      $$typeof: an,
      Provider: null,
      Consumer: null,
      _currentValue: ba,
      _currentValue2: ba,
      _threadCount: 0,
    };
    function LE(e, t, n, a, o, r, i, s, l) {
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
        (this.expirationTimes = wu(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = wu(0)),
        (this.hiddenUpdates = wu(null)),
        (this.identifierPrefix = a),
        (this.onUncaughtError = o),
        (this.onCaughtError = r),
        (this.onRecoverableError = i),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = l),
        (this.incompleteTransitions = new Map()));
    }
    function Lb(e, t, n, a, o, r, i, s, l, c, u, d) {
      return (
        (e = new LE(e, t, n, i, l, c, u, d, s)),
        (t = 1),
        r === !0 && (t |= 24),
        (r = nt(3, null, null, t)),
        (e.current = r),
        (r.stateNode = e),
        (t = gd()),
        t.refCount++,
        (e.pooledCache = t),
        t.refCount++,
        (r.memoizedState = { element: a, isDehydrated: n, cache: t }),
        bd(r),
        e
      );
    }
    function Zb(e) {
      return e ? ((e = bo), e) : bo;
    }
    function Wb(e, t, n, a, o, r) {
      ((o = Zb(o)),
        a.context === null ? (a.context = o) : (a.pendingContext = o),
        (a = Fn(t)),
        (a.payload = { element: n }),
        (r = r === void 0 ? null : r),
        r !== null && (a.callback = r),
        (n = Pn(e, a, t)),
        n !== null && (je(n, e, t), Ur(n, e, t)));
    }
    function ny(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function Pd(e, t) {
      (ny(e, t), (e = e.alternate) && ny(e, t));
    }
    function Fb(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = Aa(e, 67108864);
        (t !== null && je(t, e, 67108864), Pd(e, 67108864));
      }
    }
    function ay(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = st();
        t = nd(t);
        var n = Aa(e, t);
        (n !== null && je(n, e, t), Pd(e, t));
      }
    }
    var il = !0;
    function ZE(e, t, n, a) {
      var o = H.T;
      H.T = null;
      var r = V.p;
      try {
        ((V.p = 2), qd(e, t, n, a));
      } finally {
        ((V.p = r), (H.T = o));
      }
    }
    function WE(e, t, n, a) {
      var o = H.T;
      H.T = null;
      var r = V.p;
      try {
        ((V.p = 8), qd(e, t, n, a));
      } finally {
        ((V.p = r), (H.T = o));
      }
    }
    function qd(e, t, n, a) {
      if (il) {
        var o = Qf(a);
        if (o === null) (ef(e, t, a, sl, n), oy(e, a));
        else if (PE(o, e, t, n, a)) a.stopPropagation();
        else if ((oy(e, a), t & 4 && -1 < FE.indexOf(e))) {
          for (; o !== null; ) {
            var r = Zo(o);
            if (r !== null)
              switch (r.tag) {
                case 3:
                  if (
                    ((r = r.stateNode), r.current.memoizedState.isDehydrated)
                  ) {
                    var i = ga(r.pendingLanes);
                    if (i !== 0) {
                      var s = r;
                      for (s.pendingLanes |= 2, s.entangledLanes |= 2; i; ) {
                        var l = 1 << (31 - it(i));
                        ((s.entanglements[1] |= l), (i &= ~l));
                      }
                      (Wt(r), (q & 6) === 0 && ((Xs = ot() + 500), mi(0, !1)));
                    }
                  }
                  break;
                case 31:
                case 13:
                  ((s = Aa(r, 2)), s !== null && je(s, r, 2), Sl(), Pd(r, 2));
              }
            if (((r = Qf(a)), r === null && ef(e, t, a, sl, n), r === o)) break;
            o = r;
          }
          o !== null && a.stopPropagation();
        } else ef(e, t, a, null, n);
      }
    }
    function Qf(e) {
      return ((e = id(e)), Vd(e));
    }
    var sl = null;
    function Vd(e) {
      if (((sl = null), (e = mo(e)), e !== null)) {
        var t = oi(e);
        if (t === null) e = null;
        else {
          var n = t.tag;
          if (n === 13) {
            if (((e = uy(t)), e !== null)) return e;
            e = null;
          } else if (n === 31) {
            if (((e = fy(t)), e !== null)) return e;
            e = null;
          } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return ((sl = e), null);
    }
    function Pb(e) {
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
          switch (xD()) {
            case py:
              return 2;
            case gy:
              return 8;
            case ks:
            case AD:
              return 32;
            case yy:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Kf = !1,
      jn = null,
      Gn = null,
      Xn = null,
      ni = new Map(),
      ai = new Map(),
      kn = [],
      FE =
        'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
          ' ',
        );
    function oy(e, t) {
      switch (e) {
        case 'focusin':
        case 'focusout':
          jn = null;
          break;
        case 'dragenter':
        case 'dragleave':
          Gn = null;
          break;
        case 'mouseover':
        case 'mouseout':
          Xn = null;
          break;
        case 'pointerover':
        case 'pointerout':
          ni.delete(t.pointerId);
          break;
        case 'gotpointercapture':
        case 'lostpointercapture':
          ai.delete(t.pointerId);
      }
    }
    function Er(e, t, n, a, o, r) {
      return e === null || e.nativeEvent !== r
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: a,
            nativeEvent: r,
            targetContainers: [o],
          }),
          t !== null && ((t = Zo(t)), t !== null && Fb(t)),
          e)
        : ((e.eventSystemFlags |= a),
          (t = e.targetContainers),
          o !== null && t.indexOf(o) === -1 && t.push(o),
          e);
    }
    function PE(e, t, n, a, o) {
      switch (t) {
        case 'focusin':
          return ((jn = Er(jn, e, t, n, a, o)), !0);
        case 'dragenter':
          return ((Gn = Er(Gn, e, t, n, a, o)), !0);
        case 'mouseover':
          return ((Xn = Er(Xn, e, t, n, a, o)), !0);
        case 'pointerover':
          var r = o.pointerId;
          return (ni.set(r, Er(ni.get(r) || null, e, t, n, a, o)), !0);
        case 'gotpointercapture':
          return (
            (r = o.pointerId),
            ai.set(r, Er(ai.get(r) || null, e, t, n, a, o)),
            !0
          );
      }
      return !1;
    }
    function qb(e) {
      var t = mo(e.target);
      if (t !== null) {
        var n = oi(t);
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = uy(n)), t !== null)) {
              ((e.blockedOn = t),
                Lp(e.priority, function () {
                  ay(n);
                }));
              return;
            }
          } else if (t === 31) {
            if (((t = fy(n)), t !== null)) {
              ((e.blockedOn = t),
                Lp(e.priority, function () {
                  ay(n);
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
    function As(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Qf(e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var a = new n.constructor(n.type, n);
          ((gf = a), n.target.dispatchEvent(a), (gf = null));
        } else return ((t = Zo(n)), t !== null && Fb(t), (e.blockedOn = n), !1);
        t.shift();
      }
      return !0;
    }
    function ry(e, t, n) {
      As(e) && n.delete(t);
    }
    function qE() {
      ((Kf = !1),
        jn !== null && As(jn) && (jn = null),
        Gn !== null && As(Gn) && (Gn = null),
        Xn !== null && As(Xn) && (Xn = null),
        ni.forEach(ry),
        ai.forEach(ry));
    }
    function gs(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        Kf ||
          ((Kf = !0),
          we.unstable_scheduleCallback(we.unstable_NormalPriority, qE)));
    }
    var ys = null;
    function iy(e) {
      ys !== e &&
        ((ys = e),
        we.unstable_scheduleCallback(we.unstable_NormalPriority, function () {
          ys === e && (ys = null);
          for (var t = 0; t < e.length; t += 3) {
            var n = e[t],
              a = e[t + 1],
              o = e[t + 2];
            if (typeof a != 'function') {
              if (Vd(a || n) === null) continue;
              break;
            }
            var r = Zo(n);
            r !== null &&
              (e.splice(t, 3),
              (t -= 3),
              Af(
                r,
                { pending: !0, data: o, method: n.method, action: a },
                a,
                o,
              ));
          }
        }));
    }
    function zo(e) {
      function t(l) {
        return gs(l, e);
      }
      (jn !== null && gs(jn, e),
        Gn !== null && gs(Gn, e),
        Xn !== null && gs(Xn, e),
        ni.forEach(t),
        ai.forEach(t));
      for (var n = 0; n < kn.length; n++) {
        var a = kn[n];
        a.blockedOn === e && (a.blockedOn = null);
      }
      for (; 0 < kn.length && ((n = kn[0]), n.blockedOn === null); )
        (qb(n), n.blockedOn === null && kn.shift());
      if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
        for (a = 0; a < n.length; a += 3) {
          var o = n[a],
            r = n[a + 1],
            i = o[Ge] || null;
          if (typeof r == 'function') i || iy(n);
          else if (i) {
            var s = null;
            if (r && r.hasAttribute('formAction')) {
              if (((o = r), (i = r[Ge] || null))) s = i.formAction;
              else if (Vd(o) !== null) continue;
            } else s = i.action;
            (typeof s == 'function'
              ? (n[a + 1] = s)
              : (n.splice(a, 3), (a -= 3)),
              iy(n));
          }
        }
    }
    function Vb() {
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
    function jd(e) {
      this._internalRoot = e;
    }
    Ml.prototype.render = jd.prototype.render = function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(M(409));
      var n = t.current,
        a = st();
      Wb(n, a, e, t, null, null);
    };
    Ml.prototype.unmount = jd.prototype.unmount = function () {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (Wb(e.current, 2, null, e, null, null), Sl(), (t[Lo] = null));
      }
    };
    function Ml(e) {
      this._internalRoot = e;
    }
    Ml.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = Dy();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < kn.length && t !== 0 && t < kn[n].priority; n++);
        (kn.splice(n, 0, e), n === 0 && qb(e));
      }
    };
    var sy = ly.version;
    if (sy !== '19.2.8') throw Error(M(527, sy, '19.2.8'));
    V.findDOMNode = function (e) {
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == 'function'
          ? Error(M(188))
          : ((e = Object.keys(e).join(',')), Error(M(268, e)));
      return (
        (e = ED(t)),
        (e = e !== null ? dy(e) : null),
        (e = e === null ? null : e.stateNode),
        e
      );
    };
    var VE = {
      bundleType: 0,
      version: '19.2.8',
      rendererPackageName: 'react-dom',
      currentDispatcherRef: H,
      reconcilerVersion: '19.2.8',
    };
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u' &&
      ((Or = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !Or.isDisabled && Or.supportsFiber)
    )
      try {
        ((ri = Or.inject(VE)), (rt = Or));
      } catch {}
    var Or;
    El.createRoot = function (e, t) {
      if (!cy(e)) throw Error(M(299));
      var n = !1,
        a = '',
        o = Bv,
        r = _v,
        i = zv;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (o = t.onUncaughtError),
          t.onCaughtError !== void 0 && (r = t.onCaughtError),
          t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = Lb(e, 1, !1, null, null, n, a, null, o, r, i, Vb)),
        (e[Lo] = t.current),
        Zd(e),
        new jd(t)
      );
    };
    El.hydrateRoot = function (e, t, n) {
      if (!cy(e)) throw Error(M(299));
      var a = !1,
        o = '',
        r = Bv,
        i = _v,
        s = zv,
        l = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (a = !0),
          n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (r = n.onUncaughtError),
          n.onCaughtError !== void 0 && (i = n.onCaughtError),
          n.onRecoverableError !== void 0 && (s = n.onRecoverableError),
          n.formState !== void 0 && (l = n.formState)),
        (t = Lb(e, 1, !0, t, n ?? null, a, o, l, r, i, s, Vb)),
        (t.context = Zb(null)),
        (n = t.current),
        (a = st()),
        (a = nd(a)),
        (o = Fn(a)),
        (o.callback = null),
        Pn(n, o, a),
        (n = a),
        (t.current.lanes = n),
        si(t, n),
        Wt(t),
        (e[Lo] = t.current),
        Zd(e),
        new Ml(t)
      );
    };
    El.version = '19.2.8';
  });
  var Qb = kt((s$, Xb) => {
    'use strict';
    function Gb() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gb);
        } catch (e) {
          console.error(e);
        }
    }
    (Gb(), (Xb.exports = jb()));
  });
  var e0 = kt((Ol) => {
    'use strict';
    var jE = Symbol.for('react.transitional.element'),
      GE = Symbol.for('react.fragment');
    function Jb(e, t, n) {
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
          $$typeof: jE,
          type: e,
          key: a,
          ref: t !== void 0 ? t : null,
          props: n,
        }
      );
    }
    Ol.Fragment = GE;
    Ol.jsx = Jb;
    Ol.jsxs = Jb;
  });
  var P = kt((u$, t0) => {
    'use strict';
    t0.exports = e0();
  });
  var su = U(Qb());
  function Kb(e) {
    return new Date(e).toLocaleDateString('en-us', {
      month: 'numeric',
      day: 'numeric',
    });
  }
  var Nt = U(P());
  function Gd({ event: e }) {
    return (0, Nt.jsx)('div', {
      children: (0, Nt.jsxs)('div', {
        className:
          'church:flex church:flex-col church:overflow-hidden church:rounded-[1em] church:shadow-xl church:mb-10 church:last:mb-0 church:bg-dark',
        children: [
          (0, Nt.jsx)('a', {
            href: e.event_url,
            target: '_blank',
            children: (0, Nt.jsx)('div', {
              className: 'church:flex-1',
              children: (0, Nt.jsx)('img', {
                src: e.image,
                alt: 'event image',
              }),
            }),
          }),
          (0, Nt.jsxs)('div', {
            className:
              'church:flex church:flex-col church:py-4 church:px-8 church:md:py-8 church:flex-1 church:bg-white',
            children: [
              (0, Nt.jsx)('h4', {
                className: 'church:mb-2 church:font-bold church:text-left',
                children: e.name,
              }),
              (0, Nt.jsx)('h5', {
                className: 'church:mb-4 church:text-left',
                children: Kb(e.start_time),
              }),
              (0, Nt.jsx)('a', {
                className:
                  'btn church:mx-auto church:mt-4 church:sm:mt-8 church:lg:mt-auto',
                style: {
                  visibility:
                    e.registration_url === null ? 'hidden' : 'visible',
                },
                href: e.registration_url,
                target: '_blank',
                children: 'Register',
              }),
            ],
          }),
        ],
      }),
    });
  }
  var gi = U(P());
  function Xd() {
    return (0, gi.jsxs)('h5', {
      className: 'church:text-center',
      children: [
        'No upcoming events at this time',
        (0, gi.jsx)('br', {}),
        (0, gi.jsx)('br', {}),
        'Check back later!',
      ],
    });
  }
  var jo = U(P());
  async function Qd({ events: e }) {
    return (0, jo.jsxs)('div', {
      children: [
        e.length === 0 && (0, jo.jsx)(Xd, {}),
        (0, jo.jsx)('div', {
          className:
            'church:grid church:md:grid-cols-2 church:xl:grid-cols-3 church:gap-[1em] church:lg:gap-[2em]',
          children: e.map((t) => (0, jo.jsx)(Gd, { event: t }, t.id)),
        }),
      ],
    });
  }
  var n0 = U(P());
  function Kd() {
    return (0, n0.jsx)('h5', {
      className: 'church:text-center',
      children: 'Small groups are currently not in session',
    });
  }
  var aa = U(P());
  function Jd() {
    return (0, aa.jsx)('div', {
      children: (0, aa.jsx)('button', {
        className:
          'church:ml-[1em] church:mb-[.5em] church:text-[1em] church:font-medium cursor-pointer',
        style: { color: '#808080' },
        children: (0, aa.jsxs)('div', {
          className: 'church:flex church:justify-start',
          children: [
            (0, aa.jsx)('h5', { children: 'MORE INFO' }),
            (0, aa.jsx)('svg', {
              className:
                'church:w-[1.5em] church:h=[1.5em] church:inline-block church:ml-[.5em]',
              style: { color: '#808080' },
              'aria-hidden': 'true',
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              children: (0, aa.jsx)('path', {
                stroke: 'currentColor',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '2',
                d: 'M19 12H5m14 0-4 4m4-4-4-4',
              }),
            }),
          ],
        }),
      }),
    });
  }
  var Ha = U(P());
  function em({ group: e }) {
    return (0, Ha.jsx)('div', {
      className:
        'church:rounded-[.5em] church:overflow-hidden church:shadow-xl church:bg-light church:md:mb-0 church:md:mx-0',
      children: (0, Ha.jsxs)('a', {
        href: e.registration_url,
        target: '_blank',
        children: [
          (0, Ha.jsx)('div', {
            className: 'church:mb-5',
            children: (0, Ha.jsx)('img', {
              src: e.group_img,
              alt: 'group image',
            }),
          }),
          (0, Ha.jsx)(Jd, {}),
        ],
      }),
    });
  }
  var Go = U(P());
  async function tm({ groups: e }) {
    let t = e.filter((n) => n.visibility === !0);
    return (0, Go.jsxs)('div', {
      children: [
        t.length === 0 && (0, Go.jsx)(Kd, {}),
        (0, Go.jsx)('div', {
          className:
            'church:grid church:md:grid-cols-2 church:xl:grid-cols-3 church:gap-[1em] church:lg:gap-[2em]',
          children: t.map((n) => (0, Go.jsx)(em, { group: n }, n.id)),
        }),
      ],
    });
  }
  var iu = U(dt());
  var wt = globalThis.Temporal;
  var a0 = (e, t) => `Non-positive ${e}: ${t}`,
    o0 = (e, t) => `Non-finite ${e}: ${t}`,
    r0 = (e) => `Cannot convert bigint to ${e}`,
    i0 = 'Invalid object',
    yi = (e, t, n, a) => Xo(e, t) + `; must be between ${n}-${a}`,
    Xo = (e, t) => `Invalid ${e}: ${t}`;
  var Cl = 1e3,
    Nl = 1e6,
    wl = 1e9,
    Rl = 6e10,
    $l = 36e11;
  function xl(e) {
    return e === void 0 ? Object.create(null) : om(e);
  }
  function Al(e, t = 'number') {
    if (typeof e == 'bigint') throw new TypeError(r0(t));
    if (((e = Number(e)), !Number.isFinite(e))) throw new RangeError(o0(t, e));
    return e;
  }
  function Ua(e, t) {
    return Math.trunc(Al(e, t)) || 0;
  }
  function Il(e, t) {
    return s0(Ua(e, t), t);
  }
  function s0(e, t = 'number') {
    if (e <= 0) throw new RangeError(a0(t, e));
    return e;
  }
  function am(e, t, n) {
    return Math.min(Math.max(e, t), n);
  }
  function vi(e) {
    return e !== null && (typeof e == 'object' || typeof e == 'function');
  }
  function om(e) {
    if (!vi(e)) throw new TypeError(i0);
    return e;
  }
  function Ft(e) {
    return (t, n, a) => {
      let o = hO(a);
      if (o.roundingMode)
        return t.until(n, { ...o, largestUnit: e, smallestUnit: e })[e];
      let r = t.until(n, { ...o, largestUnit: e });
      if (aO(e)) return r.total(e);
      let i =
        !('day' in t) && 'toPlainDate' in t ? t.toPlainDate({ day: 1 }) : t;
      return r.total({ unit: e, relativeTo: i });
    };
  }
  function aO(e) {
    return (
      e === 'hours' ||
      e === 'minutes' ||
      e === 'seconds' ||
      e === 'milliseconds' ||
      e === 'microseconds' ||
      e === 'nanoseconds'
    );
  }
  var oO = Ft('years'),
    rO = Ft('months'),
    iO = Ft('weeks'),
    sO = Ft('days'),
    lO = Ft('hours'),
    cO = Ft('minutes'),
    uO = Ft('seconds'),
    fO = Ft('milliseconds'),
    dO = Ft('microseconds'),
    mO = Ft('nanoseconds');
  function hO(e) {
    return typeof e == 'string' ? { roundingMode: e } : e || {};
  }
  var vO = Xo;
  var bO = (e) => `Missing ${e}`;
  var SO = (e, t, n) => Xo(e, t) + '; must be ' + Object.keys(n).join(),
    y0 = 'Cannot use valueOf',
    v0 = 'Invalid calling context';
  var b0 = (e, t) => `Unknown calendar ${e}; might need ${t}`,
    TO = (e) => Xo('TimeZone', e),
    Zl = 'Out-of-bounds date';
  var DO = (e) => `Cannot parse: ${e}`,
    MO = (e) => `Invalid substring: ${e}`;
  var S0 = am;
  function Ae(e) {
    throw new RangeError(e);
  }
  function yn(e) {
    throw new TypeError(e);
  }
  function d0(e, t, n, a, o) {
    return fm(
      t,
      ((r, i) => {
        let s = r[i];
        return (s === void 0 && yn(bO(i)), s);
      })(e, t),
      n,
      a,
      o,
    );
  }
  function fm(e, t, n, a, o, r) {
    let i = S0(t, n, a);
    return (
      o &&
        t !== i &&
        Ae(
          ((s, l, c, u, d) => (d ? yi(s, d[l], d[c], d[u]) : yi(s, l, c, u)))(
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
  function Qo(e, t = Map) {
    let n = new t();
    return (a, ...o) => {
      if (n.has(a)) return n.get(a);
      let r = e(a, ...o);
      return (n.set(a, r), r);
    };
  }
  var T0 = (e) => EO({ name: e }, 1),
    EO = (e, t) => Ti((n) => ({ value: n, configurable: 1, writable: !t }), e),
    D0 = (e) => ({ [Symbol.toStringTag]: { value: e, configurable: 1 } });
  function Ti(e, t) {
    let n = {};
    for (let a in t) n[a] = e(t[a], a);
    return n;
  }
  function OO(e, t) {
    let n = {};
    for (let a of e) n[a] = t;
    return n;
  }
  function dm(e) {
    let t = {};
    for (let n of e) t[n] = (a) => a[n];
    return t;
  }
  function kl(e, t, n = Object.create(null)) {
    for (let a of e) n[a] = t[a];
    return n;
  }
  function Wl(e, ...t) {
    return (...n) => e(...t, ...n);
  }
  function mm() {}
  function m0(e) {
    return e[0].toUpperCase() + e.substring(1);
  }
  function hm(e) {
    return new RegExp(`^${e}$`, 'i');
  }
  function CO(e) {
    return parseInt(e.padEnd(9, '0'));
  }
  function NO(e) {
    return e && e !== '+' ? -1 : 1;
  }
  function rm(e) {
    return e === void 0 ? 0 : parseInt(e);
  }
  function Yl(e, t) {
    return String(t).padStart(e, '0');
  }
  var gn = Wl(Yl, 2);
  function wO(e, t) {
    return Math.sign(e - t);
  }
  function M0(e, t) {
    let n = e / t;
    return e % t < 0n ? n - 1n : n;
  }
  function E0(e, t) {
    let n = M0(e, t);
    return [n, e - n * t];
  }
  function oa(e, t) {
    return [Math.floor(e / t), Fl(e, t)];
  }
  function Fl(e, t) {
    return ((e % t) + t) % t;
  }
  function RO(e, t) {
    return Math.trunc(e / t) || 0;
  }
  function Hl(e) {
    return Math.abs(e % 1) === 0.5;
  }
  function $O(e) {
    let t = e
      .normalize('NFD')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    return t === 'bc' || t === 'b' ? 'bce' : t === 'ad' || t === 'a' ? 'ce' : t;
  }
  var ka = void 0;
  function Di(e) {
    return e === ka ? 'iso8601' : e === 0 ? 'gregory' : e.id;
  }
  function xO(e, t) {
    return 'M' + gn(e) + (t ? 'L' : '');
  }
  var AO = {
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
    IO = Object.keys(AO);
  var Mi = Cl,
    Ko = Nl,
    Ya = wl,
    Ei = Rl,
    Pl = $l,
    ql = 864e11;
  var pm = BigInt(Ko),
    Bl = BigInt(Ya);
  var ra = BigInt(ql);
  var Oi = IO.slice(0, 6),
    Ci = dm(Oi);
  var O0 = ['day', 'month', 'year'];
  function C0(e) {
    return (UO(e, 1), e);
  }
  var HO = { hour: 23, minute: 59, second: 59 };
  function UO(e, t) {
    let n = {};
    for (let a of Oi) n[a] = fm(a, e[a], 0, HO[a] || 999, t);
    return n;
  }
  function Vl(e) {
    return N0(e) * Ya + w0(e);
  }
  function N0(e) {
    return 3600 * e.hour + 60 * e.minute + e.second;
  }
  function w0(e) {
    return e.millisecond * Ko + e.microsecond * Mi + e.nanosecond;
  }
  function kO(e) {
    let [t, n] = oa(e, Ko),
      [a, o] = oa(n, Mi);
    return YO(t, a, o);
  }
  function YO(e, t = 0, n = 0) {
    let [a, o] = oa(e, 36e5),
      [r, i] = oa(o, 6e4),
      [s, l] = oa(i, 1e3);
    return {
      hour: a,
      minute: r,
      second: s,
      millisecond: l,
      microsecond: t,
      nanosecond: n,
    };
  }
  function h0(e) {
    let [t, n] = E0(e, Bl);
    return [Number(t), Number(n)];
  }
  function _l(e) {
    return Ni(e) + BigInt(Vl(e));
  }
  function Ni(e) {
    return BigInt(bi(e)) * ra;
  }
  function bi(e) {
    return Si(e.year, e.month, e.day);
  }
  function Si(e, t = 1, n = 1) {
    let a = t - 1;
    return (
      (e += Math.floor(a / 12)),
      (t = Fl(a, 12)),
      Date.UTC((e % 400) - 400, t, 0) / 864e5 + 146097 * (RO(e, 400) + 1) + n
    );
  }
  function wi(e) {
    let [t, n] = E0(e, ra);
    return { ...BO(Number(t)), ...kO(Number(n)) };
  }
  function BO(e) {
    let t = new Date(864e5 * Fl(e, 146097));
    return {
      year: t.getUTCFullYear() + 400 * Math.floor(e / 146097),
      month: t.getUTCMonth() + 1,
      day: t.getUTCDate(),
    };
  }
  function _O(e) {
    return [e, 0];
  }
  function zO(e, t, n) {
    return { year: e, month: t, day: n };
  }
  function R0(e, t) {
    switch (t) {
      case 2:
        return jl(e) ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
    }
    return 31;
  }
  function LO(e) {
    return jl(e) ? 366 : 365;
  }
  function jl(e) {
    return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
  }
  function Ri(e) {
    return Fl(Si(e.year, e.month, e.day) + 4, 7) || 7;
  }
  function $0(e) {
    return Si(e.year, e.month, e.day) - Si(e.year) + 1;
  }
  function gm(e) {
    let t = e.year,
      n = Math.floor(($0(e) - Ri(e) + 10) / 7),
      a = im(t);
    return (
      n < 1 ? (n = a = im(--t)) : n > a && ((n = 1), (a = im(++t))),
      { weekOfYear: n, yearOfWeek: t, Be: a }
    );
  }
  function im(e) {
    let t = Ri({ year: e, month: 1, day: 1 });
    return t === 4 || (t === 3 && jl(e)) ? 53 : 52;
  }
  function ZO({ year: e }) {
    return e < 1 ? { era: 'bce', eraYear: 1 - e } : { era: 'ce', eraYear: e };
  }
  function x0(e) {
    return (A0(e), C0(e));
  }
  function A0(e) {
    return (WO(e, 1), e);
  }
  function WO(e, t) {
    let { year: n } = e,
      a = d0(e, 'month', 1, 12, t);
    return { year: n, month: a, day: d0(e, 'day', 1, R0(n, a), t) };
  }
  function Rt(e, t) {
    return e ? e.ae(t) : t;
  }
  function FO(e, t, n) {
    return e ? e.L(t, n) : _O(n);
  }
  function ym(e, t) {
    return e === 0 ? ZO(t) : (e && e.h?.(t)) || {};
  }
  function I0(e, t, n, a) {
    return e ? e.de(t, n, a) : zO(t, n, a);
  }
  function PO(e, t) {
    return e ? e.j(t) : 12;
  }
  function qO(e, t, n) {
    return e ? e.o(t, n) : R0(t, n);
  }
  function vm(e, t) {
    let { year: n, month: a } = Rt(e, t),
      [o, r] = FO(e, n, a);
    return xO(o, r);
  }
  function Gl(e, t) {
    let { year: n } = Rt(e, t);
    return e ? e.q(n) : jl(n);
  }
  function Xl(e, t) {
    let { year: n } = Rt(e, t);
    return PO(e, n);
  }
  function Ql(e, t) {
    let { year: n, month: a } = Rt(e, t);
    return qO(e, n, a);
  }
  function Kl(e, t) {
    let { year: n } = Rt(e, t);
    return e ? e.i(n) : LO(n);
  }
  function bm(e, t) {
    if (!e) return $0(t);
    let { year: n } = Rt(e, t),
      a = I0(e, n, 1, 1);
    return bi(t) - bi(a) + 1;
  }
  function Sm(e, t) {
    return e === ka ? gm(t).weekOfYear : void 0;
  }
  function Tm(e, t) {
    return e === ka ? gm(t).yearOfWeek : void 0;
  }
  var zl = Wl(VO, 'string');
  function VO(e, t, n = e) {
    return (typeof t !== e && yn(vO(n, t)), t);
  }
  function jO(e, t = 'number') {
    return (
      Number.isInteger(e) || Ae(((n, a) => `Non-integer ${n}: ${a}`)(t, e)),
      e || 0
    );
  }
  function GO(e) {
    return (
      typeof e == 'symbol' && yn('Cannot convert Symbol to string'),
      String(e)
    );
  }
  function H0(e, t) {
    return vi(e) ? String(e) : zl(e, t);
  }
  function U0(e, t) {
    return jO(Al(e, t), t);
  }
  var XO = { compatible: 0, reject: 1, earlier: 2, later: 3 };
  var QO = [
    Math.floor,
    (e) => (Hl(e) ? Math.floor(e) : Math.round(e)),
    Math.ceil,
    (e) => (Hl(e) ? Math.ceil(e) : Math.round(e)),
    Math.trunc,
    (e) => (Hl(e) ? Math.trunc(e) || 0 : Math.round(e)),
    (e) => (e < 0 ? Math.floor(e) : Math.ceil(e)),
    (e) => Math.sign(e) * Math.round(Math.abs(e)) || 0,
    (e) => (Hl(e) ? (e = Math.trunc(e) || 0) + (e % 2) : Math.round(e)),
  ];
  function KO(e, t, n, a = 0) {
    let o = n[e];
    if (o === void 0) return a;
    let r = GO(o),
      i = t[r];
    return (i === void 0 && Ae(SO(e, r, t)), i);
  }
  var JO = Wl(KO, 'disambiguation', XO);
  function k0(e, t) {
    return kl(O0, e, kl(Oi, t));
  }
  var Y0 = BigInt(1e8) * ra,
    Dm = BigInt(-1e8) * ra,
    B0 = Dm - ra;
  function _0(e, t = 1) {
    return (L0(Ni(e), t), e);
  }
  function z0(e) {
    let t = Ni(e);
    return (L0(t), t !== B0 || Vl(e) || Ae(Zl), e);
  }
  function L0(e, t = 1) {
    (e < (t ? B0 : Dm) || e > Y0) && Ae(Zl);
  }
  function Jo(e) {
    return ((e < Dm || e > Y0) && Ae(Zl), e);
  }
  function Z0(e, t) {
    return Jo(Ni(e) + BigInt(Vl(e) - t));
  }
  function W0(e) {
    return { epochNanoseconds: e };
  }
  function Mm(e, t, n) {
    return { calendar: n, timeZone: t, epochNanoseconds: e };
  }
  function F0(e, t) {
    return kl(Oi, e, P0(e, t));
  }
  function P0(e, t) {
    return kl(O0, e, { calendar: t });
  }
  function Em(e) {
    return ((t = e.epochNanoseconds), Number(M0(t, pm)));
    var t;
  }
  function Om(e) {
    return e.epochNanoseconds;
  }
  function lm(e) {
    return q0(e, Ei, 7);
  }
  function q0(e, t, n) {
    return V0(e / t, n) * t;
  }
  function V0(e, t) {
    return QO[t](e);
  }
  var Jl = Qo(eC, WeakMap);
  function eC(e) {
    let { epochNanoseconds: t, timeZone: n } = e,
      a = n.B(t);
    return { ...wi(t + BigInt(a)), offsetNanoseconds: a };
  }
  function j0(e, t, n, a = 0, o = 0, r, i) {
    if (n !== void 0 && a === 1 && (a === 1 || i)) return Z0(t, n);
    (a !== 2 && a !== 0) || _0(t, 0);
    let s = e.N(t);
    if (n !== void 0 && a !== 3) {
      let l = ((c, u, d, f) => {
        let m = _l(u);
        f && (d = lm(d));
        for (let v of c) {
          let g = Number(m - v);
          if ((f && (g = lm(g)), g === d)) return v;
        }
      })(s, t, n, r);
      if (l !== void 0) return l;
      a === 0 && Ae('Invalid TimeZone offset');
    }
    return i ? _l(t) : Cm(e, t, o, s);
  }
  function Cm(e, t, n = 0, a = e.N(t)) {
    if (a.length === 1) return a[0];
    if ((n === 1 && Ae('Ambiguous offset'), a.length))
      return a[n === 3 ? 1 : 0];
    let o = _l(t),
      r = ((s, l) => {
        let c = s.B(l - ra);
        return ((u) => (u > ql && Ae('Out-of-bounds TimeZone gap'), u))(
          s.B(l + ra) - c,
        );
      })(e, o),
      i = wi(o + BigInt(r * (n === 2 ? -1 : 1)));
    return (a = e.N(i))[n === 2 ? 0 : a.length - 1];
  }
  var V$ = 2 ** 53;
  var tC = hm(
    '([+-])(\\d{2})(?::?(\\d{2})(?::?(\\d{2})(?:[.,](\\d{1,9}))?)?)?',
  );
  function nC(e) {
    let t = G0(e);
    return (t === void 0 && Ae(DO(e)), t);
  }
  function G0(e, t) {
    let n = tC.exec(e);
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
          o && r && Ae(MO(r)),
          (s =
            (rm(a[2]) * Pl + rm(a[3]) * Ei + rm(a[4]) * Ya + CO(a[5] || '')) *
            NO(a[1])),
          Math.abs(s) >= ql && Ae('Out-of-bounds offset'),
          s
        );
        var s;
      })(n, t);
  }
  var aC = {
      era: H0,
      month: Il,
      monthCode(e, t) {
        if (typeof e == 'string') return e;
        if (e && typeof e == 'object') {
          let n = e.toString;
          if (typeof n == 'function') return zl(n.call(e), t);
        }
        return zl(e, t);
      },
      day: Il,
    },
    oC = OO(Oi, Ua);
  var rC = Object.assign({}, aC, oC),
    j$ = {
      offset(e) {
        return nC(H0(e));
      },
      ...rC,
    };
  var X0 = Intl.DateTimeFormat;
  function iC(e, t) {
    t < -864e13 && Ae(Zl);
    let n = e.formatToParts(t),
      a = {};
    for (let o of n) a[o.type] = o.value;
    return a;
  }
  var sC = {
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
    sm = -388152e4;
  function Q0(e) {
    return Nm(wi(e.epochNanoseconds), void 0) + 'Z';
  }
  function K0(e) {
    let t = e.calendar,
      n = e.timeZone,
      a = n.B(e.epochNanoseconds);
    return (
      Nm(wi(e.epochNanoseconds + BigInt(a)), void 0) +
      wm(lm(a)) +
      fC(n.id, 0) +
      (t === ka ? '' : eS(Di(t), 0))
    );
  }
  function J0(e) {
    let t = e.calendar;
    return Nm(e, void 0) + (t === ka ? '' : eS(Di(t), 0));
  }
  function Nm(e, t) {
    return lC(e) + 'T' + uC(e, t);
  }
  function lC(e) {
    return cC(e) + '-' + gn(e.day);
  }
  function cC(e) {
    let { year: t } = e;
    return (
      (t < 0 || t > 9999 ? nS(t) + Yl(6, Math.abs(t)) : Yl(4, t)) +
      '-' +
      gn(e.month)
    );
  }
  function uC(e, t) {
    let n = [gn(e.hour), gn(e.minute)];
    return (
      t !== -1 &&
        n.push(
          gn(e.second) +
            ((a, o, r, i) => tS(a * Ko + o * Mi + r, i))(
              e.millisecond,
              e.microsecond,
              e.nanosecond,
              t,
            ),
        ),
      n.join(':')
    );
  }
  function wm(e, t = 0) {
    if (t === 1) return '';
    let [n, a] = oa(Math.abs(e), Pl),
      [o, r] = oa(a, Ei),
      [i, s] = oa(r, Ya);
    return nS(e) + gn(n) + ':' + gn(o) + (i || s ? ':' + gn(i) + tS(s) : '');
  }
  function fC(e, t) {
    return t !== 1 ? '[' + (t === 2 ? '!' : '') + e + ']' : '';
  }
  function eS(e, t) {
    return '[' + (t ? '!' : '') + 'u-ca=' + e + ']';
  }
  var dC = /0+$/;
  function tS(e, t) {
    let n = Yl(9, e);
    return (
      (n = t === void 0 ? n.replace(dC, '') : n.slice(0, t)),
      n ? '.' + n : ''
    );
  }
  function nS(e) {
    return e < 0 ? '-' : '+';
  }
  var mC =
      /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/,
    hC = /[^\w\/:+-]+/;
  function Rm(e) {
    return pC(zl(e));
  }
  function pC(e) {
    return aS(e).id;
  }
  function aS(e) {
    let t = e.toUpperCase(),
      n = ((o) => {
        let r = G0(o, 1);
        if (r !== void 0) return { id: wm(r), X: r, m: r };
      })(t);
    if (n) return { kind: 'fixed', ...n };
    let a =
      t === 'UTC'
        ? 'UTC'
        : ((o) => (
            hC.test(o) && Ae(TO(o)),
            mC.test(o) && Ae('Forbidden ICU TimeZone'),
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
                          ? m0(s).replace(
                              /island|noronha|murdo|rivadavia|urville/,
                              m0,
                            )
                          : s,
                    ),
              )
              .join('/')
          ))(e);
    return gC(a);
  }
  var gC = Qo((e) => {
      if (e === 'UTC') return { kind: 'utc', id: e, m: e };
      let t = e.toUpperCase(),
        n = yC(t);
      return {
        kind: 'named',
        id: e,
        format: n,
        m: n.resolvedOptions().timeZone,
      };
    }),
    yC = Qo(
      (e) =>
        new X0('en-u-hc-h23', {
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
  function $m(e) {
    let t = aS(e);
    return vC(t.id, t);
  }
  var vC = Qo((e, t) =>
      t.kind === 'named'
        ? new um(e, t.m, t.format)
        : new cm(e, t.m, t.kind === 'fixed' ? t.X : 0),
    ),
    cm = class {
      constructor(t, n, a) {
        ((this.id = t), (this.m = n), (this.X = a));
      }
      B() {
        return this.X;
      }
      N(t) {
        return [Z0(t, this.X)];
      }
      O() {}
    },
    um = class {
      constructor(t, n, a) {
        ((this.id = t),
          (this.m = n),
          (this.ke = ((o, r) => {
            let i = Qo(o),
              s = Qo(bC),
              l = 86400 * r;
            function c(d) {
              let [f, m] = g0(d, l),
                v = Ul(f),
                g = Ul(m),
                E = i(v),
                p = i(g);
              return E === p ? E : u(s(v, g), E, p, d);
            }
            function u(d, f, m, v) {
              let g, E;
              for (
                ;
                (v === void 0 ||
                  (g = v < d[0] ? f : v >= d[1] ? m : void 0) === void 0) &&
                (E = d[1] - d[0]);
              ) {
                let p = d[0] + Math.floor(E / 2);
                o(p) === m ? (d[1] = p) : (d[0] = p + 1);
              }
              return g;
            }
            return {
              xe(d) {
                let f = c(d - 86400),
                  m = c(d + 86400),
                  v = d - f,
                  g = d - m;
                if (f === m) return [v];
                let E = c(v);
                return E === c(g) ? [d - E] : f > m ? [v, g] : [];
              },
              we: c,
              O: function d(f, m) {
                if (m > 0 && f >= 864e10) return;
                if (m < 0) {
                  if (f <= sm) return;
                  let b = p0() + 94867200;
                  if (f > b) return d(b, -1);
                }
                let v = m > 0 ? Math.max(f, sm) : f,
                  [g, E] = g0(v, l),
                  p = l * m,
                  h = m > 0 ? Math.max(f, p0()) + 94867200 : sm,
                  y = () => (m < 0 ? E > h : g < h);
                for (; y(); ) {
                  let b = Ul(g),
                    O = Ul(E),
                    x = i(b),
                    C = i(O);
                  if (x !== C) {
                    let $ = s(b, O);
                    u($, x, C);
                    let R = $[0];
                    if ((wO(R, f) || 1) === m) return R;
                  }
                  ((g += p), (E += p));
                }
              },
            };
          })(
            ((o) => (r) => {
              let i = iC(o, 1e3 * r);
              return (
                86400 *
                  Si(
                    ((s) => {
                      let l = s.relatedYear;
                      if (l !== void 0) return parseInt(l);
                      let c = parseInt(s.year);
                      return s.era !== void 0 && $O(s.era) === 'bce'
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
              return sC[r] || 60;
            })(t),
          )));
      }
      B(t) {
        return this.ke.we(((n) => h0(n)[0])(t)) * Ya;
      }
      N(t) {
        let n = 86400 * bi(t) + N0(t),
          a = w0(t);
        return this.ke.xe(n).map((o) => Jo(BigInt(o) * Bl + BigInt(a)));
      }
      O(t, n) {
        let [a, o] = h0(t),
          r = this.ke.O(a + (n > 0 || o ? 1 : 0), n);
        if (r !== void 0) return BigInt(r) * Bl;
      }
    };
  function p0() {
    return Math.floor(Date.now() / 1e3);
  }
  function bC(e, t) {
    return [e, t];
  }
  function g0(e, t) {
    let n = Math.floor(e / t) * t;
    return [n, n + t];
  }
  function Ul(e) {
    return S0(e, -1e10, 864e10);
  }
  function Ll(e) {
    return `(\\d{2})(?:(:?)(\\d{2})(?:\\${e}(\\d{2})(?:[.,](\\d{1,9}))?)?)?`;
  }
  var SC =
    '(?:(?:([+-])(\\d{6}))|(\\d{4}))(-?)(\\d{2})\\4(\\d{2})(?:[T ]' +
    Ll(8) +
    '(Z|([+-])' +
    Ll(15) +
    ')?)?';
  var G$ = hm(SC + '((?:\\[(!?)([^\\]]*)\\]){0,9})'),
    X$ = hm('T?' + Ll(2) + `(([+-])${Ll(9)})?((?:\\[(!?)([^\\]]*)\\]){0,9})`);
  function oS(e, t, n) {
    return Mm(e.epochNanoseconds, t, n);
  }
  function rS(e, t, n) {
    let a = Cm(t, e, ((o) => JO(xl(o)))(n));
    return Mm(Jo(a), t, e.calendar);
  }
  function iS(e) {
    return W0(Jo(BigInt(U0(e)) * pm));
  }
  function TC(e, t, n, a, o) {
    let r = new Set(e),
      i = new Set(t),
      s = new Set(n);
    return (l, c) => {
      let u,
        d,
        f = {},
        m = {},
        v = {},
        g = 0,
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
                  : (g = 1)
                : (v[R] = I));
      }
      let p = u !== void 0,
        h = d !== void 0,
        y = p || h,
        b = Object.keys(f).length > 0,
        O = g || E,
        x = b || p || h,
        C = Object.keys(m).length > 0;
      ((!c && O) || (c && O && !x) || (y && (b || C || g))) &&
        yn('Invalid formatting options');
      let $ = {};
      return (
        y || x || Object.assign($, a),
        Object.assign($, f, m, v),
        p && (o ? Object.assign($, o[u]) : ($.dateStyle = u)),
        h && ($.timeStyle = d),
        $
      );
    };
  }
  var DC = { year: 'numeric', month: 'numeric', day: 'numeric' },
    MC = { hour: 'numeric', minute: 'numeric', second: 'numeric' },
    EC = Object.assign({}, DC, MC),
    OC = ['weekday', 'year', 'month', 'day', 'dateStyle'],
    CC = [
      'dayPeriod',
      'hour',
      'minute',
      'second',
      'fractionalSecondDigits',
      'timeStyle',
    ],
    NC = OC.concat(CC);
  var wC = TC(NC, [], [], { ...EC, timeZoneName: 'short' });
  var sS = 'PlainYearMonth',
    lS = 'PlainMonthDay',
    cS = 'PlainDate',
    uS = 'PlainDateTime',
    fS = 'PlainTime',
    dS = 'ZonedDateTime',
    mS = 'Instant',
    hS = 'Duration',
    pS = 'Calendar';
  function vn(e, t, n, ...a) {
    return (
      Object.defineProperties(t, T0(e)),
      Object.defineProperties(t.prototype, D0('Temporal.' + e)),
      Object.defineProperties(
        t.prototype,
        Ti(
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
  var bn =
    mm.name === 'noop'
      ? (e) => {
          Object.defineProperty(e, '_str_', { value: e.toJSON() });
        }
      : mm;
  function $i() {
    yn(v0);
  }
  function tc() {
    yn(y0);
  }
  var nc = {
    era(e) {
      return ym(e.calendar, e).era;
    },
    eraYear(e) {
      return ym(e.calendar, e).eraYear;
    },
    year(e) {
      return Rt(e.calendar, e).year;
    },
    month(e) {
      return Rt(e.calendar, e).month;
    },
    monthCode(e) {
      return vm(e.calendar, e);
    },
    day(e) {
      return Rt(e.calendar, e).day;
    },
  };
  var $C = {
      daysInMonth(e) {
        return Ql(e.calendar, e);
      },
      daysInYear(e) {
        return Kl(e.calendar, e);
      },
      monthsInYear(e) {
        return Xl(e.calendar, e);
      },
      inLeapYear(e) {
        return Gl(e.calendar, e);
      },
    },
    xC = {
      dayOfWeek(e) {
        return Ri(e);
      },
      dayOfYear(e) {
        return bm(e.calendar, e);
      },
      weekOfYear(e) {
        return Sm(e.calendar, e);
      },
      yearOfWeek(e) {
        return Tm(e.calendar, e);
      },
      daysInWeek() {
        return 7;
      },
      daysInMonth(e) {
        return Ql(e.calendar, e);
      },
      daysInYear(e) {
        return Kl(e.calendar, e);
      },
      monthsInYear(e) {
        return Xl(e.calendar, e);
      },
      inLeapYear(e) {
        return Gl(e.calendar, e);
      },
    };
  function ec(e) {
    return dm(Object.keys(e));
  }
  var xm = ec(Ci);
  var Am = ec(nc);
  (ec($C), ec(xC));
  var gS = `${sS}Record`,
    yS = `${lS}Record`,
    vS = `${cS}Record`,
    ac = `${uS}Record`,
    bS = `${fS}Record`,
    oc = `${dS}Record`,
    rc = `${mS}Record`,
    SS = `${hS}Record`,
    rx = `${pS}Record`,
    AC = new WeakMap(),
    TS = new WeakMap(),
    DS = new WeakMap(),
    MS = new WeakMap();
  function ES(e) {
    return IC(e) || $i();
  }
  function IC(e) {
    return AC.get(e);
  }
  function ic(e) {
    return HC(e) || $i();
  }
  function HC(e) {
    return TS.get(e);
  }
  function sc(e, t) {
    TS.set(e, t);
  }
  function lc(e) {
    return Im(e) || $i();
  }
  function Im(e) {
    return DS.get(e);
  }
  function cc(e, t) {
    DS.set(e, t);
  }
  function uc(e) {
    return Hm(e) || $i();
  }
  function Hm(e) {
    return MS.get(e);
  }
  function fc(e, t) {
    MS.set(e, t);
  }
  function Um(e) {
    return ES(e).id;
  }
  function dc(e) {
    let t = ES(e).ue;
    return (t || Ae(b0(Um(e), 'getExotic or getAny')), t);
  }
  function VC(e) {
    if (e !== void 0) return jC(e);
  }
  function jC(e) {
    return (dc(e), Um(e));
  }
  var xi = uc,
    GC = vn(
      ac,
      class {
        get calendarId() {
          return xi(this).calendarId;
        }
        toJSON() {
          return xi(this).toJSON();
        }
        valueOf() {
          return xi(this).valueOf();
        }
      },
      xi,
      Am,
      xm,
    );
  function XC(e) {
    let t = Object.create(GC.prototype);
    return (fc(t, e), bn(t), t);
  }
  function OS(e, t, n, a, o, r, i, s, l, c) {
    return XC(new wt.PlainDateTime(e, t, n, a, o, r, i, s, l, VC(c)));
  }
  function CS(e, t, n) {
    return NS(xi(e).toZonedDateTime(t, n));
  }
  var ia = lc,
    QC = vn(
      oc,
      class {
        get calendarId() {
          return ia(this).calendarId;
        }
        get timeZoneId() {
          return ia(this).timeZoneId;
        }
        get epochMilliseconds() {
          return ia(this).epochMilliseconds;
        }
        get epochNanoseconds() {
          return ia(this).epochNanoseconds;
        }
        toJSON() {
          return ia(this).toJSON();
        }
        valueOf() {
          return ia(this).valueOf();
        }
      },
      ia,
      Am,
      xm,
    );
  function NS(e) {
    let t = Object.create(QC.prototype);
    return (cc(t, e), bn(t), t);
  }
  function wS(e) {
    return ia(e).offsetNanoseconds;
  }
  var Ai = ic,
    KC = vn(
      rc,
      class {
        get epochMilliseconds() {
          return Ai(this).epochMilliseconds;
        }
        get epochNanoseconds() {
          return Ai(this).epochNanoseconds;
        }
        toJSON() {
          return Ai(this).toJSON();
        }
        valueOf() {
          return Ai(this).valueOf();
        }
      },
    );
  function JC(e) {
    let t = Object.create(KC.prototype);
    return (sc(t, e), bn(t), t);
  }
  function RS(e) {
    return JC(wt.Instant.fromEpochMilliseconds(e));
  }
  function $S(e, t) {
    return NS(Ai(e).toZonedDateTimeISO(t));
  }
  function e2(e) {
    return e === void 0 ? ka : t2(e);
  }
  function t2(e) {
    return dc(e)();
  }
  var mc = uc,
    n2 = vn(
      ac,
      class {
        get calendarId() {
          return Di(mc(this).calendar);
        }
        toJSON() {
          return J0(mc(this));
        }
        valueOf() {
          return tc();
        }
      },
      mc,
      nc,
      Ci,
    );
  function a2(e) {
    let t = Object.create(n2.prototype);
    return (fc(t, e), bn(t), t);
  }
  function xS(e, t, n, a = 0, o = 0, r = 0, i = 0, s = 0, l = 0, c) {
    let u = z0(
        x0(
          Ti(Ua, {
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
      d = e2(c);
    return a2(F0(u, d));
  }
  function AS(e, t, n) {
    return km(rS(mc(e), $m(Rm(t)), n));
  }
  var sa = lc,
    o2 = vn(
      oc,
      class {
        get calendarId() {
          return Di(sa(this).calendar);
        }
        get timeZoneId() {
          return sa(this).timeZone.id;
        }
        get epochMilliseconds() {
          return Em(sa(this));
        }
        get epochNanoseconds() {
          return Om(sa(this));
        }
        toJSON() {
          return K0(sa(this));
        }
        valueOf() {
          return tc();
        }
      },
      r2,
      nc,
      Ci,
    );
  function km(e) {
    let t = Object.create(o2.prototype);
    return (cc(t, e), bn(t), t);
  }
  function r2(e) {
    let t = sa(e);
    return { ...Jl(t), calendar: t.calendar };
  }
  function IS(e) {
    return Jl(sa(e)).offsetNanoseconds;
  }
  var i2 = Ii(
      (e) => ({
        hour: e.hour,
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
      }),
      Pl - 1,
    ),
    s2 = Ii(
      (e) => ({
        hour: e.hour,
        minute: e.minute,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
      }),
      Ei - 1,
    ),
    l2 = Ii(
      (e) => ({
        hour: e.hour,
        minute: e.minute,
        second: e.second,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
      }),
      Ya - 1,
    ),
    c2 = Ii(
      (e) => ({
        hour: e.hour,
        minute: e.minute,
        second: e.second,
        millisecond: e.millisecond,
        microsecond: 0,
        nanosecond: 0,
      }),
      Ko - 1,
    ),
    u2 = Ii(
      (e) => ({
        hour: e.hour,
        minute: e.minute,
        second: e.second,
        millisecond: e.millisecond,
        microsecond: e.microsecond,
        nanosecond: 0,
      }),
      Mi - 1,
    );
  function Ii(e, t = 0) {
    return (n) => {
      let a = sa(n),
        { timeZone: o } = a,
        r = Jl(a),
        i = k0(r, e(r)),
        s = j0(o, i, r.offsetNanoseconds, 2, 0, 1) + BigInt(t);
      return km({ ...a, epochNanoseconds: Jo(s) });
    };
  }
  var hc = ic,
    f2 = vn(
      rc,
      class {
        get epochMilliseconds() {
          return Em(hc(this));
        }
        get epochNanoseconds() {
          return Om(hc(this));
        }
        toJSON() {
          return Q0(hc(this));
        }
        valueOf() {
          return tc();
        }
      },
    );
  function d2(e) {
    let t = Object.create(f2.prototype);
    return (sc(t, e), bn(t), t);
  }
  function HS(e) {
    return d2(iS(e));
  }
  function US(e, t) {
    return km(oS(hc(e), $m(Rm(t))));
  }
  var kS = wt ? wS : IS;
  var Ym = wt ? OS : xS;
  var Bm = wt ? CS : AS;
  var YS = wt ? RS : HS;
  var BS = wt ? $S : US;
  function Fm(e, t) {
    let n = tr(e);
    return ((n[2] += t * 7), Mt(n));
  }
  function ae(e, t) {
    let n = tr(e);
    return ((n[2] += t), Mt(n));
  }
  function Sn(e, t) {
    let n = tr(e);
    return ((n[6] += t), Mt(n));
  }
  function ZS(e, t) {
    return la(e, t) / 7;
  }
  function la(e, t) {
    return (t.valueOf() - e.valueOf()) / (1e3 * 60 * 60 * 24);
  }
  function g2(e, t) {
    return (t.valueOf() - e.valueOf()) / (1e3 * 60 * 60);
  }
  function y2(e, t) {
    return (t.valueOf() - e.valueOf()) / (1e3 * 60);
  }
  function v2(e, t) {
    return (t.valueOf() - e.valueOf()) / 1e3;
  }
  function WS(e, t) {
    let n = X(e),
      a = X(t);
    return {
      years: 0,
      months: 0,
      days: Math.round(la(n, a)),
      milliseconds: t.valueOf() - a.valueOf() - (e.valueOf() - n.valueOf()),
    };
  }
  function Pm(e, t) {
    let n = Ba(e, t);
    return n !== null && n % 7 === 0 ? n / 7 : null;
  }
  function Ba(e, t) {
    return er(e) === er(t) ? Math.round(la(e, t)) : null;
  }
  function X(e) {
    return Mt([e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()]);
  }
  function b2(e) {
    return Mt([
      e.getUTCFullYear(),
      e.getUTCMonth(),
      e.getUTCDate(),
      e.getUTCHours(),
    ]);
  }
  function S2(e) {
    return Mt([
      e.getUTCFullYear(),
      e.getUTCMonth(),
      e.getUTCDate(),
      e.getUTCHours(),
      e.getUTCMinutes(),
    ]);
  }
  function T2(e) {
    return Mt([
      e.getUTCFullYear(),
      e.getUTCMonth(),
      e.getUTCDate(),
      e.getUTCHours(),
      e.getUTCMinutes(),
      e.getUTCSeconds(),
    ]);
  }
  function D2(e, t, n) {
    let a = e.getUTCFullYear(),
      o = _m(e, a, t, n);
    if (o < 1) return _m(e, a - 1, t, n);
    let r = _m(e, a + 1, t, n);
    return r >= 1 ? Math.min(o, r) : o;
  }
  function _m(e, t, n, a) {
    let o = Mt([t, 0, 1 + M2(t, n, a)]),
      r = X(e),
      i = Math.round(la(o, r));
    return Math.floor(i / 7) + 1;
  }
  function M2(e, t, n) {
    let a = 7 + t - n;
    return -((7 + Mt([e, 0, a]).getUTCDay() - t) % 7) + a - 1;
  }
  function E2(e) {
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
  function _S(e) {
    return new Date(
      e[0],
      e[1] || 0,
      e[2] == null ? 1 : e[2],
      e[3] || 0,
      e[4] || 0,
      e[5] || 0,
    );
  }
  function tr(e) {
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
  function FS(e) {
    return !isNaN(e.valueOf());
  }
  function er(e) {
    return (
      e.getUTCHours() * 1e3 * 60 * 60 +
      e.getUTCMinutes() * 1e3 * 60 +
      e.getUTCSeconds() * 1e3 +
      e.getUTCMilliseconds()
    );
  }
  var PS = {};
  function O2(e, t) {
    PS[e] = t;
  }
  function C2(e) {
    return new PS[e]();
  }
  var Zm = class {
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
      return tr(t);
    }
  };
  O2('gregory', Zm);
  function qS(e, t) {
    let n = null,
      a = null;
    return (
      e.start && (n = t.createMarker(e.start)),
      e.end && (a = t.createMarker(e.end)),
      (!n && !a) || (n && a && a < n) ? null : { start: n, end: a }
    );
  }
  function qm(e, t) {
    let n = [],
      { start: a } = t,
      o,
      r;
    for (e.sort(N2), o = 0; o < e.length; o += 1)
      ((r = e[o]),
        r.start > a && n.push({ start: a, end: r.start }),
        r.end > a && (a = r.end));
    return (a < t.end && n.push({ start: a, end: t.end }), n);
  }
  function N2(e, t) {
    return e.start.valueOf() - t.start.valueOf();
  }
  function $t(e, t) {
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
  function VS(e, t) {
    return (
      (e.end === null || t.start === null || e.end > t.start) &&
      (e.start === null || t.end === null || e.start < t.end)
    );
  }
  function xt(e, t) {
    return (e.start === null || t >= e.start) && (e.end === null || t < e.end);
  }
  function jS(e, t) {
    return t.start != null && e < t.start
      ? t.start
      : t.end != null && e >= t.end
        ? new Date(t.end.valueOf() - 1)
        : e;
  }
  function zS(e, t) {
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
  function gc(e, t, n) {
    let a = zS(e, n.calendarSystem),
      o = t ? zS(t, n.calendarSystem) : null;
    return {
      date: a,
      start: a,
      end: o,
      timeZone: n.timeZone,
      localeCodes: n.locale.codes,
    };
  }
  function zm(e) {
    return e % 1 === 0;
  }
  function Lm(e, t) {
    let n = String(e);
    return '000'.substr(0, t - n.length) + n;
  }
  var w2 = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
  function F(e, t) {
    return typeof e == 'string'
      ? R2(e)
      : typeof e == 'object' && e
        ? LS(e)
        : typeof e == 'number'
          ? LS({ [t || 'milliseconds']: e })
          : null;
  }
  function R2(e) {
    let t = w2.exec(e);
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
  function LS(e) {
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
  function GS(e, t) {
    return (
      e.years === t.years &&
      e.months === t.months &&
      e.days === t.days &&
      e.milliseconds === t.milliseconds
    );
  }
  function XS(e, t) {
    return {
      years: e.years - t.years,
      months: e.months - t.months,
      days: e.days - t.days,
      milliseconds: e.milliseconds - t.milliseconds,
    };
  }
  function $2(e) {
    return _a(e) / 365;
  }
  function x2(e) {
    return _a(e) / 30;
  }
  function _a(e) {
    return za(e) / 864e5;
  }
  function za(e) {
    return (
      e.years * (365 * 864e5) +
      e.months * (30 * 864e5) +
      e.days * 864e5 +
      e.milliseconds
    );
  }
  function Hi(e) {
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
  function QS(e, t, n = !1) {
    let a = e.toISOString();
    return (
      (a = a.replace('.000', '')),
      n && (a = a.replace('T00:00:00Z', '')),
      a.length > 10 &&
        (t == null
          ? (a = a.replace('Z', ''))
          : t !== 0 && (a = a.replace('Z', Tc(t, !0)))),
      a
    );
  }
  function La(e) {
    return e.toISOString().replace(/T.*$/, '');
  }
  function Tc(e, t = !1) {
    let n = e < 0 ? '-' : '+',
      a = Math.abs(e),
      o = Math.floor(a / 60),
      r = Math.round(a % 60);
    return t
      ? `${n + Lm(o, 2)}:${Lm(r, 2)}`
      : `GMT${n}${o}${r ? `:${Lm(r, 2)}` : ''}`;
  }
  function be(e) {
    let t = '';
    for (let n of e) t += n.value;
    return t;
  }
  var A2 =
    /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
  function I2(e) {
    let t = A2.exec(e);
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
      if (FS(n)) {
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
  var yc = class {
      constructor(t) {
        ((this.timeZone = t.timeZone),
          (this.calendarSystem = C2(t.calendarSystem)),
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
          n === null || !FS(n) ? null : { marker: n, isTimeUnspecified: !1 }
        );
      }
      parse(t) {
        let n = I2(t);
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
        return er(t) === er(n) &&
          a.getMarkerDay(t) === a.getMarkerDay(n) &&
          a.getMarkerMonth(t) === a.getMarkerMonth(n)
          ? a.getMarkerYear(n) - a.getMarkerYear(t)
          : null;
      }
      diffWholeMonths(t, n) {
        let { calendarSystem: a } = this;
        return er(t) === er(n) && a.getMarkerDay(t) === a.getMarkerDay(n)
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
              : ((a = Pm(t, n)),
                a !== null
                  ? { unit: 'week', value: a }
                  : ((a = Ba(t, n)),
                    a !== null
                      ? { unit: 'day', value: a }
                      : ((a = g2(t, n)),
                        zm(a)
                          ? { unit: 'hour', value: a }
                          : ((a = y2(t, n)),
                            zm(a)
                              ? { unit: 'minute', value: a }
                              : ((a = v2(t, n)),
                                zm(a)
                                  ? { unit: 'second', value: a }
                                  : {
                                      unit: 'millisecond',
                                      value: n.valueOf() - t.valueOf(),
                                    }))))));
      }
      countDurationsBetween(t, n, a) {
        let o;
        return a.years && ((o = this.diffWholeYears(t, n)), o !== null)
          ? o / $2(a)
          : a.months && ((o = this.diffWholeMonths(t, n)), o !== null)
            ? o / x2(a)
            : a.days && ((o = Ba(t, n)), o !== null)
              ? o / _a(a)
              : (n.valueOf() - t.valueOf()) / za(a);
      }
      startOf(t, n) {
        return n === 'year'
          ? this.startOfYear(t)
          : n === 'month'
            ? this.startOfMonth(t)
            : n === 'week'
              ? this.startOfWeek(t)
              : n === 'day'
                ? X(t)
                : n === 'hour'
                  ? b2(t)
                  : n === 'minute'
                    ? S2(t)
                    : n === 'second'
                      ? T2(t)
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
          : D2(t, this.weekDow, this.weekDoy);
      }
      formatToParts(t, n) {
        return n.formatToParts(
          { marker: t, timeZoneOffset: this.offsetForMarker(t) },
          this,
        );
      }
      formatRangeToParts(t, n, a, o = {}) {
        return (
          o.isEndExclusive && (n = Sn(n, -1)),
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
          QS(t, a, n.omitTime)
        );
      }
      timestampToMarker(t) {
        if (this.timeZone === 'local') return Mt(E2(new Date(t)));
        if (this.timeZone === 'UTC') return new Date(t);
        let n = BS(YS(t), this.timeZone);
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
          ? -_S(tr(t)).getTimezoneOffset()
          : this.timeZone === 'UTC'
            ? 0
            : kS(
                Bm(
                  Ym(
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
          ? _S(tr(t))
          : this.timeZone === 'UTC'
            ? new Date(t.valueOf())
            : new Date(
                Bm(
                  Ym(
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
    H2 = new Set([
      'week',
      'meridiem',
      'omitZeroMinute',
      'omitCommas',
      'forceCommas',
      'omitTrailing',
      'weekdayJustify',
    ]),
    pc = /([ap])\.?m\.?/i,
    U2 = /,/g,
    k2 = /\u200e/g,
    Y2 = /[\s.,]+$/,
    Wm = /^\s+$/,
    vc = class {
      constructor(t) {
        let n = {},
          a = {};
        for (let o in t) H2.has(o) ? (a[o] = t[o]) : (n[o] = t[o]);
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
          return [{ type: 'timeZoneName', value: Tc(t.timeZoneOffset) }];
        if (this.weekOnly)
          return z2(
            n.computeWeekNumber(t.marker),
            n.weekTextLong,
            n.weekTextShort,
            n.locale,
            o.week,
          );
        let { normalFormat: r, zeroFormat: i } = this.getFormats(n),
          l = (i && !t.marker.getUTCMinutes() ? i : r).formatToParts(t.marker);
        return B2(l, t, a, o);
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
        return _2(c, t, n, o, r);
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
  function KS(e, t, n) {
    let a = !1,
      o;
    for (let r of e) {
      let i = r.type === 'literal';
      if (i || r.type === 'dayPeriod') {
        let s = r.value;
        if (
          ((s = s.replace(k2, '')), t.omitCommas && (s = s.replace(U2, '')), !i)
        ) {
          let { meridiem: l } = t;
          (l === !1
            ? (s = s.replace(pc, ''))
            : l === 'narrow'
              ? (s = s.replace(pc, (c, u) => u.toLocaleLowerCase()))
              : l === 'short'
                ? (s = s.replace(pc, (c, u) => `${u.toLocaleLowerCase()}m`))
                : l === 'lowercase' &&
                  (s = s.replace(pc, (c) => c.toLocaleLowerCase())),
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
  function B2(e, t, n, a) {
    let o =
        n.timeZoneName === 'short'
          ? t.timeZoneOffset == null
            ? 'UTC'
            : Tc(t.timeZoneOffset)
          : void 0,
      { lastLiteral: r, anyTzInjected: i } = KS(e, a, () => o);
    if (
      (o &&
        !i &&
        (r ? (r.value += ' ') : e.push({ type: 'literal', value: ' ' }),
        e.push({ type: 'timeZoneName', value: o })),
      a.weekdayJustify &&
        e.length === 3 &&
        Wm.test(e[1].value) &&
        e[a.weekdayJustify === 'start' ? 2 : 0].type === 'weekday' &&
        e.reverse(),
      a.forceCommas)
    )
      for (let s of e)
        s.type === 'literal' && Wm.test(s.value) && (s.value = `,${s.value}`);
    return (a.omitTrailing && JS(e), e.filter((s) => s.value));
  }
  function _2(e, t, n, a, o) {
    let r = a.timeZoneName === 'short';
    if (
      (KS(e, o, (i) => {
        if (!r) return;
        let s = i.source === 'endRange' ? n.timeZoneOffset : t.timeZoneOffset;
        return s == null ? 'UTC' : Tc(s);
      }),
      o.forceCommas)
    )
      for (let i of e)
        i.type === 'literal' && Wm.test(i.value) && (i.value = `,${i.value}`);
    return (o.omitTrailing && JS(e), e.filter((i) => i.value));
  }
  function JS(e) {
    let t = e[e.length - 1];
    t?.type === 'literal' &&
      ((t.value = t.value.replace(Y2, '')), t.value || e.pop());
  }
  function z2(e, t, n, a, o) {
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
  var bc = class {
      constructor(t) {
        this.cmdStr = t;
      }
      formatToParts(t, n) {
        let a = n.cmdFormatter(this.cmdStr, gc(t, null, n));
        return Array.isArray(a) ? a : [{ type: 'literal', value: a }];
      }
      formatRangeToParts(t, n, a) {
        let o = a.cmdFormatter(this.cmdStr, gc(t, n, a));
        return Array.isArray(o)
          ? o.map((r) => ({ source: 'shared', ...r }))
          : [{ source: 'shared', type: 'literal', value: o }];
      }
    },
    Sc = class {
      constructor(t) {
        this.func = t;
      }
      formatToParts(t, n) {
        return [{ type: 'literal', value: this.func(gc(t, null, n)) }];
      }
      formatRangeToParts(t, n, a) {
        return [
          { source: 'shared', type: 'literal', value: this.func(gc(t, n, a)) },
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
  function Vm(e) {
    return e * 100 + '%';
  }
  function te(e) {
    return typeof e == 'object' && e
      ? new vc(e)
      : typeof e == 'string'
        ? new bc(e)
        : typeof e == 'function'
          ? new Sc(e)
          : null;
  }
  function At(...e) {
    console.warn('FullCalendar:', ...e);
  }
  var eT = {};
  function Se(e, t) {
    return !e || typeof e == 'string' ? e : (L2(t), '');
  }
  function N(e, t) {
    return typeof e == 'function' ? (n) => Se(e(n), t) : Se(e, t);
  }
  function L2(e) {
    eT[e] ||
      (At(
        `Invalid option \`${e}\`: expected a className string or a falsy value.`,
      ),
      (eT[e] = !0));
  }
  function Z2(e, t) {
    return (n) => {
      let a = n.target.closest(e);
      a && t.call(a, n, a);
    };
  }
  function Xm(e, t, n, a) {
    let o = Z2(n, a);
    return (
      e.addEventListener(t, o),
      () => {
        e.removeEventListener(t, o);
      }
    );
  }
  function oT(e, t, n, a) {
    let o;
    return Xm(e, 'mouseover', t, (r, i) => {
      if (i !== o) {
        ((o = i), n(r, i));
        let s = (l) => {
          ((o = null), a(l, i), i.removeEventListener('mouseleave', s));
        };
        i.addEventListener('mouseleave', s);
      }
    });
  }
  function ki(e) {
    return { onClick: e, ...rT(e) };
  }
  function rT(e) {
    return {
      tabIndex: 0,
      onKeyDown(t) {
        (t.key === 'Enter' || t.key === ' ') && (e(t), t.preventDefault());
      },
    };
  }
  var tT = 0;
  function Qe() {
    return ((tT += 1), String(tT));
  }
  function W2(e) {
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
  function F2(e, t, n) {
    let a, o;
    for (a = 0; a < n.length; a += 1) if (((o = P2(e, t, n[a])), o)) return o;
    return 0;
  }
  function P2(e, t, n) {
    return n.func ? n.func(e, t) : q2(e[n.field], t[n.field]) * (n.order || 1);
  }
  function q2(e, t) {
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
  function iT(e, t) {
    return e === t;
  }
  function Dn(e) {
    let t = e.borderless;
    return {
      borderlessX: !!(e.borderlessX ?? t),
      borderlessTop: !!(e.borderlessTop ?? t),
      borderlessBottom: !!(e.borderlessBottom ?? t),
    };
  }
  var { hasOwnProperty: nr } = Object.prototype;
  function ca(e, t) {
    let n = {};
    for (let a in e) t(e[a], a) && (n[a] = e[a]);
    return n;
  }
  function Wa(e, t) {
    let n = {};
    for (let a in e) n[a] = t(e[a], a);
    return n;
  }
  function Oc(e) {
    let t = [];
    for (let n in e) t.push(e[n]);
    return t;
  }
  function Qm(e) {
    let t = {};
    for (let n of e) t[n] = !0;
    return t;
  }
  function V2(e, t) {
    return typeof e == 'object' && e && typeof t == 'object' && t
      ? Km(e, t, Pt)
      : e === t;
  }
  function Km(e, t, n) {
    if (e === t) return !0;
    for (let a in e) if (nr.call(e, a) && !(a in t)) return !1;
    for (let a in t)
      if (nr.call(t, a) && (!(a in e) || !n(e[a], t[a], a))) return !1;
    return !0;
  }
  function jm(e, t) {
    return typeof e == 'object' && typeof t == 'object' && e && t
      ? Pt(e, t)
      : e === t;
  }
  function Pt(e, t) {
    return Km(e, t, iT);
  }
  function Jm(e, t, n) {
    return Km(e, t, (a, o, r) => {
      let i = n[r];
      return i ? i(a, o) : a === o;
    });
  }
  function sT(e, t) {
    let n = [];
    for (let a in e) nr.call(e, a) && (a in t || n.push(a));
    for (let a in t) nr.call(t, a) && e[a] !== t[a] && n.push(a);
    return n;
  }
  function lT(e, t) {
    return e ? j2(e, t, G2) : t;
  }
  function j2(e, t, n) {
    let a = {};
    for (let o in e) nr.call(e, o) && (o in t || (a[o] = e[o]));
    for (let o in t)
      nr.call(t, o) && (o in e ? (a[o] = n(e[o], t[o])) : (a[o] = t[o]));
    return a;
  }
  function G2(e, t) {
    return Object.assign({}, e, t);
  }
  function Dc(e, t) {
    return Array.isArray(e) && Array.isArray(t) ? Fa(e, t) : e === t;
  }
  function Fa(e, t, n = iT) {
    if (e === t) return !0;
    let a = e.length,
      o;
    if (a !== t.length) return !1;
    for (o = 0; o < a; o += 1) if (!n(e[o], t[o])) return !1;
    return !0;
  }
  var eh = {
      navLinkDayClick: T,
      navLinkWeekClick: T,
      duration: F,
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
      defaultAllDayEventDuration: F,
      defaultTimedEventDuration: F,
      nextDayThreshold: F,
      scrollTime: F,
      scrollTimeReset: Boolean,
      slotMinTime: F,
      slotMaxTime: F,
      popoverFormat: te,
      slotDuration: F,
      snapDuration: F,
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
      nowIndicatorDotClass: Se,
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
      eventOrder: W2,
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
      weekNumberFormat: te,
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
      slotHeaderRowClass: Se,
      slotHeaderDividerClass: N,
      dayMaxEvents: T,
      dayMaxEventRows: T,
      dayMinWidth: Number,
      slotHeaderInterval: F,
      dayHeaderClass: N,
      dayHeaderInnerClass: N,
      dayHeaderContent: T,
      dayHeaderDidMount: T,
      dayHeaderWillUnmount: T,
      dayHeaderAlign: T,
      _dayHeaderSticky: T,
      dayHeaderRowClass: Se,
      dayHeaderDividerClass: N,
      dayRowClass: Se,
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
      eventTimeFormat: te,
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
      dateIncrement: F,
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
      navLinkClass: Se,
      monthStartFormat: te,
      dayCellFormat: te,
      handleCustomRendering: T,
      customRenderingMetaMap: T,
      popoverClass: Se,
      popoverCloseClass: Se,
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
      toolbarTitleClass: Se,
      tableClass: N,
      tableHeaderClass: N,
      tableBodyClass: N,
      nonBusinessHoursClass: Se,
      highlightClass: Se,
      dayHeaders: Boolean,
      dayHeaderFormat: te,
      allDayDividerClass: Se,
      listDaysClass: Se,
      listDayClass: N,
      listDayFormat: nT,
      listDayAltFormat: nT,
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
      singleMonthTitleFormat: te,
      singleMonthDidMount: T,
      singleMonthWillUnmount: T,
      singleMonthClass: N,
      singleMonthHeaderClass: N,
      singleMonthHeaderInnerClass: N,
    },
    Cc = {
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
    th = {
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
    nh = {
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
    cT = {
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
    Pa = {
      dateIncrement: jm,
      headerToolbar: jm,
      footerToolbar: jm,
      buttons: V2,
      plugins: Dc,
      events: Dc,
      eventSources: Dc,
      resources: Dc,
    };
  function Nc(e, t) {
    let n = {},
      a = {};
    for (let o in t) o in e && (n[o] = t[o](e[o], o));
    for (let o in e) o in t || (a[o] = e[o]);
    return { refined: n, extra: a };
  }
  function T(e) {
    return e;
  }
  function nT(e) {
    return e === !1 ? null : te(e);
  }
  function uT(e) {
    let t = Math.floor(la(e.start, e.end)) || 1,
      n = X(e.start),
      a = ae(n, t);
    return { start: n, end: a };
  }
  function ah(e, t = F(0)) {
    let n = null,
      a = null;
    if (e.end) {
      a = X(e.end);
      let o = e.end.valueOf() - a.valueOf();
      o && o >= za(t) && (a = ae(a, 1));
    }
    return (
      e.start && ((n = X(e.start)), a && a <= n && (a = ae(n, 1))),
      { start: n, end: a }
    );
  }
  function Mc(e, t, n, a) {
    return a === 'year'
      ? F(n.diffWholeYears(e, t), 'year')
      : a === 'month'
        ? F(n.diffWholeMonths(e, t), 'month')
        : WS(e, t);
  }
  function oh(e, t) {
    return { instanceId: Qe(), defId: e, range: t };
  }
  function X2(e, t, n, a) {
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
  function qa(e, t, n) {
    let { dateEnv: a, pluginHooks: o, options: r } = n,
      { defs: i, instances: s } = e;
    s = ca(s, (l) => !i[l.defId].recurringDef);
    for (let l in i) {
      let c = i[l];
      if (c.recurringDef) {
        let { duration: u } = c.recurringDef;
        u ||
          (u = c.allDay
            ? r.defaultAllDayEventDuration
            : r.defaultTimedEventDuration);
        let d = Q2(c, u, t, a, o.recurringTypes);
        for (let f of d) {
          let m = oh(l, { start: f, end: a.add(f, u) });
          s[m.instanceId] = m;
        }
      }
    }
    return { defs: i, instances: s };
  }
  function Q2(e, t, n, a, o) {
    let i = o[e.recurringDef.typeId].expand(
      e.recurringDef.typeData,
      { start: a.subtract(n.start, t), end: n.end },
      a,
    );
    return (e.allDay && (i = i.map(X)), i);
  }
  function Za(e, t, n, a, o, r) {
    let i = Mn(),
      s = ih(n);
    for (let l of e) {
      let c = rh(l, t, n, a, s, o, r);
      c && wc(c, i);
    }
    return i;
  }
  function wc(e, t = Mn()) {
    return (
      (t.defs[e.def.defId] = e.def),
      e.instance && (t.instances[e.instance.instanceId] = e.instance),
      t
    );
  }
  function K2(e, t) {
    let n = e.instances[t];
    if (n) {
      let a = e.defs[n.defId],
        o = $c(e, (r) => J2(a, r));
      return ((o.defs[a.defId] = a), (o.instances[n.instanceId] = n), o);
    }
    return Mn();
  }
  function J2(e, t) {
    return !!(e.groupId && e.groupId === t.groupId);
  }
  function Mn() {
    return { defs: {}, instances: {} };
  }
  function Rc(e, t) {
    return {
      defs: { ...e.defs, ...t.defs },
      instances: { ...e.instances, ...t.instances },
    };
  }
  function $c(e, t) {
    let n = ca(e.defs, t),
      a = ca(e.instances, (o) => n[o.defId]);
    return { defs: n, instances: a };
  }
  function fT(e, t) {
    let { defs: n, instances: a } = e,
      o = {},
      r = {};
    for (let i in n) t.defs[i] || (o[i] = n[i]);
    for (let i in a) !t.instances[i] && o[a[i].defId] && (r[i] = a[i]);
    return { defs: o, instances: r };
  }
  function eN(e, t) {
    return Array.isArray(e)
      ? Za(e, null, t, !0)
      : typeof e == 'object' && e
        ? Za([e], null, t, !0)
        : e != null
          ? String(e)
          : null;
  }
  var Ui = {
      display: String,
      editable: Boolean,
      startEditable: Boolean,
      durationEditable: Boolean,
      constraint: T,
      overlap: T,
      allow: T,
      class: Se,
      className: Se,
      color: String,
      contrastColor: String,
    },
    tN = {
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
  function ar(e, t) {
    let n = eN(e.constraint, t);
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
  function nN(e) {
    return e.reduce(aN, tN);
  }
  function aN(e, t) {
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
  var Ec = {
      id: String,
      groupId: String,
      title: String,
      url: String,
      interactive: Boolean,
    },
    dT = { start: T, end: T, date: T, allDay: Boolean },
    oN = { ...Ec, ...dT, extendedProps: T };
  function rh(e, t, n, a, o = ih(n), r, i) {
    let { refined: s, extra: l } = mT(e, n, o),
      c = iN(t, n),
      u = X2(s, c, n.dateEnv, n.pluginHooks.recurringTypes);
    if (u) {
      let f = Gm(s, l, t ? t.sourceId : '', u.allDay, !!u.duration, n, r);
      return (
        (f.recurringDef = {
          typeId: u.typeId,
          typeData: u.typeData,
          duration: u.duration,
        }),
        { def: f, instance: null }
      );
    }
    let d = rN(s, c, n, a);
    if (d) {
      let f = Gm(s, l, t ? t.sourceId : '', d.allDay, d.hasEnd, n, r),
        m = oh(f.defId, d.range);
      return (
        i && f.publicId && i[f.publicId] && (m.instanceId = i[f.publicId]),
        { def: f, instance: m }
      );
    }
    return null;
  }
  function mT(e, t, n = ih(t)) {
    return Nc(e, n);
  }
  function ih(e) {
    return { ...Ui, ...oN, ...e.pluginHooks.eventRefiners };
  }
  function Gm(e, t, n, a, o, r, i) {
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
      ui: ar(e, r),
      extendedProps: { ...(e.extendedProps || {}), ...t },
    };
    for (let l of r.pluginHooks.eventDefMemberAdders) Object.assign(s, l(e));
    return (Object.freeze(s.ui.className), Object.freeze(s.extendedProps), s);
  }
  function rN(e, t, n, a) {
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
      o && i && (i = X(i)),
      l && ((c = l.marker), o && (c = X(c)), i && c <= i && (c = null)),
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
  function iN(e, t) {
    let n = null;
    return (
      e && (n = e.defaultAllDay),
      n == null && (n = t.options.defaultAllDay),
      n
    );
  }
  var sN = { start: T, end: T, allDay: Boolean };
  function hT(e, t, n) {
    let a = lN(e, t),
      { range: o } = a;
    if (!o.start) return null;
    if (!o.end) {
      if (n == null) return null;
      o.end = t.add(o.start, n);
    }
    return a;
  }
  function lN(e, t) {
    let { refined: n, extra: a } = Nc(e, sN),
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
  function cN(e, t) {
    return { ...pT(e.range, t, e.allDay), allDay: e.allDay };
  }
  function sh(e, t, n) {
    return { ...pT(e, t, n), timeZone: t.timeZone };
  }
  function pT(e, t, n) {
    return {
      start: t.toDate(e.start),
      end: t.toDate(e.end),
      startStr: t.formatIso(e.start, { omitTime: n }),
      endStr: t.formatIso(e.end, { omitTime: n }),
    };
  }
  function gT(e, t, n) {
    let a = mT({ editable: !1 }, n),
      o = Gm(a.refined, a.extra, '', e.allDay, !0, n);
    return {
      def: o,
      ui: ST(o, t),
      instance: oh(o.defId, e.range),
      range: e.range,
      isStart: !0,
      isEnd: !0,
    };
  }
  function yT(e, t, n) {
    n.emitter.trigger('select', {
      ...uN(e, n),
      jsEvent: t ? t.origEvent : null,
      view: n.viewApi || n.calendarApi.view,
    });
  }
  function vT(e, t) {
    t.emitter.trigger('unselect', {
      jsEvent: e ? e.origEvent : null,
      view: t.viewApi || t.calendarApi.view,
    });
  }
  function uN(e, t) {
    let n = {};
    for (let a of t.pluginHooks.dateSpanTransforms) Object.assign(n, a(e, t));
    return (Object.assign(n, cN(e, t.dateEnv)), n);
  }
  function aT(e, t, n) {
    let { dateEnv: a, options: o } = n,
      r = t;
    return (
      e
        ? ((r = X(r)), (r = a.add(r, o.defaultAllDayEventDuration)))
        : (r = a.add(r, o.defaultTimedEventDuration)),
      r
    );
  }
  function fN(e, t, n, a) {
    let o = bT(e.defs, t),
      r = Mn();
    for (let i in e.defs) {
      let s = e.defs[i];
      r.defs[i] = dN(s, o[i], n, a);
    }
    for (let i in e.instances) {
      let s = e.instances[i],
        l = r.defs[s.defId];
      r.instances[i] = mN(s, l, o[s.defId], n, a);
    }
    return r;
  }
  function dN(e, t, n, a) {
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
  function mN(e, t, n, a, o) {
    let { dateEnv: r } = o,
      i = a.standardProps && a.standardProps.allDay === !0,
      s = a.standardProps && a.standardProps.hasEnd === !1,
      l = { ...e };
    return (
      i && (l.range = uT(l.range)),
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
          end: aT(t.allDay, l.range.start, o),
        }),
      t.allDay && (l.range = { start: X(l.range.start), end: X(l.range.end) }),
      l.range.end < l.range.start &&
        (l.range.end = aT(t.allDay, l.range.start, o)),
      l
    );
  }
  var Tn = class {
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
        if (t in dT)
          At(
            `Cannot set date-related event property \`${t}\`. Use a method instead.`,
          );
        else if (t === 'id')
          ((n = Ec[t](n)), this.mutate({ standardProps: { publicId: n } }));
        else if (t in Ec)
          ((n = Ec[t](n)), this.mutate({ standardProps: { [t]: n } }));
        else if (t in Ui) {
          let a = Ui[t](n);
          (t === 'editable'
            ? (a = { startEditable: n, durationEditable: n })
            : (a = { [t]: n }),
            this.mutate({ standardProps: { ui: a } }));
        } else
          At(
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
            i = Mc(r.start, o, a, n.granularity);
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
            let r = Mc(this._instance.range.end, o, a, n.granularity);
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
          a.allDay === !0 && (l = uT(l));
          let c = Mc(l.start, i, o, a.granularity);
          if (s) {
            let u = Mc(l.end, s, o, a.granularity);
            GS(c, u)
              ? this.mutate({ datesDelta: c, standardProps: r })
              : this.mutate({ startDelta: c, endDelta: u, standardProps: r });
          } else
            ((r.hasEnd = !1), this.mutate({ datesDelta: c, standardProps: r }));
        }
      }
      moveStart(t) {
        let n = F(t);
        n && this.mutate({ startDelta: n });
      }
      moveEnd(t) {
        let n = F(t);
        n && this.mutate({ endDelta: n });
      }
      moveDates(t) {
        let n = F(t);
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
          o = te(t);
        return this._def.hasEnd
          ? be(n.formatRangeToParts(a.range.start, a.range.end, o))
          : be(n.formatToParts(a.range.start, o));
      }
      mutate(t) {
        let n = this._instance;
        if (n) {
          let a = this._def,
            o = this._context,
            { eventStore: r } = o.getCurrentData(),
            i = K2(r, n.instanceId);
          i = fN(
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
              relatedEvents: Yi(i, o, n),
              revert() {
                o.dispatch({ type: 'RESET_EVENTS', eventStore: r });
              },
            }));
        }
      }
      remove() {
        let t = this._context,
          n = lh(this);
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
          ? new Tn(
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
  function lh(e) {
    let t = e._def,
      n = e._instance;
    return {
      defs: { [t.defId]: t },
      instances: n ? { [n.instanceId]: n } : {},
    };
  }
  function Yi(e, t, n) {
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
  function xc(e) {
    return e.eventRange.instance.instanceId;
  }
  function Bi(e, t, n, a) {
    let o = {},
      r = {},
      i = {},
      s = [],
      l = [],
      c = bT(e.defs, t);
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
        g = !f.allDay && a ? ah(v, a) : v,
        E = $t(g, n);
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
              isStart: g.start && g.start.valueOf() === E.start.valueOf(),
              isEnd: g.end && g.end.valueOf() === E.end.valueOf(),
            }));
    }
    for (let u in o) {
      let d = o[u],
        f = qm(d, n);
      for (let m of f) {
        let v = i[u],
          g = c[v.defId];
        s.push({
          def: v,
          ui: g,
          instance: null,
          range: m,
          isStart: !1,
          isEnd: !1,
        });
      }
    }
    for (let u in r) {
      let d = r[u],
        f = qm(d, n);
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
  function or(e, t) {
    e.fcEventRange = t;
  }
  function Ac(e) {
    return e.fcEventRange || e.parentNode.fcEventRange || null;
  }
  function bT(e, t) {
    return Wa(e, (n) => ST(n, t));
  }
  function ST(e, t) {
    let n = [],
      a = t[''],
      o = t[e.defId];
    return (a && n.push(a), o && n.push(o), n.push(e.ui), nN(n));
  }
  function Ic(e, t) {
    let n = e.map(hN);
    return (n.sort((a, o) => F2(a, o, t)), n.map((a) => a._seg));
  }
  function hN(e) {
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
  function TT(e, t) {
    let { pluginHooks: n } = t,
      a = n.isDraggableTransformers,
      { def: o, ui: r } = e,
      i = r.startEditable;
    for (let s of a) i = s(i, o, r, t);
    return i;
  }
  function DT(e, t, n, a, o, r, i, s = !0, l = !0) {
    let { dateEnv: c, options: u } = i,
      { def: d } = t,
      { displayEventTime: f, displayEventEnd: m } = u;
    (f == null && (f = s !== !1), m == null && (m = l !== !1));
    let v =
        !o && n && X(n).valueOf() !== X(t.instance.range.start).valueOf()
          ? n
          : t.instance.range.start,
      g =
        !r &&
        a &&
        X(Sn(a, -1)).valueOf() !== X(Sn(t.instance.range.end, -1)).valueOf()
          ? a
          : t.instance.range.end;
    if (f && !d.allDay) {
      if (m && (o || r) && d.hasEnd) {
        let E = c.formatRangeToParts(v, g, e),
          p = gN(E);
        return p != null
          ? be(c.formatToParts(v, e)) + p + be(c.formatToParts(g, e))
          : be(E);
      }
      if (o) return be(c.formatToParts(v, e));
    }
    return '';
  }
  var pN = new Set(['year', 'month', 'day']);
  function gN(e) {
    let t,
      n = !1;
    for (let a of e)
      (a.source === 'shared' && (t = a), pN.has(a.type) && (n = !0));
    return n ? t.value : void 0;
  }
  function rr(e, t, n) {
    let a = e.range;
    return {
      isPast: a.end <= (n || t.start),
      isFuture: a.start >= (n || t.end),
      isToday: t && xt(t, a.start),
    };
  }
  function MT(e, t) {
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
        ((l = rT((c) => {
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
  var yN = /(^c|C)lass(Name)?$/,
    vN = /Content$/,
    bN = /(DidMount|WillUnmount)$/,
    SN = /^on[A-Z]/,
    TN = { buttons: lT };
  function ET(...e) {
    let t = {};
    for (let n of e)
      for (let a in n) {
        let o = n[a];
        t[a] ? (t[a] = It(t[a], o)) : (t[a] = o);
      }
    return t;
  }
  function It(...e) {
    let t = {};
    for (let n of e)
      for (let a in n)
        if (a in t) {
          let o =
            TN[a] ||
            (yN.test(a) ? DN : vN.test(a) ? MN : bN.test(a) ? EN : void 0);
          t[a] = o ? o(t[a], n[a], a) : n[a];
        } else t[a] = n[a];
    return t;
  }
  function DN(e, t, n) {
    let a = typeof e == 'function',
      o = typeof t == 'function';
    if (a || o) {
      let r = (i) => D(Se(a ? e(i) : e, n), Se(o ? t(i) : t, n));
      return ((r.parts = [e, t]), r);
    }
    return D(Se(e, n), Se(t, n));
  }
  function MN(e, t) {
    if (typeof t == 'function') {
      let n = (a) => {
        let o = t(a);
        return o === !0 ? (typeof e == 'function' ? e(a) : e) : o;
      };
      return ((n.parts = [e, t]), n);
    }
    return t ?? e;
  }
  function EN(e, t) {
    if (e && t) {
      let n = (...a) => {
        (e(...a), t(...a));
      };
      return ((n.parts = [e, t]), n);
    }
    return e || t;
  }
  function OT(e, t) {
    let n = sT(e, t);
    for (let a of n) if (!SN.test(a)) return !1;
    return !0;
  }
  function Hc(e, t) {
    let n = e && e.parts,
      a = t && t.parts;
    if (n && a) {
      let o = n.length,
        r = a.length;
      if (o !== r) return !1;
      for (let i = 0; i < o; i++)
        if (!(n[i] === a[i] || Hc(n[i], a[i]))) return !1;
      return !0;
    }
    return !1;
  }
  var ON = [],
    NT = {
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
    wT = {
      ...NT,
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
  function RT(e) {
    let t = e.length > 0 ? e[0].code : 'en',
      n = ON.concat(e),
      a = { en: wT };
    for (let o of n) a[o.code] = o;
    return { map: a, defaultCode: t };
  }
  function ch(e, t) {
    return typeof e == 'object' && !Array.isArray(e)
      ? $T(e.code, [e.code], e)
      : CN(e, t);
  }
  function CN(e, t) {
    let n = [].concat(e || []),
      a = NN(n, t) || wT;
    return $T(e, n, a);
  }
  function NN(e, t) {
    for (let n = 0; n < e.length; n += 1) {
      let a = e[n].toLocaleLowerCase().split('-');
      for (let o = a.length; o > 0; o -= 1) {
        let r = a.slice(0, o).join('-');
        if (t[r]) return t[r];
      }
    }
    return null;
  }
  function $T(e, t, n) {
    let a = It(NT, n);
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
  var Uc = class extends Error {
    constructor(t, n) {
      (super(t), (this.response = n));
    }
  };
  function wN(e, t, n) {
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
              throw new Uc('Failure parsing JSON', o);
            },
          );
        throw new Uc('Request failed', o);
      })
    );
  }
  function RN(e, t) {
    t.emitter.trigger('datesSet', {
      ...sh(e.activeRange, t.dateEnv),
      view: t.viewApi,
    });
  }
  function $N(e, t) {
    let { emitter: n } = t;
    n.hasHandlers('eventsSet') && n.trigger('eventsSet', Yi(e, t));
  }
  var xN = {
      ignoreRange: !0,
      parseMeta(e) {
        return Array.isArray(e.events) ? e.events : null;
      },
      fetch(e, t) {
        t({ rawEvents: e.eventSource.meta });
      },
    },
    AN = { name: 'array-event-source', eventSourceDefs: [xN] };
  function IN(e, t, n) {
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
  var HN = {
      parseMeta(e) {
        return typeof e.events == 'function' ? e.events : null;
      },
      fetch(e, t, n) {
        let { dateEnv: a } = e.context,
          o = e.eventSource.meta;
        IN(o.bind(null, sh(e.range, a)), (r) => t({ rawEvents: r }), n);
      },
    },
    UN = { name: 'func-event-source', eventSourceDefs: [HN] },
    kN = {
      method: String,
      extraParams: T,
      startParam: String,
      endParam: String,
      timeZoneParam: String,
    },
    YN = {
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
          o = _N(a, e.range, e.context);
        wN(a.method, a.url, o).then(([r, i]) => {
          t({ rawEvents: r, response: i });
        }, n);
      },
    },
    BN = {
      name: 'json-event-source',
      eventSourceRefiners: kN,
      eventSourceDefs: [YN],
    };
  function _N(e, t, n) {
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
  var zN = {
    name: 'change-handler',
    optionChangeHandlers: {
      controller(e, t) {
        e._setApi(t.calendarApi);
      },
      events(e, t) {
        CT([e], t);
      },
      eventSources: CT,
    },
  };
  function CT(e, t) {
    let n = Oc(t.getCurrentData().eventSources);
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
  var LN = {
    id: String,
    defaultAllDay: Boolean,
    url: String,
    format: String,
    events: T,
    eventDataTransform: T,
    success: T,
    failure: T,
  };
  function uh(e, t, n = xT(t)) {
    let a;
    if (
      (typeof e == 'string'
        ? (a = { url: e })
        : typeof e == 'function' || Array.isArray(e)
          ? (a = { events: e })
          : typeof e == 'object' && e && (a = e),
      a)
    ) {
      let { refined: o, extra: r } = Nc(a, n),
        i = ZN(o, t);
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
          ui: ar(o, t),
          extendedProps: r,
        };
    }
    return null;
  }
  function xT(e) {
    return { ...Ui, ...LN, ...e.pluginHooks.eventSourceRefiners };
  }
  function ZN(e, t) {
    let n = t.pluginHooks.eventSourceDefs;
    for (let a = n.length - 1; a >= 0; a -= 1) {
      let r = n[a].parseMeta(e);
      if (r) return { sourceDefId: a, meta: r };
    }
    return null;
  }
  function AT(e, t, n) {
    let a = t ? t.activeRange : null;
    return UT({}, VN(e, n), a, n);
  }
  function IT(e, t, n, a) {
    let o = n ? n.activeRange : null;
    switch (t.type) {
      case 'ADD_EVENT_SOURCES':
        return UT(e, t.sources, o, a);
      case 'REMOVE_EVENT_SOURCE':
        return WN(e, t.sourceId);
      case 'PREV':
      case 'NEXT':
      case 'CHANGE_DATE':
      case 'CHANGE_VIEW_TYPE':
        return n ? kT(e, o, a) : e;
      case 'FETCH_EVENT_SOURCES':
        return dh(
          e,
          t.sourceIds ? Qm(t.sourceIds) : YT(e, a),
          o,
          t.isRefetch || !1,
          a,
        );
      case 'RECEIVE_EVENTS':
      case 'RECEIVE_EVENT_ERROR':
        return qN(e, t.sourceId, t.fetchId, t.fetchRange);
      case 'REMOVE_ALL_EVENT_SOURCES':
        return {};
      default:
        return e;
    }
  }
  function HT(e, t, n) {
    let a = t ? t.activeRange : null;
    return dh(e, YT(e, n), a, !0, n);
  }
  function fh(e) {
    for (let t in e) if (e[t].isFetching) return !0;
    return !1;
  }
  function UT(e, t, n, a) {
    let o = {};
    for (let r of t) o[r.sourceId] = r;
    return (n && (o = kT(o, n, a)), { ...e, ...o });
  }
  function WN(e, t) {
    return ca(e, (n) => n.sourceId !== t);
  }
  function kT(e, t, n) {
    return dh(
      e,
      ca(e, (a) => FN(a, t, n)),
      t,
      !1,
      n,
    );
  }
  function FN(e, t, n) {
    return BT(e, n)
      ? !n.options.lazyFetching ||
          !e.fetchRange ||
          e.isFetching ||
          t.start < e.fetchRange.start ||
          t.end > e.fetchRange.end
      : !e.latestFetchId;
  }
  function dh(e, t, n, a, o) {
    let r = {};
    for (let i in e) {
      let s = e[i];
      t[i] ? (r[i] = PN(s, n, a, o)) : (r[i] = s);
    }
    return r;
  }
  function PN(e, t, n, a) {
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
            c || At(`Unhandled event source error: ${l.message}`, l),
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
  function qN(e, t, n, a) {
    let o = e[t];
    return o && n === o.latestFetchId
      ? { ...e, [t]: { ...o, isFetching: !1, fetchRange: a } }
      : e;
  }
  function YT(e, t) {
    return ca(e, (n) => BT(n, t));
  }
  function VN(e, t) {
    let n = xT(t),
      a = [].concat(e.eventSources || []),
      o = [];
    (e.initialEvents && a.unshift(e.initialEvents),
      e.events && a.unshift(e.events));
    for (let r of a) {
      let i = uh(r, t, n);
      i && o.push(i);
    }
    return o;
  }
  function BT(e, t) {
    return !t.pluginHooks.eventSourceDefs[e.sourceDefId].ignoreRange;
  }
  var jN = {
      daysOfWeek: T,
      startTime: F,
      endTime: F,
      duration: F,
      startRecur: T,
      endRecur: T,
    },
    GN = {
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
            !a && e.startTime && e.endTime && (a = XS(e.endTime, e.startTime)),
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
        let a = $t(t, { start: e.startRecur, end: e.endRecur });
        return a ? QN(e.daysOfWeek, e.startTime, e.dateEnv, n, a) : [];
      },
    },
    XN = {
      name: 'simple-recurring-event',
      recurringTypes: [GN],
      eventRefiners: jN,
    };
  function QN(e, t, n, a, o) {
    let r = e ? Qm(e) : null,
      i = X(o.start),
      s = o.end,
      l = [];
    for (
      t &&
      (t.milliseconds < 0
        ? (s = ae(s, 1))
        : t.milliseconds >= 1e3 * 60 * 60 * 24 && (i = ae(i, -1)));
      i < s;
    ) {
      let c;
      ((!r || r[i.getUTCDay()]) &&
        (t ? (c = a.add(i, t)) : (c = i), l.push(a.createMarker(n.toDate(c)))),
        (i = ae(i, 1)));
    }
    return l;
  }
  var _T = [
    AN,
    UN,
    BN,
    XN,
    zN,
    {
      name: 'misc',
      isLoadingFuncs: [(e) => fh(e.eventSources)],
      propSetHandlers: { dateProfile: RN, eventStore: $N },
    },
  ];
  var s1 = U(dt(), 1);
  var Zc = U(P(), 1),
    Je = U(dt(), 1),
    i1 = U(oo(), 1);
  var ut = U(dt(), 1);
  function B(e, t, n) {
    let a, o;
    return function (...r) {
      if (!a) o = e.apply(this, r);
      else if (!Fa(a, r)) {
        n && n(o);
        let i = e.apply(this, r);
        (!t || !t(i, o)) && (o = i);
      }
      return ((a = r), o);
    };
  }
  function ua(e, t, n) {
    let a, o;
    return (r) => {
      if (!a) o = e.call(this, r);
      else if (!Pt(a, r)) {
        n && n(o);
        let i = e.call(this, r);
        (!t || !t(i, o)) && (o = i);
      }
      return ((a = r), o);
    };
  }
  var En = (0, ut.createContext)({});
  function zT(e, t, n, a, o, r, i, s, l, c, u, d, f, m) {
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
  var qt = class extends ut.Component {
    shouldComponentUpdate(t, n) {
      return (
        !Jm(this.props, t, this.propEquality) ||
        !Jm(this.state, n, this.stateEquality)
      );
    }
  };
  qt.addPropsEquality = KN;
  qt.addStateEquality = JN;
  qt.contextType = En;
  qt.prototype.propEquality = {};
  qt.prototype.stateEquality = {};
  var W = class extends qt {};
  W.contextType = En;
  function KN(e) {
    let t = Object.create(this.prototype.propEquality);
    (Object.assign(t, e), (this.prototype.propEquality = t));
  }
  function JN(e) {
    let t = Object.create(this.prototype.stateEquality);
    (Object.assign(t, e), (this.prototype.stateEquality = t));
  }
  function j(e, t) {
    typeof e == 'function' ? e(t) : e && (e.current = t);
  }
  var _i = class extends W {
    constructor() {
      (super(...arguments),
        (this.id = Qe()),
        (this.queuedDomNodes = []),
        (this.currentDomNodes = []),
        (this.handleEl = (t) => {
          ((this.el = t), this.props.elRef && j(this.props.elRef, t));
        }));
    }
    render() {
      let { props: t, context: n } = this,
        { options: a } = n,
        { customGenerator: o, defaultGenerator: r, renderProps: i } = t,
        s = LT(t, '', this.handleEl),
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
      } else l = !ew(t.generatorName, a);
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
      if (!Fa(t, n)) {
        for (let o of n) o.remove();
        for (let o of t) a.appendChild(o);
        this.currentDomNodes = t;
      }
    }
  };
  _i.addPropsEquality({ renderProps: Pt, attrs: OT, style: Pt });
  function ew(e, t) {
    return !!(t.handleCustomRendering && e && t.customRenderingMetaMap?.[e]);
  }
  function LT(e, t, n) {
    let a = { ...e.attrs, ref: n };
    return (
      (e.className || t) && (a.className = D(t, e.className, a.className)),
      e.style && (a.style = e.style),
      a
    );
  }
  var tw = (0, ut.createContext)(0),
    ce = class extends ut.Component {
      constructor() {
        (super(...arguments),
          (this.InnerContent = nw.bind(void 0, this)),
          (this.handleEl = (t) => {
            ((this.el = t),
              this.props.elRef &&
                (j(this.props.elRef, t),
                t && this.didMountMisfire && this.componentDidMount()));
          }));
      }
      render() {
        let { props: t } = this,
          n = w(t.classNameGenerator, t.renderProps);
        if (t.children) {
          let a = LT(t, n, this.handleEl),
            o = t.children(this.InnerContent, t.renderProps, a);
          return t.tag ? (0, ut.createElement)(t.tag, a, o) : o;
        } else
          return (0, ut.createElement)(_i, {
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
  ce.contextType = tw;
  function nw(e, t) {
    let n = e.props;
    return (0, ut.createElement)(_i, {
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
  function zi(e) {
    return e.text;
  }
  function Ke(e) {
    return e.height === 'auto' || e.contentHeight === 'auto';
  }
  function mh(e) {
    let { tableHeaderSticky: t } = e;
    return ((t == null || t === 'auto') && (t = Ke(e)), t);
  }
  function ZT(e) {
    let t = Ke(e),
      { footerScrollbarSticky: n } = e;
    return ((n == null || n === 'auto') && (n = t), !!n && t);
  }
  function WT(e) {
    let t = e.scrollerSyncerClass;
    if (!t) throw new RangeError('Must import @fullcalendar/scrollgrid');
    return t;
  }
  var ir = class {
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
            (s = r.add(i, F(1, n)).valueOf() - t.valueOf()))
          : ((i = t), (s = 1e3 * 60)),
        (s = Math.min(1e3 * 60 * 60 * 24, s)),
        { nowDate: i, todayRange: aw(i), waitMs: s }
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
  function aw(e) {
    let t = X(e),
      n = ae(t, 1);
    return { start: t, end: n };
  }
  var ue = U(P(), 1);
  var sr = class {
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
        o && (t = jS(t, i)),
        (s = this.buildCurrentRangeInfo(t, a)),
        (l = /^(year|month|week|day)$/.test(s.unit)),
        (c = this.buildRenderRange(this.trimHiddenDays(s.range), s.unit, l)),
        (c = this.trimHiddenDays(c)),
        (u = c),
        r.showNonCurrentDates || (u = $t(u, s.range)),
        (u = this.adjustActiveRange(u)),
        (u = $t(u, i)),
        (d = VS(s.range, i)),
        xt(c, t) || (t = c.start),
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
                (r = Hi(o).unit),
                (i = this.buildRangeFromDuration(t, n, o, r))),
        { duration: o, unit: r, range: i }
      );
    }
    getFallbackDuration() {
      return F({ day: 1 });
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
          (_a(o) < 0 && ((i = X(i)), (i = n.add(i, o))),
          _a(r) > 1 && ((s = X(s)), (s = ae(s, -1)), (s = n.add(s, r)))),
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
        d && za(d) < za(a) ? (i = Hi(d).unit) : (i = o);
      }
      _a(a) <= 1 &&
        this.isHiddenDay(s) &&
        ((s = this.skipHiddenDays(s, n)), (s = X(s)));
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
        (s = X(s)),
        (s = this.skipHiddenDays(s, n)),
        (l = s));
      do ((l = ae(l, 1)), this.isHiddenDay(l) || (i += 1));
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
        n || ((a = this.props.dateAlignment) ? F(1, a) : t || F({ days: 1 }))
      );
    }
    refineRange(t) {
      if (t) {
        let n = qS(t, this.props.dateEnv);
        return (n && (n = ah(n)), n);
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
        t = ae(t, n);
      return t;
    }
  };
  function hh(e, t) {
    let { currentRange: n } = e;
    if (e.currentRangeUnit === 'year')
      return t.diffWholeYears(n.start, n.end) > 1 ? 'year' : 'month';
    if (e.currentRangeUnit === 'month') {
      if (t.diffWholeMonths(n.start, n.end) > 1) return 'month';
    } else if (e.currentRangeUnit === 'week') {
      if (Pm(n.start, n.end) > 1) return 'week';
    } else if (e.currentRangeUnit === 'day' && Ba(n.start, n.end) > 1)
      return 'day';
  }
  function ph(e, t, n) {
    if (e.valueOf() === X(e).valueOf()) {
      if (t === 'year') return !n.getMonth(e) && n.getDay(e) === 1;
      if (t === 'month') return n.getDay(e) === 1;
      if (t === 'week') return e.getUTCDay() === n.weekDow;
      if (t === 'day') return !0;
    }
    return !1;
  }
  function PT(e, t, n, a, o) {
    switch (t.type) {
      case 'RECEIVE_EVENTS':
        return ow(e, n[t.sourceId], t.fetchId, t.fetchRange, t.rawEvents, o);
      case 'RESET_RAW_EVENTS':
        return rw(e, n[t.sourceId], t.rawEvents, a.activeRange, o);
      case 'ADD_EVENTS':
        return iw(e, t.eventStore, a ? a.activeRange : null, o);
      case 'RESET_EVENTS':
        return t.eventStore;
      case 'MERGE_EVENTS':
        return Rc(e, t.eventStore);
      case 'PREV':
      case 'NEXT':
      case 'CHANGE_DATE':
      case 'CHANGE_VIEW_TYPE':
        return a ? qa(e, a.activeRange, o) : e;
      case 'REMOVE_EVENTS':
        return fT(e, t.eventStore);
      case 'REMOVE_EVENT_SOURCE':
        return VT(e, t.sourceId);
      case 'REMOVE_ALL_EVENT_SOURCES':
        return $c(e, (r) => !r.sourceId);
      case 'REMOVE_ALL_EVENTS':
        return Mn();
      default:
        return e;
    }
  }
  function ow(e, t, n, a, o, r) {
    if (t && n === t.latestFetchId) {
      let i = Za(qT(o, t, r), t, r);
      return (a && (i = qa(i, a, r)), Rc(VT(e, t.sourceId), i));
    }
    return e;
  }
  function rw(e, t, n, a, o) {
    let { defIdMap: r, instanceIdMap: i } = sw(e),
      s = Za(qT(n, t, o), t, o, !1, r, i);
    return qa(s, a, o);
  }
  function qT(e, t, n) {
    let a = n.options.eventDataTransform,
      o = t ? t.eventDataTransform : null;
    return (o && (e = FT(e, o)), a && (e = FT(e, a)), e);
  }
  function FT(e, t) {
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
  function iw(e, t, n, a) {
    return (n && (t = qa(t, n, a)), Rc(e, t));
  }
  function gh(e, t, n) {
    let { defs: a } = e,
      o = Wa(e.instances, (r) =>
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
  function VT(e, t) {
    return $c(e, (n) => n.sourceId !== t);
  }
  function sw(e) {
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
  var Li = class {
    constructor(t) {
      ((this.component = t.component),
        (this.isHitComboAllowed = t.isHitComboAllowed || null));
    }
    destroy() {}
  };
  function jT(e, t) {
    return {
      component: e,
      el: t.el,
      useEventCenter: t.useEventCenter != null ? t.useEventCenter : !0,
      isHitComboAllowed: t.isHitComboAllowed || null,
    };
  }
  var yh = {};
  var lr = class {
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
      lw(this.handlers, t, n);
    }
    off(t, n) {
      cw(this.handlers, t, n);
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
  function lw(e, t, n) {
    (e[t] || (e[t] = [])).push(n);
  }
  function cw(e, t, n) {
    n ? e[t] && (e[t] = e[t].filter((a) => a !== n)) : delete e[t];
  }
  var Va = U(dt(), 1),
    vh = U(oo(), 1);
  function uw(e) {
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
  function fw(e, t) {
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
          let l = (n[s] = uw(i));
          ((a = mw(a, l)), o(i.deps || []));
        }
      }
    }
    return (e && o(e), o(t), a);
  }
  function dw() {
    let e = [],
      t = [],
      n;
    return (a, o) => (
      (!n || !Fa(a, e) || !Fa(o, t)) && (n = fw(a, o)),
      (e = a),
      (t = o),
      n
    );
  }
  function mw(e, t) {
    return {
      premiumReleaseDate: hw(e.premiumReleaseDate, t.premiumReleaseDate),
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
      views: ET(e.views, t.views),
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
  function hw(e, t) {
    return e === void 0
      ? t
      : t === void 0
        ? e
        : new Date(Math.max(e.valueOf(), t.valueOf()));
  }
  function pw(e, t) {
    let n = {},
      a;
    for (a in e) bh(a, n, e, t);
    for (a in t) bh(a, n, e, t);
    return n;
  }
  function bh(e, t, n, a) {
    if (t[e]) return t[e];
    let o = gw(e, t, n, a);
    return (o && (t[e] = o), o);
  }
  function gw(e, t, n, a) {
    let o = n[e],
      r = a[e],
      i = (u) => (o && o[u] !== null ? o[u] : r && r[u] !== null ? r[u] : null),
      s = i('component'),
      l = i('superType'),
      c = null;
    if (l) {
      if (l === e)
        throw new Error("Can't have a custom view type that references itself");
      c = bh(l, t, n, a);
    }
    return (
      !s && c && (s = c.component),
      s
        ? {
            type: e,
            component: s,
            defaults: It(c ? c.defaults : {}, o ? o.rawOptions : {}),
            overrides: It(c ? c.overrides : {}, r ? r.rawOptions : {}),
          }
        : null
    );
  }
  function GT(e) {
    return Wa(e, yw);
  }
  function yw(e) {
    let t = typeof e == 'function' ? { component: e } : e,
      { component: n } = t;
    return (
      t.content
        ? (n = XT(t.content))
        : n && !(n.prototype instanceof W) && (n = XT(n)),
      { superType: t.type, component: n, rawOptions: t }
    );
  }
  function XT(e) {
    return (t) =>
      (0, ue.jsx)(En.Consumer, {
        children: (n) => {
          let { options: a, viewSpec: o } = n,
            r = {
              ...t,
              nextDayThreshold: a.nextDayThreshold,
              ...Dn(a),
              options: {
                headerToolbar: a.headerToolbar,
                footerToolbar: a.footerToolbar,
              },
              isHeightAuto: Ke(a),
              view: n.viewApi,
            };
          return (0, ue.jsx)(ce, {
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
  function vw(e, t, n) {
    let a = GT(e),
      o = GT(t.views),
      r = pw(a, o);
    return Wa(r, (i) => bw(i, o, t, n));
  }
  function bw(e, t, n, a) {
    let o =
        e.overrides.duration || e.defaults.duration || a.duration || n.duration,
      r = null,
      i = '',
      s = '',
      l = {};
    if (o && ((r = Sw(o)), r)) {
      let c = Hi(r);
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
  var QT = {};
  function Sw(e) {
    let t = JSON.stringify(e),
      n = QT[t];
    return (n === void 0 && ((n = F(e)), (QT[t] = n)), n);
  }
  function Tw(e, t) {
    return (t.type === 'CHANGE_VIEW_TYPE' && (e = t.viewType), e);
  }
  function Dw(e, t) {
    return t.type === 'CHANGE_DATE' ? t.dateMarker : e;
  }
  function Mw(e, t, n) {
    let a = e.initialDate;
    return a != null ? t.createMarker(a) : n.getDateMarker();
  }
  function Ew(e, t) {
    return t.type === 'SET_OPTION'
      ? { ...e, [t.optionName]: t.rawOptionValue }
      : e;
  }
  function Ow(e, t, n, a, o) {
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
  function Cw(e, t) {
    switch (t.type) {
      case 'UNSELECT_DATES':
        return null;
      case 'SELECT_DATES':
        return t.selection;
      default:
        return e;
    }
  }
  function Nw(e, t) {
    switch (t.type) {
      case 'UNSELECT_EVENT':
        return '';
      case 'SELECT_EVENT':
        return t.eventInstanceId;
      default:
        return e;
    }
  }
  function ww(e, t) {
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
  function Rw(e, t) {
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
  function $w(e, t, n) {
    let a = e.headerToolbar ? KT(e.headerToolbar, e, t, n) : null,
      o = e.footerToolbar ? KT(e.footerToolbar, e, t, n) : null;
    return { header: a, footer: o };
  }
  function KT(e, t, n, a) {
    let o = t.direction === 'rtl',
      r = [],
      i = !1;
    function s(c) {
      let u = xw(c, t, n, a);
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
  function xw(e, t, n, a) {
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
            g,
            E;
          if ((f = n[d])) {
            s.push(d);
            let p = f.optionDefaults.buttonTextKey;
            ((v =
              m.text ||
              (p ? t[p] : '') ||
              (f.singleUnit
                ? t[f.singleUnit + 'TextLong'] || t[f.singleUnit + 'Text']
                : '') ||
              d),
              (g = We(m.hint || t.viewHint, [v, d], v)),
              (E = (h) => {
                (m?.click?.(h), h.defaultPrevented || a.changeView(d));
              }));
          } else
            ((v = m.text || t[d + 'TextLong'] || t[d + 'Text'] || d),
              d === 'prevYear'
                ? (g = We(m.hint || t.prevHint, [t.yearText, 'year'], v))
                : d === 'nextYear'
                  ? (g = We(m.hint || t.nextHint, [t.yearText, 'year'], v))
                  : (g = (p) =>
                      We(
                        m.hint || t[d + 'Hint'],
                        [t[p + 'TextLong'] || t[p + 'Text'], p],
                        v,
                      )),
              (E = (p) => {
                (m?.click?.(p), p.defaultPrevented || a[d]?.());
              }));
          return {
            name: d,
            isView: !!f,
            buttonText: v,
            buttonHint: g,
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
  var Sh = class {
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
    Aw = {
      startTime: '09:00',
      endTime: '17:00',
      daysOfWeek: [1, 2, 3, 4, 5],
      display: 'inverse-background',
      className: '',
      groupId: '_businessHours',
    };
  function Iw(e, t) {
    return Za(Hw(e), null, t);
  }
  function Hw(e) {
    let t;
    return (
      e === !0
        ? (t = [{}])
        : Array.isArray(e)
          ? (t = e.filter((n) => n.daysOfWeek))
          : typeof e == 'object' && e
            ? (t = [e])
            : (t = []),
      (t = t.map((n) => ({ ...Aw, ...n }))),
      t
    );
  }
  function Uw(e, t, n) {
    let a;
    /^(year|month)$/.test(e.currentRangeUnit)
      ? (a = e.currentRange)
      : (a = e.activeRange);
    let o,
      r = { isEndExclusive: e.isRangeAllDay };
    return (
      t.titleFormat
        ? (o = n.formatRangeToParts(a.start, a.end, te(t.titleFormat), r))
        : ((o = n.formatRangeToParts(
            a.start,
            a.end,
            te(JT(e, t.disallowAmbigTitle, 'long')),
            r,
          )),
          kw(o) &&
            (o = n.formatRangeToParts(
              a.start,
              a.end,
              te(JT(e, t.disallowAmbigTitle, 'short')),
              r,
            ))),
      be(o)
    );
  }
  function JT(e, t, n) {
    let { currentRangeUnit: a } = e;
    if (a === 'year') return { year: 'numeric' };
    if (a === 'month') return { year: 'numeric', month: n };
    if (!t) {
      let o = Ba(e.currentRange.start, e.currentRange.end);
      if (o !== null && o > 1) return { year: 'numeric', month: n };
    }
    return { year: 'numeric', month: 'long', day: 'numeric' };
  }
  function kw(e) {
    let t = !1,
      n = !1;
    for (let a of e)
      a.type === 'month' &&
        (a.source === 'startRange' && (t = !0),
        a.source === 'endRange' && (n = !0));
    return t && n;
  }
  var kc = class {
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
    Yc = class {
      constructor(t) {
        ((this.computeCurrentViewData = B(this._computeCurrentViewData)),
          (this.organizeRawLocales = B(RT)),
          (this.buildLocale = B(ch)),
          (this.buildPluginHooks = dw()),
          (this.buildDateEnv = B(Yw)),
          (this.parseToolbars = B($w)),
          (this.buildViewSpecs = B(vw)),
          (this.buildDateProfileGenerator = ua(Bw)),
          (this.buildViewApi = B(_w)),
          (this.buildViewUiProps = ua(Zw)),
          (this.buildEventUiBySource = B(zw, Pt)),
          (this.buildEventUiBases = B(Lw)),
          (this.parseContextBusinessHours = ua(Ww)),
          (this.buildToolbarProps = B(Fw)),
          (this.buildTitle = B(Uw)),
          (this.nowManager = new kc()),
          (this.isDrainingActionQueue = !1),
          (this.actionQueue = []),
          (this.optionOverrides = {}),
          (this.emitter = new lr()),
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
          (this.nowManager = new kc()),
          (this.nowTimer = new ir(this.handleNowChange)));
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
          i = r ? {} : Ew(t.dynamicOptionOverrides, a),
          s = this.computeOptionsData(this.optionOverrides, i, o.calendarApi),
          l = r
            ? s.calendarOptions.initialView || s.pluginHooks.initialView
            : Tw(t.currentViewType, a),
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
            ? Mw(s.calendarOptions, s.dateEnv, this.nowManager)
            : Dw(t.currentDate, a),
          m;
        (r
          ? (m = c.dateProfileGenerator.build(f, d))
          : ((m = t.dateProfile),
            n &&
              n.dateProfileGenerator !== c.dateProfileGenerator &&
              (m = c.dateProfileGenerator.build(f, d)),
            (m = Ow(m, a, f, d, c.dateProfileGenerator))),
          ((a && (a.type === 'PREV' || a.type === 'NEXT')) ||
            !xt(m.activeRange, f)) &&
            (f = m.currentRange.start));
        let v = r ? AT(s.calendarOptions, m, u) : IT(t.eventSources, a, m, u),
          g = r ? Mn() : PT(t.eventStore, a, v, m, u),
          E = fh(v),
          p = r
            ? Mn()
            : (E &&
                !c.options.progressiveEventRendering &&
                t.renderableEventStore) ||
              g,
          { eventUiSingleBase: h, selectionConfig: y } =
            this.buildViewUiProps(u),
          b = this.buildEventUiBySource(v),
          O = r ? {} : this.buildEventUiBases(p.defs, h, b),
          x = {
            dynamicOptionOverrides: i,
            currentViewType: l,
            currentDate: f,
            dateProfile: m,
            eventSources: v,
            eventStore: g,
            renderableEventStore: p,
            selectionConfig: y,
            eventUiBases: O,
            businessHours: this.parseContextBusinessHours(u),
            dateSelection: r ? null : Cw(t.dateSelection, a),
            eventSelection: r ? '' : Nw(t.eventSelection, a),
            eventDrag: r ? null : ww(t.eventDrag, a),
            eventResize: r ? null : Rw(t.eventResize, a),
            nowDate: d,
          },
          C = { ...u, ...x };
        for (let ma of s.pluginHooks.reducers) Object.assign(x, ma(t, a, C));
        let $ = t ? e1(t, u) : !1,
          R = e1(x, u);
        !$ && R
          ? this.emitter.trigger('loading', !0)
          : $ && !R && this.emitter.trigger('loading', !1);
        let I = this.buildTitle(m, c.options, s.dateEnv),
          Ce = this.buildToolbarProps(
            c.viewSpec,
            m,
            c.dateProfileGenerator,
            f,
            d,
            I,
          ),
          Te = {
            viewTitle: I,
            nowManager: this.nowManager,
            calendarApi: o.calendarApi,
            dispatch: this.dispatch,
            emitter: this.emitter,
            getCurrentData: this.getCurrentData,
            toolbarProps: Ce,
            ...s,
            ...c,
            ...x,
          },
          jt = s.pluginHooks.optionChangeHandlers,
          Vi = n && n.calendarOptions,
          ji = s.calendarOptions;
        if (Vi && Vi !== ji) {
          Vi.timeZone !== ji.timeZone &&
            ((x.eventSources = Te.eventSources = HT(Te.eventSources, m, Te)),
            (x.eventStore = Te.eventStore =
              gh(Te.eventStore, n.dateEnv, Te.dateEnv)),
            (x.renderableEventStore = Te.renderableEventStore =
              gh(Te.renderableEventStore, n.dateEnv, Te.dateEnv)));
          for (let ma in jt)
            (this.optionsForHandling.indexOf(ma) !== -1 || Vi[ma] !== ji[ma]) &&
              jt[ma](ji[ma], Te);
        }
        return (
          (this.optionsForHandling = []),
          { state: x, data: Te, calendarContext: u }
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
        let { locales: a, locale: o } = It(Cc, t, n),
          r = this.organizeRawLocales(a),
          i = r.map,
          s = this.buildLocale(o || r.defaultCode, i).options,
          l = this.buildPluginHooks(t.plugins || [], _T),
          c = (this.currentCalendarOptionsRefiners = {
            ...eh,
            ...th,
            ...nh,
            ...l.listenerRefiners,
            ...l.optionRefiners,
          }),
          u = It(Cc, ...l.optionDefaults, s, n1(It(t, n), c)),
          d = {},
          f = this.currentCalendarOptionsInput,
          m = this.currentCalendarOptionsRefined,
          v = !1;
        for (let g in u)
          this.optionsForRefining.indexOf(g) === -1 &&
          (u[g] === f[g] ||
            (Pa[g] && g in f && Pa[g](f[g], u[g])) ||
            Hc(f[g], u[g]))
            ? (d[g] = m[g])
            : c[g] && ((d[g] = c[g](u[g], g)), (v = !0));
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
            ...eh,
            ...th,
            ...nh,
            ...cT,
            ...n.listenerRefiners,
            ...n.optionRefiners,
          },
          s = It(
            Cc,
            ...n.optionDefaults,
            t.optionDefaults,
            a,
            n1(It(o, t.optionOverrides, r), i),
          ),
          l = {},
          c = this.currentViewOptionsInput,
          u = this.currentViewOptionsRefined,
          d = !1;
        for (let f in s)
          s[f] === c[f] || (Pa[f] && Pa[f](s[f], c[f])) || Hc(c[f], s[f])
            ? (l[f] = u[f])
            : (s[f] === this.currentCalendarOptionsInput[f] ||
              (Pa[f] && Pa[f](s[f], this.currentCalendarOptionsInput[f]))
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
  function Yw(e, t, n, a, o, r, i, s) {
    let l = ch(t || s.defaultCode, s.map);
    return new yc({
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
  function Bw(e) {
    let t = e.dateProfileGeneratorClass || sr;
    return new t(e);
  }
  function _w(e, t, n) {
    return new Sh(e, t, n);
  }
  function zw(e) {
    return Wa(e, (t) => t.ui);
  }
  function Lw(e, t, n) {
    let a = { '': t };
    for (let o in e) {
      let r = e[o];
      r.sourceId && n[r.sourceId] && (a[o] = n[r.sourceId]);
    }
    return a;
  }
  function Zw(e) {
    let { options: t } = e;
    return {
      eventUiSingleBase: ar(
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
      selectionConfig: ar(
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
  function e1(e, t) {
    for (let n of t.pluginHooks.isLoadingFuncs) if (n(e)) return !0;
    return !1;
  }
  function Ww(e) {
    return Iw(e.options.businessHours, e);
  }
  var t1 = {};
  function n1(e, t) {
    let n = {};
    for (let a in e)
      t[a]
        ? (n[a] = e[a])
        : t1[a] || (At(`Unknown option \`${a}\`.`), (t1[a] = !0));
    return n;
  }
  function Fw(e, t, n, a, o, r) {
    let i = n.build(o, o, void 0, !1),
      s = n.buildPrev(t, a, o, !1),
      l = n.buildNext(t, a, o, !1);
    return {
      title: r,
      selectedButton: e.type,
      navUnit: e.singleUnit,
      isTodayEnabled: i.isValid && !xt(t.currentRange, o),
      isPrevEnabled: s.isValid,
      isNextEnabled: l.isValid,
    };
  }
  var Bc = class {
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
        : At(`Unknown listener \`${t}\`.`);
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
        a = F(t);
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
      return be(a.formatToParts(a.createMarker(t), te(n)));
    }
    formatRange(t, n, a) {
      let { dateEnv: o } = this.getCurrentData();
      return be(
        o.formatRangeToParts(o.createMarker(t), o.createMarker(n), te(a), a),
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
        r = hT(a, o.dateEnv, F({ days: 1 }));
      r &&
        (this.dispatch({ type: 'SELECT_DATES', selection: r }), yT(r, null, o));
    }
    unselect(t) {
      let n = this.getCurrentData();
      n.dateSelection && (this.dispatch({ type: 'UNSELECT_DATES' }), vT(t, n));
    }
    addEvent(t, n) {
      if (t instanceof _e) {
        let i = t._def,
          s = t._instance;
        return (
          this.getCurrentData().eventStore.defs[i.defId] ||
            (this.dispatch({
              type: 'ADD_EVENTS',
              eventStore: wc({ def: i, instance: s }),
            }),
            this.triggerEventAdd(t)),
          t
        );
      }
      let a = this.getCurrentData(),
        o;
      if (n instanceof Tn) o = n.internalEventSource;
      else if (typeof n == 'boolean') n && ([o] = Oc(a.eventSources));
      else if (n != null) {
        let i = this.getEventSourceById(n);
        if (!i) return (At(`Unknown event source ID \`${n}\`.`), null);
        o = i.internalEventSource;
      }
      let r = rh(t, o, a, !1);
      if (r) {
        let i = new _e(a, r.def, r.def.recurringDef ? null : r.instance);
        return (
          this.dispatch({ type: 'ADD_EVENTS', eventStore: wc(r) }),
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
          this.dispatch({ type: 'REMOVE_EVENTS', eventStore: lh(t) });
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
      return Yi(t.eventStore, t);
    }
    removeAllEvents() {
      this.dispatch({ type: 'REMOVE_ALL_EVENTS' });
    }
    getEventSources() {
      let t = this.getCurrentData(),
        n = t.eventSources,
        a = [];
      for (let o in n) a.push(new Tn(t, n[o]));
      return a;
    }
    getEventSourceById(t) {
      let n = this.getCurrentData(),
        a = n.eventSources;
      t = String(t);
      for (let o in a) if (a[o].publicId === t) return new Tn(n, a[o]);
      return null;
    }
    addEventSource(t) {
      let n = this.getCurrentData();
      if (t instanceof Tn)
        return (
          n.eventSources[t.internalEventSource.sourceId] ||
            this.dispatch({
              type: 'ADD_EVENT_SOURCES',
              sources: [t.internalEventSource],
            }),
          t
        );
      let a = uh(t, n);
      return a
        ? (this.dispatch({ type: 'ADD_EVENT_SOURCES', sources: [a] }),
          new Tn(n, a))
        : null;
    }
    removeAllEventSources() {
      this.dispatch({ type: 'REMOVE_ALL_EVENT_SOURCES' });
    }
    refetchEvents() {
      this.dispatch({ type: 'FETCH_EVENT_SOURCES', isRefetch: !0 });
    }
    scrollToTime(t) {
      let n = F(t);
      n && this.trigger('_timeScrollRequest', n);
    }
    getButtonState() {
      let t = this.getCurrentData(),
        { toolbarProps: n } = t,
        a = t.calendarOptions,
        o = a.buttons || {},
        r = t.viewSpecs,
        i = t.viewSpec.singleUnit,
        s = [i ? a1(i, a) : '', i],
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
          m = o[c]?.text || (f ? a[f] : '') || (d ? a1(d, a) : '') || c,
          v = We(a.viewHint, [m, c], m);
        l[c] = { text: m, hint: v };
      }
      return l;
    }
  };
  function a1(e, t) {
    return t[e + 'TextLong'] || t[e + 'Text'];
  }
  var _c = class extends Va.Component {
    constructor() {
      (super(...arguments),
        (this.state = { forPrint: !1 }),
        (this.handleBeforePrint = () => {
          (0, vh.flushSync)(() => {
            this.setState({ forPrint: !0 });
          });
        }),
        (this.handleAfterPrint = () => {
          (0, vh.flushSync)(() => {
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
  function o1(e, t) {
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
  var Th = class extends W {
      render() {
        let { contentGenerator: t, className: n } = this.props;
        if (t)
          return (0, ue.jsx)(ce, {
            tag: 'span',
            style: { display: 'contents' },
            attrs: { 'aria-hidden': !0 },
            renderProps: {},
            generatorName: void 0,
            customGenerator: t,
          });
        if (n !== void 0)
          return (0, ue.jsx)('span', { 'aria-hidden': !0, className: n });
      }
    },
    Dh = class extends W {
      render() {
        let { props: t } = this,
          { options: n } = this.context,
          a = t.widgetGroups.map((o) => this.renderWidgetGroup(o));
        return (0, Va.createElement)(
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
              (0, ue.jsx)('div', {
                role: 'heading',
                'aria-level': o.headingLevel,
                id: n.titleId,
                className: D(o.toolbarTitleClass),
                children: n.title,
              }),
            );
          else if (u)
            r.push(
              (0, ue.jsx)(ce, {
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
            let g;
            v !== 'text' &&
              (g = (0, ue.jsx)(Th, {
                className: l.buttonIconClass,
                contentGenerator: l.buttonIconContent,
              }));
            let E = t.length > 1 && i,
              p = E ? { hasSelection: s } : null,
              h = {
                name: c,
                text: l.buttonText,
                isPrimary: l.buttonIsPrimary,
                isSelected: f,
                isDisabled: m,
                isIconOnly: v === 'icon',
                buttonGroup: p,
              };
            r.push(
              (0, ue.jsx)(ce, {
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
                      ? g
                      : v === 'icon-text'
                        ? (0, ue.jsxs)(ue.Fragment, {
                            children: [g, l.buttonText],
                          })
                        : (0, ue.jsxs)(ue.Fragment, {
                            children: [l.buttonText, g],
                          }),
              }),
            );
          }
        }
        return r.length > 1
          ? (0, Va.createElement)(
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
    zc = class extends W {
      render() {
        let { props: t } = this,
          n = this.context.options,
          { sectionWidgets: a } = t.model,
          { borderlessX: o, borderlessTop: r, borderlessBottom: i } = Dn(n),
          s = t.isHeader ? n.headerToolbarClass : n.footerToolbarClass;
        return (0, ue.jsxs)('div', {
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
        return (0, ue.jsx)(
          Dh,
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
    Mh = class extends Li {
      constructor(t) {
        (super(t),
          (this.handleSegClick = (n, a) => {
            let { component: o } = this,
              { context: r } = o,
              i = Ac(a);
            i &&
              o.isValidSegDownEl(n.target) &&
              r.emitter.trigger('eventClick', {
                el: a,
                event: new _e(o.context, i.def, i.instance),
                jsEvent: n,
                view: r.viewApi,
              });
          }),
          (this.destroy = Xm(
            t.el,
            'click',
            `.${S.internalEvent}`,
            this.handleSegClick,
          )));
      }
    },
    Eh = class extends Li {
      constructor(t) {
        (super(t),
          (this.handleEventElRemove = (n) => {
            n === this.currentSegEl &&
              this.handleSegLeave(null, this.currentSegEl);
          }),
          (this.handleSegEnter = (n, a) => {
            Ac(a) &&
              ((this.currentSegEl = a),
              this.triggerEvent('eventMouseEnter', n, a));
          }),
          (this.handleSegLeave = (n, a) => {
            this.currentSegEl &&
              ((this.currentSegEl = null),
              this.triggerEvent('eventMouseLeave', n, a));
          }),
          (this.removeHoverListeners = oT(
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
          i = Ac(a);
        (!n || o.isValidSegDownEl(n.target)) &&
          r.emitter.trigger(t, {
            el: a,
            event: new _e(r, i.def, i.instance),
            jsEvent: n,
            view: r.viewApi,
          });
      }
    },
    Lc = class extends qt {
      constructor() {
        (super(...arguments),
          (this.buildViewContext = B(zT)),
          (this.buildViewPropTransformers = B(Pw)),
          (this.interactionsStore = {}),
          (this.calendarInteractions = []),
          (this.registerInteractiveComponent = (t, n) => {
            let a = jT(t, n),
              r = [Mh, Eh];
            n.disableHits ||
              (r = r.concat(this.props.pluginHooks.componentInteractions));
            let i = r.map((s) => new s(a));
            ((this.interactionsStore[t.uid] = i), (yh[t.uid] = a));
          }),
          (this.unregisterInteractiveComponent = (t) => {
            let n = this.interactionsStore[t.uid];
            if (n) {
              for (let a of n) a.destroy();
              delete this.interactionsStore[t.uid];
            }
            delete yh[t.uid];
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
        return (0, ue.jsxs)(En.Provider, {
          value: s,
          children: [
            n.header &&
              (0, ue.jsx)(zc, {
                model: n.header,
                isHeader: !0,
                titleId: this.viewTitleId,
                ...t.toolbarProps,
              }),
            (0, ue.jsxs)('div', {
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
              (0, ue.jsx)(zc, {
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
        return (0, ue.jsx)(u, { ...s });
      }
      buildAppendContent() {
        let { props: t } = this;
        return (0, ue.jsx)(ue.Fragment, {
          children: t.pluginHooks.viewContainerAppends.map((n, a) =>
            (0, ue.jsx)(Va.Fragment, { children: n(t) }, a),
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
  function Pw(e) {
    return e.map((t) => new t());
  }
  var Wc = (0, Je.forwardRef)((e, t) => {
    let n = jw(e.id),
      [a, o] = (0, Je.useState)('');
    function r(c, u) {
      (qw(u) ? i1.flushSync : Vw)(() => {
        o(Qe());
      });
    }
    let [i] = (0, Je.useState)(() => new Bc()),
      [s] = (0, Je.useState)(() => new Yc({ calendarApi: i, onDataChange: r }));
    ((0, Je.useEffect)(
      () => () => {
        s.destroy();
      },
      [],
    ),
      (0, Je.useImperativeHandle)(t, () => ({ getApi: () => i }), []));
    let l = s.update(e);
    return (0, Zc.jsx)(_c, {
      emitter: l.emitter,
      children: (c) => {
        let u = l.calendarOptions,
          d = u.direction === 'rtl',
          f = o1(u, c);
        return (0, Zc.jsx)('div', {
          dir: d ? 'rtl' : void 0,
          className: f,
          style: { height: u.height },
          'data-color-scheme': u.colorScheme || void 0,
          children: (0, Zc.jsx)(Lc, { ...l, baseId: n, forPrint: c }),
        });
      },
    });
  });
  function qw(e) {
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
  function Vw(e) {
    e();
  }
  var r1 = !1;
  function jw(e) {
    if (Je.default.useId) return Je.default.useId();
    let [t] = (0, Je.useState)(() => Qe());
    return e
      ? e + ':'
      : (r1 ||
          ((r1 = !0),
          At(
            'Missing `id` prop. Provide one for better SSR support in React 17.',
          )),
        `fc:${t}:`);
  }
  var Ht = U(P()),
    Vt = 'text-[0.6875rem]/[1.090909]',
    Fc = 'size-5',
    Gw = 'outline-2',
    Pc = 'focus-visible:outline-2',
    l1 = 'outline-offset-2',
    c1 = '-outline-offset-2',
    qc = 'outline-(--fc-classic-primary)',
    Xw =
      '[background:linear-gradient(var(--fc-classic-strong),var(--fc-classic-strong))_var(--fc-classic-background)]',
    b1 = 'hover:bg-(--fc-classic-muted) hover:cursor-pointer',
    u1 = `${b1} focus-visible:bg-(--fc-classic-muted) active:bg-(--fc-classic-strong)`,
    S1 = 'hover:bg-(--fc-classic-faint)',
    Qw = `${S1} focus-visible:bg-(--fc-classic-faint) active:bg-(--fc-classic-muted)`,
    T1 = 'absolute hidden group-hover:block',
    f1 = `${T1} inset-y-0 w-2`,
    d1 = `${T1} inset-x-0 h-2`,
    D1 =
      'absolute size-2 border border-(--fc-event-color) bg-(--fc-classic-background) rounded-full',
    m1 = `${D1} top-1/2 -mt-1`,
    h1 = `${D1} left-1/2 -ml-1`,
    p1 = (e) =>
      D(
        'border',
        e.isMajor
          ? 'border-(--fc-classic-strong-border)'
          : 'border-(--fc-classic-border)',
        e.isDisabled
          ? 'bg-(--fc-classic-faint)'
          : e.isToday && 'not-print:bg-(--fc-classic-today)',
      ),
    g1 = (e) =>
      D('border border-(--fc-classic-border)', e.isMinor && 'border-dotted'),
    Kw = {
      listItemEventClass: (e) =>
        D(
          'mb-px p-px rounded-sm',
          e.isNarrow ? 'mx-px' : 'mx-0.5',
          e.isSelected
            ? D('bg-(--fc-classic-muted)', e.isDragging && 'shadow-sm')
            : e.isInteractive
              ? u1
              : b1,
        ),
      listItemEventBeforeClass: (e) =>
        D(
          'border-[calc(var(--fc-classic-small-dot-width)/2)]',
          e.isNarrow ? 'mx-px' : 'mx-1',
        ),
      listItemEventInnerClass: (e) =>
        D(
          'flex flex-row items-center py-px gap-0.5 ',
          e.isNarrow ? Vt : 'text-xs',
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
          u1,
        ),
      rowMoreLinkInnerClass: (e) => D('p-px', e.isNarrow ? Vt : 'text-xs'),
    };
  function M1({ availableViews: e, addButton: t, buttons: n, views: a, ...o }) {
    return (0, Ht.jsx)(Wc, {
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
        prev: { iconContent: () => y1(`${Fc} [[dir=rtl]_&]:rotate-180`) },
        next: {
          iconContent: () => y1(`${Fc} rotate-180 [[dir=rtl]_&]:rotate-0`),
        },
        prevYear: { iconContent: () => v1(`${Fc} [[dir=rtl]_&]:rotate-180`) },
        nextYear: {
          iconContent: () => v1(`${Fc} rotate-180 [[dir=rtl]_&]:rotate-0`),
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
          r.isSelected ? D(Gw, r.isDragging ? 'shadow-lg' : 'shadow-md') : Pc,
          qc,
        ),
      backgroundEventColor: 'var(--fc-classic-background-event)',
      backgroundEventClass:
        'not-print:bg-[color-mix(in_oklab,var(--fc-event-color)_var(--fc-classic-background-event-opacity),transparent)] print:border-1 print:border-(--fc-event-color)',
      backgroundEventTitleClass: (r) =>
        D(
          'opacity-(--fc-classic-background-event-foreground-opacity) italic',
          r.isNarrow ? `p-0.5 ${Vt}` : 'p-1.5 text-xs',
        ),
      listItemEventClass: 'items-center bg-(--fc-classic-primary) text-white',
      listItemEventBeforeClass: 'border-(--fc-event-color) rounded-full',
      blockEventClass: (r) =>
        D(
          'group relative border-transparent print:border-(--fc-event-color) bg-(--fc-event-color) print:bg-white',
          r.isDragging && !r.isSelected && 'opacity-75',
          l1,
        ),
      blockEventInnerClass: 'text-(--fc-event-contrast-color) print:text-black',
      blockEventTimeClass: 'whitespace-nowrap overflow-hidden shrink-1',
      blockEventTitleClass: 'whitespace-nowrap overflow-hidden shrink-100',
      rowEventClass: (r) =>
        D('mb-px border-y', r.isStart && 'border-s', r.isEnd && 'border-e'),
      rowEventBeforeClass: (r) =>
        D(r.isStartResizable && D(r.isSelected ? m1 : f1, '-start-1')),
      rowEventAfterClass: (r) =>
        D(r.isEndResizable && D(r.isSelected ? m1 : f1, '-end-1')),
      rowEventInnerClass: (r) =>
        D('flex flex-row items-center', r.isNarrow ? Vt : 'text-xs'),
      rowEventTimeClass: 'font-bold',
      columnEventClass: (r) =>
        D(
          'border-x ring ring-(--fc-classic-background)',
          r.isStart && 'border-t rounded-t-sm',
          r.isEnd && 'mb-px border-b rounded-b-sm',
        ),
      columnEventBeforeClass: (r) =>
        D(r.isStartResizable && D(r.isSelected ? h1 : d1, '-top-1')),
      columnEventAfterClass: (r) =>
        D(r.isEndResizable && D(r.isSelected ? h1 : d1, '-bottom-1')),
      columnEventInnerClass: (r) =>
        D(
          'flex',
          r.isShort ? 'p-0.5 flex-row items-center gap-1' : 'px-0.5 flex-col',
        ),
      columnEventTimeClass: (r) => D(!r.isShort && 'pt-0.5', Vt),
      columnEventTitleClass: (r) =>
        D(!r.isShort && 'py-0.5', r.isShort || r.isNarrow ? Vt : 'text-xs'),
      moreLinkClass: `${Pc} ${qc}`,
      moreLinkInnerClass: 'whitespace-nowrap overflow-hidden',
      columnMoreLinkClass: `mb-px rounded-sm border border-transparent print:border-black ${Xw} print:bg-white ring ring-(--fc-classic-background) ${l1}`,
      columnMoreLinkInnerClass: (r) => D('p-0.5', r.isNarrow ? Vt : 'text-xs'),
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
        D('mx-1 my-0.5 flex flex-col', r.isNarrow ? Vt : 'text-sm'),
      dayHeaderDividerClass: 'border-b border-(--fc-classic-border)',
      dayCellClass: p1,
      dayCellTopClass: (r) =>
        D(r.isNarrow ? 'min-h-px' : 'min-h-0.5', 'flex flex-row justify-end'),
      dayCellTopInnerClass: (r) =>
        D(
          'mx-1 whitespace-nowrap',
          r.isNarrow ? `my-0.5 ${Vt}` : 'my-1 text-sm',
          r.isOther && 'text-(--fc-classic-faint-foreground)',
          r.monthText && 'font-bold',
        ),
      dayCellInnerClass: (r) => D(r.inPopover && 'p-2'),
      popoverClass:
        'bg-(--fc-classic-background) text-(--fc-classic-foreground) border border-(--fc-classic-border) shadow-md min-w-55',
      popoverCloseClass: `group absolute top-0.5 end-0.5 ${Pc} ${qc}`,
      popoverCloseContent: () =>
        Jw('size-5 text-sm not-group-hover:opacity-65'),
      dayLaneClass: p1,
      dayLaneInnerClass: (r) =>
        D(r.isStack ? 'm-1' : r.isNarrow ? 'mx-px' : 'ms-0.5 me-[2.5%]'),
      slotLaneClass: g1,
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
      slotHeaderClass: g1,
      navLinkClass: `hover:underline ${Pc} ${c1} ${qc}`,
      inlineWeekNumberClass: (r) =>
        D(
          'absolute top-0 start-0 rounded-ee-sm p-0.5 text-center text-(--fc-classic-muted-foreground) bg-(--fc-classic-muted)',
          r.isNarrow ? Vt : 'text-sm',
        ),
      nonBusinessHoursClass: 'bg-(--fc-classic-faint)',
      highlightClass: 'bg-(--fc-classic-highlight)',
      views: {
        ...a,
        dayGrid: { ...Kw, dayCellBottomClass: 'min-h-px', ...a?.dayGrid },
        list: {
          listDayClass: (r) =>
            D(
              'flex flex-col',
              !r.isLast && 'border-b border-(--fc-classic-border)',
            ),
          listItemEventClass: (r) =>
            D(
              'group px-3 py-2 gap-3 border-t border-(--fc-classic-border) bg-transparent',
              r.isInteractive ? D(Qw, c1) : S1,
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
  function y1(e) {
    return (0, Ht.jsx)('svg', {
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
      children: (0, Ht.jsx)('polyline', { points: '15 18 9 12 15 6' }),
    });
  }
  function v1(e) {
    return (0, Ht.jsxs)('svg', {
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
        (0, Ht.jsx)('polyline', { points: '11 17 6 12 11 7' }),
        (0, Ht.jsx)('polyline', { points: '18 17 13 12 18 7' }),
      ],
    });
  }
  function Jw(e) {
    return (0, Ht.jsxs)('svg', {
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
        (0, Ht.jsx)('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
        (0, Ht.jsx)('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
      ],
    });
  }
  var Xh = U(P(), 1);
  var w1 = U(dt(), 1);
  var me = U(P(), 1);
  function E1(e) {
    let t = e.getRootNode();
    return t instanceof Document ? t.body || t.documentElement : t;
  }
  function cr(e) {
    return getComputedStyle(e).direction === 'rtl';
  }
  var eR = /(top|left|right|bottom|width|height)$/i;
  function O1(e, t) {
    for (let n in t) tR(e, n, t[n]);
  }
  function tR(e, t, n) {
    n == null
      ? (e.style[t] = '')
      : typeof n == 'number' && eR.test(t)
        ? (e.style[t] = `${n}px`)
        : (e.style[t] = n);
  }
  function C1(e) {
    return e.composedPath?.()[0] ?? e.target;
  }
  var R1 = U(oo(), 1);
  var ja = class extends w1.Component {
    constructor(t, n) {
      (super(t, n),
        (this.handleChange = () => {
          this.forceUpdate();
        }),
        (this.runner = new ir(this.handleChange)));
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
  ja.contextType = En;
  var Xc = te({ year: 'numeric', month: 'long', day: 'numeric' }),
    nR = te({ week: 'long' }),
    fr = te({ weekday: 'long' });
  function Ga(e) {
    for (let t of e) if (t.type === 'weekday') return t.value;
    return '';
  }
  function Xa(e) {
    for (let t of e) if (t.type === 'day') return t.value;
    return '';
  }
  function $h(e) {
    for (let t of e) if (t.type === 'month') return t.value;
    return '';
  }
  function Qa(e, t, n = 'day') {
    return be(e.dateEnv.formatToParts(t, n === 'week' ? nR : Xc));
  }
  function dr(e, t, n = 'day', a = Qa(e, t, n), o = !0) {
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
      ...(o ? ki(c) : { onClick: c }),
    };
  }
  function mr(e, t, n, a, o) {
    let r = !!(n && (!n.activeRange || !xt(n.activeRange, e)));
    return {
      date: t.toDate(e),
      dow: e.getUTCDay(),
      isDisabled: r,
      isOther: !r && !!(n && !xt(n.currentRange, e)),
      isToday: !r && !!(a && xt(a, e)),
      isPast: !r && !!(o ? e < o : a && e < a.start),
      isFuture: !r && !!(o ? e > o : a && e >= a.end),
    };
  }
  function jc(e, t) {
    return e != null && (e === t || Math.abs(e - t) < 0.01);
  }
  var aR = !0,
    Ch = new Map(),
    Nh = new Set(),
    wh = !1,
    Oh = !1;
  function Ka(e) {
    (Nh.add(e),
      !wh &&
        !Oh &&
        ((Oh = !0),
        requestAnimationFrame(() => {
          ((Oh = !1), $1());
        })));
  }
  function $1() {
    for (let e of Nh.values()) (e(), Nh.delete(e));
  }
  var Vc =
    typeof ResizeObserver < 'u' &&
    new ResizeObserver((e) => {
      wh = !0;
      for (let t of e) {
        let n = t.target,
          a = Ch.get(n),
          o,
          r;
        if (t.borderBoxSize && aR) {
          let s = t.borderBoxSize[0] || t.borderBoxSize;
          ((o = s.inlineSize), (r = s.blockSize));
        } else ({ width: o, height: r } = n.getBoundingClientRect());
        let i = !1;
        (jc(a.width, o) || ((a.width = o), (i = a.watchWidth)),
          jc(a.height, r) || ((a.height = r), i || (i = a.watchHeight)),
          i && a.callback(o, r));
      }
      (0, R1.flushSync)(() => {
        ($1(), (wh = !1));
      });
    });
  function Zi(e, t, n = !0, a = !0) {
    return (
      Ch.set(e, { callback: t, watchWidth: n, watchHeight: a }),
      Vc && Vc.observe(e, { box: 'border-box' }),
      () => {
        (Ch.delete(e), Vc && Vc.unobserve(e));
      }
    );
  }
  function xh(e, t) {
    return Zi(e, t, !0);
  }
  function hr(e, t) {
    return Zi(e, (n, a) => t(a), !1, !0);
  }
  var ur = class extends W {
    constructor() {
      (super(...arguments), (this.refineRenderProps = ua(oR)));
    }
    render() {
      let { props: t, context: n } = this,
        { options: a, viewSpec: o } = n,
        r = this.refineRenderProps({
          ...Dn(a),
          options: {
            headerToolbar: a.headerToolbar,
            footerToolbar: a.footerToolbar,
          },
          isHeightAuto: Ke(a),
          viewApi: n.viewApi,
        });
      return (0, me.jsx)(ce, {
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
  function oR(e) {
    return {
      view: e.viewApi,
      borderlessX: e.borderlessX,
      borderlessTop: e.borderlessTop,
      borderlessBottom: e.borderlessBottom,
      options: e.options,
      isHeightAuto: e.isHeightAuto,
    };
  }
  var On = class extends W {
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
    Gc = class {
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
    Rh = class {
      constructor(t) {
        ((this.el = t),
          (this.emitter = new lr()),
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
          (this.wheelWaiter = new Gc(this.handleWheelWait)),
          (this.scrollWaiter = new Gc(this.handleScrollWait)),
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
    Cn = class extends On {
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
                (this.listener = new Rh(t))));
          }),
          (this.handleHRuler = (t) => {
            (this.disconnectHRuler &&
              (this.disconnectHRuler(),
              (this.disconnectHRuler = void 0),
              this.clientWidth !== void 0 &&
                ((this.clientWidth = void 0),
                j(this.props.clientWidthRef, null))),
              t &&
                (this.disconnectHRuler = xh(t, (n) => {
                  this._isUnmounting ||
                    (n !== this.clientWidth &&
                      ((this.clientWidth = n),
                      j(this.props.clientWidthRef, n)));
                })));
          }),
          (this.handleVRuler = (t) => {
            (this.disconnectVRuler &&
              (this.disconnectVRuler(),
              (this.disconnectVRuler = void 0),
              this.clientHeight !== void 0 &&
                ((this.clientHeight = void 0),
                j(this.props.clientHeightRef, null))),
              t &&
                (this.disconnectVRuler = hr(t, (n) => {
                  if (this._isUnmounting) return;
                  n !== this.clientHeight &&
                    ((this.clientHeight = n), j(this.props.clientHeightRef, n));
                  let a = Math.round(
                    this.el.getBoundingClientRect().height - n,
                  );
                  a !== this.bottomScrollbarWidth &&
                    ((this.bottomScrollbarWidth = a),
                    j(this.props.bottomScrollbarWidthRef, a));
                })));
          }));
      }
      render() {
        let { props: t } = this,
          n = t.horizontal || t.vertical ? 'hidden' : '';
        return (0, me.jsxs)('div', {
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
              (0, me.jsx)('div', {
                ref: this.handleHRuler,
                className: S.fillTop,
              }),
            !!(t.clientHeightRef || t.bottomScrollbarWidthRef) &&
              (0, me.jsx)('div', {
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
        return t ? rR(t) : 0;
      }
      get y() {
        let { el: t } = this;
        return t ? t.scrollTop : 0;
      }
      scrollTo({ x: t, y: n }) {
        let { el: a } = this;
        a && (n != null && (a.scrollTop = n), t != null && iR(a, t));
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
  function rR(e) {
    let { scrollLeft: t } = e;
    return cr(e) ? sR(t, e) : t;
  }
  function iR(e, t) {
    let n = cr(e);
    e.scrollLeft = n ? lR(t, e) : t;
  }
  function sR(e, t) {
    switch (x1()) {
      case 'positive':
        return t.scrollWidth - t.clientWidth - e;
      case 'negative':
        return -e;
    }
    return e;
  }
  function lR(e, t) {
    switch (x1()) {
      case 'positive':
        return t.scrollWidth - t.clientWidth - e;
      case 'negative':
        return -e;
    }
    return e;
  }
  var N1;
  function x1() {
    return N1 || (N1 = cR());
  }
  function cR() {
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
  var fa = class extends W {
    constructor() {
      (super(...arguments),
        (this.buildPublicEvent = B((t, n, a) => new _e(t, n, a))),
        (this.handleEl = (t) => {
          ((this.el = t),
            j(this.props.elRef, t),
            t && or(t, this.props.eventRange));
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
          DT(
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
        [l, c, u] = MT(o, n),
        d = this.buildPublicEvent(n, o.def, o.instance),
        f = !t.disableDragging && TT(o, n),
        m = /row|column/.test(t.display),
        v = {
          event: d,
          isNarrow: t.isNarrow || !1,
          isShort: t.isShort || !1,
          timeText: s,
        },
        g = {
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
          m && w(a.blockEventClass, g),
          t.display === 'row' && w(a.rowEventClass, g),
          t.display === 'column' && w(a.columnEventClass, g),
          t.display === 'list-item' && w(a.listItemEventClass, g),
          r.className,
          t.className,
          t.display === 'column' ? S.flexCol : S.flexRow,
          (o.def.url || f) && S.cursorPointer,
          S.internalEvent,
          t.isMirror && S.internalEventMirror,
          f && S.internalEventDraggable,
          g.isSelected && S.internalEventSelected,
          (g.isStartResizable || g.isEndResizable) && S.internalEventResizable,
        ),
        p = D(
          w(a.eventBeforeClass, g),
          m && w(a.blockEventBeforeClass, g),
          t.display === 'row' && w(a.rowEventBeforeClass, g),
          t.display === 'column' && w(a.columnEventBeforeClass, g),
          t.display === 'list-item' && w(a.listItemEventBeforeClass, g),
        ),
        h = D(
          w(a.eventAfterClass, g),
          m && w(a.blockEventAfterClass, g),
          t.display === 'row' && w(a.rowEventAfterClass, g),
          t.display === 'column' && w(a.columnEventAfterClass, g),
          t.display === 'list-item' && w(a.listItemEventAfterClass, g),
        ),
        y = D(
          w(a.eventInnerClass, g),
          m && w(a.blockEventInnerClass, g),
          t.display === 'row' && w(a.rowEventInnerClass, g),
          t.display === 'column' && w(a.columnEventInnerClass, g),
          t.display === 'list-item' && w(a.listItemEventInnerClass, g),
          !t.disableLiquid && S.liquid,
        ),
        b = t.display === 'row' && a.rowEventBeforeContent,
        O = t.display === 'row' && a.rowEventAfterContent;
      return (0, me.jsx)(ce, {
        tag: l,
        attrs: {
          ...t.attrs,
          ...c,
          dir: t.isDragging && a.direction === 'rtl' ? 'rtl' : void 0,
        },
        className: E,
        style: {
          '--fc-event-color': g.color,
          '--fc-event-contrast-color': g.contrastColor,
        },
        elRef: this.handleEl,
        renderProps: g,
        generatorName: 'eventContent',
        customGenerator: a.eventContent,
        defaultGenerator: uR,
        classNameGenerator: a.eventClass,
        didMount: a.eventDidMount,
        willUnmount: a.eventWillUnmount,
        children: (x) =>
          (0, me.jsxs)(me.Fragment, {
            children: [
              !!(g.isSelected && m) &&
                (0, me.jsx)('div', {
                  className: t.display === 'column' ? S.hitX : S.hitY,
                }),
              (p || b) &&
                (0, me.jsxs)('div', {
                  className: D(
                    p,
                    !t.disableZindexes && S.z1,
                    g.isStartResizable &&
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
                      (0, me.jsx)(ce, {
                        tag: 'div',
                        style: { display: 'contents' },
                        attrs: { 'aria-hidden': !0 },
                        renderProps: g,
                        generatorName: void 0,
                        customGenerator: b,
                      }),
                    !!(g.isStartResizable && g.isSelected) &&
                      (0, me.jsx)('div', { className: S.hit }),
                  ],
                }),
              (0, me.jsx)(x, {
                tag: 'div',
                className: D(y, !t.disableZindexes && S.z0),
              }),
              (h || O) &&
                (0, me.jsxs)('div', {
                  className: D(
                    h,
                    !t.disableZindexes && S.z1,
                    g.isEndResizable &&
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
                      (0, me.jsx)(ce, {
                        tag: 'div',
                        style: { display: 'contents' },
                        attrs: { 'aria-hidden': !0 },
                        renderProps: g,
                        generatorName: void 0,
                        customGenerator: O,
                      }),
                    !!(g.isEndResizable && g.isSelected) &&
                      (0, me.jsx)('div', { className: S.hit }),
                  ],
                }),
            ],
          }),
      });
    }
    componentDidUpdate(t) {
      this.el &&
        this.props.eventRange !== t.eventRange &&
        or(this.el, this.props.eventRange);
    }
  };
  fa.addPropsEquality({ seg: Pt });
  function uR(e) {
    return (0, me.jsxs)(me.Fragment, {
      children: [
        e.timeText &&
          (0, me.jsx)('div', { className: e.timeClass, children: e.timeText }),
        (0, me.jsx)('div', {
          className: e.titleClass,
          children:
            e.event.title || (0, me.jsx)(me.Fragment, { children: '\xA0' }),
        }),
      ],
    });
  }
  var A = U(P(), 1),
    Nn = U(dt(), 1);
  var z1 = U(oo(), 1);
  function fR(e, t) {
    let n = {
      left: Math.max(e.left, t.left),
      right: Math.min(e.right, t.right),
      top: Math.max(e.top, t.top),
      bottom: Math.min(e.bottom, t.bottom),
    };
    return n.left < n.right && n.top < n.bottom ? n : !1;
  }
  function A1(e) {
    let t = dR(e),
      n = e.getBoundingClientRect();
    for (let a of t) {
      let o = fR(n, a.getBoundingClientRect());
      if (o) n = o;
      else return null;
    }
    return n;
  }
  function dR(e) {
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
  var Uh = class {
    constructor() {
      ((this.sliceBusinessHours = B(this._sliceBusinessHours)),
        (this.sliceDateSelection = B(this._sliceDateSpan)),
        (this.sliceEventStore = B(this._sliceEventStore)),
        (this.sliceEventDrag = B(this._sliceInteraction)),
        (this.sliceEventResize = B(this._sliceInteraction)),
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
        { range: { start: t, end: Sn(t, 1) }, allDay: !1 },
        n,
        a,
        {},
        o,
        ...r,
      );
    }
    _sliceBusinessHours(t, n, a, o, ...r) {
      return t
        ? this._sliceEventStore(qa(t, Qc(n, !!a), o), {}, n, a, ...r).bg
        : [];
    }
    _sliceEventStore(t, n, a, o, ...r) {
      if (t) {
        let i = Bi(t, n, Qc(a, !!o), o);
        return {
          bg: this.sliceEventRanges(i.bg, r),
          fg: this.sliceEventRanges(i.fg, r),
        };
      }
      return { bg: [], fg: [] };
    }
    _sliceInteraction(t, n, a, o, ...r) {
      if (!t) return null;
      let i = Bi(t.mutatedEvents, n, Qc(a, !!o), o);
      return {
        segs: this.sliceEventRanges(i.fg, r),
        affectedInstances: t.affectedEvents.instances,
        isEvent: t.isEvent,
      };
    }
    _sliceDateSpan(t, n, a, o, r, ...i) {
      if (!t) return [];
      let s = Qc(n, !!a),
        l = $t(t.range, s);
      if (l) {
        t = { ...t, range: l };
        let c = gT(t, o, r),
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
        (a = { start: a.start, end: ae(a.start, 1) });
      let o = this.sliceRange(a, ...n);
      for (let r of o)
        ((r.eventRange = t),
          (r.isStart = t.isStart && r.isStart),
          (r.isEnd = t.isEnd && r.isEnd));
      return o;
    }
  };
  function Qc(e, t) {
    let n = e.activeRange;
    return t
      ? n
      : {
          start: Sn(n.start, e.slotMinTime.milliseconds),
          end: Sn(n.end, e.slotMaxTime.milliseconds - 864e5),
        };
  }
  var Jc = class extends Uh {
      constructor() {
        (super(...arguments), (this.forceDayIfListItem = !0));
      }
      sliceRange(t, n) {
        return n.sliceRange(t);
      }
    },
    mR = new Date(2592e5);
  function L1(e, t, n, a, o, r) {
    let i = hR(e, t, n, a, o, r),
      s = hh(n, r.dateEnv);
    if (t && s !== 'day')
      for (let l of i.dataConfigs)
        ph(l.dateMarker, s, r.dateEnv) && (l.renderProps.isMajor = !0);
    return [i];
  }
  function hR(e, t, n, a, o, r, i, s) {
    return {
      isDateRow: !0,
      renderConfig: pR(o, t, r),
      dataConfigs: gR(e, t, n, a, o, r, i, void 0, void 0, void 0, void 0, s),
    };
  }
  function pR(e, t, n) {
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
  var Z1 = [];
  for (let e = 0; e < 7; e++) Z1.push(ae(new Date(2592e5), e));
  function gR(e, t, n, a, o, r, i = 1, s = '', l = {}, c = {}, u = '', d) {
    let { dateEnv: f, viewApi: m, options: v } = r;
    return t
      ? e.map((g, E) => {
          let p = mr(g, f, n, a),
            h = d != null && !(E % d),
            y = v.navLinks && !p.isDisabled && e.length > 1,
            b = {
              ...p,
              ...l,
              isMajor: h,
              isSticky: !1,
              inPopover: !1,
              hasNavLink: y,
              view: m,
            },
            O = Qa(r, g);
          return {
            key: s + g.toUTCString(),
            dateMarker: g,
            renderProps: b,
            attrs: {
              'aria-label': O,
              ...(p.isToday ? { 'aria-current': 'date' } : {}),
              'data-date': La(g),
              ...c,
            },
            innerAttrs: y ? dr(r, g, void 0, O) : { 'aria-hidden': !0 },
            colSpan: i,
            hasNavLink: y,
            className: u,
          };
        })
      : e.map((g, E) => {
          let p = g.getUTCDay(),
            h = ae(mR, p),
            y = {
              date: f.toDate(g),
              dow: p,
              isDisabled: !1,
              isFuture: !1,
              isPast: !1,
              isToday: !1,
              isOther: !1,
            },
            b = d != null && !(E % d),
            O = {
              ...y,
              date: Z1[p],
              isMajor: b,
              isSticky: !1,
              inPopover: !1,
              hasNavLink: !1,
              view: m,
              ...l,
            },
            x = be(f.formatToParts(h, fr));
          return {
            key: s + String(p),
            dateMarker: g,
            renderProps: O,
            attrs: { 'aria-label': x, ...c },
            innerAttrs: { 'aria-hidden': !0 },
            colSpan: i,
            className: u,
          };
        });
  }
  var wn = class {
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
    Wi = class extends W {
      constructor() {
        (super(...arguments), (this.elRef = (0, Nn.createRef)()));
      }
      render() {
        return (0, A.jsx)('div', { ref: this.elRef });
      }
      componentDidMount() {
        this._isUnmounting = !1;
        let { props: t } = this,
          n = this.elRef.current;
        this.disconnectWidth = xh(n, (a) => {
          this._isUnmounting || j(t.widthRef, a);
        });
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0), this.disconnectWidth());
        let { props: t } = this;
        t.widthRef && j(t.widthRef, null);
      }
    };
  function Ja(e) {
    return (
      xc(e) +
      ':' +
      e.start +
      (e.standinFor ? ':standin' : e.isSlice ? ':slice' : '')
    );
  }
  function Kc(e, t) {
    let n = [];
    for (let a = 0; a < t; a++) n[a] = [];
    for (let a of e) n[a.row].push(a);
    return n;
  }
  function I1(e, t) {
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
  function H1(e, t) {
    return {
      ...e,
      start: t,
      end: t + 1,
      isStart: e.isStart && e.start === t,
      isEnd: e.isEnd && e.end - 1 === t,
      standinFor: e,
    };
  }
  var kh = class extends W {
    constructor() {
      (super(...arguments),
        (this.buildPublicEvent = B((t, n, a) => new _e(t, n, a))),
        (this.handleEl = (t) => {
          ((this.el = t), t && or(t, this.props.eventRange));
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
      return (0, A.jsx)(ce, {
        tag: 'div',
        className: c,
        style: {
          '--fc-event-color': l.color,
          '--fc-event-contrast-color': l.contrastColor,
        },
        defaultGenerator: yR,
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
        or(this.el, this.props.eventRange);
    }
  };
  function yR(e) {
    let { title: t } = e.event;
    return (
      t &&
      (0, A.jsx)('div', { className: e.titleClass, children: e.event.title })
    );
  }
  function vR(e, t) {
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
  var Ah = 10,
    bR = 1,
    Yh = class extends On {
      constructor() {
        (super(...arguments),
          (this.getDateMeta = B(mr)),
          (this.closeRef = (0, Nn.createRef)()),
          (this.focusStartRef = (0, Nn.createRef)()),
          (this.focusEndRef = (0, Nn.createRef)()),
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
            let n = C1(t);
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
          d = be(u),
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
              return Ga(u);
            },
            get dayNumberText() {
              return Xa(u);
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
              return Ga(u);
            },
            get dayNumberText() {
              return Xa(u);
            },
            get monthText() {
              return $h(u);
            },
            view: r,
            text: '',
            textParts: [],
            options: { businessHours: !!a.businessHours },
          },
          v = La(i),
          { dayHeaderAlign: g } = a,
          E =
            typeof g == 'function'
              ? g({ level: 0, inPopover: !0, isNarrow: !1 })
              : g,
          p = cr(t.alignEl);
        return (0, z1.createPortal)(
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
            dir: p ? 'rtl' : void 0,
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
                    children: (0, A.jsx)(ce, {
                      tag: 'div',
                      attrs: { id: t.titleId },
                      generatorName: 'dayHeaderContent',
                      renderProps: f,
                      customGenerator: a.dayHeaderContent,
                      defaultGenerator: SR,
                      classNameGenerator: a.dayHeaderInnerClass,
                      didMount: a.dayHeaderDidMount,
                      willUnmount: a.dayHeaderWillUnmount,
                    }),
                  }),
                  (0, A.jsx)(ce, {
                    tag: 'button',
                    attrs: {
                      'aria-label': a.closeHint,
                      ...ki(this.handleClose),
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
          E1(t.alignEl),
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
          o = cr(t),
          r = A1(t);
        if (r) {
          let i = a.getBoundingClientRect(),
            s = n ? t.closest(n).getBoundingClientRect().top - bR : r.top,
            l = o ? r.right - i.width : r.left;
          ((s = Math.max(s, Ah)),
            (l = Math.min(
              l,
              document.documentElement.clientWidth - Ah - i.width,
            )),
            (l = Math.max(l, Ah)));
          let { offsetParent: c } = a,
            u,
            d;
          if (!c || c === document.body)
            ((u = s + window.scrollY), (d = l + window.scrollX));
          else {
            let f = c.getBoundingClientRect();
            ((u = s - f.top + c.scrollTop), (d = l - f.left + c.scrollLeft));
          }
          O1(a, { top: u, left: d });
        }
      }
    };
  function SR(e) {
    return e.text;
  }
  function U1(e, t) {
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
  function k1(e) {
    return e.end;
  }
  function TR(e) {
    return e.reduce(MR).eventRange.range.start;
  }
  function DR(e) {
    return e.reduce(ER).eventRange.range.end;
  }
  function MR(e, t) {
    return e.eventRange.range.start < t.eventRange.range.start ? e : t;
  }
  function ER(e, t) {
    return e.eventRange.range.end > t.eventRange.range.end ? e : t;
  }
  var Bh = class extends W {
    constructor() {
      (super(...arguments),
        (this.state = { isPopoverOpen: !1 }),
        (this.handleLinkEl = (t) => {
          ((this.linkEl = t), this.props.elRef && j(this.props.elRef, t));
        }),
        (this.handleClick = (t) => {
          let { props: n, context: a } = this,
            { dateEnv: o, options: r } = a,
            { moreLinkClick: i } = r,
            s = Y1(n).start;
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
      return (0, A.jsx)(En.Consumer, {
        children: (a) => {
          let { viewApi: o, options: r, calendarApi: i, baseId: s } = a,
            { moreLinkText: l } = r,
            c = t.hiddenSegs.length,
            u = Y1(t),
            d = s + 'popover-' + u.start.toISOString(),
            f = `+${c}`,
            m = typeof l == 'function' ? l.call(i, c) : `${f} ${l}`,
            v = We(r.moreLinkHint, [c], m),
            g = {
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
                (0, A.jsx)(ce, {
                  tag: 'div',
                  elRef: this.handleLinkEl,
                  className: D(
                    w(
                      t.display === 'row'
                        ? r.rowMoreLinkClass
                        : r.columnMoreLinkClass,
                      g,
                    ),
                    t.className,
                    t.display === 'row' ? S.flexRow : S.flexCol,
                    S.internalMoreLink,
                    S.cursorPointer,
                  ),
                  style: t.style,
                  attrs: {
                    ...t.attrs,
                    ...ki(this.handleClick),
                    title: v,
                    role: 'button',
                    'aria-haspopup': 'dialog',
                    'aria-expanded': n.isPopoverOpen,
                    'aria-controls': n.isPopoverOpen ? d : void 0,
                  },
                  renderProps: g,
                  generatorName: 'moreLinkContent',
                  customGenerator: r.moreLinkContent,
                  defaultGenerator: OR,
                  classNameGenerator: r.moreLinkClass,
                  didMount: r.moreLinkDidMount,
                  willUnmount: r.moreLinkWillUnmount,
                  children: (E) =>
                    (0, A.jsx)(E, {
                      tag: 'div',
                      className: D(
                        w(r.moreLinkInnerClass, g),
                        w(
                          t.display === 'row'
                            ? r.rowMoreLinkInnerClass
                            : r.columnMoreLinkInnerClass,
                          g,
                        ),
                        t.display === 'row' ? S.stickyS : S.stickyT,
                      ),
                    }),
                }),
              n.isPopoverOpen &&
                (0, A.jsx)(Yh, {
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
  function OR(e) {
    return e.text;
  }
  function Y1(e) {
    return e.allDayDate
      ? { start: e.allDayDate, end: ae(e.allDayDate, 1) }
      : { start: TR(e.hiddenSegs), end: DR(e.hiddenSegs) };
  }
  var W1 = te({
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: !0,
    meridiem: 'narrow',
  });
  function F1(e) {
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
  var _h = class extends W {
      render() {
        let { props: t } = this;
        return (0, A.jsx)(Bh, {
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
                    children: (0, A.jsx)(fa, {
                      display: F1(n) ? 'list-item' : 'row',
                      eventRange: a,
                      isStart: n.isStart,
                      isEnd: n.isEnd,
                      isDragging: r,
                      isResizing: i,
                      isMirror: !1,
                      isSelected: o === t.eventSelection,
                      defaultTimeFormat: W1,
                      defaultDisplayEventEnd: !1,
                      ...rr(a, t.todayRange),
                    }),
                  },
                  o,
                );
              }),
            }),
        });
      }
    },
    zh = class extends On {
      constructor() {
        (super(...arguments),
          (this.getDateMeta = B(mr)),
          (this.refineRenderProps = ua(wR)),
          (this.rootElRef = (0, Nn.createRef)()),
          (this.handleBodyEl = (t) => {
            (this.disconnectBodyHeight &&
              (this.disconnectBodyHeight(),
              (this.disconnectBodyHeight = void 0),
              j(this.props.headerHeightRef, null),
              j(this.props.mainHeightRef, null)),
              t &&
                (this.disconnectBodyHeight = Zi(t, (n, a) => {
                  if (this._isUnmounting) return;
                  let { props: o } = this,
                    r = t.getBoundingClientRect(),
                    i = this.rootElRef.current.getBoundingClientRect(),
                    s = r.top - i.top;
                  (jc(this.headerHeight, s) ||
                    ((this.headerHeight = s), j(o.headerHeightRef, s)),
                    o.fgLiquidHeight && j(o.mainHeightRef, a));
                })));
          }));
      }
      render() {
        let { props: t, context: n } = this,
          { options: a, dateEnv: o } = n,
          r = t.showDayNumber && NR(t.date, t.dateProfile.currentRange, o),
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
        let u = Qa(n, t.date);
        return (0, A.jsx)(ce, {
          tag: 'div',
          elRef: this.rootElRef,
          className: D(t.className, s),
          attrs: {
            ...t.attrs,
            role: 'gridcell',
            'aria-label': u,
            ...(c.isToday ? { 'aria-current': 'date' } : {}),
            'data-date': La(t.date),
          },
          style: { width: t.width },
          renderProps: c,
          generatorName: 'dayCellTopContent',
          customGenerator: a.dayCellTopContent,
          defaultGenerator: CR,
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
                        ? dr(n, t.date, void 0, u)
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
                    (0, A.jsx)(_h, {
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
  function CR(e) {
    return e.text || (0, A.jsx)(A.Fragment, { children: '\xA0' });
  }
  function NR(e, t, n) {
    let { start: a, end: o } = t,
      r = Sn(o, -1),
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
  function wR(e) {
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
        (l = be(s))),
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
          return Ga(s);
        },
        get dayNumberText() {
          return Xa(s);
        },
        get monthText() {
          return $h(s);
        },
        options: { businessHours: i },
        view: e.viewApi,
      }
    );
  }
  var eu = class {
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
              (Object.assign(r, U1(r, t)),
                (r.isSlice = !0),
                this.splitSeg(i, r.thickness, r));
            }
            this.allowSlicing
              ? (this.hiddenSegs.push({ ...t, ...U1(t, r) }),
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
        ? (Ih(this.placementsByLevel, n.levelIndex, [r]),
          Ih(this.levelCoords, n.levelIndex, n.levelCoord))
        : Ih(this.placementsByLevel[n.levelIndex], n.lateralIndex, r);
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
          g,
          [E, p] = B1(v, t.start, k1),
          h = E + p;
        for (; (g = v[h]) && g.start < t.end; ) {
          let y = m + g.thickness;
          (y > i && ((i = y), (s = g), (l = f)),
            y === i && (c = Math.max(c, g.depth + 1)),
            (h += 1));
        }
      }
      let u = 0;
      if (s) for (u = l + 1; u < r && o[u] < i; ) u += 1;
      let d = -1;
      return (
        u < r && o[u] === i && ([d] = B1(a[u], t.end, k1)),
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
  function Ih(e, t, n) {
    e.splice(t, 0, n);
  }
  function B1(e, t, n) {
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
  function RR(e, t, n, a, o, r = !0, i, s) {
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
      g = new eu(e, (b) => t.get(Ja(b)), o, l, c, u, r);
    g.traverseSegs((b, O) => {
      (Hh(d, b), m.set(Ja(b), O), b.isSlice && v.set(b.eventRange, !0));
    });
    for (let b of g.hiddenSegs) Hh(f, b);
    if (v.size) {
      (m.clear(),
        (g = new eu($R(e, d), (b) => t.get(Ja(b)), o, l, c, u)),
        g.traverseSegs((b, O) => {
          m.set(Ja(b), O);
        }));
      for (let b of g.hiddenSegs) Hh(f, b);
    }
    let E = [],
      p = [],
      h = [],
      y = [];
    for (let b = 0; b < n.length; b++)
      (E.push([]), p.push([]), h.push([]), y.push(0));
    for (let b of e) {
      let { eventRange: O } = b,
        x = d.get(O) || [],
        C = f.get(O) || [],
        $ = v.get(O) || !1;
      if ((h[b.start].push(b), $)) for (let R of x) h[R.start].push(R);
      for (let R of x) {
        for (let Te = R.start; Te < R.end; Te++) {
          let jt = H1(R, Te);
          E[Te].push(jt);
        }
        let I = Ja(R),
          Ce = m.get(I);
        if (Ce != null) {
          let Te = t.get(I);
          for (let jt = R.start; jt < R.end; jt++)
            y[jt] = Math.max(y[jt], Ce + Te);
        }
      }
      for (let R of C)
        for (let I = R.start; I < R.end; I++) {
          let Ce = H1(R, I);
          (E[I].push(Ce), p[I].push(Ce));
        }
    }
    return [E, p, h, m, y];
  }
  function Hh(e, t) {
    let n = e.get(t.eventRange);
    (n || e.set(t.eventRange, (n = [])), n.push(t));
  }
  function $R(e, t) {
    let n = [];
    for (let a of e) n.push(...(t.get(a.eventRange) || []));
    return n;
  }
  var Lh = class {
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
            (a = ae(a, 1)));
        ((this.dates = i), (this.indices = r), (this.cnt = i.length));
      }
      sliceRange(t) {
        let n = this.getDateDayIndex(t.start),
          a = this.getDateDayIndex(ae(t.end, -1)),
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
          a = Math.floor(la(this.dates[0], t));
        return a < 0 ? n[0] - 1 : a >= n.length ? n[n.length - 1] + 1 : n[a];
      }
    },
    Zh = class {
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
        return this.majorUnit ? ph(t, this.majorUnit, this.dateEnv) : !1;
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
  function P1(e, t, n) {
    let a = new Lh(e.renderRange, t),
      o = /year|month|week/.test(e.currentRangeUnit),
      r = !o && hh(e, n);
    return new Zh(a, o, n, r !== 'day' ? r : void 0);
  }
  function q1(e, t, n) {
    return n == null ? [void 0, void 0] : n / e < t ? [t * e, t] : [n, void 0];
  }
  function V1(e, t, n) {
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
  function _1(e, t, n) {
    let a, o;
    if (t != null) ((a = e.start * t), (o = (n - e.end) * t));
    else {
      let r = 1 / n;
      ((a = Vm(e.start * r)), (o = Vm(1 - e.end * r)));
    }
    return { insetInlineStart: a, insetInlineEnd: o };
  }
  function xR(e, t, n, a, o) {
    let r = n ?? t / a,
      i = Math.floor(e / r),
      s = o ? a - i - 1 : i,
      l = i * r,
      c = l + r;
    return { col: s, left: l, right: c };
  }
  function AR(e, t, n) {
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
  function IR(e, t) {
    return e.querySelectorAll('[role=row]')[t];
  }
  function HR(e, t) {
    return e.querySelectorAll('[role=gridcell]')[t];
  }
  var qh = 60,
    UR = te({ weekday: 'narrow' });
  function j1(e, t, n) {
    return e || kR(t, n);
  }
  function kR(e, t) {
    return e
      ? t > 1
        ? te({
            weekday: 'short',
            weekdayJustify: 'start',
            day: 'numeric',
            omitCommas: !0,
            omitTrailing: !0,
          })
        : te({
            weekday: 'long',
            weekdayJustify: 'start',
            day: 'numeric',
            omitCommas: !0,
            omitTrailing: !0,
          })
      : te({ weekday: 'short' });
  }
  var Wh = class extends Nn.Component {
      constructor() {
        (super(...arguments), (this.rootElRef = (0, Nn.createRef)()));
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
        this.disconnectHeight = hr(t, (n) => {
          this._isUnmounting || j(this.props.heightRef, n);
        });
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0),
          this.disconnectHeight(),
          j(this.props.heightRef, null));
      }
    },
    YR = te({ week: 'narrow' }),
    Fh = class extends W {
      constructor() {
        (super(...arguments),
          (this.headerHeightRefMap = new wn(() => {
            Ka(this.handleSegPositioning);
          })),
          (this.mainHeightRefMap = new wn(() => {
            (this.props.dayMaxEvents === !0 ||
              this.props.dayMaxEventRows === !0) &&
              Ka(this.handleSegPositioning);
          })),
          (this.segHeightRefMap = new wn(() => {
            Ka(this.handleSegPositioning);
          })),
          (this.buildWeekNumberRenderProps = B(BR)),
          (this.handleRootEl = (t) => {
            ((this.rootEl = t), j(this.props.rootElRef, t));
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
          c = Ic(t.fgEventSegs, i.eventOrder),
          [u, d] = this.computeFgDims(),
          [f, m, v, g, E] = RR(
            c,
            this.segHeightRefMap.current,
            r,
            l ? d : void 0,
            i.eventOrderStrict,
            i.eventSlicing,
            t.dayMaxEvents,
            t.dayMaxEventRows,
          ),
          p = [];
        if (u != null) {
          let C = 0;
          for (let $ of r) {
            let R = a.current.get($.key);
            if (R != null) {
              let I = u - R;
              p.push(E[C] + I);
            } else p.push(void 0);
            C++;
          }
        }
        let h = this.getHighlightSegs(),
          y = this.getMirrorSegs(),
          b = i.navLinks,
          O = Qa(n, s, 'week'),
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
              (0, A.jsx)(ce, {
                tag: 'div',
                attrs: {
                  ...(b ? dr(n, s, 'week', O, !1) : {}),
                  role: void 0,
                  'aria-hidden': !0,
                },
                className: S.z1,
                renderProps: x,
                generatorName: 'inlineWeekNumberContent',
                customGenerator: i.inlineWeekNumberContent,
                defaultGenerator: zi,
                classNameGenerator: i.inlineWeekNumberClass,
                didMount: i.inlineWeekNumberDidMount,
                willUnmount: i.inlineWeekNumberWillUnmount,
              }),
            this.renderFillSegs(t.businessHourSegs, 'non-business'),
            this.renderFillSegs(t.bgEventSegs, 'bg-event'),
            this.renderFillSegs(h, 'highlight'),
            t.cells.map((C, $) => {
              let R = this.renderFgSegs(u, v[$], g, t.todayRange, !1);
              return (0, A.jsx)(
                zh,
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
                  fgHeight: p[$],
                  width: t.colWidth,
                  headerHeightRef: a.createRef(C.key),
                  mainHeightRef: o.createRef(C.key),
                },
                C.key,
              );
            }),
            this.renderFgSegs(u, y, g, t.todayRange, !0),
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
          let g = Ja(v),
            { standinFor: E, eventRange: p } = v,
            { instanceId: h } = p.instance;
          if (E) continue;
          let { insetInlineStart: y, insetInlineEnd: b } = _1(v, l, d),
            O = a.get(E ? Ja(E) : g) ?? (r ? 0 : void 0),
            x = t != null && O != null ? t + O : void 0,
            C = !!(i.eventDrag && i.eventDrag.affectedInstances[h]),
            $ = !!(i.eventResize && i.eventResize.affectedInstances[h]),
            R = !r && (C || $ || E || x == null),
            I = F1(v),
            Ce = h === c;
          m.push(
            (0, A.jsx)(
              Wh,
              {
                className: v.start ? S.fakeBorderS : '',
                style: {
                  visibility: R ? 'hidden' : void 0,
                  top: x,
                  insetInlineStart: y,
                  insetInlineEnd: b,
                  zIndex: Ce ? 1e3 : 0,
                },
                heightRef: !E && !r ? s.createRef(g) : null,
                children: (0, A.jsx)(fa, {
                  display: I ? 'list-item' : 'row',
                  eventRange: p,
                  isStart: v.isStart,
                  isEnd: v.isEnd,
                  isDragging: C,
                  isResizing: $,
                  isMirror: r,
                  isSelected: Ce,
                  isNarrow: i.cellIsNarrow,
                  defaultTimeFormat: W1,
                  defaultDisplayEventEnd: f,
                  disableResizing: I,
                  forcedTimeText: u ? '' : void 0,
                  ...rr(p, o),
                }),
              },
              g,
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
            { insetInlineStart: d, insetInlineEnd: f } = _1(c, i, s),
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
                    ? (0, A.jsx)(kh, {
                        eventRange: c.eventRange,
                        isStart: c.isStart,
                        isEnd: c.isEnd,
                        isNarrow: a.cellIsNarrow,
                        isVertical: !1,
                        ...rr(c.eventRange, r),
                      })
                    : vR(n, o.options),
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
        this.disconnectHeight = hr(t, (n) => {
          j(this.props.heightRef, n);
        });
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0),
          this.disconnectHeight(),
          j(this.props.heightRef, null));
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
  function BR(e, t, n, a) {
    let { dateEnv: o, options: r } = t,
      i = o.computeWeekNumber(e),
      s = o.formatToParts(e, r.weekNumberFormat || YR),
      l = be(s),
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
  var Fi = class extends On {
    constructor() {
      (super(...arguments),
        (this.splitBusinessHourSegs = B(Kc)),
        (this.splitBgEventSegs = B(zR)),
        (this.splitFgEventSegs = B(Kc)),
        (this.splitDateSelectionSegs = B(Kc)),
        (this.splitEventDrag = B(I1)),
        (this.splitEventResize = B(I1)),
        (this.rowHeightRefMap = new wn((t, n) => {
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
        g = !t.forPrint && !v,
        E = LR(t.visibleWidth, i, v, o);
      return (0, A.jsx)('div', {
        role: 'rowgroup',
        className: D(t.className, !t.forPrint && S.flexCol),
        style: { width: t.width },
        ref: this.handleRootEl,
        children: r.map((p, h) =>
          (0, A.jsx)(
            Fh,
            {
              role: 'row',
              dateProfile: t.dateProfile,
              todayRange: t.todayRange,
              cells: p,
              cellIsNarrow: t.cellIsNarrow,
              cellIsMicro: t.cellIsMicro,
              showDayNumbers: i > 1,
              showWeekNumbers: i > 1 && o.weekNumbers,
              forPrint: t.forPrint,
              className: D(
                g && S.grow,
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
              heightRef: a.createRef(p[0].key),
            },
            s + ':' + p[0].key,
          ),
        ),
      });
    }
    queryHit(t, n, a, o) {
      let { props: r } = this,
        i = r.cellRows[0].length,
        { col: s, left: l, right: c } = xR(n, o, r.colWidth, i, t),
        {
          row: u,
          top: d,
          bottom: f,
        } = AR(a, r.cellRows, this.rowHeightRefMap.current),
        m = r.cellRows[u][s],
        v = m.date,
        g = ae(v, 1);
      return {
        dateProfile: r.dateProfile,
        dateSpan: {
          range: { start: v, end: g },
          allDay: !0,
          ...m.dateSpanProps,
        },
        getDayEl: () => HR(IR(this.rootEl, u), s),
        rect: { left: l, right: c, top: d, bottom: f },
        layer: 0,
      };
    }
  };
  function _R(e) {
    return e.eventRange.def.allDay;
  }
  function zR(e, t) {
    return Kc(e.filter(_R), t);
  }
  function LR(e, t, n, a) {
    if (e != null) {
      let o = e / a.aspectRatio / 6;
      return t > 6 || n ? o : 0;
    }
    return 0;
  }
  var Ph = class extends W {
    constructor() {
      (super(...arguments),
        (this.state = {}),
        (this.buildDayHeaderText = B(ZR)),
        (this.handleInnerEl = (t) => {
          (this.disconnectSize &&
            (this.disconnectSize(), (this.disconnectSize = void 0)),
            t
              ? (this.disconnectSize = Zi(t, (n, a) => {
                  this._isUnmounting ||
                    (j(this.props.innerHeightRef, a),
                    this.setState({ innerWidth: n }));
                }))
              : j(this.props.innerHeightRef, null));
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
        (0, A.jsx)(ce, {
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
          defaultGenerator: zi,
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
        u = o ? this.buildDayHeaderText(r, UR, !1, l) : c;
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
  function ZR(e, t, n, a) {
    let o = a.formatToParts(e, t);
    return {
      text: be(o),
      textParts: o,
      weekdayText: Ga(o),
      dayNumberText: n ? Xa(o) : '',
    };
  }
  var tu = class extends W {
    constructor() {
      (super(...arguments),
        (this.innerHeightRefMap = new wn(() => {
          Ka(this.handleInnerHeights);
        })),
        (this.handleInnerHeights = () => {
          if (this._isUnmounting) return;
          let t = this.innerHeightRefMap.current,
            n = 0;
          for (let a of t.values()) n = Math.max(n, a);
          this.currentInnerHeight !== n &&
            ((this.currentInnerHeight = n), j(this.props.innerHeightRef, n));
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
            Ph,
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
        j(this.props.innerHeightRef, null));
    }
  };
  var G = U(P(), 1);
  var da = U(dt(), 1);
  var nu = class extends W {
      render() {
        let { props: t } = this,
          { headerTiers: n } = t;
        return (0, G.jsx)('div', {
          role: 'rowgroup',
          className: D(t.className, S.flexCol, t.width == null && S.liquid),
          style: { width: t.width },
          children: n.map((a, o) =>
            (0, da.createElement)(tu, {
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
    Vh = class extends W {
      constructor() {
        (super(...arguments),
          (this.state = {}),
          (this.handleScroller = (t) => {
            j(this.props.scrollerRef, t);
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
          { borderlessX: r, borderlessTop: i, borderlessBottom: s } = Dn(o),
          { totalWidth: l, clientWidth: c } = n,
          u = l != null && c != null ? l - c : void 0;
        u < 3 && (u = 0);
        let d = !t.forPrint && !Ke(o),
          f = !t.forPrint && mh(o),
          m = t.cellRows[0].length,
          v = c != null ? c / m : void 0,
          g = v != null && v <= qh,
          E = g || (v != null && v <= o.dayNarrowWidth);
        return (0, G.jsxs)(G.Fragment, {
          children: [
            o.dayHeaders &&
              (0, G.jsxs)('div', {
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
                  (0, G.jsxs)('div', {
                    className: S.flexRow,
                    children: [
                      (0, G.jsx)(nu, {
                        headerTiers: t.headerTiers,
                        cellIsNarrow: E,
                        cellIsMicro: g,
                      }),
                      !!u &&
                        (0, G.jsx)('div', {
                          className: D(
                            w(o.fillerClass, { inTableHeader: !0 }),
                            S.borderOnlyS,
                          ),
                          style: { minWidth: u },
                        }),
                    ],
                  }),
                  (0, G.jsx)('div', {
                    className: w(o.dayHeaderDividerClass, {
                      isSticky: f,
                      multiMonthColumns: 0,
                      options: { allDaySlot: !!o.allDaySlot },
                    }),
                  }),
                ],
              }),
            (0, G.jsx)(Cn, {
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
              children: (0, G.jsx)(Fi, {
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
                cellIsMicro: g,
                rowHeightRefMap: t.rowHeightRefMap,
              }),
            }),
            (0, G.jsx)(Wi, { widthRef: this.handleTotalWidth }),
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
    jh = class extends W {
      constructor() {
        (super(...arguments), (this.rootElRef = (0, da.createRef)()));
      }
      render() {
        let { props: t } = this;
        return (0, G.jsx)('div', {
          ref: this.rootElRef,
          className: D(
            S.footerScrollbar,
            t.isSticky && S.footerScrollbarSticky,
          ),
          children: (0, G.jsx)(Cn, {
            horizontal: !0,
            ref: t.scrollerRef,
            children: (0, G.jsx)('div', { style: { minWidth: t.canvasWidth } }),
          }),
        });
      }
      componentDidMount() {
        ((this._isUnmounting = !1),
          (this.disconnectHeight = hr(this.rootElRef.current, (t) => {
            this._isUnmounting || j(this.props.scrollbarWidthRef, t);
          })));
      }
      componentWillUnmount() {
        ((this._isUnmounting = !0),
          this.disconnectHeight(),
          j(this.props.scrollbarWidthRef, null));
      }
    },
    Gh = class extends W {
      constructor() {
        (super(...arguments),
          (this.state = {}),
          (this.headerScrollerRef = (0, da.createRef)()),
          (this.bodyScrollerRef = (0, da.createRef)()),
          (this.footerScrollerRef = (0, da.createRef)()),
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
          { borderlessX: r, borderlessTop: i, borderlessBottom: s } = Dn(o),
          { totalWidth: l, clientWidth: c } = n,
          u = l != null && c != null ? l - c : void 0,
          d = !t.forPrint && !Ke(o),
          f = !t.forPrint && mh(o),
          m = !t.forPrint && ZT(o),
          v = t.cellRows[0].length,
          [g, E] = q1(v, t.dayMinWidth, c),
          p = E != null && E <= qh,
          h = p || (E != null && E <= o.dayNarrowWidth);
        return (0, G.jsxs)(G.Fragment, {
          children: [
            o.dayHeaders &&
              (0, G.jsxs)('div', {
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
                  (0, G.jsxs)(Cn, {
                    horizontal: !0,
                    hideScrollbars: !0,
                    className: S.flexRow,
                    ref: this.headerScrollerRef,
                    children: [
                      (0, G.jsx)(nu, {
                        headerTiers: t.headerTiers,
                        colWidth: E,
                        viewportWidth: c,
                        width: g,
                        cellIsNarrow: h,
                        cellIsMicro: p,
                      }),
                      !!u &&
                        (0, G.jsx)('div', {
                          className: D(
                            w(o.fillerClass, { inTableHeader: !0 }),
                            S.borderOnlyS,
                          ),
                          style: { minWidth: u },
                        }),
                    ],
                  }),
                  (0, G.jsx)('div', {
                    className: w(o.dayHeaderDividerClass, {
                      isSticky: f,
                      multiMonthColumns: 0,
                      options: { allDaySlot: !!o.allDaySlot },
                    }),
                  }),
                ],
              }),
            (0, G.jsx)(Cn, {
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
              children: (0, G.jsx)(Fi, {
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
                width: g,
                visibleWidth: l,
                cellIsNarrow: h,
                cellIsMicro: p,
                rowHeightRefMap: t.rowHeightRefMap,
              }),
            }),
            !!m &&
              (0, G.jsx)(jh, {
                isSticky: !0,
                canvasWidth: g,
                scrollerRef: this.footerScrollerRef,
              }),
            (0, G.jsx)(Wi, { widthRef: this.handleTotalWidth }),
          ],
        });
      }
      componentDidMount() {
        this._isUnmounting = !1;
        let t = WT(this.context.pluginHooks);
        ((this.syncedScroller = new t(!0)),
          j(this.props.scrollerRef, this.syncedScroller),
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
    au = class extends W {
      constructor() {
        (super(...arguments),
          (this.scrollerRef = (0, da.createRef)()),
          (this.rowHeightRefMap = new wn(() => {
            Ka(this.updateScrollY);
          })),
          (this.scrollDate = null),
          (this.updateScrollY = () => {
            if (this._isUnmounting) return;
            let t = this.rowHeightRefMap.current,
              n = this.scrollerRef.current;
            if (n && this.scrollDate) {
              let a = V1(this.scrollDate, this.props.cellRows, t);
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
          { borderlessX: o, borderlessTop: r, borderlessBottom: i } = Dn(a),
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
        return (0, G.jsx)(ur, {
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
            ? (0, G.jsx)(Gh, { ...d, dayMinWidth: a.dayMinWidth })
            : (0, G.jsx)(Vh, { ...d }),
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
  var ou = class extends sr {
    buildRenderRange(t, n, a) {
      let o = super.buildRenderRange(t, n, a),
        { props: r } = this;
      return WR({
        currentRange: o,
        snapToWeek: /^(year|month)$/.test(n),
        fixedWeekCount: r.fixedWeekCount,
        dateEnv: r.dateEnv,
      });
    }
  };
  function WR(e) {
    let { dateEnv: t, currentRange: n } = e,
      { start: a, end: o } = n,
      r;
    if (
      (e.snapToWeek &&
        ((a = t.startOfWeek(a)),
        (r = t.startOfWeek(o)),
        r.valueOf() !== o.valueOf() && (o = Fm(r, 1))),
      e.fixedWeekCount)
    ) {
      let i = t.startOfWeek(t.startOfMonth(ae(n.end, -1))),
        s = Math.ceil(ZS(i, o));
      o = Fm(o, 6 - s);
    }
    return { start: a, end: o };
  }
  var Qh = class extends W {
      constructor() {
        (super(...arguments),
          (this.buildDayTableModel = B(P1)),
          (this.buildDateRowConfigs = B(L1)),
          (this.createDayHeaderFormatter = B(j1)),
          (this.slicer = new Jc()));
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
        return (0, Xh.jsx)(ja, {
          unit: 'day',
          children: (u, d) => {
            let f = this.buildDateRowConfigs(i.headerDates, s, a, d, l, n);
            return (0, Xh.jsx)(au, {
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
    Kh = {
      name: 'daygrid',
      initialView: 'dayGridMonth',
      views: {
        dayGrid: { component: Qh, dateProfileGeneratorClass: ou },
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
  var he = U(P(), 1);
  var ru = class extends W {
      render() {
        let { props: t, context: n } = this,
          { options: a } = n,
          o = n.dateEnv.formatToParts(t.dayDate, t.dayFormat),
          r = be(o),
          i = a.navLinks,
          s = {
            ...t.dateMeta,
            view: n.viewApi,
            text: r,
            textParts: o,
            get weekdayText() {
              return Ga(o);
            },
            get dayNumberText() {
              return Xa(o);
            },
            hasNavLink: i,
            level: t.level,
          },
          l = i
            ? dr(this.context, t.dayDate, void 0, r, this.props.isTabbable)
            : {};
        return (0, he.jsx)(ce, {
          tag: 'div',
          attrs: l,
          renderProps: s,
          generatorName: 'listDayHeaderContent',
          customGenerator: a.listDayHeaderContent,
          defaultGenerator: zi,
          classNameGenerator: a.listDayHeaderInnerClass,
        });
      }
    },
    Jh = class extends W {
      render() {
        let { options: t, viewApi: n, viewSpec: a } = this.context,
          { dayDate: o, dateMeta: r } = this.props,
          i = !this.props.forPrint,
          s = t.listDayFormat ?? FR(a),
          l = t.listDayAltFormat ?? PR(a),
          c = { ...r, view: n };
        return (0, he.jsx)(ce, {
          tag: 'div',
          attrs: {
            'data-date': La(o),
            ...(r.isToday ? { 'aria-current': 'date' } : {}),
          },
          className: i ? S.stickyT : '',
          renderProps: c,
          generatorName: void 0,
          classNameGenerator: t.listDayHeaderClass,
          didMount: t.listDayHeaderDidMount,
          willUnmount: t.listDayHeaderWillUnmount,
          children: () =>
            (0, he.jsxs)(he.Fragment, {
              children: [
                !!s &&
                  (0, he.jsx)(ru, {
                    dayDate: o,
                    dayFormat: s,
                    isTabbable: !0,
                    dateMeta: r,
                    level: 0,
                  }),
                !!l &&
                  (0, he.jsx)(ru, {
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
  function FR({ durationUnit: e, singleUnit: t }) {
    return t === 'day' ? fr : e === 'day' || t === 'week' ? fr : Xc;
  }
  function PR({ durationUnit: e, singleUnit: t }) {
    if (t !== 'day') return e === 'day' || t === 'week' ? Xc : fr;
  }
  var qR = te({ hour: 'numeric', minute: '2-digit', meridiem: 'short' }),
    ep = class extends W {
      render() {
        let { props: t, context: n } = this,
          { eventRange: a } = t,
          { displayEventTime: o } = n.options,
          r =
            o !== !1 && (a.def.allDay || (!t.isStart && !t.isEnd))
              ? n.options.allDayText
              : void 0;
        return (0, he.jsx)(fa, {
          ...t,
          attrs: { role: 'listitem' },
          forcedTimeText: r,
          defaultTimeFormat: qR,
          disableDragging: !0,
          disableResizing: !0,
          disableZindexes: !0,
          display: 'list-item',
        });
      }
    },
    tp = class extends W {
      constructor() {
        (super(...arguments),
          (this.getDateMeta = B(mr)),
          (this.sortEventSegs = B(Ic)));
      }
      render() {
        let { props: t, context: n } = this,
          { nowDate: a, todayRange: o } = t,
          { options: r } = n,
          i = this.getDateMeta(t.dayDate, n.dateEnv, void 0, o),
          s = this.sortEventSegs(t.segs, r.eventOrder),
          l = Qa(this.context, t.dayDate),
          c = { ...i, isFirst: t.isFirst, isLast: t.isLast, view: n.viewApi },
          u = { ...i, view: n.viewApi };
        return (0, he.jsxs)('div', {
          role: 'listitem',
          'aria-label': l,
          className: w(r.listDayClass, c),
          children: [
            (0, he.jsx)(Jh, {
              dayDate: t.dayDate,
              dateMeta: i,
              forPrint: t.forPrint,
            }),
            (0, he.jsx)('div', {
              role: 'list',
              'aria-label': r.eventsHint,
              className: D(w(r.listDayBodyClass, u), S.flexCol),
              children: s.map((d, f) => {
                let m = xc(d),
                  v = f === 0,
                  g = f === s.length - 1;
                return (0, he.jsx)(
                  ep,
                  {
                    eventRange: d.eventRange,
                    slicedStart: d.slicedStart,
                    slicedEnd: d.slicedEnd,
                    isStart: d.isStart,
                    isEnd: d.isEnd,
                    isFirst: v,
                    isLast: g,
                    isDragging: !1,
                    isResizing: !1,
                    isMirror: !1,
                    isSelected: !1,
                    ...rr(d.eventRange, o, a),
                  },
                  m,
                );
              }),
            }),
          ],
        });
      }
    },
    np = class extends On {
      constructor() {
        (super(...arguments),
          (this.computeDateVars = B(jR)),
          (this.eventStoreToSegs = B(this._eventStoreToSegs)),
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
        return (0, he.jsx)(ur, {
          viewSpec: n.viewSpec,
          className: D(t.className, S.flexCol),
          elRef: this.setRootEl,
          children: i.length
            ? (0, he.jsx)(Cn, {
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
        return (0, he.jsx)(ce, {
          tag: 'div',
          attrs: { role: 'status' },
          renderProps: a,
          generatorName: 'noEventsContent',
          customGenerator: t.noEventsContent,
          defaultGenerator: VR,
          classNameGenerator: t.noEventsClass,
          className: S.grow,
          didMount: t.noEventsDidMount,
          willUnmount: t.noEventsWillUnmount,
          children: (o) =>
            (0, he.jsx)(o, {
              tag: 'div',
              className: w(t.noEventsInnerClass, a),
            }),
        });
      }
      renderSegList(t, n) {
        let { options: a } = this.context,
          o = GR(t);
        return (0, he.jsx)('div', {
          role: 'list',
          'aria-labelledby': this.props.labelId,
          'aria-label': this.props.labelStr,
          className: D(S.flexCol, D(a.listDaysClass)),
          children: (0, he.jsx)(ja, {
            unit: 'day',
            children: (r, i) => {
              let s = [],
                l = o.reduce((u, d) => u + (d ? 1 : 0), 0),
                c = 0;
              for (let u = 0; u < o.length; u += 1) {
                let d = o[u];
                if (d) {
                  let f = n[u],
                    m = La(f),
                    v = c === 0,
                    g = c === l - 1;
                  (s.push(
                    (0, he.jsx)(
                      tp,
                      {
                        dayDate: f,
                        nowDate: r,
                        todayRange: i,
                        segs: d,
                        isFirst: v,
                        isLast: g,
                        forPrint: this.props.forPrint,
                      },
                      m,
                    ),
                  ),
                    (c += 1));
                }
              }
              return (0, he.jsx)(he.Fragment, { children: s });
            },
          }),
        });
      }
      _eventStoreToSegs(t, n, a) {
        return this.eventRangesToSegs(
          Bi(
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
          let i = $t(a, n[o]);
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
  function VR(e) {
    return e.text;
  }
  function jR(e) {
    let t = X(e.renderRange.start),
      n = e.renderRange.end,
      a = [],
      o = [];
    for (; t < n; )
      (a.push(t), o.push({ start: t, end: ae(t, 1) }), (t = ae(t, 1)));
    return { dayDates: a, dayRanges: o };
  }
  function GR(e) {
    let t = [],
      n,
      a;
    for (n = 0; n < e.length; n += 1)
      ((a = e[n]), (t[a.dayIndex] || (t[a.dayIndex] = [])).push(a));
    return t;
  }
  var ap = {
    name: 'list',
    views: {
      list: {
        component: np,
        buttonTextKey: 'listText',
        disallowAmbigTitle: !0,
      },
      listDay: { type: 'list', duration: { days: 1 } },
      listWeek: { type: 'list', duration: { weeks: 1 } },
      listMonth: { type: 'list', duration: { month: 1 } },
      listYear: { type: 'list', duration: { year: 1 } },
    },
  };
  function G1(e) {
    if (e) {
      let n = e.replace(/\\/g, '').split('-');
      return `${n[0].trim()}, ${n[1].trim()}`;
    }
    return '';
  }
  function X1(e) {
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
  var Ut = U(P());
  function op({ closeModal: e, info: t }) {
    return (0, Ut.jsx)('div', {
      id: 'modal',
      className:
        'fixed top-0 left-0 w-full h-full bg-[#9fa9a3]/80 flex items-center justify-center z-1',
      children: (0, Ut.jsxs)('div', {
        className: 'calendar-modal',
        children: [
          (0, Ut.jsx)('h3', { children: t.event.title }),
          (0, Ut.jsx)('h4', { children: G1(t.event.extendedProps.location) }),
          (0, Ut.jsx)('h5', { children: X1(t.event.startStr) }),
          (0, Ut.jsx)('div', { children: t.event.extendedProps.description }),
          (0, Ut.jsx)('button', {
            onClick: e,
            className:
              'absolute top-1 right-1 bg-transparent border-none cursor-pointer',
            children: (0, Ut.jsx)('svg', {
              xmlns: 'http://www.w3.org/2000/svg',
              x: '0px',
              y: '0px',
              width: '20',
              height: '20',
              viewBox: '0 0 50 50',
              className: 'stroke-[#9fa9a3] fill-[#9fa9a3]',
              children: (0, Ut.jsx)('path', {
                d: 'M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z',
              }),
            }),
          }),
        ],
      }),
    });
  }
  var rp = U(dt()),
    Pi = U(P());
  function ip({ events: e, view: t = 'dayGridMonth' }) {
    let [n, a] = (0, rp.useState)(!1),
      [o, r] = (0, rp.useState)(null);
    return (0, Pi.jsxs)('div', {
      className: 'p-6 h-lvh',
      children: [
        (0, Pi.jsx)(M1, {
          availableViews: ['dayGridMonth', 'listMonth'],
          initialView: t,
          plugins: [Kh, ap],
          height: t === 'listMonth' ? '95vh' : void 0,
          events: e,
          headerToolbar: { start: 'title', end: 'prev,next' },
          eventClick: (s) => {
            (s.jsEvent.preventDefault(), r(s), a(!0));
          },
        }),
        n && (0, Pi.jsx)(op, { info: o, closeModal: () => a(!1) }),
      ],
    });
  }
  var qi = U(P());
  function sp({ events: e }) {
    let [t, n] = (0, iu.useState)(null);
    return (
      (0, iu.useEffect)(() => {
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
        ? (0, qi.jsx)(qi.Fragment, {
            children: (0, qi.jsx)(ip, { events: e, view: t }),
          })
        : null
    );
  }
  var lu = U(P());
  function XR(e, t) {
    (0, su.createRoot)(e).render((0, lu.jsx)(Qd, { events: t }));
  }
  function QR(e, t) {
    (0, su.createRoot)(e).render((0, lu.jsx)(tm, { groups: t }));
  }
  function KR(e, t) {
    (0, su.createRoot)(e).render((0, lu.jsx)(sp, { events: t }));
  }
  window.ChurchEmbed = { mountEvents: XR, mountGroups: QR, mountCalendar: KR };
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
//# sourceMappingURL=church-client.js.map
