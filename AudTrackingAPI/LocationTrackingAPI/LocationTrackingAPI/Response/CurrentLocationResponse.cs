using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Response
{
    public class CurrentLocationResponse
    {
        public string MacAddress { get; set; }
        public DateTime Time { get; set; }
        public decimal XCoord { get; set; }
        public decimal YCoord { get; set; }
        public int UserId { get; set; }
        public string  UserName { get; set; }
    }
}
