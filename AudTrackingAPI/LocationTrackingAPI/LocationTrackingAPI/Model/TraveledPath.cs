using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Model
{
    public class TraveledPath
    {
        public int UserId { get; set; }
        public string MacAddress { get; set; }
        public decimal xCoord { get; set; }
        public decimal yCoord { get; set; }
        public DateTime DateTime { get; set; }

    }
}
