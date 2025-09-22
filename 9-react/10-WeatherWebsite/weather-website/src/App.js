import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CloudIcon from '@mui/icons-material/Cloud';
import axios from 'axios'
import { useEffect,useState } from 'react';
import { useTranslation } from 'react-i18next';
// library for get current date and tim e
import moment from 'moment';
// import i18n (needs to be bundled ;)) 
import './i18n';
//to enabel the get date and time in another language as arabic we need import the locales files 
import 'moment/min/locales';
moment.locale('ar');

function App() {
  console.log("rendering")
  const[weatherData,setWeatherData]=useState({temp:null,description:"",minTemp:null,maxTemp:null,icon:null});
  const [dateAndTime,setDateAndTime]=useState("");
  const [local,setLocal]=useState("ar");

  const direction=local=="ar"?"rtl":"tlr";



 const { t, i18n } = useTranslation();

  

  const theme=createTheme(
    {
      typography:{
        fontFamily:["IBM"]
      }

    }
  );

  function handelLanguageClick(){
    if(local==="ar"){
          setLocal("en");
           i18n.changeLanguage("en");
           moment.locale('en');
           setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
      
    }else if(local==="en"){
       setLocal("ar");
           i18n.changeLanguage("ar");
           moment.locale('ar');
             setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
          


    }         
  }

useEffect(()=>{

  setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
  const controller = new AbortController();
 axios.get('https://api.openweathermap.org/data/2.5/weather?lat=35.204269&lon=31.898043&appid=04374ea58cb016636e95a96fe2fa5fb7',{
  signal: controller.signal 

  })
 
  .then(function (response) {
    // handle success
     const responseTemp=Math.round(response.data.main.temp-272.15);
     const responseDescription=response.data.weather[0].description;
     const responseMinTemp=Math.round(response.data.main.temp_min-272.15);
     const responseMaxTemp=Math.round(response.data.main.temp_max-272.15);
     const responseIcon=response.data.weather[0].icon;
 
    setWeatherData({temp:responseTemp,description:responseDescription,minTemp:responseMinTemp,maxTemp:responseMaxTemp,icon:responseIcon})
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });


  return ()=>{
    controller.abort();
       console.log("🧹 cleanup running...");
  }

},[])




  return (
<ThemeProvider theme={theme}>
    <div className="App">
     <Container maxWidth="sm"  >
      {/* Card */}
       <div className='card' style={{backgroundColor:"rgba(28, 52, 255, 91)",color:"white",padding:"20px 30px",borderRadius:"15px",boxShadow:"0px 11px 1px rgba(0,0,0,0.05)"}} dir={direction}>
      {/* card Content */}
        <div className='card-content' >
          {/* date and name container */}

            <div className='date-and-name direction' style={{display:"flex", alignItems:"end",textAlign:"right"}}>
               <Typography variant='h2' sx={{marginLeft:"10px",fontWeight:"500"}}>{t("palestine") }</Typography>
               <Typography variant='h6'  sx={{marginLeft:"20px"}}>{dateAndTime}</Typography>
            </div>
            <Divider sx={{borderBottomWidth:"3px",borderBottomColor:"white",my:1}}/>
            {/* content */}
            <div className='content' style={{display:"flex",padding:"15px",justifyContent:"space-between" ,gap:"30px"}}>
                 
                  {/* description  */}
                  <div className='description'  >
                <div style={{display:"flex",textAlign:"right"}}>
                  <Typography variant='h1'>{weatherData.temp}</Typography>
                 <img   src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="weather icon"/>

                </div>
                <Typography sx={{color:"#fff"}} variant='h6'>{t(weatherData.description)}</Typography>
                <div style={{display:"flex",justifyContent:"end"}}>
                  <Typography variant='h6'> {t("max") +" "+ weatherData.maxTemp} </Typography>
               <span style={{margin:"0px 20px"}}>  |  </span>
                  <Typography variant='h6'>{t("min") +" "+ weatherData.minTemp} </Typography>
          

                </div>
                  </div>
                  {/* --description  */}
{/* image */}
                 <div>
                  <CloudIcon sx={{fontSize:"120px"}}/>
                 </div>
                     {/* --image */}
                 
            </div>
                {/* --description */}
        
       
        </div>
           {/* --card Content */}
       </div>
             {/*-- Card */}
             <Button variant="text" sx={{marginTop:"20px",display:"flex",justifyContent:"start",color:"white"}} onClick={handelLanguageClick}>{local=="en"?"Arabic":"English"}
             </Button >
          
      </Container>
    </div>
    </ThemeProvider>
  );
}

export default App;
