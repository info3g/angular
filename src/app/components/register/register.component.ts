import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import {c} from '../../constants';
import { tokenKey } from '@angular/core/src/view';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {    
    myForm: FormGroup;
    hide = true;
    errors = [];
    constructor(private fb: FormBuilder, public rest:RestService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.myForm = this.fb.group({
            name:'tester',
            email:'garry.indybytes@gmail.com',
            password:['123'],
            c_password:['123']
        });
        // this.getUsers();        
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.value.password;
        let confirmPass = group.controls.c_password.value;

        return pass === confirmPass ? null : { notSame: true }
    }
    getUsers() {        
        this.rest.getUsers().subscribe((data: {}) => {            
            c.log(data);            
        });
    }

    register(form: FormGroup) {
        c.log(form.controls)    
        c.log('Valid?', form.valid); // true or false
        c.log('Name', form.value.name);
        c.log('Email', form.value.email);
        c.log('password', form.value.password);
        let fd = {
            name : form.value.name,
            email : form.value.email,
            password : form.value.password,
            c_password : form.value.c_password,
        };
        this.rest.register(fd).subscribe(
            data => {
                let token = data.success.token;                     
                localStorage.setItem('__token', token);
            },
            error => {
                let err = error.error.error;                
                for(var key in err){
                    this.errors = [];                    
                    let val = err[key][0];                    
                    if(key == 'c_password'){
                        val = 'Password not matched'
                    }
                    let keyValue = {key : val};                    
                    this.errors.push(keyValue);
                }
            }
        );
    }
}
