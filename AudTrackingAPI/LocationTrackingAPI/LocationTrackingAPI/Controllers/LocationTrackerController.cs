using LocationTrackingAPI.Hub;
using LocationTrackingAPI.Interfaces;
using LocationTrackingAPI.Model;
using LocationTrackingAPI.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationTrackerController : ControllerBase
    {
        private readonly IUnitofwork uow;
        private readonly IHubContext<CurrentLocationHub, ICurrentLocation> currentLoc;

        public LocationTrackerController(IUnitofwork uow, IHubContext<CurrentLocationHub, ICurrentLocation> currentLoc)
        {
            this.uow = uow;
            this.currentLoc = currentLoc;
        }

        [HttpGet("GetLayout")]
        public async Task<List<LayoutResponse>> GetLayoutList()
        {
            var layouts = await uow.UsersDataRepository.getLayout();
            var layoutResponse = new List<LayoutResponse>();
            foreach (var layout in layouts)
            {
                LayoutResponse tempLayoutResponse = new LayoutResponse()
                {
                    LayoutId = layout.LayoutId,
                    LayoutName = layout.LayoutName,
                    XCoord = layout.XCoord,
                    yCoord = layout.yCoord,
                    Image = layout.image,
                    ImageBase64 = Convert.ToBase64String(layout.image)
                };
                layoutResponse.Add(tempLayoutResponse);
            };

            return layoutResponse;

        }

        [HttpGet("GetUserList")]
        public async Task<List<UserResponse>> GetUserList()
        {
            var users = await uow.UsersDataRepository.getUsers();
            var usersResponse = new List<UserResponse>();
            foreach (var user in users)
            {
                UserResponse tempUserResponse = new UserResponse()
                {
                    UserID = user.UserID,
                    UserName = user.UserName,
                    MacAddress = user.MacAddress,
                    Designation = user.Designation,
                    Department = user.Department,
                    WorkOrder = user.WorkOrder,
                    TotalDistance = user.TotalDistance,
                    TotalTime = user.TotalTime,
                    Image = user.Image,
                    ImageBase64 = Convert.ToBase64String(user.Image)
                };
                usersResponse.Add(tempUserResponse);
            }
            return usersResponse;
        }

        [HttpGet("GetZoneList")]
        public async Task<List<Zone>> GetZoneList()
        {
            return await uow.UsersDataRepository.getZone();
        }

        [HttpPost("AddLayout")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddLayout([FromForm] Layout layout, [FromForm] IFormFile layoutImage)
        {
            using (var ms = new MemoryStream())
            {
                await layoutImage.CopyToAsync(ms);
                layout.image = ms.ToArray();
            }

            uow.UsersDataRepository.AddLayout(layout);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPost("AddZone")]
        public async Task<IActionResult> AddZone(Zone zone)
        {
            uow.UsersDataRepository.AddZone(zone);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPost("AddUser")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddUser([FromForm] User user, [FromForm] IFormFile profileImage)
        {
            using (var ms = new MemoryStream())
            {
                await profileImage.CopyToAsync(ms);
                user.Image = ms.ToArray();
            }
            uow.UsersDataRepository.AddUser(user);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPost("UpdateUserLocation")]
        public async Task<IActionResult> UpdateUserLocation(CurrentLocation currentLocation)
        {
            CurrentLocationResponse tempObj = new CurrentLocationResponse() {
                 MacAddress = currentLocation.MacAddress,
                 Time = currentLocation.Time,
                 XCoord = currentLocation.XCoord,
                 YCoord = currentLocation.YCoord
            };
            var users = await uow.UsersDataRepository.getUsers();
            var filteredUser = users.Where(u => u.MacAddress == currentLocation.MacAddress).ToList();
            foreach(var user in filteredUser)
            {
                tempObj.UserId = user.UserID;
                tempObj.UserName = user.UserName;
            }

            currentLoc.Clients.All.CurrentLocation(tempObj);
            return StatusCode(201);
        }

    }
}
