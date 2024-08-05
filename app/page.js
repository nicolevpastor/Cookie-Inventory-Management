'use client'
//importing from react, firebase
import Image from "next/image";
import {useState, useEffect} from 'react' ;
import {firestore} from '@/firebase';
import {Box, Modal, Typography, Stack,Button, TextField} from '@mui/material';
import { collection, deleteDoc, doc, getDocs, query, getDoc, setDoc, } from 'firebase/firestore';

//functions
export default function Home() {
  const [inventory,setInventory] = useState([]);
  const [open, setOpen] = useState (false) ;
  const [itemName, setItemName] = useState ('');
  const [searchQuery, setSearchQuery] = useState('');

//updating inventory
  const updateInventory = async () => {
    //snapshot is the inventory
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc)=> {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList);
    console.log(inventoryList);
  }


//adding item
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc (docRef, {quantity: quantity + 1})
    }
    //if it exists, add one, if it doesn't we set quantity to 1
    else {
      await setDoc(docRef,{quantity:1});
    }

    await updateInventory()
  }

  //remove item
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)


    if (docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity ==1) {
        await deleteDoc(docRef)
      } else {
        await setDoc (docRef, {quantity: quantity -1})
      }
    }

    await updateInventory()
  }

//Effects
  useEffect(() => {
    updateInventory();
  }, [])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //searching an item
  const filteredInventory = inventory.filter(({ name }) =>
  name.toLowerCase().includes(searchQuery.toLowerCase())
);

//box where title Cookie Inventory is
//pop up box for add new item button
  return (
    <Box 
    width = "100vw" 
    height = "100vh" 
    display = "flex" 
    bgcolor= '#003049'
    //makes the box in the center with button on top proportionate
    flexDirection="column"
    justifyContent="center"
    alignItems = "center"
    gap = {2}
    
     >
      <Modal open = {open}
        onClose= {handleClose} >
        <Box position = 'absolute'
          top = '50%' 
          left = '50%' 
          width = {400} 
          bgcolor = 'white'
          border = "2px solid #000"
          boxShadow = {24}
          p = {4}
          display = "flex"
          flexDirection = "column"
          gap = {3}
          sx = { {transform: "translate(-50%, -50%)"
        }}
           >
            <Typography variant = "h6"> 
            Add Item
            </Typography>
            <Stack width = "100%"
            direction="row" 
            spacing = {2} > 
            <TextField 
            variant = 'outlined'
            fullWiidth
            value = {itemName}
            onChange = {(e) => {setItemName(e.target.value)
            }}
            />
            <Button 
            variant = "outlined"
            onClick = {() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}>Add</Button>
            </Stack>
        </Box>
      </Modal>
      <Typography 
        variant ='h2' color = '#FFFCF2'> 
        Cookie Flavors
        </Typography>
        <Typography 
        variant ='h6' color = '#FFFCF2'> 
        Welcome to the Inventory Page for Nicole's Cookie Shop!
        </Typography>
        <Typography 
        variant ='h6' color = '#FFFCF2'> 
        Please add a new or exisiting cookie flavor, and remove any if needed.
        </Typography>
        <Typography 
        variant ='h6' color = '#FFFCF2'> 
        The left side will display the cookie flavors we have, and to the right, we have the quantity listed along with the ADD/REMOVE option to update it.
        </Typography>
      <Button 
      variant = "contained" 
      onClick = {() => {
        handleOpen()
      }}>
        Add New Item
      </Button>
      <Box border= "1px solid #003049">
      <Box
      width = "1500px" height="100px"
      bgcolor="#1D4D91" 
      display = "flex"
      alignItems = "center"
      justifyContent= "center"
      >
        <Typography 
        variant ='h2' color = '#FFFCF2'position = 'absolute' transform= 'translateX(-50%, -50%)'
        > 
        Cookie Inventory Items
        </Typography>
        <Box
        display="flex"
        justifyContent="flex-end" 
        flex={1} 
        style={{ 
        marginLeft: 'auto', 
        position: 'absolute', 
        right: '260px' 
        }}
        >
        <TextField
            variant="outlined"
            placeholder="Search items.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ backgroundColor: '#FFFCF2' }}
          />
       </Box>

      </Box>
      
      <Stack 
      width = "1500px"
      height = "470px" 
      spacing = {2}
      bgcolor= '#FFFCF2'

      overflow = "auto" >
      
        {
          //shows the map of the inventory items on the box and when searched it pops up
          filteredInventory.map(({name, quantity}) => (
            <Box 
            key = {name}
            width ="100%"
            minHeight = "150px" 
            display="flex"
            alignItems = "center"
            flexDirection="row"

            justifyContent ="space-between"
            bgColor = "#f0f0f0"
            padding = {7}
             >
              <Typography
              variant = 'h2'
              color = "333" 
              textAlign = "left"
              style={{ flex: 1 }}

               >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              
              
              <Typography
              variant = 'h3'
              color = "333" 
              textAlign = "center"
              style={{ flex: 0.5, minWidth: "100px" }}

               >
                {quantity}
              </Typography>
              
              <Stack
              direction = "row" 
              spacing={2}>
              
              <Button 
              variant ="contained" 
              onClick={() => {
                addItem(name)
              }} >
                Add
              </Button>
              <Button 
              variant ="contained" 
              onClick={() => {
                removeItem(name)
              }} >
                Remove
              </Button>
              </Stack>
            </Box>
          ))
        }
      </Stack>
      </Box>
      <Typography 
        variant ='h6' color = '#FFFCF2'> 
      Any questions please contact our founder, Nicole Pastor. 
        </Typography>
    </Box>
  );
}
