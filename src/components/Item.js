/**
 * The Item function displays a checkbox, item quantity and description, and a delete button
 * for a given item.
 * @returns The `Item` function is returning a JSX element representing a list item (`<li>`). Inside
 * the list item, there is an input checkbox, a span element displaying the quantity and description of
 * the item (with a line-through style if the item is marked as packed), and a button with a delete
 * icon. The checkbox is tied to the `onToggleItem` function to handle toggling the
 */
export default function Item({ item, onDeleteItem, onToggleItem }) {
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
