import React, { useEffect, useState } from 'react'

function Content() {
    const [form, setform] = useState({ site: '', username: '', password: '' })
    const [type, settype] = useState("password")
    const [eyeSrc, seteyeSrc] = useState("./public/image/eye.png")
    const [passwords, setpasswords] = useState(() => {
        const localData = localStorage.getItem("passwords")
        return localData ? JSON.parse(localData) : []
    })

    useEffect(() => {
        localStorage.setItem("passwords", JSON.stringify(passwords))
    }, [passwords])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        if (form.password != '' && form.site != '' && form.username != '') {
            setpasswords([...passwords, form])
            setform({ site: '', username: '', password: '' })
        }
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
        .then(()=>console.log("copied!"))
    }

        const handleCopy = (data) =>{
            setTimeout(() => {
                copyToClipboard(data.site);
            },500);
            setTimeout(() => {
                copyToClipboard(data.username);
            },1000);
            setTimeout(() => {
                copyToClipboard(data.password);
            },1500);
        }
        const handleEdit = (data) => {
            setform({ site: data.site, username: data.username, password: data.password })
            handleDelete(data.site)
        }

        const handleDelete = (site) => {
            let newpasswords = passwords.filter(item => {
                return item.site !== site
            })
            setpasswords(newpasswords)
        }

        const handleEye=()=>{
            if(type==="password"){
                settype("text")
                seteyeSrc("./public/image/hide.png")
            }
            else{
                settype("password")
                seteyeSrc("./public/image/eye.png")
            }
        }

        return (
            <div className='w-full h-[85%] bg-gray-100 flex flex-col items-center'>
                <div>
                    <h3 className='text-3xl p-3 italic font-bold'>keep Secure Security here...</h3>
                </div>
                <div className='w-[80%] flex flex-col gap-3 p-2'>
                    <input className='border px-2 py-1 w-full border-green-400 rounded-3xl' placeholder='website URL...' value={form.site} onChange={handleChange} name='site' type="text" />
                    <div className='flex gap-2'>
                        <input className='border py-1 w-[85%] px-2 border-green-400 rounded-3xl' placeholder='Username' type="text" value={form.username} onChange={handleChange} name="username" />
                        <span className='relative'>
                        <input className='border px-2 py-1 border-green-400 rounded-3xl' placeholder='Password' type={type} value={form.password} onChange={handleChange} name="password" id="pass" />
                        <img src={eyeSrc} onClick={handleEye} className='absolute top-1 right-3' />
                        </span>
                    </div>
                    <button className='border bg-green-200 cursor-pointer rounded-2xl font-semibold ' onClick={handleSave}>Save</button>
                </div>
                <div className='w-[80%] h-[69%] p-2'>
                    <div>
                        <h2 className='text-2xl font-bold'>Your paswords</h2>
                    </div>
                    <div className='w-full max-h-[92%] overflow-y-auto py-3'>
                        {passwords.length === 0 && <div className='w-full h-80 flex justify-center items-center'>
                            <h2 className='text-2xl font-bold'>No passwords</h2>
                        </div>}
                        {passwords.length != 0 && <table className='w-full h-full p-2 rounded-2xl overflow-hidden '>
                            <thead className='border border-white bg-green-400'>
                                <tr>
                                    <th>URL</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwords.map((data) => {
                                    return <tr key={data.site} className='text-center'>
                                        <td>{data.site}</td>
                                        <td>{data.username}</td>
                                        <td>{data.password}</td>
                                        <td className='flex justify-center items-center gap-2 cursor-pointer'>
                                            <img src="./public/image/copy.png" width="25px" height="25" alt="copy" onClick={() => handleCopy(data)} />
                                            <lord-icon
                                                onClick={() => handleEdit(data)}
                                                src="https://cdn.lordicon.com/fikcyfpp.json"
                                                trigger="hover"
                                                stroke="bold"
                                                className="cursor-pointer"
                                                width="250px" height="250px">
                                            </lord-icon>
                                            <lord-icon
                                                onClick={() => handleDelete(data.site)}
                                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                                trigger="hover"
                                                stroke="bold"
                                                className="cursor-pointer"
                                                width="250px" height="250px">
                                            </lord-icon>
                                        </td>
                                    </tr>
                                }
                                )}
                            </tbody>
                        </table>}
                    </div>
                </div>
            </div>
        )
    }

    export default Content