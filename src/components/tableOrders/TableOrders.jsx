import React, { useEffect, useRef } from "react";
import ItemList from "../ItemList/ItemList";
import "./TableOrders.css";

function TableOrders(props) {
    const form = useRef(null);
    const [selectedOrder, setSelectedOrder] = React.useState(1);
    const [orders, setOrders] = React.useState({});

    useEffect(() => {
        setOrders(props.data.orders);
    }, [props.data.orders]);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const fromData = new FormData(form.current);
        const data = {
            sku: fromData.get("sku"),
            name: fromData.get("name"),
            quantity: fromData.get("quantity"),
            price: fromData.get("price"),
        };
        orders[selectedOrder].items.push(data);
        setOrders((orders) => [...orders, orders]);
    };

    if (!orders[0]) return <span>Loading</span>;
    return (
        <div className="orders_container">
            <div className="leftside-orders">
                <h1>Ordenes</h1>
                {orders?.map((order, index) => {
                    return (
                        <div
                            key={index}
                            className="div-listorder_container"
                            onClick={() => handleOrderClick(index)}
                        >
                            <h3>Orden numero: {order.number}</h3>
                            <p>{order.description}</p>
                        </div>
                    );
                })}
            </div>
            <div className="rightside-order">
                <h1>Detalle de la orden</h1>
                <div className="div-order_container">
                    <div className="div-order_itemtable">
                        <h3>Orden numero: {orders[selectedOrder].number}</h3>
                        <p>{orders[selectedOrder].description}</p>
                        <ItemList data={orders[selectedOrder].items} />
                        <button className="btn-pagar" href="#myModal" data-toggle="modal">Pagar</button>
                    </div>
                    <div className="form-addProducts">
                        <form ref={form} onSubmit={handleSubmit}>
                            <label>Agregar producto</label>
                            <input type="text" placeholder="SKU" name="sku" required />
                            <input
                                type="text"
                                name="name"
                                id="Nombre"
                                placeholder="Nombre"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Cantidad"
                                name="quantity"
                                required
                            />
                            <input type="text" placeholder="Precio" name="price" required />
                            <input type="submit" className="btn" value="Agregar producto" />
                        </form>
                    </div>
                </div>
            </div>
            <div id="myModal" class="modal fade">
                <div class="modal-dialog modal-confirm">
                    <div class="modal-content">
                        <div class="modal-header justify-content-center">
                            <div class="icon-box">
                                <i class="material-icons">&#xE876;</i>
                            </div>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                            >
                                &times;
                            </button>
                        </div>
                        <div class="modal-body text-center">
                            <h4>Excelente!</h4>
                            <p>Su pago ha sido realizado con exito!.</p>
                            <button class="btn btn-success" data-dismiss="modal">
                                <span>Continuar</span>{" "}
                                <i class="material-icons">&#xE5C8;</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableOrders;
