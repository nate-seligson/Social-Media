import styles from './App.module.css'
function Info(props){
 return( <h3>
    <img className = {styles.icon}src = {"./src/assets/" + props.src + ".svg"}></img>
    <br></br>
    {props.text}
    <br></br> 
    {props.number}
    </h3>)
}
function App() {
  return (
    <div class = {styles.wrapper}>
      <div className ={styles.onethirdcontainer}>
        <h1 className={styles.title}>Natestergram</h1>
        <img className = {styles.image}src = "src/ofo.jpg"></img>
        <h1>Brian Johnson</h1>
        <h6 style = {{marginTop:"-10px", color:"gray"}}>@bjohnson</h6>
        <div className = {styles.statsdisplay}>
          <Info text = "followers" src = "person" number = "632"></Info>
          <Info text = "likes" src = "thumbup" number = "10.2k"></Info>
          <Info text = "loves" src = "heart" number = "5.5k"></Info>
        </div><h1 className = {styles.button}>Hello</h1>
      </div>
    </div>
  )
}

export default App
