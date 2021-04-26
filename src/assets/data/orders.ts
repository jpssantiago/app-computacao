const getOrders = () => {
    return [
        {
            id: 0,
            items: 5,
            total: 100,
            date: '10 de abril de 2021',
            status: 'completed',
        },
        {
            id: 1,
            items: 2,
            total: 30,
            date: '21 de abril de 2021',
            status: 'completed',
        },
        {
            id: 2,
            items: 1,
            total: 19.90,
            date: '26 de abril de 2021',
            status: 'progress',
        }
    ];
}

export default getOrders;