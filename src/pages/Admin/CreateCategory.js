import React, { useEffect, useState } from 'react'
import Header_Footer from './../../Layout/Header_Footer';
import AdminMenu from '../../components/AdminMenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CategoryForm } from '../../components/Form/CategoryForm';
import { Button, Modal } from 'antd';

const CreateCategory = () => {

  const [value,setValue] = useState("");
  const [category,setCategory] = useState([])
  const [visible,setVisible] = useState(false)
  const [selected,setSelected] = useState(null)
  const [updatedName,setUpdatedName] = useState("")

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post('http://localhost:5000/api/v1/category/create-category',{name:value})
        if(data?.success){
          toast.success(`${data?.category?.name} is created`)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something got wrong in input form")
      }
  }


  const getAllCategories = async () => {
    try { 
      const {data} = await axios.get('http://localhost:5000/api/v1/category/get-category')
      if(data.success){
        setCategory(data.category)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something got wrong in getting data")
    }
  }

  useEffect(() => {
    getAllCategories();
  },[category])


  const handleUpdate = async (e) => {
    e.preventDefault();
      try {
        const {data} = await axios.put(`http://localhost:5000/api/v1/category/update-category/${selected._id}`,{name:updatedName})
        if(data?.success){
          toast.success(`${data?.category?.name} is updated`)
          setSelected(null)
          setUpdatedName("")
          setVisible(false)
          getAllCategories()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something got wrong in input form")
      }
  }

  const handleDelete = async (pid) => {
      try {
        const {data} = await axios.delete(`http://localhost:5000/api/v1/category/delete-category/${pid}`)
        if(data?.success){
          toast.success(data?.message)
          getAllCategories()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something got wrong in input form")
      }
  }


  // console.log(category);

  return (
    <Header_Footer>
      <div className='row'>
        <div className='col-3'>
          <AdminMenu />
        </div>
        <div className='col-9'>
          create category
          <div>
            <CategoryForm value={value} setValue={setValue} handleSubmit={handleSubmit} />
          </div>
           {
             category.map((c)=>{
               return (<div key={c._id}>
                <span><h3>{c.name}</h3>
                <button className='btn' onClick={() => {setVisible(true); setUpdatedName(c.name); setSelected(c)}}>edit</button>
                <button className='btn' onClick={() => {handleDelete(c._id)}} >delete</button></span>
              </div>)
            })
           }
          <Modal onCancel={() => {setVisible(false)}} footer={null} open={visible}>
          <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
          </Modal>
        </div>
      </div>
    </Header_Footer>
  )
}

export default CreateCategory
