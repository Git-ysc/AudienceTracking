using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Model
{
    public class UserZonesData
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string ZoneName { get; set; }
        public int Visits { get; set; }

    }
}
