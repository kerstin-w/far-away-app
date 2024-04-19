import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

/**
 * The App function is a React component that renders a logo, a form, a packing list, and stats within
 * a div with the class name "app".
 */
export default function App() {
  const [items, setItems] = useState(initialItems);

  /**
   * The `handleAddItems` function adds a new item to an existing array of items.
   * The `handleAddItems` function takes an `item` parameter as input. This parameter
   * represents the item that needs to be added to the existing list of items.
   */
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  /**
   * The function `handleDeleteItem` filters out an item from an array based on its id.
   * The `id` parameter in the `handleDeleteItem` function is the unique identifier of the
   * item that needs to be deleted from the list of items.
   */
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  /**
   * The function `handleToggleItem` toggles the `packed` property of an item with a specific `id` in an
   * array of items.
   * The `id` parameter in the `handleToggleItem` function is used to identify the specific
   * item that needs to be toggled (i.e., its `packed` property should be toggled from `true` to `false`
   * or vice versa).
   */
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    /* Performing form validation. */
    if (!description) {
      setError("Description cannot be empty 🚨");
      const inputField = document.querySelector('input[type="text"]');
      inputField.classList.add("bounce");
      setTimeout(() => {
        inputField.classList.remove("bounce");
      }, 1000);
      return;
    }

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
    setError("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-first-row">
        <h3>What do you need for your 😍 trip?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </div>
      <div>{error && <p className="error">{error}</p>}</div>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

/**
 * The Item function renders a list item with a quantity, description, and a button in JavaScript.
 * @returns The `Item` function is returning a list item (`<li>`) element containing the quantity and
 * description of the item, with a strikethrough style applied if the item is marked as packed.
 * Additionally, there is a button with a cross mark emoji inside the list item.
 */
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
