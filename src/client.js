export function OnBtnClicked(){
    console.log('inside on handler')
    fetch('https://as-server-orpin.vercel.app/on')
    .then((response) => {
        return response.text()
    })
    .then((text) => {
        console.log('response: ',text)
    })
}
export function OffBtnClicked(){
    console.log('inside off handler')
    fetch('https://as-server-orpin.vercel.app/off')
    .then((response) => {
        return response.text()
    })
    .then((text) => {
        console.log('response: ',text)
    })
}