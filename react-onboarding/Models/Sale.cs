using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_onboarding.Models
{

    
    public class Sale
    {
       
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int StoreId { get; set; }
        public int CustomerId { get; set; }
        public DateTime DateSold { get; set; }
    }
}
