using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Response
{
    public class UserResponse
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string MacAddress { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string WorkOrder { get; set; }
        public decimal TotalDistance { get; set; }
        public decimal TotalTime { get; set; }
        public byte[] Image { get; set; }
        public string ImageBase64 { get; set; }
    }
}
