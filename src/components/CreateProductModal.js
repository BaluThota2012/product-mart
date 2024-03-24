import React, { useEffect, useState } from 'react'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { ThreeDots } from 'react-loader-spinner'
import { useLocation, useNavigate } from 'react-router';
import ProductService from '../service/ProductsService';
import ResponseHandler from './ResponseHandler';
import BarcodeService from '../service/BarcodeService';
import { MdUploadFile } from 'react-icons/md';
import ImageService from '../service/ImageService';

const CreateProductModal = (props) => {
    const {state} = useLocation();
    const [productObj, setProductObj] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [productImage, setProductImage] = useState()
    const navigate = useNavigate()
    const handleNewBarcode = async(event) => {
        console.log('handle new barcode')
        const response = await BarcodeService().generateBarcode();
        ResponseHandler().handle(response, success => {
            console.log('Generated barcode: ', success);
            setProductObj({...productObj, barcode:success})
        }, err => alert(err));
    }
    useEffect(() => {
        console.log('use location: ', state)
        console.log('Products in modal: ', props?.product)
        if(props?.product){
            setProductObj(props?.product)
        } else if(state?.product){
            setProductObj(state?.product)
        }
        setDisabled(props.mode==='EDIT')
    }, [props?.product, state?.product])


    const handleProductSubmit = async(event) => {
        
        let response = {message: 'Unable process request'}
        const productObj1 = { 'quantity_sold':'10','expiry_date':'', 'image_src':'https://x22249184-image-store.s3.eu-west-1.amazonaws.com/product-api/product-img3.jpg', ...productObj}
        if(props.mode==='EDIT') {
            response =await ProductService().updateProduct(productObj1);
        } else if(props.mode === 'CREATE'){
            response = await ProductService().addNewProduct([productObj1]);
        }
        ResponseHandler().handle(response,(success) => {
            alert(success);
            navigate('/products')
        }, (error) => {
            alert(error)
            navigate('/products')
        })
    }

    const handleImageUpload = async() => {
        let response = {message: 'Unable process request'}
        const productObj1 = { 'quantity_sold':'10','expiry_date':'', 'image_src':'https://x22249184-image-store.s3.eu-west-1.amazonaws.com/product-api/product-img3.jpg', ...productObj}
        response =await ImageService().updateProduct(productObj1);
        ResponseHandler().handle(response,(success) => {
            alert(success);
            setProductObj({...productObj, image_src:success})
        }, (error) => {
            alert(error)
            navigate('/products')
        })
    }
  return (
    <React.Fragment>

{/* <!-- Modal toggle --> */}

{/* <!-- Main modal --> */}
<div id="crud-modal" tab-index="-1" hidden={!props.show} aria-hidden="true" className=" overflow-y-auto overflow-x-hidden relative  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-lg max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
           {/*  <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                   {props.title} {productObj.product_id && <span 
                   className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                   >{productObj.product_id}</span> }

                </h3>
      
            </div>
            {/* <!-- Modal body --> */}
            <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" 
                            value={productObj.product_name}
                            onChange={(e) => {setProductObj({...productObj, product_name:e.target.value})}}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" name="price" id="price"
                        value={productObj.price}
                        onChange={(e) => {setProductObj({...productObj, price:e.target.value})}}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                        <input type="number"
                        value={productObj.quantity_available}
                        onChange={(e) => {setProductObj({...productObj, quantity_available:e.target.value})}}
                         name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="25" required="" />
                    </div>
                    <div className="relative z-0">
                        <input type="text"  disabled={disabled}
                        value={productObj.barcode}
                        onChange={(e) => {setProductObj({...productObj, barcode:e.target.value})}}
                        id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label for="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Barcode</label>
                    </div>
                    {/* <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> */}
                    <div className='sm:col-span-1'>
                       {props.mode ==='CREATE' && <button disabled={isLoading} className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-800 dark:text-green-300 w-fit h-full text-center hover:dark:bg-green-900 hover:dark:text-green-200" title="new barcode" type='button' onClick={handleNewBarcode}>
                        { 
                        isLoading ?
                        <ThreeDots
                        visible={true}
                        height="24"
                        width="24"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperclassName=""
                        />
                      
                        : <ArrowPathIcon height={24} width={24} /> }
                        
                    </button> }
                    </div> 
                   
                    {/* <div className="col-span-2">
                        <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                        <textarea id="description" 
                        value={productObj.description}
                        onChange={(e) => {setProductObj({...productObj, description:e.target.value})}}
                        rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                    </div> */}
                    <div className='col-span-2 sm:col-span-1'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Image</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    value={productImage} id="file_input" type="file" /> 
                    </div>
                    <div className='sm:col-span-1'>
                       {props.mode ==='CREATE' && <button disabled={isLoading} className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-800 dark:text-green-300 w-fit h-full text-center hover:dark:bg-green-900 hover:dark:text-green-200" title="new barcode" type='button' onClick={handleImageUpload}>
                        { 
                        isLoading ?
                        <ThreeDots
                        visible={true}
                        height="24"
                        width="24"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperclassName=""
                        /> 
                        :<> <MdUploadFile height={24} width={24} />  Upload </>}
                    </button> }
                    </div> 
                </div>
               
 <button 
  disabled={isLoading}
    onClick={handleProductSubmit}
    type="button"  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {isLoading ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
</svg> Loading... </> :  
                   <><svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> {props.mode==='EDIT' ? <>Update product</> : <>Add new product</> }</> }
                </button> 
            </form>
        </div>
    </div>
</div> 



    </React.Fragment>
  )
}

export default CreateProductModal