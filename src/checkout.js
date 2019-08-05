import React, {Component} from 'react';
import './payment.css';
import logo from './immerse.PNG';
import { Redirect } from 'react-router-dom';



// class Overlay extends React.Component {
//     render() {
//         return (<div className="Overlay" style={{'backgroundImage':'url(' + this.props.image + ')'}}>
//             Something
//         </div>);
//     }
// }

class Container extends React.Component {
    render() {
        return(
            <div className="Container">
                {this.props.children}
            </div>
        );
    }
}



class WorkspaceInformation extends React.Component {
    render() {


        return (
            <div className="WorkspaceInformation">
                <div className="WorkspaceName">{this.props.name}</div>
                <div className="WorkspacePrice">
                    <div className="Price">$ 39.99 <small>CAD</small></div>
                </div>
            </div>
        );
    }
}

class WorkspaceMeta extends React.Component {
    render() {
        return (
            <div className="WorkspaceMeta">
                <div className="Description"><strong>Canada's largest augmented reality retailer</strong></div>
            </div>
        );
    }
}



class ImagePreview extends React.Component {
    render() {
        return (
            <div className="ImagePreview" style={{'backgroundImage': 'url('+ this.props.image +')'}}>
                <div className="WorkspaceOverview">
                    <WorkspaceInformation name={'Immerse'} price={this.props.price} />
                    <WorkspaceMeta />
                </div>
            </div>
        );
    }
}



class OrderSummary extends React.Component {

    render() {

        return (
            <div className="OrderSummary">
                <div className="Title">Order Summary</div>
                <table>
                    <tbody>

                    <tr>
                        <td>Amount to Deposit</td>
                        <td>$</td>
                        <td>
                            <select style={{marginLeft:15,marginRight:15}} value={this.props.amount_to_deposit} onChange={this.props.onChangeDepositAmount}>
                                <option  className="form-control" >20</option>
                                <option  className="form-control" >50</option>
                                <option  className="form-control" >100</option>
                                <option  className="form-control" >500</option>
                                <option  className="form-control" >1000</option>
                                <option  className="form-control" >5000</option>
                                <option  className="form-control" >10000</option>
                            </select>
                        </td>
                        <td>CAD</td>
                    </tr>
                    <tr>
                        <td>Subtotal</td>
                        <td>$ {this.props.price} CAD</td>
                    </tr>
                    <tr>
                        <td>Tax</td>
                        <td style={{paddingLeft:5}}>0.12 X 39.99 = 4.80 </td>
                    </tr>
                    </tbody>
                </table>
                <div className="Total">
                    <div className="TotalLabel">Total</div>
                    <div className="Amount">
                        $ 44.79 <small>CAD</small>
                    </div>
                </div>
            </div>
        );
    }
}


class PaymentForm extends React.Component {
    render() {
        return (
            <div className="PaymentForm">
                <form>
                    <div className="Title">Account information</div>
                    <BasicInput name="name" label="Name on credit card" type="text" placeholder="Full Name" />
                    <BasicInput name="card" label="Credit card number" type="number" placeholder="0000 0000 0000 0000" />
                    <ExpiryDate />
                    <div style={{display:'flex'}}>
                        <CheckoutButton onSubmit={this.props.onSubmit} />
                        <CancelButton onCancel={this.props.onCancel} />
                    </div>
                </form>
            </div>
        );
    }
}

class CancelButton extends React.Component {
    render() {
        return (
            <div className="CancelButton">
                <button onClick={this.props.onCancel}>Cancel</button>
            </div>
        );
    }
}

class CheckoutButton extends React.Component {
    render() {
        return (
            <div className="CheckoutButton">
                <button onClick={this.props.onSubmit}>Complete Checkout</button>
                <span><i className="fa fa-fw fa-lock"></i> Your card information is encrypted</span>
            </div>
        );
    }
}


class ExpiryDate extends React.Component {
    render() {
        return (
            <div className="ExpiryDate">
                <div>
                    <label>Expiry Date</label>
                    <div className="Expiry">
                        <select>
                            <option value="">January</option>
                            <option value="">February</option>
                            <option value="">March</option>
                            <option value="">April</option>
                            <option value="">May</option>
                            <option value="">June</option>
                            <option value="">July</option>
                            <option value="">August</option>
                            <option value="">September</option>
                            <option value="">October</option>
                            <option value="">November</option>
                            <option value="">December</option>
                        </select>
                        <select name="" id="">
                            <option value="">2019</option>
                            <option value="">2020</option>
                            <option value="">2021</option>
                            <option value="">2022</option>
                            <option value="">2023</option>
                            <option value="">2024</option>
                            <option value="">2025</option>
                        </select>
                    </div>
                </div>
                <div className="CVCField">
                    <label>CVC</label>
                    <input placeholder="000" type="number" />
                </div>
            </div>
        );
    }
}


class BasicInput extends React.Component {
    render() {
        return (
            <div className="BasicInput">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input id={this.props.name} type={this.props.type} placeholder={this.props.placeholder} />
            </div>
        );    }
}



class Checkout extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    render() {
        return (
            <div className="Checkout">
                <OrderSummary amount_to_deposit={this.props.amount_to_deposit} onChangeDepositAmount={this.props.onChangeDepositAmount} discount={this.props.discount} tax={this.props.tax} price={this.props.price} duration={this.props.duration} />
                <PaymentForm onSubmit={this.props.onSubmit} onCancel={this.props.onCancel}/>
            </div>
        );
    }
}



// class Header extends React.Component {
//     render() {
//         return (
//             <header>
//
//             </header>
//         );    }
// }

export default class DepositForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mounted: false,
            people: 1,
            price: this.props.location.state.cost,
            tax: 20,
            duration: 5,
            discount: 5,
            cancelled:false,
            deposited:false,
            amount_to_deposit: 20
        };

        this.onSubmit=this.onSubmit.bind(this);
        this.onCancel=this.onCancel.bind(this);
        this.onChangeDepositAmount = this.onChangeDepositAmount.bind(this);

        console.log(this.props.location.state.cost)

    }

    onDeposit(){
        // Todo Check if the information looks Kosher

        // Todo Post the information to the server
        this.setState({deposited:true})
    }

    onCancel(){
        // Clear the state
        this.setState({cancelled:true});
        return (<Redirect to={'/'}/>)
    }


    componentDidMount() {
        this.setState({ mounted: true });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({deposited:true})
    }

    handleChange(e) {
        console.log(e.target.value);
        this.setState({ duration: e.target.value });
    }

    onChangeDepositAmount(e) {
        this.setState({
            amount_to_deposit: e.target.value
        });
    }




    render() {

        if(this.state.cancelled){
            return(
                <Redirect to='/account'/>
            )
        }
        else if(this.state.deposited){
            return(
                <Redirect to='/account'/>
            )
        }
        else{
            return(
                <div>
                    {/*<img  src={depositBackBlur} className="myImgBlur"/>*/}
                    <div className="App">

                        <div>
                            <Container>
                                <ImagePreview price={this.state.amount_to_deposit} image={logo} />
                                <Checkout amount_to_deposit={this.state.amount_to_deposit} onChangeDepositAmount={this.onChangeDepositAmount} discount={this.state.discount} tax={this.state.tax} price={this.state.price} duration={this.state.duration} onSubmit={this.onSubmit} onCancel={this.onCancel} />
                            </Container>
                        </div>


                    </div>
                </div>
            );
        }

    }
}