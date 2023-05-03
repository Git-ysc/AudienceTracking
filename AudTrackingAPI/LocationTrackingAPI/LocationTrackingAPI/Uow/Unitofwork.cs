using LocationTrackingAPI.Data;
using LocationTrackingAPI.Interfaces;
using LocationTrackingAPI.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Uow
{
    public class Unitofwork:IUnitofwork
    {
        private readonly DataContext dc;
        private readonly UsersDataRepository usersDataRepository;

        public Unitofwork(DataContext dc)
        {
            this.dc = dc;
            this.usersDataRepository = new UsersDataRepository(dc);
        }

        public IUsersData UsersDataRepository => this.usersDataRepository;

        public async Task<bool> SaveAsync()
        {
            try
            {
                int result = await dc.SaveChangesAsync();
                return result > 0;
            }
            catch (Exception ex)
            {             
                Console.WriteLine("Error occurred while saving changes: " + ex.Message);
                return false;
            }
        }
    }
}
