/**
 * @fileoverview Controller for page Pull Request List
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class PullRequestList{
    constructor(titleId, headerContainerId, pullRequestListId){
        this.gitService = new Git()
        this.title = document.getElementById(titleId)
        this.header = document.getElementById(headerContainerId)
        this.pullRequestListDiv = document.getElementById(pullRequestListId)
    }
    async onClosePullRequest(buttonEvent){
        const response = await this.gitService.changeStatusPullRequest(buttonEvent.pullRequestId, 'closed')
        if (response.error){
            const divAlert = new DivAlert(response.status[0], 'alert-danger', 2000).create()
            document.body.appendChild(divAlert)
            return
        }
        this.tablePullRequestList.updateRow(buttonEvent.pullRequestId, response)
        buttonEvent.destroy()
    }
    async render(){
        const divTitle = new DivTitle('Pull request').create()
        this.title.appendChild(divTitle)
        const divHeaderPullRequestList = new DivHeaderPullRequestList().create()
        this.header.appendChild(divHeaderPullRequestList)
        const pullRequestList = await this.gitService.getPullRequestList()
        if (pullRequestList.error){
            alert('Problems with conection!')
            return
        }
        this.tablePullRequestList = new TablePullRequestList(pullRequestList)
        this.pullRequestListDiv.append(
            this.tablePullRequestList.create(this.onClosePullRequest.bind(this))
        )
    }
}

new PullRequestList('titleContainer', 'headerPullRequestListContainer', 'pullRequestTableContainer').render()