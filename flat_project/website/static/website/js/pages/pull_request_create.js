/**
 * @fileoverview Controller for page Pull Request Create
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class PullRequestCreate{
    constructor(titleId, formDivId){
        this.gitService = new Git()
        this.title = document.getElementById(titleId)
        this.formDiv = document.getElementById(formDivId)
        this.blockForm = false
    }
    async onFormSubmit(formPullRequest){
        this.blockForm = true
        const formData = new FormData(formPullRequest.form)
        const data = {};
        formData.forEach(function(value, key){
            data[key] = value;
        });
        const response = await this.gitService.createPullRequest(data)
        if (response.error){
            formPullRequest.showFormErrors(response)
            this.blockForm = false
            return
        }
        alert('Pull request created successfully!')
        window.location = '/pull-request'
    }
    async render(){
        const divTitle = new DivTitle(
            'New Pull Request',
            'back to list',
            '/pull-request'
        ).create()
        this.title.appendChild(divTitle)
        const branchItems = await this.gitService.getBranchList()
        const formPullRequest = new FormPullRequest(branchItems.branches).create(this.onFormSubmit.bind(this))
        this.formDiv.append(formPullRequest)
    }
}

new PullRequestCreate('titleContainer', 'formContainer').render()