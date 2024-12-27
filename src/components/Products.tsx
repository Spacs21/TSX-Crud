import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import BASE_URL from '../api';

interface FoodForm {
    name: string;
    id: string;
    price: number;
    desc: string;
    inStock: boolean;
    image: string; 
}

const initialState: FoodForm = {
    name: "",
    id: uuidv4(),
    price: 0,
    desc: "",
    inStock: false,
    image: "", 
}

const Products = () => {
    const [data, setData] = useState<FoodForm>(initialState)
    const [products, setProducts] = useState<FoodForm[]>([])
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEditing) {
            axios.put(`${BASE_URL}/${data.id}`, data)
                .then(res => {
                    setProducts(products.map(product => product.id === data.id ? res.data : product));
                    setIsEditing(false);
                    setData(initialState);
                })
                .catch(err => console.error(err));
        } else {
            axios.post(BASE_URL, data)
                .then(res => {
                    setProducts([...products, res.data]);
                    setData(initialState); 
                })
                .catch(err => console.error(err));
        }
    }

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`${BASE_URL}/${id}`)
                .then(() => {
                    setProducts(products.filter(product => product.id !== id));
                })
                .catch(err => console.error(err));
        }
    }

    const handleEdit = (product: FoodForm) => {
        setData(product);
        setIsEditing(true);
    }

    useEffect(() => {
        axios.get(BASE_URL)
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
                        <input 
                            type="text" 
                            name="name" 
                            placeholder='Name' 
                            onChange={handleChange} 
                            value={data.name}
                            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-200"
                        />
                        <input 
                            type="number" 
                            name="price" 
                            placeholder='Price' 
                            onChange={handleChange} 
                            value={data.price}
                            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-200"
                        />
                        <input 
                            type="text" 
                            name="desc" 
                            placeholder='Description' 
                            onChange={handleChange} 
                            value={data.desc}
                            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-200"
                        />
                        <input 
                            type="text" 
                            name="image" 
                            placeholder='Image URL' 
                            onChange={handleChange} 
                            value={data.image}
                            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-200"
                        />
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                name="inStock" 
                                onChange={handleChange} 
                                checked={data.inStock}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="ml-2 text-gray-300">In Stock</span>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 transform hover:scale-105">
                            {isEditing ? 'Update' : 'Create'}
                        </button>
                    </form>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-gray-800 p-6 rounded-lg shadow-lg transition duration-200 hover:shadow-xl hover:bg-gray-750">
                            <h2 className="text-xl font-bold mb-2 text-blue-400">{product.name}</h2>
                            <p className="text-gray-300 mb-1">Price: ${product.price}</p>
                            <p className="text-gray-400 mb-2">{product.desc}</p>
                            <img src={product.image} alt={product.name} className="mb-2 w-full h-32 object-cover rounded-md"/>
                            <p className={`text-sm font-semibold ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </p>
                            <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-gray-100 rounded-md py-2 px-3 mr-2">Edit</button>
                            <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-gray-100 rounded-md py-2 px-3">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products;