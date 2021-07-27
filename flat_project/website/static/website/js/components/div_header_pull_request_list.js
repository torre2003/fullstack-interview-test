/**
 * @fileoverview Component to create header for div container of table pull request list
 * @version 1.0
 * @author Jorge Campos<jcamposlatorre@gmail.com>
*/
class DivHeaderPullRequestList{
    constructor() {
        this.div = document.createElement('div')
    }

    create(){
        this.div.setAttribute('class', 'row');
        
        const divCol = document.createElement('div')
        divCol.setAttribute('class', 'col-12 border-bottom pb-2 mb-0')
        this.div.append(divCol)

        const divFloatStart = document.createElement('div')
        divFloatStart.setAttribute('class', 'h6 float-start')
        divFloatStart.innerHTML = 'Pull requests list'
        divCol.appendChild(divFloatStart)

        const divFloatEnd = document.createElement('div')
        divFloatEnd.setAttribute('class', 'float-end')
        divCol.appendChild(divFloatEnd)

        const a = document.createElement('a')
        a.href = '/pull-request/create'
        a.innerHTML = 'New pull request'
        divFloatEnd.appendChild(a)

        return this.div
    }
}