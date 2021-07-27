/**
 * @fileoverview Controller for commit detail
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class CommitDetail{
    constructor(titleId, detailCommitId){
        this.gitService = new Git()
        this.title = document.getElementById(titleId)
        this.commitDiv = document.getElementById(detailCommitId)
        this.loadUrlParams()
    }
    loadUrlParams(){
        let url = new URL(document.location)
        this.branch = url.searchParams.get('branch')
        this.commitId = url.searchParams.get('commit')
    }
    async render(){
        if(!this.commitId){
            window.location = '/404'
            return;
        }
        const divTitle = new DivTitle(
            `Details for commit ${this.commitId}`,
            'back to branch',
            `/branch?branch=${this.branch}`
        ).create()
        this.title.appendChild(divTitle)
        
        const commitDetail = await this.gitService.getCommitDetail(this.commitId)
        if (commitDetail.error){
            const divAlert = new DivAlert(commitDetail.errors[0], 'alert-danger', 2000).create()
            document.body.appendChild(divAlert)
            return
        }
        const ulCommitDetail = new UlCommitDetail(commitDetail).create()
        this.commitDiv.append(ulCommitDetail)
    }
}

new CommitDetail('titleContainer', 'detailCommitContainer').render()