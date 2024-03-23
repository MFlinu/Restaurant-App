import React, { useReducer } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Booking from './Booking'
function Main()
{
    const seedRandom=function(seed){
        var m=2**35 - 32;
        var a=185852;
        var s=seed % m;
        return function(){
            return (s = s * a % m) /m;
        }
    }


    const fetchAPI=function(date){
        let result=[];
        let random=seedRandom(date.getDate());
        for(let i=17;i<=23;i++)
        {
            if(random() < 0.5)
            {
                result.push(i+":00");
            }
            if(random() > 0.5)
            {
                result.push(i+":30");
            }
        }

        return result;
    }

    const submitAPI=function(formData){
        return true;
    }

    const initialState={availableTimes: fetchAPI(new Date())};
    const [state,dispatch]=useReducer(updateTime,initialState);

    function updateTime(state,date)
    {
        return {availableTimes:fetchAPI(new Date())}
    }

    const navigation=useNavigate();

    function submitForm(formData)
    {
        if(submitAPI(formData)){
            navigation("/confirmed");
        }
    }
    return(
        <main>
            <Routes>
                <Route path='/' element={<Header/>}/>
                <Route path='/booking' element={<Booking availableTimes={state} dispatch={dispatch} SubmitForm={submitForm}/>}/>
                <Route path="/confirmed" element={<Header/>}/>
            </Routes>

        </main>
    );
}

export default Main;