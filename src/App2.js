import './App2.css';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import Webcam from "react-webcam";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";



class App2 extends Component {
    constructor(props) {
        super(props);
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        this.state = {width: width, height: height, gtflURL:this.props.gtflURL};
        this.updateDimensions = this.updateDimensions.bind(this);
        this.disposeControl = this.disposeControl.bind(this);
        this.engageControl = this.engageControl.bind(this);


        this.myTree = this.myTree.bind(this);
        this.addEntity = this.addEntity.bind(this);
    }

    updateDimensions() {

        var rect = ReactDOM.findDOMNode(this)
            .getBoundingClientRect();


        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        width = width - rect.left-50;
        height = height + rect.top+350;


        this.setState({width: width, height: height,isOnDiv:true});

        this.customStyle = {
            position: "absolute",
            top: "0",
            left: "0",
            width: width,
            height: height};


    }

    removeEntity(myName='myObj') {
        var selectedObject = this.scene.getObjectByName(myName);
        this.scene.remove( selectedObject );
        // animate();
        this.renderer.render(this.scene, this.camera)
    }

    addEntity(objURL){

        var loader = new GLTFLoader();
        loader.crossOrigin = true;
        var model;
        loader.load( objURL, ( data ) => {
            model = data.scene;
            model.name = 'myObj';
            model.position.set(0, 0, 0);

            this.scene.add( model );
            //, onProgress, onError );
        },undefined, function ( error ) {

            console.error( error );

        } );
        this.renderer.render(this.scene, this.camera);
    }



    myTree(myName='myObj'){

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, this.state.width/this.state.height, 0.1, 1000 );
        this.camera.position.z = 29;
        this.camera.position.y = 0;
        this.camera.position.x = 0;
        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio * 2);
        this.renderer.setSize( this.state.width, this.state.height );
        this.renderer.setClearAlpha(0.0);
        this.renderer.shadowMap.enabled = true;
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        this.mount.appendChild( this.renderer.domElement );
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.controls.addEventListener( 'change', ()=>{ this.renderer.render( this.scene, this.camera );} );

        //lights
        var dirLight = new THREE.DirectionalLight(0xffffff,3);
        dirLight.position.set(10, 0.5, 2);
        dirLight.position.multiplyScalar(20);
        dirLight.name = "dirlight";
        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 768;//4096;
        dirLight.shadow.mapSize.height = 768; //4096;
        dirLight.shadow.camera.near = -10;
        dirLight.shadow.camera.far = 200;
        this.scene.add(dirLight);


        var ambLight = new THREE.AmbientLight( 0xffffff ); // soft white light
        this.scene.add( ambLight );



        var loader = new GLTFLoader();
        loader.crossOrigin = true;
        var model;

        loader.load( this.props.gtflURL, ( data ) => {
            model = data.scene;
            model.name = myName;
            model.position.set(0, 0, 0);

            this.scene.add( model );
            //, onProgress, onError );
        },undefined, function ( error ) {

            console.error( error );

        } );


        const animate = () => {
            requestAnimationFrame(animate);
            // this.controls.update();
            this.renderer.setSize( this.state.width, this.state.height );
            this.camera.aspect	= this.state.width/this.state.height;
            this.camera.updateProjectionMatrix();
            this.renderer.render(this.scene, this.camera);

        };
        animate();

        window.addEventListener('resize', ()=>{


            this.camera.aspect	= this.state.width/this.state.height;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize( this.state.width, this.state.height );
        }, false);



        var xSpeed = 2;
        var ySpeed = 2;

        window.addEventListener("keydown", onDocumentKeyDown, false);
        function onDocumentKeyDown(event) {
            var keyCode = event.which;
            if (keyCode === 37) {
                model.position.x -= xSpeed;
            } else if (keyCode === 39) {
                model.position.x += xSpeed;
            } else if (keyCode === 38) {
                model.position.y += ySpeed;
            } else if (keyCode === 40) {
                model.position.y -= ySpeed;
            }
        }
    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
        // this.nv.removeEventListener()
    }

    disposeControl(){
        if(this.controls){
            this.controls.dispose();
        }
    }
    engageControl(){
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.controls.addEventListener( 'change', ()=>{ this.renderer.render( this.scene, this.camera );} );
    }

    componentDidMount() {

        this.mount.addEventListener("mouseenter", ()=>{console.log('entered');this.engageControl();});
        this.mount.addEventListener("mouseout", ()=>{console.log('exited');this.disposeControl();});
        this.updateDimensions();

        window.addEventListener("resize", this.updateDimensions);
        this.myTree();

        this.updateDimensions();


    }
    render() {

        return (
            <div  className="parent">
                <Webcam height={this.state.height} width={this.state.width} className={'monitor'} />

                <div style={{position: "absolute",
                        top: "0",
                        left: "0",
                        width: "10px",
                        height: "10px"}} ref={ref => (this.mount = ref)} />


            </div>

        )
    }
}

export default App2;