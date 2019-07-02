import { UsersProvider } from './../../providers/users/users';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, InfiniteScroll } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
  users: any[];
  page: number;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) { }

  ionViewDidEnter() {
    this.users = [];
    this.page = 1;
    this.infiniteScroll.enable(true);
    this.getAllUsers(this.page);
  }

  getAllUsers(page: number) {
    this.userProvider.getAll(page, true)
      .then((result: any) => {
        for (var i = 0; i < result.data.length; i++) {
          var user = result.data[i];
          this.users.push(user);
        }

        if (this.infiniteScroll) {
          this.infiniteScroll.complete();
          if (this.users.length == result.total) {
            this.infiniteScroll.enable(false);
          }
        }
      })
      .catch((error: any) => {
        this.toast.create({
          message: 'Erro ao listar os usuários. Erro: ' + error.error,
          position: 'botton',
          duration: 3000
        })
          .present();
      });
  }

  getUsers() {
    setTimeout(() => {
      this.page += 1;
      this.getAllUsers(this.page);
    }, 500);
  }

  openUser(id: number) {
    this.userProvider.getAll(0, false, id)
      .then((result: any) => {
        this.navCtrl.push('UserDetailPage', { user: result.data });
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao recuperar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });

  }
}
