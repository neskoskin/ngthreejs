import { AfterViewInit, Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements AfterViewInit {

  private renderer: THREE.WebGLRenderer;
  private camera = null;
  private cameraTarget: THREE.Vector3;
  public scene: THREE.Scene;

  public fieldOfView: number = 60;
  public nearClippingPane: number = 1;
  public farClippingPane: number = 1100;
  public geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  public material = null;
  public mesh = new THREE.Mesh();
  public isUserInteracting = false;
  onMouseDownMouseX = 0;
  onMouseDownMouseY = 0;
  lon = 0;
  onMouseDownLon = 0;
  lat = 0;
  onMouseDownLat = 0;
  phi = 0;
  theta = 0;
  @ViewChild('canvas')
  private canvasRef: ElementRef;

  constructor() {
    this.render = this.render.bind(this);
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private createScene() {
    this.scene = new THREE.Scene();
    // invert the geometry on the x-axis so that all of the faces point inward
    this.geometry.scale(- 1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('assets/360.jpg')
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
    // this.render();
  }
  private createCamera() {
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.target = new THREE.Vector3(0, 0, 0)
    // Set position and look at
    this.camera.position.x = 10;
    this.camera.position.y = 10;
    this.camera.position.z = 100;
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
    let component: SceneComponent = this;

    (function render() {
      //requestAnimationFrame(render);
      component.render();
    }());
  }
  public animate() {
    this.update();
    window.requestAnimationFrame(() => this.animate());
  }
  public update() {
    if (this.isUserInteracting === false) {
      this.lon += 0.1;
    }
    this.lat = Math.max(- 85, Math.min(85, this.lat));
    this.phi = THREE.Math.degToRad(90 - this.lat);
    this.theta = THREE.Math.degToRad(this.lon);
    this.camera.target.x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    this.camera.target.y = 500 * Math.cos(this.phi);
    this.camera.target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);
    this.camera.lookAt(this.camera.target);
    /*
    // distortion
    camera.position.copy( camera.target ).negate();
    */
    this.renderer.render(this.scene, this.camera);
  }
  /* EVENTS */

  public onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isUserInteracting = true;
    this.onMouseDownMouseX = event.clientX;
    this.onMouseDownMouseY = event.clientY;
    this.onMouseDownLon = this.lon;
    this.onMouseDownLat = this.lat;

  }
  public onMouseUp(event: MouseEvent) {
    this.isUserInteracting = false;
  }
  public onMouseMove(event) {
    if (this.isUserInteracting === true) {
      this.lon = (this.onMouseDownMouseX - event.clientX) * 0.1 + this.onMouseDownLon;
      this.lat = (event.clientY - this.onMouseDownMouseY) * 0.1 + this.onMouseDownLat;
    }
  }
  public onMouseWheel(event) {
    let fov = this.camera.fov + event.deltaY * 0.05;
    this.camera.fov = THREE.Math.clamp(fov, 10, 75);
    this.camera.updateProjectionMatrix();
  }

  /* LIFECYCLE */
  ngAfterViewInit() {
    this.createScene();
    this.createCamera();
    this.startRendering();
  }
}
