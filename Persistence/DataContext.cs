﻿using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext:IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options):base(options)
        {

        }
        public DbSet<Value> Values {get;set;}

        public DbSet<Activity> Activities {get;set;}

        // public DbSet<Employee> Employees {get;set;}

        // public DbSet<Departman> Departmanlar {get;set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.Entity<Value>().HasData(
                new Value(){Id=1, Name="Value1"},
                new Value(){Id=2, Name="Value2"},
                new Value(){Id=3, Name="Value322"}
            );
        }
    }
}
