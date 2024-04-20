import { useState } from "react";
import Item from "./Item";

/**
 * The PackingList function sorts and displays a list of items with options to delete,
 * toggle, and clear the list.
 * @returns The `PackingList` component is being returned. It displays a list of items with sorting
 * options and a button to clear the list. The items are sorted based on the selected sorting criteria
 * (input order, description, status, quantity). Each item in the list can be deleted or toggled.
 */
export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
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
