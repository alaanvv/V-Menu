
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_style(node, key, value, important) {
    if (value == null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs#run-time-svelte-onmount
 */
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
/**
 * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
 */
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}

const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    // Do not reenter flush while dirty components are updated, as this can
    // result in an infinite loop. Instead, let the inner flush handle it.
    // Reentrancy is ok afterwards for bindings etc.
    if (flushidx !== 0) {
        return;
    }
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        try {
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
        }
        catch (e) {
            // reset dirty state to not end up in a deadlocked state and then rethrow
            dirty_components.length = 0;
            flushidx = 0;
            throw e;
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 */
function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
            // if the component was destroyed immediately
            // it will update the `$$.on_destroy` reference to `null`.
            // the destructured on_destroy may still reference to the old array
            if (component.$$.on_destroy) {
                component.$$.on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        flush_render_callbacks($$.after_update);
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: [],
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        if (!is_function(callback)) {
            return noop;
        }
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    if (has_stop_immediate_propagation)
        modifiers.push('stopImmediatePropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.data === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

/* web/components/Icon.svelte generated by Svelte v3.59.2 */
const file$b = "web/components/Icon.svelte";

function create_fragment$c(ctx) {
	let span;
	let t;
	let span_class_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			span = element("span");
			t = text(/*i*/ ctx[0]);
			attr_dev(span, "class", span_class_value = "" + (/*clazz*/ ctx[1] + " material-symbols-outlined"));
			add_location(span, file$b, 1, 0, 57);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);

			if (!mounted) {
				dispose = listen_dev(span, "click", /*click_handler*/ ctx[3], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*i*/ 1) set_data_dev(t, /*i*/ ctx[0]);

			if (dirty & /*clazz*/ 2 && span_class_value !== (span_class_value = "" + (/*clazz*/ ctx[1] + " material-symbols-outlined"))) {
				attr_dev(span, "class", span_class_value);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$c($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Icon', slots, []);
	const dispatch = createEventDispatcher();
	let { i } = $$props;
	let { class: clazz = '' } = $$props;

	$$self.$$.on_mount.push(function () {
		if (i === undefined && !('i' in $$props || $$self.$$.bound[$$self.$$.props['i']])) {
			console.warn("<Icon> was created without expected prop 'i'");
		}
	});

	const writable_props = ['i', 'class'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Icon> was created with unknown prop '${key}'`);
	});

	const click_handler = _ => dispatch('click');

	$$self.$$set = $$props => {
		if ('i' in $$props) $$invalidate(0, i = $$props.i);
		if ('class' in $$props) $$invalidate(1, clazz = $$props.class);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		dispatch,
		i,
		clazz
	});

	$$self.$inject_state = $$props => {
		if ('i' in $$props) $$invalidate(0, i = $$props.i);
		if ('clazz' in $$props) $$invalidate(1, clazz = $$props.clazz);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [i, clazz, dispatch, click_handler];
}

class Icon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$c, create_fragment$c, safe_not_equal, { i: 0, class: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Icon",
			options,
			id: create_fragment$c.name
		});
	}

	get i() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set i(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=} start
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0 && stop) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const curr_page = writable();
const menu      = writable();

/* web/components/TopBarItem.svelte generated by Svelte v3.59.2 */
const file$a = "web/components/TopBarItem.svelte";

function create_fragment$b(ctx) {
	let li;
	let icon;
	let t0;
	let t1;
	let current;
	let mounted;
	let dispose;

	icon = new Icon({
			props: { i: /*i*/ ctx[2] },
			$$inline: true
		});

	const block = {
		c: function create() {
			li = element("li");
			create_component(icon.$$.fragment);
			t0 = space();
			t1 = text(/*name*/ ctx[1]);
			attr_dev(li, "class", "row");
			toggle_class(li, "active", /*$curr_page*/ ctx[3] == /*page*/ ctx[0]);
			add_location(li, file$a, 1, 0, 57);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			mount_component(icon, li, null);
			append_dev(li, t0);
			append_dev(li, t1);
			current = true;

			if (!mounted) {
				dispose = listen_dev(li, "click", /*enter*/ ctx[4], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			const icon_changes = {};
			if (dirty & /*i*/ 4) icon_changes.i = /*i*/ ctx[2];
			icon.$set(icon_changes);
			if (!current || dirty & /*name*/ 2) set_data_dev(t1, /*name*/ ctx[1]);

			if (!current || dirty & /*$curr_page, page*/ 9) {
				toggle_class(li, "active", /*$curr_page*/ ctx[3] == /*page*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(icon);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$b($$self, $$props, $$invalidate) {
	let $curr_page;
	validate_store(curr_page, 'curr_page');
	component_subscribe($$self, curr_page, $$value => $$invalidate(3, $curr_page = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TopBarItem', slots, []);
	let { page, name, i } = $$props;

	function enter() {
		curr_page.set(page);
	}

	$$self.$$.on_mount.push(function () {
		if (page === undefined && !('page' in $$props || $$self.$$.bound[$$self.$$.props['page']])) {
			console.warn("<TopBarItem> was created without expected prop 'page'");
		}

		if (name === undefined && !('name' in $$props || $$self.$$.bound[$$self.$$.props['name']])) {
			console.warn("<TopBarItem> was created without expected prop 'name'");
		}

		if (i === undefined && !('i' in $$props || $$self.$$.bound[$$self.$$.props['i']])) {
			console.warn("<TopBarItem> was created without expected prop 'i'");
		}
	});

	const writable_props = ['page', 'name', 'i'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TopBarItem> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('page' in $$props) $$invalidate(0, page = $$props.page);
		if ('name' in $$props) $$invalidate(1, name = $$props.name);
		if ('i' in $$props) $$invalidate(2, i = $$props.i);
	};

	$$self.$capture_state = () => ({
		Icon,
		curr_page,
		page,
		name,
		i,
		enter,
		$curr_page
	});

	$$self.$inject_state = $$props => {
		if ('page' in $$props) $$invalidate(0, page = $$props.page);
		if ('name' in $$props) $$invalidate(1, name = $$props.name);
		if ('i' in $$props) $$invalidate(2, i = $$props.i);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [page, name, i, $curr_page, enter];
}

class TopBarItem extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$b, create_fragment$b, safe_not_equal, { page: 0, name: 1, i: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TopBarItem",
			options,
			id: create_fragment$b.name
		});
	}

	get page() {
		throw new Error("<TopBarItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set page(value) {
		throw new Error("<TopBarItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get name() {
		throw new Error("<TopBarItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<TopBarItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get i() {
		throw new Error("<TopBarItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set i(value) {
		throw new Error("<TopBarItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/components/TopBar.svelte generated by Svelte v3.59.2 */
const file$9 = "web/components/TopBar.svelte";

function create_fragment$a(ctx) {
	let div;
	let ul;
	let topbaritem0;
	let t;
	let topbaritem1;
	let current;

	topbaritem0 = new TopBarItem({
			props: {
				page: "menu",
				name: "Cardápio",
				i: "restaurant_menu"
			},
			$$inline: true
		});

	topbaritem1 = new TopBarItem({
			props: {
				page: "items",
				name: "Produtos",
				i: "lunch_dining"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			ul = element("ul");
			create_component(topbaritem0.$$.fragment);
			t = space();
			create_component(topbaritem1.$$.fragment);
			attr_dev(ul, "class", "row svelte-1bwpcvq");
			add_location(ul, file$9, 1, 2, 31);
			attr_dev(div, "class", "usn tac topbar svelte-1bwpcvq");
			add_location(div, file$9, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, ul);
			mount_component(topbaritem0, ul, null);
			append_dev(ul, t);
			mount_component(topbaritem1, ul, null);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(topbaritem0.$$.fragment, local);
			transition_in(topbaritem1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(topbaritem0.$$.fragment, local);
			transition_out(topbaritem1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(topbaritem0);
			destroy_component(topbaritem1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TopBar', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TopBar> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ TopBarItem });
	return [];
}

class TopBar extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TopBar",
			options,
			id: create_fragment$a.name
		});
	}
}

/* web/components/Modal.svelte generated by Svelte v3.59.2 */
const file$8 = "web/components/Modal.svelte";

function create_fragment$9(ctx) {
	let div1;
	let div0;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			if (default_slot) default_slot.c();
			attr_dev(div0, "class", "modal-content svelte-1agyxdy");
			add_location(div0, file$8, 2, 2, 107);
			attr_dev(div1, "class", "modal svelte-1agyxdy");
			add_location(div1, file$8, 1, 0, 57);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);

			if (default_slot) {
				default_slot.m(div0, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen_dev(div1, "click", /*background_click*/ ctx[0], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Modal', slots, ['default']);
	const dispatch = createEventDispatcher();
	let { show } = $$props;

	function close() {
		dispatch('close');
		$$invalidate(1, show = false);
	}

	function background_click(e) {
		if (e.target.classList.contains('modal')) close();
	}

	onMount(_ => {
		function on_keydown(e) {
			if (e.key == 'Escape') close();
		}

		window.addEventListener('keydown', on_keydown);

		return _ => {
			window.removeEventListener('keydown', on_keydown);
		};
	});

	$$self.$$.on_mount.push(function () {
		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<Modal> was created without expected prop 'show'");
		}
	});

	const writable_props = ['show'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(1, show = $$props.show);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		onMount,
		createEventDispatcher,
		dispatch,
		show,
		close,
		background_click
	});

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(1, show = $$props.show);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [background_click, show, $$scope, slots];
}

class Modal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$9, create_fragment$9, safe_not_equal, { show: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Modal",
			options,
			id: create_fragment$9.name
		});
	}

	get show() {
		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

async function api(route, method, body) {
  const options = { headers: {}, method: method || 'GET' };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${window.location.origin}/${route}`, options);
  let data;

  if (res.headers?.get('content-type')?.includes('application/json'))
    data = await res.json();

  return { res, data }
}

/* web/components/CategoryModal.svelte generated by Svelte v3.59.2 */
const file$7 = "web/components/CategoryModal.svelte";

// (1:0) {#if show}
function create_if_block$4(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				$$slots: { default: [create_default_slot$2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	modal.$on("close", /*close*/ ctx[4]);

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const modal_changes = {};

			if (dirty & /*$$scope, l_submitting, form, id*/ 526) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(1:0) {#if show}",
		ctx
	});

	return block;
}

// (2:2) <Modal on:close={close}>
function create_default_slot$2(ctx) {
	let h2;
	let t0_value = (/*id*/ ctx[1] ? 'Editando' : 'Criando') + "";
	let t0;
	let t1;
	let t2;
	let form_1;
	let label;
	let t3;
	let input;
	let t4;
	let button;
	let t5_value = (/*l_submitting*/ ctx[2] ? '...' : 'Enviar') + "";
	let t5;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = text(" uma Categoria");
			t2 = space();
			form_1 = element("form");
			label = element("label");
			t3 = text("Nome: ");
			input = element("input");
			t4 = space();
			button = element("button");
			t5 = text(t5_value);
			add_location(h2, file$7, 2, 4, 42);
			input.required = true;
			add_location(input, file$7, 5, 20, 129);
			attr_dev(label, "class", "svelte-1mya8io");
			add_location(label, file$7, 5, 6, 115);
			button.disabled = /*l_submitting*/ ctx[2];
			add_location(button, file$7, 7, 6, 187);
			add_location(form_1, file$7, 4, 4, 102);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			append_dev(h2, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, form_1, anchor);
			append_dev(form_1, label);
			append_dev(label, t3);
			append_dev(label, input);
			set_input_value(input, /*form*/ ctx[3].name);
			append_dev(form_1, t4);
			append_dev(form_1, button);
			append_dev(button, t5);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[6]),
					listen_dev(button, "click", /*submit*/ ctx[5], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*id*/ 2 && t0_value !== (t0_value = (/*id*/ ctx[1] ? 'Editando' : 'Criando') + "")) set_data_dev(t0, t0_value);

			if (dirty & /*form*/ 8 && input.value !== /*form*/ ctx[3].name) {
				set_input_value(input, /*form*/ ctx[3].name);
			}

			if (dirty & /*l_submitting*/ 4 && t5_value !== (t5_value = (/*l_submitting*/ ctx[2] ? '...' : 'Enviar') + "")) set_data_dev(t5, t5_value);

			if (dirty & /*l_submitting*/ 4) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[2]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(form_1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$2.name,
		type: "slot",
		source: "(2:2) <Modal on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$8(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block$4(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*show*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*show*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$4(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$8($$self, $$props, $$invalidate) {
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(7, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CategoryModal', slots, []);
	let { show, id } = $$props;
	let l_submitting;
	let form = {};

	function close() {
		$$invalidate(0, show = false);
	}

	async function submit() {
		$$invalidate(2, l_submitting = true);

		if (id) {
			await api(`category/${id}`, 'PUT', form);

			menu.set({
				...$menu,
				categories: $menu.categories.map(c => c.id == id ? { ...c, ...form } : c)
			});

			close();
		} else {
			const { data } = await api(`category/${$menu.id}`, 'POST', form);

			menu.set({
				...$menu,
				categories: [...$menu.categories, data.category]
			});

			close();
		}
	}

	function mount() {
		$$invalidate(2, l_submitting = false);
		$$invalidate(3, form = {});
		if (id) $$invalidate(3, form.name = $menu.categories.find(c => c.id == id)?.name, form);
	}

	$$self.$$.on_mount.push(function () {
		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<CategoryModal> was created without expected prop 'show'");
		}

		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
			console.warn("<CategoryModal> was created without expected prop 'id'");
		}
	});

	const writable_props = ['show', 'id'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CategoryModal> was created with unknown prop '${key}'`);
	});

	function input_input_handler() {
		form.name = this.value;
		$$invalidate(3, form);
	}

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('id' in $$props) $$invalidate(1, id = $$props.id);
	};

	$$self.$capture_state = () => ({
		Modal,
		api,
		menu,
		show,
		id,
		l_submitting,
		form,
		close,
		submit,
		mount,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('id' in $$props) $$invalidate(1, id = $$props.id);
		if ('l_submitting' in $$props) $$invalidate(2, l_submitting = $$props.l_submitting);
		if ('form' in $$props) $$invalidate(3, form = $$props.form);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*show*/ 1) {
			if (show) mount();
		}
	};

	return [show, id, l_submitting, form, close, submit, input_input_handler];
}

class CategoryModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$8, create_fragment$8, safe_not_equal, { show: 0, id: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CategoryModal",
			options,
			id: create_fragment$8.name
		});
	}

	get show() {
		throw new Error("<CategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<CategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<CategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<CategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/components/SubcategoryModal.svelte generated by Svelte v3.59.2 */
const file$6 = "web/components/SubcategoryModal.svelte";

// (1:0) {#if show}
function create_if_block$3(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				$$slots: { default: [create_default_slot$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	modal.$on("close", /*close*/ ctx[4]);

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const modal_changes = {};

			if (dirty & /*$$scope, l_submitting, form, id*/ 1038) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(1:0) {#if show}",
		ctx
	});

	return block;
}

// (2:2) <Modal on:close={close}>
function create_default_slot$1(ctx) {
	let h2;
	let t0_value = (/*id*/ ctx[1] ? 'Editando' : 'Criando') + "";
	let t0;
	let t1;
	let t2;
	let form_1;
	let label;
	let t3;
	let input;
	let t4;
	let button;
	let t5_value = (/*l_submitting*/ ctx[2] ? '...' : 'Enviar') + "";
	let t5;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = text(" uma Subcategoria");
			t2 = space();
			form_1 = element("form");
			label = element("label");
			t3 = text("Nome: ");
			input = element("input");
			t4 = space();
			button = element("button");
			t5 = text(t5_value);
			add_location(h2, file$6, 2, 4, 42);
			input.required = true;
			add_location(input, file$6, 5, 20, 132);
			attr_dev(label, "class", "svelte-1mya8io");
			add_location(label, file$6, 5, 6, 118);
			button.disabled = /*l_submitting*/ ctx[2];
			add_location(button, file$6, 7, 6, 190);
			add_location(form_1, file$6, 4, 4, 105);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			append_dev(h2, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, form_1, anchor);
			append_dev(form_1, label);
			append_dev(label, t3);
			append_dev(label, input);
			set_input_value(input, /*form*/ ctx[3].name);
			append_dev(form_1, t4);
			append_dev(form_1, button);
			append_dev(button, t5);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[7]),
					listen_dev(button, "click", /*submit*/ ctx[5], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*id*/ 2 && t0_value !== (t0_value = (/*id*/ ctx[1] ? 'Editando' : 'Criando') + "")) set_data_dev(t0, t0_value);

			if (dirty & /*form*/ 8 && input.value !== /*form*/ ctx[3].name) {
				set_input_value(input, /*form*/ ctx[3].name);
			}

			if (dirty & /*l_submitting*/ 4 && t5_value !== (t5_value = (/*l_submitting*/ ctx[2] ? '...' : 'Enviar') + "")) set_data_dev(t5, t5_value);

			if (dirty & /*l_submitting*/ 4) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[2]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(form_1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$1.name,
		type: "slot",
		source: "(2:2) <Modal on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$7(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block$3(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*show*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*show*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$3(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props, $$invalidate) {
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(8, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('SubcategoryModal', slots, []);
	let { show, id, category_id } = $$props;
	let l_submitting;
	let form = {};

	function close() {
		$$invalidate(0, show = false);
	}

	async function submit() {
		$$invalidate(2, l_submitting = true);

		if (id) {
			await api(`subcategory/${id}`, 'PUT', form);
			const new_menu = $menu;
			for (let i in new_menu.categories) if (new_menu.categories[i].id == category_id) new_menu.categories[i].subcategories = new_menu.categories[i].subcategories.map(sc => sc.id != id ? sc : { ...sc, ...form });
			menu.set(new_menu);
			close();
		} else {
			const { data } = await api(`subcategory/${category_id}`, 'POST', form);

			menu.set({
				...$menu,
				categories: $menu.categories.map(c => c.id != category_id
				? c
				: {
						...c,
						subcategories: [...c.subcategories || [], data.subcategory]
					})
			});

			close();
		}
	}

	function mount() {
		$$invalidate(2, l_submitting = false);
		$$invalidate(3, form = {});
		if (id) $$invalidate(3, form.name = $menu.categories.find(c => c.id == category_id)?.subcategories.find(sc => sc.id == id)?.name, form);
	}

	$$self.$$.on_mount.push(function () {
		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<SubcategoryModal> was created without expected prop 'show'");
		}

		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
			console.warn("<SubcategoryModal> was created without expected prop 'id'");
		}

		if (category_id === undefined && !('category_id' in $$props || $$self.$$.bound[$$self.$$.props['category_id']])) {
			console.warn("<SubcategoryModal> was created without expected prop 'category_id'");
		}
	});

	const writable_props = ['show', 'id', 'category_id'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SubcategoryModal> was created with unknown prop '${key}'`);
	});

	function input_input_handler() {
		form.name = this.value;
		$$invalidate(3, form);
	}

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('id' in $$props) $$invalidate(1, id = $$props.id);
		if ('category_id' in $$props) $$invalidate(6, category_id = $$props.category_id);
	};

	$$self.$capture_state = () => ({
		Modal,
		api,
		menu,
		show,
		id,
		category_id,
		l_submitting,
		form,
		close,
		submit,
		mount,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('id' in $$props) $$invalidate(1, id = $$props.id);
		if ('category_id' in $$props) $$invalidate(6, category_id = $$props.category_id);
		if ('l_submitting' in $$props) $$invalidate(2, l_submitting = $$props.l_submitting);
		if ('form' in $$props) $$invalidate(3, form = $$props.form);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*show*/ 1) {
			if (show) mount();
		}
	};

	return [show, id, l_submitting, form, close, submit, category_id, input_input_handler];
}

class SubcategoryModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$7, create_fragment$7, safe_not_equal, { show: 0, id: 1, category_id: 6 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SubcategoryModal",
			options,
			id: create_fragment$7.name
		});
	}

	get show() {
		throw new Error("<SubcategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<SubcategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<SubcategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<SubcategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get category_id() {
		throw new Error("<SubcategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set category_id(value) {
		throw new Error("<SubcategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/components/Button.svelte generated by Svelte v3.59.2 */
const file$5 = "web/components/Button.svelte";

// (2:2) {#if i}
function create_if_block_1$1(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: { i: /*i*/ ctx[0] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*i*/ 1) icon_changes.i = /*i*/ ctx[0];
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(2:2) {#if i}",
		ctx
	});

	return block;
}

// (3:2) {#if t}
function create_if_block$2(ctx) {
	let t_1;

	const block = {
		c: function create() {
			t_1 = text(/*t*/ ctx[1]);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t_1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*t*/ 2) set_data_dev(t_1, /*t*/ ctx[1]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(3:2) {#if t}",
		ctx
	});

	return block;
}

function create_fragment$6(ctx) {
	let button;
	let t_1;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*i*/ ctx[0] && create_if_block_1$1(ctx);
	let if_block1 = /*t*/ ctx[1] && create_if_block$2(ctx);

	const block = {
		c: function create() {
			button = element("button");
			if (if_block0) if_block0.c();
			t_1 = space();
			if (if_block1) if_block1.c();
			attr_dev(button, "class", /*clazz*/ ctx[4]);
			button.disabled = /*disabled*/ ctx[3];
			toggle_class(button, "row", /*i*/ ctx[0] && /*t*/ ctx[1]);
			add_location(button, file$5, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			if (if_block0) if_block0.m(button, null);
			append_dev(button, t_1);
			if (if_block1) if_block1.m(button, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(
					button,
					"click",
					function () {
						if (is_function(/*action*/ ctx[2])) /*action*/ ctx[2].apply(this, arguments);
					},
					false,
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (/*i*/ ctx[0]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*i*/ 1) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1$1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(button, t_1);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*t*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$2(ctx);
					if_block1.c();
					if_block1.m(button, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!current || dirty & /*clazz*/ 16) {
				attr_dev(button, "class", /*clazz*/ ctx[4]);
			}

			if (!current || dirty & /*disabled*/ 8) {
				prop_dev(button, "disabled", /*disabled*/ ctx[3]);
			}

			if (!current || dirty & /*clazz, i, t*/ 19) {
				toggle_class(button, "row", /*i*/ ctx[0] && /*t*/ ctx[1]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$6($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Button', slots, []);
	let { i, t, action, disabled } = $$props;
	let { class: clazz = '' } = $$props;

	$$self.$$.on_mount.push(function () {
		if (i === undefined && !('i' in $$props || $$self.$$.bound[$$self.$$.props['i']])) {
			console.warn("<Button> was created without expected prop 'i'");
		}

		if (t === undefined && !('t' in $$props || $$self.$$.bound[$$self.$$.props['t']])) {
			console.warn("<Button> was created without expected prop 't'");
		}

		if (action === undefined && !('action' in $$props || $$self.$$.bound[$$self.$$.props['action']])) {
			console.warn("<Button> was created without expected prop 'action'");
		}

		if (disabled === undefined && !('disabled' in $$props || $$self.$$.bound[$$self.$$.props['disabled']])) {
			console.warn("<Button> was created without expected prop 'disabled'");
		}
	});

	const writable_props = ['i', 't', 'action', 'disabled', 'class'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('i' in $$props) $$invalidate(0, i = $$props.i);
		if ('t' in $$props) $$invalidate(1, t = $$props.t);
		if ('action' in $$props) $$invalidate(2, action = $$props.action);
		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
		if ('class' in $$props) $$invalidate(4, clazz = $$props.class);
	};

	$$self.$capture_state = () => ({ Icon, i, t, action, disabled, clazz });

	$$self.$inject_state = $$props => {
		if ('i' in $$props) $$invalidate(0, i = $$props.i);
		if ('t' in $$props) $$invalidate(1, t = $$props.t);
		if ('action' in $$props) $$invalidate(2, action = $$props.action);
		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
		if ('clazz' in $$props) $$invalidate(4, clazz = $$props.clazz);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [i, t, action, disabled, clazz];
}

class Button extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
			i: 0,
			t: 1,
			action: 2,
			disabled: 3,
			class: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Button",
			options,
			id: create_fragment$6.name
		});
	}

	get i() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set i(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get t() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set t(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get action() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set action(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/components/SubcategoryCard.svelte generated by Svelte v3.59.2 */
const file$4 = "web/components/SubcategoryCard.svelte";

function create_fragment$5(ctx) {
	let li;
	let t0_value = /*subcategory*/ ctx[0].name + "";
	let t0;
	let t1;
	let div;
	let t2;
	let button0;
	let t3;
	let button1;
	let t4;
	let button2;
	let t5;
	let button3;
	let t6;
	let subcategorymodal;
	let updating_show;
	let current;

	button0 = new Button({
			props: {
				class: "blu",
				i: "edit",
				action: /*edit_subcategory*/ ctx[2]
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				class: "red",
				i: "delete",
				action: /*delete_subcategory*/ ctx[3]
			},
			$$inline: true
		});

	button2 = new Button({
			props: { i: "keyboard_arrow_down" },
			$$inline: true
		});

	button3 = new Button({
			props: { i: "keyboard_arrow_up" },
			$$inline: true
		});

	function subcategorymodal_show_binding(value) {
		/*subcategorymodal_show_binding*/ ctx[4](value);
	}

	let subcategorymodal_props = {
		id: /*subcategory*/ ctx[0].id,
		category_id: /*subcategory*/ ctx[0].category_id
	};

	if (/*m_edit*/ ctx[1] !== void 0) {
		subcategorymodal_props.show = /*m_edit*/ ctx[1];
	}

	subcategorymodal = new SubcategoryModal({
			props: subcategorymodal_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind(subcategorymodal, 'show', subcategorymodal_show_binding));

	const block = {
		c: function create() {
			li = element("li");
			t0 = text(t0_value);
			t1 = space();
			div = element("div");
			t2 = space();
			create_component(button0.$$.fragment);
			t3 = space();
			create_component(button1.$$.fragment);
			t4 = space();
			create_component(button2.$$.fragment);
			t5 = space();
			create_component(button3.$$.fragment);
			t6 = space();
			create_component(subcategorymodal.$$.fragment);
			set_style(div, "margin-left", "auto");
			add_location(div, file$4, 3, 2, 41);
			attr_dev(li, "class", "row svelte-ggjrjg");
			add_location(li, file$4, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, t0);
			append_dev(li, t1);
			append_dev(li, div);
			append_dev(li, t2);
			mount_component(button0, li, null);
			append_dev(li, t3);
			mount_component(button1, li, null);
			append_dev(li, t4);
			mount_component(button2, li, null);
			append_dev(li, t5);
			mount_component(button3, li, null);
			insert_dev(target, t6, anchor);
			mount_component(subcategorymodal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*subcategory*/ 1) && t0_value !== (t0_value = /*subcategory*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
			const subcategorymodal_changes = {};
			if (dirty & /*subcategory*/ 1) subcategorymodal_changes.id = /*subcategory*/ ctx[0].id;
			if (dirty & /*subcategory*/ 1) subcategorymodal_changes.category_id = /*subcategory*/ ctx[0].category_id;

			if (!updating_show && dirty & /*m_edit*/ 2) {
				updating_show = true;
				subcategorymodal_changes.show = /*m_edit*/ ctx[1];
				add_flush_callback(() => updating_show = false);
			}

			subcategorymodal.$set(subcategorymodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(button2.$$.fragment, local);
			transition_in(button3.$$.fragment, local);
			transition_in(subcategorymodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(button2.$$.fragment, local);
			transition_out(button3.$$.fragment, local);
			transition_out(subcategorymodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(button0);
			destroy_component(button1);
			destroy_component(button2);
			destroy_component(button3);
			if (detaching) detach_dev(t6);
			destroy_component(subcategorymodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props, $$invalidate) {
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(5, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('SubcategoryCard', slots, []);
	let { subcategory } = $$props;
	let m_edit;

	function edit_subcategory() {
		$$invalidate(1, m_edit = 1);
	}

	function delete_subcategory() {
		if (!confirm('Certeza que quer excluir essa subcategoria?')) return;
		api(`subcategory/${subcategory.id}`, 'DELETE');
		const new_menu = $menu;
		for (let i in new_menu.categories) if (new_menu.categories[i].id == subcategory.category_id) new_menu.categories[i].subcategories = new_menu.categories[i].subcategories.filter(sc => sc.id != subcategory.id);
		menu.set(new_menu);
	}

	$$self.$$.on_mount.push(function () {
		if (subcategory === undefined && !('subcategory' in $$props || $$self.$$.bound[$$self.$$.props['subcategory']])) {
			console.warn("<SubcategoryCard> was created without expected prop 'subcategory'");
		}
	});

	const writable_props = ['subcategory'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SubcategoryCard> was created with unknown prop '${key}'`);
	});

	function subcategorymodal_show_binding(value) {
		m_edit = value;
		$$invalidate(1, m_edit);
	}

	$$self.$$set = $$props => {
		if ('subcategory' in $$props) $$invalidate(0, subcategory = $$props.subcategory);
	};

	$$self.$capture_state = () => ({
		SubcategoryModal,
		Button,
		api,
		menu,
		subcategory,
		m_edit,
		edit_subcategory,
		delete_subcategory,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('subcategory' in $$props) $$invalidate(0, subcategory = $$props.subcategory);
		if ('m_edit' in $$props) $$invalidate(1, m_edit = $$props.m_edit);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		subcategory,
		m_edit,
		edit_subcategory,
		delete_subcategory,
		subcategorymodal_show_binding
	];
}

class SubcategoryCard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$5, create_fragment$5, safe_not_equal, { subcategory: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SubcategoryCard",
			options,
			id: create_fragment$5.name
		});
	}

	get subcategory() {
		throw new Error("<SubcategoryCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set subcategory(value) {
		throw new Error("<SubcategoryCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/components/CategoryCard.svelte generated by Svelte v3.59.2 */
const file$3 = "web/components/CategoryCard.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	return child_ctx;
}

// (15:4) {#each category.subcategories || [] as subcategory}
function create_each_block$1(ctx) {
	let subcategorycard;
	let current;

	subcategorycard = new SubcategoryCard({
			props: { subcategory: /*subcategory*/ ctx[10] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(subcategorycard.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(subcategorycard, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const subcategorycard_changes = {};
			if (dirty & /*category*/ 1) subcategorycard_changes.subcategory = /*subcategory*/ ctx[10];
			subcategorycard.$set(subcategorycard_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(subcategorycard.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(subcategorycard.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(subcategorycard, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(15:4) {#each category.subcategories || [] as subcategory}",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let div2;
	let div1;
	let h2;
	let t0_value = /*category*/ ctx[0].name + "";
	let t0;
	let t1;
	let div0;
	let button0;
	let t2;
	let button1;
	let t3;
	let button2;
	let t4;
	let button3;
	let t5;
	let button4;
	let t6;
	let ul;
	let t7;
	let categorymodal;
	let updating_show;
	let t8;
	let subcategorymodal;
	let updating_show_1;
	let current;

	button0 = new Button({
			props: {
				class: "grn",
				i: "add",
				t: "Subcategoria",
				action: /*create_sub*/ ctx[3]
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				class: "blu",
				i: "edit",
				action: /*edit*/ ctx[4]
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				class: "red",
				i: "delete",
				action: /*_delete*/ ctx[5]
			},
			$$inline: true
		});

	button3 = new Button({
			props: {
				i: "keyboard_arrow_up",
				action: /*move_up*/ ctx[6]
			},
			$$inline: true
		});

	button4 = new Button({
			props: { i: "keyboard_arrow_down" },
			$$inline: true
		});

	let each_value = /*category*/ ctx[0].subcategories || [];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	function categorymodal_show_binding(value) {
		/*categorymodal_show_binding*/ ctx[7](value);
	}

	let categorymodal_props = { id: /*category*/ ctx[0].id };

	if (/*m_edit*/ ctx[1] !== void 0) {
		categorymodal_props.show = /*m_edit*/ ctx[1];
	}

	categorymodal = new CategoryModal({
			props: categorymodal_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind(categorymodal, 'show', categorymodal_show_binding));

	function subcategorymodal_show_binding(value) {
		/*subcategorymodal_show_binding*/ ctx[8](value);
	}

	let subcategorymodal_props = { category_id: /*category*/ ctx[0].id };

	if (/*m_subcategory*/ ctx[2] !== void 0) {
		subcategorymodal_props.show = /*m_subcategory*/ ctx[2];
	}

	subcategorymodal = new SubcategoryModal({
			props: subcategorymodal_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind(subcategorymodal, 'show', subcategorymodal_show_binding));

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			div0 = element("div");
			create_component(button0.$$.fragment);
			t2 = space();
			create_component(button1.$$.fragment);
			t3 = space();
			create_component(button2.$$.fragment);
			t4 = space();
			create_component(button3.$$.fragment);
			t5 = space();
			create_component(button4.$$.fragment);
			t6 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t7 = space();
			create_component(categorymodal.$$.fragment);
			t8 = space();
			create_component(subcategorymodal.$$.fragment);
			add_location(h2, file$3, 2, 4, 87);
			attr_dev(div0, "class", "row");
			set_style(div0, "justify-content", "end");
			add_location(div0, file$3, 4, 4, 119);
			attr_dev(div1, "class", "row");
			set_style(div1, "justify-content", "space-between");
			add_location(div1, file$3, 1, 2, 25);
			add_location(ul, file$3, 13, 2, 499);
			attr_dev(div2, "class", "category svelte-4wlb3k");
			add_location(div2, file$3, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, h2);
			append_dev(h2, t0);
			append_dev(div1, t1);
			append_dev(div1, div0);
			mount_component(button0, div0, null);
			append_dev(div0, t2);
			mount_component(button1, div0, null);
			append_dev(div0, t3);
			mount_component(button2, div0, null);
			append_dev(div0, t4);
			mount_component(button3, div0, null);
			append_dev(div0, t5);
			mount_component(button4, div0, null);
			append_dev(div2, t6);
			append_dev(div2, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(ul, null);
				}
			}

			insert_dev(target, t7, anchor);
			mount_component(categorymodal, target, anchor);
			insert_dev(target, t8, anchor);
			mount_component(subcategorymodal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*category*/ 1) && t0_value !== (t0_value = /*category*/ ctx[0].name + "")) set_data_dev(t0, t0_value);

			if (dirty & /*category*/ 1) {
				each_value = /*category*/ ctx[0].subcategories || [];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			const categorymodal_changes = {};
			if (dirty & /*category*/ 1) categorymodal_changes.id = /*category*/ ctx[0].id;

			if (!updating_show && dirty & /*m_edit*/ 2) {
				updating_show = true;
				categorymodal_changes.show = /*m_edit*/ ctx[1];
				add_flush_callback(() => updating_show = false);
			}

			categorymodal.$set(categorymodal_changes);
			const subcategorymodal_changes = {};
			if (dirty & /*category*/ 1) subcategorymodal_changes.category_id = /*category*/ ctx[0].id;

			if (!updating_show_1 && dirty & /*m_subcategory*/ 4) {
				updating_show_1 = true;
				subcategorymodal_changes.show = /*m_subcategory*/ ctx[2];
				add_flush_callback(() => updating_show_1 = false);
			}

			subcategorymodal.$set(subcategorymodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(button2.$$.fragment, local);
			transition_in(button3.$$.fragment, local);
			transition_in(button4.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(categorymodal.$$.fragment, local);
			transition_in(subcategorymodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(button2.$$.fragment, local);
			transition_out(button3.$$.fragment, local);
			transition_out(button4.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(categorymodal.$$.fragment, local);
			transition_out(subcategorymodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_component(button0);
			destroy_component(button1);
			destroy_component(button2);
			destroy_component(button3);
			destroy_component(button4);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t7);
			destroy_component(categorymodal, detaching);
			if (detaching) detach_dev(t8);
			destroy_component(subcategorymodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(9, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CategoryCard', slots, []);
	let { category } = $$props;
	let m_edit, m_subcategory;

	function create_sub() {
		$$invalidate(2, m_subcategory = 1);
	}

	function edit() {
		$$invalidate(1, m_edit = 1);
	}

	function _delete() {
		if (!confirm('Certeza que quer excluir essa categoria?')) return;
		api(`category/${category.id}`, 'DELETE');

		menu.set({
			...$menu,
			categories: $menu.categories.filter(c => c.id != category.id)
		});
	}

	function move_up() {
		api(`raise-category/${category.id}`, 'PUT');
	}

	$$self.$$.on_mount.push(function () {
		if (category === undefined && !('category' in $$props || $$self.$$.bound[$$self.$$.props['category']])) {
			console.warn("<CategoryCard> was created without expected prop 'category'");
		}
	});

	const writable_props = ['category'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CategoryCard> was created with unknown prop '${key}'`);
	});

	function categorymodal_show_binding(value) {
		m_edit = value;
		$$invalidate(1, m_edit);
	}

	function subcategorymodal_show_binding(value) {
		m_subcategory = value;
		$$invalidate(2, m_subcategory);
	}

	$$self.$$set = $$props => {
		if ('category' in $$props) $$invalidate(0, category = $$props.category);
	};

	$$self.$capture_state = () => ({
		SubcategoryModal,
		SubcategoryCard,
		CategoryModal,
		Button,
		api,
		menu,
		category,
		m_edit,
		m_subcategory,
		create_sub,
		edit,
		_delete,
		move_up,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('category' in $$props) $$invalidate(0, category = $$props.category);
		if ('m_edit' in $$props) $$invalidate(1, m_edit = $$props.m_edit);
		if ('m_subcategory' in $$props) $$invalidate(2, m_subcategory = $$props.m_subcategory);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		category,
		m_edit,
		m_subcategory,
		create_sub,
		edit,
		_delete,
		move_up,
		categorymodal_show_binding,
		subcategorymodal_show_binding
	];
}

class CategoryCard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, { category: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CategoryCard",
			options,
			id: create_fragment$4.name
		});
	}

	get category() {
		throw new Error("<CategoryCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set category(value) {
		throw new Error("<CategoryCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/components/MenuModal.svelte generated by Svelte v3.59.2 */
const file$2 = "web/components/MenuModal.svelte";

// (1:0) {#if show}
function create_if_block$1(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	modal.$on("close", /*close*/ ctx[3]);

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const modal_changes = {};

			if (dirty & /*$$scope, l_submitting, form*/ 2054) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(1:0) {#if show}",
		ctx
	});

	return block;
}

// (2:2) <Modal on:close={close}>
function create_default_slot(ctx) {
	let h2;
	let t1;
	let form_1;
	let label0;
	let t2;
	let input0;
	let t3;
	let label1;
	let t4;
	let input1;
	let t5;
	let label2;
	let t6;
	let input2;
	let t7;
	let label3;
	let t8;
	let input3;
	let t9;
	let button;
	let t10_value = (/*l_submitting*/ ctx[1] ? '...' : 'Enviar') + "";
	let t10;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			h2 = element("h2");
			h2.textContent = "Editando";
			t1 = space();
			form_1 = element("form");
			label0 = element("label");
			t2 = text("Nome:     ");
			input0 = element("input");
			t3 = space();
			label1 = element("label");
			t4 = text("Telefone: ");
			input1 = element("input");
			t5 = space();
			label2 = element("label");
			t6 = text("Whatsapp: ");
			input2 = element("input");
			t7 = space();
			label3 = element("label");
			t8 = text("Endereço: ");
			input3 = element("input");
			t9 = space();
			button = element("button");
			t10 = text(t10_value);
			add_location(h2, file$2, 2, 4, 42);
			input0.required = true;
			add_location(input0, file$2, 5, 24, 98);
			attr_dev(label0, "class", "svelte-1mya8io");
			add_location(label0, file$2, 5, 6, 80);
			input1.required = true;
			add_location(input1, file$2, 6, 24, 177);
			attr_dev(label1, "class", "svelte-1mya8io");
			add_location(label1, file$2, 6, 6, 159);
			input2.required = true;
			add_location(input2, file$2, 7, 24, 256);
			attr_dev(label2, "class", "svelte-1mya8io");
			add_location(label2, file$2, 7, 6, 238);
			input3.required = true;
			add_location(input3, file$2, 8, 24, 335);
			attr_dev(label3, "class", "svelte-1mya8io");
			add_location(label3, file$2, 8, 6, 317);
			button.disabled = /*l_submitting*/ ctx[1];
			add_location(button, file$2, 10, 6, 397);
			add_location(form_1, file$2, 4, 4, 67);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, form_1, anchor);
			append_dev(form_1, label0);
			append_dev(label0, t2);
			append_dev(label0, input0);
			set_input_value(input0, /*form*/ ctx[2].name);
			append_dev(form_1, t3);
			append_dev(form_1, label1);
			append_dev(label1, t4);
			append_dev(label1, input1);
			set_input_value(input1, /*form*/ ctx[2].phone);
			append_dev(form_1, t5);
			append_dev(form_1, label2);
			append_dev(label2, t6);
			append_dev(label2, input2);
			set_input_value(input2, /*form*/ ctx[2].whatsapp);
			append_dev(form_1, t7);
			append_dev(form_1, label3);
			append_dev(label3, t8);
			append_dev(label3, input3);
			set_input_value(input3, /*form*/ ctx[2].address);
			append_dev(form_1, t9);
			append_dev(form_1, button);
			append_dev(button, t10);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[5]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[6]),
					listen_dev(input2, "input", /*input2_input_handler*/ ctx[7]),
					listen_dev(input3, "input", /*input3_input_handler*/ ctx[8]),
					listen_dev(button, "click", /*submit*/ ctx[4], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*form*/ 4 && input0.value !== /*form*/ ctx[2].name) {
				set_input_value(input0, /*form*/ ctx[2].name);
			}

			if (dirty & /*form*/ 4 && input1.value !== /*form*/ ctx[2].phone) {
				set_input_value(input1, /*form*/ ctx[2].phone);
			}

			if (dirty & /*form*/ 4 && input2.value !== /*form*/ ctx[2].whatsapp) {
				set_input_value(input2, /*form*/ ctx[2].whatsapp);
			}

			if (dirty & /*form*/ 4 && input3.value !== /*form*/ ctx[2].address) {
				set_input_value(input3, /*form*/ ctx[2].address);
			}

			if (dirty & /*l_submitting*/ 2 && t10_value !== (t10_value = (/*l_submitting*/ ctx[1] ? '...' : 'Enviar') + "")) set_data_dev(t10, t10_value);

			if (dirty & /*l_submitting*/ 2) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(form_1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(2:2) <Modal on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block$1(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*show*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*show*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(9, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MenuModal', slots, []);
	let { show } = $$props;
	let l_submitting;
	let form;

	function close() {
		$$invalidate(0, show = false);
	}

	async function submit() {
		$$invalidate(1, l_submitting = true);
		await api(`menu/${$menu.id}`, 'PUT', form);
		menu.set({ ...$menu, ...form });
		close();
	}

	function mount() {
		$$invalidate(1, l_submitting = false);

		$$invalidate(2, form = {
			name: $menu.name,
			phone: $menu.phone,
			whatsapp: $menu.whatsapp,
			address: $menu.address
		});
	}

	$$self.$$.on_mount.push(function () {
		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<MenuModal> was created without expected prop 'show'");
		}
	});

	const writable_props = ['show'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MenuModal> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		form.name = this.value;
		$$invalidate(2, form);
	}

	function input1_input_handler() {
		form.phone = this.value;
		$$invalidate(2, form);
	}

	function input2_input_handler() {
		form.whatsapp = this.value;
		$$invalidate(2, form);
	}

	function input3_input_handler() {
		form.address = this.value;
		$$invalidate(2, form);
	}

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
	};

	$$self.$capture_state = () => ({
		Modal,
		api,
		menu,
		show,
		l_submitting,
		form,
		close,
		submit,
		mount,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('l_submitting' in $$props) $$invalidate(1, l_submitting = $$props.l_submitting);
		if ('form' in $$props) $$invalidate(2, form = $$props.form);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*show*/ 1) {
			if (show) mount();
		}
	};

	return [
		show,
		l_submitting,
		form,
		close,
		submit,
		input0_input_handler,
		input1_input_handler,
		input2_input_handler,
		input3_input_handler
	];
}

class MenuModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { show: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MenuModal",
			options,
			id: create_fragment$3.name
		});
	}

	get show() {
		throw new Error("<MenuModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<MenuModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/routes/MenuEdit.svelte generated by Svelte v3.59.2 */
const file$1 = "web/routes/MenuEdit.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

// (26:2) {#each $menu.categories as category}
function create_each_block(ctx) {
	let categorycard;
	let current;

	categorycard = new CategoryCard({
			props: { category: /*category*/ ctx[7] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(categorycard.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(categorycard, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const categorycard_changes = {};
			if (dirty & /*$menu*/ 4) categorycard_changes.category = /*category*/ ctx[7];
			categorycard.$set(categorycard_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(categorycard.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(categorycard.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(categorycard, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(26:2) {#each $menu.categories as category}",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let div2;
	let div0;
	let h1;
	let t0_value = /*$menu*/ ctx[2].name + "";
	let t0;
	let t1;
	let button0;
	let t2;
	let table;
	let tr0;
	let td0;
	let icon0;
	let t3;
	let t4;
	let td1;
	let t5_value = /*$menu*/ ctx[2].phone + "";
	let t5;
	let t6;
	let tr1;
	let td2;
	let icon1;
	let t7;
	let t8;
	let td3;
	let t9_value = /*$menu*/ ctx[2].whatsapp + "";
	let t9;
	let t10;
	let tr2;
	let td4;
	let icon2;
	let t11;
	let t12;
	let td5;
	let t13_value = /*$menu*/ ctx[2].address + "";
	let t13;
	let t14;
	let div1;
	let t15;
	let button1;
	let t16;
	let t17;
	let menumodal;
	let updating_show;
	let t18;
	let categorymodal;
	let updating_show_1;
	let current;

	button0 = new Button({
			props: {
				class: "blu",
				i: "edit",
				t: "Editar Informações",
				action: /*edit_menu*/ ctx[3]
			},
			$$inline: true
		});

	icon0 = new Icon({ props: { i: "phone" }, $$inline: true });
	icon1 = new Icon({ props: { i: "phone" }, $$inline: true });
	icon2 = new Icon({ props: { i: "place" }, $$inline: true });

	button1 = new Button({
			props: {
				class: "grn",
				i: "add",
				t: "Categoria",
				action: /*create_category*/ ctx[4]
			},
			$$inline: true
		});

	let each_value = /*$menu*/ ctx[2].categories;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	function menumodal_show_binding(value) {
		/*menumodal_show_binding*/ ctx[5](value);
	}

	let menumodal_props = {};

	if (/*m_edit_menu*/ ctx[0] !== void 0) {
		menumodal_props.show = /*m_edit_menu*/ ctx[0];
	}

	menumodal = new MenuModal({ props: menumodal_props, $$inline: true });
	binding_callbacks.push(() => bind(menumodal, 'show', menumodal_show_binding));

	function categorymodal_show_binding(value) {
		/*categorymodal_show_binding*/ ctx[6](value);
	}

	let categorymodal_props = {};

	if (/*m_create_category*/ ctx[1] !== void 0) {
		categorymodal_props.show = /*m_create_category*/ ctx[1];
	}

	categorymodal = new CategoryModal({
			props: categorymodal_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind(categorymodal, 'show', categorymodal_show_binding));

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			h1 = element("h1");
			t0 = text(t0_value);
			t1 = space();
			create_component(button0.$$.fragment);
			t2 = space();
			table = element("table");
			tr0 = element("tr");
			td0 = element("td");
			create_component(icon0.$$.fragment);
			t3 = text(" Telefone:");
			t4 = space();
			td1 = element("td");
			t5 = text(t5_value);
			t6 = space();
			tr1 = element("tr");
			td2 = element("td");
			create_component(icon1.$$.fragment);
			t7 = text(" Whatsapp:");
			t8 = space();
			td3 = element("td");
			t9 = text(t9_value);
			t10 = space();
			tr2 = element("tr");
			td4 = element("td");
			create_component(icon2.$$.fragment);
			t11 = text(" Endereço:");
			t12 = space();
			td5 = element("td");
			t13 = text(t13_value);
			t14 = space();
			div1 = element("div");
			t15 = space();
			create_component(button1.$$.fragment);
			t16 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t17 = space();
			create_component(menumodal.$$.fragment);
			t18 = space();
			create_component(categorymodal.$$.fragment);
			add_location(h1, file$1, 2, 4, 35);
			attr_dev(div0, "class", "row jcsb");
			add_location(div0, file$1, 1, 2, 8);
			attr_dev(td0, "class", "svelte-i7doj6");
			add_location(td0, file$1, 8, 6, 172);
			attr_dev(td1, "class", "svelte-i7doj6");
			add_location(td1, file$1, 9, 6, 218);
			add_location(tr0, file$1, 7, 4, 161);
			attr_dev(td2, "class", "svelte-i7doj6");
			add_location(td2, file$1, 12, 6, 268);
			attr_dev(td3, "class", "svelte-i7doj6");
			add_location(td3, file$1, 13, 6, 314);
			add_location(tr1, file$1, 11, 4, 257);
			attr_dev(td4, "class", "svelte-i7doj6");
			add_location(td4, file$1, 16, 6, 367);
			attr_dev(td5, "class", "svelte-i7doj6");
			add_location(td5, file$1, 17, 6, 413);
			add_location(tr2, file$1, 15, 4, 356);
			add_location(table, file$1, 6, 2, 149);
			attr_dev(div1, "class", "hr");
			add_location(div1, file$1, 21, 2, 464);
			add_location(div2, file$1, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			append_dev(div0, h1);
			append_dev(h1, t0);
			append_dev(div0, t1);
			mount_component(button0, div0, null);
			append_dev(div2, t2);
			append_dev(div2, table);
			append_dev(table, tr0);
			append_dev(tr0, td0);
			mount_component(icon0, td0, null);
			append_dev(td0, t3);
			append_dev(tr0, t4);
			append_dev(tr0, td1);
			append_dev(td1, t5);
			append_dev(table, t6);
			append_dev(table, tr1);
			append_dev(tr1, td2);
			mount_component(icon1, td2, null);
			append_dev(td2, t7);
			append_dev(tr1, t8);
			append_dev(tr1, td3);
			append_dev(td3, t9);
			append_dev(table, t10);
			append_dev(table, tr2);
			append_dev(tr2, td4);
			mount_component(icon2, td4, null);
			append_dev(td4, t11);
			append_dev(tr2, t12);
			append_dev(tr2, td5);
			append_dev(td5, t13);
			append_dev(div2, t14);
			append_dev(div2, div1);
			append_dev(div2, t15);
			mount_component(button1, div2, null);
			append_dev(div2, t16);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div2, null);
				}
			}

			insert_dev(target, t17, anchor);
			mount_component(menumodal, target, anchor);
			insert_dev(target, t18, anchor);
			mount_component(categorymodal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*$menu*/ 4) && t0_value !== (t0_value = /*$menu*/ ctx[2].name + "")) set_data_dev(t0, t0_value);
			if ((!current || dirty & /*$menu*/ 4) && t5_value !== (t5_value = /*$menu*/ ctx[2].phone + "")) set_data_dev(t5, t5_value);
			if ((!current || dirty & /*$menu*/ 4) && t9_value !== (t9_value = /*$menu*/ ctx[2].whatsapp + "")) set_data_dev(t9, t9_value);
			if ((!current || dirty & /*$menu*/ 4) && t13_value !== (t13_value = /*$menu*/ ctx[2].address + "")) set_data_dev(t13, t13_value);

			if (dirty & /*$menu*/ 4) {
				each_value = /*$menu*/ ctx[2].categories;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div2, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			const menumodal_changes = {};

			if (!updating_show && dirty & /*m_edit_menu*/ 1) {
				updating_show = true;
				menumodal_changes.show = /*m_edit_menu*/ ctx[0];
				add_flush_callback(() => updating_show = false);
			}

			menumodal.$set(menumodal_changes);
			const categorymodal_changes = {};

			if (!updating_show_1 && dirty & /*m_create_category*/ 2) {
				updating_show_1 = true;
				categorymodal_changes.show = /*m_create_category*/ ctx[1];
				add_flush_callback(() => updating_show_1 = false);
			}

			categorymodal.$set(categorymodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			transition_in(icon2.$$.fragment, local);
			transition_in(button1.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(menumodal.$$.fragment, local);
			transition_in(categorymodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			transition_out(icon2.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(menumodal.$$.fragment, local);
			transition_out(categorymodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_component(button0);
			destroy_component(icon0);
			destroy_component(icon1);
			destroy_component(icon2);
			destroy_component(button1);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t17);
			destroy_component(menumodal, detaching);
			if (detaching) detach_dev(t18);
			destroy_component(categorymodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(2, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MenuEdit', slots, []);
	let m_edit_menu, m_create_category;

	function edit_menu() {
		$$invalidate(0, m_edit_menu = 1);
	}

	function create_category() {
		$$invalidate(1, m_create_category = 1);
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MenuEdit> was created with unknown prop '${key}'`);
	});

	function menumodal_show_binding(value) {
		m_edit_menu = value;
		$$invalidate(0, m_edit_menu);
	}

	function categorymodal_show_binding(value) {
		m_create_category = value;
		$$invalidate(1, m_create_category);
	}

	$$self.$capture_state = () => ({
		CategoryModal,
		CategoryCard,
		MenuModal,
		Button,
		Icon,
		menu,
		m_edit_menu,
		m_create_category,
		edit_menu,
		create_category,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('m_edit_menu' in $$props) $$invalidate(0, m_edit_menu = $$props.m_edit_menu);
		if ('m_create_category' in $$props) $$invalidate(1, m_create_category = $$props.m_create_category);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		m_edit_menu,
		m_create_category,
		$menu,
		edit_menu,
		create_category,
		menumodal_show_binding,
		categorymodal_show_binding
	];
}

class MenuEdit extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MenuEdit",
			options,
			id: create_fragment$2.name
		});
	}
}

/* web/routes/ItemsEdit.svelte generated by Svelte v3.59.2 */

function create_fragment$1(ctx) {
	const block = {
		c: noop,
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ItemsEdit', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ItemsEdit> was created with unknown prop '${key}'`);
	});

	return [];
}

class ItemsEdit extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ItemsEdit",
			options,
			id: create_fragment$1.name
		});
	}
}

/* web/App.svelte generated by Svelte v3.59.2 */
const file = "web/App.svelte";

// (5:43) 
function create_if_block_1(ctx) {
	let itemsedit;
	let current;
	itemsedit = new ItemsEdit({ $$inline: true });

	const block = {
		c: function create() {
			create_component(itemsedit.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(itemsedit, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(itemsedit.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(itemsedit.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(itemsedit, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(5:43) ",
		ctx
	});

	return block;
}

// (4:2) {#if      $menu && $curr_page == 'menu'}
function create_if_block(ctx) {
	let menuedit;
	let current;
	menuedit = new MenuEdit({ $$inline: true });

	const block = {
		c: function create() {
			create_component(menuedit.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(menuedit, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(menuedit.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(menuedit.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(menuedit, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(4:2) {#if      $menu && $curr_page == 'menu'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let topbar;
	let t;
	let div;
	let current_block_type_index;
	let if_block;
	let current;
	topbar = new TopBar({ $$inline: true });
	const if_block_creators = [create_if_block, create_if_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$menu*/ ctx[0] && /*$curr_page*/ ctx[1] == 'menu') return 0;
		if (/*$menu*/ ctx[0] && /*$curr_page*/ ctx[1] == 'items') return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			create_component(topbar.$$.fragment);
			t = space();
			div = element("div");
			if (if_block) if_block.c();
			attr_dev(div, "class", "page svelte-bgjs1a");
			add_location(div, file, 2, 0, 12);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(topbar, target, anchor);
			insert_dev(target, t, anchor);
			insert_dev(target, div, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(div, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index !== previous_block_index) {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					}

					transition_in(if_block, 1);
					if_block.m(div, null);
				} else {
					if_block = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(topbar.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(topbar.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(topbar, detaching);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let $menu;
	let $curr_page;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(0, $menu = $$value));
	validate_store(curr_page, 'curr_page');
	component_subscribe($$self, curr_page, $$value => $$invalidate(1, $curr_page = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('App', slots, []);
	if (!$curr_page) curr_page.set('menu');

	onMount(async _ => {
		if (!$menu) menu.set((await api(`menu/clyhtxwlk00001tx03yhu5xz6`)).data.menu);
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		TopBar,
		MenuEdit,
		ItemsEdit,
		curr_page,
		menu,
		api,
		onMount,
		$menu,
		$curr_page
	});

	return [$menu, $curr_page];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});
	}
}

var main = new App({ target: document.body });

export { main as default };
//# sourceMappingURL=main.js.map
