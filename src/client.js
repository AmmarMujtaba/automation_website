export default function fanBtnClicked(){
    console.log('inside handler function')
    fetch('https://as-server-orpin.vercel.app/on')
    .then((response) => {
        return response.text
    })
    .then((text) => {
        console.log('response: ',text)
    })
}