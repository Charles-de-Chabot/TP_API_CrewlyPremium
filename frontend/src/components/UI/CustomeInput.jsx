import React from 'react'

const CustomeInput = ({ label, state, type, placeholder = '', callable }) => {
    return (
        <div className='mb-3 group'>
            <label className='block text-cyan-100/80 font-medium mb-1 text-xs uppercase tracking-widest group-focus-within:text-teal-400 transition-colors duration-300 ml-1'>
                {label}
            </label>
            <input 
            type={type} 
            className='w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:bg-slate-900/60 focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 backdrop-blur-md shadow-inner'
            placeholder={placeholder}
            value={state}
            onChange={callable}
            />
        </div>
    )
}

export default CustomeInput