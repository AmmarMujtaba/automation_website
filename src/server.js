export default function fanBtnClicked(){
    console.log('inside handler function')
    fetch('https://39.56.14.56:5555/off')
    .then((response) => {
        console.log('response: ',response)
    })
}