import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
  state={showCheckout: false, name:"", email:"", address: ""}

  handleInput = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }

  createOrder = (e) =>{
    e.preventDefault();
    const order = {
      name:this.state.name,
      email:this.state.email,
      address:this.state.address,
      cartItems:this.props.cartItems,
    }
    this.props.createOrder(order);
  }
  

  render() {
    const {cartItems} = this.props;
   
    return (
      <div>
        {cartItems.length === 0? (<div className="cart cart-header">Cart is empty</div>)
        : (<div className="cart cart-header">Your have &nbsp;<strong>{cartItems.length}</strong>&nbsp; in the cart {""}</div>)
        }

        <div className="cart">
        <Fade left cascade>
          <ul className="cart-items">
            {cartItems.map(item =>(
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title}/>
                </div>
                <div>
                  <div>
                    {item.title} &nbsp;</div>
                  <div className="right">  
                    {formatCurrency(item.price)}*{item.count} {" "}
                    <button className="button" onClick={() => this.props.removeFromCart(item)}> Remove </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div className="cart">
          <div className="total">
          Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
          </div>
          <button onClick={() => {
                      this.setState({ showCheckout: true });
                    }}className="button primary" > Proceed </button>
        </div>
        )}
        
                    {this.state.showCheckout && (
                      <Fade right cascade={true}>
                      <div className="cart">
                        <form onSubmit={this.createOrder}>
                          <ul className="form-container">
                          <li>
                          <label>Email</label>
                          <input
                            name="email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className="button primary" type="submit">
                            Checkout
                          </button>
                        </li>
                          </ul>
                        </form>
                      </div>
                      </Fade>
                    )}
      </div>
      
    )
  }
}
