/**
 * @fileoverview Component to display a 'button' element for close a pull request instance
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class ButtonClosePullRequest{
    constructor(pullRequestId) {
        this.pullRequestId = pullRequestId
        this.button = document.createElement('button')
    }

    create(onClosePullRequest){
        this.button.setAttribute('class', 'btn btn-sm btn-danger')
        this.button.innerHTML = 'Close Pull Request'
        this.button.onclick = () => {
            onClosePullRequest(this)
        }
        return this.button
    }

    destroy(){
        this.button.remove()
    }
}