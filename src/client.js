export function exBtnClicked(){
    console.log('inside reqstat handler')
    fetch('https://as-server-orpin.vercel.app/example')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log('response: ',data)
    })
}