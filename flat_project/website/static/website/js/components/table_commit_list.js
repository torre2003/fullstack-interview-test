/**
 * @fileoverview Component to display a list of commit in a 'table' element
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class TableCommitList{
    constructor(commitItems, branchName) {
        this.commitItems = commitItems
        this.table = document.createElement('table')
        this.tableHeaders = ['Id', 'Message', 'Date', 'Author']
        this.branchName = branchName
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

    createTBody(){
        const tBody = document.createElement('tbody')
        this.commitItems.forEach(commitItem => {
            const tr = document.createElement('tr')

            const td0 = document.createElement('td')
            const a = document.createElement('a')
            a.setAttribute('href', `/commit?branch=${this.branchName}&commit=${commitItem.id}`)
            a.innerHTML = `${commitItem.id.slice(0,10)}...`
            td0.appendChild(a)
            tr.appendChild(td0)

            const td1 = document.createElement('td')
            td1.innerHTML = commitItem.message
            tr.appendChild(td1)

            const td2 = document.createElement('td')
            td2.innerHTML = commitItem.date
            tr.appendChild(td2)

            const td3 = document.createElement('td')
            td3.innerHTML = commitItem.author_name
            tr.appendChild(td3)

            tBody.appendChild(tr)
        })
        return tBody
    }

    create(){
        this.table.setAttribute('class', 'table table-striped table-sm')
        this.table.appendChild(this.createTHead())
        this.table.appendChild(this.createTBody())
        return this.table
    }
}