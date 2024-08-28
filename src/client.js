export function exBtnClicked(){
    console.log('inside reqstat handler')
    fetch('https://as-server-orpin.vercel.app/')
    .then((response) => {
        return response.text()
    })
    .then((data) => {
        console.log('response: ',data)
    })
}