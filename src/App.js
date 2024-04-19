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

  /**
   * The function `handleClearList` clears the items in a list by setting it to an empty array.
   */
  function handleClearList(items) {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

/**
 * The Form handles input for adding items to a trip list, including form validation and submission.
 * @returns The `Form` component is returning a form element with input fields for the user to enter a
 * description of an item and select a quantity, along with a button to add the item. The form also
 * displays an error message if the description field is empty during form submission. When the form is
 * submitted, the `handleSubmit` function is called to handle the form submission logic.
 */
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

/**
 * The PackingList function sorts and displays a list of items with options to delete,
 * toggle, and clear the list.
 * @returns The `PackingList` component is being returned. It displays a list of items with sorting
 * options and a button to clear the list. The items are sorted based on the selected sorting criteria
 * (input order, description, status, quantity). Each item in the list can be deleted or toggled.
 */
function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  switch (sortBy) {
    case "input":
      sortedItems = [...items];
      break;
    case "description":
      sortedItems = [...items].sort((a, b) =>
        a.description.localeCompare(b.description)
      );
      break;
    case "packed":
      sortedItems = [...items].sort(
        (a, b) => Number(a.packed) - Number(b.packed)
      );
      break;
    case "quantity":
      sortedItems = [...items].sort((a, b) => a.quantity - b.quantity);
      break;
    default:
      sortedItems = [...items];
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by status</option>
          <option value="quantity">Sort by quantity</option>
        </select>
        <button onClick={() => onClearList(items)}>Clear List</button>
      </div>
    </div>
  );
}

/**
 * The Item function displays a checkbox, item quantity and description, and a delete button
 * for a given item.
 * @returns The `Item` function is returning a JSX element representing a list item (`<li>`). Inside
 * the list item, there is an input checkbox, a span element displaying the quantity and description of
 * the item (with a line-through style if the item is marked as packed), and a button with a delete
 * icon. The checkbox is tied to the `onToggleItem` function to handle toggling the
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

/**
 * The Stats function displays a message based on the number of items in a packing list and the
 * percentage of items that have been packed.
 * The `Stats` component returns either a message prompting to start adding items to the
 * packing list if there are no items, or a message displaying the number of items on the list, the
 * number of items already packed, and the percentage of items packed. If all items are packed (100%
 * packed), it displays a message indicating that everything is ready to go.
 */
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
