export const products = (data = [], action) => {
    console.log('payload => ', data, action);
    switch (action.type) {
        case "ADD":
            if (action.data.isTextFieldEmpty) {
                action.data.clearTextField();
                return;
            }
            // await setStringValue("products", products)
            data.push({
                text: action.data.newProduct,
                id: Date.now(),
                show: false,
                editable: false,
                show: false
            });
            action.data.endEditing();
            return data;
        case "UPDATE":
            data.map(element => {
                if (element.id === action.data.item.id) {
                    element.text = action.data.newProduct.trim();
                    element.show = false;
                    element.editable = false;
                }
            });
            action.data.endEditing();
            return data;
        case "DELETE":
            data.splice(data.findIndex(item => item.id == action.data.item.id), 1);
            action.data.endEditing();
            return data;
        default:
            return data;
    }
}