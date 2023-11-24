import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor() { }
  userList : any[] | undefined;
  private submitted = false;

  setUserList(userList: any[]) {
    this.userList = userList;
  }

  markAsSubmitted() {
    this.submitted = true;
  }

  getUserList() {
    return this.userList;
  }

  hasSubmitted(): boolean {
    return this.submitted;
  }

}
