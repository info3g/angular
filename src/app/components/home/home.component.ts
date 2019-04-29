import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {c} from '../../constants';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    list:any;
    produtList:any;    
    constructor(public rest:RestService) { }

    ngOnInit() {
        this.list = [
                {'id':1,'title':'First Title','short_title':'1st dummy short title','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj8NwLY5cSwJq4ApE2-5A97s4-a7rPzhN-D3kbnnKN0VLL9o7l','description':'1st Dummy description'},
                {'id':2,'title':'Second Title','short_title':'2nd dummy short title','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBW65cbQFfmFaAdud_yayLnjHOI63CeJJ-5cMnDfyb-YjBCyBp','description':'2nd Dummy description'},
                {'id':3,'title':'Third Title','short_title':'3rd dummy short title','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmINGNbFrcR817iDBRjbZp21EQL2wkF3vLyftY5aJDoG8QKKp2RQ','description':'3rd Dummy description'},
                {'id':4,'title':'Fourth Title','short_title':'4th dummy short title','img':'https://cdn5.vectorstock.com/i/1000x1000/61/94/software-language-programmer-avatar-vector-17866194.jpg','description':'4th Dummy description'},
                {'id':5,'title':'Fifth Title','short_title':'5th dummy short title','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbl6djajB_aVg3Efu6ohcFnhuaghPfBIAmCNs65wkLBND_3Z8XzA','description':'5th Dummy description'},
        ]
        this.productList();
    }

    productList(){
        this.rest.productList().subscribe(
            data => {                
                let userdata = data.success;
                this.produtList = userdata            
            }
        );
    }
}
