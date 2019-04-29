import { Component, OnInit } from '@angular/core';
import{c} from '../../constants';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
    data:any;
    constructor(public rest:RestService, private router: Router) { }

    ngOnInit() {    
        let token = localStorage.getItem('__token');        
        if(token != null){
            this.getProfile(token);
        }
        else{
            this.router.navigate(['/', 'login']);
        }
    }

    getProfile(token) {                 
        this.rest.getUser(token).subscribe(
            data => {
                let userdata = data.success;
                this.data = userdata            
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

    logout(){
        this.router.navigate(['/', 'home']);
        localStorage.removeItem('__token');
    }
}
