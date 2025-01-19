var game = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // (disabled):crypto
  var require_crypto = __commonJS({
    "(disabled):crypto"() {
    }
  });

  // node_modules/uuid-random/index.js
  var require_uuid_random = __commonJS({
    "node_modules/uuid-random/index.js"(exports, module) {
      "use strict";
      (function() {
        var buf, bufIdx = 0, hexBytes = [], i;
        for (i = 0; i < 256; i++) {
          hexBytes[i] = (i + 256).toString(16).substr(1);
        }
        uuid2.BUFFER_SIZE = 4096;
        uuid2.bin = uuidBin;
        uuid2.clearBuffer = function() {
          buf = null;
          bufIdx = 0;
        };
        uuid2.test = function(uuid3) {
          if (typeof uuid3 === "string") {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid3);
          }
          return false;
        };
        var crypt0;
        if (typeof crypto !== "undefined") {
          crypt0 = crypto;
        } else if (typeof window !== "undefined" && typeof window.msCrypto !== "undefined") {
          crypt0 = window.msCrypto;
        }
        if (typeof module !== "undefined" && typeof __require === "function") {
          crypt0 = crypt0 || require_crypto();
          module.exports = uuid2;
        } else if (typeof window !== "undefined") {
          window.uuid = uuid2;
        }
        uuid2.randomBytes = function() {
          if (crypt0) {
            if (crypt0.randomBytes) {
              return crypt0.randomBytes;
            }
            if (crypt0.getRandomValues) {
              if (typeof Uint8Array.prototype.slice !== "function") {
                return function(n2) {
                  var bytes = new Uint8Array(n2);
                  crypt0.getRandomValues(bytes);
                  return Array.from(bytes);
                };
              }
              return function(n2) {
                var bytes = new Uint8Array(n2);
                crypt0.getRandomValues(bytes);
                return bytes;
              };
            }
          }
          return function(n2) {
            var i2, r = [];
            for (i2 = 0; i2 < n2; i2++) {
              r.push(Math.floor(Math.random() * 256));
            }
            return r;
          };
        }();
        function randomBytesBuffered(n2) {
          if (!buf || bufIdx + n2 > uuid2.BUFFER_SIZE) {
            bufIdx = 0;
            buf = uuid2.randomBytes(uuid2.BUFFER_SIZE);
          }
          return buf.slice(bufIdx, bufIdx += n2);
        }
        __name(randomBytesBuffered, "randomBytesBuffered");
        function uuidBin() {
          var b = randomBytesBuffered(16);
          b[6] = b[6] & 15 | 64;
          b[8] = b[8] & 63 | 128;
          return b;
        }
        __name(uuidBin, "uuidBin");
        function uuid2() {
          var b = uuidBin();
          return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
        }
        __name(uuid2, "uuid");
      })();
    }
  });

  // node_modules/json-stringify-safe/stringify.js
  var require_stringify = __commonJS({
    "node_modules/json-stringify-safe/stringify.js"(exports, module) {
      exports = module.exports = stringify;
      exports.getSerialize = serializer;
      function stringify(obj, replacer, spaces, cycleReplacer) {
        return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
      }
      __name(stringify, "stringify");
      function serializer(replacer, cycleReplacer) {
        var stack = [], keys = [];
        if (cycleReplacer == null)
          cycleReplacer = /* @__PURE__ */ __name(function(key, value) {
            if (stack[0] === value)
              return "[Circular ~]";
            return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
          }, "cycleReplacer");
        return function(key, value) {
          if (stack.length > 0) {
            var thisPos = stack.indexOf(this);
            ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
            ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
            if (~stack.indexOf(value))
              value = cycleReplacer.call(this, key, value);
          } else
            stack.push(value);
          return replacer == null ? value : replacer.call(this, key, value);
        };
      }
      __name(serializer, "serializer");
    }
  });

  // node_modules/random-seed/index.js
  var require_random_seed = __commonJS({
    "node_modules/random-seed/index.js"(exports, module) {
      "use strict";
      var stringify = require_stringify();
      var Mash = /* @__PURE__ */ __name(function() {
        var n2 = 4022871197;
        var mash = /* @__PURE__ */ __name(function(data) {
          if (data) {
            data = data.toString();
            for (var i = 0; i < data.length; i++) {
              n2 += data.charCodeAt(i);
              var h = 0.02519603282416938 * n2;
              n2 = h >>> 0;
              h -= n2;
              h *= n2;
              n2 = h >>> 0;
              h -= n2;
              n2 += h * 4294967296;
            }
            return (n2 >>> 0) * 23283064365386963e-26;
          } else {
            n2 = 4022871197;
          }
        }, "mash");
        return mash;
      }, "Mash");
      var uheprng = /* @__PURE__ */ __name(function(seed) {
        return function() {
          var o = 48;
          var c = 1;
          var p = o;
          var s = new Array(o);
          var i;
          var j;
          var k = 0;
          var mash = new Mash();
          for (i = 0; i < o; i++) {
            s[i] = mash(Math.random());
          }
          var rawprng = /* @__PURE__ */ __name(function() {
            if (++p >= o) {
              p = 0;
            }
            var t = 1768863 * s[p] + c * 23283064365386963e-26;
            return s[p] = t - (c = t | 0);
          }, "rawprng");
          var random3 = /* @__PURE__ */ __name(function(range2) {
            return Math.floor(range2 * (rawprng() + (rawprng() * 2097152 | 0) * 11102230246251565e-32));
          }, "random");
          random3.string = function(count) {
            var i2;
            var s2 = "";
            for (i2 = 0; i2 < count; i2++) {
              s2 += String.fromCharCode(33 + random3(94));
            }
            return s2;
          };
          var hash = /* @__PURE__ */ __name(function() {
            var args = Array.prototype.slice.call(arguments);
            for (i = 0; i < args.length; i++) {
              for (j = 0; j < o; j++) {
                s[j] -= mash(args[i]);
                if (s[j] < 0) {
                  s[j] += 1;
                }
              }
            }
          }, "hash");
          random3.cleanString = function(inStr) {
            inStr = inStr.replace(/(^\s*)|(\s*$)/gi, "");
            inStr = inStr.replace(/[\x00-\x1F]/gi, "");
            inStr = inStr.replace(/\n /, "\n");
            return inStr;
          };
          random3.hashString = function(inStr) {
            inStr = random3.cleanString(inStr);
            mash(inStr);
            for (i = 0; i < inStr.length; i++) {
              k = inStr.charCodeAt(i);
              for (j = 0; j < o; j++) {
                s[j] -= mash(k);
                if (s[j] < 0) {
                  s[j] += 1;
                }
              }
            }
          };
          random3.seed = function(seed2) {
            if (typeof seed2 === "undefined" || seed2 === null) {
              seed2 = Math.random();
            }
            if (typeof seed2 !== "string") {
              seed2 = stringify(seed2, function(key, value) {
                if (typeof value === "function") {
                  return value.toString();
                }
                return value;
              });
            }
            random3.initState();
            random3.hashString(seed2);
          };
          random3.addEntropy = function() {
            var args = [];
            for (i = 0; i < arguments.length; i++) {
              args.push(arguments[i]);
            }
            hash(k++ + (/* @__PURE__ */ new Date()).getTime() + args.join("") + Math.random());
          };
          random3.initState = function() {
            mash();
            for (i = 0; i < o; i++) {
              s[i] = mash(" ");
            }
            c = 1;
            p = o;
          };
          random3.done = function() {
            mash = null;
          };
          if (typeof seed !== "undefined") {
            random3.seed(seed);
          }
          random3.range = function(range2) {
            return random3(range2);
          };
          random3.random = function() {
            return random3(Number.MAX_VALUE - 1) / Number.MAX_VALUE;
          };
          random3.floatBetween = function(min, max) {
            return random3.random() * (max - min) + min;
          };
          random3.intBetween = function(min, max) {
            return Math.floor(random3.random() * (max - min + 1)) + min;
          };
          return random3;
        }();
      }, "uheprng");
      uheprng.create = function(seed) {
        return new uheprng(seed);
      };
      module.exports = uheprng;
    }
  });

  // src/game/game-interface.ts
  var game_interface_exports = {};
  __export(game_interface_exports, {
    default: () => game_interface_default
  });

  // node_modules/@boardzilla/core/entry/board/element-collection.js
  var ElementCollection = class _ElementCollection extends Array {
    static {
      __name(this, "ElementCollection");
    }
    slice(...a) {
      return super.slice(...a);
    }
    filter(...a) {
      return super.filter(...a);
    }
    all(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, {}, ...finders);
      }
      return this._finder(className, {}, ...finders);
    }
    _finder(className, options, ...finders) {
      const coll = new _ElementCollection();
      if (options.limit !== void 0 && options.limit <= 0)
        return coll;
      const fns = finders.map((finder) => {
        if (typeof finder === "object") {
          const attrs = finder;
          return (el) => Object.entries(attrs).every(([k1, v1]) => (k1 === "empty" ? el.isEmpty() : el[k1]) === v1);
        }
        if (typeof finder === "string") {
          const name = finder;
          return (el) => el.name === name;
        }
        return finder;
      });
      const finderFn = /* @__PURE__ */ __name((el, order) => {
        if ((!className || el instanceof className) && fns.every((fn) => fn(el))) {
          if (order === "asc") {
            coll.push(el);
          } else {
            coll.unshift(el);
          }
        }
        if (!options.noRecursive) {
          if (options.limit !== void 0) {
            coll.push(...el._t.children._finder(className, { limit: options.limit - coll.length, order: options.order }, ...finders));
          } else {
            coll.push(...el._t.children._finder(className, {}, ...finders));
          }
        }
      }, "finderFn");
      if (options.order === "desc") {
        for (let e = this.length - 1; e >= 0; e--) {
          const el = this[e];
          if (options.limit !== void 0 && coll.length >= options.limit)
            break;
          finderFn(el, "desc");
        }
      } else {
        for (const el of this) {
          if (options.limit !== void 0 && coll.length >= options.limit)
            break;
          finderFn(el, "asc");
        }
      }
      return coll;
    }
    first(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: 1 }, ...finders)[0];
      }
      return this._finder(className, { limit: 1 }, ...finders)[0];
    }
    firstN(n2, className, ...finders) {
      if (typeof n2 !== "number")
        throw Error("first argument must be number of matches");
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: n2 }, ...finders);
      }
      return this._finder(className, { limit: n2 }, ...finders);
    }
    last(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: 1, order: "desc" }, ...finders)[0];
      }
      return this._finder(className, { limit: 1, order: "desc" }, ...finders)[0];
    }
    lastN(n2, className, ...finders) {
      if (typeof n2 !== "number")
        throw Error("first argument must be number of matches");
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: n2, order: "desc" }, ...finders);
      }
      return this._finder(className, { limit: n2, order: "desc" }, ...finders);
    }
    top(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: 1 }, ...finders)[0];
      }
      return this._finder(className, { limit: 1 }, ...finders)[0];
    }
    topN(n2, className, ...finders) {
      if (typeof n2 !== "number")
        throw Error("first argument must be number of matches");
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: n2 }, ...finders);
      }
      return this._finder(className, { limit: n2 }, ...finders);
    }
    bottom(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: 1, order: "desc" }, ...finders)[0];
      }
      return this._finder(className, { limit: 1, order: "desc" }, ...finders)[0];
    }
    bottomN(n2, className, ...finders) {
      if (typeof n2 !== "number")
        throw Error("first argument must be number of matches");
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return this._finder(void 0, { limit: n2, order: "desc" }, ...finders);
      }
      return this._finder(className, { limit: n2, order: "desc" }, ...finders);
    }
    /**
     * Show these elements to all players
     * @category Visibility
     */
    showToAll() {
      for (const el of this) {
        delete el._visible;
      }
    }
    /**
     * Show these elements only to the given player
     * @category Visibility
     */
    showOnlyTo(player) {
      if (typeof player !== "number")
        player = player.position;
      for (const el of this) {
        el._visible = {
          default: false,
          except: [player]
        };
      }
    }
    /**
     * Show these elements to the given players without changing it's visibility to
     * any other players.
     * @category Visibility
     */
    showTo(...player) {
      if (typeof player[0] !== "number")
        player = player.map((p) => p.position);
      for (const el of this) {
        if (el._visible === void 0)
          continue;
        if (el._visible.default) {
          if (!el._visible.except)
            continue;
          el._visible.except = el._visible.except.filter((i) => !player.includes(i));
        } else {
          el._visible.except = Array.from(/* @__PURE__ */ new Set([...el._visible.except instanceof Array ? el._visible.except : [], ...player]));
        }
      }
    }
    /**
     * Hide this element from all players
     * @category Visibility
     */
    hideFromAll() {
      for (const el of this) {
        el._visible = { default: false };
      }
    }
    /**
     * Hide these elements from the given players without changing it's visibility to
     * any other players.
     * @category Visibility
     */
    hideFrom(...player) {
      if (typeof player[0] !== "number")
        player = player.map((p) => p.position);
      for (const el of this) {
        if (el._visible?.default === false && !el._visible.except)
          continue;
        if (el._visible === void 0 || el._visible.default === true) {
          el._visible = {
            default: true,
            except: Array.from(/* @__PURE__ */ new Set([...el._visible?.except instanceof Array ? el._visible.except : [], ...player]))
          };
        } else {
          if (!el._visible.except)
            continue;
          el._visible.except = el._visible.except.filter((i) => !player.includes(i));
        }
      }
    }
    /**
     * Sorts this collection by some {@link Sorter}.
     * @category Structure
     */
    sortBy(key, direction) {
      const rank = /* @__PURE__ */ __name((e, k) => typeof k === "function" ? k(e) : e[k], "rank");
      const [up, down] = direction === "desc" ? [-1, 1] : [1, -1];
      return this.sort((a, b) => {
        const keys = key instanceof Array ? key : [key];
        for (const k of keys) {
          const r1 = rank(a, k);
          const r2 = rank(b, k);
          if (r1 > r2)
            return up;
          if (r1 < r2)
            return down;
        }
        return 0;
      });
    }
    /**
     * Returns a copy of this collection sorted by some {@link Sorter}.
     * @category Structure
     */
    sortedBy(key, direction = "asc") {
      return this.slice(0, this.length).sortBy(key, direction);
    }
    /**
     * Returns the sum of all elements in this collection measured by a provided key
     * @category Queries
     *
     * @example
     * deck.create(Card, '2', { pips: 2 });
     * deck.create(Card, '3', { pips: 3 });
     * deck.all(Card).sum('pips'); // => 5
     */
    sum(key) {
      return this.reduce((sum, n2) => sum + (typeof key === "function" ? key(n2) : n2[key]), 0);
    }
    /**
     * Returns the element in this collection with the highest value of the
     * provided key(s).
     * @category Queries
     *
     * @param attributes - any number of {@link Sorter | Sorter's} used for
     * comparing. If multiple are provided, subsequent ones are used to break ties
     * on earlier ones.
     *
     * @example
     * army.create(Soldier, 'a', { strength: 2, initiative: 3 });
     * army.create(Soldier, 'b', { strength: 3, initiative: 1 });
     * army.create(Soldier, 'c', { strength: 3, initiative: 2 });
     * army.all(Solider).withHighest('strength', 'initiative'); // => Soldier 'c'
     */
    withHighest(...attributes) {
      return this.sortedBy(attributes, "desc")[0];
    }
    /**
     * Returns the element in this collection with the lowest value of the
     * provided key(s).
     * @category Queries
     *
     * @param attributes - any number of {@link Sorter | Sorter's} used for
     * comparing. If multiple are provided, subsequent ones are used to break ties
     * on earlier ones.
     *
     * @example
     * army.create(Soldier, 'a', { strength: 2, initiative: 3 });
     * army.create(Soldier, 'b', { strength: 3, initiative: 1 });
     * army.create(Soldier, 'c', { strength: 2, initiative: 2 });
     * army.all(Solider).withLowest('strength', 'initiative'); // => Soldier 'c'
     */
    withLowest(...attributes) {
      return this.sortedBy(attributes, "asc")[0];
    }
    /**
     * Returns the highest value of the provided key(s) found on any element in
     * this collection.
     * @category Queries
     *
     * @param key - a {@link Sorter | Sorter's} used for comparing and extracting
     * the max.
     *
     * @example
     * army.create(Soldier, 'a', { strength: 2, initiative: 3 });
     * army.create(Soldier, 'b', { strength: 3, initiative: 1 });
     * army.create(Soldier, 'c', { strength: 2, initiative: 2 });
     * army.all(Solider).max('strength'); // => 3
     */
    max(key) {
      const el = this.sortedBy(key, "desc")[0];
      if (!el)
        return;
      return typeof key === "function" ? key(el) : el[key];
    }
    /**
     * Returns the lowest value of the provided key(s) found on any element in
     * this collection.
     * @category Queries
     *
     * @param key - a {@link Sorter | Sorter's} used for comparing and extracting
     * the minimum.
     *
     * @example
     * army.create(Soldier, 'a', { strength: 2, initiative: 3 });
     * army.create(Soldier, 'b', { strength: 3, initiative: 1 });
     * army.create(Soldier, 'c', { strength: 2, initiative: 2 });
     * army.all(Solider).min('initiative'); // => 1
     */
    min(key) {
      const el = this.sortedBy(key, "asc")[0];
      if (!el)
        return;
      return typeof key === "function" ? key(el) : el[key];
    }
    /**
     * Returns whether all elements in this collection have the same value for key.
     * @category Queries
     */
    areAllEqual(key) {
      if (this.length === 0)
        return true;
      return this.every((el) => el[key] === this[0][key]);
    }
    /**
     * Remove all elements in this collection from the playing area and place them
     * into {@link Game#pile}
     * @category Structure
     */
    remove() {
      for (const el of this) {
        if ("isSpace" in el)
          throw Error("cannot move Space");
        el.remove();
      }
    }
    /**
     * Move all pieces in this collection into another element. See {@link Piece#putInto}.
     * @category Structure
     */
    putInto(to, options) {
      if (this.some((el) => el.hasMoved()) || to.hasMoved())
        to.game.addDelay();
      for (const el of this) {
        if ("isSpace" in el)
          throw Error("cannot move Space");
        el.putInto(to, options);
      }
    }
    // UI
    /**
     * Apply a layout to some of the elements directly contained within the elements
     * in this collection. See {@link GameElement#layout}
     * @category UI
     */
    layout(applyTo, attributes) {
      for (const el of this)
        el.layout(applyTo, attributes);
    }
    /**
     * Configure the layout for all elements contained within this collection. See
     * {@link GameElement#configureLayout}
     * @category UI
     */
    configureLayout(attributes) {
      for (const el of this)
        el.configureLayout(attributes);
    }
    /**
     * Define the appearance of the elements in this collection. Any values
     * provided override previous ones. See {@link GameElement#appearance}.
     * @category UI
     */
    appearance(appearance) {
      for (const el of this)
        el.appearance(appearance);
    }
  };

  // node_modules/@boardzilla/core/entry/action/utils.js
  var serialize = /* @__PURE__ */ __name((arg, forPlayer = true, name) => {
    if (arg === void 0)
      return void 0;
    if (arg === null)
      return null;
    if (arg instanceof Array)
      return arg.map((a) => serialize(a, forPlayer));
    if (typeof arg === "object" && "constructor" in arg && ("isPlayer" in arg.constructor || "isGameElement" in arg.constructor)) {
      return serializeSingleArg(arg, forPlayer);
    }
    if (typeof arg === "object")
      return serializeObject(arg, forPlayer);
    if (typeof arg === "number" || typeof arg === "string" || typeof arg === "boolean")
      return serializeSingleArg(arg, forPlayer);
    throw Error(`Unable to serialize the property ${name ? '"' + name + '": ' : ""} ${arg}. Only primitives, Player's, GameElement's or arrays/objects containing such can be used.`);
  }, "serialize");
  var serializeSingleArg = /* @__PURE__ */ __name((arg, forPlayer = true) => {
    if (typeof arg === "object" && "constructor" in arg) {
      if ("isPlayer" in arg.constructor)
        return `$p[${arg.position}]`;
      if ("isGameElement" in arg.constructor)
        return forPlayer ? `$el[${arg.branch()}]` : `$eid[${arg._t.id}]`;
    }
    return arg;
  }, "serializeSingleArg");
  var serializeObject = /* @__PURE__ */ __name((obj, forPlayer = true) => {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, serialize(v, forPlayer, k)]));
  }, "serializeObject");
  var escapeArgument = /* @__PURE__ */ __name((arg) => {
    if (arg instanceof Array) {
      const escapees = arg.map(escapeArgument);
      return escapees.slice(0, -1).join(", ") + (escapees.length > 1 ? " and " : "") + (escapees[escapees.length - 1] || "");
    }
    if (typeof arg === "object")
      return `[[${serializeSingleArg(arg)}|${arg.toString()}]]`;
    return String(arg);
  }, "escapeArgument");
  var deserializeArg = /* @__PURE__ */ __name((arg, game) => {
    if (arg instanceof Array)
      return arg.map((a) => deserializeSingleArg(a, game));
    return deserializeSingleArg(arg, game);
  }, "deserializeArg");
  var deserializeSingleArg = /* @__PURE__ */ __name((arg, game) => {
    if (typeof arg === "number" || typeof arg === "boolean")
      return arg;
    let deser;
    if (arg.slice(0, 3) === "$p[") {
      deser = game.players.atPosition(parseInt(arg.slice(3, -1)));
    } else if (arg.slice(0, 4) === "$el[") {
      deser = game.atBranch(arg.slice(4, -1));
    } else if (arg.slice(0, 5) === "$eid[") {
      deser = game.atID(parseInt(arg.slice(5, -1)));
    } else {
      return arg;
    }
    if (!deser)
      throw Error(`Unable to find arg: ${arg}`);
    return deser;
  }, "deserializeSingleArg");
  var deserializeObject = /* @__PURE__ */ __name((obj, game) => {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, deserialize(v, game)]));
  }, "deserializeObject");
  var deserialize = /* @__PURE__ */ __name((arg, game) => {
    if (arg === void 0)
      return void 0;
    if (arg === null)
      return null;
    if (arg instanceof Array)
      return arg.map((a) => deserialize(a, game));
    if (typeof arg === "object")
      return deserializeObject(arg, game);
    if (typeof arg === "number" || typeof arg === "string" || typeof arg === "boolean")
      return deserializeSingleArg(arg, game);
    throw Error(`unable to deserialize ${arg}`);
  }, "deserialize");
  var combinations = /* @__PURE__ */ __name((set, min, max) => {
    const combos = [];
    const poss = /* @__PURE__ */ __name((curr, i) => {
      if (set.length - i < min - curr.length)
        return;
      if (curr.length >= min)
        combos.push(curr);
      if (curr.length < max) {
        for (let j = i; j !== set.length; j++) {
          poss(curr.concat([set[j]]), j + 1);
        }
      }
    }, "poss");
    poss([], 0);
    return combos;
  }, "combinations");

  // node_modules/@boardzilla/core/entry/utils.js
  var shuffleArray = /* @__PURE__ */ __name((array, random3) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(random3() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }, "shuffleArray");
  var times = /* @__PURE__ */ __name((n2, fn) => Array.from(Array(n2)).map((_, i) => fn(i + 1)), "times");
  var range = /* @__PURE__ */ __name((min, max, step = 1) => times(Math.floor((max - min) / step) + 1, (i) => (i - 1) * step + min), "range");
  var n = /* @__PURE__ */ __name((message, args, escaped = false) => {
    Object.entries(args || {}).forEach(([k, v]) => {
      message = message.replace(new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`), escaped ? escapeArgument(v) : v.toString());
    });
    const missingArgs = Array.from(message.matchAll(new RegExp(`\\{\\{\\s*(\\w+)\\s*\\}\\}`, "g"))).map(([, arg]) => arg);
    if (missingArgs.length)
      throw Error(`Missing strings in:
${message}
All substitution strings must be specified in 2nd parameter. Missing: ${missingArgs.join("; ")}`);
    return message;
  }, "n");

  // node_modules/@boardzilla/core/entry/board/element.js
  var import_uuid_random = __toESM(require_uuid_random(), 1);
  var GameElement = class _GameElement {
    static {
      __name(this, "GameElement");
    }
    /**
     * Do not use the constructor directly. Instead Call {@link
     * GameElement#create} or {@link GameElement#createMany} on the element in
     * which you want to create a new element.
     * @category Structure
     */
    constructor(ctx) {
      var _a;
      this._t = {
        children: new ElementCollection(),
        id: 0,
        ref: 0,
        setId: () => {
        }
      };
      this._ui = {
        layouts: [],
        appearance: {},
        getBaseLayout: () => ({
          alignment: "center",
          direction: "square"
        })
      };
      this._ctx = ctx;
      (_a = this._ctx).classRegistry ?? (_a.classRegistry = []);
      if (!ctx.top) {
        this._ctx.top = this;
        this._ctx.sequence = 0;
      }
      if (!this._ctx.namedSpaces) {
        this._ctx.uniqueNames = {};
        this._ctx.namedSpaces = {};
      }
      this._t = {
        children: new ElementCollection(),
        id: this._ctx.sequence,
        ref: this._ctx.sequence,
        setId: (id) => {
          if (id !== void 0) {
            this._t.id = id;
            if (this._ctx.sequence < id)
              this._ctx.sequence = id;
          }
        }
      };
      this._ctx.sequence += 1;
    }
    /**
     * String used for representng this element in game messages when the object
     * is passed directly, e.g. when taking the choice directly from a
     * chooseOnBoard choice.
     * @category Structure
     */
    toString() {
      return this.name || this.constructor.name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    }
    isVisibleTo(_player) {
      return true;
    }
    isVisible() {
      return true;
    }
    all(className, ...finders) {
      return this._t.children.all(className, ...finders);
    }
    first(className, ...finders) {
      return this._t.children.first(className, ...finders);
    }
    firstN(n2, className, ...finders) {
      return this._t.children.firstN(n2, className, ...finders);
    }
    last(className, ...finders) {
      return this._t.children.last(className, ...finders);
    }
    lastN(n2, className, ...finders) {
      return this._t.children.lastN(n2, className, ...finders);
    }
    top(className, ...finders) {
      return this._t.children.top(className, ...finders);
    }
    topN(n2, className, ...finders) {
      return this._t.children.topN(n2, className, ...finders);
    }
    bottom(className, ...finders) {
      return this._t.children.bottom(className, ...finders);
    }
    bottomN(n2, className, ...finders) {
      return this._t.children.bottomN(n2, className, ...finders);
    }
    others(className, ...finders) {
      if (!this._t.parent)
        new ElementCollection();
      return this._t.parent._t.children.all(className, (el) => el !== this, ...finders);
    }
    has(className, ...finders) {
      if (typeof className !== "function" || !("isGameElement" in className)) {
        if (className)
          finders = [className, ...finders];
        return !!this.first(_GameElement, ...finders);
      }
      return !!this.first(className, ...finders);
    }
    /**
     * If this element is adjacent to some other element, using the nearest
     * containing space that has an adjacency map.
     * @category Adjacency
     */
    isAdjacentTo(element) {
      const graph = this.containerWithProperty("isAdjacent");
      if (!graph)
        return false;
      return graph.isAdjacent(this, element);
    }
    /**
     * Finds the shortest distance between two spaces
     * @category Adjacency
     *
     * @param element - {@link element} to measure distance to
     */
    distanceTo(element) {
      const graph = this.containerWithProperty("distanceBetween");
      if (!graph)
        return Infinity;
      return graph.distanceBetween(this, element);
    }
    adjacencies(className, ...finders) {
      const graph = this.containerWithProperty("isAdjacent");
      if (!graph)
        return false;
      return graph.allAdjacentTo(this, className, ...finders);
    }
    withinDistance(distance, className, ...finders) {
      const graph = this.containerWithProperty("allWithinDistanceOf");
      if (!graph)
        return new ElementCollection();
      return graph.allWithinDistanceOf(this, distance, className, ...finders);
    }
    /**
     * Set this class to use a different ordering style.
     * @category Structure
     * @param order - ordering style
     * - "normal": Elements placed into this element are put at the end of the
     *   list (default)
     * - "stacking": Used primarily for stacks of cards. Elements placed into this
     *   element are put at the beginning of the list. E.g. if a stack of cards
     *   has `order` set to `stacking` the {@link first} method will return the
     *   last card placed in the stack, rather than the first one placed in the
     *   stack. Hidden items in the stack are not tracked or animated while
     *   reordered to prevent their identity from being exposed as they move
     */
    setOrder(order) {
      this._t.order = order;
    }
    /**
     * Returns this elements parent.
     * @category Queries
     * @param className - If provided, searches up the parent tree to find the first
     * matching element. E.g. if a Token is placed on a Card in a players
     * Tableau. calling `token.container(Tableau)` can be used to find the
     * grandparent.
     */
    container(className) {
      if (!className)
        return this._t.parent;
      if (this._t.parent)
        return this._t.parent instanceof className ? this._t.parent : this._t.parent.container(className);
    }
    /**
     * Returns this elements containing element that also has a given property.
     * @category Queries
     */
    containerWithProperty(property, value) {
      const parent = this._t.parent;
      if (parent)
        return property in parent && (value === void 0 || parent[property] === value) ? parent : parent.containerWithProperty(property, value);
    }
    /**
     * Returns whether this element has no elements placed within it.
     * @category Structure
     */
    isEmpty() {
      return !this._t.children.length;
    }
    /**
     * Sorts the elements directly contained within this element by some {@link Sorter}.
     * @category Structure
     */
    sortBy(key, direction) {
      return this._t.children.sortBy(key, direction);
    }
    /**
     * re-orders the elements directly contained within this element randomly.
     * @category Structure
     */
    shuffle() {
      const refs = this.childRefsIfObscured();
      shuffleArray(this._t.children, this._ctx.gameManager?.random || Math.random);
      if (refs)
        this.assignChildRefs(refs);
    }
    /**
     * The player that owns this element, or the first element that contains this
     * element searching up through the parent hierarchy. This is related to, but
     * different than {@link player}. E.g. if a standard playing card is in a
     * player's hand, typically the `hand.player` will be assigned to that player
     * but the card itself would not have a `player`. In this case the
     * card.owner() will equal the player in whose hand the card is placed.
     * @category Structure
     */
    get owner() {
      return this.player !== void 0 ? this.player : this._t.parent?.owner;
    }
    /**
     * Whether this element belongs to the player viewing the game. A player is
     * considered to be currently viewing the game if this is called in the
     * context of an action taken by a given player (during an action taken by a
     * player or while the game is viewed by a given player.) It is an error to
     * call this method when not in the context of a player action. When querying
     * for elements using {@link ElementFinder} such as {@link all} and {@link
     * first}, {@link mine} is available as a search key that accepts a value of
     * true/false
     @category Queries
     */
    get mine() {
      if (!this._ctx.player)
        return false;
      return this.owner === this._ctx.player;
    }
    /**
     * Create an element inside this element. This can only be called during the
     * game setup (see {@link createGame}. Any game elements that are required
     * must be created before the game starts. Elements that only appear later in
     * the game can be created inside the {@link Game#pile} or made invisible.
     * @category Structure
     *
     * @param className - Class to create. This class must be included in the `elementClasses` in {@link createGame}.
     * @param name - Sets {@link GameElement#name | name}
     * @param attributes - Sets any attributes of the class that are defined in
     * your own class that extend {@link Space}, {@link Piece}, or {@link
     * Game}. Can also include {@link player}.
     *
     * @example
     * deck.create(Card, 'ace-of-hearts', { suit: 'H', value: '1' });
     */
    create(className, name, attributes) {
      if (this._ctx.gameManager?.phase === "started")
        throw Error("Game elements cannot be created once game has started.");
      const el = this.createElement(className, name, attributes);
      el._t.parent = this;
      const firstPiece = this._t.children.findIndex((c) => !("isSpace" in c));
      if (this._t.order === "stacking" && !("isSpace" in el)) {
        if (firstPiece > 0) {
          this._t.children.splice(firstPiece, 0, el);
        } else {
          this._t.children.unshift(el);
        }
      } else {
        if ("isSpace" in el && firstPiece !== -1) {
          this._t.children.splice(firstPiece, 0, el);
        } else {
          this._t.children.push(el);
        }
      }
      if ("isSpace" in el && name) {
        if (name in this._ctx.uniqueNames) {
          delete this._ctx.namedSpaces[name];
          this._ctx.uniqueNames[name] = false;
        } else {
          this._ctx.namedSpaces[name] = el;
          this._ctx.uniqueNames[name] = true;
        }
      }
      return el;
    }
    /**
     * Create n elements inside this element of the same class. This can only be
     * called during the game setup (see {@link createGame}. Any game elements
     * that are required must be created before the game starts. Elements that
     * only appear later in the game can be created inside the {@link Game#pile}
     * or made invisible.
     * @category Structure
     *
     * @param n - Number to create
     * @param className - Class to create. This class must be included in the `elementClasses` in {@link createGame}.
     * @param name - Sets {@link GameElement#name | name}
     * @param attributes - Sets any attributes of the class that are defined in
     * your own class that extend {@link Space}, {@link Piece}, or {@link
     * Game}. Can also include {@link player}. If a function is supplied here, a
     * single number argument will be passed with the number of the added element,
     * starting with 1.
     */
    createMany(n2, className, name, attributes) {
      return new ElementCollection(...times(n2, (i) => this.create(className, name, typeof attributes === "function" ? attributes(i) : attributes)));
    }
    /**
     * Base element creation method
     * @internal
     */
    createElement(className, name, attrs) {
      if (!this._ctx.classRegistry.includes(className)) {
        this._ctx.classRegistry.push(className);
      }
      const el = new className(this._ctx);
      el.game = this.game;
      el.name = name;
      Object.assign(el, attrs);
      if ("afterCreation" in el)
        el.afterCreation.bind(el)();
      return el;
    }
    /**
     * Permanently remove an element. This can only be done while defining the
     * game, and is usually only useful when creating groups of elements, such as
     * {@link createMany} or {@link createGrid} where some of the created elements
     * are not needed.
     * @category Structure
     */
    destroy() {
      if (this._ctx.gameManager?.phase === "started")
        throw Error("Game elements cannot be destroy once game has started.");
      const position = this.position();
      this._t.parent?._t.children.splice(position, 1);
    }
    /**
     * Rotation of element if set, normalized to 0-359 degrees
     * @category Structure
     */
    get rotation() {
      if (this._rotation === void 0)
        return 0;
      return (this._rotation % 360 + 360) % 360;
    }
    set rotation(r) {
      this._rotation = r;
    }
    /**
     * Returns the index of this element within its parent, starting at zero
     * @category Structure
     */
    position() {
      return this._t.parent?._t.children.indexOf(this) ?? -1;
    }
    /**
     * Returns a string identifying the tree position of the element suitable for
     * anonymous reference
     * @internal
     */
    branch() {
      const branches = [];
      let node = this;
      while (node._t.parent) {
        const index = node.position();
        if (index === -1)
          throw Error(`Reference to element ${this.constructor.name}${this.name ? ":" + this.name : ""} is no longer current`);
        branches.unshift(index);
        node = node._t.parent;
      }
      branches.unshift(this._ctx.removed === node ? 1 : 0);
      return branches.join("/");
    }
    /**
     * Returns the element at the given position returned by {@link branch}
     * @internal
     */
    atBranch(b) {
      let branch = b.split("/");
      let index = parseInt(branch[0]);
      let node = index === 0 ? this._ctx.top : this._ctx.removed._t.children[index - 1];
      branch.shift();
      while (branch[0] !== void 0) {
        node = node._t.children[parseInt(branch[0])];
        branch.shift();
      }
      return node;
    }
    /**
     * Returns the element for the given id
     * @internal
     */
    atID(id) {
      let el = this._t.children.find((c) => c._t.id === id);
      if (el)
        return el;
      for (const child of this._t.children) {
        el = child.atID(id);
        if (el)
          return el;
      }
    }
    /**
     * Returns the element for the given ref
     * @internal
     */
    atRef(ref) {
      let el = this._t.children.find((c) => c._t.ref === ref);
      if (el)
        return el;
      for (const child of this._t.children) {
        el = child.atRef(ref);
        if (el)
          return el;
      }
    }
    _cellAt(pos) {
      if (!this._size)
        return pos.x === 0 && pos.y === 0 ? "." : void 0;
      if (this.rotation === 0)
        return this._size.shape[pos.y]?.[pos.x];
      if (this.rotation === 90)
        return this._size.shape[this._size.height - 1 - pos.x]?.[pos.y];
      if (this.rotation === 180)
        return this._size.shape[this._size.height - 1 - pos.y]?.[this._size.width - 1 - pos.x];
      if (this.rotation === 270)
        return this._size.shape[pos.x]?.[this._size.width - 1 - pos.y];
    }
    _sizeNeededFor(_element) {
      return { width: 1, height: 1 };
    }
    /**
       * Set an irregular shape for this element. This is only meaningful for the
       * purposes of finding specifically adjacent cells when placed into a
       * PieceGrid. See {@link PieceGrid#adjacenciesByCell}. When rendered in a
       * PieceGrid, the element will have a size large enough to fill the
       * appropriate number of spaces in the grid, but it's appearance is otherwise
       * unaffected and will be based on {@link appearance}. When not rendered in a
       * PieceGrid, the element will take up a single cell but will be scaled
       * relatively to other elements with a shape in the same layout.
       *
       * @param shape - A set of single characters used as labels for each cell. The
       * cell label characters are provided as an array of strings, with each string
       * being one row of cell labels, with spaces used to indicate empty "holes" in
       * the shape. Each row must be the same length. The specific non-space
       * characters used are used for labelling the adjacencies in {@link
       * PieceGrid#adjacenciesByCell} but are otherwise unimportant.
       * @category Adjacency
       *
       * @example
       *
       * domino12.setShape(
       *   '12'
       * );
    
       * tetrisPiece.setShape(
       *   'XX ',
       *   ' XX'
       * );
       */
    setShape(...shape) {
      if (this._ctx.gameManager?.phase === "started")
        throw Error("Cannot change shape once game has started.");
      if (shape.some((s) => s.length !== shape[0].length))
        throw Error("Each row in shape must be same size. Invalid shape:\n" + shape);
      this._size = {
        shape,
        width: shape[0].length,
        height: shape.length
      };
    }
    /**
     * Set the edge labels for this element. These are only meaningful for the
     * purposes of finding specifically adjacent edges when placed into a
     * PieceGrid. See {@link PieceGrid#adjacenciesByEdge}.
     * @category Adjacency
     *
     * @param edges - A set of edge labels for each cell label provided by {@link
     * setShape}. For simple 1-celled shapes, the edges can be provided without
     * cell labels.
     *
     * @example
     *
     * // a bridge tile with a road leading from left to right and a river leading
     * // from top to bottom.
     * simpleTile.setEdge(
     *   up: 'river',
     *   down: 'river',
     *   left: 'road'
     *   right: 'road'
     * });
     *
     * // A tetris-shaped tile with sockets coming out either "end"
     * tetrisPiece.setShape(
     *   'AX ',
     *   ' XB'
     * );
     * tetrisPiece.setEdge({
     *   A: {
     *     left: 'socket'
     *   },
     *   B: {
     *     right: 'socket'
     *   }
     * });
     */
    setEdges(edges) {
      if (this._ctx.gameManager?.phase === "started")
        throw Error("Cannot change shape once game has started.");
      if (Object.keys(edges)[0].length === 1) {
        const missingCell = Object.keys(edges).find((c) => this._size?.shape.every((s) => !s.includes(c)));
        if (missingCell)
          throw Error(`No cell '${missingCell}' defined in shape`);
        this._size.edges = edges;
      } else {
        if (this._size)
          throw Error("setEdges must use the cell characters from setShape as keys");
        this._size = { shape: ["."], width: 1, height: 1, edges: { ".": edges } };
      }
    }
    /**
     * Whether this element has the given element in its parent hierarchy
     * @category Structure
     */
    isDescendantOf(el) {
      return this._t.parent === el || !!this._t.parent?.isDescendantOf(el);
    }
    attributeList() {
      let attrs;
      ({ ...attrs } = this);
      for (const attr of this.constructor.unserializableAttributes)
        delete attrs[attr];
      return Object.fromEntries(Object.entries(attrs).filter(([, value]) => typeof value !== "function"));
    }
    /**
     * JSON representation
     * @param seenBy - optional player position viewing the game
     * @internal
     */
    toJSON(seenBy) {
      let attrs = this.attributeList();
      if (seenBy !== void 0 && !this.isVisibleTo(seenBy)) {
        attrs = Object.fromEntries(Object.entries(attrs).filter(([attr]) => ["_visible", "row", "column", "_rotation", "_size"].includes(attr) || attr !== "name" && this.constructor.visibleAttributes?.includes(attr)));
      }
      const json = Object.assign(serializeObject(attrs, seenBy !== void 0), { className: this.constructor.name });
      if (this._t.order)
        json.order = this._t.order;
      if (seenBy === void 0)
        json._id = this._t.id;
      if (json._id !== this._t.ref)
        json._ref = this._t.ref;
      if (seenBy !== void 0 && this._t.wasRef !== void 0 && this.isVisibleTo(seenBy))
        json._wasRef = this._t.wasRef;
      if (this._t.children.length && (!seenBy || !("_screen" in this) || this._screen === void 0 || this._screen === "all-but-owner" && this.owner?.position === seenBy || this._screen instanceof Array && this._screen.includes(this.owner?.position))) {
        json.children = Array.from(this._t.children.map((c) => c.toJSON(seenBy)));
      }
      if (globalThis.window) {
        try {
          structuredClone(json);
        } catch (e) {
          console.error(`invalid properties on ${this}:
${JSON.stringify(json, void 0, 2)}`);
          throw e;
        }
      }
      return json;
    }
    createChildrenFromJSON(childrenJSON, branch) {
      const childrenRefs = [...this._t.children];
      this._t.children = new ElementCollection();
      for (let i = 0; i !== childrenJSON.length; i++) {
        const json = childrenJSON[i];
        const childBranch = branch + "/" + i;
        let { className, children, _id, _ref, _wasRef, name, order } = json;
        let child = childrenRefs.find((c) => _id !== void 0 ? c._t.id === _id : c._t.ref === (_wasRef ?? _ref));
        if (!child) {
          const elementClass = this._ctx.classRegistry.find((c) => c.name === className);
          if (!elementClass)
            throw Error(`No class found ${className}. Declare any classes in \`game.registerClasses\``);
          child = this.createElement(elementClass, name);
          child._t.setId(_id);
          child._t.parent = this;
          child._t.order = order;
          child._t.ref = _ref ?? _id;
        } else {
          const emptyAttrs = Object.keys(child).filter((k) => !(k in json) && !["_rotation", "column", "row"].includes(k) && !child.constructor.unserializableAttributes.includes(k));
          if (emptyAttrs.length) {
            const blank = Reflect.construct(child.constructor, [{}]);
            for (const attr of emptyAttrs)
              Object.assign(child, { [attr]: blank[attr] });
          }
        }
        if (_id !== void 0)
          child._t.ref = _ref ?? _id;
        if (_wasRef !== void 0 && !this._ctx.trackMovement)
          child._t.wasRef = _wasRef;
        this._t.children.push(child);
        child.createChildrenFromJSON(children || [], childBranch);
      }
    }
    assignAttributesFromJSON(childrenJSON, branch) {
      for (let i = 0; i !== childrenJSON.length; i++) {
        const json = childrenJSON[i];
        let { className: _cn, children, _ref, _wasRef, _id, order: _o, ...rest } = json;
        rest = deserializeObject({ ...rest }, this.game);
        let child = this._t.children[i];
        Object.assign(child, rest);
        child.assignAttributesFromJSON(children || [], branch + "/" + i);
      }
    }
    resetUI() {
      this._ui.layouts = [{
        applyTo: _GameElement,
        attributes: this._ui.getBaseLayout()
      }];
      this._ui.appearance = {};
      for (const child of this._t.children)
        child.resetUI();
    }
    /**
     * Apply a layout to some of the elements directly contained within this
     * element. See also {@link ElementCollection#layout}
     * @category UI
     *
     * @param applyTo - Which elements this layout applies to. Provided value can be:
     * - A specific {@link GameElement}
     * - The name of an element
     * - A specific set of elements ({@link ElementCollection})
     * - A class of elements
     *
     * If multiple layout declarations would apply to the same element, only one
     * will be used. The order of specificity is as above. If a class is used and
     * mutiple apply, the more specific class will be used.
     *
     * @param {Object} attributes - A list of attributes describing the
     * layout. All units of measurement are percentages of this elements width and
     * height from 0-100, unless otherwise noted (See `margin` and `gap`)
     */
    layout(applyTo, attributes) {
      let { slots, area, size, aspectRatio, scaling, gap, margin, offsetColumn, offsetRow } = attributes;
      if (slots && (area || margin || scaling || gap || margin || offsetColumn || offsetRow)) {
        console.warn("Layout has `slots` which overrides supplied grid parameters");
        delete attributes.area;
        delete attributes.margin;
        delete attributes.gap;
        delete attributes.scaling;
        delete attributes.offsetRow;
        delete attributes.offsetColumn;
      }
      if (area && margin) {
        console.warn("Both `area` and `margin` supplied in layout. `margin` is ignored");
        delete attributes.margin;
      }
      if (size && aspectRatio) {
        console.warn("Both `size` and `aspectRatio` supplied in layout. `aspectRatio` is ignored");
        delete attributes.aspectRatio;
      }
      if (size && scaling) {
        console.warn("Both `size` and `scaling` supplied in layout. `scaling` is ignored");
        delete attributes.scaling;
      }
      if (gap && (offsetColumn || offsetRow)) {
        console.warn("Both `gap` and `offset` supplied in layout. `gap` is ignored");
        delete attributes.gap;
      }
      this._ui.layouts.push({ applyTo, attributes: { alignment: "center", direction: "square", ...attributes } });
    }
    /**
     * Creates a collapsible drawer layout for a Space within this Element. This
     * is like {@link GameElement#layout} except for one specific Space, with
     * additional parameters that set the behaviour/appearance of the drawer. A
     * tab will be attached the drawer that will allow it be opened/closed.
     *
     * @param applyTo - The Space for the drawer. Either the Space itself or its
     * name.
     * @param area - The area for the drawer when opened expressed in percentage
     * sizes of this element.
     * @param openDirection - the direction the drawer will open
     * @param tab - JSX for the appearance of the tab
     * @param closedTab - JSX for the appearance of the tab when closed if
     * different
     * @param openIf - A function that will be checked at each game state. If it
     * returns true, the drawer will automatically open.
     * @param closeIf - A function that will be checked at each game state. If it
     * returns true, the drawer will automatically close.
     */
    layoutAsDrawer(applyTo, attributes) {
      const { area, ...container } = attributes;
      this.layout(applyTo, { area, __container__: { type: "drawer", attributes: container } });
    }
    /**
     * Creates a tabbed layout for a set of Space's within this Element. This is
     * like {@link GameElement#layout} except for a set of Spaces, with additional
     * parameters that set the behaviour/appearance of the tabs. Each Space will
     * be laid out into the same area, with a set of tabs attached to allow the
     * Player or the game rules to select which tab is shown.
     *
     * @param applyTo - The Spaces for the drawer as a set of key-value
     * pairs. Each value is a Space or a name of a Space.
     * @param area - The area for the tabs expressed in percentage sizes of this
     * element.
     * @param tabDirection - the side on which the tabs will be placed
     * @param tabs - JSX for the appearance of the tabs as a set of key-value pairs
     * @param setTabTo - A function that will be checked at each game state. If it
     * returns a string, the tab with the matching key will be shown.
     */
    layoutAsTabs(tabs, attributes) {
      const { area, ...container } = attributes;
      const id = (0, import_uuid_random.default)();
      for (const [key, tab] of Object.entries(tabs)) {
        this.layout(tab, { area, __container__: { type: "tabs", id, key, attributes: container } });
      }
    }
    /**
     * Hides a Space within this element and replaces it with popout
     * button. Clicking on the button opens this Space in a full-board modal. This
     * is like {@link GameElement#layout} except for one Space, with additional
     * parameters that set the behaviour/appearance of the popout modal.
     *
     * @param applyTo - The Space for the popout. Either a Space or the name of a
     * Space.
     * @param area - The area for the tabs expressed in percentage sizes of this
     * element.
     * @param button - JSX for the appearance of the popout button
     * @param popoutMargin - Alter the default margin around the opened
     * popout. Takes a percentage or an object with percentages for top, bottom,
     * left and right.
     */
    layoutAsPopout(applyTo, attributes) {
      const { area, ...container } = attributes;
      this.layout(applyTo, { area, __container__: { type: "popout", attributes: container } });
    }
    /**
     * Change the layout attributes for this space's layout.
     * @category UI
     */
    configureLayout(layoutConfiguration) {
      this._ui.layouts[0] = {
        applyTo: _GameElement,
        attributes: {
          ...this._ui.getBaseLayout(),
          ...layoutConfiguration
        }
      };
    }
    /**
     * Define the appearance of this element. Any values provided override
     * previous ones. See also {@link ElementCollection#appearance}
     * @category UI
     *
     * @param appearance - Possible values are:
     * @param appearance.className - A class name to add to the dom element
     *
     * @param appearance.render - A function that takes this element as its only
     * argument and returns JSX for the element. See {@link ../ui/appearance} for
     * more on usage.
     *
     * @param appearance.aspectRatio - The aspect ratio for this element. This
     * value is a ratio of width over height. All layouts defined in {@link
     * layout} will respect this aspect ratio.
     *
     * @param appearance.info - Return JSX for more info on this element. If
     * returning true, an info modal will be available for this element but with
     * only the rendered element and no text
     *
     * @param appearance.connections - If the elements immediately within this
     * element are connected using {@link Space#connectTo}, this makes those
     * connections visible as connecting lines. Providing a `label` will place a
     * label over top of this line by calling the provided function with the
     * distance of the connection specified in {@link Space#connectTo} and using
     * the retured JSX. If `labelScale` is provided, the label is scaled by this
     * amount.
     *
     * @param appearance.effects - Provides a CSS class that will be applied to
     * this element if its attributes change to match the provided ones.
     */
    appearance(appearance) {
      Object.assign(this._ui.appearance, appearance);
    }
    childRefsIfObscured() {
      var _a;
      if (this._t.order !== "stacking")
        return;
      const refs = [];
      for (const child of this._t.children) {
        if (this._ctx.trackMovement)
          (_a = child._t).wasRef ?? (_a.wasRef = child._t.ref);
        refs.push(child._t.ref);
      }
      return refs;
    }
    assignChildRefs(refs) {
      for (let i = 0; i != refs.length; i++) {
        this._t.children[i]._t.ref = refs[i];
      }
    }
    hasMoved() {
      return this._t.moved || !!this._t.parent?.hasMoved();
    }
    resetMovementTracking() {
      this._t.moved = false;
      for (const child of this._t.children)
        child.resetMovementTracking();
    }
    resetRefTracking() {
      delete this._t.wasRef;
      for (const child of this._t.children)
        child.resetRefTracking();
    }
  };
  GameElement.isGameElement = true;
  GameElement.unserializableAttributes = ["_ctx", "_t", "_ui", "game"];
  var element_default = GameElement;

  // node_modules/@boardzilla/core/entry/board/space.js
  var Space = class extends element_default {
    static {
      __name(this, "Space");
    }
    constructor() {
      super(...arguments);
      this._eventHandlers = { enter: [], exit: [] };
    }
    /**
     * Show pieces to all players when they enter this space
     * @category Visibility
     */
    contentsWillBeShown() {
      this._visOnEnter = { default: true };
    }
    /**
     * Show pieces when they enter this space to its owner
     * @category Visibility
     */
    contentsWillBeShownToOwner() {
      this._visOnEnter = { default: false, except: "owner" };
    }
    /**
     * Show piece to these players when they enter this space
     * @category Visibility
     */
    contentsWillBeShownTo(...players) {
      this._visOnEnter = { default: false, except: players.map((p) => p.position) };
    }
    /**
     * Hide pieces to all players when they enter this space
     * @category Visibility
     */
    contentsWillBeHidden() {
      this._visOnEnter = { default: false };
    }
    /**
     * Hide piece to these players when they enter this space
     * @category Visibility
     */
    contentsWillBeHiddenFrom(...players) {
      this._visOnEnter = { default: true, except: players.map((p) => p.position) };
    }
    /**
     * Call this to screen view completely from players. Blocked spaces completely
     * hide their contents, like a physical screen. No information about the
     * number, type or movement of contents inside this Space will be revealed to
     * the specified players
     *
     * @param players = Players for whom the view is blocked
     * @category Visibility
     */
    blockViewFor(players) {
      this._screen = players === "none" ? void 0 : players instanceof Array ? players.map((p) => p.position) : players;
    }
    isSpace() {
      return true;
    }
    create(className, name, attributes) {
      const el = super.create(className, name, attributes);
      if ("showTo" in el)
        this.triggerEvent("enter", el);
      return el;
    }
    addEventHandler(type, handler) {
      if (this._ctx.gameManager?.phase === "started")
        throw Error("Event handlers cannot be added once game has started.");
      this._eventHandlers[type].push(handler);
    }
    /**
     * Attach a callback to this space for every element that enters or is created
     * within.
     * @category Structure
     *
     * @param type - the class of element that will trigger this callback
     * @param callback - Callback will be called each time an element enters, with
     * the entering element as the only argument.
     *
     * @example
     * deck.onEnter(Card, card => card.hideFromAll()) // card placed in the deck are automatically turned face down
     */
    onEnter(type, callback) {
      this.addEventHandler("enter", { callback, type });
    }
    /**
     * Attach a callback to this space for every element that is moved out of this
     * space.
     * @category Structure
     *
     * @param type - the class of element that will trigger this callback
     * @param callback - Callback will be called each time an element exits, with
     * the exiting element as the only argument.
     *
     * @example
     * deck.onExit(Card, card => card.showToAll()) // cards drawn from the deck are automatically turned face up
     */
    onExit(type, callback) {
      this.addEventHandler("exit", { callback, type });
    }
    triggerEvent(event, element) {
      if (this._visOnEnter) {
        element._visible = {
          default: this._visOnEnter.default,
          except: this._visOnEnter.except === "owner" ? this.owner ? [this.owner.position] : void 0 : this._visOnEnter.except
        };
      }
      for (const handler of this._eventHandlers[event]) {
        if (event === "enter" && !(element instanceof handler.type))
          continue;
        if (event === "exit" && !(element instanceof handler.type))
          continue;
        handler.callback(element);
      }
    }
  };
  Space.unserializableAttributes = [...element_default.unserializableAttributes, "_eventHandlers", "_visOnEnter", "_screen"];
  var space_default = Space;

  // node_modules/@boardzilla/core/entry/board/piece.js
  var Piece = class _Piece extends element_default {
    static {
      __name(this, "Piece");
    }
    createElement(className, name, attrs) {
      if (className === space_default || Object.prototype.isPrototypeOf.call(space_default, className)) {
        throw Error(`May not create Space "${name}" in Piece "${this.name}"`);
      }
      return super.createElement(className, name, attrs);
    }
    /**
     * Show this piece to all players
     * @category Visibility
     */
    showToAll() {
      delete this._visible;
    }
    /**
     * Show this piece only to the given player
     * @category Visibility
     */
    showOnlyTo(player) {
      if (typeof player !== "number")
        player = player.position;
      this._visible = {
        default: false,
        except: [player]
      };
    }
    /**
     * Show this piece to the given players without changing it's visibility to
     * any other players.
     * @category Visibility
     */
    showTo(...player) {
      if (typeof player[0] !== "number")
        player = player.map((p) => p.position);
      if (this._visible === void 0)
        return;
      if (this._visible.default) {
        if (!this._visible.except)
          return;
        this._visible.except = this._visible.except.filter((i) => !player.includes(i));
      } else {
        this._visible.except = Array.from(/* @__PURE__ */ new Set([...this._visible.except instanceof Array ? this._visible.except : [], ...player]));
      }
    }
    /**
     * Hide this piece from all players
     * @category Visibility
     */
    hideFromAll() {
      this._visible = { default: false };
    }
    /**
     * Hide this piece from the given players without changing it's visibility to
     * any other players.
     * @category Visibility
     */
    hideFrom(...player) {
      if (typeof player[0] !== "number")
        player = player.map((p) => p.position);
      if (this._visible?.default === false && !this._visible.except)
        return;
      if (this._visible === void 0 || this._visible.default === true) {
        this._visible = {
          default: true,
          except: Array.from(/* @__PURE__ */ new Set([...this._visible?.except instanceof Array ? this._visible.except : [], ...player]))
        };
      } else {
        if (!this._visible.except)
          return;
        this._visible.except = this._visible.except.filter((i) => !player.includes(i));
      }
    }
    /**
     * Returns whether this piece is visible to the given player
     * @category Visibility
     */
    isVisibleTo(player) {
      if (typeof player !== "number")
        player = player.position;
      if (this._visible === void 0)
        return true;
      if (this._visible.default) {
        return !this._visible.except || !this._visible.except.includes(player);
      } else {
        return this._visible.except?.includes(player) || false;
      }
    }
    /**
     * Returns whether this piece is visible to all players, or to the current
     * player if called when in a player context (during an action taken by a
     * player or while the game is viewed by a given player.)
     * @category Visibility
     */
    isVisible() {
      if (this._ctx.player)
        return this.isVisibleTo(this._ctx.player.position);
      return this._visible?.default !== false && (this._visible?.except ?? []).length === 0;
    }
    /**
     * Provide list of attributes that remain visible even when these pieces are
     * not visible to players. E.g. In a game with multiple card decks with
     * different backs, identified by Card#deck, the identity of the card when
     * face-down is hidden, but the deck it belongs to is not, since the card art
     * on the back would identify the deck. In this case calling
     * `Card.revealWhenHidden('deck')` will cause all attributes other than 'deck'
     * to be hidden when the card is face down, while still revealing which deck
     * it is.
     * @category Visibility
     */
    static revealWhenHidden(...attrs) {
      this.visibleAttributes = attrs;
    }
    /**
     * Move this piece into another element. This triggers any {@link
     * Space#onEnter | onEnter} callbacks in the destination.
     * @category Structure
     *
     * @param to - Destination element
     * @param options.position - Place the piece into a specific numbered position
     * relative to the other elements in this space. Positive numbers count from
     * the beginning. Negative numbers count from the end.
     * @param options.fromTop - Place the piece into a specific numbered position counting
     * from the first element
     * @param options.fromBottom - Place the piece into a specific numbered position
     * counting from the last element
     */
    putInto(to, options) {
      if (to.isDescendantOf(this))
        throw Error(`Cannot put ${this} into itself`);
      let pos = to._t.order === "stacking" ? 0 : to._t.children.length;
      if (options?.position !== void 0)
        pos = options.position >= 0 ? options.position : to._t.children.length + options.position + 1;
      if (options?.fromTop !== void 0)
        pos = options.fromTop;
      if (options?.fromBottom !== void 0)
        pos = to._t.children.length - options.fromBottom;
      const previousParent = this._t.parent;
      const position = this.position();
      if (this.hasMoved() || to.hasMoved())
        this.game.addDelay();
      const refs = previousParent === to && options?.row === void 0 && options?.column === void 0 && to.childRefsIfObscured();
      this._t.parent._t.children.splice(position, 1);
      this._t.parent = to;
      to._t.children.splice(pos, 0, this);
      if (refs)
        to.assignChildRefs(refs);
      if (previousParent !== to && previousParent instanceof space_default)
        previousParent.triggerEvent("exit", this);
      if (previousParent !== to && this._ctx.trackMovement)
        this._t.moved = true;
      delete this.column;
      delete this.row;
      if (options?.row !== void 0)
        this.row = options.row;
      if (options?.column !== void 0)
        this.column = options.column;
      if (previousParent !== to && to instanceof space_default)
        to.triggerEvent("enter", this);
    }
    cloneInto(into) {
      let attrs = this.attributeList();
      delete attrs.column;
      delete attrs.row;
      const clone = into.createElement(this.constructor, this.name, attrs);
      if (into._t.order === "stacking") {
        into._t.children.unshift(clone);
      } else {
        into._t.children.push(clone);
      }
      clone._t.parent = into;
      clone._t.order = this._t.order;
      for (const child of this._t.children)
        if (child instanceof _Piece)
          child.cloneInto(clone);
      return clone;
    }
    /**
     * Remove this piece from the playing area and place it into {@link
     * Game#pile}
     * @category Structure
     */
    remove() {
      return this.putInto(this._ctx.removed);
    }
  };

  // node_modules/@boardzilla/core/entry/player/player.js
  var Player = class {
    static {
      __name(this, "Player");
    }
    /**
     * Provide list of attributes that are hidden from other players
     */
    static hide(...attrs) {
      this.hiddenAttributes = attrs;
    }
    isCurrent() {
      return this._players.currentPosition.includes(this.position);
    }
    /**
     * Set this player as the current player
     */
    setCurrent() {
      return this._players.setCurrent(this);
    }
    /**
     * Returns an array of all other players.
     */
    others() {
      return Array.from(this._players).filter((p) => p !== this);
    }
    /**
     * Returns the other player. Only allowed in 2 player games
     */
    other() {
      if (this._players.length !== 2)
        throw Error("Can only use `other` for 2 player games");
      return this._players.find((p) => p !== this);
    }
    allMy(className, ...finders) {
      return this.game.all(className, { owner: this }, ...finders);
    }
    my(className, ...finders) {
      return this.game.first(className, { owner: this }, ...finders);
    }
    has(className, ...finders) {
      return this.game.has(className, { owner: this }, ...finders);
    }
    toJSON(player) {
      let { _players, game: _b, ...attrs } = this;
      attrs = serializeObject(Object.fromEntries(Object.entries(attrs).filter(([key, value]) => typeof value !== "function" && (player === void 0 || player === this || !this.constructor.hiddenAttributes.includes(key)))));
      if (globalThis.window) {
        try {
          structuredClone(attrs);
        } catch (e) {
          console.error(`invalid properties on player ${this}:
${JSON.stringify(attrs, void 0, 2)}`);
          throw e;
        }
      }
      return attrs;
    }
    toString() {
      return this.name;
    }
  };
  Player.isPlayer = true;
  Player.hiddenAttributes = [];
  var player_default = Player;

  // node_modules/@boardzilla/core/entry/action/selection.js
  var Selection = class _Selection {
    static {
      __name(this, "Selection");
    }
    constructor(name, s) {
      this.clientContext = {};
      this.invalidOptions = [];
      this.name = name;
      if (s instanceof _Selection) {
        Object.assign(this, s);
      } else {
        if (s.selectFromChoices) {
          this.type = "choices";
          this.choices = s.selectFromChoices.choices;
          this.initial = s.selectFromChoices.initial;
        } else if (s.selectOnBoard) {
          this.type = "board";
          this.boardChoices = s.selectOnBoard.chooseFrom;
          if (s.selectOnBoard.number !== void 0) {
            this.min = s.selectOnBoard.number;
            this.max = s.selectOnBoard.number;
          }
          this.min ?? (this.min = s.selectOnBoard.min);
          this.max ?? (this.max = s.selectOnBoard.max);
          this.initial ?? (this.initial = s.selectOnBoard.initial);
        } else if (s.selectNumber) {
          this.type = "number";
          this.min = s.selectNumber.min;
          this.max = s.selectNumber.max;
          this.initial = s.selectNumber.initial ?? s.selectNumber.min ?? 1;
        } else if (s.enterText) {
          this.type = "text";
          this.regexp = s.enterText.regexp;
          this.initial = s.enterText.initial;
        } else if (s.selectPlaceOnBoard) {
          this.type = "place";
          this.placePiece = s.selectPlaceOnBoard.piece;
          this.rotationChoices = s.selectPlaceOnBoard.rotationChoices;
        } else {
          this.type = "button";
          this.value = s.value;
          this.skipIf ?? (this.skipIf = "only-one");
        }
      }
      this.prompt = s.prompt;
      this.confirm = typeof s.confirm === "string" ? [s.confirm, void 0] : s.confirm;
      this.validation = s.validation;
      this.skipIf = "skipIf" in s && s.skipIf || "only-one";
      this.clientContext = s.clientContext ?? {};
    }
    isLabeledChoice() {
      return this.choices && typeof this.choices[0] === "object" && !(this.choices[0] instanceof element_default) && !(this.choices[0] instanceof player_default);
    }
    choiceLabels() {
      if (this.isLabeledChoice()) {
        return this.choices.map((c) => c.label);
      }
      return this.choices ?? [];
    }
    choiceValues() {
      if (this.isLabeledChoice()) {
        return this.choices.map((c) => c.choice);
      }
      return this.choices ?? [];
    }
    labelFor(choice) {
      return String(this.isLabeledChoice() ? this.choices.find((c) => c.choice === choice)?.label : choice);
    }
    /**
     * check specific selection with a given arg. evaluates within the context of
     * previous args, so any selection elements that have previous-arg-function
     * forms are here evaluated with the previous args. returns new selection and
     * error if any
     */
    error(args) {
      const arg = args[this.name];
      const s = this.resolve(args);
      if (s.validation) {
        const error = s.validation(args);
        if (error !== void 0 && error !== true)
          return error || "Invalid selection";
      }
      if (s.type === "choices" && s.choices) {
        if (arg instanceof Array)
          return "multi-choice stil unsupported";
        return s.choiceValues().includes(arg) ? void 0 : "Not a valid choice";
      }
      if (s.type === "board" && s.boardChoices) {
        const results = s.boardChoices;
        if (!results)
          console.warn("Attempted to validate an impossible move", s);
        if (this.isMulti()) {
          if (!(arg instanceof Array))
            throw Error("Required multi select");
          if (results && arg.some((a) => !results.includes(a)))
            return "Selected elements are not valid";
          if (s.min !== void 0 && arg.length < s.min)
            return "Below minimum";
          if (s.max !== void 0 && arg.length > s.max)
            return "Above maximum";
        } else {
          return results && results.includes(arg) ? void 0 : "Selected element is not valid";
        }
      }
      if (s.type === "text") {
        return typeof arg === "string" && (!s.regexp || arg.match(s.regexp)) ? void 0 : "Invalid text entered";
      }
      if (s.type === "number") {
        if (typeof arg !== "number")
          return "Not a number";
        if (s.min !== void 0 && arg < s.min)
          return "Below minimum";
        if (s.max !== void 0 && arg > s.max)
          return "Above maximum";
        return void 0;
      }
      return void 0;
    }
    // All possible valid Arguments to this selection. Have to make some assumptions here to tree shake possible moves
    options() {
      if (this.isUnbounded())
        return [];
      if (this.type === "number")
        return range(this.min ?? 1, this.max);
      const choices = this.choiceValues();
      if (this.isMulti())
        return combinations(this.boardChoices || choices, this.min ?? 1, this.max ?? Infinity);
      if (this.boardChoices)
        return this.boardChoices;
      if (this.choices)
        return choices;
      return [];
    }
    isUnbounded() {
      if (this.type === "number")
        return this.max === void 0 || this.max - (this.min ?? 1) > 100;
      return this.type === "text" || this.type === "button" || this.type === "place";
    }
    isResolved() {
      return typeof this.prompt !== "function" && typeof this.min !== "function" && typeof this.max !== "function" && typeof this.initial !== "function" && typeof this.skipIf !== "function" && typeof this.choices !== "function" && typeof this.boardChoices !== "function";
    }
    isMulti() {
      return (this.type === "choices" || this.type === "board") && (this.min !== void 0 || this.max !== void 0);
    }
    isBoardChoice() {
      return this.type === "board" || this.type === "place";
    }
    resolve(args) {
      const resolved = new _Selection(this.name, this);
      if (typeof this.boardChoices === "string")
        throw Error("not impl");
      if (typeof this.prompt === "function")
        resolved.prompt = this.prompt(args);
      if (typeof this.min === "function")
        resolved.min = this.min(args);
      if (typeof this.max === "function")
        resolved.max = this.max(args);
      if (typeof this.initial === "function")
        resolved.initial = this.initial(args);
      if (typeof this.skipIf === "function")
        resolved.skipIf = this.skipIf(args);
      if (typeof this.choices === "function")
        resolved.choices = this.choices(args);
      if (typeof this.boardChoices === "string")
        throw Error("not impl");
      if (typeof this.boardChoices === "function")
        resolved.boardChoices = this.boardChoices(args);
      return resolved;
    }
    isPossible() {
      if (this.type === "choices" && this.choices)
        return this.choices.length > 0;
      const isInBounds = this.max !== void 0 ? (this.min ?? 1) <= this.max : true;
      if (this.type === "board" && this.boardChoices)
        return isInBounds && this.boardChoices.length >= (this.min ?? 1);
      if (this.type === "number")
        return isInBounds;
      return true;
    }
    isForced() {
      if (this.skipIf === "never")
        return;
      if (this.type === "button") {
        return this.value;
      } else if (this.boardChoices && (this.skipIf === true || this.boardChoices?.length === 1) && !this.isMulti()) {
        return this.boardChoices[0];
      } else if (this.boardChoices && this.isMulti() && (this.skipIf === true || this.boardChoices.length === (this.min ?? 1) || this.max === 0)) {
        return this.boardChoices.slice(0, this.min);
      } else if (this.type === "number" && this.min !== void 0 && this.min === this.max) {
        return this.min;
      } else if (this.type === "choices" && this.choices) {
        if (this.choices.length === 1 || this.skipIf === true)
          return this.choiceValues()[0];
      }
    }
    overrideOptions(options) {
      if (this.type === "board") {
        this.boardChoices = options;
      } else if (this.isLabeledChoice()) {
        this.choices = this.choices.filter((c) => options.includes(c.choice));
      } else {
        this.choices = options;
      }
    }
    toString() {
      if (!this.isResolved())
        return `unresolved selection ${this.type}`;
      return `${this.type === "board" ? `click ${this.boardChoices[0]?.constructor.name || "board element"}` : `pick ${this.type}`}${this.choices || this.boardChoices ? ` (${(this.choices || this.boardChoices).length} choices)` : ""}`;
    }
  };

  // node_modules/@boardzilla/core/entry/action/action.js
  var Action = class {
    static {
      __name(this, "Action");
    }
    constructor({ prompt, description, condition }) {
      this.selections = [];
      this.moves = [];
      this.messages = [];
      this.order = [];
      this.mutated = false;
      this.prompt = prompt;
      this.description = description;
      this.condition = condition;
    }
    isPossible(args) {
      return typeof this.condition === "function" ? this.condition(args) : this.condition ?? true;
    }
    // given a set of args, return sub-selections possible trying each possible next arg
    // return undefined if these args are impossible
    // return 0-length if these args are submittable
    // return array of follow-up selections if incomplete
    // skipping/expanding is very complex and this method runs all the rules for what should/must be combined, either as additional selections or as forced args
    // skippable options will still appear in order to present the choices to the user to select that tree. This will be the final selection if no other selection turned skipping off
    // TODO memoize
    _getPendingMoves(args, debug) {
      if (debug) {
        debug[this.name] = { args: {} };
        for (const arg of Object.keys(args))
          debug[this.name].args[arg] = "sel";
      }
      const moves = this._getPendingMovesInner(args, debug);
      if (moves?.length) {
        for (const move of moves) {
          if (debug) {
            debug[move.name].args[move.selections[0].name] = "ask";
          }
          const combineWith = move.selections[0].clientContext?.combineWith;
          let confirm = move.selections[0].confirm;
          let validation = move.selections[0].validation;
          for (let i = this.selections.findIndex((s) => s.name === move.selections[0].name) + 1; i !== this.selections.length; i++) {
            if (confirm)
              break;
            let selection = this.selections[i];
            if (combineWith?.includes(selection.name))
              selection = selection.resolve(move.args);
            if (!selection.isResolved())
              break;
            const arg = selection.isForced();
            if (arg !== void 0) {
              move.args[selection.name] = arg;
              if (debug) {
                debug[move.name].args[selection.name] = "forced";
              }
            } else if (combineWith?.includes(selection.name)) {
              move.selections.push(selection);
              if (debug) {
                debug[move.name].args[selection.name] = "ask";
              }
            } else {
              break;
            }
            confirm = selection.confirm ?? confirm;
            validation = selection.validation ?? validation;
          }
          if (confirm)
            move.selections[0].confirm = confirm;
          if (validation)
            move.selections[move.selections.length - 1].validation = validation;
        }
      }
      return moves;
    }
    _getPendingMovesInner(args, debug) {
      var _a, _b, _c, _d;
      let selection = this._nextSelection(args);
      if (!selection)
        return [];
      const move = {
        name: this.name,
        prompt: this.prompt,
        description: this.description,
        args,
        selections: [selection]
      };
      if (!selection.isPossible()) {
        if (debug) {
          (_a = debug[this.name].args)[_b = selection.name] ?? (_a[_b] = "imp");
        }
        return;
      }
      if (!selection.isUnbounded()) {
        let possibleOptions = [];
        let pruned = false;
        let pendingMoves = [];
        let hasCompleteMove = false;
        for (const option of selection.options()) {
          const allArgs = { ...args, [selection.name]: option };
          if (selection.validation && !selection.isMulti()) {
            const error = this._withDecoratedArgs(allArgs, (args2) => selection.error(args2));
            if (error) {
              pruned = true;
              selection.invalidOptions.push({ option, error, label: selection.labelFor(option) });
              continue;
            }
          }
          const submoves = this._getPendingMovesInner(allArgs, debug);
          if (submoves === void 0) {
            pruned = true;
          } else {
            possibleOptions.push(option);
            hasCompleteMove || (hasCompleteMove = submoves.length === 0);
            pendingMoves = pendingMoves.concat(submoves);
          }
        }
        if (!possibleOptions.length) {
          if (debug) {
            debug[this.name].args[selection.name] = "tree";
          }
          return void 0;
        }
        if (pruned && !selection.isMulti()) {
          selection.overrideOptions(possibleOptions);
        }
        if (pendingMoves.length && ((selection.skipIf === "always" || selection.skipIf === true) && !hasCompleteMove || selection.skipIf === "only-one" && possibleOptions.length === 1 && (!selection.clientContext?.combineWith || selection.options().length <= 1))) {
          if (debug) {
            debug[this.name].args[selection.name] = selection.skipIf === true ? "skip" : selection.skipIf;
          }
          return pendingMoves;
        }
      }
      if (debug && (debug[this.name].args[selection.name] ?? "imp") === "imp") {
        (_c = debug[this.name].args)[_d = selection.name] ?? (_c[_d] = "future");
      }
      return [move];
    }
    /**
     * given a partial arg list, returns a selection object for continuation if one exists.
     * @internal
     */
    _nextSelection(args) {
      let nextSelection = void 0;
      for (const s of this.selections) {
        const selection = s.resolve(args);
        if (selection.skipIf === true)
          continue;
        if (!(s.name in args)) {
          nextSelection = selection;
          break;
        }
      }
      return nextSelection;
    }
    /**
     * process this action with supplied args. returns error if any
     * @internal
     */
    _process(player, args) {
      let error = void 0;
      if (!this.isPossible(args))
        return `${this.name} action not possible`;
      for (const selection of this.selections) {
        if (args[selection.name] === void 0) {
          const arg = selection.resolve(args).isForced();
          if (arg)
            args[selection.name] = arg;
        }
        error = this._withDecoratedArgs(args, (args2) => selection.error(args2));
        if (error) {
          console.error(`Invalid choice for ${selection.name}. Got "${args[selection.name]}" ${error}`);
          break;
        }
      }
      if (error)
        return error;
      if (!globalThis.window) {
        const pendingMoves = this._getPendingMoves(args);
        if (!pendingMoves) {
          console.error("attempted to process invalid args", this.name, args);
          return error || "unknown error during action._process";
        }
        if (pendingMoves.length) {
          return error || "incomplete action";
        }
      }
      let moveIndex = 0;
      let messageIndex = 0;
      for (const seq of this.order) {
        if (seq === "move") {
          this.moves[moveIndex++](args);
        } else {
          const message = this.messages[messageIndex++];
          const messageArgs = typeof message.args === "function" ? message.args(args) : message.args;
          if (message.position) {
            this.gameManager.game.messageTo(message.position, message.text, { ...args, player, ...messageArgs });
          } else {
            this.gameManager.game.message(message.text, { ...args, player, ...messageArgs });
          }
        }
      }
    }
    _addSelection(selection) {
      if (this.selections.find((s) => s.name === selection.name))
        throw Error(`Duplicate selection name on action: ${selection.name}`);
      if (this.mutated)
        console.warn(`Adding a choice ("${selection.name}") after behavior in action is valid but players will need to perform the choices before the behavior.`);
      this.selections.push(selection);
      return selection;
    }
    // fn must be idempotent
    _withDecoratedArgs(args, fn) {
      if (args["__placement__"]) {
        const placementSelection = this.selections.find((s) => s.name === "__placement__");
        if (placementSelection && args[placementSelection.placePiece]) {
          args = { ...args };
          const placePiece = args[placementSelection.placePiece];
          const { row, column, _rotation } = placePiece;
          const [newColumn, newRow, newRotation] = args["__placement__"];
          placePiece.column = newColumn;
          placePiece.row = newRow;
          placePiece.rotation = newRotation ?? 0;
          const result = fn(args);
          placePiece.column = column;
          placePiece.row = row;
          placePiece._rotation = _rotation;
          return result;
        }
      }
      return fn(args);
    }
    _getError(selection, args) {
      return this._withDecoratedArgs(args, (args2) => selection.error(args2));
    }
    _getConfirmation(selection, args) {
      if (!selection.confirm)
        return;
      const argList = selection.confirm[1];
      return n(selection.confirm[0], { ...args, ...typeof argList === "function" ? this._withDecoratedArgs(args, argList) : argList });
    }
    /**
     * Add behaviour to this action to alter game state. After adding the choices
     * to an action, calling `do` causes Boardzilla to use the player choices to
     * actually do something with those choices. Call this method after all the
     * methods for player choices so that the choices are properly available to
     * the `do` function.
     *
     * @param move - The action to perform. This function accepts one argument
     * with key-value pairs for each choice added to the action using the provided
     * names.
     *
     * @example
     * player => action({
     *   prompt: 'Take resources',
     * }).chooseFrom({
     *   'resource', ['lumber', 'steel'],
     *   { prompt: 'Select resource' }
     * }).chooseNumber(
     *   'amount', {
     *     prompt: 'Select amount',
     *     max: 3
     * }).do(({ resource, amount }) => {
     *   // the choices are automatically passed in with their proper type
     *   game.firstN(amount, Resource, {resource}).putInto(
     *     player.my('stockPile')
     *   );
     * })
     * @category Behaviour
     */
    do(move) {
      this.mutated = true;
      this.moves.push(move);
      this.order.push("move");
      return this;
    }
    /**
     * Add a message to this action that will be broadcast in the chat. Call this
     * method after all the methods for player choices so that the choices are
     * properly available to the `message` function. However the message should be
     * called before or after any `do` behaviour depending on whether you want the
     * message to reflect the game state before or after the move is performs. The
     * action's `message` and `do` functions can be intermixed in this way to
     * generate messages at different points int the execution of a move.
     *
     * @param text - The text of the message to send. This can contain interpolated
     * strings with double braces just as when calling {@link Game#message}
     * directly. However when using this method, the player performing the action,
     * plus any choices made in the action are automatically made available.
     *
     * @param args - If additional strings are needed in the message besides
     * 'player' and the player choices, these can be specified here. This can also
     * be specified as a function that accepts the player choices and returns
     * key-value pairs of strings for interpolation.
     *
     * @example
     * action({
     *   prompt: 'Say something',
     * }).enterText({
     *   'message',
     * }).message(
     *   '{{player}} said {{message}}' // no args needed
     * ).message(
     *   "I said, {{player}} said {{loudMessage}}",
     *   ({ message }) => ({ loudMessage: message.toUpperCase() })
     * )
     * @category Behaviour
     */
    message(text, args) {
      this.messages.push({ text, args });
      this.order.push("message");
      return this;
    }
    /**
     * Add a message to this action that will be broadcast in the chat to the
     * specified player(s). Call this method after all the methods for player
     * choices so that the choices are properly available to the `message`
     * function. However the message should be called before or after any `do`
     * behaviour depending on whether you want the message to reflect the game
     * state before or after the move is performs. The action's `message` and `do`
     * functions can be intermixed in this way to generate messages at different
     * points int the execution of a move.
     *
     * @param player - Player or players to receive the message
     *
     * @param text - The text of the message to send. This can contain interpolated
     * strings with double braces just as when calling {@link Game#message}
     * directly. However when using this method, the player performing the action,
     * plus any choices made in the action are automatically made available.
     *
     * @param args - If additional strings are needed in the message besides
     * 'player' and the player choices, these can be specified here. This can also
     * be specified as a function that accepts the player choices and returns
     * key-value pairs of strings for interpolation.
     *
     * @example
     * action({
     *   prompt: 'Say something',
     * }).enterText({
     *   'message',
     * }).message(
     *   '{{player}} said {{message}}' // no args needed
     * ).message(
     *   "I said, {{player}} said {{loudMessage}}",
     *   ({ message }) => ({ loudMessage: message.toUpperCase() })
     * )
     * @category Behaviour
     */
    messageTo(player, text, args) {
      if (!(player instanceof Array))
        player = [player];
      for (const p of player) {
        this.messages.push({ position: typeof p === "number" ? p : p.position, text, args });
        this.order.push("message");
      }
      return this;
    }
    /**
     * Add a choice to this action from a list of options. These choices will be
     * displayed as buttons in the UI.
     *
     * @param name - The name of this choice. This name will be used in all
     * functions that accept the player's choices
     *
     * @param choices - An array of choices. This may be an array of simple values
     * or an array of objects in the form: `{ label: string, choice: value }`
     * where value is the actual choice that will be passed to the rest of the
     * action, but label is the text presented to the player that they will be
     * prompted to click. Use the object style when you want player text to
     * contain additional logic or differ in some way from the choice, similiar to
     * `<option value="key">Some text</option>` in HTML. This can also be a
     * function that returns the choice array. This function will accept arguments
     * for each choice the player has made up to this point in the action.
     *
     * @param {Object} options
     * @param options.prompt - Prompt displayed to the user for this choice.
     * @param options.skipIf - One of 'always', 'never' or 'only-one' or a
     * function returning a boolean. (Default 'only-one').
     *
     * <ul>
     * <li>only-one: If there is only valid choice in the choices given, the game
     * will skip this choice, prompting the player for subsequent choices, if any,
     * or completing the action otherwise.
     * <li>always: Rather than present this choice directly, the player will be
     * prompted with choices from the *next choice* in the action for each
     * possible choice here, essentially expanding the choices ahead of time to
     * save the player a step. This option only has relevance if there are
     * subsequent choices in the action.
     * <li>never: Always present this choice, even if the choice is forced
     * <li>function: A function that accepts all player choices up to this point
     * and returns a boolean. If returning true, this choice will be skipped.
     * This form is useful in the rare situations where the choice at the time may
     * be meaningless, e.g. selecting from a set of identical tokens. In this case
     * the game will make the choice for the player using the first viable option.
     * </ul>
     *
     * @param options.validate - A function that takes an object of key-value
     * pairs for all player choices and returns a boolean. If false, the game will
     * not allow the player to submit this choice. If a string is returned, this
     * will display as the reason for disallowing these selections.
     *
     * @param options.confirm - A confirmation message that the player will always
     * see before commiting this choice. This can be useful to present additional
     * information about the consequences of this choice, or simply to force the
     * player to hit a button with a clear message. This can be a simple string,
     * or a 2-celled array in the same form as {@link message} with a string
     * message and a set of key-value pairs for string interpolation, optionally
     * being a function that takes an object of key-value pairs for all player
     * choices, and returns the interpolation object.
     *
     * @example
     * action({
     *   prompt: 'Choose color',
     * }).chooseFrom(
     *   'color', ['white', 'blue', 'red'],
     * ).do(
     *   ({ color }) => ... color will be equal to the player-selected color ...
     * )
     *
     * // a more complex example:
     * action({
     *   prompt: 'Take resources',
     * }).chooseFrom(
     *   'resource', ['lumber', 'steel', 'oil'],
     *   { prompt: 'Select resource' }
     * ).chooseFrom(
     *   // Use the functional style to include the resource choice in the text
     *   // Also use object style to have the value simply be "high" or "low"
     *   'grade', ({ resource }) => [
     *     { choice: 'high', label: `High grade ${resource}` }
     *     { choice: 'low', label: `Low grade ${resource}` }
     *   ],
     *   {
     *     // A follow-up choice that doesn't apply to "oil"
     *     skipIf: ({ resource }) => resource === 'oil',
     *     // Add an 'are you sure?' message
     *     confirm: ['Buy {{grade}} grade {{resource}}?', ({ grade }) = ({ grade: grade.toUpperCase() })]
     *   }
     * ).do (
     *   ({ resource, grade }) => {
     *     // resource will equal 'lumber', 'steel' or 'oil'
     *     // grade will equal 'high' or 'low'
     *   }
     * )
     * @category Choices
     */
    chooseFrom(name, choices, options) {
      this._addSelection(new Selection(name, {
        prompt: options?.prompt,
        validation: options?.validate,
        confirm: options?.confirm,
        skipIf: options?.skipIf,
        selectFromChoices: { choices }
      }));
      return this;
    }
    /**
     * Prompt the user for text entry. Use this in games where players submit
     * text, like word-guessing games.
     *
     * @param name - The name of this text input. This name will be used in all
     * functions that accept the player's choices
     *
     * @param {Object} options
     * @param options.initial - Default text that can appear initially before a
     * user types.
     * @param options.prompt - Prompt displayed to the user for entering this
     * text.
     *
     * @param options.validate - A function that takes an object of key-value
     * pairs for all player choices and returns a boolean. If false, the game will
     * not allow the player to submit this text. If a string is returned, this
     * will display as the reason for disallowing this text.
     *
     * @example
     * action({
     *   prompt: 'Guess a word',
     * }).enterText({
     *   'guess',
     *   { prompt: 'Your guess', }
     * }).message(
     *   guess => `{{player}} guessed ${guess}`
     * })
     * @category Choices
     */
    enterText(name, options) {
      const { prompt, validate, regexp, initial } = options || {};
      this._addSelection(new Selection(name, { prompt, validation: validate, enterText: { regexp, initial } }));
      return this;
    }
    /**
     * Add a numerical choice for this action. This will be presented with a
     * number picker.
     *
     * @param name - The name of this choice. This name will be used in all
     * functions that accept the player's choices
     *
     * @param {Object} options
     *
     * @param options.prompt - Prompt displayed to the user for entering this
     * number.
     *
     * @param options.min - Minimum allowed. Default 1.
     *
     * @param options.max - Maximum allowed. Default Infinity
     *
     * @param options.initial - Initial value to display in the picker
     *
     * @param options.skipIf - One of 'always', 'never' or 'only-one' or a
     * function returning a boolean. (Default 'only-one').
     *
     * <ul>
     * <li>only-one: If there is only valid choice in the choices given, the game
     * will skip this choice, prompting the player for subsequent choices, if any,
     * or completing the action otherwise.
     * <li>always: Rather than present this choice directly, the player will be
     * prompted with choices from the *next choice* in the action for each
     * possible choice here, essentially expanding the choices ahead of time to
     * save the player a step. This option only has relevance if there are
     * subsequent choices in the action.
     * <li>never: Always present this choice, even if the choice is forced
     * <li>function: A function that accepts all player choices up to this point
     * and returns a boolean. If returning true, this choice will be skipped.
     * This form is useful in the rare situations where the choice at the time may
     * be meaningless, e.g. selecting from a set of identical tokens. In this case
     * the game will make the choice for the player using the first viable option.
     * </ul>
     *
     * @param options.validate - A function that takes an object of key-value
     * pairs for all player choices and returns a boolean. If false, the game will
     * not allow the player to submit this choice. If a string is returned, this
     * will display as the reason for disallowing these selections.
     *
     * @param options.confirm - A confirmation message that the player will always
     * see before commiting this choice. This can be useful to present additional
     * information about the consequences of this choice, or simply to force the
     * player to hit a button with a clear message. This can be a simple string,
     * or a 2-celled array in the same form as {@link message} with a string
     * message and a set of key-value pairs for string interpolation, optionally
     * being a function that takes an object of key-value pairs for all player
     * choices, and returns the interpolation object.
     *
     * @example
     * player => action({
     *   prompt: 'Buy resources',
     * }).chooseNumber(
     *   'amount', {
     *     min: 5,
     *     max: 10 // select from 5 - 10
     * }).do(
     *   ({ amount }) => player.resource += amount
     * );
     * @category Choices
     */
    chooseNumber(name, options = {}) {
      const { min, max, prompt, confirm, validate, initial, skipIf } = options;
      this._addSelection(new Selection(name, { prompt, confirm, validation: validate, skipIf, selectNumber: { min, max, initial } }));
      return this;
    }
    chooseOnBoard(name, choices, options) {
      const { prompt, confirm, validate, initial, min, max, number, skipIf } = options || {};
      this._addSelection(new Selection(name, { prompt, confirm, validation: validate, skipIf, selectOnBoard: { chooseFrom: choices, min, max, number, initial } }));
      if (min !== void 0 || max !== void 0 || number !== void 0) {
        return this;
      }
      return this;
    }
    choose(name, type, choices, options) {
      if (type === "number")
        return this.chooseNumber(name, choices);
      if (type === "text")
        return this.enterText(name, choices);
      if (type === "select")
        return this.chooseFrom(name, choices, options);
      return this.chooseOnBoard(name, choices, options);
    }
    /**
     * Create a multi-selection choice. These selections will be presented all at
     * once as a form. This is used for form-like choices that have a number of
     * choices that are not board choices, i.e. chooseFrom, chooseNumber and
     * enterText
     *
     * @param choices - An object containing the selections. This is a set of
     * key-value pairs where each key is the name of the selection and each value
     * is an array of options where the first array element is a string indicating
     * the type of choice ('number', 'select', 'text') and subsequent elements
     * contain the options for the appropriate choice function (`chooseNumber`,
     * `chooseFrom` or `enterText`).
     *
     * @param options.validate - A function that takes an object of key-value
     * pairs for all player choices and returns a boolean. If false, the game will
     * not allow the player to submit these choices. If a string is returned, this
     * will display as the reason for disallowing these selections.
     *
     * @param options.confirm - A confirmation message that the player will always
     * see before commiting this choice. This can be useful to present additional
     * information about the consequences of this choice, or simply to force the
     * player to hit a button with a clear message. This can be a simple string,
     * or a 2-celled array in the same form as {@link message} with a string
     * message and a set of key-value pairs for string interpolation, optionally
     * being a function that takes an object of key-value pairs for all player
     * choices, and returns the interpolation object.
     *
     * @example
     * action({
     *   prompt: 'purchase'
     * }).chooseGroup({
     *   lumber: ['number', { min: 2 }],
     *   steel: ['number', { min: 2 }]
     * }, {
     *   // may not purchase more than 10 total resources
     *   validate: ({ lumber, steel }) => lumber + steel <= 10
     * });
     * @category Choices
     */
    chooseGroup(choices, options) {
      for (const [name, choice] of Object.entries(choices)) {
        if (choice[0] === "number")
          this.chooseNumber(name, choice[1]);
        if (choice[0] === "select")
          this.chooseFrom(name, choice[1], choice[2]);
        if (choice[0] === "text")
          this.enterText(name, choice[1]);
      }
      if (options?.confirm)
        this.selections[this.selections.length - 1].confirm = typeof options.confirm === "string" ? [options.confirm, void 0] : options.confirm;
      if (options?.validate)
        this.selections[this.selections.length - 1].validation = options.validate;
      for (let i = 1; i < Object.values(choices).length; i++) {
        this.selections[this.selections.length - 1 - i].clientContext = { combineWith: this.selections.slice(-i).map((s) => s.name) };
      }
      return this;
    }
    /**
     * Add a confirmtation step to this action. This can be useful if you want to
     * present additional information to the player related to the consequences of
     * their choice, like a cost incurred. Or this can simply be used to force the
     * user to click an additional button on a particular important choice.
     *
     * @param prompt - Button text for the confirmation step. This can be a
     * function returning the text which accepts each choice the player has made
     * up till now as an argument.
     *
     * @example
     * action({
     *   prompt: "Buy resources",
     * }).chooseNumber({
     *   'amount', {
     *     prompt: "Amount",
     *     max: Math.floor(player.coins / 5)
     * }).confirm(
     *   ({ amount }) => `Spend ${amount * 5} coins`
     * }).do(({ amount }) => {
     *   player.resource += amount;
     *   player.coins -= amount * 5;
     * });
     */
    confirm(prompt) {
      this._addSelection(new Selection("__confirm__", {
        prompt,
        confirm: typeof prompt === "string" ? prompt : ["{{__message__}}", (args) => ({ __message__: prompt(args) })],
        value: true
      }));
      return this;
    }
    /**
     * Perform a move with the selected element(s) into a selected
     * Space/Piece. This is almost the equivalent of calling Action#do and adding
     * a putInto command, except that the game will also permit the UI to allow a
     * mouse drag for the move.
     *
     * @param piece - A {@link Piece} to move or the name of the piece selection in this action
     * @param into - A {@link GameElement} to move into or the name of the
     * destination selection in this action.
     *
     * player => action({
     *   prompt: 'Discard a card from hand'
     * }).chooseOnBoard(
     *   'card', player.my(Card)
     * ).move(
     *   'card', $.discard
     * )
     * @category Behaviour
     */
    move(piece, into) {
      this.do((args) => {
        const selectedPiece = piece instanceof Piece ? piece : args[piece];
        const selectedInto = into instanceof element_default ? into : args[into];
        if (selectedPiece instanceof Array) {
          new ElementCollection(...selectedPiece).putInto(selectedInto);
        } else {
          selectedPiece.putInto(selectedInto);
        }
      });
      const pieceSelection = typeof piece === "string" ? this.selections.find((s) => s.name === piece) : void 0;
      const intoSelection = typeof into === "string" ? this.selections.find((s) => s.name === into) : void 0;
      if (intoSelection && intoSelection.type !== "board")
        throw Error(`Invalid move: "${into}" must be the name of a previous chooseOnBoard`);
      if (pieceSelection && pieceSelection.type !== "board")
        throw Error(`Invalid move: "${piece}" must be the name of a previous chooseOnBoard`);
      if (intoSelection?.isMulti())
        throw Error("Invalid move: May not move into a multiple choice selection");
      if (pieceSelection && !pieceSelection.isMulti())
        pieceSelection.clientContext = { dragInto: intoSelection ?? into };
      if (intoSelection)
        intoSelection.clientContext = { dragFrom: pieceSelection ?? piece };
      return this;
    }
    /**
     * Swap the location of two Pieces. Each of the two pieces can either be the
     * name of a previous `chooseOnBoard`, or a simply provide a piece if it is
     * not a player choice. The game will also allow a mouse drag for the swap.
     *
     * @param piece1 - A {@link Piece} to swap or the name of the piece selection in this action
     * @param piece2 - A {@link Piece} to swap or the name of the piece selection in this action
     *
     * player => action({
     *   prompt: 'Exchange a card from hand with the top of the deck'
     * }).chooseOnBoard(
     *   'card', player.my(Card)
     * ).swap(
     *   'card', $.deck.first(Card)!
     * )
     * @category Behaviour
     */
    swap(piece1, piece2) {
      this.do((args) => {
        const p1 = piece1 instanceof Piece ? piece1 : args[piece1];
        const p2 = piece2 instanceof Piece ? piece2 : args[piece2];
        const parent1 = p1._t.parent;
        const parent2 = p2._t.parent;
        const pos1 = p1.position();
        const pos2 = p2.position();
        const row1 = p1.row;
        const column1 = p1.column;
        const row2 = p2.row;
        const column2 = p2.column;
        p1.putInto(parent2, { position: pos2, row: row2, column: column2 });
        p2.putInto(parent1, { position: pos1, row: row1, column: column1 });
      });
      const piece1Selection = typeof piece1 === "string" ? this.selections.find((s) => s.name === piece1) : void 0;
      const piece2Selection = typeof piece2 === "string" ? this.selections.find((s) => s.name === piece2) : void 0;
      if (piece1Selection && piece1Selection.type !== "board")
        throw Error(`Invalid swap: "${piece1}" must be the name of a previous chooseOnBoard`);
      if (piece2Selection && piece2Selection.type !== "board")
        throw Error(`Invalid swap: "${piece2}" must be the name of a previous chooseOnBoard`);
      if (piece1Selection)
        piece1Selection.clientContext = { dragInto: piece2Selection ?? piece2 };
      return this;
    }
    /**
     * Have the player select one of the Pieces in the collection and select a new
     * position within the collection while keeping everything else in the same
     * order. The game will also permit a mouse drag for the reorder.
     *
     * @param collection - A collection of {@link Piece}s to reorder
     *
     * @param options.prompt - Prompt displayed to the user for this reorder
     * choice.
     *
     * player => action({
     *   prompt: 'Reorder cards in hand'
     * }).reorder(
     *   player.my(Card)
     * )
     * @category Behaviour
     */
    reorder(collection, options) {
      const { prompt } = options || {};
      if (this.selections.some((s) => s.name === "__reorder_from__"))
        throw Error(`Invalid reorder: only one reorder allowed`);
      if (collection.some((c) => c._t.parent !== collection[0]._t.parent))
        throw Error(`Invalid reorder: all elements must belong to the same parent`);
      const pieceSelection = this._addSelection(new Selection("__reorder_from__", { prompt, selectOnBoard: { chooseFrom: collection } }));
      const intoSelection = this._addSelection(new Selection("__reorder_to__", { prompt, selectOnBoard: { chooseFrom: ({ __reorder_from__ }) => collection.filter((e) => e !== __reorder_from__) } }));
      pieceSelection.clientContext = { dragInto: intoSelection };
      intoSelection.clientContext = { dragFrom: pieceSelection };
      this.do((args) => {
        const reorderFrom = args["__reorder_from__"];
        const reorderTo = args["__reorder_to__"];
        let position = reorderTo.position();
        reorderFrom.putInto(reorderFrom._t.parent, { position });
      });
      return this;
    }
    /**
     * Add a placement selection to this action. This will be presented as a piece
     * that players can move into the desired location, snapping to the grid of
     * the destination as the player moves.
     *
     * @param piece - The name of the piece selection in this action from a
     * `chooseOnBoard` prior to this
     * @param into - A {@link GameElement} to move into
     *
     * @param options.prompt - Prompt displayed to the user for this placement
     * choice.
     *
     * @param options.validate - A function that takes an object of key-value
     * pairs for all player choices and returns a boolean. The position selected
     * during the piece placement can be checked by reading the 'column', 'row'
     * and `rotation` properties of the `piece` as provided in the first
     * argument. If false, the game will not allow the player to submit these
     * choices. If a string is returned, this will display as the reason for
     * disallowing these selections.
     *
     * @param options.confirm - A confirmation message that the player will always
     * see before commiting this choice. This can be useful to present additional
     * information about the consequences of this choice, or simply to force the
     * player to hit a button with a clear message. This can be a simple string,
     * or a 2-celled array in the same form as {@link message} with a string
     * message and a set of key-value pairs for string interpolation, optionally
     * being a function that takes an object of key-value pairs for all player
     * choices, and returns the interpolation object.
     *
     * @param options.rotationChoices = An array of valid rotations in
     * degrees. These choices must be normalized to numbers between 0-359°. If
     * supplied the piece will be given rotation handles for the player to set the
     * rotation and position together.
     *
     * player => action({
     *   prompt: 'Place your tile'
     * }).chooseOnBoard(
     *   'tile', player.my(Tile)
     * ).placePiece(
     *   'tile', $.map, {
     *     confirm: ({ tile }) => [
     *       'Place tile into row {{row}} and column {{column}}?',
     *       tile
     *     ]
     * })
     * @category Choices
     */
    placePiece(piece, into, options) {
      const { prompt, confirm, validate } = options || {};
      if (this.selections.some((s) => s.name === "__placement__"))
        throw Error(`Invalid placePiece: only one placePiece allowed`);
      const pieceSelection = this.selections.find((s) => s.name === piece);
      if (!pieceSelection)
        throw `No selection named ${String(piece)} for placePiece`;
      const positionSelection = this._addSelection(new Selection("__placement__", { prompt, confirm, validation: validate, selectPlaceOnBoard: { piece, rotationChoices: options?.rotationChoices } }));
      positionSelection.clientContext = { placement: { piece, into } };
      this.do((args) => {
        const selectedPiece = args[piece];
        if (!(selectedPiece instanceof Piece))
          throw Error(`Cannot place piece selection named ${String(piece)}. Returned ${selectedPiece} instead of a piece`);
        selectedPiece.putInto(into, { column: args["__placement__"][0], row: args["__placement__"][1] });
        selectedPiece.rotation = args["__placement__"][2];
      });
      if (pieceSelection)
        pieceSelection.clientContext = { dragInto: into };
      return this;
    }
  };

  // node_modules/@boardzilla/core/entry/flow/enums.js
  var Do = {
    repeat: (loop) => interrupt({ signal: InterruptControl.repeat, data: typeof loop === "string" ? loop : void 0 }),
    continue: (loop) => interrupt({ signal: InterruptControl.continue, data: typeof loop === "string" ? loop : void 0 }),
    break: (loop) => interrupt({ signal: InterruptControl.break, data: typeof loop === "string" ? loop : void 0 }),
    subflow: (flow, args) => interrupt({ signal: InterruptControl.subflow, data: { name: flow, args } })
  };
  var interruptSignal = [];
  function interrupt({ signal, data }) {
    if (signal === InterruptControl.subflow) {
      if (interruptSignal.every((s) => s.signal === InterruptControl.subflow)) {
        interruptSignal.push({ data, signal });
      }
    } else {
      interruptSignal.splice(0);
      interruptSignal[0] = { data, signal };
    }
  }
  __name(interrupt, "interrupt");
  var InterruptControl;
  (function(InterruptControl2) {
    InterruptControl2["repeat"] = "__REPEAT__";
    InterruptControl2["continue"] = "__CONTINUE__";
    InterruptControl2["break"] = "__BREAK__";
    InterruptControl2["subflow"] = "__SUBFLOW__";
  })(InterruptControl || (InterruptControl = {}));
  var FlowControl;
  (function(FlowControl2) {
    FlowControl2["ok"] = "__OK__";
    FlowControl2["complete"] = "__COMPLETE__";
  })(FlowControl || (FlowControl = {}));

  // node_modules/@boardzilla/core/entry/flow/flow.js
  var Flow = class _Flow {
    static {
      __name(this, "Flow");
    }
    constructor({ name, do: block }) {
      this.type = "main";
      this.name = name;
      this.block = block;
      this.top = this;
    }
    validateNoDuplicate() {
      const name = this.name;
      this.name = void 0;
      if (name && this.getStep(name))
        throw Error(`Duplicate flow name: ${name}`);
      this.name = name;
    }
    flowStepArgs() {
      const args = { ...this.top.args ?? {} };
      let flow = this.top;
      while (flow instanceof _Flow) {
        Object.assign(args, flow.thisStepArgs());
        flow = flow.step;
      }
      return args;
    }
    thisStepArgs() {
      if (this.position && "value" in this.position && this.name) {
        return { [this.name]: this.position.value };
      }
    }
    branchJSON(forPlayer = true) {
      let branch = {
        type: this.type
      };
      if (this.name)
        branch.name = this.name;
      if (this.position !== void 0)
        branch.position = this.toJSON(forPlayer);
      if (this.sequence !== void 0 && this.currentBlock() instanceof Array)
        branch.sequence = this.sequence;
      const thisBranch = branch;
      if (this.step instanceof _Flow)
        return [thisBranch].concat(this.step.branchJSON(forPlayer));
      return [thisBranch];
    }
    setBranchFromJSON(branch) {
      const node = branch[0];
      if (node === void 0)
        throw Error(`Insufficient position elements sent to flow for ${this.name}`);
      if (node.type !== this.type || node.name !== this.name) {
        throw Error(`Flow mismatch. Trying to set ${node.type}:${node.name} on ${this.type}:${this.name}`);
      }
      this.setPositionFromJSON(node.position, node.sequence);
      if (this.step instanceof _Flow) {
        this.step.setBranchFromJSON(branch.slice(1));
      }
    }
    setPosition(position, sequence, reset = true) {
      this.position = position;
      const block = this.currentBlock();
      if (!block) {
        this.step = void 0;
      } else if (block instanceof Array) {
        if (sequence === void 0)
          sequence = 0;
        this.sequence = sequence;
        if (!block[sequence])
          throw Error(`Invalid sequence for ${this.type}:${this.name} ${sequence}/${block.length}`);
        this.step = block[sequence];
      } else {
        this.step = block;
      }
      if (this.step instanceof _Flow) {
        this.step.gameManager = this.gameManager;
        this.step.top = this.top;
        this.step.parent = this;
        if (reset)
          this.step.reset();
      }
    }
    setPositionFromJSON(positionJSON, sequence) {
      this.setPosition(this.fromJSON(positionJSON), sequence, false);
    }
    currentLoop(name) {
      if ("interrupt" in this && (!name || name === this.name))
        return this;
      return this.parent?.currentLoop();
    }
    currentProcessor() {
      if (this.step instanceof _Flow)
        return this.step.currentProcessor();
      if (this.type === "action" || this.type === "parallel")
        return this;
    }
    actionNeeded(player) {
      return this.currentProcessor()?.actionNeeded(player);
    }
    processMove(move) {
      interruptSignal.splice(0);
      const step = this.currentProcessor();
      if (!step)
        throw Error(`Cannot process action currently ${JSON.stringify(this.branchJSON())}`);
      return step.processMove(move);
    }
    getStep(name) {
      if (this.name === name) {
        this.validateNoDuplicate();
        return this;
      }
      const steps = this.allSteps();
      if (!steps)
        return;
      for (const step of steps instanceof Array ? steps : [steps]) {
        if (step instanceof _Flow) {
          const found = step.getStep(name);
          if (found)
            return found;
        }
      }
    }
    /**
     * Advance flow one step and return FlowControl.complete if complete,
     * FlowControl.ok if can continue, Do to interrupt the current loop. Returns
     * ActionStep if now waiting for player input. override for self-contained
     * flows that do not have subflows.
     */
    playOneStep() {
      const step = this.step;
      let result = FlowControl.complete;
      if (step instanceof Function) {
        if (!interruptSignal[0])
          step(this.flowStepArgs());
        result = FlowControl.complete;
        if (interruptSignal[0] && interruptSignal[0].signal !== InterruptControl.subflow)
          result = interruptSignal.splice(0);
      } else if (step instanceof _Flow) {
        result = step.playOneStep();
      }
      if (result === FlowControl.ok || result instanceof _Flow)
        return result;
      if (result !== FlowControl.complete) {
        if ("interrupt" in this && typeof this.interrupt === "function" && (!result[0].data || result[0].data === this.name))
          return this.interrupt(result[0].signal);
        return result;
      }
      const block = this.currentBlock();
      if (block instanceof Array) {
        if ((this.sequence ?? 0) + 1 !== block.length) {
          this.setPosition(this.position, (this.sequence ?? 0) + 1);
          return FlowControl.ok;
        }
      }
      return this.advance();
    }
    // play until action required (returns ActionStep) or flow complete (undefined) or subflow started {name, args}
    play() {
      interruptSignal.splice(0);
      let step;
      do {
        if (this.gameManager.phase !== "finished")
          step = this.playOneStep();
        if (!(step instanceof _Flow))
          console.debug(`Advancing flow:
 ${this.stacktrace()}`);
      } while (step === FlowControl.ok && interruptSignal[0]?.signal !== InterruptControl.subflow && this.gameManager.phase !== "finished");
      if (interruptSignal[0]?.signal === InterruptControl.subflow)
        return interruptSignal.map((s) => s.data);
      if (step instanceof _Flow)
        return step;
      if (step instanceof Array) {
        if (step[0].signal === InterruptControl.continue)
          throw Error("Cannot use Do.continue when not in a loop");
        if (step[0].signal === InterruptControl.repeat)
          throw Error("Cannot use Do.repeat when not in a loop");
        throw Error("Cannot use Do.break when not in a loop");
      }
    }
    // must override. reset runs any logic needed and call setPosition. Must not modify own state.
    reset() {
      this.setPosition(void 0);
    }
    // must override. must rely solely on this.position
    currentBlock() {
      return this.block;
    }
    // override if position contains objects that need serialization
    toJSON(_forPlayer = true) {
      return this.position;
    }
    // override if position contains objects that need deserialization
    fromJSON(json) {
      return json;
    }
    // override for steps that advance through their subflows. call setPosition if needed. return ok/complete
    advance() {
      return FlowControl.complete;
    }
    // override return all subflows
    allSteps() {
      return this.block;
    }
    toString() {
      return `flow${this.name ? ":" + this.name.replace(/__/g, "") : ""}${this.block instanceof Array && this.block.length > 1 ? " (item #" + this.sequence + ")" : ""}`;
    }
    stacktrace(indent = 0) {
      let string = this.toString();
      if (this.step instanceof _Flow)
        string += "\n " + " ".repeat(indent) + "\u21B3 " + this.step.stacktrace(indent + 2);
      return string;
    }
    visualize(top) {
      return this.visualizeBlocks({
        type: "flow",
        top,
        blocks: {
          do: this.block ? this.block instanceof Array ? this.block : [this.block] : void 0
        },
        block: "do"
      });
    }
    visualizeBlocks({ type, blocks, name, top, block, position }) {
      const blockViz = Object.fromEntries(Object.entries(blocks).map(([key, block2]) => [
        key,
        block2?.map((s) => {
          if (s instanceof _Flow)
            return s.visualize(top);
          if (s === Do.break)
            return "Do.break";
          if (s === Do.repeat)
            return "Do.repeat";
          if (s === Do.continue)
            return "Do.continue";
          return s.toString();
        })
      ]));
      return {
        type,
        name: name === void 0 ? this.name : name,
        blocks: blockViz,
        current: {
          block,
          position,
          sequence: this.sequence
        }
      };
    }
  };

  // node_modules/@boardzilla/core/entry/player/collection.js
  var PlayerCollection = class extends Array {
    static {
      __name(this, "PlayerCollection");
    }
    constructor() {
      super(...arguments);
      this.currentPosition = [];
    }
    addPlayer(attrs) {
      const player = new this.className(attrs);
      Object.assign(player, attrs, { _players: this });
      this.push(player);
      if (this.game) {
        player.game = this.game;
      }
    }
    /**
     * Returns the player at a given table position.
     */
    atPosition(position) {
      return this.find((p) => p.position === position);
    }
    /**
     * Returns the player that may currently act. It is an error to call current
     * when multiple players can act
     */
    current() {
      if (this.currentPosition.length > 1)
        throw Error(`Using players.current when ${this.currentPosition.length} players may act`);
      return this.atPosition(this.currentPosition[0] ?? -1);
    }
    /**
     * Returns the array of all players that may currently act.
     */
    allCurrent() {
      return this.currentPosition.map((p) => this.atPosition(p));
    }
    /**
     * Returns the host player
     */
    host() {
      return this.find((p) => p.host);
    }
    /**
     * Returns the array of players that may not currently act.
     */
    notCurrent() {
      return this.filter((p) => !this.currentPosition.includes(p.position));
    }
    /**
     * Returns the array of players in the order of table positions. Does not
     * alter the actual player order.
     */
    inPositionOrder() {
      return this.sort((p1, p2) => p1.position > p2.position ? 1 : -1);
    }
    /**
     * Set the current player(s).
     *
     * @param players - The {@link Player} or table position of the player to act,
     * or an array of either.
     */
    setCurrent(players) {
      if (!(players instanceof Array))
        players = [players];
      players = players.map((p) => typeof p === "number" ? p : p.position);
      this.currentPosition = players;
    }
    /**
     * Advance the current player to act to the next player based on player order.
     */
    next() {
      if (this.currentPosition.length === 0) {
        this.currentPosition = [this[0].position];
      } else if (this.currentPosition.length === 1) {
        this.currentPosition = [this.after(this.currentPosition[0]).position];
      }
      return this.current();
    }
    /**
     * Return the next player to act based on player order.
     */
    after(player) {
      return this[(this.turnOrderOf(player) + 1) % this.length];
    }
    /**
     * Return the player next to this player at the table.
     * @param steps - 1 = one step to the left, -1 = one step to the right, etc
     */
    seatedNext(player, steps = 1) {
      return this.atPosition((player.position + steps - 1) % this.length + 1);
    }
    /**
     * Returns the turn order of the given player, starting with 0. This is
     * distinct from {@link Player#position}. Turn order can be altered during a
     * game, whereas table position cannot.
     */
    turnOrderOf(player) {
      if (typeof player !== "number")
        player = player.position;
      const index = this.findIndex((p) => p.position === player);
      if (index === -1)
        throw Error("No such player");
      return index;
    }
    /**
     * Sorts the players by some means, changing the turn order.
     * @param key - A key of function for sorting, or a list of such. See {@link
     * Sorter}
     * @param direction - `"asc"` to cause players to be sorted from lowest to
     * highest, `"desc"` for highest to lower
     */
    sortBy(key, direction) {
      const rank = /* @__PURE__ */ __name((p, k) => typeof k === "function" ? k(p) : p[k], "rank");
      const [up, down] = direction === "desc" ? [-1, 1] : [1, -1];
      return this.sort((a, b) => {
        const keys = key instanceof Array ? key : [key];
        for (const k of keys) {
          const r1 = rank(a, k);
          const r2 = rank(b, k);
          if (r1 > r2)
            return up;
          if (r1 < r2)
            return down;
        }
        return 0;
      });
    }
    /**
     * Returns a copy of this collection sorted by some {@link Sorter}.
     */
    sortedBy(key, direction = "asc") {
      return this.slice(0, this.length).sortBy(key, direction);
    }
    sum(key) {
      return this.reduce((sum, n2) => sum + (typeof key === "function" ? key(n2) : n2[key]), 0);
    }
    withHighest(...attributes) {
      return this.sortedBy(attributes, "desc")[0];
    }
    withLowest(...attributes) {
      return this.sortedBy(attributes, "asc")[0];
    }
    shuffle() {
      shuffleArray(this, this.game?.random || Math.random);
    }
    max(key) {
      return this.sortedBy(key, "desc")[0][key];
    }
    min(key) {
      return this.sortedBy(key, "asc")[0][key];
    }
    fromJSON(players) {
      this.splice(0);
      for (const p of players) {
        this.addPlayer({ position: p.position });
      }
    }
    assignAttributesFromJSON(players) {
      for (let p = 0; p !== players.length; p++) {
        Object.assign(this[p], deserializeObject(players[p], this.game));
      }
    }
  };

  // node_modules/@boardzilla/core/entry/flow/action-step.js
  var ActionStep = class extends Flow {
    static {
      __name(this, "ActionStep");
    }
    constructor({ name, player, players, actions, prompt, description, optional, condition, continueIfImpossible, repeatUntil, skipIf }) {
      super({ name });
      this.type = "action";
      this.actions = actions.map((a) => typeof a === "string" ? { name: a } : a);
      this.prompt = prompt;
      if (repeatUntil) {
        this.repeatUntil = true;
        this.actions.push({ name: "__pass__", prompt: typeof repeatUntil === "function" ? repeatUntil(this.flowStepArgs()) : repeatUntil });
      } else if (optional) {
        this.actions.push({ name: "__pass__", prompt: typeof optional === "function" ? optional(this.flowStepArgs()) : optional });
      }
      this.description = description;
      this.condition = condition;
      this.continueIfImpossible = continueIfImpossible ?? false;
      this.skipIf = skipIf ?? "always";
      this.players = players ?? player;
    }
    reset() {
      this.setPosition(void 0);
    }
    thisStepArgs() {
      if (this.position?.name && this.position?.args) {
        return { [this.position.name]: this.position.args };
      }
    }
    setPosition(position, sequence) {
      super.setPosition(position, sequence);
      if (this.awaitingAction()) {
        const players = this.getPlayers();
        if (players)
          this.gameManager.players.setCurrent(players);
      }
    }
    getPlayers() {
      if (this.players) {
        const players = typeof this.players === "function" ? this.players(this.flowStepArgs()) : this.players;
        return (players instanceof Array ? players : [players]).map((p) => p.position);
      }
    }
    awaitingAction() {
      return !this.position && (!this.condition || this.condition(this.flowStepArgs()));
    }
    currentBlock() {
      if (this.position) {
        const actionName = this.position.name;
        const step = this.actions.find((a) => a.name === actionName)?.do;
        if (step)
          return step;
      }
    }
    // current actions that can process. does not check player
    allowedActions() {
      return this.position ? [] : this.actions.map((a) => a.name);
    }
    actionNeeded(player) {
      if (!this.position) {
        if (!player || player.isCurrent()) {
          return {
            prompt: typeof this.prompt === "function" ? this.prompt(this.flowStepArgs()) : this.prompt,
            description: this.description,
            step: this.name,
            actions: this.actions.map((action) => ({
              name: action.name,
              prompt: typeof action.prompt === "function" ? action.prompt(this.flowStepArgs()) : action.prompt,
              args: typeof action.args === "function" ? action.args(this.flowStepArgs()) : action.args
            })),
            continueIfImpossible: this.continueIfImpossible,
            skipIf: this.skipIf
          };
        }
      }
    }
    // returns error (string) or subflow {args, name} or ok (undefined)
    processMove(move) {
      if ((move.name !== "__continue__" || !this.continueIfImpossible) && !this.allowedActions().includes(move.name)) {
        throw Error(`No action ${move.name} available at this point. Waiting for ${this.allowedActions().join(", ")}`);
      }
      const gameManager = this.gameManager;
      if (!gameManager.players.currentPosition.includes(move.player)) {
        throw Error(`Move ${move.name} from player #${move.player} not allowed. Current players: #${gameManager.players.currentPosition.join("; ")}`);
      }
      const player = gameManager.players.atPosition(move.player);
      if (!player)
        return `No such player position: ${move.player}`;
      if (move.name === "__pass__" || move.name === "__continue__") {
        this.setPosition(move);
        return;
      }
      const gameAction = gameManager.getAction(move.name, player);
      const error = gameAction._process(player, move.args);
      if (error) {
        return error;
      } else {
        this.setPosition(this.position ? { ...this.position } : move);
        if (interruptSignal[0]) {
          const interrupt2 = interruptSignal.splice(0);
          if (interrupt2[0].signal === InterruptControl.subflow)
            return interrupt2.map((s) => s.data);
          const loop = this.currentLoop(interrupt2[0].data);
          if (!loop) {
            if (interrupt2[0].data)
              throw Error(`No loop found "${interrupt2[0].data}" for interrupt`);
            if (interrupt2[0].signal === InterruptControl.continue)
              throw Error("Cannot use Do.continue when not in a loop");
            if (interrupt2[0].signal === InterruptControl.repeat)
              throw Error("Cannot use Do.repeat when not in a loop");
            throw Error("Cannot use Do.break when not in a loop");
          } else {
            loop.interrupt(interrupt2[0].signal);
            return;
          }
        }
      }
    }
    playOneStep() {
      return this.awaitingAction() ? this : super.playOneStep();
    }
    advance() {
      if (!this.repeatUntil || this.position?.name === "__pass__")
        return FlowControl.complete;
      this.reset();
      return FlowControl.ok;
    }
    toJSON(forPlayer = true) {
      if (this.position) {
        const json = {
          player: this.position.player,
          name: this.position.name,
          args: serializeObject(this.position.args, forPlayer)
        };
        return json;
      }
      return void 0;
    }
    fromJSON(position) {
      if (!position)
        return void 0;
      return !("player" in position) ? position : {
        ...position,
        args: deserializeObject(position.args ?? {}, this.gameManager.game)
      };
    }
    allSteps() {
      return this.actions.map((a) => a.do).reduce((a, f) => f ? a.concat(f) : a, []);
    }
    toString() {
      return `player-action${this.name ? ":" + this.name : ""} (player #${this.top.gameManager.players.currentPosition}: ${this.allowedActions().join(", ")}${this.block instanceof Array ? " item #" + this.sequence : ""})`;
    }
    visualize(top) {
      const args = this.position && "{" + Object.entries(this.position.args).map(([k, v]) => `${k}: ${v}`).join(", ") + "}";
      return this.visualizeBlocks({
        type: "playerActions",
        name: this.position?.name ?? "",
        top,
        blocks: Object.fromEntries(this.actions.filter((a) => a.name !== "__pass__").map((a) => [a.name, a.do ? a.do instanceof Array ? a.do : [a.do] : void 0])),
        block: this.position?.name,
        position: args ?? top.gameManager.players.allCurrent().map((p) => p.name).join(", ")
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/while-loop.js
  var WhileLoop = class extends Flow {
    static {
      __name(this, "WhileLoop");
    }
    constructor({ do: block, while: whileCondition }) {
      super({ do: block });
      this.type = "loop";
      this.whileCondition = () => whileCondition(this.flowStepArgs());
    }
    reset() {
      const position = { index: 0 };
      if (this.initial !== void 0)
        position.value = this.initial instanceof Function ? this.initial(this.flowStepArgs()) : this.initial;
      if (!this.whileCondition(position)) {
        this.setPosition({ ...position, index: -1 });
      } else {
        this.setPosition(position);
      }
    }
    currentBlock() {
      if (this.position.index !== -1)
        return this.block;
    }
    advance() {
      if (this.position.index > 1e4)
        throw Error(`Endless loop detected: ${this.name}`);
      if (this.position.index === -1) {
        return this.exit();
      }
      const position = { ...this.position, index: this.position.index + 1 };
      if (this.next && this.position.value !== void 0)
        position.value = this.next(this.position.value);
      if (!this.whileCondition(position))
        return this.exit();
      this.setPosition(position);
      return FlowControl.ok;
    }
    repeat() {
      if (!this.whileCondition(this.position))
        return this.exit();
      this.setPosition(this.position);
      return FlowControl.ok;
    }
    exit() {
      this.setPosition({ ...this.position, index: -1 });
      return FlowControl.complete;
    }
    interrupt(signal) {
      if (signal === InterruptControl.continue)
        return this.advance();
      if (signal === InterruptControl.repeat)
        return this.repeat();
      if (signal === InterruptControl.break)
        return this.exit();
    }
    allSteps() {
      return this.block;
    }
    toString() {
      return `loop${this.name ? ":" + this.name : ""} (loop ${this.position.index === -1 ? "complete" : "#" + this.position.index}${this.block instanceof Array ? ", item #" + this.sequence : ""})`;
    }
    visualize(top) {
      const isLoop = this.whileCondition.toString() === "() => true";
      return this.visualizeBlocks({
        type: isLoop ? "loop" : "whileLoop",
        top,
        blocks: {
          do: this.block instanceof Array ? this.block : [this.block]
        },
        block: "do",
        position: this.position ? this.position.index + 1 : void 0
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/for-loop.js
  var ForLoop = class extends WhileLoop {
    static {
      __name(this, "ForLoop");
    }
    constructor({ name, initial, next, do: block, while: whileCondition }) {
      super({ do: block, while: () => true });
      this.type = "loop";
      this.name = name;
      this.initial = initial;
      this.next = next;
      this.whileCondition = (position) => whileCondition(position.value);
    }
    currentBlock() {
      if (this.position.index !== -1)
        return this.block;
    }
    toString() {
      return `loop${this.name ? ":" + this.name : ""} (index: ${this.position.index}, value: ${this.position.value}${this.block instanceof Array ? ", item #" + this.sequence : ""})$`;
    }
    visualize(top) {
      return this.visualizeBlocks({
        type: "forLoop",
        top,
        blocks: {
          do: this.block instanceof Array ? this.block : [this.block]
        },
        block: "do",
        position: this.position?.value
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/for-each.js
  var ForEach = class extends ForLoop {
    static {
      __name(this, "ForEach");
    }
    constructor({ name, collection, do: block }) {
      super({
        name,
        initial: () => (typeof collection === "function" ? collection(this.flowStepArgs()) : collection)[0],
        next: () => this.position.collection[this.position.index + 1],
        while: () => true,
        do: block
      });
      this.type = "foreach";
      this.collection = collection;
      this.whileCondition = (position) => position.index >= 0 && position.index < position.collection.length;
    }
    reset() {
      const collection = typeof this.collection === "function" ? this.collection(this.flowStepArgs()) : this.collection;
      this.setPosition({ index: collection.length ? 0 : -1, value: collection[0], collection });
    }
    toJSON(forPlayer = true) {
      return {
        index: this.position.index,
        value: serialize(this.position.value, forPlayer),
        collection: serialize(this.position.collection, forPlayer)
      };
    }
    fromJSON(position) {
      return {
        index: position.index,
        value: deserialize(position.value, this.gameManager.game),
        collection: deserialize(position.collection, this.gameManager.game)
      };
    }
    toString() {
      return `foreach${this.name ? ":" + this.name : ""} (index: ${this.position.index}, value: ${this.position.value}${this.block instanceof Array ? ", item #" + this.sequence : ""})`;
    }
    visualize(top) {
      return this.visualizeBlocks({
        type: "forEach",
        top,
        blocks: {
          do: this.block instanceof Array ? this.block : [this.block]
        },
        block: "do",
        position: this.position?.value
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/each-player.js
  var EachPlayer = class extends ForLoop {
    static {
      __name(this, "EachPlayer");
    }
    constructor({ name, startingPlayer, nextPlayer, turns, continueUntil, do: block }) {
      let initial;
      if (startingPlayer) {
        initial = /* @__PURE__ */ __name(() => startingPlayer instanceof Function ? startingPlayer(this.flowStepArgs()) : startingPlayer, "initial");
      } else {
        initial = /* @__PURE__ */ __name(() => this.gameManager.players[0], "initial");
      }
      let next = /* @__PURE__ */ __name((player) => nextPlayer ? nextPlayer(player) : this.gameManager.players.after(player), "next");
      super({
        name,
        initial,
        next,
        while: () => true,
        do: block
      });
      this.whileCondition = (position) => continueUntil !== void 0 ? !continueUntil(position.value) : position.index < this.gameManager.players.length * (this.turns || 1);
      this.turns = turns;
    }
    setPosition(position, sequence, reset = true) {
      if (position.value && position.value.position !== this.position?.value.position) {
        this.gameManager.players.setCurrent(position.value);
      }
      super.setPosition(position, sequence, reset);
    }
    toJSON() {
      return {
        index: this.position.index,
        value: this.position.value ? serializeSingleArg(this.position.value) : void 0
      };
    }
    fromJSON(position) {
      return {
        index: position.index,
        value: position.value ? deserializeSingleArg(position.value, this.gameManager.game) : void 0
      };
    }
    allSteps() {
      return this.block;
    }
    toString() {
      return `each-player${this.name ? ":" + this.name : ""} (player #${this.position?.value?.position}${this.block instanceof Array ? ", item #" + this.sequence : ""})`;
    }
    visualize(top) {
      return this.visualizeBlocks({
        type: "eachPlayer",
        top,
        blocks: {
          do: this.block instanceof Array ? this.block : [this.block]
        },
        block: "do",
        position: this.position?.value
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/switch-case.js
  var SwitchCase = class extends Flow {
    static {
      __name(this, "SwitchCase");
    }
    constructor({ name, switch: switchExpr, cases, default: def }) {
      super({ name });
      this.type = "switch-case";
      this.switch = switchExpr;
      this.cases = cases;
      this.default = def;
    }
    reset() {
      const test = typeof this.switch === "function" ? this.switch(this.flowStepArgs()) : this.switch;
      let position = { index: -1, value: test };
      for (let c = 0; c != this.cases.length; c += 1) {
        const ca = this.cases[c];
        if ("test" in ca && ca.test(test) || "eq" in ca && ca.eq === test) {
          position.index = c;
          break;
        }
      }
      if (position.index === -1 && this.default)
        position.default = true;
      this.setPosition(position);
    }
    currentBlock() {
      if (this.position.default)
        return this.default;
      if (this.position.index !== void 0 && this.position.index >= 0) {
        return this.cases[this.position.index].do;
      }
    }
    toJSON(forPlayer = true) {
      return {
        index: this.position.index,
        value: serialize(this.position.value, forPlayer),
        default: !!this.position.default
      };
    }
    fromJSON(position) {
      return {
        index: position.index,
        value: deserialize(position.value, this.gameManager.game),
        default: position.default
      };
    }
    allSteps() {
      const cases = this.cases.reduce((a, f) => a.concat(f.do ? f.do instanceof Array ? f.do : [f.do] : []), []);
      const defaultExpr = this.default ? this.default instanceof Array ? this.default : [this.default] : [];
      return cases.concat(defaultExpr);
    }
    toString() {
      return `switch-case${this.name ? ":" + this.name : ""} (${this.position.value}${this.block instanceof Array ? ", item #" + this.sequence : ""})`;
    }
    visualize(top) {
      let block = void 0;
      if (this.position.default) {
        block = "default";
      } else if (this.position.index !== void 0 && this.position.index >= 0) {
        const c = this.cases[this.position.index];
        block = String("eq" in c ? c.eq : c.test);
      }
      return this.visualizeBlocks({
        type: "switchCase",
        top,
        blocks: Object.fromEntries(this.cases.map((c) => [String("eq" in c ? c.eq : c.test), c.do instanceof Array ? c.do : [c.do]]).concat([
          this.default ? ["default", this.default instanceof Array ? this.default : [this.default]] : []
        ])),
        block,
        position: this.position?.value
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/if-else.js
  var If = class extends SwitchCase {
    static {
      __name(this, "If");
    }
    constructor({ name, if: test, do: doExpr, else: elseExpr }) {
      super({ name, switch: test, cases: [{ eq: true, do: doExpr }], default: elseExpr });
    }
    toString() {
      return `if-else${this.name ? ":" + this.name : ""} (${!!this.position.value}${this.block instanceof Array ? ", item #" + this.sequence : ""})`;
    }
    visualize(top) {
      const blocks = {
        do: this.cases[0].do instanceof Array ? this.cases[0].do : [this.cases[0].do]
      };
      if (this.default)
        blocks.else = this.default instanceof Array ? this.default : [this.default];
      return this.visualizeBlocks({
        type: "ifElse",
        top,
        blocks,
        block: this.position ? this.position.default ? "else" : "do" : void 0,
        position: this.position?.value
      });
    }
  };

  // node_modules/@boardzilla/core/entry/flow/every-player.js
  var EveryPlayer = class extends Flow {
    static {
      __name(this, "EveryPlayer");
    }
    constructor({ players, do: block, name }) {
      super({ do: block, name });
      this.completed = [];
      this.type = "parallel";
      this.players = players;
    }
    reset() {
      this.value = -1;
      this.completed = [];
      this.setPosition({ positions: [], sequences: [], completed: [] });
    }
    thisStepArgs() {
      if (this.name) {
        const currentPlayer = this.getPlayers()[this.value];
        if (currentPlayer)
          return { [this.name]: currentPlayer };
      }
    }
    // closure wrapper for super's methods that will setPosition temporarily to a
    // specific player and pretend to be a normal flow with just one subflow
    withPlayer(value, fn, mutate = false) {
      this.value = value;
      this.sequence = this.position.sequences[this.value];
      this.setPosition(this.position, this.sequence);
      const result = fn();
      if (mutate) {
        const currentPlayer = this.getPlayers()[this.value];
        this.position.sequences[this.value] = this.sequence;
        if (currentPlayer && this.step instanceof Flow)
          this.position.positions[this.value] = this.step.branchJSON();
      }
      this.value = -1;
      this.setPosition(this.position);
      return result;
    }
    getPlayers() {
      return this.players || this.gameManager.players;
    }
    // reimpl ourselves to collect json from all players
    branchJSON(forPlayer = true) {
      if (this.position === void 0 && this.sequence === void 0)
        return [];
      let branch = {
        type: this.type,
        position: { positions: [], sequences: this.position.sequences, completed: this.completed }
      };
      if (this.name)
        branch.name = this.name;
      for (let i = 0; i !== this.getPlayers().length; i++) {
        this.withPlayer(i, () => {
          if (this.step instanceof Flow)
            branch.position.positions[i] = this.step.branchJSON(forPlayer);
        });
      }
      return [branch];
    }
    // add player management, hydration of flow for the correct player, sequences[] management
    setPosition(positionJSON, sequence) {
      const player = this.getPlayers()[this.value];
      this.completed = positionJSON.completed;
      if (player) {
        player.setCurrent();
        positionJSON.sequences[this.value] = sequence;
      } else {
        const players = [];
        for (let i = 0; i !== this.getPlayers().length; i++) {
          if (this.completed[i] === false)
            players.push(this.getPlayers()[i]);
        }
        this.gameManager.players.setCurrent(players);
      }
      super.setPosition(positionJSON, positionJSON.sequences[this.value]);
      if (this.step instanceof Flow && this.position.positions[this.value]) {
        this.step.setBranchFromJSON(this.position.positions[this.value]);
      }
    }
    currentBlock() {
      return this.value >= 0 && this.value < this.getPlayers().length ? this.block : void 0;
    }
    actionNeeded(player) {
      if (player && this.getPlayers().includes(player)) {
        return this.withPlayer(this.getPlayers().indexOf(player), () => super.actionNeeded(player));
      }
    }
    processMove(move) {
      const player = this.getPlayers().findIndex((p) => p.position === move.player);
      if (player < 0)
        throw Error(`Cannot process action from ${move.player}`);
      return this.withPlayer(player, () => {
        this.completed[player] = void 0;
        return super.processMove(move);
      }, true);
    }
    // intercept super.playOneStep so a single branch doesn't signal complete
    // without us checking all branches
    playOneStep() {
      const player = this.getPlayers().findIndex((_, p) => this.completed[p] === void 0);
      if (player !== -1) {
        return this.withPlayer(player, () => {
          let result = super.playOneStep();
          if (result instanceof Flow || result === FlowControl.complete)
            this.completed[player] = result === FlowControl.complete;
          return FlowControl.ok;
        }, true);
      }
      return this.completed.every((r) => r) ? FlowControl.complete : this;
    }
    toString() {
      return `every-player${this.name ? ":" + this.name : ""}`;
    }
    visualize(top) {
      return this.visualizeBlocks({
        type: "everyPlayer",
        top,
        blocks: {
          do: this.block instanceof Array ? this.block : [this.block]
        },
        block: "do"
      });
    }
  };

  // node_modules/@boardzilla/core/entry/board/game.js
  var Game = class _Game extends space_default {
    static {
      __name(this, "Game");
    }
    constructor(ctx) {
      super({ ...ctx, trackMovement: false });
      this.players = new PlayerCollection();
      this.flowGuard = (name) => {
        if (this._ctx.gameManager.phase !== "new") {
          throw Error(`Cannot use "${name}" once game has started. It is likely that this function is in the wrong place and must be called directly in defineFlow as a FlowDefinition`);
        }
        return true;
      };
      this.flowCommands = {
        playerActions: (options) => this.flowGuard("playerActions") && new ActionStep(options),
        loop: (...block) => this.flowGuard("loop") && new WhileLoop({ do: block, while: () => true }),
        whileLoop: (options) => this.flowGuard("whileloop") && new WhileLoop(options),
        forEach: (options) => this.flowGuard("forEach") && new ForEach(options),
        forLoop: (options) => this.flowGuard("forloop") && new ForLoop(options),
        eachPlayer: (options) => this.flowGuard("eachPlayer") && new EachPlayer(options),
        everyPlayer: (options) => this.flowGuard("everyplayer") && new EveryPlayer(options),
        ifElse: (options) => this.flowGuard("ifelse") && new If(options),
        switchCase: (options) => this.flowGuard("switchCase") && new SwitchCase(options)
      };
      this._ui = {
        layouts: [],
        appearance: {},
        stepLayouts: {},
        announcements: {},
        infoModals: [],
        getBaseLayout: () => ({
          alignment: "center",
          direction: "square"
        })
      };
      this.game = this;
      this.random = ctx.gameManager?.random || Math.random;
      if (ctx.gameManager)
        this.players = ctx.gameManager.players;
      this._ctx.removed = this.createElement(space_default, "removed"), this.pile = this._ctx.removed;
    }
    // no longer needed - remove in next minor release
    registerClasses(...classList) {
      this._ctx.classRegistry = this._ctx.classRegistry.concat(classList);
    }
    /**
     * Define your game's main flow. May contain any of the following:
     * - {@link playerActions}
     * - {@link loop}
     * - {@link whileLoop}
     * - {@link forEach}
     * - {@link forLoop}
     * - {@link eachPlayer}
     * - {@link everyPlayer}
     * - {@link ifElse}
     * - {@link switchCase}
     * @category Definition
     */
    defineFlow(...flow) {
      this.defineSubflow("__main__", ...flow);
    }
    /**
     * Define an addtional flow that the main flow can enter. A subflow has a
     * unique name and can be entered at any point by calling {@link
     * Do|Do.subflow}.
     *
     * @param name - Unique name of flow
     * @param flow - Steps of the flow
     */
    defineSubflow(name, ...flow) {
      if (this._ctx.gameManager.phase !== "new")
        throw Error("cannot call defineFlow once started");
      this._ctx.gameManager.flows[name] = new Flow({ name, do: flow });
      this._ctx.gameManager.flows[name].gameManager = this._ctx.gameManager;
    }
    /**
     * Define your game's actions.
     * @param actions - An object consisting of actions where the key is the name
     * of the action and value is a function that accepts a player taking the
     * action and returns the result of calling {@link action} and chaining
     * choices, results and messages onto the result
     * @category Definition
     */
    defineActions(actions) {
      if (this._ctx.gameManager.phase !== "new")
        throw Error("cannot call defineActions once started");
      this._ctx.gameManager.actions = actions;
    }
    /**
     * Retrieve the selected setting value for a setting defined in {@link
     * render}.
     * @category Definition
     */
    setting(key) {
      return this._ctx.gameManager.settings[key];
    }
    /**
     * Create an {@link Action}. An action is a single move that a player can
     * take. Some actions require choices, sometimes several, before they can be
     * executed. Some don't have any choices, like if a player can simply
     * 'pass'. What defines where one action ends and another begins is how much
     * you as a player can decide before you "commit". For example, in chess you
     * select a piece to move and then a place to put it. These are a single move,
     * not separate. (Unless playing touch-move, which is rarely done in digital
     * chess.) In hearts, you pass 3 cards to another players. These are a single
     * move, not 3. You can change your mind as you select the cards, rather than
     * have to commit to each one. Similarly, other players do not see any
     * information about your choices until you actually commit the entire move.
     *
     * This function is called for each action in the game `actions` you define in
     * {@link defineActions}. These actions are initially declared with an optional
     * prompt and condition. Further information is added to the action by chaining
     * methods that add choices and behaviour. See {@link Action}.
     *
     * If this action accepts prior arguments besides the ones chosen by the
     * player during the execution of this action (especially common for {@link
     * followUp} actions) then a generic can be added for these arguments to help
     * Typescript type these parameters, e.g.:
     * `player => action<{ cards: number}>(...)`
     *
     * @param definition.prompt - The prompt that will appear for the player to
     * explain what the action does. Further prompts can be defined for each choice
     * they subsequently make to complete the action.
     *
     * @param definition.condition - A boolean or a function returning a boolean
     * that determines whether the action is currently allowed. Note that the
     * choices you define for your action will further determine if the action is
     * allowed. E.g. if you have a play card action and you add a choice for cards
     * in your hand, Boardzilla will automatically disallow this action if there
     * are no cards in your hand based on the face that there are no valid choices
     * to complete the action. You do not need to specify a `condition` for these
     * types of limitations. If using the function form, the function will receive
     * an object with any arguments passed to this action, e.g. from {@link
     * followUp}.
     *
     * @example
     * action({
     *   prompt: 'Flip one of your cards'
     * }).chooseOnBoard({
     *   choices: game.all(Card, {mine: true})
     * }).do(
     *   card => card.hideFromAll()
     * )
     *
     * @category Definition
     */
    action(definition = {}) {
      return new Action(definition);
    }
    /**
     * Queue up a follow-up action while processing an action. If called during
     * the processing of a game action, the follow-up action given will be added
     * as a new action immediately following the current one, before the game's
     * flow can resume normally. This is common for card games where the play of a
     * certain card may require more actions be taken.
     *
     * @param {Object} action - The action added to the follow-up queue.
     *
     * @example
     * defineAction({
     *   ...
     *   playCard: player => action()
     *     .chooseOnBoard('card', cards)
     *     .do(
     *       ({ card }) => {
     *         if (card.damage) {
     *           // this card allows another action to do damage to another Card
     *           game.followUp({
     *             name: 'doDamage',
     *             args: { amount: card.damage }
     *           });
     *         }
     *       }
     *     )
     * @category Game Management
     */
    followUp(action) {
      Do.subflow("__followup__", action);
    }
    /**
     * End the game
     *
     * @param winner - a player or players that are the winners of the game. In a
     * solo game if no winner is provided, this is considered a loss.
     * @param announcement - an optional announcement from {@link render} to
     * replace the standard boardzilla announcement.
     * @category Game Management
     */
    finish(winner, announcement) {
      this._ctx.gameManager.phase = "finished";
      if (winner)
        this._ctx.gameManager.winner = winner instanceof Array ? winner : [winner];
      this._ctx.gameManager.announcements.push(announcement ?? "__finish__");
    }
    /**
     * Return array of game winners, or undefined if game is not yet finished
     * @category Game Management
     */
    getWinners() {
      let winner = this._ctx.gameManager.winner;
      if (!(winner instanceof Array))
        winner = [winner];
      return this._ctx.gameManager.phase === "finished" ? winner : void 0;
    }
    /**
     * Add a delay in the animation of the state change at this point for player
     * as they receive game updates.
     * @category Game Management
     */
    addDelay() {
      this.resetMovementTracking();
      if (this.game._ctx.trackMovement) {
        this._ctx.gameManager.sequence += 1;
      } else if (this._ctx.gameManager.intermediateUpdates.length) {
        return;
      }
      this._ctx.gameManager.intermediateUpdates.push(this.players.map(
        (p) => this._ctx.gameManager.getState(p)
        // TODO unnecessary for all players if in context of player
      ));
    }
    /**
     * Add a message that will be broadcast in the chat at the next game update,
     * based on the current state of the game.
     *
     * @param text - The text of the message to send. This can contain interpolated strings
     * with double braces, i.e. {{player}} that are defined in args. Of course,
     * strings can be interpolated normally using template literals. However game
     * objects (e.g. players or pieces) passed in as args will be displayed
     * specially by Boardzilla.
     *
     * @param args - An object of key-value pairs of strings for interpolation in
     * the message.
     *
     * @example
     * game.message(
     *   '{{player}} has a score of {{score}}',
     *   { player, score: player.score() }
     * );
     *
     * @category Game Management
     */
    message(text, args) {
      this._ctx.gameManager.messages.push({ body: n(text, args, true) });
    }
    /**
     * Add a message that will be broadcast to the given player(s) in the chat at
     * the next game update, based on the current state of the game.
     *
     * @param player - Player or players to receive the message
     *
     * @param text - The text of the message to send. This can contain interpolated strings
     * with double braces, i.e. {{player}} that are defined in args. Of course,
     * strings can be interpolated normally using template literals. However game
     * objects (e.g. players or pieces) passed in as args will be displayed
     * specially by Boardzilla.
     *
     * @param args - An object of key-value pairs of strings for interpolation in
     * the message.
     *
     * @example
     * game.message(
     *   '{{player}} has a score of {{score}}',
     *   { player, score: player.score() }
     * );
     *
     * @category Game Management
     */
    messageTo(player, text, args) {
      if (!(player instanceof Array))
        player = [player];
      for (const p of player) {
        this._ctx.gameManager.messages.push({
          body: n(text, args, true),
          position: typeof p === "number" ? p : p.position
        });
      }
    }
    /**
     * Broadcast a message to all players that interrupts the game and requires
     * dismissal before actions can be taken.
     *
     * @param announcement - The modal name to announce, as provided in {@link render}.
     *
     * @example
     * game.message(
     *   '{{player}} has a score of {{score}}',
     *   { player, score: player.score() }
     * );
     *
     * @category Game Management
     */
    announce(announcement) {
      this._ctx.gameManager.announcements.push(announcement);
      this.addDelay();
      this._ctx.gameManager.announcements = [];
    }
    // also gets removed elements
    allJSON(seenBy) {
      return [this.toJSON(seenBy)].concat(this._ctx.removed._t.children.map((el) => el.toJSON(seenBy)));
    }
    // hydrate from json, and assign all attrs. requires that players be hydrated first
    fromJSON(boardJSON) {
      let { className, children, _id, order, ...rest } = boardJSON[0];
      if (this.constructor.name !== className)
        throw Error(`Cannot create board from JSON. ${className} must equal ${this.constructor.name}`);
      for (const key of Object.keys(this)) {
        if (!_Game.unserializableAttributes.includes(key) && !(key in rest))
          rest[key] = void 0;
      }
      this.createChildrenFromJSON(children || [], "0");
      this._ctx.removed.createChildrenFromJSON(boardJSON.slice(1), "1");
      if (order)
        this._t.order = order;
      if (this._ctx.gameManager)
        rest = deserializeObject({ ...rest }, this);
      Object.assign(this, { ...rest });
      this.assignAttributesFromJSON(children || [], "0");
      this._ctx.removed.assignAttributesFromJSON(boardJSON.slice(1), "1");
    }
    // restore default layout rules before running setupLayout
    resetUI() {
      super.resetUI();
      this._ui.stepLayouts = {};
    }
    setBoardSize(boardSize) {
      if (boardSize.name !== this._ui.boardSize?.name || boardSize.aspectRatio !== this._ui.boardSize?.aspectRatio) {
        this._ui.boardSize = boardSize;
      }
    }
    getBoardSize(screenX, screenY, mobile) {
      return this._ui.boardSizes?.(screenX, screenY, mobile) ?? {
        name: "_default",
        aspectRatio: 1,
        frame: { x: 100, y: 100 },
        screen: { x: 100, y: 100 }
      };
    }
    /**
     * Apply default layout rules for all the placement of all player prompts and
     * choices, in relation to the playing area
     *
     * @param attributes - see {@link ActionLayout}
     *
     * @category UI
     */
    layoutControls(attributes) {
      this._ui.stepLayouts["*"] = attributes;
    }
    /**
     * Apply layout rules to a particular step in the flow, controlling where
     * player prompts and choices appear in relation to the playing area
     *
     * @param step - the name of the step as defined in {@link playerActions}
     * @param attributes - see {@link ActionLayout}
     *
     * @category UI
     */
    layoutStep(step, attributes) {
      if (!this._ctx.gameManager.getFlowStep(step))
        throw Error(`No such step: ${step}`);
      this._ui.stepLayouts["step:" + step] = attributes;
    }
    /**
     * Apply layout rules to a particular action, controlling where player prompts
     * and choices appear in relation to the playing area
     *
     * @param action - the name of the action as defined in {@link game#defineActions}
     * @param attributes - see {@link ActionLayout}
     *
     * @category UI
     */
    layoutAction(action, attributes) {
      this._ui.stepLayouts["action:" + action] = attributes;
    }
    /**
     * Remove all built-in default appearance. If any elements have not been given a
     * custom appearance, this causes them to be hidden.
     *
     * @category UI
     */
    disableDefaultAppearance() {
      this._ui.disabledDefaultAppearance = true;
    }
    /**
     * Show bounding boxes around every layout
     *
     * @category UI
     */
    showLayoutBoundingBoxes() {
      this._ui.boundingBoxes = true;
    }
  };
  Game.unserializableAttributes = [...space_default.unserializableAttributes, "pile", "flowCommands", "flowGuard", "players", "random"];
  var game_default = Game;

  // node_modules/@boardzilla/core/entry/interface.js
  var import_random_seed = __toESM(require_random_seed(), 1);
  var colors = [
    "#d50000",
    "#00695c",
    "#304ffe",
    "#ff6f00",
    "#7c4dff",
    "#ffa825",
    "#f2d330",
    "#43a047",
    "#004d40",
    "#795a4f",
    "#00838f",
    "#408074",
    "#448aff",
    "#1a237e",
    "#ff4081",
    "#bf360c",
    "#4a148c",
    "#aa00ff",
    "#455a64",
    "#600020"
  ];
  function advanceRseed(rseed) {
    if (!rseed) {
      rseed = String(Math.random());
    } else {
      rseed = String(import_random_seed.default.create(rseed).random());
    }
    return rseed;
  }
  __name(advanceRseed, "advanceRseed");
  var createInterface = /* @__PURE__ */ __name((setup) => {
    return {
      initialState: (state) => {
        let rseed = state.randomSeed;
        if (!rseed) {
          if (globalThis.window?.sessionStorage) {
            let fixedRseed = sessionStorage.getItem("rseed");
            if (!fixedRseed) {
              fixedRseed = String(Math.random());
              sessionStorage.setItem("rseed", fixedRseed);
            }
            rseed = fixedRseed;
          }
          if (!rseed)
            rseed = advanceRseed();
        }
        const gameManager = setup(state, { rseed, trackMovement: true });
        if (globalThis.window)
          window.serverGameManager = gameManager;
        if (gameManager.phase !== "finished")
          gameManager.play();
        return gameManager.getUpdate();
      },
      processMove: (previousState, move) => {
        const rseed = advanceRseed(previousState.state.rseed);
        previousState.state.rseed = rseed;
        const gameManager = setup(previousState.state, { rseed, trackMovement: true });
        const player = gameManager.players.atPosition(move.position);
        gameManager.messages = [];
        gameManager.announcements = [];
        if (!(move.data instanceof Array))
          move.data = [move.data];
        let error = void 0;
        for (let i = 0; i !== move.data.length; i++) {
          error = gameManager.processMove({
            player,
            name: move.data[i].name,
            args: Object.fromEntries(Object.entries(move.data[i].args).map(([k, v]) => [k, deserializeArg(v, gameManager.game)]))
          });
          if (error) {
            throw Error(`Unable to process move: ${error}`);
          }
          if (gameManager.phase === "finished")
            break;
          gameManager.play();
        }
        return gameManager.getUpdate();
      },
      seatPlayer: (players, seatCount) => {
        let usedPositions = range(1, seatCount);
        let usedColors = [...colors];
        for (const player of players) {
          usedPositions = usedPositions.filter((position) => position !== player.position);
          usedColors = usedColors.filter((color) => color !== player.color);
        }
        if (usedPositions.length) {
          return {
            position: usedPositions[0],
            color: usedColors[0],
            settings: {}
          };
        }
        return null;
      },
      reprocessHistory(state, moves) {
        let rseed = state.randomSeed;
        const gameManager = setup(state, { rseed, trackMovement: false });
        if (gameManager.phase !== "finished")
          gameManager.play();
        const initialState = gameManager.getUpdate();
        let error = void 0;
        const updates = [];
        for (const move of moves) {
          rseed = advanceRseed(rseed);
          gameManager.setRandomSeed(rseed);
          gameManager.messages = [];
          gameManager.announcements = [];
          gameManager.intermediateUpdates = [];
          const player = gameManager.players.atPosition(move.position);
          if (!(move.data instanceof Array))
            move.data = [move.data];
          for (let i = 0; i !== move.data.length; i++) {
            try {
              error = gameManager.processMove({
                player,
                name: move.data[i].name,
                args: Object.fromEntries(Object.entries(move.data[i].args).map(([k, v]) => [k, deserializeArg(v, gameManager.game)]))
              });
            } catch (e) {
              error = e.message;
            }
            if (error || gameManager.phase === "finished")
              break;
            gameManager.play();
          }
          if (error)
            break;
          updates.push(gameManager.getUpdate());
          if (gameManager.phase === "finished")
            break;
        }
        return {
          initialState,
          updates,
          error
        };
      }
    };
  }, "createInterface");

  // node_modules/@boardzilla/core/entry/game-manager.js
  var import_random_seed2 = __toESM(require_random_seed(), 1);
  var GameManager = class {
    static {
      __name(this, "GameManager");
    }
    constructor(playerClass, gameClass, elementClasses = []) {
      this.flows = {};
      this.flowState = [];
      this.players = new PlayerCollection();
      this.sequence = 0;
      this.phase = "new";
      this.messages = [];
      this.announcements = [];
      this.intermediateUpdates = [];
      this.godMode = false;
      this.winner = [];
      this.players = new PlayerCollection();
      this.players.className = playerClass;
      this.game = new gameClass({ gameManager: this, classRegistry: [element_default, space_default, Piece, ...elementClasses] });
      this.players.game = this.game;
    }
    /**
     * configuration functions
     */
    setSettings(settings) {
      this.settings = settings;
    }
    setRandomSeed(rseed) {
      this.rseed = rseed;
      this.random = import_random_seed2.default.create(rseed).random;
      if (this.game.random)
        this.game.random = this.random;
    }
    /**
     * flow functions
     * @internal
     */
    // start the game fresh
    start() {
      if (this.phase === "started")
        throw Error("cannot call start once started");
      if (!this.players.length) {
        throw Error("No players");
      }
      this.phase = "started";
      this.players.currentPosition = [...this.players].map((p) => p.position);
      this.flowState = [{ stack: [], currentPosition: this.players.currentPosition }];
      this.startFlow();
    }
    play() {
      if (this.phase === "finished")
        return;
      if (this.phase !== "started")
        throw Error("cannot call play until started");
      const result = this.flow().play();
      if (result instanceof Flow) {
        if ("continueIfImpossible" in result && result.continueIfImpossible) {
          const possible = this.players.allCurrent().some((player) => this.getPendingMoves(player) !== void 0);
          if (!possible) {
            console.debug(`Continuing past playerActions "${result.name}" with no possible moves`);
            this.flow().processMove({ player: this.players.currentPosition[0], name: "__continue__", args: {} });
            this.play();
          }
        }
      } else if (result) {
        for (const flow of result.reverse())
          this.beginSubflow(flow);
        this.play();
      } else {
        if (this.flowState.length > 1) {
          console.debug(`Completed "${this.flowState[0].name}" flow. Returning to "${this.flowState[1].name ?? "main"}" flow`);
          this.flowState.shift();
          this.startFlow();
          this.play();
        } else {
          this.game.finish();
        }
      }
    }
    flow() {
      return this.flows[this.flowState[0].name ?? "__main__"];
    }
    getFlowStep(name) {
      for (const flow of Object.values(this.flows)) {
        const step = flow.getStep(name);
        if (step)
          return step;
      }
    }
    beginSubflow(flow) {
      if (flow.name !== "__followup__" && flow.name !== "__main__" && !this.flows[flow.name])
        throw Error(`No flow named "${flow.name}"`);
      console.debug(`Proceeding to "${flow.name}" flow${flow.args ? ` with { ${Object.entries(flow.args).map(([k, v]) => `${k}: ${v}`).join(", ")} }` : ""}`);
      this.flowState[0].stack = this.flow().branchJSON();
      this.flowState[0].currentPosition = this.players.currentPosition;
      this.flowState.unshift({
        name: flow.name,
        args: serialize(flow.args),
        currentPosition: this.players.currentPosition,
        stack: []
      });
      this.startFlow();
    }
    setFlowFromJSON(json) {
      this.flowState = json;
      this.phase = "started";
      this.startFlow();
    }
    startFlow(json) {
      const { name, args, stack, currentPosition } = json ?? this.flowState[0];
      let flow;
      const deserializedArgs = deserialize(args, this.game);
      if (name === "__followup__") {
        const actions = deserializedArgs;
        flow = new ActionStep({ name: "__followup__", player: actions.player, actions: [actions] });
        flow.gameManager = this;
        this.flows.__followup__ = flow;
      } else {
        flow = this.flows[name ?? "__main__"];
      }
      this.players.currentPosition = currentPosition;
      if (stack.length) {
        flow.setBranchFromJSON(stack);
      } else {
        flow.reset();
      }
      if (args)
        flow.args = deserializedArgs;
    }
    flowJSON(player = false) {
      const currentFlow = this.flows[this.flowState[0].name ?? "__main__"];
      const currentState = {
        stack: currentFlow.branchJSON(!!player),
        currentPosition: this.players.currentPosition
      };
      if (this.flowState[0].name)
        currentState.name = this.flowState[0].name;
      if (currentFlow.args)
        currentState.args = serialize(currentFlow.args);
      return [currentState, ...this.flowState.slice(1)];
    }
    /**
     * state functions
     * @internal
     */
    getState(player) {
      return {
        players: this.players.map((p) => p.toJSON()),
        settings: this.settings,
        position: this.flowJSON(!!player),
        board: this.game.allJSON(player?.position),
        sequence: this.sequence,
        messages: this.messages.filter((m) => player && (!m.position || m.position === player?.position)),
        announcements: [...this.announcements],
        rseed: player ? "" : this.rseed
      };
    }
    getPlayerStates() {
      return this.players.map((p, i) => ({
        position: p.position,
        state: this.intermediateUpdates.length ? this.intermediateUpdates.map((state) => state[i]).concat([this.getState(p)]) : this.getState(p)
      }));
    }
    getUpdate() {
      this.sequence += 1;
      if (this.phase === "started") {
        return {
          game: {
            state: this.getState(),
            currentPlayers: this.players.currentPosition,
            phase: this.phase
          },
          players: this.getPlayerStates(),
          messages: this.messages
        };
      }
      if (this.phase === "finished") {
        return {
          game: {
            state: this.getState(),
            winners: this.winner.map((p) => p.position),
            phase: this.phase
          },
          players: this.getPlayerStates(),
          messages: this.messages
        };
      }
      throw Error("unable to initialize game");
    }
    contextualizeBoardToPlayer(player) {
      const prev = this.game._ctx.player;
      this.game._ctx.player = player;
      return prev;
    }
    inContextOfPlayer(player, fn) {
      const prev = this.contextualizeBoardToPlayer(player);
      const results = fn();
      this.contextualizeBoardToPlayer(prev);
      return results;
    }
    trackMovement(track = true) {
      if (this.game._ctx.trackMovement !== track) {
        this.game._ctx.trackMovement = track;
        if (track)
          this.intermediateUpdates = [];
      }
    }
    /**
     * action functions
     */
    getAction(name, player) {
      if (this.godMode) {
        const godModeAction = this.godModeActions()[name];
        if (godModeAction) {
          godModeAction.name = name;
          return godModeAction;
        }
      }
      if (!this.actions[name]) {
        throw Error(`No action found: "${name}". All actions must be specified in defineActions()`);
      }
      return this.inContextOfPlayer(player, () => {
        const action = this.actions[name](player);
        action.gameManager = this;
        action.name = name;
        return action;
      });
    }
    godModeActions() {
      if (this.phase !== "started")
        throw Error("cannot call god mode actions until started");
      return {
        _godMove: this.game.action({
          prompt: "Move"
        }).chooseOnBoard("piece", this.game.all(Piece)).chooseOnBoard("into", this.game.all(element_default)).move("piece", "into"),
        _godEdit: this.game.action({
          prompt: "Change"
        }).chooseOnBoard("element", this.game.all(element_default)).chooseFrom("property", ({ element }) => Object.keys(element).filter((a) => !element_default.unserializableAttributes.concat(["_visible", "mine", "owner"]).includes(a)), { prompt: "Change property" }).enterText("value", {
          prompt: ({ property }) => `Change ${property}`,
          initial: ({ element, property }) => String(element[property])
        }).do(({ element, property, value }) => {
          let v = value;
          if (value === "true") {
            v = true;
          } else if (value === "false") {
            v = false;
          } else if (parseInt(value).toString() === value) {
            v = parseInt(value);
          }
          element[property] = v;
        })
      };
    }
    // given a player's move (minimum a selected action), attempts to process
    // it. if not, returns next selection for that player, plus any implied partial
    // moves
    processMove({ player, name, args }) {
      if (this.phase === "finished")
        return "Game is finished";
      let result;
      return this.inContextOfPlayer(player, () => {
        if (this.godMode && this.godModeActions()[name]) {
          const godModeAction = this.godModeActions()[name];
          result = godModeAction._process(player, args);
        } else {
          result = this.flow().processMove({
            name,
            player: player.position,
            args
          });
        }
        console.debug(`Received move from player #${player.position} ${name}({${Object.entries(args).map(([k, v]) => `${k}: ${v}`).join(", ")}}) ${result ? typeof result === "string" ? "\u274C " + result : `\u2B95  ${result[0].name}({${Object.entries(result[0].args || {}).map(([k, v]) => `${k}: ${v}`).join(", ")}})` : "\u2705"}`);
        if (result instanceof Array) {
          for (const flow of result.reverse())
            this.beginSubflow(flow);
        }
        return typeof result === "string" ? result : void 0;
      });
    }
    allowedActions(player, debug) {
      const actions = this.godMode ? Object.keys(this.godModeActions()).map((name) => ({ name })) : [];
      if (!player.isCurrent())
        return {
          actions,
          skipIf: "always"
        };
      const actionStep = this.flow().actionNeeded(player);
      if (actionStep?.actions) {
        for (const allowedAction of actionStep.actions) {
          if (allowedAction.name === "__pass__") {
            actions.push(allowedAction);
          } else {
            const gameAction = this.getAction(allowedAction.name, player);
            if (gameAction.isPossible(allowedAction.args ?? {})) {
              actions.push({ ...gameAction, ...allowedAction, player });
            } else if (debug) {
              debug[allowedAction.name] = { impossible: true, args: {} };
            }
          }
        }
        return {
          ...actionStep,
          actions
        };
      }
      return {
        skipIf: "always",
        actions: []
      };
    }
    getPendingMoves(player, name, args, debug) {
      if (this.phase === "finished")
        return;
      const allowedActions = this.allowedActions(player, debug);
      let possibleActions = [];
      if (allowedActions.actions.length) {
        const { step, prompt, actions, skipIf } = allowedActions;
        if (!name) {
          let pendingMoves = [];
          for (const action of actions) {
            if (action.name === "__pass__") {
              possibleActions.push("__pass__");
              pendingMoves.push({
                name: "__pass__",
                args: {},
                selections: [
                  new Selection("__action__", { prompt: action.prompt, value: "__pass__" }).resolve({})
                ]
              });
              if (debug) {
                debug["__pass__"] = { args: {} };
              }
            } else {
              const playerAction = this.getAction(action.name, player);
              const args2 = action.args || {};
              let submoves = playerAction._getPendingMoves(args2, debug);
              if (submoves !== void 0) {
                possibleActions.push(action.name);
                if (submoves.length === 0 || skipIf === "never" || skipIf === "only-one" && actions.length > 1) {
                  submoves = [{
                    name: action.name,
                    prompt: action.prompt,
                    args: args2,
                    selections: [
                      new Selection("__action__", {
                        prompt: action.prompt ?? playerAction.prompt,
                        value: action.name,
                        skipIf
                      }).resolve({})
                    ]
                  }];
                }
                pendingMoves = pendingMoves.concat(submoves);
              } else {
                console.debug(`Action ${action.name} not allowed because no valid selections exist`);
              }
            }
          }
          if (possibleActions.length)
            return { step, prompt, moves: pendingMoves };
        } else {
          if (name === "__pass__")
            return { step, prompt, moves: [] };
          const moves = this.getAction(name, player)?._getPendingMoves(args || {}, debug);
          if (moves)
            return { step, prompt, moves };
        }
      }
      return void 0;
    }
  };

  // node_modules/@boardzilla/core/entry/game-creator.js
  var createGame = /* @__PURE__ */ __name((playerClass, gameClass, gameCreator) => (state, options) => {
    const gameManager = new GameManager(playerClass, gameClass);
    const inSetup = !("board" in state);
    globalThis.$ = gameManager.game._ctx.namedSpaces;
    if (options?.rseed)
      gameManager.setRandomSeed(options.rseed);
    gameManager.setSettings(state.settings);
    gameManager.players.fromJSON(state.players);
    gameCreator(gameManager.game);
    if (options?.mocks)
      options.mocks(gameManager.game);
    if (options?.trackMovement)
      gameManager.trackMovement();
    if (!inSetup) {
      gameManager.sequence = state.sequence;
      gameManager.messages = state.messages;
      gameManager.announcements = state.announcements;
      gameManager.game.fromJSON(state.board);
      gameManager.players.assignAttributesFromJSON(state.players);
      gameManager.setFlowFromJSON(state.position);
    } else {
      gameManager.start();
      gameManager.players.assignAttributesFromJSON(state.players);
    }
    return gameManager;
  }, "createGame");

  // src/game/pieces/index.ts
  var Token = class extends Piece {
    static {
      __name(this, "Token");
    }
  };
  var ScoreCounter = class extends Piece {
    static {
      __name(this, "ScoreCounter");
    }
    // 1-10
  };
  var Slot = class extends space_default {
    static {
      __name(this, "Slot");
    }
  };

  // src/game/pieces/challenges.ts
  var ChallengeCard = class extends Piece {
    static {
      __name(this, "ChallengeCard");
    }
  };
  var challengeCards = [
    {
      problem: "Teacher quality",
      points: 3,
      impacting_events: ["Privacy breach"],
      problem_detail: "A new system is introduced aiming to use data from class activities, to identify learners who may need more support...",
      requirements: {
        blocks: 1,
        principles: [
          { principle: 1, value: 1, name: "long-range" },
          { principle: 2, value: 1, name: "respect for persons" },
          { principle: 5, value: 1, name: "merit and integrity" }
        ]
      }
    },
    {
      problem: "Workload",
      points: 1,
      impacting_events: ["Equity"],
      problem_detail: "",
      requirements: {
        blocks: 1,
        principles: [
          { principle: 4, name: "justice", value: 2 },
          { principle: 2, value: 1, name: "respect for persons" }
        ]
      }
    },
    {
      problem: "Formative feedback at scale",
      points: 3,
      impacting_events: ["Equity"],
      problem_detail: "",
      requirements: {
        blocks: 1,
        principles: [
          { principle: 5, value: 1, name: "merit and integrity" },
          { principle: 2, value: 1, name: "respect for persons" },
          { principle: 3, value: 1, name: "beneficience" }
        ]
      }
    },
    {
      problem: "Differentiation",
      points: 2,
      impacting_events: [],
      problem_detail: "Scenario 1: AI for enrichment class streaming...",
      requirements: {
        blocks: 1,
        principles: [
          { principle: 5, name: "merit and integrity", value: 2 },
          { principle: 4, value: 1, name: "justice" }
        ]
      }
    },
    {
      problem: "Digital skills",
      points: 1,
      impacting_events: [],
      problem_detail: "",
      requirements: {
        blocks: 1,
        principles: [
          { principle: 2, value: 1, name: "respect for persons" },
          { principle: 4, name: "justice", value: 2 }
        ]
      }
    },
    {
      problem: "Engagement",
      points: 1,
      impacting_events: [],
      problem_detail: "Your school has adopted a new AI system that is intended to track \uFFFDengagement in learning\uFFFD...",
      requirements: {
        blocks: 1,
        principles: [
          { principle: 5, name: "merit and integrity", value: 2 },
          { principle: 2, value: 1, name: "respect for persons" }
        ]
      }
    },
    {
      problem: "Careers guidance",
      points: 1,
      impacting_events: [],
      problem_detail: "Common scenario: AI career guidance tool...",
      requirements: {
        blocks: 1,
        principles: []
      }
    },
    {
      problem: "Meeting accessibility obligations",
      points: 3,
      impacting_events: [],
      problem_detail: "Your school is legally required to provide accessible materials for all students...",
      requirements: {
        blocks: 1,
        principles: [
          { principle: 2, value: 1, name: "respect for persons" },
          { principle: 4, name: "justice", value: 2 }
        ]
      }
    },
    {
      problem: "Personalised learning",
      points: 2,
      impacting_events: [],
      problem_detail: "Adaptive Learning Platforms: This AI-driven platform personalizes instruction for each student...",
      requirements: {
        blocks: 1,
        principles: [
          { principle: 2, value: 1, name: "respect for persons" },
          { principle: 5, value: 1, name: "merit and integrity" }
        ]
      }
    },
    {
      problem: "Wellbeing",
      points: 2,
      impacting_events: [],
      problem_detail: "AI-Driven Counseling Support: A new AI system helps school counselors identify students in need of emotional support early...",
      requirements: {
        blocks: 1,
        principles: [
          { principle: 3, name: "beneficience", value: 2 },
          { principle: 5, value: 1, name: "merit and integrity" }
        ]
      }
    }
  ];

  // src/game/pieces/strategies.ts
  var StrategyCard = class extends Piece {
    static {
      __name(this, "StrategyCard");
    }
  };
  var strategyCards = [
    {
      name: "Develop guidelines",
      type: "regulate",
      cost: 1,
      contribution: {
        principles: [
          { principle: 1, value: 1 },
          { principle: 2, value: 1 },
          { principle: 3, value: 1 },
          { principle: 4, value: 1 },
          { principle: 5, value: 1 }
        ]
      }
    },
    {
      name: "Ban some uses of or types of AI",
      type: "regulate",
      cost: 1,
      contribution: {
        principles: [
          { principle: 1, value: 1 },
          { principle: 2, value: 1 },
          { principle: 3, value: 1 },
          { principle: 4, value: 1 },
          { principle: 5, value: 1 }
        ]
      }
    },
    {
      name: "Provide learning opportunities for teachers / students / school leaders",
      type: "regulate",
      cost: 2,
      contribution: {
        principles: [
          { principle: 1, value: 0 },
          { principle: 2, value: 3 },
          { principle: 3, value: 1 },
          { principle: 4, value: 0 },
          { principle: 5, value: 1 }
        ]
      }
    },
    {
      name: "Provide non-AI alternatives to the technology to do the same tasks.",
      type: "regulate",
      cost: 2,
      contribution: {
        principles: [
          { principle: 1, value: 0 },
          { principle: 2, value: 3 },
          { principle: 3, value: 0 },
          { principle: 4, value: 0 },
          { principle: 5, value: 0 }
        ]
      }
    },
    {
      name: "Change how the AI / tool is used",
      type: "regulate",
      cost: 2,
      contribution: {
        principles: [
          { principle: 1, value: 0 },
          { principle: 2, value: 3 },
          { principle: 3, value: 0 },
          { principle: 4, value: 0 },
          { principle: 5, value: 0 }
        ]
      }
    },
    {
      name: "Invest in a tool / person e.g., to collect / explore data, create policy, implement changes, etc.",
      type: "regulate",
      cost: 2,
      contribution: {
        principles: [
          { principle: 1, value: 0 },
          { principle: 2, value: 0 },
          { principle: 3, value: 2 },
          { principle: 4, value: 0 },
          { principle: 5, value: 1 }
        ]
      }
    },
    {
      name: "Require tool providers to provide evidence of how effective or \uFFFDethical\uFFFD they are",
      type: "regulate",
      cost: 3,
      contribution: {
        principles: [
          { principle: 1, value: 0 },
          { principle: 2, value: 0 },
          { principle: 3, value: 3 },
          { principle: 4, value: 0 },
          { principle: 5, value: 2 }
        ]
      }
    },
    {
      name: "Go back to the status quo",
      type: "regulate",
      cost: 2,
      contribution: {
        principles: [
          { principle: 1, value: 999 },
          { principle: 2, value: 999 },
          { principle: 3, value: 999 },
          { principle: 4, value: 999 },
          { principle: 5, value: 999 }
        ]
      }
    },
    {
      name: "Involve stakeholders in decision making around the problem or/and use of AI",
      type: "regulate",
      cost: 3,
      contribution: {
        principles: [
          { principle: 1, value: 1 },
          { principle: 2, value: 1 },
          { principle: 3, value: 1 },
          { principle: 4, value: 3 },
          { principle: 5, value: 1 }
        ]
      }
    },
    {
      name: "Introduce rewards / penalties for good / bad use of AI",
      type: "regulate",
      cost: 1,
      contribution: {
        principles: [
          { principle: 1, value: 1 },
          { principle: 2, value: 1 },
          { principle: 3, value: 0 },
          { principle: 4, value: 1 },
          { principle: 5, value: 1 }
        ]
      }
    },
    {
      name: "Establish an oversight body or system to monitor the impacts of AI",
      type: "regulate",
      cost: 1,
      contribution: {
        principles: [
          { principle: 1, value: 1 },
          { principle: 2, value: 0 },
          { principle: 3, value: 1 },
          { principle: 4, value: 0 },
          { principle: 5, value: 1 }
        ]
      }
    },
    {
      name: "Share examples of good / problematic practice",
      type: "regulate",
      cost: 1,
      contribution: {
        principles: [
          { principle: 1, value: 0 },
          { principle: 2, value: 0 },
          { principle: 3, value: 1 },
          { principle: 4, value: 0 },
          { principle: 5, value: 1 }
        ]
      }
    },
    {
      name: "Advocate for change to a relevant stakeholder/s",
      type: "regulate",
      cost: 1,
      contribution: {
        principles: [
          { principle: 1, value: 0 },
          { principle: 2, value: 1 },
          { principle: 3, value: 0 },
          { principle: 4, value: 1 },
          { principle: 5, value: 0 }
        ]
      }
    },
    {
      name: "Seek school sponsorship / partnership with an external partner (e.g., EdTech company).",
      type: "regulate",
      cost: -1,
      contribution: {
        principles: [
          { principle: 1, value: -1 },
          { principle: 2, value: 1 },
          { principle: 3, value: 1 },
          { principle: 4, value: 1 },
          { principle: 5, value: -1 }
        ]
      }
    },
    {
      name: "Create a tool to support users monitor the energy and water consumption of their AI use.",
      type: "regulate",
      cost: 2,
      contribution: {
        principles: [
          { principle: 1, value: 2 },
          { principle: 2, value: 0 },
          { principle: 3, value: 0 },
          { principle: 4, value: 2 },
          { principle: 5, value: 2 }
        ]
      }
    },
    {
      name: "Require annual reporting and ongoing monitoring of emerging impacts of tools",
      type: "regulate",
      cost: 3,
      contribution: {
        principles: [
          { principle: 1, value: 2 },
          { principle: 2, value: 0 },
          { principle: 3, value: 3 },
          { principle: 4, value: 2 },
          { principle: 5, value: 2 }
        ]
      }
    },
    {
      name: "Somethin expensive",
      type: "regulate",
      cost: 18,
      contribution: {
        principles: [
          { principle: 1, value: 2 },
          { principle: 2, value: 0 },
          { principle: 3, value: 3 },
          { principle: 4, value: 2 },
          { principle: 5, value: 2 }
        ]
      }
    }
  ];

  // src/game/pieces/events.ts
  var EventCard = class extends Piece {
    static {
      __name(this, "EventCard");
    }
  };
  var eventCards = [
    {
      name: "Does everyone in the school know how the AI system works?",
      type: "event",
      impact: [
        { principle: 1, value: -3 },
        { principle: 2, value: 0 },
        { principle: 3, value: 0 },
        { principle: 4, value: 0 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: "If a student/teacher disagrees with the outcome that an AI provides, what can they do in your school?",
      type: "event",
      impact: [
        { principle: 1, value: -3 },
        { principle: 2, value: 0 },
        { principle: 3, value: 0 },
        { principle: 4, value: 0 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: "Can the AI system do what the EdTech company says it can?",
      type: "event",
      impact: [
        { principle: 1, value: 0 },
        { principle: 2, value: -3 },
        { principle: 3, value: 0 },
        { principle: 4, value: 0 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: "What impacts might using this AI system have on other stakeholders? (E.g., parents, teachers, school leaders, wider community)",
      type: "event",
      impact: [
        { principle: 1, value: 0 },
        { principle: 2, value: 0 },
        { principle: 3, value: -3 },
        { principle: 4, value: 0 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: 'Imagine the system has been in place for longer than 5 years: Will the system have improved? Who will benefit from those improvements? Who "owns" the knowledge that led to those improvements? Will how the system is used have changed? Will human expertise and agency be retained? What impact will using the AI system have on longer term issues?',
      type: "event",
      impact: [
        { principle: 1, value: -3 },
        { principle: 2, value: 0 },
        { principle: 3, value: 0 },
        { principle: 4, value: 0 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: "Does the system tackle an issue or problem everyone thinks is important? If not, how has this happened?",
      type: "event",
      impact: [
        { principle: 1, value: 0 },
        { principle: 2, value: 0 },
        { principle: 3, value: 0 },
        { principle: 4, value: -2 },
        { principle: 5, value: -2 }
      ]
    },
    {
      name: "According to the latest Australian Digital Inclusion Index (ADII), almost a quarter of Australians are digitally excluded \uFFFD meaning they don\uFFFDt have access to essential technology.",
      type: "event",
      impact: [
        { principle: 1, value: 0 },
        { principle: 2, value: 0 },
        { principle: 3, value: 0 },
        { principle: 4, value: 0 },
        { principle: 5, value: -3 }
      ]
    },
    {
      name: "Did you know: a ChatGPT request uses roughly 10 times a Google search query; and cooling data centres for AI uses water, with increased demand.",
      type: "event",
      impact: [
        { principle: 1, value: -3 },
        { principle: 2, value: 0 },
        { principle: 3, value: 0 },
        { principle: 4, value: 0 },
        { principle: 5, value: -2 }
      ]
    },
    {
      name: "Intergenerational fairness describes issues relating to how burdens and benefits impact different generations, including long-range harms for present-day decisions.",
      type: "event",
      impact: [
        { principle: 1, value: -3 },
        { principle: 2, value: 0 },
        { principle: 3, value: 0 },
        { principle: 4, value: 0 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: "Imagine that AI is being used to solve a long-standing fairness issue in your school. How might this change how you think about the use of AI in your scenario?",
      type: "event",
      impact: [
        { principle: 1, value: 0 },
        { principle: 2, value: 0 },
        { principle: 3, value: 0 },
        { principle: 4, value: 0 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: "Imagine that something goes wrong (systems fail, students receive the wrong decision, there is a data breach, etc.). How would this impact fairness?",
      type: "event",
      impact: [
        { principle: 1, value: 0 },
        { principle: 2, value: 0 },
        { principle: 3, value: -3 },
        { principle: 4, value: 0 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: "Pandemic",
      type: "event",
      impact: [
        { principle: 1, value: 0 },
        { principle: 2, value: 0 },
        { principle: 3, value: -3 },
        { principle: 4, value: -3 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: "Lose social license",
      type: "event",
      impact: [
        { principle: 1, value: -2 },
        { principle: 2, value: 0 },
        { principle: 3, value: 0 },
        { principle: 4, value: -2 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: "Poor use of AI",
      type: "event",
      impact: [
        { principle: 1, value: 0 },
        { principle: 2, value: -2 },
        { principle: 3, value: -2 },
        { principle: 4, value: 0 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: "Pedagogic calcification",
      type: "event",
      impact: [
        { principle: 1, value: 0 },
        { principle: 2, value: 0 },
        { principle: 3, value: 0 },
        { principle: 4, value: -2 },
        { principle: 5, value: -2 }
      ]
    },
    {
      name: "Privacy breach",
      type: "event",
      impact: [
        { principle: 1, value: 0 },
        { principle: 2, value: -3 },
        { principle: 3, value: 0 },
        { principle: 4, value: 0 },
        { principle: 5, value: 0 }
      ]
    },
    {
      name: "SMETHING BAD breach",
      type: "event",
      impact: [
        { principle: 1, value: -3 },
        { principle: 2, value: -3 },
        { principle: 3, value: -3 },
        { principle: 4, value: -3 },
        { principle: 5, value: -3 }
      ]
    }
  ];

  // src/game/index.ts
  var TradeoffsPlayer = class extends player_default {
    constructor() {
      super(...arguments);
      /**
       * Any properties of your players that are specific to your game go here
       * Not clear at this point how the player vs game def differs.
       * These are properties for each player (e.g., a score, a set resource value, etc).
       * Possibly if you have character types they'd go here.
       * The game class provides shared properties such as the round we're on.
       */
      this.score = 0;
      this.resources = 5;
      this.stashedThisTurn = false;
      this.damage = 0;
    }
    static {
      __name(this, "TradeoffsPlayer");
    }
    // can only be 'win', 'lose', or undefined
  };
  var Tradeoffs = class extends game_default {
    constructor() {
      super(...arguments);
      /**
       * Any overall properties of your game go here
       */
      this.round = 0;
      this.maxRounds = 6;
      this.turnLimit = 5;
      this.handLimit = 10;
      this.poolSize = 20;
      this.strategyDrawCost = 4;
      this.wincondition = 10;
      this.losecondition = 10;
    }
    static {
      __name(this, "Tradeoffs");
    }
  };
  var game_default2 = createGame(TradeoffsPlayer, Tradeoffs, (game) => {
    const { action } = game;
    const {
      playerActions,
      eachPlayer,
      forEach,
      forLoop,
      whileLoop,
      loop
    } = game.flowCommands;
    for (const player of game.players) {
      const challengeSpace = game.create(space_default, "challengeSpace", { player });
      const challengeSlots = challengeSpace.create(space_default, "challengeSlots", { player });
      for (let i = 0; i < 3; i++) {
        const slot = challengeSlots.create(Slot, `slot${i}`, { group: "challengeslot" });
        const tokenSpace = slot.create(space_default, "tokenSpace");
        ["Data", "Method", "User", "Aim"].forEach((type) => {
          tokenSpace.create(space_default, `${type}`);
        });
      }
      const challengeCompleted = game.create(space_default, "challengeCompleted", { player });
      const activeStrategies = game.create(space_default, "activeStrategies", { player });
      const hand = game.create(space_default, "hand", { player });
      const pool = game.create(space_default, "pool", { player });
      const tokenTypes = ["Data", "Method", "User", "Aim"];
      for (let i = 0; i < game.poolSize; i++) {
        const type = tokenTypes[i % tokenTypes.length];
        const quality = Math.floor(Math.random() * 3) + 1;
        pool.create(Token, `token${type}`, { type, quality });
      }
      const discarded = game.create(space_default, "discarded", { player });
      const wastedResource = game.create(space_default, "wastedResource", { player });
      const scoreArea = game.create(space_default, "scoreArea", { player });
      game.create(ScoreCounter, "scoreCounter", { value: player.score });
      const eventDeck = game.create(space_default, "eventDeck");
      eventCards.forEach((card) => {
        eventDeck.create(EventCard, card.name, card);
      });
      const challengeDeck = game.create(space_default, "challengeDeck");
      challengeCards.forEach((card, i) => {
        challengeDeck.create(ChallengeCard, `challengeCard${i}`, card);
      });
      const strategyDeck = game.create(space_default, "strategyDeck");
      strategyCards.forEach((card) => {
        strategyDeck.create(StrategyCard, card.name, card);
      });
    }
    game.defineActions({
      /**
      chooseActions: player =>
          action({
              prompt: 'Pick an action',
          }).chooseFrom(
              'actions', [
                  'draw a Strategy card (free)': drawStrategyCard,
                  'play an innovation tile (see tile costs)': playInnovation,
                  'play a strategy card (see card costs)': playStrategyCard,
                  'add an extra challenge': addChallengeCard,
                  'stash a challenge card (gain 1 point, lose 1 resource)': stashCard
              ]
          ),
          */
      // allow a player to draw additional strategy cards from the strategy deck into their hand (at cost set by strategyDrawCost, currently free/0)
      drawStrategyCard: (player) => action({
        prompt: "Draw strategy cards"
      }).chooseOnBoard(
        "strategyCard",
        $.strategyDeck.all(StrategyCard)
        // should this be unquoted StrategyCard or quoted 'strategyCards', I thought the latter, the former is the class (assigned to strategyCards), but it's the former
      ).move(
        "strategyCard",
        player.my("hand")
      ).do(({ strategyCard }) => {
        if (player.resources >= game.strategyDrawCost) {
          player.resources -= game.strategyDrawCost;
          game.message(
            `{{player}} drew a strategy card, costing {{drawcost}}.`,
            { player, drawcost: game.strategyDrawCost }
          );
        } else {
          game.message(
            `{{player}} does not have enough resources ({{myresource}}, {{drawcost}} needed) to draw a strategy card.`,
            { player, drawcost: game.strategyDrawCost, myresource: player.resources }
          );
        }
      }),
      // allow a player to play strategy cards (at cost set on each card by strategyCard.cost)
      playStrategyCard: (player) => action({
        prompt: "Play a strategy card"
      }).chooseOnBoard(
        "strategyCard",
        player.my("hand").all(StrategyCard)
      ).do(({ strategyCard }) => {
        if (player.resources >= strategyCard.cost) {
          player.resources -= strategyCard.cost;
          strategyCard.putInto($.activeStrategies);
          game.message(
            `{{player}} played a strategy card, resource is now {{myresource}}.`,
            { player, myresource: player.resources }
          );
        } else {
          game.message(
            `{{player}} does not have enough resource ({{myresource}}) to play this strategy card.`,
            { player, myresource: player.resources }
          );
        }
      }),
      addChallengeCard: (player) => action({
        prompt: "Add a challenge card to an available slot"
      }).chooseOnBoard(
        "challengeCard",
        $.challengeDeck.all(ChallengeCard)
      ).do(({ challengeCard }) => {
        const allSlots = player.allMy(Slot, { group: "challengeslot" });
        const emptySlots = allSlots.filter((slot) => !slot.has(ChallengeCard));
        if (emptySlots.length > 0) {
          const freeSlot = emptySlots.first();
          challengeCard.putInto(freeSlot);
          game.message(`{{player}} placed a new challenge card.`, { player });
        } else {
          game.message(
            `{{player}} does not have any empty slots to place this challenge`,
            { player }
          );
        }
      }),
      stashCard: (player) => action({
        prompt: "Stash a challenge card",
        condition: !player.stashedThisTurn
      }).chooseOnBoard(
        "challengeCard",
        player.my("hand").all(ChallengeCard)
        // challengeDeck
      ).move(
        "challengeCard",
        $.discarded
      ).do(({ challengeCard }) => {
        if (player.resources >= 1) {
          player.resources -= 1;
          player.score += 1;
          player.stashedThisTurn = true;
          game.message(`{{player}} stashed a card and increased their score by 1.`, { player });
        }
      }),
      // allow a player to skip their turn by setting their resources to 0
      skip: (player) => action({
        prompt: "skip the rest of your turn"
      }).do(() => {
        player.resources = 0;
        game.message(
          `{{player}} resources passed for this turn.`,
          { player }
        );
      }),
      drawEvent: (player) => action({
        prompt: "Draw an event card"
      }).chooseOnBoard(
        "card",
        $.eventDeck.all(EventCard)
      ).message(
        `An event occurred....`
      ).do(({ card }) => {
        const principlesData = [
          { principle: 1, eventValue: 0, challengeValue: 0, strategyValue: 0, tokenValue: 0 },
          { principle: 2, eventValue: 0, challengeValue: 0, strategyValue: 0, tokenValue: 0 },
          { principle: 3, eventValue: 0, challengeValue: 0, strategyValue: 0, tokenValue: 0 },
          { principle: 4, eventValue: 0, challengeValue: 0, strategyValue: 0, tokenValue: 0 },
          { principle: 5, eventValue: 0, challengeValue: 0, strategyValue: 0, tokenValue: 0 }
        ];
        const activestrategies = player.my("activeStrategies").all(StrategyCard);
        card.impact?.forEach((impact) => {
          const principleData = principlesData.find((p) => p.principle === impact.principle);
          if (principleData) {
            principleData.eventValue += impact.value || 0;
          }
          ;
        });
        if (activestrategies.length > 0) {
          activestrategies.forEach((strategy) => {
            strategy.contribution?.principles.forEach((principle) => {
              const principleData = principlesData.find((p) => p.principle === principle.principle);
              if (principleData) {
                principleData.strategyValue += principle.value || 0;
              }
            });
          });
        }
        ;
        const results = [];
        const activechallenges = player.my("challengeSlots").all(ChallengeCard);
        activechallenges.forEach((challenge) => {
          challenge.requirements?.principles.forEach((principle) => {
            const principleData = principlesData.find((p) => p.principle === principle.principle);
            if (principleData) {
              principleData.challengeValue = principle.value || 0;
            }
            ;
          });
          const matchingPrinciples = principlesData.filter((row) => row.eventValue < 0 && row.challengeValue != null && row.challengeValue > 0);
          if (matchingPrinciples.length > 0) {
            const failTest = matchingPrinciples.filter((row) => row.eventValue + row.strategyValue < 0);
            const passTest = matchingPrinciples.filter((row) => row.eventValue + row.strategyValue >= 0);
            if (failTest.length > 0) {
              const allSlots = player.allMy(Slot, { group: "challengeslot" });
              const riskedSlots = allSlots.filter((slot) => slot.has(challenge));
              const riskedTokens = riskedSlots.all(Token);
              const tokenSum = riskedTokens.sum((token) => token.quality);
              console.log("tokensum", tokenSum);
              results.push({
                challenge,
                failTest,
                riskedTokens,
                //riskedTokens, //number of tokens, not value
                tokenSum
              });
            }
          }
        });
        if (results.length > 0) {
          const failingPrinciples = results.flatMap(
            (result) => result.failTest.map((fail) => fail.principle)
          );
          const worstImpact = Math.max(...results.flatMap(
            (result) => result.failTest.map((fail) => fail.eventValue)
          ));
          const usefulStrategies = player.my("hand").all(StrategyCard).filter((strategyCard) => {
            return strategyCard.contribution?.principles.some((principle) => {
              return failingPrinciples.includes(principle.principle) && (principle.value || 0) + principlesData.find((p) => p.principle === principle.principle).strategyValue >= Math.abs(principlesData.find((p) => p.principle === principle.principle).eventValue);
            });
          });
          const usefulTokens = player.my("pool").all(Token).filter((tok) => tok.quality >= Math.abs(worstImpact));
          const usefulSlots = activechallenges.map((challenge) => challenge.container(Slot)).flatMap((slot) => {
            const tokenSpaces = slot.all(space_default).filter((space) => space.name === "tokenSpace");
            return tokenSpaces.flatMap((tokenSpace) => tokenSpace.all(space_default).filter((space) => usefulTokens.some((token) => token.type === space.name)));
          });
          const riskedTokensMap = results.flatMap(
            (result) => result.riskedTokens.map((token) => token)
            // Assuming `token` is a GameElement
          );
          const impactedChallenges = results.flatMap(
            (result) => [result.challenge.name]
            // Wrap the string in an array so `flatMap` works
          );
          console.log("immediately prior to the resolveEvent followup");
          game.followUp({
            name: "resolveEvent",
            args: {
              usefulSlots,
              usefulTokens,
              usefulStrategies,
              riskedTokensMap,
              impactedChallenges
            }
          });
        }
      }),
      // THIS IS THE END OF THE DRAW EVENT ACTION
      // Then action to check with the user what they want to do, mitigate or accept and enact 
      // with followup to different actions depending on decision
      resolveEvent: (player) => action({
        prompt: "The event has impacted a challenge card. Do you want to mitigate the impact?",
        description: "mitigation"
      }).chooseFrom(
        "options",
        [
          { choice: "play", label: "Play a strategy card" },
          { choice: "token", label: "Play an available token" },
          { choice: "accept", label: "Accept the impact of the event" }
        ]
      ).do(({ options, usefulSlots, usefulTokens, usefulStrategies, riskedTokensMap, impactedChallenges }) => {
        console.log("Selected Option:", options);
        console.log("usefulSlots:", usefulSlots);
        console.log("usefulTokens:", usefulTokens);
        console.log("usefulStrategies:", usefulStrategies);
        console.log("riskedTokensMap:", riskedTokensMap);
        console.log("impactedChallenges:", impactedChallenges);
        if (options === "play") {
          game.followUp({
            name: "mitigatePlay",
            args: {
              usefulStrategies
            }
          });
        } else if (options === "token") {
          game.followUp({
            name: "mitigateToken",
            args: {
              usefulTokens,
              usefulSlots
            }
          });
        } else if (options === "accept") {
          riskedTokensMap.forEach((token) => {
            token.putInto(player.my("wastedResource"));
          });
          game.message(
            `Resource tokens moved from {{impactedChallenges}} to the wastedResource space.`,
            { impactedChallenges }
          );
        }
      }),
      // end othe action
      mitigateToken: (player) => action({
        // Prompt the user to choose a token and corresponding slot (or automatically allocate it)
        prompt: "Choose a Token and Slot to play"
      }).chooseOnBoard("chosenToken", ({ usefulTokens }) => usefulTokens).chooseOnBoard("chosenSlot", ({ usefulSlots }) => usefulSlots).do(({ chosenToken, chosenSlot, usefulSlots, usefulTokens }) => {
        console.log("usefulTokens", usefulTokens);
        console.log("usefulSlots", usefulSlots);
        chosenToken.putInto(chosenSlot);
        player.my("pool").first(Token)?.putInto($.wastedResource);
        game.message(
          `{{player}} one token discarded, and token placed. Draw another event to proceed...`,
          { player }
        );
        game.followUp({ name: "drawEvent" });
      }),
      // End of the action call
      mitigatePlay: (player) => action({
        // Prompt the user to choose a strategy card
        prompt: "Choose a strategy card to play"
      }).chooseOnBoard("chosenCard", ({ usefulStrategies }) => usefulStrategies).do(({ chosenCard }) => {
        chosenCard.putInto($.discarded);
        player.my("pool").first(Token)?.putInto($.wastedResource);
        game.message(
          `{{player}} played and discarded strategy card {{chosenCard}} to mitigate the impact.`,
          { chosenCard, player }
        );
        game.followUp({ name: "drawEvent" });
      }),
      // End of the action call
      playInnovation: (player) => action({
        prompt: "Play an innovation token on a challenge card"
      }).chooseOnBoard(
        "chosenToken",
        player.my("pool").all(Token)
        // validate that they can afford it. Tried to use placePiece here and failed. Inelegant filter here...
      ).chooseOnBoard("chosenSpace", ({ chosenToken }) => {
        return game.all(space_default, "tokenSpace").filter((tokenSpace) => {
          const parentSlot = tokenSpace.container(Slot);
          return parentSlot && parentSlot.has(ChallengeCard);
        }).flatMap((tokenSpace) => {
          return tokenSpace.all(space_default).filter((space) => space.isEmpty() && space.name === chosenToken.type);
        });
      }).do(({ chosenToken, chosenSpace }) => {
        if (player.resources >= chosenToken.quality && chosenToken.type === chosenSpace.name) {
          player.resources -= chosenToken.quality;
          game.message(
            `{{player}} played a {{token}} token on a challenge card.`,
            { player, token: chosenToken.type }
          );
        } else {
          game.message(
            `{{player}} does not have enough resources or the space does not match the token type.`,
            { player }
          );
        }
      }),
      checkStatus: (player) => action({
        prompt: "Check the status of the game"
      }).do(() => {
        const principlesData = {};
        const activeStrategies = player.my("activeStrategies").all(StrategyCard);
        activeStrategies.forEach((strategy) => {
          strategy.contribution?.principles.forEach((principle) => {
            const principleKey = principle.principle;
            if (!principlesData[principleKey]) {
              principlesData[principleKey] = 0;
            }
            principlesData[principleKey] += principle.value || 0;
          });
        });
        const activeChallenges = player.my("challengeSlots").all(ChallengeCard);
        activeChallenges.forEach((challenge) => {
          const challengePrinciples = {};
          challenge.requirements?.principles.forEach((principle) => {
            const principleKey = principle.principle;
            challengePrinciples[principleKey] = principle.value || 0;
          });
          const passTest = Object.keys(challengePrinciples).every((principle) => {
            return (challengePrinciples[principle] || 0) <= (principlesData[principle] || 0);
          });
          const tokenSpaces = challenge.container(Slot).all(space_default).filter((space) => space.name === "tokenSpace");
          const tokens = tokenSpaces.flatMap((tokenSpace) => tokenSpace.all(Token));
          const uniqueTokenTypes = new Set(tokens.map((token) => token.type));
          if (passTest && uniqueTokenTypes.size >= 4) {
            challenge.is_complete = true;
            player.score += challenge.points || 0;
            challenge.putInto($.discarded);
            game.message(
              `{{player}} completed the challenge and earned {{points}} points.`,
              { player, points: challenge.points }
            );
          }
        });
        const wastedTokens = player.my("wastedResource").all(Token).length;
        if (player.score >= game.wincondition) {
          game.message(`{{player}} wins the game!`, { player });
          player.status = "win";
          game.finish(player);
        } else if (wastedTokens >= game.losecondition || player.my("pool").all(Token).length < 4 || game.round > game.maxRounds) {
          game.message(`{{player}} loses the game!`, { player });
          player.status = "lose";
        } else if (game.round <= 6) {
          game.message(`{{player}} proceeds to the next round with {{ score }} and resource {{ resource }}.`, { player, score: player.score, resource: player.resources });
          game.round += 1;
        }
      })
      // end of this action
    }), // THIS IS THE END OF DECLARING THE ACTIONS
    // Define game flow
    game.defineFlow(
      // Initial setup step
      // Draw initial hand of strategies
      // place initial challenge card, set round marker
      // ensure there is a challenge card in the first slot
      // ensure player has token pool
      () => {
        $.strategyDeck.shuffle();
        $.challengeDeck.shuffle();
        $.eventDeck.shuffle();
      },
      eachPlayer({
        name: "player",
        do: [
          // Draw initial hand of strategy cards (tokens are already in player pool)
          ({ player }) => {
            $.strategyDeck.firstN(game.handLimit, StrategyCard).putInto(player.my("hand"));
          },
          // Place an initial challenge card into the first challenge card slot
          ({ player }) => {
            $.challengeDeck.firstN(1, ChallengeCard).putInto($.slot0);
          },
          // Give players some extra challenges to look at
          ({ player }) => {
            $.challengeDeck.firstN(3, ChallengeCard).putInto(player.my("hand"));
          },
          // all the other challenge cards are in the deck  //challengeSpace.challengeSlots.slot0
          // Set the round marker to an initial state of 1
          () => {
            game.round = 1;
          }
        ]
      }),
      loop(
        whileLoop({
          // Outer loop runs until the current player wins or loses
          while: () => game.players.current().status !== "win" && game.players.current().status !== "lose",
          do: [
            eachPlayer({
              name: "playerinturnphase",
              // Loop through each player's turn
              do: [
                // Subflow for playing a round (custom logic inside this subflow)
                () => Do.subflow("playround"),
                // Draw an event card and resolve it
                playerActions({
                  actions: ["drawEvent"]
                }),
                // Check the player's status after the event
                playerActions({
                  actions: ["checkStatus"]
                }),
                // Reset player's resources after their turn is complete, and allow stash next turn
                () => {
                  game.players.current().resources = game.turnLimit;
                  game.players.current().stashedThisTurn = false;
                }
              ]
              // Exit each player's turn if they win or lose
            })
          ]
        })
      )
      /**
                   * 
                   * Loop attempt...also doesnt work
                   * 
                   * () => {
                      loop(
                          whileLoop({
                              while: () => game.players.current()!.score < game.wincondition &&
                                  game.players.current()!.my('wastedResource')!.all(Token).length < game.losecondition &&
                                  game.players.current()!.my('pool')!.all(Token).length >= 4 &&
                                  game.round <= game.maxRounds,
                              do: [
                                  eachPlayer({
                                      name: 'playerinturnphase',
                                      () => Do.subflow('playround'),
                                      playerActions({
                                          actions: ['drawEvent']
                                      }),
                                      () => game.players.current()!.resources = game.turnLimit, // Reset resources for the next round
                                      playerActions({
                                          actions: ['checkStatus']
                                      })
                                      })
                              ]
                          })
                          )}, // end of loop
                   * 
                   * 
                   * 
                   * 
                   * 
                   * 
                  eachPlayer({
                      name: 'eventphase',
                      do: [
                          playerActions({
                              actions: ['drawEvent']
                          })
                      ],
                  }),
                  
                  eachPlayer({
                      name: 'conditionCheckPhase',
                      do: [
                          () => game.players.current()!.resources = game.turnLimit, // I have to reset this at some point
      
                          playerActions({
                              actions: ['checkStatus']
                          })
                      ],
                  }), // end of this part of flow
                  */
    );
    game.defineSubflow(
      "playround",
      eachPlayer({
        name: "player",
        continueUntil: () => game.players.current().resources <= 0,
        //initial: game.players.current()!.resources = 3, // reset initial resources
        do: [
          // Reset initial resources for the player
          ({ player }) => {
            game.message(`{{player}} has {{resources}} resources to spend this turn.`, { player, resources: player.resources });
          },
          // Define the actions the player can take during their turn
          playerActions({
            actions: ["drawStrategyCard", "playInnovation", "playStrategyCard", "addChallengeCard", "stashCard", "skip"]
          })
        ]
      })
    );
  });

  // src/game/game-interface.ts
  var game_interface_default = createInterface(game_default2);
  return __toCommonJS(game_interface_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQtcmFuZG9tL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9qc29uLXN0cmluZ2lmeS1zYWZlL3N0cmluZ2lmeS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcmFuZG9tLXNlZWQvaW5kZXguanMiLCAiLi4vLi4vc3JjL2dhbWUvZ2FtZS1pbnRlcmZhY2UudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2JvYXJkL2VsZW1lbnQtY29sbGVjdGlvbi50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQGJvYXJkemlsbGEvY29yZS9zcmMvYWN0aW9uL3V0aWxzLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy91dGlscy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQGJvYXJkemlsbGEvY29yZS9zcmMvYm9hcmQvZWxlbWVudC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQGJvYXJkemlsbGEvY29yZS9zcmMvYm9hcmQvc3BhY2UudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2JvYXJkL3BpZWNlLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9wbGF5ZXIvcGxheWVyLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9hY3Rpb24vc2VsZWN0aW9uLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9hY3Rpb24vYWN0aW9uLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9mbG93L2VudW1zLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9mbG93L2Zsb3cudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL3BsYXllci9jb2xsZWN0aW9uLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9mbG93L2FjdGlvbi1zdGVwLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9mbG93L3doaWxlLWxvb3AudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2Zsb3cvZm9yLWxvb3AudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2Zsb3cvZm9yLWVhY2gudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2Zsb3cvZWFjaC1wbGF5ZXIudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2Zsb3cvc3dpdGNoLWNhc2UudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2Zsb3cvaWYtZWxzZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQGJvYXJkemlsbGEvY29yZS9zcmMvZmxvdy9ldmVyeS1wbGF5ZXIudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2JvYXJkL2dhbWUudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bib2FyZHppbGxhL2NvcmUvc3JjL2ludGVyZmFjZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQGJvYXJkemlsbGEvY29yZS9zcmMvZ2FtZS1tYW5hZ2VyLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AYm9hcmR6aWxsYS9jb3JlL3NyYy9nYW1lLWNyZWF0b3IudHMiLCAiLi4vLi4vc3JjL2dhbWUvcGllY2VzL2luZGV4LnRzIiwgIi4uLy4uL3NyYy9nYW1lL3BpZWNlcy9jaGFsbGVuZ2VzLnRzIiwgIi4uLy4uL3NyYy9nYW1lL3BpZWNlcy9zdHJhdGVnaWVzLnRzIiwgIi4uLy4uL3NyYy9nYW1lL3BpZWNlcy9ldmVudHMudHMiLCAiLi4vLi4vc3JjL2dhbWUvaW5kZXgudHMiXSwKICAic291cmNlUm9vdCI6ICJzcmMvZ2FtZSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uKCl7XG5cbiAgdmFyXG4gICAgYnVmLFxuICAgIGJ1ZklkeCA9IDAsXG4gICAgaGV4Qnl0ZXMgPSBbXSxcbiAgICBpXG4gIDtcblxuICAvLyBQcmUtY2FsY3VsYXRlIHRvU3RyaW5nKDE2KSBmb3Igc3BlZWRcbiAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgaGV4Qnl0ZXNbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xuICB9XG5cbiAgLy8gQnVmZmVyIHJhbmRvbSBudW1iZXJzIGZvciBzcGVlZFxuICAvLyBSZWR1Y2UgbWVtb3J5IHVzYWdlIGJ5IGRlY3JlYXNpbmcgdGhpcyBudW1iZXIgKG1pbiAxNilcbiAgLy8gb3IgaW1wcm92ZSBzcGVlZCBieSBpbmNyZWFzaW5nIHRoaXMgbnVtYmVyICh0cnkgMTYzODQpXG4gIHV1aWQuQlVGRkVSX1NJWkUgPSA0MDk2O1xuXG4gIC8vIEJpbmFyeSB1dWlkc1xuICB1dWlkLmJpbiA9IHV1aWRCaW47XG5cbiAgLy8gQ2xlYXIgYnVmZmVyXG4gIHV1aWQuY2xlYXJCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICBidWYgPSBudWxsO1xuICAgIGJ1ZklkeCA9IDA7XG4gIH07XG5cbiAgLy8gVGVzdCBmb3IgdXVpZFxuICB1dWlkLnRlc3QgPSBmdW5jdGlvbih1dWlkKSB7XG4gICAgaWYgKHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tNFswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaS50ZXN0KHV1aWQpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gTm9kZSAmIEJyb3dzZXIgc3VwcG9ydFxuICB2YXIgY3J5cHQwO1xuICBpZiAodHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjcnlwdDAgPSBjcnlwdG87XG4gIH0gZWxzZSBpZiggKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSAmJiAodHlwZW9mIHdpbmRvdy5tc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgY3J5cHQwID0gd2luZG93Lm1zQ3J5cHRvOyAvLyBJRTExXG4gIH1cblxuICBpZiAoKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSAmJiAodHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgY3J5cHQwID0gY3J5cHQwIHx8IHJlcXVpcmUoJ2NyeXB0bycpO1xuICAgIG1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy51dWlkID0gdXVpZDtcbiAgfVxuXG4gIC8vIFVzZSBiZXN0IGF2YWlsYWJsZSBQUk5HXG4gIC8vIEFsc28gZXhwb3NlIHRoaXMgc28geW91IGNhbiBvdmVycmlkZSBpdC5cbiAgdXVpZC5yYW5kb21CeXRlcyA9IChmdW5jdGlvbigpe1xuICAgIGlmIChjcnlwdDApIHtcbiAgICAgIGlmIChjcnlwdDAucmFuZG9tQnl0ZXMpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0MC5yYW5kb21CeXRlcztcbiAgICAgIH1cbiAgICAgIGlmIChjcnlwdDAuZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuc2xpY2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24obikge1xuICAgICAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobik7XG4gICAgICAgICAgICBjcnlwdDAuZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzKTtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tKGJ5dGVzKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobik7XG4gICAgICAgICAgY3J5cHQwLmdldFJhbmRvbVZhbHVlcyhieXRlcyk7XG4gICAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24obikge1xuICAgICAgdmFyIGksIHIgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgci5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgfSkoKTtcblxuICAvLyBCdWZmZXIgc29tZSByYW5kb20gYnl0ZXMgZm9yIHNwZWVkXG4gIGZ1bmN0aW9uIHJhbmRvbUJ5dGVzQnVmZmVyZWQobikge1xuICAgIGlmICghYnVmIHx8ICgoYnVmSWR4ICsgbikgPiB1dWlkLkJVRkZFUl9TSVpFKSkge1xuICAgICAgYnVmSWR4ID0gMDtcbiAgICAgIGJ1ZiA9IHV1aWQucmFuZG9tQnl0ZXModXVpZC5CVUZGRVJfU0laRSk7XG4gICAgfVxuICAgIHJldHVybiBidWYuc2xpY2UoYnVmSWR4LCBidWZJZHggKz0gbik7XG4gIH1cblxuICAvLyB1dWlkLmJpblxuICBmdW5jdGlvbiB1dWlkQmluKCkge1xuICAgIHZhciBiID0gcmFuZG9tQnl0ZXNCdWZmZXJlZCgxNik7XG4gICAgYls2XSA9IChiWzZdICYgMHgwZikgfCAweDQwO1xuICAgIGJbOF0gPSAoYls4XSAmIDB4M2YpIHwgMHg4MDtcbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8vIFN0cmluZyBVVUlEdjQgKFJhbmRvbSlcbiAgZnVuY3Rpb24gdXVpZCgpIHtcbiAgICB2YXIgYiA9IHV1aWRCaW4oKTtcbiAgICByZXR1cm4gaGV4Qnl0ZXNbYlswXV0gKyBoZXhCeXRlc1tiWzFdXSArXG4gICAgICBoZXhCeXRlc1tiWzJdXSArIGhleEJ5dGVzW2JbM11dICsgJy0nICtcbiAgICAgIGhleEJ5dGVzW2JbNF1dICsgaGV4Qnl0ZXNbYls1XV0gKyAnLScgK1xuICAgICAgaGV4Qnl0ZXNbYls2XV0gKyBoZXhCeXRlc1tiWzddXSArICctJyArXG4gICAgICBoZXhCeXRlc1tiWzhdXSArIGhleEJ5dGVzW2JbOV1dICsgJy0nICtcbiAgICAgIGhleEJ5dGVzW2JbMTBdXSArIGhleEJ5dGVzW2JbMTFdXSArXG4gICAgICBoZXhCeXRlc1tiWzEyXV0gKyBoZXhCeXRlc1tiWzEzXV0gK1xuICAgICAgaGV4Qnl0ZXNbYlsxNF1dICsgaGV4Qnl0ZXNbYlsxNV1dXG4gICAgO1xuICB9XG5cbn0pKCk7XG4iLCAiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gc3RyaW5naWZ5XG5leHBvcnRzLmdldFNlcmlhbGl6ZSA9IHNlcmlhbGl6ZXJcblxuZnVuY3Rpb24gc3RyaW5naWZ5KG9iaiwgcmVwbGFjZXIsIHNwYWNlcywgY3ljbGVSZXBsYWNlcikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBzZXJpYWxpemVyKHJlcGxhY2VyLCBjeWNsZVJlcGxhY2VyKSwgc3BhY2VzKVxufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVyKHJlcGxhY2VyLCBjeWNsZVJlcGxhY2VyKSB7XG4gIHZhciBzdGFjayA9IFtdLCBrZXlzID0gW11cblxuICBpZiAoY3ljbGVSZXBsYWNlciA9PSBudWxsKSBjeWNsZVJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChzdGFja1swXSA9PT0gdmFsdWUpIHJldHVybiBcIltDaXJjdWxhciB+XVwiXG4gICAgcmV0dXJuIFwiW0NpcmN1bGFyIH4uXCIgKyBrZXlzLnNsaWNlKDAsIHN0YWNrLmluZGV4T2YodmFsdWUpKS5qb2luKFwiLlwiKSArIFwiXVwiXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgdGhpc1BvcyA9IHN0YWNrLmluZGV4T2YodGhpcylcbiAgICAgIH50aGlzUG9zID8gc3RhY2suc3BsaWNlKHRoaXNQb3MgKyAxKSA6IHN0YWNrLnB1c2godGhpcylcbiAgICAgIH50aGlzUG9zID8ga2V5cy5zcGxpY2UodGhpc1BvcywgSW5maW5pdHksIGtleSkgOiBrZXlzLnB1c2goa2V5KVxuICAgICAgaWYgKH5zdGFjay5pbmRleE9mKHZhbHVlKSkgdmFsdWUgPSBjeWNsZVJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSlcbiAgICB9XG4gICAgZWxzZSBzdGFjay5wdXNoKHZhbHVlKVxuXG4gICAgcmV0dXJuIHJlcGxhY2VyID09IG51bGwgPyB2YWx1ZSA6IHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSlcbiAgfVxufVxuIiwgIi8qXG4gKiByYW5kb20tc2VlZFxuICogaHR0cHM6Ly9naXRodWIuY29tL3NrcmF0Y2hkb3QvcmFuZG9tLXNlZWRcbiAqXG4gKiBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBTdGV2ZSBHaWJzb24gYW5kIGNhbiBiZSBmb3VuZCBoZXJlOlxuICpcbiAqIGh0dHBzOi8vd3d3LmdyYy5jb20vb3RnL3VoZXBybmcuaHRtXG4gKlxuICogSXQgd2FzIHNsaWdodGx5IG1vZGlmaWVkIGZvciB1c2UgaW4gbm9kZSwgdG8gcGFzcyBqc2hpbnQsIGFuZCBhIGZldyBhZGRpdGlvbmFsXG4gKiBoZWxwZXIgZnVuY3Rpb25zIHdlcmUgYWRkZWQuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzIHNrcmF0Y2hkb3RcbiAqIER1YWwgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGFuZCB0aGUgb3JpZ2luYWwgR1JDIGNvcHlyaWdodC9saWNlbnNlXG4gKiBpbmNsdWRlZCBiZWxvdy5cbiAqL1xuLypcdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0XHRcdFx0XHRcdFx0XHRcdEdpYnNvbiBSZXNlYXJjaCBDb3Jwb3JhdGlvblxuXHRcdFx0XHRVSEVQUk5HIC0gVWx0cmEgSGlnaCBFbnRyb3B5IFBzZXVkby1SYW5kb20gTnVtYmVyIEdlbmVyYXRvclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdExJQ0VOU0UgQU5EIENPUFlSSUdIVDogIFRISVMgQ09ERSBJUyBIRVJFQlkgUkVMRUFTRUQgSU5UTyBUSEUgUFVCTElDIERPTUFJTlxuXHRHaWJzb24gUmVzZWFyY2ggQ29ycG9yYXRpb24gcmVsZWFzZXMgYW5kIGRpc2NsYWltcyBBTEwgUklHSFRTIEFORCBUSVRMRSBJTlxuXHRUSElTIENPREUgT1IgQU5ZIERFUklWQVRJVkVTLiBBbnlvbmUgbWF5IGJlIGZyZWVseSB1c2UgaXQgZm9yIGFueSBwdXJwb3NlLlxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFRoaXMgaXMgR1JDJ3MgY3J5cHRvZ3JhcGhpY2FsbHkgc3Ryb25nIFBSTkcgKHBzZXVkby1yYW5kb20gbnVtYmVyIGdlbmVyYXRvcilcblx0Zm9yIEphdmFTY3JpcHQuIEl0IGlzIGRyaXZlbiBieSAxNTM2IGJpdHMgb2YgZW50cm9weSwgc3RvcmVkIGluIGFuIGFycmF5IG9mXG5cdDQ4LCAzMi1iaXQgSmF2YVNjcmlwdCB2YXJpYWJsZXMuICBTaW5jZSBtYW55IGFwcGxpY2F0aW9ucyBvZiB0aGlzIGdlbmVyYXRvcixcblx0aW5jbHVkaW5nIG91cnMgd2l0aCB0aGUgXCJPZmYgVGhlIEdyaWRcIiBMYXRpbiBTcXVhcmUgZ2VuZXJhdG9yLCBtYXkgcmVxdWlyZVxuXHR0aGUgZGV0ZXJpbWluaXN0aWMgcmUtZ2VuZXJhdGlvbiBvZiBhIHNlcXVlbmNlIG9mIFBSTnMsIHRoaXMgUFJORydzIGluaXRpYWxcblx0ZW50cm9waWMgc3RhdGUgY2FuIGJlIHJlYWQgYW5kIHdyaXR0ZW4gYXMgYSBzdGF0aWMgd2hvbGUsIGFuZCBpbmNyZW1lbnRhbGx5XG5cdGV2b2x2ZWQgYnkgcG91cmluZyBuZXcgc291cmNlIGVudHJvcHkgaW50byB0aGUgZ2VuZXJhdG9yJ3MgaW50ZXJuYWwgc3RhdGUuXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0RU5ETEVTUyBUSEFOS1MgYXJlIGR1ZSBKb2hhbm5lcyBCYWFnb2UgZm9yIGhpcyBjYXJlZnVsIGRldmVsb3BtZW50IG9mIGhpZ2hseVxuXHRyb2J1c3QgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbnMgb2YgSlMgUFJOR3MuICBUaGlzIHdvcmsgd2FzIGJhc2VkIHVwb24gaGlzXG5cdEphdmFTY3JpcHQgXCJBbGVhXCIgUFJORyB3aGljaCBpcyBiYXNlZCB1cG9uIHRoZSBleHRyZW1lbHkgcm9idXN0IE11bHRpcGx5LVxuXHRXaXRoLUNhcnJ5IChNV0MpIFBSTkcgaW52ZW50ZWQgYnkgR2VvcmdlIE1hcnNhZ2xpYS4gTVdDIEFsZ29yaXRobSBSZWZlcmVuY2VzOlxuXHRodHRwOi8vd3d3LkdSQy5jb20vb3RnL01hcnNhZ2xpYV9QUk5Hcy5wZGZcblx0aHR0cDovL3d3dy5HUkMuY29tL290Zy9NYXJzYWdsaWFfTVdDX0dlbmVyYXRvcnMucGRmXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0VGhlIHF1YWxpdHkgb2YgdGhpcyBhbGdvcml0aG0ncyBwc2V1ZG8tcmFuZG9tIG51bWJlcnMgaGF2ZSBiZWVuIHZlcmlmaWVkIGJ5XG5cdG11bHRpcGxlIGluZGVwZW5kZW50IHJlc2VhcmNoZXJzLiBJdCBoYW5kaWx5IHBhc3NlcyB0aGUgZmVybWlsYWIuY2ggdGVzdHMgYXNcblx0d2VsbCBhcyB0aGUgXCJkaWVoYXJkXCIgYW5kIFwiZGllaGFyZGVyXCIgdGVzdCBzdWl0ZXMuICBGb3IgaW5kaXZpZHVhbHMgd2lzaGluZ1xuXHR0byBmdXJ0aGVyIHZlcmlmeSB0aGUgcXVhbGl0eSBvZiB0aGlzIGFsZ29yaXRobSdzIHBzZXVkby1yYW5kb20gbnVtYmVycywgYVxuXHQyNTYtbWVnYWJ5dGUgZmlsZSBvZiB0aGlzIGFsZ29yaXRobSdzIG91dHB1dCBtYXkgYmUgZG93bmxvYWRlZCBmcm9tIEdSQy5jb20sXG5cdGFuZCBhIE1pY3Jvc29mdCBXaW5kb3dzIHNjcmlwdGluZyBob3N0IChXU0gpIHZlcnNpb24gb2YgdGhpcyBhbGdvcml0aG0gbWF5IGJlXG5cdGRvd25sb2FkZWQgYW5kIHJ1biBmcm9tIHRoZSBXaW5kb3dzIGNvbW1hbmQgcHJvbXB0IHRvIGdlbmVyYXRlIHVuaXF1ZSBmaWxlc1xuXHRvZiBhbnkgc2l6ZTpcblx0VGhlIEZlcm1pbGFiIFwiRU5UXCIgdGVzdHM6IGh0dHA6Ly9mb3VybWlsYWIuY2gvcmFuZG9tL1xuXHRUaGUgMjU2LW1lZ2FieXRlIHNhbXBsZSBQUk4gZmlsZSBhdCBHUkM6IGh0dHBzOi8vd3d3LkdSQy5jb20vb3RnL3VoZXBybmcuYmluXG5cdFRoZSBXaW5kb3dzIHNjcmlwdGluZyBob3N0IHZlcnNpb246IGh0dHBzOi8vd3d3LkdSQy5jb20vb3RnL3dzaC11aGVwcm5nLmpzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0UXVhbGlmeWluZyBNV0MgbXVsdGlwbGllcnMgYXJlOiAxODc4ODQsIDY4NjExOCwgODk4MTM0LCAxMTA0Mzc1LCAxMjUwMjA1LFxuXHQxNDYwOTEwIGFuZCAxNzY4ODYzLiAoV2UgdXNlIHRoZSBsYXJnZXN0IG9uZSB0aGF0J3MgPCAyXjIxKVxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4ndXNlIHN0cmljdCc7XG52YXIgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuXG4vKlx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuVGhpcyBpcyBiYXNlZCB1cG9uIEpvaGFubmVzIEJhYWdvZSdzIGNhcmVmdWxseSBkZXNpZ25lZCBhbmQgZWZmaWNpZW50IGhhc2hcbmZ1bmN0aW9uIGZvciB1c2Ugd2l0aCBKYXZhU2NyaXB0LiAgSXQgaGFzIGEgcHJvdmVuIFwiYXZhbGFuY2hlXCIgZWZmZWN0IHN1Y2hcbnRoYXQgZXZlcnkgYml0IG9mIHRoZSBpbnB1dCBhZmZlY3RzIGV2ZXJ5IGJpdCBvZiB0aGUgb3V0cHV0IDUwJSBvZiB0aGUgdGltZSxcbndoaWNoIGlzIGdvb2QuXHRTZWU6IGh0dHA6Ly9iYWFnb2UuY29tL2VuL1JhbmRvbU11c2luZ3MvaGFzaC9hdmFsYW5jaGUueGh0bWxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiovXG52YXIgTWFzaCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIG4gPSAweGVmYzgyNDlkO1xuXHR2YXIgbWFzaCA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGRhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0biArPSBkYXRhLmNoYXJDb2RlQXQoaSk7XG5cdFx0XHRcdHZhciBoID0gMC4wMjUxOTYwMzI4MjQxNjkzOCAqIG47XG5cdFx0XHRcdG4gPSBoID4+PiAwO1xuXHRcdFx0XHRoIC09IG47XG5cdFx0XHRcdGggKj0gbjtcblx0XHRcdFx0biA9IGggPj4+IDA7XG5cdFx0XHRcdGggLT0gbjtcblx0XHRcdFx0biArPSBoICogMHgxMDAwMDAwMDA7IC8vIDJeMzJcblx0XHRcdH1cblx0XHRcdHJldHVybiAobiA+Pj4gMCkgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRuID0gMHhlZmM4MjQ5ZDtcblx0XHR9XG5cdH07XG5cdHJldHVybiBtYXNoO1xufTtcblxudmFyIHVoZXBybmcgPSBmdW5jdGlvbiAoc2VlZCkge1xuXHRyZXR1cm4gKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbyA9IDQ4OyAvLyBzZXQgdGhlICdvcmRlcicgbnVtYmVyIG9mIEVOVFJPUFktaG9sZGluZyAzMi1iaXQgdmFsdWVzXG5cdFx0dmFyIGMgPSAxOyAvLyBpbml0IHRoZSAnY2FycnknIHVzZWQgYnkgdGhlIG11bHRpcGx5LXdpdGgtY2FycnkgKE1XQykgYWxnb3JpdGhtXG5cdFx0dmFyIHAgPSBvOyAvLyBpbml0IHRoZSAncGhhc2UnIChtYXgtMSkgb2YgdGhlIGludGVybWVkaWF0ZSB2YXJpYWJsZSBwb2ludGVyXG5cdFx0dmFyIHMgPSBuZXcgQXJyYXkobyk7IC8vIGRlY2xhcmUgb3VyIGludGVybWVkaWF0ZSB2YXJpYWJsZXMgYXJyYXlcblx0XHR2YXIgaTsgLy8gZ2VuZXJhbCBwdXJwb3NlIGxvY2FsXG5cdFx0dmFyIGo7IC8vIGdlbmVyYWwgcHVycG9zZSBsb2NhbFxuXHRcdHZhciBrID0gMDsgLy8gZ2VuZXJhbCBwdXJwb3NlIGxvY2FsXG5cblx0XHQvLyB3aGVuIG91ciBcInVoZXBybmdcIiBpcyBpbml0aWFsbHkgaW52b2tlZCBvdXIgUFJORyBzdGF0ZSBpcyBpbml0aWFsaXplZCBmcm9tIHRoZVxuXHRcdC8vIGJyb3dzZXIncyBvd24gbG9jYWwgUFJORy4gVGhpcyBpcyBva2F5IHNpbmNlIGFsdGhvdWdoIGl0cyBnZW5lcmF0b3IgbWlnaHQgbm90XG5cdFx0Ly8gYmUgd29uZGVyZnVsLCBpdCdzIHVzZWZ1bCBmb3IgZXN0YWJsaXNoaW5nIGxhcmdlIHN0YXJ0dXAgZW50cm9weSBmb3Igb3VyIHVzYWdlLlxuXHRcdHZhciBtYXNoID0gbmV3IE1hc2goKTsgLy8gZ2V0IGEgcG9pbnRlciB0byBvdXIgaGlnaC1wZXJmb3JtYW5jZSBcIk1hc2hcIiBoYXNoXG5cblx0XHQvLyBmaWxsIHRoZSBhcnJheSB3aXRoIGluaXRpYWwgbWFzaCBoYXNoIHZhbHVlc1xuXHRcdGZvciAoaSA9IDA7IGkgPCBvOyBpKyspIHtcblx0XHRcdHNbaV0gPSBtYXNoKE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblxuXHRcdC8vIHRoaXMgUFJJVkFURSAoaW50ZXJuYWwgYWNjZXNzIG9ubHkpIGZ1bmN0aW9uIGlzIHRoZSBoZWFydCBvZiB0aGUgbXVsdGlwbHktd2l0aC1jYXJyeVxuXHRcdC8vIChNV0MpIFBSTkcgYWxnb3JpdGhtLiBXaGVuIGNhbGxlZCBpdCByZXR1cm5zIGEgcHNldWRvLXJhbmRvbSBudW1iZXIgaW4gdGhlIGZvcm0gb2YgYVxuXHRcdC8vIDMyLWJpdCBKYXZhU2NyaXB0IGZyYWN0aW9uICgwLjAgdG8gPDEuMCkgaXQgaXMgYSBQUklWQVRFIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIGRlZmF1bHRcblx0XHQvLyBbMC0xXSByZXR1cm4gZnVuY3Rpb24sIGFuZCBieSB0aGUgcmFuZG9tICdzdHJpbmcobiknIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgJ24nXG5cdFx0Ly8gY2hhcmFjdGVycyBmcm9tIDMzIHRvIDEyNi5cblx0XHR2YXIgcmF3cHJuZyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICgrK3AgPj0gbykge1xuXHRcdFx0XHRwID0gMDtcblx0XHRcdH1cblx0XHRcdHZhciB0ID0gMTc2ODg2MyAqIHNbcF0gKyBjICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcblx0XHRcdHJldHVybiBzW3BdID0gdCAtIChjID0gdCB8IDApO1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIGZ1bmN0aW9uIGlzIHRoZSBkZWZhdWx0IGZ1bmN0aW9uIHJldHVybmVkIGJ5IHRoaXMgbGlicmFyeS5cblx0XHQvLyBUaGUgdmFsdWVzIHJldHVybmVkIGFyZSBpbnRlZ2VycyBpbiB0aGUgcmFuZ2UgZnJvbSAwIHRvIHJhbmdlLTEuIFdlIGZpcnN0XG5cdFx0Ly8gb2J0YWluIHR3byAzMi1iaXQgZnJhY3Rpb25zIChmcm9tIHJhd3BybmcpIHRvIHN5bnRoZXNpemUgYSBzaW5nbGUgaGlnaFxuXHRcdC8vIHJlc29sdXRpb24gNTMtYml0IHBybmcgKDAgdG8gPDEpLCB0aGVuIHdlIG11bHRpcGx5IHRoaXMgYnkgdGhlIGNhbGxlcidzXG5cdFx0Ly8gXCJyYW5nZVwiIHBhcmFtIGFuZCB0YWtlIHRoZSBcImZsb29yXCIgdG8gcmV0dXJuIGEgZXF1YWxseSBwcm9iYWJsZSBpbnRlZ2VyLlxuXHRcdHZhciByYW5kb20gPSBmdW5jdGlvbiAocmFuZ2UpIHtcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHJhbmdlICogKHJhd3BybmcoKSArIChyYXdwcm5nKCkgKiAweDIwMDAwMCB8IDApICogMS4xMTAyMjMwMjQ2MjUxNTY1ZS0xNikpOyAvLyAyXi01M1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIGZ1bmN0aW9uICdzdHJpbmcobiknIHJldHVybnMgYSBwc2V1ZG8tcmFuZG9tIHN0cmluZyBvZlxuXHRcdC8vICduJyBwcmludGFibGUgY2hhcmFjdGVycyByYW5naW5nIGZyb20gY2hyKDMzKSB0byBjaHIoMTI2KSBpbmNsdXNpdmUuXG5cdFx0cmFuZG9tLnN0cmluZyA9IGZ1bmN0aW9uIChjb3VudCkge1xuXHRcdFx0dmFyIGk7XG5cdFx0XHR2YXIgcyA9ICcnO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblx0XHRcdFx0cyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDMzICsgcmFuZG9tKDk0KSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcztcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBQUklWQVRFIFwiaGFzaFwiIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZXZvbHZlIHRoZSBnZW5lcmF0b3IncyBpbnRlcm5hbFxuXHRcdC8vIGVudHJvcHkgc3RhdGUuIEl0IGlzIGFsc28gY2FsbGVkIGJ5IHRoZSBFWFBPUlRFRCBhZGRFbnRyb3B5KCkgZnVuY3Rpb25cblx0XHQvLyB3aGljaCBpcyB1c2VkIHRvIHBvdXIgZW50cm9weSBpbnRvIHRoZSBQUk5HLlxuXHRcdHZhciBoYXNoID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG87IGorKykge1xuXHRcdFx0XHRcdHNbal0gLT0gbWFzaChhcmdzW2ldKTtcblx0XHRcdFx0XHRpZiAoc1tqXSA8IDApIHtcblx0XHRcdFx0XHRcdHNbal0gKz0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBcImNsZWFuIHN0cmluZ1wiIGZ1bmN0aW9uIHJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgc3BhY2VzIGFuZCBub24tcHJpbnRpbmdcblx0XHQvLyBjb250cm9sIGNoYXJhY3RlcnMsIGluY2x1ZGluZyBhbnkgZW1iZWRkZWQgY2FycmlhZ2UtcmV0dXJuIChDUikgYW5kIGxpbmUtZmVlZCAoTEYpIGNoYXJhY3RlcnMsXG5cdFx0Ly8gZnJvbSBhbnkgc3RyaW5nIGl0IGlzIGhhbmRlZC4gdGhpcyBpcyBhbHNvIHVzZWQgYnkgdGhlICdoYXNoc3RyaW5nJyBmdW5jdGlvbiAoYmVsb3cpIHRvIGhlbHBcblx0XHQvLyB1c2VycyBhbHdheXMgb2J0YWluIHRoZSBzYW1lIEVGRkVDVElWRSB1aGVwcm5nIHNlZWRpbmcga2V5LlxuXHRcdHJhbmRvbS5jbGVhblN0cmluZyA9IGZ1bmN0aW9uIChpblN0cikge1xuXHRcdFx0aW5TdHIgPSBpblN0ci5yZXBsYWNlKC8oXlxccyopfChcXHMqJCkvZ2ksICcnKTsgLy8gcmVtb3ZlIGFueS9hbGwgbGVhZGluZyBzcGFjZXNcblx0XHRcdGluU3RyID0gaW5TdHIucmVwbGFjZSgvW1xceDAwLVxceDFGXS9naSwgJycpOyAvLyByZW1vdmUgYW55L2FsbCBjb250cm9sIGNoYXJhY3RlcnNcblx0XHRcdGluU3RyID0gaW5TdHIucmVwbGFjZSgvXFxuIC8sICdcXG4nKTsgLy8gcmVtb3ZlIGFueS9hbGwgdHJhaWxpbmcgc3BhY2VzXG5cdFx0XHRyZXR1cm4gaW5TdHI7IC8vIHJldHVybiB0aGUgY2xlYW5lZCB1cCByZXN1bHRcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBcImhhc2ggc3RyaW5nXCIgZnVuY3Rpb24gaGFzaGVzIHRoZSBwcm92aWRlZCBjaGFyYWN0ZXIgc3RyaW5nIGFmdGVyIGZpcnN0IHJlbW92aW5nXG5cdFx0Ly8gYW55IGxlYWRpbmcgb3IgdHJhaWxpbmcgc3BhY2VzIGFuZCBpZ25vcmluZyBhbnkgZW1iZWRkZWQgY2FycmlhZ2UgcmV0dXJucyAoQ1IpIG9yIExpbmUgRmVlZHMgKExGKVxuXHRcdHJhbmRvbS5oYXNoU3RyaW5nID0gZnVuY3Rpb24gKGluU3RyKSB7XG5cdFx0XHRpblN0ciA9IHJhbmRvbS5jbGVhblN0cmluZyhpblN0cik7XG5cdFx0XHRtYXNoKGluU3RyKTsgLy8gdXNlIHRoZSBzdHJpbmcgdG8gZXZvbHZlIHRoZSAnbWFzaCcgc3RhdGVcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBpblN0ci5sZW5ndGg7IGkrKykgeyAvLyBzY2FuIHRocm91Z2ggdGhlIGNoYXJhY3RlcnMgaW4gb3VyIHN0cmluZ1xuXHRcdFx0XHRrID0gaW5TdHIuY2hhckNvZGVBdChpKTsgLy8gZ2V0IHRoZSBjaGFyYWN0ZXIgY29kZSBhdCB0aGUgbG9jYXRpb25cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG87IGorKykgeyAvL1x0XCJtYXNoXCIgaXQgaW50byB0aGUgVUhFUFJORyBzdGF0ZVxuXHRcdFx0XHRcdHNbal0gLT0gbWFzaChrKTtcblx0XHRcdFx0XHRpZiAoc1tqXSA8IDApIHtcblx0XHRcdFx0XHRcdHNbal0gKz0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNlZWQgdGhlIHJhbmRvbSBnZW5lcmF0b3IuXG5cdFx0cmFuZG9tLnNlZWQgPSBmdW5jdGlvbiAoc2VlZCkge1xuXHRcdFx0aWYgKHR5cGVvZiBzZWVkID09PSAndW5kZWZpbmVkJyB8fCBzZWVkID09PSBudWxsKSB7XG5cdFx0XHRcdHNlZWQgPSBNYXRoLnJhbmRvbSgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBzZWVkICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRzZWVkID0gc3RyaW5naWZ5KHNlZWQsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICh2YWx1ZSkudG9TdHJpbmcoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJhbmRvbS5pbml0U3RhdGUoKTtcblx0XHRcdHJhbmRvbS5oYXNoU3RyaW5nKHNlZWQpO1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIGhhbmR5IGV4cG9ydGVkIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYWRkIGVudHJvcHkgdG8gb3VyIHVoZXBybmcgYXQgYW55IHRpbWVcblx0XHRyYW5kb20uYWRkRW50cm9weSA9IGZ1bmN0aW9uICggLyogYWNjZXB0IHplcm8gb3IgbW9yZSBhcmd1bWVudHMgKi8gKSB7XG5cdFx0XHR2YXIgYXJncyA9IFtdO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHRcdH1cblx0XHRcdGhhc2goKGsrKykgKyAobmV3IERhdGUoKS5nZXRUaW1lKCkpICsgYXJncy5qb2luKCcnKSArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH07XG5cblx0XHQvLyBpZiB3ZSB3YW50IHRvIHByb3ZpZGUgYSBkZXRlcm1pbmlzdGljIHN0YXJ0dXAgY29udGV4dCBmb3Igb3VyIFBSTkcsXG5cdFx0Ly8gYnV0IHdpdGhvdXQgZGlyZWN0bHkgc2V0dGluZyB0aGUgaW50ZXJuYWwgc3RhdGUgdmFyaWFibGVzLCB0aGlzIGFsbG93c1xuXHRcdC8vIHVzIHRvIGluaXRpYWxpemUgdGhlIG1hc2ggaGFzaCBhbmQgUFJORydzIGludGVybmFsIHN0YXRlIGJlZm9yZSBwcm92aWRpbmdcblx0XHQvLyBzb21lIGhhc2hpbmcgaW5wdXRcblx0XHRyYW5kb20uaW5pdFN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0bWFzaCgpOyAvLyBwYXNzIGEgbnVsbCBhcmcgdG8gZm9yY2UgbWFzaCBoYXNoIHRvIGluaXRcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBvOyBpKyspIHtcblx0XHRcdFx0c1tpXSA9IG1hc2goJyAnKTsgLy8gZmlsbCB0aGUgYXJyYXkgd2l0aCBpbml0aWFsIG1hc2ggaGFzaCB2YWx1ZXNcblx0XHRcdH1cblx0XHRcdGMgPSAxOyAvLyBpbml0IG91ciBtdWx0aXBseS13aXRoLWNhcnJ5IGNhcnJ5XG5cdFx0XHRwID0gbzsgLy8gaW5pdCBvdXIgcGhhc2Vcblx0XHR9O1xuXG5cdFx0Ly8gd2UgdXNlIHRoaXMgKG9wdGlvbmFsKSBleHBvcnRlZCBmdW5jdGlvbiB0byBzaWduYWwgdGhlIEphdmFTY3JpcHQgaW50ZXJwcmV0ZXJcblx0XHQvLyB0aGF0IHdlJ3JlIGZpbmlzaGVkIHVzaW5nIHRoZSBcIk1hc2hcIiBoYXNoIGZ1bmN0aW9uIHNvIHRoYXQgaXQgY2FuIGZyZWUgdXAgdGhlXG5cdFx0Ly8gbG9jYWwgXCJpbnN0YW5jZSB2YXJpYWJsZXNcIiBpcyB3aWxsIGhhdmUgYmVlbiBtYWludGFpbmluZy4gIEl0J3Mgbm90IHN0cmljdGx5XG5cdFx0Ly8gbmVjZXNzYXJ5LCBvZiBjb3Vyc2UsIGJ1dCBpdCdzIGdvb2QgSmF2YVNjcmlwdCBjaXRpemVuc2hpcC5cblx0XHRyYW5kb20uZG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG1hc2ggPSBudWxsO1xuXHRcdH07XG5cblx0XHQvLyBpZiB3ZSBjYWxsZWQgXCJ1aGVwcm5nXCIgd2l0aCBhIHNlZWQgdmFsdWUsIHRoZW4gZXhlY3V0ZSByYW5kb20uc2VlZCgpIGJlZm9yZSByZXR1cm5pbmdcblx0XHRpZiAodHlwZW9mIHNlZWQgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyYW5kb20uc2VlZChzZWVkKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiAwIChpbmNsdXNpdmUpIGFuZCByYW5nZSAoZXhjbHVzaXZlKVxuXHRcdHJhbmRvbS5yYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuXHRcdFx0cmV0dXJuIHJhbmRvbShyYW5nZSk7XG5cdFx0fTtcblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gZmxvYXQgYmV0d2VlbiAwIChpbmNsdXNpdmUpIGFuZCAxIChleGNsdXNpdmUpXG5cdFx0cmFuZG9tLnJhbmRvbSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiByYW5kb20oTnVtYmVyLk1BWF9WQUxVRSAtIDEpIC8gTnVtYmVyLk1BWF9WQUxVRTtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBmbG9hdCBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChleGNsdXNpdmUpXG5cdFx0cmFuZG9tLmZsb2F0QmV0d2VlbiA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuXHRcdFx0cmV0dXJuIHJhbmRvbS5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoaW5jbHVzaXZlKVxuXHRcdHJhbmRvbS5pbnRCZXR3ZWVuID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihyYW5kb20ucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuXHRcdH07XG5cblx0XHQvLyB3aGVuIG91ciBtYWluIG91dGVyIFwidWhlcHJuZ1wiIGZ1bmN0aW9uIGlzIGNhbGxlZCwgYWZ0ZXIgc2V0dGluZyB1cCBvdXJcblx0XHQvLyBpbml0aWFsIHZhcmlhYmxlcyBhbmQgZW50cm9waWMgc3RhdGUsIHdlIHJldHVybiBhbiBcImluc3RhbmNlIHBvaW50ZXJcIlxuXHRcdC8vIHRvIHRoZSBpbnRlcm5hbCBhbm9ueW1vdXMgZnVuY3Rpb24gd2hpY2ggY2FuIHRoZW4gYmUgdXNlZCB0byBhY2Nlc3Ncblx0XHQvLyB0aGUgdWhlcHJuZydzIHZhcmlvdXMgZXhwb3J0ZWQgZnVuY3Rpb25zLiAgQXMgd2l0aCB0aGUgXCIuZG9uZVwiIGZ1bmN0aW9uXG5cdFx0Ly8gYWJvdmUsIHdlIHNob3VsZCBzZXQgdGhlIHJldHVybmVkIHZhbHVlIHRvICdudWxsJyBvbmNlIHdlJ3JlIGZpbmlzaGVkXG5cdFx0Ly8gdXNpbmcgYW55IG9mIHRoZXNlIGZ1bmN0aW9ucy5cblx0XHRyZXR1cm4gcmFuZG9tO1xuXHR9KCkpO1xufTtcblxuLy8gTW9kaWZpY2F0aW9uIGZvciB1c2UgaW4gbm9kZTpcbnVoZXBybmcuY3JlYXRlID0gZnVuY3Rpb24gKHNlZWQpIHtcblx0cmV0dXJuIG5ldyB1aGVwcm5nKHNlZWQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gdWhlcHJuZztcbiIsICJpbXBvcnQgc2V0dXAgZnJvbSAnLi9pbmRleC5qcyc7XG5pbXBvcnQgeyBjcmVhdGVJbnRlcmZhY2UgfSBmcm9tICdAYm9hcmR6aWxsYS9jb3JlJztcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSW50ZXJmYWNlKHNldHVwKTtcbiIsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsICJpbXBvcnQgeyBQaWVjZSwgU3BhY2UgfSBmcm9tICdAYm9hcmR6aWxsYS9jb3JlJztcbmltcG9ydCB7IFRyYWRlb2ZmcyB9IGZyb20gJy4uL2luZGV4LnRzJztcblxuZXhwb3J0IGNsYXNzIFRva2VuIGV4dGVuZHMgUGllY2U8VHJhZGVvZmZzPiB7XG4gICAgdHlwZTogJ0RhdGEnIHwgJ01ldGhvZCcgfCAnVXNlcicgfCAnQWltJztcbiAgICBxdWFsaXR5OiBudW1iZXI7IC8vIDEsIDIsIG9yIDNcbiAgICBzaWRlOiAndXAnIHwgJ2Rvd24nO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBTY29yZUNvdW50ZXIgZXh0ZW5kcyBQaWVjZTxUcmFkZW9mZnM+IHtcbiAgICB2YWx1ZTogbnVtYmVyOyAvLyAxLTEwXG59XG5cbmV4cG9ydCBjbGFzcyBTbG90IGV4dGVuZHMgU3BhY2U8VHJhZGVvZmZzPiB7XG4gICAgdHlwZTogJ3Nsb3QnOyAvLyB0aGlzIGlzIGp1c3Qgc28gSSBjYW4gcmVmZXIgdG8gdGhlbSBlYXNpbHlcbiAgICBncm91cDogJ2NoYWxsZW5nZXNsb3QnIHwgJ3N0cmF0ZWd5c2xvdCc7XG59XG5cbiIsICJpbXBvcnQgeyBQaWVjZSB9IGZyb20gJ0Bib2FyZHppbGxhL2NvcmUnO1xuaW1wb3J0IHsgVHJhZGVvZmZzIH0gZnJvbSAnLi4vaW5kZXgudHMnO1xuXG5leHBvcnQgY2xhc3MgQ2hhbGxlbmdlQ2FyZCBleHRlbmRzIFBpZWNlPFRyYWRlb2Zmcz4ge1xuICAgIHByb2JsZW06IHN0cmluZztcbiAgICBwb2ludHM6IG51bWJlcjtcbiAgICBpbXBhY3RpbmdfZXZlbnRzOiBzdHJpbmdbXTtcbiAgICBwcm9ibGVtX2RldGFpbDogc3RyaW5nO1xuICAgIGlzX2NvbXBsZXRlOiBib29sZWFuO1xuICAgIHJlcXVpcmVtZW50czoge1xuICAgICAgICBibG9ja3M6IG51bWJlcjtcbiAgICAgICAgcHJpbmNpcGxlczogeyBwcmluY2lwbGU/OiBzdHJpbmcgfCBudW1iZXI7IHZhbHVlPzogbnVtYmVyOyBuYW1lOiBzdHJpbmcgfVtdO1xuICAgIH07ICBcbn1cblxuZXhwb3J0IGNvbnN0IGNoYWxsZW5nZUNhcmRzOiBQYXJ0aWFsPENoYWxsZW5nZUNhcmQ+W10gPSBbXG4gICAge1xuICAgICAgICBwcm9ibGVtOiBcIlRlYWNoZXIgcXVhbGl0eVwiLFxuICAgICAgICBwb2ludHM6IDMsXG4gICAgICAgIGltcGFjdGluZ19ldmVudHM6IFtcIlByaXZhY3kgYnJlYWNoXCJdLFxuICAgICAgICBwcm9ibGVtX2RldGFpbDogXCJBIG5ldyBzeXN0ZW0gaXMgaW50cm9kdWNlZCBhaW1pbmcgdG8gdXNlIGRhdGEgZnJvbSBjbGFzcyBhY3Rpdml0aWVzLCB0byBpZGVudGlmeSBsZWFybmVycyB3aG8gbWF5IG5lZWQgbW9yZSBzdXBwb3J0Li4uXCIsXG4gICAgICAgIHJlcXVpcmVtZW50czoge1xuICAgICAgICAgICAgYmxvY2tzOiAxLFxuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogMSwgbmFtZTogXCJsb25nLXJhbmdlXCIgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDEsIG5hbWU6IFwicmVzcGVjdCBmb3IgcGVyc29uc1wiIH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiAxLCBuYW1lOiBcIm1lcml0IGFuZCBpbnRlZ3JpdHlcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvYmxlbTogXCJXb3JrbG9hZFwiLFxuICAgICAgICBwb2ludHM6IDEsXG4gICAgICAgIGltcGFjdGluZ19ldmVudHM6IFtcIkVxdWl0eVwiXSxcbiAgICAgICAgcHJvYmxlbV9kZXRhaWw6IFwiXCIsXG4gICAgICAgIHJlcXVpcmVtZW50czoge1xuICAgICAgICAgICAgYmxvY2tzOiAxLFxuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCBuYW1lOiBcImp1c3RpY2VcIiwgdmFsdWU6IDIgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDEsIG5hbWU6IFwicmVzcGVjdCBmb3IgcGVyc29uc1wiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9ibGVtOiBcIkZvcm1hdGl2ZSBmZWVkYmFjayBhdCBzY2FsZVwiLFxuICAgICAgICBwb2ludHM6IDMsXG4gICAgICAgIGltcGFjdGluZ19ldmVudHM6IFtcIkVxdWl0eVwiXSxcbiAgICAgICAgcHJvYmxlbV9kZXRhaWw6IFwiXCIsXG4gICAgICAgIHJlcXVpcmVtZW50czoge1xuICAgICAgICAgICAgYmxvY2tzOiAxLFxuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogMSwgbmFtZTogXCJtZXJpdCBhbmQgaW50ZWdyaXR5XCIgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDEsIG5hbWU6IFwicmVzcGVjdCBmb3IgcGVyc29uc1wiIH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDMsIHZhbHVlOiAxLCBuYW1lOiBcImJlbmVmaWNpZW5jZVwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9ibGVtOiBcIkRpZmZlcmVudGlhdGlvblwiLFxuICAgICAgICBwb2ludHM6IDIsXG4gICAgICAgIGltcGFjdGluZ19ldmVudHM6IFtdLFxuICAgICAgICBwcm9ibGVtX2RldGFpbDogXCJTY2VuYXJpbyAxOiBBSSBmb3IgZW5yaWNobWVudCBjbGFzcyBzdHJlYW1pbmcuLi5cIixcbiAgICAgICAgcmVxdWlyZW1lbnRzOiB7XG4gICAgICAgICAgICBibG9ja3M6IDEsXG4gICAgICAgICAgICBwcmluY2lwbGVzOiBbXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIG5hbWU6IFwibWVyaXQgYW5kIGludGVncml0eVwiLCB2YWx1ZTogMiB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogMSwgbmFtZTogXCJqdXN0aWNlXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb2JsZW06IFwiRGlnaXRhbCBza2lsbHNcIixcbiAgICAgICAgcG9pbnRzOiAxLFxuICAgICAgICBpbXBhY3RpbmdfZXZlbnRzOiBbXSxcbiAgICAgICAgcHJvYmxlbV9kZXRhaWw6IFwiXCIsXG4gICAgICAgIHJlcXVpcmVtZW50czoge1xuICAgICAgICAgICAgYmxvY2tzOiAxLFxuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogMSwgbmFtZTogXCJyZXNwZWN0IGZvciBwZXJzb25zXCIgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgbmFtZTogXCJqdXN0aWNlXCIsIHZhbHVlOiAyIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9ibGVtOiBcIkVuZ2FnZW1lbnRcIixcbiAgICAgICAgcG9pbnRzOiAxLFxuICAgICAgICBpbXBhY3RpbmdfZXZlbnRzOiBbXSxcbiAgICAgICAgcHJvYmxlbV9kZXRhaWw6IFwiWW91ciBzY2hvb2wgaGFzIGFkb3B0ZWQgYSBuZXcgQUkgc3lzdGVtIHRoYXQgaXMgaW50ZW5kZWQgdG8gdHJhY2sgXHVGRkZEZW5nYWdlbWVudCBpbiBsZWFybmluZ1x1RkZGRC4uLlwiLFxuICAgICAgICByZXF1aXJlbWVudHM6IHtcbiAgICAgICAgICAgIGJsb2NrczogMSxcbiAgICAgICAgICAgIHByaW5jaXBsZXM6IFtcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgbmFtZTogXCJtZXJpdCBhbmQgaW50ZWdyaXR5XCIsIHZhbHVlOiAyIH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiAxLCBuYW1lOiBcInJlc3BlY3QgZm9yIHBlcnNvbnNcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvYmxlbTogXCJDYXJlZXJzIGd1aWRhbmNlXCIsXG4gICAgICAgIHBvaW50czogMSxcbiAgICAgICAgaW1wYWN0aW5nX2V2ZW50czogW10sXG4gICAgICAgIHByb2JsZW1fZGV0YWlsOiBcIkNvbW1vbiBzY2VuYXJpbzogQUkgY2FyZWVyIGd1aWRhbmNlIHRvb2wuLi5cIixcbiAgICAgICAgcmVxdWlyZW1lbnRzOiB7XG4gICAgICAgICAgICBibG9ja3M6IDEsXG4gICAgICAgICAgICBwcmluY2lwbGVzOiBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb2JsZW06IFwiTWVldGluZyBhY2Nlc3NpYmlsaXR5IG9ibGlnYXRpb25zXCIsXG4gICAgICAgIHBvaW50czogMyxcbiAgICAgICAgaW1wYWN0aW5nX2V2ZW50czogW10sXG4gICAgICAgIHByb2JsZW1fZGV0YWlsOiBcIllvdXIgc2Nob29sIGlzIGxlZ2FsbHkgcmVxdWlyZWQgdG8gcHJvdmlkZSBhY2Nlc3NpYmxlIG1hdGVyaWFscyBmb3IgYWxsIHN0dWRlbnRzLi4uXCIsXG4gICAgICAgIHJlcXVpcmVtZW50czoge1xuICAgICAgICAgICAgYmxvY2tzOiAxLFxuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogMSwgbmFtZTogXCJyZXNwZWN0IGZvciBwZXJzb25zXCIgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgbmFtZTogXCJqdXN0aWNlXCIsIHZhbHVlOiAyIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9ibGVtOiBcIlBlcnNvbmFsaXNlZCBsZWFybmluZ1wiLFxuICAgICAgICBwb2ludHM6IDIsXG4gICAgICAgIGltcGFjdGluZ19ldmVudHM6IFtdLFxuICAgICAgICBwcm9ibGVtX2RldGFpbDogXCJBZGFwdGl2ZSBMZWFybmluZyBQbGF0Zm9ybXM6IFRoaXMgQUktZHJpdmVuIHBsYXRmb3JtIHBlcnNvbmFsaXplcyBpbnN0cnVjdGlvbiBmb3IgZWFjaCBzdHVkZW50Li4uXCIsXG4gICAgICAgIHJlcXVpcmVtZW50czoge1xuICAgICAgICAgICAgYmxvY2tzOiAxLFxuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogMSwgbmFtZTogXCJyZXNwZWN0IGZvciBwZXJzb25zXCIgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDEsIG5hbWU6IFwibWVyaXQgYW5kIGludGVncml0eVwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9ibGVtOiBcIldlbGxiZWluZ1wiLFxuICAgICAgICBwb2ludHM6IDIsXG4gICAgICAgIGltcGFjdGluZ19ldmVudHM6IFtdLFxuICAgICAgICBwcm9ibGVtX2RldGFpbDogXCJBSS1Ecml2ZW4gQ291bnNlbGluZyBTdXBwb3J0OiBBIG5ldyBBSSBzeXN0ZW0gaGVscHMgc2Nob29sIGNvdW5zZWxvcnMgaWRlbnRpZnkgc3R1ZGVudHMgaW4gbmVlZCBvZiBlbW90aW9uYWwgc3VwcG9ydCBlYXJseS4uLlwiLFxuICAgICAgICByZXF1aXJlbWVudHM6IHtcbiAgICAgICAgICAgIGJsb2NrczogMSxcbiAgICAgICAgICAgIHByaW5jaXBsZXM6IFtcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMywgbmFtZTogXCJiZW5lZmljaWVuY2VcIiwgdmFsdWU6IDIgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDEsIG5hbWU6IFwibWVyaXQgYW5kIGludGVncml0eVwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG5dO1xuXG4iLCAiaW1wb3J0IHsgUGllY2UgfSBmcm9tICdAYm9hcmR6aWxsYS9jb3JlJztcbmltcG9ydCB7IFRyYWRlb2ZmcyB9IGZyb20gJy4uL2luZGV4LnRzJztcblxuZXhwb3J0IGNsYXNzIFN0cmF0ZWd5Q2FyZCBleHRlbmRzIFBpZWNlPFRyYWRlb2Zmcz4ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBjb3N0OiBudW1iZXI7XG4gICAgY29udHJpYnV0aW9uOiB7XG4gICAgICAgIHByaW5jaXBsZXM6IHsgcHJpbmNpcGxlPzogc3RyaW5nIHwgbnVtYmVyOyB2YWx1ZT86IG51bWJlciB9W107XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHN0cmF0ZWd5Q2FyZHM6IFBhcnRpYWw8U3RyYXRlZ3lDYXJkPltdID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ0RldmVsb3AgZ3VpZGVsaW5lcycsXG4gICAgICAgIHR5cGU6ICdyZWd1bGF0ZScsXG4gICAgICAgIGNvc3Q6IDEsXG4gICAgICAgIGNvbnRyaWJ1dGlvbjoge1xuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAzLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogMSB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ0JhbiBzb21lIHVzZXMgb2Ygb3IgdHlwZXMgb2YgQUknLFxuICAgICAgICB0eXBlOiAncmVndWxhdGUnLFxuICAgICAgICBjb3N0OiAxLFxuICAgICAgICBjb250cmlidXRpb246IHtcbiAgICAgICAgICAgIHByaW5jaXBsZXM6IFtcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDEgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdQcm92aWRlIGxlYXJuaW5nIG9wcG9ydHVuaXRpZXMgZm9yIHRlYWNoZXJzIC8gc3R1ZGVudHMgLyBzY2hvb2wgbGVhZGVycycsXG4gICAgICAgIHR5cGU6ICdyZWd1bGF0ZScsXG4gICAgICAgIGNvc3Q6IDIsXG4gICAgICAgIGNvbnRyaWJ1dGlvbjoge1xuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogMyB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAzLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogMSB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ1Byb3ZpZGUgbm9uLUFJIGFsdGVybmF0aXZlcyB0byB0aGUgdGVjaG5vbG9neSB0byBkbyB0aGUgc2FtZSB0YXNrcy4nLFxuICAgICAgICB0eXBlOiAncmVndWxhdGUnLFxuICAgICAgICBjb3N0OiAyLFxuICAgICAgICBjb250cmlidXRpb246IHtcbiAgICAgICAgICAgIHByaW5jaXBsZXM6IFtcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDMgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdDaGFuZ2UgaG93IHRoZSBBSSAvIHRvb2wgaXMgdXNlZCcsXG4gICAgICAgIHR5cGU6ICdyZWd1bGF0ZScsXG4gICAgICAgIGNvc3Q6IDIsXG4gICAgICAgIGNvbnRyaWJ1dGlvbjoge1xuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogMyB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAzLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogMCB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ0ludmVzdCBpbiBhIHRvb2wgLyBwZXJzb24gZS5nLiwgdG8gY29sbGVjdCAvIGV4cGxvcmUgZGF0YSwgY3JlYXRlIHBvbGljeSwgaW1wbGVtZW50IGNoYW5nZXMsIGV0Yy4nLFxuICAgICAgICB0eXBlOiAncmVndWxhdGUnLFxuICAgICAgICBjb3N0OiAyLFxuICAgICAgICBjb250cmlidXRpb246IHtcbiAgICAgICAgICAgIHByaW5jaXBsZXM6IFtcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDIgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDEgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdSZXF1aXJlIHRvb2wgcHJvdmlkZXJzIHRvIHByb3ZpZGUgZXZpZGVuY2Ugb2YgaG93IGVmZmVjdGl2ZSBvciBcdUZGRkRldGhpY2FsXHVGRkZEIHRoZXkgYXJlJyxcbiAgICAgICAgdHlwZTogJ3JlZ3VsYXRlJyxcbiAgICAgICAgY29zdDogMyxcbiAgICAgICAgY29udHJpYnV0aW9uOiB7XG4gICAgICAgICAgICBwcmluY2lwbGVzOiBbXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDEsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDMsIHZhbHVlOiAzIH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDQsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiAyIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnR28gYmFjayB0byB0aGUgc3RhdHVzIHF1bycsXG4gICAgICAgIHR5cGU6ICdyZWd1bGF0ZScsXG4gICAgICAgIGNvc3Q6IDIsXG4gICAgICAgIGNvbnRyaWJ1dGlvbjoge1xuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogOTk5IH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiA5OTkgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDk5OSB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogOTk5IH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiA5OTkgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdJbnZvbHZlIHN0YWtlaG9sZGVycyBpbiBkZWNpc2lvbiBtYWtpbmcgYXJvdW5kIHRoZSBwcm9ibGVtIG9yL2FuZCB1c2Ugb2YgQUknLFxuICAgICAgICB0eXBlOiAncmVndWxhdGUnLFxuICAgICAgICBjb3N0OiAzLFxuICAgICAgICBjb250cmlidXRpb246IHtcbiAgICAgICAgICAgIHByaW5jaXBsZXM6IFtcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDMgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDEgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdJbnRyb2R1Y2UgcmV3YXJkcyAvIHBlbmFsdGllcyBmb3IgZ29vZCAvIGJhZCB1c2Ugb2YgQUknLFxuICAgICAgICB0eXBlOiAncmVndWxhdGUnLFxuICAgICAgICBjb3N0OiAxLFxuICAgICAgICBjb250cmlidXRpb246IHtcbiAgICAgICAgICAgIHByaW5jaXBsZXM6IFtcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDEgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdFc3RhYmxpc2ggYW4gb3ZlcnNpZ2h0IGJvZHkgb3Igc3lzdGVtIHRvIG1vbml0b3IgdGhlIGltcGFjdHMgb2YgQUknLFxuICAgICAgICB0eXBlOiAncmVndWxhdGUnLFxuICAgICAgICBjb3N0OiAxLFxuICAgICAgICBjb250cmlidXRpb246IHtcbiAgICAgICAgICAgIHByaW5jaXBsZXM6IFtcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDEgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdTaGFyZSBleGFtcGxlcyBvZiBnb29kIC8gcHJvYmxlbWF0aWMgcHJhY3RpY2UnLFxuICAgICAgICB0eXBlOiAncmVndWxhdGUnLFxuICAgICAgICBjb3N0OiAxLFxuICAgICAgICBjb250cmlidXRpb246IHtcbiAgICAgICAgICAgIHByaW5jaXBsZXM6IFtcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDEgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdBZHZvY2F0ZSBmb3IgY2hhbmdlIHRvIGEgcmVsZXZhbnQgc3Rha2Vob2xkZXIvcycsXG4gICAgICAgIHR5cGU6ICdyZWd1bGF0ZScsXG4gICAgICAgIGNvc3Q6IDEsXG4gICAgICAgIGNvbnRyaWJ1dGlvbjoge1xuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAzLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogMCB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ1NlZWsgc2Nob29sIHNwb25zb3JzaGlwIC8gcGFydG5lcnNoaXAgd2l0aCBhbiBleHRlcm5hbCBwYXJ0bmVyIChlLmcuLCBFZFRlY2ggY29tcGFueSkuJyxcbiAgICAgICAgdHlwZTogJ3JlZ3VsYXRlJyxcbiAgICAgICAgY29zdDogLTEsXG4gICAgICAgIGNvbnRyaWJ1dGlvbjoge1xuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogLTEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IC0xIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnQ3JlYXRlIGEgdG9vbCB0byBzdXBwb3J0IHVzZXJzIG1vbml0b3IgdGhlIGVuZXJneSBhbmQgd2F0ZXIgY29uc3VtcHRpb24gb2YgdGhlaXIgQUkgdXNlLicsXG4gICAgICAgIHR5cGU6ICdyZWd1bGF0ZScsXG4gICAgICAgIGNvc3Q6IDIsXG4gICAgICAgIGNvbnRyaWJ1dGlvbjoge1xuICAgICAgICAgICAgcHJpbmNpcGxlczogW1xuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogMiB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAzLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogMiB9LFxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogMiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ1JlcXVpcmUgYW5udWFsIHJlcG9ydGluZyBhbmQgb25nb2luZyBtb25pdG9yaW5nIG9mIGVtZXJnaW5nIGltcGFjdHMgb2YgdG9vbHMnLFxuICAgICAgICB0eXBlOiAncmVndWxhdGUnLFxuICAgICAgICBjb3N0OiAzLFxuICAgICAgICBjb250cmlidXRpb246IHtcbiAgICAgICAgICAgIHByaW5jaXBsZXM6IFtcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDIgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDMgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDIgfSxcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdTb21ldGhpbiBleHBlbnNpdmUnLFxuICAgICAgICB0eXBlOiAncmVndWxhdGUnLFxuICAgICAgICBjb3N0OiAxOCxcbiAgICAgICAgY29udHJpYnV0aW9uOiB7XG4gICAgICAgICAgICBwcmluY2lwbGVzOiBbXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDEsIHZhbHVlOiAyIH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDMsIHZhbHVlOiAzIH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDQsIHZhbHVlOiAyIH0sXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiAyIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cbl07XG4iLCAiaW1wb3J0IHsgUGllY2UgfSBmcm9tICdAYm9hcmR6aWxsYS9jb3JlJztcbmltcG9ydCB7IFRyYWRlb2ZmcyB9IGZyb20gJy4uL2luZGV4LnRzJztcbmV4cG9ydCBjbGFzcyBFdmVudENhcmQgZXh0ZW5kcyBQaWVjZTxUcmFkZW9mZnM+IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgaW1wYWN0OiB7XG4gICAgICAgIHByaW5jaXBsZT86IHN0cmluZyB8IG51bWJlcjsgdmFsdWU/OiBudW1iZXI7XG4gICAgfVtdO1xufVxuXG5leHBvcnQgY29uc3QgZXZlbnRDYXJkczogUGFydGlhbDxFdmVudENhcmQ+W10gPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnRG9lcyBldmVyeW9uZSBpbiB0aGUgc2Nob29sIGtub3cgaG93IHRoZSBBSSBzeXN0ZW0gd29ya3M/JyxcbiAgICAgICAgdHlwZTogJ2V2ZW50JyxcbiAgICAgICAgaW1wYWN0OiBbXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IC0zIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAzLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDQsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdJZiBhIHN0dWRlbnQvdGVhY2hlciBkaXNhZ3JlZXMgd2l0aCB0aGUgb3V0Y29tZSB0aGF0IGFuIEFJIHByb3ZpZGVzLCB3aGF0IGNhbiB0aGV5IGRvIGluIHlvdXIgc2Nob29sPycsXG4gICAgICAgIHR5cGU6ICdldmVudCcsXG4gICAgICAgIGltcGFjdDogW1xuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDEsIHZhbHVlOiAtMyB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiAwIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnQ2FuIHRoZSBBSSBzeXN0ZW0gZG8gd2hhdCB0aGUgRWRUZWNoIGNvbXBhbnkgc2F5cyBpdCBjYW4/JyxcbiAgICAgICAgdHlwZTogJ2V2ZW50JyxcbiAgICAgICAgaW1wYWN0OiBbXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogLTMgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAzLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDQsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IDAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdXaGF0IGltcGFjdHMgbWlnaHQgdXNpbmcgdGhpcyBBSSBzeXN0ZW0gaGF2ZSBvbiBvdGhlciBzdGFrZWhvbGRlcnM/IChFLmcuLCBwYXJlbnRzLCB0ZWFjaGVycywgc2Nob29sIGxlYWRlcnMsIHdpZGVyIGNvbW11bml0eSknLFxuICAgICAgICB0eXBlOiAnZXZlbnQnLFxuICAgICAgICBpbXBhY3Q6IFtcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IC0zIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogMCB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ0ltYWdpbmUgdGhlIHN5c3RlbSBoYXMgYmVlbiBpbiBwbGFjZSBmb3IgbG9uZ2VyIHRoYW4gNSB5ZWFyczogV2lsbCB0aGUgc3lzdGVtIGhhdmUgaW1wcm92ZWQ/IFdobyB3aWxsIGJlbmVmaXQgZnJvbSB0aG9zZSBpbXByb3ZlbWVudHM/IFdobyBcIm93bnNcIiB0aGUga25vd2xlZGdlIHRoYXQgbGVkIHRvIHRob3NlIGltcHJvdmVtZW50cz8gV2lsbCBob3cgdGhlIHN5c3RlbSBpcyB1c2VkIGhhdmUgY2hhbmdlZD8gV2lsbCBodW1hbiBleHBlcnRpc2UgYW5kIGFnZW5jeSBiZSByZXRhaW5lZD8gV2hhdCBpbXBhY3Qgd2lsbCB1c2luZyB0aGUgQUkgc3lzdGVtIGhhdmUgb24gbG9uZ2VyIHRlcm0gaXNzdWVzPycsXG4gICAgICAgIHR5cGU6ICdldmVudCcsXG4gICAgICAgIGltcGFjdDogW1xuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDEsIHZhbHVlOiAtMyB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiAwIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnRG9lcyB0aGUgc3lzdGVtIHRhY2tsZSBhbiBpc3N1ZSBvciBwcm9ibGVtIGV2ZXJ5b25lIHRoaW5rcyBpcyBpbXBvcnRhbnQ/IElmIG5vdCwgaG93IGhhcyB0aGlzIGhhcHBlbmVkPycsXG4gICAgICAgIHR5cGU6ICdldmVudCcsXG4gICAgICAgIGltcGFjdDogW1xuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDEsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAzLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDQsIHZhbHVlOiAtMiB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiAtMiB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ0FjY29yZGluZyB0byB0aGUgbGF0ZXN0IEF1c3RyYWxpYW4gRGlnaXRhbCBJbmNsdXNpb24gSW5kZXggKEFESUkpLCBhbG1vc3QgYSBxdWFydGVyIG9mIEF1c3RyYWxpYW5zIGFyZSBkaWdpdGFsbHkgZXhjbHVkZWQgXHVGRkZEIG1lYW5pbmcgdGhleSBkb25cdUZGRkR0IGhhdmUgYWNjZXNzIHRvIGVzc2VudGlhbCB0ZWNobm9sb2d5LicsXG4gICAgICAgIHR5cGU6ICdldmVudCcsXG4gICAgICAgIGltcGFjdDogW1xuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDEsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAzLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDQsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgdmFsdWU6IC0zIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnRGlkIHlvdSBrbm93OiBhIENoYXRHUFQgcmVxdWVzdCB1c2VzIHJvdWdobHkgMTAgdGltZXMgYSBHb29nbGUgc2VhcmNoIHF1ZXJ5OyBhbmQgY29vbGluZyBkYXRhIGNlbnRyZXMgZm9yIEFJIHVzZXMgd2F0ZXIsIHdpdGggaW5jcmVhc2VkIGRlbWFuZC4nLFxuICAgICAgICB0eXBlOiAnZXZlbnQnLFxuICAgICAgICBpbXBhY3Q6IFtcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogLTMgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDMsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogLTIgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdJbnRlcmdlbmVyYXRpb25hbCBmYWlybmVzcyBkZXNjcmliZXMgaXNzdWVzIHJlbGF0aW5nIHRvIGhvdyBidXJkZW5zIGFuZCBiZW5lZml0cyBpbXBhY3QgZGlmZmVyZW50IGdlbmVyYXRpb25zLCBpbmNsdWRpbmcgbG9uZy1yYW5nZSBoYXJtcyBmb3IgcHJlc2VudC1kYXkgZGVjaXNpb25zLicsXG4gICAgICAgIHR5cGU6ICdldmVudCcsXG4gICAgICAgIGltcGFjdDogW1xuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDEsIHZhbHVlOiAtMyB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiAwIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnSW1hZ2luZSB0aGF0IEFJIGlzIGJlaW5nIHVzZWQgdG8gc29sdmUgYSBsb25nLXN0YW5kaW5nIGZhaXJuZXNzIGlzc3VlIGluIHlvdXIgc2Nob29sLiBIb3cgbWlnaHQgdGhpcyBjaGFuZ2UgaG93IHlvdSB0aGluayBhYm91dCB0aGUgdXNlIG9mIEFJIGluIHlvdXIgc2NlbmFyaW8/JyxcbiAgICAgICAgdHlwZTogJ2V2ZW50JyxcbiAgICAgICAgaW1wYWN0OiBbXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDMsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogMCB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ0ltYWdpbmUgdGhhdCBzb21ldGhpbmcgZ29lcyB3cm9uZyAoc3lzdGVtcyBmYWlsLCBzdHVkZW50cyByZWNlaXZlIHRoZSB3cm9uZyBkZWNpc2lvbiwgdGhlcmUgaXMgYSBkYXRhIGJyZWFjaCwgZXRjLikuIEhvdyB3b3VsZCB0aGlzIGltcGFjdCBmYWlybmVzcz8nLFxuICAgICAgICB0eXBlOiAnZXZlbnQnLFxuICAgICAgICBpbXBhY3Q6IFtcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IC0zIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogNCwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogMCB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ1BhbmRlbWljJyxcbiAgICAgICAgdHlwZTogJ2V2ZW50JyxcbiAgICAgICAgaW1wYWN0OiBbXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDMsIHZhbHVlOiAtMyB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDQsIHZhbHVlOiAtMyB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiAwIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnTG9zZSBzb2NpYWwgbGljZW5zZScsXG4gICAgICAgIHR5cGU6ICdldmVudCcsXG4gICAgICAgIGltcGFjdDogW1xuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDEsIHZhbHVlOiAtMiB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogLTIgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogMCB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ1Bvb3IgdXNlIG9mIEFJJyxcbiAgICAgICAgdHlwZTogJ2V2ZW50JyxcbiAgICAgICAgaW1wYWN0OiBbXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMSwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAyLCB2YWx1ZTogLTIgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAzLCB2YWx1ZTogLTIgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiAwIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnUGVkYWdvZ2ljIGNhbGNpZmljYXRpb24nLFxuICAgICAgICB0eXBlOiAnZXZlbnQnLFxuICAgICAgICBpbXBhY3Q6IFtcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAxLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogLTIgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA1LCB2YWx1ZTogLTIgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdQcml2YWN5IGJyZWFjaCcsXG4gICAgICAgIHR5cGU6ICdldmVudCcsXG4gICAgICAgIGltcGFjdDogW1xuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDEsIHZhbHVlOiAwIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgdmFsdWU6IC0zIH0sXG4gICAgICAgICAgICB7IHByaW5jaXBsZTogMywgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgIHsgcHJpbmNpcGxlOiA0LCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiAwIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnU01FVEhJTkcgQkFEIGJyZWFjaCcsXG4gICAgICAgIHR5cGU6ICdldmVudCcsXG4gICAgICAgIGltcGFjdDogW1xuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDEsIHZhbHVlOiAtMyB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDIsIHZhbHVlOiAtMyB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDMsIHZhbHVlOiAtMyB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDQsIHZhbHVlOiAtMyB9LFxuICAgICAgICAgICAgeyBwcmluY2lwbGU6IDUsIHZhbHVlOiAtMyB9XG4gICAgICAgIF1cbiAgICB9XG5dO1xuIiwgIi8qKlxyXG4gKiBUTyBET1xyXG4gKiAxLiBmaXggdGhlIHN1YmZsb3cgZm9sbG93dXAgYW5kIGNoZWNrIG90aGVyIGNvZGUgZm9yIHN0dXBpZGl0eSBodHRwczovL2RvY3MuYm9hcmR6aWxsYS5pby9hcGkvY2xhc3Nlcy9HYW1lI2Zsb3djb21tYW5kcyBcclxuICogMi4gQ3JlYXRlIGEgbWFwcGluZyBvZiBwcmluY2lwbGUgZXhwcmVzc2lvbnMgdG8gbnVtYmVycyBzbyBJIGp1c3QgdXBkYXRlIHRoZSBwcmluY2lwbGVzIG9uY2UgYW5kIGl0IGZsb3dzIGFjcm9zcyBldmVudC9jaGFsbGVuZ2Uvc3RyYXRnaWVzXHJcbiAqIDMuIHZpc3VhbCBkZXNpZ24gaHR0cHM6Ly9kb2NzLmJvYXJkemlsbGEuaW8vY2F0ZWdvcnkvY3VzdG9taXppbmctdGhlLXVpXHJcbiAqIDQuIERlYWwgd2l0aCB3aWxkY2FyZCBzdHJhdGVnaWVzICg5OTkgdmFsdWUpIChzZWUgaG93IHRoZSBleGFtcGxlIHVzaW5nICgpID0+IGZvciB0cnVtcCBjYXJkcylcclxuICogNS4gQ29uc2lkZXIgMSBwbGF5ZXIsIGNvb3BlcmF0aXZlLCBhbmQgY29tcGV0aXRpdmUgbW9kZXMuIEluIGNvb3BlcmF0aXZlIGNoYWxsZW5nZXMgYW5kIHN0cmF0ZWdpZXMgY291bGQgYmUgc2hhcmVkLiBJbiBjb21wZXRpdGl2ZSwgb25seSBzdHJhdGVnaWVzLlxyXG4gKiA2LiBDb25zaWRlciBhICd2ZXJzaW9uaW5nJyB3aXRoIGRpZmZlcmVudCBnYW1lIG1vZGVzIChwb3NzaWJseSBldmVuIGFsbG93aW5nIHVzZXJzIHRvIGFkZCBjYXJkcylcclxuICogNy4gSWRlYWxseSBpJ2Qgd29yayBvdXQgaG93IHRvIGVuc3VyZSB0b2tlbnMgY2FuIG9ubHkgYmUgcGxhY2VkIG9uIG1hdGNoaW5nIHR5cGUgc3BhY2VzIGFzIGEgZnVuY3Rpb24gb3IgY2xhc3MgbWV0aG9kXHJcbiAqIDguIENvbnNpZGVyIGlmIHRoZXJlJ3MgYSB3YXkgdG8gYXV0b21hdGUgYmFsYW5jZSB0ZXN0aW5nLCBjYW4gSSByZWNvcmQgb3V0cHV0cyB3aXRoIHJhbmRvbSBoYW5kcyBhbmQgY2hvaWNlcyB1c2luZyBodHRwczovL2RvY3MuYm9hcmR6aWxsYS5pby9jb29rYm9vay90ZXN0aW5nID9cclxuICogY2FuIEkgcnVuIGRpZmZlcmVudCB0ZXN0cyB3aXRoIGUuZy4sIGEgJ3Byb2JhYmx5IGJhZCcgYW5kICdwcm9iYWJseSBnb29kJyBzdHJhdGVneSB0byBjb21wYXJlIGxpa2VsaWhvb2Qgb2Ygd2lubmluZ1xyXG4gKiA5LiBDb25zaWRlciBwdWJsaXNoIGh0dHBzOi8vZG9jcy5ib2FyZHppbGxhLmlvL3B1Ymxpc2hpbmcvcHVibGlzaCBvciBlbHNld2hlcmVcclxuICogXHJcbiAqIFdpdGggMyByZXNvdXJjZSBhbmQgd2luIGF0IHNjb3JlIDEwLCBhIG1pbmltdW0gb2YgMyBjaGFsbGVuZ2VzIG5lZWQgY29tcGxldGluZyBhbmQgb25lIHN0YXNoaW5nLCByZXF1aXJpbmcgc3BlbmQgb2YgMTQgYWJzb2x1dGUgbWluaW11bSwgb3IgNSB0dXJucy5cclxuICogSSd2ZSBjaGFuZ2VkIHRoZSByZXNvdXJjZSBzZXR0aW5nIHRvIDUgdG8gYWxsb3cgZm9yIG1vcmUgZmxleGliaWxpdHkgaW4gdGhlIGdhbWUsIGZ1cnRoZXIgdGVzdGluZyBuZWVkZWQuXHJcbiAqIFxyXG4gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBjcmVhdGVHYW1lLFxyXG4gICAgUGxheWVyLFxyXG4gICAgR2FtZSxcclxuICAgIFNwYWNlLFxyXG4gICAgUGllY2UsXHJcbiAgICBTdGFjayxcclxuICAgIERvLFxyXG4gICAgdW5pb24sXHJcbiAgICBQaWVjZUdyaWRcclxufSBmcm9tICdAYm9hcmR6aWxsYS9jb3JlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFkZW9mZnNQbGF5ZXIgZXh0ZW5kcyBQbGF5ZXI8VHJhZGVvZmZzLCBUcmFkZW9mZnNQbGF5ZXI+IHtcclxuICAgIC8qKlxyXG4gICAgICogQW55IHByb3BlcnRpZXMgb2YgeW91ciBwbGF5ZXJzIHRoYXQgYXJlIHNwZWNpZmljIHRvIHlvdXIgZ2FtZSBnbyBoZXJlXHJcbiAgICAgKiBOb3QgY2xlYXIgYXQgdGhpcyBwb2ludCBob3cgdGhlIHBsYXllciB2cyBnYW1lIGRlZiBkaWZmZXJzLlxyXG4gICAgICogVGhlc2UgYXJlIHByb3BlcnRpZXMgZm9yIGVhY2ggcGxheWVyIChlLmcuLCBhIHNjb3JlLCBhIHNldCByZXNvdXJjZSB2YWx1ZSwgZXRjKS5cclxuICAgICAqIFBvc3NpYmx5IGlmIHlvdSBoYXZlIGNoYXJhY3RlciB0eXBlcyB0aGV5J2QgZ28gaGVyZS5cclxuICAgICAqIFRoZSBnYW1lIGNsYXNzIHByb3ZpZGVzIHNoYXJlZCBwcm9wZXJ0aWVzIHN1Y2ggYXMgdGhlIHJvdW5kIHdlJ3JlIG9uLlxyXG4gICAgICovXHJcbiAgICBzY29yZTogbnVtYmVyID0gMDtcclxuICAgIHJlc291cmNlczogbnVtYmVyID0gNTtcclxuICAgIHN0YXNoZWRUaGlzVHVybjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZGFtYWdlOiBudW1iZXIgPSAwOyAvL3VzZWQgdG8gc3RvcmUgd2FzdGVkcmVzb3VyY2VcclxuICAgIHN0YXR1czogJ3dpbicgfCAnbG9zZScgfCB1bmRlZmluZWQ7IC8vIGNhbiBvbmx5IGJlICd3aW4nLCAnbG9zZScsIG9yIHVuZGVmaW5lZFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhZGVvZmZzIGV4dGVuZHMgR2FtZTxUcmFkZW9mZnMsIFRyYWRlb2Zmc1BsYXllcj4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbnkgb3ZlcmFsbCBwcm9wZXJ0aWVzIG9mIHlvdXIgZ2FtZSBnbyBoZXJlXHJcbiAgICAgKi9cclxuICAgIHJvdW5kOiBudW1iZXIgPSAwO1xyXG4gICAgbWF4Um91bmRzOiBudW1iZXIgPSA2O1xyXG4gICAgdHVybkxpbWl0OiBudW1iZXIgPSA1O1xyXG4gICAgaGFuZExpbWl0OiBudW1iZXIgPSAxMDtcclxuICAgIHBvb2xTaXplOiBudW1iZXIgPSAyMDtcclxuICAgIHN0cmF0ZWd5RHJhd0Nvc3Q6IG51bWJlciA9IDQ7XHJcbiAgICB3aW5jb25kaXRpb246IG51bWJlciA9IDEwO1xyXG4gICAgbG9zZWNvbmRpdGlvbjogbnVtYmVyID0gMTA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgeW91ciBnYW1lJ3MgY3VzdG9tIHBpZWNlcy5cclxuICogbm90ZSB5b3UgY2FudCBpbXBvcnQgKiBmcm9tIHggaW4ganMsIHNvIGRvbid0IHRyeS5cclxuICovXHJcbmltcG9ydCB7IFRva2VuLCBTY29yZUNvdW50ZXIsIFNsb3QgfSBmcm9tICcuL3BpZWNlcy9pbmRleC50cyc7XHJcbmltcG9ydCB7IGNoYWxsZW5nZUNhcmRzLCBDaGFsbGVuZ2VDYXJkIH0gZnJvbSAnLi9waWVjZXMvY2hhbGxlbmdlcy50cyc7XHJcbmltcG9ydCB7IHN0cmF0ZWd5Q2FyZHMsIFN0cmF0ZWd5Q2FyZCB9IGZyb20gJy4vcGllY2VzL3N0cmF0ZWdpZXMudHMnO1xyXG5pbXBvcnQgeyBldmVudENhcmRzLCBFdmVudENhcmQgfSBmcm9tICcuL3BpZWNlcy9ldmVudHMudHMnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBjdXN0b20gc3BhY2VzIGZvciB0aGUgYm9hcmRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhbWUoVHJhZGVvZmZzUGxheWVyLCBUcmFkZW9mZnMsIGdhbWUgPT4ge1xyXG4gICAgLy8gSSdtIG5vdCBjbGVhciB3aGF0J3MgbmVlZGVkIGluIHRoZXNlIGZpcnN0IHR3bywgb3Igd2hhdCB0aGV5J3JlIGRvaW5nL3doeSB0aGV5IGNhbid0IGJlIHNldCBkZWZhdWx0LlxyXG4gICAgY29uc3QgeyBhY3Rpb24gfSA9IGdhbWU7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgICAgcGxheWVyQWN0aW9ucyxcclxuICAgICAgICBlYWNoUGxheWVyLFxyXG4gICAgICAgIGZvckVhY2gsXHJcbiAgICAgICAgZm9yTG9vcCxcclxuICAgICAgICB3aGlsZUxvb3AsXHJcbiAgICAgICAgbG9vcCxcclxuICAgIH0gPSBnYW1lLmZsb3dDb21tYW5kcztcclxuXHJcblxyXG4gICAgLy8gRm9yIGVhY2ggcGxheWVyLCBzZXR1cCB0aGVpciBzcGFjZSAodGhpcyBpcyBwcm9iYWJseSBhIDEgcGxheWVyIGdhbWUsIGJ1dCB0aGlzIHByb3ZpZGVzIGV4dGVuc2liaWxpdHkpXHJcbiAgICBmb3IgKGNvbnN0IHBsYXllciBvZiBnYW1lLnBsYXllcnMpIHtcclxuXHJcblxyXG4gICAgICAgIC8vIHNldHVwIHNwYWNlIHRvIGhvbGQgY2hhbGxlbmdlIGNhcmRzXHJcbiAgICAgICAgLy8gY29udGFpbnMgdGhyZWUgc2xvdHMgc2xvdDAsIHNsb3QxLCBzbG90MlxyXG4gICAgICAgIC8vIGVhY2ggc2xvdCBjb250YWlucyBhIHRva2VuU3BhY2UgZm9yIGVhY2ggdG9rZW4gdHlwZVxyXG4gICAgICAgIC8vIHRoaXMgYWxsb3dzIHVzIHRvIGNoZWNrIGlmIHRoZSB0b2tlbnMgYXJlIGluIHBsYWNlIGZvciBhIGNoYWxsZW5nZVxyXG4gICAgICAgIC8vIGJ5IGNoZWNraW5nIHRoZSBzcGFjZSwgcmF0aGVyIHRoYW4gdGhlIGNhcmRcclxuICAgICAgICBjb25zdCBjaGFsbGVuZ2VTcGFjZSA9IGdhbWUuY3JlYXRlKFNwYWNlLCAnY2hhbGxlbmdlU3BhY2UnLCB7IHBsYXllciB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY2hhbGxlbmdlU2xvdHMgPSBjaGFsbGVuZ2VTcGFjZS5jcmVhdGUoU3BhY2UsICdjaGFsbGVuZ2VTbG90cycsIHsgcGxheWVyIH0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsb3QgPSBjaGFsbGVuZ2VTbG90cy5jcmVhdGUoU2xvdCwgYHNsb3Qke2l9YCwgeyBncm91cDogJ2NoYWxsZW5nZXNsb3QnIH0pO1xyXG4gICAgICAgICAgICBjb25zdCB0b2tlblNwYWNlID0gc2xvdC5jcmVhdGUoU3BhY2UsICd0b2tlblNwYWNlJyk7XHJcbiAgICAgICAgICAgIFsnRGF0YScsICdNZXRob2QnLCAnVXNlcicsICdBaW0nXS5mb3JFYWNoKHR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdG9rZW5TcGFjZS5jcmVhdGUoU3BhY2UsIGAke3R5cGV9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2V0dXAgc3BhY2UgdG8gaG9sZCBjb21wbGV0ZWQgY2hhbGxlbmdlIGNhcmRzIChtYXkgbm90IGJlIG5lZWRlZClcclxuICAgICAgICBjb25zdCBjaGFsbGVuZ2VDb21wbGV0ZWQgPSBnYW1lLmNyZWF0ZShTcGFjZSwgJ2NoYWxsZW5nZUNvbXBsZXRlZCcsIHsgcGxheWVyIH0pO1xyXG5cclxuICAgICAgICAvLyBzZXR1cCBzcGFjZSB0byBob2xkIHN0cmF0ZWdpZXMgdGhhdCBhcmUgaW4gcGxheVxyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVN0cmF0ZWdpZXMgPSBnYW1lLmNyZWF0ZShTcGFjZSwgJ2FjdGl2ZVN0cmF0ZWdpZXMnLCB7IHBsYXllciB9KTtcclxuXHJcbiAgICAgICAgLy8gc2V0dXAgcGxheWVyIGhhbmQgKHRvIGhvbGQgY2FyZHMpXHJcbiAgICAgICAgY29uc3QgaGFuZCA9IGdhbWUuY3JlYXRlKFNwYWNlLCAnaGFuZCcsIHsgcGxheWVyIH0pO1xyXG5cclxuICAgICAgICAvLyBwb29sIChmb3IgdG9rZW5zKSwgYW5kIGNyZWF0ZSB0aGUgdG9rZW5zXHJcbiAgICAgICAgY29uc3QgcG9vbCA9IGdhbWUuY3JlYXRlKFNwYWNlLCAncG9vbCcsIHsgcGxheWVyIH0pO1xyXG4gICAgICAgIGNvbnN0IHRva2VuVHlwZXM6ICgnRGF0YScgfCAnTWV0aG9kJyB8ICdVc2VyJyB8ICdBaW0nKVtdID0gWydEYXRhJywgJ01ldGhvZCcsICdVc2VyJywgJ0FpbSddO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWUucG9vbFNpemU7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdG9rZW5UeXBlc1tpICUgdG9rZW5UeXBlcy5sZW5ndGhdO1xyXG4gICAgICAgICAgICBjb25zdCBxdWFsaXR5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMykgKyAxOyAvLyByYW5kb21seSBhc3NpZ24gcXVhbGl0eSwgMSwyLDNcclxuICAgICAgICAgICAgcG9vbC5jcmVhdGUoVG9rZW4sIGB0b2tlbiR7dHlwZX1gLCB7IHR5cGU6IHR5cGUsIHF1YWxpdHk6IHF1YWxpdHkgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZXR1cCBzcGFjZSB0byB0cmFjayB0aGUgc2NvcmUgdXNpbmcgdGhlIHNjb3Jpbmd0b2tlbiBwaWVjZSxcclxuICAgICAgICAvLyB0byB0cmFjayB3YXN0ZWRSZXNvdXJjZSBkYW1hZ2UgdXNpbmcgdGhlIGRhbWFnZSBwaWVjZSBcclxuICAgICAgICAvLyBhbmQgdG8gdHJhY2sgZGlzY2FyZGVkIHBpZWNlc1xyXG4gICAgICAgIGNvbnN0IGRpc2NhcmRlZCA9IGdhbWUuY3JlYXRlKFNwYWNlLCAnZGlzY2FyZGVkJywgeyBwbGF5ZXIgfSk7XHJcbiAgICAgICAgY29uc3Qgd2FzdGVkUmVzb3VyY2UgPSBnYW1lLmNyZWF0ZShTcGFjZSwgJ3dhc3RlZFJlc291cmNlJywgeyBwbGF5ZXIgfSk7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVBcmVhID0gZ2FtZS5jcmVhdGUoU3BhY2UsICdzY29yZUFyZWEnLCB7IHBsYXllciB9KTtcclxuXHJcbiAgICAgICAgLy8gU2V0dXAgc2NvcmUgY291bnRlciBwaWVjZSBmb3IgdGhlIHBsYXllclxyXG4gICAgICAgIGdhbWUuY3JlYXRlKFNjb3JlQ291bnRlciwgJ3Njb3JlQ291bnRlcicsIHsgdmFsdWU6IHBsYXllci5zY29yZSB9KTtcclxuXHJcbiAgICAgICAgLy8gU2V0dXAgZXZlbnQgZGVja1xyXG4gICAgICAgIGNvbnN0IGV2ZW50RGVjayA9IGdhbWUuY3JlYXRlKFNwYWNlLCAnZXZlbnREZWNrJyk7XHJcbiAgICAgICAgZXZlbnRDYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xyXG4gICAgICAgICAgICBldmVudERlY2suY3JlYXRlKEV2ZW50Q2FyZCwgY2FyZC5uYW1lISwgY2FyZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNldHVwIGNoYWxsZW5nZSBkZWNrXHJcbiAgICAgICAgY29uc3QgY2hhbGxlbmdlRGVjayA9IGdhbWUuY3JlYXRlKFNwYWNlLCAnY2hhbGxlbmdlRGVjaycpO1xyXG4gICAgICAgIGNoYWxsZW5nZUNhcmRzLmZvckVhY2goKGNhcmQsIGkpID0+IHtcclxuICAgICAgICAgICAgY2hhbGxlbmdlRGVjay5jcmVhdGUoQ2hhbGxlbmdlQ2FyZCwgYGNoYWxsZW5nZUNhcmQke2l9YCwgY2FyZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNldHVwIHN0cmF0ZWd5IGRlY2tcclxuICAgICAgICBjb25zdCBzdHJhdGVneURlY2sgPSBnYW1lLmNyZWF0ZShTcGFjZSwgJ3N0cmF0ZWd5RGVjaycpO1xyXG4gICAgICAgIHN0cmF0ZWd5Q2FyZHMuZm9yRWFjaChjYXJkID0+IHtcclxuICAgICAgICAgICAgc3RyYXRlZ3lEZWNrLmNyZWF0ZShTdHJhdGVneUNhcmQsIGNhcmQubmFtZSEsIGNhcmQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZpbmUgYWN0aW9uc1xyXG4gICAgLy8gSXQgc2VlbXMgbWVzc2FnZXMgcmVxdWlyZSB5b3UgdG8gZ2l2ZSB0aGUgdGVtcGxhdGUgc3RyaW5nIGFuZCB2YXJpYWJsZXMgdG8gc3Vic3RpdHV0ZSBpbiAoeW91IGNhbid0IGp1c3QgY2FsbCBmcm9tIGVudmlyb25tZW50cylcclxuXHJcbiAgICBnYW1lLmRlZmluZUFjdGlvbnMoe1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgIGNob29zZUFjdGlvbnM6IHBsYXllciA9PlxyXG4gICAgICAgICAgICBhY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgcHJvbXB0OiAnUGljayBhbiBhY3Rpb24nLFxyXG4gICAgICAgICAgICB9KS5jaG9vc2VGcm9tKFxyXG4gICAgICAgICAgICAgICAgJ2FjdGlvbnMnLCBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2RyYXcgYSBTdHJhdGVneSBjYXJkIChmcmVlKSc6IGRyYXdTdHJhdGVneUNhcmQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3BsYXkgYW4gaW5ub3ZhdGlvbiB0aWxlIChzZWUgdGlsZSBjb3N0cyknOiBwbGF5SW5ub3ZhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAncGxheSBhIHN0cmF0ZWd5IGNhcmQgKHNlZSBjYXJkIGNvc3RzKSc6IHBsYXlTdHJhdGVneUNhcmQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2FkZCBhbiBleHRyYSBjaGFsbGVuZ2UnOiBhZGRDaGFsbGVuZ2VDYXJkLFxyXG4gICAgICAgICAgICAgICAgICAgICdzdGFzaCBhIGNoYWxsZW5nZSBjYXJkIChnYWluIDEgcG9pbnQsIGxvc2UgMSByZXNvdXJjZSknOiBzdGFzaENhcmRcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgLy8gYWxsb3cgYSBwbGF5ZXIgdG8gZHJhdyBhZGRpdGlvbmFsIHN0cmF0ZWd5IGNhcmRzIGZyb20gdGhlIHN0cmF0ZWd5IGRlY2sgaW50byB0aGVpciBoYW5kIChhdCBjb3N0IHNldCBieSBzdHJhdGVneURyYXdDb3N0LCBjdXJyZW50bHkgZnJlZS8wKVxyXG4gICAgICAgIGRyYXdTdHJhdGVneUNhcmQ6IHBsYXllciA9PiBhY3Rpb24oe1xyXG4gICAgICAgICAgICBwcm9tcHQ6ICdEcmF3IHN0cmF0ZWd5IGNhcmRzJyxcclxuICAgICAgICB9KS5jaG9vc2VPbkJvYXJkKFxyXG4gICAgICAgICAgICAnc3RyYXRlZ3lDYXJkJywgJC5zdHJhdGVneURlY2suYWxsKFN0cmF0ZWd5Q2FyZCksIC8vIHNob3VsZCB0aGlzIGJlIHVucXVvdGVkIFN0cmF0ZWd5Q2FyZCBvciBxdW90ZWQgJ3N0cmF0ZWd5Q2FyZHMnLCBJIHRob3VnaHQgdGhlIGxhdHRlciwgdGhlIGZvcm1lciBpcyB0aGUgY2xhc3MgKGFzc2lnbmVkIHRvIHN0cmF0ZWd5Q2FyZHMpLCBidXQgaXQncyB0aGUgZm9ybWVyXHJcbiAgICAgICAgKS5tb3ZlKFxyXG4gICAgICAgICAgICAnc3RyYXRlZ3lDYXJkJywgcGxheWVyLm15KCdoYW5kJykhXHJcbiAgICAgICAgKS5kbygoeyBzdHJhdGVneUNhcmQgfSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLnJlc291cmNlcyA+PSBnYW1lLnN0cmF0ZWd5RHJhd0Nvc3QpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5yZXNvdXJjZXMgLT0gZ2FtZS5zdHJhdGVneURyYXdDb3N0O1xyXG4gICAgICAgICAgICAgICAgLy9zdHJhdGVneUNhcmQuZWZmZWN0KGdhbWUpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5tZXNzYWdlKGB7e3BsYXllcn19IGRyZXcgYSBzdHJhdGVneSBjYXJkLCBjb3N0aW5nIHt7ZHJhd2Nvc3R9fS5gLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgcGxheWVyOiBwbGF5ZXIsIGRyYXdjb3N0OiBnYW1lLnN0cmF0ZWd5RHJhd0Nvc3QgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLm1lc3NhZ2UoYHt7cGxheWVyfX0gZG9lcyBub3QgaGF2ZSBlbm91Z2ggcmVzb3VyY2VzICh7e215cmVzb3VyY2V9fSwge3tkcmF3Y29zdH19IG5lZWRlZCkgdG8gZHJhdyBhIHN0cmF0ZWd5IGNhcmQuYCxcclxuICAgICAgICAgICAgICAgICAgICB7IHBsYXllcjogcGxheWVyLCBkcmF3Y29zdDogZ2FtZS5zdHJhdGVneURyYXdDb3N0LCBteXJlc291cmNlOiBwbGF5ZXIucmVzb3VyY2VzIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAgIC8vIGFsbG93IGEgcGxheWVyIHRvIHBsYXkgc3RyYXRlZ3kgY2FyZHMgKGF0IGNvc3Qgc2V0IG9uIGVhY2ggY2FyZCBieSBzdHJhdGVneUNhcmQuY29zdClcclxuICAgICAgICBwbGF5U3RyYXRlZ3lDYXJkOiBwbGF5ZXIgPT4gYWN0aW9uKHtcclxuICAgICAgICAgICAgcHJvbXB0OiAnUGxheSBhIHN0cmF0ZWd5IGNhcmQnLFxyXG4gICAgICAgIH0pLmNob29zZU9uQm9hcmQoXHJcbiAgICAgICAgICAgICdzdHJhdGVneUNhcmQnLCBwbGF5ZXIubXkoJ2hhbmQnKSEuYWxsKFN0cmF0ZWd5Q2FyZCksXHJcbiAgICAgICAgKS5kbygoeyBzdHJhdGVneUNhcmQgfSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLnJlc291cmNlcyA+PSBzdHJhdGVneUNhcmQuY29zdCkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLnJlc291cmNlcyAtPSBzdHJhdGVneUNhcmQuY29zdDtcclxuICAgICAgICAgICAgICAgIHN0cmF0ZWd5Q2FyZC5wdXRJbnRvKCQuYWN0aXZlU3RyYXRlZ2llcyk7IC8vIHdoeSBpcyB0aGlzIHB1dEludG8gYnV0IG5vdCBtb3ZlXHJcbiAgICAgICAgICAgICAgICAvL3N0cmF0ZWd5Q2FyZC5lZmZlY3QoZ2FtZSk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLm1lc3NhZ2UoYHt7cGxheWVyfX0gcGxheWVkIGEgc3RyYXRlZ3kgY2FyZCwgcmVzb3VyY2UgaXMgbm93IHt7bXlyZXNvdXJjZX19LmAsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBwbGF5ZXI6IHBsYXllciwgbXlyZXNvdXJjZTogcGxheWVyLnJlc291cmNlcyB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdhbWUubWVzc2FnZShge3twbGF5ZXJ9fSBkb2VzIG5vdCBoYXZlIGVub3VnaCByZXNvdXJjZSAoe3tteXJlc291cmNlfX0pIHRvIHBsYXkgdGhpcyBzdHJhdGVneSBjYXJkLmAsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBwbGF5ZXI6IHBsYXllciwgbXlyZXNvdXJjZTogcGxheWVyLnJlc291cmNlcyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLFxyXG5cclxuICAgICAgICBhZGRDaGFsbGVuZ2VDYXJkOiBwbGF5ZXIgPT4gYWN0aW9uKHtcclxuICAgICAgICAgICAgcHJvbXB0OiAnQWRkIGEgY2hhbGxlbmdlIGNhcmQgdG8gYW4gYXZhaWxhYmxlIHNsb3QnLFxyXG4gICAgICAgIH0pLmNob29zZU9uQm9hcmQoXHJcbiAgICAgICAgICAgICdjaGFsbGVuZ2VDYXJkJywgJC5jaGFsbGVuZ2VEZWNrLmFsbChDaGFsbGVuZ2VDYXJkKSxcclxuICAgICAgICApLmRvKCh7IGNoYWxsZW5nZUNhcmQgfSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYWxsU2xvdHMgPSBwbGF5ZXIuYWxsTXkoU2xvdCwgeyBncm91cDogJ2NoYWxsZW5nZXNsb3QnIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBlbXB0eVNsb3RzID0gYWxsU2xvdHMuZmlsdGVyKHNsb3QgPT4gIXNsb3QuaGFzKENoYWxsZW5nZUNhcmQpKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQWxsIENoYWxsZW5nZSBTbG90czonLCBlbXB0eVNsb3RzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbXB0eVNsb3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIGZpbmQgdGhlICBlbXB0eSBjaGFsbGVuZ2VTbG90IGFuZCBwbGFjZSB0aGUgaXRlbVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZnJlZVNsb3QgPSBlbXB0eVNsb3RzLmZpcnN0KCkhO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZnJlZSBTbG90czonLCBmcmVlU2xvdCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzbG90cyBub3cnLCBwbGF5ZXIuYWxsTXkoU2xvdCwgeyBncm91cDogJ2NoYWxsZW5nZXNsb3QnIH0pKTtcclxuICAgICAgICAgICAgICAgIGNoYWxsZW5nZUNhcmQucHV0SW50byhmcmVlU2xvdCkhOyAvL2VtcHR5U2xvdHNbMF0pOyAvLyQuc2xvdDEpOyBcclxuICAgICAgICAgICAgICAgIGdhbWUubWVzc2FnZShge3twbGF5ZXJ9fSBwbGFjZWQgYSBuZXcgY2hhbGxlbmdlIGNhcmQuYCwgeyBwbGF5ZXI6IHBsYXllciB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdhbWUubWVzc2FnZShge3twbGF5ZXJ9fSBkb2VzIG5vdCBoYXZlIGFueSBlbXB0eSBzbG90cyB0byBwbGFjZSB0aGlzIGNoYWxsZW5nZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBwbGF5ZXI6IHBsYXllciB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLFxyXG5cclxuICAgICAgICBzdGFzaENhcmQ6IHBsYXllciA9PiBhY3Rpb24oe1xyXG4gICAgICAgICAgICBwcm9tcHQ6ICdTdGFzaCBhIGNoYWxsZW5nZSBjYXJkJyxcclxuICAgICAgICAgICAgY29uZGl0aW9uOiAhcGxheWVyLnN0YXNoZWRUaGlzVHVybixcclxuICAgICAgICB9KS5jaG9vc2VPbkJvYXJkKFxyXG4gICAgICAgICAgICAnY2hhbGxlbmdlQ2FyZCcsIHBsYXllci5teSgnaGFuZCcpIS5hbGwoQ2hhbGxlbmdlQ2FyZCksIC8vIGNoYWxsZW5nZURlY2tcclxuICAgICAgICApLm1vdmUoXHJcbiAgICAgICAgICAgICdjaGFsbGVuZ2VDYXJkJywgJC5kaXNjYXJkZWRcclxuICAgICAgICApLmRvKCh7IGNoYWxsZW5nZUNhcmQgfSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLnJlc291cmNlcyA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIucmVzb3VyY2VzIC09IDE7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuc2NvcmUgKz0gMTtcclxuICAgICAgICAgICAgICAgIHBsYXllci5zdGFzaGVkVGhpc1R1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5tZXNzYWdlKGB7e3BsYXllcn19IHN0YXNoZWQgYSBjYXJkIGFuZCBpbmNyZWFzZWQgdGhlaXIgc2NvcmUgYnkgMS5gLCB7IHBsYXllcjogcGxheWVyIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAgIC8vIGFsbG93IGEgcGxheWVyIHRvIHNraXAgdGhlaXIgdHVybiBieSBzZXR0aW5nIHRoZWlyIHJlc291cmNlcyB0byAwXHJcbiAgICAgICAgc2tpcDogcGxheWVyID0+IGFjdGlvbih7XHJcbiAgICAgICAgICAgIHByb21wdDogJ3NraXAgdGhlIHJlc3Qgb2YgeW91ciB0dXJuJyxcclxuICAgICAgICB9KS5kbygoKSA9PiB7XHJcbiAgICAgICAgICAgIHBsYXllci5yZXNvdXJjZXMgPSAwO1xyXG4gICAgICAgICAgICBnYW1lLm1lc3NhZ2UoYHt7cGxheWVyfX0gcmVzb3VyY2VzIHBhc3NlZCBmb3IgdGhpcyB0dXJuLmAsXHJcbiAgICAgICAgICAgICAgICB7IHBsYXllcjogcGxheWVyIH0pO1xyXG4gICAgICAgIH0pLFxyXG5cclxuICAgICAgICBkcmF3RXZlbnQ6IHBsYXllciA9PiBhY3Rpb24oe1xyXG4gICAgICAgICAgICBwcm9tcHQ6ICdEcmF3IGFuIGV2ZW50IGNhcmQnLFxyXG4gICAgICAgIH0pLmNob29zZU9uQm9hcmQoXHJcbiAgICAgICAgICAgICdjYXJkJywgJC5ldmVudERlY2suYWxsKEV2ZW50Q2FyZCksXHJcbiAgICAgICAgKS5tZXNzYWdlKFxyXG4gICAgICAgICAgICBgQW4gZXZlbnQgb2NjdXJyZWQuLi4uYFxyXG4gICAgICAgICkuZG8oKHsgY2FyZCB9KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpbnRlcmZhY2UgUHJpbmNpcGxlRGF0YSB7XHJcbiAgICAgICAgICAgICAgICBwcmluY2lwbGU6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGV2ZW50VmFsdWU6IG51bWJlcjtcclxuICAgICAgICAgICAgICAgIGNoYWxsZW5nZVZhbHVlOiBudW1iZXIgfCBudWxsO1xyXG4gICAgICAgICAgICAgICAgc3RyYXRlZ3lWYWx1ZTogbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgdG9rZW5WYWx1ZTogbnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwcmluY2lwbGVzRGF0YTogUHJpbmNpcGxlRGF0YVtdID0gW1xyXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDEsIGV2ZW50VmFsdWU6IDAsIGNoYWxsZW5nZVZhbHVlOiAwLCBzdHJhdGVneVZhbHVlOiAwLCB0b2tlblZhbHVlOiAwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogMiwgZXZlbnRWYWx1ZTogMCwgY2hhbGxlbmdlVmFsdWU6IDAsIHN0cmF0ZWd5VmFsdWU6IDAsIHRva2VuVmFsdWU6IDAgfSxcclxuICAgICAgICAgICAgICAgIHsgcHJpbmNpcGxlOiAzLCBldmVudFZhbHVlOiAwLCBjaGFsbGVuZ2VWYWx1ZTogMCwgc3RyYXRlZ3lWYWx1ZTogMCwgdG9rZW5WYWx1ZTogMCB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcmluY2lwbGU6IDQsIGV2ZW50VmFsdWU6IDAsIGNoYWxsZW5nZVZhbHVlOiAwLCBzdHJhdGVneVZhbHVlOiAwLCB0b2tlblZhbHVlOiAwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByaW5jaXBsZTogNSwgZXZlbnRWYWx1ZTogMCwgY2hhbGxlbmdlVmFsdWU6IDAsIHN0cmF0ZWd5VmFsdWU6IDAsIHRva2VuVmFsdWU6IDAgfSxcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZXN0cmF0ZWdpZXMgPSBwbGF5ZXIubXkoJ2FjdGl2ZVN0cmF0ZWdpZXMnKSEuYWxsKFN0cmF0ZWd5Q2FyZCk7IC8vY29udGFpbmVyKGFjdGl2ZVN0cmF0ZWdpZXMhKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0FsbCBzdHJhdHM6JywgYWN0aXZlc3RyYXRlZ2llcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHZhbHVlcyBmcm9tIHRoZSBldmVudCBjYXJkXHJcbiAgICAgICAgICAgIGNhcmQuaW1wYWN0Py5mb3JFYWNoKGltcGFjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmluY2lwbGVEYXRhID0gcHJpbmNpcGxlc0RhdGEuZmluZChwID0+IHAucHJpbmNpcGxlID09PSBpbXBhY3QucHJpbmNpcGxlKTtcclxuICAgICAgICAgICAgICAgIGlmIChwcmluY2lwbGVEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbmNpcGxlRGF0YS5ldmVudFZhbHVlICs9IGltcGFjdC52YWx1ZSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZ2dyZWdhdGUgdmFsdWVzIGZyb20gdGhlIGFjdGl2ZSBzdHJhdGVnaWVzXHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVzdHJhdGVnaWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZXN0cmF0ZWdpZXMuZm9yRWFjaChzdHJhdGVneSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyYXRlZ3kuY29udHJpYnV0aW9uPy5wcmluY2lwbGVzLmZvckVhY2gocHJpbmNpcGxlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpbmNpcGxlRGF0YSA9IHByaW5jaXBsZXNEYXRhLmZpbmQocCA9PiBwLnByaW5jaXBsZSA9PT0gcHJpbmNpcGxlLnByaW5jaXBsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmluY2lwbGVEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmluY2lwbGVEYXRhLnN0cmF0ZWd5VmFsdWUgKz0gcHJpbmNpcGxlLnZhbHVlIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gVGhlbiBJIHdhbnQgdG8gY2hlY2sgZWFjaCBjaGFsbGVuZ2UgY2FyZCB0bzpcclxuICAgICAgICAgICAgLy8gMS4gU2VlIHdoZXRoZXIgdGhlIGNhcmQgcmVxdWlyZW1lbnRzIHJlbGF0ZSB0byB0aGUgLWltcGFjdCBvZiB0aGUgZXZlbnRcclxuICAgICAgICAgICAgLy8gMi4gRm9yIFRSVUUsIGNoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgc3RyYXRlZ3kgY2FyZHMgZXhjZWVkIHRoZSBpbXBhY3Qgb2YgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgIC8vIDMuIEZvciBGQUxTRSwgY2hlY2sgd2hldGhlciB0aGUgY2FyZCBoYXMgYW55IHJlc291cmNlIHRva2VucyBwbGFjZWQgb24gaXRcclxuICAgICAgICAgICAgLy8gNC4gRm9yIFRSVUUsIGNoZWNrIHdoZXRoZXIgdGhvc2UgcmVzb3VyY2UgdG9rZW4gdmFsdWVzIGV4Y2VlZCB0aGUgaW1wYWN0IG9mIHRoZSBldmVudFxyXG4gICAgICAgICAgICAvLyA1LiBGb3IgRkFMU0UsIG1vdmUgdGhlIHJlc291cmNlIHRva2VucyB0byB0aGUgd2FzdGVkUmVzb3VyY2Ugc3BhY2VcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBhcnJheSB0byBzdG9yZSB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgICBpbnRlcmZhY2UgUmVzdWx0IHtcclxuICAgICAgICAgICAgICAgIGNoYWxsZW5nZTogQ2hhbGxlbmdlQ2FyZDtcclxuICAgICAgICAgICAgICAgIGZhaWxUZXN0OiBQcmluY2lwbGVEYXRhW107XHJcbiAgICAgICAgICAgICAgICB0b2tlblN1bTogbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgcmlza2VkVG9rZW5zOiBUb2tlbltdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHM6IFJlc3VsdFtdID0gW107XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVjaGFsbGVuZ2VzID0gcGxheWVyLm15KCdjaGFsbGVuZ2VTbG90cycpIS5hbGwoQ2hhbGxlbmdlQ2FyZCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2FjdGl2ZWNoYWxsZW5nZTonLCBhY3RpdmVjaGFsbGVuZ2VzKTtcclxuXHJcbiAgICAgICAgICAgIGFjdGl2ZWNoYWxsZW5nZXMuZm9yRWFjaChjaGFsbGVuZ2UgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgcmVxdWlyZW1lbnRzIGZvciB0aGF0IGNhcmRcclxuICAgICAgICAgICAgICAgIGNoYWxsZW5nZS5yZXF1aXJlbWVudHM/LnByaW5jaXBsZXMuZm9yRWFjaChwcmluY2lwbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW5jaXBsZURhdGEgPSBwcmluY2lwbGVzRGF0YS5maW5kKHAgPT4gcC5wcmluY2lwbGUgPT09IHByaW5jaXBsZS5wcmluY2lwbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmluY2lwbGVEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW5jaXBsZURhdGEuY2hhbGxlbmdlVmFsdWUgPSBwcmluY2lwbGUudmFsdWUgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGlzIGV2ZW50IG1hdGNoZXMgdGhlIHJlcXVpcmVtZW50cyBvZiB0aGUgY2hhbGxlbmdlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGluZ1ByaW5jaXBsZXMgPSBwcmluY2lwbGVzRGF0YS5maWx0ZXIocm93ID0+XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LmV2ZW50VmFsdWUgPCAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgcm93LmNoYWxsZW5nZVZhbHVlICE9IG51bGwgJiZcclxuICAgICAgICAgICAgICAgICAgICByb3cuY2hhbGxlbmdlVmFsdWUgPiAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBtYXRjaCwgY2hlY2sgd2hldGhlciB0aGUgZXZlbnQgZXhjZWVkcyB0aGUgYWN0aXZlc3RyYXRlZ2llcyBpbiBwbGF5IGZvciB0aGUgY2hhbGxlbmdlc1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoaW5nUHJpbmNpcGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFpbFRlc3QgPSBtYXRjaGluZ1ByaW5jaXBsZXMuZmlsdGVyKHJvdyA9PiAocm93LmV2ZW50VmFsdWUgKyByb3cuc3RyYXRlZ3lWYWx1ZSkgPCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXNzVGVzdCA9IG1hdGNoaW5nUHJpbmNpcGxlcy5maWx0ZXIocm93ID0+IChyb3cuZXZlbnRWYWx1ZSArIHJvdy5zdHJhdGVneVZhbHVlKSA+PSAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxUZXN0Lmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgdG9rZW4gdmFsdWVzIGZvciBlYWNoIGNoYWxsZW5nZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsU2xvdHMgPSBwbGF5ZXIuYWxsTXkoU2xvdCwgeyBncm91cDogJ2NoYWxsZW5nZXNsb3QnIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByaXNrZWRTbG90cyA9IGFsbFNsb3RzLmZpbHRlcihzbG90ID0+IHNsb3QuaGFzKGNoYWxsZW5nZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByaXNrZWRUb2tlbnMgPSByaXNrZWRTbG90cy5hbGwoVG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlblN1bSA9IHJpc2tlZFRva2Vucy5zdW0odG9rZW4gPT4gdG9rZW4ucXVhbGl0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc3QgdG9rZW5TdW06IG51bWJlciA9IHJpc2tlZFRva2Vucy5yZWR1Y2UoKHN1bSwgdG9rZW4pID0+IHN1bSArIHRva2VuLnF1YWxpdHksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB0b2tlblN1bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmlza2VkVG9rZW5zLmZvckVhY2godG9rZW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0b2tlblN1bSArPSB0b2tlbi5xdWFsaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rva2Vuc3VtJywgdG9rZW5TdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYW4gYXJyYXkgdG8gc3RvcmUgdGhlIG91dHB1dCBmcm9tIHRoaXMgbG9vcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbGxlbmdlOiBjaGFsbGVuZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsVGVzdDogZmFpbFRlc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaXNrZWRUb2tlbnM6IHJpc2tlZFRva2VucywgLy9yaXNrZWRUb2tlbnMsIC8vbnVtYmVyIG9mIHRva2Vucywgbm90IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlblN1bTogdG9rZW5TdW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWRlbnRpZnkgdGhlIGZhaWxpbmcgcHJpbmNpcGxlc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFpbGluZ1ByaW5jaXBsZXMgPSByZXN1bHRzLmZsYXRNYXAocmVzdWx0ID0+XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZhaWxUZXN0Lm1hcChmYWlsID0+IGZhaWwucHJpbmNpcGxlKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBtYXggZXZlbnRcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcnN0SW1wYWN0ID0gTWF0aC5tYXgoLi4ucmVzdWx0cy5mbGF0TWFwKHJlc3VsdCA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mYWlsVGVzdC5tYXAoZmFpbCA9PiBmYWlsLmV2ZW50VmFsdWUpXHJcbiAgICAgICAgICAgICAgICApKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgc3RyYXRlZ3kgY2FyZHNcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZWZ1bFN0cmF0ZWdpZXMgPSBwbGF5ZXIubXkoJ2hhbmQnKSEuYWxsKFN0cmF0ZWd5Q2FyZCkuZmlsdGVyKHN0cmF0ZWd5Q2FyZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmF0ZWd5Q2FyZC5jb250cmlidXRpb24/LnByaW5jaXBsZXMuc29tZShwcmluY2lwbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFpbGluZ1ByaW5jaXBsZXMuaW5jbHVkZXMocHJpbmNpcGxlLnByaW5jaXBsZSkgJiYgKHByaW5jaXBsZS52YWx1ZSB8fCAwKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmluY2lwbGVzRGF0YS5maW5kKHAgPT4gcC5wcmluY2lwbGUgPT09IHByaW5jaXBsZS5wcmluY2lwbGUpIS5zdHJhdGVneVZhbHVlID49XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhwcmluY2lwbGVzRGF0YS5maW5kKHAgPT4gcC5wcmluY2lwbGUgPT09IHByaW5jaXBsZS5wcmluY2lwbGUpIS5ldmVudFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZWZ1bFRva2VucyA9IHBsYXllci5teSgncG9vbCcpIS5hbGwoVG9rZW4pLmZpbHRlcih0b2sgPT4gdG9rLnF1YWxpdHkgPj0gTWF0aC5hYnMod29yc3RJbXBhY3QpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGF0IHRoZSB0b2tlbiBzbG90cyBvbiB0aGUgZmFpbGluZyBjaGFsbGVuZ2UgY2FyZHMgbWF0Y2ggdGhlIHVzZWZ1bFRva2Vucy50eXBlXHJcbiAgICAgICAgICAgICAgICAvLyBob3cgdG8gZ2V0IHdoaWNoIHNsb3RzLiBBUkdILiAgT3RoZXJzPyBPciBwYXJlbnQgb2YgdGhlbT9cclxuICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciB1c2VmdWxTbG90cyB0byBhY2Nlc3MgdGhlaXIgdG9rZW5TcGFjZSBjaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlZnVsU2xvdHMgPSBhY3RpdmVjaGFsbGVuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcChjaGFsbGVuZ2UgPT4gY2hhbGxlbmdlLmNvbnRhaW5lcihTbG90KSkuZmxhdE1hcChzbG90ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWNjZXNzIHRoZSB0b2tlblNwYWNlIGNoaWxkcmVuIG9mIGVhY2ggc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlblNwYWNlcyA9IHNsb3QhLmFsbChTcGFjZSkuZmlsdGVyKHNwYWNlID0+IHNwYWNlLm5hbWUgPT09ICd0b2tlblNwYWNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbHRlciB0aGUgdG9rZW5TcGFjZSBzbG90cyBiYXNlZCBvbiB0aGUgVG9rZW4gdHlwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5TcGFjZXMuZmxhdE1hcCh0b2tlblNwYWNlID0+IHRva2VuU3BhY2UuYWxsKFNwYWNlKS5maWx0ZXIoc3BhY2UgPT4gdXNlZnVsVG9rZW5zLnNvbWUodG9rZW4gPT4gdG9rZW4udHlwZSA9PT0gc3BhY2UubmFtZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBmbGF0IG1hcCBvZiByZXN1bHQucmlza2VkVG9rZW5zIGFuZCByZXN1bHQuY2hhbGxlbmdlLm5hbWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJpc2tlZFRva2Vuc01hcCA9IHJlc3VsdHMuZmxhdE1hcChyZXN1bHQgPT5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucmlza2VkVG9rZW5zLm1hcCh0b2tlbiA9PiB0b2tlbikgLy8gQXNzdW1pbmcgYHRva2VuYCBpcyBhIEdhbWVFbGVtZW50XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGltcGFjdGVkQ2hhbGxlbmdlcyA9IHJlc3VsdHMuZmxhdE1hcChyZXN1bHQgPT5cclxuICAgICAgICAgICAgICAgICAgICBbcmVzdWx0LmNoYWxsZW5nZS5uYW1lXSAvLyBXcmFwIHRoZSBzdHJpbmcgaW4gYW4gYXJyYXkgc28gYGZsYXRNYXBgIHdvcmtzXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRoZW4gcGFzcyBhbGwgb2YgdGhpcyBpbmZvcm1hdGlvbiB0byBhIGZvbGxvd3VwIHRvIHRoZSBwbGF5ZXIgY2FuIHJlc29sdmUgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAvLyB1c2VmdWxTbG90cyBob2xkcyB0aGUgdmFsaWQgcG9zaXRpb25zXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltbWVkaWF0ZWx5IHByaW9yIHRvIHRoZSByZXNvbHZlRXZlbnQgZm9sbG93dXAnKVxyXG4gICAgICAgICAgICAgICAgLy8gVXNpbmcgZm9sbG93VXBcclxuICAgICAgICAgICAgICAgIGdhbWUuZm9sbG93VXAoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdyZXNvbHZlRXZlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlZnVsU2xvdHM6IHVzZWZ1bFNsb3RzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VmdWxUb2tlbnM6IHVzZWZ1bFRva2VucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlZnVsU3RyYXRlZ2llczogdXNlZnVsU3RyYXRlZ2llcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlza2VkVG9rZW5zTWFwOiByaXNrZWRUb2tlbnNNYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltcGFjdGVkQ2hhbGxlbmdlczogaW1wYWN0ZWRDaGFsbGVuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9IC8vIFRISVMgSVMgVEhFIEVORCBPRiBUSEUgJ2NoZWNrIGZhaWxzJyBDT05ESVRJT05BTDsgIC8vIERPIEkgTkVFRCBBTiBFTFNFIEhFUkUgVE8gTE9PUCBUSFJPVUdIIEdBTUVQTEFZIFJPVU5EUz9cclxuICAgICAgICB9KSwgLy8gVEhJUyBJUyBUSEUgRU5EIE9GIFRIRSBEUkFXIEVWRU5UIEFDVElPTlxyXG5cclxuICAgICAgICAvLyBUaGVuIGFjdGlvbiB0byBjaGVjayB3aXRoIHRoZSB1c2VyIHdoYXQgdGhleSB3YW50IHRvIGRvLCBtaXRpZ2F0ZSBvciBhY2NlcHQgYW5kIGVuYWN0IFxyXG4gICAgICAgIC8vIHdpdGggZm9sbG93dXAgdG8gZGlmZmVyZW50IGFjdGlvbnMgZGVwZW5kaW5nIG9uIGRlY2lzaW9uXHJcblxyXG4gICAgICAgIHJlc29sdmVFdmVudDogcGxheWVyID0+IGFjdGlvbjx7XHJcbiAgICAgICAgICAgIHVzZWZ1bFNsb3RzOiBTbG90W107IC8vIFRlbXBvcmFyeSB1c2UgJ2FueScgcGxhY2Vob2xkZXIsIHByZXZpb3VzbHkgaGFkIHRoaXMgYXMgU3BhY2UsIFRva2VuLCBUb2tlbiwgUmlza2VkVG9rZW5bXVxyXG4gICAgICAgICAgICB1c2VmdWxUb2tlbnM6IFRva2VuW10sXHJcbiAgICAgICAgICAgIHVzZWZ1bFN0cmF0ZWdpZXM6IFN0cmF0ZWd5Q2FyZFtdLFxyXG4gICAgICAgICAgICByaXNrZWRUb2tlbnNNYXA6IGFueVtdLFxyXG4gICAgICAgICAgICBpbXBhY3RlZENoYWxsZW5nZXM6IENoYWxsZW5nZUNhcmRbXVxyXG4gICAgICAgIH0+KHtcclxuICAgICAgICAgICAgcHJvbXB0OiAnVGhlIGV2ZW50IGhhcyBpbXBhY3RlZCBhIGNoYWxsZW5nZSBjYXJkLiBEbyB5b3Ugd2FudCB0byBtaXRpZ2F0ZSB0aGUgaW1wYWN0PycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnbWl0aWdhdGlvbicsXHJcbiAgICAgICAgfSkuY2hvb3NlRnJvbSgnb3B0aW9ucycsIFtcclxuICAgICAgICAgICAgeyBjaG9pY2U6ICdwbGF5JywgbGFiZWw6ICdQbGF5IGEgc3RyYXRlZ3kgY2FyZCcgfSxcclxuICAgICAgICAgICAgeyBjaG9pY2U6ICd0b2tlbicsIGxhYmVsOiAnUGxheSBhbiBhdmFpbGFibGUgdG9rZW4nIH0sXHJcbiAgICAgICAgICAgIHsgY2hvaWNlOiAnYWNjZXB0JywgbGFiZWw6ICdBY2NlcHQgdGhlIGltcGFjdCBvZiB0aGUgZXZlbnQnIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICApLmRvKCh7IG9wdGlvbnMsIHVzZWZ1bFNsb3RzLCB1c2VmdWxUb2tlbnMsIHVzZWZ1bFN0cmF0ZWdpZXMsIHJpc2tlZFRva2Vuc01hcCwgaW1wYWN0ZWRDaGFsbGVuZ2VzIH0pID0+IHtcclxuICAgICAgICAgICAgLy8gTG9nIGFsbCBhcmd1bWVudHMgKHRoZXkgYWxsIHBhc3MgY29ycmVjdGx5KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2VsZWN0ZWQgT3B0aW9uOicsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndXNlZnVsU2xvdHM6JywgdXNlZnVsU2xvdHMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndXNlZnVsVG9rZW5zOicsIHVzZWZ1bFRva2Vucyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VmdWxTdHJhdGVnaWVzOicsIHVzZWZ1bFN0cmF0ZWdpZXMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmlza2VkVG9rZW5zTWFwOicsIHJpc2tlZFRva2Vuc01hcCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbXBhY3RlZENoYWxsZW5nZXM6JywgaW1wYWN0ZWRDaGFsbGVuZ2VzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zID09PSAncGxheScpIHtcclxuICAgICAgICAgICAgICAgIC8vIFByb21wdCB0aGUgdXNlciB0byBjaG9vc2UgYSBzdHJhdGVneSBjYXJkXHJcbiAgICAgICAgICAgICAgICBnYW1lLmZvbGxvd1VwKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnbWl0aWdhdGVQbGF5JyxcclxuICAgICAgICAgICAgICAgICAgICBhcmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZWZ1bFN0cmF0ZWdpZXM6IHVzZWZ1bFN0cmF0ZWdpZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMgPT09ICd0b2tlbicpIHtcclxuICAgICAgICAgICAgICAgIC8vUHJvbXB0IHRoZSB1c2VyIHRvIGNob29zZSBhIHRva2VuXHJcbiAgICAgICAgICAgICAgICBnYW1lLmZvbGxvd1VwKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnbWl0aWdhdGVUb2tlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJnczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VmdWxUb2tlbnM6IHVzZWZ1bFRva2VucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlZnVsU2xvdHM6IHVzZWZ1bFNsb3RzXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMgPT09ICdhY2NlcHQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgYWNjZXB0aW5nIHRoZSBpbXBhY3Qgb2YgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgICAgICByaXNrZWRUb2tlbnNNYXAuZm9yRWFjaCh0b2tlbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4ucHV0SW50byhwbGF5ZXIubXkoJ3dhc3RlZFJlc291cmNlJykhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5tZXNzYWdlKGBSZXNvdXJjZSB0b2tlbnMgbW92ZWQgZnJvbSB7e2ltcGFjdGVkQ2hhbGxlbmdlc319IHRvIHRoZSB3YXN0ZWRSZXNvdXJjZSBzcGFjZS5gLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaW1wYWN0ZWRDaGFsbGVuZ2VzOiBpbXBhY3RlZENoYWxsZW5nZXMgfSk7XHJcbiAgICAgICAgICAgICAgICAvL2dhbWUuZm9sbG93VXAoeyBuYW1lOiAncGxheWVyaW50dXJucGhhc2UnIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB9IC8vIEVORCBPRiBUSEUgRUxTRSBJRlxyXG4gICAgICAgIH0pLCAvLyBlbmQgb3RoZSBhY3Rpb25cclxuXHJcbiAgICAgICAgbWl0aWdhdGVUb2tlbjogcGxheWVyID0+IGFjdGlvbjx7XHJcbiAgICAgICAgICAgIHVzZWZ1bFRva2VuczogVG9rZW5bXSxcclxuICAgICAgICAgICAgdXNlZnVsU2xvdHM6IFNsb3RbXVxyXG4gICAgICAgIH0+KHtcclxuICAgICAgICAgICAgLy8gUHJvbXB0IHRoZSB1c2VyIHRvIGNob29zZSBhIHRva2VuIGFuZCBjb3JyZXNwb25kaW5nIHNsb3QgKG9yIGF1dG9tYXRpY2FsbHkgYWxsb2NhdGUgaXQpXHJcbiAgICAgICAgICAgIHByb21wdDogJ0Nob29zZSBhIFRva2VuIGFuZCBTbG90IHRvIHBsYXknLFxyXG4gICAgICAgIH0pLmNob29zZU9uQm9hcmQoJ2Nob3NlblRva2VuJywgKHsgdXNlZnVsVG9rZW5zIH0pID0+IHVzZWZ1bFRva2VucykuY2hvb3NlT25Cb2FyZCgnY2hvc2VuU2xvdCcsICh7IHVzZWZ1bFNsb3RzIH0pID0+IHVzZWZ1bFNsb3RzKS5kbygoeyBjaG9zZW5Ub2tlbiwgY2hvc2VuU2xvdCwgdXNlZnVsU2xvdHMsIHVzZWZ1bFRva2VucyB9KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIElkZWFsbHkgaGF2ZSB2YWxpZGF0aW9uIGhlcmUgdG8gY2hlY2sgdGhlIHNsb3QgdHlwZSBhbmQgdG9rZW4gdHlwZSBtYXRjaFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndXNlZnVsVG9rZW5zJywgdXNlZnVsVG9rZW5zKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3VzZWZ1bFNsb3RzJywgdXNlZnVsU2xvdHMpO1xyXG5cclxuICAgICAgICAgICAgY2hvc2VuVG9rZW4ucHV0SW50byhjaG9zZW5TbG90KTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllci5teSgncG9vbCcpIS5maXJzdChUb2tlbik/LnB1dEludG8oJC53YXN0ZWRSZXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICBnYW1lLm1lc3NhZ2UoYHt7cGxheWVyfX0gb25lIHRva2VuIGRpc2NhcmRlZCwgYW5kIHRva2VuIHBsYWNlZC4gRHJhdyBhbm90aGVyIGV2ZW50IHRvIHByb2NlZWQuLi5gLFxyXG4gICAgICAgICAgICAgICAgeyBwbGF5ZXI6IHBsYXllciB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBsYXllciBtaXRpZ2F0ZWQgc28gbXVzdCBwYXNzIHRocm91Z2ggYW4gZXZlbnQgdG8gcHJvY2VlZFxyXG4gICAgICAgICAgICBnYW1lLmZvbGxvd1VwKHsgbmFtZTogJ2RyYXdFdmVudCcgfSk7XHJcblxyXG4gICAgICAgIH0pLCAvLyBFbmQgb2YgdGhlIGFjdGlvbiBjYWxsXHJcblxyXG4gICAgICAgIG1pdGlnYXRlUGxheTogcGxheWVyID0+IGFjdGlvbjx7XHJcbiAgICAgICAgICAgIHVzZWZ1bFN0cmF0ZWdpZXM6IFN0cmF0ZWd5Q2FyZFtdXHJcbiAgICAgICAgfT4oe1xyXG4gICAgICAgICAgICAvLyBQcm9tcHQgdGhlIHVzZXIgdG8gY2hvb3NlIGEgc3RyYXRlZ3kgY2FyZFxyXG4gICAgICAgICAgICBwcm9tcHQ6ICdDaG9vc2UgYSBzdHJhdGVneSBjYXJkIHRvIHBsYXknLFxyXG4gICAgICAgIH0pLmNob29zZU9uQm9hcmQoJ2Nob3NlbkNhcmQnLCAoeyB1c2VmdWxTdHJhdGVnaWVzIH0pID0+IHVzZWZ1bFN0cmF0ZWdpZXMpLmRvKCh7IGNob3NlbkNhcmQgfSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBoZXJlIEkgZG9uJ3QgdW5kZXJzdGFuZCB3aGF0ICh7IHVzZWZ1bFN0cmF0ZWdpZXMgfSkgPT4gdXNlZnVsU3RyYXRlZ2llcyBpcyBkb2luZ1xyXG4gICAgICAgICAgICAvLyBvciB3aHkgKHsgdXNlZnVsU3RyYXRlZ2llcyB9KSAob3IgdmFyaWFudHMgdGhlcmVvZikgZG9lc24ndCB3b3JrXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2Nob3NlbmNhcmQnLCAoeyBjaG9zZW5DYXJkIH0pKTtcclxuXHJcbiAgICAgICAgICAgIGNob3NlbkNhcmQucHV0SW50bygkLmRpc2NhcmRlZCk7XHJcbiAgICAgICAgICAgIHBsYXllci5teSgncG9vbCcpIS5maXJzdChUb2tlbik/LnB1dEludG8oJC53YXN0ZWRSZXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIHdvcmtzIGJ1dCBjb25zb2xlIGlzIGdpdmluZyBkZXNlcmlhbGl6ZVNpbmdsZUFyZzxAaHR0cDovL2xvY2FsaG9zdDo4MDgwL2dhbWUuanM6NzY2OjEzXHJcblxyXG4gICAgICAgICAgICAvL2NvbnN0IGRzID0gJC5kaXNjYXJkZWQ7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2Rpc2NhcmRlZCBjb250ZW50cycsICh7IGRzIH0pICk7XHJcblxyXG4gICAgICAgICAgICBnYW1lLm1lc3NhZ2UoYHt7cGxheWVyfX0gcGxheWVkIGFuZCBkaXNjYXJkZWQgc3RyYXRlZ3kgY2FyZCB7e2Nob3NlbkNhcmR9fSB0byBtaXRpZ2F0ZSB0aGUgaW1wYWN0LmAsXHJcbiAgICAgICAgICAgICAgICB7IGNob3NlbkNhcmQ6IGNob3NlbkNhcmQsIHBsYXllcjogcGxheWVyIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gUGxheWVyIG1pdGlnYXRlZCBzbyBtdXN0IHBhc3MgdGhyb3VnaCBhbiBldmVudCB0byBwcm9jZWVkXHJcbiAgICAgICAgICAgIGdhbWUuZm9sbG93VXAoeyBuYW1lOiAnZHJhd0V2ZW50JyB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSksIC8vIEVuZCBvZiB0aGUgYWN0aW9uIGNhbGxcclxuXHJcbiAgICAgICAgcGxheUlubm92YXRpb246IHBsYXllciA9PiBhY3Rpb24oe1xyXG4gICAgICAgICAgICBwcm9tcHQ6ICdQbGF5IGFuIGlubm92YXRpb24gdG9rZW4gb24gYSBjaGFsbGVuZ2UgY2FyZCcsXHJcbiAgICAgICAgfSkuY2hvb3NlT25Cb2FyZChcclxuICAgICAgICAgICAgJ2Nob3NlblRva2VuJywgcGxheWVyLm15KCdwb29sJykhLmFsbChUb2tlbikgLy8gdmFsaWRhdGUgdGhhdCB0aGV5IGNhbiBhZmZvcmQgaXQuIFRyaWVkIHRvIHVzZSBwbGFjZVBpZWNlIGhlcmUgYW5kIGZhaWxlZC4gSW5lbGVnYW50IGZpbHRlciBoZXJlLi4uXHJcbiAgICAgICAgKS5jaG9vc2VPbkJvYXJkKCdjaG9zZW5TcGFjZScsICh7IGNob3NlblRva2VuIH0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGdhbWUuYWxsKFNwYWNlLCAndG9rZW5TcGFjZScpLmZpbHRlcih0b2tlblNwYWNlID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBwYXJlbnQgY29udGFpbnMgYW4gb2JqZWN0IG9mIHR5cGUgQ2hhbGxlbmdlQ2FyZFxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50U2xvdCA9IHRva2VuU3BhY2UuY29udGFpbmVyKFNsb3QpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudFNsb3QgJiYgcGFyZW50U2xvdC5oYXMoQ2hhbGxlbmdlQ2FyZCk7XHJcbiAgICAgICAgICAgIH0pLmZsYXRNYXAodG9rZW5TcGFjZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXRyaWV2ZSBvbmx5IHRoZSBlbXB0eSBjaGlsZHJlbiBvZiAndG9rZW5TcGFjZScgd2hlcmUgc3BhY2UubmFtZSBtYXRjaGVzIGNob3NlblRva2VuLnR5cGVcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlblNwYWNlLmFsbChTcGFjZSkuZmlsdGVyKHNwYWNlID0+IHNwYWNlLmlzRW1wdHkoKSAmJiBzcGFjZS5uYW1lID09PSBjaG9zZW5Ub2tlbi50eXBlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuZG8oKHsgY2hvc2VuVG9rZW4sIGNob3NlblNwYWNlIH0pID0+IHtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5yZXNvdXJjZXMgPj0gY2hvc2VuVG9rZW4ucXVhbGl0eSAmJiBjaG9zZW5Ub2tlbi50eXBlID09PSBjaG9zZW5TcGFjZS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIucmVzb3VyY2VzIC09IGNob3NlblRva2VuLnF1YWxpdHk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLm1lc3NhZ2UoYHt7cGxheWVyfX0gcGxheWVkIGEge3t0b2tlbn19IHRva2VuIG9uIGEgY2hhbGxlbmdlIGNhcmQuYCxcclxuICAgICAgICAgICAgICAgICAgICB7IHBsYXllcjogcGxheWVyLCB0b2tlbjogY2hvc2VuVG9rZW4udHlwZSB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdhbWUubWVzc2FnZShge3twbGF5ZXJ9fSBkb2VzIG5vdCBoYXZlIGVub3VnaCByZXNvdXJjZXMgb3IgdGhlIHNwYWNlIGRvZXMgbm90IG1hdGNoIHRoZSB0b2tlbiB0eXBlLmAsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBwbGF5ZXI6IHBsYXllciB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLFxyXG5cclxuICAgICAgICBjaGVja1N0YXR1czogcGxheWVyID0+IGFjdGlvbih7XHJcbiAgICAgICAgICAgIHByb21wdDogJ0NoZWNrIHRoZSBzdGF0dXMgb2YgdGhlIGdhbWUnLFxyXG4gICAgICAgIH0pLmRvKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIERlZmluZSB0aGUgdHlwZSBmb3IgUHJpbmNpcGxlXHJcbiAgICAgICAgICAgIGludGVyZmFjZSBQcmluY2lwbGUge1xyXG4gICAgICAgICAgICAgICAgcHJpbmNpcGxlOiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogbnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEZWZpbmUgdGhlIHR5cGUgZm9yIFN0cmF0ZWd5Q2FyZFxyXG4gICAgICAgICAgICBpbnRlcmZhY2UgU3RyYXRlZ3lDYXJkIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyaWJ1dGlvbj86IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmluY2lwbGVzOiBQcmluY2lwbGVbXTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIDEuIENvbXBpbGUgYWN0aXZlIHN0cmF0ZWdpZXNcclxuICAgICAgICAgICAgY29uc3QgcHJpbmNpcGxlc0RhdGE6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlU3RyYXRlZ2llcyA9IHBsYXllci5teSgnYWN0aXZlU3RyYXRlZ2llcycpIS5hbGwoU3RyYXRlZ3lDYXJkKTtcclxuICAgICAgICAgICAgYWN0aXZlU3RyYXRlZ2llcy5mb3JFYWNoKHN0cmF0ZWd5ID0+IHtcclxuICAgICAgICAgICAgICAgIHN0cmF0ZWd5LmNvbnRyaWJ1dGlvbj8ucHJpbmNpcGxlcy5mb3JFYWNoKHByaW5jaXBsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpbmNpcGxlS2V5ID0gcHJpbmNpcGxlLnByaW5jaXBsZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcmluY2lwbGVzRGF0YVtwcmluY2lwbGVLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW5jaXBsZXNEYXRhW3ByaW5jaXBsZUtleV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwcmluY2lwbGVzRGF0YVtwcmluY2lwbGVLZXldICs9IHByaW5jaXBsZS52YWx1ZSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gMi4gSWRlbnRpZnkgYWN0aXZlIGNoYWxsZW5nZXNcclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2hhbGxlbmdlcyA9IHBsYXllci5teSgnY2hhbGxlbmdlU2xvdHMnKSEuYWxsKENoYWxsZW5nZUNhcmQpO1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlQ2hhbGxlbmdlcy5mb3JFYWNoKGNoYWxsZW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAyYS4gR2V0IHRoZSByZXF1aXJlbWVudHMgZm9yIHRoZSBjaGFsbGVuZ2VcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoYWxsZW5nZVByaW5jaXBsZXM6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuICAgICAgICAgICAgICAgIGNoYWxsZW5nZS5yZXF1aXJlbWVudHM/LnByaW5jaXBsZXMuZm9yRWFjaChwcmluY2lwbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW5jaXBsZUtleSA9IHByaW5jaXBsZS5wcmluY2lwbGUgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYWxsZW5nZVByaW5jaXBsZXNbcHJpbmNpcGxlS2V5XSA9IHByaW5jaXBsZS52YWx1ZSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gMmIuIENoZWNrIGlmIHN0cmF0ZWd5IGNvbnRyaWJ1dGlvbnMgZXhjZWVkIGNoYWxsZW5nZSByZXF1aXJlbWVudHNcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3NUZXN0ID0gT2JqZWN0LmtleXMoY2hhbGxlbmdlUHJpbmNpcGxlcykuZXZlcnkocHJpbmNpcGxlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGNoYWxsZW5nZVByaW5jaXBsZXNbcHJpbmNpcGxlXSB8fCAwKSA8PSAocHJpbmNpcGxlc0RhdGFbcHJpbmNpcGxlXSB8fCAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIDMuIENoZWNrIGlmIHRva2VuU3BhY2UgY29udGFpbnMgNCB0b2tlbnMgd2l0aCBkaWZmZXJlbnQgdHlwZXNcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuU3BhY2VzID0gY2hhbGxlbmdlLmNvbnRhaW5lcihTbG90KSEuYWxsKFNwYWNlKS5maWx0ZXIoc3BhY2UgPT4gc3BhY2UubmFtZSA9PT0gJ3Rva2VuU3BhY2UnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VucyA9IHRva2VuU3BhY2VzLmZsYXRNYXAodG9rZW5TcGFjZSA9PiB0b2tlblNwYWNlLmFsbChUb2tlbikpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdW5pcXVlVG9rZW5UeXBlcyA9IG5ldyBTZXQodG9rZW5zLm1hcCh0b2tlbiA9PiB0b2tlbi50eXBlKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhc3NUZXN0ICYmIHVuaXF1ZVRva2VuVHlwZXMuc2l6ZSA+PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMS4gU2V0IHRoZSBjaGFsbGVuZ2UgaXNfY29tcGxldGUgZmllbGQgdG8gJ3RydWUnXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbGxlbmdlLmlzX2NvbXBsZXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMi4gQWRkIHRoZSBjaGFsbGVuZ2UgJ3BvaW50cycgZmllbGQgdG8gdGhlIGN1cnJlbnQgc2NvcmVcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc2NvcmUgKz0gY2hhbGxlbmdlLnBvaW50cyB8fCAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAzLiBNb3ZlIHRoZSBjaGFsbGVuZ2UgdG8gdGhlICQuZGlzY2FyZGVkIHNwYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbGxlbmdlLnB1dEludG8oJC5kaXNjYXJkZWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnYW1lLm1lc3NhZ2UoYHt7cGxheWVyfX0gY29tcGxldGVkIHRoZSBjaGFsbGVuZ2UgYW5kIGVhcm5lZCB7e3BvaW50c319IHBvaW50cy5gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHBsYXllcjogcGxheWVyLCBwb2ludHM6IGNoYWxsZW5nZS5wb2ludHMgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgd2FzdGVkVG9rZW5zID0gcGxheWVyLm15KCd3YXN0ZWRSZXNvdXJjZScpIS5hbGwoVG9rZW4pLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHdpbi9sb3NlIGNvbmRpdGlvbnNcclxuICAgICAgICAgICAgaWYgKHBsYXllci5zY29yZSA+PSBnYW1lLndpbmNvbmRpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5tZXNzYWdlKGB7e3BsYXllcn19IHdpbnMgdGhlIGdhbWUhYCwgeyBwbGF5ZXI6IHBsYXllciB9KTtcclxuICAgICAgICAgICAgICAgIHBsYXllci5zdGF0dXMgPSAnd2luJztcclxuICAgICAgICAgICAgICAgIGdhbWUuZmluaXNoKHBsYXllcik7XHJcbiAgICAgICAgICAgICAgICAvLyBzZW5kIHRvIGEgd2lubmVyIGZsb3c7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2FzdGVkVG9rZW5zID49IGdhbWUubG9zZWNvbmRpdGlvbiB8fCBwbGF5ZXIubXkoJ3Bvb2wnKSEuYWxsKFRva2VuKS5sZW5ndGggPCA0IHx8IGdhbWUucm91bmQgPiBnYW1lLm1heFJvdW5kcykge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5tZXNzYWdlKGB7e3BsYXllcn19IGxvc2VzIHRoZSBnYW1lIWAsIHsgcGxheWVyOiBwbGF5ZXIgfSk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuc3RhdHVzID0gJ2xvc2UnO1xyXG4gICAgICAgICAgICAgICAgLy8gc2VuZCB0byBhIGxvc2VyIGZsb3dcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChnYW1lLnJvdW5kIDw9IDYpIHtcclxuICAgICAgICAgICAgICAgIGdhbWUubWVzc2FnZShge3twbGF5ZXJ9fSBwcm9jZWVkcyB0byB0aGUgbmV4dCByb3VuZCB3aXRoIHt7IHNjb3JlIH19IGFuZCByZXNvdXJjZSB7eyByZXNvdXJjZSB9fS5gLCB7IHBsYXllcjogcGxheWVyLCBzY29yZTogcGxheWVyLnNjb3JlLCByZXNvdXJjZTogcGxheWVyLnJlc291cmNlcyB9KTtcclxuICAgICAgICAgICAgICAgIGdhbWUucm91bmQgKz0gMTtcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIGdhbWUueCgpOyAvLyBoZXJlIEkgdGhvdWdodCBJIGNvdWxkIHJlZmVyIHBlb3BsZSBiYWNrIHRvIG15IGZsb3cgcGhhc2UsIGJ1dCBwZXJoYXBzIEkgbmVlZCB0byBoYXZlIGEgc2VwYXJhdGUgY2hvaWNlcyBhY3Rpb24gdG8gcmVmZXIgcGVvcGxlIHRvLi4udGhpcyBzZWVtcyBvdmVya2lsbD9cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9Eby5zdWJmbG93KCdwbGF5cm91bmQnKTtcclxuICAgICAgICAgICAgICAgIC8vRG8uY29udGludWUoJ3BsYXlyb3VuZCcpO1xyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRvIHRoZSBtYWluIGxvb3BcclxuICAgICAgICAgICAgfSAvLyBlbmQgb2YgZG9cclxuICAgICAgICB9KSwgLy8gZW5kIG9mIHRoaXMgYWN0aW9uXHJcblxyXG4gICAgfSksIC8vIFRISVMgSVMgVEhFIEVORCBPRiBERUNMQVJJTkcgVEhFIEFDVElPTlNcclxuXHJcblxyXG5cclxuICAgICAgICAvLyBEZWZpbmUgZ2FtZSBmbG93XHJcbiAgICAgICAgZ2FtZS5kZWZpbmVGbG93KFxyXG4gICAgICAgICAgICAvLyBJbml0aWFsIHNldHVwIHN0ZXBcclxuICAgICAgICAgICAgLy8gRHJhdyBpbml0aWFsIGhhbmQgb2Ygc3RyYXRlZ2llc1xyXG4gICAgICAgICAgICAvLyBwbGFjZSBpbml0aWFsIGNoYWxsZW5nZSBjYXJkLCBzZXQgcm91bmQgbWFya2VyXHJcbiAgICAgICAgICAgIC8vIGVuc3VyZSB0aGVyZSBpcyBhIGNoYWxsZW5nZSBjYXJkIGluIHRoZSBmaXJzdCBzbG90XHJcbiAgICAgICAgICAgIC8vIGVuc3VyZSBwbGF5ZXIgaGFzIHRva2VuIHBvb2xcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJC5zdHJhdGVneURlY2suc2h1ZmZsZSgpO1xyXG4gICAgICAgICAgICAgICAgJC5jaGFsbGVuZ2VEZWNrLnNodWZmbGUoKTtcclxuICAgICAgICAgICAgICAgICQuZXZlbnREZWNrLnNodWZmbGUoKTtcclxuICAgICAgICAgICAgICAgIC8vZ2FtZS5hbm5vdW5jZSgnaW50cm8nKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZWFjaFBsYXllcih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAncGxheWVyJyxcclxuICAgICAgICAgICAgICAgIGRvOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRHJhdyBpbml0aWFsIGhhbmQgb2Ygc3RyYXRlZ3kgY2FyZHMgKHRva2VucyBhcmUgYWxyZWFkeSBpbiBwbGF5ZXIgcG9vbClcclxuICAgICAgICAgICAgICAgICAgICAoeyBwbGF5ZXIgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLnN0cmF0ZWd5RGVjay5maXJzdE4oZ2FtZS5oYW5kTGltaXQsIFN0cmF0ZWd5Q2FyZCkucHV0SW50byhwbGF5ZXIubXkoJ2hhbmQnKSEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUGxhY2UgYW4gaW5pdGlhbCBjaGFsbGVuZ2UgY2FyZCBpbnRvIHRoZSBmaXJzdCBjaGFsbGVuZ2UgY2FyZCBzbG90XHJcbiAgICAgICAgICAgICAgICAgICAgKHsgcGxheWVyIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSSB0aGluayB0aGlzIGhhcyB3b3JrZWQuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5jaGFsbGVuZ2VEZWNrLmZpcnN0TigxLCBDaGFsbGVuZ2VDYXJkKS5wdXRJbnRvKCQuc2xvdDAhKTsgLy9jaGFsbGVuZ2VTcGFjZS5jaGFsbGVuZ2VTbG90cy5zbG90MFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2l2ZSBwbGF5ZXJzIHNvbWUgZXh0cmEgY2hhbGxlbmdlcyB0byBsb29rIGF0XHJcbiAgICAgICAgICAgICAgICAgICAgKHsgcGxheWVyIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSSB0aGluayB0aGlzIGhhcyB3b3JrZWQuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5jaGFsbGVuZ2VEZWNrLmZpcnN0TigzLCBDaGFsbGVuZ2VDYXJkKS5wdXRJbnRvKHBsYXllci5teSgnaGFuZCcpISk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGwgdGhlIG90aGVyIGNoYWxsZW5nZSBjYXJkcyBhcmUgaW4gdGhlIGRlY2sgIC8vY2hhbGxlbmdlU3BhY2UuY2hhbGxlbmdlU2xvdHMuc2xvdDBcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHJvdW5kIG1hcmtlciB0byBhbiBpbml0aWFsIHN0YXRlIG9mIDFcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUucm91bmQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGxvb3AoXHJcbiAgICAgICAgICAgICAgICB3aGlsZUxvb3Aoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE91dGVyIGxvb3AgcnVucyB1bnRpbCB0aGUgY3VycmVudCBwbGF5ZXIgd2lucyBvciBsb3Nlc1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlOiAoKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnBsYXllcnMuY3VycmVudCgpIS5zdGF0dXMgIT09ICd3aW4nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUucGxheWVycy5jdXJyZW50KCkhLnN0YXR1cyAhPT0gJ2xvc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhY2hQbGF5ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3BsYXllcmludHVybnBoYXNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCBlYWNoIHBsYXllcidzIHR1cm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3ViZmxvdyBmb3IgcGxheWluZyBhIHJvdW5kIChjdXN0b20gbG9naWMgaW5zaWRlIHRoaXMgc3ViZmxvdylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiBEby5zdWJmbG93KCdwbGF5cm91bmQnKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRHJhdyBhbiBldmVudCBjYXJkIGFuZCByZXNvbHZlIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyQWN0aW9ucyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IFsnZHJhd0V2ZW50J10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoZSBwbGF5ZXIncyBzdGF0dXMgYWZ0ZXIgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyQWN0aW9ucyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IFsnY2hlY2tTdGF0dXMnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgcGxheWVyJ3MgcmVzb3VyY2VzIGFmdGVyIHRoZWlyIHR1cm4gaXMgY29tcGxldGUsIGFuZCBhbGxvdyBzdGFzaCBuZXh0IHR1cm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUucGxheWVycy5jdXJyZW50KCkhLnJlc291cmNlcyA9IGdhbWUudHVybkxpbWl0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnBsYXllcnMuY3VycmVudCgpIS5zdGFzaGVkVGhpc1R1cm4gPSBmYWxzZTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGl0IGVhY2ggcGxheWVyJ3MgdHVybiBpZiB0aGV5IHdpbiBvciBsb3NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICogTG9vcCBhdHRlbXB0Li4uYWxzbyBkb2VzbnQgd29ya1xyXG4gICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9vcChcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZUxvb3Aoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZTogKCkgPT4gZ2FtZS5wbGF5ZXJzLmN1cnJlbnQoKSEuc2NvcmUgPCBnYW1lLndpbmNvbmRpdGlvbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5wbGF5ZXJzLmN1cnJlbnQoKSEubXkoJ3dhc3RlZFJlc291cmNlJykhLmFsbChUb2tlbikubGVuZ3RoIDwgZ2FtZS5sb3NlY29uZGl0aW9uICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnBsYXllcnMuY3VycmVudCgpIS5teSgncG9vbCcpIS5hbGwoVG9rZW4pLmxlbmd0aCA+PSA0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnJvdW5kIDw9IGdhbWUubWF4Um91bmRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkbzogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFjaFBsYXllcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3BsYXllcmludHVybnBoYXNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiBEby5zdWJmbG93KCdwbGF5cm91bmQnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJBY3Rpb25zKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogWydkcmF3RXZlbnQnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IGdhbWUucGxheWVycy5jdXJyZW50KCkhLnJlc291cmNlcyA9IGdhbWUudHVybkxpbWl0LCAvLyBSZXNldCByZXNvdXJjZXMgZm9yIHRoZSBuZXh0IHJvdW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyQWN0aW9ucyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IFsnY2hlY2tTdGF0dXMnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKX0sIC8vIGVuZCBvZiBsb29wXHJcbiAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgIGVhY2hQbGF5ZXIoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2V2ZW50cGhhc2UnLFxyXG4gICAgICAgICAgICAgICAgZG86IFtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJBY3Rpb25zKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogWydkcmF3RXZlbnQnXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVhY2hQbGF5ZXIoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NvbmRpdGlvbkNoZWNrUGhhc2UnLFxyXG4gICAgICAgICAgICAgICAgZG86IFtcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiBnYW1lLnBsYXllcnMuY3VycmVudCgpIS5yZXNvdXJjZXMgPSBnYW1lLnR1cm5MaW1pdCwgLy8gSSBoYXZlIHRvIHJlc2V0IHRoaXMgYXQgc29tZSBwb2ludFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJBY3Rpb25zKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogWydjaGVja1N0YXR1cyddXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIH0pLCAvLyBlbmQgb2YgdGhpcyBwYXJ0IG9mIGZsb3dcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICApIC8vIEVuZCBvZiBmbG93IGRlZmluaXRpb24gXHJcblxyXG5cclxuICAgIGdhbWUuZGVmaW5lU3ViZmxvdyhcclxuICAgICAgICAncGxheXJvdW5kJyxcclxuICAgICAgICBlYWNoUGxheWVyKHtcclxuICAgICAgICAgICAgbmFtZTogJ3BsYXllcicsXHJcbiAgICAgICAgICAgIGNvbnRpbnVlVW50aWw6ICgpID0+IGdhbWUucGxheWVycy5jdXJyZW50KCkhLnJlc291cmNlcyA8PSAwLFxyXG4gICAgICAgICAgICAvL2luaXRpYWw6IGdhbWUucGxheWVycy5jdXJyZW50KCkhLnJlc291cmNlcyA9IDMsIC8vIHJlc2V0IGluaXRpYWwgcmVzb3VyY2VzXHJcbiAgICAgICAgICAgIGRvOiBbXHJcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBpbml0aWFsIHJlc291cmNlcyBmb3IgdGhlIHBsYXllclxyXG4gICAgICAgICAgICAgICAgKHsgcGxheWVyIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLm1lc3NhZ2UoYHt7cGxheWVyfX0gaGFzIHt7cmVzb3VyY2VzfX0gcmVzb3VyY2VzIHRvIHNwZW5kIHRoaXMgdHVybi5gLCB7IHBsYXllcjogcGxheWVyLCByZXNvdXJjZXM6IHBsYXllci5yZXNvdXJjZXMgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lIHRoZSBhY3Rpb25zIHRoZSBwbGF5ZXIgY2FuIHRha2UgZHVyaW5nIHRoZWlyIHR1cm5cclxuICAgICAgICAgICAgICAgIHBsYXllckFjdGlvbnMoe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uczogWydkcmF3U3RyYXRlZ3lDYXJkJywgJ3BsYXlJbm5vdmF0aW9uJywgJ3BsYXlTdHJhdGVneUNhcmQnLCAnYWRkQ2hhbGxlbmdlQ2FyZCcsICdzdGFzaENhcmQnLCAnc2tpcCddXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdICAgXHJcbiAgICAgICAgfSlcclxuICAgICk7IC8vIGVuZCBzdWJmbG93XHJcbiAgICBcclxuXHJcblxyXG59KTsgLy8gRU5EIE9GIEdBTUUgREVGSU5JVElPTlxyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogSGVyZSBhZGQgY29kZSB0byByZXNvbHZlIHRoZSBjaGFsbGVuZ2UgY2FyZHMgYW5kIGFkZCB0aGVtIHRvIHRoZSBzY29yZVxyXG4gICAgICAgICAgICAoMSkgaWRlbnRpZnkgdGhlIGFjdGl2ZWNoYWxsZW5nZXNcclxuICAgICAgICAgICAgKDJhKSBpZGVudGlmeSB0aGUgcmVxdWlyZW1lbnRzIG9uIHRob3NlIGNoYWxsZW5nZXMsIGFuZCAoMmIpIHdoZXRoZXIgb3Igbm90IHRoZSBjdXJyZW50IHN0cmF0ZWd5Y2FyZCBjb250cmlidXRpb25zIGV4Y2VlZCB0aG9zZSBjaGFsbGVuZ2VzLFxyXG4gICAgICAgICAgICAoMykgaWRlbnRpZnkgd2hldGhlciB0aGUgdG9rZW5TcGFjZSBvbiB0aGUgY2hhbGxlbmdlIGNvbnRhaW5zIDQgdG9rZW5zIHdpdGggZGlmZmVyZW50IHR5cGVzLiBcclxuIFxyXG4gICAgICAgICAgICBJZiBzbywgY2FuIHdlICgxKSBzZXQgdGhlIGNoYWxsZW5nZSBpc19jb21wbGV0ZSBmaWVsZCB0byAndHJ1ZScsIGFuZCAoMikgYWRkIHRoZSBjaGFsbGVuZ2UgJ3BvaW50cycgZmllbGQgdG8gdGhlIGN1cnJlbnQgc2NvcmUsIGFuZCAoMykgbW92ZSB0aGUgY2hhbGxlbmdlIHRvIHRoZSAkLmRpc2NhcmRlZCBzcGFjZS4gXHJcbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhpcyBldmVudCBtYXRjaGVzIHRoZSByZXF1aXJlbWVudHMgb2YgdGhlIGNoYWxsZW5nZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hpbmdQcmluY2lwbGVzID0gcHJpbmNpcGxlc0RhdGEuZmlsdGVyKHJvdyA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5ldmVudFZhbHVlIDwgMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5jaGFsbGVuZ2VWYWx1ZSAhPSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmNoYWxsZW5nZVZhbHVlID4gMCk7XHJcbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIG1hdGNoLCBjaGVjayB3aGV0aGVyIHRoZSBldmVudCBleGNlZWRzIHRoZSBhY3RpdmVzdHJhdGVnaWVzIGluIHBsYXkgZm9yIHRoZSBjaGFsbGVuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hpbmdQcmluY2lwbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWlsVGVzdCA9IG1hdGNoaW5nUHJpbmNpcGxlcy5maWx0ZXIocm93ID0+IChyb3cuZXZlbnRWYWx1ZSArIHJvdy5zdHJhdGVneVZhbHVlKSA8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhc3NUZXN0ID0gbWF0Y2hpbmdQcmluY2lwbGVzLmZpbHRlcihyb3cgPT4gKHJvdy5ldmVudFZhbHVlICsgcm93LnN0cmF0ZWd5VmFsdWUpID49IDApO1xyXG4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxUZXN0Lmxlbmd0aCA+IDApIHtcclxuIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIHRva2VuIHZhbHVlcyBmb3IgZWFjaCBjaGFsbGVuZ2VcclxuIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGxTbG90cyA9IHBsYXllci5hbGxNeShTbG90LCB7IGdyb3VwOiAnY2hhbGxlbmdlc2xvdCcgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJpc2tlZFNsb3RzID0gYWxsU2xvdHMuZmlsdGVyKHNsb3QgPT4gc2xvdC5oYXMoY2hhbGxlbmdlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJpc2tlZFRva2VucyA9IHJpc2tlZFNsb3RzLmFsbChUb2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuU3VtID0gcmlza2VkVG9rZW5zLnN1bSh0b2tlbiA9PiB0b2tlbi5xdWFsaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zdCB0b2tlblN1bTogbnVtYmVyID0gcmlza2VkVG9rZW5zLnJlZHVjZSgoc3VtLCB0b2tlbikgPT4gc3VtICsgdG9rZW4ucXVhbGl0eSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHRva2VuU3VtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yaXNrZWRUb2tlbnMuZm9yRWFjaCh0b2tlbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRva2VuU3VtICs9IHRva2VuLnF1YWxpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rva2Vuc3VtJywgdG9rZW5TdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYW4gYXJyYXkgdG8gc3RvcmUgdGhlIG91dHB1dCBmcm9tIHRoaXMgbG9vcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbGxlbmdlOiBjaGFsbGVuZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsVGVzdDogZmFpbFRlc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaXNrZWRUb2tlbnM6IHJpc2tlZFRva2VucywgLy9yaXNrZWRUb2tlbnMsIC8vbnVtYmVyIG9mIHRva2Vucywgbm90IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlblN1bTogdG9rZW5TdW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZGVudGlmeSB0aGUgZmFpbGluZyBwcmluY2lwbGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWlsaW5nUHJpbmNpcGxlcyA9IHJlc3VsdHMuZmxhdE1hcChyZXN1bHQgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZmFpbFRlc3QubWFwKGZhaWwgPT4gZmFpbC5wcmluY2lwbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXggZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcnN0SW1wYWN0ID0gTWF0aC5tYXgoLi4ucmVzdWx0cy5mbGF0TWFwKHJlc3VsdCA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mYWlsVGVzdC5tYXAoZmFpbCA9PiBmYWlsLmV2ZW50VmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgZG8oKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAgICAgICBjaGVja0NvbmRpdGlvbnM6IHBsYXllciA9PiBhY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgcHJvbXB0OiAnQ2hlY2sgd2luL2xvc2UgY29uZGl0aW9ucycsXHJcbiAgICAgICAgICAgICAgIH0pLmRvKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgIGNvbnN0IHdhc3RlZFRva2VucyA9IHBsYXllci5teSgnd2FzdGVkUmVzb3VyY2UnKSEuYWxsKFRva2VuKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICBjb25zdCBwb29sVG9rZW5zID0gcGxheWVyLm15KCdwb29sJykhLmFsbChUb2tlbikubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuc2NvcmUgPj0gZ2FtZS53aW5jb25kaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBnYW1lLm1lc3NhZ2UoYHt7cGxheWVyfX0gd2lucyB0aGUgZ2FtZSFgLCB7IHBsYXllcjogcGxheWVyIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIERvLmJyZWFrKCdtYWluTG9vcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3YXN0ZWRUb2tlbnMgPj0gZ2FtZS5sb3NlY29uZGl0aW9uIHx8IHBvb2xUb2tlbnMgPCA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5tZXNzYWdlKGB7e3BsYXllcn19IGxvc2VzIHRoZSBnYW1lIWAsIHsgcGxheWVyOiBwbGF5ZXIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgRG8uYnJlYWsoJ21haW5Mb29wJyk7XHJcbiAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGdhbWUucm91bmQgPCA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5tZXNzYWdlKGB7e3BsYXllcn19IHByb2NlZWRzIHRvIHRoZSBuZXh0IHJvdW5kLmAsIHsgcGxheWVyOiBwbGF5ZXIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5yb3VuZCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIERvLnJldHVyblRvKCd0dXJucGhhc2UnKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAqL1xyXG4vLyBNYWluIGdhbWUgbG9vcFxyXG4vLyBFYWNoIHJvdW5kLCBwbGF5ZXJzIHdpbGw6XHJcbi8vIDEuIERlY2lkZSB3aGV0aGVyIHRvIGFkZCBhIGNoYWxsZW5nZSBjYXJkIChmb3IgZnJlZSlcclxuLy8gMi4gUGxheSBzdHJhdGVneSBjYXJkcyBvciByZXNvdXJjZXMgdG8gY29tcGxldGUgY2hhbGxlbmdlcyAoZm9yIGNvc3QpXHJcbi8vIDMuIFN0YXNoIGEgY2hhbGxlbmdlIGNhcmQgKGZvciAxIGNvc3QsIGFuZCArMSBzY29yZSlcclxuLy8gVG8gYSBtYXhpbXVtIG9mIHR1cm5MaW1pdFxyXG5cclxuLy8gRXZlbnQgbG9vcFxyXG4vLyBBZnRlciBlYWNoIHNldCBvZiB0dXJucywgYW4gZXZlbnQgY2FyZCBpcyBkcmF3biBhbmQgcmVzb2x2ZWRcclxuLy8gRWFjaCBldmVudCBoYXMgaW1wYWN0cyBmb3IgeW91ciBjaGFsbGVuZ2VzXHJcbi8vIElmIHRoZSBldmVudCByZXF1aXJlbWVudHMgYXJlIG5vdCBtZXQsIHRoZSBwbGF5ZXIgbWF5IGVpdGhlclxyXG4vLyAxLiBEaXNjYXJkIHJlc291cmNlcyBwbGFjZWQgb24gYW55IGltcGFjdGVkIGNoYWxsZW5nZSBjYXJkcyxcclxuLy8gYWRkaW5nIHRoZXNlIHRvIHRoZSB3YXN0ZWRSZXNvdXJjZSBzcGFjZVxyXG4vLyAyLiBQbGF5IE9ORSBzdHJhdGV5IGNhcmQgb3IgT05FIHJlc291cmNlIGlmIGl0IHdvdWxkIG1pdGlnYXRlIHRoZSBldmVudCBpbXBhY3RcclxuLy8gYWRkaW5nIG9uZSB1bnVzZWQgcmVzb3VyY2UgdG8gdGhlIHdhc3RlZFJlc291cmNlIHNwYWNlXHJcbi8vIGFuZCB0aGVuIGltbWVkaWF0ZWx5IGRyYXdpbmcgYSBuZXcgZXZlbnQgY2FyZCAoYSBmdWxsIHR1cm4gaXMgbm90IHBsYXllZCwgdGhlIHJvdW5kIG1hcmtlciBkb2VzIG5vdCBpbmNyZWFzZSlcclxuLy8gQWZ0ZXIgdGhlIGV2ZW50IHJvdW5kLCBwbGF5ZXJzXHJcbi8vIDEuIENoZWNrIGZvciBjb21wbGV0ZWQgY2hhbGxlbmdlc1xyXG4vLyAyLiBBZGp1c3QgdGhlIHNjb3JlL2RhbWFnZSBtYXJrZXJzIGFuZCBjaGVjayB3aW4gY29uZGl0aW9uc1xyXG5cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLE1BQzlCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLE1BQzlCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLE1BQzlCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLE1BQzlCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLFFBQ3pCLEVBQUUsV0FBVyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNKLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxHQUFHLE9BQU8sR0FBRztBQUFBLFFBQzFCLEVBQUUsV0FBVyxH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SyxRQUFRLFFBQVEsRUFBRyxZQUFZLEtBQUs7QUFDekMsdUJBQUssUUFBUSxRQUFRLEVBQUcsa0JBQWtCO0FBQUEsZ0JBQzlDO0FBQUEsY0FDSjtBQUFBO0FBQUEsWUFHSixDQUFDO0FBQUEsVUFDTDtBQUFBLFFBQ0osQ0FBQztBQUFBLE1BQ0w7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBc0RKO0FBR0osU0FBSztBQUFBLE1BQ0Q7QUFBQSxNQUNBLFdBQVc7QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLGVBQWUsTUFBTSxLQUFLLFFBQVEsUUFBUSxFQUFHLGFBQWE7QUFBQTtBQUFBLFFBRTFELElBQUk7QUFBQTtBQUFBLFVBRUEsQ0FBQyxFQUFFLE9BQU8sTUFBTTtBQUNaLGlCQUFLLFFBQVEsOERBQThELEVBQUUsUUFBZ0IsV0FBVyxPQUFPLFVBQVUsQ0FBQztBQUFBLFVBQzlIO0FBQUE7QUFBQSxVQUVBLGNBQWM7QUFBQSxZQUNkLFNBQVMsQ0FBQyxvQkFBb0Isa0JBQWtCLG9CQUFvQixvQkFBb0IsYUFBYSxNQUFNO0FBQUEsVUFDM0csQ0FBQztBQUFBLFFBQ0w7QUFBQSxNQUNKLENBQUM7QUFBQSxJQUNMO0FBQUEsRUFJSixDQUFDOzs7QTdCcnlCRCxNQUFPLHlCQUFRLGdCQUFnQkMsYUFBSzsiLAogICJuYW1lcyI6IFsidXVpZCIsICJuIiwgImkiLCAibiIsICJyYW5kb20iLCAicmFuZ2UiLCAiaSIsICJzIiwgInNlZWQiLCAibiIsICJyYW5kb20iLCAibiIsICJuIiwgInV1aWQiLCAiYXJncyIsICJJbnRlcnJ1cHRDb250cm9sIiwgIkZsb3dDb250cm9sIiwgImJsb2NrIiwgIm4iLCAiaW50ZXJydXB0IiwgInJhbmRvbSIsICJpbXBvcnRfcmFuZG9tX3NlZWQiLCAicmFuZG9tIiwgImFyZ3MiLCAiZ2FtZV9kZWZhdWx0IiwgImdhbWVfZGVmYXVsdCJdCn0K
