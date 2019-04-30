// Require mysql, inquirer, and console table
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
// Set up mysql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});
// Connect to MySQL database
// if error console log it, or just stock the shelves 
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }stockShelves();
});
// Display all merch in a table
function stockShelves() {
    connection.query("SELECT * FROM merch", function(err, res) {
        if (err) throw err;
        console.table(res);
        itemPrompt(res);
    });
}
// Start our Prompt
function itemPrompt(inventory) {
    inquirer
    .prompt([{
        type: "input",
        name: "choice",
        message: "Choose Products by ID... Hurry Up And Buy! [Quit with Q]",
        validate: function(val) {
            return !isNaN(val) || val.toLowerCase() === "q";
        }
    }])
    .then(function(val) {
        Exit(val.choice);
        var choiceId = parseInt(val.choice);
        var product = checkInventory(choiceId, inventory);
// When User selects a product, Prompt again for a Quantity
        if (product) {
// Pass the chosen product to Quantity
            Quantity(product);
        }else {
          console.log("\n Not enough Inventory");
          stockShelves();
        }
      });
  }
// Here we continue the prompt by asking the user for a quantity
  function Quantity(product) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "quantity",
          message: "How many would you like? [Quit with Q]",
          validate: function(val) {
            return val > 0 || val.toLowerCase() === "q";
          }
        }
      ])
// Check the quantity of the item to make sure there is enough for the user
      .then(function(val) {
        Exit(val.quantity);
        var quantity = parseInt(val.quantity);
        if (quantity > product.stock_quantity) {
          console.log("\n Not enough Inventory");
          stockShelves();
        }else {
// If all is good, pass the prompt onto Purchase
          Purchase(product, quantity);
        }
      });
  }
// After a purchase, the user will be alerted and the table properly updated
  function Purchase(product, quantity) {
    connection.query(
      "UPDATE merch SET quantity = quantity - ? WHERE item_id = ?",
      [quantity, product.item_id],
      function(err, res) {
        // Let the user know the purchase was successful, re-run stockShelves
        console.log("\nSuccessfully purchased " + quantity + " " + product.product + "'s!");
        stockShelves();
      }
    );
  }
  function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].item_id === choiceId) {
        // If a matching product is found, return the product
        return inventory[i];
      }
    }return null;
  }
  function Exit(choice) {
    if (choice.toLowerCase() === "q") {
      // Log a message and exit the current node process
      console.log("Goodbye!");
      process.exit(0);
    }
  }
  