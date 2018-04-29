import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataService]
})

export class LoginComponent implements OnInit {
  @ViewChild('username') el: ElementRef;
  rForm: FormGroup;
  post: any;
  usernameAlert: string = "Please fill username";
  passwordAlert: string = "Please fill password";
  loginAlert: string;
  loginError: boolean = false;
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authenticationservice: DataService,
    public router: Router
  ) {
    this.rForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }
  ngOnInit() {
    this.authenticationservice.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home/image360';
  }

  addPost(post) {
    this.authenticationservice.login(post).subscribe(
      res => {
        if (res.status == 200) {
          this.router.navigate([this.returnUrl]);
        }
      },
      err => {
        console.log('in login error');
        this.loginError = true;
        this.loginAlert = 'Invalid username or password';
        return err;
      }
    );

  }

}