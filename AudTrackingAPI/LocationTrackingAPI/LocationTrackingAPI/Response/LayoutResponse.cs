using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Response
{
    public class LayoutResponse
    {
        public int LayoutId { get; set; }
        public string LayoutName { get; set; }
        public int XCoord { get; set; }
        public int yCoord { get; set; }
        public byte[] Image { get; set; }
        public string ImageBase64 { get; set; }
    }
}
