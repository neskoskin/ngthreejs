import { AfterViewInit, Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
OBJLoader(THREE);
@Component({
  selector: 'app-image2d',
  templateUrl: './image2d.component.html',
  styleUrls: ['./image2d.component.css']
})
export class Image2dComponent implements AfterViewInit {

  private renderer: THREE.WebGLRenderer;
  private camera = null;
  private cameraTarget: THREE.Vector3;
  public scene: THREE.Scene;
  public material = null;
  public mesh = new THREE.Mesh();
  public geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  public mouseX = 0;
  public mouseY = 0;
  public windowHalfX = window.innerWidth / 2;
  public windowHalfY = window.innerHeight / 2;

  @ViewChild('canvas')
  private canvasRef: ElementRef;
  constructor() {
    this.render = this.render.bind(this);
  }
  public render() {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * .05;
    this.camera.position.y += (- this.mouseY - this.camera.position.y) * .05;
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private createScene() {
    this.scene = new THREE.Scene();
    let ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    this.scene.add(ambientLight);
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 250;
    let pointLight = new THREE.PointLight(0xffffff, 0.8);
    this.camera.add(pointLight);
    this.scene.add(this.camera);
  }
  private createModel() {
    let manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      console.log(item, loaded, total);
    };
    var textureLoader = new THREE.TextureLoader(manager);
    var texture = textureLoader.load('assets/2DImage.png');

    var material = new THREE.MeshBasicMaterial({ color: 'yellow', side: THREE.DoubleSide });
    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    var loader = new THREE.ImageLoader();
    // loader.load('models/obj/male02/male02.obj', function ( object ) {
    //   object.traverse( function ( child ) {
    //     if ( child instanceof THREE.Mesh ) {
    //       child.material.map = texture; // Typescript error
    //     }
    //   } );
    //   object.position.y = - 95;
    //   this.scene.add( object );
    // }, onProgress, onError );

  }
  private getAspectRatio(): number {
    let height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }
  private startRendering() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.animate();
    let component: Image2dComponent = this;

    (function render() {
      //requestAnimationFrame(render);
      component.render();
    }());
  }
  public animate() {
    // this.update();
    window.requestAnimationFrame(() => this.animate());
    this.render();
  }
  ngAfterViewInit() {
    this.createScene();
    this.createModel();
    this.startRendering();
  }

}
