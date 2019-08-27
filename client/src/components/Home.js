import React, { Component } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js';

import { addProduct } from '../actions/product';
import { addCustomer } from "../actions/customerAction"
import { getProducts } from "../actions/product";
import { getCustomer } from "../actions/customerAction"
import { logout } from '../actions/authAction'
import { addSoldProduct } from "../actions/soldProductAction";
import { getSoldProduct } from "../actions/soldProductAction"
import { connect } from 'react-redux';

import moment from "moment"
class Home extends Component {

    state = {
        products: []
    }
    componentDidMount() {
        M.AutoInit();
        this.props.getProducts();

        this.props.getCustomer();
        this.props.getSoldProduct();


        // Add active class to the current button (highlight it)
        var header = document.getElementById("check");
        var btns = header.getElementsByClassName("menubtn");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
    }



    customerSection = () => {
        document.getElementById("customer").style.display = "block"
        document.getElementById("products").style.display = "none";

        document.getElementById("soldProduct").style.display = "none"
    }

    productSection = () => {
        document.getElementById("products").style.display = "block";
        document.getElementById("customer").style.display = "none"
        document.getElementById("soldProduct").style.display = "none"
    }

    soldProductSection = () => {
        document.getElementById("soldProduct").style.display = "block"
        document.getElementById("products").style.display = "none";
        document.getElementById("customer").style.display = "none"

    }


    addProduct = () => {
        console.log("product")

        const productName = document.getElementById("productName").value;
        const productDescription = document.getElementById("productDescription").value;
        const productMonthlyFee = document.getElementById("productMonthlyFee").value;
        const product = {
            name: productName,
            description: productDescription,
            monthlyfee: productMonthlyFee
        }

        if (productName == "" && productDescription == "" && productMonthlyFee == "") {
            M.toast({ html: "Please enter all Details" })
        } else if (productName == "") {
            M.toast({ html: "Please enter Product Name" })
        } else if (productDescription == "") {
            M.toast({ html: "Please enter Product Description" })
        } else if (productMonthlyFee == "") {
            M.toast({ html: "Please enter Product Description" })
        } else {
            this.props.addProduct(product);
            M.toast({ html: "Added Successfully" })
        }

    }

    logout = () => {
        this.props.logout();
        this.props.history.push('/');
    }

    addCustomer = () => {
        let customerName = document.getElementById('customerName').value;
        let customerSurname = document.getElementById('customerSurname').value;
        let customerID = document.getElementById('idNumber').value

        let customerIdlength = customerID.length;
        if (customerName == "" && customerSurname == "" && customerID == "") {
            M.toast({ html: "Please enter all Details" })
        } else if (customerName == "") {
            M.toast({ html: "Please enter Customer Name" })
        } else if (customerSurname == "") {
            M.toast({ html: "Please enter Customer SurName" })
        } else if (customerID == "") {
            M.toast({ html: "Please enter Customer ID" })
        } else if (customerIdlength < 13) {
            M.toast({ html: "Please enter Correct ID" })

        } else {
            const customer = {
                name: customerName,
                surname: customerSurname,
                idNumber: customerID
            }
            this.props.addCustomer(customer);
            M.toast({ html: "Added Successfully" })
        }


        customerName = " ";
        customerName = " ";
        customerID = " ";

    }

    addSoldProduct = () => {
        let clientName = document.getElementById("clientName").value;
        let clientSurname = document.getElementById("clientSurname").value;
        let clientID = document.getElementById("clientID").value;
        let paymentID = document.getElementById("paymentID").value;
        let answer1 = document.getElementById("answer1").value;
        let answer2 = document.getElementById("answer2").value;
        let answer3 = document.getElementById("answer3").value;


        let customerIdlength = clientID.length

        let soldproduct = {
            name: clientName,
            surname: clientSurname,
            idNumber: clientID,
            paymentType: paymentID,
            productQuestion: ["Do you have Cancer ?", "Do you ever have a stroke ?", "Do you smoke ?"],
            productAnswer: [answer1, answer2, answer3]
        }

        if (clientName == "" && clientSurname == "" && clientID == "" && paymentID == "") {
            M.toast({ html: "Please enter all Details" })
        } else if (clientSurname == "") {
            M.toast({ html: "Please enter client Surname" })
        } else if (clientID == "") {
            M.toast({ html: "Please enter clientID" })
        } else if (paymentID == "") {
            M.toast({ html: "Please enter paymentType" })
        } else if (customerIdlength < 13) {
            M.toast({ html: "Please enter Correct ID" })

        } else {
            this.props.addSoldProduct(soldproduct);
            M.toast({ html: "Added Successfully" })
        }


    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        console.log(user)
        console.log(isAuthenticated)
        const { products } = this.props.product;
        const { customers } = this.props.customer
        const { soldProducts } = this.props.soldProducts

        console.log(soldProducts)
        console.log(products)
        console.log(customers)

        return (


            <div class="row">
                <div class="col-sm" className="sideMenu" id="check">

                    <div className="welcomeUser">
                        <h6>Welcome</h6>
                        {/* <h6>{user.name}</h6> */}
                    </div>
                    <div className="menu">

                        {/* {user.name} */}


                        <div onClick={this.productSection} class="menubtn  active">
                            Product
                        </div>

                        <div onClick={this.customerSection} class="menubtn">
                            Customers
                        </div>
                        <div onClick={this.soldProductSection} class="menubtn">
                            Sold Product
                        </div>

                        <div className="menubtn">
                            <h5 onClick={this.logout}> Logout</h5>
                        </div>
                    </div>

                </div>
                <div class="col-lg" className="part2">
                    {/* The start of product section */}

                    {products.length == 0 ? <h4>Loading ....</h4> : <div>

                        <div id="products">
                            <table class="w3-table-all">
                                <tr>
                                    <th>Product</th>
                                    <th>Description</th>
                                    <th>Monthly Fee</th>
                                </tr>
                                {products.map(item =>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.monthlyfee}</td>
                                    </tr>)}
                            </table>
                            <div className='fixed-action-btn' id="addbtn">
                                <a class="waves-effect waves-light btn modal-trigger" href="#modal1" >Add Product </a>
                            </div>


                            <div id="modal1" class="modal">
                                <div class="modal-content">
                                    <h4 className="titleHeader">Product Details </h4>
                                    <form action="#">

                                        <input type="text" id="productName" placeholder="Name of the Product" />
                                        <input type="email" id="productDescription" placeholder="Description " />
                                        <input type="text" id="productMonthlyFee" placeholder="Monthly Fee" />

                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button class="modal-close " onClick={this.addProduct}>ADD PRODUCT</button>
                                </div>
                            </div>
                        </div>
                    </div>}


                    {/* The end of product section */}

                    {/* The start of customer section */}

                    <div>
                        <div id="customer">
                            <table class="w3-table-all w3-centered">
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>ID Number</th>
                                </tr>


                                {customers.map(customer =>
                                    <tr>

                                        <td>{customer.name}</td>
                                        <td>{customer.surname}</td>
                                        <td>{customer.idNumber}</td>
                                    </tr>)}



                            </table>

                            <div className='fixed-action-btn' id="addbtnCustomer">
                                <a class="waves-effect waves-light btn modal-trigger" href="#modalCustomer" >Add Customer</a>
                            </div>


                            <div id="modalCustomer" class="modal">
                                <div class="modal-content">
                                    <h4 className="titleHeader">Customer Details </h4>
                                    <form action="#">

                                        <input type="text" placeholder="Name of the customer" id="customerName" />
                                        <input type="text" placeholder="Surname of the customer" id="customerSurname" />
                                        <input type="text" placeholder="iD number" id="password" id="idNumber" />

                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button class="modal-close " onClick={this.addCustomer} >ADD  Customer</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* The end of customer section  */}

                    {/* The start of customer section  */}

                    <div id="soldProduct">
                        <table class="w3-table-all  " id="table">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>ID Number</th>
                                <th> Payment type </th>
                                <th>Payment day </th>
                                <th>Product Questions </th>
                                <th>Producr Answers</th>

                            </tr>



                            {soldProducts.map(soldProduct =>
                                <tr>

                                    <td>{soldProduct.name}</td>
                                    <td>{soldProduct.surname}</td>
                                    <td>{soldProduct.idNumber}</td>
                                    <td>{soldProduct.paymentType}</td>
                                    <td>{moment(soldProduct.register_date).format("MMM Do YY")}</td>
                                    <td>{soldProduct.productQuestion.map(item => <li>{item}</li>)}</td>
                                    <td>{soldProduct.productAnswer.map(item => <li> {"       "}{"       "}{"       "}{item} {"       "}{"       "}{"       "}</li>)}</td>
                                </tr>)}

                        </table>

                        <div className='fixed-action-btn'>
                            <a class="waves-effect waves-light btn modal-trigger" href="#modalSoldProduct">Add Sold Product</a>
                        </div>


                        <div id="modalSoldProduct" class="modal">
                            <div class="modal-content">
                                <h4 className="titleHeader">Sold Product Details Details </h4>
                                <form action="#">


                                    <input type="text" placeholder="Name of the customer" id="clientName" />
                                    <input type="text" placeholder="Surname of the customer" id="clientSurname" />
                                    <input type="text" placeholder=" Client Id " id="clientID" />
                                    <input type="text" placeholder=" Payment Type " id="paymentID" />
                                    <p>Do you have Cancer</p>
                                    <input type="text" placeholder=" Yes / NO " id="answer1" />
                                    <p>Do you have Cancer</p>
                                    <input type="text" placeholder=" Yes / NO " id="answer2" />
                                    <p>Do you have Cancer</p>
                                    <input type="text" placeholder=" Yes / NO " id="answer3" />




                                </form>

                                <div class="modal-footer">
                                    <button class="modal-close" onClick={this.addSoldProduct}>ADD SOLD PRODUCT</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }

}
const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth,
    customer: state.customer,
    soldProducts: state.soldProducts
});
export default connect(mapStateToProps, { addProduct, getSoldProduct, getProducts, logout, addCustomer, getCustomer, addSoldProduct })(Home)