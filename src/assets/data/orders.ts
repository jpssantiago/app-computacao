import getProducts from './products';

const getOrders = () => {
    return [
        {
            id: 0,
            items: getProducts().slice(0, 1),
            total: 100,
            date: '10 de abril de 2021',
            status: 'completed',
        },
        {
            id: 1,
            items: getProducts().slice(1, 3),
            total: 30,
            date: '21 de abril de 2021',
            status: 'completed',
        },
        {
            id: 2,
            items: getProducts().slice(2, 3),
            total: 19.90,
            date: '26 de abril de 2021',
            status: 'progress',
        }
    ];
}

export default getOrders;