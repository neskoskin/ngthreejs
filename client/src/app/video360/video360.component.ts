import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
// import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
// import 'three/examples/js/renderers/CSS3DRenderer.js';
OBJLoader(THREE);

@Component({
  selector: 'app-video360',
  templateUrl: './video360.component.html',
  styleUrls: ['./video360.component.css']
})
export class Video360Component implements AfterViewInit {

  theta: number = 0;
  phi: number = 0;
  renderer: any;
  renderercss: any;
  distance: number = 50;
  private camera: any;
  private scene: any;
  private isUserInteracting: boolean = false;
  private onPointerDownPointerX: any;
  private onPointerDownPointerY: any;
  private onPointerDownLon: any;
  private onPointerDownLat: any;
  private lon: number = 0;
  private lat: number = 0;

  constructor() {

  }

  ngAfterViewInit() {
    this.init();
    this.animate();
  }

  init() {
    let container, mesh;
    container = document.getElementById('container');

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    this.camera.target = new THREE.Vector3(0, 0, 0);
    this.scene = new THREE.Scene();
    const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(- 1, 1, 1);
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.width = 640;
    video.height = 360;
    video.loop = true;
    video.muted = true;
    video.src = '/assets/video3.mp4';
    video.setAttribute('webkit-playsinline', 'webkit-playsinline');
    video.play();
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    var element = document.createElement('img');
    element.src = '/assets/2DImage.png';
    element.className = 'image-2d';
    //CSS3D renderer
    this.renderercss = new THREE.CSS3DRenderer();
    this.renderercss.setSize(window.innerWidth, window.innerHeight);
    this.renderercss.domElement.style.position = 'absolute';
    this.renderercss.domElement.style.top = 0;
    // create the object3d for this element
    // console.log(THREE.CSS3DObject);
    // var cssObject = new THREE.CSS3DObject(element);
    // // we reference the same position and rotation
    // cssObject.position = mesh.position;
    // cssObject.rotation = mesh.rotation;
    // // add it to the css scene
    // this.scene.add(cssObject);
    container.appendChild(this.renderercss.domElement);
    var element3d = new THREE.CSS3DObject(element);
    element3d.position.x = 50;
    element3d.position.y = 50;
    element3d.position.z = -1000;
    this.scene.add(element3d);
    this.renderercss.render(this.scene, this.camera);
    this.renderer.render(this.scene, this.camera);
    // document.addEventListener('mousedown', () => this.onDocumentMouseDown, false);
    // document.addEventListener('mousemove', () => this.onDocumentMouseMove, false);
    // document.addEventListener('mouseup', () => this.onDocumentMouseUp, false);
    // document.addEventListener('wheel', () => this.onDocumentMouseWheel, false);
    // //
    // window.addEventListener('resize', () => this.onWindowResize, false);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseDown(event) {
    console.log('test');
    event.preventDefault();
    this.isUserInteracting = true;
    this.onPointerDownPointerX = event.clientX;
    this.onPointerDownPointerY = event.clientY;
    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;
  }
  onMouseMove(event) {
    if (this.isUserInteracting === true) {
      this.lon = (this.onPointerDownPointerX - event.clientX) * 0.1 + this.onPointerDownLon;
      this.lat = (event.clientY - this.onPointerDownPointerY) * 0.1 + this.onPointerDownLat;
    }
  }
  onMouseUp(event) {
    this.isUserInteracting = false;
  }
  onMouseWheel(event) {
    this.distance += event.deltaY * 0.05;
    this.distance = THREE.Math.clamp(this.distance, 1, 50);
  }
  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.update();
  }
  update() {
    this.lat = Math.max(- 85, Math.min(85, this.lat));
    this.phi = THREE.Math.degToRad(90 - this.lat);
    this.theta = THREE.Math.degToRad(this.lon);
    this.camera.position.x = this.distance * Math.sin(this.phi) * Math.cos(this.theta);
    this.camera.position.y = this.distance * Math.cos(this.phi);
    this.camera.position.z = this.distance * Math.sin(this.phi) * Math.sin(this.theta);
    this.camera.lookAt(this.camera.target);
    this.renderer.render(this.scene, this.camera);
  }


}
