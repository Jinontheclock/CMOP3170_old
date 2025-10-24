function Excerpt(props){
  return (
        <div className="excerpt">
      <h1>{props.title}</h1>
      <p>{props.body}</p>
      <button>Click me!</button>
    </div>)  
}