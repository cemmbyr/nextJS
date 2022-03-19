import React, { FC, useState } from 'react'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { getProducts } from '../services'

const HomePage: FC<IHomepage> = ({ products }) => {
  const [newProducts, setNewProducts] = useState<Object[]>(products)
  const [page, setPage] = useState(0)
  const [productId, setProductId] = useState(null)

  const pageNumber = Math.ceil(newProducts.length / 10)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const query = e.target.search_query.value
    
    if (query === '') {
      setNewProducts(products)
    } else {
      const filteredProduct = products.filter(
        (item: any) => {
          return item.title.slice(0, 2).toLowerCase() === query.slice(0, 2).toLowerCase()
        }
      )

      setNewProducts(filteredProduct?.length > 0 ? filteredProduct : [])
    }
  }

  return (
    <>
      <div className="header d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="d-flex">
          <input
            type="text"
            name="search_query"
          />
          <button type="submit">Find Product</button>
        </form>
      </div>
      <div className="container">
        {newProducts.slice(page*10, ((page*10) + 10)).map((item: any, index) => {
          return (
            <div className="card_wrapper" key={index}>
              <div className="card_wrapper_img">
                <Image
                  loader={() => item.image.src}
                  src={item.image.src}
                  width="170"
                  height="50"
                  layout="responsive"
                  alt={item.title}
                  unoptimized
                />
              </div>
              <div className="card_wrapper_info">
                <h1>{item.title}</h1>
                {item.variants?.length > 0 &&
                  <div>
                    Price: {item.variants[0].price} TL
                  </div>
                }

                <button
                  className="card_wrapper_btn"
                  onClick={() => setProductId(item.id)}
                >
                  Show Detail
                </button>

                {productId === item.id &&
                  <div dangerouslySetInnerHTML={{__html: item.body_html}} />
                }
              </div>
            </div>
          )
        })}
        {pageNumber !== 1 &&
          <div className="d-flex justify-content-end paginate">
            {
              [...Array(pageNumber)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index)}
                  disabled={page === index}
                >
                  {index + 1}
                </button>
                )
              )
            }
          </div>
        }
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: { products } } = await getProducts()

  return {
    props: {
      products
    }
  }
}

export default HomePage
