import Food from './Food'

const Foods = ({ products }) => {
  return (
    <>
      <section id="new-arrivals" className="new-arrivals">
        <div className="container">
          <div className="section-header">
            <h2>All Products</h2>
          </div>
          <div className="new-arrivals-content">
            <div className="row">
              {products.map((item, i) => (
                <Food item={item} key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Foods
