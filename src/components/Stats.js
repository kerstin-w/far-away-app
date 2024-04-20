/**
 * The Stats function displays a message based on the number of items in a packing list and the
 * percentage of items that have been packed.
 * The `Stats` component returns either a message prompting to start adding items to the
 * packing list if there are no items, or a message displaying the number of items on the list, the
 * number of items already packed, and the percentage of items packed. If all items are packed (100%
 * packed), it displays a message indicating that everything is ready to go.
 */
export default function Stats({ items }) {
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
