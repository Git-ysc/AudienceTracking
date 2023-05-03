using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Model
{
    public class Layout
    {
        [Key]        
        public int LayoutId { get; set; }

        [Required]
        public string LayoutName { get; set; }
        public int XCoord { get; set; }
        public int yCoord { get; set; }
        public byte[] image { get; set; }

    }
}
