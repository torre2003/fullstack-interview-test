/**
 * @fileoverview Controller for page branch list
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class BranchList{
    constructor(titleId, containerId){
        this.gitService = new Git()
        this.title = document.getElementById(titleId)
        this.div = document.getElementById(containerId)
    }
    async render(){
        const divTitle = new DivTitle('Welcome to your Git Repo').create()
        this.title.appendChild(divTitle)
        const branchItems = await this.gitService.getBranchList()
        const divBranchList = new DivBranchList(branchItems['branches']).create()
        this.div.append(divBranchList)
    }
}

new BranchList('titleContainer', 'branchContainer').render()