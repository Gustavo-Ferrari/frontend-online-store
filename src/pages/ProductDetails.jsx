import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { fetchItem } from '../services/api';
import Header from '../components/Header';
import EvaluatingForm from '../components/EvaluatingForm';
import '../Styles/ProductDetails.css';

class ProductDetails extends Component {
  componentDidMount = async () => {
    const { match: { params: { id } }, updateAppState } = this.props;
    const currentProductDetailed = await fetchItem(id);
    updateAppState({ currentProductDetailed });
  }

  render() {
    const { currentProductDetailed, handleAddProduct } = this.props;
    const { title, thumbnail, price, attributes } = currentProductDetailed;

    return (
      <div className="body">
        <Header />
        <section className="details">
          <h1 data-testid="product-detail-name">
            {title}
          </h1>
          <img src={ thumbnail } alt={ `Imagem do produto ${title}` } />
          <p>
            Preço:
            {`R$ ${price.toLocaleString('pt-br')}` }
          </p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => handleAddProduct(currentProductDetailed) }
          >
            Adicionar ao carrinho
          </button>
        </section>
        <div className="evaluation">
          <EvaluatingForm { ...this.props } />
        </div>
        <h2>Especificações Técnicas</h2>
        <div className="specifications">
          {attributes.map(({ name: attName, id, value_name: valueName }) => (
            <p
              key={ id }
            >
              {`${attName}: `}
              <span>
                { valueName}
              </span>
            </p>
          ))}
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  currentProductDetailed: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    attributes: PropTypes.arrayOf(PropTypes.object),
  }),
  match: PropTypes.instanceOf(Route).isRequired,
  updateAppState: PropTypes.func.isRequired,
  handleAddProduct: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ProductDetails.defaultProps = {
  currentProductDetailed: {
    title: '',
    price: '',
    attributes: [],
  },
};

export default ProductDetails;
