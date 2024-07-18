
(function(l, r) { if (!l || l.getElementById('livernoeloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
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
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
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

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);
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
function select_option(select, value, mounting) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    if (!mounting || value !== undefined) {
        select.selectedIndex = -1; // no option should be selected
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked');
    return selected_option && selected_option.__value;
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
function construct_svelte_component_dev(component, props) {
    const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
    try {
        const instance = new component(props);
        if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
            throw new Error(error_message);
        }
        return instance;
    }
    catch (err) {
        const { message } = err;
        if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
            throw new Error(error_message);
        }
        else {
            throw err;
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
const file$m = "web/components/Icon.svelte";

function create_fragment$m(ctx) {
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
			add_location(span, file$m, 1, 0, 57);
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
		id: create_fragment$m.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$m($$self, $$props, $$invalidate) {
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
		init(this, options, instance$m, create_fragment$m, safe_not_equal, { i: 0, class: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Icon",
			options,
			id: create_fragment$m.name
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

/* web/components/Button.svelte generated by Svelte v3.59.2 */
const file$l = "web/components/Button.svelte";

// (2:2) {#if i}
function create_if_block_1$5(ctx) {
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
		id: create_if_block_1$5.name,
		type: "if",
		source: "(2:2) {#if i}",
		ctx
	});

	return block;
}

// (3:2) {#if t}
function create_if_block$e(ctx) {
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
		id: create_if_block$e.name,
		type: "if",
		source: "(3:2) {#if t}",
		ctx
	});

	return block;
}

function create_fragment$l(ctx) {
	let button;
	let t_1;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*i*/ ctx[0] && create_if_block_1$5(ctx);
	let if_block1 = /*t*/ ctx[1] && create_if_block$e(ctx);

	const block = {
		c: function create() {
			button = element("button");
			if (if_block0) if_block0.c();
			t_1 = space();
			if (if_block1) if_block1.c();
			attr_dev(button, "class", /*clazz*/ ctx[4]);
			button.disabled = /*disabled*/ ctx[3];
			toggle_class(button, "row", /*i*/ ctx[0] && /*t*/ ctx[1]);
			add_location(button, file$l, 0, 0, 0);
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
					if_block0 = create_if_block_1$5(ctx);
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
					if_block1 = create_if_block$e(ctx);
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
		id: create_fragment$l.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$l($$self, $$props, $$invalidate) {
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

		init(this, options, instance$l, create_fragment$l, safe_not_equal, {
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
			id: create_fragment$l.name
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

const session_id = writable();
const curr_page  = writable();
const menu       = writable();

async function api(route, method, body) {
  const options = { headers: {}, method: method || 'GET' };

  if (get_store_value(session_id))
    options.headers['Authorization'] = `Bearer ${get_store_value(session_id)}`;
  else if (localStorage.getItem('session_id'))
    options.headers['Authorization'] = `Bearer ${localStorage.getItem('session_id')}`;

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

/* web/routes/AdminPanel.svelte generated by Svelte v3.59.2 */

const { console: console_1 } = globals;
const file$k = "web/routes/AdminPanel.svelte";

function get_each_context$7(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i];
	return child_ctx;
}

// (12:0) {#each menus || [] as menu}
function create_each_block$7(ctx) {
	let div;
	let h2;
	let t0_value = /*menu*/ ctx[9].name + "";
	let t0;
	let t1;
	let button;
	let t2;
	let current;

	function func(...args) {
		return /*func*/ ctx[8](/*menu*/ ctx[9], ...args);
	}

	button = new Button({
			props: { class: "red", action: func, i: "delete" },
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			create_component(button.$$.fragment);
			t2 = space();
			attr_dev(h2, "class", "special tac");
			add_location(h2, file$k, 13, 4, 428);
			attr_dev(div, "class", "card row svelte-1oot8iw");
			add_location(div, file$k, 12, 2, 401);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, h2);
			append_dev(h2, t0);
			append_dev(div, t1);
			mount_component(button, div, null);
			append_dev(div, t2);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*menus*/ 1) && t0_value !== (t0_value = /*menu*/ ctx[9].name + "")) set_data_dev(t0, t0_value);
			const button_changes = {};
			if (dirty & /*menus*/ 1) button_changes.action = func;
			button.$set(button_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(button);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$7.name,
		type: "each",
		source: "(12:0) {#each menus || [] as menu}",
		ctx
	});

	return block;
}

function create_fragment$k(ctx) {
	let form_1;
	let label0;
	let t0;
	let input0;
	let t1;
	let label1;
	let t2;
	let input1;
	let t3;
	let label2;
	let t4;
	let input2;
	let t5;
	let button;
	let t6;
	let div0;
	let t7;
	let div1;
	let current;
	let mounted;
	let dispose;

	button = new Button({
			props: {
				disabled: /*l_submitting*/ ctx[2],
				action: /*submit*/ ctx[3],
				t: /*l_submitting*/ ctx[2] ? '...' : 'Create'
			},
			$$inline: true
		});

	let each_value = /*menus*/ ctx[0] || [];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			form_1 = element("form");
			label0 = element("label");
			t0 = text("Username: ");
			input0 = element("input");
			t1 = space();
			label1 = element("label");
			t2 = text("Password: ");
			input1 = element("input");
			t3 = space();
			label2 = element("label");
			t4 = text("Name:     ");
			input2 = element("input");
			t5 = space();
			create_component(button.$$.fragment);
			t6 = space();
			div0 = element("div");
			t7 = space();
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			input0.required = true;
			attr_dev(input0, "class", "svelte-1oot8iw");
			add_location(input0, file$k, 1, 20, 27);
			add_location(label0, file$k, 1, 2, 9);
			input1.required = true;
			attr_dev(input1, "class", "svelte-1oot8iw");
			add_location(input1, file$k, 2, 20, 102);
			add_location(label1, file$k, 2, 2, 84);
			input2.required = true;
			attr_dev(input2, "class", "svelte-1oot8iw");
			add_location(input2, file$k, 3, 20, 177);
			add_location(label2, file$k, 3, 2, 159);
			attr_dev(form_1, "class", "svelte-1oot8iw");
			add_location(form_1, file$k, 0, 0, 0);
			attr_dev(div0, "class", "hr");
			add_location(div0, file$k, 8, 0, 331);
			attr_dev(div1, "class", "cards svelte-1oot8iw");
			add_location(div1, file$k, 10, 0, 351);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, form_1, anchor);
			append_dev(form_1, label0);
			append_dev(label0, t0);
			append_dev(label0, input0);
			set_input_value(input0, /*form*/ ctx[1].username);
			append_dev(form_1, t1);
			append_dev(form_1, label1);
			append_dev(label1, t2);
			append_dev(label1, input1);
			set_input_value(input1, /*form*/ ctx[1].password);
			append_dev(form_1, t3);
			append_dev(form_1, label2);
			append_dev(label2, t4);
			append_dev(label2, input2);
			set_input_value(input2, /*form*/ ctx[1].name);
			append_dev(form_1, t5);
			mount_component(button, form_1, null);
			insert_dev(target, t6, anchor);
			insert_dev(target, div0, anchor);
			insert_dev(target, t7, anchor);
			insert_dev(target, div1, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div1, null);
				}
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[5]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[6]),
					listen_dev(input2, "input", /*input2_input_handler*/ ctx[7])
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*form*/ 2 && input0.value !== /*form*/ ctx[1].username) {
				set_input_value(input0, /*form*/ ctx[1].username);
			}

			if (dirty & /*form*/ 2 && input1.value !== /*form*/ ctx[1].password) {
				set_input_value(input1, /*form*/ ctx[1].password);
			}

			if (dirty & /*form*/ 2 && input2.value !== /*form*/ ctx[1].name) {
				set_input_value(input2, /*form*/ ctx[1].name);
			}

			const button_changes = {};
			if (dirty & /*l_submitting*/ 4) button_changes.disabled = /*l_submitting*/ ctx[2];
			if (dirty & /*l_submitting*/ 4) button_changes.t = /*l_submitting*/ ctx[2] ? '...' : 'Create';
			button.$set(button_changes);

			if (dirty & /*delete_menu, menus*/ 17) {
				each_value = /*menus*/ ctx[0] || [];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$7(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$7(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div1, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(button.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(form_1);
			destroy_component(button);
			if (detaching) detach_dev(t6);
			if (detaching) detach_dev(div0);
			if (detaching) detach_dev(t7);
			if (detaching) detach_dev(div1);
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$k($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('AdminPanel', slots, []);
	let menus;
	let form = {};
	let l_submitting;

	async function submit() {
		$$invalidate(2, l_submitting = true);
		console.log(form);
		const { data } = await api('menu', 'POST', form);
		$$invalidate(0, menus = [...menus, data.menu]);
		$$invalidate(2, l_submitting = false);
		$$invalidate(1, form = {});
	}

	async function delete_menu(id) {
		if (!confirm('Are you sure you want to delete it?')) return;
		await api(`menu/${id}`, 'DELETE');
		$$invalidate(0, menus = menus.filter(m => m.id != id));
	}

	onMount(async _ => {
		$$invalidate(0, menus = (await api('menus')).data.menus);
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<AdminPanel> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		form.username = this.value;
		$$invalidate(1, form);
	}

	function input1_input_handler() {
		form.password = this.value;
		$$invalidate(1, form);
	}

	function input2_input_handler() {
		form.name = this.value;
		$$invalidate(1, form);
	}

	const func = (menu, _) => delete_menu(menu.id);

	$$self.$capture_state = () => ({
		Button,
		onMount,
		api,
		menus,
		form,
		l_submitting,
		submit,
		delete_menu
	});

	$$self.$inject_state = $$props => {
		if ('menus' in $$props) $$invalidate(0, menus = $$props.menus);
		if ('form' in $$props) $$invalidate(1, form = $$props.form);
		if ('l_submitting' in $$props) $$invalidate(2, l_submitting = $$props.l_submitting);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		menus,
		form,
		l_submitting,
		submit,
		delete_menu,
		input0_input_handler,
		input1_input_handler,
		input2_input_handler,
		func
	];
}

class AdminPanel extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "AdminPanel",
			options,
			id: create_fragment$k.name
		});
	}
}

/* web/components/Modal.svelte generated by Svelte v3.59.2 */
const file$j = "web/components/Modal.svelte";

// (1:0) {#if show}
function create_if_block$d(ctx) {
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
			add_location(div0, file$j, 3, 4, 124);
			attr_dev(div1, "class", "modal svelte-1agyxdy");
			add_location(div1, file$j, 2, 2, 72);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);

			if (default_slot) {
				default_slot.m(div0, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen_dev(div1, "click", /*background_click*/ ctx[1], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
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
		id: create_if_block$d.name,
		type: "if",
		source: "(1:0) {#if show}",
		ctx
	});

	return block;
}

function create_fragment$j(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block$d(ctx);

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
					if_block = create_if_block$d(ctx);
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
		id: create_fragment$j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$j($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Modal', slots, ['default']);
	const dispatch = createEventDispatcher();
	let { show } = $$props;

	function close() {
		dispatch('close');
		$$invalidate(0, show = false);
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
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
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
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [show, background_click, $$scope, slots];
}

class Modal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$j, create_fragment$j, safe_not_equal, { show: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Modal",
			options,
			id: create_fragment$j.name
		});
	}

	get show() {
		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

// Menu
async function edit_menu(_data) {
  let menu$1 = get_store_value(menu);

  await api(`menu/${menu$1.id}`, 'PUT', _data);

  menu$1 = { ...menu$1, ..._data };

  menu.set(menu$1);
}

// Category
async function create_category(_data) {
  const menu$1 = get_store_value(menu);

  const { data } = await api(`category/${menu$1.id}`, 'POST', _data);

  menu$1.categories = [...(menu$1.categories || []), data.category];

  menu.set(menu$1);
}

async function edit_category(id, _data) {
  const menu$1 = get_store_value(menu);

  await api(`category/${id}`, 'PUT', _data);

  for (let ci in menu$1.categories)
    if (menu$1.categories[ci].id == id)
      menu$1.categories[ci] = { ...menu$1.categories[ci], ..._data };

  menu.set(menu$1);
}

async function delete_category(id) {
  const menu$1 = get_store_value(menu);

  await api(`category/${id}`, 'DELETE');

  menu$1.categories = menu$1.categories.filter(c => c.id != id);

  menu.set(menu$1);
}

async function move_category_up(id) {
  const menu$1 = get_store_value(menu);

  api(`raise-category/${id}`, 'PUT');

  const i = menu$1.categories.findIndex(c => c.id == id);
  const item = menu$1.categories.splice(i, 1)[0];
  menu$1.categories = [...menu$1.categories.slice(0, i - 1), item, ...menu$1.categories.slice(i - 1)];

  menu.set(menu$1);
}

async function move_category_down(id) {
  const menu$1 = get_store_value(menu);

  const i = menu$1.categories.findIndex(c => c.id == id);
  await move_category_up(menu$1.categories[i + 1].id);
}

// Subcategory
async function create_subcategory(id, _data) {
  const menu$1 = get_store_value(menu);

  const { data } = await api(`subcategory/${id}`, 'POST', _data);

  for (let ci in menu$1.categories)
    if (menu$1.categories[ci].id == id)
      menu$1.categories[ci].subcategories = [...(menu$1.categories[ci].subcategories || []), data.subcategory];

  menu.set(menu$1);
}

async function edit_subcategory(id, _data) {
  const menu$1 = get_store_value(menu);

  await api(`subcategory/${id}`, 'PUT', _data);

  for (let ci in menu$1.categories) {
    const sci = menu$1.categories[ci].subcategories.findIndex(sc => sc.id == id);
    if (sci == -1) continue

    menu$1.categories[ci].subcategories[sci] = { ...menu$1.categories[ci].subcategories[sci], ..._data };
    break
  }

  menu.set(menu$1);
}

async function delete_subcategory(id) {
  const menu$1 = get_store_value(menu);

  await api(`subcategory/${id}`, 'DELETE');

  for (let ci in menu$1.categories)
    menu$1.categories[ci].subcategories = menu$1.categories[ci].subcategories.filter(sc => sc.id != id);

  menu.set(menu$1);
}

async function move_subcategory_up(id) {
  const menu$1 = get_store_value(menu);

  api(`raise-subcategory/${id}`, 'PUT');

  for (let ci in menu$1.categories) {
    const sci = menu$1.categories[ci].subcategories.findIndex(sc => sc.id == id);
    if (sci == -1) continue

    const item = menu$1.categories[ci].subcategories.splice(sci, 1)[0];
    menu$1.categories[ci].subcategories = [...menu$1.categories[ci].subcategories.slice(0, sci - 1), item, ...menu$1.categories[ci].subcategories.slice(sci - 1)];
    break
  }

  menu.set(menu$1);
}

async function move_subcategory_down(id) {
  const menu$1 = get_store_value(menu);

  for (let ci in menu$1.categories) {
    const sci = menu$1.categories[ci].subcategories.findIndex(sc => sc.id == id);
    if (sci == -1) continue

    await move_subcategory_up(menu$1.categories[ci].subcategories[sci + 1].id);
    break
  }
}

// Item
async function create_item(id, _data) {
  const menu$1 = get_store_value(menu);

  const { data } = await api(`item/${id}`, 'POST', _data);

  for (let ci in menu$1.categories) {
    const sci = menu$1.categories[ci].subcategories.findIndex(sc => sc.id == id);
    if (sci == -1) continue

    menu$1.categories[ci].subcategories[sci].items = [...(menu$1.categories[ci].subcategories[sci].items || []), data.item];
    break
  }

  menu.set(menu$1);
}

async function edit_item(id, _data) {
  const menu$1 = get_store_value(menu);

  await api(`item/${id}`, 'PUT', _data);

  for (let ci in menu$1.categories)
    for (let sci in menu$1.categories[ci].subcategories)
      for (let ii in menu$1.categories[ci].subcategories[sci].items)
        if (menu$1.categories[ci].subcategories[sci].items[ii].id == id) {
          menu$1.categories[ci].subcategories[sci].items[ii] = { ...menu$1.categories[ci].subcategories[sci].items[ii], ..._data };
          break
        }

  menu.set(menu$1);
}

async function delete_item(id) {
  const menu$1 = get_store_value(menu);

  await api(`item/${id}`, 'DELETE');

  for (let ci in menu$1.categories)
    for (let sci in menu$1.categories[ci].subcategories)
      menu$1.categories[ci].subcategories[sci].items = menu$1.categories[ci].subcategories[sci].items.filter(i => i.id != id);

  menu.set(menu$1);
}

async function move_item_up(id) {
  const menu$1 = get_store_value(menu);

  api(`raise-item/${id}`, 'PUT');

  for (let ci in menu$1.categories) {
    const sci = menu$1.categories[ci].subcategories.findIndex(sc => sc.items.find(i => i.id == id));
    if (sci == -1) continue
    const ii = menu$1.categories[ci].subcategories[sci].items.findIndex(i => i.id == id);

    const item = menu$1.categories[ci].subcategories[sci].items.splice(ii, 1)[0];
    menu$1.categories[ci].subcategories[sci].items = [...menu$1.categories[ci].subcategories[sci].items.slice(0, ii - 1), item, ...menu$1.categories[ci].subcategories[sci].items.slice(ii - 1)];
    break
  }

  menu.set(menu$1);
}

async function move_item_down(id) {
  const menu$1 = get_store_value(menu);

  for (let ci in menu$1.categories) {
    const sci = menu$1.categories[ci].subcategories.findIndex(sc => sc.items.find(i => i.id == id));
    if (sci == -1) continue
    const ii = menu$1.categories[ci].subcategories[sci].items.findIndex(i => i.id == id);

    await move_subcategory_up(menu$1.categories[ci].subcategories[sci].items[ii + 1].id);
    break
  }
}

/* web/components/ItemModal.svelte generated by Svelte v3.59.2 */
const file$i = "web/components/ItemModal.svelte";

// (1:0) {#if show}
function create_if_block$c(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				show: /*show*/ ctx[0],
				$$slots: { default: [create_default_slot$7] },
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
			if (dirty & /*show*/ 1) modal_changes.show = /*show*/ ctx[0];

			if (dirty & /*$$scope, l_submitting, item, form*/ 2062) {
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
		id: create_if_block$c.name,
		type: "if",
		source: "(1:0) {#if show}",
		ctx
	});

	return block;
}

// (2:2) <Modal {show} on:close={close}>
function create_default_slot$7(ctx) {
	let h2;

	let t0_value = (/*item*/ ctx[1]
	? `Produto: ${/*item*/ ctx[1].name}`
	: 'Criando um Produto') + "";

	let t0;
	let t1;
	let form_1;
	let label0;
	let t2;
	let input0;
	let t3;
	let label1;
	let t4;
	let textarea;
	let t5;
	let label2;
	let t6;
	let input1;
	let t7;
	let button0;

	let t8_value = (/*l_submitting*/ ctx[3]
	? '...'
	: /*item*/ ctx[1] ? 'Editar' : 'Criar') + "";

	let t8;
	let t9;
	let button1;
	let t10;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			form_1 = element("form");
			label0 = element("label");
			t2 = text("Nome:      ");
			input0 = element("input");
			t3 = space();
			label1 = element("label");
			t4 = text("Descrição: ");
			textarea = element("textarea");
			t5 = space();
			label2 = element("label");
			t6 = text("Preço:     ");
			input1 = element("input");
			t7 = space();
			button0 = element("button");
			t8 = text(t8_value);
			t9 = space();
			button1 = element("button");
			t10 = text("Cancelar");
			attr_dev(h2, "class", "special tac");
			add_location(h2, file$i, 2, 4, 49);
			input0.required = true;
			add_location(input0, file$i, 5, 25, 173);
			attr_dev(label0, "class", "svelte-1mya8io");
			add_location(label0, file$i, 5, 6, 154);
			attr_dev(textarea, "rows", "5");
			add_location(textarea, file$i, 6, 25, 249);
			attr_dev(label1, "class", "svelte-1mya8io");
			add_location(label1, file$i, 6, 6, 230);
			attr_dev(input1, "placehloder", "R$");
			attr_dev(input1, "rows", "5");
			input1.required = true;
			add_location(input1, file$i, 7, 25, 333);
			attr_dev(label2, "class", "svelte-1mya8io");
			add_location(label2, file$i, 7, 6, 314);
			attr_dev(button0, "class", "grn");
			button0.disabled = /*l_submitting*/ ctx[3];
			add_location(button0, file$i, 9, 6, 416);
			attr_dev(button1, "class", "red");
			set_style(button1, "margin-top", "10px");
			button1.disabled = /*l_submitting*/ ctx[3];
			add_location(button1, file$i, 10, 6, 548);
			add_location(form_1, file$i, 4, 4, 141);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, form_1, anchor);
			append_dev(form_1, label0);
			append_dev(label0, t2);
			append_dev(label0, input0);
			set_input_value(input0, /*form*/ ctx[2].name);
			append_dev(form_1, t3);
			append_dev(form_1, label1);
			append_dev(label1, t4);
			append_dev(label1, textarea);
			set_input_value(textarea, /*form*/ ctx[2].description);
			append_dev(form_1, t5);
			append_dev(form_1, label2);
			append_dev(label2, t6);
			append_dev(label2, input1);
			set_input_value(input1, /*form*/ ctx[2].price);
			append_dev(form_1, t7);
			append_dev(form_1, button0);
			append_dev(button0, t8);
			append_dev(form_1, t9);
			append_dev(form_1, button1);
			append_dev(button1, t10);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[7]),
					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[8]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[9]),
					listen_dev(button0, "click", /*submit*/ ctx[5], false, false, false, false),
					listen_dev(button1, "click", /*close*/ ctx[4], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 2 && t0_value !== (t0_value = (/*item*/ ctx[1]
			? `Produto: ${/*item*/ ctx[1].name}`
			: 'Criando um Produto') + "")) set_data_dev(t0, t0_value);

			if (dirty & /*form*/ 4 && input0.value !== /*form*/ ctx[2].name) {
				set_input_value(input0, /*form*/ ctx[2].name);
			}

			if (dirty & /*form*/ 4) {
				set_input_value(textarea, /*form*/ ctx[2].description);
			}

			if (dirty & /*form*/ 4 && input1.value !== /*form*/ ctx[2].price) {
				set_input_value(input1, /*form*/ ctx[2].price);
			}

			if (dirty & /*l_submitting, item*/ 10 && t8_value !== (t8_value = (/*l_submitting*/ ctx[3]
			? '...'
			: /*item*/ ctx[1] ? 'Editar' : 'Criar') + "")) set_data_dev(t8, t8_value);

			if (dirty & /*l_submitting*/ 8) {
				prop_dev(button0, "disabled", /*l_submitting*/ ctx[3]);
			}

			if (dirty & /*l_submitting*/ 8) {
				prop_dev(button1, "disabled", /*l_submitting*/ ctx[3]);
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
		id: create_default_slot$7.name,
		type: "slot",
		source: "(2:2) <Modal {show} on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$i(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block$c(ctx);

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
					if_block = create_if_block$c(ctx);
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
		id: create_fragment$i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$i($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ItemModal', slots, []);
	let { show, item, subcategory_id } = $$props;
	let l_submitting;
	let form;

	function close() {
		$$invalidate(0, show = false);
	}

	async function submit() {
		$$invalidate(3, l_submitting = true);
		$$invalidate(2, form.price_in_cents = Math.round(form.price * 100), form);
		if (item) await edit_item(item.id, form); else await create_item(subcategory_id, form);
		close();
	}

	function mount() {
		$$invalidate(3, l_submitting = false);

		$$invalidate(2, form = {
			name: item?.name,
			description: item?.description,
			price: item ? item.price_in_cents / 100 : undefined
		});
	}

	$$self.$$.on_mount.push(function () {
		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<ItemModal> was created without expected prop 'show'");
		}

		if (item === undefined && !('item' in $$props || $$self.$$.bound[$$self.$$.props['item']])) {
			console.warn("<ItemModal> was created without expected prop 'item'");
		}

		if (subcategory_id === undefined && !('subcategory_id' in $$props || $$self.$$.bound[$$self.$$.props['subcategory_id']])) {
			console.warn("<ItemModal> was created without expected prop 'subcategory_id'");
		}
	});

	const writable_props = ['show', 'item', 'subcategory_id'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ItemModal> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		form.name = this.value;
		$$invalidate(2, form);
	}

	function textarea_input_handler() {
		form.description = this.value;
		$$invalidate(2, form);
	}

	function input1_input_handler() {
		form.price = this.value;
		$$invalidate(2, form);
	}

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('item' in $$props) $$invalidate(1, item = $$props.item);
		if ('subcategory_id' in $$props) $$invalidate(6, subcategory_id = $$props.subcategory_id);
	};

	$$self.$capture_state = () => ({
		Modal,
		create_item,
		edit_item,
		show,
		item,
		subcategory_id,
		l_submitting,
		form,
		close,
		submit,
		mount
	});

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('item' in $$props) $$invalidate(1, item = $$props.item);
		if ('subcategory_id' in $$props) $$invalidate(6, subcategory_id = $$props.subcategory_id);
		if ('l_submitting' in $$props) $$invalidate(3, l_submitting = $$props.l_submitting);
		if ('form' in $$props) $$invalidate(2, form = $$props.form);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*show*/ 1) {
			if (show) mount();
		}

		if ($$self.$$.dirty & /*form*/ 4) {
			if (form?.price) {
				$$invalidate(2, form.price = String(form.price).replaceAll(',', '.').replaceAll(/[^\d\.]/g, ''), form);
				const parts = form.price.split('.');
				if (parts.length > 1) $$invalidate(2, form.price = `${parts[0]}.${parts.slice(1).join('').slice(0, 2)}`, form);
			}
		}
	};

	return [
		show,
		item,
		form,
		l_submitting,
		close,
		submit,
		subcategory_id,
		input0_input_handler,
		textarea_input_handler,
		input1_input_handler
	];
}

class ItemModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$i, create_fragment$i, safe_not_equal, { show: 0, item: 1, subcategory_id: 6 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ItemModal",
			options,
			id: create_fragment$i.name
		});
	}

	get show() {
		throw new Error("<ItemModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<ItemModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get item() {
		throw new Error("<ItemModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set item(value) {
		throw new Error("<ItemModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get subcategory_id() {
		throw new Error("<ItemModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set subcategory_id(value) {
		throw new Error("<ItemModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function minify_text(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '')
}

function format_price(n) {
  let str = String(n / 100).replace('.', ',');
  if (n % 100 == 0) str += ',00';
  else if (n % 10 == 0) str += '0';
  return str
}

/* web/components/ItemRow.svelte generated by Svelte v3.59.2 */
const file$h = "web/components/ItemRow.svelte";

// (8:0) <Modal bind:show={m_options}>
function create_default_slot_1$2(ctx) {
	let p;
	let t0;
	let t1_value = /*item*/ ctx[0].name + "";
	let t1;
	let t2;
	let div;
	let button0;
	let t3;
	let button1;
	let t4;
	let button2;
	let t5;
	let button3;
	let t6;
	let button4;
	let current;

	button0 = new Button({
			props: {
				class: "blu",
				i: "edit",
				t: "Editar",
				action: /*edit*/ ctx[7]
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				class: "red",
				i: "delete",
				t: "Excluir",
				action: /*_delete*/ ctx[8]
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				i: "keyboard_arrow_up",
				t: "Mover pra cima",
				action: /*move_up*/ ctx[9],
				disabled: /*i*/ ctx[3] == 0
			},
			$$inline: true
		});

	button3 = new Button({
			props: {
				i: "keyboard_arrow_down",
				t: "Mover pra baixo",
				action: /*move_down*/ ctx[10],
				disabled: /*i*/ ctx[3] == /*items_length*/ ctx[4] - 1
			},
			$$inline: true
		});

	button4 = new Button({
			props: {
				i: "close",
				t: "Cancelar",
				action: /*func*/ ctx[12]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			p = element("p");
			t0 = text("Produto: ");
			t1 = text(t1_value);
			t2 = space();
			div = element("div");
			create_component(button0.$$.fragment);
			t3 = space();
			create_component(button1.$$.fragment);
			t4 = space();
			create_component(button2.$$.fragment);
			t5 = space();
			create_component(button3.$$.fragment);
			t6 = space();
			create_component(button4.$$.fragment);
			attr_dev(p, "class", "special svelte-rf44i4");
			add_location(p, file$h, 8, 2, 239);
			attr_dev(div, "class", "btn-col");
			add_location(div, file$h, 9, 2, 287);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t0);
			append_dev(p, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, div, anchor);
			mount_component(button0, div, null);
			append_dev(div, t3);
			mount_component(button1, div, null);
			append_dev(div, t4);
			mount_component(button2, div, null);
			append_dev(div, t5);
			mount_component(button3, div, null);
			append_dev(div, t6);
			mount_component(button4, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*item*/ 1) && t1_value !== (t1_value = /*item*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
			const button2_changes = {};
			if (dirty & /*i*/ 8) button2_changes.disabled = /*i*/ ctx[3] == 0;
			button2.$set(button2_changes);
			const button3_changes = {};
			if (dirty & /*i, items_length*/ 24) button3_changes.disabled = /*i*/ ctx[3] == /*items_length*/ ctx[4] - 1;
			button3.$set(button3_changes);
			const button4_changes = {};
			if (dirty & /*m_options*/ 2) button4_changes.action = /*func*/ ctx[12];
			button4.$set(button4_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(button2.$$.fragment, local);
			transition_in(button3.$$.fragment, local);
			transition_in(button4.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(button2.$$.fragment, local);
			transition_out(button3.$$.fragment, local);
			transition_out(button4.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div);
			destroy_component(button0);
			destroy_component(button1);
			destroy_component(button2);
			destroy_component(button3);
			destroy_component(button4);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1$2.name,
		type: "slot",
		source: "(8:0) <Modal bind:show={m_options}>",
		ctx
	});

	return block;
}

// (20:0) {#if l_deleting}
function create_if_block$b(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				show: true,
				$$slots: { default: [create_default_slot$6] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
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
		id: create_if_block$b.name,
		type: "if",
		source: "(20:0) {#if l_deleting}",
		ctx
	});

	return block;
}

// (21:2) <Modal show={true}>
function create_default_slot$6(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Excluindo...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$6.name,
		type: "slot",
		source: "(21:2) <Modal show={true}>",
		ctx
	});

	return block;
}

function create_fragment$h(ctx) {
	let tr;
	let td0;
	let t0_value = /*item*/ ctx[0].name + "";
	let t0;
	let t1;
	let td1;
	let t2_value = (/*item*/ ctx[0].description || 'Sem descrição') + "";
	let t2;
	let t3;
	let td2;
	let t4;
	let t5_value = format_price(/*item*/ ctx[0].price_in_cents) + "";
	let t5;
	let t6;
	let td3;
	let button;
	let t7;
	let modal;
	let updating_show;
	let t8;
	let itemmodal;
	let updating_show_1;
	let t9;
	let if_block_anchor;
	let current;

	button = new Button({
			props: {
				class: "blu",
				i: "edit",
				action: /*show_options*/ ctx[6]
			},
			$$inline: true
		});

	function modal_show_binding(value) {
		/*modal_show_binding*/ ctx[13](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot_1$2] },
		$$scope: { ctx }
	};

	if (/*m_options*/ ctx[1] !== void 0) {
		modal_props.show = /*m_options*/ ctx[1];
	}

	modal = new Modal({ props: modal_props, $$inline: true });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding));

	function itemmodal_show_binding(value) {
		/*itemmodal_show_binding*/ ctx[14](value);
	}

	let itemmodal_props = {
		item: /*item*/ ctx[0],
		subcategory_id: /*item*/ ctx[0].subcategory_id
	};

	if (/*m_edit*/ ctx[2] !== void 0) {
		itemmodal_props.show = /*m_edit*/ ctx[2];
	}

	itemmodal = new ItemModal({ props: itemmodal_props, $$inline: true });
	binding_callbacks.push(() => bind(itemmodal, 'show', itemmodal_show_binding));
	let if_block = /*l_deleting*/ ctx[5] && create_if_block$b(ctx);

	const block = {
		c: function create() {
			tr = element("tr");
			td0 = element("td");
			t0 = text(t0_value);
			t1 = space();
			td1 = element("td");
			t2 = text(t2_value);
			t3 = space();
			td2 = element("td");
			t4 = text("R$ ");
			t5 = text(t5_value);
			t6 = space();
			td3 = element("td");
			create_component(button.$$.fragment);
			t7 = space();
			create_component(modal.$$.fragment);
			t8 = space();
			create_component(itemmodal.$$.fragment);
			t9 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			add_location(td0, file$h, 1, 2, 7);
			add_location(td1, file$h, 2, 2, 32);
			add_location(td2, file$h, 3, 2, 83);
			add_location(td3, file$h, 4, 2, 135);
			add_location(tr, file$h, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, tr, anchor);
			append_dev(tr, td0);
			append_dev(td0, t0);
			append_dev(tr, t1);
			append_dev(tr, td1);
			append_dev(td1, t2);
			append_dev(tr, t3);
			append_dev(tr, td2);
			append_dev(td2, t4);
			append_dev(td2, t5);
			append_dev(tr, t6);
			append_dev(tr, td3);
			mount_component(button, td3, null);
			insert_dev(target, t7, anchor);
			mount_component(modal, target, anchor);
			insert_dev(target, t8, anchor);
			mount_component(itemmodal, target, anchor);
			insert_dev(target, t9, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*item*/ 1) && t0_value !== (t0_value = /*item*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
			if ((!current || dirty & /*item*/ 1) && t2_value !== (t2_value = (/*item*/ ctx[0].description || 'Sem descrição') + "")) set_data_dev(t2, t2_value);
			if ((!current || dirty & /*item*/ 1) && t5_value !== (t5_value = format_price(/*item*/ ctx[0].price_in_cents) + "")) set_data_dev(t5, t5_value);
			const modal_changes = {};

			if (dirty & /*$$scope, m_options, i, items_length, item*/ 65563) {
				modal_changes.$$scope = { dirty, ctx };
			}

			if (!updating_show && dirty & /*m_options*/ 2) {
				updating_show = true;
				modal_changes.show = /*m_options*/ ctx[1];
				add_flush_callback(() => updating_show = false);
			}

			modal.$set(modal_changes);
			const itemmodal_changes = {};
			if (dirty & /*item*/ 1) itemmodal_changes.item = /*item*/ ctx[0];
			if (dirty & /*item*/ 1) itemmodal_changes.subcategory_id = /*item*/ ctx[0].subcategory_id;

			if (!updating_show_1 && dirty & /*m_edit*/ 4) {
				updating_show_1 = true;
				itemmodal_changes.show = /*m_edit*/ ctx[2];
				add_flush_callback(() => updating_show_1 = false);
			}

			itemmodal.$set(itemmodal_changes);

			if (/*l_deleting*/ ctx[5]) {
				if (if_block) {
					if (dirty & /*l_deleting*/ 32) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$b(ctx);
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
			transition_in(button.$$.fragment, local);
			transition_in(modal.$$.fragment, local);
			transition_in(itemmodal.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(button.$$.fragment, local);
			transition_out(modal.$$.fragment, local);
			transition_out(itemmodal.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(tr);
			destroy_component(button);
			if (detaching) detach_dev(t7);
			destroy_component(modal, detaching);
			if (detaching) detach_dev(t8);
			destroy_component(itemmodal, detaching);
			if (detaching) detach_dev(t9);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$h($$self, $$props, $$invalidate) {
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(11, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ItemRow', slots, []);
	let { item } = $$props;
	let m_options, m_edit;
	let i, items_length;
	let l_deleting;

	function show_options() {
		$$invalidate(1, m_options = 1);
	}

	function edit() {
		$$invalidate(1, m_options = 0);
		$$invalidate(2, m_edit = 1);
	}

	async function _delete() {
		$$invalidate(1, m_options = 0);
		if (!confirm(`Certeza que quer excluir o produto ${item.name}?`)) return;
		$$invalidate(5, l_deleting = true);
		await delete_item(item.id);
		$$invalidate(5, l_deleting = false);
	}

	function move_up() {
		$$invalidate(1, m_options = 0);
		move_item_up(item.id);
	}

	function move_down() {
		$$invalidate(1, m_options = 0);
		move_item_down(item.id);
	}

	function update_i() {
		const category = $menu.categories.find(c => c.subcategories.find(sc => sc.id == item.subcategory_id));
		const subcategory = category?.subcategories.find(sc => sc.id == item.subcategory_id);
		const items = subcategory?.items;
		$$invalidate(4, items_length = items?.length);
		$$invalidate(3, i = items?.findIndex(i => i.id == item.id));
	}

	$$self.$$.on_mount.push(function () {
		if (item === undefined && !('item' in $$props || $$self.$$.bound[$$self.$$.props['item']])) {
			console.warn("<ItemRow> was created without expected prop 'item'");
		}
	});

	const writable_props = ['item'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ItemRow> was created with unknown prop '${key}'`);
	});

	const func = _ => $$invalidate(1, m_options = false);

	function modal_show_binding(value) {
		m_options = value;
		$$invalidate(1, m_options);
	}

	function itemmodal_show_binding(value) {
		m_edit = value;
		$$invalidate(2, m_edit);
	}

	$$self.$$set = $$props => {
		if ('item' in $$props) $$invalidate(0, item = $$props.item);
	};

	$$self.$capture_state = () => ({
		ItemModal,
		Button,
		Modal,
		delete_item,
		move_item_up,
		move_item_down,
		format_price,
		menu,
		item,
		m_options,
		m_edit,
		i,
		items_length,
		l_deleting,
		show_options,
		edit,
		_delete,
		move_up,
		move_down,
		update_i,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('item' in $$props) $$invalidate(0, item = $$props.item);
		if ('m_options' in $$props) $$invalidate(1, m_options = $$props.m_options);
		if ('m_edit' in $$props) $$invalidate(2, m_edit = $$props.m_edit);
		if ('i' in $$props) $$invalidate(3, i = $$props.i);
		if ('items_length' in $$props) $$invalidate(4, items_length = $$props.items_length);
		if ('l_deleting' in $$props) $$invalidate(5, l_deleting = $$props.l_deleting);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$menu*/ 2048) {
			if ($menu) update_i();
		}
	};

	return [
		item,
		m_options,
		m_edit,
		i,
		items_length,
		l_deleting,
		show_options,
		edit,
		_delete,
		move_up,
		move_down,
		$menu,
		func,
		modal_show_binding,
		itemmodal_show_binding
	];
}

class ItemRow extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$h, create_fragment$h, safe_not_equal, { item: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ItemRow",
			options,
			id: create_fragment$h.name
		});
	}

	get item() {
		throw new Error("<ItemRow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set item(value) {
		throw new Error("<ItemRow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/components/SubcategoryTable.svelte generated by Svelte v3.59.2 */
const file$g = "web/components/SubcategoryTable.svelte";

function get_each_context$6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i];
	return child_ctx;
}

// (9:4) {#each subcategory.items || [] as item}
function create_each_block$6(ctx) {
	let itemrow;
	let current;

	itemrow = new ItemRow({
			props: { item: /*item*/ ctx[6] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(itemrow.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(itemrow, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const itemrow_changes = {};
			if (dirty & /*subcategory*/ 1) itemrow_changes.item = /*item*/ ctx[6];
			itemrow.$set(itemrow_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(itemrow.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(itemrow.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(itemrow, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$6.name,
		type: "each",
		source: "(9:4) {#each subcategory.items || [] as item}",
		ctx
	});

	return block;
}

function create_fragment$g(ctx) {
	let table;
	let thead;
	let tr;
	let td0;
	let h2;
	let t0_value = /*subcategory*/ ctx[0].name + "";
	let t0;
	let t1;
	let td1;
	let button;
	let t2;
	let tbody;
	let t3;
	let itemmodal;
	let updating_show;
	let current;

	button = new Button({
			props: {
				class: "grn",
				i: "add",
				action: /*create_item*/ ctx[2]
			},
			$$inline: true
		});

	let each_value = /*subcategory*/ ctx[0].items || [];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	function itemmodal_show_binding(value) {
		/*itemmodal_show_binding*/ ctx[4](value);
	}

	let itemmodal_props = {
		subcategory_id: /*subcategory*/ ctx[0].id
	};

	if (/*m_item*/ ctx[1] !== void 0) {
		itemmodal_props.show = /*m_item*/ ctx[1];
	}

	itemmodal = new ItemModal({ props: itemmodal_props, $$inline: true });
	binding_callbacks.push(() => bind(itemmodal, 'show', itemmodal_show_binding));

	const block = {
		c: function create() {
			table = element("table");
			thead = element("thead");
			tr = element("tr");
			td0 = element("td");
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			td1 = element("td");
			create_component(button.$$.fragment);
			t2 = space();
			tbody = element("tbody");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t3 = space();
			create_component(itemmodal.$$.fragment);
			add_location(h2, file$g, 3, 21, 48);
			attr_dev(td0, "colspan", "3");
			attr_dev(td0, "class", "svelte-s0l2tk");
			add_location(td0, file$g, 3, 6, 33);
			attr_dev(td1, "class", "svelte-s0l2tk");
			add_location(td1, file$g, 4, 6, 90);
			add_location(tr, file$g, 2, 4, 22);
			attr_dev(thead, "class", "svelte-s0l2tk");
			add_location(thead, file$g, 1, 2, 10);
			add_location(tbody, file$g, 7, 2, 176);
			attr_dev(table, "class", "svelte-s0l2tk");
			add_location(table, file$g, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, table, anchor);
			append_dev(table, thead);
			append_dev(thead, tr);
			append_dev(tr, td0);
			append_dev(td0, h2);
			append_dev(h2, t0);
			append_dev(tr, t1);
			append_dev(tr, td1);
			mount_component(button, td1, null);
			append_dev(table, t2);
			append_dev(table, tbody);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(tbody, null);
				}
			}

			insert_dev(target, t3, anchor);
			mount_component(itemmodal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*subcategory*/ 1) && t0_value !== (t0_value = /*subcategory*/ ctx[0].name + "")) set_data_dev(t0, t0_value);

			if (dirty & /*subcategory*/ 1) {
				each_value = /*subcategory*/ ctx[0].items || [];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$6(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$6(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(tbody, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			const itemmodal_changes = {};
			if (dirty & /*subcategory*/ 1) itemmodal_changes.subcategory_id = /*subcategory*/ ctx[0].id;

			if (!updating_show && dirty & /*m_item*/ 2) {
				updating_show = true;
				itemmodal_changes.show = /*m_item*/ ctx[1];
				add_flush_callback(() => updating_show = false);
			}

			itemmodal.$set(itemmodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(itemmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(itemmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(table);
			destroy_component(button);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t3);
			destroy_component(itemmodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$g($$self, $$props, $$invalidate) {
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(3, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('SubcategoryTable', slots, []);
	let { subcategory } = $$props;
	let m_item;

	function create_item() {
		$$invalidate(1, m_item = 1);
	}

	function update_items(menu) {
		const category = menu.categories.find(c => c.id == subcategory.category_id);
		const _subcategory = category.subcategories.find(sc => sc.id == subcategory.id);
		$$invalidate(0, subcategory.items = _subcategory.items, subcategory);
	}

	$$self.$$.on_mount.push(function () {
		if (subcategory === undefined && !('subcategory' in $$props || $$self.$$.bound[$$self.$$.props['subcategory']])) {
			console.warn("<SubcategoryTable> was created without expected prop 'subcategory'");
		}
	});

	const writable_props = ['subcategory'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SubcategoryTable> was created with unknown prop '${key}'`);
	});

	function itemmodal_show_binding(value) {
		m_item = value;
		$$invalidate(1, m_item);
	}

	$$self.$$set = $$props => {
		if ('subcategory' in $$props) $$invalidate(0, subcategory = $$props.subcategory);
	};

	$$self.$capture_state = () => ({
		ItemModal,
		ItemRow,
		Button,
		menu,
		subcategory,
		m_item,
		create_item,
		update_items,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('subcategory' in $$props) $$invalidate(0, subcategory = $$props.subcategory);
		if ('m_item' in $$props) $$invalidate(1, m_item = $$props.m_item);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$menu*/ 8) {
			update_items($menu);
		}
	};

	return [subcategory, m_item, create_item, $menu, itemmodal_show_binding];
}

class SubcategoryTable extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$g, create_fragment$g, safe_not_equal, { subcategory: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SubcategoryTable",
			options,
			id: create_fragment$g.name
		});
	}

	get subcategory() {
		throw new Error("<SubcategoryTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set subcategory(value) {
		throw new Error("<SubcategoryTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/routes/ItemsEdit.svelte generated by Svelte v3.59.2 */
const file$f = "web/routes/ItemsEdit.svelte";

function get_each_context$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (6:4) {#each $menu.categories || [] as category}
function create_each_block_3(ctx) {
	let option;
	let t0_value = /*category*/ ctx[4].name + "";
	let t0;
	let t1;
	let option_value_value;

	const block = {
		c: function create() {
			option = element("option");
			t0 = text(t0_value);
			t1 = space();
			option.__value = option_value_value = /*category*/ ctx[4].id;
			option.value = option.__value;
			add_location(option, file$f, 6, 6, 219);
		},
		m: function mount(target, anchor) {
			insert_dev(target, option, anchor);
			append_dev(option, t0);
			append_dev(option, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*$menu*/ 8 && t0_value !== (t0_value = /*category*/ ctx[4].name + "")) set_data_dev(t0, t0_value);

			if (dirty & /*$menu*/ 8 && option_value_value !== (option_value_value = /*category*/ ctx[4].id)) {
				prop_dev(option, "__value", option_value_value);
				option.value = option.__value;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(option);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_3.name,
		type: "each",
		source: "(6:4) {#each $menu.categories || [] as category}",
		ctx
	});

	return block;
}

// (13:4) {#each category?.subcategories || [] as subcategory}
function create_each_block_2(ctx) {
	let option;
	let t0_value = /*subcategory*/ ctx[6].name + "";
	let t0;
	let t1;
	let option_value_value;

	const block = {
		c: function create() {
			option = element("option");
			t0 = text(t0_value);
			t1 = space();
			option.__value = option_value_value = /*subcategory*/ ctx[6].id;
			option.value = option.__value;
			add_location(option, file$f, 13, 6, 486);
		},
		m: function mount(target, anchor) {
			insert_dev(target, option, anchor);
			append_dev(option, t0);
			append_dev(option, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*category*/ 16 && t0_value !== (t0_value = /*subcategory*/ ctx[6].name + "")) set_data_dev(t0, t0_value);

			if (dirty & /*category*/ 16 && option_value_value !== (option_value_value = /*subcategory*/ ctx[6].id)) {
				prop_dev(option, "__value", option_value_value);
				option.value = option.__value;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(option);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_2.name,
		type: "each",
		source: "(13:4) {#each category?.subcategories || [] as subcategory}",
		ctx
	});

	return block;
}

// (24:2) {#each category.subcategories as subcategory}
function create_each_block_1$1(ctx) {
	let subcategorytable;
	let current;

	subcategorytable = new SubcategoryTable({
			props: { subcategory: /*subcategory*/ ctx[6] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(subcategorytable.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(subcategorytable, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const subcategorytable_changes = {};
			if (dirty & /*filtered_menu*/ 32) subcategorytable_changes.subcategory = /*subcategory*/ ctx[6];
			subcategorytable.$set(subcategorytable_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(subcategorytable.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(subcategorytable.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(subcategorytable, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1$1.name,
		type: "each",
		source: "(24:2) {#each category.subcategories as subcategory}",
		ctx
	});

	return block;
}

// (19:0) {#each filtered_menu.categories as category}
function create_each_block$5(ctx) {
	let div;
	let t0;
	let h1;
	let t1_value = /*category*/ ctx[4].name + "";
	let t1;
	let t2;
	let each_1_anchor;
	let current;
	let each_value_1 = /*category*/ ctx[4].subcategories;
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			div = element("div");
			t0 = space();
			h1 = element("h1");
			t1 = text(t1_value);
			t2 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
			attr_dev(div, "class", "hr");
			add_location(div, file$f, 19, 2, 626);
			add_location(h1, file$f, 21, 2, 648);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*filtered_menu*/ 32) && t1_value !== (t1_value = /*category*/ ctx[4].name + "")) set_data_dev(t1, t1_value);

			if (dirty & /*filtered_menu*/ 32) {
				each_value_1 = /*category*/ ctx[4].subcategories;
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$5.name,
		type: "each",
		source: "(19:0) {#each filtered_menu.categories as category}",
		ctx
	});

	return block;
}

// (29:0) {#if !filtered_menu.categories.length && (query || category_id || subcategory_id)}
function create_if_block$a(ctx) {
	let p;
	let t0;
	let span;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			p = element("p");
			t0 = text("Nada encontrado para esses filtros.\n    \n    ");
			span = element("span");
			span.textContent = "Limpar filtros";
			attr_dev(span, "class", "underline cp");
			add_location(span, file$f, 32, 4, 976);
			add_location(p, file$f, 29, 2, 867);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t0);
			append_dev(p, span);

			if (!mounted) {
				dispose = listen_dev(span, "click", /*clear_filters*/ ctx[7], false, false, false, false);
				mounted = true;
			}
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$a.name,
		type: "if",
		source: "(29:0) {#if !filtered_menu.categories.length && (query || category_id || subcategory_id)}",
		ctx
	});

	return block;
}

function create_fragment$f(ctx) {
	let div;
	let input;
	let t0;
	let select0;
	let option0;
	let t1;
	let t2;
	let select1;
	let option1;
	let t3;
	let select1_disabled_value;
	let t4;
	let t5;
	let if_block_anchor;
	let current;
	let mounted;
	let dispose;
	let each_value_3 = /*$menu*/ ctx[3].categories || [];
	validate_each_argument(each_value_3);
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks_2[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	let each_value_2 = /*category*/ ctx[4]?.subcategories || [];
	validate_each_argument(each_value_2);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	let each_value = /*filtered_menu*/ ctx[5].categories;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block = !/*filtered_menu*/ ctx[5].categories.length && (/*query*/ ctx[2] || /*category_id*/ ctx[0] || /*subcategory_id*/ ctx[1]) && create_if_block$a(ctx);

	const block = {
		c: function create() {
			div = element("div");
			input = element("input");
			t0 = space();
			select0 = element("select");
			option0 = element("option");
			t1 = text("Todas categorias ");

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			t2 = space();
			select1 = element("select");
			option1 = element("option");
			t3 = text("Todas subcategorias ");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t4 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t5 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			attr_dev(input, "placeholder", "Pesquisar");
			attr_dev(input, "class", "svelte-1nqktdd");
			add_location(input, file$f, 1, 2, 20);
			option0.__value = undefined;
			option0.value = option0.__value;
			add_location(option0, file$f, 4, 4, 112);
			attr_dev(select0, "class", "svelte-1nqktdd");
			if (/*category_id*/ ctx[0] === void 0) add_render_callback(() => /*select0_change_handler*/ ctx[9].call(select0));
			add_location(select0, file$f, 3, 2, 74);
			option1.__value = undefined;
			option1.value = option1.__value;
			add_location(option1, file$f, 11, 4, 366);
			select1.disabled = select1_disabled_value = !/*category_id*/ ctx[0];
			attr_dev(select1, "class", "svelte-1nqktdd");
			if (/*subcategory_id*/ ctx[1] === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[10].call(select1));
			add_location(select1, file$f, 10, 2, 301);
			attr_dev(div, "class", "row svelte-1nqktdd");
			add_location(div, file$f, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, input);
			set_input_value(input, /*query*/ ctx[2]);
			append_dev(div, t0);
			append_dev(div, select0);
			append_dev(select0, option0);
			append_dev(option0, t1);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				if (each_blocks_2[i]) {
					each_blocks_2[i].m(select0, null);
				}
			}

			select_option(select0, /*category_id*/ ctx[0], true);
			append_dev(div, t2);
			append_dev(div, select1);
			append_dev(select1, option1);
			append_dev(option1, t3);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(select1, null);
				}
			}

			select_option(select1, /*subcategory_id*/ ctx[1], true);
			insert_dev(target, t4, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, t5, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[8]),
					listen_dev(select0, "change", /*select0_change_handler*/ ctx[9]),
					listen_dev(select1, "change", /*select1_change_handler*/ ctx[10])
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*query*/ 4 && input.value !== /*query*/ ctx[2]) {
				set_input_value(input, /*query*/ ctx[2]);
			}

			if (dirty & /*$menu*/ 8) {
				each_value_3 = /*$menu*/ ctx[3].categories || [];
				validate_each_argument(each_value_3);
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_3(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(select0, null);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_3.length;
			}

			if (dirty & /*category_id, $menu, undefined*/ 9) {
				select_option(select0, /*category_id*/ ctx[0]);
			}

			if (dirty & /*category*/ 16) {
				each_value_2 = /*category*/ ctx[4]?.subcategories || [];
				validate_each_argument(each_value_2);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_2(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(select1, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_2.length;
			}

			if (!current || dirty & /*category_id, $menu, undefined*/ 9 && select1_disabled_value !== (select1_disabled_value = !/*category_id*/ ctx[0])) {
				prop_dev(select1, "disabled", select1_disabled_value);
			}

			if (dirty & /*subcategory_id, category, undefined*/ 18) {
				select_option(select1, /*subcategory_id*/ ctx[1]);
			}

			if (dirty & /*filtered_menu*/ 32) {
				each_value = /*filtered_menu*/ ctx[5].categories;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$5(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$5(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(t5.parentNode, t5);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!/*filtered_menu*/ ctx[5].categories.length && (/*query*/ ctx[2] || /*category_id*/ ctx[0] || /*subcategory_id*/ ctx[1])) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$a(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks_2, detaching);
			destroy_each(each_blocks_1, detaching);
			if (detaching) detach_dev(t4);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t5);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$f($$self, $$props, $$invalidate) {
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(3, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ItemsEdit', slots, []);
	let category_id, subcategory_id, category, subcategory, query = '';
	let filtered_menu;

	function apply_filters(category_id, subcategory_id, query) {
		if (!$menu.categories.find(c => c.id == category_id)?.subcategories.find(sc => sc.id == subcategory_id)) subcategory_id = undefined;
		$$invalidate(5, filtered_menu = JSON.parse(JSON.stringify($menu)));
		if (category_id) $$invalidate(5, filtered_menu.categories = filtered_menu.categories.filter(c => c.id == category_id), filtered_menu);

		if (subcategory_id) $$invalidate(
			5,
			filtered_menu.categories = filtered_menu.categories.map(c => c.id != category_id
			? c
			: {
					...c,
					subcategories: c.subcategories.filter(sc => sc.id == subcategory_id)
				}),
			filtered_menu
		);

		if (query) {
			function includes_arr(text, arr) {
				for (let item of arr) if (!text.includes(item)) return 0;
				return 1;
			}

			filtered_menu.categories.forEach(c => {
				c.subcategories.forEach(sc => {
					sc.items = sc.items.filter(item => includes_arr(minify_text(item.name.replaceAll(' ', '')), minify_text(query).split(' ')));
				});

				c.subcategories = c.subcategories.filter(sc => sc.items.length);
			});

			$$invalidate(5, filtered_menu.categories = filtered_menu.categories.filter(c => c.subcategories.length), filtered_menu);
		}
	}

	function clear_filters() {
		$$invalidate(2, query = '');
		$$invalidate(0, category_id = undefined);
		$$invalidate(1, subcategory_id = undefined);
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ItemsEdit> was created with unknown prop '${key}'`);
	});

	function input_input_handler() {
		query = this.value;
		$$invalidate(2, query);
	}

	function select0_change_handler() {
		category_id = select_value(this);
		$$invalidate(0, category_id);
	}

	function select1_change_handler() {
		subcategory_id = select_value(this);
		$$invalidate(1, subcategory_id);
		(($$invalidate(4, category), $$invalidate(3, $menu)), $$invalidate(0, category_id));
	}

	$$self.$capture_state = () => ({
		SubcategoryTable,
		menu,
		minify_text,
		category_id,
		subcategory_id,
		category,
		subcategory,
		query,
		filtered_menu,
		apply_filters,
		clear_filters,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('category_id' in $$props) $$invalidate(0, category_id = $$props.category_id);
		if ('subcategory_id' in $$props) $$invalidate(1, subcategory_id = $$props.subcategory_id);
		if ('category' in $$props) $$invalidate(4, category = $$props.category);
		if ('subcategory' in $$props) $$invalidate(6, subcategory = $$props.subcategory);
		if ('query' in $$props) $$invalidate(2, query = $$props.query);
		if ('filtered_menu' in $$props) $$invalidate(5, filtered_menu = $$props.filtered_menu);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*category_id, subcategory_id, query*/ 7) {
			apply_filters(category_id, subcategory_id, query);
		}

		if ($$self.$$.dirty & /*$menu, category_id*/ 9) {
			$$invalidate(4, category = $menu.categories.find(c => c.id == category_id));
		}

		if ($$self.$$.dirty & /*category, subcategory_id*/ 18) {
			$$invalidate(6, subcategory = category?.subcategories.find(sc => sc.id == subcategory_id));
		}
	};

	return [
		category_id,
		subcategory_id,
		query,
		$menu,
		category,
		filtered_menu,
		subcategory,
		clear_filters,
		input_input_handler,
		select0_change_handler,
		select1_change_handler
	];
}

class ItemsEdit extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ItemsEdit",
			options,
			id: create_fragment$f.name
		});
	}
}

/* web/components/CategoryModal.svelte generated by Svelte v3.59.2 */
const file$e = "web/components/CategoryModal.svelte";

// (1:0) <Modal {show} on:close={close}>
function create_default_slot$5(ctx) {
	let h2;

	let t0_value = (/*category*/ ctx[1]
	? `Categoria: ${/*category*/ ctx[1].name}`
	: 'Criando uma categoria') + "";

	let t0;
	let t1;
	let form_1;
	let label;
	let t2;
	let input;
	let t3;
	let button0;

	let t4_value = (/*l_submitting*/ ctx[2]
	? '...'
	: /*category*/ ctx[1] ? 'Editar' : 'Criar') + "";

	let t4;
	let t5;
	let button1;
	let t6;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			form_1 = element("form");
			label = element("label");
			t2 = text("Nome: ");
			input = element("input");
			t3 = space();
			button0 = element("button");
			t4 = text(t4_value);
			t5 = space();
			button1 = element("button");
			t6 = text("Cancelar");
			attr_dev(h2, "class", "special tac");
			add_location(h2, file$e, 1, 2, 34);
			input.required = true;
			add_location(input, file$e, 4, 18, 162);
			attr_dev(label, "class", "svelte-1mya8io");
			add_location(label, file$e, 4, 4, 148);
			attr_dev(button0, "class", "grn");
			button0.disabled = /*l_submitting*/ ctx[2];
			add_location(button0, file$e, 6, 4, 218);
			attr_dev(button1, "class", "red");
			set_style(button1, "margin-top", "10px");
			button1.disabled = /*l_submitting*/ ctx[2];
			add_location(button1, file$e, 7, 4, 352);
			add_location(form_1, file$e, 3, 2, 137);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, form_1, anchor);
			append_dev(form_1, label);
			append_dev(label, t2);
			append_dev(label, input);
			set_input_value(input, /*form*/ ctx[3].name);
			append_dev(form_1, t3);
			append_dev(form_1, button0);
			append_dev(button0, t4);
			append_dev(form_1, t5);
			append_dev(form_1, button1);
			append_dev(button1, t6);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[6]),
					listen_dev(button0, "click", /*submit*/ ctx[5], false, false, false, false),
					listen_dev(button1, "click", /*close*/ ctx[4], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*category*/ 2 && t0_value !== (t0_value = (/*category*/ ctx[1]
			? `Categoria: ${/*category*/ ctx[1].name}`
			: 'Criando uma categoria') + "")) set_data_dev(t0, t0_value);

			if (dirty & /*form*/ 8 && input.value !== /*form*/ ctx[3].name) {
				set_input_value(input, /*form*/ ctx[3].name);
			}

			if (dirty & /*l_submitting, category*/ 6 && t4_value !== (t4_value = (/*l_submitting*/ ctx[2]
			? '...'
			: /*category*/ ctx[1] ? 'Editar' : 'Criar') + "")) set_data_dev(t4, t4_value);

			if (dirty & /*l_submitting*/ 4) {
				prop_dev(button0, "disabled", /*l_submitting*/ ctx[2]);
			}

			if (dirty & /*l_submitting*/ 4) {
				prop_dev(button1, "disabled", /*l_submitting*/ ctx[2]);
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
		id: create_default_slot$5.name,
		type: "slot",
		source: "(1:0) <Modal {show} on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$e(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				show: /*show*/ ctx[0],
				$$slots: { default: [create_default_slot$5] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	modal.$on("close", /*close*/ ctx[4]);

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const modal_changes = {};
			if (dirty & /*show*/ 1) modal_changes.show = /*show*/ ctx[0];

			if (dirty & /*$$scope, l_submitting, category, form*/ 270) {
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
		id: create_fragment$e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$e($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CategoryModal', slots, []);
	let { show, category } = $$props;
	let l_submitting;
	let form;

	function close() {
		$$invalidate(0, show = false);
	}

	async function submit() {
		$$invalidate(2, l_submitting = true);
		if (category) await edit_category(category.id, form); else await create_category(form);
		close();
	}

	function mount() {
		$$invalidate(2, l_submitting = false);
		$$invalidate(3, form = { name: category?.name });
	}

	$$self.$$.on_mount.push(function () {
		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<CategoryModal> was created without expected prop 'show'");
		}

		if (category === undefined && !('category' in $$props || $$self.$$.bound[$$self.$$.props['category']])) {
			console.warn("<CategoryModal> was created without expected prop 'category'");
		}
	});

	const writable_props = ['show', 'category'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CategoryModal> was created with unknown prop '${key}'`);
	});

	function input_input_handler() {
		form.name = this.value;
		$$invalidate(3, form);
	}

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('category' in $$props) $$invalidate(1, category = $$props.category);
	};

	$$self.$capture_state = () => ({
		Modal,
		create_category,
		edit_category,
		show,
		category,
		l_submitting,
		form,
		close,
		submit,
		mount
	});

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('category' in $$props) $$invalidate(1, category = $$props.category);
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

	return [show, category, l_submitting, form, close, submit, input_input_handler];
}

class CategoryModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$e, create_fragment$e, safe_not_equal, { show: 0, category: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CategoryModal",
			options,
			id: create_fragment$e.name
		});
	}

	get show() {
		throw new Error("<CategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<CategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get category() {
		throw new Error("<CategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set category(value) {
		throw new Error("<CategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/components/SubcategoryModal.svelte generated by Svelte v3.59.2 */
const file$d = "web/components/SubcategoryModal.svelte";

// (1:0) {#if show}
function create_if_block$9(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				show: /*show*/ ctx[0],
				$$slots: { default: [create_default_slot$4] },
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
			if (dirty & /*show*/ 1) modal_changes.show = /*show*/ ctx[0];

			if (dirty & /*$$scope, l_submitting, subcategory, form*/ 526) {
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
		id: create_if_block$9.name,
		type: "if",
		source: "(1:0) {#if show}",
		ctx
	});

	return block;
}

// (2:2) <Modal {show} on:close={close}>
function create_default_slot$4(ctx) {
	let h2;

	let t0_value = (/*subcategory*/ ctx[1]
	? `Subcategoria: ${/*subcategory*/ ctx[1].name}`
	: 'Criando uma Subcategoria') + "";

	let t0;
	let t1;
	let form_1;
	let label;
	let t2;
	let input;
	let t3;
	let button0;

	let t4_value = (/*l_submitting*/ ctx[2]
	? '...'
	: /*subcategory*/ ctx[1] ? 'Editar' : 'Criar') + "";

	let t4;
	let t5;
	let button1;
	let t6;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			form_1 = element("form");
			label = element("label");
			t2 = text("Nome: ");
			input = element("input");
			t3 = space();
			button0 = element("button");
			t4 = text(t4_value);
			t5 = space();
			button1 = element("button");
			t6 = text("Cancelar");
			attr_dev(h2, "class", "special tac");
			add_location(h2, file$d, 2, 4, 49);
			input.required = true;
			add_location(input, file$d, 5, 20, 193);
			attr_dev(label, "class", "svelte-1mya8io");
			add_location(label, file$d, 5, 6, 179);
			attr_dev(button0, "class", "grn");
			button0.disabled = /*l_submitting*/ ctx[2];
			add_location(button0, file$d, 7, 6, 251);
			attr_dev(button1, "class", "red");
			set_style(button1, "margin-top", "10px");
			button1.disabled = /*l_submitting*/ ctx[2];
			add_location(button1, file$d, 8, 6, 390);
			add_location(form_1, file$d, 4, 4, 166);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, form_1, anchor);
			append_dev(form_1, label);
			append_dev(label, t2);
			append_dev(label, input);
			set_input_value(input, /*form*/ ctx[3].name);
			append_dev(form_1, t3);
			append_dev(form_1, button0);
			append_dev(button0, t4);
			append_dev(form_1, t5);
			append_dev(form_1, button1);
			append_dev(button1, t6);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[7]),
					listen_dev(button0, "click", /*submit*/ ctx[5], false, false, false, false),
					listen_dev(button1, "click", /*close*/ ctx[4], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*subcategory*/ 2 && t0_value !== (t0_value = (/*subcategory*/ ctx[1]
			? `Subcategoria: ${/*subcategory*/ ctx[1].name}`
			: 'Criando uma Subcategoria') + "")) set_data_dev(t0, t0_value);

			if (dirty & /*form*/ 8 && input.value !== /*form*/ ctx[3].name) {
				set_input_value(input, /*form*/ ctx[3].name);
			}

			if (dirty & /*l_submitting, subcategory*/ 6 && t4_value !== (t4_value = (/*l_submitting*/ ctx[2]
			? '...'
			: /*subcategory*/ ctx[1] ? 'Editar' : 'Criar') + "")) set_data_dev(t4, t4_value);

			if (dirty & /*l_submitting*/ 4) {
				prop_dev(button0, "disabled", /*l_submitting*/ ctx[2]);
			}

			if (dirty & /*l_submitting*/ 4) {
				prop_dev(button1, "disabled", /*l_submitting*/ ctx[2]);
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
		id: create_default_slot$4.name,
		type: "slot",
		source: "(2:2) <Modal {show} on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$d(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block$9(ctx);

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
					if_block = create_if_block$9(ctx);
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
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$d($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('SubcategoryModal', slots, []);
	let { show, subcategory, category_id } = $$props;
	let l_submitting;
	let form;

	function close() {
		$$invalidate(0, show = false);
	}

	async function submit() {
		$$invalidate(2, l_submitting = true);
		if (subcategory) await edit_subcategory(subcategory.id, form); else await create_subcategory(category_id, form);
		close();
	}

	function mount() {
		$$invalidate(2, l_submitting = false);
		$$invalidate(3, form = { name: subcategory?.name });
	}

	$$self.$$.on_mount.push(function () {
		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<SubcategoryModal> was created without expected prop 'show'");
		}

		if (subcategory === undefined && !('subcategory' in $$props || $$self.$$.bound[$$self.$$.props['subcategory']])) {
			console.warn("<SubcategoryModal> was created without expected prop 'subcategory'");
		}

		if (category_id === undefined && !('category_id' in $$props || $$self.$$.bound[$$self.$$.props['category_id']])) {
			console.warn("<SubcategoryModal> was created without expected prop 'category_id'");
		}
	});

	const writable_props = ['show', 'subcategory', 'category_id'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SubcategoryModal> was created with unknown prop '${key}'`);
	});

	function input_input_handler() {
		form.name = this.value;
		$$invalidate(3, form);
	}

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('subcategory' in $$props) $$invalidate(1, subcategory = $$props.subcategory);
		if ('category_id' in $$props) $$invalidate(6, category_id = $$props.category_id);
	};

	$$self.$capture_state = () => ({
		Modal,
		create_subcategory,
		edit_subcategory,
		show,
		subcategory,
		category_id,
		l_submitting,
		form,
		close,
		submit,
		mount
	});

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('subcategory' in $$props) $$invalidate(1, subcategory = $$props.subcategory);
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

	return [
		show,
		subcategory,
		l_submitting,
		form,
		close,
		submit,
		category_id,
		input_input_handler
	];
}

class SubcategoryModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$d, create_fragment$d, safe_not_equal, { show: 0, subcategory: 1, category_id: 6 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SubcategoryModal",
			options,
			id: create_fragment$d.name
		});
	}

	get show() {
		throw new Error("<SubcategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<SubcategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get subcategory() {
		throw new Error("<SubcategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set subcategory(value) {
		throw new Error("<SubcategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get category_id() {
		throw new Error("<SubcategoryModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set category_id(value) {
		throw new Error("<SubcategoryModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/components/SubcategoryCard.svelte generated by Svelte v3.59.2 */
const file$c = "web/components/SubcategoryCard.svelte";

// (10:0) <Modal bind:show={m_options}>
function create_default_slot_1$1(ctx) {
	let p;
	let t0;
	let t1_value = /*subcategory*/ ctx[0].name + "";
	let t1;
	let t2;
	let div;
	let button0;
	let t3;
	let button1;
	let t4;
	let button2;
	let current;

	button0 = new Button({
			props: {
				class: "blu",
				i: "edit",
				t: "Editar",
				action: /*edit*/ ctx[7]
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				class: "red",
				i: "delete",
				t: "Excluir",
				action: /*_delete*/ ctx[8]
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				i: "close",
				t: "Cancelar",
				action: /*func*/ ctx[12]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			p = element("p");
			t0 = text("Subcategoria: ");
			t1 = text(t1_value);
			t2 = space();
			div = element("div");
			create_component(button0.$$.fragment);
			t3 = space();
			create_component(button1.$$.fragment);
			t4 = space();
			create_component(button2.$$.fragment);
			attr_dev(p, "class", "special svelte-huuhgf");
			add_location(p, file$c, 10, 2, 421);
			attr_dev(div, "class", "btn-col");
			add_location(div, file$c, 11, 2, 481);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t0);
			append_dev(p, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, div, anchor);
			mount_component(button0, div, null);
			append_dev(div, t3);
			mount_component(button1, div, null);
			append_dev(div, t4);
			mount_component(button2, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*subcategory*/ 1) && t1_value !== (t1_value = /*subcategory*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
			const button2_changes = {};
			if (dirty & /*m_options*/ 4) button2_changes.action = /*func*/ ctx[12];
			button2.$set(button2_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(button2.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(button2.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div);
			destroy_component(button0);
			destroy_component(button1);
			destroy_component(button2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1$1.name,
		type: "slot",
		source: "(10:0) <Modal bind:show={m_options}>",
		ctx
	});

	return block;
}

// (20:0) {#if l_deleting}
function create_if_block$8(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				show: true,
				$$slots: { default: [create_default_slot$3] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
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
		id: create_if_block$8.name,
		type: "if",
		source: "(20:0) {#if l_deleting}",
		ctx
	});

	return block;
}

// (21:2) <Modal show={true}>
function create_default_slot$3(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Excluindo...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$3.name,
		type: "slot",
		source: "(21:2) <Modal show={true}>",
		ctx
	});

	return block;
}

function create_fragment$c(ctx) {
	let li;
	let p;
	let t0_value = (/*subcategory*/ ctx[0].name || 'Sem nome') + "";
	let t0;
	let t1;
	let button0;
	let t2;
	let button1;
	let t3;
	let button2;
	let t4;
	let modal;
	let updating_show;
	let t5;
	let subcategorymodal;
	let updating_show_1;
	let t6;
	let if_block_anchor;
	let current;
	let mounted;
	let dispose;

	button0 = new Button({
			props: {
				i: "settings",
				action: /*show_options*/ ctx[6]
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				i: "keyboard_arrow_up",
				action: /*move_up*/ ctx[9],
				disabled: /*i*/ ctx[4] == 0
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				i: "keyboard_arrow_down",
				action: /*move_down*/ ctx[10],
				disabled: /*i*/ ctx[4] == /*category*/ ctx[3].subcategories.length - 1
			},
			$$inline: true
		});

	function modal_show_binding(value) {
		/*modal_show_binding*/ ctx[13](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot_1$1] },
		$$scope: { ctx }
	};

	if (/*m_options*/ ctx[2] !== void 0) {
		modal_props.show = /*m_options*/ ctx[2];
	}

	modal = new Modal({ props: modal_props, $$inline: true });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding));

	function subcategorymodal_show_binding(value) {
		/*subcategorymodal_show_binding*/ ctx[14](value);
	}

	let subcategorymodal_props = {
		subcategory: /*subcategory*/ ctx[0],
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
	let if_block = /*l_deleting*/ ctx[5] && create_if_block$8(ctx);

	const block = {
		c: function create() {
			li = element("li");
			p = element("p");
			t0 = text(t0_value);
			t1 = space();
			create_component(button0.$$.fragment);
			t2 = space();
			create_component(button1.$$.fragment);
			t3 = space();
			create_component(button2.$$.fragment);
			t4 = space();
			create_component(modal.$$.fragment);
			t5 = space();
			create_component(subcategorymodal.$$.fragment);
			t6 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			attr_dev(p, "class", "cp fg");
			add_location(p, file$c, 2, 2, 76);
			attr_dev(li, "class", "row svelte-huuhgf");
			add_location(li, file$c, 1, 0, 57);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, p);
			append_dev(p, t0);
			append_dev(li, t1);
			mount_component(button0, li, null);
			append_dev(li, t2);
			mount_component(button1, li, null);
			append_dev(li, t3);
			mount_component(button2, li, null);
			insert_dev(target, t4, anchor);
			mount_component(modal, target, anchor);
			insert_dev(target, t5, anchor);
			mount_component(subcategorymodal, target, anchor);
			insert_dev(target, t6, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = listen_dev(p, "click", /*show_options*/ ctx[6], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*subcategory*/ 1) && t0_value !== (t0_value = (/*subcategory*/ ctx[0].name || 'Sem nome') + "")) set_data_dev(t0, t0_value);
			const button1_changes = {};
			if (dirty & /*i*/ 16) button1_changes.disabled = /*i*/ ctx[4] == 0;
			button1.$set(button1_changes);
			const button2_changes = {};
			if (dirty & /*i, category*/ 24) button2_changes.disabled = /*i*/ ctx[4] == /*category*/ ctx[3].subcategories.length - 1;
			button2.$set(button2_changes);
			const modal_changes = {};

			if (dirty & /*$$scope, m_options, subcategory*/ 65541) {
				modal_changes.$$scope = { dirty, ctx };
			}

			if (!updating_show && dirty & /*m_options*/ 4) {
				updating_show = true;
				modal_changes.show = /*m_options*/ ctx[2];
				add_flush_callback(() => updating_show = false);
			}

			modal.$set(modal_changes);
			const subcategorymodal_changes = {};
			if (dirty & /*subcategory*/ 1) subcategorymodal_changes.subcategory = /*subcategory*/ ctx[0];
			if (dirty & /*subcategory*/ 1) subcategorymodal_changes.category_id = /*subcategory*/ ctx[0].category_id;

			if (!updating_show_1 && dirty & /*m_edit*/ 2) {
				updating_show_1 = true;
				subcategorymodal_changes.show = /*m_edit*/ ctx[1];
				add_flush_callback(() => updating_show_1 = false);
			}

			subcategorymodal.$set(subcategorymodal_changes);

			if (/*l_deleting*/ ctx[5]) {
				if (if_block) {
					if (dirty & /*l_deleting*/ 32) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$8(ctx);
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
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(button2.$$.fragment, local);
			transition_in(modal.$$.fragment, local);
			transition_in(subcategorymodal.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(button2.$$.fragment, local);
			transition_out(modal.$$.fragment, local);
			transition_out(subcategorymodal.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(button0);
			destroy_component(button1);
			destroy_component(button2);
			if (detaching) detach_dev(t4);
			destroy_component(modal, detaching);
			if (detaching) detach_dev(t5);
			destroy_component(subcategorymodal, detaching);
			if (detaching) detach_dev(t6);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
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
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(11, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('SubcategoryCard', slots, []);
	let { subcategory } = $$props;
	let m_edit, m_options;
	let category, i;
	let l_deleting;

	function show_options() {
		$$invalidate(2, m_options = 1);
	}

	function edit() {
		$$invalidate(2, m_options = 0);
		$$invalidate(1, m_edit = 1);
	}

	async function _delete() {
		$$invalidate(2, m_options = 0);
		if (!confirm(`Certeza que quer excluir a subcategoria ${subcategory.name}?`)) return;
		$$invalidate(5, l_deleting = true);
		await delete_subcategory(subcategory.id);
		$$invalidate(5, l_deleting = false);
	}

	function move_up() {
		move_subcategory_up(subcategory.id);
	}

	function move_down() {
		move_subcategory_down(subcategory.id);
	}

	function update_i() {
		$$invalidate(3, category = $menu.categories.find(c => c.subcategories?.find(sc => sc.id == subcategory.id)));
		$$invalidate(4, i = category.subcategories.findIndex(sc => sc.id == subcategory.id));
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

	const func = _ => $$invalidate(2, m_options = false);

	function modal_show_binding(value) {
		m_options = value;
		$$invalidate(2, m_options);
	}

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
		Modal,
		delete_subcategory,
		move_subcategory_up,
		move_subcategory_down,
		menu,
		subcategory,
		m_edit,
		m_options,
		category,
		i,
		l_deleting,
		show_options,
		edit,
		_delete,
		move_up,
		move_down,
		update_i,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('subcategory' in $$props) $$invalidate(0, subcategory = $$props.subcategory);
		if ('m_edit' in $$props) $$invalidate(1, m_edit = $$props.m_edit);
		if ('m_options' in $$props) $$invalidate(2, m_options = $$props.m_options);
		if ('category' in $$props) $$invalidate(3, category = $$props.category);
		if ('i' in $$props) $$invalidate(4, i = $$props.i);
		if ('l_deleting' in $$props) $$invalidate(5, l_deleting = $$props.l_deleting);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$menu*/ 2048) {
			if ($menu) update_i();
		}
	};

	return [
		subcategory,
		m_edit,
		m_options,
		category,
		i,
		l_deleting,
		show_options,
		edit,
		_delete,
		move_up,
		move_down,
		$menu,
		func,
		modal_show_binding,
		subcategorymodal_show_binding
	];
}

class SubcategoryCard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$c, create_fragment$c, safe_not_equal, { subcategory: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SubcategoryCard",
			options,
			id: create_fragment$c.name
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
const file$b = "web/components/CategoryCard.svelte";

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[17] = list[i];
	return child_ctx;
}

// (13:4) {#each category.subcategories || [] as subcategory}
function create_each_block$4(ctx) {
	let subcategorycard;
	let current;

	subcategorycard = new SubcategoryCard({
			props: { subcategory: /*subcategory*/ ctx[17] },
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
			if (dirty & /*category*/ 1) subcategorycard_changes.subcategory = /*subcategory*/ ctx[17];
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
		id: create_each_block$4.name,
		type: "each",
		source: "(13:4) {#each category.subcategories || [] as subcategory}",
		ctx
	});

	return block;
}

// (19:0) <Modal bind:show={m_options}>
function create_default_slot_1(ctx) {
	let p;
	let t0;
	let t1_value = /*category*/ ctx[0].name + "";
	let t1;
	let t2;
	let div;
	let button0;
	let t3;
	let button1;
	let t4;
	let button2;
	let t5;
	let button3;
	let current;

	button0 = new Button({
			props: {
				class: "grn",
				i: "add",
				t: "Subcategoria",
				action: /*create_sub*/ ctx[7]
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				class: "blu",
				i: "edit",
				t: "Editar",
				action: /*edit*/ ctx[8]
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				class: "red",
				i: "delete",
				t: "Excluir",
				action: /*_delete*/ ctx[10]
			},
			$$inline: true
		});

	button3 = new Button({
			props: {
				i: "close",
				t: "Cancelar",
				action: /*func*/ ctx[13]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			p = element("p");
			t0 = text("Categoria: ");
			t1 = text(t1_value);
			t2 = space();
			div = element("div");
			create_component(button0.$$.fragment);
			t3 = space();
			create_component(button1.$$.fragment);
			t4 = space();
			create_component(button2.$$.fragment);
			t5 = space();
			create_component(button3.$$.fragment);
			attr_dev(p, "class", "special svelte-199o48f");
			add_location(p, file$b, 19, 2, 527);
			attr_dev(div, "class", "btn-col");
			add_location(div, file$b, 20, 2, 581);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t0);
			append_dev(p, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, div, anchor);
			mount_component(button0, div, null);
			append_dev(div, t3);
			mount_component(button1, div, null);
			append_dev(div, t4);
			mount_component(button2, div, null);
			append_dev(div, t5);
			mount_component(button3, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*category*/ 1) && t1_value !== (t1_value = /*category*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
			const button3_changes = {};
			if (dirty & /*m_options*/ 16) button3_changes.action = /*func*/ ctx[13];
			button3.$set(button3_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(button2.$$.fragment, local);
			transition_in(button3.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(button2.$$.fragment, local);
			transition_out(button3.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div);
			destroy_component(button0);
			destroy_component(button1);
			destroy_component(button2);
			destroy_component(button3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(19:0) <Modal bind:show={m_options}>",
		ctx
	});

	return block;
}

// (31:0) {#if l_deleting}
function create_if_block$7(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				show: true,
				$$slots: { default: [create_default_slot$2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
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
		id: create_if_block$7.name,
		type: "if",
		source: "(31:0) {#if l_deleting}",
		ctx
	});

	return block;
}

// (32:2) <Modal show={true}>
function create_default_slot$2(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Excluindo...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$2.name,
		type: "slot",
		source: "(32:2) <Modal show={true}>",
		ctx
	});

	return block;
}

function create_fragment$b(ctx) {
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
	let ul;
	let t5;
	let modal;
	let updating_show;
	let t6;
	let categorymodal;
	let updating_show_1;
	let t7;
	let subcategorymodal;
	let updating_show_2;
	let t8;
	let if_block_anchor;
	let current;

	button0 = new Button({
			props: {
				i: "settings",
				action: /*show_options*/ ctx[9]
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				i: "keyboard_arrow_up",
				action: /*move_up*/ ctx[11],
				disabled: /*i*/ ctx[6] == 0
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				i: "keyboard_arrow_down",
				action: /*move_down*/ ctx[12],
				disabled: /*i*/ ctx[6] == /*$menu*/ ctx[1].categories.length - 1
			},
			$$inline: true
		});

	let each_value = /*category*/ ctx[0].subcategories || [];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	function modal_show_binding(value) {
		/*modal_show_binding*/ ctx[14](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot_1] },
		$$scope: { ctx }
	};

	if (/*m_options*/ ctx[4] !== void 0) {
		modal_props.show = /*m_options*/ ctx[4];
	}

	modal = new Modal({ props: modal_props, $$inline: true });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding));

	function categorymodal_show_binding(value) {
		/*categorymodal_show_binding*/ ctx[15](value);
	}

	let categorymodal_props = { category: /*category*/ ctx[0] };

	if (/*m_edit*/ ctx[2] !== void 0) {
		categorymodal_props.show = /*m_edit*/ ctx[2];
	}

	categorymodal = new CategoryModal({
			props: categorymodal_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind(categorymodal, 'show', categorymodal_show_binding));

	function subcategorymodal_show_binding(value) {
		/*subcategorymodal_show_binding*/ ctx[16](value);
	}

	let subcategorymodal_props = { category_id: /*category*/ ctx[0].id };

	if (/*m_subcategory*/ ctx[3] !== void 0) {
		subcategorymodal_props.show = /*m_subcategory*/ ctx[3];
	}

	subcategorymodal = new SubcategoryModal({
			props: subcategorymodal_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind(subcategorymodal, 'show', subcategorymodal_show_binding));
	let if_block = /*l_deleting*/ ctx[5] && create_if_block$7(ctx);

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
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t5 = space();
			create_component(modal.$$.fragment);
			t6 = space();
			create_component(categorymodal.$$.fragment);
			t7 = space();
			create_component(subcategorymodal.$$.fragment);
			t8 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			add_location(h2, file$b, 2, 4, 59);
			attr_dev(div0, "class", "row jce");
			add_location(div0, file$b, 4, 4, 91);
			attr_dev(div1, "class", "row toprow jcsb");
			add_location(div1, file$b, 1, 2, 25);
			add_location(ul, file$b, 11, 2, 366);
			attr_dev(div2, "class", "category svelte-199o48f");
			add_location(div2, file$b, 0, 0, 0);
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
			append_dev(div2, t4);
			append_dev(div2, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(ul, null);
				}
			}

			insert_dev(target, t5, anchor);
			mount_component(modal, target, anchor);
			insert_dev(target, t6, anchor);
			mount_component(categorymodal, target, anchor);
			insert_dev(target, t7, anchor);
			mount_component(subcategorymodal, target, anchor);
			insert_dev(target, t8, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*category*/ 1) && t0_value !== (t0_value = /*category*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
			const button1_changes = {};
			if (dirty & /*i*/ 64) button1_changes.disabled = /*i*/ ctx[6] == 0;
			button1.$set(button1_changes);
			const button2_changes = {};
			if (dirty & /*i, $menu*/ 66) button2_changes.disabled = /*i*/ ctx[6] == /*$menu*/ ctx[1].categories.length - 1;
			button2.$set(button2_changes);

			if (dirty & /*category*/ 1) {
				each_value = /*category*/ ctx[0].subcategories || [];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$4(child_ctx);
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

			const modal_changes = {};

			if (dirty & /*$$scope, m_options, category*/ 1048593) {
				modal_changes.$$scope = { dirty, ctx };
			}

			if (!updating_show && dirty & /*m_options*/ 16) {
				updating_show = true;
				modal_changes.show = /*m_options*/ ctx[4];
				add_flush_callback(() => updating_show = false);
			}

			modal.$set(modal_changes);
			const categorymodal_changes = {};
			if (dirty & /*category*/ 1) categorymodal_changes.category = /*category*/ ctx[0];

			if (!updating_show_1 && dirty & /*m_edit*/ 4) {
				updating_show_1 = true;
				categorymodal_changes.show = /*m_edit*/ ctx[2];
				add_flush_callback(() => updating_show_1 = false);
			}

			categorymodal.$set(categorymodal_changes);
			const subcategorymodal_changes = {};
			if (dirty & /*category*/ 1) subcategorymodal_changes.category_id = /*category*/ ctx[0].id;

			if (!updating_show_2 && dirty & /*m_subcategory*/ 8) {
				updating_show_2 = true;
				subcategorymodal_changes.show = /*m_subcategory*/ ctx[3];
				add_flush_callback(() => updating_show_2 = false);
			}

			subcategorymodal.$set(subcategorymodal_changes);

			if (/*l_deleting*/ ctx[5]) {
				if (if_block) {
					if (dirty & /*l_deleting*/ 32) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$7(ctx);
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
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(button2.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(modal.$$.fragment, local);
			transition_in(categorymodal.$$.fragment, local);
			transition_in(subcategorymodal.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(button2.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(modal.$$.fragment, local);
			transition_out(categorymodal.$$.fragment, local);
			transition_out(subcategorymodal.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_component(button0);
			destroy_component(button1);
			destroy_component(button2);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t5);
			destroy_component(modal, detaching);
			if (detaching) detach_dev(t6);
			destroy_component(categorymodal, detaching);
			if (detaching) detach_dev(t7);
			destroy_component(subcategorymodal, detaching);
			if (detaching) detach_dev(t8);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
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
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(1, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CategoryCard', slots, []);
	let { category } = $$props;
	let m_edit, m_subcategory, m_options;
	let l_deleting;
	let i;

	function create_sub() {
		$$invalidate(4, m_options = 0);
		$$invalidate(3, m_subcategory = 1);
	}

	function edit() {
		$$invalidate(4, m_options = 0);
		$$invalidate(2, m_edit = 1);
	}

	function show_options() {
		$$invalidate(4, m_options = 1);
	}

	async function _delete() {
		$$invalidate(4, m_options = 0);
		if (!confirm(`Certeza que quer excluir a categoria ${category.name}?`)) return;
		$$invalidate(5, l_deleting = true);
		await delete_category(category.id);
		$$invalidate(5, l_deleting = false);
	}

	function move_up() {
		move_category_up(category.id);
	}

	function move_down() {
		move_category_down(category.id);
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

	const func = _ => $$invalidate(4, m_options = false);

	function modal_show_binding(value) {
		m_options = value;
		$$invalidate(4, m_options);
	}

	function categorymodal_show_binding(value) {
		m_edit = value;
		$$invalidate(2, m_edit);
	}

	function subcategorymodal_show_binding(value) {
		m_subcategory = value;
		$$invalidate(3, m_subcategory);
	}

	$$self.$$set = $$props => {
		if ('category' in $$props) $$invalidate(0, category = $$props.category);
	};

	$$self.$capture_state = () => ({
		SubcategoryModal,
		SubcategoryCard,
		CategoryModal,
		Button,
		Modal,
		delete_category,
		move_category_up,
		move_category_down,
		menu,
		category,
		m_edit,
		m_subcategory,
		m_options,
		l_deleting,
		i,
		create_sub,
		edit,
		show_options,
		_delete,
		move_up,
		move_down,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('category' in $$props) $$invalidate(0, category = $$props.category);
		if ('m_edit' in $$props) $$invalidate(2, m_edit = $$props.m_edit);
		if ('m_subcategory' in $$props) $$invalidate(3, m_subcategory = $$props.m_subcategory);
		if ('m_options' in $$props) $$invalidate(4, m_options = $$props.m_options);
		if ('l_deleting' in $$props) $$invalidate(5, l_deleting = $$props.l_deleting);
		if ('i' in $$props) $$invalidate(6, i = $$props.i);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$menu, category*/ 3) {
			$$invalidate(6, i = $menu?.categories.findIndex(c => c.id == category.id));
		}
	};

	return [
		category,
		$menu,
		m_edit,
		m_subcategory,
		m_options,
		l_deleting,
		i,
		create_sub,
		edit,
		show_options,
		_delete,
		move_up,
		move_down,
		func,
		modal_show_binding,
		categorymodal_show_binding,
		subcategorymodal_show_binding
	];
}

class CategoryCard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$b, create_fragment$b, safe_not_equal, { category: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CategoryCard",
			options,
			id: create_fragment$b.name
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
const file$a = "web/components/MenuModal.svelte";

// (1:0) {#if show}
function create_if_block$6(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				show: /*show*/ ctx[0],
				$$slots: { default: [create_default_slot$1] },
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
			if (dirty & /*show*/ 1) modal_changes.show = /*show*/ ctx[0];

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
		id: create_if_block$6.name,
		type: "if",
		source: "(1:0) {#if show}",
		ctx
	});

	return block;
}

// (2:2) <Modal {show} on:close={close}>
function create_default_slot$1(ctx) {
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
	let button0;
	let t10_value = (/*l_submitting*/ ctx[1] ? '...' : 'Editar') + "";
	let t10;
	let t11;
	let button1;
	let t12;
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
			button0 = element("button");
			t10 = text(t10_value);
			t11 = space();
			button1 = element("button");
			t12 = text("Cancelar");
			add_location(h2, file$a, 2, 4, 49);
			input0.required = true;
			add_location(input0, file$a, 5, 24, 105);
			attr_dev(label0, "class", "svelte-1mya8io");
			add_location(label0, file$a, 5, 6, 87);
			add_location(input1, file$a, 6, 24, 184);
			attr_dev(label1, "class", "svelte-1mya8io");
			add_location(label1, file$a, 6, 6, 166);
			add_location(input2, file$a, 7, 24, 254);
			attr_dev(label2, "class", "svelte-1mya8io");
			add_location(label2, file$a, 7, 6, 236);
			add_location(input3, file$a, 8, 24, 324);
			attr_dev(label3, "class", "svelte-1mya8io");
			add_location(label3, file$a, 8, 6, 306);
			attr_dev(button0, "class", "grn");
			button0.disabled = /*l_submitting*/ ctx[1];
			add_location(button0, file$a, 10, 6, 377);
			attr_dev(button1, "class", "red");
			set_style(button1, "margin-top", "10px");
			button1.disabled = /*l_submitting*/ ctx[1];
			add_location(button1, file$a, 11, 6, 490);
			add_location(form_1, file$a, 4, 4, 74);
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
			append_dev(form_1, button0);
			append_dev(button0, t10);
			append_dev(form_1, t11);
			append_dev(form_1, button1);
			append_dev(button1, t12);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[5]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[6]),
					listen_dev(input2, "input", /*input2_input_handler*/ ctx[7]),
					listen_dev(input3, "input", /*input3_input_handler*/ ctx[8]),
					listen_dev(button0, "click", /*submit*/ ctx[4], false, false, false, false),
					listen_dev(button1, "click", /*close*/ ctx[3], false, false, false, false)
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

			if (dirty & /*l_submitting*/ 2 && t10_value !== (t10_value = (/*l_submitting*/ ctx[1] ? '...' : 'Editar') + "")) set_data_dev(t10, t10_value);

			if (dirty & /*l_submitting*/ 2) {
				prop_dev(button0, "disabled", /*l_submitting*/ ctx[1]);
			}

			if (dirty & /*l_submitting*/ 2) {
				prop_dev(button1, "disabled", /*l_submitting*/ ctx[1]);
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
		id: create_default_slot$1.name,
		type: "slot",
		source: "(2:2) <Modal {show} on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$a(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block$6(ctx);

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
					if_block = create_if_block$6(ctx);
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
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
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
		await edit_menu(form);
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
		edit_menu,
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
		init(this, options, instance$a, create_fragment$a, safe_not_equal, { show: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MenuModal",
			options,
			id: create_fragment$a.name
		});
	}

	get show() {
		throw new Error("<MenuModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<MenuModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var browser = {};

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157

var canPromise$1 = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then
};

var qrcode = {};

var utils$1 = {};

let toSJISFunction;
const CODEWORDS_COUNT = [
  0, // Not used
  26, 44, 70, 100, 134, 172, 196, 242, 292, 346,
  404, 466, 532, 581, 655, 733, 815, 901, 991, 1085,
  1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185,
  2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706
];

/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */
utils$1.getSymbolSize = function getSymbolSize (version) {
  if (!version) throw new Error('"version" cannot be null or undefined')
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40')
  return version * 4 + 17
};

/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */
utils$1.getSymbolTotalCodewords = function getSymbolTotalCodewords (version) {
  return CODEWORDS_COUNT[version]
};

/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */
utils$1.getBCHDigit = function (data) {
  let digit = 0;

  while (data !== 0) {
    digit++;
    data >>>= 1;
  }

  return digit
};

utils$1.setToSJISFunction = function setToSJISFunction (f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.')
  }

  toSJISFunction = f;
};

utils$1.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined'
};

utils$1.toSJIS = function toSJIS (kanji) {
  return toSJISFunction(kanji)
};

var errorCorrectionLevel = {};

(function (exports) {
	exports.L = { bit: 1 };
	exports.M = { bit: 0 };
	exports.Q = { bit: 3 };
	exports.H = { bit: 2 };

	function fromString (string) {
	  if (typeof string !== 'string') {
	    throw new Error('Param is not a string')
	  }

	  const lcStr = string.toLowerCase();

	  switch (lcStr) {
	    case 'l':
	    case 'low':
	      return exports.L

	    case 'm':
	    case 'medium':
	      return exports.M

	    case 'q':
	    case 'quartile':
	      return exports.Q

	    case 'h':
	    case 'high':
	      return exports.H

	    default:
	      throw new Error('Unknown EC Level: ' + string)
	  }
	}

	exports.isValid = function isValid (level) {
	  return level && typeof level.bit !== 'undefined' &&
	    level.bit >= 0 && level.bit < 4
	};

	exports.from = function from (value, defaultValue) {
	  if (exports.isValid(value)) {
	    return value
	  }

	  try {
	    return fromString(value)
	  } catch (e) {
	    return defaultValue
	  }
	};
} (errorCorrectionLevel));

function BitBuffer$1 () {
  this.buffer = [];
  this.length = 0;
}

BitBuffer$1.prototype = {

  get: function (index) {
    const bufIndex = Math.floor(index / 8);
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1
  },

  put: function (num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1);
    }
  },

  getLengthInBits: function () {
    return this.length
  },

  putBit: function (bit) {
    const bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }

    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
    }

    this.length++;
  }
};

var bitBuffer = BitBuffer$1;

/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */

function BitMatrix$1 (size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0')
  }

  this.size = size;
  this.data = new Uint8Array(size * size);
  this.reservedBit = new Uint8Array(size * size);
}

/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */
BitMatrix$1.prototype.set = function (row, col, value, reserved) {
  const index = row * this.size + col;
  this.data[index] = value;
  if (reserved) this.reservedBit[index] = true;
};

/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */
BitMatrix$1.prototype.get = function (row, col) {
  return this.data[row * this.size + col]
};

/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */
BitMatrix$1.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value;
};

/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */
BitMatrix$1.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col]
};

var bitMatrix = BitMatrix$1;

var alignmentPattern = {};

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */

(function (exports) {
	const getSymbolSize = utils$1.getSymbolSize;

	/**
	 * Calculate the row/column coordinates of the center module of each alignment pattern
	 * for the specified QR Code version.
	 *
	 * The alignment patterns are positioned symmetrically on either side of the diagonal
	 * running from the top left corner of the symbol to the bottom right corner.
	 *
	 * Since positions are simmetrical only half of the coordinates are returned.
	 * Each item of the array will represent in turn the x and y coordinate.
	 * @see {@link getPositions}
	 *
	 * @param  {Number} version QR Code version
	 * @return {Array}          Array of coordinate
	 */
	exports.getRowColCoords = function getRowColCoords (version) {
	  if (version === 1) return []

	  const posCount = Math.floor(version / 7) + 2;
	  const size = getSymbolSize(version);
	  const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
	  const positions = [size - 7]; // Last coord is always (size - 7)

	  for (let i = 1; i < posCount - 1; i++) {
	    positions[i] = positions[i - 1] - intervals;
	  }

	  positions.push(6); // First coord is always 6

	  return positions.reverse()
	};

	/**
	 * Returns an array containing the positions of each alignment pattern.
	 * Each array's element represent the center point of the pattern as (x, y) coordinates
	 *
	 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
	 * and filtering out the items that overlaps with finder pattern
	 *
	 * @example
	 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
	 * The alignment patterns, therefore, are to be centered on (row, column)
	 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
	 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
	 * and are not therefore used for alignment patterns.
	 *
	 * let pos = getPositions(7)
	 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
	 *
	 * @param  {Number} version QR Code version
	 * @return {Array}          Array of coordinates
	 */
	exports.getPositions = function getPositions (version) {
	  const coords = [];
	  const pos = exports.getRowColCoords(version);
	  const posLength = pos.length;

	  for (let i = 0; i < posLength; i++) {
	    for (let j = 0; j < posLength; j++) {
	      // Skip if position is occupied by finder patterns
	      if ((i === 0 && j === 0) || // top-left
	          (i === 0 && j === posLength - 1) || // bottom-left
	          (i === posLength - 1 && j === 0)) { // top-right
	        continue
	      }

	      coords.push([pos[i], pos[j]]);
	    }
	  }

	  return coords
	};
} (alignmentPattern));

var finderPattern = {};

const getSymbolSize = utils$1.getSymbolSize;
const FINDER_PATTERN_SIZE = 7;

/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
finderPattern.getPositions = function getPositions (version) {
  const size = getSymbolSize(version);

  return [
    // top-left
    [0, 0],
    // top-right
    [size - FINDER_PATTERN_SIZE, 0],
    // bottom-left
    [0, size - FINDER_PATTERN_SIZE]
  ]
};

var maskPattern = {};

/**
 * Data mask pattern reference
 * @type {Object}
 */

(function (exports) {
	exports.Patterns = {
	  PATTERN000: 0,
	  PATTERN001: 1,
	  PATTERN010: 2,
	  PATTERN011: 3,
	  PATTERN100: 4,
	  PATTERN101: 5,
	  PATTERN110: 6,
	  PATTERN111: 7
	};

	/**
	 * Weighted penalty scores for the undesirable features
	 * @type {Object}
	 */
	const PenaltyScores = {
	  N1: 3,
	  N2: 3,
	  N3: 40,
	  N4: 10
	};

	/**
	 * Check if mask pattern value is valid
	 *
	 * @param  {Number}  mask    Mask pattern
	 * @return {Boolean}         true if valid, false otherwise
	 */
	exports.isValid = function isValid (mask) {
	  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7
	};

	/**
	 * Returns mask pattern from a value.
	 * If value is not valid, returns undefined
	 *
	 * @param  {Number|String} value        Mask pattern value
	 * @return {Number}                     Valid mask pattern or undefined
	 */
	exports.from = function from (value) {
	  return exports.isValid(value) ? parseInt(value, 10) : undefined
	};

	/**
	* Find adjacent modules in row/column with the same color
	* and assign a penalty value.
	*
	* Points: N1 + i
	* i is the amount by which the number of adjacent modules of the same color exceeds 5
	*/
	exports.getPenaltyN1 = function getPenaltyN1 (data) {
	  const size = data.size;
	  let points = 0;
	  let sameCountCol = 0;
	  let sameCountRow = 0;
	  let lastCol = null;
	  let lastRow = null;

	  for (let row = 0; row < size; row++) {
	    sameCountCol = sameCountRow = 0;
	    lastCol = lastRow = null;

	    for (let col = 0; col < size; col++) {
	      let module = data.get(row, col);
	      if (module === lastCol) {
	        sameCountCol++;
	      } else {
	        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
	        lastCol = module;
	        sameCountCol = 1;
	      }

	      module = data.get(col, row);
	      if (module === lastRow) {
	        sameCountRow++;
	      } else {
	        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
	        lastRow = module;
	        sameCountRow = 1;
	      }
	    }

	    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
	    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
	  }

	  return points
	};

	/**
	 * Find 2x2 blocks with the same color and assign a penalty value
	 *
	 * Points: N2 * (m - 1) * (n - 1)
	 */
	exports.getPenaltyN2 = function getPenaltyN2 (data) {
	  const size = data.size;
	  let points = 0;

	  for (let row = 0; row < size - 1; row++) {
	    for (let col = 0; col < size - 1; col++) {
	      const last = data.get(row, col) +
	        data.get(row, col + 1) +
	        data.get(row + 1, col) +
	        data.get(row + 1, col + 1);

	      if (last === 4 || last === 0) points++;
	    }
	  }

	  return points * PenaltyScores.N2
	};

	/**
	 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
	 * preceded or followed by light area 4 modules wide
	 *
	 * Points: N3 * number of pattern found
	 */
	exports.getPenaltyN3 = function getPenaltyN3 (data) {
	  const size = data.size;
	  let points = 0;
	  let bitsCol = 0;
	  let bitsRow = 0;

	  for (let row = 0; row < size; row++) {
	    bitsCol = bitsRow = 0;
	    for (let col = 0; col < size; col++) {
	      bitsCol = ((bitsCol << 1) & 0x7FF) | data.get(row, col);
	      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;

	      bitsRow = ((bitsRow << 1) & 0x7FF) | data.get(col, row);
	      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
	    }
	  }

	  return points * PenaltyScores.N3
	};

	/**
	 * Calculate proportion of dark modules in entire symbol
	 *
	 * Points: N4 * k
	 *
	 * k is the rating of the deviation of the proportion of dark modules
	 * in the symbol from 50% in steps of 5%
	 */
	exports.getPenaltyN4 = function getPenaltyN4 (data) {
	  let darkCount = 0;
	  const modulesCount = data.data.length;

	  for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];

	  const k = Math.abs(Math.ceil((darkCount * 100 / modulesCount) / 5) - 10);

	  return k * PenaltyScores.N4
	};

	/**
	 * Return mask value at given position
	 *
	 * @param  {Number} maskPattern Pattern reference value
	 * @param  {Number} i           Row
	 * @param  {Number} j           Column
	 * @return {Boolean}            Mask value
	 */
	function getMaskAt (maskPattern, i, j) {
	  switch (maskPattern) {
	    case exports.Patterns.PATTERN000: return (i + j) % 2 === 0
	    case exports.Patterns.PATTERN001: return i % 2 === 0
	    case exports.Patterns.PATTERN010: return j % 3 === 0
	    case exports.Patterns.PATTERN011: return (i + j) % 3 === 0
	    case exports.Patterns.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
	    case exports.Patterns.PATTERN101: return (i * j) % 2 + (i * j) % 3 === 0
	    case exports.Patterns.PATTERN110: return ((i * j) % 2 + (i * j) % 3) % 2 === 0
	    case exports.Patterns.PATTERN111: return ((i * j) % 3 + (i + j) % 2) % 2 === 0

	    default: throw new Error('bad maskPattern:' + maskPattern)
	  }
	}

	/**
	 * Apply a mask pattern to a BitMatrix
	 *
	 * @param  {Number}    pattern Pattern reference number
	 * @param  {BitMatrix} data    BitMatrix data
	 */
	exports.applyMask = function applyMask (pattern, data) {
	  const size = data.size;

	  for (let col = 0; col < size; col++) {
	    for (let row = 0; row < size; row++) {
	      if (data.isReserved(row, col)) continue
	      data.xor(row, col, getMaskAt(pattern, row, col));
	    }
	  }
	};

	/**
	 * Returns the best mask pattern for data
	 *
	 * @param  {BitMatrix} data
	 * @return {Number} Mask pattern reference number
	 */
	exports.getBestMask = function getBestMask (data, setupFormatFunc) {
	  const numPatterns = Object.keys(exports.Patterns).length;
	  let bestPattern = 0;
	  let lowerPenalty = Infinity;

	  for (let p = 0; p < numPatterns; p++) {
	    setupFormatFunc(p);
	    exports.applyMask(p, data);

	    // Calculate penalty
	    const penalty =
	      exports.getPenaltyN1(data) +
	      exports.getPenaltyN2(data) +
	      exports.getPenaltyN3(data) +
	      exports.getPenaltyN4(data);

	    // Undo previously applied mask
	    exports.applyMask(p, data);

	    if (penalty < lowerPenalty) {
	      lowerPenalty = penalty;
	      bestPattern = p;
	    }
	  }

	  return bestPattern
	};
} (maskPattern));

var errorCorrectionCode = {};

const ECLevel$1 = errorCorrectionLevel;

const EC_BLOCKS_TABLE = [
// L  M  Q  H
  1, 1, 1, 1,
  1, 1, 1, 1,
  1, 1, 2, 2,
  1, 2, 2, 4,
  1, 2, 4, 4,
  2, 4, 4, 4,
  2, 4, 6, 5,
  2, 4, 6, 6,
  2, 5, 8, 8,
  4, 5, 8, 8,
  4, 5, 8, 11,
  4, 8, 10, 11,
  4, 9, 12, 16,
  4, 9, 16, 16,
  6, 10, 12, 18,
  6, 10, 17, 16,
  6, 11, 16, 19,
  6, 13, 18, 21,
  7, 14, 21, 25,
  8, 16, 20, 25,
  8, 17, 23, 25,
  9, 17, 23, 34,
  9, 18, 25, 30,
  10, 20, 27, 32,
  12, 21, 29, 35,
  12, 23, 34, 37,
  12, 25, 34, 40,
  13, 26, 35, 42,
  14, 28, 38, 45,
  15, 29, 40, 48,
  16, 31, 43, 51,
  17, 33, 45, 54,
  18, 35, 48, 57,
  19, 37, 51, 60,
  19, 38, 53, 63,
  20, 40, 56, 66,
  21, 43, 59, 70,
  22, 45, 62, 74,
  24, 47, 65, 77,
  25, 49, 68, 81
];

const EC_CODEWORDS_TABLE = [
// L  M  Q  H
  7, 10, 13, 17,
  10, 16, 22, 28,
  15, 26, 36, 44,
  20, 36, 52, 64,
  26, 48, 72, 88,
  36, 64, 96, 112,
  40, 72, 108, 130,
  48, 88, 132, 156,
  60, 110, 160, 192,
  72, 130, 192, 224,
  80, 150, 224, 264,
  96, 176, 260, 308,
  104, 198, 288, 352,
  120, 216, 320, 384,
  132, 240, 360, 432,
  144, 280, 408, 480,
  168, 308, 448, 532,
  180, 338, 504, 588,
  196, 364, 546, 650,
  224, 416, 600, 700,
  224, 442, 644, 750,
  252, 476, 690, 816,
  270, 504, 750, 900,
  300, 560, 810, 960,
  312, 588, 870, 1050,
  336, 644, 952, 1110,
  360, 700, 1020, 1200,
  390, 728, 1050, 1260,
  420, 784, 1140, 1350,
  450, 812, 1200, 1440,
  480, 868, 1290, 1530,
  510, 924, 1350, 1620,
  540, 980, 1440, 1710,
  570, 1036, 1530, 1800,
  570, 1064, 1590, 1890,
  600, 1120, 1680, 1980,
  630, 1204, 1770, 2100,
  660, 1260, 1860, 2220,
  720, 1316, 1950, 2310,
  750, 1372, 2040, 2430
];

/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */
errorCorrectionCode.getBlocksCount = function getBlocksCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel$1.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0]
    case ECLevel$1.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1]
    case ECLevel$1.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2]
    case ECLevel$1.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
};

/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */
errorCorrectionCode.getTotalCodewordsCount = function getTotalCodewordsCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel$1.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0]
    case ECLevel$1.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1]
    case ECLevel$1.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2]
    case ECLevel$1.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
};

var polynomial = {};

var galoisField = {};

const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */
;(function initTables () {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;

    x <<= 1; // multiply by 2

    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.
    if (x & 0x100) { // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D;
    }
  }

  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255];
  }
}());

/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
galoisField.log = function log (n) {
  if (n < 1) throw new Error('log(' + n + ')')
  return LOG_TABLE[n]
};

/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
galoisField.exp = function exp (n) {
  return EXP_TABLE[n]
};

/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */
galoisField.mul = function mul (x, y) {
  if (x === 0 || y === 0) return 0

  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]]
};

(function (exports) {
	const GF = galoisField;

	/**
	 * Multiplies two polynomials inside Galois Field
	 *
	 * @param  {Uint8Array} p1 Polynomial
	 * @param  {Uint8Array} p2 Polynomial
	 * @return {Uint8Array}    Product of p1 and p2
	 */
	exports.mul = function mul (p1, p2) {
	  const coeff = new Uint8Array(p1.length + p2.length - 1);

	  for (let i = 0; i < p1.length; i++) {
	    for (let j = 0; j < p2.length; j++) {
	      coeff[i + j] ^= GF.mul(p1[i], p2[j]);
	    }
	  }

	  return coeff
	};

	/**
	 * Calculate the remainder of polynomials division
	 *
	 * @param  {Uint8Array} divident Polynomial
	 * @param  {Uint8Array} divisor  Polynomial
	 * @return {Uint8Array}          Remainder
	 */
	exports.mod = function mod (divident, divisor) {
	  let result = new Uint8Array(divident);

	  while ((result.length - divisor.length) >= 0) {
	    const coeff = result[0];

	    for (let i = 0; i < divisor.length; i++) {
	      result[i] ^= GF.mul(divisor[i], coeff);
	    }

	    // remove all zeros from buffer head
	    let offset = 0;
	    while (offset < result.length && result[offset] === 0) offset++;
	    result = result.slice(offset);
	  }

	  return result
	};

	/**
	 * Generate an irreducible generator polynomial of specified degree
	 * (used by Reed-Solomon encoder)
	 *
	 * @param  {Number} degree Degree of the generator polynomial
	 * @return {Uint8Array}    Buffer containing polynomial coefficients
	 */
	exports.generateECPolynomial = function generateECPolynomial (degree) {
	  let poly = new Uint8Array([1]);
	  for (let i = 0; i < degree; i++) {
	    poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
	  }

	  return poly
	};
} (polynomial));

const Polynomial = polynomial;

function ReedSolomonEncoder$1 (degree) {
  this.genPoly = undefined;
  this.degree = degree;

  if (this.degree) this.initialize(this.degree);
}

/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */
ReedSolomonEncoder$1.prototype.initialize = function initialize (degree) {
  // create an irreducible generator polynomial
  this.degree = degree;
  this.genPoly = Polynomial.generateECPolynomial(this.degree);
};

/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */
ReedSolomonEncoder$1.prototype.encode = function encode (data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized')
  }

  // Calculate EC for this data block
  // extends data size to data+genPoly size
  const paddedData = new Uint8Array(data.length + this.degree);
  paddedData.set(data);

  // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial
  const remainder = Polynomial.mod(paddedData, this.genPoly);

  // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients
  const start = this.degree - remainder.length;
  if (start > 0) {
    const buff = new Uint8Array(this.degree);
    buff.set(remainder, start);

    return buff
  }

  return remainder
};

var reedSolomonEncoder = ReedSolomonEncoder$1;

var version = {};

var mode = {};

var versionCheck = {};

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */

versionCheck.isValid = function isValid (version) {
  return !isNaN(version) && version >= 1 && version <= 40
};

var regex = {};

const numeric = '[0-9]+';
const alphanumeric = '[A-Z $%*+\\-./:]+';
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' +
  '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' +
  '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' +
  '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, '\\u');

const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';

regex.KANJI = new RegExp(kanji, 'g');
regex.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
regex.BYTE = new RegExp(byte, 'g');
regex.NUMERIC = new RegExp(numeric, 'g');
regex.ALPHANUMERIC = new RegExp(alphanumeric, 'g');

const TEST_KANJI = new RegExp('^' + kanji + '$');
const TEST_NUMERIC = new RegExp('^' + numeric + '$');
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');

regex.testKanji = function testKanji (str) {
  return TEST_KANJI.test(str)
};

regex.testNumeric = function testNumeric (str) {
  return TEST_NUMERIC.test(str)
};

regex.testAlphanumeric = function testAlphanumeric (str) {
  return TEST_ALPHANUMERIC.test(str)
};

(function (exports) {
	const VersionCheck = versionCheck;
	const Regex = regex;

	/**
	 * Numeric mode encodes data from the decimal digit set (0 - 9)
	 * (byte values 30HEX to 39HEX).
	 * Normally, 3 data characters are represented by 10 bits.
	 *
	 * @type {Object}
	 */
	exports.NUMERIC = {
	  id: 'Numeric',
	  bit: 1 << 0,
	  ccBits: [10, 12, 14]
	};

	/**
	 * Alphanumeric mode encodes data from a set of 45 characters,
	 * i.e. 10 numeric digits (0 - 9),
	 *      26 alphabetic characters (A - Z),
	 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
	 * Normally, two input characters are represented by 11 bits.
	 *
	 * @type {Object}
	 */
	exports.ALPHANUMERIC = {
	  id: 'Alphanumeric',
	  bit: 1 << 1,
	  ccBits: [9, 11, 13]
	};

	/**
	 * In byte mode, data is encoded at 8 bits per character.
	 *
	 * @type {Object}
	 */
	exports.BYTE = {
	  id: 'Byte',
	  bit: 1 << 2,
	  ccBits: [8, 16, 16]
	};

	/**
	 * The Kanji mode efficiently encodes Kanji characters in accordance with
	 * the Shift JIS system based on JIS X 0208.
	 * The Shift JIS values are shifted from the JIS X 0208 values.
	 * JIS X 0208 gives details of the shift coded representation.
	 * Each two-byte character value is compacted to a 13-bit binary codeword.
	 *
	 * @type {Object}
	 */
	exports.KANJI = {
	  id: 'Kanji',
	  bit: 1 << 3,
	  ccBits: [8, 10, 12]
	};

	/**
	 * Mixed mode will contain a sequences of data in a combination of any of
	 * the modes described above
	 *
	 * @type {Object}
	 */
	exports.MIXED = {
	  bit: -1
	};

	/**
	 * Returns the number of bits needed to store the data length
	 * according to QR Code specifications.
	 *
	 * @param  {Mode}   mode    Data mode
	 * @param  {Number} version QR Code version
	 * @return {Number}         Number of bits
	 */
	exports.getCharCountIndicator = function getCharCountIndicator (mode, version) {
	  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode)

	  if (!VersionCheck.isValid(version)) {
	    throw new Error('Invalid version: ' + version)
	  }

	  if (version >= 1 && version < 10) return mode.ccBits[0]
	  else if (version < 27) return mode.ccBits[1]
	  return mode.ccBits[2]
	};

	/**
	 * Returns the most efficient mode to store the specified data
	 *
	 * @param  {String} dataStr Input data string
	 * @return {Mode}           Best mode
	 */
	exports.getBestModeForData = function getBestModeForData (dataStr) {
	  if (Regex.testNumeric(dataStr)) return exports.NUMERIC
	  else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC
	  else if (Regex.testKanji(dataStr)) return exports.KANJI
	  else return exports.BYTE
	};

	/**
	 * Return mode name as string
	 *
	 * @param {Mode} mode Mode object
	 * @returns {String}  Mode name
	 */
	exports.toString = function toString (mode) {
	  if (mode && mode.id) return mode.id
	  throw new Error('Invalid mode')
	};

	/**
	 * Check if input param is a valid mode object
	 *
	 * @param   {Mode}    mode Mode object
	 * @returns {Boolean} True if valid mode, false otherwise
	 */
	exports.isValid = function isValid (mode) {
	  return mode && mode.bit && mode.ccBits
	};

	/**
	 * Get mode object from its name
	 *
	 * @param   {String} string Mode name
	 * @returns {Mode}          Mode object
	 */
	function fromString (string) {
	  if (typeof string !== 'string') {
	    throw new Error('Param is not a string')
	  }

	  const lcStr = string.toLowerCase();

	  switch (lcStr) {
	    case 'numeric':
	      return exports.NUMERIC
	    case 'alphanumeric':
	      return exports.ALPHANUMERIC
	    case 'kanji':
	      return exports.KANJI
	    case 'byte':
	      return exports.BYTE
	    default:
	      throw new Error('Unknown mode: ' + string)
	  }
	}

	/**
	 * Returns mode from a value.
	 * If value is not a valid mode, returns defaultValue
	 *
	 * @param  {Mode|String} value        Encoding mode
	 * @param  {Mode}        defaultValue Fallback value
	 * @return {Mode}                     Encoding mode
	 */
	exports.from = function from (value, defaultValue) {
	  if (exports.isValid(value)) {
	    return value
	  }

	  try {
	    return fromString(value)
	  } catch (e) {
	    return defaultValue
	  }
	};
} (mode));

(function (exports) {
	const Utils = utils$1;
	const ECCode = errorCorrectionCode;
	const ECLevel = errorCorrectionLevel;
	const Mode = mode;
	const VersionCheck = versionCheck;

	// Generator polynomial used to encode version information
	const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
	const G18_BCH = Utils.getBCHDigit(G18);

	function getBestVersionForDataLength (mode, length, errorCorrectionLevel) {
	  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
	    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
	      return currentVersion
	    }
	  }

	  return undefined
	}

	function getReservedBitsCount (mode, version) {
	  // Character count indicator + mode indicator bits
	  return Mode.getCharCountIndicator(mode, version) + 4
	}

	function getTotalBitsFromDataArray (segments, version) {
	  let totalBits = 0;

	  segments.forEach(function (data) {
	    const reservedBits = getReservedBitsCount(data.mode, version);
	    totalBits += reservedBits + data.getBitsLength();
	  });

	  return totalBits
	}

	function getBestVersionForMixedData (segments, errorCorrectionLevel) {
	  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
	    const length = getTotalBitsFromDataArray(segments, currentVersion);
	    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
	      return currentVersion
	    }
	  }

	  return undefined
	}

	/**
	 * Returns version number from a value.
	 * If value is not a valid version, returns defaultValue
	 *
	 * @param  {Number|String} value        QR Code version
	 * @param  {Number}        defaultValue Fallback value
	 * @return {Number}                     QR Code version number
	 */
	exports.from = function from (value, defaultValue) {
	  if (VersionCheck.isValid(value)) {
	    return parseInt(value, 10)
	  }

	  return defaultValue
	};

	/**
	 * Returns how much data can be stored with the specified QR code version
	 * and error correction level
	 *
	 * @param  {Number} version              QR Code version (1-40)
	 * @param  {Number} errorCorrectionLevel Error correction level
	 * @param  {Mode}   mode                 Data mode
	 * @return {Number}                      Quantity of storable data
	 */
	exports.getCapacity = function getCapacity (version, errorCorrectionLevel, mode) {
	  if (!VersionCheck.isValid(version)) {
	    throw new Error('Invalid QR Code version')
	  }

	  // Use Byte mode as default
	  if (typeof mode === 'undefined') mode = Mode.BYTE;

	  // Total codewords for this QR code version (Data + Error correction)
	  const totalCodewords = Utils.getSymbolTotalCodewords(version);

	  // Total number of error correction codewords
	  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

	  // Total number of data codewords
	  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

	  if (mode === Mode.MIXED) return dataTotalCodewordsBits

	  const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);

	  // Return max number of storable codewords
	  switch (mode) {
	    case Mode.NUMERIC:
	      return Math.floor((usableBits / 10) * 3)

	    case Mode.ALPHANUMERIC:
	      return Math.floor((usableBits / 11) * 2)

	    case Mode.KANJI:
	      return Math.floor(usableBits / 13)

	    case Mode.BYTE:
	    default:
	      return Math.floor(usableBits / 8)
	  }
	};

	/**
	 * Returns the minimum version needed to contain the amount of data
	 *
	 * @param  {Segment} data                    Segment of data
	 * @param  {Number} [errorCorrectionLevel=H] Error correction level
	 * @param  {Mode} mode                       Data mode
	 * @return {Number}                          QR Code version
	 */
	exports.getBestVersionForData = function getBestVersionForData (data, errorCorrectionLevel) {
	  let seg;

	  const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);

	  if (Array.isArray(data)) {
	    if (data.length > 1) {
	      return getBestVersionForMixedData(data, ecl)
	    }

	    if (data.length === 0) {
	      return 1
	    }

	    seg = data[0];
	  } else {
	    seg = data;
	  }

	  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl)
	};

	/**
	 * Returns version information with relative error correction bits
	 *
	 * The version information is included in QR Code symbols of version 7 or larger.
	 * It consists of an 18-bit sequence containing 6 data bits,
	 * with 12 error correction bits calculated using the (18, 6) Golay code.
	 *
	 * @param  {Number} version QR Code version
	 * @return {Number}         Encoded version info bits
	 */
	exports.getEncodedBits = function getEncodedBits (version) {
	  if (!VersionCheck.isValid(version) || version < 7) {
	    throw new Error('Invalid QR Code version')
	  }

	  let d = version << 12;

	  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
	    d ^= (G18 << (Utils.getBCHDigit(d) - G18_BCH));
	  }

	  return (version << 12) | d
	};
} (version));

var formatInfo = {};

const Utils$3 = utils$1;

const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
const G15_BCH = Utils$3.getBCHDigit(G15);

/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */
formatInfo.getEncodedBits = function getEncodedBits (errorCorrectionLevel, mask) {
  const data = ((errorCorrectionLevel.bit << 3) | mask);
  let d = data << 10;

  while (Utils$3.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= (G15 << (Utils$3.getBCHDigit(d) - G15_BCH));
  }

  // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string
  return ((data << 10) | d) ^ G15_MASK
};

var segments = {};

const Mode$4 = mode;

function NumericData (data) {
  this.mode = Mode$4.NUMERIC;
  this.data = data.toString();
}

NumericData.getBitsLength = function getBitsLength (length) {
  return 10 * Math.floor(length / 3) + ((length % 3) ? ((length % 3) * 3 + 1) : 0)
};

NumericData.prototype.getLength = function getLength () {
  return this.data.length
};

NumericData.prototype.getBitsLength = function getBitsLength () {
  return NumericData.getBitsLength(this.data.length)
};

NumericData.prototype.write = function write (bitBuffer) {
  let i, group, value;

  // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);

    bitBuffer.put(value, 10);
  }

  // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.
  const remainingNum = this.data.length - i;
  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);

    bitBuffer.put(value, remainingNum * 3 + 1);
  }
};

var numericData = NumericData;

const Mode$3 = mode;

/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */
const ALPHA_NUM_CHARS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ' ', '$', '%', '*', '+', '-', '.', '/', ':'
];

function AlphanumericData (data) {
  this.mode = Mode$3.ALPHANUMERIC;
  this.data = data;
}

AlphanumericData.getBitsLength = function getBitsLength (length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2)
};

AlphanumericData.prototype.getLength = function getLength () {
  return this.data.length
};

AlphanumericData.prototype.getBitsLength = function getBitsLength () {
  return AlphanumericData.getBitsLength(this.data.length)
};

AlphanumericData.prototype.write = function write (bitBuffer) {
  let i;

  // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;

    // The character value of the second digit is added to the product
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);

    // The sum is then stored as 11-bit binary number
    bitBuffer.put(value, 11);
  }

  // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.
  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};

var alphanumericData = AlphanumericData;

var encodeUtf8$1 = function encodeUtf8 (input) {
  var result = [];
  var size = input.length;

  for (var index = 0; index < size; index++) {
    var point = input.charCodeAt(index);

    if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {
      var second = input.charCodeAt(index + 1);

      if (second >= 0xDC00 && second <= 0xDFFF) {
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        index += 1;
      }
    }

    // US-ASCII
    if (point < 0x80) {
      result.push(point);
      continue
    }

    // 2-byte UTF-8
    if (point < 0x800) {
      result.push((point >> 6) | 192);
      result.push((point & 63) | 128);
      continue
    }

    // 3-byte UTF-8
    if (point < 0xD800 || (point >= 0xE000 && point < 0x10000)) {
      result.push((point >> 12) | 224);
      result.push(((point >> 6) & 63) | 128);
      result.push((point & 63) | 128);
      continue
    }

    // 4-byte UTF-8
    if (point >= 0x10000 && point <= 0x10FFFF) {
      result.push((point >> 18) | 240);
      result.push(((point >> 12) & 63) | 128);
      result.push(((point >> 6) & 63) | 128);
      result.push((point & 63) | 128);
      continue
    }

    // Invalid character
    result.push(0xEF, 0xBF, 0xBD);
  }

  return new Uint8Array(result).buffer
};

const encodeUtf8 = encodeUtf8$1;
const Mode$2 = mode;

function ByteData (data) {
  this.mode = Mode$2.BYTE;
  if (typeof (data) === 'string') {
    data = encodeUtf8(data);
  }
  this.data = new Uint8Array(data);
}

ByteData.getBitsLength = function getBitsLength (length) {
  return length * 8
};

ByteData.prototype.getLength = function getLength () {
  return this.data.length
};

ByteData.prototype.getBitsLength = function getBitsLength () {
  return ByteData.getBitsLength(this.data.length)
};

ByteData.prototype.write = function (bitBuffer) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8);
  }
};

var byteData = ByteData;

const Mode$1 = mode;
const Utils$2 = utils$1;

function KanjiData (data) {
  this.mode = Mode$1.KANJI;
  this.data = data;
}

KanjiData.getBitsLength = function getBitsLength (length) {
  return length * 13
};

KanjiData.prototype.getLength = function getLength () {
  return this.data.length
};

KanjiData.prototype.getBitsLength = function getBitsLength () {
  return KanjiData.getBitsLength(this.data.length)
};

KanjiData.prototype.write = function (bitBuffer) {
  let i;

  // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.
  for (i = 0; i < this.data.length; i++) {
    let value = Utils$2.toSJIS(this.data[i]);

    // For characters with Shift JIS values from 0x8140 to 0x9FFC:
    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140;

    // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140;
    } else {
      throw new Error(
        'Invalid SJIS character: ' + this.data[i] + '\n' +
        'Make sure your charset is UTF-8')
    }

    // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product
    value = (((value >>> 8) & 0xff) * 0xC0) + (value & 0xff);

    // Convert result to a 13-bit binary string
    bitBuffer.put(value, 13);
  }
};

var kanjiData = KanjiData;

var dijkstra = {exports: {}};

(function (module) {

	/******************************************************************************
	 * Created 2008-08-19.
	 *
	 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
	 *
	 * Copyright (C) 2008
	 *   Wyatt Baldwin <self@wyattbaldwin.com>
	 *   All rights reserved
	 *
	 * Licensed under the MIT license.
	 *
	 *   http://www.opensource.org/licenses/mit-license.php
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 *****************************************************************************/
	var dijkstra = {
	  single_source_shortest_paths: function(graph, s, d) {
	    // Predecessor map for each node that has been encountered.
	    // node ID => predecessor node ID
	    var predecessors = {};

	    // Costs of shortest paths from s to all nodes encountered.
	    // node ID => cost
	    var costs = {};
	    costs[s] = 0;

	    // Costs of shortest paths from s to all nodes encountered; differs from
	    // `costs` in that it provides easy access to the node that currently has
	    // the known shortest path from s.
	    // XXX: Do we actually need both `costs` and `open`?
	    var open = dijkstra.PriorityQueue.make();
	    open.push(s, 0);

	    var closest,
	        u, v,
	        cost_of_s_to_u,
	        adjacent_nodes,
	        cost_of_e,
	        cost_of_s_to_u_plus_cost_of_e,
	        cost_of_s_to_v,
	        first_visit;
	    while (!open.empty()) {
	      // In the nodes remaining in graph that have a known cost from s,
	      // find the node, u, that currently has the shortest path from s.
	      closest = open.pop();
	      u = closest.value;
	      cost_of_s_to_u = closest.cost;

	      // Get nodes adjacent to u...
	      adjacent_nodes = graph[u] || {};

	      // ...and explore the edges that connect u to those nodes, updating
	      // the cost of the shortest paths to any or all of those nodes as
	      // necessary. v is the node across the current edge from u.
	      for (v in adjacent_nodes) {
	        if (adjacent_nodes.hasOwnProperty(v)) {
	          // Get the cost of the edge running from u to v.
	          cost_of_e = adjacent_nodes[v];

	          // Cost of s to u plus the cost of u to v across e--this is *a*
	          // cost from s to v that may or may not be less than the current
	          // known cost to v.
	          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

	          // If we haven't visited v yet OR if the current known cost from s to
	          // v is greater than the new cost we just found (cost of s to u plus
	          // cost of u to v across e), update v's cost in the cost list and
	          // update v's predecessor in the predecessor list (it's now u).
	          cost_of_s_to_v = costs[v];
	          first_visit = (typeof costs[v] === 'undefined');
	          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
	            costs[v] = cost_of_s_to_u_plus_cost_of_e;
	            open.push(v, cost_of_s_to_u_plus_cost_of_e);
	            predecessors[v] = u;
	          }
	        }
	      }
	    }

	    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
	      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
	      throw new Error(msg);
	    }

	    return predecessors;
	  },

	  extract_shortest_path_from_predecessor_list: function(predecessors, d) {
	    var nodes = [];
	    var u = d;
	    while (u) {
	      nodes.push(u);
	      predecessors[u];
	      u = predecessors[u];
	    }
	    nodes.reverse();
	    return nodes;
	  },

	  find_path: function(graph, s, d) {
	    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
	    return dijkstra.extract_shortest_path_from_predecessor_list(
	      predecessors, d);
	  },

	  /**
	   * A very naive priority queue implementation.
	   */
	  PriorityQueue: {
	    make: function (opts) {
	      var T = dijkstra.PriorityQueue,
	          t = {},
	          key;
	      opts = opts || {};
	      for (key in T) {
	        if (T.hasOwnProperty(key)) {
	          t[key] = T[key];
	        }
	      }
	      t.queue = [];
	      t.sorter = opts.sorter || T.default_sorter;
	      return t;
	    },

	    default_sorter: function (a, b) {
	      return a.cost - b.cost;
	    },

	    /**
	     * Add a new item to the queue and ensure the highest priority element
	     * is at the front of the queue.
	     */
	    push: function (value, cost) {
	      var item = {value: value, cost: cost};
	      this.queue.push(item);
	      this.queue.sort(this.sorter);
	    },

	    /**
	     * Return the highest priority element in the queue.
	     */
	    pop: function () {
	      return this.queue.shift();
	    },

	    empty: function () {
	      return this.queue.length === 0;
	    }
	  }
	};


	// node.js module exports
	{
	  module.exports = dijkstra;
	}
} (dijkstra));

var dijkstraExports = dijkstra.exports;

(function (exports) {
	const Mode = mode;
	const NumericData = numericData;
	const AlphanumericData = alphanumericData;
	const ByteData = byteData;
	const KanjiData = kanjiData;
	const Regex = regex;
	const Utils = utils$1;
	const dijkstra = dijkstraExports;

	/**
	 * Returns UTF8 byte length
	 *
	 * @param  {String} str Input string
	 * @return {Number}     Number of byte
	 */
	function getStringByteLength (str) {
	  return unescape(encodeURIComponent(str)).length
	}

	/**
	 * Get a list of segments of the specified mode
	 * from a string
	 *
	 * @param  {Mode}   mode Segment mode
	 * @param  {String} str  String to process
	 * @return {Array}       Array of object with segments data
	 */
	function getSegments (regex, mode, str) {
	  const segments = [];
	  let result;

	  while ((result = regex.exec(str)) !== null) {
	    segments.push({
	      data: result[0],
	      index: result.index,
	      mode: mode,
	      length: result[0].length
	    });
	  }

	  return segments
	}

	/**
	 * Extracts a series of segments with the appropriate
	 * modes from a string
	 *
	 * @param  {String} dataStr Input string
	 * @return {Array}          Array of object with segments data
	 */
	function getSegmentsFromString (dataStr) {
	  const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
	  const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
	  let byteSegs;
	  let kanjiSegs;

	  if (Utils.isKanjiModeEnabled()) {
	    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
	    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
	  } else {
	    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
	    kanjiSegs = [];
	  }

	  const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);

	  return segs
	    .sort(function (s1, s2) {
	      return s1.index - s2.index
	    })
	    .map(function (obj) {
	      return {
	        data: obj.data,
	        mode: obj.mode,
	        length: obj.length
	      }
	    })
	}

	/**
	 * Returns how many bits are needed to encode a string of
	 * specified length with the specified mode
	 *
	 * @param  {Number} length String length
	 * @param  {Mode} mode     Segment mode
	 * @return {Number}        Bit length
	 */
	function getSegmentBitsLength (length, mode) {
	  switch (mode) {
	    case Mode.NUMERIC:
	      return NumericData.getBitsLength(length)
	    case Mode.ALPHANUMERIC:
	      return AlphanumericData.getBitsLength(length)
	    case Mode.KANJI:
	      return KanjiData.getBitsLength(length)
	    case Mode.BYTE:
	      return ByteData.getBitsLength(length)
	  }
	}

	/**
	 * Merges adjacent segments which have the same mode
	 *
	 * @param  {Array} segs Array of object with segments data
	 * @return {Array}      Array of object with segments data
	 */
	function mergeSegments (segs) {
	  return segs.reduce(function (acc, curr) {
	    const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
	    if (prevSeg && prevSeg.mode === curr.mode) {
	      acc[acc.length - 1].data += curr.data;
	      return acc
	    }

	    acc.push(curr);
	    return acc
	  }, [])
	}

	/**
	 * Generates a list of all possible nodes combination which
	 * will be used to build a segments graph.
	 *
	 * Nodes are divided by groups. Each group will contain a list of all the modes
	 * in which is possible to encode the given text.
	 *
	 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
	 * The group for '12345' will contain then 3 objects, one for each
	 * possible encoding mode.
	 *
	 * Each node represents a possible segment.
	 *
	 * @param  {Array} segs Array of object with segments data
	 * @return {Array}      Array of object with segments data
	 */
	function buildNodes (segs) {
	  const nodes = [];
	  for (let i = 0; i < segs.length; i++) {
	    const seg = segs[i];

	    switch (seg.mode) {
	      case Mode.NUMERIC:
	        nodes.push([seg,
	          { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
	          { data: seg.data, mode: Mode.BYTE, length: seg.length }
	        ]);
	        break
	      case Mode.ALPHANUMERIC:
	        nodes.push([seg,
	          { data: seg.data, mode: Mode.BYTE, length: seg.length }
	        ]);
	        break
	      case Mode.KANJI:
	        nodes.push([seg,
	          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
	        ]);
	        break
	      case Mode.BYTE:
	        nodes.push([
	          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
	        ]);
	    }
	  }

	  return nodes
	}

	/**
	 * Builds a graph from a list of nodes.
	 * All segments in each node group will be connected with all the segments of
	 * the next group and so on.
	 *
	 * At each connection will be assigned a weight depending on the
	 * segment's byte length.
	 *
	 * @param  {Array} nodes    Array of object with segments data
	 * @param  {Number} version QR Code version
	 * @return {Object}         Graph of all possible segments
	 */
	function buildGraph (nodes, version) {
	  const table = {};
	  const graph = { start: {} };
	  let prevNodeIds = ['start'];

	  for (let i = 0; i < nodes.length; i++) {
	    const nodeGroup = nodes[i];
	    const currentNodeIds = [];

	    for (let j = 0; j < nodeGroup.length; j++) {
	      const node = nodeGroup[j];
	      const key = '' + i + j;

	      currentNodeIds.push(key);
	      table[key] = { node: node, lastCount: 0 };
	      graph[key] = {};

	      for (let n = 0; n < prevNodeIds.length; n++) {
	        const prevNodeId = prevNodeIds[n];

	        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
	          graph[prevNodeId][key] =
	            getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) -
	            getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);

	          table[prevNodeId].lastCount += node.length;
	        } else {
	          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;

	          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) +
	            4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
	        }
	      }
	    }

	    prevNodeIds = currentNodeIds;
	  }

	  for (let n = 0; n < prevNodeIds.length; n++) {
	    graph[prevNodeIds[n]].end = 0;
	  }

	  return { map: graph, table: table }
	}

	/**
	 * Builds a segment from a specified data and mode.
	 * If a mode is not specified, the more suitable will be used.
	 *
	 * @param  {String} data             Input data
	 * @param  {Mode | String} modesHint Data mode
	 * @return {Segment}                 Segment
	 */
	function buildSingleSegment (data, modesHint) {
	  let mode;
	  const bestMode = Mode.getBestModeForData(data);

	  mode = Mode.from(modesHint, bestMode);

	  // Make sure data can be encoded
	  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
	    throw new Error('"' + data + '"' +
	      ' cannot be encoded with mode ' + Mode.toString(mode) +
	      '.\n Suggested mode is: ' + Mode.toString(bestMode))
	  }

	  // Use Mode.BYTE if Kanji support is disabled
	  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
	    mode = Mode.BYTE;
	  }

	  switch (mode) {
	    case Mode.NUMERIC:
	      return new NumericData(data)

	    case Mode.ALPHANUMERIC:
	      return new AlphanumericData(data)

	    case Mode.KANJI:
	      return new KanjiData(data)

	    case Mode.BYTE:
	      return new ByteData(data)
	  }
	}

	/**
	 * Builds a list of segments from an array.
	 * Array can contain Strings or Objects with segment's info.
	 *
	 * For each item which is a string, will be generated a segment with the given
	 * string and the more appropriate encoding mode.
	 *
	 * For each item which is an object, will be generated a segment with the given
	 * data and mode.
	 * Objects must contain at least the property "data".
	 * If property "mode" is not present, the more suitable mode will be used.
	 *
	 * @param  {Array} array Array of objects with segments data
	 * @return {Array}       Array of Segments
	 */
	exports.fromArray = function fromArray (array) {
	  return array.reduce(function (acc, seg) {
	    if (typeof seg === 'string') {
	      acc.push(buildSingleSegment(seg, null));
	    } else if (seg.data) {
	      acc.push(buildSingleSegment(seg.data, seg.mode));
	    }

	    return acc
	  }, [])
	};

	/**
	 * Builds an optimized sequence of segments from a string,
	 * which will produce the shortest possible bitstream.
	 *
	 * @param  {String} data    Input string
	 * @param  {Number} version QR Code version
	 * @return {Array}          Array of segments
	 */
	exports.fromString = function fromString (data, version) {
	  const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());

	  const nodes = buildNodes(segs);
	  const graph = buildGraph(nodes, version);
	  const path = dijkstra.find_path(graph.map, 'start', 'end');

	  const optimizedSegs = [];
	  for (let i = 1; i < path.length - 1; i++) {
	    optimizedSegs.push(graph.table[path[i]].node);
	  }

	  return exports.fromArray(mergeSegments(optimizedSegs))
	};

	/**
	 * Splits a string in various segments with the modes which
	 * best represent their content.
	 * The produced segments are far from being optimized.
	 * The output of this function is only used to estimate a QR Code version
	 * which may contain the data.
	 *
	 * @param  {string} data Input string
	 * @return {Array}       Array of segments
	 */
	exports.rawSplit = function rawSplit (data) {
	  return exports.fromArray(
	    getSegmentsFromString(data, Utils.isKanjiModeEnabled())
	  )
	};
} (segments));

const Utils$1 = utils$1;
const ECLevel = errorCorrectionLevel;
const BitBuffer = bitBuffer;
const BitMatrix = bitMatrix;
const AlignmentPattern = alignmentPattern;
const FinderPattern = finderPattern;
const MaskPattern = maskPattern;
const ECCode = errorCorrectionCode;
const ReedSolomonEncoder = reedSolomonEncoder;
const Version = version;
const FormatInfo = formatInfo;
const Mode = mode;
const Segments = segments;

/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupFinderPattern (matrix, version) {
  const size = matrix.size;
  const pos = FinderPattern.getPositions(version);

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];

    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue

      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue

        if ((r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
          (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */
function setupTimingPattern (matrix) {
  const size = matrix.size;

  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}

/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupAlignmentPattern (matrix, version) {
  const pos = AlignmentPattern.getPositions(version);

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];

    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 ||
          (r === 0 && c === 0)) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupVersionInfo (matrix, version) {
  const size = matrix.size;
  const bits = Version.getEncodedBits(version);
  let row, col, mod;

  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = ((bits >> i) & 1) === 1;

    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}

/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */
function setupFormatInfo (matrix, errorCorrectionLevel, maskPattern) {
  const size = matrix.size;
  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
  let i, mod;

  for (i = 0; i < 15; i++) {
    mod = ((bits >> i) & 1) === 1;

    // vertical
    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    }

    // horizontal
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  }

  // fixed module
  matrix.set(size - 8, 8, 1, true);
}

/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */
function setupData (matrix, data) {
  const size = matrix.size;
  let inc = -1;
  let row = size - 1;
  let bitIndex = 7;
  let byteIndex = 0;

  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;

    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false;

          if (byteIndex < data.length) {
            dark = (((data[byteIndex] >>> bitIndex) & 1) === 1);
          }

          matrix.set(row, col - c, dark);
          bitIndex--;

          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }

      row += inc;

      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break
      }
    }
  }
}

/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */
function createData (version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  const buffer = new BitBuffer();

  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4);

    // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));

    // add binary data sequence to buffer
    data.write(buffer);
  });

  // Calculate required number of bits
  const totalCodewords = Utils$1.getSymbolTotalCodewords(version);
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

  // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  }

  // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.

  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  }

  // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8);
  }

  return createCodewords(buffer, version, errorCorrectionLevel)
}

/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */
function createCodewords (bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils$1.getSymbolTotalCodewords(version);

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

  // Total number of data codewords
  const dataTotalCodewords = totalCodewords - ecTotalCodewords;

  // Total number of blocks
  const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);

  // Calculate how many blocks each group should contain
  const blocksInGroup2 = totalCodewords % ecTotalBlocks;
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;

  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);

  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;

  // Number of EC codewords is the same for both groups
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;

  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
  const rs = new ReedSolomonEncoder(ecCount);

  let offset = 0;
  const dcData = new Array(ecTotalBlocks);
  const ecData = new Array(ecTotalBlocks);
  let maxDataSize = 0;
  const buffer = new Uint8Array(bitBuffer.buffer);

  // Divide the buffer into the required number of blocks
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;

    // extract a block of data from buffer
    dcData[b] = buffer.slice(offset, offset + dataSize);

    // Calculate EC codewords for this data block
    ecData[b] = rs.encode(dcData[b]);

    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  }

  // Create final data
  // Interleave the data and error correction codewords from each block
  const data = new Uint8Array(totalCodewords);
  let index = 0;
  let i, r;

  // Add data codewords
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  }

  // Apped EC codewords
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }

  return data
}

/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */
function createSymbol (data, version, errorCorrectionLevel, maskPattern) {
  let segments;

  if (Array.isArray(data)) {
    segments = Segments.fromArray(data);
  } else if (typeof data === 'string') {
    let estimatedVersion = version;

    if (!estimatedVersion) {
      const rawSegments = Segments.rawSplit(data);

      // Estimate best version that can contain raw splitted segments
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
    }

    // Build optimized segments
    // If estimated version is undefined, try with the highest version
    segments = Segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error('Invalid data')
  }

  // Get the min version that can contain data
  const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);

  // If no version is found, data cannot be stored
  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code')
  }

  // If not specified, use min version as default
  if (!version) {
    version = bestVersion;

  // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' +
      'The chosen QR Code version cannot contain this amount of data.\n' +
      'Minimum version required to store current data is: ' + bestVersion + '.\n'
    )
  }

  const dataBits = createData(version, errorCorrectionLevel, segments);

  // Allocate matrix buffer
  const moduleCount = Utils$1.getSymbolSize(version);
  const modules = new BitMatrix(moduleCount);

  // Add function modules
  setupFinderPattern(modules, version);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version);

  // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.
  setupFormatInfo(modules, errorCorrectionLevel, 0);

  if (version >= 7) {
    setupVersionInfo(modules, version);
  }

  // Add data codewords
  setupData(modules, dataBits);

  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules,
      setupFormatInfo.bind(null, modules, errorCorrectionLevel));
  }

  // Apply mask pattern
  MaskPattern.applyMask(maskPattern, modules);

  // Replace format info bits with correct values
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern);

  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments
  }
}

/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */
qrcode.create = function create (data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text')
  }

  let errorCorrectionLevel = ECLevel.M;
  let version;
  let mask;

  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
    version = Version.from(options.version);
    mask = MaskPattern.from(options.maskPattern);

    if (options.toSJISFunc) {
      Utils$1.setToSJISFunction(options.toSJISFunc);
    }
  }

  return createSymbol(data, version, errorCorrectionLevel, mask)
};

var canvas = {};

var utils = {};

(function (exports) {
	function hex2rgba (hex) {
	  if (typeof hex === 'number') {
	    hex = hex.toString();
	  }

	  if (typeof hex !== 'string') {
	    throw new Error('Color should be defined as hex string')
	  }

	  let hexCode = hex.slice().replace('#', '').split('');
	  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
	    throw new Error('Invalid hex color: ' + hex)
	  }

	  // Convert from short to long form (fff -> ffffff)
	  if (hexCode.length === 3 || hexCode.length === 4) {
	    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
	      return [c, c]
	    }));
	  }

	  // Add default alpha value
	  if (hexCode.length === 6) hexCode.push('F', 'F');

	  const hexValue = parseInt(hexCode.join(''), 16);

	  return {
	    r: (hexValue >> 24) & 255,
	    g: (hexValue >> 16) & 255,
	    b: (hexValue >> 8) & 255,
	    a: hexValue & 255,
	    hex: '#' + hexCode.slice(0, 6).join('')
	  }
	}

	exports.getOptions = function getOptions (options) {
	  if (!options) options = {};
	  if (!options.color) options.color = {};

	  const margin = typeof options.margin === 'undefined' ||
	    options.margin === null ||
	    options.margin < 0
	    ? 4
	    : options.margin;

	  const width = options.width && options.width >= 21 ? options.width : undefined;
	  const scale = options.scale || 4;

	  return {
	    width: width,
	    scale: width ? 4 : scale,
	    margin: margin,
	    color: {
	      dark: hex2rgba(options.color.dark || '#000000ff'),
	      light: hex2rgba(options.color.light || '#ffffffff')
	    },
	    type: options.type,
	    rendererOpts: options.rendererOpts || {}
	  }
	};

	exports.getScale = function getScale (qrSize, opts) {
	  return opts.width && opts.width >= qrSize + opts.margin * 2
	    ? opts.width / (qrSize + opts.margin * 2)
	    : opts.scale
	};

	exports.getImageWidth = function getImageWidth (qrSize, opts) {
	  const scale = exports.getScale(qrSize, opts);
	  return Math.floor((qrSize + opts.margin * 2) * scale)
	};

	exports.qrToImageData = function qrToImageData (imgData, qr, opts) {
	  const size = qr.modules.size;
	  const data = qr.modules.data;
	  const scale = exports.getScale(size, opts);
	  const symbolSize = Math.floor((size + opts.margin * 2) * scale);
	  const scaledMargin = opts.margin * scale;
	  const palette = [opts.color.light, opts.color.dark];

	  for (let i = 0; i < symbolSize; i++) {
	    for (let j = 0; j < symbolSize; j++) {
	      let posDst = (i * symbolSize + j) * 4;
	      let pxColor = opts.color.light;

	      if (i >= scaledMargin && j >= scaledMargin &&
	        i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
	        const iSrc = Math.floor((i - scaledMargin) / scale);
	        const jSrc = Math.floor((j - scaledMargin) / scale);
	        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
	      }

	      imgData[posDst++] = pxColor.r;
	      imgData[posDst++] = pxColor.g;
	      imgData[posDst++] = pxColor.b;
	      imgData[posDst] = pxColor.a;
	    }
	  }
	};
} (utils));

(function (exports) {
	const Utils = utils;

	function clearCanvas (ctx, canvas, size) {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  if (!canvas.style) canvas.style = {};
	  canvas.height = size;
	  canvas.width = size;
	  canvas.style.height = size + 'px';
	  canvas.style.width = size + 'px';
	}

	function getCanvasElement () {
	  try {
	    return document.createElement('canvas')
	  } catch (e) {
	    throw new Error('You need to specify a canvas element')
	  }
	}

	exports.render = function render (qrData, canvas, options) {
	  let opts = options;
	  let canvasEl = canvas;

	  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
	    opts = canvas;
	    canvas = undefined;
	  }

	  if (!canvas) {
	    canvasEl = getCanvasElement();
	  }

	  opts = Utils.getOptions(opts);
	  const size = Utils.getImageWidth(qrData.modules.size, opts);

	  const ctx = canvasEl.getContext('2d');
	  const image = ctx.createImageData(size, size);
	  Utils.qrToImageData(image.data, qrData, opts);

	  clearCanvas(ctx, canvasEl, size);
	  ctx.putImageData(image, 0, 0);

	  return canvasEl
	};

	exports.renderToDataURL = function renderToDataURL (qrData, canvas, options) {
	  let opts = options;

	  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
	    opts = canvas;
	    canvas = undefined;
	  }

	  if (!opts) opts = {};

	  const canvasEl = exports.render(qrData, canvas, opts);

	  const type = opts.type || 'image/png';
	  const rendererOpts = opts.rendererOpts || {};

	  return canvasEl.toDataURL(type, rendererOpts.quality)
	};
} (canvas));

var svgTag = {};

const Utils = utils;

function getColorAttrib (color, attrib) {
  const alpha = color.a / 255;
  const str = attrib + '="' + color.hex + '"';

  return alpha < 1
    ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"'
    : str
}

function svgCmd (cmd, x, y) {
  let str = cmd + x;
  if (typeof y !== 'undefined') str += ' ' + y;

  return str
}

function qrToPath (data, size, margin) {
  let path = '';
  let moveBy = 0;
  let newRow = false;
  let lineLength = 0;

  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size);
    const row = Math.floor(i / size);

    if (!col && !newRow) newRow = true;

    if (data[i]) {
      lineLength++;

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow
          ? svgCmd('M', col + margin, 0.5 + row + margin)
          : svgCmd('m', moveBy, 0);

        moveBy = 0;
        newRow = false;
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }

  return path
}

svgTag.render = function render (qrData, options, cb) {
  const opts = Utils.getOptions(options);
  const size = qrData.modules.size;
  const data = qrData.modules.data;
  const qrcodesize = size + opts.margin * 2;

  const bg = !opts.color.light.a
    ? ''
    : '<path ' + getColorAttrib(opts.color.light, 'fill') +
      ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';

  const path =
    '<path ' + getColorAttrib(opts.color.dark, 'stroke') +
    ' d="' + qrToPath(data, size, opts.margin) + '"/>';

  const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';

  const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';

  const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';

  if (typeof cb === 'function') {
    cb(null, svgTag);
  }

  return svgTag
};

const canPromise = canPromise$1;

const QRCode = qrcode;
const CanvasRenderer = canvas;
const SvgRenderer = svgTag;

function renderCanvas (renderFunc, canvas, text, opts, cb) {
  const args = [].slice.call(arguments, 1);
  const argsNum = args.length;
  const isLastArgCb = typeof args[argsNum - 1] === 'function';

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument')
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 2) {
      cb = text;
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts;
        opts = undefined;
      } else {
        cb = opts;
        opts = text;
        text = canvas;
        canvas = undefined;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 1) {
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text;
      text = canvas;
      canvas = undefined;
    }

    return new Promise(function (resolve, reject) {
      try {
        const data = QRCode.create(text, opts);
        resolve(renderFunc(data, canvas, opts));
      } catch (e) {
        reject(e);
      }
    })
  }

  try {
    const data = QRCode.create(text, opts);
    cb(null, renderFunc(data, canvas, opts));
  } catch (e) {
    cb(e);
  }
}

browser.create = QRCode.create;
browser.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
browser.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);

// only svg for now.
browser.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts)
});

/* web/components/QRModal.svelte generated by Svelte v3.59.2 */
const file$9 = "web/components/QRModal.svelte";

// (2:0) {#if show}
function create_if_block$5(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				show: /*show*/ ctx[0],
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
			if (dirty & /*show*/ 1) modal_changes.show = /*show*/ ctx[0];

			if (dirty & /*$$scope, qr, $menu*/ 38) {
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
		id: create_if_block$5.name,
		type: "if",
		source: "(2:0) {#if show}",
		ctx
	});

	return block;
}

// (4:4) {#if qr}
function create_if_block_1$4(ctx) {
	let img;
	let img_src_value;
	let t0;
	let a;
	let button0;
	let a_download_value;
	let t1;
	let button1;
	let current;

	button0 = new Button({
			props: {
				class: "grn",
				t: "Baixar Imagem",
				i: "download"
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				i: "close",
				t: "Fechar",
				action: /*close*/ ctx[3]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			img = element("img");
			t0 = space();
			a = element("a");
			create_component(button0.$$.fragment);
			t1 = space();
			create_component(button1.$$.fragment);
			if (!src_url_equal(img.src, img_src_value = /*qr*/ ctx[1])) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "QR Code");
			attr_dev(img, "class", "svelte-djbe8d");
			add_location(img, file$9, 4, 6, 70);
			attr_dev(a, "href", /*qr*/ ctx[1]);
			attr_dev(a, "download", a_download_value = `qr-${format_name(/*$menu*/ ctx[2].name)}`);
			attr_dev(a, "class", "svelte-djbe8d");
			add_location(a, file$9, 6, 6, 108);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, a, anchor);
			mount_component(button0, a, null);
			insert_dev(target, t1, anchor);
			mount_component(button1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (!current || dirty & /*qr*/ 2 && !src_url_equal(img.src, img_src_value = /*qr*/ ctx[1])) {
				attr_dev(img, "src", img_src_value);
			}

			if (!current || dirty & /*qr*/ 2) {
				attr_dev(a, "href", /*qr*/ ctx[1]);
			}

			if (!current || dirty & /*$menu*/ 4 && a_download_value !== (a_download_value = `qr-${format_name(/*$menu*/ ctx[2].name)}`)) {
				attr_dev(a, "download", a_download_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(a);
			destroy_component(button0);
			if (detaching) detach_dev(t1);
			destroy_component(button1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$4.name,
		type: "if",
		source: "(4:4) {#if qr}",
		ctx
	});

	return block;
}

// (3:2) <Modal {show} on:close={close}>
function create_default_slot(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*qr*/ ctx[1] && create_if_block_1$4(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*qr*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*qr*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1$4(ctx);
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
		id: create_default_slot.name,
		type: "slot",
		source: "(3:2) <Modal {show} on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$9(ctx) {
	let div;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block$5(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if (if_block) if_block.c();
			attr_dev(div, "class", "svelte-djbe8d");
			add_location(div, file$9, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block) if_block.m(div, null);
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
					if_block = create_if_block$5(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, null);
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
			if (detaching) detach_dev(div);
			if (if_block) if_block.d();
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

function format_name(name) {
	return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll(' ', '-');
}

function instance$9($$self, $$props, $$invalidate) {
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(2, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('QRModal', slots, []);
	let { show } = $$props;
	let qr;

	let menu_names = {
		'clyp7z8db0000cxl6arjgaa23': 'adeildo-lanches'
	};

	function close() {
		$$invalidate(0, show = false);
	}

	onMount(async _ => {
		$$invalidate(1, qr = await browser.toDataURL(`${window.location}cardapio/${menu_names[$menu.id]}`));
	});

	$$self.$$.on_mount.push(function () {
		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<QRModal> was created without expected prop 'show'");
		}
	});

	const writable_props = ['show'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<QRModal> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
	};

	$$self.$capture_state = () => ({
		Button,
		Modal,
		onMount,
		menu,
		QRCode: browser,
		show,
		qr,
		menu_names,
		close,
		format_name,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('qr' in $$props) $$invalidate(1, qr = $$props.qr);
		if ('menu_names' in $$props) menu_names = $$props.menu_names;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [show, qr, $menu, close];
}

class QRModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$9, create_fragment$9, safe_not_equal, { show: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "QRModal",
			options,
			id: create_fragment$9.name
		});
	}

	get show() {
		throw new Error("<QRModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<QRModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/routes/MenuEdit.svelte generated by Svelte v3.59.2 */
const file$8 = "web/routes/MenuEdit.svelte";

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	return child_ctx;
}

// (28:0) {#each $menu.categories || [] as category}
function create_each_block$3(ctx) {
	let categorycard;
	let current;

	categorycard = new CategoryCard({
			props: { category: /*category*/ ctx[13] },
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
			if (dirty & /*$menu*/ 8) categorycard_changes.category = /*category*/ ctx[13];
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
		id: create_each_block$3.name,
		type: "each",
		source: "(28:0) {#each $menu.categories || [] as category}",
		ctx
	});

	return block;
}

function create_fragment$8(ctx) {
	let div0;
	let h1;
	let t0_value = /*$menu*/ ctx[3].name + "";
	let t0;
	let t1;
	let a;
	let button0;
	let a_href_value;
	let t2;
	let button1;
	let t3;
	let button2;
	let t4;
	let button3;
	let t5;
	let table;
	let tr0;
	let td0;
	let icon0;
	let t6;
	let t7;
	let td1;
	let t8_value = (/*$menu*/ ctx[3].phone || 'Não informado.') + "";
	let t8;
	let t9;
	let tr1;
	let td2;
	let icon1;
	let t10;
	let t11;
	let td3;
	let t12_value = (/*$menu*/ ctx[3].whatsapp || 'Não informado.') + "";
	let t12;
	let t13;
	let tr2;
	let td4;
	let icon2;
	let t14;
	let t15;
	let td5;
	let t16_value = (/*$menu*/ ctx[3].address || 'Não informado.') + "";
	let t16;
	let t17;
	let div1;
	let t18;
	let button4;
	let t19;
	let t20;
	let menumodal;
	let updating_show;
	let t21;
	let categorymodal;
	let updating_show_1;
	let t22;
	let qrmodal;
	let updating_show_2;
	let current;

	button0 = new Button({
			props: { i: "menu_book" },
			$$inline: true
		});

	button1 = new Button({
			props: {
				i: "qr_code",
				action: /*create_qr*/ ctx[6]
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				class: "blu",
				i: "edit",
				t: "",
				action: /*edit*/ ctx[5]
			},
			$$inline: true
		});

	button3 = new Button({
			props: {
				class: "red",
				i: "logout",
				action: /*logout*/ ctx[8]
			},
			$$inline: true
		});

	icon0 = new Icon({ props: { i: "phone" }, $$inline: true });
	icon1 = new Icon({ props: { i: "phone" }, $$inline: true });
	icon2 = new Icon({ props: { i: "place" }, $$inline: true });

	button4 = new Button({
			props: {
				class: "grn",
				i: "add",
				t: "Categoria",
				action: /*create_category*/ ctx[7]
			},
			$$inline: true
		});

	let each_value = /*$menu*/ ctx[3].categories || [];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	function menumodal_show_binding(value) {
		/*menumodal_show_binding*/ ctx[9](value);
	}

	let menumodal_props = {};

	if (/*m_edit*/ ctx[0] !== void 0) {
		menumodal_props.show = /*m_edit*/ ctx[0];
	}

	menumodal = new MenuModal({ props: menumodal_props, $$inline: true });
	binding_callbacks.push(() => bind(menumodal, 'show', menumodal_show_binding));

	function categorymodal_show_binding(value) {
		/*categorymodal_show_binding*/ ctx[10](value);
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

	function qrmodal_show_binding(value) {
		/*qrmodal_show_binding*/ ctx[11](value);
	}

	let qrmodal_props = {};

	if (/*m_qr*/ ctx[2] !== void 0) {
		qrmodal_props.show = /*m_qr*/ ctx[2];
	}

	qrmodal = new QRModal({ props: qrmodal_props, $$inline: true });
	binding_callbacks.push(() => bind(qrmodal, 'show', qrmodal_show_binding));

	const block = {
		c: function create() {
			div0 = element("div");
			h1 = element("h1");
			t0 = text(t0_value);
			t1 = space();
			a = element("a");
			create_component(button0.$$.fragment);
			t2 = space();
			create_component(button1.$$.fragment);
			t3 = space();
			create_component(button2.$$.fragment);
			t4 = space();
			create_component(button3.$$.fragment);
			t5 = space();
			table = element("table");
			tr0 = element("tr");
			td0 = element("td");
			create_component(icon0.$$.fragment);
			t6 = text(" Telefone:");
			t7 = space();
			td1 = element("td");
			t8 = text(t8_value);
			t9 = space();
			tr1 = element("tr");
			td2 = element("td");
			create_component(icon1.$$.fragment);
			t10 = text(" Whatsapp:");
			t11 = space();
			td3 = element("td");
			t12 = text(t12_value);
			t13 = space();
			tr2 = element("tr");
			td4 = element("td");
			create_component(icon2.$$.fragment);
			t14 = text(" Endereço:");
			t15 = space();
			td5 = element("td");
			t16 = text(t16_value);
			t17 = space();
			div1 = element("div");
			t18 = space();
			create_component(button4.$$.fragment);
			t19 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t20 = space();
			create_component(menumodal.$$.fragment);
			t21 = space();
			create_component(categorymodal.$$.fragment);
			t22 = space();
			create_component(qrmodal.$$.fragment);
			add_location(h1, file$8, 1, 2, 20);
			attr_dev(a, "class", "right");
			attr_dev(a, "href", a_href_value = `/s/cardapio/${/*menu_names*/ ctx[4][/*$menu*/ ctx[3].id]}`);
			attr_dev(a, "target", "_blank");
			add_location(a, file$8, 2, 2, 46);
			attr_dev(div0, "class", "row");
			add_location(div0, file$8, 0, 0, 0);
			attr_dev(td0, "class", "svelte-i7doj6");
			add_location(td0, file$8, 10, 4, 334);
			attr_dev(td1, "class", "svelte-i7doj6");
			add_location(td1, file$8, 11, 4, 378);
			add_location(tr0, file$8, 9, 2, 325);
			attr_dev(td2, "class", "svelte-i7doj6");
			add_location(td2, file$8, 14, 4, 442);
			attr_dev(td3, "class", "svelte-i7doj6");
			add_location(td3, file$8, 15, 4, 486);
			add_location(tr1, file$8, 13, 2, 433);
			attr_dev(td4, "class", "svelte-i7doj6");
			add_location(td4, file$8, 18, 4, 553);
			attr_dev(td5, "class", "svelte-i7doj6");
			add_location(td5, file$8, 19, 4, 597);
			add_location(tr2, file$8, 17, 2, 544);
			add_location(table, file$8, 8, 0, 315);
			attr_dev(div1, "class", "hr");
			add_location(div1, file$8, 23, 0, 662);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			append_dev(div0, h1);
			append_dev(h1, t0);
			append_dev(div0, t1);
			append_dev(div0, a);
			mount_component(button0, a, null);
			append_dev(div0, t2);
			mount_component(button1, div0, null);
			append_dev(div0, t3);
			mount_component(button2, div0, null);
			append_dev(div0, t4);
			mount_component(button3, div0, null);
			insert_dev(target, t5, anchor);
			insert_dev(target, table, anchor);
			append_dev(table, tr0);
			append_dev(tr0, td0);
			mount_component(icon0, td0, null);
			append_dev(td0, t6);
			append_dev(tr0, t7);
			append_dev(tr0, td1);
			append_dev(td1, t8);
			append_dev(table, t9);
			append_dev(table, tr1);
			append_dev(tr1, td2);
			mount_component(icon1, td2, null);
			append_dev(td2, t10);
			append_dev(tr1, t11);
			append_dev(tr1, td3);
			append_dev(td3, t12);
			append_dev(table, t13);
			append_dev(table, tr2);
			append_dev(tr2, td4);
			mount_component(icon2, td4, null);
			append_dev(td4, t14);
			append_dev(tr2, t15);
			append_dev(tr2, td5);
			append_dev(td5, t16);
			insert_dev(target, t17, anchor);
			insert_dev(target, div1, anchor);
			insert_dev(target, t18, anchor);
			mount_component(button4, target, anchor);
			insert_dev(target, t19, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, t20, anchor);
			mount_component(menumodal, target, anchor);
			insert_dev(target, t21, anchor);
			mount_component(categorymodal, target, anchor);
			insert_dev(target, t22, anchor);
			mount_component(qrmodal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*$menu*/ 8) && t0_value !== (t0_value = /*$menu*/ ctx[3].name + "")) set_data_dev(t0, t0_value);

			if (!current || dirty & /*$menu*/ 8 && a_href_value !== (a_href_value = `/s/cardapio/${/*menu_names*/ ctx[4][/*$menu*/ ctx[3].id]}`)) {
				attr_dev(a, "href", a_href_value);
			}

			if ((!current || dirty & /*$menu*/ 8) && t8_value !== (t8_value = (/*$menu*/ ctx[3].phone || 'Não informado.') + "")) set_data_dev(t8, t8_value);
			if ((!current || dirty & /*$menu*/ 8) && t12_value !== (t12_value = (/*$menu*/ ctx[3].whatsapp || 'Não informado.') + "")) set_data_dev(t12, t12_value);
			if ((!current || dirty & /*$menu*/ 8) && t16_value !== (t16_value = (/*$menu*/ ctx[3].address || 'Não informado.') + "")) set_data_dev(t16, t16_value);

			if (dirty & /*$menu*/ 8) {
				each_value = /*$menu*/ ctx[3].categories || [];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(t20.parentNode, t20);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			const menumodal_changes = {};

			if (!updating_show && dirty & /*m_edit*/ 1) {
				updating_show = true;
				menumodal_changes.show = /*m_edit*/ ctx[0];
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
			const qrmodal_changes = {};

			if (!updating_show_2 && dirty & /*m_qr*/ 4) {
				updating_show_2 = true;
				qrmodal_changes.show = /*m_qr*/ ctx[2];
				add_flush_callback(() => updating_show_2 = false);
			}

			qrmodal.$set(qrmodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(button2.$$.fragment, local);
			transition_in(button3.$$.fragment, local);
			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			transition_in(icon2.$$.fragment, local);
			transition_in(button4.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(menumodal.$$.fragment, local);
			transition_in(categorymodal.$$.fragment, local);
			transition_in(qrmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(button2.$$.fragment, local);
			transition_out(button3.$$.fragment, local);
			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			transition_out(icon2.$$.fragment, local);
			transition_out(button4.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(menumodal.$$.fragment, local);
			transition_out(categorymodal.$$.fragment, local);
			transition_out(qrmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			destroy_component(button0);
			destroy_component(button1);
			destroy_component(button2);
			destroy_component(button3);
			if (detaching) detach_dev(t5);
			if (detaching) detach_dev(table);
			destroy_component(icon0);
			destroy_component(icon1);
			destroy_component(icon2);
			if (detaching) detach_dev(t17);
			if (detaching) detach_dev(div1);
			if (detaching) detach_dev(t18);
			destroy_component(button4, detaching);
			if (detaching) detach_dev(t19);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t20);
			destroy_component(menumodal, detaching);
			if (detaching) detach_dev(t21);
			destroy_component(categorymodal, detaching);
			if (detaching) detach_dev(t22);
			destroy_component(qrmodal, detaching);
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
	component_subscribe($$self, menu, $$value => $$invalidate(3, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MenuEdit', slots, []);

	let menu_names = {
		'clyp7z8db0000cxl6arjgaa23': 'adeildo-lanches'
	};

	let m_edit, m_create_category, m_qr;

	function edit() {
		$$invalidate(0, m_edit = 1);
	}

	function create_qr() {
		$$invalidate(2, m_qr = 1);
	}

	function create_category() {
		$$invalidate(1, m_create_category = 1);
	}

	function logout() {
		if (!confirm('Certeza que deseja sair dessa conta?')) return;
		api(`logout/${session_id}`);
		localStorage.removeItem('session_id');
		session_id.set();
		menu.set();
	}

	function goto_menu() {
		window.location.href = `/s/cardapio/${$menu.id}`;
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MenuEdit> was created with unknown prop '${key}'`);
	});

	function menumodal_show_binding(value) {
		m_edit = value;
		$$invalidate(0, m_edit);
	}

	function categorymodal_show_binding(value) {
		m_create_category = value;
		$$invalidate(1, m_create_category);
	}

	function qrmodal_show_binding(value) {
		m_qr = value;
		$$invalidate(2, m_qr);
	}

	$$self.$capture_state = () => ({
		CategoryModal,
		CategoryCard,
		MenuModal,
		QRModal,
		Button,
		Icon,
		session_id,
		menu,
		api,
		menu_names,
		m_edit,
		m_create_category,
		m_qr,
		edit,
		create_qr,
		create_category,
		logout,
		goto_menu,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('menu_names' in $$props) $$invalidate(4, menu_names = $$props.menu_names);
		if ('m_edit' in $$props) $$invalidate(0, m_edit = $$props.m_edit);
		if ('m_create_category' in $$props) $$invalidate(1, m_create_category = $$props.m_create_category);
		if ('m_qr' in $$props) $$invalidate(2, m_qr = $$props.m_qr);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		m_edit,
		m_create_category,
		m_qr,
		$menu,
		menu_names,
		edit,
		create_qr,
		create_category,
		logout,
		menumodal_show_binding,
		categorymodal_show_binding,
		qrmodal_show_binding
	];
}

class MenuEdit extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MenuEdit",
			options,
			id: create_fragment$8.name
		});
	}
}

/* web/components/TopBarItem.svelte generated by Svelte v3.59.2 */
const file$7 = "web/components/TopBarItem.svelte";

function create_fragment$7(ctx) {
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
			add_location(li, file$7, 1, 0, 57);
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
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props, $$invalidate) {
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
		init(this, options, instance$7, create_fragment$7, safe_not_equal, { page: 0, name: 1, i: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TopBarItem",
			options,
			id: create_fragment$7.name
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
const file$6 = "web/components/TopBar.svelte";

// (6:4) {:else}
function create_else_block$2(ctx) {
	let topbaritem;
	let current;

	topbaritem = new TopBarItem({
			props: { page: "login", name: "Login", i: "login" },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(topbaritem.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(topbaritem, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(topbaritem.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(topbaritem.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(topbaritem, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$2.name,
		type: "else",
		source: "(6:4) {:else}",
		ctx
	});

	return block;
}

// (3:4) {#if $session_id}
function create_if_block_1$3(ctx) {
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
			create_component(topbaritem0.$$.fragment);
			t = space();
			create_component(topbaritem1.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(topbaritem0, target, anchor);
			insert_dev(target, t, anchor);
			mount_component(topbaritem1, target, anchor);
			current = true;
		},
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
			destroy_component(topbaritem0, detaching);
			if (detaching) detach_dev(t);
			destroy_component(topbaritem1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(3:4) {#if $session_id}",
		ctx
	});

	return block;
}

// (9:4) {#if window.location.href.endsWith('adm')}
function create_if_block$4(ctx) {
	let topbaritem;
	let current;

	topbaritem = new TopBarItem({
			props: { page: "admin", name: "Admin", i: "build" },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(topbaritem.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(topbaritem, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(topbaritem.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(topbaritem.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(topbaritem, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(9:4) {#if window.location.href.endsWith('adm')}",
		ctx
	});

	return block;
}

function create_fragment$6(ctx) {
	let div;
	let ul;
	let current_block_type_index;
	let if_block0;
	let t;
	let show_if = window.location.href.endsWith('adm');
	let current;
	const if_block_creators = [create_if_block_1$3, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$session_id*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	let if_block1 = show_if && create_if_block$4(ctx);

	const block = {
		c: function create() {
			div = element("div");
			ul = element("ul");
			if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			attr_dev(ul, "class", "row svelte-gt0cw1");
			add_location(ul, file$6, 1, 2, 31);
			attr_dev(div, "class", "usn tac topbar svelte-gt0cw1");
			add_location(div, file$6, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, ul);
			if_blocks[current_block_type_index].m(ul, null);
			append_dev(ul, t);
			if (if_block1) if_block1.m(ul, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index !== previous_block_index) {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				}

				transition_in(if_block0, 1);
				if_block0.m(ul, t);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if_blocks[current_block_type_index].d();
			if (if_block1) if_block1.d();
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
	let $session_id;
	validate_store(session_id, 'session_id');
	component_subscribe($$self, session_id, $$value => $$invalidate(0, $session_id = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TopBar', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TopBar> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ TopBarItem, session_id, $session_id });
	return [$session_id];
}

class TopBar extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TopBar",
			options,
			id: create_fragment$6.name
		});
	}
}

/* web/routes/Login.svelte generated by Svelte v3.59.2 */
const file$5 = "web/routes/Login.svelte";

// (8:2) {#if error}
function create_if_block$3(ctx) {
	let p;
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(/*error*/ ctx[1]);
			attr_dev(p, "class", "red");
			add_location(p, file$5, 7, 14, 208);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*error*/ 2) set_data_dev(t, /*error*/ ctx[1]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(8:2) {#if error}",
		ctx
	});

	return block;
}

function create_fragment$5(ctx) {
	let div0;
	let h2;
	let t0;
	let a;
	let t2;
	let div1;
	let t3;
	let form;
	let t4;
	let label0;
	let t5;
	let input0;
	let t6;
	let label1;
	let t7;
	let div2;
	let input1;
	let t8;
	let input2;
	let t9;
	let icon;
	let t10;
	let button;
	let t11_value = (/*l_submitting*/ ctx[3] ? '...' : 'Entrar') + "";
	let t11;
	let current;
	let mounted;
	let dispose;
	let if_block = /*error*/ ctx[1] && create_if_block$3(ctx);

	icon = new Icon({
			props: {
				i: /*show_password*/ ctx[2]
				? 'visibility_off'
				: 'visibility'
			},
			$$inline: true
		});

	icon.$on("click", /*toggle_show_password*/ ctx[4]);

	const block = {
		c: function create() {
			div0 = element("div");
			h2 = element("h2");
			t0 = text("Invista em profissionalismo  com a ");
			a = element("a");
			a.textContent = "vMenu";
			t2 = space();
			div1 = element("div");
			t3 = space();
			form = element("form");
			if (if_block) if_block.c();
			t4 = space();
			label0 = element("label");
			t5 = text("Nome:\n    ");
			input0 = element("input");
			t6 = space();
			label1 = element("label");
			t7 = text("Senha:\n    ");
			div2 = element("div");
			input1 = element("input");
			t8 = space();
			input2 = element("input");
			t9 = space();
			create_component(icon.$$.fragment);
			t10 = space();
			button = element("button");
			t11 = text(t11_value);
			attr_dev(a, "class", "grn");
			attr_dev(a, "href", "mailto:valealan84@gmail.com");
			add_location(a, file$5, 1, 42, 60);
			attr_dev(h2, "class", "svelte-19zgwbn");
			add_location(h2, file$5, 1, 2, 20);
			attr_dev(div0, "class", "tac svelte-19zgwbn");
			add_location(div0, file$5, 0, 0, 0);
			attr_dev(div1, "class", "hr svelte-19zgwbn");
			add_location(div1, file$5, 4, 0, 136);
			attr_dev(input0, "type", "text");
			input0.required = true;
			attr_dev(input0, "class", "svelte-19zgwbn");
			add_location(input0, file$5, 10, 4, 264);
			add_location(label0, file$5, 9, 2, 246);
			attr_dev(input1, "type", "password");
			set_style(input1, "display", /*show_password*/ ctx[2] ? 'none' : 'block');
			attr_dev(input1, "class", "svelte-19zgwbn");
			add_location(input1, file$5, 15, 6, 394);
			attr_dev(input2, "type", "text");
			set_style(input2, "display", /*show_password*/ ctx[2] ? 'block' : 'none');
			attr_dev(input2, "class", "svelte-19zgwbn");
			add_location(input2, file$5, 16, 6, 506);
			attr_dev(div2, "class", "password-container svelte-19zgwbn");
			add_location(div2, file$5, 14, 4, 355);
			add_location(label1, file$5, 13, 2, 336);
			attr_dev(button, "type", "submit");
			button.disabled = /*l_submitting*/ ctx[3];
			attr_dev(button, "class", "svelte-19zgwbn");
			add_location(button, file$5, 21, 2, 737);
			attr_dev(form, "class", "tas svelte-19zgwbn");
			add_location(form, file$5, 6, 0, 156);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			append_dev(div0, h2);
			append_dev(h2, t0);
			append_dev(h2, a);
			insert_dev(target, t2, anchor);
			insert_dev(target, div1, anchor);
			insert_dev(target, t3, anchor);
			insert_dev(target, form, anchor);
			if (if_block) if_block.m(form, null);
			append_dev(form, t4);
			append_dev(form, label0);
			append_dev(label0, t5);
			append_dev(label0, input0);
			set_input_value(input0, /*user*/ ctx[0].username);
			append_dev(form, t6);
			append_dev(form, label1);
			append_dev(label1, t7);
			append_dev(label1, div2);
			append_dev(div2, input1);
			set_input_value(input1, /*user*/ ctx[0].password);
			append_dev(div2, t8);
			append_dev(div2, input2);
			set_input_value(input2, /*user*/ ctx[0].password);
			append_dev(div2, t9);
			mount_component(icon, div2, null);
			append_dev(form, t10);
			append_dev(form, button);
			append_dev(button, t11);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[6]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[7]),
					listen_dev(input2, "input", /*input2_input_handler*/ ctx[8]),
					listen_dev(form, "submit", /*submit*/ ctx[5], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (/*error*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$3(ctx);
					if_block.c();
					if_block.m(form, t4);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*user*/ 1 && input0.value !== /*user*/ ctx[0].username) {
				set_input_value(input0, /*user*/ ctx[0].username);
			}

			if (!current || dirty & /*show_password*/ 4) {
				set_style(input1, "display", /*show_password*/ ctx[2] ? 'none' : 'block');
			}

			if (dirty & /*user*/ 1 && input1.value !== /*user*/ ctx[0].password) {
				set_input_value(input1, /*user*/ ctx[0].password);
			}

			if (!current || dirty & /*show_password*/ 4) {
				set_style(input2, "display", /*show_password*/ ctx[2] ? 'block' : 'none');
			}

			if (dirty & /*user*/ 1 && input2.value !== /*user*/ ctx[0].password) {
				set_input_value(input2, /*user*/ ctx[0].password);
			}

			const icon_changes = {};

			if (dirty & /*show_password*/ 4) icon_changes.i = /*show_password*/ ctx[2]
			? 'visibility_off'
			: 'visibility';

			icon.$set(icon_changes);
			if ((!current || dirty & /*l_submitting*/ 8) && t11_value !== (t11_value = (/*l_submitting*/ ctx[3] ? '...' : 'Entrar') + "")) set_data_dev(t11, t11_value);

			if (!current || dirty & /*l_submitting*/ 8) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[3]);
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
			if (detaching) detach_dev(div0);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div1);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(form);
			if (if_block) if_block.d();
			destroy_component(icon);
			mounted = false;
			run_all(dispose);
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Login', slots, []);
	let user = { username: '', password: '' };
	let error, show_password;
	let l_submitting;

	function toggle_show_password() {
		$$invalidate(2, show_password = !show_password);
	}

	async function submit(e) {
		e.preventDefault();
		$$invalidate(1, error = '');
		$$invalidate(3, l_submitting = true);
		const { res, data } = await api('login', 'POST', user);
		$$invalidate(3, l_submitting = false);

		if (res.ok) {
			localStorage.setItem('session_id', data.session.id);
			session_id.set(data.session.id);
			menu.set((await api(`menu/${data.session.menu_id}`)).data.menu);
			return;
		}

		$$invalidate(0, user.username = '', user);
		$$invalidate(0, user.password = '', user);
		$$invalidate(1, error = 'Credenciais inválidas');
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Login> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		user.username = this.value;
		$$invalidate(0, user);
	}

	function input1_input_handler() {
		user.password = this.value;
		$$invalidate(0, user);
	}

	function input2_input_handler() {
		user.password = this.value;
		$$invalidate(0, user);
	}

	$$self.$capture_state = () => ({
		Icon,
		session_id,
		menu,
		api,
		user,
		error,
		show_password,
		l_submitting,
		toggle_show_password,
		submit
	});

	$$self.$inject_state = $$props => {
		if ('user' in $$props) $$invalidate(0, user = $$props.user);
		if ('error' in $$props) $$invalidate(1, error = $$props.error);
		if ('show_password' in $$props) $$invalidate(2, show_password = $$props.show_password);
		if ('l_submitting' in $$props) $$invalidate(3, l_submitting = $$props.l_submitting);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		user,
		error,
		show_password,
		l_submitting,
		toggle_show_password,
		submit,
		input0_input_handler,
		input1_input_handler,
		input2_input_handler
	];
}

class Login extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Login",
			options,
			id: create_fragment$5.name
		});
	}
}

/* web/routes/menus/clyp7z8db0000cxl6arjgaa23/Item.svelte generated by Svelte v3.59.2 */
const file$4 = "web/routes/menus/clyp7z8db0000cxl6arjgaa23/Item.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

// (1:0) {#if image_i != undefined}
function create_if_block_2$1(ctx) {
	let div;
	let each_value = /*images*/ ctx[3][/*plain_name*/ ctx[4]][/*image_i*/ ctx[2]] || [];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(div, "class", "images items-image");
			add_location(div, file$4, 1, 2, 29);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div, null);
				}
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*menu, images, plain_name, image_i*/ 30) {
				each_value = /*images*/ ctx[3][/*plain_name*/ ctx[4]][/*image_i*/ ctx[2]] || [];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(1:0) {#if image_i != undefined}",
		ctx
	});

	return block;
}

// (3:4) {#each images[plain_name][image_i] || [] as image}
function create_each_block$2(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			if (!src_url_equal(img.src, img_src_value = `/img/${/*menu*/ ctx[1].id}/${/*image*/ ctx[8]}.png`)) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "");
			add_location(img, file$4, 3, 6, 123);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*menu, image_i*/ 6 && !src_url_equal(img.src, img_src_value = `/img/${/*menu*/ ctx[1].id}/${/*image*/ ctx[8]}.png`)) {
				attr_dev(img, "src", img_src_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(3:4) {#each images[plain_name][image_i] || [] as image}",
		ctx
	});

	return block;
}

// (12:4) {#if !item.description}
function create_if_block_1$2(ctx) {
	let div;

	const block = {
		c: function create() {
			div = element("div");
			attr_dev(div, "class", "dots");
			add_location(div, file$4, 11, 28, 311);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(12:4) {#if !item.description}",
		ctx
	});

	return block;
}

// (15:2) {#if item.description}
function create_if_block$2(ctx) {
	let p;
	let t_value = /*item*/ ctx[0].description + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			attr_dev(p, "class", "desc");
			add_location(p, file$4, 15, 4, 457);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1 && t_value !== (t_value = /*item*/ ctx[0].description + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(15:2) {#if item.description}",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let t0;
	let div1;
	let div0;
	let p0;
	let t1_value = /*item*/ ctx[0].name + "";
	let t1;
	let t2;
	let t3;
	let p1;
	let span;
	let t5;
	let t6_value = format_price(/*item*/ ctx[0].price_in_cents) + "";
	let t6;
	let t7;
	let if_block0 = /*image_i*/ ctx[2] != undefined && create_if_block_2$1(ctx);
	let if_block1 = !/*item*/ ctx[0].description && create_if_block_1$2(ctx);
	let if_block2 = /*item*/ ctx[0].description && create_if_block$2(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t0 = space();
			div1 = element("div");
			div0 = element("div");
			p0 = element("p");
			t1 = text(t1_value);
			t2 = space();
			if (if_block1) if_block1.c();
			t3 = space();
			p1 = element("p");
			span = element("span");
			span.textContent = "R$";
			t5 = space();
			t6 = text(t6_value);
			t7 = space();
			if (if_block2) if_block2.c();
			attr_dev(p0, "class", "name");
			add_location(p0, file$4, 10, 4, 249);
			add_location(span, file$4, 12, 22, 360);
			attr_dev(p1, "class", "price");
			add_location(p1, file$4, 12, 4, 342);
			attr_dev(div0, "class", "row jcsb");
			add_location(div0, file$4, 9, 2, 222);
			attr_dev(div1, "class", "item");
			add_location(div1, file$4, 8, 0, 201);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, p0);
			append_dev(p0, t1);
			append_dev(div0, t2);
			if (if_block1) if_block1.m(div0, null);
			append_dev(div0, t3);
			append_dev(div0, p1);
			append_dev(p1, span);
			append_dev(p1, t5);
			append_dev(p1, t6);
			append_dev(div1, t7);
			if (if_block2) if_block2.m(div1, null);
		},
		p: function update(ctx, [dirty]) {
			if (/*image_i*/ ctx[2] != undefined) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2$1(ctx);
					if_block0.c();
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty & /*item*/ 1 && t1_value !== (t1_value = /*item*/ ctx[0].name + "")) set_data_dev(t1, t1_value);

			if (!/*item*/ ctx[0].description) {
				if (if_block1) ; else {
					if_block1 = create_if_block_1$2(ctx);
					if_block1.c();
					if_block1.m(div0, t3);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*item*/ 1 && t6_value !== (t6_value = format_price(/*item*/ ctx[0].price_in_cents) + "")) set_data_dev(t6, t6_value);

			if (/*item*/ ctx[0].description) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block$2(ctx);
					if_block2.c();
					if_block2.m(div1, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div1);
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Item', slots, []);
	let { item, category, menu } = $$props;
	let image_i;

	const images = {
		'hamburgueres': [['h1', 'h2'], ['h3', 'h4'], ['h5', 'h6']]
	};

	const plain_name = minify_text(category.name);
	const image_offset = Math.ceil(category.items.length / (images[plain_name]?.length + 1));
	const i = category.items.findIndex(i => i.id == item.id);
	if (images[plain_name] && i % image_offset == 0 && i) image_i = i / image_offset - 1;

	$$self.$$.on_mount.push(function () {
		if (item === undefined && !('item' in $$props || $$self.$$.bound[$$self.$$.props['item']])) {
			console.warn("<Item> was created without expected prop 'item'");
		}

		if (category === undefined && !('category' in $$props || $$self.$$.bound[$$self.$$.props['category']])) {
			console.warn("<Item> was created without expected prop 'category'");
		}

		if (menu === undefined && !('menu' in $$props || $$self.$$.bound[$$self.$$.props['menu']])) {
			console.warn("<Item> was created without expected prop 'menu'");
		}
	});

	const writable_props = ['item', 'category', 'menu'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Item> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('item' in $$props) $$invalidate(0, item = $$props.item);
		if ('category' in $$props) $$invalidate(5, category = $$props.category);
		if ('menu' in $$props) $$invalidate(1, menu = $$props.menu);
	};

	$$self.$capture_state = () => ({
		minify_text,
		format_price,
		item,
		category,
		menu,
		image_i,
		images,
		plain_name,
		image_offset,
		i
	});

	$$self.$inject_state = $$props => {
		if ('item' in $$props) $$invalidate(0, item = $$props.item);
		if ('category' in $$props) $$invalidate(5, category = $$props.category);
		if ('menu' in $$props) $$invalidate(1, menu = $$props.menu);
		if ('image_i' in $$props) $$invalidate(2, image_i = $$props.image_i);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [item, menu, image_i, images, plain_name, category];
}

class Item extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, { item: 0, category: 5, menu: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Item",
			options,
			id: create_fragment$4.name
		});
	}

	get item() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set item(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get category() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set category(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get menu() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set menu(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/routes/menus/clyp7z8db0000cxl6arjgaa23/Category.svelte generated by Svelte v3.59.2 */
const file$3 = "web/routes/menus/clyp7z8db0000cxl6arjgaa23/Category.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

// (3:4) {#each images[plain_name] || [] as image}
function create_each_block_1(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			attr_dev(img, "class", "img");
			if (!src_url_equal(img.src, img_src_value = `/img/${/*menu*/ ctx[1].id}/${/*image*/ ctx[7]}.png`)) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "");
			add_location(img, file$3, 3, 6, 82);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*menu*/ 2 && !src_url_equal(img.src, img_src_value = `/img/${/*menu*/ ctx[1].id}/${/*image*/ ctx[7]}.png`)) {
				attr_dev(img, "src", img_src_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(3:4) {#each images[plain_name] || [] as image}",
		ctx
	});

	return block;
}

// (10:2) {#each category.items as item}
function create_each_block$1(ctx) {
	let item;
	let current;

	item = new Item({
			props: {
				item: /*item*/ ctx[4],
				category: /*category*/ ctx[0],
				menu: /*menu*/ ctx[1]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(item.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(item, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const item_changes = {};
			if (dirty & /*category*/ 1) item_changes.item = /*item*/ ctx[4];
			if (dirty & /*category*/ 1) item_changes.category = /*category*/ ctx[0];
			if (dirty & /*menu*/ 2) item_changes.menu = /*menu*/ ctx[1];
			item.$set(item_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(item.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(item.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(item, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(10:2) {#each category.items as item}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let main;
	let div;
	let t0;
	let h1;
	let t1_value = /*category*/ ctx[0].name + "";
	let t1;
	let t2;
	let current;
	let each_value_1 = /*images*/ ctx[2][/*plain_name*/ ctx[3]] || [];
	validate_each_argument(each_value_1);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let each_value = /*category*/ ctx[0].items;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			main = element("main");
			div = element("div");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t0 = space();
			h1 = element("h1");
			t1 = text(t1_value);
			t2 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(div, "class", "images");
			add_location(div, file$3, 1, 2, 9);
			add_location(h1, file$3, 7, 2, 168);
			add_location(main, file$3, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, main, anchor);
			append_dev(main, div);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(div, null);
				}
			}

			append_dev(main, t0);
			append_dev(main, h1);
			append_dev(h1, t1);
			append_dev(main, t2);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(main, null);
				}
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*menu, images, plain_name*/ 14) {
				each_value_1 = /*images*/ ctx[2][/*plain_name*/ ctx[3]] || [];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(div, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if ((!current || dirty & /*category*/ 1) && t1_value !== (t1_value = /*category*/ ctx[0].name + "")) set_data_dev(t1, t1_value);

			if (dirty & /*category, menu*/ 3) {
				each_value = /*category*/ ctx[0].items;
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
						each_blocks[i].m(main, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(main);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Category', slots, []);
	let { category, menu } = $$props;

	const images = {
		'acrescimos': ['a1', 'a2'],
		'bebidas': ['b1', 'b2']
	};

	const plain_name = minify_text(category.name);

	$$self.$$.on_mount.push(function () {
		if (category === undefined && !('category' in $$props || $$self.$$.bound[$$self.$$.props['category']])) {
			console.warn("<Category> was created without expected prop 'category'");
		}

		if (menu === undefined && !('menu' in $$props || $$self.$$.bound[$$self.$$.props['menu']])) {
			console.warn("<Category> was created without expected prop 'menu'");
		}
	});

	const writable_props = ['category', 'menu'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Category> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('category' in $$props) $$invalidate(0, category = $$props.category);
		if ('menu' in $$props) $$invalidate(1, menu = $$props.menu);
	};

	$$self.$capture_state = () => ({
		Item,
		minify_text,
		category,
		menu,
		images,
		plain_name
	});

	$$self.$inject_state = $$props => {
		if ('category' in $$props) $$invalidate(0, category = $$props.category);
		if ('menu' in $$props) $$invalidate(1, menu = $$props.menu);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [category, menu, images, plain_name];
}

class Category extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { category: 0, menu: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Category",
			options,
			id: create_fragment$3.name
		});
	}

	get category() {
		throw new Error("<Category>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set category(value) {
		throw new Error("<Category>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get menu() {
		throw new Error("<Category>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set menu(value) {
		throw new Error("<Category>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* web/routes/menus/clyp7z8db0000cxl6arjgaa23/Menu.svelte generated by Svelte v3.59.2 */
const file$2 = "web/routes/menus/clyp7z8db0000cxl6arjgaa23/Menu.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (6:6) {#each menu.categories[0].subcategories as category}
function create_each_block(ctx) {
	let category;
	let current;

	category = new Category({
			props: {
				category: /*category*/ ctx[1],
				menu: /*menu*/ ctx[0]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(category.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(category, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const category_changes = {};
			if (dirty & /*menu*/ 1) category_changes.category = /*category*/ ctx[1];
			if (dirty & /*menu*/ 1) category_changes.menu = /*menu*/ ctx[0];
			category.$set(category_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(category.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(category.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(category, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(6:6) {#each menu.categories[0].subcategories as category}",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let div1;
	let div0;
	let main;
	let img;
	let img_src_value;
	let t0;
	let t1;
	let footer;
	let p;
	let t2_value = /*menu*/ ctx[0].whatsapp + "";
	let t2;
	let t3;
	let br0;
	let t4;
	let br1;
	let t5;
	let t6;
	let br2;
	let t7;
	let br3;
	let t8;
	let br4;
	let t9;
	let br5;
	let current;
	let each_value = /*menu*/ ctx[0].categories[0].subcategories;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			main = element("main");
			img = element("img");
			t0 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			footer = element("footer");
			p = element("p");
			t2 = text(t2_value);
			t3 = space();
			br0 = element("br");
			t4 = text("\n          Faça seu pedido, ");
			br1 = element("br");
			t5 = text("\n          atendemos todos os dias!");
			t6 = space();
			br2 = element("br");
			t7 = space();
			br3 = element("br");
			t8 = space();
			br4 = element("br");
			t9 = space();
			br5 = element("br");
			attr_dev(img, "class", "banner svelte-c7c9rl");
			if (!src_url_equal(img.src, img_src_value = `/img/${/*menu*/ ctx[0].id}/banner.png`)) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "banner");
			add_location(img, file$2, 3, 6, 63);
			add_location(br0, file$2, 11, 26, 313);
			add_location(br1, file$2, 12, 27, 345);
			attr_dev(p, "class", "tac");
			add_location(p, file$2, 10, 8, 271);
			attr_dev(footer, "class", "svelte-c7c9rl");
			add_location(footer, file$2, 9, 6, 254);
			add_location(br2, file$2, 16, 6, 420);
			add_location(br3, file$2, 16, 11, 425);
			add_location(br4, file$2, 16, 16, 430);
			add_location(br5, file$2, 16, 21, 435);
			attr_dev(main, "class", "svelte-c7c9rl");
			add_location(main, file$2, 2, 4, 50);
			attr_dev(div0, "class", "background svelte-c7c9rl");
			add_location(div0, file$2, 1, 2, 21);
			attr_dev(div1, "class", "root svelte-c7c9rl");
			add_location(div1, file$2, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, main);
			append_dev(main, img);
			append_dev(main, t0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(main, null);
				}
			}

			append_dev(main, t1);
			append_dev(main, footer);
			append_dev(footer, p);
			append_dev(p, t2);
			append_dev(p, t3);
			append_dev(p, br0);
			append_dev(p, t4);
			append_dev(p, br1);
			append_dev(p, t5);
			append_dev(main, t6);
			append_dev(main, br2);
			append_dev(main, t7);
			append_dev(main, br3);
			append_dev(main, t8);
			append_dev(main, br4);
			append_dev(main, t9);
			append_dev(main, br5);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*menu*/ 1 && !src_url_equal(img.src, img_src_value = `/img/${/*menu*/ ctx[0].id}/banner.png`)) {
				attr_dev(img, "src", img_src_value);
			}

			if (dirty & /*menu*/ 1) {
				each_value = /*menu*/ ctx[0].categories[0].subcategories;
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
						each_blocks[i].m(main, t1);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if ((!current || dirty & /*menu*/ 1) && t2_value !== (t2_value = /*menu*/ ctx[0].whatsapp + "")) set_data_dev(t2, t2_value);
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			destroy_each(each_blocks, detaching);
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Menu', slots, []);
	let { menu } = $$props;

	$$self.$$.on_mount.push(function () {
		if (menu === undefined && !('menu' in $$props || $$self.$$.bound[$$self.$$.props['menu']])) {
			console.warn("<Menu> was created without expected prop 'menu'");
		}
	});

	const writable_props = ['menu'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Menu> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('menu' in $$props) $$invalidate(0, menu = $$props.menu);
	};

	$$self.$capture_state = () => ({ Category, menu });

	$$self.$inject_state = $$props => {
		if ('menu' in $$props) $$invalidate(0, menu = $$props.menu);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [menu];
}

let Menu$1 = class Menu extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { menu: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Menu",
			options,
			id: create_fragment$2.name
		});
	}

	get menu() {
		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set menu(value) {
		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* web/routes/Menu.svelte generated by Svelte v3.59.2 */
const file$1 = "web/routes/Menu.svelte";

// (5:0) {:else}
function create_else_block$1(ctx) {
	let p;

	const block = {
		c: function create() {
			p = element("p");
			p.textContent = "Cardápio não encontrado";
			attr_dev(p, "class", "svelte-vtpfje");
			add_location(p, file$1, 5, 2, 139);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(5:0) {:else}",
		ctx
	});

	return block;
}

// (3:20)
function create_if_block_1$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*component*/ ctx[0];

	function switch_props(ctx) {
		return {
			props: { menu: /*menu*/ ctx[1] },
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty & /*menu*/ 2) switch_instance_changes.menu = /*menu*/ ctx[1];

			if (dirty & /*component*/ 1 && switch_value !== (switch_value = /*component*/ ctx[0])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(3:20) ",
		ctx
	});

	return block;
}

// (1:0) {#if !component && !error}
function create_if_block$1(ctx) {
	let p;

	const block = {
		c: function create() {
			p = element("p");
			p.textContent = "Carregando cardápio...";
			attr_dev(p, "class", "svelte-vtpfje");
			add_location(p, file$1, 1, 2, 29);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(1:0) {#if !component && !error}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$1, create_if_block_1$1, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!/*component*/ ctx[0] && !/*error*/ ctx[2]) return 0;
		if (/*component*/ ctx[0]) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
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

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Menu', slots, []);
	let component, menu_id, menu, error;

	let menu_names = {
		'adeildo-lanches': 'clyp7z8db0000cxl6arjgaa23'
	};

	let components = {
		'clyp7z8db0000cxl6arjgaa23': Menu$1
	};

	onMount(async _ => {
		const path = window.location.pathname.split('/').pop();
		menu_id = menu_names[path] || path;
		const { res, data } = await api(`menu/${menu_id}`);
		if (!res.ok) return $$invalidate(2, error = 1);
		$$invalidate(1, menu = data.menu);
		$$invalidate(0, component = components[menu_id]);
		if (!component) return $$invalidate(2, error = 1);
		document.title = menu.name;
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Menu> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		m_clyp7z8db0000cxl6arjgaa23: Menu$1,
		onMount,
		api,
		component,
		menu_id,
		menu,
		error,
		menu_names,
		components
	});

	$$self.$inject_state = $$props => {
		if ('component' in $$props) $$invalidate(0, component = $$props.component);
		if ('menu_id' in $$props) menu_id = $$props.menu_id;
		if ('menu' in $$props) $$invalidate(1, menu = $$props.menu);
		if ('error' in $$props) $$invalidate(2, error = $$props.error);
		if ('menu_names' in $$props) menu_names = $$props.menu_names;
		if ('components' in $$props) components = $$props.components;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [component, menu, error];
}

class Menu extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Menu",
			options,
			id: create_fragment$1.name
		});
	}
}

/* web/App.svelte generated by Svelte v3.59.2 */
const file = "web/App.svelte";

// (3:0) {:else}
function create_else_block(ctx) {
	let topbar;
	let t;
	let main;
	let current_block_type_index;
	let if_block;
	let current;
	topbar = new TopBar({ $$inline: true });

	const if_block_creators = [
		create_if_block_1,
		create_if_block_2,
		create_if_block_3,
		create_if_block_4,
		create_if_block_5
	];

	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*loading*/ ctx[1]) return 0;
		if (/*$menu*/ ctx[3] && /*$curr_page*/ ctx[0] == 'menu') return 1;
		if (/*$menu*/ ctx[3] && /*$curr_page*/ ctx[0] == 'items') return 2;
		if (/*$curr_page*/ ctx[0] == 'login') return 3;
		if (/*$curr_page*/ ctx[0] == 'admin') return 4;
		return -1;
	}

	if (~(current_block_type_index = select_block_type_1(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			create_component(topbar.$$.fragment);
			t = space();
			main = element("main");
			if (if_block) if_block.c();
			attr_dev(main, "class", "svelte-t87hng");
			add_location(main, file, 5, 2, 52);
		},
		m: function mount(target, anchor) {
			mount_component(topbar, target, anchor);
			insert_dev(target, t, anchor);
			insert_dev(target, main, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(main, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx);

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
					if_block.m(main, null);
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
			if (detaching) detach_dev(main);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(3:0) {:else}",
		ctx
	});

	return block;
}

// (1:0) {#if menu_route}
function create_if_block(ctx) {
	let menu_1;
	let current;
	menu_1 = new Menu({ $$inline: true });

	const block = {
		c: function create() {
			create_component(menu_1.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(menu_1, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(menu_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(menu_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(menu_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(1:0) {#if menu_route}",
		ctx
	});

	return block;
}

// (13:47)
function create_if_block_5(ctx) {
	let adminpanel;
	let current;
	adminpanel = new AdminPanel({ $$inline: true });

	const block = {
		c: function create() {
			create_component(adminpanel.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(adminpanel, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(adminpanel.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(adminpanel.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(adminpanel, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(13:47) ",
		ctx
	});

	return block;
}

// (12:47)
function create_if_block_4(ctx) {
	let login;
	let current;
	login = new Login({ $$inline: true });

	const block = {
		c: function create() {
			create_component(login.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(login, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(login.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(login.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(login, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(12:47) ",
		ctx
	});

	return block;
}

// (11:47)
function create_if_block_3(ctx) {
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
		id: create_if_block_3.name,
		type: "if",
		source: "(11:47) ",
		ctx
	});

	return block;
}

// (10:6) {#if      $menu && $curr_page == 'menu'}
function create_if_block_2(ctx) {
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
		id: create_if_block_2.name,
		type: "if",
		source: "(10:6) {#if      $menu && $curr_page == 'menu'}",
		ctx
	});

	return block;
}

// (7:4) {#if loading}
function create_if_block_1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Carregando...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(7:4) {#if loading}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*menu_route*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
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
	let $curr_page;
	let $session_id;
	let $menu;
	validate_store(curr_page, 'curr_page');
	component_subscribe($$self, curr_page, $$value => $$invalidate(0, $curr_page = $$value));
	validate_store(session_id, 'session_id');
	component_subscribe($$self, session_id, $$value => $$invalidate(4, $session_id = $$value));
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(3, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('App', slots, []);
	let loading, menu_route;

	onMount(async _ => {
		if (window.location.pathname.startsWith('/s/cardapio')) {
			return $$invalidate(2, menu_route = true);
		}

		$$invalidate(1, loading = true);
		const _session_id = localStorage.getItem('session_id');
		if (!_session_id) return $$invalidate(1, loading = false);
		const { res, data } = await api(`menu-from-session/${_session_id}`);
		$$invalidate(1, loading = false);
		if (!res.ok) return;
		session_id.set(_session_id);
		menu.set(data.menu);
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		AdminPanel,
		ItemsEdit,
		MenuEdit,
		TopBar,
		Login,
		Menu,
		session_id,
		curr_page,
		menu,
		api,
		onMount,
		loading,
		menu_route,
		$curr_page,
		$session_id,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('loading' in $$props) $$invalidate(1, loading = $$props.loading);
		if ('menu_route' in $$props) $$invalidate(2, menu_route = $$props.menu_route);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$session_id, $curr_page*/ 17) {
			{
				if (!$session_id && $curr_page != 'admin') curr_page.set('login'); else if ($curr_page == 'login' || !$curr_page) curr_page.set('items');
			}
		}
	};

	return [$curr_page, loading, menu_route, $menu, $session_id];
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
