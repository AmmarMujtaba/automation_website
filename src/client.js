export default function fanBtnClicked(){
    console.log('inside handler function')
    fetch('https://automationsite.vercel.app/on')
    .then((response) => {
        console.log('response: ',response)
    })
}