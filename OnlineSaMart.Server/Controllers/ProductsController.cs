using Microsoft.AspNetCore.Mvc;
using OnlineSaMart.Server.Models;
using System.Collections.Generic;
using System.Linq;

namespace OnlineSaMart.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private static List<Product> _products = new List<Product>
        {
            new Product { Id = 1, Name = "Handmade Necklace", Description = "Crushed Starstone and Strawberry Quartz Necklace", Price = 250, ImageUrl = "https://kiooinsitu.co.za/cdn/shop/files/UniqueHandmadeJewelry_ProductImage_-2024-06-09T163046.483.png?v=1717944824&width=493" },
            new Product { Id = 2, Name = "Alphabet Ltter Necklace", Description = "Gold Stainless Steel 10 mm Alphabet Letter Necklace", Price = 150, ImageUrl = "https://kiooinsitu.co.za/cdn/shop/files/UniqueHandmadeJewelry_ProductImage_14_b0bd12ca-35d6-4dce-858c-6e4511256987.png?v=1721675164&width=493" }
        };

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _products;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("Product is null.");
            }
            product.Id = _products.Max(p => p.Id) + 1;  // Generate a new ID for the product
            _products.Add(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Product product)
        {
            if (product == null || product.Id != id)
            {
                return BadRequest("Product ID mismatch.");
            }

            var existingProduct = _products.FirstOrDefault(p => p.Id == id);
            if (existingProduct == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.ImageUrl = product.ImageUrl;

            return NoContent();  
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            _products.Remove(product);
            return NoContent();  
        }
    }
}
