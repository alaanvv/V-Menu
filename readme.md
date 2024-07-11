# Summary
- [Database](#database)
- [Routes](#routes)
- [Todo](#todo)

# Database
```prisma
 model Menu {
  id         String     @id @default(cuid())
  name       String
  phone      String
  whatsapp   String
  address    String

  categories Category[]
  @@map("menus")
}

model Category {
  id            String        @id @default(cuid())
  menu_id       String
  name          String

  menu          Menu          @relation(fields: [menu_id], references: [id], onDelete: Cascade)
  subcategories Subcategory[]
  @@map("categories")
}

model Subcategory {
  id          String   @id @default(cuid())
  category_id String
  name        String

  category    Category @relation(fields: [category_id], references: [id], onDelete: Cascade)
  items       Item[]
  @@map("subcategories")
}

model Item {
  id             String      @id @default(cuid())
  subcategory_id String
  name           String
  description    String
  price_in_cents Decimal

  subcategory    Subcategory @relation(fields: [subcategory_id], references: [id], onDelete: Cascade)
  @@map("items")
}
```

# Todo
- [x] Setup database
- [x] Create management routes
- [ ] Frontend to manage menus
