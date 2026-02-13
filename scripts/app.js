const app = document.getElementById("app");

function render() {
  app.innerHTML = `
    <div class="grocery-container">
      <h1 class="title">Grocery List</h1>
      
      <form class="grocery-form">
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
      </div>
    </div>
  `;
}

render();
