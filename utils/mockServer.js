const sampleSize = require('lodash.samplesize')
const categories = [
  {
    id: 'cats',
    cTitle: 'Cats',
    cName: 'Cats',
    cSlug: 'cats',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?cat,cats',
    products: []
  },
  {
    id: 'dogs',
    cTitle: 'Dogs',
    cName: 'Dogs',
    cSlug: 'dogs',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?dog,dogs',
    products: []
  },
  {
    id: 'wolfs',
    cTitle: 'Wolfs',
    cName: 'Wolfs',
    cSlug: 'wolfs',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?wolf',
    products: []
  },
  {
    id: 'bulls',
    cTitle: 'Bulls',
    cName: 'Bulls',
    cSlug: 'bulls',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?bull',
    products: []
  }
]

function getProductsByIds (products, ids) {
  const innerProducts = products.filter(p => p.id === ids.find(id => p.id === id))
  if (!innerProducts) return null
  return innerProducts.map(pr => {
    return {
      ...pr,
      image: `https://source.unsplash.com/300x300/?${innerProducts.pName}`,
      category: categories.find(cat => cat.id === pr.category_id)
    }
  })
}

function getProduct (products, productSlug) {
  const innerProduct = products.find(p => p.pSlug === productSlug)
  if (!innerProduct) return null
  return {
    ...innerProduct,
    image: `https://source.unsplash.com/300x300/?${innerProduct.pName}`,
    category: categories.find(cat => cat.id === innerProduct.category_id)
  }
}

function addProductsToCategory (products, category) {
  const categoryInner = { ...category, products: [] }
  products.map(p => {
    if (p.category_id === category.id) {
      categoryInner.products.push({
        id: p.id,
        pName: p.pName,
        pSlug: p.pSlug,
        pPrice: p.pPrice,
        image: `https://source.unsplash.com/300x300/?${p.pName}`
      })
    }
  })
  return categoryInner
}

function getBreadcrumbs (pageType, route, data) {
  const crumbs = []
  crumbs.push({
    title: 'Главная',
    url: '/'
  })
  switch (pageType) {
    case 'category':
      crumbs.push({
        title: data.cName,
        url: `/category/${data.cSlug}`
      })
      break
    case 'product':
      crumbs.push({
        title: data.category.cName,
        url: `/category/${data.category.cSlug}`
      })
      crumbs.push({
        title: data.pName,
        url: `/product/${data.pSlug}`
      })

      break

    default:
      break
  }
  return crumbs
}

export default { categories, sampleSize, getProductsByIds, getProduct, addProductsToCategory, getBreadcrumbs }