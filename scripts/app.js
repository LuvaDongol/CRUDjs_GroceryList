const app = document.getElementById("app");

let items = [];

function render() {
  app.innerHTML = `
    <div class="grocery-container">
      <h1 class="title">Grocery List</h1>
      
      <form class="grocery-form" id="grocery-form">
        <input 
          type="text" 
          id="grocery-input" 
          class="grocery-input" 
          placeholder="e.g., Milk"
          required
        />
        <button type="submit" class="submit-btn">
          Add Item
        </button>
      </form>
      
      <div id="item-list" class="grocery-list">
        ${
          items.length === 0
            ? '<p style="text-align: center; color: #999;">No items yet. Add your first item!</p>'
            : items
                .map(
                  (item) => `
            <div class="grocery-item">
              <span>${item.name}</span>
              <button onclick="deleteItem(${item.id})" class="delete-btn">Delete</button>
            </div>
          `
                )
                .join("")
        }
      </div>
    </div>
  `;

  const form = document.getElementById("grocery-form");
  form.addEventListener("submit", handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();

  const input = document.getElementById("grocery-input");
  const itemName = input.value.trim();

  if (itemName) {
    const newItem = {
      id: Date.now(),
      name: itemName,
    };

    items.push(newItem);

    input.value = "";

    render();
  }
}

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  render();
}

render();
