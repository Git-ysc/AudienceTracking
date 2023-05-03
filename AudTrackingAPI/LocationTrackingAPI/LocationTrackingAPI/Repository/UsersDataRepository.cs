using LocationTrackingAPI.Data;
using LocationTrackingAPI.Interfaces;
using LocationTrackingAPI.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Repository
{
    public class UsersDataRepository : IUsersData
    {
        private readonly DataContext dc;

        public UsersDataRepository(DataContext dc)
        {
            this.dc = dc;
        }

       

        public void AddUser(User user)
        {
            dc.Users.Add(user);
        }

        public void AddZone(Zone zone)
        {
            dc.Zones.Add(zone);
        }

        public void AddLayout(Layout layout)
        {
            dc.Layouts.Add(layout);
        }

        public async Task<List<Layout>> getLayout()
        {
            return await dc.Layouts.ToListAsync();
        }

        public async Task<List<User>> getUsers()
        {
            return await dc.Users.ToListAsync();
        }

        public async Task<List<Zone>> getZone()
        {
            return await dc.Zones.ToListAsync();
        }
    }
}
