using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Response
{
    public class UserLocationHistory
    {
        public decimal LastXCoord { get; set; }
        public decimal LastYCoord { get; set; }
        public DateTime Time { get; set; }
        public decimal TravelDistance { get; set; }
    }

    public class ZonesData
    {
        public string ZoneName { get; set; }
        public decimal TimeSpent { get; set; }
    }
}
