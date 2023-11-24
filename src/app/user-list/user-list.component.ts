import { Component, Input } from '@angular/core';
import { FormDataService } from '../form-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userList;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'profilePic'];
  constructor(private dataService: FormDataService, private sanitizer: DomSanitizer){
    this.userList = this.dataService.getUserList();
    this.dataSource = new MatTableDataSource(this.userList);
  }

  ngOnInit(){
    
  }

  getProfilePicUrl(profilePic: File): SafeUrl | null {
    console.log('Profile Pic:', profilePic);

  if (typeof profilePic === 'string') {
    const blob = new Blob([profilePic], { type: 'image/jpeg' }); // Adjust the type based on your image format
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  }

  if (profilePic) {
    const imageUrl = URL.createObjectURL(profilePic);
    console.log('Image URL:', imageUrl);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  return null;
  }
  
}
