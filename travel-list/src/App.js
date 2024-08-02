import { createContext, useCallback, useContext, useState } from "react";

// const items = [
//   {
//     id: 1,
//     description: "Passports",
//     quatity: 2,
//     packed: false
//   },
//   {
//     id: 2,
//     description: "Socks",
//     quantity: 12,
//     packed: false
//   }
// ]

function App() {

  const [items, setItems] = useState([]);

  function handleAddItem(item){
    return setItems(prevItems => [...prevItems,item])
  }

  function handlePacked(index, item){
    // items.splice(index,1)
    // handleAddItem({...item, packed: true})
    const check = !item.packed
    setItems(prevItems =>
      prevItems.map((it, idx) => idx === index ? { ...it, packed: check } : it)
    );
  }

  function handleDeleteItem(index){
    setItems(prevItems => prevItems.splice(index, 1))
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem}/>
      <PackingList items={items} onPacked={handlePacked} onDelete={handleDeleteItem}/>
      <Stats items={items} />
    </div>
  );
}

export default App;

function Logo() {
  return <h1>🎋 Far Away 💼</h1>;
}
function Form({onAddItem}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();

    if (description === "") return;
    const item = { id: Date.now(), description, quantity, packed: false };
    console.log(item)
    onAddItem(item)

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>What do you need for your trip ?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
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
    </form>
  );
}
function PackingList({items, onPacked, onDelete}) {
  return (
    <div className="list">
      <h1>List</h1>
      {items.map((item, index) => (
        <Item item={item}  key={item.id} onPacked={onPacked} index={index} onDelete={onDelete}/>
      ))}
    </div>
  );
}
function Item({ item, index, onPacked , onDelete}) {
  return (
    <li>
      <input type="checkbox" checked={item.packed} onChange={() => onPacked(index, item)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDelete(index)}>❌</button>
    </li>
  );
}

function Stats({items}) {
  const numOfItems = items.length
  const numOfPacked = items.filter((item) => item.packed).length
  const percent = Math.round((numOfPacked / numOfItems) * 100)
  return (
    <footer className="stats">
      {percent === 100 
        ? (`✈️You got everything! Ready to go 🚙`) 
        : <em>{`💼 You have ${numOfItems} items on your list, and you already packed ${numOfPacked} (${percent ? percent : 0}%)`}</em>
      }
      
    </footer>
  );
}
