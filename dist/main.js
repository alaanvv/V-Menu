/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/src/env/index.js":
/*!*******************************!*\
  !*** ./dist/src/env/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.env = void 0;\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nconst envSchema = zod_1.z.object({\n    NODE_ENV: zod_1.z.enum(['dev', 'test', 'production']).default('production'),\n    DATABASE_URL: zod_1.z.string(),\n    HOST: zod_1.z.string().default('0.0.0.0'),\n    PORT: zod_1.z.coerce.number().default(3333)\n});\nconst _env = envSchema.safeParse(process.env);\nif (!_env.success)\n    throw new Error('Invalid environment variables', { cause: _env.error.issues });\nexports.env = _env.data;\n\n\n//# sourceURL=webpack://v-menu/./dist/src/env/index.js?");

/***/ }),

/***/ "./dist/src/http/app.js":
/*!******************************!*\
  !*** ./dist/src/http/app.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.app = void 0;\nexports.load_routes = load_routes;\nconst errors_1 = __webpack_require__(/*! ./errors */ \"./dist/src/http/errors.js\");\nconst static_1 = __importDefault(__webpack_require__(/*! @fastify/static */ \"@fastify/static\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! @fastify/cors */ \"@fastify/cors\"));\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nconst fastify_1 = __importDefault(__webpack_require__(/*! fastify */ \"fastify\"));\nconst env_1 = __webpack_require__(/*! ../env */ \"./dist/src/env/index.js\");\nconst glob_1 = __webpack_require__(/*! glob */ \"glob\");\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nexports.app = (0, fastify_1.default)();\nexports.app.register(cors_1.default, { origin: '*' });\nexports.app.register(static_1.default, { root: path_1.default.join(process.cwd(), 'public') });\nexports.app.get('/s/*', (_, res) => res.sendFile('index.html'));\nexports.app.get('/s', (_, res) => res.redirect(302, '/s/'));\nexports.app.get('/', (_, res) => res.redirect(302, '/s/'));\nasync function load_routes() {\n    try {\n        const context = __webpack_require__(\"./dist/src/http/routes sync recursive \\\\.js$\");\n        const routes = context.keys().map(context);\n        await Promise.all(routes.map(async (route) => { await exports.app.register(route.default || route); }));\n    }\n    catch {\n        const routes = glob_1.glob.sync(path_1.default.join(__dirname, './routes/*/*'));\n        await Promise.all(routes.map(async (path) => exports.app.register((await __webpack_require__(\"./dist/src/http lazy recursive ^.*$\")(`${path}`)).default)));\n    }\n}\nexports.app.setErrorHandler((error, _, reply) => {\n    if (error instanceof zod_1.ZodError)\n        return reply.status(400).send({ message: 'Validation error.', issues: error.issues });\n    if (error instanceof errors_1.BadRequestError)\n        return reply.status(400).send({ message: error.message });\n    if (error instanceof errors_1.NotFoundError)\n        return reply.status(404).send({ message: error.message });\n    if (error instanceof errors_1.ForbiddenError)\n        return reply.status(403).send({ message: error.message });\n    if (env_1.env.NODE_ENV !== 'production')\n        console.log(error);\n    return reply.status(500).send({ message: 'Internal server error.' });\n});\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/app.js?");

/***/ }),

/***/ "./dist/src/http/errors.js":
/*!*********************************!*\
  !*** ./dist/src/http/errors.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.NotFoundError = exports.ForbiddenError = exports.BadRequestError = void 0;\nclass BadRequestError extends Error {\n}\nexports.BadRequestError = BadRequestError;\nclass ForbiddenError extends Error {\n}\nexports.ForbiddenError = ForbiddenError;\nclass NotFoundError extends Error {\n}\nexports.NotFoundError = NotFoundError;\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/errors.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/create-category.js":
/*!*****************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/create-category.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/category/:id', async (req, res) => {\n        const bodySchema = zod_1.z.object({ name: zod_1.z.string() });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        if (!await prisma_1.prisma.menu.findUnique({ where: { id } }))\n            throw new errors_1.NotFoundError('Menu not found.');\n        const max_pos = await prisma_1.prisma.category.aggregate({\n            where: { menu_id: id },\n            _max: { pos: true }\n        });\n        const pos = (max_pos._max.pos || 0) + 1;\n        const category = await prisma_1.prisma.category.create({ data: { ...data, menu_id: id, pos } });\n        return res.status(201).send({ category });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/create-category.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/create-item.js":
/*!*************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/create-item.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/item/:id', async (req, res) => {\n        const bodySchema = zod_1.z.object({\n            name: zod_1.z.string(),\n            description: zod_1.z.optional(zod_1.z.string()),\n            price_in_cents: zod_1.z.number().int().min(1),\n        });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        if (!await prisma_1.prisma.subcategory.findUnique({ where: { id } }))\n            throw new errors_1.NotFoundError('Subcategory not found.');\n        const max_pos = await prisma_1.prisma.item.aggregate({\n            where: { subcategory_id: id },\n            _max: { pos: true }\n        });\n        const pos = (max_pos._max.pos || 0) + 1;\n        const item = await prisma_1.prisma.item.create({ data: { ...data, subcategory_id: id, pos } });\n        return res.status(201).send({ item });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/create-item.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/create-menu.js":
/*!*************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/create-menu.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/menu', async (req, res) => {\n        const bodySchema = zod_1.z.object({\n            username: zod_1.z.string(),\n            password: zod_1.z.string(),\n            name: zod_1.z.string(),\n            phone: zod_1.z.optional(zod_1.z.string()),\n            whatsapp: zod_1.z.optional(zod_1.z.string()),\n            address: zod_1.z.optional(zod_1.z.string())\n        });\n        const data = bodySchema.parse(req.body);\n        if (!(await (0, auth_1.is_trusted_ip)(req)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        const menu = await prisma_1.prisma.menu.create({ data });\n        delete menu.username;\n        delete menu.password;\n        return res.status(201).send({ menu });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/create-menu.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/create-subcategory.js":
/*!********************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/create-subcategory.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/subcategory/:id', async (req, res) => {\n        const bodySchema = zod_1.z.object({ name: zod_1.z.string() });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        if (!await prisma_1.prisma.category.findUnique({ where: { id } }))\n            throw new errors_1.NotFoundError('Category not found.');\n        const max_pos = await prisma_1.prisma.subcategory.aggregate({\n            where: { category_id: id },\n            _max: { pos: true }\n        });\n        const pos = (max_pos._max.pos || 0) + 1;\n        const subcategory = await prisma_1.prisma.subcategory.create({ data: { ...data, category_id: id, pos } });\n        return res.status(201).send({ subcategory });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/create-subcategory.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/delete-category.js":
/*!*****************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/delete-category.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.delete('/category/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        try {\n            const category = await prisma_1.prisma.category.delete({ where: { id } });\n            await prisma_1.prisma.category.updateMany({\n                where: { menu_id: category.menu_id, pos: { gt: category.pos } },\n                data: { pos: { decrement: 1 } }\n            });\n        }\n        catch {\n            throw new errors_1.BadRequestError('Category not found.');\n        }\n        return res.status(204).send();\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/delete-category.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/delete-item.js":
/*!*************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/delete-item.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.delete('/item/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        try {\n            const item = await prisma_1.prisma.item.delete({ where: { id } });\n            await prisma_1.prisma.item.updateMany({\n                where: { subcategory_id: item.subcategory_id, pos: { gt: item.pos } },\n                data: { pos: { decrement: 1 } }\n            });\n        }\n        catch {\n            throw new errors_1.BadRequestError('Item not found.');\n        }\n        return res.status(204).send();\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/delete-item.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/delete-menu.js":
/*!*************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/delete-menu.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.delete('/menu/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.is_trusted_ip)(req)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        try {\n            await prisma_1.prisma.menu.delete({ where: { id } });\n        }\n        catch {\n            throw new errors_1.BadRequestError('Menu not found.');\n        }\n        return res.status(204).send();\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/delete-menu.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/delete-subcategory.js":
/*!********************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/delete-subcategory.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.delete('/subcategory/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        try {\n            const subcategory = await prisma_1.prisma.subcategory.delete({ where: { id } });\n            await prisma_1.prisma.subcategory.updateMany({\n                where: { category_id: subcategory.category_id, pos: { gt: subcategory.pos } },\n                data: { pos: { decrement: 1 } }\n            });\n        }\n        catch {\n            throw new errors_1.BadRequestError('Subcategory not found.');\n        }\n        return res.status(204).send();\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/delete-subcategory.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/edit-category.js":
/*!***************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/edit-category.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/category/:id', async (req, res) => {\n        const bodySchema = zod_1.z.object({ name: zod_1.z.optional(zod_1.z.string()) });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        for (let entry of Object.entries(data))\n            if (entry[1] === null)\n                delete data[entry[0]];\n        if (!Object.entries(data).length)\n            throw new errors_1.BadRequestError('Sent no data.');\n        let category;\n        try {\n            category = await prisma_1.prisma.category.update({ where: { id }, data });\n        }\n        catch {\n            throw new errors_1.NotFoundError('Category not found.');\n        }\n        return res.status(204).send({ category });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/edit-category.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/edit-item.js":
/*!***********************************************************!*\
  !*** ./dist/src/http/routes/menu-management/edit-item.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/item/:id', async (req, res) => {\n        const bodySchema = zod_1.z.object({\n            name: zod_1.z.optional(zod_1.z.string()),\n            description: zod_1.z.optional(zod_1.z.string()),\n            price_in_cents: zod_1.z.optional(zod_1.z.number().int().min(1))\n        });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        for (let entry of Object.entries(data))\n            if (entry[1] === null)\n                delete data[entry[0]];\n        if (!Object.entries(data).length)\n            throw new errors_1.BadRequestError('Sent no data.');\n        let item;\n        try {\n            item = await prisma_1.prisma.item.update({ where: { id }, data });\n        }\n        catch {\n            throw new errors_1.NotFoundError('Item not found.');\n        }\n        return res.status(204).send({ item });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/edit-item.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/edit-menu.js":
/*!***********************************************************!*\
  !*** ./dist/src/http/routes/menu-management/edit-menu.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/menu/:id', async (req, res) => {\n        const bodySchema = zod_1.z.object({\n            name: zod_1.z.optional(zod_1.z.string()),\n            phone: zod_1.z.optional(zod_1.z.string()),\n            whatsapp: zod_1.z.optional(zod_1.z.string()),\n            address: zod_1.z.optional(zod_1.z.string())\n        });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        for (let entry of Object.entries(data))\n            if (entry[1] === null)\n                delete data[entry[0]];\n        if (!Object.entries(data).length)\n            throw new errors_1.BadRequestError('Sent no data.');\n        let menu;\n        try {\n            menu = await prisma_1.prisma.menu.update({ where: { id }, data });\n        }\n        catch {\n            throw new errors_1.NotFoundError('Menu not found.');\n        }\n        delete menu.username;\n        delete menu.password;\n        return res.status(204).send({ menu });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/edit-menu.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/edit-subcategory.js":
/*!******************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/edit-subcategory.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/subcategory/:id', async (req, res) => {\n        const bodySchema = zod_1.z.object({ name: zod_1.z.optional(zod_1.z.string()) });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        for (let entry of Object.entries(data))\n            if (entry[1] === null)\n                delete data[entry[0]];\n        if (!Object.entries(data).length)\n            throw new errors_1.BadRequestError('Sent no data.');\n        let subcategory;\n        try {\n            subcategory = await prisma_1.prisma.subcategory.update({ where: { id }, data });\n        }\n        catch {\n            throw new errors_1.NotFoundError('Subcategory not found.');\n        }\n        return res.status(204).send({ subcategory });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/edit-subcategory.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/get-all-menus.js":
/*!***************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/get-all-menus.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nasync function default_1(app) {\n    app.get('/menus', async (_, res) => {\n        const menus = await prisma_1.prisma.menu.findMany();\n        for (let i in menus) {\n            delete menus[i].username;\n            delete menus[i].password;\n        }\n        return res.status(200).send({ menus });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/get-all-menus.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/get-menu-from-session.js":
/*!***********************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/get-menu-from-session.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.get('/menu-from-session/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const session = await prisma_1.prisma.session.findUnique({ where: { id } });\n        if (!session)\n            throw new errors_1.NotFoundError('Session not found.');\n        const menu = await prisma_1.prisma.menu.findUnique({ where: { id: session.menu_id } });\n        if (!menu)\n            throw new errors_1.NotFoundError('Menu not found.');\n        const categories = await prisma_1.prisma.category.findMany({ where: { menu_id: session.menu_id }, orderBy: { pos: 'asc' } });\n        for (let i in categories) {\n            const subcategories = await prisma_1.prisma.subcategory.findMany({ where: { category_id: categories[i].id }, orderBy: { pos: 'asc' } });\n            categories[i].subcategories = subcategories;\n            for (let i in subcategories) {\n                const items = await prisma_1.prisma.item.findMany({ where: { subcategory_id: subcategories[i].id }, orderBy: { pos: 'asc' } });\n                subcategories[i].items = items;\n            }\n        }\n        menu.categories = categories;\n        delete menu.username;\n        delete menu.password;\n        return res.status(200).send({ menu });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/get-menu-from-session.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/get-menu.js":
/*!**********************************************************!*\
  !*** ./dist/src/http/routes/menu-management/get-menu.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.get('/menu/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const menu = await prisma_1.prisma.menu.findUnique({ where: { id } });\n        if (!menu)\n            throw new errors_1.NotFoundError('Menu not found.');\n        const categories = await prisma_1.prisma.category.findMany({ where: { menu_id: id }, orderBy: { pos: 'asc' } });\n        for (let i in categories) {\n            const subcategories = await prisma_1.prisma.subcategory.findMany({ where: { category_id: categories[i].id }, orderBy: { pos: 'asc' } });\n            categories[i].subcategories = subcategories;\n            for (let i in subcategories) {\n                const items = await prisma_1.prisma.item.findMany({ where: { subcategory_id: subcategories[i].id }, orderBy: { pos: 'asc' } });\n                subcategories[i].items = items;\n            }\n        }\n        menu.categories = categories;\n        delete menu.username;\n        delete menu.password;\n        return res.status(200).send({ menu });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/get-menu.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/raise-category.js":
/*!****************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/raise-category.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/raise-category/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        const category = await prisma_1.prisma.category.findUnique({ where: { id } });\n        if (!category)\n            throw new errors_1.NotFoundError('Category not found.');\n        if (category.pos == 1)\n            throw new errors_1.BadRequestError('Already on top.');\n        await prisma_1.prisma.category.updateMany({\n            where: {\n                menu_id: category.menu_id,\n                pos: category.pos - 1,\n            },\n            data: {\n                pos: { increment: 1 }\n            }\n        });\n        await prisma_1.prisma.category.update({\n            where: { id },\n            data: { pos: { decrement: 1 } }\n        });\n        return res.status(204).send({ category });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/raise-category.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/raise-item.js":
/*!************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/raise-item.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/raise-item/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        const item = await prisma_1.prisma.item.findUnique({ where: { id } });\n        if (!item)\n            throw new errors_1.NotFoundError('Item not found.');\n        if (item.pos == 1)\n            throw new errors_1.BadRequestError('Already on top.');\n        await prisma_1.prisma.item.updateMany({\n            where: {\n                subcategory_id: item.subcategory_id,\n                pos: item.pos - 1,\n            },\n            data: {\n                pos: { increment: 1 }\n            }\n        });\n        await prisma_1.prisma.item.update({\n            where: { id },\n            data: { pos: { decrement: 1 } }\n        });\n        return res.status(204).send({ item });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/raise-item.js?");

/***/ }),

/***/ "./dist/src/http/routes/menu-management/raise-subcategory.js":
/*!*******************************************************************!*\
  !*** ./dist/src/http/routes/menu-management/raise-subcategory.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/raise-subcategory/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        if (!(await (0, auth_1.get_auth)(req, id)))\n            throw new errors_1.ForbiddenError('No privileges.');\n        const subcategory = await prisma_1.prisma.subcategory.findUnique({ where: { id } });\n        if (!subcategory)\n            throw new errors_1.NotFoundError('Subcategory not found.');\n        if (subcategory.pos == 1)\n            throw new errors_1.BadRequestError('Already on top.');\n        await prisma_1.prisma.subcategory.updateMany({\n            where: {\n                category_id: subcategory.category_id,\n                pos: subcategory.pos - 1\n            },\n            data: {\n                pos: { increment: 1 }\n            }\n        });\n        await prisma_1.prisma.subcategory.update({\n            where: { id },\n            data: { pos: { decrement: 1 } }\n        });\n        return res.status(204).send({ subcategory });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/menu-management/raise-subcategory.js?");

/***/ }),

/***/ "./dist/src/http/routes/user-auth/login.js":
/*!*************************************************!*\
  !*** ./dist/src/http/routes/user-auth/login.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/login', async (req, res) => {\n        const bodySchema = zod_1.z.object({\n            username: zod_1.z.string(),\n            password: zod_1.z.string()\n        });\n        const data = bodySchema.parse(req.body);\n        const menu = await prisma_1.prisma.menu.findFirst({ where: { username: data.username, password: data.password } });\n        if (!menu)\n            throw new errors_1.BadRequestError('Invalid credentials.');\n        const session = await prisma_1.prisma.session.create({ data: { menu_id: menu.id } });\n        return res.status(200).send({ session });\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/user-auth/login.js?");

/***/ }),

/***/ "./dist/src/http/routes/user-auth/logout.js":
/*!**************************************************!*\
  !*** ./dist/src/http/routes/user-auth/logout.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = default_1;\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/logout', async (req, res) => {\n        const bodySchema = zod_1.z.object({\n            session_id: zod_1.z.string().cuid()\n        });\n        const { session_id } = bodySchema.parse(req.body);\n        try {\n            await prisma_1.prisma.session.delete({ where: { id: session_id } });\n        }\n        catch {\n            throw new errors_1.NotFoundError('Session not found.');\n        }\n        return res.status(204).send();\n    });\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/user-auth/logout.js?");

/***/ }),

/***/ "./dist/src/http/routes sync recursive \\.js$":
/*!******************************************!*\
  !*** ./dist/src/http/routes/ sync \.js$ ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./menu-management/create-category.js\": \"./dist/src/http/routes/menu-management/create-category.js\",\n\t\"./menu-management/create-item.js\": \"./dist/src/http/routes/menu-management/create-item.js\",\n\t\"./menu-management/create-menu.js\": \"./dist/src/http/routes/menu-management/create-menu.js\",\n\t\"./menu-management/create-subcategory.js\": \"./dist/src/http/routes/menu-management/create-subcategory.js\",\n\t\"./menu-management/delete-category.js\": \"./dist/src/http/routes/menu-management/delete-category.js\",\n\t\"./menu-management/delete-item.js\": \"./dist/src/http/routes/menu-management/delete-item.js\",\n\t\"./menu-management/delete-menu.js\": \"./dist/src/http/routes/menu-management/delete-menu.js\",\n\t\"./menu-management/delete-subcategory.js\": \"./dist/src/http/routes/menu-management/delete-subcategory.js\",\n\t\"./menu-management/edit-category.js\": \"./dist/src/http/routes/menu-management/edit-category.js\",\n\t\"./menu-management/edit-item.js\": \"./dist/src/http/routes/menu-management/edit-item.js\",\n\t\"./menu-management/edit-menu.js\": \"./dist/src/http/routes/menu-management/edit-menu.js\",\n\t\"./menu-management/edit-subcategory.js\": \"./dist/src/http/routes/menu-management/edit-subcategory.js\",\n\t\"./menu-management/get-all-menus.js\": \"./dist/src/http/routes/menu-management/get-all-menus.js\",\n\t\"./menu-management/get-menu-from-session.js\": \"./dist/src/http/routes/menu-management/get-menu-from-session.js\",\n\t\"./menu-management/get-menu.js\": \"./dist/src/http/routes/menu-management/get-menu.js\",\n\t\"./menu-management/raise-category.js\": \"./dist/src/http/routes/menu-management/raise-category.js\",\n\t\"./menu-management/raise-item.js\": \"./dist/src/http/routes/menu-management/raise-item.js\",\n\t\"./menu-management/raise-subcategory.js\": \"./dist/src/http/routes/menu-management/raise-subcategory.js\",\n\t\"./user-auth/login.js\": \"./dist/src/http/routes/user-auth/login.js\",\n\t\"./user-auth/logout.js\": \"./dist/src/http/routes/user-auth/logout.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./dist/src/http/routes sync recursive \\\\.js$\";\n\n//# sourceURL=webpack://v-menu/./dist/src/http/routes/_sync_\\.js$?");

/***/ }),

/***/ "./dist/src/http/server.js":
/*!*********************************!*\
  !*** ./dist/src/http/server.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst env_1 = __webpack_require__(/*! ../env */ \"./dist/src/env/index.js\");\nconst app_1 = __webpack_require__(/*! ./app */ \"./dist/src/http/app.js\");\nasync function main() {\n    await (0, app_1.load_routes)();\n    app_1.app.listen({ host: env_1.env.HOST, port: env_1.env.PORT }, (_, addr) => console.log(`Server running at ${addr}`));\n}\nmain();\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/server.js?");

/***/ }),

/***/ "./dist/src/http/utils/auth.js":
/*!*************************************!*\
  !*** ./dist/src/http/utils/auth.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.is_trusted_ip = is_trusted_ip;\nexports.get_auth = get_auth;\nconst prisma_1 = __webpack_require__(/*! ../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst TRUSTED_IPS = [\n    '::ffff:127.0.0.1',\n    '127.0.0.1',\n    '192.168.1.107',\n    '186.194.213.229'\n];\nasync function is_trusted_ip(req) {\n    let ip = req.headers['x-forwarded-for'];\n    if (Array.isArray(ip))\n        ip = ip[0];\n    else if (ip)\n        ip = ip.split(',')[0];\n    else\n        ip = req.socket.remoteAddress;\n    const allow = ip && TRUSTED_IPS.includes(Array.isArray(ip) ? ip[0] : ip);\n    console.log(`Checking privileges for ${ip}: ${allow ? 'Allowing' : 'Denying'}`);\n    return allow;\n}\nasync function get_auth(req, id) {\n    const session_id = req.headers['authorization']?.split(' ')[1];\n    const session = await prisma_1.prisma.session.findFirst({ where: { id: session_id } });\n    if (!session)\n        return;\n    let menu, category, subcategory, item;\n    // Menu\n    menu = await prisma_1.prisma.menu.findUnique({ where: { id } });\n    if (menu)\n        return menu.id == session.menu_id;\n    // Category\n    category = await prisma_1.prisma.category.findUnique({ where: { id } });\n    if (category) {\n        menu = await prisma_1.prisma.menu.findUnique({ where: { id: category.menu_id } });\n        if (menu)\n            return menu.id == session.menu_id;\n    }\n    // Subcategory\n    subcategory = await prisma_1.prisma.subcategory.findUnique({ where: { id } });\n    if (subcategory) {\n        category = await prisma_1.prisma.category.findUnique({ where: { id: subcategory.category_id } });\n        if (category)\n            menu = await prisma_1.prisma.menu.findUnique({ where: { id: category.menu_id } });\n        if (menu)\n            return menu.id == session.menu_id;\n    }\n    // Item\n    item = await prisma_1.prisma.item.findUnique({ where: { id } });\n    if (item) {\n        subcategory = await prisma_1.prisma.subcategory.findUnique({ where: { id: item.subcategory_id } });\n        if (subcategory)\n            category = await prisma_1.prisma.category.findUnique({ where: { id: subcategory.category_id } });\n        if (category)\n            menu = await prisma_1.prisma.menu.findUnique({ where: { id: category.menu_id } });\n        if (menu)\n            return menu.id == session.menu_id;\n    }\n}\n\n\n//# sourceURL=webpack://v-menu/./dist/src/http/utils/auth.js?");

/***/ }),

/***/ "./dist/src/http lazy recursive ^.*$":
/*!***************************************************!*\
  !*** ./dist/src/http/ lazy ^.*$ namespace object ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./app\": [\n\t\t\"./dist/src/http/app.js\",\n\t\t7\n\t],\n\t\"./app.js\": [\n\t\t\"./dist/src/http/app.js\",\n\t\t7\n\t],\n\t\"./errors\": [\n\t\t\"./dist/src/http/errors.js\",\n\t\t9\n\t],\n\t\"./errors.js\": [\n\t\t\"./dist/src/http/errors.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/create-category\": [\n\t\t\"./dist/src/http/routes/menu-management/create-category.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/create-category.js\": [\n\t\t\"./dist/src/http/routes/menu-management/create-category.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/create-item\": [\n\t\t\"./dist/src/http/routes/menu-management/create-item.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/create-item.js\": [\n\t\t\"./dist/src/http/routes/menu-management/create-item.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/create-menu\": [\n\t\t\"./dist/src/http/routes/menu-management/create-menu.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/create-menu.js\": [\n\t\t\"./dist/src/http/routes/menu-management/create-menu.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/create-subcategory\": [\n\t\t\"./dist/src/http/routes/menu-management/create-subcategory.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/create-subcategory.js\": [\n\t\t\"./dist/src/http/routes/menu-management/create-subcategory.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/delete-category\": [\n\t\t\"./dist/src/http/routes/menu-management/delete-category.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/delete-category.js\": [\n\t\t\"./dist/src/http/routes/menu-management/delete-category.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/delete-item\": [\n\t\t\"./dist/src/http/routes/menu-management/delete-item.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/delete-item.js\": [\n\t\t\"./dist/src/http/routes/menu-management/delete-item.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/delete-menu\": [\n\t\t\"./dist/src/http/routes/menu-management/delete-menu.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/delete-menu.js\": [\n\t\t\"./dist/src/http/routes/menu-management/delete-menu.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/delete-subcategory\": [\n\t\t\"./dist/src/http/routes/menu-management/delete-subcategory.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/delete-subcategory.js\": [\n\t\t\"./dist/src/http/routes/menu-management/delete-subcategory.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/edit-category\": [\n\t\t\"./dist/src/http/routes/menu-management/edit-category.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/edit-category.js\": [\n\t\t\"./dist/src/http/routes/menu-management/edit-category.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/edit-item\": [\n\t\t\"./dist/src/http/routes/menu-management/edit-item.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/edit-item.js\": [\n\t\t\"./dist/src/http/routes/menu-management/edit-item.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/edit-menu\": [\n\t\t\"./dist/src/http/routes/menu-management/edit-menu.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/edit-menu.js\": [\n\t\t\"./dist/src/http/routes/menu-management/edit-menu.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/edit-subcategory\": [\n\t\t\"./dist/src/http/routes/menu-management/edit-subcategory.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/edit-subcategory.js\": [\n\t\t\"./dist/src/http/routes/menu-management/edit-subcategory.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/get-all-menus\": [\n\t\t\"./dist/src/http/routes/menu-management/get-all-menus.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/get-all-menus.js\": [\n\t\t\"./dist/src/http/routes/menu-management/get-all-menus.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/get-menu\": [\n\t\t\"./dist/src/http/routes/menu-management/get-menu.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/get-menu-from-session\": [\n\t\t\"./dist/src/http/routes/menu-management/get-menu-from-session.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/get-menu-from-session.js\": [\n\t\t\"./dist/src/http/routes/menu-management/get-menu-from-session.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/get-menu.js\": [\n\t\t\"./dist/src/http/routes/menu-management/get-menu.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/raise-category\": [\n\t\t\"./dist/src/http/routes/menu-management/raise-category.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/raise-category.js\": [\n\t\t\"./dist/src/http/routes/menu-management/raise-category.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/raise-item\": [\n\t\t\"./dist/src/http/routes/menu-management/raise-item.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/raise-item.js\": [\n\t\t\"./dist/src/http/routes/menu-management/raise-item.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/raise-subcategory\": [\n\t\t\"./dist/src/http/routes/menu-management/raise-subcategory.js\",\n\t\t9\n\t],\n\t\"./routes/menu-management/raise-subcategory.js\": [\n\t\t\"./dist/src/http/routes/menu-management/raise-subcategory.js\",\n\t\t9\n\t],\n\t\"./routes/user-auth/login\": [\n\t\t\"./dist/src/http/routes/user-auth/login.js\",\n\t\t9\n\t],\n\t\"./routes/user-auth/login.js\": [\n\t\t\"./dist/src/http/routes/user-auth/login.js\",\n\t\t9\n\t],\n\t\"./routes/user-auth/logout\": [\n\t\t\"./dist/src/http/routes/user-auth/logout.js\",\n\t\t9\n\t],\n\t\"./routes/user-auth/logout.js\": [\n\t\t\"./dist/src/http/routes/user-auth/logout.js\",\n\t\t9\n\t],\n\t\"./server\": [\n\t\t\"./dist/src/http/server.js\",\n\t\t9\n\t],\n\t\"./server.js\": [\n\t\t\"./dist/src/http/server.js\",\n\t\t9\n\t],\n\t\"./utils/auth\": [\n\t\t\"./dist/src/http/utils/auth.js\",\n\t\t9\n\t],\n\t\"./utils/auth.js\": [\n\t\t\"./dist/src/http/utils/auth.js\",\n\t\t9\n\t]\n};\n\nfunction webpackAsyncContext(req) {\n\treturn Promise.resolve().then(() => {\n\t\tif(!__webpack_require__.o(map, req)) {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t}\n\n\t\tvar ids = map[req], id = ids[0];\n\t\treturn __webpack_require__.t(id, ids[1] | 16)\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./dist/src/http lazy recursive ^.*$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://v-menu/./dist/src/http/_lazy_^.*$_namespace_object?");

/***/ }),

/***/ "./dist/src/lib/prisma.js":
/*!********************************!*\
  !*** ./dist/src/lib/prisma.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.prisma = void 0;\nconst client_1 = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\nconst env_1 = __webpack_require__(/*! ../env */ \"./dist/src/env/index.js\");\nexports.prisma = new client_1.PrismaClient({\n    log: env_1.env.NODE_ENV == 'dev' ? ['query'] : []\n});\n\n\n//# sourceURL=webpack://v-menu/./dist/src/lib/prisma.js?");

/***/ }),

/***/ "@fastify/cors":
/*!********************************!*\
  !*** external "@fastify/cors" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fastify/cors");

/***/ }),

/***/ "@fastify/static":
/*!**********************************!*\
  !*** external "@fastify/static" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fastify/static");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv/config");

/***/ }),

/***/ "fastify":
/*!**************************!*\
  !*** external "fastify" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("fastify");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("glob");

/***/ }),

/***/ "zod":
/*!**********************!*\
  !*** external "zod" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("zod");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		// The chunk loading function for additional chunks
/******/ 		// Since all referenced chunks are already included
/******/ 		// in this file, this function is empty here.
/******/ 		__webpack_require__.e = () => (Promise.resolve());
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/src/http/server.js");
/******/ 	
/******/ })()
;