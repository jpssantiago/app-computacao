const getProducts = () => {
    return [
        {
            "id": 0,
            "name": "Batata Frita",
            "price": 13,
            "image": "https://s2.glbimg.com/6TYFXwek9ZpNXFeOzas09KizMKk=/0x0:1280x853/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/T/K/Hh8h2GR96v392DAkAqyA/912c9713-321e-4dfd-bca9-888c05c5ce50.jpeg",
            "type": "lanches"
        },
        {
            "id": 1,
            "name": "Frango a milanesa",
            "price": 20,
            "image": "https://conteudo.imguol.com.br/c/entretenimento/40/2020/09/18/milanesa-frango-1600441360438_v2_1280x960.jpg",
            "type": "lanches"
        },
        {
            "id": 2,
            "name": "Nuggets",
            "price": 13,
            "image": "https://img.itdg.com.br/tdg/images/recipes/000/162/798/323819/323819_original.jpg?mode=crop&width=710&height=400",
            "type": "lanches"
        },
        {
            "id": 3,
            "name": "Pizza Pequena",
            "price": 13,
            "image": "https://s2.glbimg.com/tYauM0ohcCFd1-D4dZyS4gZN7Q0=/0x0:1280x853/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/D/Q/NYYDWXQFG9FCq7CBnzaA/pizza.jpeg",
            "type": "pizzas"
        },
        {
            "id": 4,
            "name": "Pizza Grande",
            "price": 40,
            "image": "https://s2.glbimg.com/tYauM0ohcCFd1-D4dZyS4gZN7Q0=/0x0:1280x853/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/D/Q/NYYDWXQFG9FCq7CBnzaA/pizza.jpeg",
            "type": "pizzas"
        },
        {
            "id": 5,
            "name": "Petit Gateau",
            "price": 40,
            "image": "data:image/jpeg;base64,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",
            "type": "sobremesas"
        },
        {
            "id": 6,
            "name": "Brownie",
            "price": 40,
            "image": "https://vovopalmirinha.com.br/wp-content/uploads/2020/01/vovo-palmirinha-brownie.jpg",
            "type": "sobremesas"
        }
    ];
}

export default getProducts;