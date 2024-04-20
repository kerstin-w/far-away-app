import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
