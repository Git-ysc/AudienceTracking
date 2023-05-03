using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Interfaces
{
    public interface IUnitofwork
    {
        IUsersData UsersDataRepository { get; }
        Task<bool> SaveAsync();
    }
}
