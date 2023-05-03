import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  selectedLocation:any;
  selectedUser:any;
  Locations: any;
  Users:any;
  isArrowDown: boolean = true;
  showDetails: boolean = false;
  imageUrl: any;

  //Employee Details
  userProfileUrl:any;
  UserName:any;
  Designation:any;

  constructor(private apiservice: ApiService) {
  }

  ngOnInit(): void {
    //API Call
    this.fetchLayouts();
    this.fetchUser();
  }


  onSelectLocation() {
    const selectedLocationImageURL = this.Locations.filter((Layout: any) => {
      return Layout.layoutName === this.selectedLocation;
    })
    if(selectedLocationImageURL != null){
      this.imageUrl = 'data:image/jpg;base64,' + selectedLocationImageURL[0].imageBase64;
    }
  }

  onSelectUser(){
    const selectedUserImgURL = this.Users.filter((user:any) =>{
      return user.userID == this.selectedUser;
    })
    if(selectedUserImgURL != null){
      this.userProfileUrl = 'data:image/jpg;base64,' + selectedUserImgURL[0].imageBase64;
      this.UserName = selectedUserImgURL[0].userName;
      this.Designation = selectedUserImgURL[0].designation;
    }
  }

  toggleDetails(): void {
    this.isArrowDown = !this.isArrowDown;
    this.showDetails = !this.showDetails;
  }

   //#region API Calls
   fetchLayouts() {
    this.apiservice.GetLayout().subscribe((Response) => {
      if (Response != null) {
        this.Locations = Response;
        //Default layout name and image selection
        this.selectedLocation = this.Locations[0].layoutName;
        this.imageUrl = 'data:image/jpg;base64,' + this.Locations[0].imageBase64;
      }
    }, (error) => {
      console.log(error);
    });
  }

  fetchUser() {
    this.apiservice.GetUser().subscribe((Response) => {
      if (Response != null) {
        this.Users = Response;
        //Default selection
        this.selectedUser = this.Users[0].userID;
        this.userProfileUrl = 'data:image/jpg;base64,' + this.Users[0].imageBase64;
        this.UserName = this.Users[0].userName;
        this.Designation = this.Users[0].designation;
      }
      }, (error) => { console.log(error);});
  }
  //#endregion
}



