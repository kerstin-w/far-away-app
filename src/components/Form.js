import { useState } from "react";

/**
 * The Form handles input for adding items to a trip list, including form validation and submission.
 * @returns The `Form` component is returning a form element with input fields for the user to enter a
 * description of an item and select a quantity, along with a button to add the item. The form also
 * displays an error message if the description field is empty during form submission. When the form is
 * submitted, the `handleSubmit` function is called to handle the form submission logic.
 */
export default function Form({ onAddItems }) {
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
