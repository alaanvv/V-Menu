# Summary
- [Database](#database)
- [Todo](#todo)

# Database
```prisma   
 model Menu {
  id       String @id @default(cuid())
  username String
  password String
  name     String
  phone    String?
  whatsapp String?
  address  String?

  categories Category[]
  session    Session[]

  @@map("menus")
}

model Category {
  id      String @id @default(cuid())
  menu_id String
  name    String
  pos     Int    @default(autoincrement())

  menu          Menu          @relation(fields: [menu_id], references: [id], onDelete: Cascade)
  subcategories Subcategory[]

  @@map("categories")
}

model Subcategory {
  id          String @id @default(cuid())
  category_id String
  name        String
  pos         Int    @default(autoincrement())

  category Category @relation(fields: [category_id], references: [id], onDelete: Cascade)
  items    Item[]

  @@map("subcategories")
}

model Item {
  id             String  @id @default(cuid())
  subcategory_id String
  name           String
  description    String?
  price_in_cents Decimal
  pos            Int     @default(autoincrement())

  subcategory Subcategory @relation(fields: [subcategory_id], references: [id], onDelete: Cascade)

  @@map("items")
}

model Session {
  id      String @id @default(cuid())
  menu_id String

  menu Menu @relation(fields: [menu_id], references: [id], onDelete: Cascade)

  @@map("sessions")
}
```

# Todo
- [x] Setup database
- [x] Create management routes
- [x] Frontend to manage menus
- [x] Create order features
- [x] Write missing tests
- [x] Account system
