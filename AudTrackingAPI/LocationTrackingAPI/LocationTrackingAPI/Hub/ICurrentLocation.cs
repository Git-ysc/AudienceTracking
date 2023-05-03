using LocationTrackingAPI.Model;
using LocationTrackingAPI.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Hub
{
    public interface ICurrentLocation
    {
        Task CurrentLocation(CurrentLocationResponse currentLocation);
    }
}
