using LocationTrackingAPI.Model;
using LocationTrackingAPI.Response;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Hub
{
    public class CurrentLocationHub:Hub<ICurrentLocation>
    {
       public async Task CurrentLocation(CurrentLocationResponse currentLocation)
       {
            await Clients.All.CurrentLocation(currentLocation);
       }    
    }
}
