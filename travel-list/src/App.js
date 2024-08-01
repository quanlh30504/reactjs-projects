import { useState } from "react";

const items = [
  {
    id: 1,
    description: "Passports",
    quatity: 2,
    packed: false
  },
  {
    id: 2,
    description: "Socks",
    quantity: 12,
    packed: false
  }
]

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

export default App;

function Logo(){
  return <h1>🎋 Far Away 💼</h1>
}
function Form(){

  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)


  function handleSubmit(e){
    e.preventDefault()

    if(description === "") return
    const item = {id: Date.now(), description, quantity, packed: false}
    console.log(item)

    setDescription("")
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={e => handleSubmit(e)}>
      <h3>What do you need for your trip ?</h3>
      <select value={quantity} onChange={e => setQuantity(e.target.value)}>
        {Array.from({length: 20}, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>{num}</option>
        ))}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={e => setDescription(e.target.value)}/>
      <button>Add</button>
    </form>
  )
}
function PackingList() {
  return (
    <div className="list">
      <h1>List</h1>
      {items.map(item => (
        <Item item={item} />
      ))}
    </div>
  )
}
function Item({item}){
  return (
    <li>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.description} {item.quantity}
      </span>
      <button>❌</button>
    </li>
  )
}

function Stats(){
  return (
    <footer className="stats">
      <em>
        💼 You have X items on your list, and you already packed X (X%)
      </em>
    </footer>
  )
}