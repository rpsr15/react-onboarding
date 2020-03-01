using Microsoft.EntityFrameworkCore;
using react_onboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_onboarding.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DataContext()
        {

        }

        public DbSet<Customer> customer { get; set; }

        public DbSet<Product> product { get; set; }

        public DbSet<Store> store { get; set; }

        public DbSet<Sale> sale { get; set; }
    }
}
