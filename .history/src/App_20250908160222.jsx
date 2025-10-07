function App(){
  return (
    <div>
      <Excerpt  />
       <Excerpt />
        <Excerpt />

    </div>
  )
}

function Excerpt(props){
  return (
        <div className="excerpt">
      <h1>{props.title}</h1>
      <p>{props.body}</p>
      <button>Click me!</button>
    </div>)  
}

export default App;