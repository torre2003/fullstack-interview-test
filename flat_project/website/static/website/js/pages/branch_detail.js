/**
 * @fileoverview Controller for page Branch Detail
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class BranchDetail{
    constructor(titleId, commitsContainerId){
        this.gitService = new Git()
        this.title = document.getElementById(titleId)
        this.commitDiv = document.getElementById(commitsContainerId)
        this.loadUrlParams()
    }
    loadUrlParams(){
        let url = new URL(document.location)
        this.branch = url.searchParams.get('branch')
    }
    async render(){
        if(!this.branch){
            window.location = '/404'
            return;
        }
        const divTitle = new DivTitle(
            `Details for branch ${this.branch}`,
            'back to home',
            '/'
        ).create()
        this.title.appendChild(divTitle)
        const branchDetail = await this.gitService.getBranchDetail(this.branch)
        if (branchDetail.error){
            const divAlert = new DivAlert(branchDetail.errors[0], 'alert-danger', 2000).create()
            document.body.appendChild(divAlert)
            return
        }
        const tableCommitList = new TableCommitList(branchDetail.commits, this.branch).create()
        this.commitDiv.append(tableCommitList)
    }
}

new BranchDetail('titleContainer', 'commitTableContainer').render()