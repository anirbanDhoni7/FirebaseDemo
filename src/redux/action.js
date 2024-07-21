export const addProduct = (data) => {
    return ({
        type: 'ADD',
        data
    })
}

export const updateProduct = (data) => {
    return ({
        type: 'UPDATE',
        data
    })
}

export const deleteProduct = (data) => {
    return ({
        type: 'DELETE',
        data
    })
}