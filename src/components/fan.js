import { useEffect } from "react"

export default function Fan (props){
    function OnBtnClicked(){
        console.log('inside on handler')
        if(props.status.isFanOn == '1'){
            console.log('fan already on')
            return
        }
        fetch('https://as-server-orpin.vercel.app/on')
        .then((response) => {
            return response.text()
        })
        .then((text) => {
            if(text === 'fanOn'){
                props.setStatus((prevState) => ({...prevState,isFanOn : '1'}))
            }
            console.log('response: ',text)
        })
    }
    function OffBtnClicked(){
        console.log('inside off handler')
        if(props.status.isFanOn == '0'){
            console.log('fan already off')
            return
        }
        fetch('https://as-server-orpin.vercel.app/off')
        .then((response) => {
            return response.text()
        })  
        .then((text) => {
            if(text === 'fanOff'){
                props.setStatus((prevState) => ({...prevState,isFanOn : '0'}))
            }
            console.log('response: ',text)
        })
    }
    // async function updateBtnStatus(){
    //     const response = await fetch('https://as-server-orpin.vercel.app/reqstat')
    //     const text = await response.text()
    //     console.log('ubs response: ',text)

    //     console.log('changing status')
    //     props.setStatus((prevState) => ({
    //         ...prevState,
    //         isBtnOn: text[1]
    //     }))
    // }
    // useEffect(() => {
    //     const interval = setInterval(updateBtnStatus,5000)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // },[])
    return (
        <>
            <p id='isFanOn'>The fan is <b>{(props.status.isFanOn === '1')?"ON":"OFF"}</b></p>
            <p id='isBtnOn'>The button is <b>{(props.status.isBtnOn === '1')?"ON":"OFF"}</b></p>
            <button className="fanBtn" disabled={(props.status.isAuto === '1')?false:(props.status.isAuto === '0')?true:false} onClick={OnBtnClicked}>ON</button>
            <button className="fanBtn" disabled={(props.status.isAuto === '1')?false:(props.status.isAuto === '0')?true:false} onClick={OffBtnClicked}>OFF</button>
        </>
    )
}