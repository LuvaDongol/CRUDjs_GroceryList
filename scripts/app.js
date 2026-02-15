import { saveItems, loadItems } from "./storage.js";

const app = document.getElementById("app");

let items = loadItems();

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
                .sort((a, b) => a.completed - b.completed)
                .map(
                  (item) => `
            <div class="grocery-item ${item.completed ? "completed" : ""}">
              <label class="item-label">
                <input
                  type="checkbox"
                  class="complete-checkbox"
                  data-id="${item.id}"
                  ${item.completed ? "checked" : ""}
                />
                <span>${item.name}</span>
              </label>
              <button data-id="${item.id}" class="delete-btn">Delete</button>
            </div>
          `
                )
                .join("")
        }
      </div>

      <div class="actions">
        <button type="button" class="delete-all-btn" ${
          items.length === 0 ? "disabled" : ""
        }>
          Delete All
        </button>
      </div>
    </div>
  `;
}

function handleSubmit(e) {
  e.preventDefault();

  const input = document.getElementById("grocery-input");
  const itemName = input.value.trim();

  if (itemName) {
    const newItem = {
      id: Date.now(),
      name: itemName,
      completed: false,
    };

    items.push(newItem);
    saveItems(items);

    input.value = "";

    render();
  }
}

function handleDeleteClick(event) {
  const button = event.target.closest(".delete-btn");
  if (!button) {
    return;
  }

  const itemId = Number(button.dataset.id);
  if (Number.isNaN(itemId)) {
    return;
  }

  items = items.filter((item) => item.id !== itemId);
  saveItems(items);
  render();
}

function handleDeleteAllClick(event) {
  const button = event.target.closest(".delete-all-btn");
  if (!button || button.disabled) {
    return;
  }

  items = [];
  saveItems(items);
  render();
}

function handleToggleChange(event) {
  const checkbox = event.target.closest(".complete-checkbox");
  if (!checkbox) {
    return;
  }

  const itemId = Number(checkbox.dataset.id);
  if (Number.isNaN(itemId)) {
    return;
  }

  items = items.map((item) =>
    item.id === itemId ? { ...item, completed: checkbox.checked } : item
  );
  saveItems(items);
  render();
}

render();
app.addEventListener("submit", handleSubmit);
app.addEventListener("click", handleDeleteClick);
app.addEventListener("click", handleDeleteAllClick);
app.addEventListener("change", handleToggleChange);
