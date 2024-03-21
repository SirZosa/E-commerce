import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Select from 'react-select'
export default function Checkout(){
    const [countries, setCountries] = useState(null)
    const [states, setStates] = useState(null)
    const [cities, setCities] = useState(null)

    const [fisrtName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [street, setStreet] = useState(null)
    const [apartmen, setApartment] = useState(null)
    const [city, setCity] = useState(null)
    const [zipcode, setZipcode] = useState(null)
    const [Phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)
    const [inputCountry, setInputCountry] = useState('United States')
    const [stateInput, setStateInput] = useState(null)
    const [cityInput, setCityInput] = useState(null)
    const [formInput, setFormInput] = useState({
        fisrtName:null,
        lastName:null,
        country:null,
        street:null,
        city:null,
        zipcode:null,
        phone:null,
        email:null
    })
    
    useEffect(()=>{
        fetch(`https://countriesnow.space/api/v0.1/countries/`)
        .then(res=>res.json())
        .then(data=> setCountries(data.data.map(obj => {return obj})))
    },[])

    useEffect(()=>{
        const country = inputCountry
        fetch(`https://countriesnow.space/api/v0.1/countries/states/q?country=${country}`)
        .then(response => response.json())
        .then(result => setStates((result.data.states)))
        .catch(error => console.log('error', error));
        setStateInput(null)
            },[inputCountry])

    useEffect(()=>{
        setCityInput(null)
        setCities(null)
        if(stateInput){
            const country = inputCountry
            const state = stateInput? stateInput.value : ''
            fetch(`https://countriesnow.space/api/v0.1/countries/state/cities/q?country=${country}&state=${state}`)
            .then(response => response.json())
            .then(data => setCities(data.data))
        }
        else return
    },[stateInput])

    useEffect(()=>{
        setFormInput({
            fisrtName:fisrtName,
            lastName:lastName,
            country:inputCountry,
            street:street,
            state:stateInput,
            city, 
            zipcode:Number(zipcode),
            phone:Phone,
            email:email
        })
    },[fisrtName, lastName, inputCountry, street, stateInput, zipcode, Phone, email])

    const countryOptions = countries?.map(obj => {
        return {value: obj.country, label:obj.country}
    })

    const stateOption = states?.map(obj =>{
        const {name} = obj
        return {value:name, label:name}
    })

    const cityOptions = cities?.map(obj => {
        return {value: obj, label:obj}
    })
    
    const navigate = useNavigate()
      function validateForm(e){
        e.preventDefault()
        navigate('/orders')
      }

    return(
        <section className="checkout">
            <h2>Checkout</h2>
            <p className="warning">This e-commerce website was made for learnig and practice purposes, any of the information entered below is not going to be stored in any part outside your web browser, you can use fake information if you want to.</p>
            <h4 className="billing-title">Billing Details</h4>
            <form onSubmit={validateForm} className="checkout-form">
                <div className="checkout-name">
                    <div className="checkout-input-structure">
                        <label htmlFor="first name">First name<span className="checkout-required"> *</span></label>
                        <input className='checkout-input' onChange={(e)=> setFirstName(e.target.value)} name="first name" required id="first name" />
                    </div>
                    <div className="checkout-input-structure">
                        <label htmlFor="last name">Last name<span className="checkout-required"> *</span></label>
                        <input className="checkout-input" type="text" onChange={(e)=> setLastName(e.target.value)} name="last name" required id="last name"/>
                    </div>
                </div>
                <div className="checkout-input-structure">
                    <label htmlFor="country">Country / Region<span className="checkout-required"> *</span></label>
                    <Select name="country" options={countries ? countryOptions : "loading..."} onChange={(e) => setInputCountry(e.value)} required/>
                </div>
                <div className="checkout-street-address">
                    <div className="checkout-input-structure">
                        <label htmlFor="Street-address">Street address<span className="checkout-required"> *</span></label>
                        <input className="checkout-input" type="text" onChange={(e)=> setStreet(e.target.value)} name="street-address" required id="street-address"/>
                    </div>
                    <div className="checkout-input-structure">
                        <input className="checkout-input" type="text" placeholder="Apartment, suite, unit, etc. (optional)" required onChange={(e)=> setApartment(e.target.value)} name="Apartment" id="Apartment"/>
                    </div>
                </div>
                <div className="checkout-input-structure">
                    <label htmlFor="state">State<span className="checkout-required"> *</span></label>
                    <Select name="state" options={states ? stateOption : "loading..."} value={stateInput} required onChange={(e) => setStateInput({value:e.value, label:e.value})}/>
                </div>
                <div className="checkout-input-structure">                        
                    <label htmlFor="city">City<span className="checkout-required"> *</span></label>
                    <input className="checkout-input" type='text'  onChange={(e)=> setCityInput(e.target.value)} required name="city" />
                </div>
                <div className="checkout-input-structure">
                    <label htmlFor="zipcode">Zipcode<span className="checkout-required"> *</span></label>
                    <input className="checkout-input" type='number' onChange={(e)=> setZipcode(e.target.value)} required name="zipcode" />
                </div>
                <div className="checkout-input-structure">                        
                    <label htmlFor="Phone">Phone<span className="checkout-required"> *</span></label>
                    <input className="checkout-input" type='tel'  required onChange={(e)=> setPhone(e.target.value)}name="Phone" />
                </div>
                <div className="checkout-input-structure">
                    <label htmlFor="email">Email address<span className="checkout-required"> *</span></label>
                    <input className="checkout-input" type='email' onChange={(e)=> setEmail(e.target.value)} required name="email" />
                </div>
                <button className=" cartBtn  mobileBtn checkoutCard-btn"><h3>PLACE ORDER</h3></button>
            </form>
        </section>

    )
}