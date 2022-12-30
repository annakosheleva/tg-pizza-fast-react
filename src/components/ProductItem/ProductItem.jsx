import React from "react";
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({ product, className, onAdd }) => {

    const onAddHandler = () => {
        onAdd(product);
    }
    
    return (
        <div className={'product'}>
            <div className={'img'} />
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Price: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                ADD IN CART
            </Button>
        </div>
    );
};

export default ProductItem;