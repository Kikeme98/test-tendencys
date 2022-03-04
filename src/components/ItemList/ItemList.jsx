import React from "react";
import './ItemList.css';

function ItemList(props) {
    console.log(props);

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        setItems(props.data);
    }, [props.data]);

    if (items) {
        return (
            <div>
                <table>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.sku}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        );
    } else {
        return <h1>No hay items</h1>;
    }
}

export default ItemList;
