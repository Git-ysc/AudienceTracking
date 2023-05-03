import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  selectedLocation: any;
  selectedUser: any;
  Locations: any;
  Users: any;
  isArrowDown: boolean = true;
  showDetails: boolean = false;
  imageUrl: any;

  //Employee Details
  userProfileUrl: any;
  UserName: any;
  Designation: any;

  //Selected Date
  fromDate: any;
  toDate: any;
  userTraveledPath: any;

  //canvas details
  maxX: any;
  maxY: any;


  constructor(private apiservice: ApiService,private toastr: ToastrService) {
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
    if (selectedLocationImageURL != null) {
      this.imageUrl = 'data:image/jpg;base64,' + selectedLocationImageURL[0].imageBase64;
      this.maxX = selectedLocationImageURL[0].xCoord;
      this.maxY = selectedLocationImageURL[0].yCoord;
    }
    //Clear the canvas
    const userTraveledPathCanvas = document.querySelector('#userTraveledPathCanvas') as HTMLCanvasElement;
    const userTraveledPathCtx = userTraveledPathCanvas.getContext('2d');
    const userdestinationCanvas = document.querySelector('#userdestinationCanvas') as HTMLCanvasElement;
    const userdestinationCtx = userdestinationCanvas.getContext('2d');
    if(userTraveledPathCtx && userdestinationCtx){
      userTraveledPathCtx.clearRect(0,0,userTraveledPathCanvas.width,userTraveledPathCanvas.height);
      userdestinationCtx.clearRect(0,0,userdestinationCanvas.width,userdestinationCanvas.height)
    }
  }

  onSelectUser() {
    const selectedUserImgURL = this.Users.filter((user: any) => {
      return user.userID == this.selectedUser;
    })
    if (selectedUserImgURL != null) {
      this.userProfileUrl = 'data:image/jpg;base64,' + selectedUserImgURL[0].imageBase64;
      this.UserName = selectedUserImgURL[0].userName;
      this.Designation = selectedUserImgURL[0].designation;
    }

    //Clear the canvas
    const userTraveledPathCanvas = document.querySelector('#userTraveledPathCanvas') as HTMLCanvasElement;
    const userTraveledPathCtx = userTraveledPathCanvas.getContext('2d');
    const userdestinationCanvas = document.querySelector('#userdestinationCanvas') as HTMLCanvasElement;
    const userdestinationCtx = userdestinationCanvas.getContext('2d');
    if(userTraveledPathCtx && userdestinationCtx){
      userTraveledPathCtx.clearRect(0,0,userTraveledPathCanvas.width,userTraveledPathCanvas.height);
      userdestinationCtx.clearRect(0,0,userdestinationCanvas.width,userdestinationCanvas.height)
    }
  }

  toggleDetails(): void {
    this.isArrowDown = !this.isArrowDown;
    this.showDetails = !this.showDetails;
  }

  trackHistoryBtnClicked() {
    if(this.fromDate == null || this.fromDate == undefined){
      this.toastr.error('Field is empty', 'From Date');
    }
    if(this.toDate == null || this.toDate == undefined ){
      this.toastr.error('Field is empty', 'To Date');
    }
    var validDate = true;
    if(this.fromDate > this.toDate){
      validDate = false;
      this.toastr.error('From Date must be before To Date', 'Date Range');
    }
    if(this.fromDate != null && this.fromDate !=undefined && this.toDate != null && this.toDate !=undefined && validDate){
      this.apiservice.UserPathDuration(this.selectedUser, this.fromDate, this.toDate).subscribe((Response) => {
        console.log(Response)
        if(Response.length == 0 ||Response == null || Response == undefined ){
          this.toastr.warning('No data found for the selected Duration', 'No data');
        }
        if (Response != null && Response.length > 0  && Response != undefined) {
          debugger
          this.userTraveledPath = Response;
          this.TraveledPathmapping()
          this.DestinationPathmapping()
        }

      }, (error) => {
        console.log(error);
      });
    }
  }

  TraveledPathmapping() {
    const userTraveledPathCanvas = document.querySelector('#userTraveledPathCanvas') as HTMLCanvasElement;
    const canvasCard = document.querySelector('.canvasCard') as HTMLCanvasElement;
    if (userTraveledPathCanvas && canvasCard) {
      userTraveledPathCanvas.width = canvasCard.clientWidth;
      userTraveledPathCanvas.height = canvasCard.clientHeight;
    }
    if (userTraveledPathCanvas) {
      const userTraveledPathCtx = userTraveledPathCanvas.getContext('2d');
      if (userTraveledPathCtx) {
        userTraveledPathCtx.strokeStyle = '#029D7A';
        userTraveledPathCtx.lineWidth = 3;
        userTraveledPathCtx.setLineDash([2]);
        userTraveledPathCtx.beginPath();
        userTraveledPathCtx.moveTo(((this.userTraveledPath[0].xCoord / this.maxX) * userTraveledPathCanvas.width),
          ((this.userTraveledPath[0].yCoord / this.maxY) * userTraveledPathCanvas.height));
        this.userTraveledPath.forEach((element: any) => {
          userTraveledPathCtx.lineTo(((element.xCoord / this.maxX) * userTraveledPathCanvas.width),
            ((element.yCoord / this.maxY) * userTraveledPathCanvas.height));
        });

        userTraveledPathCtx.stroke();
      }
    }
  }

  DestinationPathmapping() {
    const userdestinationCanvas = document.querySelector('#userdestinationCanvas') as HTMLCanvasElement;
    const canvasCard = document.querySelector('.canvasCard') as HTMLCanvasElement;
    if (userdestinationCanvas && canvasCard) {
      userdestinationCanvas.width = canvasCard.clientWidth;
      userdestinationCanvas.height = canvasCard.clientHeight;
    }

    if (userdestinationCanvas) {
      const userdestinationCtx = userdestinationCanvas.getContext('2d');
      if (userdestinationCtx) {
        userdestinationCtx.fillStyle = '#029D7A';
        userdestinationCtx.clearRect(0, 0, userdestinationCanvas.width, userdestinationCanvas.height);
        userdestinationCtx.beginPath();
        userdestinationCtx.arc(((this.userTraveledPath[(this.userTraveledPath.length - 1)].xCoord  / this.maxX) * userdestinationCanvas.width),
          ((this.userTraveledPath[(this.userTraveledPath.length - 1)].yCoord / this.maxY) * userdestinationCanvas.height),
          8, 0,
          Math.PI * 2);
          userdestinationCtx.fill();
      }
    }
  }

  //#region API Calls
  fetchLayouts() {
    this.apiservice.GetLayout().subscribe((Response) => {
      if (Response != null) {
        this.Locations = Response;
        //Default layout name and image selection
        this.selectedLocation = this.Locations[0].layoutName;
        this.imageUrl = 'data:image/jpg;base64,' + this.Locations[0].imageBase64;
        this.maxX = this.Locations[0].xCoord;
        this.maxY = this.Locations[0].yCoord;
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
    }, (error) => { console.log(error); });
  }
  //#endregion
}



