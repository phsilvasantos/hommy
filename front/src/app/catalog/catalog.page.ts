import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 
import { ToastController } from '@ionic/angular';

/* INTEGRAÇÃO */
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  constructor(private router:Router, public searchService: SearchService, public toastController: ToastController ) { }
  public searchValue: string;
  currentUrl = this.router.url;
  public auth: boolean = true; //variável que indica se o usuário está ou não logado

  //Array alimentado com dados do BD
  public republicsArray: object[] = []

  ngOnInit() {
    if(localStorage.getItem('auth') == 'true'){
      this.auth = true;
    }
    else this.auth = false;
    let republics = JSON.parse(localStorage.getItem('republics'));
    republics.forEach(element => {
      this.republicsArray.push(element);
    });
  }

  //Pesquisar as repúblicas de acordo com o bairro pesquisado
  async searchRepublics(){
    //Toast de aviso de erro
    const toastError = await this.toastController.create({
      message: 'Não existem repúblicas cadastradas nesse bairro :(',
      duration: 3500,
      position: 'bottom',
      animated: true,
      color: 'primary',
      keyboardClose: true
    });
    let search = this.searchValue;
    this.searchService.getRepublicsByNeighborhood(search).subscribe( (res) => {
      //console.log(res);
      if(res.republics.length == 0){
        toastError.present();
      }
      else if(res.status == 200){
        console.log(res.republics);
        console.log(res.republics.length);
        let republics = JSON.stringify(res.republics);
        localStorage.setItem('republics', republics);
        location.reload();
      }
    })
  }

}