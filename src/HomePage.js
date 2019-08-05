import React, { Component } from "react";
import "./HomePage.css";
import shoe from './immerse.PNG';
import App2 from './App2';
import {Link} from 'react-router-dom';
export default class HomePage extends Component {
    constructor(props) {
        super(props);

        const mArray = [
            ['AntiqueCamera', 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF/AntiqueCamera.gltf'],
            ['2CylinderEngine', 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/2CylinderEngine/glTF/2CylinderEngine.gltf'],
            ['yuusha', 'https://cdn.rawgit.com/siouxcitizen/3DModel/a1c2e475/yuusha.gltf'],
            ['ladybug', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf'],
            ['castlescene', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/codepen-castlescene.glb']
        ];

        const gArray = [
            [['one'],'https://raw.githubusercontent.com/D-Thatcher/3DFiles/master/sunglasses/scene.gltf'],
            [['two'],'https://raw.githubusercontent.com/D-Thatcher/3DFiles/master/bzr_black_sunglasses/scene.gltf'],
            [['three'],'https://raw.githubusercontent.com/D-Thatcher/3DFiles/master/glasses/scene.gltf'],
            [['four'],'https://raw.githubusercontent.com/D-Thatcher/3DFiles/master/glasses_low-poly_model_download/scene.gltf'],
            [['five'],'https://raw.githubusercontent.com/D-Thatcher/3DFiles/master/sunglasses1/scene.gltf']
        ];

        const gCost = ['39.99','45.67','99.99','145.00','23.99'];

        this.state = {open:false,miscellaneous:new Map(mArray), glasses:new Map(gArray), idx:0, mArray:mArray,gArray:gArray, gCost:gCost}
    }

    updateChild(index){
        this.setState({idx:index});
        this.child.removeEntity();
        this.child.addEntity(this.state.gArray[this.state.idx % this.state.gArray.length][1].toString())
    }

    render() {
        return(
            <div className={'homepage'}>

                {this.state.open &&
                <nav className="w3-sidebar w3-bar-block w3-card w3-top w3-xlarge w3-animate-left"
                     style={{ width: "40%", minWidth: "300px"}} id="mySidebar">
                    <a href="javascript:void(0)" onClick={() => {
                        this.setState({open: !this.state.open})
                    }}
                       className="w3-bar-item w3-button"> </a>
                    <a href="#food" onClick={() => {
                        this.setState({open: !this.state.open})
                    }} className="w3-bar-item w3-button w3-margin-top">Checkout</a>
                    <a href="#food" onClick={() => {
                        this.setState({open: !this.state.open})
                    }} className="w3-bar-item w3-button">My Cart</a>
                    <a href="#food" onClick={() => {
                        this.setState({open: !this.state.open})
                    }} className="w3-bar-item w3-button">Sunglasses</a>
                    <a href="#food" onClick={() => {
                        this.setState({open: !this.state.open})
                    }} className="w3-bar-item w3-button">Clearance</a>
                    <a href="#about" onClick={() => {
                        this.setState({open: !this.state.open})
                    }} className="w3-bar-item w3-button">About</a>
                </nav>
                }

                <div className="w3-top">
                    <div className="w3-white w3-xlarge" style={{maxWidth:"1200px",margin:"auto"}}>
                        <div className="w3-button w3-padding-16 w3-left" onClick={()=>{this.setState({open:!this.state.open})}}>☰</div>
                        <Link to={{
                            pathname: '/checkout',
                            state: {
                                cost: this.state.gCost[this.state.idx]
                            }
                        }} className="w3-right w3-padding-16" style={{ textDecoration: 'none'}}>Checkout <i className="fa fa-shopping-cart"/></Link>
                        <div className="w3-center w3-padding-16">Immerse</div>

                    </div>
                </div>

                <div className="w3-main w3-content w3-padding" style={{maxWidth:"1200px",marginTop:"100px"}}>

                    <div className={'coreDim'}>
                        <div className="w3-row-padding w3-padding-16 w3-center" id="food">
                            <div className="w3-center">
                                    <App2 ref={ref => (this.child = ref)}  gtflURL={this.state.gArray[this.state.idx][1].toString()}/>
                            </div>
                            {/*<div className="w3-quarter">*/}
                                {/*<img src={shoe} alt="Sandwich" style={{width:"100%"}}/>*/}
                                    {/*<h3>The Perfect Sandwich, A Real NYC Classic</h3>*/}
                                    {/*<p>Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.</p>*/}
                            {/*</div>*/}
                            {/*<div className="w3-quarter">*/}
                                {/*<img src={shoe} alt="Steak" style={{width:"100%"}}/>*/}
                                    {/*<h3>Let Me Tell You About This Steak</h3>*/}
                                    {/*<p>Once again, some random text to lorem lorem lorem lorem ipsum text praesent tincidunt*/}
                                        {/*ipsum lipsum.</p>*/}
                            {/*</div>*/}
                            {/*<div className="w3-quarter">*/}
                                {/*<img src={shoe} alt="Cherries" style={{width:"100%"}}/>*/}
                                    {/*<h3>Cherries, interrupted</h3>*/}
                                    {/*<p>Lorem ipsum text praesent tincidunt ipsum lipsum.</p>*/}
                                    {/*<p>What else?</p>*/}
                            {/*</div>*/}
                            {/*<div className="w3-quarter">*/}
                                {/*<img src={shoe} alt="Pasta and Wine" style={{width:"100%"}}/>*/}
                                    {/*<h3>Once Again, Robust Wine and Vegetable Pasta</h3>*/}
                                    {/*<p>Lorem ipsum text praesent tincidunt ipsum lipsum.</p>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className="w3-center" style={{margin:"80px",padding:"8px"}}></div>
                    <h3 className={'w3-center'}>$ {this.state.gCost[this.state.idx]} CAD</h3><br/>

                    <div className="w3-center w3-padding-32" >
                        <div className="w3-bar">
                            <button className="w3-bar-item w3-button w3-hover-black" onClick={()=>{this.setState({idx:this.state.idx-1})}}>
                                <i className="fa fa-caret-left"/>
                            </button>
                            <div className="w3-bar-item w3-black w3-button" onClick={() => this.updateChild(0)}>1</div>
                            <div className="w3-bar-item w3-button w3-hover-black" onClick={() => this.updateChild(1)}>2</div>
                            <div className="w3-bar-item w3-button w3-hover-black" onClick={() => this.updateChild(2)}>3</div>
                            <div className="w3-bar-item w3-button w3-hover-black" onClick={() => this.updateChild(3)}>4</div>

                            <div className="w3-bar-item w3-button w3-hover-black" onClick={()=>{this.setState({idx:this.state.idx + 1})}}>
                                <i className="fa fa-caret-right" />
                            </div>
                        </div>
                    </div>



                    <hr id="about"/>

                        <div className="w3-container w3-padding-32 w3-center">
                            <h3 className={'w3-black w3-button'}>Add to Cart</h3><br/>
                            <img src={shoe} alt="Me" className="w3-image"
                                 style={{display:"block",margin:"auto", width:"800px" ,height:"533px"}}/>
                                <div className="w3-padding-32">
                                    <h4><b>Immerse</b></h4>
                                    <h6><i>Canada's largest augmented reality retailer</i></h6>
                                    <p>Ready to see how clothes and accessories look on you before purchasing them? Immerse is revolutionizing online shoppping. Browse through our items, ranging from sunglasses to car engines. We have everything.</p>
                                </div>
                        </div>
                        <hr/>

                            <footer className="w3-row-padding w3-padding-32">
                                <div className="w3-third">
                                    <h3>1-Day Delivery</h3>
                                    <p>Sign-up now to receive your first item within one business day of purchase.</p>

                                </div>

                                <div className="w3-third">
                                    <h3>BLOG POSTS</h3>
                                    <ul className="w3-ul w3-hoverable">
                                        <li className="w3-padding-16">
                                            <img src={shoe} className="w3-left w3-margin-right"
                                                 style={{width:"50px"}}/>
                                                <span className="w3-large">Lorem</span><br/>
                                                <span>Sed mattis nunc</span>
                                        </li>
                                        <li className="w3-padding-16">
                                            <img src={shoe} className="w3-left w3-margin-right"
                                                 style={{width:"50px"}}/>
                                                <span className="w3-large">Ipsum</span><br/>
                                                <span>Praes tinci sed</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="w3-third w3-serif">
                                    <h3>Popular Items</h3>
                                    <p>
                                        <span className="w3-tag w3-black w3-margin-bottom w3-margin-right w3-padding-small">Sunglasses</span> <span
                                        className="w3-tag w3-dark-grey w3-small w3-margin-bottom w3-margin-right w3-padding-small">Hats</span> <span
                                        className="w3-tag w3-dark-grey w3-small w3-margin-bottom w3-margin-right w3-padding-small">Jackets</span>
                                        <span className="w3-tag w3-dark-grey w3-small w3-margin-bottom w3-margin-right w3-padding-small">Watches</span>
                                        <span className="w3-tag w3-dark-grey w3-small w3-margin-bottom w3-margin-right w3-padding-small">Earrings</span>
                                        <span className="w3-tag w3-dark-grey w3-small w3-margin-bottom w3-margin-right w3-padding-small">Necklaces</span>

                                    </p>
                                </div>
                            </footer>

                </div>

            </div>
        )
    }

}