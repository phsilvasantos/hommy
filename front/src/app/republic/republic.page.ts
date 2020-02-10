import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular'; //contato do proprietário
import { ToastController } from '@ionic/angular'; //aviso de adição aos favoritos
// import { Router } from '@angular/router'; FUNÇÃO ROTA COMENTADA

@Component({
  selector: 'app-republic',
  templateUrl: './republic.page.html',
  styleUrls: ['./republic.page.scss'],
})
export class RepublicPage implements OnInit {

  commentForm: FormGroup;
  public auth: boolean = true; //variável que indica se o usuário está ou não logado
  formComment: boolean = false;
  public userName = 'Fulano de Tal'; //variável que armazena o nome do usuário logado no sistema

  //Array da república selecionada do BD
  public republic = { 
      id: 1,
      name: 'República das Flores',
      neighborhood: 'Copacabana',
      street: 'Rua Marcos Mioto',
      number: 16,
      photo: './assets/copa.jpg',
      complement: null,
      hasIndividual: true,
      hasDouble: true,
      hasTriple: false,
      qt_individual: 2,
      qt_double: 3,
      qt_triple: null,
      price_individual: 800,
      price_double: 700,
      price_triple: null,
      evaluation: 5.0,
      add_info: 'A República das Flores fica perto de ponto de ônibus, mercados e academia. Cerca de 15 minutos até a UFRJ, Unirio, IME',
      favorite_state: false
    };

  // Lista de comentários que vai ser gerada com sql: select * from comments where id_republic == idRepublic
  comments: any = [  
    {user : 'Joao Silva',
    comment : 'Muito boa, meus cachorros adoraram a casa',
    evaluation: 5
    },
    {user : 'Maria Silva',
    comment : 'Só tinha problema com os cachorros do Joao',
    evaluation: 4
    },
    {user : 'Adalberto Silva',
    comment : 'Show de bola!',
    evaluation: 4.5
    },
    {user : 'Lurdes Silva',
    comment : 'Deu pra dormir',
    evaluation: 2.5
    },
    {user : 'Bia Silva',
    comment : 'Não achei nada demais',
    evaluation: 3
    },
    {user : 'Alvaro Silva',
    comment : 'Gostei da decoração',
    evaluation: 4
    }
  ]

  constructor(public formbuilder: FormBuilder, public alertController: AlertController, public toastController: ToastController) { 
    this.commentForm = this.formbuilder.group({
      comment: [null, [Validators.required]],
      evaluation: [null]
    });
  }

  public comment(): any{
    this.formComment = !this.formComment;
  }

  //Submeter o comentário
  async submitForm(form){
    //console.log(form.value);
    let comment = {
      user: this.userName,
      comment: form.value.comment,
      evaluation: form.value.evaluation
    }
    this.comments.unshift(comment); //adiciona o comentário no array
    this.formComment = !this.formComment;
    const toast = await this.toastController.create({
      message: '<center> Comentário enviado com sucesso </center>',
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'success',
      keyboardClose: true,
    });
    toast.present();
  }

  ngOnInit() {
  }

}