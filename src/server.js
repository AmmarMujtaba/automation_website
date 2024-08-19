export default function fanBtnClicked(){
    console.log('inside handler function')
    fetch('https://192.168.10.55/off')
    .then((response) => {
        console.log('response: ',response)
    })
}