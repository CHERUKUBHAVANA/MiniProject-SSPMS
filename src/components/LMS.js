import React,{useEffect,useState} from 'react'
import Display from './Display';

const LMS = () => {
  const endTime = new Date('June 30, 2023 00:00:00').getTime();
  const [currentTime,setcurrentTime] = useState(new Date().getTime());
  const gap = endTime - currentTime; 

  const seconds = 1000; 
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  const remainingDays = Math.floor(gap / days);
  const remainingHours = Math.floor( (gap % days) / hours);
  const remainingMinutes = Math.floor( (gap % hours) / minutes);
  const remainingSeconds = Math.floor( (gap % minutes) / seconds);

  useEffect(()=>{
    setTimeout(()=>setcurrentTime(new Date().getTime()),1000);
  },[currentTime]) 

  return (
    <div>
      <center>

        <Display days={remainingDays} 
        hours={remainingHours} minutes={remainingMinutes}
        seconds={remainingSeconds} />

      </center>
    </div>
  )
}
export default LMS;