import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState, useEffect } from 'react';
import { Additem } from "./Additem";
import Searchitem from "./Searchitem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = 'http://localhost:3500/items';
  
    const [items,setItems] = useState([]);
    const [newItem,setNewItem] = useState('')
    const [search,setSearch] = useState('')
    const [fetchError,setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [score, setScore] = useState(null);

    useEffect(()=>{
      const fetchItems = async () => {
        try{
          const response = await fetch(API_URL);
          if(!response.ok) throw Error("Data not received");
          const listItems = await response.json();
          console.log(listItems)
          setItems(listItems)
          setFetchError(null)
        }catch (err){
          setFetchError(err.mesage)
        }
        finally{
         setIsLoading(false) 
        }
      }
      

      setTimeout(()=>{
        (async()=> await fetchItems())()
      },2000)
      
    },[])

    const addItem =async (item) => {
      const id = items.length ? items[items.length - 1 ].id+1 : 1;
      const addNewItem = {id,checked:false,item}
      const listItems = [...items,addNewItem]
      setItems(listItems)
      

      const postOptions = {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addNewItem)
      }

      const result = await apiRequest(API_URL,postOptions);
      if(result) setFetchError(result);
    }



    const handleCheck = async (id) =>{
      const listItems = items.map((item)=>item.id===id ? {...item,checked:!item.checked} : item)
      setItems(listItems)
      const myItem = listItems.filter((item)=> item.id === id)
      const updateOptions={
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({checked:myItem[0].checked})
      }

      const reqUrl=`${API_URL}/${id}`
      const result = await apiRequest(reqUrl ,updateOptions)
      if(result) setFetchError(result)
    }

    const handleDelete = async (id) =>{
      const listItems = items.filter((item)=>item.id!==id)
      setItems(listItems)
     
      const deleteOptions = { method: 'DELETE' };
      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl, deleteOptions);
      if (result) setFetchError(result);
    }

    const handleScore = () => {
      const checkedItems = items.filter((item) => item.checked);
      const percentage = (checkedItems.length / items.length) * 100;
      setScore(percentage.toFixed(0));
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      console.log('submitted')
      if(!newItem) return;
      console.log(newItem)
      addItem(newItem)
      setNewItem('')//Setting the input box to empty for next input
    }

  return (
    <div className="App">
  
    <Header title="DAY-TO-DAY GRIND"/>
    <Additem 
      newItem = {newItem}
      setNewItem = {setNewItem}
      handleSubmit = {handleSubmit}
    />
    <Searchitem
      search={search}
      setSearch={setSearch}
    />
    <main>
      {isLoading && <p>{`Error: ${fetchError}`}</p>}
      {fetchError && <p>{`Error: ${fetchError}`}</p>}
      {!isLoading && !fetchError && <Content 
      items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
      score={score}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      handleScore={handleScore}
      />}
    </main>
    
    <Footer 
    length = {items.length}
    />
    </div>
  );
}

export default App;
