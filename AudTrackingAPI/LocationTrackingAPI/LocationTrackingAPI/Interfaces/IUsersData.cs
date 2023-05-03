using LocationTrackingAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Interfaces
{
    public interface IUsersData
    {
        Task<List<Layout>> getLayout();
        Task<List<Zone>> getZone();
        Task<List<User>> getUsers();
        Task<List<TraveledPath>> getTraveledPath();
        void AddLayout(Layout layout);
        void AddZone(Zone zone);
        void AddUser(User user);
        void UpdateTotalTime(double totalDistance,int userID);

    }
}
