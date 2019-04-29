import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {c} from '../../constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, public rest:RestService, public router:Router) { }

    ngOnInit() {
        this.myForm = this.fb.group({            
            email:'gurpreet.indybytes@gmail.com',
            password:'123456',            
        });
    }

    login(form:FormGroup){
        let fd = {            
            email : form.value.email,
            password : form.value.password,            
        };
        this.rest.login(fd).subscribe(
            data => {
                let token = data.success.token;
                localStorage.setItem('__token', token);
                this.router.navigate(['/', 'profile']);
            },
            error => {
                let err = error.error.error;
                for(var key in err){
                    c.log(key+' : ')
                    c.log(err[key][0])
                }
            }
        );
    }    
}
