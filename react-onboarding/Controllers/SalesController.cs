using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_onboarding.Data;
using react_onboarding.Models;

namespace react_onboarding.Controllers
{

    public class SaleData {
        public SaleData(int id, int productId, string product, int storeId, string store, int customerId, string customer, DateTime dateSold)
        {
            Id = id;
            ProductId = productId;
            Product = product;
            StoreId = storeId;
            Store = store;
            CustomerId = customerId;
            Customer = customer;
            DateSold = dateSold;
        }

        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Product { get; set; }
        public int StoreId { get; set; }
        public string Store { get; set; }
        public int CustomerId { get; set; }
        public string Customer { get; set; }
        public DateTime DateSold { get; set; }

        
    }
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly DataContext _context;

        public SalesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sale>>> Getsale()
        {

   
            return await _context.sale.ToListAsync();
        }

        [HttpGet("saleData")]
        public List<SaleData> Getsaledata()
        {

            var query = _context.sale.Join(_context.customer, sale => sale.CustomerId, customer => customer.Id, (sale, customer) => new { customer = customer.Name, sale = sale.Id, customerId = customer.Id, productId = sale.ProductId, storeId = sale.StoreId, soldDate = sale.DateSold }).
                Join(_context.product, sale => sale.productId, product => product.Id, (sale, product) => new { sale = sale.sale, customer = sale.customer, customerId = sale.customerId, product = product.Name, productId = product.Id, storeId = sale.storeId, soldDate = sale.soldDate }).
                Join(_context.store, sale => sale.storeId, store => store.Id, (sale, store) => new SaleData(sale.sale,sale.productId,sale.product,store.Id,store.Name,sale.customerId,sale.customer,sale.soldDate)/* new { sale = sale.sale, customer = sale.customer, customerId = sale.customerId, product = sale.product, productId = sale.productId, storeId = sale.storeId, store = store.Name }*/).ToList();
            
            return  query;
        } 

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
            var sale = await _context.sale.FindAsync(id);

            if (sale == null)
            {
                return NotFound();
            }

            return sale;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, Sale sale)
        {
            if (id != sale.Id)
            {
                return BadRequest();
            }

            _context.Entry(sale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale(Sale sale)
        {
            _context.sale.Add(sale);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSale", new { id = sale.Id }, sale);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sale>> DeleteSale(int id)
        {
            var sale = await _context.sale.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }

            _context.sale.Remove(sale);
            await _context.SaveChangesAsync();

            return sale;
        }

        private bool SaleExists(int id)
        {
            return _context.sale.Any(e => e.Id == id);
        }
    }
}
