/**
 * @fileoverview Component to display a list of request in a 'table' element
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class TablePullRequestList{
    constructor(pullRequestItems) {
        this.pullRequestItems = pullRequestItems
        this.table = document.createElement('table')
        this.tableHeaders = ['Id', 'Author', 'Title', 'Description', 'Status', '']
    }

    createTHead(){
        const tHead = document.createElement('thead')
        const tr = document.createElement('tr')
        tHead.append(tr)
        this.tableHeaders.forEach(header => {
            const th = document.createElement('th')
            th.setAttribute('scope', 'col')
            th.innerHTML = header
            tr.appendChild(th)
        })
        return tHead
    }

    createTBody(onClosePullRequest){
        const tBody = document.createElement('tbody')
        this.pullRequestItems.forEach(pullRequestItem => {
            const tr = document.createElement('tr')
            tr.setAttribute('data-id', pullRequestItem.id)

            const td0 = document.createElement('td')
            td0.setAttribute('data-id', pullRequestItem.id)
            td0.innerHTML = pullRequestItem.id
            tr.appendChild(td0)

            const td1 = document.createElement('td')
            td1.setAttribute('data-author', pullRequestItem.author)
            td1.innerHTML = pullRequestItem.author
            tr.appendChild(td1)

            const td2 = document.createElement('td')
            td2.setAttribute('data-title', pullRequestItem.title)
            td2.innerHTML = pullRequestItem.title
            tr.appendChild(td2)

            const td3 = document.createElement('td')
            td3.setAttribute('data-description', pullRequestItem.description)
            td3.innerHTML = pullRequestItem.description
            tr.appendChild(td3)

            const td4 = document.createElement('td')
            td4.setAttribute('data-status', pullRequestItem.status)
            td4.innerHTML = pullRequestItem.status
            tr.appendChild(td4)

            const td5 = document.createElement('td')
            if( pullRequestItem.status === 'open'){
                const buttonClosePullRequest = new ButtonClosePullRequest(pullRequestItem.id).create(onClosePullRequest)
                td5.appendChild(buttonClosePullRequest)
            }

            tr.appendChild(td5)

            tBody.appendChild(tr)
        })
        return tBody
    }

    updateRow(pullRequestId, data){
        const tr = this.table.querySelector(`tr[data-id="${pullRequestId}"]`)
        Object.keys(data).forEach(key => {
            const td = tr.querySelector(`td[data-${key}]`)
            if(td){
                td.setAttribute(`data-${key}`,data[key] )
                td.innerHTML = data[key]
            }
        })
    }

    create(onClosePullRequest){
        this.table.setAttribute('class', 'table table-striped table-sm')
        this.table.appendChild(this.createTHead())
        this.table.appendChild(this.createTBody(onClosePullRequest))
        return this.table
    }
}