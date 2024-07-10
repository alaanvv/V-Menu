import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app, load_routes } from '../app'
import request from 'supertest'

describe('Menu management', _ => {
  let menu_id: string, category_id: string, subcategory_id: string, item_id: string

  beforeAll(async _ => {
    await load_routes()
    await app.ready()
  })
  afterAll(async  _ => await app.close())

  describe('POST /menu', _ => {
    it('should be able to create a menu', async _ => {
      const res = await request(app.server).post('/menu').send({
        name:     'Aderaldo Lanxes',
        address:  'Rua A, Centro, n°57',
        phone:    '(12) 3456-7891',
        whatsapp: '(12) 3456-7891'
      })

      expect(res.statusCode).toEqual(201)
      menu_id = res.body.menu.id
    })
  })

  describe('POST /category', _ => {
    it('should be able to create a category', async _ => {
      const res = await request(app.server).post(`/category/${menu_id}`).send({
        name: 'Hamburgueres'
      })

      expect(res.statusCode).toEqual(201)
      category_id = res.body.category.id
    })
  })

  describe('POST /subcategory', _ => {
    it('should be able to create a subcategory', async _ => {
      const res = await request(app.server).post(`/subcategory/${category_id}`).send({
        name: 'Artes anais'
      })

      expect(res.statusCode).toEqual(201)
      subcategory_id = res.body.subcategory.id
    })
  })

  describe('POST /item', _ => {
    it('should be able to create an item', async _ => {
      const res = await request(app.server).post(`/item/${subcategory_id}`).send({
        name:           'Iron Man',
        description:    'Pão, metal, pão',
        price_in_cents: 24e3,
      })

      expect(res.statusCode).toEqual(201)
      item_id = res.body.item.id
    })
  })

  describe('PUT /menu', _ => {
    it('should be able to edit a menu', async _ => {
      const res = await request(app.server).put(`/menu/${menu_id}`).send({
        name:     'Aderaldo Lanxes',
        address:  'Rua A, Centro, n°57',
        phone:    '(12) 3456-7891',
        whatsapp: '(12) 3456-7891'
      })

      expect(res.statusCode).toEqual(204)
    })
  })

  describe('PUT /category', _ => {
    it('should be able to edit a category', async _ => {
      const res = await request(app.server).put(`/category/${category_id}`).send({
        name: 'Hamburgueres'
      })

      expect(res.statusCode).toEqual(204)
    })
  })

  describe('PUT /subcategory', _ => {
    it('should be able to edit a subcategory', async _ => {
      const res = await request(app.server).put(`/subcategory/${subcategory_id}`).send({
        name: 'Artes anais'
      })

      expect(res.statusCode).toEqual(204)
    })
  })

  describe('PUT /item', _ => {
    it('should be able to edit an item', async _ => {
      const res = await request(app.server).put(`/item/${item_id}`).send({
        name:           'Iron Man',
        description:    'Pão, metal, pão',
        price_in_cents: 24e3,
      })

      expect(res.statusCode).toEqual(204)
    })
  })
})
