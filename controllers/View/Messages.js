class Message{
    displayMessage(text, type){
        let displayHtml = `
        <div class="alert alert-${type} alert-dismissible fade show m-0" role="alert">
        ${text}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        document.getElementById("message").innerHTML = displayHtml;
    }
}

export default Message;