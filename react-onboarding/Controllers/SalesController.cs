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
        public  string Getsaledata()
        {

            return 'sfsd';
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
