(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SpriteSpin = {}));
}(this, (function (exports) {
    'use strict';

    function getCursorPosition(event) {
        var touches = 'touches' in event ? event.touches : null;
        var source = 'clientX' in event ? event : null;
        // get current touch or mouse position
        if (touches != null && touches.length > 0) {
            source = touches[0];
        }
        return {
            x: (source === null || source === void 0 ? void 0 : source.clientX) || 0,
            y: (source === null || source === void 0 ? void 0 : source.clientY) || 0
        };
    }

    var canvas;
    var context;
    function detectionContext() {
        if (context) {
            return context;
        }
        if (!canvas) {
            canvas = document.createElement('canvas');
        }
        if (!canvas || !canvas.getContext) {
            return null;
        }
        context = canvas.getContext('2d');
        return context;
    }
    /**
     * Idea taken from https://github.com/stomita/ios-imagefile-megapixel
     * Detects whether the image has been sub sampled by the browser and does not have its original dimensions.
     * This method unfortunately does not work for images that have transparent background.
     */
    function detectSubsampling(img, width, height) {
        if (!detectionContext()) {
            return false;
        }
        // sub sampling happens on images above 1 megapixel
        if (width * height <= 1024 * 1024) {
            return false;
        }
        // set canvas to 1x1 pixel size and fill it with magenta color
        canvas.width = canvas.height = 1;
        context.fillStyle = '#FF00FF';
        context.fillRect(0, 0, 1, 1);
        // render the image with a negative offset to the left so that it would
        // fill the canvas pixel with the top right pixel of the image.
        context.drawImage(img, -width + 1, 0);
        // check color value to confirm image is covering edge pixel or not.
        // if color still magenta, the image is assumed to be sub sampled.
        try {
            var dat = context.getImageData(0, 0, 1, 1).data;
            return (dat[0] === 255) && (dat[1] === 0) && (dat[2] === 255);
        }
        catch (err) {
            // avoids cross origin exception for chrome when code runs without a server
            return false;
        }
    }

    var img;
    /**
     * gets the original width and height of an image element
     */
    function naturalSize(image) {
        // for browsers that support naturalWidth and naturalHeight properties
        if (image.naturalWidth) {
            return {
                height: image.naturalHeight,
                width: image.naturalWidth
            };
        }
        // browsers that do not support naturalWidth and naturalHeight properties have to fall back to the width and
        // height properties. However, the image might have a css style applied so width and height would return the
        // css size. To avoid that create a new Image object that is free of css rules and grab width and height
        // properties
        //
        // assume that the src has already been downloaded, so no onload callback is needed.
        img = img || new Image();
        img.crossOrigin = image.crossOrigin;
        img.src = image.src;
        return {
            height: img.height,
            width: img.width
        };
    }

    /**
     * Measures the image frames that are used in the given data object
     */
    function measure(images, options) {
        if (images.length === 0) {
            return [];
        }
        if (images.length === 1) {
            return [measureSheet(images[0], options)];
        }
        if (options.framesX && options.framesY) {
            return measureMutipleSheets(images, options);
        }
        return measureFrames(images, options);
    }
    function measureSheet(image, options) {
        var result = { id: 0, sprites: [] };
        measureImage(image, options, result);
        var frames = options.frames || 0;
        var framesX = Number(options.framesX) || frames;
        var framesY = Math.ceil(frames / framesX);
        var frameWidth = Math.floor(result.width / framesX);
        var frameHeight = Math.floor(result.height / framesY);
        var divisor = result.isSubsampled ? 2 : 1;
        for (var i = 0; i < frames; i++) {
            var x = (i % framesX) * frameWidth;
            var y = Math.floor(i / framesX) * frameHeight;
            result.sprites.push({
                id: i,
                x: x, y: y,
                width: frameWidth,
                height: frameHeight,
                sampledX: x / divisor,
                sampledY: y / divisor,
                sampledWidth: frameWidth / divisor,
                sampledHeight: frameHeight / divisor
            });
        }
        return result;
    }
    function measureFrames(images, options) {
        var result = [];
        for (var id = 0; id < images.length; id++) {
            // TODO: optimize
            // don't measure images with same size twice
            var sheet = measureSheet(images[id], { frames: 1, framesX: 1, detectSubsampling: options.detectSubsampling });
            sheet.id = id;
            result.push(sheet);
        }
        return result;
    }
    function measureMutipleSheets(images, options) {
        var result = [];
        for (var id = 0; id < images.length; id++) {
            // TODO: optimize
            // don't measure images with same size twice
            var sheet = measureSheet(images[id], {
                frames: undefined,
                framesX: options.framesX,
                framesY: options.framesY,
                detectSubsampling: options.detectSubsampling
            });
            sheet.id = id;
            result.push(sheet);
        }
        return result;
    }
    function measureImage(image, options, result) {
        var size = naturalSize(image);
        result.isSubsampled = options.detectSubsampling && detectSubsampling(image, size.width, size.height);
        result.width = size.width;
        result.height = size.height;
        result.sampledWidth = size.width / (result.isSubsampled ? 2 : 1);
        result.sampledHeight = size.height / (result.isSubsampled ? 2 : 1);
        return result;
    }
    function findSpecs(metrics, frames, frame, lane) {
        var spriteId = lane * frames + frame;
        var sheetId = 0;
        var sprite = null;
        var sheet = null;
        while (true) {
            sheet = metrics === null || metrics === void 0 ? void 0 : metrics[sheetId];
            if (!sheet) {
                break;
            }
            if (spriteId >= sheet.sprites.length) {
                spriteId -= sheet.sprites.length;
                sheetId++;
                continue;
            }
            sprite = sheet.sprites[spriteId];
            break;
        }
        return { sprite: sprite, sheet: sheet };
    }

    var getTime = (function () {
        if (window.performance && typeof window.performance.now === 'function') {
            return function () { return window.performance.now(); };
        }
        return function () { return Date.now(); };
    })();
    function withWindowBinding() {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        for (var _a = 0, names_1 = names; _a < names_1.length; _a++) {
            var name_1 = names_1[_a];
            if (name_1 in window) {
                var fn = window[name_1];
                if (typeof fn === 'function') {
                    return fn.bind(window);
                }
            }
        }
        return null;
    }
    var requestAnimationFrame = withWindowBinding('requestAnimationFrame', // prefer without wendor prefix
        'mozRequestAnimationFrame', // fallback to vendor prefix
        'webkitRequestAnimationFrame', 'msRequestAnimationFrame') || (function (cb) { return setTimeout(function () { return cb(getTime()); }); }); // no RAF support => usage with setTimeout
    var cancelAnimationFrame = withWindowBinding('cancelAnimationFrame', // prefer without wendor prefix
        'mozCancelAnimationFrame', // fallback to vendor prefix
        'webkitCancelAnimationFrame', 'msCancelAnimationFrame', 'clearTimeout' // no RAF support => usage with setTimeout
    );
    /**
     * Spins the given `update` function in a loop by utilizing `requestAnimationFrame`
     *
     * @public
     * @remarks
     * A primitive loop scheduler with no fixed time support or any optimizations.
     * Simply schedules the given `update` function with `requestAnimationFrame`.
     */
    function loop$1(update) {
        var requestId = null;
        var startTime = 0;
        var totalTime = 0;
        function tick() {
            var dt = getTime() - (startTime + totalTime);
            totalTime += dt;
            update.call(looper, totalTime, dt);
            if (requestId != null) {
                requestId = requestAnimationFrame(tick);
            }
        }
        var looper = function () {
            if (requestId == null) {
                startTime = getTime();
                requestId = requestAnimationFrame(tick);
                looper.isRunning = true;
            }
        };
        looper.kill = function () {
            cancelAnimationFrame(requestId);
            requestId = null;
            looper.isRunning = false;
        };
        looper.isRunning = false;
        looper();
        return looper;
    }

    function noop() {
        // noop
    }
    function findIndex(arr, fn) {
        for (var i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                return i;
            }
        }
        return -1;
    }
    function getElement(target) {
        if (target instanceof Element) {
            return target;
        }
        if (typeof target === 'string') {
            return document.querySelector(target);
        }
        return null;
    }
    // tslint:disable-next-line: no-console
    var log = (console && console.log) || noop;
    // tslint:disable-next-line: no-console
    var warn = (console && console.warn) || noop;
    // tslint:disable-next-line: no-console
    var error = (console && console.error) || noop;
    function getOption(data, name, fallback) {
        return data && name in data ? data[name] : fallback;
    }
    function toArray(value) {
        return Array.isArray(value) ? value : value != null ? [value] : [];
    }
    function addEventListener(target, name, handler, options) {
        target.addEventListener(name, handler, options !== null && options !== void 0 ? options : { passive: false });
        return function () {
            target.removeEventListener(name, handler);
        };
    }
    function destructor(list) {
        if (list === void 0) { list = []; }
        var instance = function () {
            list.forEach(function (fn) { return fn(); });
            list.length = 0;
        };
        instance.add = function (teardown) {
            list.push(teardown);
        };
        instance.addEventListener = function (target, name, handler, options) {
            var unlisten = addEventListener(target, name, handler, options);
            list.push(unlisten);
            return unlisten;
        };
        return instance;
    }
    /**
     * clamps the given value by the given min and max values
     */
    function clamp(value, min, max) {
        return value > max ? max : value < min ? min : value;
    }
    /**
     *
     */
    function wrap(value, min, max, size) {
        while (value > max) {
            value -= size;
        }
        while (value < min) {
            value += size;
        }
        return value;
    }
    function pixelRatio(context) {
        var devicePixelRatio = window.devicePixelRatio || 1;
        var legacy = context;
        var backingStoreRatio = legacy.webkitBackingStorePixelRatio ||
            legacy.mozBackingStorePixelRatio ||
            legacy.msBackingStorePixelRatio ||
            legacy.oBackingStorePixelRatio ||
            legacy.backingStorePixelRatio ||
            1;
        return devicePixelRatio / backingStoreRatio;
    }
    function innerWidth(el) {
        if (!el) {
            return 0;
        }
        if (el === window || el instanceof Window) {
            return el.innerWidth;
        }
        if (el === document || el instanceof Document) {
            return Math.max(el.body.scrollWidth, el.scrollWidth, el.body.offsetWidth, el.offsetWidth, el.clientWidth);
        }
        return el.clientWidth;
    }
    function innerHeight(el) {
        if (!el) {
            return 0;
        }
        if (el === window || el instanceof Window) {
            return el.innerHeight;
        }
        if (el === document || el instanceof Document) {
            return Math.max(el.body.scrollHeight, el.scrollHeight, el.body.offsetHeight, el.offsetHeight, el.clientHeight);
        }
        return el.clientHeight;
    }
    /**
     * Sets CSS properties of the given element
     *
     * @remarks
     * numeric values are assumed to be pixel values. Numbers must be passed as strings
     * to avoid the 'px' suffix
     *
     * @param el - The element
     * @param style - The style sheet
     */
    function css(el, style) {
        if (!el) {
            return;
        }
        for (var key in style) {
            if (style.hasOwnProperty(key)) {
                var value = style[key];
                if (typeof value === 'number') {
                    value = value + "px";
                }
                el.style.setProperty(key, String(value));
            }
        }
    }
    function createElement(name, options) {
        var el = document.createElement(name);
        if (options.id) {
            el.setAttribute('id', options.id);
        }
        if (options.class) {
            el.setAttribute('class', options.class);
        }
        return el;
    }
    function isVisible(el) {
        if (!el) {
            return false;
        }
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    }
    function hide(el) {
        if (el) {
            el.style.display = 'none';
        }
    }
    function show(el) {
        if (el) {
            el.style.display = 'block';
        }
    }
    function fadeTo(el, opacity, options) {
        var startValue = Number(el.style.display === 'none' ? 0 : el.style.opacity);
        var endValue = clamp(opacity, 1, 0);
        var duration = getOption(options, 'duration', 400);
        var looper = loop$1(function (t) {
            t = clamp(t / duration, 0, 1);
            var value = t * (endValue - startValue) + startValue;
            if (value) {
                el.style.display = null;
            }
            el.style.opacity = String(value);
            if (t >= 1) {
                looper.kill();
            }
        });
    }
    function fadeOut(el, options) {
        fadeTo(el, 0, options);
    }
    function fadeIn(el, options) {
        fadeTo(el, 1, options);
    }
    function offset(el) {
        var result = {
            top: 0,
            left: 0,
        };
        if (el) {
            var rect = el.getBoundingClientRect();
            result.top = rect.top + window.pageYOffset;
            result.left = rect.left + window.pageXOffset;
        }
        return result;
    }

    /**
     *
     * @public
     * @param opts
     */
    function preload(opts) {
        var src = typeof opts.source === 'string' ? [opts.source] : opts.source;
        var images = [];
        var targetCount = (opts.preloadCount || src.length);
        var onInitiated = opts.initiated || noop;
        var onProgress = opts.progress || noop;
        var onComplete = opts.complete || noop;
        var count = 0;
        var completed = false;
        var firstLoaded = false;
        var tick = function () {
            count += 1;
            onProgress({
                index: images.indexOf(this),
                loaded: count,
                total: src.length,
                percent: Math.round((count / src.length) * 100)
            });
            firstLoaded = firstLoaded || (this === images[0]);
            if (firstLoaded && !completed && (count >= targetCount)) {
                completed = true;
                onComplete(images);
            }
        };
        for (var _i = 0, src_1 = src; _i < src_1.length; _i++) {
            var url = src_1[_i];
            var img = new Image();
            // push result
            images.push(img);
            // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
            img.crossOrigin = opts.crossOrigin;
            // bind logic, don't care about abort/errors
            img.onload = img.onabort = img.onerror = tick;
            // begin load
            img.src = url;
        }
        onInitiated(images);
    }

    function padNumber(num, length, pad) {
        var result = String(num);
        while (result.length < length) {
            result = String(pad) + result;
        }
        return result;
    }
    /**
     * Generates an array of source strings
     *
     * @remarks
     * Takes a template string and generates an array of strings by interpolating {lane} and {frame} placeholders.
     *
     * ```
     * sourceArray('http://example.com/image_{frame}.jpg, { frame: [1, 3], digits: 2 })
     * // gives:
     * // [ 'http://example.com/image_01.jpg', 'http://example.com/image_02.jpg', 'http://example.com/image_03.jpg' ]
     *
     * sourceArray('http://example.com/image_FRAME.jpg, { frame: [1, 3], digits: 2, framePlacer: 'FRAME' })
     * // gives:
     * // [ 'http://example.com/image_01.jpg', 'http://example.com/image_02.jpg', 'http://example.com/image_03.jpg' ]
     * ```
     *
     * @param template - The template string
     * @param opts - Interpolation options
     *
     * @public
     */
    function sourceArray(template, opts) {
        var digits = opts.digits || 2;
        var lPlacer = opts.lanePlacer || '{lane}';
        var fPlacer = opts.framePlacer || '{frame}';
        var fStart = 0;
        var fEnd = 0;
        if (opts.frame) {
            fStart = opts.frame[0];
            fEnd = opts.frame[1];
        }
        var lStart = 0;
        var lEnd = 0;
        if (opts.lane) {
            lStart = opts.lane[0];
            lEnd = opts.lane[1];
        }
        var result = [];
        for (var lane = lStart; lane <= lEnd; lane += 1) {
            for (var frame = fStart; frame <= fEnd; frame += 1) {
                result.push(template
                    .replace(lPlacer, padNumber(lane, digits, '0'))
                    .replace(fPlacer, padNumber(frame, digits, '0')));
            }
        }
        return result;
    }

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getCursorPosition: getCursorPosition,
        detectSubsampling: detectSubsampling,
        measure: measure,
        findSpecs: findSpecs,
        naturalSize: naturalSize,
        preload: preload,
        sourceArray: sourceArray,
        noop: noop,
        findIndex: findIndex,
        getElement: getElement,
        log: log,
        warn: warn,
        error: error,
        getOption: getOption,
        toArray: toArray,
        addEventListener: addEventListener,
        destructor: destructor,
        clamp: clamp,
        wrap: wrap,
        pixelRatio: pixelRatio,
        innerWidth: innerWidth,
        innerHeight: innerHeight,
        css: css,
        createElement: createElement,
        isVisible: isVisible,
        hide: hide,
        show: show,
        fadeTo: fadeTo,
        fadeOut: fadeOut,
        fadeIn: fadeIn,
        offset: offset,
        loop: loop$1
    });

    /**
     * The version string
     *
     * @public
     */
    var VERSION = "5.0.0-beta.1";
    /**
     * The namespace that is used to bind functions to DOM events and store the data object
     *
     * @public
     */
    var namespace = 'spritespin';
    /**
     * Event names that are recognized by SpriteSpin. A module can implement any of these and they will be bound
     * to the target element on which the plugin is called.
     *
     * @public
     */
    var eventNames = [
        'resize',
        'blur',
        'focus',
        'click',
        'dblclick',
        'keydown',
        'keypress',
        'keyup',
        'mousedown',
        'mouseenter',
        'mouseleave',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'touchcancel',
        'touchend',
        'touchmove',
        'touchstart',
        'wheel',
        'mousewheel',
    ];
    /**
     *
     * @public
     */
    var lifecycleNames = [
        'onInit',
        'onProgress',
        'onLoad',
        'onFrameChanged',
        'onFrame',
        'onDraw',
        'onComplete',
        'onDestroy',
    ];
    /**
     * Default set of SpriteSpin options. This also represents the majority of data attributes that are used during the
     * lifetime of a SpriteSpin instance. The data is stored inside the target DOM element on which the plugin is called.
     *
     * @public
     */
    var defaults = {
        source: undefined,
        width: undefined,
        height: undefined,
        frames: undefined,
        framesX: undefined,
        lanes: 1,
        fillMode: 'contain',
        renderMode: 'canvas',
        lane: 0,
        frame: 0,
        frameTime: 40,
        animate: true,
        retainAnimate: false,
        reverse: false,
        loop: true,
        stopFrame: 0,
        wrap: true,
        wrapLane: false,
        sense: 1,
        senseLane: undefined,
        orientation: 'horizontal',
        detectSubsampling: true,
        preloadCount: undefined,
        plugins: ['360', 'drag'],
    };

    /**
     * Gets an opaque state object by key
     *
     * @public
     * @param state - The SpriteSpin instance or instance state object
     * @param key - The name of the state object
     */
    function getState$4(state, key) {
        state.opaque = state.opaque || {};
        state.opaque[key] = state.opaque[key] || {};
        return state.opaque[key];
    }

    /**
     * Gets the current input state which is stored in the given instance state
     *
     * @public
     * @param state - The SpriteSpin instance state
     */
    function getInputState(state) {
        return getState$4(state, "input");
    }
    /**
     * Updates the input state using a mouse or touch event.
     *
     * @public
     * @param e - The input event
     * @param state - The SpriteSpin instance state
     *
     * @remarks
     * Detects current mouse or pointer location and updates the input state. Does not trigger any event.
     */
    function updateInput$1(e, state) {
        var cursor = getCursorPosition(e);
        var input = getInputState(state);
        // cache positions from previous frame
        input.oldX = input.currentX;
        input.oldY = input.currentY;
        input.currentX = cursor.x;
        input.currentY = cursor.y;
        // Fix old position.
        if (input.oldX === undefined || input.oldY === undefined) {
            input.oldX = input.currentX;
            input.oldY = input.currentY;
        }
        // Cache the initial click/touch position and store the frame number at which the click happened.
        // Useful for different behavior implementations. This must be restored when the click/touch is released.
        if (input.startX === undefined || input.startY === undefined) {
            input.startX = input.currentX;
            input.startY = input.currentY;
            input.clickframe = state.frame;
            input.clicklane = state.lane;
        }
        // Calculate the vector from start position to current pointer position.
        input.dX = input.currentX - input.startX;
        input.dY = input.currentY - input.startY;
        // Calculate the vector from last frame position to current pointer position.
        input.ddX = input.currentX - input.oldX;
        input.ddY = input.currentY - input.oldY;
        // Normalize vectors to range [-1:+1]
        input.ndX = input.dX / innerWidth(state.target);
        input.ndY = input.dY / innerHeight(state.target);
        input.nddX = input.ddX / innerWidth(state.target);
        input.nddY = input.ddY / innerHeight(state.target);
    }
    /**
     * Resets the input state.
     *
     * @public
     * @param state - The SpriteSpin instance state
     *
     * @remarks
     * Simply clears the input state. Does not trigger any event.
     */
    function resetInput(state) {
        var input = getInputState(state);
        input.startX = input.startY = undefined;
        input.currentX = input.currentY = undefined;
        input.oldX = input.oldY = undefined;
        input.dX = input.dY = 0;
        input.ddX = input.ddY = 0;
        input.ndX = input.ndY = 0;
        input.nddX = input.nddY = 0;
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
  
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
  
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }

    function triggerEvents(events, args) {
        for (var i = 0; i < events.length; i++) {
            events[i].handler.apply(events[i].context, args);
        }
    }
    function removeEvent(events, handler) {
        for (var i = 0; i < events.length; i++) {
            if (events[i].handler === handler) {
                events.splice(i, 1);
                return true;
            }
        }
    }
    /**
     * Basic event system
     *
     * @public
     */
    var Events = /** @class */ (function () {
        function Events(owner) {
            this.owner = owner;
            this.events = {};
        }
        /**
         * Bind an event to a `callback` function.
         *
         * @remarks
         * @param name - The name of the event
         * @param callback - The function to call when the even fires
         */
        Events.prototype.on = function (name, callback) {
            var _this = this;
            var events = this.events[name] = this.events[name] || [];
            events.push({
                handler: callback,
                context: this.owner || this,
            });
            return function () { return _this.off(callback); };
        };
        /**
         * Bind an event to only be triggered a single time.
         *
         * @param name - The name of the event
         * @param callback - The function to call when the even fires
         */
        Events.prototype.once = function (name, callback) {
            var once = function () {
                if (once.called) {
                    return;
                }
                once.called = true;
                once.parent.off(name, once);
                callback.apply(this, arguments);
            };
            once.parent = this;
            return this.on(name, once);
        };
        /**
         * Remove one callback
         *
         * @param callback - The function to unbind
         */
        Events.prototype.off = function (callback) {
            var events = this.events;
            for (var key in events) {
                if (events.hasOwnProperty(key) && removeEvent(events[key], callback)) {
                    return;
                }
            }
        };
        /**
         * Trigger one or many events, firing all bound callbacks.
         *
         * @remarks
         * Callbacks are passed the same arguments as `trigger` is, apart from the event name
         * (unless you're listening on `"all"`, which will cause your callback to
         * receive the true name of the event as the first argument).
         *
         * @param name - The name of the event to trigger
         */
        Events.prototype.trigger = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (this.events[name]) {
                triggerEvents(this.events[name], args);
            }
        };
        return Events;
    }());

    function solveContain(width, height, maxWidth, maxHeight) {
        var aspect = (width / height) || 1;
        var aspect2 = (maxWidth / maxHeight) || 1;
        if (aspect > aspect2) {
            width = maxWidth;
            height = maxWidth / aspect;
        }
        else {
            height = maxHeight;
            width = height * aspect;
        }
        return [width, height];
    }
    function solveCover(width, height, maxWidth, maxHeight) {
        var aspect = (width / height) || 1;
        var aspect2 = (maxWidth / maxHeight) || 1;
        if (aspect < aspect2) {
            width = maxWidth;
            height = maxWidth / aspect;
        }
        else {
            height = maxHeight;
            width = height * aspect;
        }
        return [width, height];
    }
    function solveFill(width, height, maxWidth, maxHeight) {
        return [maxWidth, maxHeight];
    }
    function solveScaleDown(width, height, maxWidth, maxHeight) {
        var _a = solveContain(width, height, maxWidth, maxHeight), w = _a[0], h = _a[1];
        if (w * h < width * height) {
            return [w, h];
        }
        return [width, height];
    }
    /**
     * Applies css attributes to layout the SpriteSpin containers.
     *
     * @public
     */
    function useLayout(state) {
        var _a, _b, _c, _d;
        state.target.setAttribute('unselectable', 'on');
        css(state.target, {
            '-ms-user-select': 'none',
            '-moz-user-select': 'none',
            '-khtml-user-select': 'none',
            '-webkit-user-select': 'none',
            'user-select': 'none',
            overflow: 'hidden',
            position: 'relative',
            width: state.width || null,
            height: state.height || null,
        });
        css(state.stage, {
            width: state.width || state.frameWidth,
            height: state.height || state.frameHeight,
        });
        var width = state.frameWidth || state.width;
        var height = state.frameHeight || state.height;
        var targetWidth = innerWidth(state.target) || width;
        var targetHeight = innerHeight(state.target) || height;
        switch (state.fillMode) {
            case 'contain':
                _a = solveContain(width, height, targetWidth, targetHeight), width = _a[0], height = _a[1];
                break;
            case 'cover':
                _b = solveCover(width, height, targetWidth, targetHeight), width = _b[0], height = _b[1];
                break;
            case 'fill':
                _c = solveFill(width, height, targetWidth, targetHeight), width = _c[0], height = _c[1];
                break;
            case 'scale-down':
                _d = solveScaleDown(width, height, targetWidth, targetHeight), width = _d[0], height = _d[1];
                break;
        }
        css(state.stage, {
            width: width,
            height: height,
            position: 'relative'
        });
        targetWidth = innerWidth(state.target) || width;
        targetHeight = innerHeight(state.target) || height;
        css(state.stage, {
            left: (targetWidth - width) / 2,
            top: (targetHeight - height) / 2
        });
        if (!state.canvas || !state.canvasContext) {
            return;
        }
        css(state.canvas, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        });
        state.canvas.width = (width * state.canvasRatio);
        state.canvas.height = (height * state.canvasRatio);
        state.canvasContext.scale(state.canvasRatio, state.canvasRatio);
    }

    /**
     * Gets the playback state
     *
     * @public
     * @param instance - The SpriteSpin instance state
     */
    function getPlaybackState(instance) {
        return getState$4(instance, "playback");
    }
    function setLane(instance, lane) {
        instance.lane = instance.wrapLane
            ? wrap(lane, 0, instance.lanes - 1, instance.lanes)
            : clamp(lane, 0, instance.lanes - 1);
    }
    function setFrame(data, frame) {
        data.frame = Number(frame);
        data.frame = data.wrap
            ? wrap(data.frame, 0, data.frames - 1, data.frames)
            : clamp(data.frame, 0, data.frames - 1);
    }
    function updateAnimationFrame(data) {
        data.frame += (data.reverse ? -1 : 1);
        // wrap the frame value to fit in range [0, data.frames)
        data.frame = wrap(data.frame, 0, data.frames - 1, data.frames);
        // stop animation if loop is disabled and the stopFrame is reached
        if (!data.loop && (data.frame === data.stopFrame)) {
            stopAnimation(data);
        }
    }
    function updateAnimation(data, time) {
        var state = getPlaybackState(data);
        state.lastTime = state.lastTime || 0;
        if ((time - state.lastTime) < state.frameTime) {
            return;
        }
        state.lastTime = time;
        aroundFrame(data, function () {
            updateAnimationFrame(data);
        });
    }
    function aroundFrame(data, fn) {
        var state = getPlaybackState(data);
        state.lastFrame = data.frame;
        state.lastLane = data.lane;
        fn();
        var instance = data.instance;
        if (state.lastFrame !== data.frame || state.lastLane !== data.lane) {
            instance.dispatch('onFrameChanged');
        }
        instance.tick();
    }
    /**
     * Updates the frame or lane number of the SpriteSpin data.
     *
     * @public
     * @param data - The SpriteSpin instance state
     * @param frame - The frame number to set
     * @param lane - The lane number to set
     */
    function updateFrame(data, frame, lane) {
        aroundFrame(data, function () {
            if (frame != null) {
                setFrame(data, frame);
            }
            if (lane != null) {
                setLane(data, lane);
            }
        });
    }
    /**
     * Starts animation playback if needed.
     *
     * @remarks
     * Starts animation playback if `animate` property is `true` and the animation is not yet running.
     *
     * @public
     * @param data - The SpriteSpin instance state
     */
    function usePlayback(data) {
        var _a;
        var state = getPlaybackState(data);
        state.frameTime = data.frameTime;
        if (!data.animate) {
            (_a = state.looper) === null || _a === void 0 ? void 0 : _a.kill();
            state.lastTime = null;
        }
        else if (state.looper) {
            state.looper();
        }
        else {
            state.looper = loop$1(function (time) {
                updateAnimation(data, time);
            });
        }
    }
    /**
     * Stops the running animation.
     *
     * @public
     * @param data - The SpriteSpin instance state
     */
    function stopAnimation(data) {
        data.animate = false;
        usePlayback(data);
    }
    /**
     * Starts the animation playback
     *
     * @remarks
     * Starts the animation playback and also sets the `animate` property to `true`
     *
     * @public
     * @param state - The SpriteSpin instance state
     */
    function startAnimation(state) {
        state.animate = true;
        usePlayback(state);
    }

    var registry = {};
    /**
     * Registers a plugin to the spritespin plugin pool
     *
     * @public
     * @param name - The name of the plugin
     * @param plugin - The plugin implementation
     */
    function registerPlugin(name, plugin) {
        if (!plugin) {
            error(new Error("No plugin provided to register (\"" + name + "\")"));
            return;
        }
        if (!name) {
            error(new Error("No plugin name provided to register"));
            return;
        }
        if (registry[name]) {
            error(new Error("Plugin name \"" + name + "\" is already taken"));
            return;
        }
        registry[name] = plugin;
    }
    function getPluginType(name) {
        return registry[name];
    }
    function createPlugin(state, pluginOrType) {
        if (typeof pluginOrType === 'function') {
            if ('prototype' in pluginOrType) {
                return new pluginOrType(state);
            }
            return pluginOrType(state);
        }
        return pluginOrType;
    }
    function createState() {
        return {};
    }
    /**
     * Gets a plugin state object by name.
     *
     * @remarks
     * Plugins should use this method to get or create a state object where they can
     * store any instance variables.
     *
     * @public
     * @param state - The SpriteSpin instance state
     * @param pluginName - The name of the plugin
     */
    function getPluginState(state, pluginName, orCreate) {
        if (orCreate === void 0) { orCreate = createState; }
        var data = getState$4(state, 'plugins');
        if (!data[pluginName]) {
            data[pluginName] = orCreate();
        }
        return data[pluginName];
    }
    /**
     * Gets the user options given for the plugin
     *
     * @public
     * @param state - The SpriteSpin instance state
     * @param name - The plugin name
     * @returns
     */
    function getPluginOptions(state, name) {
        for (var _i = 0, _a = state.plugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            if (typeof plugin !== 'string' && plugin.name === name) {
                return plugin.options;
            }
        }
    }
    /**
     * Gets an instance of an active plugin by name
     *
     * @param state - The SpriteSpin instance state
     * @param name - The plugin name
     * @returns
     */
    function getPluginInstance(state, name) {
        for (var i = 0; i < state.activePlugins.length; i++) {
            if (state.activePlugins[i].name === name) {
                return state.activePlugins[i];
            }
        }
    }
    /**
     * Replaces module names on given SpriteSpin data and replaces them with actual implementations.
     * @public
     */
    function usePlugins(state, actions) {
        var plugins = [];
        var createdPlugins = [];
        var existingPlugins = __spreadArray([], (state.activePlugins || []));
        var names = state.plugins.map(function (it) { return typeof it === 'string' ? it : it.name; });
        var _loop_1 = function (id) {
            var index = findIndex(existingPlugins, function (p) { return p.name === id; });
            if (index >= 0) {
                plugins.push(existingPlugins[index]);
                existingPlugins.splice(index, 1);
                return "continue";
            }
            var type = getPluginType(id);
            if (type) {
                var plugin = createPlugin(state, type);
                createdPlugins.push(plugin);
                plugins.push(plugin);
            }
            else {
                error(new Error("No plugin found with name " + name));
            }
        };
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var id = names_1[_i];
            _loop_1(id);
        }
        state.activePlugins = plugins;
        for (var _a = 0, existingPlugins_1 = existingPlugins; _a < existingPlugins_1.length; _a++) {
            var plugin = existingPlugins_1[_a];
            actions.onRemoved(plugin);
        }
        for (var _b = 0, createdPlugins_1 = createdPlugins; _b < createdPlugins_1.length; _b++) {
            var plugin = createdPlugins_1[_b];
            actions.onCreated(plugin);
        }
    }

    /**
     * Prepares the render stage and canvas
     *
     * @public
     * @param state - The SpriteSpin instance state
     */
    function useStage(state) {
        if (!state.stage) {
            state.stage = grabStage(state.target);
            state.images = grabImages(state.stage);
        }
        if (!state.canvas && state.renderMode === 'canvas') {
            state.canvas = grabCanvas(state.target, state.stage);
            state.canvasContext = grabContext(state.canvas);
            if (!state.canvasContext) {
                state.renderMode = 'image'; // fallback to image rendering mode
            }
            else {
                state.canvasRatio = state.canvasRatio || pixelRatio(state.canvasContext);
            }
        }
    }
    function grabStage(root) {
        var stage = root.querySelector('.spritespin-stage');
        if (!stage) {
            stage = document.createElement('div');
            root.appendChild(stage);
        }
        stage.classList.add('spritespin-stage');
        return stage;
    }
    function grabCanvas(root, parent) {
        var canvas = root.querySelector('canvas.spritespin-stage,canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            parent.appendChild(canvas);
        }
        canvas.classList.add('spritespin-canvas');
        return canvas;
    }
    function grabContext(canvas) {
        var _a;
        return (_a = canvas.getContext) === null || _a === void 0 ? void 0 : _a.call(canvas, '2d');
    }
    function grabImages(parent) {
        var images = [];
        var children = parent.children;
        for (var i = 0; i < children.length; i++) {
            var child = children.item(i);
            if (child instanceof HTMLImageElement) {
                images.push(child);
                child.remove();
            }
        }
        return images;
    }

    function getResizeState(instance) {
        return getState$4(instance, 'resize');
    }
    function onResize(state, fn) {
        var timeout;
        var resize = function () {
            clearTimeout(timeout);
            timeout = setTimeout(fn, 0);
        };
        if (typeof ResizeObserver !== 'undefined') {
            var didStart_1 = false;
            var observer_1 = new ResizeObserver(function () {
                if (!didStart_1) {
                    didStart_1 = true; // skip initial
                }
                else {
                    resize();
                }
            });
            observer_1.observe(state.target);
            return function () { return observer_1.disconnect(); };
        }
        return addEventListener(window, 'resize', resize);
    }
    function useResize(state) {
        var data = getResizeState(state);
        data.destructor = data.destructor || destructor([
            state.instance.addListener('onDestroy', function () {
                data.destructor();
                data.destructor = null;
            }),
            onResize(state, function () {
                state.instance.init();
                state.instance.tick();
            })
        ]);
    }

    var instances = [];
    function pushInstance(instance) {
        if (instances.indexOf(instance) < 0) {
            instances.push(instance);
        }
    }
    function popInstance(instance) {
        var index = instances.indexOf(instance);
        if (index >= 0) {
            instances.splice(index, 1);
        }
    }
    /**
     * Gets an instance for the given HTML Element
     *
     * @public
     * @param target - The HTML Element or a selector or an object with target
     */
    function find(target) {
        var el = elementOf(target);
        for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
            var instance = instances_1[_i];
            if (instance.target === el) {
                return instance;
            }
        }
        return null;
    }
    /**
     * Creates a new SpriteSpin instance, or updates an existing one
     *
     * @public
     */
    function createOrUpdate(options) {
        var instance = find(options);
        if (!instance) {
            instance = new Instance(options);
            return instance.load();
        }
        return instance.update(options);
    }
    /**
     * Creates a new SpriteSpin instance
     *
     * @public
     */
    function create(options) {
        var instance = find(options);
        if (instance) {
            throw new Error('Instance on element already exists');
        }
        return new Instance(options).load();
    }
    /**
     * Updates an existing instance with given options
     *
     * @public
     */
    function update(options) {
        var instance = find(options);
        if (!instance) {
            throw new Error('Instance not found');
        }
        return instance.update(options);
    }
    /**
     * Destroys the SpriteSpin instance
     *
     * @remarks
     * - stops running animation
     * - unbinds all events
     * - resets element state
     *
     * @public
     */
    function destroy(target) {
        var instance = find(target);
        if (instance) {
            instance.destroy();
        }
    }
    /**
     * Adds methods to the SpriteSpin prototype
     *
     * @public
     */
    function extend(extension) {
        var prototype = Instance.prototype;
        for (var _i = 0, _a = Object.keys(extension); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key in prototype) {
                throw new Error('Instance method is already defined: ' + key);
            }
            else {
                prototype[key] = extension[key];
            }
        }
    }
    /**
     *
     * @public
     */
    var Instance = /** @class */ (function () {
        /**
         * Constructs a new spritespin instance and runs
         *
         * @param options - the configuration options
         */
        function Instance(options) {
            this.events = new Events(this);
            this.target = elementOf(options.target);
            if (!this.target) {
                throw new Error('Element not given or not found');
            }
            this.state = __assign(__assign(__assign({}, JSON.parse(JSON.stringify(defaults))), options), { source: toArray(options.source), target: this.target, instance: this });
        }
        /**
         * Updates the configuration and reboots the instance
         *
         * @param options - the new instance options
         */
        Instance.prototype.update = function (options) {
            __assign(this.state, __assign(__assign({}, (options || {})), { activePlugins: this.state.activePlugins, source: toArray(options.source || this.state.source), target: this.target, stage: this.state.stage, images: this.state.images, instance: this, opaque: this.state.opaque }));
            this.load();
            return this;
        };
        /**
         * Dispatches the `onInit` lifecycle event
         */
        Instance.prototype.init = function () {
            onInit$2(this);
            this.dispatch('onInit');
            return this;
        };
        /**
         * Dispatches the `onFrame` and `onDraw` lifecycle events
         */
        Instance.prototype.tick = function () {
            this.dispatch('onFrame');
            this.dispatch('onDraw');
            return this;
        };
        /**
         * Dispatches the `onDestroy` lifecycle event
         */
        Instance.prototype.destroy = function () {
            this.dispatch('onDestroy');
            onDestroy$1(this);
            return this;
        };
        /**
         * Preloads images and runs the initial lifecycle. Creates plugins, loads images, dispatches events.
         *
         * @public
         */
        Instance.prototype.load = function () {
            var _this = this;
            var state = this.state;
            this.init();
            state.isLoading = true;
            preload({
                source: state.source,
                crossOrigin: state.crossOrigin,
                preloadCount: state.preloadCount,
                progress: function (progress) {
                    state.progress = progress;
                    _this.dispatch('onProgress');
                },
                complete: function (images) {
                    state.images = images;
                    state.isLoading = false;
                    onLoad(_this);
                    _this.dispatch('onLoad');
                    _this.tick();
                    _this.dispatch('onComplete');
                },
            });
            return this;
        };
        /**
         * Adds a lifecycle event listener
         *
         * @param event - the lifecycle event name
         * @param cb - the handler method
         * @returns a function to remove the added event listener
         */
        Instance.prototype.addListener = function (event, cb) {
            return this.events.on(event, cb);
        };
        /**
         * Removes a previously added event listener
         *
         * @param cb - the handler to remove
         * @returns
         */
        Instance.prototype.removeListener = function (cb) {
            this.events.off(cb);
            return this;
        };
        /**
         * Dispatches a lifecycle event
         *
         * @param event - the lifecycle method name
         */
        Instance.prototype.dispatch = function (event) {
            var e;
            try {
                e = document.createEvent('Event');
                e.initEvent(event + "." + namespace, true, true);
            }
            catch (e) {
                warn(e);
            }
            this.events.trigger(event, e, this.state);
            if (e) {
                this.target.dispatchEvent(e);
            }
            if (event in this.state) {
                this.state[event].call(this, e, this.state);
            }
        };
        /**
         * Gets the instance of an active plugin by name
         *
         * @param name - The name of the plugin
         */
        Instance.prototype.getPlugin = function (name) {
            return getPluginInstance(this.state, name);
        };
        return Instance;
    }());
    function onInit$2(instance) {
        pushInstance(instance);
        instance.target.classList.add('spritespin-instance');
        var state = instance.state;
        state.target.classList.add('loading');
        state.source = toArray(state.source);
        useResize(state);
        useStage(state);
        useLayout(state);
        usePlugins(state, {
            onCreated: function (plugin) { return onPluginCreated(instance, plugin); },
            onRemoved: function (plugin) { return onPluginRemoved(instance, plugin); }
        });
    }
    function onLoad(instance) {
        var state = instance.state;
        state.frames = state.frames || state.images.length;
        state.target.classList.remove('loading');
        useMetrics(state);
        useLayout(state);
        usePlayback(state);
    }
    function onDestroy$1(instance) {
        stopAnimation(instance.state);
        instance.target.innerHTML = '';
        instance.target.setAttribute('style', null);
        instance.target.setAttribute('unselectable', null);
        instance.target.classList.remove('spritespin-instance');
        popInstance(instance);
    }
    function onPluginCreated(instance, plugin) {
        var destroy = destructor();
        var onDestroy = plugin.onDestroy;
        plugin.onDestroy = function (e, instance) {
            destroy();
            onDestroy === null || onDestroy === void 0 ? void 0 : onDestroy.call(plugin, e, instance);
        };
        var _loop_1 = function (key) {
            if (typeof plugin[key] !== 'function') {
                return "continue";
            }
            destroy.add(instance.addListener(key, function (e, state) {
                plugin[key].call(plugin, e, state);
            }));
        };
        for (var _i = 0, lifecycleNames_1 = lifecycleNames; _i < lifecycleNames_1.length; _i++) {
            var key = lifecycleNames_1[_i];
            _loop_1(key);
        }
        var _loop_2 = function (key) {
            if (typeof plugin[key] !== 'function') {
                return "continue";
            }
            var listener = function (e) { return plugin[key].call(plugin, e, instance.state); };
            destroy.addEventListener(instance.target, key, listener, { passive: false });
        };
        for (var _a = 0, eventNames_1 = eventNames; _a < eventNames_1.length; _a++) {
            var key = eventNames_1[_a];
            _loop_2(key);
        }
    }
    function onPluginRemoved(instance, plugin) {
        var _a;
        (_a = plugin.onDestroy) === null || _a === void 0 ? void 0 : _a.call(plugin, null, instance.state);
    }
    function elementOf(target) {
        if (target instanceof Element) {
            return target;
        }
        if (typeof target === 'string') {
            return document.querySelector(target);
        }
        if (typeof target === 'object') {
            return elementOf(target.target);
        }
        return null;
    }
    function useMetrics(state) {
        state.metrics = measure(state.images, {
            frames: state.frames,
            framesX: state.framesX,
            framesY: state.framesY,
            detectSubsampling: state.detectSubsampling,
        });
        var spec = findSpecs(state.metrics, state.frames, 0, 0);
        if (spec.sprite) {
            state.frameWidth = spec.sprite.width;
            state.frameHeight = spec.sprite.height;
        }
    }

    function spritespin() {
        var _a;
        if (arguments.length === 0) {
            throw new Error('Not enough arguments');
        }
        if (arguments.length === 1) {
            if ((typeof arguments[0] !== 'string') && !(arguments[0] instanceof Element)) {
                return createOrUpdate(arguments[0]);
            }
            return find(getElement(arguments[0]));
        }
        var target = getElement(arguments[0]);
        if (!target) {
            throw new Error('Target element not given or not found');
        }
        var option = arguments[1];
        if (option && typeof option === 'object') {
            return createOrUpdate(__assign(__assign({}, option), { target: target }));
        }
        var instance = find(target);
        if (!instance) {
            throw new Error('Instance not found');
        }
        switch (option) {
            case 'destroy': {
                return instance.destroy();
            }
        }
        if (arguments.length === 3) {
            return instance.update((_a = {}, _a[option] = arguments[2], _a));
        }
        else {
            return instance.state[option];
        }
    }

    extend({
        isPlaying: function () {
            var _a;
            return !!((_a = getPlaybackState(this.state).looper) === null || _a === void 0 ? void 0 : _a.isRunning);
        },
        isLooping: function () {
            return this.state.loop;
        },
        toggleAnimation: function () {
            if (this.isPlaying()) {
                this.stopAnimation();
            }
            else {
                this.startAnimation();
            }
        },
        stopAnimation: function () {
            this.state.animate = false;
            stopAnimation(this.state);
        },
        startAnimation: function () {
            this.state.animate = true;
            usePlayback(this.state);
        },
        loop: function (value) {
            this.state.loop = value;
            usePlayback(this.state);
            return this;
        },
        currentFrame: function () {
            return this.state.frame;
        },
        updateFrame: function (frame, lane) {
            updateFrame(this.state, frame, lane);
            return this;
        },
        skipFrames: function (step) {
            var data = this.state;
            updateFrame(data, data.frame + (data.reverse ? -step : +step));
            return this;
        },
        nextFrame: function () {
            return this.skipFrames(1);
        },
        prevFrame: function () {
            return this.skipFrames(-1);
        },
        playTo: function (frame, options) {
            var data = this.state;
            options = options || {};
            if (!options.force && data.frame === frame) {
                return;
            }
            if (options.nearest) {
                // distance to the target frame
                var a = frame - data.frame;
                // distance to last frame and the to target frame
                var b = frame > data.frame ? a - data.frames : a + data.frames;
                // minimum distance
                var c = Math.abs(a) < Math.abs(b) ? a : b;
                data.reverse = c < 0;
            }
            data.animate = true;
            data.loop = false;
            data.stopFrame = frame;
            usePlayback(data);
            return this;
        },
    });

    function getState$3(instance) {
        return getPluginState(instance, 'fullscreen-api');
    }
    function pick(target, names) {
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            if (name_1 in target) {
                return name_1;
            }
        }
        return names[0];
    }
    var browser = {
        requestFullscreen: pick(document.documentElement, [
            'requestFullscreen',
            'webkitRequestFullScreen',
            'mozRequestFullScreen',
            'msRequestFullscreen'
        ]),
        exitFullscreen: pick(document, [
            'exitFullscreen',
            'webkitExitFullscreen',
            'webkitCancelFullScreen',
            'mozCancelFullScreen',
            'msExitFullscreen'
        ]),
        fullscreenElement: pick(document, [
            'fullscreenElement',
            'webkitFullscreenElement',
            'webkitCurrentFullScreenElement',
            'mozFullScreenElement',
            'msFullscreenElement'
        ]),
        fullscreenEnabled: pick(document, [
            'fullscreenEnabled',
            'webkitFullscreenEnabled',
            'mozFullScreenEnabled',
            'msFullscreenEnabled'
        ]),
        fullscreenchange: pick(document, [
            'onfullscreenchange',
            'onwebkitfullscreenchange',
            'onmozfullscreenchange',
            'onMSFullscreenChange'
        ]).replace(/^on/, ''),
        fullscreenerror: pick(document, [
            'onfullscreenerror',
            'onwebkitfullscreenerror',
            'onmozfullscreenerror',
            'onMSFullscreenError'
        ]).replace(/^on/, '')
    };
    function unbindChangeEvent(instance) {
        var state = getState$3(instance);
        if (state.onChange) {
            document.removeEventListener(browser.fullscreenchange, state.onChange);
            state.onChange = null;
        }
    }
    function bindChangeEvent(instance, callback) {
        unbindChangeEvent(instance);
        var state = getState$3(instance);
        state.onChange = callback;
        document.addEventListener(browser.fullscreenchange, state.onChange);
    }
    function unbindOrientationEvent(instance) {
        var state = getState$3(instance);
        if (state.onOrientationChane) {
            window.removeEventListener('orientationchange', state.onOrientationChane);
            state.onOrientationChane = null;
        }
    }
    function bindOrientationEvent(instance, callback) {
        unbindOrientationEvent(instance);
        var state = getState$3(instance);
        state.onOrientationChane = callback;
        window.addEventListener('orientationchange', state.onOrientationChane);
    }
    function requestFullscreenNative(e) {
        var el = e || document.documentElement;
        el[browser.requestFullscreen]();
    }
    function exitFullscreen() {
        return document[browser.exitFullscreen]();
    }
    function fullscreenEnabled() {
        return document[browser.fullscreenEnabled];
    }
    function fullscreenElement() {
        return document[browser.fullscreenElement];
    }
    function isFullscreen() {
        return !!fullscreenElement();
    }
    function toggleFullscreen(state, opts) {
        if (isFullscreen()) {
            requestFullscreen(state, opts);
        }
        else {
            exitFullscreen();
        }
    }
    function requestFullscreen(state, opts) {
        opts = opts || {};
        var instance = state.instance;
        var original = {
            width: state.width,
            height: state.height,
            source: state.source,
            fillMode: state.fillMode,
        };
        var enter = function () { return instance.update(opts); };
        var exit = function () { return instance.update(original); };
        bindChangeEvent(state, function () {
            if (isFullscreen()) {
                enter();
                bindOrientationEvent(state, enter);
            }
            else {
                unbindChangeEvent(state);
                unbindOrientationEvent(state);
                exit();
            }
        });
        requestFullscreenNative(state.target);
    }
    extend({
        fullscreenEnabled: fullscreenEnabled,
        fullscreenElement: fullscreenElement,
        exitFullscreen: exitFullscreen,
        toggleFullscreen: function (opts) {
            toggleFullscreen(this.state, opts);
        },
        requestFullscreen: function (opts) {
            requestFullscreen(this.state, opts);
        }
    });

    if (typeof window !== 'undefined' && 'jQuery' in window) {
        var jq = window.jQuery;
        jq.fn.spritespin = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.each(function () {
                spritespin.call.apply(spritespin, __spreadArray([this, this], args));
            });
        };
    }

    var NAME$a = 'click';
    registerPlugin(NAME$a, function (state) {
        var onclick = function (e) {
            if (state.isLoading || state.isHalted) {
                return;
            }
            updateInput$1(e, state);
            var input = getInputState(state);
            var half, pos;
            var target = state.target, off = offset(target);
            if (state.orientation === 'horizontal') {
                half = innerWidth(target) / 2;
                pos = input.currentX - off.left;
            }
            else {
                half = target.clientHeight / 2;
                pos = input.currentY - off.top;
            }
            updateFrame(state, state.frame + (pos > half ? 1 : -1));
        };
        return {
            name: NAME$a,
            mouseup: onclick,
            touchend: onclick
        };
    });

    var NAME$9 = 'drag';
    function getState$2(state) {
        return getPluginState(state, NAME$9);
    }
    function getAxis(state) {
        if (typeof state.orientation === 'number') {
            return state.orientation * Math.PI / 180;
        }
        if (state.orientation === 'horizontal') {
            return 0;
        }
        return Math.PI / 2;
    }
    function onInit$1(e, state) {
        var data = getState$2(state);
        data.destructor = destructor();
    }
    function dragStart(e, state) {
        if (state.isLoading || state.isDragging || state.isHalted) {
            return;
        }
        var data = getState$2(state);
        data.destructor.addEventListener(document, 'mousemove', function (e) { return drag(e, state); });
        data.destructor.addEventListener(document, 'mouseup', function (e) { return dragEnd(e, state); });
        data.startAt = new Date().getTime();
        data.wasPlaying = !!state.animate;
        data.frame = state.frame || 0;
        data.lane = state.lane || 0;
        state.isDragging = true;
        updateInput$1(e, state);
    }
    function dragEnd(e, state) {
        var data = getState$2(state);
        data.destructor();
        if (!state.isDragging) {
            return;
        }
        data.endAt = new Date().getTime();
        state.isDragging = false;
        resetInput(state);
        if (state.retainAnimate && data.wasPlaying) {
            startAnimation(state);
        }
    }
    function drag(e, state) {
        if (!state.isDragging) {
            return;
        }
        var data = getState$2(state);
        var input = getInputState(state);
        updateInput$1(e, state);
        var rad = getAxis(state);
        var sn = Math.sin(rad);
        var cs = Math.cos(rad);
        var x = ((input.nddX * cs - input.nddY * sn) * state.sense) || 0;
        var y = ((input.nddX * sn + input.nddY * cs) * (state.senseLane || state.sense)) || 0;
        // accumulate
        data.frame += state.frames * x;
        data.lane += state.lanes * y;
        // update spritespin
        updateFrame(state, Math.floor(data.frame), Math.floor(data.lane));
        stopAnimation(state);
    }
    function mousemove(e, instance) {
        dragStart(e, instance);
        drag(e, instance);
    }
    registerPlugin('drag', {
        name: 'drag',
        onInit: onInit$1,
        mousedown: dragStart,
        mousemove: drag,
        mouseup: dragEnd,
        touchstart: dragStart,
        touchmove: drag,
        touchend: dragEnd,
        touchcancel: dragEnd
    });
    registerPlugin('move', {
        name: 'move',
        onInit: onInit$1,
        mousemove: mousemove,
        mouseleave: dragEnd,
        touchstart: dragStart,
        touchmove: drag,
        touchend: dragEnd,
        touchcancel: dragEnd
    });

    var NAME$8 = 'hold';
    registerPlugin(NAME$8, function (data) {
        var state = {
            frameTime: null,
            animate: null,
            reverse: null,
        };
        function rememberOptions() {
            state.frameTime = data.frameTime;
            state.animate = data.animate;
            state.reverse = data.reverse;
        }
        function restoreOptions() {
            data.frameTime = state.frameTime;
            data.animate = state.animate;
            data.reverse = state.reverse;
        }
        function start(e) {
            if (data.isLoading || data.isDragging || data.isHalted) {
                return;
            }
            rememberOptions();
            updateInput$1(e, data);
            data.isDragging = true;
            data.animate = true;
            usePlayback(data);
        }
        function stop() {
            data.isDragging = false;
            resetInput(data);
            stopAnimation(data);
            restoreOptions();
            usePlayback(data);
        }
        function update(e) {
            if (!data.isDragging || data.isLoading || data.isHalted) {
                return;
            }
            updateInput$1(e, data);
            var input = getInputState(data);
            var half, delta;
            var target = data.target, off = offset(target);
            if (data.orientation === 'horizontal') {
                half = innerWidth(target) / 2;
                delta = (input.currentX - off.left - half) / half;
            }
            else {
                half = innerHeight(target) / 2;
                delta = (input.currentY - off.top - half) / half;
            }
            data.reverse = delta < 0;
            delta = delta < 0 ? -delta : delta;
            data.frameTime = 80 * (1 - delta) + 20;
            if (((data.orientation === 'horizontal') && (input.dX < input.dY)) ||
                ((data.orientation === 'vertical') && (input.dX < input.dY))) {
                e.preventDefault();
            }
        }
        function onFrame() {
            data.animate = true;
            usePlayback(data);
        }
        return {
            name: NAME$8,
            mousedown: start,
            mousemove: update,
            mouseup: stop,
            mouseleave: stop,
            touchstart: start,
            touchmove: update,
            touchend: stop,
            touchcancel: stop,
            onFrame: onFrame
        };
    });

    var NAME$7 = 'swipe';
    registerPlugin(NAME$7, function (data) {
        var state = {
            fling: 10,
            snap: 0.5
        };
        function init() {
            var options = getPluginOptions(data, NAME$7);
            if (options) {
                state.fling = getOption(data, 'swipeFling', state.fling);
                state.snap = getOption(data, 'swipeSnap', state.snap);
            }
        }
        function start(e) {
            if (!data.isLoading && !data.isDragging) {
                updateInput$1(e, data);
                data.isDragging = true;
            }
        }
        function update(e) {
            if (!data.isDragging) {
                return;
            }
            updateInput$1(e, data);
            var frame = data.frame;
            var lane = data.lane;
            updateFrame(data, frame, lane);
        }
        function end() {
            if (!data.isDragging) {
                return;
            }
            data.isDragging = false;
            var input = getInputState(data);
            var frame = data.frame;
            var lane = data.lane;
            var snap = state.snap;
            var fling = state.fling;
            var dS, dF;
            if (data.orientation === 'horizontal') {
                dS = input.ndX;
                dF = input.ddX;
            }
            else {
                dS = input.ndY;
                dF = input.ddY;
            }
            if (dS >= snap || dF >= fling) {
                frame = data.frame - 1;
            }
            else if (dS <= -snap || dF <= -fling) {
                frame = data.frame + 1;
            }
            resetInput(data);
            updateFrame(data, frame, lane);
            stopAnimation(data);
        }
        return {
            name: NAME$7,
            onLoad: init,
            mousedown: start,
            mousemove: update,
            mouseup: end,
            mouseleave: end,
            touchstart: start,
            touchmove: update,
            touchend: end,
            touchcancel: end
        };
    });

    var NAME$6 = 'wheel';
    registerPlugin(NAME$6, function (state) {
        function wheel(e) {
            if (!state.isLoading) {
                e.preventDefault();
                var signX = e.deltaX === 0 ? 0 : e.deltaX > 0 ? 1 : -1;
                var signY = e.deltaY === 0 ? 0 : e.deltaY > 0 ? 1 : -1;
                updateFrame(state, state.frame + signY, state.lane + signX);
            }
        }
        return {
            name: NAME$6,
            wheel: wheel
        };
    });

    var NAME$5 = 'progress';
    registerPlugin(NAME$5, function (data) {
        var stage = createElement('div', { class: 'spritespin-progress' });
        var label = createElement('div', { class: 'spritespin-progress-label' });
        var progress = createElement('div', { class: 'spritespin-progress-bar' });
        stage.appendChild(label);
        stage.appendChild(progress);
        data.target.appendChild(stage);
        label.textContent = '0%';
        css(stage, { position: 'absolute', width: '100%', top: 0 });
        label.style.textAlign = 'center';
        progress.style.width = '0%';
        function update() {
            if (data.isLoading) {
                label.textContent = data.progress.percent + "%";
                progress.style.width = data.progress.percent + "%";
                show(stage);
            }
            else {
                hide(stage);
            }
        }
        function destroy() {
            stage.remove();
        }
        return {
            name: NAME$5,
            onInit: update,
            onProgress: update,
            onLoad: update,
            onDestroy: destroy
        };
    });

    var NAME$4 = '360';
    registerPlugin(NAME$4, function (state) {
        function onLoad() {
            state.stage.querySelectorAll('.spritespin-frames').forEach(function (it) { return it.remove(); });
            if (state.renderMode === 'image' && Array.isArray(state.images)) {
                for (var _i = 0, _a = state.images; _i < _a.length; _i++) {
                    var image = _a[_i];
                    image.classList.add('spritespin-frames');
                    state.stage.appendChild(image);
                }
            }
        }
        function onDraw() {
            var specs = findSpecs(state.metrics, state.frames, state.frame, state.lane);
            var sheet = specs.sheet;
            var sprite = specs.sprite;
            if (!sheet || !sprite) {
                return;
            }
            var src = state.source[sheet.id];
            var image = state.images[sheet.id];
            if (state.renderMode === 'canvas') {
                show(state.canvas);
                var w = state.canvas.width / state.canvasRatio;
                var h = state.canvas.height / state.canvasRatio;
                state.canvasContext.clearRect(0, 0, w, h);
                state.canvasContext.drawImage(image, sprite.sampledX, sprite.sampledY, sprite.sampledWidth, sprite.sampledHeight, 0, 0, w, h);
                return;
            }
            if (state.canvas) {
                hide(state.canvas);
            }
            var scaleX = innerWidth(state.stage) / sprite.sampledWidth;
            var scaleY = innerHeight(state.stage) / sprite.sampledHeight;
            var top = Math.floor(-sprite.sampledY * scaleY);
            var left = Math.floor(-sprite.sampledX * scaleX);
            var width = Math.floor(sheet.sampledWidth * scaleX);
            var height = Math.floor(sheet.sampledHeight * scaleY);
            if (state.renderMode === 'background') {
                css(state.stage, {
                    'background-image': "url('" + src + "')",
                    'background-position': left + "px " + top + "px",
                    'background-repeat': 'no-repeat',
                    '-webkit-background-size': width + "px " + height + "px",
                    '-moz-background-size': width + "px " + height + "px",
                    '-o-background-size': width + "px " + height + "px",
                    'background-size': width + "px " + height + "px"
                });
                return;
            }
            for (var _i = 0, _a = state.images; _i < _a.length; _i++) {
                var img = _a[_i];
                hide(img);
            }
            show(image);
            css(image, {
                position: 'absolute',
                top: top,
                left: left,
                'max-width': 'initial',
                width: width,
                height: height
            });
        }
        return {
            name: NAME$4,
            onLoad: onLoad,
            onDraw: onDraw
        };
    });

    var NAME$3 = 'blur';
    function getState$1(data) {
        return getPluginState(data, NAME$3);
    }
    function init(e, data) {
        var state = getState$1(data);
        var options = getPluginOptions(data, NAME$3) || {};
        state.steps = state.steps || [];
        state.cssBlur = !!getOption(options, 'cssBlur', false);
        state.fadeTime = Math.max(getOption(options, 'fadeTime', 200), 1);
        state.frameTime = Math.max(getOption(options, 'frameTime', data.frameTime), 16);
        state.trackTime = null;
        if (!state.canvas || !state.canvas.parentElement) {
            state.canvas = state.canvas || document.createElement('canvas');
            state.canvas.classList.add('blur-layer');
            state.context = state.context || state.canvas.getContext('2d');
            css(state.canvas, {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
            });
            data.stage.appendChild(state.canvas);
        }
        var canvasRatio = pixelRatio(state.context);
        state.canvas.width = innerWidth(data.stage) * canvasRatio;
        state.canvas.height = innerHeight(data.stage) * canvasRatio;
        show(state.canvas);
        state.context.scale(canvasRatio, canvasRatio);
    }
    function onFrame(e, data) {
        var state = getState$1(data);
        trackFrame(data);
        if (state.timeout == null) {
            loop(data);
        }
    }
    function trackFrame(data) {
        var state = getState$1(data);
        var ani = getPlaybackState(data);
        // distance between frames
        var d = Math.abs(data.frame - ani.lastFrame);
        // shortest distance
        d = d >= data.frames / 2 ? data.frames - d : d;
        state.steps.unshift({
            frame: data.frame,
            lane: data.lane,
            live: 1,
            step: state.frameTime / state.fadeTime,
            d: d,
            alpha: 0
        });
    }
    var toRemove = [];
    function removeOldFrames(frames) {
        toRemove.length = 0;
        for (var i = 0; i < frames.length; i += 1) {
            if (frames[i].alpha <= 0) {
                toRemove.push(i);
            }
        }
        for (var _i = 0, toRemove_1 = toRemove; _i < toRemove_1.length; _i++) {
            var item = toRemove_1[_i];
            frames.splice(item, 1);
        }
    }
    function loop(data) {
        var state = getState$1(data);
        state.timeout = window.setTimeout(function () { tick(data); }, state.frameTime);
    }
    function killLoop(data) {
        var state = getState$1(data);
        window.clearTimeout(state.timeout);
        state.timeout = null;
    }
    function applyCssBlur(canvas, d) {
        var amount = Math.min(Math.max((d / 2) - 4, 0), 2.5);
        var blur = "blur(" + amount + "px)";
        css(canvas, {
            '-webkit-filter': blur,
            filter: blur
        });
    }
    function clearFrame(data, state) {
        show(state.canvas);
        var w = state.canvas.width / data.canvasRatio;
        var h = state.canvas.height / data.canvasRatio;
        state.context.clearRect(0, 0, w, h);
    }
    function drawFrame(data, state, step) {
        if (step.alpha <= 0) {
            return;
        }
        var specs = findSpecs(data.metrics, data.frames, step.frame, step.lane);
        var sheet = specs.sheet;
        var sprite = specs.sprite;
        if (!sheet || !sprite) {
            return;
        }
        var image = data.images[sheet.id];
        if (image.complete === false) {
            return;
        }
        show(state.canvas);
        var w = state.canvas.width / data.canvasRatio;
        var h = state.canvas.height / data.canvasRatio;
        state.context.globalAlpha = step.alpha;
        state.context.drawImage(image, sprite.sampledX, sprite.sampledY, sprite.sampledWidth, sprite.sampledHeight, 0, 0, w, h);
    }
    function tick(data) {
        var state = getState$1(data);
        killLoop(data);
        if (!state.context) {
            return;
        }
        var d = 0;
        clearFrame(data, state);
        state.context.clearRect(0, 0, data.width, data.height);
        for (var _i = 0, _a = state.steps; _i < _a.length; _i++) {
            var step = _a[_i];
            step.live = Math.max(step.live - step.step, 0);
            step.alpha = Math.max(step.live - 0.25, 0);
            drawFrame(data, state, step);
            d += step.alpha + step.d;
        }
        if (state.cssBlur) {
            applyCssBlur(state.canvas, d);
        }
        removeOldFrames(state.steps);
        if (state.steps.length) {
            loop(data);
        }
    }
    registerPlugin(NAME$3, {
        name: NAME$3,
        onLoad: init,
        onFrameChanged: onFrame
    });

    var max = Math.max;
    var min = Math.min;
    var NAME$2 = 'inertia';
    registerPlugin(NAME$2, function (data) {
        var state = {
            maxSamples: 5,
            damping: 0.9,
            abortTime: 250,
            updateTime: data.frameTime,
        };
        function init() {
            var options = getPluginOptions(data, NAME$2);
            if (options) {
                state.maxSamples = max(getOption(options, 'samples', 5), 0);
                state.damping = max(min(getOption(options, 'damping', 0.9), 0.999), 0);
                state.abortTime = max(getOption(options, 'abortTime', 250), 16);
                state.updateTime = max(getOption(options, 'updateTime', data.frameTime), 16);
            }
            state.samples = [];
            state.steps = [];
        }
        function clear() {
            state.samples.length = 0;
            killLoop();
        }
        function update() {
            if (data.isDragging) {
                sampleInput();
            }
        }
        function end() {
            var samples = state.samples;
            var last;
            var lanes = 0;
            var frames = 0;
            var time = 0;
            for (var _i = 0, samples_1 = samples; _i < samples_1.length; _i++) {
                var sample = samples_1[_i];
                if (!last) {
                    last = sample;
                    continue;
                }
                var dt = sample.time - last.time;
                if (dt > state.abortTime) {
                    lanes = frames = time = 0;
                    return killLoop();
                }
                frames += sample.frame - last.frame;
                lanes += sample.lane - last.lane;
                time += dt;
                last = sample;
            }
            samples.length = 0;
            if (!time) {
                return;
            }
            state.lane = data.lane;
            state.lanes = 0;
            state.laneStep = lanes / time * state.updateTime;
            state.frame = data.frame;
            state.frames = 0;
            state.frameStep = frames / time * state.updateTime;
            loop();
        }
        function sampleInput() {
            // add a new sample
            state.samples.push({
                time: new Date().getTime(),
                frame: data.frame,
                lane: data.lane
            });
            // drop old samples
            while (state.samples.length > state.maxSamples) {
                state.samples.shift();
            }
        }
        function killLoop() {
            if (state.handler != null) {
                window.clearTimeout(state.handler);
                state.handler = null;
            }
        }
        function loop() {
            state.handler = window.setTimeout(function () { tick(); }, state.updateTime);
        }
        function tick() {
            state.lanes += state.laneStep;
            state.frames += state.frameStep;
            state.laneStep *= state.damping;
            state.frameStep *= state.damping;
            var frame = Math.floor(state.frame + state.frames);
            var lane = Math.floor(state.lane + state.lanes);
            updateFrame(data, frame, lane);
            if (data.isDragging) {
                killLoop();
            }
            else if (Math.abs(state.frameStep) > 0.005 || Math.abs(state.laneStep) > 0.005) {
                loop();
            }
            else {
                killLoop();
            }
        }
        return {
            name: NAME$2,
            onLoad: init,
            mousedown: clear,
            mousemove: update,
            mouseup: end,
            mouseleave: end,
            touchstart: clear,
            touchmove: update,
            touchend: end,
            touchcancel: end
        };
    });

    var NAME$1 = 'panorama';
    registerPlugin(NAME$1, function (state) {
        function onLoad() {
            var sprite = state.metrics[0];
            if (!sprite) {
                return;
            }
            if (state.orientation === 'horizontal') {
                state.frames = sprite.sampledWidth;
            }
            else {
                state.frames = sprite.sampledHeight;
            }
            var scale = 1;
            if (state.orientation === 'horizontal') {
                scale = innerHeight(state.target) / sprite.sampledHeight;
            }
            else {
                scale = innerWidth(state.target) / sprite.sampledWidth;
            }
            var width = Math.floor(sprite.sampledWidth) * scale;
            var height = Math.floor(sprite.sampledHeight) * scale;
            css(state.stage, {
                'background-image': "url(" + state.source[sprite.id] + ")",
                'background-repeat': 'repeat-both',
                '-webkit-background-size': width + "px " + height + "px",
                '-moz-background-size': width + "px " + height + "px",
                '-o-background-size': width + "px " + height + "px",
                'background-size': width + "px " + height + "px"
            });
        }
        function onDraw() {
            var px = state.orientation === 'horizontal' ? 1 : 0;
            var py = px ? 0 : 1;
            var offset = state.frame % state.frames;
            var left = Math.round(px * offset);
            var top = Math.round(py * offset);
            css(state.stage, { 'background-position': left + "px " + top + "px" });
        }
        return {
            name: NAME$1,
            onLoad: onLoad,
            onDraw: onDraw
        };
    });

    var NAME = 'zoom';
    function getState(data) {
        return getPluginState(data, NAME);
    }
    function onInit(e, data) {
        var state = getState(data);
        var options = (getPluginOptions(data, NAME) || {});
        state.source = getOption(options, 'source', data.source);
        state.useWheel = getOption(options, 'wheel', false);
        state.useClick = getOption(options, 'click', true);
        state.pinFrame = getOption(options, 'pinFrame', true);
        state.doubleClickTime = getOption(options, 'clickTime', 500);
        state.stage = state.stage || document.createElement('div');
        state.stage.classList.add('zoom-stage');
        state.destructor = state.destructor || destructor();
        css(state.stage, {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute'
        });
        data.target.appendChild(state.stage);
        if (!state.active) {
            hide(state.stage);
        }
    }
    function onDestroy(e, state) {
        var zoom = getState(state);
        if (zoom.active) {
            hideZoom(state);
        }
        if (zoom.stage) {
            zoom.stage.remove();
            delete zoom.stage;
        }
    }
    function updateInput(e, data) {
        var zoom = getState(data);
        if (!zoom.active) {
            return;
        }
        var w = innerWidth(zoom.stage);
        var h = innerHeight(zoom.stage);
        if (!w || !h) {
            return;
        }
        e.preventDefault();
        // grab touch/cursor position
        var cursor = getCursorPosition(e);
        // normalize cursor position into [0:1] range
        var x = cursor.x / w;
        var y = cursor.y / h;
        if (zoom.oldX == null) {
            zoom.oldX = x;
            zoom.oldY = y;
        }
        if (zoom.currentX == null) {
            zoom.currentX = x;
            zoom.currentY = y;
        }
        // calculate move delta since last frame and remember current position
        var dx = x - zoom.oldX;
        var dy = y - zoom.oldY;
        zoom.oldX = x;
        zoom.oldY = y;
        // invert drag direction for touch events to enable 'natural' scrolling
        if (e.type.match(/touch/)) {
            dx = -dx;
            dy = -dy;
        }
        // accumulate display coordinates
        zoom.currentX = clamp(zoom.currentX + dx, 0, 1);
        zoom.currentY = clamp(zoom.currentY + dy, 0, 1);
        updateFrame(data, data.frame, data.lane);
    }
    function onClick(e, data) {
        var zoom = getState(data);
        if (!zoom.useClick) {
            return;
        }
        e.preventDefault();
        // simulate double click
        var clickTime = new Date().getTime();
        if (!zoom.clickTime) {
            // on first click
            zoom.clickTime = clickTime;
            return;
        }
        // on second click
        var timeDelta = clickTime - zoom.clickTime;
        if (timeDelta > zoom.doubleClickTime) {
            // took too long, back to first click
            zoom.clickTime = clickTime;
            return;
        }
        // on valid double click
        zoom.clickTime = undefined;
        if (toggleZoom(data)) {
            updateInput(e, data);
        }
    }
    function onMove(e, data) {
        var zoom = getState(data);
        if (zoom.active) {
            updateInput(e, data);
        }
    }
    function onDraw(e, data) {
        var zoom = getState(data);
        // calculate the frame index
        var index = data.lane * data.frames + data.frame;
        // get the zoom image. Use original frames as fallback. This won't work for sprite sheets
        var source = zoom.source[index];
        var spec = findSpecs(data.metrics, data.frames, data.frame, data.lane);
        // get display position
        var x = zoom.currentX;
        var y = zoom.currentY;
        // fallback to centered position
        if (x == null) {
            x = zoom.currentX = 0.5;
            y = zoom.currentY = 0.5;
        }
        if (source) {
            // scale up from [0:1] to [0:100] range
            x = Math.floor(x * 100);
            y = Math.floor(y * 100);
            // update background image and position
            css(zoom.stage, {
                'background-repeat': 'no-repeat',
                'background-image': "url('" + source + "')",
                'background-position': x + "% " + y + "%"
            });
        }
        else if (spec.sheet && spec.sprite) {
            var sprite = spec.sprite;
            var sheet = spec.sheet;
            var src = data.source[sheet.id];
            var left = -Math.floor(sprite.sampledX + x * (sprite.sampledWidth - data.width));
            var top_1 = -Math.floor(sprite.sampledY + y * (sprite.sampledHeight - data.height));
            var width = sheet.sampledWidth;
            var height = sheet.sampledHeight;
            css(zoom.stage, {
                'background-image': "url('" + src + "')",
                'background-position': left + "px " + top_1 + "px",
                'background-repeat': 'no-repeat',
                '-webkit-background-size': width + "px " + height + "px",
                '-moz-background-size': width + "px " + height + "px",
                '-o-background-size': width + "px " + height + "px",
                'background-size': width + "px " + height + "px"
            });
        }
    }
    function toggleZoom(data) {
        var zoom = getState(data);
        if (!zoom.stage) {
            throw new Error('zoom module is not initialized or is not available.');
        }
        zoom.active = !zoom.active;
        if (zoom.active) {
            showZoom(data);
        }
        else {
            hideZoom(data);
        }
        return zoom.active;
    }
    function showZoom(state) {
        var zoom = getState(state);
        zoom.active = true;
        fadeOut(zoom.stage);
        state.isHalted = !!zoom.pinFrame;
        fadeIn(state.stage);
        zoom.destructor.addEventListener(document, 'mousemove', function (e) { return onMove(e, state); });
    }
    function hideZoom(state) {
        var zoom = getState(state);
        zoom.active = false;
        fadeIn(zoom.stage);
        state.isHalted = false;
        fadeOut(state.stage);
        zoom.destructor();
    }
    function wheel(e, state) {
        var zoom = getState(state);
        if (state.isLoading || !zoom.useWheel) {
            return;
        }
        var signY = e.deltaY === 0 ? 0 : e.deltaY > 0 ? 1 : -1;
        if (typeof zoom.useWheel === 'number') {
            signY *= zoom.useWheel;
        }
        if (!zoom.active && signY > 0) {
            // e.preventDefault()
            showZoom(state);
        }
        if (zoom.active && signY < 0) {
            // e.preventDefault()
            hideZoom(state);
        }
    }
    registerPlugin(NAME, function () {
        return {
            name: NAME,
            mousedown: onClick,
            touchstart: onClick,
            mousemove: onMove,
            touchmove: onMove,
            wheel: wheel,
            onInit: onInit,
            onDestroy: onDestroy,
            onDraw: onDraw
        };
    });
    extend({
        toggleZoom: function () { toggleZoom(this.state); }
    });

    exports.Instance = Instance;
    exports.Utils = index;
    exports.VERSION = VERSION;
    exports.create = create;
    exports.createOrUpdate = createOrUpdate;
    exports.defaults = defaults;
    exports.destroy = destroy;
    exports.eventNames = eventNames;
    exports.extend = extend;
    exports.find = find;
    exports.getInputState = getInputState;
    exports.getPlaybackState = getPlaybackState;
    exports.getPluginInstance = getPluginInstance;
    exports.getPluginOptions = getPluginOptions;
    exports.getPluginState = getPluginState;
    exports.getState = getState$4;
    exports.lifecycleNames = lifecycleNames;
    exports.namespace = namespace;
    exports.registerPlugin = registerPlugin;
    exports.resetInput = resetInput;
    exports.source = sourceArray;
    exports.spritespin = spritespin;
    exports.startAnimation = startAnimation;
    exports.stopAnimation = stopAnimation;
    exports.update = update;
    exports.updateFrame = updateFrame;
    exports.updateInput = updateInput$1;
    exports.useLayout = useLayout;
    exports.usePlayback = usePlayback;
    exports.usePlugins = usePlugins;
    exports.useStage = useStage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=spritespin.js.map