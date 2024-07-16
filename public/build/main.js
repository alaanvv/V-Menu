
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

/* web/components/Modal.svelte generated by Svelte v3.59.2 */
const file$g = "web/components/Modal.svelte";

// (1:0) {#if show}
function create_if_block$8(ctx) {
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
			add_location(div0, file$g, 3, 4, 124);
			attr_dev(div1, "class", "modal svelte-1agyxdy");
			add_location(div1, file$g, 2, 2, 72);
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
		id: create_if_block$8.name,
		type: "if",
		source: "(1:0) {#if show}",
		ctx
	});

	return block;
}

function create_fragment$g(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block$8(ctx);

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
		id: create_fragment$g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$g($$self, $$props, $$invalidate) {
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
		init(this, options, instance$g, create_fragment$g, safe_not_equal, { show: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Modal",
			options,
			id: create_fragment$g.name
		});
	}

	get show() {
		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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

  menu$1.categories.push(data.category);

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
      menu$1.categories[ci].subcategories.push(data.subcategory);

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

    menu$1.categories[ci].subcategories[sci].items.push(data.item);
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
          menu$1.categories[ci].subcategories[sci].items[ii] = { ...menu$1.categories[ci].subcategories[sci].items[ii].id, ..._data };
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
const file$f = "web/components/ItemModal.svelte";

// (1:0) {#if show}
function create_if_block$7(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				show: /*show*/ ctx[0],
				$$slots: { default: [create_default_slot$6] },
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

			if (dirty & /*$$scope, l_submitting, form, item*/ 1038) {
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
		id: create_if_block$7.name,
		type: "if",
		source: "(1:0) {#if show}",
		ctx
	});

	return block;
}

// (2:2) <Modal {show} on:close={close}>
function create_default_slot$6(ctx) {
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
	let button;
	let t8_value = (/*l_submitting*/ ctx[3] ? '...' : 'Enviar') + "";
	let t8;
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
			button = element("button");
			t8 = text(t8_value);
			attr_dev(h2, "class", "special tac");
			add_location(h2, file$f, 2, 4, 49);
			input0.required = true;
			add_location(input0, file$f, 5, 25, 173);
			attr_dev(label0, "class", "svelte-1mya8io");
			add_location(label0, file$f, 5, 6, 154);
			attr_dev(textarea, "rows", "5");
			add_location(textarea, file$f, 6, 25, 249);
			attr_dev(label1, "class", "svelte-1mya8io");
			add_location(label1, file$f, 6, 6, 230);
			attr_dev(input1, "placehloder", "R$");
			attr_dev(input1, "rows", "5");
			add_location(input1, file$f, 7, 25, 333);
			attr_dev(label2, "class", "svelte-1mya8io");
			add_location(label2, file$f, 7, 6, 314);
			button.disabled = /*l_submitting*/ ctx[3];
			add_location(button, file$f, 9, 6, 407);
			add_location(form_1, file$f, 4, 4, 141);
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
			append_dev(form_1, button);
			append_dev(button, t8);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[7]),
					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[8]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[9]),
					listen_dev(button, "click", /*submit*/ ctx[5], false, false, false, false)
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

			if (dirty & /*l_submitting*/ 8 && t8_value !== (t8_value = (/*l_submitting*/ ctx[3] ? '...' : 'Enviar') + "")) set_data_dev(t8, t8_value);

			if (dirty & /*l_submitting*/ 8) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[3]);
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
		id: create_default_slot$6.name,
		type: "slot",
		source: "(2:2) <Modal {show} on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$f(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block$7(ctx);

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
		id: create_fragment$f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$f($$self, $$props, $$invalidate) {
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
		if (!form.description) delete form.description;
		$$invalidate(2, form.price_in_cents = Math.round(form.price * 100), form);
		if (item) await edit_item(item.id, form); else await create_item(subcategory_id, form);
		close();
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
		(($$invalidate(2, form), $$invalidate(0, show)), $$invalidate(1, item));
	}

	function textarea_input_handler() {
		form.description = this.value;
		(($$invalidate(2, form), $$invalidate(0, show)), $$invalidate(1, item));
	}

	function input1_input_handler() {
		form.price = this.value;
		(($$invalidate(2, form), $$invalidate(0, show)), $$invalidate(1, item));
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
		submit
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
		if ($$self.$$.dirty & /*show, item*/ 3) {
			if (show) {
				$$invalidate(3, l_submitting = false);

				$$invalidate(2, form = {
					name: item?.name,
					description: item?.description,
					price: item?.price
				});
			}
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
		init(this, options, instance$f, create_fragment$f, safe_not_equal, { show: 0, item: 1, subcategory_id: 6 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ItemModal",
			options,
			id: create_fragment$f.name
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

/* web/components/Icon.svelte generated by Svelte v3.59.2 */
const file$e = "web/components/Icon.svelte";

function create_fragment$e(ctx) {
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
			add_location(span, file$e, 1, 0, 57);
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
		id: create_fragment$e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$e($$self, $$props, $$invalidate) {
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
		init(this, options, instance$e, create_fragment$e, safe_not_equal, { i: 0, class: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Icon",
			options,
			id: create_fragment$e.name
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
const file$d = "web/components/Button.svelte";

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
function create_if_block$6(ctx) {
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
		id: create_if_block$6.name,
		type: "if",
		source: "(3:2) {#if t}",
		ctx
	});

	return block;
}

function create_fragment$d(ctx) {
	let button;
	let t_1;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*i*/ ctx[0] && create_if_block_1$1(ctx);
	let if_block1 = /*t*/ ctx[1] && create_if_block$6(ctx);

	const block = {
		c: function create() {
			button = element("button");
			if (if_block0) if_block0.c();
			t_1 = space();
			if (if_block1) if_block1.c();
			attr_dev(button, "class", /*clazz*/ ctx[4]);
			button.disabled = /*disabled*/ ctx[3];
			toggle_class(button, "row", /*i*/ ctx[0] && /*t*/ ctx[1]);
			add_location(button, file$d, 0, 0, 0);
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
					if_block1 = create_if_block$6(ctx);
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
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$d($$self, $$props, $$invalidate) {
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

		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
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
			id: create_fragment$d.name
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

/* web/components/ItemRow.svelte generated by Svelte v3.59.2 */
const file$c = "web/components/ItemRow.svelte";

// (8:0) <Modal bind:show={m_options}>
function create_default_slot$5(ctx) {
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
	let current;

	button0 = new Button({
			props: {
				class: "blu",
				i: "edit",
				t: "Editar",
				action: /*edit*/ ctx[6]
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				class: "red",
				i: "delete",
				t: "Excluir",
				action: /*_delete*/ ctx[7]
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				i: "keyboard_arrow_up",
				t: "Mover pra cima",
				action: /*move_up*/ ctx[8],
				disabled: /*i*/ ctx[3] == 0
			},
			$$inline: true
		});

	button3 = new Button({
			props: {
				i: "keyboard_arrow_down",
				t: "Mover pra baixo",
				action: /*move_down*/ ctx[9],
				disabled: /*i*/ ctx[3] == /*items_length*/ ctx[4] - 1
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
			attr_dev(p, "class", "special svelte-rf44i4");
			add_location(p, file$c, 8, 2, 239);
			attr_dev(div, "class", "btn-col");
			add_location(div, file$c, 9, 2, 287);
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
			if ((!current || dirty & /*item*/ 1) && t1_value !== (t1_value = /*item*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
			const button2_changes = {};
			if (dirty & /*i*/ 8) button2_changes.disabled = /*i*/ ctx[3] == 0;
			button2.$set(button2_changes);
			const button3_changes = {};
			if (dirty & /*i, items_length*/ 24) button3_changes.disabled = /*i*/ ctx[3] == /*items_length*/ ctx[4] - 1;
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
		id: create_default_slot$5.name,
		type: "slot",
		source: "(8:0) <Modal bind:show={m_options}>",
		ctx
	});

	return block;
}

function create_fragment$c(ctx) {
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
	let current;

	button = new Button({
			props: {
				class: "blu",
				i: "edit",
				action: /*show_options*/ ctx[5]
			},
			$$inline: true
		});

	function modal_show_binding(value) {
		/*modal_show_binding*/ ctx[11](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot$5] },
		$$scope: { ctx }
	};

	if (/*m_options*/ ctx[1] !== void 0) {
		modal_props.show = /*m_options*/ ctx[1];
	}

	modal = new Modal({ props: modal_props, $$inline: true });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding));

	function itemmodal_show_binding(value) {
		/*itemmodal_show_binding*/ ctx[12](value);
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
			add_location(td0, file$c, 1, 2, 7);
			add_location(td1, file$c, 2, 2, 32);
			add_location(td2, file$c, 3, 2, 83);
			add_location(td3, file$c, 4, 2, 135);
			add_location(tr, file$c, 0, 0, 0);
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
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*item*/ 1) && t0_value !== (t0_value = /*item*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
			if ((!current || dirty & /*item*/ 1) && t2_value !== (t2_value = (/*item*/ ctx[0].description || 'Sem descrição') + "")) set_data_dev(t2, t2_value);
			if ((!current || dirty & /*item*/ 1) && t5_value !== (t5_value = format_price(/*item*/ ctx[0].price_in_cents) + "")) set_data_dev(t5, t5_value);
			const modal_changes = {};

			if (dirty & /*$$scope, i, items_length, item*/ 16409) {
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
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);
			transition_in(modal.$$.fragment, local);
			transition_in(itemmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button.$$.fragment, local);
			transition_out(modal.$$.fragment, local);
			transition_out(itemmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(tr);
			destroy_component(button);
			if (detaching) detach_dev(t7);
			destroy_component(modal, detaching);
			if (detaching) detach_dev(t8);
			destroy_component(itemmodal, detaching);
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

function format_price(n) {
	let str = String(n / 100).replace('.', ',');
	if (n % 100 == 0) str += ',00'; else if (n % 10 == 0) str += '0';
	return str;
}

function instance$c($$self, $$props, $$invalidate) {
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(10, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ItemRow', slots, []);
	let { item } = $$props;
	let m_options, m_edit;
	let i, items_length;

	function show_options() {
		$$invalidate(1, m_options = 1);
	}

	function edit() {
		$$invalidate(1, m_options = 0);
		$$invalidate(2, m_edit = 1);
	}

	function _delete() {
		$$invalidate(1, m_options = 0);
		if (!confirm('Certeza que quer excluir esse produto?')) return;
		delete_item(item.id);
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
		menu,
		item,
		m_options,
		m_edit,
		i,
		items_length,
		show_options,
		edit,
		_delete,
		move_up,
		move_down,
		format_price,
		update_i,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('item' in $$props) $$invalidate(0, item = $$props.item);
		if ('m_options' in $$props) $$invalidate(1, m_options = $$props.m_options);
		if ('m_edit' in $$props) $$invalidate(2, m_edit = $$props.m_edit);
		if ('i' in $$props) $$invalidate(3, i = $$props.i);
		if ('items_length' in $$props) $$invalidate(4, items_length = $$props.items_length);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$menu*/ 1024) {
			if ($menu) update_i();
		}
	};

	return [
		item,
		m_options,
		m_edit,
		i,
		items_length,
		show_options,
		edit,
		_delete,
		move_up,
		move_down,
		$menu,
		modal_show_binding,
		itemmodal_show_binding
	];
}

class ItemRow extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$c, create_fragment$c, safe_not_equal, { item: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ItemRow",
			options,
			id: create_fragment$c.name
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
const file$b = "web/components/SubcategoryTable.svelte";

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i];
	return child_ctx;
}

// (9:4) {#each subcategory.items || [] as item}
function create_each_block$3(ctx) {
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
		id: create_each_block$3.name,
		type: "each",
		source: "(9:4) {#each subcategory.items || [] as item}",
		ctx
	});

	return block;
}

function create_fragment$b(ctx) {
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
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
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
			add_location(h2, file$b, 3, 21, 48);
			attr_dev(td0, "colspan", "3");
			attr_dev(td0, "class", "svelte-s0l2tk");
			add_location(td0, file$b, 3, 6, 33);
			attr_dev(td1, "class", "svelte-s0l2tk");
			add_location(td1, file$b, 4, 6, 90);
			add_location(tr, file$b, 2, 4, 22);
			attr_dev(thead, "class", "svelte-s0l2tk");
			add_location(thead, file$b, 1, 2, 10);
			add_location(tbody, file$b, 7, 2, 176);
			attr_dev(table, "class", "svelte-s0l2tk");
			add_location(table, file$b, 0, 0, 0);
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
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
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
		init(this, options, instance$b, create_fragment$b, safe_not_equal, { subcategory: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SubcategoryTable",
			options,
			id: create_fragment$b.name
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
const file$a = "web/routes/ItemsEdit.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
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
			add_location(option, file$a, 6, 6, 219);
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
			add_location(option, file$a, 13, 6, 486);
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
function create_each_block_1(ctx) {
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
		id: create_each_block_1.name,
		type: "each",
		source: "(24:2) {#each category.subcategories as subcategory}",
		ctx
	});

	return block;
}

// (19:0) {#each filtered_menu.categories as category}
function create_each_block$2(ctx) {
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
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
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
			add_location(div, file$a, 19, 2, 626);
			add_location(h1, file$a, 21, 2, 648);
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
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
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
		id: create_each_block$2.name,
		type: "each",
		source: "(19:0) {#each filtered_menu.categories as category}",
		ctx
	});

	return block;
}

// (29:0) {#if !filtered_menu.categories.length && (query || category_id || subcategory_id)}
function create_if_block$5(ctx) {
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
			add_location(span, file$a, 32, 4, 976);
			add_location(p, file$a, 29, 2, 867);
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
		id: create_if_block$5.name,
		type: "if",
		source: "(29:0) {#if !filtered_menu.categories.length && (query || category_id || subcategory_id)}",
		ctx
	});

	return block;
}

function create_fragment$a(ctx) {
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
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block = !/*filtered_menu*/ ctx[5].categories.length && (/*query*/ ctx[2] || /*category_id*/ ctx[0] || /*subcategory_id*/ ctx[1]) && create_if_block$5(ctx);

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
			add_location(input, file$a, 1, 2, 20);
			option0.__value = undefined;
			option0.value = option0.__value;
			add_location(option0, file$a, 4, 4, 112);
			attr_dev(select0, "class", "svelte-1nqktdd");
			if (/*category_id*/ ctx[0] === void 0) add_render_callback(() => /*select0_change_handler*/ ctx[9].call(select0));
			add_location(select0, file$a, 3, 2, 74);
			option1.__value = undefined;
			option1.value = option1.__value;
			add_location(option1, file$a, 11, 4, 366);
			select1.disabled = select1_disabled_value = !/*category_id*/ ctx[0];
			attr_dev(select1, "class", "svelte-1nqktdd");
			if (/*subcategory_id*/ ctx[1] === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[10].call(select1));
			add_location(select1, file$a, 10, 2, 301);
			attr_dev(div, "class", "row svelte-1nqktdd");
			add_location(div, file$a, 0, 0, 0);
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
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
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
					if_block = create_if_block$5(ctx);
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
	component_subscribe($$self, menu, $$value => $$invalidate(3, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ItemsEdit', slots, []);
	let category_id, subcategory_id, category, subcategory, query;
	let filtered_menu;

	function apply_filters(category_id, subcategory_id, query) {
		if (!$menu.categories.find(c => c.id == category_id)?.subcategories.find(sc => sc.id == subcategory_id)) subcategory_id = undefined;
		$$invalidate(5, filtered_menu = { ...$menu });
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
			$$invalidate(
				5,
				filtered_menu.categories = filtered_menu.categories.map(c => ({
					...c,
					subcategories: c.subcategories.map(sc => ({
						...sc,
						items: sc.items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
					})).filter(sc => sc.items.length)
				})).filter(c => c.subcategories.length),
				filtered_menu
			);
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
		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ItemsEdit",
			options,
			id: create_fragment$a.name
		});
	}
}

/* web/components/CategoryModal.svelte generated by Svelte v3.59.2 */
const file$9 = "web/components/CategoryModal.svelte";

// (1:0) <Modal {show} on:close={close}>
function create_default_slot$4(ctx) {
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
	let button;
	let t4_value = (/*l_submitting*/ ctx[2] ? '...' : 'Enviar') + "";
	let t4;
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
			button = element("button");
			t4 = text(t4_value);
			attr_dev(h2, "class", "special tac");
			add_location(h2, file$9, 1, 2, 34);
			input.required = true;
			add_location(input, file$9, 4, 18, 162);
			attr_dev(label, "class", "svelte-1mya8io");
			add_location(label, file$9, 4, 4, 148);
			button.disabled = /*l_submitting*/ ctx[2];
			add_location(button, file$9, 6, 4, 218);
			add_location(form_1, file$9, 3, 2, 137);
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
			append_dev(form_1, button);
			append_dev(button, t4);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[6]),
					listen_dev(button, "click", /*submit*/ ctx[5], false, false, false, false)
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

			if (dirty & /*l_submitting*/ 4 && t4_value !== (t4_value = (/*l_submitting*/ ctx[2] ? '...' : 'Enviar') + "")) set_data_dev(t4, t4_value);

			if (dirty & /*l_submitting*/ 4) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[2]);
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
		source: "(1:0) <Modal {show} on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$9(ctx) {
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

			if (dirty & /*$$scope, l_submitting, form, category*/ 142) {
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
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props, $$invalidate) {
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
		(($$invalidate(3, form), $$invalidate(0, show)), $$invalidate(1, category));
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
		submit
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
		if ($$self.$$.dirty & /*show, category*/ 3) {
			if (show) {
				$$invalidate(2, l_submitting = false);
				$$invalidate(3, form = { name: category?.name });
			}
		}
	};

	return [show, category, l_submitting, form, close, submit, input_input_handler];
}

class CategoryModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$9, create_fragment$9, safe_not_equal, { show: 0, category: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CategoryModal",
			options,
			id: create_fragment$9.name
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
const file$8 = "web/components/SubcategoryModal.svelte";

// (1:0) {#if show}
function create_if_block$4(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				show: /*show*/ ctx[0],
				$$slots: { default: [create_default_slot$3] },
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

			if (dirty & /*$$scope, l_submitting, form, subcategory*/ 270) {
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

// (2:2) <Modal {show} on:close={close}>
function create_default_slot$3(ctx) {
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
	let button;
	let t4_value = (/*l_submitting*/ ctx[2] ? '...' : 'Enviar') + "";
	let t4;
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
			button = element("button");
			t4 = text(t4_value);
			attr_dev(h2, "class", "special tac");
			add_location(h2, file$8, 2, 4, 49);
			input.required = true;
			add_location(input, file$8, 5, 20, 193);
			attr_dev(label, "class", "svelte-1mya8io");
			add_location(label, file$8, 5, 6, 179);
			button.disabled = /*l_submitting*/ ctx[2];
			add_location(button, file$8, 7, 6, 251);
			add_location(form_1, file$8, 4, 4, 166);
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
			append_dev(form_1, button);
			append_dev(button, t4);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[7]),
					listen_dev(button, "click", /*submit*/ ctx[5], false, false, false, false)
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

			if (dirty & /*l_submitting*/ 4 && t4_value !== (t4_value = (/*l_submitting*/ ctx[2] ? '...' : 'Enviar') + "")) set_data_dev(t4, t4_value);

			if (dirty & /*l_submitting*/ 4) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[2]);
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
		id: create_default_slot$3.name,
		type: "slot",
		source: "(2:2) <Modal {show} on:close={close}>",
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
		(($$invalidate(3, form), $$invalidate(0, show)), $$invalidate(1, subcategory));
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
		submit
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
		if ($$self.$$.dirty & /*show, subcategory*/ 3) {
			if (show) {
				$$invalidate(2, l_submitting = false);
				$$invalidate(3, form = { name: subcategory?.name });
			}
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
		init(this, options, instance$8, create_fragment$8, safe_not_equal, { show: 0, subcategory: 1, category_id: 6 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SubcategoryModal",
			options,
			id: create_fragment$8.name
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
const file$7 = "web/components/SubcategoryCard.svelte";

// (9:0) <Modal bind:show={m_options}>
function create_default_slot$2(ctx) {
	let p;
	let t0;
	let t1_value = /*subcategory*/ ctx[0].name + "";
	let t1;
	let t2;
	let div;
	let button0;
	let t3;
	let button1;
	let current;

	button0 = new Button({
			props: {
				class: "blu",
				i: "edit",
				t: "Editar",
				action: /*edit*/ ctx[6]
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				class: "red",
				i: "delete",
				t: "Excluir",
				action: /*_delete*/ ctx[7]
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
			attr_dev(p, "class", "special svelte-huuhgf");
			add_location(p, file$7, 9, 2, 373);
			attr_dev(div, "class", "btn-col");
			add_location(div, file$7, 10, 2, 433);
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
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*subcategory*/ 1) && t1_value !== (t1_value = /*subcategory*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
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
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div);
			destroy_component(button0);
			destroy_component(button1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$2.name,
		type: "slot",
		source: "(9:0) <Modal bind:show={m_options}>",
		ctx
	});

	return block;
}

function create_fragment$7(ctx) {
	let li;
	let p;
	let t0_value = (/*subcategory*/ ctx[0].name || 'Sem nome') + "";
	let t0;
	let t1;
	let button0;
	let t2;
	let button1;
	let t3;
	let modal;
	let updating_show;
	let t4;
	let subcategorymodal;
	let updating_show_1;
	let current;
	let mounted;
	let dispose;

	button0 = new Button({
			props: {
				i: "keyboard_arrow_up",
				action: /*move_up*/ ctx[8],
				disabled: /*i*/ ctx[4] == 0
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				i: "keyboard_arrow_down",
				action: /*move_down*/ ctx[9],
				disabled: /*i*/ ctx[4] == /*category*/ ctx[3].subcategories.length - 1
			},
			$$inline: true
		});

	function modal_show_binding(value) {
		/*modal_show_binding*/ ctx[11](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot$2] },
		$$scope: { ctx }
	};

	if (/*m_options*/ ctx[2] !== void 0) {
		modal_props.show = /*m_options*/ ctx[2];
	}

	modal = new Modal({ props: modal_props, $$inline: true });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding));

	function subcategorymodal_show_binding(value) {
		/*subcategorymodal_show_binding*/ ctx[12](value);
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
			create_component(modal.$$.fragment);
			t4 = space();
			create_component(subcategorymodal.$$.fragment);
			attr_dev(p, "class", "cp fg");
			add_location(p, file$7, 2, 2, 76);
			attr_dev(li, "class", "row svelte-huuhgf");
			add_location(li, file$7, 1, 0, 57);
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
			insert_dev(target, t3, anchor);
			mount_component(modal, target, anchor);
			insert_dev(target, t4, anchor);
			mount_component(subcategorymodal, target, anchor);
			current = true;

			if (!mounted) {
				dispose = listen_dev(p, "click", /*show_options*/ ctx[5], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*subcategory*/ 1) && t0_value !== (t0_value = (/*subcategory*/ ctx[0].name || 'Sem nome') + "")) set_data_dev(t0, t0_value);
			const button0_changes = {};
			if (dirty & /*i*/ 16) button0_changes.disabled = /*i*/ ctx[4] == 0;
			button0.$set(button0_changes);
			const button1_changes = {};
			if (dirty & /*i, category*/ 24) button1_changes.disabled = /*i*/ ctx[4] == /*category*/ ctx[3].subcategories.length - 1;
			button1.$set(button1_changes);
			const modal_changes = {};

			if (dirty & /*$$scope, subcategory*/ 16385) {
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
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(modal.$$.fragment, local);
			transition_in(subcategorymodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(modal.$$.fragment, local);
			transition_out(subcategorymodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(button0);
			destroy_component(button1);
			if (detaching) detach_dev(t3);
			destroy_component(modal, detaching);
			if (detaching) detach_dev(t4);
			destroy_component(subcategorymodal, detaching);
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
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(10, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('SubcategoryCard', slots, []);
	let { subcategory } = $$props;
	let m_edit, m_options;
	let category, i;

	function show_options() {
		$$invalidate(2, m_options = 1);
	}

	function edit() {
		$$invalidate(2, m_options = 0);
		$$invalidate(1, m_edit = 1);
	}

	function _delete() {
		$$invalidate(2, m_options = 0);
		if (!confirm('Certeza que quer excluir essa subcategoria?')) return;
		delete_subcategory(subcategory.id);
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
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$menu*/ 1024) {
			if ($menu) update_i();
		}
	};

	return [
		subcategory,
		m_edit,
		m_options,
		category,
		i,
		show_options,
		edit,
		_delete,
		move_up,
		move_down,
		$menu,
		modal_show_binding,
		subcategorymodal_show_binding
	];
}

class SubcategoryCard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$7, create_fragment$7, safe_not_equal, { subcategory: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SubcategoryCard",
			options,
			id: create_fragment$7.name
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
const file$6 = "web/components/CategoryCard.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[15] = list[i];
	return child_ctx;
}

// (13:4) {#each category.subcategories || [] as subcategory}
function create_each_block$1(ctx) {
	let subcategorycard;
	let current;

	subcategorycard = new SubcategoryCard({
			props: { subcategory: /*subcategory*/ ctx[15] },
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
			if (dirty & /*category*/ 1) subcategorycard_changes.subcategory = /*subcategory*/ ctx[15];
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
		source: "(13:4) {#each category.subcategories || [] as subcategory}",
		ctx
	});

	return block;
}

// (19:0) <Modal bind:show={m_options}>
function create_default_slot$1(ctx) {
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
	let current;

	button0 = new Button({
			props: {
				class: "grn",
				i: "add",
				t: "Subcategoria",
				action: /*create_sub*/ ctx[6]
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				class: "blu",
				i: "edit",
				t: "Editar",
				action: /*edit*/ ctx[7]
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				class: "red",
				i: "delete",
				t: "Excluir",
				action: /*_delete*/ ctx[9]
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
			attr_dev(p, "class", "special svelte-199o48f");
			add_location(p, file$6, 19, 2, 527);
			attr_dev(div, "class", "btn-col");
			add_location(div, file$6, 20, 2, 581);
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
			if ((!current || dirty & /*category*/ 1) && t1_value !== (t1_value = /*category*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
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
		id: create_default_slot$1.name,
		type: "slot",
		source: "(19:0) <Modal bind:show={m_options}>",
		ctx
	});

	return block;
}

function create_fragment$6(ctx) {
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
	let current;

	button0 = new Button({
			props: {
				i: "settings",
				action: /*show_options*/ ctx[8]
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				i: "keyboard_arrow_up",
				action: /*move_up*/ ctx[10],
				disabled: /*i*/ ctx[5] == 0
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				i: "keyboard_arrow_down",
				action: /*move_down*/ ctx[11],
				disabled: /*i*/ ctx[5] == /*$menu*/ ctx[1].categories.length - 1
			},
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

	function modal_show_binding(value) {
		/*modal_show_binding*/ ctx[12](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot$1] },
		$$scope: { ctx }
	};

	if (/*m_options*/ ctx[4] !== void 0) {
		modal_props.show = /*m_options*/ ctx[4];
	}

	modal = new Modal({ props: modal_props, $$inline: true });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding));

	function categorymodal_show_binding(value) {
		/*categorymodal_show_binding*/ ctx[13](value);
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
		/*subcategorymodal_show_binding*/ ctx[14](value);
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
			add_location(h2, file$6, 2, 4, 59);
			attr_dev(div0, "class", "row jce");
			add_location(div0, file$6, 4, 4, 91);
			attr_dev(div1, "class", "row toprow jcsb");
			add_location(div1, file$6, 1, 2, 25);
			add_location(ul, file$6, 11, 2, 366);
			attr_dev(div2, "class", "category svelte-199o48f");
			add_location(div2, file$6, 0, 0, 0);
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
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*category*/ 1) && t0_value !== (t0_value = /*category*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
			const button1_changes = {};
			if (dirty & /*i*/ 32) button1_changes.disabled = /*i*/ ctx[5] == 0;
			button1.$set(button1_changes);
			const button2_changes = {};
			if (dirty & /*i, $menu*/ 34) button2_changes.disabled = /*i*/ ctx[5] == /*$menu*/ ctx[1].categories.length - 1;
			button2.$set(button2_changes);

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

			const modal_changes = {};

			if (dirty & /*$$scope, category*/ 262145) {
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
	let $menu;
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(1, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CategoryCard', slots, []);
	let { category } = $$props;
	let m_edit, m_subcategory, m_options;
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

	function _delete() {
		$$invalidate(4, m_options = 0);
		if (!confirm('Certeza que quer excluir essa categoria?')) return;
		delete_category(category.id);
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
		if ('i' in $$props) $$invalidate(5, i = $$props.i);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$menu, category*/ 3) {
			$$invalidate(5, i = $menu?.categories.findIndex(c => c.id == category.id));
		}
	};

	return [
		category,
		$menu,
		m_edit,
		m_subcategory,
		m_options,
		i,
		create_sub,
		edit,
		show_options,
		_delete,
		move_up,
		move_down,
		modal_show_binding,
		categorymodal_show_binding,
		subcategorymodal_show_binding
	];
}

class CategoryCard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$6, create_fragment$6, safe_not_equal, { category: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CategoryCard",
			options,
			id: create_fragment$6.name
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
const file$5 = "web/components/MenuModal.svelte";

// (1:0) {#if show}
function create_if_block$3(ctx) {
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

			if (dirty & /*$$scope, l_submitting, form*/ 1030) {
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

// (2:2) <Modal {show} on:close={close}>
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
			add_location(h2, file$5, 2, 4, 49);
			input0.required = true;
			add_location(input0, file$5, 5, 24, 105);
			attr_dev(label0, "class", "svelte-1mya8io");
			add_location(label0, file$5, 5, 6, 87);
			input1.required = true;
			add_location(input1, file$5, 6, 24, 184);
			attr_dev(label1, "class", "svelte-1mya8io");
			add_location(label1, file$5, 6, 6, 166);
			input2.required = true;
			add_location(input2, file$5, 7, 24, 263);
			attr_dev(label2, "class", "svelte-1mya8io");
			add_location(label2, file$5, 7, 6, 245);
			input3.required = true;
			add_location(input3, file$5, 8, 24, 342);
			attr_dev(label3, "class", "svelte-1mya8io");
			add_location(label3, file$5, 8, 6, 324);
			button.disabled = /*l_submitting*/ ctx[1];
			add_location(button, file$5, 10, 6, 404);
			add_location(form_1, file$5, 4, 4, 74);
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
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[6]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[7]),
					listen_dev(input2, "input", /*input2_input_handler*/ ctx[8]),
					listen_dev(input3, "input", /*input3_input_handler*/ ctx[9]),
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
		source: "(2:2) <Modal {show} on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$5(ctx) {
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
		(($$invalidate(2, form), $$invalidate(0, show)), $$invalidate(5, $menu));
	}

	function input1_input_handler() {
		form.phone = this.value;
		(($$invalidate(2, form), $$invalidate(0, show)), $$invalidate(5, $menu));
	}

	function input2_input_handler() {
		form.whatsapp = this.value;
		(($$invalidate(2, form), $$invalidate(0, show)), $$invalidate(5, $menu));
	}

	function input3_input_handler() {
		form.address = this.value;
		(($$invalidate(2, form), $$invalidate(0, show)), $$invalidate(5, $menu));
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
		if ($$self.$$.dirty & /*show, $menu*/ 33) {
			if (show) {
				$$invalidate(1, l_submitting = false);

				$$invalidate(2, form = {
					name: $menu.name,
					phone: $menu.phone,
					whatsapp: $menu.whatsapp,
					address: $menu.address
				});
			}
		}
	};

	return [
		show,
		l_submitting,
		form,
		close,
		submit,
		$menu,
		input0_input_handler,
		input1_input_handler,
		input2_input_handler,
		input3_input_handler
	];
}

class MenuModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$5, create_fragment$5, safe_not_equal, { show: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MenuModal",
			options,
			id: create_fragment$5.name
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
const file$4 = "web/routes/MenuEdit.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

// (25:0) {#each $menu.categories || [] as category}
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
		source: "(25:0) {#each $menu.categories || [] as category}",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
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
				t: "Editar",
				action: /*edit*/ ctx[3]
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

	let each_value = /*$menu*/ ctx[2].categories || [];
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

	if (/*m_edit*/ ctx[0] !== void 0) {
		menumodal_props.show = /*m_edit*/ ctx[0];
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
			add_location(h1, file$4, 1, 2, 25);
			attr_dev(div0, "class", "row jcsb");
			add_location(div0, file$4, 0, 0, 0);
			attr_dev(td0, "class", "svelte-i7doj6");
			add_location(td0, file$4, 7, 4, 135);
			attr_dev(td1, "class", "svelte-i7doj6");
			add_location(td1, file$4, 8, 4, 179);
			add_location(tr0, file$4, 6, 2, 126);
			attr_dev(td2, "class", "svelte-i7doj6");
			add_location(td2, file$4, 11, 4, 223);
			attr_dev(td3, "class", "svelte-i7doj6");
			add_location(td3, file$4, 12, 4, 267);
			add_location(tr1, file$4, 10, 2, 214);
			attr_dev(td4, "class", "svelte-i7doj6");
			add_location(td4, file$4, 15, 4, 314);
			attr_dev(td5, "class", "svelte-i7doj6");
			add_location(td5, file$4, 16, 4, 358);
			add_location(tr2, file$4, 14, 2, 305);
			add_location(table, file$4, 5, 0, 116);
			attr_dev(div1, "class", "hr");
			add_location(div1, file$4, 20, 0, 403);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			append_dev(div0, h1);
			append_dev(h1, t0);
			append_dev(div0, t1);
			mount_component(button0, div0, null);
			insert_dev(target, t2, anchor);
			insert_dev(target, table, anchor);
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
			insert_dev(target, t14, anchor);
			insert_dev(target, div1, anchor);
			insert_dev(target, t15, anchor);
			mount_component(button1, target, anchor);
			insert_dev(target, t16, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
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
				each_value = /*$menu*/ ctx[2].categories || [];
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
						each_blocks[i].m(t17.parentNode, t17);
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
			if (detaching) detach_dev(div0);
			destroy_component(button0);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(table);
			destroy_component(icon0);
			destroy_component(icon1);
			destroy_component(icon2);
			if (detaching) detach_dev(t14);
			if (detaching) detach_dev(div1);
			if (detaching) detach_dev(t15);
			destroy_component(button1, detaching);
			if (detaching) detach_dev(t16);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t17);
			destroy_component(menumodal, detaching);
			if (detaching) detach_dev(t18);
			destroy_component(categorymodal, detaching);
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
	component_subscribe($$self, menu, $$value => $$invalidate(2, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MenuEdit', slots, []);
	let m_edit, m_create_category;

	function edit() {
		$$invalidate(0, m_edit = 1);
	}

	function create_category() {
		$$invalidate(1, m_create_category = 1);
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

	$$self.$capture_state = () => ({
		CategoryModal,
		CategoryCard,
		MenuModal,
		Button,
		Icon,
		menu,
		m_edit,
		m_create_category,
		edit,
		create_category,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('m_edit' in $$props) $$invalidate(0, m_edit = $$props.m_edit);
		if ('m_create_category' in $$props) $$invalidate(1, m_create_category = $$props.m_create_category);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		m_edit,
		m_create_category,
		$menu,
		edit,
		create_category,
		menumodal_show_binding,
		categorymodal_show_binding
	];
}

class MenuEdit extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MenuEdit",
			options,
			id: create_fragment$4.name
		});
	}
}

/* web/components/TopBarItem.svelte generated by Svelte v3.59.2 */
const file$3 = "web/components/TopBarItem.svelte";

function create_fragment$3(ctx) {
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
			add_location(li, file$3, 1, 0, 57);
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
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
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
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { page: 0, name: 1, i: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TopBarItem",
			options,
			id: create_fragment$3.name
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
const file$2 = "web/components/TopBar.svelte";

// (6:4) {:else}
function create_else_block(ctx) {
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
		id: create_else_block.name,
		type: "else",
		source: "(6:4) {:else}",
		ctx
	});

	return block;
}

// (3:4) {#if $session_id}
function create_if_block$2(ctx) {
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
		id: create_if_block$2.name,
		type: "if",
		source: "(3:4) {#if $session_id}",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let div;
	let ul;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block$2, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$session_id*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			div = element("div");
			ul = element("ul");
			if_block.c();
			attr_dev(ul, "class", "row svelte-gt0cw1");
			add_location(ul, file$2, 1, 2, 31);
			attr_dev(div, "class", "usn tac topbar svelte-gt0cw1");
			add_location(div, file$2, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, ul);
			if_blocks[current_block_type_index].m(ul, null);
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
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}

				transition_in(if_block, 1);
				if_block.m(ul, null);
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
			if_blocks[current_block_type_index].d();
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
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TopBar",
			options,
			id: create_fragment$2.name
		});
	}
}

/* web/routes/Login.svelte generated by Svelte v3.59.2 */
const file$1 = "web/routes/Login.svelte";

// (2:2) {#if error}
function create_if_block$1(ctx) {
	let p;
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(/*error*/ ctx[1]);
			attr_dev(p, "class", "red");
			add_location(p, file$1, 1, 14, 52);
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
		id: create_if_block$1.name,
		type: "if",
		source: "(2:2) {#if error}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let form;
	let t0;
	let label0;
	let t1;
	let input0;
	let t2;
	let label1;
	let t3;
	let div;
	let input1;
	let t4;
	let input2;
	let t5;
	let icon;
	let t6;
	let button;
	let t7_value = (/*l_submitting*/ ctx[3] ? '...' : 'Entrar') + "";
	let t7;
	let current;
	let mounted;
	let dispose;
	let if_block = /*error*/ ctx[1] && create_if_block$1(ctx);

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
			form = element("form");
			if (if_block) if_block.c();
			t0 = space();
			label0 = element("label");
			t1 = text("Nome:\n    ");
			input0 = element("input");
			t2 = space();
			label1 = element("label");
			t3 = text("Senha:\n    ");
			div = element("div");
			input1 = element("input");
			t4 = space();
			input2 = element("input");
			t5 = space();
			create_component(icon.$$.fragment);
			t6 = space();
			button = element("button");
			t7 = text(t7_value);
			attr_dev(input0, "type", "text");
			input0.required = true;
			attr_dev(input0, "class", "svelte-1vbuy7x");
			add_location(input0, file$1, 4, 4, 108);
			add_location(label0, file$1, 3, 2, 90);
			attr_dev(input1, "type", "password");
			set_style(input1, "display", /*show_password*/ ctx[2] ? 'none' : 'block');
			attr_dev(input1, "class", "svelte-1vbuy7x");
			add_location(input1, file$1, 9, 6, 238);
			attr_dev(input2, "type", "text");
			set_style(input2, "display", /*show_password*/ ctx[2] ? 'block' : 'none');
			attr_dev(input2, "class", "svelte-1vbuy7x");
			add_location(input2, file$1, 10, 6, 350);
			attr_dev(div, "class", "password-container");
			add_location(div, file$1, 8, 4, 199);
			add_location(label1, file$1, 7, 2, 180);
			attr_dev(button, "type", "submit");
			button.disabled = /*l_submitting*/ ctx[3];
			attr_dev(button, "class", "svelte-1vbuy7x");
			add_location(button, file$1, 15, 2, 581);
			attr_dev(form, "class", "tas svelte-1vbuy7x");
			add_location(form, file$1, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, form, anchor);
			if (if_block) if_block.m(form, null);
			append_dev(form, t0);
			append_dev(form, label0);
			append_dev(label0, t1);
			append_dev(label0, input0);
			set_input_value(input0, /*user*/ ctx[0].username);
			append_dev(form, t2);
			append_dev(form, label1);
			append_dev(label1, t3);
			append_dev(label1, div);
			append_dev(div, input1);
			set_input_value(input1, /*user*/ ctx[0].password);
			append_dev(div, t4);
			append_dev(div, input2);
			set_input_value(input2, /*user*/ ctx[0].password);
			append_dev(div, t5);
			mount_component(icon, div, null);
			append_dev(form, t6);
			append_dev(form, button);
			append_dev(button, t7);
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
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(form, t0);
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
			if ((!current || dirty & /*l_submitting*/ 8) && t7_value !== (t7_value = (/*l_submitting*/ ctx[3] ? '...' : 'Entrar') + "")) set_data_dev(t7, t7_value);

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
			if (detaching) detach_dev(form);
			if (if_block) if_block.d();
			destroy_component(icon);
			mounted = false;
			run_all(dispose);
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
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Login",
			options,
			id: create_fragment$1.name
		});
	}
}

/* web/App.svelte generated by Svelte v3.59.2 */
const file = "web/App.svelte";

// (9:45) 
function create_if_block_3(ctx) {
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
		id: create_if_block_3.name,
		type: "if",
		source: "(9:45) ",
		ctx
	});

	return block;
}

// (8:45) 
function create_if_block_2(ctx) {
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
		id: create_if_block_2.name,
		type: "if",
		source: "(8:45) ",
		ctx
	});

	return block;
}

// (7:4) {#if      $menu && $curr_page == 'menu'}
function create_if_block_1(ctx) {
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
		id: create_if_block_1.name,
		type: "if",
		source: "(7:4) {#if      $menu && $curr_page == 'menu'}",
		ctx
	});

	return block;
}

// (4:2) {#if loading}
function create_if_block(ctx) {
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
		id: create_if_block.name,
		type: "if",
		source: "(4:2) {#if loading}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let topbar;
	let t;
	let main;
	let current_block_type_index;
	let if_block;
	let current;
	topbar = new TopBar({ $$inline: true });
	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2, create_if_block_3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*loading*/ ctx[1]) return 0;
		if (/*$menu*/ ctx[2] && /*$curr_page*/ ctx[0] == 'menu') return 1;
		if (/*$menu*/ ctx[2] && /*$curr_page*/ ctx[0] == 'items') return 2;
		if (/*$curr_page*/ ctx[0] == 'login') return 3;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			create_component(topbar.$$.fragment);
			t = space();
			main = element("main");
			if (if_block) if_block.c();
			attr_dev(main, "class", "svelte-t87hng");
			add_location(main, file, 2, 0, 12);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
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
	component_subscribe($$self, session_id, $$value => $$invalidate(3, $session_id = $$value));
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, $$value => $$invalidate(2, $menu = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('App', slots, []);
	let loading = true;

	onMount(async _ => {
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
		ItemsEdit,
		MenuEdit,
		TopBar,
		Login,
		session_id,
		curr_page,
		menu,
		api,
		onMount,
		loading,
		$curr_page,
		$session_id,
		$menu
	});

	$$self.$inject_state = $$props => {
		if ('loading' in $$props) $$invalidate(1, loading = $$props.loading);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$session_id, $curr_page*/ 9) {
			{
				if (!$session_id) curr_page.set('login'); else if ($curr_page == 'login' || !$curr_page) curr_page.set('items');
			}
		}
	};

	return [$curr_page, loading, $menu, $session_id];
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
