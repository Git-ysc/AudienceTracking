using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Model
{
    public class Zone
    {
        [Key]
        public int ZoneId { get; set; }
        public string ZoneName { get; set; }
        public int xCoord { get; set; }
        public int yCoord { get; set; }

    }
}
