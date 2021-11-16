import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { View, Alert, Button, TextInput, TouchableOpacity, Text, StyleSheet, SnapshotViewIOSBase} from "react-native";
import {Accordion, Card, InputGroup, ListGroup, Modal} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Ionicons } from '@expo/vector-icons';
import {database, firebase} from './firebase'


export default function App() {

  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [list, setList] = useState();
  const [newList, setNewList] = useState();

  const createItem = async () =>{
    const newRef = database.ref("test-1");
    if(input == ""){
      alert("Please provide something!!")
    } else {
      try{
        await newRef.push({
          _id:input,
          value: input,
          isChecked: false
        });
        listItems()
      } catch(err){
        console.log(err)
      }
    }
  }
  
  const listItems = () =>{
    const listRef = database.ref("test-1");
    listRef.on("value", (snapshot) => {
      const getAll = snapshot.val();
      const list = [];
      for (let id in getAll){
        list.push({id, ...getAll[id]})
      }
      console.log(getAll);
      setList(list);
      console.log(list);
    })
  }

  const addItem = () => {
    setItems(items => [...items, input]);
    console.log(items);
    alert("New Item Added");

  };

  const moveToDone = (id) =>{
    console.log(id)
    const updateRef = database.ref('test-1').child(id);
    updateRef.update({
      isChecked: true
    })
  }
  const listDone = () => {
    const newList = list.filter((item) => item.isChecked == false);
    setNewList(newList);
    console.log(newList);
  }

  const listNotDone = () =>{
    
  }


  return (
    <View>
    <Accordion defaultActiveKey="0">
     <Accordion.Item eventKey="0">
      <Accordion.Header>Add A New Activity TO DO</Accordion.Header>
      <Accordion.Body>
      <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">TO DO</InputGroup.Text>
    <input value={input} onInput={e => setInput(e.target.value)} />
      </InputGroup>
      <Button title={"ADD"} onPress={listDone}/>
      <Button title={"TEST"} onPress={createItem}/>
      <Button title={"LIST"} onPress={listItems}/>
      </Accordion.Body>
     </Accordion.Item>
     <Accordion.Item eventKey="1">
      <Accordion.Header>MY ACTIVITIES TO DO</Accordion.Header>
      <Accordion.Body>
        {newList?.map((item) => (
          <Modal.Dialog key={item.id}>
          <Modal.Header closeButton>
            <Modal.Title>{item.value}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <TouchableOpacity onPress={moveToDone(item.id)}> <Ionicons size={'30px'} name="create"/> </TouchableOpacity>
            <TouchableOpacity> <Ionicons size={'30px'} name="checkmark-circle"/> </TouchableOpacity>
          </Modal.Footer>
        </Modal.Dialog>
        ))}
      </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header>ACTIVITIES DONE!!</Accordion.Header>
    <Accordion.Body>
      Here will go the activities that you move to here after you done one of them
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0000ff",
    padding: 10,
    height: '10px',
    width: '10px'
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  Icons: {
    alignItems: 'left'
  }
});