import React from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';
import { useState } from 'react';

const products = [
    { id: '1', title: '4 cheese', price: 15, description: 'size medium' },
    { id: '2', title: 'Hawaiian', price: 20, description: 'size medium' },
    { id: '3', title: 'Italiano', price: 23, description: 'size medium' },
    { id: '4', title: 'Spinach & Feta', price: 15, description: 'size medium' },
    { id: '5', title: 'Buffalo Chicken', price: 20, description: 'size medium' },
    { id: '6', title: 'Pepperoni', price: 15, description: 'size medium' },
    { id: '7', title: 'BBQ Chicken', price: 23, description: 'size medium' },
    { id: '8', title: 'Pacific Veggie', price: 20, description: 'size medium' },
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const { tg } = useTelegram();
    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `ORDER ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;