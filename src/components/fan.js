import { useEffect } from "react"

export default function Fan (props){
    function OnBtnClicked(){
        console.log('inside on handler')
        fetch('https://as-server-orpin.vercel.app/on')
        .then((response) => {
            return response.text()
        })
        .then((text) => {
            props.setStatus((prevState) => ({
                ...prevState,
                isFanOn : '1'
            }))
            console.log('response: ',text)
        })
    }
    function OffBtnClicked(){
        console.log('inside off handler')
        fetch('https://as-server-orpin.vercel.app/off')
        .then((response) => {
            return response.text()
        })
        .then((text) => {
            props.setStatus((prevState) => ({
                ...prevState,
                isFanOn : '0'
            }))
            console.log('response: ',text)
        })
    }
    async function updateBtnStatus(){
        const response = await fetch('https://as-server-orpin.vercel.app/reqstat')
        const text = await response.text()
        console.log('ubs response: ',text)

        console.log('changing status')
        props.setStatus((prevState) => ({
            ...prevState,
            isBtnOn: text[1]
        }))
    }
    useEffect(() => {
        const interval = setInterval(updateBtnStatus,3000)
        return () => {
            clearInterval(interval)
        }
    },[])
    return (
        <>
            <p id='isFanOn'>The fan is <b>{() => {
                if(props.status.isFanOn === '1'){return "ON"}
                else if(props.status.isFanOn === '0'){return "OFF"}
            }}</b></p>
            <p id='isBtnOn'>The button is <b>{() => {
                if(props.status.isBtnOn === '1'){return "ON"}
                else if(props.status.isBtnOn === '0'){return "OFF"}
            }}</b></p>
            <button onClick={OnBtnClicked}>ON</button>
            <button onClick={OffBtnClicked}>OFF</button>
        </>
    )
}