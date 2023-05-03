using LocationTrackingAPI.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocationTrackingAPI.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TraveledPath>().HasNoKey();
            modelBuilder.Entity<UserZonesData>().HasNoKey();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Layout> Layouts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<UserZonesData> UserZonesData { get; set; }
        public DbSet<TraveledPath> TraveledPaths { get; set; }
    }
}
