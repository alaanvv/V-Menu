import { prisma } from '../prisma'

export async function get_menu(id: string) {
  return await prisma.menu.findUnique({
    where: { id },
    include: {
      categories: {
        orderBy: { pos: 'asc' },
        include: {
          subcategories: {
            orderBy: { pos: 'asc' },
            include: {
              items: {
                orderBy: { pos: 'asc' }
              }
            }
          }
        }
      }
    }
  })
}

export async function get_menu_from_session(id: string) {
  return (await prisma.session.findUnique({
    where: { id },
    include: {
      menu: {
        include: {
          categories: {
            orderBy: { pos: 'asc' },
            include: {
              subcategories: {
                orderBy: { pos: 'asc' },
                include: {
                  items: {
                    orderBy: { pos: 'asc' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }))?.menu
}

export async function get_menu_from_path(path: string) {
  return await prisma.menu.findFirst({
    where: { path },
    include: {
      categories: {
        orderBy: { pos: 'asc' },
        include: {
          subcategories: {
            orderBy: { pos: 'asc' },
            include: {
              items: {
                orderBy: { pos: 'asc' }
              }
            }
          }
        }
      }
    }
  })
}

export async function get_menu_from_category(id: string) {
  return (await prisma.category.findUnique({
    where: { id },
    include: {
      menu: {
        include: {
          categories: {
            orderBy: { pos: 'asc' },
            include: {
              subcategories: {
                orderBy: { pos: 'asc' },
                include: {
                  items: {
                    orderBy: { pos: 'asc' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }))?.menu
}

export async function get_menu_from_subcategory(id: string) {
  return (await prisma.subcategory.findUnique({
    where: { id },
    include: {
      category: {
        include: {
          menu: {
            include: {
              categories: {
                orderBy: { pos: 'asc' },
                include: {
                  subcategories: {
                    orderBy: { pos: 'asc' },
                    include: {
                      items: {
                        orderBy: { pos: 'asc' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }))?.category.menu
}

export async function get_menu_from_item(id: string) {
  return (await prisma.item.findUnique({
    where: { id },
    include: {
      subcategory: {
        include: {
          category: {
            include: {
              menu: {
                include: {
                  categories: {
                    orderBy: { pos: 'asc' },
                    include: {
                      subcategories: {
                        orderBy: { pos: 'asc' },
                        include: {
                          items: {
                            orderBy: { pos: 'asc' }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }))?.subcategory.category.menu
}
