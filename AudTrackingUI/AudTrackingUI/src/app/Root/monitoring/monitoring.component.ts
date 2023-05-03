import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
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
  EmployeeID: any
  Department: any;
  WorkOrder: any
  TotalDistance: any;

  //SignalR
  private hubConnection: HubConnection;

  //Canvas deatils
  maxX: any;
  maxY: any;
  isOuterCircleVisible:any = true;
  userCanvasImage:any;

  constructor(private apiservice: ApiService) {
    //SignalR call
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:35137/Hub/CurrentLocationHub')
      .build();

    this.hubConnection.on('CurrentLocation', (location: any) => {
      if (this.selectedUser == location.userId) {
        this.isOuterCircleVisible = true;
        this.userLiveLocation(location.xCoord, location.yCoord);
        console.log(location.userId);
      }
    });

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
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
  }

  onSelectUser() {
    const selectedUserArray = this.Users.filter((user: any) => {
      return user.userID == this.selectedUser;
    })
    if (selectedUserArray != null) {
      this.userProfileUrl = 'data:image/jpg;base64,' + selectedUserArray[0].imageBase64;
      this.UserName = selectedUserArray[0].userName;
      this.EmployeeID = selectedUserArray[0].userID;
      this.Designation = selectedUserArray[0].designation;
      this.WorkOrder = selectedUserArray[0].workOrder;
      this.Department = selectedUserArray[0].department;
      this.TotalDistance = selectedUserArray[0].totalDistance;
      this.userCanvasImage = new Image();
      this.userCanvasImage.src = 'data:image/jpg;base64,' + selectedUserArray[0].imageBase64;
    }

    //clear the canvas
    const userCurrentLocationCanvas = document.querySelector('#userCurrentLocation') as HTMLCanvasElement;
    const canvasCard = document.querySelector('.canvasCard') as HTMLCanvasElement;
    const userLocationCtx = userCurrentLocationCanvas.getContext('2d');
    if(userCurrentLocationCanvas && userLocationCtx && canvasCard){
      userCurrentLocationCanvas.width = canvasCard.clientWidth;
      userCurrentLocationCanvas.height = canvasCard.clientHeight;
      userLocationCtx.clearRect(0, 0, userCurrentLocationCanvas.width, userCurrentLocationCanvas.height);
    }
  }

  userLiveLocation(xCoord: any, yCoord: any) {
    const userCurrentLocationCanvas = document.querySelector('#userCurrentLocation') as HTMLCanvasElement;
    const canvasCard = document.querySelector('.canvasCard') as HTMLCanvasElement;
    if(userCurrentLocationCanvas && canvasCard){
      userCurrentLocationCanvas.width = canvasCard.clientWidth;
      userCurrentLocationCanvas.height = canvasCard.clientHeight;
    }

    if (userCurrentLocationCanvas) {
      const userLocationCtx = userCurrentLocationCanvas.getContext('2d');
      if (userLocationCtx) {
        userLocationCtx.clearRect(0, 0, userCurrentLocationCanvas.width, userCurrentLocationCanvas.height);
        // Draw the current location image
        userLocationCtx.drawImage(
          this.userCanvasImage,
          (xCoord / this.maxX) * userCurrentLocationCanvas.width - 12,
          (yCoord / this.maxY) * userCurrentLocationCanvas.height - 12,
          12 * 2,
          12 * 2
        );

        // Animation loop for the outer circle blinking effect
        if (this.isOuterCircleVisible) {
          userLocationCtx.globalAlpha = 0.5; // Set partial transparency for the outer circle
          userLocationCtx.strokeStyle = '#029D7A';
          userLocationCtx.lineWidth = 15;
          userLocationCtx.beginPath();
          userLocationCtx.arc(
            (xCoord / this.maxX) * userCurrentLocationCanvas.width,
            (yCoord / this.maxY) * userCurrentLocationCanvas.height,
            12 + 10, // Increase the radius to create a border around the image
            0,
            Math.PI * 2
          );
          userLocationCtx.stroke();
          userLocationCtx.globalAlpha = 1; // Reset globalAlpha
        }

      }
      // Toggle the visibility of the outer circle every second
      setTimeout(() => {
        this.isOuterCircleVisible = !this.isOuterCircleVisible;
        // requestAnimationFrame(() => this.userLiveLocation(xCoord,yCoord));
      }, 1000);
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
        this.EmployeeID = this.Users[0].userID;
        this.Designation = this.Users[0].designation;
        this.WorkOrder = this.Users[0].workOrder;
        this.Department = this.Users[0].department;
        this.TotalDistance = this.Users[0].totalDistance;
        this.userCanvasImage = new Image();
        this.userCanvasImage.src = 'data:image/jpg;base64,' + this.Users[0].imageBase64;
      }
    }, (error) => { console.log(error); });
  }


  //#endregion

}
